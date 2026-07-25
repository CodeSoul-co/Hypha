import type { RenewableCredentialProvider, StructuredStoreProvider } from '@hypha/memory';
import {
  createRotatingEnvironmentCredentialProvider,
  createServerMemoryReferenceResolver,
} from './ServerMemoryReferences';

const structuredStore = {} as StructuredStoreProvider;

describe('Server Memory managed credential references', () => {
  it('re-reads rotating environment credentials without persisting tokens', async () => {
    const environment: NodeJS.ProcessEnv = { HYPHA_MEM0_PLATFORM_TOKEN: 'token:first' };
    let now = new Date('2026-07-24T00:00:00.000Z');
    const provider = createRotatingEnvironmentCredentialProvider({
      environmentName: 'HYPHA_MEM0_PLATFORM_TOKEN',
      tokenType: 'api_token',
      environment,
      leaseMs: 120_000,
      now: () => now,
    });

    await expect(provider.acquire()).resolves.toEqual({
      token: 'token:first',
      tokenType: 'api_token',
      expiresAt: '2026-07-24T00:02:00.000Z',
    });
    environment.HYPHA_MEM0_PLATFORM_TOKEN = 'token:second';
    now = new Date('2026-07-24T00:02:00.000Z');
    await expect(provider.acquire()).resolves.toMatchObject({ token: 'token:second' });
    await provider.close?.();
    await expect(provider.acquire()).rejects.toMatchObject({ code: 'MEMORY_PERMISSION_DENIED' });
  });

  it('resolves managed identity, durable stores and renewable credentials by reference', async () => {
    const environment: NodeJS.ProcessEnv = {
      HYPHA_MEMORYBANK_PROJECT: 'project-test',
      HYPHA_MEMORYBANK_ACCESS_TOKEN: 'vertex-token',
    };
    const resolver = createServerMemoryReferenceResolver({ structuredStore, environment });

    await expect(resolver.resolve('HYPHA_MEMORYBANK_PROJECT', 'environment')).resolves.toBe(
      'project-test'
    );
    await expect(resolver.resolve('memory.mapping.durable', 'dependency')).resolves.toMatchObject({
      durability: 'durable',
    });
    await expect(resolver.resolve('memory.operation.durable', 'dependency')).resolves.toMatchObject(
      {
        durability: 'durable',
      }
    );
    const credential = (await resolver.resolve(
      'credential:memorybank-managed',
      'secret'
    )) as RenewableCredentialProvider;
    await expect(credential.acquire()).resolves.toMatchObject({
      token: 'vertex-token',
      tokenType: 'oauth_bearer',
    });
  });

  it('uses explicitly injected credential providers and fails closed for missing references', async () => {
    const injected: RenewableCredentialProvider = {
      acquire: async () => ({ token: 'injected', tokenType: 'oauth_bearer' }),
    };
    const resolver = createServerMemoryReferenceResolver({
      structuredStore,
      environment: {},
      credentialProviders: new Map([['credential:custom', injected]]),
    });

    await expect(resolver.resolve('credential:custom', 'secret')).resolves.toBe(injected);
    await expect(resolver.resolve('credential:memorybank-managed', 'secret')).rejects.toMatchObject(
      { code: 'MEMORY_PERMISSION_DENIED' }
    );
    await expect(resolver.resolve('HYPHA_MEMORYBANK_PROJECT', 'environment')).rejects.toMatchObject(
      {
        code: 'MEMORY_PROVIDER_NOT_INSTALLED',
      }
    );
  });

  it('resolves self-hosted Mem0 and Hindsight connections without persisting secrets', async () => {
    const resolver = createServerMemoryReferenceResolver({
      structuredStore,
      environment: {
        HYPHA_MEM0_OSS_URL: 'http://127.0.0.1:8765',
        HYPHA_MEM0_OSS_API_KEY: 'mem0-local-secret',
        HYPHA_HINDSIGHT_URL: 'http://127.0.0.1:8888',
        HYPHA_HINDSIGHT_BEARER_TOKEN: 'hindsight-local-secret',
      },
    });

    await expect(resolver.resolve('memory.connection.mem0-oss', 'connection')).resolves.toEqual({
      baseUrl: 'http://127.0.0.1:8765',
      apiKey: 'mem0-local-secret',
      authMode: 'x-api-key',
    });
    await expect(
      resolver.resolve('memory.connection.hindsight-local', 'connection')
    ).resolves.toEqual({
      baseUrl: 'http://127.0.0.1:8888',
      bearerToken: 'hindsight-local-secret',
    });
  });

  it('fails closed when an active self-hosted connection lacks its URL', async () => {
    const resolver = createServerMemoryReferenceResolver({
      structuredStore,
      environment: {},
    });

    await expect(
      resolver.resolve('memory.connection.mem0-oss', 'connection')
    ).rejects.toMatchObject({ code: 'MEMORY_PROVIDER_NOT_INSTALLED' });
    await expect(
      resolver.resolve('memory.connection.hindsight-local', 'connection')
    ).rejects.toMatchObject({ code: 'MEMORY_PROVIDER_NOT_INSTALLED' });
  });
});
