import type { Readable } from 'node:stream';
import { Client } from 'minio';
import {
  normalizeS3ArtifactClientConfig,
  S3ArtifactConfigurationError,
  type NormalizedS3ArtifactClientConfig,
  type S3ArtifactClientConfigInput,
  type S3ArtifactCredentials,
} from './s3-artifact-store-config';

const DEFAULT_REQUEST_TIMEOUT_MS = 60_000;
const MIN_MULTIPART_PART_SIZE_BYTES = 5 * 1024 * 1024;

export interface S3ArtifactWriteResult {
  etag?: string;
  versionId?: string;
}

export interface S3ArtifactUploadTransport {
  upload(input: {
    bucket: string;
    key: string;
    body: Readable;
    contentLength: number;
    contentType?: string;
    metadata: Record<string, string>;
    ifAbsent: boolean;
    abortSignal?: AbortSignal;
  }): Promise<S3ArtifactWriteResult>;
  checkBucket(bucket: string): Promise<void>;
  close(): void;
}

interface MinioUploadClient {
  putObject(
    bucket: string,
    key: string,
    body: Readable,
    size: number,
    metadata: Record<string, string>
  ): Promise<{ etag: string; versionId: string | null }>;
  removeIncompleteUpload(bucket: string, key: string): Promise<void>;
  bucketExists(bucket: string): Promise<boolean>;
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

type MinioClientFactory = (options: MinioClientOptions) => MinioUploadClient;

export interface MinioS3ArtifactUploadTransportOptions extends S3ArtifactClientConfigInput {
  multipartPartSizeBytes?: number;
  requestTimeoutMs?: number;
  maximumRetryCount?: number;
  clientFactory?: MinioClientFactory;
}

export class S3ArtifactUploadAbortedError extends Error {
  readonly code = 'S3_ARTIFACT_UPLOAD_ABORTED';

  constructor() {
    super('S3 Artifact upload was aborted.');
    this.name = 'S3ArtifactUploadAbortedError';
  }
}

export class S3ArtifactUploadTimeoutError extends Error {
  readonly code = 'S3_ARTIFACT_UPLOAD_TIMEOUT';

  constructor() {
    super('S3 Artifact upload timed out.');
    this.name = 'S3ArtifactUploadTimeoutError';
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
 * Upload-only transport boundary used while the concrete Store is rebuilt.
 * A client is created per operation so the configured credential provider is
 * resolved each time; this keeps short-lived credentials rotatable without
 * storing them in long-lived adapter state.
 */
export class MinioS3ArtifactUploadTransport implements S3ArtifactUploadTransport {
  private readonly config: NormalizedS3ArtifactClientConfig;
  private readonly multipartPartSizeBytes: number;
  private readonly requestTimeoutMs: number;
  private readonly maximumRetryCount: number;
  private readonly clientFactory: MinioClientFactory;
  private closed = false;

  constructor(options: MinioS3ArtifactUploadTransportOptions) {
    this.config = normalizeS3ArtifactClientConfig(options);
    if (!this.config.credentialProvider) {
      throw new S3ArtifactConfigurationError(
        'S3 upload transport requires an explicit credential provider.'
      );
    }
    this.multipartPartSizeBytes = options.multipartPartSizeBytes ?? 8 * 1024 * 1024;
    this.requestTimeoutMs = options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS;
    this.maximumRetryCount = options.maximumRetryCount ?? 1;
    assertSafeIntegerAtLeast(
      this.multipartPartSizeBytes,
      MIN_MULTIPART_PART_SIZE_BYTES,
      'multipartPartSizeBytes'
    );
    assertPositiveSafeInteger(this.requestTimeoutMs, 'requestTimeoutMs');
    assertNonNegativeSafeInteger(this.maximumRetryCount, 'maximumRetryCount');
    this.clientFactory = options.clientFactory ?? defaultMinioClientFactory;
  }

  async upload(
    input: Parameters<S3ArtifactUploadTransport['upload']>[0]
  ): Promise<S3ArtifactWriteResult> {
    this.assertOpen();
    assertBucketAndKey(input.bucket, input.key);
    if (!Number.isSafeInteger(input.contentLength) || input.contentLength < 0) {
      throw new TypeError('contentLength must be a non-negative safe integer.');
    }
    if (input.abortSignal?.aborted) throw new S3ArtifactUploadAbortedError();

    const client = await this.createClient();
    const metadata = {
      ...input.metadata,
      ...(input.contentType ? { 'Content-Type': input.contentType } : {}),
      ...(input.ifAbsent ? { 'If-None-Match': '*' } : {}),
    };
    let interruption: S3ArtifactUploadAbortedError | S3ArtifactUploadTimeoutError | undefined;
    const abort = (): void => {
      interruption ??= new S3ArtifactUploadAbortedError();
      input.body.destroy(interruption);
    };
    input.abortSignal?.addEventListener('abort', abort, { once: true });
    const timeout = setTimeout(() => {
      interruption ??= new S3ArtifactUploadTimeoutError();
      input.body.destroy(interruption);
    }, this.requestTimeoutMs);

    try {
      const result = await client.putObject(
        input.bucket,
        input.key,
        input.body,
        input.contentLength,
        metadata
      );
      return {
        ...(result.etag ? { etag: result.etag } : {}),
        ...(result.versionId ? { versionId: result.versionId } : {}),
      };
    } catch (error) {
      await cleanupIncompleteUpload(client, input.bucket, input.key);
      throw interruption ?? error;
    } finally {
      clearTimeout(timeout);
      input.abortSignal?.removeEventListener('abort', abort);
    }
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
  }

  close(): void {
    this.closed = true;
  }

  private async createClient(): Promise<MinioUploadClient> {
    const credentialProvider = this.config.credentialProvider;
    if (!credentialProvider) {
      throw new S3ArtifactConfigurationError(
        'S3 upload transport requires an explicit credential provider.'
      );
    }
    const credentials = await credentialProvider();
    return this.clientFactory(
      minioClientOptions(
        this.config,
        credentials,
        this.multipartPartSizeBytes,
        this.maximumRetryCount
      )
    );
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

function defaultMinioClientFactory(options: MinioClientOptions): MinioUploadClient {
  return new Client(options);
}

async function cleanupIncompleteUpload(
  client: MinioUploadClient,
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
