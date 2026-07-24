import type { CredentialLease, SecretProvider } from '@hypha/tools';
import {
  EnvironmentSecretResolver,
  LocalDevelopmentSecretProvider,
  ProviderSecretResolver,
  VaultKVSecretProvider,
} from './SecretResolver';

describe('ProviderSecretResolver', () => {
  it('routes opaque references to provider adapters and preserves renewable leases', async () => {
    const renewed: CredentialLease = {
      renewable: false,
      expiresAt: '2026-07-23T01:00:00.000Z',
      read: () => 'renewed-value',
    };
    const lease: CredentialLease = {
      renewable: true,
      expiresAt: '2026-07-23T00:30:00.000Z',
      read: () => 'leased-value',
      renew: async () => renewed,
    };
    const provider: SecretProvider = {
      scheme: 'vault',
      acquire: async () => lease,
    };
    const resolver = new ProviderSecretResolver([provider]);

    const acquired = await resolver.acquire('vault:secret/data/hypha', {
      purpose: 'mcp_authorization',
      minimumValidityMs: 60_000,
    });
    expect(acquired?.read()).toBe('leased-value');
    expect((await acquired?.renew?.())?.read()).toBe('renewed-value');
  });

  it('supports explicit local development values without exposing values in errors', async () => {
    const resolver = new ProviderSecretResolver([
      new LocalDevelopmentSecretProvider({ token: 'local-secret-value' }),
    ]);
    await expect(resolver.resolve('local:token')).resolves.toBe('local-secret-value');
    await expect(resolver.resolve('vault:missing')).rejects.toMatchObject({
      code: 'SECRET_PROVIDER_UNAVAILABLE',
      scheme: 'vault',
    });
    await expect(resolver.resolve('vault:missing')).rejects.not.toThrow('local-secret-value');
  });

  it('keeps the environment resolver compatible and formats authorization at use time', async () => {
    const previous = process.env.HYPHA_SECRET_RESOLVER_TEST;
    process.env.HYPHA_SECRET_RESOLVER_TEST = 'test-token';
    try {
      const resolver = new EnvironmentSecretResolver();
      await expect(resolver.resolveAuthorization('env:HYPHA_SECRET_RESOLVER_TEST')).resolves.toBe(
        'Bearer test-token'
      );
    } finally {
      if (previous === undefined) delete process.env.HYPHA_SECRET_RESOLVER_TEST;
      else process.env.HYPHA_SECRET_RESOLVER_TEST = previous;
    }
  });

  it('acquires, renews, and revokes short Vault KV leases with token rotation', async () => {
    const calls: Array<{ url: string; token: string | null; method: string }> = [];
    let token = 'vault-token-1';
    const provider = new VaultKVSecretProvider({
      endpoint: 'https://vault.example.com',
      token: () => token,
      fetch: async (input, init) => {
        const request = new Request(input, init);
        calls.push({
          url: request.url,
          token: request.headers.get('x-vault-token'),
          method: request.method,
        });
        if (request.url.endsWith('/v1/secret/data/hypha')) {
          return Response.json({
            data: { data: { api_key: 'leased-secret' } },
            lease_id: 'lease-1',
            lease_duration: 1,
            renewable: true,
          });
        }
        if (request.url.endsWith('/v1/sys/leases/renew')) {
          return Response.json({
            lease_id: 'lease-1',
            lease_duration: 3600,
            renewable: true,
          });
        }
        return Response.json({});
      },
    });

    token = 'vault-token-2';
    const lease = await provider.acquire('vault:secret/data/hypha#api_key', {
      minimumValidityMs: 60_000,
    });
    expect(lease?.read()).toBe('leased-secret');
    expect(lease?.expiresAt).toBeDefined();
    await lease?.release?.();
    expect(calls).toEqual([
      expect.objectContaining({
        url: 'https://vault.example.com/v1/secret/data/hypha',
        token: 'vault-token-2',
        method: 'GET',
      }),
      expect.objectContaining({
        url: 'https://vault.example.com/v1/sys/leases/renew',
        token: 'vault-token-2',
        method: 'PUT',
      }),
      expect.objectContaining({
        url: 'https://vault.example.com/v1/sys/leases/revoke',
        token: 'vault-token-2',
        method: 'PUT',
      }),
    ]);
    await expect(provider.acquire('vault:secret/../escape#key')).rejects.toMatchObject({
      code: 'SECRET_REFERENCE_INVALID',
    });
  });
});
