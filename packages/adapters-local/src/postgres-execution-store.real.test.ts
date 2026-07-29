import { randomUUID } from 'node:crypto';
import { createServer } from 'node:net';
import {
  commandExecutionResultExample,
  executionLeaseAcquireRequestExample,
  executionLeaseReleaseRequestExample,
  executionLeaseRenewRequestExample,
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
const dockerHost =
  process.env.HYPHA_REAL_DOCKER_HOST ??
  (process.platform === 'win32' ? 'npipe:////./pipe/dockerDesktopLinuxEngine' : undefined);
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
  await requireDockerImage(image);
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

  it('allows only one real worker to claim the same queued Execution', async () => {
    const createRequest = structuredClone(executionRecordCreateRequestExample);
    createRequest.operationId = 'operation.execution.create.real-claim';
    createRequest.idempotencyKey = 'execution-create:execution.real.claim';
    createRequest.record.id = 'execution.real.claim';
    createRequest.record.request.executionId = createRequest.record.id;
    createRequest.record.request.operationId = 'operation.command.real.claim';
    createRequest.record.request.idempotencyKey = 'command:run.real:claim';
    const firstClaim = structuredClone(executionLeaseAcquireRequestExample);
    firstClaim.operationId = 'operation.lease.acquire.real.a';
    firstClaim.executionId = createRequest.record.id;
    firstClaim.expectedRevision = 0;
    firstClaim.requestedLeaseId = 'lease.execution.real.claim.a';
    firstClaim.ownerId = 'runtime-worker.real.a';
    firstClaim.acquiredAt = '2026-07-16T00:00:02.000Z';
    firstClaim.idempotencyKey = 'lease-acquire:execution.real.claim:a';
    const secondClaim = structuredClone(firstClaim);
    secondClaim.operationId = 'operation.lease.acquire.real.b';
    secondClaim.requestedLeaseId = 'lease.execution.real.claim.b';
    secondClaim.ownerId = 'runtime-worker.real.b';
    secondClaim.idempotencyKey = 'lease-acquire:execution.real.claim:b';
    const workerA = createRealStore('claim-worker-a');
    const workerB = createRealStore('claim-worker-b');

    try {
      await Promise.all([workerA.connection.initialize(), workerB.connection.initialize()]);
      await workerA.store.create(createRequest);
      const outcomes = await Promise.all([
        captureLeaseAcquire(workerA.store, firstClaim),
        captureLeaseAcquire(workerB.store, secondClaim),
      ]);
      const successful = outcomes.find((outcome) => outcome.ok);
      const failed = outcomes.find((outcome) => !outcome.ok);

      expect(outcomes.filter((outcome) => outcome.ok)).toHaveLength(1);
      expect(outcomes.filter((outcome) => !outcome.ok)).toHaveLength(1);
      expect(successful).toMatchObject({
        record: {
          id: createRequest.record.id,
          revision: 1,
          status: 'starting',
          attempt: 1,
          lease: {
            fencingToken: 1,
            ownerId: expect.stringMatching(/^runtime-worker\.real\.[ab]$/u),
          },
        },
      });
      expect(failed).toMatchObject({
        error: {
          code: 'EXECUTION_STORE_REVISION_CONFLICT',
          details: {
            executionId: createRequest.record.id,
            expectedRevision: 0,
            actualRevision: 1,
          },
        },
      });
      if (!successful?.ok) throw new Error('Real Postgres claim did not produce one winner.');
      await expect(workerA.store.get(createRequest.record.id)).resolves.toEqual(successful.record);

      const evidence = await workerA.connection.withClient((client) =>
        client.query(
          `SELECT
             revision,
             last_fencing_token,
             (SELECT COUNT(*) FROM execution_lease_history
               WHERE execution_id = $1) AS lease_count,
             (SELECT COUNT(*) FROM execution_mutation_idempotency
               WHERE execution_id = $1) AS mutation_count
           FROM execution_records
           WHERE execution_id = $1`,
          [createRequest.record.id]
        )
      );
      expect(evidence.rows).toEqual([
        {
          revision: '1',
          last_fencing_token: '1',
          lease_count: '1',
          mutation_count: '1',
        },
      ]);
    } finally {
      await Promise.all([workerA.store.close(), workerB.store.close()]);
    }
  }, 30_000);

  it('renews a real lease while rejecting a forged owner guard', async () => {
    const createRequest = structuredClone(executionRecordCreateRequestExample);
    createRequest.operationId = 'operation.execution.create.real-renew';
    createRequest.idempotencyKey = 'execution-create:execution.real.renew';
    createRequest.record.id = 'execution.real.renew';
    createRequest.record.request.executionId = createRequest.record.id;
    createRequest.record.request.operationId = 'operation.command.real.renew';
    createRequest.record.request.idempotencyKey = 'command:run.real:renew';
    const acquireRequest = structuredClone(executionLeaseAcquireRequestExample);
    acquireRequest.operationId = 'operation.lease.acquire.real-renew';
    acquireRequest.executionId = createRequest.record.id;
    acquireRequest.expectedRevision = 0;
    acquireRequest.requestedLeaseId = 'lease.execution.real.renew.1';
    acquireRequest.ownerId = 'runtime-worker.real.renew';
    acquireRequest.acquiredAt = '2026-07-16T00:00:02.000Z';
    acquireRequest.idempotencyKey = 'lease-acquire:execution.real.renew:1';
    const fixture = createRealStore('lease-renew');

    try {
      await fixture.connection.initialize();
      await fixture.store.create(createRequest);
      const claimed = await fixture.store.acquireLease(acquireRequest);
      if (!claimed.lease) throw new Error('Real Postgres claim did not return a lease.');
      const lease = claimed.lease;

      const forgedRenew = structuredClone(executionLeaseRenewRequestExample);
      forgedRenew.operationId = 'operation.lease.renew.real-forged';
      forgedRenew.executionId = createRequest.record.id;
      forgedRenew.expectedRevision = claimed.revision;
      forgedRenew.leaseGuard = {
        leaseId: lease.id,
        ownerId: 'runtime-worker.real.attacker',
        fencingToken: lease.fencingToken,
      };
      forgedRenew.heartbeatAt = '2026-07-16T00:00:10.000Z';
      forgedRenew.idempotencyKey = 'lease-renew:execution.real.renew:forged';
      await expect(fixture.store.renewLease(forgedRenew)).rejects.toMatchObject({
        code: 'EXECUTION_STORE_FENCING_REJECTED',
        details: {
          executionId: createRequest.record.id,
          fencingToken: lease.fencingToken,
        },
      });

      const validRenew = structuredClone(forgedRenew);
      validRenew.operationId = 'operation.lease.renew.real-valid';
      validRenew.leaseGuard.ownerId = lease.ownerId;
      validRenew.idempotencyKey = 'lease-renew:execution.real.renew:valid';
      const renewed = await fixture.store.renewLease(validRenew);

      expect(renewed).toMatchObject({
        id: createRequest.record.id,
        revision: 2,
        lease: {
          id: lease.id,
          ownerId: lease.ownerId,
          fencingToken: lease.fencingToken,
          heartbeatAt: validRenew.heartbeatAt,
          expiresAt: '2026-07-16T00:00:40.000Z',
        },
        updatedAt: validRenew.heartbeatAt,
      });
      const evidence = await fixture.connection.withClient((client) =>
        client.query(
          `SELECT
             records.revision,
             records.last_fencing_token,
             history.released_at,
             (SELECT COUNT(*) FROM execution_mutation_idempotency
               WHERE execution_id = $1) AS mutation_count
           FROM execution_records AS records
           JOIN execution_lease_history AS history
             ON history.execution_id = records.execution_id
            AND history.lease_id = $2
          WHERE records.execution_id = $1`,
          [createRequest.record.id, lease.id]
        )
      );
      expect(evidence.rows).toEqual([
        {
          revision: '2',
          last_fencing_token: '1',
          released_at: null,
          mutation_count: '2',
        },
      ]);
    } finally {
      await fixture.store.close();
    }
  }, 30_000);

  it('reclaims an expired real lease and fences the stale worker', async () => {
    const createRequest = structuredClone(executionRecordCreateRequestExample);
    createRequest.operationId = 'operation.execution.create.real-reclaim';
    createRequest.idempotencyKey = 'execution-create:execution.real.reclaim';
    createRequest.record.id = 'execution.real.reclaim';
    createRequest.record.request.executionId = createRequest.record.id;
    createRequest.record.request.operationId = 'operation.command.real.reclaim';
    createRequest.record.request.idempotencyKey = 'command:run.real:reclaim';
    const firstAcquire = structuredClone(executionLeaseAcquireRequestExample);
    firstAcquire.operationId = 'operation.lease.acquire.real-reclaim-a';
    firstAcquire.executionId = createRequest.record.id;
    firstAcquire.expectedRevision = 0;
    firstAcquire.requestedLeaseId = 'lease.execution.real.reclaim.a';
    firstAcquire.ownerId = 'runtime-worker.real.reclaim.a';
    firstAcquire.acquiredAt = '2026-07-16T00:00:02.000Z';
    firstAcquire.idempotencyKey = 'lease-acquire:execution.real.reclaim:a';
    const workerA = createRealStore('reclaim-worker-a');
    const workerB = createRealStore('reclaim-worker-b');

    try {
      await Promise.all([workerA.connection.initialize(), workerB.connection.initialize()]);
      await workerA.store.create(createRequest);
      const firstClaim = await workerA.store.acquireLease(firstAcquire);
      if (!firstClaim.lease) throw new Error('Real Postgres claim did not return a lease.');
      const staleLease = firstClaim.lease;

      const earlyTakeover = structuredClone(firstAcquire);
      earlyTakeover.operationId = 'operation.lease.acquire.real-reclaim-early';
      earlyTakeover.expectedRevision = firstClaim.revision;
      earlyTakeover.requestedLeaseId = 'lease.execution.real.reclaim.early';
      earlyTakeover.ownerId = 'runtime-worker.real.reclaim.early';
      earlyTakeover.acquiredAt = '2026-07-16T00:00:31.999Z';
      earlyTakeover.idempotencyKey = 'lease-acquire:execution.real.reclaim:early';
      await expect(workerB.store.acquireLease(earlyTakeover)).rejects.toMatchObject({
        code: 'EXECUTION_STORE_LEASE_HELD',
        details: {
          executionId: createRequest.record.id,
          leaseId: staleLease.id,
          expiresAt: staleLease.expiresAt,
        },
      });

      const takeoverRequest = structuredClone(earlyTakeover);
      takeoverRequest.operationId = 'operation.lease.acquire.real-reclaim-b';
      takeoverRequest.requestedLeaseId = 'lease.execution.real.reclaim.b';
      takeoverRequest.ownerId = 'runtime-worker.real.reclaim.b';
      takeoverRequest.acquiredAt = staleLease.expiresAt;
      takeoverRequest.idempotencyKey = 'lease-acquire:execution.real.reclaim:b';
      const takeover = await workerB.store.acquireLease(takeoverRequest);

      expect(takeover).toMatchObject({
        id: createRequest.record.id,
        revision: 2,
        status: 'starting',
        attempt: 1,
        lease: {
          id: takeoverRequest.requestedLeaseId,
          ownerId: takeoverRequest.ownerId,
          fencingToken: staleLease.fencingToken + 1,
          acquiredAt: takeoverRequest.acquiredAt,
        },
        updatedAt: takeoverRequest.acquiredAt,
      });

      const staleRenew = structuredClone(executionLeaseRenewRequestExample);
      staleRenew.operationId = 'operation.lease.renew.real-reclaim-stale';
      staleRenew.executionId = createRequest.record.id;
      staleRenew.expectedRevision = takeover.revision;
      staleRenew.leaseGuard = {
        leaseId: staleLease.id,
        ownerId: staleLease.ownerId,
        fencingToken: staleLease.fencingToken,
      };
      staleRenew.heartbeatAt = '2026-07-16T00:00:33.000Z';
      staleRenew.idempotencyKey = 'lease-renew:execution.real.reclaim:stale';
      await expect(workerA.store.renewLease(staleRenew)).rejects.toMatchObject({
        code: 'EXECUTION_STORE_FENCING_REJECTED',
        details: {
          executionId: createRequest.record.id,
          fencingToken: staleLease.fencingToken + 1,
        },
      });

      const staleTerminal = structuredClone(executionRecordCompareAndSetRequestExample);
      const terminalRevision = takeover.revision + 1;
      staleTerminal.operationId = 'operation.execution.complete.real-reclaim-stale';
      staleTerminal.executionId = createRequest.record.id;
      staleTerminal.expectedRevision = takeover.revision;
      staleTerminal.leaseGuard = {
        leaseId: staleLease.id,
        ownerId: staleLease.ownerId,
        fencingToken: staleLease.fencingToken,
      };
      staleTerminal.next = {
        ...structuredClone(takeover),
        revision: terminalRevision,
        status: 'completed',
        sandboxId: commandExecutionResultExample.sandboxId,
        lease: structuredClone(staleLease),
        result: {
          ...structuredClone(commandExecutionResultExample),
          executionId: createRequest.record.id,
          revision: terminalRevision,
          status: 'completed',
        },
        updatedAt: '2026-07-16T00:00:33.000Z',
      };
      staleTerminal.idempotencyKey = 'execution-complete:execution.real.reclaim:stale';
      await expect(workerA.store.compareAndSet(staleTerminal)).rejects.toMatchObject({
        code: 'EXECUTION_STORE_FENCING_REJECTED',
        details: {
          executionId: createRequest.record.id,
          fencingToken: staleLease.fencingToken + 1,
        },
      });
      await expect(workerA.store.get(createRequest.record.id)).resolves.toEqual(takeover);

      const evidence = await workerA.connection.withClient((client) =>
        client.query(
          `SELECT
             records.revision,
             records.last_fencing_token,
             history.lease_id,
             history.fencing_token,
             history.owner_id,
             history.released_at,
             history.release_reason,
             (SELECT COUNT(*) FROM execution_mutation_idempotency
               WHERE execution_id = $1) AS mutation_count
           FROM execution_records AS records
           JOIN execution_lease_history AS history
             ON history.execution_id = records.execution_id
          WHERE records.execution_id = $1
          ORDER BY history.fencing_token`,
          [createRequest.record.id]
        )
      );
      expect(evidence.rows).toEqual([
        {
          revision: '2',
          last_fencing_token: '2',
          lease_id: staleLease.id,
          fencing_token: '1',
          owner_id: staleLease.ownerId,
          released_at: new Date(takeoverRequest.acquiredAt),
          release_reason: 'expired_and_replaced',
          mutation_count: '2',
        },
        {
          revision: '2',
          last_fencing_token: '2',
          lease_id: takeoverRequest.requestedLeaseId,
          fencing_token: '2',
          owner_id: takeoverRequest.ownerId,
          released_at: null,
          release_reason: null,
          mutation_count: '2',
        },
      ]);
    } finally {
      await Promise.all([workerA.store.close(), workerB.store.close()]);
    }
  }, 30_000);

  it('preserves a real lease across worker restart and reclaims it only after expiry', async () => {
    const createRequest = structuredClone(executionRecordCreateRequestExample);
    createRequest.operationId = 'operation.execution.create.real-restart-lease';
    createRequest.idempotencyKey = 'execution-create:execution.real.restart-lease';
    createRequest.record.id = 'execution.real.restart-lease';
    createRequest.record.request.executionId = createRequest.record.id;
    createRequest.record.request.operationId = 'operation.command.real.restart-lease';
    createRequest.record.request.idempotencyKey = 'command:run.real:restart-lease';
    const acquireRequest = structuredClone(executionLeaseAcquireRequestExample);
    acquireRequest.operationId = 'operation.lease.acquire.real-restart-a';
    acquireRequest.executionId = createRequest.record.id;
    acquireRequest.expectedRevision = 0;
    acquireRequest.requestedLeaseId = 'lease.execution.real.restart.a';
    acquireRequest.ownerId = 'runtime-worker.real.restart.a';
    acquireRequest.acquiredAt = '2026-07-16T00:00:02.000Z';
    acquireRequest.idempotencyKey = 'lease-acquire:execution.real.restart:a';
    const crashedWorker = createRealStore('restart-worker-a');
    let recoveredWorker: ReturnType<typeof createRealStore> | undefined;

    try {
      await crashedWorker.connection.initialize();
      await crashedWorker.store.create(createRequest);
      const persistedClaim = await crashedWorker.store.acquireLease(acquireRequest);
      if (!persistedClaim.lease) {
        throw new Error('Real Postgres restart claim did not return a lease.');
      }
      const crashedLease = persistedClaim.lease;
      await crashedWorker.store.close();

      recoveredWorker = createRealStore('restart-worker-b');
      await recoveredWorker.connection.initialize();
      await expect(recoveredWorker.store.get(createRequest.record.id)).resolves.toEqual(
        persistedClaim
      );

      const earlyTakeover = structuredClone(acquireRequest);
      earlyTakeover.operationId = 'operation.lease.acquire.real-restart-early';
      earlyTakeover.expectedRevision = persistedClaim.revision;
      earlyTakeover.requestedLeaseId = 'lease.execution.real.restart.early';
      earlyTakeover.ownerId = 'runtime-worker.real.restart.early';
      earlyTakeover.acquiredAt = '2026-07-16T00:00:31.999Z';
      earlyTakeover.idempotencyKey = 'lease-acquire:execution.real.restart:early';
      await expect(recoveredWorker.store.acquireLease(earlyTakeover)).rejects.toMatchObject({
        code: 'EXECUTION_STORE_LEASE_HELD',
        details: {
          executionId: createRequest.record.id,
          leaseId: crashedLease.id,
          expiresAt: crashedLease.expiresAt,
        },
      });

      const takeoverRequest = structuredClone(earlyTakeover);
      takeoverRequest.operationId = 'operation.lease.acquire.real-restart-b';
      takeoverRequest.requestedLeaseId = 'lease.execution.real.restart.b';
      takeoverRequest.ownerId = 'runtime-worker.real.restart.b';
      takeoverRequest.acquiredAt = crashedLease.expiresAt;
      takeoverRequest.idempotencyKey = 'lease-acquire:execution.real.restart:b';
      const takeover = await recoveredWorker.store.acquireLease(takeoverRequest);

      expect(takeover).toMatchObject({
        id: createRequest.record.id,
        revision: persistedClaim.revision + 1,
        lease: {
          id: takeoverRequest.requestedLeaseId,
          ownerId: takeoverRequest.ownerId,
          fencingToken: crashedLease.fencingToken + 1,
          acquiredAt: crashedLease.expiresAt,
        },
      });
      const evidence = await recoveredWorker.connection.withClient((client) =>
        client.query(
          `SELECT
             records.revision,
             records.last_fencing_token,
             COUNT(history.lease_id) AS lease_count,
             COUNT(history.released_at) AS released_lease_count
           FROM execution_records AS records
           JOIN execution_lease_history AS history
             ON history.execution_id = records.execution_id
          WHERE records.execution_id = $1
          GROUP BY records.revision, records.last_fencing_token`,
          [createRequest.record.id]
        )
      );
      expect(evidence.rows).toEqual([
        {
          revision: '2',
          last_fencing_token: '2',
          lease_count: '2',
          released_lease_count: '1',
        },
      ]);
    } finally {
      await crashedWorker.store.close();
      await recoveredWorker?.store.close();
    }
  }, 30_000);

  it('releases a real lease with its owner and allows a fenced successor claim', async () => {
    const createRequest = structuredClone(executionRecordCreateRequestExample);
    createRequest.operationId = 'operation.execution.create.real-release';
    createRequest.idempotencyKey = 'execution-create:execution.real.release';
    createRequest.record.id = 'execution.real.release';
    createRequest.record.request.executionId = createRequest.record.id;
    createRequest.record.request.operationId = 'operation.command.real.release';
    createRequest.record.request.idempotencyKey = 'command:run.real:release';
    const acquireRequest = structuredClone(executionLeaseAcquireRequestExample);
    acquireRequest.operationId = 'operation.lease.acquire.real-release-a';
    acquireRequest.executionId = createRequest.record.id;
    acquireRequest.expectedRevision = 0;
    acquireRequest.requestedLeaseId = 'lease.execution.real.release.a';
    acquireRequest.ownerId = 'runtime-worker.real.release.a';
    acquireRequest.acquiredAt = '2026-07-16T00:00:02.000Z';
    acquireRequest.idempotencyKey = 'lease-acquire:execution.real.release:a';
    const workerA = createRealStore('release-worker-a');
    const workerB = createRealStore('release-worker-b');

    try {
      await Promise.all([workerA.connection.initialize(), workerB.connection.initialize()]);
      await workerA.store.create(createRequest);
      const claimed = await workerA.store.acquireLease(acquireRequest);
      if (!claimed.lease) throw new Error('Real Postgres release claim did not return a lease.');
      const lease = claimed.lease;

      const forgedRelease = structuredClone(executionLeaseReleaseRequestExample);
      forgedRelease.operationId = 'operation.lease.release.real-forged';
      forgedRelease.executionId = createRequest.record.id;
      forgedRelease.expectedRevision = claimed.revision;
      forgedRelease.leaseGuard = {
        leaseId: lease.id,
        ownerId: 'runtime-worker.real.release.attacker',
        fencingToken: lease.fencingToken,
      };
      forgedRelease.releasedAt = '2026-07-16T00:00:10.000Z';
      forgedRelease.reason = 'forged handoff';
      forgedRelease.idempotencyKey = 'lease-release:execution.real.release:forged';
      await expect(workerB.store.releaseLease(forgedRelease)).rejects.toMatchObject({
        code: 'EXECUTION_STORE_FENCING_REJECTED',
        details: {
          executionId: createRequest.record.id,
          fencingToken: lease.fencingToken,
        },
      });

      const validRelease = structuredClone(forgedRelease);
      validRelease.operationId = 'operation.lease.release.real-valid';
      validRelease.leaseGuard.ownerId = lease.ownerId;
      validRelease.reason = 'worker handoff';
      validRelease.idempotencyKey = 'lease-release:execution.real.release:valid';
      const released = await workerA.store.releaseLease(validRelease);
      expect(released).toMatchObject({
        id: createRequest.record.id,
        revision: 2,
        status: 'starting',
        lease: undefined,
        updatedAt: validRelease.releasedAt,
      });

      const successorAcquire = structuredClone(acquireRequest);
      successorAcquire.operationId = 'operation.lease.acquire.real-release-b';
      successorAcquire.expectedRevision = released.revision;
      successorAcquire.requestedLeaseId = 'lease.execution.real.release.b';
      successorAcquire.ownerId = 'runtime-worker.real.release.b';
      successorAcquire.acquiredAt = '2026-07-16T00:00:11.000Z';
      successorAcquire.idempotencyKey = 'lease-acquire:execution.real.release:b';
      const successor = await workerB.store.acquireLease(successorAcquire);
      expect(successor).toMatchObject({
        id: createRequest.record.id,
        revision: 3,
        lease: {
          id: successorAcquire.requestedLeaseId,
          ownerId: successorAcquire.ownerId,
          fencingToken: lease.fencingToken + 1,
          acquiredAt: successorAcquire.acquiredAt,
        },
      });

      const evidence = await workerA.connection.withClient((client) =>
        client.query(
          `SELECT
             records.revision,
             records.last_fencing_token,
             COUNT(history.lease_id) AS lease_count,
             COUNT(history.released_at) AS released_lease_count,
             MAX(history.release_reason)
               FILTER (WHERE history.lease_id = $2) AS release_reason,
             (SELECT COUNT(*) FROM execution_mutation_idempotency
               WHERE execution_id = $1) AS mutation_count
           FROM execution_records AS records
           JOIN execution_lease_history AS history
             ON history.execution_id = records.execution_id
          WHERE records.execution_id = $1
          GROUP BY records.revision, records.last_fencing_token`,
          [createRequest.record.id, lease.id]
        )
      );
      expect(evidence.rows).toEqual([
        {
          revision: '3',
          last_fencing_token: '2',
          lease_count: '2',
          released_lease_count: '1',
          release_reason: validRelease.reason,
          mutation_count: '3',
        },
      ]);
    } finally {
      await Promise.all([workerA.store.close(), workerB.store.close()]);
    }
  }, 30_000);

  it('fails closed during a real database outage and recovers through the same Store', async () => {
    const createRequest = structuredClone(executionRecordCreateRequestExample);
    createRequest.operationId = 'operation.execution.create.real-outage';
    createRequest.idempotencyKey = 'execution-create:execution.real.outage';
    createRequest.record.id = 'execution.real.outage';
    createRequest.record.request.executionId = createRequest.record.id;
    createRequest.record.request.operationId = 'operation.command.real.outage';
    createRequest.record.request.idempotencyKey = 'command:run.real:outage';

    const { connection, store } = createRealStore('outage-recovery');
    let postgresStopped = false;

    try {
      await connection.initialize();
      const persisted = await store.create(createRequest);

      await requireDocker(['stop', '--time', '1', containerName]);
      postgresStopped = true;

      await expect(store.get(persisted.id)).rejects.toMatchObject({
        code: 'EXECUTION_STORE_UNAVAILABLE',
        message: 'Postgres Execution store write failed.',
      });
      await expect(store.health()).resolves.toMatchObject({
        status: 'unhealthy',
        message: 'Postgres Execution store health check failed.',
        details: { provider: 'postgres', ready: false },
      });

      await requireDocker(['start', containerName]);
      postgresStopped = false;
      await waitForPostgres();
      await waitForStoreHealthy(store);

      await expect(store.get(persisted.id)).resolves.toEqual(persisted);
    } finally {
      if (postgresStopped) {
        await requireDocker(['start', containerName]);
        await waitForPostgres();
      }
      await store.close();
    }
  }, 45_000);

  it('quarantines a corrupt real record while healthy records remain readable', async () => {
    const corruptRequest = structuredClone(executionRecordCreateRequestExample);
    corruptRequest.operationId = 'operation.execution.create.real-corrupt';
    corruptRequest.idempotencyKey = 'execution-create:execution.real.corrupt';
    corruptRequest.record.id = 'execution.real.corrupt';
    corruptRequest.record.request.executionId = corruptRequest.record.id;
    corruptRequest.record.request.operationId = 'operation.command.real.corrupt';
    corruptRequest.record.request.idempotencyKey = 'command:run.real:corrupt';

    const healthyRequest = structuredClone(executionRecordCreateRequestExample);
    healthyRequest.operationId = 'operation.execution.create.real-healthy';
    healthyRequest.idempotencyKey = 'execution-create:execution.real.healthy';
    healthyRequest.record.id = 'execution.real.healthy';
    healthyRequest.record.request.executionId = healthyRequest.record.id;
    healthyRequest.record.request.operationId = 'operation.command.real.healthy';
    healthyRequest.record.request.idempotencyKey = 'command:run.real:healthy';

    const { connection, store } = createRealStore('corrupt-record');

    try {
      await connection.initialize();
      const corruptRecord = await store.create(corruptRequest);
      const healthyRecord = await store.create(healthyRequest);

      await connection.withClient((client) =>
        client.query(
          `UPDATE execution_records
              SET status = 'completed'
            WHERE execution_id = $1`,
          [corruptRecord.id]
        )
      );

      await expect(store.get(corruptRecord.id)).rejects.toMatchObject({
        code: 'EXECUTION_STORE_CORRUPT',
        message: 'Postgres Execution store contains an invalid record.',
        details: { executionId: corruptRecord.id },
      });
      await expect(store.get(corruptRecord.id)).rejects.toMatchObject({
        code: 'EXECUTION_STORE_CORRUPT',
        message: 'Execution record is quarantined.',
        details: { executionId: corruptRecord.id },
      });

      await expect(store.get(healthyRecord.id)).resolves.toEqual(healthyRecord);
      await expect(store.health()).resolves.toMatchObject({
        status: 'degraded',
        message: 'Postgres Execution store contains quarantined records.',
        details: {
          provider: 'postgres',
          ready: true,
          schemaVersion: POSTGRES_EXECUTION_STORE_SCHEMA_VERSION,
          quarantinedRecords: 1,
        },
      });

      const evidence = await connection.withClient((client) =>
        client.query(
          `SELECT reason_code, record_hash, detected_at
             FROM execution_record_quarantine
            WHERE execution_id = $1`,
          [corruptRecord.id]
        )
      );
      expect(evidence.rows).toHaveLength(1);
      expect(evidence.rows[0]).toMatchObject({
        reason_code: 'invalid_record',
        record_hash: expect.stringMatching(/^sha256:[0-9a-f]{64}$/u),
        detected_at: expect.any(Date),
      });
    } finally {
      await store.close();
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

async function waitForStoreHealthy(store: PostgresExecutionStoreFoundation): Promise<void> {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const health = await store.health();
    if (health.status === 'healthy' && health.details?.ready === true) return;
    await delay(250);
  }
  throw new Error('Real Postgres Store did not recover after the database restarted.');
}

async function requireDocker(args: string[]): Promise<DockerCliResult> {
  const result = await runDocker(args);
  assertDockerSuccess(result);
  return result;
}

async function requireDockerImage(image: string): Promise<void> {
  let result: DockerCliResult | undefined;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    result = await runDocker(['image', 'inspect', image]);
    if (result.outcome === 'exited' && result.exitCode === 0) return;
    if (attempt < 4) await delay(500);
  }
  if (!result) throw new Error('Docker image inspection did not run.');
  assertDockerSuccess(result);
}

function assertDockerSuccess(result: DockerCliResult): void {
  const diagnostic = dockerDiagnostic(result);
  expect(result.outcome, diagnostic).toBe('exited');
  expect(result.exitCode, diagnostic).toBe(0);
}

function dockerDiagnostic(result: DockerCliResult): string {
  const stderr = result.stderr.replaceAll(password, '[redacted]').trim().slice(0, 1_024);
  return [
    'Docker fixture command failed.',
    `outcome=${result.outcome}`,
    `exitCode=${String(result.exitCode)}`,
    ...(result.startErrorCode ? [`startErrorCode=${result.startErrorCode}`] : []),
    ...(stderr ? [`stderr=${stderr}`] : []),
  ].join(' ');
}

function runDocker(args: string[]): Promise<DockerCliResult> {
  return docker.run({
    args: dockerHost ? ['--host', dockerHost, ...args] : args,
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

async function captureLeaseAcquire(
  store: PostgresExecutionStoreFoundation,
  request: typeof executionLeaseAcquireRequestExample
): Promise<
  | { ok: true; record: Awaited<ReturnType<PostgresExecutionStoreFoundation['acquireLease']>> }
  | { ok: false; error: unknown }
> {
  try {
    return { ok: true, record: await store.acquireLease(request) };
  } catch (error) {
    return { ok: false, error };
  }
}
