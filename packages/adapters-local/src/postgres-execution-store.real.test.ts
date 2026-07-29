import { randomUUID } from 'node:crypto';
import { createServer } from 'node:net';
import {
  executionRecordCompareAndSetRequestExample,
  executionRecordCreateRequestExample,
} from '@hypha/core';
import { Client } from 'pg';
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
  const image = pinnedImageReference(postgresImage, postgresDigest);
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
  const removal = await runDocker(['rm', '-f', '-v', containerName]);
  if (containerCreated) {
    expect(removal).toMatchObject({ outcome: 'exited', exitCode: 0 });
    const inspection = await runDocker(['inspect', containerName]);
    expect(inspection.exitCode).not.toBe(0);
  }
}, 60_000);

describe('PostgresExecutionStoreFoundation real database', () => {
  it('migrates an empty database, reports healthy, and closes cleanly', async () => {
    const { connection, store } = createRealStore('lifecycle');

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

  it('persists a Runtime Schema-validated record across a real connection restart', async () => {
    const request = structuredClone(executionRecordCreateRequestExample);
    const first = createRealStore('persistence-write');
    let reopened: ReturnType<typeof createRealStore> | undefined;

    try {
      await first.connection.initialize();
      await expect(first.store.create(request)).resolves.toEqual(request.record);
      await expect(first.store.get(request.record.id)).resolves.toEqual(request.record);

      await first.store.close();
      reopened = createRealStore('persistence-read');
      await reopened.connection.initialize();

      await expect(reopened.store.get(request.record.id)).resolves.toEqual(request.record);
      await expect(reopened.store.health()).resolves.toMatchObject({
        status: 'healthy',
        details: {
          provider: 'postgres',
          ready: true,
          schemaVersion: POSTGRES_EXECUTION_STORE_SCHEMA_VERSION,
        },
      });
    } finally {
      await first.store.close();
      await reopened?.store.close();
    }
  }, 30_000);

  it('replays an idempotent create after restart without duplicating the Execution', async () => {
    const request = structuredClone(executionRecordCreateRequestExample);
    request.operationId = 'operation.execution.create.real-idempotency';
    request.idempotencyKey = 'execution-create:execution.real.idempotency';
    request.record.id = 'execution.real.idempotency';
    request.record.request.executionId = request.record.id;
    request.record.request.operationId = 'operation.command.real.idempotency';
    request.record.request.idempotencyKey = 'command:run.real:idempotency';
    const first = createRealStore('idempotency-write');
    let reopened: ReturnType<typeof createRealStore> | undefined;

    try {
      await first.connection.initialize();
      await expect(first.store.create(request)).resolves.toEqual(request.record);
      await first.store.close();

      reopened = createRealStore('idempotency-replay');
      await reopened.connection.initialize();
      await expect(reopened.store.create(request)).resolves.toEqual(request.record);

      const counts = await reopened.connection.withClient((client) =>
        client.query(
          `SELECT
             (SELECT COUNT(*) FROM execution_records WHERE execution_id = $1)
               AS record_count,
             (SELECT COUNT(*) FROM execution_create_idempotency
               WHERE operation_id = $2 AND idempotency_key = $3)
               AS idempotency_count`,
          [request.record.id, request.operationId, request.idempotencyKey]
        )
      );
      expect(counts.rows).toEqual([{ record_count: '1', idempotency_count: '1' }]);
    } finally {
      await first.store.close();
      await reopened?.store.close();
    }
  }, 30_000);

  it('allows only one real concurrent compare-and-set at the same revision', async () => {
    const createRequest = structuredClone(executionRecordCreateRequestExample);
    createRequest.operationId = 'operation.execution.create.real-cas';
    createRequest.idempotencyKey = 'execution-create:execution.real.cas';
    createRequest.record.id = 'execution.real.cas';
    createRequest.record.request.executionId = createRequest.record.id;
    createRequest.record.request.operationId = 'operation.command.real.cas';
    createRequest.record.request.idempotencyKey = 'command:run.real:cas';
    const firstUpdate = structuredClone(executionRecordCompareAndSetRequestExample);
    firstUpdate.operationId = 'operation.execution.cas.real.a';
    firstUpdate.executionId = createRequest.record.id;
    firstUpdate.expectedRevision = 0;
    firstUpdate.leaseGuard = undefined;
    firstUpdate.idempotencyKey = 'execution-cas:execution.real.cas:a';
    firstUpdate.next = {
      ...structuredClone(createRequest.record),
      revision: 1,
      status: 'starting',
      updatedAt: '2026-07-16T00:00:01.000Z',
    };
    const secondUpdate = structuredClone(firstUpdate);
    secondUpdate.operationId = 'operation.execution.cas.real.b';
    secondUpdate.idempotencyKey = 'execution-cas:execution.real.cas:b';
    const workerA = createRealStore('cas-worker-a');
    const workerB = createRealStore('cas-worker-b');

    try {
      await Promise.all([workerA.connection.initialize(), workerB.connection.initialize()]);
      await workerA.store.create(createRequest);
      const outcomes = await Promise.all([
        captureCompareAndSet(workerA.store, firstUpdate),
        captureCompareAndSet(workerB.store, secondUpdate),
      ]);
      const successes = outcomes.filter((outcome) => outcome.ok);
      const failures = outcomes.filter((outcome) => !outcome.ok);

      expect(successes).toHaveLength(1);
      expect(successes[0]).toMatchObject({ record: firstUpdate.next });
      expect(failures).toHaveLength(1);
      expect(failures[0]).toMatchObject({
        error: {
          code: 'EXECUTION_STORE_REVISION_CONFLICT',
          details: {
            executionId: createRequest.record.id,
            expectedRevision: 0,
            actualRevision: 1,
          },
        },
      });
      await expect(workerA.store.get(createRequest.record.id)).resolves.toEqual(firstUpdate.next);

      const evidence = await workerA.connection.withClient((client) =>
        client.query(
          `SELECT
             revision,
             (SELECT COUNT(*) FROM execution_mutation_idempotency
               WHERE execution_id = $1) AS mutation_count
           FROM execution_records
           WHERE execution_id = $1`,
          [createRequest.record.id]
        )
      );
      expect(evidence.rows).toEqual([{ revision: '1', mutation_count: '1' }]);
    } finally {
      await Promise.all([workerA.store.close(), workerB.store.close()]);
    }
  }, 30_000);
});

function createRealStore(applicationRole: string): {
  connection: PostgresExecutionStoreConnection;
  store: PostgresExecutionStoreFoundation;
} {
  const connection = new PostgresExecutionStoreConnection({
    connectionString: postgresConnectionString(),
    tls: { mode: 'disable' },
    applicationName: `hypha-postgres-real-${applicationRole}`,
    maxConnections: 2,
    connectionTimeoutMs: 5_000,
    idleTimeoutMs: 5_000,
    statementTimeoutMs: 5_000,
  });
  return {
    connection,
    store: new PostgresExecutionStoreFoundation(connection),
  };
}

async function waitForPostgres(): Promise<void> {
  let lastErrorCode: string | undefined;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    const client = new Client({
      connectionString: postgresConnectionString(),
      ssl: false,
      connectionTimeoutMillis: 1_000,
      application_name: 'hypha-postgres-readiness',
    });
    try {
      await client.connect();
      await client.query('SELECT 1');
      await client.end();
      return;
    } catch (error) {
      lastErrorCode = postgresErrorCode(error);
      await client.end().catch(() => undefined);
    }
    await delay(250);
  }
  throw new Error(
    `Real Postgres fixture did not become reachable${lastErrorCode ? ` (${lastErrorCode})` : ''}.`
  );
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

function postgresConnectionString(): string {
  return `postgresql://${username}:${password}@127.0.0.1:${port}/${database}`;
}

function pinnedImageReference(image: string, digest: string): string {
  const lastSlash = image.lastIndexOf('/');
  const lastColon = image.lastIndexOf(':');
  const repository = lastColon > lastSlash ? image.slice(0, lastColon) : image;
  return `${repository}@${digest}`;
}

function postgresErrorCode(error: unknown): string | undefined {
  if (!error || typeof error !== 'object' || !('code' in error)) return undefined;
  const code = Reflect.get(error, 'code');
  return typeof code === 'string' && /^[A-Z0-9_]{1,32}$/u.test(code) ? code : undefined;
}

async function captureCompareAndSet(
  store: PostgresExecutionStoreFoundation,
  request: typeof executionRecordCompareAndSetRequestExample
): Promise<
  | { ok: true; record: Awaited<ReturnType<PostgresExecutionStoreFoundation['compareAndSet']>> }
  | { ok: false; error: unknown }
> {
  try {
    return { ok: true, record: await store.compareAndSet(request) };
  } catch (error) {
    return { ok: false, error };
  }
}
