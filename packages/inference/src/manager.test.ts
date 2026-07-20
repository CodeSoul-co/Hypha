import { describe, expect, it } from 'vitest';
import type { RecoveryFailure } from '@hypha/core';
import {
  createDefaultInferenceBackendRegistry,
  LlamaCppInferenceBackend,
  OpenAIAPIInferenceBackend,
  SGLangInferenceBackend,
  VLLMInferenceBackend,
} from './backends';
import { InferenceCacheManager } from './cache';
import { InferenceManager, InMemoryKvCacheProvider, InMemoryPrefixCacheProvider } from './manager';
import { HyphaInferencePipeline } from './pipeline';
import { InMemoryPlasmodHotLayer } from './plasmod';
import { DefaultPrefixSegmenter } from './prefix';
import { DefaultPromptCompiler } from './prompt';
import { AgentPromptRegistry } from './agent-prompts';
import { ReasoningOrchestrator } from './reasoning';
import { ReasoningStrategyRegistry } from './reasoning-registry';
import { REACT_OFFICIAL_REFERENCES } from './reasoning-sources';
import type {
  InferenceBackendRequest,
  InferenceProvider,
  KvCacheProvider,
  PrefixSegmentationResult,
  PrefixCacheProvider,
} from './types';

class RecordingTransport {
  readonly calls: Array<{
    url: string;
    body: unknown;
    headers?: Record<string, string>;
    timeoutMs?: number;
  }> = [];

  constructor(private readonly response: unknown) {}

  async postJson<TResponse = unknown>(
    url: string,
    body: unknown,
    headers?: Record<string, string>,
    timeoutMs?: number
  ): Promise<TResponse> {
    this.calls.push({ url, body, headers, timeoutMs });
    return this.response as TResponse;
  }
}

function backendRequest(): InferenceBackendRequest {
  return {
    runId: 'run_backend',
    stepId: 'step_backend',
    sessionId: 'session_backend',
    agentId: 'agent_backend',
    modelAlias: 'default-chat',
    compiledPrompt: {
      id: 'prompt_backend',
      text: '<system>\nstable\n</system>\n\n<user>\nhello\n</user>',
      messages: [
        { role: 'system', content: 'stable' },
        { role: 'user', content: 'hello' },
      ],
    },
    segmentation: {
      compiled: {
        id: 'prompt_backend',
        text: '<system>\nstable\n</system>\n\n<user>\nhello\n</user>',
        messages: [
          { role: 'system', content: 'stable' },
          { role: 'user', content: 'hello' },
        ],
      },
      segments: [],
      stablePrefix: '<system>\nstable\n</system>',
      dynamicPrompt: '<user>\nhello\n</user>',
      metadata: { stablePrefixHash: 'stable_hash' },
    },
    prefixRefs: [
      {
        id: 'prefix_ref',
        version: 'sglang:default-chat',
        contentHash: 'hash',
      },
    ],
    options: { temperature: 0.2, maxTokens: 32 },
    metadata: { providerModel: 'provider-model' },
  };
}

describe('@hypha/inference', () => {
  it('registers built-in reasoning strategies with pinned official sources', () => {
    const orchestrator = new ReasoningOrchestrator({
      id: 'source-test',
      infer: async () => ({ id: 'unused', output: null }),
    });
    const descriptors = orchestrator.registry.list();

    expect(descriptors.map((descriptor) => descriptor.id)).toEqual([
      'reasoning.cot',
      'reasoning.direct',
      'reasoning.got',
      'reasoning.self-consistency',
      'reasoning.tot',
    ]);
    expect(descriptors.find((descriptor) => descriptor.id === 'reasoning.tot')?.references).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          repository: 'princeton-nlp/tree-of-thought-llm',
          revision: expect.stringMatching(/^[0-9a-f]{40}$/),
          official: true,
        }),
      ])
    );
    expect(descriptors.find((descriptor) => descriptor.id === 'reasoning.got')?.references).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          repository: 'spcl/graph-of-thoughts',
          official: true,
        }),
      ])
    );
    expect(REACT_OFFICIAL_REFERENCES[0]).toMatchObject({
      repository: 'ysymyth/ReAct',
      revision: expect.stringMatching(/^[0-9a-f]{40}$/),
    });
  });

  it('allows independently registered reasoning strategies to override an alias', async () => {
    const registry = new ReasoningStrategyRegistry();
    registry.register({
      descriptor: {
        id: 'reasoning.custom-direct',
        version: '1.0.0',
        method: 'direct',
        name: 'Custom direct',
        description: 'Extension fixture',
        aliases: ['custom'],
        references: [],
        capabilities: {
          branching: false,
          graph: false,
          aggregation: false,
          streaming: false,
          toolLoop: false,
        },
      },
      execute: async ({ request }) => ({ id: 'custom', output: request.input }),
    });
    const orchestrator = new ReasoningOrchestrator(
      { id: 'unused', infer: async () => ({ id: 'unused', output: null }) },
      'custom-orchestrator',
      registry
    );

    await expect(
      orchestrator.infer({
        runId: 'run-custom',
        stepId: 'step-custom',
        modelAlias: 'model',
        input: 'custom-output',
        reasoning: { method: 'direct', strategyRef: 'custom' },
      })
    ).resolves.toMatchObject({ id: 'custom', output: 'custom-output' });
  });

  it('registers, versions, resolves, and renders agent prompt assets', () => {
    const registry = new AgentPromptRegistry();
    registry.register({
      id: 'agent.base',
      version: '1.0.0',
      name: 'Base agent prompt',
      role: 'system',
      template: 'You are {{agent_name}}.',
      variables: [{ name: 'agent_name', type: 'string', required: true }],
    });
    registry.register({
      id: 'agent.base',
      version: '2.0.0',
      name: 'Base agent prompt v2',
      role: 'system',
      template: 'Act as {{agent_name}} for {{user_id}}.',
      variables: [
        { name: 'agent_name', type: 'string', required: true },
        { name: 'user_id', type: 'string', required: true },
      ],
    });

    const resolved = registry.resolve([{ id: 'agent.base', required: true }], {
      agent_name: 'Hypha',
      user_id: 'user-1',
    });
    expect(resolved.instructions).toBe('Act as Hypha for user-1.');
    expect(resolved.blocks[0]).toMatchObject({
      templateId: 'agent.base',
      templateVersion: '2.0.0',
      cacheable: true,
      stable: true,
    });
    expect(resolved.blocks[0]?.hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it('rejects undeclared agent prompt variables instead of silently erasing them', () => {
    const registry = new AgentPromptRegistry();
    registry.register({
      id: 'agent.invalid',
      version: '1.0.0',
      name: 'Invalid prompt',
      role: 'system',
      template: 'Known {{known}} unknown {{unknown}}.',
      variables: [{ name: 'known', type: 'string', required: true }],
    });

    expect(() =>
      registry.resolve([{ id: 'agent.invalid', required: true }], { known: 'value' })
    ).toThrow('Undeclared agent prompt variables: agent.invalid.unknown');
  });
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

  it('bounds in-memory prefix and KV providers with LRU eviction', async () => {
    const prefixCache = new InMemoryPrefixCacheProvider({
      maxEntries: 2,
      maxEntryBytes: 64,
      maxTotalBytes: 64,
    });
    const manager = new InferenceCacheManager({
      prefixCache,
      kvCache: new InMemoryKvCacheProvider(),
    });
    const first = await manager.putPrefix({ id: 'first', version: '1', content: 'first' });
    const second = await manager.putPrefix({ id: 'second', version: '1', content: 'second' });
    await expect(manager.getPrefix(first)).resolves.toBe('first');
    const third = await manager.putPrefix({ id: 'third', version: '1', content: 'third' });
    await expect(manager.getPrefix(second)).resolves.toBeNull();
    await expect(manager.getPrefix(first)).resolves.toBe('first');
    await expect(manager.getPrefix(third)).resolves.toBe('third');
    expect(prefixCache.stats()).toEqual({ entries: 2, totalBytes: 10 });
    await expect(
      manager.putPrefix({ id: 'oversized', version: '1', content: 'x'.repeat(65) })
    ).rejects.toMatchObject({ code: 'INFERENCE_CACHE_CAPACITY_EXCEEDED' });

    const kvCache = new InMemoryKvCacheProvider({ maxEntries: 2 });
    const refs = [0, 1, 2].map((index) => ({
      id: `kv-${index}`,
      provider: 'fixture',
      modelAlias: 'default',
      scope: 'run' as const,
    }));
    await kvCache.put(refs[0], { value: 0 });
    await kvCache.put(refs[1], { value: 1 });
    await expect(kvCache.get(refs[0])).resolves.toEqual({ value: 0 });
    await kvCache.put(refs[2], { value: 2 });
    expect(kvCache.size()).toBe(2);
    await expect(kvCache.get(refs[1])).resolves.toBeNull();
  });

  it('separates identical inference cache references by user scope', async () => {
    const prefixCache = new InMemoryPrefixCacheProvider();
    const prefixBase = { id: 'shared', version: '1', contentHash: 'a'.repeat(64) };
    const prefixA = { ...prefixBase, cacheScope: { userId: 'user-a' } };
    const prefixB = { ...prefixBase, cacheScope: { userId: 'user-b' } };
    await prefixCache.put(prefixA, 'content-a');
    await prefixCache.put(prefixB, 'content-b');
    await expect(prefixCache.get(prefixA)).resolves.toBe('content-a');
    await expect(prefixCache.get(prefixB)).resolves.toBe('content-b');

    const kvCache = new InMemoryKvCacheProvider();
    const kvBase = {
      id: 'shared',
      provider: 'fixture',
      modelAlias: 'default',
      scope: 'session' as const,
    };
    const kvA = { ...kvBase, cacheScope: { userId: 'user-a' } };
    const kvB = { ...kvBase, cacheScope: { userId: 'user-b' } };
    await kvCache.put(kvA, { owner: 'a' });
    await kvCache.put(kvB, { owner: 'b' });
    await expect(kvCache.get(kvA)).resolves.toEqual({ owner: 'a' });
    await expect(kvCache.get(kvB)).resolves.toEqual({ owner: 'b' });
  });

  it('time-bounds direct inference cache manager operations', async () => {
    const pending = () => new Promise<never>(() => undefined);
    const manager = new InferenceCacheManager({
      prefixCache: {
        get: pending,
        put: pending,
        invalidate: async () => undefined,
      },
      kvCache: new InMemoryKvCacheProvider(),
      operationTimeoutMs: 5,
    });
    await expect(
      manager.getPrefix({ id: 'pending', version: '1', contentHash: 'a'.repeat(64) })
    ).rejects.toMatchObject({
      code: 'INFERENCE_CACHE_OPERATION_TIMEOUT',
      operation: 'prefix_read',
    });
  });

  it('enforces KV cache expiry on inference manager reads', async () => {
    const kvCache = new InMemoryKvCacheProvider();
    const kv = {
      id: 'expired',
      provider: 'mock',
      modelAlias: 'default',
      scope: 'run' as const,
      expiresAt: '2000-01-01T00:00:00.000Z',
    };
    await kvCache.put(kv, { stale: true });

    const manager = new InferenceManager({ kvCache });
    manager.register({
      id: 'mock',
      infer: async (request) => ({
        id: 'response_expired',
        output: {
          metadata: request.metadata,
          kv: request.resolvedKvCacheValue,
        },
      }),
    });

    await expect(
      manager.infer('mock', {
        runId: 'run_1',
        stepId: 'step_expired',
        modelAlias: 'default',
        input: 'hello',
        kvCache: kv,
      })
    ).resolves.toMatchObject({
      cache: { kvCacheHit: false, kvCacheMissReason: 'expired' },
      output: {
        metadata: { kvCacheHit: false, kvCacheMissReason: 'expired' },
      },
    });
    await expect(kvCache.get(kv)).resolves.toBeNull();
  });

  it('writes provider KV cache values and reuses them on later inference', async () => {
    const kvCache = new InMemoryKvCacheProvider();
    const kv = {
      id: 'kv_write',
      provider: 'mock',
      modelAlias: 'default',
      scope: 'session' as const,
    };
    const manager = new InferenceManager({ kvCache });
    manager.register({
      id: 'mock',
      infer: async (request) => ({
        id: 'response_write',
        output: {
          kv: request.resolvedKvCacheValue,
        },
        nextKvCacheValue: { handle: 'provider-cache-handle' },
      }),
    });

    await expect(
      manager.infer('mock', {
        runId: 'run_1',
        stepId: 'step_write',
        modelAlias: 'default',
        input: 'hello',
        cachePolicy: {
          writeKvCache: { ref: kv },
        },
      })
    ).resolves.toMatchObject({
      cache: { kvCacheWritten: true, kvCacheWriteRef: kv },
    });

    await expect(
      manager.infer('mock', {
        runId: 'run_1',
        stepId: 'step_read',
        modelAlias: 'default',
        input: 'hello again',
        cachePolicy: {
          kvCache: kv,
        },
      })
    ).resolves.toMatchObject({
      cache: { kvCacheHit: true, kvCacheRef: kv },
      output: { kv: { handle: 'provider-cache-handle' } },
    });
  });

  it('does not overwrite an existing KV cache hit when write_if_missing is used', async () => {
    const kvCache = new InMemoryKvCacheProvider();
    const kv = {
      id: 'kv_existing',
      provider: 'mock',
      modelAlias: 'default',
      scope: 'session' as const,
    };
    await kvCache.put(kv, { handle: 'existing' });

    const manager = new InferenceManager({ kvCache });
    manager.register({
      id: 'mock',
      infer: async () => ({
        id: 'response_existing',
        output: null,
        nextKvCacheValue: { handle: 'new' },
      }),
    });

    await expect(
      manager.infer('mock', {
        runId: 'run_1',
        stepId: 'step_existing',
        modelAlias: 'default',
        input: 'hello',
        cachePolicy: {
          kvCache: kv,
          writeKvCache: { ref: kv, mode: 'write_if_missing' },
        },
      })
    ).resolves.toMatchObject({
      cache: { kvCacheHit: true, kvCacheWritten: false },
    });
    await expect(kvCache.get(kv)).resolves.toEqual({ handle: 'existing' });
  });

  it('checks the target KV ref before write_if_missing writes without a read policy', async () => {
    const kvCache = new InMemoryKvCacheProvider();
    const kv = {
      id: 'kv_existing_write_only',
      provider: 'mock',
      modelAlias: 'default',
      scope: 'session' as const,
    };
    await kvCache.put(kv, { handle: 'existing' });

    const manager = new InferenceManager({ kvCache });
    manager.register({
      id: 'mock',
      infer: async () => ({
        id: 'response_write_only',
        output: null,
        nextKvCacheValue: { handle: 'new' },
      }),
    });

    await expect(
      manager.infer('mock', {
        runId: 'run_1',
        stepId: 'step_write_only',
        modelAlias: 'default',
        input: 'hello',
        cachePolicy: {
          writeKvCache: { ref: kv, mode: 'write_if_missing' },
        },
      })
    ).resolves.toMatchObject({
      cache: { kvCacheWritten: false, kvCacheWriteRef: kv },
    });
    await expect(kvCache.get(kv)).resolves.toEqual({ handle: 'existing' });
  });

  it('bypasses failed optional caches while preserving normalized recovery evidence', async () => {
    const failures: RecoveryFailure[] = [];
    const prefixCache: PrefixCacheProvider = {
      get: async () => {
        throw Object.assign(new Error('prefix cache offline'), { code: 'ECONNREFUSED' });
      },
      put: async () => {},
      invalidate: async () => {},
    };
    const kvCache: KvCacheProvider = {
      get: async () => {
        throw Object.assign(new Error('kv cache offline'), { code: 'ECONNREFUSED' });
      },
      put: async () => {
        throw Object.assign(new Error('kv cache write failed'), { code: 'ENOSPC' });
      },
      invalidate: async () => {},
    };
    const manager = new InferenceManager({
      prefixCache,
      kvCache,
      onRecoveryFailure: (failure) => {
        failures.push(failure);
      },
    });
    manager.register({
      id: 'mock',
      infer: async (request) => ({
        id: 'response_cache_bypass',
        output: { metadata: request.metadata },
        nextKvCacheValue: { handle: 'new' },
      }),
    });
    const prefix = { id: 'system', version: '1', contentHash: 'hash' };
    const kv = { id: 'kv_failed', provider: 'mock', modelAlias: 'default', scope: 'run' as const };

    await expect(
      manager.infer('mock', {
        runId: 'run_cache_bypass',
        stepId: 'step_cache_bypass',
        modelAlias: 'default',
        input: 'hello',
        cachePolicy: {
          prefix,
          kvCache: kv,
          writeKvCache: { ref: kv },
        },
      })
    ).resolves.toMatchObject({
      id: 'response_cache_bypass',
      cache: {
        prefixHit: false,
        kvCacheHit: false,
        kvCacheMissReason: 'error',
        kvCacheWritten: false,
        bypassed: true,
        issues: [
          { operation: 'prefix_read', bypassed: true },
          { operation: 'kv_read', bypassed: true },
          { operation: 'kv_write', bypassed: true },
        ],
      },
    });
    expect(failures).toHaveLength(3);
    expect(failures.every((failure) => failure.module === 'cache')).toBe(true);
  });

  it('time-bounds hanging cache providers before fail-open inference continues', async () => {
    const pending = () => new Promise<never>(() => undefined);
    const failures: RecoveryFailure[] = [];
    const manager = new InferenceManager({
      prefixCache: { get: pending, put: pending, invalidate: pending },
      kvCache: { get: pending, put: pending, invalidate: pending },
      cacheOperationTimeoutMs: 5,
      onRecoveryFailure: (failure) => {
        failures.push(failure);
      },
    });
    manager.register({
      id: 'mock',
      infer: async () => ({
        id: 'response_timeout_bypass',
        output: 'completed',
        nextKvCacheValue: { handle: 'next' },
      }),
    });
    const kv = { id: 'kv-timeout', provider: 'mock', modelAlias: 'default', scope: 'run' as const };
    const startedAt = Date.now();
    const response = await manager.infer('mock', {
      runId: 'run_cache_timeout',
      stepId: 'step_cache_timeout',
      modelAlias: 'default',
      input: 'hello',
      cachePolicy: {
        prefix: { id: 'prefix-timeout', version: '1', contentHash: 'hash' },
        kvCache: kv,
        writeKvCache: { ref: kv },
      },
    });

    expect(Date.now() - startedAt).toBeLessThan(250);
    expect(response).toMatchObject({
      id: 'response_timeout_bypass',
      output: 'completed',
      cache: {
        bypassed: true,
        issues: [
          { operation: 'prefix_read', code: 'INFERENCE_CACHE_OPERATION_TIMEOUT' },
          { operation: 'kv_read', code: 'INFERENCE_CACHE_OPERATION_TIMEOUT' },
          { operation: 'kv_write', code: 'INFERENCE_CACHE_OPERATION_TIMEOUT' },
        ],
      },
    });
    expect(failures).toHaveLength(3);
  });

  it('reports provider failures without hiding the original inference error', async () => {
    const failures: RecoveryFailure[] = [];
    const manager = new InferenceManager({
      providerRevision: 'provider-v1',
      onRecoveryFailure: (failure) => {
        failures.push(failure);
      },
    });
    const providerError = Object.assign(new Error('provider overloaded'), {
      status: 429,
      retryAfterMs: 500,
    });
    manager.register({
      id: 'mock',
      infer: async () => {
        throw providerError;
      },
    });

    await expect(
      manager.infer('mock', {
        runId: 'run_provider_failure',
        stepId: 'step_provider_failure',
        modelAlias: 'default',
        input: 'hello',
      })
    ).rejects.toBe(providerError);
    expect(failures).toMatchObject([
      {
        module: 'inference',
        category: 'rate_limit',
        retryable: true,
        retryAfterMs: 500,
        evidence: { providerRevision: 'provider-v1' },
      },
    ]);
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
    ).resolves.toMatchObject({
      id: 'response_4',
      metadata: { reasoning: { method: 'tot', nodeCount: 6 } },
    });
    expect(calls).toHaveLength(7);

    await expect(
      orchestrator.infer({
        runId: 'run_1',
        stepId: 'step_3',
        modelAlias: 'default',
        input: 'merge candidates',
        reasoning: { method: 'got', branches: 2, maxDepth: 1 },
      })
    ).resolves.toMatchObject({
      metadata: { reasoning: { method: 'got', nodeCount: 3 } },
    });
  });

  it('compiles prompts and segments stable prefixes from dynamic input', async () => {
    const compiler = new DefaultPromptCompiler();
    const compiled = await compiler.compile({
      runId: 'run_prompt',
      stepId: 'step_prompt',
      sessionId: 'session_prompt',
      agentId: 'agent_prompt',
      modelAlias: 'default-chat',
      instructions: 'Follow the domain policy.',
      context: { domain: 'general', ownerMode: 'single-user' },
      input: 'Summarize the current run.',
    });

    expect(compiled.messages.map((message) => message.role)).toEqual([
      'developer',
      'context',
      'user',
    ]);

    const segmented = await new DefaultPrefixSegmenter().segment(compiled);
    expect(segmented.stablePrefix).toContain('Follow the domain policy.');
    expect(segmented.dynamicPrompt).toContain('Summarize the current run.');
    expect(segmented.segments.filter((segment) => segment.cacheable)).toHaveLength(2);
    expect(segmented.metadata).toMatchObject({
      segmentCount: 3,
      cacheableSegmentCount: 2,
    });
  });

  it('tracks prefix registry, cache metadata, session state, and invalidation in Plasmod', async () => {
    const compiler = new DefaultPromptCompiler();
    const compiled = await compiler.compile({
      runId: 'run_plasmod_1',
      stepId: 'step_plasmod',
      sessionId: 'session_plasmod',
      agentId: 'agent_plasmod',
      modelAlias: 'default-chat',
      instructions: 'Stable runtime contract.',
      input: 'First dynamic request.',
    });
    const segmented = await new DefaultPrefixSegmenter().segment(compiled);
    const hotLayer = new InMemoryPlasmodHotLayer(() => new Date('2026-07-03T00:00:00.000Z'));

    const first = await hotLayer.prepare({
      runId: 'run_plasmod_1',
      stepId: 'step_plasmod',
      sessionId: 'session_plasmod',
      agentId: 'agent_plasmod',
      modelAlias: 'default-chat',
      backendId: 'sglang',
      cacheScope: { userId: 'user-plasmod' },
      segmentation: segmented,
    });
    const second = await hotLayer.prepare({
      runId: 'run_plasmod_2',
      stepId: 'step_plasmod',
      sessionId: 'session_plasmod',
      agentId: 'agent_plasmod',
      modelAlias: 'default-chat',
      backendId: 'sglang',
      cacheScope: { userId: 'user-plasmod' },
      segmentation: segmented,
    });

    expect(first.reusedSegmentIds).toHaveLength(0);
    expect(second.reusedSegmentIds).toHaveLength(1);
    expect(hotLayer.snapshot()).toMatchObject({
      prefixRegistrySize: 1,
      cacheMetadataSize: 1,
      sessionStateSize: 2,
    });

    const state = hotLayer.getSessionState(second.metadata?.stateId as string);
    expect(state).toMatchObject({
      sessionId: 'session_plasmod',
      backendId: 'sglang',
      modelAlias: 'default-chat',
    });

    const ref = second.prefixRefs[0];
    expect(hotLayer.getCacheMetadata(ref.id)).toMatchObject({
      segmentId: ref.id,
      reused: true,
    });

    await hotLayer.invalidateSegment(ref.id, 'test');
    expect(hotLayer.getCacheMetadata(ref.id)).toBeNull();
  });

  it('keeps Plasmod reuse inside the hard user scope even when cross-session reuse is enabled', async () => {
    const compiled = await new DefaultPromptCompiler().compile({
      runId: 'run_scope_a1',
      stepId: 'step_scope',
      sessionId: 'session_a1',
      agentId: 'agent_scope',
      modelAlias: 'default-chat',
      instructions: 'Stable scoped prefix.',
      input: 'Dynamic input.',
    });
    const segmented = await new DefaultPrefixSegmenter().segment(compiled);
    const hotLayer = new InMemoryPlasmodHotLayer();
    const prepare = (userId: string, sessionId: string, runId: string) =>
      hotLayer.prepare({
        runId,
        stepId: 'step_scope',
        sessionId,
        agentId: 'agent_scope',
        modelAlias: 'default-chat',
        backendId: 'sglang',
        cacheScope: { userId },
        segmentation: segmented,
        reusePolicy: { allowCrossSession: true, allowCrossAgent: true },
      });

    const userAFirst = await prepare('user-a', 'session-a1', 'run-a1');
    const userB = await prepare('user-b', 'session-b1', 'run-b1');
    const userASecond = await prepare('user-a', 'session-a2', 'run-a2');

    expect(userAFirst.reusedSegmentIds).toHaveLength(0);
    expect(userB.reusedSegmentIds).toHaveLength(0);
    expect(userB.prefixRefs[0]?.id).not.toBe(userAFirst.prefixRefs[0]?.id);
    expect(userASecond.reusedSegmentIds).toEqual([userAFirst.prefixRefs[0]?.id]);
  });

  it('bounds Plasmod segments, states, aliases, reuse keys, and dependency fan-out', async () => {
    const hotLayer = new InMemoryPlasmodHotLayer({
      maxSegments: 1,
      maxSessionStates: 1,
      maxAliases: 1,
      maxReuseKeys: 1,
      maxDependenciesPerSegment: 1,
    });
    const segmentation = (
      id: string,
      contentHash: string,
      dependencies: string[] = []
    ): PrefixSegmentationResult => ({
      compiled: { id: `compiled-${id}`, messages: [], text: id },
      segments: [
        {
          id,
          kind: 'system',
          scope: 'agent',
          content: id,
          contentHash,
          tokenCount: 4,
          cacheable: true,
          dependencies,
        },
      ],
      stablePrefix: id,
      dynamicPrompt: '',
    });
    const prepare = (id: string, hash: string, dependencies: string[] = []) =>
      hotLayer.prepare({
        runId: `run-${id}`,
        stepId: 'step-bounded',
        sessionId: `session-${id}`,
        agentId: 'agent-bounded',
        modelAlias: 'default-chat',
        backendId: 'sglang',
        cacheScope: { userId: 'user-bounded' },
        segmentation: segmentation(id, hash, dependencies),
      });

    const first = await prepare('first', 'a'.repeat(64));
    const second = await prepare('second', 'b'.repeat(64));
    expect(second.invalidatedSegmentIds).toContain(first.prefixRefs[0]?.id);
    expect(hotLayer.snapshot()).toMatchObject({
      prefixRegistrySize: 1,
      cacheMetadataSize: 1,
      sessionStateSize: 1,
      segmentAliasSize: 1,
      reuseKeySize: 1,
    });
    const skipped = await prepare('fan-out', 'c'.repeat(64), ['dep-1', 'dep-2']);
    expect(skipped.prefixRefs).toHaveLength(0);
    expect(hotLayer.snapshot().invalidationGraphSize).toBeLessThanOrEqual(1);
  });

  it('registers all inference backends and defaults to SGLang', () => {
    const registry = createDefaultInferenceBackendRegistry();
    expect(registry.default().id).toBe('sglang');
    expect(
      registry
        .list()
        .map((entry) => entry.id)
        .sort()
    ).toEqual(['llama.cpp', 'ollama', 'openai-api', 'sglang', 'vllm']);
  });

  it('normalizes concrete backend request and response shapes', async () => {
    const sglangTransport = new RecordingTransport({
      id: 'sglang_response',
      text: 'sglang output',
      usage: { prompt_tokens: 3, completion_tokens: 4, total_tokens: 7 },
      kv_cache: { handle: 'sglang-kv' },
    });
    const sglang = new SGLangInferenceBackend({ transport: sglangTransport });
    await expect(sglang.infer(backendRequest())).resolves.toMatchObject({
      id: 'sglang_response',
      output: 'sglang output',
      usage: { inputTokens: 3, outputTokens: 4, totalTokens: 7 },
      physicalKvCache: { handle: 'sglang-kv' },
    });
    expect(sglangTransport.calls[0].url).toBe('http://localhost:30000/generate');
    expect(sglangTransport.calls[0].body).toMatchObject({
      text: expect.stringContaining('hello'),
      sampling_params: { max_new_tokens: 32, temperature: 0.2 },
      stream: false,
    });

    const vllmTransport = new RecordingTransport({
      id: 'vllm_response',
      choices: [{ message: { content: 'vllm output' } }],
      usage: { prompt_tokens: 2, completion_tokens: 5 },
    });
    const vllm = new VLLMInferenceBackend({ transport: vllmTransport });
    await expect(vllm.infer(backendRequest())).resolves.toMatchObject({
      output: 'vllm output',
      usage: { inputTokens: 2, outputTokens: 5, totalTokens: 7 },
    });
    expect(vllmTransport.calls[0].body).toMatchObject({
      model: 'provider-model',
      messages: [
        { role: 'system', content: 'stable' },
        { role: 'user', content: 'hello' },
      ],
    });

    const llamaTransport = new RecordingTransport({
      content: 'llama output',
      tokens_evaluated: 6,
      tokens_predicted: 8,
    });
    const llama = new LlamaCppInferenceBackend({ transport: llamaTransport });
    await expect(llama.infer(backendRequest())).resolves.toMatchObject({
      output: 'llama output',
      usage: { inputTokens: 6, outputTokens: 8, totalTokens: 14 },
    });
    expect(llamaTransport.calls[0].body).toMatchObject({
      prompt: expect.stringContaining('hello'),
      cache_prompt: true,
      n_predict: 32,
    });

    const openaiTransport = new RecordingTransport({
      id: 'openai_response',
      choices: [{ message: { content: 'openai output' } }],
    });
    const openai = new OpenAIAPIInferenceBackend({
      transport: openaiTransport,
      apiKey: 'test-key',
    });
    await expect(openai.infer(backendRequest())).resolves.toMatchObject({
      output: 'openai output',
    });
    expect(openaiTransport.calls[0].url).toBe('https://api.openai.com/v1/chat/completions');
    expect(openaiTransport.calls[0].headers).toMatchObject({
      authorization: 'Bearer test-key',
    });
  });

  it('runs the full Hypha inference pipeline through default SGLang and returns generated tokens', async () => {
    const transport = new RecordingTransport({
      id: 'pipeline_response',
      text: 'generated tokens',
      kv_cache: { handle: 'physical-kv-cache' },
    });
    const registry = createDefaultInferenceBackendRegistry({
      sglang: { transport },
    });
    const pipeline = new HyphaInferencePipeline({ backends: registry });

    await expect(
      pipeline.infer({
        runId: 'run_pipeline',
        stepId: 'step_pipeline',
        sessionId: 'session_pipeline',
        agentId: 'agent_pipeline',
        modelAlias: 'default-chat',
        input: {
          instructions: 'Keep responses concise.',
          prompt: 'Say hello.',
        },
      })
    ).resolves.toMatchObject({
      id: 'pipeline_response',
      output: 'generated tokens',
      nextKvCacheValue: { handle: 'physical-kv-cache' },
      metadata: {
        backendId: 'sglang',
        backendKind: 'sglang',
      },
      cache: {
        kvCacheRef: { provider: 'sglang', modelAlias: 'default-chat', scope: 'session' },
      },
    });
    expect(transport.calls[0].url).toBe('http://localhost:30000/generate');
    expect(transport.calls[0].body).toMatchObject({
      text: expect.stringContaining('Say hello.'),
      stream: false,
    });
  });
});
