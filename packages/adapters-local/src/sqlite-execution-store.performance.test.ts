import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import {
  executionRecordCreateRequestExample,
  type ExecutionRecord,
  type ExecutionRecordQuery,
} from '@codesoul-co/core';
import { afterEach, describe, expect, it } from 'vitest';
import { SQLiteExecutionStore } from './sqlite-execution-store';
import { planSQLiteExecutionList } from './sqlite-execution-store-query';

const LARGE_TABLE_RECORD_COUNT = 10_000;
const QUERY_SAMPLE_COUNT = 100;
const QUERY_WARMUP_COUNT = 10;
const QUERY_PAGE_SIZE = 50;
// These acceptance budgets include shared-runner contention; the query-plan
// assertion below independently prevents a full-scan regression.
const QUERY_P95_BUDGET_MS = 250;
const QUERY_P99_BUDGET_MS = 500;

interface TestSQLiteDatabase {
  exec(sql: string): void;
  prepare(sql: string): {
    all(...params: unknown[]): Record<string, unknown>[];
    run(...params: unknown[]): { changes: number | bigint };
  };
  close(): void;
}

describe('SQLite Execution Store performance acceptance', () => {
  let root: string | undefined;

  afterEach(async () => {
    if (root) {
      await fs.rm(root, { recursive: true, force: true, maxRetries: 3, retryDelay: 50 });
    }
    root = undefined;
  });

  it('keeps indexed 10k-record pagination within explicit p95 and p99 budgets', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-sqlite-performance-'));
    const initialized = new SQLiteExecutionStore({ rootPath: root });
    const filename = initialized.filename;
    await initialized.close();
    seedExecutionRecords(filename, LARGE_TABLE_RECORD_COUNT);

    const query: ExecutionRecordQuery = {
      tenantId: 'tenant.performance',
      userId: 'user.performance',
      workspaceId: 'workspace.performance',
      statuses: ['queued'],
      limit: QUERY_PAGE_SIZE,
    };
    const plan = planSQLiteExecutionList(query);
    const queryPlanDatabase = openTestDatabase(filename);
    let queryPlan: string[];
    try {
      queryPlan = queryPlanDatabase
        .prepare(`EXPLAIN QUERY PLAN ${plan.sql}`)
        .all(...plan.parameters)
        .map((row) => String(row.detail));
    } finally {
      queryPlanDatabase.close();
    }
    expect(
      queryPlan.some((detail) =>
        detail.includes('USING INDEX execution_records_owner_status_updated')
      )
    ).toBe(true);

    const store = new SQLiteExecutionStore({ rootPath: root });
    try {
      for (let index = 0; index < QUERY_WARMUP_COUNT; index += 1) {
        await expect(store.list(query)).resolves.toMatchObject({
          records: expect.any(Array),
        });
      }

      const samples: number[] = [];
      for (let index = 0; index < QUERY_SAMPLE_COUNT; index += 1) {
        const started = performance.now();
        const page = await store.list(query);
        samples.push(performance.now() - started);
        expect(page.records).toHaveLength(QUERY_PAGE_SIZE);
        expect(
          page.records.every(
            (record) =>
              record.status === 'queued' &&
              record.request.tenantId === query.tenantId &&
              record.request.userId === query.userId &&
              record.request.workspaceId === query.workspaceId
          )
        ).toBe(true);
      }

      const p95Ms = percentile(samples, 0.95);
      const p99Ms = percentile(samples, 0.99);
      console.info(
        'sqlite-execution-store-performance',
        JSON.stringify({
          recordCount: LARGE_TABLE_RECORD_COUNT,
          sampleCount: QUERY_SAMPLE_COUNT,
          p95Ms,
          p99Ms,
          budgets: {
            p95Ms: QUERY_P95_BUDGET_MS,
            p99Ms: QUERY_P99_BUDGET_MS,
          },
          queryPlan,
        })
      );
      expect(p95Ms).toBeLessThan(QUERY_P95_BUDGET_MS);
      expect(p99Ms).toBeLessThan(QUERY_P99_BUDGET_MS);
    } finally {
      await store.close();
    }
  }, 30_000);
});

function seedExecutionRecords(filename: string, count: number): void {
  const database = openTestDatabase(filename);
  const insert = database.prepare(
    'INSERT INTO execution_records ' +
      '(execution_id, revision, status, tenant_id, user_id, workspace_id, run_id, ' +
      'provider_id, created_at, updated_at, execution_idempotency_key, ' +
      'idempotency_fingerprint, lease_expires_at, record_json, last_fencing_token) ' +
      'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  );
  try {
    database.exec('BEGIN IMMEDIATE');
    for (let index = 0; index < count; index += 1) {
      const record = performanceRecord(index);
      insert.run(
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
        record.request.idempotencyKey ?? null,
        record.idempotencyFingerprint ?? null,
        null,
        JSON.stringify(record),
        0
      );
    }
    database.exec('COMMIT');
  } catch (error) {
    database.exec('ROLLBACK');
    throw error;
  } finally {
    database.close();
  }
}

function performanceRecord(index: number): ExecutionRecord {
  const targetScope = index % 4 === 0;
  const id = `execution.performance.${String(index).padStart(5, '0')}`;
  const timestamp = new Date(Date.UTC(2026, 6, 16, 0, 0, 0, index)).toISOString();
  const record = structuredClone(executionRecordCreateRequestExample.record);
  record.id = id;
  record.createdAt = timestamp;
  record.updatedAt = timestamp;
  record.providerId = 'provider.performance';
  record.idempotencyFingerprint = `sha256:fingerprint:${id}`;
  record.request.executionId = id;
  record.request.operationId = `operation.command.${id}`;
  record.request.idempotencyKey = `command:${id}`;
  record.request.tenantId = targetScope ? 'tenant.performance' : 'tenant.other';
  record.request.userId = targetScope ? 'user.performance' : `user.other.${index % 32}`;
  record.request.principal.userId = record.request.userId;
  record.request.workspaceId = targetScope
    ? 'workspace.performance'
    : `workspace.other.${index % 16}`;
  record.request.runId = `run.performance.${index % 64}`;
  return record;
}

function percentile(samples: number[], quantile: number): number {
  if (samples.length === 0) throw new TypeError('Performance samples are required.');
  const ordered = [...samples].sort((left, right) => left - right);
  return ordered[Math.ceil(ordered.length * quantile) - 1]!;
}

function openTestDatabase(filename: string): TestSQLiteDatabase {
  try {
    const sqlite = require('node:sqlite') as {
      DatabaseSync: new (databaseFilename: string) => TestSQLiteDatabase;
    };
    return new sqlite.DatabaseSync(filename);
  } catch (nodeSQLiteError) {
    try {
      const BetterSQLite = require('better-sqlite3') as new (
        databaseFilename: string
      ) => TestSQLiteDatabase;
      return new BetterSQLite(filename);
    } catch (betterSQLiteError) {
      throw new AggregateError([nodeSQLiteError, betterSQLiteError]);
    }
  }
}
