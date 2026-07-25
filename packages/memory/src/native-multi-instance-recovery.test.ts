import { describe, expect, it, vi } from 'vitest';
import {
  InMemoryMemoryLifecycleTaskStore,
  LeasedMemoryLifecycleWorker,
  MemoryWorkerSupervisor,
  StructuredMemoryIndexOutboxStore,
  type MemoryIndexOutboxRecord,
  type MemoryLifecycleTask,
  type StructuredQuery,
  type StructuredStoreProvider,
} from './index';

class SharedStructuredStore implements StructuredStoreProvider {
  private readonly tables = new Map<string, Map<string, unknown>>();

  async get<T>(table: string, id: string): Promise<T | null> {
    const value = this.table(table).get(id);
    return value === undefined ? null : structuredClone(value as T);
  }

  async insert<T extends { id: string }>(table: string, record: T): Promise<void> {
    if (this.table(table).has(record.id)) throw new Error('duplicate record: ' + record.id);
    this.table(table).set(record.id, structuredClone(record));
  }

  async update<T>(table: string, id: string, patch: Partial<T>): Promise<void> {
    const current = this.table(table).get(id);
    if (!current) return;
    this.table(table).set(id, structuredClone({ ...(current as object), ...(patch as object) }));
  }

  async delete(table: string, id: string): Promise<void> {
    this.table(table).delete(id);
  }

  async query<T>(table: string, query: StructuredQuery): Promise<T[]> {
    return [...this.table(table).values()]
      .filter((value) =>
        Object.entries(query.where ?? {}).every(
          ([key, expected]) => (value as Record<string, unknown>)[key] === expected
        )
      )
      .slice(0, query.limit)
      .map((value) => structuredClone(value as T));
  }

  transaction<T>(operation: (transaction: StructuredStoreProvider) => Promise<T>): Promise<T> {
    return operation(this);
  }

  private table(name: string): Map<string, unknown> {
    const current = this.tables.get(name);
    if (current) return current;
    const created = new Map<string, unknown>();
    this.tables.set(name, created);
    return created;
  }
}

function lifecycleTask(id = 'lifecycle:multi-instance'): MemoryLifecycleTask {
  return {
    id,
    operationId: 'operation:multi-instance',
    type: 'retention',
    scopeHash: 'scope:multi-instance',
    payload: {},
    state: 'pending',
    attempts: 0,
    availableAt: '2026-07-22T00:00:00.000Z',
    createdAt: '2026-07-22T00:00:00.000Z',
    updatedAt: '2026-07-22T00:00:00.000Z',
  };
}

function outboxRecord(): MemoryIndexOutboxRecord {
  return {
    id: 'outbox:multi-instance',
    operationId: 'operation:multi-instance',
    memoryId: 'memory:multi-instance',
    memoryVersionId: 'memory:multi-instance:v1',
    scopeHash: 'scope:multi-instance',
    action: 'upsert',
    targetVectorStoreIds: ['vector:shared'],
    state: 'pending',
    attempts: 0,
    availableAt: '2026-07-22T00:00:00.000Z',
    createdAt: '2026-07-22T00:00:00.000Z',
    updatedAt: '2026-07-22T00:00:00.000Z',
  };
}

describe('Native Memory multi-instance recovery boundary', () => {
  it('allows only one worker instance to claim a lifecycle task', async () => {
    const store = new InMemoryMemoryLifecycleTaskStore();
    await store.enqueue(lifecycleTask());
    const handledBy: string[] = [];
    const createWorker = (ownerId: string) =>
      new LeasedMemoryLifecycleWorker({
        type: 'retention',
        ownerId,
        store,
        now: () => new Date('2026-07-22T00:00:01.000Z'),
        handler: async () => {
          handledBy.push(ownerId);
        },
      });

    const results = await Promise.all([
      createWorker('worker:a').runOnce(),
      createWorker('worker:b').runOnce(),
    ]);

    expect(results.reduce((total, result) => total + result.leased, 0)).toBe(1);
    expect(handledBy).toHaveLength(1);
    await expect(store.list('retention')).resolves.toMatchObject([
      { state: 'completed', attempts: 1 },
    ]);
  });

  it('fences a stale lifecycle owner after lease-expiry takeover', async () => {
    const store = new InMemoryMemoryLifecycleTaskStore();
    const task = lifecycleTask('lifecycle:takeover');
    await store.enqueue(task);
    const [first] = await store.lease(
      'retention',
      'worker:first',
      '2026-07-22T00:00:01.000Z',
      '2026-07-22T00:00:05.000Z',
      1
    );
    const [second] = await store.lease(
      'retention',
      'worker:second',
      '2026-07-22T00:00:06.000Z',
      '2026-07-22T00:00:10.000Z',
      1
    );

    expect(first?.leaseToken).toBeTruthy();
    expect(second?.leaseToken).toBeTruthy();
    expect(second?.leaseToken).not.toBe(first?.leaseToken);
    await expect(
      store.complete(task.id, 'worker:first', first?.leaseToken ?? '', '2026-07-22T00:00:07.000Z')
    ).resolves.toBe(false);
    await expect(
      store.complete(task.id, 'worker:second', second?.leaseToken ?? '', '2026-07-22T00:00:07.000Z')
    ).resolves.toBe(true);
    await expect(store.list('retention')).resolves.toMatchObject([
      { state: 'completed', attempts: 2 },
    ]);
  });

  it('fences stale outbox completion across store instances', async () => {
    const database = new SharedStructuredStore();
    const firstStore = new StructuredMemoryIndexOutboxStore({ provider: database });
    const secondStore = new StructuredMemoryIndexOutboxStore({ provider: database });
    const record = outboxRecord();
    await firstStore.enqueue(record);
    const [first] = await firstStore.lease(
      'index:first',
      '2026-07-22T00:00:01.000Z',
      '2026-07-22T00:00:05.000Z',
      1
    );
    const [second] = await secondStore.lease(
      'index:second',
      '2026-07-22T00:00:06.000Z',
      '2026-07-22T00:00:10.000Z',
      1
    );

    await expect(
      firstStore.complete(
        record.id,
        'index:first',
        first?.leaseToken ?? '',
        '2026-07-22T00:00:07.000Z'
      )
    ).resolves.toBe(false);
    await expect(
      secondStore.complete(
        record.id,
        'index:second',
        second?.leaseToken ?? '',
        '2026-07-22T00:00:07.000Z'
      )
    ).resolves.toBe(true);
    await expect(secondStore.list()).resolves.toMatchObject([{ state: 'completed', attempts: 2 }]);
  });

  it('drains every supervised worker before shutdown completes', async () => {
    const events: string[] = [];
    let release: (() => void) | undefined;
    const draining = new Promise<void>((resolve) => {
      release = resolve;
    });
    const worker = {
      runOnce: vi.fn(async () => undefined),
      start: vi.fn(() => events.push('started')),
      stopAndDrain: vi.fn(async () => {
        events.push('draining');
        await draining;
        events.push('drained');
      }),
    };
    const supervisor = new MemoryWorkerSupervisor({ workers: [worker] });
    await supervisor.start();
    const stopping = supervisor.stop();
    await Promise.resolve();

    expect(supervisor.status()).toBe('stopping');
    expect(events).toEqual(['started', 'draining']);
    release?.();
    await stopping;
    expect(events).toEqual(['started', 'draining', 'drained']);
    expect(supervisor.status()).toBe('stopped');
  });
});
