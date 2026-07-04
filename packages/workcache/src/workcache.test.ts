import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, expect, it } from 'vitest';
import type { FrameworkEvent, FrameworkEventType } from '@hypha/core';
import { createLLMCacheKey } from '@hypha/serving-cache';
import { createWorkCacheKey } from './key';
import { WorkGraphIndex } from './graph';
import { WorkCacheManager } from './manager';
import { DEFAULT_RUNTIME_TYPE_DEFINITIONS, RuntimeTypeRegistry } from './registry';
import { HotIndexedWorkCacheStore } from './stores/hot-index-store';
import { MemoryWorkCacheStore } from './stores/memory-store';
import { SQLiteWorkCacheStore } from './stores/sqlite-store';
import type { CacheBlock, CacheTreeType, WorkCacheAuditEvent } from './types';

describe('@hypha/workcache registry', () => {
  it('maps current FrameworkEventType values to exactly one primary tree', () => {
    const registry = new RuntimeTypeRegistry();
    const sourceTypes = registry.listSourceEventTypes();
    expect(sourceTypes).toContain('tool.call.completed');
    expect(sourceTypes).toContain('llm.cache.write');
    expect(registry.getDefinition('tool.call.completed')?.treeType).toBe('ToolTree');
    expect(registry.getDefinition('llm.cache.write')?.treeType).toBe('PromptPrefixTree');
    expect(new Set(sourceTypes).size).toBe(sourceTypes.length);

    for (const definition of DEFAULT_RUNTIME_TYPE_DEFINITIONS) {
      for (const sourceEventType of definition.sourceEventTypes) {
        expect(registry.getDefinition(sourceEventType)?.id).toBe(definition.id);
      }
    }
  });

  it('rejects unknown source events unless configured as extensions', () => {
    expect(
      () =>
        new RuntimeTypeRegistry({
          definitions: [
            {
              id: 'bad.plan',
              sourceEventTypes: ['plan.created' as FrameworkEventType],
              nodeType: 'plan',
              treeType: 'PlanTree',
              materialize: () => [],
            },
          ],
        })
    ).toThrow(/not a registered Hypha/);

    const registry = new RuntimeTypeRegistry({
      unknownEventPolicy: 'ignore',
    });
    expect(registry.normalize(event('artifact.created'), { unknownEventPolicy: 'ignore' })).toBeNull();
    expect(registry.normalize(event('message.enqueued'), { unknownEventPolicy: 'ignore' })).toBeNull();
    expect(() =>
      registry.normalize(event('artifact.created'), { unknownEventPolicy: 'reject' })
    ).toThrow(/unregistered source event/);
  });
});

describe('@hypha/workcache stores and manager', () => {
  it('writes, hits, expires, and rewrites memory blocks', async () => {
    let now = 1000;
    const store = new MemoryWorkCacheStore();
    const manager = new WorkCacheManager({
      store,
      now: () => now,
      policy: {
        enabled: true,
        store: 'memory',
        trees: { ToolTree: { enabled: true, ttlMs: 10 } },
      },
    });
    const source = reusableToolEvent();

    expect((await manager.ingest(source)).map((item) => item.type)).toEqual([
      'workcache.lookup',
      'workcache.miss',
      'workcache.write',
    ]);
    expect((await manager.ingest(source)).map((item) => item.type)).toEqual([
      'workcache.lookup',
      'workcache.hit',
    ]);
    now = 1011;
    expect((await manager.ingest(source)).map((item) => item.type)).toEqual([
      'workcache.lookup',
      'workcache.invalidate',
      'workcache.miss',
      'workcache.write',
    ]);
  });

  it('persists SQLite blocks across store restarts', async () => {
    const filename = path.join(
      fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-workcache-')),
      'workcache.sqlite'
    );
    const manager = new WorkCacheManager({
      store: new SQLiteWorkCacheStore({ filename }),
      policy: { enabled: true, store: 'sqlite' },
    });
    await manager.ingest(observationEvent('hash-1'));
    const firstStore = new SQLiteWorkCacheStore({ filename });
    const block = await firstStore.getByCacheKey(
      'ObservationTree',
      createWorkCacheKey({
        treeType: 'ObservationTree',
        nodeType: 'observation',
        identity: {
          sourceEventType: 'context.build.completed',
          resourceId: 'file:/repo/README.md',
        },
      })
    );
    expect(block?.validity.sourceHashes).toEqual({ 'file:/repo/README.md': 'hash-1' });
  });

  it('uses a CPU hot index over the backing store', async () => {
    const backing = new CountingMemoryWorkCacheStore();
    const hot = new HotIndexedWorkCacheStore(backing);
    const block = cacheBlockFixture();

    await hot.set(block);
    expect(backing.cacheKeyReads).toBe(0);
    expect(await hot.getByCacheKey('ToolTree', block.cacheKey)).toMatchObject({ id: block.id });
    expect(backing.cacheKeyReads).toBe(0);

    const coldHot = new HotIndexedWorkCacheStore(backing);
    expect(await coldHot.getByCacheKey('ToolTree', block.cacheKey)).toMatchObject({ id: block.id });
    expect(backing.cacheKeyReads).toBe(1);
    expect(await coldHot.getByCacheKey('ToolTree', block.cacheKey)).toMatchObject({ id: block.id });
    expect(backing.cacheKeyReads).toBe(1);
  });
});

describe('@hypha/workcache graph-derived demand', () => {
  it('builds typed WorkGraph nodes, dependency edges, and demand signals from source events', async () => {
    const graph = new WorkGraphIndex({ now: () => 1000 });
    const manager = new WorkCacheManager({
      store: new MemoryWorkCacheStore(),
      workGraph: graph,
      now: () => 1000,
      policy: { enabled: true, store: 'memory' },
    });
    await manager.ingest(observationEvent('hash-graph'));

    const snapshot = manager.getWorkGraph('run_1');
    expect(snapshot?.nodes.size).toBe(1);
    const node = Array.from(snapshot?.nodes.values() ?? [])[0];
    expect(node).toMatchObject({
      eventType: 'context.build.completed',
      nodeType: 'observation',
      primaryTreeType: 'ObservationTree',
      operation: 'context.build.completed',
      status: 'done',
    });
    expect(node?.environmentDeps?.[0]).toMatchObject({
      depType: 'file',
      key: '/repo/README.md',
      hash: 'hash-graph',
    });
    expect(Array.from(snapshot?.edges.values() ?? []).map((edge) => edge.edgeType)).toContain(
      'cache'
    );

    const signals = manager.listDemandSignals('run_1');
    expect(signals[0]).toMatchObject({
      sourceNodeId: node?.id,
      targetTreeType: 'ObservationTree',
      stepsToUse: 0,
      reason: 'source_event_materialized',
    });
    expect(signals[0]?.demandScore).toBeGreaterThan(0);
  });

  it('routes WorkGraph demand into tree-local block utility', async () => {
    const manager = managerWithMemory();
    await manager.ingest(
      reusableToolEvent({
        payload: {
          stepsToUse: 2,
          futureDemand: 40,
        },
      })
    );
    const lookup = await manager.lookup({
      treeType: 'ToolTree',
      cacheKey: createWorkCacheKey({
        treeType: 'ToolTree',
        nodeType: 'tool',
        identity: {
          toolId: 'search.web',
          stableArgs: { query: 'hypha' },
          permissionScope: ['web.search'],
        },
      }),
    });

    expect(lookup.hit).toBe(true);
    if (lookup.hit) {
      expect(lookup.block.utility.futureDemand).toBeGreaterThan(40);
      expect(lookup.block.utility.score).toBeGreaterThan(0);
      expect(lookup.block.metadata?.workGraph).toMatchObject({
        stepsToUse: 2,
      });
    }
    expect(manager.getWorkGraph('run_1')?.nodes.values().next().value).toMatchObject({
      stepsToExecution: 2,
      futureDemand: 40,
    });
  });

  it('clamps malformed demand hints to finite safe ranges', async () => {
    const manager = managerWithMemory();
    await manager.ingest(
      reusableToolEvent({
        id: 'run_1:tool_malformed_demand',
        payload: {
          input: { query: 'malformed' },
          stepsToUse: -1,
          futureDemand: -10,
          branchProbability: 7,
          criticality: -3,
          recomputeCost: -5,
          validationCost: -2,
        },
      })
    );
    const graphNode = manager.getWorkGraph('run_1')?.nodes.values().next().value;
    expect(graphNode).toMatchObject({
      stepsToExecution: 0,
      futureDemand: 0,
      branchProbability: 1,
      criticality: 0,
      recomputeCost: 0,
      validationCost: 0,
    });
    const signal = manager.listDemandSignals('run_1')[0];
    expect(signal.demandScore).toBeGreaterThanOrEqual(0);
    expect(Number.isFinite(signal.demandScore)).toBe(true);
  });
});

describe('@hypha/workcache tree safety rules', () => {
  it('caches only read-only tool results with stable args, scope, and validity metadata', async () => {
    const manager = managerWithMemory();
    const reusable = await manager.ingest(reusableToolEvent());
    expect(reusable.map((item) => item.type)).toContain('workcache.write');

    const writeTool = await manager.ingest(
      reusableToolEvent({
        id: 'run_1:tool_write',
        payload: {
          toolId: 'filesystem.write',
          sideEffectLevel: 'write',
          input: { path: 'a.txt', content: 'x' },
          permissionScope: ['filesystem.write'],
          validity: { sourceHashes: { args: 'a' } },
          output: { ok: true },
        },
      })
    );
    expect(writeTool).toHaveLength(1);
    expect(writeTool[0]).toMatchObject({
      type: 'workcache.bypass',
      payload: { treeType: 'ToolTree', reason: 'not_reusable' },
    });
  });

  it('invalidates ObservationTree blocks when provenance hash changes', async () => {
    const manager = managerWithMemory();
    await manager.ingest(observationEvent('hash-1'));
    const second = await manager.ingest(observationEvent('hash-2', 'run_1:context_2'));
    expect(second.map((item) => item.type)).toEqual([
      'workcache.lookup',
      'workcache.invalidate',
      'workcache.write',
    ]);
  });

  it('refuses VerificationTree reuse without strict source, test, and env hashes', async () => {
    const manager = managerWithMemory();
    const unsafe = await manager.ingest(
      event('eval.completed', {
        payload: { target: 'unit', output: { ok: true } },
      })
    );
    expect(unsafe).toHaveLength(1);
    expect(unsafe[0]).toMatchObject({
      type: 'workcache.bypass',
      payload: { treeType: 'VerificationTree', reason: 'not_reusable' },
    });

    const safe = await manager.ingest(
      event('eval.completed', {
        id: 'run_1:eval_safe',
        payload: {
          target: 'unit',
          output: { ok: true },
          sourceHash: 'src-hash',
          testHash: 'test-hash',
          envHash: 'env-hash',
        },
      })
    );
    expect(safe.map((item) => item.type)).toContain('workcache.write');
  });

  it('materializes PromptPrefixTree blocks in deterministic order', async () => {
    const left = managerWithMemory();
    const right = managerWithMemory();
    await left.ingest(prefixEvent('run_1:prefix_left', ['tool-schema', 'system', 'memory']));
    await right.ingest(prefixEvent('run_1:prefix_right', ['memory', 'system', 'tool-schema']));

    const leftPrefix = await left.materializePromptPrefix();
    const rightPrefix = await right.materializePromptPrefix();

    expect(leftPrefix.materialization.prefixHash).toBe(rightPrefix.materialization.prefixHash);
    expect(leftPrefix.materialization.prefix).toBe(rightPrefix.materialization.prefix);
    expect(leftPrefix.materialization.blocks[0]?.treeType).toBe('PromptPrefixTree');
  });

  it('keeps WorkCache and Serving Cache keys separate', async () => {
    const llmKey = createLLMCacheKey({
      provider: 'deepseek',
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: 'hello' }],
      params: { temperature: 0 },
    });
    const workKey = createWorkCacheKey({
      treeType: 'ComputationTree',
      nodeType: 'computation',
      identity: { sourceEventType: 'model.call.completed', payloadHash: 'abc' },
    });

    expect(llmKey.startsWith('llm:')).toBe(true);
    expect(workKey.startsWith('workcache:')).toBe(true);
    expect(workKey).not.toBe(llmKey);
  });

  it('emits workcache audit events after source events with required linkage fields', async () => {
    const manager = managerWithMemory();
    const source = observationEvent('hash-1');
    const audits: WorkCacheAuditEvent[] = await manager.ingest(source);

    expect(audits[0]).toMatchObject({
      type: 'workcache.lookup',
      runId: source.runId,
      payload: {
        sourceEventId: source.id,
        sourceEventType: source.type,
        treeType: 'ObservationTree',
      },
    });
    for (const audit of audits) {
      expect(audit.payload.blockId).toMatch(/^workcache:/);
      expect(audit.payload.cacheKey).toMatch(/^workcache:/);
    }
  });
});

function managerWithMemory(): WorkCacheManager {
  return new WorkCacheManager({
    store: new MemoryWorkCacheStore(),
    now: () => 1000,
    policy: { enabled: true, store: 'memory' },
  });
}

function reusableToolEvent(overrides: Partial<FrameworkEvent> = {}): FrameworkEvent {
  return event('tool.call.completed', {
    id: overrides.id,
    payload: {
      toolId: 'search.web',
      sideEffectLevel: 'read',
      input: { query: 'hypha' },
      permissionScope: ['web.search'],
      validity: { sourceHashes: { query: 'query-hash' } },
      output: { results: ['ok'] },
      ...(overrides.payload as Record<string, unknown> | undefined),
    },
  });
}

function observationEvent(hash: string, id = 'run_1:context_1'): FrameworkEvent {
  return event('context.build.completed', {
    id,
    payload: {
      resourceId: 'file:/repo/README.md',
      output: { summary: 'repo' },
      provenance: { sourceHash: hash, path: '/repo/README.md' },
    },
  });
}

function prefixEvent(id: string, order: string[]): FrameworkEvent {
  const blocks = order.map((type) => ({
    id: type === 'tool-schema' ? 'tools' : type,
    type,
    hash: `${type}-hash`,
    stable: true,
  }));
  return event('llm.cache.write', {
    id,
    payload: {
      key: 'llm:exact:abc',
      provider: 'deepseek',
      model: 'deepseek-chat',
      prefixMetadata: {
        prefixHash: 'prefix-hash',
        requestHash: 'request-hash',
        toolSchemaHash: 'tools-hash',
        domainPackHash: 'domain-hash',
        blocks,
      },
    },
  });
}

function event(
  type: FrameworkEventType,
  overrides: Partial<FrameworkEvent> = {}
): FrameworkEvent {
  return {
    id: overrides.id ?? `run_1:${type}:event`,
    type,
    runId: overrides.runId ?? 'run_1',
    sessionId: overrides.sessionId ?? 'session_1',
    stepId: overrides.stepId ?? 'step_1',
    timestamp: overrides.timestamp ?? new Date(1000).toISOString(),
    payload: overrides.payload ?? {},
    metadata: overrides.metadata,
  };
}

function cacheBlockFixture(): CacheBlock {
  return {
    id: 'workcache:block:fixture',
    treeType: 'ToolTree',
    nodeType: 'tool',
    cacheKey: 'workcache:ToolTree:tool:fixture',
    value: { ok: true },
    createdAt: 1000,
    updatedAt: 1000,
    sourceEventId: 'event_1',
    sourceEventType: 'tool.call.completed',
    validity: { status: 'valid', sourceHashes: { args: 'hash' } },
    utility: { score: 1 },
  };
}

class CountingMemoryWorkCacheStore extends MemoryWorkCacheStore {
  cacheKeyReads = 0;

  override async getByCacheKey<T = unknown>(
    treeType: CacheTreeType,
    cacheKey: string
  ): Promise<CacheBlock<T> | null> {
    this.cacheKeyReads += 1;
    return super.getByCacheKey<T>(treeType, cacheKey);
  }
}
