import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  DockerCliCommandRunner,
  DockerEngineCli,
  DockerEngineCliError,
  type DockerCommandRequest,
  type DockerCommandResult,
  type DockerCommandRunner,
} from './docker-engine-cli';

class RecordingRunner implements DockerCommandRunner {
  readonly requests: DockerCommandRequest[] = [];
  readonly results: DockerCommandResult[] = [];

  enqueue(overrides: Partial<DockerCommandResult> = {}): void {
    this.results.push(result(overrides));
  }

  async run(request: DockerCommandRequest): Promise<DockerCommandResult> {
    this.requests.push(request);
    return this.results.shift() ?? result();
  }
}

describe('DockerEngineCli', () => {
  it('builds a pinned, least-privilege container create command', async () => {
    const runner = new RecordingRunner();
    runner.enqueue({ stdout: 'container-123\n' });
    const engine = new DockerEngineCli({ runner });

    const id = await engine.createContainer({
      name: 'hypha-sandbox-1',
      image: 'registry.example.invalid/hypha/execution@sha256:abc123',
      command: ['/hypha/idle'],
      user: '65532:65532',
      workspaceMount: {
        source: path.resolve('workspace'),
        target: '/workspace',
        readOnly: false,
      },
      tmpfs: [{ target: '/tmp', sizeBytes: 4096, noExec: true, noSuid: true, noDev: true }],
      network: 'none',
      cpuCores: 1.5,
      memoryBytes: 128 * 1024 * 1024,
      memorySwapBytes: 256 * 1024 * 1024,
      pidsLimit: 64,
      maxOpenFiles: 128,
      platform: 'linux/amd64',
      pullPolicy: 'never',
      stopTimeoutSeconds: 2,
      labels: { 'hypha.workspace': 'workspace-1', 'hypha.owner': 'execution' },
    });

    expect(id).toBe('container-123');
    const args = runner.requests[0]?.args ?? [];
    expect(args.slice(0, 2)).toEqual(['container', 'create']);
    expect(args).toEqual(
      expect.arrayContaining([
        '--init',
        '--read-only',
        '--network',
        'none',
        '--cap-drop',
        'ALL',
        '--security-opt',
        'no-new-privileges',
        '--user',
        '65532:65532',
        '--cpus',
        '1.5',
        '--memory',
        String(128 * 1024 * 1024),
        '--pids-limit',
        '64',
        '--pull',
        'never',
      ])
    );
    expect(args.at(-2)).toBe('registry.example.invalid/hypha/execution@sha256:abc123');
    expect(args.at(-1)).toBe('/hypha/idle');
    expect(args).not.toContain('--privileged');
    expect(args).not.toContain('/var/run/docker.sock');
  });

  it('passes exec as an argv array with bounded output and sorted explicit environment', async () => {
    const runner = new RecordingRunner();
    const engine = new DockerEngineCli({ runner });
    const controller = new AbortController();

    await engine.execute({
      containerId: 'container-123',
      executable: 'node',
      args: ['script.js', '--safe'],
      cwd: '/workspace',
      environment: { ZED: 'last', ALPHA: 'first' },
      stdin: 'input',
      signal: controller.signal,
      timeoutMs: 1000,
      maxStdoutBytes: 100,
      maxStderrBytes: 200,
      maxCombinedOutputBytes: 250,
    });

    expect(runner.requests[0]).toMatchObject({
      args: [
        'container',
        'exec',
        '--workdir',
        '/workspace',
        '--interactive',
        '--env',
        'ALPHA=first',
        '--env',
        'ZED=last',
        'container-123',
        'node',
        'script.js',
        '--safe',
      ],
      timeoutMs: 1000,
      maxStdoutBytes: 100,
      maxStderrBytes: 200,
      maxCombinedOutputBytes: 250,
    });
    expect(runner.requests[0]?.args).not.toContain('--privileged');
    expect(runner.requests[0]?.args).not.toContain('--detach');
  });

  it('parses health, image, and container inspection receipts', async () => {
    const runner = new RecordingRunner();
    runner.enqueue({ stdout: '"29.0.0"\n' });
    runner.enqueue({
      stdout: JSON.stringify([
        { Id: 'sha256:image-id', RepoDigests: ['example/image@sha256:manifest'] },
      ]),
    });
    runner.enqueue({
      stdout: JSON.stringify([
        {
          Id: 'container-123',
          Image: 'sha256:image-id',
          Name: '/hypha-sandbox',
          State: {
            Running: false,
            Status: 'exited',
            ExitCode: 137,
            OOMKilled: true,
            StartedAt: '2026-07-17T00:00:00Z',
            FinishedAt: '2026-07-17T00:00:01Z',
          },
        },
      ]),
    });
    const engine = new DockerEngineCli({ runner });

    await expect(engine.health()).resolves.toEqual({ serverVersion: '29.0.0' });
    await expect(engine.inspectImage('example/image@sha256:manifest')).resolves.toEqual({
      id: 'sha256:image-id',
      repoDigests: ['example/image@sha256:manifest'],
    });
    await expect(engine.inspectContainer('container-123')).resolves.toEqual({
      id: 'container-123',
      imageId: 'sha256:image-id',
      name: 'hypha-sandbox',
      running: false,
      status: 'exited',
      exitCode: 137,
      oomKilled: true,
      startedAt: '2026-07-17T00:00:00Z',
      finishedAt: '2026-07-17T00:00:01Z',
    });
  });

  it('fails closed for mutable images, unsafe paths, and failed management commands', async () => {
    const runner = new RecordingRunner();
    const engine = new DockerEngineCli({ runner });
    await expect(
      engine.createContainer({
        name: 'hypha-sandbox',
        image: 'example/image:latest',
        command: ['/hypha/idle'],
        user: '65532',
        workspaceMount: {
          source: path.resolve('workspace'),
          target: '/workspace',
          readOnly: false,
        },
        network: 'none',
        cpuCores: 1,
        memoryBytes: 1024,
        pidsLimit: 2,
        pullPolicy: 'never',
        stopTimeoutSeconds: 1,
        labels: {},
      })
    ).rejects.toThrow('pinned');

    expect(() =>
      engine.execute({
        containerId: 'container;rm',
        executable: 'node',
        args: [],
        cwd: '/workspace',
        environment: {},
        signal: new AbortController().signal,
        timeoutMs: 1,
        maxStdoutBytes: 1,
        maxStderrBytes: 1,
        maxCombinedOutputBytes: 1,
      })
    ).toThrow('unsupported characters');

    runner.enqueue({ exitCode: 1, stderr: 'daemon unavailable' });
    await expect(engine.startContainer('container-123')).rejects.toBeInstanceOf(
      DockerEngineCliError
    );
  });

  it('makes forced removal idempotent when Docker reports a missing container', async () => {
    const runner = new RecordingRunner();
    runner.enqueue({ exitCode: 1, stderr: 'Error: No such container: missing' });
    const engine = new DockerEngineCli({ runner });
    await expect(engine.removeContainer('missing')).resolves.toBeUndefined();
  });
});

describe('DockerCliCommandRunner', () => {
  it('captures output without a shell and enforces output and timeout bounds', async () => {
    const runner = new DockerCliCommandRunner({
      dockerPath: process.execPath,
      environment: {},
    });

    const output = await runner.run({
      args: ['-e', 'process.stdout.write("hello")'],
      timeoutMs: 1000,
      maxStdoutBytes: 10,
      maxStderrBytes: 10,
      maxCombinedOutputBytes: 20,
    });
    expect(output).toMatchObject({ exitCode: 0, stdout: 'hello' });

    const limited = await runner.run({
      args: ['-e', 'process.stdout.write("too-long")'],
      timeoutMs: 1000,
      maxStdoutBytes: 3,
      maxStderrBytes: 10,
      maxCombinedOutputBytes: 10,
    });
    expect(limited.terminationReason).toBe('stdout_limit');
    expect(Buffer.byteLength(limited.stdout)).toBeLessThanOrEqual(3);

    const timedOut = await runner.run({
      args: ['-e', 'setInterval(() => {}, 1000)'],
      timeoutMs: 20,
      maxStdoutBytes: 10,
      maxStderrBytes: 10,
      maxCombinedOutputBytes: 20,
    });
    expect(timedOut.terminationReason).toBe('timed_out');
  });
});

function result(overrides: Partial<DockerCommandResult> = {}): DockerCommandResult {
  return {
    exitCode: 0,
    stdout: '',
    stderr: '',
    observedStdoutBytes: 0,
    observedStderrBytes: 0,
    startedAt: '2026-07-17T00:00:00.000Z',
    completedAt: '2026-07-17T00:00:00.001Z',
    latencyMs: 1,
    ...overrides,
  };
}
