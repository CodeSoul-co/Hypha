import { describe, expect, it } from 'vitest';
import type { EventCreateInput } from '../../events';
import { eventStreamKey, InMemoryEventStoreV2, type EventStreamScope } from './event-store';
import { InMemoryProjectionStore, ProjectionEngine, type ProjectionDefinition } from './projection';

interface CountProjection {
  count: number;
  eventIds: string[];
}

const scope: EventStreamScope = {
  tenantId: 'tenant.projection',
  userId: 'user.projection',
  runId: 'run.projection',
};

const definition: ProjectionDefinition<CountProjection> = {
  id: 'projection.event-count',
  version: '1.0.0',
  initialState: () => ({ count: 0, eventIds: [] }),
  applies: (event) => event.type.startsWith('run.'),
  reduce: (state, event) => ({
    count: state.count + 1,
    eventIds: [...state.eventIds, event.id],
  }),
};

function event(id: string, type: EventCreateInput['type']): EventCreateInput {
  return {
    id,
    type,
    runId: scope.runId,
    timestamp: '2026-07-17T03:00:00.000Z',
    payload: { id },
  };
}

describe('ProjectionEngine', () => {
  it('checkpoints and incrementally advances by persisted sequence', async () => {
    const events = new InMemoryEventStoreV2();
    const projections = new InMemoryProjectionStore<CountProjection>();
    const engine = new ProjectionEngine({
      events,
      now: () => '2026-07-17T03:00:01.000Z',
    });
    await events.append({
      scope,
      events: [event('event.1', 'run.created'), event('event.2', 'run.started')],
      expectedLastSequence: 0,
      idempotencyKey: 'append.projection.1',
    });

    const first = await engine.update(definition, projections, scope);
    expect(first).toMatchObject({
      state: { count: 2, eventIds: ['event.1', 'event.2'] },
      lastSequence: 2,
      revision: 1,
    });
    await events.append({
      scope,
      events: [event('event.3', 'run.completed')],
      expectedLastSequence: 2,
      expectedRunRevision: 1,
      idempotencyKey: 'append.projection.2',
    });

    const second = await engine.update(definition, projections, scope);
    expect(second).toMatchObject({
      state: { count: 3, eventIds: ['event.1', 'event.2', 'event.3'] },
      lastSequence: 3,
      revision: 2,
    });
    await expect(engine.update(definition, projections, scope)).resolves.toEqual(second);
  });

  it('rebuilds deterministically from Event truth', async () => {
    const events = new InMemoryEventStoreV2();
    const projections = new InMemoryProjectionStore<CountProjection>();
    const engine = new ProjectionEngine({ events });
    await events.append({
      scope,
      events: [event('event.1', 'run.created'), event('event.2', 'run.completed')],
      expectedLastSequence: 0,
      idempotencyKey: 'append.rebuild',
    });
    const projected = await engine.update(definition, projections, scope);
    const rebuilt = await engine.rebuild(definition, projections, scope);

    expect(rebuilt.state).toEqual(projected.state);
    expect(rebuilt.lastSequence).toBe(projected.lastSequence);
    expect(rebuilt.revision).toBe(projected.revision + 1);
  });

  it('does not replace a checkpoint when reduction fails', async () => {
    const events = new InMemoryEventStoreV2();
    const projections = new InMemoryProjectionStore<CountProjection>();
    const engine = new ProjectionEngine({ events });
    await events.append({
      scope,
      events: [event('event.1', 'run.created')],
      expectedLastSequence: 0,
      idempotencyKey: 'append.failure.1',
    });
    const checkpoint = await engine.update(definition, projections, scope);
    await events.append({
      scope,
      events: [event('event.2', 'run.failed')],
      expectedLastSequence: 1,
      expectedRunRevision: 1,
      idempotencyKey: 'append.failure.2',
    });
    const failing: ProjectionDefinition<CountProjection> = {
      ...definition,
      reduce: (state, current) => {
        if (current.type === 'run.failed') throw new Error('fixture failure');
        return definition.reduce(state, current);
      },
    };

    await expect(engine.update(failing, projections, scope)).rejects.toMatchObject({
      code: 'RUNTIME_PROJECTION_FAILED',
    });
    await expect(projections.get(definition.id, eventStreamKey(scope))).resolves.toEqual(
      checkpoint
    );
    await expect(events.readStream(scope)).resolves.toHaveLength(2);
  });

  it('keeps checkpoints isolated when users reuse a run id', async () => {
    const events = new InMemoryEventStoreV2();
    const projections = new InMemoryProjectionStore<CountProjection>();
    const engine = new ProjectionEngine({ events });
    const otherScope = { ...scope, userId: 'user.projection.other' };
    await events.append({
      scope,
      events: [event('event.1', 'run.created')],
      expectedLastSequence: 0,
      idempotencyKey: 'append.scope.1',
    });
    await events.append({
      scope: otherScope,
      events: [{ ...event('event.other', 'run.created'), userId: otherScope.userId }],
      expectedLastSequence: 0,
      idempotencyKey: 'append.scope.other',
    });

    const own = await engine.update(definition, projections, scope, 'tenant/user/run');
    const other = await engine.update(definition, projections, otherScope, 'tenant/other/run');
    expect(own.state.eventIds).toEqual(['event.1']);
    expect(other.state.eventIds).toEqual(['event.other']);
  });
});
