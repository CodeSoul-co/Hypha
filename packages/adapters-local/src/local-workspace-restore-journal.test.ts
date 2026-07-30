import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createLocalWorkspaceRestoreJournal,
  readLocalWorkspaceRestoreJournal,
  removeLocalWorkspaceRestoreJournal,
  type LocalWorkspaceRestoreJournalInput,
  withLocalWorkspaceRestoreLock,
} from './local-workspace-restore-journal';

describe('Local Workspace restore journal', () => {
  const roots: string[] = [];

  afterEach(async () => {
    await Promise.all(
      roots.splice(0).map(async (root) => {
        await removeLocalWorkspaceRestoreJournal(root);
        await fs.rm(root, { recursive: true, force: true });
      })
    );
  });

  it('allows only one concurrent restore to atomically reserve the Workspace journal', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-restore-journal-race-'));
    roots.push(root);
    const attempts = [journalInput(root, 'one'), journalInput(root, 'two')];

    const results = await Promise.allSettled(
      attempts.map((input) => createLocalWorkspaceRestoreJournal(root, input))
    );
    const successful = results.filter(
      (
        result
      ): result is PromiseFulfilledResult<
        Awaited<ReturnType<typeof createLocalWorkspaceRestoreJournal>>
      > => result.status === 'fulfilled'
    );
    const rejected = results.filter(
      (result): result is PromiseRejectedResult => result.status === 'rejected'
    );

    expect(successful).toHaveLength(1);
    expect(rejected).toHaveLength(1);
    expect(rejected[0]?.reason).toMatchObject({
      normalizedError: {
        code: 'EXECUTION_REVISION_CONFLICT',
        retryable: true,
      },
    });

    const persisted = await readLocalWorkspaceRestoreJournal(root);
    expect(persisted).toMatchObject({
      operationId: successful[0]?.value.operationId,
      snapshotRef: successful[0]?.value.snapshotRef,
      stagingName: successful[0]?.value.stagingName,
      backupName: successful[0]?.value.backupName,
      ownerPid: process.pid,
      journalHash: expect.stringMatching(/^sha256:[a-f0-9]{64}$/u),
    });
  });

  it('bounds lock waiting without running the timed-out task or bypassing the holder', async () => {
    vi.useFakeTimers();
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-restore-lock-timeout-'));
    roots.push(root);
    let releaseHolder: (() => void) | undefined;
    const holderReleased = new Promise<void>((resolve) => {
      releaseHolder = resolve;
    });
    let holderStarted: (() => void) | undefined;
    const started = new Promise<void>((resolve) => {
      holderStarted = resolve;
    });
    const holder = withLocalWorkspaceRestoreLock(root, async () => {
      holderStarted?.();
      await holderReleased;
    });

    try {
      await started;
      let timedOutTaskRan = false;
      const timedOut = withLocalWorkspaceRestoreLock(
        root,
        async () => {
          timedOutTaskRan = true;
        },
        { maxWaitDurationMs: 10 }
      );
      const timedOutExpectation = expect(timedOut).rejects.toMatchObject({
        normalizedError: {
          code: 'EXECUTION_RESOURCE_EXCEEDED',
          retryable: true,
          details: { maxRestoreLockWaitDurationMs: 10 },
        },
      });

      await vi.advanceTimersByTimeAsync(11);
      await timedOutExpectation;
      expect(timedOutTaskRan).toBe(false);

      releaseHolder?.();
      await holder;
      await expect(
        withLocalWorkspaceRestoreLock(root, async () => 'acquired', {
          maxWaitDurationMs: 10,
        })
      ).resolves.toBe('acquired');
    } finally {
      releaseHolder?.();
      await holder;
      vi.useRealTimers();
    }
  });

  it('cancels lock waiting without running the cancelled task or bypassing the holder', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-restore-lock-cancel-'));
    roots.push(root);
    let releaseHolder: (() => void) | undefined;
    const holderReleased = new Promise<void>((resolve) => {
      releaseHolder = resolve;
    });
    let holderStarted: (() => void) | undefined;
    const started = new Promise<void>((resolve) => {
      holderStarted = resolve;
    });
    const holder = withLocalWorkspaceRestoreLock(root, async () => {
      holderStarted?.();
      await holderReleased;
    });

    try {
      await started;
      const controller = new AbortController();
      let cancelledTaskRan = false;
      const cancelled = withLocalWorkspaceRestoreLock(
        root,
        async () => {
          cancelledTaskRan = true;
        },
        {
          maxWaitDurationMs: 30_000,
          abortSignal: controller.signal,
        }
      );

      controller.abort();
      await expect(cancelled).rejects.toMatchObject({
        normalizedError: {
          code: 'EXECUTION_CANCELLED',
          retryable: false,
        },
      });
      expect(cancelledTaskRan).toBe(false);

      let successorRan = false;
      const successor = withLocalWorkspaceRestoreLock(root, async () => {
        successorRan = true;
        return 'acquired';
      });
      await Promise.resolve();
      expect(successorRan).toBe(false);

      releaseHolder?.();
      await holder;
      await expect(successor).resolves.toBe('acquired');
    } finally {
      releaseHolder?.();
      await holder;
    }
  });

  it('rejects a pre-cancelled lock request without running or blocking later work', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-restore-lock-pre-cancel-'));
    roots.push(root);
    const controller = new AbortController();
    controller.abort();
    let cancelledTaskRan = false;

    await expect(
      withLocalWorkspaceRestoreLock(
        root,
        async () => {
          cancelledTaskRan = true;
        },
        { abortSignal: controller.signal }
      )
    ).rejects.toMatchObject({
      normalizedError: {
        code: 'EXECUTION_CANCELLED',
        retryable: false,
      },
    });
    expect(cancelledTaskRan).toBe(false);
    await expect(withLocalWorkspaceRestoreLock(root, async () => 'acquired')).resolves.toBe(
      'acquired'
    );
  });
});

function journalInput(root: string, label: string): LocalWorkspaceRestoreJournalInput {
  const workspaceName = path.basename(root);
  const stagingName = `.${workspaceName}.restore-${label}`;
  return {
    workspaceName,
    stagingName,
    backupName: `${stagingName}.previous`,
    operationId: `workspace.restore.${label}`,
    snapshotRef: `snapshot.restore.${label}`,
    initialTreeHash: `sha256:initial-${label}`,
    targetTreeHash: `sha256:target-${label}`,
  };
}
