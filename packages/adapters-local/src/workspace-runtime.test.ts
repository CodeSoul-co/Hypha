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

  it('reports the trusted-only boundary and keeps command execution disabled', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-health-'));
    const executableRoot = path.join(root, 'bin');
    await fs.mkdir(executableRoot, { recursive: true });
    await fs.writeFile(path.join(executableRoot, 'command.js'), 'process.stdout.write("run");\n');
    const runtime = createRuntime(root, executableRoot, false);
    await runtime.initialize();

    await expect(runtime.health()).resolves.toMatchObject({
      status: 'healthy',
      message: 'Trusted local Workspace is available; command execution is disabled.',
      details: {
        profile: 'trusted-workspace',
        trustBoundary: 'trusted_local_development_only',
        commandExecution: 'disabled',
        isolation: {
          filesystem: 'path_confinement_only',
          process: false,
          network: false,
          cpu: false,
          memory: false,
          disk: false,
          pids: false,
        },
      },
    });
    await expect(runtime.execute({ operation: 'execute', path: 'bin/command.js' })).rejects.toThrow(
      'Workspace execution is disabled'
    );
  });

  it('does not hide the trusted-only boundary when the Workspace is unavailable', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-unavailable-'));
    const missingWorkingDirectory = path.join(root, 'missing');
    const runtime = createRuntime(missingWorkingDirectory, root, true);

    await expect(runtime.health()).resolves.toMatchObject({
      status: 'unhealthy',
      details: {
        profile: 'trusted-workspace',
        trustBoundary: 'trusted_local_development_only',
        commandExecution: 'explicitly_enabled',
      },
    });
  });

  it('denies framework control-plane, credential, package, and socket paths', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-deny-'));
    const runtime = createRuntime(root, root, false);
    await runtime.initialize();

    for (const protectedPath of [
      '.env',
      '.ssh/id_rsa',
      '.aws/credentials',
      '.config/gcloud/application_default_credentials.json',
      '.hypha/skills/untrusted.md',
      '.npmrc',
      'data/runtime/events/runtime.sqlite',
      'node_modules/package/index.js',
      'var/run/docker.sock',
    ]) {
      await expect(
        runtime.execute({ operation: 'write', path: protectedPath, content: 'secret' })
      ).rejects.toThrow('protected by the control-plane policy');
    }
  });

  it('denies configured control-plane stores even inside a broad write allow-list', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-store-'));
    const eventStore = path.join(root, 'custom-state', 'events.sqlite');
    setEnvironment('HYPHA_RUNTIME_EVENT_DB', eventStore);
    const runtime = createRuntime(root, root, false);
    await runtime.initialize();

    await expect(
      runtime.execute({ operation: 'write', path: eventStore, content: 'tampered' })
    ).rejects.toThrow('protected by the control-plane policy');
  });

  it('rejects encoded, Unicode-confusable, NUL, and portable traversal variants', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-encoding-'));
    const runtime = createRuntime(root, root, false);
    await runtime.initialize();

    const deniedPaths = [
      '%2eenv',
      '%252eenv',
      'safe\\..\\.env',
      '\uff0eenv',
      `safe\u2215..\u2215.env`,
      `safe\0file.txt`,
      '\\\\.\\pipe\\docker_engine',
      '\\\\server\\share\\artifact.txt',
      'C:\\Windows\\System32\\drivers\\etc\\hosts',
    ];
    for (const deniedPath of deniedPaths) {
      await expect(
        runtime.execute({ operation: 'write', path: deniedPath, content: 'denied' })
      ).rejects.toThrow();
    }
  });

  it('filters protected entries while preserving ordinary Workspace access', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-list-'));
    await fs.writeFile(path.join(root, 'result.txt'), 'hypha', 'utf8');
    await fs.writeFile(path.join(root, '.env'), 'TOKEN=secret', 'utf8');
    await fs.mkdir(path.join(root, '.git'));
    const runtime = createRuntime(root, root, false);
    await runtime.initialize();

    await expect(runtime.execute({ operation: 'read', path: 'result.txt' })).resolves.toMatchObject(
      {
        content: 'hypha',
      }
    );
    const result = (await runtime.execute({ operation: 'list', path: '.' })) as {
      entries: Array<{ name: string }>;
    };
    expect(result.entries.map((entry) => entry.name)).toEqual(['result.txt']);
    await expect(runtime.execute({ operation: 'read', path: '.env' })).rejects.toThrow(
      'protected by the control-plane policy'
    );
  });

  it('rejects writes through a directory link that escapes the write root', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-link-'));
    const workspaceRoot = path.join(root, 'workspace');
    const outsideRoot = path.join(root, 'outside');
    await Promise.all([
      fs.mkdir(workspaceRoot, { recursive: true }),
      fs.mkdir(outsideRoot, { recursive: true }),
    ]);
    await fs.symlink(
      outsideRoot,
      path.join(workspaceRoot, 'redirect'),
      process.platform === 'win32' ? 'junction' : 'dir'
    );
    const runtime = createRuntime(workspaceRoot, workspaceRoot, false);
    await runtime.initialize();

    await expect(
      runtime.execute({ operation: 'write', path: 'redirect/escaped.txt', content: 'denied' })
    ).rejects.toThrow('outside configured write paths');
  });

  function setEnvironment(name: string, value: string): void {
    previousEnvironment.set(name, process.env[name]);
    process.env[name] = value;
  }

  function createRuntime(
    workingDirectory: string,
    executableRoot: string,
    executionEnabled: boolean
  ): LocalWorkspaceRuntime {
    return new LocalWorkspaceRuntime({
      workingDirectory,
      readPaths: [workingDirectory],
      writePaths: [workingDirectory],
      executePaths: [executableRoot],
      execution: { enabled: executionEnabled, timeoutMs: 2_000, maxOutputBytes: 8_192 },
    });
  }
});
