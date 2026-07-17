import type { SpecRef } from '../specs';

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

export const RUNTIME_ACTION_TYPES = [
  'tool',
  'memory_read',
  'memory_write',
  'model',
  'workspace',
  'execution',
  'human_review',
  'transition',
  'finish_state',
] as const;

export const STATE_EXECUTION_STATUSES = [
  'completed',
  'continue',
  'waiting_human',
  'waiting_signal',
  'waiting_timer',
  'paused',
  'failed',
] as const;

export const FSM_INSTANCE_STATUSES = [
  'uninitialized',
  'initializing',
  'ready',
  'executing_state',
  'evaluating_transition',
  'committing_transition',
  'waiting',
  'terminal',
  'error',
] as const;

export const STATE_ATTEMPT_STATUSES = [
  'scheduled',
  'claimed',
  'entered',
  'executing',
  'waiting_activity',
  'waiting_human',
  'waiting_signal',
  'waiting_timer',
  'verifying',
  'completed',
  'retryable_failed',
  'failed',
  'cancelled',
  'abandoned',
] as const;

export const RUNTIME_ACTIVITY_TYPES = [
  'model',
  'tool',
  'memory',
  'execution',
  'human',
  'custom',
] as const;

export const RUNTIME_ACTIVITY_STATUSES = [
  'completed',
  'failed',
  'waiting',
  'cancelled',
  'unknown',
] as const;

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
export type FSMInstanceStatus = (typeof FSM_INSTANCE_STATUSES)[number];
export type StateAttemptStatus = (typeof STATE_ATTEMPT_STATUSES)[number];
export type RuntimeActivityType = (typeof RUNTIME_ACTIVITY_TYPES)[number];
export type RuntimeActivityStatus = (typeof RUNTIME_ACTIVITY_STATUSES)[number];
export type RuntimeErrorCode = (typeof RUNTIME_ERROR_CODES)[number];
export type RuntimeWaitType = (typeof RUNTIME_WAIT_TYPES)[number];
export type RuntimeWaitStatus = (typeof RUNTIME_WAIT_STATUSES)[number];
export type RuntimeActionType = (typeof RUNTIME_ACTION_TYPES)[number];
export type StateExecutionStatus = (typeof STATE_EXECUTION_STATUSES)[number];

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
  expectedSchema?: Record<string, unknown>;
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

export interface RuntimeActionProposal {
  id: string;
  type: RuntimeActionType;
  targetRef?: SpecRef | string;
  input?: unknown;
  rationaleSummary?: string;
  expectedOutcome?: string;
  idempotencyKey?: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeTransitionProposal {
  to: string;
  reason?: string;
  variablesPatch?: Record<string, unknown>;
}

export interface StateExecutionResult {
  status: StateExecutionStatus;
  output?: unknown;
  outputHash?: string;
  proposedTransitionId?: string;
  transition?: RuntimeTransitionProposal;
  variablesPatch?: Record<string, unknown>;
  evidenceEventIds?: string[];
  artifactRefs?: string[];
  memoryRefs?: string[];
  toolInvocationRefs?: string[];
  wait?: RuntimeWaitRequest;
  failure?: NormalizedRuntimeError;
  metadata?: Record<string, unknown>;
}

export interface StateAttemptRecord {
  id: string;
  runId: string;
  stateId: string;
  attempt: number;
  status: StateAttemptStatus;
  claimId?: string;
  fencingToken?: number;
  enteredEventId?: string;
  terminalEventId?: string;
  inputHash: string;
  outputHash?: string;
  error?: NormalizedRuntimeError;
  createdAt: string;
  updatedAt: string;
}

export interface RuntimeActivityRequest<TInput = unknown> {
  activityId: string;
  activityType: RuntimeActivityType;
  runId: string;
  sessionId: string;
  stateAttemptId: string;
  operationId: string;
  input: TInput;
  deadlineAt?: string;
  idempotencyKey?: string;
  fencingToken: number;
  correlationId?: string;
  causationId?: string;
}

export interface RuntimeActivityResult<TOutput = unknown> {
  activityId: string;
  status: RuntimeActivityStatus;
  output?: TOutput;
  artifactRefs?: string[];
  eventIds: string[];
  retryable?: boolean;
  error?: NormalizedRuntimeError;
}

export interface RuntimeActivityPort<TInput = unknown, TOutput = unknown> {
  execute(request: RuntimeActivityRequest<TInput>): Promise<RuntimeActivityResult<TOutput>>;
  cancel(activityId: string, reason?: string): Promise<void>;
  reconcile(activityId: string): Promise<RuntimeActivityResult<TOutput>>;
}
