import { describe, expect, it } from 'vitest';
import {
  Mem0PlatformClient,
  InMemoryExternalProviderOperationStore,
  hashMemoryScope,
  sha256,
  memoryProfileSpecExample,
  type Mem0HttpFetch,
  type Mem0HttpResponse,
  type MemoryPrincipal,
  type ManagedMemoryScope,
} from './index';

const principal: MemoryPrincipal = {
  principalId: 'platform-user',
  type: 'user',
  userId: 'platform-user',
  permissionScopes: ['memory:read', 'memory:write'],
};
const scope: ManagedMemoryScope = { userId: 'platform-user', workspaceId: 'platform-app' };

function json(body: unknown, status = 200): Mem0HttpResponse {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: String(status),
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

describe('Mem0PlatformClient', () => {
  it('uses v3 add with Token auth and returns an asynchronous receipt', async () => {
    const calls: Array<{ url: string; method?: string; headers?: Record<string, string> }> = [];
    const fetcher: Mem0HttpFetch = async (url, init) => {
      calls.push({ url, method: init?.method, headers: init?.headers });
      return json({ status: 'PENDING', event_id: 'event-1' });
    };
    const client = new Mem0PlatformClient({
      apiToken: 'secret-ref-value',
      mappingProfile: 'test',
      fetch: fetcher,
    });
    const result = await client.add({
      operationId: 'op-1',
      principal,
      scope,
      input: 'Remember blue',
      source: {
        type: 'user_message',
        sourceId: 'message-1',
      },
      profileRef: memoryProfileSpecExample,
    });
    expect(result).toMatchObject({ status: 'queued', events: ['event-1'] });
    expect(calls[0]).toMatchObject({
      url: 'https://api.mem0.ai/v3/memories/add/',
      method: 'POST',
      headers: { Authorization: 'Token secret-ref-value' },
    });
  });

  it('keeps v3 pagination in query parameters and filters in the body', async () => {
    const requests: Array<{ url: string; body: unknown }> = [];
    const fetcher: Mem0HttpFetch = async (url, init) => {
      const page = new URL(url).searchParams.get('page');
      requests.push({ url, body: JSON.parse(init?.body ?? '{}') as unknown });
      return json({
        count: 2,
        next: page === '1' ? 'https://api.mem0.ai/v3/memories/?page=2&page_size=1' : null,
        previous: null,
        results: [],
      });
    };
    const client = new Mem0PlatformClient({
      apiToken: 'token',
      mappingProfile: 'test',
      fetch: fetcher,
    });
    const first = await client.list({
      operationId: 'op-list-1',
      principal,
      scope,
      pagination: { limit: 1 },
    });
    expect(first.hasMore).toBe(true);
    expect(first.nextCursor).toBeTruthy();
    const second = await client.list({
      operationId: 'op-list-2',
      principal,
      scope,
      pagination: { limit: 1, cursor: first.nextCursor },
    });
    expect(second.hasMore).toBe(false);
    expect(requests).toEqual([
      {
        url: 'https://api.mem0.ai/v3/memories/?page=1&page_size=1',
        body: { filters: { user_id: 'platform-user', app_id: 'platform-app' } },
      },
      {
        url: 'https://api.mem0.ai/v3/memories/?page=2&page_size=1',
        body: { filters: { user_id: 'platform-user', app_id: 'platform-app' } },
      },
    ]);
  });

  it('maps v3 search entity ids inside filters and normalizes rate limits', async () => {
    let body: Record<string, unknown> = {};
    const fetcher: Mem0HttpFetch = async (_url, init) => {
      body = JSON.parse(init?.body ?? '{}') as Record<string, unknown>;
      return json([], 429);
    };
    const client = new Mem0PlatformClient({
      apiToken: 'token',
      mappingProfile: 'test',
      fetch: fetcher,
    });
    await expect(
      client.search({
        operationId: 'op-search',
        principal,
        scope,
        profileRef: memoryProfileSpecExample,
        query: 'blue',
        topK: 7,
      })
    ).rejects.toMatchObject({ code: 'MEMORY_PROVIDER_UNAVAILABLE', retryable: true });
    expect(body).toMatchObject({ filters: { user_id: 'platform-user' }, top_k: 7 });
  });

  it('rejects cleartext custom endpoints before attaching a platform token', () => {
    expect(
      () =>
        new Mem0PlatformClient({
          baseUrl: 'http://platform.example',
          apiToken: 'must-not-leak',
          mappingProfile: 'test',
          fetch: async () => json({}),
        })
    ).toThrow('requires HTTPS');
  });
  it('fails closed on Platform version and capability drift', () => {
    const create = (overrides: Record<string, unknown>) =>
      new Mem0PlatformClient({
        apiToken: 'token',
        mappingProfile: 'test',
        fetch: async () => json({}),
        ...overrides,
      });

    expect(() => create({ providerVersion: 'v2', expectedProviderVersion: 'v3' })).toThrow(
      'version mismatch'
    );
    expect(() => create({ expectedCapabilities: { search: false } })).toThrow('capability drift');
  });

  it('rotates a rejected token without leaking either credential', async () => {
    const tokens = ['rejected-secret-token', 'accepted-secret-token'];
    let acquireCount = 0;
    const authorizations: string[] = [];
    const client = new Mem0PlatformClient({
      credentialProvider: {
        acquire: async () => ({
          token: tokens[Math.min(acquireCount++, tokens.length - 1)],
          tokenType: 'api_token',
        }),
      },
      mappingProfile: 'test',
      fetch: async (_url, init) => {
        authorizations.push(init?.headers?.Authorization ?? '');
        return authorizations.length === 1 ? json({}, 401) : json({ results: [] });
      },
    });
    const request = {
      operationId: 'op-rotate',
      principal,
      scope,
      profileRef: memoryProfileSpecExample,
      query: 'blue',
      topK: 5,
    };
    let rejection: unknown;
    try {
      await client.search(request);
    } catch (error) {
      rejection = error;
    }
    expect(rejection).toMatchObject({ code: 'MEMORY_PERMISSION_DENIED' });
    expect(String(rejection)).not.toContain(tokens[0]);
    await expect(client.search({ ...request, operationId: 'op-rotate-2' })).resolves.toEqual([]);
    expect(authorizations).toEqual(tokens.map((token) => 'Token ' + token));
    await client.close();
  });

  it('preserves Retry-After for 429 and normalizes 5xx as retryable', async () => {
    const responses: Mem0HttpResponse[] = [
      {
        ...json({}, 429),
        headers: { get: (name) => (name.toLowerCase() === 'retry-after' ? '7' : null) },
      },
      json({}, 503),
    ];
    const client = new Mem0PlatformClient({
      apiToken: 'token',
      mappingProfile: 'test',
      fetch: async () => responses.shift()!,
    });
    const request = {
      operationId: 'op-rate-limit',
      principal,
      scope,
      profileRef: memoryProfileSpecExample,
      query: 'blue',
    };
    await expect(client.search(request)).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      retryable: true,
      details: { status: 429, retryAfterMs: 7000 },
    });
    await expect(
      client.search({ ...request, operationId: 'op-service-error' })
    ).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      retryable: true,
      details: { status: 503 },
    });
    await client.close();
  });

  it('binds async event, request and operation identities in the durable journal', async () => {
    const operationStore = new InMemoryExternalProviderOperationStore();
    const request = {
      operationId: 'op-identity',
      principal,
      scope,
      profileRef: memoryProfileSpecExample,
      input: 'Remember blue',
      source: { type: 'user_message' as const, sourceId: 'message-identity' },
    };
    let call = 0;
    const client = new Mem0PlatformClient({
      apiToken: 'token',
      mappingProfile: 'test',
      operationStore,
      fetch: async () =>
        call++ === 0
          ? json({ status: 'PENDING', event_id: 'event-identity' })
          : json({ id: 'event-other', status: 'SUCCEEDED' }),
    });
    await expect(client.add(request)).resolves.toMatchObject({ status: 'queued' });
    const operation = await operationStore.get(
      'memory.provider.mem0.platform.v3',
      request.operationId
    );
    const requestHash = sha256(request);
    expect(operation).toMatchObject({
      providerId: 'memory.provider.mem0.platform.v3',
      externalOperationId: 'event-identity',
      scopeHash: hashMemoryScope(scope),
      metadata: {
        requestHash,
        operationHash: sha256({
          providerId: 'memory.provider.mem0.platform.v3',
          operationId: request.operationId,
          scopeHash: hashMemoryScope(scope),
          requestHash,
        }),
      },
    });
    await expect(client.resumeEvent(request.operationId)).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
    });
    await expect(
      operationStore.get('memory.provider.mem0.platform.v3', request.operationId)
    ).resolves.toMatchObject({ state: 'running', attempts: 1 });
    await client.close();
  });

  it('quarantines unknown writes and reaches cancel/timeout terminal states without replay', async () => {
    const unknownStore = new InMemoryExternalProviderOperationStore();
    const timeout = new Error('lost write response');
    timeout.name = 'TimeoutError';
    const request = {
      operationId: 'op-unknown',
      principal,
      scope,
      profileRef: memoryProfileSpecExample,
      input: 'Remember blue',
      source: { type: 'user_message' as const, sourceId: 'message-unknown' },
    };
    const unknown = new Mem0PlatformClient({
      apiToken: 'token',
      mappingProfile: 'test',
      operationStore: unknownStore,
      fetch: async () => {
        throw timeout;
      },
    });
    await expect(unknown.add(request)).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      details: { quarantined: true },
    });
    await expect(
      unknownStore.get('memory.provider.mem0.platform.v3', request.operationId)
    ).resolves.toMatchObject({ kind: 'unknown_write', state: 'reconcile_required' });
    await unknown.close();

    let now = new Date('2026-07-27T00:00:00.000Z');
    const terminalStore = new InMemoryExternalProviderOperationStore();
    const terminal = new Mem0PlatformClient({
      apiToken: 'token',
      mappingProfile: 'test',
      operationStore: terminalStore,
      operationDeadlineMs: 1,
      now: () => now,
      fetch: async () => json({ status: 'PENDING', event_id: 'event-terminal' }),
    });
    const terminalRequest = { ...request, operationId: 'op-terminal' };
    await terminal.add(terminalRequest);
    const pending = await terminalStore.get(
      'memory.provider.mem0.platform.v3',
      terminalRequest.operationId
    );
    await terminalStore.set({
      ...pending!,
      cancellationRequestedAt: now.toISOString(),
    });
    await expect(terminal.resumeEvent(terminalRequest.operationId)).resolves.toBeNull();
    await expect(
      terminalStore.get('memory.provider.mem0.platform.v3', terminalRequest.operationId)
    ).resolves.toMatchObject({ state: 'cancelled' });

    const deadlineRequest = { ...request, operationId: 'op-deadline' };
    await terminal.add(deadlineRequest);
    now = new Date('2026-07-27T00:00:01.000Z');
    await expect(terminal.resumeEvent(deadlineRequest.operationId)).resolves.toBeNull();
    await expect(
      terminalStore.get('memory.provider.mem0.platform.v3', deadlineRequest.operationId)
    ).resolves.toMatchObject({ state: 'dead_letter' });
    await terminal.close();
  });
});
