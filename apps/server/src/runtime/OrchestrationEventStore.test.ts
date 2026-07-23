import { createPersistedEventBatch, createFrameworkEvent, InMemoryEventStore } from '@hypha/core';
import {
  auditCanonicalRuntimeStreams,
  CanonicalRunManagerEventStore,
  OrchestrationEventStore,
  migrateCanonicalEventFamilies,
} from './OrchestrationEventStore';

describe('OrchestrationEventStore', () => {
  it('routes only registered orchestration event families to canonical storage', async () => {
    const legacy = new InMemoryEventStore();
    const canonical = new InMemoryEventStore();
    const store = new OrchestrationEventStore({ legacy, canonical: () => canonical });

    await store.append(event('run-created', 'run.created', '2026-07-21T06:00:00.000Z'));
    await store.append(
      event('context-started', 'context.build.started', '2026-07-21T06:00:00.500Z')
    );
    await store.append(
      event('model-completed', 'model.call.completed', '2026-07-21T06:00:01.000Z')
    );

    await expect(canonical.list()).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'run-created', type: 'run.created' }),
        expect.objectContaining({ id: 'context-started', type: 'context.build.started' }),
      ])
    );
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

  it('gives RunManager canonical-only writes while retaining merged replay reads', async () => {
    const legacy = new InMemoryEventStore();
    const canonical = new InMemoryEventStore();
    const merged = new OrchestrationEventStore({ legacy, canonical: () => canonical });
    const runManagerEvents = new CanonicalRunManagerEventStore(canonical, merged);
    await legacy.append(event('tool-result', 'tool.call.completed', '2026-07-21T06:00:00.000Z'));

    await runManagerEvents.append(
      event('context-started', 'context.build.started', '2026-07-21T06:00:01.000Z')
    );
    await expect(
      runManagerEvents.append(
        event('model-result', 'model.call.completed', '2026-07-21T06:00:02.000Z')
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_EVENT_FAMILY_NOT_MIGRATED' });
    await expect(runManagerEvents.list({ runId: 'run-1' })).resolves.toEqual([
      expect.objectContaining({ id: 'tool-result' }),
      expect.objectContaining({ id: 'context-started' }),
    ]);
  });

  it('inherits the unique persisted Run owner scope for legacy canonical trace events', async () => {
    const legacy = new InMemoryEventStore();
    const canonical = new InMemoryEventStore();
    const store = new OrchestrationEventStore({ legacy, canonical: () => canonical });
    await canonical.append(event('run-created', 'run.created', '2026-07-21T06:00:00.000Z'));
    const review = event('human-review', 'human.review.requested', '2026-07-21T06:00:01.000Z');
    delete review.userId;
    review.metadata = {};

    await store.append(review);

    await expect(canonical.list({ runId: 'run-1' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'human-review',
          userId: 'user-1',
          sessionId: 'session-1',
          metadata: expect.objectContaining({ userId: 'user-1' }),
        }),
      ])
    );
  });

  it('rejects ownerless canonical trace events without a persisted Run scope', async () => {
    const legacy = new InMemoryEventStore();
    const canonical = new InMemoryEventStore();
    const store = new OrchestrationEventStore({ legacy, canonical: () => canonical });
    const review = event('human-review', 'human.review.requested', '2026-07-21T06:00:01.000Z');
    delete review.userId;
    review.metadata = {};

    await expect(store.append(review)).rejects.toMatchObject({
      code: 'RUNTIME_INVALID_INPUT',
      context: { eventId: 'human-review', runId: 'run-1' },
    });
    await expect(canonical.list()).resolves.toEqual([]);
  });

  it('migrates canonical families idempotently without copying module events', async () => {
    const canonical = new InMemoryEventStore();
    const source = [
      event('run-created', 'run.created', '2026-07-21T06:00:00.000Z'),
      event('model-result', 'model.call.completed', '2026-07-21T06:00:01.000Z'),
    ];

    const first = await migrateCanonicalEventFamilies({ sourceEvents: source, canonical });
    const second = await migrateCanonicalEventFamilies({ sourceEvents: source, canonical });

    expect(first).toMatchObject({
      scannedEvents: 2,
      eligibleEvents: 1,
      migratedEvents: 1,
      quarantinedEvents: 0,
    });
    expect(second).toMatchObject({
      eligibleEvents: 1,
      migratedEvents: 0,
      alreadyCanonicalEvents: 1,
    });
    await expect(canonical.list()).resolves.toHaveLength(1);
  });

  it('audits valid canonical Run streams before Runtime workers start', () => {
    const report = auditCanonicalRuntimeStreams(
      persistedEvents([
        event('run-created', 'run.created', '2026-07-21T06:00:00.000Z'),
        event('run-started', 'run.started', '2026-07-21T06:00:01.000Z'),
      ])
    );

    expect(report).toEqual({
      scannedStreams: 1,
      validatedStreams: 1,
      ignoredStreams: 0,
      quarantinedStreams: 0,
      entries: [],
    });
  });

  it('quarantines canonical streams whose first orchestration fact precedes run.created', () => {
    const report = auditCanonicalRuntimeStreams(
      persistedEvents([event('state-entered', 'fsm.state.entered', '2026-07-21T06:00:00.000Z')])
    );

    expect(report).toMatchObject({
      scannedStreams: 1,
      validatedStreams: 0,
      ignoredStreams: 0,
      quarantinedStreams: 1,
      entries: [
        {
          userId: 'user-1',
          runId: 'run-1',
          eventId: 'state-entered',
          eventType: 'fsm.state.entered',
        },
      ],
    });
    expect(report.entries[0]?.reason).toContain('Run Event precedes run.created');
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

function persistedEvents(events: ReturnType<typeof event>[]) {
  return createPersistedEventBatch(
    {
      scope: { userId: 'user-1', runId: 'run-1' },
      events,
      expectedLastSequence: 0,
      expectedRunRevision: 0,
      idempotencyKey: 'canonical-stream-audit',
    },
    1,
    1,
    '2026-07-21T06:00:00.000Z'
  );
}
