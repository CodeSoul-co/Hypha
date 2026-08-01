import type { BigIntStats, Dirent } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { hashArtifactBytes } from './artifact-content-io';
import { sameDirectoryIdentity, sameRegularFileIdentity } from './legacy-tool-artifact-identity';
import { legacyArtifactReference } from './legacy-tool-artifact-importer';

export type LegacyToolArtifactInventoryErrorCode =
  | 'LEGACY_INVENTORY_INVALID_ROOT'
  | 'LEGACY_INVENTORY_INVALID_LAYOUT'
  | 'LEGACY_INVENTORY_LIMIT_EXCEEDED'
  | 'LEGACY_INVENTORY_SOURCE_CHANGED';

export class LegacyToolArtifactInventoryError extends Error {
  constructor(
    readonly code: LegacyToolArtifactInventoryErrorCode,
    message: string,
    readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'LegacyToolArtifactInventoryError';
  }
}

export interface LegacyToolArtifactInventoryOptions {
  legacyRootPath: string;
  maxEntries?: number;
  maxFileBytes?: number;
  maxTotalBytes?: number;
}

/**
 * Describes an old Tool output without treating sanitized path segments as
 * authoritative Tool or Invocation identities.
 */
export interface LegacyToolArtifactInventoryEntry {
  relativePath: string;
  legacyArtifactId: string;
  contentHash: string;
  sizeBytes: number;
  mimeType: 'application/json' | 'text/plain';
  legacyToolPathSegment: string;
  legacyInvocationPathSegment: string;
}

export interface LegacyToolArtifactInventoryResult {
  entries: LegacyToolArtifactInventoryEntry[];
  totalBytes: number;
}

interface StableLegacyFile {
  content: Uint8Array;
  stat: BigIntStats;
}

interface ScannedFileEvidence {
  filename: string;
  relativePath: string;
  stat: BigIntStats;
  contentHash: string;
}

interface DirectoryEntrySnapshot {
  name: string;
  kind: 'file' | 'directory' | 'symlink' | 'other';
}

interface ScannedDirectoryEvidence {
  directory: string;
  relativePath: string;
  stat: BigIntStats;
  entries: DirectoryEntrySnapshot[];
}

/** Builds a deterministic, bounded, read-only inventory of old Tool outputs. */
export class LegacyToolArtifactInventory {
  private readonly legacyRootPath: string;
  private readonly maxEntries: number;
  private readonly maxFileBytes: number;
  private readonly maxTotalBytes: number;

  constructor(options: LegacyToolArtifactInventoryOptions) {
    if (!options.legacyRootPath.trim()) throw new TypeError('legacyRootPath is required.');
    this.legacyRootPath = path.resolve(options.legacyRootPath);
    this.maxEntries = positiveInteger(options.maxEntries ?? 10_000, 'maxEntries');
    this.maxFileBytes = positiveInteger(options.maxFileBytes ?? 8 * 1024 * 1024, 'maxFileBytes');
    this.maxTotalBytes = positiveInteger(
      options.maxTotalBytes ?? 256 * 1024 * 1024,
      'maxTotalBytes'
    );
  }

  async scan(): Promise<LegacyToolArtifactInventoryResult> {
    const legacyRootBefore = await assertDirectory(
      this.legacyRootPath,
      'LEGACY_INVENTORY_INVALID_ROOT',
      '.'
    );
    const legacyRootEntries = await readStableDirectory(this.legacyRootPath, legacyRootBefore, '.');
    const toolResultsPath = path.join(this.legacyRootPath, 'tool-results');
    const toolResultsEntry = legacyRootEntries.find((entry) => entry.name === 'tool-results');
    if (!toolResultsEntry) {
      await assertDirectoryUnchanged(
        this.legacyRootPath,
        legacyRootBefore,
        snapshotDirectoryEntries(legacyRootEntries),
        '.'
      );
      return { entries: [], totalBytes: 0 };
    }
    if (!toolResultsEntry.isDirectory() || toolResultsEntry.isSymbolicLink()) {
      throw invalidLayout('Legacy Artifact inventory only accepts regular directories.', {
        relativePath: 'tool-results',
      });
    }
    const toolResultsBefore = await assertDirectory(
      toolResultsPath,
      'LEGACY_INVENTORY_SOURCE_CHANGED',
      'tool-results'
    );
    const toolDirectories = await readStableDirectory(
      toolResultsPath,
      toolResultsBefore,
      'tool-results'
    );
    const toolResultsEntries = snapshotDirectoryEntries(toolDirectories);
    const entries: LegacyToolArtifactInventoryEntry[] = [];
    const scannedFiles: ScannedFileEvidence[] = [];
    const scannedDirectories: ScannedDirectoryEvidence[] = [];
    let totalBytes = 0;

    for (const toolDirectory of sortByName(toolDirectories)) {
      assertSafePathSegment(toolDirectory.name, 'Tool');
      if (!toolDirectory.isDirectory() || toolDirectory.isSymbolicLink()) {
        throw invalidLayout('Legacy tool-results entries must be regular directories.', {
          entry: toolDirectory.name,
        });
      }
      const toolPath = path.join(toolResultsPath, toolDirectory.name);
      const toolRelativePath = `tool-results/${toolDirectory.name}`;
      const toolBefore = await assertDirectory(
        toolPath,
        'LEGACY_INVENTORY_SOURCE_CHANGED',
        toolRelativePath
      );
      const files = await readStableDirectory(toolPath, toolBefore, toolRelativePath);
      const fileEntries = snapshotDirectoryEntries(files);

      for (const file of sortByName(files)) {
        const parsed = parseLegacyFilename(file.name);
        if (!file.isFile() || file.isSymbolicLink()) {
          throw invalidLayout('Legacy Tool output entries must be regular files.', {
            entry: `${toolDirectory.name}/${file.name}`,
          });
        }
        if (entries.length >= this.maxEntries) {
          throw limitExceeded('Legacy Artifact entry count exceeds the configured limit.', {
            maxEntries: this.maxEntries,
          });
        }

        const relativePath = ['tool-results', toolDirectory.name, file.name].join('/');
        const filename = path.join(toolPath, file.name);
        const stableFile = await this.readStableFile(filename, relativePath);
        const content = stableFile.content;
        const contentHash = hashArtifactBytes(content);
        if (content.byteLength > this.maxFileBytes) {
          throw limitExceeded('Legacy Artifact exceeds the configured per-file limit.', {
            relativePath,
            maxFileBytes: this.maxFileBytes,
            actualBytes: content.byteLength,
          });
        }
        if (totalBytes + content.byteLength > this.maxTotalBytes) {
          throw limitExceeded('Legacy Artifact inventory exceeds the configured total limit.', {
            relativePath,
            maxTotalBytes: this.maxTotalBytes,
          });
        }
        totalBytes += content.byteLength;
        entries.push({
          relativePath,
          legacyArtifactId: legacyArtifactReference(relativePath, content.byteLength),
          contentHash,
          sizeBytes: content.byteLength,
          mimeType: parsed.mimeType,
          legacyToolPathSegment: toolDirectory.name,
          legacyInvocationPathSegment: parsed.invocationPathSegment,
        });
        scannedFiles.push({
          filename,
          relativePath,
          stat: stableFile.stat,
          contentHash,
        });
      }
      await assertDirectoryUnchanged(toolPath, toolBefore, fileEntries, toolRelativePath);
      scannedDirectories.push({
        directory: toolPath,
        relativePath: toolRelativePath,
        stat: toolBefore,
        entries: fileEntries,
      });
    }
    await assertDirectoryUnchanged(
      toolResultsPath,
      toolResultsBefore,
      toolResultsEntries,
      'tool-results'
    );
    for (const file of scannedFiles) {
      const current = await this.readStableFile(file.filename, file.relativePath);
      if (
        !sameRegularFileIdentity(file.stat, current.stat) ||
        hashArtifactBytes(current.content) !== file.contentHash
      ) {
        throw sourceChanged(
          'Legacy Tool output changed after it was read during inventory generation.',
          file.relativePath
        );
      }
    }
    for (const directory of scannedDirectories) {
      await assertDirectoryUnchanged(
        directory.directory,
        directory.stat,
        directory.entries,
        directory.relativePath
      );
    }
    await assertDirectoryUnchanged(
      toolResultsPath,
      toolResultsBefore,
      toolResultsEntries,
      'tool-results'
    );
    await assertDirectoryUnchanged(
      this.legacyRootPath,
      legacyRootBefore,
      snapshotDirectoryEntries(legacyRootEntries),
      '.'
    );
    return { entries, totalBytes };
  }

  private async readStableFile(filename: string, relativePath: string): Promise<StableLegacyFile> {
    const linkStat = await lstatSource(filename, relativePath);
    if (linkStat.isSymbolicLink() || !linkStat.isFile()) {
      throw sourceChanged('Legacy Tool output type changed before it was read.', relativePath);
    }
    if (linkStat.nlink !== 1n) {
      throw invalidLayout('Legacy Tool output must be a non-aliased regular file.', {
        relativePath,
      });
    }
    if (linkStat.size > BigInt(this.maxFileBytes)) {
      throw limitExceeded('Legacy Artifact exceeds the configured per-file limit.', {
        relativePath,
        maxFileBytes: this.maxFileBytes,
        actualBytes: linkStat.size.toString(),
      });
    }

    let handle;
    try {
      handle = await fs.open(filename, 'r');
    } catch (error) {
      throw sourceChanged(
        'Legacy Tool output became unavailable before it was read.',
        relativePath,
        error
      );
    }
    try {
      const before = await handle.stat({ bigint: true });
      if (!sameRegularFileIdentity(linkStat, before)) {
        throw sourceChanged(
          'Legacy Tool output identity changed before it was read.',
          relativePath
        );
      }
      const content = new Uint8Array(await handle.readFile());
      const after = await handle.stat({ bigint: true });
      if (!sameRegularFileIdentity(before, after) || BigInt(content.byteLength) !== before.size) {
        throw sourceChanged(
          'Legacy Artifact changed while the inventory was being generated.',
          relativePath
        );
      }
      const pathAfter = await lstatSource(filename, relativePath);
      if (!sameRegularFileIdentity(after, pathAfter)) {
        throw sourceChanged(
          'Legacy Tool output path changed while the inventory was being generated.',
          relativePath
        );
      }
      return { content, stat: pathAfter };
    } finally {
      await handle.close();
    }
  }
}

function parseLegacyFilename(filename: string): {
  invocationPathSegment: string;
  mimeType: 'application/json' | 'text/plain';
} {
  const match = /^(.*)\.(json|txt)$/iu.exec(filename);
  if (!match) {
    throw invalidLayout('Legacy Tool output must use a .json or .txt extension.', { filename });
  }
  assertSafePathSegment(match[1], 'Invocation');
  return {
    invocationPathSegment: match[1],
    mimeType: match[2].toLowerCase() === 'txt' ? 'text/plain' : 'application/json',
  };
}

function assertSafePathSegment(segment: string, kind: string): void {
  if (
    !segment ||
    segment === '.' ||
    segment === '..' ||
    Array.from(segment).some((character) => !isLegacySafeCharacter(character))
  ) {
    throw invalidLayout(`${kind} path segment is not a valid legacy sanitized segment.`, {
      segment,
    });
  }
}

function isLegacySafeCharacter(character: string): boolean {
  const code = character.codePointAt(0) ?? 0;
  return (
    (code >= 0x30 && code <= 0x39) ||
    (code >= 0x41 && code <= 0x5a) ||
    (code >= 0x61 && code <= 0x7a) ||
    character === '.' ||
    character === '_' ||
    character === '-'
  );
}

async function assertDirectory(
  directory: string,
  code: LegacyToolArtifactInventoryErrorCode = 'LEGACY_INVENTORY_INVALID_LAYOUT',
  relativePath = '.'
): Promise<BigIntStats> {
  try {
    const stat = await fs.lstat(directory, { bigint: true });
    if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error('not a regular directory');
    return stat;
  } catch (error) {
    if (error instanceof LegacyToolArtifactInventoryError) throw error;
    throw new LegacyToolArtifactInventoryError(code, 'Legacy Artifact directory is unavailable.', {
      relativePath,
    });
  }
}

async function assertDirectoryUnchanged(
  directory: string,
  before: BigIntStats,
  expectedEntries: DirectoryEntrySnapshot[],
  relativePath: string
): Promise<void> {
  const entries = await readStableDirectory(directory, before, relativePath);
  if (!sameDirectoryEntries(expectedEntries, snapshotDirectoryEntries(entries))) {
    throw sourceChanged(
      'Legacy Artifact directory entries changed while the inventory was being generated.',
      relativePath
    );
  }
}

async function readStableDirectory(
  directory: string,
  expectedStat: BigIntStats,
  relativePath: string
): Promise<Dirent[]> {
  try {
    const before = await fs.lstat(directory, { bigint: true });
    if (!sameDirectoryIdentity(expectedStat, before)) {
      throw sourceChanged(
        'Legacy Artifact directory identity changed before it was read.',
        relativePath
      );
    }
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const after = await fs.lstat(directory, { bigint: true });
    if (!sameDirectoryIdentity(expectedStat, after)) {
      throw sourceChanged(
        'Legacy Artifact directory changed while it was being read.',
        relativePath
      );
    }
    return entries;
  } catch (error) {
    if (error instanceof LegacyToolArtifactInventoryError) throw error;
    throw sourceChanged('Legacy Artifact directory became unavailable.', relativePath, error);
  }
}

async function lstatSource(filename: string, relativePath: string): Promise<BigIntStats> {
  try {
    return await fs.lstat(filename, { bigint: true });
  } catch (error) {
    throw sourceChanged('Legacy Tool output became unavailable.', relativePath, error);
  }
}

function snapshotDirectoryEntries(entries: Dirent[]): DirectoryEntrySnapshot[] {
  return sortByName(entries).map((entry) => ({
    name: entry.name,
    kind: entry.isSymbolicLink()
      ? 'symlink'
      : entry.isFile()
        ? 'file'
        : entry.isDirectory()
          ? 'directory'
          : 'other',
  }));
}

function sameDirectoryEntries(
  before: DirectoryEntrySnapshot[],
  after: DirectoryEntrySnapshot[]
): boolean {
  return (
    before.length === after.length &&
    before.every(
      (entry, index) => entry.name === after[index].name && entry.kind === after[index].kind
    )
  );
}

function sortByName<T extends { name: string }>(entries: T[]): T[] {
  return [...entries].sort((left, right) => left.name.localeCompare(right.name, 'en'));
}

function invalidLayout(message: string, details?: Record<string, unknown>) {
  return new LegacyToolArtifactInventoryError('LEGACY_INVENTORY_INVALID_LAYOUT', message, details);
}

function limitExceeded(message: string, details?: Record<string, unknown>) {
  return new LegacyToolArtifactInventoryError('LEGACY_INVENTORY_LIMIT_EXCEEDED', message, details);
}

function sourceChanged(
  message: string,
  relativePath: string,
  cause?: unknown
): LegacyToolArtifactInventoryError {
  return new LegacyToolArtifactInventoryError('LEGACY_INVENTORY_SOURCE_CHANGED', message, {
    relativePath,
    ...(cause instanceof Error && cause.name ? { causeName: cause.name } : {}),
  });
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value <= 0) throw new TypeError(`${name} must be positive.`);
  return value;
}
