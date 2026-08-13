import Ajv, { type ErrorObject, type ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import type { EventCreateInput, PersistedFrameworkEvent } from '../../events';
import type {
  RuntimeRunControlCommand,
  RuntimeRunControlResult,
} from '../../contracts/runtime-control';
import { validateRuntimeRunControlCommand } from '../../contracts/runtime-control-schemas';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type {
  FencedRunLease,
  RunLeaseAuthorization,
  RunLeaseStore,
} from '../../contracts/runtime-coordination';
import type { RuntimeJsonValue } from '../../contracts/runtime-helpers';
import { FrameworkError } from '../../errors';
import type { JsonSchema } from '../../specs';
import { hashCanonicalJson } from './canonical-json';
import type { EventRuntime } from './event-runtime';
import type { EventStreamScope } from './event-store';
import { createRuntimeOrchestrationProjectionDefinition } from './orchestration-projection';
import type { ProjectionEngine, ProjectionStore } from './projection';

const REQUIRED_PERMISSION = {
  pause: 'runtime.run.pause',
  resume: 'runtime.run.resume',
  signal: 'runtime.run.signal',
} as const;

export interface RuntimeRunControlServiceOptions {
  events: EventRuntime;
  projections: ProjectionEngine;
  projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
  runLeases: RunLeaseStore;
  now?: () => string;
  nextId?: (namespace: string) => string;
}

export class RuntimeRunControlService {
  private readonly now: () => string;
  private readonly nextId: (namespace: string) => string;
  private readonly ajv: Ajv;

  constructor(private readonly options: RuntimeRunControlServiceOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
    let sequence = 0;
    this.nextId = options.nextId ?? ((namespace) => `${namespace}.${++sequence}`);
    this.ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(this.ajv);
  }

  async execute(input: RuntimeRunControlCommand): Promise<RuntimeRunControlResult> {
    const command = validateRuntimeRunControlCommand(input);
    this.authorize(command);
    const commandHash = logicalCommandHash(command);
    const prior = await this.findPrior(command, commandHash);
    if (prior) return prior;

    const lease = await this.acquireRunLease(command);
    if (!lease) {
      const projection = await this.project(command);
      const head = await this.options.events.getStreamHead(streamScope(command));
      return {
        commandId: command.commandId,
        kind: command.kind,
        disposition: 'lease_unavailable',
        eventIds: [],
        runRevision: head?.runRevision ?? 0,
        projection,
      };
    }

    const authorization = authorizationFor(lease);
    try {
      const raced = await this.findPrior(command, commandHash);
      if (raced) return raced;
      const projection = await this.project(command);
      this.requireRun(projection, command);
      const events = this.buildEvents(command, projection, commandHash);
      const head = await this.options.events.getStreamHead(streamScope(command));
      if (!head) conflict('RUNTIME_RUN_NOT_FOUND', 'Run Event stream does not exist', command);
      const appended = await this.options.events.append({
        scope: streamScope(command),
        events,
        expectedLastSequence: head.lastSequence,
        expectedRunRevision: head.runRevision,
        fencingToken: authorization.guard.fencingToken,
        idempotencyKey: `runtime-control:${command.idempotencyKey ?? command.commandId}`,
        transactionGroupId: `runtime-control:${command.kind}:${command.commandId}`,
      });
      return {
        commandId: command.commandId,
        kind: command.kind,
        disposition: appended.reused ? 'reused' : 'applied',
        eventIds: appended.events.map((event) => event.id),
        runRevision: appended.runRevision,
        projection: await this.project(command),
      };
    } finally {
      await this.options.runLeases.release({
        scope: authorization.scope,
        guard: authorization.guard,
        releasedAt: this.timestamp('Run control Lease release'),
      });
    }
  }

  private authorize(command: RuntimeRunControlCommand): void {
    if (
      command.scope.tenantId !== undefined &&
      command.principal.tenantId !== undefined &&
      command.scope.tenantId !== command.principal.tenantId
    ) {
      conflict(permissionErrorCode(command), 'Principal tenant does not match Run tenant', command);
    }
    const required = REQUIRED_PERMISSION[command.kind];
    const scopes = command.principal.permissionScopes;
    if (!scopes.includes(required) && !scopes.includes('runtime.run.*') && !scopes.includes('*')) {
      conflict(permissionErrorCode(command), `Principal lacks ${required}`, command);
    }
  }

  private requireRun(
    projection: RuntimeOrchestrationProjection,
    command: RuntimeRunControlCommand
  ): void {
    if (projection.runStatus === 'not_created') {
      conflict('RUNTIME_RUN_NOT_FOUND', 'Run Event stream has not been created', command);
    }
    if (['completed', 'failed', 'cancelled', 'timed_out'].includes(projection.runStatus)) {
      conflict('RUNTIME_RUN_CONFLICT', `Terminal Run cannot ${command.kind}`, command, {
        runStatus: projection.runStatus,
      });
    }
    if (!projection.currentState || projection.stateAttempt < 1) {
      conflict('RUNTIME_RUN_CONFLICT', 'Run control requires a current State attempt', command);
    }
  }

  private buildEvents(
    command: RuntimeRunControlCommand,
    projection: RuntimeOrchestrationProjection,
    commandHash: string
  ): EventCreateInput[] {
    if (command.kind === 'pause') {
      return this.pauseEvents(command, projection, commandHash);
    }
    if (command.kind === 'resume') {
      return this.resumeEvents(command, projection, commandHash);
    }
    return this.signalEvents(command, projection, commandHash);
  }

  private pauseEvents(
    command: Extract<RuntimeRunControlCommand, { kind: 'pause' }>,
    projection: RuntimeOrchestrationProjection,
    commandHash: string
  ): EventCreateInput[] {
    if (projection.runStatus !== 'running' || projection.pendingWait) {
      conflict('RUNTIME_RUN_CONFLICT', `Run cannot pause from ${projection.runStatus}`, command);
    }
    const waitId = this.nextId('runtime-wait');
    const wait = {
      type: 'pause' as const,
      ...(command.resumeKey === undefined ? {} : { key: command.resumeKey }),
      reason: command.reason,
    };
    return [
      this.event(
        command,
        'runtime.wait.created',
        {
          commandId: command.commandId,
          commandHash,
          waitId,
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
        'run.paused',
        { commandId: command.commandId, commandHash, waitId, reason: command.reason },
        projection,
        command.requestedAt
      ),
    ];
  }

  private resumeEvents(
    command: Extract<RuntimeRunControlCommand, { kind: 'resume' }>,
    projection: RuntimeOrchestrationProjection,
    commandHash: string
  ): EventCreateInput[] {
    if (projection.runStatus !== 'paused' || projection.pendingWait?.type !== 'pause') {
      conflict(
        'RUNTIME_RUN_CONFLICT',
        `Run cannot manually resume from ${projection.runStatus}`,
        command
      );
    }
    this.matchKey(command, projection);
    return this.resumeBatch(command, projection, commandHash, 'manual', command.requestedAt);
  }

  private signalEvents(
    command: Extract<RuntimeRunControlCommand, { kind: 'signal' }>,
    projection: RuntimeOrchestrationProjection,
    commandHash: string
  ): EventCreateInput[] {
    if (projection.runStatus !== 'waiting_signal' || projection.pendingWait?.type !== 'signal') {
      conflict('RUNTIME_SIGNAL_INVALID', 'Run is not waiting for a signal', command, {
        runStatus: projection.runStatus,
      });
    }
    this.matchKey(command, projection);
    if (
      projection.pendingWait.expiresAt !== undefined &&
      Date.parse(command.sentAt) >= Date.parse(projection.pendingWait.expiresAt)
    ) {
      conflict('RUNTIME_SIGNAL_EXPIRED', 'Signal arrived after the pending Wait expired', command, {
        expiresAt: projection.pendingWait.expiresAt,
      });
    }
    if (projection.pendingWait.expectedSchema) {
      this.validateSignalPayload(command, projection.pendingWait.expectedSchema);
    }
    const waitId = projection.pendingWait.waitId;
    return [
      this.event(
        command,
        'runtime.signal.received',
        {
          commandId: command.commandId,
          commandHash,
          signalId: command.commandId,
          waitId,
          key: command.key,
          payload: command.payload,
          principalId: command.principal.principalId,
          sentAt: command.sentAt,
        },
        projection,
        command.sentAt
      ),
      ...this.resumeBatch(command, projection, commandHash, 'signal', command.sentAt),
    ];
  }

  private resumeBatch(
    command: Extract<RuntimeRunControlCommand, { kind: 'resume' | 'signal' }>,
    projection: RuntimeOrchestrationProjection,
    commandHash: string,
    kind: 'manual' | 'signal',
    resumedAt: string
  ): EventCreateInput[] {
    const pendingWait = projection.pendingWait;
    if (!pendingWait) conflict('RUNTIME_RUN_CONFLICT', 'Run has no pending Wait', command);
    const resume = {
      commandId: command.commandId,
      kind,
      waitId: pendingWait.waitId,
      principalId: command.principal.principalId,
      ...('key' in command && command.key !== undefined ? { key: command.key } : {}),
      ...('payload' in command && command.payload !== undefined
        ? { payload: command.payload }
        : {}),
      resumedAt,
    };
    const nextAttempt = projection.stateAttempt + 1;
    return [
      this.event(
        command,
        'run.resume.requested',
        { commandId: command.commandId, commandHash, waitId: pendingWait.waitId },
        projection,
        resumedAt
      ),
      this.event(
        command,
        'runtime.wait.resolved',
        {
          commandId: command.commandId,
          commandHash,
          waitId: pendingWait.waitId,
          resolution: kind,
          resolvedAt: resumedAt,
        },
        projection,
        resumedAt
      ),
      this.event(
        command,
        'run.resumed',
        { commandId: command.commandId, commandHash, resume },
        projection,
        resumedAt
      ),
      this.event(
        command,
        'fsm.state.entered',
        {
          commandId: command.commandId,
          commandHash,
          stateId: projection.currentState,
          reason: kind === 'signal' ? 'signal_received' : 'manual_resume',
        },
        projection,
        resumedAt,
        nextAttempt
      ),
    ];
  }

  private matchKey(
    command: Extract<RuntimeRunControlCommand, { kind: 'resume' | 'signal' }>,
    projection: RuntimeOrchestrationProjection
  ): void {
    const expected = projection.pendingWait?.key;
    const actual = command.key;
    if (expected !== undefined && actual !== expected) {
      conflict(
        command.kind === 'signal' ? 'RUNTIME_SIGNAL_INVALID' : 'RUNTIME_RUN_CONFLICT',
        'Control key does not match the pending Wait',
        command,
        { expectedKey: expected, actualKey: actual }
      );
    }
  }

  private validateSignalPayload(
    command: Extract<RuntimeRunControlCommand, { kind: 'signal' }>,
    schema: JsonSchema
  ): void {
    let validate: ValidateFunction;
    try {
      validate = this.ajv.compile(schema);
    } catch (error) {
      conflict('RUNTIME_SIGNAL_INVALID', 'Pending Signal schema is invalid', command, {
        cause: error instanceof Error ? error.message : String(error),
      });
    }
    if (!validate!(command.payload)) {
      conflict(
        'RUNTIME_SIGNAL_INVALID',
        'Signal payload does not satisfy the pending schema',
        command,
        {
          issues: formatAjvErrors(validate!.errors),
        }
      );
    }
  }

  private async findPrior(
    command: RuntimeRunControlCommand,
    commandHash: string
  ): Promise<RuntimeRunControlResult | null> {
    const operationId = controlOperationId(command.commandId);
    const events = await this.options.events.read({ scope: streamScope(command) });
    const prior = events.filter((event) => event.operationId === operationId);
    if (prior.length === 0) return null;
    const recordedHash = payloadString(prior[0], 'commandHash');
    if (recordedHash !== commandHash) {
      conflict(
        'RUNTIME_IDEMPOTENCY_CONFLICT',
        'Control command id was reused with different input',
        command
      );
    }
    const head = await this.options.events.getStreamHead(streamScope(command));
    return {
      commandId: command.commandId,
      kind: command.kind,
      disposition: 'reused',
      eventIds: prior.map((event) => event.id),
      runRevision: head?.runRevision ?? 0,
      projection: await this.project(command),
    };
  }

  private async acquireRunLease(command: RuntimeRunControlCommand): Promise<FencedRunLease | null> {
    const acquiredAt = this.timestamp('Run control Lease acquisition');
    const requestedLeaseId = this.nextId('run-control-lease');
    return this.options.runLeases.acquire({
      ...(command.scope.tenantId === undefined ? {} : { tenantId: command.scope.tenantId }),
      userId: command.scope.userId,
      runId: command.scope.runId,
      partitionKey: `runtime:${command.scope.runId}`,
      requestedLeaseId,
      ownerId: command.ownerId,
      ttlMs: command.leaseTtlMs,
      acquiredAt,
      idempotencyKey: `runtime-control-lease:${command.commandId}:${requestedLeaseId}`,
    });
  }

  private event(
    command: RuntimeRunControlCommand,
    type: EventCreateInput['type'],
    payload: Record<string, unknown>,
    projection: RuntimeOrchestrationProjection,
    timestamp: string,
    stateAttempt = projection.stateAttempt
  ): EventCreateInput {
    return {
      id: this.nextId('runtime-control-event'),
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
      operationId: controlOperationId(command.commandId),
      idempotencyKey: command.idempotencyKey ?? command.commandId,
      timestamp,
      payload,
      metadata: { stateAttempt, principalId: command.principal.principalId },
    };
  }

  private project(command: RuntimeRunControlCommand): Promise<RuntimeOrchestrationProjection> {
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

function streamScope(command: RuntimeRunControlCommand): EventStreamScope {
  return {
    ...(command.scope.tenantId === undefined ? {} : { tenantId: command.scope.tenantId }),
    userId: command.scope.userId,
    runId: command.scope.runId,
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

function logicalCommandHash(command: RuntimeRunControlCommand): string {
  const { ownerId, leaseTtlMs, ...logical } = command;
  void ownerId;
  void leaseTtlMs;
  return hashCanonicalJson(logical);
}

function controlOperationId(commandId: string): string {
  return `runtime-control:${commandId}`;
}

function payloadString(event: PersistedFrameworkEvent, property: string): string | undefined {
  const payload =
    event.payload && typeof event.payload === 'object' && !Array.isArray(event.payload)
      ? (event.payload as Record<string, unknown>)
      : undefined;
  const value = payload?.[property];
  return typeof value === 'string' ? value : undefined;
}

function permissionErrorCode(command: RuntimeRunControlCommand): string {
  return command.kind === 'signal' ? 'RUNTIME_SIGNAL_INVALID' : 'RUNTIME_RUN_CONFLICT';
}

function formatAjvErrors(errors: ErrorObject[] | null | undefined): string[] {
  return (errors ?? []).map(
    (error) => `${error.instancePath || '/'} ${error.message ?? 'invalid'}`
  );
}

function conflict(
  code: string,
  message: string,
  command: RuntimeRunControlCommand,
  context: Record<string, unknown> = {}
): never {
  throw new FrameworkError({
    code,
    message,
    context: {
      commandId: command.commandId,
      commandKind: command.kind,
      runId: command.scope.runId,
      ...context,
    },
  });
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
