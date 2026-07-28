import type { ManagedMemoryScope } from './contracts';
import { hashMemoryScope, memoryError } from './memory-utils';
import type { MemorySearchCacheStore } from './managed-search-cache';

export type MemoryProjectionInvalidationReason = 'updated' | 'deleted';

export interface MemoryProjectionInvalidationRequest {
  operationId: string;
  scope: ManagedMemoryScope;
  reason: MemoryProjectionInvalidationReason;
  memoryIds: string[];
  memoryVersionIds?: string[];
}

export interface MemoryProjectionInvalidationReceipt {
  operationId: string;
  scopeHash: string;
  mutationGeneration: string;
  reason: MemoryProjectionInvalidationReason;
  targets: Array<{ id: string; invalidatedEntries: number }>;
}

export interface MemoryProjectionInvalidationPort {
  invalidate(
    request: MemoryProjectionInvalidationRequest
  ): Promise<MemoryProjectionInvalidationReceipt>;
}

export interface MemoryProjectionInvalidationTarget {
  readonly id: string;
  invalidateScope(scopeHash: string, mutationGeneration: string): Promise<number>;
}

export interface MemoryMutationGenerationStore {
  current(scopeHash: string): Promise<string>;
  advance(scopeHash: string, operationId: string): Promise<string>;
}

export class InMemoryMemoryMutationGenerationStore implements MemoryMutationGenerationStore {
  private readonly generations = new Map<string, number>();
  private readonly operations = new Map<string, string>();

  async current(scopeHash: string): Promise<string> {
    return String(this.generations.get(scopeHash) ?? 0);
  }

  async advance(scopeHash: string, operationId: string): Promise<string> {
    const operationKey = scopeHash + ':' + operationId;
    const existing = this.operations.get(operationKey);
    if (existing) return existing;
    const generation = String((this.generations.get(scopeHash) ?? 0) + 1);
    this.generations.set(scopeHash, Number(generation));
    this.operations.set(operationKey, generation);
    return generation;
  }
}

export class MemoryProjectionInvalidationCoordinator implements MemoryProjectionInvalidationPort {
  private readonly targets: MemoryProjectionInvalidationTarget[];

  constructor(
    private readonly generations: MemoryMutationGenerationStore,
    targets: readonly MemoryProjectionInvalidationTarget[]
  ) {
    const ids = targets.map((target) => target.id);
    if (new Set(ids).size !== ids.length) {
      throw new TypeError('Memory projection invalidation target ids must be unique.');
    }
    this.targets = [...targets];
  }

  async invalidate(
    request: MemoryProjectionInvalidationRequest
  ): Promise<MemoryProjectionInvalidationReceipt> {
    const scopeHash = hashMemoryScope(request.scope);
    const mutationGeneration = await this.generations.advance(scopeHash, request.operationId);
    let targets: MemoryProjectionInvalidationReceipt['targets'];
    try {
      targets = await Promise.all(
        this.targets.map(async (target) => ({
          id: target.id,
          invalidatedEntries: await target.invalidateScope(scopeHash, mutationGeneration),
        }))
      );
    } catch (error) {
      throw memoryError(
        'MEMORY_STORE_UNAVAILABLE',
        'Memory mutation generation advanced but a projection could not be physically invalidated.',
        true,
        { scopeHash, mutationGeneration, operationId: request.operationId }
      );
    }
    return {
      operationId: request.operationId,
      scopeHash,
      mutationGeneration,
      reason: request.reason,
      targets,
    };
  }
}

export class MemorySearchCacheInvalidationTarget implements MemoryProjectionInvalidationTarget {
  readonly id: string;

  constructor(
    private readonly store: MemorySearchCacheStore,
    id = 'memory-search'
  ) {
    this.id = id;
  }

  invalidateScope(scopeHash: string): Promise<number> {
    return this.store.invalidateScope(scopeHash);
  }
}
