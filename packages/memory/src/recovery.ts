import {
  stableRecoveryHash,
  type RecoveryCategory,
  type RecoveryFailure,
  type RecoverySideEffectState,
  type RecoveryStrategy,
} from '@hypha/core';

export type MemoryRecoveryOperation =
  | 'read'
  | 'search'
  | 'write'
  | 'update'
  | 'invalidate'
  | 'summarize'
  | 'audit';

export interface MemoryRecoveryScope {
  workspaceId?: string;
  sessionId?: string;
  runId?: string;
  userId?: string;
}

export interface MemoryFailureContext {
  id: string;
  operation: MemoryRecoveryOperation;
  scope: MemoryRecoveryScope;
  occurredAt?: string;
  providerId?: string;
  providerRevision?: string;
  specRevision?: string;
  policyRevision?: string;
  recordId?: string;
  idempotencyKey?: string;
  sideEffectState?: RecoverySideEffectState;
  compensationAvailable?: boolean;
  metadata?: Record<string, unknown>;
}

export interface MemoryRecoveryAdvice {
  strategy: RecoveryStrategy;
  reason: string;
  allowBoundedEmptyResult: boolean;
}

export function classifyMemoryFailure(
  error: unknown,
  context: MemoryFailureContext
): RecoveryFailure {
  const record = recordFrom(error);
  const code = normalizedCode(record);
  const category = memoryCategory(code, record);
  const sideEffectState = memorySideEffectState(context, record);
  const retryable = memoryRetryable(category, record, sideEffectState);
  const receiptStatus = receiptStatusFrom(record);
  const scopeHash = stableRecoveryHash(context.scope);
  const providerId = context.providerId ?? stringValue(record.providerId) ?? 'memory.default';
  const operationTarget = context.recordId ?? scopeHash;

  return {
    id: context.id,
    module: 'memory',
    category,
    code,
    message: errorMessage(error, record),
    occurredAt: context.occurredAt ?? new Date().toISOString(),
    retryable,
    retryAfterMs: nonNegativeNumber(record.retryAfterMs),
    sideEffectState,
    compensationAvailable: context.compensationAvailable,
    circuitKey: stringValue(record.circuitKey) ?? `memory:${providerId}`,
    rootCauseKey:
      stringValue(record.rootCauseKey) ??
      stringValue(record.dependencyKey) ??
      `memory-provider:${providerId}`,
    evidence: {
      observedAt: context.occurredAt ?? new Date().toISOString(),
      operationKey: `memory.${context.operation}:${operationTarget}`,
      dependencyKey: stringValue(record.dependencyKey) ?? `memory-provider:${providerId}`,
      state: stringValue(record.state) ?? stringValue(record.providerState),
      revision: stringOrNumber(record.revision),
      receiptStatus,
      idempotencyKey: context.idempotencyKey ?? stringValue(record.idempotencyKey),
      inputHash: stableRecoveryHash({
        operation: context.operation,
        scope: context.scope,
        recordId: context.recordId,
      }),
      policyRevision: context.policyRevision,
      specRevision: context.specRevision,
      providerRevision: context.providerRevision,
      markers: {
        mutation: isMemoryMutation(context.operation),
        scopeHash,
      },
    },
    metadata: {
      ...context.metadata,
      operation: context.operation,
      recordId: context.recordId,
      providerId,
      scopeHash,
    },
  };
}

export function adviseMemoryRecovery(failure: RecoveryFailure): MemoryRecoveryAdvice {
  const operation = stringValue(failure.metadata?.operation) as MemoryRecoveryOperation | undefined;
  const readOnly = operation !== undefined && !isMemoryMutation(operation);
  if (failure.sideEffectState === 'unknown') {
    return {
      strategy: 'reconcile',
      reason: 'The provider commit state must be reconciled by record id or idempotency key.',
      allowBoundedEmptyResult: false,
    };
  }
  if (
    failure.category === 'policy_denied' ||
    failure.category === 'validation' ||
    failure.category === 'invariant_violation'
  ) {
    return {
      strategy: failure.category === 'invariant_violation' ? 'quarantine' : 'human_review',
      reason: 'Input, scope, provenance, policy, or integrity must change before retrying.',
      allowBoundedEmptyResult: false,
    };
  }
  if (readOnly && failure.retryable) {
    return {
      strategy: 'retry',
      reason: 'Read-only memory operations can retry within the shared FSM budget.',
      allowBoundedEmptyResult: true,
    };
  }
  return {
    strategy: failure.retryable ? 'retry' : 'fail',
    reason: failure.retryable
      ? 'The mutation is known not to have committed and may retry idempotently.'
      : 'The failure cannot be retried safely with current evidence.',
    allowBoundedEmptyResult: false,
  };
}

function memoryCategory(code: string, record: Record<string, unknown>): RecoveryCategory {
  const status = nonNegativeNumber(record.status) ?? nonNegativeNumber(record.statusCode);
  if (code.includes('SCOPE_REQUIRED') || code.includes('PROVENANCE_REQUIRED')) return 'validation';
  if (
    code.includes('POLICY') ||
    code.includes('LONG_TERM_WRITE_DENIED') ||
    code.includes('HUMAN_REVIEW')
  ) {
    return 'policy_denied';
  }
  if (code.includes('UNAUTHENTICATED') || status === 401) return 'authentication';
  if (code.includes('FORBIDDEN') || code.includes('AUTHORIZATION') || status === 403) {
    return 'authorization';
  }
  if (code.includes('CORRUPT') || code.includes('INVARIANT')) return 'invariant_violation';
  if (code.includes('CONFLICT') || code.includes('REVISION') || status === 409) {
    return 'concurrency_conflict';
  }
  if (code.includes('TIMEOUT') || code === 'ETIMEDOUT') return 'timeout';
  if (code.includes('RATE_LIMIT') || status === 429) return 'rate_limit';
  if (['ENOSPC', 'ENOMEM', 'QUOTA', 'RESOURCE_EXHAUSTED'].some((part) => code.includes(part))) {
    return 'resource_exhausted';
  }
  if (
    ['ECONNRESET', 'ECONNREFUSED', 'EAI_AGAIN', 'HTTP_502', 'HTTP_503', 'HTTP_504'].some((part) =>
      code.includes(part)
    ) ||
    (status !== undefined && status >= 500)
  ) {
    return 'transient_dependency';
  }
  return 'memory_failure';
}

function memoryRetryable(
  category: RecoveryCategory,
  record: Record<string, unknown>,
  sideEffectState: RecoverySideEffectState
): boolean {
  if (typeof record.retryable === 'boolean') return record.retryable;
  if (sideEffectState === 'unknown' || sideEffectState === 'committed') return false;
  return [
    'rate_limit',
    'timeout',
    'transient_dependency',
    'concurrency_conflict',
    'resource_exhausted',
    'memory_failure',
  ].includes(category);
}

function memorySideEffectState(
  context: MemoryFailureContext,
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
  return isMemoryMutation(context.operation) ? 'unknown' : 'none';
}

function receiptStatusFrom(
  record: Record<string, unknown>
): 'accepted' | 'completed' | 'rejected' | 'unknown' | undefined {
  const value = stringValue(record.receiptStatus);
  return value === 'accepted' ||
    value === 'completed' ||
    value === 'rejected' ||
    value === 'unknown'
    ? value
    : undefined;
}

function isMemoryMutation(operation: MemoryRecoveryOperation): boolean {
  return operation === 'write' || operation === 'update' || operation === 'invalidate';
}

function recordFrom(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function normalizedCode(record: Record<string, unknown>): string {
  const value = record.code ?? record.name ?? record.status ?? 'MEMORY_UNKNOWN';
  return (
    String(value)
      .trim()
      .replace(/[\s-]+/g, '_')
      .toUpperCase() || 'MEMORY_UNKNOWN'
  );
}

function errorMessage(error: unknown, record: Record<string, unknown>): string {
  if (typeof record.message === 'string') return record.message;
  if (typeof error === 'string') return error;
  return String(error);
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
