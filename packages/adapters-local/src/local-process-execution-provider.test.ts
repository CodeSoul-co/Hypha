import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type {
  CommandExecutionRequest,
  ExecutionEnvironmentSpec,
  SandboxCreateRequest,
} from '@hypha/core';
import { describe, expect, it } from 'vitest';
import { LocalProcessExecutionProvider } from './local-process-execution-provider';

const principal = {
  principalId: 'principal.local',
  type: 'user' as const,
  userId: 'user.local',
  permissionScopes: ['execution.run'],
};

describe('LocalProcessExecutionProvider', () => {
  it('runs a governed command with output, mutation, resource, receipt, and revision evidence', async () => {
    const workspace = await temporaryWorkspace();
    const provider = createProvider(workspace);
    const ready = await createReadySandbox(provider);
    const result = await provider.execute(
      command(
        ready.id,
        'execution.local.success',
        [
          '-e',
          "require('fs').writeFileSync('result.txt', 'artifact'); process.stdout.write(process.env.HYPHA_ALLOWED ?? 'missing')",
        ],
        {
          env: { HYPHA_ALLOWED: 'visible' },
          captureFileMutations: true,
        }
      )
    );

    expect(result).toMatchObject({
      revision: 3,
      status: 'completed',
      exitCode: 0,
      stdout: 'visible',
      stdoutContentHash: 'sha256:d42ef1497900bc6e542c641a896c88694d15069b8a11247f66ba7342b6c21cd9',
      stderrContentHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      changedFiles: [{ path: 'result.txt', operation: 'created' }],
      resourceUsage: { outputBytes: 7, processCountPeak: 1 },
      externalReceipt: {
        providerId: 'provider.local-process',
        executionId: 'execution.local.success',
        status: 'completed',
      },
      metadata: { accountingMode: 'local_observed_output_only' },
    });
    expect(result.externalReceipt?.receiptHash).toMatch(/^sha256:[0-9a-f]{64}$/);
    await provider.close();
  });

  it('normalizes timeout and output-limit outcomes', async () => {
    const provider = createProvider(await temporaryWorkspace());
    const ready = await createReadySandbox(provider);
    const timedOut = await provider.execute(
      command(ready.id, 'execution.local.timeout', ['-e', 'setInterval(() => {}, 1000)'], {
        timeoutMs: 40,
      })
    );
    expect(timedOut).toMatchObject({
      status: 'timed_out',
      error: { code: 'EXECUTION_TIMEOUT' },
    });
    const limited = await provider.execute(
      command(
        ready.id,
        'execution.local.output',
        ['-e', "process.stdout.write('你'.repeat(128)); setInterval(() => {}, 1000)"],
        { maxStdoutBytes: 16 }
      )
    );
    expect(limited).toMatchObject({
      status: 'resource_exceeded',
      error: { code: 'EXECUTION_OUTPUT_LIMIT' },
    });
    expect(limited.resourceUsage?.outputBytes).toBeGreaterThan(16);
    await provider.close();
  });

  it('cancels a running command with identity and execution revision fencing', async () => {
    const provider = createProvider(await temporaryWorkspace());
    const ready = await createReadySandbox(provider);
    const execution = provider.execute(
      command(ready.id, 'execution.local.cancel', ['-e', 'setInterval(() => {}, 1000)'])
    );
    await waitForStatus(provider, ready.id, 'busy');
    await provider.cancel({
      operationId: 'operation.cancel.local',
      executionId: 'execution.local.cancel',
      principal,
      expectedRevision: 2,
    });
    await expect(execution).resolves.toMatchObject({
      revision: 4,
      status: 'cancelled',
      error: { code: 'EXECUTION_CANCELLED' },
    });
    await provider.close();
  });

  it('rejects shell, secrets, escaped cwd, and environment bypasses through the full provider', async () => {
    const provider = createProvider(await temporaryWorkspace());
    const ready = await createReadySandbox(provider);
    await expect(
      provider.execute(command(ready.id, 'execution.local.shell', [], { shell: true }))
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_POLICY_DENIED' } });
    await expect(
      provider.execute(
        command(ready.id, 'execution.local.secret', [], { secretRefs: ['secret://denied'] })
      )
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_SECRET_DENIED' } });
    await expect(
      provider.execute(command(ready.id, 'execution.local.path', [], { cwd: '..' }))
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_PATH_ESCAPE' } });
    await expect(
      provider.execute(
        command(ready.id, 'execution.local.env', [], { env: { HYPHA_HIDDEN: 'secret' } })
      )
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_POLICY_DENIED' } });
    await provider.close();
  });

  it('keeps Local Process explicitly degraded on Windows and fail-closed without opt-in', async () => {
    const workspace = await temporaryWorkspace();
    const provider = createProvider(workspace);
    await expect(provider.health()).resolves.toMatchObject({
      status: process.platform === 'win32' ? 'degraded' : 'healthy',
      details: { trustBoundary: 'trusted_local_development_only' },
    });
    await provider.close();

    if (process.platform === 'win32') {
      const strict = new LocalProcessExecutionProvider({
        workspaceRoot: workspace,
        executables: { node: process.execPath },
      });
      await expect(strict.create(createRequest())).rejects.toMatchObject({
        normalizedError: { code: 'EXECUTION_ENVIRONMENT_UNAVAILABLE' },
      });
      await strict.close();
    }
  });

  it('terminates and cleans a Sandbox without residual active executions', async () => {
    const provider = createProvider(await temporaryWorkspace());
    const ready = await createReadySandbox(provider);
    const execution = provider.execute(
      command(ready.id, 'execution.local.terminate', ['-e', 'setInterval(() => {}, 1000)'])
    );
    const busy = await waitForStatus(provider, ready.id, 'busy');
    await provider.terminate({
      operationId: 'operation.terminate.local',
      sandboxId: ready.id,
      principal,
      expectedRevision: busy.revision,
    });
    await expect(execution).resolves.toMatchObject({ status: 'cancelled' });
    const terminated = await provider.status({ sandboxId: ready.id, principal });
    expect(terminated).toMatchObject({ status: 'terminated', activeExecutionIds: [] });
    await provider.cleanup({
      operationId: 'operation.cleanup.local',
      sandboxId: ready.id,
      principal,
      expectedRevision: terminated!.revision,
    });
    await expect(provider.status({ sandboxId: ready.id, principal })).resolves.toMatchObject({
      status: 'cleaned',
    });
    await provider.close();
  });
});

async function temporaryWorkspace(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-provider-'));
}

function createProvider(workspaceRoot: string): LocalProcessExecutionProvider {
  return new LocalProcessExecutionProvider({
    workspaceRoot,
    executables: { node: process.execPath },
    allowBestEffortWindowsProcessTreeKill: true,
    gracefulTerminationMs: 10,
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
    operationId: `operation.${executionId}`,
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

async function waitForStatus(
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
    },
    filesystem: { rootFilesystem: 'writable', mounts: [], allowHostPathMounts: false },
    network: { mode: 'enabled', dnsPolicy: 'system' },
    security: { nonRootRequired: true, noNewPrivileges: true, privileged: false },
    secrets: { injectionMode: 'none', redactFromOutput: true, redactFromEvents: true },
    logging: { captureStdout: true, captureStderr: true },
    lifecycle: { reuse: 'run', cleanupOnSuccess: true, cleanupOnFailure: true },
    workingDirectoryPolicy: 'workspace_only',
    defaultTimeoutMs: 2_000,
  };
}
