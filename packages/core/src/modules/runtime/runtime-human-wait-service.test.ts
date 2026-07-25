import { describe, expect, it } from 'vitest';
import type { EventCreateInput, FrameworkEventType } from '../../events';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type { RuntimeScope } from '../../contracts/runtime';
import type { JsonSchema } from '../../specs';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import { DurableEventRuntime } from './event-runtime';
import { InMemoryDurableEventStore } from './event-store';
import { InMemoryProjectionStore, ProjectionEngine } from './projection';
import { InMemoryRunLeaseStore } from './run-lease-store';
import { RuntimeHumanWaitService } from './runtime-human-wait-service';

const scope: RuntimeScope = {
  tenantId: 'tenant.review',
  userId: 'user.review',
  sessionId: 'session.review',
  runId: 'run.review',
};

const eventTypes: FrameworkEventType[] = [
  'run.created',
  'run.started',
  'run.resume.requested',
  'run.resumed',
  'run.waiting_human',
  'runtime.wait.created',
  'runtime.wait.resolved',
  'fsm.state.entered',
  'human.review.requested',
];

async function fixture() {
  let milliseconds = 0;
  let idSequence = 0;
  const now = () => new Date(Date.UTC(2026, 6, 23, 8, 0, 0, milliseconds++)).toISOString();
  const nextId = (namespace: string) => `${namespace}.${++idSequence}`;
  const schemas = new InMemoryEventSchemaRegistry();
  const payloadSchema: JsonSchema = { type: 'object', additionalProperties: true };
  for (const eventType of eventTypes) {
    await schemas.register({
      eventType,
      version: '1.0.0',
      schema: payloadSchema,
      schemaHash: hashCanonicalJson(payloadSchema),
    });
  }
  const store = new InMemoryDurableEventStore({ schemaRegistry: schemas, now });
  const events = new DurableEventRuntime({ store, now });
  const projectionStore = new InMemoryProjectionStore<RuntimeOrchestrationProjection>();
  const projections = new ProjectionEngine({ events, now });
  const runLeases = new InMemoryRunLeaseStore({ now });
  const service = new RuntimeHumanWaitService({
    events,
    projections,
    projectionStore,
    runLeases,
    now,
    nextId,
  });
  await events.append({
    scope: streamScope(),
    events: [
      event('seed.created', 'run.created', {}, now()),
      event('seed.started', 'run.started', {}, now()),
      event('seed.entered', 'fsm.state.entered', { stateId: 'HumanReview' }, now(), 1),
    ],
    expectedLastSequence: 0,
    idempotencyKey: 'seed-human-review',
  });
  return { service, events, runLeases, now };
}

describe('RuntimeHumanWaitService', () => {
  it('atomically creates and idempotently reuses a fenced Human Wait', async () => {
    const target = await fixture();
    const command = createCommand();

    const created = await target.service.create(command);
    expect(created).toMatchObject({
      disposition: 'applied',
      projection: {
        runStatus: 'waiting_human',
        pendingWait: {
          waitId: 'wait.tool-1',
          type: 'human',
          pendingActionRef: 'tool-1',
          stateId: 'HumanReview',
          stateAttempt: 1,
        },
      },
    });
    expect(created.eventIds).toHaveLength(2);

    const repeated = await target.service.create(command);
    expect(repeated).toMatchObject({
      disposition: 'reused',
      eventIds: created.eventIds,
    });
    const written = await target.events.read({ scope: streamScope() });
    expect(written.map((candidate) => candidate.type)).toEqual([
      'run.created',
      'run.started',
      'fsm.state.entered',
      'runtime.wait.created',
      'run.waiting_human',
    ]);
  });

  it('atomically appends Generic HumanTasks with the durable Human Wait', async () => {
    const target = await fixture();
    const command = {
      ...createCommand(),
      commandId: 'create.tool-with-task',
      idempotencyKey: 'create.tool-with-task',
      humanTasks: [
        {
          taskId: 'human-task.tool-1',
          kind: 'tool' as const,
          subjectRef: 'tool:filesystem.write@1.0.0',
          subjectHash: `sha256:${'a'.repeat(64)}`,
          requestedBy: scope.userId,
          allowedDecisionScopes: ['runtime.human-task.decide'],
          requestedAt: '2026-07-23T08:00:30.000Z',
          expiresAt: '2026-07-24T08:00:30.000Z',
        },
      ],
    };

    const created = await target.service.create(command);
    expect(created.eventIds).toHaveLength(3);
    const written = await target.events.read({ scope: streamScope() });
    expect(written.slice(-3).map((candidate) => candidate.type)).toEqual([
      'human.review.requested',
      'runtime.wait.created',
      'run.waiting_human',
    ]);
    expect(written.at(-3)?.payload).toMatchObject({
      taskId: 'human-task.tool-1',
      runId: scope.runId,
      stateId: 'HumanReview',
      stateAttempt: 1,
      status: 'pending',
      revision: 1,
    });
  });

  it('resolves only the matching Human action and advances the State attempt', async () => {
    const target = await fixture();
    await target.service.create(createCommand());

    const resolved = await target.service.resolve({
      commandId: 'resolve.tool-1',
      scope,
      ownerId: 'worker.review',
      leaseTtlMs: 30_000,
      waitId: 'wait.tool-1',
      pendingActionRef: 'tool-1',
      principalId: 'admin-1',
      decision: 'approved',
      resolvedAt: '2026-07-23T08:01:00.000Z',
    });

    expect(resolved).toMatchObject({
      disposition: 'applied',
      projection: {
        runStatus: 'running',
        currentState: 'HumanReview',
        stateAttempt: 2,
        lastResume: {
          kind: 'manual',
          waitId: 'wait.tool-1',
          principalId: 'admin-1',
          payload: { decision: 'approved', pendingActionRef: 'tool-1' },
        },
      },
    });
    expect(resolved.projection).not.toHaveProperty('pendingWait');
    expect(resolved.eventIds).toHaveLength(4);
  });

  it('rejects a decision for a different pending action', async () => {
    const target = await fixture();
    await target.service.create(createCommand());

    await expect(
      target.service.resolve({
        commandId: 'resolve.tool-2',
        scope,
        ownerId: 'worker.review',
        leaseTtlMs: 30_000,
        waitId: 'wait.tool-1',
        pendingActionRef: 'tool-2',
        principalId: 'admin-1',
        decision: 'approved',
        resolvedAt: '2026-07-23T08:01:00.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_CONFLICT' });
  });

  it('does not append when another owner holds the Run Lease', async () => {
    const target = await fixture();
    await target.runLeases.acquire({
      ...streamScope(),
      partitionKey: `runtime:${scope.runId}`,
      requestedLeaseId: 'blocking-lease',
      ownerId: 'other-worker',
      ttlMs: 30_000,
      acquiredAt: target.now(),
      idempotencyKey: 'blocking-lease',
    });

    const result = await target.service.create(createCommand());
    expect(result).toMatchObject({ disposition: 'lease_unavailable', eventIds: [] });
    expect(await target.events.latestSequence(streamScope())).toBe(3);
  });
});

function createCommand() {
  return {
    commandId: 'create.tool-1',
    scope,
    ownerId: 'worker.review',
    leaseTtlMs: 30_000,
    waitId: 'wait.tool-1',
    pendingActionRef: 'tool-1',
    reason: 'Tool execution requires approval',
    requestedAt: '2026-07-23T08:00:30.000Z',
  };
}

function streamScope() {
  return { tenantId: scope.tenantId, userId: scope.userId, runId: scope.runId };
}

function event(
  id: string,
  type: FrameworkEventType,
  payload: Record<string, unknown>,
  timestamp: string,
  stateAttempt?: number
): EventCreateInput {
  return {
    id,
    type,
    version: '1.0.0',
    tenantId: scope.tenantId,
    userId: scope.userId,
    sessionId: scope.sessionId,
    runId: scope.runId,
    fsmState: 'HumanReview',
    timestamp,
    payload,
    ...(stateAttempt === undefined ? {} : { metadata: { stateAttempt } }),
  };
}
