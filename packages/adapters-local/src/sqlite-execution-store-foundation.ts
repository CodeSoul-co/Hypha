import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type { ExecutionRecord, ExecutionRecordCreateRequest, ProviderHealth } from '@hypha/core';
import { validateExecutionRecord, validateExecutionRecordCreateRequest } from '@hypha/core';

interface SQLiteStatement {
  get(...params: unknown[]): Record<string, unknown> | undefined;
  run(...params: unknown[]): unknown;
}

interface SQLiteDatabase {
  exec(sql: string): void;
  prepare(sql: string): SQLiteStatement;
  close(): void;
}

interface SQLiteModule {
  DatabaseSync: new (filename: string) => SQLiteDatabase;
}

export type SQLiteExecutionStoreFoundationErrorCode =
  | 'EXECUTION_STORE_UNAVAILABLE'
  | 'EXECUTION_STORE_CLOSED'
  | 'EXECUTION_STORE_CORRUPT'
  | 'EXECUTION_STORE_CONFLICT'
  | 'EXECUTION_STORE_IDEMPOTENCY_CONFLICT'
  | 'EXECUTION_STORE_UNSUPPORTED_SCHEMA';

export class SQLiteExecutionStoreFoundationError extends Error {
  constructor(
    readonly code: SQLiteExecutionStoreFoundationErrorCode,
    message: string,
    readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'SQLiteExecutionStoreFoundationError';
  }
}

export interface SQLiteExecutionStoreFoundationOptions {
  rootPath: string;
  filename?: string;
  busyTimeoutMs?: number;
  now?: () => string;
}

/**
 * Internal durable foundation for the SQLite ExecutionStore adapter.
 * It is intentionally not exported from the package entrypoint until the
 * complete ExecutionStore contract, including CAS and leases, is implemented.
 */
export class SQLiteExecutionStoreFoundation {
  static readonly schemaVersion = 1;
  readonly filename: string;
  private readonly database: SQLiteDatabase;
  private readonly now: () => string;
  private closed = false;

  constructor(options: SQLiteExecutionStoreFoundationOptions) {
    const root = prepareStoreRoot(options.rootPath);
    const basename = storeFilename(options.filename ?? 'executions.sqlite');
    this.filename = path.join(root, basename);
    rejectSymbolicLink(this.filename);
    this.now = options.now ?? (() => new Date().toISOString());
    const busyTimeoutMs = positiveInteger(options.busyTimeoutMs ?? 5_000, 'busyTimeoutMs');
    let database: SQLiteDatabase | undefined;
    try {
      database = openSQLiteDatabase(this.filename);
      database.exec(`PRAGMA busy_timeout = ${busyTimeoutMs}`);
      database.exec('PRAGMA journal_mode = WAL');
      database.exec('PRAGMA foreign_keys = ON');
      migrate(database);
      this.database = database;
      if (process.platform !== 'win32') fs.chmodSync(this.filename, 0o600);
    } catch (error) {
      try {
        database?.close();
      } catch {
        // Preserve the original initialization error.
      }
      if (error instanceof SQLiteExecutionStoreFoundationError) throw error;
      throw storeError(
        'EXECUTION_STORE_UNAVAILABLE',
        'Unable to open the SQLite Execution store.',
        undefined,
        error
      );
    }
  }

  async create(input: ExecutionRecordCreateRequest): Promise<ExecutionRecord> {
    this.assertOpen();
    const request = validateExecutionRecordCreateRequest(input);
    const recordJson = JSON.stringify(request.record);
    const recordHash = hash(recordJson);
    return this.writeOperation(() => {
      if (request.idempotencyKey) {
        const replay = this.findCreateIdempotency(request.operationId, request.idempotencyKey);
        if (replay) {
          if (String(replay.record_hash) !== recordHash) {
            throw storeError(
              'EXECUTION_STORE_IDEMPOTENCY_CONFLICT',
              'Execution create idempotency key was reused with different input.',
              { operationId: request.operationId }
            );
          }
          const row = this.selectRecord(String(replay.execution_id));
          if (!row) {
            throw storeError(
              'EXECUTION_STORE_CORRUPT',
              'Execution create idempotency record points to a missing Execution.'
            );
          }
          return parseRecordRow(row);
        }
      }

      if (this.selectRecord(request.record.id)) {
        throw storeError('EXECUTION_STORE_CONFLICT', 'Execution record already exists.', {
          executionId: request.record.id,
        });
      }
      this.database
        .prepare(
          'INSERT INTO execution_records ' +
            '(execution_id, revision, status, tenant_id, user_id, workspace_id, run_id, ' +
            'provider_id, created_at, updated_at, record_json) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        )
        .run(
          request.record.id,
          request.record.revision,
          request.record.status,
          request.record.request.tenantId ?? null,
          request.record.request.userId,
          request.record.request.workspaceId,
          request.record.request.runId ?? null,
          request.record.providerId,
          request.record.createdAt,
          request.record.updatedAt,
          recordJson
        );
      if (request.idempotencyKey) {
        this.database
          .prepare(
            'INSERT INTO execution_create_idempotency ' +
              '(operation_id, idempotency_key, execution_id, record_hash) VALUES (?, ?, ?, ?)'
          )
          .run(request.operationId, request.idempotencyKey, request.record.id, recordHash);
      }
      return structuredClone(request.record);
    });
  }

  async get(executionId: string): Promise<ExecutionRecord | null> {
    this.assertOpen();
    if (!executionId.trim()) throw new TypeError('executionId is required.');
    return this.readOperation(() => {
      const row = this.selectRecord(executionId);
      return row ? parseRecordRow(row) : null;
    });
  }

  async health(): Promise<ProviderHealth> {
    if (this.closed) {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        message: 'SQLite Execution store is closed.',
      };
    }
    try {
      const row = this.database.prepare('PRAGMA user_version').get();
      const version = Number(row?.user_version);
      return {
        status: version === SQLiteExecutionStoreFoundation.schemaVersion ? 'healthy' : 'unhealthy',
        checkedAt: this.now(),
        message:
          version === SQLiteExecutionStoreFoundation.schemaVersion
            ? 'SQLite Execution store is available.'
            : `SQLite Execution store schema version is ${version}.`,
        details: { schemaVersion: version },
      };
    } catch {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        message: 'SQLite Execution store health check failed.',
      };
    }
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.database.close();
    this.closed = true;
  }

  private selectRecord(executionId: string): Record<string, unknown> | undefined {
    return this.database
      .prepare(
        'SELECT execution_id, revision, status, tenant_id, user_id, workspace_id, run_id, ' +
          'provider_id, created_at, updated_at, record_json ' +
          'FROM execution_records WHERE execution_id = ?'
      )
      .get(executionId);
  }

  private findCreateIdempotency(
    operationId: string,
    idempotencyKey: string
  ): Record<string, unknown> | undefined {
    return this.database
      .prepare(
        'SELECT execution_id, record_hash FROM execution_create_idempotency ' +
          'WHERE operation_id = ? AND idempotency_key = ?'
      )
      .get(operationId, idempotencyKey);
  }

  private readOperation<T>(operation: () => T): T {
    try {
      return operation();
    } catch (error) {
      if (error instanceof SQLiteExecutionStoreFoundationError) throw error;
      throw storeError(
        'EXECUTION_STORE_UNAVAILABLE',
        'SQLite Execution store read failed.',
        undefined,
        error
      );
    }
  }

  private writeOperation<T>(operation: () => T): T {
    let transactionStarted = false;
    try {
      this.database.exec('BEGIN IMMEDIATE');
      transactionStarted = true;
      const result = operation();
      this.database.exec('COMMIT');
      return result;
    } catch (error) {
      if (transactionStarted) {
        try {
          this.database.exec('ROLLBACK');
        } catch {
          // Preserve the original operation error.
        }
      }
      if (error instanceof SQLiteExecutionStoreFoundationError) throw error;
      throw storeError(
        'EXECUTION_STORE_UNAVAILABLE',
        'SQLite Execution store write failed.',
        undefined,
        error
      );
    }
  }

  private assertOpen(): void {
    if (this.closed) {
      throw storeError('EXECUTION_STORE_CLOSED', 'SQLite Execution store is closed.');
    }
  }
}

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS execution_records (
  execution_id TEXT PRIMARY KEY,
  revision INTEGER NOT NULL CHECK (revision >= 0),
  status TEXT NOT NULL,
  tenant_id TEXT,
  user_id TEXT NOT NULL,
  workspace_id TEXT NOT NULL,
  run_id TEXT,
  provider_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  record_json TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS execution_records_owner_status_updated
  ON execution_records (tenant_id, user_id, workspace_id, status, updated_at, execution_id);
CREATE INDEX IF NOT EXISTS execution_records_provider_updated
  ON execution_records (provider_id, updated_at, execution_id);
CREATE TABLE IF NOT EXISTS execution_create_idempotency (
  operation_id TEXT NOT NULL,
  idempotency_key TEXT NOT NULL,
  execution_id TEXT NOT NULL,
  record_hash TEXT NOT NULL,
  PRIMARY KEY (operation_id, idempotency_key),
  FOREIGN KEY (execution_id) REFERENCES execution_records(execution_id)
);
`;

function migrate(database: SQLiteDatabase): void {
  const current = Number(database.prepare('PRAGMA user_version').get()?.user_version ?? 0);
  if (current === SQLiteExecutionStoreFoundation.schemaVersion) return;
  if (current !== 0) {
    throw storeError(
      'EXECUTION_STORE_UNSUPPORTED_SCHEMA',
      'SQLite Execution store schema version is not supported.',
      { current, supported: SQLiteExecutionStoreFoundation.schemaVersion }
    );
  }
  database.exec('BEGIN IMMEDIATE');
  try {
    database.exec(SCHEMA_SQL);
    database.exec(`PRAGMA user_version = ${SQLiteExecutionStoreFoundation.schemaVersion}`);
    database.exec('COMMIT');
  } catch (error) {
    try {
      database.exec('ROLLBACK');
    } catch {
      // Preserve the original migration error.
    }
    throw error;
  }
}

function parseRecordRow(row: Record<string, unknown>): ExecutionRecord {
  try {
    const record = validateExecutionRecord(JSON.parse(String(row.record_json)));
    if (
      record.id !== String(row.execution_id) ||
      record.revision !== Number(row.revision) ||
      record.status !== String(row.status) ||
      (record.request.tenantId ?? null) !== nullableText(row.tenant_id) ||
      record.request.userId !== String(row.user_id) ||
      record.request.workspaceId !== String(row.workspace_id) ||
      (record.request.runId ?? null) !== nullableText(row.run_id) ||
      record.providerId !== String(row.provider_id) ||
      record.createdAt !== String(row.created_at) ||
      record.updatedAt !== String(row.updated_at)
    ) {
      throw new Error('indexed columns do not match record JSON');
    }
    return record;
  } catch (error) {
    throw storeError(
      'EXECUTION_STORE_CORRUPT',
      'SQLite Execution store contains an invalid Execution record.',
      undefined,
      error
    );
  }
}

function nullableText(value: unknown): string | null {
  return value === null || value === undefined ? null : String(value);
}

function prepareStoreRoot(rootPath: string): string {
  if (!rootPath.trim()) throw new TypeError('rootPath is required.');
  const requested = path.resolve(rootPath);
  fs.mkdirSync(requested, { recursive: true });
  const requestedStat = fs.lstatSync(requested);
  if (!requestedStat.isDirectory() || requestedStat.isSymbolicLink()) {
    throw new TypeError('SQLite Execution store root must be a safe directory.');
  }
  return fs.realpathSync(requested);
}

function storeFilename(value: string): string {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*\.sqlite$/u.test(value)) {
    throw new TypeError('SQLite Execution store filename must be a simple .sqlite basename.');
  }
  return value;
}

function rejectSymbolicLink(filename: string): void {
  if (!fs.existsSync(filename)) return;
  const stat = fs.lstatSync(filename);
  if (stat.isSymbolicLink() || !stat.isFile()) {
    throw new TypeError('SQLite Execution store file must be a regular file.');
  }
}

function openSQLiteDatabase(filename: string): SQLiteDatabase {
  try {
    const sqlite = require('node:sqlite') as SQLiteModule;
    return new sqlite.DatabaseSync(filename);
  } catch (nodeSQLiteError) {
    try {
      const BetterSQLite = require('better-sqlite3') as new (filename: string) => SQLiteDatabase;
      return new BetterSQLite(filename);
    } catch (betterSQLiteError) {
      throw new AggregateError(
        [nodeSQLiteError, betterSQLiteError],
        'SQLite requires node:sqlite or better-sqlite3.'
      );
    }
  }
}

function hash(value: string): string {
  return `sha256:${createHash('sha256').update(value).digest('hex')}`;
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer.`);
  }
  return value;
}

function storeError(
  code: SQLiteExecutionStoreFoundationErrorCode,
  message: string,
  details?: Record<string, unknown>,
  _cause?: unknown
): SQLiteExecutionStoreFoundationError {
  return new SQLiteExecutionStoreFoundationError(code, message, details);
}
