import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import type {
  CommandExecutionRequest,
  ExecutionEnvironmentSpec,
  ExecutionPrincipal,
  SandboxCreateRequest,
} from '@hypha/core';
import {
  DockerCliCommandRunner,
  DockerEngineCli,
  type DockerCommandRequest,
  type DockerCommandResult,
  type DockerCommandRunner,
} from './docker-engine-cli';
import { DockerExecutionProvider } from './docker-execution-provider';

const smokeEnabled = process.env.HYPHA_DOCKER_SMOKE === '1';
const dockerPath = process.env.HYPHA_DOCKER_CLI_PATH;
const imageReference = process.env.HYPHA_DOCKER_IMAGE_REF;
const imageDigest = process.env.HYPHA_DOCKER_IMAGE_DIGEST;

const principal: ExecutionPrincipal = {
  principalId: 'user.docker-smoke',
  type: 'user',
  userId: 'user.docker-smoke',
  permissionScopes: ['execution:sandbox:create', 'execution:command:run'],
};

describe.runIf(smokeEnabled)('DockerExecutionProvider real daemon smoke', () => {
  it('executes in a digest-pinned restricted container and reconciles cleanup', async () => {
    if (!dockerPath || !imageReference || !imageDigest) {
      throw new Error(
        'HYPHA_DOCKER_CLI_PATH, HYPHA_DOCKER_IMAGE_REF, and HYPHA_DOCKER_IMAGE_DIGEST are required.'
      );
    }

    const workspaceRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-docker-smoke-'));
    const provider = createSmokeProvider(workspaceRoot, dockerPath);

    try {
      trace('health:start');
      await expect(provider.health()).resolves.toMatchObject({ status: 'healthy' });
      trace('health:complete');
      trace('create:start');
      const created = await provider.create(
        createRequest(environment(imageReference, imageDigest))
      );
      trace('create:complete');
      trace('start:start');
      const ready = await provider.start({
        operationId: 'operation.start.docker-smoke',
        sandboxId: created.id,
        principal,
        expectedRevision: created.revision,
      });
      trace('start:complete');

      await new Promise((resolve) => setTimeout(resolve, 500));
      trace('execute:start');
      const result = await provider.execute(command(ready.id));
      trace('execute:complete');

      expect(result).toMatchObject({
        status: 'completed',
        exitCode: 0,
        changedFiles: [expect.objectContaining({ path: 'result.rdb', operation: 'created' })],
        externalReceipt: {
          providerId: provider.id,
          status: 'completed',
        },
        metadata: {
          processTreeKillScope: 'container',
          processTreeTerminationVerified: true,
        },
      });
      const artifact = await fs.stat(path.join(workspaceRoot, 'result.rdb'));
      expect(artifact.size).toBeGreaterThan(0);

      const stopped = await provider.status({ sandboxId: ready.id, principal });
      expect(stopped).toMatchObject({ status: 'stopped' });
      trace('cleanup:start');
      await provider.cleanup({
        operationId: 'operation.cleanup.docker-smoke',
        sandboxId: ready.id,
        principal,
        expectedRevision: stopped!.revision,
      });
      trace('cleanup:complete');
      await expect(provider.status({ sandboxId: ready.id, principal })).resolves.toMatchObject({
        status: 'cleaned',
      });
    } finally {
      trace('close:start');
      await provider.close();
      await fs.rm(workspaceRoot, { recursive: true, force: true });
      trace('close:complete');
    }
  }, 60_000);

  it('times out an active exec and stops the complete container scope', async () => {
    if (!dockerPath || !imageReference || !imageDigest) {
      throw new Error(
        'HYPHA_DOCKER_CLI_PATH, HYPHA_DOCKER_IMAGE_REF, and HYPHA_DOCKER_IMAGE_DIGEST are required.'
      );
    }

    const workspaceRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-docker-timeout-'));
    const provider = createSmokeProvider(workspaceRoot, dockerPath);

    try {
      const created = await provider.create(
        createRequest(environment(imageReference, imageDigest), 'timeout')
      );
      const ready = await provider.start({
        operationId: 'operation.start.docker-smoke.timeout',
        sandboxId: created.id,
        principal,
        expectedRevision: created.revision,
      });

      await new Promise((resolve) => setTimeout(resolve, 500));
      trace('timeout-execute:start');
      const result = await provider.execute(
        command(ready.id, 'timeout', {
          args: ['DEBUG', 'SLEEP', '30'],
          timeoutMs: 500,
          captureFileMutations: false,
        })
      );
      trace('timeout-execute:complete');

      expect(result).toMatchObject({
        status: 'timed_out',
        exitCode: null,
        error: { code: 'EXECUTION_TIMEOUT' },
        metadata: {
          processTreeKillScope: 'container',
          processTreeTerminationVerified: true,
          terminationReason: 'timed_out',
        },
      });
      const stopped = await provider.status({ sandboxId: ready.id, principal });
      expect(stopped).toMatchObject({ status: 'stopped' });
      await provider.cleanup({
        operationId: 'operation.cleanup.docker-smoke.timeout',
        sandboxId: ready.id,
        principal,
        expectedRevision: stopped!.revision,
      });
      await expect(provider.status({ sandboxId: ready.id, principal })).resolves.toMatchObject({
        status: 'cleaned',
      });
    } finally {
      await provider.close();
      await fs.rm(workspaceRoot, { recursive: true, force: true });
    }
  }, 60_000);

  it('cancels an active exec and stops the complete container scope', async () => {
    if (!dockerPath || !imageReference || !imageDigest) {
      throw new Error(
        'HYPHA_DOCKER_CLI_PATH, HYPHA_DOCKER_IMAGE_REF, and HYPHA_DOCKER_IMAGE_DIGEST are required.'
      );
    }

    const workspaceRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-docker-cancel-'));
    const provider = createSmokeProvider(workspaceRoot, dockerPath);

    try {
      const created = await provider.create(
        createRequest(environment(imageReference, imageDigest), 'cancel')
      );
      const ready = await provider.start({
        operationId: 'operation.start.docker-smoke.cancel',
        sandboxId: created.id,
        principal,
        expectedRevision: created.revision,
      });

      await new Promise((resolve) => setTimeout(resolve, 500));
      trace('cancel-execute:start');
      const running = provider.execute(
        command(ready.id, 'cancel', {
          args: ['DEBUG', 'SLEEP', '30'],
          timeoutMs: 15_000,
          captureFileMutations: false,
        })
      );
      await waitForSandboxStatus(provider, ready.id, 'busy');
      await provider.cancel({
        operationId: 'operation.cancel.docker-smoke',
        executionId: 'execution.docker-smoke.cancel',
        principal,
        expectedRevision: 2,
        reason: 'Docker smoke cancellation',
      });
      const result = await running;
      trace('cancel-execute:complete');

      expect(result).toMatchObject({
        status: 'cancelled',
        exitCode: null,
        error: { code: 'EXECUTION_CANCELLED' },
        metadata: {
          processTreeKillScope: 'container',
          processTreeTerminationVerified: true,
          terminationReason: 'cancelled',
        },
      });
      const stopped = await provider.status({ sandboxId: ready.id, principal });
      expect(stopped).toMatchObject({ status: 'stopped' });
      await provider.cleanup({
        operationId: 'operation.cleanup.docker-smoke.cancel',
        sandboxId: ready.id,
        principal,
        expectedRevision: stopped!.revision,
      });
      await expect(provider.status({ sandboxId: ready.id, principal })).resolves.toMatchObject({
        status: 'cleaned',
      });
    } finally {
      await provider.close();
      await fs.rm(workspaceRoot, { recursive: true, force: true });
    }
  }, 60_000);
});

async function waitForSandboxStatus(
  provider: DockerExecutionProvider,
  sandboxId: string,
  expectedStatus: string
): Promise<void> {
  const deadline = Date.now() + 5_000;
  while (Date.now() < deadline) {
    const record = await provider.status({ sandboxId, principal });
    if (record?.status === expectedStatus) return;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  throw new Error(`Sandbox ${sandboxId} did not reach ${expectedStatus}.`);
}

function environment(reference: string, digest: string): ExecutionEnvironmentSpec {
  return {
    id: 'execution-environment.docker-smoke',
    version: '0.1.0',
    provider: 'docker',
    image: {
      reference,
      digest,
      pullPolicy: 'never',
      requireDigestPin: true,
      trustedRegistryRefs: [reference],
    },
    process: {
      shellEnabled: false,
      allowedExecutables: ['redis-cli'],
      deniedExecutables: [],
      executableResolution: 'container_path',
      maxOpenFiles: 128,
      allowBackgroundProcesses: false,
      allowDaemonization: false,
      killProcessTreeOnExit: true,
      environmentAllowList: [],
      inheritHostEnvironment: false,
    },
    resources: {
      cpuCores: 1,
      memoryMb: 128,
      memorySwapMb: 256,
      pidsLimit: 32,
      maxStdoutBytes: 4096,
      maxStderrBytes: 4096,
      maxCombinedOutputBytes: 8192,
      maxExecutionSeconds: 15,
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
          sizeBytes: 16 * 1024 * 1024,
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
      stopTimeoutMs: 1000,
      cleanupTimeoutMs: 5000,
      cleanupOnSuccess: true,
      cleanupOnFailure: true,
    },
    workingDirectoryPolicy: 'workspace_only',
    defaultTimeoutMs: 15_000,
  };
}

function createRequest(
  environmentSpec: ExecutionEnvironmentSpec,
  suffix = 'success'
): SandboxCreateRequest {
  return {
    operationId: `operation.create.docker-smoke.${suffix}`,
    principal,
    environment: environmentSpec,
    environmentRevision: 'sha256:docker-smoke-environment',
    userId: 'user.docker-smoke',
    workspaceId: 'workspace.docker-smoke',
    runId: 'run.docker-smoke',
  };
}

function command(
  sandboxId: string,
  suffix = 'success',
  overrides: Partial<CommandExecutionRequest> = {}
): CommandExecutionRequest {
  return {
    executionId: `execution.docker-smoke.${suffix}`,
    operationId: `operation.execute.docker-smoke.${suffix}`,
    principal,
    userId: 'user.docker-smoke',
    workspaceId: 'workspace.docker-smoke',
    runId: 'run.docker-smoke',
    sandboxId,
    environmentRef: { id: 'execution-environment.docker-smoke', version: '0.1.0' },
    executable: 'redis-cli',
    args: ['--rdb', '/workspace/result.rdb'],
    cwd: '.',
    shell: false,
    captureFileMutations: true,
    ...overrides,
  };
}

function createSmokeProvider(
  workspaceRoot: string,
  executablePath: string
): DockerExecutionProvider {
  const commandRunner = new DockerCliCommandRunner({
    dockerPath: executablePath,
    environment: dockerCliEnvironment(executablePath),
  });
  const engine = new DockerEngineCli({
    runner: tracingRunner(commandRunner),
    managementTimeoutMs: 30_000,
  });
  return new DockerExecutionProvider({
    workspaceRoot,
    engine,
    keepAliveCommand: [
      'redis-server',
      '--appendonly',
      'no',
      '--dir',
      '/tmp',
      '--bind',
      '127.0.0.1',
      '--enable-debug-command',
      'yes',
    ],
    maxExecutionTimeoutMs: 15_000,
  });
}

function dockerCliEnvironment(executablePath: string): Record<string, string> {
  const environment: Record<string, string> = { PATH: path.dirname(executablePath) };
  for (const name of ['SystemRoot', 'USERPROFILE', 'DOCKER_CONFIG']) {
    const value = process.env[name];
    if (value) environment[name] = value;
  }
  return environment;
}

function trace(message: string): void {
  if (process.env.HYPHA_DOCKER_SMOKE_TRACE === '1') {
    process.stderr.write(`[docker-smoke] ${message}\n`);
  }
}

function tracingRunner(delegate: DockerCommandRunner): DockerCommandRunner {
  return {
    async run(request: DockerCommandRequest): Promise<DockerCommandResult> {
      trace(`docker ${JSON.stringify(request.args)}`);
      const result = await delegate.run(request);
      if (result.stderr) trace(`stderr ${JSON.stringify(result.stderr)}`);
      trace(
        `exit ${String(result.exitCode)}${result.terminationReason ? ` ${result.terminationReason}` : ''}`
      );
      return result;
    },
  };
}
