import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { FileMutation } from '@hypha/core';
import { WorkspaceControlPlaneGuard } from './workspace-control-plane-guard';

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
  entries: ReadonlyMap<string, LocalWorkspaceEntry>;
  directories: ReadonlyMap<string, LocalWorkspaceDirectoryEntry>;
  totalBytes: number;
  sourceTreeHash: string;
}

export interface LocalWorkspaceSnapshotOptions {
  maxFiles?: number;
  maxBytes?: number;
}

export class LocalWorkspaceSnapshotLimitError extends Error {
  constructor(
    message: string,
    readonly details: { maxFiles: number; maxBytes: number }
  ) {
    super(message);
    this.name = 'LocalWorkspaceSnapshotLimitError';
  }
}

export async function captureLocalWorkspaceSnapshot(
  rootPath: string,
  options: LocalWorkspaceSnapshotOptions = {}
): Promise<LocalWorkspaceSnapshot> {
  const root = path.resolve(rootPath);
  const realRoot = await fs.realpath(root);
  const controlPlaneGuard = new WorkspaceControlPlaneGuard();
  controlPlaneGuard.assertWorkspaceRoot(root);
  controlPlaneGuard.assertWorkspaceRoot(realRoot);
  const maxFiles = options.maxFiles ?? 10_000;
  const maxBytes = options.maxBytes ?? 256 * 1024 * 1024;
  const entries = new Map<string, LocalWorkspaceEntry>();
  const directories = new Map<string, LocalWorkspaceDirectoryEntry>();
  let totalBytes = 0;

  const walk = async (directory: string): Promise<void> => {
    const realDirectory = await fs.realpath(directory);
    assertWithinRoot(realDirectory, realRoot);
    controlPlaneGuard.assertResolvedPath(directory);
    controlPlaneGuard.assertResolvedPath(realDirectory);
    const children = await fs.readdir(directory, { withFileTypes: true });
    children.sort((left, right) => left.name.localeCompare(right.name));
    for (const child of children) {
      const absolutePath = path.join(directory, child.name);
      const relativePath = portableRelative(root, absolutePath);
      controlPlaneGuard.assertResolvedPath(absolutePath);
      const stat = await fs.lstat(absolutePath);
      if (stat.isSymbolicLink()) {
        const target = await fs.readlink(absolutePath);
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
      } else if (stat.isFile()) {
        const content = await fs.readFile(absolutePath);
        addEntry({
          path: relativePath,
          contentHash: hashBuffer(content),
          sizeBytes: content.byteLength,
          mode: stat.mode,
          kind: 'file',
        });
      }
    }
  };

  const addEntry = (entry: LocalWorkspaceEntry): void => {
    totalBytes += entry.sizeBytes;
    if (entries.size + directories.size + 1 > maxFiles || totalBytes > maxBytes) {
      throw new LocalWorkspaceSnapshotLimitError(
        'Workspace mutation capture exceeded its configured scan limits.',
        { maxFiles, maxBytes }
      );
    }
    entries.set(entry.path, entry);
  };

  const addDirectory = (entry: LocalWorkspaceDirectoryEntry): void => {
    if (entries.size + directories.size + 1 > maxFiles) {
      throw new LocalWorkspaceSnapshotLimitError(
        'Workspace mutation capture exceeded its configured scan limits.',
        { maxFiles, maxBytes }
      );
    }
    directories.set(entry.path, entry);
  };

  await walk(root);
  return {
    rootPath: root,
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
