import { describe, expect, it } from 'vitest';
import {
  ReasoningOrchestrator,
  type InferenceProvider,
  type InferenceRequest,
} from '@hypha/inference';
import { WorkCacheManager } from './manager';
import { WorkCachedInferenceProvider } from './reasoning-inference-cache';
import { MemoryWorkCacheStore } from './stores/memory-store';
import { ThinkingCache } from './thinking-cache';
import { ThinkingCachedReasoningProvider } from './thinking-reasoning-cache';
import type { WorkCacheAuditEvent } from './types';

describe('WorkCachedInferenceProvider', () => {
  it('reuses a complete ToT path across runs through the unified ThinkingCache', async () => {
    let providerCalls = 0;
    const store = new MemoryWorkCacheStore();
    const manager = new WorkCacheManager({
      store,
      policy: { enabled: true, store: 'memory' },
    });
    const thinkingCache = new ThinkingCache({ manager });
    const provider: InferenceProvider = {
      id: 'path-provider',
      infer: async (input) => ({
        id: `response-${++providerCalls}`,
        output: { content: `${input.metadata?.depth}:${input.metadata?.branchIndex}` },
      }),
    };
    const reasoning = new ReasoningOrchestrator(
      new WorkCachedInferenceProvider({ provider, thinkingCache })
    );
    const cachedReasoning = new ThinkingCachedReasoningProvider({
      provider: reasoning,
      thinkingCache,
      resolveStrategy: (id) => reasoning.registry.get(id)?.descriptor,
    });

    const first = await cachedReasoning.infer(request('run-1', 'step-1', 'session-1'));
    const callsAfterFirstRun = providerCalls;
    const second = await cachedReasoning.infer(request('run-2', 'step-2', 'session-1'));

    expect(callsAfterFirstRun).toBeGreaterThan(0);
    expect(providerCalls).toBe(callsAfterFirstRun);
    expect(first.metadata?.reasoning).toMatchObject({ method: 'tot' });
    expect(second.metadata?.thinkingCache).toMatchObject({ hit: true, kind: 'path' });
    const blocks = await store.list('ComputationTree');
    expect(blocks.some((block) => block.tags?.includes('thinking-path'))).toBe(true);
    expect(blocks.some((block) => block.tags?.includes('thinking-node'))).toBe(true);
  });

  it('stores GoT results as subgraphs and includes prompt hashes in identity', async () => {
    let providerCalls = 0;
    const store = new MemoryWorkCacheStore();
    const manager = new WorkCacheManager({
      store,
      policy: { enabled: true, store: 'memory' },
    });
    const thinkingCache = new ThinkingCache({ manager });
    const provider: InferenceProvider = {
      id: 'graph-provider',
      infer: async () => ({
        id: `response-${++providerCalls}`,
        output: { content: 'candidate' },
      }),
    };
    const reasoning = new ReasoningOrchestrator(
      new WorkCachedInferenceProvider({ provider, thinkingCache })
    );
    const cachedReasoning = new ThinkingCachedReasoningProvider({
      provider: reasoning,
      thinkingCache,
      resolveStrategy: (id) => reasoning.registry.get(id)?.descriptor,
    });
    const base = {
      ...request('run-1', 'step-1', 'session-1'),
      reasoning: {
        method: 'got' as const,
        branches: 2,
        maxDepth: 1,
        beamWidth: 1,
        strategyVersion: '1',
      },
      metadata: {
        userId: 'user-1',
        sessionId: 'session-1',
        prompt: { blocks: [{ id: 'agent.default', version: '1', hash: 'prompt-a' }] },
      },
    };
    await cachedReasoning.infer(base);
    const callsAfterFirst = providerCalls;
    const reused = await cachedReasoning.infer({ ...base, runId: 'run-2', stepId: 'step-2' });
    expect(providerCalls).toBe(callsAfterFirst);
    expect(reused.metadata?.thinkingCache).toMatchObject({ hit: true, kind: 'subgraph' });

    await cachedReasoning.infer({
      ...base,
      runId: 'run-3',
      stepId: 'step-3',
      metadata: {
        ...base.metadata,
        prompt: { blocks: [{ id: 'agent.default', version: '1', hash: 'prompt-b' }] },
      },
    });
    expect(providerCalls).toBeGreaterThan(callsAfterFirst);
    const blocks = await store.list('ComputationTree');
    expect(blocks.filter((block) => block.tags?.includes('thinking-subgraph'))).toHaveLength(2);
  });

  it('reuses ToT nodes across runs while preserving user and session boundaries', async () => {
    let providerCalls = 0;
    const events: WorkCacheAuditEvent[] = [];
    const provider: InferenceProvider = {
      id: 'deterministic-provider',
      infer: async (request) => {
        providerCalls += 1;
        return {
          id: `response-${providerCalls}`,
          output: {
            content: [
              request.metadata?.depth,
              request.metadata?.branchIndex,
              request.metadata?.parentOutputSummary ?? 'root',
            ].join(':'),
          },
          usage: { totalTokens: 10 },
        };
      },
    };
    const manager = new WorkCacheManager({
      store: new MemoryWorkCacheStore(),
      policy: { enabled: true, store: 'memory' },
    });
    const cached = new WorkCachedInferenceProvider({
      provider,
      manager,
      trace: (event) => {
        events.push(event);
      },
    });
    const reasoning = new ReasoningOrchestrator(cached);

    await reasoning.infer(request('run-1', 'step-1', 'session-1'));
    const callsAfterFirstRun = providerCalls;
    expect(callsAfterFirstRun).toBeGreaterThan(0);

    const reused = await reasoning.infer(request('run-2', 'step-2', 'session-1'));
    expect(providerCalls).toBe(callsAfterFirstRun);
    expect(reused.metadata?.reasoning).toMatchObject({ method: 'tot' });
    expect(events.filter((event) => event.type === 'workcache.hit')).toHaveLength(
      callsAfterFirstRun
    );

    await reasoning.infer(request('run-3', 'step-3', 'session-2'));
    expect(providerCalls).toBeGreaterThan(callsAfterFirstRun);
  });

  it('invalidates reuse when the reasoning strategy version changes', async () => {
    let providerCalls = 0;
    const provider: InferenceProvider = {
      id: 'versioned-provider',
      infer: async () => ({
        id: `response-${++providerCalls}`,
        output: { content: 'answer' },
      }),
    };
    const cached = new WorkCachedInferenceProvider({
      provider,
      manager: new WorkCacheManager({
        store: new MemoryWorkCacheStore(),
        policy: { enabled: true, store: 'memory' },
      }),
    });
    const reasoning = new ReasoningOrchestrator(cached);

    await reasoning.infer({
      ...request('run-1', 'step-1', 'session-1'),
      reasoning: { method: 'direct', strategyVersion: '1' },
    });
    await reasoning.infer({
      ...request('run-2', 'step-2', 'session-1'),
      reasoning: { method: 'direct', strategyVersion: '2' },
    });

    expect(providerCalls).toBe(2);
  });

  it('fails open without reading or writing when WorkCache is disabled', async () => {
    let providerCalls = 0;
    const store = new MemoryWorkCacheStore();
    const provider: InferenceProvider = {
      id: 'uncached-provider',
      infer: async () => ({
        id: `response-${++providerCalls}`,
        output: { content: 'answer' },
      }),
    };
    const reasoning = new ReasoningOrchestrator(
      new WorkCachedInferenceProvider({
        provider,
        manager: new WorkCacheManager({
          store,
          policy: { enabled: false, store: 'off' },
        }),
      })
    );

    await reasoning.infer({
      ...request('run-1', 'step-1', 'session-1'),
      reasoning: { method: 'direct' },
    });
    await reasoning.infer({
      ...request('run-2', 'step-2', 'session-1'),
      reasoning: { method: 'direct' },
    });

    expect(providerCalls).toBe(2);
    expect(await store.list()).toEqual([]);
  });
});

function request(
  runId: string,
  stepId: string,
  sessionId: string
): InferenceRequest & {
  reasoning: {
    method: 'tot';
    branches: number;
    maxDepth: number;
    beamWidth: number;
    strategyVersion: string;
  };
} {
  return {
    runId,
    stepId,
    sessionId,
    modelAlias: 'model-a',
    input: { messages: [{ role: 'user', content: 'same problem' }] },
    metadata: { userId: 'user-1', sessionId },
    reasoning: {
      method: 'tot',
      branches: 2,
      maxDepth: 2,
      beamWidth: 1,
      strategyVersion: '1',
    },
  };
}
