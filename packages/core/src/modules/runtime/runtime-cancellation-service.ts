import type {
  RuntimeActivityCancellationPort,
  RuntimeCancelCommand,
  RuntimeCancelResult,
  RuntimeCancellationTargetResult,
  RuntimeChildRunCancellationPort,
} from '../../contracts/runtime-cancellation';
import {
  validateRuntimeCancelCommand,
  validateRuntimeCancellationTargetResult,
  validateRuntimeCancelResult,
} from '../../contracts/runtime-cancellation-schemas';
import type { RunLeaseAuthorization, RunLeaseStore } from '../../contracts/runtime-coordination';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type { NormalizedRuntimeError } from '../../contracts/runtime';
import { validateNormalizedRuntimeError } from '../../contracts/runtime-schemas';
import type { EventCreateInput, PersistedFrameworkEvent } from '../../events';
import { FrameworkError, isFrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';
import type { EventRuntime } from './event-runtime';
import type { EventStreamScope } from './event-store';
import { createRuntimeOrchestrationProjectionDefinition } from './orchestration-projection';
import type { ProjectionEngine, ProjectionStore } from './projection';

const TERMINAL_STATUSES = new Set(['completed', 'failed', 'cancelled', 'timed_out']);

export interface RuntimeCancellationServiceOptions {
  events: EventRuntime;
  projections: ProjectionEngine;
  projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
  runLeases: RunLeaseStore;
  activities: RuntimeActivityCancellationPort;
  children: RuntimeChildRunCancellationPort;
  now?: () => string;
  nextId?: (namespace: string) => string;
}

export class RuntimeCancellationService {
  private readonly now: () => string;
  private readonly nextId: (namespace: string) => string;

  constructor(private readonly options: RuntimeCancellationServiceOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
    let sequence = 0;
    this.nextId = options.nextId ?? ((namespace) => `${namespace}.${++sequence}`);
  }

  async cancel(input: RuntimeCancelCommand): Promise<RuntimeCancelResult> {
    const command = validateRuntimeCancelCommand(input);
    this.authorize(command);
    const commandHash = logicalCommandHash(command);
    const prior = await this.operationEvents(command, commandHash);
    if (hasFinalEvent(prior)) return this.reusedResult(command, prior);

    const beforeLease = await this.project(command);
    this.requireCancellable(beforeLease, command, prior.length > 0);
    const authorization = await this.preemptRunLease(command);
    try {
      let operation = await this.operationEvents(command, commandHash);
      if (hasFinalEvent(operation)) return this.reusedResult(command, operation);

      let projection = await this.project(command);
      this.requireCancellable(projection, command, operation.length > 0);
      if (!hasInitialEvent(operation)) {
        await this.append(
          command,
          authorization,
          this.initialEvents(command, projection, commandHash),
          'initial'
        );
        projection = await this.project(command);
        operation = await this.operationEvents(command, commandHash);
      }

      const recorded = targetResultsFrom(operation);
      await this.cancelActivities(command, authorization, projection, commandHash, recorded);
      await this.cancelChildren(command, authorization, commandHash, recorded);

      operation = await this.operationEvents(command, commandHash);
      const targetResults = targetResultsFrom(operation);
      projection = await this.project(command);
      const unresolvedActivityIds = [...projection.pendingActivityIds];
      const final = await this.append(
        command,
        authorization,
        [
          this.event(
            command,
            'run.cancelled',
            {
              commandId: command.commandId,
              commandHash,
              reason: command.reason,
              terminalState: projection.currentState,
              targetResults,
              unresolvedActivityIds,
            },
            projection,
            command.requestedAt
          ),
        ],
        'final'
      );
      return validateRuntimeCancelResult({
        commandId: command.commandId,
        disposition: final.reused ? 'reused' : 'applied',
        eventIds: [...operation.map((event) => event.id), ...final.events.map((event) => event.id)],
        targetResults,
        unresolvedActivityIds,
        projection: await this.project(command),
      });
    } finally {
      await this.release(authorization);
    }
  }

  private authorize(command: RuntimeCancelCommand): void {
    if (
      command.scope.tenantId !== undefined &&
      command.principal.tenantId !== undefined &&
      command.scope.tenantId !== command.principal.tenantId
    ) {
      conflict('Principal tenant does not match Run tenant', command);
    }
    const scopes = command.principal.permissionScopes;
    if (
      !scopes.includes('runtime.run.cancel') &&
      !scopes.includes('runtime.run.*') &&
      !scopes.includes('*')
    ) {
      conflict('Principal lacks runtime.run.cancel', command);
    }
  }

  private requireCancellable(
    projection: RuntimeOrchestrationProjection,
    command: RuntimeCancelCommand,
    resuming: boolean
  ): void {
    if (projection.runStatus === 'not_created') {
      conflict('Run Event stream has not been created', command, 'RUNTIME_RUN_NOT_FOUND');
    }
    if (TERMINAL_STATUSES.has(projection.runStatus)) {
      conflict(`Terminal Run cannot cancel from ${projection.runStatus}`, command);
    }
    if (!projection.currentState || projection.stateAttempt < 1) {
      conflict('Run cancellation requires a current State attempt', command);
    }
    if (
      projection.runStatus === 'cancelling' &&
      (!resuming || projection.cancellation?.commandId !== command.commandId)
    ) {
      conflict('Run is already being cancelled by another command', command);
    }
  }

  private async preemptRunLease(command: RuntimeCancelCommand): Promise<RunLeaseAuthorization> {
    const acquiredAt = this.timestamp('Cancellation Lease acquisition');
    const requestedLeaseId = this.nextId('runtime-cancellation-lease');
    const lease = await this.options.runLeases.preempt({
      ...(command.scope.tenantId === undefined ? {} : { tenantId: command.scope.tenantId }),
      userId: command.scope.userId,
      runId: command.scope.runId,
      partitionKey: `runtime:${command.scope.runId}`,
      requestedLeaseId,
      ownerId: command.ownerId,
      ttlMs: command.leaseTtlMs,
      acquiredAt,
      idempotencyKey: `runtime-cancellation-lease:${command.commandId}:${requestedLeaseId}`,
      reason: 'cancellation',
    });
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

  private async cancelActivities(
    command: RuntimeCancelCommand,
    authorization: RunLeaseAuthorization,
    projection: RuntimeOrchestrationProjection,
    commandHash: string,
    recorded: RuntimeCancellationTargetResult[]
  ): Promise<void> {
    if (!command.policy.cancelRunningActivities) return;
    const completed = targetKeys(recorded);
    for (const activityId of projection.pendingActivityIds) {
      const key = targetKey('activity', activityId);
      if (completed.has(key)) continue;
      await this.heartbeat(command, authorization);
      let result: RuntimeCancellationTargetResult;
      try {
        result = validateTargetResult(
          await this.options.activities.cancel({
            scope: command.scope,
            activityId,
            reason: command.reason,
            requestedAt: command.requestedAt,
            ...deadline(command),
            fencingToken: authorization.guard.fencingToken,
            idempotencyKey: `${operationId(command)}:activity:${activityId}`,
          }),
          'activity',
          activityId
        );
      } catch (error) {
        result = failedResult('activity', activityId, error);
      }
      await this.persistTargetResult(command, authorization, commandHash, projection, result);
    }
  }

  private async cancelChildren(
    command: RuntimeCancelCommand,
    authorization: RunLeaseAuthorization,
    commandHash: string,
    recorded: RuntimeCancellationTargetResult[]
  ): Promise<void> {
    if (command.policy.propagation === 'none') return;
    const completed = targetKeys(recorded);
    let children: string[];
    try {
      children = uniqueChildIds(
        await this.options.children.listChildren({
          scope: command.scope,
          requestedAt: command.requestedAt,
        })
      );
    } catch (error) {
      const targetId = `${command.scope.runId}:children`;
      if (!completed.has(targetKey('child_run', targetId))) {
        await this.persistTargetResult(
          command,
          authorization,
          commandHash,
          await this.project(command),
          failedResult('child_run', targetId, error)
        );
      }
      return;
    }
    for (const childRunId of children) {
      const key = targetKey('child_run', childRunId);
      if (completed.has(key)) continue;
      await this.heartbeat(command, authorization);
      let result: RuntimeCancellationTargetResult;
      try {
        result = validateTargetResult(
          await this.options.children.cancel({
            parentScope: command.scope,
            childRunId,
            reason: command.reason,
            propagation: command.policy.propagation,
            requestedAt: command.requestedAt,
            ...deadline(command),
            fencingToken: authorization.guard.fencingToken,
            idempotencyKey: `${operationId(command)}:child:${childRunId}`,
          }),
          'child_run',
          childRunId
        );
      } catch (error) {
        result = failedResult('child_run', childRunId, error);
      }
      await this.persistTargetResult(
        command,
        authorization,
        commandHash,
        await this.project(command),
        result
      );
    }
  }

  private async persistTargetResult(
    command: RuntimeCancelCommand,
    authorization: RunLeaseAuthorization,
    commandHash: string,
    projection: RuntimeOrchestrationProjection,
    result: RuntimeCancellationTargetResult
  ): Promise<void> {
    const events: EventCreateInput[] = [
      this.event(
        command,
        result.status === 'failed'
          ? 'runtime.cancellation.failed'
          : 'runtime.cancellation.propagated',
        { commandId: command.commandId, commandHash, result },
        projection,
        this.timestamp('Cancellation propagation result')
      ),
    ];
    if (result.targetType === 'activity' && result.status !== 'failed') {
      events.push(
        this.event(
          command,
          'runtime.activity.cancelled',
          {
            commandId: command.commandId,
            commandHash,
            activityId: result.targetId,
            status: result.status,
          },
          projection,
          this.timestamp('Activity cancellation observation')
        )
      );
    }
    await this.append(
      command,
      authorization,
      events,
      `target:${result.targetType}:${result.targetId}`
    );
  }

  private initialEvents(
    command: RuntimeCancelCommand,
    projection: RuntimeOrchestrationProjection,
    commandHash: string
  ): EventCreateInput[] {
    return [
      this.event(
        command,
        'run.cancel.requested',
        {
          commandId: command.commandId,
          commandHash,
          principalId: command.principal.principalId,
          reason: command.reason,
          policy: command.policy,
          requestedAt: command.requestedAt,
        },
        projection,
        command.requestedAt
      ),
      this.event(
        command,
        'run.cancelling',
        { commandId: command.commandId, commandHash },
        projection,
        command.requestedAt
      ),
    ];
  }

  private async append(
    command: RuntimeCancelCommand,
    authorization: RunLeaseAuthorization,
    events: EventCreateInput[],
    phase: string
  ) {
    const head = await this.options.events.getStreamHead(streamScope(command));
    if (!head) conflict('Run Event stream does not exist', command, 'RUNTIME_RUN_NOT_FOUND');
    return this.options.events.append({
      scope: streamScope(command),
      events,
      expectedLastSequence: head.lastSequence,
      expectedRunRevision: head.runRevision,
      fencingToken: authorization.guard.fencingToken,
      idempotencyKey: `${operationId(command)}:${phase}`,
      transactionGroupId: `${operationId(command)}:${phase}`,
    });
  }

  private event(
    command: RuntimeCancelCommand,
    type: EventCreateInput['type'],
    payload: Record<string, unknown>,
    projection: RuntimeOrchestrationProjection,
    timestamp: string
  ): EventCreateInput {
    return {
      id: this.nextId('runtime-cancellation-event'),
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
      fsmState: projection.currentState,
      correlationId: command.scope.runId,
      operationId: operationId(command),
      idempotencyKey: command.idempotencyKey ?? command.commandId,
      timestamp,
      payload,
      metadata: {
        stateAttempt: projection.stateAttempt,
        principalId: command.principal.principalId,
      },
    };
  }

  private async heartbeat(
    command: RuntimeCancelCommand,
    authorization: RunLeaseAuthorization
  ): Promise<void> {
    await this.options.runLeases.heartbeat({
      scope: authorization.scope,
      guard: authorization.guard,
      ttlMs: command.leaseTtlMs,
      heartbeatAt: this.timestamp('Cancellation Lease heartbeat'),
    });
  }

  private async release(authorization: RunLeaseAuthorization): Promise<void> {
    try {
      await this.options.runLeases.release({
        scope: authorization.scope,
        guard: authorization.guard,
        releasedAt: this.timestamp('Cancellation Lease release'),
      });
    } catch (error) {
      if (!isFrameworkError(error) || error.code !== 'RUNTIME_FENCING_REJECTED') throw error;
    }
  }

  private async operationEvents(
    command: RuntimeCancelCommand,
    commandHash: string
  ): Promise<PersistedFrameworkEvent[]> {
    const events = (await this.options.events.read({ scope: streamScope(command) })).filter(
      (event) => event.operationId === operationId(command)
    );
    if (events.length === 0) return [];
    const recordedHash = payloadString(events[0], 'commandHash');
    if (recordedHash !== commandHash) {
      conflict(
        'Cancellation command id was reused with different input',
        command,
        'RUNTIME_IDEMPOTENCY_CONFLICT'
      );
    }
    return events;
  }

  private async reusedResult(
    command: RuntimeCancelCommand,
    events: PersistedFrameworkEvent[]
  ): Promise<RuntimeCancelResult> {
    const final = events.find((event) => event.type === 'run.cancelled');
    if (!final) conflict('Cancellation operation has no terminal Event', command);
    const payload = payloadRecord(final);
    return validateRuntimeCancelResult({
      commandId: command.commandId,
      disposition: 'reused',
      eventIds: events.map((event) => event.id),
      targetResults: Array.isArray(payload.targetResults) ? payload.targetResults : [],
      unresolvedActivityIds: Array.isArray(payload.unresolvedActivityIds)
        ? payload.unresolvedActivityIds
        : [],
      projection: await this.project(command),
    });
  }

  private project(command: RuntimeCancelCommand): Promise<RuntimeOrchestrationProjection> {
    return this.options.projections
      .update(
        createRuntimeOrchestrationProjectionDefinition(command.scope.runId),
        this.options.projectionStore,
        streamScope(command)
      )
      .then((record) => record.state);
  }

  private timestamp(label: string): string {
    const value = this.now();
    if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid date-time`);
    return value;
  }
}

function logicalCommandHash(command: RuntimeCancelCommand): string {
  const { ownerId, leaseTtlMs, ...logical } = command;
  void ownerId;
  void leaseTtlMs;
  return hashCanonicalJson(logical);
}

function operationId(command: RuntimeCancelCommand): string {
  return `runtime-cancellation:${command.commandId}`;
}

function streamScope(command: RuntimeCancelCommand): EventStreamScope {
  return {
    ...(command.scope.tenantId === undefined ? {} : { tenantId: command.scope.tenantId }),
    userId: command.scope.userId,
    runId: command.scope.runId,
  };
}

function deadline(command: RuntimeCancelCommand): { deadlineAt?: string } {
  if (command.policy.waitGraceMs === undefined) return {};
  return {
    deadlineAt: new Date(
      Date.parse(command.requestedAt) + command.policy.waitGraceMs
    ).toISOString(),
  };
}

function validateTargetResult(
  input: unknown,
  targetType: RuntimeCancellationTargetResult['targetType'],
  targetId: string
): RuntimeCancellationTargetResult {
  const result = validateRuntimeCancellationTargetResult(input);
  if (result.targetType !== targetType || result.targetId !== targetId) {
    invalid('Cancellation port returned a result for a different target');
  }
  return result;
}

function failedResult(
  targetType: RuntimeCancellationTargetResult['targetType'],
  targetId: string,
  error: unknown
): RuntimeCancellationTargetResult {
  return {
    targetType,
    targetId,
    status: 'failed',
    error: normalizedError(error),
  };
}

function normalizedError(error: unknown): NormalizedRuntimeError {
  return validateNormalizedRuntimeError({
    code: 'RUNTIME_INTERNAL_ERROR',
    message: error instanceof Error ? error.message : String(error),
    retryable: true,
    ...(isFrameworkError(error) ? { details: { causeCode: error.code } } : {}),
  });
}

function uniqueChildIds(children: { runId: string }[]): string[] {
  const ids = children.map((child) => child.runId);
  if (ids.some((id) => typeof id !== 'string' || !id.trim())) {
    invalid('Child Run cancellation port returned an invalid runId');
  }
  return [...new Set(ids)].sort();
}

function targetResultsFrom(events: PersistedFrameworkEvent[]): RuntimeCancellationTargetResult[] {
  return events
    .filter(
      (event) =>
        event.type === 'runtime.cancellation.propagated' ||
        event.type === 'runtime.cancellation.failed'
    )
    .map((event) => validateRuntimeCancellationTargetResult(payloadRecord(event).result));
}

function targetKeys(results: RuntimeCancellationTargetResult[]): Set<string> {
  return new Set(results.map((result) => targetKey(result.targetType, result.targetId)));
}

function targetKey(targetType: string, targetId: string): string {
  return `${targetType}\u0000${targetId}`;
}

function hasInitialEvent(events: PersistedFrameworkEvent[]): boolean {
  return events.some((event) => event.type === 'run.cancel.requested');
}

function hasFinalEvent(events: PersistedFrameworkEvent[]): boolean {
  return events.some((event) => event.type === 'run.cancelled');
}

function payloadRecord(event: PersistedFrameworkEvent): Record<string, unknown> {
  if (!event.payload || typeof event.payload !== 'object' || Array.isArray(event.payload)) {
    invalid('Cancellation Event payload must be an object');
  }
  return event.payload as Record<string, unknown>;
}

function payloadString(event: PersistedFrameworkEvent, property: string): string | undefined {
  const value = payloadRecord(event)[property];
  return typeof value === 'string' ? value : undefined;
}

function conflict(
  message: string,
  command: RuntimeCancelCommand,
  code = 'RUNTIME_RUN_CONFLICT'
): never {
  throw new FrameworkError({
    code,
    message,
    context: { commandId: command.commandId, runId: command.scope.runId },
  });
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
