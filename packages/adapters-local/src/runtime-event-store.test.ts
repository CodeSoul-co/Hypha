import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, expect, it } from 'vitest';
import type { EventAppendRequestV2, EventCreateInput, EventStreamScope } from '@hypha/core';
import { SQLiteEventStoreV2 } from './runtime-event-store';

const scope: EventStreamScope = {
  tenantId: 'tenant.sqlite',
  userId: 'user.sqlite',
  runId: 'run.sqlite',
};

function event(id: string): EventCreateInput {
  return {
    id,
    type: 'run.created',
    runId: scope.runId,
    timestamp: '2026-07-17T02:00:00.000Z',
    payload: { id },
  };
}

function request(overrides: Partial<EventAppendRequestV2> = {}): EventAppendRequestV2 {
  return {
    scope,
    events: [event('event.sqlite.1')],
    expectedLastSequence: 0,
    expectedRunRevision: 0,
    fencingToken: 1,
    idempotencyKey: 'append.sqlite.1',
    ...overrides,
  };
}

function databaseFilename(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-events-'));
  return path.join(root, 'runtime-events.sqlite');
}

describe('SQLiteEventStoreV2', () => {
  it('persists contiguous event batches and stream heads across reopen', async () => {
    const filename = databaseFilename();
    const store = new SQLiteEventStoreV2({
      filename,
      now: () => '2026-07-17T02:00:01.000Z',
    });
    const result = await store.append(
      request({ events: [event('event.sqlite.1'), event('event.sqlite.2')] })
    );

    expect(result.events.map((item) => item.sequence)).toEqual([1, 2]);
    expect(result).toMatchObject({ lastSequence: 2, runRevision: 1, reused: false });

    const reopened = new SQLiteEventStoreV2({ filename });
    await expect(reopened.readStream(scope)).resolves.toMatchObject([
      { id: 'event.sqlite.1', sequence: 1 },
      { id: 'event.sqlite.2', sequence: 2 },
    ]);
    await expect(reopened.getStreamHead(scope)).resolves.toMatchObject({
      lastSequence: 2,
      runRevision: 1,
      fencingToken: 1,
    });
  });

  it('persists idempotency results and rejects payload conflicts after reopen', async () => {
    const filename = databaseFilename();
    const append = request();
    await new SQLiteEventStoreV2({ filename }).append(append);
    const reopened = new SQLiteEventStoreV2({ filename });

    await expect(reopened.append(append)).resolves.toMatchObject({ reused: true });
    await expect(
      reopened.append(
        request({
          events: [event('event.sqlite.changed')],
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
    await expect(reopened.readStream(scope)).resolves.toHaveLength(1);
  });

  it('rejects stale sequence, revision, and fencing without partial writes', async () => {
    const store = new SQLiteEventStoreV2({ filename: databaseFilename() });
    await store.append(request({ fencingToken: 3 }));

    await expect(
      store.append(
        request({
          events: [event('event.sqlite.2')],
          idempotencyKey: 'append.sqlite.sequence-conflict',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_EVENT_APPEND_FAILED' });
    await expect(
      store.append(
        request({
          events: [event('event.sqlite.2')],
          expectedLastSequence: 1,
          expectedRunRevision: 1,
          fencingToken: 2,
          idempotencyKey: 'append.sqlite.fencing-conflict',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
    await expect(store.readStream(scope)).resolves.toHaveLength(1);
  });

  it('isolates identical run ids by user and scopes event lookup', async () => {
    const store = new SQLiteEventStoreV2({ filename: databaseFilename() });
    const otherScope = { ...scope, userId: 'user.sqlite.other' };
    await store.append(request());
    await store.append(
      request({
        scope: otherScope,
        events: [{ ...event('event.sqlite.other'), userId: otherScope.userId }],
        idempotencyKey: 'append.sqlite.other',
      })
    );

    await expect(store.readStream(scope)).resolves.toMatchObject([{ id: 'event.sqlite.1' }]);
    await expect(store.readStream(otherScope)).resolves.toMatchObject([
      { id: 'event.sqlite.other' },
    ]);
    await expect(store.readById(scope, 'event.sqlite.other')).resolves.toBeNull();
    await expect(store.health()).resolves.toMatchObject({ status: 'healthy' });
  });

  it('persists the paged stream-head catalog across reopen', async () => {
    const filename = databaseFilename();
    const store = new SQLiteEventStoreV2({ filename });
    const otherScope = { ...scope, runId: 'run.sqlite.other' };
    await store.append(request());
    await store.append(
      request({
        scope: otherScope,
        events: [{ ...event('event.sqlite.other-head'), runId: otherScope.runId }],
        idempotencyKey: 'append.sqlite.other-head',
      })
    );

    const reopened = new SQLiteEventStoreV2({ filename });
    const first = await reopened.listStreamHeads({ limit: 1 });
    const second = await reopened.listStreamHeads({ cursor: first.nextCursor, limit: 1 });

    expect(first.heads).toHaveLength(1);
    expect(first.nextCursor).toBeDefined();
    expect(second.heads).toHaveLength(1);
    expect(second.nextCursor).toBeUndefined();
    expect([...first.heads, ...second.heads].map((head) => head.scope.runId).sort()).toEqual(
      [scope.runId, otherScope.runId].sort()
    );
  });
});
