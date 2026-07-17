import {
  FrameworkError,
  hashCanonicalJson,
  type ProjectionRecord,
  type ProjectionStore,
} from '@hypha/core';
import fs from 'fs';
import path from 'path';
import { loadSqlite, type SqliteDatabaseSync } from './sqlite-driver';

export interface SQLiteProjectionStoreOptions {
  filename: string;
}

export class SQLiteProjectionStore<TState = unknown> implements ProjectionStore<TState> {
  private readonly db: SqliteDatabaseSync;

  constructor(options: SQLiteProjectionStoreOptions) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = loadSqlite(true);
    if (!sqlite) throw new Error('SQLite driver is unavailable');
    this.db = new sqlite.DatabaseSync(options.filename);
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_projection_offsets (' +
        'projection_id TEXT NOT NULL, projection_key TEXT NOT NULL, projection_version TEXT NOT NULL, ' +
        'state_json TEXT NOT NULL, state_hash TEXT NOT NULL, last_sequence INTEGER NOT NULL, ' +
        'revision INTEGER NOT NULL, updated_at TEXT NOT NULL, ' +
        'PRIMARY KEY(projection_id, projection_key))'
    );
  }

  async get(projectionId: string, key: string): Promise<ProjectionRecord<TState> | null> {
    const row = this.db
      .prepare(
        'SELECT projection_version, state_json, last_sequence, revision, updated_at ' +
          'FROM runtime_projection_offsets WHERE projection_id = ? AND projection_key = ?'
      )
      .get(projectionId, key);
    if (!row) return null;
    return {
      projectionId,
      projectionVersion: String(row.projection_version),
      key,
      state: JSON.parse(String(row.state_json)) as TState,
      lastSequence: Number(row.last_sequence),
      revision: Number(row.revision),
      updatedAt: String(row.updated_at),
    };
  }

  async put(record: ProjectionRecord<TState>, expectedRevision?: number): Promise<void> {
    validateRecord(record);
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
        projectionConflict('Projection revision conflict', record, {
          expectedRevision,
          actualRevision: currentRevision,
        });
      }
      if (record.revision !== currentRevision + 1) {
        projectionConflict('Projection revision must advance by one', record, {
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
    this.db
      .prepare(
        'DELETE FROM runtime_projection_offsets WHERE projection_id = ? AND projection_key = ?'
      )
      .run(projectionId, key);
  }
}

function validateRecord<TState>(record: ProjectionRecord<TState>): void {
  if (!record.projectionId || !record.projectionVersion || !record.key || !record.updatedAt) {
    projectionConflict('Projection record is missing required identity fields', record);
  }
  if (!Number.isInteger(record.lastSequence) || record.lastSequence < 0) {
    projectionConflict('Projection lastSequence must be a non-negative integer', record);
  }
  if (!Number.isInteger(record.revision) || record.revision < 1) {
    projectionConflict('Projection revision must be a positive integer', record);
  }
}

function projectionConflict<TState>(
  message: string,
  record: ProjectionRecord<TState>,
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
    // Ignore when SQLite rejected work before opening a transaction.
  }
}
