import { describe, expect, it } from 'vitest';
import type { DockerCliResult } from './docker-cli-transport';
import { DockerResourceAccountant } from './docker-resource-accounting';

describe('DockerResourceAccountant', () => {
  it('combines raw output bytes with Docker-observed resource evidence', () => {
    expect(
      new DockerResourceAccountant().account(command(), {
        memoryBytes: 4_096,
        cpuPercent: 12.5,
        processCount: 3,
        blockReadBytes: 128,
        blockWriteBytes: 64,
      })
    ).toEqual({
      usage: {
        outputBytes: 8,
        peakMemoryBytes: 4_096,
        processCountPeak: 3,
        readBytes: 128,
        writtenBytes: 64,
      },
      metadata: {
        accountingMode: 'docker_stats_snapshot',
        metricsCollected: true,
        cpuPercentage: 12.5,
        observedStdoutBytes: 5,
        observedStderrBytes: 3,
      },
    });
  });

  it('reports output-only evidence without inventing unavailable Docker metrics', () => {
    const value = command();
    value.outputLimitStream = 'combined';

    expect(new DockerResourceAccountant().account(value)).toEqual({
      usage: { outputBytes: 8 },
      metadata: {
        accountingMode: 'docker_output_only',
        metricsCollected: false,
        observedStdoutBytes: 5,
        observedStderrBytes: 3,
        outputLimitStream: 'combined',
      },
    });
  });
});

function command(): DockerCliResult {
  return {
    outcome: 'exited',
    exitCode: 0,
    stdout: 'hello',
    stderr: 'err',
    observedStdoutBytes: 5,
    observedStderrBytes: 3,
    startedAt: '2026-07-18T00:00:00.000Z',
    completedAt: '2026-07-18T00:00:01.000Z',
    latencyMs: 1_000,
    terminationMechanism: 'posix_process_group',
    processTreeTerminationVerified: false,
  };
}
