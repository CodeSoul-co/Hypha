import type {
  RuntimeCapacityAcquireRequest,
  RuntimeCapacityLease,
  RuntimeCapacityPolicy,
} from '@codesoul-co/hypha-core';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import { SQLiteRuntimeCapacitySemaphore } from './runtime-capacity-semaphore';

const initialTime = '2026-07-24T06:00:00.000Z';
const policy: RuntimeCapacityPolicy = {
  version: '1.0.0',
  revision: 'capacity.sqlite.test.v1',
  limits: {
    model: { global: 2, perUser: 1 },
    tool: { global: 2, perUser: 2 },
    execution: { global: 1, perUser: 1 },
  },
};

function request(
  id: string,
  overrides: Partial<RuntimeCapacityAcquireRequest> = {}
): RuntimeCapacityAcquireRequest {
  return {
    requestedLeaseId: id,
    userId: 'user.1',
    runId: `run.${id}`,
    kind: 'model',
    operationId: `operation.${id}`,
    ownerId: 'worker.1',
    acquiredAt: initialTime,
    ttlMs: 1_000,
    idempotencyKey: `idempotency.${id}`,
    ...overrides,
  };
}

function guard(lease: RuntimeCapacityLease) {
  return {
    leaseId: lease.id,
    ownerId: lease.ownerId,
    fencingToken: lease.fencingToken,
  };
}

describe('SQLiteRuntimeCapacitySemaphore', () => {
  const semaphores: SQLiteRuntimeCapacitySemaphore[] = [];

  afterEach(() => {
    while (semaphores.length > 0) semaphores.pop()?.close();
  });

  it('atomically enforces global and per-user capacity across connections', async () => {
    const filename = temporaryDatabase();
    const first = open(filename);
    const second = open(filename);
    await expect(first.acquire(request('lease.1'))).resolves.toMatchObject({
      fencingToken: 1,
    });
    await expect(second.acquire(request('lease.user-blocked'))).resolves.toBeNull();
    await expect(second.acquire(request('lease.2', { userId: 'user.2' }))).resolves.toMatchObject({
      fencingToken: 2,
    });
    await expect(
      first.acquire(request('lease.global-blocked', { userId: 'user.3' }))
    ).resolves.toBeNull();
  });

  it('persists acquisition idempotency and fencing high-water across restart', async () => {
    const filename = temporaryDatabase();
    const first = open(filename);
    const input = request('lease.1');
    const lease = await first.acquire(input);
    first.close();
    semaphores.splice(semaphores.indexOf(first), 1);

    const reopened = open(filename);
    await expect(reopened.acquire(input)).resolves.toEqual(lease);
    await reopened.release({
      scope: { userId: lease!.userId, runId: lease!.runId },
      kind: lease!.kind,
      guard: guard(lease!),
      releasedAt: '2026-07-24T06:00:00.500Z',
    });
    await expect(
      reopened.acquire(request('lease.2', { acquiredAt: '2026-07-24T06:00:00.600Z' }))
    ).resolves.toMatchObject({ fencingToken: 2 });
  });

  it('allows expired takeover and rejects a stale holder after restart', async () => {
    const filename = temporaryDatabase();
    const first = open(filename);
    const stale = (await first.acquire(request('lease.1', { kind: 'execution' })))!;
    first.close();
    semaphores.splice(semaphores.indexOf(first), 1);

    const reopened = open(filename);
    const current = await reopened.acquire(
      request('lease.2', {
        kind: 'execution',
        acquiredAt: '2026-07-24T06:00:02.000Z',
      })
    );
    expect(current?.fencingToken).toBeGreaterThan(stale.fencingToken);
    await expect(
      reopened.renew({
        scope: { userId: stale.userId, runId: stale.runId },
        kind: stale.kind,
        guard: guard(stale),
        renewedAt: '2026-07-24T06:00:02.100Z',
        ttlMs: 1_000,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });

  it('fails closed when another process uses a different capacity policy', () => {
    const filename = temporaryDatabase();
    open(filename);
    expect(
      () =>
        new SQLiteRuntimeCapacitySemaphore({
          filename,
          policy: {
            ...policy,
            revision: 'capacity.sqlite.test.v2',
          },
        })
    ).toThrowError(
      expect.objectContaining({
        code: 'RUNTIME_RESOURCE_CONFLICT',
      })
    );
  });

  it('reports durable usage independently for each capacity kind', async () => {
    const semaphore = open(temporaryDatabase());
    await semaphore.acquire(request('lease.model'));
    await semaphore.acquire(request('lease.tool', { kind: 'tool' }));
    await expect(
      semaphore.usage({
        userId: 'user.1',
        kind: 'model',
        checkedAt: '2026-07-24T06:00:00.500Z',
      })
    ).resolves.toMatchObject({ globalActive: 1, userActive: 1 });
    await expect(
      semaphore.usage({
        userId: 'user.1',
        kind: 'execution',
        checkedAt: '2026-07-24T06:00:00.500Z',
      })
    ).resolves.toMatchObject({ globalActive: 0, userActive: 0 });
  });

  function open(filename: string): SQLiteRuntimeCapacitySemaphore {
    const semaphore = new SQLiteRuntimeCapacitySemaphore({ filename, policy });
    semaphores.push(semaphore);
    return semaphore;
  }
});

function temporaryDatabase(): string {
  return path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-capacity-')), 'capacity.sqlite');
}
