import { FrameworkError, hashCanonicalJson } from '@hypha/core';
import {
  validateReActContinuationCheckpoint,
  type ReActContinuationCheckpoint,
  type ReActContinuationCheckpointPutResult,
  type ReActContinuationCheckpointStore,
} from '@hypha/kernel';
import fs from 'fs';
import path from 'path';
import { loadSqlite, type SqliteDatabaseSync } from './sqlite-driver';

export interface SQLiteReActContinuationCheckpointStoreOptions {
  filename: string;
  maxIdempotencyRecordsPerCheckpoint?: number;
  maxCheckpointBytes?: number;
}

/**
 * Local durable materialization for resumable ReAct work.
 *
 * Runtime Events remain the execution truth. This store contains only bounded,
 * schema-validated continuation material and rejects stale checkpoint writers.
 */
export class SQLiteReActContinuationCheckpointStore implements ReActContinuationCheckpointStore {
  private readonly db: SqliteDatabaseSync;
  private readonly maxIdempotencyRecordsPerCheckpoint: number;
  private readonly maxCheckpointBytes: number;

  constructor(options: SQLiteReActContinuationCheckpointStoreOptions) {
    if (!options.filename.trim()) invalid('ReAct checkpoint filename is required');
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    const sqlite = loadSqlite(true);
    if (!sqlite) throw new Error('SQLite driver is unavailable');
    this.db = new sqlite.DatabaseSync(options.filename);
    this.maxIdempotencyRecordsPerCheckpoint = positiveInteger(
      options.maxIdempotencyRecordsPerCheckpoint ?? 256,
      'maxIdempotencyRecordsPerCheckpoint'
    );
    this.maxCheckpointBytes = positiveInteger(
      options.maxCheckpointBytes ?? 4 * 1024 * 1024,
      'maxCheckpointBytes'
    );
    this.initialize();
  }

  async put(
    input: ReActContinuationCheckpoint,
    idempotencyKey: string
  ): Promise<ReActContinuationCheckpointPutResult> {
    const checkpoint = validateReActContinuationCheckpoint(input);
    const checkpointJson = serializeCheckpoint(checkpoint, this.maxCheckpointBytes);
    nonEmpty(idempotencyKey, 'ReAct checkpoint idempotencyKey');
    const requestHash = hashCanonicalJson(checkpoint);
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const prior = this.db
        .prepare(
          'SELECT request_hash, result_json FROM runtime_react_checkpoint_idempotency ' +
            'WHERE run_id = ? AND step_id = ? AND idempotency_key = ?'
        )
        .get(checkpoint.runId, checkpoint.stepId, idempotencyKey);
      if (prior) {
        if (String(prior.request_hash) !== requestHash) {
          conflict('ReAct checkpoint idempotency key was reused with different input', checkpoint);
        }
        const result = parsePutResult(
          prior.result_json,
          checkpoint.runId,
          checkpoint.stepId,
          this.maxCheckpointBytes
        );
        this.db.exec('COMMIT');
        return structuredClone({ ...result, reused: true });
      }

      const currentRow = this.db
        .prepare(
          'SELECT record_json, record_hash FROM runtime_react_checkpoints ' +
            'WHERE run_id = ? AND step_id = ?'
        )
        .get(checkpoint.runId, checkpoint.stepId);
      if (currentRow) {
        const current = parseCheckpoint(
          currentRow,
          checkpoint.runId,
          checkpoint.stepId,
          this.maxCheckpointBytes
        );
        assertScope(current, checkpoint.scopeHash);
        if (checkpoint.stepSequence < current.stepSequence) {
          conflict('ReAct checkpoint stepSequence cannot move backwards', checkpoint, {
            currentStepSequence: current.stepSequence,
          });
        }
        if (
          checkpoint.stepSequence === current.stepSequence &&
          requestHash !== String(currentRow.record_hash)
        ) {
          conflict('ReAct checkpoint stepSequence already contains different content', checkpoint);
        }
        if (checkpoint.stepSequence === current.stepSequence) {
          const reused = { checkpoint: current, reused: true };
          this.writeIdempotency(checkpoint, idempotencyKey, requestHash, reused);
          this.db.exec('COMMIT');
          return structuredClone(reused);
        }
      }

      this.db
        .prepare(
          'INSERT INTO runtime_react_checkpoints ' +
            '(run_id, step_id, step_sequence, record_hash, updated_at, record_json) ' +
            'VALUES (?, ?, ?, ?, ?, ?) ' +
            'ON CONFLICT(run_id, step_id) DO UPDATE SET ' +
            'step_sequence = excluded.step_sequence, record_hash = excluded.record_hash, ' +
            'updated_at = excluded.updated_at, record_json = excluded.record_json'
        )
        .run(
          checkpoint.runId,
          checkpoint.stepId,
          checkpoint.stepSequence,
          requestHash,
          checkpoint.updatedAt,
          checkpointJson
        );
      const result = { checkpoint: structuredClone(checkpoint), reused: false };
      this.writeIdempotency(checkpoint, idempotencyKey, requestHash, result);
      this.db.exec('COMMIT');
      return result;
    } catch (error) {
      rollback(this.db);
      if (error instanceof FrameworkError) throw error;
      throw checkpointFailure('SQLite ReAct checkpoint transaction failed', checkpoint, error);
    }
  }

  async get(
    runId: string,
    stepId: string,
    expectedScopeHash: string
  ): Promise<ReActContinuationCheckpoint | null> {
    nonEmpty(runId, 'ReAct checkpoint runId');
    nonEmpty(stepId, 'ReAct checkpoint stepId');
    validHash(expectedScopeHash, 'ReAct checkpoint expectedScopeHash');
    const row = this.db
      .prepare(
        'SELECT record_json, record_hash FROM runtime_react_checkpoints ' +
          'WHERE run_id = ? AND step_id = ?'
      )
      .get(runId, stepId);
    if (!row) return null;
    const checkpoint = parseCheckpoint(row, runId, stepId, this.maxCheckpointBytes);
    assertScope(checkpoint, expectedScopeHash);
    return checkpoint;
  }

  async delete(
    runId: string,
    stepId: string,
    expectedScopeHash: string,
    expectedStepSequence?: number
  ): Promise<boolean> {
    nonEmpty(runId, 'ReAct checkpoint runId');
    nonEmpty(stepId, 'ReAct checkpoint stepId');
    validHash(expectedScopeHash, 'ReAct checkpoint expectedScopeHash');
    if (
      expectedStepSequence !== undefined &&
      (!Number.isInteger(expectedStepSequence) || expectedStepSequence < 0)
    ) {
      invalid('ReAct checkpoint expectedStepSequence must be a non-negative integer');
    }
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const row = this.db
        .prepare(
          'SELECT record_json, record_hash FROM runtime_react_checkpoints ' +
            'WHERE run_id = ? AND step_id = ?'
        )
        .get(runId, stepId);
      if (!row) {
        this.db.exec('COMMIT');
        return false;
      }
      const checkpoint = parseCheckpoint(row, runId, stepId, this.maxCheckpointBytes);
      assertScope(checkpoint, expectedScopeHash);
      if (expectedStepSequence !== undefined && checkpoint.stepSequence !== expectedStepSequence) {
        conflict('ReAct checkpoint delete expectedStepSequence does not match', checkpoint, {
          expectedStepSequence,
        });
      }
      this.db
        .prepare('DELETE FROM runtime_react_checkpoints WHERE run_id = ? AND step_id = ?')
        .run(runId, stepId);
      this.db
        .prepare(
          'DELETE FROM runtime_react_checkpoint_idempotency WHERE run_id = ? AND step_id = ?'
        )
        .run(runId, stepId);
      this.db.exec('COMMIT');
      return true;
    } catch (error) {
      rollback(this.db);
      if (error instanceof FrameworkError) throw error;
      throw new FrameworkError({
        code: 'RUNTIME_CHECKPOINT_FAILED',
        message: 'SQLite ReAct checkpoint delete failed',
        context: { runId, stepId },
        cause: error,
      });
    }
  }

  close(): void {
    this.db.close?.();
  }

  private writeIdempotency(
    checkpoint: ReActContinuationCheckpoint,
    idempotencyKey: string,
    requestHash: string,
    result: ReActContinuationCheckpointPutResult
  ): void {
    this.db
      .prepare(
        'INSERT INTO runtime_react_checkpoint_idempotency ' +
          '(run_id, step_id, idempotency_key, request_hash, result_json) VALUES (?, ?, ?, ?, ?)'
      )
      .run(
        checkpoint.runId,
        checkpoint.stepId,
        idempotencyKey,
        requestHash,
        JSON.stringify(result)
      );
    this.db
      .prepare(
        'DELETE FROM runtime_react_checkpoint_idempotency ' +
          'WHERE run_id = ? AND step_id = ? AND rowid NOT IN (' +
          'SELECT rowid FROM runtime_react_checkpoint_idempotency ' +
          'WHERE run_id = ? AND step_id = ? ORDER BY rowid DESC LIMIT ?)'
      )
      .run(
        checkpoint.runId,
        checkpoint.stepId,
        checkpoint.runId,
        checkpoint.stepId,
        this.maxIdempotencyRecordsPerCheckpoint
      );
  }

  private initialize(): void {
    this.db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON');
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_react_checkpoints (' +
        'run_id TEXT NOT NULL, step_id TEXT NOT NULL, step_sequence INTEGER NOT NULL, ' +
        'record_hash TEXT NOT NULL, updated_at TEXT NOT NULL, record_json TEXT NOT NULL, ' +
        'PRIMARY KEY(run_id, step_id))'
    );
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS runtime_react_checkpoint_idempotency (' +
        'run_id TEXT NOT NULL, step_id TEXT NOT NULL, idempotency_key TEXT NOT NULL, ' +
        'request_hash TEXT NOT NULL, result_json TEXT NOT NULL, ' +
        'PRIMARY KEY(run_id, step_id, idempotency_key))'
    );
    this.db.exec(
      'CREATE INDEX IF NOT EXISTS idx_runtime_react_checkpoints_updated ' +
        'ON runtime_react_checkpoints(updated_at)'
    );
  }
}

function parseCheckpoint(
  row: Record<string, unknown>,
  expectedRunId: string,
  expectedStepId: string,
  maxCheckpointBytes: number
): ReActContinuationCheckpoint {
  try {
    const recordJson = String(row.record_json);
    assertStoredCheckpointBytes(recordJson, maxCheckpointBytes, expectedRunId, expectedStepId);
    const checkpoint = validateReActContinuationCheckpoint(JSON.parse(recordJson));
    if (checkpoint.runId !== expectedRunId || checkpoint.stepId !== expectedStepId) {
      throw new FrameworkError({
        code: 'RUNTIME_CHECKPOINT_FAILED',
        message: 'Persisted ReAct checkpoint scope does not match its storage key',
        context: { expectedRunId, expectedStepId },
      });
    }
    if (hashCanonicalJson(checkpoint) !== String(row.record_hash)) {
      throw new FrameworkError({
        code: 'RUNTIME_CHECKPOINT_FAILED',
        message: 'Persisted ReAct checkpoint hash does not match its content',
        context: { runId: expectedRunId, stepId: expectedStepId },
      });
    }
    return structuredClone(checkpoint);
  } catch (error) {
    if (error instanceof FrameworkError) throw error;
    throw new FrameworkError({
      code: 'RUNTIME_CHECKPOINT_FAILED',
      message: 'Persisted ReAct checkpoint is invalid',
      context: { runId: expectedRunId, stepId: expectedStepId },
      cause: error,
    });
  }
}

function parsePutResult(
  input: unknown,
  expectedRunId: string,
  expectedStepId: string,
  maxCheckpointBytes: number
): ReActContinuationCheckpointPutResult {
  try {
    const parsed = JSON.parse(String(input)) as ReActContinuationCheckpointPutResult;
    if (!parsed || typeof parsed !== 'object' || typeof parsed.reused !== 'boolean') {
      throw new Error('ReAct checkpoint idempotency result is malformed');
    }
    return {
      checkpoint: parseCheckpoint(
        {
          record_json: JSON.stringify(parsed.checkpoint),
          record_hash: hashCanonicalJson(parsed.checkpoint),
        },
        expectedRunId,
        expectedStepId,
        maxCheckpointBytes
      ),
      reused: parsed.reused,
    };
  } catch (error) {
    if (error instanceof FrameworkError) throw error;
    throw new FrameworkError({
      code: 'RUNTIME_CHECKPOINT_FAILED',
      message: 'Persisted ReAct checkpoint idempotency result is invalid',
      context: { runId: expectedRunId, stepId: expectedStepId },
      cause: error,
    });
  }
}

function serializeCheckpoint(
  checkpoint: ReActContinuationCheckpoint,
  maxCheckpointBytes: number
): string {
  const serialized = JSON.stringify(checkpoint);
  const observedBytes = Buffer.byteLength(serialized, 'utf8');
  if (observedBytes > maxCheckpointBytes) {
    throw new FrameworkError({
      code: 'RUNTIME_RESOURCE_EXHAUSTED',
      message: `ReAct checkpoint exceeds ${maxCheckpointBytes} bytes`,
      context: { maxCheckpointBytes, observedBytes },
    });
  }
  return serialized;
}

function assertStoredCheckpointBytes(
  serialized: string,
  maxCheckpointBytes: number,
  runId: string,
  stepId: string
): void {
  const observedBytes = Buffer.byteLength(serialized, 'utf8');
  if (observedBytes > maxCheckpointBytes) {
    throw new FrameworkError({
      code: 'RUNTIME_CHECKPOINT_FAILED',
      message: 'Persisted ReAct checkpoint exceeds the configured byte limit',
      context: { runId, stepId, maxCheckpointBytes, observedBytes },
    });
  }
}

function nonEmpty(value: string, label: string): void {
  if (typeof value !== 'string' || value.trim().length === 0) invalid(`${label} is required`);
}

function validHash(value: string, label: string): void {
  if (!/^sha256:[a-f0-9]{64}$/u.test(value)) invalid(`${label} must be a sha256 digest`);
}

function assertScope(checkpoint: ReActContinuationCheckpoint, expectedScopeHash: string): void {
  if (checkpoint.scopeHash !== expectedScopeHash) {
    throw new FrameworkError({
      code: 'RUNTIME_CHECKPOINT_FAILED',
      message: 'Persisted ReAct checkpoint scope does not match the requested scope',
      context: { runId: checkpoint.runId, stepId: checkpoint.stepId },
    });
  }
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isInteger(value) || value < 1) invalid(`${label} must be a positive integer`);
  return value;
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(
  message: string,
  checkpoint: ReActContinuationCheckpoint,
  context: Record<string, unknown> = {}
): never {
  throw new FrameworkError({
    code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    message,
    context: {
      runId: checkpoint.runId,
      stepId: checkpoint.stepId,
      stepSequence: checkpoint.stepSequence,
      ...context,
    },
  });
}

function checkpointFailure(
  message: string,
  checkpoint: ReActContinuationCheckpoint,
  cause: unknown
): FrameworkError {
  return new FrameworkError({
    code: 'RUNTIME_CHECKPOINT_FAILED',
    message,
    context: { runId: checkpoint.runId, stepId: checkpoint.stepId },
    cause,
  });
}

function rollback(db: SqliteDatabaseSync): void {
  try {
    db.exec('ROLLBACK');
  } catch {
    // Work may fail before SQLite opens a transaction.
  }
}
