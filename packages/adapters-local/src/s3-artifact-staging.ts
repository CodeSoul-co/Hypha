import { createHash, randomUUID } from 'node:crypto';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type { ArtifactByteSource } from '@hypha/core';
import { ArtifactContentLimitError } from './artifact-content-io';

export interface StagedS3ArtifactContent {
  filename: string;
  contentHash: string;
  sizeBytes: number;
  createReadStream(): fs.ReadStream;
  cleanup(): Promise<void>;
}

export async function stageS3ArtifactContent(
  source: ArtifactByteSource,
  maxObjectBytes: number
): Promise<StagedS3ArtifactContent> {
  const directory = await fsPromises.mkdtemp(path.join(os.tmpdir(), 'hypha-s3-artifact-'));
  const filename = path.join(directory, `${randomUUID()}.upload`);
  const handle = await fsPromises.open(filename, 'wx', 0o600);
  const hash = createHash('sha256');
  let sizeBytes = 0;

  try {
    for await (const chunk of toAsyncChunks(source)) {
      if (!(chunk instanceof Uint8Array)) {
        throw new TypeError('Artifact content streams must yield Uint8Array chunks.');
      }
      sizeBytes += chunk.byteLength;
      if (sizeBytes > maxObjectBytes) {
        throw new ArtifactContentLimitError(maxObjectBytes, sizeBytes);
      }
      hash.update(chunk);
      await writeAll(handle, chunk);
    }
    await handle.sync();
  } catch (error) {
    await handle.close().catch(() => undefined);
    await cleanupStagingDirectory(directory);
    throw error;
  }
  await handle.close();

  return {
    filename,
    contentHash: `sha256:${hash.digest('hex')}`,
    sizeBytes,
    createReadStream: () => fs.createReadStream(filename),
    cleanup: async () => {
      // Windows can retain a just-consumed ReadStream handle briefly. Cleanup
      // is best-effort housekeeping and must not delay or replace the
      // authoritative upload/validation result.
      void cleanupStagingDirectory(directory);
    },
  };
}

async function cleanupStagingDirectory(directory: string): Promise<void> {
  await fsPromises
    .rm(directory, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 20,
    })
    .catch(() => undefined);
}

async function* toAsyncChunks(source: ArtifactByteSource): AsyncIterable<Uint8Array> {
  if (source instanceof Uint8Array) {
    yield source;
    return;
  }
  yield* source;
}

async function writeAll(handle: fsPromises.FileHandle, chunk: Uint8Array): Promise<void> {
  let offset = 0;
  while (offset < chunk.byteLength) {
    const result = await handle.write(chunk, offset, chunk.byteLength - offset, null);
    if (result.bytesWritten <= 0) throw new Error('Failed to stage Artifact content.');
    offset += result.bytesWritten;
  }
}
