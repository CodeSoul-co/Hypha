import { describe, expect, it } from 'vitest';
import {
  DurableEventRuntime,
  InMemoryDurableEventStore,
  InMemoryEventSchemaRegistry,
  InMemoryProjectionStore,
  InMemoryRunLeaseStore,
  ProjectionEngine,
  registerRuntimeOrchestrationEventSchemas,
  type EventCreateInput,
  type RuntimeOrchestrationProjection,
  type RuntimeScope,
} from '@codesoul-co/core';
import type { FSMProcessSpec } from '@codesoul-co/fsm';
import {
  GovernedFSMTransitionService,
  type ManualFSMTransitionCommand,
} from './manual-fsm-transition';

const scope: RuntimeScope = {
  userId: 'user.manual',
  sessionId: 'session.manual',
  runId: 'run.manual',
};

const process: FSMProcessSpec = {
  id: 'domain.release-approval',
  version: '1.0.0',
  initialState: 'Draft',
  states: [
    { id: 'Draft', kind: 'domain' },
    { id: 'Approved', kind: 'completed' },
  ],
  transitions: [{ from: 'Draft', to: 'Approved', guard: 'variables.approved == true' }],
  terminalStates: ['Approved'],
};

function clock() {
  let tick = 0;
  const origin = Date.UTC(2026, 7, 13, 8, 0, 0);
  return () => new Date(origin + tick++).toISOString();
}

async function fixture() {
  const now = clock();
  const schemas = new InMemoryEventSchemaRegistry();
  await registerRuntimeOrchestrationEventSchemas(schemas);
  const store = new InMemoryDurableEventStore({ schemaRegistry: schemas, now });
  const events = new DurableEventRuntime({ store, now });
  const projectionStore = new InMemoryProjectionStore<RuntimeOrchestrationProjection>();
  const projections = new ProjectionEngine({ events, now });
  const runLeases = new InMemoryRunLeaseStore({ now });
  let sequence = 0;
  const service = new GovernedFSMTransitionService({
    events,
    projections,
    projectionStore,
    runLeases,
    now,
    nextId: (namespace) => `${namespace}.${++sequence}`,
  });
  await events.append({
    scope: { userId: scope.userId, runId: scope.runId },
    events: [
      event('run.created', 'created', { runId: scope.runId }, now()),
      event('run.started', 'started', { runId: scope.runId }, now()),
      event('fsm.state.entered', 'initial', { stateId: 'Draft' }, now(), 'Draft'),
    ],
    expectedLastSequence: 0,
    idempotencyKey: 'seed.manual-run',
  });
  return { events, service, now };
}

function command(
  runRevision: number,
  now: () => string,
  overrides: Partial<ManualFSMTransitionCommand> = {}
): ManualFSMTransitionCommand {
  return {
    commandId: 'command.approve',
    scope,
    principal: {
      principalId: scope.userId,
      type: 'user',
      userId: scope.userId,
      permissionScopes: ['runtime.fsm.transition'],
    },
    ownerId: 'test.manual',
    leaseTtlMs: 30_000,
    processId: process.id,
    processVersion: process.version,
    expectedState: 'Draft',
    expectedRunRevision: runRevision,
    targetState: 'Approved',
    reason: 'Release owner approved the transition.',
    requestedAt: now(),
    guardContext: { variables: { approved: true } },
    idempotencyKey: 'approve-release',
    ...overrides,
  };
}

function event(
  type: EventCreateInput['type'],
  suffix: string,
  payload: Record<string, unknown>,
  timestamp: string,
  fsmState?: string
): EventCreateInput {
  return {
    id: `seed.${suffix}`,
    type,
    version: '1.0.0',
    userId: scope.userId,
    sessionId: scope.sessionId,
    runId: scope.runId,
    ...(fsmState === undefined ? {} : { fsmState }),
    timestamp,
    payload,
  };
}

describe('GovernedFSMTransitionService', () => {
  it('inspects and atomically applies an allowed custom FSM edge', async () => {
    const target = await fixture();
    const before = await target.service.inspect(scope, process);
    expect(before).toMatchObject({
      currentState: 'Draft',
      runStatus: 'running',
      allowedTransitions: [{ to: 'Approved', guard: 'variables.approved == true' }],
    });

    const request = command(before.runRevision, target.now);
    const result = await target.service.transition(process, request);
    expect(result).toMatchObject({
      disposition: 'applied',
      view: { currentState: 'Approved', runStatus: 'completed', allowedTransitions: [] },
    });
    const written = await target.events.read({
      scope: { userId: scope.userId, runId: scope.runId },
    });
    expect(written.slice(-5).map((item) => item.type)).toEqual([
      'fsm.transition.requested',
      'fsm.state.exited',
      'fsm.transition.accepted',
      'fsm.state.entered',
      'run.completed',
    ]);

    const reused = await target.service.transition(process, {
      ...request,
      requestedAt: target.now(),
    });
    expect(reused.disposition).toBe('reused');
  });

  it('rejects stale revisions, failed guards, and missing permission', async () => {
    const stale = await fixture();
    const staleView = await stale.service.inspect(scope, process);
    await expect(
      stale.service.transition(process, command(staleView.runRevision + 1, stale.now))
    ).rejects.toThrow(/revision changed/);

    const guarded = await fixture();
    const guardedView = await guarded.service.inspect(scope, process);
    await expect(
      guarded.service.transition(
        process,
        command(guardedView.runRevision, guarded.now, {
          guardContext: { variables: { approved: false } },
        })
      )
    ).rejects.toThrow(/guard rejected/i);
    const guardedEvents = await guarded.events.read({
      scope: { userId: scope.userId, runId: scope.runId },
    });
    expect(guardedEvents.some((item) => item.type === 'fsm.transition.rejected')).toBe(true);
    expect(guardedEvents.some((item) => item.type === 'fsm.transition.accepted')).toBe(false);

    const denied = await fixture();
    const deniedView = await denied.service.inspect(scope, process);
    await expect(
      denied.service.transition(
        process,
        command(deniedView.runRevision, denied.now, {
          principal: {
            principalId: scope.userId,
            type: 'user',
            userId: scope.userId,
            permissionScopes: [],
          },
        })
      )
    ).rejects.toThrow(/lacks runtime\.fsm\.transition/);
  });
});
