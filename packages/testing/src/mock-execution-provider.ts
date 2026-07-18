import { createHash } from 'node:crypto';
import {
  canTransitionSandboxStatus,
  validateCommandExecutionRequest,
  validateCommandExecutionResult,
  validateExecutionCancelRequest,
  validateSandboxCleanupRequest,
  validateSandboxCreateRequest,
  validateSandboxProviderCapabilities,
  validateSandboxRecord,
  validateSandboxStartRequest,
  validateSandboxStatusRequest,
  validateSandboxTerminateRequest,
  type CommandExecutionRequest,
  type CommandExecutionResult,
  type CommandExecutionStatus,
  type ExecutionCancelRequest,
  type ExecutionResourceUsage,
  type FileMutation,
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

const defaultCapabilities: SandboxProviderCapabilities = {
  processIsolation: false,
  filesystemIsolation: false,
  networkIsolation: false,
  cpuLimits: false,
  memoryLimits: false,
  diskLimits: false,
  pidsLimit: false,
  cancellation: true,
  processTreeKill: true,
  snapshots: true,
  imageDigestPinning: false,
  remoteExecution: false,
};

export interface MockExecutionBehavior {
  delayMs?: number;
  status?: Extract<
    CommandExecutionStatus,
    'completed' | 'failed' | 'timed_out' | 'oom_killed' | 'resource_exceeded' | 'quarantined'
  >;
  exitCode?: number | null;
  signal?: string;
  stdout?: string;
  stderr?: string;
  stdoutTruncated?: boolean;
  stderrTruncated?: boolean;
  stdoutArtifactRef?: string;
  stderrArtifactRef?: string;
  changedFiles?: FileMutation[];
  generatedArtifactRefs?: string[];
  snapshotBeforeRef?: string;
  snapshotAfterRef?: string;
  resourceUsage?: ExecutionResourceUsage;
  error?: NormalizedExecutionError;
  metadata?: Record<string, unknown>;
}

export interface MockExecutionProviderOptions {
  id?: string;
  now?: () => string;
  sandboxId?: (request: SandboxCreateRequest) => string;
  executionId?: (request: CommandExecutionRequest) => string;
  capabilities?: Partial<SandboxProviderCapabilities>;
  health?: ProviderHealth;
  behaviors?: MockExecutionBehavior[];
  defaultBehavior?: MockExecutionBehavior;
}

interface InFlightExecution {
  sandboxId: string;
  revision: number;
  cancelled: boolean;
  wake?: () => void;
}

/**
 * Deterministic, in-memory SandboxProvider for contract tests, replay fixtures,
 * and failure injection. It never starts a process or mutates a real Workspace.
 */
export class MockExecutionProvider implements SandboxProvider {
  readonly id: string;

  private readonly now: () => string;
  private readonly sandboxId: (request: SandboxCreateRequest) => string;
  private readonly executionId: (request: CommandExecutionRequest) => string;
  private readonly providerCapabilities: SandboxProviderCapabilities;
  private readonly defaultBehavior: MockExecutionBehavior;
  private readonly behaviorQueue: MockExecutionBehavior[];
  private readonly sandboxes = new Map<string, SandboxRecord>();
  private readonly executions = new Map<string, CommandExecutionResult>();
  private readonly inFlight = new Map<string, InFlightExecution>();
  private healthState: ProviderHealth;
  private closed = false;

  constructor(options: MockExecutionProviderOptions = {}) {
    this.id = options.id ?? 'provider.mock';
    this.now = options.now ?? (() => new Date().toISOString());
    this.sandboxId =
      options.sandboxId ?? ((request) => `sandbox.mock.${stableDigest(request.operationId)}`);
    this.executionId =
      options.executionId ?? ((request) => `execution.mock.${stableDigest(request.operationId)}`);
    this.providerCapabilities = validateSandboxProviderCapabilities({
      ...defaultCapabilities,
      ...options.capabilities,
    });
    this.defaultBehavior = clone(options.defaultBehavior ?? {});
    this.behaviorQueue = (options.behaviors ?? []).map(clone);
    this.healthState = clone(
      options.health ?? {
        status: 'healthy',
        checkedAt: this.now(),
        message: 'Mock execution provider is ready.',
      }
    );
  }

  enqueue(behavior: MockExecutionBehavior): void {
    this.assertOpen();
    this.behaviorQueue.push(clone(behavior));
  }

  setHealth(health: ProviderHealth): void {
    this.assertOpen();
    this.healthState = clone(health);
  }

  async capabilities(): Promise<SandboxProviderCapabilities> {
    this.assertOpen();
    return clone(this.providerCapabilities);
  }

  async create(input: SandboxCreateRequest): Promise<SandboxRecord> {
    this.assertOpen();
    const request = validateSandboxCreateRequest(input);
    if (request.environment.provider !== 'mock') {
      throw providerError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Mock provider cannot create ${request.environment.provider} environments.`,
        false
      );
    }

    const sandboxId = this.sandboxId(request);
    if (this.sandboxes.has(sandboxId)) {
      throw providerError(
        'EXECUTION_IDEMPOTENCY_CONFLICT',
        `Sandbox ${sandboxId} already exists.`,
        false
      );
    }

    const createdAt = this.now();
    const record = validateSandboxRecord({
      id: sandboxId,
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
      providerSandboxRef: `mock:${sandboxId}`,
      activeExecutionIds: [],
      resourceLimits: request.environment.resources,
      networkPolicyHash: hashValue(request.environment.network),
      mountPolicyHash: hashValue(request.environment.filesystem),
      createdAt,
      metadata: clone(request.metadata),
    });
    this.sandboxes.set(record.id, record);
    return clone(record);
  }

  async start(input: SandboxStartRequest): Promise<SandboxRecord> {
    this.assertOpen();
    const request = validateSandboxStartRequest(input);
    let record = this.requireSandbox(request.sandboxId);
    this.assertPrincipal(record, request.principal);
    this.assertRevision(record.revision, request.expectedRevision, 'Sandbox');
    record = this.transitionSandbox(record, 'starting');
    record = this.transitionSandbox(record, 'ready', { readyAt: this.now() });
    this.sandboxes.set(record.id, record);
    return clone(record);
  }

  async execute(input: CommandExecutionRequest): Promise<CommandExecutionResult> {
    this.assertOpen();
    const request = validateCommandExecutionRequest(input);
    if (!request.sandboxId) {
      throw providerError(
        'EXECUTION_INVALID_REQUEST',
        'Mock provider execution requires sandboxId.',
        false
      );
    }

    let sandbox = this.requireSandbox(request.sandboxId);
    this.assertCommandScope(sandbox, request);
    if (sandbox.status !== 'ready') {
      throw providerError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Sandbox ${sandbox.id} is ${sandbox.status}, not ready.`,
        true
      );
    }

    const executionId = request.executionId ?? this.executionId(request);
    if (this.executions.has(executionId) || this.inFlight.has(executionId)) {
      throw providerError(
        'EXECUTION_IDEMPOTENCY_CONFLICT',
        `Execution ${executionId} already exists.`,
        false
      );
    }

    const behavior = this.nextBehavior();
    const startedAt = this.now();
    const active: InFlightExecution = {
      sandboxId: sandbox.id,
      revision: 2,
      cancelled: false,
    };
    this.inFlight.set(executionId, active);
    sandbox = this.transitionSandbox(sandbox, 'busy', {
      activeExecutionIds: [...sandbox.activeExecutionIds, executionId],
      lastUsedAt: startedAt,
    });
    this.sandboxes.set(sandbox.id, sandbox);

    let result: CommandExecutionResult | undefined;
    try {
      await this.waitForBehavior(behavior.delayMs ?? 0, active);
      result = validateCommandExecutionResult(
        this.buildResult(request, executionId, behavior, active.cancelled, startedAt)
      );
      this.executions.set(executionId, result);
      return clone(result);
    } finally {
      this.inFlight.delete(executionId);
      const current = this.sandboxes.get(sandbox.id);
      if (current && current.status === 'busy') {
        this.sandboxes.set(
          current.id,
          this.transitionSandbox(current, 'ready', {
            activeExecutionIds: current.activeExecutionIds.filter((id) => id !== executionId),
            lastUsedAt: result?.completedAt ?? this.now(),
          })
        );
      }
    }
  }

  async cancel(input: ExecutionCancelRequest): Promise<void> {
    this.assertOpen();
    const request = validateExecutionCancelRequest(input);
    const active = this.inFlight.get(request.executionId);
    if (!active) {
      throw providerError(
        'EXECUTION_RESULT_UNKNOWN',
        `Execution ${request.executionId} is not running.`,
        false
      );
    }
    const sandbox = this.requireSandbox(active.sandboxId);
    this.assertPrincipal(sandbox, request.principal);
    this.assertRevision(active.revision, request.expectedRevision, 'Execution');
    active.revision += 1;
    active.cancelled = true;
    active.wake?.();
  }

  async terminate(input: SandboxTerminateRequest): Promise<void> {
    this.assertOpen();
    const request = validateSandboxTerminateRequest(input);
    let record = this.requireSandbox(request.sandboxId);
    this.assertPrincipal(record, request.principal);
    this.assertRevision(record.revision, request.expectedRevision, 'Sandbox');
    this.cancelSandboxExecutions(record);
    record = this.transitionSandbox(record, 'terminating', { activeExecutionIds: [] });
    record = this.transitionSandbox(record, 'terminated', { terminatedAt: this.now() });
    this.sandboxes.set(record.id, record);
  }

  async status(input: SandboxStatusRequest): Promise<SandboxRecord | null> {
    this.assertOpen();
    const request = validateSandboxStatusRequest(input);
    const record = this.sandboxes.get(request.sandboxId);
    if (!record) return null;
    this.assertPrincipal(record, request.principal);
    return clone(record);
  }

  async cleanup(input: SandboxCleanupRequest): Promise<void> {
    this.assertOpen();
    const request = validateSandboxCleanupRequest(input);
    let record = this.requireSandbox(request.sandboxId);
    this.assertPrincipal(record, request.principal);
    this.assertRevision(record.revision, request.expectedRevision, 'Sandbox');
    this.cancelSandboxExecutions(record);
    record = this.transitionSandbox(record, 'cleaning', { activeExecutionIds: [] });
    record = this.transitionSandbox(record, 'cleaned', { cleanedAt: this.now() });
    this.sandboxes.set(record.id, record);
  }

  async health(): Promise<ProviderHealth> {
    if (this.closed) {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        message: 'Mock execution provider is closed.',
      };
    }
    return clone(this.healthState);
  }

  async close(): Promise<void> {
    for (const active of this.inFlight.values()) {
      active.cancelled = true;
      active.wake?.();
    }
    this.closed = true;
  }

  private nextBehavior(): MockExecutionBehavior {
    return clone(this.behaviorQueue.shift() ?? this.defaultBehavior);
  }

  private async waitForBehavior(delayMs: number, active: InFlightExecution): Promise<void> {
    if (!Number.isFinite(delayMs) || delayMs < 0) {
      throw providerError(
        'EXECUTION_INVALID_REQUEST',
        'Mock execution delay must be a finite non-negative number.',
        false
      );
    }
    if (delayMs === 0 || active.cancelled) return;
    await new Promise<void>((resolve) => {
      const timer = setTimeout(resolve, delayMs);
      active.wake = () => {
        clearTimeout(timer);
        resolve();
      };
    });
    active.wake = undefined;
  }

  private buildResult(
    request: CommandExecutionRequest,
    executionId: string,
    behavior: MockExecutionBehavior,
    cancelled: boolean,
    startedAt: string
  ): CommandExecutionResult {
    const status = cancelled ? 'cancelled' : (behavior.status ?? 'completed');
    const error = resultError(status, behavior.error);
    const completedAt = this.now();
    return {
      executionId,
      revision: cancelled ? 4 : 3,
      sandboxId: request.sandboxId!,
      status,
      exitCode: behavior.exitCode ?? (status === 'completed' ? 0 : null),
      ...(behavior.signal ? { signal: behavior.signal } : {}),
      ...(behavior.stdout !== undefined ? { stdout: behavior.stdout } : {}),
      ...(behavior.stderr !== undefined ? { stderr: behavior.stderr } : {}),
      ...(behavior.stdoutTruncated !== undefined
        ? { stdoutTruncated: behavior.stdoutTruncated }
        : {}),
      ...(behavior.stderrTruncated !== undefined
        ? { stderrTruncated: behavior.stderrTruncated }
        : {}),
      ...(behavior.stdoutArtifactRef ? { stdoutArtifactRef: behavior.stdoutArtifactRef } : {}),
      ...(behavior.stderrArtifactRef ? { stderrArtifactRef: behavior.stderrArtifactRef } : {}),
      changedFiles: clone(behavior.changedFiles ?? []),
      generatedArtifactRefs: clone(behavior.generatedArtifactRefs ?? []),
      ...(behavior.snapshotBeforeRef ? { snapshotBeforeRef: behavior.snapshotBeforeRef } : {}),
      ...(behavior.snapshotAfterRef ? { snapshotAfterRef: behavior.snapshotAfterRef } : {}),
      ...(behavior.resourceUsage ? { resourceUsage: clone(behavior.resourceUsage) } : {}),
      startedAt,
      completedAt,
      latencyMs: behavior.delayMs ?? 0,
      ...(error ? { error } : {}),
      ...(behavior.metadata ? { metadata: clone(behavior.metadata) } : {}),
    };
  }

  private requireSandbox(sandboxId: string): SandboxRecord {
    const record = this.sandboxes.get(sandboxId);
    if (!record) {
      throw providerError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Sandbox ${sandboxId} was not found.`,
        false
      );
    }
    return record;
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

  private assertPrincipal(
    record: SandboxRecord,
    principal: SandboxStatusRequest['principal']
  ): void {
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

  private cancelSandboxExecutions(record: SandboxRecord): void {
    for (const executionId of record.activeExecutionIds) {
      const active = this.inFlight.get(executionId);
      if (active) {
        active.revision += 1;
        active.cancelled = true;
        active.wake?.();
      }
    }
  }

  private assertOpen(): void {
    if (this.closed) {
      throw providerError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        'Mock execution provider is closed.',
        false
      );
    }
  }
}

export class MockExecutionProviderError extends Error {
  constructor(readonly normalizedError: NormalizedExecutionError) {
    super(normalizedError.message);
    this.name = 'MockExecutionProviderError';
  }
}

function resultError(
  status: CommandExecutionResult['status'],
  configured?: NormalizedExecutionError
): NormalizedExecutionError | undefined {
  if (status === 'completed') return undefined;
  if (configured) return clone(configured);
  const defaults: Partial<
    Record<CommandExecutionResult['status'], NormalizedExecutionError['code']>
  > = {
    failed: 'EXECUTION_INTERNAL_ERROR',
    timed_out: 'EXECUTION_TIMEOUT',
    cancelled: 'EXECUTION_CANCELLED',
    oom_killed: 'EXECUTION_OOM_KILLED',
    resource_exceeded: 'EXECUTION_RESOURCE_EXCEEDED',
    quarantined: 'EXECUTION_POLICY_DENIED',
  };
  return {
    code: defaults[status] ?? 'EXECUTION_INTERNAL_ERROR',
    message: `Mock execution ended with status ${status}.`,
    retryable: status === 'timed_out' || status === 'resource_exceeded',
  };
}

function providerError(
  code: NormalizedExecutionError['code'],
  message: string,
  retryable: boolean,
  details?: Record<string, unknown>
): MockExecutionProviderError {
  return new MockExecutionProviderError({
    code,
    message,
    retryable,
    ...(details ? { details } : {}),
  });
}

function hashValue(value: unknown): string {
  return `sha256:${createHash('sha256').update(stableStringify(value)).digest('hex')}`;
}

function stableDigest(value: string): string {
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
  return value === undefined ? value : structuredClone(value);
}
