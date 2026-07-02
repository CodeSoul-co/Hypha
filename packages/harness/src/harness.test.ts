import { describe, expect, it } from 'vitest';
import { createFrameworkEvent } from '@hypha/core';
import { InMemoryTraceRecorder, SessionProjector, UserScopedSessionQueue } from './index';

describe('@hypha/harness stage-0 contracts', () => {
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
});
