import { describe, expect, it } from 'vitest';
import type { ArtifactPutRequest } from '@hypha/core';
import { hashArtifactBytes, readArtifactStream } from './artifact-content-io';
import {
  ArtifactStoreAdapterError,
  InMemoryExecutionArtifactStore,
} from './in-memory-execution-artifact-store';

const fixedNow = '2026-07-18T00:00:00.000Z';

describe('InMemoryExecutionArtifactStore', () => {
  it('streams content, computes its digest, and returns defensive read snapshots', async () => {
    const store = createStore();
    const source = new Uint8Array([1, 2, 3, 4]);
    const ref = await store.put(request('objects/one.bin', source));
    source[0] = 99;

    const expectedHash = hashArtifactBytes(Uint8Array.from([1, 2, 3, 4]));
    const content = await store.get({ ref, expectedContentHash: expectedHash });
    const firstRead = await readArtifactStream(content.stream);
    firstRead[0] = 88;
    const secondRead = await readArtifactStream((await store.get({ ref })).stream);

    expect([...secondRead]).toEqual([1, 2, 3, 4]);
    expect(content).toMatchObject({
      contentHash: expectedHash,
      sizeBytes: 4,
    });
    await expect(store.head(ref)).resolves.toMatchObject({
      contentHash: content.contentHash,
      sizeBytes: 4,
      lastModifiedAt: fixedNow,
    });
  });

  it('accepts async chunks and deduplicates identical blobs across object keys', async () => {
    const store = createStore();
    async function* chunks(): AsyncIterable<Uint8Array> {
      yield new Uint8Array([1, 2]);
      yield new Uint8Array([3, 4]);
    }

    await store.put(request('objects/stream.bin', chunks()));
    await store.put(request('objects/copy.bin', new Uint8Array([1, 2, 3, 4])));

    expect(store.stats()).toEqual({ objects: 2, blobs: 1, storedBytes: 4 });
  });

  it('supports inclusive ranges and clamps their end to the object size', async () => {
    const store = createStore();
    const ref = await store.put(request('objects/range.bin', new Uint8Array([0, 1, 2, 3, 4])));
    const content = await store.get({ ref, range: { start: 2, endInclusive: 99 } });

    await expect(readArtifactStream(content.stream)).resolves.toEqual(new Uint8Array([2, 3, 4]));
    expect(content).toMatchObject({ sizeBytes: 3, range: { start: 2, endInclusive: 4 } });
    await expect(store.get({ ref, range: { start: 5 } })).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_INVALID_INPUT' },
    });
  });

  it('rejects stale refs after an object key is overwritten', async () => {
    const store = createStore();
    const stale = await store.put(request('objects/current.bin', new Uint8Array([1])));
    const current = await store.put(request('objects/current.bin', new Uint8Array([2])));

    await expect(store.exists(stale)).resolves.toBe(false);
    await expect(store.get({ ref: stale })).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_VERSION_CONFLICT' },
    });
    await expect(store.delete(stale)).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_VERSION_CONFLICT' },
    });
    await expect(readArtifactStream((await store.get({ ref: current })).stream)).resolves.toEqual(
      new Uint8Array([2])
    );
  });

  it('copies by reference and garbage-collects blobs after the last object is deleted', async () => {
    const store = createStore();
    const source = await store.put(request('objects/source.bin', new Uint8Array([5, 6, 7])));
    const copy = await store.copy({
      operationId: 'operation.copy',
      source,
      targetObjectKey: 'objects/copied.bin',
      ifAbsent: true,
    });

    expect(store.stats()).toEqual({ objects: 2, blobs: 1, storedBytes: 3 });
    await store.delete(source);
    expect(store.stats()).toEqual({ objects: 1, blobs: 1, storedBytes: 3 });
    await store.delete(copy);
    expect(store.stats()).toEqual({ objects: 0, blobs: 0, storedBytes: 0 });
    await expect(store.delete(copy)).resolves.toBeUndefined();
  });

  it('publishes an ifAbsent object atomically under concurrent requests', async () => {
    const store = createStore();
    const writes = await Promise.allSettled([
      store.put({ ...request('objects/atomic.bin', new Uint8Array([1])), ifAbsent: true }),
      store.put({ ...request('objects/atomic.bin', new Uint8Array([2])), ifAbsent: true }),
    ]);

    expect(writes.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
    expect(writes.filter((result) => result.status === 'rejected')).toHaveLength(1);
    expect(store.stats()).toEqual({ objects: 1, blobs: 1, storedBytes: 1 });
  });

  it('fails closed on hash, size, overwrite, Store ownership, and stream violations', async () => {
    const store = createStore();
    const bytes = new Uint8Array([1, 2, 3]);
    await expect(
      store.put({
        ...request('objects/hash.bin', bytes),
        expectedContentHash: `sha256:${'0'.repeat(64)}`,
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_HASH_MISMATCH' } });
    await expect(
      store.put({ ...request('objects/size.bin', bytes), sizeBytes: 4 })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_VALIDATION_FAILED' } });

    const ref = await store.put({ ...request('objects/existing.bin', bytes), ifAbsent: true });
    await expect(
      store.put({ ...request('objects/existing.bin', bytes), ifAbsent: true })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_VERSION_CONFLICT' } });
    await expect(
      store.get({ ref: { ...ref, storeId: 'artifact-store.other' } })
    ).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_INVALID_INPUT' },
    });

    async function* invalidChunks(): AsyncIterable<Uint8Array> {
      yield 'not-bytes' as unknown as Uint8Array;
    }
    await expect(store.put(request('objects/invalid.bin', invalidChunks()))).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_INVALID_INPUT' },
    });
  });

  it('bounds memory use and reports lifecycle health', async () => {
    const store = createStore({ maxObjectBytes: 2 });
    await expect(
      store.put(request('objects/large.bin', new Uint8Array([1, 2, 3])))
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_TOO_LARGE' } });
    await expect(store.health()).resolves.toMatchObject({ status: 'healthy' });

    await store.close();
    await expect(store.health()).resolves.toMatchObject({ status: 'unhealthy' });
    await expect(
      store.put(request('objects/closed.bin', new Uint8Array([1])))
    ).rejects.toBeInstanceOf(ArtifactStoreAdapterError);
  });

  it('advertises only the capabilities it actually implements', async () => {
    await expect(createStore().capabilities()).resolves.toEqual({
      versioning: false,
      rangeRead: true,
      signedAccess: false,
      serverSideCopy: true,
      encryption: false,
      multipartUpload: false,
      contentAddressing: true,
    });
  });
});

function createStore(options: { maxObjectBytes?: number } = {}): InMemoryExecutionArtifactStore {
  return new InMemoryExecutionArtifactStore({
    id: 'artifact-store.test',
    now: () => fixedNow,
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
