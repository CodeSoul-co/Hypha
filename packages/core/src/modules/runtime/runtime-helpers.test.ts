import { describe, expect, it, vi } from 'vitest';
import type { NormalizedRuntimeError } from '../../contracts/runtime';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventStoreV2, type EventStreamScope } from './event-store';
import { DurableEventRuntime } from './event-runtime';
import {
  createRuntimeHelperFacade,
  DefaultRuntimeTransitionHelper,
  DefaultRuntimeWaitHelper,
  EventSourcedRuntimeObservationPort,
} from './runtime-helpers';
import { EventSourcedRunManager } from './run-manager';

const scope: EventStreamScope = {
  tenantId: 'tenant.helper',
  userId: 'user.helper',
  runId: 'run.helper',
};

function command(expectedLastSequence: number, expectedRunRevision: number, name: string) {
  return {
    scope,
    expectedLastSequence,
    expectedRunRevision,
    fencingToken: 1,
    idempotencyKey: `idempotency.${name}`,
    operationId: `operation.${name}`,
  };
}

async function runtimeFixture() {
  const store = new InMemoryEventStoreV2();
  const events = new DurableEventRuntime({ store });
  const runs = new EventSourcedRunManager({ events });
  await runs.create({
    ...command(0, 0, 'create'),
    sessionId: 'session.helper',
    workflowRef: { id: 'workflow.helper', revision: 'revision.1' },
    workflowRevision: 'revision.1',
    processSpecRef: 'process.helper',
    processHash: 'sha256:process-helper',
    input: {},
  });
  await runs.start(command(1, 1, 'start'));
  return { events, runs, store };
}

describe('Runtime Helper SDK', () => {
  it('records Clock and ID observations once and reuses them during replay', async () => {
    const { events, runs, store } = await runtimeFixture();
    const wallClock = vi
      .fn()
      .mockReturnValueOnce('2026-07-17T09:00:00.000Z')
      .mockReturnValueOnce('2026-07-17T09:00:01.000Z');
    let generated = 0;
    const generateId = vi.fn((namespace: string) => `${namespace}.${++generated}`);
    const liveObservations = new EventSourcedRuntimeObservationPort({
      events,
      scope,
      fencingToken: 1,
      operationPrefix: 'attempt.helper.1',
      now: () => '2026-07-17T09:01:00.000Z',
    });
    const live = createRuntimeHelperFacade({
      observations: liveObservations,
      contextKey: 'attempt.helper.1',
      wallClock,
      generateId,
    });

    const liveValues = {
      clock: [await live.clock.now(), await live.clock.now()],
      ids: [await live.ids.next('task'), await live.ids.next('task')],
      action: await live.actions.propose({
        type: 'tool',
        targetRef: 'tool.search',
        input: { query: 'runtime' },
      }),
    };

    const replayClock = vi.fn(() => {
      throw new Error('Replay must not read the wall clock');
    });
    const replayIds = vi.fn(() => {
      throw new Error('Replay must not generate ids');
    });
    const replay = createRuntimeHelperFacade({
      observations: new EventSourcedRuntimeObservationPort({
        events,
        scope,
        fencingToken: 1,
        operationPrefix: 'attempt.helper.1',
        mode: 'replay',
      }),
      contextKey: 'attempt.helper.1',
      wallClock: replayClock,
      generateId: replayIds,
    });
    const replayValues = {
      clock: [await replay.clock.now(), await replay.clock.now()],
      ids: [await replay.ids.next('task'), await replay.ids.next('task')],
      action: await replay.actions.propose({
        type: 'tool',
        targetRef: 'tool.search',
        input: { query: 'runtime' },
      }),
    };

    expect(replayValues).toEqual(liveValues);
    expect(replayClock).not.toHaveBeenCalled();
    expect(replayIds).not.toHaveBeenCalled();
    expect(wallClock).toHaveBeenCalledTimes(2);
    expect(generateId).toHaveBeenCalledTimes(3);
    expect(
      (await store.readStream(scope)).filter(
        (event) => event.type === 'runtime.observation.recorded'
      )
    ).toHaveLength(5);
    await expect(runs.get(scope)).resolves.toMatchObject({ status: 'running', revision: 7 });
  });

  it('fails replay when a deterministic observation is absent', async () => {
    const { events } = await runtimeFixture();
    const replay = createRuntimeHelperFacade({
      observations: new EventSourcedRuntimeObservationPort({
        events,
        scope,
        fencingToken: 1,
        operationPrefix: 'attempt.missing',
        mode: 'replay',
      }),
      contextKey: 'attempt.missing',
      generateId: () => 'must-not-run',
    });

    await expect(replay.clock.now()).rejects.toMatchObject({
      code: 'RUNTIME_REPLAY_DIVERGENCE',
    });
  });

  it('returns immutable Transition proposals and State results', () => {
    const helper = new DefaultRuntimeTransitionHelper();
    const patch = { approved: true };
    const output = { plan: ['step-1'] };
    const proposal = helper.propose('Publish', 'approved', patch);
    const completed = helper.complete(output, patch);
    const failure: NormalizedRuntimeError = {
      code: 'RUNTIME_INTERNAL_ERROR',
      message: 'state failed',
      retryable: false,
    };
    patch.approved = false;
    output.plan.push('mutated');

    expect(proposal).toEqual({
      to: 'Publish',
      reason: 'approved',
      variablesPatch: { approved: true },
    });
    expect(completed).toEqual({
      status: 'completed',
      output: { plan: ['step-1'] },
      outputHash: hashCanonicalJson({ plan: ['step-1'] }),
      variablesPatch: { approved: true },
    });
    expect(helper.continue({ observation: true })).toEqual({
      status: 'continue',
      output: { observation: true },
    });
    expect(helper.fail(failure)).toEqual({ status: 'failed', failure });
  });

  it('creates persistent Wait intents without changing Runtime state', () => {
    const waits = new DefaultRuntimeWaitHelper();

    expect(waits.human({ key: 'approval', pendingActionRef: 'action.publish' })).toMatchObject({
      status: 'waiting_human',
      wait: { type: 'human', key: 'approval', pendingActionRef: 'action.publish' },
    });
    expect(
      waits.signal({ key: 'payment.completed', expectedSchema: { type: 'object' } })
    ).toMatchObject({
      status: 'waiting_signal',
      wait: { type: 'signal', key: 'payment.completed' },
    });
    expect(waits.timer({ expiresAt: '2026-07-18T00:00:00.000Z' })).toEqual({
      status: 'waiting_timer',
      wait: { type: 'timer', expiresAt: '2026-07-18T00:00:00.000Z' },
    });
    expect(waits.pause({ reason: 'operator requested' })).toEqual({
      status: 'paused',
      metadata: { reason: 'operator requested' },
    });
    expect(() => waits.signal({ key: '' })).toThrow(/signal.key/u);
    expect(() => waits.timer({ expiresAt: 'invalid' })).toThrow(/Timestamp/u);
  });
});
