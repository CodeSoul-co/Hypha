import type { FrameworkEventType, PersistedFrameworkEvent } from '../../events';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type {
  RuntimeCancellationProjection,
  RuntimePendingWaitProjection,
  RuntimeResumeProjection,
} from '../../contracts/runtime-projection';
import { RUNTIME_WAIT_INTENT_TYPES } from '../../contracts/runtime-helpers';
import { validateRuntimeOrchestrationProjection } from '../../contracts/runtime-projection-schemas';
import { FrameworkError } from '../../errors';
import type { ProjectionDefinition } from './projection';

export const RUNTIME_ORCHESTRATION_PROJECTION_ID = 'runtime.orchestration';
export const RUNTIME_ORCHESTRATION_PROJECTION_VERSION = '1.3.0';

const ORCHESTRATION_EVENT_TYPES = new Set<FrameworkEventType>([
  'run.created',
  'run.started',
  'run.resume.requested',
  'run.resumed',
  'run.cancel.requested',
  'run.cancelling',
  'run.waiting_human',
  'run.waiting_signal',
  'run.waiting_timer',
  'run.paused',
  'run.completed',
  'run.failed',
  'run.cancelled',
  'runtime.wait.created',
  'runtime.wait.resolved',
  'runtime.signal.received',
  'runtime.timer.created',
  'runtime.timer.fired',
  'fsm.transition.accepted',
  'fsm.state.entered',
  'fsm.state.exited',
  'runtime.activity.requested',
  'runtime.activity.completed',
  'runtime.activity.failed',
  'runtime.activity.waiting',
  'runtime.activity.cancelled',
]);

const TERMINAL_RUN_STATUSES = new Set(['completed', 'failed', 'cancelled', 'timed_out']);

export function createRuntimeOrchestrationProjectionDefinition(
  runId: string
): ProjectionDefinition<RuntimeOrchestrationProjection> {
  required(runId, 'Projection runId');
  return {
    id: RUNTIME_ORCHESTRATION_PROJECTION_ID,
    version: RUNTIME_ORCHESTRATION_PROJECTION_VERSION,
    initialState: () =>
      validateRuntimeOrchestrationProjection({
        runId,
        runStatus: 'not_created',
        statePath: [],
        stateVisitCounts: {},
        stateAttempt: 0,
        pendingActivityIds: [],
      }),
    applies: (event) => ORCHESTRATION_EVENT_TYPES.has(event.type),
    reduce: (state, event) => reduceRuntimeOrchestrationProjection(state, event),
  };
}

export function reduceRuntimeOrchestrationProjection(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  if (event.runId !== state.runId) {
    divergence('Projection Event runId does not match its state', event, {
      expectedRunId: state.runId,
    });
  }
  if (!ORCHESTRATION_EVENT_TYPES.has(event.type)) return structuredClone(state);

  switch (event.type) {
    case 'run.created':
      return runCreated(state, event);
    case 'run.started':
      return runStarted(state, event);
    case 'run.resume.requested':
      return runResumeRequested(state, event);
    case 'run.resumed':
      return runResumed(state, event);
    case 'run.cancel.requested':
      return runCancelRequested(state, event);
    case 'run.cancelling':
      return runCancelling(state, event);
    case 'run.waiting_human':
      return runWaiting(state, event, 'waiting_human');
    case 'run.waiting_signal':
      return runWaiting(state, event, 'waiting_signal');
    case 'run.waiting_timer':
      return runWaiting(state, event, 'waiting_timer');
    case 'run.paused':
      return runWaiting(state, event, 'paused');
    case 'run.completed':
      return terminateRun(state, event, 'completed');
    case 'run.failed':
      return terminateRun(state, event, 'failed');
    case 'run.cancelled':
      return terminateRun(state, event, 'cancelled');
    case 'runtime.wait.created':
      return waitCreated(state, event);
    case 'runtime.wait.resolved':
      return waitResolved(state, event);
    case 'runtime.signal.received':
      return signalReceived(state, event);
    case 'runtime.timer.created':
      return timerCreated(state, event);
    case 'runtime.timer.fired':
      return timerFired(state, event);
    case 'fsm.transition.accepted':
      return transitionAccepted(state, event);
    case 'fsm.state.entered':
      return stateEntered(state, event);
    case 'fsm.state.exited':
      return stateExited(state, event);
    case 'runtime.activity.requested':
      return activityRequested(state, event);
    case 'runtime.activity.completed':
    case 'runtime.activity.failed':
    case 'runtime.activity.cancelled':
      return activityObserved(state, event, true);
    case 'runtime.activity.waiting':
      return activityObserved(state, event, false);
    default:
      return structuredClone(state);
  }
}

function runCreated(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  if (state.runStatus !== 'not_created') divergence('Run was created more than once', event);
  return validated({ ...state, runStatus: 'created' }, event);
}

function runStarted(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireCreated(state, event);
  if (TERMINAL_RUN_STATUSES.has(state.runStatus)) {
    divergence(`Terminal Run cannot start from ${state.runStatus}`, event);
  }
  return validated({ ...state, runStatus: 'running' }, event);
}

function runCancelRequested(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireCreated(state, event);
  if (TERMINAL_RUN_STATUSES.has(state.runStatus)) {
    divergence(`Terminal Run cannot cancel from ${state.runStatus}`, event);
  }
  if (!state.currentState || state.stateAttempt < 1) {
    divergence('Run cancellation requires a current State attempt', event);
  }
  if (state.cancellation) divergence('Run cancellation was requested more than once', event);
  const payload = payloadRecord(event);
  const cancellation: RuntimeCancellationProjection = {
    commandId: requiredString(payload.commandId, 'cancellation commandId', event),
    principalId: requiredString(payload.principalId, 'cancellation principalId', event),
    reason: requiredString(payload.reason, 'cancellation reason', event),
    requestedAt: requiredString(payload.requestedAt, 'cancellation requestedAt', event),
  };
  return validated({ ...state, runStatus: 'cancelling', cancellation }, event);
}

function runCancelling(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireCreated(state, event);
  if (state.runStatus !== 'cancelling' || !state.cancellation) {
    divergence(`run.cancelling requires cancelling status, received ${state.runStatus}`, event);
  }
  const commandId = requiredString(payloadRecord(event).commandId, 'cancellation commandId', event);
  if (commandId !== state.cancellation.commandId) {
    divergence('run.cancelling command does not match the pending cancellation', event, {
      expectedCommandId: state.cancellation.commandId,
      actualCommandId: commandId,
    });
  }
  return structuredClone(state);
}

function runWaiting(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent,
  runStatus: 'waiting_human' | 'waiting_signal' | 'waiting_timer' | 'paused'
): RuntimeOrchestrationProjection {
  requireActive(state, event);
  const waitTypesByStatus = {
    waiting_human: 'human',
    waiting_signal: 'signal',
    waiting_timer: 'timer',
    paused: 'pause',
  } as const;
  const expectedWaitType: RuntimePendingWaitProjection['type'] = waitTypesByStatus[runStatus];
  const withPendingWait = state.pendingWait
    ? state
    : projectLegacyPendingWait(state, event, expectedWaitType);
  if (withPendingWait.pendingWait?.type !== expectedWaitType) {
    divergence(`${event.type} requires a matching pending Wait`, event, {
      expectedWaitType,
      actualWaitType: withPendingWait.pendingWait?.type,
    });
  }
  return validated({ ...withPendingWait, runStatus }, event);
}

function projectLegacyPendingWait(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent,
  expectedWaitType: RuntimePendingWaitProjection['type']
): RuntimeOrchestrationProjection {
  if (!state.currentState || state.stateAttempt < 1) {
    divergence('Legacy waiting Event requires a current State attempt', event);
  }
  const payload = payloadRecord(event);
  const wait = recordValue(payload.wait);
  if (!wait) divergence('Waiting Event requires wait details', event);
  const type = requiredString(wait.type, 'wait type', event);
  if (type !== expectedWaitType) {
    divergence('Waiting Event type does not match its Run status', event, {
      expectedWaitType,
      actualWaitType: type,
    });
  }
  const pendingWait: RuntimePendingWaitProjection = {
    waitId: optionalString(payload.waitId) ?? `legacy-wait:${event.id}`,
    stateId: state.currentState,
    stateAttempt: state.stateAttempt,
    type: expectedWaitType,
    ...(optionalString(wait.key) === undefined ? {} : { key: optionalString(wait.key) }),
    ...(recordValue(wait.expectedSchema) === null
      ? {}
      : { expectedSchema: recordValue(wait.expectedSchema) ?? undefined }),
    ...(optionalString(wait.expiresAt) === undefined
      ? {}
      : { expiresAt: optionalString(wait.expiresAt) }),
    createdAt: event.timestamp,
  };
  return { ...omitLastResume(state), pendingWait };
}

function runResumeRequested(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireCreated(state, event);
  if (!['paused', 'waiting_signal', 'waiting_timer'].includes(state.runStatus)) {
    divergence(`Run cannot resume from ${state.runStatus}`, event);
  }
  if (!state.pendingWait) divergence('Run resume requires a pending Wait', event);
  return validated({ ...state, runStatus: 'acquiring' }, event);
}

function runResumed(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireCreated(state, event);
  if (state.runStatus !== 'acquiring') {
    divergence(`run.resumed requires acquiring status, received ${state.runStatus}`, event);
  }
  if (state.pendingWait) divergence('Run cannot resume before its Wait is resolved', event);
  const payload = payloadRecord(event);
  const resume = recordValue(payload.resume);
  if (!resume) divergence('run.resumed requires resume details', event);
  const kind = requiredString(resume.kind, 'resume kind', event);
  if (kind !== 'manual' && kind !== 'signal' && kind !== 'timer') {
    divergence('run.resumed contains an unsupported resume kind', event, { kind });
  }
  const lastResume: RuntimeResumeProjection = {
    commandId: requiredString(resume.commandId, 'resume commandId', event),
    kind,
    waitId: requiredString(resume.waitId, 'resume waitId', event),
    principalId: requiredString(resume.principalId, 'resume principalId', event),
    ...(optionalString(resume.key) === undefined ? {} : { key: optionalString(resume.key) }),
    ...('payload' in resume
      ? { payload: resume.payload as RuntimeResumeProjection['payload'] }
      : {}),
    resumedAt: requiredString(resume.resumedAt, 'resume resumedAt', event),
  };
  return validated({ ...state, runStatus: 'running', lastResume }, event);
}

function waitCreated(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireActive(state, event);
  if (!state.currentState || state.stateAttempt < 1) {
    divergence('A Wait requires a current FSM State attempt', event);
  }
  if (state.pendingWait) divergence('A Run cannot have more than one pending Wait', event);
  const payload = payloadRecord(event);
  const wait = recordValue(payload.wait);
  if (!wait) divergence('runtime.wait.created requires wait details', event);
  const type = requiredString(wait.type, 'wait type', event);
  if (!RUNTIME_WAIT_INTENT_TYPES.includes(type as (typeof RUNTIME_WAIT_INTENT_TYPES)[number])) {
    divergence('runtime.wait.created contains an unsupported wait type', event, { type });
  }
  const stateId = requiredString(payload.stateId, 'wait stateId', event);
  const stateAttempt = positiveInteger(payload.stateAttempt, 'wait stateAttempt', event);
  if (stateId !== state.currentState || stateAttempt !== state.stateAttempt) {
    divergence('Pending Wait does not belong to the current State attempt', event, {
      expectedStateId: state.currentState,
      actualStateId: stateId,
      expectedStateAttempt: state.stateAttempt,
      actualStateAttempt: stateAttempt,
    });
  }
  const pendingWait: RuntimePendingWaitProjection = {
    waitId: requiredString(payload.waitId, 'waitId', event),
    stateId,
    stateAttempt,
    type: type as RuntimePendingWaitProjection['type'],
    ...(optionalString(wait.key) === undefined ? {} : { key: optionalString(wait.key) }),
    ...(recordValue(wait.expectedSchema) === null
      ? {}
      : { expectedSchema: recordValue(wait.expectedSchema) ?? undefined }),
    ...(optionalString(wait.expiresAt) === undefined
      ? {}
      : { expiresAt: optionalString(wait.expiresAt) }),
    createdAt: requiredString(payload.createdAt, 'wait createdAt', event),
  };
  const withoutLastResume = omitLastResume(state);
  return validated({ ...withoutLastResume, pendingWait }, event);
}

function waitResolved(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireCreated(state, event);
  if (state.runStatus !== 'acquiring') {
    divergence('A Wait can only resolve during Run resume acquisition', event);
  }
  if (!state.pendingWait) divergence('Resolved Wait is not pending', event);
  const waitId = requiredString(payloadRecord(event).waitId, 'waitId', event);
  if (waitId !== state.pendingWait.waitId) {
    divergence('Resolved Wait id does not match the pending Wait', event, {
      expectedWaitId: state.pendingWait.waitId,
      actualWaitId: waitId,
    });
  }
  return validated(omitPendingWait(state), event);
}

function signalReceived(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireCreated(state, event);
  if (state.runStatus !== 'waiting_signal' || state.pendingWait?.type !== 'signal') {
    divergence('Signal requires a signal-waiting Run', event);
  }
  const payload = payloadRecord(event);
  const waitId = requiredString(payload.waitId, 'signal waitId', event);
  const key = requiredString(payload.key, 'signal key', event);
  if (waitId !== state.pendingWait.waitId || key !== state.pendingWait.key) {
    divergence('Signal does not match the pending Wait', event, {
      expectedWaitId: state.pendingWait.waitId,
      actualWaitId: waitId,
      expectedKey: state.pendingWait.key,
      actualKey: key,
    });
  }
  return structuredClone(state);
}

function timerCreated(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireActive(state, event);
  if (state.pendingWait?.type !== 'timer') {
    divergence('Timer creation requires a pending Timer Wait', event);
  }
  const payload = payloadRecord(event);
  const waitId = requiredString(payload.waitId, 'timer waitId', event);
  const timerId = requiredString(payload.timerId, 'timerId', event);
  const fireAt = requiredString(payload.fireAt, 'timer fireAt', event);
  if (
    waitId !== state.pendingWait.waitId ||
    timerId !== state.pendingWait.waitId ||
    fireAt !== state.pendingWait.expiresAt
  ) {
    divergence('Timer creation does not match the pending Wait', event, {
      expectedWaitId: state.pendingWait.waitId,
      actualWaitId: waitId,
      timerId,
      expectedFireAt: state.pendingWait.expiresAt,
      actualFireAt: fireAt,
    });
  }
  return structuredClone(state);
}

function timerFired(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireCreated(state, event);
  if (state.runStatus !== 'waiting_timer' || state.pendingWait?.type !== 'timer') {
    divergence('Timer firing requires a Timer-waiting Run', event);
  }
  const payload = payloadRecord(event);
  const waitId = requiredString(payload.waitId, 'timer waitId', event);
  const timerId = requiredString(payload.timerId, 'timerId', event);
  if (waitId !== state.pendingWait.waitId || timerId !== state.pendingWait.waitId) {
    divergence('Fired Timer does not match the pending Wait', event, {
      expectedWaitId: state.pendingWait.waitId,
      actualWaitId: waitId,
      timerId,
    });
  }
  return structuredClone(state);
}

function terminateRun(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent,
  runStatus: 'completed' | 'failed' | 'cancelled'
): RuntimeOrchestrationProjection {
  requireCreated(state, event);
  if (TERMINAL_RUN_STATUSES.has(state.runStatus)) {
    divergence(`Run is already terminal: ${state.runStatus}`, event);
  }
  const payload = payloadRecord(event);
  const terminalState =
    optionalString(payload.terminalState) ?? event.fsmState ?? state.currentState;
  if (!terminalState) divergence('Terminal Run Event requires a terminal FSM state', event);
  const withoutPendingTransition = omitPendingTransition(state);
  return validated(
    {
      ...withoutPendingTransition,
      runStatus,
      terminalState,
    },
    event
  );
}

function transitionAccepted(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireActive(state, event);
  if (!state.currentState) divergence('FSM transition cannot precede initial state entry', event);
  if (state.pendingTransition) divergence('FSM transition is already pending state entry', event);
  const payload = payloadRecord(event);
  const from = requiredString(payload.from, 'transition from', event);
  const to = requiredString(payload.to, 'transition to', event);
  if (from !== state.currentState) {
    divergence('FSM transition source does not match current state', event, {
      expectedState: state.currentState,
      actualState: from,
    });
  }
  return validated(
    {
      ...state,
      pendingTransition: { eventId: event.id, from, to },
    },
    event
  );
}

function stateEntered(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireActive(state, event);
  const payload = payloadRecord(event);
  const stateId =
    optionalString(payload.stateId) ??
    event.fsmState ??
    requiredString(undefined, 'stateId', event);
  if (state.pendingTransition && state.pendingTransition.to !== stateId) {
    divergence('Entered state does not match the accepted transition target', event, {
      expectedState: state.pendingTransition.to,
      actualState: stateId,
    });
  }
  if (!state.pendingTransition && state.currentState && state.currentState !== stateId) {
    divergence('A new FSM state requires an accepted transition', event, {
      currentState: state.currentState,
      enteredState: stateId,
    });
  }
  const stateVisitCounts = {
    ...state.stateVisitCounts,
    [stateId]: (state.stateVisitCounts[stateId] ?? 0) + 1,
  };
  const withoutPendingTransition = omitPendingTransition(state);
  return validated(
    {
      ...withoutPendingTransition,
      currentState: stateId,
      statePath: [...state.statePath, stateId],
      stateVisitCounts,
      stateAttempt: stateVisitCounts[stateId],
    },
    event
  );
}

function stateExited(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireActive(state, event);
  if (!state.currentState) divergence('FSM state exit cannot precede state entry', event);
  const payload = payloadRecord(event);
  const stateId = optionalString(payload.stateId) ?? event.fsmState ?? state.currentState;
  if (stateId !== state.currentState) {
    divergence('Exited state does not match current state', event, {
      expectedState: state.currentState,
      actualState: stateId,
    });
  }
  return structuredClone(state);
}

function activityRequested(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireActive(state, event);
  const payload = payloadRecord(event);
  const invocation = recordValue(payload.invocation);
  const activityId = requiredString(
    invocation?.activityId ?? payload.activityId,
    'activityId',
    event
  );
  if (state.pendingActivityIds.includes(activityId)) {
    divergence('Activity request is already pending', event, { activityId });
  }
  return validated(
    { ...state, pendingActivityIds: [...state.pendingActivityIds, activityId] },
    event
  );
}

function activityObserved(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent,
  terminal: boolean
): RuntimeOrchestrationProjection {
  requireCreated(state, event);
  const activityId = requiredString(payloadRecord(event).activityId, 'activityId', event);
  if (!state.pendingActivityIds.includes(activityId)) {
    divergence('Activity observation has no pending request', event, { activityId });
  }
  return validated(
    {
      ...state,
      pendingActivityIds: terminal
        ? state.pendingActivityIds.filter((id) => id !== activityId)
        : state.pendingActivityIds,
    },
    event
  );
}

function requireCreated(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): void {
  if (state.runStatus === 'not_created') divergence('Run Event precedes run.created', event);
}

function requireActive(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): void {
  requireCreated(state, event);
  if (TERMINAL_RUN_STATUSES.has(state.runStatus)) {
    divergence(`Terminal Run cannot apply ${event.type}`, event);
  }
  if (['created', 'queued', 'starting', 'acquiring'].includes(state.runStatus)) {
    divergence(`Run must start before applying ${event.type}`, event);
  }
}

function validated(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  try {
    return validateRuntimeOrchestrationProjection(state);
  } catch (error) {
    divergence('Orchestration projection invariant failed', event, {
      cause: error instanceof Error ? error.message : String(error),
    });
  }
}

function payloadRecord(event: PersistedFrameworkEvent): Record<string, unknown> {
  const payload = recordValue(event.payload);
  if (!payload) divergence('Orchestration Event payload must be an object', event);
  return payload;
}

function recordValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function omitPendingTransition(
  state: RuntimeOrchestrationProjection
): Omit<RuntimeOrchestrationProjection, 'pendingTransition'> {
  const { pendingTransition, ...remaining } = state;
  void pendingTransition;
  return remaining;
}

function omitPendingWait(
  state: RuntimeOrchestrationProjection
): Omit<RuntimeOrchestrationProjection, 'pendingWait'> {
  const { pendingWait, ...remaining } = state;
  void pendingWait;
  return remaining;
}

function omitLastResume(
  state: RuntimeOrchestrationProjection
): Omit<RuntimeOrchestrationProjection, 'lastResume'> {
  const { lastResume, ...remaining } = state;
  void lastResume;
  return remaining;
}

function positiveInteger(value: unknown, label: string, event: PersistedFrameworkEvent): number {
  if (!Number.isInteger(value) || (value as number) < 1) {
    divergence(`Orchestration Event requires positive ${label}`, event);
  }
  return value as number;
}

function requiredString(value: unknown, label: string, event: PersistedFrameworkEvent): string {
  const result = optionalString(value);
  if (!result) divergence(`Orchestration Event requires ${label}`, event);
  return result;
}

function required(value: string, label: string): void {
  if (!value.trim()) {
    throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message: `${label} is required` });
  }
}

function divergence(
  message: string,
  event: PersistedFrameworkEvent,
  context: Record<string, unknown> = {}
): never {
  throw new FrameworkError({
    code: 'RUNTIME_REPLAY_DIVERGENCE',
    message,
    context: { eventId: event.id, eventType: event.type, sequence: event.sequence, ...context },
  });
}
