import {
  DurableRuntimeTimerWorker,
  RuntimeRecoveryService,
  type EventStore,
  type RuntimeActivityReconciliationPort,
  type RuntimeCancellationRecoveryPort,
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

export interface ServerRuntimeCompositionOptions {
  backbone: RuntimeBackbone;
  mergedEvents: EventStore;
  inference: InferenceProvider;
  toolRunner: ToolRunner;
  fsmSpec: FSMProcessSpec;
  executeState: FencedBoundedFSMDriverOptions['executeState'];
  recoveryActivities: RuntimeActivityReconciliationPort;
  recoveryCancellations: RuntimeCancellationRecoveryPort;
  recoveryRequeue: RuntimeRecoveryRequeuePort;
  nextId?: FencedBoundedFSMDriverOptions['nextId'];
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
        });
      },
      createTimerWorker: ({ events, projections, projectionStore, runLeases }) =>
        new DurableRuntimeTimerWorker({
          events,
          projections,
          projectionStore,
          runLeases,
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
