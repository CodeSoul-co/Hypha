export const RUNTIME_CAPACITY_KINDS = ['model', 'tool', 'execution'] as const;

export type RuntimeCapacityKind = (typeof RUNTIME_CAPACITY_KINDS)[number];

export interface RuntimeCapacityLimit {
  global: number;
  perUser: number;
}

export interface RuntimeCapacityPolicy {
  version: '1.0.0';
  revision: string;
  limits: Record<RuntimeCapacityKind, RuntimeCapacityLimit>;
}

export interface RuntimeCapacityScope {
  tenantId?: string;
  userId: string;
  runId: string;
}

export interface RuntimeCapacityLease extends RuntimeCapacityScope {
  id: string;
  kind: RuntimeCapacityKind;
  operationId: string;
  ownerId: string;
  fencingToken: number;
  policyRevision: string;
  acquiredAt: string;
  heartbeatAt: string;
  expiresAt: string;
}

export interface RuntimeCapacityLeaseGuard {
  leaseId: string;
  ownerId: string;
  fencingToken: number;
}

export interface RuntimeCapacityAcquireRequest extends RuntimeCapacityScope {
  kind: RuntimeCapacityKind;
  operationId: string;
  requestedLeaseId: string;
  ownerId: string;
  acquiredAt: string;
  ttlMs: number;
  idempotencyKey: string;
}

export interface RuntimeCapacityRenewRequest {
  scope: RuntimeCapacityScope;
  kind: RuntimeCapacityKind;
  guard: RuntimeCapacityLeaseGuard;
  renewedAt: string;
  ttlMs: number;
}

export interface RuntimeCapacityReleaseRequest {
  scope: RuntimeCapacityScope;
  kind: RuntimeCapacityKind;
  guard: RuntimeCapacityLeaseGuard;
  releasedAt: string;
}

export interface RuntimeCapacityAssertionRequest {
  scope: RuntimeCapacityScope;
  kind: RuntimeCapacityKind;
  guard: RuntimeCapacityLeaseGuard;
  checkedAt: string;
}

export interface RuntimeCapacityUsageRequest {
  tenantId?: string;
  userId: string;
  kind: RuntimeCapacityKind;
  checkedAt: string;
}

export interface RuntimeCapacityUsage {
  kind: RuntimeCapacityKind;
  policyRevision: string;
  globalActive: number;
  userActive: number;
  globalLimit: number;
  userLimit: number;
  checkedAt: string;
}

export interface RuntimeCapacitySemaphore {
  acquire(request: RuntimeCapacityAcquireRequest): Promise<RuntimeCapacityLease | null>;
  renew(request: RuntimeCapacityRenewRequest): Promise<RuntimeCapacityLease>;
  release(request: RuntimeCapacityReleaseRequest): Promise<void>;
  assertCurrent(request: RuntimeCapacityAssertionRequest): Promise<RuntimeCapacityLease>;
  usage(request: RuntimeCapacityUsageRequest): Promise<RuntimeCapacityUsage>;
}
