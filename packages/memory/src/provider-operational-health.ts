import type { ProviderHealth } from './operations';

export type OperationalStatus = 'ready' | 'degraded' | 'not_ready';
export type LivenessStatus = 'alive' | 'stalled';

export interface ProviderRuntimeMetrics {
  poolActive?: number;
  poolIdle?: number;
  poolLimit?: number;
  queueDepth?: number;
  queueOldestAgeMs?: number;
  retryAttempts?: number;
  retryBudgetRemaining?: number;
  circuitState?: 'closed' | 'open' | 'half_open';
  rateLimitRemaining?: number;
  quarantinedOperations?: number;
  deadLetterCount?: number;
}

export interface ProviderOperationalSnapshot {
  providerId: string;
  health: ProviderHealth;
  metrics: ProviderRuntimeMetrics;
  required: boolean;
}

export interface MemoryOperationalHealth {
  readiness: { status: OperationalStatus; reasons: string[] };
  liveness: { status: LivenessStatus; reasons: string[] };
  providers: ProviderOperationalSnapshot[];
  checkedAt: string;
}

export interface ProviderOperationalProbe {
  readonly providerId: string;
  readonly required: boolean;
  health(signal?: AbortSignal): Promise<ProviderHealth>;
  metrics(): Promise<ProviderRuntimeMetrics>;
}

export class MemoryOperationalHealthService {
  constructor(
    private readonly probes: ProviderOperationalProbe[],
    private readonly now: () => string = () => new Date().toISOString()
  ) {}

  async snapshot(signal?: AbortSignal): Promise<MemoryOperationalHealth> {
    const providers = await Promise.all(
      this.probes.map(async (probe) => ({
        providerId: probe.providerId,
        required: probe.required,
        health: await probe.health(signal),
        metrics: await probe.metrics(),
      }))
    );
    const readinessReasons: string[] = [];
    const livenessReasons: string[] = [];
    for (const provider of providers) {
      if (provider.required && provider.health.status === 'unhealthy') {
        readinessReasons.push(provider.providerId + ':unhealthy');
      } else if (provider.required && provider.health.status !== 'healthy') {
        readinessReasons.push(provider.providerId + ':' + provider.health.status);
      }
      if (provider.metrics.circuitState === 'open') {
        readinessReasons.push(provider.providerId + ':circuit_open');
      }
      if ((provider.metrics.queueOldestAgeMs ?? 0) > 300_000) {
        livenessReasons.push(provider.providerId + ':queue_stalled');
      }
      if (
        (provider.metrics.retryBudgetRemaining ?? 1) <= 0 &&
        (provider.metrics.queueDepth ?? 0) > 0
      ) {
        livenessReasons.push(provider.providerId + ':retry_budget_exhausted');
      }
    }
    const requiredUnhealthy = providers.some(
      (item) => item.required && item.health.status === 'unhealthy'
    );
    return {
      readiness: {
        status: requiredUnhealthy
          ? 'not_ready'
          : readinessReasons.length > 0
            ? 'degraded'
            : 'ready',
        reasons: [...new Set(readinessReasons)].sort(),
      },
      liveness: {
        status: livenessReasons.length > 0 ? 'stalled' : 'alive',
        reasons: [...new Set(livenessReasons)].sort(),
      },
      providers,
      checkedAt: this.now(),
    };
  }
}
