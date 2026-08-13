import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import type {
  ArtifactManager,
  ArtifactOperationOptions,
  ArtifactRecord,
  SpecRef,
  WorkspaceRestoreRequest,
  WorkspaceSnapshotEntry,
  WorkspaceSnapshotManifest,
  WorkspaceSnapshotRequest,
} from '@codesoul-co/hypha-core';
import {
  validateWorkspaceRestoreRequest,
  validateWorkspaceSnapshotManifest,
  validateWorkspaceSnapshotRequest,
} from '@codesoul-co/hypha-core';
import { executionProviderError } from './execution-provider-error';
import { sameWorkspaceRootIdentity } from './local-workspace-file-identity';
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
  nowMs?: () => number;
  maxManifestBytes?: number;
  maxSnapshotPersistenceDurationMs?: number;
  maxRestoreBytes?: number;
  maxRestoreEntries?: number;
  maxRestoreLockWaitDurationMs?: number;
  maxRestoreStagingDurationMs?: number;
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
  private readonly nowMs: () => number;
  private readonly maxManifestBytes: number;
  private readonly maxSnapshotPersistenceDurationMs: number;
  private readonly maxRestoreBytes: number;
  private readonly maxRestoreEntries: number;
  private readonly maxRestoreLockWaitDurationMs: number;
  private readonly maxRestoreStagingDurationMs: number;

  constructor(options: LocalWorkspaceSnapshotArtifactServiceOptions) {
    this.workspace = options.workspace;
    this.artifacts = options.artifacts;
    this.context = options.context;
    this.now = options.now ?? (() => new Date().toISOString());
    this.nowMs = options.nowMs ?? (() => performance.now());
    this.maxManifestBytes = positiveInteger(
      options.maxManifestBytes ?? 8 * 1024 * 1024,
      'maxManifestBytes'
    );
    this.maxSnapshotPersistenceDurationMs = positiveInteger(
      options.maxSnapshotPersistenceDurationMs ?? 30_000,
      'maxSnapshotPersistenceDurationMs'
    );
    this.maxRestoreBytes = positiveInteger(
      options.maxRestoreBytes ?? 256 * 1024 * 1024,
      'maxRestoreBytes'
    );
    this.maxRestoreEntries = positiveInteger(
      options.maxRestoreEntries ?? 10_000,
      'maxRestoreEntries'
    );
    this.maxRestoreLockWaitDurationMs = positiveInteger(
      options.maxRestoreLockWaitDurationMs ?? 30_000,
      'maxRestoreLockWaitDurationMs'
    );
    this.maxRestoreStagingDurationMs = positiveInteger(
      options.maxRestoreStagingDurationMs ?? 30_000,
      'maxRestoreStagingDurationMs'
    );
  }

  async createFullSnapshot(
    input: WorkspaceSnapshotRequest,
    options: ArtifactOperationOptions = {}
  ): Promise<ArtifactRecord> {
    const request = validateWorkspaceSnapshotRequest(input);
    this.assertSupportedRequest(request);
    this.assertScope(request);
    assertSnapshotCallerActive(options.abortSignal);

    const captured = await this.workspace.capture({ abortSignal: options.abortSignal });
    assertSnapshotCallerActive(options.abortSignal);
    this.assertRestorableLinks(captured);
    const persistenceStartedAt = this.nowMs();
    const cancellation = createSnapshotPersistenceCancellation(
      options.abortSignal,
      this.maxSnapshotPersistenceDurationMs
    );
    try {
      const draftFiles = await this.createFileArtifacts(
        request,
        captured,
        persistenceStartedAt,
        cancellation
      );
      this.assertSnapshotPersistenceActive(persistenceStartedAt, cancellation);
      const verified = await this.workspace.capture({ abortSignal: cancellation.signal });
      this.assertSnapshotPersistenceActive(persistenceStartedAt, cancellation);
      this.assertWorkspaceUnchanged(captured, verified);
      this.assertSnapshotPersistenceActive(persistenceStartedAt, cancellation);

      const finalizedFiles = new Map<string, ArtifactRecord>();
      for (const [entryPath, draft] of draftFiles) {
        this.assertSnapshotPersistenceActive(persistenceStartedAt, cancellation);
        finalizedFiles.set(
          entryPath,
          await this.artifacts.finalize({
            operationId: operationId(request.operationId, 'finalize-file', entryPath),
            principal: request.principal,
            artifactId: draft.id,
            expectedRevision: draft.revision,
            reason: 'Workspace full snapshot content',
            ...(request.idempotencyKey
              ? {
                  idempotencyKey: idempotencyKey(
                    request.idempotencyKey,
                    'finalize-file',
                    entryPath
                  ),
                }
              : {}),
          })
        );
        this.assertSnapshotPersistenceActive(persistenceStartedAt, cancellation);
      }

      const manifest = this.createManifest(request, captured, finalizedFiles);
      const content = encodeWorkspaceSnapshotManifest(manifest);
      this.assertSnapshotPersistenceActive(persistenceStartedAt, cancellation);
      const draftManifest = await this.artifacts.create(
        {
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
        },
        { abortSignal: cancellation.signal }
      );
      this.assertArtifactContent(draftManifest, hashBytes(content), content.byteLength);
      this.assertSnapshotPersistenceActive(persistenceStartedAt, cancellation);
      const finalVerification = await this.workspace.capture({
        abortSignal: cancellation.signal,
      });
      this.assertSnapshotPersistenceActive(persistenceStartedAt, cancellation);
      this.assertWorkspaceUnchanged(captured, finalVerification);
      const finalizedManifest = await this.artifacts.finalize({
        operationId: operationId(request.operationId, 'finalize-manifest'),
        principal: request.principal,
        artifactId: draftManifest.id,
        expectedRevision: draftManifest.revision,
        reason: 'Workspace full snapshot manifest',
        ...(request.idempotencyKey
          ? { idempotencyKey: idempotencyKey(request.idempotencyKey, 'finalize-manifest') }
          : {}),
      });
      this.assertSnapshotPersistenceActive(persistenceStartedAt, cancellation);
      return finalizedManifest;
    } catch (error) {
      if (cancellation.source() === 'timeout') {
        throw this.snapshotPersistenceTimeoutError();
      }
      if (cancellation.source() === 'caller') {
        throw snapshotPersistenceCancelledError();
      }
      throw error;
    } finally {
      cancellation.dispose();
    }
  }

  private assertWorkspaceUnchanged(
    expected: LocalWorkspaceSnapshot,
    actual: LocalWorkspaceSnapshot
  ): void {
    if (
      actual.sourceTreeHash === expected.sourceTreeHash &&
      sameWorkspaceRootIdentity(expected.rootIdentity, actual.rootIdentity)
    ) {
      return;
    }
    throw executionProviderError(
      'EXECUTION_REVISION_CONFLICT',
      'Workspace changed while the full snapshot was being persisted.',
      true,
      {
        expectedWorkspaceSnapshotHash: expected.sourceTreeHash,
        actualWorkspaceSnapshotHash: actual.sourceTreeHash,
      }
    );
  }

  async restoreFullSnapshot(
    input: WorkspaceRestoreRequest,
    options: ArtifactOperationOptions = {}
  ): Promise<void> {
    const request = validateWorkspaceRestoreRequest(input);
    this.assertScope(request);
    if (options.abortSignal?.aborted) throw snapshotRestoreCancelledError();
    try {
      await restoreLocalWorkspaceSnapshot({
        workspaceRoot: this.workspace.workspaceRoot,
        capture: (abortSignal) => this.workspace.capture({ abortSignal }),
        artifacts: this.artifacts,
        request,
        maxManifestBytes: this.maxManifestBytes,
        maxRestoreBytes: this.maxRestoreBytes,
        maxRestoreEntries: this.maxRestoreEntries,
        maxRestoreLockWaitDurationMs: this.maxRestoreLockWaitDurationMs,
        maxRestoreStagingDurationMs: this.maxRestoreStagingDurationMs,
        abortSignal: options.abortSignal,
      });
    } catch (error) {
      if (hasNormalizedError(error)) throw error;
      if (options.abortSignal?.aborted) throw snapshotRestoreCancelledError();
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
      return await recoverInterruptedLocalWorkspaceRestore(
        this.workspace.workspaceRoot,
        () => this.workspace.capture(),
        this.maxRestoreLockWaitDurationMs
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
    captured: LocalWorkspaceSnapshot,
    persistenceStartedAt: number,
    cancellation: SnapshotPersistenceCancellation
  ): Promise<Map<string, ArtifactRecord>> {
    const drafts = new Map<string, ArtifactRecord>();
    for (const entry of [...captured.entries.values()]
      .filter((candidate) => candidate.kind === 'file')
      .sort((left, right) => left.path.localeCompare(right.path))) {
      this.assertSnapshotPersistenceActive(persistenceStartedAt, cancellation);
      const draft = await this.artifacts.createFromWorkspace(
        {
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
        },
        { abortSignal: cancellation.signal }
      );
      this.assertArtifactContent(draft, entry.contentHash, entry.sizeBytes);
      this.assertSnapshotPersistenceActive(persistenceStartedAt, cancellation);
      drafts.set(entry.path, draft);
    }
    return drafts;
  }

  private assertSnapshotPersistenceBudget(startedAt: number): void {
    if (this.nowMs() - startedAt > this.maxSnapshotPersistenceDurationMs) {
      throw this.snapshotPersistenceTimeoutError();
    }
  }

  private assertSnapshotPersistenceActive(
    startedAt: number,
    cancellation: SnapshotPersistenceCancellation
  ): void {
    if (cancellation.source() === 'caller') throw snapshotPersistenceCancelledError();
    if (cancellation.source() === 'timeout') throw this.snapshotPersistenceTimeoutError();
    this.assertSnapshotPersistenceBudget(startedAt);
  }

  private snapshotPersistenceTimeoutError() {
    return executionProviderError(
      'EXECUTION_RESOURCE_EXCEEDED',
      'Workspace snapshot Artifact persistence exceeded its configured duration limit.',
      true,
      { maxSnapshotPersistenceDurationMs: this.maxSnapshotPersistenceDurationMs }
    );
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

type SnapshotPersistenceCancellationSource = 'caller' | 'timeout';

interface SnapshotPersistenceCancellation {
  readonly signal: AbortSignal;
  source(): SnapshotPersistenceCancellationSource | undefined;
  dispose(): void;
}

function createSnapshotPersistenceCancellation(
  callerSignal: AbortSignal | undefined,
  timeoutMs: number
): SnapshotPersistenceCancellation {
  const controller = new AbortController();
  let cancellationSource: SnapshotPersistenceCancellationSource | undefined;
  const abort = (source: SnapshotPersistenceCancellationSource, reason?: unknown) => {
    if (cancellationSource) return;
    cancellationSource = source;
    controller.abort(reason);
  };
  const abortFromCaller = () => abort('caller', callerSignal?.reason);
  if (callerSignal?.aborted) {
    abortFromCaller();
  } else {
    callerSignal?.addEventListener('abort', abortFromCaller, { once: true });
  }
  const timer = setTimeout(
    () => abort('timeout', new Error('Workspace snapshot Artifact persistence timed out.')),
    timeoutMs
  );

  return {
    signal: controller.signal,
    source: () => cancellationSource,
    dispose() {
      clearTimeout(timer);
      callerSignal?.removeEventListener('abort', abortFromCaller);
    },
  };
}

function assertSnapshotCallerActive(abortSignal: AbortSignal | undefined): void {
  if (abortSignal?.aborted) throw snapshotPersistenceCancelledError();
}

function snapshotPersistenceCancelledError() {
  return executionProviderError(
    'EXECUTION_CANCELLED',
    'Workspace snapshot Artifact persistence was cancelled.',
    false
  );
}

function snapshotRestoreCancelledError() {
  return executionProviderError(
    'EXECUTION_CANCELLED',
    'Workspace snapshot restore was cancelled.',
    false
  );
}
