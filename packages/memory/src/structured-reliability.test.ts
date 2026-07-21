import { describe, expect, it, vi } from 'vitest';
import {
  ProviderReconciliationWorker,
  StructuredMemoryExtractionStateStore,
  StructuredMemoryLifecycleTaskStore,
  createProviderReconciliationHandler,
  enqueueProviderDeleteReconciliation,
  memoryProfileSpecExample,
  NativeMemoryManagementProvider,
  type MemoryExtractionBatch,
  type MemoryExtractionJob,
  type MemoryLifecycleTask,
  type MemoryPrincipal,
  type StructuredQuery,
  type StructuredStoreProvider,
} from './index';

class TestStructuredStore implements StructuredStoreProvider {
  private readonly tables = new Map<string, Map<string, unknown>>();

  async get<T>(table: string, id: string): Promise<T | null> {
    const value = this.tables.get(table)?.get(id);
    return value === undefined ? null : structuredClone(value as T);
  }

  async insert<T extends { id: string }>(table: string, record: T): Promise<void> {
    const records = this.table(table);
    if (records.has(record.id)) throw new Error(`duplicate record: ${record.id}`);
    records.set(record.id, structuredClone(record));
  }

  async update<T>(table: string, id: string, patch: Partial<T>): Promise<void> {
    const records = this.table(table);
    const current = records.get(id);
    if (!current) return;
    records.set(id, structuredClone({ ...(current as object), ...(patch as object) }));
  }

  async delete(table: string, id: string): Promise<void> {
    this.table(table).delete(id);
  }

  async query<T>(table: string, query: StructuredQuery): Promise<T[]> {
    return Array.from(this.table(table).values())
      .filter((value) =>
        Object.entries(query.where ?? {}).every(
          ([key, expected]) => (value as Record<string, unknown>)[key] === expected
        )
      )
      .slice(0, query.limit)
      .map((value) => structuredClone(value as T));
  }

  transaction<T>(fn: (transaction: StructuredStoreProvider) => Promise<T>): Promise<T> {
    return fn(this);
  }

  private table(name: string): Map<string, unknown> {
    let table = this.tables.get(name);
    if (!table) {
      table = new Map();
      this.tables.set(name, table);
    }
    return table;
  }
}

const principal: MemoryPrincipal = {
  principalId: 'user:reliability',
  type: 'user',
  userId: 'user:reliability',
  permissionScopes: ['memory:write'],
};
const scope = { userId: 'user:reliability', workspaceId: 'workspace:reliability' };

describe('structured memory reliability stores', () => {
  it('persists extraction jobs, batches and cursor CAS across store instances', async () => {
    const database = new TestStructuredStore();
    const first = new StructuredMemoryExtractionStateStore({ store: database });
    const job: MemoryExtractionJob = {
      id: 'extraction:1',
      operationId: 'operation:extraction:1',
      scopeHash: 'scope:1',
      profileRef: { id: 'memory.extraction.default', version: '1.0.0' },
      profileRevision: 'extraction:v1',
      sourceRefs: [{ type: 'conversation', sourceId: 'conversation:1' }],
      status: 'running',
      attempts: 1,
      createdAt: '2026-07-20T00:00:00.000Z',
    };
    const batch: MemoryExtractionBatch = {
      id: 'extraction:1:batch',
      jobId: job.id,
      sourceRefs: job.sourceRefs,
      candidates: [],
      rejectedCandidates: [],
      sourceHash: 'source:1',
      extractorVersion: 'extractor:v1',
      createdAt: job.createdAt,
    };
    await first.saveJob(job);
    await first.saveBatch(batch);
    await first.saveCursor(
      { sourceType: 'conversation', sourceId: 'conversation:1', sequence: 1 },
      0
    );

    const restarted = new StructuredMemoryExtractionStateStore({ store: database });
    expect(await restarted.getJob(job.id)).toEqual(job);
    expect(await restarted.getBatch(batch.id)).toEqual(batch);
    expect(await restarted.getCursor('conversation', 'conversation:1')).toMatchObject({
      sequence: 1,
    });

    await first.saveCursor(
      { sourceType: 'conversation', sourceId: 'conversation:1', sequence: 2 },
      1
    );
    await expect(
      restarted.saveCursor(
        { sourceType: 'conversation', sourceId: 'conversation:1', sequence: 3 },
        1
      )
    ).rejects.toMatchObject({ code: 'MEMORY_EXTRACTION_CURSOR_CONFLICT' });
  });

  it('recovers expired lifecycle leases after a process restart', async () => {
    const database = new TestStructuredStore();
    const first = new StructuredMemoryLifecycleTaskStore({ store: database });
    const task: MemoryLifecycleTask = {
      id: 'lifecycle:1',
      operationId: 'operation:lifecycle:1',
      type: 'retention',
      scopeHash: 'scope:1',
      payload: {},
      state: 'pending',
      attempts: 0,
      availableAt: '2026-07-20T00:00:00.000Z',
      createdAt: '2026-07-20T00:00:00.000Z',
      updatedAt: '2026-07-20T00:00:00.000Z',
    };
    await first.enqueue(task);
    expect(
      await first.lease(
        'retention',
        'worker:first',
        '2026-07-20T00:00:01.000Z',
        '2026-07-20T00:00:10.000Z',
        1
      )
    ).toMatchObject([{ attempts: 1, leaseOwner: 'worker:first' }]);

    const restarted = new StructuredMemoryLifecycleTaskStore({ store: database });
    expect(
      await restarted.lease(
        'retention',
        'worker:second',
        '2026-07-20T00:00:05.000Z',
        '2026-07-20T00:00:15.000Z',
        1
      )
    ).toEqual([]);
    expect(
      await restarted.lease(
        'retention',
        'worker:second',
        '2026-07-20T00:00:11.000Z',
        '2026-07-20T00:00:20.000Z',
        1
      )
    ).toMatchObject([{ attempts: 2, leaseOwner: 'worker:second' }]);
    await restarted.complete(task.id, '2026-07-20T00:00:12.000Z');
    expect(await restarted.list('retention')).toMatchObject([{ state: 'completed' }]);
  });

  it('persists and completes provider deletion reconciliation after restart', async () => {
    const database = new TestStructuredStore();
    const first = new StructuredMemoryLifecycleTaskStore({ store: database });
    const provider = new NativeMemoryManagementProvider({ profile: memoryProfileSpecExample });
    const remove = vi.spyOn(provider, 'delete').mockResolvedValue({
      operationId: 'operation:delete:1',
      status: 'completed',
      deletedMemoryIds: ['memory:1'],
    });
    const request = {
      operationId: 'operation:delete:1',
      principal,
      scope,
      memoryIds: ['memory:1'],
      mode: 'compliance' as const,
      reason: 'user request',
      idempotencyKey: 'delete:memory:1',
    };
    await enqueueProviderDeleteReconciliation(
      request,
      {
        operationId: request.operationId,
        status: 'partial',
        deletedMemoryIds: ['memory:1'],
        pendingProviderIds: [provider.id],
      },
      first,
      '2026-07-20T00:00:00.000Z'
    );

    const restarted = new StructuredMemoryLifecycleTaskStore({ store: database });
    const worker = new ProviderReconciliationWorker({
      ownerId: 'worker:reconciliation',
      store: restarted,
      handler: createProviderReconciliationHandler({
        resolveProvider: (providerId) => (providerId === provider.id ? provider : undefined),
      }),
      now: () => new Date('2026-07-20T00:00:01.000Z'),
    });

    await expect(worker.runOnce()).resolves.toMatchObject({ completed: 1, failed: 0 });
    expect(remove).toHaveBeenCalledWith(request, expect.anything());
    expect(await restarted.list('provider_reconciliation')).toMatchObject([
      { state: 'completed', attempts: 1 },
    ]);
  });

  it('dead-letters reconciliation when the provider remains unavailable', async () => {
    const database = new TestStructuredStore();
    const tasks = new StructuredMemoryLifecycleTaskStore({ store: database });
    const request = {
      operationId: 'operation:delete:missing-provider',
      principal,
      scope,
      memoryIds: ['memory:missing-provider'],
      mode: 'compliance' as const,
      reason: 'user request',
      idempotencyKey: 'delete:missing-provider',
    };
    await enqueueProviderDeleteReconciliation(
      request,
      {
        operationId: request.operationId,
        status: 'partial',
        deletedMemoryIds: [],
        pendingProviderIds: ['memory.provider.missing'],
      },
      tasks,
      '2026-07-20T00:00:00.000Z'
    );
    const worker = new ProviderReconciliationWorker({
      ownerId: 'worker:missing-provider',
      store: tasks,
      handler: createProviderReconciliationHandler({ resolveProvider: () => undefined }),
      maxAttempts: 1,
      now: () => new Date('2026-07-20T00:00:01.000Z'),
    });

    await expect(worker.runOnce()).resolves.toMatchObject({
      leased: 1,
      completed: 0,
      failed: 0,
      deadLettered: 1,
    });
    expect(await tasks.list('provider_reconciliation')).toMatchObject([
      {
        state: 'dead_letter',
        attempts: 1,
        lastError: { code: 'MEMORY_PROVIDER_UNAVAILABLE', retryable: true },
      },
    ]);
  });
});
