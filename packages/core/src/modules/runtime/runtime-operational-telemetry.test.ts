import { describe, expect, it, vi } from 'vitest';
import { InMemoryTelemetryRecorder } from '../../telemetry';
import {
  RUNTIME_OPERATIONAL_METRIC_NAMES,
  RuntimeOperationalTelemetry,
} from './runtime-operational-telemetry';

describe('RuntimeOperationalTelemetry', () => {
  it('records stable quarantine, continuation, lease, and no-progress metrics', async () => {
    const recorder = new InMemoryTelemetryRecorder();
    const telemetry = new RuntimeOperationalTelemetry({
      recorder,
      now: () => '2026-07-24T06:00:00.000Z',
    });

    await telemetry.recordQuarantine({
      source: 'continuation_reconciler',
      reason: 'checkpoint_missing',
    });
    await telemetry.recordContinuationLatency({
      suspendedAt: '2026-07-24T05:59:58.500Z',
      resumedAt: '2026-07-24T06:00:00.000Z',
      outcome: 'resumed',
    });
    await telemetry.recordLeaseRenewal({
      resource: 'session_command',
      durationMs: 12.5,
      outcome: 'succeeded',
    });
    await telemetry.recordNoProgressFingerprint({
      consecutiveNoProgress: 2,
      source: 'react_checkpoint',
    });

    expect(recorder.sum(RUNTIME_OPERATIONAL_METRIC_NAMES.quarantineTotal)).toBe(1);
    expect(recorder.list(RUNTIME_OPERATIONAL_METRIC_NAMES.continuationLatencyMs)[0]).toMatchObject({
      value: 1_500,
      attributes: { outcome: 'resumed' },
    });
    expect(recorder.list(RUNTIME_OPERATIONAL_METRIC_NAMES.leaseRenewalLatencyMs)[0]).toMatchObject({
      value: 12.5,
      attributes: { resource: 'session_command', outcome: 'succeeded' },
    });
    expect(recorder.list(RUNTIME_OPERATIONAL_METRIC_NAMES.noProgressConsecutive)[0]).toMatchObject({
      value: 2,
      attributes: { source: 'react_checkpoint' },
    });
    expect(JSON.stringify(recorder.list())).not.toContain('sha256:');
  });

  it('does not allow recorder failures to change Runtime behavior', async () => {
    const telemetry = new RuntimeOperationalTelemetry({
      recorder: { recordMetric: vi.fn(async () => Promise.reject(new Error('offline'))) },
    });

    await expect(
      telemetry.recordLeaseRenewal({
        resource: 'session_command',
        durationMs: 1,
        outcome: 'failed',
      })
    ).resolves.toBeUndefined();
  });

  it('rejects invalid metric input before it reaches the recorder', async () => {
    const recorder = new InMemoryTelemetryRecorder();
    const telemetry = new RuntimeOperationalTelemetry({ recorder });

    await expect(
      telemetry.recordContinuationLatency({
        suspendedAt: '2026-07-24T06:00:01.000Z',
        resumedAt: '2026-07-24T06:00:00.000Z',
        outcome: 'resumed',
      })
    ).rejects.toThrow('valid and monotonic');
    expect(recorder.list()).toHaveLength(0);
  });
});
