import { describe, expect, it, vi } from 'vitest';
import {
  ExternalMemoryManagementAdapter,
  MemoryBankMemoryManagementAdapter,
  NativeMemoryManagementProvider,
  memoryProfileSpecExample,
  type ExternalMemoryClient,
  type MemoryAddRequest,
  type MemoryPrincipal,
  type ManagedMemoryScope,
} from './index';

const principal: MemoryPrincipal = {
  principalId: 'user:external',
  type: 'user',
  userId: 'user:external',
  permissionScopes: ['memory:read', 'memory:write'],
};
const scope: ManagedMemoryScope = {
  userId: 'user:external',
  workspaceId: 'workspace:external',
  runId: 'run:external',
};

function addRequest(operationId: string, input: unknown): MemoryAddRequest {
  return {
    operationId,
    principal,
    scope,
    input,
    inputType: 'text',
    memoryType: 'semantic',
    source: { type: 'user_message', sourceId: operationId },
    extractionMode: 'none',
    writeMode: 'sync',
    profileRef: {
      id: memoryProfileSpecExample.id,
      version: memoryProfileSpecExample.version,
      revision: memoryProfileSpecExample.revision,
    },
  };
}

function unavailableClient(overrides: Partial<ExternalMemoryClient> = {}): ExternalMemoryClient {
  const unavailable = async (): Promise<never> => {
    throw new Error('external unavailable');
  };
  return {
    capabilities: async () => ({ add: true, search: true, get: true, list: true, delete: true }),
    add: unavailable,
    search: unavailable,
    get: unavailable,
    list: unavailable,
    delete: unavailable,
    health: async () => ({
      status: 'unhealthy',
      checkedAt: '2026-07-17T00:00:00.000Z',
    }),
    ...overrides,
  };
}

describe('external memory management adapters', () => {
  it('falls back for read failures and exposes circuit state transitions', async () => {
    const fallback = new NativeMemoryManagementProvider({
      profile: memoryProfileSpecExample,
      now: () => '2026-07-17T00:00:00.000Z',
    });
    await fallback.add(addRequest('operation:fallback:seed', 'fallback memory'));
    const changes: string[] = [];
    const adapter = new ExternalMemoryManagementAdapter({
      id: 'memory.provider.external',
      client: unavailableClient(),
      fallback,
      fallbackPolicy: memoryProfileSpecExample.fallbackPolicy,
      retryAttempts: 2,
      circuitBreaker: { failureThreshold: 1, resetAfterMs: 60_000 },
      now: () => new Date('2026-07-17T00:00:00.000Z'),
      onStateChange: (event) => {
        changes.push(event.type);
      },
    });

    const results = await adapter.search({
      operationId: 'operation:fallback:search',
      principal,
      scope,
      profileRef: memoryProfileSpecExample,
      query: 'fallback',
    });

    expect(results).toHaveLength(1);
    expect(changes).toEqual(['degraded', 'circuit_opened']);
    await expect(adapter.health()).resolves.toMatchObject({ status: 'degraded' });
  });

  it('does not retry or fall back after an external write may have started', async () => {
    const fallback = new NativeMemoryManagementProvider({ profile: memoryProfileSpecExample });
    const fallbackAdd = vi.spyOn(fallback, 'add');
    let primaryCalls = 0;
    const adapter = new ExternalMemoryManagementAdapter({
      id: 'memory.provider.external',
      client: unavailableClient({
        add: async () => {
          primaryCalls += 1;
          throw new Error('connection lost after write started');
        },
      }),
      fallback,
      fallbackPolicy: memoryProfileSpecExample.fallbackPolicy,
      retryAttempts: 3,
      circuitBreaker: { failureThreshold: 10, resetAfterMs: 60_000 },
    });

    await expect(
      adapter.add(addRequest('operation:unsafe-write', 'do not duplicate'))
    ).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
    });
    expect(primaryCalls).toBe(1);
    expect(fallbackAdd).not.toHaveBeenCalled();
  });

  it('retains provider-specific MemoryBank policy behind the common contract', () => {
    const adapter = new MemoryBankMemoryManagementAdapter({
      client: unavailableClient(),
      policy: {
        importanceThreshold: 0.5,
        decayFunction: 'exponential',
        preserveOriginals: true,
      },
    });

    expect(adapter.policy).toEqual({
      importanceThreshold: 0.5,
      decayFunction: 'exponential',
      preserveOriginals: true,
    });
  });
});
