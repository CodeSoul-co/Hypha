import {
  validateCommandExecutionRequest,
  validateCommandExecutionResult,
  validateExecutionCancelRequest,
  validateRemoteOutputStreamRequest,
  validateSandboxCreateRequest,
  type CommandOutputChunk,
  type CommandExecutionRequest,
  type CommandExecutionResult,
  type ExecutionCancelRequest,
  type ProviderHealth,
  type RemoteOutputStreamRequest,
  type SandboxCleanupRequest,
  type SandboxCreateRequest,
  type SandboxProvider,
  type SandboxProviderCapabilities,
  type SandboxRecord,
  type SandboxStartRequest,
  type SandboxStatusRequest,
  type SandboxTerminateRequest,
} from '@hypha/core';
import { ZodError } from 'zod';
import { ExecutionProviderError, executionProviderError } from './execution-provider-error';
import { LocalActiveExecutionRegistry } from './local-active-execution-registry';
import {
  LocalProcessPolicyResolver,
  type LocalProcessPolicyResolverOptions,
} from './local-process-policy';
import { LocalProcessResourceAccountant } from './local-process-resource-accounting';
import {
  buildLocalProcessResult,
  type LocalProcessOutputArtifactRefs,
} from './local-process-result';
import {
  LocalProcessSupervisor,
  type LocalProcessOutputEvent,
} from './local-process-supervisor';
import type {
  LocalProcessArtifactStream,
  LocalProcessOutputArtifactPort,
  LocalProcessOutputArtifactStream,
} from './local-process-output-artifacts';
import { LocalProcessOutputStreamRegistry } from './local-process-output-stream-registry';
import { LocalSandboxLifecycle } from './local-sandbox-lifecycle';
import { LocalWorkspaceAdapter } from './local-workspace-adapter';
import {
  cloneExecutionValue,
  hashExecutionText,
  shortExecutionHash,
} from './execution-provider-values';

export interface LocalProcessExecutionProviderOptions extends LocalProcessPolicyResolverOptions {
  gracefulTerminationMs?: number;
  maxTrackedFiles?: number;
  maxTrackedBytes?: number;
  allowBestEffortWindowsProcessTreeKill?: boolean;
  id?: string;
  now?: () => string;
  sandboxId?: (request: SandboxCreateRequest) => string;
  executionId?: (request: CommandExecutionRequest) => string;
  supervisor?: LocalProcessSupervisor;
  outputArtifacts?: LocalProcessOutputArtifactPort;
  maxRetainedOutputChunks?: number;
  maxTrackedOutputStreams?: number;
}

const localCapabilities = (processTreeKill: boolean): SandboxProviderCapabilities => ({
  processIsolation: false,
  filesystemIsolation: false,
  networkIsolation: false,
  cpuLimits: false,
  memoryLimits: false,
  diskLimits: false,
  pidsLimit: false,
  cancellation: true,
  processTreeKill,
  snapshots: false,
  imageDigestPinning: false,
  remoteExecution: false,
});

/** Trusted-development provider. Workspace checks are confinement, not OS isolation. */
export class LocalProcessExecutionProvider implements SandboxProvider {
  readonly id: string;
  private readonly now: () => string;
  private readonly executionId: (request: CommandExecutionRequest) => string;
  private readonly gracefulTerminationMs: number;
  private readonly allowBestEffortWindowsProcessTreeKill: boolean;
  private readonly policy: LocalProcessPolicyResolver;
  private readonly workspace: LocalWorkspaceAdapter;
  private readonly supervisor: LocalProcessSupervisor;
  private readonly outputArtifacts?: LocalProcessOutputArtifactPort;
  private readonly outputStreams: LocalProcessOutputStreamRegistry;
  private readonly lifecycle: LocalSandboxLifecycle;
  private readonly active = new LocalActiveExecutionRegistry();
  private readonly resources = new LocalProcessResourceAccountant();
  private readonly results = new Map<string, CommandExecutionResult>();
  private closed = false;

  constructor(options: LocalProcessExecutionProviderOptions) {
    this.id = options.id ?? 'provider.local-process';
    this.now = options.now ?? (() => new Date().toISOString());
    this.executionId =
      options.executionId ??
      ((request) => `execution.local.${shortExecutionHash(request.operationId)}`);
    this.gracefulTerminationMs = nonNegativeInteger(
      options.gracefulTerminationMs ?? 250,
      'gracefulTerminationMs'
    );
    this.allowBestEffortWindowsProcessTreeKill =
      options.allowBestEffortWindowsProcessTreeKill ?? false;
    this.policy = new LocalProcessPolicyResolver(options);
    this.workspace = new LocalWorkspaceAdapter({
      workspaceRoot: options.workspaceRoot,
      maxTrackedFiles: options.maxTrackedFiles,
      maxTrackedBytes: options.maxTrackedBytes,
    });
    this.supervisor = options.supervisor ?? new LocalProcessSupervisor({ now: this.now });
    this.outputArtifacts = options.outputArtifacts;
    this.outputStreams = new LocalProcessOutputStreamRegistry({
      maxRetainedChunks: options.maxRetainedOutputChunks,
      maxTrackedExecutions: options.maxTrackedOutputStreams,
      now: this.now,
    });
    this.lifecycle = new LocalSandboxLifecycle({
      providerId: this.id,
      workspaceRoot: this.workspace.workspaceRoot,
      now: this.now,
      sandboxId: options.sandboxId,
    });
  }

  async capabilities(): Promise<SandboxProviderCapabilities> {
    this.assertOpen();
    return localCapabilities(this.supervisor.processTreeKillVerified);
  }

  async create(input: SandboxCreateRequest): Promise<SandboxRecord> {
    this.assertOpen();
    const request = validateSandboxCreateRequest(input);
    this.policy.validateEnvironment(request.environment);
    if (request.environment.logging.persistOutputAsArtifact && !this.outputArtifacts) {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        'Local Process output Artifact persistence requires a configured output Artifact port.',
        false
      );
    }
    await Promise.all([this.policy.assertSurfaceAvailable(), this.workspace.assertAvailable()]);
    if (!this.supervisor.processTreeKillVerified && !this.allowBestEffortWindowsProcessTreeKill) {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        'Local Process execution requires a verified process-tree controller; Windows taskkill fallback must be explicitly opted into for trusted development.',
        false,
        { terminationMechanism: this.supervisor.terminationMechanism }
      );
    }
    return this.lifecycle.create(request, {
      trustBoundary: 'trusted_local_development_only',
      terminationMechanism: this.supervisor.terminationMechanism,
      processTreeKillVerified: this.supervisor.processTreeKillVerified,
    });
  }

  async start(input: SandboxStartRequest): Promise<SandboxRecord> {
    this.assertOpen();
    return this.lifecycle.start(input);
  }

  async execute(input: CommandExecutionRequest): Promise<CommandExecutionResult> {
    this.assertOpen();
    const request = validateLocalCommandRequest(input);
    const environment = this.lifecycle.environmentForCommand(request);
    if (request.captureArtifacts && !this.outputArtifacts) {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        'Local Process output Artifact capture requires a configured output Artifact port.',
        false
      );
    }
    const executionId = request.executionId ?? this.executionId(request);
    if (this.results.has(executionId)) {
      throw executionProviderError(
        'EXECUTION_IDEMPOTENCY_CONFLICT',
        `Execution ${executionId} already completed.`,
        false
      );
    }
    const policy = await this.policy.resolve(environment, request);
    const before = request.captureFileMutations ? await this.workspace.capture() : undefined;
    const handle = this.active.begin(executionId, request.sandboxId!);
    const streamOutput = environment.logging.streamOutput ?? false;
    const persistOutput =
      this.outputArtifacts !== undefined &&
      (request.captureArtifacts === true ||
        environment.logging.persistOutputAsArtifact === true);
    const outputArtifactStreams: Partial<
      Record<LocalProcessArtifactStream, LocalProcessOutputArtifactStream>
    > = {};
    let outputStreamBegun = false;
    let markedBusy = false;
    let result: CommandExecutionResult | undefined;
    try {
      if (streamOutput) {
        this.outputStreams.begin(executionId, request.principal);
        outputStreamBegun = true;
      }
      this.lifecycle.markBusy(request.sandboxId!, executionId);
      markedBusy = true;
      await this.policy.assertExecutionSurfaceUnchanged(policy);
      const processResult = await this.supervisor.run({
        executable: policy.executable,
        args: [...policy.args],
        cwd: policy.cwd,
        environment: policy.environment,
        ...(request.stdin !== undefined ? { stdin: request.stdin } : {}),
        timeoutMs: policy.timeoutMs,
        ...(policy.idleTimeoutMs ? { idleTimeoutMs: policy.idleTimeoutMs } : {}),
        maxStdoutBytes: policy.maxStdoutBytes,
        maxStderrBytes: policy.maxStderrBytes,
        maxCombinedOutputBytes: policy.maxCombinedOutputBytes,
        gracefulTerminationMs: this.gracefulTerminationMs,
        signal: handle.signal,
        ...(streamOutput || (persistOutput && this.outputArtifacts?.openStream)
          ? {
              onOutput: async (event: LocalProcessOutputEvent) => {
                if (!capturesStream(environment.logging, event.stream)) return;
                if (streamOutput) {
                  this.outputStreams.publish(
                    executionId,
                    event.stream,
                    event.chunk,
                    event.truncated
                  );
                }
                if (persistOutput && this.outputArtifacts?.openStream) {
                  const artifactStream =
                    outputArtifactStreams[event.stream] ??
                    this.outputArtifacts.openStream({
                      executionId,
                      request,
                      stream: event.stream,
                    });
                  outputArtifactStreams[event.stream] = artifactStream;
                  await artifactStream.append(event.chunk);
                }
              },
            }
          : {}),
      });
      const changedFiles = before
        ? this.workspace.diff(before, await this.workspace.capture(), processResult.completedAt)
        : [];
      const outputArtifacts = await this.persistOutputArtifacts(
        request,
        environment.logging,
        executionId,
        processResult,
        outputArtifactStreams
      );
      result = validateCommandExecutionResult(
        buildLocalProcessResult({
          providerId: this.id,
          request,
          executionId,
          processResult,
          changedFiles,
          resourceAccountant: this.resources,
          ...(outputArtifacts ? { outputArtifacts } : {}),
        })
      );
      this.results.set(executionId, result);
      return cloneExecutionValue(result);
    } catch (error) {
      await Promise.allSettled(
        Object.values(outputArtifactStreams).map((stream) => stream.abort(error))
      );
      if (error instanceof ExecutionProviderError) throw error;
      throw executionProviderError(
        'EXECUTION_INTERNAL_ERROR',
        'Local Process execution failed while collecting governed result evidence.',
        false,
        { causeName: error instanceof Error ? error.name : typeof error }
      );
    } finally {
      if (outputStreamBegun) this.outputStreams.complete(executionId);
      this.active.complete(executionId);
      if (markedBusy) {
        this.lifecycle.markExecutionComplete(
          request.sandboxId!,
          executionId,
          result?.completedAt ?? this.now()
        );
      }
    }
  }

  streamOutput(input: RemoteOutputStreamRequest): AsyncIterable<CommandOutputChunk> {
    this.assertOpen();
    try {
      return this.outputStreams.stream(validateRemoteOutputStreamRequest(input));
    } catch (error) {
      if (!(error instanceof ZodError)) throw error;
      throw executionProviderError(
        'EXECUTION_INVALID_REQUEST',
        'Local Process output stream request failed schema validation.',
        false,
        { issueCount: error.issues.length }
      );
    }
  }

  private async persistOutputArtifacts(
    request: CommandExecutionRequest,
    logging: {
      captureStdout: boolean;
      captureStderr: boolean;
      persistOutputAsArtifact?: boolean;
    },
    executionId: string,
    processResult: Awaited<ReturnType<LocalProcessSupervisor['run']>>,
    streams: Partial<Record<LocalProcessArtifactStream, LocalProcessOutputArtifactStream>>
  ): Promise<LocalProcessOutputArtifactRefs | undefined> {
    if (!this.outputArtifacts || (!request.captureArtifacts && !logging.persistOutputAsArtifact)) {
      return undefined;
    }
    if (this.outputArtifacts.openStream) {
      const refs: LocalProcessOutputArtifactRefs = {};
      if (streams.stdout) refs.stdout = await streams.stdout.complete();
      if (streams.stderr) refs.stderr = await streams.stderr.complete();
      return refs.stdout || refs.stderr ? refs : undefined;
    }
    const stdout = Buffer.from(processResult.stdout);
    const stderr = Buffer.from(processResult.stderr);
    const stdoutTruncated = processResult.observedStdoutBytes > stdout.byteLength;
    const stderrTruncated = processResult.observedStderrBytes > stderr.byteLength;
    const refs: LocalProcessOutputArtifactRefs = {};
    if (logging.captureStdout && (stdout.byteLength > 0 || stdoutTruncated)) {
      refs.stdout = await this.outputArtifacts.store({
        executionId,
        request,
        stream: 'stdout',
        content: stdout,
        contentHash: hashExecutionText(processResult.stdout),
        observedBytes: processResult.observedStdoutBytes,
        truncated: stdoutTruncated,
      });
    }
    if (logging.captureStderr && (stderr.byteLength > 0 || stderrTruncated)) {
      refs.stderr = await this.outputArtifacts.store({
        executionId,
        request,
        stream: 'stderr',
        content: stderr,
        contentHash: hashExecutionText(processResult.stderr),
        observedBytes: processResult.observedStderrBytes,
        truncated: stderrTruncated,
      });
    }
    return refs.stdout || refs.stderr ? refs : undefined;
  }

  async cancel(input: ExecutionCancelRequest): Promise<void> {
    this.assertOpen();
    const request = validateExecutionCancelRequest(input);
    const sandboxId = this.active.sandboxId(request.executionId);
    if (!sandboxId) {
      throw executionProviderError(
        'EXECUTION_RESULT_UNKNOWN',
        `Execution ${request.executionId} is not running.`,
        false
      );
    }
    this.lifecycle.status({ sandboxId, principal: request.principal });
    await this.active.cancel(request);
  }

  async terminate(input: SandboxTerminateRequest): Promise<void> {
    this.assertOpen();
    const terminating = this.lifecycle.beginTermination(input);
    await this.active.abortSandbox(terminating.id, input.reason ?? 'sandbox terminated');
    this.lifecycle.finishTermination(terminating.id);
  }

  async status(input: SandboxStatusRequest): Promise<SandboxRecord | null> {
    this.assertOpen();
    return this.lifecycle.status(input);
  }

  async cleanup(input: SandboxCleanupRequest): Promise<void> {
    this.assertOpen();
    this.lifecycle.cleanup(input);
  }

  async health(): Promise<ProviderHealth> {
    if (this.closed) {
      return { status: 'unhealthy', checkedAt: this.now(), message: 'Provider is closed.' };
    }
    try {
      await Promise.all([this.policy.assertSurfaceAvailable(), this.workspace.assertAvailable()]);
      const verified = this.supervisor.processTreeKillVerified;
      return {
        status: verified ? 'healthy' : 'degraded',
        checkedAt: this.now(),
        message: verified
          ? 'Local Process execution surface is available.'
          : 'Windows taskkill fallback is available but does not satisfy verified Job Object process-tree termination.',
        details: {
          trustBoundary: 'trusted_local_development_only',
          terminationMechanism: this.supervisor.terminationMechanism,
          processTreeKillVerified: verified,
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async close(): Promise<void> {
    if (this.closed) return;
    await this.active.close();
    this.outputStreams.close();
    this.closed = true;
  }

  private assertOpen(): void {
    if (this.closed) {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        'Local Process provider is closed.',
        false
      );
    }
  }
}

function nonNegativeInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${name} must be a non-negative integer.`);
  }
  return value;
}

function capturesStream(
  logging: { captureStdout: boolean; captureStderr: boolean },
  stream: LocalProcessArtifactStream
): boolean {
  return stream === 'stdout' ? logging.captureStdout : logging.captureStderr;
}

function validateLocalCommandRequest(input: CommandExecutionRequest): CommandExecutionRequest {
  try {
    return validateCommandExecutionRequest(input);
  } catch (error) {
    if (!(error instanceof ZodError)) throw error;
    const pathIssue = error.issues.find((issue) => issue.path[0] === 'cwd');
    if (pathIssue) {
      throw executionProviderError(
        'EXECUTION_PATH_ESCAPE',
        `Command working directory was rejected: ${pathIssue.message}.`,
        false,
        { validationPath: pathIssue.path.join('.') }
      );
    }
    throw executionProviderError(
      'EXECUTION_INVALID_REQUEST',
      'Local Process command request failed schema validation.',
      false,
      { issueCount: error.issues.length }
    );
  }
}
