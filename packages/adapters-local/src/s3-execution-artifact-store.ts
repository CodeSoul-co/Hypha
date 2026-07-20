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
import { artifactStoreError, validateArtifactStoreInput } from './artifact-store-adapter-error';
import { stageS3ArtifactContent } from './s3-artifact-staging';
import {
  AwsSdkS3ArtifactStoreTransport,
  type AwsSdkS3ArtifactStoreTransportOptions,
  type S3ArtifactObjectState,
  type S3ArtifactStoreTransport,
} from './s3-artifact-store-transport';
import {
  encodeS3ArtifactMetadata,
  normalizeS3ArtifactRange,
  normalizeS3ArtifactStoreError,
  normalizeS3Etag,
  quoteS3Etag,
  requireS3ContentHash,
  s3ObjectMetadata,
  verifyS3ArtifactStream,
} from './s3-artifact-store-values';

export interface S3ExecutionArtifactStoreOptions extends AwsSdkS3ArtifactStoreTransportOptions {
  id?: string;
  bucket: string;
  versioning?: boolean;
  maxObjectBytes?: number;
  maxMetadataBytes?: number;
  now?: () => string;
  transport?: S3ArtifactStoreTransport;
}

export class S3ExecutionArtifactStore implements ArtifactStoreProvider {
  readonly id: string;
  private readonly bucket: string;
  private readonly region?: string;
  private readonly versioning: boolean;
  private readonly encrypted: boolean;
  private readonly maxObjectBytes: number;
  private readonly maxMetadataBytes: number;
  private readonly now: () => string;
  private readonly transport: S3ArtifactStoreTransport;
  private closed = false;

  constructor(options: S3ExecutionArtifactStoreOptions) {
    if (!options.bucket?.trim()) throw new TypeError('bucket is required.');
    this.id = options.id ?? 'artifact-store.s3.execution';
    this.bucket = options.bucket.trim();
    this.region = options.region?.trim() || undefined;
    this.versioning = options.versioning ?? false;
    this.encrypted = Boolean(options.serverSideEncryption);
    this.maxObjectBytes = options.maxObjectBytes ?? 5 * 1024 * 1024 * 1024;
    this.maxMetadataBytes = options.maxMetadataBytes ?? 2048;
    assertPositiveSafeInteger(this.maxObjectBytes, 'maxObjectBytes');
    assertPositiveSafeInteger(this.maxMetadataBytes, 'maxMetadataBytes');
    this.now = options.now ?? (() => new Date().toISOString());
    this.transport = options.transport ?? new AwsSdkS3ArtifactStoreTransport(options);
  }

  async capabilities(): Promise<ArtifactStoreCapabilities> {
    return {
      versioning: this.versioning,
      rangeRead: true,
      signedAccess: true,
      serverSideCopy: true,
      encryption: this.encrypted,
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

      try {
        this.assertOpen();
        if (request.sizeBytes !== undefined && request.sizeBytes !== staged.sizeBytes) {
          throw artifactStoreError(
            'ARTIFACT_VALIDATION_FAILED',
            'Artifact size does not match the declared sizeBytes.',
            false,
            { expectedSizeBytes: request.sizeBytes, actualSizeBytes: staged.sizeBytes }
          );
        }
        if (request.expectedContentHash && request.expectedContentHash !== staged.contentHash) {
          throw artifactStoreError(
            'ARTIFACT_HASH_MISMATCH',
            'Artifact bytes do not match expectedContentHash.',
            false,
            {
              expectedContentHash: request.expectedContentHash,
              actualContentHash: staged.contentHash,
            }
          );
        }
        const result = await this.transport.upload({
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
        return this.storageRef(request.objectKey, result);
      } finally {
        await staged.cleanup();
      }
    });
  }

  async get(input: ArtifactGetRequest): Promise<ArtifactContent> {
    return this.operation('get', async () => {
      const request = validateArtifactStoreInput(() => validateArtifactGetRequest(input));
      this.assertOwnedRef(request.ref);
      const state = await this.requireState(request.ref);
      const contentHash = requireS3ContentHash(state);
      if (request.expectedContentHash && request.expectedContentHash !== contentHash) {
        throw artifactStoreError(
          'ARTIFACT_HASH_MISMATCH',
          'Stored Artifact does not match expectedContentHash.',
          false,
          { expectedContentHash: request.expectedContentHash, actualContentHash: contentHash }
        );
      }
      const selected = normalizeS3ArtifactRange(request.range, state.sizeBytes);
      const result = await this.transport.get({
        bucket: this.bucket,
        key: request.ref.objectKey,
        versionId: request.ref.versionId,
        ifMatch: quoteS3Etag(request.ref.etag ?? state.etag),
        range: selected.header,
      });
      return {
        stream: verifyS3ArtifactStream(
          result.stream,
          contentHash,
          selected.sizeBytes,
          !selected.range
        ),
        contentHash,
        sizeBytes: selected.sizeBytes,
        mimeType: state.mimeType,
        etag: normalizeS3Etag(state.etag),
        range: selected.range,
      };
    });
  }

  async head(input: ArtifactStorageRef): Promise<ArtifactObjectMetadata | null> {
    return this.operation('head', async () => {
      const ref = validateArtifactStoreInput(() => artifactStorageRefSchema.parse(input));
      this.assertOwnedRef(ref);
      const state = await this.transport.head(this.transportRef(ref));
      return state ? s3ObjectMetadata(state) : null;
    });
  }

  async exists(input: ArtifactStorageRef): Promise<boolean> {
    try {
      return (await this.head(input)) !== null;
    } catch (error) {
      if (
        error instanceof Error &&
        'normalizedError' in error &&
        (error as { normalizedError: { code: string } }).normalizedError.code ===
          'ARTIFACT_VERSION_CONFLICT'
      ) {
        return false;
      }
      throw error;
    }
  }

  async delete(input: ArtifactStorageRef): Promise<void> {
    await this.operation('delete', async () => {
      const ref = validateArtifactStoreInput(() => artifactStorageRefSchema.parse(input));
      this.assertOwnedRef(ref);
      await this.transport.delete({
        bucket: this.bucket,
        key: ref.objectKey,
        versionId: ref.versionId,
        ifMatch: quoteS3Etag(ref.etag),
      });
    });
  }

  async copy(input: ArtifactCopyRequest): Promise<ArtifactStorageRef> {
    return this.operation('copy', async () => {
      const request = validateArtifactStoreInput(() => artifactCopyRequestSchema.parse(input));
      this.assertOwnedRef(request.source);
      const source = await this.requireState(request.source);
      if (request.targetObjectKey === request.source.objectKey) return request.source;
      const result = await this.transport.copy({
        bucket: this.bucket,
        sourceKey: request.source.objectKey,
        sourceVersionId: request.source.versionId,
        sourceIfMatch: quoteS3Etag(request.source.etag ?? source.etag),
        targetKey: request.targetObjectKey,
        ifAbsent: request.ifAbsent ?? false,
      });
      return this.storageRef(request.targetObjectKey, result);
    });
  }

  async createDownloadAccess(
    input: ArtifactDownloadAccessRequest
  ): Promise<ArtifactDownloadAccess> {
    return this.operation('createDownloadAccess', async () => {
      const request = validateArtifactStoreInput(() =>
        artifactDownloadAccessRequestSchema.parse(input)
      );
      this.assertOwnedRef(request.ref);
      const state = await this.requireState(request.ref);
      const access = await this.transport.createDownloadUrl({
        bucket: this.bucket,
        key: request.ref.objectKey,
        versionId: request.ref.versionId,
        ifMatch: quoteS3Etag(request.ref.etag ?? state.etag),
        expiresInSeconds: request.expiresInSeconds,
        responseMimeType: request.responseMimeType,
        responseFilename: request.responseFilename,
      });
      return {
        method: 'GET',
        url: access.url,
        expiresAt: new Date(Date.parse(this.now()) + request.expiresInSeconds * 1000).toISOString(),
        ...(access.headers ? { headers: access.headers } : {}),
      };
    });
  }

  async health(): Promise<ProviderHealth> {
    if (this.closed) {
      return { status: 'unhealthy', checkedAt: this.now(), message: 'Artifact Store is closed.' };
    }
    try {
      await this.transport.checkBucket(this.bucket);
      return {
        status: 'healthy',
        checkedAt: this.now(),
        details: { bucket: this.bucket, ...(this.region ? { region: this.region } : {}) },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        message: error instanceof Error ? error.message : String(error),
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

  private assertOwnedRef(ref: ArtifactStorageRef): void {
    if (ref.storeId !== this.id) {
      throw artifactStoreError(
        'ARTIFACT_INVALID_INPUT',
        `Artifact reference belongs to Store ${ref.storeId}, not ${this.id}.`,
        false
      );
    }
    if (ref.bucketOrNamespace && ref.bucketOrNamespace !== this.bucket) {
      throw artifactStoreError(
        'ARTIFACT_INVALID_INPUT',
        `Artifact reference belongs to bucket ${ref.bucketOrNamespace}, not ${this.bucket}.`,
        false
      );
    }
  }

  private async requireState(ref: ArtifactStorageRef): Promise<S3ArtifactObjectState> {
    const state = await this.transport.head(this.transportRef(ref));
    if (!state) {
      throw artifactStoreError(
        'ARTIFACT_NOT_FOUND',
        `Artifact object ${ref.objectKey} was not found.`,
        false
      );
    }
    return state;
  }

  private transportRef(ref: ArtifactStorageRef): {
    bucket: string;
    key: string;
    versionId?: string;
    ifMatch?: string;
  } {
    return {
      bucket: this.bucket,
      key: ref.objectKey,
      versionId: ref.versionId,
      ifMatch: quoteS3Etag(ref.etag),
    };
  }

  private storageRef(
    objectKey: string,
    state: { etag?: string; versionId?: string; encrypted?: boolean }
  ): ArtifactStorageRef {
    return {
      storeId: this.id,
      bucketOrNamespace: this.bucket,
      objectKey,
      versionId: state.versionId,
      etag: normalizeS3Etag(state.etag),
      region: this.region,
      encrypted: state.encrypted ?? this.encrypted,
    };
  }
}

function assertPositiveSafeInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer.`);
  }
}
