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
    const [entry] = [...snapshot.entries.values()];
    expect(entry).toMatchObject({ path: 'outside-link', kind: 'symlink' });
    expect(entry?.symlinkTarget).toBeUndefined();
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

  it('counts directories toward the bounded snapshot entry budget', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-directory-bounds-'));
    await fs.mkdir(path.join(root, 'one'));
    await fs.mkdir(path.join(root, 'two'));

    await expect(captureLocalWorkspaceSnapshot(root, { maxFiles: 1 })).rejects.toBeInstanceOf(
      LocalWorkspaceSnapshotLimitError
    );
  });

  it('produces a deterministic tree hash that includes empty directories', async () => {
    const firstRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-tree-first-'));
    const secondRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-tree-second-'));
    for (const root of [firstRoot, secondRoot]) {
      await fs.mkdir(path.join(root, 'empty'));
      await fs.writeFile(path.join(root, 'result.txt'), 'same');
    }

    const first = await captureLocalWorkspaceSnapshot(firstRoot);
    const repeated = await captureLocalWorkspaceSnapshot(firstRoot);
    const equivalent = await captureLocalWorkspaceSnapshot(secondRoot);

    expect(first.sourceTreeHash).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(repeated.sourceTreeHash).toBe(first.sourceTreeHash);
    expect(equivalent.sourceTreeHash).toBe(first.sourceTreeHash);
    expect([...first.directories.values()]).toEqual([expect.objectContaining({ path: 'empty' })]);

    await fs.mkdir(path.join(firstRoot, 'another-empty'));
    const changed = await captureLocalWorkspaceSnapshot(firstRoot);
    expect(changed.sourceTreeHash).not.toBe(first.sourceTreeHash);
  });

  it('changes the tree hash when file bytes change', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-tree-content-'));
    await fs.writeFile(path.join(root, 'result.txt'), 'before');
    const before = await captureLocalWorkspaceSnapshot(root);

    await fs.writeFile(path.join(root, 'result.txt'), 'after');
    const after = await captureLocalWorkspaceSnapshot(root);

    expect(after.sourceTreeHash).not.toBe(before.sourceTreeHash);
  });

  it('fails closed instead of capturing protected control-plane entries', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-control-plane-'));
    await fs.mkdir(path.join(root, '.hypha'));
    await fs.writeFile(path.join(root, '.hypha', 'runtime.sqlite'), 'protected');
    await fs.writeFile(path.join(root, 'result.txt'), 'ordinary');

    await expect(captureLocalWorkspaceSnapshot(root)).rejects.toThrow(
      'protected by the control-plane policy'
    );
  });

  it('rejects a Workspace root that contains a configured control-plane store', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-overlap-'));
    const controlPlaneStore = path.join(root, 'state', 'runtime.sqlite');
    const previousStore = process.env.HYPHA_RUNTIME_EVENT_DB;
    await fs.mkdir(path.dirname(controlPlaneStore));
    await fs.writeFile(controlPlaneStore, 'protected');
    process.env.HYPHA_RUNTIME_EVENT_DB = controlPlaneStore;

    try {
      await expect(captureLocalWorkspaceSnapshot(root)).rejects.toThrow(
        'Workspace root overlaps the framework control-plane'
      );
    } finally {
      if (previousStore === undefined) delete process.env.HYPHA_RUNTIME_EVENT_DB;
      else process.env.HYPHA_RUNTIME_EVENT_DB = previousStore;
    }
  });
});
