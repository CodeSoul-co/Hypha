import type { BigIntStats } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import type {
  ArtifactWorkspaceContent,
  ArtifactWorkspaceContentReader,
  ArtifactWorkspaceContentRequest,
} from '@hypha/core';
import { ExecutionProviderError, executionProviderError } from './execution-provider-error';
import { WorkspaceControlPlaneGuard } from './workspace-control-plane-guard';

const defaultChunkSizeBytes = 64 * 1024;

export interface LocalArtifactWorkspaceContentReaderOptions {
  workspaceRoot: string;
  workspaceId: string;
  userId: string;
  tenantId?: string;
  chunkSizeBytes?: number;
}

interface ResolvedWorkspaceFile {
  filename: string;
  canonicalFilename: string;
  realRoot: string;
  stat: BigIntStats;
}

/**
 * Streams governed Workspace files into ArtifactManager without exposing host
 * paths or buffering the complete output in memory.
 */
export class LocalArtifactWorkspaceContentReader implements ArtifactWorkspaceContentReader {
  private readonly workspaceRoot: string;
  private readonly workspaceId: string;
  private readonly userId: string;
  private readonly tenantId?: string;
  private readonly chunkSizeBytes: number;
  private readonly controlPlaneGuard = new WorkspaceControlPlaneGuard();

  constructor(options: LocalArtifactWorkspaceContentReaderOptions) {
    if (!options.workspaceRoot?.trim()) throw new TypeError('workspaceRoot is required.');
    if (!options.workspaceId?.trim()) throw new TypeError('workspaceId is required.');
    if (!options.userId?.trim()) throw new TypeError('userId is required.');
    this.workspaceRoot = path.resolve(options.workspaceRoot);
    this.workspaceId = options.workspaceId;
    this.userId = options.userId;
    this.tenantId = options.tenantId;
    this.chunkSizeBytes = positiveInteger(
      options.chunkSizeBytes ?? defaultChunkSizeBytes,
      'chunkSizeBytes'
    );
    this.controlPlaneGuard.assertWorkspaceRoot(this.workspaceRoot);
  }

  async read(request: ArtifactWorkspaceContentRequest): Promise<ArtifactWorkspaceContent> {
    this.assertScope(request);
    const source = await this.resolveSource(request.relativePath);
    const sizeBytes = safeSizeNumber(source.stat.size);
    if (request.maxBytes !== undefined && sizeBytes > request.maxBytes) {
      throw contentLimitError(request.maxBytes, sizeBytes);
    }
    return {
      content: this.streamSource(source, request.maxBytes),
      sizeBytes,
    };
  }

  private assertScope(request: ArtifactWorkspaceContentRequest): void {
    if (
      request.workspaceId !== this.workspaceId ||
      (request.principal.userId !== undefined && request.principal.userId !== this.userId) ||
      (request.principal.tenantId !== undefined && request.principal.tenantId !== this.tenantId)
    ) {
      throw executionProviderError(
        'EXECUTION_PERMISSION_DENIED',
        'Workspace Artifact source scope does not match the configured Workspace.',
        false
      );
    }
  }

  private async resolveSource(relativePath: string): Promise<ResolvedWorkspaceFile> {
    this.assertRelativePath(relativePath);
    try {
      const rootStat = await fs.lstat(this.workspaceRoot, { bigint: true });
      if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) {
        throw executionProviderError(
          'EXECUTION_WORKSPACE_NOT_FOUND',
          'Workspace Artifact source root is not a safe directory.',
          false
        );
      }
      const realRoot = await fs.realpath(this.workspaceRoot);
      this.controlPlaneGuard.assertWorkspaceRoot(realRoot);
      const filename = path.resolve(this.workspaceRoot, relativePath);
      assertContainedPath(this.workspaceRoot, filename);
      await this.assertSafePathSegments(filename);
      const stat = await fs.lstat(filename, { bigint: true });
      assertSafeRegularFile(stat);
      const canonicalFilename = await fs.realpath(filename);
      assertContainedPath(realRoot, canonicalFilename);
      this.controlPlaneGuard.assertResolvedPath(filename);
      this.controlPlaneGuard.assertResolvedPath(canonicalFilename);
      return { filename, canonicalFilename, realRoot, stat };
    } catch (error) {
      throw normalizeReadError(error);
    }
  }

  private assertRelativePath(relativePath: string): void {
    try {
      if (!relativePath.trim() || path.isAbsolute(relativePath)) {
        throw new Error('Workspace Artifact source must be a relative path.');
      }
      this.controlPlaneGuard.assertInputPath(relativePath);
      assertContainedPath(this.workspaceRoot, path.resolve(this.workspaceRoot, relativePath));
    } catch (error) {
      throw executionProviderError(
        'EXECUTION_PATH_ESCAPE',
        'Workspace Artifact source path is not allowed.',
        false,
        nodeErrorDetails(error)
      );
    }
  }

  private async assertSafePathSegments(filename: string): Promise<void> {
    const relative = path.relative(this.workspaceRoot, filename);
    let current = this.workspaceRoot;
    const segments = relative.split(path.sep).filter(Boolean);
    for (const [index, segment] of segments.entries()) {
      current = path.join(current, segment);
      const stat = await fs.lstat(current, { bigint: true });
      if (stat.isSymbolicLink()) {
        throw executionProviderError(
          'EXECUTION_PATH_ESCAPE',
          'Workspace Artifact source paths cannot traverse symbolic links.',
          false
        );
      }
      if (index < segments.length - 1 && !stat.isDirectory()) {
        throw executionProviderError(
          'EXECUTION_PATH_DENIED',
          'Workspace Artifact source parent is not a directory.',
          false
        );
      }
    }
  }

  private streamSource(
    source: ResolvedWorkspaceFile,
    maxBytes: number | undefined
  ): AsyncIterable<Uint8Array> {
    const chunkSizeBytes = this.chunkSizeBytes;
    const assertSourceUnchanged = () => this.assertSourceUnchanged(source);
    return (async function* stream(): AsyncIterable<Uint8Array> {
      let handle: fs.FileHandle | undefined;
      let sizeBytes = 0;
      try {
        await assertSourceUnchanged();
        handle = await fs.open(source.filename, 'r');
        const openedStat = await handle.stat({ bigint: true });
        const pathStat = await fs.lstat(source.filename, { bigint: true });
        if (
          !sameRegularFileIdentity(source.stat, openedStat) ||
          !sameRegularFileIdentity(source.stat, pathStat)
        ) {
          throw sourceChangedError();
        }

        const buffer = new Uint8Array(chunkSizeBytes);
        while (true) {
          const { bytesRead } = await handle.read(buffer, 0, buffer.byteLength, null);
          if (bytesRead === 0) break;
          sizeBytes += bytesRead;
          if (maxBytes !== undefined && sizeBytes > maxBytes) {
            throw contentLimitError(maxBytes, sizeBytes);
          }
          yield buffer.slice(0, bytesRead);
        }

        const finalHandleStat = await handle.stat({ bigint: true });
        if (!sameRegularFileIdentity(source.stat, finalHandleStat)) {
          throw sourceChangedError();
        }
        await assertSourceUnchanged();
        if (BigInt(sizeBytes) !== source.stat.size) throw sourceChangedError();
      } catch (error) {
        throw normalizeReadError(error);
      } finally {
        await handle?.close().catch(() => undefined);
      }
    })();
  }

  private async assertSourceUnchanged(source: ResolvedWorkspaceFile): Promise<void> {
    await this.assertSafePathSegments(source.filename);
    const current = await fs.lstat(source.filename, { bigint: true });
    if (!sameRegularFileIdentity(source.stat, current)) throw sourceChangedError();
    const canonicalFilename = await fs.realpath(source.filename);
    assertContainedPath(source.realRoot, canonicalFilename);
    if (canonicalFilename !== source.canonicalFilename) throw sourceChangedError();
    this.controlPlaneGuard.assertResolvedPath(canonicalFilename);
  }
}

/**
 * A Workspace output file must remain a single-link regular file while it is
 * streamed. The single-link rule prevents mutation through a hardlink alias.
 */
function sameRegularFileIdentity(before: BigIntStats, after: BigIntStats): boolean {
  return (
    before.isFile() &&
    after.isFile() &&
    before.nlink === 1n &&
    after.nlink === 1n &&
    before.dev === after.dev &&
    before.ino === after.ino &&
    before.size === after.size &&
    before.mtimeNs === after.mtimeNs &&
    before.ctimeNs === after.ctimeNs
  );
}

function assertSafeRegularFile(stat: BigIntStats): void {
  if (!stat.isFile() || stat.isSymbolicLink()) {
    throw executionProviderError(
      'EXECUTION_PATH_DENIED',
      'Workspace Artifact source must be a regular file.',
      false
    );
  }
  if (stat.nlink !== 1n) {
    throw executionProviderError(
      'EXECUTION_PATH_DENIED',
      'Workspace Artifact source files cannot have hardlink aliases.',
      false
    );
  }
}

function assertContainedPath(root: string, candidate: string): void {
  const relative = path.relative(root, candidate);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw executionProviderError(
      'EXECUTION_PATH_ESCAPE',
      'Workspace Artifact source path escapes its Workspace.',
      false
    );
  }
}

function safeSizeNumber(size: bigint): number {
  if (size > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw executionProviderError(
      'EXECUTION_RESOURCE_EXCEEDED',
      'Workspace Artifact source exceeds the supported byte range.',
      false
    );
  }
  return Number(size);
}

function sourceChangedError(): ExecutionProviderError {
  return executionProviderError(
    'EXECUTION_REVISION_CONFLICT',
    'Workspace Artifact source changed while it was being streamed.',
    true
  );
}

function contentLimitError(maxBytes: number, actualSizeBytes: number): ExecutionProviderError {
  return executionProviderError(
    'EXECUTION_RESOURCE_EXCEEDED',
    'Workspace Artifact source exceeds its configured byte limit.',
    false,
    { maxBytes, actualSizeBytes }
  );
}

function normalizeReadError(error: unknown): ExecutionProviderError {
  if (error instanceof ExecutionProviderError) return error;
  const code = nodeErrorCode(error);
  if (code === 'ENOENT' || code === 'ENOTDIR') {
    return executionProviderError(
      'EXECUTION_WORKSPACE_NOT_FOUND',
      'Workspace Artifact source was not found.',
      false,
      { causeCode: code }
    );
  }
  return executionProviderError(
    'EXECUTION_INTERNAL_ERROR',
    'Workspace Artifact source could not be streamed.',
    true,
    nodeErrorDetails(error)
  );
}

function nodeErrorDetails(error: unknown): Record<string, unknown> | undefined {
  const code = nodeErrorCode(error);
  return code ? { causeCode: code } : undefined;
}

function nodeErrorCode(error: unknown): string | undefined {
  if (typeof error !== 'object' || error === null || !('code' in error)) return undefined;
  return typeof error.code === 'string' ? error.code : undefined;
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer.`);
  }
  return value;
}
