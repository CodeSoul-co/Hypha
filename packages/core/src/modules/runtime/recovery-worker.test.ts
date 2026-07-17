import { describe, expect, it, vi } from 'vitest';
import { InMemoryRunLeaseStore } from './durable-coordination';
import { InMemoryEventStoreV2, type EventStreamScope } from './event-store';
import { DurableEventRuntime } from './event-runtime';
import { EventFirstRecoveryScanner } from './recovery-scanner';
import { EventFirstRecoveryWorker } from './recovery-worker';
import { EventSourcedRunManager } from './run-manager';

const target: EventStreamScope = {
  tenantId: 'tenant.worker',
  userId: 'user.worker',
  runId: 'run.worker',
};

function command(expectedLastSequence: number, expectedRunRevision: number, name: string) {
  return {
    scope: target,
    expectedLastSequence,
    expectedRunRevision,
    fencingToken: 1,
    idempotencyKey: `idempotency.${name}`,
    operationId: `operation.${name}`,
  };
}

async function fixture() {
  const store = new InMemoryEventStoreV2();
  const events = new DurableEventRuntime({ store });
  const leases = new InMemoryRunLeaseStore();
  const runs = new EventSourcedRunManager({
    events,
    now: () => '2026-07-17T07:00:00.000Z',
  });
  await runs.create({
    ...command(0, 0, 'create'),
    sessionId: 'session.worker',
    workflowRef: { id: 'workflow.worker', revision: 'revision.1' },
    workflowRevision: 'revision.1',
    processSpecRef: 'process.worker',
    processHash: 'sha256:process-worker',
    input: {},
  });
  await runs.start(command(1, 1, 'start'));
  const scanner = new EventFirstRecoveryScanner({ events, leases });
  return { events, leases, runs, scanner, store };
}

describe('EventFirstRecoveryWorker', () => {
  it('fires an overdue durable timer and makes the old candidate stale', async () => {
    const { leases, runs, scanner } = await fixture();
    await runs.wait({
      ...command(2, 2, 'wait-timer'),
      waitId: 'wait.timer',
      stateId: 'Sleep',
      wait: { type: 'timer', expiresAt: '2026-07-17T07:30:00.000Z' },
    });
    const candidate = await scanner.inspectScope(target, '2026-07-17T08:00:00.000Z');
    expect(candidate).toMatchObject({ reason: 'TIMER_OVERDUE', safeAction: 'fire_timer' });
    if (!candidate) throw new Error('Expected recovery candidate');
    const worker = new EventFirstRecoveryWorker({
      scanner,
      runs,
      leases,
      workerId: 'worker.recovery',
      leaseTtlMs: 60000,
    });

    const recovered = await worker.recover(candidate, '2026-07-17T08:00:00.000Z');
    const retried = await worker.recover(candidate, '2026-07-17T08:00:00.000Z');

    expect(recovered).toMatchObject({
      status: 'recovered',
      safeAction: 'fire_timer',
      lease: { ownerId: 'worker.recovery', fencingToken: 1 },
    });
    expect(recovered.eventIds).toHaveLength(3);
    expect(retried).toMatchObject({ status: 'stale' });
    await expect(runs.get(target)).resolves.toMatchObject({ status: 'running', revision: 4 });
    await expect(runs.getPendingWait(target)).resolves.toBeNull();
  });

  it('persists run.recovering before requeueing a Run with an expired lease', async () => {
    const { leases, runs, scanner } = await fixture();
    await leases.acquire({
      runId: target.runId,
      ownerId: 'worker.old',
      now: '2026-07-17T07:00:00.000Z',
      ttlMs: 1000,
    });
    const candidate = await scanner.inspectScope(target, '2026-07-17T08:00:00.000Z');
    expect(candidate).toMatchObject({ reason: 'LEASE_EXPIRED', safeAction: 'requeue' });
    if (!candidate) throw new Error('Expected recovery candidate');
    const requeue = vi.fn().mockResolvedValue({ reused: false });
    const worker = new EventFirstRecoveryWorker({
      scanner,
      runs,
      leases,
      workerId: 'worker.recovery',
      leaseTtlMs: 60000,
      queue: { requeue },
    });

    const recovered = await worker.recover(candidate, '2026-07-17T08:00:00.000Z');

    expect(recovered).toMatchObject({
      status: 'recovered',
      lease: { ownerId: 'worker.recovery', fencingToken: 2 },
    });
    expect(recovered.eventIds).toHaveLength(1);
    expect(requeue).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'resume_run',
        recoveryEventIds: recovered.eventIds,
        lease: expect.objectContaining({ fencingToken: 2 }),
      })
    );
    await expect(runs.get(target)).resolves.toMatchObject({ status: 'recovering', revision: 3 });
  });

  it('restores a durable Wait through an idempotent registration port', async () => {
    const { leases, runs, scanner } = await fixture();
    await runs.wait({
      ...command(2, 2, 'wait-signal'),
      waitId: 'wait.signal',
      stateId: 'AwaitSignal',
      wait: { type: 'signal', key: 'continue' },
    });
    const candidate = await scanner.inspectScope(target, '2026-07-17T08:00:00.000Z');
    if (!candidate) throw new Error('Expected recovery candidate');
    const restore = vi
      .fn()
      .mockResolvedValueOnce({ reused: false })
      .mockResolvedValueOnce({ reused: true });
    const worker = new EventFirstRecoveryWorker({
      scanner,
      runs,
      leases,
      workerId: 'worker.recovery',
      leaseTtlMs: 60000,
      waits: { restore },
    });

    await expect(worker.recover(candidate, '2026-07-17T08:00:00.000Z')).resolves.toMatchObject({
      status: 'recovered',
      eventIds: [],
    });
    await expect(worker.recover(candidate, '2026-07-17T08:00:00.000Z')).resolves.toMatchObject({
      status: 'reused',
    });
    expect(restore).toHaveBeenCalledTimes(2);
    await expect(runs.get(target)).resolves.toMatchObject({ status: 'waiting_signal' });
  });

  it('routes an inconsistent Wait to manual review without mutating the Run', async () => {
    const { leases, runs, scanner, store } = await fixture();
    await store.append({
      scope: target,
      events: [
        {
          id: 'event.wait-fact-missing',
          type: 'run.waiting_human',
          runId: target.runId,
          operationId: 'operation.wait-fact-missing',
          timestamp: '2026-07-17T07:01:00.000Z',
          payload: { waitId: 'wait.missing' },
        },
      ],
      expectedLastSequence: 2,
      expectedRunRevision: 2,
      fencingToken: 1,
      idempotencyKey: 'idempotency.wait-fact-missing',
    });
    const candidate = await scanner.inspectScope(target, '2026-07-17T08:00:00.000Z');
    if (!candidate) throw new Error('Expected recovery candidate');
    const requireReview = vi.fn().mockResolvedValue({
      reused: false,
      reviewRef: 'review.runtime.1',
    });
    const worker = new EventFirstRecoveryWorker({
      scanner,
      runs,
      leases,
      workerId: 'worker.recovery',
      leaseTtlMs: 60000,
      reviews: { requireReview },
    });

    await expect(worker.recover(candidate, '2026-07-17T08:00:00.000Z')).resolves.toMatchObject({
      status: 'manual_review',
      details: { reviewRef: 'review.runtime.1' },
    });
    expect(requireReview).toHaveBeenCalledOnce();
    await expect(worker.reconcile(target, '2026-07-17T08:00:00.000Z')).resolves.toMatchObject({
      consistent: false,
      candidate: { reason: 'WAIT_WITHOUT_REGISTRATION' },
    });
    await expect(runs.get(target)).resolves.toMatchObject({ status: 'waiting_human', revision: 3 });
  });
});
