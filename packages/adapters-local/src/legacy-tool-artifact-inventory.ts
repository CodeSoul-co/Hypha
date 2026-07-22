import fs from 'node:fs/promises';
import path from 'node:path';
import { hashArtifactBytes } from './artifact-content-io';
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
    await assertDirectory(this.legacyRootPath, 'LEGACY_INVENTORY_INVALID_ROOT');
    const toolResultsPath = path.join(this.legacyRootPath, 'tool-results');
    if (!(await pathExists(toolResultsPath))) return { entries: [], totalBytes: 0 };
    const toolResultsBefore = await assertDirectory(toolResultsPath);
    const toolDirectories = await fs.readdir(toolResultsPath, { withFileTypes: true });
    const entries: LegacyToolArtifactInventoryEntry[] = [];
    let totalBytes = 0;

    for (const toolDirectory of sortByName(toolDirectories)) {
      assertSafePathSegment(toolDirectory.name, 'Tool');
      if (!toolDirectory.isDirectory() || toolDirectory.isSymbolicLink()) {
        throw invalidLayout('Legacy tool-results entries must be regular directories.', {
          entry: toolDirectory.name,
        });
      }
      const toolPath = path.join(toolResultsPath, toolDirectory.name);
      const toolBefore = await assertDirectory(toolPath);
      const files = await fs.readdir(toolPath, { withFileTypes: true });

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
        const content = await this.readStableFile(path.join(toolPath, file.name), relativePath);
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
          contentHash: hashArtifactBytes(content),
          sizeBytes: content.byteLength,
          mimeType: parsed.mimeType,
          legacyToolPathSegment: toolDirectory.name,
          legacyInvocationPathSegment: parsed.invocationPathSegment,
        });
      }
      await assertDirectoryUnchanged(toolPath, toolBefore);
    }
    await assertDirectoryUnchanged(toolResultsPath, toolResultsBefore);
    return { entries, totalBytes };
  }

  private async readStableFile(filename: string, relativePath: string): Promise<Uint8Array> {
    const linkStat = await fs.lstat(filename);
    if (linkStat.isSymbolicLink() || !linkStat.isFile()) {
      throw invalidLayout('Legacy Tool output must be a regular file.', { relativePath });
    }
    if (linkStat.size > this.maxFileBytes) {
      throw limitExceeded('Legacy Artifact exceeds the configured per-file limit.', {
        relativePath,
        maxFileBytes: this.maxFileBytes,
        actualBytes: linkStat.size,
      });
    }

    const handle = await fs.open(filename, 'r');
    try {
      const before = await handle.stat();
      const content = new Uint8Array(await handle.readFile());
      const after = await handle.stat();
      if (!sameStat(before, after) || content.byteLength !== before.size) {
        throw new LegacyToolArtifactInventoryError(
          'LEGACY_INVENTORY_SOURCE_CHANGED',
          'Legacy Artifact changed while the inventory was being generated.',
          { relativePath }
        );
      }
      return content;
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
  code: LegacyToolArtifactInventoryErrorCode = 'LEGACY_INVENTORY_INVALID_LAYOUT'
) {
  try {
    const stat = await fs.lstat(directory);
    if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error('not a regular directory');
    return stat;
  } catch (error) {
    if (error instanceof LegacyToolArtifactInventoryError) throw error;
    throw new LegacyToolArtifactInventoryError(code, 'Legacy Artifact directory is unavailable.', {
      directory,
    });
  }
}

async function assertDirectoryUnchanged(
  directory: string,
  before: Awaited<ReturnType<typeof fs.lstat>>
): Promise<void> {
  const after = await fs.lstat(directory);
  if (!sameStat(before, after)) {
    throw new LegacyToolArtifactInventoryError(
      'LEGACY_INVENTORY_SOURCE_CHANGED',
      'Legacy Artifact directory changed while the inventory was being generated.',
      { directory }
    );
  }
}

function sameStat(
  before: Awaited<ReturnType<typeof fs.lstat>>,
  after: Awaited<ReturnType<typeof fs.lstat>>
): boolean {
  return (
    before.size === after.size &&
    before.mtimeMs === after.mtimeMs &&
    before.ctimeMs === after.ctimeMs
  );
}

async function pathExists(filename: string): Promise<boolean> {
  try {
    await fs.lstat(filename);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false;
    throw error;
  }
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

function positiveInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value <= 0) throw new TypeError(`${name} must be positive.`);
  return value;
}
