import type { ManagedMemoryScope, NormalizedMemoryError } from './contracts';
import { resolveBoundedMemoryRecovery } from './bounded-recovery';
import { hashMemoryScope, isNormalizedMemoryError, memoryError, sha256 } from './memory-utils';
import { classifyMemoryFailure, type MemoryRecoveryOperation } from './recovery';

export type PermanentMemoryMigrationOperation = 'get' | 'list' | 'delete' | 'write';
export type PermanentMemoryFailureDisposition = 'retry' | 'reconcile' | 'quarantine' | 'dlq';
export type PermanentMemoryFailureFinalState =
  | 'waiting'
  | 'reconciling'
  | 'quarantined'
  | 'dead_lettered';

export interface PermanentMemoryMigrationRequest {
  operationId: string;
  scope: ManagedMemoryScope;
  providerRef: string;
  profileRef: string;
  recordId?: string;
  attempt?: number;
  maxAttempts?: number;
}

export interface PermanentMemoryMigrationProvider {
  get<TValue = unknown>(scope: ManagedMemoryScope, recordId: string): Promise<TValue | null>;
  list<TValue = unknown>(scope: ManagedMemoryScope): Promise<TValue[]>;
  delete(scope: ManagedMemoryScope, recordId: string): Promise<boolean>;
  write<TValue = unknown>(
    scope: ManagedMemoryScope,
    recordId: string,
    value: TValue
  ): Promise<void>;
}

export interface PermanentMemoryMigrationPort {
  get<TValue = unknown>(request: PermanentMemoryMigrationRequest): Promise<TValue | null>;
  list<TValue = unknown>(request: PermanentMemoryMigrationRequest): Promise<TValue[]>;
  delete(request: PermanentMemoryMigrationRequest): Promise<boolean>;
  write<TValue = unknown>(request: PermanentMemoryMigrationRequest, value: TValue): Promise<void>;
}

export interface PermanentMemoryFailureDecision {
  disposition: PermanentMemoryFailureDisposition;
  finalState: PermanentMemoryFailureFinalState;
  retryable: boolean;
  attempt: number;
  maxAttempts: number;
  reason: string;
}

export interface PermanentMemoryFailureEvent {
  type: 'permanent_memory.operation_failed';
  operationId: string;
  operation: PermanentMemoryMigrationOperation;
  providerRef: string;
  profileRef: string;
  scopeHash: string;
  attempt: number;
  error: NormalizedMemoryError;
  disposition: PermanentMemoryFailureDisposition;
  finalState: PermanentMemoryFailureFinalState;
}

export interface PermanentMemoryFailureObserver {
  record(event: PermanentMemoryFailureEvent): void | Promise<void>;
}

export interface PermanentMemoryMigrationAdapterOptions {
  provider: PermanentMemoryMigrationProvider;
  observer?: PermanentMemoryFailureObserver;
}

interface ProviderErrorRecord extends Record<string, unknown> {
  code?: unknown;
  name?: unknown;
  status?: unknown;
  statusCode?: unknown;
  notFound?: unknown;
  retryable?: unknown;
  sideEffectState?: unknown;
  outcomeUnknown?: unknown;
}

export class PermanentMemoryMigrationAdapter implements PermanentMemoryMigrationPort {
  constructor(private readonly options: PermanentMemoryMigrationAdapterOptions) {}

  get<TValue = unknown>(request: PermanentMemoryMigrationRequest): Promise<TValue | null> {
    return this.execute(request, 'get', null, () =>
      this.options.provider.get<TValue>(request.scope, requireRecordId(request))
    );
  }

  list<TValue = unknown>(request: PermanentMemoryMigrationRequest): Promise<TValue[]> {
    return this.execute(request, 'list', [], () =>
      this.options.provider.list<TValue>(request.scope)
    );
  }

  delete(request: PermanentMemoryMigrationRequest): Promise<boolean> {
    return this.execute(request, 'delete', false, () =>
      this.options.provider.delete(request.scope, requireRecordId(request))
    );
  }

  write<TValue = unknown>(request: PermanentMemoryMigrationRequest, value: TValue): Promise<void> {
    return this.execute(request, 'write', undefined, () =>
      this.options.provider.write(request.scope, requireRecordId(request), value)
    );
  }

  private async execute<TResult>(
    request: PermanentMemoryMigrationRequest,
    operation: PermanentMemoryMigrationOperation,
    notFoundResult: TResult,
    run: () => Promise<TResult>
  ): Promise<TResult> {
    validateRequest(request, operation);
    try {
      return await run();
    } catch (providerError) {
      if (isExplicitPermanentMemoryNotFound(providerError) && operation !== 'write') {
        return notFoundResult;
      }
      const error = normalizePermanentMemoryProviderError(providerError, request, operation);
      const decision = decidePermanentMemoryFailure(error, request, operation);
      const propagated: NormalizedMemoryError = {
        ...error,
        details: {
          ...error.details,
          disposition: decision.disposition,
          finalState: decision.finalState,
          attempt: decision.attempt,
          maxAttempts: decision.maxAttempts,
        },
      };
      await this.options.observer?.record({
        type: 'permanent_memory.operation_failed',
        operationId: request.operationId,
        operation,
        providerRef: request.providerRef,
        profileRef: request.profileRef,
        scopeHash: hashMemoryScope(request.scope),
        attempt: decision.attempt,
        error: propagated,
        disposition: decision.disposition,
        finalState: decision.finalState,
      });
      throw propagated;
    }
  }
}

export function isExplicitPermanentMemoryNotFound(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const record = error as ProviderErrorRecord;
  return (
    record.notFound === true ||
    record.code === 'MEMORY_NOT_FOUND' ||
    record.status === 404 ||
    record.statusCode === 404
  );
}

export function normalizePermanentMemoryProviderError(
  providerError: unknown,
  request: PermanentMemoryMigrationRequest,
  operation: PermanentMemoryMigrationOperation
): NormalizedMemoryError {
  const record = providerErrorRecord(providerError);
  const providerCode = safeProviderCode(record.code ?? record.name ?? 'UNKNOWN_PROVIDER_ERROR');
  const classification = classifyProviderError(record, providerCode, operation);
  const scopeHash = hashMemoryScope(request.scope);
  const safeDetails = {
    operation,
    providerRef: request.providerRef,
    profileRef: request.profileRef,
    scopeHash,
    sideEffectState: classification.sideEffectState,
    failureClass: classification.failureClass,
  };
  if (isNormalizedMemoryError(providerError)) {
    return {
      code: providerError.code,
      message: safeMessage(providerError.code),
      retryable: providerError.retryable,
      providerCode,
      details: safeDetails,
      causeRef: sha256({ providerCode, failureClass: classification.failureClass }),
    };
  }
  return {
    code: classification.code,
    message: safeMessage(classification.code),
    retryable: classification.retryable,
    providerCode,
    details: safeDetails,
    causeRef: sha256({ providerCode, failureClass: classification.failureClass }),
  };
}

export function decidePermanentMemoryFailure(
  error: NormalizedMemoryError,
  request: PermanentMemoryMigrationRequest,
  operation: PermanentMemoryMigrationOperation
): PermanentMemoryFailureDecision {
  const attempt = request.attempt ?? 1;
  const maxAttempts = request.maxAttempts ?? 3;
  const sideEffectState = error.details?.sideEffectState;
  if (sideEffectState === 'unknown') {
    return {
      disposition: 'reconcile',
      finalState: 'reconciling',
      retryable: false,
      attempt,
      maxAttempts,
      reason: 'The provider write outcome is unknown and must be reconciled before retry.',
    };
  }
  const failure = classifyMemoryFailure(
    { ...error, sideEffectState },
    {
      id: request.operationId,
      operation: recoveryOperation(operation),
      scope: request.scope,
      providerId: request.providerRef,
      sideEffectState: sideEffectState === 'not_started' ? 'not_started' : undefined,
      recordId: request.recordId,
    }
  );
  const recovery = resolveBoundedMemoryRecovery(failure, {
    maxAttempts,
    attemptsUsed: attempt,
  });
  if (error.retryable && recovery.retryAllowed) {
    return {
      disposition: 'retry',
      finalState: 'waiting',
      retryable: true,
      attempt,
      maxAttempts,
      reason: recovery.reason,
    };
  }
  if (error.details?.failureClass === 'persistent_anomaly' || recovery.state === 'quarantined') {
    return {
      disposition: 'quarantine',
      finalState: 'quarantined',
      retryable: false,
      attempt,
      maxAttempts,
      reason: recovery.reason,
    };
  }
  return {
    disposition: 'dlq',
    finalState: 'dead_lettered',
    retryable: false,
    attempt,
    maxAttempts,
    reason: recovery.reason,
  };
}

function classifyProviderError(
  record: ProviderErrorRecord,
  providerCode: string,
  operation: PermanentMemoryMigrationOperation
): {
  code: NormalizedMemoryError['code'];
  retryable: boolean;
  sideEffectState: 'none' | 'not_started' | 'unknown';
  failureClass: string;
} {
  const status = numericStatus(record.status ?? record.statusCode);
  const outcomeUnknown = record.outcomeUnknown === true || record.sideEffectState === 'unknown';
  if (providerCode === 'MEMORY_NOT_FOUND' || status === 404) {
    return {
      code: 'MEMORY_NOT_FOUND',
      retryable: false,
      sideEffectState: operation === 'write' ? 'not_started' : 'none',
      failureClass: 'not_found',
    };
  }
  if (outcomeUnknown && operation === 'write') {
    return {
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      retryable: false,
      sideEffectState: 'unknown',
      failureClass: 'write_outcome_unknown',
    };
  }
  if (
    providerCode.includes('TIMEOUT') ||
    providerCode === 'ETIMEDOUT' ||
    providerCode === 'MONGO_CODE_50'
  ) {
    return {
      code: 'MEMORY_PROVIDER_TIMEOUT',
      retryable: true,
      sideEffectState: operation === 'write' ? 'not_started' : 'none',
      failureClass: 'timeout',
    };
  }
  if (
    status === 401 ||
    providerCode.includes('AUTHENTICATION') ||
    providerCode === 'MONGO_CODE_18'
  ) {
    return {
      code: 'MEMORY_PERMISSION_DENIED',
      retryable: false,
      sideEffectState: operation === 'write' ? 'not_started' : 'none',
      failureClass: 'authentication',
    };
  }
  if (
    status === 403 ||
    providerCode.includes('AUTHORIZATION') ||
    providerCode === 'MONGO_CODE_13'
  ) {
    return {
      code: 'MEMORY_PERMISSION_DENIED',
      retryable: false,
      sideEffectState: operation === 'write' ? 'not_started' : 'none',
      failureClass: 'authorization',
    };
  }
  if (
    status === 409 ||
    providerCode.includes('DUPLICATE') ||
    providerCode.includes('WRITE_CONFLICT') ||
    providerCode === 'MONGO_CODE_11000' ||
    providerCode === 'MONGO_CODE_112'
  ) {
    return {
      code: 'MEMORY_REVISION_CONFLICT',
      retryable: true,
      sideEffectState: 'not_started',
      failureClass: 'write_conflict',
    };
  }
  if (status === 400 || providerCode.includes('VALIDATION') || providerCode === 'MONGO_CODE_121') {
    return {
      code: 'MEMORY_INVALID_INPUT',
      retryable: false,
      sideEffectState: operation === 'write' ? 'not_started' : 'none',
      failureClass: 'validation',
    };
  }
  if (
    providerCode.includes('ECONNRESET') ||
    providerCode.includes('ECONNREFUSED') ||
    providerCode.includes('NETWORK') ||
    providerCode.includes('CURSOR') ||
    providerCode.includes('UNAVAILABLE') ||
    status === 502 ||
    status === 503 ||
    status === 504
  ) {
    return {
      code: 'MEMORY_STORE_UNAVAILABLE',
      retryable: true,
      sideEffectState: operation === 'write' ? 'not_started' : 'none',
      failureClass: providerCode.includes('CURSOR') ? 'cursor_interrupted' : 'connection',
    };
  }
  if (providerCode.includes('CORRUPT') || providerCode.includes('PERSISTENT')) {
    return {
      code: 'MEMORY_INTERNAL_ERROR',
      retryable: false,
      sideEffectState: operation === 'write' ? 'not_started' : 'none',
      failureClass: 'persistent_anomaly',
    };
  }
  return {
    code: 'MEMORY_INTERNAL_ERROR',
    retryable: false,
    sideEffectState: operation === 'write' ? 'not_started' : 'none',
    failureClass: 'unknown',
  };
}

function recoveryOperation(operation: PermanentMemoryMigrationOperation): MemoryRecoveryOperation {
  if (operation === 'write') return 'write';
  if (operation === 'delete') return 'invalidate';
  return 'read';
}

function providerErrorRecord(error: unknown): ProviderErrorRecord {
  return error && typeof error === 'object' ? (error as ProviderErrorRecord) : {};
}

function safeProviderCode(value: unknown): string {
  if (typeof value === 'number' && Number.isFinite(value)) return `MONGO_CODE_${value}`;
  const normalized = String(value)
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, '_')
    .slice(0, 64);
  return normalized || 'UNKNOWN_PROVIDER_ERROR';
}

function safeMessage(code: NormalizedMemoryError['code']): string {
  const messages: Record<NormalizedMemoryError['code'], string> = {
    MEMORY_INVALID_INPUT: 'Permanent Memory provider rejected the operation input.',
    MEMORY_EXTRACTION_SOURCE_UNAVAILABLE: 'Permanent Memory extraction source is unavailable.',
    MEMORY_EXTRACTION_FAILED: 'Permanent Memory extraction failed.',
    MEMORY_EXTRACTION_CURSOR_CONFLICT: 'Permanent Memory extraction cursor conflicted.',
    MEMORY_MAINTENANCE_CONFLICT: 'Permanent Memory maintenance conflicted.',
    MEMORY_RANKING_FAILED: 'Permanent Memory ranking failed.',
    MEMORY_IDEMPOTENCY_CONFLICT: 'Permanent Memory idempotency conflicted.',
    MEMORY_SCOPE_DENIED: 'Permanent Memory scope was denied.',
    MEMORY_PERMISSION_DENIED: 'Permanent Memory provider denied access.',
    MEMORY_NOT_FOUND: 'Permanent Memory record was not found.',
    MEMORY_REVISION_CONFLICT: 'Permanent Memory provider reported a write conflict.',
    MEMORY_PROVIDER_NOT_INSTALLED: 'Permanent Memory provider is not installed.',
    MEMORY_PROVIDER_UNAVAILABLE: 'Permanent Memory provider is unavailable.',
    MEMORY_PROVIDER_TIMEOUT: 'Permanent Memory provider timed out.',
    MEMORY_STORE_UNAVAILABLE: 'Permanent Memory store is unavailable.',
    MEMORY_VECTOR_UNAVAILABLE: 'Permanent Memory vector service is unavailable.',
    MEMORY_INDEX_FAILED: 'Permanent Memory indexing failed.',
    MEMORY_DELETE_PARTIAL: 'Permanent Memory deletion was partial.',
    MEMORY_POLICY_REJECTED: 'Permanent Memory policy rejected the operation.',
    MEMORY_CONTEXT_BUDGET_EXCEEDED: 'Permanent Memory context budget was exceeded.',
    MEMORY_INTERNAL_ERROR: 'Permanent Memory provider failed unexpectedly.',
  };
  return messages[code];
}

function numericStatus(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function requireRecordId(request: PermanentMemoryMigrationRequest): string {
  if (!request.recordId) {
    throw memoryError('MEMORY_INVALID_INPUT', 'Permanent Memory operation requires recordId.');
  }
  return request.recordId;
}

function validateRequest(
  request: PermanentMemoryMigrationRequest,
  operation: PermanentMemoryMigrationOperation
): void {
  if (
    !request.operationId ||
    !request.providerRef ||
    !request.profileRef ||
    !request.scope.userId
  ) {
    throw memoryError(
      'MEMORY_INVALID_INPUT',
      'Permanent Memory migration requests require operation, provider, profile and user scope.'
    );
  }
  if (operation !== 'list') requireRecordId(request);
  if (
    request.attempt !== undefined &&
    (!Number.isInteger(request.attempt) || request.attempt < 1)
  ) {
    throw memoryError('MEMORY_INVALID_INPUT', 'Permanent Memory attempt must be positive.');
  }
  if (
    request.maxAttempts !== undefined &&
    (!Number.isInteger(request.maxAttempts) || request.maxAttempts < 1)
  ) {
    throw memoryError('MEMORY_INVALID_INPUT', 'Permanent Memory maxAttempts must be positive.');
  }
}
