import type { FrameworkEventType, PersistedFrameworkEvent } from '../../events';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import { validateRuntimeOrchestrationProjection } from '../../contracts/runtime-projection-schemas';
import { FrameworkError } from '../../errors';
import type { ProjectionDefinition } from './projection';

export const RUNTIME_ORCHESTRATION_PROJECTION_ID = 'runtime.orchestration';
export const RUNTIME_ORCHESTRATION_PROJECTION_VERSION = '1.0.0';

const ORCHESTRATION_EVENT_TYPES = new Set<FrameworkEventType>([
  'run.created',
  'run.started',
  'run.waiting_human',
  'run.completed',
  'run.failed',
  'run.cancelled',
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
    case 'run.waiting_human':
      return runWaitingHuman(state, event);
    case 'run.completed':
      return terminateRun(state, event, 'completed');
    case 'run.failed':
      return terminateRun(state, event, 'failed');
    case 'run.cancelled':
      return terminateRun(state, event, 'cancelled');
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

function runWaitingHuman(
  state: RuntimeOrchestrationProjection,
  event: PersistedFrameworkEvent
): RuntimeOrchestrationProjection {
  requireActive(state, event);
  return validated({ ...state, runStatus: 'waiting_human' }, event);
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
