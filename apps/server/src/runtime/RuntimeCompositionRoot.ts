import type {
  EventRuntime,
  ProjectionEngine,
  ProjectionStore,
  RunLeaseStore,
  RuntimeCheckpointStore,
  RuntimeOrchestrationProjection,
  StateExecutionClaimStore,
} from '@hypha/core';
import type { FencedBoundedFSMDriver, HarnessedReActFSMRunner, RunManager } from '@hypha/harness';
import type { FSMProcessSpec, FSMRuntime, FSMRuntimeOptions, FSMSnapshot } from '@hypha/fsm';
import type { ReActAgentRuntime, ReActRunner, ReActRunnerOptions } from '@hypha/kernel';

export interface ScopedReActRunnerFactory {
  create(runtime: ReActAgentRuntime, options: ReActRunnerOptions): ReActRunner;
}

export interface RecoveryFSMFactory {
  create(input: {
    process: FSMProcessSpec;
    runId: string;
    options?: FSMRuntimeOptions;
    snapshot?: FSMSnapshot;
  }): FSMRuntime;
}

export interface RuntimeCompositionDependencies {
  events: EventRuntime;
  projections: ProjectionEngine;
  projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
  checkpoints: RuntimeCheckpointStore;
  runLeases: RunLeaseStore;
  stateClaims: StateExecutionClaimStore;
}

export interface RuntimeComposition extends RuntimeCompositionDependencies {
  runManager: RunManager;
  fsmDriver: FencedBoundedFSMDriver;
  reactRunner: HarnessedReActFSMRunner;
  scopedReActRunners: ScopedReActRunnerFactory;
  recoveryFSMs: RecoveryFSMFactory;
}

export interface RuntimeCompositionFactories {
  createRunManager(input: { events: EventRuntime }): RunManager;
  createFSMDriver(
    input: RuntimeCompositionDependencies & { runManager: RunManager }
  ): FencedBoundedFSMDriver;
  createReActRunner(
    input: RuntimeCompositionDependencies & {
      runManager: RunManager;
      fsmDriver: FencedBoundedFSMDriver;
    }
  ): HarnessedReActFSMRunner;
  createScopedReActRunnerFactory(
    input: RuntimeCompositionDependencies & {
      runManager: RunManager;
      fsmDriver: FencedBoundedFSMDriver;
      reactRunner: HarnessedReActFSMRunner;
    }
  ): ScopedReActRunnerFactory;
  createRecoveryFSMFactory(
    input: RuntimeCompositionDependencies & {
      runManager: RunManager;
      fsmDriver: FencedBoundedFSMDriver;
      reactRunner: HarnessedReActFSMRunner;
      scopedReActRunners: ScopedReActRunnerFactory;
    }
  ): RecoveryFSMFactory;
}

export interface RuntimeCompositionRootOptions extends RuntimeCompositionDependencies {
  factories: RuntimeCompositionFactories;
}

/**
 * Owns construction of the canonical server runtime graph.
 *
 * Factories receive the same durable Event, Projection, Checkpoint, Lease, and
 * Claim dependencies so no component can silently create a second authority.
 */
export class RuntimeCompositionRoot {
  private composition?: Readonly<RuntimeComposition>;

  constructor(private readonly options: RuntimeCompositionRootOptions) {}

  compose(): Readonly<RuntimeComposition> {
    if (this.composition) return this.composition;

    const { events, projections, projectionStore, checkpoints, runLeases, stateClaims, factories } =
      this.options;
    const dependencies = {
      events,
      projections,
      projectionStore,
      checkpoints,
      runLeases,
      stateClaims,
    };
    const runManager = requiredComponent('RunManager', factories.createRunManager({ events }));
    const fsmDriver = requiredComponent(
      'FencedBoundedFSMDriver',
      factories.createFSMDriver({ ...dependencies, runManager })
    );
    const reactRunner = requiredComponent(
      'HarnessedReActFSMRunner',
      factories.createReActRunner({ ...dependencies, runManager, fsmDriver })
    );
    const scopedReActRunners = requiredComponent(
      'ScopedReActRunnerFactory',
      factories.createScopedReActRunnerFactory({
        ...dependencies,
        runManager,
        fsmDriver,
        reactRunner,
      })
    );
    const recoveryFSMs = requiredComponent(
      'RecoveryFSMFactory',
      factories.createRecoveryFSMFactory({
        ...dependencies,
        runManager,
        fsmDriver,
        reactRunner,
        scopedReActRunners,
      })
    );

    this.composition = Object.freeze({
      ...dependencies,
      runManager,
      fsmDriver,
      reactRunner,
      scopedReActRunners,
      recoveryFSMs,
    });
    return this.composition;
  }
}

function requiredComponent<T>(name: string, component: T | null | undefined): T {
  if (component === null || component === undefined) {
    throw new Error(`Runtime composition factory did not provide ${name}`);
  }
  return component;
}
