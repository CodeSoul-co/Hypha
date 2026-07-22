export interface SQLiteExecutionStoreSchemaDatabase {
  exec(sql: string): void;
  prepare(sql: string): {
    get(...params: unknown[]): Record<string, unknown> | undefined;
  };
}

export const SQLITE_EXECUTION_STORE_SCHEMA_VERSION = 3;

export class SQLiteExecutionStoreSchemaVersionError extends Error {
  constructor(
    readonly current: number,
    readonly supported: number
  ) {
    super('SQLite Execution store schema version is not supported.');
    this.name = 'SQLiteExecutionStoreSchemaVersionError';
  }
}

export function migrateSQLiteExecutionStore(database: SQLiteExecutionStoreSchemaDatabase): void {
  const current = Number(database.prepare('PRAGMA user_version').get()?.user_version ?? 0);
  if (current === SQLITE_EXECUTION_STORE_SCHEMA_VERSION) return;
  if (
    !Number.isInteger(current) ||
    current < 0 ||
    current > SQLITE_EXECUTION_STORE_SCHEMA_VERSION
  ) {
    throw new SQLiteExecutionStoreSchemaVersionError(
      current,
      SQLITE_EXECUTION_STORE_SCHEMA_VERSION
    );
  }

  database.exec('BEGIN IMMEDIATE');
  try {
    if (current === 0) database.exec(SCHEMA_V1_SQL);
    if (current <= 1) database.exec(SCHEMA_V2_SQL);
    if (current <= 2) database.exec(SCHEMA_V3_SQL);
    database.exec(`PRAGMA user_version = ${SQLITE_EXECUTION_STORE_SCHEMA_VERSION}`);
    database.exec('COMMIT');
  } catch (error) {
    try {
      database.exec('ROLLBACK');
    } catch {
      // Preserve the original migration error.
    }
    throw error;
  }
}

const SCHEMA_V1_SQL = `
CREATE TABLE IF NOT EXISTS execution_records (
  execution_id TEXT PRIMARY KEY,
  revision INTEGER NOT NULL CHECK (revision >= 0),
  status TEXT NOT NULL,
  tenant_id TEXT,
  user_id TEXT NOT NULL,
  workspace_id TEXT NOT NULL,
  run_id TEXT,
  provider_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  record_json TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS execution_records_owner_status_updated
  ON execution_records (tenant_id, user_id, workspace_id, status, updated_at, execution_id);
CREATE INDEX IF NOT EXISTS execution_records_provider_updated
  ON execution_records (provider_id, updated_at, execution_id);
CREATE TABLE IF NOT EXISTS execution_create_idempotency (
  operation_id TEXT NOT NULL,
  idempotency_key TEXT NOT NULL,
  execution_id TEXT NOT NULL,
  record_hash TEXT NOT NULL,
  PRIMARY KEY (operation_id, idempotency_key),
  FOREIGN KEY (execution_id) REFERENCES execution_records(execution_id)
);
`;

const SCHEMA_V2_SQL = `
CREATE TABLE IF NOT EXISTS execution_mutation_idempotency (
  operation_id TEXT NOT NULL,
  idempotency_key TEXT NOT NULL,
  execution_id TEXT NOT NULL,
  request_hash TEXT NOT NULL,
  result_json TEXT NOT NULL,
  PRIMARY KEY (operation_id, idempotency_key),
  FOREIGN KEY (execution_id) REFERENCES execution_records(execution_id)
);
`;

const SCHEMA_V3_SQL = `
ALTER TABLE execution_records
  ADD COLUMN last_fencing_token INTEGER NOT NULL DEFAULT 0 CHECK (last_fencing_token >= 0);
CREATE TABLE execution_lease_history (
  lease_id TEXT PRIMARY KEY,
  execution_id TEXT NOT NULL,
  fencing_token INTEGER NOT NULL CHECK (fencing_token > 0),
  owner_id TEXT NOT NULL,
  acquired_at TEXT NOT NULL,
  UNIQUE (execution_id, fencing_token),
  FOREIGN KEY (execution_id) REFERENCES execution_records(execution_id)
);
`;
