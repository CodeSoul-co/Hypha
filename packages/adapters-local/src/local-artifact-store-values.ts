import type { ArtifactGetRequest, ArtifactObjectMetadata } from '@hypha/core';
import { ArtifactStoreAdapterError, artifactStoreError } from './artifact-store-adapter-error';
import { isNodeError, LocalArtifactIntegrityError } from './local-artifact-files';
import type { LocalArtifactObjectManifest } from './local-artifact-manifest';

export function localManifestMetadata(
  manifest: LocalArtifactObjectManifest
): ArtifactObjectMetadata {
  return {
    contentHash: manifest.contentHash,
    sizeBytes: manifest.sizeBytes,
    mimeType: manifest.mimeType,
    etag: manifest.etag,
    lastModifiedAt: manifest.lastModifiedAt,
    metadata: cloneLocalArtifactMetadata(manifest.metadata),
  };
}

export function normalizeLocalArtifactRange(
  range: ArtifactGetRequest['range'],
  sizeBytes: number
): { start: number; endInclusive: number } | undefined {
  if (!range) return undefined;
  if (range.start >= sizeBytes) {
    throw artifactStoreError(
      'ARTIFACT_INVALID_INPUT',
      'Artifact byte range starts beyond the end of the object.',
      false,
      { sizeBytes, range }
    );
  }
  return {
    start: range.start,
    endInclusive: Math.min(range.endInclusive ?? sizeBytes - 1, sizeBytes - 1),
  };
}

export function cloneLocalArtifactMetadata(
  value?: Record<string, string>
): Record<string, string> | undefined {
  return value ? { ...value } : undefined;
}

export function normalizeLocalArtifactStoreError(
  error: unknown,
  operation: string
): ArtifactStoreAdapterError {
  if (error instanceof ArtifactStoreAdapterError) return error;
  if (error instanceof LocalArtifactIntegrityError) {
    return artifactStoreError('ARTIFACT_HASH_MISMATCH', error.message, false, { operation });
  }
  if (error instanceof TypeError) {
    return artifactStoreError('ARTIFACT_INVALID_INPUT', error.message, false, { operation });
  }
  if (isNodeError(error, 'ENOENT')) {
    return artifactStoreError('ARTIFACT_NOT_FOUND', 'Artifact content was not found.', false, {
      operation,
    });
  }
  if (
    ['EACCES', 'EPERM', 'EROFS', 'ENOSPC', 'EMFILE', 'ENFILE'].some((code) =>
      isNodeError(error, code)
    )
  ) {
    return artifactStoreError(
      'ARTIFACT_STORE_UNAVAILABLE',
      error instanceof Error ? error.message : String(error),
      true,
      { operation }
    );
  }
  return artifactStoreError(
    'ARTIFACT_INTERNAL_ERROR',
    error instanceof Error ? error.message : String(error),
    false,
    { operation }
  );
}
