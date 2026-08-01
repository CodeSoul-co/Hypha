import type { JsonSchema, SpecRef } from '../specs';

export const RUNTIME_PRINCIPAL_TYPES = ['user', 'agent', 'service', 'system'] as const;
export const RUNTIME_SESSION_STATUSES = ['active', 'closed', 'archived'] as const;
export const RUNTIME_RUN_STATUSES = [
  'created',
  'queued',
  'starting',
  'acquiring',
  'running',
  'waiting',
  'waiting_human',
  'waiting_signal',
  'waiting_timer',
  'pausing',
  'paused',
  'retry_scheduled',
  'recovering',
  'cancelling',
  'completed',
  'failed',
  'cancelled',
  'timed_out',
] as const;
export const RUNTIME_WAIT_TYPES = ['human', 'signal', 'timer', 'external_operation'] as const;
export const RUNTIME_WAIT_STATUSES = ['waiting', 'received', 'expired', 'cancelled'] as const;
export const RUNTIME_ERROR_CODES = [
  'RUNTIME_INVALID_INPUT',
  'RUNTIME_MESSAGE_BUS_UNAVAILABLE',
  'RUNTIME_MESSAGE_SCHEMA_INVALID',
  'RUNTIME_MESSAGE_DEAD_LETTERED',
  'RUNTIME_SESSION_QUEUE_CONFLICT',
  'RUNTIME_SESSION_QUEUE_OVERFLOW',
  'RUNTIME_FENCING_REJECTED',
  'RUNTIME_RESOURCE_CONFLICT',
  'RUNTIME_IDEMPOTENCY_CONFLICT',
  'RUNTIME_EVENT_STREAM_CORRUPT',
  'RUNTIME_RECOVERY_REQUIRES_REVIEW',
  'RUNTIME_RUN_NOT_FOUND',
  'RUNTIME_RUN_CONFLICT',
  'RUNTIME_LEASE_CONFLICT',
  'RUNTIME_WORKFLOW_INVALID',
  'RUNTIME_PROCESS_MISMATCH',
  'RUNTIME_STATE_NOT_FOUND',
  'RUNTIME_TRANSITION_REJECTED',
  'RUNTIME_GUARD_FAILED',
  'RUNTIME_INVARIANT_FAILED',
  'RUNTIME_STATE_TIMEOUT',
  'RUNTIME_RUN_TIMEOUT',
  'RUNTIME_CANCELLED',
  'RUNTIME_SIGNAL_INVALID',
  'RUNTIME_SIGNAL_EXPIRED',
  'RUNTIME_RETRY_EXHAUSTED',
  'RUNTIME_CHECKPOINT_FAILED',
  'RUNTIME_EVENT_APPEND_FAILED',
  'RUNTIME_PROJECTION_FAILED',
  'RUNTIME_REPLAY_DIVERGENCE',
  'RUNTIME_INTERNAL_ERROR',
] as const;

export type RuntimePrincipalType = (typeof RUNTIME_PRINCIPAL_TYPES)[number];
export type RuntimeSessionStatus = (typeof RUNTIME_SESSION_STATUSES)[number];
export type RuntimeRunStatus = (typeof RUNTIME_RUN_STATUSES)[number];
export type RuntimeWaitType = (typeof RUNTIME_WAIT_TYPES)[number];
export type RuntimeWaitStatus = (typeof RUNTIME_WAIT_STATUSES)[number];
export type RuntimeErrorCode = (typeof RUNTIME_ERROR_CODES)[number];

export interface RuntimeScope {
  tenantId?: string;
  userId: string;
  workspaceId?: string;
  sessionId: string;
  runId: string;
  agentId?: string;
}

export interface RuntimePrincipal {
  principalId: string;
  type: RuntimePrincipalType;
  tenantId?: string;
  userId?: string;
  agentId?: string;
  roles?: string[];
  permissionScopes: string[];
  metadata?: Record<string, unknown>;
}

export interface NormalizedRuntimeError {
  code: RuntimeErrorCode;
  message: string;
  retryable: boolean;
  stateId?: string;
  transitionId?: string;
  details?: Record<string, unknown>;
  causeRef?: string;
}

export interface RuntimeSession {
  id: string;
  revision: number;
  tenantId?: string;
  userId: string;
  workspaceId?: string;
  domainPackRef?: SpecRef;
  sessionProfileRef?: SpecRef;
  title?: string;
  metadata: Record<string, unknown>;
  status: RuntimeSessionStatus;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}

export interface RuntimeRun {
  id: string;
  revision: number;
  tenantId?: string;
  userId: string;
  workspaceId?: string;
  sessionId: string;
  domainPackRef?: SpecRef;
  workflowRef: SpecRef;
  workflowRevision: string;
  processSpecRef: string;
  processHash: string;
  rootAgentRef?: SpecRef;
  runtimeProfileRef?: SpecRef;
  status: RuntimeRunStatus;
  input: unknown;
  inputHash: string;
  output?: unknown;
  outputHash?: string;
  currentState?: string;
  terminalState?: string;
  correlationId: string;
  idempotencyKey?: string;
  deadlineAt?: string;
  cancelRequestedAt?: string;
  cancelReason?: string;
  createdAt: string;
  queuedAt?: string;
  startedAt?: string;
  updatedAt: string;
  completedAt?: string;
  error?: NormalizedRuntimeError;
  metadata?: Record<string, unknown>;
}

export interface RuntimeWaitRequest {
  type: RuntimeWaitType;
  key?: string;
  expectedSchema?: JsonSchema;
  expiresAt?: string;
  timeoutTransitionId?: string;
  pendingActionRef?: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeWaitRecord {
  id: string;
  runId: string;
  stateId: string;
  type: RuntimeWaitType;
  key?: string;
  status: RuntimeWaitStatus;
  expectedSchemaHash?: string;
  createdAt: string;
  expiresAt?: string;
  resolvedAt?: string;
  signalRef?: string;
}

export interface RunSignalRequest {
  signalId: string;
  runId: string;
  key: string;
  principal: RuntimePrincipal;
  payload: unknown;
  idempotencyKey?: string;
  sentAt: string;
}
