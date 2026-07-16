import { describe, expect, it } from 'vitest';
import {
  classifyFSMAnomaly,
  computeFSMRecoveryDelay,
  createInitialFSMRecoverySnapshot,
  defaultFSMRecoveryPolicy,
  planFSMRecovery,
  registerFSMRecoverySuccess,
  type FSMAnomaly,
  type FSMRecoveryPolicySpec,
} from './recovery';

const baseAnomaly: FSMAnomaly = {
  id: 'anomaly_1',
  source: 'tool',
  category: 'transient_dependency',
  code: 'ECONNRESET',
  message: 'connection reset',
  occurredAt: '2026-07-16T00:00:00.000Z',
  retryable: true,
  sideEffectState: 'none',
};

function policy(overrides: Partial<FSMRecoveryPolicySpec> = {}): FSMRecoveryPolicySpec {
  return {
    ...defaultFSMRecoveryPolicy,
    backoff: { ...defaultFSMRecoveryPolicy.backoff },
    circuitBreaker: { ...defaultFSMRecoveryPolicy.circuitBreaker, failureThreshold: 99 },
    stateTargets: { ...defaultFSMRecoveryPolicy.stateTargets },
    ...overrides,
  };
}

describe('@hypha/fsm recovery contracts', () => {
  it('classifies common provider, policy, capacity, and cancellation failures', () => {
    expect(
      classifyFSMAnomaly({ status: 429, message: 'slow down' }, { id: 'a1', source: 'inference' })
    ).toMatchObject({ category: 'rate_limit', retryable: true });
    expect(
      classifyFSMAnomaly(
        { code: 'FSM_POLICY_DENIED', message: 'blocked' },
        { id: 'a2', source: 'policy' }
      )
    ).toMatchObject({ category: 'policy_denied', retryable: false });
    expect(classifyFSMAnomaly({ code: 'ENOSPC' }, { id: 'a3', source: 'workspace' })).toMatchObject(
      { category: 'resource_exhausted', retryable: true }
    );
    expect(classifyFSMAnomaly({ name: 'AbortError' }, { id: 'a4', source: 'tool' })).toMatchObject({
      category: 'cancellation',
      retryable: false,
    });
  });

  it('produces deterministic bounded exponential backoff with jitter', () => {
    const backoff = { initialDelayMs: 100, maxDelayMs: 1_000, multiplier: 2, jitterRatio: 0.2 };
    expect(computeFSMRecoveryDelay(backoff, 3, 'stable-seed')).toBe(
      computeFSMRecoveryDelay(backoff, 3, 'stable-seed')
    );
    expect(computeFSMRecoveryDelay(backoff, 20, 'stable-seed')).toBeLessThanOrEqual(1_000);
  });

  it('retries within all budgets and escalates after the state budget is exhausted', () => {
    const recoveryPolicy = policy({ maxAttemptsPerState: 2, maxTotalAttempts: 5 });
    const first = planFSMRecovery({
      anomaly: baseAnomaly,
      stateId: 'Acting',
      policy: recoveryPolicy,
      now: '2026-07-16T00:00:00.100Z',
    });
    const second = planFSMRecovery({
      anomaly: { ...baseAnomaly, id: 'anomaly_2' },
      stateId: 'Acting',
      policy: recoveryPolicy,
      snapshot: first.snapshot,
      now: '2026-07-16T00:00:00.200Z',
    });
    const exhausted = planFSMRecovery({
      anomaly: { ...baseAnomaly, id: 'anomaly_3' },
      stateId: 'Acting',
      policy: recoveryPolicy,
      snapshot: second.snapshot,
      now: '2026-07-16T00:00:00.300Z',
    });

    expect(first.decision.action).toBe('retry');
    expect(second.decision.action).toBe('retry');
    expect(exhausted.decision).toMatchObject({
      action: 'human_review',
      attempt: 3,
      totalAttempts: 3,
    });
  });

  it('opens a dependency circuit and keeps it suspended until its reset window', () => {
    const recoveryPolicy = policy({
      circuitBreaker: { failureThreshold: 2, resetTimeoutMs: 1_000, halfOpenMaxAttempts: 1 },
    });
    const first = planFSMRecovery({
      anomaly: baseAnomaly,
      stateId: 'Reasoning',
      policy: recoveryPolicy,
      now: '2026-07-16T00:00:00.000Z',
    });
    const opened = planFSMRecovery({
      anomaly: { ...baseAnomaly, id: 'anomaly_2' },
      stateId: 'Reasoning',
      policy: recoveryPolicy,
      snapshot: first.snapshot,
      now: '2026-07-16T00:00:00.100Z',
    });
    const stillOpen = planFSMRecovery({
      anomaly: { ...baseAnomaly, id: 'anomaly_3' },
      stateId: 'Reasoning',
      policy: recoveryPolicy,
      snapshot: opened.snapshot,
      now: '2026-07-16T00:00:00.500Z',
    });

    expect(opened.decision).toMatchObject({ action: 'wait', circuitStatus: 'open' });
    expect(stillOpen.decision).toMatchObject({ action: 'wait', circuitStatus: 'open' });
    expect(stillOpen.decision.delayMs).toBe(600);
  });

  it('quarantines unknown commits and compensates known committed side effects', () => {
    const unknownCommit = planFSMRecovery({
      anomaly: { ...baseAnomaly, sideEffectState: 'unknown' },
      stateId: 'Acting',
      now: '2026-07-16T00:00:00.100Z',
    });
    const committed = planFSMRecovery({
      anomaly: {
        ...baseAnomaly,
        sideEffectState: 'committed',
        compensationAvailable: true,
      },
      stateId: 'Acting',
      now: '2026-07-16T00:00:00.100Z',
    });

    expect(unknownCommit.decision).toMatchObject({
      action: 'quarantine',
      transitionState: 'Quarantined',
    });
    expect(committed.decision).toMatchObject({
      action: 'compensate',
      transitionState: 'Compensating',
      afterCompensationAction: 'human_review',
      afterCompensationState: 'HumanReview',
    });
  });

  it('closes the selected circuit after a successful probe', () => {
    const snapshot = createInitialFSMRecoverySnapshot('2026-07-16T00:00:00.000Z');
    snapshot.circuits.tool = {
      status: 'half_open',
      consecutiveFailures: 3,
      halfOpenAttempts: 1,
    };
    const recovered = registerFSMRecoverySuccess(snapshot, 'tool', '2026-07-16T00:00:01.000Z');

    expect(recovered.circuits.tool).toEqual({
      status: 'closed',
      consecutiveFailures: 0,
      halfOpenAttempts: 0,
    });
    expect(snapshot.circuits.tool.status).toBe('half_open');
  });
});
