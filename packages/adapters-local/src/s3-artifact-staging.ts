import { createHash, randomUUID } from 'node:crypto';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type { ArtifactByteSource } from '@codesoul-co/core';
import { ArtifactContentLimitError } from './artifact-content-io';
import { S3ArtifactTransferAbortedError } from './s3-artifact-store-transport';

const STAGING_DIRECTORY_PREFIX = 'hypha-s3-artifact-';

export interface StagedS3ArtifactContent {
  contentHash: string;
  sizeBytes: number;
  createReadStream(): fs.ReadStream;
  cleanup(): Promise<void>;
}

/**
 * Stages one bounded Artifact while calculating its authoritative SHA-256.
 * This prevents retrying or multipart transports from consuming a one-shot
 * input stream more than once.
 */
export async function stageS3ArtifactContent(
  source: ArtifactByteSource,
  maxObjectBytes: number,
  abortSignal?: AbortSignal
): Promise<StagedS3ArtifactContent> {
  assertPositiveSafeInteger(maxObjectBytes, 'maxObjectBytes');
  assertNotAborted(abortSignal);
  const directory = await fsPromises.mkdtemp(path.join(os.tmpdir(), STAGING_DIRECTORY_PREFIX));
  const filename = path.join(directory, `${randomUUID()}.upload`);
  let handle: fsPromises.FileHandle | undefined;
  const hash = createHash('sha256');
  let sizeBytes = 0;

  try {
    assertNotAborted(abortSignal);
    handle = await fsPromises.open(filename, 'wx', 0o600);
    for await (const chunk of toAsyncChunks(source)) {
      assertNotAborted(abortSignal);
      if (!(chunk instanceof Uint8Array)) {
        throw new TypeError('Artifact content streams must yield Uint8Array chunks.');
      }
      sizeBytes += chunk.byteLength;
      if (sizeBytes > maxObjectBytes) {
        throw new ArtifactContentLimitError(maxObjectBytes, sizeBytes);
      }
      hash.update(chunk);
      await writeAll(handle, chunk, abortSignal);
    }
    assertNotAborted(abortSignal);
    await handle.sync();
    assertNotAborted(abortSignal);
    await handle.close();
    handle = undefined;
  } catch (error) {
    await handle?.close().catch(() => undefined);
    await fsPromises.rm(directory, { recursive: true, force: true }).catch(() => undefined);
    throw error;
  }

  let cleaned = false;
  const streams = new Set<fs.ReadStream>();
  return {
    contentHash: `sha256:${hash.digest('hex')}`,
    sizeBytes,
    createReadStream: () => {
      if (cleaned) throw new Error('Staged S3 Artifact content is already cleaned.');
      const stream = fs.createReadStream(filename);
      streams.add(stream);
      stream.once('close', () => streams.delete(stream));
      return stream;
    },
    cleanup: async () => {
      if (cleaned) return;
      cleaned = true;
      await Promise.all([...streams].map(closeReadStream));
      await fsPromises.rm(directory, { recursive: true, force: true });
    },
  };
}

async function closeReadStream(stream: fs.ReadStream): Promise<void> {
  if (stream.closed) return;
  const closed = new Promise<void>((resolve) => stream.once('close', resolve));
  stream.destroy();
  if (!stream.closed) await closed;
}

async function* toAsyncChunks(source: ArtifactByteSource): AsyncIterable<Uint8Array> {
  if (source instanceof Uint8Array) {
    yield source;
    return;
  }
  yield* source;
}

async function writeAll(
  handle: fsPromises.FileHandle,
  chunk: Uint8Array,
  abortSignal?: AbortSignal
): Promise<void> {
  let offset = 0;
  while (offset < chunk.byteLength) {
    assertNotAborted(abortSignal);
    const result = await handle.write(chunk, offset, chunk.byteLength - offset, null);
    if (result.bytesWritten <= 0) throw new Error('Failed to stage Artifact content.');
    offset += result.bytesWritten;
  }
  assertNotAborted(abortSignal);
}

function assertPositiveSafeInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer.`);
  }
}

function assertNotAborted(abortSignal: AbortSignal | undefined): void {
  if (abortSignal?.aborted) throw new S3ArtifactTransferAbortedError();
}
