import {
  FrameworkError,
  createRuntimeOrchestrationProjectionDefinition,
  validateRuntimeStateExecutionResult,
  validateRuntimeTransitionProposal,
  type EventCreateInput,
  type EventRuntime,
  type FencedRunLease,
  type NormalizedRuntimeError,
  type ProjectionEngine,
  type ProjectionStore,
  type RunLeaseAuthorization,
  type RunLeaseStore,
  type RuntimeOrchestrationProjection,
  type RuntimeScope,
  type RuntimeStateExecutionResult,
  type RuntimeTransitionProposal,
  type RuntimeWaitIntent,
  type StateExecutionClaim,
  type StateExecutionClaimStore,
} from '@hypha/core';
import {
  evaluateGuardExpression,
  validateFSMProcessSpec,
  type FSMGuardContext,
  type FSMProcessSpec,
  type FSMStateSpec,
  type FSMTransitionSpec,
} from '@hypha/fsm';

export type BoundedFSMDriverDisposition =
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'waiting'
  | 'budget_exhausted'
  | 'lease_unavailable'
  | 'state_claim_unavailable';

export interface BoundedStateExecutionDecision {
  result: RuntimeStateExecutionResult;
  transition?: RuntimeTransitionProposal;
  guardContext?: FSMGuardContext;
}

export interface BoundedStateExecutorInput {
  scope: Readonly<RuntimeScope>;
  process: Readonly<FSMProcessSpec>;
  state: Readonly<FSMStateSpec>;
  projection: Readonly<RuntimeOrchestrationProjection>;
  runLease: Readonly<FencedRunLease>;
  stateClaim: Readonly<StateExecutionClaim>;
  abortSignal: AbortSignal;
}

export interface BoundedFSMDriverRunInput {
  scope: RuntimeScope;
  process: FSMProcessSpec;
  ownerId: string;
  maxSteps: number;
  leaseTtlMs: number;
  stateClaimTtlMs: number;
  abortSignal?: AbortSignal;
}

export interface BoundedFSMDriverResult {
  disposition: BoundedFSMDriverDisposition;
  steps: number;
  projection: RuntimeOrchestrationProjection;
  wait?: RuntimeWaitIntent;
}

export interface FencedBoundedFSMDriverOptions {
  events: EventRuntime;
  projections: ProjectionEngine;
  projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
  runLeases: RunLeaseStore;
  stateClaims: StateExecutionClaimStore;
  executeState(input: BoundedStateExecutorInput): Promise<BoundedStateExecutionDecision>;
  evaluateGuard?: (
    transition: Readonly<FSMTransitionSpec>,
    context: Readonly<FSMGuardContext>
  ) => Promise<boolean> | boolean;
  now?: () => string;
  nextId?: (namespace: string) => string;
}

export class FencedBoundedFSMDriver {
  private readonly now: () => string;
  private readonly nextId: (namespace: string) => string;

  constructor(private readonly options: FencedBoundedFSMDriverOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
    let sequence = 0;
    this.nextId = options.nextId ?? ((namespace) => `${namespace}.${++sequence}`);
  }

  async run(input: BoundedFSMDriverRunInput): Promise<BoundedFSMDriverResult> {
    validateRunInput(input);
    validateFSMProcessSpec(input.process);
    const abortSignal = input.abortSignal ?? new AbortController().signal;
    const lease = await this.acquireRunLease(input);
    if (!lease) {
      return {
        disposition: 'lease_unavailable',
        steps: 0,
        projection: await this.project(input),
      };
    }
    let authorization = authorizationFor(lease);
    let steps = 0;
    try {
      let projection = await this.project(input);
      if (projection.runStatus === 'not_created') {
        throw new FrameworkError({
          code: 'RUNTIME_RUN_NOT_FOUND',
          message: `Run Event stream has not been created: ${input.scope.runId}`,
        });
      }
      if (projection.runStatus === 'created') {
        await this.appendLifecycle(
          input.scope,
          authorization,
          [this.event(input.scope, 'run.started', { runId: input.scope.runId }, undefined, 0)],
          'run-start'
        );
        projection = await this.project(input);
      }
      if (isWaiting(projection.runStatus)) {
        return { disposition: 'waiting', steps, projection };
      }
      if (isTerminal(projection.runStatus)) {
        return { disposition: terminalDisposition(projection.runStatus), steps, projection };
      }
      if (!projection.currentState) {
        await this.appendLifecycle(
          input.scope,
          authorization,
          [
            this.event(
              input.scope,
              'fsm.state.entered',
              { stateId: input.process.initialState, reason: 'initial' },
              input.process.initialState,
              1
            ),
          ],
          `state-enter:${input.process.initialState}:1`
        );
        projection = await this.project(input);
      }

      while (steps < input.maxSteps) {
        if (abortSignal.aborted) {
          projection = await this.cancel(input, projection, authorization);
          return { disposition: 'cancelled', steps, projection };
        }
        if (isWaiting(projection.runStatus)) {
          return { disposition: 'waiting', steps, projection };
        }
        if (isTerminal(projection.runStatus)) {
          return { disposition: terminalDisposition(projection.runStatus), steps, projection };
        }
        const state = requireState(input.process, projection.currentState);
        if (input.process.terminalStates.includes(state.id)) {
          projection = await this.finalizeTerminal(input, projection, state, authorization);
          return { disposition: terminalDisposition(projection.runStatus), steps, projection };
        }

        const heartbeatAt = this.timestamp('Run Lease heartbeat');
        const heartbeated = await this.options.runLeases.heartbeat({
          scope: authorization.scope,
          guard: authorization.guard,
          ttlMs: input.leaseTtlMs,
          heartbeatAt,
        });
        authorization = authorizationFor(heartbeated);
        const claim = await this.acquireStateClaim(input, projection, authorization);
        if (!claim) {
          return { disposition: 'state_claim_unavailable', steps, projection };
        }
        steps += 1;

        let decision: BoundedStateExecutionDecision;
        try {
          decision = await this.options.executeState({
            scope: immutable(input.scope),
            process: immutable(input.process),
            state: immutable(state),
            projection: immutable(projection),
            runLease: immutable(heartbeated),
            stateClaim: immutable(claim),
            abortSignal,
          });
        } catch (error) {
          await this.releaseStateClaim(input, claim, authorization);
          throw error;
        }

        const result = validateRuntimeStateExecutionResult(decision.result);
        if (result.kind === 'waiting') {
          projection = await this.commitWait(input, projection, result.wait, authorization);
          await this.completeStateClaim(input, claim, authorization);
          return { disposition: 'waiting', steps, projection, wait: result.wait };
        }
        if (result.kind === 'failed') {
          projection = await this.commitFailure(input, projection, result.error, authorization);
          await this.completeStateClaim(input, claim, authorization);
          return { disposition: 'failed', steps, projection };
        }
        if (result.kind === 'continued') {
          await this.appendLifecycle(
            input.scope,
            authorization,
            [
              this.event(
                input.scope,
                'fsm.state.entered',
                {
                  stateId: state.id,
                  reason: 'continued',
                  ...(result.observation === undefined ? {} : { observation: result.observation }),
                },
                state.id,
                projection.stateAttempt + 1
              ),
            ],
            `state-continue:${state.id}:${projection.stateAttempt}`
          );
          await this.completeStateClaim(input, claim, authorization);
          projection = await this.project(input);
          continue;
        }

        const transition = await this.resolveTransition(input.process, projection, decision);
        projection = await this.commitTransition(
          input,
          projection,
          transition,
          result,
          authorization
        );
        await this.completeStateClaim(input, claim, authorization);
        if (isTerminal(projection.runStatus)) {
          return { disposition: terminalDisposition(projection.runStatus), steps, projection };
        }
      }
      return { disposition: 'budget_exhausted', steps, projection };
    } finally {
      await this.options.runLeases.release({
        scope: authorization.scope,
        guard: authorization.guard,
        releasedAt: this.timestamp('Run Lease release'),
      });
    }
  }

  private async acquireRunLease(input: BoundedFSMDriverRunInput): Promise<FencedRunLease | null> {
    const acquiredAt = this.timestamp('Run Lease acquisition');
    const requestedLeaseId = this.nextId('run-lease');
    return this.options.runLeases.acquire({
      ...(input.scope.tenantId === undefined ? {} : { tenantId: input.scope.tenantId }),
      userId: input.scope.userId,
      runId: input.scope.runId,
      partitionKey: `runtime:${input.scope.runId}`,
      requestedLeaseId,
      ownerId: input.ownerId,
      ttlMs: input.leaseTtlMs,
      acquiredAt,
      idempotencyKey: `driver-lease:${input.ownerId}:${requestedLeaseId}`,
    });
  }

  private async acquireStateClaim(
    input: BoundedFSMDriverRunInput,
    projection: RuntimeOrchestrationProjection,
    runLease: RunLeaseAuthorization
  ): Promise<StateExecutionClaim | null> {
    const stateId = projection.currentState;
    if (!stateId || projection.stateAttempt < 1) invalid('Current FSM state attempt is missing');
    const head = await this.options.events.getStreamHead(streamScope(input.scope));
    if (!head) invalid('State execution requires an Event stream head');
    const requestedClaimId = this.nextId('state-claim');
    return this.options.stateClaims.acquire({
      ...(input.scope.tenantId === undefined ? {} : { tenantId: input.scope.tenantId }),
      userId: input.scope.userId,
      runId: input.scope.runId,
      stateId,
      stateAttempt: projection.stateAttempt,
      requestedClaimId,
      processRevision: `${input.process.id}@${input.process.version}`,
      expectedRunRevision: head.runRevision,
      runLease,
      ttlMs: input.stateClaimTtlMs,
      acquiredAt: this.timestamp('State Claim acquisition'),
      idempotencyKey: `state-claim:${stateId}:${projection.stateAttempt}:${runLease.guard.fencingToken}`,
    });
  }

  private async completeStateClaim(
    input: BoundedFSMDriverRunInput,
    claim: StateExecutionClaim,
    runLease: RunLeaseAuthorization
  ): Promise<void> {
    await this.options.stateClaims.complete({
      scope: claimScope(input.scope, claim),
      guard: claimGuard(claim),
      runLease,
      completedAt: this.timestamp('State Claim completion'),
    });
  }

  private async releaseStateClaim(
    input: BoundedFSMDriverRunInput,
    claim: StateExecutionClaim,
    runLease: RunLeaseAuthorization
  ): Promise<void> {
    await this.options.stateClaims.release({
      scope: claimScope(input.scope, claim),
      guard: claimGuard(claim),
      runLease,
      releasedAt: this.timestamp('State Claim release'),
    });
  }

  private async resolveTransition(
    process: FSMProcessSpec,
    projection: RuntimeOrchestrationProjection,
    decision: BoundedStateExecutionDecision
  ): Promise<FSMTransitionSpec> {
    if (!decision.transition) {
      throw new FrameworkError({
        code: 'RUNTIME_TRANSITION_REJECTED',
        message: `Completed non-terminal State requires a transition: ${projection.currentState}`,
      });
    }
    const proposal = validateRuntimeTransitionProposal(decision.transition);
    const transition = process.transitions.find(
      (candidate) => candidate.from === projection.currentState && candidate.to === proposal.to
    );
    if (!transition) {
      throw new FrameworkError({
        code: 'RUNTIME_TRANSITION_REJECTED',
        message: `FSM transition is not declared: ${projection.currentState} -> ${proposal.to}`,
      });
    }
    if (transition.guard) {
      const context = decision.guardContext ?? {
        variables: proposal.variablesPatch,
      };
      const allowed = this.options.evaluateGuard
        ? await this.options.evaluateGuard(transition, context)
        : evaluateGuardExpression(transition.guard, context);
      if (!allowed) {
        throw new FrameworkError({
          code: 'RUNTIME_GUARD_FAILED',
          message: `FSM transition guard rejected: ${transition.guard}`,
        });
      }
    }
    return transition;
  }

  private async commitTransition(
    input: BoundedFSMDriverRunInput,
    projection: RuntimeOrchestrationProjection,
    transition: FSMTransitionSpec,
    result: Extract<RuntimeStateExecutionResult, { kind: 'completed' }>,
    runLease: RunLeaseAuthorization
  ): Promise<RuntimeOrchestrationProjection> {
    const target = requireState(input.process, transition.to);
    const targetAttempt = (projection.stateVisitCounts[target.id] ?? 0) + 1;
    const timestamp = this.timestamp('FSM transition');
    const events: EventCreateInput[] = [
      this.event(
        input.scope,
        'fsm.state.exited',
        { stateId: transition.from },
        transition.from,
        projection.stateAttempt,
        timestamp
      ),
      this.event(
        input.scope,
        'fsm.transition.accepted',
        {
          from: transition.from,
          to: transition.to,
          ...(transition.guard === undefined ? {} : { guard: transition.guard }),
          ...(result.variablesPatch === undefined ? {} : { variablesPatch: result.variablesPatch }),
        },
        transition.to,
        projection.stateAttempt,
        timestamp
      ),
      this.event(
        input.scope,
        'fsm.state.entered',
        { stateId: transition.to, fromState: transition.from },
        transition.to,
        targetAttempt,
        timestamp
      ),
    ];
    if (input.process.terminalStates.includes(target.id)) {
      events.push(
        this.terminalEvent(input.scope, target, targetAttempt, result.output, undefined, timestamp)
      );
    }
    await this.appendLifecycle(
      input.scope,
      runLease,
      events,
      `transition:${transition.from}:${transition.to}:${projection.stateAttempt}`
    );
    return this.project(input);
  }

  private async commitWait(
    input: BoundedFSMDriverRunInput,
    projection: RuntimeOrchestrationProjection,
    wait: RuntimeWaitIntent,
    runLease: RunLeaseAuthorization
  ): Promise<RuntimeOrchestrationProjection> {
    const type = waitEventType(wait);
    await this.appendLifecycle(
      input.scope,
      runLease,
      [
        this.event(
          input.scope,
          type,
          { stateId: projection.currentState, wait },
          projection.currentState,
          projection.stateAttempt
        ),
      ],
      `wait:${wait.type}:${projection.currentState}:${projection.stateAttempt}`
    );
    return this.project(input);
  }

  private async commitFailure(
    input: BoundedFSMDriverRunInput,
    projection: RuntimeOrchestrationProjection,
    error: NormalizedRuntimeError,
    runLease: RunLeaseAuthorization
  ): Promise<RuntimeOrchestrationProjection> {
    const current = requireState(input.process, projection.currentState);
    const failed = findTerminalState(input.process, 'failed');
    const transition = failed
      ? input.process.transitions.find(
          (candidate) => candidate.from === current.id && candidate.to === failed.id
        )
      : undefined;
    const timestamp = this.timestamp('FSM failure');
    const events: EventCreateInput[] = [];
    const failedAttempt =
      failed && transition
        ? (projection.stateVisitCounts[failed.id] ?? 0) + 1
        : projection.stateAttempt;
    if (failed && transition) {
      events.push(
        this.event(
          input.scope,
          'fsm.state.exited',
          { stateId: current.id },
          current.id,
          projection.stateAttempt,
          timestamp
        ),
        this.event(
          input.scope,
          'fsm.transition.accepted',
          { from: current.id, to: failed.id, reason: 'state_failed' },
          failed.id,
          projection.stateAttempt,
          timestamp
        ),
        this.event(
          input.scope,
          'fsm.state.entered',
          { stateId: failed.id, fromState: current.id },
          failed.id,
          failedAttempt,
          timestamp
        )
      );
    }
    const terminalState = failed?.id ?? current.id;
    events.push(
      this.event(
        input.scope,
        'run.failed',
        { terminalState, error },
        terminalState,
        failedAttempt,
        timestamp
      )
    );
    await this.appendLifecycle(
      input.scope,
      runLease,
      events,
      `run-failed:${current.id}:${projection.stateAttempt}`
    );
    return this.project(input);
  }

  private async cancel(
    input: BoundedFSMDriverRunInput,
    projection: RuntimeOrchestrationProjection,
    runLease: RunLeaseAuthorization
  ): Promise<RuntimeOrchestrationProjection> {
    const state = requireState(input.process, projection.currentState);
    const timestamp = this.timestamp('Run cancellation');
    await this.appendLifecycle(
      input.scope,
      runLease,
      [
        this.event(
          input.scope,
          'run.cancelled',
          { terminalState: state.id, reason: 'abort_signal' },
          state.id,
          projection.stateAttempt,
          timestamp
        ),
      ],
      `run-cancelled:${state.id}:${projection.stateAttempt}`
    );
    return this.project(input);
  }

  private async finalizeTerminal(
    input: BoundedFSMDriverRunInput,
    projection: RuntimeOrchestrationProjection,
    state: FSMStateSpec,
    runLease: RunLeaseAuthorization
  ): Promise<RuntimeOrchestrationProjection> {
    await this.appendLifecycle(
      input.scope,
      runLease,
      [this.terminalEvent(input.scope, state, projection.stateAttempt)],
      `run-terminal:${state.id}:${projection.stateAttempt}`
    );
    return this.project(input);
  }

  private terminalEvent(
    scope: RuntimeScope,
    state: FSMStateSpec,
    stateAttempt: number,
    output?: unknown,
    error?: NormalizedRuntimeError,
    timestamp = this.timestamp('Run terminal Event')
  ): EventCreateInput {
    const type =
      state.kind === 'failed'
        ? 'run.failed'
        : state.kind === 'cancelled'
          ? 'run.cancelled'
          : 'run.completed';
    return this.event(
      scope,
      type,
      {
        terminalState: state.id,
        ...(output === undefined ? {} : { output }),
        ...(error === undefined ? {} : { error }),
      },
      state.id,
      stateAttempt,
      timestamp
    );
  }

  private async appendLifecycle(
    scope: RuntimeScope,
    runLease: RunLeaseAuthorization,
    events: EventCreateInput[],
    operation: string
  ): Promise<void> {
    const stream = streamScope(scope);
    const head = await this.options.events.getStreamHead(stream);
    await this.options.events.append({
      scope: stream,
      events,
      expectedLastSequence: head?.lastSequence ?? 0,
      ...(head === null ? {} : { expectedRunRevision: head.runRevision }),
      fencingToken: runLease.guard.fencingToken,
      idempotencyKey: `driver:${scope.runId}:${operation}:${runLease.guard.fencingToken}`,
      transactionGroupId: operation,
    });
  }

  private event(
    scope: RuntimeScope,
    type: EventCreateInput['type'],
    payload: Record<string, unknown>,
    fsmState?: string,
    stateAttempt?: number,
    timestamp = this.timestamp('Runtime Event')
  ): EventCreateInput {
    const id = this.nextId('event');
    return {
      id,
      type,
      version: '1.0.0',
      ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
      userId: scope.userId,
      ...(scope.workspaceId === undefined ? {} : { workspaceId: scope.workspaceId }),
      sessionId: scope.sessionId,
      runId: scope.runId,
      ...(scope.agentId === undefined ? {} : { agentId: scope.agentId }),
      ...(fsmState === undefined ? {} : { fsmState }),
      correlationId: scope.runId,
      operationId: id,
      idempotencyKey: id,
      timestamp,
      payload,
      metadata: {
        ...(stateAttempt === undefined ? {} : { stateAttempt }),
      },
    };
  }

  private project(input: BoundedFSMDriverRunInput): Promise<RuntimeOrchestrationProjection> {
    return this.options.projections
      .update(
        createRuntimeOrchestrationProjectionDefinition(input.scope.runId),
        this.options.projectionStore,
        streamScope(input.scope)
      )
      .then((record) => record.state);
  }

  private timestamp(label: string): string {
    const value = this.now();
    if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid date-time`);
    return value;
  }
}

function validateRunInput(input: BoundedFSMDriverRunInput): void {
  required(input.scope.userId, 'scope.userId');
  required(input.scope.sessionId, 'scope.sessionId');
  required(input.scope.runId, 'scope.runId');
  required(input.ownerId, 'ownerId');
  positive(input.maxSteps, 'maxSteps');
  positive(input.leaseTtlMs, 'leaseTtlMs');
  positive(input.stateClaimTtlMs, 'stateClaimTtlMs');
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

function streamScope(scope: RuntimeScope) {
  return {
    ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
    userId: scope.userId,
    runId: scope.runId,
  };
}

function claimScope(scope: RuntimeScope, claim: StateExecutionClaim) {
  return {
    ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
    userId: scope.userId,
    runId: scope.runId,
    stateId: claim.stateId,
    stateAttempt: claim.stateAttempt,
  };
}

function claimGuard(claim: StateExecutionClaim) {
  return {
    claimId: claim.claimId,
    ownerId: claim.ownerId,
    fencingToken: claim.fencingToken,
  };
}

function requireState(process: FSMProcessSpec, stateId?: string): FSMStateSpec {
  const state = process.states.find((candidate) => candidate.id === stateId);
  if (!state) {
    throw new FrameworkError({
      code: 'RUNTIME_STATE_NOT_FOUND',
      message: `FSM state is not declared: ${stateId ?? '<missing>'}`,
    });
  }
  return state;
}

function findTerminalState(
  process: FSMProcessSpec,
  kind: 'failed' | 'cancelled'
): FSMStateSpec | undefined {
  return process.states.find(
    (state) => process.terminalStates.includes(state.id) && state.kind === kind
  );
}

function waitEventType(wait: RuntimeWaitIntent): EventCreateInput['type'] {
  if (wait.type === 'human') return 'run.waiting_human';
  if (wait.type === 'signal') return 'run.waiting_signal';
  if (wait.type === 'timer') return 'run.waiting_timer';
  return 'run.paused';
}

function isWaiting(status: RuntimeOrchestrationProjection['runStatus']): boolean {
  return ['waiting', 'waiting_human', 'waiting_signal', 'waiting_timer', 'paused'].includes(status);
}

function isTerminal(status: RuntimeOrchestrationProjection['runStatus']): boolean {
  return ['completed', 'failed', 'cancelled', 'timed_out'].includes(status);
}

function terminalDisposition(
  status: RuntimeOrchestrationProjection['runStatus']
): 'completed' | 'failed' | 'cancelled' {
  if (status === 'completed') return 'completed';
  if (status === 'cancelled') return 'cancelled';
  return 'failed';
}

function immutable<T>(value: T): T {
  return deepFreeze(structuredClone(value));
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}

function required(value: string, label: string): void {
  if (!value.trim()) invalid(`${label} is required`);
}

function positive(value: number, label: string): void {
  if (!Number.isInteger(value) || value < 1) invalid(`${label} must be positive`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
