import { FrameworkError } from '../../errors';
import type {
  SandboxProvider,
  SandboxProviderFactory,
  SandboxProviderSelection,
  SandboxProviderType,
} from '../../contracts/sandbox-provider';

const providerTypes = new Set<SandboxProviderType>([
  'mock',
  'local_process',
  'docker',
  'remote_sandbox',
  'custom',
]);

export interface SandboxProviderRegistration {
  providerType: SandboxProviderType;
  providerId: string;
}

/**
 * Provider-neutral DI registry. It selects only from explicit Environment fields and
 * never imports a concrete adapter into core.
 */
export class SandboxProviderRegistry {
  private readonly factories = new Map<string, SandboxProviderFactory>();

  register(factory: SandboxProviderFactory): void {
    assertFactory(factory);
    const key = registrationKey(factory.providerType, factory.providerId);
    if (this.factories.has(key)) {
      throw registryError(
        'execution.provider_registration_conflict',
        `Sandbox Provider ${factory.providerId} is already registered for ${factory.providerType}.`,
        factory.providerType,
        factory.providerId
      );
    }
    this.factories.set(key, factory);
  }

  unregister(providerType: SandboxProviderType, providerId: string): boolean {
    return this.factories.delete(registrationKey(providerType, requiredProviderId(providerId)));
  }

  list(providerType?: SandboxProviderType): SandboxProviderRegistration[] {
    if (providerType !== undefined) assertProviderType(providerType);
    return [...this.factories.values()]
      .filter((factory) => providerType === undefined || factory.providerType === providerType)
      .map(({ providerType: registeredType, providerId }) => ({
        providerType: registeredType,
        providerId,
      }))
      .sort((left, right) =>
        `${left.providerType}:${left.providerId}`.localeCompare(
          `${right.providerType}:${right.providerId}`
        )
      );
  }

  resolve(selection: SandboxProviderSelection): SandboxProviderFactory {
    assertProviderType(selection.provider);
    if (selection.providerRef !== undefined) {
      const providerId = requiredProviderId(selection.providerRef);
      const factory = this.factories.get(registrationKey(selection.provider, providerId));
      if (!factory) {
        throw registryError(
          'execution.provider_not_registered',
          `Sandbox Provider ${providerId} is not registered for ${selection.provider}.`,
          selection.provider,
          providerId
        );
      }
      return factory;
    }

    const candidates = [...this.factories.values()].filter(
      (factory) => factory.providerType === selection.provider
    );
    if (candidates.length === 1) return candidates[0]!;
    if (candidates.length === 0) {
      throw registryError(
        'execution.provider_not_registered',
        `No Sandbox Provider is registered for ${selection.provider}.`,
        selection.provider
      );
    }
    throw registryError(
      'execution.provider_selection_ambiguous',
      `Environment providerRef is required because ${selection.provider} has multiple registered Providers.`,
      selection.provider,
      undefined,
      { candidates: candidates.map((factory) => factory.providerId).sort() }
    );
  }

  async create(selection: SandboxProviderSelection): Promise<SandboxProvider> {
    const factory = this.resolve(selection);
    const provider = await factory.create();
    if (provider.id !== factory.providerId) {
      await provider.close?.().catch(() => undefined);
      throw registryError(
        'execution.provider_factory_id_mismatch',
        `Sandbox Provider factory ${factory.providerId} created ${provider.id}.`,
        factory.providerType,
        factory.providerId,
        { actualProviderId: provider.id }
      );
    }
    return provider;
  }
}

function assertFactory(factory: SandboxProviderFactory): void {
  if (!factory || typeof factory.create !== 'function') {
    throw registryError(
      'execution.provider_registration_invalid',
      'Sandbox Provider factory must define create().',
      'custom'
    );
  }
  assertProviderType(factory.providerType);
  requiredProviderId(factory.providerId);
}

function assertProviderType(providerType: SandboxProviderType): void {
  if (!providerTypes.has(providerType)) {
    throw registryError(
      'execution.provider_registration_invalid',
      `Unsupported Sandbox Provider type: ${String(providerType)}.`,
      'custom',
      undefined,
      { providerType }
    );
  }
}

function requiredProviderId(providerId: string): string {
  if (
    typeof providerId !== 'string' ||
    providerId.trim() !== providerId ||
    providerId.length === 0
  ) {
    throw registryError(
      'execution.provider_registration_invalid',
      'Sandbox Provider id must be a non-empty, trimmed string.',
      'custom',
      providerId
    );
  }
  return providerId;
}

function registrationKey(providerType: SandboxProviderType, providerId: string): string {
  return `${providerType}\u0000${providerId}`;
}

function registryError(
  code: string,
  message: string,
  providerType: SandboxProviderType,
  providerId?: string,
  extraContext?: Record<string, unknown>
): FrameworkError {
  return new FrameworkError({
    code,
    message,
    context: { providerType, providerId, ...extraContext },
  });
}
