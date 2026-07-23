import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type {
  ExecutionLeaseAcquireRequest,
  ExecutionRecord,
  ExecutionRecordCompareAndSetRequest,
  ExecutionStore,
} from '@hypha/core';
import {
  commandExecutionResultExample,
  executionLeaseAcquireRequestExample,
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

  it(
    'allows only one compare-and-set across independent processes',
    async () => {
      root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-sqlite-execution-cas-'));
      const first = new SQLiteExecutionStore({ rootPath: root });
      const queued = await first.create(structuredClone(executionRecordCreateRequestExample));
      const mutation = {
        operationId: 'operation.execution.update.first',
        executionId: queued.id,
        expectedRevision: queued.revision,
        next: {
          ...queued,
          revision: queued.revision + 1,
          status: 'starting' as const,
          attempt: 1,
          updatedAt: '2026-07-16T00:00:01.000Z',
        },
        idempotencyKey: 'execution-update:first',
      };
      const competing = structuredClone(mutation);
      competing.operationId = 'operation.execution.update.competing';
      competing.idempotencyKey = 'execution-update:competing';

      try {
        const results = await Promise.allSettled([
          first.compareAndSet(mutation),
          runStoreOperationInChild(root, 'compareAndSet', competing),
        ]);

        expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
        expect(results.filter((result) => result.status === 'rejected')).toHaveLength(1);
        const rejected = results.find(
          (result): result is PromiseRejectedResult => result.status === 'rejected'
        );
        expect(rejected?.reason).toMatchObject({ code: 'EXECUTION_STORE_REVISION_CONFLICT' });
        await expect(first.get(queued.id)).resolves.toMatchObject({
          revision: 1,
          status: 'starting',
        });
      } finally {
        await first.close();
      }
    },
    20_000
  );

  it(
    'fences an expired lease takeover across independent processes',
    async () => {
      root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-sqlite-execution-lease-'));
      const first = new SQLiteExecutionStore({ rootPath: root });
      try {
        await first.create(structuredClone(executionRecordCreateRequestExample));
        const acquired = await first.acquireLease(
          structuredClone(executionLeaseAcquireRequestExample)
        );

        const takeover = await runStoreOperationInChild<typeof acquired>(
          root,
          'acquireLease',
          {
            ...structuredClone(executionLeaseAcquireRequestExample),
            operationId: 'operation.lease.acquire.takeover',
            expectedRevision: acquired.revision,
            requestedLeaseId: 'lease.execution.example.takeover',
            ownerId: 'runtime-worker.takeover',
            acquiredAt: acquired.lease!.expiresAt,
            idempotencyKey: 'lease-acquire:takeover',
          }
        );

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
    },
    20_000
  );

  it(
    'recovers atomically when a worker crashes immediately before or after compare-and-set',
    async () => {
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
      const afterCrashRecovery = new SQLiteExecutionStore({ rootPath: root });
      await expect(afterCrashRecovery.get(queued.id)).resolves.toEqual(mutation.next);
      await afterCrashRecovery.close();
    },
    20_000
  );

  it(
    'takes over an expired lease after its worker crashes and rejects the late result',
    async () => {
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
    },
    20_000
  );
});

type ChildStoreOperation = 'acquireLease' | 'compareAndSet';
type ChildStoreCrashOperation =
  | 'crashAfterAcquireLease'
  | 'crashAfterCompareAndSet'
  | 'crashBeforeCompareAndSet';

const CRASH_BEFORE_CAS_EXIT_CODE = 71;
const CRASH_AFTER_CAS_EXIT_CODE = 72;
const CRASH_AFTER_LEASE_ACQUIRE_EXIT_CODE = 73;

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
  let settled = false;
  child.stderr?.setEncoding('utf8');
  child.stderr?.on('data', (chunk: string) => {
    stderr += chunk;
  });

  return new Promise<T>((resolve, reject) => {
    child.on('error', reject);
    child.on('message', (message: ChildStoreResponse<T>) => {
      if (message.ready) {
        child.send({ rootPath, operation, request });
        return;
      }
      settled = true;
      if (message.ok) {
        resolve(message.result as T);
        return;
      }
      reject(
        Object.assign(new Error(message.error?.message ?? 'SQLite child operation failed.'), {
          code: message.error?.code,
        })
      );
    });
    child.on('exit', (code) => {
      if (!settled) {
        reject(new Error(`SQLite child exited with code ${code}: ${stderr.trim()}`));
      }
    });
  });
}

async function runStoreCrashInChild(
  rootPath: string,
  operation: ChildStoreCrashOperation,
  request: ExecutionLeaseAcquireRequest | ExecutionRecordCompareAndSetRequest,
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
const path = require('node:path');
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
    if (operation === 'crashAfterCompareAndSet') {
      await store.compareAndSet(request);
      process.exit(${CRASH_AFTER_CAS_EXIT_CODE});
    }
    if (operation === 'crashAfterAcquireLease') {
      await store.acquireLease(request);
      process.exit(${CRASH_AFTER_LEASE_ACQUIRE_EXIT_CODE});
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
