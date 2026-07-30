import { describe, expect, it } from 'vitest';
import type {
  DockerCliRequest,
  DockerCliResult,
  DockerCommandTransport,
} from './docker-cli-transport';
import {
  DockerStatsResourceAccounting,
  parseDockerByteQuantity,
  parseDockerResourceSnapshot,
} from './docker-resource-accounting';

describe('DockerStatsResourceAccounting', () => {
  it('collects one bounded snapshot and parses all controlled resource evidence', async () => {
    const transport = new RecordingTransport(
      result(
        JSON.stringify({
          CPUPerc: '125.5%',
          MemUsage: '1.5MiB / 128MiB',
          MemPerc: '1.17%',
          PIDs: '4',
          BlockIO: '2kB / 3KiB',
        })
      )
    );
    const signal = new AbortController().signal;

    await expect(
      new DockerStatsResourceAccounting(transport).snapshot('container123', signal)
    ).resolves.toEqual({
      containerReference: 'container123',
      cpuPercent: 125.5,
      memoryUsageBytes: 1_572_864,
      memoryLimitBytes: 134_217_728,
      memoryPercent: 1.17,
      processCount: 4,
      blockReadBytes: 2_000,
      blockWriteBytes: 3_072,
    });

    expect(transport.requests).toEqual([
      {
        args: ['stats', '--no-stream', '--format', '{{json .}}', 'container123'],
        timeoutMs: 10_000,
        maxStdoutBytes: 262_144,
        maxStderrBytes: 262_144,
        maxCombinedOutputBytes: 262_144,
        signal,
      },
    ]);
  });

  it.each([
    ['0B', 0],
    ['1kB', 1_000],
    ['1KiB', 1_024],
    ['1.5MB', 1_500_000],
    ['1.5MiB', 1_572_864],
    ['2GB', 2_000_000_000],
    ['2GiB', 2_147_483_648],
    ['1TB', 1_000_000_000_000],
    ['1TiB', 1_099_511_627_776],
  ])('parses Docker byte quantity %s', (value, expected) => {
    expect(parseDockerByteQuantity(value, 'Docker byte quantity')).toBe(expected);
  });

  it.each([
    ['invalid container reference', '--help', new AbortController().signal, TypeError],
    ['invalid AbortSignal', 'container123', {}, TypeError],
  ])('rejects %s before invoking Docker', async (_name, reference, signal, errorType) => {
    const transport = new RecordingTransport(result(validStats()));

    await expect(
      new DockerStatsResourceAccounting(transport).snapshot(reference, signal as AbortSignal)
    ).rejects.toBeInstanceOf(errorType);
    expect(transport.requests).toHaveLength(0);
  });

  it.each([
    ['non-zero exit', result('', 'private stderr', 7)],
    ['timeout', result('', 'private stderr', null, 'timed_out')],
    ['cancellation', result('', 'private stderr', null, 'cancelled')],
    ['output limit', result('', 'private stderr', null, 'output_limit')],
  ])('normalizes %s without exposing command output', async (_name, transportResult) => {
    const operation = new DockerStatsResourceAccounting(
      new RecordingTransport(transportResult)
    ).snapshot('container123', new AbortController().signal);

    await expect(operation).rejects.toMatchObject({
      code: 'DOCKER_COMMAND_FAILED',
      command: 'stats',
      evidence: {
        outcome: transportResult.outcome,
        exitCode: transportResult.exitCode,
      },
    });
    await expect(operation).rejects.not.toThrow(/private stderr/);
  });

  it.each([
    ['invalid JSON', '{'],
    ['array response', '[]'],
    ['null response', 'null'],
  ])('fails closed for %s', (_name, value) => {
    expect(() => parseDockerResourceSnapshot(value)).toThrowError(
      expect.objectContaining({
        code: 'DOCKER_INVALID_RESPONSE',
        command: 'stats',
      })
    );
  });

  it.each([
    ['missing CPU', { CPUPerc: undefined }],
    ['negative CPU', { CPUPerc: '-1%' }],
    ['invalid CPU', { CPUPerc: 'NaN%' }],
    ['missing memory usage', { MemUsage: undefined }],
    ['malformed memory pair', { MemUsage: '1MiB' }],
    ['extra memory pair', { MemUsage: '1MiB / 2MiB / 3MiB' }],
    ['negative memory', { MemUsage: '-1MiB / 2MiB' }],
    ['unknown memory unit', { MemUsage: '1XB / 2MiB' }],
    ['missing memory percentage', { MemPerc: undefined }],
    ['negative memory percentage', { MemPerc: '-1%' }],
    ['missing process count', { PIDs: undefined }],
    ['fractional process count', { PIDs: '1.5' }],
    ['overflowing process count', { PIDs: '9007199254740992' }],
    ['missing block I/O', { BlockIO: undefined }],
    ['malformed block I/O pair', { BlockIO: '1kB' }],
    ['overflowing block I/O', { BlockIO: '9007199254740992TiB / 0B' }],
  ])('rejects invalid stats evidence: %s', (_name, override) => {
    expect(() => parseDockerResourceSnapshot(validStats(override))).toThrowError(
      expect.objectContaining({
        code: 'DOCKER_INVALID_RESPONSE',
        command: 'stats',
      })
    );
  });
});

function validStats(overrides: Record<string, unknown> = {}): string {
  return JSON.stringify({
    CPUPerc: '0.5%',
    MemUsage: '1MiB / 128MiB',
    MemPerc: '0.78%',
    PIDs: '2',
    BlockIO: '0B / 0B',
    ...overrides,
  });
}

class RecordingTransport implements DockerCommandTransport {
  readonly requests: DockerCliRequest[] = [];

  constructor(private readonly transportResult: DockerCliResult) {}

  async run(request: DockerCliRequest): Promise<DockerCliResult> {
    this.requests.push(request);
    return this.transportResult;
  }
}

function result(
  stdout: string,
  stderr = '',
  exitCode: number | null = 0,
  outcome: DockerCliResult['outcome'] = 'exited'
): DockerCliResult {
  return {
    outcome,
    exitCode,
    stdout,
    stderr,
    observedStdoutBytes: Buffer.byteLength(stdout),
    observedStderrBytes: Buffer.byteLength(stderr),
    startedAt: '2026-07-27T00:00:00.000Z',
    completedAt: '2026-07-27T00:00:00.001Z',
    latencyMs: 1,
    terminationMechanism: 'posix_process_group',
    processTreeTerminationVerified: true,
  };
}
