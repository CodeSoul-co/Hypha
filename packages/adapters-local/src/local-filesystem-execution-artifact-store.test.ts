import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import type { ArtifactPutRequest } from '@hypha/core';
import { hashArtifactBytes, readArtifactStream } from './artifact-content-io';
import {
  listLocalArtifactFiles,
  localArtifactBlobPath,
  localArtifactManifestPath,
  prepareLocalArtifactStore,
} from './local-artifact-files';
import { LocalFilesystemExecutionArtifactStore } from './local-filesystem-execution-artifact-store';

const fixedNow = '2026-07-18T00:00:00.000Z';

describe('LocalFilesystemExecutionArtifactStore', () => {
  it('persists streamed content and recovers it after Store restart', async () => {
    const root = await createRoot();
    const store = createStore(root);
    async function* chunks(): AsyncIterable<Uint8Array> {
      yield Uint8Array.from([1, 2]);
      yield Uint8Array.from([3, 4]);
    }
    const expectedHash = hashArtifactBytes(Uint8Array.from([1, 2, 3, 4]));
    const ref = await store.put({
      ...request('objects/report.bin', chunks()),
      expectedContentHash: expectedHash,
      sizeBytes: 4,
      metadata: { source: 'test' },
    });
    await store.close();

    const restarted = createStore(root);
    const content = await restarted.get({ ref, expectedContentHash: expectedHash });

    await expect(readArtifactStream(content.stream)).resolves.toEqual(
      Uint8Array.from([1, 2, 3, 4])
    );
    await expect(restarted.head(ref)).resolves.toMatchObject({
      contentHash: expectedHash,
      sizeBytes: 4,
      metadata: { source: 'test' },
      lastModifiedAt: fixedNow,
    });
    expect(ref).not.toHaveProperty('rootPath');
    expect(ref.objectKey).toBe('objects/report.bin');
  });

  it('deduplicates identical content while keeping independent object manifests', async () => {
    const root = await createRoot();
    const store = createStore(root);
    const bytes = Uint8Array.from([5, 6, 7]);
    await store.put(request('objects/one.bin', bytes));
    await store.put(request('objects/two.bin', bytes));

    await expect(store.stats()).resolves.toEqual({ objects: 2, blobs: 1, storedBytes: 3 });
  });

  it('rejects stale refs after overwrite and preserves the current object', async () => {
    const root = await createRoot();
    const store = createStore(root);
    const stale = await store.put(request('objects/current.bin', Uint8Array.from([1])));
    const current = await store.put(request('objects/current.bin', Uint8Array.from([2])));

    await expect(store.exists(stale)).resolves.toBe(false);
    await expect(store.get({ ref: stale })).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_VERSION_CONFLICT' },
    });
    await expect(store.delete(stale)).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_VERSION_CONFLICT' },
    });
    await expect(readArtifactStream((await store.get({ ref: current })).stream)).resolves.toEqual(
      Uint8Array.from([2])
    );
    await expect(store.stats()).resolves.toEqual({ objects: 1, blobs: 1, storedBytes: 1 });
  });

  it('supports inclusive range reads without returning bytes outside the range', async () => {
    const root = await createRoot();
    const store = createStore(root);
    const ref = await store.put(request('objects/range.bin', Uint8Array.from([0, 1, 2, 3, 4])));
    const content = await store.get({ ref, range: { start: 1, endInclusive: 99 } });

    await expect(readArtifactStream(content.stream)).resolves.toEqual(
      Uint8Array.from([1, 2, 3, 4])
    );
    expect(content).toMatchObject({ sizeBytes: 4, range: { start: 1, endInclusive: 4 } });
    await expect(store.get({ ref, range: { start: 5 } })).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_INVALID_INPUT' },
    });
  });

  it('copies by manifest and removes a Blob only after its final object is deleted', async () => {
    const root = await createRoot();
    const store = createStore(root);
    const source = await store.put(request('objects/source.bin', Uint8Array.from([8, 9])));
    const copy = await store.copy({
      operationId: 'operation.copy',
      source,
      targetObjectKey: 'objects/copied.bin',
      ifAbsent: true,
    });

    await expect(store.stats()).resolves.toEqual({ objects: 2, blobs: 1, storedBytes: 2 });
    await store.delete(source);
    await expect(store.exists(copy)).resolves.toBe(true);
    await expect(store.stats()).resolves.toEqual({ objects: 1, blobs: 1, storedBytes: 2 });
    await store.delete(copy);
    await expect(store.stats()).resolves.toEqual({ objects: 0, blobs: 0, storedBytes: 0 });
    await expect(store.delete(copy)).resolves.toBeUndefined();
  });

  it('publishes only one concurrent ifAbsent writer and leaves no temporary files', async () => {
    const root = await createRoot();
    const store = createStore(root);
    const writes = await Promise.allSettled([
      store.put({ ...request('objects/atomic.bin', Uint8Array.from([1])), ifAbsent: true }),
      store.put({ ...request('objects/atomic.bin', Uint8Array.from([2])), ifAbsent: true }),
    ]);

    expect(writes.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
    expect(writes.filter((result) => result.status === 'rejected')).toHaveLength(1);
    await expect(store.stats()).resolves.toEqual({ objects: 1, blobs: 1, storedBytes: 1 });
    const paths = await prepareLocalArtifactStore(root);
    await expect(fs.readdir(paths.temporary)).resolves.toEqual([]);
  });

  it('fails closed when persisted Blob bytes are modified outside the Store', async () => {
    const root = await createRoot();
    const store = createStore(root);
    const ref = await store.put(request('objects/integrity.bin', Uint8Array.from([1, 2, 3])));
    const metadata = await store.head(ref);
    const paths = await prepareLocalArtifactStore(root);
    await fs.writeFile(
      localArtifactBlobPath(paths, metadata!.contentHash),
      Uint8Array.from([3, 2, 1])
    );

    await expect(store.get({ ref })).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_HASH_MISMATCH' },
    });
  });

  it('rejects invalid input and bounded writes without publishing partial state', async () => {
    const root = await createRoot();
    const store = createStore(root, { maxObjectBytes: 2 });
    await expect(
      store.put(request('objects/large.bin', Uint8Array.from([1, 2, 3])))
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_TOO_LARGE' } });
    await expect(
      store.put({
        ...request('objects/hash.bin', Uint8Array.from([1])),
        expectedContentHash: `sha256:${'0'.repeat(64)}`,
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_HASH_MISMATCH' } });
    await expect(store.put(request('../escape.bin', Uint8Array.from([1])))).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_INVALID_INPUT' },
    });

    await expect(store.stats()).resolves.toEqual({ objects: 0, blobs: 0, storedBytes: 0 });
    const paths = await prepareLocalArtifactStore(root);
    await expect(fs.readdir(paths.temporary)).resolves.toEqual([]);
  });

  it('collects orphan Blobs without touching referenced content', async () => {
    const root = await createRoot();
    const store = createStore(root);
    await store.put(request('objects/kept.bin', Uint8Array.from([1, 2])));
    const paths = await prepareLocalArtifactStore(root);
    const orphanDigest = 'f'.repeat(64);
    const orphanPath = path.join(paths.blobs, orphanDigest.slice(0, 2), orphanDigest);
    await fs.mkdir(path.dirname(orphanPath), { recursive: true });
    await fs.writeFile(orphanPath, Uint8Array.from([9, 9, 9]));

    await expect(store.collectGarbage()).resolves.toEqual({ deletedBlobs: 1, reclaimedBytes: 3 });
    await expect(store.stats()).resolves.toEqual({ objects: 1, blobs: 1, storedBytes: 2 });
  });

  it('stores bounded metadata manifests without plaintext content or host paths', async () => {
    const root = await createRoot();
    const store = createStore(root);
    const secretLikeContent = new TextEncoder().encode('content-must-not-enter-manifest');
    await store.put(request('objects/private.txt', secretLikeContent));
    const paths = await prepareLocalArtifactStore(root);
    const manifest = await fs.readFile(
      localArtifactManifestPath(paths, 'objects/private.txt'),
      'utf8'
    );

    expect(manifest).not.toContain('content-must-not-enter-manifest');
    expect(manifest).not.toContain(paths.root);
    await expect(listLocalArtifactFiles(paths.objects, '.json')).resolves.toHaveLength(1);
  });

  it('reports implemented capabilities and lifecycle health accurately', async () => {
    const root = await createRoot();
    const store = createStore(root);
    await expect(store.capabilities()).resolves.toEqual({
      versioning: false,
      rangeRead: true,
      signedAccess: false,
      serverSideCopy: true,
      encryption: false,
      multipartUpload: false,
      contentAddressing: true,
    });
    await expect(store.health()).resolves.toMatchObject({ status: 'healthy' });
    await store.close();
    await expect(store.health()).resolves.toMatchObject({ status: 'unhealthy' });
    await expect(
      store.put(request('objects/closed.bin', Uint8Array.from([1])))
    ).rejects.toMatchObject({ normalizedError: { code: 'ARTIFACT_STORE_UNAVAILABLE' } });
  });

  it('refuses a Store layout whose managed parent is a symbolic link', async () => {
    const root = await createRoot();
    const outside = await createRoot();
    try {
      await fs.symlink(
        outside,
        path.join(root, 'blobs'),
        process.platform === 'win32' ? 'junction' : 'dir'
      );
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'EPERM') return;
      throw error;
    }

    await expect(createStore(root).health()).resolves.toMatchObject({ status: 'unhealthy' });
  });
});

async function createRoot(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-artifacts-'));
}

function createStore(
  rootPath: string,
  options: { maxObjectBytes?: number } = {}
): LocalFilesystemExecutionArtifactStore {
  return new LocalFilesystemExecutionArtifactStore({
    id: 'artifact-store.local.test',
    rootPath,
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
