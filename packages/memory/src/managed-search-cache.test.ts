import { describe, expect, it, vi } from 'vitest';
import { managedMemoryRecordExample } from './record-contract';
import {
  CachedMemoryManagementProvider,
  InMemoryMemorySearchCacheStore,
  type MemorySearchCacheRecord,
  type MemorySearchCacheStore,
} from './managed-search-cache';
import type {
  ManagedMemorySearchRequest,
  ManagedMemorySearchResult,
  ManagedMemoryUpdateRequest,
  MemoryManagementProvider,
} from './operations';

describe('CachedMemoryManagementProvider', () => {
  it('reuses pure searches across operation ids under the same authorization boundary', async () => {
    const search = vi.fn(async (request: ManagedMemorySearchRequest) => resultsFor(request));
    const cache = new InMemoryMemorySearchCacheStore();
    const provider = new CachedMemoryManagementProvider({
      provider: testProvider(search),
      cache,
      providerRevision: 'provider:v1',
      now: () => 1000,
    });

    const first = await provider.search(searchRequest('operation:one'));
    const second = await provider.search(searchRequest('operation:two'));

    expect(search).toHaveBeenCalledTimes(1);
    expect(second).toEqual(first);
    second[0]!.record.content = { changed: true };
    expect(first[0]!.record.content).not.toEqual({ changed: true });
  });

  it('includes principal permissions and user scope in search identity', async () => {
    const search = vi.fn(async (request: ManagedMemorySearchRequest) => resultsFor(request));
    const provider = new CachedMemoryManagementProvider({
      provider: testProvider(search),
      cache: new InMemoryMemorySearchCacheStore(),
      providerRevision: 'provider:v1',
    });
    const base = searchRequest('operation:one');

    await provider.search(base);
    await provider.search({
      ...base,
      operationId: 'operation:permission-change',
      principal: { ...base.principal, permissionScopes: ['memory:read', 'memory:sensitive'] },
    });
    await provider.search({
      ...base,
      operationId: 'operation:other-user',
      scope: { ...base.scope, userId: 'user_02' },
      principal: { ...base.principal, principalId: 'user_02', userId: 'user_02' },
    });

    expect(search).toHaveBeenCalledTimes(3);
  });

  it('invalidates the complete scope after a successful mutation', async () => {
    const search = vi.fn(async (request: ManagedMemorySearchRequest) => resultsFor(request));
    const underlying = testProvider(search);
    const provider = new CachedMemoryManagementProvider({
      provider: underlying,
      cache: new InMemoryMemorySearchCacheStore(),
      providerRevision: 'provider:v1',
    });
    const request = searchRequest('operation:one');
    await provider.search(request);
    await provider.search({ ...request, operationId: 'operation:two' });
    expect(search).toHaveBeenCalledTimes(1);

    await provider.update({
      operationId: 'operation:update',
      principal: request.principal,
      scope: request.scope,
      memoryId: 'memory_01',
      patch: { summary: 'updated' },
      reason: 'test',
    });
    await provider.search({ ...request, operationId: 'operation:three' });

    expect(search).toHaveBeenCalledTimes(2);
    expect(underlying.update).toHaveBeenCalledOnce();
  });

  it('bypasses searches that may update access statistics', async () => {
    const search = vi.fn(async (request: ManagedMemorySearchRequest) => resultsFor(request));
    const cache = new InMemoryMemorySearchCacheStore();
    const provider = new CachedMemoryManagementProvider({
      provider: testProvider(search),
      cache,
      providerRevision: 'provider:v1',
    });
    const request = { ...searchRequest('operation:one'), updateAccessStats: undefined };

    await provider.search(request);
    await provider.search({ ...request, operationId: 'operation:two' });

    expect(search).toHaveBeenCalledTimes(2);
    expect(cache.stats().entries).toBe(0);
  });

  it('time-bounds Cache Stores and preserves the Memory provider result by default', async () => {
    const hanging: MemorySearchCacheStore = {
      get: async () => new Promise<MemorySearchCacheRecord | null>(() => undefined),
      set: async () => undefined,
      delete: async () => undefined,
      invalidateScope: async () => 0,
    };
    const search = vi.fn(async (request: ManagedMemorySearchRequest) => resultsFor(request));
    const bypass = new CachedMemoryManagementProvider({
      provider: testProvider(search),
      cache: hanging,
      providerRevision: 'provider:v1',
      operationTimeoutMs: 5,
    });
    await expect(bypass.search(searchRequest('operation:bypass'))).resolves.toHaveLength(1);

    const strict = new CachedMemoryManagementProvider({
      provider: testProvider(search),
      cache: hanging,
      providerRevision: 'provider:v1',
      operationTimeoutMs: 5,
      failureMode: 'strict',
    });
    await expect(strict.search(searchRequest('operation:strict'))).rejects.toThrow(/exceeded 5ms/u);
  });

  it('does not retry a failed Memory provider after quarantining a corrupt cache record', async () => {
    const cache: MemorySearchCacheStore = {
      get: async () => ({ invalid: true }) as unknown as MemorySearchCacheRecord,
      set: async () => undefined,
      delete: async () => undefined,
      invalidateScope: async () => 0,
    };
    const search = vi.fn(async () => {
      throw new Error('provider failed');
    });
    const provider = new CachedMemoryManagementProvider({
      provider: testProvider(search),
      cache,
      providerRevision: 'provider:v1',
    });

    await expect(provider.search(searchRequest('operation:failed'))).rejects.toThrow(
      'provider failed'
    );
    expect(search).toHaveBeenCalledOnce();
  });

  it('bounds the local Store and enforces physical/logical key binding', async () => {
    const store = new InMemoryMemorySearchCacheStore({ maxEntries: 1 });
    const writtenKeys: string[] = [];
    const provider = new CachedMemoryManagementProvider({
      provider: testProvider(async (request) => resultsFor(request)),
      cache: store,
      providerRevision: 'provider:v1',
      trace: (event) => {
        if (event.type === 'memory.cache.write' && event.key) writtenKeys.push(event.key);
      },
    });
    await provider.search(searchRequest('operation:one'));
    await provider.search({
      ...searchRequest('operation:two'),
      query: 'different query',
    });
    expect(store.stats()).toMatchObject({ entries: 1, evictions: 1 });

    const record = (await store.get(writtenKeys.at(-1)!))!;
    await expect(store.set('different-key', record)).rejects.toThrow(/does not match/u);
  });
});

function searchRequest(operationId: string): ManagedMemorySearchRequest {
  return {
    operationId,
    principal: {
      principalId: 'user_01',
      type: 'user',
      userId: 'user_01',
      permissionScopes: ['memory:read'],
    },
    scope: { userId: 'user_01', workspaceId: 'workspace_01' },
    profileRef: { id: 'memory.default', version: '1.0.0', revision: 'memory:v1' },
    query: 'preference',
    topK: 5,
    includeContent: true,
    updateAccessStats: false,
  };
}

function resultsFor(request: ManagedMemorySearchRequest): ManagedMemorySearchResult[] {
  return [
    {
      record: {
        ...managedMemoryRecordExample,
        scope: { ...request.scope },
        scopeHash: `scope:${request.scope.userId}`,
      },
      score: 1,
    },
  ];
}

function testProvider(
  search: (request: ManagedMemorySearchRequest) => Promise<ManagedMemorySearchResult[]>
): MemoryManagementProvider {
  const update = vi.fn(async (request: ManagedMemoryUpdateRequest) => ({
    operationId: request.operationId,
    status: 'committed' as const,
    records: [],
  }));
  return {
    id: 'memory.provider.test',
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
    add: async (request) => ({
      operationId: request.operationId,
      status: 'committed',
      records: [],
    }),
    search,
    get: async () => null,
    list: async () => ({ records: [], hasMore: false }),
    update,
    delete: async (request) => ({
      operationId: request.operationId,
      status: 'completed',
      deletedMemoryIds: request.memoryIds ?? [],
    }),
    health: async () => ({ status: 'healthy', checkedAt: new Date().toISOString() }),
  };
}
