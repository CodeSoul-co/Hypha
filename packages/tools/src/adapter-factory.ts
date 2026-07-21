import { z } from 'zod';
import { FrameworkError } from '@hypha/core';
import type { ToolAdapter, ToolAdapterCapabilities, ToolSpec } from './index';

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
  toolSpecRef: ToolSpecReference;
  endpoint?: string;
  credentialRef?: string;
  requiredCapabilities?: Array<keyof ToolAdapterCapabilities>;
  config?: Record<string, unknown>;
}

export const toolAdapterProfileSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(toolAdapterKinds),
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
});

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

function factoryError(
  code: string,
  message: string,
  context?: Record<string, unknown>
): FrameworkError {
  return new FrameworkError({ code, message, context });
}
