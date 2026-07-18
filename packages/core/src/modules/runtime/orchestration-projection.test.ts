import { describe, expect, it } from 'vitest';
import type { EventCreateInput, FrameworkEventType } from '../../events';
import type { JsonSchema } from '../../specs';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import { DurableEventRuntime } from './event-runtime';
import { eventStreamKey, InMemoryDurableEventStore, type EventStreamScope } from './event-store';
import {
  createRuntimeOrchestrationProjectionDefinition,
  RUNTIME_ORCHESTRATION_PROJECTION_ID,
} from './orchestration-projection';
import { InMemoryProjectionStore, ProjectionEngine } from './projection';

const scope: EventStreamScope = {
  tenantId: 'tenant.orchestration',
  userId: 'user.orchestration',
  runId: 'run.orchestration',
};

const eventTypes: FrameworkEventType[] = [
  'run.created',
  'run.started',
  'run.waiting_human',
  'run.waiting_signal',
  'run.completed',
  'run.failed',
  'run.cancelled',
  'fsm.transition.accepted',
  'fsm.state.entered',
  'fsm.state.exited',
  'runtime.activity.requested',
  'runtime.activity.completed',
  'runtime.activity.failed',
  'runtime.activity.waiting',
  'runtime.activity.cancelled',
];

const payloadSchema: JsonSchema = { type: 'object', additionalProperties: true };

async function fixture() {
  const schemas = new InMemoryEventSchemaRegistry();
  for (const eventType of eventTypes) {
    await schemas.register({
      eventType,
      version: '1.0.0',
      schema: payloadSchema,
      schemaHash: hashCanonicalJson(payloadSchema),
    });
  }
  const store = new InMemoryDurableEventStore({
    schemaRegistry: schemas,
    now: () => '2026-07-18T04:00:01.000Z',
  });
  const events = new DurableEventRuntime({ store });
  return {
    events,
    projectionStore: new InMemoryProjectionStore(),
    engine: new ProjectionEngine({
      events,
      now: () => '2026-07-18T04:00:02.000Z',
    }),
  };
}

function event(
  id: string,
  type: FrameworkEventType,
  payload: Record<string, unknown> = {}
): EventCreateInput {
  return {
    id,
    type,
    version: '1.0.0',
    tenantId: scope.tenantId,
    userId: scope.userId,
    runId: scope.runId,
    timestamp: '2026-07-18T04:00:00.000Z',
    payload,
  };
}

async function append(target: Awaited<ReturnType<typeof fixture>>, events: EventCreateInput[]) {
  const head = await target.events.getStreamHead(scope);
  return target.events.append({
    scope,
    events,
    expectedLastSequence: head?.lastSequence ?? 0,
    ...(head === null ? {} : { expectedRunRevision: head.runRevision }),
    fencingToken: 1,
    idempotencyKey: `append:${events.map((item) => item.id).join(':')}`,
  });
}

describe('Runtime orchestration projection', () => {
  it('rebuilds Run, FSM, state attempt, transition, and pending Activity state', async () => {
    const target = await fixture();
    await append(target, [
      event('run.created', 'run.created'),
      event('run.started', 'run.started'),
      event('state.intake.1', 'fsm.state.entered', { stateId: 'Intake' }),
      event('transition.acting', 'fsm.transition.accepted', { from: 'Intake', to: 'Acting' }),
      event('state.intake.exit', 'fsm.state.exited', { stateId: 'Intake' }),
      event('state.acting.1', 'fsm.state.entered', { stateId: 'Acting' }),
      event('activity.requested', 'runtime.activity.requested', {
        invocation: { activityId: 'activity.1' },
      }),
      event('activity.waiting', 'runtime.activity.waiting', { activityId: 'activity.1' }),
    ]);

    const definition = createRuntimeOrchestrationProjectionDefinition(scope.runId);
    const waiting = await target.engine.update(definition, target.projectionStore, scope);
    expect(waiting).toMatchObject({
      state: {
        runStatus: 'running',
        currentState: 'Acting',
        statePath: ['Intake', 'Acting'],
        stateVisitCounts: { Intake: 1, Acting: 1 },
        stateAttempt: 1,
        pendingActivityIds: ['activity.1'],
      },
      lastSequence: 8,
    });

    await append(target, [
      event('activity.completed', 'runtime.activity.completed', { activityId: 'activity.1' }),
      event('transition.completed', 'fsm.transition.accepted', {
        from: 'Acting',
        to: 'Completed',
      }),
      event('state.completed.1', 'fsm.state.entered', { stateId: 'Completed' }),
      event('run.completed', 'run.completed', { terminalState: 'Completed' }),
    ]);
    const completed = await target.engine.update(definition, target.projectionStore, scope);
    expect(completed).toMatchObject({
      state: {
        runStatus: 'completed',
        currentState: 'Completed',
        terminalState: 'Completed',
        stateAttempt: 1,
        pendingActivityIds: [],
      },
      lastSequence: 12,
      revision: 2,
    });

    await target.projectionStore.delete?.(definition.id, completed.key);
    await expect(
      target.engine.rebuild(definition, target.projectionStore, scope)
    ).resolves.toMatchObject({ state: completed.state, lastSequence: 12 });
  });

  it('increments stateAttempt when recovery re-enters the same state', async () => {
    const target = await fixture();
    await append(target, [
      event('run.created', 'run.created'),
      event('run.started', 'run.started'),
      event('state.acting.1', 'fsm.state.entered', { stateId: 'Acting' }),
      event('state.acting.2', 'fsm.state.entered', { stateId: 'Acting' }),
    ]);

    await expect(
      target.engine.update(
        createRuntimeOrchestrationProjectionDefinition(scope.runId),
        target.projectionStore,
        scope
      )
    ).resolves.toMatchObject({
      state: {
        currentState: 'Acting',
        statePath: ['Acting', 'Acting'],
        stateVisitCounts: { Acting: 2 },
        stateAttempt: 2,
      },
    });
  });

  it('rebuilds legacy waiting Events that predate explicit Wait creation', async () => {
    const target = await fixture();
    await append(target, [
      event('run.created', 'run.created'),
      event('run.started', 'run.started'),
      event('state.acting.1', 'fsm.state.entered', { stateId: 'Acting' }),
      event('legacy.waiting', 'run.waiting_signal', {
        stateId: 'Acting',
        wait: { type: 'signal', key: 'legacy.signal' },
      }),
    ]);

    await expect(
      target.engine.rebuild(
        createRuntimeOrchestrationProjectionDefinition(scope.runId),
        target.projectionStore,
        scope
      )
    ).resolves.toMatchObject({
      projectionVersion: '1.2.0',
      state: {
        runStatus: 'waiting_signal',
        pendingWait: {
          waitId: 'legacy-wait:legacy.waiting',
          stateId: 'Acting',
          stateAttempt: 1,
          type: 'signal',
          key: 'legacy.signal',
        },
      },
    });
  });

  it.each([
    {
      name: 'Run lifecycle before creation',
      events: [event('run.started', 'run.started')],
    },
    {
      name: 'FSM state before Run start',
      events: [
        event('run.created', 'run.created'),
        event('state.intake', 'fsm.state.entered', { stateId: 'Intake' }),
      ],
    },
    {
      name: 'transition from a stale state',
      events: [
        event('run.created', 'run.created'),
        event('run.started', 'run.started'),
        event('state.intake', 'fsm.state.entered', { stateId: 'Intake' }),
        event('transition.invalid', 'fsm.transition.accepted', { from: 'Other', to: 'Acting' }),
      ],
    },
    {
      name: 'Activity result without request',
      events: [
        event('run.created', 'run.created'),
        event('run.started', 'run.started'),
        event('activity.completed', 'runtime.activity.completed', { activityId: 'activity.1' }),
      ],
    },
  ])('rejects replay divergence: $name', async ({ events }) => {
    const target = await fixture();
    await append(target, events);
    await expect(
      target.engine.update(
        createRuntimeOrchestrationProjectionDefinition(scope.runId),
        target.projectionStore,
        scope
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_REPLAY_DIVERGENCE' });
    await expect(
      target.projectionStore.get(RUNTIME_ORCHESTRATION_PROJECTION_ID, eventStreamKey(scope))
    ).resolves.toBeNull();
  });
});
