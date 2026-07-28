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
} from './docker-engine-client';

const digest = `sha256:${'a'.repeat(64)}`;

describe('DockerEngineCliClient', () => {
  it('builds a hardened, non-root, digest-pinned create command', async () => {
    const transport = new FakeTransport([result('container123\n')]);
    const client = new DockerEngineCliClient(transport);

    await expect(client.createContainer(createInput())).resolves.toBe('container123');

    expect(transport.requests[0]?.args).toEqual([
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
      'type=bind,src=D:\\workspace,dst=/workspace,readonly',
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
    ['digest in image', { image: 'redis@latest' }, 'image reference is invalid'],
    ['unknown network', { networkMode: 'host' }, 'network mode must be none or bridge'],
    ['zero CPU', { cpuCores: 0 }, 'cpuCores must be positive'],
    ['zero memory', { memoryBytes: 0 }, 'memoryBytes must be a positive safe integer'],
    ['empty command', { command: [] }, 'container command must be a non-empty string array'],
    ['NUL command', { command: ['sleep\u0000'] }, 'containing no NUL bytes'],
    [
      'relative source',
      { workspaceMount: { source: 'relative', target: '/workspace', readOnly: true } },
      'absolute normalized host path',
    ],
    [
      'parent source',
      { workspaceMount: { source: 'D:\\safe\\..\\escape', target: '/workspace', readOnly: true } },
      'absolute normalized host path',
    ],
    [
      'Docker socket source',
      { workspaceMount: { source: '/var/run/docker.sock', target: '/workspace', readOnly: true } },
      'Docker socket mounts are forbidden',
    ],
    [
      'Docker socket target',
      {
        workspaceMount: { source: 'D:\\workspace', target: '/var/run/docker.sock', readOnly: true },
      },
      'Docker socket mounts are forbidden',
    ],
  ])('rejects unsafe create input: %s', async (_name, overrides, message) => {
    const client = new DockerEngineCliClient(new FakeTransport([]));
    await expect(
      client.createContainer(createInput(overrides as Partial<DockerContainerCreateInput>))
    ).rejects.toThrow(message);
  });

  it('builds start, inspect, stop, and remove commands from validated references', async () => {
    const transport = new FakeTransport([
      result('container123\n'),
      result(inspection()),
      result('container123\n'),
      result('container123\n'),
    ]);
    const client = new DockerEngineCliClient(transport);

    await client.startContainer('container123');
    await expect(client.inspectContainer('container123')).resolves.toMatchObject({
      id: 'container123',
      running: true,
      oomKilled: false,
      imageDigest: digest,
    });
    await client.stopContainer('container123', 5);
    await client.removeContainer('container123');

    expect(transport.requests.map(({ args }) => args)).toEqual([
      ['start', 'container123'],
      ['container', 'inspect', 'container123'],
      ['stop', '--time', '5', 'container123'],
      ['rm', '--force', 'container123'],
    ]);
  });

  it('parses controlled timestamps and omits the Docker zero timestamp', async () => {
    const client = new DockerEngineCliClient(
      new FakeTransport([
        result(
          inspection({
            StartedAt: '2026-07-27T00:00:00.000Z',
            FinishedAt: '0001-01-01T00:00:00Z',
          })
        ),
      ])
    );

    await expect(client.inspectContainer('container123')).resolves.toEqual({
      id: 'container123',
      running: true,
      oomKilled: false,
      status: 'running',
      exitCode: 0,
      imageDigest: digest,
      startedAt: '2026-07-27T00:00:00.000Z',
    });
  });

  it('confirms absence with a successful listing instead of swallowing inspect failures', async () => {
    const transport = new FakeTransport([
      result('', 'No such container', 1),
      result(''),
    ]);
    const client = new DockerEngineCliClient(transport);

    await expect(client.inspectContainer('missing-container')).resolves.toBeNull();
    expect(transport.requests.map(({ args }) => args[1])).toEqual(['inspect', 'ls']);
  });

  it('re-inspects when container creation races the absence reconciliation', async () => {
    const transport = new FakeTransport([
      result('', 'No such container', 1),
      result(JSON.stringify({ ID: 'container123', Names: 'hypha-sandbox-1' })),
      result(inspection()),
    ]);
    const client = new DockerEngineCliClient(transport);

    await expect(client.inspectContainer('hypha-sandbox-1')).resolves.toMatchObject({
      id: 'container123',
      running: true,
    });
    expect(transport.requests.map(({ args }) => args.slice(0, 2))).toEqual([
      ['container', 'inspect'],
      ['container', 'ls'],
      ['container', 'inspect'],
    ]);
  });

  it('does not treat daemon or listing failure as a missing container', async () => {
    const secret = 'daemon-secret-that-must-not-leak';
    const client = new DockerEngineCliClient(
      new FakeTransport([
        result('', 'inspect failed', 1),
        result('', secret, 1),
      ])
    );

    const failure = await client.inspectContainer('container123').catch((error: unknown) => error);

    expect(failure).toBeInstanceOf(DockerEngineClientError);
    expect(failure).toMatchObject({
      code: 'DOCKER_COMMAND_FAILED',
      command: 'container ls',
      evidence: { outcome: 'exited', exitCode: 1 },
    });
    expect(String(failure)).not.toContain(secret);
  });

  it('reconciles failed stop and remove commands only after confirming terminal state', async () => {
    const transport = new FakeTransport([
      result('', 'stop failed', 1),
      result(inspection({ Running: false, Status: 'exited' })),
      result('', 'remove failed', 1),
      result('', 'inspect missing', 1),
      result(''),
    ]);
    const client = new DockerEngineCliClient(transport);

    await expect(client.stopContainer('container123', 0)).resolves.toBeUndefined();
    await expect(client.removeContainer('container123')).resolves.toBeUndefined();
    expect(transport.requests.map(({ args }) => args.slice(0, 2).join(' '))).toEqual([
      'stop --time',
      'container inspect',
      'rm --force',
      'container inspect',
      'container ls',
    ]);
  });

  it('fails closed when stop fails and inspection still reports a running container', async () => {
    const client = new DockerEngineCliClient(
      new FakeTransport([result('', 'stop failed', 1), result(inspection())])
    );

    await expect(client.stopContainer('container123', 1)).rejects.toMatchObject({
      code: 'DOCKER_COMMAND_FAILED',
      command: 'stop',
    });
  });

  it.each([
    ['invalid JSON', '{not-json'],
    ['missing state', JSON.stringify([{ Id: 'container123', Image: digest }])],
    [
      'invalid digest',
      JSON.stringify([
        {
          Id: 'container123',
          Image: 'redis:latest',
          State: {
            Running: true,
            OOMKilled: false,
            Status: 'running',
            ExitCode: 0,
          },
        },
      ]),
    ],
    [
      'invalid timestamp',
      inspection({ StartedAt: 'not-a-timestamp' }),
    ],
  ])('rejects invalid runtime inspection evidence: %s', async (_name, response) => {
    const client = new DockerEngineCliClient(new FakeTransport([result(response)]));

    await expect(client.inspectContainer('container123')).rejects.toMatchObject({
      code: 'DOCKER_INVALID_RESPONSE',
    });
  });

  it('returns structured failures without copying Docker stderr or argv into messages', async () => {
    const secret = 'do-not-expose-this-secret';
    const client = new DockerEngineCliClient(
      new FakeTransport([result('', `daemon failed: ${secret}`, 1)])
    );

    const failure = await client.startContainer('container123').catch((error: unknown) => error);

    expect(failure).toMatchObject({
      code: 'DOCKER_COMMAND_FAILED',
      command: 'start',
      evidence: { outcome: 'exited', exitCode: 1 },
    });
    expect(String(failure)).not.toContain(secret);
  });

  it.each([
    ['empty', ''],
    ['flag injection', '--help'],
    ['path separator', '../container'],
    ['NUL', 'container\u0000id'],
  ])('rejects unsafe container references: %s', async (_name, reference) => {
    const client = new DockerEngineCliClient(new FakeTransport([]));

    await expect(client.startContainer(reference)).rejects.toThrow('container reference is invalid');
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
    workspaceMount: { source: 'D:\\workspace', target: '/workspace', readOnly: true },
    networkMode: 'none',
    readOnlyRoot: true,
    cpuCores: 0.5,
    memoryBytes: 134_217_728,
    pidsLimit: 64,
    labels: { 'hypha.execution': 'sandbox-1' },
    command: ['sleep', 'infinity'],
    ...overrides,
  };
}

function inspection(
  stateOverrides: Record<string, unknown> = {}
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
    startedAt: '2026-07-27T00:00:00.000Z',
    completedAt: '2026-07-27T00:00:01.000Z',
    latencyMs: 1_000,
    terminationMechanism: 'posix_process_group',
    processTreeTerminationVerified: true,
  };
}
