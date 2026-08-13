import { z, type ZodType } from 'zod';
import type {
  HumanReviewPolicySpec,
  JsonSchema,
  PolicyEngine,
  RetryPolicySpec,
  SpecMetadata,
  TimeoutPolicySpec,
  VersionedSpec,
} from '@codesoul-co/core';
import {
  defineSpecSchema,
  exportSpecJsonSchemas,
  FrameworkError,
  humanReviewPolicySpecSchema,
  retryPolicySpecSchema,
  specMetadataSchema,
  timeoutPolicySpecSchema,
  versionedSpecSchema,
} from '@codesoul-co/core';
import {
  FSM_ANOMALY_CATEGORIES,
  defaultFSMRecoveryPolicy,
  fsmRecoveryPolicySpecSchema,
  fsmRecoverySnapshotSchema,
  planFSMRecovery,
  registerFSMRecoverySuccess,
  type FSMAnomaly,
  type FSMRecoveryDecision,
  type FSMRecoveryPolicySpec,
  type FSMRecoverySnapshot,
} from './recovery';

export * from './recovery';

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
  | 'recovering'
  | 'compensating'
  | 'quarantined'
  | 'human_review'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'domain';

/**
 * Stable Harness states owned by the framework runtime. Domain Packs may bind
 * capabilities and policy to these phases, but must not add, remove, rename,
 * or reconnect them.
 */
export const HARNESS_FSM_STATE_IDS = [
  'Idle',
  'RunInitialized',
  'ContextBuilt',
  'Reasoning',
  'ActionSelected',
  'PolicyChecked',
  'Acting',
  'ObservationRecorded',
  'Verifying',
  'MemorySync',
  'Recovering',
  'Compensating',
  'Quarantined',
  'HumanReview',
  'Completed',
  'Failed',
  'Cancelled',
] as const;

export type HarnessFSMStateId = (typeof HARNESS_FSM_STATE_IDS)[number];

export type HarnessCapabilityArea =
  | 'lifecycle'
  | 'context'
  | 'reasoning'
  | 'policy'
  | 'activity'
  | 'observation'
  | 'verification'
  | 'memory'
  | 'recovery'
  | 'human_review'
  | 'terminal';

/**
 * `activity` is the governed side-effect phase shared by Tool, MCP,
 * Execution, file, Memory-write, and external-write adapters. The concrete
 * activity type remains Event evidence; it never becomes a Domain-defined
 * FSM state.
 */
export const HARNESS_STATE_CAPABILITY_AREA: Readonly<
  Record<HarnessFSMStateId, HarnessCapabilityArea>
> = Object.freeze({
  Idle: 'lifecycle',
  RunInitialized: 'lifecycle',
  ContextBuilt: 'context',
  Reasoning: 'reasoning',
  ActionSelected: 'reasoning',
  PolicyChecked: 'policy',
  Acting: 'activity',
  ObservationRecorded: 'observation',
  Verifying: 'verification',
  MemorySync: 'memory',
  Recovering: 'recovery',
  Compensating: 'recovery',
  Quarantined: 'recovery',
  HumanReview: 'human_review',
  Completed: 'terminal',
  Failed: 'terminal',
  Cancelled: 'terminal',
});

export const REACT_PHASE_TO_HARNESS_STATE = Object.freeze({
  reason: 'Reasoning',
  select_action: 'ActionSelected',
  policy_check: 'PolicyChecked',
  act: 'Acting',
  observe_result: 'ObservationRecorded',
  verify: 'Verifying',
  memory_sync: 'MemorySync',
  complete: 'Completed',
  fail: 'Failed',
  human_review: 'HumanReview',
  cancel: 'Cancelled',
} satisfies Readonly<Record<string, HarnessFSMStateId>>);

export function harnessStateForReActPhase(phase: string): HarnessFSMStateId | undefined {
  return REACT_PHASE_TO_HARNESS_STATE[phase as keyof typeof REACT_PHASE_TO_HARNESS_STATE];
}

const HARNESS_PIPELINE_STATE_IDS: ReadonlySet<HarnessFSMStateId> = new Set([
  'Idle',
  'RunInitialized',
  'ContextBuilt',
  'Reasoning',
  'ActionSelected',
  'PolicyChecked',
  'Acting',
  'ObservationRecorded',
  'Verifying',
  'MemorySync',
  'Completed',
]);

/**
 * Plans only normal capability movement. Recovery, compensation, quarantine,
 * human review, failure, and cancellation are selected by their dedicated
 * supervisors and can never be traversed as a shortcut for Domain work.
 */
export function planHarnessCapabilityPath(
  from: HarnessFSMStateId,
  to: HarnessFSMStateId
): HarnessFSMStateId[] {
  if (from === to) return [];
  if (!HARNESS_PIPELINE_STATE_IDS.has(from) || !HARNESS_PIPELINE_STATE_IDS.has(to)) {
    invalidHarnessPath(from, to);
  }
  const queue: Array<{ state: HarnessFSMStateId; path: HarnessFSMStateId[] }> = [
    { state: from, path: [] },
  ];
  const visited = new Set<HarnessFSMStateId>([from]);
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const transition of defaultReActFSMProcessSpec.transitions) {
      if (transition.from !== current.state || transition.guard) continue;
      if (!isHarnessFSMStateId(transition.to)) continue;
      if (!HARNESS_PIPELINE_STATE_IDS.has(transition.to)) continue;
      const path = [...current.path, transition.to];
      if (transition.to === to) return path;
      if (visited.has(transition.to)) continue;
      visited.add(transition.to);
      queue.push({ state: transition.to, path });
    }
  }
  invalidHarnessPath(from, to);
}

export function isHarnessFSMStateId(value: string): value is HarnessFSMStateId {
  return (HARNESS_FSM_STATE_IDS as readonly string[]).includes(value);
}

function invalidHarnessPath(from: HarnessFSMStateId, to: HarnessFSMStateId): never {
  throw new FrameworkError({
    code: 'FSM_TRANSITION_NOT_ALLOWED',
    message: `No normal Harness capability path exists: ${from} -> ${to}`,
    context: { from, to },
  });
}

export interface FSMStateSpec extends SpecMetadata {
  id: string;
  kind?: FSMStateKind;
  entryAction?: string;
  exitAction?: string;
  timeoutPolicy?: TimeoutPolicySpec;
  retryPolicy?: RetryPolicySpec;
  humanReviewPolicy?: HumanReviewPolicySpec;
  policyRefs?: string[];
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
  recoveryPolicy?: FSMRecoveryPolicySpec;
}

export interface FSMTopologyAnalysis {
  initialState: string;
  reachableStates: string[];
  unreachableStates: string[];
  deadEndStates: string[];
  cycleStates: string[];
}

export interface FSMSnapshot {
  processId: string;
  runId: string;
  currentState: string;
  statePath: string[];
  status: 'running' | FsmTerminalStatus;
  updatedAt: string;
  recovery?: FSMRecoverySnapshot;
  metadata?: Record<string, unknown>;
}

export interface StateTransition {
  processId: string;
  runId: string;
  from: string;
  to: string;
  transition: FSMTransitionSpec;
  snapshot: FSMSnapshot;
  acceptedAt: string;
  metadata?: Record<string, unknown>;
}

export interface FSMGuardContext {
  input?: unknown;
  variables?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface FSMTransitionOptions {
  now?: string;
  guardContext?: FSMGuardContext;
  guardEvaluator?: FSMGuardEvaluator;
}

export interface FSMRuntimeTransitionOptions extends FSMTransitionOptions {
  userId?: string;
  stepId?: string;
  policy?: PolicyEngine;
  metadata?: Record<string, unknown>;
}

export interface FSMRuntimeCancelOptions extends FSMRuntimeTransitionOptions {
  reason?: string;
}

export interface FSMStateEnteredRecord {
  processId: string;
  runId: string;
  stateId: string;
  fromState?: string;
  snapshot: FSMSnapshot;
  enteredAt: string;
  metadata?: Record<string, unknown>;
}

export interface FSMRecoveryDecisionRecord {
  processId: string;
  runId: string;
  decision: FSMRecoveryDecision;
  snapshot: FSMSnapshot;
}

export interface FSMRuntimeOptions {
  now?: () => string;
  policy?: PolicyEngine;
  onStateEntered?: (record: FSMStateEnteredRecord) => Promise<void> | void;
  onTransition?: (record: StateTransition) => Promise<void> | void;
  onRecoveryDecision?: (record: FSMRecoveryDecisionRecord) => Promise<void> | void;
}

export type FSMGuardEvaluator = (guard: string, context: FSMGuardContext) => boolean;

export interface FSMTimeoutEvaluation {
  timedOut: boolean;
  action?: NonNullable<TimeoutPolicySpec['onTimeout']>;
  stateId: string;
  elapsedMs: number;
  timeoutMs: number;
}

export function validateFSMProcessSpec(spec: FSMProcessSpec): void {
  const stateIds = new Set(spec.states.map((state) => state.id));
  if (stateIds.size !== spec.states.length) {
    throw new FrameworkError({
      code: 'FSM_DUPLICATE_STATE',
      message: 'FSM state ids must be unique.',
      context: { processId: spec.id },
    });
  }
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

  const transitionKeys = new Set(
    spec.transitions.map(
      (transition) => `${transition.from}\u0000${transition.to}\u0000${transition.guard ?? ''}`
    )
  );
  if (transitionKeys.size !== spec.transitions.length) {
    throw new FrameworkError({
      code: 'FSM_DUPLICATE_TRANSITION',
      message: 'FSM transitions with the same endpoints and guard must be unique.',
      context: { processId: spec.id },
    });
  }

  if (spec.recoveryPolicy) {
    const policy = fsmRecoveryPolicySpecSchema.parse(spec.recoveryPolicy);
    for (const [role, stateId] of Object.entries(policy.stateTargets)) {
      if (!stateIds.has(stateId)) {
        throw new FrameworkError({
          code: 'FSM_INVALID_RECOVERY_STATE',
          message: `Recovery state not found: ${stateId}`,
          context: { processId: spec.id, role, stateId },
        });
      }
    }
  }

  const terminalSet = new Set(spec.terminalStates);
  for (const state of spec.states) {
    if (terminalSet.has(state.id) && state.retryPolicy) {
      throw new FrameworkError({
        code: 'FSM_TERMINAL_RETRY_POLICY',
        message: `Terminal state cannot declare retry policy: ${state.id}`,
        context: { processId: spec.id, stateId: state.id },
      });
    }
  }
}

export function getAllowedTransitions(spec: FSMProcessSpec, stateId: string): FSMTransitionSpec[] {
  return spec.transitions.filter((transition) => transition.from === stateId);
}

/**
 * Describes graph properties without imposing product-specific topology rules.
 * Callers can decide whether unreachable states, non-terminal dead ends, or
 * cycles are valid for their Domain workflow.
 */
export function analyzeFSMTopology(spec: FSMProcessSpec): FSMTopologyAnalysis {
  validateFSMProcessSpec(spec);
  const outgoing = new Map<string, string[]>();
  for (const state of spec.states) outgoing.set(state.id, []);
  for (const transition of spec.transitions) outgoing.get(transition.from)!.push(transition.to);

  const reachable = new Set<string>();
  const queue = [spec.initialState];
  while (queue.length > 0) {
    const stateId = queue.shift()!;
    if (reachable.has(stateId)) continue;
    reachable.add(stateId);
    queue.push(...(outgoing.get(stateId) ?? []));
  }

  const cycleStates = new Set<string>();
  for (const state of spec.states) {
    if (canReachState(state.id, state.id, outgoing)) cycleStates.add(state.id);
  }
  const terminalStates = new Set(spec.terminalStates);
  return {
    initialState: spec.initialState,
    reachableStates: spec.states
      .map((state) => state.id)
      .filter((stateId) => reachable.has(stateId)),
    unreachableStates: spec.states
      .map((state) => state.id)
      .filter((stateId) => !reachable.has(stateId)),
    deadEndStates: spec.states
      .map((state) => state.id)
      .filter(
        (stateId) => !terminalStates.has(stateId) && (outgoing.get(stateId)?.length ?? 0) === 0
      ),
    cycleStates: spec.states.map((state) => state.id).filter((stateId) => cycleStates.has(stateId)),
  };
}

function canReachState(
  start: string,
  target: string,
  outgoing: ReadonlyMap<string, readonly string[]>
): boolean {
  const visited = new Set<string>([start]);
  const queue = [...(outgoing.get(start) ?? [])];
  while (queue.length > 0) {
    const stateId = queue.shift()!;
    if (stateId === target) return true;
    if (visited.has(stateId)) continue;
    visited.add(stateId);
    queue.push(...(outgoing.get(stateId) ?? []));
  }
  return false;
}

export function createInitialSnapshot(
  spec: FSMProcessSpec,
  runId: string,
  now = new Date().toISOString()
): FSMSnapshot {
  validateFSMProcessSpec(spec);
  assertValidFSMTimestamp(now, 'initial snapshot');
  return {
    processId: spec.id,
    runId,
    currentState: spec.initialState,
    statePath: [spec.initialState],
    status: spec.terminalStates.includes(spec.initialState)
      ? inferTerminalStatus(spec, spec.initialState)
      : 'running',
    updatedAt: now,
  };
}

export const REACT_FSM_STATE_PATH = [
  'Idle',
  'RunInitialized',
  'ContextBuilt',
  'Reasoning',
  'ActionSelected',
  'PolicyChecked',
  'Acting',
  'ObservationRecorded',
  'Verifying',
  'MemorySync',
  'Completed',
] as const;

const REACT_RECOVERABLE_STATES = [
  'Idle',
  'RunInitialized',
  'ContextBuilt',
  'Reasoning',
  'ActionSelected',
  'PolicyChecked',
  'Acting',
  'ObservationRecorded',
  'Verifying',
  'MemorySync',
] as const;

export const defaultReActFSMProcessSpec: FSMProcessSpec = {
  id: 'fsm.react.runtime.default',
  version: '0.0.0',
  name: 'Default ReAct Runtime FSM',
  description: 'Default ReAct + FSM runtime path for a minimal governed agent run.',
  initialState: 'Idle',
  recoveryPolicy: defaultFSMRecoveryPolicy,
  states: [
    { id: 'Idle', kind: 'idle', traceEvents: ['fsm.state.entered'] },
    { id: 'RunInitialized', kind: 'run_initialized', traceEvents: ['fsm.state.entered'] },
    { id: 'ContextBuilt', kind: 'context_built', traceEvents: ['fsm.state.entered'] },
    { id: 'Reasoning', kind: 'reasoning', traceEvents: ['fsm.state.entered'] },
    { id: 'ActionSelected', kind: 'action_selected', traceEvents: ['fsm.state.entered'] },
    { id: 'PolicyChecked', kind: 'policy_checked', traceEvents: ['fsm.state.entered'] },
    { id: 'Acting', kind: 'acting', traceEvents: ['fsm.state.entered'] },
    { id: 'ObservationRecorded', kind: 'observation_recorded', traceEvents: ['fsm.state.entered'] },
    { id: 'Verifying', kind: 'verifying', traceEvents: ['fsm.state.entered'] },
    { id: 'MemorySync', kind: 'memory_sync', traceEvents: ['fsm.state.entered'] },
    { id: 'Recovering', kind: 'recovering', traceEvents: ['fsm.state.entered'] },
    { id: 'Compensating', kind: 'compensating', traceEvents: ['fsm.state.entered'] },
    { id: 'Quarantined', kind: 'quarantined', traceEvents: ['fsm.state.entered'] },
    { id: 'HumanReview', kind: 'human_review', traceEvents: ['fsm.state.entered'] },
    { id: 'Completed', kind: 'completed', traceEvents: ['fsm.state.entered'] },
    { id: 'Failed', kind: 'failed', traceEvents: ['fsm.state.entered'] },
    { id: 'Cancelled', kind: 'cancelled', traceEvents: ['fsm.state.entered'] },
  ],
  transitions: [
    { from: 'Idle', to: 'RunInitialized', traceEvent: 'fsm.transition.accepted' },
    { from: 'RunInitialized', to: 'ContextBuilt', traceEvent: 'fsm.transition.accepted' },
    { from: 'ContextBuilt', to: 'Reasoning', traceEvent: 'fsm.transition.accepted' },
    { from: 'Reasoning', to: 'ActionSelected', traceEvent: 'fsm.transition.accepted' },
    { from: 'ActionSelected', to: 'PolicyChecked', traceEvent: 'fsm.transition.accepted' },
    { from: 'ActionSelected', to: 'Verifying', traceEvent: 'fsm.transition.accepted' },
    { from: 'PolicyChecked', to: 'Acting', traceEvent: 'fsm.transition.accepted' },
    { from: 'Acting', to: 'ObservationRecorded', traceEvent: 'fsm.transition.accepted' },
    { from: 'ObservationRecorded', to: 'Verifying', traceEvent: 'fsm.transition.accepted' },
    { from: 'Verifying', to: 'Reasoning', traceEvent: 'fsm.transition.accepted' },
    { from: 'Verifying', to: 'PolicyChecked', traceEvent: 'fsm.transition.accepted' },
    { from: 'Verifying', to: 'MemorySync', traceEvent: 'fsm.transition.accepted' },
    { from: 'Verifying', to: 'Completed', traceEvent: 'fsm.transition.accepted' },
    { from: 'MemorySync', to: 'ContextBuilt', traceEvent: 'fsm.transition.accepted' },
    { from: 'MemorySync', to: 'Reasoning', traceEvent: 'fsm.transition.accepted' },
    { from: 'MemorySync', to: 'PolicyChecked', traceEvent: 'fsm.transition.accepted' },
    { from: 'MemorySync', to: 'HumanReview', traceEvent: 'fsm.transition.accepted' },
    { from: 'MemorySync', to: 'Completed', traceEvent: 'fsm.transition.accepted' },
    { from: 'ActionSelected', to: 'HumanReview', traceEvent: 'fsm.transition.accepted' },
    { from: 'PolicyChecked', to: 'HumanReview', traceEvent: 'fsm.transition.accepted' },
    { from: 'Acting', to: 'HumanReview', traceEvent: 'fsm.transition.accepted' },
    { from: 'ObservationRecorded', to: 'HumanReview', traceEvent: 'fsm.transition.accepted' },
    { from: 'Verifying', to: 'HumanReview', traceEvent: 'fsm.transition.accepted' },
    { from: 'HumanReview', to: 'Acting', traceEvent: 'fsm.transition.accepted' },
    { from: 'HumanReview', to: 'ObservationRecorded', traceEvent: 'fsm.transition.accepted' },
    { from: 'HumanReview', to: 'Reasoning', traceEvent: 'fsm.transition.accepted' },
    { from: 'HumanReview', to: 'Completed', traceEvent: 'fsm.transition.accepted' },
    { from: 'HumanReview', to: 'Failed', traceEvent: 'fsm.transition.accepted' },
    ...REACT_RECOVERABLE_STATES.flatMap((from) => [
      { from, to: 'Recovering', traceEvent: 'fsm.transition.accepted' },
      { from, to: 'Compensating', traceEvent: 'fsm.transition.accepted' },
      { from, to: 'Quarantined', traceEvent: 'fsm.transition.accepted' },
    ]),
    ...REACT_RECOVERABLE_STATES.map((to) => ({
      from: 'Recovering',
      to,
      traceEvent: 'fsm.transition.accepted',
    })),
    { from: 'Recovering', to: 'Compensating', traceEvent: 'fsm.transition.accepted' },
    { from: 'Recovering', to: 'HumanReview', traceEvent: 'fsm.transition.accepted' },
    { from: 'Recovering', to: 'Quarantined', traceEvent: 'fsm.transition.accepted' },
    { from: 'Recovering', to: 'Failed', traceEvent: 'fsm.transition.accepted' },
    { from: 'Recovering', to: 'Cancelled', traceEvent: 'fsm.transition.accepted' },
    { from: 'Compensating', to: 'Recovering', traceEvent: 'fsm.transition.accepted' },
    { from: 'Compensating', to: 'HumanReview', traceEvent: 'fsm.transition.accepted' },
    { from: 'Compensating', to: 'Quarantined', traceEvent: 'fsm.transition.accepted' },
    { from: 'Compensating', to: 'Failed', traceEvent: 'fsm.transition.accepted' },
    { from: 'Quarantined', to: 'HumanReview', traceEvent: 'fsm.transition.accepted' },
    { from: 'Quarantined', to: 'Failed', traceEvent: 'fsm.transition.accepted' },
    { from: 'Quarantined', to: 'Cancelled', traceEvent: 'fsm.transition.accepted' },
    { from: 'Idle', to: 'Failed', traceEvent: 'fsm.transition.accepted' },
    { from: 'RunInitialized', to: 'Failed', traceEvent: 'fsm.transition.accepted' },
    { from: 'ContextBuilt', to: 'Failed', traceEvent: 'fsm.transition.accepted' },
    { from: 'Reasoning', to: 'Failed', traceEvent: 'fsm.transition.accepted' },
    { from: 'ActionSelected', to: 'Failed', traceEvent: 'fsm.transition.accepted' },
    { from: 'PolicyChecked', to: 'Failed', traceEvent: 'fsm.transition.accepted' },
    { from: 'Acting', to: 'Failed', traceEvent: 'fsm.transition.accepted' },
    { from: 'ObservationRecorded', to: 'Failed', traceEvent: 'fsm.transition.accepted' },
    { from: 'Verifying', to: 'Failed', traceEvent: 'fsm.transition.accepted' },
    { from: 'MemorySync', to: 'Failed', traceEvent: 'fsm.transition.accepted' },
    { from: 'Idle', to: 'Cancelled', traceEvent: 'fsm.transition.accepted' },
    { from: 'RunInitialized', to: 'Cancelled', traceEvent: 'fsm.transition.accepted' },
    { from: 'ContextBuilt', to: 'Cancelled', traceEvent: 'fsm.transition.accepted' },
    { from: 'Reasoning', to: 'Cancelled', traceEvent: 'fsm.transition.accepted' },
    { from: 'ActionSelected', to: 'Cancelled', traceEvent: 'fsm.transition.accepted' },
    { from: 'PolicyChecked', to: 'Cancelled', traceEvent: 'fsm.transition.accepted' },
    { from: 'Acting', to: 'Cancelled', traceEvent: 'fsm.transition.accepted' },
    { from: 'ObservationRecorded', to: 'Cancelled', traceEvent: 'fsm.transition.accepted' },
    { from: 'Verifying', to: 'Cancelled', traceEvent: 'fsm.transition.accepted' },
    { from: 'MemorySync', to: 'Cancelled', traceEvent: 'fsm.transition.accepted' },
    { from: 'HumanReview', to: 'Cancelled', traceEvent: 'fsm.transition.accepted' },
  ],
  terminalStates: ['Completed', 'Failed', 'Cancelled'],
};

/** Returns an isolated copy so composition code cannot mutate the shared contract. */
export function createHarnessFSMProcessSpec(): FSMProcessSpec {
  return structuredClone(defaultReActFSMProcessSpec);
}

/**
 * Fails closed when an application or Domain Pack attempts to replace the
 * Harness capability topology with a product workflow.
 */
export function assertHarnessFSMProcessSpec(spec: FSMProcessSpec): void {
  validateFSMProcessSpec(spec);
  const canonical = defaultReActFSMProcessSpec;
  if (spec.id !== canonical.id || spec.version !== canonical.version) {
    invalidHarnessTopology('Harness FSM identity is framework-owned.', spec);
  }
  if (spec.initialState !== canonical.initialState) {
    invalidHarnessTopology('Harness FSM initial state is framework-owned.', spec);
  }

  const canonicalStates = new Map(canonical.states.map((state) => [state.id, state.kind]));
  const actualStates = new Map(spec.states.map((state) => [state.id, state.kind]));
  if (canonicalStates.size !== actualStates.size) {
    invalidHarnessTopology('Harness FSM state set cannot be changed by composition.', spec);
  }
  for (const [stateId, kind] of canonicalStates) {
    if (actualStates.get(stateId) !== kind) {
      invalidHarnessTopology(
        `Harness FSM State ${stateId} is missing or has a different kind.`,
        spec
      );
    }
  }

  assertExactStringSet(spec.terminalStates, canonical.terminalStates, 'terminal state set', spec);
  assertExactStringSet(
    spec.transitions.map(transitionIdentity),
    canonical.transitions.map(transitionIdentity),
    'transition topology',
    spec
  );
}

/** Returns false for either an invalid process or a valid non-Harness topology. */
export function isHarnessFSMProcessSpec(spec: FSMProcessSpec): boolean {
  try {
    assertHarnessFSMProcessSpec(spec);
    return true;
  } catch {
    return false;
  }
}

function transitionIdentity(transition: FSMTransitionSpec): string {
  return `${transition.from}\u0000${transition.to}\u0000${transition.guard ?? ''}`;
}

function assertExactStringSet(
  actual: readonly string[],
  expected: readonly string[],
  label: string,
  spec: FSMProcessSpec
): void {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  if (
    actualSet.size !== expectedSet.size ||
    [...expectedSet].some((value) => !actualSet.has(value))
  ) {
    invalidHarnessTopology(`Harness FSM ${label} is framework-owned.`, spec);
  }
}

function invalidHarnessTopology(message: string, spec: FSMProcessSpec): never {
  throw new FrameworkError({
    code: 'FSM_INVALID_PROCESS',
    message,
    context: { processId: spec.id, processVersion: spec.version },
  });
}

export class FSMRuntime {
  private snapshot: FSMSnapshot;
  private started = false;

  constructor(
    private readonly spec: FSMProcessSpec,
    runId: string,
    private readonly options: FSMRuntimeOptions = {},
    snapshot?: FSMSnapshot
  ) {
    validateFSMProcessSpec(spec);
    if (snapshot) validateFSMSnapshot(spec, snapshot, runId);
    this.snapshot = snapshot ?? createInitialSnapshot(spec, runId, this.now());
  }

  getSnapshot(): FSMSnapshot {
    return this.snapshot;
  }

  async start(metadata?: Record<string, unknown>): Promise<FSMSnapshot> {
    if (this.started) return this.snapshot;
    this.started = true;
    await this.emitStateEntered({
      stateId: this.snapshot.currentState,
      enteredAt: this.snapshot.updatedAt,
      metadata,
    });
    return this.snapshot;
  }

  async transition(
    to: string,
    options: FSMRuntimeTransitionOptions = {}
  ): Promise<StateTransition> {
    const from = this.snapshot.currentState;
    const transition = this.spec.transitions.find(
      (candidate) => candidate.from === from && candidate.to === to
    );
    const acceptedAt = options.now ?? this.now();
    const next = await applyTransitionWithRuntimePolicy(this.spec, this.snapshot, to, {
      ...options,
      now: acceptedAt,
      policy: options.policy ?? this.options.policy,
    });
    const record: StateTransition = {
      processId: this.spec.id,
      runId: this.snapshot.runId,
      from,
      to,
      transition: transition ?? { from, to },
      snapshot: next,
      acceptedAt,
      metadata: options.metadata,
    };
    this.snapshot = next;
    await this.options.onTransition?.(record);
    await this.emitStateEntered({
      stateId: to,
      fromState: from,
      enteredAt: acceptedAt,
      metadata: options.metadata,
    });
    return record;
  }

  async transitionPath(
    states: string[],
    options: FSMRuntimeTransitionOptions = {}
  ): Promise<StateTransition[]> {
    const records: StateTransition[] = [];
    for (const state of states) {
      records.push(await this.transition(state, options));
    }
    return records;
  }

  async cancel(options: FSMRuntimeCancelOptions = {}): Promise<StateTransition> {
    return this.transition('Cancelled', {
      ...options,
      metadata: {
        ...options.metadata,
        phase: options.metadata?.phase ?? 'cancel',
        reason: options.reason,
      },
    });
  }

  async decideRecovery(
    anomaly: FSMAnomaly,
    options: { stateId?: string; now?: string } = {}
  ): Promise<FSMRecoveryDecision> {
    const now = options.now ?? this.now();
    const plan = planFSMRecovery({
      anomaly,
      stateId: options.stateId ?? this.snapshot.currentState,
      policy: this.spec.recoveryPolicy ?? defaultFSMRecoveryPolicy,
      snapshot: this.snapshot.recovery,
      now,
    });
    this.snapshot = { ...this.snapshot, recovery: plan.snapshot };
    await this.options.onRecoveryDecision?.({
      processId: this.spec.id,
      runId: this.snapshot.runId,
      decision: plan.decision,
      snapshot: this.snapshot,
    });
    return plan.decision;
  }

  registerRecoverySuccess(circuitKey: string, now = this.now()): FSMSnapshot {
    if (!this.snapshot.recovery) return this.snapshot;
    this.snapshot = {
      ...this.snapshot,
      recovery: registerFSMRecoverySuccess(this.snapshot.recovery, circuitKey, now),
    };
    return this.snapshot;
  }

  private async emitStateEntered(input: {
    stateId: string;
    fromState?: string;
    enteredAt: string;
    metadata?: Record<string, unknown>;
  }): Promise<void> {
    await this.options.onStateEntered?.({
      processId: this.spec.id,
      runId: this.snapshot.runId,
      stateId: input.stateId,
      fromState: input.fromState,
      snapshot: this.snapshot,
      enteredAt: input.enteredAt,
      metadata: input.metadata,
    });
  }

  private now(): string {
    return this.options.now?.() ?? new Date().toISOString();
  }
}

export function applyTransition(
  spec: FSMProcessSpec,
  snapshot: FSMSnapshot,
  to: string,
  nowOrOptions: string | FSMTransitionOptions = new Date().toISOString()
): FSMSnapshot {
  validateFSMProcessSpec(spec);
  validateFSMSnapshot(spec, snapshot, snapshot.runId);
  const options = normalizeTransitionOptions(nowOrOptions);
  assertValidFSMTimestamp(options.now, 'transition');
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
  assertGuardAllows(transition, options.guardContext, options.guardEvaluator);

  const status: FSMSnapshot['status'] = spec.terminalStates.includes(to)
    ? inferTerminalStatus(spec, to)
    : 'running';
  return {
    ...snapshot,
    currentState: to,
    statePath: [...snapshot.statePath, to],
    status,
    updatedAt: options.now,
  };
}

export async function applyTransitionWithRuntimePolicy(
  spec: FSMProcessSpec,
  snapshot: FSMSnapshot,
  to: string,
  options: FSMRuntimeTransitionOptions = {}
): Promise<FSMSnapshot> {
  const targetState = spec.states.find((state) => state.id === to);
  if (!targetState) {
    validateFSMProcessSpec(spec);
  }

  if (targetState?.humanReviewPolicy?.required) {
    throw new FrameworkError({
      code: 'FSM_HUMAN_REVIEW_REQUIRED',
      message: targetState.humanReviewPolicy.reason ?? `State requires human review: ${to}`,
      context: { processId: spec.id, runId: snapshot.runId, stateId: to },
    });
  }

  if (options.policy) {
    const decision = await options.policy.evaluate({
      runId: snapshot.runId,
      stepId: options.stepId,
      userId: options.userId,
      capabilityId: `fsm:${spec.id}:${snapshot.currentState}->${to}`,
      sideEffectLevel: 'none',
      input: {
        processId: spec.id,
        from: snapshot.currentState,
        to,
        guardContext: options.guardContext,
      },
    });
    if (!decision.allowed) {
      throw new FrameworkError({
        code: 'FSM_POLICY_DENIED',
        message: decision.reason ?? `FSM transition denied: ${snapshot.currentState} -> ${to}`,
        context: { processId: spec.id, runId: snapshot.runId, decision },
      });
    }
    if (decision.requiresHumanReview) {
      throw new FrameworkError({
        code: 'FSM_HUMAN_REVIEW_REQUIRED',
        message:
          decision.reason ??
          `FSM transition requires human review: ${snapshot.currentState} -> ${to}`,
        context: { processId: spec.id, runId: snapshot.runId, decision },
      });
    }
  }

  return applyTransition(spec, snapshot, to, options);
}

export function evaluateStateTimeout(
  spec: FSMProcessSpec,
  snapshot: FSMSnapshot,
  now = new Date().toISOString()
): FSMTimeoutEvaluation | null {
  validateFSMProcessSpec(spec);
  validateFSMSnapshot(spec, snapshot, snapshot.runId);
  assertValidFSMTimestamp(now, 'timeout evaluation');
  const state = spec.states.find((candidate) => candidate.id === snapshot.currentState);
  const timeoutMs = state?.timeoutPolicy?.timeoutMs;
  if (!state || !timeoutMs) return null;
  const elapsedMs = Math.max(0, Date.parse(now) - Date.parse(snapshot.updatedAt));
  return {
    timedOut: elapsedMs >= timeoutMs,
    action: state.timeoutPolicy?.onTimeout ?? 'fail',
    stateId: state.id,
    elapsedMs,
    timeoutMs,
  };
}

export function canRetryState(
  spec: FSMProcessSpec,
  stateId: string,
  attemptedCount: number
): boolean {
  validateFSMProcessSpec(spec);
  const state = spec.states.find((candidate) => candidate.id === stateId);
  if (!state?.retryPolicy) return false;
  return attemptedCount < state.retryPolicy.maxAttempts;
}

export function evaluateGuardExpression(guard: string, context: FSMGuardContext = {}): boolean {
  const expression = guard.trim();
  if (expression.length > 1_024) {
    throw new FrameworkError({
      code: 'FSM_GUARD_TOO_LONG',
      message: 'FSM guard expressions cannot exceed 1024 characters.',
    });
  }
  if (!expression || expression === 'true' || expression === 'always' || expression === 'default')
    return true;
  if (expression === 'false' || expression === 'never') return false;
  if (expression.startsWith('else:')) {
    return !evaluateGuardExpression(expression.slice('else:'.length), context);
  }
  const orParts = splitGuardExpression(expression, '||');
  if (orParts.length > 1) {
    return orParts.some((part) => evaluateGuardExpression(part, context));
  }
  const andParts = splitGuardExpression(expression, '&&');
  if (andParts.length > 1) {
    return andParts.every((part) => evaluateGuardExpression(part, context));
  }
  if (expression.startsWith('!')) {
    return !evaluateGuardExpression(expression.slice(1), context);
  }

  const exists = expression.match(/^exists\(([^)]+)\)$/);
  if (exists) {
    return readGuardPath(exists[1].trim(), context) !== undefined;
  }

  const matches = expression.match(/^matches\(([^,]+),\s*(.+)\)$/);
  if (matches) {
    const actual = readGuardPath(matches[1].trim(), context);
    const pattern = String(parseGuardLiteral(matches[2]));
    const value = String(actual ?? '');
    if (value.length > 4_096) {
      throw new FrameworkError({
        code: 'FSM_GUARD_INPUT_TOO_LONG',
        message: 'FSM guard match inputs cannot exceed 4096 characters.',
      });
    }
    return compileSafeGuardPattern(pattern).test(value);
  }

  const comparison = expression.match(/^([A-Za-z_][\w.]*?)\s*(===|==|!==|!=|>=|<=|>|<)\s*(.+)$/);
  if (comparison) {
    const actual = readGuardPath(comparison[1], context);
    const expected = parseGuardLiteral(comparison[3]);
    switch (comparison[2]) {
      case '===':
      case '==':
        return actual === expected;
      case '!==':
      case '!=':
        return actual !== expected;
      case '>':
        return Number(actual) > Number(expected);
      case '>=':
        return Number(actual) >= Number(expected);
      case '<':
        return Number(actual) < Number(expected);
      case '<=':
        return Number(actual) <= Number(expected);
    }
  }

  return Boolean(readGuardPath(expression, context));
}

const fsmStateKindSchema = z.enum([
  'idle',
  'run_initialized',
  'context_built',
  'reasoning',
  'action_selected',
  'policy_checked',
  'acting',
  'observation_recorded',
  'verifying',
  'memory_sync',
  'recovering',
  'compensating',
  'quarantined',
  'human_review',
  'completed',
  'failed',
  'cancelled',
  'domain',
]);

export const fsmStateSpecSchema = specMetadataSchema.extend({
  id: z.string().min(1),
  kind: fsmStateKindSchema.optional(),
  entryAction: z.string().optional(),
  exitAction: z.string().optional(),
  timeoutPolicy: timeoutPolicySpecSchema.optional(),
  retryPolicy: retryPolicySpecSchema.optional(),
  humanReviewPolicy: humanReviewPolicySpecSchema.optional(),
  policyRefs: z.array(z.string()).optional(),
  traceEvents: z.array(z.string()).optional(),
});

export const fsmTransitionSpecSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  guard: z.string().optional(),
  description: z.string().optional(),
  traceEvent: z.string().optional(),
});

export const fsmProcessSpecSchema = versionedSpecSchema.merge(specMetadataSchema).extend({
  initialState: z.string().min(1),
  states: z.array(fsmStateSpecSchema).min(1),
  transitions: z.array(fsmTransitionSpecSchema),
  terminalStates: z.array(z.string().min(1)),
  recoveryPolicy: fsmRecoveryPolicySpecSchema.optional(),
}) satisfies ZodType<FSMProcessSpec>;

export const fsmProcessSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'version', 'initialState', 'states', 'transitions', 'terminalStates'],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    initialState: { type: 'string' },
    states: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' },
          kind: { enum: fsmStateKindSchema.options },
          timeoutPolicy: { type: 'object' },
          retryPolicy: { type: 'object' },
          humanReviewPolicy: { type: 'object' },
          policyRefs: { type: 'array', items: { type: 'string' } },
          traceEvents: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    transitions: {
      type: 'array',
      items: {
        type: 'object',
        required: ['from', 'to'],
        properties: {
          from: { type: 'string' },
          to: { type: 'string' },
          guard: { type: 'string' },
          traceEvent: { type: 'string' },
        },
      },
    },
    terminalStates: { type: 'array', items: { type: 'string' } },
    recoveryPolicy: {
      type: 'object',
      required: [
        'maxAttemptsPerState',
        'maxTotalAttempts',
        'maxElapsedMs',
        'retryableCategories',
        'backoff',
        'circuitBreaker',
        'stateTargets',
        'onExhausted',
        'afterCompensation',
      ],
      properties: {
        maxAttemptsPerState: { type: 'integer', minimum: 1 },
        maxTotalAttempts: { type: 'integer', minimum: 1 },
        maxElapsedMs: { type: 'integer', minimum: 1 },
        retryableCategories: { type: 'array', items: { enum: [...FSM_ANOMALY_CATEGORIES] } },
        nonRetryableCodes: { type: 'array', items: { type: 'string' } },
        backoff: { type: 'object' },
        circuitBreaker: { type: 'object' },
        stateTargets: { type: 'object' },
        onExhausted: { enum: ['human_review', 'quarantine', 'fail'] },
        afterCompensation: { enum: ['human_review', 'quarantine', 'fail'] },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

export const fsmProcessSpecExample: FSMProcessSpec = {
  id: 'fsm.react.default',
  version: '0.0.0',
  name: 'Default ReAct FSM',
  initialState: 'Idle',
  states: [
    { id: 'Idle', kind: 'idle' },
    { id: 'Reasoning', kind: 'reasoning', timeoutPolicy: { timeoutMs: 30000, onTimeout: 'fail' } },
    { id: 'HumanReview', kind: 'human_review', humanReviewPolicy: { required: true } },
    { id: 'Completed', kind: 'completed' },
    { id: 'Failed', kind: 'failed' },
  ],
  transitions: [
    { from: 'Idle', to: 'Reasoning', guard: 'input.ready == true' },
    { from: 'Reasoning', to: 'Completed' },
    { from: 'Reasoning', to: 'HumanReview', guard: 'variables.needsReview == true' },
    { from: 'Reasoning', to: 'Failed' },
  ],
  terminalStates: ['Completed', 'Failed'],
};

export const fsmProcessSpecDefinition = defineSpecSchema<FSMProcessSpec>({
  id: 'FSMProcessSpec',
  zod: fsmProcessSpecSchema,
  jsonSchema: fsmProcessSpecJsonSchema,
  example: fsmProcessSpecExample,
});

export const fsmSpecDefinitions = [fsmProcessSpecDefinition] as const;
export const fsmSpecJsonSchemas = exportSpecJsonSchemas(fsmSpecDefinitions);

export function parseFSMProcessSpec(input: unknown): FSMProcessSpec {
  const spec = fsmProcessSpecDefinition.parse(input);
  validateFSMProcessSpec(spec);
  return spec;
}

export function validateFSMSnapshot(
  spec: FSMProcessSpec,
  snapshot: FSMSnapshot,
  expectedRunId = snapshot.runId
): void {
  validateFSMProcessSpec(spec);
  if (snapshot.processId !== spec.id || snapshot.runId !== expectedRunId) {
    throw new FrameworkError({
      code: 'FSM_SNAPSHOT_IDENTITY_MISMATCH',
      message: 'FSM snapshot identity does not match its process or run.',
      context: {
        expectedProcessId: spec.id,
        actualProcessId: snapshot.processId,
        expectedRunId,
        actualRunId: snapshot.runId,
      },
    });
  }
  const stateIds = new Set(spec.states.map((state) => state.id));
  const lastState = snapshot.statePath.at(-1);
  if (
    snapshot.statePath.length === 0 ||
    snapshot.statePath[0] !== spec.initialState ||
    lastState !== snapshot.currentState ||
    !stateIds.has(snapshot.currentState)
  ) {
    throw new FrameworkError({
      code: 'FSM_INVALID_SNAPSHOT_PATH',
      message: 'FSM snapshot path is not consistent with the process and current state.',
      context: { processId: spec.id, runId: snapshot.runId },
    });
  }
  const expectedStatus: FSMSnapshot['status'] = spec.terminalStates.includes(snapshot.currentState)
    ? inferTerminalStatus(spec, snapshot.currentState)
    : 'running';
  if (snapshot.status !== expectedStatus) {
    throw new FrameworkError({
      code: 'FSM_INVALID_SNAPSHOT_STATUS',
      message: `FSM snapshot status must be ${expectedStatus} in state ${snapshot.currentState}.`,
      context: { processId: spec.id, runId: snapshot.runId, status: snapshot.status },
    });
  }
  assertValidFSMTimestamp(snapshot.updatedAt, 'snapshot');
  if (snapshot.recovery) fsmRecoverySnapshotSchema.parse(snapshot.recovery);
}

function inferTerminalStatus(spec: FSMProcessSpec, stateId: string): FsmTerminalStatus {
  const kind = spec.states.find((state) => state.id === stateId)?.kind;
  if (kind === 'failed' || stateId.toLowerCase().includes('fail')) return 'failed';
  if (kind === 'cancelled' || stateId.toLowerCase().includes('cancel')) return 'cancelled';
  return 'completed';
}

function normalizeTransitionOptions(
  nowOrOptions: string | FSMTransitionOptions
): Required<Pick<FSMTransitionOptions, 'now'>> & FSMTransitionOptions {
  return typeof nowOrOptions === 'string'
    ? { now: nowOrOptions }
    : { ...nowOrOptions, now: nowOrOptions.now ?? new Date().toISOString() };
}

function assertGuardAllows(
  transition: FSMTransitionSpec,
  context: FSMGuardContext = {},
  evaluator: FSMGuardEvaluator = evaluateGuardExpression
): void {
  if (!transition.guard) return;
  if (!evaluator(transition.guard, context)) {
    throw new FrameworkError({
      code: 'FSM_GUARD_REJECTED',
      message: `Transition guard rejected: ${transition.guard}`,
      context: { transition },
    });
  }
}

function readGuardPath(path: string, context: FSMGuardContext): unknown {
  const normalizedPath = path.includes('.') ? path : `variables.${path}`;
  return normalizedPath.split('.').reduce<unknown>((current, segment) => {
    if (['__proto__', 'prototype', 'constructor'].includes(segment)) return undefined;
    if (
      current &&
      typeof current === 'object' &&
      Object.prototype.hasOwnProperty.call(current, segment)
    ) {
      return (current as Record<string, unknown>)[segment];
    }
    return undefined;
  }, context);
}

function parseGuardLiteral(value: string): unknown {
  const trimmed = value.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  const quoted = trimmed.match(/^['"](.*)['"]$/);
  return quoted ? quoted[1] : trimmed;
}

function compileSafeGuardPattern(pattern: string): RegExp {
  if (pattern.length > 128) {
    throw new FrameworkError({
      code: 'FSM_GUARD_PATTERN_TOO_LONG',
      message: 'FSM guard patterns cannot exceed 128 characters.',
    });
  }
  if (
    /\\[1-9]/.test(pattern) ||
    /\(\?[=!<]/.test(pattern) ||
    /\((?:[^()]|\\.)*[*+}](?:[^()]|\\.)*\)[*+{]/.test(pattern) ||
    /\((?:[^()]|\\.)*\|(?:[^()]|\\.)*\)[*+{]/.test(pattern)
  ) {
    throw new FrameworkError({
      code: 'FSM_UNSAFE_GUARD_PATTERN',
      message: 'FSM guard patterns cannot use backreferences, lookarounds, or nested quantifiers.',
    });
  }
  try {
    return new RegExp(pattern);
  } catch (error) {
    throw new FrameworkError({
      code: 'FSM_INVALID_GUARD_PATTERN',
      message: error instanceof Error ? error.message : String(error),
      cause: error,
    });
  }
}

function assertValidFSMTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) {
    throw new FrameworkError({
      code: 'FSM_INVALID_TIMESTAMP',
      message: `Invalid timestamp for ${label}: ${value}`,
    });
  }
}

function splitGuardExpression(expression: string, operator: '&&' | '||'): string[] {
  const parts: string[] = [];
  let quote: string | null = null;
  let depth = 0;
  let start = 0;
  for (let index = 0; index < expression.length; index += 1) {
    const char = expression[index];
    if ((char === '"' || char === "'") && expression[index - 1] !== '\\') {
      quote = quote === char ? null : (quote ?? char);
      continue;
    }
    if (quote) continue;
    if (char === '(') depth += 1;
    if (char === ')') depth = Math.max(0, depth - 1);
    if (depth === 0 && expression.slice(index, index + operator.length) === operator) {
      parts.push(expression.slice(start, index).trim());
      start = index + operator.length;
      index += operator.length - 1;
    }
  }
  if (parts.length === 0) return [expression];
  parts.push(expression.slice(start).trim());
  return parts;
}
