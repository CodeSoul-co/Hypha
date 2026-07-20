import { describe, expect, it } from 'vitest';
import type { FrameworkEvent } from '@hypha/core';
import { WorkGraphIndex } from './graph';
import { InMemoryWorkCacheInvalidationBus } from './invalidation-bus';
import { WorkCacheManager } from './manager';
import { validateCacheBlock } from './schemas';
import { MemoryWorkCacheStore } from './stores/memory-store';
import { HotIndexedWorkCacheStore } from './stores/hot-index-store';
import { RedisWorkCacheStore, type RedisWorkCacheClient } from './stores/redis-store';

describe('@hypha/workcache hardening', () => {
  it('partitions cache identity and blocks by user scope', async () => {
    const store = new MemoryWorkCacheStore();
    const manager = managerWith(store);
    await manager.ingest(planEvent('event_a', 'user_a'));
    await manager.ingest(planEvent('event_b', 'user_b'));

    const blocks = await store.list('PlanTree');
    expect(blocks).toHaveLength(2);
    expect(new Set(blocks.map((block) => block.scope?.userId))).toEqual(
      new Set(['user_a', 'user_b'])
    );
    expect(new Set(blocks.map((block) => block.cacheKey)).size).toBe(2);
  });

  it('bypasses unscoped events and never treats unknown validity as reusable', async () => {
    const manager = managerWith(new MemoryWorkCacheStore());
    const unscoped = planEvent('event_unscoped', undefined);
    delete unscoped.userId;
    expect(await manager.ingest(unscoped)).toMatchObject([
      { type: 'workcache.bypass', payload: { reason: 'scope_missing' } },
    ]);

    const source = planEvent('event_one', 'owner');
    expect((await manager.ingest(source)).map((item) => item.type)).toEqual([
      'workcache.lookup',
      'workcache.miss',
      'workcache.write',
    ]);
    const replay = await manager.ingest(planEvent('event_two', 'owner'));
    expect(replay.map((item) => item.type)).toEqual([
      'workcache.lookup',
      'workcache.invalidate',
      'workcache.miss',
      'workcache.write',
    ]);
    expect(replay[1]?.payload.reason).toBe('unproven');
  });

  it('fails open on store outages while strict mode preserves the error', async () => {
    const failingStore = {
      async get() {
        throw new Error('offline');
      },
      async getByCacheKey() {
        throw new Error('offline');
      },
      async set() {
        throw new Error('offline');
      },
      async delete() {
        throw new Error('offline');
      },
      async list() {
        throw new Error('offline');
      },
    };
    const bypass = managerWith(failingStore);
    expect(await bypass.ingest(validToolEvent())).toMatchObject([
      { type: 'workcache.bypass', payload: { reason: 'store_unavailable' } },
    ]);

    const strict = new WorkCacheManager({
      store: failingStore,
      policy: { enabled: true, store: 'memory', failureMode: 'strict' },
    });
    await expect(strict.ingest(validToolEvent())).rejects.toThrow('offline');
  });

  it('enforces tree capacity in the backing store, not only the hot index', async () => {
    const store = new MemoryWorkCacheStore({ maxEntries: 100 });
    const manager = new WorkCacheManager({
      store,
      policy: {
        enabled: true,
        store: 'memory',
        trees: { PlanTree: { enabled: true, maxEntries: 2 } },
      },
    });
    await manager.ingest(planEvent('one', 'owner', { plan: 1 }));
    await manager.ingest(planEvent('two', 'owner', { plan: 2 }));
    await manager.ingest(planEvent('three', 'owner', { plan: 3 }));

    expect(await store.list('PlanTree')).toHaveLength(2);
  });

  it('propagates explicit invalidation to peer hot indexes', async () => {
    const bus = new InMemoryWorkCacheInvalidationBus();
    const firstStore = new MemoryWorkCacheStore();
    const secondStore = new MemoryWorkCacheStore();
    const first = new WorkCacheManager({
      store: firstStore,
      invalidationBus: bus,
      policy: { enabled: true, store: 'memory' },
    });
    const second = new WorkCacheManager({
      store: secondStore,
      invalidationBus: bus,
      policy: { enabled: true, store: 'memory' },
    });
    await Promise.resolve();
    const source = validToolEvent();
    await first.ingest(source);
    await second.ingest(source);
    expect(await secondStore.list('ToolTree')).toHaveLength(1);

    const count = await first.invalidate(
      { treeType: 'ToolTree', scope: eventScope(source) },
      'tool_version_changed'
    );

    expect(count).toBe(1);
    expect(await secondStore.list('ToolTree')).toHaveLength(0);
    await first.close();
    await second.close();
  });

  it('bounds WorkGraph history and demand signals', async () => {
    const graph = new WorkGraphIndex({
      maxGraphs: 1,
      maxNodesPerGraph: 2,
      maxDemandSignals: 2,
      now: () => 1000,
    });
    const manager = new WorkCacheManager({
      store: new MemoryWorkCacheStore(),
      workGraph: graph,
      policy: { enabled: true, store: 'memory' },
    });
    for (const id of ['one', 'two', 'three']) {
      await manager.ingest(validToolEvent(id));
    }

    expect(manager.getWorkGraph('run_1')?.nodes.size).toBe(2);
    expect(manager.listDemandSignals()).toHaveLength(2);
    await manager.ingest({ ...validToolEvent('other'), runId: 'run_2' });
    expect(manager.getWorkGraph('run_1')).toBeNull();
    expect(manager.getWorkGraph('run_2')?.nodes.size).toBe(1);
  });

  it('round-trips versioned blocks through a Redis-compatible store', async () => {
    const values = new Map<string, string>();
    const client: RedisWorkCacheClient = {
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
      async scan(_cursor, ...args) {
        const matchIndex = args.indexOf('MATCH');
        const pattern = matchIndex >= 0 ? String(args[matchIndex + 1]) : '*';
        const prefix = pattern.endsWith('*') ? pattern.slice(0, -1) : pattern;
        return ['0', [...values.keys()].filter((key) => key.startsWith(prefix))];
      },
      async ping() {
        return 'PONG';
      },
    };
    const store = new RedisWorkCacheStore({ client, prefix: 'test:', now: () => 1000 });
    const manager = managerWith(store, false);
    await manager.ingest(validToolEvent());
    const blocks = await store.list('ToolTree');

    expect(blocks).toHaveLength(1);
    expect(blocks[0]).toMatchObject({ schemaVersion: '1.0', keyVersion: '1' });
    expect(await store.health()).toMatchObject({ status: 'healthy' });
    expect(await store.getByCacheKey('ToolTree', blocks[0]!.cacheKey)).toMatchObject({
      id: blocks[0]!.id,
    });
    const replacement = {
      ...blocks[0]!,
      id: `${blocks[0]!.id}:replacement`,
      sourceEventId: 'replacement-event',
      updatedAt: 1001,
    };
    await store.set(replacement);
    await store.delete(blocks[0]!.id);
    expect(await store.getByCacheKey('ToolTree', replacement.cacheKey)).toMatchObject({
      id: replacement.id,
    });
  });

  it('removes stale hot-index aliases when a block identity changes', async () => {
    const backing = new MemoryWorkCacheStore();
    const hot = new HotIndexedWorkCacheStore(backing);
    const original = validCacheBlock('shared-block', 'old-key');
    await hot.set(original);
    await hot.set({ ...original, cacheKey: 'new-key', updatedAt: 1001 });

    expect(await hot.getByCacheKey('ToolTree', 'old-key')).toBeNull();
    expect(await hot.getByCacheKey('ToolTree', 'new-key')).toMatchObject({
      id: 'shared-block',
      cacheKey: 'new-key',
    });
  });

  it('quarantines a Redis index that points at a block with a different key', async () => {
    const values = new Map<string, string>();
    const client: RedisWorkCacheClient = {
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
    };
    const block = validCacheBlock('poison-block', 'actual-key');
    values.set('binding:block:poison-block', JSON.stringify(block));
    values.set('binding:index:ToolTree:requested-key', 'poison-block');
    const store = new RedisWorkCacheStore({ client, prefix: 'binding:' });

    expect(await store.getByCacheKey('ToolTree', 'requested-key')).toBeNull();
    expect(values.has('binding:index:ToolTree:requested-key')).toBe(false);
    expect(values.has('binding:block:poison-block')).toBe(true);
  });

  it('rejects invalid runtime policy values before creating a manager', () => {
    expect(
      () =>
        new WorkCacheManager({
          store: new MemoryWorkCacheStore(),
          policy: { enabled: true, store: 'memory', operationTimeoutMs: 0 },
        })
    ).toThrow();
  });

  it('rejects missing block values and bypasses non-JSON cache payloads', async () => {
    expect(() =>
      validateCacheBlock({
        id: 'invalid',
        treeType: 'PlanTree',
        nodeType: 'plan',
        cacheKey: 'invalid',
        createdAt: 1,
        updatedAt: 1,
        sourceEventId: 'event',
        sourceEventType: 'agent.reasoning.completed',
        validity: { status: 'valid' },
        utility: { score: 1 },
      })
    ).toThrow();
    const manager = managerWith(new MemoryWorkCacheStore());
    await expect(
      manager.write({
        id: 'non-json',
        treeType: 'PlanTree',
        nodeType: 'plan',
        cacheKey: 'non-json',
        value: { handler: () => undefined },
        createdAt: 1000,
        updatedAt: 1000,
        sourceEventId: 'event',
        sourceEventType: 'agent.reasoning.completed',
        scope: { userId: 'owner', sessionId: 'session_1' },
        validity: { status: 'valid' },
        utility: { score: 1 },
      })
    ).resolves.toBe(false);
  });
});

function managerWith(
  store: ConstructorParameters<typeof WorkCacheManager>[0]['store'],
  hotIndex = true
): WorkCacheManager {
  return new WorkCacheManager({
    store,
    hotIndex,
    now: () => 1000,
    policy: { enabled: true, store: 'memory' },
  });
}

function planEvent(
  id: string,
  userId: string | undefined,
  payload: Record<string, unknown> = { plan: ['inspect'] }
): FrameworkEvent {
  return baseEvent({ id, type: 'agent.reasoning.completed', userId, payload });
}

function validToolEvent(id = 'tool_event'): FrameworkEvent {
  return baseEvent({
    id,
    type: 'tool.call.completed',
    userId: 'owner',
    payload: {
      toolId: 'search.web',
      sideEffectLevel: 'read',
      input: { query: id },
      permissionScope: ['web.search'],
      validity: { sourceHashes: { query: id } },
      output: { ok: true },
    },
  });
}

function baseEvent(
  input: Pick<FrameworkEvent, 'id' | 'type' | 'payload'> & { userId?: string }
): FrameworkEvent {
  return {
    ...input,
    runId: 'run_1',
    sessionId: 'session_1',
    stepId: 'step_1',
    timestamp: new Date(1000).toISOString(),
  };
}

function eventScope(event: FrameworkEvent) {
  return { userId: event.userId, sessionId: event.sessionId };
}

function validCacheBlock(id: string, cacheKey: string) {
  return {
    schemaVersion: '1.0' as const,
    keyVersion: '1' as const,
    id,
    treeType: 'ToolTree' as const,
    nodeType: 'tool' as const,
    cacheKey,
    value: { output: 'ok' },
    createdAt: 1000,
    updatedAt: 1000,
    sourceEventId: 'event',
    sourceEventType: 'tool.call.completed' as const,
    scope: { userId: 'owner' },
    validity: { status: 'valid' as const, provenanceHash: 'sha256:proof' },
    utility: { score: 1 },
  };
}
