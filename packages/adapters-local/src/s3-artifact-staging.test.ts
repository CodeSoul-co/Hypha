import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { ArtifactContentLimitError, readArtifactStream } from './artifact-content-io';
import { stageS3ArtifactContent } from './s3-artifact-staging';
import { S3ArtifactTransferAbortedError } from './s3-artifact-store-transport';

const prefix = 'hypha-s3-artifact-';

describe('stageS3ArtifactContent', () => {
  it('stages streamed bytes once with bounded size and an authoritative hash', async () => {
    async function* source(): AsyncIterable<Uint8Array> {
      yield Uint8Array.from([1, 2]);
      yield Uint8Array.from([3, 4]);
    }
    const staged = await stageS3ArtifactContent(source(), 4);
    const expectedHash = createHash('sha256')
      .update(Uint8Array.from([1, 2, 3, 4]))
      .digest('hex');

    expect(staged).toMatchObject({
      contentHash: `sha256:${expectedHash}`,
      sizeBytes: 4,
    });
    await expect(readArtifactStream(staged.createReadStream())).resolves.toEqual(
      Uint8Array.from([1, 2, 3, 4])
    );

    await staged.cleanup();
    await expect(staged.cleanup()).resolves.toBeUndefined();
    expect(() => staged.createReadStream()).toThrow('already cleaned');
  });

  it('removes partial staging state when the byte limit is exceeded', async () => {
    const before = await stagingDirectories();

    const failure = await stageS3ArtifactContent(Uint8Array.from([1, 2, 3]), 2).catch(
      (error: unknown) => error
    );

    expect(failure).toBeInstanceOf(ArtifactContentLimitError);
    expect(failure).toMatchObject({ maxBytes: 2, observedBytes: 3 });
    await expect(stagingDirectories()).resolves.toEqual(before);
  });

  it('removes partial staging state when a stream yields an invalid chunk', async () => {
    const before = await stagingDirectories();
    const invalid = (async function* (): AsyncIterable<Uint8Array> {
      yield Uint8Array.from([1]);
      yield 'not-bytes' as unknown as Uint8Array;
    })();

    await expect(stageS3ArtifactContent(invalid, 10)).rejects.toThrow(
      'must yield Uint8Array chunks'
    );
    await expect(stagingDirectories()).resolves.toEqual(before);
  });

  it('rejects a pre-aborted staging operation without creating temporary state', async () => {
    const before = await stagingDirectories();
    const controller = new AbortController();
    controller.abort();

    await expect(
      stageS3ArtifactContent(Uint8Array.from([1]), 1, controller.signal)
    ).rejects.toBeInstanceOf(S3ArtifactTransferAbortedError);
    await expect(stagingDirectories()).resolves.toEqual(before);
  });

  it('removes partial staging state when cancellation arrives between chunks', async () => {
    const before = await stagingDirectories();
    const controller = new AbortController();
    async function* source(): AsyncIterable<Uint8Array> {
      yield Uint8Array.from([1]);
      controller.abort();
      yield Uint8Array.from([2]);
    }

    await expect(stageS3ArtifactContent(source(), 2, controller.signal)).rejects.toBeInstanceOf(
      S3ArtifactTransferAbortedError
    );
    await expect(stagingDirectories()).resolves.toEqual(before);
  });

  it('closes an outstanding staged read stream before removing its directory', async () => {
    const before = await stagingDirectories();
    const staged = await stageS3ArtifactContent(Uint8Array.from([1, 2, 3]), 3);
    const stream = staged.createReadStream();

    await staged.cleanup();

    expect(stream.closed).toBe(true);
    await expect(stagingDirectories()).resolves.toEqual(before);
  });

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects an invalid maxObjectBytes value: %s',
    async (maxObjectBytes) => {
      await expect(stageS3ArtifactContent(Uint8Array.from([1]), maxObjectBytes)).rejects.toThrow(
        'must be a positive safe integer'
      );
    }
  );
});

async function stagingDirectories(): Promise<string[]> {
  return (await fs.readdir(os.tmpdir()))
    .filter((entry) => entry.startsWith(prefix))
    .map((entry) => path.join(os.tmpdir(), entry))
    .sort();
}
