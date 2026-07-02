import { describe, expect, it } from 'vitest';
import { InferenceCacheManager } from './cache';
import { InferenceManager, InMemoryKvCacheProvider, InMemoryPrefixCacheProvider } from './manager';
import { ReasoningOrchestrator } from './reasoning';
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
        output: {
          metadata: request.metadata,
          prefix: request.resolvedPrefixContent,
          kv: request.resolvedKvCacheValue,
        },
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
      output: {
        metadata: { prefixCacheHit: true, kvCacheHit: true },
        prefix: 'cached system prompt',
        kv: { blocks: 1 },
      },
    });
  });

  it('routes streaming inference through cache-aware providers', async () => {
    const prefixCache = new InMemoryPrefixCacheProvider();
    const prefix = { id: 'system', version: '1', contentHash: 'hash' };
    await prefixCache.put(prefix, 'cached streaming prompt');
    const manager = new InferenceManager({ prefixCache });
    manager.register({
      id: 'mock',
      infer: async () => ({ id: 'unused', output: null }),
      stream: async function* (request) {
        yield {
          id: 'chunk_1',
          output: {
            prefix: request.resolvedPrefixContent,
            metadata: request.metadata,
          },
        };
      },
    });

    const chunks = [];
    for await (const chunk of manager.stream('mock', {
      runId: 'run_1',
      stepId: 'step_stream',
      modelAlias: 'default',
      input: 'hello',
      prefix,
    })) {
      chunks.push(chunk);
    }

    expect(chunks).toHaveLength(1);
    expect(chunks[0]).toMatchObject({
      id: 'chunk_1',
      cache: { prefixHit: true },
      output: {
        prefix: 'cached streaming prompt',
        metadata: { prefixCacheHit: true, kvCacheHit: false },
      },
    });
  });

  it('manages prefix hashes and KV cache expiry', async () => {
    const prefixCache = new InMemoryPrefixCacheProvider();
    const kvCache = new InMemoryKvCacheProvider();
    const manager = new InferenceCacheManager({
      prefixCache,
      kvCache,
      now: () => new Date('2026-07-02T00:00:00.000Z'),
    });

    const prefix = await manager.putPrefix({
      id: 'system',
      version: '1',
      content: 'system prompt',
    });
    expect(prefix.contentHash).toHaveLength(64);
    await expect(manager.getPrefix(prefix)).resolves.toBe('system prompt');

    const kv = await manager.putKv(
      { id: 'kv', provider: 'mock', modelAlias: 'default', scope: 'run', ttlMs: 1 },
      { cached: true }
    );
    const expiredManager = new InferenceCacheManager({
      prefixCache,
      kvCache,
      now: () => new Date('2026-07-02T00:00:01.000Z'),
    });
    await expect(expiredManager.getKv(kv)).resolves.toBeNull();
  });

  it('runs CoT and ToT reasoning strategies through provider abstraction', async () => {
    const calls: unknown[] = [];
    const provider: InferenceProvider = {
      id: 'mock',
      infer: async (request) => {
        calls.push(request.metadata);
        return { id: `response_${calls.length}`, output: request.metadata };
      },
    };
    const orchestrator = new ReasoningOrchestrator(provider);

    await expect(
      orchestrator.infer({
        runId: 'run_1',
        stepId: 'step_1',
        modelAlias: 'default',
        input: 'think',
        reasoning: { method: 'cot' },
      })
    ).resolves.toMatchObject({ output: { reasoningMethod: 'cot' } });

    await expect(
      orchestrator.infer({
        runId: 'run_1',
        stepId: 'step_2',
        modelAlias: 'default',
        input: 'branch',
        reasoning: { method: 'tot', branches: 2 },
      })
    ).resolves.toMatchObject({ id: 'response_2' });
    expect(calls).toHaveLength(3);
  });
});
