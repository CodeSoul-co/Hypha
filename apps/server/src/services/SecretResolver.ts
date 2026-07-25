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

export interface VaultKVSecretProviderOptions {
  endpoint: string;
  token: () => string | Promise<string>;
  namespace?: string;
  fetch?: typeof fetch;
  allowInsecureLocalhost?: boolean;
}

interface VaultLeaseState {
  value: string;
  leaseId?: string;
  renewable: boolean;
  expiresAt?: string;
}

/** Concrete HashiCorp Vault KV v2 provider with last-moment token rotation. */
export class VaultKVSecretProvider implements SecretProvider {
  readonly scheme = 'vault';
  private readonly endpoint: URL;
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly options: VaultKVSecretProviderOptions) {
    this.endpoint = validateVaultEndpoint(options.endpoint, options.allowInsecureLocalhost ?? false);
    this.fetchImpl = options.fetch ?? fetch;
  }

  async acquire(
    reference: string,
    context?: SecretResolutionContext
  ): Promise<CredentialLease | null> {
    const parsed = parseVaultReference(reference);
    const response = await this.request(
      new URL(`/v1/${parsed.path.replace(/^\/+/u, '')}`, this.endpoint),
      { method: 'GET' }
    );
    if (response.status === 404) return null;
    const body = await parseVaultResponse(response);
    const nested = asRecord(asRecord(body.data)?.data) ?? asRecord(body.data);
    const value = nested?.[parsed.field];
    if (typeof value !== 'string' || value.length === 0) return null;
    const leaseDuration = positiveNumber(body.lease_duration);
    const state: VaultLeaseState = {
      value,
      leaseId: text(body.lease_id),
      renewable: body.renewable === true,
      ...(leaseDuration === undefined
        ? {}
        : { expiresAt: new Date(Date.now() + leaseDuration * 1000).toISOString() }),
    };
    const lease = new VaultCredentialLease(this, state);
    const minimumValidityMs = context?.minimumValidityMs ?? 0;
    if (
      minimumValidityMs > 0 &&
      state.expiresAt &&
      Date.parse(state.expiresAt) - Date.now() < minimumValidityMs
    ) {
      if (lease.renewable && lease.renew) return lease.renew();
      throw secretError(
        'SECRET_LEASE_TOO_SHORT',
        'Vault lease does not satisfy the requested minimum validity.'
      );
    }
    return lease;
  }

  async renew(state: VaultLeaseState): Promise<CredentialLease> {
    if (!state.leaseId || !state.renewable) {
      throw secretError('SECRET_LEASE_NOT_RENEWABLE', 'Vault lease is not renewable.');
    }
    const response = await this.request(new URL('/v1/sys/leases/renew', this.endpoint), {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ lease_id: state.leaseId }),
    });
    const body = await parseVaultResponse(response);
    const leaseDuration = positiveNumber(body.lease_duration);
    return new VaultCredentialLease(this, {
      value: state.value,
      leaseId: text(body.lease_id) ?? state.leaseId,
      renewable: body.renewable === true,
      ...(leaseDuration === undefined
        ? {}
        : { expiresAt: new Date(Date.now() + leaseDuration * 1000).toISOString() }),
    });
  }

  async release(state: VaultLeaseState): Promise<void> {
    if (!state.leaseId) return;
    const response = await this.request(new URL('/v1/sys/leases/revoke', this.endpoint), {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ lease_id: state.leaseId }),
    });
    if (!response.ok && response.status !== 404) await parseVaultResponse(response);
  }

  private async request(url: URL, init: RequestInit): Promise<Response> {
    const token = await this.options.token();
    if (!token) throw secretError('SECRET_PROVIDER_AUTH_FAILED', 'Vault token is unavailable.');
    const headers = new Headers(init.headers);
    headers.set('x-vault-token', token);
    if (this.options.namespace) headers.set('x-vault-namespace', this.options.namespace);
    let response: Response;
    try {
      response = await this.fetchImpl(url, { ...init, headers, redirect: 'error' });
    } catch {
      throw secretError('SECRET_PROVIDER_UNAVAILABLE', 'Vault request failed.');
    }
    if (response.status === 401 || response.status === 403) {
      throw secretError('SECRET_PROVIDER_AUTH_FAILED', 'Vault authorization failed.');
    }
    return response;
  }
}

class VaultCredentialLease implements CredentialLease {
  readonly renewable: boolean;
  readonly expiresAt?: string;
  private released = false;

  constructor(
    private readonly provider: VaultKVSecretProvider,
    private readonly state: VaultLeaseState
  ) {
    this.renewable = state.renewable;
    this.expiresAt = state.expiresAt;
  }

  read(): string {
    if (this.released) throw secretError('SECRET_LEASE_RELEASED', 'Vault lease was released.');
    if (this.expiresAt && Date.parse(this.expiresAt) <= Date.now()) {
      throw secretError('SECRET_LEASE_EXPIRED', 'Vault lease expired.');
    }
    return this.state.value;
  }

  renew(): Promise<CredentialLease> {
    if (this.released) {
      return Promise.reject(secretError('SECRET_LEASE_RELEASED', 'Vault lease was released.'));
    }
    return this.provider.renew(this.state);
  }

  async release(): Promise<void> {
    if (this.released) return;
    this.released = true;
    await this.provider.release(this.state);
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
    const providers: SecretProvider[] = [new EnvironmentSecretProvider()];
    const vaultEndpoint = process.env.HYPHA_VAULT_ADDR;
    const vaultTokenVariable = process.env.HYPHA_VAULT_TOKEN_ENV;
    if (vaultEndpoint && vaultTokenVariable) {
      providers.push(
        new VaultKVSecretProvider({
          endpoint: vaultEndpoint,
          token: () => process.env[vaultTokenVariable] ?? '',
          namespace: process.env.HYPHA_VAULT_NAMESPACE,
          allowInsecureLocalhost:
            process.env.NODE_ENV !== 'production' &&
            process.env.HYPHA_VAULT_ALLOW_INSECURE_LOCALHOST === 'true',
        })
      );
    }
    super(providers);
  }
}

function invalidReference(scheme: string): Error {
  return Object.assign(new Error('Secret reference is invalid.'), {
    code: 'SECRET_REFERENCE_INVALID',
    scheme,
  });
}

function parseVaultReference(reference: string): { path: string; field: string } {
  const match = /^vault:([A-Za-z0-9_./-]+)#([A-Za-z0-9_.-]+)$/u.exec(reference);
  if (!match || match[1].includes('..')) throw invalidReference('vault');
  return { path: match[1], field: match[2] };
}

function validateVaultEndpoint(value: string, allowInsecureLocalhost: boolean): URL {
  let endpoint: URL;
  try {
    endpoint = new URL(value);
  } catch {
    throw invalidReference('vault');
  }
  const local = endpoint.hostname === 'localhost' || endpoint.hostname === '127.0.0.1';
  if (
    endpoint.username ||
    endpoint.password ||
    (endpoint.protocol !== 'https:' &&
      !(allowInsecureLocalhost && local && endpoint.protocol === 'http:'))
  ) {
    throw invalidReference('vault');
  }
  return endpoint;
}

async function parseVaultResponse(response: Response): Promise<Record<string, unknown>> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw secretError('SECRET_PROVIDER_RESPONSE_INVALID', 'Vault response is invalid.');
  }
  if (!response.ok) {
    throw secretError('SECRET_PROVIDER_REQUEST_FAILED', `Vault request failed (${response.status}).`);
  }
  return asRecord(body) ?? {};
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function positiveNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : undefined;
}

function secretError(code: string, message: string): Error {
  return Object.assign(new Error(message), { code });
}
