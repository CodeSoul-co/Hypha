import { describe, expect, it, vi } from 'vitest';
import {
  DurableEventRuntime,
  EventSourcedActivityRuntime,
  EventSourcedRunManager,
  InMemoryEventStoreV2,
  type EventStreamScope,
  type RuntimeActivityRequest,
} from '@hypha/core';
import {
  InMemoryToolInvocationStore,
  ToolRuntimeActivityPort,
  type ToolCallRequest,
  type ToolCallResult,
  type ToolInvocationRecord,
  type ToolRunner,
  type ToolRuntimeActivityInput,
} from './index';

const scope: EventStreamScope = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  runId: 'run.example',
};

const activityRequest: RuntimeActivityRequest<ToolRuntimeActivityInput> = {
  activityId: 'activity.tool.search',
  activityType: 'tool',
  runId: scope.runId,
  sessionId: 'session.example',
  stateAttemptId: 'state-attempt.search.1',
  operationId: 'operation.tool.search',
  idempotencyKey: 'idempotency.tool.search',
  fencingToken: 1,
  deadlineAt: '2026-07-17T08:00:00.000Z',
  correlationId: 'correlation.example',
  causationId: 'event.state.entered',
  input: {
    toolId: 'tool.search',
    input: { query: 'event sourcing' },
    context: {
      userId: scope.userId,
      tenantId: scope.tenantId,
      workspaceId: 'workspace.example',
      agentId: 'agent.example',
      fsmState: 'Search',
      metadata: { source: 'runtime-test' },
    },
  },
};

describe('ToolRuntimeActivityPort', () => {
  it('maps Runtime identity into ToolRunner and persists the result through Activity events', async () => {
    const run = vi.fn(
      async (request: ToolCallRequest): Promise<ToolCallResult> => ({
        toolId: request.toolId,
        invocationId: request.context.invocationId,
        status: 'completed',
        output: { matches: 3 },
        artifactRefs: ['artifact.search-results'],
      })
    );
    const adapter = new ToolRuntimeActivityPort({
      runner: { run },
      invocations: new InMemoryToolInvocationStore(),
      eventIds: () => ['event.tool.completed'],
    });
    const { activity } = await runtimeFixture(adapter);

    await activity.request({
      ...command(2, 2, 'activity-request'),
      activity: activityRequest,
      effect: 'external_effect',
    });
    await activity.markStarted({
      ...command(3, 3, 'activity-started'),
      activityId: activityRequest.activityId,
    });
    const result = await adapter.execute(activityRequest);
    const completed = await activity.applyResult(
      {
        ...command(4, 4, 'activity-result'),
        activityId: activityRequest.activityId,
      },
      result
    );

    expect(run).toHaveBeenCalledWith({
      toolId: 'tool.search',
      input: { query: 'event sourcing' },
      context: expect.objectContaining({
        runId: scope.runId,
        stepId: activityRequest.stateAttemptId,
        invocationId: activityRequest.activityId,
        operationId: activityRequest.operationId,
        idempotencyKey: activityRequest.idempotencyKey,
        sessionId: activityRequest.sessionId,
        workspaceId: 'workspace.example',
      }),
    });
    expect(result).toMatchObject({
      activityId: activityRequest.activityId,
      status: 'completed',
      artifactRefs: ['artifact.search-results'],
      eventIds: ['event.tool.completed'],
    });
    expect(completed.activity).toMatchObject({
      status: 'completed',
      result: { output: { output: { matches: 3 } } },
    });
  });

  it('reconciles persisted approval wait and missing invocation without executing the tool', async () => {
    const run = vi.fn<ToolRunner['run']>();
    const invocations = new InMemoryToolInvocationStore();
    await invocations.create(invocation('waiting_approval'));
    const adapter = new ToolRuntimeActivityPort({ runner: { run }, invocations });

    await expect(adapter.reconcile(activityRequest.activityId)).resolves.toMatchObject({
      activityId: activityRequest.activityId,
      status: 'waiting',
      output: { status: 'human_review_required' },
    });
    await expect(adapter.reconcile('activity.missing')).resolves.toEqual({
      activityId: 'activity.missing',
      status: 'unknown',
      eventIds: [],
    });
    expect(run).not.toHaveBeenCalled();
  });

  it('maps persisted terminal failures and delegates cancellation by Activity id', async () => {
    const cancelInvocation = vi.fn(async () => null);
    const invocations = new InMemoryToolInvocationStore();
    await invocations.create(invocation('timed_out'));
    const adapter = new ToolRuntimeActivityPort({
      runner: { run: vi.fn(), cancelInvocation },
      invocations,
    });

    await expect(adapter.reconcile(activityRequest.activityId)).resolves.toMatchObject({
      status: 'failed',
      retryable: true,
      error: { code: 'RUNTIME_STATE_TIMEOUT', retryable: true },
    });
    await adapter.cancel(activityRequest.activityId, 'parent_run_cancelled');
    expect(cancelInvocation).toHaveBeenCalledWith(
      activityRequest.activityId,
      'parent_run_cancelled'
    );
  });
});

async function runtimeFixture(port: ToolRuntimeActivityPort) {
  const events = new DurableEventRuntime({
    store: new InMemoryEventStoreV2({ now: () => '2026-07-17T07:00:00.000Z' }),
  });
  const runs = new EventSourcedRunManager({
    events,
    now: () => '2026-07-17T07:00:01.000Z',
  });
  await runs.create({
    ...command(0, 0, 'run-create'),
    sessionId: activityRequest.sessionId,
    workflowRef: { id: 'workflow.example', revision: 'revision.1' },
    workflowRevision: 'revision.1',
    processSpecRef: 'process.example',
    processHash: 'sha256:process-example',
    input: {},
  });
  await runs.start(command(1, 1, 'run-start'));
  return {
    activity: new EventSourcedActivityRuntime({
      events,
      ports: { tool: port },
      now: () => '2026-07-17T07:00:02.000Z',
    }),
  };
}

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

function invocation(status: ToolInvocationRecord['status']): ToolInvocationRecord {
  return {
    id: activityRequest.activityId,
    operationId: activityRequest.operationId,
    toolId: activityRequest.input.toolId,
    status,
    inputHash: 'sha256:tool-input',
    request: {
      toolId: activityRequest.input.toolId,
      input: activityRequest.input.input,
      context: {
        runId: activityRequest.runId,
        stepId: activityRequest.stateAttemptId,
        invocationId: activityRequest.activityId,
      },
    },
    executionCycle: 1,
    attemptCount: 1,
    revision: 1,
    createdAt: '2026-07-17T07:00:00.000Z',
    updatedAt: '2026-07-17T07:00:01.000Z',
  };
}
