import { describe, expect, it } from 'vitest';
import { InMemoryRunLeaseStore } from './durable-coordination';
import { InMemoryEventStoreV2, type EventStreamScope } from './event-store';
import { DurableEventRuntime } from './event-runtime';
import { EventFirstRecoveryScanner } from './recovery-scanner';
import { EventSourcedRunManager } from './run-manager';

function scope(runId: string): EventStreamScope {
  return { tenantId: 'tenant.recovery', userId: 'user.recovery', runId };
}

function command(
  target: EventStreamScope,
  expectedLastSequence: number,
  expectedRunRevision: number,
  name: string
) {
  return {
    scope: target,
    expectedLastSequence,
    expectedRunRevision,
    fencingToken: 1,
    idempotencyKey: `idempotency.${name}`,
    operationId: `operation.${name}`,
  };
}

async function createStarted(
  manager: EventSourcedRunManager,
  target: EventStreamScope,
  name: string
): Promise<void> {
  await manager.create({
    ...command(target, 0, 0, `${name}.create`),
    sessionId: 'session.recovery',
    workflowRef: { id: 'workflow.recovery', revision: 'revision.1' },
    workflowRevision: 'revision.1',
    processSpecRef: 'process.recovery',
    processHash: 'sha256:process-recovery',
    input: { name },
  });
  await manager.start(command(target, 1, 1, `${name}.start`));
}

describe('EventFirstRecoveryScanner', () => {
  it('discovers overdue timers, durable waits, and expired leases with pagination', async () => {
    const store = new InMemoryEventStoreV2();
    const events = new DurableEventRuntime({ store });
    const leases = new InMemoryRunLeaseStore();
    const manager = new EventSourcedRunManager({
      events,
      now: () => '2026-07-17T05:00:00.000Z',
    });
    const timerScope = scope('run.timer');
    const signalScope = scope('run.signal');
    const staleScope = scope('run.stale');
    const activeScope = scope('run.active');
    await createStarted(manager, timerScope, 'timer');
    await manager.wait({
      ...command(timerScope, 2, 2, 'timer.wait'),
      waitId: 'wait.timer',
      stateId: 'Sleep',
      wait: { type: 'timer', expiresAt: '2026-07-17T05:30:00.000Z' },
    });
    await createStarted(manager, signalScope, 'signal');
    await manager.wait({
      ...command(signalScope, 2, 2, 'signal.wait'),
      waitId: 'wait.signal',
      stateId: 'AwaitSignal',
      wait: { type: 'signal', key: 'continue' },
    });
    await createStarted(manager, staleScope, 'stale');
    await leases.acquire({
      runId: staleScope.runId,
      ownerId: 'worker.old',
      now: '2026-07-17T05:00:00.000Z',
      ttlMs: 1000,
    });
    await createStarted(manager, activeScope, 'active');
    await leases.acquire({
      runId: activeScope.runId,
      ownerId: 'worker.active',
      now: '2026-07-17T05:59:00.000Z',
      ttlMs: 120000,
    });

    const scanner = new EventFirstRecoveryScanner({ events, leases });
    const candidates = [];
    let cursor: string | undefined;
    do {
      const page = await scanner.scan({
        now: '2026-07-17T06:00:00.000Z',
        limit: 2,
        ...(cursor === undefined ? {} : { cursor }),
      });
      candidates.push(...page.candidates);
      cursor = page.nextCursor;
    } while (cursor);

    expect(candidates).toHaveLength(3);
    expect(candidates).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          scope: timerScope,
          reason: 'TIMER_OVERDUE',
          safeAction: 'fire_timer',
          wait: expect.objectContaining({ id: 'wait.timer' }),
        }),
        expect.objectContaining({
          scope: signalScope,
          reason: 'CUSTOM',
          safeAction: 'restore_wait',
          wait: expect.objectContaining({ id: 'wait.signal' }),
        }),
        expect.objectContaining({
          scope: staleScope,
          reason: 'LEASE_EXPIRED',
          safeAction: 'requeue',
          currentLease: expect.objectContaining({ ownerId: 'worker.old' }),
        }),
      ])
    );
    await expect(scanner.inspectScope(activeScope, '2026-07-17T06:00:00.000Z')).resolves.toBeNull();
  });

  it('flags a waiting Run whose Wait fact is missing', async () => {
    const store = new InMemoryEventStoreV2();
    const events = new DurableEventRuntime({ store });
    const manager = new EventSourcedRunManager({ events });
    const target = scope('run.missing-wait');
    await createStarted(manager, target, 'missing-wait');
    await store.append({
      scope: target,
      events: [
        {
          id: 'event.missing-wait',
          type: 'run.waiting_signal',
          runId: target.runId,
          operationId: 'operation.missing-wait',
          timestamp: '2026-07-17T06:00:00.000Z',
          payload: { waitId: 'wait.missing' },
        },
      ],
      expectedLastSequence: 2,
      expectedRunRevision: 2,
      fencingToken: 1,
      idempotencyKey: 'idempotency.missing-wait',
    });

    const scanner = new EventFirstRecoveryScanner({ events });
    await expect(scanner.inspectScope(target, '2026-07-17T06:01:00.000Z')).resolves.toMatchObject({
      reason: 'WAIT_WITHOUT_REGISTRATION',
      safeAction: 'manual_review',
      runStatus: 'waiting_signal',
    });
  });

  it('detects a stream transaction that cannot reproduce the head revision', async () => {
    const store = new InMemoryEventStoreV2();
    const events = new DurableEventRuntime({ store });
    const manager = new EventSourcedRunManager({ events });
    const target = scope('run.revision-conflict');
    await createStarted(manager, target, 'revision-conflict');
    await store.append({
      scope: target,
      events: [
        {
          id: 'event.unscoped-operation.1',
          type: 'runtime.message.received',
          runId: target.runId,
          timestamp: '2026-07-17T06:00:00.000Z',
          payload: { messageId: 'message.1' },
        },
        {
          id: 'event.unscoped-operation.2',
          type: 'runtime.message.acked',
          runId: target.runId,
          timestamp: '2026-07-17T06:00:00.000Z',
          payload: { messageId: 'message.1' },
        },
      ],
      expectedLastSequence: 2,
      expectedRunRevision: 2,
      fencingToken: 1,
      idempotencyKey: 'idempotency.unscoped-operation',
    });

    const scanner = new EventFirstRecoveryScanner({ events });
    await expect(scanner.inspectScope(target, '2026-07-17T06:01:00.000Z')).resolves.toMatchObject({
      reason: 'RUN_PROJECTION_CONFLICT',
      safeAction: 'rebuild_projection',
      details: { projectionRevision: 4, streamRevision: 3 },
    });
  });

  it('rejects an invalid recovery clock boundary', async () => {
    const scanner = new EventFirstRecoveryScanner({
      events: new DurableEventRuntime({ store: new InMemoryEventStoreV2() }),
    });
    await expect(scanner.scan({ now: 'not-a-timestamp' })).rejects.toMatchObject({
      code: 'RUNTIME_INVALID_INPUT',
    });
  });
});
