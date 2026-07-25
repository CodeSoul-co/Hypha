import { describe, expect, it } from 'vitest';
import type { EventCreateInput } from '../../events';
import type { JsonSchema } from '../../specs';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import { DurableEventRuntime } from './event-runtime';
import { InMemoryDurableEventStore, type EventStreamScope } from './event-store';
import { InMemoryProjectionStore, ProjectionEngine, type ProjectionDefinition } from './projection';

const scope: EventStreamScope = {
  tenantId: 'tenant.projection',
  userId: 'user.projection',
  runId: 'run.projection',
};

const payloadSchema: JsonSchema = {
  type: 'object',
  required: ['value'],
  properties: { value: { type: 'integer' } },
  additionalProperties: false,
};

interface CounterState {
  total: number;
  appliedEventIds: string[];
}

function counterDefinition(version = '1.0.0'): ProjectionDefinition<CounterState> {
  return {
    id: 'projection.counter',
    version,
    initialState: () => ({ total: 0, appliedEventIds: [] }),
    applies: (event) => event.type === 'run.started',
    reduce: (state, event) => ({
      total: state.total + (event.payload as { value: number }).value,
      appliedEventIds: [...state.appliedEventIds, event.id],
    }),
  };
}

async function fixture() {
  const schemas = new InMemoryEventSchemaRegistry();
  for (const eventType of ['run.created', 'run.started'] as const) {
    await schemas.register({
      eventType,
      version: '1.0.0',
      schema: payloadSchema,
      schemaHash: hashCanonicalJson(payloadSchema),
    });
  }
  const eventStore = new InMemoryDurableEventStore({
    schemaRegistry: schemas,
    now: () => '2026-07-18T03:00:01.000Z',
  });
  const events = new DurableEventRuntime({ store: eventStore });
  const projections = new InMemoryProjectionStore<CounterState>();
  const engine = new ProjectionEngine({
    events,
    now: () => '2026-07-18T03:00:02.000Z',
  });
  return { eventStore, events, projections, engine };
}

function event(id: string, type: 'run.created' | 'run.started', value: number): EventCreateInput {
  return {
    id,
    type,
    version: '1.0.0',
    tenantId: scope.tenantId,
    userId: scope.userId,
    runId: scope.runId,
    timestamp: '2026-07-18T03:00:00.000Z',
    payload: { value },
  };
}

describe('ProjectionEngine', () => {
  it('updates incrementally while advancing across irrelevant Events', async () => {
    const target = await fixture();
    await target.events.append({
      scope,
      events: [event('event.1', 'run.created', 1), event('event.2', 'run.started', 2)],
      expectedLastSequence: 0,
      fencingToken: 1,
      idempotencyKey: 'append.1',
    });

    const first = await target.engine.update(counterDefinition(), target.projections, scope);
    expect(first).toMatchObject({
      state: { total: 2, appliedEventIds: ['event.2'] },
      lastSequence: 2,
      revision: 1,
    });

    await target.events.append({
      scope,
      events: [event('event.3', 'run.created', 3), event('event.4', 'run.started', 4)],
      expectedLastSequence: 2,
      expectedRunRevision: 1,
      fencingToken: 1,
      idempotencyKey: 'append.2',
    });
    const second = await target.engine.update(counterDefinition(), target.projections, scope);
    expect(second).toMatchObject({
      state: { total: 6, appliedEventIds: ['event.2', 'event.4'] },
      lastSequence: 4,
      revision: 2,
    });

    second.state.total = 999;
    await expect(target.projections.get('projection.counter', second.key)).resolves.toMatchObject({
      state: { total: 6 },
    });
    await expect(
      target.engine.update(counterDefinition(), target.projections, scope)
    ).resolves.toMatchObject({ revision: 2, lastSequence: 4 });
  });

  it('rebuilds from sequence one when the Projection version changes', async () => {
    const target = await fixture();
    await target.events.append({
      scope,
      events: [event('event.1', 'run.started', 2), event('event.2', 'run.started', 4)],
      expectedLastSequence: 0,
      idempotencyKey: 'append.version',
    });
    await target.engine.update(counterDefinition(), target.projections, scope);
    const versionTwo: ProjectionDefinition<CounterState> = {
      ...counterDefinition('2.0.0'),
      initialState: () => ({ total: 100, appliedEventIds: [] }),
      reduce: (state, item) => ({
        total: state.total - (item.payload as { value: number }).value,
        appliedEventIds: [...state.appliedEventIds, item.id],
      }),
    };

    await expect(
      target.engine.update(versionTwo, target.projections, scope)
    ).resolves.toMatchObject({
      projectionVersion: '2.0.0',
      state: { total: 94, appliedEventIds: ['event.1', 'event.2'] },
      lastSequence: 2,
      revision: 2,
    });
  });

  it('keeps the prior Projection unchanged when reduction fails', async () => {
    const target = await fixture();
    await target.events.append({
      scope,
      events: [event('event.1', 'run.started', 1)],
      expectedLastSequence: 0,
      idempotencyKey: 'append.safe',
    });
    const current = await target.engine.update(counterDefinition(), target.projections, scope);
    await target.events.append({
      scope,
      events: [event('event.2', 'run.started', 99)],
      expectedLastSequence: 1,
      expectedRunRevision: 1,
      idempotencyKey: 'append.failure',
    });
    const failing: ProjectionDefinition<CounterState> = {
      ...counterDefinition(),
      reduce(state, item) {
        if ((item.payload as { value: number }).value === 99) throw new Error('invalid value');
        return counterDefinition().reduce(state, item);
      },
    };

    await expect(target.engine.update(failing, target.projections, scope)).rejects.toMatchObject({
      code: 'RUNTIME_PROJECTION_FAILED',
    });
    await expect(target.projections.get(failing.id, current.key)).resolves.toEqual(current);
  });

  it('allows only one concurrent writer at a Projection revision', async () => {
    const target = await fixture();
    await target.events.append({
      scope,
      events: [event('event.1', 'run.started', 1)],
      expectedLastSequence: 0,
      idempotencyKey: 'append.concurrent.1',
    });
    const initial = await target.engine.update(counterDefinition(), target.projections, scope);
    await target.events.append({
      scope,
      events: [event('event.2', 'run.started', 2)],
      expectedLastSequence: 1,
      expectedRunRevision: 1,
      idempotencyKey: 'append.concurrent.2',
    });

    const results = await Promise.allSettled([
      target.engine.update(counterDefinition(), target.projections, scope),
      target.engine.update(counterDefinition(), target.projections, scope),
    ]);
    expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
    expect(results.filter((result) => result.status === 'rejected')).toHaveLength(1);
    await expect(target.projections.get('projection.counter', initial.key)).resolves.toMatchObject({
      state: { total: 3 },
      lastSequence: 2,
      revision: 2,
    });
  });

  it('rejects Event gaps and non-persistable Projection state', async () => {
    const target = await fixture();
    await target.events.append({
      scope,
      events: [event('event.1', 'run.started', 1)],
      expectedLastSequence: 0,
      idempotencyKey: 'append.validation',
    });
    const [persisted] = await target.events.read({ scope });
    const corruptEngine = new ProjectionEngine({
      events: {
        async read() {
          return [{ ...persisted, sequence: 2 }];
        },
      },
    });
    await expect(
      corruptEngine.update(counterDefinition(), new InMemoryProjectionStore(), scope)
    ).rejects.toMatchObject({ code: 'RUNTIME_EVENT_STREAM_CORRUPT' });

    const invalidState: ProjectionDefinition<Record<string, unknown>> = {
      id: 'projection.invalid',
      version: '1.0.0',
      initialState: () => ({}),
      applies: () => true,
      reduce: () => ({ value: undefined }),
    };
    await expect(
      target.engine.update(invalidState, new InMemoryProjectionStore(), scope)
    ).rejects.toMatchObject({ code: 'RUNTIME_PROJECTION_FAILED' });
  });
});
