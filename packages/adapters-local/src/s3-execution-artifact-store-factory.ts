import type { ArtifactStoreProvider, ArtifactStoreProviderFactory } from '@codesoul-co/core';
import {
  S3_EXECUTION_ARTIFACT_STORE_ID,
  S3ExecutionArtifactStore,
  type S3ExecutionArtifactStoreOptions,
} from './s3-execution-artifact-store';

export type S3ExecutionArtifactStoreFactoryOptions = Omit<S3ExecutionArtifactStoreOptions, 'id'> & {
  providerId?: string;
};

/**
 * Composition adapter for the accepted S3 Artifact Store. Registration remains
 * explicit: callers add this factory to the Core ArtifactStoreProviderRegistry.
 */
export class S3ExecutionArtifactStoreFactory implements ArtifactStoreProviderFactory {
  readonly providerId: string;

  constructor(private readonly options: S3ExecutionArtifactStoreFactoryOptions) {
    if (options.transport && options.transportOptions) {
      throw new TypeError('S3 factory cannot configure both transport and transportOptions.');
    }
    this.providerId = options.providerId ?? S3_EXECUTION_ARTIFACT_STORE_ID;
  }

  create(): ArtifactStoreProvider {
    const { providerId: _providerId, ...storeOptions } = this.options;
    return new S3ExecutionArtifactStore({
      ...storeOptions,
      id: this.providerId,
    });
  }
}
