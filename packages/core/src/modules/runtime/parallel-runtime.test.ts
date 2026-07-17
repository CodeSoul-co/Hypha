import { describe, expect, it } from 'vitest';
import type { NormalizedRuntimeError } from '../../contracts/runtime';
import { DurableEventRuntime } from './event-runtime';
import { InMemoryEventStoreV2, type EventStreamScope } from './event-store';
import { EventSourcedParallelRuntime, type StartParallelRunRequest } from './parallel-runtime';
import { EventSourcedRunManager } from './run-manager';

const scope: EventStreamScope = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  runId: 'run.parent',
};

const branchFailure: NormalizedRuntimeError = {
  code: 'RUNTIME_INTERNAL_ERROR',
  message: 'child failed',
  retryable: false,
};

function command(expectedLastSequence: number, expectedRunRevision: number, name: string) {
  return {
    scope,
    expectedLastSequence,
    expectedRunRevision,
    fencingToken: 1,
    idempotencyKey: `idempotency.${name}`,
    operationId: `operation.${name}`,
  };
}

function parallelRequest(
  overrides: Partial<StartParallelRunRequest> = {}
): StartParallelRunRequest {
  return {
    ...command(2, 2, 'parallel-start'),
    parallelId: 'parallel.example',
    stateId: 'ParallelResearch',
    branches: [
      { id: 'branch.a', childRunId: 'run.child.a', input: { topic: 'a' } },
      { id: 'branch.b', childRunId: 'run.child.b', input: { topic: 'b' } },
    ],
    join: 'all',
    failurePolicy: 'collect',
    ...overrides,
  };
}

async function fixture() {
  const store = new InMemoryEventStoreV2({ now: () => '2026-07-17T04:00:00.000Z' });
  const events = new DurableEventRuntime({ store });
  const runs = new EventSourcedRunManager({
    events,
    now: () => '2026-07-17T03:00:00.000Z',
  });
  const parallel = new EventSourcedParallelRuntime({
    events,
    now: () => '2026-07-17T03:00:01.000Z',
  });
  await runs.create({
    ...command(0, 0, 'create'),
    sessionId: 'session.example',
    workflowRef: { id: 'workflow.parent', revision: 'revision.1' },
    workflowRevision: 'revision.1',
    processSpecRef: 'process.parent',
    processHash: 'sha256:process-parent',
    input: { objective: 'parallel research' },
  });
  await runs.start(command(1, 1, 'start'));
  return { events, parallel, runs, store };
}

describe('EventSourcedParallelRuntime', () => {
  it('persists child requests, applies concurrency, and joins all branches', async () => {
    const { parallel, runs, store } = await fixture();
    const request = parallelRequest({ maxConcurrency: 1 });

    const started = await parallel.start(request);
    const reused = await parallel.start(request);

    expect(started.parallel).toMatchObject({
      status: 'running',
      join: 'all',
      maxConcurrency: 1,
      branches: [
        { id: 'branch.a', status: 'requested', required: true },
        { id: 'branch.b', status: 'requested', required: true },
      ],
    });
    expect(reused.append.reused).toBe(true);
    await expect(runs.get(scope)).resolves.toMatchObject({ status: 'waiting', revision: 3 });
    await expect(parallel.pendingChildRuns(scope, request.parallelId)).resolves.toMatchObject([
      { id: 'branch.a' },
    ]);

    await parallel.markBranchStarted({
      ...command(6, 3, 'branch-a-start'),
      parallelId: request.parallelId,
      branchId: 'branch.a',
      childCreatedEventId: 'event.child-a.created',
    });
    await expect(parallel.pendingChildRuns(scope, request.parallelId)).resolves.toEqual([]);

    const first = await parallel.recordBranchResult({
      ...command(7, 4, 'branch-a-complete'),
      parallelId: request.parallelId,
      branchId: 'branch.a',
      status: 'completed',
      output: { result: 'a' },
    });
    expect(first.parallel.status).toBe('running');
    await expect(parallel.pendingChildRuns(scope, request.parallelId)).resolves.toMatchObject([
      { id: 'branch.b' },
    ]);

    const joined = await parallel.recordBranchResult({
      ...command(8, 5, 'branch-b-complete'),
      parallelId: request.parallelId,
      branchId: 'branch.b',
      status: 'completed',
      output: { result: 'b' },
    });

    expect(joined.append.events.map((event) => event.type)).toEqual([
      'runtime.parallel.branch.completed',
      'runtime.parallel.joined',
      'run.resumed',
    ]);
    expect(joined.parallel).toMatchObject({
      status: 'joined',
      decision: {
        ready: true,
        succeeded: true,
        completedBranchIds: ['branch.a', 'branch.b'],
      },
    });
    await expect(runs.get(scope)).resolves.toMatchObject({ status: 'running', revision: 6 });
    await expect(store.getStreamHead(scope)).resolves.toMatchObject({
      lastSequence: 11,
      runRevision: 6,
    });
  });

  it('joins on first success and persists cancellation requests for remaining children', async () => {
    const { parallel, runs } = await fixture();
    const request = parallelRequest({
      branches: [
        { id: 'branch.a', childRunId: 'run.child.a', input: {} },
        { id: 'branch.b', childRunId: 'run.child.b', input: {} },
        { id: 'branch.c', childRunId: 'run.child.c', input: {} },
      ],
      join: 'first_success',
      failurePolicy: 'collect',
      cancelRemainingOnJoin: true,
    });
    await parallel.start(request);

    const joined = await parallel.recordBranchResult({
      ...command(7, 3, 'branch-a-first-success'),
      parallelId: request.parallelId,
      branchId: 'branch.a',
      status: 'completed',
    });

    expect(joined.append.events.map((event) => event.type)).toEqual([
      'runtime.parallel.branch.completed',
      'runtime.parallel.joined',
      'runtime.child_run.cancel.requested',
      'runtime.child_run.cancel.requested',
      'run.resumed',
    ]);
    expect(joined.parallel).toMatchObject({
      status: 'joined',
      branches: [
        { id: 'branch.a', status: 'completed' },
        { id: 'branch.b', status: 'cancellation_requested' },
        { id: 'branch.c', status: 'cancellation_requested' },
      ],
      decision: { cancelBranchIds: ['branch.b', 'branch.c'] },
    });
    await expect(parallel.pendingChildRuns(scope, request.parallelId)).resolves.toEqual([]);
    await expect(runs.get(scope)).resolves.toMatchObject({ status: 'running', revision: 4 });
  });

  it('records cancellation confirmation after join without changing the join decision', async () => {
    const { parallel } = await fixture();
    const request = parallelRequest({
      branches: [
        { id: 'branch.a', childRunId: 'run.child.a', input: {} },
        { id: 'branch.b', childRunId: 'run.child.b', input: {} },
        { id: 'branch.c', childRunId: 'run.child.c', input: {} },
      ],
      join: 'first_success',
      failurePolicy: 'collect',
      cancelRemainingOnJoin: true,
    });
    await parallel.start(request);
    const joined = await parallel.recordBranchResult({
      ...command(7, 3, 'join-before-cancellation-confirmation'),
      parallelId: request.parallelId,
      branchId: 'branch.a',
      status: 'completed',
    });

    const reconciled = await parallel.recordBranchResult({
      ...command(12, 4, 'branch-b-cancellation-confirmed'),
      parallelId: request.parallelId,
      branchId: 'branch.b',
      status: 'cancelled',
    });

    expect(reconciled.append.events.map((event) => event.type)).toEqual([
      'runtime.parallel.branch.cancelled',
    ]);
    expect(reconciled.parallel).toMatchObject({
      status: 'joined',
      branches: [
        { id: 'branch.a', status: 'completed' },
        { id: 'branch.b', status: 'cancelled' },
        { id: 'branch.c', status: 'cancellation_requested' },
      ],
      decision: joined.parallel.decision,
    });
  });

  it('records a late child result after join without evaluating join again', async () => {
    const { parallel } = await fixture();
    const request = parallelRequest({
      branches: [
        { id: 'branch.a', childRunId: 'run.child.a', input: {} },
        { id: 'branch.b', childRunId: 'run.child.b', input: {} },
        { id: 'branch.c', childRunId: 'run.child.c', input: {} },
      ],
      join: 'first_success',
      failurePolicy: 'collect',
      cancelRemainingOnJoin: false,
    });
    await parallel.start(request);
    const joined = await parallel.recordBranchResult({
      ...command(7, 3, 'join-before-late-result'),
      parallelId: request.parallelId,
      branchId: 'branch.a',
      status: 'completed',
    });

    const reconciled = await parallel.recordBranchResult({
      ...command(10, 4, 'branch-b-late-completion'),
      parallelId: request.parallelId,
      branchId: 'branch.b',
      status: 'completed',
      output: { result: 'late' },
    });

    expect(reconciled.append.events.map((event) => event.type)).toEqual([
      'runtime.parallel.branch.completed',
    ]);
    expect(reconciled.parallel).toMatchObject({
      status: 'joined',
      branches: [
        { id: 'branch.a', status: 'completed' },
        { id: 'branch.b', status: 'completed', output: { result: 'late' } },
        { id: 'branch.c', status: 'requested' },
      ],
      decision: joined.parallel.decision,
    });
  });

  it('fails fast on a required branch and keeps the failure as Join evidence', async () => {
    const { parallel, runs } = await fixture();
    const request = parallelRequest({
      join: 'all',
      failurePolicy: 'fail_fast',
      cancelRemainingOnJoin: true,
    });
    await parallel.start(request);

    const failed = await parallel.recordBranchResult({
      ...command(6, 3, 'branch-a-failed'),
      parallelId: request.parallelId,
      branchId: 'branch.a',
      status: 'failed',
      error: branchFailure,
    });

    expect(failed.parallel).toMatchObject({
      status: 'failed',
      branches: [
        { id: 'branch.a', status: 'failed', error: branchFailure },
        { id: 'branch.b', status: 'cancellation_requested' },
      ],
      decision: {
        succeeded: false,
        reason: 'required_branch_failed_fast',
        failedBranchIds: ['branch.a'],
      },
    });
    await expect(runs.get(scope)).resolves.toMatchObject({ status: 'running', revision: 4 });
  });

  it('joins deterministically when quorum becomes reachable', async () => {
    const { parallel } = await fixture();
    const request = parallelRequest({
      branches: [
        { id: 'branch.a', childRunId: 'run.child.a', input: {} },
        { id: 'branch.b', childRunId: 'run.child.b', input: {} },
        { id: 'branch.c', childRunId: 'run.child.c', input: {} },
      ],
      join: 'quorum',
      quorum: 2,
      failurePolicy: 'collect',
    });
    await parallel.start(request);
    await parallel.recordBranchResult({
      ...command(7, 3, 'quorum-a-complete'),
      parallelId: request.parallelId,
      branchId: 'branch.a',
      status: 'completed',
    });
    const joined = await parallel.recordBranchResult({
      ...command(8, 4, 'quorum-b-complete'),
      parallelId: request.parallelId,
      branchId: 'branch.b',
      status: 'completed',
    });

    expect(joined.parallel).toMatchObject({
      status: 'joined',
      decision: {
        succeeded: true,
        reason: 'quorum_reached',
        activeBranchIds: ['branch.c'],
      },
    });
  });

  it('rejects branch sequence gaps during event replay', async () => {
    const { parallel, store } = await fixture();
    const request = parallelRequest();
    await parallel.start(request);
    await store.append({
      scope,
      events: [
        {
          id: 'event.branch-sequence-gap',
          type: 'runtime.parallel.branch.started',
          runId: scope.runId,
          branchId: 'branch.a',
          operationId: 'operation.branch-sequence-gap',
          timestamp: '2026-07-17T03:00:02.000Z',
          payload: {
            parallelId: request.parallelId,
            branchId: 'branch.a',
            branchSequence: 3,
            childRunId: 'run.child.a',
          },
        },
      ],
      expectedLastSequence: 6,
      expectedRunRevision: 3,
      fencingToken: 1,
      idempotencyKey: 'idempotency.branch-sequence-gap',
    });

    await expect(parallel.get(scope, request.parallelId)).rejects.toMatchObject({
      code: 'RUNTIME_REPLAY_DIVERGENCE',
    });
  });

  it('rejects invalid branch topology before appending events', async () => {
    const { parallel, store } = await fixture();

    await expect(
      parallel.start(
        parallelRequest({
          join: 'quorum',
          quorum: 3,
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_INVALID_INPUT' });
    await expect(
      parallel.start(
        parallelRequest({
          branches: [
            { id: 'duplicate', childRunId: 'run.child.same', input: {} },
            { id: 'duplicate', childRunId: 'run.child.other', input: {} },
          ],
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_INVALID_INPUT' });
    await expect(store.readStream(scope)).resolves.toHaveLength(2);
  });
});
