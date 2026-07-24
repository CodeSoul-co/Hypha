import type { TelemetryMetric, TelemetryRecorder } from '../../telemetry';

export const RUNTIME_OPERATIONAL_METRIC_NAMES = {
  quarantineTotal: 'hypha.runtime.quarantine.total',
  continuationLatencyMs: 'hypha.runtime.continuation.latency_ms',
  leaseRenewalLatencyMs: 'hypha.runtime.lease.renewal.latency_ms',
  leaseRenewalTotal: 'hypha.runtime.lease.renewal.total',
  noProgressFingerprintTotal: 'hypha.runtime.no_progress.fingerprint.total',
  noProgressConsecutive: 'hypha.runtime.no_progress.consecutive',
} as const;

export type RuntimeQuarantineSource = 'continuation_reconciler' | 'startup_integrity_audit';

export type RuntimeQuarantineReason =
  | 'checkpoint_missing'
  | 'checkpoint_identity_mismatch'
  | 'checkpoint_hash_mismatch'
  | 'command_without_valid_checkpoint'
  | 'canonical_stream_corrupt';

export type RuntimeLeaseResource = 'session_command' | 'run' | 'state_claim';

export interface RuntimeOperationalTelemetryOptions {
  recorder: TelemetryRecorder;
  now?: () => string;
}

/**
 * Stable, low-cardinality Runtime metrics. Run and fingerprint identities stay
 * in durable Events and checkpoints instead of becoming metric attributes.
 */
export class RuntimeOperationalTelemetry {
  private readonly now: () => string;

  constructor(private readonly options: RuntimeOperationalTelemetryOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async recordQuarantine(input: {
    source: RuntimeQuarantineSource;
    reason: RuntimeQuarantineReason;
  }): Promise<void> {
    await this.emit({
      name: RUNTIME_OPERATIONAL_METRIC_NAMES.quarantineTotal,
      kind: 'counter',
      value: 1,
      attributes: {
        source: input.source,
        reason: input.reason,
      },
    });
  }

  async recordContinuationLatency(input: {
    suspendedAt: string;
    resumedAt: string;
    outcome: 'resumed' | 'scheduled' | 'reused';
  }): Promise<void> {
    await this.emit({
      name: RUNTIME_OPERATIONAL_METRIC_NAMES.continuationLatencyMs,
      kind: 'histogram',
      value: elapsedMs(input.suspendedAt, input.resumedAt),
      attributes: { outcome: input.outcome },
    });
  }

  async recordLeaseRenewal(input: {
    resource: RuntimeLeaseResource;
    durationMs: number;
    outcome: 'succeeded' | 'failed';
  }): Promise<void> {
    const durationMs = nonNegativeFinite(input.durationMs, 'durationMs');
    await Promise.all([
      this.emit({
        name: RUNTIME_OPERATIONAL_METRIC_NAMES.leaseRenewalLatencyMs,
        kind: 'histogram',
        value: durationMs,
        attributes: { resource: input.resource, outcome: input.outcome },
      }),
      this.emit({
        name: RUNTIME_OPERATIONAL_METRIC_NAMES.leaseRenewalTotal,
        kind: 'counter',
        value: 1,
        attributes: { resource: input.resource, outcome: input.outcome },
      }),
    ]);
  }

  async recordNoProgressFingerprint(input: {
    consecutiveNoProgress: number;
    source: 'react_checkpoint' | 'recovery';
  }): Promise<void> {
    const consecutive = nonNegativeInteger(input.consecutiveNoProgress, 'consecutiveNoProgress');
    await Promise.all([
      this.emit({
        name: RUNTIME_OPERATIONAL_METRIC_NAMES.noProgressFingerprintTotal,
        kind: 'counter',
        value: 1,
        attributes: { source: input.source },
      }),
      this.emit({
        name: RUNTIME_OPERATIONAL_METRIC_NAMES.noProgressConsecutive,
        kind: 'gauge',
        value: consecutive,
        attributes: { source: input.source },
      }),
    ]);
  }

  private async emit(input: Omit<TelemetryMetric, 'recordedAt'>): Promise<void> {
    try {
      await this.options.recorder.recordMetric({
        ...input,
        recordedAt: validTimestamp(this.now()),
      });
    } catch {
      // Telemetry must never change Runtime execution semantics.
    }
  }
}

function elapsedMs(start: string, end: string): number {
  const startMs = Date.parse(start);
  const endMs = Date.parse(end);
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs < startMs) {
    throw new TypeError('Runtime telemetry timestamps must be valid and monotonic');
  }
  return endMs - startMs;
}

function validTimestamp(value: string): string {
  if (!Number.isFinite(Date.parse(value))) {
    throw new TypeError('Runtime telemetry recordedAt must be a valid timestamp');
  }
  return value;
}

function nonNegativeFinite(value: number, field: string): number {
  if (!Number.isFinite(value) || value < 0) {
    throw new TypeError(`${field} must be a non-negative finite number`);
  }
  return value;
}

function nonNegativeInteger(value: number, field: string): number {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${field} must be a non-negative integer`);
  }
  return value;
}
