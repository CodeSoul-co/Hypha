import type { BoundedStateExecutorInput } from '@hypha/harness';
import { createInitialSnapshot, type FSMProcessSpec } from '@hypha/fsm';
import {
  RuntimeTransitionDispatcher,
  type RuntimeTransitionCommand,
} from './RuntimeTransitionDispatcher';

const processSpec: FSMProcessSpec = {
  id: 'fsm.transition-test',
  version: '1.0.0',
  initialState: 'Start',
  states: [
    { id: 'Start', kind: 'idle' },
    { id: 'Work', kind: 'domain' },
    { id: 'Failed', kind: 'failed' },
  ],
  transitions: [
    { from: 'Start', to: 'Work' },
    { from: 'Start', to: 'Failed' },
  ],
  terminalStates: ['Failed'],
};

function command(overrides: Partial<RuntimeTransitionCommand> = {}): RuntimeTransitionCommand {
  return {
    id: 'command.1',
    runId: 'run.1',
    userId: 'user.1',
    from: 'Start',
    to: 'Work',
    snapshot: createInitialSnapshot(processSpec, 'run.1'),
    stepId: 'step.1',
    guardContext: { input: { approved: true } },
    reason: 'continue',
    ...overrides,
  };
}

function executorInput(overrides: Partial<BoundedStateExecutorInput> = {}) {
  return {
    scope: { userId: 'user.1', sessionId: 'session.1', runId: 'run.1' },
    process: processSpec,
    state: processSpec.states[0],
    projection: {
      runId: 'run.1',
      runStatus: 'running',
      currentState: 'Start',
      statePath: ['Start'],
      stateVisitCounts: { Start: 1 },
      stateAttempt: 1,
      pendingActivityIds: [],
    },
    runLease: {},
    stateClaim: {},
    abortSignal: new AbortController().signal,
    ...overrides,
  } as BoundedStateExecutorInput;
}

describe('RuntimeTransitionDispatcher', () => {
  it('exposes one validated transition decision to the claimed State executor', async () => {
    const dispatcher = new RuntimeTransitionDispatcher();

    await expect(
      dispatcher.dispatch(command(), () => dispatcher.executeState(executorInput()))
    ).resolves.toEqual({
      result: { kind: 'completed' },
      transition: { to: 'Work', reason: 'continue' },
      guardContext: { input: { approved: true } },
    });
  });

  it('rejects concurrent commands for the same Run and releases the slot afterward', async () => {
    const dispatcher = new RuntimeTransitionDispatcher();
    let release = (): void => undefined;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const running = dispatcher.dispatch(command(), async () => gate);

    await expect(
      dispatcher.dispatch(command({ id: 'command.2' }), async () => undefined)
    ).rejects.toMatchObject({ code: 'RUNTIME_STATE_COMMAND_BUSY' });

    release();
    await running;
    await expect(
      dispatcher.dispatch(command({ id: 'command.3' }), async () => 'accepted')
    ).resolves.toBe('accepted');
  });

  it('converts an explicit failure command into a normalized failed State result', async () => {
    const dispatcher = new RuntimeTransitionDispatcher();
    const failure = {
      code: 'RUNTIME_INTERNAL_ERROR' as const,
      message: 'state failed',
      retryable: false,
      stateId: 'Start',
    };

    await expect(
      dispatcher.dispatch(command({ to: 'Failed', failure, reason: 'state failed' }), () =>
        dispatcher.executeState(executorInput())
      )
    ).resolves.toEqual({ result: { kind: 'failed', error: failure } });
  });

  it('fails closed when the command does not match the claimed execution scope', async () => {
    const dispatcher = new RuntimeTransitionDispatcher();

    await expect(
      dispatcher.dispatch(command(), () =>
        dispatcher.executeState(
          executorInput({
            scope: { userId: 'user.2', sessionId: 'session.1', runId: 'run.1' },
          })
        )
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_STATE_COMMAND_MISMATCH' });
  });
});
