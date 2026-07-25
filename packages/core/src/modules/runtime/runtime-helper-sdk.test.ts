import { describe, expect, it, vi } from 'vitest';
import type { RuntimeDeterminismScope } from '../../contracts/runtime-helpers';
import {
  createRuntimeHelperSdk,
  DefaultRuntimeTransitionHelper,
  DefaultRuntimeWaitHelper,
  InMemoryRuntimeDeterminismStore,
} from './runtime-helper-sdk';

const scope: RuntimeDeterminismScope = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  runId: 'run.example',
  stateId: 'state.plan',
  stateAttempt: 1,
};

describe('Runtime Helper SDK', () => {
  it('returns immutable proposals and results without an FSM mutation surface', () => {
    const transitions = new DefaultRuntimeTransitionHelper();
    const proposal = transitions.propose('Review', 'approval required', { pending: true });
    const completed = transitions.complete({ answer: 42 }, { done: true });

    expect(proposal).toEqual({
      to: 'Review',
      reason: 'approval required',
      variablesPatch: { pending: true },
    });
    expect(completed).toEqual({
      kind: 'completed',
      output: { answer: 42 },
      variablesPatch: { done: true },
    });
    expect(Object.isFrozen(proposal)).toBe(true);
    expect(Object.isFrozen(proposal.variablesPatch)).toBe(true);
    expect(Object.keys(transitions).sort()).toEqual([]);
    expect('transition' in transitions).toBe(false);
    expect('snapshot' in transitions).toBe(false);
  });

  it('creates validated persistent wait intents', () => {
    const waits = new DefaultRuntimeWaitHelper();

    expect(waits.signal({ key: 'approval.received' })).toEqual({
      kind: 'waiting',
      wait: { type: 'signal', key: 'approval.received' },
    });
    expect(waits.timer({ fireAt: '2026-07-19T08:00:00.000Z' })).toEqual({
      kind: 'waiting',
      wait: { type: 'timer', expiresAt: '2026-07-19T08:00:00.000Z' },
    });
    expect(waits.pause({ reason: 'operator requested', resumeKey: 'resume.plan' })).toEqual({
      kind: 'waiting',
      wait: { type: 'pause', key: 'resume.plan', reason: 'operator requested' },
    });
    expect(() => waits.timer({ fireAt: 'invalid' })).toThrow();
  });

  it('records clock observations once and reuses them during replay', async () => {
    const store = new InMemoryRuntimeDeterminismStore();
    const source = vi
      .fn()
      .mockReturnValueOnce('2026-07-18T08:00:00.000Z')
      .mockReturnValueOnce('2026-07-18T08:00:01.000Z');
    const first = createRuntimeHelperSdk({ scope, determinismStore: store, now: source });

    expect(await first.clock.now()).toBe('2026-07-18T08:00:00.000Z');
    expect(await first.clock.now()).toBe('2026-07-18T08:00:01.000Z');
    expect(source).toHaveBeenCalledTimes(2);

    const replaySource = vi.fn(() => {
      throw new Error('clock source must not run during replay');
    });
    const replay = createRuntimeHelperSdk({ scope, determinismStore: store, now: replaySource });
    expect(await replay.clock.now()).toBe('2026-07-18T08:00:00.000Z');
    expect(await replay.clock.now()).toBe('2026-07-18T08:00:01.000Z');
    expect(replaySource).not.toHaveBeenCalled();
    await expect(replay.clock.sleepUntil('2026-07-19T08:00:00.000Z')).resolves.toEqual({
      kind: 'waiting',
      wait: { type: 'timer', expiresAt: '2026-07-19T08:00:00.000Z' },
    });
  });

  it('records namespace-scoped IDs and replays the same sequence', async () => {
    const store = new InMemoryRuntimeDeterminismStore();
    let generated = 0;
    const first = createRuntimeHelperSdk({
      scope,
      determinismStore: store,
      nextId: (namespace) => `${namespace}.${++generated}`,
    });

    expect(await first.ids.next('activity')).toBe('activity.1');
    expect(await first.ids.next('activity')).toBe('activity.2');
    expect(await first.ids.next('wait')).toBe('wait.3');

    const replaySource = vi.fn(() => 'must-not-be-used');
    const replay = createRuntimeHelperSdk({
      scope,
      determinismStore: store,
      nextId: replaySource,
    });
    expect(await replay.ids.next('activity')).toBe('activity.1');
    expect(await replay.ids.next('activity')).toBe('activity.2');
    expect(await replay.ids.next('wait')).toBe('wait.3');
    expect(replaySource).not.toHaveBeenCalled();
  });

  it('serializes one producer per observation key under concurrency', async () => {
    const store = new InMemoryRuntimeDeterminismStore();
    const producer = vi.fn(async () => {
      await Promise.resolve();
      return 'value.1';
    });
    const request = { scope, key: 'id:activity:1', kind: 'id' as const };

    const resolutions = await Promise.all(
      Array.from({ length: 10 }, () => store.resolve(request, producer))
    );

    expect(producer).toHaveBeenCalledTimes(1);
    expect(resolutions.map((item) => item.observation.value)).toEqual(
      Array.from({ length: 10 }, () => 'value.1')
    );
    expect(resolutions.filter((item) => item.reused)).toHaveLength(9);
  });

  it('isolates deterministic observations by state attempt scope', async () => {
    const store = new InMemoryRuntimeDeterminismStore();
    const first = await store.resolve(
      { scope, key: 'clock.now:1', kind: 'clock' },
      () => '2026-07-18T08:00:00.000Z'
    );
    const second = await store.resolve(
      {
        scope: { ...scope, stateAttempt: 2 },
        key: 'clock.now:1',
        kind: 'clock',
      },
      () => '2026-07-18T09:00:00.000Z'
    );

    expect(first.observation.value).not.toBe(second.observation.value);
  });

  it('exposes only constrained helper groups from the SDK', () => {
    const sdk = createRuntimeHelperSdk({
      scope,
      determinismStore: new InMemoryRuntimeDeterminismStore(),
    });
    expect(Object.keys(sdk).sort()).toEqual(['clock', 'ids', 'transitions', 'waits']);
    expect('fsm' in sdk).toBe(false);
    expect('eventStore' in sdk).toBe(false);
    expect('snapshot' in sdk).toBe(false);
  });
});
