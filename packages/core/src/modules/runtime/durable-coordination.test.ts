import { describe, expect, it } from 'vitest';
import {
  InMemoryRunLeaseStore,
  InMemorySessionQueueV2,
  type EnqueueSessionCommandRequest,
} from './durable-coordination';

const now = '2026-07-17T10:00:00.000Z';

function command(
  id: string,
  overrides: Partial<EnqueueSessionCommandRequest> = {}
): EnqueueSessionCommandRequest {
  return {
    id,
    commandType: 'user_input',
    idempotencyKey: `key.${id}`,
    userId: 'user.1',
    sessionId: 'session.1',
    payloadHash: `sha256:${id}`,
    createdAt: now,
    ...overrides,
  };
}

describe('InMemorySessionQueueV2', () => {
  it('assigns monotonic sequence within each tenant/user/session scope', async () => {
    const queue = new InMemorySessionQueueV2();
    const first = await queue.enqueue(command('command.1'));
    const second = await queue.enqueue(command('command.2'));
    const otherUser = await queue.enqueue(
      command('command.other', { userId: 'user.2', idempotencyKey: 'key.other' })
    );

    expect(first.record.enqueueSequence).toBe(1);
    expect(second.record.enqueueSequence).toBe(2);
    expect(otherUser.record.enqueueSequence).toBe(1);
  });

  it('reuses identical command requests and rejects conflicting idempotency input', async () => {
    const queue = new InMemorySessionQueueV2();
    const request = command('command.idempotent');
    await queue.enqueue(request);

    await expect(queue.enqueue(request)).resolves.toMatchObject({ reused: true });
    await expect(
      queue.enqueue({ ...request, id: 'command.changed', payloadHash: 'sha256:changed' })
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
    await expect(queue.list({ userId: 'user.1', sessionId: 'session.1' })).resolves.toHaveLength(1);
  });

  it('enforces queue depth backpressure per session', async () => {
    const queue = new InMemorySessionQueueV2({ maxPendingPerSession: 1 });
    await queue.enqueue(command('command.full.1'));
    await expect(queue.enqueue(command('command.full.2'))).rejects.toMatchObject({
      code: 'RUNTIME_SESSION_QUEUE_OVERFLOW',
    });
  });

  it('allows one active writer and applies priority FIFO scheduling', async () => {
    const queue = new InMemorySessionQueueV2();
    await queue.enqueue(command('command.low', { priority: 0 }));
    await queue.enqueue(command('command.high.1', { priority: 10 }));
    await queue.enqueue(command('command.high.2', { priority: 10 }));
    const scope = { userId: 'user.1', sessionId: 'session.1' };
    const first = await queue.claim({ ...scope, workerId: 'worker.1', now, leaseMs: 1_000 });

    expect(first).toMatchObject({ id: 'command.high.1', status: 'claimed', attempts: 1 });
    await expect(
      queue.claim({ ...scope, workerId: 'worker.2', now, leaseMs: 1_000 })
    ).resolves.toBeNull();
    await queue.complete({
      id: first!.id,
      workerId: 'worker.1',
      claimToken: first!.claimToken!,
      completedAt: now,
      resultEventIds: ['event.command.applied'],
    });
    await expect(
      queue.claim({ ...scope, workerId: 'worker.2', now, leaseMs: 1_000 })
    ).resolves.toMatchObject({ id: 'command.high.2' });
  });

  it('recovers expired claims and rejects the stale worker fencing token', async () => {
    const queue = new InMemorySessionQueueV2();
    await queue.enqueue(command('command.recover'));
    const scope = { userId: 'user.1', sessionId: 'session.1' };
    const stale = await queue.claim({ ...scope, workerId: 'worker.old', now, leaseMs: 1_000 });
    const recoveredAt = '2026-07-17T10:00:02.000Z';
    const recovered = await queue.claim({
      ...scope,
      workerId: 'worker.new',
      now: recoveredAt,
      leaseMs: 1_000,
    });

    expect(recovered).toMatchObject({ id: 'command.recover', attempts: 2 });
    expect(recovered?.claimToken).not.toBe(stale?.claimToken);
    await expect(
      queue.complete({
        id: 'command.recover',
        workerId: 'worker.old',
        claimToken: stale!.claimToken!,
        completedAt: recoveredAt,
        resultEventIds: ['event.stale'],
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });

  it('expires old commands without blocking the next eligible command', async () => {
    const queue = new InMemorySessionQueueV2();
    await queue.enqueue(
      command('command.expired', { expiresAt: '2026-07-17T09:59:59.000Z', priority: 20 })
    );
    await queue.enqueue(command('command.next'));

    await expect(
      queue.claim({
        userId: 'user.1',
        sessionId: 'session.1',
        workerId: 'worker.1',
        now,
        leaseMs: 1_000,
      })
    ).resolves.toMatchObject({ id: 'command.next' });
    await expect(
      queue.list({ userId: 'user.1', sessionId: 'session.1', status: 'expired' })
    ).resolves.toMatchObject([{ id: 'command.expired' }]);
  });
});

describe('InMemoryRunLeaseStore', () => {
  it('excludes concurrent owners and renews with optimistic revision', async () => {
    const leases = new InMemoryRunLeaseStore();
    const acquired = await leases.acquire({
      runId: 'run.1',
      ownerId: 'worker.1',
      now,
      ttlMs: 1_000,
    });

    expect(acquired).toMatchObject({ revision: 1, fencingToken: 1 });
    await expect(
      leases.acquire({ runId: 'run.1', ownerId: 'worker.2', now, ttlMs: 1_000 })
    ).resolves.toBeNull();
    await expect(
      leases.heartbeat({
        leaseId: acquired!.id,
        ownerId: 'worker.1',
        expectedRevision: 1,
        now: '2026-07-17T10:00:00.500Z',
        ttlMs: 1_000,
      })
    ).resolves.toMatchObject({ revision: 2, fencingToken: 1 });
  });

  it('increments fencing after expiry and rejects the old lease heartbeat', async () => {
    const leases = new InMemoryRunLeaseStore();
    const stale = await leases.acquire({
      runId: 'run.1',
      ownerId: 'worker.old',
      now,
      ttlMs: 1_000,
    });
    const takeoverAt = '2026-07-17T10:00:02.000Z';
    const current = await leases.acquire({
      runId: 'run.1',
      ownerId: 'worker.new',
      now: takeoverAt,
      ttlMs: 1_000,
    });

    expect(current).toMatchObject({ ownerId: 'worker.new', fencingToken: 2 });
    await expect(
      leases.heartbeat({
        leaseId: stale!.id,
        ownerId: 'worker.old',
        expectedRevision: 1,
        now: takeoverAt,
        ttlMs: 1_000,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });

  it('does not expose mutable lease references', async () => {
    const leases = new InMemoryRunLeaseStore();
    const acquired = await leases.acquire({
      runId: 'run.clone',
      ownerId: 'worker.1',
      now,
      ttlMs: 1_000,
    });
    acquired!.ownerId = 'mutated';
    await expect(leases.get('run.clone')).resolves.toMatchObject({ ownerId: 'worker.1' });
  });
});
