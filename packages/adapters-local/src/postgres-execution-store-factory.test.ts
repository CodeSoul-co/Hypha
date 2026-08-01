import { ExecutionStoreRegistry } from '@hypha/core';
import { describe, expect, it } from 'vitest';
import type {
  PostgresExecutionStorePool,
  PostgresExecutionStorePoolClient,
} from './postgres-execution-store-connection';
import {
  POSTGRES_EXECUTION_STORE_ID,
  PostgresExecutionStoreFactory,
} from './postgres-execution-store-factory';
import type { PostgresExecutionStoreSchemaQueryResult } from './postgres-execution-store-schema';

describe('PostgresExecutionStoreFactory', () => {
  it('creates an initialized Store through the Core registry and owns its lifecycle', async () => {
    const pool = new ReadyPool();
    const registry = new ExecutionStoreRegistry();
    registry.register(
      new PostgresExecutionStoreFactory({
        connectionString: 'postgresql://hypha:secret@postgres.invalid/hypha',
        tls: { mode: 'disable' },
        pool,
        now: () => '2026-07-29T00:00:00.000Z',
      })
    );

    expect(registry.list()).toEqual([{ storeId: POSTGRES_EXECUTION_STORE_ID }]);

    const store = await registry.create(POSTGRES_EXECUTION_STORE_ID);
    await expect(store.health()).resolves.toMatchObject({
      status: 'healthy',
      details: {
        provider: 'postgres',
        ready: true,
        schemaVersion: 1,
        quarantinedRecords: 0,
      },
    });

    await store.close?.();
    expect(pool.endCalls).toBe(1);
  });

  it('closes the pool and preserves the initialization error when creation fails', async () => {
    const pool = new FailingPool();
    const factory = new PostgresExecutionStoreFactory({
      connectionString: 'postgresql://hypha:secret@postgres.invalid/hypha',
      tls: { mode: 'disable' },
      pool,
    });

    await expect(factory.create()).rejects.toMatchObject({
      code: 'POSTGRES_EXECUTION_STORE_INITIALIZATION_FAILED',
    });
    expect(pool.endCalls).toBe(1);
  });
});

class ReadyPool implements PostgresExecutionStorePool {
  endCalls = 0;

  async connect(): Promise<PostgresExecutionStorePoolClient> {
    return new ReadyClient();
  }

  async end(): Promise<void> {
    this.endCalls += 1;
  }
}

class ReadyClient implements PostgresExecutionStorePoolClient {
  async query(text: string): Promise<PostgresExecutionStoreSchemaQueryResult> {
    const normalized = text.replace(/\s+/gu, ' ').trim();
    if (
      normalized ===
      'SELECT version FROM hypha_execution_store_schema WHERE singleton_id = TRUE'
    ) {
      return { rows: [{ version: 1 }] };
    }
    if (normalized.includes('(SELECT version FROM hypha_execution_store_schema')) {
      return { rows: [{ schema_version: 1, quarantined_records: 0 }] };
    }
    return { rows: [] };
  }

  release(): void {}
}

class FailingPool implements PostgresExecutionStorePool {
  endCalls = 0;

  async connect(): Promise<PostgresExecutionStorePoolClient> {
    throw new Error('Postgres is unavailable.');
  }

  async end(): Promise<void> {
    this.endCalls += 1;
  }
}
