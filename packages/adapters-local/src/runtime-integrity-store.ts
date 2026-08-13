import {
  FrameworkError,
  hashCanonicalJson,
  type RuntimeIntegrityRepairEvidence,
  type RuntimeIntegrityStore,
  type RuntimeIntegrityWatermark,
} from '@codesoul-co/hypha-core';
import fs from 'fs';
import path from 'path';
import { loadSqlite, type SqliteDatabaseSync } from './sqlite-driver';

export interface SQLiteRuntimeIntegrityStoreOptions {
  filename: string;
}

export class SQLiteRuntimeIntegrityStore implements RuntimeIntegrityStore {
  private readonly db: SqliteDatabaseSync;

  constructor(options: SQLiteRuntimeIntegrityStoreOptions) {
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = loadSqlite(true);
    if (!sqlite) throw new Error('SQLite driver is unavailable');
    this.db = new sqlite.DatabaseSync(options.filename);
    this.initialize();
  }

  async getWatermark(): Promise<RuntimeIntegrityWatermark | null> {
    return this.readWatermark();
  }

  async putWatermark(
    watermark: RuntimeIntegrityWatermark,
    expectedLastGlobalSequence: number | null
  ): Promise<void> {
    validateWatermark(watermark);
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const current = this.readWatermark();
      if ((current?.lastGlobalSequence ?? null) !== expectedLastGlobalSequence) {
        throw conflict('Runtime integrity watermark changed concurrently');
      }
      const recordJson = JSON.stringify(watermark);
      const recordHash = hashCanonicalJson(watermark);
      this.db
        .prepare(
          'INSERT INTO runtime_integrity_watermark ' +
            '(singleton_id, last_global_sequence, watermark_hash, watermark_json) VALUES (1, ?, ?, ?) ' +
            'ON CONFLICT(singleton_id) DO UPDATE SET last_global_sequence = excluded.last_global_sequence, ' +
            'watermark_hash = excluded.watermark_hash, watermark_json = excluded.watermark_json'
        )
        .run(watermark.lastGlobalSequence, recordHash, recordJson);
      this.db.exec('COMMIT');
    } catch (error) {
      rollback(this.db);
      throw error;
    }
  }

  async getRepair(repairId: string): Promise<RuntimeIntegrityRepairEvidence | null> {
    return this.readRepair(repairId);
  }

  async putRepair(evidence: RuntimeIntegrityRepairEvidence): Promise<void> {
    validateRepairEvidence(evidence);
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const prior = this.readRepair(evidence.repairId);
      if (prior) {
        if (hashCanonicalJson(prior) !== hashCanonicalJson(evidence)) {
          throw conflict('Runtime integrity repairId was reused with different evidence');
        }
        this.db.exec('COMMIT');
        return;
      }
      const recordJson = JSON.stringify(evidence);
      this.db
        .prepare(
          'INSERT INTO runtime_integrity_repairs ' +
            '(repair_id, finding_hash, repaired_revision, evidence_record_hash, evidence_json) ' +
            'VALUES (?, ?, ?, ?, ?)'
        )
        .run(
          evidence.repairId,
          evidence.findingHash,
          evidence.repairedRevision,
          hashCanonicalJson(evidence),
          recordJson
        );
      this.db.exec('COMMIT');
    } catch (error) {
      rollback(this.db);
      throw error;
    }
  }

  close(): void {
    this.db.close?.();
  }

  private readWatermark(): RuntimeIntegrityWatermark | null {
    const row = this.db
      .prepare(
        'SELECT watermark_json, watermark_hash FROM runtime_integrity_watermark WHERE singleton_id = 1'
      )
      .get();
    if (!row) return null;
    const watermark = parseRecord<RuntimeIntegrityWatermark>(
      String(row.watermark_json),
      String(row.watermark_hash),
      'Runtime integrity watermark'
    );
    validateWatermark(watermark);
    return watermark;
  }

  private readRepair(repairId: string): RuntimeIntegrityRepairEvidence | null {
    const row = this.db
      .prepare(
        'SELECT evidence_json, evidence_record_hash FROM runtime_integrity_repairs WHERE repair_id = ?'
      )
      .get(nonEmpty(repairId, 'repairId'));
    if (!row) return null;
    const evidence = parseRecord<RuntimeIntegrityRepairEvidence>(
      String(row.evidence_json),
      String(row.evidence_record_hash),
      'Runtime integrity repair evidence'
    );
    validateRepairEvidence(evidence);
    return evidence;
  }

  private initialize(): void {
    this.db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON');
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_integrity_watermark (' +
        'singleton_id INTEGER PRIMARY KEY CHECK(singleton_id = 1), ' +
        'last_global_sequence INTEGER NOT NULL, watermark_hash TEXT NOT NULL, ' +
        'watermark_json TEXT NOT NULL)'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_integrity_repairs (' +
        'repair_id TEXT PRIMARY KEY, finding_hash TEXT NOT NULL, repaired_revision TEXT NOT NULL, ' +
        'evidence_record_hash TEXT NOT NULL, evidence_json TEXT NOT NULL)'
    );
  }
}

function validateWatermark(value: RuntimeIntegrityWatermark): void {
  if (value.version !== '1.0.0') invalid('Unsupported Runtime integrity watermark version');
  if (!Number.isSafeInteger(value.lastGlobalSequence) || value.lastGlobalSequence < 0) {
    invalid('Runtime integrity watermark sequence must be a non-negative integer');
  }
  nonEmpty(value.projectionRevision, 'projectionRevision');
  nonEmpty(value.schemaCatalogHash, 'schemaCatalogHash');
  nonEmpty(value.streamFingerprintRevision, 'streamFingerprintRevision');
  nonEmpty(value.reportHash, 'reportHash');
  validTimestamp(value.auditedAt, 'auditedAt');
}

function validateRepairEvidence(value: RuntimeIntegrityRepairEvidence): void {
  if (value.version !== '1.0.0') invalid('Unsupported Runtime integrity repair evidence version');
  nonEmpty(value.repairId, 'repairId');
  nonEmpty(value.findingHash, 'findingHash');
  nonEmpty(value.repairedRevision, 'repairedRevision');
  nonEmpty(value.evidenceRef, 'evidenceRef');
  nonEmpty(value.evidenceHash, 'evidenceHash');
  nonEmpty(value.repairedBy, 'repairedBy');
  validTimestamp(value.repairedAt, 'repairedAt');
}

function parseRecord<T>(json: string, expectedHash: string, label: string): T {
  let parsed: T;
  try {
    parsed = JSON.parse(json) as T;
  } catch (cause) {
    throw new FrameworkError({
      code: 'RUNTIME_INTEGRITY_STORE_CORRUPT',
      message: `${label} is not valid JSON`,
      cause,
    });
  }
  if (hashCanonicalJson(parsed) !== expectedHash) {
    throw new FrameworkError({
      code: 'RUNTIME_INTEGRITY_STORE_CORRUPT',
      message: `${label} hash does not match persisted content`,
    });
  }
  return structuredClone(parsed);
}

function nonEmpty(value: string, field: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) invalid(`${field} is required`);
  return value;
}

function validTimestamp(value: string, field: string): void {
  if (!Number.isFinite(Date.parse(value))) invalid(`${field} must be an ISO timestamp`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_REQUEST', message });
}

function conflict(message: string): FrameworkError {
  return new FrameworkError({ code: 'RUNTIME_INTEGRITY_CONFLICT', message });
}

function rollback(db: SqliteDatabaseSync): void {
  try {
    db.exec('ROLLBACK');
  } catch {
    // Preserve the original transactional failure.
  }
}
