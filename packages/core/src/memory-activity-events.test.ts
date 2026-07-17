import { describe, expect, it } from 'vitest';
import { InMemoryEventStore, createFrameworkEvent, type FrameworkEventType } from './index';

describe('memory activity framework events', () => {
  it('records the governed activity lifecycle in the shared event store', async () => {
    const eventTypes: FrameworkEventType[] = [
      'memory.activity.requested',
      'memory.activity.completed',
      'memory.activity.failed',
      'memory.activity.cancelled',
    ];
    const store = new InMemoryEventStore();

    for (const [sequence, type] of eventTypes.entries()) {
      await store.record(
        createFrameworkEvent({
          id: 'event:memory:activity:' + sequence,
          type,
          runId: 'run:memory:activity',
          sessionId: 'session:memory:activity',
          payload: {
            operationId: 'operation:memory:activity',
            scopeHash: 'scope:sha256',
          },
        })
      );
    }

    expect((await store.list({ runId: 'run:memory:activity' })).map((event) => event.type)).toEqual(
      eventTypes
    );
  });
});
