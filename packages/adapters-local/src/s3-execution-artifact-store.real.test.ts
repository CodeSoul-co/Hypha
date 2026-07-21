import { createHash, randomUUID } from 'node:crypto';
import { Readable } from 'node:stream';
import {
  AbortMultipartUploadCommand,
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectsCommand,
  HeadBucketCommand,
  ListMultipartUploadsCommand,
  ListObjectVersionsCommand,
  PutBucketVersioningCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { readArtifactStream } from './artifact-content-io';
import { AwsSdkS3ArtifactStoreTransport } from './s3-artifact-store-transport';
import { S3ExecutionArtifactStore } from './s3-execution-artifact-store';

const runRealMinio = process.env.HYPHA_REAL_MINIO === '1';
const endpoint = process.env.HYPHA_REAL_MINIO_ENDPOINT ?? 'http://127.0.0.1:9000';
const region = process.env.HYPHA_REAL_MINIO_REGION ?? 'us-east-1';
const bucket = `hypha-artifact-real-${randomUUID()}`;
let client: S3Client;
let store: S3ExecutionArtifactStore;
let accessKeyId: string;
let secretAccessKey: string;

describe.skipIf(!runRealMinio)('S3ExecutionArtifactStore real MinIO', () => {
  beforeAll(async () => {
    accessKeyId = requiredEnvironment('HYPHA_REAL_MINIO_ACCESS_KEY');
    secretAccessKey = requiredEnvironment('HYPHA_REAL_MINIO_SECRET_KEY');
    client = new S3Client({
      endpoint,
      region,
      forcePathStyle: true,
      credentials: { accessKeyId, secretAccessKey },
    });
    await client.send(new CreateBucketCommand({ Bucket: bucket }));
    await client.send(
      new PutBucketVersioningCommand({
        Bucket: bucket,
        VersioningConfiguration: { Status: 'Enabled' },
      })
    );
    store = new S3ExecutionArtifactStore({
      id: 'artifact-store.s3.minio.real',
      bucket,
      region,
      versioning: true,
      client,
      forcePathStyle: true,
      multipartPartSizeBytes: 5 * 1024 * 1024,
      multipartQueueSize: 2,
    });
  }, 60_000);

  afterAll(async () => {
    await store?.close();
    if (client) {
      await abortMultipartUploads(client, bucket);
      await emptyBucket(client, bucket);
      await client.send(new DeleteBucketCommand({ Bucket: bucket }));
      await expect(client.send(new HeadBucketCommand({ Bucket: bucket }))).rejects.toBeDefined();
      client.destroy();
    }
  }, 60_000);

  it('uploads, heads, downloads, range-reads, copies, signs, and deletes real objects', async () => {
    await expect(store.health()).resolves.toMatchObject({ status: 'healthy' });
    async function* chunks(): AsyncIterable<Uint8Array> {
      yield new TextEncoder().encode('real-');
      yield new TextEncoder().encode('minio-artifact');
    }
    const expected = new TextEncoder().encode('real-minio-artifact');
    const expectedHash = hash(expected);
    const ref = await store.put({
      operationId: 'operation.minio.real.put',
      objectKey: 'objects/report.txt',
      content: chunks(),
      expectedContentHash: expectedHash,
      sizeBytes: expected.byteLength,
      mimeType: 'text/plain',
      metadata: { source: 'real-minio-test' },
      ifAbsent: true,
    });

    await expect(store.head(ref)).resolves.toMatchObject({
      contentHash: expectedHash,
      sizeBytes: expected.byteLength,
      mimeType: 'text/plain',
      metadata: { source: 'real-minio-test' },
    });
    await expect(readArtifactStream((await store.get({ ref })).stream)).resolves.toEqual(expected);
    const ranged = await store.get({ ref, range: { start: 5, endInclusive: 9 } });
    await expect(readArtifactStream(ranged.stream)).resolves.toEqual(
      new TextEncoder().encode('minio')
    );

    const copy = await store.copy({
      operationId: 'operation.minio.real.copy',
      source: ref,
      targetObjectKey: 'objects/report-copy.txt',
      ifAbsent: true,
    });
    await expect(readArtifactStream((await store.get({ ref: copy })).stream)).resolves.toEqual(
      expected
    );
    const access = await store.createDownloadAccess({
      ref: copy,
      expiresInSeconds: 60,
      responseMimeType: 'text/plain',
      responseFilename: 'report copy.txt',
    });
    expect(access.headers).toEqual({ 'If-Match': expect.stringMatching(/^".+"$/) });
    const response = await fetch(access.url, { headers: access.headers });
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/plain');
    expect(response.headers.get('content-disposition')).toContain('report copy.txt');
    await expect(response.text()).resolves.toBe('real-minio-artifact');

    await store.delete(ref);
    await store.delete(copy);
    await expect(store.delete(copy)).resolves.toBeUndefined();
    await expect(store.exists(ref)).resolves.toBe(false);
    await expect(store.exists(copy)).resolves.toBe(false);
  }, 60_000);

  it('rejects a checksum mismatch without publishing an object', async () => {
    const objectKey = 'objects/checksum-mismatch.txt';
    await expect(
      store.put({
        operationId: 'operation.minio.real.checksum-mismatch',
        objectKey,
        content: new TextEncoder().encode('actual-content'),
        expectedContentHash: hash(new TextEncoder().encode('different-content')),
        ifAbsent: true,
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_HASH_MISMATCH' } });
    await expect(store.exists({ storeId: store.id, objectKey })).resolves.toBe(false);
  }, 60_000);

  it('preserves and independently addresses real S3 object versions', async () => {
    const objectKey = 'objects/versioned.txt';
    const firstBytes = new TextEncoder().encode('version-one');
    const secondBytes = new TextEncoder().encode('version-two');
    const first = await store.put({
      operationId: 'operation.minio.real.version.one',
      objectKey,
      content: firstBytes,
      expectedContentHash: hash(firstBytes),
    });
    const second = await store.put({
      operationId: 'operation.minio.real.version.two',
      objectKey,
      content: secondBytes,
      expectedContentHash: hash(secondBytes),
    });

    expect(first.versionId).toEqual(expect.any(String));
    expect(second.versionId).toEqual(expect.any(String));
    expect(second.versionId).not.toBe(first.versionId);
    await expect(readArtifactStream((await store.get({ ref: first })).stream)).resolves.toEqual(
      firstBytes
    );
    await expect(readArtifactStream((await store.get({ ref: second })).stream)).resolves.toEqual(
      secondBytes
    );

    await store.delete(first);
    await store.delete(second);
    await expect(store.exists(first)).resolves.toBe(false);
    await expect(store.exists(second)).resolves.toBe(false);
  }, 60_000);

  it('uses real conditional requests and multipart upload without leaving partial state', async () => {
    const key = 'objects/multipart.bin';
    const bytes = new Uint8Array(6 * 1024 * 1024);
    for (let index = 0; index < bytes.byteLength; index += 4096) bytes[index] = index % 251;
    const expectedHash = hash(bytes);
    const ref = await store.put({
      operationId: 'operation.minio.real.multipart',
      objectKey: key,
      content: bytes,
      expectedContentHash: expectedHash,
      sizeBytes: bytes.byteLength,
      ifAbsent: true,
    });

    await expect(
      store.put({
        operationId: 'operation.minio.real.conflict',
        objectKey: key,
        content: Uint8Array.from([1]),
        ifAbsent: true,
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_VERSION_CONFLICT' } });
    const downloaded = await readArtifactStream((await store.get({ ref })).stream);
    expect(downloaded.byteLength).toBe(bytes.byteLength);
    expect(hash(downloaded)).toBe(expectedHash);

    await store.delete(ref);
    await expect(store.exists(ref)).resolves.toBe(false);
  }, 120_000);

  it('retries one injected 503 before completing a real MinIO upload', async () => {
    const retryClient = minioClient({ maxAttempts: 2 });
    let attempts = 0;
    retryClient.middlewareStack.add(
      (next) => async (args) => {
        attempts += 1;
        if (attempts === 1) {
          throw Object.assign(new Error('injected transient MinIO failure'), {
            name: 'ServiceUnavailable',
            $metadata: { httpStatusCode: 503 },
          });
        }
        return next(args);
      },
      { step: 'finalizeRequest', name: 'hyphaInjectOneRetryableFailure', priority: 'low' }
    );
    const retryStore = new S3ExecutionArtifactStore({
      id: 'artifact-store.s3.minio.retry',
      bucket,
      client: retryClient,
    });
    try {
      const ref = await retryStore.put({
        operationId: 'operation.minio.real.retry',
        objectKey: 'objects/retry.txt',
        content: new TextEncoder().encode('retried-on-real-minio'),
        ifAbsent: true,
      });
      expect(attempts).toBeGreaterThanOrEqual(2);
      await expect(readArtifactStream((await retryStore.get({ ref })).stream)).resolves.toEqual(
        new TextEncoder().encode('retried-on-real-minio')
      );
      await retryStore.delete(ref);
    } finally {
      await retryStore.close();
      retryClient.destroy();
    }
  }, 60_000);

  it('aborts a real multipart upload and removes its partial MinIO state', async () => {
    const transport = new AwsSdkS3ArtifactStoreTransport({
      client,
      multipartPartSizeBytes: 5 * 1024 * 1024,
      multipartQueueSize: 1,
    });
    const controller = new AbortController();
    let releaseSource!: () => void;
    const sourceGate = new Promise<void>((resolve) => {
      releaseSource = resolve;
    });
    const key = 'objects/cancelled-multipart.bin';
    const body = Readable.from(
      (async function* (): AsyncIterable<Uint8Array> {
        yield new Uint8Array(6 * 1024 * 1024);
        await sourceGate;
        yield new Uint8Array(6 * 1024 * 1024);
      })()
    );
    const upload = transport.upload({
      bucket,
      key,
      body,
      contentLength: 12 * 1024 * 1024,
      metadata: {},
      ifAbsent: true,
      abortSignal: controller.signal,
    });

    try {
      await waitForMultipartUpload(client, bucket, key);
      controller.abort();
      releaseSource();
      await expect(upload).rejects.toThrow();
      await waitForNoMultipartUpload(client, bucket, key);
      await expect(store.exists({ storeId: store.id, objectKey: key })).resolves.toBe(false);
    } finally {
      controller.abort();
      releaseSource();
      await upload.catch(() => undefined);
      transport.close();
    }
  }, 60_000);
});

function minioClient(options: { maxAttempts?: number } = {}): S3Client {
  return new S3Client({
    endpoint,
    region,
    forcePathStyle: true,
    credentials: { accessKeyId, secretAccessKey },
    maxAttempts: options.maxAttempts,
  });
}

async function waitForMultipartUpload(
  s3: S3Client,
  bucketName: string,
  key: string
): Promise<void> {
  await waitUntil(async () => {
    const result = await s3.send(new ListMultipartUploadsCommand({ Bucket: bucketName }));
    return (result.Uploads ?? []).some((upload) => upload.Key === key);
  }, `multipart upload ${key} was not created`);
}

async function waitForNoMultipartUpload(
  s3: S3Client,
  bucketName: string,
  key: string
): Promise<void> {
  await waitUntil(async () => {
    const result = await s3.send(new ListMultipartUploadsCommand({ Bucket: bucketName }));
    return !(result.Uploads ?? []).some((upload) => upload.Key === key);
  }, `multipart upload ${key} was not cleaned up`);
}

async function waitUntil(check: () => Promise<boolean>, failure: string): Promise<void> {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    if (await check()) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(failure);
}

async function abortMultipartUploads(s3: S3Client, bucketName: string): Promise<void> {
  const listed = await s3.send(new ListMultipartUploadsCommand({ Bucket: bucketName }));
  await Promise.all(
    (listed.Uploads ?? []).map(async (upload) => {
      if (!upload.Key || !upload.UploadId) return;
      await s3.send(
        new AbortMultipartUploadCommand({
          Bucket: bucketName,
          Key: upload.Key,
          UploadId: upload.UploadId,
        })
      );
    })
  );
}

async function emptyBucket(s3: S3Client, bucketName: string): Promise<void> {
  let keyMarker: string | undefined;
  let versionIdMarker: string | undefined;
  do {
    const listed = await s3.send(
      new ListObjectVersionsCommand({
        Bucket: bucketName,
        KeyMarker: keyMarker,
        VersionIdMarker: versionIdMarker,
      })
    );
    const objects = [...(listed.Versions ?? []), ...(listed.DeleteMarkers ?? [])].flatMap(
      (entry) =>
        entry.Key && entry.VersionId ? [{ Key: entry.Key, VersionId: entry.VersionId }] : []
    );
    if (objects.length > 0) {
      await s3.send(new DeleteObjectsCommand({ Bucket: bucketName, Delete: { Objects: objects } }));
    }
    keyMarker = listed.IsTruncated ? listed.NextKeyMarker : undefined;
    versionIdMarker = listed.IsTruncated ? listed.NextVersionIdMarker : undefined;
  } while (keyMarker);
}

function requiredEnvironment(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required for real MinIO tests.`);
  return value;
}

function hash(bytes: Uint8Array): string {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}
