import { describe, expect, it } from 'vitest';
import type { RunLeaseAcquireRequest, RunLeaseScope } from '../../contracts/runtime-coordination';
import { InMemoryRunLeaseStore, runLeaseGuard } from './run-lease-store';

const scope: RunLeaseScope = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  runId: 'run.example',
  partitionKey: 'session:tenant.example:user.example:session.example',
};

function acquireRequest(
  leaseId: string,
  ownerId: string,
  acquiredAt: string,
  overrides: Partial<RunLeaseAcquireRequest> = {}
): RunLeaseAcquireRequest {
  return {
    ...scope,
    requestedLeaseId: leaseId,
    ownerId,
    ttlMs: 30_000,
    acquiredAt,
    idempotencyKey: `acquire:${leaseId}`,
    ...overrides,
  };
}

describe('InMemoryRunLeaseStore', () => {
  it('allows one active owner and reuses an idempotent acquisition result', async () => {
    const store = new InMemoryRunLeaseStore();
    const request = acquireRequest('lease.1', 'worker.1', '2026-07-18T06:00:00.000Z');

    const lease = await store.acquire(request);
    const reused = await store.acquire(request);
    const blocked = await store.acquire(
      acquireRequest('lease.2', 'worker.2', '2026-07-18T06:00:01.000Z')
    );

    expect(lease).not.toBeNull();
    expect(reused).toEqual(lease);
    expect(blocked).toBeNull();
    expect(await store.get(scope, '2026-07-18T05:59:59.000Z')).toBeNull();
    expect(await store.get(scope, '2026-07-18T06:00:02.000Z')).toEqual(lease);
    await expect(
      store.assertCurrent({
        scope,
        guard: runLeaseGuard(lease!),
        checkedAt: '2026-07-18T05:59:59.000Z',
      })
    ).rejects.toThrow('must not precede acquiredAt');
  });

  it('increments fencing tokens on expired takeover and rejects the stale worker', async () => {
    const store = new InMemoryRunLeaseStore();
    const first = await store.acquire(
      acquireRequest('lease.1', 'worker.1', '2026-07-18T06:00:00.000Z')
    );
    const second = await store.acquire(
      acquireRequest('lease.2', 'worker.2', '2026-07-18T06:00:30.000Z')
    );

    expect(first?.fencingToken).toBe(1);
    expect(second?.fencingToken).toBe(2);
    await expect(
      store.heartbeat({
        scope,
        guard: runLeaseGuard(first!),
        ttlMs: 30_000,
        heartbeatAt: '2026-07-18T06:00:31.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
    await expect(
      store.assertCurrent({
        scope,
        guard: runLeaseGuard(first!),
        checkedAt: '2026-07-18T06:00:31.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
    await expect(
      store.assertCurrent({
        scope,
        guard: runLeaseGuard(second!),
        checkedAt: '2026-07-18T06:00:31.000Z',
      })
    ).resolves.toEqual(second);
  });

  it('heartbeats, releases, and preserves fencing high-water marks', async () => {
    const store = new InMemoryRunLeaseStore();
    const first = (await store.acquire(
      acquireRequest('lease.1', 'worker.1', '2026-07-18T06:00:00.000Z')
    ))!;
    const renewed = await store.heartbeat({
      scope,
      guard: runLeaseGuard(first),
      ttlMs: 45_000,
      heartbeatAt: '2026-07-18T06:00:10.000Z',
    });

    expect(renewed).toMatchObject({ revision: 2, fencingToken: 1 });
    expect(renewed.expiresAt).toBe('2026-07-18T06:00:55.000Z');
    await store.release({
      scope,
      guard: runLeaseGuard(renewed),
      releasedAt: '2026-07-18T06:00:20.000Z',
    });
    expect(await store.get(scope, '2026-07-18T06:00:21.000Z')).toBeNull();

    const next = await store.acquire(
      acquireRequest('lease.2', 'worker.2', '2026-07-18T06:00:21.000Z')
    );
    expect(next).toMatchObject({ revision: 3, fencingToken: 2 });
  });

  it('serializes concurrent acquisition so exactly one worker wins', async () => {
    const store = new InMemoryRunLeaseStore();
    const leases = await Promise.all(
      Array.from({ length: 10 }, (_, index) =>
        store.acquire(
          acquireRequest(`lease.${index}`, `worker.${index}`, '2026-07-18T06:00:00.000Z')
        )
      )
    );

    expect(leases.filter((lease) => lease !== null)).toHaveLength(1);
  });

  it('rejects partition changes and lease id reuse', async () => {
    const store = new InMemoryRunLeaseStore();
    const first = (await store.acquire(
      acquireRequest('lease.1', 'worker.1', '2026-07-18T06:00:00.000Z')
    ))!;
    await store.release({
      scope,
      guard: runLeaseGuard(first),
      releasedAt: '2026-07-18T06:00:01.000Z',
    });

    await expect(
      store.acquire(
        acquireRequest('lease.2', 'worker.2', '2026-07-18T06:00:02.000Z', {
          partitionKey: 'workspace:different',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_CONFLICT' });
    await expect(
      store.acquire(
        acquireRequest('lease.1', 'worker.2', '2026-07-18T06:00:02.000Z', {
          idempotencyKey: 'acquire:lease.1:again',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
  });

  it('isolates identical run ids across tenant and user scopes', async () => {
    const store = new InMemoryRunLeaseStore();
    const otherScope = { ...scope, tenantId: 'tenant.other', userId: 'user.other' };

    const [first, second] = await Promise.all([
      store.acquire(acquireRequest('lease.1', 'worker.1', '2026-07-18T06:00:00.000Z')),
      store.acquire({
        ...acquireRequest('lease.2', 'worker.2', '2026-07-18T06:00:00.000Z'),
        ...otherScope,
      }),
    ]);

    expect(first?.fencingToken).toBe(1);
    expect(second?.fencingToken).toBe(1);
  });
});
