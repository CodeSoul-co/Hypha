import type {
  EventRuntime,
  DurableRuntimeTimerWorker,
  ProjectionEngine,
  ProjectionStore,
  RunLeaseStore,
  RuntimeCheckpointStore,
  RuntimeOrchestrationProjection,
  SessionQueue,
  StateExecutionClaimStore,
} from '@hypha/core';
import type { FencedBoundedFSMDriver, HarnessedReActFSMRunner, RunManager } from '@hypha/harness';
import type { ReActRunner } from '@hypha/kernel';
import {
  RuntimeCompositionRoot,
  type RecoveryFSMFactory,
  type RuntimeCompositionDependencies,
  type ScopedReActRunnerFactory,
} from './RuntimeCompositionRoot';

function dependencies(): RuntimeCompositionDependencies {
  return {
    events: {} as EventRuntime,
    projections: {} as ProjectionEngine,
    projectionStore: {} as ProjectionStore<RuntimeOrchestrationProjection>,
    checkpoints: {} as RuntimeCheckpointStore,
    runLeases: {} as RunLeaseStore,
    stateClaims: {} as StateExecutionClaimStore,
    sessionQueue: {} as SessionQueue,
  };
}

describe('RuntimeCompositionRoot', () => {
  it('constructs every canonical component once from the same durable dependencies', () => {
    const durable = dependencies();
    const runManager = {} as RunManager;
    const timerWorker = {} as DurableRuntimeTimerWorker;
    const fsmDriver = {} as FencedBoundedFSMDriver;
    const reactRunner = {} as HarnessedReActFSMRunner;
    const scopedReActRunners = {} as ScopedReActRunnerFactory;
    const recoveryFSMs = {} as RecoveryFSMFactory;
    const createRunManager = jest.fn(() => runManager);
    const createTimerWorker = jest.fn(() => timerWorker);
    const createFSMDriver = jest.fn(() => fsmDriver);
    const createReActRunner = jest.fn(() => reactRunner);
    const createScopedReActRunnerFactory = jest.fn(() => scopedReActRunners);
    const createRecoveryFSMFactory = jest.fn(() => recoveryFSMs);
    const root = new RuntimeCompositionRoot({
      ...durable,
      factories: {
        createRunManager,
        createTimerWorker,
        createFSMDriver,
        createReActRunner,
        createScopedReActRunnerFactory,
        createRecoveryFSMFactory,
      },
    });

    const first = root.compose();
    const second = root.compose();

    expect(second).toBe(first);
    expect(Object.isFrozen(first)).toBe(true);
    expect(first).toEqual({
      ...durable,
      runManager,
      timerWorker,
      fsmDriver,
      reactRunner,
      scopedReActRunners,
      recoveryFSMs,
    });
    expect(createRunManager).toHaveBeenCalledTimes(1);
    expect(createRunManager).toHaveBeenCalledWith({ events: durable.events });
    expect(createTimerWorker).toHaveBeenCalledTimes(1);
    expect(createTimerWorker).toHaveBeenCalledWith(durable);
    expect(createFSMDriver).toHaveBeenCalledTimes(1);
    expect(createFSMDriver).toHaveBeenCalledWith({ ...durable, runManager });
    expect(createReActRunner).toHaveBeenCalledTimes(1);
    expect(createReActRunner).toHaveBeenCalledWith({ ...durable, runManager, fsmDriver });
    expect(createScopedReActRunnerFactory).toHaveBeenCalledTimes(1);
    expect(createScopedReActRunnerFactory).toHaveBeenCalledWith({
      ...durable,
      runManager,
      fsmDriver,
      reactRunner,
    });
    expect(createRecoveryFSMFactory).toHaveBeenCalledTimes(1);
    expect(createRecoveryFSMFactory).toHaveBeenCalledWith({
      ...durable,
      runManager,
      fsmDriver,
      reactRunner,
      scopedReActRunners,
    });
  });

  it('fails composition when a required canonical component is absent', () => {
    const root = new RuntimeCompositionRoot({
      ...dependencies(),
      factories: {
        createRunManager: () => undefined as unknown as RunManager,
        createTimerWorker: () => undefined as unknown as DurableRuntimeTimerWorker,
        createFSMDriver: () => ({}) as FencedBoundedFSMDriver,
        createReActRunner: () => ({}) as HarnessedReActFSMRunner,
        createScopedReActRunnerFactory: () => undefined as unknown as ScopedReActRunnerFactory,
        createRecoveryFSMFactory: () => undefined as unknown as RecoveryFSMFactory,
      },
    });

    expect(() => root.compose()).toThrow('Runtime composition factory did not provide RunManager');
  });

  it('fails composition when the scoped ReAct runner factory is absent', () => {
    const root = new RuntimeCompositionRoot({
      ...dependencies(),
      factories: {
        createRunManager: () => ({}) as RunManager,
        createTimerWorker: () => ({}) as DurableRuntimeTimerWorker,
        createFSMDriver: () => ({}) as FencedBoundedFSMDriver,
        createReActRunner: () => ({}) as HarnessedReActFSMRunner,
        createScopedReActRunnerFactory: () => undefined as unknown as ScopedReActRunnerFactory,
        createRecoveryFSMFactory: () => undefined as unknown as RecoveryFSMFactory,
      },
    });

    expect(() => root.compose()).toThrow(
      'Runtime composition factory did not provide ScopedReActRunnerFactory'
    );
  });

  it('fails composition when the recovery FSM factory is absent', () => {
    const root = new RuntimeCompositionRoot({
      ...dependencies(),
      factories: {
        createRunManager: () => ({}) as RunManager,
        createTimerWorker: () => ({}) as DurableRuntimeTimerWorker,
        createFSMDriver: () => ({}) as FencedBoundedFSMDriver,
        createReActRunner: () => ({}) as HarnessedReActFSMRunner,
        createScopedReActRunnerFactory: () => ({}) as ScopedReActRunnerFactory,
        createRecoveryFSMFactory: () => undefined as unknown as RecoveryFSMFactory,
      },
    });

    expect(() => root.compose()).toThrow(
      'Runtime composition factory did not provide RecoveryFSMFactory'
    );
  });

  it('fails composition when the durable Timer Worker is absent', () => {
    const root = new RuntimeCompositionRoot({
      ...dependencies(),
      factories: {
        createRunManager: () => ({}) as RunManager,
        createTimerWorker: () => undefined as unknown as DurableRuntimeTimerWorker,
        createFSMDriver: () => ({}) as FencedBoundedFSMDriver,
        createReActRunner: () => ({}) as HarnessedReActFSMRunner,
        createScopedReActRunnerFactory: () => ({}) as ScopedReActRunnerFactory,
        createRecoveryFSMFactory: () => ({}) as RecoveryFSMFactory,
      },
    });

    expect(() => root.compose()).toThrow(
      'Runtime composition factory did not provide DurableRuntimeTimerWorker'
    );
  });
});
