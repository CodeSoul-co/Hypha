import type { EventRuntime } from '@hypha/core';
import type { FencedBoundedFSMDriver, HarnessedReActFSMRunner, RunManager } from '@hypha/harness';
import { RuntimeCompositionRoot } from './RuntimeCompositionRoot';

describe('RuntimeCompositionRoot', () => {
  it('constructs every canonical component once from the same EventRuntime', () => {
    const events = {} as EventRuntime;
    const runManager = {} as RunManager;
    const fsmDriver = {} as FencedBoundedFSMDriver;
    const reactRunner = {} as HarnessedReActFSMRunner;
    const createRunManager = jest.fn(() => runManager);
    const createFSMDriver = jest.fn(() => fsmDriver);
    const createReActRunner = jest.fn(() => reactRunner);
    const root = new RuntimeCompositionRoot({
      events,
      factories: { createRunManager, createFSMDriver, createReActRunner },
    });

    const first = root.compose();
    const second = root.compose();

    expect(second).toBe(first);
    expect(Object.isFrozen(first)).toBe(true);
    expect(first).toEqual({ events, runManager, fsmDriver, reactRunner });
    expect(createRunManager).toHaveBeenCalledTimes(1);
    expect(createRunManager).toHaveBeenCalledWith({ events });
    expect(createFSMDriver).toHaveBeenCalledTimes(1);
    expect(createFSMDriver).toHaveBeenCalledWith({ events, runManager });
    expect(createReActRunner).toHaveBeenCalledTimes(1);
    expect(createReActRunner).toHaveBeenCalledWith({ events, runManager, fsmDriver });
  });

  it('fails composition when a required canonical component is absent', () => {
    const events = {} as EventRuntime;
    const root = new RuntimeCompositionRoot({
      events,
      factories: {
        createRunManager: () => undefined as unknown as RunManager,
        createFSMDriver: () => ({}) as FencedBoundedFSMDriver,
        createReActRunner: () => ({}) as HarnessedReActFSMRunner,
      },
    });

    expect(() => root.compose()).toThrow('Runtime composition factory did not provide RunManager');
  });
});
