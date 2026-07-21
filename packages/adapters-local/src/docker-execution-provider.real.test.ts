import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type {
  CommandExecutionRequest,
  ExecutionEnvironmentSpec,
  SandboxCreateRequest,
} from '@hypha/core';
import { afterAll, afterEach, describe, expect, it } from 'vitest';
import { DockerCliTransport } from './docker-cli-transport';
import { DockerEngineCliClient } from './docker-engine-client';
import { DockerExecutionProvider } from './docker-execution-provider';

const runRealDocker = process.env.HYPHA_REAL_DOCKER === '1';
const dockerPath = process.env.HYPHA_REAL_DOCKER_PATH ?? 'docker';
const image = process.env.HYPHA_REAL_DOCKER_IMAGE ?? 'redis:latest';
const digest =
  process.env.HYPHA_REAL_DOCKER_DIGEST ??
  'sha256:77cb4599f0121142e25139cea1aafaf45fe765c74a0a41b38f4a4ea9fc8cb846';
const principal = {
  principalId: 'principal.docker.real',
  type: 'user' as const,
  userId: 'user.docker.real',
  permissionScopes: ['execution.run'],
};
const temporaryWorkspaces: string[] = [];
const activeProviders: DockerExecutionProvider[] = [];

afterEach(async () => {
  await Promise.all(activeProviders.splice(0).map((provider) => provider.close()));
});

afterAll(async () => {
  await Promise.all(
    temporaryWorkspaces.splice(0).map((root) => fs.rm(root, { recursive: true, force: true }))
  );
});

describe.skipIf(!runRealDocker)('DockerExecutionProvider real daemon', () => {
  it('attests hardened container configuration, non-root identity, and immutable image evidence', async () => {
    const workspace = await temporaryWorkspace('security');
    const engine = realEngine();
    const provider = trackedProvider({ workspaceRoot: workspace, engine });
    await expect(provider.health()).resolves.toMatchObject({
      status: 'healthy',
      details: { processTreeKillScope: 'container' },
    });
    const ready = await createReady(provider, 'security', ['perl']);
    try {
      const raw = await inspectRawContainer(ready.providerSandboxRef!);
      const config = raw.Config as Record<string, unknown>;
      const hostConfig = raw.HostConfig as Record<string, unknown>;
      const mounts = raw.Mounts as Array<Record<string, unknown>>;
      const state = raw.State as Record<string, unknown>;
      const inspectedImage = await engine.inspectImage(image);

      expect(config.User).toBe('999:999');
      expect(hostConfig).toMatchObject({
        ReadonlyRootfs: true,
        NetworkMode: 'none',
        NanoCpus: 500_000_000,
        Memory: 128 * 1024 * 1024,
        PidsLimit: 64,
      });
      expect(hostConfig.CapDrop).toEqual(['ALL']);
      expect(hostConfig.SecurityOpt).toContain('no-new-privileges=true');
      expect(hostConfig.PidMode).not.toBe('host');
      expect(mounts).toHaveLength(1);
      expect(mounts[0]).toMatchObject({ Type: 'bind', Destination: '/workspace', RW: true });
      expect(raw.Image).toBe(inspectedImage.id);

      const hostPid = state.Pid;
      expect(hostPid).toEqual(expect.any(Number));
      const result = await provider.execute(
        command(ready.id, 'security', 'perl', [
          '-e',
          'print "$<\\n"; exit(kill(0, $ARGV[0]) ? 23 : 0);',
          String(hostPid),
        ])
      );
      expect(result).toMatchObject({
        status: 'completed',
        stdout: '999\n',
        externalReceipt: {
          providerExecutionRef: ready.providerSandboxRef,
          metadata: { imageDigest: inspectedImage.id },
        },
      });
      const stopped = await provider.status({ sandboxId: ready.id, principal });
      await provider.cleanup({
        operationId: 'operation.cleanup.real.security',
        sandboxId: ready.id,
        principal,
        expectedRevision: stopped!.revision,
      });
      await expect(engine.inspectContainer(ready.providerSandboxRef!)).resolves.toBeNull();
    } finally {
      await provider.close();
    }
  }, 60_000);

  it('creates, starts, mounts, executes, accounts, stops, and removes a real container', async () => {
    const workspace = await temporaryWorkspace('success');
    const engine = realEngine();
    const provider = trackedProvider({ workspaceRoot: workspace, engine });
    const ready = await createReady(provider, 'success', ['cp']);
    const result = await provider.execute(
      command(ready.id, 'success', 'cp', ['/etc/hostname', '/workspace/result.txt'], {
        captureFileMutations: true,
      })
    );

    expect(result).toMatchObject({
      status: 'completed',
      changedFiles: [{ path: 'result.txt', operation: 'created' }],
      metadata: { processTreeKillScope: 'container', processTreeTerminationVerified: true },
    });
    await expect(fs.readFile(path.join(workspace, 'result.txt'), 'utf8')).resolves.not.toBe('');
    const stopped = await provider.status({ sandboxId: ready.id, principal });
    await provider.cleanup({
      operationId: 'operation.cleanup.real.success',
      sandboxId: ready.id,
      principal,
      expectedRevision: stopped!.revision,
    });
    await expect(engine.inspectContainer(ready.providerSandboxRef!)).resolves.toBeNull();
    await provider.close();
  }, 60_000);

  it('kills and removes the real container after timeout', async () => {
    const engine = realEngine();
    const provider = trackedProvider({
      workspaceRoot: await temporaryWorkspace('timeout'),
      engine,
    });
    const ready = await createReady(provider, 'timeout', ['perl']);
    const result = await provider.execute(
      command(
        ready.id,
        'timeout',
        'perl',
        [
          '-e',
          'my $pid = fork(); die "fork failed" unless defined $pid; if ($pid == 0) { sleep 30; exit 0; } wait;',
        ],
        { timeoutMs: 250 }
      )
    );
    expect(result).toMatchObject({
      status: 'timed_out',
      error: { code: 'EXECUTION_TIMEOUT' },
      metadata: { processTreeTerminationVerified: true },
    });
    const stopped = await provider.status({ sandboxId: ready.id, principal });
    await provider.cleanup({
      operationId: 'operation.cleanup.real.timeout',
      sandboxId: ready.id,
      principal,
      expectedRevision: stopped!.revision,
    });
    await expect(engine.inspectContainer(ready.providerSandboxRef!)).resolves.toBeNull();
    await provider.close();
  }, 60_000);

  it('kills and removes the real container after idle timeout', async () => {
    const engine = realEngine();
    const provider = trackedProvider({
      workspaceRoot: await temporaryWorkspace('idle-timeout'),
      engine,
    });
    const ready = await createReady(provider, 'idle-timeout', ['sleep']);
    const result = await provider.execute(
      command(ready.id, 'idle-timeout', 'sleep', ['30'], {
        timeoutMs: 5_000,
        idleTimeoutMs: 250,
      })
    );
    expect(result).toMatchObject({
      status: 'timed_out',
      error: { code: 'EXECUTION_IDLE_TIMEOUT' },
      metadata: { processTreeTerminationVerified: true },
    });
    await cleanup(provider, engine, ready.id, ready.providerSandboxRef!, 'idle-timeout');
  }, 60_000);

  it('propagates real cancellation and rejects secret/path requests before Docker exec', async () => {
    const engine = realEngine();
    const provider = trackedProvider({
      workspaceRoot: await temporaryWorkspace('cancel'),
      engine,
    });
    const ready = await createReady(provider, 'cancel', ['sleep']);
    await expect(
      provider.execute(
        command(ready.id, 'secret-denied', 'sleep', ['1'], { secretRefs: ['secret://denied'] })
      )
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_SECRET_DENIED' } });
    await expect(
      provider.execute(command(ready.id, 'path-denied', 'sleep', ['1'], { cwd: '../outside' }))
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_PATH_ESCAPE' } });
    await expect(provider.status({ sandboxId: ready.id, principal })).resolves.toMatchObject({
      status: 'ready',
      activeExecutionIds: [],
    });

    const execution = provider.execute(command(ready.id, 'cancel', 'sleep', ['30']));
    await waitForStatus(provider, ready.id, 'busy');
    await provider.cancel({
      operationId: 'operation.cancel.real',
      executionId: 'execution.docker.real.cancel',
      principal,
      expectedRevision: 2,
    });
    await expect(execution).resolves.toMatchObject({
      status: 'cancelled',
      error: { code: 'EXECUTION_CANCELLED' },
    });
    const stopped = await provider.status({ sandboxId: ready.id, principal });
    await provider.cleanup({
      operationId: 'operation.cleanup.real.cancel',
      sandboxId: ready.id,
      principal,
      expectedRevision: stopped!.revision,
    });
    await expect(engine.inspectContainer(ready.providerSandboxRef!)).resolves.toBeNull();
    await provider.close();
  }, 60_000);

  it('enforces CPU, memory, and process limits through the container cgroup', async () => {
    const engine = realEngine();
    const provider = trackedProvider({
      workspaceRoot: await temporaryWorkspace('cgroup'),
      engine,
    });
    const ready = await createReady(provider, 'cgroup', ['cat']);
    try {
      const result = await provider.execute(
        command(ready.id, 'cgroup', 'cat', [
          '/sys/fs/cgroup/cpu.max',
          '/sys/fs/cgroup/memory.max',
          '/sys/fs/cgroup/pids.max',
        ])
      );
      expect(result).toMatchObject({ status: 'completed', exitCode: 0 });
      expect((result.stdout ?? '').trim().split(/\r?\n/)).toEqual([
        '50000 100000',
        String(128 * 1024 * 1024),
        '64',
      ]);

      await cleanup(provider, engine, ready.id, ready.providerSandboxRef!, 'cgroup');
    } finally {
      await provider.close();
    }
  }, 60_000);

  it('denies direct-IP network access in the real container', async () => {
    const engine = realEngine();
    const provider = trackedProvider({
      workspaceRoot: await temporaryWorkspace('network'),
      engine,
    });
    const ready = await createReady(provider, 'network', ['redis-cli']);
    try {
      const result = await provider.execute(
        command(ready.id, 'network', 'redis-cli', ['-h', '1.1.1.1', '-p', '6379', 'PING'], {
          timeoutMs: 2_000,
        })
      );
      expect(result.status).not.toBe('completed');
      expect(result.stdout ?? '').not.toContain('PONG');

      await cleanup(provider, engine, ready.id, ready.providerSandboxRef!, 'network');
    } finally {
      await provider.close();
    }
  }, 60_000);

  it('normalizes real Docker memory-limit enforcement as OOM killed', async () => {
    const engine = realEngine();
    const provider = trackedProvider({
      workspaceRoot: await temporaryWorkspace('oom'),
      engine,
    });
    const ready = await createReady(provider, 'oom', ['perl']);
    try {
      const result = await provider.execute(
        command(ready.id, 'oom', 'perl', ['-e', '$value = "x" x (256 * 1024 * 1024); sleep 30'])
      );
      expect(result).toMatchObject({
        status: 'oom_killed',
        exitCode: 137,
        error: { code: 'EXECUTION_OOM_KILLED', retryable: false },
        metadata: { oomKilled: true, processTreeTerminationVerified: true },
      });

      await cleanup(provider, engine, ready.id, ready.providerSandboxRef!, 'oom');
    } finally {
      await provider.close();
    }
  }, 60_000);

  it('keeps protected container paths read-only and does not expose the Docker socket', async () => {
    const engine = realEngine();
    const provider = trackedProvider({
      workspaceRoot: await temporaryWorkspace('filesystem'),
      engine,
    });
    const ready = await createReady(provider, 'filesystem', ['perl']);
    try {
      const result = await provider.execute(
        command(ready.id, 'filesystem', 'perl', [
          '-e',
          'my $socket = -S "/var/run/docker.sock"; my $opened = open(my $fh, ">", "/etc/hypha-denied"); exit(($socket || $opened) ? 23 : 0);',
        ])
      );
      expect(result).toMatchObject({ status: 'completed', exitCode: 0 });

      await cleanup(provider, engine, ready.id, ready.providerSandboxRef!, 'filesystem');
    } finally {
      await provider.close();
    }
  }, 60_000);

  it('observes CPU quota throttling under sustained real container load', async () => {
    const engine = realEngine();
    const provider = trackedProvider({
      workspaceRoot: await temporaryWorkspace('cpu'),
      engine,
    });
    const ready = await createReady(provider, 'cpu', ['perl']);
    try {
      const before = parseCpuThrottling(
        await runRawContainerCommand(ready.providerSandboxRef!, ['cat', '/sys/fs/cgroup/cpu.stat'])
      );
      const execution = provider.execute(
        command(ready.id, 'cpu', 'perl', [
          '-e',
          'for (1..4) { my $pid = fork(); die "fork failed" unless defined $pid; if ($pid == 0) { my $value = 0; $value++ while 1; } } sleep 30;',
        ])
      );
      await waitForStatus(provider, ready.id, 'busy');
      await delay(1_500);
      const after = parseCpuThrottling(
        await runRawContainerCommand(ready.providerSandboxRef!, ['cat', '/sys/fs/cgroup/cpu.stat'])
      );
      expect(after).toBeGreaterThan(before);

      await provider.cancel({
        operationId: 'operation.cancel.real.cpu',
        executionId: 'execution.docker.real.cpu',
        principal,
        expectedRevision: 2,
      });
      await expect(execution).resolves.toMatchObject({ status: 'cancelled' });
      await cleanup(provider, engine, ready.id, ready.providerSandboxRef!, 'cpu');
    } finally {
      await provider.close();
    }
  }, 60_000);

  it('enforces the real PID limit and removes the forked process tree', async () => {
    const engine = realEngine();
    const provider = trackedProvider({
      workspaceRoot: await temporaryWorkspace('pids'),
      engine,
    });
    const ready = await createReady(provider, 'pids', ['perl']);
    try {
      const result = await provider.execute(
        command(ready.id, 'pids', 'perl', [
          '-e',
          'for (1..200) { my $pid = fork(); exit 42 unless defined $pid; if ($pid == 0) { sleep 30; exit 0; } } wait;',
        ])
      );
      expect(result).toMatchObject({
        status: 'failed',
        exitCode: 42,
        metadata: { processTreeTerminationVerified: true },
      });

      await cleanup(provider, engine, ready.id, ready.providerSandboxRef!, 'pids');
    } finally {
      await provider.close();
    }
  }, 60_000);

  it('terminates a busy real Sandbox and removes its descendant process tree', async () => {
    const engine = realEngine();
    const provider = trackedProvider({
      workspaceRoot: await temporaryWorkspace('terminate'),
      engine,
    });
    const ready = await createReady(provider, 'terminate', ['perl']);
    try {
      const execution = provider.execute(
        command(ready.id, 'terminate', 'perl', [
          '-e',
          'my $pid = fork(); die "fork failed" unless defined $pid; if ($pid == 0) { sleep 30; exit 0; } wait;',
        ])
      );
      const busy = await waitForStatus(provider, ready.id, 'busy');
      await provider.terminate({
        operationId: 'operation.terminate.real',
        sandboxId: ready.id,
        principal,
        expectedRevision: busy.revision,
        reason: 'real termination evidence',
      });
      await expect(execution).resolves.toMatchObject({ status: 'cancelled' });
      const terminated = await provider.status({ sandboxId: ready.id, principal });
      expect(terminated).toMatchObject({ status: 'terminated', activeExecutionIds: [] });

      await provider.cleanup({
        operationId: 'operation.cleanup.real.terminate',
        sandboxId: ready.id,
        principal,
        expectedRevision: terminated!.revision,
      });
      await expect(engine.inspectContainer(ready.providerSandboxRef!)).resolves.toBeNull();
    } finally {
      await provider.close();
    }
  }, 60_000);
});

function realEngine(): DockerEngineCliClient {
  return new DockerEngineCliClient(new DockerCliTransport({ dockerPath }));
}

function trackedProvider(
  options: ConstructorParameters<typeof DockerExecutionProvider>[0]
): DockerExecutionProvider {
  const provider = new DockerExecutionProvider(options);
  activeProviders.push(provider);
  return provider;
}

async function inspectRawContainer(containerId: string): Promise<Record<string, unknown>> {
  const stdout = await runRawDockerCommand(['inspect', containerId]);
  const parsed = JSON.parse(stdout) as unknown;
  if (!Array.isArray(parsed) || !parsed[0] || typeof parsed[0] !== 'object') {
    throw new Error('Docker inspect returned invalid JSON.');
  }
  return parsed[0] as Record<string, unknown>;
}

async function runRawContainerCommand(containerId: string, commandArgs: string[]): Promise<string> {
  return runRawDockerCommand(['exec', containerId, ...commandArgs]);
}

async function runRawDockerCommand(args: string[]): Promise<string> {
  const result = await new DockerCliTransport({ dockerPath }).run({
    args,
    timeoutMs: 10_000,
    maxStdoutBytes: 4 * 1024 * 1024,
    maxStderrBytes: 1024 * 1024,
    maxCombinedOutputBytes: 5 * 1024 * 1024,
    signal: new AbortController().signal,
  });
  if (result.outcome !== 'exited' || result.exitCode !== 0) {
    throw new Error(
      `Docker test command failed with outcome ${result.outcome} and exit code ${String(result.exitCode)}.`
    );
  }
  return result.stdout;
}

function parseCpuThrottling(cpuStat: string): number {
  const match = /^nr_throttled\s+(\d+)$/mu.exec(cpuStat);
  if (!match) throw new Error('cpu.stat did not report nr_throttled.');
  return Number(match[1]);
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function temporaryWorkspace(caseName: string): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), `hypha-docker-real-${caseName}-`));
  temporaryWorkspaces.push(root);
  return root;
}

async function cleanup(
  provider: DockerExecutionProvider,
  engine: DockerEngineCliClient,
  sandboxId: string,
  containerId: string,
  caseName: string
): Promise<void> {
  const stopped = await provider.status({ sandboxId, principal });
  await provider.cleanup({
    operationId: `operation.cleanup.real.${caseName}`,
    sandboxId,
    principal,
    expectedRevision: stopped!.revision,
  });
  await expect(engine.inspectContainer(containerId)).resolves.toBeNull();
}

async function createReady(
  provider: DockerExecutionProvider,
  caseName: string,
  allowedExecutables: string[]
) {
  const created = await provider.create(createRequest(caseName, allowedExecutables));
  return provider.start({
    operationId: `operation.start.real.${caseName}`,
    sandboxId: created.id,
    principal,
    expectedRevision: created.revision,
  });
}

function createRequest(caseName: string, allowedExecutables: string[]): SandboxCreateRequest {
  return {
    operationId: `operation.create.real.${caseName}`,
    principal,
    environment: environment(allowedExecutables),
    environmentRevision: `sha256:docker-real-${caseName}`,
    userId: 'user.docker.real',
    workspaceId: 'workspace.docker.real',
    runId: 'run.docker.real',
  };
}

function command(
  sandboxId: string,
  caseName: string,
  executable: string,
  args: string[],
  overrides: Partial<CommandExecutionRequest> = {}
): CommandExecutionRequest {
  return {
    executionId: `execution.docker.real.${caseName}`,
    operationId: `operation.execute.real.${caseName}`,
    principal,
    userId: 'user.docker.real',
    workspaceId: 'workspace.docker.real',
    runId: 'run.docker.real',
    sandboxId,
    environmentRef: { id: 'execution-environment.docker.real', version: '0.1.0' },
    executable,
    args,
    shell: false,
    ...overrides,
  };
}

async function waitForStatus(provider: DockerExecutionProvider, sandboxId: string, status: string) {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const record = await provider.status({ sandboxId, principal });
    if (record?.status === status) return record;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error(`Sandbox ${sandboxId} did not reach ${status}.`);
}

function environment(allowedExecutables: string[]): ExecutionEnvironmentSpec {
  return {
    id: 'execution-environment.docker.real',
    version: '0.1.0',
    provider: 'docker',
    image: { reference: image, digest, requireDigestPin: true, pullPolicy: 'never' },
    process: {
      shellEnabled: false,
      allowedExecutables,
      executableResolution: 'container_path',
      allowBackgroundProcesses: false,
      allowDaemonization: false,
      killProcessTreeOnExit: true,
      inheritHostEnvironment: false,
    },
    resources: {
      cpuCores: 0.5,
      memoryMb: 128,
      pidsLimit: 64,
      maxStdoutBytes: 1024,
      maxStderrBytes: 1024,
      maxCombinedOutputBytes: 2048,
      maxExecutionSeconds: 5,
    },
    filesystem: {
      rootFilesystem: 'read_only',
      mounts: [
        {
          sourceRef: 'workspace:current',
          targetPath: '/workspace',
          mode: 'rw',
          type: 'workspace',
        },
      ],
      allowDeviceAccess: false,
      allowHostPathMounts: false,
    },
    network: { mode: 'disabled', dnsPolicy: 'disabled' },
    security: {
      runAsUser: '999',
      runAsGroup: '999',
      nonRootRequired: true,
      noNewPrivileges: true,
      privileged: false,
      dropCapabilities: ['ALL'],
      allowNestedContainers: false,
    },
    secrets: { injectionMode: 'none', redactFromOutput: true, redactFromEvents: true },
    logging: { captureStdout: true, captureStderr: true },
    lifecycle: { reuse: 'never', stopTimeoutMs: 1_000, cleanupOnSuccess: true },
    workingDirectoryPolicy: 'workspace_only',
    defaultTimeoutMs: 5_000,
  };
}
