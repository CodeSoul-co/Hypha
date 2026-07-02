import { describe, expect, it } from 'vitest';
import { MemoryManager, type MemoryProvider, type MemoryRecord } from './index';

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
});
