import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type {
  CommandExecutionRequest,
  ExecutionEnvironmentSpec,
  SandboxCreateRequest,
} from '@hypha/core';
import { describe, expect, it } from 'vitest';
import type { DockerCliResult } from './docker-cli-transport';
import type {
  DockerContainerCreateInput,
  DockerContainerExecInput,
  DockerContainerInspection,
  DockerEngineClient,
  DockerResourceSnapshot,
} from './docker-engine-client';
import { DockerExecutionProvider } from './docker-execution-provider';

const digest = `sha256:${'a'.repeat(64)}`;
const principal = {
  principalId: 'principal.docker',
  type: 'user' as const,
  userId: 'user.docker',
  permissionScopes: ['execution.run'],
};

describe('DockerExecutionProvider', () => {
  it('runs the full provider lifecycle with mutation, metrics, receipt, stop, and cleanup', async () => {
    const workspace = await temporaryWorkspace();
    const engine = new FakeDockerEngine(async () => {
      await fs.writeFile(path.join(workspace, 'result.txt'), 'artifact');
      return commandResult('completed');
    });
    const provider = new DockerExecutionProvider({ workspaceRoot: workspace, engine });
    const ready = await createReady(provider);
    const result = await provider.execute(
      command(ready.id, 'execution.docker.success', { captureFileMutations: true })
    );

    expect(result).toMatchObject({
      revision: 3,
      status: 'completed',
      stdout: 'completed',
      changedFiles: [{ path: 'result.txt', operation: 'created' }],
      resourceUsage: { peakMemoryBytes: 1024, processCountPeak: 2 },
      externalReceipt: { providerId: 'provider.docker', status: 'completed' },
      metadata: { processTreeTerminationVerified: true, metricsCollected: true },
    });
    const stopped = await provider.status({ sandboxId: ready.id, principal });
    expect(stopped).toMatchObject({ status: 'stopped', activeExecutionIds: [] });
    await provider.cleanup({
      operationId: 'operation.cleanup.docker',
      sandboxId: ready.id,
      principal,
      expectedRevision: stopped!.revision,
    });
    expect(engine.removed).toEqual(['container123']);
    await provider.close();
  });

  it('propagates cancellation to both Docker exec transport and the container process tree', async () => {
    const engine = new FakeDockerEngine(
      (input) =>
        new Promise((resolve) => {
          input.signal.addEventListener('abort', () => resolve(commandResult('', 'cancelled')), {
            once: true,
          });
        })
    );
    const provider = new DockerExecutionProvider({
      workspaceRoot: await temporaryWorkspace(),
      engine,
    });
    const ready = await createReady(provider);
    const execution = provider.execute(command(ready.id, 'execution.docker.cancel'));
    await waitForStatus(provider, ready.id, 'busy');
    await provider.cancel({
      operationId: 'operation.cancel.docker',
      executionId: 'execution.docker.cancel',
      principal,
      expectedRevision: 2,
    });
    await expect(execution).resolves.toMatchObject({
      revision: 4,
      status: 'cancelled',
      error: { code: 'EXECUTION_CANCELLED' },
    });
    expect(engine.killed).toContain('container123');
    await provider.close();
  });

  it('fails closed for image, network, secret, and path policy violations', async () => {
    const workspace = await temporaryWorkspace();
    const engine = new FakeDockerEngine(async () => commandResult('ok'));
    const provider = new DockerExecutionProvider({ workspaceRoot: workspace, engine });
    const untrusted = environment();
    untrusted.image!.digest = `sha256:${'b'.repeat(64)}`;
    await expect(provider.create(createRequest(untrusted))).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_IMAGE_UNTRUSTED' },
    });
    const networked = environment();
    networked.network.mode = 'enabled';
    await expect(provider.create(createRequest(networked))).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_NETWORK_DENIED' },
    });

    const ready = await createReady(provider);
    await expect(
      provider.execute(command(ready.id, 'execution.docker.secret', { secretRefs: ['secret://x'] }))
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_SECRET_DENIED' } });
    await expect(
      provider.execute(command(ready.id, 'execution.docker.path', { cwd: '../outside' }))
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_PATH_ESCAPE' } });
    await provider.close();
  });
});

class FakeDockerEngine implements DockerEngineClient {
  running = false;
  readonly removed: string[] = [];
  readonly killed: string[] = [];
  constructor(
    private readonly executeCommand: (input: DockerContainerExecInput) => Promise<DockerCliResult>
  ) {}

  async health(): Promise<{ serverVersion: string }> {
    return { serverVersion: 'test' };
  }
  async inspectImage(): Promise<{ id: string; repoDigests: string[] }> {
    return { id: digest, repoDigests: [`redis@${digest}`] };
  }
  async createContainer(_input: DockerContainerCreateInput): Promise<string> {
    return 'container123';
  }
  async startContainer(): Promise<void> {
    this.running = true;
  }
  execute(input: DockerContainerExecInput): Promise<DockerCliResult> {
    return this.executeCommand(input);
  }
  async inspectContainer(): Promise<DockerContainerInspection> {
    return {
      id: 'container123',
      running: this.running,
      status: this.running ? 'running' : 'exited',
      exitCode: 0,
      imageDigest: digest,
    };
  }
  async resourceSnapshot(): Promise<DockerResourceSnapshot> {
    return { memoryBytes: 1024, cpuPercent: 1, processCount: 2 };
  }
  async stopContainer(): Promise<void> {
    this.running = false;
  }
  async killContainer(containerId: string): Promise<void> {
    this.killed.push(containerId);
    this.running = false;
  }
  async removeContainer(containerId: string): Promise<void> {
    this.removed.push(containerId);
    this.running = false;
  }
}

function commandResult(
  stdout: string,
  outcome: DockerCliResult['outcome'] = 'exited'
): DockerCliResult {
  return {
    outcome,
    exitCode: outcome === 'exited' ? 0 : null,
    stdout,
    stderr: '',
    observedStdoutBytes: Buffer.byteLength(stdout),
    observedStderrBytes: 0,
    startedAt: '2026-07-17T00:00:00.000Z',
    completedAt: '2026-07-17T00:00:01.000Z',
    latencyMs: 1_000,
  };
}

async function temporaryWorkspace(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), 'hypha-docker-provider-'));
}

function createRequest(value: ExecutionEnvironmentSpec = environment()): SandboxCreateRequest {
  return {
    operationId: 'operation.create.docker',
    principal,
    environment: value,
    environmentRevision: 'sha256:docker-environment',
    userId: 'user.docker',
    workspaceId: 'workspace.docker',
    runId: 'run.docker',
  };
}

async function createReady(provider: DockerExecutionProvider) {
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
    executable: 'cp',
    args: ['/etc/hostname', '/workspace/result.txt'],
    shell: false,
    ...overrides,
  };
}

async function waitForStatus(provider: DockerExecutionProvider, sandboxId: string, status: string) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const record = await provider.status({ sandboxId, principal });
    if (record?.status === status) return record;
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  throw new Error(`Sandbox ${sandboxId} did not reach ${status}.`);
}

function environment(): ExecutionEnvironmentSpec {
  return {
    id: 'execution-environment.docker.safe',
    version: '0.1.0',
    provider: 'docker',
    image: { reference: 'redis', digest, requireDigestPin: true, pullPolicy: 'never' },
    process: {
      shellEnabled: false,
      allowedExecutables: ['cp'],
      executableResolution: 'container_path',
      allowBackgroundProcesses: false,
      allowDaemonization: false,
      killProcessTreeOnExit: true,
      environmentAllowList: ['HYPHA_ALLOWED'],
      inheritHostEnvironment: false,
    },
    resources: {
      cpuCores: 0.5,
      memoryMb: 128,
      pidsLimit: 64,
      maxStdoutBytes: 1024,
      maxStderrBytes: 1024,
      maxCombinedOutputBytes: 2048,
      maxExecutionSeconds: 2,
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
    defaultTimeoutMs: 2_000,
  };
}
