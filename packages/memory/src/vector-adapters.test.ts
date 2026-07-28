import { describe, expect, it } from 'vitest';
import {
  InMemoryLocalVectorStoreAdapter,
  LegacyVectorIndexStoreAdapter,
  type ManagedVectorStoreAdapter,
  type VectorIndexProvider,
  type VectorRecord,
} from './index';

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
});
