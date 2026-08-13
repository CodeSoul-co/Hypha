import { ZodError } from 'zod';
import type { NormalizedArtifactError } from '../../contracts/artifact-manager';

export class ArtifactManagerError extends Error {
  constructor(readonly normalizedError: NormalizedArtifactError) {
    super(normalizedError.message);
    this.name = 'ArtifactManagerError';
  }
}

export function artifactManagerError(
  code: NormalizedArtifactError['code'],
  message: string,
  retryable = false,
  details?: Record<string, unknown>
): ArtifactManagerError {
  return new ArtifactManagerError({
    code,
    message,
    retryable,
    ...(details ? { details } : {}),
  });
}

export function validateArtifactManagerInput<T>(validate: () => T): T {
  try {
    return validate();
  } catch (error) {
    if (error instanceof ArtifactManagerError) throw error;
    if (error instanceof ZodError) {
      throw artifactManagerError(
        'ARTIFACT_INVALID_INPUT',
        'Artifact Manager request failed contract validation.',
        false,
        { issues: error.issues }
      );
    }
    throw error;
  }
}

export function validateArtifactStoreOutput<T>(validate: () => T): T {
  try {
    return validate();
  } catch (error) {
    if (error instanceof ArtifactManagerError) throw error;
    if (error instanceof ZodError) {
      throw artifactManagerError(
        'ARTIFACT_INTERNAL_ERROR',
        'Artifact Store response failed contract validation.',
        false,
        { issues: error.issues }
      );
    }
    throw error;
  }
}

export function validateArtifactRepositoryOutput<T>(validate: () => T): T {
  try {
    return validate();
  } catch (error) {
    if (error instanceof ArtifactManagerError) throw error;
    if (error instanceof ZodError) {
      throw artifactManagerError(
        'ARTIFACT_INTERNAL_ERROR',
        'Artifact record repository response failed contract validation.',
        false,
        {
          repositoryCode: 'ARTIFACT_RECORD_REPOSITORY_CORRUPT',
          issues: error.issues,
        }
      );
    }
    throw error;
  }
}

export function normalizedArtifactErrorCode(
  error: unknown
): NormalizedArtifactError['code'] | undefined {
  if (!error || typeof error !== 'object') return undefined;
  const normalized = (error as { normalizedError?: { code?: unknown } }).normalizedError;
  return typeof normalized?.code === 'string'
    ? (normalized.code as NormalizedArtifactError['code'])
    : undefined;
}
