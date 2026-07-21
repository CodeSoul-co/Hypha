import type {
  ManagedMemoryRecord,
  MemoryContractSpecRef,
  MemoryManagementCapabilities,
} from './contracts';
import type {
  DefaultMemoryActivityPort,
  MemoryActivityHandler,
  MemoryActivityOperation,
  MemoryActivityPort,
  MemoryActivityRequest,
} from './integration-contracts';
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
import { enqueueProviderDeleteReconciliation } from './provider-reconciliation';
import type { MemoryLifecycleTaskStore } from './lifecycle-workers';

type GovernedMemoryRequest =
  | MemoryAddRequest
  | ManagedMemorySearchRequest
  | MemoryGetRequest
  | MemoryListRequest
  | ManagedMemoryUpdateRequest
  | ManagedMemoryDeleteRequest
  | MemoryHistoryRequest;

export interface GovernedMemoryManagerOptions {
  activities: MemoryActivityPort;
  profileRef: MemoryContractSpecRef | ((request: GovernedMemoryRequest) => MemoryContractSpecRef);
  eventContext: MemoryEventContext | ((request: GovernedMemoryRequest) => MemoryEventContext);
  timeoutMs?: number;
  reconciliationStore?: MemoryLifecycleTaskStore;
  now?: () => string;
}

/**
 * Canonical managed-memory entry point. Every operation is executed through the
 * policy, harness, event, cancellation and timeout boundary of MemoryActivityPort.
 */
export class GovernedMemoryManager {
  constructor(private readonly options: GovernedMemoryManagerOptions) {}

  add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult> {
    return this.execute('add', request, signal);
  }

  search(
    request: ManagedMemorySearchRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemorySearchResult[]> {
    return this.execute('search', request, signal);
  }

  get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null> {
    return this.execute('get', request, signal);
  }

  list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult> {
    return this.execute('list', request, signal);
  }

  update(
    request: ManagedMemoryUpdateRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult> {
    return this.execute('update', request, signal);
  }

  async delete(
    request: ManagedMemoryDeleteRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryDeleteResult> {
    const result = await this.execute<ManagedMemoryDeleteResult>('delete', request, signal);
    if (result.pendingProviderIds?.length && this.options.reconciliationStore) {
      await enqueueProviderDeleteReconciliation(
        request,
        result,
        this.options.reconciliationStore,
        this.options.now?.()
      );
    }
    return result;
  }

  history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]> {
    return this.execute('history', request, signal);
  }

  private async execute<T>(
    operation: MemoryActivityOperation,
    request: GovernedMemoryRequest,
    signal?: AbortSignal
  ): Promise<T> {
    const result = await this.options.activities.execute(
      {
        operationId: request.operationId,
        operation,
        principal: request.principal,
        scope: request.scope,
        profileRef: this.resolveProfileRef(request),
        eventContext: this.resolveEventContext(request),
        payload: request,
        timeoutMs: this.options.timeoutMs,
        idempotencyKey: 'idempotencyKey' in request ? request.idempotencyKey : undefined,
      },
      signal
    );
    if (result.status === 'failed' || result.status === 'cancelled') {
      throw (
        result.error ??
        memoryError(
          'MEMORY_INTERNAL_ERROR',
          `Governed memory ${operation} activity ended with ${result.status}.`
        )
      );
    }
    if (result.output === undefined) {
      throw memoryError(
        'MEMORY_INTERNAL_ERROR',
        `Governed memory ${operation} activity returned no output.`
      );
    }
    return result.output as T;
  }

  private resolveProfileRef(request: GovernedMemoryRequest): MemoryContractSpecRef {
    return typeof this.options.profileRef === 'function'
      ? this.options.profileRef(request)
      : this.options.profileRef;
  }

  private resolveEventContext(request: GovernedMemoryRequest): MemoryEventContext {
    return typeof this.options.eventContext === 'function'
      ? this.options.eventContext(request)
      : this.options.eventContext;
  }
}

export interface MemoryActivityRegistrar {
  register(operation: MemoryActivityOperation, handler: MemoryActivityHandler): unknown;
}

export function registerMemoryManagementProviderHandlers(
  activities: MemoryActivityRegistrar | DefaultMemoryActivityPort,
  provider: MemoryManagementProvider
): void {
  activities.register(
    'add',
    providerHandler((request, signal) => provider.add(request as MemoryAddRequest, signal))
  );
  activities.register(
    'search',
    providerHandler((request, signal) =>
      provider.search(request as ManagedMemorySearchRequest, signal)
    )
  );
  activities.register(
    'get',
    providerHandler((request, signal) => provider.get(request as MemoryGetRequest, signal))
  );
  activities.register(
    'list',
    providerHandler((request, signal) => provider.list(request as MemoryListRequest, signal))
  );
  activities.register(
    'update',
    providerHandler((request, signal) =>
      provider.update(request as ManagedMemoryUpdateRequest, signal)
    )
  );
  activities.register(
    'delete',
    providerHandler(
      (request, signal) => provider.delete(request as ManagedMemoryDeleteRequest, signal),
      (output) =>
        (output as ManagedMemoryDeleteResult).status === 'partial' ? 'partial' : 'completed'
    )
  );
  activities.register('history', async (activity, signal) => {
    if (!provider.history) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        `Memory provider ${provider.id} does not support history.`
      );
    }
    const output = await provider.history(
      normalizeActivityRequest(activity) as MemoryHistoryRequest,
      signal
    );
    return { status: 'completed', eventIds: [], output };
  });
}

export async function governedMemoryProviderCapabilities(
  provider: MemoryManagementProvider
): Promise<MemoryManagementCapabilities> {
  return provider.capabilities();
}

export function governedMemoryProviderHealth(
  provider: MemoryManagementProvider
): Promise<ProviderHealth> {
  return provider.health();
}

function providerHandler<T>(
  invoke: (request: GovernedMemoryRequest, signal?: AbortSignal) => Promise<T>,
  status: (output: T) => 'completed' | 'partial' = () => 'completed'
): MemoryActivityHandler {
  return async (activity, signal) => {
    const output = await invoke(normalizeActivityRequest(activity), signal);
    return { status: status(output), eventIds: [], output };
  };
}

function normalizeActivityRequest(activity: MemoryActivityRequest): GovernedMemoryRequest {
  if (!activity.payload || typeof activity.payload !== 'object') {
    throw memoryError('MEMORY_INVALID_INPUT', 'Managed memory activity payload must be an object.');
  }
  return {
    ...(activity.payload as object),
    operationId: activity.operationId,
    principal: activity.principal,
    scope: activity.scope,
    profileRef: activity.profileRef,
    ...(activity.idempotencyKey === undefined ? {} : { idempotencyKey: activity.idempotencyKey }),
  } as GovernedMemoryRequest;
}
