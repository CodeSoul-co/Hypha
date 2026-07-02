import { describe, expect, it } from 'vitest';
import { createFrameworkEvent } from '@hypha/core';
import { assertEventTypes, assertStatePath } from './index';

describe('@hypha/testing golden helpers', () => {
  it('checks golden event types and state paths', () => {
    const fixture = {
      id: 'fixture',
      version: '0.0.0',
      statePath: ['Idle', 'Completed'],
      events: [
        createFrameworkEvent({
          id: 'event_1',
          type: 'run.started',
          runId: 'run_1',
          payload: {},
        }),
      ],
    };

    expect(assertEventTypes(fixture, ['run.started'])).toBe(true);
    expect(assertStatePath(fixture, ['Idle', 'Completed'])).toBe(true);
  });
});
