import { InMemoryExecutionArtifactStore } from '@hypha/adapters-local';
import {
  ArtifactRuntimeActivityDescriptorStore,
  DurableEventRuntime,
  InMemoryDurableEventStore,
  InMemoryEventSchemaRegistry,
  InMemoryRunLeaseStore,
  RuntimeActivityRedispatchService,
  registerRuntimeOrchestrationEventSchemas,
  type EventRuntime,
  type RuntimeActivityDescriptor,
  type RuntimeActivityKind,
  type RuntimeHumanTaskKind,
} from '@hypha/core';

const now = '2026-07-24T07:00:00.000Z';

function descriptor(activityKind: RuntimeActivityKind = 'tool'): RuntimeActivityDescriptor {
  return {
    version: '1.0.0',
    activityId: 'activity.redispatch',
    activityKind,
    runId: 'run.redispatch',
    stateId: 'Execute',
    stateAttempt: 1,
    operationId: 'operation.redispatch',
    inputRef: 'artifact-ref:input.redispatch',
    inputHash: `sha256:${'1'.repeat(64)}`,
    providerRef: 'tool:filesystem.write',
    providerRevision: '1.0.0',
    idempotencyKey: 'activity.redispatch:attempt:1',
  };
}

describe('RuntimeActivityRedispatchService', () => {
  it.each([
    ['tool', 'tool'],
    ['skill', 'policy'],
    ['prompt', 'policy'],
    ['memory', 'memory'],
    ['execution', 'execution'],
    ['mcp', 'mcp'],
    ['policy', 'policy'],
  ] as const)(
    'redispatches approved %s HumanTask evidence through the %s Activity contract',
    async (taskKind, activityKind) => {
      const runId = `run.${taskKind}`;
      const events = await eventRuntime();
      const descriptors = new ArtifactRuntimeActivityDescriptorStore({
        artifacts: new InMemoryExecutionArtifactStore(),
      });
      const value = {
        ...descriptor(activityKind),
        runId,
        activityId: `activity.${taskKind}`,
      };
      const reference = await descriptors.put(value);
      await appendApprovedTask(events, reference, 'human.review.approved', {
        taskKind,
        runId,
      });
      const dispatch = jest.fn(async () => ({
        commandId: `activity-command.${taskKind}`,
        reused: false,
      }));
      const service = new RuntimeActivityRedispatchService({
        events,
        runLeases: new InMemoryRunLeaseStore({ now: () => now }),
        descriptors,
        revisions: { validate: async () => undefined },
        dispatcher: { dispatch },
        now: () => now,
      });

      await expect(
        service.redispatch({
          commandId: `command.${taskKind}`,
          scope: {
            userId: 'user.redispatch',
            sessionId: 'session.redispatch',
            runId,
          },
          ownerId: 'worker.redispatch',
          leaseTtlMs: 30_000,
          taskId: 'task.redispatch',
          expectedTaskRevision: 2,
          expectedSubjectHash: `sha256:${'2'.repeat(64)}`,
          ...reference,
          requestedAt: now,
        })
      ).resolves.toMatchObject({ commandReused: false });
      expect(dispatch).toHaveBeenCalledTimes(1);
    }
  );

  it('records intent before dispatching the approved Activity and reuses both on retry', async () => {
    const events = await eventRuntime();
    const descriptors = new ArtifactRuntimeActivityDescriptorStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const reference = await descriptors.put(descriptor());
    await appendApprovedTask(events, reference);
    const callOrder: string[] = [];
    const dispatch = jest.fn(async () => {
      callOrder.push('dispatch');
      return { commandId: 'activity-command.redispatch', reused: false };
    });
    const revisions = jest.fn(async () => {
      callOrder.push('revisions');
    });
    const service = new RuntimeActivityRedispatchService({
      events,
      runLeases: new InMemoryRunLeaseStore({ now: () => now }),
      descriptors,
      revisions: { validate: revisions },
      dispatcher: { dispatch },
      now: () => now,
      nextId: (namespace) => `${namespace}.fixed`,
    });
    const command = {
      commandId: 'command.redispatch',
      scope: {
        userId: 'user.redispatch',
        sessionId: 'session.redispatch',
        runId: 'run.redispatch',
      },
      ownerId: 'worker.redispatch',
      leaseTtlMs: 30_000,
      taskId: 'task.redispatch',
      expectedTaskRevision: 2,
      expectedSubjectHash: `sha256:${'2'.repeat(64)}`,
      ...reference,
      requestedAt: now,
    };

    await expect(service.redispatch(command)).resolves.toMatchObject({
      eventReused: false,
      commandReused: false,
    });
    const stream = await events.read({
      scope: { userId: 'user.redispatch', runId: 'run.redispatch' },
    });
    expect(stream.at(-1)?.type).toBe('activity.redispatch.requested');
    expect(callOrder).toEqual(['revisions', 'dispatch']);

    dispatch.mockResolvedValueOnce({
      commandId: 'activity-command.redispatch',
      reused: true,
    });
    await expect(service.redispatch(command)).resolves.toMatchObject({
      eventReused: true,
      commandReused: true,
    });
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('does not invoke the dispatcher for rejected HumanTask evidence', async () => {
    const events = await eventRuntime();
    const descriptors = new ArtifactRuntimeActivityDescriptorStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const reference = await descriptors.put(descriptor());
    await appendApprovedTask(events, reference, 'human.review.rejected');
    const dispatch = jest.fn();
    const service = new RuntimeActivityRedispatchService({
      events,
      runLeases: new InMemoryRunLeaseStore({ now: () => now }),
      descriptors,
      revisions: { validate: jest.fn() },
      dispatcher: { dispatch },
      now: () => now,
    });

    await expect(
      service.redispatch({
        commandId: 'command.rejected',
        scope: {
          userId: 'user.redispatch',
          sessionId: 'session.redispatch',
          runId: 'run.redispatch',
        },
        ownerId: 'worker.redispatch',
        leaseTtlMs: 30_000,
        taskId: 'task.redispatch',
        expectedTaskRevision: 2,
        expectedSubjectHash: `sha256:${'2'.repeat(64)}`,
        ...reference,
        requestedAt: now,
      })
    ).rejects.toMatchObject({ code: 'HUMAN_TASK_RESUME_REVALIDATION_FAILED' });
    expect(dispatch).not.toHaveBeenCalled();
  });
});

async function eventRuntime(): Promise<EventRuntime> {
  const registry = new InMemoryEventSchemaRegistry();
  await registerRuntimeOrchestrationEventSchemas(registry);
  return new DurableEventRuntime({
    store: new InMemoryDurableEventStore({ schemaRegistry: registry, now: () => now }),
    now: () => now,
  });
}

async function appendApprovedTask(
  events: EventRuntime,
  reference: {
    activityDescriptorRef: string;
    activityDescriptorHash: string;
  },
  resolution: 'human.review.approved' | 'human.review.rejected' = 'human.review.approved',
  options: {
    taskKind?: RuntimeHumanTaskKind;
    runId?: string;
  } = {}
): Promise<void> {
  const taskKind = options.taskKind ?? 'tool';
  const runId = options.runId ?? 'run.redispatch';
  const subjectHash = `sha256:${'2'.repeat(64)}`;
  await events.append({
    scope: { userId: 'user.redispatch', runId },
    events: [
      {
        id: 'event.task.requested',
        type: 'human.review.requested',
        version: '1.0.0',
        userId: 'user.redispatch',
        sessionId: 'session.redispatch',
        runId,
        fsmState: 'Execute',
        timestamp: now,
        payload: {
          taskId: 'task.redispatch',
          runId,
          stateId: 'Execute',
          stateAttempt: 1,
          kind: taskKind,
          subjectRef: 'tool:filesystem.write@1.0.0',
          subjectHash,
          status: 'pending',
          requestedBy: 'user.redispatch',
          allowedDecisionScopes: ['runtime.human-task.decide'],
          requestedAt: now,
          revision: 1,
          ...reference,
        },
      },
      {
        id: 'event.task.decided',
        type: resolution,
        version: '1.0.0',
        userId: 'user.redispatch',
        sessionId: 'session.redispatch',
        runId,
        fsmState: 'Execute',
        timestamp: now,
        payload: {
          taskId: 'task.redispatch',
          expectedRevision: 1,
          expectedSubjectHash: subjectHash,
          decidedBy: 'reviewer.redispatch',
          decidedAt: now,
        },
      },
    ],
    expectedLastSequence: 0,
    idempotencyKey: `append.${resolution}`,
  });
  expect(reference.activityDescriptorHash).toMatch(/^sha256:/u);
}
