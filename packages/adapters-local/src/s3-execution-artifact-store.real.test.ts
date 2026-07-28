import { createHash, randomUUID } from 'node:crypto';
import { Readable } from 'node:stream';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Client } from 'minio';
import type { ArtifactStorageRef } from '@hypha/core';
import { readArtifactStream } from './artifact-content-io';
import { DockerCliTransport, type DockerCliResult } from './docker-cli-transport';
import {
  MinioS3ArtifactTransport,
  S3ArtifactTransferAbortedError,
  S3ArtifactTransferTimeoutError,
  type MinioS3ArtifactTransportOptions,
} from './s3-artifact-store-transport';
import { S3ExecutionArtifactStore } from './s3-execution-artifact-store';

const dockerPath = process.env.HYPHA_REAL_DOCKER_PATH ?? 'docker';
const minioImage = process.env.HYPHA_REAL_MINIO_IMAGE ?? 'quay.io/minio/minio';
const minioDigest =
  process.env.HYPHA_REAL_MINIO_DIGEST ??
  'sha256:064117214caceaa8d8a90ef7caa58f2b2aeb316b5156afe9ee8da5b4d83e12c8';
const accessKey = 'hypha-minio-test';
const secretKey = 'hypha-minio-test-secret';
const region = 'us-east-1';
const containerName = `hypha-minio-real-${randomUUID().replaceAll('-', '').slice(0, 12)}`;
const bucket = `hypha-artifacts-${randomUUID().replaceAll('-', '').slice(0, 16)}`;
const docker = new DockerCliTransport({ dockerPath });
let fixture: RealMinioFixture | undefined;
let containerCreated = false;

beforeAll(async () => {
  const image = `${minioImage}@${minioDigest}`;
  await requireDocker(['image', 'inspect', image]);
  await requireDocker([
    'run',
    '-d',
    '--name',
    containerName,
    '-p',
    '127.0.0.1::9000',
    '-e',
    `MINIO_ROOT_USER=${accessKey}`,
    '-e',
    `MINIO_ROOT_PASSWORD=${secretKey}`,
    image,
    'server',
    '/data',
    '--address',
    ':9000',
    '--console-address',
    ':9001',
  ]);
  containerCreated = true;

  const portResult = await requireDocker(['port', containerName, '9000/tcp']);
  const port = parsePublishedPort(portResult.stdout);
  const client = new Client({
    endPoint: '127.0.0.1',
    port,
    useSSL: false,
    region,
    pathStyle: true,
    accessKey,
    secretKey,
  });
  await waitForMinio(client);
  await client.makeBucket(bucket, region);
  await client.setBucketVersioning(bucket, { Status: 'Enabled' });
  await expect(client.getBucketVersioning(bucket)).resolves.toMatchObject({
    Status: 'Enabled',
  });

  fixture = {
    client,
    store: createStore(port),
    port,
  };
}, 60_000);

afterAll(async () => {
  const activeFixture = fixture;
  try {
    if (activeFixture) {
      await activeFixture.store.close();
      await activeFixture.client.removeBucket(bucket);
    }
  } finally {
    const removal = await runDocker(['rm', '-f', containerName]);
    if (containerCreated) {
      expect(removal).toMatchObject({ outcome: 'exited', exitCode: 0 });
      const inspection = await runDocker(['inspect', containerName]);
      expect(inspection.exitCode).not.toBe(0);
    }
  }
}, 60_000);

describe('S3ExecutionArtifactStore real MinIO', () => {
  it('preserves immutable versions and deletes only the referenced version', async () => {
    const { store } = requireFixture();
    const firstBytes = Uint8Array.from([1, 2, 3, 4]);
    const secondBytes = Uint8Array.from([5, 6, 7]);
    const first = await store.put(putRequest('objects/versioned.bin', firstBytes));
    const second = await store.put(putRequest('objects/versioned.bin', secondBytes));

    expect(first.versionId).toBeTruthy();
    expect(second.versionId).toBeTruthy();
    expect(second.versionId).not.toBe(first.versionId);
    await expect(readRef(store, first)).resolves.toEqual(firstBytes);
    await expect(readRef(store, second)).resolves.toEqual(secondBytes);

    await store.delete(second);
    await expect(store.exists(second)).resolves.toBe(false);
    await expect(readRef(store, first)).resolves.toEqual(firstBytes);
    await store.delete(first);
    await expect(store.exists(first)).resolves.toBe(false);
  });

  it('round-trips multipart content, range reads, server copy, and signed download access', async () => {
    const { store } = requireFixture();
    const bytes = deterministicBytes(6 * 1024 * 1024 + 17);
    const source = await store.put(putRequest('objects/multipart.bin', bytes));
    const sourceContent = await readRef(store, source);
    const range = await store.get({
      ref: source,
      range: { start: 1024, endInclusive: 8191 },
    });
    const rangeBytes = await readArtifactStream(range.stream);
    const copy = await store.copy({
      operationId: 'copy:real-minio',
      source,
      targetObjectKey: 'objects/multipart-copy.bin',
      ifAbsent: true,
    });
    const access = await store.createDownloadAccess({
      ref: copy,
      expiresInSeconds: 60,
      responseFilename: 'multipart.bin',
      responseMimeType: 'application/octet-stream',
    });
    const response = await fetch(access.url);
    const signedBytes = new Uint8Array(await response.arrayBuffer());

    expect(sourceContent.byteLength).toBe(bytes.byteLength);
    expect(contentHash(sourceContent)).toBe(contentHash(bytes));
    expect(rangeBytes).toEqual(bytes.slice(1024, 8192));
    expect(range).toMatchObject({
      range: { start: 1024, endInclusive: 8191 },
      sizeBytes: 8192 - 1024,
    });
    expect(response.status).toBe(200);
    expect(signedBytes.byteLength).toBe(bytes.byteLength);
    expect(contentHash(signedBytes)).toBe(contentHash(bytes));
    await expect(readRef(store, copy)).resolves.toHaveLength(bytes.byteLength);

    await store.delete(copy);
    await store.delete(source);
  }, 60_000);

  it('aborts a real multipart upload and removes its incomplete provider state', async () => {
    const { client, port } = requireFixture();
    const key = 'objects/aborted-multipart.bin';
    const abortController = new AbortController();
    const transport = createTransport(port, { requestTimeoutMs: 20_000 });
    const upload = transport.upload(
      multipartUploadRequest(key, stalledMultipartBody(), abortController.signal)
    );
    const rejection = expect(upload).rejects.toBeInstanceOf(S3ArtifactTransferAbortedError);

    try {
      await waitForIncompleteUpload(client, key, true);
      abortController.abort();
      await rejection;
      await waitForIncompleteUpload(client, key, false);
      await expectObjectAbsent(client, key);
    } finally {
      abortController.abort();
      await upload.catch(() => undefined);
      transport.close();
    }
  }, 30_000);

  it('times out a stalled real multipart upload and removes its incomplete provider state', async () => {
    const { client, port } = requireFixture();
    const key = 'objects/timed-out-multipart.bin';
    const transport = createTransport(port, { requestTimeoutMs: 4_000 });
    const upload = transport.upload(multipartUploadRequest(key, stalledMultipartBody()));
    const rejection = expect(upload).rejects.toBeInstanceOf(S3ArtifactTransferTimeoutError);

    try {
      await waitForIncompleteUpload(client, key, true);
      await rejection;
      await waitForIncompleteUpload(client, key, false);
      await expectObjectAbsent(client, key);
    } finally {
      await upload.catch(() => undefined);
      transport.close();
    }
  }, 30_000);

  it('recovers health and operations after real credential invalidation and rotation', async () => {
    const { port } = requireFixture();
    let credentials = {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    };
    let credentialResolutions = 0;
    const rotatingStore = createStore(port, {
      credentialProvider: () => {
        credentialResolutions += 1;
        return credentials;
      },
    });
    let ref: ArtifactStorageRef | undefined;

    try {
      await expect(rotatingStore.health()).resolves.toMatchObject({ status: 'healthy' });
      ref = await rotatingStore.put(
        putRequest('objects/credential-rotation.bin', Uint8Array.from([7, 8, 9]))
      );
      const resolutionsBeforeInvalidation = credentialResolutions;

      credentials = {
        accessKeyId: 'invalid-access-key',
        secretAccessKey: 'invalid-secret-key',
      };
      await expect(rotatingStore.health()).resolves.toMatchObject({ status: 'unhealthy' });
      await expect(rotatingStore.head(ref)).rejects.toMatchObject({
        normalizedError: { code: 'ARTIFACT_PERMISSION_DENIED' },
      });
      expect(credentialResolutions).toBeGreaterThan(resolutionsBeforeInvalidation);

      credentials = {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      };
      await expect(rotatingStore.health()).resolves.toMatchObject({ status: 'healthy' });
      await expect(rotatingStore.head(ref)).resolves.toMatchObject({ sizeBytes: 3 });
    } finally {
      credentials = {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      };
      if (ref) await rotatingStore.delete(ref);
      await rotatingStore.close();
    }
  }, 30_000);

  it('fails readiness closed when the real bucket suspends versioning', async () => {
    const { client, port } = requireFixture();
    await client.setBucketVersioning(bucket, { Status: 'Suspended' });
    const suspendedStore = createStore(port);
    try {
      await expect(suspendedStore.health()).resolves.toMatchObject({
        status: 'unhealthy',
      });
      await expect(
        suspendedStore.put(putRequest('objects/rejected.bin', Uint8Array.from([1])))
      ).rejects.toMatchObject({
        normalizedError: {
          code: 'ARTIFACT_UPLOAD_FAILED',
          details: { providerCode: 'InvalidBucketState' },
        },
      });
    } finally {
      await suspendedStore.close();
      await client.setBucketVersioning(bucket, { Status: 'Enabled' });
    }
  });
});

interface RealMinioFixture {
  client: Client;
  store: S3ExecutionArtifactStore;
  port: number;
}

function createStore(
  port: number,
  transportOverrides: Partial<MinioS3ArtifactTransportOptions> = {}
): S3ExecutionArtifactStore {
  return new S3ExecutionArtifactStore({
    id: 'artifact-store.s3.minio-real',
    bucket,
    region,
    maxObjectBytes: 16 * 1024 * 1024,
    maxMetadataBytes: 2 * 1024,
    transportOptions: transportOptions(port, transportOverrides),
  });
}

function createTransport(
  port: number,
  overrides: Partial<MinioS3ArtifactTransportOptions> = {}
): MinioS3ArtifactTransport {
  return new MinioS3ArtifactTransport(transportOptions(port, overrides));
}

function transportOptions(
  port: number,
  overrides: Partial<MinioS3ArtifactTransportOptions> = {}
): MinioS3ArtifactTransportOptions {
  return {
    endpoint: `http://127.0.0.1:${port}`,
    region,
    forcePathStyle: true,
    allowedEndpointHosts: ['127.0.0.1'],
    allowInsecureHttp: true,
    allowPrivateNetwork: true,
    multipartPartSizeBytes: 5 * 1024 * 1024,
    requestTimeoutMs: 20_000,
    maximumRetryCount: 1,
    credentialProvider: () => ({
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    }),
    ...overrides,
  };
}

function requireFixture(): RealMinioFixture {
  if (!fixture) throw new Error('Real MinIO fixture is not initialized.');
  return fixture;
}

async function waitForMinio(client: Client): Promise<void> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      await client.listBuckets();
      return;
    } catch (error) {
      lastError = error;
      await delay(250);
    }
  }
  throw lastError instanceof Error ? lastError : new Error('MinIO did not become ready.');
}

async function requireDocker(args: string[]): Promise<DockerCliResult> {
  const result = await runDocker(args);
  expect(result.outcome).toBe('exited');
  expect(result.exitCode).toBe(0);
  return result;
}

function runDocker(args: string[]): Promise<DockerCliResult> {
  return docker.run({
    args,
    timeoutMs: 30_000,
    maxStdoutBytes: 1024 * 1024,
    maxStderrBytes: 1024 * 1024,
    maxCombinedOutputBytes: 2 * 1024 * 1024,
    signal: new AbortController().signal,
  });
}

function parsePublishedPort(output: string): number {
  const match = /127\.0\.0\.1:(\d+)/u.exec(output);
  const port = match ? Number(match[1]) : Number.NaN;
  if (!Number.isSafeInteger(port) || port <= 0 || port > 65_535) {
    throw new Error('Docker did not publish the MinIO API on a valid loopback port.');
  }
  return port;
}

function putRequest(objectKey: string, content: Uint8Array) {
  return {
    operationId: `put:${objectKey}`,
    objectKey,
    content,
    mimeType: 'application/octet-stream',
    sizeBytes: content.byteLength,
    expectedContentHash: contentHash(content),
  };
}

async function readRef(
  store: S3ExecutionArtifactStore,
  ref: ArtifactStorageRef
): Promise<Uint8Array> {
  const content = await store.get({ ref });
  return readArtifactStream(content.stream);
}

function deterministicBytes(size: number): Uint8Array {
  return Uint8Array.from({ length: size }, (_, index) => index % 251);
}

function stalledMultipartBody(): Readable {
  let pushed = false;
  return new Readable({
    read() {
      if (pushed) return;
      pushed = true;
      this.push(Buffer.alloc(6 * 1024 * 1024, 0x61));
    },
  });
}

function multipartUploadRequest(key: string, body: Readable, abortSignal?: AbortSignal) {
  return {
    bucket,
    key,
    body,
    contentLength: 12 * 1024 * 1024,
    contentType: 'application/octet-stream',
    metadata: { 'hypha-content-hash': `sha256:${'0'.repeat(64)}` },
    ifAbsent: true,
    ...(abortSignal ? { abortSignal } : {}),
  };
}

async function waitForIncompleteUpload(
  client: Client,
  key: string,
  expected: boolean
): Promise<void> {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const uploads = await listIncompleteUploads(client, key);
    if ((uploads.length > 0) === expected) return;
    await delay(100);
  }
  throw new Error(
    expected
      ? 'MinIO did not expose the expected incomplete multipart upload.'
      : 'MinIO retained an incomplete multipart upload after cleanup.'
  );
}

function listIncompleteUploads(client: Client, key: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const uploadIds: string[] = [];
    const stream = client.listIncompleteUploads(bucket, key, true);
    stream.on('data', (item) => {
      if (item.key === key) uploadIds.push(item.uploadId);
    });
    stream.on('error', reject);
    stream.on('end', () => resolve(uploadIds));
  });
}

async function expectObjectAbsent(client: Client, key: string): Promise<void> {
  try {
    await client.statObject(bucket, key);
  } catch (error) {
    expect(providerErrorCode(error)).toMatch(/^(?:NoSuchKey|NotFound)$/u);
    return;
  }
  throw new Error('MinIO published an object for an interrupted multipart upload.');
}

function providerErrorCode(error: unknown): string | undefined {
  if (!error || typeof error !== 'object') return undefined;
  const code = Reflect.get(error, 'code');
  return typeof code === 'string' ? code : undefined;
}

function contentHash(bytes: Uint8Array): string {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
