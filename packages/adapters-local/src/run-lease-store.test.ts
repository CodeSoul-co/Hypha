import { afterEach, describe, expect, it } from 'vitest';
import { runLeaseGuard, type RunLeaseAcquireRequest, type RunLeaseScope } from '@hypha/core';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { SQLiteRunLeaseStore } from './run-lease-store';
import { loadSqlite } from './sqlite-driver';

const scope: RunLeaseScope = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  runId: 'run.example',
  partitionKey: 'session:tenant.example:user.example:session.example',
};

describe('SQLiteRunLeaseStore', () => {
  const stores: SQLiteRunLeaseStore[] = [];

  afterEach(() => {
    while (stores.length > 0) stores.pop()?.close();
  });

  it('persists ownership and idempotent acquisition across restart', async () => {
    const filename = temporaryDatabase();
    const request = acquireRequest('lease.1', 'worker.1', '2026-07-18T06:00:00.000Z');
    const firstStore = openStore(filename);
    const lease = await firstStore.acquire(request);
    firstStore.close();
    stores.splice(stores.indexOf(firstStore), 1);

    const reopened = openStore(filename);
    await expect(reopened.acquire(request)).resolves.toEqual(lease);
    await expect(reopened.get(scope, '2026-07-18T06:00:02.000Z')).resolves.toEqual(lease);
    await expect(
      reopened.acquire(acquireRequest('lease.2', 'worker.2', '2026-07-18T06:00:02.000Z'))
    ).resolves.toBeNull();
  });

  it('increments fencing after expiry and permanently rejects the stale worker', async () => {
    const filename = temporaryDatabase();
    const store = openStore(filename);
    const first = await store.acquire(
      acquireRequest('lease.1', 'worker.1', '2026-07-18T06:00:00.000Z')
    );
    await expect(store.getStored(scope)).resolves.toMatchObject({
      id: first!.id,
      fencingToken: first!.fencingToken,
    });
    await expect(store.get(scope, '2026-07-18T06:00:30.000Z')).resolves.toBeNull();
    const second = await store.acquire(
      acquireRequest('lease.2', 'worker.2', '2026-07-18T06:00:30.000Z')
    );

    expect(first?.fencingToken).toBe(1);
    expect(second).toMatchObject({ fencingToken: 2, revision: 2 });
    await expect(
      store.heartbeat({
        scope,
        guard: runLeaseGuard(first!),
        ttlMs: 30_000,
        heartbeatAt: '2026-07-18T06:00:31.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });

  it('preempts only through the validated cancellation command and reuses its result', async () => {
    const store = openStore(temporaryDatabase());
    const first = await store.acquire(
      acquireRequest('lease.active', 'worker.active', '2026-07-18T06:00:00.000Z')
    );
    const request = {
      ...acquireRequest('lease.cancel', 'worker.cancel', '2026-07-18T06:00:01.000Z', {
        idempotencyKey: 'preempt:cancel',
      }),
      reason: 'cancellation' as const,
    };

    const cancellation = await store.preempt(request);
    await expect(store.preempt(request)).resolves.toEqual(cancellation);
    expect(cancellation).toMatchObject({ fencingToken: 2, revision: 2 });
    await expect(
      store.assertCurrent({
        scope,
        guard: runLeaseGuard(first!),
        checkedAt: '2026-07-18T06:00:02.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });

  it('heartbeats, releases, and preserves high-water marks across restart', async () => {
    const filename = temporaryDatabase();
    const store = openStore(filename);
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
    store.close();
    stores.splice(stores.indexOf(store), 1);

    const reopened = openStore(filename);
    const next = await reopened.acquire(
      acquireRequest('lease.2', 'worker.2', '2026-07-18T06:00:21.000Z')
    );
    expect(next).toMatchObject({ revision: 3, fencingToken: 2 });
  });

  it('serializes concurrent acquisition so exactly one worker wins', async () => {
    const store = openStore(temporaryDatabase());
    const leases = await Promise.all(
      Array.from({ length: 10 }, (_, index) =>
        store.acquire(
          acquireRequest(`lease.${index}`, `worker.${index}`, '2026-07-18T06:00:00.000Z')
        )
      )
    );
    expect(leases.filter((lease) => lease !== null)).toHaveLength(1);
  });

  it('rejects partition changes, lease id reuse, and changed idempotent input', async () => {
    const store = openStore(temporaryDatabase());
    const request = acquireRequest('lease.1', 'worker.1', '2026-07-18T06:00:00.000Z');
    const first = (await store.acquire(request))!;
    await expect(store.acquire({ ...request, ownerId: 'worker.changed' })).rejects.toMatchObject({
      code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    });
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
    const store = openStore(temporaryDatabase());
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

  it('rejects a tampered active lease after restart', async () => {
    const filename = temporaryDatabase();
    const store = openStore(filename);
    await store.acquire(acquireRequest('lease.1', 'worker.1', '2026-07-18T06:00:00.000Z'));
    store.close();
    stores.splice(stores.indexOf(store), 1);

    const sqlite = loadSqlite(true);
    if (!sqlite) throw new Error('SQLite driver is unavailable');
    const db = new sqlite.DatabaseSync(filename);
    const row = db
      .prepare('SELECT active_json FROM runtime_run_lease_slots WHERE run_id = ?')
      .get(scope.runId);
    const changed = JSON.parse(String(row?.active_json)) as Record<string, unknown>;
    changed.ownerId = 'worker.tampered';
    db.prepare('UPDATE runtime_run_lease_slots SET active_json = ? WHERE run_id = ?').run(
      JSON.stringify(changed),
      scope.runId
    );
    db.close?.();

    const reopened = openStore(filename);
    await expect(reopened.get(scope, '2026-07-18T06:00:02.000Z')).rejects.toMatchObject({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
    });
  });

  function openStore(filename: string): SQLiteRunLeaseStore {
    const store = new SQLiteRunLeaseStore({
      filename,
      now: () => '2026-07-18T06:00:02.000Z',
    });
    stores.push(store);
    return store;
  }
});

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

function temporaryDatabase(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-run-lease-'));
  return path.join(root, 'runtime.sqlite');
}
