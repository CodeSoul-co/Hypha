import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { DockerCliTransport, type DockerCliResult } from './docker-cli-transport';
import { DockerEngineCliClient } from './docker-engine-client';
import { DockerExecIo } from './docker-exec-io';
import {
  DockerExecutionCoordinator,
  type DockerExecutionOutputCollector,
  type DockerExecutionOutputSession,
} from './docker-execution-coordinator';
import {
  LocalDockerExecutionOutputCollector,
  type DockerExecutionArtifactStreamPort,
} from './docker-execution-output-collector';
import { DockerStatsResourceAccounting } from './docker-resource-accounting';
import type {
  LocalProcessArtifactStream,
  LocalProcessOutputArtifactStream,
} from './local-process-output-artifacts';

const dockerPath = process.env.HYPHA_REAL_DOCKER_PATH ?? 'docker';
const image = process.env.HYPHA_REAL_DOCKER_IMAGE ?? 'redis';
const imageDigest =
  process.env.HYPHA_REAL_DOCKER_DIGEST ??
  'sha256:77cb4599f0121142e25139cea1aafaf45fe765c74a0a41b38f4a4ea9fc8cb846';
const testRuntime = executionTestRuntime(process.env.HYPHA_REAL_DOCKER_TEST_RUNTIME);
const transport = new DockerCliTransport({ dockerPath });
const engine = new DockerEngineCliClient(transport);
const temporaryWorkspaces: string[] = [];
const containerNames: string[] = [];
const ownedScopeIds: string[] = [];

beforeAll(async () => {
  const result = await runDocker(['image', 'inspect', `${image}@${imageDigest}`]);
  expect(result.outcome).toBe('exited');
  expect(result.exitCode).toBe(0);
  const security = await runDocker(['info', '--format', '{{json .SecurityOptions}}']);
  expect(security.outcome).toBe('exited');
  expect(security.exitCode).toBe(0);
  const securityOptions: unknown = JSON.parse(security.stdout);
  expect(Array.isArray(securityOptions)).toBe(true);
  expect(
    (securityOptions as unknown[]).some(
      (option) => typeof option === 'string' && option.includes('name=seccomp')
    )
  ).toBe(true);
}, 30_000);

afterEach(async () => {
  await Promise.all(
    containerNames.splice(0).map(async (name) => {
      await engine.removeContainer(name);
      await expect(engine.inspectContainer(name)).resolves.toBeNull();
    })
  );
  for (const scopeId of ownedScopeIds.splice(0)) {
    await assertNoOwnedDockerResources(scopeId);
  }
  await Promise.all(
    temporaryWorkspaces.splice(0).map((root) => fs.rm(root, { recursive: true, force: true }))
  );
});

describe('DockerExecutionCoordinator real daemon', () => {
  it('executes in a hardened container, captures workspace and resource evidence, and cleans up', async () => {
    const workspace = await temporaryWorkspace('success');
    const name = uniqueContainerName('success');
    let observedContainerReference: string | undefined;
    const outputs = realOutputs(workspace, async (containerReference) => {
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
        executable: 'sh',
        args: ['-c', 'cp /etc/hostname /workspace/result.txt && printf artifact-output'],
        timeoutMs: 5_000,
      })
    );

    expect(result).toMatchObject({
      status: 'completed',
      exitCode: 0,
      stdoutArtifactRef: 'artifact.execution.docker.real.success.stdout',
      generatedArtifactRefs: ['artifact.execution.docker.real.success.stdout'],
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
        containerReference: observedContainerReference,
        cpuPercent: expect.any(Number),
        memoryUsageBytes: expect.any(Number),
        memoryLimitBytes: expect.any(Number),
        processCount: expect.any(Number),
      },
    });
    expect(outputs.content('stdout')).toEqual(Buffer.from('artifact-output'));
    await expect(fs.readFile(path.join(workspace, 'result.txt'), 'utf8')).resolves.not.toBe('');
    await expect(engine.inspectContainer(name)).resolves.toBeNull();
  }, 60_000);

  it('normalizes a real timeout and removes the still-running container', async () => {
    const workspace = await temporaryWorkspace('timeout');
    const name = uniqueContainerName('timeout');

    const result = await coordinator(realOutputs(workspace)).execute(
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
    const name = uniqueContainerName('cancel');
    const cancellation = new AbortController();
    const startedMarker = path.join(workspace, 'cancel.started');

    const execution = coordinator(realOutputs(workspace)).execute(
      executionInput(name, workspace, 'cancel', {
        ...cancellationCommand(),
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

  it('persists truncated real output as an Artifact and still removes the container', async () => {
    const workspace = await temporaryWorkspace('output-limit');
    const name = uniqueContainerName('output-limit');
    const outputs = realOutputs(workspace);

    const result = await coordinator(outputs).execute(
      executionInput(name, workspace, 'output-limit', {
        // A finite burst still exceeds every configured limit while avoiding
        // an unbounded producer during Windows Docker CLI process teardown.
        ...outputLimitCommand(),
        timeoutMs: 5_000,
        maxStdoutBytes: 128,
        maxCombinedOutputBytes: 256,
      })
    );

    expect(result).toMatchObject({
      status: 'resource_exceeded',
      stdoutTruncated: true,
      stdoutArtifactRef: 'artifact.execution.docker.real.output-limit.stdout',
      generatedArtifactRefs: ['artifact.execution.docker.real.output-limit.stdout'],
      error: { code: 'EXECUTION_OUTPUT_LIMIT' },
      metadata: {
        cleanup: {
          complete: true,
          containerAbsent: true,
          stopAttempted: true,
        },
      },
    });
    const streamedStdout = outputs.content('stdout');
    const inlineStdout = requiredString(result.stdout, 'Docker bounded stdout');
    expect(streamedStdout.toString('utf8')).toContain('hypha\n');
    expect(streamedStdout.byteLength).toBeGreaterThan(Buffer.byteLength(inlineStdout));
    await expect(engine.inspectContainer(name)).resolves.toBeNull();
  }, 60_000);

  it('enforces CPU, memory, and process limits through the real container cgroup', async () => {
    const workspace = await temporaryWorkspace('cgroup');
    const name = uniqueContainerName('cgroup');

    const result = await coordinator(realOutputs(workspace)).execute(
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
    const name = uniqueContainerName('network');

    const result = await coordinator(realOutputs(workspace)).execute(
      executionInput(name, workspace, 'network', {
        ...networkProbeCommand(),
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
    const name = uniqueContainerName('oom');

    const result = await coordinator(realOutputs(workspace)).execute(
      executionInput(name, workspace, 'oom', {
        ...outOfMemoryCommand(),
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
    const name = uniqueContainerName('filesystem');

    const result = await coordinator(realOutputs(workspace)).execute(
      executionInput(name, workspace, 'filesystem', {
        ...filesystemProbeCommand(),
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
    const name = uniqueContainerName('pids');

    const result = await coordinator(realOutputs(workspace)).execute(
      executionInput(name, workspace, 'pids', {
        ...pidLimitCommand(),
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

  it('fails closed under real temporary-filesystem pressure and removes all owned resources', async () => {
    const workspace = await temporaryWorkspace('disk-pressure');
    const name = uniqueContainerName('disk-pressure');

    const result = await coordinator(realOutputs(workspace)).execute(
      executionInput(name, workspace, 'disk-pressure', {
        executable: 'sh',
        args: ['-c', 'dd if=/dev/zero of=/tmp/fill bs=1M count=8 2>/dev/null'],
        timeoutMs: 5_000,
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
    await expect(engine.inspectContainer(name)).resolves.toBeNull();
  }, 60_000);
});

class RealDockerOutputs implements DockerExecutionOutputCollector {
  private readonly artifacts = new RecordingArtifactPort();
  private readonly collector: LocalDockerExecutionOutputCollector;

  constructor(
    private readonly workspace: string,
    private readonly inspect?: (containerReference: string) => Promise<void>
  ) {
    this.collector = new LocalDockerExecutionOutputCollector({
      workspaceRoot: workspace,
      outputArtifacts: this.artifacts,
    });
  }

  async prepare(input: {
    executionId: string;
    workspaceRoot: string;
  }): Promise<DockerExecutionOutputSession> {
    expect(path.resolve(input.workspaceRoot)).toBe(path.resolve(this.workspace));
    const session = await this.collector.prepare(input);
    return {
      onOutput: (event) => session.onOutput(event),
      collect: async (collectInput) => {
        await this.inspect?.(collectInput.containerReference);
        return session.collect(collectInput);
      },
      abort: (error) => session.abort(error),
    };
  }

  content(stream: LocalProcessArtifactStream): Buffer {
    return this.artifacts.content(stream);
  }
}

function realOutputs(
  workspace: string,
  inspect?: (containerReference: string) => Promise<void>
): RealDockerOutputs {
  return new RealDockerOutputs(workspace, inspect);
}

class RecordingArtifactPort implements DockerExecutionArtifactStreamPort {
  private readonly streams = new Map<LocalProcessArtifactStream, RecordingArtifactStream>();

  openStream(input: {
    executionId: string;
    stream: LocalProcessArtifactStream;
  }): LocalProcessOutputArtifactStream {
    if (this.streams.has(input.stream)) throw new Error('Artifact stream was opened twice.');
    const stream = new RecordingArtifactStream(`artifact.${input.executionId}.${input.stream}`);
    this.streams.set(input.stream, stream);
    return stream;
  }

  content(stream: LocalProcessArtifactStream): Buffer {
    return Buffer.concat(this.streams.get(stream)?.chunks ?? []);
  }
}

class RecordingArtifactStream implements LocalProcessOutputArtifactStream {
  readonly chunks: Buffer[] = [];
  private closed = false;

  constructor(private readonly reference: string) {}

  async append(chunk: Uint8Array): Promise<void> {
    if (this.closed) throw new Error('Artifact stream is closed.');
    this.chunks.push(Buffer.from(chunk));
  }

  async complete(): Promise<string> {
    this.closed = true;
    return this.reference;
  }

  async abort(_error: unknown): Promise<void> {
    this.closed = true;
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

type ExecutionTestRuntime = 'redis' | 'python';

interface TestCommand {
  executable: string;
  args: string[];
}

function executionTestRuntime(value: string | undefined): ExecutionTestRuntime {
  const runtime = value ?? 'redis';
  if (runtime !== 'redis' && runtime !== 'python') {
    throw new Error('HYPHA_REAL_DOCKER_TEST_RUNTIME must be redis or python.');
  }
  return runtime;
}

function cancellationCommand(): TestCommand {
  return testRuntime === 'python'
    ? {
        executable: 'python',
        args: [
          '-c',
          "import os,time; pid=os.fork(); (time.sleep(30) if pid == 0 else (open('/workspace/cancel.started','w').write('started\\n'), os.waitpid(pid,0)))",
        ],
      }
    : {
        executable: 'perl',
        args: [
          '-e',
          'my $pid = fork(); die "fork failed" unless defined $pid; if ($pid == 0) { sleep 30; exit 0; } open(my $fh, ">", "/workspace/cancel.started") or die "marker failed"; print {$fh} "started\\n"; close($fh); wait;',
        ],
      };
}

function outputLimitCommand(): TestCommand {
  return testRuntime === 'python'
    ? { executable: 'python', args: ['-c', "print('hypha\\n' * 1024, end='')"] }
    : { executable: 'perl', args: ['-e', 'print "hypha\\n" x 1024'] };
}

function networkProbeCommand(): TestCommand {
  return testRuntime === 'python'
    ? {
        executable: 'python',
        args: [
          '-c',
          "import socket,sys; s=socket.socket(); s.settimeout(1);\ntry: s.connect(('1.1.1.1',6379)); print('PONG'); sys.exit(0)\nexcept OSError: sys.exit(1)",
        ],
      }
    : { executable: 'redis-cli', args: ['-h', '1.1.1.1', '-p', '6379', 'PING'] };
}

function outOfMemoryCommand(): TestCommand {
  return testRuntime === 'python'
    ? {
        executable: 'python',
        args: [
          '-c',
          "import time; chunks=[]\nfor _ in range(256):\n value=bytearray(1024*1024); value[:]=b'x'*len(value); chunks.append(value)\ntime.sleep(30)",
        ],
      }
    : { executable: 'perl', args: ['-e', '$value = "x" x (256 * 1024 * 1024); sleep 30'] };
}

function filesystemProbeCommand(): TestCommand {
  return testRuntime === 'python'
    ? {
        executable: 'python',
        args: [
          '-c',
          "import os,sys; exposed=os.path.exists('/var/run/docker.sock');\ntry:\n open('/etc/hypha-denied','w').close(); opened=True\nexcept OSError: opened=False\nsys.exit(23 if exposed or opened else 0)",
        ],
      }
    : {
        executable: 'perl',
        args: [
          '-e',
          'my $socket = -S "/var/run/docker.sock"; my $opened = open(my $fh, ">", "/etc/hypha-denied"); exit(($socket || $opened) ? 23 : 0);',
        ],
      };
}

function pidLimitCommand(): TestCommand {
  return testRuntime === 'python'
    ? {
        executable: 'python',
        args: [
          '-c',
          'import os,time; children=[]\ntry:\n for _ in range(200):\n  pid=os.fork()\n  if pid == 0: time.sleep(30); os._exit(0)\n  children.append(pid)\nexcept OSError: os._exit(42)\nfor pid in children: os.waitpid(pid,0)',
        ],
      }
    : {
        executable: 'perl',
        args: [
          '-e',
          'for (1..200) { my $pid = fork(); exit 42 unless defined $pid; if ($pid == 0) { sleep 30; exit 0; } } wait;',
        ],
      };
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
  const scopeId = `scope.docker.real.${caseName}`;
  ownedScopeIds.push(scopeId);
  return {
    providerId: 'docker.real',
    executionId: `execution.docker.real.${caseName}`,
    revision: 1,
    sandboxId: `sandbox.docker.real.${caseName}`,
    scopeId,
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

async function assertNoOwnedDockerResources(scopeId: string): Promise<void> {
  const filter = `label=hypha.execution.scope=${scopeId}`;
  const resources = [
    ['container', '{{.ID}}'],
    ['network', '{{.ID}}'],
    ['volume', '{{.Name}}'],
  ] as const;
  for (const [resource, format] of resources) {
    const result = await runDocker([resource, 'ls', '--filter', filter, '--format', format]);
    expect(result.outcome).toBe('exited');
    expect(result.exitCode).toBe(0);
    expect(result.stdout.trim(), `${resource} residue remained for ${scopeId}`).toBe('');
  }
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
