import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, expect, it, vi } from 'vitest';
import {
  DurableEventRuntime,
  EventSourcedActivityRuntime,
  EventSourcedRunManager,
  ExecutionRuntimeActivityPort,
  HumanRuntimeActivityPort,
  RuntimeActivityWorker,
  projectRuntimeActivities,
  type CommandExecutionResult,
  type EventStreamScope,
  type ExecutionStore,
  type HumanRuntimeActivityInput,
  type RuntimeActivityEffect,
  type RuntimeActivityPort,
  type RuntimeActivityRequest,
  type RuntimeActivityType,
  type RuntimeHumanReviewProvider,
  type SandboxProvider,
} from '@hypha/core';
import {
  InferenceManager,
  ModelRuntimeActivityPort,
  type InferenceProvider,
  type ModelRuntimeActivityInput,
} from '@hypha/inference';
import {
  MemoryManager,
  MemoryRuntimeActivityPort,
  type MemoryProvider,
  type MemoryRecord,
  type MemoryRuntimeActivityInput,
} from '@hypha/memory';
import {
  ToolRuntimeActivityPort,
  type ToolCallResult,
  type ToolInvocationRecord,
  type ToolRunner,
  type ToolRuntimeActivityInput,
} from '@hypha/tools';
import { FileToolRuntimeStore, SQLiteEventStoreV2 } from './index';

const scope: EventStreamScope = {
  tenantId: 'tenant.long-run',
  userId: 'user.long-run',
  runId: 'run.long-running',
};
const sessionId = 'session.long-running';

describe('durable Runtime long-run integration', () => {
  it('restarts across Tool and Human waits and replays without repeating side effects', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-long-run-'));
    const eventFilename = path.join(root, 'runtime-events.sqlite');
    const toolFilename = path.join(root, 'tool-runtime.json');
    const calls = sideEffectSpies();
    const firstToolStore = new FileToolRuntimeStore({ filename: toolFilename });
    const firstPorts = createPorts(calls, firstToolStore, 'before-restart');
    const first = createRuntime(eventFilename, firstPorts);

    await first.runs.create({
      ...(await command(first.events, 'run-create')),
      sessionId,
      workflowRef: { id: 'workflow.long-running', revision: 'revision.1' },
      workflowRevision: 'revision.1',
      processSpecRef: 'process.long-running',
      processHash: 'sha256:process-long-running-v1',
      input: { objective: 'exercise durable runtime ports' },
    });
    await first.runs.start(await command(first.events, 'run-start'));

    await registerAndDispatch(first, modelActivity(), 'idempotent', 'model-before-restart');
    await registerAndDispatch(first, memoryActivity(), 'external_effect', 'memory-before-restart');
    await register(first, toolActivity(), 'external_effect', 'tool-request');
    await expect(first.worker.dispatch(workerRequest('tool-crash'))).rejects.toThrow(
      'simulated process crash after Tool completion'
    );
    await expect(first.activities.get(scope, toolActivity().activityId)).resolves.toMatchObject({
      status: 'running',
    });

    const reopenedToolStore = new FileToolRuntimeStore({ filename: toolFilename });
    const secondPorts = createPorts(calls, reopenedToolStore, 'after-tool-restart');
    const second = createRuntime(eventFilename, secondPorts);
    const recoveredTool = await second.worker.dispatch(workerRequest('tool-recovery'));
    expect(recoveredTool).toMatchObject({
      action: 'reconciled',
      activity: { status: 'completed' },
    });

    await registerAndDispatch(
      second,
      executionActivity(),
      'external_effect',
      'execution-after-restart'
    );
    await registerAndDispatch(second, humanActivity(), 'idempotent', 'human-wait-before-restart');
    await second.runs.wait({
      ...(await command(second.events, 'human-run-wait')),
      waitId: 'wait.human.publish',
      stateId: 'AwaitApproval',
      wait: {
        type: 'human',
        key: 'approval.publish',
        pendingActionRef: humanActivity().activityId,
      },
    });
    await expect(second.runs.get(scope)).resolves.toMatchObject({ status: 'waiting_human' });

    const thirdPorts = createPorts(
      calls,
      new FileToolRuntimeStore({ filename: toolFilename }),
      'after-human-restart'
    );
    const third = createRuntime(eventFilename, thirdPorts);
    const recoveredHuman = await third.worker.dispatch(
      workerRequest('human-recovery', humanActivity().activityId)
    );
    expect(recoveredHuman).toMatchObject({
      action: 'reconciled',
      activity: { status: 'completed' },
    });
    await third.runs.signal({
      ...(await command(third.events, 'human-signal')),
      waitId: 'wait.human.publish',
      signal: {
        signalId: 'signal.human.publish.approved',
        runId: scope.runId,
        key: 'approval.publish',
        principal: {
          principalId: 'reviewer.owner',
          type: 'user',
          permissionScopes: ['runtime:signal'],
        },
        payload: { approved: true },
        sentAt: '2026-07-17T11:00:05.000Z',
      },
    });
    await third.runs.complete({
      ...(await command(third.events, 'run-complete')),
      terminalState: 'Completed',
      output: { status: 'ok' },
      outputHash: 'sha256:long-run-output',
    });

    const replay = createRuntime(eventFilename, thirdPorts);
    const stream = await replay.events.read({ scope });
    const firstProjection = projectRuntimeActivities(stream);
    const secondProjection = projectRuntimeActivities(stream);

    await expect(replay.runs.get(scope)).resolves.toMatchObject({
      status: 'completed',
      workflowRevision: 'revision.1',
      processSpecRef: 'process.long-running',
      processHash: 'sha256:process-long-running-v1',
    });
    expect(firstProjection).toEqual(secondProjection);
    expect(firstProjection).toMatchObject([
      { id: modelActivity().activityId, status: 'completed' },
      { id: memoryActivity().activityId, status: 'completed' },
      { id: toolActivity().activityId, status: 'completed' },
      { id: executionActivity().activityId, status: 'completed' },
      { id: humanActivity().activityId, status: 'completed' },
    ]);
    expect(stream.map((event) => event.sequence)).toEqual(
      Array.from({ length: stream.length }, (_unused, index) => index + 1)
    );
    expect(calls.model).toHaveBeenCalledTimes(1);
    expect(calls.memory).toHaveBeenCalledTimes(1);
    expect(calls.tool).toHaveBeenCalledTimes(1);
    expect(calls.execution).toHaveBeenCalledTimes(1);
    expect(calls.human).toHaveBeenCalledTimes(1);
  });
});

function createRuntime(
  filename: string,
  ports: Partial<Record<RuntimeActivityType, RuntimeActivityPort>>
) {
  const events = new DurableEventRuntime({
    store: new SQLiteEventStoreV2({
      filename,
      now: () => '2026-07-17T11:00:00.000Z',
    }),
  });
  const activities = new EventSourcedActivityRuntime({
    events,
    ports,
    now: () => '2026-07-17T11:00:01.000Z',
  });
  return {
    events,
    activities,
    runs: new EventSourcedRunManager({
      events,
      now: () => '2026-07-17T11:00:02.000Z',
    }),
    worker: new RuntimeActivityWorker({ events, activities, ports }),
  };
}

type RuntimeFixture = ReturnType<typeof createRuntime>;

async function registerAndDispatch(
  runtime: RuntimeFixture,
  activity: RuntimeActivityRequest,
  effect: RuntimeActivityEffect,
  operation: string
) {
  await register(runtime, activity, effect, `${operation}:request`);
  return runtime.worker.dispatch(workerRequest(operation, activity.activityId));
}

async function register(
  runtime: RuntimeFixture,
  activity: RuntimeActivityRequest,
  effect: RuntimeActivityEffect,
  operation: string
) {
  return runtime.activities.request({
    ...(await command(runtime.events, operation)),
    activity,
    effect,
  });
}

async function command(events: DurableEventRuntime, operation: string) {
  const head = await events.getStreamHead(scope);
  return {
    scope,
    expectedLastSequence: head?.lastSequence ?? 0,
    expectedRunRevision: head?.runRevision ?? 0,
    fencingToken: 1,
    operationId: `operation.${operation}`,
    idempotencyKey: `idempotency.${operation}`,
  };
}

function workerRequest(operation: string, activityId = toolActivity().activityId) {
  return {
    scope,
    activityId,
    fencingToken: 1,
    operationId: `operation.worker.${operation}`,
    idempotencyKey: `idempotency.worker.${operation}`,
  };
}

function activity<TInput>(
  activityId: string,
  activityType: RuntimeActivityType,
  input: TInput
): RuntimeActivityRequest<TInput> {
  return {
    activityId,
    activityType,
    runId: scope.runId,
    sessionId,
    stateAttemptId: `state-attempt.${activityId}.1`,
    operationId: `operation.${activityId}`,
    idempotencyKey: `idempotency.${activityId}`,
    fencingToken: 1,
    input,
  };
}

function modelActivity(): RuntimeActivityRequest<ModelRuntimeActivityInput> {
  return activity('activity.model.plan', 'model', {
    providerId: 'inference.fixture',
    request: { modelAlias: 'model.fixture', input: { prompt: 'plan' } },
  });
}

function memoryActivity(): RuntimeActivityRequest<MemoryRuntimeActivityInput> {
  const record: MemoryRecord = {
    id: 'memory.long-run.plan',
    type: 'working',
    value: { plan: ['model', 'memory', 'tool', 'execution', 'human'] },
    provenance: { activityId: modelActivity().activityId },
    createdAt: '2026-07-17T11:00:00.000Z',
  };
  return activity('activity.memory.write', 'memory', {
    operation: 'write',
    scope: { userId: scope.userId },
    record,
    policy: { allowLongTerm: false },
  });
}

function toolActivity(): RuntimeActivityRequest<ToolRuntimeActivityInput> {
  return activity('activity.tool.fetch', 'tool', {
    toolId: 'tool.fixture.fetch',
    input: { resource: 'fixture://runtime' },
    context: { userId: scope.userId, tenantId: scope.tenantId },
  });
}

function executionActivity(): RuntimeActivityRequest {
  return activity('activity.execution.verify', 'execution', {
    request: {
      principal: {
        principalId: 'agent.long-run',
        type: 'agent',
        permissionScopes: ['execution.run'],
      },
      userId: scope.userId,
      workspaceId: 'workspace.long-run',
      environmentRef: { id: 'environment.fixture', revision: 'revision.1' },
      executable: 'fixture-verify',
    },
  });
}

function humanActivity(): RuntimeActivityRequest<HumanRuntimeActivityInput> {
  return activity('activity.human.publish', 'human', {
    summary: 'Approve durable Runtime result',
    details: { runId: scope.runId },
  });
}

function sideEffectSpies() {
  return {
    model: vi.fn<InferenceProvider['infer']>(async () => ({
      id: 'inference.response',
      output: { plan: 'durable' },
    })),
    memory: vi.fn<MemoryProvider['write']>(async (_scope, record) => ({ recordId: record.id })),
    tool: vi.fn<ToolRunner['run']>(),
    execution: vi.fn<SandboxProvider['execute']>(async () => executionResult()),
    human: vi.fn<RuntimeHumanReviewProvider['request']>(),
  };
}

function createPorts(
  calls: ReturnType<typeof sideEffectSpies>,
  toolStore: FileToolRuntimeStore,
  phase: 'before-restart' | 'after-tool-restart' | 'after-human-restart'
): Partial<Record<RuntimeActivityType, RuntimeActivityPort>> {
  const inference = new InferenceManager();
  inference.register({ id: 'inference.fixture', infer: calls.model });
  const memory = new MemoryManager(memoryProvider(calls.memory));
  const toolRunner: ToolRunner = {
    run: async (request) => {
      calls.tool(request);
      if (phase !== 'before-restart') {
        throw new Error('Tool execute must not run during recovery.');
      }
      const result: ToolCallResult = {
        toolId: request.toolId,
        invocationId: request.context.invocationId,
        status: 'completed',
        output: { fetched: true },
      };
      await toolStore.create(toolInvocation(request, result));
      throw new Error('simulated process crash after Tool completion');
    },
  };
  const humanProvider: RuntimeHumanReviewProvider = {
    request: async (request) => {
      calls.human(request);
      return {
        reviewId: request.reviewId,
        status: 'pending',
        eventIds: ['event.human.requested'],
      };
    },
    cancel: vi.fn(async () => undefined),
    get: vi.fn(async (reviewId) => {
      if (phase === 'after-human-restart') {
        return { reviewId, status: 'approved' as const, eventIds: ['event.human.approved'] };
      }
      return { reviewId, status: 'pending' as const, eventIds: ['event.human.pending'] };
    }),
  };
  return {
    model: new ModelRuntimeActivityPort({ manager: inference }),
    memory: new MemoryRuntimeActivityPort({ manager: memory }),
    tool: new ToolRuntimeActivityPort({ runner: toolRunner, invocations: toolStore }),
    execution: new ExecutionRuntimeActivityPort({
      provider: executionProvider(calls.execution),
      store: executionStore(vi.fn(async () => null)),
    }),
    human: new HumanRuntimeActivityPort(humanProvider),
  };
}

function memoryProvider(write: MemoryProvider['write']): MemoryProvider {
  return {
    read: vi.fn(async () => []),
    search: vi.fn(async () => []),
    write,
    update: vi.fn(async () => undefined),
    invalidate: vi.fn(async () => undefined),
    summarize: vi.fn(async (scope) => ({ scope, recordCount: 0, types: {} })),
    audit: vi.fn(async (scope) => ({ scope, recordsChecked: 0, missingProvenance: [] })),
  };
}

function executionProvider(execute: SandboxProvider['execute']): SandboxProvider {
  const overrides: Partial<SandboxProvider> = {
    execute,
    cancel: vi.fn(async () => undefined),
  };
  return {
    id: 'execution.fixture',
    ...overrides,
  } as SandboxProvider;
}

function executionStore(get: ExecutionStore['get']): ExecutionStore {
  return { get } as ExecutionStore;
}

function executionResult(): CommandExecutionResult {
  return {
    executionId: executionActivity().activityId,
    revision: 1,
    sandboxId: 'sandbox.fixture',
    status: 'completed',
    exitCode: 0,
    changedFiles: [],
    generatedArtifactRefs: ['artifact.execution.result'],
    startedAt: '2026-07-17T11:00:03.000Z',
    completedAt: '2026-07-17T11:00:04.000Z',
  };
}

function toolInvocation(
  request: Parameters<ToolRunner['run']>[0],
  result: ToolCallResult
): ToolInvocationRecord {
  return {
    id: request.context.invocationId ?? toolActivity().activityId,
    operationId: request.context.operationId,
    toolId: request.toolId,
    status: 'completed',
    inputHash: 'sha256:tool-input',
    idempotencyKey: request.context.idempotencyKey,
    request,
    executionCycle: 1,
    attemptCount: 1,
    revision: 1,
    result,
    createdAt: '2026-07-17T11:00:03.000Z',
    updatedAt: '2026-07-17T11:00:04.000Z',
    completedAt: '2026-07-17T11:00:04.000Z',
  };
}
