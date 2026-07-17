import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import {
  canTransitionSandboxStatus,
  validateCommandExecutionRequest,
  validateCommandExecutionResult,
  validateExecutionCancelRequest,
  validateSandboxCleanupRequest,
  validateSandboxCreateRequest,
  validateSandboxRecord,
  validateSandboxStartRequest,
  validateSandboxStatusRequest,
  validateSandboxTerminateRequest,
  type CommandExecutionRequest,
  type CommandExecutionResult,
  type ExecutionCancelRequest,
  type ExecutionEnvironmentSpec,
  type ExecutionPrincipal,
  type NormalizedExecutionError,
  type ProviderHealth,
  type SandboxCleanupRequest,
  type SandboxCreateRequest,
  type SandboxProvider,
  type SandboxProviderCapabilities,
  type SandboxRecord,
  type SandboxStartRequest,
  type SandboxStatus,
  type SandboxStatusRequest,
  type SandboxTerminateRequest,
} from '@hypha/core';
import {
  type DockerCommandResult,
  type DockerContainerInspection,
  type DockerContainerStats,
  type DockerEngineClient,
} from './docker-engine-cli';
import {
  LocalWorkspaceSnapshotLimitError,
  captureLocalWorkspaceSnapshot,
  diffLocalWorkspaceSnapshots,
  type LocalWorkspaceSnapshot,
} from './local-workspace-mutations';

export interface DockerExecutionProviderOptions {
  workspaceRoot: string;
  engine: DockerEngineClient;
  keepAliveCommand: string[];
  containerWorkspaceRoot?: string;
  allowEnabledNetwork?: boolean;
  maxExecutionTimeoutMs?: number;
  maxStdoutBytes?: number;
  maxStderrBytes?: number;
  maxCombinedOutputBytes?: number;
  maxTrackedFiles?: number;
  maxTrackedBytes?: number;
  id?: string;
  now?: () => string;
  sandboxId?: (request: SandboxCreateRequest) => string;
  executionId?: (request: CommandExecutionRequest) => string;
}

interface DockerSandboxState {
  record: SandboxRecord;
  environment: ExecutionEnvironmentSpec;
  containerId: string;
  workspaceTarget: string;
  stopTimeoutSeconds: number;
}

interface ActiveDockerExecution {
  sandboxId: string;
  revision: number;
  controller: AbortController;
  completion: Promise<void>;
  complete: () => void;
}

interface DockerExecutionPolicy {
  executable: string;
  cwd: string;
  environment: Record<string, string>;
  timeoutMs: number;
  maxStdoutBytes: number;
  maxStderrBytes: number;
  maxCombinedOutputBytes: number;
}

interface ObservedDockerMetrics extends DockerContainerStats {
  sampleCount: number;
}

interface DockerMetricsCollector {
  stop(): Promise<ObservedDockerMetrics | undefined>;
}

const dockerMetricsSampleIntervalMs = 100;

const dockerCapabilities: SandboxProviderCapabilities = {
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

/** Docker-backed strong Sandbox adapter. Runtime remains responsible for governance and events. */
export class DockerExecutionProvider implements SandboxProvider {
  readonly id: string;

  private readonly workspaceRoot: string;
  private readonly engine: DockerEngineClient;
  private readonly keepAliveCommand: readonly string[];
  private readonly containerWorkspaceRoot: string;
  private readonly allowEnabledNetwork: boolean;
  private readonly maxExecutionTimeoutMs: number;
  private readonly maxStdoutBytes: number;
  private readonly maxStderrBytes: number;
  private readonly maxCombinedOutputBytes: number;
  private readonly maxTrackedFiles: number;
  private readonly maxTrackedBytes: number;
  private readonly now: () => string;
  private readonly sandboxId: (request: SandboxCreateRequest) => string;
  private readonly executionId: (request: CommandExecutionRequest) => string;
  private readonly sandboxes = new Map<string, DockerSandboxState>();
  private readonly executions = new Map<string, CommandExecutionResult>();
  private readonly activeExecutions = new Map<string, ActiveDockerExecution>();
  private closed = false;

  constructor(options: DockerExecutionProviderOptions) {
    if (!options.workspaceRoot.trim()) throw new Error('workspaceRoot is required.');
    if (
      !options.keepAliveCommand.length ||
      options.keepAliveCommand.some((entry) => !entry.length)
    ) {
      throw new Error('keepAliveCommand must contain non-empty executable arguments.');
    }
    this.id = options.id ?? 'provider.docker';
    this.workspaceRoot = path.resolve(options.workspaceRoot);
    this.engine = options.engine;
    this.keepAliveCommand = [...options.keepAliveCommand];
    this.containerWorkspaceRoot = validateContainerPath(
      options.containerWorkspaceRoot ?? '/workspace',
      'containerWorkspaceRoot'
    );
    this.allowEnabledNetwork = options.allowEnabledNetwork ?? false;
    this.maxExecutionTimeoutMs = positiveInteger(
      options.maxExecutionTimeoutMs ?? 300_000,
      'maxExecutionTimeoutMs'
    );
    this.maxStdoutBytes = positiveInteger(
      options.maxStdoutBytes ?? 4 * 1024 * 1024,
      'maxStdoutBytes'
    );
    this.maxStderrBytes = positiveInteger(
      options.maxStderrBytes ?? 4 * 1024 * 1024,
      'maxStderrBytes'
    );
    this.maxCombinedOutputBytes = positiveInteger(
      options.maxCombinedOutputBytes ?? 8 * 1024 * 1024,
      'maxCombinedOutputBytes'
    );
    this.maxTrackedFiles = positiveInteger(options.maxTrackedFiles ?? 10_000, 'maxTrackedFiles');
    this.maxTrackedBytes = positiveInteger(
      options.maxTrackedBytes ?? 256 * 1024 * 1024,
      'maxTrackedBytes'
    );
    this.now = options.now ?? (() => new Date().toISOString());
    this.sandboxId =
      options.sandboxId ?? ((request) => `sandbox.docker.${shortHash(request.operationId)}`);
    this.executionId =
      options.executionId ?? ((request) => `execution.docker.${shortHash(request.operationId)}`);
  }

  async capabilities(): Promise<SandboxProviderCapabilities> {
    this.assertOpen();
    return clone(dockerCapabilities);
  }

  async create(input: SandboxCreateRequest): Promise<SandboxRecord> {
    this.assertOpen();
    const request = validateSandboxCreateRequest(input);
    const environment = request.environment;
    const settings = this.validateEnvironment(environment);
    const id = this.sandboxId(request);
    if (this.sandboxes.has(id)) {
      throw providerError('EXECUTION_IDEMPOTENCY_CONFLICT', `Sandbox ${id} already exists.`, false);
    }
    const workspaceRoot = await fs.realpath(this.workspaceRoot);
    const containerName = `hypha-${shortHash(id, 20)}`;
    let containerId: string | undefined;
    try {
      containerId = await this.engine.createContainer({
        name: containerName,
        image: settings.imageRef,
        command: [...this.keepAliveCommand],
        user: settings.user,
        workspaceMount: {
          source: workspaceRoot,
          target: settings.workspaceTarget,
          readOnly: settings.workspaceReadOnly,
        },
        tmpfs: environment.filesystem.tmpfs?.map((entry) => ({
          target: entry.targetPath,
          ...(entry.sizeBytes !== undefined ? { sizeBytes: entry.sizeBytes } : {}),
          ...(entry.noExec !== undefined ? { noExec: entry.noExec } : {}),
          ...(entry.noSuid !== undefined ? { noSuid: entry.noSuid } : {}),
          ...(entry.noDev !== undefined ? { noDev: entry.noDev } : {}),
        })),
        network: settings.network,
        cpuCores: settings.cpuCores,
        memoryBytes: mib(environment.resources.memoryMb!),
        ...(environment.resources.memorySwapMb !== undefined
          ? { memorySwapBytes: mib(environment.resources.memorySwapMb) }
          : {}),
        pidsLimit: environment.resources.pidsLimit!,
        ...(settings.maxOpenFiles !== undefined ? { maxOpenFiles: settings.maxOpenFiles } : {}),
        ...(environment.image?.platform ? { platform: environment.image.platform } : {}),
        pullPolicy: mapPullPolicy(environment.image?.pullPolicy),
        stopTimeoutSeconds: settings.stopTimeoutSeconds,
        labels: {
          'hypha.owner': 'execution',
          'hypha.sandbox': id,
          'hypha.workspace': request.workspaceId,
          'hypha.run': request.runId,
          'hypha.user': request.userId,
        },
      });
      const image = await this.engine.inspectImage(settings.imageRef);
      if (!image.repoDigests.some((entry) => entry.endsWith(`@${settings.digest}`))) {
        throw providerError(
          'EXECUTION_IMAGE_UNTRUSTED',
          'Docker did not report the required immutable image digest.',
          false,
          { expectedDigest: settings.digest, imageId: image.id }
        );
      }
    } catch (error) {
      if (containerId) await this.bestEffortRemove(containerId);
      throw normalizeProviderFailure(error, 'Docker Sandbox creation failed.');
    }

    const record = validateSandboxRecord({
      id,
      revision: 0,
      providerId: this.id,
      environmentRef: {
        id: environment.id,
        version: environment.version,
        ...(environment.revision ? { revision: environment.revision } : {}),
      },
      environmentRevision: request.environmentRevision,
      ...(request.tenantId ? { tenantId: request.tenantId } : {}),
      userId: request.userId,
      workspaceId: request.workspaceId,
      ...(request.sessionId ? { sessionId: request.sessionId } : {}),
      runId: request.runId,
      ...(request.agentId ? { agentId: request.agentId } : {}),
      status: 'created',
      providerSandboxRef: containerId,
      imageDigest: settings.digest,
      activeExecutionIds: [],
      resourceLimits: environment.resources,
      networkPolicyHash: hashValue(environment.network),
      mountPolicyHash: hashValue(environment.filesystem),
      createdAt: this.now(),
      metadata: {
        ...(request.metadata ?? {}),
        trustBoundary: 'docker_container',
        containerName,
        workspaceTarget: settings.workspaceTarget,
        processTreeKillScope: 'container',
      },
    });
    this.sandboxes.set(id, {
      record,
      environment,
      containerId: containerId!,
      workspaceTarget: settings.workspaceTarget,
      stopTimeoutSeconds: settings.stopTimeoutSeconds,
    });
    return clone(record);
  }

  async start(input: SandboxStartRequest): Promise<SandboxRecord> {
    this.assertOpen();
    const request = validateSandboxStartRequest(input);
    const state = this.requireSandbox(request.sandboxId);
    this.assertPrincipal(state.record, request.principal);
    this.assertRevision(state.record.revision, request.expectedRevision, 'Sandbox');
    if (state.record.status !== 'created') {
      throw providerError(
        'EXECUTION_INVALID_REQUEST',
        `Docker Sandbox ${state.record.id} cannot start from ${state.record.status}.`,
        false
      );
    }
    state.record = this.transitionSandbox(state.record, 'starting');
    try {
      await this.engine.startContainer(state.containerId);
      const inspection = await this.engine.inspectContainer(state.containerId);
      if (!inspection?.running) {
        throw providerError(
          'EXECUTION_ENVIRONMENT_UNAVAILABLE',
          'Docker container did not reach running state.',
          true
        );
      }
      state.record = this.transitionSandbox(state.record, 'ready', { readyAt: this.now() });
      return clone(state.record);
    } catch (error) {
      state.record = this.transitionSandbox(state.record, 'failed', {
        error: normalizedError(
          'EXECUTION_ENVIRONMENT_UNAVAILABLE',
          'Docker Sandbox start failed.',
          true
        ),
      });
      throw normalizeProviderFailure(error, 'Docker Sandbox start failed.');
    }
  }

  async execute(input: CommandExecutionRequest): Promise<CommandExecutionResult> {
    this.assertOpen();
    const request = validateCommandExecutionRequest(input);
    if (!request.sandboxId) {
      throw providerError(
        'EXECUTION_INVALID_REQUEST',
        'Docker execution requires sandboxId.',
        false
      );
    }
    const state = this.requireSandbox(request.sandboxId);
    this.assertCommandScope(state.record, request);
    this.assertEnvironmentRef(state.environment, request);
    if (state.record.status !== 'ready') {
      throw providerError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Docker Sandbox ${state.record.id} is ${state.record.status}, not ready.`,
        true
      );
    }
    const executionId = request.executionId ?? this.executionId(request);
    if (this.activeExecutions.has(executionId) || this.executions.has(executionId)) {
      throw providerError(
        'EXECUTION_IDEMPOTENCY_CONFLICT',
        `Execution ${executionId} already exists.`,
        false
      );
    }
    const policy = this.resolveExecutionPolicy(state, request);
    const before = request.captureFileMutations ? await this.captureWorkspaceOrThrow() : undefined;
    const controller = new AbortController();
    const deferred = createDeferred();
    const active: ActiveDockerExecution = {
      sandboxId: state.record.id,
      revision: 2,
      controller,
      completion: deferred.promise,
      complete: deferred.resolve,
    };
    this.activeExecutions.set(executionId, active);
    state.record = this.transitionSandbox(state.record, 'busy', {
      activeExecutionIds: [executionId],
      lastUsedAt: this.now(),
    });

    let commandResult: DockerCommandResult | undefined;
    let inspection: DockerContainerInspection | null = null;
    let metrics: ObservedDockerMetrics | undefined;
    let result: CommandExecutionResult | undefined;
    const metricsCollector = startDockerMetricsCollector(
      this.engine,
      state.containerId,
      dockerMetricsSampleIntervalMs
    );
    try {
      commandResult = await this.engine.execute({
        containerId: state.containerId,
        executable: policy.executable,
        args: request.args ?? [],
        cwd: policy.cwd,
        environment: policy.environment,
        ...(request.stdin !== undefined ? { stdin: request.stdin } : {}),
        signal: controller.signal,
        timeoutMs: policy.timeoutMs,
        maxStdoutBytes: policy.maxStdoutBytes,
        maxStderrBytes: policy.maxStderrBytes,
        maxCombinedOutputBytes: policy.maxCombinedOutputBytes,
      });
      metrics = await metricsCollector.stop();
      inspection = await this.reconcileStopped(state);
      const changedFiles = before
        ? diffLocalWorkspaceSnapshots(
            before,
            await this.captureWorkspaceOrThrow(),
            commandResult.completedAt
          )
        : [];
      result = validateCommandExecutionResult(
        this.buildExecutionResult(
          request,
          state.environment,
          executionId,
          commandResult,
          inspection,
          metrics,
          changedFiles
        )
      );
      this.executions.set(executionId, result);
      return clone(result);
    } catch (error) {
      metrics ??= await metricsCollector.stop();
      if (!inspection) {
        try {
          inspection = await this.reconcileStopped(state);
        } catch (cleanupError) {
          throw normalizeProviderFailure(cleanupError, 'Docker execution cleanup failed.');
        }
      }
      throw normalizeProviderFailure(error, 'Docker execution failed.');
    } finally {
      this.activeExecutions.delete(executionId);
      this.finishExecutionState(state, executionId, result?.completedAt ?? this.now());
      active.complete();
    }
  }

  async cancel(input: ExecutionCancelRequest): Promise<void> {
    this.assertOpen();
    const request = validateExecutionCancelRequest(input);
    const active = this.activeExecutions.get(request.executionId);
    if (!active) {
      throw providerError(
        'EXECUTION_RESULT_UNKNOWN',
        `Execution ${request.executionId} is not running.`,
        false
      );
    }
    const state = this.requireSandbox(active.sandboxId);
    this.assertPrincipal(state.record, request.principal);
    this.assertRevision(active.revision, request.expectedRevision, 'Execution');
    active.revision += 1;
    active.controller.abort(request.reason ?? 'cancelled');
    await active.completion;
  }

  async terminate(input: SandboxTerminateRequest): Promise<void> {
    this.assertOpen();
    const request = validateSandboxTerminateRequest(input);
    const state = this.requireSandbox(request.sandboxId);
    this.assertPrincipal(state.record, request.principal);
    this.assertRevision(state.record.revision, request.expectedRevision, 'Sandbox');
    if (state.record.status === 'terminated') return;
    state.record = this.transitionSandbox(state.record, 'terminating');
    const active = state.record.activeExecutionIds
      .map((id) => this.activeExecutions.get(id))
      .filter((entry): entry is ActiveDockerExecution => Boolean(entry));
    for (const execution of active) {
      execution.revision += 1;
      execution.controller.abort(request.reason ?? 'sandbox terminated');
    }
    await Promise.all(active.map((execution) => execution.completion));
    await this.reconcileStopped(state);
    state.record = this.transitionSandbox(state.record, 'terminated', {
      activeExecutionIds: [],
      terminatedAt: this.now(),
    });
  }

  async status(input: SandboxStatusRequest): Promise<SandboxRecord | null> {
    this.assertOpen();
    const request = validateSandboxStatusRequest(input);
    const state = this.sandboxes.get(request.sandboxId);
    if (!state) return null;
    this.assertPrincipal(state.record, request.principal);
    return clone(state.record);
  }

  async cleanup(input: SandboxCleanupRequest): Promise<void> {
    this.assertOpen();
    const request = validateSandboxCleanupRequest(input);
    const state = this.requireSandbox(request.sandboxId);
    this.assertPrincipal(state.record, request.principal);
    this.assertRevision(state.record.revision, request.expectedRevision, 'Sandbox');
    if (state.record.status === 'cleaned') return;
    if (state.record.status === 'busy' || state.record.status === 'terminating') {
      throw providerError(
        'EXECUTION_CLEANUP_FAILED',
        `Docker Sandbox ${state.record.id} must finish termination before cleanup.`,
        true
      );
    }
    state.record = this.transitionSandbox(state.record, 'cleaning');
    await this.engine.removeContainer(state.containerId);
    state.record = this.transitionSandbox(state.record, 'cleaned', { cleanedAt: this.now() });
  }

  async health(): Promise<ProviderHealth> {
    if (this.closed) {
      return { status: 'unhealthy', checkedAt: this.now(), message: 'Provider is closed.' };
    }
    try {
      const health = await this.engine.health();
      await fs.access(this.workspaceRoot);
      return {
        status: 'healthy',
        checkedAt: this.now(),
        message: 'Docker Engine execution surface is available.',
        details: {
          serverVersion: health.serverVersion,
          processTreeKillScope: 'container',
          networkModes: this.allowEnabledNetwork ? ['disabled', 'enabled'] : ['disabled'],
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
    const active = [...this.activeExecutions.values()];
    for (const execution of active) execution.controller.abort('provider closed');
    await Promise.all(active.map((execution) => execution.completion));
    for (const state of this.sandboxes.values()) {
      if (state.record.status === 'cleaned') continue;
      try {
        await this.reconcileStopped(state);
        await this.engine.removeContainer(state.containerId);
        state.record = forceCleanedRecord(state.record, this.now());
      } catch {
        state.record = forceFailedRecord(state.record, this.now());
      }
    }
    this.closed = true;
  }

  private validateEnvironment(environment: ExecutionEnvironmentSpec): {
    imageRef: string;
    digest: string;
    user: string;
    workspaceTarget: string;
    workspaceReadOnly: boolean;
    network: 'none' | 'bridge';
    cpuCores: number;
    maxOpenFiles?: number;
    stopTimeoutSeconds: number;
  } {
    if (environment.provider !== 'docker') {
      throw providerError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Docker provider cannot create ${environment.provider} environments.`,
        false
      );
    }
    if (!environment.image?.digest || !environment.image.requireDigestPin) {
      throw providerError(
        'EXECUTION_IMAGE_UNTRUSTED',
        'Docker image digest pin is required.',
        false
      );
    }
    const digest = validateDigest(environment.image.digest);
    const reference = normalizeImageReference(environment.image.reference, digest);
    validateTrustedRegistry(reference, environment.image.trustedRegistryRefs);
    if (environment.image.signaturePolicyRef) {
      throw providerError(
        'EXECUTION_IMAGE_UNTRUSTED',
        'Image signature policy requires a verifier adapter and cannot be ignored.',
        false
      );
    }
    if (
      environment.process.shellEnabled ||
      environment.process.executableResolution !== 'container_path'
    ) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Docker execution requires shell=false and container_path executable resolution.',
        false
      );
    }
    if (
      environment.process.allowBackgroundProcesses ||
      environment.process.allowDaemonization ||
      environment.process.inheritHostEnvironment
    ) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Docker execution forbids background processes, daemonization, and host environment inheritance.',
        false
      );
    }
    if (!environment.process.allowedExecutables?.length) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Docker execution requires an explicit executable allowlist.',
        false
      );
    }
    if (environment.lifecycle.reuse !== 'never') {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'This Docker provider currently supports single-use Sandboxes only.',
        false
      );
    }
    if (environment.filesystem.rootFilesystem !== 'read_only') {
      throw providerError('EXECUTION_POLICY_DENIED', 'Docker RootFS must be read-only.', false);
    }
    const workspaceMounts = environment.filesystem.mounts.filter(
      (entry) => entry.type === 'workspace'
    );
    if (workspaceMounts.length !== 1 || environment.filesystem.mounts.length !== 1) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Docker provider currently requires exactly one Workspace mount and no other mounts.',
        false
      );
    }
    const workspaceMount = workspaceMounts[0]!;
    if (workspaceMount.sourceRef !== 'workspace:current') {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Workspace mount must use sourceRef workspace:current.',
        false
      );
    }
    const workspaceTarget = validateContainerPath(workspaceMount.targetPath, 'Workspace target');
    if (workspaceTarget !== this.containerWorkspaceRoot) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        `Workspace target must be ${this.containerWorkspaceRoot}.`,
        false
      );
    }
    if (
      environment.filesystem.allowDeviceAccess ||
      environment.filesystem.allowHostPathMounts ||
      environment.filesystem.allowedDevices?.length ||
      environment.filesystem.maskPaths?.length ||
      environment.filesystem.readonlyPaths?.length ||
      environment.filesystem.writablePaths?.length
    ) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Device, host-path, mask, and additional path policies require a stronger Docker adapter.',
        false
      );
    }
    if (
      environment.security.privileged ||
      !environment.security.nonRootRequired ||
      !environment.security.noNewPrivileges ||
      environment.security.allowNestedContainers ||
      environment.security.addCapabilities?.length ||
      !environment.security.dropCapabilities?.some((entry) => entry.toUpperCase() === 'ALL')
    ) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Docker security requires non-root, no-new-privileges, CAP_DROP=ALL, and no added capabilities.',
        false
      );
    }
    if (
      environment.security.seccompProfileRef ||
      environment.security.appArmorProfileRef ||
      environment.security.selinuxLabelRef ||
      environment.security.userNamespace !== undefined
    ) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Custom security profiles and user namespaces require an explicitly configured Docker adapter.',
        false
      );
    }
    const user = numericUser(environment.security.runAsUser, environment.security.runAsGroup);
    if (environment.secrets.injectionMode !== 'none') {
      throw providerError(
        'EXECUTION_SECRET_DENIED',
        'Docker secret injection requires a Secret Broker and is not enabled in this adapter.',
        false
      );
    }
    if (environment.logging.redactPatterns?.length) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Output redaction patterns require the governed Artifact/output pipeline.',
        false
      );
    }
    const cpuCores = deriveCpuCores(environment);
    if (!environment.resources.memoryMb || !environment.resources.pidsLimit) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Docker execution requires memory and PID limits.',
        false
      );
    }
    if (
      environment.resources.diskBytes ||
      environment.resources.tempBytes ||
      environment.resources.maxWriteBytes ||
      environment.resources.blockIoWeight ||
      environment.resources.maxCpuSeconds ||
      environment.resources.oomKillDisable
    ) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Requested disk, write, block-I/O, CPU-time, or OOM-disable policy is not enforceable by this adapter.',
        false
      );
    }
    const network = mapNetworkMode(environment.network.mode, this.allowEnabledNetwork);
    const maxOpenFiles = minimumPositive([
      environment.process.maxOpenFiles,
      environment.resources.maxOpenFiles,
    ]);
    return {
      imageRef: `${reference}@${digest}`,
      digest,
      user,
      workspaceTarget,
      workspaceReadOnly: workspaceMount.mode === 'ro',
      network,
      cpuCores,
      ...(maxOpenFiles ? { maxOpenFiles } : {}),
      stopTimeoutSeconds: Math.max(
        0,
        Math.ceil((environment.lifecycle.stopTimeoutMs ?? 10_000) / 1000)
      ),
    };
  }

  private resolveExecutionPolicy(
    state: DockerSandboxState,
    request: CommandExecutionRequest
  ): DockerExecutionPolicy {
    const environment = state.environment;
    if (request.shell) {
      throw providerError('EXECUTION_POLICY_DENIED', 'Docker shell execution is disabled.', false);
    }
    if (request.secretRefs?.length) {
      throw providerError(
        'EXECUTION_SECRET_DENIED',
        'Docker command cannot receive Secret references without a Secret Broker.',
        false
      );
    }
    if (request.networkAuthorizationRef) {
      throw providerError(
        'EXECUTION_NETWORK_DENIED',
        'Task network authorization is not supported by this Docker adapter.',
        false
      );
    }
    if (request.snapshotBefore || request.snapshotAfter || request.snapshotOnFailure) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Docker volume snapshots are not supported by this provider.',
        false
      );
    }
    if (request.expectedWorkspaceSnapshotHash) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Workspace snapshot preconditions require the snapshot adapter.',
        false
      );
    }
    const allowed = environment.process.allowedExecutables ?? [];
    const denied = environment.process.deniedExecutables ?? [];
    if (!allowed.includes(request.executable) || denied.includes(request.executable)) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        `Executable ${request.executable} is not allowed in the Docker environment.`,
        false
      );
    }
    if (!request.executable.startsWith('/') && /[\\/]/u.test(request.executable)) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Relative executable paths with separators are forbidden.',
        false
      );
    }
    const cwd = resolveContainerWorkingDirectory(state.workspaceTarget, request.cwd);
    const environmentVariables = buildCommandEnvironment(environment, request.env);
    const timeoutMs = minimumPositive([
      request.timeoutMs,
      environment.defaultTimeoutMs,
      environment.resources.maxExecutionSeconds
        ? environment.resources.maxExecutionSeconds * 1000
        : undefined,
      this.maxExecutionTimeoutMs,
    ])!;
    if (request.idleTimeoutMs || environment.resources.maxIdleSeconds) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Docker CLI execution does not yet provide a verifiable idle-timeout signal.',
        false
      );
    }
    const maxStdoutBytes = minimumPositive([
      request.maxStdoutBytes,
      environment.resources.maxStdoutBytes,
      this.maxStdoutBytes,
    ])!;
    const maxStderrBytes = minimumPositive([
      request.maxStderrBytes,
      environment.resources.maxStderrBytes,
      this.maxStderrBytes,
    ])!;
    const maxCombinedOutputBytes = minimumPositive([
      environment.resources.maxCombinedOutputBytes,
      this.maxCombinedOutputBytes,
    ])!;
    return {
      executable: request.executable,
      cwd,
      environment: environmentVariables,
      timeoutMs,
      maxStdoutBytes,
      maxStderrBytes,
      maxCombinedOutputBytes,
    };
  }

  private buildExecutionResult(
    request: CommandExecutionRequest,
    environment: ExecutionEnvironmentSpec,
    executionId: string,
    command: DockerCommandResult,
    inspection: DockerContainerInspection | null,
    metrics: ObservedDockerMetrics | undefined,
    changedFiles: CommandExecutionResult['changedFiles']
  ): CommandExecutionResult {
    const terminal = mapDockerOutcome(command, inspection);
    const receiptMetadata = compactRecord({
      containerId: inspection?.id ?? request.sandboxId!,
      imageId: inspection?.imageId,
      containerStatus: inspection?.status,
      oomKilled: inspection?.oomKilled ?? false,
    });
    return {
      executionId,
      revision: terminal.status === 'cancelled' ? 4 : 3,
      sandboxId: request.sandboxId!,
      status: terminal.status,
      exitCode: terminal.exitCode,
      ...(command.signal ? { signal: command.signal } : {}),
      ...(environment.logging.captureStdout ? { stdout: command.stdout } : {}),
      ...(environment.logging.captureStderr ? { stderr: command.stderr } : {}),
      changedFiles,
      generatedArtifactRefs: [],
      resourceUsage: {
        outputBytes: command.observedStdoutBytes + command.observedStderrBytes,
        ...(metrics?.memoryUsageBytes !== undefined
          ? { peakMemoryBytes: metrics.memoryUsageBytes }
          : {}),
        ...(metrics?.networkBytesReceived !== undefined
          ? { networkBytesReceived: metrics.networkBytesReceived }
          : {}),
        ...(metrics?.networkBytesSent !== undefined
          ? { networkBytesSent: metrics.networkBytesSent }
          : {}),
        ...(metrics?.readBytes !== undefined ? { readBytes: metrics.readBytes } : {}),
        ...(metrics?.writtenBytes !== undefined ? { writtenBytes: metrics.writtenBytes } : {}),
        ...(metrics?.pids !== undefined ? { processCountPeak: metrics.pids } : {}),
      },
      externalReceipt: {
        id: `receipt.docker.${shortHash(`${executionId}:${command.completedAt}`)}`,
        providerId: this.id,
        executionId,
        providerExecutionRef: inspection?.id ?? request.sandboxId!,
        status: 'completed',
        issuedAt: command.completedAt,
        receiptHash: hashValue(receiptMetadata),
        metadata: receiptMetadata,
      },
      startedAt: command.startedAt,
      completedAt: command.completedAt,
      latencyMs: command.latencyMs,
      ...(terminal.error ? { error: terminal.error } : {}),
      metadata: {
        processTreeKillScope: 'container',
        processTreeTerminationVerified: inspection ? !inspection.running : false,
        observedStdoutBytes: command.observedStdoutBytes,
        observedStderrBytes: command.observedStderrBytes,
        metricsCollected: Boolean(metrics),
        metricsSampleCount: metrics?.sampleCount ?? 0,
        ...(metrics?.cpuPercentage !== undefined
          ? { cpuPercentagePeak: metrics.cpuPercentage }
          : {}),
        ...(metrics?.memoryLimitBytes !== undefined
          ? { memoryLimitBytes: metrics.memoryLimitBytes }
          : {}),
        ...(command.terminationReason ? { terminationReason: command.terminationReason } : {}),
      },
    };
  }

  private async reconcileStopped(
    state: DockerSandboxState
  ): Promise<DockerContainerInspection | null> {
    let inspection = await this.engine.inspectContainer(state.containerId);
    if (inspection?.running) {
      try {
        await this.engine.stopContainer(state.containerId, state.stopTimeoutSeconds);
      } catch {
        // Inspect and force-kill below; the resulting receipt decides whether cleanup succeeded.
      }
      inspection = await this.engine.inspectContainer(state.containerId);
    }
    if (inspection?.running) {
      await this.engine.killContainer(state.containerId);
      inspection = await this.engine.inspectContainer(state.containerId);
    }
    if (inspection?.running) {
      throw providerError(
        'EXECUTION_CLEANUP_FAILED',
        'Docker container remained running after stop and forced kill.',
        true,
        { containerId: state.containerId }
      );
    }
    return inspection;
  }

  private finishExecutionState(
    state: DockerSandboxState,
    executionId: string,
    lastUsedAt: string
  ): void {
    const activeExecutionIds = state.record.activeExecutionIds.filter((id) => id !== executionId);
    if (state.record.status === 'busy') {
      state.record = this.transitionSandbox(state.record, 'stopping', {
        activeExecutionIds,
        lastUsedAt,
      });
      state.record = this.transitionSandbox(state.record, 'stopped', {
        activeExecutionIds: [],
        lastUsedAt,
      });
    } else if (activeExecutionIds.length !== state.record.activeExecutionIds.length) {
      state.record = validateSandboxRecord({
        ...state.record,
        activeExecutionIds,
        lastUsedAt,
        revision: state.record.revision + 1,
      });
    }
  }

  private async captureWorkspaceOrThrow(): Promise<LocalWorkspaceSnapshot> {
    try {
      return await captureLocalWorkspaceSnapshot(this.workspaceRoot, {
        maxFiles: this.maxTrackedFiles,
        maxBytes: this.maxTrackedBytes,
      });
    } catch (error) {
      if (error instanceof LocalWorkspaceSnapshotLimitError) {
        throw providerError('EXECUTION_RESOURCE_EXCEEDED', error.message, false, error.details);
      }
      throw error;
    }
  }

  private requireSandbox(sandboxId: string): DockerSandboxState {
    const state = this.sandboxes.get(sandboxId);
    if (!state) {
      throw providerError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Docker Sandbox ${sandboxId} was not found.`,
        false
      );
    }
    return state;
  }

  private assertEnvironmentRef(
    environment: ExecutionEnvironmentSpec,
    request: CommandExecutionRequest
  ): void {
    if (
      request.environmentRef.id !== environment.id ||
      request.environmentRef.version !== environment.version ||
      (request.environmentRef.revision !== undefined &&
        request.environmentRef.revision !== environment.revision)
    ) {
      throw providerError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        'Command environment reference does not match the Docker Sandbox environment.',
        false
      );
    }
  }

  private assertCommandScope(record: SandboxRecord, request: CommandExecutionRequest): void {
    this.assertPrincipal(record, request.principal);
    if (record.userId !== request.userId || record.workspaceId !== request.workspaceId) {
      throw providerError(
        'EXECUTION_PERMISSION_DENIED',
        'Command identity does not match the Docker Sandbox scope.',
        false
      );
    }
    if (record.tenantId && record.tenantId !== request.tenantId) {
      throw providerError(
        'EXECUTION_PERMISSION_DENIED',
        'Command tenant does not match the Docker Sandbox scope.',
        false
      );
    }
  }

  private assertPrincipal(record: SandboxRecord, principal: ExecutionPrincipal): void {
    if (principal.userId && principal.userId !== record.userId) {
      throw providerError(
        'EXECUTION_PERMISSION_DENIED',
        'Principal user does not match the Docker Sandbox owner.',
        false
      );
    }
    if (record.tenantId && principal.tenantId && principal.tenantId !== record.tenantId) {
      throw providerError(
        'EXECUTION_PERMISSION_DENIED',
        'Principal tenant does not match the Docker Sandbox owner.',
        false
      );
    }
  }

  private assertRevision(actual: number, expected: number, subject: string): void {
    if (actual !== expected) {
      throw providerError(
        'EXECUTION_REVISION_CONFLICT',
        `${subject} revision ${actual} does not match expected revision ${expected}.`,
        true,
        { actualRevision: actual, expectedRevision: expected }
      );
    }
  }

  private transitionSandbox(
    record: SandboxRecord,
    status: SandboxStatus,
    patch: Partial<SandboxRecord> = {}
  ): SandboxRecord {
    if (!canTransitionSandboxStatus(record.status, status)) {
      throw providerError(
        'EXECUTION_INVALID_REQUEST',
        `Cannot transition Docker Sandbox from ${record.status} to ${status}.`,
        false
      );
    }
    return validateSandboxRecord({ ...record, ...patch, status, revision: record.revision + 1 });
  }

  private async bestEffortRemove(containerId: string): Promise<void> {
    try {
      await this.engine.removeContainer(containerId);
    } catch {
      // The original creation error remains the primary failure evidence.
    }
  }

  private assertOpen(): void {
    if (this.closed) {
      throw providerError('EXECUTION_ENVIRONMENT_UNAVAILABLE', 'Docker provider is closed.', false);
    }
  }
}

export class DockerExecutionProviderError extends Error {
  constructor(readonly normalized: NormalizedExecutionError) {
    super(normalized.message);
    this.name = 'DockerExecutionProviderError';
  }
}

function deriveCpuCores(environment: ExecutionEnvironmentSpec): number {
  if (environment.resources.cpuCores) return environment.resources.cpuCores;
  if (environment.resources.cpuQuotaMicros && environment.resources.cpuPeriodMicros) {
    return environment.resources.cpuQuotaMicros / environment.resources.cpuPeriodMicros;
  }
  throw providerError(
    'EXECUTION_POLICY_DENIED',
    'Docker execution requires cpuCores or both cpuQuotaMicros and cpuPeriodMicros.',
    false
  );
}

function mapNetworkMode(mode: ExecutionEnvironmentSpec['network']['mode'], allowEnabled: boolean) {
  if (mode === 'disabled') return 'none' as const;
  if (mode === 'enabled' && allowEnabled) return 'bridge' as const;
  throw providerError(
    'EXECUTION_NETWORK_DENIED',
    `Docker network mode ${mode} is not enabled by this adapter configuration.`,
    false
  );
}

function validateDigest(value: string): string {
  const normalized = value.toLowerCase();
  if (!/^sha256:[a-f0-9]{64}$/u.test(normalized)) {
    throw providerError(
      'EXECUTION_IMAGE_UNTRUSTED',
      'Docker image digest must be sha256 followed by 64 hexadecimal characters.',
      false
    );
  }
  return normalized;
}

function normalizeImageReference(reference: string, digest: string): string {
  const [name, embeddedDigest, extra] = reference.split('@');
  if (!name || extra || (embeddedDigest && embeddedDigest.toLowerCase() !== digest)) {
    throw providerError(
      'EXECUTION_IMAGE_UNTRUSTED',
      'Docker image reference contains a conflicting digest.',
      false
    );
  }
  if (/\s/u.test(name) || name.endsWith(':latest')) {
    throw providerError(
      'EXECUTION_IMAGE_UNTRUSTED',
      'Docker image reference is invalid or uses the mutable latest tag.',
      false
    );
  }
  return name;
}

function validateTrustedRegistry(reference: string, trusted?: string[]): void {
  if (!trusted?.length) return;
  const allowed = trusted.some((entry) => reference === entry || reference.startsWith(`${entry}/`));
  if (!allowed) {
    throw providerError(
      'EXECUTION_IMAGE_UNTRUSTED',
      'Docker image is outside the trusted registry allowlist.',
      false
    );
  }
}

function numericUser(user?: string, group?: string): string {
  if (!user || !/^\d+$/u.test(user) || (group !== undefined && !/^\d+$/u.test(group))) {
    throw providerError(
      'EXECUTION_POLICY_DENIED',
      'Docker runAsUser and runAsGroup must be explicit numeric ids.',
      false
    );
  }
  return group ? `${user}:${group}` : user;
}

function resolveContainerWorkingDirectory(root: string, requested?: string): string {
  if (!requested) return root;
  const candidate = requested.startsWith('/')
    ? path.posix.normalize(requested)
    : path.posix.join(root, requested);
  if (candidate !== root && !candidate.startsWith(`${root}/`)) {
    throw providerError(
      'EXECUTION_PATH_DENIED',
      'Docker working directory escapes the Workspace mount.',
      false
    );
  }
  return validateContainerPath(candidate, 'Docker working directory');
}

function validateContainerPath(value: string, name: string): string {
  if (!value.startsWith('/') || value.includes('\0') || value.includes(',')) {
    throw new Error(`${name} must be an absolute container path without null bytes or commas.`);
  }
  if (value.split('/').includes('..')) throw new Error(`${name} must not contain traversal.`);
  return path.posix.normalize(value);
}

function buildCommandEnvironment(
  environment: ExecutionEnvironmentSpec,
  requested?: Record<string, string>
): Record<string, string> {
  const allowed = new Set(environment.process.environmentAllowList ?? []);
  const denied = new Set(environment.process.environmentDenyList ?? []);
  const output: Record<string, string> = {};
  for (const [name, value] of Object.entries(requested ?? {})) {
    if (!allowed.has(name) || denied.has(name) || isSensitiveName(name)) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        `Environment variable ${name} is not allowed.`,
        false
      );
    }
    output[name] = value;
  }
  return output;
}

function mapDockerOutcome(
  command: DockerCommandResult,
  inspection: DockerContainerInspection | null
): {
  status: CommandExecutionResult['status'];
  exitCode: number | null;
  error?: NormalizedExecutionError;
} {
  if (command.terminationReason === 'cancelled') {
    return {
      status: 'cancelled',
      exitCode: null,
      error: normalizedError('EXECUTION_CANCELLED', 'Docker execution was cancelled.', false),
    };
  }
  if (command.terminationReason === 'timed_out') {
    return {
      status: 'timed_out',
      exitCode: null,
      error: normalizedError('EXECUTION_TIMEOUT', 'Docker execution timed out.', true),
    };
  }
  if (command.terminationReason?.includes('limit')) {
    return {
      status: 'resource_exceeded',
      exitCode: null,
      error: normalizedError(
        'EXECUTION_RESOURCE_EXCEEDED',
        'Docker execution exceeded an output limit.',
        false
      ),
    };
  }
  if (command.terminationReason === 'start_failed') {
    return {
      status: 'failed',
      exitCode: null,
      error: normalizedError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        'Docker exec could not be started.',
        true
      ),
    };
  }
  if (inspection?.oomKilled) {
    return {
      status: 'oom_killed',
      exitCode: inspection.exitCode,
      error: normalizedError(
        'EXECUTION_OOM_KILLED',
        'Docker execution was terminated by the memory limit.',
        false
      ),
    };
  }
  if (command.exitCode === 0) return { status: 'completed', exitCode: 0 };
  return {
    status: 'failed',
    exitCode: command.exitCode,
    error: normalizedError(
      'EXECUTION_INTERNAL_ERROR',
      `Docker command exited with code ${String(command.exitCode)}.`,
      false
    ),
  };
}

function mapPullPolicy(value?: 'never' | 'if_not_present' | 'always') {
  return value === 'always' ? 'always' : value === 'never' ? 'never' : 'missing';
}

function normalizeProviderFailure(error: unknown, fallback: string): DockerExecutionProviderError {
  if (error instanceof DockerExecutionProviderError) return error;
  return providerError('EXECUTION_INTERNAL_ERROR', fallback, true, {
    causeName: error instanceof Error ? error.name : typeof error,
    ...(hasValidationIssues(error)
      ? {
          validationIssues: error.issues.slice(0, 8).map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        }
      : {}),
  });
}

function hasValidationIssues(
  error: unknown
): error is { issues: Array<{ path: Array<string | number>; message: string }> } {
  return Boolean(
    error && typeof error === 'object' && Array.isArray((error as { issues?: unknown }).issues)
  );
}

function providerError(
  code: NormalizedExecutionError['code'],
  message: string,
  retryable: boolean,
  details?: Record<string, unknown>
): DockerExecutionProviderError {
  return new DockerExecutionProviderError(normalizedError(code, message, retryable, details));
}

function normalizedError(
  code: NormalizedExecutionError['code'],
  message: string,
  retryable: boolean,
  details?: Record<string, unknown>
): NormalizedExecutionError {
  return {
    code,
    message,
    retryable,
    ...(details ? { details } : {}),
  };
}

function forceCleanedRecord(record: SandboxRecord, now: string): SandboxRecord {
  return validateSandboxRecord({
    ...record,
    status: 'cleaned',
    revision: record.revision + 1,
    activeExecutionIds: [],
    terminatedAt: record.terminatedAt ?? now,
    cleanedAt: now,
  });
}

function forceFailedRecord(record: SandboxRecord, now: string): SandboxRecord {
  return validateSandboxRecord({
    ...record,
    status: 'failed',
    revision: record.revision + 1,
    activeExecutionIds: [],
    terminatedAt: record.terminatedAt ?? now,
    error: normalizedError(
      'EXECUTION_CLEANUP_FAILED',
      'Provider shutdown could not prove Docker cleanup.',
      true
    ),
  });
}

function createDeferred(): { promise: Promise<void>; resolve: () => void } {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

function startDockerMetricsCollector(
  engine: DockerEngineClient,
  containerId: string,
  sampleIntervalMs: number
): DockerMetricsCollector {
  const samples: DockerContainerStats[] = [];
  let stopRequested = false;
  let releaseDelay: (() => void) | undefined;
  let stopResult: Promise<ObservedDockerMetrics | undefined> | undefined;

  const collection = (async (): Promise<void> => {
    while (!stopRequested) {
      try {
        samples.push(await engine.statsContainer(containerId));
      } catch {
        // Metrics are best-effort evidence; execution and cleanup must continue.
      }
      if (stopRequested) break;
      await new Promise<void>((resolve) => {
        const timer = setTimeout(resolve, sampleIntervalMs);
        releaseDelay = () => {
          clearTimeout(timer);
          resolve();
        };
      });
      releaseDelay = undefined;
    }
  })();

  return {
    stop(): Promise<ObservedDockerMetrics | undefined> {
      stopResult ??= (async () => {
        stopRequested = true;
        releaseDelay?.();
        await collection;
        return aggregateDockerMetrics(samples);
      })();
      return stopResult;
    },
  };
}

function aggregateDockerMetrics(
  samples: readonly DockerContainerStats[]
): ObservedDockerMetrics | undefined {
  if (!samples.length) return undefined;
  return {
    sampleCount: samples.length,
    ...optionalMaximum(samples, 'cpuPercentage'),
    ...optionalMaximum(samples, 'memoryUsageBytes'),
    ...optionalMaximum(samples, 'memoryLimitBytes'),
    ...optionalMaximum(samples, 'networkBytesReceived'),
    ...optionalMaximum(samples, 'networkBytesSent'),
    ...optionalMaximum(samples, 'readBytes'),
    ...optionalMaximum(samples, 'writtenBytes'),
    ...optionalMaximum(samples, 'pids'),
  };
}

function optionalMaximum<K extends keyof DockerContainerStats>(
  samples: readonly DockerContainerStats[],
  key: K
): Pick<DockerContainerStats, K> | Record<never, never> {
  const values = samples
    .map((sample) => sample[key])
    .filter((value): value is NonNullable<DockerContainerStats[K]> => value !== undefined);
  return values.length
    ? ({ [key]: Math.max(...values) } as Pick<DockerContainerStats, K>)
    : {};
}

function minimumPositive(values: Array<number | undefined>): number | undefined {
  const present = values.filter((value): value is number => value !== undefined && value > 0);
  return present.length ? Math.min(...present) : undefined;
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value <= 0)
    throw new Error(`${name} must be a positive integer.`);
  return value;
}

function mib(value: number): number {
  return Math.floor(value * 1024 * 1024);
}

function isSensitiveName(value: string): boolean {
  return /(secret|token|password|credential|api[_-]?key|private[_-]?key)/iu.test(value);
}

function shortHash(value: string, length = 16): string {
  return createHash('sha256').update(value).digest('hex').slice(0, length);
}

function hashValue(value: unknown): string {
  return `sha256:${createHash('sha256').update(stableStringify(value)).digest('hex')}`;
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, entry]) => `${JSON.stringify(key)}:${stableStringify(entry)}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

function compactRecord(value: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined));
}

function clone<T>(value: T): T {
  return structuredClone(value);
}
