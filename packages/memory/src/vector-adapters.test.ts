import { describe, expect, it } from 'vitest';
import {
  InMemoryLocalVectorStoreAdapter,
  LegacyVectorIndexStoreAdapter,
  StructuredManagedVectorStoreAdapter,
  type ManagedVectorStoreAdapter,
  type VectorIndexProvider,
  type VectorRecord,
  type StructuredQuery,
  type StructuredStoreProvider,
} from './index';

class TestStructuredStore implements StructuredStoreProvider {
  private readonly records = new Map<string, Record<string, unknown>>();

  async get<T>(_table: string, id: string): Promise<T | null> {
    const record = this.records.get(id);
    return record ? (structuredClone(record) as T) : null;
  }

  async insert<T extends { id: string }>(_table: string, record: T): Promise<void> {
    if (this.records.has(record.id)) throw new Error('duplicate');
    this.records.set(record.id, structuredClone(record) as Record<string, unknown>);
  }

  async update<T>(_table: string, id: string, patch: Partial<T>): Promise<void> {
    const current = this.records.get(id);
    if (!current) throw new Error('missing');
    this.records.set(id, { ...current, ...(structuredClone(patch) as object) });
  }

  async compareAndSet<T>(
    _table: string,
    id: string,
    expected: Partial<T>,
    patch: Partial<T>
  ): Promise<boolean> {
    const current = this.records.get(id);
    if (
      !current ||
      Object.entries(expected as Record<string, unknown>).some(
        ([key, value]) => current[key] !== value
      )
    ) {
      return false;
    }
    this.records.set(id, { ...current, ...(structuredClone(patch) as object) });
    return true;
  }

  async delete(_table: string, id: string): Promise<void> {
    this.records.delete(id);
  }

  async query<T>(_table: string, query: StructuredQuery): Promise<T[]> {
    return [...this.records.values()]
      .filter((record) =>
        Object.entries(query.where ?? {}).every(([key, value]) => record[key] === value)
      )
      .slice(0, query.limit)
      .map((record) => structuredClone(record) as T);
  }

  transaction<T>(operation: (store: StructuredStoreProvider) => Promise<T>): Promise<T> {
    return operation(this);
  }
}

async function verifyVectorContract(adapter: ManagedVectorStoreAdapter): Promise<void> {
  await adapter.upsert([
    { id: 'vector:a', vector: [1, 0], metadata: { userId: 'alice' } },
    { id: 'vector:b', vector: [0, 1], metadata: { userId: 'bob' } },
  ]);
  await expect(
    adapter.search({ vector: [1, 0], topK: 5, filter: { userId: 'alice' } })
  ).resolves.toMatchObject([{ id: 'vector:a', score: 1 }]);
  await expect(adapter.health()).resolves.toMatchObject({ status: 'healthy' });
  await adapter.delete(['vector:a']);
  await expect(adapter.search({ vector: [1, 0], topK: 5 })).resolves.not.toEqual(
    expect.arrayContaining([expect.objectContaining({ id: 'vector:a' })])
  );
}

describe('managed vector adapters', () => {
  it('applies the common contract to the native in-memory adapter', async () => {
    await verifyVectorContract(new InMemoryLocalVectorStoreAdapter());
  });

  it('adapts the legacy VectorIndexProvider without redefining its storage semantics', async () => {
    const records = new Map<string, VectorRecord>();
    const provider: VectorIndexProvider = {
      upsert: async (items) => {
        for (const item of items) records.set(item.id, structuredClone(item));
      },
      search: async (request) =>
        Array.from(records.values())
          .filter((record) =>
            Object.entries(request.filter ?? {}).every(
              ([key, value]) => record.metadata?.[key] === value
            )
          )
          .map((record) => ({
            id: record.id,
            score: record.vector[0] === request.vector[0] ? 1 : 0,
            metadata: record.metadata,
          }))
          .sort((left, right) => right.score - left.score)
          .slice(0, request.topK),
      delete: async (ids) => {
        for (const id of ids) records.delete(id);
      },
    };

    await verifyVectorContract(new LegacyVectorIndexStoreAdapter('vector.legacy.test', provider));
  });

  it('persists scoped vectors and rejects stale fenced writes across adapter instances', async () => {
    const store = new TestStructuredStore();
    const first = new StructuredManagedVectorStoreAdapter(store, {
      id: 'memory.vector.local',
      now: () => '2026-08-01T00:00:00.000Z',
    });
    const reopened = new StructuredManagedVectorStoreAdapter(store, {
      id: 'memory.vector.local',
      now: () => '2026-08-01T00:00:01.000Z',
    });

    await first.upsert(
      [{ id: 'vector:durable', vector: [1, 0], metadata: { scopeHash: 'scope:a' } }],
      { fencingToken: 2, memoryRevision: 2 }
    );
    await reopened.upsert(
      [{ id: 'vector:durable', vector: [0, 1], metadata: { scopeHash: 'scope:b' } }],
      { fencingToken: 1, memoryRevision: 1 }
    );
    await expect(
      reopened.search({ vector: [1, 0], topK: 1, filter: { scopeHash: 'scope:a' } })
    ).resolves.toMatchObject([{ id: 'vector:durable', score: 1 }]);
    await expect(
      reopened.search({ vector: [1, 0], topK: 1, filter: { scopeHash: 'scope:b' } })
    ).resolves.toEqual([]);

    await reopened.delete(['vector:durable'], { fencingToken: 1, memoryRevision: 1 });
    await expect(reopened.search({ vector: [1, 0], topK: 1 })).resolves.toHaveLength(1);
    await reopened.delete(['vector:durable'], { fencingToken: 3, memoryRevision: 3 });
    await expect(reopened.search({ vector: [1, 0], topK: 1 })).resolves.toEqual([]);
    await reopened.upsert(
      [{ id: 'vector:durable', vector: [0, 1], metadata: { scopeHash: 'scope:b' } }],
      { fencingToken: 4, memoryRevision: 2 }
    );
    await expect(reopened.search({ vector: [0, 1], topK: 1 })).resolves.toEqual([]);

    await first.delete(['vector:delete-first'], { fencingToken: 6, memoryRevision: 3 });
    await reopened.upsert(
      [{ id: 'vector:delete-first', vector: [1, 0], metadata: { scopeHash: 'scope:a' } }],
      { fencingToken: 5, memoryRevision: 2 }
    );
    await expect(reopened.search({ vector: [1, 0], topK: 10 })).resolves.not.toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'vector:delete-first' })])
    );
  });
});
