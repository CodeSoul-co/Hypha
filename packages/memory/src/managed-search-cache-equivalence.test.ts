import { describe, expect, it, vi } from 'vitest';
import { managedMemoryRecordExample } from './record-contract';
import {
  InMemoryMemorySearchCacheStore,
  RedisMemorySearchCacheStore,
  composeMemorySearchCacheProvider,
  type RedisLikeMemorySearchCacheClient,
} from './managed-search-cache';
import type {
  ManagedMemorySearchRequest,
  ManagedMemorySearchResult,
  MemoryManagementProvider,
} from './operations';

describe('Memory Search Cache equivalence', () => {
  it('makes enabled and disabled modes explicit without changing provider side effects', async () => {
    const disabledSearch = vi.fn(async (request: ManagedMemorySearchRequest) =>
      resultsFor(request, 'same')
    );
    const enabledSearch = vi.fn(async (request: ManagedMemorySearchRequest) =>
      resultsFor(request, 'same')
    );
    const disabledUpdate = vi.fn(async (operationId: string) => writeResult(operationId));
    const enabledUpdate = vi.fn(async (operationId: string) => writeResult(operationId));
    const disabled = composeMemorySearchCacheProvider({
      mode: 'disabled',
      provider: testProvider(disabledSearch, disabledUpdate),
    });
    const enabled = composeMemorySearchCacheProvider({
      mode: 'enabled',
      provider: testProvider(enabledSearch, enabledUpdate),
      cache: new InMemoryMemorySearchCacheStore(),
      providerRevision: 'provider:r1',
    });
    const request = searchRequest('operation:mode-one');

    const disabledFirst = await disabled.search(request);
    const disabledSecond = await disabled.search({
      ...request,
      operationId: 'operation:mode-two',
    });
    const enabledFirst = await enabled.search(request);
    const enabledSecond = await enabled.search({
      ...request,
      operationId: 'operation:mode-two',
    });

    expect(enabledFirst).toEqual(disabledFirst);
    expect(enabledSecond).toEqual(disabledSecond);
    expect(disabledSearch).toHaveBeenCalledTimes(2);
    expect(enabledSearch).toHaveBeenCalledOnce();

    await disabled.update(updateRequest('operation:disabled-update', request));
    await enabled.update(updateRequest('operation:enabled-update', request));
    expect(disabledUpdate).toHaveBeenCalledOnce();
    expect(enabledUpdate).toHaveBeenCalledOnce();

    const accessStatsRequest = { ...request, updateAccessStats: true };
    await disabled.search(accessStatsRequest);
    await enabled.search(accessStatsRequest);
    expect(disabledSearch).toHaveBeenCalledTimes(3);
    expect(enabledSearch).toHaveBeenCalledTimes(2);
  });

  it('preserves hits and scope invalidation across provider and Cache Store restarts', async () => {
    const client = createRedisClient();
    const firstSearch = vi.fn(async (request: ManagedMemorySearchRequest) =>
      resultsFor(request, 'persisted')
    );
    const first = composeMemorySearchCacheProvider({
      mode: 'enabled',
      provider: testProvider(firstSearch),
      cache: new RedisMemorySearchCacheStore({ client, namespace: 'restart-equivalence' }),
      providerRevision: 'provider:r1',
    });
    const request = searchRequest('operation:before-restart');
    const expected = await first.search(request);
    expect(firstSearch).toHaveBeenCalledOnce();

    const restartedSearch = vi.fn(async (input: ManagedMemorySearchRequest) =>
      resultsFor(input, 'should-not-run')
    );
    const restarted = composeMemorySearchCacheProvider({
      mode: 'enabled',
      provider: testProvider(restartedSearch),
      cache: new RedisMemorySearchCacheStore({ client, namespace: 'restart-equivalence' }),
      providerRevision: 'provider:r1',
    });
    await expect(
      restarted.search({ ...request, operationId: 'operation:after-restart' })
    ).resolves.toEqual(expected);
    expect(restartedSearch).not.toHaveBeenCalled();

    await restarted.update(updateRequest('operation:restart-update', request));
    const afterInvalidationSearch = vi.fn(async (input: ManagedMemorySearchRequest) =>
      resultsFor(input, 'after-invalidation')
    );
    const afterInvalidation = composeMemorySearchCacheProvider({
      mode: 'enabled',
      provider: testProvider(afterInvalidationSearch),
      cache: new RedisMemorySearchCacheStore({ client, namespace: 'restart-equivalence' }),
      providerRevision: 'provider:r1',
    });
    const refreshed = await afterInvalidation.search({
      ...request,
      operationId: 'operation:after-invalidation',
    });
    expect(refreshed[0]?.record.content).toEqual({ marker: 'after-invalidation' });
    expect(afterInvalidationSearch).toHaveBeenCalledOnce();
  });

  it('never reuses results across profile or provider revisions', async () => {
    const cache = new InMemoryMemorySearchCacheStore();
    const revisionOneSearch = vi.fn(async (request: ManagedMemorySearchRequest) =>
      resultsFor(request, `provider:r1/${request.profileRef.revision}`)
    );
    const providerRevisionOne = composeMemorySearchCacheProvider({
      mode: 'enabled',
      provider: testProvider(revisionOneSearch),
      cache,
      providerRevision: 'provider:r1',
    });
    const revisionOne = searchRequest('operation:revision-one');
    const cachedRevisionOne = await providerRevisionOne.search(revisionOne);
    await providerRevisionOne.search({
      ...revisionOne,
      operationId: 'operation:revision-one-hit',
    });
    expect(revisionOneSearch).toHaveBeenCalledOnce();

    const revisionTwo = {
      ...revisionOne,
      operationId: 'operation:revision-two',
      profileRef: { ...revisionOne.profileRef, revision: 'memory:r2' },
    };
    const profileRefreshed = await providerRevisionOne.search(revisionTwo);
    expect(profileRefreshed[0]?.record.content).toEqual({ marker: 'provider:r1/memory:r2' });
    expect(profileRefreshed).not.toEqual(cachedRevisionOne);
    expect(revisionOneSearch).toHaveBeenCalledTimes(2);

    const revisionTwoSearch = vi.fn(async (request: ManagedMemorySearchRequest) =>
      resultsFor(request, `provider:r2/${request.profileRef.revision}`)
    );
    const providerRevisionTwo = composeMemorySearchCacheProvider({
      mode: 'enabled',
      provider: testProvider(revisionTwoSearch),
      cache,
      providerRevision: 'provider:r2',
    });
    const providerRefreshed = await providerRevisionTwo.search({
      ...revisionTwo,
      operationId: 'operation:provider-revision-two',
    });
    expect(providerRefreshed[0]?.record.content).toEqual({ marker: 'provider:r2/memory:r2' });
    expect(revisionTwoSearch).toHaveBeenCalledOnce();
  });
});

function searchRequest(operationId: string): ManagedMemorySearchRequest {
  return {
    operationId,
    principal: {
      principalId: 'user_cache_equivalence',
      type: 'user',
      userId: 'user_cache_equivalence',
      permissionScopes: ['memory:read'],
    },
    scope: {
      userId: 'user_cache_equivalence',
      workspaceId: 'workspace_cache_equivalence',
    },
    profileRef: {
      id: 'memory.default',
      version: '1.0.0',
      revision: 'memory:r1',
    },
    query: 'stable query',
    topK: 5,
    includeContent: true,
    updateAccessStats: false,
  };
}

function updateRequest(
  operationId: string,
  request: ManagedMemorySearchRequest
): Parameters<MemoryManagementProvider['update']>[0] {
  return {
    operationId,
    principal: request.principal,
    scope: request.scope,
    memoryId: 'memory_cache_equivalence',
    patch: { summary: operationId },
    reason: 'cache equivalence test',
  };
}

function resultsFor(
  request: ManagedMemorySearchRequest,
  marker: string
): ManagedMemorySearchResult[] {
  return [
    {
      record: {
        ...managedMemoryRecordExample,
        scope: { ...request.scope },
        content: { marker },
      },
      score: 1,
    },
  ];
}

function writeResult(operationId: string) {
  return {
    operationId,
    status: 'committed' as const,
    records: [],
  };
}

function testProvider(
  search: (request: ManagedMemorySearchRequest) => Promise<ManagedMemorySearchResult[]>,
  update = vi.fn(async (operationId: string) => writeResult(operationId))
): MemoryManagementProvider {
  return {
    id: 'memory.provider.cache-equivalence',
    capabilities: async () => ({
      add: true,
      search: true,
      get: true,
      list: true,
      update: true,
      delete: true,
      deleteByFilter: true,
      history: false,
      summarize: false,
      consolidate: false,
      decay: false,
      reinforce: false,
      conflictDetection: false,
      hybridSearch: true,
      graphRelations: false,
      asyncWrite: false,
      batchOperations: false,
    }),
    add: async (request) => writeResult(request.operationId),
    search,
    get: async () => null,
    list: async () => ({ records: [], hasMore: false }),
    update: async (request) => update(request.operationId),
    delete: async (request) => ({
      operationId: request.operationId,
      status: 'completed',
      deletedMemoryIds: request.memoryIds ?? [],
    }),
    health: async () => ({ status: 'healthy', checkedAt: new Date().toISOString() }),
  };
}

function createRedisClient(): RedisLikeMemorySearchCacheClient {
  const strings = new Map<string, string>();
  const sets = new Map<string, Set<string>>();
  return {
    async get(key) {
      return strings.get(key) ?? null;
    },
    async set(key, value) {
      strings.set(key, value);
      return 'OK';
    },
    async del(...keys) {
      let deleted = 0;
      for (const key of keys) {
        deleted += strings.delete(key) ? 1 : 0;
        deleted += sets.delete(key) ? 1 : 0;
      }
      return deleted;
    },
    async sadd(key, ...members) {
      const values = sets.get(key) ?? new Set<string>();
      const before = values.size;
      members.forEach((member) => values.add(member));
      sets.set(key, values);
      return values.size - before;
    },
    async srem(key, ...members) {
      const values = sets.get(key);
      if (!values) return 0;
      let deleted = 0;
      members.forEach((member) => {
        deleted += values.delete(member) ? 1 : 0;
      });
      return deleted;
    },
    async smembers(key) {
      return [...(sets.get(key) ?? [])];
    },
    async incr(key) {
      const next = Number(strings.get(key) ?? '0') + 1;
      strings.set(key, String(next));
      return next;
    },
    async pexpire() {
      return 1;
    },
  };
}
