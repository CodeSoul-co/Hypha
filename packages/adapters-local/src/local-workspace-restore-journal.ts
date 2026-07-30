import { createHash } from 'node:crypto';
import fs, { type FileHandle } from 'node:fs/promises';
import path from 'node:path';
import { executionProviderError } from './execution-provider-error';

const journalVersion = 1 as const;
const restoreLocks = new Map<string, Promise<void>>();

export interface LocalWorkspaceRestoreJournal {
  version: typeof journalVersion;
  workspaceName: string;
  stagingName: string;
  backupName: string;
  operationId: string;
  snapshotRef: string;
  ownerPid: number;
  createdAt: string;
  initialTreeHash: string;
  targetTreeHash: string;
  journalHash: string;
}

export type LocalWorkspaceRestoreJournalInput = Omit<
  LocalWorkspaceRestoreJournal,
  'version' | 'ownerPid' | 'createdAt' | 'journalHash'
>;

export interface LocalWorkspaceRestoreLockOptions {
  maxWaitDurationMs?: number;
  abortSignal?: AbortSignal;
}

export async function withLocalWorkspaceRestoreLock<T>(
  workspaceRoot: string,
  task: () => Promise<T>,
  options: LocalWorkspaceRestoreLockOptions = {}
): Promise<T> {
  const key = platformPathKey(path.resolve(workspaceRoot));
  const maxWaitDurationMs = options.maxWaitDurationMs ?? 30_000;
  if (!positiveInteger(maxWaitDurationMs)) {
    throw new TypeError('maxWaitDurationMs must be a positive safe integer.');
  }
  const previous = restoreLocks.get(key) ?? Promise.resolve();
  let release: (() => void) | undefined;
  const current = new Promise<void>((resolve) => {
    release = resolve;
  });
  const queued = previous.then(() => current);
  restoreLocks.set(key, queued);
  void queued.then(() => {
    if (restoreLocks.get(key) === queued) restoreLocks.delete(key);
  });
  try {
    await waitForRestoreLock(previous, maxWaitDurationMs, options.abortSignal);
    assertRestoreLockActive(options.abortSignal);
  } catch (error) {
    release?.();
    throw error;
  }
  try {
    return await task();
  } finally {
    release?.();
  }
}

export function workspaceRestoreJournalPath(workspaceRoot: string): string {
  const root = path.resolve(workspaceRoot);
  return path.join(path.dirname(root), `.${path.basename(root)}.restore-journal.json`);
}

export async function createLocalWorkspaceRestoreJournal(
  workspaceRoot: string,
  input: LocalWorkspaceRestoreJournalInput
): Promise<LocalWorkspaceRestoreJournal> {
  const journal = createJournal(input);
  assertJournalNames(workspaceRoot, journal);
  const journalPath = workspaceRestoreJournalPath(workspaceRoot);
  const content = new TextEncoder().encode(`${JSON.stringify(journal)}\n`);
  let handle: FileHandle | undefined;
  try {
    handle = await fs.open(journalPath, 'wx', 0o600);
    await writeAll(handle, content);
    await handle.sync();
  } catch (error) {
    if (nodeErrorCode(error) === 'EEXIST') {
      throw executionProviderError(
        'EXECUTION_REVISION_CONFLICT',
        'Another Workspace restore transaction requires recovery.',
        true
      );
    }
    throw error;
  } finally {
    await handle?.close();
  }
  await syncParentDirectory(path.dirname(journalPath));
  return journal;
}

export async function readLocalWorkspaceRestoreJournal(
  workspaceRoot: string
): Promise<LocalWorkspaceRestoreJournal | null> {
  const journalPath = workspaceRestoreJournalPath(workspaceRoot);
  let content: string;
  try {
    content = await fs.readFile(journalPath, 'utf8');
  } catch (error) {
    if (nodeErrorCode(error) === 'ENOENT') return null;
    throw error;
  }

  let decoded: unknown;
  try {
    decoded = JSON.parse(content);
  } catch {
    throw invalidJournal();
  }
  const journal = validateJournal(decoded);
  assertJournalNames(workspaceRoot, journal);
  return journal;
}

export async function removeLocalWorkspaceRestoreJournal(workspaceRoot: string): Promise<void> {
  const journalPath = workspaceRestoreJournalPath(workspaceRoot);
  await fs.rm(journalPath, { force: true });
  await syncParentDirectory(path.dirname(journalPath));
}

function createJournal(input: LocalWorkspaceRestoreJournalInput): LocalWorkspaceRestoreJournal {
  const content = {
    version: journalVersion,
    workspaceName: input.workspaceName,
    stagingName: input.stagingName,
    backupName: input.backupName,
    operationId: input.operationId,
    snapshotRef: input.snapshotRef,
    ownerPid: process.pid,
    createdAt: new Date().toISOString(),
    initialTreeHash: input.initialTreeHash,
    targetTreeHash: input.targetTreeHash,
  };
  return {
    ...content,
    journalHash: hashJournal(content),
  };
}

function validateJournal(input: unknown): LocalWorkspaceRestoreJournal {
  if (!isRecord(input)) throw invalidJournal();
  const allowedKeys = new Set([
    'version',
    'workspaceName',
    'stagingName',
    'backupName',
    'operationId',
    'snapshotRef',
    'ownerPid',
    'createdAt',
    'initialTreeHash',
    'targetTreeHash',
    'journalHash',
  ]);
  if (Object.keys(input).some((key) => !allowedKeys.has(key))) throw invalidJournal();
  if (
    input.version !== journalVersion ||
    !nonEmptyString(input.workspaceName) ||
    !nonEmptyString(input.stagingName) ||
    !nonEmptyString(input.backupName) ||
    !nonEmptyString(input.operationId) ||
    !nonEmptyString(input.snapshotRef) ||
    !positiveInteger(input.ownerPid) ||
    !nonEmptyString(input.createdAt) ||
    !nonEmptyString(input.initialTreeHash) ||
    !nonEmptyString(input.targetTreeHash) ||
    !nonEmptyString(input.journalHash)
  ) {
    throw invalidJournal();
  }
  const journal: LocalWorkspaceRestoreJournal = {
    version: journalVersion,
    workspaceName: input.workspaceName,
    stagingName: input.stagingName,
    backupName: input.backupName,
    operationId: input.operationId,
    snapshotRef: input.snapshotRef,
    ownerPid: input.ownerPid,
    createdAt: input.createdAt,
    initialTreeHash: input.initialTreeHash,
    targetTreeHash: input.targetTreeHash,
    journalHash: input.journalHash,
  };
  const { journalHash, ...content } = journal;
  if (journalHash !== hashJournal(content)) throw invalidJournal();
  return journal;
}

function assertJournalNames(workspaceRoot: string, journal: LocalWorkspaceRestoreJournal): void {
  const workspaceName = path.basename(path.resolve(workspaceRoot));
  if (
    journal.workspaceName !== workspaceName ||
    path.basename(journal.stagingName) !== journal.stagingName ||
    path.basename(journal.backupName) !== journal.backupName ||
    !journal.stagingName.startsWith(`.${workspaceName}.restore-`) ||
    journal.backupName !== `${journal.stagingName}.previous`
  ) {
    throw invalidJournal();
  }
}

function hashJournal(input: Omit<LocalWorkspaceRestoreJournal, 'journalHash'>): string {
  return `sha256:${createHash('sha256').update(JSON.stringify(input), 'utf8').digest('hex')}`;
}

async function writeAll(handle: FileHandle, content: Uint8Array): Promise<void> {
  let offset = 0;
  while (offset < content.byteLength) {
    const { bytesWritten } = await handle.write(content, offset, content.byteLength - offset);
    if (bytesWritten <= 0) {
      throw executionProviderError(
        'EXECUTION_INTERNAL_ERROR',
        'Workspace restore journal write made no progress.',
        true
      );
    }
    offset += bytesWritten;
  }
}

async function syncParentDirectory(parent: string): Promise<void> {
  let handle: FileHandle | undefined;
  try {
    handle = await fs.open(parent, 'r');
    await handle.sync();
  } catch (error) {
    if (!['EINVAL', 'ENOTSUP', 'EPERM', 'EISDIR'].includes(nodeErrorCode(error) ?? '')) {
      throw error;
    }
  } finally {
    await handle?.close();
  }
}

function invalidJournal() {
  return executionProviderError(
    'EXECUTION_CLEANUP_FAILED',
    'Workspace restore recovery journal is invalid; automatic recovery stopped.',
    false
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function positiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value > 0;
}

function nodeErrorCode(error: unknown): string | undefined {
  if (!isRecord(error)) return undefined;
  return typeof error.code === 'string' ? error.code : undefined;
}

function platformPathKey(value: string): string {
  return process.platform === 'win32' ? value.toLocaleLowerCase('en-US') : value;
}

async function waitForRestoreLock(
  previous: Promise<void>,
  maxWaitDurationMs: number,
  abortSignal: AbortSignal | undefined
): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let abortListener: (() => void) | undefined;
  try {
    assertRestoreLockActive(abortSignal);
    const waits: Promise<void>[] = [
      previous,
      new Promise<void>((_resolve, reject) => {
        timer = setTimeout(() => {
          reject(
            executionProviderError(
              'EXECUTION_RESOURCE_EXCEEDED',
              'Workspace restore lock wait exceeded its configured duration limit.',
              true,
              { maxRestoreLockWaitDurationMs: maxWaitDurationMs }
            )
          );
        }, maxWaitDurationMs);
      }),
    ];
    if (abortSignal) {
      waits.push(
        new Promise<void>((_resolve, reject) => {
          abortListener = () => reject(restoreLockCancelled());
          abortSignal.addEventListener('abort', abortListener, { once: true });
          if (abortSignal.aborted) abortListener();
        })
      );
    }
    await Promise.race(waits);
  } finally {
    if (timer) clearTimeout(timer);
    if (abortListener) abortSignal?.removeEventListener('abort', abortListener);
  }
}

function assertRestoreLockActive(abortSignal: AbortSignal | undefined): void {
  if (abortSignal?.aborted) throw restoreLockCancelled();
}

function restoreLockCancelled() {
  return executionProviderError(
    'EXECUTION_CANCELLED',
    'Workspace restore lock wait was cancelled.',
    false
  );
}
