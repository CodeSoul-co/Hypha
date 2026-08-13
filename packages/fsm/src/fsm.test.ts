import { describe, expect, it } from 'vitest';
import {
  analyzeFSMTopology,
  applyTransition,
  applyTransitionWithRuntimePolicy,
  assertHarnessFSMProcessSpec,
  canRetryState,
  createHarnessFSMProcessSpec,
  createInitialSnapshot,
  defaultReActFSMProcessSpec,
  evaluateGuardExpression,
  evaluateStateTimeout,
  FSMRuntime,
  fsmProcessSpecDefinition,
  fsmSpecJsonSchemas,
  getAllowedTransitions,
  HARNESS_STATE_CAPABILITY_AREA,
  harnessStateForReActPhase,
  isHarnessFSMProcessSpec,
  parseFSMProcessSpec,
  planHarnessCapabilityPath,
  REACT_FSM_STATE_PATH,
  validateFSMSnapshot,
  validateFSMProcessSpec,
  type FSMProcessSpec,
} from './index';

const processSpec: FSMProcessSpec = {
  id: 'basic-react-fsm',
  version: '0.0.0',
  initialState: 'Idle',
  states: [
    { id: 'Idle', kind: 'idle' },
    { id: 'Reasoning', kind: 'reasoning' },
    { id: 'Completed', kind: 'completed' },
  ],
  transitions: [
    { from: 'Idle', to: 'Reasoning' },
    { from: 'Reasoning', to: 'Completed' },
  ],
  terminalStates: ['Completed'],
};

describe('@hypha/fsm runtime contracts', () => {
  it('validates and applies explicit transitions', () => {
    validateFSMProcessSpec(processSpec);
    const initial = createInitialSnapshot(processSpec, 'run_1', '2026-07-02T00:00:00.000Z');
    const next = applyTransition(processSpec, initial, 'Reasoning', '2026-07-02T00:00:01.000Z');

    expect(getAllowedTransitions(processSpec, 'Idle')).toHaveLength(1);
    expect(next.currentState).toBe('Reasoning');
    expect(next.statePath).toEqual(['Idle', 'Reasoning']);
  });

  it('rejects hidden transitions', () => {
    const initial = createInitialSnapshot(processSpec, 'run_1');
    expect(() => applyTransition(processSpec, initial, 'Completed')).toThrow(
      /Transition not allowed/
    );
  });

  it('analyzes custom topology without forcing Harness-owned node names', () => {
    const custom: FSMProcessSpec = {
      ...processSpec,
      states: [
        ...processSpec.states,
        { id: 'Detached', kind: 'domain' },
        { id: 'Loop', kind: 'domain' },
      ],
      transitions: [...processSpec.transitions, { from: 'Loop', to: 'Loop' }],
    };

    expect(analyzeFSMTopology(custom)).toEqual({
      initialState: 'Idle',
      reachableStates: ['Idle', 'Reasoning', 'Completed'],
      unreachableStates: ['Detached', 'Loop'],
      deadEndStates: ['Detached'],
      cycleStates: ['Loop'],
    });
    expect(isHarnessFSMProcessSpec(custom)).toBe(false);
    expect(isHarnessFSMProcessSpec(defaultReActFSMProcessSpec)).toBe(true);
  });

  it('rejects duplicate topology and inconsistent persisted snapshots', () => {
    expect(() =>
      validateFSMProcessSpec({
        ...processSpec,
        states: [...processSpec.states, processSpec.states[0]],
      })
    ).toThrow(/state ids must be unique/);
    expect(() =>
      validateFSMProcessSpec({
        ...processSpec,
        transitions: [...processSpec.transitions, processSpec.transitions[0]],
      })
    ).toThrow(/transitions.*must be unique/);

    const snapshot = createInitialSnapshot(processSpec, 'run_snapshot');
    expect(() =>
      validateFSMSnapshot(
        processSpec,
        { ...snapshot, currentState: 'Reasoning', status: 'running' },
        'run_snapshot'
      )
    ).toThrow(/snapshot path is not consistent/);
    expect(() => new FSMRuntime(processSpec, 'other_run', {}, snapshot)).toThrow(
      /snapshot identity does not match/
    );
  });

  it('evaluates deterministic transition guards without eval', () => {
    const guarded: FSMProcessSpec = {
      ...processSpec,
      transitions: [
        { from: 'Idle', to: 'Reasoning', guard: 'input.ready == true' },
        { from: 'Reasoning', to: 'Completed' },
      ],
    };
    const initial = createInitialSnapshot(guarded, 'run_1');

    expect(() =>
      applyTransition(guarded, initial, 'Reasoning', {
        now: '2026-07-02T00:00:01.000Z',
        guardContext: { input: { ready: false } },
      })
    ).toThrow(/Transition guard rejected/);

    expect(
      applyTransition(guarded, initial, 'Reasoning', {
        guardContext: { input: { ready: true } },
      }).currentState
    ).toBe('Reasoning');
    expect(evaluateGuardExpression('variables.score == 3', { variables: { score: 3 } })).toBe(true);
    expect(
      evaluateGuardExpression(
        "input.ready == true && variables.score >= 3 && matches(metadata.intent, '^ship')",
        { input: { ready: true }, variables: { score: 4 }, metadata: { intent: 'ship-code' } }
      )
    ).toBe(true);
    expect(
      evaluateGuardExpression('exists(variables.owner) || input.override == true', {
        input: { override: false },
        variables: { owner: 'owner' },
      })
    ).toBe(true);
    expect(evaluateGuardExpression('!exists(variables.blocked)', { variables: {} })).toBe(true);
    expect(evaluateGuardExpression('exists(variables.constructor)', { variables: {} })).toBe(false);
    expect(() =>
      evaluateGuardExpression("matches(metadata.intent, '(a+)+$')", {
        metadata: { intent: 'a'.repeat(100) },
      })
    ).toThrow(/nested quantifiers/);
    expect(() => evaluateGuardExpression("matches(metadata.intent, '[')")).toThrow(
      /Invalid regular expression/
    );
  });

  it('derives terminal status from state kind and rejects invalid timestamps', () => {
    const failedInitial: FSMProcessSpec = {
      id: 'failed-initial',
      version: '0.0.0',
      initialState: 'Rejected',
      states: [{ id: 'Rejected', kind: 'failed' }],
      transitions: [],
      terminalStates: ['Rejected'],
    };

    expect(createInitialSnapshot(failedInitial, 'run_failed').status).toBe('failed');
    expect(() => createInitialSnapshot(processSpec, 'run_invalid_time', 'not-a-date')).toThrow(
      /Invalid timestamp/
    );
  });

  it('enforces transition policy and human review state semantics', async () => {
    const reviewProcess: FSMProcessSpec = {
      ...processSpec,
      states: [
        ...processSpec.states,
        { id: 'HumanReview', kind: 'human_review', humanReviewPolicy: { required: true } },
      ],
      transitions: [...processSpec.transitions, { from: 'Reasoning', to: 'HumanReview' }],
    };
    const initial = applyTransition(
      reviewProcess,
      createInitialSnapshot(reviewProcess, 'run_1'),
      'Reasoning'
    );

    await expect(
      applyTransitionWithRuntimePolicy(reviewProcess, initial, 'HumanReview')
    ).rejects.toThrow(/requires human review/);

    await expect(
      applyTransitionWithRuntimePolicy(reviewProcess, initial, 'Completed', {
        policy: {
          async evaluate() {
            return { allowed: false, reason: 'blocked by process policy' };
          },
        },
      })
    ).rejects.toThrow(/blocked by process policy/);
  });

  it('exposes timeout, retry, schema export, and minimal example contracts', () => {
    const timed: FSMProcessSpec = {
      ...processSpec,
      states: [
        {
          id: 'Idle',
          kind: 'idle',
          timeoutPolicy: { timeoutMs: 100, onTimeout: 'retry' },
          retryPolicy: { maxAttempts: 2 },
        },
        { id: 'Reasoning', kind: 'reasoning' },
        { id: 'Completed', kind: 'completed' },
      ],
    };
    const snapshot = createInitialSnapshot(timed, 'run_1', '2026-07-02T00:00:00.000Z');

    expect(evaluateStateTimeout(timed, snapshot, '2026-07-02T00:00:00.101Z')).toMatchObject({
      timedOut: true,
      action: 'retry',
    });
    expect(canRetryState(timed, 'Idle', 1)).toBe(true);
    expect(canRetryState(timed, 'Idle', 2)).toBe(false);
    expect(parseFSMProcessSpec(fsmProcessSpecDefinition.example).id).toBe('fsm.react.default');
    expect(fsmSpecJsonSchemas.FSMProcessSpec.required).toContain('states');
  });

  it('runs the default ReAct FSM path and emits state transition records', async () => {
    const entered: string[] = [];
    const transitions: string[] = [];
    const runtime = new FSMRuntime(defaultReActFSMProcessSpec, 'run_react_fsm', {
      now: () => new Date(Date.UTC(2026, 6, 3, 0, 0, entered.length)).toISOString(),
      onStateEntered(record) {
        entered.push(record.stateId);
      },
      onTransition(record) {
        transitions.push(`${record.from}->${record.to}`);
      },
    });

    await runtime.start();
    await runtime.transitionPath(REACT_FSM_STATE_PATH.slice(1));

    expect(entered).toEqual([...REACT_FSM_STATE_PATH]);
    expect(transitions).toEqual([
      'Idle->RunInitialized',
      'RunInitialized->ContextBuilt',
      'ContextBuilt->Reasoning',
      'Reasoning->ActionSelected',
      'ActionSelected->PolicyChecked',
      'PolicyChecked->Acting',
      'Acting->ObservationRecorded',
      'ObservationRecorded->Verifying',
      'Verifying->MemorySync',
      'MemorySync->Completed',
    ]);
    expect(runtime.getSnapshot()).toMatchObject({
      currentState: 'Completed',
      status: 'completed',
      statePath: [...REACT_FSM_STATE_PATH],
    });
  });

  it('owns the Harness capability topology independently of Domain workflows', () => {
    const canonical = createHarnessFSMProcessSpec();

    expect(() => assertHarnessFSMProcessSpec(canonical)).not.toThrow();
    expect(HARNESS_STATE_CAPABILITY_AREA.Reasoning).toBe('reasoning');
    expect(HARNESS_STATE_CAPABILITY_AREA.Acting).toBe('activity');
    expect(HARNESS_STATE_CAPABILITY_AREA.MemorySync).toBe('memory');
    expect(harnessStateForReActPhase('policy_check')).toBe('PolicyChecked');
    expect(harnessStateForReActPhase('unknown-domain-stage')).toBeUndefined();
    expect(planHarnessCapabilityPath('Idle', 'PolicyChecked')).toEqual([
      'RunInitialized',
      'ContextBuilt',
      'Reasoning',
      'ActionSelected',
      'PolicyChecked',
    ]);
    expect(planHarnessCapabilityPath('Verifying', 'PolicyChecked')).toEqual(['PolicyChecked']);
    expect(() => planHarnessCapabilityPath('Verifying', 'Recovering')).toThrow(
      /No normal Harness capability path/
    );
  });

  it('rejects Domain or application changes to the Harness FSM topology', () => {
    const withDomainState = createHarnessFSMProcessSpec();
    withDomainState.states.push({ id: 'ApproveInvoice', kind: 'domain' });
    withDomainState.transitions.push({ from: 'Reasoning', to: 'ApproveInvoice' });
    expect(() => assertHarnessFSMProcessSpec(withDomainState)).toThrow(
      /state set cannot be changed/
    );

    const withoutCapabilityTransition = createHarnessFSMProcessSpec();
    withoutCapabilityTransition.transitions = withoutCapabilityTransition.transitions.filter(
      ({ from, to }) => from !== 'Verifying' || to !== 'MemorySync'
    );
    expect(() => assertHarnessFSMProcessSpec(withoutCapabilityTransition)).toThrow(
      /transition topology is framework-owned/
    );

    const renamed = createHarnessFSMProcessSpec();
    renamed.id = 'domain.checkout.workflow';
    expect(() => assertHarnessFSMProcessSpec(renamed)).toThrow(/identity is framework-owned/);
  });

  it('returns isolated Harness FSM copies for composition', () => {
    const isolated = createHarnessFSMProcessSpec();
    isolated.states[0].name = 'Application override';
    isolated.transitions.splice(0, 1);

    expect(defaultReActFSMProcessSpec.states[0].name).toBeUndefined();
    expect(defaultReActFSMProcessSpec.transitions[0]).toMatchObject({
      from: 'Idle',
      to: 'RunInitialized',
    });
  });

  it('supports explicit cancellation as a terminal FSM transition', async () => {
    const transitions: string[] = [];
    const runtime = new FSMRuntime(defaultReActFSMProcessSpec, 'run_cancel', {
      now: () => '2026-07-03T00:00:00.000Z',
      onTransition(record) {
        transitions.push(`${record.from}->${record.to}`);
      },
    });

    await runtime.start();
    const record = await runtime.cancel({ reason: 'user requested stop' });

    expect(record.metadata).toMatchObject({
      phase: 'cancel',
      reason: 'user requested stop',
    });
    expect(transitions).toEqual(['Idle->Cancelled']);
    expect(runtime.getSnapshot()).toMatchObject({
      currentState: 'Cancelled',
      status: 'cancelled',
      statePath: ['Idle', 'Cancelled'],
    });
  });
});
