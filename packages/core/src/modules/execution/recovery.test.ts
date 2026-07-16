import { describe, expect, it } from 'vitest';
import type { NormalizedExecutionError } from '../../contracts/execution';
import { adviseExecutionRecovery, classifyExecutionFailure } from './recovery';

function error(
  code: NormalizedExecutionError['code'],
  retryable: boolean,
  details?: Record<string, unknown>
): NormalizedExecutionError {
  return { code, message: code, retryable, details };
}

describe('@hypha/core execution recovery classification', () => {
  it('requires provider reconciliation for unknown execution results', () => {
    const failure = classifyExecutionFailure(error('EXECUTION_RESULT_UNKNOWN', true), {
      id: 'execution_unknown',
      operation: 'poll',
      occurredAt: '2026-07-16T00:00:00.000Z',
      providerId: 'sandbox.primary',
      providerRevision: 'provider-v1',
      assessment: {
        executionId: 'execution_1',
        recordRevision: 2,
        disposition: 'provider_queryable',
        assessedAt: '2026-07-16T00:00:00.000Z',
      },
    });

    expect(failure).toMatchObject({
      module: 'execution',
      category: 'execution_failure',
      sideEffectState: 'unknown',
      retryable: false,
      evidence: {
        operationKey: 'execution.poll:execution_1',
        state: 'provider_queryable',
        providerRevision: 'provider-v1',
      },
    });
    expect(adviseExecutionRecovery(failure)).toMatchObject({
      strategy: 'reconcile',
      requireReceiptReconciliation: true,
    });
  });

  it('retries revision conflicts only after refreshing the fenced execution record', () => {
    const failure = classifyExecutionFailure(error('EXECUTION_REVISION_CONFLICT', false), {
      id: 'execution_revision_conflict',
      operation: 'persist',
      occurredAt: '2026-07-16T00:00:00.000Z',
      providerId: 'sandbox.primary',
    });

    expect(failure).toMatchObject({
      category: 'concurrency_conflict',
      sideEffectState: 'not_started',
      retryable: true,
    });
    expect(adviseExecutionRecovery(failure)).toMatchObject({
      strategy: 'retry',
      refreshRecordBeforeRetry: true,
    });
  });

  it('uses a rejected provider receipt as proof that a start can retry safely', () => {
    const failure = classifyExecutionFailure(
      error('EXECUTION_ENVIRONMENT_UNAVAILABLE', true, {
        receipt: {
          id: 'receipt_1',
          providerId: 'sandbox.primary',
          executionId: 'execution_1',
          status: 'rejected',
          issuedAt: '2026-07-16T00:00:00.000Z',
          receiptHash: 'receipt-hash',
        },
      }),
      {
        id: 'execution_rejected',
        operation: 'start',
        occurredAt: '2026-07-16T00:00:00.000Z',
      }
    );

    expect(failure).toMatchObject({
      category: 'transient_dependency',
      sideEffectState: 'not_started',
      retryable: true,
      evidence: { receiptStatus: 'rejected' },
    });
  });

  it('routes policy and workspace boundary failures to human review without retry', () => {
    const failure = classifyExecutionFailure(error('EXECUTION_PATH_DENIED', false), {
      id: 'execution_path_denied',
      operation: 'validate',
      occurredAt: '2026-07-16T00:00:00.000Z',
    });

    expect(failure).toMatchObject({
      category: 'authorization',
      sideEffectState: 'not_started',
      retryable: false,
    });
    expect(adviseExecutionRecovery(failure).strategy).toBe('human_review');
  });
});
