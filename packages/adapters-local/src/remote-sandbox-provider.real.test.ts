import { randomUUID } from 'node:crypto';
import {
  type CommandExecutionRequest,
  type ExecutionEnvironmentSpec,
  type SandboxCreateRequest,
  type SandboxRecord,
} from '@codesoul-co/core';
import { afterAll, describe, expect, it } from 'vitest';
import { RemoteSandboxHttpTransport } from './remote-sandbox-http-transport';
import { RemoteSandboxProviderAdapter } from './remote-sandbox-provider-adapter';

const baseUrl = requiredEnvironment('HYPHA_REAL_REMOTE_SANDBOX_BASE_URL');
const accessToken = requiredEnvironment('HYPHA_REAL_REMOTE_SANDBOX_ACCESS_TOKEN');
const providerId = requiredEnvironment('HYPHA_REAL_REMOTE_SANDBOX_PROVIDER_ID');
const commands = commandFixture(requiredEnvironment('HYPHA_REAL_REMOTE_SANDBOX_COMMANDS_JSON'));
const principal = {
  principalId: 'principal.remote.acceptance',
  type: 'user' as const,
  userId: 'user.remote.acceptance',
  tenantId: 'tenant.remote.acceptance',
  permissionScopes: [
    'execution:sandbox:create',
    'execution:command:run',
    'execution:command:cancel',
  ],
};
const transport = new RemoteSandboxHttpTransport({
  baseUrl,
  credentialProvider: async () => ({
    accessToken,
    expiresAt: new Date(Date.now() + 60_000).toISOString(),
  }),
});
const provider = new RemoteSandboxProviderAdapter({ id: providerId, transport });

afterAll(async () => {
  await provider.close();
});

describe('RemoteSandboxProvider real service', () => {
  it('reports runtime-validated health and isolation capabilities', async () => {
    await expect(provider.health()).resolves.toMatchObject({ status: 'healthy' });
    await expect(provider.capabilities()).resolves.toMatchObject({
      processIsolation: true,
      filesystemIsolation: true,
      cancellation: true,
      processTreeKill: true,
      remoteExecution: true,
    });
  });

  it('executes a governed command and durably cleans the remote Sandbox', async () => {
    const sandbox = await provisionSandbox('success');
    try {
      const result = await provider.execute(commandRequest(sandbox, 'success', commands.success));
      expect(result).toMatchObject({
        sandboxId: sandbox.id,
        status: 'completed',
        exitCode: 0,
      });
      expect(result.stdout).toContain(commands.success.expectedStdout);
    } finally {
      await terminateAndClean(sandbox.id);
    }
  });

  it('normalizes a provider-side deadline and leaves no active execution', async () => {
    const sandbox = await provisionSandbox('timeout');
    try {
      await expect(
        provider.execute({
          ...commandRequest(sandbox, 'timeout', commands.timeout),
          timeoutMs: commands.timeout.timeoutMs,
        })
      ).resolves.toMatchObject({
        sandboxId: sandbox.id,
        status: 'timed_out',
        error: { code: 'EXECUTION_TIMEOUT' },
      });
      await expect(provider.status({ sandboxId: sandbox.id, principal })).resolves.toMatchObject({
        activeExecutionIds: [],
      });
    } finally {
      await terminateAndClean(sandbox.id);
    }
  });

  it('cancels an in-flight command and verifies remote process-tree cleanup', async () => {
    const sandbox = await provisionSandbox('cancel');
    const request = commandRequest(sandbox, 'cancel', commands.cancel);
    try {
      const execution = provider.execute(request);
      await new Promise((resolve) => setTimeout(resolve, commands.cancel.cancelAfterMs));
      await provider.cancel({
        operationId: `${request.operationId}.cancel`,
        executionId: request.executionId!,
        principal,
        expectedRevision: commands.cancel.expectedRevision,
        reason: 'real remote Sandbox cancellation acceptance',
      });
      await expect(execution).resolves.toMatchObject({
        sandboxId: sandbox.id,
        status: 'cancelled',
        error: { code: 'EXECUTION_CANCELLED' },
        metadata: { processTreeTerminationVerified: true },
      });
      await expect(provider.status({ sandboxId: sandbox.id, principal })).resolves.toMatchObject({
        activeExecutionIds: [],
      });
    } finally {
      await terminateAndClean(sandbox.id);
    }
  });
});

async function provisionSandbox(caseName: string): Promise<SandboxRecord> {
  const created = await provider.create(createRequest(caseName));
  expect(created).toMatchObject({
    providerId,
    status: 'created',
    userId: principal.userId,
    tenantId: principal.tenantId,
  });
  return provider.start({
    operationId: `operation.remote.acceptance.${caseName}.start`,
    sandboxId: created.id,
    principal,
    expectedRevision: created.revision,
  });
}

async function terminateAndClean(sandboxId: string): Promise<void> {
  let current = await provider.status({ sandboxId, principal });
  if (!current || current.status === 'cleaned') return;
  if (current.activeExecutionIds.length > 0) {
    throw new Error('Remote Sandbox still owns active executions during cleanup.');
  }
  if (current.status !== 'terminated') {
    await provider.terminate({
      operationId: `operation.remote.acceptance.${randomUUID()}.terminate`,
      sandboxId,
      principal,
      expectedRevision: current.revision,
      reason: 'real remote Sandbox acceptance cleanup',
    });
    current = await provider.status({ sandboxId, principal });
  }
  if (!current) throw new Error('Remote Sandbox disappeared before cleanup evidence was read.');
  await provider.cleanup({
    operationId: `operation.remote.acceptance.${randomUUID()}.cleanup`,
    sandboxId,
    principal,
    expectedRevision: current.revision,
    reason: 'real remote Sandbox acceptance cleanup',
  });
  await expect(provider.status({ sandboxId, principal })).resolves.toMatchObject({
    status: 'cleaned',
    activeExecutionIds: [],
  });
}

function createRequest(caseName: string): SandboxCreateRequest {
  const runId = `run.remote.acceptance.${caseName}.${randomUUID()}`;
  return {
    operationId: `operation.remote.acceptance.${caseName}.create.${randomUUID()}`,
    principal,
    environment: environment(),
    environmentRevision: 'revision.remote.acceptance.v1',
    tenantId: principal.tenantId,
    userId: principal.userId,
    workspaceId: `workspace.remote.acceptance.${caseName}`,
    runId,
    idempotencyKey: `remote-acceptance:${runId}:create`,
  };
}

function environment(): ExecutionEnvironmentSpec {
  const allowedExecutables = [
    ...new Set(
      [commands.success, commands.timeout, commands.cancel].map(({ executable }) => executable)
    ),
  ];
  return {
    id: 'execution-environment.remote.acceptance',
    version: '1.0.0',
    revision: 'revision.remote.acceptance.v1',
    provider: 'remote_sandbox',
    providerRef: providerId,
    process: {
      shellEnabled: false,
      allowedExecutables,
      executableResolution: 'container_path',
      killProcessTreeOnExit: true,
      inheritHostEnvironment: false,
    },
    resources: {
      cpuCores: 0.25,
      memoryMb: 128,
      pidsLimit: 32,
      maxStdoutBytes: 16_384,
      maxStderrBytes: 16_384,
      maxCombinedOutputBytes: 32_768,
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
    logging: { captureStdout: true, captureStderr: true },
    lifecycle: { reuse: 'never', cleanupOnSuccess: true, cleanupOnFailure: true },
    workingDirectoryPolicy: 'workspace_only',
    defaultTimeoutMs: 30_000,
  };
}

function commandRequest(
  sandbox: SandboxRecord,
  caseName: string,
  command: RemoteCommand
): CommandExecutionRequest {
  return {
    executionId: `execution.remote.acceptance.${caseName}.${randomUUID()}`,
    operationId: `operation.remote.acceptance.${caseName}.execute.${randomUUID()}`,
    principal,
    tenantId: principal.tenantId,
    userId: principal.userId,
    workspaceId: sandbox.workspaceId,
    runId: sandbox.runId,
    sandboxId: sandbox.id,
    environmentRef: {
      id: 'execution-environment.remote.acceptance',
      version: '1.0.0',
      revision: 'revision.remote.acceptance.v1',
    },
    executable: command.executable,
    args: command.args,
    timeoutMs: command.timeoutMs,
    captureArtifacts: true,
    captureFileMutations: true,
    idempotencyKey: `remote-acceptance:${caseName}:${sandbox.runId}`,
  };
}

interface RemoteCommand {
  executable: string;
  args: string[];
  timeoutMs: number;
  expectedStdout?: string;
  cancelAfterMs: number;
  expectedRevision: number;
}

interface RemoteCommandFixture {
  success: RemoteCommand & { expectedStdout: string };
  timeout: RemoteCommand;
  cancel: RemoteCommand;
}

function commandFixture(input: string): RemoteCommandFixture {
  let value: unknown;
  try {
    value = JSON.parse(input);
  } catch (error) {
    throw new Error('HYPHA_REAL_REMOTE_SANDBOX_COMMANDS_JSON must be valid JSON.', {
      cause: error,
    });
  }
  if (!isRecord(value)) throw new Error('Remote Sandbox command fixture must be an object.');
  return {
    success: parseCommand(value.success, 'success', true) as RemoteCommand & {
      expectedStdout: string;
    },
    timeout: parseCommand(value.timeout, 'timeout', false),
    cancel: parseCommand(value.cancel, 'cancel', false),
  };
}

function parseCommand(input: unknown, name: string, requireOutput: boolean): RemoteCommand {
  if (!isRecord(input)) throw new Error(`Remote Sandbox ${name} command must be an object.`);
  const executable = nonEmptyString(input.executable, `${name}.executable`);
  if (!Array.isArray(input.args) || !input.args.every((value) => typeof value === 'string')) {
    throw new Error(`Remote Sandbox ${name}.args must be an array of strings.`);
  }
  const timeoutMs = positiveInteger(input.timeoutMs, `${name}.timeoutMs`);
  const cancelAfterMs = positiveInteger(
    input.cancelAfterMs ?? Math.min(250, timeoutMs),
    `${name}.cancelAfterMs`
  );
  const expectedRevision = positiveInteger(input.expectedRevision ?? 2, `${name}.expectedRevision`);
  const expectedStdout =
    input.expectedStdout === undefined
      ? undefined
      : nonEmptyString(input.expectedStdout, `${name}.expectedStdout`);
  if (requireOutput && !expectedStdout) {
    throw new Error(`Remote Sandbox ${name}.expectedStdout is required.`);
  }
  return {
    executable,
    args: [...input.args],
    timeoutMs,
    cancelAfterMs,
    expectedRevision,
    ...(expectedStdout === undefined ? {} : { expectedStdout }),
  };
}

function requiredEnvironment(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required for real remote Sandbox acceptance.`);
  return value;
}

function nonEmptyString(value: unknown, name: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${name} is required.`);
  return value;
}

function positiveInteger(value: unknown, name: string): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer.`);
  }
  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
