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
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          redispatchCommandId: `command.${taskKind}`,
          redispatchIdempotencyKey: `command.${taskKind}`,
          approvalEventId: 'event.task.decided',
        })
      );
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
      nextId: (() => {
        let sequence = 0;
        return (namespace: string) => `${namespace}.${++sequence}`;
      })(),
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
    expect(stream.at(-1)).toMatchObject({
      causationId: 'event.task.decided',
      parentEventId: 'event.task.decided',
      metadata: {
        redispatchCommandHash: expect.stringMatching(/^sha256:[a-f0-9]{64}$/u),
        expectedTaskRevision: 2,
        subjectHash: `sha256:${'2'.repeat(64)}`,
      },
    });
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

  it.each(['human.review.rejected', 'human.review.cancelled', 'human.review.expired'] as const)(
    'does not invoke the dispatcher for %s HumanTask evidence',
    async (resolution) => {
      const events = await eventRuntime();
      const descriptors = new ArtifactRuntimeActivityDescriptorStore({
        artifacts: new InMemoryExecutionArtifactStore(),
      });
      const reference = await descriptors.put(descriptor());
      await appendApprovedTask(events, reference, resolution);
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
          commandId: `command.${resolution}`,
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
    }
  );

  it('reuses durable redispatch intent after restart and allocates a fresh fenced lease', async () => {
    const events = await eventRuntime();
    const descriptors = new ArtifactRuntimeActivityDescriptorStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const reference = await descriptors.put(descriptor());
    await appendApprovedTask(events, reference);
    const runLeases = new InMemoryRunLeaseStore({ now: () => now });
    const firstDispatch = jest.fn(async () => {
      throw new Error('worker stopped after durable intent');
    });
    const first = service({
      events,
      descriptors,
      runLeases,
      dispatch: firstDispatch,
      ids: ['lease.before-restart'],
    });
    const command = redispatchCommand(reference);

    await expect(first.redispatch(command)).rejects.toThrow('worker stopped after durable intent');

    const secondDispatch = jest.fn(async () => ({
      commandId: 'activity-command.after-restart',
      reused: false,
    }));
    const restarted = service({
      events,
      descriptors,
      runLeases,
      dispatch: secondDispatch,
      ids: ['lease.after-restart'],
    });
    await expect(restarted.redispatch(command)).resolves.toMatchObject({
      eventReused: true,
      commandReused: false,
      activityCommandId: 'activity-command.after-restart',
    });
    expect(secondDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ fencingToken: 2, requestEventId: expect.any(String) })
    );
    const stream = await events.read({
      scope: { userId: 'user.redispatch', runId: 'run.redispatch' },
      types: ['activity.redispatch.requested'],
    });
    expect(stream).toHaveLength(1);
  });

  it('rejects stale task revisions and changed redispatch command evidence', async () => {
    const events = await eventRuntime();
    const descriptors = new ArtifactRuntimeActivityDescriptorStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const reference = await descriptors.put(descriptor());
    await appendApprovedTask(events, reference);
    const dispatch = jest.fn(async () => ({
      commandId: 'activity-command.redispatch',
      reused: false,
    }));
    const runtime = service({
      events,
      descriptors,
      runLeases: new InMemoryRunLeaseStore({ now: () => now }),
      dispatch,
      ids: ['lease.first', 'event.first', 'lease.conflict'],
    });
    const command = redispatchCommand(reference);

    await expect(runtime.redispatch({ ...command, expectedTaskRevision: 1 })).rejects.toMatchObject(
      { code: 'HUMAN_TASK_RESUME_REVALIDATION_FAILED' }
    );
    await expect(runtime.redispatch(command)).resolves.toMatchObject({ eventReused: false });
    await expect(
      runtime.redispatch({
        ...command,
        idempotencyKey: 'changed-idempotency-evidence',
      })
    ).rejects.toMatchObject({
      code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    });
    await expect(
      runtime.redispatch({
        ...command,
        expectedSubjectHash: `sha256:${'3'.repeat(64)}`,
      })
    ).rejects.toMatchObject({
      code: 'HUMAN_TASK_RESUME_REVALIDATION_FAILED',
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('rejects expired approvals and descriptor hash mismatches before dispatch', async () => {
    const events = await eventRuntime();
    const descriptors = new ArtifactRuntimeActivityDescriptorStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const reference = await descriptors.put(descriptor());
    await appendApprovedTask(events, reference, 'human.review.approved', {
      expiresAt: '2026-07-24T06:59:59.000Z',
    });
    const dispatch = jest.fn(async () => ({
      commandId: 'activity-command.redispatch',
      reused: false,
    }));
    const expired = service({
      events,
      descriptors,
      runLeases: new InMemoryRunLeaseStore({ now: () => now }),
      dispatch,
      ids: ['lease.expired', 'lease.hash'],
    });

    await expect(expired.redispatch(redispatchCommand(reference))).rejects.toMatchObject({
      code: 'HUMAN_TASK_EXPIRED',
    });
    await expect(
      expired.redispatch(
        redispatchCommand({
          ...reference,
          activityDescriptorHash: `sha256:${'9'.repeat(64)}`,
        })
      )
    ).rejects.toMatchObject({ code: 'HUMAN_TASK_RESUME_REVALIDATION_FAILED' });
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('honors the first durable decision when approval and rejection race', async () => {
    const descriptors = new ArtifactRuntimeActivityDescriptorStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const reference = await descriptors.put(descriptor());
    const approvalWinsEvents = await eventRuntime();
    await appendApprovedTask(approvalWinsEvents, reference, 'human.review.approved', {
      competingResolution: 'human.review.rejected',
    });
    const approvalDispatch = jest.fn(async () => ({
      commandId: 'activity-command.approval-won',
      reused: false,
    }));
    await expect(
      service({
        events: approvalWinsEvents,
        descriptors,
        runLeases: new InMemoryRunLeaseStore({ now: () => now }),
        dispatch: approvalDispatch,
        ids: ['lease.approval-won', 'event.approval-won'],
      }).redispatch(redispatchCommand(reference))
    ).resolves.toMatchObject({ commandReused: false });

    const rejectionWinsEvents = await eventRuntime();
    await appendApprovedTask(rejectionWinsEvents, reference, 'human.review.rejected', {
      competingResolution: 'human.review.approved',
    });
    const rejectionDispatch = jest.fn();
    await expect(
      service({
        events: rejectionWinsEvents,
        descriptors,
        runLeases: new InMemoryRunLeaseStore({ now: () => now }),
        dispatch: rejectionDispatch,
        ids: ['lease.rejection-won'],
      }).redispatch(redispatchCommand(reference))
    ).rejects.toMatchObject({ code: 'HUMAN_TASK_RESUME_REVALIDATION_FAILED' });

    expect(approvalDispatch).toHaveBeenCalledTimes(1);
    expect(rejectionDispatch).not.toHaveBeenCalled();
  });
});

function service(input: {
  events: EventRuntime;
  descriptors: ArtifactRuntimeActivityDescriptorStore;
  runLeases: InMemoryRunLeaseStore;
  dispatch: jest.Mock;
  ids: string[];
}): RuntimeActivityRedispatchService {
  const ids = [...input.ids];
  return new RuntimeActivityRedispatchService({
    events: input.events,
    descriptors: input.descriptors,
    runLeases: input.runLeases,
    revisions: { validate: async () => undefined },
    dispatcher: { dispatch: input.dispatch },
    now: () => now,
    nextId: (namespace) => ids.shift() ?? `${namespace}.fallback`,
  });
}

function redispatchCommand(reference: {
  activityDescriptorRef: string;
  activityDescriptorHash: string;
}) {
  return {
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
}

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
  resolution:
    | 'human.review.approved'
    | 'human.review.rejected'
    | 'human.review.cancelled'
    | 'human.review.expired' = 'human.review.approved',
  options: {
    taskKind?: RuntimeHumanTaskKind;
    runId?: string;
    expiresAt?: string;
    competingResolution?:
      | 'human.review.approved'
      | 'human.review.rejected'
      | 'human.review.cancelled'
      | 'human.review.expired';
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
          ...(options.expiresAt === undefined ? {} : { expiresAt: options.expiresAt }),
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
      ...(options.competingResolution === undefined
        ? []
        : [
            {
              id: 'event.task.competing',
              type: options.competingResolution,
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
                decidedBy: 'reviewer.competing',
                decidedAt: now,
              },
            },
          ]),
    ],
    expectedLastSequence: 0,
    idempotencyKey: `append.${resolution}`,
  });
  expect(reference.activityDescriptorHash).toMatch(/^sha256:/u);
}
