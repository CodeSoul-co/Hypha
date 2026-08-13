import { readFileSync } from 'fs';
import path from 'path';

import {
  DurableEventRuntime,
  DurableRuntimeTimerWorker,
  InMemoryTelemetryRecorder,
  InMemoryEventStore,
  InMemoryDurableEventStore,
  InMemoryEventSchemaRegistry,
  InMemoryRunLeaseStore,
  RUNTIME_OPERATIONAL_METRIC_NAMES,
  RuntimeOperationalTelemetry,
  RuntimeRecoveryService,
  registerRuntimeOrchestrationEventSchemas,
  type RuntimeCancelResult,
} from '@codesoul-co/core';
import { defaultReActFSMProcessSpec, FSMRuntime } from '@codesoul-co/fsm';
import {
  DurableEventStoreBridge,
  FencedBoundedFSMDriver,
  HarnessedReActFSMRunner,
  RunManager,
} from '@codesoul-co/harness';
import type { InferenceProvider } from '@codesoul-co/inference';
import { ReActRunner, type ReActAgentRuntime } from '@codesoul-co/kernel';
import type { ToolRunner } from '@codesoul-co/tools';
import type { RuntimeBackbone } from './RuntimeBackbone';
import { OrchestrationEventStore } from './OrchestrationEventStore';
import { createServerRuntimeComposition } from './ServerRuntimeComposition';

describe('createServerRuntimeComposition', () => {
  it('keeps compatibility EventStore wiring out of the RunManager composition', () => {
    const source = readFileSync(
      path.resolve(process.cwd(), 'apps/server/src/runtime/ServerRuntimeComposition.ts'),
      'utf8'
    );
    expect(source).not.toContain('compatibilityEvents');
    expect(source).toContain('CanonicalRunManagerEventStore');
  });

  it('constructs the canonical graph and prevents RunManager writes to legacy storage', async () => {
    const schemas = new InMemoryEventSchemaRegistry();
    await registerRuntimeOrchestrationEventSchemas(schemas);
    const canonicalStore = new InMemoryDurableEventStore({ schemaRegistry: schemas });
    const canonicalEvents = new DurableEventRuntime({ store: canonicalStore });
    const runLeases = new InMemoryRunLeaseStore();
    const legacyEvents = new InMemoryEventStore();
    const canonicalBridge = new DurableEventStoreBridge({ events: canonicalEvents });
    const mergedEvents = new OrchestrationEventStore({
      legacy: legacyEvents,
      canonical: () => canonicalBridge,
    });
    const backbone = {
      events: canonicalEvents,
      projections: {},
      projectionStore: {},
      checkpoints: {},
      runLeases,
      stateClaims: {},
      sessionQueue: {},
    } as unknown as RuntimeBackbone;
    const inference = {
      id: 'inference.test',
      infer: jest.fn(),
    } as InferenceProvider;
    const recorder = new InMemoryTelemetryRecorder();
    const operationalTelemetry = new RuntimeOperationalTelemetry({
      recorder,
      now: () => '2026-07-31T06:00:02.000Z',
    });

    const composition = createServerRuntimeComposition({
      backbone,
      mergedEvents,
      inference,
      toolRunner: {} as ToolRunner,
      fsmSpec: defaultReActFSMProcessSpec,
      executeState: async () => ({ result: { kind: 'continued' } }),
      recoveryActivities: {
        reconcile: async (request) => ({
          activityId: request.invocation.activityId,
          status: 'unknown',
        }),
        retry: async () => {
          throw new Error('not configured');
        },
      },
      recoveryRedispatches: {
        redispatch: async () => {
          throw new Error('not configured');
        },
      },
      recoveryCancellations: {
        cancel: async () => ({}) as RuntimeCancelResult,
      },
      recoveryRequeue: { requeue: async () => undefined },
      operationalTelemetry,
    });

    expect(Object.isFrozen(composition)).toBe(true);
    expect(composition.events).toBe(canonicalEvents);
    expect(composition.runManager).toBeInstanceOf(RunManager);
    expect(composition.timerWorker).toBeInstanceOf(DurableRuntimeTimerWorker);
    expect(composition.recoveryService).toBeInstanceOf(RuntimeRecoveryService);
    expect(composition.fsmDriver).toBeInstanceOf(FencedBoundedFSMDriver);
    expect(composition.reactRunner).toBeInstanceOf(HarnessedReActFSMRunner);
    expect(
      (
        composition.timerWorker as unknown as {
          options: { operationalTelemetry?: RuntimeOperationalTelemetry };
        }
      ).options.operationalTelemetry
    ).toBe(operationalTelemetry);
    expect(
      composition.scopedReActRunners.create({} as ReActAgentRuntime, { inference })
    ).toBeInstanceOf(ReActRunner);
    expect(
      composition.recoveryFSMs.create({
        process: defaultReActFSMProcessSpec,
        runId: 'run.recovery.test',
      })
    ).toBeInstanceOf(FSMRuntime);

    await composition.runManager.createSession({ id: 'session.test', userId: 'user.test' });
    await expect(composition.runManager.projectSession('session.test')).resolves.toMatchObject({
      id: 'session.test',
      userId: 'user.test',
    });
    await expect(legacyEvents.list({ runId: 'session-bootstrap' })).resolves.toHaveLength(0);
    await expect(canonicalBridge.list({ runId: 'session-bootstrap' })).resolves.toHaveLength(1);

    await composition.runManager.createRun({
      id: 'run.test',
      sessionId: 'session.test',
      userId: 'user.test',
    });
    await composition.runManager.appendRunEvent({
      id: 'run.test:started',
      type: 'run.started',
      runId: 'run.test',
      sessionId: 'session.test',
      userId: 'user.test',
      payload: { runId: 'run.test' },
    });
    await expect(composition.runManager.projectRun('run.test')).resolves.toMatchObject({
      id: 'run.test',
      status: 'running',
    });
    await expect(
      composition.runManager.appendRunEvent({
        id: 'run.test:model',
        type: 'model.call.completed',
        runId: 'run.test',
        sessionId: 'session.test',
        userId: 'user.test',
        payload: { output: 'legacy-owner-event' },
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_EVENT_FAMILY_NOT_MIGRATED' });
    const checkpoint = {
      version: '1.0.0' as const,
      runId: 'run.test',
      stepId: 'react',
      scopeHash: `sha256:${'1'.repeat(64)}`,
      agentRef: { id: 'agent.test', version: '1.0.0' },
      nextPhase: 'reason' as const,
      messages: [{ role: 'user' as const, content: 'continue' }],
      iterations: 2,
      modelCalls: 2,
      toolCalls: 1,
      totalTokens: 100,
      toolInvocationSequence: 1,
      stepSequence: 5,
      consecutiveNoProgress: 2,
      lastProgressFingerprint: `sha256:${'2'.repeat(64)}`,
      createdAt: '2026-07-31T06:00:00.000Z',
      updatedAt: '2026-07-31T06:00:00.000Z',
    };
    const context = {
      runId: checkpoint.runId,
      sessionId: 'session.test',
      userId: 'user.test',
    };

    await composition.runManager.recordReactContinuationCheckpoint(context, checkpoint);
    await composition.runManager.recordReactContinuationResumed(
      context,
      checkpoint,
      '2026-07-31T06:00:02.000Z'
    );

    expect(recorder.sum(RUNTIME_OPERATIONAL_METRIC_NAMES.noProgressFingerprintTotal)).toBe(1);
    expect(recorder.list(RUNTIME_OPERATIONAL_METRIC_NAMES.continuationLatencyMs)[0]?.value).toBe(
      2_000
    );
    expect(JSON.stringify(recorder.list())).not.toContain(checkpoint.runId);
    expect(JSON.stringify(recorder.list())).not.toContain(checkpoint.lastProgressFingerprint);
    await expect(legacyEvents.list()).resolves.toHaveLength(0);
  });
});
