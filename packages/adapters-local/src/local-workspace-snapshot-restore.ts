import { createHash } from 'node:crypto';
import fs, { type FileHandle } from 'node:fs/promises';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import type {
  ArtifactManager,
  ArtifactOperationOptions,
  ArtifactRecord,
  WorkspaceRestoreRequest,
  WorkspaceSnapshotEntry,
  WorkspaceSnapshotManifest,
} from '@hypha/core';
import { validateWorkspaceSnapshotManifest } from '@hypha/core';
import { collectArtifactContent } from './artifact-content-io';
import { executionProviderError } from './execution-provider-error';
import type { LocalWorkspaceSnapshot } from './local-workspace-mutations';
import {
  createLocalWorkspaceRestoreJournal,
  readLocalWorkspaceRestoreJournal,
  removeLocalWorkspaceRestoreJournal,
  withLocalWorkspaceRestoreLock,
} from './local-workspace-restore-journal';
import { verifyWorkspaceSnapshotManifestHash } from './local-workspace-snapshot-manifest';
import { WorkspaceControlPlaneGuard } from './workspace-control-plane-guard';

export interface RestoreLocalWorkspaceSnapshotOptions {
  workspaceRoot: string;
  capture: (abortSignal?: AbortSignal) => Promise<LocalWorkspaceSnapshot>;
  artifacts: Pick<ArtifactManager, 'read'>;
  request: WorkspaceRestoreRequest;
  maxManifestBytes: number;
  maxRestoreBytes: number;
  maxRestoreEntries: number;
  maxRestoreLockWaitDurationMs: number;
  maxRestoreStagingDurationMs: number;
  abortSignal?: AbortSignal;
}

export type LocalWorkspaceRestoreRecoveryResult = 'none' | 'finalized' | 'rolled_back';

export async function restoreLocalWorkspaceSnapshot(
  options: RestoreLocalWorkspaceSnapshotOptions
): Promise<void> {
  assertRestoreActive(options.abortSignal);
  const root = path.resolve(options.workspaceRoot);
  await withLocalWorkspaceRestoreLock(
    root,
    async () => {
      assertRestoreActive(options.abortSignal);
      await recoverInterruptedRestoreUnlocked(root, () => options.capture(options.abortSignal));
      assertRestoreActive(options.abortSignal);
      await restoreLocalWorkspaceSnapshotUnlocked(root, options);
    },
    {
      maxWaitDurationMs: options.maxRestoreLockWaitDurationMs,
      abortSignal: options.abortSignal,
    }
  );
}

export async function recoverInterruptedLocalWorkspaceRestore(
  workspaceRoot: string,
  capture: () => Promise<LocalWorkspaceSnapshot>,
  maxWaitDurationMs = 30_000
): Promise<LocalWorkspaceRestoreRecoveryResult> {
  const root = path.resolve(workspaceRoot);
  return withLocalWorkspaceRestoreLock(
    root,
    () => recoverInterruptedRestoreUnlocked(root, capture),
    { maxWaitDurationMs }
  );
}

async function restoreLocalWorkspaceSnapshotUnlocked(
  root: string,
  options: RestoreLocalWorkspaceSnapshotOptions
): Promise<void> {
  const guard = new WorkspaceControlPlaneGuard();
  guard.assertWorkspaceRoot(root);
  assertRestoreActive(options.abortSignal);
  const initial = await options.capture(options.abortSignal);
  assertRestoreActive(options.abortSignal);
  assertExpectedWorkspaceHash(options.request, initial.sourceTreeHash);
  const manifest = await readManifest(options);
  assertRestoreActive(options.abortSignal);
  assertManifestScopeAndLimits(manifest, options);
  assertManifestPaths(manifest, root, guard);

  const parent = path.dirname(root);
  const stagingStartedAt = performance.now();
  const staging = await fs.mkdtemp(path.join(parent, `.${path.basename(root)}.restore-`));
  const stagingCancellation = createRestoreStagingCancellation(
    options.abortSignal,
    Math.max(0, options.maxRestoreStagingDurationMs - (performance.now() - stagingStartedAt))
  );
  const stagingOptions: RestoreLocalWorkspaceSnapshotOptions = {
    ...options,
    abortSignal: stagingCancellation.signal,
  };
  const assertStagingTimeBudget = (): void => {
    if (performance.now() - stagingStartedAt > options.maxRestoreStagingDurationMs) {
      stagingCancellation.abortForTimeout();
    }
    if (stagingCancellation.source() === 'timeout') throw restoreStagingTimeout(options);
    assertRestoreActive(options.abortSignal);
  };
  const backup = `${staging}.previous`;
  let stagingExists = true;
  let journalCreated = false;

  try {
    assertStagingTimeBudget();
    await createLocalWorkspaceRestoreJournal(root, {
      workspaceName: path.basename(root),
      stagingName: path.basename(staging),
      backupName: path.basename(backup),
      operationId: options.request.operationId,
      snapshotRef: options.request.snapshotRef,
      initialTreeHash: initial.sourceTreeHash,
      targetTreeHash: manifest.sourceTreeHash,
    });
    journalCreated = true;
    await populateStagingDirectory(
      staging,
      manifest,
      stagingOptions,
      guard,
      assertStagingTimeBudget
    );
    assertStagingTimeBudget();
    const beforeSwap = await options.capture(stagingCancellation.signal);
    assertStagingTimeBudget();
    if (beforeSwap.sourceTreeHash !== initial.sourceTreeHash) {
      throw revisionConflict(
        'Workspace changed while the full snapshot restore was being prepared.',
        initial.sourceTreeHash,
        beforeSwap.sourceTreeHash
      );
    }

    stagingCancellation.dispose();
    assertRestoreActive(options.abortSignal);
    await fs.rename(root, backup);
    try {
      await fs.rename(staging, root);
      stagingExists = false;
    } catch (error) {
      await fs.rename(backup, root);
      throw error;
    }

    try {
      const restored = await options.capture();
      if (restored.sourceTreeHash !== manifest.sourceTreeHash) {
        throw revisionConflict(
          'Restored Workspace does not match the snapshot manifest.',
          manifest.sourceTreeHash,
          restored.sourceTreeHash
        );
      }
    } catch (error) {
      await rollbackWorkspaceSwap(root, backup);
      throw error;
    }

    await fs.rm(backup, { recursive: true, force: true });
    await removeLocalWorkspaceRestoreJournal(root);
    journalCreated = false;
  } catch (error) {
    if (stagingCancellation.source() === 'timeout') throw restoreStagingTimeout(options);
    throw error;
  } finally {
    stagingCancellation.dispose();
    if (stagingExists) await fs.rm(staging, { recursive: true, force: true });
    if (journalCreated && !(await pathExists(backup))) {
      await removeLocalWorkspaceRestoreJournal(root);
    }
    // A backup is never deleted here. If rollback itself fails, preserving the
    // original tree is safer than silently cleaning recovery evidence.
  }
}

async function recoverInterruptedRestoreUnlocked(
  root: string,
  capture: () => Promise<LocalWorkspaceSnapshot>
): Promise<LocalWorkspaceRestoreRecoveryResult> {
  const journal = await readLocalWorkspaceRestoreJournal(root);
  if (!journal) return 'none';
  if (journal.ownerPid !== process.pid && processIsAlive(journal.ownerPid)) {
    throw executionProviderError(
      'EXECUTION_REVISION_CONFLICT',
      'Another process still owns the Workspace restore transaction.',
      true
    );
  }

  const parent = path.dirname(root);
  const staging = path.join(parent, journal.stagingName);
  const backup = path.join(parent, journal.backupName);
  const rootExists = await pathExists(root);
  const stagingExists = await pathExists(staging);
  const backupExists = await pathExists(backup);

  if (!rootExists && backupExists) {
    if (stagingExists) await fs.rm(staging, { recursive: true, force: true });
    await fs.rename(backup, root);
    await assertRecoveredTreeHash(capture, journal.initialTreeHash);
    await removeLocalWorkspaceRestoreJournal(root);
    return 'rolled_back';
  }

  if (rootExists && backupExists && !stagingExists) {
    const current = await capture();
    if (current.sourceTreeHash === journal.targetTreeHash) {
      await fs.rm(backup, { recursive: true, force: true });
      await removeLocalWorkspaceRestoreJournal(root);
      return 'finalized';
    }
    if (current.sourceTreeHash === journal.initialTreeHash) {
      await fs.rm(backup, { recursive: true, force: true });
      await removeLocalWorkspaceRestoreJournal(root);
      return 'rolled_back';
    }
    await rollbackWorkspaceSwap(root, backup);
    await assertRecoveredTreeHash(capture, journal.initialTreeHash);
    await removeLocalWorkspaceRestoreJournal(root);
    return 'rolled_back';
  }

  if (rootExists && !backupExists && stagingExists) {
    await assertRecoveredTreeHash(capture, journal.initialTreeHash);
    await fs.rm(staging, { recursive: true, force: true });
    await removeLocalWorkspaceRestoreJournal(root);
    return 'rolled_back';
  }

  if (rootExists && !backupExists && !stagingExists) {
    const current = await capture();
    if (
      current.sourceTreeHash !== journal.initialTreeHash &&
      current.sourceTreeHash !== journal.targetTreeHash
    ) {
      throw recoveryFailed();
    }
    await removeLocalWorkspaceRestoreJournal(root);
    return current.sourceTreeHash === journal.targetTreeHash ? 'finalized' : 'rolled_back';
  }

  throw recoveryFailed();
}

async function readManifest(
  options: RestoreLocalWorkspaceSnapshotOptions
): Promise<WorkspaceSnapshotManifest> {
  const result = await options.artifacts.read(
    {
      principal: options.request.principal,
      artifactId: options.request.snapshotRef,
    },
    operationOptions(options.abortSignal)
  );
  assertFinalSnapshotArtifact(result.record, options.request.workspaceId);
  if (result.record.sizeBytes > options.maxManifestBytes) {
    throw executionProviderError(
      'EXECUTION_RESOURCE_EXCEEDED',
      'Workspace snapshot manifest exceeds the configured restore limit.',
      false,
      {
        maxManifestBytes: options.maxManifestBytes,
        actualManifestBytes: result.record.sizeBytes,
      }
    );
  }
  const collected = await collectArtifactContent(result.content.stream, options.maxManifestBytes);
  if (
    collected.contentHash !== result.record.contentHash ||
    collected.contentHash !== result.content.contentHash ||
    collected.bytes.byteLength !== result.record.sizeBytes
  ) {
    throw executionProviderError(
      'EXECUTION_INVALID_REQUEST',
      'Workspace snapshot manifest Artifact content is inconsistent.',
      false
    );
  }

  let decoded: unknown;
  try {
    decoded = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(collected.bytes));
  } catch {
    throw executionProviderError(
      'EXECUTION_INVALID_REQUEST',
      'Workspace snapshot manifest is not valid UTF-8 JSON.',
      false
    );
  }
  let manifest: WorkspaceSnapshotManifest;
  try {
    manifest = validateWorkspaceSnapshotManifest(decoded);
  } catch {
    throw executionProviderError(
      'EXECUTION_INVALID_REQUEST',
      'Workspace snapshot manifest does not satisfy the runtime schema.',
      false
    );
  }
  if (!verifyWorkspaceSnapshotManifestHash(manifest)) {
    throw executionProviderError(
      'EXECUTION_INVALID_REQUEST',
      'Workspace snapshot manifest hash is invalid.',
      false
    );
  }
  if (
    result.record.metadata?.snapshotId !== manifest.id ||
    result.record.metadata?.sourceTreeHash !== manifest.sourceTreeHash ||
    result.record.metadata?.manifestHash !== manifest.manifestHash
  ) {
    throw executionProviderError(
      'EXECUTION_INVALID_REQUEST',
      'Workspace snapshot manifest metadata does not match its Artifact record.',
      false
    );
  }
  return manifest;
}

function assertFinalSnapshotArtifact(record: ArtifactRecord, workspaceId: string): void {
  if (
    record.kind !== 'snapshot' ||
    record.status !== 'final' ||
    record.immutable !== true ||
    record.workspaceId !== workspaceId
  ) {
    throw executionProviderError(
      'EXECUTION_INVALID_REQUEST',
      'Workspace restore requires a finalized snapshot Artifact in the same Workspace.',
      false
    );
  }
}

function assertManifestScopeAndLimits(
  manifest: WorkspaceSnapshotManifest,
  options: RestoreLocalWorkspaceSnapshotOptions
): void {
  if (manifest.workspaceId !== options.request.workspaceId) {
    throw executionProviderError(
      'EXECUTION_PERMISSION_DENIED',
      'Workspace snapshot manifest belongs to a different Workspace.',
      false
    );
  }
  if (manifest.entries.length > options.maxRestoreEntries) {
    throw executionProviderError(
      'EXECUTION_RESOURCE_EXCEEDED',
      'Workspace snapshot exceeds the configured restore entry limit.',
      false,
      {
        maxRestoreEntries: options.maxRestoreEntries,
        actualRestoreEntries: manifest.entries.length,
      }
    );
  }
  if (manifest.totalBytes > options.maxRestoreBytes) {
    throw executionProviderError(
      'EXECUTION_RESOURCE_EXCEEDED',
      'Workspace snapshot exceeds the configured restore byte limit.',
      false,
      {
        maxRestoreBytes: options.maxRestoreBytes,
        actualRestoreBytes: manifest.totalBytes,
      }
    );
  }
  if (
    manifest.entries.some(
      (entry) => entry.kind === 'file' && (!entry.artifactRef || !entry.contentHash)
    )
  ) {
    throw executionProviderError(
      'EXECUTION_INVALID_REQUEST',
      'Workspace full snapshot file entries require content hashes and Artifact references.',
      false
    );
  }
}

function assertManifestPaths(
  manifest: WorkspaceSnapshotManifest,
  root: string,
  guard: WorkspaceControlPlaneGuard
): void {
  const directoryPaths = new Set(
    manifest.entries.filter((entry) => entry.kind === 'directory').map((entry) => entry.path)
  );
  const entryPaths = new Set(manifest.entries.map((entry) => entry.path));
  const platformPaths = new Set<string>();

  for (const entry of manifest.entries) {
    const candidate = resolveManifestPath(root, entry.path);
    assertSafeManifestPath(guard, entry.path, candidate);
    const platformPath =
      process.platform === 'win32'
        ? entry.path.normalize('NFKC').toLocaleLowerCase('en-US')
        : entry.path.normalize('NFKC');
    if (platformPaths.has(platformPath)) {
      throw executionProviderError(
        'EXECUTION_INVALID_REQUEST',
        'Workspace snapshot contains paths that collide on this platform.',
        false
      );
    }
    platformPaths.add(platformPath);

    let parent = portableParent(entry.path);
    while (parent) {
      if (!directoryPaths.has(parent)) {
        throw executionProviderError(
          'EXECUTION_INVALID_REQUEST',
          'Workspace snapshot entries require explicit parent directory entries.',
          false
        );
      }
      parent = portableParent(parent);
    }
    if (entry.kind === 'symlink' && entry.symlinkTarget && !entryPaths.has(entry.symlinkTarget)) {
      // Dangling links are valid filesystem state, but their target must still
      // be a safe Workspace-relative path.
      assertSafeManifestPath(
        guard,
        entry.symlinkTarget,
        resolveManifestPath(root, entry.symlinkTarget)
      );
    }
  }
}

async function populateStagingDirectory(
  staging: string,
  manifest: WorkspaceSnapshotManifest,
  options: RestoreLocalWorkspaceSnapshotOptions,
  guard: WorkspaceControlPlaneGuard,
  assertTimeBudget: () => void
): Promise<void> {
  const directories = manifest.entries
    .filter((entry) => entry.kind === 'directory')
    .sort((left, right) => pathDepth(left.path) - pathDepth(right.path));
  for (const entry of directories) {
    assertTimeBudget();
    await fs.mkdir(resolveManifestPath(staging, entry.path));
    assertTimeBudget();
  }

  let restoredBytes = 0;
  for (const entry of manifest.entries.filter((candidate) => candidate.kind === 'file')) {
    assertTimeBudget();
    restoredBytes += await restoreFile(staging, entry, options, guard, assertTimeBudget);
    if (restoredBytes > options.maxRestoreBytes) {
      throw executionProviderError(
        'EXECUTION_RESOURCE_EXCEEDED',
        'Workspace restore exceeded its configured byte limit.',
        false,
        { maxRestoreBytes: options.maxRestoreBytes, actualRestoreBytes: restoredBytes }
      );
    }
  }

  for (const entry of manifest.entries.filter((candidate) => candidate.kind === 'symlink')) {
    assertTimeBudget();
    await restoreSymlink(staging, entry, manifest.entries, guard);
    assertTimeBudget();
  }

  for (const entry of manifest.entries.filter((candidate) => candidate.kind === 'file')) {
    assertTimeBudget();
    if (entry.mode !== undefined) {
      await fs.chmod(resolveManifestPath(staging, entry.path), entry.mode & 0o777);
    }
    assertTimeBudget();
  }
  for (const entry of [...directories].sort(
    (left, right) => pathDepth(right.path) - pathDepth(left.path)
  )) {
    assertTimeBudget();
    if (entry.mode !== undefined) {
      await fs.chmod(resolveManifestPath(staging, entry.path), entry.mode & 0o777);
    }
    assertTimeBudget();
  }
}

async function restoreFile(
  staging: string,
  entry: WorkspaceSnapshotEntry,
  options: RestoreLocalWorkspaceSnapshotOptions,
  guard: WorkspaceControlPlaneGuard,
  assertTimeBudget: () => void
): Promise<number> {
  if (!entry.artifactRef || !entry.contentHash || entry.sizeBytes === undefined) {
    throw executionProviderError(
      'EXECUTION_INVALID_REQUEST',
      'Workspace snapshot file entry is incomplete.',
      false
    );
  }
  assertTimeBudget();
  const result = await options.artifacts.read(
    {
      principal: options.request.principal,
      artifactId: entry.artifactRef,
      expectedContentHash: entry.contentHash,
    },
    operationOptions(options.abortSignal)
  );
  assertTimeBudget();
  assertFinalSnapshotArtifact(result.record, options.request.workspaceId);
  if (
    result.record.contentHash !== entry.contentHash ||
    result.record.sizeBytes !== entry.sizeBytes ||
    result.content.contentHash !== entry.contentHash ||
    result.content.sizeBytes !== entry.sizeBytes
  ) {
    throw executionProviderError(
      'EXECUTION_INVALID_REQUEST',
      'Workspace snapshot file Artifact does not match its manifest entry.',
      false
    );
  }

  const destination = resolveManifestPath(staging, entry.path);
  guard.assertResolvedPath(destination);
  const handle = await fs.open(destination, 'wx', 0o600);
  assertTimeBudget();
  const hash = createHash('sha256');
  let sizeBytes = 0;
  try {
    for await (const chunk of result.content.stream) {
      assertTimeBudget();
      if (!(chunk instanceof Uint8Array)) {
        throw executionProviderError(
          'EXECUTION_INVALID_REQUEST',
          'Workspace snapshot Artifact stream yielded an invalid chunk.',
          false
        );
      }
      sizeBytes += chunk.byteLength;
      if (sizeBytes > entry.sizeBytes || sizeBytes > options.maxRestoreBytes) {
        throw executionProviderError(
          'EXECUTION_RESOURCE_EXCEEDED',
          'Workspace snapshot file exceeded its declared restore size.',
          false
        );
      }
      hash.update(chunk);
      await writeAll(handle, chunk, assertTimeBudget);
      assertTimeBudget();
    }
  } finally {
    await handle.close();
  }
  const contentHash = `sha256:${hash.digest('hex')}`;
  if (sizeBytes !== entry.sizeBytes || contentHash !== entry.contentHash) {
    throw executionProviderError(
      'EXECUTION_INVALID_REQUEST',
      'Workspace snapshot file bytes do not match the manifest.',
      false
    );
  }
  return sizeBytes;
}

async function restoreSymlink(
  staging: string,
  entry: WorkspaceSnapshotEntry,
  entries: WorkspaceSnapshotEntry[],
  guard: WorkspaceControlPlaneGuard
): Promise<void> {
  if (!entry.symlinkTarget) {
    throw executionProviderError(
      'EXECUTION_INVALID_REQUEST',
      'Workspace snapshot symlink entry has no target.',
      false
    );
  }
  const destination = resolveManifestPath(staging, entry.path);
  const absoluteTarget = resolveManifestPath(staging, entry.symlinkTarget);
  guard.assertResolvedPath(destination);
  guard.assertResolvedPath(absoluteTarget);
  const relativeTarget = path.relative(path.dirname(destination), absoluteTarget) || '.';
  const targetEntry = entries.find((candidate) => candidate.path === entry.symlinkTarget);
  const type =
    process.platform === 'win32'
      ? targetEntry?.kind === 'directory'
        ? 'junction'
        : 'file'
      : targetEntry?.kind === 'directory'
        ? 'dir'
        : 'file';
  await fs.symlink(relativeTarget, destination, type);
}

async function writeAll(
  handle: FileHandle,
  chunk: Uint8Array,
  assertTimeBudget: () => void
): Promise<void> {
  let offset = 0;
  while (offset < chunk.byteLength) {
    assertTimeBudget();
    const { bytesWritten } = await handle.write(chunk, offset, chunk.byteLength - offset);
    assertTimeBudget();
    if (bytesWritten <= 0) {
      throw executionProviderError(
        'EXECUTION_INTERNAL_ERROR',
        'Workspace restore could not make progress while writing a file.',
        true
      );
    }
    offset += bytesWritten;
  }
}

async function rollbackWorkspaceSwap(root: string, backup: string): Promise<void> {
  const failedRestore = `${backup}.failed`;
  try {
    await fs.rename(root, failedRestore);
    await fs.rename(backup, root);
    await fs.rm(failedRestore, { recursive: true, force: true });
  } catch {
    throw executionProviderError(
      'EXECUTION_CLEANUP_FAILED',
      'Workspace restore rollback failed; the original backup was preserved.',
      false
    );
  }
}

function assertExpectedWorkspaceHash(
  request: WorkspaceRestoreRequest,
  actualWorkspaceHash: string
): void {
  if (
    request.expectedWorkspaceSnapshotHash !== undefined &&
    request.expectedWorkspaceSnapshotHash !== actualWorkspaceHash
  ) {
    throw revisionConflict(
      'Workspace changed before the full snapshot restore began.',
      request.expectedWorkspaceSnapshotHash,
      actualWorkspaceHash
    );
  }
}

function revisionConflict(
  message: string,
  expectedWorkspaceSnapshotHash: string,
  actualWorkspaceSnapshotHash: string
) {
  return executionProviderError('EXECUTION_REVISION_CONFLICT', message, true, {
    expectedWorkspaceSnapshotHash,
    actualWorkspaceSnapshotHash,
  });
}

function resolveManifestPath(root: string, relativePath: string): string {
  const candidate = path.resolve(root, ...relativePath.split('/'));
  const relative = path.relative(root, candidate);
  if (
    !relative ||
    relative === '..' ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    throw executionProviderError(
      'EXECUTION_PATH_ESCAPE',
      'Workspace snapshot path escapes the Workspace root.',
      false
    );
  }
  return candidate;
}

function portableParent(relativePath: string): string | undefined {
  const index = relativePath.lastIndexOf('/');
  return index === -1 ? undefined : relativePath.slice(0, index);
}

function pathDepth(relativePath: string): number {
  return relativePath.split('/').length;
}

async function assertRecoveredTreeHash(
  capture: () => Promise<LocalWorkspaceSnapshot>,
  expectedTreeHash: string
): Promise<void> {
  const recovered = await capture();
  if (recovered.sourceTreeHash !== expectedTreeHash) throw recoveryFailed();
}

async function pathExists(candidate: string): Promise<boolean> {
  try {
    await fs.lstat(candidate);
    return true;
  } catch (error) {
    if (nodeErrorCode(error) === 'ENOENT') return false;
    throw error;
  }
}

function recoveryFailed() {
  return executionProviderError(
    'EXECUTION_CLEANUP_FAILED',
    'Workspace restore state is ambiguous; automatic recovery stopped.',
    false
  );
}

function assertSafeManifestPath(
  guard: WorkspaceControlPlaneGuard,
  relativePath: string,
  resolvedPath: string
): void {
  try {
    guard.assertInputPath(relativePath);
    guard.assertResolvedPath(resolvedPath);
  } catch {
    throw executionProviderError(
      'EXECUTION_PATH_DENIED',
      'Workspace snapshot contains a path denied by the control-plane policy.',
      false
    );
  }
}

function nodeErrorCode(error: unknown): string | undefined {
  if (typeof error !== 'object' || error === null || !('code' in error)) return undefined;
  const code = error.code;
  return typeof code === 'string' ? code : undefined;
}

function processIsAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return nodeErrorCode(error) !== 'ESRCH';
  }
}

function assertRestoreActive(abortSignal: AbortSignal | undefined): void {
  if (abortSignal?.aborted) {
    throw executionProviderError(
      'EXECUTION_CANCELLED',
      'Workspace snapshot restore was cancelled.',
      false
    );
  }
}

function operationOptions(abortSignal: AbortSignal | undefined): ArtifactOperationOptions {
  return abortSignal ? { abortSignal } : {};
}

type RestoreStagingCancellationSource = 'caller' | 'timeout';

interface RestoreStagingCancellation {
  readonly signal: AbortSignal;
  source(): RestoreStagingCancellationSource | undefined;
  abortForTimeout(): void;
  dispose(): void;
}

function createRestoreStagingCancellation(
  callerSignal: AbortSignal | undefined,
  timeoutMs: number
): RestoreStagingCancellation {
  const controller = new AbortController();
  let cancellationSource: RestoreStagingCancellationSource | undefined;
  const abort = (source: RestoreStagingCancellationSource, reason?: unknown): void => {
    if (cancellationSource) return;
    cancellationSource = source;
    controller.abort(reason);
  };
  const abortFromCaller = (): void => abort('caller', callerSignal?.reason);
  const abortForTimeout = (): void =>
    abort('timeout', new Error('Workspace restore staging timed out.'));
  if (callerSignal?.aborted) {
    abortFromCaller();
  } else {
    callerSignal?.addEventListener('abort', abortFromCaller, { once: true });
  }
  const timer = setTimeout(abortForTimeout, timeoutMs);

  return {
    signal: controller.signal,
    source: () => cancellationSource,
    abortForTimeout,
    dispose() {
      clearTimeout(timer);
      callerSignal?.removeEventListener('abort', abortFromCaller);
    },
  };
}

function restoreStagingTimeout(options: RestoreLocalWorkspaceSnapshotOptions) {
  return executionProviderError(
    'EXECUTION_RESOURCE_EXCEEDED',
    'Workspace restore staging exceeded its configured duration limit.',
    false,
    { maxRestoreStagingDurationMs: options.maxRestoreStagingDurationMs }
  );
}
