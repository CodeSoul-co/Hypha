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
