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
  'run.cancel.requested',
  'run.cancelling',
  'run.waiting_human',
  'run.waiting_signal',
  'run.completed',
  'run.failed',
  'run.cancelled',
  'human.review.requested',
  'fsm.transition.accepted',
  'fsm.state.entered',
  'fsm.state.exited',
  'runtime.activity.requested',
  'runtime.activity.completed',
  'runtime.activity.failed',
  'runtime.activity.waiting',
  'runtime.activity.cancelled',
  'inference.requested',
  'inference.completed',
  'llm.cache.lookup',
  'llm.cache.hit',
  'llm.cache.miss',
  'llm.cache.write',
  'llm.cache.bypass',
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

  it('preserves identical Run and FSM semantics with serving cache enabled or disabled', async () => {
    const withoutCache = await fixture();
    const withCache = await fixture();
    const lifecycle = [
      event('run.created', 'run.created'),
      event('run.started', 'run.started'),
      event('state.reasoning.1', 'fsm.state.entered', { stateId: 'Reasoning' }),
      event('inference.requested', 'inference.requested', {
        stepId: 'reasoning.1',
        modelAlias: 'default-fast',
      }),
      event('inference.completed', 'inference.completed', {
        responseId: 'response.1',
        usage: { totalTokens: 12 },
      }),
      event('transition.completed', 'fsm.transition.accepted', {
        from: 'Reasoning',
        to: 'Completed',
      }),
      event('state.reasoning.exit', 'fsm.state.exited', { stateId: 'Reasoning' }),
      event('state.completed.1', 'fsm.state.entered', { stateId: 'Completed' }),
      event('run.completed', 'run.completed', { terminalState: 'Completed' }),
    ];
    await append(withoutCache, lifecycle);
    await append(withCache, [
      ...lifecycle.slice(0, 4),
      event('cache.lookup', 'llm.cache.lookup', { key: 'llm:exact:test' }),
      event('cache.hit', 'llm.cache.hit', { key: 'llm:exact:test' }),
      ...lifecycle.slice(4),
    ]);

    const definition = createRuntimeOrchestrationProjectionDefinition(scope.runId);
    const cacheDisabledProjection = await withoutCache.engine.rebuild(
      definition,
      withoutCache.projectionStore,
      scope
    );
    const cacheEnabledProjection = await withCache.engine.rebuild(
      definition,
      withCache.projectionStore,
      scope
    );

    expect(cacheEnabledProjection.state).toEqual(cacheDisabledProjection.state);
    expect(cacheEnabledProjection.state).toMatchObject({
      runStatus: 'completed',
      currentState: 'Completed',
      terminalState: 'Completed',
      statePath: ['Reasoning', 'Completed'],
      stateAttempt: 1,
    });
  });

  it('projects a durable cancelling lifecycle before terminal cancellation', async () => {
    const target = await fixture();
    await append(target, [
      event('run.created', 'run.created'),
      event('run.started', 'run.started'),
      event('state.acting.1', 'fsm.state.entered', { stateId: 'Acting' }),
      event('cancel.requested', 'run.cancel.requested', {
        commandId: 'cancel.1',
        principalId: 'principal.1',
        reason: 'operator request',
        requestedAt: '2026-07-18T04:00:00.000Z',
      }),
      event('run.cancelling', 'run.cancelling', { commandId: 'cancel.1' }),
    ]);

    const definition = createRuntimeOrchestrationProjectionDefinition(scope.runId);
    await expect(
      target.engine.update(definition, target.projectionStore, scope)
    ).resolves.toMatchObject({
      projectionVersion: '1.4.0',
      state: {
        runStatus: 'cancelling',
        cancellation: {
          commandId: 'cancel.1',
          principalId: 'principal.1',
          reason: 'operator request',
        },
      },
    });

    await append(target, [event('run.cancelled', 'run.cancelled', { terminalState: 'Acting' })]);
    await expect(
      target.engine.update(definition, target.projectionStore, scope)
    ).resolves.toMatchObject({
      state: { runStatus: 'cancelled', terminalState: 'Acting' },
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
      projectionVersion: '1.4.0',
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

  it('migrates a legacy Human Wait when a stable Tool action is present', async () => {
    const target = await fixture();
    await append(target, [
      event('run.created', 'run.created'),
      event('run.started', 'run.started'),
      event('state.acting.1', 'fsm.state.entered', { stateId: 'Acting' }),
      event('legacy.human.waiting', 'run.waiting_human', {
        tool: 'approval-test-tool',
        reason: 'Integration approval required',
      }),
    ]);

    await expect(
      target.engine.rebuild(
        createRuntimeOrchestrationProjectionDefinition(scope.runId),
        target.projectionStore,
        scope
      )
    ).resolves.toMatchObject({
      state: {
        runStatus: 'waiting_human',
        pendingWait: {
          waitId: 'legacy-human-wait:legacy.human.waiting',
          stateId: 'Acting',
          stateAttempt: 1,
          type: 'human',
          pendingActionRef: 'tool:approval-test-tool',
          reason: 'Integration approval required',
        },
      },
    });
  });

  it('migrates a legacy Human Wait from a preceding review request', async () => {
    const target = await fixture();
    await append(target, [
      event('run.created', 'run.created'),
      event('run.started', 'run.started'),
      event('state.acting.1', 'fsm.state.entered', { stateId: 'Acting' }),
      event('review.requested', 'human.review.requested', {
        taskId: 'review-task:legacy',
      }),
      event('legacy.human.waiting', 'run.waiting_human', {
        reason: 'Review task persisted before the Wait contract existed',
      }),
    ]);

    await expect(
      target.engine.rebuild(
        createRuntimeOrchestrationProjectionDefinition(scope.runId),
        target.projectionStore,
        scope
      )
    ).resolves.toMatchObject({
      state: {
        runStatus: 'waiting_human',
        pendingWait: {
          type: 'human',
          pendingActionRef: 'review-task:legacy',
        },
      },
    });
  });

  it('quarantines a legacy Human Wait without stable pending-action evidence', async () => {
    const target = await fixture();
    await append(target, [
      event('run.created', 'run.created'),
      event('run.started', 'run.started'),
      event('state.acting.1', 'fsm.state.entered', { stateId: 'Acting' }),
      event('legacy.human.waiting', 'run.waiting_human', {
        reason: 'No action reference was persisted',
      }),
    ]);

    await expect(
      target.engine.rebuild(
        createRuntimeOrchestrationProjectionDefinition(scope.runId),
        target.projectionStore,
        scope
      )
    ).rejects.toMatchObject({
      code: 'RUNTIME_REPLAY_DIVERGENCE',
      context: {
        migration: {
          status: 'quarantined',
          eventId: 'legacy.human.waiting',
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
