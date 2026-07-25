import { describe, expect, it } from 'vitest';
import type {
  RuntimeCheckpointCreateCommand,
  RuntimeCheckpointStore,
} from '../../contracts/runtime-checkpoint';
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
import { RuntimeCheckpointService } from './runtime-checkpoint-service';
import { InMemoryRuntimeCheckpointStore } from './runtime-checkpoint-store';

const scope: RuntimeScope = {
  tenantId: 'tenant.checkpoint',
  userId: 'user.checkpoint',
  workspaceId: 'workspace.checkpoint',
  sessionId: 'session.checkpoint',
  runId: 'run.checkpoint',
  agentId: 'agent.checkpoint',
};

const checkpointEventTypes: FrameworkEventType[] = [
  'run.created',
  'run.started',
  'fsm.state.entered',
  'runtime.checkpoint.created',
  'runtime.checkpoint.failed',
];
const payloadSchema: JsonSchema = { type: 'object', additionalProperties: true };

async function fixture(interruptCreatedReceipt = false) {
  let milliseconds = 0;
  let idSequence = 0;
  let shouldInterrupt = interruptCreatedReceipt;
  const now = () => new Date(Date.UTC(2026, 6, 18, 13, 0, 0, milliseconds++)).toISOString();
  const nextId = (namespace: string) => `${namespace}.${++idSequence}`;
  const schemas = new InMemoryEventSchemaRegistry();
  for (const eventType of checkpointEventTypes) {
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
        shouldInterrupt &&
        request.transactionGroupId === 'runtime-checkpoint:checkpoint.default:created'
      ) {
        shouldInterrupt = false;
        throw new Error('simulated receipt interruption');
      }
      return durableEvents.append(request);
    },
    read: (request) => durableEvents.read(request),
    stream: (request) => durableEvents.stream(request),
    latestSequence: (eventScope) => durableEvents.latestSequence(eventScope),
    getStreamHead: (eventScope) => durableEvents.getStreamHead(eventScope),
    listStreamHeads: (request) => durableEvents.listStreamHeads(request),
    export: (request) => durableEvents.export(request),
    import: (request) => durableEvents.import(request),
  };
  const projectionStore = new InMemoryProjectionStore<RuntimeOrchestrationProjection>();
  const projections = new ProjectionEngine({ events, now });
  const runLeases = new InMemoryRunLeaseStore({ now });
  const checkpoints = new InMemoryRuntimeCheckpointStore();
  const checkpointService = (checkpointStore: RuntimeCheckpointStore = checkpoints) =>
    new RuntimeCheckpointService({
      events,
      projections,
      projectionStore,
      checkpoints: checkpointStore,
      runLeases,
      now,
      nextId,
    });
  const service = checkpointService();
  await durableEvents.append({
    scope: streamScope(),
    events: [
      event('seed.run.created', 'run.created', {}, now()),
      event('seed.run.started', 'run.started', {}, now()),
      event('seed.state.entered', 'fsm.state.entered', { stateId: 'Acting' }, now()),
    ],
    expectedLastSequence: 0,
    idempotencyKey: 'seed.running-run',
  });
  return {
    service,
    checkpointService,
    checkpoints,
    events,
    runLeases,
    now,
  };
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
    workspaceId: scope.workspaceId,
    sessionId: scope.sessionId,
    runId: scope.runId,
    agentId: scope.agentId,
    timestamp,
    payload,
  };
}

function streamScope() {
  return { tenantId: scope.tenantId, userId: scope.userId, runId: scope.runId };
}

function command(
  overrides: Partial<RuntimeCheckpointCreateCommand> = {}
): RuntimeCheckpointCreateCommand {
  return {
    checkpointId: 'checkpoint.default',
    scope,
    ownerId: 'runtime-checkpoint.worker',
    leaseTtlMs: 30_000,
    workflowRevision: 'workflow.default@1.0.0',
    processHash: 'process-hash.default',
    variablesHash: 'variables-hash.default',
    dependencySnapshotRef: 'dependency-snapshot.default',
    reason: 'state_boundary',
    createdAt: '2026-07-18T13:00:10.000Z',
    ...overrides,
  };
}

describe('RuntimeCheckpointService', () => {
  it('creates a checksummed Checkpoint, emits its receipt, and reuses the operation', async () => {
    const target = await fixture();

    const first = await target.service.create(command());
    const second = await target.service.create(command());
    const loaded = await target.service.load({
      scope,
      checkedAt: '2026-07-18T13:00:11.000Z',
    });

    expect(first).toMatchObject({
      checkpointId: 'checkpoint.default',
      disposition: 'applied',
      record: { sequence: 1, lastEventSequence: 3, currentState: 'Acting' },
    });
    expect(second).toMatchObject({ disposition: 'reused', eventIds: first.eventIds });
    expect(loaded).toMatchObject({
      record: { id: 'checkpoint.default' },
      currentHeadSequence: 4,
      deltaFromSequence: 4,
      deltaEventCount: 1,
    });
    expect(
      (await target.events.read({ scope: streamScope() })).filter(
        (item) => item.type === 'runtime.checkpoint.created'
      )
    ).toHaveLength(1);
  });

  it('returns lease_unavailable without writing a Checkpoint', async () => {
    const target = await fixture();
    await target.runLeases.acquire({
      ...streamScope(),
      partitionKey: `runtime:${scope.runId}`,
      requestedLeaseId: 'lease.active',
      ownerId: 'worker.active',
      ttlMs: 30_000,
      acquiredAt: '2026-07-18T13:00:00.000Z',
      idempotencyKey: 'lease.active',
    });

    await expect(target.service.create(command())).resolves.toEqual({
      checkpointId: 'checkpoint.default',
      disposition: 'lease_unavailable',
      eventIds: [],
    });
    await expect(target.checkpoints.latest(scope)).resolves.toBeNull();
  });

  it('hides an orphaned Store write until retry appends the Event receipt', async () => {
    const target = await fixture(true);

    await expect(target.service.create(command())).rejects.toThrow(
      'simulated receipt interruption'
    );
    await expect(target.checkpoints.latest(scope)).resolves.toMatchObject({
      id: 'checkpoint.default',
    });
    await expect(
      target.service.load({ scope, checkedAt: '2026-07-18T13:00:11.000Z' })
    ).resolves.toBeNull();

    await expect(target.service.create(command())).resolves.toMatchObject({
      disposition: 'applied',
      record: { id: 'checkpoint.default', sequence: 1 },
    });
    expect(await target.checkpoints.list(scope)).toHaveLength(1);
    expect(
      (await target.events.read({ scope: streamScope() })).filter(
        (item) => item.type === 'runtime.checkpoint.created'
      )
    ).toHaveLength(1);
  });

  it('rejects a tampered materialization even when its receipt exists', async () => {
    const target = await fixture();
    await target.service.create(command());
    const tamperedStore: RuntimeCheckpointStore = {
      put: (record, idempotencyKey) => target.checkpoints.put(record, idempotencyKey),
      get: async (checkpointScope, checkpointId) => {
        const record = await target.checkpoints.get(checkpointScope, checkpointId);
        return record ? { ...record, variablesHash: 'tampered' } : null;
      },
      latest: (checkpointScope) => target.checkpoints.latest(checkpointScope),
      list: (checkpointScope, limit) => target.checkpoints.list(checkpointScope, limit),
    };

    await expect(
      target.checkpointService(tamperedStore).load({ scope, checkedAt: '2026-07-18T13:00:11.000Z' })
    ).rejects.toMatchObject({ code: 'RUNTIME_CHECKPOINT_FAILED' });
  });

  it('takes over an expired Lease and fences the stale worker', async () => {
    const target = await fixture();
    const stale = await target.runLeases.acquire({
      ...streamScope(),
      partitionKey: `runtime:${scope.runId}`,
      requestedLeaseId: 'lease.stale',
      ownerId: 'worker.stale',
      ttlMs: 1_000,
      acquiredAt: '2026-07-18T12:59:00.000Z',
      idempotencyKey: 'lease.stale',
    });

    await expect(target.service.create(command())).resolves.toMatchObject({
      disposition: 'applied',
    });
    await expect(
      target.runLeases.heartbeat({
        scope: {
          ...streamScope(),
          partitionKey: `runtime:${scope.runId}`,
        },
        guard: runLeaseGuard(stale!),
        ttlMs: 30_000,
        heartbeatAt: '2026-07-18T13:00:01.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });
});
