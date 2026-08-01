import { describe, expect, it } from 'vitest';
import {
  MemoryOperationalMetrics,
  sanitizeMemoryOperationalValue,
} from './memory-operational-metrics';

describe('Memory operational metrics and redaction', () => {
  it('covers latency, retry, reconcile, lease contention, DLQ, cache bypass and scope rejection', () => {
    const metrics = new MemoryOperationalMetrics(20);
    metrics.record('latency_ms', 25, { providerId: 'provider:test', operation: 'search' });
    metrics.record('latency_ms', 100, { providerId: 'provider:test', operation: 'update' });
    metrics.observeIndexEvent({
      type: 'memory.index.started',
      operationId: 'operation:secret',
      outboxId: 'outbox:secret',
      memoryId: 'memory:secret',
      memoryVersionId: 'memory:secret:v1',
      scopeHash: 'scope:secret',
    });
    metrics.observeIndexEvent({
      type: 'memory.index.partial',
      operationId: 'operation:secret',
      outboxId: 'outbox:secret',
      memoryId: 'memory:secret',
      memoryVersionId: 'memory:secret:v1',
      scopeHash: 'scope:secret',
      error: { code: 'MEMORY_REVISION_CONFLICT', message: 'raw provider payload', retryable: true },
    });
    metrics.observeLifecycleEvent({
      type: 'memory.worker.dead_lettered',
      workerType: 'retention',
      taskId: 'task:secret',
      error: { code: 'MEMORY_INDEX_FAILED', message: 'raw memory', retryable: false },
    });
    metrics.observeCacheEvent({
      type: 'memory.cache.bypass',
      providerId: 'provider:test',
      scopeHash: 'scope:secret',
      reason: 'scope_incomplete',
    });

    const snapshot = metrics.snapshot();
    expect(snapshot).toMatchObject({
      counters: {
        retry: 1,
        reconcile: 1,
        lease_contention: 1,
        dlq: 1,
        cache_bypass: 1,
        scope_rejection: 1,
      },
      latencyMs: { count: 2, p50: 25, p95: 100, max: 100 },
    });
    const serialized = JSON.stringify(snapshot);
    for (const forbidden of [
      'operation:secret',
      'outbox:secret',
      'memory:secret',
      'scope:secret',
      'raw provider payload',
      'raw memory',
    ]) {
      expect(serialized).not.toContain(forbidden);
    }
  });

  it('redacts secrets, raw Memory, Provider payloads and host paths recursively', () => {
    const sanitized = sanitizeMemoryOperationalValue({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      apiKey: 'sk-super-secret-key',
      authorization: 'Bearer abc.def.ghi',
      rawMemory: 'the user private memory',
      providerPayload: { content: 'provider raw response' },
      nested: {
        message:
          'failed at C:\\Users\\operator\\Hypha\\memory.json and /home/operator/hypha/data.json using Bearer live-token',
      },
    });
    const serialized = JSON.stringify(sanitized);

    expect(serialized).toContain('MEMORY_PROVIDER_UNAVAILABLE');
    expect(serialized).toContain('[REDACTED_SECRET]');
    expect(serialized).toContain('[REDACTED_CONTENT]');
    expect(serialized).toContain('[REDACTED_PATH]');
    for (const forbidden of [
      'super-secret-key',
      'abc.def.ghi',
      'private memory',
      'provider raw response',
      'operator\\\\Hypha',
      '/home/operator',
      'live-token',
    ]) {
      expect(serialized).not.toContain(forbidden);
    }
  });

  it('bounds retained metric samples instead of growing open-ended state', () => {
    const metrics = new MemoryOperationalMetrics(2);
    metrics.record('retry', 1, { workerType: 'first' });
    metrics.record('retry', 1, { workerType: 'second' });
    metrics.record('dlq', 1, { workerType: 'third' });

    expect(metrics.snapshot()).toMatchObject({
      counters: { retry: 1, dlq: 1 },
      samples: [
        { kind: 'retry', labels: { workerType: 'second' } },
        { kind: 'dlq', labels: { workerType: 'third' } },
      ],
    });
  });
});
