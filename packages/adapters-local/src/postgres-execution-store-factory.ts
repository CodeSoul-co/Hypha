import type { ExecutionStore, ExecutionStoreFactory } from '@codesoul-co/hypha-core';
import {
  PostgresExecutionStoreConnection,
  type PostgresExecutionStoreConnectionOptions,
} from './postgres-execution-store-connection';
import { PostgresExecutionStoreFoundation } from './postgres-execution-store-foundation';

export const POSTGRES_EXECUTION_STORE_ID = 'execution-store.postgres';

export type PostgresExecutionStoreFactoryOptions = PostgresExecutionStoreConnectionOptions;

/**
 * Composition adapter for the accepted Postgres Execution Store. Registration
 * remains explicit: callers add this factory to the Core ExecutionStoreRegistry.
 */
export class PostgresExecutionStoreFactory implements ExecutionStoreFactory {
  readonly storeId = POSTGRES_EXECUTION_STORE_ID;

  constructor(private readonly options: PostgresExecutionStoreFactoryOptions) {}

  async create(): Promise<ExecutionStore> {
    const connection = new PostgresExecutionStoreConnection(this.options);
    try {
      await connection.initialize();
      return new PostgresExecutionStoreFoundation(connection);
    } catch (error) {
      await connection.close().catch(() => undefined);
      throw error;
    }
  }
}
