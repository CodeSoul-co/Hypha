import type { ExecutionStore } from '@hypha/core';
import {
  SQLiteExecutionStoreFoundation,
  type SQLiteExecutionStoreFoundationErrorCode,
  type SQLiteExecutionStoreFoundationOptions,
} from './sqlite-execution-store-foundation';

export type SQLiteExecutionStoreOptions = SQLiteExecutionStoreFoundationOptions;
export type SQLiteExecutionStoreErrorCode = SQLiteExecutionStoreFoundationErrorCode;
export {
  SQLiteExecutionStoreFoundationError as SQLiteExecutionStoreError,
} from './sqlite-execution-store-foundation';

/**
 * Public durable local ExecutionStore adapter.
 *
 * Every persisted read is validated by the foundation before it crosses the
 * provider boundary. CAS, idempotency, lease, fencing, migration, and close
 * semantics are therefore exposed through the stable Core ExecutionStore port.
 */
export class SQLiteExecutionStore
  extends SQLiteExecutionStoreFoundation
  implements ExecutionStore {}
