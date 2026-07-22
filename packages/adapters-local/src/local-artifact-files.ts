import { createHash, randomUUID } from 'node:crypto';
import { createReadStream } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { ArtifactByteRange, ArtifactByteSource } from '@hypha/core';
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
  maxBytes: number
): Promise<LocalArtifactTempFile> {
  const temporaryPath = path.join(paths.temporary, `upload-${randomUUID()}.tmp`);
  assertContainedPath(paths.root, temporaryPath);
  const handle = await fs.open(temporaryPath, 'wx', 0o600);
  const hash = createHash('sha256');
  let sizeBytes = 0;
  try {
    for await (const chunk of toAsyncChunks(source)) {
      if (!(chunk instanceof Uint8Array)) {
        throw new TypeError('Artifact content streams must yield Uint8Array chunks.');
      }
      sizeBytes += chunk.byteLength;
      if (sizeBytes > maxBytes) throw new ArtifactContentLimitError(maxBytes, sizeBytes);
      hash.update(chunk);
      await writeAll(handle, chunk);
    }
    await handle.sync();
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
  root?: string
): Promise<{ contentHash: string; sizeBytes: number }> {
  if (root) await ensureSafeLocalArtifactFile(root, filename);
  const hash = createHash('sha256');
  let sizeBytes = 0;
  for await (const chunk of createReadStream(filename)) {
    const bytes = chunk as Buffer;
    sizeBytes += bytes.byteLength;
    hash.update(bytes);
  }
  return { contentHash: `sha256:${hash.digest('hex')}`, sizeBytes };
}

export function streamLocalArtifactFile(
  filename: string,
  range?: ArtifactByteRange,
  root?: string
): AsyncIterable<Uint8Array> {
  return (async function* chunks(): AsyncIterable<Uint8Array> {
    if (root) await ensureSafeLocalArtifactFile(root, filename);
    const stream = createReadStream(filename, {
      ...(range ? { start: range.start, end: range.endInclusive } : {}),
    });
    for await (const chunk of stream) yield Uint8Array.from(chunk as Buffer);
  })();
}

export async function writeJsonAtomically(
  root: string,
  filename: string,
  value: unknown
): Promise<void> {
  await ensureSafeLocalArtifactDirectory(root, path.dirname(filename));
  const temporaryPath = `${filename}.${randomUUID()}.tmp`;
  const handle = await fs.open(temporaryPath, 'wx', 0o600);
  try {
    await handle.writeFile(`${JSON.stringify(value)}\n`, 'utf8');
    await handle.sync();
    await handle.close();
    await fs.rename(temporaryPath, filename);
  } catch (error) {
    await handle.close().catch(() => undefined);
    await fs.rm(temporaryPath, { force: true }).catch(() => undefined);
    throw error;
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
    error !== null &&
    typeof error === 'object' &&
    'code' in error &&
    (error as { code?: unknown }).code === code
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

async function writeAll(handle: fs.FileHandle, chunk: Uint8Array): Promise<void> {
  let offset = 0;
  while (offset < chunk.byteLength) {
    const result = await handle.write(chunk, offset, chunk.byteLength - offset, null);
    if (result.bytesWritten <= 0)
      throw new Error('Artifact temporary file write made no progress.');
    offset += result.bytesWritten;
  }
}

async function* toAsyncChunks(source: ArtifactByteSource): AsyncIterable<Uint8Array> {
  if (source instanceof Uint8Array) {
    yield source;
    return;
  }
  yield* source;
}
