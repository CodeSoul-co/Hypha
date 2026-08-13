import {
  FrameworkError,
  createRuntimeOrchestrationProjectionDefinition,
  hashCanonicalJson,
  type EventCreateInput,
  type EventRuntime,
  type EventStreamScope,
  type FencedRunLease,
  type PolicyEngine,
  type ProjectionEngine,
  type ProjectionStore,
  type RunLeaseAuthorization,
  type RunLeaseStore,
  type RuntimeJsonValue,
  type RuntimeOrchestrationProjection,
  type RuntimePrincipal,
  type RuntimeScope,
} from '@hypha/core';
import {
  applyTransitionWithRuntimePolicy,
  getAllowedTransitions,
  validateFSMProcessSpec,
  type FSMGuardContext,
  type FSMProcessSpec,
  type FSMSnapshot,
} from '@hypha/fsm';

export const MANUAL_FSM_TRANSITION_PERMISSION = 'runtime.fsm.transition';

export interface ManualFSMTransitionCommand {
  commandId: string;
  scope: RuntimeScope;
  principal: RuntimePrincipal;
  ownerId: string;
  leaseTtlMs: number;
  processId: string;
  processVersion: string;
  expectedState: string;
  expectedRunRevision: number;
  targetState: string;
  reason: string;
  requestedAt: string;
  guardContext?: FSMGuardContext;
  variablesPatch?: Record<string, RuntimeJsonValue>;
  idempotencyKey: string;
}

export interface ManualFSMRunView {
  runId: string;
  processId: string;
  processVersion: string;
  runRevision: number;
  runStatus: RuntimeOrchestrationProjection['runStatus'];
  currentState?: string;
  statePath: string[];
  stateAttempt: number;
  terminalStates: string[];
  allowedTransitions: Array<{ to: string; guard?: string; description?: string }>;
}

export interface ManualFSMTransitionResult {
  commandId: string;
  disposition: 'applied' | 'reused' | 'lease_unavailable';
  eventIds: string[];
  runRevision: number;
  view: ManualFSMRunView;
}

export interface GovernedFSMTransitionServiceOptions {
  events: EventRuntime;
  projections: ProjectionEngine;
  projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
  runLeases: RunLeaseStore;
  policy?: PolicyEngine;
  now?: () => string;
  nextId?: (namespace: string) => string;
}

/**
 * Applies an explicitly requested FSM edge under owner scope, permission,
 * optimistic revision, Run Lease, fencing, Policy, guard, trace, and replay.
 * It never mutates a snapshot or projection directly.
 */
export class GovernedFSMTransitionService {
  private readonly now: () => string;
  private readonly nextId: (namespace: string) => string;

  constructor(private readonly options: GovernedFSMTransitionServiceOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
    let sequence = 0;
    this.nextId = options.nextId ?? ((namespace) => `${namespace}.${++sequence}`);
  }

  async inspect(scope: RuntimeScope, process: FSMProcessSpec): Promise<ManualFSMRunView> {
    validateFSMProcessSpec(process);
    const projection = await this.project(scope);
    const head = await this.options.events.getStreamHead(streamScope(scope));
    return viewFor(process, projection, head?.runRevision ?? 0);
  }

  async transition(
    process: FSMProcessSpec,
    input: ManualFSMTransitionCommand
  ): Promise<ManualFSMTransitionResult> {
    validateFSMProcessSpec(process);
    const command = validateCommand(input);
    authorize(command);
    assertProcessIdentity(process, command);
    const commandHash = logicalCommandHash(command);
    const prior = await this.findPrior(process, command, commandHash);
    if (prior) return prior;

    const lease = await this.acquireLease(command);
    if (!lease) {
      const view = await this.inspect(command.scope, process);
      return {
        commandId: command.commandId,
        disposition: 'lease_unavailable',
        eventIds: [],
        runRevision: view.runRevision,
        view,
      };
    }

    const authorization = authorizationFor(lease);
    try {
      const raced = await this.findPrior(process, command, commandHash);
      if (raced) return raced;
      const projection = await this.project(command.scope);
      requireTransitionableRun(projection, command);
      const head = await this.options.events.getStreamHead(streamScope(command.scope));
      if (!head) conflict('RUNTIME_RUN_NOT_FOUND', 'Run Event stream does not exist', command);
      if (head.runRevision !== command.expectedRunRevision) {
        conflict('RUNTIME_RUN_CONFLICT', 'Run revision changed before manual transition', command, {
          expectedRunRevision: command.expectedRunRevision,
          actualRunRevision: head.runRevision,
        });
      }
      if (projection.currentState !== command.expectedState) {
        conflict(
          'RUNTIME_RUN_CONFLICT',
          'Current State does not match manual transition',
          command,
          {
            expectedState: command.expectedState,
            actualState: projection.currentState,
          }
        );
      }

      const snapshot = snapshotFor(process, projection, head.updatedAt);
      let next: FSMSnapshot;
      try {
        next = await applyTransitionWithRuntimePolicy(process, snapshot, command.targetState, {
          now: command.requestedAt,
          userId: command.scope.userId,
          stepId: command.commandId,
          guardContext: command.guardContext,
          policy: this.options.policy,
        });
      } catch (error) {
        await this.appendRejected(command, projection, authorization, head, commandHash, error);
        throw error;
      }

      const transition = process.transitions.find(
        (candidate) =>
          candidate.from === command.expectedState && candidate.to === command.targetState
      )!;
      const target = process.states.find((state) => state.id === command.targetState)!;
      const stateAttempt = (projection.stateVisitCounts[target.id] ?? 0) + 1;
      const operationId = operationIdFor(command.commandId);
      const metadata = { commandHash, manualTransition: true };
      const events: EventCreateInput[] = [
        event(
          command,
          'fsm.transition.requested',
          {
            commandId: command.commandId,
            commandHash,
            from: command.expectedState,
            to: command.targetState,
            reason: command.reason,
            ...(command.guardContext === undefined ? {} : { guard: command.guardContext }),
          },
          command.expectedState,
          operationId,
          metadata
        ),
        event(
          command,
          'fsm.state.exited',
          { stateId: command.expectedState },
          command.expectedState,
          operationId,
          metadata
        ),
        event(
          command,
          'fsm.transition.accepted',
          {
            commandId: command.commandId,
            from: command.expectedState,
            to: command.targetState,
            reason: command.reason,
            ...(transition.guard === undefined ? {} : { guard: transition.guard }),
            ...(command.variablesPatch === undefined
              ? {}
              : { variablesPatch: command.variablesPatch }),
          },
          command.targetState,
          operationId,
          metadata
        ),
        event(
          command,
          'fsm.state.entered',
          {
            commandId: command.commandId,
            stateId: command.targetState,
            fromState: command.expectedState,
            reason: command.reason,
          },
          command.targetState,
          operationId,
          { ...metadata, stateAttempt }
        ),
      ];
      if (process.terminalStates.includes(target.id)) {
        events.push(
          event(
            command,
            terminalEventType(target.kind),
            {
              commandId: command.commandId,
              commandHash,
              terminalState: target.id,
              reason: command.reason,
            },
            target.id,
            operationId,
            { ...metadata, stateAttempt }
          )
        );
      }

      const appended = await this.options.events.append({
        scope: streamScope(command.scope),
        events,
        expectedLastSequence: head.lastSequence,
        expectedRunRevision: head.runRevision,
        fencingToken: authorization.guard.fencingToken,
        idempotencyKey: `manual-fsm-transition:${command.idempotencyKey}`,
        transactionGroupId: operationId,
      });
      return {
        commandId: command.commandId,
        disposition: appended.reused ? 'reused' : 'applied',
        eventIds: appended.events.map((item) => item.id),
        runRevision: appended.runRevision,
        view: await this.inspect(command.scope, process),
      };
    } finally {
      await this.options.runLeases.release({
        scope: authorization.scope,
        guard: authorization.guard,
        releasedAt: timestamp(this.now(), 'Manual transition Lease release'),
      });
    }
  }

  private async appendRejected(
    command: ManualFSMTransitionCommand,
    projection: RuntimeOrchestrationProjection,
    authorization: RunLeaseAuthorization,
    head: { lastSequence: number; runRevision: number },
    commandHash: string,
    error: unknown
  ): Promise<void> {
    const reason = error instanceof Error ? error.message : String(error);
    const operationId = operationIdFor(command.commandId);
    const metadata = {
      commandHash,
      manualTransition: true,
      rejectionCode: error instanceof FrameworkError ? error.code : 'RUNTIME_TRANSITION_REJECTED',
    };
    await this.options.events.append({
      scope: streamScope(command.scope),
      events: [
        event(
          command,
          'fsm.transition.requested',
          {
            commandId: command.commandId,
            commandHash,
            from: projection.currentState!,
            to: command.targetState,
            reason: command.reason,
            ...(command.guardContext === undefined ? {} : { guard: command.guardContext }),
          },
          projection.currentState,
          operationId,
          metadata
        ),
        event(
          command,
          'fsm.transition.rejected',
          {
            commandId: command.commandId,
            commandHash,
            from: projection.currentState!,
            to: command.targetState,
            reason,
          },
          projection.currentState,
          operationId,
          metadata
        ),
      ],
      expectedLastSequence: head.lastSequence,
      expectedRunRevision: head.runRevision,
      fencingToken: authorization.guard.fencingToken,
      idempotencyKey: `manual-fsm-transition:${command.idempotencyKey}:rejected`,
      transactionGroupId: operationId,
    });
  }

  private async findPrior(
    process: FSMProcessSpec,
    command: ManualFSMTransitionCommand,
    commandHash: string
  ): Promise<ManualFSMTransitionResult | null> {
    const events = await this.options.events.read({ scope: streamScope(command.scope) });
    const related = events.filter((item) => item.operationId === operationIdFor(command.commandId));
    if (related.length === 0) return null;
    const priorHash = related[0]?.metadata?.commandHash;
    if (priorHash !== commandHash) {
      conflict(
        'RUNTIME_IDEMPOTENCY_CONFLICT',
        'Command id was reused with different input',
        command
      );
    }
    const rejected = related.find((item) => item.type === 'fsm.transition.rejected');
    if (rejected) {
      const payload = record(rejected.payload);
      conflict(
        typeof rejected.metadata?.rejectionCode === 'string'
          ? rejected.metadata.rejectionCode
          : 'RUNTIME_TRANSITION_REJECTED',
        typeof payload.reason === 'string' ? payload.reason : 'Manual transition was rejected',
        command
      );
    }
    if (!related.some((item) => item.type === 'fsm.transition.accepted')) return null;
    const view = await this.inspect(command.scope, process);
    return {
      commandId: command.commandId,
      disposition: 'reused',
      eventIds: related.map((item) => item.id),
      runRevision: view.runRevision,
      view,
    };
  }

  private acquireLease(command: ManualFSMTransitionCommand): Promise<FencedRunLease | null> {
    return this.options.runLeases.acquire({
      ...(command.scope.tenantId === undefined ? {} : { tenantId: command.scope.tenantId }),
      userId: command.scope.userId,
      runId: command.scope.runId,
      partitionKey: `runtime:${command.scope.runId}`,
      requestedLeaseId: this.nextId('manual-fsm-transition-lease'),
      ownerId: command.ownerId,
      ttlMs: command.leaseTtlMs,
      acquiredAt: command.requestedAt,
      idempotencyKey: `manual-fsm-transition-lease:${command.commandId}`,
    });
  }

  private project(scope: RuntimeScope): Promise<RuntimeOrchestrationProjection> {
    return this.options.projections
      .update(
        createRuntimeOrchestrationProjectionDefinition(scope.runId),
        this.options.projectionStore,
        streamScope(scope)
      )
      .then((result) => result.state);
  }
}

function validateCommand(input: ManualFSMTransitionCommand): ManualFSMTransitionCommand {
  const command = structuredClone(input);
  for (const [label, value] of [
    ['commandId', command.commandId],
    ['ownerId', command.ownerId],
    ['processId', command.processId],
    ['processVersion', command.processVersion],
    ['expectedState', command.expectedState],
    ['targetState', command.targetState],
    ['reason', command.reason],
    ['idempotencyKey', command.idempotencyKey],
  ] as const) {
    if (!value.trim()) invalid(`${label} must be non-empty`);
  }
  if (!Number.isInteger(command.expectedRunRevision) || command.expectedRunRevision < 0) {
    invalid('expectedRunRevision must be a non-negative integer');
  }
  if (!Number.isInteger(command.leaseTtlMs) || command.leaseTtlMs < 1) {
    invalid('leaseTtlMs must be a positive integer');
  }
  timestamp(command.requestedAt, 'requestedAt');
  if (command.scope.runId.trim() === '' || command.scope.userId.trim() === '') {
    invalid('Run scope must include non-empty runId and userId');
  }
  return command;
}

function authorize(command: ManualFSMTransitionCommand): void {
  if (command.principal.userId !== command.scope.userId) {
    conflict('RUNTIME_RUN_CONFLICT', 'Principal does not own the Run', command);
  }
  if (
    command.scope.tenantId !== undefined &&
    command.principal.tenantId !== undefined &&
    command.scope.tenantId !== command.principal.tenantId
  ) {
    conflict('RUNTIME_RUN_CONFLICT', 'Principal tenant does not match Run tenant', command);
  }
  const scopes = command.principal.permissionScopes;
  if (
    !scopes.includes(MANUAL_FSM_TRANSITION_PERMISSION) &&
    !scopes.includes('runtime.run.*') &&
    !scopes.includes('*')
  ) {
    conflict(
      'RUNTIME_RUN_CONFLICT',
      `Principal lacks ${MANUAL_FSM_TRANSITION_PERMISSION}`,
      command
    );
  }
}

function assertProcessIdentity(process: FSMProcessSpec, command: ManualFSMTransitionCommand): void {
  if (process.id !== command.processId || process.version !== command.processVersion) {
    conflict('RUNTIME_PROCESS_MISMATCH', 'FSM process identity changed', command, {
      actualProcessId: process.id,
      actualProcessVersion: process.version,
    });
  }
}

function requireTransitionableRun(
  projection: RuntimeOrchestrationProjection,
  command: ManualFSMTransitionCommand
): void {
  if (projection.runStatus === 'not_created') {
    conflict('RUNTIME_RUN_NOT_FOUND', 'Run Event stream has not been created', command);
  }
  if (['completed', 'failed', 'cancelled', 'timed_out'].includes(projection.runStatus)) {
    conflict('RUNTIME_RUN_CONFLICT', 'Terminal Run cannot transition', command, {
      runStatus: projection.runStatus,
    });
  }
  if (!projection.currentState || projection.stateAttempt < 1) {
    conflict('RUNTIME_RUN_CONFLICT', 'Run has no current FSM State attempt', command);
  }
  if (projection.pendingTransition) {
    conflict('RUNTIME_RUN_CONFLICT', 'Run has an incomplete FSM transition', command);
  }
}

function snapshotFor(
  process: FSMProcessSpec,
  projection: RuntimeOrchestrationProjection,
  updatedAt: string
): FSMSnapshot {
  return {
    processId: process.id,
    runId: projection.runId,
    currentState: projection.currentState!,
    statePath: [...projection.statePath],
    status: 'running',
    updatedAt,
  };
}

function viewFor(
  process: FSMProcessSpec,
  projection: RuntimeOrchestrationProjection,
  runRevision: number
): ManualFSMRunView {
  return {
    runId: projection.runId,
    processId: process.id,
    processVersion: process.version,
    runRevision,
    runStatus: projection.runStatus,
    currentState: projection.currentState,
    statePath: [...projection.statePath],
    stateAttempt: projection.stateAttempt,
    terminalStates: [...process.terminalStates],
    allowedTransitions: projection.currentState
      ? getAllowedTransitions(process, projection.currentState).map((transition) => ({
          to: transition.to,
          ...(transition.guard === undefined ? {} : { guard: transition.guard }),
          ...(transition.description === undefined ? {} : { description: transition.description }),
        }))
      : [],
  };
}

function event(
  command: ManualFSMTransitionCommand,
  type: EventCreateInput['type'],
  payload: Record<string, unknown>,
  fsmState: string | undefined,
  operationId: string,
  metadata: Record<string, unknown>
): EventCreateInput {
  return {
    id: `${operationId}:${type}`,
    type,
    version: '1.0.0',
    ...(command.scope.tenantId === undefined ? {} : { tenantId: command.scope.tenantId }),
    userId: command.scope.userId,
    ...(command.scope.workspaceId === undefined ? {} : { workspaceId: command.scope.workspaceId }),
    sessionId: command.scope.sessionId,
    runId: command.scope.runId,
    ...(command.scope.agentId === undefined ? {} : { agentId: command.scope.agentId }),
    ...(fsmState === undefined ? {} : { fsmState }),
    correlationId: command.scope.runId,
    operationId,
    idempotencyKey: `${command.idempotencyKey}:${type}`,
    timestamp: command.requestedAt,
    payload,
    metadata,
  };
}

function terminalEventType(
  kind: string | undefined
): 'run.completed' | 'run.failed' | 'run.cancelled' {
  if (kind === 'failed') return 'run.failed';
  if (kind === 'cancelled') return 'run.cancelled';
  return 'run.completed';
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

function logicalCommandHash(command: ManualFSMTransitionCommand): string {
  const { ownerId, leaseTtlMs, requestedAt, ...logical } = command;
  void ownerId;
  void leaseTtlMs;
  void requestedAt;
  return hashCanonicalJson(logical);
}

function operationIdFor(commandId: string): string {
  return `manual-fsm-transition:${commandId}`;
}

function record(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function timestamp(value: string, label: string): string {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid date-time`);
  return value;
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(
  code: string,
  message: string,
  command: ManualFSMTransitionCommand,
  context: Record<string, unknown> = {}
): never {
  throw new FrameworkError({
    code,
    message,
    context: { commandId: command.commandId, runId: command.scope.runId, ...context },
  });
}
