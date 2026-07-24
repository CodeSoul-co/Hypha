import type { RuntimeActivityInvocation, RuntimeActivityObservation } from './runtime-activities';
import type { RuntimeCancelCommand, RuntimeCancelResult } from './runtime-cancellation';
import type { FencedRunLease } from './runtime-coordination';
import type { RuntimeOrchestrationProjection } from './runtime-projection';

export const RUNTIME_RECOVERY_CANDIDATE_REASONS = [
  'LEASE_EXPIRED',
  'STATE_CLAIM_EXPIRED',
  'PROJECTION_BEHIND',
  'CHECKPOINT_BEHIND',
  'ACTIVITY_RESULT_UNAPPLIED',
  'MESSAGE_UNACKED',
  'OUTBOX_UNPUBLISHED',
  'WAIT_WITHOUT_REGISTRATION',
  'TIMER_OVERDUE',
  'SESSION_COMMAND_INCOMPLETE',
  'RUN_PROJECTION_CONFLICT',
  'CANCELLATION_INCOMPLETE',
  'CUSTOM',
] as const;

export const RUNTIME_RECOVERY_SAFE_ACTIONS = [
  'rebuild_projection',
  'requeue',
  'apply_observation',
  'restore_wait',
  'fire_timer',
  'republish_message',
  'mark_failed',
  'manual_review',
] as const;

export const RUNTIME_RECOVERY_DISPOSITIONS = [
  'recovered',
  'reused',
  'requeued',
  'requires_review',
  'lease_unavailable',
  'stale',
] as const;

export const RUNTIME_ACTIVITY_RECONCILIATION_STATUSES = [
  'completed',
  'failed',
  'waiting',
  'cancelled',
  'not_started',
  'unknown',
] as const;

export type RuntimeRecoveryCandidateReason = (typeof RUNTIME_RECOVERY_CANDIDATE_REASONS)[number];
export type RuntimeRecoverySafeAction = (typeof RUNTIME_RECOVERY_SAFE_ACTIONS)[number];
export type RuntimeRecoveryDisposition = (typeof RUNTIME_RECOVERY_DISPOSITIONS)[number];
export type RuntimeActivityReconciliationStatus =
  (typeof RUNTIME_ACTIVITY_RECONCILIATION_STATUSES)[number];

export interface RuntimeRecoveryScope {
  tenantId?: string;
  userId: string;
  runId: string;
}

export interface RuntimeRecoveryCandidate {
  candidateId: string;
  scope: RuntimeRecoveryScope;
  reason: RuntimeRecoveryCandidateReason;
  safeAction: RuntimeRecoverySafeAction;
  eventHeadSequence: number;
  projectionSequence?: number;
  activityId?: string;
  stateId?: string;
  stateAttempt?: number;
  currentLease?: FencedRunLease;
  detectedAt: string;
}

export interface RuntimeRecoveryScanRequest {
  checkedAt: string;
  limit: number;
  cursor?: string;
}

export interface RuntimeRecoveryScanResult {
  candidates: RuntimeRecoveryCandidate[];
  scannedStreams: number;
  nextCursor?: string;
}

export interface RuntimeRecoveryCommand {
  candidate: RuntimeRecoveryCandidate;
  ownerId: string;
  leaseTtlMs: number;
  requestedAt: string;
}

export interface RuntimeRecoveryResult {
  candidateId: string;
  disposition: RuntimeRecoveryDisposition;
  eventIds: string[];
  projection?: RuntimeOrchestrationProjection;
}

export interface RuntimeActivityReconciliationRequest {
  invocation: RuntimeActivityInvocation;
  checkedAt: string;
  idempotencyKey: string;
}

export interface RuntimeActivityRetryRequest extends RuntimeActivityReconciliationRequest {
  fencingToken: number;
}

export interface RuntimeActivityReconciliationResult {
  activityId: string;
  status: RuntimeActivityReconciliationStatus;
  observation?: RuntimeActivityObservation;
  providerRevision?: string;
  receiptId?: string;
}

export interface RuntimeActivityReconciliationPort {
  reconcile(
    request: RuntimeActivityReconciliationRequest
  ): Promise<RuntimeActivityReconciliationResult>;
  retry(request: RuntimeActivityRetryRequest): Promise<RuntimeActivityObservation>;
}

export interface RuntimeRecoveryRequeueRequest {
  scope: RuntimeRecoveryScope;
  reason: RuntimeRecoveryCandidateReason;
  requestedAt: string;
  fencingToken: number;
  expectedStateId?: string;
  expectedStateAttempt?: number;
  idempotencyKey: string;
}

export interface RuntimeRecoveryRequeuePort {
  requeue(request: RuntimeRecoveryRequeueRequest): Promise<void>;
}

export interface RuntimeCancellationRecoveryPort {
  cancel(input: RuntimeCancelCommand): Promise<RuntimeCancelResult>;
}
