import { describe, expect, it } from 'vitest';
import { FSMRuntime, type FSMProcessSpec } from './index';

const spec: FSMProcessSpec = {
  id: 'fsm.atomicity.fixture',
  version: '1.0.0',
  initialState: 'Draft',
  states: [
    { id: 'Draft', kind: 'domain' },
    { id: 'Approved', kind: 'completed' },
  ],
  transitions: [{ from: 'Draft', to: 'Approved' }],
  terminalStates: ['Approved'],
};

describe('FSMRuntime snapshot commit boundary', () => {
  it('does not advance the snapshot when transition persistence fails', async () => {
    const runtime = new FSMRuntime(spec, 'run.atomicity', {
      onTransition: () => {
        throw new Error('append failed');
      },
    });
    await runtime.start();

    await expect(runtime.transition('Approved')).rejects.toThrow(/append failed/u);
    expect(runtime.getSnapshot()).toMatchObject({ currentState: 'Draft', status: 'running' });
  });

  it('does not advance when next-state entry persistence fails', async () => {
    const runtime = new FSMRuntime(spec, 'run.atomicity', {
      onStateEntered: (record) => {
        if (record.stateId === 'Approved') throw new Error('state entry append failed');
      },
    });
    await runtime.start();

    await expect(runtime.transition('Approved')).rejects.toThrow(/state entry append failed/u);
    expect(runtime.getSnapshot()).toMatchObject({ currentState: 'Draft', status: 'running' });
  });

  it('does not expose mutable internal snapshot references', async () => {
    const runtime = new FSMRuntime(spec, 'run.atomicity');
    const exposed = runtime.getSnapshot();
    exposed.currentState = 'Approved';
    exposed.statePath.push('Approved');

    expect(runtime.getSnapshot()).toMatchObject({
      currentState: 'Draft',
      statePath: ['Draft'],
    });
  });

  it('allows initialization persistence to retry after a failed callback', async () => {
    let attempts = 0;
    const runtime = new FSMRuntime(spec, 'run.atomicity', {
      onStateEntered: () => {
        attempts += 1;
        if (attempts === 1) throw new Error('temporary append failure');
      },
    });

    await expect(runtime.start()).rejects.toThrow(/temporary append failure/u);
    await expect(runtime.start()).resolves.toMatchObject({ currentState: 'Draft' });
    expect(attempts).toBe(2);
  });
});
