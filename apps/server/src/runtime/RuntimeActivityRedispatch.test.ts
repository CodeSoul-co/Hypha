import { InMemoryExecutionArtifactStore } from '@hypha/adapters-local';
import {
  ArtifactRuntimeActivityDescriptorStore,
  DurableEventRuntime,
  FrameworkError,
  InMemoryDurableEventStore,
  InMemoryEventSchemaRegistry,
  InMemoryRunLeaseStore,
  InMemoryTelemetryRecorder,
  RUNTIME_OPERATIONAL_METRIC_NAMES,
  RuntimeActivityRedispatchService,
  RuntimeOperationalTelemetry,
  registerRuntimeOrchestrationEventSchemas,
  type EventRuntime,
  type RuntimeActivityDescriptor,
  type RuntimeActivityKind,
  type RuntimeActivityRedispatchPort,
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
      const dispatchedIdentities: string[] = [];
      const dispatch = jest.fn(
        async (input: Parameters<RuntimeActivityRedispatchPort['dispatch']>[0]) => {
          dispatchedIdentities.push(input.redispatchCommandId, input.redispatchIdempotencyKey);
          return {
            commandId: `activity-command.${taskKind}`,
            reused: false,
          };
        }
      );
      const service = new RuntimeActivityRedispatchService({
        events,
        runLeases: new InMemoryRunLeaseStore({ now: () => now }),
        descriptors,
        revisions: { validate: async () => undefined },
        dispatcher: redispatchPort(dispatch),
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
          redispatchCommandId: expect.stringMatching(/^activity-redispatch:[a-f0-9]{64}$/u),
          redispatchIdempotencyKey: expect.stringMatching(/^activity-redispatch:[a-f0-9]{64}$/u),
          approvalEventId: 'event.task.decided',
        })
      );
      expect(dispatchedIdentities[0]).toBe(dispatchedIdentities[1]);
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
      dispatcher: redispatchPort(dispatch),
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
    const requestEvent = stream.find((event) => event.type === 'activity.redispatch.requested');
    expect(requestEvent).toMatchObject({
      causationId: 'event.task.decided',
      parentEventId: 'event.task.decided',
      metadata: {
        redispatchCommandHash: expect.stringMatching(/^sha256:[a-f0-9]{64}$/u),
        redispatchIdentityVersion: '1.0.0',
        expectedTaskRevision: 2,
        subjectHash: `sha256:${'2'.repeat(64)}`,
      },
    });
    expect(stream.at(-1)).toMatchObject({
      type: 'activity.redispatch.accepted',
      causationId: requestEvent?.id,
      parentEventId: requestEvent?.id,
      payload: {
        activityCommandId: 'activity-command.redispatch',
        commandReused: false,
        source: 'dispatch',
      },
    });
    expect(callOrder).toEqual(['revisions', 'dispatch']);

    await expect(service.redispatch(command)).resolves.toMatchObject({
      eventReused: true,
      receiptReused: true,
      commandReused: true,
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it.each([
    'human.review.rejected',
    'human.review.cancelled',
    'human.review.expired',
    'human.review.superseded',
  ] as const)('does not invoke the dispatcher for %s HumanTask evidence', async (resolution) => {
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
      dispatcher: redispatchPort(dispatch),
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
  });

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
    const secondReconcile = jest.fn(async () => ({ status: 'safe_to_dispatch' as const }));
    const restarted = service({
      events,
      descriptors,
      runLeases,
      dispatch: secondDispatch,
      reconcile: secondReconcile,
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
    expect(secondReconcile).toHaveBeenCalledTimes(1);
    const stream = await events.read({
      scope: { userId: 'user.redispatch', runId: 'run.redispatch' },
      types: ['activity.redispatch.requested'],
    });
    expect(stream).toHaveLength(1);
  });

  it('reconciles an accepted dispatch after a crash before the durable receipt', async () => {
    const events = await eventRuntime();
    const descriptors = new ArtifactRuntimeActivityDescriptorStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const reference = await descriptors.put(descriptor());
    await appendApprovedTask(events, reference);
    const runLeases = new InMemoryRunLeaseStore({ now: () => now });
    const firstDispatch = jest.fn(async () => {
      throw new Error('connection closed after Activity accepted the command');
    });
    const command = redispatchCommand(reference);

    await expect(
      service({
        events,
        descriptors,
        runLeases,
        dispatch: firstDispatch,
        ids: ['lease.before-reconcile', 'event.before-reconcile'],
      }).redispatch(command)
    ).rejects.toThrow('connection closed after Activity accepted the command');

    const restartedDispatch = jest.fn();
    const reconcile = jest.fn(async () => ({
      status: 'accepted' as const,
      commandId: 'activity-command.accepted-before-crash',
    }));
    await expect(
      service({
        events,
        descriptors,
        runLeases,
        dispatch: restartedDispatch,
        reconcile,
        ids: ['lease.after-reconcile'],
      }).redispatch(command)
    ).resolves.toMatchObject({
      activityCommandId: 'activity-command.accepted-before-crash',
      eventReused: true,
      receiptReused: false,
      commandReused: true,
      reconciled: true,
    });

    expect(firstDispatch).toHaveBeenCalledTimes(1);
    expect(reconcile).toHaveBeenCalledTimes(1);
    expect(restartedDispatch).not.toHaveBeenCalled();
    const receipts = await events.read({
      scope: { userId: 'user.redispatch', runId: 'run.redispatch' },
      types: ['activity.redispatch.accepted'],
    });
    expect(receipts).toHaveLength(1);
    expect(receipts[0]).toMatchObject({
      payload: {
        activityCommandId: 'activity-command.accepted-before-crash',
        commandReused: true,
        source: 'reconcile',
      },
    });
  });

  it('records an unknown outcome and blocks blind redispatch after restart', async () => {
    const events = await eventRuntime();
    const descriptors = new ArtifactRuntimeActivityDescriptorStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const reference = await descriptors.put(descriptor());
    await appendApprovedTask(events, reference);
    const runLeases = new InMemoryRunLeaseStore({ now: () => now });
    const firstDispatch = jest.fn(async () => {
      throw new Error('dispatcher response was lost');
    });
    const command = redispatchCommand(reference);

    await expect(
      service({
        events,
        descriptors,
        runLeases,
        dispatch: firstDispatch,
        ids: ['lease.before-unknown', 'event.before-unknown'],
      }).redispatch(command)
    ).rejects.toThrow('dispatcher response was lost');

    const restartedDispatch = jest.fn();
    const reconcile = jest.fn(async () => ({
      status: 'unknown' as const,
      reason: 'Activity provider cannot prove whether the command was accepted',
    }));
    await expect(
      service({
        events,
        descriptors,
        runLeases,
        dispatch: restartedDispatch,
        reconcile,
        ids: ['lease.after-unknown'],
      }).redispatch(command)
    ).rejects.toMatchObject({
      code: 'RUNTIME_ACTIVITY_OUTCOME_UNKNOWN',
      context: {
        taskId: 'task.redispatch',
        reason: 'Activity provider cannot prove whether the command was accepted',
      },
    });

    expect(reconcile).toHaveBeenCalledTimes(1);
    expect(restartedDispatch).not.toHaveBeenCalled();
    const unknownEvents = await events.read({
      scope: { userId: 'user.redispatch', runId: 'run.redispatch' },
      types: ['activity.redispatch.outcome_unknown'],
    });
    expect(unknownEvents).toHaveLength(1);
    expect(unknownEvents[0]).toMatchObject({
      causationId: expect.any(String),
      payload: {
        reason: 'Activity provider cannot prove whether the command was accepted',
        requestEventId: expect.any(String),
      },
    });
  });

  it('rejects stale task revisions and reuses alternate delivery commands', async () => {
    const events = await eventRuntime();
    const descriptors = new ArtifactRuntimeActivityDescriptorStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const reference = await descriptors.put(descriptor());
    await appendApprovedTask(events, reference);
    const redispatchIds: string[] = [];
    const dispatch = jest.fn(
      async (input: Parameters<RuntimeActivityRedispatchPort['dispatch']>[0]) => {
        redispatchIds.push(input.redispatchCommandId);
        return {
          commandId: 'activity-command.redispatch',
          reused: false,
        };
      }
    );
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
        commandId: 'command.redispatch.redelivered',
        idempotencyKey: 'changed-idempotency-evidence',
        ownerId: 'worker.redispatch.replacement',
      })
    ).resolves.toMatchObject({
      eventReused: true,
      receiptReused: true,
    });
    await expect(
      runtime.redispatch({
        ...command,
        expectedSubjectHash: `sha256:${'3'.repeat(64)}`,
      })
    ).rejects.toMatchObject({
      code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(redispatchIds).toHaveLength(1);
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

  it('allows only one worker to dispatch while the run lease is active', async () => {
    const events = await eventRuntime();
    const descriptors = new ArtifactRuntimeActivityDescriptorStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const reference = await descriptors.put(descriptor());
    await appendApprovedTask(events, reference);
    const runLeases = new InMemoryRunLeaseStore({ now: () => now });
    let releaseDispatch: (() => void) | undefined;
    const dispatchBlocked = new Promise<void>((resolve) => {
      releaseDispatch = resolve;
    });
    let markStarted: (() => void) | undefined;
    const dispatchStarted = new Promise<void>((resolve) => {
      markStarted = resolve;
    });
    const dispatch = jest.fn(async () => {
      markStarted?.();
      await dispatchBlocked;
      return { commandId: 'activity-command.winner', reused: false };
    });
    const first = service({
      events,
      descriptors,
      runLeases,
      dispatch,
      ids: ['lease.worker-a', 'event.worker-a'],
    });
    const second = service({
      events,
      descriptors,
      runLeases,
      dispatch,
      ids: ['lease.worker-b'],
    });
    const firstResult = first.redispatch(redispatchCommand(reference));
    await dispatchStarted;

    await expect(
      second.redispatch({
        ...redispatchCommand(reference),
        commandId: 'command.redispatch.worker-b',
        ownerId: 'worker.redispatch.b',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_LEASE_UNAVAILABLE' });
    releaseDispatch?.();
    await expect(firstResult).resolves.toMatchObject({
      activityCommandId: 'activity-command.winner',
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('renews the run lease while an Activity dispatch remains in flight', async () => {
    const events = await eventRuntime();
    const descriptors = new ArtifactRuntimeActivityDescriptorStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const reference = await descriptors.put(descriptor());
    await appendApprovedTask(events, reference);
    const runLeases = new InMemoryRunLeaseStore({ now: () => now });
    const heartbeat = jest.spyOn(runLeases, 'heartbeat');
    const recorder = new InMemoryTelemetryRecorder();
    const operationalTelemetry = new RuntimeOperationalTelemetry({ recorder });
    let monotonicNow = 0;
    const dispatch = jest.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 25));
      return { commandId: 'activity-command.long-running', reused: false };
    });

    await expect(
      service({
        events,
        descriptors,
        runLeases,
        dispatch,
        ids: ['lease.long-running', 'event.long-running'],
        renewalIntervalMs: 5,
        operationalTelemetry,
        monotonicNow: () => monotonicNow++ * 2,
      }).redispatch({
        ...redispatchCommand(reference),
        leaseTtlMs: 100,
      })
    ).resolves.toMatchObject({
      activityCommandId: 'activity-command.long-running',
    });

    expect(heartbeat).toHaveBeenCalled();
    expect(heartbeat).toHaveBeenCalledWith(
      expect.objectContaining({
        ttlMs: 100,
        guard: expect.objectContaining({ fencingToken: 1 }),
      })
    );
    expect(recorder.list(RUNTIME_OPERATIONAL_METRIC_NAMES.leaseRenewalLatencyMs)[0]).toMatchObject({
      value: 2,
      attributes: { resource: 'run', outcome: 'succeeded' },
    });
  });

  it('aborts an in-flight dispatch and rejects its late result after lease renewal fails', async () => {
    const events = await eventRuntime();
    const descriptors = new ArtifactRuntimeActivityDescriptorStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const reference = await descriptors.put(descriptor());
    await appendApprovedTask(events, reference);
    const runLeases = new InMemoryRunLeaseStore({ now: () => now });
    const leaseFailure = new FrameworkError({
      code: 'RUNTIME_FENCING_REJECTED',
      message: 'replacement worker owns the Run lease',
    });
    jest.spyOn(runLeases, 'heartbeat').mockRejectedValue(leaseFailure);
    const recorder = new InMemoryTelemetryRecorder();
    const operationalTelemetry = new RuntimeOperationalTelemetry({ recorder });
    const observedSignals: AbortSignal[] = [];
    const dispatch = jest.fn(
      async (input: Parameters<RuntimeActivityRedispatchPort['dispatch']>[0]) => {
        observedSignals.push(input.signal);
        await new Promise<void>((resolve) => {
          input.signal.addEventListener('abort', () => resolve(), { once: true });
        });
        return { commandId: 'activity-command.stale-result', reused: false };
      }
    );
    const onLeaseRenewalFailure = jest.fn();

    await expect(
      service({
        events,
        descriptors,
        runLeases,
        dispatch,
        ids: ['lease.renewal-fails', 'event.renewal-fails'],
        renewalIntervalMs: 1,
        onLeaseRenewalFailure,
        operationalTelemetry,
        monotonicNow: jest.fn().mockReturnValueOnce(10).mockReturnValueOnce(13),
      }).redispatch({
        ...redispatchCommand(reference),
        leaseTtlMs: 100,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });

    expect(observedSignals).toHaveLength(1);
    expect(observedSignals[0].aborted).toBe(true);
    expect(onLeaseRenewalFailure).toHaveBeenCalledWith(leaseFailure, 'command.redispatch');
    expect(recorder.list(RUNTIME_OPERATIONAL_METRIC_NAMES.leaseRenewalLatencyMs)[0]).toMatchObject({
      value: 3,
      attributes: { resource: 'run', outcome: 'failed' },
    });
    expect(
      await events.read({
        scope: { userId: 'user.redispatch', runId: 'run.redispatch' },
        types: ['activity.redispatch.accepted'],
      })
    ).toHaveLength(0);
  });

  it('does not persist an Activity receipt after the caller cancels an in-flight dispatch', async () => {
    const events = await eventRuntime();
    const descriptors = new ArtifactRuntimeActivityDescriptorStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const reference = await descriptors.put(descriptor());
    await appendApprovedTask(events, reference);
    const controller = new AbortController();
    let markStarted: (() => void) | undefined;
    const started = new Promise<void>((resolve) => {
      markStarted = resolve;
    });
    const dispatch = jest.fn(
      async (input: Parameters<RuntimeActivityRedispatchPort['dispatch']>[0]) => {
        markStarted?.();
        await new Promise<void>((resolve) => {
          input.signal.addEventListener('abort', () => resolve(), { once: true });
        });
        return { commandId: 'activity-command.cancelled-result', reused: false };
      }
    );
    const runtime = service({
      events,
      descriptors,
      runLeases: new InMemoryRunLeaseStore({ now: () => now }),
      dispatch,
      ids: ['lease.caller-cancelled', 'event.caller-cancelled'],
      renewalIntervalMs: 1_000,
    });
    const result = runtime.redispatch({
      ...redispatchCommand(reference),
      signal: controller.signal,
    });
    await started;
    controller.abort('operator_cancelled');

    await expect(result).rejects.toMatchObject({ code: 'RUNTIME_CANCELLED' });
    expect(
      await events.read({
        scope: { userId: 'user.redispatch', runId: 'run.redispatch' },
        types: ['activity.redispatch.accepted'],
      })
    ).toHaveLength(0);
  });

  it('rejects a late dispatcher result after another worker fences the lease', async () => {
    const events = await eventRuntime();
    const descriptors = new ArtifactRuntimeActivityDescriptorStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const reference = await descriptors.put(descriptor());
    await appendApprovedTask(events, reference);
    const runLeases = new InMemoryRunLeaseStore({ now: () => now });
    const dispatch = jest.fn(async () => {
      await runLeases.preempt({
        userId: 'user.redispatch',
        runId: 'run.redispatch',
        partitionKey: 'runtime:run.redispatch',
        requestedLeaseId: 'lease.replacement',
        ownerId: 'worker.redispatch.replacement',
        ttlMs: 30_000,
        acquiredAt: now,
        idempotencyKey: 'preempt.redispatch',
        reason: 'cancellation',
      });
      return { commandId: 'activity-command.late', reused: false };
    });
    const runtime = service({
      events,
      descriptors,
      runLeases,
      dispatch,
      ids: ['lease.stale-worker', 'event.stale-worker'],
    });

    await expect(runtime.redispatch(redispatchCommand(reference))).rejects.toMatchObject({
      code: 'RUNTIME_FENCING_REJECTED',
    });
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ fencingToken: 1 }));
  });
});

function service(input: {
  events: EventRuntime;
  descriptors: ArtifactRuntimeActivityDescriptorStore;
  runLeases: InMemoryRunLeaseStore;
  dispatch: jest.Mock;
  reconcile?: jest.Mock;
  ids: string[];
  renewalIntervalMs?: number;
  onLeaseRenewalFailure?: (error: unknown, commandId: string) => void;
  operationalTelemetry?: RuntimeOperationalTelemetry;
  monotonicNow?: () => number;
}): RuntimeActivityRedispatchService {
  const ids = [...input.ids];
  return new RuntimeActivityRedispatchService({
    events: input.events,
    descriptors: input.descriptors,
    runLeases: input.runLeases,
    revisions: { validate: async () => undefined },
    dispatcher: redispatchPort(input.dispatch, input.reconcile),
    ...(input.renewalIntervalMs === undefined
      ? {}
      : { renewalIntervalMs: input.renewalIntervalMs }),
    ...(input.onLeaseRenewalFailure === undefined
      ? {}
      : { onLeaseRenewalFailure: input.onLeaseRenewalFailure }),
    ...(input.operationalTelemetry === undefined
      ? {}
      : { operationalTelemetry: input.operationalTelemetry }),
    ...(input.monotonicNow === undefined ? {} : { monotonicNow: input.monotonicNow }),
    now: () => now,
    nextId: (namespace) => ids.shift() ?? `${namespace}.fallback`,
  });
}

function redispatchPort(
  dispatch: jest.Mock,
  reconcile: jest.Mock = jest.fn(async () => ({ status: 'safe_to_dispatch' as const }))
): RuntimeActivityRedispatchPort {
  return { dispatch, reconcile };
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
    | 'human.review.expired'
    | 'human.review.superseded' = 'human.review.approved',
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
          ...(resolution === 'human.review.superseded'
            ? { supersededByTaskId: 'task.redispatch.replacement' }
            : {}),
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
