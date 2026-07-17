import { describe, expect, it } from 'vitest';
import { DurableEventRuntime, InMemoryEventStoreV2, type EventStreamScope } from '@hypha/core';
import {
  EventSourcedFSMRuntime,
  type CommitEventSourcedFSMCommand,
  type FSMProcessSpec,
} from './index';

const timestamp = '2026-07-17T08:00:00.000Z';
const scope: EventStreamScope = {
  tenantId: 'tenant.test',
  userId: 'user.test',
  runId: 'run.test',
};
const spec: FSMProcessSpec = {
  id: 'fsm.event-sourced.test',
  version: '1.0.0',
  initialState: 'Draft',
  states: [
    { id: 'Draft', kind: 'domain' },
    { id: 'Review', kind: 'domain' },
    { id: 'Completed', kind: 'completed' },
  ],
  transitions: [
    { from: 'Draft', to: 'Review', guard: 'approved == true' },
    { from: 'Review', to: 'Completed' },
  ],
  terminalStates: ['Completed'],
};

function harness(options: Partial<ConstructorParameters<typeof EventSourcedFSMRuntime>[1]> = {}) {
  const store = new InMemoryEventStoreV2({ now: () => timestamp });
  const events = new DurableEventRuntime({ store, now: () => timestamp });
  const runtime = new EventSourcedFSMRuntime(spec, {
    events,
    now: () => timestamp,
    ...options,
  });
  return { store, events, runtime };
}

async function initialize(runtime: EventSourcedFSMRuntime) {
  return runtime.initialize({
    scope,
    expectedLastSequence: 0,
    expectedRunRevision: 0,
    fencingToken: 1,
    idempotencyKey: 'init.1',
    operationId: 'operation.init.1',
    stateAttemptId: 'attempt.draft.1',
    claimId: 'claim.draft.1',
    variables: { approved: false },
  });
}

function draftCommit(
  overrides: Partial<CommitEventSourcedFSMCommand> = {}
): CommitEventSourcedFSMCommand {
  return {
    scope,
    expectedLastSequence: 5,
    expectedRunRevision: 1,
    fencingToken: 1,
    idempotencyKey: 'commit.draft.1',
    operationId: 'operation.commit.draft.1',
    stateId: 'Draft',
    stateAttemptId: 'attempt.draft.1',
    attempt: 1,
    toState: 'Review',
    nextStateAttemptId: 'attempt.review.1',
    result: {
      status: 'completed',
      outputHash: 'sha256:draft-output',
      variablesPatch: { approved: true },
    },
    ...overrides,
  };
}

describe('EventSourcedFSMRuntime', () => {
  it('initializes the FSM as one contiguous lifecycle batch', async () => {
    const { events, runtime } = harness();
    const result = await initialize(runtime);
    const persisted = await events.read({ scope });

    expect(result.append).toMatchObject({ firstSequence: 1, lastSequence: 5, runRevision: 1 });
    expect(persisted.map((event) => event.type)).toEqual([
      'fsm.initializing',
      'fsm.state.scheduled',
      'fsm.state.claimed',
      'fsm.state.entered',
      'fsm.ready',
    ]);
    expect(result.snapshot).toMatchObject({
      currentState: 'Draft',
      currentStateAttemptId: 'attempt.draft.1',
      currentAttempt: 1,
      statePath: ['Draft'],
      stateVisitCounts: { Draft: 1 },
      variables: { approved: false },
      lastEventSequence: 5,
    });
  });

  it('commits verification, variables, transition, and next entry atomically', async () => {
    const { events, runtime } = harness();
    await initialize(runtime);
    const result = await runtime.commitState(draftCommit());
    const persisted = await events.read({ scope, fromSequence: 6 });

    expect(result.append).toMatchObject({ firstSequence: 6, lastSequence: 15, runRevision: 2 });
    expect(persisted.map((event) => event.type)).toEqual([
      'fsm.state.verification.started',
      'fsm.state.verification.completed',
      'fsm.transition.requested',
      'fsm.transition.accepted',
      'fsm.state.exited',
      'fsm.state.completed',
      'variables.patched',
      'fsm.transition.committed',
      'fsm.state.scheduled',
      'fsm.state.entered',
    ]);
    expect(result.snapshot).toMatchObject({
      currentState: 'Review',
      currentStateAttemptId: 'attempt.review.1',
      currentAttempt: 1,
      statePath: ['Draft', 'Review'],
      variables: { approved: true },
      lastEventSequence: 15,
    });
  });

  it('emits the terminal run event in the same commit batch', async () => {
    const { events, runtime } = harness();
    await initialize(runtime);
    await runtime.commitState(draftCommit());
    const result = await runtime.commitState({
      scope,
      expectedLastSequence: 15,
      expectedRunRevision: 2,
      fencingToken: 1,
      idempotencyKey: 'commit.review.1',
      operationId: 'operation.commit.review.1',
      stateId: 'Review',
      stateAttemptId: 'attempt.review.1',
      attempt: 1,
      toState: 'Completed',
      result: { status: 'completed' },
    });
    const persisted = await events.read({ scope, fromSequence: 16 });

    expect(result.append).toMatchObject({ firstSequence: 16, lastSequence: 23, runRevision: 3 });
    expect(persisted.at(-1)?.type).toBe('run.completed');
    expect(result.snapshot).toMatchObject({
      currentState: 'Completed',
      status: 'completed',
      statePath: ['Draft', 'Review', 'Completed'],
      lastEventSequence: 23,
    });
  });

  it('does not append partial events on optimistic sequence conflict', async () => {
    const { events, runtime } = harness();
    await initialize(runtime);

    await expect(
      runtime.commitState(draftCommit({ expectedLastSequence: 4 }))
    ).rejects.toMatchObject({ code: 'RUNTIME_EVENT_APPEND_FAILED' });
    await expect(events.read({ scope })).resolves.toHaveLength(5);
    await expect(runtime.getSnapshot(scope)).resolves.toMatchObject({ currentState: 'Draft' });
  });

  it('rejects a stale state attempt without writing events', async () => {
    const { events, runtime } = harness();
    await initialize(runtime);

    await expect(
      runtime.commitState(draftCommit({ stateAttemptId: 'attempt.stale' }))
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_CONFLICT' });
    await expect(events.read({ scope })).resolves.toHaveLength(5);
  });

  it('records guard rejection but never commits the transition', async () => {
    const { events, runtime } = harness();
    await initialize(runtime);

    await expect(
      runtime.commitState(
        draftCommit({
          result: { status: 'completed', variablesPatch: { approved: false } },
        })
      )
    ).rejects.toMatchObject({ code: 'FSM_GUARD_REJECTED' });
    const persisted = await events.read({ scope });

    expect(persisted.slice(5).map((event) => event.type)).toEqual([
      'fsm.transition.requested',
      'fsm.transition.rejected',
    ]);
    expect(persisted.some((event) => event.type === 'fsm.transition.committed')).toBe(false);
    await expect(runtime.getSnapshot(scope)).resolves.toMatchObject({
      currentState: 'Draft',
      variables: { approved: false },
      lastEventSequence: 7,
    });
  });

  it('records invariant rejection without applying its variables patch', async () => {
    const { events, runtime } = harness({ validateInvariants: () => false });
    await initialize(runtime);

    await expect(runtime.commitState(draftCommit())).rejects.toMatchObject({
      code: 'RUNTIME_INVARIANT_FAILED',
    });
    const persisted = await events.read({ scope });
    expect(persisted.some((event) => event.type === 'variables.patched')).toBe(false);
    await expect(runtime.getSnapshot(scope)).resolves.toMatchObject({
      currentState: 'Draft',
      variables: { approved: false },
    });
  });

  it('reuses a completed command without duplicating lifecycle events', async () => {
    const { events, runtime } = harness();
    await initialize(runtime);
    const command = draftCommit();
    await runtime.commitState(command);
    const replay = await runtime.commitState(command);

    expect(replay.append.reused).toBe(true);
    await expect(events.read({ scope })).resolves.toHaveLength(15);
    expect(replay.snapshot.currentState).toBe('Review');
  });

  it('rejects reserved variable keys before any append', async () => {
    const { events, runtime } = harness();
    await initialize(runtime);

    await expect(
      runtime.commitState(
        draftCommit({ result: { status: 'completed', variablesPatch: { $system: true } } })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_INVALID_INPUT' });
    await expect(events.read({ scope })).resolves.toHaveLength(5);
  });
});
