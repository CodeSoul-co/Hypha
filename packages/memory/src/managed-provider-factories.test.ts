import { describe, expect, it, vi } from 'vitest';
import {
  InMemoryExternalProviderOperationStore,
  InMemoryExternalMemoryMappingStore,
  createMem0PlatformMemoryProviderFactory,
  createMemoryBankManagedProviderFactory,
  memoryManagementProviderSpecExample,
  memoryProfileSpecExample,
  type ExternalMemoryMappingStore,
  type ExternalProviderOperationStore,
  type MemoryManagementProviderFactoryContext,
  type MemoryManagementProviderInstallation,
  type Mem0HttpResponse,
  type RenewableCredentialProvider,
} from './index';

function response(body: unknown): Mem0HttpResponse {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

function durableMappingStore(): ExternalMemoryMappingStore {
  const store = new InMemoryExternalMemoryMappingStore();
  return Object.assign(store, { durability: 'durable' as const });
}

function durableOperationStore(): ExternalProviderOperationStore {
  const store = new InMemoryExternalProviderOperationStore();
  return Object.assign(store, { durability: 'durable' as const });
}

function installation(value: unknown): MemoryManagementProviderInstallation {
  if (!value || typeof value !== 'object' || !('provider' in value)) {
    throw new Error('Expected managed provider installation.');
  }
  return value as MemoryManagementProviderInstallation;
}

function context(
  type: 'mem0' | 'memorybank',
  config: Record<string, unknown>,
  references: ReadonlyMap<string, unknown>
): MemoryManagementProviderFactoryContext {
  return {
    profile: { ...memoryProfileSpecExample, id: `profile:${type}` },
    spec: {
      ...memoryManagementProviderSpecExample,
      id: `provider:${type}`,
      type,
      deployment: 'managed',
      config,
    },
    references,
  };
}

describe('managed external provider factories', () => {
  it('injects a renewable credential provider into Mem0 Platform', async () => {
    const acquire = vi.fn(async () => ({
      token: 'rotating-mem0-token',
      tokenType: 'api_token' as const,
    }));
    const credentialProvider: RenewableCredentialProvider = { acquire };
    const mappingStore = durableMappingStore();
    const operationStore = durableOperationStore();
    const fetch = vi.fn(async () => response({}));
    const factory = createMem0PlatformMemoryProviderFactory({ fetch });
    const specContext = context(
      'mem0',
      {
        protocol: 'mem0-platform-v3',
        baseUrl: 'https://api.mem0.test',
        credentialRef: 'credential:mem0-test',
        mappingStoreRef: 'mapping:durable',
        operationStoreRef: 'operation:durable',
      },
      new Map<string, unknown>([
        ['credential:mem0-test', credentialProvider],
        ['mapping:durable', mappingStore],
        ['operation:durable', operationStore],
      ])
    );

    expect(factory.supports(specContext.spec)).toBe(true);
    const created = installation(await factory.create(specContext));
    await expect(created.provider.health()).resolves.toMatchObject({ status: 'healthy' });
    expect(acquire).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Token rotating-mem0-token' }),
      })
    );
    await created.provider.close?.();
  });

  it('injects renewable OAuth and resolved environment identity into Vertex Memory Bank', async () => {
    const acquire = vi.fn(async () => ({
      token: 'rotating-vertex-token',
      tokenType: 'oauth_bearer' as const,
    }));
    const credentialProvider: RenewableCredentialProvider = { acquire };
    const mappingStore = durableMappingStore();
    const operationStore = durableOperationStore();
    const fetch = vi.fn(async () => response({ memories: [] }));
    const factory = createMemoryBankManagedProviderFactory({ fetch });
    const specContext = context(
      'memorybank',
      {
        protocol: 'vertex-ai-agent-engine-memory-bank',
        projectIdEnv: 'HYPHA_MEMORYBANK_PROJECT',
        locationEnv: 'HYPHA_MEMORYBANK_LOCATION',
        reasoningEngineIdEnv: 'HYPHA_MEMORYBANK_ENGINE',
        credentialRef: 'credential:vertex-test',
        mappingStoreRef: 'mapping:durable',
        operationStoreRef: 'operation:durable',
      },
      new Map<string, unknown>([
        ['HYPHA_MEMORYBANK_PROJECT', 'project-test'],
        ['HYPHA_MEMORYBANK_LOCATION', 'us-central1'],
        ['HYPHA_MEMORYBANK_ENGINE', 'engine-test'],
        ['credential:vertex-test', credentialProvider],
        ['mapping:durable', mappingStore],
        ['operation:durable', operationStore],
      ])
    );

    expect(factory.supports(specContext.spec)).toBe(true);
    const created = installation(await factory.create(specContext));
    await expect(created.provider.health()).resolves.toMatchObject({ status: 'healthy' });
    expect(acquire).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        'projects/project-test/locations/us-central1/reasoningEngines/engine-test'
      ),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer rotating-vertex-token' }),
      })
    );
    await created.provider.close?.();
  });

  it('fails closed when a credential reference is unresolved', async () => {
    const factory = createMem0PlatformMemoryProviderFactory({ fetch: async () => response({}) });
    const specContext = context(
      'mem0',
      {
        protocol: 'mem0-platform-v3',
        credentialRef: 'credential:missing',
        mappingStoreRef: 'mapping:durable',
        operationStoreRef: 'operation:durable',
      },
      new Map<string, unknown>([
        ['mapping:durable', durableMappingStore()],
        ['operation:durable', durableOperationStore()],
      ])
    );

    await expect(factory.create(specContext)).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_NOT_INSTALLED',
    });
  });
});
