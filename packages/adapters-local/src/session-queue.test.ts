import { afterEach, describe, expect, it } from 'vitest';
import {
  DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS,
  hashCanonicalJson,
  type EnqueueSessionCommandRequest,
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

  it('recovers an expired claim after restart and rejects the stale worker', async () => {
    const filename = temporaryDatabase();
    const first = openQueue(filename);
    await first.enqueue(command('command.recover'));
    await first.claim({ workerId: 'worker.stale', now: initialTime, leaseMs: 1_000 });
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
        completedAt: '2026-07-22T06:00:02.100Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });
  });

  it('keeps a delayed released head ahead of later work in the same session', async () => {
    const queue = openQueue(temporaryDatabase());
    await queue.enqueue(command('command.retry'));
    await queue.enqueue(command('command.later'));
    await queue.claim({ workerId: 'worker.1', now: initialTime, leaseMs: 1_000 });
    await queue.release({
      commandId: 'command.retry',
      workerId: 'worker.1',
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
    await queue.claim({ workerId: 'worker.1', now: initialTime, leaseMs: 5_000 });
    await queue.complete({
      commandId: 'command.complete',
      workerId: 'worker.1',
      completedAt: '2026-07-22T06:00:01.000Z',
      resultRunId: 'run.1',
      resultEventIds: ['event.1'],
    });
    await queue.enqueue(command('command.dead-letter', { createdAt: '2026-07-22T06:00:01.000Z' }));
    await queue.claim({
      workerId: 'worker.2',
      now: '2026-07-22T06:00:01.000Z',
      leaseMs: 5_000,
    });
    await queue.fail({
      commandId: 'command.dead-letter',
      workerId: 'worker.2',
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
    await queue.claim({ workerId: 'worker.1', now: initialTime, leaseMs: 5_000 });

    await expect(
      queue.complete({
        commandId: 'command.atomic',
        workerId: 'worker.1',
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
    await queue.claim({ workerId: 'worker.1', now: initialTime, leaseMs: 1_000 });
    await queue.release({
      commandId: 'command.released-exhausted',
      workerId: 'worker.1',
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

  function openQueue(filename: string): SQLiteSessionQueue {
    const queue = new SQLiteSessionQueue({ filename, now: () => initialTime, drainPollMs: 1 });
    queues.push(queue);
    return queue;
  }
});

function temporaryDatabase(): string {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-session-queue-'));
  return path.join(directory, 'runtime.sqlite');
}
