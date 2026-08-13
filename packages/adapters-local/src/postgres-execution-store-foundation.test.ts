import { createHash } from 'node:crypto';
import type {
  ExecutionLeaseAcquireRequest,
  ExecutionLeaseReleaseRequest,
  ExecutionLeaseRenewRequest,
  ExecutionRecord,
  ExecutionRecordCompareAndSetRequest,
  ExecutionRecordCreateRequest,
  ExecutionStore,
  ProviderHealth,
} from '@codesoul-co/core';
import {
  commandExecutionResultExample,
  executionLeaseAcquireRequestExample,
  executionLeaseGuardExample,
  executionLeaseReleaseRequestExample,
  executionLeaseRenewRequestExample,
  executionRecordCompareAndSetRequestExample,
  executionRecordCreateRequestExample,
  executionRecordExample,
} from '@codesoul-co/core';
import { describe, expect, it } from 'vitest';
import type { PostgresExecutionStorePoolClient } from './postgres-execution-store-connection';
import {
  PostgresExecutionStoreFoundation,
  type PostgresExecutionStoreTransactionPort,
} from './postgres-execution-store-foundation';
import type { PostgresExecutionStoreSchemaQueryResult } from './postgres-execution-store-schema';

describe('PostgresExecutionStoreFoundation persistence', () => {
  it('implements every public ExecutionStore operation', () => {
    const store: ExecutionStore = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([])
    );
    const operations: Array<keyof ExecutionStore> = [
      'create',
      'get',
      'list',
      'resolveIdempotency',
      'compareAndSet',
      'acquireLease',
      'renewLease',
      'releaseLease',
      'health',
      'close',
    ];

    for (const operation of operations) {
      expect(store[operation]).toBeTypeOf('function');
    }
  });

  it('creates and reads a Runtime Schema-validated Execution record', async () => {
    const request = structuredClone(executionRecordCreateRequestExample);
    const createClient = new ScriptedClient([
      rows(),
      rows(),
      rows({ execution_id: request.record.id }),
      rows({ execution_id: request.record.id }),
    ]);
    const getClient = new ScriptedClient([rows(recordRow(request.record))]);
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([createClient, getClient])
    );

    await expect(store.create(request)).resolves.toEqual(request.record);
    await expect(store.get(request.record.id)).resolves.toEqual(request.record);

    const insert = createClient.commands.find(({ text }) =>
      text.includes('INSERT INTO execution_records')
    );
    expect(insert?.text).toContain('VALUES ($1, $2, $3');
    expect(insert?.values).toContain(request.record.id);
    expect(insert?.values).toContain(JSON.stringify(request.record));
    expect(getClient.commands[0]?.text).toContain('execution_record_quarantine');
  });

  it('replays the same operation idempotently without another insert', async () => {
    const request = structuredClone(executionRecordCreateRequestExample);
    const firstClient = new ScriptedClient([
      rows(),
      rows(),
      rows({ execution_id: request.record.id }),
      rows({ execution_id: request.record.id }),
    ]);
    const connection = new ScriptedTransactionPort([firstClient]);
    const store = new PostgresExecutionStoreFoundation(connection);
    await store.create(request);
    const remembered = firstClient.commands.find(({ text }) =>
      text.includes('INSERT INTO execution_create_idempotency')
    );
    const recordHash = String(remembered?.values?.[3]);
    const replayClient = new ScriptedClient([
      rows({ execution_id: request.record.id, record_hash: recordHash }),
      rows(recordRow(request.record)),
    ]);
    connection.push(replayClient);

    await expect(store.create(request)).resolves.toEqual(request.record);

    expect(replayClient.sql()).not.toContain('INSERT INTO execution_records');
  });

  it('quarantines a corrupt operation replay before reporting the record as invalid', async () => {
    const request = structuredClone(executionRecordCreateRequestExample);
    const firstClient = new ScriptedClient([
      rows(),
      rows(),
      rows({ execution_id: request.record.id }),
      rows({ execution_id: request.record.id }),
    ]);
    const connection = new ScriptedTransactionPort([firstClient]);
    const store = new PostgresExecutionStoreFoundation(connection);
    await store.create(request);
    const remembered = firstClient.commands.find(({ text }) =>
      text.includes('INSERT INTO execution_create_idempotency')
    );
    const recordHash = String(remembered?.values?.[3]);
    const corruptReplay = new ScriptedClient([
      rows({ execution_id: request.record.id, record_hash: recordHash }),
      rows({ ...recordRow(request.record), revision: '999' }),
      rows(),
    ]);
    connection.push(corruptReplay);

    await expect(store.create(request)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
      details: { executionId: request.record.id },
    });

    expect(corruptReplay.sql()).toContain('INSERT INTO execution_record_quarantine');
    expect(corruptReplay.sql()).not.toContain('INSERT INTO execution_records');
  });

  it('rejects reused operation and semantic idempotency evidence', async () => {
    const request = structuredClone(executionRecordCreateRequestExample);
    const operationConflict = new ScriptedClient([
      rows({ execution_id: request.record.id, record_hash: 'sha256:different' }),
    ]);
    const operationStore = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([operationConflict])
    );
    await expect(operationStore.create(request)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_IDEMPOTENCY_CONFLICT',
      details: { operationId: request.operationId },
    });

    const existing = structuredClone(request.record);
    existing.idempotencyFingerprint = 'sha256:different-fingerprint';
    const semanticConflict = new ScriptedClient([rows(), rows(recordRow(existing))]);
    const semanticStore = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([semanticConflict])
    );
    await expect(semanticStore.create(request)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_IDEMPOTENCY_CONFLICT',
      details: { executionId: existing.id },
    });
  });

  it('rejects an existing Execution id when no idempotency identity matches', async () => {
    const request = withoutIdempotency(executionRecordCreateRequestExample);
    const client = new ScriptedClient([rows(), rows(recordRow(request.record))]);
    const store = new PostgresExecutionStoreFoundation(new ScriptedTransactionPort([client]));

    await expect(store.create(request)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CONFLICT',
      details: { executionId: request.record.id },
    });
  });

  it('quarantines Runtime Schema or indexed-evidence corruption before failing closed', async () => {
    const record = structuredClone(executionRecordCreateRequestExample.record);
    const invalidRow = { ...recordRow(record), status: 'completed' };
    const client = new ScriptedClient([rows(invalidRow), rows()]);
    const store = new PostgresExecutionStoreFoundation(new ScriptedTransactionPort([client]));

    await expect(store.get(record.id)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
      details: { executionId: record.id },
    });

    const quarantine = client.commands.find(({ text }) =>
      text.includes('INSERT INTO execution_record_quarantine')
    );
    expect(quarantine?.values).toEqual([
      record.id,
      'invalid_record',
      expect.stringMatching(/^sha256:[0-9a-f]{64}$/u),
    ]);
  });

  it('rejects an already quarantined record without treating it as valid', async () => {
    const record = structuredClone(executionRecordCreateRequestExample.record);
    const client = new ScriptedClient([
      rows({ ...recordRow(record), quarantine_reason: 'invalid_record' }),
    ]);
    const store = new PostgresExecutionStoreFoundation(new ScriptedTransactionPort([client]));

    await expect(store.get(record.id)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
      message: 'Execution record is quarantined.',
    });
    expect(client.sql()).not.toContain('INSERT INTO execution_record_quarantine');
  });

  it('returns null for a missing Execution and normalizes driver failures', async () => {
    const missing = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([new ScriptedClient([rows()])])
    );
    await expect(missing.get('execution.missing')).resolves.toBeNull();

    const failed = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([
        new ScriptedClient([], new TypeError('driver failure with connection detail')),
      ])
    );
    await expect(failed.get('execution.failed')).rejects.toMatchObject({
      code: 'EXECUTION_STORE_UNAVAILABLE',
      message: 'Postgres Execution store write failed.',
    });
  });

  it('validates create and get inputs before issuing SQL', async () => {
    const connection = new ScriptedTransactionPort([]);
    const store = new PostgresExecutionStoreFoundation(connection);

    await expect(store.get(' execution.invalid')).rejects.toThrow('executionId is required');
    await expect(
      store.create({
        ...structuredClone(executionRecordCreateRequestExample),
        record: {
          ...structuredClone(executionRecordCreateRequestExample.record),
          revision: -1,
        },
      })
    ).rejects.toThrow();
    expect(connection.transactions).toBe(0);
  });

  it('lists records with stable pagination and no duplicate boundary record', async () => {
    const newest = recordWithIdentity('execution.page.c', '2026-07-29T03:00:00.000Z');
    const middle = recordWithIdentity('execution.page.b', '2026-07-29T03:00:00.000Z');
    const oldest = recordWithIdentity('execution.page.a', '2026-07-29T02:00:00.000Z');
    const firstClient = new ScriptedClient([
      rows(recordRow(newest), recordRow(middle), recordRow(oldest)),
    ]);
    const secondClient = new ScriptedClient([rows(recordRow(oldest))]);
    const connection = new ScriptedTransactionPort([firstClient, secondClient]);
    const store = new PostgresExecutionStoreFoundation(connection);

    const first = await store.list({ userId: newest.request.userId, limit: 2 });
    expect(first.records.map(({ id }) => id)).toEqual([newest.id, middle.id]);
    expect(first.cursor).toEqual(expect.any(String));

    const second = await store.list({
      userId: newest.request.userId,
      limit: 2,
      cursor: first.cursor,
    });
    expect(second).toEqual({ records: [oldest] });
    expect([...first.records, ...second.records].map(({ id }) => id)).toEqual([
      newest.id,
      middle.id,
      oldest.id,
    ]);
    expect(secondClient.commands[0]?.values).toEqual([
      newest.request.userId,
      middle.updatedAt,
      middle.id,
      3,
    ]);
  });

  it('rejects invalid or query-mismatched list cursors before issuing SQL', async () => {
    const connection = new ScriptedTransactionPort([]);
    const store = new PostgresExecutionStoreFoundation(connection);

    await expect(store.list({ cursor: 'not+a+cursor' })).rejects.toMatchObject({
      code: 'EXECUTION_STORE_INVALID_CURSOR',
    });
    await expect(store.list({ limit: 0 })).rejects.toThrow();
    expect(connection.transactions).toBe(0);
  });

  it('quarantines a corrupt record returned by list before failing closed', async () => {
    const record = recordWithIdentity('execution.list.corrupt', '2026-07-29T03:00:00.000Z');
    const client = new ScriptedClient([
      rows({ ...recordRow(record), workspace_id: 'workspace.corrupt' }),
      rows(),
    ]);
    const store = new PostgresExecutionStoreFoundation(new ScriptedTransactionPort([client]));

    await expect(store.list()).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
      details: { executionId: record.id },
    });
    expect(client.sql()).toContain('INSERT INTO execution_record_quarantine');
  });

  it('resolves scoped idempotency as miss, match, or conflict', async () => {
    const record = recordWithIdentity('execution.idempotency.owner', '2026-07-29T03:00:00.000Z');
    record.request.tenantId = 'tenant.idempotency';
    record.request.idempotencyKey = 'command:idempotency:shared';
    record.idempotencyFingerprint = 'sha256:fingerprint.owner';
    const query = {
      tenantId: record.request.tenantId,
      userId: record.request.userId,
      workspaceId: record.request.workspaceId,
      idempotencyKey: record.request.idempotencyKey,
      fingerprint: record.idempotencyFingerprint,
    };
    const missClient = new ScriptedClient([rows()]);
    const matchClient = new ScriptedClient([rows(recordRow(record))]);
    const conflictClient = new ScriptedClient([rows(recordRow(record))]);
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([missClient, matchClient, conflictClient])
    );

    await expect(store.resolveIdempotency(query)).resolves.toEqual({ status: 'miss' });
    await expect(store.resolveIdempotency(query)).resolves.toEqual({
      status: 'match',
      record,
    });
    await expect(
      store.resolveIdempotency({ ...query, fingerprint: 'sha256:fingerprint.changed' })
    ).resolves.toEqual({
      status: 'conflict',
      recordId: record.id,
      existingFingerprint: record.idempotencyFingerprint,
    });

    expect(matchClient.commands[0]?.values).toEqual([
      query.tenantId,
      query.userId,
      query.workspaceId,
      query.idempotencyKey,
    ]);
    expect(matchClient.sql()).toContain('records.tenant_id IS NOT DISTINCT FROM $1');
    expect(matchClient.sql()).toContain('LIMIT 2');
  });

  it('fails closed for corrupt or duplicate scoped idempotency evidence', async () => {
    const record = recordWithIdentity('execution.idempotency.corrupt', '2026-07-29T03:00:00.000Z');
    record.request.idempotencyKey = 'command:idempotency:corrupt';
    record.idempotencyFingerprint = 'sha256:fingerprint.corrupt';
    const query = {
      userId: record.request.userId,
      workspaceId: record.request.workspaceId,
      idempotencyKey: record.request.idempotencyKey,
      fingerprint: record.idempotencyFingerprint,
    };
    const corruptClient = new ScriptedClient([
      rows({ ...recordRow(record), status: 'completed' }),
      rows(),
    ]);
    const duplicateClient = new ScriptedClient([rows(recordRow(record), recordRow(record))]);
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([corruptClient, duplicateClient])
    );

    await expect(store.resolveIdempotency(query)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
      details: { executionId: record.id },
    });
    expect(corruptClient.sql()).toContain('INSERT INTO execution_record_quarantine');
    expect(corruptClient.commands[0]?.values?.[0]).toBeNull();

    await expect(store.resolveIdempotency(query)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
      message: 'Postgres Execution store contains duplicate scoped idempotency records.',
    });
  });

  it('atomically advances a revision and replays the persisted mutation result', async () => {
    const current = structuredClone(executionRecordCreateRequestExample.record);
    const request = compareAndSetRequestFor(current, 'cas:starting');
    const firstClient = new ScriptedClient([
      rows(),
      rows(),
      rows(recordRow(current)),
      rows({ execution_id: current.id }),
      rows({ execution_id: current.id }),
    ]);
    const connection = new ScriptedTransactionPort([firstClient]);
    const store = new PostgresExecutionStoreFoundation(connection);

    await expect(store.compareAndSet(request)).resolves.toEqual(request.next);
    const update = firstClient.commands.find(({ text }) =>
      text.includes('UPDATE execution_records')
    );
    expect(update?.text).toContain('revision = $16');
    expect(update?.text).toContain('last_fencing_token = $17');
    expect(update?.text).toContain('NOT EXISTS');
    expect(update?.values?.slice(-3)).toEqual([current.id, current.revision, 0]);

    const remembered = firstClient.commands.find(({ text }) =>
      text.includes('INSERT INTO execution_mutation_idempotency')
    );
    const requestHash = String(remembered?.values?.[3]);
    const replayClient = new ScriptedClient([
      rows(),
      rows({
        execution_id: current.id,
        request_hash: requestHash,
        result_json: structuredClone(request.next),
      }),
    ]);
    connection.push(replayClient);

    await expect(store.compareAndSet(request)).resolves.toEqual(request.next);
    expect(replayClient.sql()).not.toContain('FOR UPDATE');
    expect(replayClient.sql()).not.toContain('UPDATE execution_records');
  });

  it('serializes mutation idempotency and rejects a reused key with different input', async () => {
    const current = structuredClone(executionRecordCreateRequestExample.record);
    const request = compareAndSetRequestFor(current, 'cas:conflict');
    const client = new ScriptedClient([
      rows(),
      rows({
        execution_id: current.id,
        request_hash: 'sha256:different',
        result_json: structuredClone(request.next),
      }),
    ]);
    const store = new PostgresExecutionStoreFoundation(new ScriptedTransactionPort([client]));

    await expect(store.compareAndSet(request)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_IDEMPOTENCY_CONFLICT',
      details: { executionId: current.id },
    });
    expect(client.commands[0]?.text).toContain('pg_advisory_xact_lock');
    expect(client.commands[0]?.values).toEqual([request.operationId, request.idempotencyKey]);
    expect(client.sql()).not.toContain('UPDATE execution_records');
  });

  it('rejects missing, stale, terminal, and concurrently changed records', async () => {
    const current = structuredClone(executionRecordCreateRequestExample.record);
    const missing = compareAndSetRequestFor(current, undefined);
    missing.executionId = 'execution.missing';
    missing.next.id = missing.executionId;
    missing.next.request.executionId = missing.executionId;

    const stale = compareAndSetRequestFor(current, undefined, 1, 'running');
    const terminal = terminalRecord();
    const afterTerminal = compareAndSetRequestFor(
      terminal,
      undefined,
      terminal.revision,
      'running'
    );
    afterTerminal.next.result = undefined;
    afterTerminal.next.terminalReceipt = undefined;

    const raced = compareAndSetRequestFor(current, undefined);
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([
        new ScriptedClient([rows()]),
        new ScriptedClient([rows(recordRow(current))]),
        new ScriptedClient([rows(recordRow(terminal))]),
        new ScriptedClient([rows(recordRow(current)), rows()]),
      ])
    );

    await expect(store.compareAndSet(missing)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_NOT_FOUND',
    });
    await expect(store.compareAndSet(stale)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_REVISION_CONFLICT',
      details: { expectedRevision: 1, actualRevision: 0 },
    });
    await expect(store.compareAndSet(afterTerminal)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_TERMINAL',
      details: { status: 'completed' },
    });
    await expect(store.compareAndSet(raced)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_REVISION_CONFLICT',
      message: 'Execution record changed during compare-and-set.',
    });
  });

  it('prevents compare-and-set from moving owner identity or idempotency evidence', async () => {
    const current = structuredClone(executionRecordCreateRequestExample.record);
    const moved = compareAndSetRequestFor(current, undefined);
    moved.next.request.workspaceId = 'workspace.moved';
    const refingerprinted = compareAndSetRequestFor(current, undefined);
    refingerprinted.next.idempotencyFingerprint = 'sha256:fingerprint.changed';
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([
        new ScriptedClient([rows(recordRow(current))]),
        new ScriptedClient([rows(recordRow(current))]),
      ])
    );

    await expect(store.compareAndSet(moved)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CONFLICT',
    });
    await expect(store.compareAndSet(refingerprinted)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CONFLICT',
    });
  });

  it('enforces lease ownership and fencing while allowing the current worker', async () => {
    const current = structuredClone(executionRecordExample);
    if (!current.lease) throw new Error('Execution fixture must include a lease.');
    const stale = structuredClone(executionRecordCompareAndSetRequestExample);
    stale.leaseGuard = { ...executionLeaseGuardExample, fencingToken: 2 };
    stale.next.lease = { ...current.lease, fencingToken: 2 };
    const valid = structuredClone(executionRecordCompareAndSetRequestExample);
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([
        new ScriptedClient([rows(), rows(), rows(recordRow(current))]),
        new ScriptedClient([
          rows(),
          rows(),
          rows(recordRow(current)),
          rows({ execution_id: current.id }),
          rows({ execution_id: current.id }),
        ]),
      ])
    );

    await expect(store.compareAndSet(stale)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_FENCING_REJECTED',
      details: { fencingToken: 1 },
    });
    await expect(store.compareAndSet(valid)).resolves.toEqual(valid.next);
  });

  it('preserves an existing Provider terminal receipt checkpoint', async () => {
    const current = structuredClone(executionRecordExample);
    current.terminalReceipt = {
      id: 'receipt.execution.example',
      providerId: current.providerId,
      executionId: current.id,
      status: 'completed',
      issuedAt: current.updatedAt,
      receiptHash: 'sha256:receipt.example',
    };
    const request = structuredClone(executionRecordCompareAndSetRequestExample);
    request.next.terminalReceipt = undefined;
    const client = new ScriptedClient([rows(), rows(), rows(recordRow(current))]);
    const store = new PostgresExecutionStoreFoundation(new ScriptedTransactionPort([client]));

    await expect(store.compareAndSet(request)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CONFLICT',
      message: 'Provider terminal receipt checkpoint is immutable.',
    });
  });

  it('quarantines a corrupt CAS source and rejects an invalid mutation replay', async () => {
    const current = structuredClone(executionRecordCreateRequestExample.record);
    const request = compareAndSetRequestFor(current, undefined);
    const corruptSource = new ScriptedClient([
      rows({ ...recordRow(current), provider_id: 'provider.corrupt' }),
      rows(),
    ]);
    const replayRequest = compareAndSetRequestFor(current, 'cas:corrupt-replay');
    const corruptReplay = new ScriptedClient([
      rows(),
      rows({
        execution_id: current.id,
        request_hash: hashFromRememberedRequest(replayRequest),
        result_json: { invalid: true },
      }),
    ]);
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([corruptSource, corruptReplay])
    );

    await expect(store.compareAndSet(request)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
      details: { executionId: current.id },
    });
    expect(corruptSource.sql()).toContain('INSERT INTO execution_record_quarantine');

    await expect(store.compareAndSet(replayRequest)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
      message: 'Execution mutation idempotency record contains an invalid result.',
    });
  });

  it('acquires a durable lease with monotonic fencing and replays the result', async () => {
    const current = structuredClone(executionRecordCreateRequestExample.record);
    const request = acquireLeaseRequestFor(current, 'lease-acquire:first');
    const firstClient = new ScriptedClient([
      rows(),
      rows(),
      rows(recordRow(current)),
      rows(),
      rows({ lease_id: request.requestedLeaseId }),
      rows({ execution_id: current.id }),
      rows({ execution_id: current.id }),
    ]);
    const connection = new ScriptedTransactionPort([firstClient]);
    const store = new PostgresExecutionStoreFoundation(connection);

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
    const historyInsert = firstClient.commands.find(({ text }) =>
      text.includes('INSERT INTO execution_lease_history')
    );
    expect(historyInsert?.values).toEqual([
      request.requestedLeaseId,
      request.executionId,
      1,
      request.ownerId,
      request.acquiredAt,
    ]);

    const remembered = firstClient.commands.find(({ text }) =>
      text.includes('INSERT INTO execution_mutation_idempotency')
    );
    const requestHash = String(remembered?.values?.[3]);
    const replayClient = new ScriptedClient([
      rows(),
      rows({
        execution_id: request.executionId,
        request_hash: requestHash,
        result_json: structuredClone(acquired),
      }),
    ]);
    connection.push(replayClient);

    await expect(store.acquireLease(request)).resolves.toEqual(acquired);
    expect(replayClient.sql()).not.toContain('INSERT INTO execution_lease_history');
    expect(replayClient.sql()).not.toContain('UPDATE execution_records');
  });

  it('rejects stale revisions, old timestamps, active leases, and terminal records', async () => {
    const queued = structuredClone(executionRecordCreateRequestExample.record);
    const stale = acquireLeaseRequestFor(queued, undefined);
    stale.expectedRevision = 1;
    const oldTimestamp = acquireLeaseRequestFor(queued, undefined);
    oldTimestamp.acquiredAt = '2026-07-15T23:59:59.999Z';
    const leased = structuredClone(executionRecordExample);
    const active = acquireLeaseRequestFor(leased, undefined);
    active.acquiredAt = '2026-07-16T00:00:29.999Z';
    const terminal = terminalRecord();
    const terminalRequest = acquireLeaseRequestFor(terminal, undefined);
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([
        new ScriptedClient([rows(recordRow(queued))]),
        new ScriptedClient([rows(recordRow(queued))]),
        new ScriptedClient([rows(recordRow(leased))]),
        new ScriptedClient([rows(recordRow(terminal))]),
      ])
    );

    await expect(store.acquireLease(stale)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_REVISION_CONFLICT',
    });
    await expect(store.acquireLease(oldTimestamp)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CONFLICT',
      message: 'Lease acquisition time cannot precede the current Execution revision.',
    });
    await expect(store.acquireLease(active)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_LEASE_HELD',
    });
    await expect(store.acquireLease(terminalRequest)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_TERMINAL',
    });
  });

  it('takes over an expired lease, closes its history, and increments fencing', async () => {
    const current = structuredClone(executionRecordExample);
    if (!current.lease) throw new Error('Execution fixture must include a lease.');
    const request = acquireLeaseRequestFor(current, undefined);
    request.requestedLeaseId = 'lease.execution.example.takeover';
    request.ownerId = 'worker.takeover';
    request.acquiredAt = current.lease.expiresAt;
    const client = new ScriptedClient([
      rows(recordRow(current)),
      rows(),
      rows({ lease_id: current.lease.id }),
      rows({ lease_id: request.requestedLeaseId }),
      rows({ execution_id: current.id }),
    ]);
    const store = new PostgresExecutionStoreFoundation(new ScriptedTransactionPort([client]));

    await expect(store.acquireLease(request)).resolves.toMatchObject({
      revision: 2,
      status: current.status,
      attempt: current.attempt,
      lease: {
        id: request.requestedLeaseId,
        ownerId: request.ownerId,
        fencingToken: 2,
      },
    });
    const closeHistory = client.commands.find(({ text }) =>
      text.includes('UPDATE execution_lease_history')
    );
    expect(closeHistory?.values).toEqual([
      request.acquiredAt,
      'expired_and_replaced',
      current.lease.id,
      current.id,
      current.lease.fencingToken,
    ]);
    const recordUpdate = client.commands.find(({ text }) =>
      text.includes('UPDATE execution_records')
    );
    expect(recordUpdate?.values?.slice(-3)).toEqual([current.id, current.revision, 1]);
    expect(recordUpdate?.values?.[12]).toBe(2);
  });

  it('rejects reused lease identities and an insert race before updating the record', async () => {
    const current = structuredClone(executionRecordCreateRequestExample.record);
    const reused = acquireLeaseRequestFor(current, undefined);
    const raced = acquireLeaseRequestFor(current, undefined);
    raced.requestedLeaseId = 'lease.execution.example.raced';
    const reusedClient = new ScriptedClient([
      rows(recordRow(current)),
      rows({ lease_id: reused.requestedLeaseId }),
    ]);
    const racedClient = new ScriptedClient([rows(recordRow(current)), rows(), rows()]);
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([reusedClient, racedClient])
    );

    await expect(store.acquireLease(reused)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_LEASE_ID_CONFLICT',
    });
    await expect(store.acquireLease(raced)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_LEASE_ID_CONFLICT',
    });
    expect(reusedClient.sql()).not.toContain('UPDATE execution_records');
    expect(racedClient.sql()).not.toContain('UPDATE execution_records');
  });

  it('rejects when the fenced record update loses a race after staging lease evidence', async () => {
    const current = structuredClone(executionRecordCreateRequestExample.record);
    const request = acquireLeaseRequestFor(current, undefined);
    const client = new ScriptedClient([
      rows(recordRow(current)),
      rows(),
      rows({ lease_id: request.requestedLeaseId }),
      rows(),
    ]);
    const store = new PostgresExecutionStoreFoundation(new ScriptedTransactionPort([client]));

    await expect(store.acquireLease(request)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_REVISION_CONFLICT',
      message: 'Execution record changed during lease acquisition.',
    });
    expect(client.sql()).toContain('INSERT INTO execution_lease_history');
    expect(client.sql()).toContain('UPDATE execution_records');
  });

  it('rejects fencing overflow and missing expired-lease history', async () => {
    const queued = structuredClone(executionRecordCreateRequestExample.record);
    const overflowRow = {
      ...recordRow(queued),
      last_fencing_token: String(Number.MAX_SAFE_INTEGER),
    };
    const overflow = acquireLeaseRequestFor(queued, undefined);
    const leased = structuredClone(executionRecordExample);
    if (!leased.lease) throw new Error('Execution fixture must include a lease.');
    const missingHistory = acquireLeaseRequestFor(leased, undefined);
    missingHistory.requestedLeaseId = 'lease.execution.example.after-missing-history';
    missingHistory.acquiredAt = leased.lease.expiresAt;
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([
        new ScriptedClient([rows(overflowRow), rows()]),
        new ScriptedClient([rows(recordRow(leased)), rows(), rows()]),
      ])
    );

    await expect(store.acquireLease(overflow)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CONFLICT',
      message: 'Execution fencing token cannot be incremented safely.',
    });
    await expect(store.acquireLease(missingHistory)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
      message: 'Execution lease history is missing or already closed.',
    });
  });

  it('renews a fenced lease without changing its identity and replays the result', async () => {
    const current = structuredClone(executionRecordExample);
    const request = renewLeaseRequestFor(current, 'lease-renew:first');
    const firstClient = new ScriptedClient([
      rows(),
      rows(),
      rows(recordRow(current)),
      rows({ execution_id: current.id }),
      rows({ execution_id: current.id }),
    ]);
    const connection = new ScriptedTransactionPort([firstClient]);
    const store = new PostgresExecutionStoreFoundation(connection);

    const renewed = await store.renewLease(request);
    expect(renewed).toMatchObject({
      revision: 2,
      status: current.status,
      attempt: current.attempt,
      updatedAt: request.heartbeatAt,
      lease: {
        id: request.leaseGuard.leaseId,
        ownerId: request.leaseGuard.ownerId,
        fencingToken: request.leaseGuard.fencingToken,
        acquiredAt: current.lease?.acquiredAt,
        heartbeatAt: request.heartbeatAt,
        expiresAt: '2026-07-16T00:00:40.000Z',
      },
    });
    const recordUpdate = firstClient.commands.find(({ text }) =>
      text.includes('UPDATE execution_records')
    );
    expect(recordUpdate?.values?.slice(-3)).toEqual([current.id, current.revision, 1]);
    expect(recordUpdate?.values?.[12]).toBe(1);
    expect(firstClient.sql()).not.toContain('execution_lease_history');

    const remembered = firstClient.commands.find(({ text }) =>
      text.includes('INSERT INTO execution_mutation_idempotency')
    );
    const replayClient = new ScriptedClient([
      rows(),
      rows({
        execution_id: current.id,
        request_hash: String(remembered?.values?.[3]),
        result_json: structuredClone(renewed),
      }),
    ]);
    connection.push(replayClient);

    await expect(store.renewLease(request)).resolves.toEqual(renewed);
    expect(replayClient.sql()).not.toContain('UPDATE execution_records');
  });

  it('rejects renewals for missing leases, stale revisions, and terminal records', async () => {
    const queued = structuredClone(executionRecordCreateRequestExample.record);
    const missingLease = renewLeaseRequestFor(queued, undefined);
    const current = structuredClone(executionRecordExample);
    const stale = renewLeaseRequestFor(current, undefined);
    stale.expectedRevision = current.revision - 1;
    const terminal = terminalRecord();
    const terminalRequest = renewLeaseRequestFor(terminal, undefined);
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([
        new ScriptedClient([rows(recordRow(queued))]),
        new ScriptedClient([rows(recordRow(current))]),
        new ScriptedClient([rows(recordRow(terminal))]),
      ])
    );

    await expect(store.renewLease(missingLease)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_LEASE_LOST',
      message: 'Execution has no active lease.',
    });
    await expect(store.renewLease(stale)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_REVISION_CONFLICT',
    });
    await expect(store.renewLease(terminalRequest)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_TERMINAL',
    });
  });

  it('rejects stale lease ids, owners, and fencing tokens', async () => {
    const current = structuredClone(executionRecordExample);
    const staleLease = renewLeaseRequestFor(current, undefined);
    staleLease.leaseGuard.leaseId = 'lease.execution.example.stale';
    const staleOwner = renewLeaseRequestFor(current, undefined);
    staleOwner.leaseGuard.ownerId = 'worker.stale';
    const staleFencing = renewLeaseRequestFor(current, undefined);
    staleFencing.leaseGuard.fencingToken += 1;
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([
        new ScriptedClient([rows(recordRow(current))]),
        new ScriptedClient([rows(recordRow(current))]),
        new ScriptedClient([rows(recordRow(current))]),
      ])
    );

    for (const request of [staleLease, staleOwner, staleFencing]) {
      await expect(store.renewLease(request)).rejects.toMatchObject({
        code: 'EXECUTION_STORE_FENCING_REJECTED',
      });
    }
  });

  it('rejects non-advancing heartbeats, expired leases, and non-extending renewals', async () => {
    const current = structuredClone(executionRecordExample);
    if (!current.lease) throw new Error('Execution fixture must include a lease.');
    const sameHeartbeat = renewLeaseRequestFor(current, undefined);
    sameHeartbeat.heartbeatAt = current.updatedAt;
    const expired = renewLeaseRequestFor(current, undefined);
    expired.heartbeatAt = current.lease.expiresAt;
    const nonExtending = renewLeaseRequestFor(current, undefined);
    nonExtending.heartbeatAt = '2026-07-16T00:00:02.000Z';
    nonExtending.ttlMs = 1;
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([
        new ScriptedClient([rows(recordRow(current))]),
        new ScriptedClient([rows(recordRow(current))]),
        new ScriptedClient([rows(recordRow(current))]),
      ])
    );

    await expect(store.renewLease(sameHeartbeat)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CONFLICT',
      message: 'Lease heartbeat must advance the current Execution revision.',
    });
    await expect(store.renewLease(expired)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_LEASE_LOST',
      message: 'Execution lease has expired.',
    });
    await expect(store.renewLease(nonExtending)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CONFLICT',
      message: 'Lease renewal must extend the current expiry.',
    });
  });

  it('rejects a renewal when the fenced record update loses a race', async () => {
    const current = structuredClone(executionRecordExample);
    const request = renewLeaseRequestFor(current, undefined);
    const client = new ScriptedClient([rows(recordRow(current)), rows()]);
    const store = new PostgresExecutionStoreFoundation(new ScriptedTransactionPort([client]));

    await expect(store.renewLease(request)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_REVISION_CONFLICT',
      message: 'Execution record changed during lease renewal.',
    });
    expect(client.sql()).toContain('FOR UPDATE OF records');
    expect(client.sql()).toContain('UPDATE execution_records');
  });

  it('releases a fenced lease, closes its history, and replays the result', async () => {
    const current = structuredClone(executionRecordExample);
    const request = releaseLeaseRequestFor(current, 'lease-release:first');
    const firstClient = new ScriptedClient([
      rows(),
      rows(),
      rows(recordRow(current)),
      rows({ lease_id: request.leaseGuard.leaseId }),
      rows({ execution_id: current.id }),
      rows({ execution_id: current.id }),
    ]);
    const connection = new ScriptedTransactionPort([firstClient]);
    const store = new PostgresExecutionStoreFoundation(connection);

    const released = await store.releaseLease(request);
    expect(released).toEqual({
      ...current,
      revision: current.revision + 1,
      lease: undefined,
      updatedAt: request.releasedAt,
    });
    const historyUpdate = firstClient.commands.find(({ text }) =>
      text.includes('UPDATE execution_lease_history')
    );
    expect(historyUpdate?.values).toEqual([
      request.releasedAt,
      request.reason,
      request.leaseGuard.leaseId,
      request.executionId,
      request.leaseGuard.fencingToken,
    ]);
    const recordUpdate = firstClient.commands.find(({ text }) =>
      text.includes('UPDATE execution_records')
    );
    expect(recordUpdate?.values?.slice(-3)).toEqual([current.id, current.revision, 1]);
    expect(recordUpdate?.values?.[12]).toBe(1);

    const remembered = firstClient.commands.find(({ text }) =>
      text.includes('INSERT INTO execution_mutation_idempotency')
    );
    const replayClient = new ScriptedClient([
      rows(),
      rows({
        execution_id: current.id,
        request_hash: String(remembered?.values?.[3]),
        result_json: structuredClone(released),
      }),
    ]);
    connection.push(replayClient);

    await expect(store.releaseLease(request)).resolves.toEqual(released);
    expect(replayClient.sql()).not.toContain('UPDATE execution_lease_history');
    expect(replayClient.sql()).not.toContain('UPDATE execution_records');
  });

  it('releases a terminal lease without changing its terminal result', async () => {
    const current = terminalLeasedRecord();
    const request = releaseLeaseRequestFor(current, undefined);
    request.reason = undefined;
    const client = new ScriptedClient([
      rows(recordRow(current)),
      rows({ lease_id: request.leaseGuard.leaseId }),
      rows({ execution_id: current.id }),
    ]);
    const store = new PostgresExecutionStoreFoundation(new ScriptedTransactionPort([client]));

    const released = await store.releaseLease(request);
    expect(released.status).toBe('completed');
    expect(released.result).toEqual(current.result);
    expect(released.terminalReceipt).toEqual(current.terminalReceipt);
    expect(released.lease).toBeUndefined();
    const historyUpdate = client.commands.find(({ text }) =>
      text.includes('UPDATE execution_lease_history')
    );
    expect(historyUpdate?.values?.[1]).toBeNull();
  });

  it('rejects releases for missing leases, stale revisions, and stale fencing', async () => {
    const queued = structuredClone(executionRecordCreateRequestExample.record);
    const missingLease = releaseLeaseRequestFor(queued, undefined);
    const current = structuredClone(executionRecordExample);
    const staleRevision = releaseLeaseRequestFor(current, undefined);
    staleRevision.expectedRevision = current.revision - 1;
    const staleFencing = releaseLeaseRequestFor(current, undefined);
    staleFencing.leaseGuard.fencingToken += 1;
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([
        new ScriptedClient([rows(recordRow(queued))]),
        new ScriptedClient([rows(recordRow(current))]),
        new ScriptedClient([rows(recordRow(current))]),
      ])
    );

    await expect(store.releaseLease(missingLease)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_LEASE_LOST',
    });
    await expect(store.releaseLease(staleRevision)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_REVISION_CONFLICT',
    });
    await expect(store.releaseLease(staleFencing)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_FENCING_REJECTED',
    });
  });

  it('rejects time-regressing releases and missing lease history', async () => {
    const current = structuredClone(executionRecordExample);
    const timeRegression = releaseLeaseRequestFor(current, undefined);
    timeRegression.releasedAt = '2026-07-16T00:00:00.999Z';
    const missingHistory = releaseLeaseRequestFor(current, undefined);
    const store = new PostgresExecutionStoreFoundation(
      new ScriptedTransactionPort([
        new ScriptedClient([rows(recordRow(current))]),
        new ScriptedClient([rows(recordRow(current)), rows()]),
      ])
    );

    await expect(store.releaseLease(timeRegression)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CONFLICT',
      message: 'Lease release time cannot precede the current Execution revision.',
    });
    await expect(store.releaseLease(missingHistory)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_CORRUPT',
      message: 'Execution lease history is missing or already closed.',
    });
  });

  it('rejects release when the fenced record update loses a race after closing history', async () => {
    const current = structuredClone(executionRecordExample);
    const request = releaseLeaseRequestFor(current, undefined);
    const client = new ScriptedClient([
      rows(recordRow(current)),
      rows({ lease_id: request.leaseGuard.leaseId }),
      rows(),
    ]);
    const store = new PostgresExecutionStoreFoundation(new ScriptedTransactionPort([client]));

    await expect(store.releaseLease(request)).rejects.toMatchObject({
      code: 'EXECUTION_STORE_REVISION_CONFLICT',
      message: 'Execution record changed during lease release.',
    });
    expect(client.sql()).toContain('UPDATE execution_lease_history');
    expect(client.sql()).toContain('UPDATE execution_records');
  });

  it('exposes normalized connection health without opening a Store transaction', async () => {
    const health: ProviderHealth = {
      status: 'degraded',
      checkedAt: '2026-07-29T00:00:00.000Z',
      message: 'Postgres Execution store contains quarantined records.',
      details: {
        provider: 'postgres',
        ready: true,
        schemaVersion: 1,
        quarantinedRecords: 2,
      },
    };
    const connection = new ScriptedTransactionPort([], health);
    const store = new PostgresExecutionStoreFoundation(connection);

    await expect(store.health()).resolves.toEqual(health);
    expect(connection.healthCalls).toBe(1);
    expect(connection.transactions).toBe(0);
  });

  it('delegates close errors and allows the connection lifecycle to retry', async () => {
    const connection = new ScriptedTransactionPort([]);
    connection.closeFailures = 1;
    const store = new PostgresExecutionStoreFoundation(connection);

    await expect(store.close()).rejects.toThrow('connection close failed');
    await expect(store.close()).resolves.toBeUndefined();
    expect(connection.closeCalls).toBe(2);
    expect(connection.transactions).toBe(0);
  });
});

interface ScriptedCommand {
  text: string;
  values: readonly unknown[] | undefined;
}

class ScriptedTransactionPort implements PostgresExecutionStoreTransactionPort {
  private readonly clients: ScriptedClient[];
  transactions = 0;
  healthCalls = 0;
  closeCalls = 0;
  closeFailures = 0;

  constructor(
    clients: ScriptedClient[],
    private readonly healthEvidence: ProviderHealth = {
      status: 'healthy',
      checkedAt: '2026-07-29T00:00:00.000Z',
      details: { provider: 'postgres', ready: true },
    }
  ) {
    this.clients = [...clients];
  }

  push(client: ScriptedClient): void {
    this.clients.push(client);
  }

  async transaction<T>(
    operation: (client: PostgresExecutionStorePoolClient) => Promise<T>
  ): Promise<T> {
    this.transactions += 1;
    const client = this.clients.shift();
    if (!client) throw new Error('No scripted transaction client configured.');
    return operation(client);
  }

  async health(): Promise<ProviderHealth> {
    this.healthCalls += 1;
    return structuredClone(this.healthEvidence);
  }

  async close(): Promise<void> {
    this.closeCalls += 1;
    if (this.closeFailures > 0) {
      this.closeFailures -= 1;
      throw new Error('connection close failed');
    }
  }
}

class ScriptedClient implements PostgresExecutionStorePoolClient {
  readonly commands: ScriptedCommand[] = [];
  private readonly results: PostgresExecutionStoreSchemaQueryResult[];

  constructor(
    results: PostgresExecutionStoreSchemaQueryResult[],
    private readonly failure?: Error
  ) {
    this.results = [...results];
  }

  async query(
    text: string,
    values?: readonly unknown[]
  ): Promise<PostgresExecutionStoreSchemaQueryResult> {
    this.commands.push({ text, values });
    if (this.failure) throw this.failure;
    const result = this.results.shift();
    if (!result) throw new Error(`No scripted result configured for ${text}`);
    return result;
  }

  release(): void {}

  sql(): string {
    return this.commands.map(({ text }) => text).join('\n');
  }
}

function rows(...values: Array<Record<string, unknown>>): PostgresExecutionStoreSchemaQueryResult {
  return { rows: values };
}

function recordRow(record: ExecutionRecord): Record<string, unknown> {
  return {
    execution_id: record.id,
    revision: String(record.revision),
    status: record.status,
    tenant_id: record.request.tenantId ?? null,
    user_id: record.request.userId,
    workspace_id: record.request.workspaceId,
    run_id: record.request.runId ?? null,
    provider_id: record.providerId,
    created_at: new Date(record.createdAt),
    updated_at: new Date(record.updatedAt),
    lease_expires_at: record.lease ? new Date(record.lease.expiresAt) : null,
    execution_idempotency_key: record.request.idempotencyKey ?? null,
    idempotency_fingerprint: record.idempotencyFingerprint ?? null,
    last_fencing_token: String(record.lease?.fencingToken ?? 0),
    record_json: structuredClone(record),
    quarantine_reason: null,
  };
}

function withoutIdempotency(input: ExecutionRecordCreateRequest): ExecutionRecordCreateRequest {
  const request = structuredClone(input);
  request.idempotencyKey = undefined;
  request.record.request.idempotencyKey = undefined;
  request.record.idempotencyFingerprint = undefined;
  return request;
}

function recordWithIdentity(id: string, updatedAt: string): ExecutionRecord {
  const record = structuredClone(executionRecordCreateRequestExample.record);
  record.id = id;
  record.request.executionId = id;
  record.updatedAt = updatedAt;
  return record;
}

function compareAndSetRequestFor(
  current: ExecutionRecord,
  idempotencyKey: string | undefined,
  expectedRevision = current.revision,
  status: 'starting' | 'running' = 'starting'
): ExecutionRecordCompareAndSetRequest {
  return {
    operationId: `operation.${idempotencyKey ?? `cas:${current.id}:${expectedRevision}`}`,
    executionId: current.id,
    expectedRevision,
    next: {
      ...structuredClone(current),
      revision: expectedRevision + 1,
      status,
      attempt: status === 'starting' ? Math.max(1, current.attempt) : current.attempt,
      updatedAt: new Date(Date.parse(current.updatedAt) + 1_000).toISOString(),
    },
    ...(idempotencyKey ? { idempotencyKey } : undefined),
  };
}

function acquireLeaseRequestFor(
  current: ExecutionRecord,
  idempotencyKey: string | undefined
): ExecutionLeaseAcquireRequest {
  const request = structuredClone(executionLeaseAcquireRequestExample);
  request.executionId = current.id;
  request.expectedRevision = current.revision;
  request.acquiredAt = current.updatedAt;
  request.requestedLeaseId = `lease.${current.id}.next`;
  request.ownerId = 'worker.postgres.next';
  if (idempotencyKey) {
    request.operationId = `operation.${idempotencyKey}`;
    request.idempotencyKey = idempotencyKey;
  } else {
    request.operationId = `operation.lease.acquire.${current.id}.${current.revision}`;
    request.idempotencyKey = undefined;
  }
  return request;
}

function renewLeaseRequestFor(
  current: ExecutionRecord,
  idempotencyKey: string | undefined
): ExecutionLeaseRenewRequest {
  const request = structuredClone(executionLeaseRenewRequestExample);
  request.executionId = current.id;
  request.expectedRevision = current.revision;
  request.leaseGuard = current.lease
    ? {
        leaseId: current.lease.id,
        ownerId: current.lease.ownerId,
        fencingToken: current.lease.fencingToken,
      }
    : structuredClone(executionLeaseGuardExample);
  if (idempotencyKey) {
    request.operationId = `operation.${idempotencyKey}`;
    request.idempotencyKey = idempotencyKey;
  } else {
    request.operationId = `operation.lease.renew.${current.id}.${current.revision}`;
    request.idempotencyKey = undefined;
  }
  return request;
}

function releaseLeaseRequestFor(
  current: ExecutionRecord,
  idempotencyKey: string | undefined
): ExecutionLeaseReleaseRequest {
  const request = structuredClone(executionLeaseReleaseRequestExample);
  request.executionId = current.id;
  request.expectedRevision = current.revision;
  request.leaseGuard = current.lease
    ? {
        leaseId: current.lease.id,
        ownerId: current.lease.ownerId,
        fencingToken: current.lease.fencingToken,
      }
    : structuredClone(executionLeaseGuardExample);
  if (idempotencyKey) {
    request.operationId = `operation.${idempotencyKey}`;
    request.idempotencyKey = idempotencyKey;
  } else {
    request.operationId = `operation.lease.release.${current.id}.${current.revision}`;
    request.idempotencyKey = undefined;
  }
  return request;
}

function terminalRecord(): ExecutionRecord {
  const current = structuredClone(executionRecordCreateRequestExample.record);
  return {
    ...current,
    revision: 1,
    status: 'completed',
    sandboxId: commandExecutionResultExample.sandboxId,
    attempt: 1,
    result: {
      ...structuredClone(commandExecutionResultExample),
      executionId: current.id,
      revision: 1,
      status: 'completed',
    },
    updatedAt: '2026-07-16T00:00:02.000Z',
  };
}

function terminalLeasedRecord(): ExecutionRecord {
  const current = structuredClone(executionRecordExample);
  return {
    ...current,
    status: 'completed',
    result: {
      ...structuredClone(commandExecutionResultExample),
      executionId: current.id,
      revision: current.revision,
      status: 'completed',
    },
    terminalReceipt: {
      id: 'receipt.execution.example',
      providerId: current.providerId,
      executionId: current.id,
      status: 'completed',
      issuedAt: current.updatedAt,
      receiptHash: 'sha256:receipt.example',
    },
  };
}

function hashFromRememberedRequest(request: ExecutionRecordCompareAndSetRequest): string {
  return `sha256:${createHash('sha256').update(JSON.stringify(request)).digest('hex')}`;
}
