import { describe, expect, it } from 'vitest';
import {
  classifyMemoryFailure,
  createMemoryFailureFingerprint,
  resolveBoundedMemoryRecovery,
} from './index';

function failure(error: unknown, sideEffectState: 'none' | 'unknown' = 'none') {
  return classifyMemoryFailure(error, {
    id: 'failure-1',
    operation: sideEffectState === 'unknown' ? 'write' : 'search',
    scope: { userId: 'u1' },
    providerId: 'provider-1',
    sideEffectState,
    occurredAt: '2026-07-21T00:00:00.000Z',
  });
}

describe('bounded memory recovery outcomes', () => {
  it('expresses retry as waiting within the same FSM run', () => {
    const value = failure({ code: 'MEMORY_PROVIDER_TIMEOUT', message: 'timeout', retryable: true });
    expect(resolveBoundedMemoryRecovery(value, { maxAttempts: 3, attemptsUsed: 1 })).toMatchObject({
      state: 'waiting',
      retryAllowed: true,
      nextAttempt: 2,
    });
  });

  it('quarantines unknown writes and repeated failure fingerprints', () => {
    const unknown = failure({ code: 'MEMORY_PROVIDER_TIMEOUT', message: 'timeout' }, 'unknown');
    expect(
      resolveBoundedMemoryRecovery(unknown, { maxAttempts: 3, attemptsUsed: 0 })
    ).toMatchObject({ state: 'quarantined', retryAllowed: false });

    const read = failure({ code: 'MEMORY_PROVIDER_TIMEOUT', message: 'timeout', retryable: true });
    const fingerprint = createMemoryFailureFingerprint(read);
    expect(
      resolveBoundedMemoryRecovery(read, {
        maxAttempts: 3,
        attemptsUsed: 1,
        seenFailureFingerprints: [fingerprint],
      })
    ).toMatchObject({ state: 'quarantined', retryAllowed: false, failureFingerprint: fingerprint });
  });

  it('fails when the bounded budget is exhausted', () => {
    const value = failure({ code: 'MEMORY_PROVIDER_TIMEOUT', message: 'timeout', retryable: true });
    expect(resolveBoundedMemoryRecovery(value, { maxAttempts: 2, attemptsUsed: 2 })).toMatchObject({
      state: 'failed',
      retryAllowed: false,
    });
  });
});
