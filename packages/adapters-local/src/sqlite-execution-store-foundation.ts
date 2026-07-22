import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type {
  ExecutionRecord,
  ExecutionRecordCompareAndSetRequest,
  ExecutionRecordCreateRequest,
  ExecutionLeaseAcquireRequest,
  ExecutionLeaseRenewRequest,
  ProviderHealth,
} from '@hypha/core';
import {
  validateExecutionRecord,
  validateExecutionRecordCompareAndSetRequest,
  validateExecutionRecordCreateRequest,
  validateExecutionLeaseAcquireRequest,
  validateExecutionLeaseRenewRequest,
} from '@hypha/core';
import {
  migrateSQLiteExecutionStore,
  SQLITE_EXECUTION_STORE_SCHEMA_VERSION,
  SQLiteExecutionStoreSchemaVersionError,
  type SQLiteExecutionStoreSchemaDatabase,
} from './sqlite-execution-store-schema';

interface SQLiteRunResult {
  changes: number | bigint;
}

interface SQLiteStatement {
  get(...params: unknown[]): Record<string, unknown> | undefined;
  run(...params: unknown[]): SQLiteRunResult;
}

interface SQLiteDatabase extends SQLiteExecutionStoreSchemaDatabase {
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
  | 'EXECUTION_STORE_NOT_FOUND'
  | 'EXECUTION_STORE_REVISION_CONFLICT'
  | 'EXECUTION_STORE_FENCING_REJECTED'
  | 'EXECUTION_STORE_LEASE_HELD'
  | 'EXECUTION_STORE_LEASE_ID_CONFLICT'
  | 'EXECUTION_STORE_LEASE_LOST'
  | 'EXECUTION_STORE_TERMINAL'
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
  static readonly schemaVersion = SQLITE_EXECUTION_STORE_SCHEMA_VERSION;
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
      migrateSQLiteExecutionStore(database);
      this.database = database;
      if (process.platform !== 'win32') fs.chmodSync(this.filename, 0o600);
    } catch (error) {
      try {
        database?.close();
      } catch {
        // Preserve the original initialization error.
      }
      if (error instanceof SQLiteExecutionStoreFoundationError) throw error;
      if (error instanceof SQLiteExecutionStoreSchemaVersionError) {
        throw storeError('EXECUTION_STORE_UNSUPPORTED_SCHEMA', error.message, {
          current: error.current,
          supported: error.supported,
        });
      }
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

  async compareAndSet(input: ExecutionRecordCompareAndSetRequest): Promise<ExecutionRecord> {
    this.assertOpen();
    const request = validateExecutionRecordCompareAndSetRequest(input);
    const requestHash = hash(JSON.stringify(request));
    return this.writeOperation(() => {
      if (request.idempotencyKey) {
        const replay = this.findMutationIdempotency(request.operationId, request.idempotencyKey);
        if (replay) return parseMutationReplay(replay, requestHash, request.executionId);
      }

      const row = this.selectRecord(request.executionId);
      if (!row) {
        throw storeError('EXECUTION_STORE_NOT_FOUND', 'Execution record does not exist.', {
          executionId: request.executionId,
        });
      }
      const current = parseRecordRow(row);
      if (current.revision !== request.expectedRevision) {
        throw storeError(
          'EXECUTION_STORE_REVISION_CONFLICT',
          'Execution record revision does not match the expected revision.',
          {
            executionId: request.executionId,
            expectedRevision: request.expectedRevision,
            actualRevision: current.revision,
          }
        );
      }
      if (TERMINAL_STATUSES.has(current.status)) {
        throw storeError('EXECUTION_STORE_TERMINAL', 'Terminal Execution records are immutable.', {
          executionId: request.executionId,
          status: current.status,
        });
      }
      assertLeaseContinuity(current, request);

      const fencingToken = lastFencingToken(row);
      const nextJson = this.replaceRecord(
        request.next,
        request.expectedRevision,
        fencingToken,
        fencingToken,
        'Execution record changed during compare-and-set.'
      );
      this.rememberMutation(request, requestHash, nextJson);
      return structuredClone(request.next);
    });
  }

  async acquireLease(input: ExecutionLeaseAcquireRequest): Promise<ExecutionRecord> {
    this.assertOpen();
    const request = validateExecutionLeaseAcquireRequest(input);
    const requestHash = hash(JSON.stringify(request));
    return this.writeOperation(() => {
      if (request.idempotencyKey) {
        const replay = this.findMutationIdempotency(request.operationId, request.idempotencyKey);
        if (replay) return parseMutationReplay(replay, requestHash, request.executionId);
      }

      const row = this.selectRecord(request.executionId);
      if (!row) {
        throw storeError('EXECUTION_STORE_NOT_FOUND', 'Execution record does not exist.', {
          executionId: request.executionId,
        });
      }
      const current = parseRecordRow(row);
      if (current.revision !== request.expectedRevision) {
        throw storeError(
          'EXECUTION_STORE_REVISION_CONFLICT',
          'Execution record revision does not match the expected revision.',
          {
            executionId: request.executionId,
            expectedRevision: request.expectedRevision,
            actualRevision: current.revision,
          }
        );
      }
      if (TERMINAL_STATUSES.has(current.status)) {
        throw storeError('EXECUTION_STORE_TERMINAL', 'Terminal Execution records are immutable.', {
          executionId: request.executionId,
          status: current.status,
        });
      }
      if (Date.parse(request.acquiredAt) < Date.parse(current.updatedAt)) {
        throw storeError(
          'EXECUTION_STORE_CONFLICT',
          'Lease acquisition time cannot precede the current Execution revision.',
          {
            executionId: request.executionId,
            acquiredAt: request.acquiredAt,
            updatedAt: current.updatedAt,
          }
        );
      }
      if (current.lease && Date.parse(current.lease.expiresAt) > Date.parse(request.acquiredAt)) {
        throw storeError('EXECUTION_STORE_LEASE_HELD', 'Execution lease is still active.', {
          executionId: request.executionId,
          leaseId: current.lease.id,
          expiresAt: current.lease.expiresAt,
        });
      }
      if (this.findLeaseHistory(request.requestedLeaseId)) {
        throw storeError(
          'EXECUTION_STORE_LEASE_ID_CONFLICT',
          'Execution lease id has already been used.',
          { executionId: request.executionId, leaseId: request.requestedLeaseId }
        );
      }

      const previousFencingToken = lastFencingToken(row);
      const fencingToken = previousFencingToken + 1;
      if (!Number.isSafeInteger(fencingToken)) {
        throw storeError(
          'EXECUTION_STORE_CONFLICT',
          'Execution fencing token cannot be incremented safely.',
          { executionId: request.executionId, previousFencingToken }
        );
      }
      const next = validateExecutionRecord({
        ...current,
        revision: current.revision + 1,
        status: current.status === 'queued' ? 'starting' : current.status,
        attempt: current.status === 'queued' ? current.attempt + 1 : current.attempt,
        lease: {
          id: request.requestedLeaseId,
          executionId: request.executionId,
          ownerId: request.ownerId,
          fencingToken,
          acquiredAt: request.acquiredAt,
          heartbeatAt: request.acquiredAt,
          expiresAt: leaseExpiry(request.acquiredAt, request.ttlMs),
        },
        updatedAt: request.acquiredAt,
      });
      const nextJson = JSON.stringify(next);

      this.database
        .prepare(
          'INSERT INTO execution_lease_history ' +
            '(lease_id, execution_id, fencing_token, owner_id, acquired_at) VALUES (?, ?, ?, ?, ?)'
        )
        .run(
          request.requestedLeaseId,
          request.executionId,
          fencingToken,
          request.ownerId,
          request.acquiredAt
        );
      this.replaceRecord(
        next,
        request.expectedRevision,
        previousFencingToken,
        fencingToken,
        'Execution record changed during lease acquisition.'
      );
      this.rememberMutation(request, requestHash, nextJson);
      return structuredClone(next);
    });
  }

  async renewLease(input: ExecutionLeaseRenewRequest): Promise<ExecutionRecord> {
    this.assertOpen();
    const request = validateExecutionLeaseRenewRequest(input);
    const requestHash = hash(JSON.stringify(request));
    return this.writeOperation(() => {
      if (request.idempotencyKey) {
        const replay = this.findMutationIdempotency(request.operationId, request.idempotencyKey);
        if (replay) return parseMutationReplay(replay, requestHash, request.executionId);
      }

      const row = this.selectRecord(request.executionId);
      if (!row) {
        throw storeError('EXECUTION_STORE_NOT_FOUND', 'Execution record does not exist.', {
          executionId: request.executionId,
        });
      }
      const current = parseRecordRow(row);
      if (current.revision !== request.expectedRevision) {
        throw storeError(
          'EXECUTION_STORE_REVISION_CONFLICT',
          'Execution record revision does not match the expected revision.',
          {
            executionId: request.executionId,
            expectedRevision: request.expectedRevision,
            actualRevision: current.revision,
          }
        );
      }
      if (TERMINAL_STATUSES.has(current.status)) {
        throw storeError('EXECUTION_STORE_TERMINAL', 'Terminal Execution records are immutable.', {
          executionId: request.executionId,
          status: current.status,
        });
      }
      const lease = current.lease;
      if (!lease) {
        throw storeError('EXECUTION_STORE_LEASE_LOST', 'Execution has no active lease.', {
          executionId: request.executionId,
        });
      }
      assertLeaseGuard(lease, request.leaseGuard, request.executionId);
      const heartbeatTime = Date.parse(request.heartbeatAt);
      if (heartbeatTime <= Date.parse(current.updatedAt)) {
        throw storeError(
          'EXECUTION_STORE_CONFLICT',
          'Lease heartbeat must advance the current Execution revision.',
          {
            executionId: request.executionId,
            heartbeatAt: request.heartbeatAt,
            updatedAt: current.updatedAt,
          }
        );
      }
      if (heartbeatTime >= Date.parse(lease.expiresAt)) {
        throw storeError('EXECUTION_STORE_LEASE_LOST', 'Execution lease has expired.', {
          executionId: request.executionId,
          leaseId: lease.id,
          expiresAt: lease.expiresAt,
        });
      }
      const expiresAt = leaseExpiry(request.heartbeatAt, request.ttlMs);
      if (Date.parse(expiresAt) <= Date.parse(lease.expiresAt)) {
        throw storeError(
          'EXECUTION_STORE_CONFLICT',
          'Lease renewal must extend the current expiry.',
          {
            executionId: request.executionId,
            currentExpiresAt: lease.expiresAt,
            requestedExpiresAt: expiresAt,
          }
        );
      }

      const next = validateExecutionRecord({
        ...current,
        revision: current.revision + 1,
        lease: {
          ...lease,
          heartbeatAt: request.heartbeatAt,
          expiresAt,
        },
        updatedAt: request.heartbeatAt,
      });
      const fencingToken = lastFencingToken(row);
      const nextJson = this.replaceRecord(
        next,
        request.expectedRevision,
        fencingToken,
        fencingToken,
        'Execution record changed during lease renewal.'
      );
      this.rememberMutation(request, requestHash, nextJson);
      return structuredClone(next);
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
          'provider_id, created_at, updated_at, record_json, last_fencing_token ' +
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

  private findMutationIdempotency(
    operationId: string,
    idempotencyKey: string
  ): Record<string, unknown> | undefined {
    return this.database
      .prepare(
        'SELECT execution_id, request_hash, result_json FROM execution_mutation_idempotency ' +
          'WHERE operation_id = ? AND idempotency_key = ?'
      )
      .get(operationId, idempotencyKey);
  }

  private findLeaseHistory(leaseId: string): Record<string, unknown> | undefined {
    return this.database
      .prepare(
        'SELECT lease_id, execution_id, fencing_token FROM execution_lease_history ' +
          'WHERE lease_id = ?'
      )
      .get(leaseId);
  }

  private replaceRecord(
    next: ExecutionRecord,
    expectedRevision: number,
    expectedFencingToken: number,
    nextFencingToken: number,
    conflictMessage: string
  ): string {
    const nextJson = JSON.stringify(next);
    const update = this.database
      .prepare(
        'UPDATE execution_records SET revision = ?, status = ?, tenant_id = ?, user_id = ?, ' +
          'workspace_id = ?, run_id = ?, provider_id = ?, created_at = ?, updated_at = ?, ' +
          'record_json = ?, last_fencing_token = ? ' +
          'WHERE execution_id = ? AND revision = ? AND last_fencing_token = ?'
      )
      .run(
        next.revision,
        next.status,
        next.request.tenantId ?? null,
        next.request.userId,
        next.request.workspaceId,
        next.request.runId ?? null,
        next.providerId,
        next.createdAt,
        next.updatedAt,
        nextJson,
        nextFencingToken,
        next.id,
        expectedRevision,
        expectedFencingToken
      );
    if (Number(update.changes) !== 1) {
      throw storeError('EXECUTION_STORE_REVISION_CONFLICT', conflictMessage, {
        executionId: next.id,
        expectedRevision,
      });
    }
    return nextJson;
  }

  private rememberMutation(
    request: { operationId: string; executionId: string; idempotencyKey?: string },
    requestHash: string,
    resultJson: string
  ): void {
    if (!request.idempotencyKey) return;
    this.database
      .prepare(
        'INSERT INTO execution_mutation_idempotency ' +
          '(operation_id, idempotency_key, execution_id, request_hash, result_json) ' +
          'VALUES (?, ?, ?, ?, ?)'
      )
      .run(
        request.operationId,
        request.idempotencyKey,
        request.executionId,
        requestHash,
        resultJson
      );
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

function parseMutationReplay(
  row: Record<string, unknown>,
  expectedHash: string,
  executionId: string
): ExecutionRecord {
  if (String(row.request_hash) !== expectedHash || String(row.execution_id) !== executionId) {
    throw storeError(
      'EXECUTION_STORE_IDEMPOTENCY_CONFLICT',
      'Execution mutation idempotency key was reused with different input.',
      { executionId }
    );
  }
  try {
    const result = validateExecutionRecord(JSON.parse(String(row.result_json)));
    if (result.id !== executionId) throw new Error('result execution id does not match');
    return result;
  } catch (error) {
    if (error instanceof SQLiteExecutionStoreFoundationError) throw error;
    throw storeError(
      'EXECUTION_STORE_CORRUPT',
      'Execution mutation idempotency record contains an invalid result.',
      { executionId },
      error
    );
  }
}

function assertLeaseContinuity(
  current: ExecutionRecord,
  request: ExecutionRecordCompareAndSetRequest
): void {
  const currentLease = current.lease;
  const nextLease = request.next.lease;
  const guard = request.leaseGuard;
  if (!currentLease) {
    if (guard || nextLease) {
      throw storeError(
        'EXECUTION_STORE_FENCING_REJECTED',
        'compareAndSet cannot create a lease; acquireLease is required.',
        { executionId: current.id }
      );
    }
    return;
  }
  const matchesCurrent =
    guard?.leaseId === currentLease.id &&
    guard.ownerId === currentLease.ownerId &&
    guard.fencingToken === currentLease.fencingToken;
  const preservesLease =
    nextLease?.id === currentLease.id &&
    nextLease.ownerId === currentLease.ownerId &&
    nextLease.fencingToken === currentLease.fencingToken;
  if (!matchesCurrent || !preservesLease) {
    throw storeError(
      'EXECUTION_STORE_FENCING_REJECTED',
      'Execution lease or fencing token is stale.',
      { executionId: current.id, fencingToken: currentLease.fencingToken }
    );
  }
}

function assertLeaseGuard(
  lease: NonNullable<ExecutionRecord['lease']>,
  guard: ExecutionLeaseRenewRequest['leaseGuard'],
  executionId: string
): void {
  if (
    guard.leaseId !== lease.id ||
    guard.ownerId !== lease.ownerId ||
    guard.fencingToken !== lease.fencingToken
  ) {
    throw storeError(
      'EXECUTION_STORE_FENCING_REJECTED',
      'Execution lease or fencing token is stale.',
      { executionId, fencingToken: lease.fencingToken }
    );
  }
}

const TERMINAL_STATUSES = new Set<ExecutionRecord['status']>([
  'cancelled',
  'completed',
  'failed',
  'timed_out',
  'oom_killed',
  'resource_exceeded',
  'quarantined',
]);

function parseRecordRow(row: Record<string, unknown>): ExecutionRecord {
  try {
    const record = validateExecutionRecord(JSON.parse(String(row.record_json)));
    const lastFencingToken = nonNegativeInteger(Number(row.last_fencing_token), 'lastFencingToken');
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
      record.updatedAt !== String(row.updated_at) ||
      (record.lease !== undefined && record.lease.fencingToken !== lastFencingToken)
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

function nonNegativeInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative safe integer.`);
  }
  return value;
}

function lastFencingToken(row: Record<string, unknown>): number {
  return nonNegativeInteger(Number(row.last_fencing_token), 'lastFencingToken');
}

function leaseExpiry(acquiredAt: string, ttlMs: number): string {
  const expiry = Date.parse(acquiredAt) + ttlMs;
  const date = new Date(expiry);
  if (!Number.isSafeInteger(expiry) || Number.isNaN(date.getTime())) {
    throw new TypeError('Lease expiry must be a safe timestamp.');
  }
  return date.toISOString();
}

function storeError(
  code: SQLiteExecutionStoreFoundationErrorCode,
  message: string,
  details?: Record<string, unknown>,
  _cause?: unknown
): SQLiteExecutionStoreFoundationError {
  return new SQLiteExecutionStoreFoundationError(code, message, details);
}
