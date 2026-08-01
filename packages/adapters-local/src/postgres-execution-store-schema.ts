export interface PostgresExecutionStoreSchemaQueryResult {
  rows: ReadonlyArray<Record<string, unknown>>;
}

export interface PostgresExecutionStoreSchemaClient {
  query(
    text: string,
    values?: readonly unknown[]
  ): Promise<PostgresExecutionStoreSchemaQueryResult>;
}

export const POSTGRES_EXECUTION_STORE_SCHEMA_VERSION = 1;

const POSTGRES_EXECUTION_STORE_MIGRATION_LOCK_ID = 4_859_704_321;

export class PostgresExecutionStoreSchemaVersionError extends Error {
  constructor(
    readonly current: number,
    readonly supported: number
  ) {
    super('Postgres Execution store schema version is not supported.');
    this.name = 'PostgresExecutionStoreSchemaVersionError';
  }
}

/**
 * Runs the Postgres schema migration under both a transaction and a
 * transaction-scoped advisory lock. This keeps concurrent Store startups from
 * applying the same migration independently.
 */
export async function migratePostgresExecutionStore(
  client: PostgresExecutionStoreSchemaClient
): Promise<void> {
  await client.query('BEGIN');
  try {
    await client.query('SELECT pg_advisory_xact_lock($1)', [
      POSTGRES_EXECUTION_STORE_MIGRATION_LOCK_ID,
    ]);
    await client.query(SCHEMA_VERSION_TABLE_SQL);

    const current = await readSchemaVersion(client);
    assertSupportedSchemaVersion(current);
    if (current < 1) {
      for (const statement of SCHEMA_V1_STATEMENTS) await client.query(statement);
      await client.query(
        `INSERT INTO hypha_execution_store_schema (singleton_id, version)
         VALUES (TRUE, $1)
         ON CONFLICT (singleton_id) DO UPDATE SET version = EXCLUDED.version`,
        [POSTGRES_EXECUTION_STORE_SCHEMA_VERSION]
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
      // Preserve the migration failure rather than replacing it with cleanup failure.
    }
    throw error;
  }
}

async function readSchemaVersion(client: PostgresExecutionStoreSchemaClient): Promise<number> {
  const result = await client.query(
    'SELECT version FROM hypha_execution_store_schema WHERE singleton_id = TRUE'
  );
  if (result.rows.length === 0) return 0;
  const current = Number(result.rows[0]?.version);
  if (!Number.isInteger(current) || current < 0) {
    throw new PostgresExecutionStoreSchemaVersionError(
      current,
      POSTGRES_EXECUTION_STORE_SCHEMA_VERSION
    );
  }
  return current;
}

function assertSupportedSchemaVersion(current: number): void {
  if (current > POSTGRES_EXECUTION_STORE_SCHEMA_VERSION) {
    throw new PostgresExecutionStoreSchemaVersionError(
      current,
      POSTGRES_EXECUTION_STORE_SCHEMA_VERSION
    );
  }
}

const SCHEMA_VERSION_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS hypha_execution_store_schema (
  singleton_id BOOLEAN PRIMARY KEY DEFAULT TRUE CHECK (singleton_id),
  version INTEGER NOT NULL CHECK (version >= 0)
)`;

const SCHEMA_V1_STATEMENTS = [
  `
CREATE TABLE execution_records (
  execution_id TEXT PRIMARY KEY,
  revision BIGINT NOT NULL CHECK (revision >= 0),
  status TEXT NOT NULL,
  tenant_id TEXT,
  user_id TEXT NOT NULL,
  workspace_id TEXT NOT NULL,
  run_id TEXT,
  provider_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  lease_expires_at TIMESTAMPTZ,
  execution_idempotency_key TEXT,
  idempotency_fingerprint TEXT,
  last_fencing_token BIGINT NOT NULL DEFAULT 0 CHECK (last_fencing_token >= 0),
  record_json JSONB NOT NULL CHECK (jsonb_typeof(record_json) = 'object')
)`,
  `
CREATE INDEX execution_records_owner_status_updated
  ON execution_records (tenant_id, user_id, workspace_id, status, updated_at, execution_id)`,
  `
CREATE INDEX execution_records_provider_updated
  ON execution_records (provider_id, updated_at, execution_id)`,
  `
CREATE INDEX execution_records_lease_expiry
  ON execution_records (lease_expires_at, updated_at, execution_id)`,
  `
CREATE UNIQUE INDEX execution_records_scoped_idempotency
  ON execution_records (
    COALESCE(tenant_id, ''), user_id, workspace_id, execution_idempotency_key
  )
  WHERE execution_idempotency_key IS NOT NULL AND idempotency_fingerprint IS NOT NULL`,
  `
CREATE TABLE execution_create_idempotency (
  operation_id TEXT NOT NULL,
  idempotency_key TEXT NOT NULL,
  execution_id TEXT NOT NULL REFERENCES execution_records(execution_id),
  record_hash TEXT NOT NULL,
  PRIMARY KEY (operation_id, idempotency_key)
)`,
  `
CREATE TABLE execution_mutation_idempotency (
  operation_id TEXT NOT NULL,
  idempotency_key TEXT NOT NULL,
  execution_id TEXT NOT NULL REFERENCES execution_records(execution_id),
  request_hash TEXT NOT NULL,
  result_json JSONB NOT NULL CHECK (jsonb_typeof(result_json) = 'object'),
  PRIMARY KEY (operation_id, idempotency_key)
)`,
  `
CREATE TABLE execution_lease_history (
  lease_id TEXT PRIMARY KEY,
  execution_id TEXT NOT NULL REFERENCES execution_records(execution_id),
  fencing_token BIGINT NOT NULL CHECK (fencing_token > 0),
  owner_id TEXT NOT NULL,
  acquired_at TIMESTAMPTZ NOT NULL,
  released_at TIMESTAMPTZ,
  release_reason TEXT,
  UNIQUE (execution_id, fencing_token)
)`,
  `
CREATE TABLE execution_record_quarantine (
  execution_id TEXT PRIMARY KEY,
  detected_at TIMESTAMPTZ NOT NULL,
  reason_code TEXT NOT NULL,
  record_hash TEXT NOT NULL
)`,
] as const;
