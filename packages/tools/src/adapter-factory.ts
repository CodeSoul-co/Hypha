import { z } from 'zod';
import { FrameworkError } from '@hypha/core';
import type {
  MCPToolInvocationPort,
  ToolAdapter,
  ToolAdapterCapabilities,
  ToolHandler,
  ToolSpec,
} from './index';

export const toolAdapterKinds = [
  'local_function',
  'http',
  'plugin',
  'mcp_stdio',
  'mcp_streamable_http',
  'execution',
] as const;

export type ToolAdapterKind = (typeof toolAdapterKinds)[number];

export interface ToolSpecReference {
  id: string;
  version?: string;
  revision?: string;
}

export interface ToolAdapterProfile {
  id: string;
  kind: ToolAdapterKind;
  required?: boolean;
  toolSpecRef: ToolSpecReference;
  endpoint?: string;
  credentialRef?: string;
  requiredCapabilities?: Array<keyof ToolAdapterCapabilities>;
  config?: Record<string, unknown>;
}

export const toolAdapterProfileSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(toolAdapterKinds),
  required: z.boolean().default(true),
  toolSpecRef: z.object({
    id: z.string().min(1),
    version: z.string().min(1).optional(),
    revision: z.string().min(1).optional(),
  }),
  endpoint: z.string().url().optional(),
  credentialRef: z.string().min(1).optional(),
  requiredCapabilities: z
    .array(z.enum(['execute', 'cancel', 'health', 'close', 'streaming']))
    .optional(),
  config: z.record(z.unknown()).optional(),
}).strict();

export interface ToolSecretResolver {
  resolve(reference: string): Promise<string | null>;
}

export interface ToolAdapterFactoryInput {
  profile: ToolAdapterProfile;
  toolSpec: ToolSpec;
  resolveCredential(): Promise<string | null>;
}

export interface ToolAdapterFactory {
  readonly kind: ToolAdapterKind;
  create(input: ToolAdapterFactoryInput): Promise<ToolAdapter>;
}

export interface ToolAdapterFactoryRegistryOptions {
  resolveToolSpec(reference: ToolSpecReference): Promise<ToolSpec | null>;
  secretResolver?: ToolSecretResolver;
}

/**
 * Creates adapters from declarative profiles without allowing profiles to
 * smuggle executable factories or plaintext credentials through configuration.
 */
export class ToolAdapterFactoryRegistry {
  private readonly factories = new Map<ToolAdapterKind, ToolAdapterFactory>();

  constructor(private readonly options: ToolAdapterFactoryRegistryOptions) {}

  register(factory: ToolAdapterFactory): void {
    if (this.factories.has(factory.kind)) {
      throw factoryError(
        'TOOL_ADAPTER_FACTORY_DUPLICATE',
        `Factory already registered: ${factory.kind}`
      );
    }
    this.factories.set(factory.kind, factory);
  }

  async create(untrustedProfile: ToolAdapterProfile): Promise<{
    profile: ToolAdapterProfile;
    toolSpec: ToolSpec;
    adapter: ToolAdapter;
  }> {
    const parsed = toolAdapterProfileSchema.safeParse(untrustedProfile);
    if (!parsed.success) {
      throw factoryError('TOOL_ADAPTER_PROFILE_INVALID', 'Tool adapter profile is invalid.', {
        issues: parsed.error.issues,
      });
    }
    const profile = parsed.data as ToolAdapterProfile;
    const factory = this.factories.get(profile.kind);
    if (!factory) {
      throw factoryError(
        'TOOL_ADAPTER_FACTORY_NOT_FOUND',
        `No factory registered for ${profile.kind}.`,
        {
          profileId: profile.id,
          kind: profile.kind,
        }
      );
    }
    const toolSpec = await this.options.resolveToolSpec(profile.toolSpecRef);
    if (!toolSpec) {
      throw factoryError('TOOL_SPEC_NOT_FOUND', `ToolSpec not found: ${profile.toolSpecRef.id}.`, {
        profileId: profile.id,
        toolSpecRef: profile.toolSpecRef,
      });
    }
    this.assertPinnedSpec(profile, toolSpec);

    let credentialResolved = false;
    let credential: string | null = null;
    const resolveCredential = async (): Promise<string | null> => {
      if (!profile.credentialRef) return null;
      if (!this.options.secretResolver) {
        throw factoryError(
          'TOOL_SECRET_RESOLVER_UNAVAILABLE',
          `Profile ${profile.id} requires a credential resolver.`
        );
      }
      if (!credentialResolved) {
        credential = await this.options.secretResolver.resolve(profile.credentialRef);
        credentialResolved = true;
      }
      if (credential === null) {
        throw factoryError('TOOL_SECRET_NOT_FOUND', `Credential reference could not be resolved.`, {
          profileId: profile.id,
          credentialRef: profile.credentialRef,
        });
      }
      return credential;
    };

    const adapter = await factory.create({ profile, toolSpec, resolveCredential });
    const capabilities = await adapter.capabilities();
    if (!capabilities.execute) {
      throw factoryError('TOOL_ADAPTER_CAPABILITY_MISSING', 'Every adapter must support execute.', {
        profileId: profile.id,
      });
    }
    for (const capability of profile.requiredCapabilities ?? []) {
      if (!capabilities[capability]) {
        throw factoryError(
          'TOOL_ADAPTER_CAPABILITY_MISSING',
          `Adapter ${profile.id} does not support required capability ${capability}.`,
          { profileId: profile.id, capability }
        );
      }
    }
    const health = await adapter.health();
    if (health.status !== 'healthy') {
      await adapter.close?.().catch(() => undefined);
      throw factoryError(
        'TOOL_ADAPTER_HEALTH_CHECK_FAILED',
        `Adapter ${profile.id} failed its startup health probe.`,
        { profileId: profile.id, health }
      );
    }
    return { profile, toolSpec, adapter };
  }

  private assertPinnedSpec(profile: ToolAdapterProfile, toolSpec: ToolSpec): void {
    const reference = profile.toolSpecRef;
    const mismatch =
      reference.id !== toolSpec.id ||
      (reference.version !== undefined && reference.version !== toolSpec.version) ||
      (reference.revision !== undefined && reference.revision !== toolSpec.revision);
    if (mismatch) {
      throw factoryError(
        'TOOL_SPEC_PIN_MISMATCH',
        `Resolved ToolSpec does not match the pinned reference.`,
        {
          profileId: profile.id,
          expected: reference,
          actual: { id: toolSpec.id, version: toolSpec.version, revision: toolSpec.revision },
        }
      );
    }
  }
}

export interface ConcreteToolAdapterFactoryDependencies {
  localFunctions?: Readonly<Record<string, ToolHandler>>;
  plugins?: Readonly<Record<string, ToolHandler>>;
  mcpPort?: MCPToolInvocationPort;
  createExecutionAdapter?(input: ToolAdapterFactoryInput): Promise<ToolAdapter>;
  fetch?: typeof fetch;
}

/** Registers the complete declarative factory surface used by server composition. */
export function registerConcreteToolAdapterFactories(
  registry: ToolAdapterFactoryRegistry,
  dependencies: ConcreteToolAdapterFactoryDependencies = {}
): void {
  registry.register({
    kind: 'local_function',
    create: async (input) => {
      const handler = dependencies.localFunctions?.[input.toolSpec.id];
      if (!handler) throw bindingUnavailable(input.profile, 'local function');
      const { LocalFunctionToolAdapter } = await import('./index');
      return new LocalFunctionToolAdapter(`profile:${input.profile.id}`, handler);
    },
  });
  registry.register({
    kind: 'http',
    create: async (input) => {
      if (!input.profile.endpoint) {
        throw factoryError('TOOL_ADAPTER_PROFILE_INVALID', 'HTTP profiles require endpoint.', {
          profileId: input.profile.id,
        });
      }
      const credential = await input.resolveCredential();
      const { HttpToolAdapter } = await import('./index');
      return new HttpToolAdapter(`profile:${input.profile.id}`, {
        endpoint: input.profile.endpoint,
        ...(credential ? { headers: { authorization: `Bearer ${credential}` } } : {}),
        fetch: dependencies.fetch,
      });
    },
  });
  registry.register({
    kind: 'plugin',
    create: async (input) => {
      const pluginId = stringConfig(input.profile, 'pluginId') ?? input.toolSpec.sourceRef?.pluginId;
      const handler = pluginId ? dependencies.plugins?.[pluginId] : undefined;
      if (!handler) throw bindingUnavailable(input.profile, 'plugin');
      const { PluginToolAdapter } = await import('./index');
      return new PluginToolAdapter(`profile:${input.profile.id}`, handler);
    },
  });
  for (const kind of ['mcp_stdio', 'mcp_streamable_http'] as const) {
    registry.register({
      kind,
      create: async (input) => {
        if (!dependencies.mcpPort) throw bindingUnavailable(input.profile, 'MCP gateway');
        const serverId =
          stringConfig(input.profile, 'serverId') ?? input.toolSpec.sourceRef?.mcpServerId;
        const capabilityId =
          stringConfig(input.profile, 'capabilityId') ??
          input.toolSpec.sourceRef?.mcpCapabilityId;
        if (!serverId || !capabilityId) {
          throw factoryError(
            'TOOL_ADAPTER_PROFILE_INVALID',
            'MCP profiles require pinned serverId and capabilityId bindings.',
            { profileId: input.profile.id }
          );
        }
        const { MCPToolAdapter } = await import('./index');
        return new MCPToolAdapter(
          `profile:${input.profile.id}`,
          serverId,
          capabilityId,
          dependencies.mcpPort
        );
      },
    });
  }
  registry.register({
    kind: 'execution',
    create: async (input) => {
      if (!dependencies.createExecutionAdapter) {
        throw bindingUnavailable(input.profile, 'execution port');
      }
      return dependencies.createExecutionAdapter(input);
    },
  });
}

function stringConfig(profile: ToolAdapterProfile, key: string): string | undefined {
  const value = profile.config?.[key];
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function bindingUnavailable(profile: ToolAdapterProfile, binding: string): FrameworkError {
  return factoryError(
    'TOOL_ADAPTER_BINDING_UNAVAILABLE',
    `Profile ${profile.id} has no configured ${binding} binding.`,
    { profileId: profile.id, kind: profile.kind, binding }
  );
}

function factoryError(
  code: string,
  message: string,
  context?: Record<string, unknown>
): FrameworkError {
  return new FrameworkError({ code, message, context });
}
