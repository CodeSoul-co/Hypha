import type {
  ArtifactContent,
  ArtifactCopyRequest,
  ArtifactDownloadAccess,
  ArtifactDownloadAccessRequest,
  ArtifactGetRequest,
  ArtifactObjectMetadata,
  ArtifactPutRequest,
  ArtifactStorageRef,
  ArtifactStoreCapabilities,
  ArtifactStoreProvider,
  ProviderHealth,
} from '@hypha/core';
import {
  artifactCopyRequestSchema,
  artifactDownloadAccessRequestSchema,
  artifactStorageRefSchema,
  validateArtifactGetRequest,
  validateArtifactPutRequest,
} from '@hypha/core';
import { ArtifactContentLimitError } from './artifact-content-io';
import {
  ArtifactStoreAdapterError,
  artifactStoreError,
  validateArtifactStoreInput,
} from './artifact-store-adapter-error';
import { stageS3ArtifactContent } from './s3-artifact-staging';
import {
  MinioS3ArtifactTransport,
  type MinioS3ArtifactTransportOptions,
  type S3ArtifactCopyResult,
  type S3ArtifactTransport,
  type S3ArtifactWriteResult,
} from './s3-artifact-store-transport';
import {
  encodeS3ArtifactMetadata,
  normalizeS3ArtifactStoreError,
  normalizeS3Etag,
  requireS3ContentHash,
  s3ObjectMetadata,
  type S3ArtifactObjectState,
} from './s3-artifact-store-values';

const DEFAULT_MAX_OBJECT_BYTES = 5 * 1024 * 1024 * 1024;
const DEFAULT_MAX_METADATA_BYTES = 2 * 1024;

export interface S3ExecutionArtifactStoreOptions {
  id?: string;
  bucket: string;
  region?: string;
  maxObjectBytes?: number;
  maxMetadataBytes?: number;
  now?: () => string;
  transport?: S3ArtifactTransport;
  transportOptions?: MinioS3ArtifactTransportOptions;
}

/**
 * Concrete, version-pinned S3 Artifact Store adapter.
 *
 * The adapter deliberately remains outside the public Factory/Registry until
 * its real MinIO acceptance suite is complete with zero skipped tests.
 */
export class S3ExecutionArtifactStore implements ArtifactStoreProvider {
  readonly id: string;
  private readonly bucket: string;
  private readonly region?: string;
  private readonly maxObjectBytes: number;
  private readonly maxMetadataBytes: number;
  private readonly now: () => string;
  private readonly transport: S3ArtifactTransport;
  private readiness?: Promise<void>;
  private closed = false;

  constructor(options: S3ExecutionArtifactStoreOptions) {
    const bucket = options.bucket?.trim();
    if (!bucket) throw new TypeError('bucket is required.');
    if (bucket !== options.bucket) throw new TypeError('bucket must not contain outer whitespace.');
    if (!options.transport && !options.transportOptions) {
      throw new TypeError('transport or transportOptions is required.');
    }

    this.id = options.id ?? 'artifact-store.s3.execution';
    this.bucket = bucket;
    this.region = optionalNonEmpty(options.region, 'region');
    this.maxObjectBytes = options.maxObjectBytes ?? DEFAULT_MAX_OBJECT_BYTES;
    this.maxMetadataBytes = options.maxMetadataBytes ?? DEFAULT_MAX_METADATA_BYTES;
    assertPositiveSafeInteger(this.maxObjectBytes, 'maxObjectBytes');
    assertPositiveSafeInteger(this.maxMetadataBytes, 'maxMetadataBytes');
    this.now = options.now ?? (() => new Date().toISOString());
    this.transport = options.transport
      ? options.transport
      : new MinioS3ArtifactTransport(requireTransportOptions(options.transportOptions));
  }

  async capabilities(): Promise<ArtifactStoreCapabilities> {
    return {
      versioning: true,
      rangeRead: true,
      signedAccess: true,
      serverSideCopy: true,
      encryption: false,
      multipartUpload: true,
      contentAddressing: true,
    };
  }

  async put(input: ArtifactPutRequest): Promise<ArtifactStorageRef> {
    return this.operation('put', async () => {
      const request = validateArtifactStoreInput(() => validateArtifactPutRequest(input));
      let staged;
      try {
        staged = await stageS3ArtifactContent(request.content, this.maxObjectBytes);
      } catch (error) {
        if (error instanceof ArtifactContentLimitError) {
          throw artifactStoreError('ARTIFACT_TOO_LARGE', error.message, false, {
            maxObjectBytes: error.maxBytes,
            observedBytes: error.observedBytes,
          });
        }
        throw error;
      }

      let writeResult: S3ArtifactWriteResult | undefined;
      try {
        this.assertOpen();
        assertDeclaredContent(request, staged.sizeBytes, staged.contentHash);
        writeResult = await this.transport.upload({
          bucket: this.bucket,
          key: request.objectKey,
          body: staged.createReadStream(),
          contentLength: staged.sizeBytes,
          contentType: request.mimeType,
          metadata: encodeS3ArtifactMetadata(
            staged.contentHash,
            request.metadata,
            this.maxMetadataBytes
          ),
          ifAbsent: request.ifAbsent ?? false,
        });
        const versionId = requireProviderIdentity(writeResult.versionId, 'versionId');
        const etag = requireProviderIdentity(normalizeS3Etag(writeResult.etag), 'etag');
        const state = await this.requirePublishedState(
          request.objectKey,
          versionId,
          etag,
          staged.contentHash,
          staged.sizeBytes
        );
        return this.storageRef(request.objectKey, state);
      } catch (error) {
        if (writeResult?.versionId) {
          await this.rollbackFailedPut(request.objectKey, writeResult, error);
        }
        throw error;
      } finally {
        await staged.cleanup();
      }
    });
  }

  async get(input: ArtifactGetRequest): Promise<ArtifactContent> {
    return this.operation('get', async () => {
      const request = validateArtifactStoreInput(() => validateArtifactGetRequest(input));
      this.assertOwnedVersionedRef(request.ref);
      const result = await this.transport.get({
        bucket: this.bucket,
        key: request.ref.objectKey,
        versionId: request.ref.versionId,
        expectedEtag: request.ref.etag,
        expectedContentHash: request.expectedContentHash,
        range: request.range,
      });
      this.assertRefMatchesState(request.ref, result.state);
      const contentHash = requireS3ContentHash(result.state);
      if (request.expectedContentHash && request.expectedContentHash !== contentHash) {
        throw hashMismatch(request.expectedContentHash, contentHash);
      }
      return {
        stream: result.stream,
        contentHash,
        sizeBytes: result.range ? artifactRangeSize(result.range) : result.state.sizeBytes,
        mimeType: result.state.mimeType,
        etag: normalizeS3Etag(result.state.etag),
        range: result.range,
      };
    });
  }

  async head(input: ArtifactStorageRef): Promise<ArtifactObjectMetadata | null> {
    return this.operation('head', async () => {
      const ref = validateArtifactStoreInput(() => artifactStorageRefSchema.parse(input));
      this.assertOwnedVersionedRef(ref);
      const state = await this.transport.head(this.transportRef(ref));
      if (!state) return null;
      this.assertRefMatchesState(ref, state);
      return s3ObjectMetadata(state);
    });
  }

  async exists(input: ArtifactStorageRef): Promise<boolean> {
    try {
      return (await this.head(input)) !== null;
    } catch (error) {
      if (
        error instanceof ArtifactStoreAdapterError &&
        error.normalizedError.code === 'ARTIFACT_VERSION_CONFLICT'
      ) {
        return false;
      }
      throw error;
    }
  }

  async delete(input: ArtifactStorageRef): Promise<void> {
    await this.operation('delete', async () => {
      const ref = validateArtifactStoreInput(() => artifactStorageRefSchema.parse(input));
      this.assertOwnedVersionedRef(ref);
      await this.transport.delete({
        bucket: this.bucket,
        key: ref.objectKey,
        versionId: ref.versionId,
        expectedEtag: ref.etag,
      });
    });
  }

  async copy(input: ArtifactCopyRequest): Promise<ArtifactStorageRef> {
    return this.operation('copy', async () => {
      const request = validateArtifactStoreInput(() => artifactCopyRequestSchema.parse(input));
      this.assertOwnedVersionedRef(request.source);
      const sourceState = await this.requireState(request.source);
      if (request.targetObjectKey === request.source.objectKey) return request.source;
      const result = await this.transport.copy({
        sourceBucket: this.bucket,
        sourceKey: request.source.objectKey,
        sourceVersionId: request.source.versionId,
        expectedSourceEtag: request.source.etag ?? sourceState.etag,
        targetBucket: this.bucket,
        targetKey: request.targetObjectKey,
        ifAbsent: request.ifAbsent ?? false,
      });
      this.assertCopyMatchesSource(result, sourceState);
      return this.storageRef(request.targetObjectKey, result.state);
    });
  }

  async createDownloadAccess(
    input: ArtifactDownloadAccessRequest
  ): Promise<ArtifactDownloadAccess> {
    return this.operation('createDownloadAccess', async () => {
      const request = validateArtifactStoreInput(() =>
        artifactDownloadAccessRequestSchema.parse(input)
      );
      this.assertOwnedVersionedRef(request.ref);
      const state = await this.requireState(request.ref);
      const access = await this.transport.createDownloadAccess({
        bucket: this.bucket,
        key: request.ref.objectKey,
        versionId: request.ref.versionId,
        expectedEtag: request.ref.etag ?? state.etag,
        expectedContentHash: requireS3ContentHash(state),
        expiresInSeconds: request.expiresInSeconds,
        responseMimeType: request.responseMimeType,
        responseFilename: request.responseFilename,
      });
      return access;
    });
  }

  async health(): Promise<ProviderHealth> {
    if (this.closed) {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        message: 'Artifact Store is closed.',
      };
    }
    try {
      // Health must reflect the current credential and bucket state rather
      // than a previously cached successful startup check.
      await this.transport.checkBucket(this.bucket);
      return {
        status: 'healthy',
        checkedAt: this.now(),
        details: {
          provider: 's3',
          versioningRequired: true,
          ...(this.region ? { region: this.region } : {}),
        },
      };
    } catch {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        message: 'S3 Artifact Store bucket readiness check failed.',
      };
    }
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    this.transport.close();
  }

  private async operation<T>(operation: string, action: () => Promise<T>): Promise<T> {
    try {
      this.assertOpen();
      await this.ensureReady();
      this.assertOpen();
      return await action();
    } catch (error) {
      throw normalizeS3ArtifactStoreError(error, operation);
    }
  }

  private assertOpen(): void {
    if (this.closed) {
      throw artifactStoreError('ARTIFACT_STORE_UNAVAILABLE', 'Artifact Store is closed.', false);
    }
  }

  private ensureReady(): Promise<void> {
    const readiness = this.readiness ?? this.transport.checkBucket(this.bucket);
    this.readiness = readiness;
    return readiness.catch((error: unknown) => {
      // A rotated credential can recover after a transient authentication
      // failure; do not permanently poison the Store with a rejected Promise.
      if (this.readiness === readiness) this.readiness = undefined;
      throw error;
    });
  }

  private assertOwnedVersionedRef(ref: ArtifactStorageRef): asserts ref is ArtifactStorageRef & {
    versionId: string;
  } {
    if (ref.storeId !== this.id) {
      throw artifactStoreError(
        'ARTIFACT_INVALID_INPUT',
        `Artifact reference belongs to Store ${ref.storeId}, not ${this.id}.`,
        false
      );
    }
    if (ref.bucketOrNamespace !== this.bucket) {
      throw artifactStoreError(
        'ARTIFACT_INVALID_INPUT',
        'Artifact reference does not belong to the configured S3 bucket.',
        false
      );
    }
    if (!ref.versionId?.trim()) {
      throw artifactStoreError(
        'ARTIFACT_INVALID_INPUT',
        'S3 Artifact references must include an immutable versionId.',
        false
      );
    }
  }

  private assertRefMatchesState(ref: ArtifactStorageRef, state: S3ArtifactObjectState): void {
    const stateVersionId = requireProviderIdentity(state.versionId, 'versionId');
    if (ref.versionId !== stateVersionId) {
      throw artifactStoreError(
        'ARTIFACT_VERSION_CONFLICT',
        'S3 returned a different Artifact object version.',
        false
      );
    }
    const expectedEtag = normalizeS3Etag(ref.etag);
    const actualEtag = requireProviderIdentity(normalizeS3Etag(state.etag), 'etag');
    if (expectedEtag && expectedEtag !== actualEtag) {
      throw artifactStoreError(
        'ARTIFACT_VERSION_CONFLICT',
        'Artifact reference no longer identifies the expected S3 object version.',
        false,
        { expectedEtag, actualEtag }
      );
    }
    requireS3ContentHash(state);
  }

  private async requireState(ref: ArtifactStorageRef): Promise<S3ArtifactObjectState> {
    this.assertOwnedVersionedRef(ref);
    const state = await this.transport.head(this.transportRef(ref));
    if (!state) {
      throw artifactStoreError('ARTIFACT_NOT_FOUND', 'S3 Artifact object was not found.', false);
    }
    this.assertRefMatchesState(ref, state);
    return state;
  }

  private async requirePublishedState(
    objectKey: string,
    versionId: string,
    etag: string,
    contentHash: string,
    sizeBytes: number
  ): Promise<S3ArtifactObjectState> {
    const state = await this.transport.head({ bucket: this.bucket, key: objectKey, versionId });
    if (!state) {
      throw artifactStoreError(
        'ARTIFACT_UPLOAD_FAILED',
        'S3 upload completed without a readable pinned object version.',
        true
      );
    }
    this.assertRefMatchesState(
      {
        storeId: this.id,
        bucketOrNamespace: this.bucket,
        objectKey,
        versionId,
        etag,
      },
      state
    );
    const actualContentHash = requireS3ContentHash(state);
    if (actualContentHash !== contentHash) throw hashMismatch(contentHash, actualContentHash);
    if (state.sizeBytes !== sizeBytes) {
      throw artifactStoreError(
        'ARTIFACT_HASH_MISMATCH',
        'Uploaded S3 Artifact size does not match staged content.',
        false,
        { expectedSizeBytes: sizeBytes, actualSizeBytes: state.sizeBytes }
      );
    }
    return state;
  }

  private assertCopyMatchesSource(
    result: S3ArtifactCopyResult,
    source: S3ArtifactObjectState
  ): void {
    requireProviderIdentity(result.versionId ?? result.state.versionId, 'versionId');
    requireProviderIdentity(normalizeS3Etag(result.etag ?? result.state.etag), 'etag');
    const sourceHash = requireS3ContentHash(source);
    const targetHash = requireS3ContentHash(result.state);
    if (sourceHash !== targetHash || source.sizeBytes !== result.state.sizeBytes) {
      throw artifactStoreError(
        'ARTIFACT_HASH_MISMATCH',
        'Copied S3 Artifact does not match its source.',
        false
      );
    }
  }

  private async rollbackFailedPut(
    objectKey: string,
    writeResult: S3ArtifactWriteResult,
    originalError: unknown
  ): Promise<void> {
    const originalCode =
      originalError instanceof ArtifactStoreAdapterError
        ? originalError.normalizedError.code
        : 'UNKNOWN';
    try {
      await this.transport.delete({
        bucket: this.bucket,
        key: objectKey,
        versionId: requireProviderIdentity(writeResult.versionId, 'versionId'),
        expectedEtag: writeResult.etag,
      });
    } catch {
      throw artifactStoreError(
        'ARTIFACT_DELETE_PARTIAL',
        'S3 upload verification failed and the exact uploaded version could not be removed.',
        true,
        { originalCode }
      );
    }
  }

  private transportRef(ref: ArtifactStorageRef & { versionId: string }): {
    bucket: string;
    key: string;
    versionId: string;
  } {
    return {
      bucket: this.bucket,
      key: ref.objectKey,
      versionId: ref.versionId,
    };
  }

  private storageRef(objectKey: string, state: S3ArtifactObjectState): ArtifactStorageRef {
    return {
      storeId: this.id,
      bucketOrNamespace: this.bucket,
      objectKey,
      versionId: requireProviderIdentity(state.versionId, 'versionId'),
      etag: requireProviderIdentity(normalizeS3Etag(state.etag), 'etag'),
      ...(this.region ? { region: this.region } : {}),
      encrypted: state.encrypted ?? false,
    };
  }
}

function assertDeclaredContent(
  request: ArtifactPutRequest,
  actualSizeBytes: number,
  actualContentHash: string
): void {
  if (request.sizeBytes !== undefined && request.sizeBytes !== actualSizeBytes) {
    throw artifactStoreError(
      'ARTIFACT_VALIDATION_FAILED',
      'Artifact size does not match the declared sizeBytes.',
      false,
      { expectedSizeBytes: request.sizeBytes, actualSizeBytes }
    );
  }
  if (
    request.expectedContentHash !== undefined &&
    request.expectedContentHash !== actualContentHash
  ) {
    throw hashMismatch(request.expectedContentHash, actualContentHash);
  }
}

function hashMismatch(expectedContentHash: string, actualContentHash: string): Error {
  return artifactStoreError(
    'ARTIFACT_HASH_MISMATCH',
    'Artifact bytes do not match expectedContentHash.',
    false,
    { expectedContentHash, actualContentHash }
  );
}

function requireProviderIdentity(value: string | undefined, name: string): string {
  if (!value?.trim()) {
    throw artifactStoreError(
      'ARTIFACT_VALIDATION_FAILED',
      `S3 did not return a valid ${name} for the pinned object version.`,
      false
    );
  }
  return value;
}

function optionalNonEmpty(value: string | undefined, name: string): string | undefined {
  if (value === undefined) return undefined;
  const normalized = value.trim();
  if (!normalized || normalized !== value) throw new TypeError(`${name} is invalid.`);
  return normalized;
}

function assertPositiveSafeInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer.`);
  }
}

function requireTransportOptions(
  value: MinioS3ArtifactTransportOptions | undefined
): MinioS3ArtifactTransportOptions {
  if (!value) throw new TypeError('transport or transportOptions is required.');
  return value;
}

function artifactRangeSize(range: { start: number; endInclusive?: number }): number {
  if (range.endInclusive === undefined) {
    throw artifactStoreError(
      'ARTIFACT_VALIDATION_FAILED',
      'S3 returned an incomplete normalized byte range.',
      false
    );
  }
  return range.endInclusive - range.start + 1;
}
