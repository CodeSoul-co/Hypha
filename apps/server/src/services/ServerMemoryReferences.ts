import {
  StructuredExternalMemoryMappingStore,
  StructuredExternalProviderOperationStore,
  memoryError,
  type HindsightLocalConnection,
  type ManagedCredentialLease,
  type Mem0OssConnection,
  type MemoryRuntimeReferenceResolver,
  type RenewableCredentialProvider,
  type StructuredStoreProvider,
} from '@hypha/memory';

export interface ServerMemoryReferenceResolverOptions {
  structuredStore: StructuredStoreProvider;
  environment?: NodeJS.ProcessEnv;
  credentialProviders?: ReadonlyMap<string, RenewableCredentialProvider>;
  googleMetadataFetch?: GoogleMetadataCredentialFetch;
  credentialLeaseMs?: number;
  now?: () => Date;
}

interface EnvironmentCredentialBinding {
  environmentName: string;
  tokenType: ManagedCredentialLease['tokenType'];
}

const environmentCredentials: Readonly<Record<string, EnvironmentCredentialBinding>> = {
  'credential:mem0-platform': {
    environmentName: 'HYPHA_MEM0_PLATFORM_TOKEN',
    tokenType: 'api_token',
  },
  'credential:memorybank-managed': {
    environmentName: 'HYPHA_MEMORYBANK_ACCESS_TOKEN',
    tokenType: 'oauth_bearer',
  },
};

export function createServerMemoryReferenceResolver(
  options: ServerMemoryReferenceResolverOptions
): MemoryRuntimeReferenceResolver {
  const environment = options.environment ?? process.env;
  const mappingStore = new StructuredExternalMemoryMappingStore({ store: options.structuredStore });
  const operationStore = new StructuredExternalProviderOperationStore({
    store: options.structuredStore,
  });
  const credentials = new Map(options.credentialProviders ?? []);
  return {
    async resolve(reference, kind) {
      if (kind === 'secret') {
        const injected = credentials.get(reference);
        if (injected) return injected;
        if (reference === 'credential:memorybank-managed') {
          const authMode =
            environment.HYPHA_MEMORYBANK_AUTH_MODE?.trim().toLowerCase() || 'environment';
          if (authMode === 'google-metadata') {
            const provider = createGoogleMetadataCredentialProvider({
              fetch: options.googleMetadataFetch,
              now: options.now,
            });
            credentials.set(reference, provider);
            return provider;
          }
          if (authMode !== 'environment') {
            throw memoryError(
              'MEMORY_INVALID_INPUT',
              'HYPHA_MEMORYBANK_AUTH_MODE must be environment or google-metadata.'
            );
          }
        }
        const binding = environmentCredentials[reference];
        if (!binding) {
          throw memoryError(
            'MEMORY_PERMISSION_DENIED',
            `Server Memory credential reference is not registered: ${reference}`
          );
        }
        const provider = createRotatingEnvironmentCredentialProvider({
          ...binding,
          environment,
          leaseMs: options.credentialLeaseMs,
          now: options.now,
        });
        credentials.set(reference, provider);
        return provider;
      }
      if (kind === 'environment') {
        const value = environment[reference]?.trim();
        if (!value) {
          throw memoryError(
            'MEMORY_PROVIDER_NOT_INSTALLED',
            `Server Memory environment reference is unavailable: ${reference}`
          );
        }
        return value;
      }
      if (kind === 'connection') {
        if (reference === 'memory.connection.mem0-oss') {
          return resolveMem0OssConnection(environment);
        }
        if (reference === 'memory.connection.hindsight-local') {
          return resolveHindsightLocalConnection(environment);
        }
      }
      if (reference === 'memory.mapping.durable') return mappingStore;
      if (reference === 'memory.operation.durable') return operationStore;
      return Object.freeze({ reference, kind });
    },
  };
}

function resolveMem0OssConnection(environment: NodeJS.ProcessEnv): Mem0OssConnection {
  const baseUrl = readRequiredEnvironment(
    environment,
    'HYPHA_MEM0_OSS_URL',
    'Mem0 OSS connection URL'
  );
  const apiKey = environment.HYPHA_MEM0_OSS_API_KEY?.trim();
  return Object.freeze({
    baseUrl,
    ...(apiKey ? { apiKey, authMode: 'x-api-key' as const } : { authMode: 'none' as const }),
  });
}

function resolveHindsightLocalConnection(environment: NodeJS.ProcessEnv): HindsightLocalConnection {
  const baseUrl = readRequiredEnvironment(
    environment,
    'HYPHA_HINDSIGHT_URL',
    'Hindsight local connection URL'
  );
  const bearerToken = environment.HYPHA_HINDSIGHT_BEARER_TOKEN?.trim();
  return Object.freeze({ baseUrl, ...(bearerToken ? { bearerToken } : {}) });
}

export interface RotatingEnvironmentCredentialProviderOptions {
  environmentName: string;
  tokenType: ManagedCredentialLease['tokenType'];
  environment?: NodeJS.ProcessEnv;
  leaseMs?: number;
  now?: () => Date;
}

export interface GoogleMetadataCredentialResponse {
  ok: boolean;
  status: number;
  headers: { get(name: string): string | null };
  json(): Promise<unknown>;
}

export type GoogleMetadataCredentialFetch = (
  url: string,
  init: { headers: Record<string, string>; signal?: AbortSignal }
) => Promise<GoogleMetadataCredentialResponse>;

export interface GoogleMetadataCredentialProviderOptions {
  fetch?: GoogleMetadataCredentialFetch;
  now?: () => Date;
}

const googleServiceAccountTokenUrl =
  'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token';

/**
 * Resolves short-lived OAuth credentials from the fixed Google metadata
 * endpoint used by Cloud Run, GKE Workload Identity, and Compute Engine.
 */
export function createGoogleMetadataCredentialProvider(
  options: GoogleMetadataCredentialProviderOptions = {}
): RenewableCredentialProvider {
  const runtimeFetch = (globalThis as unknown as { fetch?: GoogleMetadataCredentialFetch }).fetch;
  const fetcher = options.fetch ?? runtimeFetch;
  if (!fetcher) {
    throw memoryError(
      'MEMORY_PROVIDER_UNAVAILABLE',
      'Google metadata credential transport is unavailable.'
    );
  }
  const now = options.now ?? (() => new Date());
  let closed = false;
  return {
    async acquire(signal) {
      if (closed) {
        throw memoryError(
          'MEMORY_PERMISSION_DENIED',
          'Google metadata credential provider closed.'
        );
      }
      const response = await fetcher(googleServiceAccountTokenUrl, {
        headers: { 'Metadata-Flavor': 'Google' },
        signal,
      });
      if (!response.ok) {
        throw memoryError(
          'MEMORY_PERMISSION_DENIED',
          `Google metadata credential request failed with HTTP ${response.status}.`,
          response.status === 429 || response.status >= 500,
          { status: response.status }
        );
      }
      if (response.headers.get('Metadata-Flavor') !== 'Google') {
        throw memoryError(
          'MEMORY_PERMISSION_DENIED',
          'Google metadata credential response lacks the required Metadata-Flavor evidence.'
        );
      }
      const value = asRecord(await response.json());
      const token = typeof value.access_token === 'string' ? value.access_token.trim() : '';
      const expiresIn = Number(value.expires_in);
      if (
        !token ||
        token.length > 16_384 ||
        value.token_type !== 'Bearer' ||
        !Number.isInteger(expiresIn) ||
        expiresIn < 60 ||
        expiresIn > 86_400
      ) {
        throw memoryError(
          'MEMORY_PERMISSION_DENIED',
          'Google metadata credential response schema is invalid.'
        );
      }
      return {
        token,
        tokenType: 'oauth_bearer',
        expiresAt: new Date(now().getTime() + expiresIn * 1_000).toISOString(),
      };
    },
    close: async () => {
      closed = true;
    },
  };
}

export function createRotatingEnvironmentCredentialProvider(
  options: RotatingEnvironmentCredentialProviderOptions
): RenewableCredentialProvider {
  const environment = options.environment ?? process.env;
  const now = options.now ?? (() => new Date());
  const leaseMs = options.leaseMs ?? 300_000;
  if (!Number.isFinite(leaseMs) || leaseMs <= 60_000) {
    throw memoryError(
      'MEMORY_INVALID_INPUT',
      'Server Memory credential lease must be greater than 60 seconds.'
    );
  }
  readEnvironmentToken(environment, options.environmentName);
  let closed = false;
  return {
    async acquire(signal) {
      if (signal?.aborted) throw signal.reason;
      if (closed) {
        throw memoryError(
          'MEMORY_PERMISSION_DENIED',
          'Server Memory credential provider is closed.'
        );
      }
      const token = readEnvironmentToken(environment, options.environmentName);
      return {
        token,
        tokenType: options.tokenType,
        expiresAt: new Date(now().getTime() + leaseMs).toISOString(),
      };
    },
    async close() {
      closed = true;
    },
  };
}

function readEnvironmentToken(environment: NodeJS.ProcessEnv, name: string): string {
  const token = environment[name]?.trim();
  if (!token) {
    throw memoryError(
      'MEMORY_PERMISSION_DENIED',
      `Server Memory credential environment is unavailable: ${name}`
    );
  }
  return token;
}

function readRequiredEnvironment(
  environment: NodeJS.ProcessEnv,
  name: string,
  label: string
): string {
  const value = environment[name]?.trim();
  if (!value) {
    throw memoryError(
      'MEMORY_PROVIDER_NOT_INSTALLED',
      `${label} environment is unavailable: ${name}`
    );
  }
  return value;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}
