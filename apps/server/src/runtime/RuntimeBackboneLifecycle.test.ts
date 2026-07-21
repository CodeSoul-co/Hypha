import type { ProviderHealth } from '@hypha/core';
import { RuntimeBackboneLifecycle, type RuntimeBackboneResource } from './RuntimeBackboneLifecycle';

interface TestBackbone extends RuntimeBackboneResource {
  id: string;
}

describe('RuntimeBackboneLifecycle', () => {
  it('initializes one healthy backbone for concurrent callers', async () => {
    const close = jest.fn();
    const health = jest.fn<Promise<ProviderHealth>, []>().mockResolvedValue({
      status: 'healthy',
      checkedAt: '2026-07-21T08:00:00.000Z',
    });
    const factory = jest.fn<Promise<TestBackbone>, []>().mockResolvedValue({
      id: 'runtime.primary',
      eventStore: { health },
      close,
    });
    const lifecycle = new RuntimeBackboneLifecycle(factory);

    const [first, second] = await Promise.all([lifecycle.initialize(), lifecycle.initialize()]);

    expect(first).toBe(second);
    expect(lifecycle.get()).toBe(first);
    expect(lifecycle.isInitialized()).toBe(true);
    expect(factory).toHaveBeenCalledTimes(1);
    expect(health).toHaveBeenCalledTimes(1);
  });

  it('fails readiness closed and permits a clean retry', async () => {
    const rejectedClose = jest.fn();
    const acceptedClose = jest.fn();
    const factory = jest
      .fn<Promise<TestBackbone>, []>()
      .mockResolvedValueOnce({
        id: 'runtime.unhealthy',
        eventStore: {
          health: async () => ({
            status: 'unhealthy',
            checkedAt: '2026-07-21T08:00:00.000Z',
            message: 'quick_check failed',
          }),
        },
        close: rejectedClose,
      })
      .mockResolvedValueOnce({
        id: 'runtime.healthy',
        eventStore: {
          health: async () => ({
            status: 'healthy',
            checkedAt: '2026-07-21T08:00:01.000Z',
          }),
        },
        close: acceptedClose,
      });
    const lifecycle = new RuntimeBackboneLifecycle(factory);

    await expect(lifecycle.initialize()).rejects.toThrow(
      'Canonical Runtime event store is unhealthy: quick_check failed'
    );
    expect(rejectedClose).toHaveBeenCalledTimes(1);
    expect(lifecycle.isInitialized()).toBe(false);

    await expect(lifecycle.initialize()).resolves.toMatchObject({ id: 'runtime.healthy' });
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it('rejects access before startup and closes the accepted backbone once', async () => {
    const close = jest.fn();
    const lifecycle = new RuntimeBackboneLifecycle<TestBackbone>(async () => ({
      id: 'runtime.primary',
      eventStore: {
        health: async () => ({
          status: 'healthy',
          checkedAt: '2026-07-21T08:00:00.000Z',
        }),
      },
      close,
    }));

    expect(() => lifecycle.get()).toThrow('Canonical Runtime backbone is not initialized');
    await lifecycle.initialize();
    await lifecycle.close();
    await lifecycle.close();

    expect(close).toHaveBeenCalledTimes(1);
    expect(lifecycle.isInitialized()).toBe(false);
    expect(() => lifecycle.get()).toThrow('Canonical Runtime lifecycle is closed');
    await expect(lifecycle.initialize()).rejects.toThrow('Canonical Runtime lifecycle is closed');
  });
});
