import { describe, expect, it } from 'vitest';
import {
  applyTransition,
  createInitialSnapshot,
  getAllowedTransitions,
  validateFSMProcessSpec,
  type FSMProcessSpec,
} from './index';

const processSpec: FSMProcessSpec = {
  id: 'basic-react-fsm',
  version: '0.0.0',
  initialState: 'Idle',
  states: [
    { id: 'Idle', kind: 'idle' },
    { id: 'Reasoning', kind: 'reasoning' },
    { id: 'Completed', kind: 'completed' },
  ],
  transitions: [
    { from: 'Idle', to: 'Reasoning' },
    { from: 'Reasoning', to: 'Completed' },
  ],
  terminalStates: ['Completed'],
};

describe('@hypha/fsm runtime contracts', () => {
  it('validates and applies explicit transitions', () => {
    validateFSMProcessSpec(processSpec);
    const initial = createInitialSnapshot(processSpec, 'run_1', '2026-07-02T00:00:00.000Z');
    const next = applyTransition(processSpec, initial, 'Reasoning', '2026-07-02T00:00:01.000Z');

    expect(getAllowedTransitions(processSpec, 'Idle')).toHaveLength(1);
    expect(next.currentState).toBe('Reasoning');
    expect(next.statePath).toEqual(['Idle', 'Reasoning']);
  });

  it('rejects hidden transitions', () => {
    const initial = createInitialSnapshot(processSpec, 'run_1');
    expect(() => applyTransition(processSpec, initial, 'Completed')).toThrow(
      /Transition not allowed/
    );
  });
});
