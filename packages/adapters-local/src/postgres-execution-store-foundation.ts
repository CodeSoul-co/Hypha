import { createHash } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import type {
  ExecutionIdempotencyQuery,
  ExecutionIdempotencyResolution,
  ExecutionLeaseAcquireRequest,
  ExecutionLeaseGuard,
  ExecutionLeaseRenewRequest,
  ExecutionRecord,
  ExecutionRecordCompareAndSetRequest,
  ExecutionRecordCreateRequest,
  ExecutionRecordPage,
  ExecutionRecordQuery,
} from '@hypha/core';
import {
  validateExecutionIdempotencyQuery,
  validateExecutionIdempotencyResolution,
  validateExecutionLeaseAcquireRequest,
  validateExecutionLeaseRenewRequest,
  validateExecutionRecord,
  validateExecutionRecordCompareAndSetRequest,
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
  | 'EXECUTION_STORE_INVALID_CURSOR'
  | 'EXECUTION_STORE_NOT_FOUND'
  | 'EXECUTION_STORE_REVISION_CONFLICT'
  | 'EXECUTION_STORE_FENCING_REJECTED'
  | 'EXECUTION_STORE_TERMINAL'
  | 'EXECUTION_STORE_LEASE_HELD'
  | 'EXECUTION_STORE_LEASE_ID_CONFLICT'
  | 'EXECUTION_STORE_LEASE_LOST';

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

  async compareAndSet(input: ExecutionRecordCompareAndSetRequest): Promise<ExecutionRecord> {
    const request = validateExecutionRecordCompareAndSetRequest(input);
    const requestHash = hash(JSON.stringify(request));
    const result = await this.writeOperation<RecordLoadResult>(async (client) => {
      if (request.idempotencyKey) {
        await lockMutationIdempotency(client, request.operationId, request.idempotencyKey);
        const replay = await resolveMutationReplay(client, request, requestHash);
        if (replay) return replay;
      }

      const selected = await selectRecordForUpdate(client, request.executionId);
      if (selected.rows.length === 0) {
        throw storeError('EXECUTION_STORE_NOT_FOUND', 'Execution record does not exist.', {
          executionId: request.executionId,
        });
      }
      const loaded = await loadRecord(client, selected.rows[0]!);
      if (!loaded.ok) return loaded;
      const current = loaded.value;
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
      assertRecordIdentityContinuity(current, request.next);
      assertTerminalReceiptContinuity(current, request.next);

      const lastFencingToken = nonNegativeSafeInteger(
        Number(selected.rows[0]!.last_fencing_token),
        'lastFencingToken'
      );
      await replaceRecord(
        client,
        request.next,
        request.expectedRevision,
        lastFencingToken,
        lastFencingToken,
        'Execution record changed during compare-and-set.'
      );
      await rememberMutation(client, request, requestHash, request.next);
      return success(structuredClone(request.next));
    });
    if (!result.ok) throw result.error;
    return result.value;
  }

  async acquireLease(input: ExecutionLeaseAcquireRequest): Promise<ExecutionRecord> {
    const request = validateExecutionLeaseAcquireRequest(input);
    const requestHash = hash(JSON.stringify(request));
    const result = await this.writeOperation<RecordLoadResult>(async (client) => {
      if (request.idempotencyKey) {
        await lockMutationIdempotency(client, request.operationId, request.idempotencyKey);
        const replay = await resolveMutationReplay(client, request, requestHash);
        if (replay) return replay;
      }

      const selected = await selectRecordForUpdate(client, request.executionId);
      if (selected.rows.length === 0) {
        throw storeError('EXECUTION_STORE_NOT_FOUND', 'Execution record does not exist.', {
          executionId: request.executionId,
        });
      }
      const loaded = await loadRecord(client, selected.rows[0]!);
      if (!loaded.ok) return loaded;
      const current = loaded.value;
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
      const existingLease = await client.query(
        `SELECT lease_id
           FROM execution_lease_history
          WHERE lease_id = $1`,
        [request.requestedLeaseId]
      );
      if (existingLease.rows.length > 0) {
        throw storeError(
          'EXECUTION_STORE_LEASE_ID_CONFLICT',
          'Execution lease id has already been used.',
          { executionId: request.executionId, leaseId: request.requestedLeaseId }
        );
      }

      const previousFencingToken = nonNegativeSafeInteger(
        Number(selected.rows[0]!.last_fencing_token),
        'lastFencingToken'
      );
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

      if (current.lease) {
        const closed = await client.query(
          `UPDATE execution_lease_history
              SET released_at = $1,
                  release_reason = $2
            WHERE lease_id = $3
              AND execution_id = $4
              AND fencing_token = $5
              AND released_at IS NULL
          RETURNING lease_id`,
          [
            request.acquiredAt,
            'expired_and_replaced',
            current.lease.id,
            current.lease.executionId,
            current.lease.fencingToken,
          ]
        );
        if (closed.rows.length !== 1) {
          throw storeError(
            'EXECUTION_STORE_CORRUPT',
            'Execution lease history is missing or already closed.',
            { executionId: request.executionId, leaseId: current.lease.id }
          );
        }
      }
      const insertedLease = await client.query(
        `INSERT INTO execution_lease_history
           (lease_id, execution_id, fencing_token, owner_id, acquired_at)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (lease_id) DO NOTHING
         RETURNING lease_id`,
        [
          request.requestedLeaseId,
          request.executionId,
          fencingToken,
          request.ownerId,
          request.acquiredAt,
        ]
      );
      if (insertedLease.rows.length !== 1) {
        throw storeError(
          'EXECUTION_STORE_LEASE_ID_CONFLICT',
          'Execution lease id has already been used.',
          { executionId: request.executionId, leaseId: request.requestedLeaseId }
        );
      }
      await replaceRecord(
        client,
        next,
        request.expectedRevision,
        previousFencingToken,
        fencingToken,
        'Execution record changed during lease acquisition.'
      );
      await rememberMutation(client, request, requestHash, next);
      return success(structuredClone(next));
    });
    if (!result.ok) throw result.error;
    return result.value;
  }

  async renewLease(input: ExecutionLeaseRenewRequest): Promise<ExecutionRecord> {
    const request = validateExecutionLeaseRenewRequest(input);
    const requestHash = hash(JSON.stringify(request));
    const result = await this.writeOperation<RecordLoadResult>(async (client) => {
      if (request.idempotencyKey) {
        await lockMutationIdempotency(client, request.operationId, request.idempotencyKey);
        const replay = await resolveMutationReplay(client, request, requestHash);
        if (replay) return replay;
      }

      const selected = await selectRecordForUpdate(client, request.executionId);
      if (selected.rows.length === 0) {
        throw storeError('EXECUTION_STORE_NOT_FOUND', 'Execution record does not exist.', {
          executionId: request.executionId,
        });
      }
      const loaded = await loadRecord(client, selected.rows[0]!);
      if (!loaded.ok) return loaded;
      const current = loaded.value;
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
      const fencingToken = nonNegativeSafeInteger(
        Number(selected.rows[0]!.last_fencing_token),
        'lastFencingToken'
      );
      await replaceRecord(
        client,
        next,
        request.expectedRevision,
        fencingToken,
        fencingToken,
        'Execution record changed during lease renewal.'
      );
      await rememberMutation(client, request, requestHash, next);
      return success(structuredClone(next));
    });
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

async function lockMutationIdempotency(
  client: PostgresExecutionStorePoolClient,
  operationId: string,
  idempotencyKey: string
): Promise<void> {
  await client.query('SELECT pg_advisory_xact_lock(hashtext($1), hashtext($2))', [
    operationId,
    idempotencyKey,
  ]);
}

async function resolveMutationReplay(
  client: PostgresExecutionStorePoolClient,
  request: MutationRequestIdentity,
  requestHash: string
): Promise<RecordLoadResult | null> {
  if (!request.idempotencyKey) return null;
  const selected = await client.query(
    `SELECT execution_id, request_hash, result_json
       FROM execution_mutation_idempotency
      WHERE operation_id = $1 AND idempotency_key = $2`,
    [request.operationId, request.idempotencyKey]
  );
  const row = selected.rows[0];
  if (!row) return null;
  if (
    String(row.request_hash) !== requestHash ||
    String(row.execution_id) !== request.executionId
  ) {
    throw storeError(
      'EXECUTION_STORE_IDEMPOTENCY_CONFLICT',
      'Execution mutation idempotency key was reused with different input.',
      { executionId: request.executionId }
    );
  }
  try {
    const record = validateExecutionRecord(parseRecordJson(row.result_json));
    if (record.id !== request.executionId) throw new Error();
    return success(record);
  } catch {
    throw storeError(
      'EXECUTION_STORE_CORRUPT',
      'Execution mutation idempotency record contains an invalid result.',
      { executionId: request.executionId }
    );
  }
}

interface MutationRequestIdentity {
  operationId: string;
  executionId: string;
  idempotencyKey?: string;
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

async function selectRecordForUpdate(
  client: PostgresExecutionStorePoolClient,
  executionId: string
): Promise<{ rows: ReadonlyArray<Record<string, unknown>> }> {
  return client.query(
    `${SELECT_RECORD_COLUMNS}
       FROM execution_records AS records
       LEFT JOIN execution_record_quarantine AS quarantine
         ON quarantine.execution_id = records.execution_id
      WHERE records.execution_id = $1
      FOR UPDATE OF records`,
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

function assertRecordIdentityContinuity(current: ExecutionRecord, next: ExecutionRecord): void {
  if (
    current.createdAt !== next.createdAt ||
    current.idempotencyFingerprint !== next.idempotencyFingerprint ||
    !isDeepStrictEqual(current.request, next.request)
  ) {
    throw storeError(
      'EXECUTION_STORE_CONFLICT',
      'Execution request identity and idempotency evidence are immutable.',
      { executionId: current.id }
    );
  }
}

function assertTerminalReceiptContinuity(current: ExecutionRecord, next: ExecutionRecord): void {
  if (
    current.terminalReceipt &&
    !isDeepStrictEqual(current.terminalReceipt, next.terminalReceipt)
  ) {
    throw storeError(
      'EXECUTION_STORE_CONFLICT',
      'Provider terminal receipt checkpoint is immutable.',
      { executionId: current.id }
    );
  }
}

function assertLeaseGuard(
  lease: NonNullable<ExecutionRecord['lease']>,
  guard: ExecutionLeaseGuard,
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

async function replaceRecord(
  client: PostgresExecutionStorePoolClient,
  next: ExecutionRecord,
  expectedRevision: number,
  expectedFencingToken: number,
  nextFencingToken: number,
  conflictMessage: string
): Promise<void> {
  const updated = await client.query(UPDATE_RECORD_SQL, [
    next.revision,
    next.status,
    next.request.tenantId ?? null,
    next.request.userId,
    next.request.workspaceId,
    next.request.runId ?? null,
    next.providerId,
    next.createdAt,
    next.updatedAt,
    next.lease?.expiresAt ?? null,
    next.request.idempotencyKey ?? null,
    next.idempotencyFingerprint ?? null,
    nextFencingToken,
    JSON.stringify(next),
    next.id,
    expectedRevision,
    expectedFencingToken,
  ]);
  if (updated.rows.length !== 1) {
    throw storeError('EXECUTION_STORE_REVISION_CONFLICT', conflictMessage, {
      executionId: next.id,
      expectedRevision,
    });
  }
}

async function rememberMutation(
  client: PostgresExecutionStorePoolClient,
  request: MutationRequestIdentity,
  requestHash: string,
  result: ExecutionRecord
): Promise<void> {
  if (!request.idempotencyKey) return;
  const remembered = await client.query(
    `INSERT INTO execution_mutation_idempotency
       (operation_id, idempotency_key, execution_id, request_hash, result_json)
     VALUES ($1, $2, $3, $4, $5::jsonb)
     ON CONFLICT (operation_id, idempotency_key) DO NOTHING
     RETURNING execution_id`,
    [
      request.operationId,
      request.idempotencyKey,
      request.executionId,
      requestHash,
      JSON.stringify(result),
    ]
  );
  if (remembered.rows.length !== 1) {
    throw storeError(
      'EXECUTION_STORE_IDEMPOTENCY_CONFLICT',
      'Execution mutation idempotency key was reused with different input.',
      { executionId: request.executionId }
    );
  }
}

function leaseExpiry(acquiredAt: string, ttlMs: number): string {
  const expiry = Date.parse(acquiredAt) + ttlMs;
  const date = new Date(expiry);
  if (!Number.isSafeInteger(expiry) || Number.isNaN(date.getTime())) {
    throw storeError('EXECUTION_STORE_CONFLICT', 'Lease expiry must be a safe timestamp.');
  }
  return date.toISOString();
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

const TERMINAL_STATUSES = new Set<ExecutionRecord['status']>([
  'cancelled',
  'completed',
  'failed',
  'timed_out',
  'oom_killed',
  'resource_exceeded',
  'quarantined',
]);

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

const UPDATE_RECORD_SQL = `
UPDATE execution_records
   SET revision = $1,
       status = $2,
       tenant_id = $3,
       user_id = $4,
       workspace_id = $5,
       run_id = $6,
       provider_id = $7,
       created_at = $8,
       updated_at = $9,
       lease_expires_at = $10,
       execution_idempotency_key = $11,
       idempotency_fingerprint = $12,
       last_fencing_token = $13,
       record_json = $14::jsonb
 WHERE execution_id = $15
   AND revision = $16
   AND last_fencing_token = $17
   AND NOT EXISTS (
     SELECT 1
       FROM execution_record_quarantine AS quarantine
      WHERE quarantine.execution_id = execution_records.execution_id
   )
RETURNING execution_id`;
