import type {
  CredentialLease,
  SecretProvider,
  SecretResolutionContext,
  SecretResolver,
} from '@hypha/tools';

class ValueCredentialLease implements CredentialLease {
  readonly renewable = false;

  constructor(private readonly value: string) {}

  read(): string {
    return this.value;
  }
}

export class EnvironmentSecretProvider implements SecretProvider {
  readonly scheme = 'env';

  async acquire(reference: string): Promise<CredentialLease | null> {
    const match = /^env:([A-Z_][A-Z0-9_]*)$/.exec(reference);
    if (!match) throw invalidReference(this.scheme);
    const value = process.env[match[1]];
    return value && value.length > 0 ? new ValueCredentialLease(value) : null;
  }
}

/** Explicitly injected local-development values; never enabled implicitly. */
export class LocalDevelopmentSecretProvider implements SecretProvider {
  readonly scheme = 'local';

  constructor(private readonly values: Readonly<Record<string, string>>) {}

  async acquire(reference: string): Promise<CredentialLease | null> {
    const match = /^local:([A-Za-z0-9._-]+)$/.exec(reference);
    if (!match) throw invalidReference(this.scheme);
    const value = this.values[match[1]];
    return value && value.length > 0 ? new ValueCredentialLease(value) : null;
  }
}

/**
 * Registry for env, Vault, KMS, and cloud-secret adapters. Cloud integrations
 * implement SecretProvider and can return renewable, expiring leases.
 */
export class ProviderSecretResolver implements SecretResolver {
  private readonly providers = new Map<string, SecretProvider>();

  constructor(providers: readonly SecretProvider[] = []) {
    for (const provider of providers) this.register(provider);
  }

  register(provider: SecretProvider): void {
    const scheme = provider.scheme.toLowerCase();
    if (!/^[a-z][a-z0-9+.-]*$/.test(scheme)) {
      throw invalidReference('provider');
    }
    if (this.providers.has(scheme)) {
      throw Object.assign(new Error('Secret provider scheme is already registered.'), {
        code: 'SECRET_PROVIDER_DUPLICATE',
        scheme,
      });
    }
    this.providers.set(scheme, provider);
  }

  async acquire(
    reference: string,
    context?: SecretResolutionContext
  ): Promise<CredentialLease | null> {
    const separator = reference.indexOf(':');
    const scheme = separator > 0 ? reference.slice(0, separator).toLowerCase() : '';
    const provider = this.providers.get(scheme);
    if (!provider) {
      throw Object.assign(new Error('Secret provider is not configured.'), {
        code: 'SECRET_PROVIDER_UNAVAILABLE',
        scheme,
      });
    }
    return provider.acquire(reference, context);
  }

  async resolve(reference: string, context?: SecretResolutionContext): Promise<string | null> {
    const lease = await this.acquire(reference, context);
    if (!lease) return null;
    try {
      return lease.read();
    } finally {
      await lease.release?.();
    }
  }

  async resolveAuthorization(reference: string): Promise<string> {
    const value = await this.resolve(reference, { purpose: 'mcp_authorization' });
    if (!value) {
      throw Object.assign(new Error('Secret reference could not be resolved.'), {
        code: 'SECRET_NOT_FOUND',
      });
    }
    return /^[A-Za-z][A-Za-z0-9_-]*\s+/.test(value) ? value : `Bearer ${value}`;
  }
}

/** Backwards-compatible default composition for existing server deployments. */
export class EnvironmentSecretResolver extends ProviderSecretResolver {
  constructor() {
    super([new EnvironmentSecretProvider()]);
  }
}

function invalidReference(scheme: string): Error {
  return Object.assign(new Error('Secret reference is invalid.'), {
    code: 'SECRET_REFERENCE_INVALID',
    scheme,
  });
}
