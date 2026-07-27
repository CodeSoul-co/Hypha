import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { LocalWorkspaceAdapter } from './local-workspace-adapter';
import { workspaceRestoreJournalPath } from './local-workspace-restore-journal';
import { recoverInterruptedLocalWorkspaceRestore } from './local-workspace-snapshot-restore';

describe('Local Workspace restore process crash recovery', () => {
  const roots: string[] = [];
  const children = new Set<ChildProcessWithoutNullStreams>();

  afterEach(async () => {
    for (const child of children) child.kill('SIGKILL');
    children.clear();
    await Promise.all(roots.splice(0).map(cleanupWorkspaceRoot));
  });

  it('rolls back from disk after the process is killed with the original tree moved', async () => {
    const fixture = await createCrashFixture('after-backup');

    await runUntilCrashPoint(fixture.instructionPath, children);

    await expect(fs.access(fixture.root)).rejects.toMatchObject({ code: 'ENOENT' });
    await expect(
      recoverInterruptedLocalWorkspaceRestore(fixture.root, () => fixture.workspace.capture())
    ).resolves.toBe('rolled_back');
    await expect(fs.readFile(path.join(fixture.root, 'result.txt'), 'utf8')).resolves.toBe(
      'current'
    );
    await expect(fs.access(workspaceRestoreJournalPath(fixture.root))).rejects.toMatchObject({
      code: 'ENOENT',
    });
  });

  it('finalizes from disk after the process is killed with the target tree installed', async () => {
    const fixture = await createCrashFixture('after-swap');

    await runUntilCrashPoint(fixture.instructionPath, children);

    await expect(
      recoverInterruptedLocalWorkspaceRestore(fixture.root, () => fixture.workspace.capture())
    ).resolves.toBe('finalized');
    await expect(fs.readFile(path.join(fixture.root, 'result.txt'), 'utf8')).resolves.toBe(
      'snapshot'
    );
    await expect(fs.access(fixture.backupPath)).rejects.toMatchObject({ code: 'ENOENT' });
    await expect(fs.access(workspaceRestoreJournalPath(fixture.root))).rejects.toMatchObject({
      code: 'ENOENT',
    });
  });

  async function createCrashFixture(label: string) {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), `hypha-restore-crash-${label}-`));
    roots.push(root);
    await fs.writeFile(path.join(root, 'result.txt'), 'current');
    const workspace = new LocalWorkspaceAdapter({ workspaceRoot: root });
    const initial = await workspace.capture();
    const stagingPath = await fs.mkdtemp(
      path.join(path.dirname(root), `.${path.basename(root)}.restore-`)
    );
    await fs.writeFile(path.join(stagingPath, 'result.txt'), 'snapshot');
    const target = await new LocalWorkspaceAdapter({ workspaceRoot: stagingPath }).capture();
    const backupPath = `${stagingPath}.previous`;
    const instructionPath = path.join(
      path.dirname(root),
      `.${path.basename(root)}.restore-crash-instruction.json`
    );
    await fs.writeFile(
      instructionPath,
      JSON.stringify({
        workspaceRoot: root,
        stagingPath,
        backupPath,
        operationId: `workspace.restore.crash.${label}`,
        snapshotRef: `snapshot.crash.${label}`,
        initialTreeHash: initial.sourceTreeHash,
        targetTreeHash: target.sourceTreeHash,
        crashPoint: label === 'after-swap' ? 'after_swap' : 'after_backup',
      }),
      'utf8'
    );
    return { root, workspace, stagingPath, backupPath, instructionPath };
  }
});

async function runUntilCrashPoint(
  instructionPath: string,
  children: Set<ChildProcessWithoutNullStreams>
): Promise<void> {
  const fixturePath = path.resolve(
    process.cwd(),
    'packages/adapters-local/fixtures/workspace-restore-crash.cjs'
  );
  const child = spawn(process.execPath, [fixturePath, instructionPath], {
    stdio: ['pipe', 'pipe', 'pipe'],
    windowsHide: true,
  });
  children.add(child);
  let stdout = '';
  let stderr = '';
  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');
  child.stdout.on('data', (chunk: string) => {
    stdout += chunk;
  });
  child.stderr.on('data', (chunk: string) => {
    stderr += chunk;
  });

  await waitForCrashPoint(
    child,
    () => stdout,
    () => stderr
  );
  const exited = new Promise<{ code: number | null; signal: NodeJS.Signals | null }>((resolve) => {
    child.once('exit', (code, signal) => resolve({ code, signal }));
  });
  expect(child.kill('SIGKILL')).toBe(true);
  const exit = await exited;
  expect(exit.code === 0 && exit.signal === null).toBe(false);
  children.delete(child);
}

async function waitForCrashPoint(
  child: ChildProcessWithoutNullStreams,
  stdout: () => string,
  stderr: () => string
): Promise<void> {
  const deadline = Date.now() + 10_000;
  while (!stdout().includes('RESTORE_CRASH_POINT_READY')) {
    if (child.exitCode !== null) {
      throw new Error(`Restore crash fixture exited before its crash point: ${stderr()}`);
    }
    if (Date.now() >= deadline) {
      throw new Error(`Timed out waiting for restore crash fixture: ${stderr()}`);
    }
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 10);
    });
  }
}

async function cleanupWorkspaceRoot(root: string): Promise<void> {
  await fs.rm(root, { recursive: true, force: true });
  const parent = path.dirname(root);
  const prefix = `.${path.basename(root)}.restore-`;
  const candidates = await fs.readdir(parent);
  await Promise.all(
    candidates
      .filter(
        (candidate) =>
          candidate.startsWith(prefix) ||
          candidate === `.${path.basename(root)}.restore-crash-instruction.json`
      )
      .map((candidate) => fs.rm(path.join(parent, candidate), { recursive: true, force: true }))
  );
}
