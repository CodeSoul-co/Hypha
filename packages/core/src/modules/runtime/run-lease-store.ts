import type {
  FencedRunLease,
  RunLeaseAcquireRequest,
  RunLeaseAssertionRequest,
  RunLeaseHeartbeatRequest,
  RunLeasePreemptRequest,
  RunLeaseReleaseRequest,
  RunLeaseScope,
  RunLeaseStore,
} from '../../contracts/runtime-coordination';
import {
  runLeaseScopeSchema,
  validateFencedRunLease,
  validateRunLeaseAcquireRequest,
  validateRunLeaseAssertionRequest,
  validateRunLeaseHeartbeatRequest,
  validateRunLeasePreemptRequest,
  validateRunLeaseReleaseRequest,
} from '../../contracts/runtime-coordination-schemas';
import { FrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';

interface LeaseSlot {
  partitionKey: string;
  fencingTokenHighWater: number;
  revisionHighWater: number;
  active?: FencedRunLease;
}

interface AcquireIdempotencyRecord {
  requestHash: string;
  result: FencedRunLease | null;
}

export interface InMemoryRunLeaseStoreOptions {
  now?: () => string;
}

export class InMemoryRunLeaseStore implements RunLeaseStore {
  private readonly slots = new Map<string, LeaseSlot>();
  private readonly usedLeaseIds = new Set<string>();
  private readonly acquireIdempotency = new Map<string, AcquireIdempotencyRecord>();
  private readonly now: () => string;
  private writeBarrier = Promise.resolve();

  constructor(options: InMemoryRunLeaseStoreOptions = {}) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async acquire(request: RunLeaseAcquireRequest): Promise<FencedRunLease | null> {
    const validated = validateRunLeaseAcquireRequest(request);
    return this.exclusive(() => this.acquireExclusive(structuredClone(validated)));
  }

  async preempt(request: RunLeasePreemptRequest): Promise<FencedRunLease> {
    const validated = validateRunLeasePreemptRequest(request);
    return this.exclusive(() => this.preemptExclusive(structuredClone(validated)));
  }

  async heartbeat(request: RunLeaseHeartbeatRequest): Promise<FencedRunLease> {
    const validated = validateRunLeaseHeartbeatRequest(request);
    return this.exclusive(() => {
      const slot = this.requireSlot(validated.scope);
      const current = this.requireCurrent(slot, validated, validated.heartbeatAt);
      if (Date.parse(validated.heartbeatAt) < Date.parse(current.heartbeatAt)) {
        invalid('heartbeatAt must not precede the current heartbeat');
      }
      const next = validateFencedRunLease({
        ...current,
        heartbeatAt: validated.heartbeatAt,
        expiresAt: expiryFrom(validated.heartbeatAt, validated.ttlMs),
        revision: slot.revisionHighWater + 1,
      });
      slot.active = cloneLease(next);
      slot.revisionHighWater = next.revision;
      return cloneLease(next);
    });
  }

  async release(request: RunLeaseReleaseRequest): Promise<void> {
    const validated = validateRunLeaseReleaseRequest(request);
    await this.exclusive(() => {
      const slot = this.requireSlot(validated.scope);
      this.requireCurrent(slot, validated, validated.releasedAt);
      slot.active = undefined;
    });
  }

  async get(scope: RunLeaseScope, checkedAt = this.now()): Promise<FencedRunLease | null> {
    const validatedScope = runLeaseScopeSchema.parse(scope);
    validTimestamp(checkedAt, 'checkedAt');
    const slot = this.slots.get(runLeaseScopeKey(validatedScope));
    if (!slot) return null;
    assertPartition(slot, validatedScope);
    const active = slot.active;
    if (
      !active ||
      Date.parse(checkedAt) < Date.parse(active.acquiredAt) ||
      isExpired(active, checkedAt)
    ) {
      return null;
    }
    return cloneLease(active);
  }

  async assertCurrent(request: RunLeaseAssertionRequest): Promise<FencedRunLease> {
    const validated = validateRunLeaseAssertionRequest(request);
    const slot = this.requireSlot(validated.scope);
    return cloneLease(this.requireCurrent(slot, validated, validated.checkedAt));
  }

  private acquireExclusive(request: RunLeaseAcquireRequest): FencedRunLease | null {
    const scope = scopeFromAcquire(request);
    const slotKey = runLeaseScopeKey(scope);
    const idempotencyKey = `${slotKey}\u0000${request.idempotencyKey}`;
    const requestHash = hashCanonicalJson(requestWithoutUndefined(request));
    const prior = this.acquireIdempotency.get(idempotencyKey);
    if (prior) {
      if (prior.requestHash !== requestHash) {
        conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Lease idempotency key was reused', {
          runId: request.runId,
          idempotencyKey: request.idempotencyKey,
        });
      }
      return prior.result ? cloneLease(prior.result) : null;
    }

    let slot = this.slots.get(slotKey);
    if (slot) assertPartition(slot, scope);
    const active = slot?.active;
    if (active && !isExpired(active, request.acquiredAt)) {
      this.acquireIdempotency.set(idempotencyKey, { requestHash, result: null });
      return null;
    }
    if (this.usedLeaseIds.has(request.requestedLeaseId)) {
      conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Run lease id cannot be reused', {
        leaseId: request.requestedLeaseId,
        runId: request.runId,
      });
    }

    slot ??= {
      partitionKey: request.partitionKey,
      fencingTokenHighWater: 0,
      revisionHighWater: 0,
    };
    const lease = validateFencedRunLease({
      id: request.requestedLeaseId,
      ...(request.tenantId === undefined ? {} : { tenantId: request.tenantId }),
      userId: request.userId,
      runId: request.runId,
      partitionKey: request.partitionKey,
      ownerId: request.ownerId,
      acquiredAt: request.acquiredAt,
      heartbeatAt: request.acquiredAt,
      expiresAt: expiryFrom(request.acquiredAt, request.ttlMs),
      revision: slot.revisionHighWater + 1,
      fencingToken: slot.fencingTokenHighWater + 1,
    });
    slot.active = cloneLease(lease);
    slot.fencingTokenHighWater = lease.fencingToken;
    slot.revisionHighWater = lease.revision;
    this.slots.set(slotKey, slot);
    this.usedLeaseIds.add(lease.id);
    this.acquireIdempotency.set(idempotencyKey, {
      requestHash,
      result: cloneLease(lease),
    });
    return cloneLease(lease);
  }

  private preemptExclusive(request: RunLeasePreemptRequest): FencedRunLease {
    const scope = scopeFromAcquire(request);
    const slotKey = runLeaseScopeKey(scope);
    const idempotencyKey = `${slotKey}\u0000preempt\u0000${request.idempotencyKey}`;
    const requestHash = hashCanonicalJson(requestWithoutUndefined(request));
    const prior = this.acquireIdempotency.get(idempotencyKey);
    if (prior) {
      if (prior.requestHash !== requestHash || !prior.result) {
        conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Lease preemption idempotency key was reused', {
          runId: request.runId,
          idempotencyKey: request.idempotencyKey,
        });
      }
      return cloneLease(prior.result);
    }
    if (this.usedLeaseIds.has(request.requestedLeaseId)) {
      conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Run lease id cannot be reused', {
        leaseId: request.requestedLeaseId,
        runId: request.runId,
      });
    }
    let slot = this.slots.get(slotKey);
    if (slot) assertPartition(slot, scope);
    slot ??= {
      partitionKey: request.partitionKey,
      fencingTokenHighWater: 0,
      revisionHighWater: 0,
    };
    const lease = validateFencedRunLease({
      id: request.requestedLeaseId,
      ...(request.tenantId === undefined ? {} : { tenantId: request.tenantId }),
      userId: request.userId,
      runId: request.runId,
      partitionKey: request.partitionKey,
      ownerId: request.ownerId,
      acquiredAt: request.acquiredAt,
      heartbeatAt: request.acquiredAt,
      expiresAt: expiryFrom(request.acquiredAt, request.ttlMs),
      revision: slot.revisionHighWater + 1,
      fencingToken: slot.fencingTokenHighWater + 1,
    });
    slot.active = cloneLease(lease);
    slot.fencingTokenHighWater = lease.fencingToken;
    slot.revisionHighWater = lease.revision;
    this.slots.set(slotKey, slot);
    this.usedLeaseIds.add(lease.id);
    this.acquireIdempotency.set(idempotencyKey, {
      requestHash,
      result: cloneLease(lease),
    });
    return cloneLease(lease);
  }

  private requireSlot(scope: RunLeaseScope): LeaseSlot {
    const slot = this.slots.get(runLeaseScopeKey(scope));
    if (!slot) fencingRejected(scope, undefined, 'No run lease exists');
    assertPartition(slot, scope);
    return slot;
  }

  private requireCurrent(
    slot: LeaseSlot,
    request: RunLeaseHeartbeatRequest | RunLeaseReleaseRequest | RunLeaseAssertionRequest,
    checkedAt: string
  ): FencedRunLease {
    const current = slot.active;
    if (!current) fencingRejected(request.scope, request.guard, 'No active run lease exists');
    if (Date.parse(checkedAt) < Date.parse(current.acquiredAt)) {
      invalid('Lease operation time must not precede acquiredAt');
    }
    if (isExpired(current, checkedAt)) {
      fencingRejected(request.scope, request.guard, 'Run lease has expired', current);
    }
    if (
      request.guard.leaseId !== current.id ||
      request.guard.ownerId !== current.ownerId ||
      request.guard.fencingToken !== current.fencingToken
    ) {
      fencingRejected(request.scope, request.guard, 'Stale run lease guard rejected', current);
    }
    return current;
  }

  private async exclusive<T>(operation: () => T | Promise<T>): Promise<T> {
    const previousWrite = this.writeBarrier;
    let releaseWrite = (): void => undefined;
    this.writeBarrier = new Promise<void>((resolve) => {
      releaseWrite = resolve;
    });
    await previousWrite;
    try {
      return await operation();
    } finally {
      releaseWrite();
    }
  }
}

export function runLeaseScopeKey(scope: RunLeaseScope): string {
  const validated = runLeaseScopeSchema.parse(scope);
  return `${validated.tenantId ?? ''}\u0000${validated.userId}\u0000${validated.runId}`;
}

export function runLeaseGuard(lease: FencedRunLease): {
  leaseId: string;
  ownerId: string;
  fencingToken: number;
} {
  return {
    leaseId: lease.id,
    ownerId: lease.ownerId,
    fencingToken: lease.fencingToken,
  };
}

function scopeFromAcquire(request: RunLeaseAcquireRequest): RunLeaseScope {
  return {
    ...(request.tenantId === undefined ? {} : { tenantId: request.tenantId }),
    userId: request.userId,
    runId: request.runId,
    partitionKey: request.partitionKey,
  };
}

function assertPartition(slot: LeaseSlot, scope: RunLeaseScope): void {
  if (slot.partitionKey !== scope.partitionKey) {
    conflict('RUNTIME_RUN_CONFLICT', 'Run lease partition key cannot change', {
      runId: scope.runId,
      expectedPartitionKey: slot.partitionKey,
      actualPartitionKey: scope.partitionKey,
    });
  }
}

function isExpired(lease: FencedRunLease, checkedAt: string): boolean {
  validTimestamp(checkedAt, 'checkedAt');
  return Date.parse(lease.expiresAt) <= Date.parse(checkedAt);
}

function expiryFrom(timestamp: string, ttlMs: number): string {
  validTimestamp(timestamp, 'lease timestamp');
  const expiresAt = Date.parse(timestamp) + ttlMs;
  if (!Number.isSafeInteger(expiresAt)) invalid('Lease expiry is outside the supported range');
  try {
    return new Date(expiresAt).toISOString();
  } catch {
    return invalid('Lease expiry is outside the supported range');
  }
}

function validTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid timestamp`);
}

function requestWithoutUndefined(request: RunLeaseAcquireRequest): Record<string, unknown> {
  return Object.fromEntries(Object.entries(request).filter(([, value]) => value !== undefined));
}

function cloneLease(lease: FencedRunLease): FencedRunLease {
  return structuredClone(lease);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(code: string, message: string, context: Record<string, unknown>): never {
  throw new FrameworkError({ code, message, context });
}

function fencingRejected(
  scope: RunLeaseScope,
  guard: { leaseId: string; ownerId: string; fencingToken: number } | undefined,
  message: string,
  current?: FencedRunLease
): never {
  throw new FrameworkError({
    code: 'RUNTIME_FENCING_REJECTED',
    message,
    context: {
      runId: scope.runId,
      partitionKey: scope.partitionKey,
      leaseId: guard?.leaseId,
      ownerId: guard?.ownerId,
      fencingToken: guard?.fencingToken,
      currentLeaseId: current?.id,
      currentOwnerId: current?.ownerId,
      currentFencingToken: current?.fencingToken,
    },
  });
}
