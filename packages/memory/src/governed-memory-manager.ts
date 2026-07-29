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
import type { MemoryProjectionInvalidationPort } from './memory-projection-invalidation';
import {
  createMemoryProviderReturnEvidence,
  verifyMemoryProviderReturnEvidence,
} from './provider-return-evidence';
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
  providerId: string;
  profileRef: MemoryContractSpecRef | ((request: GovernedMemoryRequest) => MemoryContractSpecRef);
  eventContext: MemoryEventContext | ((request: GovernedMemoryRequest) => MemoryEventContext);
  timeoutMs?: number;
  reconciliationStore?: MemoryLifecycleTaskStore;
  projectionInvalidation?: MemoryProjectionInvalidationPort;
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

  async update(
    request: ManagedMemoryUpdateRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult> {
    const result = await this.execute<ManagedMemoryWriteResult>('update', request, signal);
    if (result.status === 'committed') {
      await this.options.projectionInvalidation?.invalidate({
        operationId: request.operationId,
        scope: request.scope,
        reason: 'updated',
        memoryIds: result.records.map((record) => record.id),
        memoryVersionIds: result.records.map((record) => record.versionId),
      });
    }
    return result;
  }

  async delete(
    request: ManagedMemoryDeleteRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryDeleteResult> {
    const result = await this.execute<ManagedMemoryDeleteResult>('delete', request, signal);
    if (result.status === 'completed') {
      await this.options.projectionInvalidation?.invalidate({
        operationId: request.operationId,
        scope: request.scope,
        reason: 'deleted',
        memoryIds: result.deletedMemoryIds,
      });
    }
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
    const profileRef = this.resolveProfileRef(request);
    const evidenceInput = {
      ...request,
      operationId: request.operationId,
      principal: request.principal,
      scope: request.scope,
      profileRef,
      ...('idempotencyKey' in request && request.idempotencyKey !== undefined
        ? { idempotencyKey: request.idempotencyKey }
        : {}),
    };
    const result = await this.options.activities.execute(
      {
        operationId: request.operationId,
        operation,
        principal: request.principal,
        scope: request.scope,
        profileRef,
        eventContext: this.resolveEventContext(request),
        payload: request,
        timeoutMs: this.options.timeoutMs,
        idempotencyKey: 'idempotencyKey' in request ? request.idempotencyKey : undefined,
      },
      signal
    );
    if (result.status === 'completed' || result.status === 'partial') {
      const evidence = verifyMemoryProviderReturnEvidence(result.evidence, {
        operationId: request.operationId,
        operation,
        principal: request.principal,
        scope: request.scope,
        providerId: this.options.providerId,
        providerRevision: profileRef.revision ?? profileRef.version,
        input: evidenceInput,
        output: result.output,
      });
      if (
        evidence.terminal.status !== result.status ||
        result.error !== undefined ||
        evidence.terminal.error !== undefined
      ) {
        throw memoryError(
          'MEMORY_PROVIDER_UNAVAILABLE',
          'Governed provider success terminal does not match its return evidence.',
          false,
          { providerReturnEvidenceInvalid: true }
        );
      }
    }
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
    providerHandler(provider, 'add', (request, signal) =>
      provider.add(request as MemoryAddRequest, signal)
    )
  );
  activities.register(
    'search',
    providerHandler(provider, 'search', (request, signal) =>
      provider.search(request as ManagedMemorySearchRequest, signal)
    )
  );
  activities.register(
    'get',
    providerHandler(provider, 'get', (request, signal) =>
      provider.get(request as MemoryGetRequest, signal)
    )
  );
  activities.register(
    'list',
    providerHandler(provider, 'list', (request, signal) =>
      provider.list(request as MemoryListRequest, signal)
    )
  );
  activities.register(
    'update',
    providerHandler(provider, 'update', (request, signal) =>
      provider.update(request as ManagedMemoryUpdateRequest, signal)
    )
  );
  activities.register(
    'delete',
    providerHandler(
      provider,
      'delete',
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
    return {
      status: 'completed',
      eventIds: [],
      output,
      evidence: createProviderEvidence(provider, 'history', activity, output, 'completed'),
    };
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
  provider: MemoryManagementProvider,
  operation: MemoryActivityOperation,
  invoke: (request: GovernedMemoryRequest, signal?: AbortSignal) => Promise<T>,
  status: (output: T) => 'completed' | 'partial' = () => 'completed'
): MemoryActivityHandler {
  return async (activity, signal) => {
    const request = normalizeActivityRequest(activity);
    const output = await invoke(request, signal);
    const terminal = status(output);
    return {
      status: terminal,
      eventIds: [],
      output,
      evidence: createProviderEvidence(provider, operation, activity, output, terminal),
    };
  };
}

function createProviderEvidence(
  provider: MemoryManagementProvider,
  operation: MemoryActivityOperation,
  activity: MemoryActivityRequest,
  output: unknown,
  status: 'completed' | 'partial'
) {
  return createMemoryProviderReturnEvidence({
    operationId: activity.operationId,
    operation,
    principal: activity.principal,
    scope: activity.scope,
    providerId: provider.id,
    providerRevision:
      typeof (activity.profileRef as { revision?: unknown }).revision === 'string'
        ? (activity.profileRef as { revision: string }).revision
        : activity.profileRef.version,
    input: normalizeActivityRequest(activity),
    output,
    status,
  });
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
