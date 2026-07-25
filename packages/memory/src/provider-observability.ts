import type { NormalizedMemoryError } from './contracts';
import { memoryError, normalizeMemoryError } from './memory-utils';
import type {
  ManagedMemoryDeleteRequest,
  ManagedMemoryDeleteResult,
  ManagedMemorySearchRequest,
  ManagedMemorySearchResult,
  ManagedMemoryUpdateRequest,
  ManagedMemoryWriteResult,
  MemoryAddRequest,
  MemoryGetRequest,
  MemoryHistoryRequest,
  MemoryListRequest,
  MemoryListResult,
  MemoryManagementProvider,
  MemoryVersion,
  ProviderHealth,
} from './operations';

export type MemoryProviderOperation =
  | 'add'
  | 'search'
  | 'get'
  | 'list'
  | 'update'
  | 'delete'
  | 'history'
  | 'health';

export type MemoryProviderOperationOutcome = 'succeeded' | 'failed' | 'quota_rejected';

export interface MemoryProviderTelemetryPolicy {
  windowMs: number;
  maxSamples?: number;
  quota?: {
    maxOperations?: number;
    maxCostUnits?: number;
    maxStoredBytes?: number;
  };
  slo?: {
    minimumOperations?: number;
    availabilityTarget?: number;
    latencyP95Ms?: number;
  };
}

export interface MemoryProviderOperationEstimate {
  costUnits?: number;
  storedBytesDelta?: number;
}

export type MemoryProviderCostEstimator = (
  operation: MemoryProviderOperation,
  request: unknown
) => MemoryProviderOperationEstimate;

export interface MemoryProviderMetricSample {
  providerId: string;
  operation: MemoryProviderOperation;
  outcome: MemoryProviderOperationOutcome;
  latencyMs: number;
  occurredAt: string;
  costUnits?: number;
  storedBytesDelta?: number;
  errorCode?: string;
}

export interface MemoryProviderOperationalReport {
  providerId: string;
  window: { startedAt: string; endedAt: string; durationMs: number };
  operations: {
    total: number;
    succeeded: number;
    failed: number;
    quotaRejected: number;
    inFlight: number;
    byOperation: Partial<Record<MemoryProviderOperation, number>>;
  };
  availability: number | null;
  latencyMs: { p50: number | null; p95: number | null; p99: number | null; max: number | null };
  cost: { measuredUnits: number; unpricedOperations: number; complete: boolean };
  storage: { measuredBytes: number };
  quota: {
    maxOperations?: number;
    remainingOperations?: number;
    maxCostUnits?: number;
    remainingCostUnits?: number;
    maxStoredBytes?: number;
    remainingStoredBytes?: number;
  };
  slo: {
    status: 'met' | 'breached' | 'insufficient_data';
    reasons: string[];
    minimumOperations: number;
    availabilityTarget?: number;
    latencyP95Ms?: number;
  };
}

export interface MemoryProviderTelemetryOptions {
  defaultPolicy: MemoryProviderTelemetryPolicy;
  providerPolicies?: Record<string, MemoryProviderTelemetryPolicy>;
  now?: () => Date;
}

interface ProviderUsageWindow {
  startedAt: number;
  operations: number;
  costUnits: number;
  storedBytes: number;
  unpricedOperations: number;
  inFlight: number;
}

interface Reservation {
  providerId: string;
  operation: MemoryProviderOperation;
  startedAt: number;
  estimate: MemoryProviderOperationEstimate;
  complete(outcome: 'succeeded' | 'failed', error?: unknown): void;
}

/**
 * Bounded, content-free Provider telemetry with quota admission and SLO evaluation.
 * Samples retain only operation metadata; requests, responses, scopes and content are never stored.
 */
export class MemoryProviderTelemetry {
  private readonly samples = new Map<string, MemoryProviderMetricSample[]>();
  private readonly usage = new Map<string, ProviderUsageWindow>();
  private readonly now: () => Date;

  constructor(private readonly options: MemoryProviderTelemetryOptions) {
    validatePolicy(options.defaultPolicy);
    for (const policy of Object.values(options.providerPolicies ?? {})) validatePolicy(policy);
    this.now = options.now ?? (() => new Date());
  }

  begin(
    providerId: string,
    operation: MemoryProviderOperation,
    estimate: MemoryProviderOperationEstimate = {}
  ): Reservation {
    validateEstimate(estimate);
    const startedAt = this.now().getTime();
    const policy = this.policy(providerId);
    const usage = this.currentUsage(providerId, policy, startedAt);
    const quotaCounted = operation !== 'health';
    const quotaReason = quotaCounted ? rejectedQuota(policy, usage, estimate) : undefined;
    if (quotaReason) {
      this.append(providerId, policy, {
        providerId,
        operation,
        outcome: 'quota_rejected',
        latencyMs: 0,
        occurredAt: new Date(startedAt).toISOString(),
        costUnits: estimate.costUnits,
        storedBytesDelta: estimate.storedBytesDelta,
        errorCode: 'MEMORY_PROVIDER_QUOTA_EXCEEDED',
      });
      throw memoryError(
        'MEMORY_PROVIDER_UNAVAILABLE',
        `Memory provider ${providerId} rejected ${operation} because ${quotaReason} was exhausted.`,
        false,
        { providerId, operation, quotaReason }
      );
    }
    usage.inFlight += 1;
    if (quotaCounted) {
      usage.operations += 1;
      if (estimate.costUnits === undefined) usage.unpricedOperations += 1;
      else usage.costUnits += estimate.costUnits;
    }

    let completed = false;
    return {
      providerId,
      operation,
      startedAt,
      estimate,
      complete: (outcome, error) => {
        if (completed) return;
        completed = true;
        usage.inFlight = Math.max(0, usage.inFlight - 1);
        if (quotaCounted && outcome === 'succeeded') {
          usage.storedBytes = Math.max(0, usage.storedBytes + (estimate.storedBytesDelta ?? 0));
        }
        const failure = error === undefined ? undefined : normalizeMemoryError(error);
        const endedAt = this.now().getTime();
        this.append(providerId, policy, {
          providerId,
          operation,
          outcome,
          latencyMs: Math.max(0, endedAt - startedAt),
          occurredAt: new Date(endedAt).toISOString(),
          costUnits: estimate.costUnits,
          storedBytesDelta: outcome === 'succeeded' ? estimate.storedBytesDelta : undefined,
          errorCode: failure?.code,
        });
      },
    };
  }

  snapshot(providerId: string): MemoryProviderOperationalReport {
    const endedAt = this.now().getTime();
    const policy = this.policy(providerId);
    const usage = this.currentUsage(providerId, policy, endedAt);
    this.prune(providerId, policy, endedAt);
    const samples = this.samples.get(providerId) ?? [];
    const succeeded = samples.filter((sample) => sample.outcome === 'succeeded').length;
    const failed = samples.filter((sample) => sample.outcome === 'failed').length;
    const quotaRejected = samples.filter((sample) => sample.outcome === 'quota_rejected').length;
    const completed = succeeded + failed + quotaRejected;
    const latencies = samples
      .filter((sample) => sample.outcome !== 'quota_rejected')
      .map((sample) => sample.latencyMs)
      .sort((left, right) => left - right);
    const byOperation: Partial<Record<MemoryProviderOperation, number>> = {};
    for (const sample of samples)
      byOperation[sample.operation] = (byOperation[sample.operation] ?? 0) + 1;
    const availability = completed === 0 ? null : succeeded / completed;
    const latencyP95 = percentile(latencies, 0.95);
    const minimumOperations = policy.slo?.minimumOperations ?? 1;
    const reasons: string[] = [];
    if (
      policy.slo?.availabilityTarget !== undefined &&
      availability !== null &&
      availability < policy.slo.availabilityTarget
    ) {
      reasons.push('availability_below_target');
    }
    if (
      policy.slo?.latencyP95Ms !== undefined &&
      latencyP95 !== null &&
      latencyP95 > policy.slo.latencyP95Ms
    ) {
      reasons.push('latency_p95_above_target');
    }
    const sufficient = completed >= minimumOperations;
    return {
      providerId,
      window: {
        startedAt: new Date(endedAt - policy.windowMs).toISOString(),
        endedAt: new Date(endedAt).toISOString(),
        durationMs: policy.windowMs,
      },
      operations: {
        total: completed,
        succeeded,
        failed,
        quotaRejected,
        inFlight: usage.inFlight,
        byOperation,
      },
      availability,
      latencyMs: {
        p50: percentile(latencies, 0.5),
        p95: latencyP95,
        p99: percentile(latencies, 0.99),
        max: latencies.length ? latencies[latencies.length - 1] : null,
      },
      cost: {
        measuredUnits: usage.costUnits,
        unpricedOperations: usage.unpricedOperations,
        complete: usage.unpricedOperations === 0,
      },
      storage: { measuredBytes: usage.storedBytes },
      quota: {
        maxOperations: policy.quota?.maxOperations,
        remainingOperations: remaining(policy.quota?.maxOperations, usage.operations),
        maxCostUnits: policy.quota?.maxCostUnits,
        remainingCostUnits: remaining(policy.quota?.maxCostUnits, usage.costUnits),
        maxStoredBytes: policy.quota?.maxStoredBytes,
        remainingStoredBytes: remaining(policy.quota?.maxStoredBytes, usage.storedBytes),
      },
      slo: {
        status: sufficient ? (reasons.length ? 'breached' : 'met') : 'insufficient_data',
        reasons: sufficient ? reasons : ['minimum_operations_not_met'],
        minimumOperations,
        availabilityTarget: policy.slo?.availabilityTarget,
        latencyP95Ms: policy.slo?.latencyP95Ms,
      },
    };
  }

  private policy(providerId: string): MemoryProviderTelemetryPolicy {
    return this.options.providerPolicies?.[providerId] ?? this.options.defaultPolicy;
  }

  private currentUsage(
    providerId: string,
    policy: MemoryProviderTelemetryPolicy,
    now: number
  ): ProviderUsageWindow {
    let usage = this.usage.get(providerId);
    if (!usage || now - usage.startedAt >= policy.windowMs) {
      usage = {
        startedAt: now,
        operations: 0,
        costUnits: 0,
        storedBytes: usage?.storedBytes ?? 0,
        unpricedOperations: 0,
        inFlight: usage?.inFlight ?? 0,
      };
      this.usage.set(providerId, usage);
    }
    return usage;
  }

  private append(
    providerId: string,
    policy: MemoryProviderTelemetryPolicy,
    sample: MemoryProviderMetricSample
  ): void {
    const values = this.samples.get(providerId) ?? [];
    values.push(sample);
    const maxSamples = policy.maxSamples ?? 10_000;
    if (values.length > maxSamples) values.splice(0, values.length - maxSamples);
    this.samples.set(providerId, values);
    this.prune(providerId, policy, new Date(sample.occurredAt).getTime());
  }

  private prune(providerId: string, policy: MemoryProviderTelemetryPolicy, now: number): void {
    const values = this.samples.get(providerId);
    if (!values) return;
    const earliest = now - policy.windowMs;
    this.samples.set(
      providerId,
      values.filter((sample) => new Date(sample.occurredAt).getTime() >= earliest)
    );
  }
}

export interface ObservedMemoryManagementProviderOptions {
  provider: MemoryManagementProvider;
  telemetry: MemoryProviderTelemetry;
  estimate?: MemoryProviderCostEstimator;
}

/** Provider decorator that instruments every canonical operation without changing Provider APIs. */
export class ObservedMemoryManagementProvider implements MemoryManagementProvider {
  readonly id: string;

  constructor(private readonly options: ObservedMemoryManagementProviderOptions) {
    this.id = options.provider.id;
  }

  capabilities() {
    return this.options.provider.capabilities();
  }

  add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult> {
    return this.observe('add', request, () => this.options.provider.add(request, signal));
  }

  search(
    request: ManagedMemorySearchRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemorySearchResult[]> {
    return this.observe('search', request, () => this.options.provider.search(request, signal));
  }

  get(request: MemoryGetRequest, signal?: AbortSignal) {
    return this.observe('get', request, () => this.options.provider.get(request, signal));
  }

  list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult> {
    return this.observe('list', request, () => this.options.provider.list(request, signal));
  }

  update(
    request: ManagedMemoryUpdateRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryWriteResult> {
    return this.observe('update', request, () => this.options.provider.update(request, signal));
  }

  delete(
    request: ManagedMemoryDeleteRequest,
    signal?: AbortSignal
  ): Promise<ManagedMemoryDeleteResult> {
    return this.observe('delete', request, () => this.options.provider.delete(request, signal));
  }

  history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]> {
    return this.observe('history', request, () => {
      if (!this.options.provider.history) {
        throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Provider history is not installed.');
      }
      return this.options.provider.history(request, signal);
    });
  }

  health(): Promise<ProviderHealth> {
    return this.observe('health', undefined, () => this.options.provider.health());
  }

  async close(): Promise<void> {
    await this.options.provider.close?.();
  }

  private async observe<T>(
    operation: MemoryProviderOperation,
    request: unknown,
    execute: () => Promise<T>
  ): Promise<T> {
    const reservation = this.options.telemetry.begin(
      this.id,
      operation,
      this.options.estimate?.(operation, request)
    );
    try {
      const result = await execute();
      reservation.complete('succeeded');
      return result;
    } catch (error) {
      reservation.complete('failed', error);
      throw error;
    }
  }
}

function rejectedQuota(
  policy: MemoryProviderTelemetryPolicy,
  usage: ProviderUsageWindow,
  estimate: MemoryProviderOperationEstimate
): 'operation_quota' | 'cost_quota' | 'storage_quota' | undefined {
  if (
    policy.quota?.maxOperations !== undefined &&
    usage.operations + 1 > policy.quota.maxOperations
  ) {
    return 'operation_quota';
  }
  if (
    policy.quota?.maxCostUnits !== undefined &&
    estimate.costUnits !== undefined &&
    usage.costUnits + estimate.costUnits > policy.quota.maxCostUnits
  ) {
    return 'cost_quota';
  }
  if (
    policy.quota?.maxStoredBytes !== undefined &&
    usage.storedBytes + Math.max(0, estimate.storedBytesDelta ?? 0) > policy.quota.maxStoredBytes
  ) {
    return 'storage_quota';
  }
  return undefined;
}

function validatePolicy(policy: MemoryProviderTelemetryPolicy): void {
  if (!Number.isFinite(policy.windowMs) || policy.windowMs <= 0) {
    throw new Error('Telemetry windowMs must be positive.');
  }
  if (
    policy.maxSamples !== undefined &&
    (!Number.isInteger(policy.maxSamples) || policy.maxSamples <= 0)
  ) {
    throw new Error('Telemetry maxSamples must be a positive integer.');
  }
  const availability = policy.slo?.availabilityTarget;
  if (availability !== undefined && (availability < 0 || availability > 1)) {
    throw new Error('SLO availabilityTarget must be between 0 and 1.');
  }
}

function validateEstimate(estimate: MemoryProviderOperationEstimate): void {
  for (const [key, value] of Object.entries(estimate)) {
    if (
      value !== undefined &&
      (!Number.isFinite(value) || value < 0) &&
      key !== 'storedBytesDelta'
    ) {
      throw new Error(`Provider estimate ${key} must be a non-negative finite number.`);
    }
    if (key === 'storedBytesDelta' && value !== undefined && !Number.isFinite(value)) {
      throw new Error('Provider estimate storedBytesDelta must be finite.');
    }
  }
}

function percentile(values: number[], fraction: number): number | null {
  if (!values.length) return null;
  const index = Math.max(0, Math.ceil(values.length * fraction) - 1);
  return values[index];
}

function remaining(limit: number | undefined, used: number): number | undefined {
  return limit === undefined ? undefined : Math.max(0, limit - used);
}
