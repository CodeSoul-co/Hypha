import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { DockerWorkspaceMountResolver } from './docker-workspace-mount';

describe('DockerWorkspaceMountResolver', () => {
  it('resolves one exact Workspace mount and scoped container cwd', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-docker-workspace-'));
    const resolver = new DockerWorkspaceMountResolver({ workspaceRoot: root });
    await expect(resolver.resolve(false)).resolves.toEqual({
      source: await fs.realpath(root),
      target: '/workspace',
      readOnly: false,
    });
    expect(resolver.resolveWorkingDirectory('nested/path')).toBe('/workspace/nested/path');
  });

  it('rejects traversal and separator-encoding bypasses', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-docker-workspace-'));
    const resolver = new DockerWorkspaceMountResolver({ workspaceRoot: root });
    expect(() => resolver.resolveWorkingDirectory('../outside')).toThrow('escapes the Workspace');
    expect(() => resolver.resolveWorkingDirectory('..\\outside')).toThrow('escapes the Workspace');
    expect(() => resolver.resolveWorkingDirectory('bad\u0000path')).toThrow('NUL byte');
  });

  it('rejects host root and Docker socket mounts', () => {
    expect(
      () => new DockerWorkspaceMountResolver({ workspaceRoot: path.parse(process.cwd()).root })
    ).toThrow('cannot expose a host root or Docker socket');
    expect(
      () => new DockerWorkspaceMountResolver({ workspaceRoot: '/var/run/docker.sock' })
    ).toThrow('cannot expose a host root or Docker socket');
  });
});
