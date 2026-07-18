import { createHash, randomUUID } from 'node:crypto';
import {
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { readArtifactStream } from './artifact-content-io';
import { S3ExecutionArtifactStore } from './s3-execution-artifact-store';

const runRealMinio = process.env.HYPHA_REAL_MINIO === '1';
const endpoint = process.env.HYPHA_REAL_MINIO_ENDPOINT ?? 'http://127.0.0.1:9000';
const region = process.env.HYPHA_REAL_MINIO_REGION ?? 'us-east-1';
const bucket = `hypha-artifact-real-${randomUUID()}`;
let client: S3Client;
let store: S3ExecutionArtifactStore;

describe.skipIf(!runRealMinio)('S3ExecutionArtifactStore real MinIO', () => {
  beforeAll(async () => {
    const accessKeyId = requiredEnvironment('HYPHA_REAL_MINIO_ACCESS_KEY');
    const secretAccessKey = requiredEnvironment('HYPHA_REAL_MINIO_SECRET_KEY');
    client = new S3Client({
      endpoint,
      region,
      forcePathStyle: true,
      credentials: { accessKeyId, secretAccessKey },
    });
    await client.send(new CreateBucketCommand({ Bucket: bucket }));
    store = new S3ExecutionArtifactStore({
      id: 'artifact-store.s3.minio.real',
      bucket,
      region,
      client,
      forcePathStyle: true,
      multipartPartSizeBytes: 5 * 1024 * 1024,
      multipartQueueSize: 2,
    });
  }, 60_000);

  afterAll(async () => {
    await store?.close();
    if (client) {
      await emptyBucket(client, bucket);
      await client.send(new DeleteBucketCommand({ Bucket: bucket }));
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
    const response = await fetch(access.url, { headers: access.headers });
    expect(response.status).toBe(200);
    await expect(response.text()).resolves.toBe('real-minio-artifact');

    await store.delete(ref);
    await store.delete(copy);
    await expect(store.exists(ref)).resolves.toBe(false);
    await expect(store.exists(copy)).resolves.toBe(false);
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
});

async function emptyBucket(s3: S3Client, bucketName: string): Promise<void> {
  let continuationToken: string | undefined;
  do {
    const listed = await s3.send(
      new ListObjectsV2Command({ Bucket: bucketName, ContinuationToken: continuationToken })
    );
    const objects = (listed.Contents ?? []).flatMap((entry) =>
      entry.Key ? [{ Key: entry.Key }] : []
    );
    if (objects.length > 0) {
      await s3.send(new DeleteObjectsCommand({ Bucket: bucketName, Delete: { Objects: objects } }));
    }
    continuationToken = listed.IsTruncated ? listed.NextContinuationToken : undefined;
  } while (continuationToken);
}

function requiredEnvironment(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required for real MinIO tests.`);
  return value;
}

function hash(bytes: Uint8Array): string {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}
