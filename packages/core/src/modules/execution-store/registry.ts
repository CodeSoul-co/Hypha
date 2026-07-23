import type { ExecutionStore, ExecutionStoreFactory } from '../../contracts/execution-store';
import { FrameworkError } from '../../errors';

export interface ExecutionStoreRegistration {
  storeId: string;
}

/**
 * Provider-neutral DI registry for durable Execution stores.
 * Core selects a factory but never imports a concrete database adapter.
 */
export class ExecutionStoreRegistry {
  private readonly factories = new Map<string, ExecutionStoreFactory>();

  register(factory: ExecutionStoreFactory): void {
    assertFactory(factory);
    if (this.factories.has(factory.storeId)) {
      throw registryError(
        'execution.store_registration_conflict',
        `Execution Store ${factory.storeId} is already registered.`,
        factory.storeId
      );
    }
    this.factories.set(factory.storeId, factory);
  }

  unregister(storeId: string): boolean {
    return this.factories.delete(requiredStoreId(storeId));
  }

  list(): ExecutionStoreRegistration[] {
    return [...this.factories.keys()]
      .sort((left, right) => left.localeCompare(right))
      .map((storeId) => ({ storeId }));
  }

  resolve(storeId: string): ExecutionStoreFactory {
    const normalizedId = requiredStoreId(storeId);
    const factory = this.factories.get(normalizedId);
    if (!factory) {
      throw registryError(
        'execution.store_not_registered',
        `Execution Store ${normalizedId} is not registered.`,
        normalizedId
      );
    }
    return factory;
  }

  async create(storeId: string): Promise<ExecutionStore> {
    const normalizedId = requiredStoreId(storeId);
    const store = await this.resolve(normalizedId).create();
    try {
      assertStore(store, normalizedId);
      return store;
    } catch (error) {
      await store?.close?.().catch(() => undefined);
      throw error;
    }
  }
}

function assertFactory(factory: ExecutionStoreFactory): void {
  if (!factory || typeof factory.create !== 'function') {
    throw registryError(
      'execution.store_registration_invalid',
      'Execution Store factory must define create().'
    );
  }
  requiredStoreId(factory.storeId);
}

function assertStore(store: ExecutionStore, storeId: string): void {
  const methods: Array<keyof ExecutionStore> = [
    'create',
    'get',
    'list',
    'resolveIdempotency',
    'compareAndSet',
    'acquireLease',
    'renewLease',
    'releaseLease',
  ];
  if (!store || methods.some((method) => typeof store[method] !== 'function')) {
    throw registryError(
      'execution.store_factory_invalid',
      `Execution Store factory ${storeId} returned an invalid store.`,
      storeId
    );
  }
}

function requiredStoreId(storeId: string): string {
  if (typeof storeId !== 'string' || storeId.trim() !== storeId || storeId.length === 0) {
    throw registryError(
      'execution.store_registration_invalid',
      'Execution Store id must be a non-empty, trimmed string.',
      storeId
    );
  }
  return storeId;
}

function registryError(code: string, message: string, storeId?: string): FrameworkError {
  return new FrameworkError({
    code,
    message,
    context: { storeId },
  });
}
