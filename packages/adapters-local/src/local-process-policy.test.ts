import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type { CommandExecutionRequest, ExecutionEnvironmentSpec } from '@hypha/core';
import { afterEach, describe, expect, it } from 'vitest';
import { LocalProcessPolicyResolver } from './local-process-policy';

const temporaryRoots = new Set<string>();

afterEach(async () => {
  for (const root of temporaryRoots) {
    await fs.rm(root, { recursive: true, force: true, maxRetries: 3, retryDelay: 25 });
    temporaryRoots.delete(root);
    await expect(fs.access(root)).rejects.toMatchObject({ code: 'ENOENT' });
  }
});

describe('LocalProcessPolicyResolver', () => {
  it('resolves only mapped executables, scoped paths, allowlisted environment, and lower limits', async () => {
    const workspace = await temporaryWorkspace();
    await fs.mkdir(path.join(workspace, 'nested'));
    const resolver = createResolver(workspace);
    const resolved = await resolver.resolve(
      environment(),
      command({
        cwd: 'nested',
        env: { HYPHA_ALLOWED: 'visible' },
        timeoutMs: 500,
        maxStdoutBytes: 128,
      })
    );

    expect(resolved).toMatchObject({
      executable: await fs.realpath(process.execPath),
      cwd: await fs.realpath(path.join(workspace, 'nested')),
      environment: { HYPHA_ALLOWED: 'visible' },
      timeoutMs: 500,
      maxStdoutBytes: 128,
    });
    expect(resolved.environment.HYPHA_HIDDEN).toBeUndefined();
    await expect(resolver.assertExecutionSurfaceUnchanged(resolved)).resolves.toBeUndefined();
  });

  it('rejects executable replacement after policy resolution', async () => {
    const workspace = await temporaryWorkspace();
    const executableRoot = await temporaryWorkspace();
    const executable = path.join(
      executableRoot,
      process.platform === 'win32' ? 'node-copy.exe' : 'node-copy'
    );
    await copyExecutable(executable);
    const resolver = createResolver(workspace, executable);
    const resolved = await resolver.resolve(environment(), command());

    await fs.rename(executable, `${executable}.original`);
    await copyExecutable(executable);

    await expect(resolver.assertExecutionSurfaceUnchanged(resolved)).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PATH_DENIED' },
    });
  });

  it('rejects working-directory replacement after policy resolution', async () => {
    const workspace = await temporaryWorkspace();
    const workingDirectory = path.join(workspace, 'nested');
    await fs.mkdir(workingDirectory);
    const resolver = createResolver(workspace);
    const resolved = await resolver.resolve(environment(), command({ cwd: 'nested' }));

    await fs.rename(workingDirectory, `${workingDirectory}.original`);
    await fs.mkdir(workingDirectory);

    await expect(resolver.assertExecutionSurfaceUnchanged(resolved)).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PATH_DENIED' },
    });
  });

  it('enforces the host direct-executable contract without treating Node scripts as executables', async () => {
    const workspace = await temporaryWorkspace();
    const script = path.join(workspace, 'task.js');
    await fs.writeFile(script, 'process.stdout.write("ok");');

    const interpreter = createResolver(workspace);
    await expect(
      interpreter.resolve(environment(), command({ args: [script] }))
    ).resolves.toMatchObject({
      executable: await fs.realpath(process.execPath),
    });

    const directScript = createResolver(workspace, script);
    await expect(directScript.resolve(environment(), command())).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PATH_DENIED' },
    });

    if (process.platform !== 'win32') {
      await fs.chmod(script, 0o700);
      await expect(directScript.resolve(environment(), command())).resolves.toMatchObject({
        executable: await fs.realpath(script),
      });
    } else {
      const comExecutable = path.join(workspace, 'node-copy.COM');
      await copyExecutable(comExecutable);
      await expect(
        createResolver(workspace, comExecutable).resolve(environment(), command())
      ).resolves.toMatchObject({
        executable: await fs.realpath(comExecutable),
      });
    }
  });

  it('rejects mapped directories as direct executables during health checks', async () => {
    const workspace = await temporaryWorkspace();
    const resolver = createResolver(workspace, workspace);

    await expect(resolver.assertSurfaceAvailable()).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PATH_DENIED' },
    });
  });

  it('rejects traversal, absolute outside paths, and symlink escapes', async () => {
    const workspace = await temporaryWorkspace();
    const outside = await temporaryWorkspace();
    const resolver = createResolver(workspace);

    await expect(resolver.resolve(environment(), command({ cwd: '..' }))).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PATH_ESCAPE' },
    });
    await expect(resolver.resolve(environment(), command({ cwd: outside }))).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PATH_ESCAPE' },
    });

    const link = path.join(workspace, 'outside-link');
    try {
      await fs.symlink(outside, link, process.platform === 'win32' ? 'junction' : 'dir');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'EPERM') return;
      throw error;
    }
    await expect(
      resolver.resolve(environment(), command({ cwd: 'outside-link' }))
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_PATH_ESCAPE' } });
  });

  it('rejects denied, malformed, and case-variant environment names at the boundary', async () => {
    const resolver = createResolver(await temporaryWorkspace());
    await expect(
      resolver.resolve(environment(), command({ env: { HYPHA_HIDDEN: 'secret' } }))
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_POLICY_DENIED' } });
    await expect(
      resolver.resolve(environment(), command({ env: { 'HYPHA_ALLOWED\u0000BYPASS': 'value' } }))
    ).rejects.toThrow('is invalid');

    if (process.platform === 'win32') {
      const deniedCaseVariant = environment();
      deniedCaseVariant.process.environmentDenyList = ['hypha_allowed'];
      await expect(
        resolver.resolve(deniedCaseVariant, command({ env: { HYPHA_ALLOWED: 'value' } }))
      ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_POLICY_DENIED' } });
    }
  });

  it('rejects shell, secret, snapshot, and unmapped executable bypasses', async () => {
    const resolver = createResolver(await temporaryWorkspace());
    await expect(resolver.resolve(environment(), command({ shell: true }))).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_POLICY_DENIED' },
    });
    await expect(
      resolver.resolve(environment(), command({ secretRefs: ['secret://denied'] }))
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_SECRET_DENIED' } });
    await expect(
      resolver.resolve(environment(), command({ snapshotBefore: true }))
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_POLICY_DENIED' } });
    await expect(
      resolver.resolve(environment(), command({ executable: 'node\u200b' }))
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_POLICY_DENIED' } });
  });

  it('reports invalid provider environments before execution', async () => {
    const resolver = createResolver(await temporaryWorkspace());
    const invalid = environment();
    invalid.provider = 'docker';
    expect(() => resolver.validateEnvironment(invalid)).toThrow(
      'Local Process provider cannot create docker environments.'
    );
  });
});

async function temporaryWorkspace(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-policy-'));
  temporaryRoots.add(root);
  return root;
}

function createResolver(
  workspaceRoot: string,
  executable = process.execPath
): LocalProcessPolicyResolver {
  return new LocalProcessPolicyResolver({
    workspaceRoot,
    executables: { node: executable },
    baseEnvironment: { HYPHA_ALLOWED: 'base', HYPHA_HIDDEN: 'hidden' },
    maxExecutionTimeoutMs: 1_000,
  });
}

async function copyExecutable(destination: string): Promise<void> {
  await fs.copyFile(process.execPath, destination);
  if (process.platform !== 'win32') await fs.chmod(destination, 0o700);
}

function environment(): ExecutionEnvironmentSpec {
  return {
    id: 'execution-environment.local.safe',
    version: '0.1.0',
    provider: 'local_process',
    process: {
      shellEnabled: false,
      allowedExecutables: ['node'],
      executableResolution: 'path_allowlist',
      allowBackgroundProcesses: false,
      allowDaemonization: false,
      killProcessTreeOnExit: true,
      environmentAllowList: ['HYPHA_ALLOWED'],
      environmentDenyList: ['HYPHA_HIDDEN'],
      inheritHostEnvironment: false,
    },
    resources: {
      maxStdoutBytes: 1_024,
      maxStderrBytes: 1_024,
      maxCombinedOutputBytes: 2_048,
      maxExecutionSeconds: 2,
      maxIdleSeconds: 1,
    },
    filesystem: {
      rootFilesystem: 'writable',
      mounts: [],
      allowDeviceAccess: false,
      allowHostPathMounts: false,
    },
    network: { mode: 'enabled', dnsPolicy: 'system' },
    security: { nonRootRequired: true, noNewPrivileges: true, privileged: false },
    secrets: { injectionMode: 'none', redactFromOutput: true, redactFromEvents: true },
    logging: { captureStdout: true, captureStderr: true },
    lifecycle: { reuse: 'run', cleanupOnSuccess: true, cleanupOnFailure: true },
    workingDirectoryPolicy: 'workspace_only',
    defaultTimeoutMs: 2_000,
  };
}

function command(overrides: Partial<CommandExecutionRequest> = {}): CommandExecutionRequest {
  return {
    operationId: 'operation.local.policy',
    principal: {
      principalId: 'principal.local',
      type: 'user',
      userId: 'user.local',
      permissionScopes: ['execution.run'],
    },
    userId: 'user.local',
    workspaceId: 'workspace.local',
    runId: 'run.local',
    environmentRef: { id: 'execution-environment.local.safe', version: '0.1.0' },
    executable: 'node',
    ...overrides,
  };
}
