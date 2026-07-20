import type {
  ArtifactStoreProvider,
  ArtifactStoreProviderFactory,
} from '../../contracts/artifact-store';
import { FrameworkError } from '../../errors';

export interface ArtifactStoreProviderRegistration {
  providerId: string;
}

/**
 * Provider-neutral DI registry for Artifact Stores. Core owns selection and
 * lifecycle validation without importing a concrete storage adapter.
 */
export class ArtifactStoreProviderRegistry {
  private readonly factories = new Map<string, ArtifactStoreProviderFactory>();

  register(factory: ArtifactStoreProviderFactory): void {
    assertFactory(factory);
    if (this.factories.has(factory.providerId)) {
      throw registryError(
        'artifact.store_registration_conflict',
        `Artifact Store Provider ${factory.providerId} is already registered.`,
        factory.providerId
      );
    }
    this.factories.set(factory.providerId, factory);
  }

  unregister(providerId: string): boolean {
    return this.factories.delete(requiredProviderId(providerId));
  }

  list(): ArtifactStoreProviderRegistration[] {
    return [...this.factories.keys()]
      .sort((left, right) => left.localeCompare(right))
      .map((providerId) => ({ providerId }));
  }

  resolve(providerId: string): ArtifactStoreProviderFactory {
    const normalizedId = requiredProviderId(providerId);
    const factory = this.factories.get(normalizedId);
    if (!factory) {
      throw registryError(
        'artifact.store_not_registered',
        `Artifact Store Provider ${normalizedId} is not registered.`,
        normalizedId
      );
    }
    return factory;
  }

  async create(providerId: string): Promise<ArtifactStoreProvider> {
    const factory = this.resolve(providerId);
    const provider = await factory.create();
    if (provider.id !== factory.providerId) {
      await provider.close?.().catch(() => undefined);
      throw registryError(
        'artifact.store_factory_id_mismatch',
        `Artifact Store factory ${factory.providerId} created ${provider.id}.`,
        factory.providerId,
        { actualProviderId: provider.id }
      );
    }
    return provider;
  }
}

function assertFactory(factory: ArtifactStoreProviderFactory): void {
  if (!factory || typeof factory.create !== 'function') {
    throw registryError(
      'artifact.store_registration_invalid',
      'Artifact Store Provider factory must define create().'
    );
  }
  requiredProviderId(factory.providerId);
}

function requiredProviderId(providerId: string): string {
  if (
    typeof providerId !== 'string' ||
    providerId.trim() !== providerId ||
    providerId.length === 0
  ) {
    throw registryError(
      'artifact.store_registration_invalid',
      'Artifact Store Provider id must be a non-empty, trimmed string.',
      providerId
    );
  }
  return providerId;
}

function registryError(
  code: string,
  message: string,
  providerId?: string,
  extraContext?: Record<string, unknown>
): FrameworkError {
  return new FrameworkError({
    code,
    message,
    context: { providerId, ...extraContext },
  });
}
