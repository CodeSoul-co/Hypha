import type { CredentialLease, SecretProvider } from '@hypha/tools';
import {
  EnvironmentSecretResolver,
  LocalDevelopmentSecretProvider,
  ProviderSecretResolver,
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
});
