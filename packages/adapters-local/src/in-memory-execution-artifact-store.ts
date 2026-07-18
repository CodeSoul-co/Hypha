import type {
  ArtifactContent,
  ArtifactCopyRequest,
  ArtifactGetRequest,
  ArtifactObjectMetadata,
  ArtifactPutRequest,
  ArtifactStorageRef,
  ArtifactStoreCapabilities,
  ArtifactStoreProvider,
  NormalizedArtifactError,
  ProviderHealth,
} from '@hypha/core';
import {
  artifactCopyRequestSchema,
  artifactStorageRefSchema,
  validateArtifactGetRequest,
  validateArtifactPutRequest,
} from '@hypha/core';
import { ZodError } from 'zod';
import {
  ArtifactContentLimitError,
  collectArtifactContent,
  hashArtifactBytes,
  streamArtifactBytes,
} from './artifact-content-io';

export interface InMemoryExecutionArtifactStoreOptions {
  id?: string;
  maxObjectBytes?: number;
  now?: () => string;
}

export interface InMemoryExecutionArtifactStoreStats {
  objects: number;
  blobs: number;
  storedBytes: number;
}

interface StoredBlob {
  bytes: Uint8Array;
  references: number;
}

interface StoredObject {
  contentHash: string;
  sizeBytes: number;
  mimeType?: string;
  etag: string;
  metadata?: Record<string, string>;
  lastModifiedAt: string;
}

export class InMemoryExecutionArtifactStore implements ArtifactStoreProvider {
  readonly id: string;
  private readonly maxObjectBytes: number;
  private readonly now: () => string;
  private readonly blobs = new Map<string, StoredBlob>();
  private readonly objects = new Map<string, StoredObject>();
  private closed = false;

  constructor(options: InMemoryExecutionArtifactStoreOptions = {}) {
    this.id = options.id ?? 'artifact-store.in-memory.execution';
    this.maxObjectBytes = options.maxObjectBytes ?? 128 * 1024 * 1024;
    if (!Number.isSafeInteger(this.maxObjectBytes) || this.maxObjectBytes <= 0) {
      throw new TypeError('maxObjectBytes must be a positive safe integer.');
    }
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async capabilities(): Promise<ArtifactStoreCapabilities> {
    return {
      versioning: false,
      rangeRead: true,
      signedAccess: false,
      serverSideCopy: true,
      encryption: false,
      multipartUpload: false,
      contentAddressing: true,
    };
  }

  async put(input: ArtifactPutRequest): Promise<ArtifactStorageRef> {
    this.assertOpen();
    const request = validateStoreInput(() => validateArtifactPutRequest(input));
    let collected;
    try {
      collected = await collectArtifactContent(request.content, this.maxObjectBytes);
    } catch (error) {
      if (error instanceof ArtifactContentLimitError) {
        throw artifactStoreError('ARTIFACT_TOO_LARGE', error.message, false, {
          maxObjectBytes: error.maxBytes,
          observedBytes: error.observedBytes,
        });
      }
      if (error instanceof ArtifactStoreAdapterError) throw error;
      throw artifactStoreError(
        'ARTIFACT_INVALID_INPUT',
        error instanceof Error ? error.message : String(error),
        false
      );
    }
    this.assertOpen();
    if (request.sizeBytes !== undefined && request.sizeBytes !== collected.bytes.byteLength) {
      throw artifactStoreError(
        'ARTIFACT_VALIDATION_FAILED',
        'Artifact size does not match the declared sizeBytes.',
        false,
        { expectedSizeBytes: request.sizeBytes, actualSizeBytes: collected.bytes.byteLength }
      );
    }
    if (
      request.expectedContentHash !== undefined &&
      request.expectedContentHash !== collected.contentHash
    ) {
      throw artifactStoreError(
        'ARTIFACT_HASH_MISMATCH',
        'Artifact bytes do not match expectedContentHash.',
        false,
        {
          expectedContentHash: request.expectedContentHash,
          actualContentHash: collected.contentHash,
        }
      );
    }

    const existing = this.objects.get(request.objectKey);
    if (request.ifAbsent && existing) {
      throw artifactStoreError(
        'ARTIFACT_VERSION_CONFLICT',
        `Artifact object ${request.objectKey} already exists.`,
        false
      );
    }

    this.retainBlob(collected.contentHash, collected.bytes);
    if (existing) this.releaseBlob(existing.contentHash);
    this.objects.set(request.objectKey, {
      contentHash: collected.contentHash,
      sizeBytes: collected.bytes.byteLength,
      mimeType: request.mimeType,
      etag: collected.contentHash,
      metadata: cloneStringRecord(request.metadata),
      lastModifiedAt: this.now(),
    });
    return this.storageRef(request.objectKey, collected.contentHash);
  }

  async get(input: ArtifactGetRequest): Promise<ArtifactContent> {
    this.assertOpen();
    const request = validateStoreInput(() => validateArtifactGetRequest(input));
    this.assertOwnedRef(request.ref);
    const object = this.requireObject(request.ref.objectKey);
    const blob = this.requireBlob(object.contentHash);
    const actualHash = hashArtifactBytes(blob.bytes);
    if (actualHash !== object.contentHash) {
      throw artifactStoreError(
        'ARTIFACT_HASH_MISMATCH',
        'Stored Artifact bytes failed integrity verification.',
        false,
        { expectedContentHash: object.contentHash, actualContentHash: actualHash }
      );
    }
    if (request.expectedContentHash && request.expectedContentHash !== actualHash) {
      throw artifactStoreError(
        'ARTIFACT_HASH_MISMATCH',
        'Stored Artifact does not match expectedContentHash.',
        false,
        { expectedContentHash: request.expectedContentHash, actualContentHash: actualHash }
      );
    }

    const selected = selectRange(blob.bytes, request.range);
    return {
      stream: streamArtifactBytes(selected.bytes),
      contentHash: actualHash,
      sizeBytes: selected.bytes.byteLength,
      mimeType: object.mimeType,
      etag: object.etag,
      range: selected.range,
    };
  }

  async head(input: ArtifactStorageRef): Promise<ArtifactObjectMetadata | null> {
    this.assertOpen();
    const ref = validateStoreInput(() => artifactStorageRefSchema.parse(input));
    this.assertOwnedRef(ref);
    const object = this.objects.get(ref.objectKey);
    if (!object) return null;
    return {
      contentHash: object.contentHash,
      sizeBytes: object.sizeBytes,
      mimeType: object.mimeType,
      etag: object.etag,
      lastModifiedAt: object.lastModifiedAt,
      metadata: cloneStringRecord(object.metadata),
    };
  }

  async exists(input: ArtifactStorageRef): Promise<boolean> {
    this.assertOpen();
    const ref = validateStoreInput(() => artifactStorageRefSchema.parse(input));
    this.assertOwnedRef(ref);
    return this.objects.has(ref.objectKey);
  }

  async delete(input: ArtifactStorageRef): Promise<void> {
    this.assertOpen();
    const ref = validateStoreInput(() => artifactStorageRefSchema.parse(input));
    this.assertOwnedRef(ref);
    const object = this.objects.get(ref.objectKey);
    if (!object) return;
    this.objects.delete(ref.objectKey);
    this.releaseBlob(object.contentHash);
  }

  async copy(input: ArtifactCopyRequest): Promise<ArtifactStorageRef> {
    this.assertOpen();
    const request = validateStoreInput(() => artifactCopyRequestSchema.parse(input));
    this.assertOwnedRef(request.source);
    const source = this.requireObject(request.source.objectKey);
    const existing = this.objects.get(request.targetObjectKey);
    if (request.ifAbsent && existing) {
      throw artifactStoreError(
        'ARTIFACT_VERSION_CONFLICT',
        `Artifact object ${request.targetObjectKey} already exists.`,
        false
      );
    }
    if (request.targetObjectKey === request.source.objectKey) {
      return this.storageRef(request.targetObjectKey, source.contentHash);
    }
    const blob = this.requireBlob(source.contentHash);
    this.retainBlob(source.contentHash, blob.bytes);
    if (existing) this.releaseBlob(existing.contentHash);
    this.objects.set(request.targetObjectKey, {
      ...source,
      metadata: cloneStringRecord(source.metadata),
      lastModifiedAt: this.now(),
    });
    return this.storageRef(request.targetObjectKey, source.contentHash);
  }

  async health(): Promise<ProviderHealth> {
    return this.closed
      ? {
          status: 'unhealthy',
          checkedAt: this.now(),
          message: 'Artifact Store is closed.',
        }
      : {
          status: 'healthy',
          checkedAt: this.now(),
          details: { ...this.stats() },
        };
  }

  async close(): Promise<void> {
    this.closed = true;
    this.objects.clear();
    this.blobs.clear();
  }

  stats(): InMemoryExecutionArtifactStoreStats {
    return {
      objects: this.objects.size,
      blobs: this.blobs.size,
      storedBytes: [...this.blobs.values()].reduce(
        (total, blob) => total + blob.bytes.byteLength,
        0
      ),
    };
  }

  private assertOpen(): void {
    if (this.closed) {
      throw artifactStoreError('ARTIFACT_STORE_UNAVAILABLE', 'Artifact Store is closed.', false);
    }
  }

  private assertOwnedRef(ref: ArtifactStorageRef): void {
    if (ref.storeId !== this.id) {
      throw artifactStoreError(
        'ARTIFACT_INVALID_INPUT',
        `Artifact reference belongs to Store ${ref.storeId}, not ${this.id}.`,
        false
      );
    }
  }

  private requireObject(objectKey: string): StoredObject {
    const object = this.objects.get(objectKey);
    if (!object) {
      throw artifactStoreError(
        'ARTIFACT_NOT_FOUND',
        `Artifact object ${objectKey} was not found.`,
        false
      );
    }
    return object;
  }

  private requireBlob(contentHash: string): StoredBlob {
    const blob = this.blobs.get(contentHash);
    if (!blob) {
      throw artifactStoreError(
        'ARTIFACT_INTERNAL_ERROR',
        `Artifact blob ${contentHash} is missing.`,
        false
      );
    }
    return blob;
  }

  private retainBlob(contentHash: string, bytes: Uint8Array): void {
    const existing = this.blobs.get(contentHash);
    if (existing) {
      if (!sameBytes(existing.bytes, bytes)) {
        throw artifactStoreError(
          'ARTIFACT_HASH_MISMATCH',
          'Artifact digest collision detected for non-identical bytes.',
          false,
          { contentHash }
        );
      }
      existing.references += 1;
      return;
    }
    this.blobs.set(contentHash, { bytes: Uint8Array.from(bytes), references: 1 });
  }

  private releaseBlob(contentHash: string): void {
    const blob = this.requireBlob(contentHash);
    blob.references -= 1;
    if (blob.references === 0) this.blobs.delete(contentHash);
  }

  private storageRef(objectKey: string, contentHash: string): ArtifactStorageRef {
    return {
      storeId: this.id,
      objectKey,
      etag: contentHash,
      encrypted: false,
    };
  }
}

export class ArtifactStoreAdapterError extends Error {
  constructor(readonly normalizedError: NormalizedArtifactError) {
    super(normalizedError.message);
    this.name = 'ArtifactStoreAdapterError';
  }
}

function artifactStoreError(
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

function validateStoreInput<T>(validate: () => T): T {
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

function selectRange(
  bytes: Uint8Array,
  range?: { start: number; endInclusive?: number }
): { bytes: Uint8Array; range?: { start: number; endInclusive?: number } } {
  if (!range) return { bytes: Uint8Array.from(bytes) };
  if (range.start >= bytes.byteLength) {
    throw artifactStoreError(
      'ARTIFACT_INVALID_INPUT',
      'Artifact byte range starts beyond the end of the object.',
      false,
      { sizeBytes: bytes.byteLength, range }
    );
  }
  const endInclusive = Math.min(range.endInclusive ?? bytes.byteLength - 1, bytes.byteLength - 1);
  return {
    bytes: bytes.slice(range.start, endInclusive + 1),
    range: { start: range.start, endInclusive },
  };
}

function cloneStringRecord(value?: Record<string, string>): Record<string, string> | undefined {
  return value ? { ...value } : undefined;
}

function sameBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.byteLength !== right.byteLength) return false;
  for (let index = 0; index < left.byteLength; index += 1) {
    if (left[index] !== right[index]) return false;
  }
  return true;
}
