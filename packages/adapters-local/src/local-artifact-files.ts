import { createHash, randomUUID } from 'node:crypto';
import { createReadStream } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { ArtifactByteRange, ArtifactByteSource } from '@codesoul-co/core';
import { ArtifactContentLimitError } from './artifact-content-io';

export interface LocalArtifactStorePaths {
  root: string;
  blobs: string;
  objects: string;
  temporary: string;
}

export interface LocalArtifactTempFile {
  path: string;
  contentHash: string;
  sizeBytes: number;
}

export class LocalArtifactTransferAbortedError extends Error {
  readonly code = 'LOCAL_ARTIFACT_TRANSFER_ABORTED';

  constructor() {
    super('Local Artifact transfer was aborted.');
    this.name = 'LocalArtifactTransferAbortedError';
  }
}

export async function prepareLocalArtifactStore(
  rootPath: string
): Promise<LocalArtifactStorePaths> {
  const requestedRoot = path.resolve(rootPath);
  await fs.mkdir(requestedRoot, { recursive: true });
  const root = await fs.realpath(requestedRoot);
  const paths: LocalArtifactStorePaths = {
    root,
    blobs: path.join(root, 'blobs', 'sha256'),
    objects: path.join(root, 'objects'),
    temporary: path.join(root, 'tmp'),
  };
  for (const directory of [paths.blobs, paths.objects, paths.temporary]) {
    await ensureSafeLocalArtifactDirectory(root, directory);
  }
  return paths;
}

export async function writeLocalArtifactTempFile(
  source: ArtifactByteSource,
  paths: LocalArtifactStorePaths,
  maxBytes: number,
  abortSignal?: AbortSignal
): Promise<LocalArtifactTempFile> {
  assertLocalArtifactTransferActive(abortSignal);
  const temporaryPath = path.join(paths.temporary, `upload-${randomUUID()}.tmp`);
  assertContainedPath(paths.root, temporaryPath);
  const handle = await fs.open(temporaryPath, 'wx', 0o600);
  const hash = createHash('sha256');
  let sizeBytes = 0;
  try {
    for await (const chunk of toAsyncChunks(source)) {
      assertLocalArtifactTransferActive(abortSignal);
      if (!(chunk instanceof Uint8Array)) {
        throw new TypeError('Artifact content streams must yield Uint8Array chunks.');
      }
      sizeBytes += chunk.byteLength;
      if (sizeBytes > maxBytes) throw new ArtifactContentLimitError(maxBytes, sizeBytes);
      hash.update(chunk);
      await writeAll(handle, chunk, abortSignal);
    }
    assertLocalArtifactTransferActive(abortSignal);
    await handle.sync();
    assertLocalArtifactTransferActive(abortSignal);
  } catch (error) {
    await handle.close().catch(() => undefined);
    await fs.rm(temporaryPath, { force: true }).catch(() => undefined);
    throw error;
  }
  await handle.close();
  return {
    path: temporaryPath,
    contentHash: `sha256:${hash.digest('hex')}`,
    sizeBytes,
  };
}

export async function publishLocalArtifactBlob(
  root: string,
  temporaryPath: string,
  blobPath: string,
  expectedHash: string,
  expectedSizeBytes: number
): Promise<void> {
  await ensureSafeLocalArtifactDirectory(root, path.dirname(blobPath));
  try {
    await fs.link(temporaryPath, blobPath);
  } catch (error) {
    if (!isNodeError(error, 'EEXIST')) throw error;
    const existing = await hashLocalArtifactFile(blobPath, root);
    if (existing.contentHash !== expectedHash || existing.sizeBytes !== expectedSizeBytes) {
      throw new LocalArtifactIntegrityError(
        `Artifact digest collision or corrupted blob detected: ${expectedHash}`
      );
    }
  } finally {
    await fs.rm(temporaryPath, { force: true }).catch(() => undefined);
  }
}

export async function hashLocalArtifactFile(
  filename: string,
  root?: string,
  abortSignal?: AbortSignal
): Promise<{ contentHash: string; sizeBytes: number }> {
  assertLocalArtifactTransferActive(abortSignal);
  if (root) await ensureSafeLocalArtifactFile(root, filename);
  assertLocalArtifactTransferActive(abortSignal);
  const hash = createHash('sha256');
  let sizeBytes = 0;
  const stream = createReadStream(filename);
  const abort = (): void => {
    stream.destroy(new LocalArtifactTransferAbortedError());
  };
  abortSignal?.addEventListener('abort', abort, { once: true });
  try {
    for await (const chunk of stream) {
      assertLocalArtifactTransferActive(abortSignal);
      const bytes = chunk as Buffer;
      sizeBytes += bytes.byteLength;
      hash.update(bytes);
    }
    assertLocalArtifactTransferActive(abortSignal);
  } finally {
    abortSignal?.removeEventListener('abort', abort);
    if (!stream.destroyed) stream.destroy();
  }
  return { contentHash: `sha256:${hash.digest('hex')}`, sizeBytes };
}

export function streamLocalArtifactFile(
  filename: string,
  range?: ArtifactByteRange,
  root?: string,
  abortSignal?: AbortSignal
): AsyncIterable<Uint8Array> {
  return (async function* chunks(): AsyncIterable<Uint8Array> {
    assertLocalArtifactTransferActive(abortSignal);
    if (root) await ensureSafeLocalArtifactFile(root, filename);
    assertLocalArtifactTransferActive(abortSignal);
    const stream = createReadStream(filename, {
      ...(range ? { start: range.start, end: range.endInclusive } : {}),
    });
    const abort = (): void => {
      stream.destroy(new LocalArtifactTransferAbortedError());
    };
    abortSignal?.addEventListener('abort', abort, { once: true });
    try {
      for await (const chunk of stream) {
        assertLocalArtifactTransferActive(abortSignal);
        yield Uint8Array.from(chunk as Buffer);
      }
      assertLocalArtifactTransferActive(abortSignal);
    } finally {
      abortSignal?.removeEventListener('abort', abort);
      if (!stream.destroyed) stream.destroy();
    }
  })();
}

export async function writeJsonAtomically(
  root: string,
  filename: string,
  value: unknown,
  options: { ifAbsent?: boolean } = {}
): Promise<void> {
  await ensureSafeLocalArtifactDirectory(root, path.dirname(filename));
  const temporaryPath = `${filename}.${randomUUID()}.tmp`;
  const handle = await fs.open(temporaryPath, 'wx', 0o600);
  try {
    await handle.writeFile(`${JSON.stringify(value)}\n`, 'utf8');
    await handle.sync();
    await handle.close();
    if (options.ifAbsent) {
      // A hard-link publish is atomic across Store instances and fails with
      // EEXIST when another writer has already claimed the object key.
      await fs.link(temporaryPath, filename);
    } else {
      await fs.rename(temporaryPath, filename);
    }
  } catch (error) {
    await handle.close().catch(() => undefined);
    throw error;
  } finally {
    await fs.rm(temporaryPath, { force: true }).catch(() => undefined);
  }
}

export function localArtifactBlobPath(paths: LocalArtifactStorePaths, contentHash: string): string {
  const digest = parseSha256Digest(contentHash);
  const filename = path.join(paths.blobs, digest.slice(0, 2), digest);
  assertContainedPath(paths.root, filename);
  return filename;
}

export function localArtifactManifestPath(
  paths: LocalArtifactStorePaths,
  objectKey: string
): string {
  const digest = createHash('sha256').update(objectKey).digest('hex');
  const filename = path.join(paths.objects, digest.slice(0, 2), `${digest}.json`);
  assertContainedPath(paths.root, filename);
  return filename;
}

export async function listLocalArtifactFiles(root: string, extension?: string): Promise<string[]> {
  const files: string[] = [];
  for (const prefix of await safeReadDirectory(root)) {
    if (!prefix.isDirectory() || prefix.isSymbolicLink()) continue;
    const prefixPath = path.join(root, prefix.name);
    for (const entry of await safeReadDirectory(prefixPath)) {
      if (!entry.isFile() || (extension && !entry.name.endsWith(extension))) continue;
      files.push(path.join(prefixPath, entry.name));
    }
  }
  return files;
}

export async function pathExists(filename: string): Promise<boolean> {
  try {
    await fs.access(filename);
    return true;
  } catch (error) {
    if (isNodeError(error, 'ENOENT')) return false;
    throw error;
  }
}

export function isNodeError(error: unknown, code: string): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as NodeJS.ErrnoException).code === code
  );
}

export class LocalArtifactIntegrityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LocalArtifactIntegrityError';
  }
}

export async function ensureSafeLocalArtifactDirectory(
  root: string,
  directory: string
): Promise<void> {
  assertContainedPath(root, directory);
  await fs.mkdir(directory, { recursive: true });
  const relative = path.relative(root, directory);
  let current = root;
  for (const segment of relative.split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    const stat = await fs.lstat(current);
    if (!stat.isDirectory() || stat.isSymbolicLink()) {
      throw new TypeError(`Artifact Store path is not a safe directory: ${current}`);
    }
  }
  const canonical = await fs.realpath(directory);
  assertContainedPath(root, canonical);
}

export async function ensureSafeLocalArtifactFile(root: string, filename: string): Promise<void> {
  assertContainedPath(root, filename);
  await ensureSafeLocalArtifactDirectory(root, path.dirname(filename));
  const stat = await fs.lstat(filename);
  if (!stat.isFile() || stat.isSymbolicLink()) {
    throw new TypeError(`Artifact Store path is not a safe file: ${filename}`);
  }
  const canonical = await fs.realpath(filename);
  assertContainedPath(root, canonical);
}

function parseSha256Digest(contentHash: string): string {
  const match = /^sha256:([0-9a-f]{64})$/u.exec(contentHash);
  if (!match) throw new TypeError(`Unsupported Artifact content hash: ${contentHash}`);
  return match[1];
}

function assertContainedPath(root: string, candidate: string): void {
  const relative = path.relative(root, candidate);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new TypeError(`Artifact Store path escapes its root: ${candidate}`);
  }
}

async function safeReadDirectory(directory: string): Promise<import('node:fs').Dirent[]> {
  try {
    return await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (isNodeError(error, 'ENOENT')) return [];
    throw error;
  }
}

async function writeAll(
  handle: fs.FileHandle,
  chunk: Uint8Array,
  abortSignal?: AbortSignal
): Promise<void> {
  let offset = 0;
  while (offset < chunk.byteLength) {
    assertLocalArtifactTransferActive(abortSignal);
    const result = await handle.write(chunk, offset, chunk.byteLength - offset, null);
    assertLocalArtifactTransferActive(abortSignal);
    if (result.bytesWritten <= 0)
      throw new Error('Artifact temporary file write made no progress.');
    offset += result.bytesWritten;
  }
}

function assertLocalArtifactTransferActive(abortSignal: AbortSignal | undefined): void {
  if (abortSignal?.aborted) throw new LocalArtifactTransferAbortedError();
}

async function* toAsyncChunks(source: ArtifactByteSource): AsyncIterable<Uint8Array> {
  if (source instanceof Uint8Array) {
    yield source;
    return;
  }
  yield* source;
}
