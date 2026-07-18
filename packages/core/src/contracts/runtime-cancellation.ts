import type { RuntimeOrchestrationProjection } from './runtime-projection';
import type { NormalizedRuntimeError, RuntimePrincipal, RuntimeScope } from './runtime';

export const RUNTIME_CANCELLATION_PROPAGATIONS = ['none', 'children', 'all_descendants'] as const;
export const RUNTIME_CANCELLATION_TARGET_TYPES = ['activity', 'child_run'] as const;
export const RUNTIME_CANCELLATION_TARGET_STATUSES = [
  'cancelled',
  'already_terminal',
  'not_found',
  'failed',
] as const;
export const RUNTIME_CANCELLATION_DISPOSITIONS = ['applied', 'reused'] as const;

export type RuntimeCancellationPropagation = (typeof RUNTIME_CANCELLATION_PROPAGATIONS)[number];
export type RuntimeCancellationTargetType = (typeof RUNTIME_CANCELLATION_TARGET_TYPES)[number];
export type RuntimeCancellationTargetStatus = (typeof RUNTIME_CANCELLATION_TARGET_STATUSES)[number];
export type RuntimeCancellationDisposition = (typeof RUNTIME_CANCELLATION_DISPOSITIONS)[number];

export interface RuntimeCancellationPolicy {
  propagation: RuntimeCancellationPropagation;
  cancelRunningActivities: boolean;
  waitGraceMs?: number;
}

export interface RuntimeCancelCommand {
  commandId: string;
  scope: RuntimeScope;
  principal: RuntimePrincipal;
  ownerId: string;
  leaseTtlMs: number;
  reason: string;
  policy: RuntimeCancellationPolicy;
  requestedAt: string;
  idempotencyKey?: string;
}

export interface RuntimeCancellationTargetResult {
  targetType: RuntimeCancellationTargetType;
  targetId: string;
  status: RuntimeCancellationTargetStatus;
  error?: NormalizedRuntimeError;
}

export interface RuntimeCancelResult {
  commandId: string;
  disposition: RuntimeCancellationDisposition;
  eventIds: string[];
  targetResults: RuntimeCancellationTargetResult[];
  unresolvedActivityIds: string[];
  projection: RuntimeOrchestrationProjection;
}

export interface RuntimeActivityCancellationRequest {
  scope: RuntimeScope;
  activityId: string;
  reason: string;
  requestedAt: string;
  deadlineAt?: string;
  fencingToken: number;
  idempotencyKey: string;
}

export interface RuntimeActivityCancellationPort {
  cancel(request: RuntimeActivityCancellationRequest): Promise<RuntimeCancellationTargetResult>;
}

export interface RuntimeChildRunReference {
  runId: string;
}

export interface RuntimeChildRunListRequest {
  scope: RuntimeScope;
  requestedAt: string;
}

export interface RuntimeChildRunCancellationRequest {
  parentScope: RuntimeScope;
  childRunId: string;
  reason: string;
  propagation: Exclude<RuntimeCancellationPropagation, 'none'>;
  requestedAt: string;
  deadlineAt?: string;
  fencingToken: number;
  idempotencyKey: string;
}

export interface RuntimeChildRunCancellationPort {
  listChildren(request: RuntimeChildRunListRequest): Promise<RuntimeChildRunReference[]>;
  cancel(request: RuntimeChildRunCancellationRequest): Promise<RuntimeCancellationTargetResult>;
}
