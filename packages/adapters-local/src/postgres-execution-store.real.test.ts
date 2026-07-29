import { randomUUID } from 'node:crypto';
import { createServer } from 'node:net';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { DockerCliTransport, type DockerCliResult } from './docker-cli-transport';
import { PostgresExecutionStoreConnection } from './postgres-execution-store-connection';
import { PostgresExecutionStoreFoundation } from './postgres-execution-store-foundation';
import { POSTGRES_EXECUTION_STORE_SCHEMA_VERSION } from './postgres-execution-store-schema';

const dockerPath = process.env.HYPHA_REAL_DOCKER_PATH ?? 'docker';
const postgresImage = process.env.HYPHA_REAL_POSTGRES_IMAGE ?? 'postgres:16-alpine';
const postgresDigest =
  process.env.HYPHA_REAL_POSTGRES_DIGEST ??
  'sha256:57c72fd2a128e416c7fcc499958864df5301e940bca0a56f58fddf30ffc07777';
const database = 'hypha_execution';
const username = 'hypha_execution';
const password = 'hypha-execution-real-test';
const containerName = `hypha-postgres-real-${randomUUID().replaceAll('-', '').slice(0, 12)}`;
const docker = new DockerCliTransport({ dockerPath });
let port = 0;
let containerCreated = false;

beforeAll(async () => {
  const image = `${postgresImage}@${postgresDigest}`;
  port = await findAvailableLoopbackPort();
  await requireDocker(['image', 'inspect', image]);
  await requireDocker([
    'run',
    '-d',
    '--name',
    containerName,
    '-p',
    `127.0.0.1:${port}:5432`,
    '-e',
    `POSTGRES_DB=${database}`,
    '-e',
    `POSTGRES_USER=${username}`,
    '-e',
    `POSTGRES_PASSWORD=${password}`,
    '--label',
    'hypha.execution.managed=true',
    '--label',
    'hypha.acceptance=postgres-execution-store',
    image,
  ]);
  containerCreated = true;
  await waitForPostgres();
}, 60_000);

afterAll(async () => {
  const removal = await runDocker(['rm', '-f', containerName]);
  if (containerCreated) {
    expect(removal).toMatchObject({ outcome: 'exited', exitCode: 0 });
    const inspection = await runDocker(['inspect', containerName]);
    expect(inspection.exitCode).not.toBe(0);
  }
}, 60_000);

describe('PostgresExecutionStoreFoundation real database', () => {
  it('migrates an empty database, reports healthy, and closes cleanly', async () => {
    const connection = new PostgresExecutionStoreConnection({
      connectionString: `postgresql://${username}:${password}@127.0.0.1:${port}/${database}`,
      tls: { mode: 'disable' },
      applicationName: 'hypha-postgres-real-test',
      maxConnections: 2,
      connectionTimeoutMs: 5_000,
      idleTimeoutMs: 5_000,
      statementTimeoutMs: 5_000,
    });
    const store = new PostgresExecutionStoreFoundation(connection);

    try {
      await connection.initialize();
      await expect(store.health()).resolves.toMatchObject({
        status: 'healthy',
        details: {
          provider: 'postgres',
          ready: true,
          schemaVersion: POSTGRES_EXECUTION_STORE_SCHEMA_VERSION,
          quarantinedRecords: 0,
        },
      });

      const schemaEvidence = await connection.withClient((client) =>
        client.query(
          `SELECT
             (SELECT version FROM hypha_execution_store_schema WHERE singleton_id = TRUE)
               AS schema_version,
             to_regclass('public.execution_records') AS records_table,
             to_regclass('public.execution_lease_history') AS lease_history_table,
             to_regclass('public.execution_record_quarantine') AS quarantine_table`
        )
      );
      expect(schemaEvidence.rows).toEqual([
        {
          schema_version: POSTGRES_EXECUTION_STORE_SCHEMA_VERSION,
          records_table: 'execution_records',
          lease_history_table: 'execution_lease_history',
          quarantine_table: 'execution_record_quarantine',
        },
      ]);
    } finally {
      await store.close();
    }

    await expect(store.health()).resolves.toMatchObject({
      status: 'unhealthy',
      details: { provider: 'postgres', ready: false },
    });
  }, 30_000);
});

async function waitForPostgres(): Promise<void> {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    const result = await runDocker([
      'exec',
      containerName,
      'pg_isready',
      '-q',
      '-U',
      username,
      '-d',
      database,
    ]);
    if (result.outcome === 'exited' && result.exitCode === 0) return;
    await delay(250);
  }
  throw new Error('Real Postgres fixture did not become ready.');
}

async function requireDocker(args: string[]): Promise<DockerCliResult> {
  const result = await runDocker(args);
  expect(result.outcome).toBe('exited');
  expect(result.exitCode).toBe(0);
  return result;
}

function runDocker(args: string[]): Promise<DockerCliResult> {
  return docker.run({
    args,
    timeoutMs: 30_000,
    maxStdoutBytes: 1024 * 1024,
    maxStderrBytes: 1024 * 1024,
    maxCombinedOutputBytes: 2 * 1024 * 1024,
    signal: new AbortController().signal,
  });
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function findAvailableLoopbackPort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.unref();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        server.close();
        reject(new Error('Could not reserve a loopback port for the Postgres fixture.'));
        return;
      }
      server.close((error) => {
        if (error) reject(error);
        else resolve(address.port);
      });
    });
  });
}
