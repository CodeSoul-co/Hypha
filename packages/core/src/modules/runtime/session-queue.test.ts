import { describe, expect, it } from 'vitest';
import type {
  EnqueueSessionCommandRequest,
  SessionCommandRecord,
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

function claimIdentity(command: SessionCommandRecord): {
  claimToken: string;
  leaseEpoch: number;
} {
  return {
    claimToken: command.claimToken!,
    leaseEpoch: command.leaseEpoch,
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
    expect(first?.attempts).toBe(1);
    await expect(
      queue.claim({ workerId: 'worker.2', now: initialTime, leaseMs: 1_000 })
    ).resolves.toBeNull();
    await queue.complete({
      commandId: 'command.first',
      workerId: 'worker.1',
      ...claimIdentity(first!),
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
      ...claimIdentity(high!),
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

  it('enforces per-user and global queue backpressure across Sessions', async () => {
    const perUser = new InMemorySessionQueue({ maxPendingPerUser: 1 });
    await perUser.enqueue(command('command.user.1'));
    await expect(
      perUser.enqueue(command('command.user.2', { sessionId: 'session.2' }))
    ).rejects.toMatchObject({
      code: 'RUNTIME_SESSION_QUEUE_OVERFLOW',
      context: { userId: scope.userId, maxPendingPerUser: 1 },
    });
    await expect(
      perUser.enqueue(command('command.other-user', { userId: 'user.2', sessionId: 'session.2' }))
    ).resolves.toMatchObject({ status: 'queued' });

    const global = new InMemorySessionQueue({ maxPendingGlobal: 2 });
    await global.enqueue(command('command.global.1'));
    await global.enqueue(command('command.global.2', { userId: 'user.2', sessionId: 'session.2' }));
    await expect(
      global.enqueue(command('command.global.3', { userId: 'user.3', sessionId: 'session.3' }))
    ).rejects.toMatchObject({
      code: 'RUNTIME_SESSION_QUEUE_OVERFLOW',
      context: { maxPendingGlobal: 2 },
    });
  });

  it('isolates per-user concurrency without blocking another user', async () => {
    const queue = new InMemorySessionQueue({
      maxConcurrentSessions: 3,
      maxConcurrentSessionsPerUser: 1,
    });
    await queue.enqueue(command('command.user.1', { priority: 100 }));
    await queue.enqueue(command('command.user.2', { sessionId: 'session.2', priority: 90 }));
    await queue.enqueue(
      command('command.other-user', {
        userId: 'user.2',
        sessionId: 'session.3',
        priority: 10,
      })
    );

    await expect(
      queue.claim({ workerId: 'worker.1', now: initialTime, leaseMs: 1_000 })
    ).resolves.toMatchObject({ id: 'command.user.1' });
    await expect(
      queue.claim({ workerId: 'worker.2', now: initialTime, leaseMs: 1_000 })
    ).resolves.toMatchObject({ id: 'command.other-user' });
    await expect(
      queue.claim({ workerId: 'worker.3', now: initialTime, leaseMs: 1_000 })
    ).resolves.toBeNull();
  });

  it('recovers an expired claim and rejects the stale worker', async () => {
    const queue = new InMemorySessionQueue();
    await queue.enqueue(command('command.recover'));
    const stale = await queue.claim({
      workerId: 'worker.stale',
      now: initialTime,
      leaseMs: 1_000,
    });
    const recovered = await queue.claim({
      workerId: 'worker.recovery',
      now: '2026-07-18T06:00:02.000Z',
      leaseMs: 1_000,
    });
    expect(recovered).toMatchObject({ id: 'command.recover', claimedBy: 'worker.recovery' });
    expect(recovered?.attempts).toBe(2);
    await expect(
      queue.complete({
        commandId: 'command.recover',
        workerId: 'worker.stale',
        ...claimIdentity(stale!),
        completedAt: '2026-07-18T06:00:02.100Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });
    await expect(
      queue.complete({
        commandId: 'command.recover',
        workerId: 'worker.recovery',
        ...claimIdentity(recovered!),
        completedAt: '2026-07-18T06:00:02.500Z',
      })
    ).resolves.toBeUndefined();
  });

  it('does not partially mutate a claim when completion input is invalid', async () => {
    const queue = new InMemorySessionQueue({ now: () => initialTime });
    await queue.enqueue(command('command.atomic-complete'));
    const claimed = await queue.claim({
      workerId: 'worker.1',
      now: initialTime,
      leaseMs: 1_000,
    });

    await expect(
      queue.complete({
        commandId: 'command.atomic-complete',
        workerId: 'worker.1',
        ...claimIdentity(claimed!),
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
    const claimed = await queue.claim({
      workerId: 'worker.1',
      now: initialTime,
      leaseMs: 1_000,
    });
    await queue.release({
      commandId: 'command.retry',
      workerId: 'worker.1',
      ...claimIdentity(claimed!),
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
      ...claimIdentity(claimed!),
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

  it('dead-letters a command when its final claim lease expires', async () => {
    const queue = new InMemorySessionQueue();
    await queue.enqueue(command('command.exhausted', { maxAttempts: 1 }));
    await queue.claim({ workerId: 'worker.stale', now: initialTime, leaseMs: 1_000 });

    await expect(
      queue.claim({
        workerId: 'worker.next',
        now: '2026-07-18T06:00:02.000Z',
        leaseMs: 1_000,
      })
    ).resolves.toBeNull();
    await expect(queue.list({ scope, statuses: ['dead_letter'] })).resolves.toMatchObject([
      {
        id: 'command.exhausted',
        attempts: 1,
        maxAttempts: 1,
        rejectionCode: 'claim_lease_expired_after_attempt_budget',
      },
    ]);
  });

  it('dead-letters a released final attempt instead of requeueing it', async () => {
    const queue = new InMemorySessionQueue();
    await queue.enqueue(command('command.released-exhausted', { maxAttempts: 1 }));
    const claimed = await queue.claim({
      workerId: 'worker.1',
      now: initialTime,
      leaseMs: 1_000,
    });
    await queue.release({
      commandId: 'command.released-exhausted',
      workerId: 'worker.1',
      ...claimIdentity(claimed!),
      releasedAt: '2026-07-18T06:00:00.500Z',
    });

    await expect(queue.list({ scope, statuses: ['dead_letter'] })).resolves.toMatchObject([
      {
        id: 'command.released-exhausted',
        attempts: 1,
        rejectionCode: 'attempt_budget_exhausted',
      },
    ]);
  });

  it('redrives dead-letter work as a new audited command without mutating its source', async () => {
    const queue = new InMemorySessionQueue();
    await queue.enqueue(
      command('command.dead', {
        workspaceId: 'workspace.1',
        targetRunId: 'run.1',
        priority: 40,
        maxAttempts: 2,
        payloadRef: 'artifact-ref:payload.1',
      })
    );
    const claimed = await queue.claim({
      workerId: 'worker.1',
      now: initialTime,
      leaseMs: 1_000,
    });
    await queue.fail({
      commandId: claimed!.id,
      workerId: 'worker.1',
      ...claimIdentity(claimed!),
      failedAt: '2026-07-18T06:00:00.500Z',
      rejectionCode: 'provider_outage',
      deadLetter: true,
    });

    const request = {
      version: '1.0.0' as const,
      scope,
      sourceCommandId: 'command.dead',
      id: 'command.redrive',
      idempotencyKey: 'redrive.command.dead.1',
      operatorId: 'operator.1',
      reason: 'Provider outage resolved',
      requestedAt: '2026-07-18T06:01:00.000Z',
      maxAttempts: 3,
    };
    await expect(queue.redriveDeadLetter(request)).resolves.toMatchObject({
      id: 'command.redrive',
      status: 'queued',
      enqueueSequence: 2,
      attempts: 0,
      maxAttempts: 3,
      payloadRef: 'artifact-ref:payload.1',
      payloadHash,
      redrive: {
        version: '1.0.0',
        sourceCommandId: 'command.dead',
        operatorId: 'operator.1',
        reason: 'Provider outage resolved',
        requestedAt: '2026-07-18T06:01:00.000Z',
      },
    });
    await expect(queue.redriveDeadLetter(request)).resolves.toMatchObject({
      id: 'command.redrive',
      status: 'reused',
    });
    await expect(
      queue.redriveDeadLetter({ ...request, reason: 'Different operator decision' })
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
    await expect(queue.list({ scope })).resolves.toMatchObject([
      { id: 'command.dead', status: 'dead_letter', rejectionCode: 'provider_outage' },
      { id: 'command.redrive', status: 'queued' },
    ]);
  });

  it('rejects operator redrive for a command that is not a dead letter', async () => {
    const queue = new InMemorySessionQueue();
    await queue.enqueue(command('command.queued'));

    await expect(
      queue.redriveDeadLetter({
        version: '1.0.0',
        scope,
        sourceCommandId: 'command.queued',
        id: 'command.invalid-redrive',
        idempotencyKey: 'redrive.invalid',
        operatorId: 'operator.1',
        reason: 'Invalid request',
        requestedAt: initialTime,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });
  });

  it('detects overdue claims without recovering or mutating them', async () => {
    const queue = new InMemorySessionQueue();
    await queue.enqueue(command('command.stuck'));
    await queue.claim({ workerId: 'worker.stuck', now: initialTime, leaseMs: 1_000 });

    await expect(
      queue.listStuck({
        scope,
        checkedAt: '2026-07-18T06:00:01.500Z',
        graceMs: 400,
      })
    ).resolves.toMatchObject([
      {
        command: { id: 'command.stuck', status: 'claimed', claimedBy: 'worker.stuck' },
        detectedAt: '2026-07-18T06:00:01.500Z',
        overdueMs: 500,
      },
    ]);
    await expect(
      queue.listStuck({
        scope,
        checkedAt: '2026-07-18T06:00:01.500Z',
        graceMs: 600,
      })
    ).resolves.toEqual([]);
  });

  it('renews an active claim without changing its token or epoch', async () => {
    const queue = new InMemorySessionQueue();
    await queue.enqueue(command('command.renew'));
    const claimed = await queue.claim({
      workerId: 'worker.renew',
      now: initialTime,
      leaseMs: 1_000,
    });

    await expect(
      queue.renew({
        commandId: claimed!.id,
        workerId: 'worker.renew',
        ...claimIdentity(claimed!),
        renewedAt: '2026-07-18T06:00:00.500Z',
        leaseMs: 2_000,
      })
    ).resolves.toEqual({
      commandId: claimed!.id,
      workerId: 'worker.renew',
      ...claimIdentity(claimed!),
      leaseExpiresAt: '2026-07-18T06:00:02.500Z',
    });
  });

  it('fences an older claim even when the same worker id reclaims the command', async () => {
    const queue = new InMemorySessionQueue();
    await queue.enqueue(command('command.same-worker'));
    const first = await queue.claim({
      workerId: 'worker.same',
      now: initialTime,
      leaseMs: 1_000,
    });
    const second = await queue.claim({
      workerId: 'worker.same',
      now: '2026-07-18T06:00:02.000Z',
      leaseMs: 1_000,
    });

    expect(second?.leaseEpoch).toBe(2);
    expect(second?.claimToken).not.toBe(first?.claimToken);
    await expect(
      queue.complete({
        commandId: first!.id,
        workerId: 'worker.same',
        ...claimIdentity(first!),
        completedAt: '2026-07-18T06:00:02.100Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });
    await expect(
      queue.complete({
        commandId: second!.id,
        workerId: 'worker.same',
        ...claimIdentity(second!),
        completedAt: '2026-07-18T06:00:02.500Z',
      })
    ).resolves.toBeUndefined();
  });

  it('cancels only matching Run commands and fences an active stale owner', async () => {
    const queue = new InMemorySessionQueue({ now: () => initialTime });
    await queue.enqueue(command('command.terminal', { targetRunId: 'run.cancelled' }));
    const terminal = await queue.claim({
      workerId: 'worker.terminal',
      now: initialTime,
      leaseMs: 1_000,
    });
    await queue.complete({
      commandId: terminal!.id,
      workerId: 'worker.terminal',
      ...claimIdentity(terminal!),
      completedAt: initialTime,
    });
    await queue.enqueue(command('command.claimed', { targetRunId: 'run.cancelled' }));
    const claimed = await queue.claim({
      workerId: 'worker.stale',
      now: initialTime,
      leaseMs: 10_000,
    });
    await queue.enqueue(command('command.queued', { targetRunId: 'run.cancelled' }));
    await queue.enqueue(command('cancel.default', { targetRunId: 'run.cancelled' }));
    await queue.enqueue(command('command.other-run', { targetRunId: 'run.other' }));
    await queue.enqueue(
      command('command.other-session', {
        sessionId: 'session.other',
        targetRunId: 'run.cancelled',
      })
    );
    await queue.enqueue(
      command('command.other-user', {
        userId: 'user.other',
        targetRunId: 'run.cancelled',
      })
    );

    const request = {
      version: '1.0.0' as const,
      scope,
      targetRunId: 'run.cancelled',
      cancellationCommandId: 'cancel.default',
      reason: 'Run cancelled by user',
      cancelledAt: '2026-07-18T06:00:01.000Z',
    };
    await expect(queue.cancelPending(request)).resolves.toEqual({
      targetRunId: 'run.cancelled',
      cancelledCommandIds: ['command.claimed', 'command.queued'],
      alreadyCancelledCommandIds: [],
      alreadyTerminalCommandIds: ['command.terminal'],
    });
    await expect(
      queue.complete({
        commandId: claimed!.id,
        workerId: 'worker.stale',
        ...claimIdentity(claimed!),
        completedAt: '2026-07-18T06:00:02.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });
    await expect(queue.cancelPending(request)).resolves.toEqual({
      targetRunId: 'run.cancelled',
      cancelledCommandIds: [],
      alreadyCancelledCommandIds: ['command.claimed', 'command.queued'],
      alreadyTerminalCommandIds: ['command.terminal'],
    });
    await expect(queue.list({ scope })).resolves.toMatchObject([
      { id: 'command.terminal', status: 'applied' },
      {
        id: 'command.claimed',
        status: 'rejected',
        rejectionCode: 'RUNTIME_RUN_CANCELLED',
      },
      {
        id: 'command.queued',
        status: 'rejected',
        rejectionCode: 'RUNTIME_RUN_CANCELLED',
      },
      { id: 'cancel.default', status: 'queued' },
      { id: 'command.other-run', status: 'queued' },
    ]);
  });

  it('reports backlog age, lease recovery, redelivery, and dead letters in health', async () => {
    let now = initialTime;
    const queue = new InMemorySessionQueue({ now: () => now });
    await queue.enqueue(command('command.health'));
    const firstClaim = await queue.claim({
      workerId: 'worker.health.first',
      now,
      leaseMs: 1_000,
    });

    now = '2026-07-18T06:00:02.000Z';
    await expect(queue.health()).resolves.toMatchObject({
      status: 'healthy',
      checkedAt: now,
      details: {
        version: '1.0.0',
        totalCommands: 1,
        pendingCommands: 1,
        queuedCommands: 1,
        claimedCommands: 0,
        deadLetterCommands: 0,
        retryingCommands: 1,
        redeliveredCommands: 0,
        recoveredExpiredLeases: 1,
        oldestPendingAgeMs: 2_000,
      },
    });

    const secondClaim = await queue.claim({
      workerId: 'worker.health.second',
      now,
      leaseMs: 1_000,
    });
    expect(secondClaim?.leaseEpoch).toBe(2);
    now = '2026-07-18T06:00:02.500Z';
    await expect(queue.health()).resolves.toMatchObject({
      details: {
        pendingCommands: 1,
        claimedCommands: 1,
        redeliveredCommands: 1,
        recoveredExpiredLeases: 0,
        oldestPendingAgeMs: 2_500,
      },
    });

    await queue.fail({
      commandId: secondClaim!.id,
      workerId: 'worker.health.second',
      ...claimIdentity(secondClaim!),
      failedAt: now,
      rejectionCode: 'poison_command',
      deadLetter: true,
    });
    const terminalHealth = await queue.health();
    expect(terminalHealth.details).toMatchObject({
      totalCommands: 1,
      pendingCommands: 0,
      deadLetterCommands: 1,
      redeliveredCommands: 1,
    });
    expect(terminalHealth.details).not.toHaveProperty('oldestPendingAgeMs');
    await expect(
      queue.complete({
        commandId: firstClaim!.id,
        workerId: 'worker.health.first',
        ...claimIdentity(firstClaim!),
        completedAt: now,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });
  });
});
