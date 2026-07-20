import { describe, expect, it } from 'vitest';
import {
  DockerCliTransport,
  type DockerCliRequest,
  type DockerCliResult,
} from './docker-cli-transport';
import type { LocalProcessRunRequest, LocalProcessRunResult } from './local-process-supervisor';

describe('DockerCliTransport', () => {
  it('maps a request to an isolated supervised process without mutating argv', async () => {
    const supervisor = new RecordingSupervisor();
    const signal = new AbortController().signal;
    const args = ['version', '--format', '{{json .}}'];
    const transport = new DockerCliTransport({
      dockerPath: '/opt/docker',
      workingDirectory: '/workspace',
      gracefulTerminationMs: 25,
      supervisor,
    });

    await transport.run(
      request(args, {
        stdin: new Uint8Array([1, 2, 3]),
        idleTimeoutMs: 50,
        signal,
      })
    );

    expect(supervisor.calls).toEqual([
      expect.objectContaining({
        executable: '/opt/docker',
        args,
        cwd: '/workspace',
        environment: {},
        stdin: new Uint8Array([1, 2, 3]),
        idleTimeoutMs: 50,
        gracefulTerminationMs: 25,
        signal,
      }),
    ]);
    expect(supervisor.calls[0].args).not.toBe(args);
  });

  it('passes arguments and stdin without shell interpretation', async () => {
    const literal = 'value;echo should-not-run && exit 9';
    const script = [
      "let input = '';",
      "process.stdin.setEncoding('utf8');",
      "process.stdin.on('data', (chunk) => { input += chunk; });",
      "process.stdin.on('end', () => {",
      "  process.stdout.write(process.argv[1] + '|' + input);",
      "  process.stderr.write('stderr-evidence');",
      '});',
    ].join('\n');
    const transport = new DockerCliTransport({
      dockerPath: process.execPath,
      gracefulTerminationMs: 0,
    });

    const result = await transport.run(
      request(['-e', script, literal], { stdin: 'stdin-evidence' })
    );

    expect(result).toMatchObject({
      outcome: 'exited',
      exitCode: 0,
      stdout: `${literal}|stdin-evidence`,
      stderr: 'stderr-evidence',
      observedStdoutBytes: Buffer.byteLength(`${literal}|stdin-evidence`),
      observedStderrBytes: Buffer.byteLength('stderr-evidence'),
    });
  });

  it('preserves bounded-output and termination evidence from the supervisor', async () => {
    const supervisor = new RecordingSupervisor({
      outcome: 'output_limit',
      exitCode: null,
      stdout: 'safe',
      observedStdoutBytes: 128,
      outputLimitStream: 'stdout',
      processTreeTerminationVerified: true,
    });

    const result = await new DockerCliTransport({ supervisor }).run(request(['version']));

    expect(result).toMatchObject({
      outcome: 'output_limit',
      stdout: 'safe',
      observedStdoutBytes: 128,
      outputLimitStream: 'stdout',
      processTreeTerminationVerified: true,
    });
  });

  it('normalizes process-start failure evidence without exposing an Error object', async () => {
    const error = Object.assign(new Error('docker executable was not found'), { code: 'ENOENT' });
    const supervisor = new RecordingSupervisor({
      outcome: 'start_failed',
      exitCode: null,
      startError: error,
    });

    const result = await new DockerCliTransport({ supervisor }).run(request(['version']));

    expect(result).toMatchObject({
      outcome: 'start_failed',
      startErrorCode: 'ENOENT',
      startErrorMessage: 'docker executable was not found',
    });
    expect(result).not.toHaveProperty('startError');
  });

  it.each([
    ['non-object request', null, 'request must be an object'],
    ['empty argv', { args: [] }, 'args must be a non-empty array'],
    ['non-array argv', { args: 'version' }, 'args must be a non-empty array'],
    ['non-string argv', { args: ['version', 1] }, 'args must contain only strings'],
    ['NUL argv', { args: ['version\u0000--format'] }, 'args must contain no NUL bytes'],
    ['zero timeout', { timeoutMs: 0 }, 'timeoutMs must be a positive integer'],
    ['zero idle timeout', { idleTimeoutMs: 0 }, 'idleTimeoutMs must be a positive integer'],
    [
      'fractional output limit',
      { maxStdoutBytes: 1.5 },
      'maxStdoutBytes must be a positive integer',
    ],
    ['invalid stdin', { stdin: 42 }, 'stdin must be a string or Uint8Array'],
    ['invalid signal', { signal: {} }, 'signal must be an AbortSignal'],
  ])('rejects invalid request boundary: %s', async (_name, overrides, message) => {
    const candidate =
      overrides === null ? null : request(['version'], overrides as Partial<DockerCliRequest>);
    await expect(
      new DockerCliTransport().run(candidate as unknown as DockerCliRequest)
    ).rejects.toThrow(message);
  });

  it.each([
    ['empty docker path', { dockerPath: ' ' }, 'dockerPath must be a non-empty string'],
    [
      'NUL docker path',
      { dockerPath: 'docker\u0000.exe' },
      'dockerPath must be a non-empty string',
    ],
    [
      'empty working directory',
      { workingDirectory: '' },
      'workingDirectory must be a non-empty string',
    ],
    [
      'negative termination grace',
      { gracefulTerminationMs: -1 },
      'gracefulTerminationMs must be a non-negative integer',
    ],
  ])('rejects invalid transport configuration: %s', (_name, options, message) => {
    expect(() => new DockerCliTransport(options)).toThrow(message);
  });
});

class RecordingSupervisor {
  readonly calls: LocalProcessRunRequest[] = [];

  constructor(private readonly result: Partial<LocalProcessRunResult> = {}) {}

  async run(request: LocalProcessRunRequest): Promise<LocalProcessRunResult> {
    this.calls.push(request);
    return processResult(this.result);
  }
}

function request(args: string[], overrides: Partial<DockerCliRequest> = {}): DockerCliRequest {
  return {
    args,
    timeoutMs: 2_000,
    maxStdoutBytes: 1_024,
    maxStderrBytes: 1_024,
    maxCombinedOutputBytes: 2_048,
    signal: new AbortController().signal,
    ...overrides,
  };
}

function processResult(overrides: Partial<LocalProcessRunResult>): LocalProcessRunResult {
  return {
    outcome: 'exited',
    exitCode: 0,
    stdout: '',
    stderr: '',
    observedStdoutBytes: 0,
    observedStderrBytes: 0,
    startedAt: '2026-07-20T00:00:00.000Z',
    completedAt: '2026-07-20T00:00:00.001Z',
    latencyMs: 1,
    terminationMechanism: 'posix_process_group',
    processTreeTerminationVerified: false,
    ...overrides,
  };
}
