import { describe, expect, it } from 'vitest';
import type {
  ResourceAcquireRequest,
  RunLeaseAuthorization,
  RunLeaseScope,
} from '../../contracts/runtime-coordination';
import { InMemoryRuntimeResourceCoordinator, resourceClaimGuard } from './resource-coordinator';
import { InMemoryRunLeaseStore, runLeaseGuard } from './run-lease-store';

const baseScope: RunLeaseScope = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  runId: 'run.1',
  partitionKey: 'session:tenant.example:user.example:session.example',
};

async function setup() {
  const runLeaseStore = new InMemoryRunLeaseStore();
  const authorization1 = await acquireRun(runLeaseStore, baseScope, 'lease.run.1', 'worker.1');
  const scope2 = { ...baseScope, runId: 'run.2' };
  const authorization2 = await acquireRun(runLeaseStore, scope2, 'lease.run.2', 'worker.2');
  return {
    runLeaseStore,
    authorization1,
    authorization2,
    coordinator: new InMemoryRuntimeResourceCoordinator({ runLeaseStore }),
  };
}

async function acquireRun(
  store: InMemoryRunLeaseStore,
  scope: RunLeaseScope,
  leaseId: string,
  ownerId: string
): Promise<RunLeaseAuthorization> {
  const lease = (await store.acquire({
    ...scope,
    requestedLeaseId: leaseId,
    ownerId,
    ttlMs: 120_000,
    acquiredAt: '2026-07-18T06:00:00.000Z',
    idempotencyKey: `acquire:${leaseId}`,
  }))!;
  return { scope, guard: runLeaseGuard(lease) };
}

function acquireRequest(
  runLease: RunLeaseAuthorization,
  claimId: string,
  resourceKey: string,
  mode: 'shared' | 'exclusive',
  overrides: Partial<ResourceAcquireRequest> = {}
): ResourceAcquireRequest {
  return {
    runLease,
    stateId: 'state.plan',
    resources: [
      {
        requestedClaimId: claimId,
        resourceType: 'workspace',
        resourceKey,
        mode,
      },
    ],
    ttlMs: 30_000,
    acquiredAt: '2026-07-18T06:00:01.000Z',
    idempotencyKey: `acquire:${claimId}`,
    ...overrides,
  };
}

function listRequest(resourceKey: string, checkedAt = '2026-07-18T06:00:02.000Z') {
  return {
    tenantId: baseScope.tenantId,
    resourceType: 'workspace' as const,
    resourceKey,
    checkedAt,
  };
}

describe('InMemoryRuntimeResourceCoordinator', () => {
  it('reuses idempotent acquisitions and rejects incompatible exclusive claims', async () => {
    const { coordinator, authorization1, authorization2 } = await setup();
    const request = acquireRequest(
      authorization1,
      'claim.resource.1',
      'workspace:example',
      'exclusive'
    );
    const first = await coordinator.acquire(request);

    expect(await coordinator.acquire(request)).toEqual(first);
    expect(
      await coordinator.list(listRequest('workspace:example', '2026-07-18T06:00:00.000Z'))
    ).toEqual([]);
    await expect(
      coordinator.acquire(
        acquireRequest(authorization2, 'claim.resource.2', 'workspace:example', 'shared')
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_RESOURCE_CONFLICT' });
  });

  it('allows shared claims in one epoch and increments fencing for the next owner', async () => {
    const { coordinator, authorization1, authorization2 } = await setup();
    const [first] = await coordinator.acquire(
      acquireRequest(authorization1, 'claim.resource.1', 'workspace:shared', 'shared')
    );
    const [second] = await coordinator.acquire(
      acquireRequest(authorization2, 'claim.resource.2', 'workspace:shared', 'shared')
    );

    expect(first.fencingToken).toBe(1);
    expect(second.fencingToken).toBe(1);
    await coordinator.release({
      runLease: authorization1,
      claimIds: [first.id],
      releasedAt: '2026-07-18T06:00:03.000Z',
    });
    await coordinator.release({
      runLease: authorization2,
      claimIds: [second.id],
      releasedAt: '2026-07-18T06:00:03.000Z',
    });

    const [exclusive] = await coordinator.acquire(
      acquireRequest(authorization1, 'claim.resource.3', 'workspace:shared', 'exclusive', {
        acquiredAt: '2026-07-18T06:00:04.000Z',
      })
    );
    expect(exclusive.fencingToken).toBe(2);
  });

  it('does not retain partial claims when a multi-resource acquisition conflicts', async () => {
    const { coordinator, authorization1, authorization2 } = await setup();
    await coordinator.acquire(
      acquireRequest(authorization1, 'claim.blocked', 'workspace:blocked', 'exclusive')
    );

    await expect(
      coordinator.acquire({
        ...acquireRequest(authorization2, 'unused', 'workspace:unused', 'exclusive'),
        resources: [
          {
            requestedClaimId: 'claim.free',
            resourceType: 'workspace',
            resourceKey: 'workspace:free',
            mode: 'exclusive',
          },
          {
            requestedClaimId: 'claim.conflict',
            resourceType: 'workspace',
            resourceKey: 'workspace:blocked',
            mode: 'exclusive',
          },
        ],
        idempotencyKey: 'acquire:atomic-conflict',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_RESOURCE_CONFLICT' });
    expect(await coordinator.list(listRequest('workspace:free'))).toEqual([]);
  });

  it('expires claims, advances the resource epoch, and rejects stale guards', async () => {
    const { coordinator, authorization1, authorization2 } = await setup();
    const [first] = await coordinator.acquire(
      acquireRequest(authorization1, 'claim.resource.1', 'workspace:expiry', 'exclusive', {
        ttlMs: 9_000,
      })
    );
    const [second] = await coordinator.acquire(
      acquireRequest(authorization2, 'claim.resource.2', 'workspace:expiry', 'exclusive', {
        acquiredAt: '2026-07-18T06:00:10.000Z',
      })
    );

    expect(second.fencingToken).toBe(first.fencingToken + 1);
    await expect(
      coordinator.assertCurrent({
        ...listRequest('workspace:expiry', '2026-07-18T06:00:11.000Z'),
        ...resourceClaimGuard(first),
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
    await expect(
      coordinator.assertCurrent({
        ...listRequest('workspace:expiry', '2026-07-18T06:00:11.000Z'),
        ...resourceClaimGuard(second),
      })
    ).resolves.toEqual(second);
  });

  it('renews and releases claim batches atomically', async () => {
    const { coordinator, authorization1 } = await setup();
    const claims = await coordinator.acquire({
      ...acquireRequest(authorization1, 'unused', 'workspace:unused', 'exclusive'),
      resources: [
        {
          requestedClaimId: 'claim.resource.1',
          resourceType: 'workspace',
          resourceKey: 'workspace:a',
          mode: 'exclusive',
        },
        {
          requestedClaimId: 'claim.resource.2',
          resourceType: 'artifact',
          resourceKey: 'artifact:b',
          mode: 'exclusive',
        },
      ],
      idempotencyKey: 'acquire:batch',
    });

    await expect(
      coordinator.release({
        runLease: authorization1,
        claimIds: [claims[0].id, 'claim.missing'],
        releasedAt: '2026-07-18T06:00:02.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
    expect(await coordinator.list(listRequest('workspace:a'))).toHaveLength(1);

    const renewed = await coordinator.renew({
      runLease: authorization1,
      claimIds: claims.map((claim) => claim.id),
      ttlMs: 60_000,
      renewedAt: '2026-07-18T06:00:03.000Z',
    });
    expect(new Set(renewed.map((claim) => claim.expiresAt))).toEqual(
      new Set(['2026-07-18T06:01:03.000Z'])
    );
  });

  it('sorts multi-resource acquisition and rejects duplicate resource identities', async () => {
    const { coordinator, authorization1 } = await setup();
    const claims = await coordinator.acquire({
      ...acquireRequest(authorization1, 'unused', 'workspace:unused', 'exclusive'),
      resources: [
        {
          requestedClaimId: 'claim.z',
          resourceType: 'workspace',
          resourceKey: 'workspace:z',
          mode: 'exclusive',
        },
        {
          requestedClaimId: 'claim.a',
          resourceType: 'artifact',
          resourceKey: 'artifact:a',
          mode: 'exclusive',
        },
      ],
      idempotencyKey: 'acquire:sorted',
    });
    expect(claims.map((claim) => claim.id)).toEqual(['claim.a', 'claim.z']);

    await expect(
      coordinator.acquire({
        ...acquireRequest(authorization1, 'unused.2', 'workspace:unused.2', 'shared'),
        resources: [
          {
            requestedClaimId: 'claim.dup.1',
            resourceType: 'custom',
            resourceKey: 'custom:dup',
            mode: 'shared',
          },
          {
            requestedClaimId: 'claim.dup.2',
            resourceType: 'custom',
            resourceKey: 'custom:dup',
            mode: 'shared',
          },
        ],
      })
    ).rejects.toThrow('only once');
  });

  it('rejects non-JSON resource metadata before retaining a claim', async () => {
    const { coordinator, authorization1 } = await setup();
    await expect(
      coordinator.acquire({
        ...acquireRequest(
          authorization1,
          'claim.invalid-metadata',
          'workspace:metadata',
          'exclusive'
        ),
        resources: [
          {
            requestedClaimId: 'claim.invalid-metadata',
            resourceType: 'workspace',
            resourceKey: 'workspace:metadata',
            mode: 'exclusive',
            metadata: { value: undefined },
          },
        ],
      })
    ).rejects.toThrow();
    expect(await coordinator.list(listRequest('workspace:metadata'))).toEqual([]);
  });
});
