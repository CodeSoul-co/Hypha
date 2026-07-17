import fs from 'fs';
import os from 'os';
import path from 'path';
import { createRuntimeMessageEnvelope, type EnqueueSessionCommandRequest } from '@hypha/core';
import { describe, expect, it } from 'vitest';
import {
  SQLiteRunLeaseStore,
  SQLiteRuntimeMessageInboxStore,
  SQLiteRuntimeMessageOutboxStore,
  SQLiteSessionQueueV2,
} from './runtime-coordination-store';

const now = '2026-07-17T11:00:00.000Z';

function databaseFilename(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-coordination-'));
  return path.join(root, 'runtime.sqlite');
}

function envelope(messageId: string) {
  return createRuntimeMessageEnvelope({
    messageId,
    messageType: 'runtime.command.start',
    schemaVersion: '1.0.0',
    topic: 'hypha.runtime.commands',
    partitionKey: 'session.sqlite',
    userId: 'user.sqlite',
    sessionId: 'session.sqlite',
    runId: 'run.sqlite',
    payload: { messageId },
    publishedAt: now,
    producerId: 'runtime.sqlite.test',
  });
}

function command(
  id: string,
  overrides: Partial<EnqueueSessionCommandRequest> = {}
): EnqueueSessionCommandRequest {
  return {
    id,
    commandType: 'user_input',
    idempotencyKey: `key.${id}`,
    userId: 'user.sqlite',
    sessionId: 'session.sqlite',
    payloadHash: `sha256:${id}`,
    createdAt: now,
    ...overrides,
  };
}

describe('SQLite runtime coordination stores', () => {
  it('persists Inbox exactly-once decisions across reopen', async () => {
    const filename = databaseFilename();
    const inbox = new SQLiteRuntimeMessageInboxStore({ filename });
    await expect(
      inbox.claim({
        consumerId: 'worker.sqlite',
        messageId: 'message.sqlite',
        payloadHash: 'sha256:payload',
        receivedAt: now,
      })
    ).resolves.toMatchObject({ disposition: 'claimed' });
    await inbox.complete('worker.sqlite', 'message.sqlite', ['event.sqlite.applied'], now);

    const reopened = new SQLiteRuntimeMessageInboxStore({ filename });
    await expect(
      reopened.claim({
        consumerId: 'worker.sqlite',
        messageId: 'message.sqlite',
        payloadHash: 'sha256:payload',
        receivedAt: '2026-07-17T11:00:01.000Z',
      })
    ).resolves.toMatchObject({
      disposition: 'duplicate',
      record: { status: 'applied', appliedEventIds: ['event.sqlite.applied'], attempts: 2 },
    });
  });

  it('reclaims an expired Outbox publishing lease after reopen', async () => {
    const filename = databaseFilename();
    const outbox = new SQLiteRuntimeMessageOutboxStore({ filename });
    await outbox.enqueue({
      id: 'outbox.sqlite',
      eventId: 'event.sqlite',
      envelope: envelope('message.outbox.sqlite'),
      createdAt: now,
    });
    await expect(
      outbox.claim({ ownerId: 'publisher.old', now, leaseMs: 1_000, limit: 10 })
    ).resolves.toMatchObject([{ state: 'publishing', attempts: 1 }]);

    const reopened = new SQLiteRuntimeMessageOutboxStore({ filename });
    const recoveredAt = '2026-07-17T11:00:02.000Z';
    const [recovered] = await reopened.claim({
      ownerId: 'publisher.new',
      now: recoveredAt,
      leaseMs: 1_000,
      limit: 10,
    });
    expect(recovered).toMatchObject({
      id: 'outbox.sqlite',
      leaseOwner: 'publisher.new',
      attempts: 2,
    });
    await expect(
      reopened.markPublished('outbox.sqlite', 'publisher.old', recoveredAt)
    ).rejects.toMatchObject({ code: 'RUNTIME_LEASE_CONFLICT' });
    await reopened.markPublished('outbox.sqlite', 'publisher.new', recoveredAt);
    await expect(reopened.get('outbox.sqlite')).resolves.toMatchObject({ state: 'published' });
  });

  it('preserves Session sequence and claim fencing across reopen', async () => {
    const filename = databaseFilename();
    const queue = new SQLiteSessionQueueV2({ filename });
    await queue.enqueue(command('command.sqlite.1'));
    await queue.enqueue(command('command.sqlite.2'));
    const first = await queue.claim({
      userId: 'user.sqlite',
      sessionId: 'session.sqlite',
      workerId: 'worker.old',
      now,
      leaseMs: 1_000,
    });
    expect(first).toMatchObject({ id: 'command.sqlite.1', enqueueSequence: 1, claimToken: 1 });

    const reopened = new SQLiteSessionQueueV2({ filename });
    const recoveredAt = '2026-07-17T11:00:02.000Z';
    const recovered = await reopened.claim({
      userId: 'user.sqlite',
      sessionId: 'session.sqlite',
      workerId: 'worker.new',
      now: recoveredAt,
      leaseMs: 1_000,
    });
    expect(recovered).toMatchObject({ id: 'command.sqlite.1', claimToken: 2, attempts: 2 });
    await expect(
      reopened.complete({
        id: 'command.sqlite.1',
        workerId: 'worker.old',
        claimToken: first!.claimToken!,
        completedAt: recoveredAt,
        resultEventIds: ['event.stale'],
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
    await reopened.complete({
      id: 'command.sqlite.1',
      workerId: 'worker.new',
      claimToken: recovered!.claimToken!,
      completedAt: recoveredAt,
      resultEventIds: ['event.command.1'],
    });
    await expect(reopened.enqueue(command('command.sqlite.3'))).resolves.toMatchObject({
      record: { enqueueSequence: 3 },
    });
  });

  it('persists Run fencing tokens and rejects pre-takeover leases', async () => {
    const filename = databaseFilename();
    const leases = new SQLiteRunLeaseStore({ filename });
    const stale = await leases.acquire({
      runId: 'run.sqlite',
      ownerId: 'worker.old',
      now,
      ttlMs: 1_000,
    });
    expect(stale).toMatchObject({ fencingToken: 1 });

    const reopened = new SQLiteRunLeaseStore({ filename });
    const takeoverAt = '2026-07-17T11:00:02.000Z';
    await expect(
      reopened.acquire({
        runId: 'run.sqlite',
        ownerId: 'worker.new',
        now: takeoverAt,
        ttlMs: 1_000,
      })
    ).resolves.toMatchObject({ fencingToken: 2, ownerId: 'worker.new' });
    await expect(
      reopened.heartbeat({
        leaseId: stale!.id,
        ownerId: 'worker.old',
        expectedRevision: 1,
        now: takeoverAt,
        ttlMs: 1_000,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });

  it('allows all coordination adapters to share one SQLite database', async () => {
    const filename = databaseFilename();
    const inbox = new SQLiteRuntimeMessageInboxStore({ filename });
    const outbox = new SQLiteRuntimeMessageOutboxStore({ filename });
    const queue = new SQLiteSessionQueueV2({ filename });
    const leases = new SQLiteRunLeaseStore({ filename });

    await inbox.claim({
      consumerId: 'worker.shared',
      messageId: 'message.shared',
      payloadHash: 'sha256:shared',
      receivedAt: now,
    });
    await outbox.enqueue({
      id: 'outbox.shared',
      envelope: envelope('message.out'),
      createdAt: now,
    });
    await queue.enqueue(command('command.shared'));
    await leases.acquire({ runId: 'run.shared', ownerId: 'worker.shared', now, ttlMs: 1_000 });

    await expect(inbox.get('worker.shared', 'message.shared')).resolves.toBeTruthy();
    await expect(outbox.get('outbox.shared')).resolves.toBeTruthy();
    await expect(
      queue.list({ userId: 'user.sqlite', sessionId: 'session.sqlite' })
    ).resolves.toHaveLength(1);
    await expect(leases.get('run.shared')).resolves.toMatchObject({ fencingToken: 1 });
  });
});
