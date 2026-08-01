import { describe, expect, it } from 'vitest';
import type {
  DockerCliRequest,
  DockerCliResult,
  DockerCommandTransport,
} from './docker-cli-transport';
import { DockerExecIo, type DockerContainerExecInput } from './docker-exec-io';
import type { LocalProcessOutputEvent } from './local-process-supervisor';

describe('DockerExecIo', () => {
  it('passes literal argv, sorted non-secret environment, stdin, and output observer', async () => {
    const transport = new RecordingTransport(result('ok', 'warning'));
    const signal = new AbortController().signal;
    const onOutput = async (_event: LocalProcessOutputEvent): Promise<void> => undefined;
    const input = execInput({
      args: ['%s', 'literal; exit 9 && echo not-a-shell'],
      environment: { Z_LAST: 'z', HYPHA_ALLOWED: 'value=with spaces' },
      stdin: new Uint8Array([1, 2, 3]),
      idleTimeoutMs: 500,
      signal,
      onOutput,
    });

    await expect(new DockerExecIo(transport).execute(input)).resolves.toMatchObject({
      outcome: 'exited',
      stdout: 'ok',
      stderr: 'warning',
    });

    expect(transport.requests).toEqual([
      expect.objectContaining({
        args: [
          'exec',
          '--workdir',
          '/workspace',
          '--env',
          'HYPHA_ALLOWED=value=with spaces',
          '--env',
          'Z_LAST=z',
          '--interactive',
          'container123',
          'printf',
          '%s',
          'literal; exit 9 && echo not-a-shell',
        ],
        stdin: new Uint8Array([1, 2, 3]),
        idleTimeoutMs: 500,
        signal,
        onOutput,
      }),
    ]);
  });

  it('omits interactive mode and optional fields when stdin and observers are absent', async () => {
    const transport = new RecordingTransport(result('ok'));

    await new DockerExecIo(transport).execute(execInput());

    expect(transport.requests[0]?.args).toEqual([
      'exec',
      '--workdir',
      '/workspace',
      '--env',
      'HYPHA_ALLOWED=value',
      'container123',
      'printf',
    ]);
    expect(transport.requests[0]).not.toHaveProperty('stdin');
    expect(transport.requests[0]).not.toHaveProperty('idleTimeoutMs');
    expect(transport.requests[0]).not.toHaveProperty('onOutput');
  });

  it('preserves non-zero, timeout, cancellation, and output-limit evidence for Provider mapping', async () => {
    const outputs: DockerCliResult[] = [
      result('', 'failed', 7),
      result('', '', null, 'timed_out'),
      result('', '', null, 'cancelled'),
      {
        ...result('bounded', '', null, 'output_limit'),
        outputLimitStream: 'stdout',
        observedStdoutBytes: 4_096,
      },
    ];

    for (const expected of outputs) {
      const actual = await new DockerExecIo(new RecordingTransport(expected)).execute(execInput());
      expect(actual).toEqual(expected);
    }
  });

  it.each([
    ['non-object input', null, 'exec input must be an object'],
    ['invalid container', { containerReference: '--help' }, 'container reference is invalid'],
    ['empty executable', { executable: '' }, 'executable must be a non-empty string'],
    ['NUL executable', { executable: 'printf\u0000' }, 'no NUL bytes'],
    ['non-array args', { args: 'value' }, 'args must be a string array'],
    ['NUL arg', { args: ['bad\u0000arg'] }, 'args must be a string array'],
    ['relative workdir', { workingDirectory: '../escape' }, 'absolute normalized container path'],
    ['parent workdir', { workingDirectory: '/safe/../escape' }, 'absolute normalized container path'],
    ['array environment', { environment: [] }, 'environment must be a plain record'],
    ['class environment', { environment: new Date() }, 'environment must be a plain record'],
    ['invalid environment name', { environment: { 'BAD-NAME': 'value' } }, 'name is invalid'],
    [
      'NUL environment value',
      { environment: { SAFE: 'value\u0000secret' } },
      'values must be strings containing no NUL bytes',
    ],
    ['zero timeout', { timeoutMs: 0 }, 'timeoutMs must be a positive safe integer'],
    ['invalid signal', { signal: {} }, 'signal must be an AbortSignal'],
    ['invalid observer', { onOutput: true }, 'onOutput must be a function'],
  ])('rejects invalid execution boundary: %s', async (_name, overrides, message) => {
    const candidate =
      overrides === null ? null : execInput(overrides as Partial<DockerContainerExecInput>);
    await expect(
      new DockerExecIo(new RecordingTransport(result('unused'))).execute(
        candidate as unknown as DockerContainerExecInput
      )
    ).rejects.toThrow(message);
  });

  it('does not copy rejected environment values into validation errors', async () => {
    const secret = 'secret-value-that-must-not-leak';

    const failure = await new DockerExecIo(new RecordingTransport(result('unused')))
      .execute(execInput({ environment: { 'BAD-NAME': secret } }))
      .catch((error: unknown) => error);

    expect(String(failure)).not.toContain(secret);
  });
});

class RecordingTransport implements DockerCommandTransport {
  readonly requests: DockerCliRequest[] = [];

  constructor(private readonly response: DockerCliResult) {}

  async run(request: DockerCliRequest): Promise<DockerCliResult> {
    this.requests.push(request);
    return this.response;
  }
}

function execInput(
  overrides: Partial<DockerContainerExecInput> = {}
): DockerContainerExecInput {
  return {
    containerReference: 'container123',
    executable: 'printf',
    args: [],
    workingDirectory: '/workspace',
    environment: { HYPHA_ALLOWED: 'value' },
    timeoutMs: 1_000,
    maxStdoutBytes: 1_024,
    maxStderrBytes: 1_024,
    maxCombinedOutputBytes: 2_048,
    signal: new AbortController().signal,
    ...overrides,
  };
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
    completedAt: '2026-07-27T00:00:01.000Z',
    latencyMs: 1_000,
    terminationMechanism: 'posix_process_group',
    processTreeTerminationVerified: true,
  };
}
