import type { ArtifactStoreProviderFactory } from '@hypha/core';
import {
  S3ExecutionArtifactStore,
  type S3ExecutionArtifactStoreOptions,
} from './s3-execution-artifact-store';

/** Composition-root entry point for registering the S3 adapter in core DI. */
export class S3ExecutionArtifactStoreFactory implements ArtifactStoreProviderFactory {
  readonly providerId: string;
  private readonly options: S3ExecutionArtifactStoreOptions;

  constructor(options: S3ExecutionArtifactStoreOptions) {
    this.providerId = options.id ?? 'artifact-store.s3.execution';
    this.options = { ...options, id: this.providerId };
  }

  create(): S3ExecutionArtifactStore {
    return new S3ExecutionArtifactStore(this.options);
  }
}
