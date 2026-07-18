import { describe, expect, it } from 'vitest';
import {
  InMemoryDurableEventStore,
  InMemoryEventSchemaRegistry,
  InMemoryProjectionStore,
  InMemoryRunLeaseStore,
  InMemoryStateExecutionClaimStore,
  DurableEventRuntime,
  ProjectionEngine,
  RuntimeRunControlService,
  hashCanonicalJson,
  type EventCreateInput,
  type FrameworkEventType,
  type JsonSchema,
  type RuntimeOrchestrationProjection,
  type RuntimeScope,
} from '@hypha/core';
import type { FSMProcessSpec } from '@hypha/fsm';
import {
  FencedBoundedFSMDriver,
  type BoundedStateExecutorInput,
  type BoundedStateExecutionDecision,
} from './bounded-fsm-driver';

const scope: RuntimeScope = {
  tenantId: 'tenant.driver',
  userId: 'user.driver',
  workspaceId: 'workspace.driver',
  sessionId: 'session.driver',
  runId: 'run.driver',
  agentId: 'agent.driver',
};

const process: FSMProcessSpec = {
  id: 'process.driver',
  version: '1.0.0',
  name: 'Bounded driver process',
  initialState: 'Start',
  states: [
    { id: 'Start', kind: 'domain' },
    { id: 'Work', kind: 'domain' },
    { id: 'Completed', kind: 'completed' },
    { id: 'Failed', kind: 'failed' },
  ],
  transitions: [
    { from: 'Start', to: 'Work' },
    { from: 'Start', to: 'Completed' },
    { from: 'Work', to: 'Completed' },
    { from: 'Start', to: 'Failed' },
    { from: 'Work', to: 'Failed' },
  ],
  terminalStates: ['Completed', 'Failed'],
};

const driverEventTypes: FrameworkEventType[] = [
  'run.created',
  'run.started',
  'run.resume.requested',
  'run.resumed',
  'run.waiting_human',
  'run.waiting_signal',
  'run.waiting_timer',
  'run.paused',
  'run.completed',
  'run.failed',
  'run.cancelled',
  'runtime.wait.created',
  'runtime.wait.resolved',
  'runtime.signal.received',
  'fsm.state.entered',
  'fsm.state.exited',
  'fsm.transition.accepted',
];

const payloadSchema: JsonSchema = { type: 'object', additionalProperties: true };

async function fixture(
  executeState: (
    input: BoundedStateExecutorInput
  ) => Promise<BoundedStateExecutionDecision> | BoundedStateExecutionDecision
) {
  let milliseconds = 0;
  let idSequence = 0;
  const now = () => new Date(Date.UTC(2026, 6, 18, 5, 0, 0, milliseconds++)).toISOString();
  const nextId = (namespace: string) => `${namespace}.${++idSequence}`;
  const schemas = new InMemoryEventSchemaRegistry();
  for (const eventType of driverEventTypes) {
    await schemas.register({
      eventType,
      version: '1.0.0',
      schema: payloadSchema,
      schemaHash: hashCanonicalJson(payloadSchema),
    });
  }
  const eventStore = new InMemoryDurableEventStore({ schemaRegistry: schemas, now });
  const events = new DurableEventRuntime({ store: eventStore, now });
  const projectionStore = new InMemoryProjectionStore<RuntimeOrchestrationProjection>();
  const projections = new ProjectionEngine({ events, now });
  const runLeases = new InMemoryRunLeaseStore({ now });
  const stateClaims = new InMemoryStateExecutionClaimStore({ runLeaseStore: runLeases, now });
  const driver = new FencedBoundedFSMDriver({
    events,
    projections,
    projectionStore,
    runLeases,
    stateClaims,
    executeState: async (input) => executeState(input),
    now,
    nextId,
  });
  const controls = new RuntimeRunControlService({
    events,
    projections,
    projectionStore,
    runLeases,
    now,
    nextId,
  });
  await events.append({
    scope: streamScope(),
    events: [seedEvent('run.created', 'run.created', now())],
    expectedLastSequence: 0,
    idempotencyKey: 'seed.run.created',
  });
  return { driver, controls, events, projectionStore, runLeases, stateClaims, now, nextId };
}

function runInput(maxSteps: number, abortSignal?: AbortSignal) {
  return {
    scope,
    process,
    ownerId: 'worker.driver',
    maxSteps,
    leaseTtlMs: 60_000,
    stateClaimTtlMs: 30_000,
    ...(abortSignal === undefined ? {} : { abortSignal }),
  };
}

function streamScope() {
  return { tenantId: scope.tenantId, userId: scope.userId, runId: scope.runId };
}

function seedEvent(id: string, type: FrameworkEventType, timestamp: string): EventCreateInput {
  return {
    id,
    type,
    version: '1.0.0',
    tenantId: scope.tenantId,
    userId: scope.userId,
    sessionId: scope.sessionId,
    runId: scope.runId,
    timestamp,
    payload: {},
  };
}

describe('FencedBoundedFSMDriver', () => {
  it('stops at the step budget and resumes from Event-projected state', async () => {
    const executed: string[] = [];
    const target = await fixture((input) => {
      executed.push(`${input.state.id}:${input.projection.stateAttempt}`);
      return {
        result: { kind: 'completed' },
        transition: { to: input.state.id === 'Start' ? 'Work' : 'Completed' },
      };
    });

    const first = await target.driver.run(runInput(1));
    expect(first).toMatchObject({
      disposition: 'budget_exhausted',
      steps: 1,
      projection: { runStatus: 'running', currentState: 'Work', stateAttempt: 1 },
    });

    const second = await target.driver.run(runInput(1));
    expect(second).toMatchObject({
      disposition: 'completed',
      steps: 1,
      projection: {
        runStatus: 'completed',
        currentState: 'Completed',
        terminalState: 'Completed',
      },
    });
    expect(executed).toEqual(['Start:1', 'Work:1']);
    const eventTypes = (await target.events.read({ scope: streamScope() })).map(
      (event) => event.type
    );
    expect(eventTypes.filter((type) => type === 'run.started')).toHaveLength(1);
    expect(eventTypes).toEqual(
      expect.arrayContaining([
        'fsm.state.exited',
        'fsm.transition.accepted',
        'fsm.state.entered',
        'run.completed',
      ])
    );
  });

  it('uses a new State Claim after continue increments the state attempt', async () => {
    const claims: string[] = [];
    const target = await fixture((input) => {
      claims.push(`${input.stateClaim.stateId}:${input.stateClaim.stateAttempt}`);
      if (input.projection.stateAttempt === 1) {
        return { result: { kind: 'continued', observation: { retry: true } } };
      }
      return { result: { kind: 'completed' }, transition: { to: 'Completed' } };
    });

    const result = await target.driver.run(runInput(2));
    expect(result).toMatchObject({
      disposition: 'completed',
      steps: 2,
      projection: {
        statePath: ['Start', 'Start', 'Completed'],
        stateVisitCounts: { Start: 2, Completed: 1 },
      },
    });
    expect(claims).toEqual(['Start:1', 'Start:2']);
  });

  it('keeps Event and State Claim attempts aligned when a State is re-entered', async () => {
    const cyclicProcess: FSMProcessSpec = {
      ...process,
      transitions: [...process.transitions, { from: 'Work', to: 'Start' }],
    };
    const claims: string[] = [];
    const target = await fixture((input) => {
      claims.push(`${input.stateClaim.stateId}:${input.stateClaim.stateAttempt}`);
      if (claims.length === 1) {
        return { result: { kind: 'completed' }, transition: { to: 'Work' } };
      }
      if (claims.length === 2) {
        return { result: { kind: 'completed' }, transition: { to: 'Start' } };
      }
      return { result: { kind: 'completed' }, transition: { to: 'Completed' } };
    });

    const result = await target.driver.run({ ...runInput(3), process: cyclicProcess });
    expect(result).toMatchObject({
      disposition: 'completed',
      steps: 3,
      projection: {
        stateVisitCounts: { Start: 2, Work: 1, Completed: 1 },
      },
    });
    expect(claims).toEqual(['Start:1', 'Work:1', 'Start:2']);

    const startEntries = (await target.events.read({ scope: streamScope() })).filter(
      (event) => event.type === 'fsm.state.entered' && event.fsmState === 'Start'
    );
    expect(startEntries.map((event) => event.metadata?.stateAttempt)).toEqual([1, 2]);
  });

  it('persists waits and does not execute a waiting Run again', async () => {
    let calls = 0;
    const target = await fixture(() => {
      calls += 1;
      return {
        result: {
          kind: 'waiting',
          wait: { type: 'signal', key: 'approval.received' },
        },
      };
    });

    const waiting = await target.driver.run(runInput(3));
    expect(waiting).toMatchObject({
      disposition: 'waiting',
      steps: 1,
      wait: { type: 'signal', key: 'approval.received' },
      projection: { runStatus: 'waiting_signal', currentState: 'Start' },
    });
    const repeated = await target.driver.run(runInput(3));
    expect(repeated).toMatchObject({ disposition: 'waiting', steps: 0 });
    expect(calls).toBe(1);
  });

  it('resumes a signal Wait as a new claimable State attempt', async () => {
    const claims: string[] = [];
    const target = await fixture((input) => {
      claims.push(`${input.stateClaim.stateId}:${input.stateClaim.stateAttempt}`);
      if (input.projection.stateAttempt === 1) {
        return {
          result: {
            kind: 'waiting',
            wait: {
              type: 'signal',
              key: 'approval.received',
              expectedSchema: {
                type: 'object',
                required: ['approved'],
                properties: { approved: { type: 'boolean' } },
                additionalProperties: false,
              },
            },
          },
        };
      }
      expect(input.projection.lastResume).toMatchObject({
        kind: 'signal',
        payload: { approved: true },
      });
      return { result: { kind: 'completed' }, transition: { to: 'Completed' } };
    });

    await expect(target.driver.run(runInput(1))).resolves.toMatchObject({
      disposition: 'waiting',
      projection: { runStatus: 'waiting_signal', stateAttempt: 1 },
    });
    await expect(
      target.controls.execute({
        kind: 'signal',
        commandId: 'signal.driver.approval',
        scope,
        principal: {
          principalId: 'user.driver',
          type: 'user',
          tenantId: scope.tenantId,
          userId: scope.userId,
          permissionScopes: ['runtime.run.signal'],
        },
        ownerId: 'worker.control',
        leaseTtlMs: 60_000,
        key: 'approval.received',
        payload: { approved: true },
        sentAt: '2026-07-18T05:01:00.000Z',
      })
    ).resolves.toMatchObject({
      disposition: 'applied',
      projection: { runStatus: 'running', stateAttempt: 2 },
    });
    await expect(target.driver.run(runInput(1))).resolves.toMatchObject({
      disposition: 'completed',
      projection: { runStatus: 'completed', terminalState: 'Completed' },
    });
    expect(claims).toEqual(['Start:1', 'Start:2']);
  });

  it('routes failed State results to the declared failed terminal State', async () => {
    const target = await fixture(() => ({
      result: {
        kind: 'failed',
        error: {
          code: 'RUNTIME_INTERNAL_ERROR',
          message: 'state failed',
          retryable: false,
          stateId: 'Start',
        },
      },
    }));

    await expect(target.driver.run(runInput(2))).resolves.toMatchObject({
      disposition: 'failed',
      steps: 1,
      projection: { runStatus: 'failed', currentState: 'Failed', terminalState: 'Failed' },
    });
  });

  it('fails closed when another worker holds the Run Lease', async () => {
    let calls = 0;
    const target = await fixture(() => {
      calls += 1;
      return { result: { kind: 'completed' }, transition: { to: 'Completed' } };
    });
    const acquiredAt = target.now();
    await target.runLeases.acquire({
      tenantId: scope.tenantId,
      userId: scope.userId,
      runId: scope.runId,
      partitionKey: `runtime:${scope.runId}`,
      requestedLeaseId: target.nextId('held-lease'),
      ownerId: 'worker.other',
      ttlMs: 60_000,
      acquiredAt,
      idempotencyKey: 'held-lease',
    });

    await expect(target.driver.run(runInput(2))).resolves.toMatchObject({
      disposition: 'lease_unavailable',
      steps: 0,
    });
    expect(calls).toBe(0);
  });

  it('records cancellation before executing a State when already aborted', async () => {
    let calls = 0;
    const controller = new AbortController();
    controller.abort();
    const target = await fixture(() => {
      calls += 1;
      return { result: { kind: 'completed' }, transition: { to: 'Completed' } };
    });

    await expect(target.driver.run(runInput(2, controller.signal))).resolves.toMatchObject({
      disposition: 'cancelled',
      steps: 0,
      projection: { runStatus: 'cancelled', terminalState: 'Start' },
    });
    expect(calls).toBe(0);
  });
});
