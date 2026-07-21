import {
  FrameworkError,
  hashCanonicalJson,
  validateProjectionRecord,
  type ProjectionRecord,
  type ProjectionStore,
} from '@hypha/core';
import fs from 'fs';
import path from 'path';
import { loadSqlite, type SqliteDatabaseSync } from './sqlite-driver';

export interface SQLiteProjectionStoreOptions {
  filename: string;
  now?: () => string;
}

export class SQLiteProjectionStore<TState = unknown> implements ProjectionStore<TState> {
  private readonly db: SqliteDatabaseSync;
  private readonly now: () => string;

  constructor(options: SQLiteProjectionStoreOptions) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = loadSqlite(true);
    if (!sqlite) throw new Error('SQLite driver is unavailable');
    this.db = new sqlite.DatabaseSync(options.filename);
    this.now = options.now ?? (() => new Date().toISOString());
    this.initialize();
  }

  async get(projectionId: string, key: string): Promise<ProjectionRecord<TState> | null> {
    required(projectionId, 'projectionId');
    required(key, 'projection key');
    const row = this.db
      .prepare(
        'SELECT projection_version, state_json, state_hash, last_sequence, revision, updated_at ' +
          'FROM runtime_projection_offsets WHERE projection_id = ? AND projection_key = ?'
      )
      .get(projectionId, key);
    if (!row) return null;
    return projectionFromRow<TState>(projectionId, key, row);
  }

  async put(record: ProjectionRecord<TState>, expectedRevision?: number): Promise<void> {
    validateProjectionRecord(record);
    if (
      expectedRevision !== undefined &&
      (!Number.isInteger(expectedRevision) || expectedRevision < 0)
    ) {
      invalid('Projection expectedRevision must be non-negative');
    }
    const stateHash = hashCanonicalJson(record.state);
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const current = this.db
        .prepare(
          'SELECT revision FROM runtime_projection_offsets ' +
            'WHERE projection_id = ? AND projection_key = ?'
        )
        .get(record.projectionId, record.key);
      const currentRevision = Number(current?.revision ?? 0);
      if (expectedRevision !== undefined && expectedRevision !== currentRevision) {
        projectionFailure('Projection revision conflict', record, {
          expectedRevision,
          actualRevision: currentRevision,
        });
      }
      if (record.revision !== currentRevision + 1) {
        projectionFailure('Projection revision must advance by one', record, {
          revision: record.revision,
          currentRevision,
        });
      }
      this.db
        .prepare(
          'INSERT INTO runtime_projection_offsets ' +
            '(projection_id, projection_key, projection_version, state_json, state_hash, ' +
            'last_sequence, revision, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ' +
            'ON CONFLICT(projection_id, projection_key) DO UPDATE SET ' +
            'projection_version = excluded.projection_version, state_json = excluded.state_json, ' +
            'state_hash = excluded.state_hash, last_sequence = excluded.last_sequence, ' +
            'revision = excluded.revision, updated_at = excluded.updated_at'
        )
        .run(
          record.projectionId,
          record.key,
          record.projectionVersion,
          JSON.stringify(record.state),
          stateHash,
          record.lastSequence,
          record.revision,
          record.updatedAt
        );
      this.db.exec('COMMIT');
    } catch (error) {
      rollback(this.db);
      if (error instanceof FrameworkError) throw error;
      throw new FrameworkError({
        code: 'RUNTIME_PROJECTION_FAILED',
        message: 'SQLite projection transaction failed',
        context: { projectionId: record.projectionId, key: record.key },
        cause: error,
      });
    }
  }

  async delete(projectionId: string, key: string): Promise<void> {
    required(projectionId, 'projectionId');
    required(key, 'projection key');
    this.db
      .prepare(
        'DELETE FROM runtime_projection_offsets WHERE projection_id = ? AND projection_key = ?'
      )
      .run(projectionId, key);
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
      'CREATE TABLE IF NOT EXISTS runtime_projection_offsets (' +
        'projection_id TEXT NOT NULL, projection_key TEXT NOT NULL, projection_version TEXT NOT NULL, ' +
        'state_json TEXT NOT NULL, state_hash TEXT NOT NULL, last_sequence INTEGER NOT NULL, ' +
        'revision INTEGER NOT NULL, updated_at TEXT NOT NULL, ' +
        'PRIMARY KEY(projection_id, projection_key))'
    );
    this.db
      .prepare(
        'INSERT OR IGNORE INTO runtime_schema_migrations (version, applied_at) VALUES (?, ?)'
      )
      .run(2, validTimestamp(this.now(), 'Projection migration clock'));
  }
}

function projectionFromRow<TState>(
  projectionId: string,
  key: string,
  row: Record<string, unknown>
): ProjectionRecord<TState> {
  try {
    const state = JSON.parse(String(row.state_json)) as TState;
    if (hashCanonicalJson(state) !== String(row.state_hash)) {
      projectionFailure('Projection state hash does not match persisted state', {
        projectionId,
        key,
      });
    }
    const record: ProjectionRecord<TState> = {
      projectionId,
      projectionVersion: String(row.projection_version),
      key,
      state,
      lastSequence: Number(row.last_sequence),
      revision: Number(row.revision),
      updatedAt: String(row.updated_at),
    };
    validateProjectionRecord(record);
    return structuredClone(record);
  } catch (error) {
    if (error instanceof FrameworkError) throw error;
    throw new FrameworkError({
      code: 'RUNTIME_PROJECTION_FAILED',
      message: 'Projection record is corrupt',
      context: { projectionId, key },
      cause: error,
    });
  }
}

function required(value: string, label: string): void {
  if (!value.trim()) invalid(`${label} is required`);
}

function validTimestamp(value: string, label: string): string {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid date-time`);
  return value;
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function projectionFailure(
  message: string,
  record: Pick<ProjectionRecord, 'projectionId' | 'key'>,
  context: Record<string, unknown> = {}
): never {
  throw new FrameworkError({
    code: 'RUNTIME_PROJECTION_FAILED',
    message,
    context: { projectionId: record.projectionId, key: record.key, ...context },
  });
}

function rollback(db: SqliteDatabaseSync): void {
  try {
    db.exec('ROLLBACK');
  } catch {
    // SQLite may reject work before opening a transaction.
  }
}
