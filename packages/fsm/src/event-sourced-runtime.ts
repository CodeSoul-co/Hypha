import {
  FrameworkError,
  type DurableEventRuntime,
  type EventAppendResult,
  type EventCreateInput,
  type EventStreamScope,
  type FrameworkEventType,
  type PersistedFrameworkEvent,
} from '@hypha/core';
import {
  applyTransition,
  validateFSMProcessSpec,
  type FSMGuardContext,
  type FSMGuardEvaluator,
  type FSMProcessSpec,
  type FSMSnapshot,
} from './index';

export interface EventSourcedFSMSnapshot extends FSMSnapshot {
  currentStateAttemptId?: string;
  currentAttempt?: number;
  stateVisitCounts: Record<string, number>;
  variables: Record<string, unknown>;
  lastEventSequence: number;
}

interface EventSourcedCommandBase {
  scope: EventStreamScope;
  expectedLastSequence: number;
  expectedRunRevision?: number;
  fencingToken: number;
  idempotencyKey: string;
  operationId: string;
  correlationId?: string;
}

export interface InitializeEventSourcedFSMCommand extends EventSourcedCommandBase {
  stateAttemptId: string;
  claimId: string;
  variables?: Record<string, unknown>;
}

export interface CompletedStateExecutionResult {
  status: 'completed';
  output?: unknown;
  outputHash?: string;
  variablesPatch?: Record<string, unknown>;
  artifactRefs?: string[];
  evidenceRefs?: string[];
  metadata?: Record<string, unknown>;
}

export interface CommitEventSourcedFSMCommand extends EventSourcedCommandBase {
  stateId: string;
  stateAttemptId: string;
  attempt: number;
  toState: string;
  result: CompletedStateExecutionResult;
  nextStateAttemptId?: string;
  guardContext?: Omit<FSMGuardContext, 'variables'>;
}

export interface EventSourcedFSMCommitResult {
  append: EventAppendResult;
  snapshot: EventSourcedFSMSnapshot;
}

export interface EventSourcedFSMRuntimeOptions {
  events: DurableEventRuntime;
  now?: () => string;
  guardEvaluator?: FSMGuardEvaluator;
  validateVariablesPatch?: (
    variables: Readonly<Record<string, unknown>>,
    patch: Readonly<Record<string, unknown>>
  ) => Promise<void> | void;
  validateInvariants?: (
    snapshot: Readonly<EventSourcedFSMSnapshot>,
    nextState: string,
    variables: Readonly<Record<string, unknown>>
  ) => Promise<boolean | void> | boolean | void;
}

/**
 * FSM command handler whose only durable authority is the append-only event stream.
 * It never keeps a mutable in-memory snapshot between commands.
 */
export class EventSourcedFSMRuntime {
  private readonly events: DurableEventRuntime;
  private readonly now: () => string;
  private readonly guardEvaluator?: FSMGuardEvaluator;
  private readonly validateVariablesPatch?: EventSourcedFSMRuntimeOptions['validateVariablesPatch'];
  private readonly validateInvariants?: EventSourcedFSMRuntimeOptions['validateInvariants'];

  constructor(
    private readonly spec: FSMProcessSpec,
    options: EventSourcedFSMRuntimeOptions
  ) {
    validateFSMProcessSpec(spec);
    this.events = options.events;
    this.now = options.now ?? (() => new Date().toISOString());
    this.guardEvaluator = options.guardEvaluator;
    this.validateVariablesPatch = options.validateVariablesPatch;
    this.validateInvariants = options.validateInvariants;
  }

  async initialize(
    command: InitializeEventSourcedFSMCommand
  ): Promise<EventSourcedFSMCommitResult> {
    assertCommandBase(command);
    if (command.expectedLastSequence !== 0) {
      throw fsmRuntimeError(
        'RUNTIME_EVENT_APPEND_FAILED',
        'FSM initialization requires an empty event stream.',
        { expectedLastSequence: command.expectedLastSequence }
      );
    }
    assertNonEmpty(command.stateAttemptId, 'stateAttemptId');
    assertNonEmpty(command.claimId, 'claimId');
    const variables = cloneRecord(command.variables ?? {});
    assertVariablesPatch(variables);
    const timestamp = this.now();
    assertTimestamp(timestamp);
    const initialState = this.spec.initialState;
    const common = eventFactory(command, timestamp);
    const batch: EventCreateInput[] = [
      common('fsm.initializing', 1, {
        processId: this.spec.id,
        initialState,
        variables,
      }),
      common('fsm.state.scheduled', 2, {
        processId: this.spec.id,
        stateId: initialState,
        stateAttemptId: command.stateAttemptId,
        attempt: 1,
      }),
      common('fsm.state.claimed', 3, {
        processId: this.spec.id,
        stateId: initialState,
        stateAttemptId: command.stateAttemptId,
        attempt: 1,
        claimId: command.claimId,
        fencingToken: command.fencingToken,
      }),
      common('fsm.state.entered', 4, {
        processId: this.spec.id,
        stateId: initialState,
        stateAttemptId: command.stateAttemptId,
        attempt: 1,
      }),
      common('fsm.ready', 5, {
        processId: this.spec.id,
        stateId: initialState,
      }),
    ];
    const append = await this.events.append(appendRequest(command, batch));
    return { append, snapshot: await this.getSnapshot(command.scope) };
  }

  async getSnapshot(scope: EventStreamScope): Promise<EventSourcedFSMSnapshot> {
    return projectEventSourcedFSM(this.spec, await this.events.read({ scope }));
  }

  async commitState(command: CommitEventSourcedFSMCommand): Promise<EventSourcedFSMCommitResult> {
    assertCommandBase(command);
    assertNonEmpty(command.stateId, 'stateId');
    assertNonEmpty(command.stateAttemptId, 'stateAttemptId');
    assertNonEmpty(command.toState, 'toState');
    assertPositiveInteger(command.attempt, 'attempt');

    const streamEvents = await this.events.read({ scope: command.scope });
    const priorOperation = streamEvents.filter(
      (event) =>
        event.operationId === command.operationId && event.idempotencyKey === command.idempotencyKey
    );
    if (priorOperation.length > 0) {
      const append = await this.events.append(
        appendRequest(command, priorOperation.map(toEventCreateInput))
      );
      return { append, snapshot: projectEventSourcedFSM(this.spec, streamEvents) };
    }

    const current = projectEventSourcedFSM(this.spec, streamEvents);
    assertCurrentAttempt(current, command);
    if (current.lastEventSequence !== command.expectedLastSequence) {
      throw fsmRuntimeError('RUNTIME_EVENT_APPEND_FAILED', 'Expected sequence conflict.', {
        expectedLastSequence: command.expectedLastSequence,
        actualLastSequence: current.lastEventSequence,
      });
    }

    const timestamp = this.now();
    assertTimestamp(timestamp);
    const patch = cloneRecord(command.result.variablesPatch ?? {});
    assertVariablesPatch(patch);
    const variables = { ...cloneRecord(current.variables), ...patch };
    const transitionId = `${current.currentState}->${command.toState}`;

    let next: FSMSnapshot;
    try {
      await this.validateVariablesPatch?.(structuredClone(variables), structuredClone(patch));
      next = applyTransition(this.spec, current, command.toState, {
        now: timestamp,
        guardContext: {
          ...cloneRecord(command.guardContext ?? {}),
          variables: structuredClone(variables),
        },
        ...(this.guardEvaluator === undefined ? {} : { guardEvaluator: this.guardEvaluator }),
      });
      let invariantResult: boolean | void;
      try {
        invariantResult = await this.validateInvariants?.(
          structuredClone(current),
          command.toState,
          structuredClone(variables)
        );
      } catch (error) {
        if (error instanceof FrameworkError && error.code === 'RUNTIME_INVARIANT_FAILED') {
          throw error;
        }
        throw fsmRuntimeError('RUNTIME_INVARIANT_FAILED', 'FSM invariant evaluation failed.', {
          transitionId,
          cause: error instanceof Error ? error.message : String(error),
        });
      }
      if (invariantResult === false) {
        throw fsmRuntimeError('RUNTIME_INVARIANT_FAILED', 'FSM invariant rejected transition.', {
          transitionId,
        });
      }
    } catch (error) {
      if (!isRecordableRejection(error)) throw error;
      await this.appendRejectedTransition(command, current, transitionId, timestamp, error);
      throw error;
    }

    const isTerminal = next.status !== 'running';
    if (!isTerminal) assertNonEmpty(command.nextStateAttemptId, 'nextStateAttemptId');
    const common = eventFactory(command, timestamp);
    const batch: EventCreateInput[] = [
      common('fsm.state.verification.started', 1, stateAttemptPayload(command)),
      common('fsm.state.verification.completed', 2, {
        ...stateAttemptPayload(command),
        status: 'accepted',
      }),
      common('fsm.transition.requested', 3, transitionPayload(command, transitionId, this.spec.id)),
      common('fsm.transition.accepted', 4, transitionPayload(command, transitionId, this.spec.id)),
      common('fsm.state.exited', 5, stateAttemptPayload(command)),
      common('fsm.state.completed', 6, {
        ...stateAttemptPayload(command),
        ...(command.result.outputHash === undefined
          ? {}
          : { outputHash: command.result.outputHash }),
        ...(command.result.output === undefined ? {} : { output: command.result.output }),
        ...(command.result.artifactRefs === undefined
          ? {}
          : { artifactRefs: [...command.result.artifactRefs] }),
        ...(command.result.evidenceRefs === undefined
          ? {}
          : { evidenceRefs: [...command.result.evidenceRefs] }),
      }),
      ...(Object.keys(patch).length === 0
        ? []
        : [
            common('variables.patched', 7, {
              processId: this.spec.id,
              stateId: command.stateId,
              stateAttemptId: command.stateAttemptId,
              patch,
            }),
          ]),
      common('fsm.transition.committed', 8, {
        ...transitionPayload(command, transitionId, this.spec.id),
        status: next.status,
      }),
    ];

    if (isTerminal) {
      batch.push(
        common(terminalRunEvent(next.status), 9, {
          processId: this.spec.id,
          terminalState: command.toState,
          status: next.status,
        })
      );
    } else {
      batch.push(
        common('fsm.state.scheduled', 9, {
          processId: this.spec.id,
          stateId: command.toState,
          stateAttemptId: command.nextStateAttemptId,
          attempt: nextVisitAttempt(current, command.toState),
        }),
        common('fsm.state.entered', 10, {
          processId: this.spec.id,
          stateId: command.toState,
          stateAttemptId: command.nextStateAttemptId,
          attempt: nextVisitAttempt(current, command.toState),
        })
      );
    }

    const append = await this.events.append(appendRequest(command, batch));
    return { append, snapshot: await this.getSnapshot(command.scope) };
  }

  private async appendRejectedTransition(
    command: CommitEventSourcedFSMCommand,
    current: EventSourcedFSMSnapshot,
    transitionId: string,
    timestamp: string,
    error: unknown
  ): Promise<void> {
    const common = eventFactory(command, timestamp, 'rejected');
    const reason = normalizeRejection(error);
    await this.events.append(
      appendRequest({ ...command, idempotencyKey: `${command.idempotencyKey}:rejected` }, [
        common(
          'fsm.transition.requested',
          1,
          transitionPayload(command, transitionId, this.spec.id)
        ),
        common('fsm.transition.rejected', 2, {
          ...transitionPayload(command, transitionId, this.spec.id),
          reason,
          currentState: current.currentState,
        }),
      ])
    );
  }
}

export function projectEventSourcedFSM(
  spec: FSMProcessSpec,
  events: readonly PersistedFrameworkEvent[]
): EventSourcedFSMSnapshot {
  validateFSMProcessSpec(spec);
  let snapshot: EventSourcedFSMSnapshot | undefined;
  for (const event of events) {
    const payload = eventPayload(event);
    if (event.type === 'fsm.initializing') {
      if (snapshot) {
        throw fsmRuntimeError('RUNTIME_REPLAY_DIVERGENCE', 'FSM was initialized more than once.');
      }
      const initialState = requiredString(payload, 'initialState');
      if (initialState !== spec.initialState) {
        throw fsmRuntimeError('RUNTIME_PROCESS_MISMATCH', 'Initial state does not match process.');
      }
      snapshot = {
        processId: requiredString(payload, 'processId'),
        runId: event.runId,
        currentState: initialState,
        statePath: [initialState],
        status: 'running',
        updatedAt: event.timestamp,
        stateVisitCounts: {},
        variables: cloneRecord(payload.variables ?? {}),
        lastEventSequence: event.sequence,
      };
      continue;
    }
    if (!snapshot) continue;
    snapshot = { ...snapshot, lastEventSequence: event.sequence, updatedAt: event.timestamp };
    if (event.type === 'variables.patched') {
      snapshot = {
        ...snapshot,
        variables: { ...snapshot.variables, ...cloneRecord(payload.patch) },
      };
    } else if (event.type === 'fsm.transition.committed') {
      const toState = requiredString(payload, 'toState');
      snapshot = {
        ...snapshot,
        currentState: toState,
        statePath: [...snapshot.statePath, toState],
        status: requiredStatus(payload.status),
        currentStateAttemptId: undefined,
        currentAttempt: undefined,
      };
    } else if (event.type === 'fsm.state.entered') {
      const stateId = requiredString(payload, 'stateId');
      const attempt = requiredPositiveInteger(payload, 'attempt');
      snapshot = {
        ...snapshot,
        currentStateAttemptId: requiredString(payload, 'stateAttemptId'),
        currentAttempt: attempt,
        stateVisitCounts: {
          ...snapshot.stateVisitCounts,
          [stateId]: (snapshot.stateVisitCounts[stateId] ?? 0) + 1,
        },
      };
    } else if (event.type === 'run.completed') {
      snapshot = { ...snapshot, status: 'completed' };
    } else if (event.type === 'run.failed') {
      snapshot = { ...snapshot, status: 'failed' };
    } else if (event.type === 'run.cancelled') {
      snapshot = { ...snapshot, status: 'cancelled' };
    }
  }
  if (!snapshot) {
    throw fsmRuntimeError('RUNTIME_RUN_NOT_FOUND', 'FSM initialization event was not found.');
  }
  if (snapshot.processId !== spec.id) {
    throw fsmRuntimeError('RUNTIME_PROCESS_MISMATCH', 'Event stream belongs to another process.');
  }
  return structuredClone(snapshot);
}

function appendRequest(
  command: EventSourcedCommandBase,
  events: EventCreateInput[]
): Parameters<DurableEventRuntime['append']>[0] {
  return {
    scope: structuredClone(command.scope),
    events,
    expectedLastSequence: command.expectedLastSequence,
    ...(command.expectedRunRevision === undefined
      ? {}
      : { expectedRunRevision: command.expectedRunRevision }),
    fencingToken: command.fencingToken,
    idempotencyKey: command.idempotencyKey,
    transactionGroupId: command.operationId,
  };
}

function toEventCreateInput(event: PersistedFrameworkEvent): EventCreateInput {
  const { sequence, globalSequence, recordedAt, payloadHash, ...input } = event;
  void sequence;
  void globalSequence;
  void recordedAt;
  void payloadHash;
  return structuredClone(input);
}

function eventFactory(
  command: EventSourcedCommandBase,
  timestamp: string,
  namespace = 'commit'
): (
  type: FrameworkEventType,
  ordinal: number,
  payload: Record<string, unknown>
) => EventCreateInput {
  return (type, ordinal, payload) => ({
    id: `${command.operationId}:${namespace}:${ordinal}:${type}`,
    type,
    version: '1.0.0',
    ...(command.scope.tenantId === undefined ? {} : { tenantId: command.scope.tenantId }),
    userId: command.scope.userId,
    runId: command.scope.runId,
    operationId: command.operationId,
    idempotencyKey: command.idempotencyKey,
    ...(command.correlationId === undefined ? {} : { correlationId: command.correlationId }),
    timestamp,
    payload: structuredClone(payload),
  });
}

function stateAttemptPayload(command: CommitEventSourcedFSMCommand): Record<string, unknown> {
  return {
    stateId: command.stateId,
    stateAttemptId: command.stateAttemptId,
    attempt: command.attempt,
  };
}

function transitionPayload(
  command: CommitEventSourcedFSMCommand,
  transitionId: string,
  processId: string
): Record<string, unknown> {
  return {
    processId,
    transitionId,
    fromState: command.stateId,
    toState: command.toState,
    stateAttemptId: command.stateAttemptId,
    attempt: command.attempt,
  };
}

function nextVisitAttempt(snapshot: EventSourcedFSMSnapshot, stateId: string): number {
  return (snapshot.stateVisitCounts[stateId] ?? 0) + 1;
}

function assertCurrentAttempt(
  snapshot: EventSourcedFSMSnapshot,
  command: CommitEventSourcedFSMCommand
): void {
  if (
    snapshot.status !== 'running' ||
    snapshot.currentState !== command.stateId ||
    snapshot.currentStateAttemptId !== command.stateAttemptId ||
    snapshot.currentAttempt !== command.attempt
  ) {
    throw fsmRuntimeError('RUNTIME_RUN_CONFLICT', 'State attempt is stale or not current.', {
      expectedStateId: snapshot.currentState,
      actualStateId: command.stateId,
      expectedStateAttemptId: snapshot.currentStateAttemptId ?? null,
      actualStateAttemptId: command.stateAttemptId,
      expectedAttempt: snapshot.currentAttempt ?? null,
      actualAttempt: command.attempt,
      status: snapshot.status,
    });
  }
}

function assertCommandBase(command: EventSourcedCommandBase): void {
  assertNonEmpty(command.scope.userId, 'scope.userId');
  assertNonEmpty(command.scope.runId, 'scope.runId');
  assertNonEmpty(command.idempotencyKey, 'idempotencyKey');
  assertNonEmpty(command.operationId, 'operationId');
  if (!Number.isInteger(command.expectedLastSequence) || command.expectedLastSequence < 0) {
    throw fsmRuntimeError('RUNTIME_INVALID_INPUT', 'expectedLastSequence must be non-negative.');
  }
  assertPositiveInteger(command.fencingToken, 'fencingToken');
}

function assertVariablesPatch(patch: Record<string, unknown>): void {
  for (const key of Object.keys(patch)) {
    if (
      key.startsWith('$') ||
      key.startsWith('__') ||
      key === 'constructor' ||
      key === 'prototype'
    ) {
      throw fsmRuntimeError(
        'RUNTIME_INVALID_INPUT',
        `Reserved variable key is not allowed: ${key}`
      );
    }
  }
}

function isRecordableRejection(error: unknown): boolean {
  return (
    error instanceof FrameworkError &&
    ['FSM_GUARD_REJECTED', 'RUNTIME_GUARD_FAILED', 'RUNTIME_INVARIANT_FAILED'].includes(error.code)
  );
}

function normalizeRejection(error: unknown): Record<string, unknown> {
  if (error instanceof FrameworkError) return { code: error.code, message: error.message };
  return { code: 'RUNTIME_TRANSITION_REJECTED', message: String(error) };
}

function terminalRunEvent(status: FSMSnapshot['status']): FrameworkEventType {
  if (status === 'failed') return 'run.failed';
  if (status === 'cancelled') return 'run.cancelled';
  return 'run.completed';
}

function eventPayload(event: PersistedFrameworkEvent): Record<string, unknown> {
  if (!event.payload || typeof event.payload !== 'object' || Array.isArray(event.payload)) {
    throw fsmRuntimeError('RUNTIME_REPLAY_DIVERGENCE', `Invalid payload for ${event.type}.`);
  }
  return event.payload as Record<string, unknown>;
}

function cloneRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw fsmRuntimeError('RUNTIME_INVALID_INPUT', 'Expected an object value.');
  }
  return structuredClone(value as Record<string, unknown>);
}

function requiredString(value: Record<string, unknown>, key: string): string {
  const item = value[key];
  if (typeof item !== 'string' || item.length === 0) {
    throw fsmRuntimeError('RUNTIME_REPLAY_DIVERGENCE', `Missing event payload field: ${key}.`);
  }
  return item;
}

function requiredPositiveInteger(value: Record<string, unknown>, key: string): number {
  const item = value[key];
  if (!Number.isInteger(item) || (item as number) < 1) {
    throw fsmRuntimeError('RUNTIME_REPLAY_DIVERGENCE', `Invalid event payload field: ${key}.`);
  }
  return item as number;
}

function requiredStatus(value: unknown): FSMSnapshot['status'] {
  if (!['running', 'completed', 'failed', 'cancelled'].includes(String(value))) {
    throw fsmRuntimeError('RUNTIME_REPLAY_DIVERGENCE', 'Invalid FSM status in event payload.');
  }
  return value as FSMSnapshot['status'];
}

function assertNonEmpty(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) {
    throw fsmRuntimeError('RUNTIME_INVALID_INPUT', `${label} must be a non-empty string.`);
  }
}

function assertPositiveInteger(value: number, label: string): void {
  if (!Number.isInteger(value) || value < 1) {
    throw fsmRuntimeError('RUNTIME_INVALID_INPUT', `${label} must be a positive integer.`);
  }
}

function assertTimestamp(value: string): void {
  if (!Number.isFinite(Date.parse(value))) {
    throw fsmRuntimeError('RUNTIME_INVALID_INPUT', `Invalid runtime timestamp: ${value}`);
  }
}

function fsmRuntimeError(
  code: string,
  message: string,
  context?: Record<string, unknown>
): FrameworkError {
  return new FrameworkError({ code, message, ...(context === undefined ? {} : { context }) });
}
