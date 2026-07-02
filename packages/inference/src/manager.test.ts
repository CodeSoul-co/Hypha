import { describe, expect, it } from 'vitest';
import { InferenceManager, InMemoryKvCacheProvider, InMemoryPrefixCacheProvider } from './manager';
import type { InferenceProvider } from './types';

describe('@hypha/inference', () => {
  it('routes inference requests through registered providers', async () => {
    const manager = new InferenceManager();
    const provider: InferenceProvider = {
      id: 'mock',
      infer: async (request) => ({
        id: 'response_1',
        output: { modelAlias: request.modelAlias },
      }),
    };

    manager.register(provider);

    await expect(
      manager.infer('mock', {
        runId: 'run_1',
        stepId: 'step_1',
        modelAlias: 'default',
        input: 'hello',
      })
    ).resolves.toMatchObject({
      id: 'response_1',
      output: { modelAlias: 'default' },
    });
  });

  it('surfaces prefix and KV cache hits through manager metadata', async () => {
    const prefixCache = new InMemoryPrefixCacheProvider();
    const kvCache = new InMemoryKvCacheProvider();
    const prefix = { id: 'system', version: '1', contentHash: 'hash' };
    const kv = { id: 'kv_1', provider: 'mock', modelAlias: 'default', scope: 'run' as const };
    await prefixCache.put(prefix, 'cached system prompt');
    await kvCache.put(kv, { blocks: 1 });

    const manager = new InferenceManager({ prefixCache, kvCache });
    manager.register({
      id: 'mock',
      infer: async (request) => ({
        id: 'response_2',
        output: request.metadata,
      }),
    });

    await expect(
      manager.infer('mock', {
        runId: 'run_1',
        stepId: 'step_1',
        modelAlias: 'default',
        input: 'hello',
        prefix,
        kvCache: kv,
      })
    ).resolves.toMatchObject({
      cache: { prefixHit: true, kvCacheHit: true },
      output: { prefixCacheHit: true, kvCacheHit: true },
    });
  });
});
