import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { DockerCliTransport, type DockerCliResult } from './docker-cli-transport';
import { DockerEngineCliClient } from './docker-engine-client';
import { DockerExecIo } from './docker-exec-io';
import {
  DockerExecutionCoordinator,
  DockerExecutionCoordinatorError,
  type DockerExecutionOutputCollector,
} from './docker-execution-coordinator';
import { DockerStatsResourceAccounting } from './docker-resource-accounting';
import {
  captureLocalWorkspaceSnapshot,
  diffLocalWorkspaceSnapshots,
  type LocalWorkspaceSnapshot,
} from './local-workspace-mutations';

const dockerPath = process.env.HYPHA_REAL_DOCKER_PATH ?? 'docker';
const image = process.env.HYPHA_REAL_DOCKER_IMAGE ?? 'redis:latest';
const imageDigest =
  process.env.HYPHA_REAL_DOCKER_DIGEST ??
  'sha256:77cb4599f0121142e25139cea1aafaf45fe765c74a0a41b38f4a4ea9fc8cb846';
const transport = new DockerCliTransport({ dockerPath });
const engine = new DockerEngineCliClient(transport);
const temporaryWorkspaces: string[] = [];
const containerNames: string[] = [];

beforeAll(async () => {
  const result = await runDocker(['image', 'inspect', `${image}@${imageDigest}`]);
  expect(result.outcome).toBe('exited');
  expect(result.exitCode).toBe(0);
}, 30_000);

afterEach(async () => {
  await Promise.all(
    containerNames.splice(0).map(async (name) => {
      await engine.removeContainer(name);
      await expect(engine.inspectContainer(name)).resolves.toBeNull();
    })
  );
  await Promise.all(
    temporaryWorkspaces.splice(0).map((root) => fs.rm(root, { recursive: true, force: true }))
  );
});

describe('DockerExecutionCoordinator real daemon', () => {
  it('executes in a hardened container, captures workspace and resource evidence, and cleans up', async () => {
    const workspace = await temporaryWorkspace('success');
    const before = await captureLocalWorkspaceSnapshot(workspace);
    const name = uniqueContainerName('success');
    let observedContainerReference: string | undefined;
    const outputs = new RealWorkspaceOutputs(workspace, before, async (containerReference) => {
      observedContainerReference = containerReference;
      const inspected = await inspectRawContainer(containerReference);
      const config = requiredRecord(inspected.Config, 'Docker Config');
      const hostConfig = requiredRecord(inspected.HostConfig, 'Docker HostConfig');
      const mounts = requiredRecordArray(inspected.Mounts, 'Docker Mounts');

      expect(config.User).toBe('999:999');
      expect(config.Labels).toMatchObject({
        'hypha.execution.managed': 'true',
        'hypha.execution.scope': 'scope.docker.real.success',
        'hypha.execution.id': 'execution.docker.real.success',
        'hypha.execution.sandbox': 'sandbox.docker.real.success',
      });
      expect(hostConfig).toMatchObject({
        ReadonlyRootfs: true,
        NetworkMode: 'none',
        NanoCpus: 250_000_000,
        Memory: 64 * 1024 * 1024,
        PidsLimit: 32,
      });
      expect(hostConfig.CapDrop).toEqual(['ALL']);
      expect(hostConfig.SecurityOpt).toContain('no-new-privileges=true');
      expect(mounts).toHaveLength(1);
      expect(mounts[0]).toMatchObject({
        Type: 'bind',
        Destination: '/workspace',
        RW: true,
      });
    });

    const result = await coordinator(outputs).execute(
      executionInput(name, workspace, 'success', {
        executable: 'cp',
        args: ['/etc/hostname', '/workspace/result.txt'],
        timeoutMs: 5_000,
      })
    );

    expect(result).toMatchObject({
      status: 'completed',
      exitCode: 0,
      changedFiles: [{ path: 'result.txt', operation: 'created' }],
      externalReceipt: {
        providerId: 'docker.real',
        executionId: 'execution.docker.real.success',
        providerExecutionRef: observedContainerReference,
        metadata: { cleanupComplete: true, oomKilled: false },
      },
      metadata: {
        accountingMode: 'docker_point_in_time_stats',
        cleanup: {
          complete: true,
          containerAbsent: true,
          stopAttempted: true,
        },
      },
    });
    expect(result.metadata).toMatchObject({
      resourceSnapshot: {
        cpuPercent: expect.any(Number),
        memoryUsageBytes: expect.any(Number),
        memoryLimitBytes: expect.any(Number),
        processCount: expect.any(Number),
      },
    });
    await expect(fs.readFile(path.join(workspace, 'result.txt'), 'utf8')).resolves.not.toBe('');
    await expect(engine.inspectContainer(name)).resolves.toBeNull();
  }, 60_000);

  it('normalizes a real timeout and removes the still-running container', async () => {
    const workspace = await temporaryWorkspace('timeout');
    const before = await captureLocalWorkspaceSnapshot(workspace);
    const name = uniqueContainerName('timeout');

    const result = await coordinator(new RealWorkspaceOutputs(workspace, before)).execute(
      executionInput(name, workspace, 'timeout', {
        executable: 'sleep',
        args: ['30'],
        timeoutMs: 250,
      })
    );

    expect(result).toMatchObject({
      status: 'timed_out',
      exitCode: null,
      error: { code: 'EXECUTION_TIMEOUT', retryable: true },
      metadata: {
        cleanup: {
          complete: true,
          containerAbsent: true,
          stopAttempted: true,
        },
        processTreeTerminationVerified: true,
      },
    });
    await expect(engine.inspectContainer(name)).resolves.toBeNull();
  }, 60_000);

  it('propagates real cancellation and removes the container process tree', async () => {
    const workspace = await temporaryWorkspace('cancel');
    const before = await captureLocalWorkspaceSnapshot(workspace);
    const name = uniqueContainerName('cancel');
    const cancellation = new AbortController();
    const startedMarker = path.join(workspace, 'cancel.started');

    const execution = coordinator(new RealWorkspaceOutputs(workspace, before)).execute(
      executionInput(name, workspace, 'cancel', {
        executable: 'perl',
        args: [
          '-e',
          'my $pid = fork(); die "fork failed" unless defined $pid; if ($pid == 0) { sleep 30; exit 0; } open(my $fh, ">", "/workspace/cancel.started") or die "marker failed"; print {$fh} "started\\n"; close($fh); wait;',
        ],
        timeoutMs: 10_000,
        signal: cancellation.signal,
      })
    );
    await waitForPath(startedMarker);
    cancellation.abort();
    const result = await execution;

    expect(result).toMatchObject({
      status: 'cancelled',
      exitCode: null,
      error: { code: 'EXECUTION_CANCELLED', retryable: false },
      changedFiles: [{ path: 'cancel.started', operation: 'created' }],
      metadata: {
        cleanup: {
          complete: true,
          containerAbsent: true,
          stopAttempted: true,
        },
        processTreeTerminationVerified: true,
      },
    });
    await expect(engine.inspectContainer(name)).resolves.toBeNull();
  }, 60_000);

  it('fails closed after a real output limit without an Artifact and still removes the container', async () => {
    const workspace = await temporaryWorkspace('output-limit');
    const before = await captureLocalWorkspaceSnapshot(workspace);
    const name = uniqueContainerName('output-limit');
    let failure: unknown;

    try {
      await coordinator(new RealWorkspaceOutputs(workspace, before)).execute(
        executionInput(name, workspace, 'output-limit', {
          executable: 'yes',
          args: ['hypha'],
          timeoutMs: 5_000,
          maxStdoutBytes: 128,
          maxCombinedOutputBytes: 256,
        })
      );
    } catch (error) {
      failure = error;
    }

    expect(failure).toBeInstanceOf(DockerExecutionCoordinatorError);
    expect(failure).toMatchObject({
      phase: 'terminal',
      code: 'DOCKER_INVALID_RESPONSE',
      cleanup: {
        complete: true,
        containerAbsent: true,
        stopAttempted: true,
      },
    });
    await expect(engine.inspectContainer(name)).resolves.toBeNull();
  }, 60_000);

  it('enforces CPU, memory, and process limits through the real container cgroup', async () => {
    const workspace = await temporaryWorkspace('cgroup');
    const before = await captureLocalWorkspaceSnapshot(workspace);
    const name = uniqueContainerName('cgroup');

    const result = await coordinator(new RealWorkspaceOutputs(workspace, before)).execute(
      executionInput(name, workspace, 'cgroup', {
        executable: 'cat',
        args: ['/sys/fs/cgroup/cpu.max', '/sys/fs/cgroup/memory.max', '/sys/fs/cgroup/pids.max'],
        timeoutMs: 5_000,
      })
    );

    expect(result).toMatchObject({
      status: 'completed',
      exitCode: 0,
      metadata: {
        cleanup: {
          complete: true,
          containerAbsent: true,
          stopAttempted: true,
        },
      },
    });
    const stdout = requiredString(result.stdout, 'Docker cgroup stdout');
    expect(stdout.trim().split(/\r?\n/)).toEqual(['25000 100000', String(64 * 1024 * 1024), '32']);
    await expect(engine.inspectContainer(name)).resolves.toBeNull();
  }, 60_000);

  it('blocks direct-IP network access in the real container and cleans up', async () => {
    const workspace = await temporaryWorkspace('network');
    const before = await captureLocalWorkspaceSnapshot(workspace);
    const name = uniqueContainerName('network');

    const result = await coordinator(new RealWorkspaceOutputs(workspace, before)).execute(
      executionInput(name, workspace, 'network', {
        executable: 'redis-cli',
        args: ['-h', '1.1.1.1', '-p', '6379', 'PING'],
        timeoutMs: 2_000,
      })
    );

    expect(result).toMatchObject({
      status: 'failed',
      exitCode: 1,
      metadata: {
        cleanup: {
          complete: true,
          containerAbsent: true,
          stopAttempted: true,
        },
      },
    });
    expect(result.stdout).not.toContain('PONG');
    await expect(engine.inspectContainer(name)).resolves.toBeNull();
  }, 60_000);

  it('normalizes real memory-limit enforcement as OOM killed and cleans up', async () => {
    const workspace = await temporaryWorkspace('oom');
    const before = await captureLocalWorkspaceSnapshot(workspace);
    const name = uniqueContainerName('oom');

    const result = await coordinator(new RealWorkspaceOutputs(workspace, before)).execute(
      executionInput(name, workspace, 'oom', {
        executable: 'perl',
        args: ['-e', '$value = "x" x (256 * 1024 * 1024); sleep 30'],
        timeoutMs: 10_000,
      })
    );

    expect(result).toMatchObject({
      status: 'oom_killed',
      exitCode: 137,
      error: { code: 'EXECUTION_OOM_KILLED', retryable: false },
      metadata: {
        oomKilled: true,
        cleanup: {
          complete: true,
          containerAbsent: true,
          stopAttempted: true,
        },
      },
    });
    await expect(engine.inspectContainer(name)).resolves.toBeNull();
  }, 60_000);

  it('keeps protected paths read-only and does not expose the Docker socket', async () => {
    const workspace = await temporaryWorkspace('filesystem');
    const before = await captureLocalWorkspaceSnapshot(workspace);
    const name = uniqueContainerName('filesystem');

    const result = await coordinator(new RealWorkspaceOutputs(workspace, before)).execute(
      executionInput(name, workspace, 'filesystem', {
        executable: 'perl',
        args: [
          '-e',
          'my $socket = -S "/var/run/docker.sock"; my $opened = open(my $fh, ">", "/etc/hypha-denied"); exit(($socket || $opened) ? 23 : 0);',
        ],
        timeoutMs: 5_000,
      })
    );

    expect(result).toMatchObject({
      status: 'completed',
      exitCode: 0,
      metadata: {
        cleanup: {
          complete: true,
          containerAbsent: true,
          stopAttempted: true,
        },
      },
    });
    await expect(engine.inspectContainer(name)).resolves.toBeNull();
  }, 60_000);

  it('enforces the real PID limit and removes the forked process tree', async () => {
    const workspace = await temporaryWorkspace('pids');
    const before = await captureLocalWorkspaceSnapshot(workspace);
    const name = uniqueContainerName('pids');

    const result = await coordinator(new RealWorkspaceOutputs(workspace, before)).execute(
      executionInput(name, workspace, 'pids', {
        executable: 'perl',
        args: [
          '-e',
          'for (1..200) { my $pid = fork(); exit 42 unless defined $pid; if ($pid == 0) { sleep 30; exit 0; } } wait;',
        ],
        timeoutMs: 10_000,
      })
    );

    expect(result).toMatchObject({
      status: 'failed',
      exitCode: 42,
      error: { code: 'EXECUTION_INTERNAL_ERROR', providerCode: 42 },
      metadata: {
        cleanup: {
          complete: true,
          containerAbsent: true,
          stopAttempted: true,
        },
        processTreeTerminationVerified: true,
      },
    });
    await expect(engine.inspectContainer(name)).resolves.toBeNull();
  }, 60_000);
});

class RealWorkspaceOutputs implements DockerExecutionOutputCollector {
  constructor(
    private readonly workspace: string,
    private readonly before: LocalWorkspaceSnapshot,
    private readonly inspect?: (containerReference: string) => Promise<void>
  ) {}

  async collect(input: {
    executionId: string;
    containerReference: string;
    processResult: DockerCliResult;
  }) {
    await this.inspect?.(input.containerReference);
    const after = await captureLocalWorkspaceSnapshot(this.workspace);
    return {
      changedFiles: diffLocalWorkspaceSnapshots(
        this.before,
        after,
        input.processResult.completedAt
      ),
      generatedArtifactRefs: [],
    };
  }
}

function coordinator(outputs: DockerExecutionOutputCollector): DockerExecutionCoordinator {
  return new DockerExecutionCoordinator(
    engine,
    new DockerExecIo(transport),
    new DockerStatsResourceAccounting(transport),
    outputs
  );
}

function executionInput(
  name: string,
  workspace: string,
  caseName: string,
  command: {
    executable: string;
    args: string[];
    timeoutMs: number;
    signal?: AbortSignal;
    maxStdoutBytes?: number;
    maxStderrBytes?: number;
    maxCombinedOutputBytes?: number;
  }
) {
  return {
    providerId: 'docker.real',
    executionId: `execution.docker.real.${caseName}`,
    revision: 1,
    sandboxId: `sandbox.docker.real.${caseName}`,
    scopeId: `scope.docker.real.${caseName}`,
    createInput: {
      name,
      image,
      imageDigest,
      user: '999:999',
      workingDirectory: '/workspace',
      workspaceMount: {
        source: workspace,
        target: '/workspace',
        readOnly: false,
      },
      networkMode: 'none' as const,
      readOnlyRoot: true,
      cpuCores: 0.25,
      memoryBytes: 64 * 1024 * 1024,
      pidsLimit: 32,
      tempBytes: 4 * 1024 * 1024,
      labels: { 'hypha.acceptance': 'docker-coordinator' },
      command: ['sleep', 'infinity'],
    },
    execInput: {
      executable: command.executable,
      args: command.args,
      workingDirectory: '/workspace',
      environment: {},
      timeoutMs: command.timeoutMs,
      maxStdoutBytes: command.maxStdoutBytes ?? 1024,
      maxStderrBytes: command.maxStderrBytes ?? 1024,
      maxCombinedOutputBytes: command.maxCombinedOutputBytes ?? 2048,
      signal: command.signal ?? new AbortController().signal,
    },
    cleanupStopTimeoutSeconds: 1,
  };
}

async function temporaryWorkspace(caseName: string): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), `hypha-docker-coordinator-${caseName}-`));
  temporaryWorkspaces.push(root);
  return root;
}

function uniqueContainerName(caseName: string): string {
  const name = `hypha-coordinator-${caseName}-${process.pid}-${Date.now()}`;
  containerNames.push(name);
  return name;
}

async function waitForPath(filename: string): Promise<void> {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    try {
      await fs.access(filename);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  throw new Error('Docker acceptance marker was not created before cancellation.');
}

async function inspectRawContainer(containerReference: string): Promise<Record<string, unknown>> {
  const result = await runDocker(['inspect', containerReference]);
  if (result.outcome !== 'exited' || result.exitCode !== 0) {
    throw new Error('Docker inspect failed during real coordinator acceptance.');
  }
  const parsed: unknown = JSON.parse(result.stdout);
  if (!Array.isArray(parsed) || parsed.length !== 1) {
    throw new Error('Docker inspect returned an invalid acceptance record.');
  }
  return requiredRecord(parsed[0], 'Docker inspection');
}

function runDocker(args: string[]): Promise<DockerCliResult> {
  return transport.run({
    args,
    timeoutMs: 10_000,
    maxStdoutBytes: 4 * 1024 * 1024,
    maxStderrBytes: 1024 * 1024,
    maxCombinedOutputBytes: 5 * 1024 * 1024,
    signal: new AbortController().signal,
  });
}

function requiredRecord(value: unknown, name: string): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new Error(`${name} is not an object.`);
  }
  return value;
}

function requiredRecordArray(value: unknown, name: string): Array<Record<string, unknown>> {
  if (!Array.isArray(value)) throw new Error(`${name} is not an array.`);
  return value.map((entry) => requiredRecord(entry, name));
}

function requiredString(value: unknown, name: string): string {
  if (typeof value !== 'string') throw new Error(`${name} is not a string.`);
  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
