import { describe, expect, it } from 'vitest';
import { LocalProcessResourceAccountant } from './local-process-resource-accounting';
import type { LocalProcessRunResult } from './local-process-supervisor';

describe('LocalProcessResourceAccountant', () => {
  it('reports observed values without claiming unavailable host metrics', () => {
    const result: LocalProcessRunResult = {
      outcome: 'exited',
      exitCode: 0,
      stdout: 'hello',
      stderr: 'err',
      observedStdoutBytes: 5,
      observedStderrBytes: 3,
      startedAt: '2026-07-17T00:00:00.000Z',
      completedAt: '2026-07-17T00:00:01.000Z',
      latencyMs: 1_000,
      terminationMechanism:
        process.platform === 'win32' ? 'windows_taskkill' : 'posix_process_group',
      processTreeTerminationVerified: process.platform !== 'win32',
    };

    expect(new LocalProcessResourceAccountant().account(result)).toEqual({
      usage: { outputBytes: 8, processCountPeak: 1 },
      metadata: {
        accountingMode: 'local_observed_output_only',
        cpuTimeAvailable: false,
        peakMemoryAvailable: false,
        terminationMechanism: result.terminationMechanism,
        processTreeTerminationVerified: result.processTreeTerminationVerified,
        observedStdoutBytes: 5,
        observedStderrBytes: 3,
      },
    });
  });
});
