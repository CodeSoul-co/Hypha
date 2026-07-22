import { InMemoryEventStore, type EventRuntime } from '@hypha/core';
import { defaultReActFSMProcessSpec, FSMRuntime } from '@hypha/fsm';
import { FencedBoundedFSMDriver, HarnessedReActFSMRunner, RunManager } from '@hypha/harness';
import type { InferenceProvider } from '@hypha/inference';
import { ReActRunner, type ReActAgentRuntime } from '@hypha/kernel';
import type { ToolRunner } from '@hypha/tools';
import type { RuntimeBackbone } from './RuntimeBackbone';
import { createServerRuntimeComposition } from './ServerRuntimeComposition';

describe('createServerRuntimeComposition', () => {
  it('constructs the canonical Server graph and keeps legacy events behind RunManager', async () => {
    const canonicalEvents = {} as EventRuntime;
    const compatibilityEvents = new InMemoryEventStore();
    const backbone = {
      events: canonicalEvents,
      projections: {},
      projectionStore: {},
      checkpoints: {},
      runLeases: {},
      stateClaims: {},
    } as RuntimeBackbone;
    const inference = {
      id: 'inference.test',
      infer: jest.fn(),
    } as InferenceProvider;

    const composition = createServerRuntimeComposition({
      backbone,
      compatibilityEvents,
      inference,
      toolRunner: {} as ToolRunner,
      fsmSpec: defaultReActFSMProcessSpec,
      executeState: async () => ({ result: { kind: 'continued' } }),
    });

    expect(Object.isFrozen(composition)).toBe(true);
    expect(composition.events).toBe(canonicalEvents);
    expect(composition.runManager).toBeInstanceOf(RunManager);
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
    await expect(compatibilityEvents.list({ runId: 'session-bootstrap' })).resolves.toHaveLength(1);

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
  });
});
