import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { DockerWorkspaceMountResolver, validateContainerPath } from './docker-workspace-mount';

const temporaryRoots: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((root) => fs.rm(root, { recursive: true, force: true }))
  );
});

describe('DockerWorkspaceMountResolver', () => {
  it('resolves one exact real Workspace mount and a scoped container cwd', async () => {
    const root = await temporaryDirectory();
    const resolver = new DockerWorkspaceMountResolver({ workspaceRoot: root });

    await expect(resolver.resolve(false)).resolves.toEqual({
      source: await fs.realpath(root),
      target: '/workspace',
      readOnly: false,
    });
    expect(resolver.resolveWorkingDirectory()).toBe('/workspace');
    expect(resolver.resolveWorkingDirectory('nested/path')).toBe('/workspace/nested/path');
    expect(resolver.resolveWorkingDirectory('nested\\path')).toBe('/workspace/nested/path');
  });

  it('resolves a symlinked configured root before returning mount evidence', async () => {
    const root = await temporaryDirectory();
    const actual = path.join(root, 'actual');
    const link = path.join(root, 'link');
    await fs.mkdir(actual);
    await fs.symlink(actual, link, process.platform === 'win32' ? 'junction' : 'dir');

    const mount = await new DockerWorkspaceMountResolver({ workspaceRoot: link }).resolve(true);

    expect(mount).toEqual({
      source: await fs.realpath(actual),
      target: '/workspace',
      readOnly: true,
    });
  });

  it.each(['../outside', '..\\outside', '/etc', '\\etc', 'nested/../../outside'])(
    'rejects traversal or absolute-path escape: %s',
    async (requested) => {
      const resolver = new DockerWorkspaceMountResolver({
        workspaceRoot: await temporaryDirectory(),
      });
      expect(() => resolver.resolveWorkingDirectory(requested)).toThrow('escapes the Workspace');
    }
  );

  it('rejects NUL and malformed container path inputs', async () => {
    const resolver = new DockerWorkspaceMountResolver({
      workspaceRoot: await temporaryDirectory(),
    });

    expect(() => resolver.resolveWorkingDirectory('bad\u0000path')).toThrow('NUL byte');
    expect(() => validateContainerPath('/', 'root')).toThrow('cannot be the container root');
    expect(() => validateContainerPath('/workspace/../escape', 'root')).toThrow(
      'must be normalized'
    );
    expect(() => validateContainerPath('/workspace,other', 'root')).toThrow('without commas');
  });

  it('rejects a missing Workspace and non-directory Workspace', async () => {
    const root = await temporaryDirectory();
    const file = path.join(root, 'file.txt');
    await fs.writeFile(file, 'content');

    await expect(
      new DockerWorkspaceMountResolver({ workspaceRoot: path.join(root, 'missing') }).resolve(false)
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_WORKSPACE_NOT_FOUND' },
    });
    await expect(
      new DockerWorkspaceMountResolver({ workspaceRoot: file }).resolve(false)
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_WORKSPACE_NOT_FOUND' },
    });
  });

  it('rejects host root and Docker socket mounts before Docker execution', () => {
    expect(
      () => new DockerWorkspaceMountResolver({ workspaceRoot: path.parse(process.cwd()).root })
    ).toThrow('cannot expose a sensitive host path or Docker socket');
    expect(
      () => new DockerWorkspaceMountResolver({ workspaceRoot: '/var/run/docker.sock' })
    ).toThrow('cannot expose a sensitive host path or Docker socket');
  });

  it('rejects non-boolean mount access at the runtime boundary', async () => {
    const resolver = new DockerWorkspaceMountResolver({
      workspaceRoot: await temporaryDirectory(),
    });

    await expect(resolver.resolve('false' as unknown as boolean)).rejects.toThrow(
      'readOnly must be a boolean'
    );
  });
});

async function temporaryDirectory(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-docker-workspace-'));
  temporaryRoots.push(root);
  return root;
}
