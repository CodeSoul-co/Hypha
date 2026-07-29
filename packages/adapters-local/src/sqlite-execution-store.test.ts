import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type {
  ExecutionLeaseAcquireRequest,
  ExecutionLeaseRenewRequest,
  ExecutionRecord,
  ExecutionRecordCompareAndSetRequest,
  ExecutionStore,
} from '@hypha/core';
import {
  commandExecutionResultExample,
  executionLeaseAcquireRequestExample,
  executionLeaseReleaseRequestExample,
  executionLeaseRenewRequestExample,
  executionRecordCreateRequestExample,
} from '@hypha/core';
import { afterEach, describe, expect, it } from 'vitest';
import { SQLiteExecutionStore } from './sqlite-execution-store';

describe('SQLiteExecutionStore public adapter', () => {
  let root: string | undefined;

  afterEach(async () => {
    if (root) await fs.rm(root, { recursive: true, force: true });
    root = undefined;
  });

  it('implements the public ExecutionStore contract across restart', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-sqlite-execution-store-'));
    const store: ExecutionStore = new SQLiteExecutionStore({ rootPath: root });
    await expect(store.health()).resolves.toMatchObject({
      status: 'healthy',
      details: { schemaVersion: SQLiteExecutionStore.schemaVersion },
    });
    const created = await store.create(structuredClone(executionRecordCreateRequestExample));
    await store.close?.();

    const reopened: ExecutionStore = new SQLiteExecutionStore({ rootPath: root });
    await expect(reopened.get(created.id)).resolves.toEqual(created);
    await reopened.close?.();
  });

  it.each([2, 4, 8])(
    'allows only one compare-and-set across %i independent processes',
    async (processCount) => {
      const testRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-sqlite-execution-cas-'));
      root = testRoot;
      const seed = new SQLiteExecutionStore({ rootPath: testRoot });
      const queued = await seed
        .create(structuredClone(executionRecordCreateRequestExample))
        .finally(() => seed.close());
      const mutations = Array.from({ length: processCount }, (_, index) =>
        startingMutation(
          queued,
          `operation.execution.update.competing-${processCount}-${index}`,
          `execution-update:competing-${processCount}-${index}`
        )
      );

      const results = await Promise.allSettled(
        mutations.map((mutation) =>
          runStoreOperationInChild<ExecutionRecord>(testRoot, 'compareAndSet', mutation)
        )
      );

      expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
      const rejected = results.filter(
        (result): result is PromiseRejectedResult => result.status === 'rejected'
      );
      expect(rejected).toHaveLength(processCount - 1);
      for (const result of rejected) {
        expect(result.reason).toMatchObject({ code: 'EXECUTION_STORE_REVISION_CONFLICT' });
      }

      const reopened = new SQLiteExecutionStore({ rootPath: testRoot });
      try {
        await expect(reopened.get(queued.id)).resolves.toMatchObject({
          revision: 1,
          status: 'starting',
        });
      } finally {
        await reopened.close();
      }
    },
    120_000
  );

  it('fences an expired lease takeover across independent processes', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-sqlite-execution-lease-'));
    const first = new SQLiteExecutionStore({ rootPath: root });
    try {
      await first.create(structuredClone(executionRecordCreateRequestExample));
      const acquired = await first.acquireLease(
        structuredClone(executionLeaseAcquireRequestExample)
      );

      const takeover = await runStoreOperationInChild<typeof acquired>(root, 'acquireLease', {
        ...structuredClone(executionLeaseAcquireRequestExample),
        operationId: 'operation.lease.acquire.takeover',
        expectedRevision: acquired.revision,
        requestedLeaseId: 'lease.execution.example.takeover',
        ownerId: 'runtime-worker.takeover',
        acquiredAt: acquired.lease!.expiresAt,
        idempotencyKey: 'lease-acquire:takeover',
      });

      expect(takeover.lease).toMatchObject({
        id: 'lease.execution.example.takeover',
        ownerId: 'runtime-worker.takeover',
        fencingToken: acquired.lease!.fencingToken + 1,
      });
      await expect(
        first.renewLease({
          operationId: 'operation.lease.renew.stale',
          executionId: acquired.id,
          expectedRevision: takeover.revision,
          leaseGuard: {
            leaseId: acquired.lease!.id,
            ownerId: acquired.lease!.ownerId,
            fencingToken: acquired.lease!.fencingToken,
          },
          ttlMs: 30_000,
          heartbeatAt: '2026-07-16T00:00:31.000Z',
          idempotencyKey: 'lease-renew:stale',
        })
      ).rejects.toMatchObject({ code: 'EXECUTION_STORE_FENCING_REJECTED' });
    } finally {
      await first.close();
    }
  }, 60_000);

  it('renews, releases, and reacquires a lease across independent processes', async () => {
    const testRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-sqlite-lease-lifecycle-'));
    root = testRoot;
    const seed = new SQLiteExecutionStore({ rootPath: testRoot });
    await seed
      .create(structuredClone(executionRecordCreateRequestExample))
      .finally(() => seed.close());

    const acquired = await runStoreOperationInChild<ExecutionRecord>(
      testRoot,
      'acquireLease',
      structuredClone(executionLeaseAcquireRequestExample)
    );
    if (!acquired.lease) throw new Error('Expected the independent worker to acquire a lease.');

    const renewed = await runStoreOperationInChild<ExecutionRecord>(testRoot, 'renewLease', {
      ...structuredClone(executionLeaseRenewRequestExample),
      expectedRevision: acquired.revision,
      leaseGuard: leaseGuardFor(acquired.lease),
    });
    expect(renewed).toMatchObject({
      revision: 2,
      lease: {
        id: acquired.lease.id,
        ownerId: acquired.lease.ownerId,
        fencingToken: 1,
        heartbeatAt: executionLeaseRenewRequestExample.heartbeatAt,
      },
    });
    if (!renewed.lease) throw new Error('Expected the renewed lease to remain present.');

    const released = await runStoreOperationInChild<ExecutionRecord>(testRoot, 'releaseLease', {
      ...structuredClone(executionLeaseReleaseRequestExample),
      expectedRevision: renewed.revision,
      leaseGuard: leaseGuardFor(renewed.lease),
    });
    expect(released).toMatchObject({ revision: 3 });
    expect(released.lease).toBeUndefined();

    const successor = await runStoreOperationInChild<ExecutionRecord>(testRoot, 'acquireLease', {
      ...structuredClone(executionLeaseAcquireRequestExample),
      operationId: 'operation.lease.acquire.after-release',
      expectedRevision: released.revision,
      requestedLeaseId: 'lease.execution.example.after-release',
      ownerId: 'runtime-worker.after-release',
      acquiredAt: '2026-07-16T00:00:21.000Z',
      idempotencyKey: 'lease-acquire:after-release',
    });
    expect(successor.lease).toMatchObject({
      id: 'lease.execution.example.after-release',
      ownerId: 'runtime-worker.after-release',
      fencingToken: 2,
    });

    await expect(
      runStoreOperationInChild<ExecutionRecord>(testRoot, 'renewLease', {
        ...structuredClone(executionLeaseRenewRequestExample),
        operationId: 'operation.lease.renew.released-worker',
        expectedRevision: successor.revision,
        leaseGuard: leaseGuardFor(acquired.lease),
        heartbeatAt: '2026-07-16T00:00:22.000Z',
        idempotencyKey: 'lease-renew:released-worker',
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_FENCING_REJECTED' });

    const reopened = new SQLiteExecutionStore({ rootPath: testRoot });
    try {
      await expect(reopened.get(successor.id)).resolves.toEqual(successor);
    } finally {
      await reopened.close();
    }
  }, 60_000);

  it('rolls back an uncommitted WAL transaction after its worker crashes', async () => {
    const testRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-sqlite-uncommitted-wal-'));
    root = testRoot;
    const store = new SQLiteExecutionStore({ rootPath: testRoot });
    const queued = await store
      .create(structuredClone(executionRecordCreateRequestExample))
      .finally(() => store.close());
    const mutation = startingMutation(
      queued,
      'operation.execution.update.uncommitted-wal',
      'execution-update:uncommitted-wal'
    );

    await runStoreCrashInChild(
      testRoot,
      'crashDuringCompareAndSetTransaction',
      mutation,
      CRASH_DURING_CAS_TRANSACTION_EXIT_CODE
    );
    await expect(
      fs.readFile(path.join(testRoot, 'uncommitted-transaction.marker'), 'utf8')
    ).resolves.toBe('transaction-started');

    const recovered = new SQLiteExecutionStore({ rootPath: testRoot });
    try {
      await expect(recovered.get(queued.id)).resolves.toEqual(queued);
      await expect(recovered.compareAndSet(mutation)).resolves.toEqual(mutation.next);
      await expect(recovered.health()).resolves.toMatchObject({
        status: 'healthy',
        details: {
          schemaVersion: SQLiteExecutionStore.schemaVersion,
          quarantinedRecords: 0,
        },
      });
    } finally {
      await recovered.close();
    }
  }, 60_000);

  it('recovers atomically from a committed WAL after a worker crashes at compare-and-set', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-sqlite-execution-crash-cas-'));
    const store = new SQLiteExecutionStore({ rootPath: root });
    const queued = await store.create(structuredClone(executionRecordCreateRequestExample));
    await store.close();
    const mutation = startingMutation(
      queued,
      'operation.execution.update.crash-boundary',
      'execution-update:crash-boundary'
    );

    await runStoreCrashInChild(
      root,
      'crashBeforeCompareAndSet',
      mutation,
      CRASH_BEFORE_CAS_EXIT_CODE
    );
    const beforeCrashRecovery = new SQLiteExecutionStore({ rootPath: root });
    await expect(beforeCrashRecovery.get(queued.id)).resolves.toEqual(queued);
    await beforeCrashRecovery.close();

    await runStoreCrashInChild(
      root,
      'crashAfterCompareAndSet',
      mutation,
      CRASH_AFTER_CAS_EXIT_CODE
    );
    const wal = await fs.stat(path.join(root, 'executions.sqlite-wal'));
    expect(wal.size).toBeGreaterThan(32);

    const afterCrashRecovery = new SQLiteExecutionStore({ rootPath: root });
    await expect(afterCrashRecovery.get(queued.id)).resolves.toEqual(mutation.next);
    await expect(afterCrashRecovery.compareAndSet(mutation)).resolves.toEqual(mutation.next);
    await expect(afterCrashRecovery.health()).resolves.toMatchObject({
      status: 'healthy',
      details: {
        schemaVersion: SQLiteExecutionStore.schemaVersion,
        quarantinedRecords: 0,
      },
    });
    await afterCrashRecovery.close();
  }, 60_000);

  it('takes over an expired lease after its worker crashes and rejects the late result', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-sqlite-execution-crash-lease-'));
    const store = new SQLiteExecutionStore({ rootPath: root });
    await store.create(structuredClone(executionRecordCreateRequestExample));
    await store.close();

    await runStoreCrashInChild(
      root,
      'crashAfterAcquireLease',
      structuredClone(executionLeaseAcquireRequestExample),
      CRASH_AFTER_LEASE_ACQUIRE_EXIT_CODE
    );

    const recovered = new SQLiteExecutionStore({ rootPath: root });
    try {
      const crashedWorkerRecord = await recovered.get(
        executionLeaseAcquireRequestExample.executionId
      );
      expect(crashedWorkerRecord).toMatchObject({
        revision: 1,
        status: 'starting',
        lease: {
          id: executionLeaseAcquireRequestExample.requestedLeaseId,
          ownerId: executionLeaseAcquireRequestExample.ownerId,
          fencingToken: 1,
        },
      });

      const takeover = await recovered.acquireLease({
        ...structuredClone(executionLeaseAcquireRequestExample),
        operationId: 'operation.lease.acquire.after-crash',
        expectedRevision: crashedWorkerRecord!.revision,
        requestedLeaseId: 'lease.execution.example.after-crash',
        ownerId: 'runtime-worker.after-crash',
        acquiredAt: crashedWorkerRecord!.lease!.expiresAt,
        idempotencyKey: 'lease-acquire:after-crash',
      });
      expect(takeover.lease).toMatchObject({
        id: 'lease.execution.example.after-crash',
        ownerId: 'runtime-worker.after-crash',
        fencingToken: 2,
      });

      const lateResult = terminalMutation(
        takeover,
        crashedWorkerRecord!.lease!,
        'operation.execution.complete.stale-worker',
        'execution-complete:stale-worker'
      );
      await expect(recovered.compareAndSet(lateResult)).rejects.toMatchObject({
        code: 'EXECUTION_STORE_FENCING_REJECTED',
      });
      await expect(recovered.get(takeover.id)).resolves.toEqual(takeover);
    } finally {
      await recovered.close();
    }
  }, 60_000);

  it('preserves a renewed lease across worker crash and fences it after takeover', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-sqlite-execution-crash-renew-'));
    const store = new SQLiteExecutionStore({ rootPath: root });
    await store.create(structuredClone(executionRecordCreateRequestExample));
    await store.close();

    await runStoreCrashInChild(
      root,
      'crashAfterRenewLease',
      {
        acquire: structuredClone(executionLeaseAcquireRequestExample),
        renew: structuredClone(executionLeaseRenewRequestExample),
      },
      CRASH_AFTER_LEASE_RENEW_EXIT_CODE
    );

    const recovered = new SQLiteExecutionStore({ rootPath: root });
    try {
      const renewed = await recovered.get(executionLeaseAcquireRequestExample.executionId);
      expect(renewed).toMatchObject({
        revision: 2,
        lease: {
          id: executionLeaseAcquireRequestExample.requestedLeaseId,
          ownerId: executionLeaseAcquireRequestExample.ownerId,
          fencingToken: 1,
          heartbeatAt: executionLeaseRenewRequestExample.heartbeatAt,
          expiresAt: '2026-07-16T00:00:40.000Z',
        },
      });
      if (!renewed) throw new Error('Expected the renewed lease to survive worker crash.');

      await expect(
        recovered.acquireLease({
          ...structuredClone(executionLeaseAcquireRequestExample),
          operationId: 'operation.lease.acquire.before-renewed-expiry',
          expectedRevision: renewed.revision,
          requestedLeaseId: 'lease.execution.example.before-renewed-expiry',
          ownerId: 'runtime-worker.before-renewed-expiry',
          acquiredAt: '2026-07-16T00:00:30.000Z',
          idempotencyKey: 'lease-acquire:before-renewed-expiry',
        })
      ).rejects.toMatchObject({ code: 'EXECUTION_STORE_LEASE_HELD' });

      const takeover = await recovered.acquireLease({
        ...structuredClone(executionLeaseAcquireRequestExample),
        operationId: 'operation.lease.acquire.after-renewed-expiry',
        expectedRevision: renewed.revision,
        requestedLeaseId: 'lease.execution.example.after-renewed-expiry',
        ownerId: 'runtime-worker.after-renewed-expiry',
        acquiredAt: '2026-07-16T00:00:40.000Z',
        idempotencyKey: 'lease-acquire:after-renewed-expiry',
      });
      expect(takeover.lease).toMatchObject({
        id: 'lease.execution.example.after-renewed-expiry',
        ownerId: 'runtime-worker.after-renewed-expiry',
        fencingToken: 2,
      });

      await expect(
        recovered.renewLease({
          ...structuredClone(executionLeaseRenewRequestExample),
          operationId: 'operation.lease.renew.crashed-worker',
          expectedRevision: takeover.revision,
          idempotencyKey: 'lease-renew:crashed-worker',
        })
      ).rejects.toMatchObject({ code: 'EXECUTION_STORE_FENCING_REJECTED' });
      await expect(recovered.get(takeover.id)).resolves.toEqual(takeover);
    } finally {
      await recovered.close();
    }
  }, 60_000);
});

type ChildStoreOperation = 'acquireLease' | 'compareAndSet' | 'releaseLease' | 'renewLease';
type ChildStoreCrashOperation =
  | 'crashAfterAcquireLease'
  | 'crashAfterCompareAndSet'
  | 'crashAfterRenewLease'
  | 'crashBeforeCompareAndSet'
  | 'crashDuringCompareAndSetTransaction';

const CRASH_BEFORE_CAS_EXIT_CODE = 71;
const CRASH_AFTER_CAS_EXIT_CODE = 72;
const CRASH_AFTER_LEASE_ACQUIRE_EXIT_CODE = 73;
const CRASH_AFTER_LEASE_RENEW_EXIT_CODE = 74;
const CRASH_DURING_CAS_TRANSACTION_EXIT_CODE = 75;

interface ChildLeaseRenewCrashRequest {
  acquire: ExecutionLeaseAcquireRequest;
  renew: ExecutionLeaseRenewRequest;
}

interface ChildStoreResponse<T> {
  ready?: boolean;
  ok?: boolean;
  result?: T;
  error?: { code?: string; message: string };
}

async function runStoreOperationInChild<T>(
  rootPath: string,
  operation: ChildStoreOperation,
  request: unknown
): Promise<T> {
  const repoRoot = process.cwd();
  const child = spawn(
    process.execPath,
    ['-r', require.resolve('ts-node/register/transpile-only'), '-e', SQLITE_STORE_CHILD_SOURCE],
    {
      cwd: repoRoot,
      env: {
        ...process.env,
        HYPHA_REPO_ROOT: repoRoot,
        TS_NODE_PROJECT: path.join(repoRoot, 'tsconfig.typecheck.json'),
      },
      stdio: ['ignore', 'ignore', 'pipe', 'ipc'],
    }
  );
  let stderr = '';
  let completed = false;
  let response: ChildStoreResponse<T> | undefined;
  child.stderr?.setEncoding('utf8');
  child.stderr?.on('data', (chunk: string) => {
    stderr += chunk;
  });

  return new Promise<T>((resolve, reject) => {
    child.on('error', (error) => {
      if (completed) return;
      completed = true;
      reject(error);
    });
    child.on('message', (message: ChildStoreResponse<T>) => {
      if (message.ready) {
        child.send({ rootPath, operation, request });
        return;
      }
      response = message;
    });
    child.on('close', (code) => {
      if (completed) return;
      completed = true;
      if (!response) {
        reject(new Error(`SQLite child exited with code ${code}: ${stderr.trim()}`));
      } else if (response.ok) {
        resolve(response.result as T);
      } else {
        reject(
          Object.assign(new Error(response.error?.message ?? 'SQLite child operation failed.'), {
            code: response.error?.code,
          })
        );
      }
    });
  });
}

async function runStoreCrashInChild(
  rootPath: string,
  operation: ChildStoreCrashOperation,
  request:
    | ChildLeaseRenewCrashRequest
    | ExecutionLeaseAcquireRequest
    | ExecutionRecordCompareAndSetRequest,
  expectedExitCode: number
): Promise<void> {
  const repoRoot = process.cwd();
  const child = spawn(
    process.execPath,
    ['-r', require.resolve('ts-node/register/transpile-only'), '-e', SQLITE_STORE_CHILD_SOURCE],
    {
      cwd: repoRoot,
      env: {
        ...process.env,
        HYPHA_REPO_ROOT: repoRoot,
        TS_NODE_PROJECT: path.join(repoRoot, 'tsconfig.typecheck.json'),
      },
      stdio: ['ignore', 'ignore', 'pipe', 'ipc'],
    }
  );
  let stderr = '';
  let settled = false;
  child.stderr?.setEncoding('utf8');
  child.stderr?.on('data', (chunk: string) => {
    stderr += chunk;
  });

  return new Promise<void>((resolve, reject) => {
    child.on('error', reject);
    child.on('message', (message: ChildStoreResponse<never>) => {
      if (message.ready) {
        child.send({ rootPath, operation, request });
        return;
      }
      if (message.ok === false && !settled) {
        settled = true;
        reject(
          Object.assign(new Error(message.error?.message ?? 'SQLite child crash setup failed.'), {
            code: message.error?.code,
          })
        );
      }
    });
    child.on('exit', (code) => {
      if (settled) return;
      settled = true;
      if (code === expectedExitCode) {
        resolve();
        return;
      }
      reject(
        new Error(
          `SQLite crash child exited with code ${code}; expected ${expectedExitCode}: ${stderr.trim()}`
        )
      );
    });
  });
}

function startingMutation(
  current: ExecutionRecord,
  operationId: string,
  idempotencyKey: string
): ExecutionRecordCompareAndSetRequest {
  return {
    operationId,
    executionId: current.id,
    expectedRevision: current.revision,
    next: {
      ...structuredClone(current),
      revision: current.revision + 1,
      status: 'starting',
      attempt: current.attempt + 1,
      updatedAt: '2026-07-16T00:00:01.000Z',
    },
    idempotencyKey,
  };
}

function leaseGuardFor(lease: NonNullable<ExecutionRecord['lease']>) {
  return {
    leaseId: lease.id,
    ownerId: lease.ownerId,
    fencingToken: lease.fencingToken,
  };
}

function terminalMutation(
  current: ExecutionRecord,
  staleLease: NonNullable<ExecutionRecord['lease']>,
  operationId: string,
  idempotencyKey: string
): ExecutionRecordCompareAndSetRequest {
  const revision = current.revision + 1;
  return {
    operationId,
    executionId: current.id,
    expectedRevision: current.revision,
    leaseGuard: {
      leaseId: staleLease.id,
      ownerId: staleLease.ownerId,
      fencingToken: staleLease.fencingToken,
    },
    next: {
      ...structuredClone(current),
      revision,
      status: 'completed',
      sandboxId: commandExecutionResultExample.sandboxId,
      lease: structuredClone(staleLease),
      result: {
        ...structuredClone(commandExecutionResultExample),
        executionId: current.id,
        revision,
      },
      updatedAt: '2026-07-16T00:00:31.000Z',
    },
    idempotencyKey,
  };
}

const SQLITE_STORE_CHILD_SOURCE = String.raw`
const Module = require('node:module');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request === '@hypha/core') {
    return path.join(process.env.HYPHA_REPO_ROOT, 'packages/core/src/index.ts');
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};
const { SQLiteExecutionStore } = require(
  path.join(
    process.env.HYPHA_REPO_ROOT,
    'packages/adapters-local/src/sqlite-execution-store.ts'
  )
);
process.on('message', async ({ rootPath, operation, request }) => {
  const store = new SQLiteExecutionStore({ rootPath });
  try {
    if (operation === 'crashBeforeCompareAndSet') {
      process.exit(${CRASH_BEFORE_CAS_EXIT_CODE});
    }
    if (operation === 'crashDuringCompareAndSetTransaction') {
      const database = new DatabaseSync(path.join(rootPath, 'executions.sqlite'));
      database.exec('BEGIN IMMEDIATE');
      database
        .prepare('UPDATE execution_records SET record_json = ? WHERE execution_id = ?')
        .run(JSON.stringify(request.next), request.executionId);
      fs.writeFileSync(
        path.join(rootPath, 'uncommitted-transaction.marker'),
        'transaction-started'
      );
      process.exit(${CRASH_DURING_CAS_TRANSACTION_EXIT_CODE});
    }
    if (operation === 'crashAfterCompareAndSet') {
      await store.compareAndSet(request);
      process.exit(${CRASH_AFTER_CAS_EXIT_CODE});
    }
    if (operation === 'crashAfterAcquireLease') {
      await store.acquireLease(request);
      process.exit(${CRASH_AFTER_LEASE_ACQUIRE_EXIT_CODE});
    }
    if (operation === 'crashAfterRenewLease') {
      await store.acquireLease(request.acquire);
      await store.renewLease(request.renew);
      process.exit(${CRASH_AFTER_LEASE_RENEW_EXIT_CODE});
    }
    const result = await store[operation](request);
    process.send({ ok: true, result });
  } catch (error) {
    process.send({
      ok: false,
      error: {
        code: error && error.code,
        message: error instanceof Error ? error.message : String(error),
      },
    });
  } finally {
    await store.close();
    process.disconnect();
  }
});
process.send({ ready: true });
`;
