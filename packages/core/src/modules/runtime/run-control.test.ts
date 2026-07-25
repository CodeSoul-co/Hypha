import { describe, expect, it } from 'vitest';
import type { EventCreateInput, FrameworkEventType } from '../../events';
import type { RuntimeRunControlCommand } from '../../contracts/runtime-control';
import type { RuntimeJsonValue } from '../../contracts/runtime-helpers';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type { RuntimeScope } from '../../contracts/runtime';
import type { JsonSchema } from '../../specs';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import { DurableEventRuntime } from './event-runtime';
import { InMemoryDurableEventStore } from './event-store';
import { InMemoryProjectionStore, ProjectionEngine } from './projection';
import { InMemoryRunLeaseStore } from './run-lease-store';
import { RuntimeRunControlService } from './run-control';

const scope: RuntimeScope = {
  tenantId: 'tenant.control',
  userId: 'user.control',
  workspaceId: 'workspace.control',
  sessionId: 'session.control',
  runId: 'run.control',
  agentId: 'agent.control',
};

const controlEventTypes: FrameworkEventType[] = [
  'run.created',
  'run.started',
  'run.resume.requested',
  'run.resumed',
  'run.waiting_signal',
  'run.paused',
  'runtime.wait.created',
  'runtime.wait.resolved',
  'runtime.signal.received',
  'fsm.state.entered',
];

const payloadSchema: JsonSchema = { type: 'object', additionalProperties: true };

async function fixture() {
  let milliseconds = 0;
  let idSequence = 0;
  const now = () => new Date(Date.UTC(2026, 6, 18, 8, 0, 0, milliseconds++)).toISOString();
  const nextId = (namespace: string) => `${namespace}.${++idSequence}`;
  const schemas = new InMemoryEventSchemaRegistry();
  for (const eventType of controlEventTypes) {
    await schemas.register({
      eventType,
      version: '1.0.0',
      schema: payloadSchema,
      schemaHash: hashCanonicalJson(payloadSchema),
    });
  }
  const eventStore = new InMemoryDurableEventStore({ schemaRegistry: schemas, now });
  const events = new DurableEventRuntime({ store: eventStore, now });
  const projectionStore = new InMemoryProjectionStore<RuntimeOrchestrationProjection>();
  const projections = new ProjectionEngine({ events, now });
  const runLeases = new InMemoryRunLeaseStore({ now });
  const service = new RuntimeRunControlService({
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
      event('seed.run.created', 'run.created', {}, now()),
      event('seed.run.started', 'run.started', {}, now()),
      event('seed.state.entered', 'fsm.state.entered', { stateId: 'Work' }, now(), 1),
    ],
    expectedLastSequence: 0,
    idempotencyKey: 'seed.running-run',
  });
  return { service, events, runLeases, now, nextId };
}

function command(
  input:
    | { kind: 'pause'; commandId: string; reason: string; resumeKey?: string }
    | {
        kind: 'resume';
        commandId: string;
        key?: string;
        payload?: RuntimeJsonValue;
      }
    | {
        kind: 'signal';
        commandId: string;
        key: string;
        payload: RuntimeJsonValue;
      }
): RuntimeRunControlCommand {
  const permission = `runtime.run.${input.kind}`;
  const common = {
    commandId: input.commandId,
    scope,
    principal: {
      principalId: 'principal.control',
      type: 'user' as const,
      tenantId: scope.tenantId,
      userId: scope.userId,
      permissionScopes: [permission],
    },
    ownerId: 'worker.control',
    leaseTtlMs: 30_000,
  };
  if (input.kind === 'pause') {
    return {
      ...common,
      kind: 'pause',
      reason: input.reason,
      ...(input.resumeKey === undefined ? {} : { resumeKey: input.resumeKey }),
      requestedAt: '2026-07-18T08:00:01.000Z',
    };
  }
  if (input.kind === 'resume') {
    return {
      ...common,
      kind: 'resume',
      ...(input.key === undefined ? {} : { key: input.key }),
      ...(input.payload === undefined ? {} : { payload: input.payload }),
      requestedAt: '2026-07-18T08:00:02.000Z',
    };
  }
  return {
    ...common,
    kind: 'signal',
    key: input.key,
    payload: input.payload,
    sentAt: '2026-07-18T08:00:02.000Z',
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
    fsmState: 'Work',
    timestamp,
    payload,
    ...(stateAttempt === undefined ? {} : { metadata: { stateAttempt } }),
  };
}

async function seedSignalWait(target: Awaited<ReturnType<typeof fixture>>): Promise<void> {
  const head = await target.events.getStreamHead(streamScope());
  if (!head) throw new Error('Expected seeded Run head');
  const createdAt = target.now();
  const wait = {
    type: 'signal',
    key: 'approval.received',
    expectedSchema: {
      type: 'object',
      required: ['approved'],
      properties: { approved: { type: 'boolean' } },
      additionalProperties: false,
    },
    expiresAt: '2026-07-18T09:00:00.000Z',
  };
  await target.events.append({
    scope: streamScope(),
    events: [
      event(
        'seed.wait.created',
        'runtime.wait.created',
        {
          waitId: 'wait.approval',
          stateId: 'Work',
          stateAttempt: 1,
          wait,
          createdAt,
        },
        createdAt,
        1
      ),
      event(
        'seed.run.waiting',
        'run.waiting_signal',
        { waitId: 'wait.approval', stateId: 'Work', wait },
        createdAt,
        1
      ),
    ],
    expectedLastSequence: head.lastSequence,
    expectedRunRevision: head.runRevision,
    idempotencyKey: 'seed.signal-wait',
  });
}

describe('RuntimeRunControlService', () => {
  it('persists pause and manual resume while advancing the State attempt', async () => {
    const target = await fixture();
    const pause = command({
      kind: 'pause',
      commandId: 'pause.1',
      reason: 'operator requested',
      resumeKey: 'resume.plan',
    });

    const paused = await target.service.execute(pause);
    expect(paused).toMatchObject({
      disposition: 'applied',
      projection: {
        runStatus: 'paused',
        currentState: 'Work',
        stateAttempt: 1,
        pendingWait: { type: 'pause', key: 'resume.plan' },
      },
    });
    const repeated = await target.service.execute(pause);
    expect(repeated).toMatchObject({ disposition: 'reused', eventIds: paused.eventIds });

    const resumed = await target.service.execute(
      command({
        kind: 'resume',
        commandId: 'resume.1',
        key: 'resume.plan',
        payload: { note: 'ok' },
      })
    );
    expect(resumed).toMatchObject({
      disposition: 'applied',
      projection: {
        runStatus: 'running',
        currentState: 'Work',
        stateAttempt: 2,
        statePath: ['Work', 'Work'],
        lastResume: {
          commandId: 'resume.1',
          kind: 'manual',
          key: 'resume.plan',
          payload: { note: 'ok' },
        },
      },
    });
    expect(resumed.projection.pendingWait).toBeUndefined();
  });

  it('validates and consumes a Signal exactly once before resuming', async () => {
    const target = await fixture();
    await seedSignalWait(target);
    const signal = command({
      kind: 'signal',
      commandId: 'signal.1',
      key: 'approval.received',
      payload: { approved: true },
    });

    const accepted = await target.service.execute(signal);
    expect(accepted).toMatchObject({
      disposition: 'applied',
      projection: {
        runStatus: 'running',
        stateAttempt: 2,
        lastResume: {
          commandId: 'signal.1',
          kind: 'signal',
          key: 'approval.received',
          payload: { approved: true },
        },
      },
    });
    expect(accepted.eventIds).toHaveLength(5);

    const repeated = await target.service.execute(signal);
    expect(repeated).toMatchObject({ disposition: 'reused', eventIds: accepted.eventIds });
    const received = await target.events.read({
      scope: streamScope(),
      types: ['runtime.signal.received'],
    });
    expect(received).toHaveLength(1);
  });

  it('rejects mismatched, invalid, and expired Signals without resolving the Wait', async () => {
    const target = await fixture();
    await seedSignalWait(target);

    await expect(
      target.service.execute(
        command({ kind: 'signal', commandId: 'signal.bad-key', key: 'wrong', payload: {} })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_SIGNAL_INVALID' });
    await expect(
      target.service.execute(
        command({
          kind: 'signal',
          commandId: 'signal.bad-schema',
          key: 'approval.received',
          payload: { approved: 'yes' },
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_SIGNAL_INVALID' });
    const expired = command({
      kind: 'signal',
      commandId: 'signal.expired',
      key: 'approval.received',
      payload: { approved: true },
    });
    if (expired.kind !== 'signal') throw new Error('Expected signal command');
    await expect(
      target.service.execute({ ...expired, sentAt: '2026-07-18T09:00:00.000Z' })
    ).rejects.toMatchObject({ code: 'RUNTIME_SIGNAL_EXPIRED' });

    const signals = await target.events.read({
      scope: streamScope(),
      types: ['runtime.signal.received'],
    });
    expect(signals).toHaveLength(0);
  });

  it('rejects unauthorized commands and conflicting command reuse', async () => {
    const target = await fixture();
    const pause = command({ kind: 'pause', commandId: 'pause.secure', reason: 'maintenance' });
    if (pause.kind !== 'pause') throw new Error('Expected pause command');
    await expect(
      target.service.execute({
        ...pause,
        principal: { ...pause.principal, permissionScopes: [] },
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_CONFLICT' });

    await target.service.execute(pause);
    await expect(
      target.service.execute({ ...pause, reason: 'different reason' })
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
  });

  it('fails closed when another worker owns the Run Lease', async () => {
    const target = await fixture();
    const acquiredAt = target.now();
    await target.runLeases.acquire({
      tenantId: scope.tenantId,
      userId: scope.userId,
      runId: scope.runId,
      partitionKey: `runtime:${scope.runId}`,
      requestedLeaseId: target.nextId('held-lease'),
      ownerId: 'worker.other',
      ttlMs: 60_000,
      acquiredAt,
      idempotencyKey: 'held-lease',
    });

    await expect(
      target.service.execute(command({ kind: 'pause', commandId: 'pause.blocked', reason: 'test' }))
    ).resolves.toMatchObject({ disposition: 'lease_unavailable', eventIds: [] });
  });
});
