import {
  stableRecoveryHash,
  type RecoveryCategory,
  type RecoveryFailure,
  type RecoveryStrategy,
} from '@hypha/core';
import type { InferenceRequest } from './types';

export type InferenceRecoveryOperation =
  | 'infer'
  | 'stream'
  | 'prefix_cache_read'
  | 'kv_cache_read'
  | 'kv_cache_write'
  | 'cache_invalidate';

export interface InferenceFailureContext {
  id: string;
  operation: InferenceRecoveryOperation;
  request: InferenceRequest;
  providerId: string;
  occurredAt?: string;
  providerRevision?: string;
  policyRevision?: string;
  specRevision?: string;
  metadata?: Record<string, unknown>;
}

export interface InferenceRecoveryAdvice {
  strategy: RecoveryStrategy;
  reason: string;
  mayUseCompatibleProviderFallback: boolean;
  mayBypassCache: boolean;
}

export function classifyInferenceFailure(
  error: unknown,
  context: InferenceFailureContext
): RecoveryFailure {
  return classify(error, context, 'inference');
}

export function classifyInferenceCacheFailure(
  error: unknown,
  context: InferenceFailureContext
): RecoveryFailure {
  return classify(error, context, 'cache');
}

export function adviseInferenceRecovery(failure: RecoveryFailure): InferenceRecoveryAdvice {
  if (failure.module === 'cache') {
    return {
      strategy: 'degrade',
      reason: 'Inference caches are optional acceleration and may be bypassed for this request.',
      mayUseCompatibleProviderFallback: false,
      mayBypassCache: true,
    };
  }
  if (
    failure.category === 'authentication' ||
    failure.category === 'authorization' ||
    failure.category === 'policy_denied'
  ) {
    return {
      strategy: 'human_review',
      reason: 'Credentials, authority, or policy must change before another provider call.',
      mayUseCompatibleProviderFallback: false,
      mayBypassCache: false,
    };
  }
  if (failure.category === 'validation' || failure.category === 'permanent_dependency') {
    return {
      strategy: 'fallback',
      reason: 'Use only a provider/model with a compatible request and output contract.',
      mayUseCompatibleProviderFallback: true,
      mayBypassCache: false,
    };
  }
  return {
    strategy: failure.retryable ? 'retry' : 'fallback',
    reason: failure.retryable
      ? 'Retry within the shared FSM and provider circuit budget.'
      : 'Do not repeat the same provider strategy without a compatible fallback.',
    mayUseCompatibleProviderFallback: !failure.retryable,
    mayBypassCache: false,
  };
}

function classify(
  error: unknown,
  context: InferenceFailureContext,
  module: 'inference' | 'cache'
): RecoveryFailure {
  const record = recordFrom(error);
  const code = normalizedCode(record, module);
  const category = module === 'cache' ? 'cache_failure' : inferenceCategory(code, record);
  const retryable = module === 'cache' ? true : inferenceRetryable(category, record);
  const occurredAt = context.occurredAt ?? new Date().toISOString();
  const requestHash = stableRecoveryHash({
    modelAlias: context.request.modelAlias,
    input: context.request.input,
    options: context.request.options,
    tools: context.request.tools,
  });
  const dependencyKey =
    module === 'cache'
      ? `inference-cache:${context.providerId}`
      : `inference-provider:${context.providerId}`;

  return {
    id: context.id,
    module,
    category,
    code,
    message: errorMessage(error, record),
    occurredAt,
    retryable,
    retryAfterMs: numberValue(record.retryAfterMs),
    sideEffectState: 'none',
    circuitKey: stringValue(record.circuitKey) ?? dependencyKey,
    rootCauseKey:
      stringValue(record.rootCauseKey) ?? stringValue(record.dependencyKey) ?? dependencyKey,
    evidence: {
      observedAt: occurredAt,
      operationKey: `${context.operation}:${context.providerId}:${context.request.modelAlias}:${context.request.stepId}`,
      dependencyKey,
      state: stringValue(record.providerState),
      revision: stringOrNumber(record.revision),
      inputHash: requestHash,
      policyRevision: context.policyRevision,
      specRevision: context.specRevision,
      providerRevision: context.providerRevision,
      markers: {
        status: numberValue(record.status) ?? null,
        runId: context.request.runId,
        cacheOperation: module === 'cache',
      },
    },
    metadata: {
      ...context.metadata,
      operation: context.operation,
      providerId: context.providerId,
      modelAlias: context.request.modelAlias,
      requestHash,
      runId: context.request.runId,
      stepId: context.request.stepId,
    },
  };
}

function inferenceCategory(code: string, record: Record<string, unknown>): RecoveryCategory {
  const status = numberValue(record.status) ?? numberValue(record.statusCode);
  if (code.includes('ABORT') || code.includes('CANCEL')) return 'cancellation';
  if (status === 401 || code.includes('UNAUTHENTICATED') || code.includes('API_KEY')) {
    return 'authentication';
  }
  if (status === 403 || code.includes('FORBIDDEN') || code.includes('AUTHORIZATION')) {
    return 'authorization';
  }
  if (code.includes('POLICY') || code.includes('SAFETY_DENIED')) return 'policy_denied';
  if (status === 429 || code.includes('RATE_LIMIT')) return 'rate_limit';
  if (code.includes('TIMEOUT') || code === 'ETIMEDOUT') return 'timeout';
  if (
    code.includes('CONTEXT_LENGTH') ||
    code.includes('INVALID_REQUEST') ||
    code.includes('SCHEMA') ||
    status === 400 ||
    status === 422
  ) {
    return 'validation';
  }
  if (code.includes('MALFORMED') || code.includes('INVALID_OUTPUT')) {
    return 'permanent_dependency';
  }
  if (code.includes('QUOTA') || code.includes('RESOURCE_EXHAUSTED')) return 'resource_exhausted';
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
  if (code.includes('PROVIDER_NOT_FOUND') || code.includes('MODEL_NOT_FOUND')) {
    return 'permanent_dependency';
  }
  return 'inference_failure';
}

function inferenceRetryable(category: RecoveryCategory, record: Record<string, unknown>): boolean {
  if (typeof record.retryable === 'boolean') return record.retryable;
  return [
    'rate_limit',
    'timeout',
    'transient_dependency',
    'resource_exhausted',
    'inference_failure',
  ].includes(category);
}

function recordFrom(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function normalizedCode(record: Record<string, unknown>, module: 'inference' | 'cache'): string {
  const fallback = module === 'cache' ? 'INFERENCE_CACHE_FAILURE' : 'INFERENCE_FAILURE';
  const value = record.code ?? record.name ?? record.status ?? fallback;
  return (
    String(value)
      .trim()
      .replace(/[\s-]+/g, '_')
      .toUpperCase() || fallback
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

function numberValue(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : undefined;
}
