import { describe, expect, it } from 'vitest';
import { commandExecutionResultExample } from '../command-execution';
import { normalizedExecutionErrorSchema } from '../execution';
import {
  executionLeaseAcquireRequestExample,
  executionLeaseExample,
  executionLeaseGuardExample,
  executionLeaseReleaseRequestExample,
  executionLeaseRenewRequestExample,
  executionRecordCompareAndSetRequestExample,
  executionRecordCreateRequestExample,
  executionRecordExample,
  executionRecoveryAssessmentExample,
  executionStoreJsonSchemas,
  validateExecutionIdempotencyQuery,
  validateExecutionIdempotencyResolution,
  validateExecutionLease,
  validateExecutionLeaseAcquireRequest,
  validateExecutionLeaseReleaseRequest,
  validateExecutionLeaseRenewRequest,
  validateExecutionRecord,
  validateExecutionRecordCompareAndSetRequest,
  validateExecutionRecordCreateRequest,
  validateExecutionRecordQuery,
  validateExecutionRecoveryAssessment,
} from './index';

describe('Execution Store and Lease contracts', () => {
  it('validates the record, lease, mutation, and recovery fixtures', () => {
    expect(validateExecutionLease(executionLeaseExample)).toEqual(executionLeaseExample);
    expect(validateExecutionRecord(executionRecordExample)).toEqual(executionRecordExample);
    expect(validateExecutionRecordCreateRequest(executionRecordCreateRequestExample)).toEqual(
      executionRecordCreateRequestExample
    );
    expect(
      validateExecutionRecordCompareAndSetRequest(executionRecordCompareAndSetRequestExample)
    ).toEqual(executionRecordCompareAndSetRequestExample);
    expect(validateExecutionLeaseAcquireRequest(executionLeaseAcquireRequestExample)).toEqual(
      executionLeaseAcquireRequestExample
    );
    expect(validateExecutionLeaseRenewRequest(executionLeaseRenewRequestExample)).toEqual(
      executionLeaseRenewRequestExample
    );
    expect(validateExecutionLeaseReleaseRequest(executionLeaseReleaseRequestExample)).toEqual(
      executionLeaseReleaseRequestExample
    );
    expect(validateExecutionRecoveryAssessment(executionRecoveryAssessmentExample)).toEqual(
      executionRecoveryAssessmentExample
    );
  });

  it('exports JSON Schemas for every Store boundary', () => {
    expect(Object.keys(executionStoreJsonSchemas)).toEqual(
      expect.arrayContaining([
        'ExecutionLease',
        'ExecutionRecord',
        'ExecutionLeaseGuard',
        'ExecutionRecordCreateRequest',
        'ExecutionRecordCompareAndSetRequest',
        'ExecutionLeaseAcquireRequest',
        'ExecutionLeaseRenewRequest',
        'ExecutionLeaseReleaseRequest',
        'ExecutionRecordQuery',
        'ExecutionRecordPage',
        'ExecutionIdempotencyQuery',
        'ExecutionIdempotencyResolution',
        'ExecutionRecoveryAssessment',
      ])
    );
    expect(executionStoreJsonSchemas.ExecutionLease.required).toContain('fencingToken');
    expect(executionStoreJsonSchemas.ExecutionRecord.required).toContain('revision');
  });

  it('requires monotonic fencing tokens and valid lease time order', () => {
    expect(() => validateExecutionLease({ ...executionLeaseExample, fencingToken: 0 })).toThrow();
    expect(() =>
      validateExecutionLease({
        ...executionLeaseExample,
        heartbeatAt: '2026-07-15T23:59:59.000Z',
      })
    ).toThrow(/acquiredAt/u);
    expect(() =>
      validateExecutionLease({
        ...executionLeaseExample,
        expiresAt: executionLeaseExample.heartbeatAt,
      })
    ).toThrow(/heartbeatAt/u);
  });

  it('binds request, lease, and result identities to the record', () => {
    expect(() =>
      validateExecutionRecord({
        ...executionRecordExample,
        request: { ...executionRecordExample.request, executionId: 'execution.other' },
      })
    ).toThrow(/record id/u);
    expect(() =>
      validateExecutionRecord({
        ...executionRecordExample,
        lease: { ...executionLeaseExample, executionId: 'execution.other' },
      })
    ).toThrow(/record id/u);
  });

  it('requires a matching result for terminal records', () => {
    expect(() =>
      validateExecutionRecord({
        ...executionRecordExample,
        status: 'completed',
        lease: undefined,
      })
    ).toThrow(/result/u);

    expect(
      validateExecutionRecord({
        ...executionRecordExample,
        status: 'completed',
        lease: undefined,
        result: {
          ...commandExecutionResultExample,
          executionId: executionRecordExample.id,
          sandboxId: 'sandbox.example',
        },
      }).status
    ).toBe('completed');

    expect(() =>
      validateExecutionRecord({
        ...executionRecordExample,
        status: 'running',
        result: {
          ...commandExecutionResultExample,
          executionId: executionRecordExample.id,
          sandboxId: 'sandbox.example',
        },
      })
    ).toThrow(/record status/u);
  });

  it('requires fingerprints to be anchored to an idempotency key', () => {
    const request = { ...executionRecordExample.request };
    delete request.idempotencyKey;
    expect(() => validateExecutionRecord({ ...executionRecordExample, request })).toThrow(
      /idempotencyKey/u
    );
  });

  it('rejects record timestamps that move backwards', () => {
    expect(() =>
      validateExecutionRecord({
        ...executionRecordExample,
        updatedAt: '2026-07-15T23:59:59.000Z',
      })
    ).toThrow(/createdAt/u);
  });

  it('requires compare-and-set to increment exactly one revision', () => {
    expect(() =>
      validateExecutionRecordCompareAndSetRequest({
        ...executionRecordCompareAndSetRequestExample,
        next: { ...executionRecordCompareAndSetRequestExample.next, revision: 3 },
      })
    ).toThrow(/exactly one/u);
    expect(() =>
      validateExecutionRecordCompareAndSetRequest({
        ...executionRecordCompareAndSetRequestExample,
        executionId: 'execution.other',
      })
    ).toThrow(/match executionId/u);
  });

  it('creates records only in a clean queued state', () => {
    expect(() =>
      validateExecutionRecordCreateRequest({
        ...executionRecordCreateRequestExample,
        record: { ...executionRecordCreateRequestExample.record, revision: 1 },
      })
    ).toThrow(/zero/u);
    expect(() =>
      validateExecutionRecordCreateRequest({
        ...executionRecordCreateRequestExample,
        record: {
          ...executionRecordCreateRequestExample.record,
          status: 'starting',
          attempt: 1,
          lease: executionLeaseExample,
        },
      })
    ).toThrow(/queued|must not contain/u);
  });

  it('prevents leased records from being updated without the current fence', () => {
    const { leaseGuard: _leaseGuard, ...unguarded } = executionRecordCompareAndSetRequestExample;
    expect(() => validateExecutionRecordCompareAndSetRequest(unguarded)).toThrow(/leaseGuard/u);
    expect(() =>
      validateExecutionRecordCompareAndSetRequest({
        ...executionRecordCompareAndSetRequestExample,
        leaseGuard: { ...executionLeaseGuardExample, fencingToken: 2 },
      })
    ).toThrow(/current lease/u);
  });

  it('requires revision-aware, time-bounded lease operations', () => {
    expect(() =>
      validateExecutionLeaseAcquireRequest({
        ...executionLeaseAcquireRequestExample,
        ttlMs: 0,
      })
    ).toThrow();
    expect(() =>
      validateExecutionLeaseRenewRequest({
        ...executionLeaseRenewRequestExample,
        expectedRevision: -1,
      })
    ).toThrow();
    expect(() => {
      const { leaseGuard: _leaseGuard, ...unguarded } = executionLeaseReleaseRequestExample;
      validateExecutionLeaseReleaseRequest(unguarded);
    }).toThrow();
  });

  it('validates recovery queries and rejects duplicate status filters', () => {
    expect(
      validateExecutionRecordQuery({
        statuses: ['starting', 'running'],
        leaseExpiresBefore: '2026-07-16T00:01:00.000Z',
        limit: 100,
      })
    ).toMatchObject({ limit: 100 });
    expect(() => validateExecutionRecordQuery({ statuses: ['running', 'running'] })).toThrow(
      /duplicate statuses/u
    );
  });

  it('distinguishes idempotency miss, match, and conflict', () => {
    const query = {
      userId: 'user.example',
      workspaceId: 'workspace.example',
      idempotencyKey: 'command:run.example:step.example',
      fingerprint: 'sha256:command-fingerprint',
    };
    expect(validateExecutionIdempotencyQuery(query)).toEqual(query);
    expect(validateExecutionIdempotencyResolution({ status: 'miss' })).toEqual({
      status: 'miss',
    });
    expect(
      validateExecutionIdempotencyResolution({
        status: 'match',
        record: executionRecordExample,
      }).status
    ).toBe('match');
    expect(
      validateExecutionIdempotencyResolution({
        status: 'conflict',
        recordId: executionRecordExample.id,
        existingFingerprint: 'sha256:different-fingerprint',
      }).status
    ).toBe('conflict');
  });

  it('requires recovery evidence without deciding Runtime recovery behavior', () => {
    expect(() =>
      validateExecutionRecoveryAssessment({
        ...executionRecoveryAssessmentExample,
        providerStatusRef: undefined,
      })
    ).toThrow(/Provider status/u);
    expect(() =>
      validateExecutionRecoveryAssessment({
        ...executionRecoveryAssessmentExample,
        disposition: 'provider_state_unknown',
        providerStatusRef: undefined,
      })
    ).toThrow(/reason/u);
    expect(
      validateExecutionRecoveryAssessment({
        ...executionRecoveryAssessmentExample,
        disposition: 'provider_state_unknown',
        providerStatusRef: undefined,
        reason: 'Provider could not be queried',
      }).disposition
    ).toBe('provider_state_unknown');
  });

  it('accepts normalized Store conflict errors', () => {
    for (const code of [
      'EXECUTION_REVISION_CONFLICT',
      'EXECUTION_LEASE_HELD',
      'EXECUTION_LEASE_LOST',
      'EXECUTION_IDEMPOTENCY_CONFLICT',
    ]) {
      expect(
        normalizedExecutionErrorSchema.parse({
          code,
          message: 'store conflict',
          retryable: code !== 'EXECUTION_IDEMPOTENCY_CONFLICT',
        }).code
      ).toBe(code);
    }
  });
});
