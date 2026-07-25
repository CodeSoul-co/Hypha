import type { RecoveryFailure } from '@hypha/core';
import { adviseMemoryRecovery } from './recovery';
import { sha256 } from './memory-utils';

export type MemoryRunRecoveryState = 'degraded' | 'waiting' | 'review' | 'quarantined' | 'failed';

export interface MemoryRecoveryBudget {
  maxAttempts: number;
  attemptsUsed: number;
  deadline?: string;
  now?: string;
  seenFailureFingerprints?: string[];
}

export interface BoundedMemoryRecoveryOutcome {
  state: MemoryRunRecoveryState;
  strategy: ReturnType<typeof adviseMemoryRecovery>['strategy'];
  retryAllowed: boolean;
  boundedEmptyResultAllowed: boolean;
  failureFingerprint: string;
  reason: string;
  nextAttempt?: number;
}

export function resolveBoundedMemoryRecovery(
  failure: RecoveryFailure,
  budget: MemoryRecoveryBudget
): BoundedMemoryRecoveryOutcome {
  const advice = adviseMemoryRecovery(failure);
  const fingerprint = createMemoryFailureFingerprint(failure);
  const repeated = budget.seenFailureFingerprints?.includes(fingerprint) ?? false;
  const exhausted = budget.attemptsUsed >= budget.maxAttempts;
  const expired = Boolean(
    budget.deadline && (budget.now ?? new Date().toISOString()) >= budget.deadline
  );

  if (failure.sideEffectState === 'unknown' || advice.strategy === 'reconcile') {
    return outcome(
      'quarantined',
      advice,
      fingerprint,
      false,
      'Unknown provider commit state requires reconciliation before another write.'
    );
  }
  if (advice.strategy === 'human_review') {
    return outcome('review', advice, fingerprint, false, advice.reason);
  }
  if (advice.strategy === 'quarantine' || repeated) {
    return outcome(
      'quarantined',
      advice,
      fingerprint,
      false,
      repeated
        ? 'The same failure fingerprint repeated and automatic retry is fenced.'
        : advice.reason
    );
  }
  if (exhausted || expired || advice.strategy === 'fail') {
    return outcome(
      'failed',
      advice,
      fingerprint,
      false,
      exhausted
        ? 'Memory recovery attempt budget is exhausted.'
        : expired
          ? 'Memory recovery deadline expired.'
          : advice.reason
    );
  }
  if (advice.strategy === 'retry') {
    return {
      ...outcome('waiting', advice, fingerprint, true, advice.reason),
      nextAttempt: budget.attemptsUsed + 1,
    };
  }
  return outcome('degraded', advice, fingerprint, false, advice.reason);
}

export function createMemoryFailureFingerprint(failure: RecoveryFailure): string {
  return sha256({
    module: failure.module,
    category: failure.category,
    code: failure.code,
    operationKey: failure.evidence.operationKey,
    dependencyKey: failure.evidence.dependencyKey,
    providerRevision: failure.evidence.providerRevision,
    sideEffectState: failure.sideEffectState,
  });
}

function outcome(
  state: MemoryRunRecoveryState,
  advice: ReturnType<typeof adviseMemoryRecovery>,
  failureFingerprint: string,
  retryAllowed: boolean,
  reason: string
): BoundedMemoryRecoveryOutcome {
  return {
    state,
    strategy: advice.strategy,
    retryAllowed,
    boundedEmptyResultAllowed: state === 'degraded' && advice.allowBoundedEmptyResult,
    failureFingerprint,
    reason,
  };
}
