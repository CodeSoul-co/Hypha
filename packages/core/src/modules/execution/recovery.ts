import type {
  CommandExecutionRequest,
  CommandExecutionResult,
  ExecutionReceipt,
} from '../../contracts/command-execution';
import type { NormalizedExecutionError } from '../../contracts/execution';
import type { ExecutionRecord, ExecutionRecoveryAssessment } from '../../contracts/execution-store';
import {
  stableRecoveryHash,
  type RecoveryCategory,
  type RecoveryFailure,
  type RecoverySideEffectState,
  type RecoveryStrategy,
} from '../../contracts/recovery';

export type ExecutionRecoveryOperation =
  | 'validate'
  | 'queue'
  | 'start'
  | 'poll'
  | 'cancel'
  | 'persist'
  | 'cleanup';

export interface ExecutionFailureContext {
  id: string;
  operation: ExecutionRecoveryOperation;
  occurredAt?: string;
  request?: CommandExecutionRequest;
  record?: ExecutionRecord;
  result?: CommandExecutionResult;
  assessment?: ExecutionRecoveryAssessment;
  providerId?: string;
  providerRevision?: string;
  policyRevision?: string;
  specRevision?: string;
  sideEffectState?: RecoverySideEffectState;
  compensationAvailable?: boolean;
  metadata?: Record<string, unknown>;
}

export interface ExecutionRecoveryAdvice {
  strategy: RecoveryStrategy;
  reason: string;
  refreshRecordBeforeRetry: boolean;
  requireReceiptReconciliation: boolean;
}

export function classifyExecutionFailure(
  error: unknown,
  context: ExecutionFailureContext
): RecoveryFailure {
  const normalized = normalizedExecutionError(error);
  const details = normalized.details ?? {};
  const receipt = context.result?.externalReceipt ?? receiptFrom(details);
  const executionId =
    context.record?.id ??
    context.result?.executionId ??
    context.request?.executionId ??
    context.assessment?.executionId ??
    stringValue(details.executionId) ??
    'unassigned';
  const providerId =
    context.providerId ??
    context.record?.providerId ??
    receipt?.providerId ??
    stringValue(details.providerId) ??
    'execution.default';
  const category = executionCategory(normalized);
  const sideEffectState = executionSideEffectState(normalized, context, receipt);
  const retryable = executionRetryable(normalized, category, sideEffectState, context.assessment);
  const occurredAt = context.occurredAt ?? new Date().toISOString();
  const revision =
    context.record?.revision ?? context.result?.revision ?? numberValue(details.revision);
  const receiptStatus = receipt?.status ?? receiptStatusFrom(details);

  return {
    id: context.id,
    module: 'execution',
    category,
    code: normalized.code,
    message: normalized.message,
    occurredAt,
    retryable,
    retryAfterMs: numberValue(details.retryAfterMs),
    sideEffectState,
    compensationAvailable: context.compensationAvailable,
    circuitKey: stringValue(details.circuitKey) ?? `execution:${providerId}`,
    rootCauseKey:
      normalized.causeRef ??
      stringValue(details.rootCauseKey) ??
      stringValue(details.dependencyKey) ??
      `execution-provider:${providerId}`,
    evidence: {
      observedAt: occurredAt,
      operationKey: `execution.${context.operation}:${executionId}`,
      dependencyKey: stringValue(details.dependencyKey) ?? `execution-provider:${providerId}`,
      state:
        context.assessment?.disposition ??
        context.record?.status ??
        context.result?.status ??
        stringValue(details.providerState),
      revision,
      receiptStatus,
      idempotencyKey: context.request?.idempotencyKey ?? stringValue(details.idempotencyKey),
      inputHash: stableRecoveryHash({
        executable: context.request?.executable,
        args: context.request?.args,
        cwd: context.request?.cwd,
        environmentRef: context.request?.environmentRef,
        expectedWorkspaceSnapshotHash: context.request?.expectedWorkspaceSnapshotHash,
      }),
      outputHash:
        context.result === undefined
          ? undefined
          : stableRecoveryHash({
              status: context.result.status,
              exitCode: context.result.exitCode,
              changedFiles: context.result.changedFiles,
              artifacts: context.result.generatedArtifactRefs,
            }),
      policyRevision: context.policyRevision,
      specRevision: context.specRevision,
      providerRevision: context.providerRevision,
      sourceHashes: {
        ...(context.request?.expectedWorkspaceSnapshotHash
          ? { workspace: context.request.expectedWorkspaceSnapshotHash }
          : {}),
        ...(context.request?.environmentRef.version
          ? { environment: context.request.environmentRef.version }
          : {}),
      },
      markers: {
        recoveryDisposition: context.assessment?.disposition ?? null,
        attempt: context.record?.attempt ?? null,
        fencingToken: context.record?.lease?.fencingToken ?? null,
      },
    },
    metadata: {
      ...context.metadata,
      operation: context.operation,
      executionId,
      providerId,
      workspaceId: context.request?.workspaceId,
      runId: context.request?.runId,
      providerCode: normalized.providerCode,
    },
  };
}

export function adviseExecutionRecovery(failure: RecoveryFailure): ExecutionRecoveryAdvice {
  if (failure.sideEffectState === 'unknown' || failure.code === 'EXECUTION_RESULT_UNKNOWN') {
    return {
      strategy: 'reconcile',
      reason: 'Query the provider receipt and execution record before any replay.',
      refreshRecordBeforeRetry: true,
      requireReceiptReconciliation: true,
    };
  }
  if (
    failure.code === 'EXECUTION_REVISION_CONFLICT' ||
    failure.code === 'EXECUTION_LEASE_HELD' ||
    failure.code === 'EXECUTION_LEASE_LOST'
  ) {
    return {
      strategy: 'retry',
      reason: 'Reload the record and acquire a fresh fenced lease before retrying.',
      refreshRecordBeforeRetry: true,
      requireReceiptReconciliation: false,
    };
  }
  if (
    failure.category === 'policy_denied' ||
    failure.category === 'authorization' ||
    failure.category === 'validation'
  ) {
    return {
      strategy: 'human_review',
      reason: 'Authority, approval, workspace boundary, or request input must change.',
      refreshRecordBeforeRetry: false,
      requireReceiptReconciliation: false,
    };
  }
  if (failure.category === 'resource_exhausted') {
    return {
      strategy: 'fallback',
      reason: 'Select an explicitly compatible environment or reduce the declared resource budget.',
      refreshRecordBeforeRetry: false,
      requireReceiptReconciliation: false,
    };
  }
  return {
    strategy: failure.retryable ? 'retry' : 'fail',
    reason: failure.retryable
      ? 'The execution is proven not started and remains within the shared recovery budget.'
      : 'No safe replay or reconciliation path is available.',
    refreshRecordBeforeRetry: false,
    requireReceiptReconciliation: false,
  };
}

function executionCategory(error: NormalizedExecutionError): RecoveryCategory {
  switch (error.code) {
    case 'EXECUTION_INVALID_REQUEST':
    case 'EXECUTION_WORKSPACE_NOT_FOUND':
    case 'EXECUTION_PATH_ESCAPE':
    case 'EXECUTION_IMAGE_UNTRUSTED':
    case 'EXECUTION_IDEMPOTENCY_CONFLICT':
      return 'validation';
    case 'EXECUTION_PERMISSION_DENIED':
    case 'EXECUTION_PATH_DENIED':
    case 'EXECUTION_NETWORK_DENIED':
    case 'EXECUTION_SECRET_DENIED':
      return 'authorization';
    case 'EXECUTION_POLICY_DENIED':
    case 'EXECUTION_APPROVAL_REQUIRED':
      return 'policy_denied';
    case 'EXECUTION_TIMEOUT':
    case 'EXECUTION_IDLE_TIMEOUT':
      return 'timeout';
    case 'EXECUTION_CANCELLED':
      return 'cancellation';
    case 'EXECUTION_QUOTA_EXCEEDED':
    case 'EXECUTION_OOM_KILLED':
    case 'EXECUTION_RESOURCE_EXCEEDED':
    case 'EXECUTION_OUTPUT_LIMIT':
      return 'resource_exhausted';
    case 'EXECUTION_REVISION_CONFLICT':
    case 'EXECUTION_LEASE_HELD':
    case 'EXECUTION_LEASE_LOST':
      return 'concurrency_conflict';
    case 'EXECUTION_ENVIRONMENT_UNAVAILABLE':
    case 'EXECUTION_SANDBOX_CREATE_FAILED':
    case 'EXECUTION_SANDBOX_START_FAILED':
    case 'EXECUTION_PROCESS_START_FAILED':
      return error.retryable ? 'transient_dependency' : 'permanent_dependency';
    default:
      return 'execution_failure';
  }
}

function executionSideEffectState(
  error: NormalizedExecutionError,
  context: ExecutionFailureContext,
  receipt: ExecutionReceipt | undefined
): RecoverySideEffectState {
  if (context.sideEffectState) return context.sideEffectState;
  if (receipt?.status === 'completed') return 'committed';
  if (receipt?.status === 'rejected') return 'not_started';
  if (receipt?.status === 'accepted' || receipt?.status === 'unknown') return 'unknown';
  switch (context.assessment?.disposition) {
    case 'not_started':
      return 'not_started';
    case 'provider_queryable':
    case 'provider_completed_result_missing':
    case 'provider_state_unknown':
      return 'unknown';
  }
  if (
    error.code === 'EXECUTION_INVALID_REQUEST' ||
    error.code === 'EXECUTION_PERMISSION_DENIED' ||
    error.code === 'EXECUTION_POLICY_DENIED' ||
    error.code === 'EXECUTION_APPROVAL_REQUIRED' ||
    error.code === 'EXECUTION_WORKSPACE_NOT_FOUND' ||
    error.code === 'EXECUTION_PATH_ESCAPE' ||
    error.code === 'EXECUTION_PATH_DENIED' ||
    error.code === 'EXECUTION_IMAGE_UNTRUSTED' ||
    error.code === 'EXECUTION_NETWORK_DENIED' ||
    error.code === 'EXECUTION_SECRET_DENIED' ||
    error.code === 'EXECUTION_PROCESS_START_FAILED' ||
    error.code === 'EXECUTION_REVISION_CONFLICT' ||
    error.code === 'EXECUTION_LEASE_HELD' ||
    error.code === 'EXECUTION_IDEMPOTENCY_CONFLICT'
  ) {
    return 'not_started';
  }
  if (error.code === 'EXECUTION_RESULT_UNKNOWN' || context.operation === 'poll') return 'unknown';
  return context.operation === 'validate' || context.operation === 'queue'
    ? 'not_started'
    : 'unknown';
}

function executionRetryable(
  error: NormalizedExecutionError,
  category: RecoveryCategory,
  sideEffectState: RecoverySideEffectState,
  assessment: ExecutionRecoveryAssessment | undefined
): boolean {
  if (sideEffectState === 'unknown' || sideEffectState === 'committed') return false;
  if (assessment?.disposition === 'not_started') return error.retryable;
  if (category === 'concurrency_conflict') return true;
  return error.retryable;
}

function normalizedExecutionError(error: unknown): NormalizedExecutionError {
  if (isNormalizedExecutionError(error)) return error;
  const record = recordFrom(error);
  return {
    code: 'EXECUTION_INTERNAL_ERROR',
    message:
      typeof record.message === 'string'
        ? record.message
        : error instanceof Error
          ? error.message
          : String(error),
    retryable: typeof record.retryable === 'boolean' ? record.retryable : false,
    providerCode:
      typeof record.code === 'string' || typeof record.code === 'number' ? record.code : undefined,
    details:
      record.details && typeof record.details === 'object' ? recordFrom(record.details) : record,
  };
}

function isNormalizedExecutionError(error: unknown): error is NormalizedExecutionError {
  const record = recordFrom(error);
  return (
    typeof record.code === 'string' &&
    record.code.startsWith('EXECUTION_') &&
    typeof record.message === 'string' &&
    typeof record.retryable === 'boolean'
  );
}

function receiptFrom(details: Record<string, unknown>): ExecutionReceipt | undefined {
  const receipt = recordFrom(details.receipt);
  const status = receiptStatusFrom(receipt);
  const id = stringValue(receipt.id);
  const providerId = stringValue(receipt.providerId);
  const executionId = stringValue(receipt.executionId);
  const issuedAt = stringValue(receipt.issuedAt);
  const receiptHash = stringValue(receipt.receiptHash);
  if (!status || !id || !providerId || !executionId || !issuedAt || !receiptHash) return undefined;
  return { id, providerId, executionId, issuedAt, receiptHash, status };
}

function receiptStatusFrom(value: Record<string, unknown>): ExecutionReceipt['status'] | undefined {
  const status = stringValue(value.status ?? value.receiptStatus);
  return status === 'accepted' ||
    status === 'completed' ||
    status === 'rejected' ||
    status === 'unknown'
    ? status
    : undefined;
}

function recordFrom(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function numberValue(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : undefined;
}
