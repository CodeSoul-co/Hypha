import { describe, expect, it } from 'vitest';
import {
  ExecutionResultCache,
  canonicalizeExecutionFingerprintInput,
  executionCacheEntryProjectionExample,
  executionCacheValidityInputExample,
  executionCommandFingerprintInputExample,
} from '@hypha/core';
import {
  InMemoryExecutionCacheStore,
  NodeExecutionFingerprintHasher,
} from './in-memory-execution-cache-store';

describe('InMemoryExecutionCacheStore', () => {
  it('provides a bounded, defensively copied local Execution Cache', async () => {
    const store = new InMemoryExecutionCacheStore({ maxEntries: 1 });
    const hasher = new NodeExecutionFingerprintHasher();
    const cache = new ExecutionResultCache({ store, hasher, now: () => 1000 });

    for (const userId of ['one', 'two']) {
      const commandHash = await hasher.hashUtf8(
        canonicalizeExecutionFingerprintInput(executionCommandFingerprintInputExample)
      );
      const validityHash = await hasher.hashUtf8(
        canonicalizeExecutionFingerprintInput(executionCacheValidityInputExample)
      );
      expect(
        await cache.write({
          scope: { userId, workspaceId: 'workspace' },
          command: executionCommandFingerprintInputExample,
          validity: executionCacheValidityInputExample,
          sideEffectLevel: 'read',
          environmentFingerprintStatus: 'resolved',
          projection: {
            ...executionCacheEntryProjectionExample,
            commandHash,
            validityHash,
            validity: executionCacheValidityInputExample,
            artifacts: [],
            resultMetadata: {
              ...executionCacheEntryProjectionExample.resultMetadata,
              status: 'completed',
            },
          },
        })
      ).toBe(true);
    }

    expect(store.stats()).toMatchObject({ entries: 1, evictions: 1 });
    await expect(
      cache.lookup({
        scope: { userId: 'one', workspaceId: 'workspace' },
        command: executionCommandFingerprintInputExample,
        validity: executionCacheValidityInputExample,
        sideEffectLevel: 'read',
        environmentFingerprintStatus: 'resolved',
      })
    ).resolves.toMatchObject({ hit: false, reason: 'not_found' });
  });
});
