import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  createLocalWorkspaceRestoreJournal,
  readLocalWorkspaceRestoreJournal,
  removeLocalWorkspaceRestoreJournal,
  type LocalWorkspaceRestoreJournalInput,
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
