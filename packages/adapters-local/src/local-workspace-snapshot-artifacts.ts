import { createHash } from 'node:crypto';
import type {
  ArtifactManager,
  ArtifactRecord,
  SpecRef,
  WorkspaceRestoreRequest,
  WorkspaceSnapshotEntry,
  WorkspaceSnapshotManifest,
  WorkspaceSnapshotRequest,
} from '@hypha/core';
import {
  validateWorkspaceRestoreRequest,
  validateWorkspaceSnapshotManifest,
  validateWorkspaceSnapshotRequest,
} from '@hypha/core';
import { executionProviderError } from './execution-provider-error';
import { type LocalWorkspaceEntry, type LocalWorkspaceSnapshot } from './local-workspace-mutations';
import type { LocalWorkspaceAdapter } from './local-workspace-adapter';
import {
  encodeWorkspaceSnapshotManifest,
  hashWorkspaceSnapshotManifest,
} from './local-workspace-snapshot-manifest';
import {
  recoverInterruptedLocalWorkspaceRestore,
  type LocalWorkspaceRestoreRecoveryResult,
  restoreLocalWorkspaceSnapshot,
} from './local-workspace-snapshot-restore';

export interface LocalWorkspaceSnapshotArtifactContext {
  profileRef: SpecRef;
  userId: string;
  tenantId?: string;
  workspaceId: string;
  sessionId?: string;
  runId?: string;
  agentId?: string;
}

export interface LocalWorkspaceSnapshotArtifactServiceOptions {
  workspace: Pick<LocalWorkspaceAdapter, 'capture' | 'workspaceRoot'>;
  artifacts: Pick<ArtifactManager, 'create' | 'createFromWorkspace' | 'finalize' | 'read'>;
  context: LocalWorkspaceSnapshotArtifactContext;
  now?: () => string;
  maxManifestBytes?: number;
  maxRestoreBytes?: number;
  maxRestoreEntries?: number;
}

/**
 * Persists a full Workspace tree through ArtifactManager. Host paths never
 * enter Artifact metadata; file bytes are collected through its governed
 * Workspace reader port.
 */
export class LocalWorkspaceSnapshotArtifactService {
  private readonly workspace: LocalWorkspaceSnapshotArtifactServiceOptions['workspace'];
  private readonly artifacts: LocalWorkspaceSnapshotArtifactServiceOptions['artifacts'];
  private readonly context: LocalWorkspaceSnapshotArtifactContext;
  private readonly now: () => string;
  private readonly maxManifestBytes: number;
  private readonly maxRestoreBytes: number;
  private readonly maxRestoreEntries: number;

  constructor(options: LocalWorkspaceSnapshotArtifactServiceOptions) {
    this.workspace = options.workspace;
    this.artifacts = options.artifacts;
    this.context = options.context;
    this.now = options.now ?? (() => new Date().toISOString());
    this.maxManifestBytes = positiveInteger(
      options.maxManifestBytes ?? 8 * 1024 * 1024,
      'maxManifestBytes'
    );
    this.maxRestoreBytes = positiveInteger(
      options.maxRestoreBytes ?? 256 * 1024 * 1024,
      'maxRestoreBytes'
    );
    this.maxRestoreEntries = positiveInteger(
      options.maxRestoreEntries ?? 10_000,
      'maxRestoreEntries'
    );
  }

  async createFullSnapshot(input: WorkspaceSnapshotRequest): Promise<ArtifactRecord> {
    const request = validateWorkspaceSnapshotRequest(input);
    this.assertSupportedRequest(request);
    this.assertScope(request);

    const captured = await this.workspace.capture();
    this.assertRestorableLinks(captured);
    const draftFiles = await this.createFileArtifacts(request, captured);
    const verified = await this.workspace.capture();
    if (verified.sourceTreeHash !== captured.sourceTreeHash) {
      throw executionProviderError(
        'EXECUTION_REVISION_CONFLICT',
        'Workspace changed while the full snapshot was being persisted.',
        true,
        {
          expectedWorkspaceSnapshotHash: captured.sourceTreeHash,
          actualWorkspaceSnapshotHash: verified.sourceTreeHash,
        }
      );
    }

    const finalizedFiles = new Map<string, ArtifactRecord>();
    for (const [entryPath, draft] of draftFiles) {
      finalizedFiles.set(
        entryPath,
        await this.artifacts.finalize({
          operationId: operationId(request.operationId, 'finalize-file', entryPath),
          principal: request.principal,
          artifactId: draft.id,
          expectedRevision: draft.revision,
          reason: 'Workspace full snapshot content',
          ...(request.idempotencyKey
            ? { idempotencyKey: idempotencyKey(request.idempotencyKey, 'finalize-file', entryPath) }
            : {}),
        })
      );
    }

    const manifest = this.createManifest(request, captured, finalizedFiles);
    const content = encodeWorkspaceSnapshotManifest(manifest);
    const draftManifest = await this.artifacts.create({
      ...this.artifactIdentity(request),
      operationId: operationId(request.operationId, 'manifest'),
      name: `${manifest.id}.json`,
      kind: 'snapshot',
      mimeType: 'application/json',
      encoding: 'utf-8',
      content,
      expectedContentHash: hashBytes(content),
      expectedSizeBytes: content.byteLength,
      logicalArtifactId: `workspace-snapshot:${request.workspaceId}:${manifest.id}`,
      provenance: {
        sourceType: 'snapshot',
        createdBy: request.principal.principalId,
        sourceArtifactIds: [...finalizedFiles.values()].map((artifact) => artifact.id),
        metadata: {
          snapshotType: 'full',
          sourceTreeHash: manifest.sourceTreeHash,
          manifestHash: manifest.manifestHash,
        },
      },
      tags: ['workspace-snapshot', 'workspace-snapshot-manifest'],
      ...(request.idempotencyKey
        ? { idempotencyKey: idempotencyKey(request.idempotencyKey, 'manifest') }
        : {}),
      metadata: {
        snapshotId: manifest.id,
        sourceTreeHash: manifest.sourceTreeHash,
        manifestHash: manifest.manifestHash,
      },
    });
    this.assertArtifactContent(draftManifest, hashBytes(content), content.byteLength);
    return this.artifacts.finalize({
      operationId: operationId(request.operationId, 'finalize-manifest'),
      principal: request.principal,
      artifactId: draftManifest.id,
      expectedRevision: draftManifest.revision,
      reason: 'Workspace full snapshot manifest',
      ...(request.idempotencyKey
        ? { idempotencyKey: idempotencyKey(request.idempotencyKey, 'finalize-manifest') }
        : {}),
    });
  }

  async restoreFullSnapshot(input: WorkspaceRestoreRequest): Promise<void> {
    const request = validateWorkspaceRestoreRequest(input);
    this.assertScope(request);
    try {
      await restoreLocalWorkspaceSnapshot({
        workspaceRoot: this.workspace.workspaceRoot,
        capture: () => this.workspace.capture(),
        artifacts: this.artifacts,
        request,
        maxManifestBytes: this.maxManifestBytes,
        maxRestoreBytes: this.maxRestoreBytes,
        maxRestoreEntries: this.maxRestoreEntries,
      });
    } catch (error) {
      if (hasNormalizedError(error)) throw error;
      const code = nodeErrorCode(error);
      throw executionProviderError(
        'EXECUTION_INTERNAL_ERROR',
        'Workspace full snapshot restore failed.',
        true,
        code ? { causeCode: code } : undefined
      );
    }
  }

  async recoverInterruptedRestore(): Promise<LocalWorkspaceRestoreRecoveryResult> {
    try {
      return await recoverInterruptedLocalWorkspaceRestore(this.workspace.workspaceRoot, () =>
        this.workspace.capture()
      );
    } catch (error) {
      if (hasNormalizedError(error)) throw error;
      const code = nodeErrorCode(error);
      throw executionProviderError(
        'EXECUTION_CLEANUP_FAILED',
        'Workspace restore recovery failed.',
        false,
        code ? { causeCode: code } : undefined
      );
    }
  }

  private async createFileArtifacts(
    request: WorkspaceSnapshotRequest,
    captured: LocalWorkspaceSnapshot
  ): Promise<Map<string, ArtifactRecord>> {
    const drafts = new Map<string, ArtifactRecord>();
    for (const entry of [...captured.entries.values()]
      .filter((candidate) => candidate.kind === 'file')
      .sort((left, right) => left.path.localeCompare(right.path))) {
      const draft = await this.artifacts.createFromWorkspace({
        ...this.artifactIdentity(request),
        operationId: operationId(request.operationId, 'file', entry.path),
        relativePath: entry.path,
        name: entry.path,
        kind: 'snapshot',
        mimeType: 'application/octet-stream',
        expectedContentHash: entry.contentHash,
        expectedSizeBytes: entry.sizeBytes,
        logicalArtifactId: `workspace-snapshot-file:${request.workspaceId}:${entry.path}`,
        provenance: {
          sourceType: 'snapshot',
          createdBy: request.principal.principalId,
          metadata: {
            snapshotOperationId: request.operationId,
            workspaceRelativePath: entry.path,
          },
        },
        tags: ['workspace-snapshot', 'workspace-snapshot-file'],
        ...(request.idempotencyKey
          ? { idempotencyKey: idempotencyKey(request.idempotencyKey, 'file', entry.path) }
          : {}),
      });
      this.assertArtifactContent(draft, entry.contentHash, entry.sizeBytes);
      drafts.set(entry.path, draft);
    }
    return drafts;
  }

  private createManifest(
    request: WorkspaceSnapshotRequest,
    captured: LocalWorkspaceSnapshot,
    fileArtifacts: ReadonlyMap<string, ArtifactRecord>
  ): WorkspaceSnapshotManifest {
    const entries: WorkspaceSnapshotEntry[] = [
      ...[...captured.directories.values()].map((entry) => ({
        path: entry.path,
        kind: 'directory' as const,
        mode: entry.mode,
      })),
      ...[...captured.entries.values()].map((entry) =>
        this.snapshotEntry(entry, fileArtifacts.get(entry.path))
      ),
    ].sort((left, right) => left.path.localeCompare(right.path));
    const createdAt = this.now();
    const id = snapshotId(request, captured.sourceTreeHash);
    const manifestWithoutHash = {
      id,
      workspaceId: request.workspaceId,
      entries,
      sourceTreeHash: captured.sourceTreeHash,
      totalBytes: entries
        .filter((entry) => entry.kind === 'file')
        .reduce((sum, entry) => sum + (entry.sizeBytes ?? 0), 0),
      fileCount: entries.filter((entry) => entry.kind === 'file').length,
      createdAt,
      createdBy: request.principal.principalId,
      ...(request.metadata ? { metadata: request.metadata } : {}),
    };
    return validateWorkspaceSnapshotManifest({
      ...manifestWithoutHash,
      manifestHash: hashWorkspaceSnapshotManifest(manifestWithoutHash),
    });
  }

  private snapshotEntry(
    entry: LocalWorkspaceEntry,
    fileArtifact: ArtifactRecord | undefined
  ): WorkspaceSnapshotEntry {
    if (entry.kind === 'symlink') {
      if (!entry.symlinkTarget) {
        throw executionProviderError(
          'EXECUTION_PATH_ESCAPE',
          'Workspace full snapshots require symlink targets to remain within the Workspace.',
          false
        );
      }
      return {
        path: entry.path,
        kind: 'symlink',
        sizeBytes: entry.sizeBytes,
        contentHash: entry.contentHash,
        mode: entry.mode,
        symlinkTarget: entry.symlinkTarget,
      };
    }
    if (!fileArtifact) {
      throw executionProviderError(
        'EXECUTION_INTERNAL_ERROR',
        'Workspace snapshot file Artifact was not persisted.',
        false
      );
    }
    return {
      path: entry.path,
      kind: 'file',
      sizeBytes: entry.sizeBytes,
      contentHash: entry.contentHash,
      mode: entry.mode,
      artifactRef: fileArtifact.id,
    };
  }

  private artifactIdentity(request: WorkspaceSnapshotRequest) {
    return {
      principal: request.principal,
      profileRef: this.context.profileRef,
      userId: this.context.userId,
      ...(this.context.tenantId ? { tenantId: this.context.tenantId } : {}),
      workspaceId: this.context.workspaceId,
      ...(this.context.sessionId ? { sessionId: this.context.sessionId } : {}),
      ...(this.context.runId ? { runId: this.context.runId } : {}),
      ...(this.context.agentId ? { agentId: this.context.agentId } : {}),
    };
  }

  private assertSupportedRequest(request: WorkspaceSnapshotRequest): void {
    if (
      request.type !== 'full' ||
      request.baseSnapshotRef ||
      request.includePaths?.length ||
      request.excludePatterns?.length
    ) {
      throw executionProviderError(
        'EXECUTION_INVALID_REQUEST',
        'Local full snapshots require type=full and do not accept partial or base snapshot fields.',
        false
      );
    }
  }

  private assertScope(
    request: Pick<WorkspaceSnapshotRequest | WorkspaceRestoreRequest, 'workspaceId' | 'principal'>
  ): void {
    if (
      request.workspaceId !== this.context.workspaceId ||
      (request.principal.userId !== undefined &&
        request.principal.userId !== this.context.userId) ||
      (request.principal.tenantId !== undefined &&
        request.principal.tenantId !== this.context.tenantId)
    ) {
      throw executionProviderError(
        'EXECUTION_PERMISSION_DENIED',
        'Workspace snapshot scope does not match the configured Artifact context.',
        false
      );
    }
  }

  private assertRestorableLinks(captured: LocalWorkspaceSnapshot): void {
    if (
      [...captured.entries.values()].some(
        (entry) => entry.kind === 'symlink' && !entry.symlinkTarget
      )
    ) {
      throw executionProviderError(
        'EXECUTION_PATH_ESCAPE',
        'Workspace full snapshots require symlink targets to remain within the Workspace.',
        false
      );
    }
  }

  private assertArtifactContent(
    artifact: ArtifactRecord,
    expectedContentHash: string,
    expectedSizeBytes: number
  ): void {
    if (artifact.contentHash !== expectedContentHash || artifact.sizeBytes !== expectedSizeBytes) {
      throw executionProviderError(
        'EXECUTION_IDEMPOTENCY_CONFLICT',
        'Workspace snapshot idempotency resolved to different Artifact content.',
        false,
        {
          expectedContentHash,
          actualContentHash: artifact.contentHash,
          expectedSizeBytes,
          actualSizeBytes: artifact.sizeBytes,
        }
      );
    }
  }
}

function snapshotId(request: WorkspaceSnapshotRequest, sourceTreeHash: string): string {
  return `snapshot.${digest(
    `${request.workspaceId}\0${request.operationId}\0${sourceTreeHash}`
  ).slice(0, 32)}`;
}

function operationId(base: string, phase: string, entryPath?: string): string {
  return `${base}:${phase}${entryPath ? `:${digest(entryPath).slice(0, 16)}` : ''}`;
}

function idempotencyKey(base: string, phase: string, entryPath?: string): string {
  return `${base}:${phase}${entryPath ? `:${digest(entryPath).slice(0, 16)}` : ''}`;
}

function hashBytes(content: Uint8Array): string {
  return `sha256:${createHash('sha256').update(content).digest('hex')}`;
}

function digest(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer.`);
  }
  return value;
}

function hasNormalizedError(error: unknown): error is { normalizedError: unknown } {
  return typeof error === 'object' && error !== null && 'normalizedError' in error;
}

function nodeErrorCode(error: unknown): string | undefined {
  if (typeof error !== 'object' || error === null || !('code' in error)) return undefined;
  const code = error.code;
  return typeof code === 'string' ? code : undefined;
}
