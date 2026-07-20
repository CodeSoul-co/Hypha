import { describe, expect, it } from 'vitest';
import {
  ExecutionResultCache,
  canonicalizeExecutionFingerprintInput,
  executionCacheEntryProjectionExample,
  executionCacheValidityInputExample,
  executionCommandFingerprintInputExample,
} from '@hypha/core';
import { NodeExecutionFingerprintHasher } from './in-memory-execution-cache-store';
import { RedisExecutionCacheStore } from './redis-execution-cache-store';

describe('RedisExecutionCacheStore', () => {
  it('shares bounded, key-bound records through a Redis-compatible client', async () => {
    const values = new Map<string, string>();
    const ttlByKey = new Map<string, number>();
    const client = {
      async get(key: string) {
        return values.get(key) ?? null;
      },
      async set(key: string, value: string, _mode: 'PX', ttlMs: number) {
        values.set(key, value);
        ttlByKey.set(key, ttlMs);
        return 'OK';
      },
      async del(...keys: string[]) {
        let deleted = 0;
        for (const key of keys) deleted += values.delete(key) ? 1 : 0;
        return deleted;
      },
    };
    const now = 1_000;
    const store = new RedisExecutionCacheStore({
      client,
      namespace: 'test:execution-cache',
      now: () => now,
    });
    const hasher = new NodeExecutionFingerprintHasher();
    const cache = new ExecutionResultCache({ store, hasher, now: () => now });
    const commandHash = await hasher.hashUtf8(
      canonicalizeExecutionFingerprintInput(executionCommandFingerprintInputExample)
    );
    const validityHash = await hasher.hashUtf8(
      canonicalizeExecutionFingerprintInput(executionCacheValidityInputExample)
    );
    const input = {
      scope: { userId: 'user_01', workspaceId: 'workspace_01' },
      command: executionCommandFingerprintInputExample,
      validity: executionCacheValidityInputExample,
      sideEffectLevel: 'read' as const,
      environmentFingerprintStatus: 'resolved' as const,
    };
    const projection = {
      ...executionCacheEntryProjectionExample,
      commandHash,
      validityHash,
      validity: executionCacheValidityInputExample,
      artifacts: [],
      resultMetadata: {
        ...executionCacheEntryProjectionExample.resultMetadata,
        status: 'completed' as const,
      },
    };

    await expect(cache.write({ ...input, projection })).resolves.toBe(true);
    await expect(cache.lookup(input)).resolves.toMatchObject({ hit: true });
    const physicalKey = [...values.keys()][0]!;
    expect(ttlByKey.get(physicalKey)).toBeGreaterThan(0);

    const corrupt = JSON.parse(values.get(physicalKey)!) as Record<string, unknown>;
    corrupt.key = 'execution-cache:v1:sha256:different';
    values.set(physicalKey, JSON.stringify(corrupt));
    await expect(cache.lookup(input)).resolves.toMatchObject({ hit: false });
    expect(values.has(physicalKey)).toBe(false);
  });
});
