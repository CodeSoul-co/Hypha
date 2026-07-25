import { describe, expect, it } from 'vitest';
import {
  InMemoryRuntimeDeterminismStore,
  createFrameworkEvent,
  runtimeRunExample,
  type RuntimeActivityDispatchPort,
  type RuntimeActivityInvocation,
  type RuntimeEventCommitPort,
  type RuntimeEventCommitRequest,
  type RuntimeResourceCoordinator,
  type RuntimeRun,
} from '@hypha/core';
import { createInitialSnapshot, type FSMProcessSpec } from '@hypha/fsm';
import { createRuntimeExecutionContext } from './execution-context';

const process: FSMProcessSpec = {
  id: 'process.default',
  version: '1.0.0',
  name: 'Context assembly process',
  initialState: 'Intake',
  states: [
    { id: 'Intake', kind: 'domain' },
    { id: 'Completed', kind: 'completed' },
  ],
  transitions: [{ from: 'Intake', to: 'Completed' }],
  terminalStates: ['Completed'],
};

class RecordingEventCommitPort implements RuntimeEventCommitPort {
  readonly requests: RuntimeEventCommitRequest[] = [];

  async append(request: RuntimeEventCommitRequest) {
    this.requests.push(structuredClone(request));
    return request.events.map(createFrameworkEvent);
  }

  async readSince() {
    return [];
  }
}

function createFixture(overrides: Record<string, unknown> = {}) {
  const eventCommitPort = new RecordingEventCommitPort();
  const invocations: RuntimeActivityInvocation[] = [];
  const activityDispatchPort: RuntimeActivityDispatchPort = {
    async dispatch(invocation) {
      invocations.push(structuredClone(invocation));
      return {
        activityId: invocation.activityId,
        status: 'completed',
        eventIds: ['provider.completed'],
        output: { accepted: true },
      };
    },
  };
  const resourceCoordinator: RuntimeResourceCoordinator = {
    async acquire() {
      return [];
    },
    async renew() {
      return [];
    },
    async release() {},
    async list() {
      return [];
    },
    async assertCurrent(request) {
      throw new Error(`Unexpected claim assertion: ${request.claimId}`);
    },
  };
  const run: RuntimeRun = {
    ...structuredClone(runtimeRunExample),
    id: 'run.default',
    status: 'running' as const,
    currentState: 'Intake',
  };
  const snapshot = createInitialSnapshot(process, run.id, '2026-07-18T00:00:00.000Z');
  let idSequence = 0;
  let clockSequence = 0;
  const options = {
    scope: {
      tenantId: run.tenantId,
      userId: run.userId,
      workspaceId: run.workspaceId,
      sessionId: run.sessionId,
      runId: run.id,
      agentId: run.rootAgentRef?.id,
    },
    principal: {
      principalId: 'principal.default',
      type: 'user' as const,
      tenantId: run.tenantId,
      userId: run.userId,
      permissionScopes: ['runtime.execute'],
    },
    run,
    snapshot,
    process,
    attempt: 1,
    runLease: {
      scope: {
        tenantId: run.tenantId,
        userId: run.userId,
        runId: run.id,
        partitionKey: `run:${run.id}`,
      },
      guard: { leaseId: 'lease.1', ownerId: 'worker.1', fencingToken: 9 },
    },
    abortSignal: new AbortController().signal,
    determinismStore: new InMemoryRuntimeDeterminismStore(),
    eventCommitPort,
    activityDispatchPort,
    resourceCoordinator,
    nextId: (namespace: string) => `${namespace}.${++idSequence}`,
    now: () => `2026-07-18T00:00:0${clockSequence++}.000Z`,
    ...overrides,
  };
  return { options, eventCommitPort, invocations };
}

describe('createRuntimeExecutionContext', () => {
  it('assembles one immutable, fenced helper context for the current FSM state', async () => {
    const fixture = createFixture();
    const context = createRuntimeExecutionContext(fixture.options);

    expect(context).toMatchObject({
      scope: { runId: 'run.default', agentId: 'agent.default' },
      state: { id: 'Intake' },
      attempt: 1,
      fencingToken: 9,
    });
    expect(Object.isFrozen(context)).toBe(true);
    expect(Object.isFrozen(context.run)).toBe(true);
    expect(context.transitions.propose('Completed')).toEqual({ to: 'Completed' });
    expect(context.snapshot.currentState).toBe('Intake');

    await context.activities.memory({ target: 'memory.read', input: { key: 'profile' } });
    expect(fixture.invocations).toEqual([
      expect.objectContaining({
        activityType: 'memory',
        scope: expect.objectContaining({ runId: 'run.default' }),
        stateId: 'Intake',
        stateAttempt: 1,
        fencingToken: 9,
      }),
    ]);
    expect(fixture.eventCommitPort.requests.map((request) => request.events[0]?.type)).toEqual([
      'runtime.activity.requested',
      'runtime.activity.completed',
    ]);
  });

  it('reuses deterministic Activity identity when the same state attempt is replayed', async () => {
    const store = new InMemoryRuntimeDeterminismStore();
    const first = createFixture({ determinismStore: store });
    const second = createFixture({ determinismStore: store });

    await createRuntimeExecutionContext(first.options).activities.model({
      target: 'model.chat',
      input: { prompt: 'hello' },
    });
    await createRuntimeExecutionContext(second.options).activities.model({
      target: 'model.chat',
      input: { prompt: 'hello' },
    });

    expect(second.invocations[0]).toMatchObject({
      activityId: first.invocations[0]?.activityId,
      operationId: first.invocations[0]?.operationId,
      requestedAt: first.invocations[0]?.requestedAt,
    });
  });

  it('rejects Run Lease, principal, and snapshot identity mismatches', () => {
    const leaseMismatch = createFixture();
    leaseMismatch.options.runLease.scope.runId = 'run.other';
    expect(() => createRuntimeExecutionContext(leaseMismatch.options)).toThrow(
      /Run Lease does not authorize/u
    );

    const principalMismatch = createFixture();
    principalMismatch.options.principal.userId = 'user.other';
    expect(() => createRuntimeExecutionContext(principalMismatch.options)).toThrow(
      /principal user/u
    );

    const stateMismatch = createFixture();
    stateMismatch.options.run.currentState = 'Completed';
    expect(() => createRuntimeExecutionContext(stateMismatch.options)).toThrow(
      /current state does not match/u
    );

    const invalidGuard = createFixture();
    invalidGuard.options.runLease.guard.ownerId = '';
    expect(() => createRuntimeExecutionContext(invalidGuard.options)).toThrow();
  });

  it('rejects non-running Runs and non-positive attempts', () => {
    const stopped = createFixture();
    stopped.options.run.status = 'completed';
    expect(() => createRuntimeExecutionContext(stopped.options)).toThrow(/requires a running Run/u);

    const invalidAttempt = createFixture({ attempt: 0 });
    expect(() => createRuntimeExecutionContext(invalidAttempt.options)).toThrow(
      /attempt must be positive/u
    );
  });
});
