import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { LocalWorkspaceAdapter } from './local-workspace-adapter';

describe('LocalWorkspaceAdapter', () => {
  it('captures and diffs governed Workspace mutations', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-workspace-adapter-'));
    const adapter = new LocalWorkspaceAdapter({ workspaceRoot: root });
    await adapter.assertAvailable();
    const before = await adapter.capture();
    await fs.writeFile(path.join(root, 'result.txt'), 'result');
    const after = await adapter.capture();

    expect(adapter.diff(before, after, '2026-07-17T00:00:00.000Z')).toMatchObject([
      { path: 'result.txt', operation: 'created' },
    ]);
  });

  it('normalizes scan limits as execution resource failures', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-workspace-limit-'));
    await fs.writeFile(path.join(root, 'too-large.txt'), 'too large');
    const adapter = new LocalWorkspaceAdapter({ workspaceRoot: root, maxTrackedBytes: 1 });

    await expect(adapter.capture()).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_RESOURCE_EXCEEDED' },
    });
  });

  it('rejects a non-directory Workspace surface', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-workspace-file-'));
    const file = path.join(root, 'file.txt');
    await fs.writeFile(file, 'not a root');

    await expect(
      new LocalWorkspaceAdapter({ workspaceRoot: file }).assertAvailable()
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_WORKSPACE_NOT_FOUND' },
    });
  });
});
