import {
  Mem0MemoryManagementAdapter,
  MemoryBankMemoryManagementAdapter,
  type ExternalMemoryMappingStore,
  type MemoryBankPolicySpec,
} from './external-adapters';
import type { ExternalProviderOperationStore } from './external-provider-operations';
import type { RenewableCredentialProvider } from './managed-credentials';
import {
  type MemoryManagementProviderFactory,
  type MemoryManagementProviderFactoryContext,
  type MemoryManagementProviderInstallation,
} from './memory-runtime-factory';
import { Mem0PlatformClient } from './mem0-platform-client';
import type { Mem0HttpFetch } from './mem0-rest-client';
import { MemoryBankManagedClient } from './memorybank-managed-client';
import { memoryError } from './memory-utils';

export const MEM0_PLATFORM_FACTORY_ID = 'memory.factory.mem0.platform-v3' as const;
export const MEMORYBANK_MANAGED_FACTORY_ID = 'memory.factory.memorybank.vertex-ai-managed' as const;

export interface ManagedExternalProviderFactoryOptions {
  fetch?: Mem0HttpFetch;
}

export function createMem0PlatformMemoryProviderFactory(
  options: ManagedExternalProviderFactoryOptions = {}
): MemoryManagementProviderFactory {
  return {
    id: MEM0_PLATFORM_FACTORY_ID,
    supports(spec) {
      return (
        spec.type === 'mem0' &&
        spec.deployment === 'managed' &&
        readString(asObject(spec.config), 'protocol') === 'mem0-platform-v3'
      );
    },
    async create(context) {
      const config = asObject(context.spec.config);
      const mappingStore = resolveMappingStore(context, config);
      const operationStore = resolveOperationStore(context, config);
      const credentialProvider = resolveCredentialProvider(context, config, [
        'credentialRef',
        'apiTokenEnv',
      ]);
      const client = new Mem0PlatformClient({
        baseUrl: readString(config, 'baseUrl'),
        credentialProvider,
        fetch: options.fetch,
        providerId: context.spec.id,
        mappingStore,
        mappingProfile: 'production',
        operationStore,
        operationDeadlineMs: readNumber(config, 'operationDeadlineMs'),
        maxOperationAttempts: readNumber(config, 'maxOperationAttempts'),
        providerVersion: readString(config, 'providerVersion'),
        expectedProviderVersion: readString(config, 'expectedProviderVersion'),
        expectedCapabilities: context.spec.capabilities,
      });
      return managedInstallation(
        new Mem0MemoryManagementAdapter({
          id: context.spec.id,
          client,
          deployment: 'managed',
          mappingStore,
          mappingProfile: 'production',
          timeoutMs: context.spec.timeoutPolicy?.timeoutMs,
        }),
        client,
        context
      );
    },
  };
}

export function createMemoryBankManagedProviderFactory(
  options: ManagedExternalProviderFactoryOptions = {}
): MemoryManagementProviderFactory {
  return {
    id: MEMORYBANK_MANAGED_FACTORY_ID,
    supports(spec) {
      return (
        spec.type === 'memorybank' &&
        spec.deployment === 'managed' &&
        readString(asObject(spec.config), 'protocol') === 'vertex-ai-agent-engine-memory-bank'
      );
    },
    async create(context) {
      const config = asObject(context.spec.config);
      const mappingStore = resolveMappingStore(context, config);
      const operationStore = resolveOperationStore(context, config);
      const credentialProvider = resolveCredentialProvider(context, config, ['credentialRef']);
      const client = new MemoryBankManagedClient({
        projectId: resolveConfiguredString(context, config, 'projectId', 'projectIdEnv'),
        location: resolveConfiguredString(context, config, 'location', 'locationEnv'),
        reasoningEngineId: resolveConfiguredString(
          context,
          config,
          'reasoningEngineId',
          'reasoningEngineIdEnv'
        ),
        credentialProvider,
        fetch: options.fetch,
        baseUrl: readString(config, 'baseUrl'),
        providerId: context.spec.id,
        mappingStore,
        mappingProfile: 'production',
        profileRef: {
          id: context.profile.id,
          version: context.profile.version,
          revision: context.profile.revision,
        },
        operationStore,
        operationDeadlineMs: readNumber(config, 'operationDeadlineMs'),
        maxOperationAttempts: readNumber(config, 'maxOperationAttempts'),
      });
      const policy = (asObject(config.policy) as MemoryBankPolicySpec) ?? {};
      return managedInstallation(
        new MemoryBankMemoryManagementAdapter({
          id: context.spec.id,
          client,
          policy,
          mappingStore,
          mappingProfile: 'production',
          timeoutMs: context.spec.timeoutPolicy?.timeoutMs,
        }),
        client,
        context
      );
    },
  };
}

function managedInstallation(
  provider: Mem0MemoryManagementAdapter | MemoryBankMemoryManagementAdapter,
  client: Mem0PlatformClient | MemoryBankManagedClient,
  context: MemoryManagementProviderFactoryContext
): MemoryManagementProviderInstallation {
  return {
    provider,
    resources: {
      client,
      connectionRef: context.spec.connectionRef,
    },
  };
}

function resolveMappingStore(
  context: MemoryManagementProviderFactoryContext,
  config: Record<string, unknown>
): ExternalMemoryMappingStore {
  return resolveReference(
    context,
    readString(config, 'mappingStoreRef'),
    isMappingStore,
    'durable external mapping store'
  );
}

function resolveOperationStore(
  context: MemoryManagementProviderFactoryContext,
  config: Record<string, unknown>
): ExternalProviderOperationStore {
  return resolveReference(
    context,
    readString(config, 'operationStoreRef'),
    isOperationStore,
    'durable external operation store'
  );
}

function resolveCredentialProvider(
  context: MemoryManagementProviderFactoryContext,
  config: Record<string, unknown>,
  keys: string[]
): RenewableCredentialProvider {
  const reference = keys.map((key) => readString(config, key)).find(Boolean);
  return resolveReference(
    context,
    reference,
    isCredentialProvider,
    'renewable credential provider'
  );
}

function resolveConfiguredString(
  context: MemoryManagementProviderFactoryContext,
  config: Record<string, unknown>,
  directKey: string,
  referenceKey: string
): string {
  const direct = readString(config, directKey);
  if (direct) return direct;
  const reference = readString(config, referenceKey);
  const resolved = reference ? context.references?.get(reference) : undefined;
  if (typeof resolved !== 'string' || !resolved.trim()) {
    throw memoryError(
      'MEMORY_PROVIDER_NOT_INSTALLED',
      `Managed provider ${referenceKey} ${reference ?? '<missing>'} is not resolved.`
    );
  }
  return resolved;
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
      `Managed provider ${label} ${reference ?? '<missing>'} is not resolved or incompatible.`
    );
  }
  return value;
}

function isCredentialProvider(value: unknown): value is RenewableCredentialProvider {
  return Boolean(
    value &&
    typeof value === 'object' &&
    typeof (value as RenewableCredentialProvider).acquire === 'function'
  );
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
  return typeof value[key] === 'string' && (value[key] as string).trim()
    ? (value[key] as string)
    : undefined;
}

function readNumber(value: Record<string, unknown>, key: string): number | undefined {
  return typeof value[key] === 'number' && Number.isFinite(value[key])
    ? (value[key] as number)
    : undefined;
}
