import { describe, expect, it } from 'vitest';
import type {
  RuntimeActivityCancellationPort,
  RuntimeCancelCommand,
  RuntimeChildRunCancellationPort,
} from '../../contracts/runtime-cancellation';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type { RuntimeScope } from '../../contracts/runtime';
import type { EventCreateInput, FrameworkEventType } from '../../events';
import type { JsonSchema } from '../../specs';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import { DurableEventRuntime, type EventRuntime } from './event-runtime';
import { InMemoryDurableEventStore } from './event-store';
import { InMemoryProjectionStore, ProjectionEngine } from './projection';
import { InMemoryRunLeaseStore, runLeaseGuard } from './run-lease-store';
import { RuntimeCancellationService } from './runtime-cancellation-service';

const scope: RuntimeScope = {
  tenantId: 'tenant.cancel',
  userId: 'user.cancel',
  workspaceId: 'workspace.cancel',
  sessionId: 'session.cancel',
  runId: 'run.cancel',
  agentId: 'agent.cancel',
};

const cancellationEventTypes: FrameworkEventType[] = [
  'run.created',
  'run.started',
  'run.cancel.requested',
  'run.cancelling',
  'run.cancelled',
  'fsm.state.entered',
  'runtime.activity.requested',
  'runtime.activity.cancelled',
  'runtime.cancellation.propagated',
  'runtime.cancellation.failed',
];

const payloadSchema: JsonSchema = { type: 'object', additionalProperties: true };

async function fixture(options: { interruptTargetAppendOnce?: boolean } = {}) {
  let milliseconds = 0;
  let idSequence = 0;
  let interruptTargetAppendOnce = options.interruptTargetAppendOnce ?? false;
  const now = () => new Date(Date.UTC(2026, 6, 18, 10, 0, 0, milliseconds++)).toISOString();
  const nextId = (namespace: string) => `${namespace}.${++idSequence}`;
  const schemas = new InMemoryEventSchemaRegistry();
  for (const eventType of cancellationEventTypes) {
    await schemas.register({
      eventType,
      version: '1.0.0',
      schema: payloadSchema,
      schemaHash: hashCanonicalJson(payloadSchema),
    });
  }
  const eventStore = new InMemoryDurableEventStore({ schemaRegistry: schemas, now });
  const durableEvents = new DurableEventRuntime({ store: eventStore, now });
  const events: EventRuntime = {
    append: async (request) => {
      if (
        interruptTargetAppendOnce &&
        request.transactionGroupId?.includes(':target:activity:activity.ok')
      ) {
        interruptTargetAppendOnce = false;
        throw new Error('simulated interruption after Activity cancellation');
      }
      return durableEvents.append(request);
    },
    read: (request) => durableEvents.read(request),
    stream: (request) => durableEvents.stream(request),
    latestSequence: (requestScope) => durableEvents.latestSequence(requestScope),
    getStreamHead: (requestScope) => durableEvents.getStreamHead(requestScope),
    listStreamHeads: (request) => durableEvents.listStreamHeads(request),
    export: (request) => durableEvents.export(request),
    import: (request) => durableEvents.import(request),
  };
  const projectionStore = new InMemoryProjectionStore<RuntimeOrchestrationProjection>();
  const projections = new ProjectionEngine({ events, now });
  const runLeases = new InMemoryRunLeaseStore({ now });
  const activityCalls: string[] = [];
  const childCalls: string[] = [];
  const activities: RuntimeActivityCancellationPort = {
    cancel: async (request) => {
      activityCalls.push(request.activityId);
      if (request.activityId === 'activity.failed') throw new Error('provider unavailable');
      return { targetType: 'activity', targetId: request.activityId, status: 'cancelled' };
    },
  };
  const children: RuntimeChildRunCancellationPort = {
    listChildren: async () => [{ runId: 'run.child' }],
    cancel: async (request) => {
      childCalls.push(request.childRunId);
      return { targetType: 'child_run', targetId: request.childRunId, status: 'cancelled' };
    },
  };
  const service = new RuntimeCancellationService({
    events,
    projections,
    projectionStore,
    runLeases,
    activities,
    children,
    now,
    nextId,
  });
  await events.append({
    scope: streamScope(),
    events: [
      event('seed.run.created', 'run.created', {}, now()),
      event('seed.run.started', 'run.started', {}, now()),
      event('seed.state.entered', 'fsm.state.entered', { stateId: 'Acting' }, now()),
      event('seed.activity.ok', 'runtime.activity.requested', { activityId: 'activity.ok' }, now()),
      event(
        'seed.activity.failed',
        'runtime.activity.requested',
        { activityId: 'activity.failed' },
        now()
      ),
    ],
    expectedLastSequence: 0,
    idempotencyKey: 'seed.cancellable-run',
  });
  return { service, events, runLeases, activityCalls, childCalls, now };
}

function command(overrides: Partial<RuntimeCancelCommand> = {}): RuntimeCancelCommand {
  return {
    commandId: 'cancel.default',
    scope,
    principal: {
      principalId: 'principal.cancel',
      type: 'user',
      tenantId: scope.tenantId,
      userId: scope.userId,
      permissionScopes: ['runtime.run.cancel'],
    },
    ownerId: 'runtime-cancellation.worker',
    leaseTtlMs: 30_000,
    reason: 'operator request',
    policy: {
      propagation: 'all_descendants',
      cancelRunningActivities: true,
      waitGraceMs: 5_000,
    },
    requestedAt: '2026-07-18T10:00:01.000Z',
    ...overrides,
  };
}

function streamScope() {
  return { tenantId: scope.tenantId, userId: scope.userId, runId: scope.runId };
}

function event(
  id: string,
  type: FrameworkEventType,
  payload: Record<string, unknown>,
  timestamp: string
): EventCreateInput {
  return {
    id,
    type,
    version: '1.0.0',
    tenantId: scope.tenantId,
    userId: scope.userId,
    sessionId: scope.sessionId,
    runId: scope.runId,
    fsmState: 'Acting',
    timestamp,
    payload,
  };
}

describe('RuntimeCancellationService', () => {
  it('fences the active worker, propagates cancellation, and records unresolved Activities', async () => {
    const target = await fixture();
    const activeLease = await target.runLeases.acquire({
      tenantId: scope.tenantId,
      userId: scope.userId,
      runId: scope.runId,
      partitionKey: `runtime:${scope.runId}`,
      requestedLeaseId: 'lease.active-worker',
      ownerId: 'worker.active',
      ttlMs: 30_000,
      acquiredAt: '2026-07-18T10:00:00.000Z',
      idempotencyKey: 'lease.active-worker',
    });

    const result = await target.service.cancel(command());

    expect(result).toMatchObject({
      disposition: 'applied',
      unresolvedActivityIds: ['activity.failed'],
      projection: {
        runStatus: 'cancelled',
        terminalState: 'Acting',
        pendingActivityIds: ['activity.failed'],
      },
    });
    expect(result.targetResults).toEqual(
      expect.arrayContaining([
        { targetType: 'activity', targetId: 'activity.ok', status: 'cancelled' },
        expect.objectContaining({
          targetType: 'activity',
          targetId: 'activity.failed',
          status: 'failed',
        }),
        { targetType: 'child_run', targetId: 'run.child', status: 'cancelled' },
      ])
    );
    await expect(
      target.runLeases.heartbeat({
        scope: {
          tenantId: scope.tenantId,
          userId: scope.userId,
          runId: scope.runId,
          partitionKey: `runtime:${scope.runId}`,
        },
        guard: runLeaseGuard(activeLease!),
        ttlMs: 30_000,
        heartbeatAt: '2026-07-18T10:00:02.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
    const eventTypes = (await target.events.read({ scope: streamScope() })).map(
      (item) => item.type
    );
    expect(eventTypes).toEqual(
      expect.arrayContaining([
        'run.cancel.requested',
        'run.cancelling',
        'runtime.cancellation.propagated',
        'runtime.cancellation.failed',
        'runtime.activity.cancelled',
        'run.cancelled',
      ])
    );
  });

  it('reuses a completed command without repeating external cancellation', async () => {
    const target = await fixture();
    const first = await target.service.cancel(command());
    const activityCallCount = target.activityCalls.length;
    const childCallCount = target.childCalls.length;

    const second = await target.service.cancel(command());

    expect(first.disposition).toBe('applied');
    expect(second).toMatchObject({ disposition: 'reused', eventIds: first.eventIds });
    expect(target.activityCalls).toHaveLength(activityCallCount);
    expect(target.childCalls).toHaveLength(childCallCount);
    await expect(
      target.service.cancel(command({ reason: 'different reason' }))
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
  });

  it('resumes from durable cancelling Events after an interrupted outcome append', async () => {
    const target = await fixture({ interruptTargetAppendOnce: true });

    await expect(target.service.cancel(command())).rejects.toThrow(
      'simulated interruption after Activity cancellation'
    );
    const interrupted = await target.events.read({ scope: streamScope() });
    expect(interrupted.map((item) => item.type)).toEqual(
      expect.arrayContaining(['run.cancel.requested', 'run.cancelling'])
    );
    expect(interrupted.some((item) => item.type === 'run.cancelled')).toBe(false);

    const recovered = await target.service.cancel(command());

    expect(recovered.projection.runStatus).toBe('cancelled');
    expect(target.activityCalls.filter((id) => id === 'activity.ok')).toHaveLength(2);
    expect(
      (await target.events.read({ scope: streamScope() })).filter(
        (item) => item.type === 'run.cancel.requested'
      )
    ).toHaveLength(1);
  });

  it('rejects unauthorized cancellation before Lease preemption', async () => {
    const target = await fixture();
    await expect(
      target.service.cancel(
        command({
          principal: {
            principalId: 'principal.denied',
            type: 'user',
            tenantId: scope.tenantId,
            permissionScopes: [],
          },
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_CONFLICT' });
    await expect(
      target.runLeases.get({
        tenantId: scope.tenantId,
        userId: scope.userId,
        runId: scope.runId,
        partitionKey: `runtime:${scope.runId}`,
      })
    ).resolves.toBeNull();
  });
});
