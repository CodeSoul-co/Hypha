import { describe, expect, it } from 'vitest';
import type { RuntimeMessageEnvelopeInput } from '../../contracts/runtime-messages';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type { RuntimeScope } from '../../contracts/runtime';
import type { EventCreateInput, FrameworkEventType } from '../../events';
import type { JsonSchema } from '../../specs';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import { DurableEventRuntime } from './event-runtime';
import { InMemoryDurableEventStore } from './event-store';
import {
  InMemoryMessageBus,
  createRuntimeMessageEnvelope,
  type MessageDelivery,
} from './message-bus';
import {
  InMemoryRuntimeMessageInboxStore,
  InMemoryRuntimeMessageOutboxStore,
  RuntimeInboxProcessor,
  RuntimeOutboxDispatcher,
} from './message-inbox-outbox';
import { InMemoryProjectionStore, ProjectionEngine } from './projection';
import { InMemoryRunLeaseStore, runLeaseGuard } from './run-lease-store';
import { RuntimeQueryService } from './runtime-query-service';
import { InMemorySessionQueue } from './session-queue';

const initialTime = '2026-07-18T16:00:00.000Z';
const payloadHash = 'sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';
const scope: RuntimeScope = {
  tenantId: 'tenant.convergence',
  userId: 'user.convergence',
  sessionId: 'session.convergence',
  runId: 'run.convergence',
};
const eventTypes: FrameworkEventType[] = [
  'run.created',
  'run.started',
  'fsm.state.entered',
  'fsm.state.exited',
];
const eventPayloadSchema: JsonSchema = { type: 'object', additionalProperties: true };

async function eventFixture(now: () => string) {
  const schemas = new InMemoryEventSchemaRegistry();
  for (const eventType of eventTypes) {
    await schemas.register({
      eventType,
      version: '1.0.0',
      schema: eventPayloadSchema,
      schemaHash: hashCanonicalJson(eventPayloadSchema),
    });
  }
  const store = new InMemoryDurableEventStore({ schemaRegistry: schemas, now });
  const events = new DurableEventRuntime({ store, now });
  const projectionStore = new InMemoryProjectionStore<RuntimeOrchestrationProjection>();
  const projections = new ProjectionEngine({ events, now });
  return {
    events,
    query: new RuntimeQueryService({ events, projections, projectionStore, now }),
  };
}

function envelope(): RuntimeMessageEnvelopeInput {
  return {
    messageId: 'message.start-run',
    messageType: 'runtime.command.start',
    schemaVersion: '1.0.0',
    topic: 'hypha.runtime.commands',
    partitionKey: 'session.convergence',
    tenantId: scope.tenantId,
    userId: scope.userId,
    sessionId: scope.sessionId,
    runId: scope.runId,
    payload: { commandId: 'command.start-run' },
    publishedAt: initialTime,
    producerId: 'runtime.convergence.test',
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
    sessionId: scope.sessionId,
    runId: scope.runId,
    timestamp,
    payload,
  };
}

function streamScope() {
  return { tenantId: scope.tenantId, userId: scope.userId, runId: scope.runId };
}

async function nextDelivery(bus: InMemoryMessageBus): Promise<MessageDelivery> {
  const subscription = bus.subscribe({
    consumerId: 'runtime.worker',
    consumerGroup: 'runtime.commands',
    topic: 'hypha.runtime.commands',
    maxMessages: 1,
    idleTimeoutMs: 0,
    ackDeadlineMs: 1_000,
  });
  const delivery = await subscription[Symbol.asyncIterator]().next();
  if (delivery.done) throw new Error('Expected a Runtime command delivery');
  return delivery.value;
}

describe('Runtime restart and convergence', () => {
  it('converges Queue, Outbox, Inbox, Event, and Projection after Ack loss and restart', async () => {
    let now = initialTime;
    const runtime = await eventFixture(() => now);
    const queue = new InMemorySessionQueue({ now: () => now });
    const bus = new InMemoryMessageBus({ now: () => now, maxDeliveryAttempts: 3 });
    const inbox = new InMemoryRuntimeMessageInboxStore();
    const outbox = new InMemoryRuntimeMessageOutboxStore();
    await queue.enqueue({
      id: 'command.start-run',
      commandType: 'start_run',
      idempotencyKey: 'command.start-run',
      tenantId: scope.tenantId,
      userId: scope.userId,
      sessionId: scope.sessionId,
      targetRunId: scope.runId,
      payloadHash,
      createdAt: now,
    });
    await queue.claim({ workerId: 'command.worker', now, leaseMs: 5_000 });
    await outbox.enqueue({
      id: 'outbox.start-run',
      envelope: createRuntimeMessageEnvelope(envelope()),
      createdAt: now,
    });
    await new RuntimeOutboxDispatcher({
      ownerId: 'publisher.before-restart',
      outbox,
      bus,
      now: () => now,
    }).dispatch();
    const delivery = await nextDelivery(bus);
    const lostAck: MessageDelivery = {
      ...delivery,
      ack: async () => {
        throw new Error('Ack response lost during process shutdown');
      },
    };
    let applications = 0;
    const firstProcessor = new RuntimeInboxProcessor({
      consumerId: 'runtime.commands',
      ownerId: 'runtime.before-restart',
      inbox,
      now: () => now,
      processingLeaseMs: 1_000,
    });
    const applied = await firstProcessor.handle(lostAck, async () => {
      applications += 1;
      const result = await runtime.events.append({
        scope: streamScope(),
        events: [
          event('event.run.created', 'run.created', {}, now),
          event('event.run.started', 'run.started', {}, now),
          event('event.state.entered', 'fsm.state.entered', { stateId: 'Acting' }, now),
        ],
        expectedLastSequence: 0,
        idempotencyKey: 'apply.command.start-run',
      });
      return result.events.map((item) => item.id);
    });
    expect(applied).toMatchObject({ disposition: 'applied', ackPending: true });
    await queue.complete({
      commandId: 'command.start-run',
      workerId: 'command.worker',
      completedAt: '2026-07-18T16:00:00.500Z',
      resultRunId: scope.runId,
      resultEventIds: applied.appliedEventIds,
    });

    now = '2026-07-18T16:00:02.000Z';
    const restartedProcessor = new RuntimeInboxProcessor({
      consumerId: 'runtime.commands',
      ownerId: 'runtime.after-restart',
      inbox,
      now: () => now,
      processingLeaseMs: 1_000,
    });
    const redelivery = await nextDelivery(bus);
    const duplicate = await restartedProcessor.handle(redelivery, async () => {
      applications += 1;
      return [];
    });

    expect(duplicate).toMatchObject({
      disposition: 'duplicate',
      appliedEventIds: applied.appliedEventIds,
    });
    expect(applications).toBe(1);
    expect(
      (await runtime.events.read({ scope: streamScope() })).map((item) => item.sequence)
    ).toEqual([1, 2, 3]);
    await expect(runtime.query.getRun({ scope })).resolves.toMatchObject({
      projection: { runStatus: 'running', currentState: 'Acting' },
      projectionLastSequence: 3,
      eventHeadSequence: 3,
      projectionLag: 0,
    });
    await expect(
      queue.list({
        scope: { tenantId: scope.tenantId, userId: scope.userId, sessionId: scope.sessionId },
      })
    ).resolves.toMatchObject([{ status: 'applied', resultEventIds: applied.appliedEventIds }]);
    await expect(outbox.get('outbox.start-run')).resolves.toMatchObject({ state: 'published' });
  });

  it('recovers expired Queue and Run Leases while fencing the stale worker', async () => {
    let now = initialTime;
    const runtime = await eventFixture(() => now);
    const queue = new InMemorySessionQueue({ now: () => now });
    const runLeases = new InMemoryRunLeaseStore({ now: () => now });
    await runtime.events.append({
      scope: streamScope(),
      events: [event('event.run.created', 'run.created', {}, now)],
      expectedLastSequence: 0,
      idempotencyKey: 'seed.run.created',
    });
    await queue.enqueue({
      id: 'command.resume-run',
      commandType: 'resume',
      idempotencyKey: 'command.resume-run',
      tenantId: scope.tenantId,
      userId: scope.userId,
      sessionId: scope.sessionId,
      targetRunId: scope.runId,
      payloadHash,
      createdAt: now,
    });
    await queue.claim({ workerId: 'worker.stale', now, leaseMs: 1_000 });
    const staleLease = await runLeases.acquire({
      ...streamScope(),
      partitionKey: `runtime:${scope.runId}`,
      requestedLeaseId: 'lease.stale',
      ownerId: 'worker.stale',
      ttlMs: 1_000,
      acquiredAt: now,
      idempotencyKey: 'lease.stale',
    });
    let head = (await runtime.events.getStreamHead(streamScope()))!;
    await runtime.events.append({
      scope: streamScope(),
      events: [event('event.run.started', 'run.started', {}, now)],
      expectedLastSequence: head.lastSequence,
      expectedRunRevision: head.runRevision,
      fencingToken: staleLease!.fencingToken,
      idempotencyKey: 'worker.stale.started',
    });

    now = '2026-07-18T16:00:02.000Z';
    const recoveredCommand = await queue.claim({
      workerId: 'worker.recovery',
      now,
      leaseMs: 1_000,
    });
    const recoveryLease = await runLeases.acquire({
      ...streamScope(),
      partitionKey: `runtime:${scope.runId}`,
      requestedLeaseId: 'lease.recovery',
      ownerId: 'worker.recovery',
      ttlMs: 1_000,
      acquiredAt: now,
      idempotencyKey: 'lease.recovery',
    });
    head = (await runtime.events.getStreamHead(streamScope()))!;
    const recoveredAppend = await runtime.events.append({
      scope: streamScope(),
      events: [event('event.state.entered', 'fsm.state.entered', { stateId: 'Acting' }, now)],
      expectedLastSequence: head.lastSequence,
      expectedRunRevision: head.runRevision,
      fencingToken: recoveryLease!.fencingToken,
      idempotencyKey: 'worker.recovery.state-entered',
    });

    head = (await runtime.events.getStreamHead(streamScope()))!;
    await expect(
      runtime.events.append({
        scope: streamScope(),
        events: [event('event.state.stale-exit', 'fsm.state.exited', { stateId: 'Acting' }, now)],
        expectedLastSequence: head.lastSequence,
        expectedRunRevision: head.runRevision,
        fencingToken: staleLease!.fencingToken,
        idempotencyKey: 'worker.stale.late-write',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
    await expect(
      queue.complete({
        commandId: 'command.resume-run',
        workerId: 'worker.stale',
        completedAt: now,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });
    await queue.complete({
      commandId: recoveredCommand!.id,
      workerId: 'worker.recovery',
      completedAt: '2026-07-18T16:00:02.500Z',
      resultEventIds: recoveredAppend.events.map((item) => item.id),
    });
    await expect(
      runLeases.heartbeat({
        scope: {
          ...streamScope(),
          partitionKey: `runtime:${scope.runId}`,
        },
        guard: runLeaseGuard(staleLease!),
        ttlMs: 1_000,
        heartbeatAt: '2026-07-18T16:00:02.500Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
    expect(
      (await runtime.events.read({ scope: streamScope() })).map((item) => item.sequence)
    ).toEqual([1, 2, 3]);
    await expect(runtime.query.getFSM({ scope })).resolves.toMatchObject({
      runStatus: 'running',
      currentState: 'Acting',
    });
  });
});
