import { describe, expect, it } from 'vitest';
import { createFrameworkEvent } from '@hypha/core';
import { EventFirstRuntime, InMemoryTraceRecorder, SessionProjector, UserScopedSessionQueue } from './index';

describe('@hypha/harness contracts', () => {
  it('keeps session views derived from events', async () => {
    const trace = new InMemoryTraceRecorder();
    await trace.record(
      createFrameworkEvent({
        id: 'event_1',
        type: 'run.started',
        runId: 'run_1',
        sessionId: 'session_1',
        payload: { userId: 'owner' },
      })
    );

    const sessions = new SessionProjector().project(await trace.list());
    expect(sessions).toEqual([
      expect.objectContaining({ id: 'session_1', userId: 'owner', runIds: ['run_1'] }),
    ]);
  });

  it('queues same-session work per user while allowing shared session ids', () => {
    const queue = new UserScopedSessionQueue();
    queue.enqueue({ id: 'a1', userId: 'user-a', sessionId: 'same', payload: {} });
    queue.enqueue({ id: 'a2', userId: 'user-a', sessionId: 'same', payload: {} });
    queue.enqueue({ id: 'b1', userId: 'user-b', sessionId: 'same', payload: {} });

    expect(queue.dequeue('user-a', 'same')?.id).toBe('a1');
    expect(queue.dequeue('user-b', 'same')?.id).toBe('b1');
    expect(queue.dequeue('user-a', 'same')?.id).toBe('a2');
  });

  it('derives session, run, replay, audit, and regression state from events', async () => {
    const runtime = new EventFirstRuntime();
    await runtime.createSession({
      id: 'session_1',
      userId: 'owner',
      domainPackRef: { id: 'minimal', version: '0.0.0' },
    });
    await runtime.createRun({
      id: 'run_1',
      sessionId: 'session_1',
      userId: 'owner',
      workflowRef: { id: 'workflow', version: '0.0.0' },
    });
    await runtime.appendRunEvent({
      id: 'state_1',
      type: 'fsm.state.entered',
      runId: 'run_1',
      sessionId: 'session_1',
      userId: 'owner',
      payload: { stateId: 'Reasoning' },
    });
    await runtime.appendRunEvent({
      id: 'model_1',
      type: 'model.call.completed',
      runId: 'run_1',
      sessionId: 'session_1',
      userId: 'owner',
      payload: { model: 'mock', response: 'ok' },
    });
    await runtime.appendRunEvent({
      id: 'done_1',
      type: 'run.completed',
      runId: 'run_1',
      sessionId: 'session_1',
      userId: 'owner',
      payload: { output: 'ok' },
    });

    await expect(runtime.projectSession('session_1')).resolves.toMatchObject({
      id: 'session_1',
      domainPackRef: { id: 'minimal' },
    });
    await expect(runtime.projectRun('run_1')).resolves.toMatchObject({
      status: 'completed',
      output: 'ok',
    });
    await expect(runtime.projectReplay('run_1')).resolves.toMatchObject({
      statePath: ['Reasoning'],
      modelCalls: [expect.objectContaining({ id: 'model_1' })],
      finalOutput: 'ok',
    });
    await expect(runtime.projectAudit('run_1')).resolves.toMatchObject({
      eventCount: 4,
    });
    await expect(runtime.projectRegression('run_1')).resolves.toMatchObject({
      eventTypes: ['run.created', 'fsm.state.entered', 'model.call.completed', 'run.completed'],
      finalOutput: 'ok',
    });
  });
});
