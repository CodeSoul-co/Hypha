import { createHash } from 'node:crypto';
import type { ArtifactByteRange, ArtifactGetRequest, ArtifactObjectMetadata } from '@codesoul-co/hypha-core';
import { ArtifactStoreAdapterError, artifactStoreError } from './artifact-store-adapter-error';

export const HYPHA_CONTENT_HASH_METADATA_KEY = 'hypha-content-hash';
export const HYPHA_OPERATION_ID_METADATA_KEY = 'hypha-operation-id';
export const HYPHA_USER_METADATA_KEY = 'hypha-user-metadata';
const MAX_OPERATION_ID_BYTES = 512;

const RETRYABLE_S3_NETWORK_CODES = new Set([
  'EAI_AGAIN',
  'ECONNREFUSED',
  'ECONNRESET',
  'EHOSTUNREACH',
  'ENETUNREACH',
  'ENOTFOUND',
  'EPIPE',
  'ETIMEDOUT',
]);

export interface S3ArtifactObjectState {
  sizeBytes: number;
  mimeType?: string;
  etag?: string;
  versionId?: string;
  lastModifiedAt?: string;
  metadata?: Record<string, string>;
  encrypted?: boolean;
}

export function encodeS3ArtifactMetadata(
  contentHash: string,
  operationId: string,
  metadata: Record<string, string> | undefined,
  maxMetadataBytes: number
): Record<string, string> {
  requireContentHash(contentHash);
  const encodedOperationId = encodeOperationId(operationId);
  assertPositiveSafeInteger(maxMetadataBytes, 'maxMetadataBytes');
  const result: Record<string, string> = {
    [HYPHA_CONTENT_HASH_METADATA_KEY]: contentHash,
    [HYPHA_OPERATION_ID_METADATA_KEY]: encodedOperationId,
  };
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

export function requireS3OperationId(state: S3ArtifactObjectState): string {
  assertS3ObjectState(state);
  const encoded = state.metadata?.[HYPHA_OPERATION_ID_METADATA_KEY];
  if (!encoded) throw invalidObjectMetadata('S3 object is missing valid Hypha operation metadata.');
  try {
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    if (
      Buffer.from(decoded, 'utf8').toString('base64') !== encoded ||
      Buffer.byteLength(decoded, 'utf8') === 0 ||
      Buffer.byteLength(decoded, 'utf8') > MAX_OPERATION_ID_BYTES
    ) {
      throw new Error();
    }
    return decoded;
  } catch {
    throw invalidObjectMetadata('S3 object contains invalid Hypha operation metadata.');
  }
}

export function s3ObjectMetadata(state: S3ArtifactObjectState): ArtifactObjectMetadata {
  assertS3ObjectState(state);
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
  assertS3ObjectState(state);
  const value = state.metadata?.[HYPHA_CONTENT_HASH_METADATA_KEY]?.trim();
  return requireContentHash(value);
}

export function normalizeS3ArtifactRange(
  range: ArtifactGetRequest['range'],
  sizeBytes: number
): { range?: ArtifactByteRange; header?: string; sizeBytes: number } {
  if (!Number.isSafeInteger(sizeBytes) || sizeBytes < 0) {
    throw artifactStoreError(
      'ARTIFACT_VALIDATION_FAILED',
      'S3 object size metadata is invalid.',
      false
    );
  }
  if (!range) return { sizeBytes };
  if (
    !Number.isSafeInteger(range.start) ||
    range.start < 0 ||
    (range.endInclusive !== undefined &&
      (!Number.isSafeInteger(range.endInclusive) || range.endInclusive < range.start))
  ) {
    throw artifactStoreError('ARTIFACT_INVALID_INPUT', 'Artifact byte range is invalid.', false);
  }
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
  requireContentHash(expectedContentHash);
  if (!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes < 0) {
    throw artifactStoreError(
      'ARTIFACT_VALIDATION_FAILED',
      'Expected S3 response size is invalid.',
      false
    );
  }
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

/**
 * ETags are opaque S3 version validators. Multipart ETags are deliberately
 * preserved and are never interpreted as content hashes.
 */
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
  const providerCode = s3ErrorName(error);
  if (providerCode === 'NoSuchBucket') {
    return artifactStoreError(
      'ARTIFACT_STORE_UNAVAILABLE',
      'The configured S3 Artifact bucket does not exist.',
      false,
      { operation, providerCode }
    );
  }
  if (status === 404 || ['NoSuchKey', 'NotFound'].includes(providerCode)) {
    return artifactStoreError('ARTIFACT_NOT_FOUND', 'S3 Artifact object was not found.', false, {
      operation,
      providerCode,
    });
  }
  if (
    status === 401 ||
    status === 403 ||
    ['AccessDenied', 'InvalidAccessKeyId', 'SignatureDoesNotMatch'].includes(providerCode)
  ) {
    return artifactStoreError(
      'ARTIFACT_PERMISSION_DENIED',
      'S3 rejected the Artifact Store operation.',
      false,
      { operation, providerCode }
    );
  }
  if (status === 412 || providerCode === 'PreconditionFailed') {
    return artifactStoreError(
      'ARTIFACT_VERSION_CONFLICT',
      'S3 conditional request detected an Artifact version conflict.',
      false,
      { operation, providerCode }
    );
  }
  if (status === 409 && providerCode === 'ConditionalRequestConflict') {
    return artifactStoreError(
      'ARTIFACT_VERSION_CONFLICT',
      'S3 conditional request conflicted with another object mutation.',
      true,
      { operation, providerCode, status }
    );
  }
  if (status === 416 || providerCode === 'InvalidRange') {
    return artifactStoreError(
      'ARTIFACT_INVALID_INPUT',
      'S3 rejected the Artifact byte range.',
      false,
      { operation, providerCode }
    );
  }
  if (
    status === 429 ||
    status === 409 ||
    (status !== undefined && status >= 500) ||
    RETRYABLE_S3_NETWORK_CODES.has(providerCode)
  ) {
    return artifactStoreError(
      'ARTIFACT_STORE_UNAVAILABLE',
      'S3 Artifact Store is temporarily unavailable.',
      true,
      { operation, providerCode, status }
    );
  }
  const fallbackCode =
    operation === 'get' || operation === 'head' || operation === 'createDownloadAccess'
      ? 'ARTIFACT_DOWNLOAD_FAILED'
      : operation === 'delete'
        ? 'ARTIFACT_DELETE_PARTIAL'
        : 'ARTIFACT_UPLOAD_FAILED';
  return artifactStoreError(fallbackCode, 'S3 Artifact Store operation failed.', false, {
    operation,
    providerCode,
    ...(status === undefined ? {} : { status }),
  });
}

function decodeS3UserMetadata(
  metadata: Record<string, string> | undefined
): Record<string, string> | undefined {
  const encoded = metadata?.[HYPHA_USER_METADATA_KEY];
  if (!encoded) return undefined;
  try {
    const parsed: unknown = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
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

function assertS3ObjectState(state: S3ArtifactObjectState): void {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    throw invalidObjectMetadata();
  }
  if (!Number.isSafeInteger(state.sizeBytes) || state.sizeBytes < 0) {
    throw invalidObjectMetadata('S3 object size metadata is invalid.');
  }
  for (const value of [state.mimeType, state.etag, state.versionId]) {
    if (value !== undefined && (typeof value !== 'string' || !value.trim())) {
      throw invalidObjectMetadata();
    }
  }
  if (
    state.lastModifiedAt !== undefined &&
    (typeof state.lastModifiedAt !== 'string' || !Number.isFinite(Date.parse(state.lastModifiedAt)))
  ) {
    throw invalidObjectMetadata('S3 object timestamp metadata is invalid.');
  }
  if (state.encrypted !== undefined && typeof state.encrypted !== 'boolean') {
    throw invalidObjectMetadata();
  }
  if (
    state.metadata !== undefined &&
    (!isRecord(state.metadata) ||
      Object.values(state.metadata).some((value) => typeof value !== 'string'))
  ) {
    throw invalidObjectMetadata();
  }
}

function requireContentHash(value: string | undefined): string {
  if (!value || !/^sha256:[0-9a-f]{64}$/u.test(value)) {
    throw artifactStoreError(
      'ARTIFACT_VALIDATION_FAILED',
      'S3 object is missing valid Hypha content-hash metadata.',
      false
    );
  }
  return value;
}

function encodeOperationId(value: string): string {
  const sizeBytes = Buffer.byteLength(value, 'utf8');
  if (sizeBytes === 0 || sizeBytes > MAX_OPERATION_ID_BYTES) {
    throw artifactStoreError(
      'ARTIFACT_INVALID_INPUT',
      `Artifact operationId must be between 1 and ${MAX_OPERATION_ID_BYTES} UTF-8 bytes.`,
      false
    );
  }
  return Buffer.from(value, 'utf8').toString('base64');
}

function s3StatusCode(error: unknown): number | undefined {
  if (!error || typeof error !== 'object') return undefined;
  const candidate = error as {
    $metadata?: { httpStatusCode?: unknown };
    statusCode?: unknown;
  };
  const status = candidate.$metadata?.httpStatusCode ?? candidate.statusCode;
  return typeof status === 'number' ? status : undefined;
}

function s3ErrorName(error: unknown): string {
  if (!error || typeof error !== 'object') return 'UnknownError';
  const candidate = error as { name?: unknown; Code?: unknown; code?: unknown };
  // AWS SDK errors expose the provider code as `name`; MinIO uses the more
  // specific `Code`/`code` fields and leaves `name` as the generic `S3Error`.
  for (const value of [candidate.Code, candidate.code, candidate.name]) {
    if (typeof value === 'string' && /^[A-Za-z][A-Za-z0-9_]{0,63}$/u.test(value)) {
      return value;
    }
  }
  return 'UnknownError';
}

function assertPositiveSafeInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer.`);
  }
}

function invalidObjectMetadata(
  message = 'S3 object metadata is invalid.'
): ArtifactStoreAdapterError {
  return artifactStoreError('ARTIFACT_VALIDATION_FAILED', message, false);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
