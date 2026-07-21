import { describe, expect, it } from 'vitest';
import { MemoryOperationalHealthService, type ProviderOperationalProbe } from './index';

describe('MemoryOperationalHealthService', () => {
  it('separates readiness from liveness and exposes provider metrics', async () => {
    const probes: ProviderOperationalProbe[] = [
      {
        providerId: 'required-provider',
        required: true,
        health: async () => ({ status: 'degraded', checkedAt: 'now' }),
        metrics: async () => ({
          queueDepth: 4,
          retryBudgetRemaining: 0,
          circuitState: 'half_open',
        }),
      },
      {
        providerId: 'optional-provider',
        required: false,
        health: async () => ({ status: 'unhealthy', checkedAt: 'now' }),
        metrics: async () => ({ poolActive: 2, poolLimit: 10 }),
      },
    ];
    const result = await new MemoryOperationalHealthService(
      probes,
      () => '2026-07-21T00:00:00.000Z'
    ).snapshot();
    expect(result.readiness).toEqual({
      status: 'degraded',
      reasons: ['required-provider:degraded'],
    });
    expect(result.liveness).toEqual({
      status: 'stalled',
      reasons: ['required-provider:retry_budget_exhausted'],
    });
    expect(result.providers[1]?.metrics).toMatchObject({ poolActive: 2, poolLimit: 10 });
  });

  it('marks required unhealthy providers not ready', async () => {
    const probe: ProviderOperationalProbe = {
      providerId: 'required',
      required: true,
      health: async () => ({ status: 'unhealthy', checkedAt: 'now' }),
      metrics: async () => ({ circuitState: 'open' }),
    };
    await expect(new MemoryOperationalHealthService([probe]).snapshot()).resolves.toMatchObject({
      readiness: { status: 'not_ready' },
      liveness: { status: 'alive' },
    });
  });
});
