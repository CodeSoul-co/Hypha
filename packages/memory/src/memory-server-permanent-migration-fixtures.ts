import type { ManagedMemoryScope, NormalizedMemoryError } from './contracts';
import {
  decidePermanentMemoryFailure,
  isExplicitPermanentMemoryNotFound,
  normalizePermanentMemoryProviderError,
  PermanentMemoryMigrationAdapter,
  type PermanentMemoryFailureDisposition,
  type PermanentMemoryFailureEvent,
  type PermanentMemoryFailureFinalState,
  type PermanentMemoryMigrationOperation,
  type PermanentMemoryMigrationPort,
  type PermanentMemoryMigrationProvider,
  type PermanentMemoryMigrationRequest,
} from './memory-server-permanent-migration';

export interface PermanentMemoryFailureFixture {
  id: string;
  operation: PermanentMemoryMigrationOperation;
  providerError: Record<string, unknown>;
  expectedCode?: NormalizedMemoryError['code'];
  expectedRetryable?: boolean;
  expectedDisposition?: PermanentMemoryFailureDisposition;
  expectedFinalState?: PermanentMemoryFailureFinalState;
  expectedEmpty?: 'null' | 'array' | 'false';
  attempt?: number;
  maxAttempts?: number;
}

export const permanentMemoryFailureFixtures: readonly PermanentMemoryFailureFixture[] = [
  {
    id: 'explicit-not-found-get',
    operation: 'get',
    providerError: { code: 'MEMORY_NOT_FOUND', notFound: true },
    expectedEmpty: 'null',
  },
  {
    id: 'explicit-not-found-list',
    operation: 'list',
    providerError: { status: 404, notFound: true },
    expectedEmpty: 'array',
  },
  {
    id: 'explicit-not-found-delete',
    operation: 'delete',
    providerError: { statusCode: 404, notFound: true },
    expectedEmpty: 'false',
  },
  {
    id: 'explicit-not-found-write',
    operation: 'write',
    providerError: { code: 'MEMORY_NOT_FOUND', notFound: true },
    expectedCode: 'MEMORY_NOT_FOUND',
    expectedRetryable: false,
    expectedDisposition: 'dlq',
    expectedFinalState: 'dead_lettered',
  },
  {
    id: 'mongo-network-timeout',
    operation: 'get',
    providerError: { name: 'MongoNetworkTimeoutError', code: 'ETIMEDOUT' },
    expectedCode: 'MEMORY_PROVIDER_TIMEOUT',
    expectedRetryable: true,
    expectedDisposition: 'retry',
    expectedFinalState: 'waiting',
  },
  {
    id: 'connection-reset',
    operation: 'get',
    providerError: { code: 'ECONNRESET' },
    expectedCode: 'MEMORY_STORE_UNAVAILABLE',
    expectedRetryable: true,
    expectedDisposition: 'retry',
    expectedFinalState: 'waiting',
  },
  {
    id: 'authentication',
    operation: 'write',
    providerError: { code: 18, message: 'mongodb://admin:secret@private/auth failed' },
    expectedCode: 'MEMORY_PERMISSION_DENIED',
    expectedRetryable: false,
    expectedDisposition: 'dlq',
    expectedFinalState: 'dead_lettered',
  },
  {
    id: 'authorization',
    operation: 'get',
    providerError: { status: 403, message: 'Bearer top-secret-token' },
    expectedCode: 'MEMORY_PERMISSION_DENIED',
    expectedRetryable: false,
    expectedDisposition: 'dlq',
    expectedFinalState: 'dead_lettered',
  },
  {
    id: 'duplicate-write-conflict',
    operation: 'write',
    providerError: { code: 11000 },
    expectedCode: 'MEMORY_REVISION_CONFLICT',
    expectedRetryable: true,
    expectedDisposition: 'retry',
    expectedFinalState: 'waiting',
  },
  {
    id: 'validation-failure',
    operation: 'write',
    providerError: { code: 121 },
    expectedCode: 'MEMORY_INVALID_INPUT',
    expectedRetryable: false,
    expectedDisposition: 'dlq',
    expectedFinalState: 'dead_lettered',
  },
  {
    id: 'cursor-interrupted',
    operation: 'list',
    providerError: { code: 'MONGO_CURSOR_INTERRUPTED' },
    expectedCode: 'MEMORY_STORE_UNAVAILABLE',
    expectedRetryable: true,
    expectedDisposition: 'retry',
    expectedFinalState: 'waiting',
  },
  {
    id: 'write-response-lost',
    operation: 'write',
    providerError: { code: 'ECONNRESET', outcomeUnknown: true, sideEffectState: 'unknown' },
    expectedCode: 'MEMORY_PROVIDER_UNAVAILABLE',
    expectedRetryable: false,
    expectedDisposition: 'reconcile',
    expectedFinalState: 'reconciling',
  },
  {
    id: 'retry-exhausted',
    operation: 'get',
    providerError: { code: 'ETIMEDOUT' },
    expectedCode: 'MEMORY_PROVIDER_TIMEOUT',
    expectedRetryable: true,
    expectedDisposition: 'dlq',
    expectedFinalState: 'dead_lettered',
    attempt: 3,
    maxAttempts: 3,
  },
  {
    id: 'persistent-anomaly',
    operation: 'get',
    providerError: { code: 'PERSISTENT_CORRUPTION' },
    expectedCode: 'MEMORY_INTERNAL_ERROR',
    expectedRetryable: false,
    expectedDisposition: 'quarantine',
    expectedFinalState: 'quarantined',
  },
  {
    id: 'unknown-provider-error',
    operation: 'get',
    providerError: { message: 'user content and api_key=should-not-leak' },
    expectedCode: 'MEMORY_INTERNAL_ERROR',
    expectedRetryable: false,
    expectedDisposition: 'dlq',
    expectedFinalState: 'dead_lettered',
  },
];

export interface PermanentMemoryMigrationAcceptanceHarness {
  port: PermanentMemoryMigrationPort;
  events: PermanentMemoryFailureEvent[];
}

export type PermanentMemoryMigrationHarnessFactory = (
  fixture: PermanentMemoryFailureFixture
) => PermanentMemoryMigrationAcceptanceHarness;

export function createPermanentMemoryMigrationAdapterHarness(
  fixture: PermanentMemoryFailureFixture
): PermanentMemoryMigrationAcceptanceHarness {
  const events: PermanentMemoryFailureEvent[] = [];
  return {
    events,
    port: new PermanentMemoryMigrationAdapter({
      provider: new FaultInjectingPermanentMemoryProvider(fixture),
      observer: {
        record: (event) => {
          events.push(event);
        },
      },
    }),
  };
}

export function createReferencePermanentMemoryMigrationHarness(
  fixture: PermanentMemoryFailureFixture
): PermanentMemoryMigrationAcceptanceHarness {
  const events: PermanentMemoryFailureEvent[] = [];
  return {
    events,
    port: new ReferencePermanentMemoryMigrationPort(fixture, events),
  };
}

class FaultInjectingPermanentMemoryProvider implements PermanentMemoryMigrationProvider {
  constructor(private readonly fixture: PermanentMemoryFailureFixture) {}

  get<TValue = unknown>(_scope: ManagedMemoryScope, _recordId: string): Promise<TValue | null> {
    return this.fail<TValue | null>('get');
  }

  list<TValue = unknown>(_scope: ManagedMemoryScope): Promise<TValue[]> {
    return this.fail<TValue[]>('list');
  }

  delete(_scope: ManagedMemoryScope, _recordId: string): Promise<boolean> {
    return this.fail<boolean>('delete');
  }

  write<TValue = unknown>(
    _scope: ManagedMemoryScope,
    _recordId: string,
    _value: TValue
  ): Promise<void> {
    return this.fail<void>('write');
  }

  private fail<TResult>(operation: PermanentMemoryMigrationOperation): Promise<TResult> {
    if (this.fixture.operation !== operation) {
      return Promise.reject(new Error(`Unexpected fixture operation: ${operation}`));
    }
    return Promise.reject(structuredClone(this.fixture.providerError));
  }
}

class ReferencePermanentMemoryMigrationPort implements PermanentMemoryMigrationPort {
  constructor(
    private readonly fixture: PermanentMemoryFailureFixture,
    private readonly events: PermanentMemoryFailureEvent[]
  ) {}

  get<TValue = unknown>(request: PermanentMemoryMigrationRequest): Promise<TValue | null> {
    return this.run<TValue | null>(request, 'get', null);
  }

  list<TValue = unknown>(request: PermanentMemoryMigrationRequest): Promise<TValue[]> {
    return this.run<TValue[]>(request, 'list', []);
  }

  delete(request: PermanentMemoryMigrationRequest): Promise<boolean> {
    return this.run<boolean>(request, 'delete', false);
  }

  write<TValue = unknown>(request: PermanentMemoryMigrationRequest, _value: TValue): Promise<void> {
    return this.run<void>(request, 'write', undefined);
  }

  private async run<TResult>(
    request: PermanentMemoryMigrationRequest,
    operation: PermanentMemoryMigrationOperation,
    notFoundResult: TResult
  ): Promise<TResult> {
    if (this.fixture.operation !== operation) throw new Error('Fixture operation mismatch.');
    if (isExplicitPermanentMemoryNotFound(this.fixture.providerError) && operation !== 'write') {
      return notFoundResult;
    }
    const error = normalizePermanentMemoryProviderError(
      this.fixture.providerError,
      request,
      operation
    );
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
    this.events.push({
      type: 'permanent_memory.operation_failed',
      operationId: request.operationId,
      operation,
      providerRef: request.providerRef,
      profileRef: request.profileRef,
      scopeHash: String(propagated.details?.scopeHash),
      attempt: decision.attempt,
      error: propagated,
      disposition: decision.disposition,
      finalState: decision.finalState,
    });
    throw propagated;
  }
}
