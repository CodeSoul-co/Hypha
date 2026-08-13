import { PassThrough, type Readable } from 'node:stream';
import type { ArtifactByteRange } from '@codesoul-co/core';
import { Client, CopyDestinationOptions, CopySourceOptions } from 'minio';
import {
  normalizeS3ArtifactClientConfig,
  S3ArtifactConfigurationError,
  S3ArtifactCredentialError,
  type NormalizedS3ArtifactClientConfig,
  type S3ArtifactClientConfigInput,
  type S3ArtifactCredentials,
} from './s3-artifact-store-config';
import { artifactStoreError } from './artifact-store-adapter-error';
import {
  normalizeS3ArtifactRange,
  normalizeS3Etag,
  quoteS3Etag,
  requireS3ContentHash,
  type S3ArtifactObjectState,
  verifyS3ArtifactStream,
} from './s3-artifact-store-values';

const DEFAULT_REQUEST_TIMEOUT_MS = 60_000;
const DEFAULT_CONSISTENCY_VERIFICATION_ATTEMPTS = 4;
const DEFAULT_CONSISTENCY_VERIFICATION_DELAY_MS = 25;
const MIN_MULTIPART_PART_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_SIGNED_DOWNLOAD_TTL_SECONDS = 7 * 24 * 60 * 60;

export interface S3ArtifactWriteResult {
  etag?: string;
  versionId?: string;
}

export interface S3ArtifactReadResult {
  state: S3ArtifactObjectState;
  stream: AsyncIterable<Uint8Array>;
  range?: ArtifactByteRange;
}

export interface S3ArtifactCopyResult extends S3ArtifactWriteResult {
  state: S3ArtifactObjectState;
}

export interface S3ArtifactDownloadAccess {
  method: 'GET';
  url: string;
  expiresAt: string;
}

export interface S3ArtifactTransport {
  upload(input: {
    bucket: string;
    key: string;
    body: Readable;
    contentLength: number;
    contentType?: string;
    metadata: Record<string, string>;
    serverSideEncryption?: 'AES256';
    ifAbsent: boolean;
    abortSignal?: AbortSignal;
  }): Promise<S3ArtifactWriteResult>;
  head(input: {
    bucket: string;
    key: string;
    versionId?: string;
  }): Promise<S3ArtifactObjectState | null>;
  get(input: {
    bucket: string;
    key: string;
    versionId?: string;
    expectedEtag?: string;
    expectedContentHash?: string;
    range?: ArtifactByteRange;
    abortSignal?: AbortSignal;
  }): Promise<S3ArtifactReadResult>;
  delete(input: {
    bucket: string;
    key: string;
    versionId: string;
    expectedEtag?: string;
  }): Promise<boolean>;
  copy(input: {
    sourceBucket: string;
    sourceKey: string;
    sourceVersionId?: string;
    expectedSourceEtag?: string;
    targetBucket: string;
    targetKey: string;
    ifAbsent: boolean;
  }): Promise<S3ArtifactCopyResult>;
  createDownloadAccess(input: {
    bucket: string;
    key: string;
    versionId: string;
    expectedEtag?: string;
    expectedContentHash?: string;
    expiresInSeconds: number;
    responseMimeType?: string;
    responseFilename?: string;
  }): Promise<S3ArtifactDownloadAccess>;
  checkBucket(bucket: string): Promise<void>;
  close(): void;
}

interface MinioObjectStat {
  size: number;
  etag: string;
  lastModified: Date;
  metaData: unknown;
  versionId?: string | null;
}

interface MinioArtifactClient {
  putObject(
    bucket: string,
    key: string,
    body: Readable,
    size: number,
    metadata: Record<string, string>
  ): Promise<{ etag: string; versionId: string | null }>;
  removeIncompleteUpload(bucket: string, key: string): Promise<void>;
  bucketExists(bucket: string): Promise<boolean>;
  getBucketVersioning(bucket: string): Promise<{ Status?: string }>;
  statObject(
    bucket: string,
    key: string,
    options?: { versionId?: string }
  ): Promise<MinioObjectStat>;
  getObject(bucket: string, key: string, options?: { versionId?: string }): Promise<Readable>;
  getPartialObject(
    bucket: string,
    key: string,
    offset: number,
    length?: number,
    options?: { versionId?: string }
  ): Promise<Readable>;
  removeObject(bucket: string, key: string, options?: { versionId?: string }): Promise<void>;
  copyObject(
    source: CopySourceOptions,
    destination: CopyDestinationOptions
  ): Promise<MinioCopyResult>;
  presignedUrl(
    method: string,
    bucket: string,
    key: string,
    expiresInSeconds: number,
    requestParameters?: Record<string, string>,
    requestDate?: Date
  ): Promise<string>;
}

interface MinioCopyResult {
  etag?: string;
  Etag?: string;
  VersionId?: string | null;
}

interface MinioClientOptions {
  endPoint: string;
  port: number;
  useSSL: boolean;
  region: string;
  pathStyle: boolean;
  partSize: number;
  accessKey: string;
  secretKey: string;
  sessionToken?: string;
  retryOptions: {
    maximumRetryCount: number;
  };
}

type MinioClientFactory = (options: MinioClientOptions) => MinioArtifactClient;

export interface MinioS3ArtifactTransportOptions extends S3ArtifactClientConfigInput {
  multipartPartSizeBytes?: number;
  requestTimeoutMs?: number;
  maximumRetryCount?: number;
  consistencyVerificationAttempts?: number;
  consistencyVerificationDelayMs?: number;
  clientFactory?: MinioClientFactory;
  now?: () => Date;
}

export class S3ArtifactTransferAbortedError extends Error {
  readonly code = 'S3_ARTIFACT_TRANSFER_ABORTED';

  constructor() {
    super('S3 Artifact transfer was aborted.');
    this.name = 'S3ArtifactTransferAbortedError';
  }
}

export class S3ArtifactTransferTimeoutError extends Error {
  readonly code = 'S3_ARTIFACT_TRANSFER_TIMEOUT';

  constructor() {
    super('S3 Artifact transfer timed out.');
    this.name = 'S3ArtifactTransferTimeoutError';
  }
}

export class S3ArtifactUploadCleanupError extends Error {
  readonly code = 'S3_ARTIFACT_UPLOAD_CLEANUP_FAILED';

  constructor() {
    super('S3 Artifact multipart cleanup failed.');
    this.name = 'S3ArtifactUploadCleanupError';
  }
}

/**
 * The MinIO multipart implementation observes errors from its internal
 * BlockStream, but not errors emitted by the caller's source stream. Capture
 * that downstream stream so cancellation and timeouts reject the SDK promise
 * instead of becoming unhandled source errors.
 */
class InterruptibleS3UploadBody extends PassThrough {
  private readonly source: Readable;
  private destination?: NodeJS.WritableStream & { destroy(error?: Error): void };
  private interruption?: Error;
  private readonly sourceError = (error: Error): void => {
    this.interrupt(error);
  };

  constructor(source: Readable) {
    super();
    this.source = source;
    // The operation still fails through the captured SDK destination. This
    // listener only prevents the mirrored source error from being unhandled.
    this.on('error', () => undefined);
    source.once('error', this.sourceError);
    source.pipe(this);
  }

  override pipe<T extends NodeJS.WritableStream>(
    destination: T,
    options?: { end?: boolean }
  ): T {
    if (isDestroyableWritable(destination)) {
      this.destination = destination;
      if (this.interruption) {
        const error = this.interruption;
        queueMicrotask(() => destination.destroy(error));
      }
    }
    return super.pipe(destination, options);
  }

  interrupt(error: Error): void {
    if (this.interruption) return;
    this.interruption = error;
    this.destination?.destroy(error);
    this.destroy(error);
    this.source.destroy();
  }

  dispose(): void {
    this.source.removeListener('error', this.sourceError);
    this.source.unpipe(this);
    if (!this.destroyed) this.destroy();
    if (!this.source.destroyed) this.source.destroy();
  }
}

/**
 * S3 transport boundary used while the concrete Store is rebuilt.
 * A client is created per operation so the configured credential provider is
 * resolved each time; this keeps short-lived credentials rotatable without
 * storing them in long-lived adapter state.
 */
export class MinioS3ArtifactTransport implements S3ArtifactTransport {
  private readonly config: NormalizedS3ArtifactClientConfig;
  private readonly multipartPartSizeBytes: number;
  private readonly requestTimeoutMs: number;
  private readonly maximumRetryCount: number;
  private readonly consistencyVerificationAttempts: number;
  private readonly consistencyVerificationDelayMs: number;
  private readonly clientFactory: MinioClientFactory;
  private readonly now: () => Date;
  private closed = false;

  constructor(options: MinioS3ArtifactTransportOptions) {
    this.config = normalizeS3ArtifactClientConfig(options);
    if (!this.config.credentialProvider) {
      throw new S3ArtifactConfigurationError(
        'S3 upload transport requires an explicit credential provider.'
      );
    }
    this.multipartPartSizeBytes = options.multipartPartSizeBytes ?? 8 * 1024 * 1024;
    this.requestTimeoutMs = options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS;
    this.maximumRetryCount = options.maximumRetryCount ?? 1;
    this.consistencyVerificationAttempts =
      options.consistencyVerificationAttempts ?? DEFAULT_CONSISTENCY_VERIFICATION_ATTEMPTS;
    this.consistencyVerificationDelayMs =
      options.consistencyVerificationDelayMs ?? DEFAULT_CONSISTENCY_VERIFICATION_DELAY_MS;
    assertSafeIntegerAtLeast(
      this.multipartPartSizeBytes,
      MIN_MULTIPART_PART_SIZE_BYTES,
      'multipartPartSizeBytes'
    );
    assertPositiveSafeInteger(this.requestTimeoutMs, 'requestTimeoutMs');
    assertNonNegativeSafeInteger(this.maximumRetryCount, 'maximumRetryCount');
    assertPositiveSafeInteger(
      this.consistencyVerificationAttempts,
      'consistencyVerificationAttempts'
    );
    assertNonNegativeSafeInteger(
      this.consistencyVerificationDelayMs,
      'consistencyVerificationDelayMs'
    );
    this.clientFactory = options.clientFactory ?? defaultMinioClientFactory;
    this.now = options.now ?? (() => new Date());
  }

  async upload(
    input: Parameters<S3ArtifactTransport['upload']>[0]
  ): Promise<S3ArtifactWriteResult> {
    this.assertOpen();
    assertBucketAndKey(input.bucket, input.key);
    if (!Number.isSafeInteger(input.contentLength) || input.contentLength < 0) {
      throw new TypeError('contentLength must be a non-negative safe integer.');
    }
    if (input.abortSignal?.aborted) throw new S3ArtifactTransferAbortedError();

    const client = await this.createClient();
    const uploadBody = new InterruptibleS3UploadBody(input.body);
    const metadata = {
      ...input.metadata,
      ...(input.contentType ? { 'Content-Type': input.contentType } : {}),
      ...(input.serverSideEncryption
        ? { 'x-amz-server-side-encryption': input.serverSideEncryption }
        : {}),
      ...(input.ifAbsent ? { 'If-None-Match': '*' } : {}),
    };
    let interruption: S3ArtifactTransferAbortedError | S3ArtifactTransferTimeoutError | undefined;
    const abort = (): void => {
      interruption ??= new S3ArtifactTransferAbortedError();
      uploadBody.interrupt(interruption);
    };
    input.abortSignal?.addEventListener('abort', abort, { once: true });
    const timeout = setTimeout(() => {
      interruption ??= new S3ArtifactTransferTimeoutError();
      uploadBody.interrupt(interruption);
    }, this.requestTimeoutMs);

    try {
      const result = await client.putObject(
        input.bucket,
        input.key,
        uploadBody,
        input.contentLength,
        metadata
      );
      if (interruption) {
        await cleanupCompletedInterruptedUpload(client, input.bucket, input.key, result);
        throw interruption;
      }
      return {
        ...(result.etag ? { etag: result.etag } : {}),
        ...(result.versionId ? { versionId: result.versionId } : {}),
      };
    } catch (error) {
      await cleanupIncompleteUpload(client, input.bucket, input.key);
      if (error instanceof S3ArtifactUploadCleanupError) throw error;
      throw interruption ?? error;
    } finally {
      clearTimeout(timeout);
      input.abortSignal?.removeEventListener('abort', abort);
      uploadBody.dispose();
    }
  }

  async head(
    input: Parameters<S3ArtifactTransport['head']>[0]
  ): Promise<S3ArtifactObjectState | null> {
    this.assertOpen();
    assertBucketAndKey(input.bucket, input.key);
    const client = await this.createClient();
    try {
      return s3StateFromStat(
        await client.statObject(input.bucket, input.key, versionOptions(input.versionId))
      );
    } catch (error) {
      if (isMissingObject(error)) return null;
      throw error;
    }
  }

  async get(input: Parameters<S3ArtifactTransport['get']>[0]): Promise<S3ArtifactReadResult> {
    this.assertOpen();
    assertBucketAndKey(input.bucket, input.key);
    if (input.abortSignal?.aborted) throw new S3ArtifactTransferAbortedError();

    const client = await this.createClient();
    const options = versionOptions(input.versionId);
    const initialState = s3StateFromStat(await client.statObject(input.bucket, input.key, options));
    assertExpectedObjectIdentity(initialState, input.expectedEtag, input.expectedContentHash);
    const contentHash = requireS3ContentHash(initialState);
    const normalizedRange = normalizeS3ArtifactRange(input.range, initialState.sizeBytes);
    const stream = normalizedRange.range
      ? await client.getPartialObject(
          input.bucket,
          input.key,
          normalizedRange.range.start,
          normalizedRange.sizeBytes,
          options
        )
      : await client.getObject(input.bucket, input.key, options);

    return {
      state: initialState,
      stream: guardS3Download({
        stream,
        expectedContentHash: contentHash,
        expectedSizeBytes: normalizedRange.sizeBytes,
        verifyHash: normalizedRange.range === undefined,
        abortSignal: input.abortSignal,
        requestTimeoutMs: this.requestTimeoutMs,
        verifyUnchanged: async () => {
          const finalState = s3StateFromStat(
            await client.statObject(input.bucket, input.key, options)
          );
          if (!sameS3ObjectIdentity(initialState, finalState)) {
            throw artifactStoreError(
              'ARTIFACT_VERSION_CONFLICT',
              'S3 Artifact object changed during download.',
              true
            );
          }
        },
      }),
      ...(normalizedRange.range ? { range: normalizedRange.range } : {}),
    };
  }

  async delete(input: Parameters<S3ArtifactTransport['delete']>[0]): Promise<boolean> {
    this.assertOpen();
    assertBucketAndKey(input.bucket, input.key);
    const versionId = requireMutationVersion(input.versionId, 'delete');
    const client = await this.createClient();
    let current: S3ArtifactObjectState;
    try {
      current = s3StateFromStat(await client.statObject(input.bucket, input.key, { versionId }));
    } catch (error) {
      if (isMissingObject(error)) return false;
      throw error;
    }
    assertExpectedObjectIdentity(current, input.expectedEtag, undefined);

    await client.removeObject(input.bucket, input.key, { versionId });
    for (
      let attempt = 1;
      attempt <= this.consistencyVerificationAttempts;
      attempt += 1
    ) {
      try {
        await client.statObject(input.bucket, input.key, { versionId });
      } catch (error) {
        if (isMissingObject(error)) return true;
        throw error;
      }
      if (attempt < this.consistencyVerificationAttempts) {
        await delay(this.consistencyVerificationDelayMs);
      }
    }
    throw artifactStoreError(
      'ARTIFACT_DELETE_PARTIAL',
      'S3 reported a successful delete but the pinned object version still exists.',
      true
    );
  }

  async copy(input: Parameters<S3ArtifactTransport['copy']>[0]): Promise<S3ArtifactCopyResult> {
    this.assertOpen();
    assertBucketAndKey(input.sourceBucket, input.sourceKey);
    assertBucketAndKey(input.targetBucket, input.targetKey);
    const sourceVersionId = optionalNonEmpty(input.sourceVersionId, 'sourceVersionId');
    const sourceEtag = normalizeS3Etag(input.expectedSourceEtag);
    if (!sourceVersionId && !sourceEtag) {
      throw new TypeError('S3 copy requires a sourceVersionId or expectedSourceEtag.');
    }

    const client = await this.createClient();
    const sourceState = s3StateFromStat(
      await client.statObject(input.sourceBucket, input.sourceKey, versionOptions(sourceVersionId))
    );
    assertExpectedObjectIdentity(sourceState, sourceEtag, undefined);
    const sourceContentHash = requireS3ContentHash(sourceState);
    const result = await client.copyObject(
      new CopySourceOptions({
        Bucket: input.sourceBucket,
        Object: input.sourceKey,
        ...(sourceVersionId ? { VersionID: sourceVersionId } : {}),
        ...(sourceEtag ? { MatchETag: quoteS3Etag(sourceEtag) } : {}),
      }),
      new CopyDestinationOptions({
        Bucket: input.targetBucket,
        Object: input.targetKey,
        MetadataDirective: 'COPY',
        ...(input.ifAbsent ? { Headers: { 'If-None-Match': '*' } } : {}),
      })
    );
    const copiedVersionId = optionalNonEmpty(result.VersionId ?? undefined, 'copiedVersionId');
    const copiedEtag = requireNonEmpty(result.Etag ?? result.etag, 'copiedEtag');
    const targetState = s3StateFromStat(
      await client.statObject(input.targetBucket, input.targetKey, versionOptions(copiedVersionId))
    );
    assertExpectedObjectIdentity(targetState, copiedEtag, sourceContentHash);
    if (targetState.sizeBytes !== sourceState.sizeBytes) {
      throw artifactStoreError(
        'ARTIFACT_HASH_MISMATCH',
        'Copied S3 Artifact size does not match its source.',
        false,
        {
          expectedSizeBytes: sourceState.sizeBytes,
          actualSizeBytes: targetState.sizeBytes,
        }
      );
    }
    return {
      etag: normalizeS3Etag(copiedEtag),
      ...(copiedVersionId ? { versionId: copiedVersionId } : {}),
      state: targetState,
    };
  }

  async createDownloadAccess(
    input: Parameters<S3ArtifactTransport['createDownloadAccess']>[0]
  ): Promise<S3ArtifactDownloadAccess> {
    this.assertOpen();
    assertBucketAndKey(input.bucket, input.key);
    const versionId = requireMutationVersion(input.versionId, 'signed download');
    assertPositiveSafeInteger(input.expiresInSeconds, 'expiresInSeconds');
    if (input.expiresInSeconds > MAX_SIGNED_DOWNLOAD_TTL_SECONDS) {
      throw new TypeError(`expiresInSeconds must not exceed ${MAX_SIGNED_DOWNLOAD_TTL_SECONDS}.`);
    }
    const responseMimeType = safeResponseMimeType(input.responseMimeType);
    const responseFilename = safeResponseFilename(input.responseFilename);
    const requestDate = validDate(this.now(), 'now');
    const expiresAt = new Date(requestDate.getTime() + input.expiresInSeconds * 1_000);
    const { client } = await this.createSigningClient(expiresAt);
    const state = s3StateFromStat(await client.statObject(input.bucket, input.key, { versionId }));
    assertExpectedObjectIdentity(state, input.expectedEtag, input.expectedContentHash);

    const requestParameters = {
      versionId,
      ...(responseMimeType ? { 'response-content-type': responseMimeType } : {}),
      ...(responseFilename
        ? {
            'response-content-disposition': contentDispositionFor(responseFilename),
          }
        : {}),
    };
    const signedUrl = await client.presignedUrl(
      'GET',
      input.bucket,
      input.key,
      input.expiresInSeconds,
      requestParameters,
      requestDate
    );
    return {
      method: 'GET',
      url: validateSignedDownloadUrl(signedUrl, this.config, versionId, input.expiresInSeconds),
      expiresAt: expiresAt.toISOString(),
    };
  }

  async checkBucket(bucket: string): Promise<void> {
    this.assertOpen();
    assertBucketAndKey(bucket, 'health-check');
    const client = await this.createClient();
    if (!(await client.bucketExists(bucket))) {
      const error = new Error('The configured S3 Artifact bucket does not exist.');
      error.name = 'NoSuchBucket';
      throw error;
    }
    const versioning = await client.getBucketVersioning(bucket);
    if (versioning.Status !== 'Enabled') {
      const error = new Error('The configured S3 Artifact bucket must enable versioning.');
      error.name = 'InvalidBucketState';
      throw error;
    }
  }

  close(): void {
    this.closed = true;
  }

  private async createClient(): Promise<MinioArtifactClient> {
    const credentials = await this.resolveCredentials();
    return this.clientFactory(
      minioClientOptions(
        this.config,
        credentials,
        this.multipartPartSizeBytes,
        this.maximumRetryCount
      )
    );
  }

  private async createSigningClient(
    requestedExpiry: Date
  ): Promise<{ client: MinioArtifactClient }> {
    const credentials = await this.resolveCredentials();
    if (credentials.expiration && credentials.expiration.getTime() < requestedExpiry.getTime()) {
      throw new S3ArtifactCredentialError(
        'S3 credentials expire before the requested signed download access.'
      );
    }
    return {
      client: this.clientFactory(
        minioClientOptions(
          this.config,
          credentials,
          this.multipartPartSizeBytes,
          this.maximumRetryCount
        )
      ),
    };
  }

  private async resolveCredentials(): Promise<S3ArtifactCredentials> {
    const credentialProvider = this.config.credentialProvider;
    if (!credentialProvider) {
      throw new S3ArtifactConfigurationError(
        'S3 upload transport requires an explicit credential provider.'
      );
    }
    return credentialProvider();
  }

  private assertOpen(): void {
    if (this.closed) {
      throw new S3ArtifactConfigurationError('S3 upload transport is closed.');
    }
  }
}

function minioClientOptions(
  config: NormalizedS3ArtifactClientConfig,
  credentials: S3ArtifactCredentials,
  partSize: number,
  maximumRetryCount: number
): MinioClientOptions {
  const endpoint = new URL(config.endpoint ?? 'https://s3.amazonaws.com');
  return {
    endPoint: endpoint.hostname.replace(/^\[|\]$/gu, ''),
    port: endpoint.port ? Number(endpoint.port) : endpoint.protocol === 'https:' ? 443 : 80,
    useSSL: endpoint.protocol === 'https:',
    region: config.region,
    pathStyle: config.forcePathStyle,
    partSize,
    accessKey: credentials.accessKeyId,
    secretKey: credentials.secretAccessKey,
    ...(credentials.sessionToken ? { sessionToken: credentials.sessionToken } : {}),
    retryOptions: { maximumRetryCount },
  };
}

function defaultMinioClientFactory(options: MinioClientOptions): MinioArtifactClient {
  return new Client(options);
}

async function cleanupIncompleteUpload(
  client: MinioArtifactClient,
  bucket: string,
  key: string
): Promise<void> {
  try {
    await client.removeIncompleteUpload(bucket, key);
  } catch (error) {
    if (isMissingIncompleteUpload(error)) return;
    throw new S3ArtifactUploadCleanupError();
  }
}

async function cleanupCompletedInterruptedUpload(
  client: MinioArtifactClient,
  bucket: string,
  key: string,
  result: { versionId: string | null }
): Promise<void> {
  if (!result.versionId) throw new S3ArtifactUploadCleanupError();
  try {
    await client.removeObject(bucket, key, { versionId: result.versionId });
    try {
      await client.statObject(bucket, key, { versionId: result.versionId });
      throw new S3ArtifactUploadCleanupError();
    } catch (error) {
      if (isMissingObject(error)) return;
      throw error;
    }
  } catch (error) {
    if (error instanceof S3ArtifactUploadCleanupError) throw error;
    throw new S3ArtifactUploadCleanupError();
  }
}

function isDestroyableWritable(
  value: NodeJS.WritableStream
): value is NodeJS.WritableStream & { destroy(error?: Error): void } {
  return typeof Reflect.get(value, 'destroy') === 'function';
}

function s3StateFromStat(stat: MinioObjectStat): S3ArtifactObjectState {
  if (!(stat.lastModified instanceof Date) || !Number.isFinite(stat.lastModified.getTime())) {
    throw artifactStoreError(
      'ARTIFACT_VALIDATION_FAILED',
      'S3 object timestamp metadata is invalid.',
      false
    );
  }
  const metadata = stringMetadata(stat.metaData);
  return {
    sizeBytes: stat.size,
    etag: stat.etag,
    lastModifiedAt: stat.lastModified.toISOString(),
    metadata,
    ...(stat.versionId ? { versionId: stat.versionId } : {}),
    ...(metadata['content-type'] ? { mimeType: metadata['content-type'] } : {}),
    encrypted:
      metadata['x-amz-server-side-encryption'] !== undefined ||
      metadata['x-amz-server-side-encryption-customer-algorithm'] !== undefined,
  };
}

function stringMetadata(value: unknown): Record<string, string> {
  if (!value || Array.isArray(value) || typeof value !== 'object') {
    throw artifactStoreError('ARTIFACT_VALIDATION_FAILED', 'S3 object metadata is invalid.', false);
  }
  const entries = Object.entries(value);
  if (entries.some(([, entry]) => typeof entry !== 'string')) {
    throw artifactStoreError('ARTIFACT_VALIDATION_FAILED', 'S3 object metadata is invalid.', false);
  }
  return Object.fromEntries(entries) as Record<string, string>;
}

function versionOptions(versionId: string | undefined): { versionId?: string } | undefined {
  if (versionId !== undefined && !versionId.trim()) {
    throw new TypeError('versionId must not be empty.');
  }
  return versionId ? { versionId } : undefined;
}

function requireMutationVersion(versionId: string, operation: string): string {
  const value = optionalNonEmpty(versionId, 'versionId');
  if (!value) {
    throw new TypeError(`S3 ${operation} requires a version-pinned object reference.`);
  }
  return value;
}

function optionalNonEmpty(value: string | undefined, name: string): string | undefined {
  if (value === undefined) return undefined;
  return requireNonEmpty(value, name);
}

function requireNonEmpty(value: string | undefined, name: string): string {
  if (!value?.trim()) throw new TypeError(`${name} must not be empty.`);
  return value;
}

function safeResponseMimeType(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const normalized = value.trim();
  if (
    normalized !== value ||
    normalized.length === 0 ||
    normalized.length > 255 ||
    hasControlCharacters(normalized)
  ) {
    throw new TypeError('responseMimeType is invalid.');
  }
  return normalized;
}

function safeResponseFilename(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const normalized = value.trim();
  if (
    normalized !== value ||
    normalized.length === 0 ||
    normalized.length > 255 ||
    normalized.includes('/') ||
    normalized.includes('\\') ||
    hasControlCharacters(normalized)
  ) {
    throw new TypeError('responseFilename must be a safe filename without path separators.');
  }
  return normalized;
}

function hasControlCharacters(value: string): boolean {
  return Array.from(value).some((character) => {
    const codePoint = character.codePointAt(0);
    return codePoint === undefined || codePoint <= 31 || codePoint === 127;
  });
}

function contentDispositionFor(filename: string): string {
  const encoded = encodeURIComponent(filename).replace(/[!'()*]/gu, (character) => {
    const codePoint = character.codePointAt(0);
    if (codePoint === undefined) throw new TypeError('responseFilename is invalid.');
    return `%${codePoint.toString(16).toUpperCase()}`;
  });
  return `attachment; filename*=UTF-8''${encoded}`;
}

function validDate(value: Date, name: string): Date {
  if (!(value instanceof Date) || !Number.isFinite(value.getTime())) {
    throw new TypeError(`${name} must return a valid Date.`);
  }
  return new Date(value.getTime());
}

function validateSignedDownloadUrl(
  value: string,
  config: NormalizedS3ArtifactClientConfig,
  expectedVersionId: string,
  expectedTtlSeconds: number
): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw invalidSignedDownloadUrl();
  }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.hash) {
    throw invalidSignedDownloadUrl();
  }
  if (config.endpoint) {
    if (url.origin !== config.endpoint) throw invalidSignedDownloadUrl();
  } else {
    const hostname = url.hostname.toLowerCase();
    if (hostname !== 's3.amazonaws.com' && !hostname.endsWith('.amazonaws.com')) {
      throw invalidSignedDownloadUrl();
    }
  }
  const versions = url.searchParams.getAll('versionId');
  const expiries = url.searchParams.getAll('X-Amz-Expires');
  if (
    versions.length !== 1 ||
    versions[0] !== expectedVersionId ||
    expiries.length !== 1 ||
    expiries[0] !== String(expectedTtlSeconds)
  ) {
    throw invalidSignedDownloadUrl();
  }
  return value;
}

function invalidSignedDownloadUrl(): Error {
  return artifactStoreError(
    'ARTIFACT_DOWNLOAD_FAILED',
    'S3 returned an invalid or insufficiently constrained signed download URL.',
    false
  );
}

function assertExpectedObjectIdentity(
  state: S3ArtifactObjectState,
  expectedEtag: string | undefined,
  expectedContentHash: string | undefined
): void {
  const actualEtag = normalizeS3Etag(state.etag);
  const normalizedExpectedEtag = normalizeS3Etag(expectedEtag);
  if (normalizedExpectedEtag && normalizedExpectedEtag !== actualEtag) {
    throw artifactStoreError(
      'ARTIFACT_VERSION_CONFLICT',
      'S3 Artifact ETag does not match the requested version.',
      false,
      { expectedEtag: normalizedExpectedEtag, actualEtag }
    );
  }
  const actualContentHash = requireS3ContentHash(state);
  if (expectedContentHash && expectedContentHash !== actualContentHash) {
    throw artifactStoreError(
      'ARTIFACT_HASH_MISMATCH',
      'S3 Artifact does not match expectedContentHash.',
      false,
      { expectedContentHash, actualContentHash }
    );
  }
}

function sameS3ObjectIdentity(
  before: S3ArtifactObjectState,
  after: S3ArtifactObjectState
): boolean {
  return (
    before.sizeBytes === after.sizeBytes &&
    normalizeS3Etag(before.etag) === normalizeS3Etag(after.etag) &&
    before.versionId === after.versionId &&
    before.lastModifiedAt === after.lastModifiedAt &&
    requireS3ContentHash(before) === requireS3ContentHash(after)
  );
}

function guardS3Download(input: {
  stream: Readable;
  expectedContentHash: string;
  expectedSizeBytes: number;
  verifyHash: boolean;
  abortSignal?: AbortSignal;
  requestTimeoutMs: number;
  verifyUnchanged(): Promise<void>;
}): AsyncIterable<Uint8Array> {
  let interruption: S3ArtifactTransferAbortedError | S3ArtifactTransferTimeoutError | undefined;
  const abort = (): void => {
    interruption ??= new S3ArtifactTransferAbortedError();
    input.stream.destroy();
  };
  input.abortSignal?.addEventListener('abort', abort, { once: true });
  const timeout = setTimeout(() => {
    interruption ??= new S3ArtifactTransferTimeoutError();
    input.stream.destroy();
  }, input.requestTimeoutMs);
  const verified = verifyS3ArtifactStream(
    input.stream,
    input.expectedContentHash,
    input.expectedSizeBytes,
    input.verifyHash
  );

  return (async function* guarded(): AsyncIterable<Uint8Array> {
    let completed = false;
    try {
      yield* verified;
      if (interruption) throw interruption;
      await input.verifyUnchanged();
      completed = true;
    } catch (error) {
      throw interruption ?? error;
    } finally {
      clearTimeout(timeout);
      input.abortSignal?.removeEventListener('abort', abort);
      if (!completed && !input.stream.destroyed) input.stream.destroy();
    }
  })();
}

function isMissingObject(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const candidate = error as { code?: unknown; name?: unknown; statusCode?: unknown };
  return (
    candidate.statusCode === 404 ||
    [candidate.code, candidate.name].some(
      (value) => typeof value === 'string' && ['NoSuchKey', 'NotFound'].includes(value)
    )
  );
}

function isMissingIncompleteUpload(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const record = error as { code?: unknown; name?: unknown };
  return [record.code, record.name].some(
    (value) =>
      typeof value === 'string' && ['NoSuchUpload', 'NoSuchKey', 'NotFound'].includes(value)
  );
}

function assertBucketAndKey(bucket: string, key: string): void {
  if (!bucket.trim()) throw new TypeError('bucket is required.');
  if (!key.trim()) throw new TypeError('key is required.');
}

function assertSafeIntegerAtLeast(value: number, minimum: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < minimum) {
    throw new TypeError(`${name} must be a safe integer of at least ${minimum}.`);
  }
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

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
