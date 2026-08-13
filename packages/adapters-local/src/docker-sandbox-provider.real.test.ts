import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  SandboxProviderRegistry,
  type SandboxProvider,
  type CommandExecutionRequest,
  type ExecutionEnvironmentSpec,
  type SandboxCreateRequest,
} from '@codesoul-co/core';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { DockerCliTransport, type DockerCliResult } from './docker-cli-transport';
import { DockerEngineCliClient } from './docker-engine-client';
import { type DockerExecutionArtifactStreamPort } from './docker-execution-output-collector';
import { DockerSandboxProviderFactory } from './docker-sandbox-provider-factory';
import { shortExecutionHash } from './execution-provider-values';
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
const principal = {
  principalId: 'principal.docker.real',
  type: 'user' as const,
  userId: 'user.docker.real',
  tenantId: 'tenant.docker.real',
  permissionScopes: ['execution.run'],
};

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

describe('DockerSandboxProvider real daemon', () => {
  it('executes through the Provider and completes Sandbox termination and cleanup', async () => {
    const workspace = await temporaryWorkspace('success');
    const executionId = 'execution.docker.provider.real.success';
    const containerName = providerContainerName(executionId);
    containerNames.push(containerName);
    const artifacts = new RecordingArtifactPort();
    const provider = await createProvider(workspace, artifacts);
    const ready = await createAndStart(provider, 'success');

    await expect(provider.health()).resolves.toMatchObject({
      status: 'healthy',
      details: {
        isolation: 'docker',
        factoryRegistered: true,
      },
    });
    const probe = versionProbeCommand();
    const result = await provider.execute(
      command(ready.id, executionId, probe.executable, probe.args)
    );

    expect(result).toMatchObject({
      executionId,
      revision: 2,
      sandboxId: ready.id,
      status: 'completed',
      exitCode: 0,
      stdoutArtifactRef: `artifact.${executionId}.stdout`,
      generatedArtifactRefs: [`artifact.${executionId}.stdout`],
      externalReceipt: {
        providerId: 'provider.docker.real',
        executionId,
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
    expect(artifacts.content('stdout').toString('utf8')).toContain(probe.expectedOutput);
    await expect(engine.inspectContainer(containerName)).resolves.toBeNull();

    const idle = await provider.status({ sandboxId: ready.id, principal });
    if (!idle) throw new Error('Expected ready Docker Sandbox after execution.');
    expect(idle).toMatchObject({ status: 'ready', activeExecutionIds: [] });
    await provider.terminate({
      operationId: 'operation.docker.provider.real.terminate',
      sandboxId: idle.id,
      principal,
      expectedRevision: idle.revision,
    });
    const terminated = await provider.status({ sandboxId: idle.id, principal });
    if (!terminated) throw new Error('Expected terminated Docker Sandbox.');
    await provider.cleanup({
      operationId: 'operation.docker.provider.real.cleanup',
      sandboxId: terminated.id,
      principal,
      expectedRevision: terminated.revision,
    });
    await expect(provider.status({ sandboxId: terminated.id, principal })).resolves.toMatchObject({
      status: 'cleaned',
      activeExecutionIds: [],
    });
    await provider.close?.();
  }, 60_000);

  it('cancels a real Provider execution and removes the execution container', async () => {
    const workspace = await temporaryWorkspace('cancel');
    const executionId = 'execution.docker.provider.real.cancel';
    const containerName = providerContainerName(executionId);
    containerNames.push(containerName);
    const provider = await createProvider(workspace, new RecordingArtifactPort());
    const ready = await createAndStart(provider, 'cancel');

    const execution = provider.execute(command(ready.id, executionId, 'sleep', ['30']));
    await waitForContainer(containerName);
    const cancellation = provider.cancel({
      operationId: 'operation.docker.provider.real.cancel',
      executionId,
      principal,
      expectedRevision: 2,
      reason: 'real provider acceptance cancellation',
    });

    await expect(execution).resolves.toMatchObject({
      status: 'cancelled',
      error: { code: 'EXECUTION_CANCELLED', retryable: false },
      metadata: {
        cleanup: {
          complete: true,
          containerAbsent: true,
          stopAttempted: true,
        },
        processTreeTerminationVerified: true,
      },
    });
    await expect(cancellation).resolves.toBeUndefined();
    await expect(engine.inspectContainer(containerName)).resolves.toBeNull();
    await expect(provider.status({ sandboxId: ready.id, principal })).resolves.toMatchObject({
      status: 'ready',
      activeExecutionIds: [],
    });
    await provider.close?.();
  }, 60_000);
});

async function createProvider(
  workspaceRoot: string,
  artifacts: DockerExecutionArtifactStreamPort
): Promise<SandboxProvider> {
  const registry = new SandboxProviderRegistry();
  registry.register(
    new DockerSandboxProviderFactory({
      providerId: 'provider.docker.real',
      engineScopeId: 'desktop-linux.real-provider',
      policy: {
        workspaceRoot,
        containerCommand: ['sleep', 'infinity'],
        maxCpuCores: 0.25,
        maxMemoryBytes: 64 * 1024 * 1024,
        maxPidsLimit: 32,
        maxTempBytes: 4 * 1024 * 1024,
        maxCleanupStopTimeoutSeconds: 1,
      },
      outputArtifacts: artifacts,
      transport,
    })
  );
  return registry.create({
    provider: 'docker',
    providerRef: 'provider.docker.real',
  });
}

async function createAndStart(provider: SandboxProvider, caseName: string) {
  const created = await provider.create(createRequest(caseName));
  expect(created).toMatchObject({
    status: 'created',
    providerId: 'provider.docker.real',
    imageDigest,
  });
  return provider.start({
    operationId: `operation.docker.provider.real.${caseName}.start`,
    sandboxId: created.id,
    principal,
    expectedRevision: created.revision,
  });
}

function createRequest(caseName: string): SandboxCreateRequest {
  return {
    operationId: `operation.docker.provider.real.${caseName}.create`,
    principal,
    environment: environment(),
    environmentRevision: `revision.docker.provider.real.${caseName}`,
    tenantId: 'tenant.docker.real',
    userId: 'user.docker.real',
    workspaceId: 'workspace.docker.real',
    runId: `run.docker.real.${caseName}`,
  };
}

function command(
  sandboxId: string,
  executionId: string,
  executable: string,
  args: string[]
): CommandExecutionRequest {
  return {
    executionId,
    operationId: `${executionId}.command`,
    principal,
    tenantId: 'tenant.docker.real',
    userId: 'user.docker.real',
    workspaceId: 'workspace.docker.real',
    runId: executionId.endsWith('.success') ? 'run.docker.real.success' : 'run.docker.real.cancel',
    sandboxId,
    environmentRef: {
      id: 'execution-environment.docker.real',
      version: '0.1.0',
      revision: 'revision.docker.real',
    },
    executable,
    args,
    captureArtifacts: true,
    captureFileMutations: true,
  };
}

function environment(): ExecutionEnvironmentSpec {
  return {
    id: 'execution-environment.docker.real',
    version: '0.1.0',
    revision: 'revision.docker.real',
    provider: 'docker',
    image: {
      reference: image,
      digest: imageDigest,
      pullPolicy: 'if_not_present',
      requireDigestPin: true,
    },
    process: {
      shellEnabled: false,
      allowedExecutables: [versionProbeCommand().executable, 'sleep'],
      executableResolution: 'container_path',
      killProcessTreeOnExit: true,
      inheritHostEnvironment: false,
    },
    resources: {
      cpuCores: 0.25,
      memoryMb: 64,
      pidsLimit: 32,
      tempBytes: 4 * 1024 * 1024,
      maxStdoutBytes: 1024,
      maxStderrBytes: 1024,
      maxCombinedOutputBytes: 2048,
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
      tmpfs: [{ targetPath: '/tmp', sizeBytes: 4 * 1024 * 1024 }],
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
    secrets: {
      injectionMode: 'none',
      redactFromOutput: true,
      redactFromEvents: true,
    },
    logging: {
      captureStdout: true,
      captureStderr: true,
      streamOutput: true,
      persistOutputAsArtifact: true,
    },
    lifecycle: {
      reuse: 'never',
      cleanupOnSuccess: true,
      cleanupOnFailure: true,
    },
    workingDirectoryPolicy: 'workspace_only',
    defaultTimeoutMs: 5_000,
  };
}

type ExecutionTestRuntime = 'redis' | 'python';

function executionTestRuntime(value: string | undefined): ExecutionTestRuntime {
  const runtime = value ?? 'redis';
  if (runtime !== 'redis' && runtime !== 'python') {
    throw new Error('HYPHA_REAL_DOCKER_TEST_RUNTIME must be redis or python.');
  }
  return runtime;
}

function versionProbeCommand(): Readonly<{
  executable: string;
  args: string[];
  expectedOutput: string;
}> {
  return testRuntime === 'python'
    ? { executable: 'python', args: ['--version'], expectedOutput: 'Python' }
    : { executable: 'redis-cli', args: ['--version'], expectedOutput: 'redis-cli' };
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

function providerContainerName(executionId: string): string {
  return `hypha-${shortExecutionHash(executionId)}`;
}

async function temporaryWorkspace(caseName: string): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), `hypha-docker-provider-${caseName}-`));
  temporaryWorkspaces.push(root);
  return root;
}

async function waitForContainer(containerName: string): Promise<void> {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const inspection = await engine.inspectContainer(containerName);
    if (inspection?.running) return;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  throw new Error('Docker Provider acceptance container did not start.');
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
