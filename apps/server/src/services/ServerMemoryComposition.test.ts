import type {
  MemoryApplicationService,
  MemoryRuntime,
  ProviderHealth,
  MemoryProviderTelemetry,
  MemoryRuntimeCompositionReceipt,
} from '@hypha/memory';
import { InMemoryEventStore } from '@hypha/core';
import { MemoryOperationalMetrics } from '@hypha/memory';
import {
  createServerMemoryEventPublisher,
  createServerMemoryTelemetry,
  estimateServerMemoryOperation,
  resolveMongoTransactionMode,
  ServerMemoryComposition,
} from './ServerMemoryComposition';

function runtime(
  close: MemoryRuntime['close'] = jest.fn(async () => undefined),
  telemetry?: MemoryProviderTelemetry,
  setup: {
    health?: ProviderHealth;
    providerSpec?: MemoryRuntime['providerSpec'];
  } = {}
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
    providerHealth: jest.fn(
      async () =>
        setup.health ?? {
          status: 'healthy',
          checkedAt: '2026-07-24T00:00:00.000Z',
        }
    ),
  } as unknown as MemoryApplicationService;
  return {
    service,
    provider: { id: 'memory.provider.native-test' } as MemoryRuntime['provider'],
    profile: { id: 'native-test', version: '1.0.0' } as MemoryRuntime['profile'],
    providerSpec:
      setup.providerSpec ??
      ({ type: 'native', deployment: 'embedded' } as MemoryRuntime['providerSpec']),
    profileHash: receipt.profileHash,
    capabilities: {} as MemoryRuntime['capabilities'],
    compositionReceipt: receipt,
    close,
    telemetry,
  };
}

describe('ServerMemoryComposition', () => {
  it('persists sanitized and scoped Memory lifecycle events into the Event fact store', async () => {
    const events = new InMemoryEventStore();
    const publisher = createServerMemoryEventPublisher(events, () => '2026-08-01T00:00:00.000Z');
    const context = {
      tenantId: 'tenant:test',
      userId: 'user:test',
      workspaceId: 'workspace:test',
      sessionId: 'session:test',
      runId: 'run:test',
      stepId: 'step:test',
      agentId: 'agent:test',
    };
    const payload = {
      operationId: 'operation:test',
      profileId: 'memory.default',
      providerId: 'memory.provider.native',
      scopeHash: 'sha256:scope',
      status: 'requested',
      metadata: {
        content: 'must-not-enter-events',
        safe: 'retained',
      },
    };

    const eventId = await publisher.publish('memory.activity.requested', payload, context);
    await expect(publisher.publish('memory.activity.requested', payload, context)).resolves.toBe(
      eventId
    );

    const persisted = await events.list({ userId: 'user:test', runId: 'run:test' });
    expect(persisted).toHaveLength(1);
    expect(persisted[0]).toMatchObject({
      id: eventId,
      type: 'memory.activity.requested',
      version: '1.0.0',
      tenantId: 'tenant:test',
      userId: 'user:test',
      workspaceId: 'workspace:test',
      sessionId: 'session:test',
      runId: 'run:test',
      stepId: 'step:test',
      agentId: 'agent:test',
      operationId: 'operation:test',
      timestamp: '2026-08-01T00:00:00.000Z',
      payload: {
        operationId: 'operation:test',
        profileId: 'memory.default',
        providerId: 'memory.provider.native',
        scopeHash: 'sha256:scope',
        status: 'requested',
        metadata: { safe: 'retained' },
      },
    });
  });

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
    const operationalMetrics = new MemoryOperationalMetrics();
    operationalMetrics.record('retry');
    const composition = new ServerMemoryComposition({
      bootstrap: async () => runtime(undefined, telemetry),
      operationalMetrics,
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
      operationalMetrics: { counters: { retry: 1 } },
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

  it('fails closed when bootstrap cannot create the runtime and redacts readiness evidence', async () => {
    const composition = new ServerMemoryComposition({
      bootstrap: async () => {
        throw new Error(
          'profile reference is unresolved at C:\\Users\\operator\\memory.yaml using Bearer live-token'
        );
      },
    });

    await expect(composition.start()).rejects.toThrow('profile reference is unresolved');
    const readiness = await composition.readiness();
    expect(readiness).toMatchObject({
      state: 'failed',
      ready: false,
    });
    expect(readiness.message).toContain('[REDACTED_PATH]');
    expect(readiness.message).toContain('[REDACTED_SECRET]');
    expect(readiness.message).not.toContain('operator');
    expect(readiness.message).not.toContain('live-token');
  });

  it('fails readiness for an unhealthy required external Profile', async () => {
    const composition = new ServerMemoryComposition({
      bootstrap: async () =>
        runtime(undefined, undefined, {
          health: {
            status: 'degraded',
            checkedAt: '2026-07-24T00:00:00.000Z',
            message: 'remote provider unavailable',
          },
          providerSpec: {
            type: 'mem0',
            deployment: 'remote',
            metadata: { startupRequirement: 'required' },
          } as unknown as MemoryRuntime['providerSpec'],
        }),
    });
    await composition.start();

    await expect(composition.readiness()).resolves.toMatchObject({
      state: 'ready',
      ready: false,
      providerStatus: 'degraded',
      requirement: 'required',
      external: true,
      evidence: {
        profileId: 'native-test',
        providerId: 'memory.provider.native-test',
        providerStatus: 'degraded',
        requirement: 'required',
        external: true,
      },
    });
  });

  it('continues in degraded state with explicit evidence for an optional external Profile', async () => {
    const composition = new ServerMemoryComposition({
      bootstrap: async () =>
        runtime(undefined, undefined, {
          health: {
            status: 'unhealthy',
            checkedAt: '2026-07-24T00:00:00.000Z',
            message: 'optional provider is offline',
          },
          providerSpec: {
            type: 'memorybank',
            deployment: 'managed',
            metadata: { startupRequirement: 'optional' },
          } as unknown as MemoryRuntime['providerSpec'],
        }),
    });
    await composition.start();

    await expect(composition.readiness()).resolves.toMatchObject({
      state: 'degraded',
      ready: true,
      providerStatus: 'unhealthy',
      requirement: 'optional',
      external: true,
      evidence: {
        providerStatus: 'unhealthy',
        requirement: 'optional',
      },
    });
    expect(composition.service()).toBeDefined();
  });

  it('waits for runtime worker drain before reporting shutdown complete', async () => {
    let releaseDrain!: () => void;
    const draining = new Promise<void>((resolve) => {
      releaseDrain = resolve;
    });
    const close = jest.fn(async () => draining);
    const composition = new ServerMemoryComposition({
      bootstrap: async () => runtime(close),
    });
    await composition.start();

    const stopping = composition.stop();
    await Promise.resolve();
    await expect(composition.readiness()).resolves.toMatchObject({
      state: 'draining',
      ready: false,
    });
    let stopped = false;
    void stopping.then(() => {
      stopped = true;
    });
    await Promise.resolve();
    expect(stopped).toBe(false);

    releaseDrain();
    await stopping;
    expect(close).toHaveBeenCalledTimes(1);
    await expect(composition.readiness()).resolves.toMatchObject({
      state: 'stopped',
      ready: false,
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
    expect(resolveMongoTransactionMode({ setName: 'rs0' }, 'auto')).toBe('required');
    expect(resolveMongoTransactionMode({}, 'auto')).toBe('disabled');
    expect(resolveMongoTransactionMode({}, 'preferred')).toBe('preferred');
    expect(() => resolveMongoTransactionMode({}, 'sometimes')).toThrow(
      'must be auto, required, preferred, or disabled'
    );
  });
});
