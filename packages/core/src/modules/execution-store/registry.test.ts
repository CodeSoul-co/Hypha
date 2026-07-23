import type {
  ExecutionRecord,
  ExecutionStore,
  ExecutionStoreFactory,
} from '../../contracts/execution-store';
import { describe, expect, it, vi } from 'vitest';
import { ExecutionStoreRegistry } from './registry';

describe('ExecutionStoreRegistry', () => {
  it('registers, lists, resolves, creates, and unregisters stores deterministically', async () => {
    const store = executionStore();
    const factory: ExecutionStoreFactory = {
      storeId: 'execution-store.sqlite',
      create: vi.fn(async () => store),
    };
    const registry = new ExecutionStoreRegistry();

    registry.register(factory);

    expect(registry.list()).toEqual([{ storeId: factory.storeId }]);
    expect(registry.resolve(factory.storeId)).toBe(factory);
    await expect(registry.create(factory.storeId)).resolves.toBe(store);
    expect(registry.unregister(factory.storeId)).toBe(true);
    expect(() => registry.resolve(factory.storeId)).toThrow(/not registered/u);
  });

  it('rejects duplicate, malformed, missing, and invalid factories', async () => {
    const registry = new ExecutionStoreRegistry();
    const factory: ExecutionStoreFactory = {
      storeId: 'execution-store.sqlite',
      create: async () => executionStore(),
    };
    registry.register(factory);

    expect(() => registry.register(factory)).toThrow(/already registered/u);
    expect(() =>
      registry.register({ storeId: ' untrimmed ', create: factory.create })
    ).toThrow(/non-empty, trimmed/u);
    expect(() => registry.resolve('execution-store.missing')).toThrow(/not registered/u);

    const close = vi.fn(async () => undefined);
    registry.register({
      storeId: 'execution-store.invalid',
      create: async () => ({ close }) as unknown as ExecutionStore,
    });
    await expect(registry.create('execution-store.invalid')).rejects.toThrow(/invalid store/u);
    expect(close).toHaveBeenCalledOnce();
  });
});

function executionStore(): ExecutionStore {
  const record = {} as ExecutionRecord;
  return {
    create: async () => record,
    get: async () => null,
    list: async () => ({ records: [] }),
    resolveIdempotency: async () => ({ status: 'miss' }),
    compareAndSet: async () => record,
    acquireLease: async () => record,
    renewLease: async () => record,
    releaseLease: async () => record,
    health: async () => ({
      status: 'healthy',
      checkedAt: '2026-07-23T00:00:00.000Z',
    }),
  };
}
