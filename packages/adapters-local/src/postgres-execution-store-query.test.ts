import { executionRecordCreateRequestExample } from '@codesoul-co/hypha-core';
import { describe, expect, it } from 'vitest';
import {
  nextPostgresExecutionListCursor,
  planPostgresExecutionList,
  PostgresExecutionListCursorError,
} from './postgres-execution-store-query';

describe('Postgres Execution list query planning', () => {
  it('builds a parameterized query for every supported filter', () => {
    const plan = planPostgresExecutionList({
      tenantId: 'tenant.query',
      userId: 'user.query',
      workspaceId: 'workspace.query',
      runId: 'run.query',
      providerId: 'provider.query',
      statuses: ['queued', 'starting'],
      leaseExpiresBefore: '2026-07-29T03:00:00.000Z',
      updatedBefore: '2026-07-29T02:00:00.000Z',
      limit: 5,
    });

    expect(plan.sql).toContain('quarantine.execution_id IS NULL');
    expect(plan.sql).toContain('records.tenant_id = $1');
    expect(plan.sql).toContain('records.status = ANY($6::text[])');
    expect(plan.sql).toContain('records.lease_expires_at < $7::timestamptz');
    expect(plan.sql).toContain('records.updated_at < $8::timestamptz');
    expect(plan.sql).toContain('LIMIT $9');
    expect(plan.parameters).toEqual([
      'tenant.query',
      'user.query',
      'workspace.query',
      'run.query',
      'provider.query',
      ['queued', 'starting'],
      '2026-07-29T03:00:00.000Z',
      '2026-07-29T02:00:00.000Z',
      6,
    ]);
  });

  it('uses a stable timestamp and execution identity cursor without interpolating values', () => {
    const record = structuredClone(executionRecordCreateRequestExample.record);
    const cursor = nextPostgresExecutionListCursor(record, planPostgresExecutionList({}).queryHash);
    const plan = planPostgresExecutionList({ cursor, limit: 2 });

    expect(plan.sql).toContain('records.updated_at < $1::timestamptz');
    expect(plan.sql).toContain('records.execution_id < $2');
    expect(plan.sql).toContain('LIMIT $3');
    expect(plan.sql).not.toContain(record.id);
    expect(plan.parameters).toEqual([record.updatedAt, record.id, 3]);
  });

  it('accepts reordered status filters because they have the same query identity', () => {
    const record = structuredClone(executionRecordCreateRequestExample.record);
    const first = planPostgresExecutionList({ statuses: ['queued', 'starting'] });
    const cursor = nextPostgresExecutionListCursor(record, first.queryHash);

    expect(() =>
      planPostgresExecutionList({ statuses: ['starting', 'queued'], cursor })
    ).not.toThrow();
  });

  it('rejects malformed cursors and cursors bound to another query', () => {
    expect(() => planPostgresExecutionList({ cursor: 'not+a+cursor' })).toThrow(
      PostgresExecutionListCursorError
    );

    const record = structuredClone(executionRecordCreateRequestExample.record);
    const first = planPostgresExecutionList({ userId: 'user.first' });
    const cursor = nextPostgresExecutionListCursor(record, first.queryHash);
    expect(() => planPostgresExecutionList({ userId: 'user.second', cursor })).toThrowError(
      'Execution list cursor does not belong to this query.'
    );
  });

  it('produces an empty result plan for an explicitly empty status filter', () => {
    const plan = planPostgresExecutionList({ statuses: [] });

    expect(plan.sql).toContain('FALSE');
    expect(plan.parameters).toEqual([101]);
  });
});
