import { createHash } from 'node:crypto';
import type { ExecutionRecord, ExecutionRecordQuery } from '@hypha/core';

export const SQLITE_EXECUTION_RECORD_COLUMNS =
  'execution_id, revision, status, tenant_id, user_id, workspace_id, run_id, ' +
  'provider_id, created_at, updated_at, lease_expires_at, record_json, last_fencing_token';

interface ExecutionListCursor {
  version: 1;
  updatedAt: string;
  executionId: string;
  queryHash: string;
}

export interface SQLiteExecutionListPlan {
  sql: string;
  parameters: unknown[];
  limit: number;
  queryHash: string;
}

export class SQLiteExecutionListCursorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SQLiteExecutionListCursorError';
  }
}

export function planSQLiteExecutionList(query: ExecutionRecordQuery): SQLiteExecutionListPlan {
  const queryHash = executionListQueryHash(query);
  const cursor = query.cursor ? decodeExecutionListCursor(query.cursor) : undefined;
  if (cursor && cursor.queryHash !== queryHash) {
    throw new SQLiteExecutionListCursorError(
      'Execution list cursor does not belong to this query.'
    );
  }
  const conditions: string[] = [];
  const parameters: unknown[] = [];
  addFilter(conditions, parameters, 'tenant_id', query.tenantId);
  addFilter(conditions, parameters, 'user_id', query.userId);
  addFilter(conditions, parameters, 'workspace_id', query.workspaceId);
  addFilter(conditions, parameters, 'run_id', query.runId);
  addFilter(conditions, parameters, 'provider_id', query.providerId);
  if (query.statuses !== undefined) {
    if (query.statuses.length === 0) {
      conditions.push('0 = 1');
    } else {
      conditions.push(`status IN (${query.statuses.map(() => '?').join(', ')})`);
      parameters.push(...query.statuses);
    }
  }
  if (query.leaseExpiresBefore) {
    conditions.push('julianday(lease_expires_at) < julianday(?)');
    parameters.push(query.leaseExpiresBefore);
  }
  if (query.updatedBefore) {
    conditions.push('julianday(updated_at) < julianday(?)');
    parameters.push(query.updatedBefore);
  }
  if (cursor) {
    conditions.push(
      '(julianday(updated_at) < julianday(?) OR ' +
        '(julianday(updated_at) = julianday(?) AND execution_id < ?))'
    );
    parameters.push(cursor.updatedAt, cursor.updatedAt, cursor.executionId);
  }
  const limit = query.limit ?? 100;
  const where = conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : '';
  return {
    sql:
      `SELECT ${SQLITE_EXECUTION_RECORD_COLUMNS} FROM execution_records${where} ` +
      'ORDER BY julianday(updated_at) DESC, execution_id DESC LIMIT ?',
    parameters: [...parameters, limit + 1],
    limit,
    queryHash,
  };
}

export function nextSQLiteExecutionListCursor(record: ExecutionRecord, queryHash: string): string {
  const cursor: ExecutionListCursor = {
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
  conditions.push(`${column} = ?`);
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

function decodeExecutionListCursor(value: string): ExecutionListCursor {
  try {
    if (value.length > 2_048 || !/^[A-Za-z0-9_-]+$/u.test(value)) throw new Error();
    const parsed = JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as unknown;
    if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') throw new Error();
    const cursor = parsed as Record<string, unknown>;
    if (
      Object.keys(cursor).sort().join(',') !==
        ['executionId', 'queryHash', 'updatedAt', 'version'].sort().join(',') ||
      cursor.version !== 1 ||
      typeof cursor.updatedAt !== 'string' ||
      !Number.isFinite(Date.parse(cursor.updatedAt)) ||
      typeof cursor.executionId !== 'string' ||
      !cursor.executionId ||
      typeof cursor.queryHash !== 'string' ||
      !/^sha256:[a-f0-9]{64}$/u.test(cursor.queryHash)
    ) {
      throw new Error();
    }
    return cursor as unknown as ExecutionListCursor;
  } catch {
    throw new SQLiteExecutionListCursorError('Execution list cursor is invalid.');
  }
}
