import { describe, expect, it, vi } from 'vitest';
import {
  ExternalMemoryManagementAdapter,
  MemoryBankLocalClient,
  MemoryBankManagedClient,
  memoryProfileSpecExample,
  type ExternalMemoryClient,
  type Mem0HttpFetch,
  type Mem0HttpResponse,
  type MemoryManagementCapabilities,
  type MemoryPrincipal,
} from './index';

const principal: MemoryPrincipal = {
  principalId: 'user:release-gap',
  type: 'user',
  userId: 'user:release-gap',
  permissionScopes: ['memory:read', 'memory:write'],
};

const scope = { userId: 'user:release-gap', workspaceId: 'workspace:release-gap' };

function response(body: unknown): Mem0HttpResponse {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

function managedClient(fetch: Mem0HttpFetch): MemoryBankManagedClient {
  return new MemoryBankManagedClient({
    projectId: 'project',
    location: 'us-central1',
    reasoningEngineId: 'engine',
    accessToken: 'injected-test-token',
    mappingProfile: 'test',
    fetch,
  });
}

function completeCapabilities(
  overrides: Partial<MemoryManagementCapabilities> = {}
): MemoryManagementCapabilities {
  return {
    add: false,
    search: false,
    get: false,
    list: false,
    update: false,
    delete: false,
    deleteByFilter: false,
    history: false,
    summarize: false,
    consolidate: false,
    decay: false,
    reinforce: false,
    conflictDetection: false,
    hybridSearch: false,
    graphRelations: false,
    asyncWrite: false,
    batchOperations: false,
    ...overrides,
  };
}

describe('external provider release gap baseline', () => {
  it('rejects managed records whose immutable provider scope is missing', async () => {
    const client = managedClient(async () =>
      response({
        retrievedMemories: [
          {
            memory: {
              name: 'projects/project/locations/us-central1/reasoningEngines/engine/memories/1',
              fact: 'scope-less provider record',
            },
          },
        ],
      })
    );

    await expect(
      client.search({
        operationId: 'scope:missing',
        principal,
        scope,
        profileRef: memoryProfileSpecExample,
        query: 'record',
      })
    ).rejects.toMatchObject({ code: 'MEMORY_SCOPE_DENIED' });
  });

  it('rejects a malicious managed result relabelled from another user', async () => {
    const client = managedClient(async () =>
      response({
        retrievedMemories: [
          {
            memory: {
              name: 'projects/project/locations/us-central1/reasoningEngines/engine/memories/2',
              fact: 'another user record',
              scope: { user_id: 'user:attacker', workspace_id: scope.workspaceId },
            },
          },
        ],
      })
    );

    await expect(
      client.search({
        operationId: 'scope:attack',
        principal,
        scope,
        profileRef: memoryProfileSpecExample,
        query: 'record',
      })
    ).rejects.toMatchObject({ code: 'MEMORY_SCOPE_DENIED' });
  });

  it('requires a durable identity mapping store for managed production clients', () => {
    expect(
      () =>
        new MemoryBankManagedClient({
          projectId: 'project',
          location: 'us-central1',
          reasoningEngineId: 'engine',
          accessToken: 'injected-test-token',
          fetch: async () => response({ memories: [] }),
        })
    ).toThrow('durable external identity mapping store');
  });

  it('treats omitted local capabilities as unsupported', async () => {
    const client = new MemoryBankLocalClient({
      baseUrl: 'http://memorybank.local',
      fetch: async () => response({ search: true }),
    });

    await expect(client.capabilities()).resolves.toEqual(completeCapabilities({ search: true }));
  });

  it('quarantines a provider when its negotiated capabilities drift', async () => {
    const snapshots = [
      completeCapabilities({ search: true }),
      completeCapabilities({ search: false }),
    ];
    const client = {
      capabilities: vi.fn(async () => snapshots.shift() ?? snapshots[0]),
      health: async () => ({ status: 'healthy' as const, checkedAt: '2026-07-22T00:00:00.000Z' }),
    } as unknown as ExternalMemoryClient;
    const changes: string[] = [];
    const adapter = new ExternalMemoryManagementAdapter({
      id: 'memory.provider.drifting',
      client,
      onStateChange: (event) => {
        changes.push(event.type);
      },
    });

    await expect(adapter.capabilities()).resolves.toMatchObject({ search: true });
    await expect(adapter.capabilities()).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      details: { quarantined: true },
    });
    expect(changes).toContain('quarantined');
  });

  it('keeps the release fixture tied to a versioned profile', () => {
    expect(memoryProfileSpecExample).toMatchObject({
      id: expect.any(String),
      version: expect.any(String),
    });
  });
});
