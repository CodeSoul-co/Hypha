import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, expect, it } from 'vitest';
import type { ModelProvider, ModelRequest, ModelResponse } from '@hypha/models';
import { ServingCacheManager } from './cache-manager';
import { buildPromptPrefixMetadata, createLLMCacheKey } from './key';
import { CachedLLMProvider } from './middleware/llm-cache-middleware';
import { MemoryCacheStore } from './stores/memory-store';
import { RedisCacheStore, type RedisCacheClient } from './stores/redis-store';
import { SQLiteCacheStore } from './stores/sqlite-store';
import { validateCacheEntry, validateCachedModelResponseProjection } from './schemas';
import type { ServingCacheEvent } from './types';

class CountingProvider implements ModelProvider<ModelRequest, ModelResponse> {
  readonly id = 'counting';
  calls = 0;

  capabilities() {
    return { chat: true, streaming: true };
  }

  async generate(request: ModelRequest): Promise<ModelResponse> {
    this.calls += 1;
    return {
      id: `${request.runId}:${request.stepId}:response:${this.calls}`,
      providerId: 'counting',
      model: request.modelAlias,
      content: `content ${this.calls}`,
      usage: { totalTokens: this.calls },
    };
  }

  async *stream(): AsyncIterable<{ type: 'delta'; content: string }> {
    yield { type: 'delta', content: 'stream' };
  }
}

class PrefixUsageProvider extends CountingProvider {
  async generate(request: ModelRequest): Promise<ModelResponse> {
    this.calls += 1;
    return {
      id: `${request.runId}:${request.stepId}:usage-response:${this.calls}`,
      providerId: 'prefix-usage',
      model: request.modelAlias,
      content: `usage content ${this.calls}`,
      usage: {
        inputTokens: 10,
        outputTokens: 1,
        totalTokens: 11,
        cacheHitTokens: 6,
        cacheMissTokens: 4,
      },
    };
  }
}

describe('@hypha/serving-cache', () => {
  it('builds deterministic exact request keys', () => {
    const left = createLLMCacheKey({
      provider: 'deepseek',
      model: 'deepseek-chat',
      system: 'system',
      messages: [{ role: 'user', content: 'hello', unused: undefined }],
      tools: [
        { id: 'b', inputSchema: { z: true, a: true } },
        { id: 'a', inputSchema: { a: true, z: true } },
      ],
      params: { maxTokens: 100, temperature: 0 },
      cacheScope: { sessionId: 's1', userId: 'u1' },
    });
    const right = createLLMCacheKey({
      model: 'deepseek-chat',
      provider: 'deepseek',
      cacheScope: { userId: 'u1', sessionId: 's1' },
      params: { temperature: 0, maxTokens: 100, ignored: undefined },
      tools: [
        { id: 'a', inputSchema: { z: true, a: true } },
        { id: 'b', inputSchema: { a: true, z: true } },
      ],
      messages: [{ content: 'hello', role: 'user' }],
      system: 'system',
    });
    expect(left).toBe(right);
  });

  it('exports prompt template blocks as prefix metadata without changing exact keys', () => {
    const request = {
      provider: 'deepseek',
      model: 'deepseek-chat',
      system: 'rendered system prompt',
      messages: [{ role: 'user', content: 'hello' }],
      params: { temperature: 0 },
    };
    const keyWithoutBlocks = createLLMCacheKey(request);
    const metadata = buildPromptPrefixMetadata({
      ...request,
      promptBlocks: [
        {
          id: 'template.default-agent',
          type: 'prompt-template',
          content: 'rendered system prompt',
          hash: 'template-hash',
          order: 0,
          templateId: 'default-agent',
          templateVersion: '1.0.0',
        },
      ],
    });

    expect(createLLMCacheKey({ ...request, promptBlocks: metadata.blocks })).toBe(keyWithoutBlocks);
    expect(metadata.blocks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'template.default-agent',
          type: 'prompt-template',
          content: 'rendered system prompt',
          hash: 'template-hash',
          templateId: 'default-agent',
          templateVersion: '1.0.0',
        }),
      ])
    );
    expect(metadata.blocks.map((block) => block.type)).not.toContain('system');
  });

  it('writes on miss and reuses exact responses on hit', async () => {
    const events: ServingCacheEvent[] = [];
    const inner = new CountingProvider();
    const provider = new CachedLLMProvider(
      inner,
      new ServingCacheManager({
        store: new MemoryCacheStore(),
        policy: { enabled: true, mode: 'readwrite', ttlMs: 1000 },
      }),
      {
        policy: { enabled: true, mode: 'readwrite', ttlMs: 1000 },
        trace: (event) => {
          events.push(event);
        },
      }
    );

    const request: ModelRequest = {
      runId: 'run_1',
      stepId: 'step_1',
      modelAlias: 'default-fast',
      instructions: 'system',
      input: [{ role: 'user', content: 'hello' }],
      temperature: 0,
      metadata: { provider: 'mock', userId: 'user_1', sessionId: 'session_1' },
    };

    const first = await provider.generate(request);
    const second = await provider.generate(request);

    expect(inner.calls).toBe(1);
    expect(second.content).toBe(first.content);
    expect(first.metadata?.servingCache).toMatchObject({ hit: false, source: 'provider' });
    expect(second.metadata?.servingCache).toMatchObject({
      hit: true,
      source: 'hypha-serving-cache',
    });
    expect(second.id).not.toBe(first.id);
    expect(events.map((event) => event.type)).toEqual([
      'llm.cache.lookup',
      'llm.cache.miss',
      'llm.cache.write',
      'llm.cache.lookup',
      'llm.cache.hit',
    ]);
  });

  it('tracks provider-side prefix shape and cache token usage separately from exact cache', async () => {
    const events: ServingCacheEvent[] = [];
    const inner = new PrefixUsageProvider();
    const provider = new CachedLLMProvider(
      inner,
      new ServingCacheManager({
        store: new MemoryCacheStore(),
        policy: { enabled: true, mode: 'readwrite', ttlMs: 1000 },
      }),
      {
        policy: { enabled: true, mode: 'readwrite', ttlMs: 1000 },
        trace: (event) => {
          events.push(event);
        },
      }
    );

    const baseRequest: ModelRequest = {
      runId: 'run_shape',
      stepId: 'step_1',
      modelAlias: 'default-fast',
      instructions: 'stable system',
      input: [{ role: 'user', content: 'hello' }],
      temperature: 0,
      metadata: { provider: 'mock', userId: 'user_shape', sessionId: 'session_shape' },
    };
    const first = await provider.generate(baseRequest);
    const second = await provider.generate({
      ...baseRequest,
      stepId: 'step_2',
      input: [{ role: 'user', content: 'different dynamic suffix' }],
    });

    expect(inner.calls).toBe(2);
    expect(first.metadata?.servingCache).toMatchObject({
      providerPrefixCache: {
        source: 'provider-usage',
        hitTokens: 6,
        missTokens: 4,
        hitRate: 0.6,
      },
      prefixCache: {
        stablePrefixChanged: true,
        changedReasons: ['first_request'],
      },
    });
    expect(second.metadata?.servingCache).toMatchObject({
      providerPrefixCache: {
        hitTokens: 6,
        missTokens: 4,
      },
      prefixCache: {
        stablePrefixChanged: false,
        dynamicSuffixChanged: true,
        changedReasons: ['dynamic_suffix_changed'],
      },
    });
    const writes = events.filter((event) => event.type === 'llm.cache.write');
    expect(writes[0]).toMatchObject({
      providerPrefixCache: { hitTokens: 6, missTokens: 4 },
      prefixCache: { changedReasons: ['first_request'] },
    });
    expect(writes[1]).toMatchObject({
      providerPrefixCache: { hitTokens: 6, missTokens: 4 },
      prefixCache: {
        stablePrefixChanged: false,
        dynamicSuffixChanged: true,
      },
    });
  });

  it('expires entries by ttl before reusing them', async () => {
    let now = 1000;
    const inner = new CountingProvider();
    const manager = new ServingCacheManager({
      store: new MemoryCacheStore(),
      policy: { enabled: true, mode: 'readwrite', ttlMs: 10 },
      now: () => now,
    });
    const provider = new CachedLLMProvider(inner, manager, {
      policy: { enabled: true, mode: 'readwrite', ttlMs: 10 },
    });
    const request: ModelRequest = {
      runId: 'run_1',
      stepId: 'step_1',
      modelAlias: 'default-fast',
      input: 'hello',
      metadata: { userId: 'user_1' },
    };

    await provider.generate(request);
    now = 1011;
    const second = await provider.generate(request);

    expect(inner.calls).toBe(2);
    expect(second.content).toBe('content 2');
  });

  it('bypasses streaming requests in the first version', async () => {
    const events: ServingCacheEvent[] = [];
    const provider = new CachedLLMProvider(
      new CountingProvider(),
      new ServingCacheManager({
        store: new MemoryCacheStore(),
        policy: { enabled: true, mode: 'readwrite' },
      }),
      {
        policy: { enabled: true, mode: 'readwrite' },
        trace: (event) => {
          events.push(event);
        },
      }
    );
    const chunks = [];
    for await (const chunk of provider.stream!({
      runId: 'run_1',
      stepId: 'stream',
      modelAlias: 'default-fast',
      input: 'hello',
    })) {
      chunks.push(chunk);
    }

    expect(chunks).toEqual([{ type: 'delta', content: 'stream' }]);
    expect(events).toMatchObject([{ type: 'llm.cache.bypass', reason: 'streaming' }]);
  });

  it('always bypasses streaming-marked generate requests', async () => {
    const inner = new CountingProvider();
    const provider = new CachedLLMProvider(
      inner,
      new ServingCacheManager({
        store: new MemoryCacheStore(),
        policy: { enabled: true, mode: 'readwrite' },
      }),
      {
        policy: { enabled: true, mode: 'readwrite' },
      }
    );
    const request: ModelRequest = {
      runId: 'run_1',
      stepId: 'stream-marked',
      modelAlias: 'default-fast',
      input: 'hello',
      metadata: { streaming: true },
    };

    await provider.generate(request);
    await provider.generate(request);

    expect(inner.calls).toBe(2);
  });

  it('persists entries in sqlite store', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-serving-cache-'));
    const filename = path.join(dir, 'cache.sqlite');
    const store = new SQLiteCacheStore({ filename });
    const key = 'llm:exact:sha256:test';
    await store.set(key, {
      key,
      value: { content: 'ok' },
      createdAt: 1000,
      expiresAt: 2000,
      metadata: { provider: 'mock', model: 'default-fast', cacheType: 'exact' },
    });
    const entry = await store.get<{ content: string }>(key);

    expect(entry?.value).toEqual({ content: 'ok' });
    expect(entry?.metadata).toMatchObject({ provider: 'mock', model: 'default-fast' });
  });

  it('does not cache an unscoped request under the default user boundary', async () => {
    const inner = new CountingProvider();
    const store = new MemoryCacheStore();
    const provider = new CachedLLMProvider(
      inner,
      new ServingCacheManager({ store, policy: { enabled: true, mode: 'readwrite' } })
    );
    const request: ModelRequest = {
      runId: 'run_unscoped',
      stepId: 'step_1',
      modelAlias: 'default-fast',
      input: 'private prompt',
    };

    await provider.generate(request);
    await provider.generate(request);

    expect(inner.calls).toBe(2);
    expect(await store.stats()).toMatchObject({ entries: 0 });
  });

  it('keeps cache and trace failures off the primary model path in bypass mode', async () => {
    const inner = new CountingProvider();
    const provider = new CachedLLMProvider(
      inner,
      new ServingCacheManager({
        store: {
          async get() {
            throw new Error('cache unavailable');
          },
          async set() {
            throw new Error('cache unavailable');
          },
          async delete() {
            throw new Error('cache unavailable');
          },
        },
        policy: { enabled: true, mode: 'readwrite', failureMode: 'bypass' },
      }),
      {
        trace: () => {
          throw new Error('trace unavailable');
        },
      }
    );

    const response = await provider.generate({
      runId: 'run_failure',
      stepId: 'step_1',
      modelAlias: 'default-fast',
      input: 'hello',
      metadata: { userId: 'user_1' },
    });

    expect(response.content).toBe('content 1');
    expect(inner.calls).toBe(1);
  });

  it('coalesces concurrent misses and never persists raw provider payloads', async () => {
    const inner = new CountingProvider();
    const originalGenerate = inner.generate.bind(inner);
    inner.generate = async (request) => {
      await Promise.resolve();
      const response = await originalGenerate(request);
      return { ...response, raw: { secret: 'provider-internal' }, metadata: { debug: true } };
    };
    const store = new MemoryCacheStore();
    const manager = new ServingCacheManager({
      store,
      policy: { enabled: true, mode: 'readwrite', singleflight: true },
    });
    const provider = new CachedLLMProvider(inner, manager);
    const request: ModelRequest = {
      runId: 'run_singleflight',
      stepId: 'step_1',
      modelAlias: 'default-fast',
      input: 'hello',
      metadata: { userId: 'user_1' },
    };

    const [first, second] = await Promise.all([
      provider.generate(request),
      provider.generate({ ...request, stepId: 'step_2' }),
    ]);

    expect(inner.calls).toBe(1);
    expect(first.content).toBe(second.content);
    expect(second.raw).toBeUndefined();
    const key = manager.keyFor({
      provider: 'counting',
      model: 'default-fast',
      messages: ['hello'],
      cacheScope: { userId: 'user_1' },
      params: {},
    });
    expect((await store.get(key))?.value).not.toMatchObject({ raw: expect.anything() });
  });

  it('bounds the in-memory store and reports evictions', async () => {
    const store = new MemoryCacheStore({ maxEntries: 2 });
    for (const key of ['one', 'two', 'three']) {
      await store.set(key, { key, value: key, createdAt: 1 });
    }

    expect(await store.get('one')).toBeNull();
    expect(await store.stats()).toMatchObject({ entries: 2, evictions: 1 });
  });

  it('rejects malformed contracts and oversized total entries before persistence', async () => {
    expect(() => validateCachedModelResponseProjection({ schemaVersion: '1.0' })).toThrow();
    expect(() => validateCacheEntry({ key: 'missing-value', createdAt: 1 })).toThrow();
    const store = new MemoryCacheStore();
    const manager = new ServingCacheManager({
      store,
      policy: { enabled: true, mode: 'write', maxEntryBytes: 120 },
    });

    await expect(
      manager.set(
        'large',
        { content: 'small' },
        {
          provider: 'mock',
          model: 'model',
          cacheType: 'exact',
          tags: ['x'.repeat(200)],
        }
      )
    ).rejects.toThrow(/maximum/);
    expect(await store.get('large')).toBeNull();
  });

  it('round-trips and clears versioned entries through a Redis-compatible store', async () => {
    const values = new Map<string, string>();
    const client: RedisCacheClient = {
      async get(key) {
        return values.get(key) ?? null;
      },
      async set(key, value) {
        values.set(key, value);
        return 'OK';
      },
      async del(...keys) {
        let deleted = 0;
        for (const key of keys) deleted += Number(values.delete(key));
        return deleted;
      },
      async scan() {
        return ['0', [...values.keys()]];
      },
      async ping() {
        return 'PONG';
      },
    };
    const store = new RedisCacheStore({ client, prefix: 'test:' });
    await store.set('key', {
      schemaVersion: '1.0',
      keyVersion: '1',
      key: 'key',
      value: { content: 'ok' },
      createdAt: Date.now(),
    });

    expect((await store.get<{ content: string }>('key'))?.value.content).toBe('ok');
    expect(await store.health()).toMatchObject({ status: 'healthy' });
    await store.clear();
    expect(values.size).toBe(0);
  });
});
