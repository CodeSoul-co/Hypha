import {
  DurableRuntimeTimerWorker,
  RuntimeRecoveryService,
  type EventStore,
  type RuntimeActivityRedispatchRecoveryPort,
  type RuntimeActivityReconciliationPort,
  type RuntimeCancellationRecoveryPort,
  type RuntimeOperationalTelemetry,
  type RuntimeRecoveryRequeuePort,
} from '@hypha/core';
import { FSMRuntime, type FSMProcessSpec } from '@hypha/fsm';
import {
  DurableEventStoreBridge,
  EventFirstRuntime,
  FencedBoundedFSMDriver,
  HarnessedReActFSMRunner,
  RunManager,
  type FencedBoundedFSMDriverOptions,
} from '@hypha/harness';
import type { InferenceProvider } from '@hypha/inference';
import { ReActRunner } from '@hypha/kernel';
import type { ToolRunner } from '@hypha/tools';
import type { RuntimeBackbone } from './RuntimeBackbone';
import { RuntimeCompositionRoot, type RuntimeComposition } from './RuntimeCompositionRoot';
import { CanonicalRunManagerEventStore } from './OrchestrationEventStore';

export interface ServerRuntimeCompositionBindings {
  inference: InferenceProvider;
  toolRunner: ToolRunner;
  fsmSpec: FSMProcessSpec;
  executeState: FencedBoundedFSMDriverOptions['executeState'];
  recoveryActivities: RuntimeActivityReconciliationPort;
  recoveryRedispatches: RuntimeActivityRedispatchRecoveryPort;
  recoveryCancellations: RuntimeCancellationRecoveryPort;
  recoveryRequeue: RuntimeRecoveryRequeuePort;
  operationalTelemetry?: RuntimeOperationalTelemetry;
  nextId?: FencedBoundedFSMDriverOptions['nextId'];
}

export interface ServerRuntimeCompositionOptions extends ServerRuntimeCompositionBindings {
  backbone: RuntimeBackbone;
  mergedEvents: EventStore;
}

/**
 * Binds the Server process to one canonical runtime graph.
 *
 * RunManager writes only schema-backed canonical Runtime families. Merged
 * reads retain module-owned observations during their independent migrations.
 */
export function createServerRuntimeComposition(
  options: ServerRuntimeCompositionOptions
): Readonly<RuntimeComposition> {
  const { backbone } = options;
  return new RuntimeCompositionRoot({
    ...backbone,
    factories: {
      createRunManager: ({ events, runLeases }) => {
        assertCanonicalEvents(events, backbone.events);
        const canonicalEvents = new DurableEventStoreBridge({
          events,
          coordination: {
            runLeases,
            ownerId: 'server.run-manager',
            leaseTtlMs: 30_000,
            nextId: options.nextId ?? nextCompositionId,
          },
        });
        return new RunManager({
          runtime: new EventFirstRuntime(
            new CanonicalRunManagerEventStore(canonicalEvents, options.mergedEvents)
          ),
          ...(options.operationalTelemetry === undefined
            ? {}
            : { operationalTelemetry: options.operationalTelemetry }),
        });
      },
      createTimerWorker: ({ events, projections, projectionStore, runLeases }) =>
        new DurableRuntimeTimerWorker({
          events,
          projections,
          projectionStore,
          runLeases,
          ...(options.operationalTelemetry === undefined
            ? {}
            : { operationalTelemetry: options.operationalTelemetry }),
          ...(options.nextId === undefined ? {} : { nextId: options.nextId }),
        }),
      createRecoveryService: ({ events, projections, projectionStore, runLeases, stateClaims }) =>
        new RuntimeRecoveryService({
          events,
          projections,
          projectionStore,
          runLeases,
          stateClaims,
          activities: options.recoveryActivities,
          redispatches: options.recoveryRedispatches,
          cancellations: options.recoveryCancellations,
          requeue: options.recoveryRequeue,
          ...(options.nextId === undefined ? {} : { nextId: options.nextId }),
        }),
      createFSMDriver: ({ events, projections, projectionStore, runLeases, stateClaims }) =>
        new FencedBoundedFSMDriver({
          events,
          projections,
          projectionStore,
          runLeases,
          stateClaims,
          executeState: options.executeState,
          ...(options.nextId === undefined ? {} : { nextId: options.nextId }),
        }),
      createReActRunner: ({ runManager, reactCheckpoints }) =>
        new HarnessedReActFSMRunner({
          inference: options.inference,
          toolRunner: options.toolRunner,
          runManager,
          fsmSpec: options.fsmSpec,
          reactCheckpointStore: reactCheckpoints,
        }),
      createScopedReActRunnerFactory: ({ reactCheckpoints }) => ({
        create: (runtime, runnerOptions) =>
          new ReActRunner(runtime, {
            ...runnerOptions,
            checkpointStore: runnerOptions.checkpointStore ?? reactCheckpoints,
          }),
      }),
      createRecoveryFSMFactory: () => ({
        create: (input) =>
          new FSMRuntime(input.process, input.runId, input.options, input.snapshot),
      }),
    },
  }).compose();
}

let compositionId = 0;

function nextCompositionId(namespace: string): string {
  compositionId += 1;
  return `${namespace}:${process.pid}:${compositionId}`;
}

function assertCanonicalEvents(actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error('Server Runtime composition received a non-canonical EventRuntime');
  }
}
