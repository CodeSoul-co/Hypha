import { createFrameworkEvent, InMemoryEventStore } from '@hypha/core';
import { OrchestrationEventStore } from './OrchestrationEventStore';

describe('OrchestrationEventStore', () => {
  it('routes only registered orchestration event families to canonical storage', async () => {
    const legacy = new InMemoryEventStore();
    const canonical = new InMemoryEventStore();
    const store = new OrchestrationEventStore({ legacy, canonical: () => canonical });

    await store.append(event('run-created', 'run.created', '2026-07-21T06:00:00.000Z'));
    await store.append(
      event('model-completed', 'model.call.completed', '2026-07-21T06:00:01.000Z')
    );

    await expect(canonical.list()).resolves.toEqual([
      expect.objectContaining({ id: 'run-created', type: 'run.created' }),
    ]);
    await expect(legacy.list()).resolves.toEqual([
      expect.objectContaining({ id: 'model-completed', type: 'model.call.completed' }),
    ]);
  });

  it('merges reads while treating canonical orchestration events as authoritative', async () => {
    const legacy = new InMemoryEventStore();
    const canonical = new InMemoryEventStore();
    const store = new OrchestrationEventStore({ legacy, canonical: () => canonical });
    await legacy.append(event('stale-started', 'run.started', '2026-07-21T06:00:00.000Z'));
    await legacy.append(event('tool-result', 'tool.call.completed', '2026-07-21T06:00:02.000Z'));
    await canonical.append(event('canonical-started', 'run.started', '2026-07-21T06:00:01.000Z'));

    await expect(store.list({ runId: 'run-1' })).resolves.toEqual([
      expect.objectContaining({ id: 'canonical-started' }),
      expect.objectContaining({ id: 'tool-result' }),
    ]);
    await expect(store.list({ runId: 'run-1', type: 'run.started' })).resolves.toEqual([
      expect.objectContaining({ id: 'canonical-started' }),
    ]);
    await expect(store.list({ runId: 'run-1', type: 'tool.call.completed' })).resolves.toEqual([
      expect.objectContaining({ id: 'tool-result' }),
    ]);
  });
});

function event(
  id: string,
  type: Parameters<typeof createFrameworkEvent>[0]['type'],
  timestamp: string
) {
  return createFrameworkEvent({
    id,
    type,
    runId: 'run-1',
    sessionId: 'session-1',
    userId: 'user-1',
    timestamp,
    payload: { id },
  });
}
