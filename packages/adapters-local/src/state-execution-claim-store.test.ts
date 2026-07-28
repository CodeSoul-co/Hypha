import {
  runLeaseGuard,
  stateExecutionClaimGuard,
  type RunLeaseAuthorization,
  type RunLeaseScope,
  type StateExecutionClaimAcquireRequest,
  type StateExecutionClaimScope,
} from '@hypha/core';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import { SQLiteRunLeaseStore } from './run-lease-store';
import { SQLiteStateExecutionClaimStore } from './state-execution-claim-store';
import { loadSqlite } from './sqlite-driver';

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

describe('SQLiteStateExecutionClaimStore', () => {
  const leases: SQLiteRunLeaseStore[] = [];
  const claims: SQLiteStateExecutionClaimStore[] = [];

  afterEach(() => {
    while (claims.length > 0) claims.pop()?.close();
    while (leases.length > 0) leases.pop()?.close();
  });

  it('persists the active claim and idempotent result across restart', async () => {
    const filename = temporaryDatabase();
    const setup = await openStores(filename);
    const request = acquireRequest(setup.authorization);
    const claim = await setup.claimStore.acquire(request);
    setup.claimStore.close();
    claims.splice(claims.indexOf(setup.claimStore), 1);

    const reopened = openClaimStore(filename, setup.leaseStore);
    await expect(reopened.acquire(request)).resolves.toEqual(claim);
    await expect(reopened.get(claimScope, '2026-07-18T06:00:02.000Z')).resolves.toEqual(claim);
  });

  it('persists completion as terminal across restart', async () => {
    const filename = temporaryDatabase();
    const setup = await openStores(filename);
    const claim = (await setup.claimStore.acquire(acquireRequest(setup.authorization)))!;
    await setup.claimStore.complete({
      scope: claimScope,
      guard: stateExecutionClaimGuard(claim),
      runLease: setup.authorization,
      completedAt: '2026-07-18T06:00:05.000Z',
    });
    setup.claimStore.close();
    claims.splice(claims.indexOf(setup.claimStore), 1);

    const reopened = openClaimStore(filename, setup.leaseStore);
    await expect(
      reopened.acquire(
        acquireRequest(setup.authorization, 'claim.state.2', '2026-07-18T06:00:06.000Z')
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_CONFLICT' });
  });

  it('renews within the lease, releases, and permits reassignment', async () => {
    const setup = await openStores(temporaryDatabase(), 30_000);
    const first = (await setup.claimStore.acquire(acquireRequest(setup.authorization)))!;
    const renewed = await setup.claimStore.renew({
      scope: claimScope,
      guard: stateExecutionClaimGuard(first),
      runLease: setup.authorization,
      ttlMs: 60_000,
      renewedAt: '2026-07-18T06:00:10.000Z',
    });
    expect(renewed.expiresAt).toBe('2026-07-18T06:00:30.000Z');

    const released = await setup.claimStore.release({
      scope: claimScope,
      guard: stateExecutionClaimGuard(renewed),
      runLease: setup.authorization,
      releasedAt: '2026-07-18T06:00:11.000Z',
    });
    expect(released.status).toBe('released');
    await expect(
      setup.claimStore.acquire(
        acquireRequest(setup.authorization, 'claim.state.2', '2026-07-18T06:00:12.000Z')
      )
    ).resolves.toMatchObject({ claimId: 'claim.state.2' });
  });

  it('uses replacement lease fencing and rejects the stale worker', async () => {
    const setup = await openStores(temporaryDatabase(), 20_000);
    const first = (await setup.claimStore.acquire(
      acquireRequest(setup.authorization, 'claim.state.1', '2026-07-18T06:00:01.000Z', {
        ttlMs: 60_000,
      })
    ))!;
    const nextLease = (await setup.leaseStore.acquire({
      ...runScope,
      requestedLeaseId: 'lease.run.2',
      ownerId: 'worker.2',
      ttlMs: 30_000,
      acquiredAt: '2026-07-18T06:00:20.000Z',
      idempotencyKey: 'acquire:run:2',
    }))!;
    const nextAuthorization = { scope: runScope, guard: runLeaseGuard(nextLease) };
    const second = await setup.claimStore.acquire(
      acquireRequest(nextAuthorization, 'claim.state.2', '2026-07-18T06:00:20.000Z')
    );

    expect(second?.fencingToken).toBe(nextLease.fencingToken);
    await expect(
      setup.claimStore.assertCurrent({
        scope: claimScope,
        guard: stateExecutionClaimGuard(first),
        checkedAt: '2026-07-18T06:00:21.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });

  it('serializes concurrent acquisition so exactly one worker wins', async () => {
    const setup = await openStores(temporaryDatabase());
    const results = await Promise.all(
      Array.from({ length: 10 }, (_, index) =>
        setup.claimStore.acquire(acquireRequest(setup.authorization, `claim.state.${index + 1}`))
      )
    );
    expect(results.filter((claim) => claim !== null)).toHaveLength(1);
  });

  it('persists null idempotency and rejects changed input and claim id reuse', async () => {
    const setup = await openStores(temporaryDatabase());
    const first = (await setup.claimStore.acquire(acquireRequest(setup.authorization)))!;
    const blocked = acquireRequest(
      setup.authorization,
      'claim.state.blocked',
      '2026-07-18T06:00:02.000Z'
    );
    await expect(setup.claimStore.acquire(blocked)).resolves.toBeNull();
    await expect(
      setup.claimStore.acquire({ ...blocked, expectedRunRevision: 4 })
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
    await setup.claimStore.release({
      scope: claimScope,
      guard: stateExecutionClaimGuard(first),
      runLease: setup.authorization,
      releasedAt: '2026-07-18T06:00:03.000Z',
    });
    await expect(
      setup.claimStore.acquire(
        acquireRequest(setup.authorization, first.claimId, '2026-07-18T06:00:04.000Z', {
          idempotencyKey: 'acquire:claim-id-reuse',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
  });

  it('isolates identical state attempts across tenant and user scopes', async () => {
    const setup = await openStores(temporaryDatabase());
    const otherRunScope = { ...runScope, tenantId: 'tenant.other', userId: 'user.other' };
    const otherLease = (await setup.leaseStore.acquire({
      ...otherRunScope,
      requestedLeaseId: 'lease.other',
      ownerId: 'worker.other',
      ttlMs: 60_000,
      acquiredAt: '2026-07-18T06:00:00.000Z',
      idempotencyKey: 'acquire:run:other',
    }))!;
    const otherAuthorization = { scope: otherRunScope, guard: runLeaseGuard(otherLease) };
    const [firstClaim, otherClaim] = await Promise.all([
      setup.claimStore.acquire(acquireRequest(setup.authorization)),
      setup.claimStore.acquire({
        ...acquireRequest(otherAuthorization, 'claim.other'),
        tenantId: otherRunScope.tenantId,
        userId: otherRunScope.userId,
      }),
    ]);
    expect(firstClaim?.claimId).toBe('claim.state.1');
    expect(otherClaim?.claimId).toBe('claim.other');
  });

  it('rejects a tampered persisted claim after restart', async () => {
    const filename = temporaryDatabase();
    const setup = await openStores(filename);
    await setup.claimStore.acquire(acquireRequest(setup.authorization));
    setup.claimStore.close();
    claims.splice(claims.indexOf(setup.claimStore), 1);

    const sqlite = loadSqlite(true);
    if (!sqlite) throw new Error('SQLite driver is unavailable');
    const db = new sqlite.DatabaseSync(filename);
    const row = db
      .prepare('SELECT current_json FROM runtime_state_claim_slots WHERE run_id = ?')
      .get(claimScope.runId);
    const changed = JSON.parse(String(row?.current_json)) as Record<string, unknown>;
    changed.ownerId = 'worker.tampered';
    db.prepare('UPDATE runtime_state_claim_slots SET current_json = ? WHERE run_id = ?').run(
      JSON.stringify(changed),
      claimScope.runId
    );
    db.close?.();

    const reopened = openClaimStore(filename, setup.leaseStore);
    await expect(reopened.get(claimScope, '2026-07-18T06:00:02.000Z')).rejects.toMatchObject({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
    });
  });

  async function openStores(filename: string, leaseTtlMs = 60_000) {
    const leaseStore = new SQLiteRunLeaseStore({ filename });
    leases.push(leaseStore);
    const lease = (await leaseStore.acquire({
      ...runScope,
      requestedLeaseId: 'lease.run.1',
      ownerId: 'worker.1',
      ttlMs: leaseTtlMs,
      acquiredAt: '2026-07-18T06:00:00.000Z',
      idempotencyKey: 'acquire:run:1',
    }))!;
    const authorization: RunLeaseAuthorization = {
      scope: runScope,
      guard: runLeaseGuard(lease),
    };
    return {
      leaseStore,
      claimStore: openClaimStore(filename, leaseStore),
      authorization,
    };
  }

  function openClaimStore(
    filename: string,
    leaseStore: SQLiteRunLeaseStore
  ): SQLiteStateExecutionClaimStore {
    const store = new SQLiteStateExecutionClaimStore({
      filename,
      runLeaseStore: leaseStore,
      now: () => '2026-07-18T06:00:02.000Z',
    });
    claims.push(store);
    return store;
  }
});

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

function temporaryDatabase(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-state-claim-'));
  return path.join(root, 'runtime.sqlite');
}
