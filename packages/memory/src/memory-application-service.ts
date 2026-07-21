import type {
  ManagedMemoryRecord,
  MemoryManagementCapabilities,
  NormalizedMemoryError,
} from './contracts';
import type {
  ContextBuildExplanation,
  ContextBuildInput,
  ContextEnvelope,
  MemoryContextBuilder,
} from './context-contracts';
import type { GovernedMemoryManager } from './governed-memory-manager';
import type { MemoryActivityPort } from './integration-contracts';
import type { MemoryEventContext } from './memory-events';
import { memoryError } from './memory-utils';
import type {
  ManagedMemoryDeleteRequest,
  ManagedMemoryDeleteResult,
  ManagedMemorySearchRequest,
  ManagedMemorySearchResult,
  ManagedMemoryUpdateRequest,
  ManagedMemoryWriteResult,
  MemoryAddRequest,
  MemoryGetRequest,
  MemoryHistoryRequest,
  MemoryListRequest,
  MemoryListResult,
  MemoryManagementProvider,
  MemoryVersion,
  ProviderHealth,
} from './operations';

export interface MemoryApplicationService {
  add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
  search(
    request: ManagedMemorySearchRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemorySearchResult[]>;
  get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
  list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
  update(
    request: ManagedMemoryUpdateRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult>;
  delete(
    request: ManagedMemoryDeleteRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryDeleteResult>;
  history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
  buildContext(request: ContextBuildInput, signal?: AbortSignal): Promise<ContextEnvelope>;
  explainContext(contextHash: string): Promise<ContextBuildExplanation | null>;
  providerCapabilities(): Promise<MemoryManagementCapabilities>;
  providerHealth(): Promise<ProviderHealth>;
  close(): Promise<void>;
}

export interface DefaultMemoryApplicationServiceOptions {
  manager: GovernedMemoryManager;
  activities: MemoryActivityPort;
  provider: MemoryManagementProvider;
  contextBuilder?: MemoryContextBuilder;
  eventContext: MemoryEventContext | ((request: ContextBuildInput) => MemoryEventContext);
  contextTimeoutMs?: number;
}

/**
 * Canonical application-facing Memory surface. HTTP, Chat, Workflow and Harness
 * integrations consume this service instead of selecting a Provider or Store.
 */
export class DefaultMemoryApplicationService implements MemoryApplicationService {
  constructor(private readonly options: DefaultMemoryApplicationServiceOptions) {}

  add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult> {
    return this.options.manager.add(request, signal);
  }

  search(
    request: ManagedMemorySearchRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemorySearchResult[]> {
    return this.options.manager.search(request, signal);
  }

  get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null> {
    return this.options.manager.get(request, signal);
  }

  list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult> {
    return this.options.manager.list(request, signal);
  }

  update(
    request: ManagedMemoryUpdateRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult> {
    return this.options.manager.update(request, signal);
  }

  delete(
    request: ManagedMemoryDeleteRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryDeleteResult> {
    return this.options.manager.delete(request, signal);
  }

  history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]> {
    return this.options.manager.history(request, signal);
  }

  async buildContext(request: ContextBuildInput, signal?: AbortSignal): Promise<ContextEnvelope> {
    const result = await this.options.activities.execute(
      {
        operationId: request.operationId,
        operation: 'build_context',
        principal: request.principal,
        scope: request.scope,
        profileRef: request.profileRef,
        eventContext: this.resolveEventContext(request),
        payload: request,
        timeoutMs: this.options.contextTimeoutMs,
      },
      signal
    );
    if (result.status !== 'completed') {
      throw result.error ?? applicationError(`Context activity ended with ${result.status}.`);
    }
    if (!isContextEnvelope(result.output)) {
      throw applicationError('Context activity returned no ContextEnvelope.');
    }
    return result.output;
  }

  explainContext(contextHash: string): Promise<ContextBuildExplanation | null> {
    if (!this.options.contextBuilder) {
      return Promise.reject(
        memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          'Context explanation is not installed in this Memory runtime.'
        )
      );
    }
    return this.options.contextBuilder.explain(contextHash);
  }

  providerCapabilities(): Promise<MemoryManagementCapabilities> {
    return this.options.provider.capabilities();
  }

  providerHealth(): Promise<ProviderHealth> {
    return this.options.provider.health();
  }

  async close(): Promise<void> {
    await this.options.provider.close?.();
  }

  private resolveEventContext(request: ContextBuildInput): MemoryEventContext {
    return typeof this.options.eventContext === 'function'
      ? this.options.eventContext(request)
      : this.options.eventContext;
  }
}

function isContextEnvelope(value: unknown): value is ContextEnvelope {
  if (!value || typeof value !== 'object') return false;
  const envelope = value as Partial<ContextEnvelope>;
  return (
    typeof envelope.id === 'string' &&
    typeof envelope.contextHash === 'string' &&
    Array.isArray(envelope.systemSegments) &&
    Array.isArray(envelope.dataSegments)
  );
}

function applicationError(message: string): NormalizedMemoryError {
  return memoryError('MEMORY_INTERNAL_ERROR', message);
}
