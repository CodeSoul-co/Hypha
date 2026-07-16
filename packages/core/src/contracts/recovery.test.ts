import { describe, expect, it } from 'vitest';
import {
  recoveryEvidenceHash,
  recoveryFailureFingerprint,
  recoveryKnowledgeKeyMatches,
  type RecoveryFailure,
} from './recovery';

const failure: RecoveryFailure = {
  id: 'failure_1',
  module: 'memory',
  category: 'memory_failure',
  code: 'MEMORY_PROVIDER_UNAVAILABLE',
  message: 'provider unavailable',
  occurredAt: '2026-07-16T00:00:00.000Z',
  retryable: true,
  sideEffectState: 'none',
  rootCauseKey: 'storage.primary',
  evidence: {
    observedAt: '2026-07-16T00:00:00.000Z',
    operationKey: 'memory.read:session_1',
    dependencyKey: 'storage.primary',
    revision: 1,
    policyRevision: 'policy-v1',
  },
};

describe('@hypha/core recovery contracts', () => {
  it('keeps a failure fingerprint stable across attempts and messages', () => {
    expect(
      recoveryFailureFingerprint({
        ...failure,
        id: 'failure_2',
        message: 'same outage with different text',
        occurredAt: '2026-07-16T00:00:01.000Z',
        evidence: { ...failure.evidence, observedAt: '2026-07-16T00:00:01.000Z', revision: 2 },
      })
    ).toBe(recoveryFailureFingerprint(failure));
  });

  it('detects evidence progress without treating observation time as progress', () => {
    expect(
      recoveryEvidenceHash({
        ...failure.evidence,
        observedAt: '2026-07-16T00:00:10.000Z',
      })
    ).toBe(recoveryEvidenceHash(failure.evidence));
    expect(
      recoveryEvidenceHash({
        ...failure.evidence,
        observedAt: '2026-07-16T00:00:10.000Z',
        state: 'provider_recovered',
      })
    ).not.toBe(recoveryEvidenceHash(failure.evidence));
  });

  it('requires policy, spec, and provider revisions on recovery knowledge hits', () => {
    const key = {
      fingerprint: recoveryFailureFingerprint(failure),
      participantId: 'memory-primary',
      policyRevision: 'policy-v1',
      specRevision: 'spec-v1',
      providerRevision: 'provider-v1',
    };
    expect(recoveryKnowledgeKeyMatches(key, { ...key })).toBe(true);
    expect(recoveryKnowledgeKeyMatches(key, { ...key, policyRevision: 'policy-v2' })).toBe(false);
  });
});
