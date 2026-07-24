import { z, type ZodType } from 'zod';
import type {
  ManagedMemoryScope,
  MemoryManagementCapabilities,
  MemoryManagementProviderSpec,
  MemoryProfileSpec,
} from './contracts';
import type { ContextInjectionGateway, MemoryContextBuilder } from './context-contracts';
import { negotiateMemoryManagementCapabilities } from './external-adapters';
import {
  GovernedMemoryManager,
  registerMemoryManagementProviderHandlers,
} from './governed-memory-manager';
import {
  createContextBuildActivityHandler,
  DefaultMemoryActivityPort,
  validateMemoryProfileCapabilities,
  type DefaultMemoryActivityPortOptions,
} from './integration-contracts';
import type { MemoryLifecycleTaskStore } from './lifecycle-workers';
import {
  DefaultMemoryApplicationService,
  type MemoryApplicationService,
} from './memory-application-service';
import type { MemoryEventContext } from './memory-events';
import { memoryError, sha256 } from './memory-utils';
import type { MemoryManagementProvider } from './operations';
import { memoryManagementProviderSpecSchema, memoryProfileSpecSchema } from './profile-contract';

export interface MemoryRuntimeProfile {
  profile: MemoryProfileSpec;
  management: MemoryManagementProviderSpec;
}

export interface MemoryRuntimeConfig {
  activeProfile: string;
  profiles: Record<string, MemoryRuntimeProfile>;
}

export const memoryRuntimeProfileSchema: ZodType<MemoryRuntimeProfile> = z
  .object({
    profile: memoryProfileSpecSchema,
    management: memoryManagementProviderSpecSchema,
  })
  .strict();

export const memoryRuntimeConfigSchema: ZodType<MemoryRuntimeConfig> = z
  .object({
    activeProfile: z.string().min(1),
    profiles: z.record(z.string().min(1), memoryRuntimeProfileSchema),
  })
  .strict()
  .superRefine((config, context) => {
    const selected = config.profiles[config.activeProfile];
    if (!selected) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['activeProfile'],
        message: `Active Memory profile ${config.activeProfile} is not declared.`,
      });
      return;
    }
    for (const [key, entry] of Object.entries(config.profiles)) {
      if (entry.profile.id !== key) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['profiles', key, 'profile', 'id'],
          message: 'Memory profile map key must equal profile.id.',
        });
      }
      if (!sameProviderRef(entry.profile, entry.management)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['profiles', key, 'profile', 'managementProviderRef'],
          message: 'Memory profile managementProviderRef must select its management spec.',
        });
      }
      const secretPath = findInlineSecret(entry.management.config);
      if (secretPath) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['profiles', key, 'management', 'config', ...secretPath],
          message: 'Provider credentials must be resolved by connectionRef, not stored inline.',
        });
      }
      const dependencyIds = [
        entry.profile.workingStoreRef?.id,
        entry.profile.recordStoreRef.id,
        ...(entry.profile.vectorStoreRefs ?? []).map((reference) => reference.id),
        entry.profile.artifactStoreRef?.id,
        entry.profile.embeddingProviderRef?.id,
        entry.profile.rerankerProviderRef?.id,
        entry.profile.contextProfileRef?.id,
      ].filter((value): value is string => Boolean(value));
      if (new Set(dependencyIds).size !== dependencyIds.length) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['profiles', key, 'profile'],
          message: 'Memory profile dependency references must be unique.',
        });
      }
      if (
        entry.management.type === 'native' &&
        entry.management.deployment === 'local' &&
        (!entry.profile.workingStoreRef ||
          entry.profile.workingStoreRef.id === entry.profile.recordStoreRef.id)
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['profiles', key, 'profile'],
          message: 'Local Native Memory requires distinct working and record store references.',
        });
      }
      if (
        ['self_hosted', 'managed', 'remote'].includes(entry.management.deployment) &&
        !entry.management.connectionRef
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['profiles', key, 'management', 'connectionRef'],
          message: 'External Memory deployments require a connectionRef.',
        });
      }
      const ephemeralPath = findEphemeralProductionReference(entry.management.config);
      if (
        ephemeralPath &&
        ['self_hosted', 'managed', 'remote'].includes(entry.management.deployment)
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['profiles', key, 'management', 'config', ...ephemeralPath],
          message: 'Production Memory profiles require durable mapping and operation stores.',
        });
      }
    }
  });

export function validateMemoryRuntimeConfig(input: unknown): MemoryRuntimeConfig {
  return memoryRuntimeConfigSchema.parse(input);
}

export interface MemoryManagementProviderFactoryContext {
  profile: MemoryProfileSpec;
  spec: MemoryManagementProviderSpec;
  references?: ReadonlyMap<string, unknown>;
}

export interface MemoryManagementProviderInstallation {
  provider: MemoryManagementProvider;
  reconciliationStore?: MemoryLifecycleTaskStore;
  resources?: unknown;
  close?(): Promise<void>;
}

export interface MemoryManagementProviderFactory {
  readonly id: string;
  supports(spec: MemoryManagementProviderSpec): boolean;
  create(
    context: MemoryManagementProviderFactoryContext
  ): Promise<MemoryManagementProvider | MemoryManagementProviderInstallation>;
}

export class MemoryManagementProviderRegistry {
  private readonly factories = new Map<string, MemoryManagementProviderFactory>();

  register(factory: MemoryManagementProviderFactory): this {
    if (this.factories.has(factory.id)) {
      throw memoryError(
        'MEMORY_INVALID_INPUT',
        `Memory provider factory ${factory.id} is already registered.`
      );
    }
    this.factories.set(factory.id, factory);
    return this;
  }

  resolve(spec: MemoryManagementProviderSpec): MemoryManagementProviderFactory {
    const matching = [...this.factories.values()].filter((factory) => factory.supports(spec));
    if (matching.length === 0) {
      throw memoryError(
        'MEMORY_PROVIDER_NOT_INSTALLED',
        `No installed Memory provider supports ${spec.type}/${spec.deployment}.`,
        false,
        { providerId: spec.id, providerType: spec.type, deployment: spec.deployment }
      );
    }
    if (matching.length > 1) {
      throw memoryError(
        'MEMORY_INVALID_INPUT',
        `More than one Memory provider factory matches ${spec.id}.`,
        false,
        { factoryIds: matching.map((factory) => factory.id).sort() }
      );
    }
    return matching[0];
  }
}

interface MemoryRuntimeRequestContext {
  operationId: string;
  scope: ManagedMemoryScope;
}

export interface MemoryRuntimeFactoryOptions {
  registry: MemoryManagementProviderRegistry;
  activities: DefaultMemoryActivityPortOptions;
  eventContext: (request: MemoryRuntimeRequestContext) => MemoryEventContext;
  contextBuilder?: MemoryContextBuilder;
  contextGateway?: ContextInjectionGateway;
  reconciliationStore?: MemoryLifecycleTaskStore;
  now?: () => string;
}

export interface MemoryRuntimeCompositionReceipt {
  runtimeId: string;
  serviceInstanceId: string;
  serviceContract: '@hypha/memory.MemoryApplicationService';
  activeProfileId: string;
  providerId: string;
  providerSpecId: string;
  configHash: string;
  profileHash: string;
  resolvedDependencyRefs: string[];
  createdAt: string;
}

export interface MemoryRuntime {
  service: MemoryApplicationService;
  provider: MemoryManagementProvider;
  profile: MemoryProfileSpec;
  providerSpec: MemoryManagementProviderSpec;
  profileHash: string;
  capabilities: MemoryManagementCapabilities;
  compositionReceipt: MemoryRuntimeCompositionReceipt;
  resources?: unknown;
  close(): Promise<void>;
}

/** Strict composition root for all Memory consumers. */
export class MemoryRuntimeFactory {
  private readonly now: () => string;
  private sequence = 0;

  constructor(private readonly options: MemoryRuntimeFactoryOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
    if (Boolean(options.contextBuilder) !== Boolean(options.contextGateway)) {
      throw memoryError(
        'MEMORY_INVALID_INPUT',
        'contextBuilder and contextGateway must be installed together.'
      );
    }
  }

  async create(
    input: unknown,
    references: ReadonlyMap<string, unknown> = new Map()
  ): Promise<MemoryRuntime> {
    const config = validateMemoryRuntimeConfig(input);
    const selected = config.profiles[config.activeProfile];
    const factory = this.options.registry.resolve(selected.management);
    const created = await factory.create({
      profile: selected.profile,
      spec: selected.management,
      references,
    });
    const installation = isProviderInstallation(created) ? created : undefined;
    const provider: MemoryManagementProvider = installation
      ? installation.provider
      : (created as MemoryManagementProvider);
    try {
      const capabilities = negotiateMemoryManagementCapabilities(await provider.capabilities());
      const errors = [
        ...validateDeclaredCapabilities(selected.management.capabilities, capabilities),
        ...validateMemoryProfileCapabilities(selected.profile, capabilities),
      ];
      if (errors.length > 0) {
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          `Memory provider ${provider.id} does not satisfy the selected profile.`,
          false,
          { errors }
        );
      }
      const health = await provider.health();
      if (health.status === 'unhealthy') {
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          `Memory provider ${provider.id} is unhealthy during runtime composition.`,
          false,
          { health }
        );
      }

      const activities = new DefaultMemoryActivityPort(this.options.activities);
      registerMemoryManagementProviderHandlers(activities, provider);
      if (this.options.contextBuilder && this.options.contextGateway) {
        activities.register(
          'build_context',
          createContextBuildActivityHandler(
            this.options.contextBuilder,
            this.options.contextGateway
          )
        );
      }
      const profileRef = {
        id: selected.profile.id,
        version: selected.profile.version,
        revision: selected.profile.revision,
      };
      const manager = new GovernedMemoryManager({
        activities,
        profileRef,
        eventContext: (request) => this.options.eventContext(request),
        timeoutMs: selected.management.timeoutPolicy?.timeoutMs,
        reconciliationStore: this.options.reconciliationStore ?? installation?.reconciliationStore,
        now: this.options.now,
      });
      const service = new DefaultMemoryApplicationService({
        manager,
        activities,
        provider,
        contextBuilder: this.options.contextBuilder,
        eventContext: (request) => this.options.eventContext(request),
        contextTimeoutMs: selected.management.timeoutPolicy?.timeoutMs,
      });
      const profileHash = sha256({ profile: selected.profile, management: selected.management });
      const createdAt = this.now();
      this.sequence += 1;
      const compositionReceipt: MemoryRuntimeCompositionReceipt = {
        runtimeId: `memory-runtime:${sha256({ profileHash, createdAt, sequence: this.sequence }).slice(7, 39)}`,
        serviceInstanceId: `memory-service:${sha256({ profileHash, createdAt, sequence: this.sequence }).slice(7, 39)}`,
        serviceContract: '@hypha/memory.MemoryApplicationService',
        activeProfileId: config.activeProfile,
        providerId: provider.id,
        providerSpecId: selected.management.id,
        configHash: sha256(config),
        profileHash,
        resolvedDependencyRefs: [...references.keys()].sort(),
        createdAt,
      };
      let closePromise: Promise<void> | undefined;
      return {
        service,
        provider,
        profile: selected.profile,
        providerSpec: selected.management,
        profileHash,
        capabilities,
        compositionReceipt,
        resources: installation?.resources,
        close: () => {
          closePromise ??= closeMemoryRuntimeResources(service, provider, installation);
          return closePromise;
        },
      };
    } catch (error) {
      try {
        await closeMemoryRuntimeResources(undefined, provider, installation);
      } catch (cleanupError) {
        throw new AggregateError(
          [
            error,
            ...(cleanupError instanceof AggregateError ? cleanupError.errors : [cleanupError]),
          ],
          'Memory runtime composition and rollback both failed.'
        );
      }
      throw error;
    }
  }
}

async function closeMemoryRuntimeResources(
  service: MemoryApplicationService | undefined,
  provider: MemoryManagementProvider,
  installation: MemoryManagementProviderInstallation | undefined
): Promise<void> {
  const failures: unknown[] = [];
  const actions: Array<() => Promise<void>> = [];
  if (service) actions.push(() => service.close());
  else if (provider.close) actions.push(() => provider.close!());
  if (installation?.close) actions.push(() => installation.close!());
  for (const close of actions) {
    try {
      await close();
    } catch (error) {
      failures.push(error);
    }
  }
  if (failures.length > 0) {
    throw new AggregateError(failures, 'Memory runtime resource cleanup failed.');
  }
}

function sameProviderRef(
  profile: MemoryProfileSpec,
  provider: MemoryManagementProviderSpec
): boolean {
  const ref = profile.managementProviderRef;
  return (
    ref.id === provider.id &&
    (ref.version === undefined || ref.version === provider.version) &&
    (ref.revision === undefined || ref.revision === provider.revision)
  );
}

function validateDeclaredCapabilities(
  declared: MemoryManagementCapabilities,
  actual: MemoryManagementCapabilities
): string[] {
  return (Object.keys(declared) as Array<keyof MemoryManagementCapabilities>)
    .filter((capability) => declared[capability] && !actual[capability])
    .map((capability) => `Provider does not implement declared capability ${capability}.`);
}

function findInlineSecret(
  value: unknown,
  path: Array<string | number> = []
): Array<string | number> | undefined {
  if (!value || typeof value !== 'object') return undefined;
  for (const [key, nested] of Object.entries(value)) {
    if (/(?:password|secret|token|api[_-]?key|credential)/i.test(key)) {
      if (!isCredentialReference(key, nested)) return [...path, key];
      continue;
    }
    const found = findInlineSecret(nested, [...path, key]);
    if (found) return found;
  }
  return undefined;
}

function findEphemeralProductionReference(
  value: unknown,
  path: Array<string | number> = []
): Array<string | number> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  for (const [key, nested] of Object.entries(value)) {
    if (
      /(?:mapping|operation)StoreRef$/i.test(key) &&
      typeof nested === 'string' &&
      /(?:in[-_]?memory|ephemeral)/i.test(nested)
    ) {
      return [...path, key];
    }
    const found = findEphemeralProductionReference(nested, [...path, key]);
    if (found) return found;
  }
  return undefined;
}
function isCredentialReference(key: string, value: unknown): boolean {
  if (typeof value !== 'string') return false;
  if (/Env$/i.test(key)) return /^[A-Z][A-Z0-9_]*$/.test(value);
  if (/Ref$/i.test(key))
    return /^(?:secret|env|vault|credential)[.:/][A-Za-z0-9._:/-]+$/.test(value);
  return false;
}

function isProviderInstallation(
  value: MemoryManagementProvider | MemoryManagementProviderInstallation
): value is MemoryManagementProviderInstallation {
  return Boolean(value && typeof value === 'object' && 'provider' in value);
}
