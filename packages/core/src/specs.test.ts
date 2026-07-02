import { describe, expect, it } from 'vitest';
import { FrameworkError, formatFrameworkId } from './index';

describe('@hypha/core stage-0 contracts', () => {
  it('formats stable hypha ids', () => {
    expect(formatFrameworkId({ prefix: 'run', value: 'abc' })).toBe('run_abc');
  });

  it('keeps errors structured', () => {
    const error = new FrameworkError({
      code: 'TEST_ERROR',
      message: 'failed',
      context: { runId: 'run_1' },
    });
    expect(error.code).toBe('TEST_ERROR');
    expect(error.context?.runId).toBe('run_1');
  });
});
