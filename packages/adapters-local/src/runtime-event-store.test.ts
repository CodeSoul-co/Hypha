import { afterEach, describe, expect, it } from 'vitest';
import {
  InMemoryEventSchemaRegistry,
  hashCanonicalJson,
  type EventAppendRequest,
  type EventCreateInput,
  type EventSchemaRegistry,
  type EventStreamScope,
  type FrameworkEventType,
} from '@hypha/core';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { SQLiteDurableEventStore } from './runtime-event-store';
import { loadSqlite } from './sqlite-driver';

describe('SQLiteDurableEventStore', () => {
  const stores: SQLiteDurableEventStore[] = [];

  afterEach(() => {
    while (stores.length > 0) stores.pop()?.close();
  });

  it('persists ordered stream events, heads, and global sequences across restart', async () => {
    const filename = temporaryDatabase();
    const registry = await eventRegistry('run.created', 'run.started');
    const first = openStore(filename, registry);
    const scope = stream('user-a', 'run-a');

    const appended = await first.append(
      appendRequest(scope, [event('event-1', 'run.created', scope, 'created')], {
        idempotencyKey: 'append-1',
        fencingToken: 3,
      })
    );
    expect(appended).toMatchObject({
      firstSequence: 1,
      lastSequence: 1,
      runRevision: 1,
      reused: false,
    });
    expect(appended.events[0]).toMatchObject({ sequence: 1, globalSequence: 1 });
    first.close();
    stores.splice(stores.indexOf(first), 1);

    const reopened = openStore(filename, registry);
    await expect(reopened.readStream(scope)).resolves.toMatchObject([
      { id: 'event-1', payload: { value: 'created' }, sequence: 1 },
    ]);
    await expect(reopened.getStreamHead(scope)).resolves.toMatchObject({
      lastSequence: 1,
      runRevision: 1,
      fencingToken: 3,
    });
    await expect(reopened.readById(scope, 'event-1')).resolves.toMatchObject({ id: 'event-1' });

    const secondScope = stream('user-b', 'run-b');
    const second = await reopened.append(
      appendRequest(secondScope, [event('event-2', 'run.started', secondScope, 'started')], {
        idempotencyKey: 'append-2',
      })
    );
    expect(second.events[0].globalSequence).toBe(2);
    await expect(reopened.health()).resolves.toMatchObject({ status: 'healthy' });
  });

  it('reuses an identical idempotent append and rejects key reuse with different input', async () => {
    const registry = await eventRegistry('run.created');
    const store = openStore(temporaryDatabase(), registry);
    const scope = stream('user-a', 'run-idempotent');
    const request = appendRequest(
      scope,
      [event('event-idempotent', 'run.created', scope, 'created')],
      { idempotencyKey: 'same-key' }
    );

    await expect(store.append(request)).resolves.toMatchObject({ reused: false, runRevision: 1 });
    await expect(store.append(request)).resolves.toMatchObject({ reused: true, runRevision: 1 });
    await expect(
      store.append({
        ...request,
        events: [event('event-other', 'run.created', scope, 'different')],
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
    await expect(store.readStream(scope)).resolves.toHaveLength(1);
  });

  it('enforces sequence, revision, and fencing guards with the in-memory semantics', async () => {
    const registry = await eventRegistry('run.created', 'run.started');
    const store = openStore(temporaryDatabase(), registry);
    const scope = stream('user-a', 'run-guarded');
    await store.append(
      appendRequest(scope, [event('event-1', 'run.created', scope, 'created')], {
        idempotencyKey: 'guard-1',
        fencingToken: 5,
      })
    );

    await expect(
      store.append(
        appendRequest(scope, [event('event-2', 'run.started', scope, 'started')], {
          expectedLastSequence: 1,
          idempotencyKey: 'missing-fence',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
    await expect(
      store.append(
        appendRequest(scope, [event('event-2', 'run.started', scope, 'started')], {
          expectedLastSequence: 1,
          fencingToken: 4,
          idempotencyKey: 'stale-fence',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
    await expect(
      store.append(
        appendRequest(scope, [event('event-2', 'run.started', scope, 'started')], {
          fencingToken: 5,
          idempotencyKey: 'stale-sequence',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_EVENT_APPEND_FAILED' });
    await expect(
      store.append(
        appendRequest(scope, [event('event-2', 'run.started', scope, 'started')], {
          expectedLastSequence: 1,
          expectedRunRevision: 0,
          fencingToken: 5,
          idempotencyKey: 'stale-revision',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_CONFLICT' });

    await expect(
      store.append(
        appendRequest(scope, [event('event-2', 'run.started', scope, 'started')], {
          expectedLastSequence: 1,
          expectedRunRevision: 1,
          fencingToken: 6,
          idempotencyKey: 'guard-2',
        })
      )
    ).resolves.toMatchObject({ lastSequence: 2, runRevision: 2 });
  });

  it('rejects invalid schemas and duplicate batch ids without partially creating a stream', async () => {
    const registry = await eventRegistry('run.created');
    const store = openStore(temporaryDatabase(), registry);
    const scope = stream('user-a', 'run-atomic');
    const invalid = event('invalid-event', 'run.created', scope, 'valid');
    invalid.payload = { value: 42 };

    await expect(
      store.append(appendRequest(scope, [invalid], { idempotencyKey: 'invalid-schema' }))
    ).rejects.toMatchObject({ code: 'RUNTIME_MESSAGE_SCHEMA_INVALID' });
    await expect(store.getStreamHead(scope)).resolves.toBeNull();

    const duplicate = event('duplicate-event', 'run.created', scope, 'valid');
    await expect(
      store.append(
        appendRequest(scope, [duplicate, duplicate], { idempotencyKey: 'duplicate-batch' })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
    await expect(store.getStreamHead(scope)).resolves.toBeNull();
    await expect(store.readStream(scope)).resolves.toEqual([]);
  });

  it('paginates stream heads with a stable opaque cursor', async () => {
    const registry = await eventRegistry('run.created');
    const store = openStore(temporaryDatabase(), registry);
    for (const runId of ['run-c', 'run-a', 'run-b']) {
      const scope = stream('user-a', runId);
      await store.append(
        appendRequest(scope, [event(`event-${runId}`, 'run.created', scope, runId)], {
          idempotencyKey: `append-${runId}`,
        })
      );
    }

    const first = await store.listStreamHeads({ limit: 2 });
    expect(first.heads.map((head) => head.scope.runId)).toEqual(['run-a', 'run-b']);
    expect(first.nextCursor).toBeDefined();
    expect(first.nextCursor).not.toContain('\u0000');
    await expect(
      store.listStreamHeads({ cursor: first.nextCursor, limit: 2 })
    ).resolves.toMatchObject({ heads: [{ scope: { runId: 'run-c' } }] });
    await expect(store.listStreamHeads({ cursor: 'run-b', limit: 2 })).rejects.toMatchObject({
      code: 'RUNTIME_INVALID_INPUT',
    });
  });

  it('reports persisted payload tampering as event stream corruption', async () => {
    const filename = temporaryDatabase();
    const registry = await eventRegistry('run.created');
    const store = openStore(filename, registry);
    const scope = stream('user-a', 'run-corrupt');
    await store.append(
      appendRequest(scope, [event('event-corrupt', 'run.created', scope, 'original')], {
        idempotencyKey: 'append-corrupt',
      })
    );
    store.close();
    stores.splice(stores.indexOf(store), 1);

    const sqlite = loadSqlite(true);
    if (!sqlite) throw new Error('SQLite driver is unavailable');
    const db = new sqlite.DatabaseSync(filename);
    const row = db
      .prepare('SELECT event_json FROM runtime_events WHERE event_id = ?')
      .get('event-corrupt');
    const corrupted = JSON.parse(String(row?.event_json)) as Record<string, unknown>;
    corrupted.payload = { value: 'tampered' };
    db.prepare('UPDATE runtime_events SET event_json = ? WHERE event_id = ?').run(
      JSON.stringify(corrupted),
      'event-corrupt'
    );
    db.close?.();

    const reopened = openStore(filename, registry);
    await expect(reopened.readStream(scope)).rejects.toMatchObject({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
    });
  });

  function openStore(
    filename: string,
    schemaRegistry: EventSchemaRegistry
  ): SQLiteDurableEventStore {
    const store = new SQLiteDurableEventStore({
      filename,
      schemaRegistry,
      now: () => '2026-07-21T00:00:00.000Z',
    });
    stores.push(store);
    return store;
  }
});

async function eventRegistry(...eventTypes: FrameworkEventType[]): Promise<EventSchemaRegistry> {
  const registry = new InMemoryEventSchemaRegistry();
  const schema = {
    type: 'object',
    additionalProperties: false,
    required: ['value'],
    properties: { value: { type: 'string' } },
  };
  for (const eventType of eventTypes) {
    await registry.register({
      eventType,
      version: '1.0.0',
      schema,
      schemaHash: hashCanonicalJson(schema),
    });
  }
  return registry;
}

function stream(userId: string, runId: string): EventStreamScope {
  return { userId, runId };
}

function event(
  id: string,
  type: FrameworkEventType,
  scope: EventStreamScope,
  value: string
): EventCreateInput {
  return {
    id,
    type,
    version: '1.0.0',
    userId: scope.userId,
    runId: scope.runId,
    payload: { value },
  };
}

function appendRequest(
  scope: EventStreamScope,
  events: EventCreateInput[],
  options: {
    idempotencyKey: string;
    expectedLastSequence?: number;
    expectedRunRevision?: number;
    fencingToken?: number;
  }
): EventAppendRequest {
  return {
    scope,
    events,
    expectedLastSequence: options.expectedLastSequence ?? 0,
    ...(options.expectedRunRevision === undefined
      ? {}
      : { expectedRunRevision: options.expectedRunRevision }),
    ...(options.fencingToken === undefined ? {} : { fencingToken: options.fencingToken }),
    idempotencyKey: options.idempotencyKey,
  };
}

function temporaryDatabase(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-events-'));
  return path.join(root, 'runtime.sqlite');
}
