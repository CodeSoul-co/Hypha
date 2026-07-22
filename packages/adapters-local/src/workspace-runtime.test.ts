import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { LocalWorkspaceRuntime } from './workspace-runtime';

describe('LocalWorkspaceRuntime execution environment', () => {
  let root: string | undefined;
  const previousEnvironment = new Map<string, string | undefined>();

  afterEach(async () => {
    for (const [name, value] of previousEnvironment) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
    previousEnvironment.clear();
    if (root) await fs.rm(root, { recursive: true, force: true });
    root = undefined;
  });

  it('passes only the minimal allow-list and withholds HOME and credentials', async () => {
    setEnvironment('HOME', 'sensitive-home');
    setEnvironment('USERPROFILE', 'sensitive-profile');
    setEnvironment('USERNAME', 'sensitive-user');
    setEnvironment('USERDOMAIN', 'sensitive-domain');
    setEnvironment('AWS_SECRET_ACCESS_KEY', 'sensitive-credential');
    setEnvironment('HYPHA_PRIVATE_TOKEN', 'sensitive-token');

    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-env-'));
    const executableRoot = path.join(root, 'bin');
    await fs.mkdir(executableRoot, { recursive: true });
    await fs.writeFile(
      path.join(executableRoot, 'environment.js'),
      `process.stdout.write(JSON.stringify({
        path: process.env.PATH ?? null,
        home: process.env.HOME || null,
        userProfile: process.env.USERPROFILE || null,
        userName: process.env.USERNAME || null,
        userDomain: process.env.USERDOMAIN || null,
        awsSecret: process.env.AWS_SECRET_ACCESS_KEY ?? null,
        privateToken: process.env.HYPHA_PRIVATE_TOKEN ?? null
      }));\n`,
      'utf8'
    );
    const runtime = new LocalWorkspaceRuntime({
      workingDirectory: root,
      readPaths: [root],
      writePaths: [root],
      executePaths: [executableRoot],
      execution: { enabled: true, timeoutMs: 2_000, maxOutputBytes: 8_192 },
    });
    await runtime.initialize();

    const result = (await runtime.execute({
      operation: 'execute',
      path: 'bin/environment.js',
    })) as { stdout: string };

    expect(JSON.parse(result.stdout)).toEqual({
      path: process.env.PATH ?? null,
      home: null,
      userProfile: null,
      userName: null,
      userDomain: null,
      awsSecret: null,
      privateToken: null,
    });
  });

  function setEnvironment(name: string, value: string): void {
    previousEnvironment.set(name, process.env[name]);
    process.env[name] = value;
  }
});
