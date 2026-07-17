import {
  canTransitionSandboxStatus,
  validateSandboxCleanupRequest,
  validateSandboxCreateRequest,
  validateSandboxRecord,
  validateSandboxStartRequest,
  validateSandboxStatusRequest,
  validateSandboxTerminateRequest,
  type CommandExecutionRequest,
  type ExecutionEnvironmentSpec,
  type ExecutionPrincipal,
  type NormalizedExecutionError,
  type SandboxCleanupRequest,
  type SandboxCreateRequest,
  type SandboxRecord,
  type SandboxStartRequest,
  type SandboxStatus,
  type SandboxStatusRequest,
  type SandboxTerminateRequest,
} from '@hypha/core';
import { executionProviderError } from './execution-provider-error';
import type { DockerEnvironmentPolicy } from './docker-execution-policy';
import {
  cloneExecutionValue,
  hashExecutionValue,
  shortExecutionHash,
} from './execution-provider-values';

export interface DockerSandboxStateView {
  record: SandboxRecord;
  environment: ExecutionEnvironmentSpec;
  policy: DockerEnvironmentPolicy;
  containerId: string;
}

export interface DockerSandboxLifecycleOptions {
  providerId: string;
  now?: () => string;
  sandboxId?: (request: SandboxCreateRequest) => string;
}

interface DockerSandboxState extends DockerSandboxStateView {}

export class DockerSandboxLifecycle {
  private readonly providerId: string;
  private readonly now: () => string;
  private readonly sandboxId: (request: SandboxCreateRequest) => string;
  private readonly states = new Map<string, DockerSandboxState>();

  constructor(options: DockerSandboxLifecycleOptions) {
    this.providerId = options.providerId;
    this.now = options.now ?? (() => new Date().toISOString());
    this.sandboxId =
      options.sandboxId ??
      ((request) => `sandbox.docker.${shortExecutionHash(request.operationId)}`);
  }

  create(
    input: SandboxCreateRequest,
    policy: DockerEnvironmentPolicy,
    containerId: string,
    metadata: Record<string, unknown>
  ): SandboxRecord {
    const request = validateSandboxCreateRequest(input);
    const id = this.sandboxId(request);
    if (this.states.has(id)) {
      throw executionProviderError(
        'EXECUTION_IDEMPOTENCY_CONFLICT',
        `Sandbox ${id} already exists.`,
        false
      );
    }
    const record = validateSandboxRecord({
      id,
      revision: 0,
      providerId: this.providerId,
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
      providerSandboxRef: containerId,
      imageDigest: policy.digest,
      activeExecutionIds: [],
      resourceLimits: request.environment.resources,
      networkPolicyHash: hashExecutionValue(request.environment.network),
      mountPolicyHash: hashExecutionValue(request.environment.filesystem),
      createdAt: this.now(),
      metadata: { ...(request.metadata ?? {}), ...metadata },
    });
    this.states.set(id, { record, environment: request.environment, policy, containerId });
    return cloneExecutionValue(record);
  }

  beginStart(input: SandboxStartRequest): DockerSandboxStateView {
    const request = validateSandboxStartRequest(input);
    const state = this.require(request.sandboxId);
    this.assertPrincipal(state.record, request.principal);
    this.assertRevision(state.record.revision, request.expectedRevision, 'Sandbox');
    state.record = this.transition(state.record, 'starting');
    return cloneExecutionValue(state);
  }

  markReady(sandboxId: string): SandboxRecord {
    const state = this.require(sandboxId);
    state.record = this.transition(state.record, 'ready', { readyAt: this.now() });
    return cloneExecutionValue(state.record);
  }

  markFailed(sandboxId: string, error: NormalizedExecutionError): void {
    const state = this.require(sandboxId);
    if (canTransitionSandboxStatus(state.record.status, 'failed')) {
      state.record = this.transition(state.record, 'failed', { error });
    }
  }

  commandState(request: CommandExecutionRequest): DockerSandboxStateView {
    if (!request.sandboxId) {
      throw executionProviderError(
        'EXECUTION_INVALID_REQUEST',
        'Docker execution requires sandboxId.',
        false
      );
    }
    const state = this.require(request.sandboxId);
    this.assertPrincipal(state.record, request.principal);
    if (
      state.record.userId !== request.userId ||
      state.record.workspaceId !== request.workspaceId
    ) {
      throw executionProviderError(
        'EXECUTION_PERMISSION_DENIED',
        'Command identity does not match the Docker Sandbox scope.',
        false
      );
    }
    if (
      request.environmentRef.id !== state.environment.id ||
      request.environmentRef.version !== state.environment.version ||
      (request.environmentRef.revision !== undefined &&
        request.environmentRef.revision !== state.environment.revision)
    ) {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        'Command environment reference does not match the Docker Sandbox environment.',
        false
      );
    }
    if (state.record.status !== 'ready') {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Docker Sandbox ${state.record.id} is ${state.record.status}, not ready.`,
        true
      );
    }
    return cloneExecutionValue(state);
  }

  markBusy(sandboxId: string, executionId: string): void {
    const state = this.require(sandboxId);
    state.record = this.transition(state.record, 'busy', {
      activeExecutionIds: [executionId],
      lastUsedAt: this.now(),
    });
  }

  markExecutionStopped(sandboxId: string, executionId: string, completedAt: string): void {
    const state = this.require(sandboxId);
    const activeExecutionIds = state.record.activeExecutionIds.filter((id) => id !== executionId);
    if (state.record.status === 'busy') {
      state.record = this.transition(state.record, 'stopping', {
        activeExecutionIds,
        lastUsedAt: completedAt,
      });
      state.record = this.transition(state.record, 'stopped', {
        activeExecutionIds: [],
        lastUsedAt: completedAt,
      });
    }
  }

  beginTermination(input: SandboxTerminateRequest): DockerSandboxStateView {
    const request = validateSandboxTerminateRequest(input);
    const state = this.require(request.sandboxId);
    this.assertPrincipal(state.record, request.principal);
    this.assertRevision(state.record.revision, request.expectedRevision, 'Sandbox');
    if (state.record.status !== 'terminated')
      state.record = this.transition(state.record, 'terminating');
    return cloneExecutionValue(state);
  }

  finishTermination(sandboxId: string): void {
    const state = this.require(sandboxId);
    if (state.record.status !== 'terminated') {
      state.record = this.transition(state.record, 'terminated', {
        activeExecutionIds: [],
        terminatedAt: this.now(),
      });
    }
  }

  beginCleanup(input: SandboxCleanupRequest): DockerSandboxStateView {
    const request = validateSandboxCleanupRequest(input);
    const state = this.require(request.sandboxId);
    this.assertPrincipal(state.record, request.principal);
    this.assertRevision(state.record.revision, request.expectedRevision, 'Sandbox');
    if (state.record.status === 'busy' || state.record.status === 'terminating') {
      throw executionProviderError(
        'EXECUTION_CLEANUP_FAILED',
        `Docker Sandbox ${state.record.id} must finish termination before cleanup.`,
        true
      );
    }
    if (state.record.status !== 'cleaned') state.record = this.transition(state.record, 'cleaning');
    return cloneExecutionValue(state);
  }

  finishCleanup(sandboxId: string): void {
    const state = this.require(sandboxId);
    if (state.record.status !== 'cleaned') {
      state.record = this.transition(state.record, 'cleaned', { cleanedAt: this.now() });
    }
  }

  status(input: SandboxStatusRequest): SandboxRecord | null {
    const request = validateSandboxStatusRequest(input);
    const state = this.states.get(request.sandboxId);
    if (!state) return null;
    this.assertPrincipal(state.record, request.principal);
    return cloneExecutionValue(state.record);
  }

  stateForPrincipal(sandboxId: string, principal: ExecutionPrincipal): DockerSandboxStateView {
    const state = this.require(sandboxId);
    this.assertPrincipal(state.record, principal);
    return cloneExecutionValue(state);
  }

  uncleaned(): DockerSandboxStateView[] {
    return [...this.states.values()]
      .filter((state) => state.record.status !== 'cleaned')
      .map(cloneExecutionValue);
  }

  private require(sandboxId: string): DockerSandboxState {
    const state = this.states.get(sandboxId);
    if (!state) {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Docker Sandbox ${sandboxId} was not found.`,
        false
      );
    }
    return state;
  }

  private assertPrincipal(record: SandboxRecord, principal: ExecutionPrincipal): void {
    if (principal.userId && principal.userId !== record.userId) {
      throw executionProviderError(
        'EXECUTION_PERMISSION_DENIED',
        'Principal user does not own the Sandbox.',
        false
      );
    }
    if (record.tenantId && principal.tenantId && principal.tenantId !== record.tenantId) {
      throw executionProviderError(
        'EXECUTION_PERMISSION_DENIED',
        'Principal tenant does not own the Sandbox.',
        false
      );
    }
  }

  private assertRevision(actual: number, expected: number, subject: string): void {
    if (actual !== expected) {
      throw executionProviderError(
        'EXECUTION_REVISION_CONFLICT',
        `${subject} revision ${actual} does not match expected revision ${expected}.`,
        true,
        { actualRevision: actual, expectedRevision: expected }
      );
    }
  }

  private transition(
    record: SandboxRecord,
    status: SandboxStatus,
    updates: Partial<SandboxRecord> = {}
  ): SandboxRecord {
    if (!canTransitionSandboxStatus(record.status, status)) {
      throw executionProviderError(
        'EXECUTION_INVALID_REQUEST',
        `Cannot transition Docker Sandbox from ${record.status} to ${status}.`,
        false
      );
    }
    return validateSandboxRecord({ ...record, ...updates, status, revision: record.revision + 1 });
  }
}
