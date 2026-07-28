import { describe, expect, it, vi } from 'vitest';
import type { EventCreateInput, FrameworkEventType } from '../../events';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type { JsonSchema } from '../../specs';
import { InMemoryTelemetryRecorder } from '../../telemetry';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import { DurableEventRuntime } from './event-runtime';
import { InMemoryDurableEventStore, type EventStreamScope } from './event-store';
import { createRuntimeOrchestrationProjectionDefinition } from './orchestration-projection';
import { InMemoryProjectionStore, ProjectionEngine } from './projection';
import { InMemoryRunLeaseStore } from './run-lease-store';
import {
  RUNTIME_OPERATIONAL_METRIC_NAMES,
  RuntimeOperationalTelemetry,
} from './runtime-operational-telemetry';
import {
  DurableRuntimeTimerWorker,
  type DurableRuntimeTimerWorkerOptions,
} from './runtime-timer-worker';

const timerEventTypes: FrameworkEventType[] = [
  'run.created',
  'run.started',
  'run.resume.requested',
  'run.resumed',
  'run.waiting_timer',
  'runtime.wait.created',
  'runtime.wait.resolved',
  'runtime.timer.created',
  'runtime.timer.fired',
  'fsm.state.entered',
];

const payloadSchema: JsonSchema = { type: 'object', additionalProperties: true };

async function fixture() {
  let currentTime = Date.UTC(2026, 6, 18, 9, 0, 0);
  let idSequence = 0;
  const now = () => new Date(currentTime++).toISOString();
  const setNow = (value: string) => {
    currentTime = Date.parse(value);
  };
  const nextId = (namespace: string) => `${namespace}.${++idSequence}`;
  const schemas = new InMemoryEventSchemaRegistry();
  for (const eventType of timerEventTypes) {
    await schemas.register({
      eventType,
      version: '1.0.0',
      schema: payloadSchema,
      schemaHash: hashCanonicalJson(payloadSchema),
    });
  }
  const eventStore = new InMemoryDurableEventStore({ schemaRegistry: schemas, now });
  const events = new DurableEventRuntime({ store: eventStore, now });
  const runLeases = new InMemoryRunLeaseStore({ now });
  return { events, runLeases, now, setNow, nextId };
}

function scope(runId: string): EventStreamScope {
  return { tenantId: 'tenant.timer', userId: 'user.timer', runId };
}

async function seedTimer(
  target: Awaited<ReturnType<typeof fixture>>,
  runId: string,
  fireAt: string
): Promise<void> {
  const stream = scope(runId);
  const waitId = `wait.${runId}`;
  const createdAt = '2026-07-18T07:00:00.000Z';
  const wait = { type: 'timer', expiresAt: fireAt };
  await target.events.append({
    scope: stream,
    events: [
      event(stream, `${runId}.created`, 'run.created', {}, createdAt),
      event(stream, `${runId}.started`, 'run.started', {}, createdAt),
      event(stream, `${runId}.state.1`, 'fsm.state.entered', { stateId: 'Waiting' }, createdAt, 1),
      event(
        stream,
        `${runId}.wait.created`,
        'runtime.wait.created',
        {
          waitId,
          stateId: 'Waiting',
          stateAttempt: 1,
          wait,
          createdAt,
        },
        createdAt,
        1
      ),
      event(
        stream,
        `${runId}.timer.created`,
        'runtime.timer.created',
        { timerId: waitId, waitId, fireAt },
        createdAt,
        1
      ),
      event(
        stream,
        `${runId}.waiting`,
        'run.waiting_timer',
        { waitId, stateId: 'Waiting', wait },
        createdAt,
        1
      ),
    ],
    expectedLastSequence: 0,
    idempotencyKey: `seed:${runId}`,
  });
}

function event(
  stream: EventStreamScope,
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
    tenantId: stream.tenantId,
    userId: stream.userId,
    runId: stream.runId,
    fsmState: 'Waiting',
    timestamp,
    payload,
    ...(stateAttempt === undefined ? {} : { metadata: { stateAttempt } }),
  };
}

function worker(
  target: Awaited<ReturnType<typeof fixture>>,
  projectionStore = new InMemoryProjectionStore<RuntimeOrchestrationProjection>(),
  options: Partial<
    Pick<
      DurableRuntimeTimerWorkerOptions,
      | 'renewalIntervalMs'
      | 'wait'
      | 'onLeaseRenewalFailure'
      | 'operationalTelemetry'
      | 'monotonicNow'
    >
  > = {}
) {
  const projections = new ProjectionEngine({ events: target.events, now: target.now });
  return {
    projectionStore,
    projections,
    worker: new DurableRuntimeTimerWorker({
      events: target.events,
      projections,
      projectionStore,
      runLeases: target.runLeases,
      now: target.now,
      nextId: target.nextId,
      ...options,
    }),
  };
}

function sweep(firedAt: string, limit = 100, cursor?: string) {
  return {
    ownerId: 'timer-worker.test',
    leaseTtlMs: 30_000,
    limit,
    firedAt,
    ...(cursor === undefined ? {} : { cursor }),
  };
}

describe('DurableRuntimeTimerWorker', () => {
  it('fires an overdue Timer after restart and never fires it twice', async () => {
    const target = await fixture();
    await seedTimer(target, 'run.timer.overdue', '2026-07-18T08:00:00.000Z');
    const restarted = worker(target);

    const first = await restarted.worker.sweep(sweep('2026-07-18T09:00:00.000Z'));
    expect(first).toMatchObject({
      scanned: 1,
      fired: 1,
      notDue: 0,
      results: [{ disposition: 'fired' }],
    });
    expect(first.results[0].eventIds).toHaveLength(5);

    const projection = await restarted.projections.update(
      createRuntimeOrchestrationProjectionDefinition('run.timer.overdue'),
      restarted.projectionStore,
      scope('run.timer.overdue')
    );
    expect(projection.state).toMatchObject({
      runStatus: 'running',
      currentState: 'Waiting',
      stateAttempt: 2,
      statePath: ['Waiting', 'Waiting'],
      lastResume: {
        kind: 'timer',
        payload: {
          scheduledFor: '2026-07-18T08:00:00.000Z',
          firedAt: '2026-07-18T09:00:00.000Z',
        },
      },
    });

    await expect(restarted.worker.sweep(sweep('2026-07-18T09:01:00.000Z'))).resolves.toMatchObject({
      fired: 0,
      notDue: 1,
    });
    const firedEvents = await target.events.read({
      scope: scope('run.timer.overdue'),
      types: ['runtime.timer.fired'],
    });
    expect(firedEvents).toHaveLength(1);
  });

  it('does not fire a Timer before its persisted deadline', async () => {
    const target = await fixture();
    await seedTimer(target, 'run.timer.future', '2026-07-18T10:00:00.000Z');
    const active = worker(target);

    await expect(active.worker.sweep(sweep('2026-07-18T09:59:59.999Z'))).resolves.toMatchObject({
      fired: 0,
      notDue: 1,
    });
    const projection = await active.projections.update(
      createRuntimeOrchestrationProjectionDefinition('run.timer.future'),
      active.projectionStore,
      scope('run.timer.future')
    );
    expect(projection.state).toMatchObject({
      runStatus: 'waiting_timer',
      pendingWait: { expiresAt: '2026-07-18T10:00:00.000Z' },
    });
  });

  it('leaves a due Timer pending when another worker owns its Run Lease', async () => {
    const target = await fixture();
    const runId = 'run.timer.leased';
    await seedTimer(target, runId, '2026-07-18T08:00:00.000Z');
    const acquiredAt = target.now();
    await target.runLeases.acquire({
      tenantId: scope(runId).tenantId,
      userId: scope(runId).userId,
      runId,
      partitionKey: `runtime:${runId}`,
      requestedLeaseId: target.nextId('held-lease'),
      ownerId: 'worker.other',
      ttlMs: 60_000,
      acquiredAt,
      idempotencyKey: 'held-timer-lease',
    });
    const active = worker(target);

    await expect(active.worker.sweep(sweep('2026-07-18T09:01:00.000Z'))).resolves.toMatchObject({
      fired: 0,
      leaseUnavailable: 1,
      results: [{ disposition: 'lease_unavailable', eventIds: [] }],
    });
    await expect(
      target.events.read({ scope: scope(runId), types: ['runtime.timer.fired'] })
    ).resolves.toHaveLength(0);
  });

  it('paginates stream scans without exceeding the requested bound', async () => {
    const target = await fixture();
    await seedTimer(target, 'run.timer.page.1', '2026-07-18T08:00:00.000Z');
    await seedTimer(target, 'run.timer.page.2', '2026-07-18T08:00:00.000Z');
    const active = worker(target);

    const first = await active.worker.sweep(sweep('2026-07-18T09:00:00.000Z', 1));
    expect(first).toMatchObject({ scanned: 1, fired: 1 });
    expect(first.nextCursor).toBeDefined();
    const second = await active.worker.sweep(
      sweep('2026-07-18T09:00:00.000Z', 1, first.nextCursor)
    );
    expect(second).toMatchObject({ scanned: 1, fired: 1 });
  });

  it('renews the Run lease while a slow Timer firing remains in progress', async () => {
    const target = await fixture();
    await seedTimer(target, 'run.timer.slow', '2026-07-18T08:00:00.000Z');
    const recorder = new InMemoryTelemetryRecorder();
    const operationalTelemetry = new RuntimeOperationalTelemetry({ recorder });
    let monotonicNow = 0;
    const active = worker(target, undefined, {
      renewalIntervalMs: 2,
      operationalTelemetry,
      monotonicNow: () => monotonicNow++ * 3,
    });
    const heartbeat = vi.spyOn(target.runLeases, 'heartbeat');
    const getStreamHead = target.events.getStreamHead.bind(target.events);
    vi.spyOn(target.events, 'getStreamHead').mockImplementation(async (stream) => {
      await new Promise((resolve) => setTimeout(resolve, 15));
      return getStreamHead(stream);
    });

    await expect(
      active.worker.sweep({
        ...sweep('2026-07-18T09:00:00.000Z'),
        leaseTtlMs: 100,
      })
    ).resolves.toMatchObject({ fired: 1 });

    expect(heartbeat).toHaveBeenCalled();
    expect(heartbeat).toHaveBeenCalledWith(
      expect.objectContaining({
        ttlMs: 100,
        guard: expect.objectContaining({ fencingToken: 1 }),
      })
    );
    expect(recorder.list(RUNTIME_OPERATIONAL_METRIC_NAMES.leaseRenewalLatencyMs)[0]).toMatchObject({
      value: 3,
      attributes: { resource: 'run', outcome: 'succeeded' },
    });
  });

  it('fences a paused Timer worker after another instance takes over the expired lease', async () => {
    const target = await fixture();
    const runId = 'run.timer.takeover';
    await seedTimer(target, runId, '2026-07-18T08:00:00.000Z');
    const recorder = new InMemoryTelemetryRecorder();
    const operationalTelemetry = new RuntimeOperationalTelemetry({ recorder });
    let releaseHeartbeat: (() => void) | undefined;
    const heartbeatBarrier = new Promise<void>((resolve) => {
      releaseHeartbeat = resolve;
    });
    let releaseHead: (() => void) | undefined;
    const headBarrier = new Promise<void>((resolve) => {
      releaseHead = resolve;
    });
    let markHeadBlocked: (() => void) | undefined;
    const headBlocked = new Promise<void>((resolve) => {
      markHeadBlocked = resolve;
    });
    let markLeaseFailure: (() => void) | undefined;
    const leaseFailure = new Promise<void>((resolve) => {
      markLeaseFailure = resolve;
    });
    const getStreamHead = target.events.getStreamHead.bind(target.events);
    vi.spyOn(target.events, 'getStreamHead').mockImplementationOnce(async (stream) => {
      markHeadBlocked?.();
      await headBarrier;
      return getStreamHead(stream);
    });
    const assertCurrent = vi.spyOn(target.runLeases, 'assertCurrent');
    const paused = worker(target, undefined, {
      renewalIntervalMs: 25,
      wait: async (_delayMs, signal) => {
        await Promise.race([
          heartbeatBarrier,
          new Promise<void>((resolve) => {
            if (signal.aborted) {
              resolve();
              return;
            }
            signal.addEventListener('abort', () => resolve(), { once: true });
          }),
        ]);
      },
      onLeaseRenewalFailure: () => markLeaseFailure?.(),
      operationalTelemetry,
      monotonicNow: vi.fn().mockReturnValueOnce(10).mockReturnValueOnce(14),
    });
    const pausedResult = paused.worker.sweep({
      ...sweep('2026-07-18T09:00:00.000Z'),
      ownerId: 'timer-worker.a',
      leaseTtlMs: 100,
    });
    await headBlocked;

    target.setNow('2026-07-18T09:00:00.200Z');
    const replacement = worker(target);
    await expect(
      replacement.worker.sweep({
        ...sweep('2026-07-18T09:00:00.000Z'),
        ownerId: 'timer-worker.b',
        leaseTtlMs: 100,
      })
    ).resolves.toMatchObject({ fired: 1 });
    releaseHeartbeat?.();
    await leaseFailure;
    releaseHead?.();

    await expect(pausedResult).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
    expect(assertCurrent).toHaveBeenCalledWith(
      expect.objectContaining({ guard: expect.objectContaining({ fencingToken: 2 }) })
    );
    expect(assertCurrent).toHaveBeenCalledWith(
      expect.objectContaining({ guard: expect.objectContaining({ fencingToken: 1 }) })
    );
    await expect(
      target.events.read({ scope: scope(runId), types: ['runtime.timer.fired'] })
    ).resolves.toHaveLength(1);
    expect(recorder.list(RUNTIME_OPERATIONAL_METRIC_NAMES.leaseRenewalLatencyMs)).toEqual([
      expect.objectContaining({
        value: 4,
        attributes: { resource: 'run', outcome: 'failed' },
      }),
    ]);
  });
});
