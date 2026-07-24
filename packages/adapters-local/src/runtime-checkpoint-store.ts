import {
  FrameworkError,
  eventStreamKey,
  hashCanonicalJson,
  validateRuntimeCheckpointRecord,
  validateRuntimeScope,
  verifyRuntimeCheckpointChecksum,
  type RuntimeCheckpointPutResult,
  type RuntimeCheckpointRecord,
  type RuntimeCheckpointStore,
  type RuntimeScope,
} from '@hypha/core';
import fs from 'fs';
import path from 'path';
import { loadSqlite, type SqliteDatabaseSync } from './sqlite-driver';

export interface SQLiteRuntimeCheckpointStoreOptions {
  filename: string;
  now?: () => string;
}

export class SQLiteRuntimeCheckpointStore implements RuntimeCheckpointStore {
  private readonly db: SqliteDatabaseSync;
  private readonly now: () => string;

  constructor(options: SQLiteRuntimeCheckpointStoreOptions) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = loadSqlite(true);
    if (!sqlite) throw new Error('SQLite driver is unavailable');
    this.db = new sqlite.DatabaseSync(options.filename);
    this.now = options.now ?? (() => new Date().toISOString());
    this.initialize();
  }

  async put(
    input: RuntimeCheckpointRecord,
    idempotencyKey: string
  ): Promise<RuntimeCheckpointPutResult> {
    const record = validateRuntimeCheckpointRecord(input);
    verifyRuntimeCheckpointChecksum(record);
    if (!idempotencyKey.trim()) invalid('Checkpoint idempotencyKey is required');
    const scopeKey = checkpointScopeKey(record.scope);
    const requestHash = hashCanonicalJson(record);

    this.db.exec('BEGIN IMMEDIATE');
    try {
      const prior = this.db
        .prepare(
          'SELECT request_hash, result_json FROM runtime_checkpoint_idempotency ' +
            'WHERE scope_key = ? AND idempotency_key = ?'
        )
        .get(scopeKey, idempotencyKey);
      if (prior) {
        if (String(prior.request_hash) !== requestHash) {
          conflict('Checkpoint idempotency key was reused with different input', record);
        }
        const reused = parsePutResult(prior.result_json, record.scope);
        this.db.exec('COMMIT');
        return structuredClone({ ...reused, reused: true });
      }

      if (
        this.db
          .prepare(
            'SELECT checkpoint_id FROM runtime_checkpoints ' +
              'WHERE scope_key = ? AND checkpoint_id = ?'
          )
          .get(scopeKey, record.id)
      ) {
        conflict('Checkpoint id was already used', record);
      }
      const latestRow = this.db
        .prepare(
          'SELECT sequence, last_event_sequence FROM runtime_checkpoints ' +
            'WHERE scope_key = ? ORDER BY sequence DESC LIMIT 1'
        )
        .get(scopeKey);
      const expectedSequence = Number(latestRow?.sequence ?? 0) + 1;
      if (record.sequence !== expectedSequence) {
        conflict('Checkpoint sequence must advance by one', record, {
          expectedSequence,
          actualSequence: record.sequence,
        });
      }
      const previousLastEventSequence = optionalNumber(latestRow?.last_event_sequence);
      if (
        previousLastEventSequence !== undefined &&
        record.lastEventSequence < previousLastEventSequence
      ) {
        conflict('Checkpoint Event sequence cannot move backwards', record, {
          previousLastEventSequence,
        });
      }

      this.db
        .prepare(
          'INSERT INTO runtime_checkpoints ' +
            '(scope_key, checkpoint_id, sequence, last_event_sequence, checksum, record_hash, ' +
            'created_at, record_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        )
        .run(
          scopeKey,
          record.id,
          record.sequence,
          record.lastEventSequence,
          record.checksum,
          requestHash,
          record.createdAt,
          JSON.stringify(record)
        );
      const result: RuntimeCheckpointPutResult = {
        record: structuredClone(record),
        reused: false,
      };
      this.db
        .prepare(
          'INSERT INTO runtime_checkpoint_idempotency ' +
            '(scope_key, idempotency_key, request_hash, result_json) VALUES (?, ?, ?, ?)'
        )
        .run(scopeKey, idempotencyKey, requestHash, JSON.stringify(result));
      this.db.exec('COMMIT');
      return structuredClone(result);
    } catch (error) {
      rollback(this.db);
      if (error instanceof FrameworkError) throw error;
      throw new FrameworkError({
        code: 'RUNTIME_CHECKPOINT_FAILED',
        message: 'SQLite checkpoint transaction failed',
        context: { checkpointId: record.id, runId: record.scope.runId },
        cause: error,
      });
    }
  }

  async get(scope: RuntimeScope, checkpointId: string): Promise<RuntimeCheckpointRecord | null> {
    const validatedScope = validateRuntimeScope(scope);
    if (!checkpointId.trim()) invalid('checkpointId is required');
    const row = this.db
      .prepare(
        'SELECT record_json, record_hash FROM runtime_checkpoints ' +
          'WHERE scope_key = ? AND checkpoint_id = ?'
      )
      .get(checkpointScopeKey(validatedScope), checkpointId);
    return row ? parseCheckpoint(row, validatedScope) : null;
  }

  async latest(scope: RuntimeScope): Promise<RuntimeCheckpointRecord | null> {
    const records = await this.list(scope, 1);
    return records[0] ?? null;
  }

  async list(scope: RuntimeScope, limit = 100): Promise<RuntimeCheckpointRecord[]> {
    const validatedScope = validateRuntimeScope(scope);
    if (!Number.isInteger(limit) || limit < 1 || limit > 1000) {
      invalid('Checkpoint list limit must be between 1 and 1000');
    }
    return this.db
      .prepare(
        'SELECT record_json, record_hash FROM runtime_checkpoints ' +
          'WHERE scope_key = ? ORDER BY sequence DESC LIMIT ?'
      )
      .all(checkpointScopeKey(validatedScope), limit)
      .map((row) => parseCheckpoint(row, validatedScope));
  }

  close(): void {
    this.db.close?.();
  }

  private initialize(): void {
    this.db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON');
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_schema_migrations (' +
        'version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_checkpoints (' +
        'scope_key TEXT NOT NULL, checkpoint_id TEXT NOT NULL, sequence INTEGER NOT NULL, ' +
        'last_event_sequence INTEGER NOT NULL, checksum TEXT NOT NULL, record_hash TEXT NOT NULL, ' +
        'created_at TEXT NOT NULL, record_json TEXT NOT NULL, ' +
        'PRIMARY KEY(scope_key, checkpoint_id), UNIQUE(scope_key, sequence))'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_checkpoint_idempotency (' +
        'scope_key TEXT NOT NULL, idempotency_key TEXT NOT NULL, request_hash TEXT NOT NULL, ' +
        'result_json TEXT NOT NULL, PRIMARY KEY(scope_key, idempotency_key))'
    );
    this.db.exec(
      'CREATE INDEX IF NOT EXISTS idx_runtime_checkpoints_latest ' +
        'ON runtime_checkpoints(scope_key, sequence DESC)'
    );
    this.db
      .prepare(
        'INSERT OR IGNORE INTO runtime_schema_migrations (version, applied_at) VALUES (?, ?)'
      )
      .run(3, validTimestamp(this.now(), 'Checkpoint migration clock'));
  }
}

function parseCheckpoint(
  row: Record<string, unknown>,
  expectedScope: RuntimeScope
): RuntimeCheckpointRecord {
  try {
    const record = validateRuntimeCheckpointRecord(JSON.parse(String(row.record_json)));
    if (checkpointScopeKey(record.scope) !== checkpointScopeKey(expectedScope)) {
      checkpointCorrupt(
        'Checkpoint scope does not match its storage scope',
        expectedScope,
        record.id
      );
    }
    verifyRuntimeCheckpointChecksum(record);
    if (hashCanonicalJson(record) !== String(row.record_hash)) {
      checkpointCorrupt(
        'Checkpoint record hash does not match persisted content',
        expectedScope,
        record.id
      );
    }
    return structuredClone(record);
  } catch (error) {
    if (error instanceof FrameworkError) throw error;
    throw new FrameworkError({
      code: 'RUNTIME_CHECKPOINT_FAILED',
      message: 'Checkpoint record is corrupt',
      context: { runId: expectedScope.runId },
      cause: error,
    });
  }
}

function parsePutResult(value: unknown, scope: RuntimeScope): RuntimeCheckpointPutResult {
  try {
    const result = JSON.parse(String(value)) as RuntimeCheckpointPutResult;
    if (!result || typeof result !== 'object' || typeof result.reused !== 'boolean') {
      checkpointCorrupt('Checkpoint idempotency result is invalid', scope);
    }
    const record = validateRuntimeCheckpointRecord(result.record);
    verifyRuntimeCheckpointChecksum(record);
    if (checkpointScopeKey(record.scope) !== checkpointScopeKey(scope)) {
      checkpointCorrupt('Checkpoint idempotency result has the wrong scope', scope, record.id);
    }
    return { record: structuredClone(record), reused: result.reused };
  } catch (error) {
    if (error instanceof FrameworkError) throw error;
    throw new FrameworkError({
      code: 'RUNTIME_CHECKPOINT_FAILED',
      message: 'Checkpoint idempotency result is corrupt',
      context: { runId: scope.runId },
      cause: error,
    });
  }
}

function checkpointScopeKey(scope: RuntimeScope): string {
  return eventStreamKey({
    ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
    userId: scope.userId,
    runId: scope.runId,
  });
}

function validTimestamp(value: string, label: string): string {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid date-time`);
  return value;
}

function optionalNumber(value: unknown): number | undefined {
  return value === undefined || value === null ? undefined : Number(value);
}

function conflict(
  message: string,
  record: RuntimeCheckpointRecord,
  context: Record<string, unknown> = {}
): never {
  throw new FrameworkError({
    code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    message,
    context: { checkpointId: record.id, runId: record.scope.runId, ...context },
  });
}

function checkpointCorrupt(message: string, scope: RuntimeScope, checkpointId?: string): never {
  throw new FrameworkError({
    code: 'RUNTIME_CHECKPOINT_FAILED',
    message,
    context: { runId: scope.runId, ...(checkpointId ? { checkpointId } : {}) },
  });
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function rollback(db: SqliteDatabaseSync): void {
  try {
    db.exec('ROLLBACK');
  } catch {
    // SQLite may reject work before opening a transaction.
  }
}
