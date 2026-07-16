import { describe, expect, it, vi } from 'vitest';
import { defaultReActFSMProcessSpec, FSMRuntime, type FSMAnomaly } from '@hypha/fsm';
import { runFSMRecoveryLoop } from './recovery-loop';

async function reasoningRuntime(runId: string): Promise<FSMRuntime> {
  const fsm = new FSMRuntime(defaultReActFSMProcessSpec, runId, {
    now: () => '2026-07-16T00:00:00.000Z',
  });
  await fsm.start();
  await fsm.transitionPath(['RunInitialized', 'ContextBuilt', 'Reasoning']);
  return fsm;
}

describe('@hypha/harness explicit FSM recovery loop', () => {
  it('executes an explicitly scheduled bounded retry and closes the circuit on success', async () => {
    const fsm = await reasoningRuntime('run_retry');
    const execute = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(Object.assign(new Error('reset'), { code: 'ECONNRESET' }))
      .mockResolvedValueOnce('ok');
    const delays: number[] = [];

    const result = await runFSMRecoveryLoop({
      fsm,
      source: 'inference',
      execute,
      scheduler: {
        async wait(delayMs) {
          delays.push(delayMs);
        },
      },
      maxInlineDelayMs: 1_000,
      now: () => '2026-07-16T00:00:00.100Z',
    });

    expect(result).toMatchObject({ status: 'succeeded', output: 'ok', attempts: 2 });
    expect(delays).toHaveLength(1);
    expect(fsm.getSnapshot().statePath.slice(-2)).toEqual(['Recovering', 'Reasoning']);
    expect(fsm.getSnapshot().recovery?.circuits.inference.status).toBe('closed');
  });

  it('suspends delayed retries by default instead of blocking the process', async () => {
    const fsm = await reasoningRuntime('run_suspend');
    const result = await runFSMRecoveryLoop({
      fsm,
      source: 'storage',
      async execute() {
        throw Object.assign(new Error('database unavailable'), { code: 'HTTP_503' });
      },
      now: () => '2026-07-16T00:00:00.100Z',
    });

    expect(result).toMatchObject({ status: 'suspended', attempts: 1 });
    expect(result.decision?.action).toBe('retry');
    expect(result.decision?.nextEligibleAt).toBeDefined();
    expect(fsm.getSnapshot().currentState).toBe('Recovering');
  });

  it('quarantines an external side effect whose commit state is unknown', async () => {
    const fsm = await reasoningRuntime('run_quarantine');
    const result = await runFSMRecoveryLoop({
      fsm,
      source: 'tool',
      async execute() {
        throw new Error('connection lost after submission');
      },
      classify(error): FSMAnomaly {
        return {
          id: 'unknown_commit',
          source: 'tool',
          category: 'tool_failure',
          code: 'TOOL_COMMIT_UNKNOWN',
          message: String(error),
          occurredAt: '2026-07-16T00:00:00.100Z',
          retryable: true,
          sideEffectState: 'unknown',
        };
      },
    });

    expect(result).toMatchObject({ status: 'suspended' });
    expect(result.decision?.action).toBe('quarantine');
    expect(fsm.getSnapshot().currentState).toBe('Quarantined');
  });

  it('runs explicit compensation and routes the result to human review', async () => {
    const fsm = await reasoningRuntime('run_compensate');
    const compensate = vi.fn(async () => undefined);
    const result = await runFSMRecoveryLoop({
      fsm,
      source: 'tool',
      async execute() {
        throw new Error('downstream confirmation failed');
      },
      classify(error): FSMAnomaly {
        return {
          id: 'committed_effect',
          source: 'tool',
          category: 'tool_failure',
          code: 'DOWNSTREAM_CONFIRMATION_FAILED',
          message: String(error),
          occurredAt: '2026-07-16T00:00:00.100Z',
          retryable: false,
          sideEffectState: 'committed',
          compensationAvailable: true,
        };
      },
      compensate,
    });

    expect(compensate).toHaveBeenCalledOnce();
    expect(result).toMatchObject({ status: 'compensated', attempts: 1 });
    expect(fsm.getSnapshot().statePath.slice(-2)).toEqual(['Compensating', 'HumanReview']);
  });
});
