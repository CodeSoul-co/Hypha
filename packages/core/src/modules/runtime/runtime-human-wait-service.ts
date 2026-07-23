import type { EventCreateInput, PersistedFrameworkEvent } from '../../events';
import type {
  FencedRunLease,
  RunLeaseAuthorization,
  RunLeaseStore,
} from '../../contracts/runtime-coordination';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type { RuntimeScope } from '../../contracts/runtime';
import { FrameworkError, isFrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';
import type { EventRuntime } from './event-runtime';
import type { EventStreamScope } from './event-store';
import { createRuntimeOrchestrationProjectionDefinition } from './orchestration-projection';
import type { ProjectionEngine, ProjectionStore } from './projection';

export interface RuntimeHumanWaitCreateCommand {
  commandId: string;
  scope: RuntimeScope;
  ownerId: string;
  leaseTtlMs: number;
  waitId: string;
  pendingActionRef: string;
  reason: string;
  requestedAt: string;
  idempotencyKey?: string;
}

export interface RuntimeHumanWaitResolveCommand {
  commandId: string;
  scope: RuntimeScope;
  ownerId: string;
  leaseTtlMs: number;
  waitId?: string;
  pendingActionRef: string;
  principalId: string;
  decision: 'approved' | 'rejected';
  resolvedAt: string;
  idempotencyKey?: string;
}

export interface RuntimeHumanWaitResult {
  commandId: string;
  disposition: 'applied' | 'reused' | 'lease_unavailable';
  eventIds: string[];
  runRevision: number;
  projection: RuntimeOrchestrationProjection;
}

export interface RuntimeHumanWaitServiceOptions {
  events: EventRuntime;
  projections: ProjectionEngine;
  projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
  runLeases: RunLeaseStore;
  now?: () => string;
  nextId?: (namespace: string) => string;
}

type HumanWaitCommand = RuntimeHumanWaitCreateCommand | RuntimeHumanWaitResolveCommand;

export class RuntimeHumanWaitService {
  private readonly now: () => string;
  private readonly nextId: (namespace: string) => string;

  constructor(private readonly options: RuntimeHumanWaitServiceOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
    let sequence = 0;
    this.nextId = options.nextId ?? ((namespace) => `${namespace}.${++sequence}`);
  }

  create(input: RuntimeHumanWaitCreateCommand): Promise<RuntimeHumanWaitResult> {
    validateCreate(input);
    return this.execute(input, 'create');
  }

  resolve(input: RuntimeHumanWaitResolveCommand): Promise<RuntimeHumanWaitResult> {
    validateResolve(input);
    return this.execute(input, 'resolve');
  }

  private async execute(
    command: HumanWaitCommand,
    operation: 'create' | 'resolve'
  ): Promise<RuntimeHumanWaitResult> {
    const commandHash = logicalCommandHash(command);
    const prior = await this.findPrior(command, operation, commandHash);
    if (prior) return prior;

    const lease = await this.acquireRunLease(command, operation);
    if (!lease) return this.leaseUnavailable(command);
    const authorization = authorizationFor(lease);
    try {
      const raced = await this.findPrior(command, operation, commandHash);
      if (raced) return raced;

      const projection = await this.project(command.scope);
      const events =
        operation === 'create'
          ? this.createEvents(command as RuntimeHumanWaitCreateCommand, projection, commandHash)
          : this.resolveEvents(command as RuntimeHumanWaitResolveCommand, projection, commandHash);
      const scope = streamScope(command.scope);
      const head = await this.options.events.getStreamHead(scope);
      if (!head) conflict('RUNTIME_RUN_NOT_FOUND', 'Run Event stream does not exist', command);
      const operationId = humanWaitOperationId(operation, command.commandId);
      const appended = await this.options.events.append({
        scope,
        events,
        expectedLastSequence: head.lastSequence,
        expectedRunRevision: head.runRevision,
        fencingToken: authorization.guard.fencingToken,
        idempotencyKey: `runtime-human-wait:${command.idempotencyKey ?? command.commandId}`,
        transactionGroupId: operationId,
      });
      return {
        commandId: command.commandId,
        disposition: appended.reused ? 'reused' : 'applied',
        eventIds: appended.events.map((event) => event.id),
        runRevision: appended.runRevision,
        projection: await this.project(command.scope),
      };
    } finally {
      await this.release(authorization);
    }
  }

  private createEvents(
    command: RuntimeHumanWaitCreateCommand,
    projection: RuntimeOrchestrationProjection,
    commandHash: string
  ): EventCreateInput[] {
    if (
      projection.runStatus !== 'running' ||
      !projection.currentState ||
      projection.stateAttempt < 1 ||
      projection.pendingWait
    ) {
      conflict(
        'RUNTIME_RUN_CONFLICT',
        `Run cannot create a Human Wait from ${projection.runStatus}`,
        command
      );
    }
    const wait = {
      type: 'human' as const,
      pendingActionRef: command.pendingActionRef,
      reason: command.reason,
    };
    return [
      this.event(
        command,
        'create',
        'runtime.wait.created',
        {
          commandId: command.commandId,
          commandHash,
          waitId: command.waitId,
          stateId: projection.currentState,
          stateAttempt: projection.stateAttempt,
          wait,
          createdAt: command.requestedAt,
        },
        projection,
        command.requestedAt
      ),
      this.event(
        command,
        'create',
        'run.waiting_human',
        {
          commandId: command.commandId,
          commandHash,
          waitId: command.waitId,
          stateId: projection.currentState,
          wait,
        },
        projection,
        command.requestedAt
      ),
    ];
  }

  private resolveEvents(
    command: RuntimeHumanWaitResolveCommand,
    projection: RuntimeOrchestrationProjection,
    commandHash: string
  ): EventCreateInput[] {
    const pending = projection.pendingWait;
    if (projection.runStatus !== 'waiting_human' || pending?.type !== 'human') {
      conflict('RUNTIME_RUN_CONFLICT', 'Run is not waiting for Human review', command);
    }
    if (
      (command.waitId !== undefined && pending.waitId !== command.waitId) ||
      pending.pendingActionRef !== command.pendingActionRef
    ) {
      conflict(
        'RUNTIME_RUN_CONFLICT',
        'Human review decision does not match the pending Wait',
        command,
        {
          expectedWaitId: pending.waitId,
          actualWaitId: command.waitId,
          expectedPendingActionRef: pending.pendingActionRef,
          actualPendingActionRef: command.pendingActionRef,
        }
      );
    }
    const waitId = pending.waitId;
    const requested = this.event(
      command,
      'resolve',
      'run.resume.requested',
      {
        commandId: command.commandId,
        commandHash,
        waitId,
      },
      projection,
      command.resolvedAt
    );
    const resolved = this.event(
      command,
      'resolve',
      'runtime.wait.resolved',
      {
        commandId: command.commandId,
        commandHash,
        waitId,
        resolution: 'manual',
        resolvedAt: command.resolvedAt,
      },
      projection,
      command.resolvedAt
    );
    const resumed = this.event(
      command,
      'resolve',
      'run.resumed',
      {
        commandId: command.commandId,
        commandHash,
        resume: {
          commandId: command.commandId,
          kind: 'manual',
          waitId,
          principalId: command.principalId,
          payload: {
            decision: command.decision,
            pendingActionRef: command.pendingActionRef,
          },
          resumedAt: command.resolvedAt,
        },
      },
      projection,
      command.resolvedAt
    );
    const entered = this.event(
      command,
      'resolve',
      'fsm.state.entered',
      {
        commandId: command.commandId,
        commandHash,
        stateId: projection.currentState,
        reason: `human_review_${command.decision}`,
      },
      projection,
      command.resolvedAt,
      projection.stateAttempt + 1
    );
    return [requested, resolved, resumed, entered];
  }

  private event(
    command: HumanWaitCommand,
    operation: 'create' | 'resolve',
    type: EventCreateInput['type'],
    payload: Record<string, unknown>,
    projection: RuntimeOrchestrationProjection,
    timestamp: string,
    stateAttempt = projection.stateAttempt
  ): EventCreateInput {
    return {
      id: this.nextId('runtime-human-wait-event'),
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
      operationId: humanWaitOperationId(operation, command.commandId),
      idempotencyKey: command.idempotencyKey ?? command.commandId,
      timestamp,
      payload,
      metadata: {
        stateAttempt,
        ...(operation === 'resolve'
          ? { principalId: (command as RuntimeHumanWaitResolveCommand).principalId }
          : {}),
      },
    };
  }

  private async findPrior(
    command: HumanWaitCommand,
    operation: 'create' | 'resolve',
    commandHash: string
  ): Promise<RuntimeHumanWaitResult | null> {
    const events = await this.options.events.read({ scope: streamScope(command.scope) });
    const prior = events.filter(
      (event) => event.operationId === humanWaitOperationId(operation, command.commandId)
    );
    if (prior.length === 0) return null;
    if (payloadString(prior[0], 'commandHash') !== commandHash) {
      conflict(
        'RUNTIME_IDEMPOTENCY_CONFLICT',
        'Human Wait command id was reused with different input',
        command
      );
    }
    const head = await this.options.events.getStreamHead(streamScope(command.scope));
    return {
      commandId: command.commandId,
      disposition: 'reused',
      eventIds: prior.map((event) => event.id),
      runRevision: head?.runRevision ?? 0,
      projection: await this.project(command.scope),
    };
  }

  private async leaseUnavailable(command: HumanWaitCommand): Promise<RuntimeHumanWaitResult> {
    const head = await this.options.events.getStreamHead(streamScope(command.scope));
    return {
      commandId: command.commandId,
      disposition: 'lease_unavailable',
      eventIds: [],
      runRevision: head?.runRevision ?? 0,
      projection: await this.project(command.scope),
    };
  }

  private async acquireRunLease(
    command: HumanWaitCommand,
    operation: 'create' | 'resolve'
  ): Promise<FencedRunLease | null> {
    const requestedLeaseId = this.nextId('runtime-human-wait-lease');
    return this.options.runLeases.acquire({
      ...(command.scope.tenantId === undefined ? {} : { tenantId: command.scope.tenantId }),
      userId: command.scope.userId,
      runId: command.scope.runId,
      partitionKey: `runtime:${command.scope.runId}`,
      requestedLeaseId,
      ownerId: command.ownerId,
      ttlMs: command.leaseTtlMs,
      acquiredAt: this.timestamp('Human Wait Lease acquisition'),
      idempotencyKey: `${humanWaitOperationId(operation, command.commandId)}:lease:${requestedLeaseId}`,
    });
  }

  private project(scope: RuntimeScope): Promise<RuntimeOrchestrationProjection> {
    return this.options.projections
      .update(
        createRuntimeOrchestrationProjectionDefinition(scope.runId),
        this.options.projectionStore,
        streamScope(scope)
      )
      .then((record) => record.state);
  }

  private async release(authorization: RunLeaseAuthorization): Promise<void> {
    try {
      await this.options.runLeases.release({
        scope: authorization.scope,
        guard: authorization.guard,
        releasedAt: this.timestamp('Human Wait Lease release'),
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

function validateCreate(command: RuntimeHumanWaitCreateCommand): void {
  validateCommon(command);
  required(command.waitId, 'waitId');
  required(command.pendingActionRef, 'pendingActionRef');
  required(command.reason, 'reason');
  validTimestamp(command.requestedAt, 'requestedAt');
}

function validateResolve(command: RuntimeHumanWaitResolveCommand): void {
  validateCommon(command);
  if (command.waitId !== undefined) required(command.waitId, 'waitId');
  required(command.pendingActionRef, 'pendingActionRef');
  required(command.principalId, 'principalId');
  validTimestamp(command.resolvedAt, 'resolvedAt');
}

function validateCommon(command: HumanWaitCommand): void {
  required(command.commandId, 'commandId');
  required(command.scope.userId, 'scope.userId');
  required(command.scope.sessionId, 'scope.sessionId');
  required(command.scope.runId, 'scope.runId');
  required(command.ownerId, 'ownerId');
  if (!Number.isInteger(command.leaseTtlMs) || command.leaseTtlMs < 1) {
    invalid('leaseTtlMs must be a positive integer');
  }
}

function logicalCommandHash(command: HumanWaitCommand): string {
  const { ownerId, leaseTtlMs, ...logical } = command;
  void ownerId;
  void leaseTtlMs;
  return hashCanonicalJson(logical);
}

function humanWaitOperationId(operation: 'create' | 'resolve', commandId: string): string {
  return `runtime-human-wait:${operation}:${commandId}`;
}

function streamScope(scope: RuntimeScope): EventStreamScope {
  return {
    ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
    userId: scope.userId,
    runId: scope.runId,
  };
}

function authorizationFor(lease: FencedRunLease): RunLeaseAuthorization {
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

function payloadString(event: PersistedFrameworkEvent, property: string): string | undefined {
  const payload =
    event.payload && typeof event.payload === 'object' && !Array.isArray(event.payload)
      ? (event.payload as Record<string, unknown>)
      : undefined;
  const value = payload?.[property];
  return typeof value === 'string' ? value : undefined;
}

function required(value: string, label: string): void {
  if (!value.trim()) invalid(`${label} is required`);
}

function validTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid date-time`);
}

function conflict(
  code: string,
  message: string,
  command: HumanWaitCommand,
  context: Record<string, unknown> = {}
): never {
  throw new FrameworkError({
    code,
    message,
    context: { runId: command.scope.runId, commandId: command.commandId, ...context },
  });
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
