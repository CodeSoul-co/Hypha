import { describe, expect, it } from 'vitest';
import type {
  RuntimeCapacityAcquireRequest,
  RuntimeCapacityPolicy,
} from '../../contracts/runtime-capacity';
import { InMemoryRuntimeCapacitySemaphore } from './runtime-capacity-semaphore';

const initialTime = '2026-07-24T06:00:00.000Z';
const policy: RuntimeCapacityPolicy = {
  version: '1.0.0',
  revision: 'capacity.test.v1',
  limits: {
    model: { global: 2, perUser: 1 },
    tool: { global: 3, perUser: 2 },
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

function guard(
  lease: NonNullable<Awaited<ReturnType<InMemoryRuntimeCapacitySemaphore['acquire']>>>
) {
  return {
    leaseId: lease.id,
    ownerId: lease.ownerId,
    fencingToken: lease.fencingToken,
  };
}

describe('InMemoryRuntimeCapacitySemaphore', () => {
  it('enforces per-user and global limits without blocking another capacity kind', async () => {
    const semaphore = new InMemoryRuntimeCapacitySemaphore({ policy });
    await expect(semaphore.acquire(request('lease.1'))).resolves.toMatchObject({
      kind: 'model',
      userId: 'user.1',
      fencingToken: 1,
    });
    await expect(semaphore.acquire(request('lease.user-blocked'))).resolves.toBeNull();
    await expect(
      semaphore.acquire(request('lease.2', { userId: 'user.2' }))
    ).resolves.toMatchObject({ userId: 'user.2', fencingToken: 2 });
    await expect(
      semaphore.acquire(request('lease.global-blocked', { userId: 'user.3' }))
    ).resolves.toBeNull();
    await expect(semaphore.acquire(request('lease.tool', { kind: 'tool' }))).resolves.toMatchObject(
      { kind: 'tool' }
    );
  });

  it('renews, releases, and fences stale lease identities', async () => {
    const semaphore = new InMemoryRuntimeCapacitySemaphore({ policy });
    const lease = (await semaphore.acquire(request('lease.1')))!;
    await expect(
      semaphore.renew({
        scope: { userId: lease.userId, runId: lease.runId },
        kind: lease.kind,
        guard: guard(lease),
        renewedAt: '2026-07-24T06:00:00.500Z',
        ttlMs: 2_000,
      })
    ).resolves.toMatchObject({
      heartbeatAt: '2026-07-24T06:00:00.500Z',
      expiresAt: '2026-07-24T06:00:02.500Z',
    });
    await semaphore.release({
      scope: { userId: lease.userId, runId: lease.runId },
      kind: lease.kind,
      guard: guard(lease),
      releasedAt: '2026-07-24T06:00:01.000Z',
    });
    await expect(
      semaphore.assertCurrent({
        scope: { userId: lease.userId, runId: lease.runId },
        kind: lease.kind,
        guard: guard(lease),
        checkedAt: '2026-07-24T06:00:01.100Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });

  it('allows takeover after expiry while preserving monotonic fencing', async () => {
    const semaphore = new InMemoryRuntimeCapacitySemaphore({ policy });
    const first = (await semaphore.acquire(request('lease.execution.1', { kind: 'execution' })))!;
    const second = await semaphore.acquire(
      request('lease.execution.2', {
        kind: 'execution',
        acquiredAt: '2026-07-24T06:00:02.000Z',
      })
    );
    expect(second?.fencingToken).toBeGreaterThan(first.fencingToken);
    await expect(
      semaphore.release({
        scope: { userId: first.userId, runId: first.runId },
        kind: first.kind,
        guard: guard(first),
        releasedAt: '2026-07-24T06:00:02.100Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });

  it('reuses identical acquisition input and rejects conflicting identity reuse', async () => {
    const semaphore = new InMemoryRuntimeCapacitySemaphore({ policy });
    const input = request('lease.1');
    const first = await semaphore.acquire(input);
    await expect(semaphore.acquire(input)).resolves.toEqual(first);
    await expect(
      semaphore.acquire({ ...input, operationId: 'operation.changed' })
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
  });

  it('reports scoped usage after purging expired capacity', async () => {
    const semaphore = new InMemoryRuntimeCapacitySemaphore({ policy });
    await semaphore.acquire(request('lease.1'));
    await expect(
      semaphore.usage({
        userId: 'user.1',
        kind: 'model',
        checkedAt: '2026-07-24T06:00:00.500Z',
      })
    ).resolves.toMatchObject({
      globalActive: 1,
      userActive: 1,
      globalLimit: 2,
      userLimit: 1,
    });
    await expect(
      semaphore.usage({
        userId: 'user.1',
        kind: 'model',
        checkedAt: '2026-07-24T06:00:02.000Z',
      })
    ).resolves.toMatchObject({ globalActive: 0, userActive: 0 });
  });
});
