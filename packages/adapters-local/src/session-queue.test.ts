import { afterEach, describe, expect, it } from 'vitest';
import {
  DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS,
  hashCanonicalJson,
  type EnqueueSessionCommandRequest,
  type SessionCommandRecord,
  type SessionQueueScope,
} from '@hypha/core';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { SQLiteSessionQueue } from './session-queue';
import { loadSqlite } from './sqlite-driver';

const initialTime = '2026-07-22T06:00:00.000Z';
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
  return { claimToken: command.claimToken!, leaseEpoch: command.leaseEpoch };
}

describe('SQLiteSessionQueue', () => {
  const queues: SQLiteSessionQueue[] = [];

  afterEach(() => {
    while (queues.length > 0) queues.pop()?.close();
  });

  it('persists ordered commands and idempotency across restart', async () => {
    const filename = temporaryDatabase();
    const request = command('command.1');
    const first = openQueue(filename);
    await expect(first.enqueue(request)).resolves.toMatchObject({ enqueueSequence: 1 });
    first.close();
    queues.splice(queues.indexOf(first), 1);

    const reopened = openQueue(filename);
    await expect(
      reopened.enqueue(command('command.retry', { idempotencyKey: request.idempotencyKey }))
    ).resolves.toMatchObject({ id: 'command.1', enqueueSequence: 1, status: 'reused' });
    await expect(reopened.enqueue(command('command.2'))).resolves.toMatchObject({
      enqueueSequence: 2,
    });
    await expect(reopened.list({ scope })).resolves.toMatchObject([
      { id: 'command.1' },
      { id: 'command.2' },
    ]);
  });

  it('reads R1b records written before attempt budgets were added', async () => {
    const filename = temporaryDatabase();
    const initialized = openQueue(filename);
    initialized.close();
    queues.splice(queues.indexOf(initialized), 1);

    const legacyRecord = {
      id: 'command.legacy',
      commandType: 'user_input',
      idempotencyKey: 'idempotency.command.legacy',
      userId: scope.userId,
      sessionId: scope.sessionId,
      enqueueSequence: 1,
      priority: 50,
      payloadHash,
      status: 'queued',
      createdAt: initialTime,
      availableAt: initialTime,
    };
    const sqlite = loadSqlite(true)!;
    const database = new sqlite.DatabaseSync(filename);
    database
      .prepare(
        'INSERT INTO runtime_session_commands ' +
          '(id, scope_key, enqueue_sequence, priority, status, available_at, expires_at, ' +
          'claimed_by, lease_expires_at, record_json, record_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      )
      .run(
        legacyRecord.id,
        `\u0000${scope.userId}\u0000${scope.sessionId}`,
        legacyRecord.enqueueSequence,
        legacyRecord.priority,
        legacyRecord.status,
        legacyRecord.availableAt,
        null,
        null,
        null,
        JSON.stringify(legacyRecord),
        hashCanonicalJson(legacyRecord)
      );
    database.close?.();

    const reopened = openQueue(filename);
    await expect(reopened.list({ scope })).resolves.toMatchObject([
      {
        id: legacyRecord.id,
        attempts: 0,
        maxAttempts: DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS,
      },
    ]);
  });

  it('serializes claims across SQLite connections so only one worker owns the head', async () => {
    const filename = temporaryDatabase();
    const first = openQueue(filename);
    const second = openQueue(filename);
    await first.enqueue(command('command.claim'));

    const claims = await Promise.all([
      first.claim({ workerId: 'worker.1', now: initialTime, leaseMs: 1_000 }),
      second.claim({ workerId: 'worker.2', now: initialTime, leaseMs: 1_000 }),
    ]);

    expect(claims.filter(Boolean)).toHaveLength(1);
    expect(claims.filter((claim) => claim === null)).toHaveLength(1);
    expect(claims.find(Boolean)).toMatchObject({ attempts: 1 });
  });

  it('enforces durable per-user and global queue backpressure', async () => {
    const perUser = openQueue(temporaryDatabase(), { maxPendingPerUser: 1 });
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

    const global = openQueue(temporaryDatabase(), { maxPendingGlobal: 2 });
    await global.enqueue(command('command.global.1'));
    await global.enqueue(command('command.global.2', { userId: 'user.2', sessionId: 'session.2' }));
    await expect(
      global.enqueue(command('command.global.3', { userId: 'user.3', sessionId: 'session.3' }))
    ).rejects.toMatchObject({
      code: 'RUNTIME_SESSION_QUEUE_OVERFLOW',
      context: { maxPendingGlobal: 2 },
    });
  });

  it('enforces per-user concurrency consistently across SQLite workers', async () => {
    const filename = temporaryDatabase();
    const first = openQueue(filename, {
      maxConcurrentSessions: 3,
      maxConcurrentSessionsPerUser: 1,
    });
    const second = openQueue(filename, {
      maxConcurrentSessions: 3,
      maxConcurrentSessionsPerUser: 1,
    });
    await first.enqueue(command('command.user.1', { priority: 100 }));
    await first.enqueue(command('command.user.2', { sessionId: 'session.2', priority: 90 }));
    await first.enqueue(
      command('command.other-user', {
        userId: 'user.2',
        sessionId: 'session.3',
        priority: 10,
      })
    );

    await expect(
      first.claim({ workerId: 'worker.1', now: initialTime, leaseMs: 1_000 })
    ).resolves.toMatchObject({ id: 'command.user.1' });
    await expect(
      second.claim({ workerId: 'worker.2', now: initialTime, leaseMs: 1_000 })
    ).resolves.toMatchObject({ id: 'command.other-user' });
    await expect(
      first.claim({ workerId: 'worker.3', now: initialTime, leaseMs: 1_000 })
    ).resolves.toBeNull();
  });

  it('recovers an expired claim after restart and rejects the stale worker', async () => {
    const filename = temporaryDatabase();
    const first = openQueue(filename);
    await first.enqueue(command('command.recover'));
    const stale = await first.claim({
      workerId: 'worker.stale',
      now: initialTime,
      leaseMs: 1_000,
    });
    first.close();
    queues.splice(queues.indexOf(first), 1);

    const recoveredQueue = openQueue(filename);
    await expect(
      recoveredQueue.claim({
        workerId: 'worker.recovery',
        now: '2026-07-22T06:00:02.000Z',
        leaseMs: 1_000,
      })
    ).resolves.toMatchObject({ id: 'command.recover', claimedBy: 'worker.recovery' });
    await expect(
      recoveredQueue.complete({
        commandId: 'command.recover',
        workerId: 'worker.stale',
        ...claimIdentity(stale!),
        completedAt: '2026-07-22T06:00:02.100Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });
  });

  it('keeps a delayed released head ahead of later work in the same session', async () => {
    const queue = openQueue(temporaryDatabase());
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
      releasedAt: '2026-07-22T06:00:00.500Z',
      availableAt: '2026-07-22T06:00:02.000Z',
    });

    await expect(
      queue.claim({ workerId: 'worker.2', now: '2026-07-22T06:00:01.000Z', leaseMs: 1_000 })
    ).resolves.toBeNull();
    await expect(
      queue.claim({ workerId: 'worker.2', now: '2026-07-22T06:00:02.000Z', leaseMs: 1_000 })
    ).resolves.toMatchObject({ id: 'command.retry' });
  });

  it('persists completion and dead-letter outcomes', async () => {
    const filename = temporaryDatabase();
    const queue = openQueue(filename);
    await queue.enqueue(command('command.complete'));
    const completedClaim = await queue.claim({
      workerId: 'worker.1',
      now: initialTime,
      leaseMs: 5_000,
    });
    await queue.complete({
      commandId: 'command.complete',
      workerId: 'worker.1',
      ...claimIdentity(completedClaim!),
      completedAt: '2026-07-22T06:00:01.000Z',
      resultRunId: 'run.1',
      resultEventIds: ['event.1'],
    });
    await queue.enqueue(command('command.dead-letter', { createdAt: '2026-07-22T06:00:01.000Z' }));
    const failedClaim = await queue.claim({
      workerId: 'worker.2',
      now: '2026-07-22T06:00:01.000Z',
      leaseMs: 5_000,
    });
    await queue.fail({
      commandId: 'command.dead-letter',
      workerId: 'worker.2',
      ...claimIdentity(failedClaim!),
      failedAt: '2026-07-22T06:00:02.000Z',
      rejectionCode: 'attempts_exhausted',
      deadLetter: true,
    });

    await expect(queue.list({ scope })).resolves.toMatchObject([
      { id: 'command.complete', status: 'applied', resultRunId: 'run.1' },
      {
        id: 'command.dead-letter',
        status: 'dead_letter',
        rejectionCode: 'attempts_exhausted',
      },
    ]);
  });

  it('does not partially update a claim when completion validation fails', async () => {
    const queue = openQueue(temporaryDatabase());
    await queue.enqueue(command('command.atomic'));
    const claimed = await queue.claim({
      workerId: 'worker.1',
      now: initialTime,
      leaseMs: 5_000,
    });

    await expect(
      queue.complete({
        commandId: 'command.atomic',
        workerId: 'worker.1',
        ...claimIdentity(claimed!),
        completedAt: '2026-07-22T06:00:01.000Z',
        resultRunId: '',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_INVALID_INPUT' });
    await expect(queue.list({ scope })).resolves.toMatchObject([
      { id: 'command.atomic', status: 'claimed', claimedBy: 'worker.1' },
    ]);
  });

  it('expires a blocked head and advances the next durable command', async () => {
    let now = initialTime;
    const queue = new SQLiteSessionQueue({
      filename: temporaryDatabase(),
      now: () => now,
      drainPollMs: 1,
    });
    queues.push(queue);
    await queue.enqueue(command('command.expiring', { expiresAt: '2026-07-22T06:00:01.000Z' }));
    await queue.enqueue(command('command.next'));

    now = '2026-07-22T06:00:02.000Z';
    await expect(queue.claim({ workerId: 'worker.1', now, leaseMs: 1_000 })).resolves.toMatchObject(
      {
        id: 'command.next',
      }
    );
    await expect(queue.list({ scope, statuses: ['expired'] })).resolves.toMatchObject([
      { id: 'command.expiring', completedAt: now },
    ]);
  });

  it('persists the attempt budget and dead-letters an expired final claim', async () => {
    const filename = temporaryDatabase();
    const first = openQueue(filename);
    await first.enqueue(command('command.exhausted', { maxAttempts: 1 }));
    await first.claim({ workerId: 'worker.stale', now: initialTime, leaseMs: 1_000 });
    first.close();
    queues.splice(queues.indexOf(first), 1);

    const reopened = openQueue(filename);
    await expect(
      reopened.claim({
        workerId: 'worker.next',
        now: '2026-07-22T06:00:02.000Z',
        leaseMs: 1_000,
      })
    ).resolves.toBeNull();
    await expect(reopened.list({ scope, statuses: ['dead_letter'] })).resolves.toMatchObject([
      {
        id: 'command.exhausted',
        attempts: 1,
        maxAttempts: 1,
        rejectionCode: 'claim_lease_expired_after_attempt_budget',
      },
    ]);
  });

  it('persists a released final attempt as dead-letter work', async () => {
    const queue = openQueue(temporaryDatabase());
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
      releasedAt: '2026-07-22T06:00:00.500Z',
    });

    await expect(queue.list({ scope, statuses: ['dead_letter'] })).resolves.toMatchObject([
      {
        id: 'command.released-exhausted',
        attempts: 1,
        rejectionCode: 'attempt_budget_exhausted',
      },
    ]);
  });

  it('persists audited dead-letter redrive and idempotency across restart', async () => {
    const filename = temporaryDatabase();
    const first = openQueue(filename);
    await first.enqueue(
      command('command.dead', {
        workspaceId: 'workspace.1',
        targetRunId: 'run.1',
        payloadRef: 'artifact-ref:payload.1',
      })
    );
    const claimed = await first.claim({
      workerId: 'worker.1',
      now: initialTime,
      leaseMs: 1_000,
    });
    await first.fail({
      commandId: claimed!.id,
      workerId: 'worker.1',
      ...claimIdentity(claimed!),
      failedAt: '2026-07-22T06:00:00.500Z',
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
      requestedAt: '2026-07-22T06:01:00.000Z',
    };
    await expect(first.redriveDeadLetter(request)).resolves.toMatchObject({
      id: 'command.redrive',
      status: 'queued',
      enqueueSequence: 2,
      payloadRef: 'artifact-ref:payload.1',
      redrive: {
        version: '1.0.0',
        sourceCommandId: 'command.dead',
        operatorId: 'operator.1',
        reason: 'Provider outage resolved',
      },
    });
    first.close();
    queues.splice(queues.indexOf(first), 1);

    const reopened = openQueue(filename);
    await expect(reopened.redriveDeadLetter(request)).resolves.toMatchObject({
      id: 'command.redrive',
      status: 'reused',
    });
    await expect(
      reopened.redriveDeadLetter({ ...request, reason: 'Different operator decision' })
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
    await expect(reopened.list({ scope })).resolves.toMatchObject([
      {
        id: 'command.dead',
        status: 'dead_letter_resolved',
        rejectionCode: 'provider_outage',
        deadLetterResolution: {
          disposition: 'redriven',
          operatorId: 'operator.1',
          reason: 'Provider outage resolved',
          resolvedAt: '2026-07-22T06:01:00.000Z',
          redriveCommandId: 'command.redrive',
        },
      },
      { id: 'command.redrive', status: 'queued' },
    ]);
    await expect(
      reopened.redriveDeadLetter({
        ...request,
        id: 'command.redrive.again',
        idempotencyKey: 'redrive.command.dead.2',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });
  });

  it('atomically converges concurrent redrive requests from separate connections', async () => {
    const filename = temporaryDatabase();
    const first = openQueue(filename);
    const second = openQueue(filename);
    await first.enqueue(command('command.dead.concurrent'));
    const claimed = await first.claim({
      workerId: 'worker.1',
      now: initialTime,
      leaseMs: 1_000,
    });
    await first.fail({
      commandId: claimed!.id,
      workerId: 'worker.1',
      ...claimIdentity(claimed!),
      failedAt: '2026-07-22T06:00:00.500Z',
      rejectionCode: 'dependency_unavailable',
      deadLetter: true,
    });
    const request = {
      version: '1.0.0' as const,
      scope,
      sourceCommandId: 'command.dead.concurrent',
      id: 'command.redrive.concurrent',
      idempotencyKey: 'redrive.concurrent.1',
      operatorId: 'operator.1',
      reason: 'Dependency restored',
      requestedAt: '2026-07-22T06:01:00.000Z',
    };

    const outcomes = await Promise.all([
      first.redriveDeadLetter(request),
      second.redriveDeadLetter(request),
    ]);
    expect(outcomes.map((record) => record.status).sort()).toEqual(['queued', 'reused']);
    await expect(first.list({ scope })).resolves.toHaveLength(2);
  });

  it('persists an idempotent dead-letter closure across restart', async () => {
    const filename = temporaryDatabase();
    const first = openQueue(filename);
    await first.enqueue(command('command.dead.close'));
    const claimed = await first.claim({
      workerId: 'worker.1',
      now: initialTime,
      leaseMs: 1_000,
    });
    await first.fail({
      commandId: claimed!.id,
      workerId: 'worker.1',
      ...claimIdentity(claimed!),
      failedAt: '2026-07-22T06:00:00.500Z',
      rejectionCode: 'invalid_payload',
      deadLetter: true,
    });
    const request = {
      version: '1.0.0' as const,
      scope,
      commandId: 'command.dead.close',
      operatorId: 'operator.1',
      reason: 'Payload inspected; no replay is safe',
      closedAt: '2026-07-22T06:01:00.000Z',
    };
    await expect(first.closeDeadLetter(request)).resolves.toMatchObject({
      status: 'dead_letter_resolved',
      deadLetterResolution: {
        disposition: 'closed',
        operatorId: 'operator.1',
        reason: 'Payload inspected; no replay is safe',
      },
    });
    first.close();
    queues.splice(queues.indexOf(first), 1);

    const reopened = openQueue(filename);
    await expect(reopened.closeDeadLetter(request)).resolves.toMatchObject({
      status: 'dead_letter_resolved',
      deadLetterResolution: { disposition: 'closed' },
    });
    await expect(
      reopened.closeDeadLetter({ ...request, operatorId: 'operator.2' })
    ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });
    await expect(reopened.health()).resolves.toMatchObject({
      details: {
        deadLetterCommands: 0,
        resolvedDeadLetterCommands: 1,
      },
    });
  });

  it('serializes competing dead-letter close and redrive decisions across connections', async () => {
    const filename = temporaryDatabase();
    const first = openQueue(filename);
    const second = openQueue(filename);
    await first.enqueue(command('command.dead.decision'));
    const claimed = await first.claim({
      workerId: 'worker.1',
      now: initialTime,
      leaseMs: 1_000,
    });
    await first.fail({
      commandId: claimed!.id,
      workerId: 'worker.1',
      ...claimIdentity(claimed!),
      failedAt: '2026-07-22T06:00:00.500Z',
      rejectionCode: 'provider_outage',
      deadLetter: true,
    });

    const outcomes = await Promise.allSettled([
      first.closeDeadLetter({
        version: '1.0.0',
        scope,
        commandId: 'command.dead.decision',
        operatorId: 'operator.close',
        reason: 'Close after inspection',
        closedAt: '2026-07-22T06:01:00.000Z',
      }),
      second.redriveDeadLetter({
        version: '1.0.0',
        scope,
        sourceCommandId: 'command.dead.decision',
        id: 'command.dead.decision.redrive',
        idempotencyKey: 'redrive.command.dead.decision',
        operatorId: 'operator.redrive',
        reason: 'Dependency recovered',
        requestedAt: '2026-07-22T06:01:00.000Z',
      }),
    ]);
    expect(outcomes.filter((outcome) => outcome.status === 'fulfilled')).toHaveLength(1);
    expect(outcomes.filter((outcome) => outcome.status === 'rejected')).toHaveLength(1);
    const records = await first.list({ scope });
    const source = records.find((record) => record.id === 'command.dead.decision');
    expect(source).toMatchObject({ status: 'dead_letter_resolved' });
    expect(['closed', 'redriven']).toContain(source?.deadLetterResolution?.disposition);
    expect(records.filter((record) => record.redrive?.sourceCommandId === source?.id)).toHaveLength(
      source?.deadLetterResolution?.disposition === 'redriven' ? 1 : 0
    );
  });

  it('detects overdue durable claims without changing their persisted status', async () => {
    const queue = openQueue(temporaryDatabase());
    await queue.enqueue(command('command.stuck'));
    await queue.claim({ workerId: 'worker.stuck', now: initialTime, leaseMs: 1_000 });

    await expect(
      queue.listStuck({
        scope,
        checkedAt: '2026-07-22T06:00:01.500Z',
        graceMs: 400,
      })
    ).resolves.toMatchObject([
      {
        command: { id: 'command.stuck', status: 'claimed', claimedBy: 'worker.stuck' },
        overdueMs: 500,
      },
    ]);
    await expect(
      queue.listStuck({
        scope,
        checkedAt: '2026-07-22T06:00:01.500Z',
        graceMs: 600,
      })
    ).resolves.toEqual([]);
  });

  it('persists lease renewal and fences an older same-worker claim after restart', async () => {
    const filename = temporaryDatabase();
    const firstQueue = openQueue(filename);
    await firstQueue.enqueue(command('command.fenced'));
    const firstClaim = await firstQueue.claim({
      workerId: 'worker.same',
      now: initialTime,
      leaseMs: 1_000,
    });
    await expect(
      firstQueue.renew({
        commandId: firstClaim!.id,
        workerId: 'worker.same',
        ...claimIdentity(firstClaim!),
        renewedAt: '2026-07-22T06:00:00.500Z',
        leaseMs: 1_000,
      })
    ).resolves.toMatchObject({
      leaseEpoch: 1,
      leaseExpiresAt: '2026-07-22T06:00:01.500Z',
    });
    firstQueue.close();
    queues.splice(queues.indexOf(firstQueue), 1);

    const reopened = openQueue(filename);
    const secondClaim = await reopened.claim({
      workerId: 'worker.same',
      now: '2026-07-22T06:00:02.000Z',
      leaseMs: 1_000,
    });
    expect(secondClaim?.leaseEpoch).toBe(2);
    await expect(
      reopened.complete({
        commandId: firstClaim!.id,
        workerId: 'worker.same',
        ...claimIdentity(firstClaim!),
        completedAt: '2026-07-22T06:00:02.100Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });
    await expect(
      reopened.complete({
        commandId: secondClaim!.id,
        workerId: 'worker.same',
        ...claimIdentity(secondClaim!),
        completedAt: '2026-07-22T06:00:02.500Z',
      })
    ).resolves.toBeUndefined();
  });

  it('persists Run-scoped cancellation and rejects a stale claimed owner after restart', async () => {
    const filename = temporaryDatabase();
    const queue = openQueue(filename);
    await queue.enqueue(command('command.claimed', { targetRunId: 'run.cancelled' }));
    const claimed = await queue.claim({
      workerId: 'worker.stale',
      now: initialTime,
      leaseMs: 10_000,
    });
    await queue.enqueue(command('command.queued', { targetRunId: 'run.cancelled' }));
    await queue.enqueue(command('cancel.default', { targetRunId: 'run.cancelled' }));
    await queue.enqueue(command('command.other-run', { targetRunId: 'run.other' }));

    const request = {
      version: '1.0.0' as const,
      scope,
      targetRunId: 'run.cancelled',
      cancellationCommandId: 'cancel.default',
      reason: 'Run cancelled by user',
      cancelledAt: '2026-07-22T06:00:01.000Z',
    };
    await expect(queue.cancelPending(request)).resolves.toEqual({
      targetRunId: 'run.cancelled',
      cancelledCommandIds: ['command.claimed', 'command.queued'],
      alreadyCancelledCommandIds: [],
      alreadyTerminalCommandIds: [],
    });
    queue.close();
    queues.splice(queues.indexOf(queue), 1);

    const reopened = openQueue(filename);
    await expect(reopened.cancelPending(request)).resolves.toEqual({
      targetRunId: 'run.cancelled',
      cancelledCommandIds: [],
      alreadyCancelledCommandIds: ['command.claimed', 'command.queued'],
      alreadyTerminalCommandIds: [],
    });
    await expect(
      reopened.complete({
        commandId: claimed!.id,
        workerId: 'worker.stale',
        ...claimIdentity(claimed!),
        completedAt: '2026-07-22T06:00:02.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });
    await expect(reopened.list({ scope })).resolves.toMatchObject([
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

  it('persists health evidence for backlog, takeover, redelivery, and poison commands', async () => {
    const filename = temporaryDatabase();
    let now = initialTime;
    const first = openQueue(filename, { now: () => now });
    await first.enqueue(command('command.health'));
    await first.claim({
      workerId: 'worker.health.first',
      now,
      leaseMs: 1_000,
    });
    first.close();
    queues.splice(queues.indexOf(first), 1);

    now = '2026-07-22T06:00:02.000Z';
    const recovered = openQueue(filename, { now: () => now });
    await expect(recovered.health()).resolves.toMatchObject({
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

    const secondClaim = await recovered.claim({
      workerId: 'worker.health.second',
      now,
      leaseMs: 1_000,
    });
    expect(secondClaim?.leaseEpoch).toBe(2);
    await recovered.fail({
      commandId: secondClaim!.id,
      workerId: 'worker.health.second',
      ...claimIdentity(secondClaim!),
      failedAt: now,
      rejectionCode: 'poison_command',
      deadLetter: true,
    });
    recovered.close();
    queues.splice(queues.indexOf(recovered), 1);

    now = '2026-07-22T06:00:03.000Z';
    const reopened = openQueue(filename, { now: () => now });
    const health = await reopened.health();
    expect(health.details).toMatchObject({
      totalCommands: 1,
      pendingCommands: 0,
      deadLetterCommands: 1,
      redeliveredCommands: 1,
      recoveredExpiredLeases: 0,
    });
    expect(health.details).not.toHaveProperty('oldestPendingAgeMs');
  });

  function openQueue(
    filename: string,
    options: Partial<ConstructorParameters<typeof SQLiteSessionQueue>[0]> = {}
  ): SQLiteSessionQueue {
    const queue = new SQLiteSessionQueue({
      ...options,
      filename,
      now: options.now ?? (() => initialTime),
      drainPollMs: options.drainPollMs ?? 1,
    });
    queues.push(queue);
    return queue;
  }
});

function temporaryDatabase(): string {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-session-queue-'));
  return path.join(directory, 'runtime.sqlite');
}
