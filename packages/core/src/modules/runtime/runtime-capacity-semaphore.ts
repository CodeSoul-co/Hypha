import type {
  RuntimeCapacityAcquireRequest,
  RuntimeCapacityAssertionRequest,
  RuntimeCapacityLease,
  RuntimeCapacityPolicy,
  RuntimeCapacityReleaseRequest,
  RuntimeCapacityRenewRequest,
  RuntimeCapacitySemaphore,
  RuntimeCapacityScope,
  RuntimeCapacityUsage,
  RuntimeCapacityUsageRequest,
} from '../../contracts/runtime-capacity';
import {
  validateRuntimeCapacityAcquireRequest,
  validateRuntimeCapacityAssertionRequest,
  validateRuntimeCapacityLease,
  validateRuntimeCapacityPolicy,
  validateRuntimeCapacityReleaseRequest,
  validateRuntimeCapacityRenewRequest,
  validateRuntimeCapacityUsage,
  validateRuntimeCapacityUsageRequest,
} from '../../contracts/runtime-capacity-schemas';
import { FrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';

interface IdempotencyRecord {
  requestHash: string;
  lease: RuntimeCapacityLease;
}

export interface InMemoryRuntimeCapacitySemaphoreOptions {
  policy: RuntimeCapacityPolicy;
}

export class InMemoryRuntimeCapacitySemaphore implements RuntimeCapacitySemaphore {
  private readonly policy: RuntimeCapacityPolicy;
  private readonly active = new Map<string, RuntimeCapacityLease>();
  private readonly usedLeaseIds = new Set<string>();
  private readonly idempotency = new Map<string, IdempotencyRecord>();
  private readonly fencingHighWater = new Map<string, number>();
  private writeBarrier = Promise.resolve();

  constructor(options: InMemoryRuntimeCapacitySemaphoreOptions) {
    this.policy = validateRuntimeCapacityPolicy(options.policy);
  }

  async acquire(request: RuntimeCapacityAcquireRequest): Promise<RuntimeCapacityLease | null> {
    const validated = validateRuntimeCapacityAcquireRequest(request);
    return this.exclusive(() => {
      const identity = idempotencyIdentity(validated);
      const requestHash = hashCanonicalJson(validated);
      const prior = this.idempotency.get(identity);
      if (prior) {
        if (prior.requestHash !== requestHash) idempotencyConflict(validated.idempotencyKey);
        return clone(prior.lease);
      }
      if (this.usedLeaseIds.has(validated.requestedLeaseId)) {
        idempotencyConflict(validated.requestedLeaseId);
      }
      this.purge(validated.acquiredAt);
      const limits = this.policy.limits[validated.kind];
      const active = [...this.active.values()].filter(
        (lease) => lease.tenantId === validated.tenantId && lease.kind === validated.kind
      );
      const activeForUser = active.filter((lease) => lease.userId === validated.userId);
      if (active.length >= limits.global || activeForUser.length >= limits.perUser) return null;

      const fencingIdentity = capacityIdentity(validated.tenantId, validated.kind);
      const fencingToken = (this.fencingHighWater.get(fencingIdentity) ?? 0) + 1;
      const lease = validateRuntimeCapacityLease({
        id: validated.requestedLeaseId,
        ...(validated.tenantId === undefined ? {} : { tenantId: validated.tenantId }),
        userId: validated.userId,
        runId: validated.runId,
        kind: validated.kind,
        operationId: validated.operationId,
        ownerId: validated.ownerId,
        fencingToken,
        policyRevision: this.policy.revision,
        acquiredAt: validated.acquiredAt,
        heartbeatAt: validated.acquiredAt,
        expiresAt: addMilliseconds(validated.acquiredAt, validated.ttlMs),
      });
      this.active.set(lease.id, clone(lease));
      this.usedLeaseIds.add(lease.id);
      this.fencingHighWater.set(fencingIdentity, fencingToken);
      this.idempotency.set(identity, { requestHash, lease: clone(lease) });
      return clone(lease);
    });
  }

  async renew(request: RuntimeCapacityRenewRequest): Promise<RuntimeCapacityLease> {
    const validated = validateRuntimeCapacityRenewRequest(request);
    return this.exclusive(() => {
      const lease = this.requireCurrent(
        validated.scope,
        validated.kind,
        validated.guard,
        validated.renewedAt
      );
      const renewed = validateRuntimeCapacityLease({
        ...lease,
        heartbeatAt: validated.renewedAt,
        expiresAt: addMilliseconds(validated.renewedAt, validated.ttlMs),
      });
      this.active.set(renewed.id, clone(renewed));
      return clone(renewed);
    });
  }

  async release(request: RuntimeCapacityReleaseRequest): Promise<void> {
    const validated = validateRuntimeCapacityReleaseRequest(request);
    await this.exclusive(() => {
      const lease = this.requireCurrent(
        validated.scope,
        validated.kind,
        validated.guard,
        validated.releasedAt
      );
      this.active.delete(lease.id);
    });
  }

  async assertCurrent(request: RuntimeCapacityAssertionRequest): Promise<RuntimeCapacityLease> {
    const validated = validateRuntimeCapacityAssertionRequest(request);
    return this.exclusive(() =>
      clone(
        this.requireCurrent(validated.scope, validated.kind, validated.guard, validated.checkedAt)
      )
    );
  }

  async usage(request: RuntimeCapacityUsageRequest): Promise<RuntimeCapacityUsage> {
    const validated = validateRuntimeCapacityUsageRequest(request);
    return this.exclusive(() => {
      this.purge(validated.checkedAt);
      const active = [...this.active.values()].filter(
        (lease) => lease.tenantId === validated.tenantId && lease.kind === validated.kind
      );
      const limits = this.policy.limits[validated.kind];
      return validateRuntimeCapacityUsage({
        kind: validated.kind,
        policyRevision: this.policy.revision,
        globalActive: active.length,
        userActive: active.filter((lease) => lease.userId === validated.userId).length,
        globalLimit: limits.global,
        userLimit: limits.perUser,
        checkedAt: validated.checkedAt,
      });
    });
  }

  private requireCurrent(
    scope: RuntimeCapacityScope,
    kind: RuntimeCapacityAcquireRequest['kind'],
    guard: RuntimeCapacityRenewRequest['guard'],
    checkedAt: string
  ): RuntimeCapacityLease {
    const lease = this.active.get(guard.leaseId);
    if (
      !lease ||
      lease.tenantId !== scope.tenantId ||
      lease.userId !== scope.userId ||
      lease.runId !== scope.runId ||
      lease.kind !== kind ||
      lease.ownerId !== guard.ownerId ||
      lease.fencingToken !== guard.fencingToken ||
      Date.parse(lease.expiresAt) <= Date.parse(checkedAt)
    ) {
      fencingRejected(guard.leaseId);
    }
    return lease;
  }

  private purge(checkedAt: string): void {
    for (const [leaseId, lease] of this.active) {
      if (Date.parse(lease.expiresAt) <= Date.parse(checkedAt)) this.active.delete(leaseId);
    }
  }

  private async exclusive<T>(operation: () => T | Promise<T>): Promise<T> {
    const previous = this.writeBarrier;
    let release = (): void => undefined;
    this.writeBarrier = new Promise<void>((resolve) => {
      release = resolve;
    });
    await previous;
    try {
      return await operation();
    } finally {
      release();
    }
  }
}

function idempotencyIdentity(request: RuntimeCapacityAcquireRequest): string {
  return `${request.tenantId ?? ''}\u0000${request.userId}\u0000${request.runId}\u0000${request.idempotencyKey}`;
}

function capacityIdentity(
  tenantId: string | undefined,
  kind: RuntimeCapacityAcquireRequest['kind']
): string {
  return `${tenantId ?? ''}\u0000${kind}`;
}

function addMilliseconds(timestamp: string, milliseconds: number): string {
  return new Date(Date.parse(timestamp) + milliseconds).toISOString();
}

function clone(lease: RuntimeCapacityLease): RuntimeCapacityLease {
  return structuredClone(lease);
}

function idempotencyConflict(identity: string): never {
  throw new FrameworkError({
    code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    message: 'Runtime capacity acquisition identity was reused with different input',
    context: { identity },
  });
}

function fencingRejected(leaseId: string): never {
  throw new FrameworkError({
    code: 'RUNTIME_FENCING_REJECTED',
    message: 'Runtime capacity lease is stale or not owned',
    context: { leaseId },
  });
}
