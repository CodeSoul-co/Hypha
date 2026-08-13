import { createHash } from 'node:crypto';
import type { ArtifactByteSource } from '@hypha/core';

export interface CollectedArtifactContent {
  bytes: Uint8Array;
  contentHash: string;
}

export async function collectArtifactContent(
  source: ArtifactByteSource,
  maxBytes: number
): Promise<CollectedArtifactContent> {
  const chunks: Uint8Array[] = [];
  const hash = createHash('sha256');
  let sizeBytes = 0;

  for await (const chunk of toAsyncChunks(source)) {
    if (!(chunk instanceof Uint8Array)) {
      throw new TypeError('Artifact content streams must yield Uint8Array chunks.');
    }
    sizeBytes += chunk.byteLength;
    if (sizeBytes > maxBytes) {
      throw new ArtifactContentLimitError(maxBytes, sizeBytes);
    }
    const copy = Uint8Array.from(chunk);
    chunks.push(copy);
    hash.update(copy);
  }

  const bytes = new Uint8Array(sizeBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return {
    bytes,
    contentHash: `sha256:${hash.digest('hex')}`,
  };
}

export function hashArtifactBytes(bytes: Uint8Array): string {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}

export function streamArtifactBytes(bytes: Uint8Array): AsyncIterable<Uint8Array> {
  const snapshot = Uint8Array.from(bytes);
  return (async function* stream(): AsyncIterable<Uint8Array> {
    yield snapshot;
  })();
}

export async function readArtifactStream(stream: AsyncIterable<Uint8Array>): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  let sizeBytes = 0;
  for await (const chunk of stream) {
    chunks.push(chunk);
    sizeBytes += chunk.byteLength;
  }
  const bytes = new Uint8Array(sizeBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

export class ArtifactContentLimitError extends Error {
  constructor(
    readonly maxBytes: number,
    readonly observedBytes: number
  ) {
    super(`Artifact content exceeds the ${maxBytes} byte in-memory limit.`);
    this.name = 'ArtifactContentLimitError';
  }
}

async function* toAsyncChunks(source: ArtifactByteSource): AsyncIterable<Uint8Array> {
  if (source instanceof Uint8Array) {
    yield source;
    return;
  }
  yield* source;
}
