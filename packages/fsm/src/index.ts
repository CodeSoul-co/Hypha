import type { RetryPolicySpec, SpecMetadata, TimeoutPolicySpec, VersionedSpec } from '@hypha/core';
import { FrameworkError } from '@hypha/core';

export type FsmTerminalStatus = 'completed' | 'failed' | 'cancelled';

export type FSMStateKind =
  | 'idle'
  | 'run_initialized'
  | 'context_built'
  | 'reasoning'
  | 'action_selected'
  | 'policy_checked'
  | 'acting'
  | 'observation_recorded'
  | 'verifying'
  | 'memory_sync'
  | 'human_review'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'domain';

export interface FSMStateSpec extends SpecMetadata {
  id: string;
  kind?: FSMStateKind;
  entryAction?: string;
  exitAction?: string;
  timeoutPolicy?: TimeoutPolicySpec;
  retryPolicy?: RetryPolicySpec;
  traceEvents?: string[];
}

export interface FSMTransitionSpec {
  from: string;
  to: string;
  guard?: string;
  description?: string;
  traceEvent?: string;
}

export interface FSMProcessSpec extends VersionedSpec, SpecMetadata {
  initialState: string;
  states: FSMStateSpec[];
  transitions: FSMTransitionSpec[];
  terminalStates: string[];
}

export interface FSMSnapshot {
  processId: string;
  runId: string;
  currentState: string;
  statePath: string[];
  status: 'running' | FsmTerminalStatus;
  updatedAt: string;
  metadata?: Record<string, unknown>;
}

export function validateFSMProcessSpec(spec: FSMProcessSpec): void {
  const stateIds = new Set(spec.states.map((state) => state.id));
  if (!stateIds.has(spec.initialState)) {
    throw new FrameworkError({
      code: 'FSM_INVALID_INITIAL_STATE',
      message: `Initial state not found: ${spec.initialState}`,
      context: { processId: spec.id },
    });
  }

  for (const terminalState of spec.terminalStates) {
    if (!stateIds.has(terminalState)) {
      throw new FrameworkError({
        code: 'FSM_INVALID_TERMINAL_STATE',
        message: `Terminal state not found: ${terminalState}`,
        context: { processId: spec.id, terminalState },
      });
    }
  }

  for (const transition of spec.transitions) {
    if (!stateIds.has(transition.from) || !stateIds.has(transition.to)) {
      throw new FrameworkError({
        code: 'FSM_INVALID_TRANSITION',
        message: `Transition references unknown state: ${transition.from} -> ${transition.to}`,
        context: { processId: spec.id, transition },
      });
    }
  }
}

export function getAllowedTransitions(
  spec: FSMProcessSpec,
  stateId: string
): FSMTransitionSpec[] {
  return spec.transitions.filter((transition) => transition.from === stateId);
}

export function createInitialSnapshot(
  spec: FSMProcessSpec,
  runId: string,
  now = new Date().toISOString()
): FSMSnapshot {
  validateFSMProcessSpec(spec);
  return {
    processId: spec.id,
    runId,
    currentState: spec.initialState,
    statePath: [spec.initialState],
    status: spec.terminalStates.includes(spec.initialState) ? 'completed' : 'running',
    updatedAt: now,
  };
}

export function applyTransition(
  spec: FSMProcessSpec,
  snapshot: FSMSnapshot,
  to: string,
  now = new Date().toISOString()
): FSMSnapshot {
  validateFSMProcessSpec(spec);
  const transition = spec.transitions.find(
    (candidate) => candidate.from === snapshot.currentState && candidate.to === to
  );
  if (!transition) {
    throw new FrameworkError({
      code: 'FSM_TRANSITION_NOT_ALLOWED',
      message: `Transition not allowed: ${snapshot.currentState} -> ${to}`,
      context: { processId: spec.id, runId: snapshot.runId },
    });
  }

  const status: FSMSnapshot['status'] = spec.terminalStates.includes(to)
    ? inferTerminalStatus(to)
    : 'running';
  return {
    ...snapshot,
    currentState: to,
    statePath: [...snapshot.statePath, to],
    status,
    updatedAt: now,
  };
}

function inferTerminalStatus(stateId: string): FsmTerminalStatus {
  if (stateId.toLowerCase().includes('fail')) return 'failed';
  if (stateId.toLowerCase().includes('cancel')) return 'cancelled';
  return 'completed';
}
