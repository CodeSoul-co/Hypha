import { createHash } from 'node:crypto';
import type { ArtifactByteRange, ArtifactGetRequest, ArtifactObjectMetadata } from '@hypha/core';
import { ArtifactStoreAdapterError, artifactStoreError } from './artifact-store-adapter-error';
import type { S3ArtifactObjectState } from './s3-artifact-store-transport';

export const HYPHA_CONTENT_HASH_METADATA_KEY = 'hypha-content-hash';
export const HYPHA_USER_METADATA_KEY = 'hypha-user-metadata';

export function encodeS3ArtifactMetadata(
  contentHash: string,
  metadata: Record<string, string> | undefined,
  maxMetadataBytes: number
): Record<string, string> {
  const result: Record<string, string> = { [HYPHA_CONTENT_HASH_METADATA_KEY]: contentHash };
  if (!metadata || Object.keys(metadata).length === 0) return result;
  const serialized = Buffer.from(JSON.stringify(metadata), 'utf8');
  if (serialized.byteLength > maxMetadataBytes) {
    throw artifactStoreError(
      'ARTIFACT_INVALID_INPUT',
      `Artifact metadata exceeds the ${maxMetadataBytes} byte limit.`,
      false,
      { maxMetadataBytes, observedBytes: serialized.byteLength }
    );
  }
  result[HYPHA_USER_METADATA_KEY] = serialized.toString('base64');
  return result;
}

export function s3ObjectMetadata(state: S3ArtifactObjectState): ArtifactObjectMetadata {
  return {
    contentHash: requireS3ContentHash(state),
    sizeBytes: state.sizeBytes,
    mimeType: state.mimeType,
    etag: normalizeS3Etag(state.etag),
    lastModifiedAt: state.lastModifiedAt,
    metadata: decodeS3UserMetadata(state.metadata),
  };
}

export function requireS3ContentHash(state: S3ArtifactObjectState): string {
  const value = state.metadata?.[HYPHA_CONTENT_HASH_METADATA_KEY]?.trim();
  if (!value || !/^sha256:[0-9a-f]{64}$/u.test(value)) {
    throw artifactStoreError(
      'ARTIFACT_VALIDATION_FAILED',
      'S3 object is missing valid Hypha content-hash metadata.',
      false
    );
  }
  return value;
}

export function normalizeS3ArtifactRange(
  range: ArtifactGetRequest['range'],
  sizeBytes: number
): { range?: ArtifactByteRange; header?: string; sizeBytes: number } {
  if (!range) return { sizeBytes };
  if (range.start >= sizeBytes) {
    throw artifactStoreError(
      'ARTIFACT_INVALID_INPUT',
      'Artifact byte range starts beyond the end of the object.',
      false,
      { sizeBytes, range }
    );
  }
  const endInclusive = Math.min(range.endInclusive ?? sizeBytes - 1, sizeBytes - 1);
  return {
    range: { start: range.start, endInclusive },
    header: `bytes=${range.start}-${endInclusive}`,
    sizeBytes: endInclusive - range.start + 1,
  };
}

export function verifyS3ArtifactStream(
  stream: AsyncIterable<Uint8Array>,
  expectedContentHash: string,
  expectedSizeBytes: number,
  verifyHash: boolean
): AsyncIterable<Uint8Array> {
  return (async function* verified(): AsyncIterable<Uint8Array> {
    const hash = verifyHash ? createHash('sha256') : undefined;
    let sizeBytes = 0;
    for await (const chunk of stream) {
      if (!(chunk instanceof Uint8Array)) {
        throw artifactStoreError(
          'ARTIFACT_DOWNLOAD_FAILED',
          'S3 response stream yielded a non-byte chunk.',
          false
        );
      }
      sizeBytes += chunk.byteLength;
      hash?.update(chunk);
      yield chunk;
    }
    if (sizeBytes !== expectedSizeBytes) {
      throw artifactStoreError(
        'ARTIFACT_DOWNLOAD_FAILED',
        'S3 response size does not match object metadata.',
        true,
        { expectedSizeBytes, actualSizeBytes: sizeBytes }
      );
    }
    if (hash) {
      const actualContentHash = `sha256:${hash.digest('hex')}`;
      if (actualContentHash !== expectedContentHash) {
        throw artifactStoreError(
          'ARTIFACT_HASH_MISMATCH',
          'Downloaded Artifact bytes failed integrity verification.',
          false,
          { expectedContentHash, actualContentHash }
        );
      }
    }
  })();
}

export function normalizeS3Etag(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return trimmed.replace(/^W\//u, '').replace(/^"|"$/gu, '');
}

export function quoteS3Etag(value: string | undefined): string | undefined {
  const normalized = normalizeS3Etag(value);
  return normalized ? `"${normalized}"` : undefined;
}

export function normalizeS3ArtifactStoreError(
  error: unknown,
  operation: string
): ArtifactStoreAdapterError {
  if (error instanceof ArtifactStoreAdapterError) return error;
  if (error instanceof TypeError) {
    return artifactStoreError('ARTIFACT_INVALID_INPUT', error.message, false, { operation });
  }
  const status = s3StatusCode(error);
  const name = s3ErrorName(error);
  if (name === 'NoSuchBucket') {
    return artifactStoreError(
      'ARTIFACT_STORE_UNAVAILABLE',
      'The configured S3 Artifact bucket does not exist.',
      false,
      { operation, providerCode: name }
    );
  }
  if (status === 404 || ['NoSuchKey', 'NotFound'].includes(name)) {
    return artifactStoreError('ARTIFACT_NOT_FOUND', 'S3 Artifact object was not found.', false, {
      operation,
    });
  }
  if (status === 401 || status === 403 || ['AccessDenied', 'InvalidAccessKeyId'].includes(name)) {
    return artifactStoreError(
      'ARTIFACT_PERMISSION_DENIED',
      'S3 rejected the Artifact Store operation.',
      false,
      { operation, providerCode: name }
    );
  }
  if (status === 412 || name === 'PreconditionFailed') {
    return artifactStoreError(
      'ARTIFACT_VERSION_CONFLICT',
      'S3 conditional request detected an Artifact version conflict.',
      false,
      { operation }
    );
  }
  if (status === 416 || name === 'InvalidRange') {
    return artifactStoreError(
      'ARTIFACT_INVALID_INPUT',
      'S3 rejected the Artifact byte range.',
      false,
      {
        operation,
      }
    );
  }
  if (status !== undefined && (status >= 500 || status === 429)) {
    return artifactStoreError(
      'ARTIFACT_STORE_UNAVAILABLE',
      error instanceof Error ? error.message : 'S3 Artifact Store is unavailable.',
      true,
      { operation, providerCode: name, status }
    );
  }
  const fallbackCode =
    operation === 'get' || operation === 'head' || operation === 'createDownloadAccess'
      ? 'ARTIFACT_DOWNLOAD_FAILED'
      : operation === 'delete'
        ? 'ARTIFACT_DELETE_PARTIAL'
        : 'ARTIFACT_UPLOAD_FAILED';
  return artifactStoreError(
    fallbackCode,
    error instanceof Error ? error.message : String(error),
    false,
    { operation, providerCode: name, ...(status === undefined ? {} : { status }) }
  );
}

function decodeS3UserMetadata(
  metadata: Record<string, string> | undefined
): Record<string, string> | undefined {
  const encoded = metadata?.[HYPHA_USER_METADATA_KEY];
  if (!encoded) return undefined;
  try {
    const parsed = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8')) as unknown;
    if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') throw new Error();
    const entries = Object.entries(parsed);
    if (entries.some(([, value]) => typeof value !== 'string')) throw new Error();
    return Object.fromEntries(entries) as Record<string, string>;
  } catch {
    throw artifactStoreError(
      'ARTIFACT_VALIDATION_FAILED',
      'S3 object contains invalid Hypha user metadata.',
      false
    );
  }
}

function s3StatusCode(error: unknown): number | undefined {
  if (!error || typeof error !== 'object') return undefined;
  const metadata = (error as { $metadata?: { httpStatusCode?: unknown } }).$metadata;
  return typeof metadata?.httpStatusCode === 'number' ? metadata.httpStatusCode : undefined;
}

function s3ErrorName(error: unknown): string {
  if (!error || typeof error !== 'object') return 'UnknownError';
  const candidate = error as { name?: unknown; Code?: unknown; code?: unknown };
  for (const value of [candidate.name, candidate.Code, candidate.code]) {
    if (typeof value === 'string' && value) return value;
  }
  return 'UnknownError';
}
