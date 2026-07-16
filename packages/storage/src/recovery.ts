import {
  stableRecoveryHash,
  type RecoveryCategory,
  type RecoveryFailure,
  type RecoverySideEffectState,
  type RecoveryStrategy,
} from '@hypha/core';
import type { StorageEngine, StorageRole } from './index';

export type StorageRecoveryOperation =
  | 'read'
  | 'query'
  | 'list'
  | 'write'
  | 'update'
  | 'delete'
  | 'transaction_begin'
  | 'transaction_commit'
  | 'transaction_rollback'
  | 'event_append'
  | 'artifact_write'
  | 'artifact_delete'
  | 'lease_acquire'
  | 'lease_renew'
  | 'lease_release'
  | 'snapshot'
  | 'restore';

export interface StorageFailureContext {
  id: string;
  operation: StorageRecoveryOperation;
  providerId: string;
  role: StorageRole;
  engine?: StorageEngine;
  resourceKey?: string;
  occurredAt?: string;
  providerRevision?: string;
  specRevision?: string;
  policyRevision?: string;
  expectedRevision?: string | number;
  observedRevision?: string | number;
  idempotencyKey?: string;
  input?: unknown;
  sideEffectState?: RecoverySideEffectState;
  compensationAvailable?: boolean;
  metadata?: Record<string, unknown>;
}

export interface StorageRecoveryAdvice {
  strategy: RecoveryStrategy;
  reason: string;
  requireReconciliation: boolean;
  refreshRevisionBeforeRetry: boolean;
  mayUseCompatibleReplica: boolean;
  invalidateDerivedCaches: boolean;
}

/**
 * Converts provider-specific storage errors into the shared recovery contract.
 * Mutations default to an unknown commit state unless a receipt or the caller
 * proves otherwise; this prevents blind replay after an ambiguous disconnect.
 */
export function classifyStorageFailure(
  error: unknown,
  context: StorageFailureContext
): RecoveryFailure {
  const record = mergedErrorRecord(error);
  const code = normalizedCode(record);
  const category = storageCategory(code, record);
  const sideEffectState = storageSideEffectState(context, record);
  const occurredAt = context.occurredAt ?? new Date().toISOString();
  const dependencyKey =
    stringValue(record.dependencyKey) ?? `storage-provider:${context.providerId}`;
  const receiptStatus = receiptStatusFrom(record);
  const observedRevision =
    context.observedRevision ?? stringOrNumber(record.observedRevision ?? record.revision);
  const resourceKey = context.resourceKey ?? stringValue(record.resourceKey) ?? 'unscoped';

  return {
    id: context.id,
    module: 'storage',
    category,
    code,
    message: errorMessage(error, record),
    occurredAt,
    retryable: storageRetryable(category, record, sideEffectState),
    retryAfterMs: nonNegativeNumber(record.retryAfterMs),
    sideEffectState,
    compensationAvailable: context.compensationAvailable,
    circuitKey: stringValue(record.circuitKey) ?? `storage:${context.providerId}`,
    rootCauseKey: stringValue(record.rootCauseKey) ?? dependencyKey,
    evidence: {
      observedAt: occurredAt,
      operationKey: `storage.${context.operation}:${resourceKey}`,
      dependencyKey,
      state: stringValue(record.providerState ?? record.state),
      revision: observedRevision,
      receiptStatus,
      idempotencyKey: context.idempotencyKey ?? stringValue(record.idempotencyKey),
      inputHash:
        context.input === undefined
          ? stableRecoveryHash({ operation: context.operation, resourceKey })
          : stableRecoveryHash(context.input),
      policyRevision: context.policyRevision,
      specRevision: context.specRevision,
      providerRevision: context.providerRevision,
      sourceHashes: {
        ...(stringValue(record.etag) ? { etag: stringValue(record.etag)! } : {}),
        ...(stringValue(record.checksum) ? { checksum: stringValue(record.checksum)! } : {}),
      },
      markers: {
        operation: context.operation,
        role: context.role,
        engine: context.engine ?? null,
        expectedRevision: context.expectedRevision ?? null,
        observedRevision: observedRevision ?? null,
        transactionId: stringValue(record.transactionId) ?? null,
        leaseId: stringValue(record.leaseId) ?? null,
        fencingToken: stringOrNumber(record.fencingToken) ?? null,
      },
    },
    metadata: {
      ...context.metadata,
      operation: context.operation,
      providerId: context.providerId,
      role: context.role,
      engine: context.engine,
      resourceKey,
      expectedRevision: context.expectedRevision,
      observedRevision,
    },
  };
}

export function adviseStorageRecovery(failure: RecoveryFailure): StorageRecoveryAdvice {
  const operation = stringValue(failure.metadata?.operation) as
    | StorageRecoveryOperation
    | undefined;
  const readOnly = operation !== undefined && !isStorageMutation(operation);
  const mutationMayHaveChangedTruth =
    operation === 'event_append' ||
    operation === 'transaction_commit' ||
    operation === 'write' ||
    operation === 'update' ||
    operation === 'delete' ||
    operation === 'restore';

  if (failure.sideEffectState === 'unknown') {
    return advice(
      'reconcile',
      'Resolve the receipt, transaction, lease, revision, or idempotency record before replay.',
      true,
      true,
      false,
      mutationMayHaveChangedTruth
    );
  }
  if (failure.sideEffectState === 'committed') {
    return failure.compensationAvailable
      ? advice(
          'compensate',
          'The mutation committed; run its declared compensation instead of replaying it.',
          false,
          false,
          false,
          true
        )
      : advice(
          'human_review',
          'The mutation committed and no validated compensation is available.',
          false,
          false,
          false,
          true
        );
  }
  if (failure.category === 'invariant_violation') {
    return advice(
      'quarantine',
      'Preserve corrupt or inconsistent evidence and isolate the affected resource.',
      false,
      false,
      false,
      true
    );
  }
  if (
    failure.category === 'validation' ||
    failure.category === 'policy_denied' ||
    failure.category === 'authentication' ||
    failure.category === 'authorization'
  ) {
    return advice(
      'human_review',
      'Input, authority, credentials, policy, or topology must change before another attempt.',
      false,
      false,
      false,
      false
    );
  }
  if (failure.category === 'concurrency_conflict') {
    return advice(
      'retry',
      'Reload the current revision and acquire a fresh fenced lease before a bounded retry.',
      false,
      true,
      false,
      false
    );
  }
  if (readOnly && failure.retryable) {
    return advice(
      'retry',
      'The read has no side effect and may retry within the shared dependency circuit budget.',
      false,
      false,
      true,
      false
    );
  }
  if (failure.category === 'resource_exhausted' && failure.sideEffectState === 'not_started') {
    return advice(
      'fallback',
      'Use only a compatible provider with the same consistency and durability contract.',
      false,
      false,
      true,
      false
    );
  }
  return advice(
    failure.retryable ? 'retry' : 'fail',
    failure.retryable
      ? 'The mutation is proven not started and may retry idempotently within the shared budget.'
      : 'Current evidence does not permit a safe replay or compatible fallback.',
    false,
    false,
    false,
    false
  );
}

function advice(
  strategy: RecoveryStrategy,
  reason: string,
  requireReconciliation: boolean,
  refreshRevisionBeforeRetry: boolean,
  mayUseCompatibleReplica: boolean,
  invalidateDerivedCaches: boolean
): StorageRecoveryAdvice {
  return {
    strategy,
    reason,
    requireReconciliation,
    refreshRevisionBeforeRetry,
    mayUseCompatibleReplica,
    invalidateDerivedCaches,
  };
}

function storageCategory(code: string, record: Record<string, unknown>): RecoveryCategory {
  const status = nonNegativeNumber(record.status) ?? nonNegativeNumber(record.statusCode);
  const sqlState = stringValue(record.sqlState ?? record.sqlstate)?.toUpperCase();
  const providerCodeValue = stringOrNumber(record.providerCode);
  const providerCode =
    providerCodeValue === undefined ? undefined : String(providerCodeValue).toUpperCase();
  if (code.includes('ABORT') || code.includes('CANCEL')) return 'cancellation';
  if (status === 401 || code.includes('UNAUTHENTICATED') || code.includes('INVALID_CREDENTIAL')) {
    return 'authentication';
  }
  if (status === 403 || code.includes('FORBIDDEN') || code.includes('PERMISSION_DENIED')) {
    return 'authorization';
  }
  if (code.includes('POLICY') || code.includes('WRITE_DENIED')) return 'policy_denied';
  if (
    code.includes('CORRUPT') ||
    code.includes('CHECKSUM') ||
    code.includes('INVARIANT') ||
    code.includes('DATA_LOSS')
  ) {
    return 'invariant_violation';
  }
  if (
    status === 409 ||
    sqlState === '40001' ||
    sqlState === '40P01' ||
    providerCode === '11000' ||
    [
      'CONFLICT',
      'REVISION',
      'VERSION_MISMATCH',
      'ETAG',
      'CAS_',
      'SQLITE_BUSY',
      'SQLITE_LOCKED',
      'DEADLOCK',
      'LEASE_',
    ].some((part) => code.includes(part))
  ) {
    return 'concurrency_conflict';
  }
  if (status === 429 || code.includes('RATE_LIMIT') || code.includes('THROTTL')) {
    return 'rate_limit';
  }
  if (code.includes('TIMEOUT') || code === 'ETIMEDOUT' || code.includes('DEADLINE')) {
    return 'timeout';
  }
  if (
    ['ENOSPC', 'ENOMEM', 'QUOTA', 'RESOURCE_EXHAUSTED', 'CAPACITY'].some((part) =>
      code.includes(part)
    )
  ) {
    return 'resource_exhausted';
  }
  if (
    status === 400 ||
    status === 422 ||
    code.includes('INVALID_') ||
    code.includes('SCHEMA') ||
    code.includes('CONSTRAINT') ||
    code.includes('TYPE_MISMATCH')
  ) {
    return 'validation';
  }
  if (
    status === 404 ||
    code === 'ENOENT' ||
    code.includes('PROVIDER_NOT_FOUND') ||
    code.includes('BUCKET_NOT_FOUND')
  ) {
    return 'permanent_dependency';
  }
  if (
    [
      'ECONNRESET',
      'ECONNREFUSED',
      'EAI_AGAIN',
      'ENOTFOUND',
      'HTTP_502',
      'HTTP_503',
      'HTTP_504',
    ].some((part) => code.includes(part)) ||
    (status !== undefined && status >= 500)
  ) {
    return 'transient_dependency';
  }
  return 'storage_failure';
}

function storageRetryable(
  category: RecoveryCategory,
  record: Record<string, unknown>,
  sideEffectState: RecoverySideEffectState
): boolean {
  if (sideEffectState === 'unknown' || sideEffectState === 'committed') return false;
  if (typeof record.retryable === 'boolean') return record.retryable;
  return [
    'rate_limit',
    'timeout',
    'transient_dependency',
    'concurrency_conflict',
    'resource_exhausted',
    'storage_failure',
  ].includes(category);
}

function storageSideEffectState(
  context: StorageFailureContext,
  record: Record<string, unknown>
): RecoverySideEffectState {
  if (context.sideEffectState) return context.sideEffectState;
  const declared = stringValue(record.sideEffectState);
  if (
    declared === 'none' ||
    declared === 'not_started' ||
    declared === 'committed' ||
    declared === 'unknown'
  ) {
    return declared;
  }
  const receipt = receiptStatusFrom(record);
  if (receipt === 'completed') return 'committed';
  if (receipt === 'rejected') return 'not_started';
  if (receipt === 'accepted' || receipt === 'unknown') return 'unknown';
  if (!isStorageMutation(context.operation)) return 'none';
  if (failureProvesNotStarted(normalizedCode(record))) return 'not_started';
  return 'unknown';
}

function failureProvesNotStarted(code: string): boolean {
  return [
    'INVALID_',
    'SCHEMA',
    'CONSTRAINT',
    'UNAUTHENTICATED',
    'INVALID_CREDENTIAL',
    'FORBIDDEN',
    'PERMISSION_DENIED',
    'POLICY',
    'WRITE_DENIED',
    'REVISION',
    'VERSION_MISMATCH',
    'ETAG',
    'CAS_',
    'LEASE_HELD',
  ].some((part) => code.includes(part));
}

function isStorageMutation(operation: StorageRecoveryOperation): boolean {
  return ![
    'read',
    'query',
    'list',
    'transaction_begin',
    'transaction_rollback',
    'snapshot',
  ].includes(operation);
}

function receiptStatusFrom(
  record: Record<string, unknown>
): 'accepted' | 'completed' | 'rejected' | 'unknown' | undefined {
  const value = stringValue(record.receiptStatus ?? record.statusOfReceipt);
  return value === 'accepted' ||
    value === 'completed' ||
    value === 'rejected' ||
    value === 'unknown'
    ? value
    : undefined;
}

function mergedErrorRecord(error: unknown): Record<string, unknown> {
  const outer = recordFrom(error);
  const details = recordFrom(outer.details);
  const cause = recordFrom(outer.cause);
  return { ...cause, ...details, ...outer };
}

function recordFrom(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function normalizedCode(record: Record<string, unknown>): string {
  const value =
    record.code ??
    record.providerCode ??
    record.sqlState ??
    record.name ??
    record.status ??
    'STORAGE_FAILURE';
  return (
    String(value)
      .trim()
      .replace(/[\s-]+/g, '_')
      .toUpperCase() || 'STORAGE_FAILURE'
  );
}

function errorMessage(error: unknown, record: Record<string, unknown>): string {
  if (typeof record.message === 'string') return record.message;
  if (typeof error === 'string') return error;
  return error instanceof Error ? error.message : String(error);
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function stringOrNumber(value: unknown): string | number | undefined {
  return typeof value === 'string' || typeof value === 'number' ? value : undefined;
}

function nonNegativeNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : undefined;
}
