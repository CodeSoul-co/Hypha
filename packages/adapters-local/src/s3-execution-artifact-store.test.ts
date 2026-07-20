import { createHash } from 'node:crypto';
import type { Readable } from 'node:stream';
import { describe, expect, it } from 'vitest';
import type { ArtifactPutRequest } from '@hypha/core';
import { readArtifactStream } from './artifact-content-io';
import { S3ExecutionArtifactStore } from './s3-execution-artifact-store';
import { AwsSdkS3ArtifactStoreTransport } from './s3-artifact-store-transport';
import type {
  S3ArtifactObjectState,
  S3ArtifactReadResult,
  S3ArtifactStoreTransport,
  S3ArtifactWriteResult,
} from './s3-artifact-store-transport';

const fixedNow = '2026-07-18T00:00:00.000Z';

describe('S3ExecutionArtifactStore', () => {
  it('stages async content, validates it, and publishes Hypha metadata', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport, { versioning: true });
    async function* chunks(): AsyncIterable<Uint8Array> {
      yield Uint8Array.from([1, 2]);
      yield Uint8Array.from([3, 4]);
    }

    const expectedHash = contentHash(Uint8Array.from([1, 2, 3, 4]));
    const ref = await store.put({
      ...request('objects/report.bin', chunks()),
      expectedContentHash: expectedHash,
      sizeBytes: 4,
      metadata: { source: 'test', label: '测试' },
    });

    expect(ref).toEqual({
      storeId: 'artifact-store.s3.test',
      bucketOrNamespace: 'hypha-artifacts',
      objectKey: 'objects/report.bin',
      versionId: 'version-1',
      etag: 'etag-1',
      region: 'us-east-1',
      encrypted: false,
    });
    await expect(store.head(ref)).resolves.toMatchObject({
      contentHash: expectedHash,
      sizeBytes: 4,
      mimeType: 'application/octet-stream',
      metadata: { source: 'test', label: '测试' },
    });
  });

  it('verifies full downloads and supports inclusive range reads', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    const ref = await store.put(request('objects/range.bin', Uint8Array.from([0, 1, 2, 3, 4])));

    const full = await store.get({ ref });
    await expect(readArtifactStream(full.stream)).resolves.toEqual(
      Uint8Array.from([0, 1, 2, 3, 4])
    );
    const range = await store.get({ ref, range: { start: 1, endInclusive: 99 } });
    await expect(readArtifactStream(range.stream)).resolves.toEqual(Uint8Array.from([1, 2, 3, 4]));
    expect(range).toMatchObject({ sizeBytes: 4, range: { start: 1, endInclusive: 4 } });
    await expect(store.get({ ref, range: { start: 5 } })).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_INVALID_INPUT' },
    });
  });

  it('fails the response stream when downloaded bytes violate stored integrity metadata', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    const ref = await store.put(request('objects/integrity.bin', Uint8Array.from([1, 2, 3])));
    transport.corrupt('objects/integrity.bin', Uint8Array.from([3, 2, 1]));

    const content = await store.get({ ref });
    await expect(readArtifactStream(content.stream)).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_HASH_MISMATCH' },
    });
  });

  it('uses conditional writes and rejects stale references', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    const stale = await store.put({
      ...request('objects/current.bin', Uint8Array.from([1])),
      ifAbsent: true,
    });
    await expect(
      store.put({ ...request('objects/current.bin', Uint8Array.from([2])), ifAbsent: true })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_VERSION_CONFLICT' } });

    const current = await store.put(request('objects/current.bin', Uint8Array.from([2])));
    await expect(store.exists(stale)).resolves.toBe(false);
    await expect(store.get({ ref: stale })).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_VERSION_CONFLICT' },
    });
    await expect(readArtifactStream((await store.get({ ref: current })).stream)).resolves.toEqual(
      Uint8Array.from([2])
    );
  });

  it('performs server-side copy, idempotent delete, and signed download access', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    const source = await store.put(request('objects/source.bin', Uint8Array.from([5, 6])));
    const copy = await store.copy({
      operationId: 'copy:source',
      source,
      targetObjectKey: 'objects/copied.bin',
      ifAbsent: true,
    });

    await expect(readArtifactStream((await store.get({ ref: copy })).stream)).resolves.toEqual(
      Uint8Array.from([5, 6])
    );
    await expect(
      store.createDownloadAccess({
        ref: copy,
        expiresInSeconds: 60,
        responseFilename: '报告.bin',
      })
    ).resolves.toEqual({
      method: 'GET',
      url: 'https://downloads.example/objects%2Fcopied.bin?expires=60',
      expiresAt: '2026-07-18T00:01:00.000Z',
      headers: { 'If-Match': '"etag-2"' },
    });
    await store.delete(copy);
    await expect(store.delete(copy)).resolves.toBeUndefined();
    await expect(store.exists(copy)).resolves.toBe(false);
  });

  it('bounds content and user metadata before any remote write', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport, { maxObjectBytes: 2, maxMetadataBytes: 8 });

    await expect(
      store.put(request('objects/large.bin', Uint8Array.from([1, 2, 3])))
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_TOO_LARGE' } });
    await expect(
      store.put({
        ...request('objects/metadata.bin', Uint8Array.from([1])),
        metadata: { value: 'too-large' },
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_INVALID_INPUT' } });
    expect(transport.objectCount()).toBe(0);
  });

  it('normalizes provider failures without exposing credentials or request payloads', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    transport.nextError = providerError('AccessDenied', 403);

    await expect(
      store.put(request('objects/denied.bin', Uint8Array.from([1])))
    ).rejects.toMatchObject({
      normalizedError: {
        code: 'ARTIFACT_PERMISSION_DENIED',
        retryable: false,
        details: { operation: 'put', providerCode: 'AccessDenied' },
      },
    });

    transport.nextError = providerError('ServiceUnavailable', 503);
    await expect(
      store.put(request('objects/retryable.bin', Uint8Array.from([1])))
    ).rejects.toMatchObject({
      normalizedError: {
        code: 'ARTIFACT_STORE_UNAVAILABLE',
        retryable: true,
        details: { operation: 'put', providerCode: 'ServiceUnavailable', status: 503 },
      },
    });
  });

  it('rejects invalid retry configuration before constructing an SDK client', () => {
    expect(() => new AwsSdkS3ArtifactStoreTransport({ maxAttempts: 0 })).toThrow(/maxAttempts/u);
  });

  it('reports only configured capabilities and checks bucket health', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport, { versioning: true, serverSideEncryption: 'AES256' });

    await expect(store.capabilities()).resolves.toEqual({
      versioning: true,
      rangeRead: true,
      signedAccess: true,
      serverSideCopy: true,
      encryption: true,
      multipartUpload: true,
      contentAddressing: true,
    });
    await expect(store.health()).resolves.toMatchObject({ status: 'healthy' });
    transport.healthError = new Error('bucket unavailable');
    await expect(store.health()).resolves.toMatchObject({
      status: 'unhealthy',
      message: 'bucket unavailable',
    });
    await store.close();
    await expect(store.health()).resolves.toMatchObject({ status: 'unhealthy' });
  });
});

interface FakeObject extends S3ArtifactObjectState {
  bytes: Uint8Array;
}

class FakeS3ArtifactTransport implements S3ArtifactStoreTransport {
  readonly objects = new Map<string, FakeObject>();
  nextError?: unknown;
  healthError?: unknown;
  private sequence = 0;

  async upload(
    input: Parameters<S3ArtifactStoreTransport['upload']>[0]
  ): Promise<S3ArtifactWriteResult> {
    this.throwNext();
    if (input.ifAbsent && this.objects.has(input.key))
      throw providerError('PreconditionFailed', 412);
    const bytes = await readNodeStream(input.body);
    const version = ++this.sequence;
    const state: FakeObject = {
      bytes,
      sizeBytes: bytes.byteLength,
      mimeType: input.contentType,
      etag: `"etag-${version}"`,
      versionId: `version-${version}`,
      lastModifiedAt: fixedNow,
      metadata: { ...input.metadata },
      encrypted: false,
    };
    this.objects.set(input.key, state);
    return state;
  }

  async get(input: Parameters<S3ArtifactStoreTransport['get']>[0]): Promise<S3ArtifactReadResult> {
    this.throwNext();
    const state = this.require(input.key, input.ifMatch);
    const bytes = selectRange(state.bytes, input.range);
    return { ...objectState(state), stream: byteStream(bytes), sizeBytes: bytes.byteLength };
  }

  async head(
    input: Parameters<S3ArtifactStoreTransport['head']>[0]
  ): Promise<S3ArtifactObjectState | null> {
    this.throwNext();
    const state = this.objects.get(input.key);
    if (!state) return null;
    this.assertEtag(state, input.ifMatch);
    return objectState(state);
  }

  async delete(input: Parameters<S3ArtifactStoreTransport['delete']>[0]): Promise<void> {
    this.throwNext();
    const existing = this.objects.get(input.key);
    if (existing) this.assertEtag(existing, input.ifMatch);
    this.objects.delete(input.key);
  }

  async copy(
    input: Parameters<S3ArtifactStoreTransport['copy']>[0]
  ): Promise<S3ArtifactWriteResult> {
    this.throwNext();
    const source = this.require(input.sourceKey, input.sourceIfMatch);
    if (input.ifAbsent && this.objects.has(input.targetKey)) {
      throw providerError('PreconditionFailed', 412);
    }
    const version = ++this.sequence;
    const target: FakeObject = {
      ...source,
      bytes: Uint8Array.from(source.bytes),
      etag: `"etag-${version}"`,
      versionId: `version-${version}`,
    };
    this.objects.set(input.targetKey, target);
    return target;
  }

  async createDownloadUrl(
    input: Parameters<S3ArtifactStoreTransport['createDownloadUrl']>[0]
  ): ReturnType<S3ArtifactStoreTransport['createDownloadUrl']> {
    this.throwNext();
    this.require(input.key, input.ifMatch);
    return {
      url: `https://downloads.example/${encodeURIComponent(input.key)}?expires=${input.expiresInSeconds}`,
      ...(input.ifMatch ? { headers: { 'If-Match': input.ifMatch } } : {}),
    };
  }

  async checkBucket(_bucket: string): Promise<void> {
    if (this.healthError) throw this.healthError;
  }

  close(): void {}

  corrupt(key: string, bytes: Uint8Array): void {
    const state = this.objects.get(key);
    if (!state) throw new Error(`Missing fake object ${key}`);
    state.bytes = Uint8Array.from(bytes);
  }

  objectCount(): number {
    return this.objects.size;
  }

  private require(key: string, ifMatch?: string): FakeObject {
    const state = this.objects.get(key);
    if (!state) throw providerError('NoSuchKey', 404);
    this.assertEtag(state, ifMatch);
    return state;
  }

  private assertEtag(state: FakeObject, ifMatch?: string): void {
    if (ifMatch && ifMatch !== state.etag) throw providerError('PreconditionFailed', 412);
  }

  private throwNext(): void {
    if (!this.nextError) return;
    const error = this.nextError;
    this.nextError = undefined;
    throw error;
  }
}

function createStore(
  transport: FakeS3ArtifactTransport,
  options: Partial<ConstructorParameters<typeof S3ExecutionArtifactStore>[0]> = {}
): S3ExecutionArtifactStore {
  return new S3ExecutionArtifactStore({
    id: 'artifact-store.s3.test',
    bucket: 'hypha-artifacts',
    region: 'us-east-1',
    now: () => fixedNow,
    transport,
    ...options,
  });
}

function request(objectKey: string, content: ArtifactPutRequest['content']): ArtifactPutRequest {
  return {
    operationId: `put:${objectKey}`,
    objectKey,
    content,
    mimeType: 'application/octet-stream',
  };
}

async function readNodeStream(stream: Readable): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) chunks.push(Uint8Array.from(chunk as Uint8Array));
  const result = new Uint8Array(chunks.reduce((total, chunk) => total + chunk.byteLength, 0));
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}

function byteStream(bytes: Uint8Array): AsyncIterable<Uint8Array> {
  return (async function* stream(): AsyncIterable<Uint8Array> {
    yield Uint8Array.from(bytes);
  })();
}

function selectRange(bytes: Uint8Array, header?: string): Uint8Array {
  if (!header) return Uint8Array.from(bytes);
  const match = /^bytes=(\d+)-(\d+)$/u.exec(header);
  if (!match) throw new Error(`Invalid fake range ${header}`);
  return bytes.slice(Number(match[1]), Number(match[2]) + 1);
}

function contentHash(bytes: Uint8Array): string {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}

function objectState(value: FakeObject): S3ArtifactObjectState {
  const { bytes: _bytes, ...state } = value;
  return state;
}

function providerError(name: string, status: number): Error {
  return Object.assign(new Error(name), { name, $metadata: { httpStatusCode: status } });
}
