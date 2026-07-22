import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type { ExecutionRecordCreateRequest } from '@hypha/core';
import { executionRecordCreateRequestExample } from '@hypha/core';
import { afterEach, describe, expect, it } from 'vitest';
import {
  SQLiteExecutionStoreFoundation,
  SQLiteExecutionStoreFoundationError,
} from './sqlite-execution-store-foundation';

const temporaryRoots: string[] = [];

afterEach(async () => {
  for (const root of temporaryRoots.splice(0)) {
    await fs.rm(root, { recursive: true, force: true, maxRetries: 3, retryDelay: 50 });
  }
});

describe('SQLiteExecutionStoreFoundation', () => {
  it('persists a validated queued record across close and reopen', async () => {
    const root = await temporaryRoot();
    const now = () => '2026-07-22T00:00:00.000Z';
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root, now });
    const request = createRequest();

    const created = await store.create(request);
    request.record.providerId = 'provider.mutated-after-create';

    expect(created).toEqual(executionRecordCreateRequestExample.record);
    await expect(store.get(created.id)).resolves.toEqual(created);
    await expect(store.get('execution.missing')).resolves.toBeNull();
    await expect(store.health()).resolves.toEqual({
      status: 'healthy',
      checkedAt: now(),
      message: 'SQLite Execution store is available.',
      details: { schemaVersion: 1 },
    });
    await store.close();
    await expect(store.health()).resolves.toMatchObject({ status: 'unhealthy' });
    await expect(store.get(created.id)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CLOSED',
    });

    const reopened = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await expect(reopened.get(created.id)).resolves.toEqual(created);
    await reopened.close();
  });

  it('replays identical creates and rejects reused or conflicting identities atomically', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const request = createRequest();

    const first = await store.create(request);
    await expect(store.create(createRequest())).resolves.toEqual(first);
    await expect(
      store.create({
        ...createRequest(),
        record: { ...createRequest().record, providerId: 'provider.different' },
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_IDEMPOTENCY_CONFLICT' });
    await expect(
      store.create({
        ...createRequest(),
        operationId: 'operation.execution.create.other',
        idempotencyKey: 'execution-create:other',
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_CONFLICT' });
    await expect(store.get(first.id)).resolves.toEqual(first);
    await store.close();
  });

  it('fails closed when persisted JSON disagrees with indexed record evidence', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const created = await store.create(createRequest());
    const filename = store.filename;
    await store.close();
    const database = openTestDatabase(filename);
    database
      .prepare('UPDATE execution_records SET provider_id = ? WHERE execution_id = ?')
      .run('provider.tampered', created.id);
    database.close();

    const reopened = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await expect(reopened.get(created.id)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
    });
    await reopened.close();
  });

  it('rejects unsafe filenames and database schemas newer than this adapter', async () => {
    const root = await temporaryRoot();
    expect(
      () => new SQLiteExecutionStoreFoundation({ rootPath: root, filename: '../escape.sqlite' })
    ).toThrow(TypeError);

    const filename = path.join(root, 'newer.sqlite');
    const database = openTestDatabase(filename);
    database.exec('PRAGMA user_version = 2');
    database.close();
    expect(
      () => new SQLiteExecutionStoreFoundation({ rootPath: root, filename: 'newer.sqlite' })
    ).toThrowError(SQLiteExecutionStoreFoundationError);
    try {
      new SQLiteExecutionStoreFoundation({ rootPath: root, filename: 'newer.sqlite' });
    } catch (error) {
      expect(error).toMatchObject({ code: 'EXECUTION_STORE_UNSUPPORTED_SCHEMA' });
    }
  });
});

function createRequest(): ExecutionRecordCreateRequest {
  return structuredClone(executionRecordCreateRequestExample);
}

async function temporaryRoot(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-execution-store-'));
  temporaryRoots.push(root);
  return root;
}

function openTestDatabase(filename: string): {
  exec(sql: string): void;
  prepare(sql: string): { run(...params: unknown[]): unknown };
  close(): void;
} {
  try {
    const sqlite = require('node:sqlite') as {
      DatabaseSync: new (filename: string) => ReturnType<typeof openTestDatabase>;
    };
    return new sqlite.DatabaseSync(filename);
  } catch (nodeSQLiteError) {
    try {
      const BetterSQLite = require('better-sqlite3') as new (
        filename: string
      ) => ReturnType<typeof openTestDatabase>;
      return new BetterSQLite(filename);
    } catch (betterSQLiteError) {
      throw new AggregateError([nodeSQLiteError, betterSQLiteError]);
    }
  }
}
