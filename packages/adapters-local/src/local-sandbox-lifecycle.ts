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
  type SandboxCleanupRequest,
  type SandboxCreateRequest,
  type SandboxRecord,
  type SandboxStartRequest,
  type SandboxStatus,
  type SandboxStatusRequest,
  type SandboxTerminateRequest,
} from '@hypha/core';
import { executionProviderError } from './execution-provider-error';
import {
  cloneExecutionValue,
  hashExecutionValue,
  shortExecutionHash,
} from './execution-provider-values';

export interface LocalSandboxLifecycleOptions {
  providerId: string;
  workspaceRoot: string;
  now?: () => string;
  sandboxId?: (request: SandboxCreateRequest) => string;
}

interface LocalSandboxState {
  record: SandboxRecord;
  environment: ExecutionEnvironmentSpec;
}

/** Owns Local Sandbox records, revision fencing, transitions, and cleanup state. */
export class LocalSandboxLifecycle {
  private readonly providerId: string;
  private readonly workspaceRoot: string;
  private readonly now: () => string;
  private readonly sandboxId: (request: SandboxCreateRequest) => string;
  private readonly sandboxes = new Map<string, LocalSandboxState>();

  constructor(options: LocalSandboxLifecycleOptions) {
    this.providerId = options.providerId;
    this.workspaceRoot = options.workspaceRoot;
    this.now = options.now ?? (() => new Date().toISOString());
    this.sandboxId =
      options.sandboxId ??
      ((request) => `sandbox.local.${shortExecutionHash(request.operationId)}`);
  }

  create(input: SandboxCreateRequest, metadata: Record<string, unknown>): SandboxRecord {
    const request = validateSandboxCreateRequest(input);
    const id = this.sandboxId(request);
    if (this.sandboxes.has(id)) {
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
      providerSandboxRef: `local:${shortExecutionHash(this.workspaceRoot)}`,
      activeExecutionIds: [],
      resourceLimits: request.environment.resources,
      networkPolicyHash: hashExecutionValue(request.environment.network),
      mountPolicyHash: hashExecutionValue(request.environment.filesystem),
      createdAt: this.now(),
      metadata: { ...(request.metadata ?? {}), ...metadata },
    });
    this.sandboxes.set(id, { record, environment: request.environment });
    return cloneExecutionValue(record);
  }

  start(input: SandboxStartRequest): SandboxRecord {
    const request = validateSandboxStartRequest(input);
    const state = this.require(request.sandboxId);
    this.assertPrincipal(state.record, request.principal);
    this.assertRevision(state.record.revision, request.expectedRevision, 'Sandbox');
    state.record = this.transition(state.record, 'starting');
    state.record = this.transition(state.record, 'ready', { readyAt: this.now() });
    return cloneExecutionValue(state.record);
  }

  environmentForCommand(request: CommandExecutionRequest): ExecutionEnvironmentSpec {
    if (!request.sandboxId) {
      throw executionProviderError(
        'EXECUTION_INVALID_REQUEST',
        'Local Process execution requires sandboxId.',
        false
      );
    }
    const state = this.require(request.sandboxId);
    this.assertCommandScope(state.record, request);
    if (
      request.environmentRef.id !== state.environment.id ||
      request.environmentRef.version !== state.environment.version ||
      (request.environmentRef.revision !== undefined &&
        request.environmentRef.revision !== state.environment.revision)
    ) {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        'Command environment reference does not match the Sandbox environment.',
        false
      );
    }
    if (state.record.status !== 'ready') {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Sandbox ${state.record.id} is ${state.record.status}, not ready.`,
        true
      );
    }
    return cloneExecutionValue(state.environment);
  }

  markBusy(sandboxId: string, executionId: string): SandboxRecord {
    const state = this.require(sandboxId);
    state.record = this.transition(state.record, 'busy', {
      activeExecutionIds: [...state.record.activeExecutionIds, executionId],
      lastUsedAt: this.now(),
    });
    return cloneExecutionValue(state.record);
  }

  markExecutionComplete(
    sandboxId: string,
    executionId: string,
    completedAt: string
  ): SandboxRecord {
    const state = this.require(sandboxId);
    const activeExecutionIds = state.record.activeExecutionIds.filter((id) => id !== executionId);
    if (state.record.status === 'busy') {
      state.record = this.transition(state.record, 'ready', {
        activeExecutionIds,
        lastUsedAt: completedAt,
      });
    } else if (activeExecutionIds.length !== state.record.activeExecutionIds.length) {
      state.record = validateSandboxRecord({
        ...state.record,
        activeExecutionIds,
        lastUsedAt: completedAt,
        revision: state.record.revision + 1,
      });
    }
    return cloneExecutionValue(state.record);
  }

  beginTermination(input: SandboxTerminateRequest): SandboxRecord {
    const request = validateSandboxTerminateRequest(input);
    const state = this.require(request.sandboxId);
    this.assertPrincipal(state.record, request.principal);
    this.assertRevision(state.record.revision, request.expectedRevision, 'Sandbox');
    if (state.record.status !== 'terminated') {
      state.record = this.transition(state.record, 'terminating');
    }
    return cloneExecutionValue(state.record);
  }

  finishTermination(sandboxId: string): SandboxRecord {
    const state = this.require(sandboxId);
    if (state.record.status === 'terminated') return cloneExecutionValue(state.record);
    state.record = this.transition(state.record, 'terminated', {
      activeExecutionIds: [],
      terminatedAt: this.now(),
    });
    return cloneExecutionValue(state.record);
  }

  cleanup(input: SandboxCleanupRequest): void {
    const request = validateSandboxCleanupRequest(input);
    const state = this.require(request.sandboxId);
    this.assertPrincipal(state.record, request.principal);
    this.assertRevision(state.record.revision, request.expectedRevision, 'Sandbox');
    if (state.record.status === 'cleaned') return;
    if (state.record.status === 'busy' || state.record.status === 'terminating') {
      throw executionProviderError(
        'EXECUTION_CLEANUP_FAILED',
        `Sandbox ${state.record.id} must finish termination before cleanup.`,
        true
      );
    }
    state.record = this.transition(state.record, 'cleaning');
    state.record = this.transition(state.record, 'cleaned', { cleanedAt: this.now() });
  }

  status(input: SandboxStatusRequest): SandboxRecord | null {
    const request = validateSandboxStatusRequest(input);
    const state = this.sandboxes.get(request.sandboxId);
    if (!state) return null;
    this.assertPrincipal(state.record, request.principal);
    return cloneExecutionValue(state.record);
  }

  private require(sandboxId: string): LocalSandboxState {
    const state = this.sandboxes.get(sandboxId);
    if (!state) {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Sandbox ${sandboxId} was not found.`,
        false
      );
    }
    return state;
  }

  private assertCommandScope(record: SandboxRecord, request: CommandExecutionRequest): void {
    this.assertPrincipal(record, request.principal);
    if (record.userId !== request.userId || record.workspaceId !== request.workspaceId) {
      throw executionProviderError(
        'EXECUTION_PERMISSION_DENIED',
        'Command identity does not match the Sandbox scope.',
        false
      );
    }
    if (record.tenantId && record.tenantId !== request.tenantId) {
      throw executionProviderError(
        'EXECUTION_PERMISSION_DENIED',
        'Command tenant does not match the Sandbox scope.',
        false
      );
    }
  }

  private assertPrincipal(record: SandboxRecord, principal: ExecutionPrincipal): void {
    if (principal.userId && principal.userId !== record.userId) {
      throw executionProviderError(
        'EXECUTION_PERMISSION_DENIED',
        'Principal user does not match the Sandbox owner.',
        false
      );
    }
    if (record.tenantId && principal.tenantId && principal.tenantId !== record.tenantId) {
      throw executionProviderError(
        'EXECUTION_PERMISSION_DENIED',
        'Principal tenant does not match the Sandbox owner.',
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
}
