import {
  DurableEventRuntime,
  DurableRuntimeTimerWorker,
  InMemoryEventStore,
  InMemoryDurableEventStore,
  InMemoryEventSchemaRegistry,
  InMemoryRunLeaseStore,
  RuntimeRecoveryService,
  registerRuntimeOrchestrationEventSchemas,
  type RuntimeCancelResult,
} from '@hypha/core';
import { defaultReActFSMProcessSpec, FSMRuntime } from '@hypha/fsm';
import {
  DurableEventStoreBridge,
  FencedBoundedFSMDriver,
  HarnessedReActFSMRunner,
  RunManager,
} from '@hypha/harness';
import type { InferenceProvider } from '@hypha/inference';
import { ReActRunner, type ReActAgentRuntime } from '@hypha/kernel';
import type { ToolRunner } from '@hypha/tools';
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
      recoveryCancellations: {
        cancel: async () => ({}) as RuntimeCancelResult,
      },
      recoveryRequeue: { requeue: async () => undefined },
    });

    expect(Object.isFrozen(composition)).toBe(true);
    expect(composition.events).toBe(canonicalEvents);
    expect(composition.runManager).toBeInstanceOf(RunManager);
    expect(composition.timerWorker).toBeInstanceOf(DurableRuntimeTimerWorker);
    expect(composition.recoveryService).toBeInstanceOf(RuntimeRecoveryService);
    expect(composition.fsmDriver).toBeInstanceOf(FencedBoundedFSMDriver);
    expect(composition.reactRunner).toBeInstanceOf(HarnessedReActFSMRunner);
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
    await expect(legacyEvents.list()).resolves.toHaveLength(0);
  });
});
import { readFileSync } from 'fs';
import path from 'path';
