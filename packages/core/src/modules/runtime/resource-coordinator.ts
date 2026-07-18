import type {
  FencedRunLease,
  ResourceAcquireRequest,
  ResourceClaimAssertionRequest,
  ResourceListRequest,
  ResourceReleaseRequest,
  ResourceRenewRequest,
  RuntimeResourceClaim,
  RuntimeResourceCoordinator,
  RuntimeResourceRequest,
  RunLeaseAuthorization,
  RunLeaseStore,
} from '../../contracts/runtime-coordination';
import {
  validateResourceAcquireRequest,
  validateResourceClaimAssertionRequest,
  validateResourceListRequest,
  validateResourceReleaseRequest,
  validateResourceRenewRequest,
  validateRuntimeResourceClaim,
} from '../../contracts/runtime-coordination-schemas';
import { FrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';

interface ResourceSlot {
  fencingTokenHighWater: number;
  active: Map<string, RuntimeResourceClaim>;
}

interface ClaimLocation {
  resourceIdentity: string;
}

interface AcquireIdempotencyRecord {
  requestHash: string;
  result: RuntimeResourceClaim[];
}

interface PreparedResource {
  identity: string;
  request: RuntimeResourceRequest;
  slot: ResourceSlot;
  fencingToken: number;
}

export interface InMemoryRuntimeResourceCoordinatorOptions {
  runLeaseStore: Pick<RunLeaseStore, 'assertCurrent'>;
}

export class InMemoryRuntimeResourceCoordinator implements RuntimeResourceCoordinator {
  private readonly slots = new Map<string, ResourceSlot>();
  private readonly claimLocations = new Map<string, ClaimLocation>();
  private readonly usedClaimIds = new Set<string>();
  private readonly acquireIdempotency = new Map<string, AcquireIdempotencyRecord>();
  private readonly runLeaseStore: Pick<RunLeaseStore, 'assertCurrent'>;
  private writeBarrier = Promise.resolve();

  constructor(options: InMemoryRuntimeResourceCoordinatorOptions) {
    this.runLeaseStore = options.runLeaseStore;
  }

  async acquire(request: ResourceAcquireRequest): Promise<RuntimeResourceClaim[]> {
    const validated = validateResourceAcquireRequest(request);
    return this.exclusive(() => this.acquireExclusive(structuredClone(validated)));
  }

  async renew(request: ResourceRenewRequest): Promise<RuntimeResourceClaim[]> {
    const validated = validateResourceRenewRequest(request);
    return this.exclusive(async () => {
      uniqueClaimIds(validated.claimIds);
      const runLease = await this.authorizeRunLease(validated.runLease, validated.renewedAt);
      const claims = this.requireOwnedClaims(validated.claimIds, runLease, validated.renewedAt);
      const expiresAt = boundedExpiry(validated.renewedAt, validated.ttlMs, runLease.expiresAt);
      const renewed = claims.map((claim) => validateRuntimeResourceClaim({ ...claim, expiresAt }));
      for (const claim of renewed) {
        const location = this.claimLocations.get(claim.id)!;
        this.slots.get(location.resourceIdentity)!.active.set(claim.id, cloneClaim(claim));
      }
      return renewed.map(cloneClaim);
    });
  }

  async release(request: ResourceReleaseRequest): Promise<void> {
    const validated = validateResourceReleaseRequest(request);
    await this.exclusive(async () => {
      uniqueClaimIds(validated.claimIds);
      const runLease = await this.authorizeRunLease(validated.runLease, validated.releasedAt);
      const claims = this.requireOwnedClaims(validated.claimIds, runLease, validated.releasedAt);
      for (const claim of claims) {
        const location = this.claimLocations.get(claim.id)!;
        this.slots.get(location.resourceIdentity)!.active.delete(claim.id);
        this.claimLocations.delete(claim.id);
      }
    });
  }

  async list(request: ResourceListRequest): Promise<RuntimeResourceClaim[]> {
    const validated = validateResourceListRequest(request);
    return this.exclusive(() => {
      const identity = resourceIdentity(
        validated.tenantId,
        validated.resourceType,
        validated.resourceKey
      );
      const slot = this.slots.get(identity);
      if (!slot) return [];
      this.purgeExpired(identity, slot, validated.checkedAt);
      return Array.from(slot.active.values())
        .filter((claim) => Date.parse(claim.acquiredAt) <= Date.parse(validated.checkedAt))
        .sort((left, right) => left.id.localeCompare(right.id))
        .map(cloneClaim);
    });
  }

  async assertCurrent(request: ResourceClaimAssertionRequest): Promise<RuntimeResourceClaim> {
    const validated = validateResourceClaimAssertionRequest(request);
    return this.exclusive(() => {
      const identity = resourceIdentity(
        validated.tenantId,
        validated.resourceType,
        validated.resourceKey
      );
      const slot = this.slots.get(identity);
      if (!slot) resourceRejected(validated, undefined, 'No resource claim exists');
      this.purgeExpired(identity, slot, validated.checkedAt);
      const current = slot.active.get(validated.claimId);
      if (
        !current ||
        Date.parse(current.acquiredAt) > Date.parse(validated.checkedAt) ||
        current.ownerId !== validated.ownerId ||
        current.fencingToken !== validated.fencingToken
      ) {
        resourceRejected(validated, current, 'Stale resource claim rejected');
      }
      return cloneClaim(current);
    });
  }

  private async acquireExclusive(request: ResourceAcquireRequest): Promise<RuntimeResourceClaim[]> {
    const runScope = request.runLease.scope;
    const idempotencyKey = `${runScope.tenantId ?? ''}\u0000${runScope.userId}\u0000${runScope.runId}\u0000${request.idempotencyKey}`;
    const requestHash = hashCanonicalJson(withoutUndefined(request));
    const prior = this.acquireIdempotency.get(idempotencyKey);
    if (prior) {
      if (prior.requestHash !== requestHash) {
        conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Resource idempotency key was reused', {
          runId: runScope.runId,
          idempotencyKey: request.idempotencyKey,
        });
      }
      return prior.result.map(cloneClaim);
    }

    const runLease = await this.authorizeRunLease(request.runLease, request.acquiredAt);
    const expiresAt = boundedExpiry(request.acquiredAt, request.ttlMs, runLease.expiresAt);
    const resources = sortedUniqueResources(runScope.tenantId, request.resources);
    for (const resource of resources) {
      if (this.usedClaimIds.has(resource.requestedClaimId)) {
        conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Resource claim id cannot be reused', {
          claimId: resource.requestedClaimId,
        });
      }
      if (resource.metadata !== undefined) hashCanonicalJson(resource.metadata);
    }

    const prepared: PreparedResource[] = resources.map((resource) => {
      const identity = resourceIdentity(
        runScope.tenantId,
        resource.resourceType,
        resource.resourceKey
      );
      const slot = this.slots.get(identity) ?? {
        fencingTokenHighWater: 0,
        active: new Map<string, RuntimeResourceClaim>(),
      };
      this.purgeExpired(identity, slot, request.acquiredAt);
      const active = Array.from(slot.active.values());
      if (resource.mode === 'exclusive' ? active.length > 0 : active.some(isExclusive)) {
        resourceConflict(resource, active);
      }
      const fencingToken =
        active.length > 0 ? active[0].fencingToken : slot.fencingTokenHighWater + 1;
      return { identity, request: resource, slot, fencingToken };
    });

    const claims = prepared.map(({ request: resource, fencingToken }) =>
      validateRuntimeResourceClaim({
        id: resource.requestedClaimId,
        ...(runScope.tenantId === undefined ? {} : { tenantId: runScope.tenantId }),
        userId: runScope.userId,
        resourceType: resource.resourceType,
        resourceKey: resource.resourceKey,
        mode: resource.mode,
        runId: runScope.runId,
        ...(request.stateId === undefined ? {} : { stateId: request.stateId }),
        ownerId: runLease.ownerId,
        fencingToken,
        runFencingToken: runLease.fencingToken,
        acquiredAt: request.acquiredAt,
        expiresAt,
        ...(resource.metadata === undefined ? {} : { metadata: resource.metadata }),
      })
    );

    for (const [index, item] of prepared.entries()) {
      const claim = claims[index];
      item.slot.fencingTokenHighWater = Math.max(
        item.slot.fencingTokenHighWater,
        claim.fencingToken
      );
      item.slot.active.set(claim.id, cloneClaim(claim));
      this.slots.set(item.identity, item.slot);
      this.claimLocations.set(claim.id, { resourceIdentity: item.identity });
      this.usedClaimIds.add(claim.id);
    }
    this.acquireIdempotency.set(idempotencyKey, {
      requestHash,
      result: claims.map(cloneClaim),
    });
    return claims.map(cloneClaim);
  }

  private async authorizeRunLease(
    authorization: RunLeaseAuthorization,
    checkedAt: string
  ): Promise<FencedRunLease> {
    return this.runLeaseStore.assertCurrent({
      scope: authorization.scope,
      guard: authorization.guard,
      checkedAt,
    });
  }

  private requireOwnedClaims(
    claimIds: string[],
    runLease: FencedRunLease,
    checkedAt: string
  ): RuntimeResourceClaim[] {
    return claimIds.map((claimId) => {
      const location = this.claimLocations.get(claimId);
      const slot = location ? this.slots.get(location.resourceIdentity) : undefined;
      const claim = slot?.active.get(claimId);
      if (
        !claim ||
        Date.parse(claim.acquiredAt) > Date.parse(checkedAt) ||
        Date.parse(claim.expiresAt) <= Date.parse(checkedAt) ||
        claim.tenantId !== runLease.tenantId ||
        claim.userId !== runLease.userId ||
        claim.runId !== runLease.runId ||
        claim.ownerId !== runLease.ownerId ||
        claim.runFencingToken !== runLease.fencingToken
      ) {
        throw new FrameworkError({
          code: 'RUNTIME_FENCING_REJECTED',
          message: 'Resource claim does not belong to the current run lease',
          context: { claimId, runId: runLease.runId },
        });
      }
      return claim;
    });
  }

  private purgeExpired(identity: string, slot: ResourceSlot, checkedAt: string): void {
    validTimestamp(checkedAt, 'checkedAt');
    for (const [claimId, claim] of slot.active) {
      if (Date.parse(claim.expiresAt) <= Date.parse(checkedAt)) {
        slot.active.delete(claimId);
        this.claimLocations.delete(claimId);
      }
    }
    if (!this.slots.has(identity) && slot.active.size > 0) this.slots.set(identity, slot);
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

export function resourceClaimGuard(claim: RuntimeResourceClaim): {
  claimId: string;
  ownerId: string;
  fencingToken: number;
} {
  return { claimId: claim.id, ownerId: claim.ownerId, fencingToken: claim.fencingToken };
}

function sortedUniqueResources(
  tenantId: string | undefined,
  resources: RuntimeResourceRequest[]
): RuntimeResourceRequest[] {
  const identities = new Set<string>();
  const claimIds = new Set<string>();
  const sorted = [...resources].sort((left, right) => {
    const leftIdentity = resourceIdentity(tenantId, left.resourceType, left.resourceKey);
    const rightIdentity = resourceIdentity(tenantId, right.resourceType, right.resourceKey);
    return leftIdentity < rightIdentity ? -1 : leftIdentity > rightIdentity ? 1 : 0;
  });
  for (const resource of sorted) {
    const identity = resourceIdentity(tenantId, resource.resourceType, resource.resourceKey);
    if (identities.has(identity)) invalid('A resource may appear only once in an acquire request');
    if (claimIds.has(resource.requestedClaimId)) {
      invalid('Resource claim ids must be unique within an acquire request');
    }
    identities.add(identity);
    claimIds.add(resource.requestedClaimId);
  }
  return sorted;
}

function uniqueClaimIds(claimIds: string[]): void {
  if (new Set(claimIds).size !== claimIds.length) invalid('claimIds must be unique');
}

function resourceIdentity(
  tenantId: string | undefined,
  resourceType: string,
  resourceKey: string
): string {
  if (!resourceKey.trim()) invalid('resourceKey is required');
  return `${tenantId ?? ''}\u0000${resourceType}\u0000${resourceKey}`;
}

function isExclusive(claim: RuntimeResourceClaim): boolean {
  return claim.mode === 'exclusive';
}

function resourceConflict(request: RuntimeResourceRequest, active: RuntimeResourceClaim[]): never {
  throw new FrameworkError({
    code: 'RUNTIME_RESOURCE_CONFLICT',
    message: 'Runtime resource is already claimed in an incompatible mode',
    context: {
      resourceType: request.resourceType,
      resourceKey: request.resourceKey,
      requestedMode: request.mode,
      activeClaimIds: active.map((claim) => claim.id),
    },
  });
}

function resourceRejected(
  request: ResourceClaimAssertionRequest,
  current: RuntimeResourceClaim | undefined,
  message: string
): never {
  throw new FrameworkError({
    code: 'RUNTIME_FENCING_REJECTED',
    message,
    context: {
      resourceType: request.resourceType,
      resourceKey: request.resourceKey,
      claimId: request.claimId,
      ownerId: request.ownerId,
      fencingToken: request.fencingToken,
      currentClaimId: current?.id,
      currentFencingToken: current?.fencingToken,
    },
  });
}

function boundedExpiry(start: string, ttlMs: number, leaseExpiresAt: string): string {
  const startMs = Date.parse(start);
  const requestedExpiryMs = startMs + ttlMs;
  if (!Number.isSafeInteger(requestedExpiryMs)) invalid('Resource claim expiry is unsupported');
  const expiryMs = Math.min(requestedExpiryMs, Date.parse(leaseExpiresAt));
  if (expiryMs <= startMs) invalid('Run lease has no remaining lifetime for resource claims');
  return new Date(expiryMs).toISOString();
}

function validTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid timestamp`);
}

function withoutUndefined(value: object): Record<string, unknown> {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined));
}

function cloneClaim(claim: RuntimeResourceClaim): RuntimeResourceClaim {
  return structuredClone(claim);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(code: string, message: string, context: Record<string, unknown>): never {
  throw new FrameworkError({ code, message, context });
}
