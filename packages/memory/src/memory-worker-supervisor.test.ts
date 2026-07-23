import { describe, expect, it, vi } from 'vitest';
import { MemoryWorkerSupervisor, type SupervisedMemoryWorker } from './index';

function worker(overrides: Partial<SupervisedMemoryWorker> = {}): SupervisedMemoryWorker {
  return {
    start: vi.fn(),
    runOnce: vi.fn(async () => undefined),
    stopAndDrain: vi.fn(async () => undefined),
    ...overrides,
  };
}

describe('MemoryWorkerSupervisor', () => {
  it('shares concurrent stop calls and drains every worker before reporting failures', async () => {
    let releaseSlowDrain!: () => void;
    const slowDrain = new Promise<void>((resolve) => {
      releaseSlowDrain = resolve;
    });
    const failed = worker({
      stopAndDrain: vi.fn(async () => {
        throw new Error('outbox drain failed');
      }),
    });
    const slow = worker({ stopAndDrain: vi.fn(() => slowDrain) });
    const supervisor = new MemoryWorkerSupervisor({ workers: [failed, slow] });
    await supervisor.start();

    const firstStop = supervisor.stop();
    const secondStop = supervisor.stop();
    expect(firstStop).toBe(secondStop);
    expect(supervisor.status()).toBe('stopping');
    await Promise.resolve();
    expect(supervisor.status()).toBe('stopping');

    releaseSlowDrain();
    await expect(firstStop).rejects.toBeInstanceOf(AggregateError);
    expect(supervisor.status()).toBe('stopped');
    expect(failed.stopAndDrain).toHaveBeenCalledTimes(1);
    expect(slow.stopAndDrain).toHaveBeenCalledTimes(1);
  });

  it('drains all workers when startup recovery fails', async () => {
    const first = worker();
    const second = worker({
      runOnce: vi.fn(async () => {
        throw new Error('recovery failed');
      }),
    });
    const supervisor = new MemoryWorkerSupervisor({ workers: [first, second] });

    await expect(supervisor.start()).rejects.toThrow('recovery failed');
    expect(supervisor.status()).toBe('stopped');
    expect(first.stopAndDrain).toHaveBeenCalledTimes(1);
    expect(second.stopAndDrain).toHaveBeenCalledTimes(1);
  });
});
