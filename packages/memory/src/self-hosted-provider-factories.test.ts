import { describe, expect, it, vi } from 'vitest';
import {
  InMemoryExternalMemoryMappingStore,
  InMemoryExternalProviderOperationStore,
  createMem0OssMemoryProviderFactory,
  memoryManagementProviderSpecExample,
  memoryProfileSpecExample,
  type ExternalMemoryMappingStore,
  type ExternalProviderOperationStore,
  type MemoryManagementProviderFactoryContext,
  type MemoryManagementProviderInstallation,
  type Mem0HttpResponse,
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
  return Object.assign(new InMemoryExternalMemoryMappingStore(), {
    durability: 'durable' as const,
  });
}

function durableOperationStore(): ExternalProviderOperationStore {
  return Object.assign(new InMemoryExternalProviderOperationStore(), {
    durability: 'durable' as const,
  });
}

function context(references: ReadonlyMap<string, unknown>): MemoryManagementProviderFactoryContext {
  return {
    profile: { ...memoryProfileSpecExample, id: 'profile:mem0-oss' },
    spec: {
      ...memoryManagementProviderSpecExample,
      id: 'provider:mem0-oss',
      type: 'mem0',
      deployment: 'self_hosted',
      connectionRef: 'connection:mem0-oss',
      capabilities: {
        add: true,
        search: true,
        get: true,
        list: true,
        update: true,
        delete: true,
        deleteByFilter: true,
        history: true,
        summarize: false,
        consolidate: false,
        decay: false,
        reinforce: false,
        conflictDetection: true,
        hybridSearch: false,
        graphRelations: false,
        asyncWrite: false,
        batchOperations: false,
      },
      config: {
        protocol: 'mem0-oss-rest',
        mappingStoreRef: 'mapping:durable',
        operationStoreRef: 'operation:durable',
        expectedProviderVersion: 'b357a5a1b03c299ec8229c268e63cfac0f7c6566',
      },
    },
    references,
  };
}

function installation(value: unknown): MemoryManagementProviderInstallation {
  if (!value || typeof value !== 'object' || !('provider' in value)) {
    throw new Error('Expected self-hosted provider installation.');
  }
  return value as MemoryManagementProviderInstallation;
}

describe('Mem0 OSS provider factory', () => {
  it('installs a self-hosted client from a resolved connection without leaking auth to config', async () => {
    const fetch = vi.fn(async (_url: string, init?: { headers?: Record<string, string> }) => {
      expect(init?.headers).toMatchObject({ 'X-API-Key': 'local-secret' });
      return response({ status: 'ok' });
    });
    const factory = createMem0OssMemoryProviderFactory();
    const factoryContext = context(
      new Map<string, unknown>([
        [
          'connection:mem0-oss',
          {
            baseUrl: 'http://127.0.0.1:8765',
            apiKey: 'local-secret',
            providerVersion: 'b357a5a1b03c299ec8229c268e63cfac0f7c6566',
            fetch,
          },
        ],
        ['mapping:durable', durableMappingStore()],
        ['operation:durable', durableOperationStore()],
      ])
    );

    expect(factory.supports(factoryContext.spec)).toBe(true);
    const created = installation(await factory.create(factoryContext));
    await expect(created.provider.health()).resolves.toMatchObject({ status: 'healthy' });
    expect(fetch).toHaveBeenCalledWith(
      'http://127.0.0.1:8765/auth/setup-status',
      expect.objectContaining({ method: 'GET' })
    );
    await created.close?.();
  });

  it('fails closed for unresolved connections and non-durable mappings', async () => {
    const factory = createMem0OssMemoryProviderFactory({
      fetch: async () => response({ status: 'ok' }),
    });

    await expect(
      factory.create(context(new Map([['mapping:durable', durableMappingStore()]])))
    ).rejects.toMatchObject({ code: 'MEMORY_PROVIDER_NOT_INSTALLED' });
    await expect(
      factory.create(
        context(
          new Map<string, unknown>([
            ['connection:mem0-oss', 'http://127.0.0.1:8765'],
            ['mapping:durable', new InMemoryExternalMemoryMappingStore()],
          ])
        )
      )
    ).rejects.toMatchObject({ code: 'MEMORY_PROVIDER_NOT_INSTALLED' });
  });
});
