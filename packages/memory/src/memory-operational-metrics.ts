import type { IndexOutboxWorkerEvent } from './index-outbox';
import type { MemoryLifecycleWorkerEvent } from './lifecycle-workers';
import type { MemorySearchCacheEvent } from './managed-search-cache';
import { sha256 } from './memory-utils';

export type MemoryOperationalMetricKind =
  | 'latency_ms'
  | 'retry'
  | 'reconcile'
  | 'lease_contention'
  | 'dlq'
  | 'cache_bypass'
  | 'scope_rejection';

export interface MemoryOperationalMetricLabels {
  providerId?: string;
  operation?: string;
  workerType?: string;
  reason?: string;
  errorCode?: string;
}

export interface MemoryOperationalMetricSample {
  kind: MemoryOperationalMetricKind;
  value: number;
  labels: MemoryOperationalMetricLabels;
}

export interface MemoryOperationalMetricsSnapshot {
  counters: Partial<Record<Exclude<MemoryOperationalMetricKind, 'latency_ms'>, number>>;
  latencyMs: { count: number; p50: number | null; p95: number | null; max: number | null };
  samples: MemoryOperationalMetricSample[];
}

/**
 * Bounded operational metrics that deliberately exclude scope, Memory content,
 * Provider payloads, credentials and host paths from metric labels.
 */
export class MemoryOperationalMetrics {
  private readonly samples: MemoryOperationalMetricSample[] = [];

  constructor(private readonly maxSamples = 10_000) {
    if (!Number.isInteger(maxSamples) || maxSamples <= 0) {
      throw new TypeError('Memory operational metric maxSamples must be a positive integer.');
    }
  }

  record(
    kind: MemoryOperationalMetricKind,
    value = 1,
    labels: MemoryOperationalMetricLabels = {}
  ): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new TypeError('Memory operational metric value must be finite and non-negative.');
    }
    this.samples.push({ kind, value, labels: sanitizeMetricLabels(labels) });
    if (this.samples.length > this.maxSamples) {
      this.samples.splice(0, this.samples.length - this.maxSamples);
    }
  }

  observeCacheEvent(event: MemorySearchCacheEvent): void {
    if (event.type !== 'memory.cache.bypass') return;
    this.record('cache_bypass', 1, {
      providerId: event.providerId,
      reason: event.reason,
    });
    if (event.reason === 'scope_incomplete') {
      this.record('scope_rejection', 1, {
        providerId: event.providerId,
        reason: event.reason,
      });
    }
  }

  observeIndexEvent(event: IndexOutboxWorkerEvent): void {
    if (event.type === 'memory.index.started') {
      this.record('reconcile', 1, { workerType: 'index' });
    } else if (event.type === 'memory.index.partial') {
      this.record('retry', 1, {
        workerType: 'index',
        errorCode: event.error?.code,
      });
    } else if (event.type === 'memory.index.failed') {
      this.record('dlq', 1, {
        workerType: 'index',
        errorCode: event.error?.code,
      });
    }
    if (isLeaseContention(event.error?.code)) {
      this.record('lease_contention', 1, {
        workerType: 'index',
        errorCode: event.error?.code,
      });
    }
  }

  observeLifecycleEvent(event: MemoryLifecycleWorkerEvent): void {
    if (event.type === 'memory.worker.started') {
      this.record('reconcile', 1, { workerType: event.workerType });
    } else if (event.type === 'memory.worker.failed') {
      this.record('retry', 1, {
        workerType: event.workerType,
        errorCode: event.error?.code,
      });
    } else if (event.type === 'memory.worker.dead_lettered') {
      this.record('dlq', 1, {
        workerType: event.workerType,
        errorCode: event.error?.code,
      });
    }
    if (isLeaseContention(event.error?.code)) {
      this.record('lease_contention', 1, {
        workerType: event.workerType,
        errorCode: event.error?.code,
      });
    }
  }

  snapshot(): MemoryOperationalMetricsSnapshot {
    const counters: MemoryOperationalMetricsSnapshot['counters'] = {};
    const latencies: number[] = [];
    for (const sample of this.samples) {
      if (sample.kind === 'latency_ms') latencies.push(sample.value);
      else counters[sample.kind] = (counters[sample.kind] ?? 0) + sample.value;
    }
    latencies.sort((left, right) => left - right);
    return {
      counters,
      latencyMs: {
        count: latencies.length,
        p50: percentile(latencies, 0.5),
        p95: percentile(latencies, 0.95),
        max: latencies.length ? latencies[latencies.length - 1]! : null,
      },
      samples: structuredClone(this.samples),
    };
  }
}

export interface MemoryOperationalRedactionPolicy {
  contentMode?: 'redact' | 'hash';
  hostPathMode?: 'redact' | 'basename';
  maxDepth?: number;
}

/** Produces log/evidence-safe data without mutating the supplied value. */
export function sanitizeMemoryOperationalValue(
  value: unknown,
  policy: MemoryOperationalRedactionPolicy = {}
): unknown {
  return sanitizeValue(value, policy, new WeakSet<object>(), 0);
}

function sanitizeValue(
  value: unknown,
  policy: MemoryOperationalRedactionPolicy,
  seen: WeakSet<object>,
  depth: number,
  key = ''
): unknown {
  if (depth > (policy.maxDepth ?? 12)) return '[REDACTED_DEPTH]';
  if (isSecretKey(key)) return '[REDACTED_SECRET]';
  if (isContentKey(key)) return redactContent(value, policy.contentMode ?? 'redact');
  if (typeof value === 'string') return sanitizeString(value, policy);
  if (value instanceof Error) {
    return {
      name: value.name,
      message: sanitizeString(value.message, policy),
    };
  }
  if (!value || typeof value !== 'object') return value;
  if (seen.has(value)) return '[REDACTED_CIRCULAR]';
  seen.add(value);
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item, policy, seen, depth + 1));
  }
  return Object.fromEntries(
    Object.entries(value).map(([nestedKey, nested]) => [
      nestedKey,
      sanitizeValue(nested, policy, seen, depth + 1, nestedKey),
    ])
  );
}

function sanitizeMetricLabels(
  labels: MemoryOperationalMetricLabels
): MemoryOperationalMetricLabels {
  return Object.fromEntries(
    Object.entries(labels)
      .filter(([, value]) => typeof value === 'string' && value.length > 0)
      .map(([key, value]) => [key, sanitizeString(String(value), {})])
  );
}

function sanitizeString(value: string, policy: MemoryOperationalRedactionPolicy): string {
  let sanitized = value
    .replace(/\bBearer\s+\S+/giu, 'Bearer [REDACTED_SECRET]')
    .replace(/\bsk-[A-Za-z0-9_-]{8,}\b/gu, '[REDACTED_SECRET]')
    .replace(/\\\\[^\\\s]+\\[^\s,;]+/gu, '[REDACTED_PATH]')
    .replace(/[A-Za-z]:\\[^\s,;]+/gu, '[REDACTED_PATH]')
    .replace(/\/(?:home|Users|var|tmp|opt|srv|workspace)\/[^\s,;]+/gu, '[REDACTED_PATH]');
  if (policy.hostPathMode === 'basename') {
    sanitized = sanitized.replace(/\[REDACTED_PATH\]/gu, '[HOST_PATH]');
  }
  return sanitized;
}

function redactContent(value: unknown, mode: 'redact' | 'hash'): string {
  return mode === 'hash' ? sha256(value) : '[REDACTED_CONTENT]';
}

function isSecretKey(key: string): boolean {
  return /(?:authorization|credential|password|secret|token|api.?key|private.?key)/iu.test(key);
}

function isContentKey(key: string): boolean {
  return /(?:raw.?memory|memory.?content|provider.?payload|payload|prompt|content|input|output)/iu.test(
    key
  );
}

function isLeaseContention(errorCode?: string): boolean {
  return (
    errorCode === 'MEMORY_LEASE_LOST' ||
    errorCode === 'MEMORY_REVISION_CONFLICT' ||
    errorCode === 'MEMORY_IDEMPOTENCY_CONFLICT'
  );
}

function percentile(values: number[], fraction: number): number | null {
  if (!values.length) return null;
  return values[Math.max(0, Math.ceil(values.length * fraction) - 1)]!;
}
