import { createHash } from 'node:crypto';
import type { Readable } from 'node:stream';
import { describe, expect, it, vi } from 'vitest';
import type { ArtifactPutRequest } from '@hypha/core';
import { readArtifactStream } from './artifact-content-io';
import {
  HYPHA_CONTENT_HASH_METADATA_KEY,
  type S3ArtifactObjectState,
} from './s3-artifact-store-values';
import { S3ExecutionArtifactStore } from './s3-execution-artifact-store';
import type {
  S3ArtifactCopyResult,
  S3ArtifactDownloadAccess,
  S3ArtifactReadResult,
  S3ArtifactTransport,
  S3ArtifactWriteResult,
} from './s3-artifact-store-transport';

const fixedNow = '2026-07-28T00:00:00.000Z';

describe('S3ExecutionArtifactStore', () => {
  it('publishes staged content as a verified immutable S3 version', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    const controller = new AbortController();
    async function* chunks(): AsyncIterable<Uint8Array> {
      yield Uint8Array.from([1, 2]);
      yield Uint8Array.from([3, 4]);
    }
    const expectedHash = contentHash(Uint8Array.from([1, 2, 3, 4]));

    const ref = await store.put(
      {
        ...request('objects/report.bin', chunks()),
        expectedContentHash: expectedHash,
        sizeBytes: 4,
        metadata: { source: 'execution', label: '测试' },
      },
      { abortSignal: controller.signal }
    );

    expect(ref).toEqual({
      storeId: 'artifact-store.s3.test',
      bucketOrNamespace: 'hypha-artifacts',
      objectKey: 'objects/report.bin',
      versionId: 'version-1',
      etag: 'etag-1',
      region: 'us-east-1',
      encrypted: false,
    });
    expect(transport.lastUpload?.metadata[HYPHA_CONTENT_HASH_METADATA_KEY]).toBe(expectedHash);
    expect(transport.lastUpload?.abortSignal).toBe(controller.signal);
    await expect(store.head(ref)).resolves.toMatchObject({
      contentHash: expectedHash,
      sizeBytes: 4,
      mimeType: 'application/octet-stream',
      metadata: { source: 'execution', label: '测试' },
    });
    expect(transport.checkBucket).toHaveBeenCalledTimes(1);
  });

  it('fails a pre-aborted put before readiness or remote upload', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    const controller = new AbortController();
    controller.abort();

    await expect(
      store.put(request('objects/aborted.bin', Uint8Array.from([1])), {
        abortSignal: controller.signal,
      })
    ).rejects.toMatchObject({
      normalizedError: {
        code: 'ARTIFACT_UPLOAD_FAILED',
        retryable: false,
        details: {
          operation: 'put',
          providerCode: 'S3_ARTIFACT_TRANSFER_ABORTED',
        },
      },
    });
    expect(transport.checkBucket).not.toHaveBeenCalled();
    expect(transport.upload).not.toHaveBeenCalled();
  });

  it('stops before remote upload when cancellation arrives during staging', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    const controller = new AbortController();
    async function* content(): AsyncIterable<Uint8Array> {
      yield Uint8Array.from([1]);
      controller.abort();
      yield Uint8Array.from([2]);
    }

    await expect(
      store.put(request('objects/staging-aborted.bin', content()), {
        abortSignal: controller.signal,
      })
    ).rejects.toMatchObject({
      normalizedError: {
        code: 'ARTIFACT_UPLOAD_FAILED',
        retryable: false,
        details: {
          operation: 'put',
          providerCode: 'S3_ARTIFACT_TRANSFER_ABORTED',
        },
      },
    });
    expect(transport.upload).not.toHaveBeenCalled();
  });

  it('rolls back the uploaded version when cancellation arrives before publication', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    const controller = new AbortController();
    transport.afterUpload = () => controller.abort();

    await expect(
      store.put(request('objects/post-upload-aborted.bin', Uint8Array.from([1])), {
        abortSignal: controller.signal,
      })
    ).rejects.toMatchObject({
      normalizedError: {
        code: 'ARTIFACT_UPLOAD_FAILED',
        details: { providerCode: 'S3_ARTIFACT_TRANSFER_ABORTED' },
      },
    });
    expect(transport.delete).toHaveBeenCalledWith({
      bucket: 'hypha-artifacts',
      key: 'objects/post-upload-aborted.bin',
      versionId: 'version-1',
      expectedEtag: 'etag-1',
    });
    expect(transport.versions.get('objects/post-upload-aborted.bin')?.size ?? 0).toBe(0);
  });

  it('keeps overwritten object versions independently readable and deletable', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    const first = await store.put(request('objects/current.bin', Uint8Array.from([1])));
    const second = await store.put(request('objects/current.bin', Uint8Array.from([2])));

    await expect(readArtifactStream((await store.get({ ref: first })).stream)).resolves.toEqual(
      Uint8Array.from([1])
    );
    await expect(readArtifactStream((await store.get({ ref: second })).stream)).resolves.toEqual(
      Uint8Array.from([2])
    );
    await expect(store.exists(first)).resolves.toBe(true);
    await store.delete(first);
    await expect(store.exists(first)).resolves.toBe(false);
    await expect(store.exists(second)).resolves.toBe(true);
    await expect(store.delete(first)).resolves.toBeUndefined();
  });

  it('maps inclusive range reads while preserving the full object content hash', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    const ref = await store.put(request('objects/range.bin', Uint8Array.from([0, 1, 2, 3, 4])));

    const content = await store.get({
      ref,
      expectedContentHash: contentHash(Uint8Array.from([0, 1, 2, 3, 4])),
      range: { start: 1, endInclusive: 99 },
    });

    await expect(readArtifactStream(content.stream)).resolves.toEqual(
      Uint8Array.from([1, 2, 3, 4])
    );
    expect(content).toMatchObject({
      contentHash: contentHash(Uint8Array.from([0, 1, 2, 3, 4])),
      sizeBytes: 4,
      range: { start: 1, endInclusive: 4 },
    });
    expect(transport.lastGet).toMatchObject({
      versionId: ref.versionId,
      expectedEtag: ref.etag,
      expectedContentHash: content.contentHash,
    });
  });

  it('propagates cancellation context into S3 downloads', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    const ref = await store.put(request('objects/cancelled-read.bin', Uint8Array.from([1, 2])));
    const controller = new AbortController();

    await store.get({ ref }, { abortSignal: controller.signal });

    expect(transport.lastGet?.abortSignal).toBe(controller.signal);
  });

  it('performs pinned server-side copy and creates constrained download access', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    const source = await store.put(request('objects/source.bin', Uint8Array.from([5, 6])));

    const copy = await store.copy({
      operationId: 'copy:source',
      source,
      targetObjectKey: 'objects/copied.bin',
      ifAbsent: true,
    });
    const access = await store.createDownloadAccess({
      ref: copy,
      expiresInSeconds: 60,
      responseMimeType: 'application/octet-stream',
      responseFilename: 'result.bin',
    });

    expect(copy.versionId).not.toBe(source.versionId);
    await expect(readArtifactStream((await store.get({ ref: copy })).stream)).resolves.toEqual(
      Uint8Array.from([5, 6])
    );
    expect(access).toEqual({
      method: 'GET',
      url: 'https://downloads.example/signed?versionId=version-2&expires=60',
      expiresAt: '2026-07-28T00:01:00.000Z',
    });
    expect(transport.lastDownloadAccess).toMatchObject({
      versionId: copy.versionId,
      expectedEtag: copy.etag,
      expectedContentHash: contentHash(Uint8Array.from([5, 6])),
    });
  });

  it('rejects oversized, mismatched, and excessive metadata before remote upload', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport, { maxObjectBytes: 2, maxMetadataBytes: 8 });

    await expect(
      store.put(request('objects/large.bin', Uint8Array.from([1, 2, 3])))
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_TOO_LARGE' } });
    await expect(
      store.put({
        ...request('objects/size.bin', Uint8Array.from([1])),
        sizeBytes: 2,
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_VALIDATION_FAILED' } });
    await expect(
      store.put({
        ...request('objects/hash.bin', Uint8Array.from([1])),
        expectedContentHash: contentHash(Uint8Array.from([2])),
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_HASH_MISMATCH' } });
    await expect(
      store.put({
        ...request('objects/metadata.bin', Uint8Array.from([1])),
        metadata: { value: 'too-large' },
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_INVALID_INPUT' } });
    expect(transport.upload).not.toHaveBeenCalled();
  });

  it('fails closed when bucket versioning or uploaded version identity is unavailable', async () => {
    const unversionedTransport = new FakeS3ArtifactTransport();
    unversionedTransport.versioningEnabled = false;
    const unversionedStore = createStore(unversionedTransport);
    await expect(
      unversionedStore.put(request('objects/unversioned.bin', Uint8Array.from([1])))
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_UPLOAD_FAILED' } });
    expect(unversionedTransport.upload).not.toHaveBeenCalled();

    const incompleteTransport = new FakeS3ArtifactTransport();
    incompleteTransport.omitVersionOnWrite = true;
    const incompleteStore = createStore(incompleteTransport);
    await expect(
      incompleteStore.put(request('objects/incomplete.bin', Uint8Array.from([1])))
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_VALIDATION_FAILED' } });
  });

  it('rejects foreign, wrong-bucket, unversioned, and stale references', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    const ref = await store.put(request('objects/owned.bin', Uint8Array.from([1])));

    for (const invalidRef of [
      { ...ref, storeId: 'artifact-store.foreign' },
      { ...ref, bucketOrNamespace: 'foreign-bucket' },
      { ...ref, versionId: undefined },
    ]) {
      await expect(store.head(invalidRef)).rejects.toMatchObject({
        normalizedError: { code: 'ARTIFACT_INVALID_INPUT' },
      });
    }
    await expect(store.exists({ ...ref, etag: 'stale-etag' })).resolves.toBe(false);
  });

  it('rolls back the exact uploaded version when post-upload verification fails', async () => {
    const transport = new FakeS3ArtifactTransport();
    transport.corruptPublishedState = true;
    const store = createStore(transport);

    await expect(
      store.put(request('objects/corrupt.bin', Uint8Array.from([1, 2])))
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_HASH_MISMATCH' } });
    expect(transport.delete).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'objects/corrupt.bin', versionId: 'version-1' })
    );
    expect(transport.objectCount()).toBe(0);
  });

  it('normalizes provider failures without exposing provider payloads', async () => {
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
  });

  it('reports bounded health, exposes only implemented capabilities, and closes idempotently', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);

    await expect(store.capabilities()).resolves.toEqual({
      versioning: true,
      rangeRead: true,
      signedAccess: true,
      serverSideCopy: true,
      encryption: false,
      multipartUpload: true,
      contentAddressing: true,
    });
    await expect(store.health()).resolves.toEqual({
      status: 'healthy',
      checkedAt: fixedNow,
      details: { provider: 's3', versioningRequired: true, region: 'us-east-1' },
    });
    await store.close();
    await store.close();
    expect(transport.close).toHaveBeenCalledTimes(1);
    await expect(store.health()).resolves.toMatchObject({ status: 'unhealthy' });
    await expect(
      store.put(request('objects/closed.bin', Uint8Array.from([1])))
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_STORE_UNAVAILABLE' } });
  });

  it('rechecks health and retries readiness after credential recovery', async () => {
    const transport = new FakeS3ArtifactTransport();
    const store = createStore(transport);
    transport.checkBucketError = providerError('AccessDenied', 403);

    await expect(store.health()).resolves.toMatchObject({ status: 'unhealthy' });
    await expect(
      store.put(request('objects/recovered.bin', Uint8Array.from([1])))
    ).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_PERMISSION_DENIED' },
    });

    transport.checkBucketError = undefined;
    const ref = await store.put(request('objects/recovered.bin', Uint8Array.from([1])));
    await expect(store.health()).resolves.toMatchObject({ status: 'healthy' });

    transport.checkBucketError = providerError('AccessDenied', 403);
    await expect(store.health()).resolves.toMatchObject({ status: 'unhealthy' });
    transport.checkBucketError = undefined;
    await expect(store.head(ref)).resolves.toMatchObject({ sizeBytes: 1 });
  });
});

interface FakeObject extends S3ArtifactObjectState {
  bytes: Uint8Array;
}

class FakeS3ArtifactTransport implements S3ArtifactTransport {
  readonly upload = vi.fn(this.uploadObject.bind(this));
  readonly get = vi.fn(this.getObject.bind(this));
  readonly head = vi.fn(this.headObject.bind(this));
  readonly delete = vi.fn(this.deleteObject.bind(this));
  readonly copy = vi.fn(this.copyObject.bind(this));
  readonly createDownloadAccess = vi.fn(this.downloadAccess.bind(this));
  readonly checkBucket = vi.fn(this.checkBucketState.bind(this));
  readonly close = vi.fn();
  readonly versions = new Map<string, Map<string, FakeObject>>();
  readonly currentVersions = new Map<string, string>();
  versioningEnabled = true;
  checkBucketError?: unknown;
  omitVersionOnWrite = false;
  corruptPublishedState = false;
  nextError?: unknown;
  afterUpload?: () => void;
  lastUpload?: Parameters<S3ArtifactTransport['upload']>[0];
  lastGet?: Parameters<S3ArtifactTransport['get']>[0];
  lastDownloadAccess?: Parameters<S3ArtifactTransport['createDownloadAccess']>[0];
  private sequence = 0;

  private async uploadObject(
    input: Parameters<S3ArtifactTransport['upload']>[0]
  ): Promise<S3ArtifactWriteResult> {
    this.throwNext();
    this.lastUpload = input;
    if (input.ifAbsent && this.currentVersions.has(input.key)) {
      throw providerError('PreconditionFailed', 412);
    }
    const bytes = await readNodeStream(input.body);
    const sequence = ++this.sequence;
    const versionId = `version-${sequence}`;
    const state: FakeObject = {
      bytes,
      sizeBytes: bytes.byteLength,
      mimeType: input.contentType,
      etag: `etag-${sequence}`,
      versionId,
      lastModifiedAt: fixedNow,
      metadata: decodeMetadata(input.metadata),
      encrypted: false,
    };
    this.putVersion(input.key, state);
    this.afterUpload?.();
    return {
      etag: state.etag,
      ...(this.omitVersionOnWrite ? {} : { versionId }),
    };
  }

  private async getObject(
    input: Parameters<S3ArtifactTransport['get']>[0]
  ): Promise<S3ArtifactReadResult> {
    this.throwNext();
    this.lastGet = input;
    const state = this.requireVersion(input.key, input.versionId);
    this.assertExpected(state, input.expectedEtag, input.expectedContentHash);
    const selected = selectRange(state.bytes, input.range);
    return {
      state: objectState(state),
      stream: byteStream(selected.bytes),
      ...(selected.range ? { range: selected.range } : {}),
    };
  }

  private async headObject(
    input: Parameters<S3ArtifactTransport['head']>[0]
  ): Promise<S3ArtifactObjectState | null> {
    this.throwNext();
    const state = this.findVersion(input.key, input.versionId);
    if (!state) return null;
    const result = objectState(state);
    if (this.corruptPublishedState) {
      result.metadata = {
        ...result.metadata,
        [HYPHA_CONTENT_HASH_METADATA_KEY]: contentHash(Uint8Array.from([9])),
      };
    }
    return result;
  }

  private async deleteObject(
    input: Parameters<S3ArtifactTransport['delete']>[0]
  ): Promise<boolean> {
    this.throwNext();
    const versions = this.versions.get(input.key);
    const state = versions?.get(input.versionId);
    if (!versions || !state) return false;
    this.assertExpected(state, input.expectedEtag, undefined);
    versions.delete(input.versionId);
    if (versions.size === 0) {
      this.versions.delete(input.key);
      this.currentVersions.delete(input.key);
    } else if (this.currentVersions.get(input.key) === input.versionId) {
      const remainingVersion = [...versions.keys()].at(-1);
      if (!remainingVersion) throw new Error('Expected a remaining fake S3 object version.');
      this.currentVersions.set(input.key, remainingVersion);
    }
    return true;
  }

  private async copyObject(
    input: Parameters<S3ArtifactTransport['copy']>[0]
  ): Promise<S3ArtifactCopyResult> {
    this.throwNext();
    const source = this.requireVersion(input.sourceKey, input.sourceVersionId);
    this.assertExpected(source, input.expectedSourceEtag, undefined);
    if (input.ifAbsent && this.currentVersions.has(input.targetKey)) {
      throw providerError('PreconditionFailed', 412);
    }
    const sequence = ++this.sequence;
    const target: FakeObject = {
      ...objectState(source),
      bytes: Uint8Array.from(source.bytes),
      etag: `etag-${sequence}`,
      versionId: `version-${sequence}`,
    };
    this.putVersion(input.targetKey, target);
    return {
      etag: target.etag,
      versionId: target.versionId,
      state: objectState(target),
    };
  }

  private async downloadAccess(
    input: Parameters<S3ArtifactTransport['createDownloadAccess']>[0]
  ): Promise<S3ArtifactDownloadAccess> {
    this.throwNext();
    this.lastDownloadAccess = input;
    const state = this.requireVersion(input.key, input.versionId);
    this.assertExpected(state, input.expectedEtag, input.expectedContentHash);
    return {
      method: 'GET',
      url: `https://downloads.example/signed?versionId=${input.versionId}&expires=${input.expiresInSeconds}`,
      expiresAt: new Date(Date.parse(fixedNow) + input.expiresInSeconds * 1_000).toISOString(),
    };
  }

  private async checkBucketState(_bucket: string): Promise<void> {
    if (this.checkBucketError) throw this.checkBucketError;
    if (!this.versioningEnabled) throw providerError('InvalidBucketState', 400);
  }

  corrupt(key: string, versionId: string, bytes: Uint8Array): void {
    this.requireVersion(key, versionId).bytes = Uint8Array.from(bytes);
  }

  objectCount(): number {
    return [...this.versions.values()].reduce((total, versions) => total + versions.size, 0);
  }

  private putVersion(key: string, state: FakeObject): void {
    const versionId = requireFakeVersionId(state);
    const versions = this.versions.get(key) ?? new Map<string, FakeObject>();
    versions.set(versionId, state);
    this.versions.set(key, versions);
    this.currentVersions.set(key, versionId);
  }

  private findVersion(key: string, versionId?: string): FakeObject | undefined {
    const selectedVersion = versionId ?? this.currentVersions.get(key);
    return selectedVersion ? this.versions.get(key)?.get(selectedVersion) : undefined;
  }

  private requireVersion(key: string, versionId?: string): FakeObject {
    const state = this.findVersion(key, versionId);
    if (!state) throw providerError('NoSuchKey', 404);
    return state;
  }

  private assertExpected(
    state: FakeObject,
    expectedEtag: string | undefined,
    expectedContentHash: string | undefined
  ): void {
    if (expectedEtag && expectedEtag !== state.etag) {
      throw providerError('PreconditionFailed', 412);
    }
    if (
      expectedContentHash &&
      expectedContentHash !== state.metadata?.[HYPHA_CONTENT_HASH_METADATA_KEY]
    ) {
      throw providerError('PreconditionFailed', 412);
    }
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
  for await (const chunk of stream) {
    chunks.push(Uint8Array.from(chunk as Uint8Array));
  }
  return concatBytes(chunks);
}

function byteStream(bytes: Uint8Array): AsyncIterable<Uint8Array> {
  return (async function* stream(): AsyncIterable<Uint8Array> {
    yield Uint8Array.from(bytes);
  })();
}

function selectRange(
  bytes: Uint8Array,
  range?: { start: number; endInclusive?: number }
): { bytes: Uint8Array; range?: { start: number; endInclusive: number } } {
  if (!range) return { bytes: Uint8Array.from(bytes) };
  if (range.start >= bytes.byteLength) throw providerError('InvalidRange', 416);
  const endInclusive = Math.min(range.endInclusive ?? bytes.byteLength - 1, bytes.byteLength - 1);
  return {
    bytes: bytes.slice(range.start, endInclusive + 1),
    range: { start: range.start, endInclusive },
  };
}

function contentHash(bytes: Uint8Array): string {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}

function objectState(value: FakeObject): S3ArtifactObjectState {
  const { bytes: _bytes, ...state } = value;
  return {
    ...state,
    metadata: state.metadata ? { ...state.metadata } : undefined,
  };
}

function decodeMetadata(metadata: Record<string, string>): Record<string, string> {
  const result = { ...metadata };
  const encoded = metadata['hypha-user-metadata'];
  if (encoded) {
    result['hypha-user-metadata'] = encoded;
  }
  return result;
}

function concatBytes(chunks: Uint8Array[]): Uint8Array {
  const result = new Uint8Array(chunks.reduce((total, chunk) => total + chunk.byteLength, 0));
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}

function providerError(name: string, status: number): Error {
  const error = new Error('provider payload must not escape');
  error.name = name;
  return Object.assign(error, { $metadata: { httpStatusCode: status } });
}

function requireFakeVersionId(state: FakeObject): string {
  if (!state.versionId) throw new Error('Expected a versioned fake S3 object.');
  return state.versionId;
}
