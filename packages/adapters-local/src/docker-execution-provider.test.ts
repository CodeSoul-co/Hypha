import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  validateCommandExecutionResult,
  validateSandboxRecord,
  type CommandExecutionRequest,
  type ExecutionEnvironmentSpec,
  type SandboxCreateRequest,
} from '@hypha/core';
import { DockerExecutionProvider, DockerExecutionProviderError } from './docker-execution-provider';
import type {
  DockerCommandResult,
  DockerContainerCreateInput,
  DockerContainerExecInput,
  DockerContainerInspection,
  DockerContainerStats,
  DockerEngineClient,
  DockerImageInspection,
} from './docker-engine-cli';

const digest = `sha256:${'a'.repeat(64)}`;
const imageReference = 'registry.example.invalid/hypha/execution';
const fixedNow = () => '2026-07-17T00:00:00.000Z';
let requestSequence = 0;
const principal = {
  principalId: 'user.docker',
  type: 'user' as const,
  userId: 'user.docker',
  permissionScopes: ['execution:sandbox:create', 'execution:command:run'],
};

class FakeDockerEngine implements DockerEngineClient {
  readonly creates: DockerContainerCreateInput[] = [];
  readonly executions: DockerContainerExecInput[] = [];
  stops = 0;
  kills = 0;
  removes = 0;
  running = false;
  removed = false;
  oomKilled = false;
  executeBehavior: (input: DockerContainerExecInput) => Promise<DockerCommandResult> = async () =>
    commandResult();

  async health(): Promise<{ serverVersion: string }> {
    return { serverVersion: '29.0.0' };
  }

  async inspectImage(): Promise<DockerImageInspection> {
    return {
      id: 'sha256:image-id',
      repoDigests: [`${imageReference}@${digest}`],
    };
  }

  async createContainer(input: DockerContainerCreateInput): Promise<string> {
    this.creates.push(input);
    this.removed = false;
    return 'container-123';
  }

  async startContainer(): Promise<void> {
    this.running = true;
  }

  async execute(input: DockerContainerExecInput): Promise<DockerCommandResult> {
    this.executions.push(input);
    return this.executeBehavior(input);
  }

  async inspectContainer(): Promise<DockerContainerInspection | null> {
    if (this.removed) return null;
    return {
      id: 'container-123',
      imageId: 'sha256:image-id',
      name: 'hypha-test',
      running: this.running,
      status: this.running ? 'running' : 'exited',
      exitCode: this.oomKilled ? 137 : 0,
      oomKilled: this.oomKilled,
      startedAt: '2026-07-17T00:00:00.000Z',
      ...(!this.running ? { finishedAt: '2026-07-17T00:00:00.100Z' } : {}),
    };
  }

  async statsContainer(): Promise<DockerContainerStats> {
    return {
      cpuPercentage: 1.5,
      memoryUsageBytes: 1024,
      memoryLimitBytes: 128 * 1024 * 1024,
      networkBytesReceived: 2,
      networkBytesSent: 3,
      readBytes: 4,
      writtenBytes: 5,
      pids: 2,
    };
  }

  async stopContainer(): Promise<void> {
    this.stops += 1;
    this.running = false;
  }

  async killContainer(): Promise<void> {
    this.kills += 1;
    this.running = false;
  }

  async removeContainer(): Promise<void> {
    this.removes += 1;
    this.running = false;
    this.removed = true;
  }
}

describe('DockerExecutionProvider', () => {
  it('creates a pinned least-privilege Sandbox and completes one governed execution', async () => {
    const root = await temporaryWorkspace();
    const engine = new FakeDockerEngine();
    engine.executeBehavior = async () => {
      await fs.writeFile(path.join(root, 'result.txt'), 'done');
      return commandResult({ stdout: 'ok', observedStdoutBytes: 2 });
    };
    const provider = createProvider(root, engine);
    const capabilities = await provider.capabilities();
    expect(capabilities).toMatchObject({
      processIsolation: true,
      filesystemIsolation: true,
      networkIsolation: true,
      cpuLimits: true,
      memoryLimits: true,
      diskLimits: false,
      pidsLimit: true,
      processTreeKill: true,
      imageDigestPinning: true,
    });

    const ready = await createReadySandbox(provider);
    expect(validateSandboxRecord(ready)).toMatchObject({
      status: 'ready',
      revision: 2,
      providerSandboxRef: 'container-123',
      imageDigest: digest,
    });
    expect(engine.creates[0]).toMatchObject({
      image: `${imageReference}@${digest}`,
      user: '65532:65532',
      workspaceMount: { source: await fs.realpath(root), target: '/workspace', readOnly: false },
      network: 'none',
      cpuCores: 1,
      memoryBytes: 128 * 1024 * 1024,
      pidsLimit: 32,
      pullPolicy: 'never',
    });

    const result = await provider.execute(
      command(ready.id, 'execution.docker.success', {
        env: { HYPHA_ALLOWED: 'yes' },
        captureFileMutations: true,
      })
    );
    expect(validateCommandExecutionResult(result)).toMatchObject({
      status: 'completed',
      exitCode: 0,
      stdout: 'ok',
      changedFiles: [expect.objectContaining({ path: 'result.txt', operation: 'created' })],
      resourceUsage: {
        outputBytes: 2,
        peakMemoryBytes: 1024,
        networkBytesReceived: 2,
        networkBytesSent: 3,
        readBytes: 4,
        writtenBytes: 5,
        processCountPeak: 2,
      },
      externalReceipt: {
        providerId: provider.id,
        providerExecutionRef: 'container-123',
        status: 'completed',
      },
      metadata: {
        processTreeKillScope: 'container',
        processTreeTerminationVerified: true,
        metricsCollected: true,
        cpuPercentage: 1.5,
      },
    });
    expect(engine.executions[0]).toMatchObject({
      executable: 'node',
      cwd: '/workspace',
      environment: { HYPHA_ALLOWED: 'yes' },
    });
    expect(engine.stops).toBe(1);
    await expect(provider.status({ sandboxId: ready.id, principal })).resolves.toMatchObject({
      status: 'stopped',
      revision: 5,
    });
    await provider.cleanup({
      operationId: 'operation.cleanup.docker',
      sandboxId: ready.id,
      principal,
      expectedRevision: 5,
    });
    expect(engine.removes).toBe(1);
    await expect(provider.status({ sandboxId: ready.id, principal })).resolves.toMatchObject({
      status: 'cleaned',
      revision: 7,
    });
  });

  it('fails closed for mutable images, unsupported policies, and unsafe command input', async () => {
    const root = await temporaryWorkspace();
    const engine = new FakeDockerEngine();

    await expect(
      createProvider(root, engine).create(
        createRequest({ image: { ...environment().image!, digest: 'sha256:short' } })
      )
    ).rejects.toMatchObject({ normalized: { code: 'EXECUTION_IMAGE_UNTRUSTED' } });
    await expect(
      createProvider(root, engine).create(
        createRequest({ network: { mode: 'restricted', dnsPolicy: 'managed' } })
      )
    ).rejects.toMatchObject({ normalized: { code: 'EXECUTION_NETWORK_DENIED' } });
    await expect(
      createProvider(root, engine).create(
        createRequest({ resources: { ...environment().resources, diskBytes: 1024 } })
      )
    ).rejects.toMatchObject({ normalized: { code: 'EXECUTION_POLICY_DENIED' } });
    await expect(
      createProvider(root, engine).create(
        createRequest({
          image: { ...environment().image!, signaturePolicyRef: 'policy:required' },
        })
      )
    ).rejects.toMatchObject({ normalized: { code: 'EXECUTION_IMAGE_UNTRUSTED' } });
    expect(engine.creates).toHaveLength(0);

    const provider = createProvider(root, engine);
    const ready = await createReadySandbox(provider);
    await expect(
      provider.execute(command(ready.id, 'execution.docker.shell', { shell: true }))
    ).rejects.toMatchObject({ normalized: { code: 'EXECUTION_POLICY_DENIED' } });
    await expect(
      provider.execute(
        command(ready.id, 'execution.docker.env', { env: { PASSWORD: 'not-allowed' } })
      )
    ).rejects.toMatchObject({ normalized: { code: 'EXECUTION_POLICY_DENIED' } });
    await expect(
      provider.execute(command(ready.id, 'execution.docker.path', { cwd: '../outside' }))
    ).rejects.toThrow('traversal');
    await expect(
      provider.execute(command(ready.id, 'execution.docker.snapshot', { snapshotBefore: true }))
    ).rejects.toMatchObject({ normalized: { code: 'EXECUTION_POLICY_DENIED' } });
  });

  it('normalizes timeout, output limit, and OOM evidence after container cleanup', async () => {
    const scenarios: Array<{
      behavior: Partial<DockerCommandResult>;
      oomKilled?: boolean;
      expected: Record<string, unknown>;
    }> = [
      {
        behavior: { exitCode: null, terminationReason: 'timed_out' },
        expected: { status: 'timed_out', exitCode: null, error: { code: 'EXECUTION_TIMEOUT' } },
      },
      {
        behavior: { exitCode: null, terminationReason: 'stdout_limit' },
        expected: {
          status: 'resource_exceeded',
          exitCode: null,
          error: { code: 'EXECUTION_RESOURCE_EXCEEDED' },
        },
      },
      {
        behavior: { exitCode: 137 },
        oomKilled: true,
        expected: {
          status: 'oom_killed',
          exitCode: 137,
          error: { code: 'EXECUTION_OOM_KILLED' },
        },
      },
    ];

    for (const [index, scenario] of scenarios.entries()) {
      const root = await temporaryWorkspace();
      const engine = new FakeDockerEngine();
      engine.oomKilled = scenario.oomKilled ?? false;
      engine.executeBehavior = async () => commandResult(scenario.behavior);
      const provider = createProvider(root, engine);
      const ready = await createReadySandbox(provider);
      await expect(
        provider.execute(command(ready.id, `execution.docker.failure-${index}`))
      ).resolves.toMatchObject(scenario.expected);
      expect(engine.running).toBe(false);
      expect(engine.stops).toBe(1);
    }
  });

  it('cancels an active execution and terminates the whole container scope', async () => {
    const root = await temporaryWorkspace();
    const engine = new FakeDockerEngine();
    engine.executeBehavior = (input) =>
      new Promise((resolve) => {
        input.signal.addEventListener(
          'abort',
          () => resolve(commandResult({ exitCode: null, terminationReason: 'cancelled' })),
          { once: true }
        );
      });
    const provider = createProvider(root, engine);
    const ready = await createReadySandbox(provider);
    const running = provider.execute(command(ready.id, 'execution.docker.cancel'));
    await waitForSandboxStatus(provider, ready.id, 'busy');
    await provider.cancel({
      operationId: 'operation.cancel.docker',
      executionId: 'execution.docker.cancel',
      principal,
      expectedRevision: 2,
      reason: 'test cancellation',
    });
    await expect(running).resolves.toMatchObject({
      status: 'cancelled',
      error: { code: 'EXECUTION_CANCELLED' },
    });
    expect(engine.running).toBe(false);
    expect(engine.stops).toBe(1);
  });

  it('supports active terminate, cleanup, health, and shutdown reconciliation', async () => {
    const root = await temporaryWorkspace();
    const engine = new FakeDockerEngine();
    engine.executeBehavior = (input) =>
      new Promise((resolve) => {
        input.signal.addEventListener(
          'abort',
          () => resolve(commandResult({ exitCode: null, terminationReason: 'cancelled' })),
          { once: true }
        );
      });
    const provider = createProvider(root, engine);
    await expect(provider.health()).resolves.toMatchObject({
      status: 'healthy',
      details: { serverVersion: '29.0.0', processTreeKillScope: 'container' },
    });
    const ready = await createReadySandbox(provider);
    const running = provider.execute(command(ready.id, 'execution.docker.terminate'));
    const busy = await waitForSandboxStatus(provider, ready.id, 'busy');
    await provider.terminate({
      operationId: 'operation.terminate.docker',
      sandboxId: ready.id,
      principal,
      expectedRevision: busy.revision,
    });
    await expect(running).resolves.toMatchObject({ status: 'cancelled' });
    const terminated = await provider.status({ sandboxId: ready.id, principal });
    expect(terminated).toMatchObject({ status: 'terminated' });
    await provider.cleanup({
      operationId: 'operation.cleanup.terminated.docker',
      sandboxId: ready.id,
      principal,
      expectedRevision: terminated!.revision,
    });
    expect(engine.removes).toBe(1);

    const secondEngine = new FakeDockerEngine();
    const second = createProvider(await temporaryWorkspace(), secondEngine);
    await createReadySandbox(second);
    await second.close();
    expect(secondEngine.removes).toBe(1);
    await expect(second.health()).resolves.toMatchObject({ status: 'unhealthy' });
    await expect(second.capabilities()).rejects.toBeInstanceOf(DockerExecutionProviderError);
  });
});

async function temporaryWorkspace(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), 'hypha-docker-provider-'));
}

function createProvider(root: string, engine: DockerEngineClient): DockerExecutionProvider {
  return new DockerExecutionProvider({
    workspaceRoot: root,
    engine,
    keepAliveCommand: ['/hypha/idle'],
    now: fixedNow,
  });
}

function environment(): ExecutionEnvironmentSpec {
  return {
    id: 'execution-environment.docker.safe',
    version: '0.1.0',
    provider: 'docker',
    image: {
      reference: imageReference,
      digest,
      pullPolicy: 'never',
      requireDigestPin: true,
      trustedRegistryRefs: ['registry.example.invalid'],
    },
    process: {
      shellEnabled: false,
      allowedExecutables: ['node'],
      deniedExecutables: ['sh'],
      executableResolution: 'container_path',
      maxOpenFiles: 128,
      allowBackgroundProcesses: false,
      allowDaemonization: false,
      killProcessTreeOnExit: true,
      environmentAllowList: ['HYPHA_ALLOWED'],
      inheritHostEnvironment: false,
    },
    resources: {
      cpuCores: 1,
      memoryMb: 128,
      memorySwapMb: 256,
      pidsLimit: 32,
      maxStdoutBytes: 1024,
      maxStderrBytes: 1024,
      maxCombinedOutputBytes: 2048,
      maxExecutionSeconds: 2,
      oomKillDisable: false,
    },
    filesystem: {
      rootFilesystem: 'read_only',
      mounts: [
        {
          sourceRef: 'workspace:current',
          targetPath: '/workspace',
          mode: 'rw',
          type: 'workspace',
          propagation: 'private',
          noSuid: true,
          noDev: true,
        },
      ],
      tmpfs: [
        {
          targetPath: '/tmp',
          sizeBytes: 1024 * 1024,
          noExec: true,
          noSuid: true,
          noDev: true,
        },
      ],
      allowDeviceAccess: false,
      allowHostPathMounts: false,
    },
    network: {
      mode: 'disabled',
      dnsPolicy: 'disabled',
      blockPrivateNetworks: true,
      blockMetadataEndpoints: true,
    },
    security: {
      runAsUser: '65532',
      runAsGroup: '65532',
      nonRootRequired: true,
      noNewPrivileges: true,
      privileged: false,
      dropCapabilities: ['ALL'],
      readOnlyProc: true,
      maskHostProc: true,
      preventPtrace: true,
      allowNestedContainers: false,
    },
    secrets: {
      injectionMode: 'none',
      redactFromOutput: true,
      redactFromEvents: true,
      revokeOnExecutionEnd: true,
      allowChildProcessInheritance: false,
    },
    logging: { captureStdout: true, captureStderr: true },
    lifecycle: {
      reuse: 'never',
      stopTimeoutMs: 100,
      cleanupTimeoutMs: 1000,
      cleanupOnSuccess: true,
      cleanupOnFailure: true,
    },
    workingDirectoryPolicy: 'workspace_only',
    defaultTimeoutMs: 2000,
  };
}

function createRequest(overrides: Partial<ExecutionEnvironmentSpec> = {}): SandboxCreateRequest {
  return {
    operationId: `operation.create.docker.${(requestSequence += 1)}`,
    principal,
    environment: { ...environment(), ...overrides },
    environmentRevision: 'sha256:docker-environment',
    userId: 'user.docker',
    workspaceId: 'workspace.docker',
    runId: 'run.docker',
  };
}

async function createReadySandbox(provider: DockerExecutionProvider) {
  const created = await provider.create(createRequest());
  return provider.start({
    operationId: 'operation.start.docker',
    sandboxId: created.id,
    principal,
    expectedRevision: created.revision,
  });
}

function command(
  sandboxId: string,
  executionId: string,
  overrides: Partial<CommandExecutionRequest> = {}
): CommandExecutionRequest {
  return {
    executionId,
    operationId: `operation.${executionId}`,
    principal,
    userId: 'user.docker',
    workspaceId: 'workspace.docker',
    runId: 'run.docker',
    sandboxId,
    environmentRef: { id: 'execution-environment.docker.safe', version: '0.1.0' },
    executable: 'node',
    args: ['script.js'],
    shell: false,
    ...overrides,
  };
}

function commandResult(overrides: Partial<DockerCommandResult> = {}): DockerCommandResult {
  return {
    exitCode: 0,
    stdout: '',
    stderr: '',
    observedStdoutBytes: 0,
    observedStderrBytes: 0,
    startedAt: '2026-07-17T00:00:00.000Z',
    completedAt: '2026-07-17T00:00:00.100Z',
    latencyMs: 100,
    ...overrides,
  };
}

async function waitForSandboxStatus(
  provider: DockerExecutionProvider,
  sandboxId: string,
  status: string
) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const record = await provider.status({ sandboxId, principal });
    if (record?.status === status) return record;
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  throw new Error(`Sandbox ${sandboxId} did not reach ${status}.`);
}
