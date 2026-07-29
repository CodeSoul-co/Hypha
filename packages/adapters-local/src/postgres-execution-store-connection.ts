import type { ProviderHealth } from '@hypha/core';
import { Pool, type PoolClient, type PoolConfig } from 'pg';
import {
  migratePostgresExecutionStore,
  POSTGRES_EXECUTION_STORE_SCHEMA_VERSION,
  PostgresExecutionStoreSchemaVersionError,
  type PostgresExecutionStoreSchemaClient,
  type PostgresExecutionStoreSchemaQueryResult,
} from './postgres-execution-store-schema';

const DEFAULT_APPLICATION_NAME = 'hypha-execution-store';
const DEFAULT_MAX_CONNECTIONS = 10;
const DEFAULT_CONNECTION_TIMEOUT_MS = 10_000;
const DEFAULT_IDLE_TIMEOUT_MS = 30_000;
const DEFAULT_STATEMENT_TIMEOUT_MS = 30_000;
const MAX_TIMEOUT_MS = 300_000;
const MAX_CONNECTIONS = 100;
const FORBIDDEN_CONNECTION_PARAMETERS = ['sslmode', 'sslcert', 'sslkey', 'sslrootcert'];

export type PostgresExecutionStoreTlsOptions =
  | { mode: 'disable' }
  | { mode: 'verify-full'; ca?: string };

export interface PostgresExecutionStoreConnectionOptions {
  connectionString: string;
  tls: PostgresExecutionStoreTlsOptions;
  applicationName?: string;
  maxConnections?: number;
  connectionTimeoutMs?: number;
  idleTimeoutMs?: number;
  statementTimeoutMs?: number;
  pool?: PostgresExecutionStorePool;
  now?: () => string;
}

export interface PostgresExecutionStorePoolClient extends PostgresExecutionStoreSchemaClient {
  release(): void;
}

export interface PostgresExecutionStorePool {
  connect(): Promise<PostgresExecutionStorePoolClient>;
  end(): Promise<void>;
}

export type PostgresExecutionStoreConnectionErrorCode =
  | 'POSTGRES_EXECUTION_STORE_INVALID_CONFIGURATION'
  | 'POSTGRES_EXECUTION_STORE_INITIALIZATION_FAILED'
  | 'POSTGRES_EXECUTION_STORE_CLOSED';

export class PostgresExecutionStoreConnectionError extends Error {
  constructor(
    readonly code: PostgresExecutionStoreConnectionErrorCode,
    message: string
  ) {
    super(message);
    this.name = 'PostgresExecutionStoreConnectionError';
  }
}

/**
 * Owns the concrete Postgres pool lifecycle without exposing credentials or
 * driver-specific objects to Core. Store CRUD is added on top of this boundary.
 */
export class PostgresExecutionStoreConnection {
  private readonly pool: PostgresExecutionStorePool;
  private readonly now: () => string;
  private state: 'new' | 'initializing' | 'ready' | 'failed' | 'closed' = 'new';
  private initialization?: Promise<void>;
  private closing?: Promise<void>;
  private poolEnded = false;

  constructor(options: PostgresExecutionStoreConnectionOptions) {
    const poolConfig = createPostgresExecutionStorePoolConfig(options);
    this.pool = options.pool ?? new NodePostgresPool(poolConfig);
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async initialize(): Promise<void> {
    if (this.state === 'closed') throw closedError();
    if (this.state === 'ready') return;
    if (this.state === 'failed') {
      throw new PostgresExecutionStoreConnectionError(
        'POSTGRES_EXECUTION_STORE_INITIALIZATION_FAILED',
        'Postgres Execution store initialization previously failed.'
      );
    }
    if (!this.initialization) {
      this.state = 'initializing';
      this.initialization = this.initializeOnce();
    }
    return this.initialization;
  }

  async health(): Promise<ProviderHealth> {
    const startedAt = Date.now();
    if (this.state !== 'ready') {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        latencyMs: Date.now() - startedAt,
        message:
          this.state === 'closed'
            ? 'Postgres Execution store is closed.'
            : 'Postgres Execution store is not ready.',
        details: { provider: 'postgres', ready: false },
      };
    }

    try {
      const client = await this.pool.connect();
      try {
        const evidence = await inspectStore(client);
        const hasQuarantinedRecords = evidence.quarantinedRecords > 0;
        return {
          status: hasQuarantinedRecords ? 'degraded' : 'healthy',
          checkedAt: this.now(),
          latencyMs: Date.now() - startedAt,
          message: hasQuarantinedRecords
            ? 'Postgres Execution store contains quarantined records.'
            : 'Postgres Execution store is available.',
          details: {
            provider: 'postgres',
            ready: true,
            schemaVersion: evidence.schemaVersion,
            quarantinedRecords: evidence.quarantinedRecords,
          },
        };
      } finally {
        client.release();
      }
    } catch {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        latencyMs: Date.now() - startedAt,
        message: 'Postgres Execution store health check failed.',
        details: { provider: 'postgres', ready: false },
      };
    }
  }

  async withClient<T>(
    operation: (client: PostgresExecutionStorePoolClient) => Promise<T>
  ): Promise<T> {
    this.assertReady();
    const client = await this.pool.connect();
    try {
      return await operation(client);
    } finally {
      client.release();
    }
  }

  async transaction<T>(
    operation: (client: PostgresExecutionStorePoolClient) => Promise<T>
  ): Promise<T> {
    return this.withClient(async (client) => {
      await client.query('BEGIN');
      try {
        const result = await operation(client);
        await client.query('COMMIT');
        return result;
      } catch (error) {
        try {
          await client.query('ROLLBACK');
        } catch {
          // Preserve the original transaction failure.
        }
        throw error;
      }
    });
  }

  async close(): Promise<void> {
    if (this.closing) return this.closing;
    const attempt = this.closeOnce();
    this.closing = attempt;
    try {
      await attempt;
    } finally {
      if (this.state !== 'closed') this.closing = undefined;
    }
  }

  private async initializeOnce(): Promise<void> {
    try {
      const client = await this.pool.connect();
      try {
        await migratePostgresExecutionStore(client);
        const evidence = await inspectStore(client);
        if (evidence.schemaVersion !== POSTGRES_EXECUTION_STORE_SCHEMA_VERSION) {
          throw new PostgresExecutionStoreSchemaVersionError(
            evidence.schemaVersion,
            POSTGRES_EXECUTION_STORE_SCHEMA_VERSION
          );
        }
      } finally {
        client.release();
      }
      this.state = 'ready';
    } catch (error) {
      this.state = 'failed';
      await this.endPool().catch(() => undefined);
      if (error instanceof PostgresExecutionStoreSchemaVersionError) throw error;
      throw new PostgresExecutionStoreConnectionError(
        'POSTGRES_EXECUTION_STORE_INITIALIZATION_FAILED',
        'Postgres Execution store initialization failed.'
      );
    }
  }

  private async closeOnce(): Promise<void> {
    await this.initialization?.catch(() => undefined);
    await this.endPool();
    this.state = 'closed';
  }

  private async endPool(): Promise<void> {
    if (this.poolEnded) return;
    await this.pool.end();
    this.poolEnded = true;
  }

  private assertReady(): void {
    if (this.state === 'closed') throw closedError();
    if (this.state !== 'ready') {
      throw new PostgresExecutionStoreConnectionError(
        'POSTGRES_EXECUTION_STORE_INITIALIZATION_FAILED',
        'Postgres Execution store is not ready.'
      );
    }
  }
}

export function createPostgresExecutionStorePoolConfig(
  options: PostgresExecutionStoreConnectionOptions
): PoolConfig {
  const connectionString = requiredConnectionString(options.connectionString);
  const parsed = parseConnectionString(connectionString);
  for (const parameter of FORBIDDEN_CONNECTION_PARAMETERS) {
    if (parsed.searchParams.has(parameter)) {
      throw invalidConfiguration(
        'Postgres TLS options must not be embedded in the connection string.'
      );
    }
  }
  if (!parsed.hostname || !parsed.username || parsed.pathname.length <= 1) {
    throw invalidConfiguration('Postgres connection string must include host, user, and database.');
  }
  if (parsed.hash) {
    throw invalidConfiguration('Postgres connection string must not contain a fragment.');
  }

  const applicationName = options.applicationName ?? DEFAULT_APPLICATION_NAME;
  if (!/^[A-Za-z0-9._-]{1,64}$/u.test(applicationName)) {
    throw invalidConfiguration('Postgres application name is invalid.');
  }

  return {
    connectionString,
    application_name: applicationName,
    max: boundedInteger(
      options.maxConnections ?? DEFAULT_MAX_CONNECTIONS,
      'maxConnections',
      1,
      MAX_CONNECTIONS
    ),
    connectionTimeoutMillis: boundedInteger(
      options.connectionTimeoutMs ?? DEFAULT_CONNECTION_TIMEOUT_MS,
      'connectionTimeoutMs',
      1,
      MAX_TIMEOUT_MS
    ),
    idleTimeoutMillis: boundedInteger(
      options.idleTimeoutMs ?? DEFAULT_IDLE_TIMEOUT_MS,
      'idleTimeoutMs',
      1,
      MAX_TIMEOUT_MS
    ),
    statement_timeout: boundedInteger(
      options.statementTimeoutMs ?? DEFAULT_STATEMENT_TIMEOUT_MS,
      'statementTimeoutMs',
      1,
      MAX_TIMEOUT_MS
    ),
    ssl: validatedTls(options.tls),
  };
}

function validatedTls(tls: PostgresExecutionStoreTlsOptions): PoolConfig['ssl'] {
  if (!tls || (tls.mode !== 'disable' && tls.mode !== 'verify-full')) {
    throw invalidConfiguration('Postgres TLS mode is invalid.');
  }
  if (tls.mode === 'disable') return false;
  if (tls.ca !== undefined && (tls.ca.length === 0 || tls.ca.trim() !== tls.ca)) {
    throw invalidConfiguration('Postgres TLS CA is invalid.');
  }
  return {
    rejectUnauthorized: true,
    ...(tls.ca ? { ca: tls.ca } : {}),
  };
}

function requiredConnectionString(value: string): string {
  if (typeof value !== 'string' || value.length === 0 || value.trim() !== value) {
    throw invalidConfiguration('Postgres connection string is required.');
  }
  return value;
}

function parseConnectionString(value: string): URL {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'postgres:' && parsed.protocol !== 'postgresql:') {
      throw invalidConfiguration('Postgres connection string protocol is invalid.');
    }
    return parsed;
  } catch (error) {
    if (error instanceof PostgresExecutionStoreConnectionError) throw error;
    throw invalidConfiguration('Postgres connection string is invalid.');
  }
}

function boundedInteger(value: number, name: string, minimum: number, maximum: number): number {
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw invalidConfiguration(`Postgres ${name} is invalid.`);
  }
  return value;
}

function invalidConfiguration(message: string): PostgresExecutionStoreConnectionError {
  return new PostgresExecutionStoreConnectionError(
    'POSTGRES_EXECUTION_STORE_INVALID_CONFIGURATION',
    message
  );
}

function closedError(): PostgresExecutionStoreConnectionError {
  return new PostgresExecutionStoreConnectionError(
    'POSTGRES_EXECUTION_STORE_CLOSED',
    'Postgres Execution store is closed.'
  );
}

async function inspectStore(
  client: PostgresExecutionStoreSchemaClient
): Promise<{ schemaVersion: number; quarantinedRecords: number }> {
  const result = await client.query(
    `SELECT
       (SELECT version FROM hypha_execution_store_schema WHERE singleton_id = TRUE)
         AS schema_version,
       (SELECT COUNT(*) FROM execution_record_quarantine) AS quarantined_records`
  );
  const row = result.rows[0];
  const schemaVersion = Number(row?.schema_version);
  const quarantinedRecords = Number(row?.quarantined_records);
  if (
    !Number.isInteger(schemaVersion) ||
    schemaVersion < 0 ||
    !Number.isInteger(quarantinedRecords) ||
    quarantinedRecords < 0
  ) {
    throw new Error('Postgres Execution store health evidence is invalid.');
  }
  return { schemaVersion, quarantinedRecords };
}

class NodePostgresPool implements PostgresExecutionStorePool {
  private readonly pool: Pool;

  constructor(config: PoolConfig) {
    this.pool = new Pool(config);
  }

  async connect(): Promise<PostgresExecutionStorePoolClient> {
    return new NodePostgresPoolClient(await this.pool.connect());
  }

  async end(): Promise<void> {
    await this.pool.end();
  }
}

class NodePostgresPoolClient implements PostgresExecutionStorePoolClient {
  constructor(private readonly client: PoolClient) {}

  async query(
    text: string,
    values?: readonly unknown[]
  ): Promise<PostgresExecutionStoreSchemaQueryResult> {
    const result = await this.client.query<Record<string, unknown>>(
      text,
      values ? [...values] : undefined
    );
    return { rows: result.rows };
  }

  release(): void {
    this.client.release();
  }
}
