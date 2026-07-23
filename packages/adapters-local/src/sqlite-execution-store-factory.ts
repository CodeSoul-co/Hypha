import type { ExecutionStore, ExecutionStoreFactory } from '@hypha/core';
import {
  SQLiteExecutionStore,
  type SQLiteExecutionStoreOptions,
} from './sqlite-execution-store';

export const SQLITE_EXECUTION_STORE_ID = 'execution-store.sqlite';

export class SQLiteExecutionStoreFactory implements ExecutionStoreFactory {
  readonly storeId = SQLITE_EXECUTION_STORE_ID;

  constructor(private readonly options: SQLiteExecutionStoreOptions) {}

  async create(): Promise<ExecutionStore> {
    return new SQLiteExecutionStore(this.options);
  }
}
