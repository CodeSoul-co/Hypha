import { createHash } from 'node:crypto';
import type { BigIntStats } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import type { FileMutation } from '@codesoul-co/core';
import { WorkspaceControlPlaneGuard } from './workspace-control-plane-guard';
import {
  directoryIdentity,
  hasSingleLinkRegularFileIdentity,
  sameSingleLinkRegularFileIdentity,
  sameWorkspaceDirectoryIdentity,
  type LocalWorkspaceDirectoryIdentity,
} from './local-workspace-file-identity';

export interface LocalWorkspaceEntry {
  path: string;
  contentHash: string;
  sizeBytes: number;
  mode: number;
  kind: 'file' | 'symlink';
  symlinkTarget?: string;
}

export interface LocalWorkspaceDirectoryEntry {
  path: string;
  mode: number;
}

export interface LocalWorkspaceSnapshot {
  rootPath: string;
  rootIdentity: LocalWorkspaceDirectoryIdentity;
  entries: ReadonlyMap<string, LocalWorkspaceEntry>;
  directories: ReadonlyMap<string, LocalWorkspaceDirectoryEntry>;
  totalBytes: number;
  sourceTreeHash: string;
}

export interface LocalWorkspaceSnapshotOptions {
  maxFiles?: number;
  maxBytes?: number;
  maxDurationMs?: number;
  abortSignal?: AbortSignal;
}

export class LocalWorkspaceSnapshotLimitError extends Error {
  constructor(
    message: string,
    readonly details: { maxFiles: number; maxBytes: number; maxDurationMs: number }
  ) {
    super(message);
    this.name = 'LocalWorkspaceSnapshotLimitError';
  }
}

export class LocalWorkspaceSnapshotSourceChangedError extends Error {
  constructor() {
    super('Workspace file changed while its mutation evidence was being captured.');
    this.name = 'LocalWorkspaceSnapshotSourceChangedError';
  }
}

export class LocalWorkspaceSnapshotCancelledError extends Error {
  constructor() {
    super('Workspace mutation capture was cancelled.');
    this.name = 'LocalWorkspaceSnapshotCancelledError';
  }
}

export async function captureLocalWorkspaceSnapshot(
  rootPath: string,
  options: LocalWorkspaceSnapshotOptions = {}
): Promise<LocalWorkspaceSnapshot> {
  const root = path.resolve(rootPath);
  const maxFiles = options.maxFiles ?? 10_000;
  const maxBytes = options.maxBytes ?? 256 * 1024 * 1024;
  const maxDurationMs = options.maxDurationMs ?? 30_000;
  const startedAt = performance.now();
  const assertCaptureActive = (): void => {
    if (options.abortSignal?.aborted) throw new LocalWorkspaceSnapshotCancelledError();
    if (performance.now() - startedAt > maxDurationMs) {
      throw snapshotLimitError(maxFiles, maxBytes, maxDurationMs);
    }
  };
  assertCaptureActive();
  const rootBefore = await fs.lstat(root, { bigint: true });
  assertCaptureActive();
  if (!rootBefore.isDirectory() || rootBefore.isSymbolicLink()) {
    throw new LocalWorkspaceSnapshotSourceChangedError();
  }
  const realRoot = await fs.realpath(root);
  assertCaptureActive();
  const controlPlaneGuard = new WorkspaceControlPlaneGuard();
  controlPlaneGuard.assertWorkspaceRoot(root);
  controlPlaneGuard.assertWorkspaceRoot(realRoot);
  const entries = new Map<string, LocalWorkspaceEntry>();
  const directories = new Map<string, LocalWorkspaceDirectoryEntry>();
  let totalBytes = 0;

  const walk = async (directory: string): Promise<void> => {
    assertCaptureActive();
    const realDirectory = await fs.realpath(directory);
    assertCaptureActive();
    assertWithinRoot(realDirectory, realRoot);
    controlPlaneGuard.assertResolvedPath(directory);
    controlPlaneGuard.assertResolvedPath(realDirectory);
    const children = await fs.readdir(directory, { withFileTypes: true });
    assertCaptureActive();
    children.sort((left, right) => left.name.localeCompare(right.name));
    for (const child of children) {
      assertCaptureActive();
      const absolutePath = path.join(directory, child.name);
      const relativePath = portableRelative(root, absolutePath);
      controlPlaneGuard.assertResolvedPath(absolutePath);
      const stat = await fs.lstat(absolutePath);
      assertCaptureActive();
      if (stat.isSymbolicLink()) {
        const target = await fs.readlink(absolutePath);
        assertCaptureActive();
        const symlinkTarget = workspaceRelativeSymlinkTarget(root, absolutePath, target);
        addEntry({
          path: relativePath,
          contentHash: hashBuffer(Buffer.from(target, 'utf8')),
          sizeBytes: Buffer.byteLength(target, 'utf8'),
          mode: stat.mode,
          kind: 'symlink',
          ...(symlinkTarget ? { symlinkTarget } : {}),
        });
      } else if (stat.isDirectory()) {
        addDirectory({ path: relativePath, mode: stat.mode });
        await walk(absolutePath);
        assertCaptureActive();
      } else if (stat.isFile()) {
        assertEntryCapacity();
        const file = await hashWorkspaceFile(
          absolutePath,
          realRoot,
          controlPlaneGuard,
          maxBytes - totalBytes,
          () => snapshotLimitError(maxFiles, maxBytes, maxDurationMs),
          assertCaptureActive
        );
        addEntry({
          path: relativePath,
          contentHash: file.contentHash,
          sizeBytes: file.sizeBytes,
          mode: file.mode,
          kind: 'file',
        });
      }
    }
  };

  const addEntry = (entry: LocalWorkspaceEntry): void => {
    totalBytes += entry.sizeBytes;
    if (entries.size + directories.size + 1 > maxFiles || totalBytes > maxBytes) {
      throw snapshotLimitError(maxFiles, maxBytes, maxDurationMs);
    }
    entries.set(entry.path, entry);
  };

  const assertEntryCapacity = (): void => {
    if (entries.size + directories.size + 1 > maxFiles) {
      throw snapshotLimitError(maxFiles, maxBytes, maxDurationMs);
    }
  };

  const addDirectory = (entry: LocalWorkspaceDirectoryEntry): void => {
    if (entries.size + directories.size + 1 > maxFiles) {
      throw snapshotLimitError(maxFiles, maxBytes, maxDurationMs);
    }
    directories.set(entry.path, entry);
  };

  await walk(root);
  assertCaptureActive();
  const rootAfter = await fs.lstat(root, { bigint: true });
  assertCaptureActive();
  const realRootAfter = await fs.realpath(root);
  assertCaptureActive();
  if (
    realRootAfter !== realRoot ||
    !sameWorkspaceDirectoryIdentity(rootBefore, rootAfter)
  ) {
    throw new LocalWorkspaceSnapshotSourceChangedError();
  }
  return {
    rootPath: root,
    rootIdentity: directoryIdentity(rootBefore),
    entries,
    directories,
    totalBytes,
    sourceTreeHash: hashWorkspaceTree(entries, directories),
  };
}

export function diffLocalWorkspaceSnapshots(
  before: LocalWorkspaceSnapshot,
  after: LocalWorkspaceSnapshot,
  detectedAt: string
): FileMutation[] {
  if (path.resolve(before.rootPath) !== path.resolve(after.rootPath)) {
    throw new Error('Workspace snapshots must have the same root path.');
  }

  const created: LocalWorkspaceEntry[] = [];
  const deleted: LocalWorkspaceEntry[] = [];
  const mutations: FileMutation[] = [];

  for (const [entryPath, previous] of before.entries) {
    const current = after.entries.get(entryPath);
    if (!current) {
      deleted.push(previous);
      continue;
    }
    if (
      previous.contentHash !== current.contentHash ||
      previous.sizeBytes !== current.sizeBytes ||
      previous.kind !== current.kind
    ) {
      mutations.push({
        path: entryPath,
        operation: 'modified',
        beforeHash: previous.contentHash,
        afterHash: current.contentHash,
        beforeSizeBytes: previous.sizeBytes,
        afterSizeBytes: current.sizeBytes,
        detectedAt,
      });
    } else if (previous.mode !== current.mode) {
      mutations.push({
        path: entryPath,
        operation: 'permission_changed',
        beforeHash: previous.contentHash,
        afterHash: current.contentHash,
        beforeSizeBytes: previous.sizeBytes,
        afterSizeBytes: current.sizeBytes,
        detectedAt,
      });
    }
  }

  for (const [entryPath, current] of after.entries) {
    if (!before.entries.has(entryPath)) created.push(current);
  }

  const unpairedCreated = new Set(created.map((entry) => entry.path));
  for (const previous of deleted) {
    const renamed = created.find(
      (candidate) =>
        unpairedCreated.has(candidate.path) &&
        candidate.contentHash === previous.contentHash &&
        candidate.sizeBytes === previous.sizeBytes &&
        candidate.kind === previous.kind
    );
    if (renamed) {
      unpairedCreated.delete(renamed.path);
      mutations.push({
        path: renamed.path,
        oldPath: previous.path,
        operation: 'renamed',
        beforeHash: previous.contentHash,
        afterHash: renamed.contentHash,
        beforeSizeBytes: previous.sizeBytes,
        afterSizeBytes: renamed.sizeBytes,
        detectedAt,
      });
    } else {
      mutations.push({
        path: previous.path,
        operation: 'deleted',
        beforeHash: previous.contentHash,
        beforeSizeBytes: previous.sizeBytes,
        detectedAt,
      });
    }
  }

  for (const current of created) {
    if (!unpairedCreated.has(current.path)) continue;
    mutations.push({
      path: current.path,
      operation: 'created',
      afterHash: current.contentHash,
      afterSizeBytes: current.sizeBytes,
      detectedAt,
    });
  }

  return mutations.sort(
    (left, right) =>
      left.path.localeCompare(right.path) || left.operation.localeCompare(right.operation)
  );
}

function portableRelative(root: string, candidate: string): string {
  const relative = path.relative(root, candidate);
  if (
    !relative ||
    relative === '..' ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    throw new Error(`Workspace entry escapes root: ${candidate}`);
  }
  return relative.split(path.sep).join('/');
}

function assertWithinRoot(candidate: string, root: string): void {
  const relative = path.relative(root, candidate);
  if (
    relative === '' ||
    (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))
  ) {
    return;
  }
  throw new Error(`Workspace directory escapes root: ${candidate}`);
}

function hashBuffer(content: Buffer): string {
  return `sha256:${createHash('sha256').update(content).digest('hex')}`;
}

async function hashWorkspaceFile(
  filename: string,
  realRoot: string,
  controlPlaneGuard: WorkspaceControlPlaneGuard,
  remainingBytes: number,
  limitError: () => LocalWorkspaceSnapshotLimitError,
  assertCaptureActive: () => void
): Promise<{ contentHash: string; sizeBytes: number; mode: number }> {
  assertCaptureActive();
  const before = await fs.lstat(filename, { bigint: true });
  assertCaptureActive();
  assertSingleLinkRegularFile(before);
  const sizeBytes = safeSizeNumber(before.size, limitError);
  if (sizeBytes > remainingBytes) throw limitError();
  const canonicalBefore = await fs.realpath(filename);
  assertCaptureActive();
  assertWithinRoot(canonicalBefore, realRoot);
  controlPlaneGuard.assertResolvedPath(canonicalBefore);

  const handle = await fs.open(filename, 'r');
  const hash = createHash('sha256');
  let bytesReadTotal = 0;
  try {
    assertCaptureActive();
    const opened = await handle.stat({ bigint: true });
    assertCaptureActive();
    const pathAfterOpen = await fs.lstat(filename, { bigint: true });
    assertCaptureActive();
    if (
      !sameSingleLinkRegularFileIdentity(before, opened) ||
      !sameSingleLinkRegularFileIdentity(before, pathAfterOpen)
    ) {
      throw new LocalWorkspaceSnapshotSourceChangedError();
    }

    const buffer = new Uint8Array(64 * 1024);
    let bytesRead = 0;
    do {
      assertCaptureActive();
      ({ bytesRead } = await handle.read(buffer, 0, buffer.byteLength, null));
      assertCaptureActive();
      if (bytesRead === 0) continue;
      bytesReadTotal += bytesRead;
      if (bytesReadTotal > remainingBytes || BigInt(bytesReadTotal) > before.size) {
        throw new LocalWorkspaceSnapshotSourceChangedError();
      }
      hash.update(buffer.subarray(0, bytesRead));
    } while (bytesRead > 0);

    const finalHandleStat = await handle.stat({ bigint: true });
    const finalPathStat = await fs.lstat(filename, { bigint: true });
    const canonicalAfter = await fs.realpath(filename);
    assertCaptureActive();
    if (
      bytesReadTotal !== sizeBytes ||
      canonicalAfter !== canonicalBefore ||
      !sameSingleLinkRegularFileIdentity(before, finalHandleStat) ||
      !sameSingleLinkRegularFileIdentity(before, finalPathStat)
    ) {
      throw new LocalWorkspaceSnapshotSourceChangedError();
    }
    assertWithinRoot(canonicalAfter, realRoot);
    controlPlaneGuard.assertResolvedPath(canonicalAfter);
  } finally {
    await handle.close().catch(() => undefined);
  }
  return {
    contentHash: `sha256:${hash.digest('hex')}`,
    sizeBytes,
    mode: Number(before.mode),
  };
}

/**
 * Mutation evidence only accepts single-link regular files. This prevents a
 * path outside the Workspace from mutating captured bytes through a hardlink.
 */
function assertSingleLinkRegularFile(stat: BigIntStats): void {
  if (!hasSingleLinkRegularFileIdentity(stat)) {
    throw new LocalWorkspaceSnapshotSourceChangedError();
  }
}

function safeSizeNumber(size: bigint, limitError: () => LocalWorkspaceSnapshotLimitError): number {
  if (size > BigInt(Number.MAX_SAFE_INTEGER)) throw limitError();
  return Number(size);
}

function snapshotLimitError(
  maxFiles: number,
  maxBytes: number,
  maxDurationMs: number
): LocalWorkspaceSnapshotLimitError {
  return new LocalWorkspaceSnapshotLimitError(
    'Workspace mutation capture exceeded its configured scan limits.',
    { maxFiles, maxBytes, maxDurationMs }
  );
}

function hashWorkspaceTree(
  entries: ReadonlyMap<string, LocalWorkspaceEntry>,
  directories: ReadonlyMap<string, LocalWorkspaceDirectoryEntry>
): string {
  const canonicalTree = {
    directories: [...directories.values()]
      .sort((left, right) => left.path.localeCompare(right.path))
      .map(({ path: entryPath, mode }) => ({ path: entryPath, mode })),
    entries: [...entries.values()]
      .sort((left, right) => left.path.localeCompare(right.path))
      .map(({ path: entryPath, kind, contentHash, sizeBytes, mode, symlinkTarget }) => ({
        path: entryPath,
        kind,
        contentHash,
        sizeBytes,
        mode,
        ...(symlinkTarget ? { symlinkTarget } : {}),
      })),
  };
  return hashBuffer(Buffer.from(JSON.stringify(canonicalTree), 'utf8'));
}

function workspaceRelativeSymlinkTarget(
  root: string,
  linkPath: string,
  target: string
): string | undefined {
  const resolvedTarget = path.resolve(path.dirname(linkPath), target);
  const relativeTarget = path.relative(root, resolvedTarget);
  if (
    !relativeTarget ||
    relativeTarget === '..' ||
    relativeTarget.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativeTarget)
  ) {
    return undefined;
  }
  return relativeTarget.split(path.sep).join('/');
}
