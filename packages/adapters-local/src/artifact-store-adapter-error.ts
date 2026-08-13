import type { NormalizedArtifactError } from '@hypha/core';
import { ZodError } from 'zod';

export class ArtifactStoreAdapterError extends Error {
  constructor(readonly normalizedError: NormalizedArtifactError) {
    super(normalizedError.message);
    this.name = 'ArtifactStoreAdapterError';
  }
}

export function artifactStoreError(
  code: NormalizedArtifactError['code'],
  message: string,
  retryable: boolean,
  details?: Record<string, unknown>
): ArtifactStoreAdapterError {
  return new ArtifactStoreAdapterError({
    code,
    message,
    retryable,
    ...(details ? { details } : {}),
  });
}

export function validateArtifactStoreInput<T>(validate: () => T): T {
  try {
    return validate();
  } catch (error) {
    if (error instanceof ArtifactStoreAdapterError) throw error;
    if (error instanceof ZodError) {
      throw artifactStoreError(
        'ARTIFACT_INVALID_INPUT',
        'Artifact Store request failed contract validation.',
        false,
        { issues: error.issues }
      );
    }
    throw error;
  }
}
