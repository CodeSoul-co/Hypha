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
} from '@hypha/core';
import {
  InMemoryReActContinuationCheckpointStore,
  type ReActContinuationCheckpoint,
} from '@hypha/kernel';
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
