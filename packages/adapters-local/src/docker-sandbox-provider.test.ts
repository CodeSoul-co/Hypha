import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type {
  CommandExecutionRequest,
  CommandExecutionResult,
  ExecutionEnvironmentSpec,
  SandboxCreateRequest,
  SandboxRecord,
} from '@codesoul-co/hypha-core';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DockerExecutionCoordinatorError,
  type DockerExecutionCoordinatorInput,
} from './docker-execution-coordinator';
import { DockerExecutionPolicyResolver } from './docker-execution-policy';
import { DockerSandboxProvider } from './docker-sandbox-provider';
import { hashExecutionText } from './execution-provider-values';

const now = '2026-07-28T00:00:00.000Z';
const principal = {
  principalId: 'principal.docker',
  type: 'user' as const,
  userId: 'user.docker',
  tenantId: 'tenant.docker',
  permissionScopes: ['execution.run'],
};

describe('DockerSandboxProvider', () => {
  let workspaceRoot: string;

  beforeEach(async () => {
    workspaceRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-docker-provider-'));
  });

  afterEach(async () => {
    await fs.rm(workspaceRoot, { recursive: true, force: true });
  });

  it('composes policy, lifecycle, and coordinator without publishing a Factory', async () => {
    const coordinator = new RecordingCoordinator();
    const assertAvailable = vi.fn(async () => undefined);
    const provider = createProvider(coordinator, assertAvailable);
    const sandbox = await createAndStart(provider);

    expect(await provider.capabilities()).toMatchObject({
      processIsolation: true,
      filesystemIsolation: true,
      imageDigestPinning: true,
      diskLimits: false,
      snapshots: false,
    });
    expect(assertAvailable).toHaveBeenCalledOnce();
    expect(sandbox.imageDigest).toBe(`sha256:${'a'.repeat(64)}`);

    const result = await provider.execute(command(sandbox.id));
    expect(result).toMatchObject({
      executionId: 'execution.docker',
      revision: 2,
      sandboxId: sandbox.id,
      status: 'completed',
    });
    expect(coordinator.inputs).toHaveLength(1);
    expect(coordinator.inputs[0]).toMatchObject({
      providerId: 'provider.docker',
      executionId: 'execution.docker',
      sandboxId: sandbox.id,
      scopeId: expect.stringMatching(/^scope\.[a-f0-9]{16}$/),
      createInput: {
        name: expect.stringMatching(/^hypha-[a-f0-9]{16}$/),
        image: 'redis',
        imageDigest: `sha256:${'a'.repeat(64)}`,
        networkMode: 'none',
        readOnlyRoot: true,
        labels: {},
      },
      execInput: {
        executable: 'redis-cli',
        args: ['PING'],
      },
    });
    expect(
      await provider.status({ sandboxId: sandbox.id, principal })
    ).toMatchObject({ status: 'ready', activeExecutionIds: [] });
    await expect(provider.execute(command(sandbox.id))).rejects.toThrow(
      'Execution execution.docker already completed.'
    );
  });

  it('rejects cross-scope commands before invoking the coordinator', async () => {
    const coordinator = new RecordingCoordinator();
    const provider = createProvider(coordinator);
    const sandbox = await createAndStart(provider);

    await expect(
      provider.execute(command(sandbox.id, { workspaceId: 'workspace.other' }))
    ).rejects.toThrow('Command identity does not match the Sandbox scope.');
    await expect(
      provider.execute(command(sandbox.id, { executable: 'sh' }))
    ).rejects.toThrow('Executable sh is not allowed');
    expect(coordinator.inputs).toHaveLength(0);
  });

  it('propagates cancellation through the coordinator signal and restores readiness', async () => {
    const coordinator = new BlockingCoordinator('cancelled');
    const provider = createProvider(coordinator);
    const sandbox = await createAndStart(provider);
    const execution = provider.execute(command(sandbox.id));
    await coordinator.started;

    const cancellation = provider.cancel({
      operationId: 'operation.docker.cancel',
      executionId: 'execution.docker',
      principal,
      expectedRevision: 2,
      reason: 'operator cancelled',
    });
    await expect(execution).resolves.toMatchObject({ status: 'cancelled' });
    await expect(cancellation).resolves.toBeUndefined();
    expect(coordinator.abortReason).toBe('operator cancelled');
    expect(
      await provider.status({ sandboxId: sandbox.id, principal })
    ).toMatchObject({ status: 'ready', activeExecutionIds: [] });
  });

  it('terminates active execution before allowing Sandbox cleanup', async () => {
    const coordinator = new BlockingCoordinator('cancelled');
    const provider = createProvider(coordinator);
    const sandbox = await createAndStart(provider);
    const execution = provider.execute(command(sandbox.id));
    await coordinator.started;
    const busy = await provider.status({ sandboxId: sandbox.id, principal });
    expect(busy).toMatchObject({ status: 'busy', activeExecutionIds: ['execution.docker'] });
    if (!busy) throw new Error('Expected active Docker Sandbox record.');

    const termination = provider.terminate({
      operationId: 'operation.docker.terminate',
      sandboxId: sandbox.id,
      principal,
      expectedRevision: busy.revision,
      reason: 'operator terminated Sandbox',
    });
    await expect(execution).resolves.toMatchObject({ status: 'cancelled' });
    await expect(termination).resolves.toBeUndefined();
    const terminated = await provider.status({ sandboxId: sandbox.id, principal });
    expect(terminated).toMatchObject({ status: 'terminated', activeExecutionIds: [] });
    if (!terminated) throw new Error('Expected terminated Docker Sandbox record.');

    await provider.cleanup({
      operationId: 'operation.docker.cleanup',
      sandboxId: sandbox.id,
      principal,
      expectedRevision: terminated.revision,
    });
    expect(await provider.status({ sandboxId: sandbox.id, principal })).toMatchObject({
      status: 'cleaned',
      activeExecutionIds: [],
    });
  });

  it('normalizes coordinator evidence failure and remains close-idempotent', async () => {
    const coordinator = new FailingCoordinator();
    const provider = createProvider(coordinator);
    const sandbox = await createAndStart(provider);

    await expect(provider.execute(command(sandbox.id))).rejects.toMatchObject({
      normalizedError: {
        code: 'EXECUTION_INTERNAL_ERROR',
        retryable: true,
        details: {
          phase: 'collect',
          evidenceCode: 'DOCKER_INVALID_RESPONSE',
          cleanup: {
            complete: true,
            containerAbsent: true,
          },
        },
      },
    });
    expect(
      await provider.status({ sandboxId: sandbox.id, principal })
    ).toMatchObject({ status: 'ready', activeExecutionIds: [] });

    await provider.close();
    await provider.close();
    await expect(provider.health()).resolves.toMatchObject({ status: 'unhealthy' });
    await expect(provider.capabilities()).rejects.toThrow('Docker provider is closed.');
  });

  function createProvider(
    coordinator: Pick<RecordingCoordinator, 'execute'>,
    assertAvailable: () => Promise<void> = async () => undefined
  ): DockerSandboxProvider {
    return new DockerSandboxProvider({
      coordinator,
      policy: new DockerExecutionPolicyResolver({
        workspaceRoot,
        containerCommand: ['sleep', 'infinity'],
      }),
      assertAvailable,
      engineScopeId: 'desktop-linux',
      now: () => now,
      executionId: () => 'execution.docker',
    });
  }
});

class RecordingCoordinator {
  readonly inputs: DockerExecutionCoordinatorInput[] = [];

  async execute(input: DockerExecutionCoordinatorInput): Promise<CommandExecutionResult> {
    this.inputs.push(structuredClone(input));
    return result(input, 'completed');
  }
}

class BlockingCoordinator extends RecordingCoordinator {
  readonly started: Promise<void>;
  abortReason: unknown;
  private readonly signalStarted: () => void;

  constructor(private readonly status: 'cancelled') {
    super();
    const deferred = createDeferred();
    this.started = deferred.promise;
    this.signalStarted = deferred.resolve;
  }

  override async execute(
    input: DockerExecutionCoordinatorInput
  ): Promise<CommandExecutionResult> {
    this.inputs.push(input);
    this.signalStarted();
    await aborted(input.execInput.signal);
    this.abortReason = input.execInput.signal.reason;
    return result(input, this.status);
  }
}

class FailingCoordinator extends RecordingCoordinator {
  override async execute(
    input: DockerExecutionCoordinatorInput
  ): Promise<CommandExecutionResult> {
    this.inputs.push(input);
    throw new DockerExecutionCoordinatorError('collect', 'DOCKER_INVALID_RESPONSE', {
      complete: true,
      containerAbsent: true,
      stopAttempted: false,
    });
  }
}

async function createAndStart(provider: DockerSandboxProvider): Promise<SandboxRecord> {
  const created = await provider.create(createRequest());
  return provider.start({
    operationId: 'operation.docker.start',
    sandboxId: created.id,
    principal,
    expectedRevision: created.revision,
  });
}

function createRequest(): SandboxCreateRequest {
  return {
    operationId: 'operation.docker.create',
    principal,
    environment: environment(),
    environmentRevision: 'sha256:docker-environment',
    tenantId: 'tenant.docker',
    userId: 'user.docker',
    workspaceId: 'workspace.docker',
    runId: 'run.docker',
  };
}

function command(
  sandboxId: string,
  overrides: Partial<CommandExecutionRequest> = {}
): CommandExecutionRequest {
  return {
    executionId: 'execution.docker',
    operationId: 'operation.docker.command',
    principal,
    tenantId: 'tenant.docker',
    userId: 'user.docker',
    workspaceId: 'workspace.docker',
    runId: 'run.docker',
    sandboxId,
    environmentRef: {
      id: 'execution-environment.docker.safe',
      version: '0.1.0',
      revision: 'revision.docker.safe',
    },
    executable: 'redis-cli',
    args: ['PING'],
    ...overrides,
  };
}

function result(
  input: DockerExecutionCoordinatorInput,
  status: 'completed' | 'cancelled'
): CommandExecutionResult {
  const stdout = status === 'completed' ? 'PONG' : '';
  const stderr = '';
  return {
    executionId: input.executionId,
    revision: input.revision,
    sandboxId: input.sandboxId,
    status,
    exitCode: status === 'completed' ? 0 : null,
    stdout,
    stderr,
    stdoutContentHash: hashExecutionText(stdout),
    stderrContentHash: hashExecutionText(stderr),
    changedFiles: [],
    generatedArtifactRefs: [],
    startedAt: now,
    completedAt: now,
    latencyMs: 0,
    ...(status === 'cancelled'
      ? {
          error: {
            code: 'EXECUTION_CANCELLED' as const,
            message: 'Docker execution was cancelled.',
            retryable: false,
          },
        }
      : {}),
  };
}

function environment(): ExecutionEnvironmentSpec {
  return {
    id: 'execution-environment.docker.safe',
    version: '0.1.0',
    revision: 'revision.docker.safe',
    provider: 'docker',
    image: {
      reference: 'redis',
      digest: `sha256:${'a'.repeat(64)}`,
      pullPolicy: 'if_not_present',
      requireDigestPin: true,
    },
    process: {
      shellEnabled: false,
      allowedExecutables: ['redis-cli'],
      executableResolution: 'container_path',
      killProcessTreeOnExit: true,
      inheritHostEnvironment: false,
    },
    resources: {
      cpuCores: 0.5,
      memoryMb: 128,
      pidsLimit: 64,
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
      allowDeviceAccess: false,
      allowHostPathMounts: false,
    },
    network: { mode: 'disabled', dnsPolicy: 'disabled' },
    security: {
      runAsUser: '65532',
      runAsGroup: '65532',
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
    defaultTimeoutMs: 2_000,
  };
}

function createDeferred(): { promise: Promise<void>; resolve: () => void } {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

function aborted(signal: AbortSignal): Promise<void> {
  if (signal.aborted) return Promise.resolve();
  return new Promise((resolve) => {
    signal.addEventListener('abort', () => resolve(), { once: true });
  });
}
