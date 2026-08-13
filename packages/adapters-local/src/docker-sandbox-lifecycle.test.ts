import type {
  CommandExecutionRequest,
  ExecutionEnvironmentSpec,
  SandboxCreateRequest,
} from '@codesoul-co/hypha-core';
import { describe, expect, it } from 'vitest';
import { DockerSandboxLifecycle } from './docker-sandbox-lifecycle';

const now = '2026-07-28T00:00:00.000Z';
const principal = {
  principalId: 'principal.docker',
  type: 'user' as const,
  userId: 'user.docker',
  tenantId: 'tenant.docker',
  permissionScopes: ['execution.run'],
};

describe('DockerSandboxLifecycle', () => {
  it('owns Docker Sandbox identity, readiness, busy state, and revision transitions', () => {
    const lifecycle = createLifecycle();
    const created = lifecycle.create(createRequest(), { isolation: 'docker' });
    expect(created).toMatchObject({
      status: 'created',
      revision: 0,
      providerId: 'provider.docker',
      providerSandboxRef: expect.stringMatching(/^docker:[a-f0-9]{16}:[a-f0-9]{16}$/),
      imageDigest: `sha256:${'a'.repeat(64)}`,
      metadata: { isolation: 'docker' },
    });

    const ready = lifecycle.start({
      operationId: 'operation.docker.start',
      sandboxId: created.id,
      principal,
      expectedRevision: created.revision,
    });
    expect(ready).toMatchObject({ status: 'ready', revision: 2 });
    expect(lifecycle.environmentForCommand(command(created.id)).provider).toBe('docker');

    const busy = lifecycle.markBusy(created.id, 'execution.docker');
    expect(busy).toMatchObject({
      status: 'busy',
      activeExecutionIds: ['execution.docker'],
    });
    expect(lifecycle.markExecutionComplete(created.id, 'execution.docker', now)).toMatchObject({
      status: 'ready',
      activeExecutionIds: [],
    });
  });

  it('fences revision and rejects cross-scope or mismatched environment commands', () => {
    const lifecycle = createLifecycle();
    const created = lifecycle.create(createRequest(), {});
    lifecycle.start({
      operationId: 'operation.docker.start',
      sandboxId: created.id,
      principal,
      expectedRevision: 0,
    });

    expect(() =>
      lifecycle.environmentForCommand(command(created.id, { workspaceId: 'workspace.other' }))
    ).toThrow('Command identity does not match the Sandbox scope.');
    expect(() =>
      lifecycle.environmentForCommand(command(created.id, { runId: 'run.other' }))
    ).toThrow('Command identity does not match the Sandbox scope.');
    expect(() =>
      lifecycle.environmentForCommand(
        command(created.id, {
          environmentRef: { id: 'environment.other', version: '0.1.0' },
        })
      )
    ).toThrow('does not match the Sandbox environment');
    expect(() =>
      lifecycle.beginTermination({
        operationId: 'operation.docker.terminate',
        sandboxId: created.id,
        principal,
        expectedRevision: 99,
      })
    ).toThrow('revision 2 does not match expected revision 99');
  });

  it('requires termination before cleanup and leaves no active execution identity', () => {
    const lifecycle = createLifecycle();
    const created = lifecycle.create(createRequest(), {});
    lifecycle.start({
      operationId: 'operation.docker.start',
      sandboxId: created.id,
      principal,
      expectedRevision: 0,
    });
    const busy = lifecycle.markBusy(created.id, 'execution.docker');
    expect(() => lifecycle.markExecutionComplete(created.id, 'execution.other', now)).toThrow(
      'does not match the active Sandbox execution'
    );
    expect(() =>
      lifecycle.cleanup({
        operationId: 'operation.docker.cleanup.busy',
        sandboxId: created.id,
        principal,
        expectedRevision: busy.revision,
      })
    ).toThrow('must finish termination before cleanup');

    lifecycle.beginTermination({
      operationId: 'operation.docker.terminate',
      sandboxId: created.id,
      principal,
      expectedRevision: busy.revision,
    });
    const terminated = lifecycle.finishTermination(created.id);
    lifecycle.cleanup({
      operationId: 'operation.docker.cleanup',
      sandboxId: created.id,
      principal,
      expectedRevision: terminated.revision,
    });
    expect(lifecycle.status({ sandboxId: created.id, principal })).toMatchObject({
      status: 'cleaned',
      activeExecutionIds: [],
    });
  });
});

function createLifecycle(): DockerSandboxLifecycle {
  return new DockerSandboxLifecycle({
    providerId: 'provider.docker',
    engineScopeId: 'engine.desktop-linux',
    now: () => now,
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
    ...overrides,
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
