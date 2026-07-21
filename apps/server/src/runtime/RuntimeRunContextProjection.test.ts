import { createFrameworkEvent } from '@hypha/core';
import type { FSMProcessSpec, FSMSnapshot } from '@hypha/fsm';
import {
  projectRuntimeRunContext,
  projectRuntimeRunContexts,
  runtimeRunContextMetadata,
  type RuntimeRunContext,
} from './RuntimeRunContextProjection';

const fsm: FSMProcessSpec = {
  id: 'workflow.example',
  version: '1.0.0',
  initialState: 'Queued',
  states: [{ id: 'Queued' }, { id: 'Running' }, { id: 'Completed' }],
  transitions: [
    { from: 'Queued', to: 'Running' },
    { from: 'Running', to: 'Completed' },
  ],
  terminalStates: ['Completed'],
};
const initial: FSMSnapshot = {
  processId: fsm.id,
  runId: 'run-1',
  currentState: 'Queued',
  statePath: ['Queued'],
  status: 'running',
  updatedAt: '2026-07-21T06:00:00.000Z',
};
const context: RuntimeRunContext = {
  runId: 'run-1',
  userId: 'user-1',
  sessionId: 'session-1',
  clientSessionId: 'client-session-1',
  domainPackId: 'domain.example',
  fsm,
  snapshot: initial,
};

describe('projectRuntimeRunContexts', () => {
  it('restores the newest durable FSM snapshot for each recoverable Run', () => {
    const running: FSMSnapshot = {
      ...initial,
      currentState: 'Running',
      statePath: ['Queued', 'Running'],
      updatedAt: '2026-07-21T06:00:01.000Z',
    };
    const events = [
      createFrameworkEvent({
        id: 'run-1:created',
        type: 'run.created',
        runId: context.runId,
        sessionId: context.sessionId,
        userId: context.userId,
        timestamp: initial.updatedAt,
        payload: { runId: context.runId },
        metadata: runtimeRunContextMetadata(context),
      }),
      createFrameworkEvent({
        id: 'run-1:entered:running',
        type: 'fsm.state.entered',
        runId: context.runId,
        sessionId: context.sessionId,
        userId: context.userId,
        timestamp: running.updatedAt,
        payload: { stateId: 'Running', snapshot: running },
      }),
    ];

    expect(projectRuntimeRunContexts(events)).toEqual([
      expect.objectContaining({ runId: 'run-1', snapshot: running }),
    ]);
  });

  it('ignores pre-migration Runs without persisted recovery context', () => {
    expect(
      projectRuntimeRunContexts([
        createFrameworkEvent({
          id: 'legacy:created',
          type: 'run.created',
          runId: 'legacy',
          timestamp: initial.updatedAt,
          payload: { id: 'legacy' },
        }),
      ])
    ).toEqual([]);
  });

  it('selects one Run context without relying on process-local state', () => {
    const created = createFrameworkEvent({
      id: 'run-1:created',
      type: 'run.created',
      runId: context.runId,
      sessionId: context.sessionId,
      userId: context.userId,
      timestamp: initial.updatedAt,
      payload: { runId: context.runId },
      metadata: runtimeRunContextMetadata(context),
    });

    expect(projectRuntimeRunContext([created], 'run-1')).toEqual(context);
    expect(projectRuntimeRunContext([created], 'missing-run')).toBeNull();
  });

  it('fails closed when a persisted snapshot does not belong to the Run', () => {
    const corrupted = {
      ...context,
      snapshot: { ...initial, runId: 'another-run' },
    };
    expect(() =>
      projectRuntimeRunContexts([
        createFrameworkEvent({
          id: 'run-1:created',
          type: 'run.created',
          runId: context.runId,
          sessionId: context.sessionId,
          userId: context.userId,
          timestamp: initial.updatedAt,
          payload: { runId: context.runId },
          metadata: runtimeRunContextMetadata(corrupted),
        }),
      ])
    ).toThrow('FSM snapshot identity does not match');
  });
});
