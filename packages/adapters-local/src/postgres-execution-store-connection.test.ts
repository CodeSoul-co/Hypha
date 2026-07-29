import { describe, expect, it } from 'vitest';
import {
  createPostgresExecutionStorePoolConfig,
  PostgresExecutionStoreConnection,
  PostgresExecutionStoreConnectionError,
  type PostgresExecutionStorePool,
  type PostgresExecutionStorePoolClient,
} from './postgres-execution-store-connection';
import {
  POSTGRES_EXECUTION_STORE_SCHEMA_VERSION,
  type PostgresExecutionStoreSchemaQueryResult,
} from './postgres-execution-store-schema';

const connectionString = 'postgresql://hypha:secret@database.internal:5432/hypha';

describe('PostgresExecutionStoreConnection', () => {
  it('maps bounded connection and verified TLS options to the driver', () => {
    const config = createPostgresExecutionStorePoolConfig({
      connectionString,
      tls: { mode: 'verify-full', ca: 'test-ca' },
      applicationName: 'hypha-execution-test',
      maxConnections: 4,
      connectionTimeoutMs: 5_000,
      idleTimeoutMs: 6_000,
      statementTimeoutMs: 7_000,
    });

    expect(config).toMatchObject({
      connectionString,
      application_name: 'hypha-execution-test',
      max: 4,
      connectionTimeoutMillis: 5_000,
      idleTimeoutMillis: 6_000,
      statement_timeout: 7_000,
      ssl: { rejectUnauthorized: true, ca: 'test-ca' },
    });
  });

  it('initializes the schema and reports validated health evidence', async () => {
    const pool = new FakePool();
    const connection = createConnection(pool);

    await connection.initialize();

    await expect(connection.health()).resolves.toMatchObject({
      status: 'healthy',
      checkedAt: '2026-07-29T00:00:00.000Z',
      details: {
        provider: 'postgres',
        ready: true,
        schemaVersion: POSTGRES_EXECUTION_STORE_SCHEMA_VERSION,
        quarantinedRecords: 0,
      },
    });
    expect(pool.clients).toHaveLength(2);
    expect(pool.clients.every((client) => client.released)).toBe(true);
    expect(pool.clients[0]?.sql()).toContain('SELECT pg_advisory_xact_lock($1)');
    await connection.close();
  });

  it('reports degraded health when corrupt records are quarantined', async () => {
    const pool = new FakePool();
    const connection = createConnection(pool);
    await connection.initialize();
    pool.quarantinedRecords = 2;

    await expect(connection.health()).resolves.toMatchObject({
      status: 'degraded',
      message: 'Postgres Execution store contains quarantined records.',
      details: { quarantinedRecords: 2 },
    });
    await connection.close();
  });

  it('fails initialization closed, releases the client, and does not leak credentials', async () => {
    const pool = new FakePool({ failWhen: (text) => text === 'BEGIN' });
    const connection = createConnection(pool);

    await expect(connection.initialize()).rejects.toEqual(
      new PostgresExecutionStoreConnectionError(
        'POSTGRES_EXECUTION_STORE_INITIALIZATION_FAILED',
        'Postgres Execution store initialization failed.'
      )
    );
    expect(pool.clients[0]?.released).toBe(true);
    expect(pool.endCalls).toBe(1);
    await expect(connection.health()).resolves.toMatchObject({
      status: 'unhealthy',
      details: { provider: 'postgres', ready: false },
    });
    await expect(connection.initialize()).rejects.not.toThrow('secret');
  });

  it('normalizes health failures without exposing driver details', async () => {
    const pool = new FakePool();
    const connection = createConnection(pool);
    await connection.initialize();
    pool.connectFailure = new Error(`could not connect with ${connectionString}`);

    const health = await connection.health();

    expect(health).toMatchObject({
      status: 'unhealthy',
      message: 'Postgres Execution store health check failed.',
    });
    expect(JSON.stringify(health)).not.toContain('secret');
    await connection.close();
  });

  it('closes the pool exactly once and rejects later initialization', async () => {
    const pool = new FakePool();
    const connection = createConnection(pool);
    await connection.initialize();

    await Promise.all([connection.close(), connection.close()]);

    expect(pool.endCalls).toBe(1);
    await expect(connection.initialize()).rejects.toMatchObject({
      code: 'POSTGRES_EXECUTION_STORE_CLOSED',
    });
    await expect(connection.health()).resolves.toMatchObject({
      status: 'unhealthy',
      message: 'Postgres Execution store is closed.',
    });
  });

  it('allows shutdown to retry when the driver initially fails to close', async () => {
    const pool = new FakePool({ endFailures: 1 });
    const connection = createConnection(pool);
    await connection.initialize();

    await expect(connection.close()).rejects.toThrow('pool end failed');
    await expect(connection.close()).resolves.toBeUndefined();

    expect(pool.endCalls).toBe(2);
    await expect(connection.health()).resolves.toMatchObject({
      status: 'unhealthy',
      message: 'Postgres Execution store is closed.',
    });
  });

  it.each([
    ['empty', ''],
    ['whitespace', ` ${connectionString}`],
    ['protocol', 'https://hypha:secret@database.internal/hypha'],
    ['missing user', 'postgresql://database.internal/hypha'],
    ['missing database', 'postgresql://hypha:secret@database.internal'],
    ['fragment', `${connectionString}#secret`],
    ['embedded TLS', `${connectionString}?sslmode=disable`],
  ])('rejects invalid %s connection configuration', (_name, invalidConnectionString) => {
    expect(
      () =>
        new PostgresExecutionStoreConnection({
          connectionString: invalidConnectionString,
          tls: { mode: 'verify-full' },
          pool: new FakePool(),
        })
    ).toThrowError(
      expect.objectContaining({
        code: 'POSTGRES_EXECUTION_STORE_INVALID_CONFIGURATION',
      })
    );
  });

  it('rejects unsafe pool limits and application names', () => {
    expect(
      () =>
        new PostgresExecutionStoreConnection({
          connectionString,
          tls: { mode: 'verify-full' },
          maxConnections: 0,
          pool: new FakePool(),
        })
    ).toThrow('maxConnections');
    expect(
      () =>
        new PostgresExecutionStoreConnection({
          connectionString,
          tls: { mode: 'verify-full' },
          statementTimeoutMs: 0,
          pool: new FakePool(),
        })
    ).toThrow('statementTimeoutMs');
    expect(
      () =>
        new PostgresExecutionStoreConnection({
          connectionString,
          tls: { mode: 'verify-full' },
          applicationName: 'invalid application name',
          pool: new FakePool(),
        })
    ).toThrow('application name');
    expect(
      () =>
        new PostgresExecutionStoreConnection({
          connectionString,
          tls: { mode: 'verify-full', ca: '' },
          pool: new FakePool(),
        })
    ).toThrow('TLS CA');
  });
});

function createConnection(pool: FakePool): PostgresExecutionStoreConnection {
  return new PostgresExecutionStoreConnection({
    connectionString,
    tls: { mode: 'verify-full', ca: 'test-ca' },
    pool,
    now: () => '2026-07-29T00:00:00.000Z',
  });
}

interface FakePoolOptions {
  failWhen?(text: string): boolean;
  endFailures?: number;
}

class FakePool implements PostgresExecutionStorePool {
  readonly clients: FakePoolClient[] = [];
  endCalls = 0;
  quarantinedRecords = 0;
  connectFailure?: Error;

  constructor(private readonly options: FakePoolOptions = {}) {}

  async connect(): Promise<PostgresExecutionStorePoolClient> {
    if (this.connectFailure) throw this.connectFailure;
    const client = new FakePoolClient(this);
    this.clients.push(client);
    return client;
  }

  async end(): Promise<void> {
    this.endCalls += 1;
    if (this.endCalls <= (this.options.endFailures ?? 0)) throw new Error('pool end failed');
  }

  shouldFail(text: string): boolean {
    return this.options.failWhen?.(text) ?? false;
  }
}

class FakePoolClient implements PostgresExecutionStorePoolClient {
  readonly commands: string[] = [];
  released = false;

  constructor(private readonly pool: FakePool) {}

  async query(text: string): Promise<PostgresExecutionStoreSchemaQueryResult> {
    this.commands.push(text);
    if (this.pool.shouldFail(text)) throw new Error('driver detail with secret');
    if (text.startsWith('SELECT version')) return { rows: [] };
    if (text.includes('AS schema_version')) {
      return {
        rows: [
          {
            schema_version: POSTGRES_EXECUTION_STORE_SCHEMA_VERSION,
            quarantined_records: this.pool.quarantinedRecords,
          },
        ],
      };
    }
    return { rows: [] };
  }

  release(): void {
    this.released = true;
  }

  sql(): string {
    return this.commands.join('\n');
  }
}
