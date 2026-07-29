import { createHash } from 'node:crypto';
import type {
  ExecutionIdempotencyQuery,
  ExecutionIdempotencyResolution,
  ExecutionRecord,
  ExecutionRecordCreateRequest,
  ExecutionRecordPage,
  ExecutionRecordQuery,
} from '@hypha/core';
import {
  validateExecutionIdempotencyQuery,
  validateExecutionIdempotencyResolution,
  validateExecutionRecord,
  validateExecutionRecordCreateRequest,
  validateExecutionRecordQuery,
} from '@hypha/core';
import {
  PostgresExecutionStoreConnectionError,
  type PostgresExecutionStorePoolClient,
} from './postgres-execution-store-connection';
import {
  nextPostgresExecutionListCursor,
  planPostgresExecutionList,
  POSTGRES_EXECUTION_RECORD_COLUMNS,
  PostgresExecutionListCursorError,
} from './postgres-execution-store-query';

export interface PostgresExecutionStoreTransactionPort {
  transaction<T>(operation: (client: PostgresExecutionStorePoolClient) => Promise<T>): Promise<T>;
}

export type PostgresExecutionStoreFoundationErrorCode =
  | 'EXECUTION_STORE_UNAVAILABLE'
  | 'EXECUTION_STORE_CORRUPT'
  | 'EXECUTION_STORE_CONFLICT'
  | 'EXECUTION_STORE_IDEMPOTENCY_CONFLICT'
  | 'EXECUTION_STORE_INVALID_CURSOR';

export class PostgresExecutionStoreFoundationError extends Error {
  constructor(
    readonly code: PostgresExecutionStoreFoundationErrorCode,
    message: string,
    readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'PostgresExecutionStoreFoundationError';
  }
}

/**
 * Postgres persistence mechanics. This remains internal until every
 * ExecutionStore operation and real Postgres acceptance test is complete.
 */
export class PostgresExecutionStoreFoundation {
  constructor(private readonly connection: PostgresExecutionStoreTransactionPort) {}

  async create(input: ExecutionRecordCreateRequest): Promise<ExecutionRecord> {
    const request = validateExecutionRecordCreateRequest(input);
    const recordJson = JSON.stringify(request.record);
    const recordHash = hash(recordJson);
    const result = await this.writeOperation<RecordLoadResult>(async (client) => {
      const replay = await resolveCreateReplay(client, request, recordHash);
      if (replay) return replay;

      const semantic = await resolveSemanticIdempotency(client, request.record);
      if (semantic) return semantic;

      const inserted = await client.query(INSERT_RECORD_SQL, recordParameters(request.record));
      if (inserted.rows.length === 0) {
        const concurrentReplay = await resolveCreateReplay(client, request, recordHash);
        if (concurrentReplay) return concurrentReplay;
        const concurrentSemantic = await resolveSemanticIdempotency(client, request.record);
        if (concurrentSemantic) return concurrentSemantic;
        if ((await selectRecord(client, request.record.id)).rows.length > 0) {
          throw storeError('EXECUTION_STORE_CONFLICT', 'Execution record already exists.', {
            executionId: request.record.id,
          });
        }
        throw storeError(
          'EXECUTION_STORE_UNAVAILABLE',
          'Postgres Execution store create conflict could not be resolved.'
        );
      }

      if (request.idempotencyKey) {
        const remembered = await client.query(
          `INSERT INTO execution_create_idempotency
             (operation_id, idempotency_key, execution_id, record_hash)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (operation_id, idempotency_key) DO NOTHING
           RETURNING execution_id`,
          [request.operationId, request.idempotencyKey, request.record.id, recordHash]
        );
        if (remembered.rows.length === 0) {
          const concurrentReplay = await resolveCreateReplay(client, request, recordHash);
          if (
            !concurrentReplay ||
            (concurrentReplay.ok && concurrentReplay.value.id !== request.record.id)
          ) {
            throw storeError(
              'EXECUTION_STORE_IDEMPOTENCY_CONFLICT',
              'Execution create idempotency key was reused with different input.',
              { operationId: request.operationId }
            );
          }
          if (!concurrentReplay.ok) return concurrentReplay;
          return concurrentReplay;
        }
      }
      return success(structuredClone(request.record));
    });
    if (!result.ok) throw result.error;
    return result.value;
  }

  async get(executionId: string): Promise<ExecutionRecord | null> {
    if (typeof executionId !== 'string' || executionId.trim() !== executionId || !executionId) {
      throw new TypeError('executionId is required.');
    }
    const result = await this.writeOperation(async (client) => {
      const selected = await selectRecord(client, executionId);
      if (selected.rows.length === 0) return success<ExecutionRecord | null>(null);
      return loadRecord(client, selected.rows[0]!);
    });
    if (!result.ok) throw result.error;
    return result.value;
  }

  async list(input: ExecutionRecordQuery = {}): Promise<ExecutionRecordPage> {
    const query = validateExecutionRecordQuery(input);
    let plan;
    try {
      plan = planPostgresExecutionList(query);
    } catch (error) {
      if (error instanceof PostgresExecutionListCursorError) {
        throw storeError('EXECUTION_STORE_INVALID_CURSOR', error.message);
      }
      throw error;
    }

    const result = await this.writeOperation<OperationResult<ExecutionRecordPage>>(
      async (client) => {
        const selected = await client.query(plan.sql, plan.parameters);
        const records: ExecutionRecord[] = [];
        for (const row of selected.rows.slice(0, plan.limit)) {
          const loaded = await loadRecord(client, row);
          if (!loaded.ok) return loaded;
          records.push(loaded.value);
        }
        if (selected.rows.length <= plan.limit) return success({ records });
        const last = records.at(-1);
        return success({
          records,
          ...(last ? { cursor: nextPostgresExecutionListCursor(last, plan.queryHash) } : undefined),
        });
      }
    );
    if (!result.ok) throw result.error;
    return result.value;
  }

  async resolveIdempotency(
    input: ExecutionIdempotencyQuery
  ): Promise<ExecutionIdempotencyResolution> {
    const query = validateExecutionIdempotencyQuery(input);
    const result = await this.writeOperation<OperationResult<ExecutionIdempotencyResolution>>(
      async (client) => {
        const selected = await client.query(
          `${SELECT_RECORD_COLUMNS}
             FROM execution_records AS records
             LEFT JOIN execution_record_quarantine AS quarantine
               ON quarantine.execution_id = records.execution_id
            WHERE records.tenant_id IS NOT DISTINCT FROM $1
              AND records.user_id = $2
              AND records.workspace_id = $3
              AND records.execution_idempotency_key = $4
              AND records.idempotency_fingerprint IS NOT NULL
            LIMIT 2`,
          [query.tenantId ?? null, query.userId, query.workspaceId, query.idempotencyKey]
        );
        if (selected.rows.length > 1) {
          throw storeError(
            'EXECUTION_STORE_CORRUPT',
            'Postgres Execution store contains duplicate scoped idempotency records.'
          );
        }
        const row = selected.rows[0];
        if (!row) {
          return success(validateExecutionIdempotencyResolution({ status: 'miss' }));
        }
        const loaded = await loadRecord(client, row);
        if (!loaded.ok) return loaded;
        const existingFingerprint = String(row.idempotency_fingerprint);
        return success(
          existingFingerprint === query.fingerprint
            ? validateExecutionIdempotencyResolution({
                status: 'match',
                record: loaded.value,
              })
            : validateExecutionIdempotencyResolution({
                status: 'conflict',
                recordId: loaded.value.id,
                existingFingerprint,
              })
        );
      }
    );
    if (!result.ok) throw result.error;
    return result.value;
  }

  private async writeOperation<T>(
    operation: (client: PostgresExecutionStorePoolClient) => Promise<T>
  ): Promise<T> {
    try {
      return await this.connection.transaction(operation);
    } catch (error) {
      if (error instanceof PostgresExecutionStoreFoundationError) {
        throw error;
      }
      if (error instanceof PostgresExecutionStoreConnectionError) {
        throw storeError('EXECUTION_STORE_UNAVAILABLE', 'Postgres Execution store is unavailable.');
      }
      throw storeError('EXECUTION_STORE_UNAVAILABLE', 'Postgres Execution store write failed.');
    }
  }
}

async function resolveCreateReplay(
  client: PostgresExecutionStorePoolClient,
  request: ExecutionRecordCreateRequest,
  recordHash: string
): Promise<RecordLoadResult | null> {
  if (!request.idempotencyKey) return null;
  const replay = await client.query(
    `SELECT execution_id, record_hash
       FROM execution_create_idempotency
      WHERE operation_id = $1 AND idempotency_key = $2`,
    [request.operationId, request.idempotencyKey]
  );
  const row = replay.rows[0];
  if (!row) return null;
  if (String(row.record_hash) !== recordHash) {
    throw storeError(
      'EXECUTION_STORE_IDEMPOTENCY_CONFLICT',
      'Execution create idempotency key was reused with different input.',
      { operationId: request.operationId }
    );
  }
  const selected = await selectRecord(client, String(row.execution_id));
  if (selected.rows.length === 0) {
    throw storeError(
      'EXECUTION_STORE_CORRUPT',
      'Execution create idempotency record points to a missing Execution.'
    );
  }
  const loaded = await loadRecord(client, selected.rows[0]!);
  return loaded;
}

async function resolveSemanticIdempotency(
  client: PostgresExecutionStorePoolClient,
  requested: ExecutionRecord
): Promise<RecordLoadResult | null> {
  const idempotencyKey = requested.request.idempotencyKey;
  const fingerprint = requested.idempotencyFingerprint;
  if (!idempotencyKey || !fingerprint) return null;
  const selected = await client.query(
    `${SELECT_RECORD_COLUMNS}
       FROM execution_records AS records
       LEFT JOIN execution_record_quarantine AS quarantine
         ON quarantine.execution_id = records.execution_id
      WHERE records.tenant_id IS NOT DISTINCT FROM $1
        AND records.user_id = $2
        AND records.workspace_id = $3
        AND records.execution_idempotency_key = $4`,
    [
      requested.request.tenantId ?? null,
      requested.request.userId,
      requested.request.workspaceId,
      idempotencyKey,
    ]
  );
  const row = selected.rows[0];
  if (!row) return null;
  const loaded = await loadRecord(client, row);
  if (!loaded.ok) return loaded;
  if (loaded.value.idempotencyFingerprint !== fingerprint) {
    throw storeError(
      'EXECUTION_STORE_IDEMPOTENCY_CONFLICT',
      'Execution idempotency key was reused with a different fingerprint.',
      { executionId: loaded.value.id }
    );
  }
  return loaded;
}

async function selectRecord(
  client: PostgresExecutionStorePoolClient,
  executionId: string
): Promise<{ rows: ReadonlyArray<Record<string, unknown>> }> {
  return client.query(
    `${SELECT_RECORD_COLUMNS}
       FROM execution_records AS records
       LEFT JOIN execution_record_quarantine AS quarantine
         ON quarantine.execution_id = records.execution_id
      WHERE records.execution_id = $1`,
    [executionId]
  );
}

type OperationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: PostgresExecutionStoreFoundationError };

type RecordLoadResult = OperationResult<ExecutionRecord>;

async function loadRecord(
  client: PostgresExecutionStorePoolClient,
  row: Record<string, unknown>
): Promise<RecordLoadResult> {
  const executionId = String(row.execution_id);
  if (row.quarantine_reason !== null && row.quarantine_reason !== undefined) {
    return failure(
      storeError('EXECUTION_STORE_CORRUPT', 'Execution record is quarantined.', {
        executionId,
      })
    );
  }
  try {
    return success(parseRecordRow(row));
  } catch {
    await client.query(
      `INSERT INTO execution_record_quarantine
         (execution_id, detected_at, reason_code, record_hash)
       VALUES ($1, CURRENT_TIMESTAMP, $2, $3)
       ON CONFLICT (execution_id) DO NOTHING`,
      [executionId, 'invalid_record', hash(serializedRecord(row.record_json))]
    );
    return failure(
      storeError(
        'EXECUTION_STORE_CORRUPT',
        'Postgres Execution store contains an invalid record.',
        {
          executionId,
        }
      )
    );
  }
}

function parseRecordRow(row: Record<string, unknown>): ExecutionRecord {
  const record = validateExecutionRecord(parseRecordJson(row.record_json));
  const lastFencingToken = nonNegativeSafeInteger(
    Number(row.last_fencing_token),
    'lastFencingToken'
  );
  if (
    record.id !== String(row.execution_id) ||
    record.revision !== nonNegativeSafeInteger(Number(row.revision), 'revision') ||
    record.status !== String(row.status) ||
    (record.request.tenantId ?? null) !== nullableText(row.tenant_id) ||
    record.request.userId !== String(row.user_id) ||
    record.request.workspaceId !== String(row.workspace_id) ||
    (record.request.runId ?? null) !== nullableText(row.run_id) ||
    record.providerId !== String(row.provider_id) ||
    !sameInstant(record.createdAt, row.created_at) ||
    !sameInstant(record.updatedAt, row.updated_at) ||
    (record.request.idempotencyKey ?? null) !== nullableText(row.execution_idempotency_key) ||
    (record.idempotencyFingerprint ?? null) !== nullableText(row.idempotency_fingerprint) ||
    !sameOptionalInstant(record.lease?.expiresAt, row.lease_expires_at) ||
    (record.lease !== undefined && record.lease.fencingToken !== lastFencingToken)
  ) {
    throw new Error('Indexed columns do not match record JSON.');
  }
  return record;
}

function parseRecordJson(value: unknown): unknown {
  return typeof value === 'string' ? JSON.parse(value) : value;
}

function serializedRecord(value: unknown): string {
  return typeof value === 'string' ? value : JSON.stringify(value);
}

function sameInstant(expected: string, persisted: unknown): boolean {
  const expectedTime = Date.parse(expected);
  const persistedTime =
    persisted instanceof Date ? persisted.getTime() : Date.parse(String(persisted));
  return Number.isFinite(expectedTime) && expectedTime === persistedTime;
}

function sameOptionalInstant(expected: string | undefined, persisted: unknown): boolean {
  if (expected === undefined) return persisted === null || persisted === undefined;
  return sameInstant(expected, persisted);
}

function nullableText(value: unknown): string | null {
  return value === null || value === undefined ? null : String(value);
}

function nonNegativeSafeInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative safe integer.`);
  }
  return value;
}

function recordParameters(record: ExecutionRecord): readonly unknown[] {
  return [
    record.id,
    record.revision,
    record.status,
    record.request.tenantId ?? null,
    record.request.userId,
    record.request.workspaceId,
    record.request.runId ?? null,
    record.providerId,
    record.createdAt,
    record.updatedAt,
    record.lease?.expiresAt ?? null,
    record.request.idempotencyKey ?? null,
    record.idempotencyFingerprint ?? null,
    record.lease?.fencingToken ?? 0,
    JSON.stringify(record),
  ];
}

function success<T>(value: T): { ok: true; value: T } {
  return { ok: true, value };
}

function failure(error: PostgresExecutionStoreFoundationError): {
  ok: false;
  error: PostgresExecutionStoreFoundationError;
} {
  return { ok: false, error };
}

function hash(value: string): string {
  return `sha256:${createHash('sha256').update(value).digest('hex')}`;
}

function storeError(
  code: PostgresExecutionStoreFoundationErrorCode,
  message: string,
  details?: Record<string, unknown>
): PostgresExecutionStoreFoundationError {
  return new PostgresExecutionStoreFoundationError(code, message, details);
}

const SELECT_RECORD_COLUMNS = `SELECT ${POSTGRES_EXECUTION_RECORD_COLUMNS}`;

const INSERT_RECORD_SQL = `
INSERT INTO execution_records (
  execution_id,
  revision,
  status,
  tenant_id,
  user_id,
  workspace_id,
  run_id,
  provider_id,
  created_at,
  updated_at,
  lease_expires_at,
  execution_idempotency_key,
  idempotency_fingerprint,
  last_fencing_token,
  record_json
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
ON CONFLICT DO NOTHING
RETURNING execution_id`;
