import { describe, expect, it, vi } from 'vitest';
import { InMemoryEventStore, type RecoveryFailure } from '@hypha/core';
import { defaultReActFSMProcessSpec, FSMRuntime } from '@hypha/fsm';
import { runRecoverySupervisor } from './recovery-supervisor';

function failure(
  id: string,
  module: RecoveryFailure['module'],
  overrides: Partial<RecoveryFailure> = {}
): RecoveryFailure {
  return {
    id,
    module,
    category: module === 'execution' ? 'execution_failure' : 'memory_failure',
    code: `${module.toUpperCase()}_UNAVAILABLE`,
    message: `${module} unavailable`,
    occurredAt: '2026-07-16T00:00:00.100Z',
    retryable: true,
    sideEffectState: 'none',
    rootCauseKey: 'storage.primary',
    evidence: {
      observedAt: '2026-07-16T00:00:00.100Z',
      operationKey: `${module}.operation`,
      dependencyKey: 'storage.primary',
      revision: 1,
    },
    ...overrides,
  };
}

async function runtime(runId: string): Promise<FSMRuntime> {
  const spec = {
    ...defaultReActFSMProcessSpec,
    recoveryPolicy: {
      ...defaultReActFSMProcessSpec.recoveryPolicy!,
      backoff: {
        ...defaultReActFSMProcessSpec.recoveryPolicy!.backoff,
        initialDelayMs: 0,
      },
      circuitBreaker: {
        ...defaultReActFSMProcessSpec.recoveryPolicy!.circuitBreaker,
        failureThreshold: 99,
      },
    },
  };
  const fsm = new FSMRuntime(spec, runId, {
    now: () => '2026-07-16T00:00:00.100Z',
  });
  await fsm.start();
  await fsm.transitionPath(['RunInitialized', 'ContextBuilt', 'Reasoning']);
  return fsm;
}

describe('@hypha/harness coordinated recovery supervisor', () => {
  it('stops repeating an unchanged memory failure, degrades once, and continues execution', async () => {
    const fsm = await runtime('run_coordinated');
    const trace = new InMemoryEventStore();
    const memoryExecute = vi.fn(async () => {
      throw Object.assign(new Error('database offline'), { code: 'ECONNREFUSED' });
    });
    const execution = vi.fn(async (context) => ({
      output: `executed:${String(context.outputs.memory)}`,
      evidence: {
        observedAt: '2026-07-16T00:00:00.300Z',
        operationKey: 'execution.command',
        state: 'completed',
        revision: 2,
      },
    }));

    const result = await runRecoverySupervisor({
      fsm,
      caseId: 'case_memory_execution',
      trace,
      now: () => '2026-07-16T00:00:00.100Z',
      policy: { maxNoProgressCycles: 1 },
      participants: [
        {
          id: 'memory',
          module: 'memory',
          execute: memoryExecute,
          classify: (_error, context) => failure(`memory_${context.cycle}`, 'memory'),
          degrade: async () => ({
            output: 'bounded-empty-context',
            evidence: {
              observedAt: '2026-07-16T00:00:00.200Z',
              operationKey: 'memory.operation',
              state: 'degraded_empty',
              revision: 1,
            },
          }),
        },
        {
          id: 'execution',
          module: 'execution',
          dependsOn: ['memory'],
          execute: execution,
          classify: (_error, context) => failure(`execution_${context.cycle}`, 'execution'),
        },
      ],
    });

    expect(result.status).toBe('degraded');
    expect(result.outputs).toEqual({
      memory: 'bounded-empty-context',
      execution: 'executed:bounded-empty-context',
    });
    expect(memoryExecute).toHaveBeenCalledTimes(2);
    expect(execution).toHaveBeenCalledOnce();
    expect(result.snapshot).toMatchObject({
      status: 'degraded',
      noProgressCycles: 1,
      degradedParticipants: ['memory'],
    });
    expect(fsm.getSnapshot().currentState).toBe('Reasoning');
    const events = await trace.list({ runId: 'run_coordinated' });
    expect(events.map((event) => event.type)).toContain('recovery.case.resolved');
    expect(
      events
        .filter((event) => event.type === 'recovery.attempt.completed')
        .map((event) => event.payload)
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          knowledge: expect.objectContaining({
            strategy: 'degrade',
            outcome: 'degraded',
            validation: { status: 'verified' },
          }),
        }),
      ])
    );
  });

  it('reconciles an unknown execution result before allowing any retry', async () => {
    const fsm = await runtime('run_reconcile');
    const execute = vi.fn(async () => {
      throw new Error('connection lost after submission');
    });
    const reconcile = vi.fn(async () => ({
      output: { receipt: 'completed' },
      evidence: {
        observedAt: '2026-07-16T00:00:00.200Z',
        operationKey: 'execution:command_1',
        state: 'completed',
        receiptStatus: 'completed' as const,
        revision: 3,
      },
    }));

    const result = await runRecoverySupervisor({
      fsm,
      caseId: 'case_unknown_execution',
      now: () => '2026-07-16T00:00:00.100Z',
      participants: [
        {
          id: 'execution',
          module: 'execution',
          execute,
          reconcile,
          classify: () =>
            failure('execution_unknown', 'execution', {
              code: 'EXECUTION_RESULT_UNKNOWN',
              sideEffectState: 'unknown',
              evidence: {
                observedAt: '2026-07-16T00:00:00.100Z',
                operationKey: 'execution:command_1',
                state: 'provider_state_unknown',
                receiptStatus: 'unknown',
                revision: 2,
              },
            }),
        },
      ],
    });

    expect(result.status).toBe('succeeded');
    expect(execute).toHaveBeenCalledOnce();
    expect(reconcile).toHaveBeenCalledOnce();
    expect(result.snapshot?.attempts[0]).toMatchObject({
      strategy: 'reconcile',
      status: 'succeeded',
    });
    expect(fsm.getSnapshot().currentState).toBe('Reasoning');
  });
});
