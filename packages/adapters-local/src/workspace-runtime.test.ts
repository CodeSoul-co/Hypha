import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
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
    const executablePath = path.join(executableRoot, 'environment.js');
    await fs.writeFile(
      executablePath,
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
    if (process.platform !== 'win32') await fs.chmod(executablePath, 0o700);
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

  it.skipIf(process.platform === 'win32')(
    'requires execute permission before interpreting a JavaScript file with Node',
    async () => {
      root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-x-ok-'));
      const executableRoot = path.join(root, 'bin');
      const executablePath = path.join(executableRoot, 'command.js');
      await fs.mkdir(executableRoot, { recursive: true });
      await fs.writeFile(executablePath, 'process.stdout.write("run");\n', { mode: 0o600 });
      await fs.chmod(executablePath, 0o600);
      const runtime = createRuntime(root, executableRoot, true);
      await runtime.initialize();

      await expect(
        runtime.execute({ operation: 'execute', path: 'bin/command.js' })
      ).rejects.toThrow(/EACCES|permission denied/u);
    }
  );

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

  it('rejects a Workspace root that contains a configured control-plane store', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-store-'));
    const eventStore = path.join(root, 'custom-state', 'events.sqlite');
    setEnvironment('HYPHA_RUNTIME_EVENT_DB', eventStore);
    const runtime = createRuntime(root, root, false);

    await expect(runtime.initialize()).rejects.toThrow(
      'Workspace root overlaps the framework control-plane'
    );
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
      'safe//file.txt',
      'safe/./file.txt',
      'safe./file.txt',
      'safe /file.txt',
      'CON',
      'nul.txt',
      'file.txt:alternate',
      '\\\\.\\pipe\\docker_engine',
      '\\\\server\\share\\artifact.txt',
      'C:\\Windows\\System32\\drivers\\etc\\hosts',
    ];
    for (const deniedPath of deniedPaths) {
      await expect(
        runtime.execute({ operation: 'write', path: deniedPath, content: 'denied' })
      ).rejects.toThrow();
    }
    await expect(
      runtime.execute({ operation: 'write', path: '.', content: 'denied' })
    ).rejects.toThrow('Workspace root marker is only valid for list operations');
  });

  it('rejects a Workspace root that contains protected host or framework paths', async () => {
    const filesystemRoot = path.parse(process.cwd()).root;
    const runtime = createRuntime(filesystemRoot, filesystemRoot, false);

    await expect(runtime.initialize()).rejects.toThrow(
      'Workspace root overlaps the framework control-plane'
    );
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

  it('rejects a list source replaced with another directory during traversal', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-list-replace-'));
    const listing = path.join(root, 'listing');
    const displaced = path.join(root, 'displaced-listing');
    await fs.mkdir(listing);
    await fs.writeFile(path.join(listing, 'original.txt'), 'trusted', 'utf8');
    const runtime = createRuntime(root, root, false);
    await runtime.initialize();

    const originalReaddir = fs.readdir.bind(fs);
    let replaced = false;
    const readdirAfterReplacement = async () => {
      if (!replaced) {
        await fs.rename(listing, displaced);
        await fs.mkdir(listing);
        await fs.writeFile(path.join(listing, 'forged.txt'), 'forged', 'utf8');
        replaced = true;
      }
      return originalReaddir(listing, { withFileTypes: true });
    };
    const readdirSpy = vi
      .spyOn(fs, 'readdir')
      .mockImplementation(readdirAfterReplacement as unknown as typeof fs.readdir);
    try {
      await expect(runtime.execute({ operation: 'list', path: 'listing' })).rejects.toThrow(
        'Workspace directory changed during list'
      );
      expect(replaced).toBe(true);
    } finally {
      readdirSpy.mockRestore();
    }
  });

  it('rejects entries added between two directory traversal snapshots', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-list-mutation-'));
    const listing = path.join(root, 'listing');
    await fs.mkdir(listing);
    await fs.writeFile(path.join(listing, 'first.txt'), 'first', 'utf8');
    const runtime = createRuntime(root, root, false);
    await runtime.initialize();

    const originalReaddir = fs.readdir.bind(fs);
    let calls = 0;
    const readdirWithMutation = async () => {
      const entries = await originalReaddir(listing, { withFileTypes: true });
      calls += 1;
      if (calls === 1) {
        await fs.writeFile(path.join(listing, 'second.txt'), 'second', 'utf8');
      }
      return entries;
    };
    const readdirSpy = vi
      .spyOn(fs, 'readdir')
      .mockImplementation(readdirWithMutation as unknown as typeof fs.readdir);
    try {
      await expect(runtime.execute({ operation: 'list', path: 'listing' })).rejects.toThrow(
        'Workspace directory changed during list'
      );
      expect(calls).toBe(2);
    } finally {
      readdirSpy.mockRestore();
    }
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
    ).rejects.toThrow('cannot traverse symbolic links or junctions');
  });

  it('rejects reads and writes through a directory link whose target remains inside the root', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-inner-link-'));
    const workspaceRoot = path.join(root, 'workspace');
    const targetRoot = path.join(workspaceRoot, 'target');
    await fs.mkdir(targetRoot, { recursive: true });
    await fs.writeFile(path.join(targetRoot, 'result.txt'), 'original', 'utf8');
    await fs.symlink(
      targetRoot,
      path.join(workspaceRoot, 'redirect'),
      process.platform === 'win32' ? 'junction' : 'dir'
    );
    const runtime = createRuntime(workspaceRoot, workspaceRoot, false);
    await runtime.initialize();

    await expect(
      runtime.execute({ operation: 'read', path: 'redirect/result.txt' })
    ).rejects.toThrow('cannot traverse symbolic links or junctions');
    await expect(
      runtime.execute({ operation: 'write', path: 'redirect/result.txt', content: 'denied' })
    ).rejects.toThrow('cannot traverse symbolic links or junctions');
    await expect(fs.readFile(path.join(targetRoot, 'result.txt'), 'utf8')).resolves.toBe(
      'original'
    );
  });

  it('rejects a source file replaced with a new inode between validation and open', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-read-race-'));
    const source = path.join(root, 'result.txt');
    await fs.writeFile(source, 'trusted', 'utf8');
    const runtime = createRuntime(root, root, false);
    await runtime.initialize();

    const originalOpen = fs.open.bind(fs);
    let replaced = false;
    const openReplacement = async () => {
      await fs.rename(source, path.join(root as string, 'original.txt'));
      await fs.writeFile(source, 'forged!', 'utf8');
      replaced = true;
      return originalOpen(source, 'r');
    };
    const openSpy = vi
      .spyOn(fs, 'open')
      .mockImplementation(openReplacement as unknown as typeof fs.open);
    try {
      await expect(runtime.execute({ operation: 'read', path: 'result.txt' })).rejects.toThrow(
        'Workspace source changed during read'
      );
      expect(replaced).toBe(true);
    } finally {
      openSpy.mockRestore();
    }
  });

  it('rejects a source file modified through its path while the handle is being read', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-read-mutation-'));
    const source = path.join(root, 'result.txt');
    await fs.writeFile(source, 'trusted', 'utf8');
    const runtime = createRuntime(root, root, false);
    await runtime.initialize();

    const originalOpen = fs.open.bind(fs);
    const openWithMutation = async () => {
      const handle = await originalOpen(source, 'r');
      const originalReadFile = handle.readFile.bind(handle);
      const readWithMutation = async () => {
        const content = await originalReadFile({ encoding: 'utf-8' });
        await fs.writeFile(source, 'mutated', 'utf8');
        return content;
      };
      vi.spyOn(handle, 'readFile').mockImplementation(
        readWithMutation as unknown as typeof handle.readFile
      );
      return handle;
    };
    const openSpy = vi
      .spyOn(fs, 'open')
      .mockImplementation(openWithMutation as unknown as typeof fs.open);
    try {
      await expect(runtime.execute({ operation: 'read', path: 'result.txt' })).rejects.toThrow(
        'Workspace source changed during read'
      );
    } finally {
      openSpy.mockRestore();
    }
  });

  it('rejects Workspace read sources that have a hardlink alias', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-hardlink-'));
    const source = path.join(root, 'result.txt');
    await fs.writeFile(source, 'trusted', 'utf8');
    await fs.link(source, path.join(root, 'alias.txt'));
    const runtime = createRuntime(root, root, false);
    await runtime.initialize();

    await expect(runtime.execute({ operation: 'read', path: 'result.txt' })).rejects.toThrow(
      'Workspace read source must be a single-link regular file'
    );
  });

  it('publishes Workspace writes atomically without leaving temporary files', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-atomic-write-'));
    const runtime = createRuntime(root, root, false);
    await runtime.initialize();

    await expect(
      runtime.execute({ operation: 'write', path: 'nested/result.txt', content: 'first' })
    ).resolves.toMatchObject({ bytesWritten: 5 });
    await expect(
      runtime.execute({ operation: 'write', path: 'nested/result.txt', content: 'second' })
    ).resolves.toMatchObject({ bytesWritten: 6 });

    await expect(fs.readFile(path.join(root, 'nested', 'result.txt'), 'utf8')).resolves.toBe(
      'second'
    );
    await expect(fs.readdir(path.join(root, 'nested'))).resolves.toEqual(['result.txt']);
  });

  it('fails closed and removes its temporary file when the write parent is replaced', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-write-race-'));
    const workspaceRoot = path.join(root, 'workspace');
    const parent = path.join(workspaceRoot, 'output');
    const displacedParent = path.join(workspaceRoot, 'displaced-output');
    const outsideRoot = path.join(root, 'outside');
    await Promise.all([
      fs.mkdir(parent, { recursive: true }),
      fs.mkdir(outsideRoot, { recursive: true }),
    ]);
    const runtime = createRuntime(workspaceRoot, workspaceRoot, false);
    await runtime.initialize();

    const originalOpen = fs.open.bind(fs);
    let replaced = false;
    const openAfterParentReplacement = async (filename: string) => {
      await fs.rename(parent, displacedParent);
      await fs.symlink(outsideRoot, parent, process.platform === 'win32' ? 'junction' : 'dir');
      replaced = true;
      return originalOpen(filename, 'wx', 0o600);
    };
    const openSpy = vi
      .spyOn(fs, 'open')
      .mockImplementation(openAfterParentReplacement as unknown as typeof fs.open);
    try {
      await expect(
        runtime.execute({ operation: 'write', path: 'output/result.txt', content: 'denied' })
      ).rejects.toThrow('Workspace write parent');
      expect(replaced).toBe(true);
      await expect(fs.readdir(outsideRoot)).resolves.toEqual([]);
      await expect(fs.readdir(displacedParent)).resolves.toEqual([]);
    } finally {
      openSpy.mockRestore();
    }
  });

  it('rejects a final write target replaced immediately after atomic publish', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-workspace-runtime-publish-race-'));
    const target = path.join(root, 'result.txt');
    const displacedTarget = path.join(root, 'published-original.txt');
    const runtime = createRuntime(root, root, false);
    await runtime.initialize();

    const originalRename = fs.rename.bind(fs);
    let replaced = false;
    const renameThenReplace = async (source: string, destination: string) => {
      await originalRename(source, destination);
      await originalRename(destination, displacedTarget);
      await fs.writeFile(destination, 'forged!', 'utf8');
      replaced = true;
    };
    const renameSpy = vi
      .spyOn(fs, 'rename')
      .mockImplementation(renameThenReplace as unknown as typeof fs.rename);
    try {
      await expect(
        runtime.execute({ operation: 'write', path: 'result.txt', content: 'trusted' })
      ).rejects.toThrow('Workspace write target changed during publish');
      expect(replaced).toBe(true);
      await expect(fs.readFile(target, 'utf8')).resolves.toBe('forged!');
      await expect(fs.readFile(displacedTarget, 'utf8')).resolves.toBe('trusted');
    } finally {
      renameSpy.mockRestore();
    }
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
