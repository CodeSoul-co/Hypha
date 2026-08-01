import { describe, expect, it } from 'vitest';
import { adviseStorageRecovery, classifyStorageFailure } from './recovery';

const baseContext = {
  id: 'storage_failure_1',
  providerId: 'events-primary',
  role: 'event_log' as const,
  engine: 'postgres' as const,
  resourceKey: 'run:run_1',
  occurredAt: '2026-07-16T00:00:00.000Z',
  providerRevision: 'postgres-17',
};

describe('@hypha/storage recovery classification', () => {
  it('permits bounded read retry and a compatible replica fallback', () => {
    const failure = classifyStorageFailure(
      { code: 'ETIMEDOUT', message: 'read timed out' },
      { ...baseContext, operation: 'read' }
    );

    expect(failure).toMatchObject({
      module: 'storage',
      category: 'timeout',
      retryable: true,
      sideEffectState: 'none',
      rootCauseKey: 'storage-provider:events-primary',
    });
    expect(adviseStorageRecovery(failure)).toMatchObject({
      strategy: 'retry',
      mayUseCompatibleReplica: true,
      requireReconciliation: false,
    });
  });

  it('reconciles an ambiguous event append before any retry', () => {
    const failure = classifyStorageFailure(
      { code: 'ECONNRESET', transactionId: 'tx_1', receiptStatus: 'accepted' },
      {
        ...baseContext,
        operation: 'event_append',
        idempotencyKey: 'run_1:sequence_4',
        input: { sequence: 4, type: 'tool.call.completed' },
      }
    );

    expect(failure).toMatchObject({
      category: 'transient_dependency',
      retryable: false,
      sideEffectState: 'unknown',
      evidence: {
        receiptStatus: 'accepted',
        idempotencyKey: 'run_1:sequence_4',
        markers: { transactionId: 'tx_1' },
      },
    });
    expect(adviseStorageRecovery(failure)).toMatchObject({
      strategy: 'reconcile',
      requireReconciliation: true,
      invalidateDerivedCaches: true,
    });
  });

  it('refreshes revisions after a proven pre-commit concurrency conflict', () => {
    const failure = classifyStorageFailure(
      { code: 'STORAGE_REVISION_MISMATCH', observedRevision: 8 },
      {
        ...baseContext,
        operation: 'update',
        expectedRevision: 7,
      }
    );

    expect(failure).toMatchObject({
      category: 'concurrency_conflict',
      retryable: true,
      sideEffectState: 'not_started',
      evidence: { revision: 8 },
    });
    expect(adviseStorageRecovery(failure)).toMatchObject({
      strategy: 'retry',
      refreshRevisionBeforeRetry: true,
    });
  });

  it('normalizes numeric provider conflict codes', () => {
    const failure = classifyStorageFailure(
      { code: 'DUPLICATE_KEY', providerCode: 11000, receiptStatus: 'rejected' },
      { ...baseContext, operation: 'write' }
    );

    expect(failure).toMatchObject({
      category: 'concurrency_conflict',
      retryable: true,
      sideEffectState: 'not_started',
    });
  });

  it('quarantines integrity failures and invalidates derived caches', () => {
    const failure = classifyStorageFailure(
      { code: 'CHECKSUM_MISMATCH', checksum: 'bad-hash' },
      { ...baseContext, operation: 'read' }
    );

    expect(failure).toMatchObject({
      category: 'invariant_violation',
      retryable: false,
      sideEffectState: 'none',
    });
    expect(adviseStorageRecovery(failure)).toMatchObject({
      strategy: 'quarantine',
      invalidateDerivedCaches: true,
    });
  });

  it('compensates a known committed mutation instead of replaying it', () => {
    const failure = classifyStorageFailure(
      { code: 'POST_COMMIT_NOTIFICATION_FAILED', receiptStatus: 'completed' },
      {
        ...baseContext,
        operation: 'artifact_write',
        compensationAvailable: true,
      }
    );

    expect(failure).toMatchObject({
      retryable: false,
      sideEffectState: 'committed',
      compensationAvailable: true,
    });
    expect(adviseStorageRecovery(failure)).toMatchObject({
      strategy: 'compensate',
      invalidateDerivedCaches: true,
    });
  });
});
