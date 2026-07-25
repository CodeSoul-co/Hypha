import type {
  MemoryApplicationService,
  MemoryRuntime,
  MemoryProviderTelemetry,
  MemoryRuntimeCompositionReceipt,
} from '@hypha/memory';
import {
  createServerMemoryTelemetry,
  estimateServerMemoryOperation,
  resolveMongoTransactionMode,
  ServerMemoryComposition,
} from './ServerMemoryComposition';

function runtime(
  close = jest.fn(async () => undefined),
  telemetry?: MemoryProviderTelemetry
): MemoryRuntime {
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
    provider: { id: 'memory.provider.native-test' } as MemoryRuntime['provider'],
    profile: { id: 'native-test', version: '1.0.0' } as MemoryRuntime['profile'],
    providerSpec: {} as MemoryRuntime['providerSpec'],
    profileHash: receipt.profileHash,
    capabilities: {} as MemoryRuntime['capabilities'],
    compositionReceipt: receipt,
    close,
    telemetry,
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
    const service = composition.service();
    expect(composition.bindConsumer('chat')).toBe(service);
    expect(composition.bindConsumer('memory-routes')).toBe(service);
    expect(composition.bindConsumer('tool')).toBe(service);
    expect(composition.bindConsumer('workflow')).toBe(service);
    expect(composition.bindConsumer('harness')).toBe(service);
    expect(composition.bindings()).toEqual({
      chat: 'memory-service:test',
      'memory-routes': 'memory-service:test',
      tool: 'memory-service:test',
      workflow: 'memory-service:test',
      harness: 'memory-service:test',
    });
    await expect(composition.readiness()).resolves.toMatchObject({
      state: 'ready',
      ready: true,
      providerStatus: 'healthy',
    });
  });

  it('exposes Provider health, telemetry, quota and SLO state for administration', async () => {
    const telemetry = createServerMemoryTelemetry({
      HYPHA_MEMORY_SLO_MIN_OPERATIONS: '1',
      HYPHA_MEMORY_SLO_AVAILABILITY: '1',
      HYPHA_MEMORY_SLO_P95_MS: '1000',
      HYPHA_MEMORY_QUOTA_MAX_OPERATIONS: '10',
    });
    const reservation = telemetry.begin('memory.provider.native-test', 'add', {
      costUnits: 0,
      storedBytesDelta: 20,
    });
    reservation.complete('succeeded');
    const composition = new ServerMemoryComposition({
      bootstrap: async () => runtime(undefined, telemetry),
    });
    await composition.start();

    await expect(composition.operationalSnapshot()).resolves.toMatchObject({
      receipt: { providerId: 'memory.provider.native-test' },
      profile: { id: 'native-test', version: '1.0.0' },
      provider: { id: 'memory.provider.native-test', status: 'healthy' },
      telemetry: {
        operations: { total: 1, succeeded: 1 },
        cost: { measuredUnits: 0, complete: true },
        storage: { measuredBytes: 20 },
        quota: { maxOperations: 10, remainingOperations: 9 },
        slo: { status: 'met' },
      },
    });
  });

  it('validates operations settings and prices only known Provider costs', () => {
    expect(() => createServerMemoryTelemetry({ HYPHA_MEMORY_SLO_AVAILABILITY: '1.1' })).toThrow(
      'Invalid HYPHA_MEMORY_SLO_AVAILABILITY'
    );
    expect(estimateServerMemoryOperation('add', { input: 'hello' }, 'native')).toEqual({
      costUnits: 0,
      storedBytesDelta: 7,
    });
    expect(estimateServerMemoryOperation('search', {}, 'mem0')).toEqual({
      costUnits: undefined,
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

describe('resolveMongoTransactionMode', () => {
  it('requires transactions for replica sets and sharded clusters', () => {
    expect(resolveMongoTransactionMode({ setName: 'rs0' })).toBe('required');
    expect(resolveMongoTransactionMode({ msg: 'isdbgrid' })).toBe('required');
    expect(resolveMongoTransactionMode({}, undefined, 'configured-rs')).toBe('required');
  });

  it('uses explicit standalone mode and rejects invalid configuration', () => {
    expect(resolveMongoTransactionMode({})).toBe('disabled');
    expect(resolveMongoTransactionMode({}, 'preferred')).toBe('preferred');
    expect(() => resolveMongoTransactionMode({}, 'sometimes')).toThrow(
      'must be required, preferred, or disabled'
    );
  });
});
