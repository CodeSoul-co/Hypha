import { describe, expect, it } from 'vitest';
import {
  InMemoryExternalMemoryMappingStore,
  Mem0OssClient,
  Mem0RestClient,
  createExternalMemoryId,
  hashMemoryScope,
  memoryProfileSpecExample,
  type Mem0HttpFetch,
  type Mem0HttpResponse,
  type MemoryAddRequest,
  type MemoryPrincipal,
  type ManagedMemoryScope,
} from './index';

const principal: MemoryPrincipal = {
  principalId: 'user:mem0',
  type: 'user',
  userId: 'user:mem0',
  permissionScopes: ['memory:read', 'memory:write'],
};
const scope: ManagedMemoryScope = {
  userId: 'user:mem0',
  workspaceId: 'workspace:mem0',
  runId: 'run:mem0',
};

function addRequest(operationId: string): MemoryAddRequest {
  return {
    operationId,
    principal,
    scope,
    input: 'User prefers blue.',
    inputType: 'text',
    memoryType: 'semantic',
    source: { type: 'user_message', sourceId: 'message:mem0' },
    extractionMode: 'provider',
    writeMode: 'sync',
    profileRef: {
      id: memoryProfileSpecExample.id,
      version: memoryProfileSpecExample.version,
      revision: memoryProfileSpecExample.revision,
    },
  };
}

describe('Mem0 REST client', () => {
  it('exposes a dedicated OSS client while retaining the transitional alias', async () => {
    const requests: string[] = [];
    const fetcher: Mem0HttpFetch = async (url) => {
      requests.push(url);
      return jsonResponse({ status: 'ok' });
    };
    const oss = new Mem0OssClient({ baseUrl: 'http://127.0.0.1:8888', fetch: fetcher });
    const legacy = new Mem0RestClient({ baseUrl: 'http://127.0.0.1:8888', fetch: fetcher });

    await expect(oss.health()).resolves.toMatchObject({
      status: 'healthy',
      details: { deployment: 'self_hosted', protocol: 'mem0-oss-rest' },
    });
    expect(requests[0]).toBe('http://127.0.0.1:8888/auth/setup-status');
    await expect(legacy.health()).resolves.toMatchObject({ status: 'healthy' });
  });

  it('preserves Hypha scope metadata and rejects foreign search results', async () => {
    const requests: Array<{ url: string; headers: Record<string, string>; body?: unknown }> = [];
    let storedMetadata: Record<string, unknown> = {};
    const fetcher: Mem0HttpFetch = async (url, init) => {
      const body = init?.body ? (JSON.parse(init.body) as Record<string, unknown>) : undefined;
      requests.push({ url, headers: init?.headers ?? {}, body });
      if (url.endsWith('/memories') && init?.method === 'POST') {
        storedMetadata = (body?.metadata as Record<string, unknown>) ?? {};
        return jsonResponse({
          results: [
            {
              id: 'mem0:1',
              memory: 'User prefers blue.',
              metadata: storedMetadata,
              created_at: '2026-07-17T00:00:00.000Z',
            },
          ],
        });
      }
      if (url.endsWith('/search')) {
        return jsonResponse({
          results: [
            { id: 'mem0:1', memory: 'User prefers blue.', metadata: storedMetadata, score: 0.9 },
            {
              id: 'mem0:foreign',
              memory: 'Foreign memory.',
              metadata: { _hypha_scope_hash: 'foreign' },
              score: 1,
            },
          ],
        });
      }
      if (url.endsWith('/memories/mem0%3A1')) {
        return jsonResponse({
          id: 'mem0:1',
          memory: 'User prefers blue.',
          metadata: storedMetadata,
          created_at: '2026-07-17T00:00:00.000Z',
        });
      }
      if (url.endsWith('/health')) return jsonResponse({ status: 'ok' });
      return jsonResponse({ message: 'not found' }, 404);
    };
    const client = new Mem0RestClient({
      baseUrl: 'http://127.0.0.1:8888/',
      apiKey: 'test-api-key',
      healthPath: '/health',
      fetch: fetcher,
      now: () => new Date('2026-07-17T00:00:00.000Z'),
    });

    const write = await client.add(addRequest('operation:mem0:add'));
    const memoryId = createExternalMemoryId('memory.provider.mem0.rest', 'mem0:1');
    expect(write).toMatchObject({ status: 'committed', records: [{ id: memoryId }] });
    expect(storedMetadata._hypha_scope_hash).toBe(hashMemoryScope(scope));
    expect(storedMetadata._hypha_scope).toEqual(scope);
    expect(requests[0]?.headers['X-API-Key']).toBe('test-api-key');
    const requestCountBeforeForbiddenGet = requests.length;
    await expect(
      client.get({
        operationId: 'operation:mem0:get:forbidden',
        principal,
        scope: { ...scope, workspaceId: 'workspace:foreign' },
        memoryId,
      })
    ).rejects.toMatchObject({ code: 'MEMORY_SCOPE_DENIED' });
    expect(requests).toHaveLength(requestCountBeforeForbiddenGet);

    const results = await client.search({
      operationId: 'operation:mem0:search',
      principal,
      scope,
      profileRef: {
        id: memoryProfileSpecExample.id,
        version: memoryProfileSpecExample.version,
        revision: memoryProfileSpecExample.revision,
      },
      query: 'blue',
      topK: 5,
    });
    expect(results.map((result) => result.record.id)).toEqual([memoryId]);
    expect(requests.find((request) => request.url.endsWith('/search'))?.body).toMatchObject({
      query: 'blue',
      filters: {
        user_id: 'user:mem0',
        app_id: 'workspace:mem0',
        run_id: 'run:mem0',
      },
      top_k: 5,
    });
    await expect(
      client.get({
        operationId: 'operation:mem0:get',
        principal,
        scope,
        memoryId,
      })
    ).resolves.toMatchObject({ id: memoryId });
    expect(requests.some((request) => request.url.endsWith('/memories/mem0%3A1'))).toBe(true);
    await expect(client.health()).resolves.toMatchObject({ status: 'healthy' });
  });

  it('allows loopback HTTP but rejects credential-bearing cleartext remote endpoints', () => {
    const fetcher: Mem0HttpFetch = async () => jsonResponse({});
    expect(
      () =>
        new Mem0OssClient({
          baseUrl: 'http://mem0.example',
          apiKey: 'must-not-leak',
          fetch: fetcher,
        })
    ).toThrow('requires HTTPS outside loopback');
    expect(
      () =>
        new Mem0OssClient({
          baseUrl: 'http://127.12.0.1:8888',
          apiKey: 'local-key',
          fetch: fetcher,
        })
    ).not.toThrow();
  });

  it('normalizes provider timestamps before storing durable mappings', async () => {
    const scopeHash = hashMemoryScope(scope);
    const mappingStore = new InMemoryExternalMemoryMappingStore();
    const client = new Mem0OssClient({
      baseUrl: 'http://127.0.0.1:8888',
      mappingStore,
      now: () => new Date('2026-07-18T00:00:00.000Z'),
      fetch: async () =>
        jsonResponse({
          results: [
            {
              id: 'offset',
              memory: 'offset timestamp',
              metadata: { _hypha_scope_hash: scopeHash },
              created_at: '2026-07-17T08:00:00.123456+08:00',
              updated_at: 'not-a-date',
            },
            {
              id: 'timezone-less',
              memory: 'timezone-less timestamp',
              metadata: { _hypha_scope_hash: scopeHash },
              created_at: '2026-07-17 00:00:00.654321',
            },
            {
              id: 'invalid',
              memory: 'invalid timestamp',
              metadata: { _hypha_scope_hash: scopeHash },
              created_at: 'invalid',
            },
          ],
        }),
    });

    const result = await client.list({
      operationId: 'operation:mem0:list:timestamps',
      principal,
      scope,
    });

    expect(
      result.records.map(({ createdAt, updatedAt, provenance }) => ({
        createdAt,
        updatedAt,
        provenanceCreatedAt: provenance.createdAt,
      }))
    ).toEqual([
      {
        createdAt: '2026-07-17T00:00:00.123Z',
        updatedAt: '2026-07-17T00:00:00.123Z',
        provenanceCreatedAt: '2026-07-17T00:00:00.123Z',
      },
      {
        createdAt: '2026-07-17T00:00:00.654Z',
        updatedAt: '2026-07-17T00:00:00.654Z',
        provenanceCreatedAt: '2026-07-17T00:00:00.654Z',
      },
      {
        createdAt: '2026-07-18T00:00:00.000Z',
        updatedAt: '2026-07-18T00:00:00.000Z',
        provenanceCreatedAt: '2026-07-18T00:00:00.000Z',
      },
    ]);
    await expect(mappingStore.list('memory.provider.mem0.rest')).resolves.toHaveLength(3);
  });

  it('verifies an empty Mem0 update response by reading the updated record back', async () => {
    const mappingStore = new InMemoryExternalMemoryMappingStore();
    const memoryId = createExternalMemoryId('memory.provider.mem0.rest', 'mem0:update');
    await mappingStore.set({
      memoryId,
      providerId: 'memory.provider.mem0.rest',
      externalId: 'mem0:update',
      binding: {
        scopeHash: hashMemoryScope(scope),
        recordRevision: 1,
        provenance: {
          createdBy: 'mem0-test',
          providerId: 'memory.provider.mem0.rest',
          createdAt: '2026-07-17T00:00:00.000Z',
        },
      },
      lastSyncedAt: '2026-07-17T00:00:00.000Z',
      syncState: 'synced',
    });
    const client = new Mem0OssClient({
      baseUrl: 'http://127.0.0.1:8888',
      mappingStore,
      fetch: async (_url, init) =>
        init?.method === 'PUT'
          ? jsonResponse({})
          : jsonResponse({
              id: 'mem0:update',
              memory: 'User prefers green.',
              metadata: {
                _hypha_scope_hash: hashMemoryScope(scope),
                _hypha_revision: 2,
              },
              updated_at: '2026-07-18T00:00:00.000Z',
            }),
    });

    await expect(
      client.update({
        operationId: 'operation:mem0:update',
        principal,
        scope,
        memoryId,
        expectedRevision: 1,
        patch: { canonicalText: 'User prefers green.' },
        reason: 'test',
      })
    ).resolves.toMatchObject({
      status: 'committed',
      records: [{ canonicalText: 'User prefers green.' }],
    });
  });
  it('normalizes authorization and transient provider failures without leaking credentials', async () => {
    const memoryId = createExternalMemoryId('memory.provider.mem0.rest', 'mem0:1');
    const forbiddenMappings = new InMemoryExternalMemoryMappingStore();
    await forbiddenMappings.set({
      memoryId,
      providerId: 'memory.provider.mem0.rest',
      externalId: 'mem0:1',
      binding: {
        scopeHash: hashMemoryScope(scope),
        profileRef: {
          id: memoryProfileSpecExample.id,
          version: memoryProfileSpecExample.version,
          revision: memoryProfileSpecExample.revision,
        },
        recordRevision: 1,
        provenance: {
          createdBy: 'mem0-test',
          providerId: 'memory.provider.mem0.rest',
          createdAt: '2026-07-17T00:00:00.000Z',
        },
      },
      lastSyncedAt: '2026-07-17T00:00:00.000Z',
      syncState: 'synced',
    });
    const forbidden = new Mem0RestClient({
      baseUrl: 'http://127.0.0.1:8888',
      apiKey: 'do-not-leak',
      mappingStore: forbiddenMappings,
      fetch: async () => jsonResponse({ message: 'forbidden' }, 403),
    });
    await expect(
      forbidden.get({
        operationId: 'operation:mem0:forbidden',
        principal,
        scope,
        memoryId,
      })
    ).rejects.toMatchObject({ code: 'MEMORY_PERMISSION_DENIED', retryable: false });

    const unavailableMappings = new InMemoryExternalMemoryMappingStore();
    await unavailableMappings.set({
      memoryId,
      providerId: 'memory.provider.mem0.rest',
      externalId: 'mem0:1',
      binding: {
        scopeHash: hashMemoryScope(scope),
        profileRef: {
          id: memoryProfileSpecExample.id,
          version: memoryProfileSpecExample.version,
          revision: memoryProfileSpecExample.revision,
        },
        recordRevision: 1,
        provenance: {
          createdBy: 'mem0-test',
          providerId: 'memory.provider.mem0.rest',
          createdAt: '2026-07-17T00:00:00.000Z',
        },
      },
      lastSyncedAt: '2026-07-17T00:00:00.000Z',
      syncState: 'synced',
    });
    const unavailable = new Mem0RestClient({
      baseUrl: 'http://127.0.0.1:8888',
      mappingStore: unavailableMappings,
      fetch: async () => jsonResponse({ message: 'unavailable' }, 503),
    });
    await expect(
      unavailable.get({
        operationId: 'operation:mem0:unavailable',
        principal,
        scope,
        memoryId,
      })
    ).rejects.toMatchObject({ code: 'MEMORY_PROVIDER_UNAVAILABLE', retryable: true });
  });
  it('uses protected provider cursors and rejects invalid JSON', async () => {
    const metadata = { _hypha_scope_hash: hashMemoryScope(scope) };
    const paging = new Mem0OssClient({
      baseUrl: 'http://127.0.0.1:8888',
      fetch: async (url) => {
        const topK = Number(new URL(url).searchParams.get('top_k'));
        const memories = [
          { id: '1', memory: 'one', metadata },
          { id: '2', memory: 'two', metadata },
          { id: '3', memory: 'three', metadata },
        ];
        return jsonResponse({ memories: memories.slice(0, topK) });
      },
    });
    const first = await paging.list({
      operationId: 'list-1',
      principal,
      scope,
      pagination: { limit: 2 },
    });
    expect(first.hasMore).toBe(true);
    expect(first.nextCursor).toMatch(/^hypha-provider-cursor:v1:/u);
    const second = await paging.list({
      operationId: 'list-2',
      principal,
      scope,
      pagination: { limit: 2, cursor: first.nextCursor },
    });
    expect(second.records.map((record) => record.canonicalText)).toEqual(['three']);
    expect(second.hasMore).toBe(false);

    const invalid = new Mem0OssClient({
      baseUrl: 'http://127.0.0.1:8888',
      fetch: async () => ({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => {
          throw new SyntaxError('bad json');
        },
        text: async () => 'not-json',
      }),
    });
    await expect(invalid.list({ operationId: 'bad-json', principal, scope })).rejects.toMatchObject(
      { code: 'MEMORY_PROVIDER_UNAVAILABLE', details: { schemaDrift: true } }
    );
  });
  it('normalizes a pre-aborted request without calling Mem0', async () => {
    let called = false;
    const client = new Mem0OssClient({
      baseUrl: 'http://127.0.0.1:8888',
      fetch: async () => {
        called = true;
        return jsonResponse({ memories: [] });
      },
    });
    const controller = new AbortController();
    controller.abort(new Error('deadline exceeded'));

    await expect(
      client.search({ ...addRequest('cancelled'), query: 'blue' }, controller.signal)
    ).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      retryable: false,
      details: { cancelled: true },
    });
    expect(called).toBe(false);
  });
  it('cancels in-flight requests when closed', async () => {
    let aborted = false;
    const client = new Mem0OssClient({
      baseUrl: 'http://127.0.0.1:8888',
      fetch: async (_url, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener(
            'abort',
            () => {
              aborted = true;
              reject(init.signal?.reason);
            },
            { once: true }
          );
        }),
    });
    const pending = client.list({ operationId: 'close', principal, scope });
    await client.close();
    await expect(pending).rejects.toBeTruthy();
    expect(aborted).toBe(true);
  });
});

function jsonResponse(body: unknown, status = 200): Mem0HttpResponse {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}
