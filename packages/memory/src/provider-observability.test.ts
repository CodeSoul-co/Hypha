import { describe, expect, it } from 'vitest';
import type { MemoryManagementProvider } from './operations';
import {
  MemoryProviderTelemetry,
  ObservedMemoryManagementProvider,
} from './provider-observability';

describe('Memory Provider observability', () => {
  it('reports bounded latency, cost, availability and SLO breaches without payload data', () => {
    let elapsed = 0;
    const telemetry = new MemoryProviderTelemetry({
      defaultPolicy: {
        windowMs: 60_000,
        slo: { minimumOperations: 2, availabilityTarget: 0.9, latencyP95Ms: 100 },
      },
      now: () => new Date(Date.UTC(2026, 6, 25, 0, 0, 0) + elapsed),
    });

    const first = telemetry.begin('provider-1', 'add', { costUnits: 2, storedBytesDelta: 20 });
    elapsed = 50;
    first.complete('succeeded');
    const second = telemetry.begin('provider-1', 'search');
    elapsed = 200;
    second.complete('failed', new Error('provider unavailable'));

    expect(telemetry.snapshot('provider-1')).toMatchObject({
      operations: {
        total: 2,
        succeeded: 1,
        failed: 1,
        quotaRejected: 0,
        inFlight: 0,
        byOperation: { add: 1, search: 1 },
      },
      availability: 0.5,
      latencyMs: { p50: 50, p95: 150, p99: 150, max: 150 },
      cost: { measuredUnits: 2, unpricedOperations: 1, complete: false },
      storage: { measuredBytes: 20 },
      slo: {
        status: 'breached',
        reasons: ['availability_below_target', 'latency_p95_above_target'],
      },
    });
    expect(JSON.stringify(telemetry.snapshot('provider-1'))).not.toContain('provider unavailable');
  });

  it('fails closed at operation, cost and storage quota boundaries', () => {
    const telemetry = new MemoryProviderTelemetry({
      defaultPolicy: {
        windowMs: 60_000,
        quota: { maxOperations: 1, maxCostUnits: 3, maxStoredBytes: 10 },
      },
      now: () => new Date('2026-07-25T00:00:00.000Z'),
    });
    const first = telemetry.begin('provider-1', 'add', { costUnits: 3, storedBytesDelta: 10 });
    first.complete('succeeded');

    const health = telemetry.begin('provider-1', 'health');
    health.complete('succeeded');

    expect(() => telemetry.begin('provider-1', 'search', { costUnits: 1 })).toThrow(
      'operation_quota was exhausted'
    );
    expect(telemetry.snapshot('provider-1')).toMatchObject({
      operations: {
        total: 3,
        succeeded: 2,
        quotaRejected: 1,
        byOperation: { add: 1, health: 1, search: 1 },
      },
      quota: {
        maxOperations: 1,
        remainingOperations: 0,
        maxCostUnits: 3,
        remainingCostUnits: 0,
        maxStoredBytes: 10,
        remainingStoredBytes: 0,
      },
    });
  });

  it('fails closed when a cost quota is configured for an unpriced operation', () => {
    const telemetry = new MemoryProviderTelemetry({
      defaultPolicy: { windowMs: 60_000, quota: { maxCostUnits: 5 } },
    });

    expect(() => telemetry.begin('provider-1', 'search')).toThrow('cost is unpriced');
    const health = telemetry.begin('provider-1', 'health');
    health.complete('succeeded');
    expect(telemetry.snapshot('provider-1')).toMatchObject({
      operations: { quotaRejected: 1, byOperation: { search: 1, health: 1 } },
      quota: { maxCostUnits: 5, remainingCostUnits: 5 },
    });
  });

  it('instruments canonical Provider calls and preserves errors', async () => {
    let elapsed = 0;
    const telemetry = new MemoryProviderTelemetry({
      defaultPolicy: { windowMs: 60_000 },
      now: () => new Date(Date.UTC(2026, 6, 25) + elapsed),
    });
    const failure = new Error('search failed');
    const provider = {
      id: 'provider-1',
      capabilities: async () => ({}),
      add: async () => ({ status: 'committed', records: [] }),
      search: async () => {
        throw failure;
      },
      get: async () => null,
      list: async () => ({ records: [], hasMore: false }),
      update: async () => ({ status: 'committed', records: [] }),
      delete: async () => ({ status: 'completed', deletedMemoryIds: [] }),
      health: async () => ({ status: 'healthy', checkedAt: '2026-07-25T00:00:00.000Z' }),
    } as unknown as MemoryManagementProvider;
    const observed = new ObservedMemoryManagementProvider({
      provider,
      telemetry,
      estimate: (operation) => (operation === 'add' ? { costUnits: 1 } : {}),
    });

    const addPromise = observed.add({ input: { secret: 'not retained' } } as never);
    elapsed = 25;
    await expect(addPromise).resolves.toMatchObject({ status: 'committed' });
    const searchPromise = observed.search({ query: 'not retained' } as never);
    elapsed = 65;
    await expect(searchPromise).rejects.toBe(failure);

    expect(telemetry.snapshot('provider-1')).toMatchObject({
      operations: {
        total: 2,
        succeeded: 1,
        failed: 1,
        byOperation: { add: 1, search: 1 },
      },
      latencyMs: { p50: 25, p95: 40 },
      cost: { measuredUnits: 1, unpricedOperations: 1, complete: false },
    });
    const serialized = JSON.stringify(telemetry.snapshot('provider-1'));
    expect(serialized).not.toContain('not retained');
    expect(serialized).not.toContain('search failed');
  });
});
