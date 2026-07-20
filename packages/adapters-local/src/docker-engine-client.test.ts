import { describe, expect, it } from 'vitest';
import type {
  DockerCliRequest,
  DockerCliResult,
  DockerCommandTransport,
} from './docker-cli-transport';
import {
  DockerEngineCliClient,
  DockerEngineClientError,
  type DockerContainerCreateInput,
  type DockerContainerExecInput,
} from './docker-engine-client';

const digest = `sha256:${'a'.repeat(64)}`;

describe('DockerEngineCliClient', () => {
  it('builds a hardened, non-root, digest-pinned container create command', async () => {
    const transport = new FakeTransport([result('container123\n')]);
    const client = new DockerEngineCliClient(transport);

    await expect(client.createContainer(createInput())).resolves.toBe('container123');

    expect(transport.requests[0].args).toEqual([
      'create',
      '--name',
      'hypha-sandbox-1',
      '--user',
      '65532:65532',
      '--workdir',
      '/workspace',
      '--network',
      'none',
      '--cap-drop',
      'ALL',
      '--security-opt',
      'no-new-privileges=true',
      '--mount',
      'type=bind,src=D:\\workspace,dst=/workspace,rw',
      '--tmpfs',
      '/tmp:rw,noexec,nosuid,nodev,size=16777216',
      '--init',
      '--read-only',
      '--cpus',
      '0.5',
      '--memory',
      '134217728',
      '--pids-limit',
      '64',
      '--label',
      'hypha.execution=sandbox-1',
      `redis@${digest}`,
      'sleep',
      'infinity',
    ]);
  });

  it.each([
    ['root user', { user: '0:0' }, 'must not run as root'],
    ['unpinned digest', { imageDigest: 'latest' }, 'must be sha256 pinned'],
    ['tag embedded in digest source', { image: 'redis@latest' }, 'Invalid Docker image reference'],
    ['zero CPU', { cpuCores: 0 }, 'cpuCores must be positive'],
    ['zero memory', { memoryBytes: 0 }, 'memoryBytes must be a positive integer'],
    ['unknown network', { networkMode: 'host' }, 'network mode must be none or bridge'],
    [
      'Docker socket source',
      { workspaceMount: { source: '/var/run/docker.sock', target: '/workspace', readOnly: true } },
      'Docker Socket mounts are forbidden',
    ],
    [
      'Docker socket target',
      {
        workspaceMount: { source: 'D:\\workspace', target: '/var/run/docker.sock', readOnly: true },
      },
      'Docker Socket mounts are forbidden',
    ],
  ])('rejects unsafe create input: %s', async (_name, overrides, message) => {
    const client = new DockerEngineCliClient(new FakeTransport([]));
    await expect(
      client.createContainer(createInput(overrides as Partial<DockerContainerCreateInput>))
    ).rejects.toThrow(message);
  });

  it('executes literal argv and approved non-secret environment without a shell', async () => {
    const transport = new FakeTransport([result('ok')]);
    const client = new DockerEngineCliClient(transport);
    const input = execInput({
      args: ['%s', 'hello; rm -rf /'],
      environment: { Z_LAST: 'z', HYPHA_ALLOWED: 'value' },
      stdin: 'input',
      idleTimeoutMs: 500,
    });

    await client.execute(input);

    expect(transport.requests[0]).toMatchObject({
      args: [
        'exec',
        '--workdir',
        '/workspace',
        '--env',
        'HYPHA_ALLOWED=value',
        '--env',
        'Z_LAST=z',
        '--interactive',
        'container123',
        'printf',
        '%s',
        'hello; rm -rf /',
      ],
      stdin: 'input',
      idleTimeoutMs: 500,
      signal: input.signal,
    });
  });

  it.each([
    [
      'NUL environment name',
      { environment: { 'BAD\u0000NAME': 'value' } },
      'Invalid Docker environment name',
    ],
    ['NUL environment value', { environment: { SAFE: 'bad\u0000value' } }, 'environment values'],
    ['NUL executable arg', { args: ['bad\u0000arg'] }, 'args must contain no NUL bytes'],
    ['relative workdir', { workingDirectory: '../escape' }, 'absolute normalized container path'],
  ])('rejects unsafe exec input: %s', async (_name, overrides, message) => {
    const client = new DockerEngineCliClient(new FakeTransport([]));
    await expect(
      client.execute(execInput(overrides as Partial<DockerContainerExecInput>))
    ).rejects.toThrow(message);
  });

  it('parses health, image, container, and resource evidence', async () => {
    const transport = new FakeTransport([
      result('29.0.0\n'),
      result(JSON.stringify({ Id: digest, RepoDigests: [`redis@${digest}`] })),
      result(
        JSON.stringify([
          {
            Id: 'container123',
            Image: digest,
            State: {
              Running: true,
              OOMKilled: false,
              Status: 'running',
              ExitCode: 0,
              StartedAt: '2026-07-20T00:00:00.000Z',
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

    await expect(client.health()).resolves.toEqual({ serverVersion: '29.0.0' });
    await expect(client.inspectImage('redis')).resolves.toEqual({
      id: digest,
      repoDigests: [`redis@${digest}`],
    });
    await expect(client.inspectContainer('container123')).resolves.toMatchObject({
      running: true,
      oomKilled: false,
      imageDigest: digest,
      startedAt: '2026-07-20T00:00:00.000Z',
    });
    await expect(client.resourceSnapshot('container123')).resolves.toEqual({
      memoryBytes: 12 * 1024 * 1024,
      cpuPercent: 1.5,
      processCount: 2,
      blockReadBytes: 4_000,
      blockWriteBytes: 8_000,
    });
  });

  it('reconciles failed stop, kill, and remove commands before treating cleanup as success', async () => {
    const stopped = inspection({ Running: false, Status: 'exited' });
    const transport = new FakeTransport([
      result('', 'stop failed', 1),
      result(stopped),
      result('', 'kill failed', 1),
      result('', 'inspect missing', 1),
      result('', 'remove failed', 1),
      result('', 'inspect missing', 1),
    ]);
    const client = new DockerEngineCliClient(transport);

    await expect(client.stopContainer('container123', 0)).resolves.toBeUndefined();
    await expect(client.killContainer('container123')).resolves.toBeUndefined();
    await expect(client.removeContainer('container123')).resolves.toBeUndefined();
    expect(transport.requests.map((request) => request.args[0])).toEqual([
      'stop',
      'inspect',
      'kill',
      'inspect',
      'rm',
      'inspect',
    ]);
  });

  it('returns a structured failure without copying Docker stderr into the error message', async () => {
    const secret = 'do-not-expose-this-secret';
    const client = new DockerEngineCliClient(
      new FakeTransport([result('', `daemon failed: ${secret}`, 1)])
    );

    const failure = await client.health().catch((error: unknown) => error);

    expect(failure).toBeInstanceOf(DockerEngineClientError);
    expect(failure).toMatchObject({
      code: 'DOCKER_COMMAND_FAILED',
      command: 'version',
      evidence: { outcome: 'exited', exitCode: 1 },
    });
    expect(String(failure)).not.toContain(secret);
  });

  it('rejects malformed Docker JSON rather than accepting incomplete evidence', async () => {
    const client = new DockerEngineCliClient(new FakeTransport([result('{not-json')]));

    await expect(client.inspectImage('redis')).rejects.toMatchObject({
      code: 'DOCKER_INVALID_RESPONSE',
      command: 'image inspect',
    });
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

function createInput(
  overrides: Partial<DockerContainerCreateInput> = {}
): DockerContainerCreateInput {
  return {
    name: 'hypha-sandbox-1',
    image: 'redis',
    imageDigest: digest,
    user: '65532:65532',
    workingDirectory: '/workspace',
    workspaceMount: { source: 'D:\\workspace', target: '/workspace', readOnly: false },
    networkMode: 'none',
    readOnlyRoot: true,
    cpuCores: 0.5,
    memoryBytes: 134_217_728,
    pidsLimit: 64,
    labels: { 'hypha.execution': 'sandbox-1' },
    ...overrides,
  };
}

function execInput(overrides: Partial<DockerContainerExecInput> = {}): DockerContainerExecInput {
  return {
    containerId: 'container123',
    executable: 'printf',
    args: [],
    workingDirectory: '/workspace',
    environment: { HYPHA_ALLOWED: 'value' },
    timeoutMs: 1_000,
    maxStdoutBytes: 100,
    maxStderrBytes: 100,
    maxCombinedOutputBytes: 200,
    signal: new AbortController().signal,
    ...overrides,
  };
}

function inspection(
  stateOverrides: Partial<{
    Running: boolean;
    OOMKilled: boolean;
    Status: string;
    ExitCode: number;
  }> = {}
): string {
  return JSON.stringify([
    {
      Id: 'container123',
      Image: digest,
      State: {
        Running: true,
        OOMKilled: false,
        Status: 'running',
        ExitCode: 0,
        ...stateOverrides,
      },
    },
  ]);
}

function result(stdout: string, stderr = '', exitCode = 0): DockerCliResult {
  return {
    outcome: 'exited',
    exitCode,
    stdout,
    stderr,
    observedStdoutBytes: Buffer.byteLength(stdout),
    observedStderrBytes: Buffer.byteLength(stderr),
    startedAt: '2026-07-20T00:00:00.000Z',
    completedAt: '2026-07-20T00:00:01.000Z',
    latencyMs: 1_000,
    terminationMechanism: 'posix_process_group',
    processTreeTerminationVerified: true,
  };
}
