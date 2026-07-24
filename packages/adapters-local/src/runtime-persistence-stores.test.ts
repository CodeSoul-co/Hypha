import { afterEach, describe, expect, it } from 'vitest';
import {
  runtimeCheckpointChecksum,
  runtimeCheckpointRecordExample,
  type ProjectionRecord,
  type RuntimeCheckpointRecord,
} from '@hypha/core';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { SQLiteProjectionStore } from './projection-store';
import { SQLiteRuntimeCheckpointStore } from './runtime-checkpoint-store';
import { loadSqlite, type SqliteDatabaseSync } from './sqlite-driver';

describe('SQLite Runtime persistence stores', () => {
  const closeables: Array<{ close(): void }> = [];

  afterEach(() => {
    while (closeables.length > 0) closeables.pop()?.close();
  });

  it('persists projection offsets across restart and advances revisions by one', async () => {
    const filename = temporaryDatabase();
    const first = projectionStore<{ status: string }>(filename);
    await first.put(projection(1, 3, 'running'), 0);
    first.close();
    closeables.splice(closeables.indexOf(first), 1);

    const reopened = projectionStore<{ status: string }>(filename);
    await expect(reopened.get('runtime.run', 'run-a')).resolves.toMatchObject({
      state: { status: 'running' },
      lastSequence: 3,
      revision: 1,
    });
    await expect(reopened.put(projection(3, 4, 'invalid'), 1)).rejects.toMatchObject({
      code: 'RUNTIME_PROJECTION_FAILED',
    });
    await reopened.put(projection(2, 4, 'waiting'), 1);
    await expect(reopened.get('runtime.run', 'run-a')).resolves.toMatchObject({
      state: { status: 'waiting' },
      revision: 2,
    });
  });

  it('enforces projection expected revisions and supports explicit deletion', async () => {
    const store = projectionStore<{ status: string }>(temporaryDatabase());
    await store.put(projection(1, 1, 'created'));
    await expect(store.put(projection(2, 2, 'running'), 0)).rejects.toMatchObject({
      code: 'RUNTIME_PROJECTION_FAILED',
    });
    await store.delete('runtime.run', 'run-a');
    await expect(store.get('runtime.run', 'run-a')).resolves.toBeNull();
  });

  it('detects projection state tampering before returning a cached authority', async () => {
    const filename = temporaryDatabase();
    const store = projectionStore<{ status: string }>(filename);
    await store.put(projection(1, 1, 'created'));
    store.close();
    closeables.splice(closeables.indexOf(store), 1);
    mutateDatabase(filename, (db) => {
      db.prepare(
        'UPDATE runtime_projection_offsets SET state_json = ? ' +
          'WHERE projection_id = ? AND projection_key = ?'
      ).run(JSON.stringify({ status: 'tampered' }), 'runtime.run', 'run-a');
    });

    const reopened = projectionStore<{ status: string }>(filename);
    await expect(reopened.get('runtime.run', 'run-a')).rejects.toMatchObject({
      code: 'RUNTIME_PROJECTION_FAILED',
    });
  });

  it('persists ordered checkpoints and idempotency results across restart', async () => {
    const filename = temporaryDatabase();
    const first = checkpointStore(filename);
    const checkpoint1 = checkpoint('checkpoint.1', 1, 3);
    const checkpoint2 = checkpoint('checkpoint.2', 2, 4);
    await expect(first.put(checkpoint1, 'put.1')).resolves.toMatchObject({ reused: false });
    first.close();
    closeables.splice(closeables.indexOf(first), 1);

    const reopened = checkpointStore(filename);
    await expect(reopened.put(checkpoint1, 'put.1')).resolves.toMatchObject({ reused: true });
    await reopened.put(checkpoint2, 'put.2');
    await expect(reopened.latest(checkpoint1.scope)).resolves.toMatchObject({
      id: 'checkpoint.2',
    });
    await expect(reopened.list(checkpoint1.scope)).resolves.toMatchObject([
      { id: 'checkpoint.2' },
      { id: 'checkpoint.1' },
    ]);
  });

  it('rejects checkpoint key reuse, sequence gaps, and Event coverage regression atomically', async () => {
    const store = checkpointStore(temporaryDatabase());
    const first = checkpoint('checkpoint.1', 1, 3);
    await store.put(first, 'put.1');

    await expect(store.put(checkpoint('checkpoint.changed', 1, 3), 'put.1')).rejects.toMatchObject({
      code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    });
    await expect(store.put(checkpoint('checkpoint.3', 3, 4), 'put.gap')).rejects.toMatchObject({
      code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    });
    await expect(store.put(checkpoint('checkpoint.2', 2, 2), 'put.regress')).rejects.toMatchObject({
      code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    });
    await expect(store.list(first.scope)).resolves.toHaveLength(1);
  });

  it('detects persisted checkpoint tampering before recovery', async () => {
    const filename = temporaryDatabase();
    const store = checkpointStore(filename);
    const record = checkpoint('checkpoint.corrupt', 1, 3);
    await store.put(record, 'put.corrupt');
    store.close();
    closeables.splice(closeables.indexOf(store), 1);
    mutateDatabase(filename, (db) => {
      const row = db
        .prepare('SELECT record_json FROM runtime_checkpoints WHERE checkpoint_id = ?')
        .get(record.id);
      const changed = JSON.parse(String(row?.record_json)) as RuntimeCheckpointRecord;
      changed.variablesHash = 'tampered';
      db.prepare('UPDATE runtime_checkpoints SET record_json = ? WHERE checkpoint_id = ?').run(
        JSON.stringify(changed),
        record.id
      );
    });

    const reopened = checkpointStore(filename);
    await expect(reopened.get(record.scope, record.id)).rejects.toMatchObject({
      code: 'RUNTIME_CHECKPOINT_FAILED',
    });
  });

  function projectionStore<TState>(filename: string): SQLiteProjectionStore<TState> {
    const store = new SQLiteProjectionStore<TState>({
      filename,
      now: () => '2026-07-21T01:00:00.000Z',
    });
    closeables.push(store);
    return store;
  }

  function checkpointStore(filename: string): SQLiteRuntimeCheckpointStore {
    const store = new SQLiteRuntimeCheckpointStore({
      filename,
      now: () => '2026-07-21T01:00:00.000Z',
    });
    closeables.push(store);
    return store;
  }
});

function projection(
  revision: number,
  lastSequence: number,
  status: string
): ProjectionRecord<{ status: string }> {
  return {
    projectionId: 'runtime.run',
    projectionVersion: '1.0.0',
    key: 'run-a',
    state: { status },
    lastSequence,
    revision,
    updatedAt: '2026-07-21T01:00:00.000Z',
  };
}

function checkpoint(
  id: string,
  sequence: number,
  lastEventSequence: number
): RuntimeCheckpointRecord {
  const withoutChecksum = {
    ...structuredClone(runtimeCheckpointRecordExample),
    id,
    sequence,
    lastEventSequence,
    requestHash: `request.${id}`,
  };
  return { ...withoutChecksum, checksum: runtimeCheckpointChecksum(withoutChecksum) };
}

function mutateDatabase(filename: string, mutate: (db: SqliteDatabaseSync) => void): void {
  const sqlite = loadSqlite(true);
  if (!sqlite) throw new Error('SQLite driver is unavailable');
  const db = new sqlite.DatabaseSync(filename);
  try {
    mutate(db);
  } finally {
    db.close?.();
  }
}

function temporaryDatabase(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-state-'));
  return path.join(root, 'runtime.sqlite');
}
