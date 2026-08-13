import {
  DurableEventRuntime,
  InMemoryDurableEventStore,
  InMemoryEventSchemaRegistry,
  InMemorySessionQueue,
  InMemoryTelemetryRecorder,
  RUNTIME_OPERATIONAL_METRIC_NAMES,
  RuntimeOperationalTelemetry,
  hashCanonicalJson,
  registerRuntimeOrchestrationEventSchemas,
  type ContinueReActCommandPayloadV1,
  type EventRuntime,
} from '@codesoul-co/hypha-core';
import {
  InMemoryReActContinuationCheckpointStore,
  type ReActContinuationCheckpoint,
} from '@codesoul-co/hypha-kernel';
import {
  ServerReActContinuationReconciler,
  type ReActContinuationSuspensionEvidence,
} from './ServerReActContinuationReconciler';

const now = '2026-07-24T06:00:00.000Z';
const scopeHash = `sha256:${'1'.repeat(64)}`;

function checkpoint(): ReActContinuationCheckpoint {
  return {
    version: '1.0.0',
    runId: 'run.reconcile',
    stepId: 'react',
    scopeHash,
    agentRef: { id: 'agent.reconcile', version: '1.0.0' },
    nextPhase: 'reason',
    messages: [{ role: 'user', content: 'continue' }],
    iterations: 2,
    modelCalls: 2,
    toolCalls: 1,
    totalTokens: 100,
    toolInvocationSequence: 1,
    stepSequence: 5,
    consecutiveNoProgress: 0,
    createdAt: now,
    updatedAt: now,
  };
}

function payload(
  evidence: ReActContinuationSuspensionEvidence,
  value: ReActContinuationCheckpoint
): ContinueReActCommandPayloadV1 {
  return {
    version: '1.0.0',
    runId: evidence.runId,
    sessionId: evidence.sessionId,
    userId: evidence.userId,
    stepId: evidence.stepId,
    checkpointRef: 'react-checkpoint:run.reconcile:react:5',
    checkpointHash: hashCanonicalJson(value),
    checkpointSequence: value.stepSequence,
    scopeHash: evidence.scopeHash,
    agentRef: value.agentRef,
    domainPackRef: { id: 'domain.reconcile', version: '1.0.0' },
    promptSnapshotRef: 'prompt-snapshot:reconcile',
    promptSnapshotHash: `sha256:${'2'.repeat(64)}`,
    capabilitySnapshotRef: 'capability-snapshot:reconcile',
    capabilitySnapshotHash: `sha256:${'3'.repeat(64)}`,
    globalBudget: {
      iterations: 20,
      modelCalls: 20,
      toolCalls: 10,
      totalTokens: 50_000,
    },
    cancellationRevision: 0,
    createdAt: now,
  };
}

describe('ServerReActContinuationReconciler', () => {
  it('idempotently schedules an orphan checkpoint after a suspension Event', async () => {
    const events = await eventRuntime();
    const value = checkpoint();
    await appendSuspension(events, value);
    const checkpoints = new InMemoryReActContinuationCheckpointStore();
    await checkpoints.put(value, 'checkpoint.reconcile');
    const schedule = jest.fn(async () => ({ taskId: 'command.reconciled', reused: false }));
    const quarantine = jest.fn();
    const reconciler = new ServerReActContinuationReconciler({
      events,
      queue: new InMemorySessionQueue({ now: () => now }),
      checkpoints,
      scheduler: { schedule },
      payloadFactory: {
        build: async ({ evidence, checkpoint: stored }) => payload(evidence, stored),
      },
      quarantine: { quarantine },
    });

    await expect(reconciler.reconcile()).resolves.toMatchObject({
      scannedRuns: 1,
      scheduled: 1,
      reused: 0,
      quarantined: 0,
    });
    expect(schedule).toHaveBeenCalledTimes(1);
    expect(quarantine).not.toHaveBeenCalled();
  });

  it('quarantines a queued command when its checkpoint is missing', async () => {
    const events = await eventRuntime();
    const value = checkpoint();
    await appendSuspension(events, value);
    const queue = new InMemorySessionQueue({ now: () => now });
    await queue.enqueue({
      id: 'command.orphan',
      commandType: 'continue_react',
      idempotencyKey: 'orphan',
      userId: 'user.reconcile',
      sessionId: 'session.reconcile',
      targetRunId: value.runId,
      payloadHash: `sha256:${'9'.repeat(64)}`,
      createdAt: now,
      availableAt: now,
    });
    const quarantine = jest.fn(async () => undefined);
    const schedule = jest.fn();
    const telemetryRecorder = new InMemoryTelemetryRecorder();
    const reconciler = new ServerReActContinuationReconciler({
      events,
      queue,
      checkpoints: new InMemoryReActContinuationCheckpointStore(),
      scheduler: { schedule },
      payloadFactory: {
        build: async ({ evidence, checkpoint: stored }) => payload(evidence, stored),
      },
      quarantine: { quarantine },
      operationalTelemetry: new RuntimeOperationalTelemetry({
        recorder: telemetryRecorder,
        now: () => now,
      }),
    });

    await expect(reconciler.reconcile()).resolves.toMatchObject({
      scheduled: 0,
      quarantined: 1,
    });
    expect(quarantine).toHaveBeenCalledWith(
      expect.objectContaining({
        reason: 'command_without_valid_checkpoint',
        commandIds: ['command.orphan'],
      })
    );
    expect(schedule).not.toHaveBeenCalled();
    expect(telemetryRecorder.sum(RUNTIME_OPERATIONAL_METRIC_NAMES.quarantineTotal)).toBe(1);
  });

  it('does not resume a HumanTask before approval and advances it with reviewer feedback', async () => {
    const events = await eventRuntime();
    const value = checkpoint();
    await appendHumanReview(events, value, false);
    const checkpoints = new InMemoryReActContinuationCheckpointStore();
    await checkpoints.put(value, 'checkpoint.human-review');
    const schedule = jest.fn(async () => ({ taskId: 'command.human-review', reused: false }));
    const reconciler = new ServerReActContinuationReconciler({
      events,
      queue: new InMemorySessionQueue({ now: () => now }),
      checkpoints,
      scheduler: { schedule },
      payloadFactory: {
        build: async ({ evidence, checkpoint: stored }) => payload(evidence, stored),
      },
      quarantine: { quarantine: jest.fn() },
    });

    await expect(reconciler.reconcile()).resolves.toMatchObject({ scheduled: 0 });
    expect(schedule).not.toHaveBeenCalled();

    await appendHumanApproval(events);
    await expect(reconciler.reconcile()).resolves.toMatchObject({
      scheduled: 1,
      quarantined: 0,
    });
    const advanced = await checkpoints.get(value.runId, value.stepId, value.scopeHash);
    expect(advanced).toMatchObject({
      stepSequence: 6,
      nextPhase: 'reason',
      consecutiveNoProgress: 0,
      updatedAt: now,
    });
    expect(advanced?.messages.at(-1)).toEqual({
      role: 'user',
      content: 'Human review approved. Reviewer feedback: use the safer read-only plan',
    });
  });

  it('does not recreate a continuation after durable resume evidence', async () => {
    const events = await eventRuntime();
    const value = checkpoint();
    await appendSuspension(events, value);
    await events.append({
      scope: { userId: 'user.reconcile', runId: value.runId },
      events: [
        {
          id: 'event.resumed',
          type: 'react.continuation.resumed',
          version: '1.0.0',
          userId: 'user.reconcile',
          sessionId: 'session.reconcile',
          runId: value.runId,
          stepId: value.stepId,
          timestamp: now,
          payload: {
            stepId: value.stepId,
            scopeHash: value.scopeHash,
            checkpointStepSequence: value.stepSequence,
            checkpointHash: hashCanonicalJson(value),
            resumedAt: now,
          },
        },
      ],
      expectedLastSequence: 1,
      idempotencyKey: 'append.resume',
    });
    const checkpoints = new InMemoryReActContinuationCheckpointStore();
    await checkpoints.put(value, 'checkpoint.resumed');
    const schedule = jest.fn();
    const reconciler = new ServerReActContinuationReconciler({
      events,
      queue: new InMemorySessionQueue({ now: () => now }),
      checkpoints,
      scheduler: { schedule },
      payloadFactory: {
        build: async ({ evidence, checkpoint: stored }) => payload(evidence, stored),
      },
      quarantine: { quarantine: jest.fn() },
    });

    await expect(reconciler.reconcile()).resolves.toMatchObject({ scheduled: 0 });
    expect(schedule).not.toHaveBeenCalled();
  });

  it('bounds scans by all Session commands instead of only matching continuations', async () => {
    const events = await eventRuntime();
    const value = checkpoint();
    await appendSuspension(events, value);
    const checkpoints = new InMemoryReActContinuationCheckpointStore();
    await checkpoints.put(value, 'checkpoint.scan-bound');
    const list = jest.fn(async () =>
      [1, 2].map(
        (sequence) =>
          ({
            id: `irrelevant.${sequence}`,
            commandType: 'signal',
            idempotencyKey: `irrelevant.${sequence}`,
            userId: 'user.reconcile',
            sessionId: 'session.reconcile',
            payloadRef: `payload.${sequence}`,
            payloadHash: `sha256:${'4'.repeat(64)}`,
            status: 'queued',
            priority: 0,
            maxAttempts: 1,
            attempt: 0,
            leaseEpoch: 0,
            enqueueSequence: sequence,
            createdAt: now,
            availableAt: now,
          }) as const
      )
    );
    const reconciler = new ServerReActContinuationReconciler({
      events,
      queue: { list } as never,
      checkpoints,
      scheduler: { schedule: jest.fn() },
      payloadFactory: {
        build: async ({ evidence, checkpoint: stored }) => payload(evidence, stored),
      },
      quarantine: { quarantine: jest.fn() },
      maxCommandsPerSession: 2,
    });

    await expect(reconciler.reconcile()).rejects.toMatchObject({
      code: 'RUNTIME_RESOURCE_EXHAUSTED',
    });
    expect(list).toHaveBeenCalledTimes(1);
  });
});

async function eventRuntime(): Promise<EventRuntime> {
  const schemaRegistry = new InMemoryEventSchemaRegistry();
  await registerRuntimeOrchestrationEventSchemas(schemaRegistry);
  return new DurableEventRuntime({
    store: new InMemoryDurableEventStore({ schemaRegistry, now: () => now }),
    now: () => now,
  });
}

async function appendSuspension(
  events: EventRuntime,
  value: ReActContinuationCheckpoint
): Promise<void> {
  await events.append({
    scope: { userId: 'user.reconcile', runId: value.runId },
    events: [
      {
        id: 'event.suspended',
        type: 'react.continuation.suspended',
        version: '1.0.0',
        userId: 'user.reconcile',
        sessionId: 'session.reconcile',
        runId: value.runId,
        stepId: value.stepId,
        timestamp: now,
        payload: {
          stepId: value.stepId,
          scopeHash: value.scopeHash,
          stepSequence: value.stepSequence,
          reason: 'quantum_exhausted',
          retryable: true,
          requiresHumanReview: false,
          checkpointHash: hashCanonicalJson(value),
        },
      },
    ],
    expectedLastSequence: 0,
    idempotencyKey: 'append.suspension',
  });
}

async function appendHumanReview(
  events: EventRuntime,
  value: ReActContinuationCheckpoint,
  approved: boolean
): Promise<void> {
  await events.append({
    scope: { userId: 'user.reconcile', runId: value.runId },
    events: [
      {
        id: 'event.human.requested',
        type: 'human.review.requested',
        version: '1.0.0',
        userId: 'user.reconcile',
        sessionId: 'session.reconcile',
        runId: value.runId,
        timestamp: now,
        payload: {
          taskId: 'task.react-review',
          metadata: {
            resumeMode: 'react_feedback',
            stepId: value.stepId,
            scopeHash: value.scopeHash,
            checkpointSequence: value.stepSequence,
            checkpointHash: hashCanonicalJson(value),
          },
        },
      },
      ...(approved
        ? [
            {
              id: 'event.human.approved',
              type: 'human.review.approved' as const,
              version: '1.0.0',
              userId: 'user.reconcile',
              sessionId: 'session.reconcile',
              runId: value.runId,
              timestamp: now,
              payload: {
                taskId: 'task.react-review',
                reason: 'use the safer read-only plan',
              },
            },
          ]
        : []),
    ],
    expectedLastSequence: 0,
    idempotencyKey: 'append.human-review',
  });
}

async function appendHumanApproval(events: EventRuntime): Promise<void> {
  await events.append({
    scope: { userId: 'user.reconcile', runId: 'run.reconcile' },
    events: [
      {
        id: 'event.human.approved',
        type: 'human.review.approved',
        version: '1.0.0',
        userId: 'user.reconcile',
        sessionId: 'session.reconcile',
        runId: 'run.reconcile',
        timestamp: now,
        payload: {
          taskId: 'task.react-review',
          reason: 'use the safer read-only plan',
        },
      },
    ],
    expectedLastSequence: 1,
    idempotencyKey: 'append.human-approval',
  });
}
