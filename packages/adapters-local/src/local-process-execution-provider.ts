import { createHash } from 'node:crypto';
import { constants as fsConstants } from 'node:fs';
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
import { LocalProcessSupervisor, type LocalProcessRunResult } from './local-process-supervisor';
import {
  LocalWorkspaceSnapshotLimitError,
  captureLocalWorkspaceSnapshot,
  diffLocalWorkspaceSnapshots,
  type LocalWorkspaceSnapshot,
} from './local-workspace-mutations';

export interface LocalProcessExecutionProviderOptions {
  workspaceRoot: string;
  executables: Record<string, string>;
  baseEnvironment?: Record<string, string>;
  inheritEnvironment?: string[];
  maxExecutionTimeoutMs?: number;
  maxStdoutBytes?: number;
  maxStderrBytes?: number;
  maxCombinedOutputBytes?: number;
  gracefulTerminationMs?: number;
  maxTrackedFiles?: number;
  maxTrackedBytes?: number;
  allowBestEffortWindowsProcessTreeKill?: boolean;
  id?: string;
  now?: () => string;
  sandboxId?: (request: SandboxCreateRequest) => string;
  executionId?: (request: CommandExecutionRequest) => string;
  supervisor?: LocalProcessSupervisor;
}

interface LocalSandboxState {
  record: SandboxRecord;
  environment: ExecutionEnvironmentSpec;
}

interface ActiveExecution {
  sandboxId: string;
  revision: number;
  controller: AbortController;
  completion: Promise<void>;
  complete: () => void;
}

interface ResolvedExecutionPolicy {
  executable: string;
  cwd: string;
  environment: NodeJS.ProcessEnv;
  timeoutMs: number;
  idleTimeoutMs?: number;
  maxStdoutBytes: number;
  maxStderrBytes: number;
  maxCombinedOutputBytes: number;
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

/** Trusted-development provider. Managed-root checks are confinement, not OS isolation. */
export class LocalProcessExecutionProvider implements SandboxProvider {
  readonly id: string;

  private readonly workspaceRoot: string;
  private readonly executables: Readonly<Record<string, string>>;
  private readonly baseEnvironment: Readonly<Record<string, string>>;
  private readonly inheritEnvironment: readonly string[];
  private readonly maxExecutionTimeoutMs: number;
  private readonly maxStdoutBytes: number;
  private readonly maxStderrBytes: number;
  private readonly maxCombinedOutputBytes: number;
  private readonly gracefulTerminationMs: number;
  private readonly maxTrackedFiles: number;
  private readonly maxTrackedBytes: number;
  private readonly allowBestEffortWindowsProcessTreeKill: boolean;
  private readonly now: () => string;
  private readonly sandboxId: (request: SandboxCreateRequest) => string;
  private readonly executionId: (request: CommandExecutionRequest) => string;
  private readonly supervisor: LocalProcessSupervisor;
  private readonly sandboxes = new Map<string, LocalSandboxState>();
  private readonly executions = new Map<string, CommandExecutionResult>();
  private readonly activeExecutions = new Map<string, ActiveExecution>();
  private closed = false;

  constructor(options: LocalProcessExecutionProviderOptions) {
    if (!options.workspaceRoot.trim()) throw new Error('workspaceRoot is required.');
    if (!Object.keys(options.executables).length) {
      throw new Error('At least one explicitly mapped executable is required.');
    }
    for (const [alias, executable] of Object.entries(options.executables)) {
      if (!alias.trim() || !path.isAbsolute(executable)) {
        throw new Error(`Executable mapping ${alias || '<empty>'} must use an absolute path.`);
      }
    }
    this.id = options.id ?? 'provider.local-process';
    this.workspaceRoot = path.resolve(options.workspaceRoot);
    this.executables = Object.fromEntries(
      Object.entries(options.executables).map(([alias, executable]) => [
        alias,
        path.resolve(executable),
      ])
    );
    this.baseEnvironment = { ...(options.baseEnvironment ?? {}) };
    this.inheritEnvironment = [...new Set(options.inheritEnvironment ?? [])];
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
    this.gracefulTerminationMs = nonNegativeInteger(
      options.gracefulTerminationMs ?? 250,
      'gracefulTerminationMs'
    );
    this.maxTrackedFiles = positiveInteger(options.maxTrackedFiles ?? 10_000, 'maxTrackedFiles');
    this.maxTrackedBytes = positiveInteger(
      options.maxTrackedBytes ?? 256 * 1024 * 1024,
      'maxTrackedBytes'
    );
    this.allowBestEffortWindowsProcessTreeKill =
      options.allowBestEffortWindowsProcessTreeKill ?? false;
    this.now = options.now ?? (() => new Date().toISOString());
    this.sandboxId =
      options.sandboxId ?? ((request) => `sandbox.local.${shortHash(request.operationId)}`);
    this.executionId =
      options.executionId ?? ((request) => `execution.local.${shortHash(request.operationId)}`);
    this.supervisor = options.supervisor ?? new LocalProcessSupervisor({ now: this.now });
  }

  async capabilities(): Promise<SandboxProviderCapabilities> {
    this.assertOpen();
    return localCapabilities(this.supervisor.processTreeKillVerified);
  }

  async create(input: SandboxCreateRequest): Promise<SandboxRecord> {
    this.assertOpen();
    const request = validateSandboxCreateRequest(input);
    this.validateEnvironment(request.environment);
    await this.assertLocalSurfaceAvailable();
    if (!this.supervisor.processTreeKillVerified && !this.allowBestEffortWindowsProcessTreeKill) {
      throw providerError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        'Local Process execution requires a verified process-tree controller; Windows taskkill fallback must be explicitly opted into for trusted development.',
        false,
        { terminationMechanism: this.supervisor.terminationMechanism }
      );
    }
    const id = this.sandboxId(request);
    if (this.sandboxes.has(id)) {
      throw providerError('EXECUTION_IDEMPOTENCY_CONFLICT', `Sandbox ${id} already exists.`, false);
    }
    const record = validateSandboxRecord({
      id,
      revision: 0,
      providerId: this.id,
      environmentRef: {
        id: request.environment.id,
        version: request.environment.version,
        ...(request.environment.revision ? { revision: request.environment.revision } : {}),
      },
      environmentRevision: request.environmentRevision,
      ...(request.tenantId ? { tenantId: request.tenantId } : {}),
      userId: request.userId,
      workspaceId: request.workspaceId,
      ...(request.sessionId ? { sessionId: request.sessionId } : {}),
      runId: request.runId,
      ...(request.agentId ? { agentId: request.agentId } : {}),
      status: 'created',
      providerSandboxRef: `local:${shortHash(this.workspaceRoot)}`,
      activeExecutionIds: [],
      resourceLimits: request.environment.resources,
      networkPolicyHash: hashValue(request.environment.network),
      mountPolicyHash: hashValue(request.environment.filesystem),
      createdAt: this.now(),
      metadata: {
        ...(request.metadata ?? {}),
        trustBoundary: 'trusted_local_development_only',
        terminationMechanism: this.supervisor.terminationMechanism,
        processTreeKillVerified: this.supervisor.processTreeKillVerified,
      },
    });
    this.sandboxes.set(id, { record, environment: request.environment });
    return clone(record);
  }

  async start(input: SandboxStartRequest): Promise<SandboxRecord> {
    this.assertOpen();
    const request = validateSandboxStartRequest(input);
    const state = this.requireSandbox(request.sandboxId);
    this.assertPrincipal(state.record, request.principal);
    this.assertRevision(state.record.revision, request.expectedRevision, 'Sandbox');
    state.record = this.transitionSandbox(state.record, 'starting');
    state.record = this.transitionSandbox(state.record, 'ready', { readyAt: this.now() });
    return clone(state.record);
  }

  async execute(input: CommandExecutionRequest): Promise<CommandExecutionResult> {
    this.assertOpen();
    const request = validateCommandExecutionRequest(input);
    if (!request.sandboxId) {
      throw providerError(
        'EXECUTION_INVALID_REQUEST',
        'Local Process execution requires sandboxId.',
        false
      );
    }
    const state = this.requireSandbox(request.sandboxId);
    this.assertCommandScope(state.record, request);
    this.assertEnvironmentRef(state.environment, request);
    if (state.record.status !== 'ready') {
      throw providerError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Sandbox ${state.record.id} is ${state.record.status}, not ready.`,
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

    const policy = await this.resolveExecutionPolicy(state.environment, request);
    const before = request.captureFileMutations ? await this.captureWorkspaceOrThrow() : undefined;
    const controller = new AbortController();
    const deferred = createDeferred();
    const active: ActiveExecution = {
      sandboxId: state.record.id,
      revision: 2,
      controller,
      completion: deferred.promise,
      complete: deferred.resolve,
    };
    this.activeExecutions.set(executionId, active);
    state.record = this.transitionSandbox(state.record, 'busy', {
      activeExecutionIds: [...state.record.activeExecutionIds, executionId],
      lastUsedAt: this.now(),
    });

    let result: CommandExecutionResult | undefined;
    try {
      const processResult = await this.supervisor.run({
        executable: policy.executable,
        args: request.args ?? [],
        cwd: policy.cwd,
        environment: policy.environment,
        ...(request.stdin !== undefined ? { stdin: request.stdin } : {}),
        timeoutMs: policy.timeoutMs,
        ...(policy.idleTimeoutMs ? { idleTimeoutMs: policy.idleTimeoutMs } : {}),
        maxStdoutBytes: policy.maxStdoutBytes,
        maxStderrBytes: policy.maxStderrBytes,
        maxCombinedOutputBytes: policy.maxCombinedOutputBytes,
        gracefulTerminationMs: this.gracefulTerminationMs,
        signal: controller.signal,
      });
      const changedFiles = before
        ? diffLocalWorkspaceSnapshots(
            before,
            await this.captureWorkspaceOrThrow(),
            processResult.completedAt
          )
        : [];
      result = validateCommandExecutionResult(
        this.buildExecutionResult(request, executionId, processResult, changedFiles)
      );
      this.executions.set(executionId, result);
      return clone(result);
    } catch (error) {
      if (error instanceof LocalProcessExecutionProviderError) throw error;
      throw providerError(
        'EXECUTION_INTERNAL_ERROR',
        'Local Process execution failed while collecting governed result evidence.',
        false,
        { causeName: error instanceof Error ? error.name : typeof error }
      );
    } finally {
      this.activeExecutions.delete(executionId);
      this.removeActiveExecution(state, executionId, result?.completedAt ?? this.now());
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
      .filter((value): value is ActiveExecution => Boolean(value));
    for (const execution of active) {
      execution.revision += 1;
      execution.controller.abort(request.reason ?? 'sandbox terminated');
    }
    await Promise.all(active.map((execution) => execution.completion));
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
        `Sandbox ${state.record.id} must finish termination before cleanup.`,
        true
      );
    }
    state.record = this.transitionSandbox(state.record, 'cleaning');
    state.record = this.transitionSandbox(state.record, 'cleaned', { cleanedAt: this.now() });
  }

  async health(): Promise<ProviderHealth> {
    if (this.closed) {
      return { status: 'unhealthy', checkedAt: this.now(), message: 'Provider is closed.' };
    }
    try {
      await this.assertLocalSurfaceAvailable();
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
    const active = [...this.activeExecutions.values()];
    for (const execution of active) execution.controller.abort('provider closed');
    await Promise.all(active.map((execution) => execution.completion));
    this.closed = true;
  }

  private validateEnvironment(environment: ExecutionEnvironmentSpec): void {
    if (environment.provider !== 'local_process') {
      throw providerError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Local Process provider cannot create ${environment.provider} environments.`,
        false
      );
    }
    if (environment.process.shellEnabled) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Local Process provider does not support shell execution.',
        false
      );
    }
    if (!environment.process.allowedExecutables?.length) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Local Process environments require an explicit executable allowlist.',
        false
      );
    }
    if (environment.process.executableResolution === 'container_path') {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'container_path executable resolution is not valid for Local Process execution.',
        false
      );
    }
    if (environment.process.allowBackgroundProcesses || environment.process.allowDaemonization) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Background processes and daemonization are disabled for Local Process execution.',
        false
      );
    }
    if (environment.secrets.injectionMode !== 'none') {
      throw providerError(
        'EXECUTION_SECRET_DENIED',
        'Local Process provider does not inject secrets.',
        false
      );
    }
  }

  private async resolveExecutionPolicy(
    environment: ExecutionEnvironmentSpec,
    request: CommandExecutionRequest
  ): Promise<ResolvedExecutionPolicy> {
    if (request.shell) {
      throw providerError('EXECUTION_POLICY_DENIED', 'Shell execution is disabled.', false);
    }
    if (request.secretRefs?.length) {
      throw providerError(
        'EXECUTION_SECRET_DENIED',
        'Local Process commands cannot receive secret references.',
        false
      );
    }
    if (request.snapshotBefore || request.snapshotAfter || request.snapshotOnFailure) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'Local Process provider does not claim Workspace snapshot capability.',
        false
      );
    }
    const executable = await this.resolveExecutable(environment, request.executable);
    const cwd = await this.resolveWorkingDirectory(request.cwd);
    const commandEnvironment = this.buildEnvironment(environment, request.env);
    const timeoutMs = minimumPositive([
      request.timeoutMs,
      environment.defaultTimeoutMs,
      environment.resources.maxExecutionSeconds
        ? environment.resources.maxExecutionSeconds * 1_000
        : undefined,
      this.maxExecutionTimeoutMs,
    ]);
    const idleTimeoutMs = minimumOptionalPositive([
      request.idleTimeoutMs,
      environment.resources.maxIdleSeconds
        ? environment.resources.maxIdleSeconds * 1_000
        : undefined,
    ]);
    const maxStdoutBytes = minimumPositive([
      request.maxStdoutBytes,
      environment.resources.maxStdoutBytes,
      this.maxStdoutBytes,
    ]);
    const maxStderrBytes = minimumPositive([
      request.maxStderrBytes,
      environment.resources.maxStderrBytes,
      this.maxStderrBytes,
    ]);
    const maxCombinedOutputBytes = minimumPositive([
      environment.resources.maxCombinedOutputBytes,
      this.maxCombinedOutputBytes,
      maxStdoutBytes + maxStderrBytes,
    ]);
    return {
      executable,
      cwd,
      environment: commandEnvironment,
      timeoutMs,
      ...(idleTimeoutMs ? { idleTimeoutMs } : {}),
      maxStdoutBytes,
      maxStderrBytes,
      maxCombinedOutputBytes,
    };
  }

  private async resolveExecutable(
    environment: ExecutionEnvironmentSpec,
    requested: string
  ): Promise<string> {
    const resolution = environment.process.executableResolution;
    if (resolution === 'absolute_allowlist' && !path.isAbsolute(requested)) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'This environment requires an absolute executable path.',
        false
      );
    }
    if (resolution === 'path_allowlist' && path.isAbsolute(requested)) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        'This environment requires a configured executable alias.',
        false
      );
    }
    const configuredEntry = path.isAbsolute(requested)
      ? Object.entries(this.executables).find(([, value]) => samePath(value, requested))
      : requested in this.executables
        ? ([requested, this.executables[requested]] as const)
        : undefined;
    if (!configuredEntry) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        `Executable ${requested} is not mapped by the Local Process provider.`,
        false
      );
    }
    const [alias, configuredPath] = configuredEntry;
    const allowed = environment.process.allowedExecutables ?? [];
    if (!allowed.some((entry) => entry === alias || samePath(entry, configuredPath))) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        `Executable ${requested} is not allowed by the execution environment.`,
        false
      );
    }
    const denied = environment.process.deniedExecutables ?? [];
    if (denied.some((entry) => entry === alias || samePath(entry, configuredPath))) {
      throw providerError(
        'EXECUTION_POLICY_DENIED',
        `Executable ${requested} is explicitly denied by the execution environment.`,
        false
      );
    }
    const realConfigured = await fs.realpath(configuredPath);
    if (!samePath(realConfigured, configuredPath)) {
      const realMapped = await fs.realpath(this.executables[alias]);
      if (!samePath(realConfigured, realMapped)) {
        throw providerError(
          'EXECUTION_POLICY_DENIED',
          'Executable resolution changed during validation.',
          false
        );
      }
    }
    await fs.access(
      realConfigured,
      process.platform === 'win32' ? fsConstants.F_OK : fsConstants.X_OK
    );
    return realConfigured;
  }

  private async resolveWorkingDirectory(requested?: string): Promise<string> {
    const candidate = path.resolve(this.workspaceRoot, requested ?? '.');
    assertWithin(candidate, this.workspaceRoot, 'Working directory');
    const [realRoot, realCandidate] = await Promise.all([
      fs.realpath(this.workspaceRoot),
      fs.realpath(candidate),
    ]);
    assertWithin(realCandidate, realRoot, 'Working directory');
    const stat = await fs.stat(realCandidate);
    if (!stat.isDirectory()) {
      throw providerError(
        'EXECUTION_PATH_DENIED',
        'Command working directory must be a directory.',
        false
      );
    }
    return realCandidate;
  }

  private buildEnvironment(
    environment: ExecutionEnvironmentSpec,
    requested?: Record<string, string>
  ): NodeJS.ProcessEnv {
    const allowed = new Set(environment.process.environmentAllowList ?? []);
    const denied = new Set(environment.process.environmentDenyList ?? []);
    const output: NodeJS.ProcessEnv = {};
    const accept = (name: string, value: string | undefined): void => {
      if (allowed.has(name) && !denied.has(name) && value !== undefined) output[name] = value;
    };
    for (const [name, value] of Object.entries(this.baseEnvironment)) accept(name, value);
    for (const name of this.inheritEnvironment) accept(name, process.env[name]);
    for (const [name, value] of Object.entries(requested ?? {})) {
      if (!allowed.has(name) || denied.has(name)) {
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

  private buildExecutionResult(
    request: CommandExecutionRequest,
    executionId: string,
    processResult: LocalProcessRunResult,
    changedFiles: CommandExecutionResult['changedFiles']
  ): CommandExecutionResult {
    const terminal = mapProcessOutcome(processResult);
    const outputBytes = processResult.observedStdoutBytes + processResult.observedStderrBytes;
    return {
      executionId,
      revision: terminal.status === 'cancelled' ? 4 : 3,
      sandboxId: request.sandboxId!,
      status: terminal.status,
      exitCode: terminal.exitCode,
      ...(processResult.signal ? { signal: processResult.signal } : {}),
      stdout: processResult.stdout,
      stderr: processResult.stderr,
      changedFiles,
      generatedArtifactRefs: [],
      resourceUsage: { outputBytes, processCountPeak: 1 },
      startedAt: processResult.startedAt,
      completedAt: processResult.completedAt,
      latencyMs: processResult.latencyMs,
      ...(terminal.error ? { error: terminal.error } : {}),
      metadata: {
        terminationMechanism: processResult.terminationMechanism,
        processTreeTerminationVerified: processResult.processTreeTerminationVerified,
        observedStdoutBytes: processResult.observedStdoutBytes,
        observedStderrBytes: processResult.observedStderrBytes,
        ...(processResult.outputLimitStream
          ? { outputLimitStream: processResult.outputLimitStream }
          : {}),
      },
    };
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

  private removeActiveExecution(
    state: LocalSandboxState,
    executionId: string,
    lastUsedAt: string
  ): void {
    const current = state.record;
    const activeExecutionIds = current.activeExecutionIds.filter((id) => id !== executionId);
    if (current.status === 'busy') {
      state.record = this.transitionSandbox(current, 'ready', { activeExecutionIds, lastUsedAt });
    } else if (activeExecutionIds.length !== current.activeExecutionIds.length) {
      state.record = validateSandboxRecord({
        ...current,
        activeExecutionIds,
        lastUsedAt,
        revision: current.revision + 1,
      });
    }
  }

  private async assertLocalSurfaceAvailable(): Promise<void> {
    await fs.access(this.workspaceRoot, fsConstants.R_OK | fsConstants.W_OK);
    await Promise.all(
      Object.values(this.executables).map((executable) =>
        fs.access(executable, process.platform === 'win32' ? fsConstants.F_OK : fsConstants.X_OK)
      )
    );
  }

  private requireSandbox(sandboxId: string): LocalSandboxState {
    const state = this.sandboxes.get(sandboxId);
    if (!state) {
      throw providerError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Sandbox ${sandboxId} was not found.`,
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
        'Command environment reference does not match the Sandbox environment.',
        false
      );
    }
  }

  private assertCommandScope(record: SandboxRecord, request: CommandExecutionRequest): void {
    this.assertPrincipal(record, request.principal);
    if (record.userId !== request.userId || record.workspaceId !== request.workspaceId) {
      throw providerError(
        'EXECUTION_PERMISSION_DENIED',
        'Command identity does not match the Sandbox scope.',
        false
      );
    }
    if (record.tenantId && record.tenantId !== request.tenantId) {
      throw providerError(
        'EXECUTION_PERMISSION_DENIED',
        'Command tenant does not match the Sandbox scope.',
        false
      );
    }
  }

  private assertPrincipal(record: SandboxRecord, principal: ExecutionPrincipal): void {
    if (principal.userId && principal.userId !== record.userId) {
      throw providerError(
        'EXECUTION_PERMISSION_DENIED',
        'Principal user does not match the Sandbox owner.',
        false
      );
    }
    if (record.tenantId && principal.tenantId && principal.tenantId !== record.tenantId) {
      throw providerError(
        'EXECUTION_PERMISSION_DENIED',
        'Principal tenant does not match the Sandbox owner.',
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
    updates: Partial<SandboxRecord> = {}
  ): SandboxRecord {
    if (!canTransitionSandboxStatus(record.status, status)) {
      throw providerError(
        'EXECUTION_INTERNAL_ERROR',
        `Invalid Sandbox transition ${record.status} -> ${status}.`,
        false
      );
    }
    return validateSandboxRecord({
      ...record,
      ...updates,
      id: record.id,
      status,
      revision: record.revision + 1,
    });
  }

  private assertOpen(): void {
    if (this.closed) {
      throw providerError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        'Local Process provider is closed.',
        false
      );
    }
  }
}

export class LocalProcessExecutionProviderError extends Error {
  constructor(readonly normalizedError: NormalizedExecutionError) {
    super(normalizedError.message);
    this.name = 'LocalProcessExecutionProviderError';
  }
}

function mapProcessOutcome(result: LocalProcessRunResult): {
  status: CommandExecutionResult['status'];
  exitCode: number | null;
  error?: NormalizedExecutionError;
} {
  const details = {
    terminationMechanism: result.terminationMechanism,
    processTreeTerminationVerified: result.processTreeTerminationVerified,
    observedStdoutBytes: result.observedStdoutBytes,
    observedStderrBytes: result.observedStderrBytes,
    ...(result.outputLimitStream ? { outputLimitStream: result.outputLimitStream } : {}),
  };
  if (result.outcome === 'exited' && result.exitCode === 0) {
    return { status: 'completed', exitCode: 0 };
  }
  if (result.outcome === 'cancelled') {
    return {
      status: 'cancelled',
      exitCode: null,
      error: {
        code: 'EXECUTION_CANCELLED',
        message: 'Local Process execution was cancelled.',
        retryable: false,
        details,
      },
    };
  }
  if (result.outcome === 'timed_out' || result.outcome === 'idle_timed_out') {
    return {
      status: 'timed_out',
      exitCode: null,
      error: {
        code: result.outcome === 'idle_timed_out' ? 'EXECUTION_IDLE_TIMEOUT' : 'EXECUTION_TIMEOUT',
        message:
          result.outcome === 'idle_timed_out'
            ? 'Local Process execution exceeded its idle timeout.'
            : 'Local Process execution exceeded its timeout.',
        retryable: true,
        details,
      },
    };
  }
  if (result.outcome === 'output_limit') {
    return {
      status: 'resource_exceeded',
      exitCode: null,
      error: {
        code: 'EXECUTION_OUTPUT_LIMIT',
        message: 'Local Process execution exceeded its output limit.',
        retryable: false,
        details,
      },
    };
  }
  if (result.outcome === 'start_failed') {
    return {
      status: 'failed',
      exitCode: null,
      error: {
        code: 'EXECUTION_PROCESS_START_FAILED',
        message: 'Local Process could not be started.',
        retryable: false,
        providerCode: (result.startError as NodeJS.ErrnoException | undefined)?.code,
        details,
      },
    };
  }
  return {
    status: 'failed',
    exitCode: result.exitCode,
    error: {
      code: 'EXECUTION_INTERNAL_ERROR',
      message: `Local Process exited with code ${String(result.exitCode)}.`,
      retryable: false,
      providerCode: result.exitCode ?? undefined,
      details,
    },
  };
}

function providerError(
  code: NormalizedExecutionError['code'],
  message: string,
  retryable: boolean,
  details?: Record<string, unknown>
): LocalProcessExecutionProviderError {
  return new LocalProcessExecutionProviderError({
    code,
    message,
    retryable,
    ...(details ? { details } : {}),
  });
}

function assertWithin(candidate: string, root: string, subject: string): void {
  const relative = path.relative(root, candidate);
  if (
    relative === '' ||
    (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))
  ) {
    return;
  }
  throw providerError('EXECUTION_PATH_ESCAPE', `${subject} escapes the Workspace root.`, false);
}

function samePath(left: string, right: string): boolean {
  const normalizedLeft = path.resolve(left);
  const normalizedRight = path.resolve(right);
  return process.platform === 'win32'
    ? normalizedLeft.toLowerCase() === normalizedRight.toLowerCase()
    : normalizedLeft === normalizedRight;
}

function minimumPositive(values: Array<number | undefined>): number {
  return Math.min(...values.filter((value): value is number => value !== undefined && value > 0));
}

function minimumOptionalPositive(values: Array<number | undefined>): number | undefined {
  const candidates = values.filter((value): value is number => value !== undefined && value > 0);
  return candidates.length ? Math.min(...candidates) : undefined;
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value <= 0)
    throw new Error(`${name} must be a positive integer.`);
  return value;
}

function nonNegativeInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${name} must be a non-negative integer.`);
  }
  return value;
}

function createDeferred(): { promise: Promise<void>; resolve: () => void } {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

function hashValue(value: unknown): string {
  return `sha256:${createHash('sha256').update(stableStringify(value)).digest('hex')}`;
}

function shortHash(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 16);
}

function stableStringify(value: unknown): string {
  return JSON.stringify(sortValue(value));
}

function sortValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortValue);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => [key, sortValue(entry)])
  );
}

function clone<T>(value: T): T {
  return structuredClone(value);
}
