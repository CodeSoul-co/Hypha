import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { ArtifactManager } from '@hypha/core';
import { hashArtifactBytes } from './artifact-content-io';
import type { ToolArtifactManagerContext } from './artifact-manager-tool-port';

export type LegacyToolArtifactImportErrorCode =
  | 'LEGACY_ARTIFACT_INVALID_PATH'
  | 'LEGACY_ARTIFACT_NOT_FOUND'
  | 'LEGACY_ARTIFACT_TOO_LARGE'
  | 'LEGACY_ARTIFACT_ID_MISMATCH'
  | 'LEGACY_ARTIFACT_SIZE_MISMATCH'
  | 'LEGACY_ARTIFACT_CONTENT_MISMATCH';

export class LegacyToolArtifactImportError extends Error {
  constructor(
    readonly code: LegacyToolArtifactImportErrorCode,
    message: string,
    readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'LegacyToolArtifactImportError';
  }
}

export interface LegacyToolArtifactImporterOptions {
  legacyRootPath: string;
  manager: Pick<ArtifactManager, 'create'>;
  maxArtifactBytes?: number;
}

export interface LegacyToolArtifactImportRequest {
  relativePath: string;
  expectedLegacyArtifactId?: string;
  expectedContentHash?: string;
  expectedSizeBytes?: number;
  context: ToolArtifactManagerContext;
  toolId: string;
  invocationId: string;
  mimeType?: string;
  metadata?: Record<string, unknown>;
}

export interface LegacyToolArtifactImportResult {
  legacyArtifactId: string;
  artifactId: string;
  versionId: string;
  contentHash: string;
  sizeBytes: number;
}

/** Imports one explicitly identified legacy Tool file into Core ArtifactManager. */
export class LegacyToolArtifactImporter {
  private readonly legacyRootPath: string;
  private readonly manager: Pick<ArtifactManager, 'create'>;
  private readonly maxArtifactBytes: number;

  constructor(options: LegacyToolArtifactImporterOptions) {
    if (!options.legacyRootPath.trim()) throw new TypeError('legacyRootPath is required.');
    this.legacyRootPath = path.resolve(options.legacyRootPath);
    this.manager = options.manager;
    this.maxArtifactBytes = positiveInteger(
      options.maxArtifactBytes ?? 8 * 1024 * 1024,
      'maxArtifactBytes'
    );
  }

  async import(request: LegacyToolArtifactImportRequest): Promise<LegacyToolArtifactImportResult> {
    const relativePath = normalizeLegacyRelativePath(request.relativePath);
    const absolutePath = await this.resolveLegacyFile(relativePath);
    const content = await this.readBoundedFile(absolutePath);
    const legacyArtifactId = legacyArtifactReference(relativePath, content.byteLength);
    if (request.expectedLegacyArtifactId && request.expectedLegacyArtifactId !== legacyArtifactId) {
      throw new LegacyToolArtifactImportError(
        'LEGACY_ARTIFACT_ID_MISMATCH',
        'Legacy Artifact ID does not match its path and current size.',
        {
          expectedLegacyArtifactId: request.expectedLegacyArtifactId,
          actualLegacyArtifactId: legacyArtifactId,
        }
      );
    }
    if (
      request.expectedSizeBytes !== undefined &&
      request.expectedSizeBytes !== content.byteLength
    ) {
      throw new LegacyToolArtifactImportError(
        'LEGACY_ARTIFACT_SIZE_MISMATCH',
        'Legacy Artifact size does not match its inventory evidence.',
        {
          expectedSizeBytes: request.expectedSizeBytes,
          actualSizeBytes: content.byteLength,
        }
      );
    }

    const contentHash = hashArtifactBytes(content);
    if (request.expectedContentHash && request.expectedContentHash !== contentHash) {
      throw new LegacyToolArtifactImportError(
        'LEGACY_ARTIFACT_CONTENT_MISMATCH',
        'Legacy Artifact content does not match its inventory evidence.',
        {
          expectedContentHash: request.expectedContentHash,
          actualContentHash: contentHash,
        }
      );
    }
    const record = await this.manager.create({
      operationId: `legacy-tool-artifact-import:${legacyArtifactId}`,
      principal: request.context.principal,
      profileRef: request.context.profileRef,
      userId: request.context.userId,
      tenantId: request.context.tenantId,
      workspaceId: request.context.workspaceId,
      sessionId: request.context.sessionId,
      runId: request.context.runId,
      agentId: request.context.agentId,
      name: path.posix.basename(relativePath),
      description: `Imported legacy output from Tool ${request.toolId}.`,
      kind: 'tool_output',
      mimeType: request.mimeType ?? inferLegacyMimeType(relativePath),
      content,
      expectedContentHash: contentHash,
      expectedSizeBytes: content.byteLength,
      provenance: {
        sourceType: 'imported',
        createdBy: request.context.principal.principalId,
        toolInvocationId: request.invocationId,
        transformation: 'legacy_tool_artifact_import',
        metadata: {
          legacyArtifactId,
          legacyRelativePath: relativePath,
          toolId: request.toolId,
        },
      },
      tags: ['tool-output', 'legacy-import'],
      idempotencyKey: `legacy-tool-artifact:${legacyArtifactId}`,
      metadata: {
        ...request.metadata,
        legacyArtifactId,
        legacyRelativePath: relativePath,
        invocationId: request.invocationId,
        toolId: request.toolId,
      },
    });

    return {
      legacyArtifactId,
      artifactId: record.id,
      versionId: record.versionId,
      contentHash: record.contentHash,
      sizeBytes: record.sizeBytes,
    };
  }

  private async resolveLegacyFile(relativePath: string): Promise<string> {
    let realRoot: string;
    try {
      const rootStat = await fs.lstat(this.legacyRootPath);
      if (rootStat.isSymbolicLink() || !rootStat.isDirectory()) throw new Error('invalid root');
      realRoot = await fs.realpath(this.legacyRootPath);
    } catch {
      throw new LegacyToolArtifactImportError(
        'LEGACY_ARTIFACT_NOT_FOUND',
        'Legacy Artifact root is unavailable.'
      );
    }

    const segments = relativePath.split('/');
    let current = this.legacyRootPath;
    for (const segment of segments) {
      current = path.join(current, segment);
      let stat;
      try {
        stat = await fs.lstat(current);
      } catch {
        throw new LegacyToolArtifactImportError(
          'LEGACY_ARTIFACT_NOT_FOUND',
          `Legacy Artifact file was not found: ${relativePath}`
        );
      }
      if (stat.isSymbolicLink()) {
        throw new LegacyToolArtifactImportError(
          'LEGACY_ARTIFACT_INVALID_PATH',
          'Legacy Artifact paths must not contain symbolic links.'
        );
      }
    }

    const realFile = await fs.realpath(current);
    assertWithinRoot(realFile, realRoot);
    const fileStat = await fs.stat(realFile);
    if (!fileStat.isFile()) {
      throw new LegacyToolArtifactImportError(
        'LEGACY_ARTIFACT_INVALID_PATH',
        'Legacy Artifact source must be a regular file.'
      );
    }
    return realFile;
  }

  private async readBoundedFile(filename: string): Promise<Uint8Array> {
    const handle = await fs.open(filename, 'r');
    try {
      const before = await handle.stat();
      if (before.size > this.maxArtifactBytes) {
        throw new LegacyToolArtifactImportError(
          'LEGACY_ARTIFACT_TOO_LARGE',
          'Legacy Artifact exceeds the configured import limit.',
          { maxArtifactBytes: this.maxArtifactBytes, actualBytes: before.size }
        );
      }
      const content = new Uint8Array(await handle.readFile());
      const after = await handle.stat();
      if (before.size !== after.size || before.mtimeMs !== after.mtimeMs) {
        throw new LegacyToolArtifactImportError(
          'LEGACY_ARTIFACT_INVALID_PATH',
          'Legacy Artifact changed while it was being imported.'
        );
      }
      return content;
    } finally {
      await handle.close();
    }
  }
}

export function legacyArtifactReference(relativePath: string, sizeBytes: number): string {
  const digest = createHash('sha256').update(`${relativePath}:${sizeBytes}`).digest('hex');
  return `artifact:${digest}`;
}

function normalizeLegacyRelativePath(value: string): string {
  if (!value.trim() || containsControlCharacter(value)) {
    throw new LegacyToolArtifactImportError(
      'LEGACY_ARTIFACT_INVALID_PATH',
      'Legacy Artifact path is invalid.'
    );
  }
  const portable = value.replace(/\\/gu, '/');
  const segments = portable.split('/');
  if (
    path.isAbsolute(value) ||
    /^[a-z]:\//iu.test(portable) ||
    portable.startsWith('//') ||
    segments.some((segment) => !segment || segment === '.' || segment === '..') ||
    segments.length !== 3 ||
    segments[0] !== 'tool-results' ||
    !/\.(?:json|txt)$/iu.test(segments[2])
  ) {
    throw new LegacyToolArtifactImportError(
      'LEGACY_ARTIFACT_INVALID_PATH',
      'Legacy Tool Artifact path must match tool-results/<tool>/<invocation>.json|txt.'
    );
  }
  return segments.join('/');
}

function containsControlCharacter(value: string): boolean {
  return Array.from(value).some((character) => {
    const codePoint = character.codePointAt(0) ?? 0;
    return codePoint <= 0x1f || codePoint === 0x7f;
  });
}

function inferLegacyMimeType(relativePath: string): string {
  return relativePath.toLowerCase().endsWith('.txt') ? 'text/plain' : 'application/json';
}

function assertWithinRoot(candidate: string, root: string): void {
  const relative = path.relative(root, candidate);
  if (
    relative === '' ||
    relative === '..' ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    throw new LegacyToolArtifactImportError(
      'LEGACY_ARTIFACT_INVALID_PATH',
      'Legacy Artifact path escapes its configured root.'
    );
  }
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value <= 0) throw new TypeError(`${name} must be positive.`);
  return value;
}
