import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, expect, it } from 'vitest';
import type { ModelProvider, ModelRequest, ModelResponse } from '@hypha/models';
import { ServingCacheManager } from './cache-manager';
import { buildPromptPrefixMetadata, createLLMCacheKey } from './key';
import { CachedLLMProvider } from './middleware/llm-cache-middleware';
import { MemoryCacheStore } from './stores/memory-store';
import { SQLiteCacheStore } from './stores/sqlite-store';
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

    expect(createLLMCacheKey({ ...request, promptBlocks: metadata.blocks })).toBe(
      keyWithoutBlocks
    );
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
      metadata: { provider: 'mock', sessionId: 'session_1' },
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
    expect(events.map((event) => event.type)).toEqual([
      'llm.cache.lookup',
      'llm.cache.miss',
      'llm.cache.write',
      'llm.cache.lookup',
      'llm.cache.hit',
    ]);
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

  it('bypasses streaming-marked generate requests even if cacheStreaming is enabled', async () => {
    const inner = new CountingProvider();
    const provider = new CachedLLMProvider(
      inner,
      new ServingCacheManager({
        store: new MemoryCacheStore(),
        policy: { enabled: true, mode: 'readwrite', cacheStreaming: true },
      }),
      {
        policy: { enabled: true, mode: 'readwrite', cacheStreaming: true },
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
});
