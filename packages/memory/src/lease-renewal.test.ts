import { afterEach, describe, expect, it, vi } from 'vitest';
import { IndexOutboxWorker, type ManagedVectorStoreAdapter } from './index-outbox';
import {
  InMemoryMemoryLifecycleTaskStore,
  LeasedMemoryLifecycleWorker,
  type MemoryLifecycleTask,
} from './lifecycle-workers';
import {
  InMemoryManagedMemoryRecordStore,
  InMemoryMemoryIndexOutboxStore,
  type MemoryIndexOutboxRecord,
} from './managed-store';

const start = new Date('2026-07-24T00:00:00.000Z');

afterEach(() => {
  vi.useRealTimers();
});

describe('multi-instance lease renewal and fencing', () => {
  it('renews a long-running lifecycle task and prevents a second worker takeover', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(start);
    const store = new InMemoryMemoryLifecycleTaskStore();
    await store.enqueue(lifecycleTask());
    const worker = new LeasedMemoryLifecycleWorker({
      type: 'retention',
      ownerId: 'worker:first',
      store,
      leaseMs: 60,
      renewalMs: 20,
      now: () => new Date(),
      handler: async () => {
        await delay(90);
      },
    });

    const running = worker.runOnce();
    await vi.advanceTimersByTimeAsync(45);
    await expect(
      store.lease(
        'retention',
        'worker:second',
        new Date().toISOString(),
        new Date(Date.now() + 60).toISOString(),
        1
      )
    ).resolves.toEqual([]);
    await vi.advanceTimersByTimeAsync(50);

    await expect(running).resolves.toMatchObject({ leased: 1, completed: 1, failed: 0 });
    await expect(store.list()).resolves.toMatchObject([
      { state: 'completed', attempts: 1, fencingToken: 1 },
    ]);
  });

  it('aborts cooperative lifecycle work when renewal loses ownership', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(start);
    const store = new InMemoryMemoryLifecycleTaskStore();
    await store.enqueue(lifecycleTask('lifecycle:lost-renewal'));
    vi.spyOn(store, 'renew').mockResolvedValue(false);
    vi.spyOn(store, 'fail').mockResolvedValue(false);
    let observedAbort = false;
    const worker = new LeasedMemoryLifecycleWorker({
      type: 'retention',
      ownerId: 'worker:first',
      store,
      leaseMs: 60,
      renewalMs: 20,
      now: () => new Date(),
      handler: (_task, signal) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener(
            'abort',
            () => {
              observedAbort = true;
              reject(signal.reason);
            },
            { once: true }
          );
        }),
    });

    const running = worker.runOnce();
    await vi.advanceTimersByTimeAsync(25);

    await expect(running).resolves.toMatchObject({ leased: 1, completed: 0, failed: 1 });
    expect(observedAbort).toBe(true);
    expect(store.fail).toHaveBeenCalledOnce();
  });

  it('rejects completion after expiry and advances a monotonic lifecycle fencing token', async () => {
    const store = new InMemoryMemoryLifecycleTaskStore();
    const task = lifecycleTask('lifecycle:expiry');
    await store.enqueue(task);
    const [first] = await store.lease('retention', 'worker:first', at(1), at(5), 1);

    await expect(
      store.complete(task.id, 'worker:first', first?.leaseToken ?? '', at(5))
    ).resolves.toBe(false);
    const [second] = await store.lease('retention', 'worker:second', at(6), at(10), 1);
    expect(second?.fencingToken).toBe(2);
    await expect(
      store.complete(task.id, 'worker:first', first?.leaseToken ?? '', at(7))
    ).resolves.toBe(false);
    await expect(
      store.complete(task.id, 'worker:second', second?.leaseToken ?? '', at(7))
    ).resolves.toBe(true);
  });

  it('renews long-running index work and rejects stale outbox completion', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(start);
    const outbox = new InMemoryMemoryIndexOutboxStore();
    await outbox.enqueue(outboxRecord());
    const vectorStore: ManagedVectorStoreAdapter = {
      id: 'vector:test',
      upsert: async () => undefined,
      delete: async () => {
        await delay(90);
      },
      search: async () => [],
      health: async () => ({ status: 'healthy', checkedAt: new Date().toISOString() }),
    };
    const worker = new IndexOutboxWorker({
      ownerId: 'index:first',
      outboxStore: outbox,
      recordStore: new InMemoryManagedMemoryRecordStore(),
      embeddingProvider: { embed: async () => [] },
      vectorStores: [vectorStore],
      leaseMs: 60,
      renewalMs: 20,
      now: () => new Date(),
    });

    const running = worker.runOnce();
    await vi.advanceTimersByTimeAsync(45);
    await expect(
      outbox.lease(
        'index:second',
        new Date().toISOString(),
        new Date(Date.now() + 60).toISOString(),
        1
      )
    ).resolves.toEqual([]);
    await vi.advanceTimersByTimeAsync(50);

    await expect(running).resolves.toMatchObject({ leased: 1, completed: 1, failed: 0 });
    await expect(outbox.list()).resolves.toMatchObject([
      { state: 'completed', attempts: 1, fencingToken: 1 },
    ]);
  });

  it('requires an unexpired outbox lease for renew, complete and fail', async () => {
    const store = new InMemoryMemoryIndexOutboxStore();
    const record = outboxRecord('outbox:expiry');
    await store.enqueue(record);
    const [first] = await store.lease('index:first', at(1), at(5), 1);

    await expect(
      store.renew(record.id, 'index:first', first?.leaseToken ?? '', at(4), at(8))
    ).resolves.toBe(true);
    await expect(
      store.complete(record.id, 'index:first', first?.leaseToken ?? '', at(8))
    ).resolves.toBe(false);
    const [second] = await store.lease('index:second', at(9), at(12), 1);
    expect(second?.fencingToken).toBe(2);
    await expect(
      store.fail(
        record.id,
        'index:first',
        first?.leaseToken ?? '',
        at(10),
        {
          code: 'MEMORY_INDEX_FAILED',
          message: 'stale owner',
          retryable: true,
        },
        at(11)
      )
    ).resolves.toBe(false);
    await expect(
      store.complete(record.id, 'index:second', second?.leaseToken ?? '', at(10))
    ).resolves.toBe(true);
  });
});

function lifecycleTask(id = 'lifecycle:renewal'): MemoryLifecycleTask {
  return {
    id,
    operationId: `operation:${id}`,
    type: 'retention',
    scopeHash: 'scope:renewal',
    payload: {},
    state: 'pending',
    attempts: 0,
    availableAt: at(0),
    createdAt: at(0),
    updatedAt: at(0),
  };
}

function outboxRecord(id = 'outbox:renewal'): MemoryIndexOutboxRecord {
  return {
    id,
    operationId: `operation:${id}`,
    memoryId: 'memory:renewal',
    memoryVersionId: 'memory:renewal:v1',
    scopeHash: 'scope:renewal',
    action: 'delete',
    targetVectorStoreIds: ['vector:test'],
    state: 'pending',
    attempts: 0,
    availableAt: at(0),
    createdAt: at(0),
    updatedAt: at(0),
  };
}

function at(milliseconds: number): string {
  return new Date(start.getTime() + milliseconds).toISOString();
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
