import type {
  RuntimeCheckpointCreateCommand,
  RuntimeCheckpointCreateResult,
  RuntimeCheckpointLoadRequest,
  RuntimeCheckpointLoadResult,
  RuntimeCheckpointRecord,
  RuntimeCheckpointStore,
} from '../../contracts/runtime-checkpoint';
import {
  validateRuntimeCheckpointCreateCommand,
  validateRuntimeCheckpointCreateResult,
  validateRuntimeCheckpointLoadRequest,
  validateRuntimeCheckpointLoadResult,
  validateRuntimeCheckpointRecord,
} from '../../contracts/runtime-checkpoint-schemas';
import type { RunLeaseAuthorization, RunLeaseStore } from '../../contracts/runtime-coordination';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type { EventCreateInput, PersistedFrameworkEvent } from '../../events';
import { FrameworkError, isFrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';
import type { EventRuntime } from './event-runtime';
import type { EventStreamScope } from './event-store';
import {
  createRuntimeOrchestrationProjectionDefinition,
  RUNTIME_ORCHESTRATION_PROJECTION_VERSION,
} from './orchestration-projection';
import type { ProjectionEngine, ProjectionStore } from './projection';
import {
  runtimeCheckpointChecksum,
  verifyRuntimeCheckpointChecksum,
} from './runtime-checkpoint-store';

export interface RuntimeCheckpointServiceOptions {
  events: EventRuntime;
  projections: ProjectionEngine;
  projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
  checkpoints: RuntimeCheckpointStore;
  runLeases: RunLeaseStore;
  now?: () => string;
  nextId?: (namespace: string) => string;
}

export class RuntimeCheckpointService {
  private readonly now: () => string;
  private readonly nextId: (namespace: string) => string;

  constructor(private readonly options: RuntimeCheckpointServiceOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
    let sequence = 0;
    this.nextId = options.nextId ?? ((namespace) => `${namespace}.${++sequence}`);
  }

  async create(input: RuntimeCheckpointCreateCommand): Promise<RuntimeCheckpointCreateResult> {
    const command = validateRuntimeCheckpointCreateCommand(input);
    const requestHash = logicalRequestHash(command);
    const prior = await this.operationEvents(command, requestHash);
    const completed = prior.find((event) => event.type === 'runtime.checkpoint.created');
    if (completed) return this.reusedResult(command, prior, completed);

    const authorization = await this.acquireRunLease(command);
    if (!authorization) {
      return validateRuntimeCheckpointCreateResult({
        checkpointId: command.checkpointId,
        disposition: 'lease_unavailable',
        eventIds: [],
      });
    }
    try {
      const raced = await this.operationEvents(command, requestHash);
      const racedCompleted = raced.find((event) => event.type === 'runtime.checkpoint.created');
      if (racedCompleted) return this.reusedResult(command, raced, racedCompleted);

      let record = await this.options.checkpoints.get(command.scope, command.checkpointId);
      if (record) {
        verifyRuntimeCheckpointChecksum(record);
        if (record.requestHash !== requestHash) idempotencyConflict(command);
      } else {
        record = await this.buildRecord(command, requestHash);
        try {
          record = (
            await this.options.checkpoints.put(
              record,
              `runtime-checkpoint:${command.idempotencyKey ?? command.checkpointId}`
            )
          ).record;
        } catch (error) {
          await this.recordFailure(command, authorization, requestHash, error, raced);
          throw error;
        }
      }
      await this.heartbeat(command, authorization);
      let appended;
      try {
        appended = await this.append(
          command,
          authorization,
          [this.createdEvent(command, record, requestHash)],
          'created'
        );
      } catch (error) {
        await this.recordFailure(command, authorization, requestHash, error, raced);
        throw error;
      }
      return validateRuntimeCheckpointCreateResult({
        checkpointId: command.checkpointId,
        disposition: appended.reused ? 'reused' : 'applied',
        eventIds: appended.events.map((event) => event.id),
        record,
      });
    } finally {
      await this.release(authorization);
    }
  }

  async load(input: RuntimeCheckpointLoadRequest): Promise<RuntimeCheckpointLoadResult | null> {
    const request = validateRuntimeCheckpointLoadRequest(input);
    const scope = streamScope(request.scope);
    const events = await this.options.events.read({
      scope,
      types: ['runtime.checkpoint.created'],
    });
    const receipt = request.checkpointId
      ? events.find((event) => payloadString(event, 'checkpointId') === request.checkpointId)
      : events.at(-1);
    if (!receipt) return null;
    const checkpointId = payloadString(receipt, 'checkpointId');
    if (!checkpointId) checkpointFailed('Checkpoint receipt has no checkpointId');
    const record = await this.options.checkpoints.get(request.scope, checkpointId);
    if (!record) checkpointFailed('Checkpoint receipt points to a missing record', checkpointId);
    verifyRuntimeCheckpointChecksum(record);
    if (record.checksum !== payloadString(receipt, 'checksum')) {
      checkpointFailed('Checkpoint receipt checksum does not match its record', checkpointId);
    }
    if (Date.parse(request.checkedAt) < Date.parse(record.createdAt)) {
      invalid('Checkpoint checkedAt must not precede createdAt');
    }
    const head = await this.options.events.getStreamHead(scope);
    if (!head || head.lastSequence < record.lastEventSequence) {
      checkpointFailed('Event stream head precedes the Checkpoint', checkpointId);
    }
    return validateRuntimeCheckpointLoadResult({
      record,
      currentHeadSequence: head.lastSequence,
      deltaFromSequence: record.lastEventSequence + 1,
      deltaEventCount: head.lastSequence - record.lastEventSequence,
    });
  }

  private async buildRecord(
    command: RuntimeCheckpointCreateCommand,
    requestHash: string
  ): Promise<RuntimeCheckpointRecord> {
    const projectionRecord = await this.options.projections.update(
      createRuntimeOrchestrationProjectionDefinition(command.scope.runId),
      this.options.projectionStore,
      streamScope(command.scope)
    );
    const projection = projectionRecord.state;
    if (projection.runStatus === 'not_created' || !projection.currentState) {
      checkpointFailed('Checkpoint requires a created Run with a current State');
    }
    const head = await this.options.events.getStreamHead(streamScope(command.scope));
    if (!head) checkpointFailed('Checkpoint requires an Event stream head');
    const latest = await this.options.checkpoints.latest(command.scope);
    const withoutChecksum: Omit<RuntimeCheckpointRecord, 'checksum'> = {
      id: command.checkpointId,
      scope: structuredClone(command.scope),
      sequence: (latest?.sequence ?? 0) + 1,
      workflowRevision: command.workflowRevision,
      processHash: command.processHash,
      currentState: projection.currentState,
      variablesHash: command.variablesHash,
      projectionVersion: RUNTIME_ORCHESTRATION_PROJECTION_VERSION,
      projectionSnapshot: structuredClone(projection),
      dependencySnapshotRef: command.dependencySnapshotRef,
      ...(command.toolContractSnapshotRef === undefined
        ? {}
        : { toolContractSnapshotRef: command.toolContractSnapshotRef }),
      ...(command.workspaceSnapshotRef === undefined
        ? {}
        : { workspaceSnapshotRef: command.workspaceSnapshotRef }),
      ...(command.contextSnapshotRefs === undefined
        ? {}
        : { contextSnapshotRefs: [...command.contextSnapshotRefs] }),
      ...(projection.pendingWait === undefined
        ? {}
        : { pendingWaitRef: projection.pendingWait.waitId }),
      lastEventSequence: head.lastSequence,
      reason: command.reason,
      requestHash,
      createdAt: command.createdAt,
      ...(command.metadata === undefined ? {} : { metadata: structuredClone(command.metadata) }),
    };
    return validateRuntimeCheckpointRecord({
      ...withoutChecksum,
      checksum: runtimeCheckpointChecksum(withoutChecksum),
    });
  }

  private async reusedResult(
    command: RuntimeCheckpointCreateCommand,
    events: PersistedFrameworkEvent[],
    completed: PersistedFrameworkEvent
  ): Promise<RuntimeCheckpointCreateResult> {
    const record = await this.options.checkpoints.get(command.scope, command.checkpointId);
    if (!record) checkpointFailed('Checkpoint Event exists without its materialized record');
    verifyRuntimeCheckpointChecksum(record);
    if (record.checksum !== payloadString(completed, 'checksum')) {
      checkpointFailed('Checkpoint Event checksum does not match its record');
    }
    return validateRuntimeCheckpointCreateResult({
      checkpointId: command.checkpointId,
      disposition: 'reused',
      eventIds: events.map((event) => event.id),
      record,
    });
  }

  private async operationEvents(
    command: RuntimeCheckpointCreateCommand,
    requestHash: string
  ): Promise<PersistedFrameworkEvent[]> {
    const events = (await this.options.events.read({ scope: streamScope(command.scope) })).filter(
      (event) => event.operationId === operationId(command)
    );
    if (events.length === 0) return [];
    if (payloadString(events[0], 'requestHash') !== requestHash) idempotencyConflict(command);
    return events;
  }

  private createdEvent(
    command: RuntimeCheckpointCreateCommand,
    record: RuntimeCheckpointRecord,
    requestHash: string
  ): EventCreateInput {
    return this.event(command, 'runtime.checkpoint.created', {
      checkpointId: record.id,
      checkpointSequence: record.sequence,
      lastEventSequence: record.lastEventSequence,
      projectionVersion: record.projectionVersion,
      currentState: record.currentState,
      reason: record.reason,
      requestHash,
      checksum: record.checksum,
    });
  }

  private async recordFailure(
    command: RuntimeCheckpointCreateCommand,
    authorization: RunLeaseAuthorization,
    requestHash: string,
    error: unknown,
    knownEvents: PersistedFrameworkEvent[]
  ): Promise<void> {
    if (knownEvents.some((event) => event.type === 'runtime.checkpoint.failed')) return;
    try {
      await this.append(
        command,
        authorization,
        [
          this.event(command, 'runtime.checkpoint.failed', {
            checkpointId: command.checkpointId,
            requestHash,
            error: error instanceof Error ? error.message : String(error),
          }),
        ],
        'failed'
      );
    } catch {
      // Preserve the original checkpoint failure; recovery can inspect the orphaned record.
    }
  }

  private event(
    command: RuntimeCheckpointCreateCommand,
    type: 'runtime.checkpoint.created' | 'runtime.checkpoint.failed',
    payload: Record<string, unknown>
  ): EventCreateInput {
    return {
      id: this.nextId('runtime-checkpoint-event'),
      type,
      version: '1.0.0',
      ...(command.scope.tenantId === undefined ? {} : { tenantId: command.scope.tenantId }),
      userId: command.scope.userId,
      ...(command.scope.workspaceId === undefined
        ? {}
        : { workspaceId: command.scope.workspaceId }),
      sessionId: command.scope.sessionId,
      runId: command.scope.runId,
      ...(command.scope.agentId === undefined ? {} : { agentId: command.scope.agentId }),
      correlationId: command.scope.runId,
      operationId: operationId(command),
      idempotencyKey: command.idempotencyKey ?? command.checkpointId,
      timestamp: command.createdAt,
      payload,
    };
  }

  private async append(
    command: RuntimeCheckpointCreateCommand,
    authorization: RunLeaseAuthorization,
    events: EventCreateInput[],
    phase: string
  ) {
    const scope = streamScope(command.scope);
    const head = await this.options.events.getStreamHead(scope);
    if (!head) checkpointFailed('Checkpoint Event stream does not exist');
    return this.options.events.append({
      scope,
      events,
      expectedLastSequence: head.lastSequence,
      expectedRunRevision: head.runRevision,
      fencingToken: authorization.guard.fencingToken,
      idempotencyKey: `${operationId(command)}:${phase}`,
      transactionGroupId: `${operationId(command)}:${phase}`,
    });
  }

  private async acquireRunLease(
    command: RuntimeCheckpointCreateCommand
  ): Promise<RunLeaseAuthorization | null> {
    const requestedLeaseId = this.nextId('runtime-checkpoint-lease');
    const lease = await this.options.runLeases.acquire({
      ...(command.scope.tenantId === undefined ? {} : { tenantId: command.scope.tenantId }),
      userId: command.scope.userId,
      runId: command.scope.runId,
      partitionKey: `runtime:${command.scope.runId}`,
      requestedLeaseId,
      ownerId: command.ownerId,
      ttlMs: command.leaseTtlMs,
      acquiredAt: this.timestamp('Checkpoint Lease acquisition'),
      idempotencyKey: `${operationId(command)}:lease:${requestedLeaseId}`,
    });
    if (!lease) return null;
    return {
      scope: {
        ...(lease.tenantId === undefined ? {} : { tenantId: lease.tenantId }),
        userId: lease.userId,
        runId: lease.runId,
        partitionKey: lease.partitionKey,
      },
      guard: {
        leaseId: lease.id,
        ownerId: lease.ownerId,
        fencingToken: lease.fencingToken,
      },
    };
  }

  private async heartbeat(
    command: RuntimeCheckpointCreateCommand,
    authorization: RunLeaseAuthorization
  ): Promise<void> {
    await this.options.runLeases.heartbeat({
      scope: authorization.scope,
      guard: authorization.guard,
      ttlMs: command.leaseTtlMs,
      heartbeatAt: this.timestamp('Checkpoint Lease heartbeat'),
    });
  }

  private async release(authorization: RunLeaseAuthorization): Promise<void> {
    try {
      await this.options.runLeases.release({
        scope: authorization.scope,
        guard: authorization.guard,
        releasedAt: this.timestamp('Checkpoint Lease release'),
      });
    } catch (error) {
      if (!isFrameworkError(error) || error.code !== 'RUNTIME_FENCING_REJECTED') throw error;
    }
  }

  private timestamp(label: string): string {
    const value = this.now();
    if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid date-time`);
    return value;
  }
}

function logicalRequestHash(command: RuntimeCheckpointCreateCommand): string {
  const { ownerId, leaseTtlMs, ...logical } = command;
  void ownerId;
  void leaseTtlMs;
  return hashCanonicalJson(logical);
}

function operationId(command: RuntimeCheckpointCreateCommand): string {
  return `runtime-checkpoint:${command.checkpointId}`;
}

function streamScope(scope: RuntimeCheckpointCreateCommand['scope']): EventStreamScope {
  return {
    ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
    userId: scope.userId,
    runId: scope.runId,
  };
}

function payloadString(event: PersistedFrameworkEvent, property: string): string | undefined {
  const payload =
    event.payload && typeof event.payload === 'object' && !Array.isArray(event.payload)
      ? (event.payload as Record<string, unknown>)
      : undefined;
  const value = payload?.[property];
  return typeof value === 'string' ? value : undefined;
}

function idempotencyConflict(command: RuntimeCheckpointCreateCommand): never {
  throw new FrameworkError({
    code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    message: 'Checkpoint id was reused with different input',
    context: { checkpointId: command.checkpointId, runId: command.scope.runId },
  });
}

function checkpointFailed(message: string, checkpointId?: string): never {
  throw new FrameworkError({
    code: 'RUNTIME_CHECKPOINT_FAILED',
    message,
    ...(checkpointId === undefined ? {} : { context: { checkpointId } }),
  });
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
