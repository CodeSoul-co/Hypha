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
import {
  RuntimeCompositionRoot,
  type RuntimeCompositionDependencies,
} from './RuntimeCompositionRoot';

function dependencies(): RuntimeCompositionDependencies {
  return {
    events: {} as EventRuntime,
    projections: {} as ProjectionEngine,
    projectionStore: {} as ProjectionStore<RuntimeOrchestrationProjection>,
    checkpoints: {} as RuntimeCheckpointStore,
    runLeases: {} as RunLeaseStore,
    stateClaims: {} as StateExecutionClaimStore,
  };
}

describe('RuntimeCompositionRoot', () => {
  it('constructs every canonical component once from the same durable dependencies', () => {
    const durable = dependencies();
    const runManager = {} as RunManager;
    const fsmDriver = {} as FencedBoundedFSMDriver;
    const reactRunner = {} as HarnessedReActFSMRunner;
    const createRunManager = jest.fn(() => runManager);
    const createFSMDriver = jest.fn(() => fsmDriver);
    const createReActRunner = jest.fn(() => reactRunner);
    const root = new RuntimeCompositionRoot({
      ...durable,
      factories: { createRunManager, createFSMDriver, createReActRunner },
    });

    const first = root.compose();
    const second = root.compose();

    expect(second).toBe(first);
    expect(Object.isFrozen(first)).toBe(true);
    expect(first).toEqual({ ...durable, runManager, fsmDriver, reactRunner });
    expect(createRunManager).toHaveBeenCalledTimes(1);
    expect(createRunManager).toHaveBeenCalledWith({ events: durable.events });
    expect(createFSMDriver).toHaveBeenCalledTimes(1);
    expect(createFSMDriver).toHaveBeenCalledWith({ ...durable, runManager });
    expect(createReActRunner).toHaveBeenCalledTimes(1);
    expect(createReActRunner).toHaveBeenCalledWith({ ...durable, runManager, fsmDriver });
  });

  it('fails composition when a required canonical component is absent', () => {
    const root = new RuntimeCompositionRoot({
      ...dependencies(),
      factories: {
        createRunManager: () => undefined as unknown as RunManager,
        createFSMDriver: () => ({}) as FencedBoundedFSMDriver,
        createReActRunner: () => ({}) as HarnessedReActFSMRunner,
      },
    });

    expect(() => root.compose()).toThrow('Runtime composition factory did not provide RunManager');
  });
});
