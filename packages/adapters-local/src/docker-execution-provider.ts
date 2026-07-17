import {
  validateCommandExecutionRequest,
  validateCommandExecutionResult,
  validateExecutionCancelRequest,
  validateSandboxCreateRequest,
  type CommandExecutionRequest,
  type CommandExecutionResult,
  type ExecutionCancelRequest,
  type NormalizedExecutionError,
  type ProviderHealth,
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
import { DockerCliTransport } from './docker-cli-transport';
import {
  DockerEngineCliClient,
  type DockerContainerInspection,
  type DockerEngineClient,
  type DockerResourceSnapshot,
} from './docker-engine-client';
import {
  DockerExecutionPolicyResolver,
  type DockerExecutionPolicyOptions,
} from './docker-execution-policy';
import { buildDockerProcessResult } from './docker-process-result';
import { DockerResourceAccountant } from './docker-resource-accounting';
import { DockerSandboxLifecycle } from './docker-sandbox-lifecycle';
import { DockerWorkspaceMountResolver } from './docker-workspace-mount';
import { ExecutionProviderError, executionProviderError } from './execution-provider-error';
import { cloneExecutionValue, shortExecutionHash } from './execution-provider-values';
import { LocalActiveExecutionRegistry } from './local-active-execution-registry';
import { LocalWorkspaceAdapter } from './local-workspace-adapter';

export interface DockerExecutionProviderOptions extends DockerExecutionPolicyOptions {
  workspaceRoot: string;
  containerWorkspaceRoot?: string;
  dockerPath?: string;
  engine?: DockerEngineClient;
  id?: string;
  now?: () => string;
  sandboxId?: (request: SandboxCreateRequest) => string;
  executionId?: (request: CommandExecutionRequest) => string;
  maxTrackedFiles?: number;
  maxTrackedBytes?: number;
}

const capabilities: SandboxProviderCapabilities = {
  processIsolation: true,
  filesystemIsolation: true,
  networkIsolation: true,
  cpuLimits: true,
  memoryLimits: true,
  diskLimits: false,
  pidsLimit: true,
  cancellation: true,
  processTreeKill: true,
  snapshots: false,
  imageDigestPinning: true,
  remoteExecution: false,
};

export class DockerExecutionProvider implements SandboxProvider {
  readonly id: string;
  private readonly now: () => string;
  private readonly sandboxId: (request: SandboxCreateRequest) => string;
  private readonly executionId: (request: CommandExecutionRequest) => string;
  private readonly engine: DockerEngineClient;
  private readonly workspaceMount: DockerWorkspaceMountResolver;
  private readonly workspace: LocalWorkspaceAdapter;
  private readonly policy: DockerExecutionPolicyResolver;
  private readonly lifecycle: DockerSandboxLifecycle;
  private readonly active = new LocalActiveExecutionRegistry();
  private readonly accountant = new DockerResourceAccountant();
  private readonly results = new Map<string, CommandExecutionResult>();
  private closed = false;

  constructor(options: DockerExecutionProviderOptions) {
    this.id = options.id ?? 'provider.docker';
    this.now = options.now ?? (() => new Date().toISOString());
    this.sandboxId =
      options.sandboxId ??
      ((request) => `sandbox.docker.${shortExecutionHash(request.operationId)}`);
    this.executionId =
      options.executionId ??
      ((request) => `execution.docker.${shortExecutionHash(request.operationId)}`);
    this.engine =
      options.engine ??
      new DockerEngineCliClient(new DockerCliTransport({ dockerPath: options.dockerPath }));
    this.workspaceMount = new DockerWorkspaceMountResolver({
      workspaceRoot: options.workspaceRoot,
      containerWorkspaceRoot: options.containerWorkspaceRoot,
    });
    this.workspace = new LocalWorkspaceAdapter({
      workspaceRoot: options.workspaceRoot,
      maxTrackedFiles: options.maxTrackedFiles,
      maxTrackedBytes: options.maxTrackedBytes,
    });
    this.policy = new DockerExecutionPolicyResolver(this.workspaceMount, options);
    this.lifecycle = new DockerSandboxLifecycle({
      providerId: this.id,
      now: this.now,
      sandboxId: this.sandboxId,
    });
  }

  async capabilities(): Promise<SandboxProviderCapabilities> {
    this.assertOpen();
    return cloneExecutionValue(capabilities);
  }

  async create(input: SandboxCreateRequest): Promise<SandboxRecord> {
    this.assertOpen();
    const request = validateSandboxCreateRequest(input);
    const environmentPolicy = this.policy.resolveEnvironment(request.environment);
    const mount = await this.workspaceMount.resolve(environmentPolicy.workspaceReadOnly);
    const image = await this.engine.inspectImage(
      `${environmentPolicy.image}@${environmentPolicy.digest}`
    );
    if (!image.repoDigests.some((entry) => entry.endsWith(`@${environmentPolicy.digest}`))) {
      throw executionProviderError(
        'EXECUTION_IMAGE_UNTRUSTED',
        'Docker did not report the required immutable image digest.',
        false,
        { expectedDigest: environmentPolicy.digest, imageId: image.id }
      );
    }
    const sandboxId = this.sandboxId(request);
    let containerId: string | undefined;
    try {
      containerId = await this.engine.createContainer({
        name: `hypha-${shortExecutionHash(sandboxId, 20)}`,
        image: environmentPolicy.image,
        imageDigest: environmentPolicy.digest,
        user: environmentPolicy.user,
        workingDirectory: this.workspaceMount.containerWorkspaceRoot,
        workspaceMount: mount,
        networkMode: 'none',
        readOnlyRoot: true,
        cpuCores: environmentPolicy.cpuCores,
        memoryBytes: environmentPolicy.memoryBytes,
        pidsLimit: environmentPolicy.pidsLimit,
        tempBytes: environmentPolicy.tempBytes,
        labels: {
          'hypha.owner': 'execution',
          'hypha.sandbox': sandboxId,
          'hypha.workspace': request.workspaceId,
          'hypha.run': request.runId,
        },
      });
      return this.lifecycle.create(request, environmentPolicy, containerId, {
        trustBoundary: 'docker_container',
        processTreeKillScope: 'container',
      });
    } catch (error) {
      if (containerId) await this.bestEffortRemove(containerId);
      throw normalizeDockerError(error, 'Docker Sandbox creation failed.');
    }
  }

  async start(input: SandboxStartRequest): Promise<SandboxRecord> {
    this.assertOpen();
    const state = this.lifecycle.beginStart(input);
    try {
      await this.engine.startContainer(state.containerId);
      const inspection = await this.engine.inspectContainer(state.containerId);
      if (!inspection?.running) {
        throw executionProviderError(
          'EXECUTION_ENVIRONMENT_UNAVAILABLE',
          'Docker container did not reach running state.',
          true
        );
      }
      return this.lifecycle.markReady(state.record.id);
    } catch (error) {
      this.lifecycle.markFailed(
        state.record.id,
        normalizedError('EXECUTION_ENVIRONMENT_UNAVAILABLE', 'Docker Sandbox start failed.', true)
      );
      throw normalizeDockerError(error, 'Docker Sandbox start failed.');
    }
  }

  async execute(input: CommandExecutionRequest): Promise<CommandExecutionResult> {
    this.assertOpen();
    const request = validateDockerCommandRequest(input);
    const state = this.lifecycle.commandState(request);
    const executionId = request.executionId ?? this.executionId(request);
    if (this.results.has(executionId)) {
      throw executionProviderError(
        'EXECUTION_IDEMPOTENCY_CONFLICT',
        `Execution ${executionId} already completed.`,
        false
      );
    }
    const commandPolicy = this.policy.resolveCommand(state.environment, request);
    const before = request.captureFileMutations ? await this.workspace.capture() : undefined;
    const handle = this.active.begin(executionId, state.record.id);
    this.lifecycle.markBusy(state.record.id, executionId);
    let result: CommandExecutionResult | undefined;
    try {
      const command = await this.engine.execute({
        containerId: state.containerId,
        executable: commandPolicy.executable,
        args: request.args ?? [],
        workingDirectory: commandPolicy.workingDirectory,
        environment: commandPolicy.environment,
        ...(request.stdin !== undefined ? { stdin: request.stdin } : {}),
        timeoutMs: commandPolicy.timeoutMs,
        ...(commandPolicy.idleTimeoutMs ? { idleTimeoutMs: commandPolicy.idleTimeoutMs } : {}),
        maxStdoutBytes: commandPolicy.maxStdoutBytes,
        maxStderrBytes: commandPolicy.maxStderrBytes,
        maxCombinedOutputBytes: commandPolicy.maxCombinedOutputBytes,
        signal: handle.signal,
      });
      let resourceSnapshot: DockerResourceSnapshot | undefined;
      if (command.outcome === 'exited') {
        try {
          resourceSnapshot = await this.engine.resourceSnapshot(state.containerId);
        } catch {
          // Metrics are evidence, while stop and cleanup remain mandatory.
        }
      }
      const inspection = await this.reconcileStopped(
        state.containerId,
        state.policy.stopTimeoutSeconds
      );
      const changedFiles = before
        ? this.workspace.diff(before, await this.workspace.capture(), command.completedAt)
        : [];
      result = validateCommandExecutionResult(
        buildDockerProcessResult({
          providerId: this.id,
          request,
          executionId,
          command,
          inspection,
          resourceSnapshot,
          changedFiles,
          accountant: this.accountant,
        })
      );
      this.results.set(executionId, result);
      return cloneExecutionValue(result);
    } catch (error) {
      try {
        await this.reconcileStopped(state.containerId, state.policy.stopTimeoutSeconds);
      } catch (cleanupError) {
        throw normalizeDockerError(cleanupError, 'Docker execution cleanup failed.');
      }
      if (error instanceof ExecutionProviderError) throw error;
      throw normalizeDockerError(error, 'Docker execution failed.');
    } finally {
      this.active.complete(executionId);
      this.lifecycle.markExecutionStopped(
        state.record.id,
        executionId,
        result?.completedAt ?? this.now()
      );
    }
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
    const state = this.lifecycle.stateForPrincipal(sandboxId, request.principal);
    const completion = this.active.cancel(request);
    await this.engine.killContainer(state.containerId);
    await completion;
  }

  async terminate(input: SandboxTerminateRequest): Promise<void> {
    this.assertOpen();
    const state = this.lifecycle.beginTermination(input);
    const completion = this.active.abortSandbox(
      state.record.id,
      input.reason ?? 'sandbox terminated'
    );
    await this.reconcileStopped(state.containerId, state.policy.stopTimeoutSeconds);
    await completion;
    this.lifecycle.finishTermination(state.record.id);
  }

  async status(input: SandboxStatusRequest): Promise<SandboxRecord | null> {
    this.assertOpen();
    return this.lifecycle.status(input);
  }

  async cleanup(input: SandboxCleanupRequest): Promise<void> {
    this.assertOpen();
    const state = this.lifecycle.beginCleanup(input);
    await this.engine.removeContainer(state.containerId);
    this.lifecycle.finishCleanup(state.record.id);
  }

  async health(): Promise<ProviderHealth> {
    if (this.closed)
      return { status: 'unhealthy', checkedAt: this.now(), message: 'Provider is closed.' };
    try {
      const [engine] = await Promise.all([this.engine.health(), this.workspace.assertAvailable()]);
      return {
        status: 'healthy',
        checkedAt: this.now(),
        message: 'Docker Engine execution surface is available.',
        details: { serverVersion: engine.serverVersion, processTreeKillScope: 'container' },
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
    for (const state of this.lifecycle.uncleaned()) await this.bestEffortRemove(state.containerId);
    this.closed = true;
  }

  private async reconcileStopped(
    containerId: string,
    timeoutSeconds: number
  ): Promise<DockerContainerInspection | null> {
    let inspection = await this.engine.inspectContainer(containerId);
    if (inspection?.running) {
      try {
        await this.engine.stopContainer(containerId, timeoutSeconds);
      } catch {
        // Re-inspect and force-kill below.
      }
      inspection = await this.engine.inspectContainer(containerId);
    }
    if (inspection?.running) {
      await this.engine.killContainer(containerId);
      inspection = await this.engine.inspectContainer(containerId);
    }
    if (inspection?.running) {
      throw executionProviderError(
        'EXECUTION_CLEANUP_FAILED',
        'Docker container remained running after stop and forced kill.',
        true,
        { containerId }
      );
    }
    return inspection;
  }

  private async bestEffortRemove(containerId: string): Promise<void> {
    try {
      await this.engine.removeContainer(containerId);
    } catch {
      // The primary operation retains failure ownership.
    }
  }

  private assertOpen(): void {
    if (this.closed) {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        'Docker provider is closed.',
        false
      );
    }
  }
}

function validateDockerCommandRequest(input: CommandExecutionRequest): CommandExecutionRequest {
  try {
    return validateCommandExecutionRequest(input);
  } catch (error) {
    if (!(error instanceof ZodError)) throw error;
    const pathIssue = error.issues.find((issue) => issue.path[0] === 'cwd');
    throw executionProviderError(
      pathIssue ? 'EXECUTION_PATH_ESCAPE' : 'EXECUTION_INVALID_REQUEST',
      pathIssue
        ? `Docker command working directory was rejected: ${pathIssue.message}.`
        : 'Docker command request failed schema validation.',
      false,
      { issueCount: error.issues.length }
    );
  }
}

function normalizeDockerError(error: unknown, message: string): ExecutionProviderError {
  if (error instanceof ExecutionProviderError) return error;
  return executionProviderError('EXECUTION_INTERNAL_ERROR', message, true, {
    causeName: error instanceof Error ? error.name : typeof error,
    causeMessage: error instanceof Error ? error.message : String(error),
  });
}

function normalizedError(
  code: NormalizedExecutionError['code'],
  message: string,
  retryable: boolean
): NormalizedExecutionError {
  return { code, message, retryable };
}
