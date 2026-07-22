import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type {
  ExecutionRecord,
  ExecutionRecordCompareAndSetRequest,
  ExecutionRecordCreateRequest,
} from '@hypha/core';
import {
  commandExecutionResultExample,
  executionLeaseGuardExample,
  executionRecordCompareAndSetRequestExample,
  executionRecordCreateRequestExample,
  executionRecordExample,
} from '@hypha/core';
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
      details: { schemaVersion: 2 },
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

  it('atomically advances revisions and replays the original mutation result', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await store.create(createRequest());
    const starting = compareAndSetRequest(0, 'starting', 'cas:starting');

    const first = await store.compareAndSet(starting);
    const running = compareAndSetRequest(1, 'running', 'cas:running', first);
    await expect(store.compareAndSet(running)).resolves.toEqual(running.next);
    await store.close();

    const reopened = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await expect(reopened.compareAndSet(starting)).resolves.toEqual(first);
    await expect(reopened.get(first.id)).resolves.toEqual(running.next);

    await expect(
      reopened.compareAndSet({
        ...starting,
        next: { ...starting.next, providerId: 'provider.reused-key' },
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_IDEMPOTENCY_CONFLICT' });
    await reopened.close();
  });

  it('rejects missing records, stale revisions, and mutation after a terminal result', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const queued = await store.create(createRequest());

    await expect(
      store.compareAndSet({
        ...compareAndSetRequest(0, 'starting', 'cas:missing'),
        executionId: 'execution.missing',
        next: {
          ...compareAndSetRequest(0, 'starting', 'cas:missing').next,
          id: 'execution.missing',
          request: {
            ...compareAndSetRequest(0, 'starting', 'cas:missing').next.request,
            executionId: 'execution.missing',
          },
        },
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_NOT_FOUND' });
    await expect(
      store.compareAndSet(compareAndSetRequest(1, 'running', 'cas:stale'))
    ).rejects.toMatchObject({
      code: 'EXECUTION_STORE_REVISION_CONFLICT',
      details: { expectedRevision: 1, actualRevision: 0 },
    });
    await expect(store.get(queued.id)).resolves.toEqual(queued);

    const terminal = terminalCompareAndSetRequest();
    await expect(store.compareAndSet(terminal)).resolves.toEqual(terminal.next);
    const afterTerminal = compareAndSetRequest(1, 'running', 'cas:after-terminal', terminal.next);
    afterTerminal.next.result = undefined;
    await expect(store.compareAndSet(afterTerminal)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_TERMINAL',
    });
    await expect(store.get(queued.id)).resolves.toEqual(terminal.next);
    await store.close();
  });

  it('rejects stale fencing and prevents compare-and-set from changing lease ownership', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await store.create(createRequest());
    const filename = store.filename;
    await store.close();
    replacePersistedRecord(filename, executionRecordExample);

    const reopened = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const stale = structuredClone(executionRecordCompareAndSetRequestExample);
    stale.leaseGuard = { ...executionLeaseGuardExample, fencingToken: 2 };
    stale.next.lease = { ...executionRecordExample.lease!, fencingToken: 2 };
    await expect(reopened.compareAndSet(stale)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_FENCING_REJECTED',
    });

    const dropsLease = structuredClone(executionRecordCompareAndSetRequestExample);
    dropsLease.next.lease = undefined;
    await expect(reopened.compareAndSet(dropsLease)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_FENCING_REJECTED',
    });
    await expect(
      reopened.compareAndSet(structuredClone(executionRecordCompareAndSetRequestExample))
    ).resolves.toEqual(executionRecordCompareAndSetRequestExample.next);
    await reopened.close();
  });

  it('migrates schema version one without losing existing records', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const created = await store.create(createRequest());
    const filename = store.filename;
    await store.close();
    const database = openTestDatabase(filename);
    database.exec('DROP TABLE execution_mutation_idempotency; PRAGMA user_version = 1');
    database.close();

    const migrated = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await expect(migrated.get(created.id)).resolves.toEqual(created);
    await expect(migrated.health()).resolves.toMatchObject({
      status: 'healthy',
      details: { schemaVersion: 2 },
    });
    await expect(
      migrated.compareAndSet(compareAndSetRequest(0, 'starting', 'cas:migrated'))
    ).resolves.toMatchObject({
      revision: 1,
      status: 'starting',
    });
    await migrated.close();
  });

  it('rejects unsafe filenames and database schemas newer than this adapter', async () => {
    const root = await temporaryRoot();
    expect(
      () => new SQLiteExecutionStoreFoundation({ rootPath: root, filename: '../escape.sqlite' })
    ).toThrow(TypeError);

    const filename = path.join(root, 'newer.sqlite');
    const database = openTestDatabase(filename);
    database.exec('PRAGMA user_version = 3');
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

function compareAndSetRequest(
  expectedRevision: number,
  status: 'starting' | 'running',
  idempotencyKey: string,
  current: ExecutionRecord = executionRecordCreateRequestExample.record
): ExecutionRecordCompareAndSetRequest {
  return {
    operationId: `operation.${idempotencyKey}`,
    executionId: current.id,
    expectedRevision,
    next: {
      ...structuredClone(current),
      revision: expectedRevision + 1,
      status,
      attempt: status === 'starting' ? 1 : current.attempt,
      updatedAt: `2026-07-16T00:00:0${expectedRevision + 1}.000Z`,
    },
    idempotencyKey,
  };
}

function terminalCompareAndSetRequest(): ExecutionRecordCompareAndSetRequest {
  const queued = executionRecordCreateRequestExample.record;
  return {
    operationId: 'operation.cas:terminal',
    executionId: queued.id,
    expectedRevision: 0,
    next: {
      ...structuredClone(queued),
      revision: 1,
      status: 'completed',
      sandboxId: commandExecutionResultExample.sandboxId,
      attempt: 1,
      result: { ...structuredClone(commandExecutionResultExample), revision: 1 },
      updatedAt: '2026-07-16T00:00:02.000Z',
    },
    idempotencyKey: 'cas:terminal',
  };
}

function replacePersistedRecord(filename: string, record: ExecutionRecord): void {
  const database = openTestDatabase(filename);
  database
    .prepare(
      'UPDATE execution_records SET revision = ?, status = ?, tenant_id = ?, user_id = ?, ' +
        'workspace_id = ?, run_id = ?, provider_id = ?, created_at = ?, updated_at = ?, ' +
        'record_json = ? WHERE execution_id = ?'
    )
    .run(
      record.revision,
      record.status,
      record.request.tenantId ?? null,
      record.request.userId,
      record.request.workspaceId,
      record.request.runId ?? null,
      record.providerId,
      record.createdAt,
      record.updatedAt,
      JSON.stringify(record),
      record.id
    );
  database.close();
}

async function temporaryRoot(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-execution-store-'));
  temporaryRoots.push(root);
  return root;
}

function openTestDatabase(filename: string): {
  exec(sql: string): void;
  prepare(sql: string): { run(...params: unknown[]): { changes: number | bigint } };
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
