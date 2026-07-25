import os from 'node:os';
import type {
  CommandExecutionRequest,
  ExecutionEnvironmentSpec,
  SandboxCreateRequest,
} from '@hypha/core';
import { describe, expect, it } from 'vitest';
import { LocalSandboxLifecycle } from './local-sandbox-lifecycle';

const now = '2026-07-17T00:00:00.000Z';
const principal = {
  principalId: 'principal.local',
  type: 'user' as const,
  userId: 'user.local',
  permissionScopes: ['execution.run'],
};

describe('LocalSandboxLifecycle', () => {
  it('owns deterministic create, start, busy, completion, and revision transitions', () => {
    const lifecycle = createLifecycle();
    const created = lifecycle.create(createRequest(), { trustBoundary: 'trusted_local' });
    expect(created).toMatchObject({ status: 'created', revision: 0, providerId: 'provider.local' });
    const ready = lifecycle.start({
      operationId: 'operation.start',
      sandboxId: created.id,
      principal,
      expectedRevision: 0,
    });
    expect(ready).toMatchObject({ status: 'ready', revision: 2 });

    const environment = lifecycle.environmentForCommand(command(created.id));
    expect(environment.provider).toBe('local_process');
    expect(lifecycle.markBusy(created.id, 'execution.local')).toMatchObject({
      status: 'busy',
      activeExecutionIds: ['execution.local'],
    });
    expect(lifecycle.markExecutionComplete(created.id, 'execution.local', now)).toMatchObject({
      status: 'ready',
      activeExecutionIds: [],
    });
  });

  it('enforces principal scope, environment reference, and revision fencing', () => {
    const lifecycle = createLifecycle();
    const created = lifecycle.create(createRequest(), {});
    lifecycle.start({
      operationId: 'operation.start',
      sandboxId: created.id,
      principal,
      expectedRevision: 0,
    });

    expect(() =>
      lifecycle.environmentForCommand(
        command(created.id, { userId: 'other-user', workspaceId: 'workspace.local' })
      )
    ).toThrow('Command identity does not match the Sandbox scope.');
    expect(() =>
      lifecycle.environmentForCommand(
        command(created.id, { environmentRef: { id: 'other', version: '0.1.0' } })
      )
    ).toThrow('does not match the Sandbox environment');
    expect(() =>
      lifecycle.beginTermination({
        operationId: 'operation.terminate',
        sandboxId: created.id,
        principal,
        expectedRevision: 99,
      })
    ).toThrow('revision 2 does not match expected revision 99');
  });

  it('prevents cleanup while busy and records retryable cleanup after termination', () => {
    const lifecycle = createLifecycle();
    const created = lifecycle.create(createRequest(), {});
    lifecycle.start({
      operationId: 'operation.start',
      sandboxId: created.id,
      principal,
      expectedRevision: 0,
    });
    const busy = lifecycle.markBusy(created.id, 'execution.local');
    expect(() =>
      lifecycle.cleanup({
        operationId: 'operation.cleanup.busy',
        sandboxId: created.id,
        principal,
        expectedRevision: busy.revision,
      })
    ).toThrow('must finish termination before cleanup');

    const terminating = lifecycle.beginTermination({
      operationId: 'operation.terminate',
      sandboxId: created.id,
      principal,
      expectedRevision: busy.revision,
    });
    const terminated = lifecycle.finishTermination(created.id);
    expect(terminating.status).toBe('terminating');
    lifecycle.cleanup({
      operationId: 'operation.cleanup',
      sandboxId: created.id,
      principal,
      expectedRevision: terminated.revision,
    });
    expect(lifecycle.status({ sandboxId: created.id, principal })).toMatchObject({
      status: 'cleaned',
      activeExecutionIds: [],
    });
  });

  it('rejects duplicate deterministic Sandbox creation', () => {
    const lifecycle = createLifecycle();
    lifecycle.create(createRequest(), {});
    expect(() => lifecycle.create(createRequest(), {})).toThrow('already exists');
  });
});

function createLifecycle(): LocalSandboxLifecycle {
  return new LocalSandboxLifecycle({
    providerId: 'provider.local',
    workspaceRoot: os.tmpdir(),
    now: () => now,
  });
}

function createRequest(): SandboxCreateRequest {
  return {
    operationId: 'operation.create.local',
    principal,
    environment: environment(),
    environmentRevision: 'sha256:local-environment',
    userId: 'user.local',
    workspaceId: 'workspace.local',
    runId: 'run.local',
  };
}

function command(
  sandboxId: string,
  overrides: Partial<CommandExecutionRequest> = {}
): CommandExecutionRequest {
  return {
    executionId: 'execution.local',
    operationId: 'operation.command.local',
    principal,
    userId: 'user.local',
    workspaceId: 'workspace.local',
    runId: 'run.local',
    sandboxId,
    environmentRef: { id: 'execution-environment.local.safe', version: '0.1.0' },
    executable: 'node',
    ...overrides,
  };
}

function environment(): ExecutionEnvironmentSpec {
  return {
    id: 'execution-environment.local.safe',
    version: '0.1.0',
    provider: 'local_process',
    process: {
      shellEnabled: false,
      allowedExecutables: ['node'],
      executableResolution: 'path_allowlist',
      allowBackgroundProcesses: false,
      allowDaemonization: false,
      killProcessTreeOnExit: true,
      inheritHostEnvironment: false,
    },
    resources: {},
    filesystem: { rootFilesystem: 'writable', mounts: [] },
    network: { mode: 'enabled' },
    security: { nonRootRequired: true, noNewPrivileges: true, privileged: false },
    secrets: { injectionMode: 'none', redactFromOutput: true, redactFromEvents: true },
    logging: { captureStdout: true, captureStderr: true },
    lifecycle: { reuse: 'run' },
    workingDirectoryPolicy: 'workspace_only',
    defaultTimeoutMs: 2_000,
  };
}
