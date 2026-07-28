import {
  MemoryBankMemoryManagementAdapter,
  type ExternalMemoryMappingStore,
  type MemoryBankPolicySpec,
} from './external-adapters';
import type { ExternalProviderOperationStore } from './external-provider-operations';
import {
  HindsightLocalMemoryBankClient,
  type HindsightLocalMemoryBankClientOptions,
} from './hindsight-local-client';
import type {
  MemoryManagementProviderFactory,
  MemoryManagementProviderFactoryContext,
  MemoryManagementProviderInstallation,
  MemoryManagementProviderRegistry,
} from './memory-runtime-factory';
import { memoryError } from './memory-utils';
import type { Mem0HttpFetch } from './mem0-rest-client';

export const HINDSIGHT_LOCAL_FACTORY_ID = 'memory.factory.memorybank.hindsight-local' as const;

export interface HindsightLocalConnection {
  baseUrl: string;
  bearerToken?: string;
  fetch?: Mem0HttpFetch;
}

export interface HindsightLocalFactoryOptions {
  fetch?: Mem0HttpFetch;
  operationDeadlineMs?: number;
}

export function createHindsightLocalMemoryProviderFactory(
  options: HindsightLocalFactoryOptions = {}
): MemoryManagementProviderFactory {
  return {
    id: HINDSIGHT_LOCAL_FACTORY_ID,
    supports(spec) {
      const config = asObject(spec.config);
      return (
        spec.type === 'memorybank' &&
        spec.deployment === 'self_hosted' &&
        config.protocol === 'hindsight-http-v0.8'
      );
    },
    async create(context) {
      return createHindsightInstallation(context, options);
    },
  };
}

export function registerHindsightLocalMemoryProvider(
  registry: MemoryManagementProviderRegistry,
  options: HindsightLocalFactoryOptions = {}
): MemoryManagementProviderRegistry {
  return registry.register(createHindsightLocalMemoryProviderFactory(options));
}

function createHindsightInstallation(
  context: MemoryManagementProviderFactoryContext,
  options: HindsightLocalFactoryOptions
): MemoryManagementProviderInstallation {
  const config = asObject(context.spec.config);
  const connection = resolveConnection(context, config, options.fetch);
  const mappingStore = resolveReference<ExternalMemoryMappingStore>(
    context,
    readString(config, 'mappingStoreRef'),
    isMappingStore,
    'mapping store'
  );
  const operationStore = resolveReference<ExternalProviderOperationStore>(
    context,
    readString(config, 'operationStoreRef'),
    isOperationStore,
    'operation store'
  );
  const clientOptions: HindsightLocalMemoryBankClientOptions = {
    baseUrl: connection.baseUrl,
    bearerToken: connection.bearerToken,
    fetch: connection.fetch,
    providerId: context.spec.id,
    mappingStore,
    mappingProfile: 'production',
    operationStore,
    operationProfile: 'production',
    profileRef: {
      id: context.profile.id,
      version: context.profile.version,
      revision: context.profile.revision,
    },
    operationDeadlineMs: readNumber(config, 'operationDeadlineMs') ?? options.operationDeadlineMs,
    expectedApiVersion: readString(config, 'expectedApiVersion') ?? '0.8',
  };
  const client = new HindsightLocalMemoryBankClient(clientOptions);
  const policy: MemoryBankPolicySpec = {
    preserveOriginals: true,
    ...(asObject(config.policy) as MemoryBankPolicySpec),
  };
  const provider = new MemoryBankMemoryManagementAdapter({
    id: context.spec.id,
    client,
    policy,
    mappingStore,
    mappingProfile: 'production',
    timeoutMs: context.spec.timeoutPolicy?.timeoutMs,
  });
  return {
    provider,
    resources: { client, connectionRef: context.spec.connectionRef },
    close: () => client.close(),
  };
}

function resolveConnection(
  context: MemoryManagementProviderFactoryContext,
  config: Record<string, unknown>,
  defaultFetch: Mem0HttpFetch | undefined
): HindsightLocalConnection {
  const reference = context.spec.connectionRef;
  const value = reference ? context.references?.get(reference) : undefined;
  const configuredBaseUrl = readString(config, 'baseUrl');
  if (typeof value === 'string') {
    return { baseUrl: value, fetch: defaultFetch };
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const connection = value as Partial<HindsightLocalConnection>;
    if (typeof connection.baseUrl !== 'string') {
      throw memoryError(
        'MEMORY_INVALID_INPUT',
        `Hindsight connection ${reference ?? '<missing>'} does not contain baseUrl.`
      );
    }
    return {
      baseUrl: connection.baseUrl,
      bearerToken: connection.bearerToken,
      fetch: connection.fetch ?? defaultFetch,
    };
  }
  if (configuredBaseUrl) return { baseUrl: configuredBaseUrl, fetch: defaultFetch };
  throw memoryError(
    'MEMORY_PROVIDER_NOT_INSTALLED',
    `Hindsight connection ${reference ?? '<missing>'} is not resolved.`
  );
}

function resolveReference<T>(
  context: MemoryManagementProviderFactoryContext,
  reference: string | undefined,
  guard: (value: unknown) => value is T,
  label: string
): T {
  const value = reference ? context.references?.get(reference) : undefined;
  if (!reference || !guard(value)) {
    throw memoryError(
      'MEMORY_PROVIDER_NOT_INSTALLED',
      `Hindsight ${label} ${reference ?? '<missing>'} is not resolved or is incompatible.`
    );
  }
  return value;
}

function isMappingStore(value: unknown): value is ExternalMemoryMappingStore {
  const candidate = value as Partial<ExternalMemoryMappingStore> | undefined;
  return Boolean(
    candidate &&
    candidate.durability === 'durable' &&
    typeof candidate.get === 'function' &&
    typeof candidate.getByExternalId === 'function' &&
    typeof candidate.set === 'function' &&
    typeof candidate.list === 'function'
  );
}

function isOperationStore(value: unknown): value is ExternalProviderOperationStore {
  const candidate = value as Partial<ExternalProviderOperationStore> | undefined;
  return Boolean(
    candidate &&
    candidate.durability === 'durable' &&
    typeof candidate.get === 'function' &&
    typeof candidate.claim === 'function' &&
    typeof candidate.set === 'function' &&
    typeof candidate.listRecoverable === 'function'
  );
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function readString(value: Record<string, unknown>, key: string): string | undefined {
  return typeof value[key] === 'string' ? (value[key] as string) : undefined;
}

function readNumber(value: Record<string, unknown>, key: string): number | undefined {
  return typeof value[key] === 'number' && Number.isFinite(value[key])
    ? (value[key] as number)
    : undefined;
}
