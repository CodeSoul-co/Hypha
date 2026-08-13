import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type {
  ArtifactProfileSpec,
  CommandOutputChunk,
  CommandExecutionRequest,
  ExecutionEnvironmentSpec,
  SandboxCreateRequest,
} from '@hypha/core';
import { DefaultArtifactManager } from '@hypha/core';
import { afterEach, describe, expect, it } from 'vitest';
import { readArtifactStream } from './artifact-content-io';
import { hashExecutionValue } from './execution-provider-values';
import { InMemoryArtifactRecordRepository } from './in-memory-artifact-record-repository';
import { LocalProcessExecutionProvider } from './local-process-execution-provider';
import {
  ArtifactManagerLocalProcessOutputPort,
  type LocalProcessOutputArtifactPort,
  type LocalProcessOutputArtifactRequest,
} from './local-process-output-artifacts';
import { LocalFilesystemExecutionArtifactStore } from './local-filesystem-execution-artifact-store';

const principal = {
  principalId: 'principal.local',
  type: 'user' as const,
  userId: 'user.local',
  permissionScopes: ['execution.run', 'artifact:read', 'artifact:write'],
};
const temporaryRoots = new Set<string>();

afterEach(async () => {
  for (const root of temporaryRoots) {
    await fs.rm(root, { recursive: true, force: true, maxRetries: 3, retryDelay: 25 });
    temporaryRoots.delete(root);
    await expect(fs.access(root)).rejects.toMatchObject({ code: 'ENOENT' });
  }
});

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
        metadata: {
          outcome: 'exited',
          terminalStatus: 'completed',
          exitCode: 0,
          signal: null,
          boundedOutput: {
            stdoutContentHash:
              'sha256:d42ef1497900bc6e542c641a896c88694d15069b8a11247f66ba7342b6c21cd9',
            stderrContentHash:
              'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            stdoutBytes: 7,
            stderrBytes: 0,
            stdoutTruncated: false,
            stderrTruncated: false,
          },
          resourceUsage: { outputBytes: 7, processCountPeak: 1 },
          cleanup: {
            terminationMechanism:
              process.platform === 'win32' ? 'windows_taskkill' : 'posix_process_group',
            processTreeTerminationVerified: process.platform !== 'win32',
          },
        },
      },
      metadata: { accountingMode: 'local_observed_output_only' },
    });
    const receipt = result.externalReceipt;
    expect(receipt?.receiptHash).toMatch(/^sha256:[0-9a-f]{64}$/);
    if (!receipt) throw new Error('Expected Local Process receipt evidence.');
    const { receiptHash, ...receiptBody } = receipt;
    expect(receiptHash).toBe(hashExecutionValue(receiptBody));
    expect(receiptHash).not.toBe(
      hashExecutionValue({
        ...receiptBody,
        metadata: { ...receiptBody.metadata, exitCode: 1 },
      })
    );
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
      externalReceipt: {
        status: 'completed',
        metadata: {
          outcome: 'timed_out',
          terminalStatus: 'timed_out',
          exitCode: null,
          boundedOutput: {
            stdoutContentHash:
              'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            stderrContentHash:
              'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            stdoutBytes: 0,
            stderrBytes: 0,
          },
          resourceUsage: { outputBytes: 0, processCountPeak: 1 },
        },
      },
    });
    expect(timedOut.externalReceipt?.metadata).toHaveProperty('signal');
    expect(timedOut.externalReceipt?.metadata).toHaveProperty('cleanup');
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
      externalReceipt: {
        status: 'completed',
        metadata: {
          outcome: 'output_limit',
          terminalStatus: 'resource_exceeded',
          exitCode: null,
          boundedOutput: { stdoutTruncated: true },
        },
      },
    });
    expect(limited.externalReceipt?.metadata?.boundedOutput).toEqual(
      expect.objectContaining({
        stdoutBytes: Buffer.byteLength(limited.stdout ?? ''),
        stdoutContentHash: limited.stdoutContentHash,
        stdoutTruncated: true,
      })
    );
    expect(limited.resourceUsage?.outputBytes).toBeGreaterThan(16);
    await provider.close();
  });

  it('persists bounded output and returns Artifact references when capture is requested', async () => {
    const stored: LocalProcessOutputArtifactRequest[] = [];
    const outputArtifacts: LocalProcessOutputArtifactPort = {
      store: async (request) => {
        stored.push(request);
        return `artifact:${request.stream}`;
      },
    };
    const provider = createProvider(await temporaryWorkspace(), outputArtifacts);
    const ready = await createReadySandbox(provider);

    const limited = await provider.execute(
      command(
        ready.id,
        'execution.local.output-artifact',
        ['-e', "process.stdout.write('x'.repeat(128)); setInterval(() => {}, 1000)"],
        { maxStdoutBytes: 16, captureArtifacts: true }
      )
    );

    expect(limited).toMatchObject({
      status: 'resource_exceeded',
      stdout: 'xxxxxxxxxxxxxxxx',
      stdoutTruncated: true,
      stdoutArtifactRef: 'artifact:stdout',
      generatedArtifactRefs: ['artifact:stdout'],
      error: { code: 'EXECUTION_OUTPUT_LIMIT' },
    });
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({
      executionId: 'execution.local.output-artifact',
      stream: 'stdout',
      observedBytes: 128,
      truncated: true,
    });
    expect(stored[0]!.content.byteLength).toBe(16);
    await provider.close();
  });

  it('streams complete process bytes to ArtifactManager beyond the inline output limit', async () => {
    const workspaceRoot = await temporaryWorkspace();
    const artifactRoot = await temporaryWorkspace();
    const store = new LocalFilesystemExecutionArtifactStore({
      id: 'artifact-store.process-output',
      rootPath: artifactRoot,
    });
    const profile = outputArtifactProfile(store.id);
    const manager = new DefaultArtifactManager({
      profiles: [profile],
      stores: [store],
      repository: new InMemoryArtifactRecordRepository(),
      idGenerator: () => 'process-output.1',
    });
    const provider = createProvider(
      workspaceRoot,
      new ArtifactManagerLocalProcessOutputPort({
        manager,
        profileRef: { id: profile.id, version: profile.version },
        maxBufferedStreamBytes: 8,
      })
    );
    const ready = await createReadySandbox(provider);

    const limited = await provider.execute(
      command(
        ready.id,
        'execution.local.streamed-artifact',
        ['-e', "process.stdout.write('x'.repeat(128)); setInterval(() => {}, 1000)"],
        { maxStdoutBytes: 16, captureArtifacts: true }
      )
    );

    expect(limited).toMatchObject({
      status: 'resource_exceeded',
      stdout: 'xxxxxxxxxxxxxxxx',
      stdoutTruncated: true,
      stdoutArtifactRef: 'artifact.process-output.1',
      error: { code: 'EXECUTION_OUTPUT_LIMIT' },
    });
    if (!limited.stdoutArtifactRef) throw new Error('Expected a streamed stdout Artifact.');
    const persisted = await manager.read({
      principal,
      artifactId: limited.stdoutArtifactRef,
    });
    await expect(readArtifactStream(persisted.content.stream)).resolves.toEqual(
      new TextEncoder().encode('x'.repeat(128))
    );
    await provider.close();
    await store.close();
  });

  it('fails closed when environment policy requires output Artifacts without a port', async () => {
    const provider = createProvider(await temporaryWorkspace());
    const request = createRequest();
    request.environment = {
      ...request.environment,
      logging: {
        ...request.environment.logging,
        persistOutputAsArtifact: true,
      },
    };

    await expect(provider.create(request)).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_ENVIRONMENT_UNAVAILABLE' },
    });
    await provider.close();
  });

  it('honors environment output persistence for both governed streams', async () => {
    const stored: LocalProcessOutputArtifactRequest[] = [];
    const provider = createProvider(await temporaryWorkspace(), {
      store: async (request) => {
        stored.push(request);
        return `artifact:${request.stream}`;
      },
    });
    const request = createRequest();
    request.environment = {
      ...request.environment,
      logging: {
        ...request.environment.logging,
        persistOutputAsArtifact: true,
      },
    };
    const created = await provider.create(request);
    const ready = await provider.start({
      operationId: 'operation.start.local.output-policy',
      sandboxId: created.id,
      principal,
      expectedRevision: created.revision,
    });

    const result = await provider.execute(
      command(ready.id, 'execution.local.output-policy', [
        '-e',
        "process.stdout.write('out'); process.stderr.write('err')",
      ])
    );

    expect(result).toMatchObject({
      status: 'completed',
      stdoutArtifactRef: 'artifact:stdout',
      stderrArtifactRef: 'artifact:stderr',
      generatedArtifactRefs: ['artifact:stdout', 'artifact:stderr'],
    });
    expect(stored.map(({ stream, truncated }) => ({ stream, truncated }))).toEqual([
      { stream: 'stdout', truncated: false },
      { stream: 'stderr', truncated: false },
    ]);
    await provider.close();
  });

  it('streams real process output with replay, ordering, hashes, and completion', async () => {
    const provider = createProvider(await temporaryWorkspace());
    const ready = await createReadyStreamingSandbox(provider);
    const execution = provider.execute(
      command(ready.id, 'execution.local.streaming', [
        '-e',
        "process.stdout.write('out'); setTimeout(() => { process.stderr.write('err'); process.exit(0) }, 80)",
      ])
    );
    await waitForStatus(provider, ready.id, 'busy');

    const streamed = collectOutput(
      provider.streamOutput({
        operationId: 'operation.stream.local',
        executionId: 'execution.local.streaming',
        principal,
        fromSequence: 0,
        follow: true,
      })
    );
    await expect(execution).resolves.toMatchObject({ status: 'completed' });
    const chunks = await streamed;

    expect(chunks.map(({ sequence, stream }) => ({ sequence, stream }))).toEqual([
      { sequence: 0, stream: 'stdout' },
      { sequence: 1, stream: 'stderr' },
    ]);
    expect(chunks.map(decodeChunk)).toEqual(['out', 'err']);
    expect(chunks.every((chunk) => /^sha256:[0-9a-f]{64}$/u.test(chunk.contentHash))).toBe(true);
    await provider.close();
  });

  it('marks the chunk that triggers governed output termination as truncated', async () => {
    const provider = createProvider(await temporaryWorkspace());
    const ready = await createReadyStreamingSandbox(provider);
    const execution = provider.execute(
      command(
        ready.id,
        'execution.local.streaming-limit',
        [
          '-e',
          "setTimeout(() => { process.stdout.write('x'.repeat(128)); setInterval(() => {}, 1000) }, 40)",
        ],
        { maxStdoutBytes: 16 }
      )
    );
    await waitForStatus(provider, ready.id, 'busy');
    const streamed = collectOutput(
      provider.streamOutput({
        operationId: 'operation.stream.local.limit',
        executionId: 'execution.local.streaming-limit',
        principal,
        follow: true,
      })
    );

    await expect(execution).resolves.toMatchObject({
      status: 'resource_exceeded',
      error: { code: 'EXECUTION_OUTPUT_LIMIT' },
    });
    await expect(streamed).resolves.toEqual([
      expect.objectContaining({
        sequence: 0,
        stream: 'stdout',
        byteLength: 128,
        truncated: true,
      }),
    ]);
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
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-local-provider-'));
  temporaryRoots.add(root);
  return root;
}

function createProvider(
  workspaceRoot: string,
  outputArtifacts?: LocalProcessOutputArtifactPort
): LocalProcessExecutionProvider {
  return new LocalProcessExecutionProvider({
    workspaceRoot,
    executables: { node: process.execPath },
    allowBestEffortWindowsProcessTreeKill: true,
    gracefulTerminationMs: 10,
    ...(outputArtifacts ? { outputArtifacts } : {}),
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

async function createReadyStreamingSandbox(provider: LocalProcessExecutionProvider) {
  const request = createRequest();
  request.environment = {
    ...request.environment,
    logging: { ...request.environment.logging, streamOutput: true },
  };
  const created = await provider.create(request);
  return provider.start({
    operationId: 'operation.start.local.streaming',
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

async function collectOutput(
  stream: AsyncIterable<CommandOutputChunk>
): Promise<CommandOutputChunk[]> {
  const chunks: CommandOutputChunk[] = [];
  for await (const chunk of stream) chunks.push(chunk);
  return chunks;
}

function decodeChunk(chunk: CommandOutputChunk): string {
  return chunk.encoding === 'base64'
    ? Buffer.from(chunk.content, 'base64').toString('utf8')
    : chunk.content;
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
      maxIdleSeconds: 10,
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

function outputArtifactProfile(storeId: string): ArtifactProfileSpec {
  return {
    id: 'artifact-profile.process-output',
    version: '1.0.0',
    storeRef: { id: storeId },
    contentAddressing: { hashAlgorithm: 'sha256', verifyOnRead: true, deduplicate: true },
    versioning: { strategy: 'append_only', retainPreviousVersions: true },
    access: {
      defaultVisibility: 'workspace',
      allowedPrincipalTypes: ['user'],
      requiredReadScopes: ['artifact:read'],
      requiredWriteScopes: ['artifact:write'],
      allowRangeRead: true,
    },
    retention: {
      retainFinal: true,
      legalHoldSupported: true,
      garbageCollectUnreferenced: true,
    },
    // Live process output is hashed by the Store while streaming; no complete
    // expected hash exists before the child process closes.
    validation: { checksumRequired: false },
    allowedKinds: ['log'],
    allowedMimeTypes: ['application/octet-stream'],
    maxArtifactBytes: 1024 * 1024,
  };
}
