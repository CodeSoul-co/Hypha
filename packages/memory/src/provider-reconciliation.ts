import type {
  ManagedMemoryDeleteRequest,
  ManagedMemoryDeleteResult,
  MemoryManagementProvider,
} from './operations';
import type {
  MemoryLifecycleTask,
  MemoryLifecycleTaskHandler,
  MemoryLifecycleTaskStore,
} from './lifecycle-workers';
import { hashMemoryScope, memoryError, sha256 } from './memory-utils';

export interface ProviderDeleteReconciliationPayload {
  operation: 'delete';
  providerId: string;
  request: ManagedMemoryDeleteRequest;
}

export async function enqueueProviderDeleteReconciliation(
  request: ManagedMemoryDeleteRequest,
  result: ManagedMemoryDeleteResult,
  store: MemoryLifecycleTaskStore,
  now = new Date().toISOString()
): Promise<MemoryLifecycleTask<ProviderDeleteReconciliationPayload>[]> {
  const providerIds = Array.from(new Set(result.pendingProviderIds ?? [])).sort();
  const tasks = providerIds.map((providerId) => {
    const id = `memory:provider-reconciliation:${sha256({
      operationId: request.operationId,
      providerId,
      memoryIds: [...(request.memoryIds ?? [])].sort(),
      filter: request.filter,
      mode: request.mode,
    }).slice(0, 24)}`;
    return {
      id,
      operationId: request.operationId,
      type: 'provider_reconciliation' as const,
      scopeHash: hashMemoryScope(request.scope),
      payload: { operation: 'delete' as const, providerId, request: structuredClone(request) },
      state: 'pending' as const,
      attempts: 0,
      availableAt: now,
      createdAt: now,
      updatedAt: now,
    };
  });
  for (const task of tasks) await store.enqueue(task);
  return tasks;
}

export interface ProviderReconciliationHandlerOptions {
  resolveProvider(providerId: string): MemoryManagementProvider | undefined;
}

export function createProviderReconciliationHandler(
  options: ProviderReconciliationHandlerOptions
): MemoryLifecycleTaskHandler {
  return async (task, signal) => {
    if (signal.aborted) throw signal.reason;
    const payload = task.payload as Partial<ProviderDeleteReconciliationPayload>;
    if (payload.operation !== 'delete' || !payload.providerId || !payload.request) {
      throw memoryError(
        'MEMORY_INVALID_INPUT',
        `Invalid provider reconciliation payload for task ${task.id}.`
      );
    }
    const provider = options.resolveProvider(payload.providerId);
    if (!provider) {
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        `Memory provider ${payload.providerId} is not registered for reconciliation.`,
        true
      );
    }
    const result = await provider.delete(payload.request, signal);
    if (
      result.status === 'failed' ||
      result.status === 'rejected' ||
      result.pendingProviderIds?.includes(payload.providerId)
    ) {
      throw memoryError(
        'MEMORY_DELETE_PARTIAL',
        `Memory provider ${payload.providerId} has not confirmed deletion.`,
        true
      );
    }
  };
}
