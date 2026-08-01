import { describe, expect, it } from 'vitest';
import type { StructuredQuery, StructuredStoreProvider } from './index';
import type { MemoryLifecycleTask } from './lifecycle-workers';
import type { MemoryIndexOutboxRecord } from './managed-store';
import { StructuredMemoryLifecycleTaskStore } from './structured-lifecycle-task-store';
import { StructuredMemoryIndexOutboxStore } from './structured-memory-persistence';

const start = new Date('2026-07-24T00:00:00.000Z');

describe('structured lease renewal persistence', () => {
  it('persists lifecycle renewal and fencing across store instances', async () => {
    const provider = new TestStructuredStore();
    const firstStore = new StructuredMemoryLifecycleTaskStore({ store: provider });
    const secondStore = new StructuredMemoryLifecycleTaskStore({ store: provider });
    const task = lifecycleTask();
    await firstStore.enqueue(task);
    const [first] = await firstStore.lease('retention', 'worker:first', at(1), at(5), 1);

    await expect(
      firstStore.renew(task.id, 'worker:first', first?.leaseToken ?? '', at(4), at(8))
    ).resolves.toBe(true);
    await expect(
      secondStore.lease('retention', 'worker:second', at(6), at(10), 1)
    ).resolves.toEqual([]);
    await expect(
      firstStore.complete(task.id, 'worker:first', first?.leaseToken ?? '', at(8))
    ).resolves.toBe(false);

    const [second] = await secondStore.lease('retention', 'worker:second', at(9), at(12), 1);
    expect(second?.fencingToken).toBe(2);
    await expect(
      secondStore.complete(task.id, 'worker:second', second?.leaseToken ?? '', at(10))
    ).resolves.toBe(true);
  });

  it('persists outbox renewal and rejects an expired owner', async () => {
    const provider = new TestStructuredStore();
    const firstStore = new StructuredMemoryIndexOutboxStore({ provider });
    const secondStore = new StructuredMemoryIndexOutboxStore({ provider });
    const record = outboxRecord();
    await firstStore.enqueue(record);
    const [first] = await firstStore.lease('index:first', at(1), at(5), 1);

    await expect(
      firstStore.renew(record.id, 'index:first', first?.leaseToken ?? '', at(4), at(8))
    ).resolves.toBe(true);
    await expect(secondStore.lease('index:second', at(6), at(10), 1)).resolves.toEqual([]);
    await expect(
      firstStore.complete(record.id, 'index:first', first?.leaseToken ?? '', at(8))
    ).resolves.toBe(false);

    const [second] = await secondStore.lease('index:second', at(9), at(12), 1);
    expect(second?.fencingToken).toBe(2);
    await expect(
      secondStore.complete(record.id, 'index:second', second?.leaseToken ?? '', at(10))
    ).resolves.toBe(true);
  });
});

class TestStructuredStore implements StructuredStoreProvider {
  private readonly tables = new Map<string, Map<string, unknown>>();

  async get<T>(table: string, id: string): Promise<T | null> {
    const value = this.table(table).get(id);
    return value === undefined ? null : structuredClone(value as T);
  }

  async insert<T extends { id: string }>(table: string, record: T): Promise<void> {
    if (this.table(table).has(record.id)) throw new Error(`duplicate record: ${record.id}`);
    this.table(table).set(record.id, structuredClone(record));
  }

  async update<T>(table: string, id: string, patch: Partial<T>): Promise<void> {
    const current = this.table(table).get(id);
    if (!current) throw new Error(`record not found: ${table}/${id}`);
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
    const existing = this.tables.get(name);
    if (existing) return existing;
    const created = new Map<string, unknown>();
    this.tables.set(name, created);
    return created;
  }
}

function lifecycleTask(): MemoryLifecycleTask {
  return {
    id: 'lifecycle:structured-renewal',
    operationId: 'operation:lifecycle:structured-renewal',
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

function outboxRecord(): MemoryIndexOutboxRecord {
  return {
    id: 'outbox:structured-renewal',
    operationId: 'operation:outbox:structured-renewal',
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
