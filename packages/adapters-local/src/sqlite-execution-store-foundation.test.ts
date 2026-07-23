import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type {
  ExecutionRecord,
  ExecutionRecordCompareAndSetRequest,
  ExecutionRecordCreateRequest,
  ExecutionLeaseAcquireRequest,
  ExecutionLeaseReleaseRequest,
  ExecutionLeaseRenewRequest,
} from '@hypha/core';
import {
  commandExecutionResultExample,
  executionLeaseAcquireRequestExample,
  executionLeaseGuardExample,
  executionLeaseReleaseRequestExample,
  executionLeaseRenewRequestExample,
  executionRecordCompareAndSetRequestExample,
  executionRecordCreateRequestExample,
  executionRecordExample,
} from '@hypha/core';
import { afterEach, describe, expect, it } from 'vitest';
import {
  SQLiteExecutionStoreFoundation,
  SQLiteExecutionStoreFoundationError,
} from './sqlite-execution-store-foundation';

const temporaryRoots: string[] = [];

afterEach(async () => {
  for (const root of temporaryRoots.splice(0)) {
    await fs.rm(root, { recursive: true, force: true, maxRetries: 3, retryDelay: 50 });
  }
});

describe('SQLiteExecutionStoreFoundation', () => {
  it('persists a validated queued record across close and reopen', async () => {
    const root = await temporaryRoot();
    const now = () => '2026-07-22T00:00:00.000Z';
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root, now });
    const request = createRequest();

    const created = await store.create(request);
    request.record.providerId = 'provider.mutated-after-create';

    expect(created).toEqual(executionRecordCreateRequestExample.record);
    await expect(store.get(created.id)).resolves.toEqual(created);
    await expect(store.get('execution.missing')).resolves.toBeNull();
    await expect(store.health()).resolves.toEqual({
      status: 'healthy',
      checkedAt: now(),
      message: 'SQLite Execution store is available.',
      details: { schemaVersion: 7, quarantinedRecords: 0 },
    });
    await store.close();
    await expect(store.health()).resolves.toMatchObject({ status: 'unhealthy' });
    await expect(store.get(created.id)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CLOSED',
    });

    const reopened = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await expect(reopened.get(created.id)).resolves.toEqual(created);
    await reopened.close();
  });

  it('lists only records matching owner, provider, status, and time filters', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const requests = [
      queuedCreateRequest('execution.scope.old', {
        tenantId: 'tenant.a',
        userId: 'user.a',
        workspaceId: 'workspace.a',
        runId: 'run.a',
        providerId: 'provider.a',
        updatedAt: '2026-07-16T01:00:00.000+01:00',
      }),
      queuedCreateRequest('execution.scope.new', {
        tenantId: 'tenant.a',
        userId: 'user.a',
        workspaceId: 'workspace.a',
        runId: 'run.a',
        providerId: 'provider.a',
        updatedAt: '2026-07-16T00:30:00.000Z',
      }),
      queuedCreateRequest('execution.scope.other-user', {
        tenantId: 'tenant.a',
        userId: 'user.b',
        workspaceId: 'workspace.a',
        runId: 'run.a',
        providerId: 'provider.a',
        updatedAt: '2026-07-16T00:30:00.000Z',
      }),
      queuedCreateRequest('execution.scope.other-tenant', {
        tenantId: 'tenant.b',
        userId: 'user.a',
        workspaceId: 'workspace.a',
        runId: 'run.a',
        providerId: 'provider.a',
        updatedAt: '2026-07-16T00:30:00.000Z',
      }),
      queuedCreateRequest('execution.scope.other-workspace', {
        tenantId: 'tenant.a',
        userId: 'user.a',
        workspaceId: 'workspace.b',
        runId: 'run.b',
        providerId: 'provider.b',
        updatedAt: '2026-07-16T00:30:00.000Z',
      }),
    ];
    for (const request of requests) await store.create(request);

    const page = await store.list({
      tenantId: 'tenant.a',
      userId: 'user.a',
      workspaceId: 'workspace.a',
      runId: 'run.a',
      providerId: 'provider.a',
      statuses: ['queued'],
      updatedBefore: '2026-07-16T01:00:00.000Z',
    });
    expect(page.records.map((record) => record.id)).toEqual([
      requests[1]!.record.id,
      requests[0]!.record.id,
    ]);
    expect(page).not.toHaveProperty('cursor');
    await expect(store.list({ statuses: [] })).resolves.toEqual({ records: [] });
    await store.close();
  });

  it('paginates equal timestamps without duplicates and resumes after restart', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    for (const suffix of ['a', 'b', 'c']) {
      await store.create(
        queuedCreateRequest(`execution.page.${suffix}`, {
          userId: 'user.page',
          workspaceId: 'workspace.page',
          updatedAt: '2026-07-16T00:00:01.000Z',
        })
      );
    }

    const query = { userId: 'user.page', workspaceId: 'workspace.page', limit: 2 } as const;
    const first = await store.list(query);
    expect(first.records.map((record) => record.id)).toEqual([
      'execution.page.c',
      'execution.page.b',
    ]);
    expect(first.cursor).toEqual(expect.any(String));
    await store.close();

    const reopened = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const second = await reopened.list({ ...query, cursor: first.cursor });
    expect(second).toEqual({ records: [expect.objectContaining({ id: 'execution.page.a' })] });
    expect([...first.records, ...second.records].map((record) => record.id)).toEqual([
      'execution.page.c',
      'execution.page.b',
      'execution.page.a',
    ]);
    await expect(
      reopened.list({ ...query, userId: 'user.other', cursor: first.cursor })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_INVALID_CURSOR' });
    await expect(reopened.list({ cursor: 'not+a+cursor' })).rejects.toMatchObject({
      code: 'EXECUTION_STORE_INVALID_CURSOR',
    });
    await reopened.close();
  });

  it('queries active leases by indexed expiry time', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const firstRequest = queuedCreateRequest('execution.lease.expiring', {
      userId: 'user.lease',
      workspaceId: 'workspace.lease',
    });
    const secondRequest = queuedCreateRequest('execution.lease.later', {
      userId: 'user.lease',
      workspaceId: 'workspace.lease',
    });
    const first = await store.create(firstRequest);
    const second = await store.create(secondRequest);
    await store.acquireLease(acquireLeaseRequestFor(first, '2026-07-16T00:00:00.000Z'));
    await store.acquireLease(acquireLeaseRequestFor(second, '2026-07-16T00:01:00.000Z'));

    await expect(
      store.list({
        userId: 'user.lease',
        workspaceId: 'workspace.lease',
        statuses: ['starting'],
        leaseExpiresBefore: '2026-07-16T00:00:45.000Z',
      })
    ).resolves.toMatchObject({
      records: [expect.objectContaining({ id: first.id })],
    });
    await expect(store.list({ leaseExpiresBefore: '2026-07-16T00:00:30.000Z' })).resolves.toEqual({
      records: [],
    });
    await store.close();
  });

  it('resolves scoped idempotency as miss, match, or conflict across restart', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const request = queuedCreateRequest('execution.idempotency.owner', {
      tenantId: 'tenant.idempotency',
      userId: 'user.idempotency',
      workspaceId: 'workspace.idempotency',
    });
    request.record.request.idempotencyKey = 'command:idempotency:shared';
    request.record.idempotencyFingerprint = 'sha256:fingerprint.owner';
    const query = idempotencyQueryFor(request.record);

    await expect(store.resolveIdempotency(query)).resolves.toEqual({ status: 'miss' });
    const created = await store.create(request);
    await expect(store.resolveIdempotency(query)).resolves.toEqual({
      status: 'match',
      record: created,
    });
    await store.close();

    const reopened = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await expect(
      reopened.resolveIdempotency({ ...query, fingerprint: 'sha256:fingerprint.changed' })
    ).resolves.toEqual({
      status: 'conflict',
      recordId: created.id,
      existingFingerprint: created.idempotencyFingerprint,
    });
    for (const scope of [
      { ...query, tenantId: 'tenant.other' },
      { ...query, tenantId: undefined },
      { ...query, userId: 'user.other' },
      { ...query, workspaceId: 'workspace.other' },
    ]) {
      await expect(reopened.resolveIdempotency(scope)).resolves.toEqual({ status: 'miss' });
    }
    await reopened.close();
  });

  it('deduplicates semantic creates and rejects conflicting fingerprints atomically', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const firstRequest = queuedCreateRequest('execution.idempotency.first');
    firstRequest.record.request.idempotencyKey = 'command:idempotency:deduplicate';
    firstRequest.record.idempotencyFingerprint = 'sha256:fingerprint.same';
    const first = await store.create(firstRequest);

    const duplicate = queuedCreateRequest('execution.idempotency.duplicate');
    duplicate.record.request.idempotencyKey = firstRequest.record.request.idempotencyKey;
    duplicate.record.idempotencyFingerprint = firstRequest.record.idempotencyFingerprint;
    await expect(store.create(duplicate)).resolves.toEqual(first);
    await expect(store.get(duplicate.record.id)).resolves.toBeNull();

    const conflict = queuedCreateRequest('execution.idempotency.conflict');
    conflict.record.request.idempotencyKey = firstRequest.record.request.idempotencyKey;
    conflict.record.idempotencyFingerprint = 'sha256:fingerprint.different';
    await expect(store.create(conflict)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_IDEMPOTENCY_CONFLICT',
      details: { executionId: first.id },
    });
    await expect(store.get(conflict.record.id)).resolves.toBeNull();

    const untracked = queuedCreateRequest('execution.idempotency.untracked');
    untracked.record.request.idempotencyKey = 'command:idempotency:untracked';
    untracked.record.idempotencyFingerprint = undefined;
    await store.create(untracked);
    await expect(
      store.resolveIdempotency({
        ...idempotencyQueryFor(untracked.record),
        fingerprint: 'sha256:fingerprint.query',
      })
    ).resolves.toEqual({ status: 'miss' });
    await store.close();
  });

  it('prevents compare-and-set from moving owner scope or changing idempotency evidence', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const current = await store.create(createRequest());
    const moved = compareAndSetRequest(0, 'starting', 'cas:move-owner', current);
    moved.next.request.userId = 'user.moved';
    moved.next.request.principal.userId = 'user.moved';
    await expect(store.compareAndSet(moved)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CONFLICT',
    });

    const refingerprinted = compareAndSetRequest(0, 'starting', 'cas:refingerprint', current);
    refingerprinted.next.idempotencyFingerprint = 'sha256:fingerprint.changed';
    await expect(store.compareAndSet(refingerprinted)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CONFLICT',
    });
    await expect(store.get(current.id)).resolves.toEqual(current);
    await store.close();
  });

  it('replays identical creates and rejects reused or conflicting identities atomically', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const request = createRequest();

    const first = await store.create(request);
    await expect(store.create(createRequest())).resolves.toEqual(first);
    await expect(
      store.create({
        ...createRequest(),
        record: { ...createRequest().record, providerId: 'provider.different' },
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_IDEMPOTENCY_CONFLICT' });
    await expect(
      store.create({
        ...createRequest(),
        operationId: 'operation.execution.create.other',
        idempotencyKey: 'execution-create:other',
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_CONFLICT' });
    await expect(store.get(first.id)).resolves.toEqual(first);
    await store.close();
  });

  it('fails closed when persisted JSON disagrees with indexed record evidence', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const created = await store.create(createRequest());
    const filename = store.filename;
    await store.close();
    const database = openTestDatabase(filename);
    database
      .prepare('UPDATE execution_records SET provider_id = ? WHERE execution_id = ?')
      .run('provider.tampered', created.id);
    database.close();

    const reopened = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await expect(reopened.get(created.id)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
    });
    await reopened.close();
  });

  it('quarantines corrupt records on restart without hiding healthy records', async () => {
    const root = await temporaryRoot();
    const detectedAt = '2026-07-23T01:00:00.000Z';
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const corrupt = await store.create(queuedCreateRequest('execution.corrupt'));
    const healthy = await store.create(queuedCreateRequest('execution.healthy'));
    const replayableMutation = compareAndSetRequest(
      corrupt.revision,
      'starting',
      'cas:quarantine-replay',
      corrupt
    );
    await store.compareAndSet(replayableMutation);
    const filename = store.filename;
    await store.close();

    const database = openTestDatabase(filename);
    database
      .prepare('UPDATE execution_records SET provider_id = ? WHERE execution_id = ?')
      .run('provider.tampered', corrupt.id);
    database.close();

    const reopened = new SQLiteExecutionStoreFoundation({
      rootPath: root,
      now: () => detectedAt,
    });
    await expect(reopened.get(corrupt.id)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
      details: {
        executionId: corrupt.id,
        quarantined: true,
        detectedAt,
      },
    });
    await expect(reopened.get(healthy.id)).resolves.toEqual(healthy);
    await expect(reopened.list()).resolves.toEqual({ records: [healthy] });
    await expect(reopened.resolveIdempotency(idempotencyQueryFor(corrupt))).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
      details: { executionId: corrupt.id, quarantined: true },
    });
    await expect(reopened.compareAndSet(replayableMutation)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
      details: { executionId: corrupt.id, quarantined: true },
    });
    await expect(reopened.health()).resolves.toEqual({
      status: 'degraded',
      checkedAt: detectedAt,
      message: 'SQLite Execution store contains quarantined records.',
      details: { schemaVersion: 7, quarantinedRecords: 1 },
    });
    await reopened.close();

    const evidenceDatabase = openTestDatabase(filename);
    expect(
      evidenceDatabase
        .prepare(
          'SELECT execution_id, detected_at, reason_code, record_hash ' +
            'FROM execution_record_quarantine WHERE execution_id = ?'
        )
        .get(corrupt.id)
    ).toMatchObject({
      execution_id: corrupt.id,
      detected_at: detectedAt,
      reason_code: 'invalid_execution_record',
      record_hash: expect.stringMatching(/^sha256:[a-f0-9]{64}$/u),
    });
    evidenceDatabase.close();
  });

  it('atomically advances revisions and replays the original mutation result', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await store.create(createRequest());
    const starting = compareAndSetRequest(0, 'starting', 'cas:starting');

    const first = await store.compareAndSet(starting);
    const running = compareAndSetRequest(1, 'running', 'cas:running', first);
    await expect(store.compareAndSet(running)).resolves.toEqual(running.next);
    await store.close();

    const reopened = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await expect(reopened.compareAndSet(starting)).resolves.toEqual(first);
    await expect(reopened.get(first.id)).resolves.toEqual(running.next);

    await expect(
      reopened.compareAndSet({
        ...starting,
        next: { ...starting.next, providerId: 'provider.reused-key' },
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_IDEMPOTENCY_CONFLICT' });
    await reopened.close();
  });

  it('rejects missing records, stale revisions, and mutation after a terminal result', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const queued = await store.create(createRequest());

    await expect(
      store.compareAndSet({
        ...compareAndSetRequest(0, 'starting', 'cas:missing'),
        executionId: 'execution.missing',
        next: {
          ...compareAndSetRequest(0, 'starting', 'cas:missing').next,
          id: 'execution.missing',
          request: {
            ...compareAndSetRequest(0, 'starting', 'cas:missing').next.request,
            executionId: 'execution.missing',
          },
        },
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_NOT_FOUND' });
    await expect(
      store.compareAndSet(compareAndSetRequest(1, 'running', 'cas:stale'))
    ).rejects.toMatchObject({
      code: 'EXECUTION_STORE_REVISION_CONFLICT',
      details: { expectedRevision: 1, actualRevision: 0 },
    });
    await expect(store.get(queued.id)).resolves.toEqual(queued);

    const terminal = terminalCompareAndSetRequest();
    await expect(store.compareAndSet(terminal)).resolves.toEqual(terminal.next);
    const afterTerminal = compareAndSetRequest(1, 'running', 'cas:after-terminal', terminal.next);
    afterTerminal.next.result = undefined;
    await expect(store.compareAndSet(afterTerminal)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_TERMINAL',
    });
    await expect(store.get(queued.id)).resolves.toEqual(terminal.next);
    await store.close();
  });

  it('rejects stale fencing and prevents compare-and-set from changing lease ownership', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await store.create(createRequest());
    const filename = store.filename;
    await store.close();
    replacePersistedRecord(filename, executionRecordExample);

    const reopened = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const stale = structuredClone(executionRecordCompareAndSetRequestExample);
    stale.leaseGuard = { ...executionLeaseGuardExample, fencingToken: 2 };
    stale.next.lease = { ...executionRecordExample.lease!, fencingToken: 2 };
    await expect(reopened.compareAndSet(stale)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_FENCING_REJECTED',
    });

    const dropsLease = structuredClone(executionRecordCompareAndSetRequestExample);
    dropsLease.next.lease = undefined;
    await expect(reopened.compareAndSet(dropsLease)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_FENCING_REJECTED',
    });
    await expect(
      reopened.compareAndSet(structuredClone(executionRecordCompareAndSetRequestExample))
    ).resolves.toEqual(executionRecordCompareAndSetRequestExample.next);
    await reopened.close();
  });

  it('acquires a durable lease and replays the original result after restart', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await store.create(createRequest());
    const request = acquireLeaseRequest();

    const acquired = await store.acquireLease(request);
    expect(acquired).toMatchObject({
      revision: 1,
      status: 'starting',
      attempt: 1,
      lease: {
        id: request.requestedLeaseId,
        ownerId: request.ownerId,
        fencingToken: 1,
        acquiredAt: request.acquiredAt,
        heartbeatAt: request.acquiredAt,
        expiresAt: '2026-07-16T00:00:30.000Z',
      },
    });
    await store.close();

    const reopened = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await expect(reopened.acquireLease(request)).resolves.toEqual(acquired);
    await expect(reopened.get(request.executionId)).resolves.toEqual(acquired);
    await expect(
      reopened.acquireLease({ ...request, ownerId: 'worker.reused-key' })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_IDEMPOTENCY_CONFLICT' });
    await reopened.close();
  });

  it('rejects lease timestamps older than the persisted revision', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const queued = await store.create(createRequest());

    await expect(
      store.acquireLease({
        ...acquireLeaseRequest(),
        acquiredAt: '2026-07-15T23:59:59.999Z',
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_CONFLICT' });
    await expect(store.get(queued.id)).resolves.toEqual(queued);
    await store.close();
  });

  it('rejects concurrent claims and advances fencing monotonically after expiry', async () => {
    const root = await temporaryRoot();
    const firstStore = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const secondStore = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await firstStore.create(createRequest());
    const firstRequest = acquireLeaseRequest();
    const competingRequest = {
      ...acquireLeaseRequest(),
      operationId: 'operation.lease.acquire.competing',
      requestedLeaseId: 'lease.execution.example.competing',
      ownerId: 'worker.competing',
      idempotencyKey: 'lease-acquire:competing',
    };

    const claims = await Promise.allSettled([
      firstStore.acquireLease(firstRequest),
      secondStore.acquireLease(competingRequest),
    ]);
    expect(claims.filter((claim) => claim.status === 'fulfilled')).toHaveLength(1);
    expect(claims.filter((claim) => claim.status === 'rejected')).toHaveLength(1);
    if (claims[1].status === 'rejected') {
      expect(claims[1].reason).toMatchObject({ code: 'EXECUTION_STORE_REVISION_CONFLICT' });
    }

    await expect(
      secondStore.acquireLease({
        ...competingRequest,
        expectedRevision: 1,
        acquiredAt: '2026-07-16T00:00:29.999Z',
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_LEASE_HELD' });
    await expect(
      secondStore.acquireLease({
        ...competingRequest,
        expectedRevision: 0,
        acquiredAt: '2026-07-16T00:00:30.000Z',
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_REVISION_CONFLICT' });

    const takeover = await secondStore.acquireLease({
      ...competingRequest,
      expectedRevision: 1,
      acquiredAt: '2026-07-16T00:00:30.000Z',
    });
    expect(takeover).toMatchObject({
      revision: 2,
      status: 'starting',
      attempt: 1,
      lease: {
        id: competingRequest.requestedLeaseId,
        ownerId: competingRequest.ownerId,
        fencingToken: 2,
        expiresAt: '2026-07-16T00:01:00.000Z',
      },
    });
    await firstStore.close();
    await secondStore.close();

    const historyDatabase = openTestDatabase(path.join(root, 'executions.sqlite'));
    expect(
      historyDatabase
        .prepare(
          'SELECT released_at, release_reason FROM execution_lease_history WHERE lease_id = ?'
        )
        .get(firstRequest.requestedLeaseId)
    ).toEqual({
      released_at: '2026-07-16T00:00:30.000Z',
      release_reason: 'expired_and_replaced',
    });
    historyDatabase.close();

    const reopened = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await expect(
      reopened.acquireLease({
        ...acquireLeaseRequest(),
        operationId: 'operation.lease.acquire.reused-id',
        expectedRevision: 2,
        acquiredAt: '2026-07-16T00:01:00.000Z',
        idempotencyKey: 'lease-acquire:reused-id',
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_LEASE_ID_CONFLICT' });
    const third = await reopened.acquireLease({
      ...acquireLeaseRequest(),
      operationId: 'operation.lease.acquire.third',
      expectedRevision: 2,
      requestedLeaseId: 'lease.execution.example.3',
      ownerId: 'worker.third',
      acquiredAt: '2026-07-16T00:01:00.000Z',
      idempotencyKey: 'lease-acquire:third',
    });
    expect(third.lease?.fencingToken).toBe(3);
    await reopened.close();
  });

  it('does not acquire leases for terminal records', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await store.create(createRequest());
    await store.compareAndSet(terminalCompareAndSetRequest());

    await expect(
      store.acquireLease({ ...acquireLeaseRequest(), expectedRevision: 1 })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_TERMINAL' });
    await store.close();
  });

  it('renews a durable lease and replays the original renewal after restart', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await store.create(createRequest());
    const acquired = await store.acquireLease(acquireLeaseRequest());
    const request = renewLeaseRequest();

    const renewed = await store.renewLease(request);
    expect(renewed).toMatchObject({
      revision: 2,
      status: acquired.status,
      attempt: acquired.attempt,
      lease: {
        ...acquired.lease,
        heartbeatAt: request.heartbeatAt,
        expiresAt: '2026-07-16T00:00:40.000Z',
      },
      updatedAt: request.heartbeatAt,
    });
    await store.close();

    const reopened = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await expect(reopened.renewLease(request)).resolves.toEqual(renewed);
    await expect(reopened.get(request.executionId)).resolves.toEqual(renewed);
    await expect(
      reopened.renewLease({ ...request, ttlMs: request.ttlMs + 1 })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_IDEMPOTENCY_CONFLICT' });
    await reopened.close();
  });

  it('rejects missing, stale, expired, and unfenced lease renewals atomically', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const queued = await store.create(createRequest());
    await expect(
      store.renewLease({ ...renewLeaseRequest(), expectedRevision: 0 })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_LEASE_LOST' });
    await expect(store.get(queued.id)).resolves.toEqual(queued);

    const acquired = await store.acquireLease(acquireLeaseRequest());
    await expect(
      store.renewLease({ ...renewLeaseRequest(), expectedRevision: 0 })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_REVISION_CONFLICT' });
    await expect(
      store.renewLease({
        ...renewLeaseRequest(),
        leaseGuard: { ...executionLeaseGuardExample, fencingToken: 2 },
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_FENCING_REJECTED' });
    await expect(
      store.renewLease({
        ...renewLeaseRequest(),
        heartbeatAt: '2026-07-15T23:59:59.999Z',
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_CONFLICT' });
    await expect(
      store.renewLease({
        ...renewLeaseRequest(),
        heartbeatAt: acquired.updatedAt,
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_CONFLICT' });
    await expect(
      store.renewLease({
        ...renewLeaseRequest(),
        ttlMs: 1,
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_CONFLICT' });
    await expect(
      store.renewLease({
        ...renewLeaseRequest(),
        heartbeatAt: acquired.lease!.expiresAt,
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_LEASE_LOST' });
    await expect(store.get(acquired.id)).resolves.toEqual(acquired);
    await store.close();
  });

  it('rejects renewal from the old worker after an expired lease is replaced', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await store.create(createRequest());
    await store.acquireLease(acquireLeaseRequest());
    const takeover = await store.acquireLease({
      ...acquireLeaseRequest(),
      operationId: 'operation.lease.acquire.takeover',
      expectedRevision: 1,
      requestedLeaseId: 'lease.execution.example.takeover',
      ownerId: 'worker.takeover',
      acquiredAt: '2026-07-16T00:00:30.000Z',
      idempotencyKey: 'lease-acquire:takeover',
    });

    await expect(
      store.renewLease({
        ...renewLeaseRequest(),
        expectedRevision: takeover.revision,
        heartbeatAt: '2026-07-16T00:00:40.000Z',
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_FENCING_REJECTED' });
    await expect(store.get(takeover.id)).resolves.toEqual(takeover);
    await store.close();
  });

  it('releases a durable lease and replays the original release after restart', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await store.create(createRequest());
    await store.acquireLease(acquireLeaseRequest());
    await store.renewLease(renewLeaseRequest());
    const request = releaseLeaseRequest();

    const released = await store.releaseLease(request);
    expect(released).toMatchObject({
      revision: 3,
      status: 'starting',
      attempt: 1,
      updatedAt: request.releasedAt,
    });
    expect(released.lease).toBeUndefined();
    const filename = store.filename;
    await store.close();

    const database = openTestDatabase(filename);
    expect(
      database
        .prepare(
          'SELECT released_at, release_reason FROM execution_lease_history WHERE lease_id = ?'
        )
        .get(request.leaseGuard.leaseId)
    ).toEqual({ released_at: request.releasedAt, release_reason: request.reason });
    database.close();

    const reopened = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await expect(reopened.releaseLease(request)).resolves.toEqual(released);
    await expect(reopened.get(request.executionId)).resolves.toEqual(released);
    await expect(
      reopened.releaseLease({ ...request, reason: 'reused with a different reason' })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_IDEMPOTENCY_CONFLICT' });
    await reopened.close();
  });

  it('preserves an immutable terminal result while releasing its lease', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await store.create(createRequest());
    const acquired = await store.acquireLease(acquireLeaseRequest());
    const terminal = terminalLeasedCompareAndSetRequest(acquired);
    const completed = await store.compareAndSet(terminal);

    const released = await store.releaseLease({
      ...releaseLeaseRequest(),
      expectedRevision: completed.revision,
      releasedAt: '2026-07-16T00:00:03.000Z',
    });
    expect(released).toEqual({
      ...completed,
      revision: completed.revision + 1,
      lease: undefined,
      updatedAt: '2026-07-16T00:00:03.000Z',
    });
    expect(released.result).toEqual(completed.result);
    await store.close();
  });

  it('rejects missing, stale, unfenced, and time-regressing lease releases atomically', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    const queued = await store.create(createRequest());
    await expect(
      store.releaseLease({ ...releaseLeaseRequest(), expectedRevision: 0 })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_LEASE_LOST' });
    await expect(store.get(queued.id)).resolves.toEqual(queued);

    const acquired = await store.acquireLease(acquireLeaseRequest());
    await expect(
      store.releaseLease({ ...releaseLeaseRequest(), expectedRevision: 0 })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_REVISION_CONFLICT' });
    await expect(
      store.releaseLease({
        ...releaseLeaseRequest(),
        expectedRevision: 1,
        leaseGuard: { ...executionLeaseGuardExample, fencingToken: 2 },
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_FENCING_REJECTED' });
    await expect(
      store.releaseLease({
        ...releaseLeaseRequest(),
        expectedRevision: 1,
        releasedAt: '2026-07-15T23:59:59.999Z',
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_CONFLICT' });
    await expect(store.get(acquired.id)).resolves.toEqual(acquired);
    await store.close();
  });

  it('keeps fencing monotonic after release and rejects the previous worker', async () => {
    const root = await temporaryRoot();
    const store = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await store.create(createRequest());
    await store.acquireLease(acquireLeaseRequest());
    const released = await store.releaseLease({
      ...releaseLeaseRequest(),
      expectedRevision: 1,
      releasedAt: '2026-07-16T00:00:02.000Z',
    });
    const reacquired = await store.acquireLease({
      ...acquireLeaseRequest(),
      operationId: 'operation.lease.acquire.after-release',
      expectedRevision: released.revision,
      requestedLeaseId: 'lease.execution.example.after-release',
      ownerId: 'worker.after-release',
      acquiredAt: released.updatedAt,
      idempotencyKey: 'lease-acquire:after-release',
    });
    expect(reacquired.lease?.fencingToken).toBe(2);

    await expect(
      store.releaseLease({
        ...releaseLeaseRequest(),
        operationId: 'operation.lease.release.stale-worker',
        expectedRevision: reacquired.revision,
        releasedAt: '2026-07-16T00:00:03.000Z',
        idempotencyKey: 'lease-release:stale-worker',
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_STORE_FENCING_REJECTED' });
    await expect(store.get(reacquired.id)).resolves.toEqual(reacquired);
    await store.close();
  });

  it('migrates schema version one without losing existing records', async () => {
    const root = await temporaryRoot();
    const filename = path.join(root, 'executions.sqlite');
    const created = structuredClone(executionRecordCreateRequestExample.record);
    const database = openTestDatabase(filename);
    createVersionOneDatabase(database);
    insertLegacyRecord(database, created);
    database.close();

    const migrated = new SQLiteExecutionStoreFoundation({ rootPath: root });
    await expect(migrated.get(created.id)).resolves.toEqual(created);
    await expect(migrated.health()).resolves.toMatchObject({
      status: 'healthy',
      details: { schemaVersion: 7, quarantinedRecords: 0 },
    });
    await expect(migrated.resolveIdempotency(idempotencyQueryFor(created))).resolves.toMatchObject({
      status: 'match',
      record: { id: created.id },
    });
    await expect(
      migrated.compareAndSet(compareAndSetRequest(0, 'starting', 'cas:migrated'))
    ).resolves.toMatchObject({
      revision: 1,
      status: 'starting',
    });
    await migrated.close();
  });

  it('rejects unsafe filenames and database schemas newer than this adapter', async () => {
    const root = await temporaryRoot();
    expect(
      () => new SQLiteExecutionStoreFoundation({ rootPath: root, filename: '../escape.sqlite' })
    ).toThrow(TypeError);

    const filename = path.join(root, 'newer.sqlite');
    const database = openTestDatabase(filename);
    database.exec('PRAGMA user_version = 8');
    database.close();
    expect(
      () => new SQLiteExecutionStoreFoundation({ rootPath: root, filename: 'newer.sqlite' })
    ).toThrowError(SQLiteExecutionStoreFoundationError);
    try {
      new SQLiteExecutionStoreFoundation({ rootPath: root, filename: 'newer.sqlite' });
    } catch (error) {
      expect(error).toMatchObject({ code: 'EXECUTION_STORE_UNSUPPORTED_SCHEMA' });
    }
  });
});

function createRequest(): ExecutionRecordCreateRequest {
  return structuredClone(executionRecordCreateRequestExample);
}

interface QueuedCreateOptions {
  tenantId?: string;
  userId?: string;
  workspaceId?: string;
  runId?: string;
  providerId?: string;
  updatedAt?: string;
}

function queuedCreateRequest(
  executionId: string,
  options: QueuedCreateOptions = {}
): ExecutionRecordCreateRequest {
  const request = createRequest();
  const userId = options.userId ?? request.record.request.userId;
  request.operationId = `operation.execution.create.${executionId}`;
  request.idempotencyKey = `execution-create:${executionId}`;
  request.record.id = executionId;
  request.record.providerId = options.providerId ?? request.record.providerId;
  request.record.createdAt = options.updatedAt ?? request.record.createdAt;
  request.record.updatedAt = request.record.createdAt;
  request.record.request.executionId = executionId;
  request.record.request.operationId = `operation.command.${executionId}`;
  request.record.request.idempotencyKey = `command:${executionId}`;
  request.record.request.userId = userId;
  request.record.request.principal.userId = userId;
  request.record.request.workspaceId = options.workspaceId ?? request.record.request.workspaceId;
  if (options.tenantId === undefined) delete request.record.request.tenantId;
  else request.record.request.tenantId = options.tenantId;
  request.record.request.runId = options.runId ?? request.record.request.runId;
  return request;
}

function acquireLeaseRequestFor(
  record: ExecutionRecord,
  acquiredAt: string
): ExecutionLeaseAcquireRequest {
  return {
    ...acquireLeaseRequest(),
    operationId: `operation.lease.acquire.${record.id}`,
    executionId: record.id,
    expectedRevision: record.revision,
    requestedLeaseId: `lease.${record.id}`,
    ownerId: `worker.${record.id}`,
    acquiredAt,
    idempotencyKey: `lease-acquire:${record.id}`,
  };
}

function idempotencyQueryFor(record: ExecutionRecord) {
  return {
    tenantId: record.request.tenantId,
    userId: record.request.userId,
    workspaceId: record.request.workspaceId,
    idempotencyKey: record.request.idempotencyKey!,
    fingerprint: record.idempotencyFingerprint!,
  };
}

function acquireLeaseRequest(): ExecutionLeaseAcquireRequest {
  return structuredClone(executionLeaseAcquireRequestExample);
}

function renewLeaseRequest(): ExecutionLeaseRenewRequest {
  return structuredClone(executionLeaseRenewRequestExample);
}

function releaseLeaseRequest(): ExecutionLeaseReleaseRequest {
  return structuredClone(executionLeaseReleaseRequestExample);
}

function compareAndSetRequest(
  expectedRevision: number,
  status: 'starting' | 'running',
  idempotencyKey: string,
  current: ExecutionRecord = executionRecordCreateRequestExample.record
): ExecutionRecordCompareAndSetRequest {
  return {
    operationId: `operation.${idempotencyKey}`,
    executionId: current.id,
    expectedRevision,
    next: {
      ...structuredClone(current),
      revision: expectedRevision + 1,
      status,
      attempt: status === 'starting' ? 1 : current.attempt,
      updatedAt: `2026-07-16T00:00:0${expectedRevision + 1}.000Z`,
    },
    idempotencyKey,
  };
}

function terminalCompareAndSetRequest(): ExecutionRecordCompareAndSetRequest {
  const queued = executionRecordCreateRequestExample.record;
  return {
    operationId: 'operation.cas:terminal',
    executionId: queued.id,
    expectedRevision: 0,
    next: {
      ...structuredClone(queued),
      revision: 1,
      status: 'completed',
      sandboxId: commandExecutionResultExample.sandboxId,
      attempt: 1,
      result: { ...structuredClone(commandExecutionResultExample), revision: 1 },
      updatedAt: '2026-07-16T00:00:02.000Z',
    },
    idempotencyKey: 'cas:terminal',
  };
}

function terminalLeasedCompareAndSetRequest(
  current: ExecutionRecord
): ExecutionRecordCompareAndSetRequest {
  return {
    operationId: 'operation.cas:terminal-leased',
    executionId: current.id,
    expectedRevision: current.revision,
    leaseGuard: executionLeaseGuardExample,
    next: {
      ...structuredClone(current),
      revision: current.revision + 1,
      status: 'completed',
      sandboxId: commandExecutionResultExample.sandboxId,
      result: {
        ...structuredClone(commandExecutionResultExample),
        revision: current.revision + 1,
      },
      updatedAt: '2026-07-16T00:00:02.000Z',
    },
    idempotencyKey: 'cas:terminal-leased',
  };
}

function replacePersistedRecord(filename: string, record: ExecutionRecord): void {
  const database = openTestDatabase(filename);
  database
    .prepare(
      'UPDATE execution_records SET revision = ?, status = ?, tenant_id = ?, user_id = ?, ' +
        'workspace_id = ?, run_id = ?, provider_id = ?, created_at = ?, updated_at = ?, ' +
        'execution_idempotency_key = ?, idempotency_fingerprint = ?, lease_expires_at = ?, ' +
        'record_json = ?, last_fencing_token = ? WHERE execution_id = ?'
    )
    .run(
      record.revision,
      record.status,
      record.request.tenantId ?? null,
      record.request.userId,
      record.request.workspaceId,
      record.request.runId ?? null,
      record.providerId,
      record.createdAt,
      record.updatedAt,
      record.request.idempotencyKey ?? null,
      record.idempotencyFingerprint ?? null,
      record.lease?.expiresAt ?? null,
      JSON.stringify(record),
      record.lease?.fencingToken ?? 0,
      record.id
    );
  database.close();
}

function createVersionOneDatabase(database: ReturnType<typeof openTestDatabase>): void {
  database.exec(`
    CREATE TABLE execution_records (
      execution_id TEXT PRIMARY KEY,
      revision INTEGER NOT NULL CHECK (revision >= 0),
      status TEXT NOT NULL,
      tenant_id TEXT,
      user_id TEXT NOT NULL,
      workspace_id TEXT NOT NULL,
      run_id TEXT,
      provider_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      record_json TEXT NOT NULL
    );
    CREATE TABLE execution_create_idempotency (
      operation_id TEXT NOT NULL,
      idempotency_key TEXT NOT NULL,
      execution_id TEXT NOT NULL,
      record_hash TEXT NOT NULL,
      PRIMARY KEY (operation_id, idempotency_key),
      FOREIGN KEY (execution_id) REFERENCES execution_records(execution_id)
    );
    PRAGMA user_version = 1;
  `);
}

function insertLegacyRecord(
  database: ReturnType<typeof openTestDatabase>,
  record: ExecutionRecord
): void {
  database
    .prepare(
      'INSERT INTO execution_records ' +
        '(execution_id, revision, status, tenant_id, user_id, workspace_id, run_id, provider_id, ' +
        'created_at, updated_at, record_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
    .run(
      record.id,
      record.revision,
      record.status,
      record.request.tenantId ?? null,
      record.request.userId,
      record.request.workspaceId,
      record.request.runId ?? null,
      record.providerId,
      record.createdAt,
      record.updatedAt,
      JSON.stringify(record)
    );
}

async function temporaryRoot(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-execution-store-'));
  temporaryRoots.push(root);
  return root;
}

function openTestDatabase(filename: string): {
  exec(sql: string): void;
  prepare(sql: string): {
    run(...params: unknown[]): { changes: number | bigint };
    get(...params: unknown[]): Record<string, unknown> | undefined;
  };
  close(): void;
} {
  try {
    const sqlite = require('node:sqlite') as {
      DatabaseSync: new (filename: string) => ReturnType<typeof openTestDatabase>;
    };
    return new sqlite.DatabaseSync(filename);
  } catch (nodeSQLiteError) {
    try {
      const BetterSQLite = require('better-sqlite3') as new (
        filename: string
      ) => ReturnType<typeof openTestDatabase>;
      return new BetterSQLite(filename);
    } catch (betterSQLiteError) {
      throw new AggregateError([nodeSQLiteError, betterSQLiteError]);
    }
  }
}
