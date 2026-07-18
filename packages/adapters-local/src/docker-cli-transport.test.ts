import { describe, expect, it } from 'vitest';
import { DockerCliTransport, type DockerCliRequest } from './docker-cli-transport';

describe('DockerCliTransport', () => {
  it('passes arguments and stdin without shell interpretation', async () => {
    const transport = createTransport();
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

  it('preserves raw UTF-8 byte accounting and output-limit evidence', async () => {
    const result = await createTransport().run(
      request(['-e', "process.stdout.write('你好')"], {
        maxStdoutBytes: 4,
        maxCombinedOutputBytes: 8,
      })
    );

    expect(result).toMatchObject({
      outcome: 'output_limit',
      observedStdoutBytes: 6,
      outputLimitStream: 'stdout',
    });
    expect(Buffer.byteLength(result.stdout)).toBeLessThanOrEqual(4);
  });

  it('propagates AbortSignal cancellation through the supervised process boundary', async () => {
    const controller = new AbortController();
    const pending = createTransport().run(
      request(['-e', 'setInterval(() => {}, 1_000)'], {
        signal: controller.signal,
        timeoutMs: 5_000,
      })
    );
    setTimeout(() => controller.abort(), 50);

    await expect(pending).resolves.toMatchObject({
      outcome: 'cancelled',
    });
  });

  it.each([
    ['empty argv', { args: [] }, 'Docker CLI args must be non-empty'],
    ['NUL argv', { args: ['version\u0000--format'] }, 'contain no NUL bytes'],
    ['zero timeout', { timeoutMs: 0 }, 'timeoutMs must be a positive integer'],
    [
      'fractional output limit',
      { maxStdoutBytes: 1.5 },
      'maxStdoutBytes must be a positive integer',
    ],
  ] satisfies Array<[string, Partial<DockerCliRequest>, string]>)(
    'rejects invalid request boundary: %s',
    async (_name, overrides, message) => {
      await expect(createTransport().run(request(['--version'], overrides))).rejects.toThrow(
        message
      );
    }
  );

  it('rejects invalid transport termination configuration', () => {
    expect(
      () =>
        new DockerCliTransport({
          dockerPath: process.execPath,
          gracefulTerminationMs: -1,
        })
    ).toThrow('gracefulTerminationMs must be a non-negative integer.');
  });
});

function createTransport(): DockerCliTransport {
  return new DockerCliTransport({
    dockerPath: process.execPath,
    gracefulTerminationMs: 0,
  });
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
