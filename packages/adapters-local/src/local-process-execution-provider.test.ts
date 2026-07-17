import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  createExecutionFrameworkEvent,
  validateCommandExecutionResult,
  validateSandboxRecord,
  type CommandExecutionRequest,
  type ExecutionEnvironmentSpec,
  type SandboxCreateRequest,
} from '@hypha/core';
import {
  LocalProcessExecutionProvider,
  LocalProcessExecutionProviderError,
} from './local-process-execution-provider';

const fixedNow = () => '2026-07-17T00:00:00.000Z';
const principal = {
  principalId: 'user.local',
  type: 'user' as const,
  userId: 'user.local',
  permissionScopes: ['execution:sandbox:create', 'execution:command:run'],
};

describe('LocalProcessExecutionProvider', () => {
  it('reports only observed capabilities and fails closed on unverified Windows tree kill', async () => {
    const root = await temporaryWorkspace();
    const provider = createProvider(root, { allowBestEffortWindowsProcessTreeKill: false });
    const capabilities = await provider.capabilities();

    expect(capabilities).toMatchObject({
      processIsolation: false,
      filesystemIsolation: false,
      networkIsolation: false,
      cancellation: true,
      processTreeKill: process.platform !== 'win32',
      snapshots: false,
    });
    await expect(provider.health()).resolves.toMatchObject({
      status: process.platform === 'win32' ? 'degraded' : 'healthy',
      details: { processTreeKillVerified: process.platform !== 'win32' },
    });
    if (process.platform === 'win32') {
      await expect(provider.create(createRequest())).rejects.toMatchObject({
        normalizedError: { code: 'EXECUTION_ENVIRONMENT_UNAVAILABLE' },
      });
    } else {
      await expect(provider.create(createRequest())).resolves.toMatchObject({ status: 'created' });
    }
  });

  it('executes an allowlisted command with filtered environment and file mutation evidence', async () => {
    const root = await temporaryWorkspace();
    await fs.mkdir(path.join(root, 'work'));
    const provider = createProvider(root, {
      baseEnvironment: { HYPHA_ALLOWED: 'base', HYPHA_HIDDEN: 'hidden' },
    });
    const ready = await createReadySandbox(provider);
    const result = await provider.execute(
      command(
        ready.id,
        'execution.local.success',
        [
          '-e',
          [
            "require('fs').writeFileSync('result.txt', 'done')",
            "process.stdout.write(process.env.HYPHA_ALLOWED ?? 'missing')",
            "process.stderr.write(process.env.HYPHA_HIDDEN ?? 'hidden-not-present')",
          ].join(';'),
        ],
        {
          cwd: 'work',
          env: { HYPHA_ALLOWED: 'request' },
          captureFileMutations: true,
        }
      )
    );

    expect(validateCommandExecutionResult(result)).toMatchObject({
      status: 'completed',
      exitCode: 0,
      stdout: 'request',
      stderr: 'hidden-not-present',
      changedFiles: [expect.objectContaining({ path: 'work/result.txt', operation: 'created' })],
      resourceUsage: { processCountPeak: 1 },
      metadata: {
        terminationMechanism:
          process.platform === 'win32' ? 'windows_taskkill' : 'posix_process_group',
      },
    });
    const event = createExecutionFrameworkEvent({
      id: 'event.local.completed',
      type: 'command.execution.completed',
      workspaceId: 'workspace.local',
      runId: 'run.local',
      timestamp: fixedNow(),
      payload: {
        operationId: 'operation.command.local',
        executionId: result.executionId,
        revision: result.revision,
        providerId: provider.id,
        sandboxId: result.sandboxId,
        workspaceId: 'workspace.local',
        status: result.status,
        exitCode: result.exitCode,
        latencyMs: result.latencyMs,
        resourceUsage: result.resourceUsage,
      },
    });
    expect(event.type).toBe('command.execution.completed');

    const afterExecution = await provider.status({ sandboxId: ready.id, principal });
    expect(validateSandboxRecord(afterExecution)).toMatchObject({ status: 'ready', revision: 4 });
    await provider.cleanup({
      operationId: 'operation.cleanup.local',
      sandboxId: ready.id,
      principal,
      expectedRevision: 4,
    });
    await expect(provider.status({ sandboxId: ready.id, principal })).resolves.toMatchObject({
      status: 'cleaned',
      revision: 6,
    });
  });

  it('rejects shell, unmapped executables, forbidden environment, and escaped cwd', async () => {
    const root = await temporaryWorkspace();
    await fs.mkdir(path.join(root, 'work'));
    const provider = createProvider(root);
    const ready = await createReadySandbox(provider);

    await expect(
      provider.execute(command(ready.id, 'execution.local.shell', ['-e', ''], { shell: true }))
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_POLICY_DENIED' } });
    await expect(
      provider.execute({
        ...command(ready.id, 'execution.local.unmapped', []),
        executable: 'unmapped',
      })
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_POLICY_DENIED' } });
    await expect(
      provider.execute(
        command(ready.id, 'execution.local.env', ['-e', ''], {
          env: { NOT_ALLOWED: 'secret' },
        })
      )
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_POLICY_DENIED' } });
    await expect(
      provider.execute(command(ready.id, 'execution.local.cwd', ['-e', ''], { cwd: '../outside' }))
    ).rejects.toThrow();
    await expect(provider.status({ sandboxId: ready.id, principal })).resolves.toMatchObject({
      status: 'ready',
      revision: 2,
    });
  });

  it('normalizes timeout, output limit, and a subsequent retry result', async () => {
    const root = await temporaryWorkspace();
    const provider = createProvider(root, {
      maxStdoutBytes: 32,
      maxCombinedOutputBytes: 32,
    });
    const ready = await createReadySandbox(provider);

    await expect(
      provider.execute(
        command(ready.id, 'execution.local.timeout', ['-e', 'setInterval(() => {}, 1000)'], {
          timeoutMs: 40,
        })
      )
    ).resolves.toMatchObject({
      status: 'timed_out',
      exitCode: null,
      error: { code: 'EXECUTION_TIMEOUT', retryable: true },
    });
    await expect(
      provider.execute(
        command(ready.id, 'execution.local.output', [
          '-e',
          "process.stdout.write('x'.repeat(4096)); setInterval(() => {}, 1000)",
        ])
      )
    ).resolves.toMatchObject({
      status: 'resource_exceeded',
      exitCode: null,
      error: { code: 'EXECUTION_OUTPUT_LIMIT' },
    });
    await expect(
      provider.execute(
        command(ready.id, 'execution.local.retry', ['-e', "process.stdout.write('retry-ok')"])
      )
    ).resolves.toMatchObject({ status: 'completed', stdout: 'retry-ok' });
  });

  it('cancels through AbortSignal and terminates an active Sandbox before cleanup', async () => {
    const root = await temporaryWorkspace();
    const provider = createProvider(root);
    const ready = await createReadySandbox(provider);
    const cancellation = provider.execute(
      command(ready.id, 'execution.local.cancel', ['-e', 'setInterval(() => {}, 1000)'])
    );
    await waitForSandboxStatus(provider, ready.id, 'busy');
    await provider.cancel({
      operationId: 'operation.cancel.local',
      executionId: 'execution.local.cancel',
      principal,
      expectedRevision: 2,
    });
    await expect(cancellation).resolves.toMatchObject({
      status: 'cancelled',
      revision: 4,
      exitCode: null,
      error: { code: 'EXECUTION_CANCELLED' },
    });

    const activeExecution = provider.execute(
      command(ready.id, 'execution.local.terminate', ['-e', 'setInterval(() => {}, 1000)'])
    );
    const beforeTerminate = await waitForSandboxStatus(provider, ready.id, 'busy');
    await provider.terminate({
      operationId: 'operation.terminate.local',
      sandboxId: ready.id,
      principal,
      expectedRevision: beforeTerminate.revision,
      reason: 'test termination',
    });
    await expect(activeExecution).resolves.toMatchObject({ status: 'cancelled' });
    const terminated = await provider.status({ sandboxId: ready.id, principal });
    expect(terminated).toMatchObject({ status: 'terminated', activeExecutionIds: [] });
    await provider.cleanup({
      operationId: 'operation.cleanup.terminated',
      sandboxId: ready.id,
      principal,
      expectedRevision: terminated!.revision,
    });
    await expect(provider.status({ sandboxId: ready.id, principal })).resolves.toMatchObject({
      status: 'cleaned',
    });
  });

  it('returns normalized revision errors and unhealthy state after close', async () => {
    const root = await temporaryWorkspace();
    const provider = createProvider(root);
    const created = await provider.create(createRequest());
    await expect(
      provider.start({
        operationId: 'operation.start.stale',
        sandboxId: created.id,
        principal,
        expectedRevision: 99,
      })
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_REVISION_CONFLICT' },
    });
    await provider.close();
    await expect(provider.health()).resolves.toMatchObject({ status: 'unhealthy' });
    await expect(provider.capabilities()).rejects.toBeInstanceOf(
      LocalProcessExecutionProviderError
    );
  });
});

async function temporaryWorkspace(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-provider-'));
}

function createProvider(
  workspaceRoot: string,
  overrides: Partial<ConstructorParameters<typeof LocalProcessExecutionProvider>[0]> = {}
): LocalProcessExecutionProvider {
  return new LocalProcessExecutionProvider({
    workspaceRoot,
    executables: { node: process.execPath },
    allowBestEffortWindowsProcessTreeKill: true,
    gracefulTerminationMs: 10,
    now: fixedNow,
    ...overrides,
  });
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
      environmentAllowList: ['HYPHA_ALLOWED'],
      environmentDenyList: ['HYPHA_HIDDEN'],
      inheritHostEnvironment: false,
    },
    resources: {
      maxStdoutBytes: 1_024,
      maxStderrBytes: 1_024,
      maxCombinedOutputBytes: 2_048,
      maxExecutionSeconds: 2,
      maxIdleSeconds: 1,
      oomKillDisable: false,
    },
    filesystem: {
      rootFilesystem: 'writable',
      mounts: [],
      allowDeviceAccess: false,
      allowHostPathMounts: false,
    },
    network: { mode: 'enabled', dnsPolicy: 'system' },
    security: {
      nonRootRequired: true,
      noNewPrivileges: true,
      privileged: false,
      allowNestedContainers: false,
    },
    secrets: {
      injectionMode: 'none',
      redactFromOutput: true,
      redactFromEvents: true,
    },
    logging: { captureStdout: true, captureStderr: true },
    lifecycle: {
      reuse: 'run',
      cleanupOnSuccess: true,
      cleanupOnFailure: true,
    },
    workingDirectoryPolicy: 'workspace_only',
    defaultTimeoutMs: 2_000,
  };
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

async function createReadySandbox(provider: LocalProcessExecutionProvider) {
  const created = await provider.create(createRequest());
  return provider.start({
    operationId: 'operation.start.local',
    sandboxId: created.id,
    principal,
    expectedRevision: created.revision,
  });
}

function command(
  sandboxId: string,
  executionId: string,
  args: string[],
  overrides: Partial<CommandExecutionRequest> = {}
): CommandExecutionRequest {
  return {
    executionId,
    operationId: 'operation.command.local',
    principal,
    userId: 'user.local',
    workspaceId: 'workspace.local',
    runId: 'run.local',
    sandboxId,
    environmentRef: { id: 'execution-environment.local.safe', version: '0.1.0' },
    executable: 'node',
    args,
    shell: false,
    ...overrides,
  };
}

async function waitForSandboxStatus(
  provider: LocalProcessExecutionProvider,
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
