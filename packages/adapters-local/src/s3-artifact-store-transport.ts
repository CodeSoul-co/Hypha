import type { Readable } from 'node:stream';
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  S3Client,
  type ServerSideEncryption,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface S3ArtifactObjectState {
  sizeBytes: number;
  mimeType?: string;
  etag?: string;
  versionId?: string;
  lastModifiedAt?: string;
  metadata?: Record<string, string>;
  encrypted?: boolean;
}

export interface S3ArtifactReadResult extends S3ArtifactObjectState {
  stream: AsyncIterable<Uint8Array>;
}

export interface S3ArtifactWriteResult {
  etag?: string;
  versionId?: string;
  encrypted?: boolean;
}

export interface S3ArtifactStoreTransport {
  upload(input: {
    bucket: string;
    key: string;
    body: Readable;
    contentLength: number;
    contentType?: string;
    metadata: Record<string, string>;
    ifAbsent: boolean;
  }): Promise<S3ArtifactWriteResult>;
  get(input: {
    bucket: string;
    key: string;
    versionId?: string;
    ifMatch?: string;
    range?: string;
  }): Promise<S3ArtifactReadResult>;
  head(input: {
    bucket: string;
    key: string;
    versionId?: string;
    ifMatch?: string;
  }): Promise<S3ArtifactObjectState | null>;
  delete(input: {
    bucket: string;
    key: string;
    versionId?: string;
    ifMatch?: string;
  }): Promise<void>;
  copy(input: {
    bucket: string;
    sourceKey: string;
    sourceVersionId?: string;
    sourceIfMatch?: string;
    targetKey: string;
    ifAbsent: boolean;
  }): Promise<S3ArtifactWriteResult>;
  createDownloadUrl(input: {
    bucket: string;
    key: string;
    versionId?: string;
    ifMatch?: string;
    expiresInSeconds: number;
    responseMimeType?: string;
    responseFilename?: string;
  }): Promise<string>;
  checkBucket(bucket: string): Promise<void>;
  close(): void;
}

export interface AwsSdkS3ArtifactStoreTransportOptions {
  client?: S3Client;
  region?: string;
  endpoint?: string;
  forcePathStyle?: boolean;
  multipartPartSizeBytes?: number;
  multipartQueueSize?: number;
  serverSideEncryption?: ServerSideEncryption;
  kmsKeyId?: string;
}

export class AwsSdkS3ArtifactStoreTransport implements S3ArtifactStoreTransport {
  private readonly client: S3Client;
  private readonly ownsClient: boolean;
  private readonly multipartPartSizeBytes: number;
  private readonly multipartQueueSize: number;
  private readonly serverSideEncryption?: ServerSideEncryption;
  private readonly kmsKeyId?: string;

  constructor(options: AwsSdkS3ArtifactStoreTransportOptions = {}) {
    this.client =
      options.client ??
      new S3Client({
        region: options.region ?? 'us-east-1',
        endpoint: options.endpoint,
        forcePathStyle: options.forcePathStyle,
      });
    this.ownsClient = !options.client;
    this.multipartPartSizeBytes = options.multipartPartSizeBytes ?? 8 * 1024 * 1024;
    this.multipartQueueSize = options.multipartQueueSize ?? 2;
    if (this.multipartPartSizeBytes < 5 * 1024 * 1024) {
      throw new TypeError('multipartPartSizeBytes must be at least 5 MiB.');
    }
    if (!Number.isSafeInteger(this.multipartQueueSize) || this.multipartQueueSize <= 0) {
      throw new TypeError('multipartQueueSize must be a positive safe integer.');
    }
    this.serverSideEncryption = options.serverSideEncryption;
    this.kmsKeyId = options.kmsKeyId;
  }

  async upload(
    input: Parameters<S3ArtifactStoreTransport['upload']>[0]
  ): Promise<S3ArtifactWriteResult> {
    const upload = new Upload({
      client: this.client,
      queueSize: this.multipartQueueSize,
      partSize: this.multipartPartSizeBytes,
      leavePartsOnError: false,
      params: {
        Bucket: input.bucket,
        Key: input.key,
        Body: input.body,
        ContentLength: input.contentLength,
        ContentType: input.contentType,
        Metadata: input.metadata,
        IfNoneMatch: input.ifAbsent ? '*' : undefined,
        ServerSideEncryption: this.serverSideEncryption,
        SSEKMSKeyId: this.kmsKeyId,
      },
    });
    const result = await upload.done();
    return {
      etag: result.ETag,
      versionId: result.VersionId,
      encrypted: Boolean(result.ServerSideEncryption ?? this.serverSideEncryption),
    };
  }

  async get(
    input: Parameters<S3ArtifactStoreTransport['get']>[0]
  ): Promise<S3ArtifactReadResult> {
    const result = await this.client.send(
      new GetObjectCommand({
        Bucket: input.bucket,
        Key: input.key,
        VersionId: input.versionId,
        IfMatch: input.ifMatch,
        Range: input.range,
      })
    );
    if (!result.Body || !isAsyncByteStream(result.Body)) {
      throw new TypeError('S3 GetObject response did not contain an async byte stream.');
    }
    return {
      stream: result.Body,
      sizeBytes: result.ContentLength ?? 0,
      mimeType: result.ContentType,
      etag: result.ETag,
      versionId: result.VersionId,
      lastModifiedAt: result.LastModified?.toISOString(),
      metadata: result.Metadata,
      encrypted: Boolean(result.ServerSideEncryption),
    };
  }

  async head(
    input: Parameters<S3ArtifactStoreTransport['head']>[0]
  ): Promise<S3ArtifactObjectState | null> {
    try {
      const result = await this.client.send(
        new HeadObjectCommand({
          Bucket: input.bucket,
          Key: input.key,
          VersionId: input.versionId,
          IfMatch: input.ifMatch,
        })
      );
      return {
        sizeBytes: result.ContentLength ?? 0,
        mimeType: result.ContentType,
        etag: result.ETag,
        versionId: result.VersionId,
        lastModifiedAt: result.LastModified?.toISOString(),
        metadata: result.Metadata,
        encrypted: Boolean(result.ServerSideEncryption),
      };
    } catch (error) {
      if (isNotFound(error)) return null;
      throw error;
    }
  }

  async delete(input: Parameters<S3ArtifactStoreTransport['delete']>[0]): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: input.bucket,
        Key: input.key,
        VersionId: input.versionId,
        IfMatch: input.ifMatch,
      })
    );
  }

  async copy(
    input: Parameters<S3ArtifactStoreTransport['copy']>[0]
  ): Promise<S3ArtifactWriteResult> {
    const source = encodeURIComponent(input.bucket) + '/' + encodeS3CopyKey(input.sourceKey);
    const result = await this.client.send(
      new CopyObjectCommand({
        Bucket: input.bucket,
        Key: input.targetKey,
        CopySource: input.sourceVersionId
          ? `${source}?versionId=${encodeURIComponent(input.sourceVersionId)}`
          : source,
        CopySourceIfMatch: input.sourceIfMatch,
        IfNoneMatch: input.ifAbsent ? '*' : undefined,
        MetadataDirective: 'COPY',
        ServerSideEncryption: this.serverSideEncryption,
        SSEKMSKeyId: this.kmsKeyId,
      })
    );
    return {
      etag: result.CopyObjectResult?.ETag,
      versionId: result.VersionId,
      encrypted: Boolean(result.ServerSideEncryption ?? this.serverSideEncryption),
    };
  }

  async createDownloadUrl(
    input: Parameters<S3ArtifactStoreTransport['createDownloadUrl']>[0]
  ): Promise<string> {
    return getSignedUrl(
      this.client,
      new GetObjectCommand({
        Bucket: input.bucket,
        Key: input.key,
        VersionId: input.versionId,
        IfMatch: input.ifMatch,
        ResponseContentType: input.responseMimeType,
        ResponseContentDisposition: input.responseFilename
          ? contentDisposition(input.responseFilename)
          : undefined,
      }),
      { expiresIn: input.expiresInSeconds }
    );
  }

  async checkBucket(bucket: string): Promise<void> {
    await this.client.send(new HeadBucketCommand({ Bucket: bucket }));
  }

  close(): void {
    if (this.ownsClient) this.client.destroy();
  }
}

function isAsyncByteStream(value: unknown): value is AsyncIterable<Uint8Array> {
  return Boolean(
    value &&
      typeof value === 'object' &&
      Symbol.asyncIterator in value &&
      typeof (value as AsyncIterable<Uint8Array>)[Symbol.asyncIterator] === 'function'
  );
}

function isNotFound(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const value = error as { name?: string; $metadata?: { httpStatusCode?: number } };
  return value.$metadata?.httpStatusCode === 404 || ['NotFound', 'NoSuchKey'].includes(value.name ?? '');
}

function encodeS3CopyKey(key: string): string {
  return key
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function contentDisposition(filename: string): string {
  const asciiFallback = filename.replace(/[^\x20-\x7e]/gu, '_').replace(/["\\]/gu, '_');
  return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}
