import { Mem0MemoryManagementAdapter, type ExternalMemoryMappingStore } from './external-adapters';
import {
  type MemoryManagementProviderFactory,
  type MemoryManagementProviderFactoryContext,
  type MemoryManagementProviderInstallation,
  type MemoryManagementProviderRegistry,
} from './memory-runtime-factory';
import { Mem0OssClient, type Mem0HttpFetch, type Mem0OssClientOptions } from './mem0-rest-client';
import type { ExternalProviderOperationStore } from './external-provider-operations';
import { memoryError } from './memory-utils';

export const MEM0_OSS_FACTORY_ID = 'memory.factory.mem0.oss-rest' as const;

export interface Mem0OssConnection {
  baseUrl: string;
  apiKey?: string;
  authMode?: Mem0OssClientOptions['authMode'];
  providerVersion?: string;
  fetch?: Mem0HttpFetch;
}

export interface Mem0OssProviderFactoryOptions {
  fetch?: Mem0HttpFetch;
}

export function createMem0OssMemoryProviderFactory(
  options: Mem0OssProviderFactoryOptions = {}
): MemoryManagementProviderFactory {
  return {
    id: MEM0_OSS_FACTORY_ID,
    supports(spec) {
      return (
        spec.type === 'mem0' &&
        spec.deployment === 'self_hosted' &&
        readString(asObject(spec.config), 'protocol') === 'mem0-oss-rest'
      );
    },
    async create(context) {
      return createMem0OssInstallation(context, options);
    },
  };
}

export function registerMem0OssMemoryProvider(
  registry: MemoryManagementProviderRegistry,
  options: Mem0OssProviderFactoryOptions = {}
): MemoryManagementProviderRegistry {
  return registry.register(createMem0OssMemoryProviderFactory(options));
}

function createMem0OssInstallation(
  context: MemoryManagementProviderFactoryContext,
  options: Mem0OssProviderFactoryOptions
): MemoryManagementProviderInstallation {
  const config = asObject(context.spec.config);
  const connection = resolveConnection(context, config, options.fetch);
  const mappingStore = resolveMappingStore(context, config);
  const operationStore = resolveOperationStore(context, config);
  const client = new Mem0OssClient({
    baseUrl: connection.baseUrl,
    apiKey: connection.apiKey,
    authMode: connection.authMode ?? (connection.apiKey ? 'x-api-key' : 'none'),
    fetch: connection.fetch,
    providerId: context.spec.id,
    mappingStore,
    operationStore,
    operationProfile: 'production',
    providerVersion: connection.providerVersion,
    expectedProviderVersion: readString(config, 'expectedProviderVersion'),
    expectedCapabilities: context.spec.capabilities,
    mappingProfile: 'production',
    listPaginationMode:
      readString(config, 'listPaginationMode') === 'provider-cursor'
        ? 'provider-cursor'
        : 'top-k-offset',
  });
  return {
    provider: new Mem0MemoryManagementAdapter({
      id: context.spec.id,
      client,
      deployment: 'self_hosted',
      mappingStore,
      mappingProfile: 'production',
      timeoutMs: context.spec.timeoutPolicy?.timeoutMs,
    }),
    resources: { client, connectionRef: context.spec.connectionRef },
    close: () => client.close(),
  };
}

function resolveConnection(
  context: MemoryManagementProviderFactoryContext,
  config: Record<string, unknown>,
  defaultFetch: Mem0HttpFetch | undefined
): Mem0OssConnection {
  const reference = context.spec.connectionRef;
  const value = reference ? context.references?.get(reference) : undefined;
  if (typeof value === 'string' && value.trim()) {
    return { baseUrl: value, fetch: defaultFetch };
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const connection = value as Partial<Mem0OssConnection>;
    if (typeof connection.baseUrl !== 'string' || !connection.baseUrl.trim()) {
      throw memoryError(
        'MEMORY_INVALID_INPUT',
        `Mem0 OSS connection ${reference ?? '<missing>'} does not contain baseUrl.`
      );
    }
    return {
      baseUrl: connection.baseUrl,
      apiKey: connection.apiKey,
      authMode: connection.authMode,
      providerVersion: connection.providerVersion,
      fetch: connection.fetch ?? defaultFetch,
    };
  }
  const configuredBaseUrl = readString(config, 'baseUrl');
  if (configuredBaseUrl) return { baseUrl: configuredBaseUrl, fetch: defaultFetch };
  throw memoryError(
    'MEMORY_PROVIDER_NOT_INSTALLED',
    `Mem0 OSS connection ${reference ?? '<missing>'} is not resolved.`
  );
}

function resolveMappingStore(
  context: MemoryManagementProviderFactoryContext,
  config: Record<string, unknown>
): ExternalMemoryMappingStore {
  const reference = readString(config, 'mappingStoreRef');
  const value = reference ? context.references?.get(reference) : undefined;
  const candidate = value as Partial<ExternalMemoryMappingStore> | undefined;
  if (
    !reference ||
    !candidate ||
    candidate.durability !== 'durable' ||
    typeof candidate.get !== 'function' ||
    typeof candidate.getByExternalId !== 'function' ||
    typeof candidate.set !== 'function' ||
    typeof candidate.list !== 'function'
  ) {
    throw memoryError(
      'MEMORY_PROVIDER_NOT_INSTALLED',
      `Mem0 OSS durable mapping store ${reference ?? '<missing>'} is not resolved or incompatible.`
    );
  }
  return candidate as ExternalMemoryMappingStore;
}

function resolveOperationStore(
  context: MemoryManagementProviderFactoryContext,
  config: Record<string, unknown>
): ExternalProviderOperationStore {
  const reference = readString(config, 'operationStoreRef');
  const value = reference ? context.references?.get(reference) : undefined;
  const candidate = value as Partial<ExternalProviderOperationStore> | undefined;
  if (
    !reference ||
    !candidate ||
    candidate.durability !== 'durable' ||
    typeof candidate.get !== 'function' ||
    typeof candidate.claim !== 'function' ||
    typeof candidate.set !== 'function' ||
    typeof candidate.listRecoverable !== 'function'
  ) {
    throw memoryError(
      'MEMORY_PROVIDER_NOT_INSTALLED',
      'Mem0 OSS durable operation store ' +
        (reference ?? '<missing>') +
        ' is not resolved or incompatible.'
    );
  }
  return candidate as ExternalProviderOperationStore;
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function readString(value: Record<string, unknown>, key: string): string | undefined {
  return typeof value[key] === 'string' && (value[key] as string).trim()
    ? (value[key] as string)
    : undefined;
}
