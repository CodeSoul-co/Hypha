import { describe, expect, it } from 'vitest';
import {
  Mem0OssClient,
  Mem0PlatformClient,
  MemoryBankLocalClient,
  MemoryBankManagedClient,
  hashMemoryScope,
  memoryProfileSpecExample,
  runExternalProviderAcceptance,
  type ExternalMemoryClient,
  type ExternalProviderAcceptanceFixture,
  type ManagedMemoryScope,
  type Mem0HttpFetch,
  type Mem0HttpResponse,
  type MemoryManagementCapabilities,
  type MemoryPrincipal,
} from './index';

const principal: MemoryPrincipal = {
  principalId: 'contract-user',
  type: 'user',
  userId: 'contract-user',
  permissionScopes: ['memory:read', 'memory:write'],
};
const scope: ManagedMemoryScope = {
  userId: 'contract-user',
  workspaceId: 'contract-workspace',
};
const fixture: ExternalProviderAcceptanceFixture = {
  add: {
    operationId: 'contract:add',
    principal,
    scope,
    profileRef: memoryProfileSpecExample,
    input: 'blue',
    memoryType: 'semantic',
    source: { type: 'user_message', sourceId: 'contract-message' },
  },
  search: {
    operationId: 'contract:search',
    principal,
    scope,
    profileRef: memoryProfileSpecExample,
    query: 'blue',
    topK: 10,
  },
  list: {
    operationId: 'contract:list',
    principal,
    scope,
    pagination: { limit: 10 },
  },
  get: (memoryId) => ({ operationId: 'contract:get', principal, scope, memoryId }),
  update: (memoryId) => ({
    operationId: 'contract:update',
    principal,
    scope,
    memoryId,
    patch: { canonicalText: 'navy' },
    reason: 'contract',
  }),
  history: (memoryId) => ({
    operationId: 'contract:history',
    principal,
    scope,
    memoryId,
  }),
  delete: (memoryId) => ({
    operationId: 'contract:delete',
    principal,
    scope,
    memoryIds: [memoryId],
    mode: 'hard',
    reason: 'contract',
  }),
  resolveMemoryId: ({ addedIds, searchedIds, listedIds }) =>
    addedIds[0] ?? searchedIds[0] ?? listedIds[0],
};

function response(body: unknown, status = 200): Mem0HttpResponse {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: String(status),
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

function createMem0DialectFetch(dialect: 'oss' | 'platform' | 'memorybank-local'): Mem0HttpFetch {
  let fact = 'blue';
  let deleted = false;
  let metadata: Record<string, unknown> = {
    _hypha_scope_hash: hashMemoryScope(scope),
    _hypha_scope: scope,
    _hypha_operation_id: 'contract:add',
  };
  const item = (): Record<string, unknown> => ({
    id: 'external-memory-1',
    memory: fact,
    metadata,
    score: 0.95,
    created_at: '2026-07-21T00:00:00.000Z',
    updated_at: '2026-07-21T00:00:00.000Z',
  });

  return async (rawUrl, init) => {
    const url = new URL(rawUrl);
    const method = init?.method ?? 'GET';
    const body = init?.body
      ? (JSON.parse(init.body) as Record<string, unknown>)
      : ({} as Record<string, unknown>);
    let path = url.pathname.replace(/^\/hypha-memorybank\/v1/, '');
    path = path.replace(/^\/v[13]/, '').replace(/\/$/, '');

    if (dialect === 'memorybank-local' && path === '/capabilities') {
      const capabilities: Partial<MemoryManagementCapabilities> = {
        add: true,
        search: true,
        get: true,
        list: true,
        update: true,
        delete: true,
        history: true,
      };
      return response(capabilities);
    }
    if (path === '' || path === '/health' || path.startsWith('/events')) {
      return response({ status: 'ok' });
    }

    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (
      method === 'POST' &&
      (path === '/memories/add' || (path === '/memories' && messages.length > 0))
    ) {
      const first = (messages[0] ?? {}) as Record<string, unknown>;
      fact = typeof first.content === 'string' ? first.content : fact;
      metadata =
        body.metadata && typeof body.metadata === 'object'
          ? (body.metadata as Record<string, unknown>)
          : metadata;
      deleted = false;
      return dialect === 'platform'
        ? response({ status: 'PENDING', event_id: 'event-contract-1' })
        : response({ results: [item()] });
    }
    if (method === 'POST' && (path === '/search' || path === '/memories/search')) {
      return response({ results: deleted ? [] : [item()] });
    }
    if (path === '/memories' && (method === 'GET' || method === 'POST')) {
      return response({ results: deleted ? [] : [item()] });
    }
    if (path.endsWith('/history')) {
      return response({ results: deleted ? [] : [item()] });
    }
    if (path.startsWith('/memories/') && method === 'GET') {
      return deleted ? response({ message: 'missing' }, 404) : response(item());
    }
    if (path.startsWith('/memories/') && (method === 'PUT' || method === 'PATCH')) {
      fact = typeof body.text === 'string' ? body.text : fact;
      metadata =
        body.metadata && typeof body.metadata === 'object'
          ? { ...metadata, ...(body.metadata as Record<string, unknown>) }
          : metadata;
      return response({ results: [item()] });
    }
    if (path.startsWith('/memories/') && method === 'DELETE') {
      deleted = true;
      return response({});
    }
    return response({ message: 'unexpected route ' + method + ' ' + path }, 404);
  };
}

function createManagedMemoryBankFetch(): Mem0HttpFetch {
  const parent = 'projects/project/locations/us-central1/reasoningEngines/engine';
  const name = parent + '/memories/external-memory-1';
  let fact = 'blue';
  let deleted = false;
  let memoryScope: Record<string, string> = {
    user_id: 'contract-user',
    workspace_id: 'contract-workspace',
  };
  const item = (): Record<string, unknown> => ({
    name,
    fact,
    scope: memoryScope,
    createTime: '2026-07-21T00:00:00.000Z',
    updateTime: '2026-07-21T00:00:00.000Z',
  });

  return async (rawUrl, init) => {
    const url = new URL(rawUrl);
    const method = init?.method ?? 'GET';
    const body = init?.body
      ? (JSON.parse(init.body) as Record<string, unknown>)
      : ({} as Record<string, unknown>);
    const path = url.pathname.replace(/^\/v1/, '');

    if (path === '/' + parent + '/memories:generate' && method === 'POST') {
      const source = body.directMemoriesSource as
        | { directMemories?: Array<{ fact?: string }> }
        | undefined;
      fact = source?.directMemories?.[0]?.fact ?? fact;
      memoryScope =
        body.scope && typeof body.scope === 'object'
          ? (body.scope as Record<string, string>)
          : memoryScope;
      deleted = false;
      return response({
        name: 'operations/memory-contract',
        done: true,
        response: { generatedMemories: [{ memory: item(), action: 'CREATED' }] },
      });
    }
    if (path === '/' + parent + '/memories:retrieve' && method === 'POST') {
      return response({
        retrievedMemories: deleted ? [] : [{ memory: item(), distance: 0.1 }],
      });
    }
    if (path === '/' + parent + '/memories' && method === 'GET') {
      return response({ memories: deleted ? [] : [item()] });
    }
    if (path === '/' + name + '/revisions' && method === 'GET') {
      return response({
        memoryRevisions: deleted
          ? []
          : [
              {
                name: name + '/revisions/1',
                fact,
                createTime: '2026-07-21T00:00:00.000Z',
              },
            ],
      });
    }
    if (path === '/' + name && method === 'GET') {
      return deleted ? response({ message: 'missing' }, 404) : response(item());
    }
    if (path === '/' + name && method === 'PATCH') {
      fact = typeof body.fact === 'string' ? body.fact : fact;
      return response(item());
    }
    if (path === '/' + name && method === 'DELETE') {
      deleted = true;
      return response({}, 204);
    }
    return response({ message: 'unexpected route ' + method + ' ' + path }, 404);
  };
}

describe('concrete external provider management contract', () => {
  const cases: Array<[string, () => ExternalMemoryClient]> = [
    [
      'Mem0 OSS',
      () =>
        new Mem0OssClient({
          baseUrl: 'http://mem0.test',
          fetch: createMem0DialectFetch('oss'),
        }),
    ],
    [
      'Mem0 Platform v3',
      () =>
        new Mem0PlatformClient({
          apiToken: 'injected-test-token',
          mappingProfile: 'test',
          fetch: createMem0DialectFetch('platform'),
        }),
    ],
    [
      'MemoryBank Local',
      () =>
        new MemoryBankLocalClient({
          baseUrl: 'http://memorybank.test',
          fetch: createMem0DialectFetch('memorybank-local'),
        }),
    ],
    [
      'MemoryBank Managed',
      () =>
        new MemoryBankManagedClient({
          projectId: 'project',
          location: 'us-central1',
          reasoningEngineId: 'engine',
          accessToken: 'injected-test-token',
          mappingProfile: 'test',
          fetch: createManagedMemoryBankFetch(),
        }),
    ],
  ];

  it.each(cases)(
    '%s completes the shared lifecycle without provider branches',
    async (_name, create) => {
      const report = await runExternalProviderAcceptance(create(), fixture, undefined, undefined, {
        settleAdd: async () => undefined,
      });
      expect(report).toMatchObject({
        searchCount: 1,
        listCount: 1,
        updateStatus: 'committed',
        historyCount: 1,
        deleteStatus: 'completed',
        healthStatus: 'healthy',
      });
    }
  );
});
