import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { FileMutation } from '@hypha/core';

export interface LocalWorkspaceEntry {
  path: string;
  contentHash: string;
  sizeBytes: number;
  mode: number;
  kind: 'file' | 'symlink';
}

export interface LocalWorkspaceSnapshot {
  rootPath: string;
  entries: ReadonlyMap<string, LocalWorkspaceEntry>;
  totalBytes: number;
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
  const maxFiles = options.maxFiles ?? 10_000;
  const maxBytes = options.maxBytes ?? 256 * 1024 * 1024;
  const entries = new Map<string, LocalWorkspaceEntry>();
  let totalBytes = 0;

  const walk = async (directory: string): Promise<void> => {
    const realDirectory = await fs.realpath(directory);
    assertWithinRoot(realDirectory, realRoot);
    const children = await fs.readdir(directory, { withFileTypes: true });
    children.sort((left, right) => left.name.localeCompare(right.name));
    for (const child of children) {
      const absolutePath = path.join(directory, child.name);
      const relativePath = portableRelative(root, absolutePath);
      const stat = await fs.lstat(absolutePath);
      if (stat.isSymbolicLink()) {
        const target = await fs.readlink(absolutePath);
        addEntry({
          path: relativePath,
          contentHash: hashBuffer(Buffer.from(target, 'utf8')),
          sizeBytes: Buffer.byteLength(target, 'utf8'),
          mode: stat.mode,
          kind: 'symlink',
        });
      } else if (stat.isDirectory()) {
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
    if (entries.size + 1 > maxFiles || totalBytes > maxBytes) {
      throw new LocalWorkspaceSnapshotLimitError(
        'Workspace mutation capture exceeded its configured scan limits.',
        { maxFiles, maxBytes }
      );
    }
    entries.set(entry.path, entry);
  };

  await walk(root);
  return { rootPath: root, entries, totalBytes };
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
