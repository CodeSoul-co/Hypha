import { z } from 'zod';
import { FrameworkError } from '@hypha/core';
import type {
  MCPToolInvocationPort,
  ToolAdapter,
  ToolAdapterCapabilities,
  ToolHandler,
  ToolSpec,
} from './index';
import type { CredentialLease, SecretResolver as ToolSecretResolver } from './secrets';

export type { SecretResolver as ToolSecretResolver } from './secrets';

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
  binding?: {
    localFunctionId?: string;
    pluginId?: string;
    executionPortRef?: string;
    mcpServerId?: string;
    mcpCapabilityId?: string;
    mcpConnectionProfileRef?: string;
  };
  /** @deprecated Use the typed binding object. */
  config?: Record<string, unknown>;
}

export const toolAdapterProfileSchema = z
  .object({
    id: z.string().min(1),
    kind: z.enum(toolAdapterKinds),
    required: z.boolean().default(true),
    toolSpecRef: z
      .object({
        id: z.string().min(1),
        version: z.string().min(1).optional(),
        revision: z.string().min(1).optional(),
      })
      .strict(),
    endpoint: z.string().url().optional(),
    credentialRef: z.string().min(1).optional(),
    requiredCapabilities: z
      .array(z.enum(['execute', 'cancel', 'health', 'close', 'streaming']))
      .optional(),
    binding: z
      .object({
        localFunctionId: z.string().min(1).optional(),
        pluginId: z.string().min(1).optional(),
        executionPortRef: z.string().min(1).optional(),
        mcpServerId: z.string().min(1).optional(),
        mcpCapabilityId: z.string().min(1).optional(),
        mcpConnectionProfileRef: z.string().min(1).optional(),
      })
      .strict()
      .optional(),
    config: z.record(z.unknown()).optional(),
  })
  .strict()
  .superRefine((profile, context) => {
    const requireBinding = (key: keyof NonNullable<ToolAdapterProfile['binding']>) => {
      if (!profile.binding?.[key]) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['binding', key],
          message: `${profile.kind} profiles require binding.${key}.`,
        });
      }
    };
    if (profile.kind === 'http' && !profile.endpoint) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endpoint'],
        message: 'HTTP profiles require endpoint.',
      });
    }
    if (profile.kind === 'plugin') requireBinding('pluginId');
    if (profile.kind === 'execution') requireBinding('executionPortRef');
    if (profile.kind === 'mcp_stdio' || profile.kind === 'mcp_streamable_http') {
      requireBinding('mcpServerId');
      requireBinding('mcpCapabilityId');
      requireBinding('mcpConnectionProfileRef');
    }
    if (profile.kind === 'mcp_streamable_http' && !profile.endpoint) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endpoint'],
        message: 'Streamable HTTP MCP profiles require endpoint.',
      });
    }
  });

export const toolAdapterProfilesDocumentSchema = z
  .object({ profiles: z.array(toolAdapterProfileSchema) })
  .strict();

export interface ToolAdapterProfilesDocument {
  profiles: ToolAdapterProfile[];
}

export function parseToolAdapterProfilesDocument(input: unknown): ToolAdapterProfilesDocument {
  const parsed = toolAdapterProfilesDocumentSchema.safeParse(input);
  if (!parsed.success) {
    throw factoryError(
      'TOOL_ADAPTER_PROFILE_DOCUMENT_INVALID',
      'Tool adapter profile document is invalid.',
      { issues: parsed.error.issues }
    );
  }
  const duplicate = firstDuplicate(parsed.data.profiles.map((profile) => profile.id));
  if (duplicate) {
    throw factoryError(
      'TOOL_ADAPTER_PROFILE_DUPLICATE',
      `Tool adapter profile id is duplicated: ${duplicate}.`,
      { profileId: duplicate }
    );
  }
  return parsed.data as ToolAdapterProfilesDocument;
}

export interface ToolAdapterFactoryInput {
  profile: ToolAdapterProfile;
  toolSpec: ToolSpec;
  resolveCredential(): Promise<string | null>;
  acquireCredential(): Promise<CredentialLease | null>;
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

    const acquireCredential = async (): Promise<CredentialLease | null> => {
      if (!profile.credentialRef) return null;
      if (!this.options.secretResolver) {
        throw factoryError(
          'TOOL_SECRET_RESOLVER_UNAVAILABLE',
          `Profile ${profile.id} requires a credential resolver.`
        );
      }
      const lease = await this.options.secretResolver.acquire(profile.credentialRef, {
        purpose: 'tool',
      });
      if (lease === null) {
        throw factoryError('TOOL_SECRET_NOT_FOUND', `Credential reference could not be resolved.`, {
          profileId: profile.id,
          credentialRef: profile.credentialRef,
        });
      }
      return lease;
    };
    const resolveCredential = async (): Promise<string | null> => {
      const lease = await acquireCredential();
      if (!lease) return null;
      try {
        return lease.read();
      } finally {
        await lease.release?.();
      }
    };

    const adapter = await factory.create({
      profile,
      toolSpec,
      resolveCredential,
      acquireCredential,
    });
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
  prepareMCPConnection?(input: ToolAdapterFactoryInput): Promise<{
    port: MCPToolInvocationPort;
    close?(): Promise<void>;
  }>;
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
      const handlerId = input.profile.binding?.localFunctionId ?? input.toolSpec.id;
      const handler = dependencies.localFunctions?.[handlerId];
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
      const { HttpToolAdapter } = await import('./index');
      return new HttpToolAdapter(`profile:${input.profile.id}`, {
        endpoint: input.profile.endpoint,
        resolveHeaders: async () => {
          const credential = await input.resolveCredential();
          const headers: Record<string, string> = {};
          if (credential) headers.authorization = `Bearer ${credential}`;
          return headers;
        },
        fetch: dependencies.fetch,
      });
    },
  });
  registry.register({
    kind: 'plugin',
    create: async (input) => {
      const pluginId =
        input.profile.binding?.pluginId ??
        stringConfig(input.profile, 'pluginId') ??
        input.toolSpec.sourceRef?.pluginId;
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
        const prepared = dependencies.prepareMCPConnection
          ? await dependencies.prepareMCPConnection(input)
          : dependencies.mcpPort
            ? { port: dependencies.mcpPort }
            : undefined;
        if (!prepared) throw bindingUnavailable(input.profile, 'MCP gateway');
        const serverId =
          input.profile.binding?.mcpServerId ??
          stringConfig(input.profile, 'serverId') ??
          input.toolSpec.sourceRef?.mcpServerId;
        const capabilityId =
          input.profile.binding?.mcpCapabilityId ??
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
        const adapter = new MCPToolAdapter(
          `profile:${input.profile.id}`,
          serverId,
          capabilityId,
          prepared.port
        );
        return prepared.close ? lifecycleAdapter(adapter, prepared.close) : adapter;
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

export interface LoadedToolAdapterProfile {
  profile: ToolAdapterProfile;
  toolSpec?: ToolSpec;
  adapter?: ToolAdapter;
  status: 'ready' | 'degraded';
  error?: string;
}

export class LoadedToolAdapterProfiles {
  constructor(private readonly entries: Map<string, LoadedToolAdapterProfile>) {}

  list(): LoadedToolAdapterProfile[] {
    return Array.from(this.entries.values());
  }

  get(profileId: string): LoadedToolAdapterProfile | undefined {
    return this.entries.get(profileId);
  }

  async health(): Promise<Record<string, Awaited<ReturnType<ToolAdapter['health']>>>> {
    const health: Record<string, Awaited<ReturnType<ToolAdapter['health']>>> = {};
    for (const [id, entry] of this.entries) {
      if (entry.adapter) health[id] = await entry.adapter.health();
    }
    return health;
  }

  async close(): Promise<void> {
    const errors: unknown[] = [];
    for (const entry of Array.from(this.entries.values()).reverse()) {
      try {
        await entry.adapter?.close?.();
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      throw factoryError(
        'TOOL_ADAPTER_PROFILE_CLOSE_FAILED',
        `${errors.length} Tool adapter profile(s) failed to close.`
      );
    }
  }
}

export async function loadToolAdapterProfiles(
  input: unknown,
  registry: ToolAdapterFactoryRegistry
): Promise<LoadedToolAdapterProfiles> {
  const document = parseToolAdapterProfilesDocument(input);
  const entries = new Map<string, LoadedToolAdapterProfile>();
  const loaded = new LoadedToolAdapterProfiles(entries);
  try {
    for (const profile of document.profiles) {
      try {
        const created = await registry.create(profile);
        entries.set(profile.id, { ...created, status: 'ready' });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        entries.set(profile.id, { profile, status: 'degraded', error: message });
        if (profile.required !== false) throw error;
      }
    }
    return loaded;
  } catch (error) {
    await loaded.close().catch(() => undefined);
    throw error;
  }
}

function lifecycleAdapter(adapter: ToolAdapter, closeConnection: () => Promise<void>): ToolAdapter {
  return {
    id: adapter.id,
    source: adapter.source,
    capabilities: async () => ({
      ...(await adapter.capabilities()),
      close: true,
    }),
    execute: (request) => adapter.execute(request),
    cancel: adapter.cancel ? (request) => adapter.cancel!(request) : undefined,
    health: () => adapter.health(),
    close: async () => {
      await adapter.close?.();
      await closeConnection();
    },
  };
}

function firstDuplicate(values: string[]): string | undefined {
  const seen = new Set<string>();
  return values.find((value) => (seen.has(value) ? true : !seen.add(value)));
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
