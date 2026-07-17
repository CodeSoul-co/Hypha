import fs from 'fs/promises';
import fsSync from 'fs';
import os from 'os';
import path from 'path';
import { LocalWorkspaceRuntime } from '@hypha/adapters-local';
import FilesystemTool, { type FilesystemToolConfig } from './FilesystemTool';

describe('FilesystemTool', () => {
  let root: string;
  let outsideRoot: string;
  let tool: FilesystemTool;

  beforeEach(async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-filesystem-'));
    outsideRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-filesystem-outside-'));
    const config: FilesystemToolConfig = {
      workingDirectory: root,
      readPaths: [root],
      writePaths: [path.join(root, 'workspace')],
      executePaths: [path.join(root, 'workspace', 'bin')],
      execution: {
        enabled: true,
        timeoutMs: 2000,
        maxOutputBytes: 8192,
      },
    };
    const workspace = new LocalWorkspaceRuntime(config);
    await workspace.initialize();
    tool = new FilesystemTool(workspace, config);
  });

  it('keeps process and filesystem implementations outside the Tool handler', () => {
    const source = fsSync.readFileSync(path.join(__dirname, 'FilesystemTool.ts'), 'utf-8');
    expect(source).not.toMatch(/child_process|fs\/promises|from ['"]fs['"]/);
    expect(source).toContain('WorkspaceRuntimePort');
  });

  afterEach(async () => {
    await Promise.all([
      fs.rm(root, { recursive: true, force: true }),
      fs.rm(outsideRoot, { recursive: true, force: true }),
    ]);
  });

  it('writes and reads only inside configured paths', async () => {
    const write = await tool.execute({
      operation: 'write',
      path: 'workspace/result.txt',
      content: 'hypha',
    });
    const read = await tool.execute({ operation: 'read', path: 'workspace/result.txt' });
    const denied = await tool.execute({
      operation: 'write',
      path: path.join(outsideRoot, 'result.txt'),
      content: 'denied',
    });

    expect(write).toMatchObject({ success: true, output: { bytesWritten: 5 } });
    expect(read).toMatchObject({ success: true, output: { content: 'hypha' } });
    expect(denied).toMatchObject({ success: false });
    expect(denied.error).toContain('outside configured write paths');
  });

  it('writes executable files and runs them without shell argument expansion', async () => {
    const write = await tool.execute({
      operation: 'write',
      path: 'workspace/bin/print-arg.js',
      content: 'process.stdout.write(process.argv[2]);\n',
      executable: true,
    });
    const execute = await tool.execute({
      operation: 'execute',
      path: 'workspace/bin/print-arg.js',
      args: ['hypha; echo unsafe'],
      cwd: 'workspace',
    });

    expect(write).toMatchObject({ success: true, output: { executable: true } });
    expect(execute).toMatchObject({
      success: true,
      output: { stdout: 'hypha; echo unsafe', stderr: '', exitCode: 0 },
    });
  });

  it('rejects symlinks that escape configured read paths', async () => {
    const outsideFile = path.join(outsideRoot, 'secret.txt');
    await fs.writeFile(outsideFile, 'secret', 'utf-8');
    await fs.symlink(
      outsideRoot,
      path.join(root, 'escape'),
      process.platform === 'win32' ? 'junction' : 'dir'
    );

    const result = await tool.execute({ operation: 'read', path: 'escape/secret.txt' });

    expect(result).toMatchObject({ success: false });
    expect(result.error).toContain('outside configured read paths');
  });

  it('requires executable writes to be inside the execute allowlist', async () => {
    const result = await tool.execute({
      operation: 'write',
      path: 'workspace/not-executable.sh',
      content: '#!/bin/sh\nexit 0\n',
      executable: true,
    });

    expect(result).toMatchObject({ success: false });
    expect(result.error).toContain('outside configured execute paths');
  });
});
