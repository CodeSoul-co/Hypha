import type {
  MemoryApplicationService,
  MemoryRuntime,
  MemoryRuntimeCompositionReceipt,
} from '@hypha/memory';
import { ServerMemoryComposition } from './ServerMemoryComposition';

function runtime(close = jest.fn(async () => undefined)): MemoryRuntime {
  const receipt: MemoryRuntimeCompositionReceipt = {
    runtimeId: 'memory-runtime:test',
    serviceInstanceId: 'memory-service:test',
    serviceContract: '@hypha/memory.MemoryApplicationService',
    activeProfileId: 'native-test',
    providerId: 'memory.provider.native-test',
    providerSpecId: 'memory.provider.native-test',
    configHash: 'sha256:config',
    profileHash: 'sha256:profile',
    resolvedDependencyRefs: [],
    createdAt: '2026-07-24T00:00:00.000Z',
  };
  const service = {
    providerHealth: jest.fn(async () => ({
      status: 'healthy',
      checkedAt: '2026-07-24T00:00:00.000Z',
    })),
  } as unknown as MemoryApplicationService;
  return {
    service,
    provider: {} as MemoryRuntime['provider'],
    profile: { id: 'native-test', version: '1.0.0' } as MemoryRuntime['profile'],
    providerSpec: {} as MemoryRuntime['providerSpec'],
    profileHash: receipt.profileHash,
    capabilities: {} as MemoryRuntime['capabilities'],
    compositionReceipt: receipt,
    close,
  };
}

describe('ServerMemoryComposition', () => {
  it('registers one canonical service and shares concurrent startup', async () => {
    const bootstrap = jest.fn(async () => runtime());
    const composition = new ServerMemoryComposition({ bootstrap });
    const [left, right] = await Promise.all([composition.start(), composition.start()]);

    expect(left.serviceInstanceId).toBe('memory-service:test');
    expect(right).toEqual(left);
    expect(bootstrap).toHaveBeenCalledTimes(1);
    expect(composition.service()).toBeDefined();
    await expect(composition.readiness()).resolves.toMatchObject({
      state: 'ready',
      ready: true,
      providerStatus: 'healthy',
    });
  });

  it('drains once and rejects service access after shutdown', async () => {
    const close = jest.fn(async () => undefined);
    const composition = new ServerMemoryComposition({
      bootstrap: async () => runtime(close),
    });
    await composition.start();
    await Promise.all([composition.stop(), composition.stop()]);

    expect(close).toHaveBeenCalledTimes(1);
    expect(() => composition.service()).toThrow('composition is stopped');
    await expect(composition.readiness()).resolves.toMatchObject({
      state: 'stopped',
      ready: false,
    });
  });

  it('fails closed when bootstrap cannot create the runtime', async () => {
    const composition = new ServerMemoryComposition({
      bootstrap: async () => {
        throw new Error('profile reference is unresolved');
      },
    });

    await expect(composition.start()).rejects.toThrow('profile reference is unresolved');
    await expect(composition.readiness()).resolves.toMatchObject({
      state: 'failed',
      ready: false,
      message: 'profile reference is unresolved',
    });
  });
});
