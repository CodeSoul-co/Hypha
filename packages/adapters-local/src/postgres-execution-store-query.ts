import { createHash } from 'node:crypto';
import type { ExecutionRecord, ExecutionRecordQuery } from '@codesoul-co/hypha-core';

export const POSTGRES_EXECUTION_RECORD_COLUMNS = `
  records.execution_id,
  records.revision,
  records.status,
  records.tenant_id,
  records.user_id,
  records.workspace_id,
  records.run_id,
  records.provider_id,
  records.created_at,
  records.updated_at,
  records.lease_expires_at,
  records.execution_idempotency_key,
  records.idempotency_fingerprint,
  records.last_fencing_token,
  records.record_json,
  quarantine.reason_code AS quarantine_reason`;

interface PostgresExecutionListCursor {
  version: 1;
  updatedAt: string;
  executionId: string;
  queryHash: string;
}

export interface PostgresExecutionListPlan {
  sql: string;
  parameters: readonly unknown[];
  limit: number;
  queryHash: string;
}

export class PostgresExecutionListCursorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PostgresExecutionListCursorError';
  }
}

export function planPostgresExecutionList(query: ExecutionRecordQuery): PostgresExecutionListPlan {
  const queryHash = executionListQueryHash(query);
  const cursor = query.cursor ? decodeExecutionListCursor(query.cursor) : undefined;
  if (cursor && cursor.queryHash !== queryHash) {
    throw new PostgresExecutionListCursorError(
      'Execution list cursor does not belong to this query.'
    );
  }

  const conditions = ['quarantine.execution_id IS NULL'];
  const parameters: unknown[] = [];
  addFilter(conditions, parameters, 'records.tenant_id', query.tenantId);
  addFilter(conditions, parameters, 'records.user_id', query.userId);
  addFilter(conditions, parameters, 'records.workspace_id', query.workspaceId);
  addFilter(conditions, parameters, 'records.run_id', query.runId);
  addFilter(conditions, parameters, 'records.provider_id', query.providerId);
  if (query.statuses !== undefined) {
    if (query.statuses.length === 0) {
      conditions.push('FALSE');
    } else {
      conditions.push(`records.status = ANY($${parameters.length + 1}::text[])`);
      parameters.push(query.statuses);
    }
  }
  if (query.leaseExpiresBefore) {
    conditions.push(`records.lease_expires_at < $${parameters.length + 1}::timestamptz`);
    parameters.push(query.leaseExpiresBefore);
  }
  if (query.updatedBefore) {
    conditions.push(`records.updated_at < $${parameters.length + 1}::timestamptz`);
    parameters.push(query.updatedBefore);
  }
  if (cursor) {
    const updatedAtParameter = parameters.length + 1;
    const executionIdParameter = parameters.length + 2;
    conditions.push(
      `(records.updated_at < $${updatedAtParameter}::timestamptz OR ` +
        `(records.updated_at = $${updatedAtParameter}::timestamptz AND ` +
        `records.execution_id < $${executionIdParameter}))`
    );
    parameters.push(cursor.updatedAt, cursor.executionId);
  }

  const limit = query.limit ?? 100;
  const limitParameter = parameters.length + 1;
  parameters.push(limit + 1);
  return {
    sql: `
SELECT ${POSTGRES_EXECUTION_RECORD_COLUMNS}
  FROM execution_records AS records
  LEFT JOIN execution_record_quarantine AS quarantine
    ON quarantine.execution_id = records.execution_id
 WHERE ${conditions.join(' AND ')}
 ORDER BY records.updated_at DESC, records.execution_id DESC
 LIMIT $${limitParameter}`,
    parameters,
    limit,
    queryHash,
  };
}

export function nextPostgresExecutionListCursor(
  record: ExecutionRecord,
  queryHash: string
): string {
  const cursor: PostgresExecutionListCursor = {
    version: 1,
    updatedAt: record.updatedAt,
    executionId: record.id,
    queryHash,
  };
  return Buffer.from(JSON.stringify(cursor), 'utf8').toString('base64url');
}

function addFilter(
  conditions: string[],
  parameters: unknown[],
  column: string,
  value: string | undefined
): void {
  if (value === undefined) return;
  conditions.push(`${column} = $${parameters.length + 1}`);
  parameters.push(value);
}

function executionListQueryHash(query: ExecutionRecordQuery): string {
  const normalized = JSON.stringify({
    tenantId: query.tenantId ?? null,
    userId: query.userId ?? null,
    workspaceId: query.workspaceId ?? null,
    runId: query.runId ?? null,
    providerId: query.providerId ?? null,
    statuses: query.statuses === undefined ? null : [...query.statuses].sort(),
    leaseExpiresBefore: query.leaseExpiresBefore ?? null,
    updatedBefore: query.updatedBefore ?? null,
  });
  return `sha256:${createHash('sha256').update(normalized).digest('hex')}`;
}

function decodeExecutionListCursor(value: string): PostgresExecutionListCursor {
  try {
    if (value.length > 2_048 || !/^[A-Za-z0-9_-]+$/u.test(value)) throw new Error();
    const parsed: unknown = JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));
    if (!isRecord(parsed)) throw new Error();
    if (
      Object.keys(parsed).sort().join(',') !==
        ['executionId', 'queryHash', 'updatedAt', 'version'].sort().join(',') ||
      parsed.version !== 1 ||
      typeof parsed.updatedAt !== 'string' ||
      !Number.isFinite(Date.parse(parsed.updatedAt)) ||
      typeof parsed.executionId !== 'string' ||
      !parsed.executionId ||
      typeof parsed.queryHash !== 'string' ||
      !/^sha256:[a-f0-9]{64}$/u.test(parsed.queryHash)
    ) {
      throw new Error();
    }
    return {
      version: 1,
      updatedAt: parsed.updatedAt,
      executionId: parsed.executionId,
      queryHash: parsed.queryHash,
    };
  } catch {
    throw new PostgresExecutionListCursorError('Execution list cursor is invalid.');
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
