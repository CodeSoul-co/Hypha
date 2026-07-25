import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  LocalWorkspaceSnapshotLimitError,
  captureLocalWorkspaceSnapshot,
  diffLocalWorkspaceSnapshots,
} from './local-workspace-mutations';

const detectedAt = '2026-07-17T00:00:00.000Z';

describe('local Workspace mutation capture', () => {
  it('records created, modified, deleted, and renamed files deterministically', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-mutations-'));
    await fs.mkdir(path.join(root, 'nested'));
    await fs.writeFile(path.join(root, 'modified.txt'), 'before');
    await fs.writeFile(path.join(root, 'deleted.txt'), 'delete me');
    await fs.writeFile(path.join(root, 'rename-from.txt'), 'same content');
    const before = await captureLocalWorkspaceSnapshot(root);

    await fs.writeFile(path.join(root, 'modified.txt'), 'after');
    await fs.rm(path.join(root, 'deleted.txt'));
    await fs.rename(path.join(root, 'rename-from.txt'), path.join(root, 'nested', 'rename-to.txt'));
    await fs.writeFile(path.join(root, 'created.txt'), 'new');
    const after = await captureLocalWorkspaceSnapshot(root);

    expect(diffLocalWorkspaceSnapshots(before, after, detectedAt)).toMatchObject([
      { path: 'created.txt', operation: 'created', detectedAt },
      { path: 'deleted.txt', operation: 'deleted', detectedAt },
      { path: 'modified.txt', operation: 'modified', detectedAt },
      {
        path: 'nested/rename-to.txt',
        oldPath: 'rename-from.txt',
        operation: 'renamed',
        detectedAt,
      },
    ]);
  });

  it('hashes symlink targets without following them outside the Workspace', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-symlink-'));
    const outside = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-outside-'));
    await fs.writeFile(path.join(outside, 'secret.txt'), 'outside');
    const link = path.join(root, 'outside-link');
    try {
      await fs.symlink(outside, link, process.platform === 'win32' ? 'junction' : 'dir');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'EPERM') return;
      throw error;
    }

    const snapshot = await captureLocalWorkspaceSnapshot(root);
    expect([...snapshot.entries.values()]).toMatchObject([
      { path: 'outside-link', kind: 'symlink' },
    ]);
    expect(snapshot.entries.has('outside-link/secret.txt')).toBe(false);
  });

  it('fails closed when a mutation scan exceeds configured bounds', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-bounds-'));
    await fs.writeFile(path.join(root, 'one.txt'), 'one');
    await fs.writeFile(path.join(root, 'two.txt'), 'two');

    await expect(captureLocalWorkspaceSnapshot(root, { maxFiles: 1 })).rejects.toBeInstanceOf(
      LocalWorkspaceSnapshotLimitError
    );
    await expect(captureLocalWorkspaceSnapshot(root, { maxBytes: 2 })).rejects.toMatchObject({
      details: { maxBytes: 2 },
    });
  });
});
