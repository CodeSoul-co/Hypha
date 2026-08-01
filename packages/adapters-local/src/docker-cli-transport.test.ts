import { describe, expect, it } from 'vitest';
import { DockerCliTransport, type DockerCliRequest } from './docker-cli-transport';
import type {
  LocalProcessOutputEvent,
  LocalProcessRunRequest,
  LocalProcessRunResult,
} from './local-process-supervisor';

describe('DockerCliTransport', () => {
  it('maps requests to an environment-isolated supervised process without mutating argv', async () => {
    const supervisor = new RecordingSupervisor();
    const signal = new AbortController().signal;
    const args = ['version', '--format', '{{json .}}'];
    const onOutput = async (_event: LocalProcessOutputEvent): Promise<void> => undefined;
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
        onOutput,
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
        onOutput,
      }),
    ]);
    expect(supervisor.calls[0]?.args).not.toBe(args);
  });

  it('passes literal arguments and stdin without shell interpretation', async () => {
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
    const result = await new DockerCliTransport({
      dockerPath: process.execPath,
      gracefulTerminationMs: 0,
    }).run(request(['-e', script, literal], { stdin: 'stdin-evidence' }));

    expect(result).toMatchObject({
      outcome: 'exited',
      exitCode: 0,
      stdout: `${literal}|stdin-evidence`,
      stderr: 'stderr-evidence',
      observedStdoutBytes: Buffer.byteLength(`${literal}|stdin-evidence`),
      observedStderrBytes: Buffer.byteLength('stderr-evidence'),
    });
  });

  it('preserves bounded output and normalizes process errors into serializable evidence', async () => {
    const startError = Object.assign(new Error('docker executable was not found'), {
      code: 'ENOENT',
    });
    const terminationError = new Error('process tree termination failed');
    terminationError.name = 'TerminationError';
    const supervisor = new RecordingSupervisor({
      outcome: 'termination_failed',
      exitCode: null,
      stdout: 'safe',
      observedStdoutBytes: 128,
      outputLimitStream: 'stdout',
      startError,
      terminationError,
    });

    const result = await new DockerCliTransport({ supervisor }).run(request(['version']));

    expect(result).toMatchObject({
      outcome: 'termination_failed',
      stdout: 'safe',
      observedStdoutBytes: 128,
      outputLimitStream: 'stdout',
      startErrorCode: 'ENOENT',
      startErrorMessage: 'docker executable was not found',
      terminationErrorName: 'TerminationError',
      terminationErrorMessage: 'process tree termination failed',
    });
    expect(result).not.toHaveProperty('startError');
    expect(result).not.toHaveProperty('terminationError');
  });

  it.each([
    ['non-object request', null, 'request must be an object'],
    ['empty argv', { args: [] }, 'args must be a non-empty array'],
    ['non-string argv', { args: ['version', 1] }, 'args must contain only strings'],
    ['NUL argv', { args: ['version\u0000--format'] }, 'args must contain no NUL bytes'],
    ['zero timeout', { timeoutMs: 0 }, 'timeoutMs must be a positive safe integer'],
    ['unsafe timeout', { timeoutMs: Number.MAX_SAFE_INTEGER + 1 }, 'positive safe integer'],
    ['invalid stdin', { stdin: 42 }, 'stdin must be a string or Uint8Array'],
    ['invalid signal', { signal: {} }, 'signal must be an AbortSignal'],
    ['invalid output observer', { onOutput: true }, 'onOutput must be a function'],
  ])('rejects invalid request boundary: %s', async (_name, overrides, message) => {
    const candidate =
      overrides === null ? null : request(['version'], overrides as Partial<DockerCliRequest>);
    await expect(
      new DockerCliTransport().run(candidate as unknown as DockerCliRequest)
    ).rejects.toThrow(message);
  });

  it.each([
    ['empty docker path', { dockerPath: ' ' }, 'dockerPath must be a non-empty string'],
    ['NUL docker path', { dockerPath: 'docker\u0000.exe' }, 'dockerPath must be a non-empty string'],
    [
      'empty working directory',
      { workingDirectory: '' },
      'workingDirectory must be a non-empty string',
    ],
    ['negative termination grace', { gracefulTerminationMs: -1 }, 'non-negative safe integer'],
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
    startedAt: '2026-07-27T00:00:00.000Z',
    completedAt: '2026-07-27T00:00:00.001Z',
    latencyMs: 1,
    terminationMechanism: 'posix_process_group',
    processTreeTerminationVerified: false,
    ...overrides,
  };
}
