import { describe, expect, it } from 'vitest';
import type {
  DockerCliRequest,
  DockerCliResult,
  DockerCommandTransport,
} from './docker-cli-transport';
import { DockerEngineCliClient } from './docker-engine-client';

const digest = `sha256:${'a'.repeat(64)}`;

describe('DockerEngineCliClient', () => {
  it('builds a hardened, digest-pinned container create command', async () => {
    const transport = new FakeTransport([result('container123\n')]);
    const client = new DockerEngineCliClient(transport);
    await expect(
      client.createContainer({
        name: 'hypha-sandbox-1',
        image: 'redis',
        imageDigest: digest,
        user: '999:999',
        workingDirectory: '/workspace',
        workspaceMount: { source: 'D:\\workspace', target: '/workspace', readOnly: false },
        networkMode: 'none',
        readOnlyRoot: true,
        cpuCores: 0.5,
        memoryBytes: 134_217_728,
        pidsLimit: 64,
        labels: { 'hypha.execution': 'sandbox-1' },
      })
    ).resolves.toBe('container123');

    const args = transport.requests[0].args;
    expect(args).toEqual(
      expect.arrayContaining([
        '--read-only',
        '--network',
        'none',
        '--cap-drop',
        'ALL',
        '--security-opt',
        'no-new-privileges',
        '--pids-limit',
        '64',
        `redis@${digest}`,
      ])
    );
    expect(args.join(' ')).not.toContain('docker.sock');
  });

  it('executes using argv and validates environment names without a shell', async () => {
    const transport = new FakeTransport([result('ok')]);
    const client = new DockerEngineCliClient(transport);
    await client.execute({
      containerId: 'container123',
      executable: 'printf',
      args: ['%s', 'hello; rm -rf /'],
      workingDirectory: '/workspace',
      environment: { HYPHA_ALLOWED: 'value' },
      timeoutMs: 1_000,
      maxStdoutBytes: 100,
      maxStderrBytes: 100,
      maxCombinedOutputBytes: 200,
      signal: new AbortController().signal,
    });
    expect(transport.requests[0].args).toEqual([
      'exec',
      '--workdir',
      '/workspace',
      '--env',
      'HYPHA_ALLOWED=value',
      'container123',
      'printf',
      '%s',
      'hello; rm -rf /',
    ]);
    expect(() =>
      client.execute({
        containerId: 'container123',
        executable: 'env',
        args: [],
        workingDirectory: '/workspace',
        environment: { 'BAD\u0000NAME': 'value' },
        timeoutMs: 1_000,
        maxStdoutBytes: 100,
        maxStderrBytes: 100,
        maxCombinedOutputBytes: 200,
        signal: new AbortController().signal,
      })
    ).toThrow('Invalid Docker environment name');
  });

  it('parses container and resource inspection evidence', async () => {
    const transport = new FakeTransport([
      result(
        JSON.stringify([
          {
            Id: 'container123',
            Image: digest,
            State: {
              Running: true,
              Status: 'running',
              ExitCode: 0,
              StartedAt: '2026-07-17T00:00:00.000Z',
              FinishedAt: '0001-01-01T00:00:00Z',
            },
          },
        ])
      ),
      result(
        JSON.stringify({
          MemUsage: '12MiB / 128MiB',
          CPUPerc: '1.5%',
          PIDs: '2',
          BlockIO: '4kB / 8kB',
        })
      ),
    ]);
    const client = new DockerEngineCliClient(transport);
    await expect(client.inspectContainer('container123')).resolves.toMatchObject({
      running: true,
      imageDigest: digest,
    });
    await expect(client.resourceSnapshot('container123')).resolves.toEqual({
      memoryBytes: 12 * 1024 * 1024,
      cpuPercent: 1.5,
      processCount: 2,
      blockReadBytes: 4_000,
      blockWriteBytes: 8_000,
    });
  });

  it('treats missing container cleanup as idempotent success', async () => {
    const transport = new FakeTransport([
      result('', 'Error: No such container: missing', 1),
      result('', 'Error: No such container: missing', 1),
    ]);
    const client = new DockerEngineCliClient(transport);
    await expect(client.inspectContainer('missing')).resolves.toBeNull();
    await expect(client.removeContainer('missing')).resolves.toBeUndefined();
  });
});

class FakeTransport implements DockerCommandTransport {
  readonly requests: DockerCliRequest[] = [];
  constructor(private readonly results: DockerCliResult[]) {}

  async run(request: DockerCliRequest): Promise<DockerCliResult> {
    this.requests.push(request);
    const next = this.results.shift();
    if (!next) throw new Error('No fake Docker result configured.');
    return next;
  }
}

function result(stdout: string, stderr = '', exitCode = 0): DockerCliResult {
  return {
    outcome: 'exited',
    exitCode,
    stdout,
    stderr,
    observedStdoutBytes: Buffer.byteLength(stdout),
    observedStderrBytes: Buffer.byteLength(stderr),
    startedAt: '2026-07-17T00:00:00.000Z',
    completedAt: '2026-07-17T00:00:01.000Z',
    latencyMs: 1_000,
  };
}
