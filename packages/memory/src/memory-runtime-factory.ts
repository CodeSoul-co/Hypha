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

export interface MemoryRuntime {
  service: MemoryApplicationService;
  provider: MemoryManagementProvider;
  profile: MemoryProfileSpec;
  providerSpec: MemoryManagementProviderSpec;
  profileHash: string;
  capabilities: MemoryManagementCapabilities;
  resources?: unknown;
  close(): Promise<void>;
}

/** Strict composition root for all Memory consumers. */
export class MemoryRuntimeFactory {
  constructor(private readonly options: MemoryRuntimeFactoryOptions) {
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
    let capabilities: MemoryManagementCapabilities;
    try {
      capabilities = negotiateMemoryManagementCapabilities(await provider.capabilities());
    } catch (error) {
      await provider.close?.();
      await installation?.close?.();
      throw error;
    }
    const errors = [
      ...validateDeclaredCapabilities(selected.management.capabilities, capabilities),
      ...validateMemoryProfileCapabilities(selected.profile, capabilities),
    ];
    if (errors.length > 0) {
      await provider.close?.();
      await installation?.close?.();
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        `Memory provider ${provider.id} does not satisfy the selected profile.`,
        false,
        { errors }
      );
    }

    const activities = new DefaultMemoryActivityPort(this.options.activities);
    registerMemoryManagementProviderHandlers(activities, provider);
    if (this.options.contextBuilder && this.options.contextGateway) {
      activities.register(
        'build_context',
        createContextBuildActivityHandler(this.options.contextBuilder, this.options.contextGateway)
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
    return {
      service,
      provider,
      profile: selected.profile,
      providerSpec: selected.management,
      profileHash: sha256({ profile: selected.profile, management: selected.management }),
      capabilities,
      resources: installation?.resources,
      close: async () => {
        try {
          await service.close();
        } finally {
          await installation?.close?.();
        }
      },
    };
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
