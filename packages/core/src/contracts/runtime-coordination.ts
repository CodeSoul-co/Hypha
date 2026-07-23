export interface RunLeaseScope {
  tenantId?: string;
  userId: string;
  runId: string;
  partitionKey: string;
}

export interface RunLease {
  id: string;
  tenantId?: string;
  userId: string;
  runId: string;
  ownerId: string;
  acquiredAt: string;
  expiresAt: string;
  heartbeatAt: string;
  revision: number;
}

export interface FencedRunLease extends RunLease {
  fencingToken: number;
  partitionKey: string;
}

export interface RunLeaseGuard {
  leaseId: string;
  ownerId: string;
  fencingToken: number;
}

export interface RunLeaseAcquireRequest extends RunLeaseScope {
  requestedLeaseId: string;
  ownerId: string;
  ttlMs: number;
  acquiredAt: string;
  idempotencyKey: string;
}

export interface RunLeasePreemptRequest extends RunLeaseAcquireRequest {
  reason: 'cancellation';
}

export interface RunLeaseHeartbeatRequest {
  scope: RunLeaseScope;
  guard: RunLeaseGuard;
  ttlMs: number;
  heartbeatAt: string;
}

export interface RunLeaseReleaseRequest {
  scope: RunLeaseScope;
  guard: RunLeaseGuard;
  releasedAt: string;
}

export interface RunLeaseAssertionRequest {
  scope: RunLeaseScope;
  guard: RunLeaseGuard;
  checkedAt: string;
}

export interface RunLeaseStore {
  acquire(request: RunLeaseAcquireRequest): Promise<FencedRunLease | null>;
  preempt(request: RunLeasePreemptRequest): Promise<FencedRunLease>;
  heartbeat(request: RunLeaseHeartbeatRequest): Promise<FencedRunLease>;
  release(request: RunLeaseReleaseRequest): Promise<void>;
  get(scope: RunLeaseScope, checkedAt?: string): Promise<FencedRunLease | null>;
  assertCurrent(request: RunLeaseAssertionRequest): Promise<FencedRunLease>;
}

export const STATE_EXECUTION_CLAIM_STATUSES = [
  'claimed',
  'completed',
  'released',
  'expired',
] as const;

export type StateExecutionClaimStatus = (typeof STATE_EXECUTION_CLAIM_STATUSES)[number];

export interface RunLeaseAuthorization {
  scope: RunLeaseScope;
  guard: RunLeaseGuard;
}

export interface StateExecutionClaimScope {
  tenantId?: string;
  userId: string;
  runId: string;
  stateId: string;
  stateAttempt: number;
}

export interface StateExecutionClaim extends StateExecutionClaimScope {
  claimId: string;
  processRevision: string;
  expectedRunRevision: number;
  fencingToken: number;
  ownerId: string;
  status: StateExecutionClaimStatus;
  acquiredAt: string;
  expiresAt: string;
  completedAt?: string;
  releasedAt?: string;
}

export interface StateExecutionClaimGuard {
  claimId: string;
  ownerId: string;
  fencingToken: number;
}

export interface StateExecutionClaimAcquireRequest extends StateExecutionClaimScope {
  requestedClaimId: string;
  processRevision: string;
  expectedRunRevision: number;
  runLease: RunLeaseAuthorization;
  ttlMs: number;
  acquiredAt: string;
  idempotencyKey: string;
}

export interface StateExecutionClaimRenewRequest {
  scope: StateExecutionClaimScope;
  guard: StateExecutionClaimGuard;
  runLease: RunLeaseAuthorization;
  ttlMs: number;
  renewedAt: string;
}

export interface StateExecutionClaimCompleteRequest {
  scope: StateExecutionClaimScope;
  guard: StateExecutionClaimGuard;
  runLease: RunLeaseAuthorization;
  completedAt: string;
}

export interface StateExecutionClaimReleaseRequest {
  scope: StateExecutionClaimScope;
  guard: StateExecutionClaimGuard;
  runLease: RunLeaseAuthorization;
  releasedAt: string;
}

export interface StateExecutionClaimAssertionRequest {
  scope: StateExecutionClaimScope;
  guard: StateExecutionClaimGuard;
  checkedAt: string;
}

export interface StateExecutionClaimStore {
  acquire(request: StateExecutionClaimAcquireRequest): Promise<StateExecutionClaim | null>;
  renew(request: StateExecutionClaimRenewRequest): Promise<StateExecutionClaim>;
  complete(request: StateExecutionClaimCompleteRequest): Promise<StateExecutionClaim>;
  release(request: StateExecutionClaimReleaseRequest): Promise<StateExecutionClaim>;
  get(scope: StateExecutionClaimScope, checkedAt?: string): Promise<StateExecutionClaim | null>;
  assertCurrent(request: StateExecutionClaimAssertionRequest): Promise<StateExecutionClaim>;
}

export const RUNTIME_RESOURCE_TYPES = [
  'workspace',
  'artifact',
  'tool_scope',
  'memory_scope',
  'external_account',
  'custom',
] as const;

export const RUNTIME_RESOURCE_CLAIM_MODES = ['shared', 'exclusive'] as const;

export type RuntimeResourceType = (typeof RUNTIME_RESOURCE_TYPES)[number];
export type RuntimeResourceClaimMode = (typeof RUNTIME_RESOURCE_CLAIM_MODES)[number];

export interface RuntimeResourceClaim {
  id: string;
  tenantId?: string;
  userId: string;
  resourceType: RuntimeResourceType;
  resourceKey: string;
  mode: RuntimeResourceClaimMode;
  runId: string;
  stateId?: string;
  ownerId: string;
  fencingToken: number;
  runFencingToken: number;
  acquiredAt: string;
  expiresAt: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeResourceRequest {
  requestedClaimId: string;
  resourceType: RuntimeResourceType;
  resourceKey: string;
  mode: RuntimeResourceClaimMode;
  metadata?: Record<string, unknown>;
}

export interface ResourceAcquireRequest {
  runLease: RunLeaseAuthorization;
  stateId?: string;
  resources: RuntimeResourceRequest[];
  ttlMs: number;
  acquiredAt: string;
  idempotencyKey: string;
}

export interface ResourceRenewRequest {
  runLease: RunLeaseAuthorization;
  claimIds: string[];
  ttlMs: number;
  renewedAt: string;
}

export interface ResourceReleaseRequest {
  runLease: RunLeaseAuthorization;
  claimIds: string[];
  releasedAt: string;
}

export interface ResourceListRequest {
  tenantId?: string;
  resourceType: RuntimeResourceType;
  resourceKey: string;
  checkedAt: string;
}

export interface ResourceClaimAssertionRequest extends ResourceListRequest {
  claimId: string;
  ownerId: string;
  fencingToken: number;
}

export interface RuntimeResourceCoordinator {
  acquire(request: ResourceAcquireRequest): Promise<RuntimeResourceClaim[]>;
  renew(request: ResourceRenewRequest): Promise<RuntimeResourceClaim[]>;
  release(request: ResourceReleaseRequest): Promise<void>;
  list(request: ResourceListRequest): Promise<RuntimeResourceClaim[]>;
  assertCurrent(request: ResourceClaimAssertionRequest): Promise<RuntimeResourceClaim>;
}
