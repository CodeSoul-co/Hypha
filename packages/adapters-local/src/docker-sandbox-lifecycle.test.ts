import type {
  CommandExecutionRequest,
  ExecutionEnvironmentSpec,
  SandboxCreateRequest,
} from '@hypha/core';
import { describe, expect, it } from 'vitest';
import type { DockerEnvironmentPolicy } from './docker-execution-policy';
import { DockerSandboxLifecycle } from './docker-sandbox-lifecycle';

const now = '2026-07-18T00:00:00.000Z';
const digest = `sha256:${'a'.repeat(64)}`;
const principal = {
  principalId: 'principal.docker.lifecycle',
  type: 'user' as const,
  userId: 'user.docker.lifecycle',
  permissionScopes: ['execution.run'],
};

describe('DockerSandboxLifecycle', () => {
  it('owns deterministic create, start, execute, stop, and revision transitions', () => {
    const lifecycle = createLifecycle();
    const created = lifecycle.create(createRequest(), policy(), 'container123', {
      trustBoundary: 'docker_container',
    });
    expect(created).toMatchObject({
      id: 'sandbox.docker.test',
      status: 'created',
      revision: 0,
      providerId: 'provider.docker',
      providerSandboxRef: 'container123',
      imageDigest: digest,
      metadata: { trustBoundary: 'docker_container' },
    });

    const starting = lifecycle.beginStart({
      operationId: 'operation.start.docker',
      sandboxId: created.id,
      principal,
      expectedRevision: 0,
    });
    expect(starting.record).toMatchObject({ status: 'starting', revision: 1 });
    expect(starting.containerId).toBe('container123');
    expect(lifecycle.markReady(created.id)).toMatchObject({ status: 'ready', revision: 2 });

    expect(lifecycle.commandState(command(created.id))).toMatchObject({
      record: { status: 'ready', revision: 2 },
      environment: { provider: 'docker' },
      policy: { digest },
    });
    lifecycle.markBusy(created.id, 'execution.docker.lifecycle');
    expect(lifecycle.status({ sandboxId: created.id, principal })).toMatchObject({
      status: 'busy',
      revision: 3,
      activeExecutionIds: ['execution.docker.lifecycle'],
    });
    lifecycle.markExecutionStopped(created.id, 'execution.docker.lifecycle', now);
    expect(lifecycle.status({ sandboxId: created.id, principal })).toMatchObject({
      status: 'stopped',
      revision: 5,
      activeExecutionIds: [],
    });
  });

  it('enforces principal, command scope, environment reference, readiness, and revision fencing', () => {
    const lifecycle = createLifecycle();
    const created = lifecycle.create(createRequest(), policy(), 'container123', {});

    expect(
      captureError(() =>
        lifecycle.status({
          sandboxId: created.id,
          principal: { ...principal, userId: 'user.other' },
        })
      )
    ).toMatchObject({ normalizedError: { code: 'EXECUTION_PERMISSION_DENIED' } });
    expect(captureError(() => lifecycle.commandState(command(undefined)))).toMatchObject({
      normalizedError: { code: 'EXECUTION_INVALID_REQUEST' },
    });
    expect(captureError(() => lifecycle.commandState(command(created.id)))).toMatchObject({
      normalizedError: { code: 'EXECUTION_ENVIRONMENT_UNAVAILABLE', retryable: true },
    });

    lifecycle.beginStart({
      operationId: 'operation.start.docker',
      sandboxId: created.id,
      principal,
      expectedRevision: 0,
    });
    lifecycle.markReady(created.id);
    expect(
      captureError(() =>
        lifecycle.commandState(command(created.id, { workspaceId: 'workspace.other' }))
      )
    ).toMatchObject({ normalizedError: { code: 'EXECUTION_PERMISSION_DENIED' } });
    expect(
      captureError(() =>
        lifecycle.commandState(
          command(created.id, {
            environmentRef: { id: 'execution-environment.other', version: '0.1.0' },
          })
        )
      )
    ).toMatchObject({ normalizedError: { code: 'EXECUTION_ENVIRONMENT_UNAVAILABLE' } });
    expect(
      captureError(() =>
        lifecycle.beginTermination({
          operationId: 'operation.terminate.docker',
          sandboxId: created.id,
          principal,
          expectedRevision: 99,
        })
      )
    ).toMatchObject({
      normalizedError: {
        code: 'EXECUTION_REVISION_CONFLICT',
        retryable: true,
        details: { actualRevision: 2, expectedRevision: 99 },
      },
    });
  });

  it('requires termination before cleanup and makes termination and cleanup idempotent', () => {
    const lifecycle = createLifecycle();
    const created = lifecycle.create(createRequest(), policy(), 'container123', {});
    lifecycle.beginStart({
      operationId: 'operation.start.docker',
      sandboxId: created.id,
      principal,
      expectedRevision: 0,
    });
    lifecycle.markReady(created.id);
    lifecycle.markBusy(created.id, 'execution.docker.lifecycle');

    expect(
      captureError(() =>
        lifecycle.beginCleanup({
          operationId: 'operation.cleanup.busy',
          sandboxId: created.id,
          principal,
          expectedRevision: 3,
        })
      )
    ).toMatchObject({
      normalizedError: { code: 'EXECUTION_CLEANUP_FAILED', retryable: true },
    });

    expect(
      lifecycle.beginTermination({
        operationId: 'operation.terminate.docker',
        sandboxId: created.id,
        principal,
        expectedRevision: 3,
      }).record
    ).toMatchObject({ status: 'terminating', revision: 4 });
    lifecycle.finishTermination(created.id);
    lifecycle.finishTermination(created.id);
    expect(lifecycle.status({ sandboxId: created.id, principal })).toMatchObject({
      status: 'terminated',
      revision: 5,
      activeExecutionIds: [],
    });

    expect(
      lifecycle.beginCleanup({
        operationId: 'operation.cleanup.docker',
        sandboxId: created.id,
        principal,
        expectedRevision: 5,
      }).record
    ).toMatchObject({ status: 'cleaning', revision: 6 });
    lifecycle.finishCleanup(created.id);
    lifecycle.finishCleanup(created.id);
    expect(lifecycle.status({ sandboxId: created.id, principal })).toMatchObject({
      status: 'cleaned',
      revision: 7,
    });
    expect(lifecycle.uncleaned()).toEqual([]);
  });

  it('records startup failure without exposing mutable internal state', () => {
    const lifecycle = createLifecycle();
    const created = lifecycle.create(createRequest(), policy(), 'container123', {});
    created.status = 'cleaned';
    lifecycle.markFailed('sandbox.docker.test', {
      code: 'EXECUTION_SANDBOX_START_FAILED',
      message: 'Docker start failed.',
      retryable: true,
    });

    expect(lifecycle.status({ sandboxId: 'sandbox.docker.test', principal })).toMatchObject({
      status: 'failed',
      revision: 1,
      error: { code: 'EXECUTION_SANDBOX_START_FAILED', retryable: true },
    });
    expect(lifecycle.uncleaned()).toHaveLength(1);
  });

  it('rejects duplicate deterministic Sandbox creation and reports unknown status as null', () => {
    const lifecycle = createLifecycle();
    lifecycle.create(createRequest(), policy(), 'container123', {});
    expect(
      captureError(() => lifecycle.create(createRequest(), policy(), 'container456', {}))
    ).toMatchObject({ normalizedError: { code: 'EXECUTION_IDEMPOTENCY_CONFLICT' } });
    expect(lifecycle.status({ sandboxId: 'sandbox.unknown', principal })).toBeNull();
  });
});

function createLifecycle(): DockerSandboxLifecycle {
  return new DockerSandboxLifecycle({
    providerId: 'provider.docker',
    now: () => now,
    sandboxId: () => 'sandbox.docker.test',
  });
}

function createRequest(): SandboxCreateRequest {
  return {
    operationId: 'operation.create.docker',
    principal,
    environment: environment(),
    environmentRevision: 'sha256:docker-environment',
    userId: 'user.docker.lifecycle',
    workspaceId: 'workspace.docker.lifecycle',
    runId: 'run.docker.lifecycle',
  };
}

function command(
  sandboxId: string | undefined,
  overrides: Partial<CommandExecutionRequest> = {}
): CommandExecutionRequest {
  return {
    executionId: 'execution.docker.lifecycle',
    operationId: 'operation.command.docker',
    principal,
    userId: 'user.docker.lifecycle',
    workspaceId: 'workspace.docker.lifecycle',
    runId: 'run.docker.lifecycle',
    ...(sandboxId ? { sandboxId } : {}),
    environmentRef: { id: 'execution-environment.docker.safe', version: '0.1.0' },
    executable: 'cp',
    ...overrides,
  };
}

function policy(): DockerEnvironmentPolicy {
  return {
    image: 'redis',
    digest,
    user: '999:999',
    workspaceReadOnly: false,
    cpuCores: 0.5,
    memoryBytes: 128 * 1024 * 1024,
    pidsLimit: 64,
    stopTimeoutSeconds: 1,
  };
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
      inheritHostEnvironment: false,
    },
    resources: {
      cpuCores: 0.5,
      memoryMb: 128,
      pidsLimit: 64,
      maxStdoutBytes: 1_024,
      maxStderrBytes: 1_024,
      maxCombinedOutputBytes: 2_048,
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
    lifecycle: { reuse: 'never', cleanupOnSuccess: true, cleanupOnFailure: true },
    workingDirectoryPolicy: 'workspace_only',
    defaultTimeoutMs: 2_000,
  };
}

function captureError(action: () => unknown): unknown {
  try {
    action();
  } catch (error) {
    return error;
  }
  throw new Error('Expected Docker Sandbox lifecycle operation to fail.');
}
