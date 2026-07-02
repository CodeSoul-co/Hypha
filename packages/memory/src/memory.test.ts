import { describe, expect, it } from 'vitest';
import { InMemoryStructuredStore, InMemoryVectorIndexProvider } from '@hypha/adapters-local';
import {
  HybridMemoryProvider,
  MemoryManager,
  memorySpecDefinition,
  memorySpecJsonSchemas,
  validateMemorySpec,
  type EmbeddingProvider,
  type MemoryProvider,
  type MemoryRecord,
} from './index';

describe('@hypha/memory manager contract', () => {
  it('requires provenance-bearing writes through MemoryProvider', async () => {
    const records: MemoryRecord[] = [];
    const provider: MemoryProvider = {
      read: async () => records,
      search: async () => records.map((record) => ({ record, provenance: record.provenance })),
      write: async (_scope, record) => {
        records.push(record);
        return { recordId: record.id };
      },
      update: async () => {},
      invalidate: async () => {},
      summarize: async (scope) => ({ scope, recordCount: records.length, types: { working: records.length } }),
      audit: async (scope) => ({ scope, recordsChecked: records.length, missingProvenance: [] }),
    };
    const manager = new MemoryManager(provider);

    await expect(
      manager.write(
        { userId: 'owner', runId: 'run_1' },
        {
          id: 'memory_1',
          type: 'working',
          value: 'note',
          provenance: { eventId: 'event_1' },
          createdAt: '2026-07-02T00:00:00.000Z',
        },
        { requireProvenance: true }
      )
    ).resolves.toEqual({ recordId: 'memory_1' });
  });

  it('writes structured source of truth and indexes semantic records', async () => {
    const embeddings: EmbeddingProvider = {
      embed: async () => [[1, 0]],
    };
    const provider = new HybridMemoryProvider({
      structured: new InMemoryStructuredStore(),
      vector: new InMemoryVectorIndexProvider(),
      embeddings,
    });

    await expect(
      provider.write(
        { userId: 'owner', runId: 'run_1' },
        {
          id: 'semantic_1',
          type: 'semantic',
          value: 'hypha event-first runtime',
          provenance: { eventId: 'event_1' },
          createdAt: '2026-07-02T00:00:00.000Z',
        },
        { requireProvenance: true }
      )
    ).resolves.toEqual({ recordId: 'semantic_1', vectorIndexed: true });

    await expect(
      provider.search({ userId: 'owner', runId: 'run_1' }, { vector: [1, 0], topK: 1 })
    ).resolves.toMatchObject([
      { record: { id: 'semantic_1' }, score: 1, provenance: { eventId: 'event_1' } },
    ]);
  });

  it('exports Stage1 MemorySpec schema and minimal example', () => {
    expect(validateMemorySpec(memorySpecDefinition.example).id).toBe('memory.default');
    expect(memorySpecJsonSchemas.MemorySpec.required).toContain('providers');
  });
});
