import { describe, expect, it } from 'vitest';
import { InMemoryEventStore } from '@hypha/core';
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

  it('enforces memory write policy before provider side effects', async () => {
    let writes = 0;
    const provider: MemoryProvider = {
      read: async () => [],
      search: async () => [],
      write: async (_scope, record) => {
        writes += 1;
        return { recordId: record.id };
      },
      update: async () => {},
      invalidate: async () => {},
      summarize: async (scope) => ({ scope, recordCount: 0, types: {} }),
      audit: async (scope) => ({ scope, recordsChecked: 0, missingProvenance: [] }),
    };
    const manager = new MemoryManager(provider);
    const record: MemoryRecord = {
      id: 'semantic_denied',
      type: 'semantic',
      value: 'persist me',
      provenance: {},
      createdAt: '2026-07-02T00:00:00.000Z',
    };

    await expect(
      manager.write(
        { userId: 'owner', runId: 'run_1' },
        record,
        { requireProvenance: true, allowLongTerm: true }
      )
    ).rejects.toThrow(/requires provenance/);
    await expect(
      manager.write(
        { userId: 'owner', runId: 'run_1' },
        { ...record, provenance: { eventId: 'event_1' } },
        { decision: { allowed: false, reason: 'blocked' }, allowLongTerm: true }
      )
    ).rejects.toThrow(/blocked/);
    await expect(
      manager.write(
        { userId: 'owner', runId: 'run_1' },
        { ...record, provenance: { eventId: 'event_1' } },
        {}
      )
    ).rejects.toThrow(/allowLongTerm/);
    expect(writes).toBe(0);
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

  it('merges vector and text candidates for hybrid memory search', async () => {
    const vectors: Record<string, number[]> = {
      'vector-near primary': [1, 0],
      'vector-near secondary': [0.9, 0.1],
      'lexical-only compliance phrase': [0, 1],
    };
    const embeddings: EmbeddingProvider = {
      embed: async (input) => input.map((value) => vectors[value] ?? [0, 1]),
    };
    const provider = new HybridMemoryProvider({
      structured: new InMemoryStructuredStore(),
      vector: new InMemoryVectorIndexProvider(),
      embeddings,
    });
    const scope = { userId: 'owner', sessionId: 'session_hybrid' };

    for (const record of [
      { id: 'semantic_primary', value: 'vector-near primary' },
      { id: 'semantic_secondary', value: 'vector-near secondary' },
      { id: 'semantic_text', value: 'lexical-only compliance phrase' },
    ]) {
      await provider.write(
        scope,
        {
          ...record,
          type: 'semantic',
          provenance: { eventId: `event_${record.id}` },
          createdAt: '2026-07-04T00:00:00.000Z',
        },
        { requireProvenance: true, allowLongTerm: true }
      );
    }

    await expect(
      provider.search(scope, {
        vector: [1, 0],
        text: 'compliance phrase',
        type: 'semantic',
        topK: 2,
      })
    ).resolves.toEqual([
      expect.objectContaining({ record: expect.objectContaining({ id: 'semantic_primary' }) }),
      expect.objectContaining({ record: expect.objectContaining({ id: 'semantic_text' }) }),
    ]);
  });

  it('traces memory writes, searches, and reads through MemoryManager', async () => {
    const trace = new InMemoryEventStore();
    const embeddings: EmbeddingProvider = {
      embed: async () => [[1, 0]],
    };
    const provider = new HybridMemoryProvider({
      structured: new InMemoryStructuredStore(),
      vector: new InMemoryVectorIndexProvider(),
      embeddings,
    });
    const manager = new MemoryManager(provider, {
      trace,
      now: () => '2026-07-04T00:00:00.000Z',
    });
    const scope = { userId: 'owner', sessionId: 'session_1', runId: 'run_stage6_memory' };

    await manager.write(
      scope,
      {
        id: 'semantic_trace',
        type: 'semantic',
        value: 'hypha semantic memory can be retrieved',
        provenance: { eventId: 'event_trace' },
        createdAt: '2026-07-04T00:00:00.000Z',
      },
      { requireProvenance: true, allowLongTerm: true }
    );
    await manager.search(scope, { vector: [1, 0], topK: 1 });
    await manager.read(scope, { type: 'semantic', limit: 1 });

    const events = await trace.list({ runId: 'run_stage6_memory' });
    expect(events.map((event) => event.type)).toEqual([
      'memory.write.requested',
      'memory.write.validated',
      'memory.write.committed',
      'memory.read.requested',
      'memory.read.completed',
      'memory.read.requested',
      'memory.read.completed',
    ]);
    expect(events[4].payload).toMatchObject({
      operation: 'search',
      count: 1,
      recordIds: ['semantic_trace'],
    });
  });

  it('traces rejected memory writes before provider side effects', async () => {
    const trace = new InMemoryEventStore();
    let writes = 0;
    const provider: MemoryProvider = {
      read: async () => [],
      search: async () => [],
      write: async (_scope, record) => {
        writes += 1;
        return { recordId: record.id };
      },
      update: async () => {},
      invalidate: async () => {},
      summarize: async (scope) => ({ scope, recordCount: 0, types: {} }),
      audit: async (scope) => ({ scope, recordsChecked: 0, missingProvenance: [] }),
    };
    const manager = new MemoryManager(provider, {
      trace,
      now: () => '2026-07-04T00:00:00.000Z',
    });
    const scope = { userId: 'owner', runId: 'run_rejected_memory' };

    await expect(
      manager.write(
        scope,
        {
          id: 'semantic_rejected',
          type: 'semantic',
          value: 'blocked',
          provenance: {},
          createdAt: '2026-07-04T00:00:00.000Z',
        },
        { requireProvenance: true, allowLongTerm: true }
      )
    ).rejects.toThrow(/requires provenance/);

    expect(writes).toBe(0);
    await expect(trace.list({ runId: 'run_rejected_memory' })).resolves.toMatchObject([
      { type: 'memory.write.requested' },
      { type: 'memory.write.rejected' },
    ]);
  });

  it('exports Stage1 MemorySpec schema and minimal example', () => {
    expect(validateMemorySpec(memorySpecDefinition.example).id).toBe('memory.default');
    expect(memorySpecJsonSchemas.MemorySpec.required).toContain('providers');
    expect(memorySpecDefinition.example).toMatchObject({
      structuredStoreRef: 'storage.sqlite.structured',
      vectorIndexRef: 'storage.local-vector.semantic',
      writePolicyConfig: { requireProvenance: true },
      retrievalPolicy: { defaultTopK: 5 },
    });
  });
});
