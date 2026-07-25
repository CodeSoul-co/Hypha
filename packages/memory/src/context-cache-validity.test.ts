import { describe, expect, it } from 'vitest';
import {
  InMemoryContextEnvelopeCacheStore,
  VersionValidContextCache,
  type ContextCacheVersionSnapshot,
  type ContextEnvelope,
} from './index';

const envelope: ContextEnvelope = {
  id: 'context:1',
  runId: 'run-1',
  contextHash: 'hash-1',
  profileRevision: 'context-r1',
  budgetPlan: {
    totalAvailableTokens: 100,
    fixedTokens: 0,
    dynamicTokens: 100,
    sourceBudgets: [],
    tokenizerRef: { id: 'tokenizer', version: '1' },
    safetyMarginTokens: 0,
  },
  systemSegments: [],
  instructionSegments: [],
  dataSegments: [],
  includedSourceRefs: [],
  omittedSourceRefs: [],
  truncationRecords: [],
  provenanceIndex: {
    m1: {
      sourceType: 'long_term_memory',
      sourceId: 'm1',
      memoryVersionId: 'memory-1:v2',
      citationLabel: 'm1',
    },
  },
  conflicts: [],
  totalTokens: 0,
  createdAt: '2026-07-21T00:00:00.000Z',
};
const snapshot: ContextCacheVersionSnapshot = {
  contextProfileRevision: 'context-r1',
  memoryProfileRevision: 'memory-r1',
  scopeHash: 'scope-1',
  providerRevision: 'provider-r1',
  policyRevision: 'policy-r1',
  selectedMemoryVersionIds: ['memory-1:v2'],
  sourceHashes: { memory: 'source-hash' },
};

describe('VersionValidContextCache', () => {
  it('reuses only an exact version-valid context envelope', async () => {
    const cache = new VersionValidContextCache({
      store: new InMemoryContextEnvelopeCacheStore(),
      now: () => '2026-07-21T00:00:00.000Z',
    });
    await cache.set('context-key', envelope, snapshot);
    await expect(cache.get('context-key', snapshot)).resolves.toEqual(envelope);
    await expect(
      cache.get('context-key', {
        ...snapshot,
        selectedMemoryVersionIds: ['memory-1:v3'],
      })
    ).resolves.toBeNull();
  });

  it('rejects envelope and snapshot profile mismatches', async () => {
    const cache = new VersionValidContextCache({ store: new InMemoryContextEnvelopeCacheStore() });
    await expect(
      cache.set('context-key', envelope, {
        ...snapshot,
        contextProfileRevision: 'context-r2',
      })
    ).rejects.toThrow(/profile revision/);
  });
});
