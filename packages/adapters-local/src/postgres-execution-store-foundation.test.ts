import type { ExecutionRecord, ExecutionRecordCreateRequest } from '@hypha/core';
import { executionRecordCreateRequestExample } from '@hypha/core';
import { describe, expect, it } from 'vitest';
import type { PostgresExecutionStorePoolClient } from './postgres-execution-store-connection';
import {
  PostgresExecutionStoreFoundation,
  type PostgresExecutionStoreTransactionPort,
} from './postgres-execution-store-foundation';
import type { PostgresExecutionStoreSchemaQueryResult } from './postgres-execution-store-schema';

describe('PostgresExecutionStoreFoundation create/get', () => {
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
});

interface ScriptedCommand {
  text: string;
  values: readonly unknown[] | undefined;
}

class ScriptedTransactionPort implements PostgresExecutionStoreTransactionPort {
  private readonly clients: ScriptedClient[];
  transactions = 0;

  constructor(clients: ScriptedClient[]) {
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
