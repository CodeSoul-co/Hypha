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
  heartbeat(request: RunLeaseHeartbeatRequest): Promise<FencedRunLease>;
  release(request: RunLeaseReleaseRequest): Promise<void>;
  get(scope: RunLeaseScope, checkedAt?: string): Promise<FencedRunLease | null>;
  assertCurrent(request: RunLeaseAssertionRequest): Promise<FencedRunLease>;
}
