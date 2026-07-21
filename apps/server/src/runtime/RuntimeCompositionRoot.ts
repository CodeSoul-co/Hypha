import type { EventRuntime } from '@hypha/core';
import type { FencedBoundedFSMDriver, HarnessedReActFSMRunner, RunManager } from '@hypha/harness';

export interface RuntimeComposition {
  events: EventRuntime;
  runManager: RunManager;
  fsmDriver: FencedBoundedFSMDriver;
  reactRunner: HarnessedReActFSMRunner;
}

export interface RuntimeCompositionFactories {
  createRunManager(input: { events: EventRuntime }): RunManager;
  createFSMDriver(input: { events: EventRuntime; runManager: RunManager }): FencedBoundedFSMDriver;
  createReActRunner(input: {
    events: EventRuntime;
    runManager: RunManager;
    fsmDriver: FencedBoundedFSMDriver;
  }): HarnessedReActFSMRunner;
}

export interface RuntimeCompositionRootOptions {
  events: EventRuntime;
  factories: RuntimeCompositionFactories;
}

/**
 * Owns construction of the canonical server runtime graph.
 *
 * Factories receive the same durable EventRuntime instance explicitly so a
 * component cannot silently become authoritative over a second event source.
 */
export class RuntimeCompositionRoot {
  private composition?: Readonly<RuntimeComposition>;

  constructor(private readonly options: RuntimeCompositionRootOptions) {}

  compose(): Readonly<RuntimeComposition> {
    if (this.composition) return this.composition;

    const { events, factories } = this.options;
    const runManager = requiredComponent('RunManager', factories.createRunManager({ events }));
    const fsmDriver = requiredComponent(
      'FencedBoundedFSMDriver',
      factories.createFSMDriver({ events, runManager })
    );
    const reactRunner = requiredComponent(
      'HarnessedReActFSMRunner',
      factories.createReActRunner({ events, runManager, fsmDriver })
    );

    this.composition = Object.freeze({
      events,
      runManager,
      fsmDriver,
      reactRunner,
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
