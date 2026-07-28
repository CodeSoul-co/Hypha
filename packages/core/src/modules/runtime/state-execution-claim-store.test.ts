import { describe, expect, it } from 'vitest';
import type {
  RunLeaseAuthorization,
  RunLeaseScope,
  StateExecutionClaimAcquireRequest,
  StateExecutionClaimScope,
} from '../../contracts/runtime-coordination';
import { InMemoryRunLeaseStore, runLeaseGuard } from './run-lease-store';
import {
  InMemoryStateExecutionClaimStore,
  stateExecutionClaimGuard,
} from './state-execution-claim-store';

const runScope: RunLeaseScope = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  runId: 'run.example',
  partitionKey: 'session:tenant.example:user.example:session.example',
};

const claimScope: StateExecutionClaimScope = {
  tenantId: runScope.tenantId,
  userId: runScope.userId,
  runId: runScope.runId,
  stateId: 'state.plan',
  stateAttempt: 1,
};

async function setup(ttlMs = 60_000) {
  const runLeaseStore = new InMemoryRunLeaseStore();
  const lease = (await runLeaseStore.acquire({
    ...runScope,
    requestedLeaseId: 'lease.run.1',
    ownerId: 'worker.1',
    ttlMs,
    acquiredAt: '2026-07-18T06:00:00.000Z',
    idempotencyKey: 'acquire:run:1',
  }))!;
  const authorization: RunLeaseAuthorization = {
    scope: runScope,
    guard: runLeaseGuard(lease),
  };
  return {
    runLeaseStore,
    lease,
    authorization,
    store: new InMemoryStateExecutionClaimStore({ runLeaseStore }),
  };
}

function acquireRequest(
  authorization: RunLeaseAuthorization,
  claimId = 'claim.state.1',
  acquiredAt = '2026-07-18T06:00:01.000Z',
  overrides: Partial<StateExecutionClaimAcquireRequest> = {}
): StateExecutionClaimAcquireRequest {
  return {
    ...claimScope,
    requestedClaimId: claimId,
    processRevision: 'process.example@1.0.0',
    expectedRunRevision: 3,
    runLease: authorization,
    ttlMs: 20_000,
    acquiredAt,
    idempotencyKey: `acquire:${claimId}`,
    ...overrides,
  };
}

describe('InMemoryStateExecutionClaimStore', () => {
  it('allows one active claim and reuses an idempotent acquisition', async () => {
    const { store, authorization } = await setup();
    const request = acquireRequest(authorization);
    const claim = await store.acquire(request);

    expect(await store.acquire(request)).toEqual(claim);
    expect(await store.get(claimScope, '2026-07-18T06:00:00.000Z')).toBeNull();
    expect(
      await store.acquire(
        acquireRequest(authorization, 'claim.state.2', '2026-07-18T06:00:02.000Z')
      )
    ).toBeNull();
  });

  it('makes a completed attempt terminal', async () => {
    const { store, authorization } = await setup();
    const claim = (await store.acquire(acquireRequest(authorization)))!;
    const completed = await store.complete({
      scope: claimScope,
      guard: stateExecutionClaimGuard(claim),
      runLease: authorization,
      completedAt: '2026-07-18T06:00:05.000Z',
    });

    expect(completed.status).toBe('completed');
    await expect(
      store.acquire(acquireRequest(authorization, 'claim.state.2', '2026-07-18T06:00:06.000Z'))
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_CONFLICT' });
  });

  it('renews within the run lease, releases, and permits reassignment', async () => {
    const { store, authorization } = await setup(30_000);
    const claim = (await store.acquire(acquireRequest(authorization)))!;
    const renewed = await store.renew({
      scope: claimScope,
      guard: stateExecutionClaimGuard(claim),
      runLease: authorization,
      ttlMs: 60_000,
      renewedAt: '2026-07-18T06:00:10.000Z',
    });
    expect(renewed.expiresAt).toBe('2026-07-18T06:00:30.000Z');

    const released = await store.release({
      scope: claimScope,
      guard: stateExecutionClaimGuard(renewed),
      runLease: authorization,
      releasedAt: '2026-07-18T06:00:11.000Z',
    });
    expect(released.status).toBe('released');
    await expect(
      store.acquire(acquireRequest(authorization, 'claim.state.2', '2026-07-18T06:00:12.000Z'))
    ).resolves.toMatchObject({ claimId: 'claim.state.2' });
  });

  it('uses a new run fencing token after expiry and rejects the old worker', async () => {
    const { store, runLeaseStore, lease, authorization } = await setup(20_000);
    const first = (await store.acquire(
      acquireRequest(authorization, 'claim.state.1', '2026-07-18T06:00:01.000Z', { ttlMs: 60_000 })
    ))!;
    const nextLease = (await runLeaseStore.acquire({
      ...runScope,
      requestedLeaseId: 'lease.run.2',
      ownerId: 'worker.2',
      ttlMs: 30_000,
      acquiredAt: '2026-07-18T06:00:20.000Z',
      idempotencyKey: 'acquire:run:2',
    }))!;
    const nextAuthorization = { scope: runScope, guard: runLeaseGuard(nextLease) };
    const second = await store.acquire(
      acquireRequest(nextAuthorization, 'claim.state.2', '2026-07-18T06:00:20.000Z')
    );

    expect(first.fencingToken).toBe(lease.fencingToken);
    expect(second?.fencingToken).toBe(nextLease.fencingToken);
    await expect(
      store.assertCurrent({
        scope: claimScope,
        guard: stateExecutionClaimGuard(first),
        checkedAt: '2026-07-18T06:00:21.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });

  it('serializes concurrent acquisition and validates run scope ownership', async () => {
    const { store, authorization } = await setup();
    const claims = await Promise.all(
      Array.from({ length: 8 }, (_, index) =>
        store.acquire(acquireRequest(authorization, `claim.state.${index}`))
      )
    );
    expect(claims.filter((claim) => claim !== null)).toHaveLength(1);

    const otherAuthorization = {
      ...authorization,
      scope: { ...authorization.scope, userId: 'user.other' },
    };
    await expect(
      store.acquire({
        ...acquireRequest(otherAuthorization, 'claim.invalid'),
        stateAttempt: 2,
      })
    ).rejects.toThrow('scope must match');
  });
});
