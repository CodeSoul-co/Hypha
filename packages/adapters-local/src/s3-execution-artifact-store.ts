import type {
  ArtifactContent,
  ArtifactCopyRequest,
  ArtifactDownloadAccess,
  ArtifactDownloadAccessRequest,
  ArtifactGetRequest,
  ArtifactObjectMetadata,
  ArtifactOperationOptions,
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
  S3ArtifactTransferAbortedError,
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
  requireS3OperationId,
  s3ObjectMetadata,
  type S3ArtifactObjectState,
} from './s3-artifact-store-values';

const DEFAULT_MAX_OBJECT_BYTES = 5 * 1024 * 1024 * 1024;
const DEFAULT_MAX_METADATA_BYTES = 2 * 1024;
const DEFAULT_VISIBILITY_VERIFICATION_ATTEMPTS = 4;
const DEFAULT_VISIBILITY_VERIFICATION_DELAY_MS = 25;

export const S3_EXECUTION_ARTIFACT_STORE_ID = 'artifact-store.s3.execution';

export interface S3ExecutionArtifactStoreOptions {
  id?: string;
  bucket: string;
  keyPrefix: string;
  region?: string;
  maxObjectBytes?: number;
  maxMetadataBytes?: number;
  minimumRetentionMs?: number;
  serverSideEncryption?: 'AES256';
  visibilityVerificationAttempts?: number;
  visibilityVerificationDelayMs?: number;
  now?: () => string;
  transport?: S3ArtifactTransport;
  transportOptions?: MinioS3ArtifactTransportOptions;
}

/**
 * Concrete, version-pinned S3 Artifact Store adapter.
 *
 * The adapter is composed through an explicit Factory/Registry path. Product
 * composition remains opt-in and must retain real MinIO acceptance evidence.
 */
export class S3ExecutionArtifactStore implements ArtifactStoreProvider {
  readonly id: string;
  private readonly bucket: string;
  private readonly keyPrefix: string;
  private readonly region?: string;
  private readonly maxObjectBytes: number;
  private readonly maxMetadataBytes: number;
  private readonly minimumRetentionMs: number;
  private readonly serverSideEncryption?: 'AES256';
  private readonly visibilityVerificationAttempts: number;
  private readonly visibilityVerificationDelayMs: number;
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

    this.id = options.id ?? S3_EXECUTION_ARTIFACT_STORE_ID;
    this.bucket = bucket;
    this.keyPrefix = normalizeKeyPrefix(options.keyPrefix);
    this.region = optionalNonEmpty(options.region, 'region');
    this.maxObjectBytes = options.maxObjectBytes ?? DEFAULT_MAX_OBJECT_BYTES;
    this.maxMetadataBytes = options.maxMetadataBytes ?? DEFAULT_MAX_METADATA_BYTES;
    this.minimumRetentionMs = options.minimumRetentionMs ?? 0;
    this.serverSideEncryption = options.serverSideEncryption;
    this.visibilityVerificationAttempts =
      options.visibilityVerificationAttempts ?? DEFAULT_VISIBILITY_VERIFICATION_ATTEMPTS;
    this.visibilityVerificationDelayMs =
      options.visibilityVerificationDelayMs ?? DEFAULT_VISIBILITY_VERIFICATION_DELAY_MS;
    assertPositiveSafeInteger(this.maxObjectBytes, 'maxObjectBytes');
    assertPositiveSafeInteger(this.maxMetadataBytes, 'maxMetadataBytes');
    assertNonNegativeSafeInteger(this.minimumRetentionMs, 'minimumRetentionMs');
    assertPositiveSafeInteger(
      this.visibilityVerificationAttempts,
      'visibilityVerificationAttempts'
    );
    assertNonNegativeSafeInteger(
      this.visibilityVerificationDelayMs,
      'visibilityVerificationDelayMs'
    );
    if (
      this.serverSideEncryption !== undefined &&
      this.serverSideEncryption !== 'AES256'
    ) {
      throw new TypeError('serverSideEncryption is invalid.');
    }
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
      encryption: this.serverSideEncryption !== undefined,
      multipartUpload: true,
      contentAddressing: true,
    };
  }

  async put(
    input: ArtifactPutRequest,
    options: ArtifactOperationOptions = {}
  ): Promise<ArtifactStorageRef> {
    return this.operation(
      'put',
      async () => {
        const request = validateArtifactStoreInput(() => validateArtifactPutRequest(input));
        this.assertScopedObjectKey(request.objectKey);
        let staged;
        try {
          staged = await stageS3ArtifactContent(
            request.content,
            this.maxObjectBytes,
            options.abortSignal
          );
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
              request.operationId,
              request.metadata,
              this.maxMetadataBytes
            ),
            serverSideEncryption: this.serverSideEncryption,
            ifAbsent: request.ifAbsent ?? false,
            abortSignal: options.abortSignal,
          });
          assertNotAborted(options.abortSignal);
          const versionId = requireProviderIdentity(writeResult.versionId, 'versionId');
          const etag = requireProviderIdentity(normalizeS3Etag(writeResult.etag), 'etag');
          const state = await this.requirePublishedState(
            request.objectKey,
            versionId,
            etag,
            staged.contentHash,
            staged.sizeBytes,
            request.operationId
          );
          assertNotAborted(options.abortSignal);
          return this.storageRef(request.objectKey, state);
        } catch (error) {
          if (writeResult?.versionId) {
            await this.rollbackFailedPut(request.objectKey, writeResult, error);
          } else {
            const reconciled = await this.reconcileAmbiguousPut(
              request.objectKey,
              request.operationId,
              staged.contentHash,
              staged.sizeBytes,
              error
            );
            if (reconciled) return this.storageRef(request.objectKey, reconciled);
          }
          throw error;
        } finally {
          await staged.cleanup();
        }
      },
      options.abortSignal
    );
  }

  async get(
    input: ArtifactGetRequest,
    options: ArtifactOperationOptions = {}
  ): Promise<ArtifactContent> {
    return this.operation(
      'get',
      async () => {
        const request = validateArtifactStoreInput(() => validateArtifactGetRequest(input));
        this.assertOwnedVersionedRef(request.ref);
        const result = await this.transport.get({
          bucket: this.bucket,
          key: request.ref.objectKey,
          versionId: request.ref.versionId,
          expectedEtag: request.ref.etag,
          expectedContentHash: request.expectedContentHash,
          range: request.range,
          abortSignal: options.abortSignal,
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
      },
      options.abortSignal
    );
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
      await this.assertDeleteRetentionElapsed(ref);
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
      this.assertScopedObjectKey(request.targetObjectKey);
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
          keyPrefix: this.keyPrefix,
          encryption: this.serverSideEncryption ?? 'none',
          minimumRetentionMs: this.minimumRetentionMs,
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

  private async operation<T>(
    operation: string,
    action: () => Promise<T>,
    abortSignal?: AbortSignal
  ): Promise<T> {
    try {
      this.assertOpen();
      assertNotAborted(abortSignal);
      await this.ensureReady();
      this.assertOpen();
      assertNotAborted(abortSignal);
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
    this.assertScopedObjectKey(ref.objectKey);
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
    if (this.serverSideEncryption && state.encrypted !== true) {
      throw artifactStoreError(
        'ARTIFACT_VALIDATION_FAILED',
        'S3 Artifact object is not protected by the configured server-side encryption.',
        false
      );
    }
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
    sizeBytes: number,
    operationId: string
  ): Promise<S3ArtifactObjectState> {
    const state = await this.waitForVisibleState({ objectKey, versionId });
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
    if (requireS3OperationId(state) !== operationId) {
      throw artifactStoreError(
        'ARTIFACT_VERSION_CONFLICT',
        'Published S3 Artifact belongs to a different operation.',
        false
      );
    }
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

  /**
   * The operation id stored with the remote object acts as a durable,
   * provider-side journal receipt. A retryable transport failure can therefore
   * reconcile an upload that committed remotely but lost its client response.
   */
  private async reconcileAmbiguousPut(
    objectKey: string,
    operationId: string,
    contentHash: string,
    sizeBytes: number,
    originalError: unknown
  ): Promise<S3ArtifactObjectState | null> {
    const normalized = normalizeS3ArtifactStoreError(originalError, 'put');
    if (!normalized.normalizedError.retryable) return null;
    let state: S3ArtifactObjectState | null;
    try {
      state = await this.waitForVisibleState({ objectKey });
    } catch {
      return null;
    }
    if (!state) return null;
    try {
      if (
        requireS3OperationId(state) !== operationId ||
        requireS3ContentHash(state) !== contentHash ||
        state.sizeBytes !== sizeBytes
      ) {
        return null;
      }
      requireProviderIdentity(state.versionId, 'versionId');
      requireProviderIdentity(normalizeS3Etag(state.etag), 'etag');
      if (this.serverSideEncryption && state.encrypted !== true) return null;
      return state;
    } catch {
      return null;
    }
  }

  private async waitForVisibleState(input: {
    objectKey: string;
    versionId?: string;
  }): Promise<S3ArtifactObjectState | null> {
    for (let attempt = 1; attempt <= this.visibilityVerificationAttempts; attempt += 1) {
      const state = await this.transport.head({
        bucket: this.bucket,
        key: input.objectKey,
        ...(input.versionId ? { versionId: input.versionId } : {}),
      });
      if (state) return state;
      if (attempt < this.visibilityVerificationAttempts) {
        await delay(this.visibilityVerificationDelayMs);
      }
    }
    return null;
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
    if (this.serverSideEncryption && result.state.encrypted !== true) {
      throw artifactStoreError(
        'ARTIFACT_VALIDATION_FAILED',
        'Copied S3 Artifact is not protected by the configured server-side encryption.',
        false
      );
    }
  }

  private async assertDeleteRetentionElapsed(
    ref: ArtifactStorageRef & { versionId: string }
  ): Promise<void> {
    if (this.minimumRetentionMs === 0) return;
    const state = await this.requireState(ref);
    const createdAt = Date.parse(state.lastModifiedAt ?? '');
    const now = Date.parse(this.now());
    if (!Number.isFinite(createdAt) || !Number.isFinite(now)) {
      throw artifactStoreError(
        'ARTIFACT_VALIDATION_FAILED',
        'S3 Artifact retention timestamps are invalid.',
        false
      );
    }
    const retainedUntil = createdAt + this.minimumRetentionMs;
    if (now < retainedUntil) {
      throw artifactStoreError(
        'ARTIFACT_PERMISSION_DENIED',
        'S3 Artifact version is still protected by the configured delete retention.',
        false,
        { retainedUntilAt: new Date(retainedUntil).toISOString() }
      );
    }
  }

  private assertScopedObjectKey(objectKey: string): void {
    assertS3ObjectKey(objectKey);
    if (!objectKey.startsWith(`${this.keyPrefix}/`)) {
      throw artifactStoreError(
        'ARTIFACT_INVALID_INPUT',
        'S3 Artifact object key is outside the configured tenant prefix.',
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

function assertNonNegativeSafeInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative safe integer.`);
  }
}

function normalizeKeyPrefix(value: string): string {
  const normalized = value?.trim().replace(/\/+$/u, '');
  if (!normalized || normalized !== value) {
    throw new TypeError('keyPrefix is invalid.');
  }
  assertS3ObjectKey(`${normalized}/scope-check`);
  return normalized;
}

function assertS3ObjectKey(value: string): void {
  if (
    value.length === 0 ||
    Buffer.byteLength(value, 'utf8') > 1024 ||
    value.startsWith('/') ||
    value.endsWith('/') ||
    value.includes('\\') ||
    value.split('/').some((segment) => segment.length === 0 || segment === '.' || segment === '..') ||
    Array.from(value).some((character) => {
      const codePoint = character.codePointAt(0);
      return codePoint === undefined || codePoint <= 31 || codePoint === 127;
    })
  ) {
    throw artifactStoreError(
      'ARTIFACT_INVALID_INPUT',
      'S3 Artifact object key is invalid.',
      false
    );
  }
}

function assertNotAborted(abortSignal: AbortSignal | undefined): void {
  if (abortSignal?.aborted) throw new S3ArtifactTransferAbortedError();
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

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
