import { describe, expect, it } from 'vitest';
import type {
  EnqueueSessionCommandRequest,
  SessionQueueScope,
} from '../../contracts/session-queue';
import { InMemorySessionQueue } from './session-queue';

const initialTime = '2026-07-18T06:00:00.000Z';
const payloadHash = 'sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';
const scope: SessionQueueScope = { userId: 'user.1', sessionId: 'session.1' };

function command(
  id: string,
  overrides: Partial<EnqueueSessionCommandRequest> = {}
): EnqueueSessionCommandRequest {
  return {
    id,
    commandType: 'user_input',
    idempotencyKey: `idempotency.${id}`,
    userId: scope.userId,
    sessionId: scope.sessionId,
    payloadHash,
    createdAt: initialTime,
    ...overrides,
  };
}

describe('InMemorySessionQueue', () => {
  it('allocates monotonic per-session sequences and reuses identical idempotent input', async () => {
    const queue = new InMemorySessionQueue({ now: () => initialTime });
    const firstRequest = command('command.1');
    await expect(queue.enqueue(firstRequest)).resolves.toMatchObject({
      enqueueSequence: 1,
      status: 'queued',
    });
    await expect(
      queue.enqueue(command('command.retry', { idempotencyKey: firstRequest.idempotencyKey }))
    ).resolves.toMatchObject({ id: 'command.1', enqueueSequence: 1, status: 'reused' });
    await expect(queue.enqueue(command('command.2'))).resolves.toMatchObject({
      enqueueSequence: 2,
    });
    await expect(
      queue.enqueue(
        command('command.conflict', {
          idempotencyKey: firstRequest.idempotencyKey,
          payloadHash: 'sha256:' + '0'.repeat(64),
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
    await expect(queue.list({ scope })).resolves.toHaveLength(2);
  });

  it('preserves FIFO within one session even when a later command has higher priority', async () => {
    const queue = new InMemorySessionQueue();
    await queue.enqueue(command('command.first', { priority: 1 }));
    await queue.enqueue(command('command.second', { priority: 100 }));

    const first = await queue.claim({ workerId: 'worker.1', now: initialTime, leaseMs: 1_000 });
    expect(first?.id).toBe('command.first');
    await expect(
      queue.claim({ workerId: 'worker.2', now: initialTime, leaseMs: 1_000 })
    ).resolves.toBeNull();
    await queue.complete({
      commandId: 'command.first',
      workerId: 'worker.1',
      completedAt: '2026-07-18T06:00:00.500Z',
      resultEventIds: ['event.first'],
    });
    await expect(
      queue.claim({ workerId: 'worker.2', now: '2026-07-18T06:00:00.500Z', leaseMs: 1_000 })
    ).resolves.toMatchObject({ id: 'command.second' });
  });

  it('schedules higher-priority heads across sessions and allows parallel sessions', async () => {
    const queue = new InMemorySessionQueue({ maxConcurrentSessions: 2 });
    await queue.enqueue(command('command.low', { priority: 10 }));
    await queue.enqueue(
      command('command.high', {
        userId: 'user.2',
        sessionId: 'session.2',
        priority: 90,
      })
    );

    await expect(
      queue.claim({ workerId: 'worker.1', now: initialTime, leaseMs: 1_000 })
    ).resolves.toMatchObject({ id: 'command.high' });
    await expect(
      queue.claim({ workerId: 'worker.2', now: initialTime, leaseMs: 1_000 })
    ).resolves.toMatchObject({ id: 'command.low' });
  });

  it('ages an older low-priority Session so new high-priority work cannot starve it', async () => {
    const queue = new InMemorySessionQueue({ priorityAgingMs: 10 });
    await queue.enqueue(command('command.low', { priority: 0 }));
    await queue.enqueue(
      command('command.high.1', {
        userId: 'user.high.1',
        sessionId: 'session.high.1',
        priority: 100,
        createdAt: '2026-07-18T06:00:00.100Z',
      })
    );

    const high = await queue.claim({
      workerId: 'worker.1',
      now: '2026-07-18T06:00:00.100Z',
      leaseMs: 1_000,
    });
    expect(high?.id).toBe('command.high.1');
    await queue.complete({
      commandId: high!.id,
      workerId: 'worker.1',
      completedAt: '2026-07-18T06:00:00.200Z',
    });
    await queue.enqueue(
      command('command.high.2', {
        userId: 'user.high.2',
        sessionId: 'session.high.2',
        priority: 100,
        createdAt: '2026-07-18T06:00:01.000Z',
      })
    );

    await expect(
      queue.claim({
        workerId: 'worker.2',
        now: '2026-07-18T06:00:01.000Z',
        leaseMs: 1_000,
      })
    ).resolves.toMatchObject({ id: 'command.low' });
  });

  it('enforces the global concurrent-session limit', async () => {
    const queue = new InMemorySessionQueue({ maxConcurrentSessions: 1 });
    await queue.enqueue(command('command.session.1'));
    await queue.enqueue(command('command.session.2', { userId: 'user.2', sessionId: 'session.2' }));
    await queue.claim({ workerId: 'worker.1', now: initialTime, leaseMs: 1_000 });

    await expect(
      queue.claim({ workerId: 'worker.2', now: initialTime, leaseMs: 1_000 })
    ).resolves.toBeNull();
  });

  it('recovers an expired claim and rejects the stale worker', async () => {
    const queue = new InMemorySessionQueue();
    await queue.enqueue(command('command.recover'));
    await queue.claim({ workerId: 'worker.stale', now: initialTime, leaseMs: 1_000 });
    const recovered = await queue.claim({
      workerId: 'worker.recovery',
      now: '2026-07-18T06:00:02.000Z',
      leaseMs: 1_000,
    });
    expect(recovered).toMatchObject({ id: 'command.recover', claimedBy: 'worker.recovery' });
    await expect(
      queue.complete({
        commandId: 'command.recover',
        workerId: 'worker.stale',
        completedAt: '2026-07-18T06:00:02.100Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });
    await expect(
      queue.complete({
        commandId: 'command.recover',
        workerId: 'worker.recovery',
        completedAt: '2026-07-18T06:00:02.500Z',
      })
    ).resolves.toBeUndefined();
  });

  it('does not partially mutate a claim when completion input is invalid', async () => {
    const queue = new InMemorySessionQueue({ now: () => initialTime });
    await queue.enqueue(command('command.atomic-complete'));
    await queue.claim({ workerId: 'worker.1', now: initialTime, leaseMs: 1_000 });

    await expect(
      queue.complete({
        commandId: 'command.atomic-complete',
        workerId: 'worker.1',
        completedAt: '2026-07-18T06:00:00.500Z',
        resultRunId: '',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_MESSAGE_SCHEMA_INVALID' });
    await expect(queue.list({ scope })).resolves.toMatchObject([
      { id: 'command.atomic-complete', status: 'claimed', claimedBy: 'worker.1' },
    ]);
  });

  it('keeps a released head ahead of later commands until its delay elapses', async () => {
    const queue = new InMemorySessionQueue();
    await queue.enqueue(command('command.retry'));
    await queue.enqueue(command('command.later'));
    await queue.claim({ workerId: 'worker.1', now: initialTime, leaseMs: 1_000 });
    await queue.release({
      commandId: 'command.retry',
      workerId: 'worker.1',
      releasedAt: '2026-07-18T06:00:00.500Z',
      availableAt: '2026-07-18T06:00:02.000Z',
    });

    await expect(
      queue.claim({ workerId: 'worker.2', now: '2026-07-18T06:00:01.000Z', leaseMs: 1_000 })
    ).resolves.toBeNull();
    await expect(
      queue.claim({ workerId: 'worker.2', now: '2026-07-18T06:00:02.000Z', leaseMs: 1_000 })
    ).resolves.toMatchObject({ id: 'command.retry' });
  });

  it('expires a blocked head, advances the next command, and resolves drain', async () => {
    let now = initialTime;
    const queue = new InMemorySessionQueue({ now: () => now });
    await queue.enqueue(command('command.expiring', { expiresAt: '2026-07-18T06:00:01.000Z' }));
    await queue.enqueue(command('command.after-expiry'));
    let drained = false;
    const drain = queue.drain(scope).then(() => {
      drained = true;
    });
    await Promise.resolve();
    expect(drained).toBe(false);

    now = '2026-07-18T06:00:02.000Z';
    const claimed = await queue.claim({ workerId: 'worker.1', now, leaseMs: 1_000 });
    expect(claimed?.id).toBe('command.after-expiry');
    await queue.complete({
      commandId: 'command.after-expiry',
      workerId: 'worker.1',
      completedAt: '2026-07-18T06:00:02.500Z',
    });
    await drain;
    expect(drained).toBe(true);
    await expect(queue.list({ scope, statuses: ['expired'] })).resolves.toMatchObject([
      { id: 'command.expiring' },
    ]);
  });

  it('isolates identical session ids by user scope and enforces per-session overflow', async () => {
    const queue = new InMemorySessionQueue({ maxPendingPerSession: 1 });
    await queue.enqueue(command('command.user.1'));
    await queue.enqueue(command('command.user.2', { userId: 'user.2' }));
    await expect(queue.enqueue(command('command.overflow'))).rejects.toMatchObject({
      code: 'RUNTIME_SESSION_QUEUE_OVERFLOW',
    });
    await expect(queue.list({ scope })).resolves.toMatchObject([{ id: 'command.user.1' }]);
    await expect(
      queue.list({ scope: { userId: 'user.2', sessionId: scope.sessionId } })
    ).resolves.toMatchObject([{ id: 'command.user.2' }]);
  });
});
