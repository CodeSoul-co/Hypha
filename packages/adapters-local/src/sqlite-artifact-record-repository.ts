import fs from 'node:fs';
import path from 'node:path';
import type {
  ArtifactIdempotencyRecord,
  ArtifactGarbageCollectionCandidate,
  ArtifactGarbageCollectionClaimRequest,
  ArtifactGarbageCollectionScanRequest,
  ArtifactRecordCommitRequest,
  ArtifactRecordRepository,
  ProviderHealth,
  StoredArtifactRecord,
} from '@hypha/core';
import { ArtifactRecordRepositoryConflictError, ArtifactRecordRepositoryError } from '@hypha/core';
import {
  compareStoredArtifactRecords,
  parseStoredArtifactRecord,
  validateStoredArtifactRecord,
} from './artifact-record-repository-values';
import {
  artifactStorageKey,
  buildArtifactGarbageCollectionCandidates,
  sameCandidateVersions,
  type ArtifactGarbageCollectionRecordEntry,
} from './artifact-gc-values';

interface SQLiteStatement {
  get(...params: unknown[]): Record<string, unknown> | undefined;
  all(...params: unknown[]): Array<Record<string, unknown>>;
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

export interface SQLiteArtifactRecordRepositoryOptions {
  rootPath: string;
  filename?: string;
  id?: string;
  busyTimeoutMs?: number;
  now?: () => string;
}

export class SQLiteArtifactRecordRepository implements ArtifactRecordRepository {
  readonly id: string;
  readonly filename: string;
  private readonly database: SQLiteDatabase;
  private readonly now: () => string;
  private closed = false;

  constructor(options: SQLiteArtifactRecordRepositoryOptions) {
    const root = prepareRepositoryRoot(options.rootPath);
    const basename = repositoryFilename(options.filename ?? 'artifact-records.sqlite');
    this.filename = path.join(root, basename);
    this.id = options.id ?? 'artifact-record-repository.sqlite.execution';
    this.now = options.now ?? (() => new Date().toISOString());
    const busyTimeoutMs = positiveInteger(options.busyTimeoutMs ?? 5_000, 'busyTimeoutMs');
    try {
      this.database = openSQLiteDatabase(this.filename);
      this.database.exec(`PRAGMA busy_timeout = ${busyTimeoutMs}`);
      this.database.exec('PRAGMA journal_mode = WAL');
      this.database.exec('PRAGMA foreign_keys = ON');
      this.database.exec(SCHEMA_SQL);
      this.backfillGarbageCollectionState();
      if (process.platform !== 'win32') fs.chmodSync(this.filename, 0o600);
    } catch (error) {
      throw repositoryError(
        'ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE',
        'Unable to open the SQLite Artifact record repository.',
        error
      );
    }
  }

  async get(artifactId: string, versionId?: string): Promise<StoredArtifactRecord | null> {
    this.assertOpen();
    return this.readOperation(() => {
      const row = versionId
        ? this.database
            .prepare(
              'SELECT record_json, profile_ref_json FROM artifact_records ' +
                'WHERE artifact_id = ? AND version_id = ?'
            )
            .get(artifactId, versionId)
        : this.database
            .prepare(
              'SELECT record_json, profile_ref_json FROM artifact_records ' +
                'WHERE artifact_id = ? ORDER BY version_number DESC LIMIT 1'
            )
            .get(artifactId);
      return row ? parseStoredRow(row) : null;
    });
  }

  async getByVersionId(versionId: string): Promise<StoredArtifactRecord | null> {
    this.assertOpen();
    return this.readOperation(() => {
      const row = this.database
        .prepare('SELECT record_json, profile_ref_json FROM artifact_records WHERE version_id = ?')
        .get(versionId);
      return row ? parseStoredRow(row) : null;
    });
  }

  async list(): Promise<StoredArtifactRecord[]> {
    this.assertOpen();
    return this.readOperation(() =>
      this.database
        .prepare(
          'SELECT record_json, profile_ref_json FROM artifact_records ' +
            'ORDER BY created_at ASC, artifact_id ASC, version_number ASC'
        )
        .all()
        .map(parseStoredRow)
        .sort(compareStoredArtifactRecords)
    );
  }

  async findIdempotency(
    operationId: string,
    idempotencyKey: string
  ): Promise<StoredArtifactRecord | null> {
    this.assertOpen();
    return this.readOperation(() => {
      const row = this.database
        .prepare(
          'SELECT r.record_json, r.profile_ref_json FROM artifact_idempotency i ' +
            'JOIN artifact_records r ON r.version_id = i.version_id ' +
            'WHERE i.operation_id = ? AND i.idempotency_key = ?'
        )
        .get(operationId, idempotencyKey);
      return row ? parseStoredRow(row) : null;
    });
  }

  async commit(request: ArtifactRecordCommitRequest): Promise<void> {
    this.assertOpen();
    if (request.records.length === 0) {
      throw new TypeError('Artifact record commit must include at least one record.');
    }
    const records = request.records.map(validateStoredArtifactRecord);
    assertUniqueCommitVersions(records);
    this.writeOperation(() => {
      this.assertRevisionFence(request);
      this.assertRecordUpdates(records);
      this.assertIdempotency(request.idempotency, records);
      this.assertGarbageCollectionClaims(records);
      const upsert = this.database.prepare(
        'INSERT INTO artifact_records ' +
          '(version_id, artifact_id, version_number, created_at, record_json, profile_ref_json) ' +
          'VALUES (?, ?, ?, ?, ?, ?) ' +
          'ON CONFLICT(version_id) DO UPDATE SET ' +
          'artifact_id = excluded.artifact_id, version_number = excluded.version_number, ' +
          'created_at = excluded.created_at, record_json = excluded.record_json, ' +
          'profile_ref_json = excluded.profile_ref_json'
      );
      for (const stored of records) {
        upsert.run(
          stored.record.versionId,
          stored.record.id,
          stored.record.versionNumber,
          stored.record.createdAt,
          JSON.stringify(stored.record),
          JSON.stringify(stored.profileRef)
        );
        const storageKey = artifactStorageKey(stored.record.storageRef);
        this.database
          .prepare(
            'INSERT INTO artifact_gc_state (version_id, storage_key) VALUES (?, ?) ' +
              'ON CONFLICT(version_id) DO UPDATE SET ' +
              'storage_key = excluded.storage_key, ' +
              'claim_id = CASE WHEN artifact_gc_state.storage_key = excluded.storage_key ' +
              'THEN artifact_gc_state.claim_id ELSE NULL END, ' +
              'claimed_at = CASE WHEN artifact_gc_state.storage_key = excluded.storage_key ' +
              'THEN artifact_gc_state.claimed_at ELSE NULL END, ' +
              'completed_at = CASE WHEN artifact_gc_state.storage_key = excluded.storage_key ' +
              'THEN artifact_gc_state.completed_at ELSE NULL END'
          )
          .run(stored.record.versionId, storageKey);
      }
      if (request.idempotency) {
        this.database
          .prepare(
            'INSERT INTO artifact_idempotency ' +
              '(operation_id, idempotency_key, artifact_id, version_id) VALUES (?, ?, ?, ?) ' +
              'ON CONFLICT(operation_id, idempotency_key) DO NOTHING'
          )
          .run(
            request.idempotency.operationId,
            request.idempotency.idempotencyKey,
            request.idempotency.artifactId,
            request.idempotency.versionId
          );
      }
    });
  }

  async listGarbageCollectionCandidates(
    request: ArtifactGarbageCollectionScanRequest
  ): Promise<ArtifactGarbageCollectionCandidate[]> {
    this.assertOpen();
    return this.readOperation(() =>
      buildArtifactGarbageCollectionCandidates(this.garbageCollectionEntries(), request)
    );
  }

  async claimGarbageCollection(request: ArtifactGarbageCollectionClaimRequest): Promise<boolean> {
    this.assertOpen();
    return this.writeOperation(() => {
      const current = buildArtifactGarbageCollectionCandidates(this.garbageCollectionEntries(), {
        staleBefore: request.staleBefore,
      }).find((candidate) => sameCandidateVersions(candidate, request.candidate));
      if (!current) return false;
      const statement = this.database.prepare(
        'UPDATE artifact_gc_state SET claim_id = ?, claimed_at = ? ' +
          'WHERE version_id = ? AND completed_at IS NULL'
      );
      for (const versionId of current.versionIds) {
        statement.run(request.claimId, request.claimedAt, versionId);
      }
      return true;
    });
  }

  async completeGarbageCollection(claimId: string, completedAt: string): Promise<void> {
    this.assertOpen();
    this.writeOperation(() => {
      this.database
        .prepare(
          'UPDATE artifact_gc_state SET claim_id = NULL, claimed_at = NULL, completed_at = ? ' +
            'WHERE claim_id = ?'
        )
        .run(completedAt, claimId);
    });
  }

  async releaseGarbageCollection(claimId: string): Promise<void> {
    this.assertOpen();
    this.writeOperation(() => {
      this.database
        .prepare(
          'UPDATE artifact_gc_state SET claim_id = NULL, claimed_at = NULL WHERE claim_id = ?'
        )
        .run(claimId);
    });
  }

  async health(): Promise<ProviderHealth> {
    if (this.closed) {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        message: 'SQLite Artifact record repository is closed.',
      };
    }
    try {
      const check = this.database.prepare('PRAGMA quick_check(1)').get();
      const records = Number(
        this.database.prepare('SELECT COUNT(*) AS count FROM artifact_records').get()?.count ?? 0
      );
      const idempotencyRecords = Number(
        this.database.prepare('SELECT COUNT(*) AS count FROM artifact_idempotency').get()?.count ??
          0
      );
      const garbageCollectionClaims = Number(
        this.database
          .prepare(
            'SELECT COUNT(*) AS count FROM artifact_gc_state ' +
              'WHERE claim_id IS NOT NULL AND completed_at IS NULL'
          )
          .get()?.count ?? 0
      );
      const result = String(Object.values(check ?? {})[0] ?? 'unknown');
      return {
        status: result === 'ok' ? 'healthy' : 'unhealthy',
        checkedAt: this.now(),
        ...(result === 'ok' ? {} : { message: `SQLite quick_check returned ${result}.` }),
        details: { repositoryId: this.id, records, idempotencyRecords, garbageCollectionClaims },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    this.database.close();
  }

  private assertRevisionFence(request: ArtifactRecordCommitRequest): void {
    const fence = request.expectedLatest;
    if (!fence) return;
    const row = this.database
      .prepare(
        'SELECT version_id, record_json, profile_ref_json FROM artifact_records ' +
          'WHERE artifact_id = ? ORDER BY version_number DESC LIMIT 1'
      )
      .get(fence.artifactId);
    const actual = row ? parseStoredRow(row).record : undefined;
    if (
      !actual ||
      String(row?.version_id) !== fence.versionId ||
      actual.revision !== fence.revision
    ) {
      throw new ArtifactRecordRepositoryConflictError(
        'Artifact revision fence no longer matches the latest persisted version.',
        {
          artifactId: fence.artifactId,
          expectedVersionId: fence.versionId,
          expectedRevision: fence.revision,
          actualVersionId: row?.version_id,
          actualRevision: actual?.revision,
        }
      );
    }
  }

  private assertRecordUpdates(records: StoredArtifactRecord[]): void {
    const statement = this.database.prepare(
      'SELECT artifact_id FROM artifact_records WHERE version_id = ?'
    );
    for (const stored of records) {
      const existing = statement.get(stored.record.versionId);
      if (existing && String(existing.artifact_id) !== stored.record.id) {
        throw new ArtifactRecordRepositoryConflictError(
          'Artifact version ID is already owned by another Artifact.',
          {
            versionId: stored.record.versionId,
            artifactId: stored.record.id,
            existingArtifactId: existing.artifact_id,
          }
        );
      }
    }
  }

  private assertIdempotency(
    result: ArtifactIdempotencyRecord | undefined,
    records: StoredArtifactRecord[]
  ): void {
    if (!result) return;
    const existing = this.database
      .prepare(
        'SELECT artifact_id, version_id FROM artifact_idempotency ' +
          'WHERE operation_id = ? AND idempotency_key = ?'
      )
      .get(result.operationId, result.idempotencyKey);
    if (
      existing &&
      (String(existing.artifact_id) !== result.artifactId ||
        String(existing.version_id) !== result.versionId)
    ) {
      throw new ArtifactRecordRepositoryConflictError(
        'Artifact idempotency key is already bound to a different result.',
        {
          operationId: result.operationId,
          idempotencyKey: result.idempotencyKey,
          artifactId: existing.artifact_id,
          versionId: existing.version_id,
        }
      );
    }
    const targetInCommit = records.some(
      (stored) =>
        stored.record.id === result.artifactId && stored.record.versionId === result.versionId
    );
    const targetPersisted = this.database
      .prepare('SELECT 1 AS found FROM artifact_records WHERE artifact_id = ? AND version_id = ?')
      .get(result.artifactId, result.versionId);
    if (!targetInCommit && !targetPersisted) {
      throw new ArtifactRecordRepositoryConflictError(
        'Artifact idempotency result must reference a committed Artifact version.',
        { artifactId: result.artifactId, versionId: result.versionId }
      );
    }
  }

  private assertGarbageCollectionClaims(records: StoredArtifactRecord[]): void {
    const statement = this.database.prepare(
      'SELECT claim_id FROM artifact_gc_state ' +
        'WHERE storage_key = ? AND claim_id IS NOT NULL AND completed_at IS NULL LIMIT 1'
    );
    for (const stored of records) {
      const claimed = statement.get(artifactStorageKey(stored.record.storageRef));
      if (claimed) {
        throw new ArtifactRecordRepositoryConflictError(
          'Artifact storage reference is currently claimed by garbage collection.',
          {
            storeId: stored.record.storageRef.storeId,
            objectKey: stored.record.storageRef.objectKey,
            claimId: claimed.claim_id,
          }
        );
      }
    }
  }

  private garbageCollectionEntries(): ArtifactGarbageCollectionRecordEntry[] {
    return this.database
      .prepare(
        'SELECT r.record_json, r.profile_ref_json, g.storage_key, g.claim_id, ' +
          'g.claimed_at, g.completed_at FROM artifact_records r ' +
          'JOIN artifact_gc_state g ON g.version_id = r.version_id'
      )
      .all()
      .map((row) => ({
        stored: parseStoredRow(row),
        state: {
          storageKey: String(row.storage_key),
          ...(row.claim_id ? { claimId: String(row.claim_id) } : {}),
          ...(row.claimed_at ? { claimedAt: String(row.claimed_at) } : {}),
          ...(row.completed_at ? { completedAt: String(row.completed_at) } : {}),
        },
      }));
  }

  private backfillGarbageCollectionState(): void {
    const insert = this.database.prepare(
      'INSERT INTO artifact_gc_state (version_id, storage_key) VALUES (?, ?) ' +
        'ON CONFLICT(version_id) DO NOTHING'
    );
    for (const row of this.database
      .prepare('SELECT version_id, record_json, profile_ref_json FROM artifact_records')
      .all()) {
      try {
        const stored = parseStoredRow(row);
        insert.run(stored.record.versionId, artifactStorageKey(stored.record.storageRef));
      } catch (error) {
        if (isCorruptRecordError(error)) continue;
        throw error;
      }
    }
  }

  private readOperation<T>(operation: () => T): T {
    try {
      return operation();
    } catch (error) {
      if (error instanceof ArtifactRecordRepositoryError) throw error;
      if (error instanceof SyntaxError) {
        throw repositoryError(
          'ARTIFACT_RECORD_REPOSITORY_CORRUPT',
          'SQLite Artifact record repository contains invalid JSON.',
          error
        );
      }
      throw repositoryError(
        'ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE',
        'SQLite Artifact record repository read failed.',
        error
      );
    }
  }

  private writeOperation<T>(operation: () => T): T {
    try {
      this.database.exec('BEGIN IMMEDIATE');
      const result = operation();
      this.database.exec('COMMIT');
      return result;
    } catch (error) {
      try {
        this.database.exec('ROLLBACK');
      } catch {
        // Preserve the original transaction failure.
      }
      if (error instanceof ArtifactRecordRepositoryConflictError) throw error;
      if (error instanceof ArtifactRecordRepositoryError) throw error;
      throw repositoryError(
        'ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE',
        'SQLite Artifact record repository commit failed.',
        error
      );
    }
  }

  private assertOpen(): void {
    if (this.closed) {
      throw repositoryError(
        'ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE',
        'SQLite Artifact record repository is closed.'
      );
    }
  }
}

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS artifact_records (
  version_id TEXT PRIMARY KEY,
  artifact_id TEXT NOT NULL,
  version_number INTEGER NOT NULL CHECK (version_number > 0),
  created_at TEXT NOT NULL,
  record_json TEXT NOT NULL,
  profile_ref_json TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS artifact_records_latest
  ON artifact_records (artifact_id, version_number DESC);
CREATE TABLE IF NOT EXISTS artifact_idempotency (
  operation_id TEXT NOT NULL,
  idempotency_key TEXT NOT NULL,
  artifact_id TEXT NOT NULL,
  version_id TEXT NOT NULL,
  PRIMARY KEY (operation_id, idempotency_key),
  FOREIGN KEY (version_id) REFERENCES artifact_records(version_id)
);
CREATE TABLE IF NOT EXISTS artifact_gc_state (
  version_id TEXT PRIMARY KEY,
  storage_key TEXT NOT NULL,
  claim_id TEXT,
  claimed_at TEXT,
  completed_at TEXT,
  FOREIGN KEY (version_id) REFERENCES artifact_records(version_id)
);
CREATE INDEX IF NOT EXISTS artifact_gc_storage
  ON artifact_gc_state (storage_key, claim_id, completed_at);
`;

function prepareRepositoryRoot(rootPath: string): string {
  if (!rootPath.trim()) throw new TypeError('rootPath is required.');
  const requested = path.resolve(rootPath);
  fs.mkdirSync(requested, { recursive: true });
  const root = fs.realpathSync(requested);
  const stat = fs.lstatSync(root);
  if (!stat.isDirectory() || stat.isSymbolicLink()) {
    throw new TypeError('Artifact record repository root must be a safe directory.');
  }
  return root;
}

function repositoryFilename(value: string): string {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*\.sqlite$/u.test(value)) {
    throw new TypeError('Artifact record repository filename must be a simple .sqlite basename.');
  }
  return value;
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

function parseStoredRow(row: Record<string, unknown>): StoredArtifactRecord {
  try {
    return parseStoredArtifactRecord(String(row.record_json), String(row.profile_ref_json));
  } catch (error) {
    throw repositoryError(
      'ARTIFACT_RECORD_REPOSITORY_CORRUPT',
      'SQLite Artifact record repository contains an invalid Artifact record.',
      error
    );
  }
}

function assertUniqueCommitVersions(records: StoredArtifactRecord[]): void {
  const owners = new Map<string, string>();
  for (const stored of records) {
    const owner = owners.get(stored.record.versionId);
    if (owner && owner !== stored.record.id) {
      throw new ArtifactRecordRepositoryConflictError(
        'Artifact commit contains a version ID owned by multiple Artifacts.',
        {
          versionId: stored.record.versionId,
          artifactId: stored.record.id,
          existingArtifactId: owner,
        }
      );
    }
    owners.set(stored.record.versionId, stored.record.id);
  }
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer.`);
  }
  return value;
}

function isCorruptRecordError(error: unknown): boolean {
  return (
    error instanceof ArtifactRecordRepositoryError &&
    error.code === 'ARTIFACT_RECORD_REPOSITORY_CORRUPT'
  );
}

function repositoryError(
  code: ArtifactRecordRepositoryError['code'],
  message: string,
  cause?: unknown
): ArtifactRecordRepositoryError {
  return new ArtifactRecordRepositoryError(code, message, cause);
}
