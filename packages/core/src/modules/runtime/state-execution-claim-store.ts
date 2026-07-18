import type {
  FencedRunLease,
  RunLeaseAuthorization,
  RunLeaseStore,
  StateExecutionClaim,
  StateExecutionClaimAcquireRequest,
  StateExecutionClaimAssertionRequest,
  StateExecutionClaimCompleteRequest,
  StateExecutionClaimGuard,
  StateExecutionClaimReleaseRequest,
  StateExecutionClaimRenewRequest,
  StateExecutionClaimScope,
  StateExecutionClaimStore,
} from '../../contracts/runtime-coordination';
import {
  stateExecutionClaimScopeSchema,
  validateStateExecutionClaim,
  validateStateExecutionClaimAcquireRequest,
  validateStateExecutionClaimAssertionRequest,
  validateStateExecutionClaimCompleteRequest,
  validateStateExecutionClaimReleaseRequest,
  validateStateExecutionClaimRenewRequest,
} from '../../contracts/runtime-coordination-schemas';
import { FrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';

interface StateClaimSlot {
  processRevision: string;
  current: StateExecutionClaim;
}

interface AcquireIdempotencyRecord {
  requestHash: string;
  result: StateExecutionClaim | null;
}

export interface InMemoryStateExecutionClaimStoreOptions {
  runLeaseStore: Pick<RunLeaseStore, 'assertCurrent'>;
  now?: () => string;
}

export class InMemoryStateExecutionClaimStore implements StateExecutionClaimStore {
  private readonly slots = new Map<string, StateClaimSlot>();
  private readonly usedClaimIds = new Set<string>();
  private readonly acquireIdempotency = new Map<string, AcquireIdempotencyRecord>();
  private readonly runLeaseStore: Pick<RunLeaseStore, 'assertCurrent'>;
  private readonly now: () => string;
  private writeBarrier = Promise.resolve();

  constructor(options: InMemoryStateExecutionClaimStoreOptions) {
    this.runLeaseStore = options.runLeaseStore;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async acquire(request: StateExecutionClaimAcquireRequest): Promise<StateExecutionClaim | null> {
    const validated = validateStateExecutionClaimAcquireRequest(request);
    return this.exclusive(() => this.acquireExclusive(structuredClone(validated)));
  }

  async renew(request: StateExecutionClaimRenewRequest): Promise<StateExecutionClaim> {
    const validated = validateStateExecutionClaimRenewRequest(request);
    return this.exclusive(async () => {
      const runLease = await this.authorizeRunLease(
        validated.scope,
        validated.runLease,
        validated.renewedAt
      );
      const slot = this.requireSlot(validated.scope);
      const current = requireCurrentClaim(slot, validated.guard, validated.renewedAt);
      assertRunFencing(current, runLease);
      const next = validateStateExecutionClaim({
        ...current,
        expiresAt: boundedExpiry(validated.renewedAt, validated.ttlMs, runLease.expiresAt),
      });
      slot.current = cloneClaim(next);
      return cloneClaim(next);
    });
  }

  async complete(request: StateExecutionClaimCompleteRequest): Promise<StateExecutionClaim> {
    const validated = validateStateExecutionClaimCompleteRequest(request);
    return this.exclusive(async () => {
      const runLease = await this.authorizeRunLease(
        validated.scope,
        validated.runLease,
        validated.completedAt
      );
      const slot = this.requireSlot(validated.scope);
      const current = requireCurrentClaim(slot, validated.guard, validated.completedAt);
      assertRunFencing(current, runLease);
      const next = validateStateExecutionClaim({
        ...current,
        status: 'completed',
        completedAt: validated.completedAt,
      });
      slot.current = cloneClaim(next);
      return cloneClaim(next);
    });
  }

  async release(request: StateExecutionClaimReleaseRequest): Promise<StateExecutionClaim> {
    const validated = validateStateExecutionClaimReleaseRequest(request);
    return this.exclusive(async () => {
      const runLease = await this.authorizeRunLease(
        validated.scope,
        validated.runLease,
        validated.releasedAt
      );
      const slot = this.requireSlot(validated.scope);
      const current = requireCurrentClaim(slot, validated.guard, validated.releasedAt);
      assertRunFencing(current, runLease);
      const next = validateStateExecutionClaim({
        ...current,
        status: 'released',
        releasedAt: validated.releasedAt,
      });
      slot.current = cloneClaim(next);
      return cloneClaim(next);
    });
  }

  async get(
    scope: StateExecutionClaimScope,
    checkedAt = this.now()
  ): Promise<StateExecutionClaim | null> {
    const validated = stateExecutionClaimScopeSchema.parse(scope);
    validTimestamp(checkedAt, 'checkedAt');
    const current = this.slots.get(stateExecutionClaimScopeKey(validated))?.current;
    if (!current) return null;
    if (Date.parse(checkedAt) < Date.parse(current.acquiredAt)) return null;
    return cloneClaim(effectiveClaim(current, checkedAt));
  }

  async assertCurrent(request: StateExecutionClaimAssertionRequest): Promise<StateExecutionClaim> {
    const validated = validateStateExecutionClaimAssertionRequest(request);
    const slot = this.requireSlot(validated.scope);
    return cloneClaim(requireCurrentClaim(slot, validated.guard, validated.checkedAt));
  }

  private async acquireExclusive(
    request: StateExecutionClaimAcquireRequest
  ): Promise<StateExecutionClaim | null> {
    const scope = scopeFromAcquire(request);
    const slotKey = stateExecutionClaimScopeKey(scope);
    const idempotencyKey = `${slotKey}\u0000${request.idempotencyKey}`;
    const requestHash = hashCanonicalJson(withoutUndefined(request));
    const prior = this.acquireIdempotency.get(idempotencyKey);
    if (prior) {
      if (prior.requestHash !== requestHash) {
        conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'State claim idempotency key was reused', {
          runId: request.runId,
          stateId: request.stateId,
          stateAttempt: request.stateAttempt,
        });
      }
      return prior.result ? cloneClaim(prior.result) : null;
    }

    const runLease = await this.authorizeRunLease(scope, request.runLease, request.acquiredAt);
    const existing = this.slots.get(slotKey);
    if (
      existing?.processRevision !== undefined &&
      existing.processRevision !== request.processRevision
    ) {
      conflict('RUNTIME_RUN_CONFLICT', 'State attempt process revision cannot change', {
        runId: request.runId,
        stateId: request.stateId,
        stateAttempt: request.stateAttempt,
        expectedProcessRevision: existing.processRevision,
        actualProcessRevision: request.processRevision,
      });
    }
    if (existing?.current.status === 'completed') {
      conflict('RUNTIME_RUN_CONFLICT', 'Completed state attempt cannot be claimed again', {
        runId: request.runId,
        stateId: request.stateId,
        stateAttempt: request.stateAttempt,
      });
    }
    if (
      existing?.current.status === 'claimed' &&
      Date.parse(existing.current.expiresAt) > Date.parse(request.acquiredAt)
    ) {
      this.acquireIdempotency.set(idempotencyKey, { requestHash, result: null });
      return null;
    }
    if (this.usedClaimIds.has(request.requestedClaimId)) {
      conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'State execution claim id cannot be reused', {
        claimId: request.requestedClaimId,
      });
    }

    const claim = validateStateExecutionClaim({
      ...(request.tenantId === undefined ? {} : { tenantId: request.tenantId }),
      userId: request.userId,
      claimId: request.requestedClaimId,
      runId: request.runId,
      stateId: request.stateId,
      stateAttempt: request.stateAttempt,
      processRevision: request.processRevision,
      expectedRunRevision: request.expectedRunRevision,
      fencingToken: runLease.fencingToken,
      ownerId: runLease.ownerId,
      status: 'claimed',
      acquiredAt: request.acquiredAt,
      expiresAt: boundedExpiry(request.acquiredAt, request.ttlMs, runLease.expiresAt),
    });
    this.slots.set(slotKey, {
      processRevision: request.processRevision,
      current: cloneClaim(claim),
    });
    this.usedClaimIds.add(claim.claimId);
    this.acquireIdempotency.set(idempotencyKey, {
      requestHash,
      result: cloneClaim(claim),
    });
    return cloneClaim(claim);
  }

  private async authorizeRunLease(
    scope: StateExecutionClaimScope,
    authorization: RunLeaseAuthorization,
    checkedAt: string
  ): Promise<FencedRunLease> {
    assertRunScope(scope, authorization);
    return this.runLeaseStore.assertCurrent({
      scope: authorization.scope,
      guard: authorization.guard,
      checkedAt,
    });
  }

  private requireSlot(scope: StateExecutionClaimScope): StateClaimSlot {
    const slot = this.slots.get(stateExecutionClaimScopeKey(scope));
    if (!slot) claimRejected(scope, undefined, 'No state execution claim exists');
    return slot;
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

export function stateExecutionClaimScopeKey(scope: StateExecutionClaimScope): string {
  const validated = stateExecutionClaimScopeSchema.parse(scope);
  return `${validated.tenantId ?? ''}\u0000${validated.userId}\u0000${validated.runId}\u0000${validated.stateId}\u0000${validated.stateAttempt}`;
}

export function stateExecutionClaimGuard(claim: StateExecutionClaim): StateExecutionClaimGuard {
  return {
    claimId: claim.claimId,
    ownerId: claim.ownerId,
    fencingToken: claim.fencingToken,
  };
}

function scopeFromAcquire(request: StateExecutionClaimAcquireRequest): StateExecutionClaimScope {
  return {
    ...(request.tenantId === undefined ? {} : { tenantId: request.tenantId }),
    userId: request.userId,
    runId: request.runId,
    stateId: request.stateId,
    stateAttempt: request.stateAttempt,
  };
}

function assertRunScope(
  scope: StateExecutionClaimScope,
  authorization: RunLeaseAuthorization
): void {
  if (
    scope.tenantId !== authorization.scope.tenantId ||
    scope.userId !== authorization.scope.userId ||
    scope.runId !== authorization.scope.runId
  ) {
    invalid('State execution claim scope must match its run lease scope');
  }
  if (authorization.guard.ownerId.trim().length === 0) invalid('Run lease owner is required');
}

function requireCurrentClaim(
  slot: StateClaimSlot,
  guard: StateExecutionClaimGuard,
  checkedAt: string
): StateExecutionClaim {
  validTimestamp(checkedAt, 'checkedAt');
  const current = slot.current;
  if (Date.parse(checkedAt) < Date.parse(current.acquiredAt)) {
    invalid('State claim operation time must not precede acquiredAt');
  }
  if (current.status !== 'claimed' || Date.parse(current.expiresAt) <= Date.parse(checkedAt)) {
    claimRejected(scopeFromClaim(current), guard, 'State execution claim is not active', current);
  }
  if (
    guard.claimId !== current.claimId ||
    guard.ownerId !== current.ownerId ||
    guard.fencingToken !== current.fencingToken
  ) {
    claimRejected(scopeFromClaim(current), guard, 'Stale state execution claim rejected', current);
  }
  return current;
}

function assertRunFencing(claim: StateExecutionClaim, runLease: FencedRunLease): void {
  if (claim.ownerId !== runLease.ownerId || claim.fencingToken !== runLease.fencingToken) {
    claimRejected(
      scopeFromClaim(claim),
      stateExecutionClaimGuard(claim),
      'State claim does not belong to the current run lease',
      claim
    );
  }
}

function effectiveClaim(claim: StateExecutionClaim, checkedAt: string): StateExecutionClaim {
  if (claim.status === 'claimed' && Date.parse(claim.expiresAt) <= Date.parse(checkedAt)) {
    return { ...claim, status: 'expired' };
  }
  return claim;
}

function scopeFromClaim(claim: StateExecutionClaim): StateExecutionClaimScope {
  return {
    ...(claim.tenantId === undefined ? {} : { tenantId: claim.tenantId }),
    userId: claim.userId,
    runId: claim.runId,
    stateId: claim.stateId,
    stateAttempt: claim.stateAttempt,
  };
}

function boundedExpiry(start: string, ttlMs: number, leaseExpiresAt: string): string {
  const startMs = Date.parse(start);
  const leaseExpiryMs = Date.parse(leaseExpiresAt);
  const requestedExpiryMs = startMs + ttlMs;
  if (!Number.isSafeInteger(requestedExpiryMs)) invalid('State claim expiry is unsupported');
  const expiryMs = Math.min(requestedExpiryMs, leaseExpiryMs);
  if (expiryMs <= startMs) invalid('Run lease has no remaining lifetime for a state claim');
  return new Date(expiryMs).toISOString();
}

function validTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid timestamp`);
}

function withoutUndefined(value: object): Record<string, unknown> {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined));
}

function cloneClaim(claim: StateExecutionClaim): StateExecutionClaim {
  return structuredClone(claim);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(code: string, message: string, context: Record<string, unknown>): never {
  throw new FrameworkError({ code, message, context });
}

function claimRejected(
  scope: StateExecutionClaimScope,
  guard: StateExecutionClaimGuard | undefined,
  message: string,
  current?: StateExecutionClaim
): never {
  throw new FrameworkError({
    code: 'RUNTIME_FENCING_REJECTED',
    message,
    context: {
      runId: scope.runId,
      stateId: scope.stateId,
      stateAttempt: scope.stateAttempt,
      claimId: guard?.claimId,
      ownerId: guard?.ownerId,
      fencingToken: guard?.fencingToken,
      currentClaimId: current?.claimId,
      currentOwnerId: current?.ownerId,
      currentFencingToken: current?.fencingToken,
    },
  });
}
