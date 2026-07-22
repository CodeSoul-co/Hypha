import { DurableRuntimeTimerWorker, type EventStore } from '@hypha/core';
import { FSMRuntime, type FSMProcessSpec } from '@hypha/fsm';
import {
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

export interface ServerRuntimeCompositionOptions {
  backbone: RuntimeBackbone;
  compatibilityEvents: EventStore;
  inference: InferenceProvider;
  toolRunner: ToolRunner;
  fsmSpec: FSMProcessSpec;
  executeState: FencedBoundedFSMDriverOptions['executeState'];
  nextId?: FencedBoundedFSMDriverOptions['nextId'];
}

/**
 * Binds the Server process to one canonical runtime graph.
 *
 * The compatibility EventStore remains behind RunManager until every legacy
 * Framework event family has a canonical schema and projection.
 */
export function createServerRuntimeComposition(
  options: ServerRuntimeCompositionOptions
): Readonly<RuntimeComposition> {
  const { backbone } = options;
  return new RuntimeCompositionRoot({
    ...backbone,
    factories: {
      createRunManager: ({ events }) => {
        assertCanonicalEvents(events, backbone.events);
        return new RunManager({
          runtime: new EventFirstRuntime(options.compatibilityEvents),
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
      createReActRunner: ({ runManager }) =>
        new HarnessedReActFSMRunner({
          inference: options.inference,
          toolRunner: options.toolRunner,
          runManager,
          fsmSpec: options.fsmSpec,
        }),
      createScopedReActRunnerFactory: () => ({
        create: (runtime, runnerOptions) => new ReActRunner(runtime, runnerOptions),
      }),
      createRecoveryFSMFactory: () => ({
        create: (input) =>
          new FSMRuntime(input.process, input.runId, input.options, input.snapshot),
      }),
    },
  }).compose();
}

function assertCanonicalEvents(actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error('Server Runtime composition received a non-canonical EventRuntime');
  }
}
