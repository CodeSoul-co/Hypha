import type { EventCreateInput, FrameworkEvent } from '../../events';
import type {
  RuntimeEventAppendOptions,
  RuntimeEventCommitPort,
  RuntimeEventCommitRequest,
  RuntimeEventHelper,
  RuntimeHelperExecutionScope,
  RuntimeIdHelper,
  RuntimeIoHelperSdk,
  RuntimeJsonValue,
  RuntimeObservationEventInput,
  RuntimeResourceAcquireOptions,
  RuntimeResourceHelper,
  RuntimeResourceHelperDependencies,
  RuntimeResourceRenewOptions,
} from '../../contracts/runtime-helpers';
import {
  validateRuntimeHelperExecutionScope,
  validateRuntimeObservationEventInput,
} from '../../contracts/runtime-helper-schemas';
import type {
  RuntimeResourceClaim,
  RuntimeResourceRequest,
} from '../../contracts/runtime-coordination';
import type { RuntimeScope } from '../../contracts/runtime';
import { validateRuntimeScope } from '../../contracts/runtime-schemas';
import { FrameworkError } from '../../errors';
import type { DurableEventStore, EventStreamScope } from './event-store';

export interface DefaultRuntimeEventHelperOptions {
  execution: RuntimeHelperExecutionScope;
  ids: RuntimeIdHelper;
  clock: { now(): Promise<string> };
  port: RuntimeEventCommitPort;
}

export class DefaultRuntimeEventHelper implements RuntimeEventHelper {
  private readonly execution: RuntimeHelperExecutionScope;
  private readonly ids: RuntimeIdHelper;
  private readonly clock: { now(): Promise<string> };
  private readonly port: RuntimeEventCommitPort;

  constructor(options: DefaultRuntimeEventHelperOptions) {
    this.execution = validateRuntimeHelperExecutionScope(options.execution);
    this.ids = options.ids;
    this.clock = options.clock;
    this.port = options.port;
  }

  async append<T extends RuntimeJsonValue>(
    type: `runtime.observation.${string}`,
    payload: T,
    options?: RuntimeEventAppendOptions
  ): Promise<FrameworkEvent<T>> {
    const [event] = await this.appendBatch([{ type, payload, options }]);
    return event as FrameworkEvent<T>;
  }

  async appendBatch(inputs: RuntimeObservationEventInput[]): Promise<FrameworkEvent[]> {
    if (inputs.length === 0) invalid('Observation event batch must not be empty');
    const validated = inputs.map(validateRuntimeObservationEventInput);
    const events: EventCreateInput[] = [];
    for (const input of validated) {
      const eventId = await this.ids.next('event');
      const timestamp = await this.clock.now();
      events.push(this.createEvent(input, eventId, timestamp));
    }
    const idempotencyKey = `runtime-observation-batch:${events
      .map((event) => event.idempotencyKey)
      .join(':')}`;
    return this.port.append({
      scope: this.execution,
      events,
      fencingToken: this.execution.fencingToken,
      idempotencyKey,
    });
  }

  async readSince(sequence: number): Promise<FrameworkEvent[]> {
    if (!Number.isInteger(sequence) || sequence < 1) {
      invalid('Event sequence must be a positive integer');
    }
    return this.port.readSince(this.execution.scope, sequence);
  }

  private createEvent(
    input: RuntimeObservationEventInput,
    eventId: string,
    timestamp: string
  ): EventCreateInput {
    const { scope } = this.execution;
    const options = input.options;
    return {
      id: eventId,
      type: input.type,
      ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
      userId: scope.userId,
      ...(scope.workspaceId === undefined ? {} : { workspaceId: scope.workspaceId }),
      sessionId: scope.sessionId,
      runId: scope.runId,
      stepId: `${this.execution.stateId}:${this.execution.stateAttempt}`,
      ...(scope.agentId === undefined ? {} : { agentId: scope.agentId }),
      fsmState: this.execution.stateId,
      correlationId: this.execution.correlationId,
      ...((options?.causationId ?? this.execution.causationId)
        ? { causationId: options?.causationId ?? this.execution.causationId }
        : {}),
      ...(options?.parentEventId === undefined ? {} : { parentEventId: options.parentEventId }),
      idempotencyKey: options?.idempotencyKey ?? `runtime-observation:${eventId}`,
      operationId: eventId,
      timestamp,
      payload: input.payload,
      metadata: {
        ...(options?.metadata ?? {}),
        stateAttempt: this.execution.stateAttempt,
        fencingToken: this.execution.fencingToken,
      },
    };
  }
}

export class DurableRuntimeEventCommitPort implements RuntimeEventCommitPort {
  constructor(private readonly store: DurableEventStore) {}

  async append(request: RuntimeEventCommitRequest): Promise<FrameworkEvent[]> {
    const execution = validateRuntimeHelperExecutionScope(request.scope);
    if (request.fencingToken !== execution.fencingToken) {
      fencingRejected('Event commit fencing token does not match its execution context');
    }
    if (!request.idempotencyKey.trim()) invalid('Event commit idempotency key is required');
    if (request.events.length === 0) invalid('Event commit must contain at least one event');
    const streamScope = eventStreamScope(execution.scope);
    const head = await this.store.getStreamHead(streamScope);
    const result = await this.store.append({
      scope: streamScope,
      events: request.events,
      expectedLastSequence: head?.lastSequence ?? 0,
      ...(head === null ? {} : { expectedRunRevision: head.runRevision }),
      fencingToken: request.fencingToken,
      idempotencyKey: request.idempotencyKey,
    });
    return result.events;
  }

  async readSince(scope: RuntimeScope, sequence: number): Promise<FrameworkEvent[]> {
    const validated = validateRuntimeScope(scope);
    if (!Number.isInteger(sequence) || sequence < 1) {
      invalid('Event sequence must be a positive integer');
    }
    return this.store.readStream(eventStreamScope(validated), sequence);
  }
}

export class DefaultRuntimeResourceHelper implements RuntimeResourceHelper {
  private readonly dependencies: RuntimeResourceHelperDependencies;

  constructor(dependencies: RuntimeResourceHelperDependencies) {
    nonEmpty(dependencies.stateId, 'Resource helper stateId');
    this.dependencies = dependencies;
  }

  async acquire(
    resources: Omit<RuntimeResourceRequest, 'requestedClaimId'>[],
    options: RuntimeResourceAcquireOptions
  ): Promise<RuntimeResourceClaim[]> {
    positiveTtl(options.ttlMs);
    if (resources.length === 0) invalid('Resource acquisition must not be empty');
    const requested: RuntimeResourceRequest[] = [];
    for (const resource of resources) {
      requested.push({
        ...resource,
        requestedClaimId: await this.dependencies.ids.next('resource-claim'),
      });
    }
    const acquiredAt = await this.dependencies.clock.now();
    const idempotencyKey =
      options.idempotencyKey ?? (await this.dependencies.ids.next('resource-acquire'));
    return this.dependencies.coordinator.acquire({
      runLease: this.dependencies.runLease,
      stateId: this.dependencies.stateId,
      resources: requested,
      ttlMs: options.ttlMs,
      acquiredAt,
      idempotencyKey,
    });
  }

  async renew(
    claims: RuntimeResourceClaim[],
    options: RuntimeResourceRenewOptions
  ): Promise<RuntimeResourceClaim[]> {
    positiveTtl(options.ttlMs);
    this.assertOwnedClaims(claims);
    return this.dependencies.coordinator.renew({
      runLease: this.dependencies.runLease,
      claimIds: claims.map((claim) => claim.id),
      ttlMs: options.ttlMs,
      renewedAt: await this.dependencies.clock.now(),
    });
  }

  async release(claims: RuntimeResourceClaim[]): Promise<void> {
    this.assertOwnedClaims(claims);
    await this.dependencies.coordinator.release({
      runLease: this.dependencies.runLease,
      claimIds: claims.map((claim) => claim.id),
      releasedAt: await this.dependencies.clock.now(),
    });
  }

  async assertCurrent(claim: RuntimeResourceClaim): Promise<RuntimeResourceClaim> {
    this.assertOwnedClaims([claim]);
    return this.dependencies.coordinator.assertCurrent({
      ...(claim.tenantId === undefined ? {} : { tenantId: claim.tenantId }),
      resourceType: claim.resourceType,
      resourceKey: claim.resourceKey,
      checkedAt: await this.dependencies.clock.now(),
      claimId: claim.id,
      ownerId: claim.ownerId,
      fencingToken: claim.fencingToken,
    });
  }

  private assertOwnedClaims(claims: RuntimeResourceClaim[]): void {
    if (claims.length === 0) invalid('Resource claim list must not be empty');
    const { scope, guard } = this.dependencies.runLease;
    for (const claim of claims) {
      if (
        claim.tenantId !== scope.tenantId ||
        claim.userId !== scope.userId ||
        claim.runId !== scope.runId ||
        claim.stateId !== this.dependencies.stateId ||
        claim.ownerId !== guard.ownerId ||
        claim.runFencingToken !== guard.fencingToken
      ) {
        fencingRejected('Resource claim does not belong to this helper execution');
      }
    }
  }
}

export function createRuntimeIoHelperSdk(options: {
  event: DefaultRuntimeEventHelperOptions;
  resource: RuntimeResourceHelperDependencies;
}): RuntimeIoHelperSdk {
  const execution = validateRuntimeHelperExecutionScope(options.event.execution);
  const runLease = options.resource.runLease;
  if (
    execution.scope.tenantId !== runLease.scope.tenantId ||
    execution.scope.userId !== runLease.scope.userId ||
    execution.scope.runId !== runLease.scope.runId ||
    execution.stateId !== options.resource.stateId ||
    execution.fencingToken !== runLease.guard.fencingToken
  ) {
    fencingRejected('Event and resource helpers must share one fenced execution scope');
  }
  return Object.freeze({
    events: new DefaultRuntimeEventHelper(options.event),
    resources: new DefaultRuntimeResourceHelper(options.resource),
  });
}

function eventStreamScope(scope: RuntimeScope): EventStreamScope {
  return {
    ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
    userId: scope.userId,
    runId: scope.runId,
  };
}

function nonEmpty(value: string, label: string): void {
  if (!value.trim()) invalid(`${label} is required`);
}

function positiveTtl(ttlMs: number): void {
  if (!Number.isInteger(ttlMs) || ttlMs < 1) invalid('Resource ttlMs must be positive');
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function fencingRejected(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_FENCING_REJECTED', message });
}
