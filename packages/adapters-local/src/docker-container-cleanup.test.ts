import { describe, expect, it } from 'vitest';
import type {
  DockerCliRequest,
  DockerCliResult,
  DockerCommandTransport,
} from './docker-cli-transport';
import {
  DockerManagedContainerCleanup,
  type DockerCleanupLifecycle,
  type DockerContainerCleanupInput,
} from './docker-container-cleanup';
import { DockerEngineClientError, type DockerContainerInspection } from './docker-engine-boundary';

const digest = `sha256:${'a'.repeat(64)}`;

describe('DockerManagedContainerCleanup', () => {
  it('uses exact managed and scope filters and retains active containers', async () => {
    const transport = new RecordingTransport(result(listing(['active-id', 'active-name'])));
    const lifecycle = new RecordingLifecycle();
    const signal = new AbortController().signal;

    await expect(
      new DockerManagedContainerCleanup(transport, lifecycle).reconcile(
        cleanupInput({
          activeContainerReferences: ['active-name'],
          signal,
        })
      )
    ).resolves.toEqual({
      complete: true,
      discovered: 1,
      retainedActive: 1,
      alreadyMissing: 0,
      removed: [],
      failures: [],
    });

    expect(transport.requests).toEqual([
      {
        args: [
          'container',
          'ls',
          '--all',
          '--no-trunc',
          '--filter',
          'label=hypha.execution.managed=true',
          '--filter',
          'label=hypha.execution.scope=server-a',
          '--format',
          '{{json .}}',
        ],
        timeoutMs: 10_000,
        maxStdoutBytes: 1_048_576,
        maxStderrBytes: 1_048_576,
        maxCombinedOutputBytes: 1_048_576,
        signal,
      },
    ]);
    expect(lifecycle.calls).toEqual([]);
  });

  it('stops running orphans, removes stopped orphans, and records missing candidates', async () => {
    const transport = new RecordingTransport(
      result(
        [
          listing(['running-id', 'running-name']),
          listing(['stopped-id', 'stopped-name']),
          listing(['missing-id', 'missing-name']),
        ].join('\n')
      )
    );
    const lifecycle = new RecordingLifecycle({
      inspections: new Map([
        ['running-id', inspection(true)],
        ['stopped-id', inspection(false)],
        ['missing-id', null],
      ]),
    });

    await expect(
      new DockerManagedContainerCleanup(transport, lifecycle).reconcile(cleanupInput())
    ).resolves.toEqual({
      complete: true,
      discovered: 3,
      retainedActive: 0,
      alreadyMissing: 1,
      removed: [
        { containerReference: 'running-id', wasRunning: true },
        { containerReference: 'stopped-id', wasRunning: false },
      ],
      failures: [],
    });
    expect(lifecycle.calls).toEqual([
      'inspect:running-id',
      'stop:running-id:5',
      'remove:running-id',
      'inspect:stopped-id',
      'remove:stopped-id',
      'inspect:missing-id',
    ]);
  });

  it('records bounded failures, avoids unsafe removal after stop failure, and continues cleanup', async () => {
    const transport = new RecordingTransport(
      result(
        [
          listing(['stop-fails', 'one']),
          listing(['remove-fails', 'two']),
          listing(['inspect-fails', 'three']),
          listing(['survivor', 'four']),
        ].join('\n')
      )
    );
    const lifecycle = new RecordingLifecycle({
      inspections: new Map([
        ['stop-fails', inspection(true)],
        ['remove-fails', inspection(false)],
        ['survivor', inspection(false)],
      ]),
      inspectFailures: new Set(['inspect-fails']),
      stopFailures: new Set(['stop-fails']),
      removeFailures: new Set(['remove-fails']),
    });

    const evidence = await new DockerManagedContainerCleanup(transport, lifecycle).reconcile(
      cleanupInput()
    );

    expect(evidence).toEqual({
      complete: false,
      discovered: 4,
      retainedActive: 0,
      alreadyMissing: 0,
      removed: [{ containerReference: 'survivor', wasRunning: false }],
      failures: [
        {
          containerReference: 'stop-fails',
          stage: 'stop',
          code: 'DOCKER_COMMAND_FAILED',
        },
        {
          containerReference: 'remove-fails',
          stage: 'remove',
          code: 'DOCKER_COMMAND_FAILED',
        },
        {
          containerReference: 'inspect-fails',
          stage: 'inspect',
          code: 'DOCKER_COMMAND_FAILED',
        },
      ],
    });
    expect(lifecycle.calls).not.toContain('remove:stop-fails');
    expect(lifecycle.calls).toContain('remove:survivor');
  });

  it('stops reconciling new candidates after cancellation without deleting them', async () => {
    const controller = new AbortController();
    const transport = new RecordingTransport(
      result([listing(['first-id', 'first']), listing(['second-id', 'second'])].join('\n'))
    );
    const lifecycle = new RecordingLifecycle({
      inspections: new Map([
        ['first-id', inspection(false)],
        ['second-id', inspection(false)],
      ]),
      afterRemove: () => controller.abort(),
    });

    await expect(
      new DockerManagedContainerCleanup(transport, lifecycle).reconcile(
        cleanupInput({ signal: controller.signal })
      )
    ).resolves.toEqual({
      complete: false,
      discovered: 2,
      retainedActive: 0,
      alreadyMissing: 0,
      removed: [{ containerReference: 'first-id', wasRunning: false }],
      failures: [],
    });
    expect(lifecycle.calls).not.toContain('inspect:second-id');
  });

  it('fails closed when inspection returns a different container identity', async () => {
    const transport = new RecordingTransport(result(listing(['listed-id', 'listed-name'])));
    const lifecycle = new RecordingLifecycle({
      inspections: new Map([['listed-id', inspection(false)]]),
      preserveInspectionId: true,
    });

    await expect(
      new DockerManagedContainerCleanup(transport, lifecycle).reconcile(cleanupInput())
    ).resolves.toEqual({
      complete: false,
      discovered: 1,
      retainedActive: 0,
      alreadyMissing: 0,
      removed: [],
      failures: [
        {
          containerReference: 'listed-id',
          stage: 'inspect',
          code: 'DOCKER_INVALID_RESPONSE',
        },
      ],
    });
    expect(lifecycle.calls).not.toContain('remove:listed-id');
  });

  it.each([
    ['non-object input', null, 'cleanup input must be an object'],
    ['invalid scope', { scopeId: '--all' }, 'cleanup scopeId is invalid'],
    ['invalid active list', { activeContainerReferences: 'id' }, 'must be an array'],
    ['invalid active reference', { activeContainerReferences: ['../id'] }, 'reference is invalid'],
    ['negative timeout', { stopTimeoutSeconds: -1 }, 'must be a non-negative safe integer'],
    ['invalid signal', { signal: {} }, 'signal must be an AbortSignal'],
  ])('rejects invalid cleanup boundary: %s', async (_name, override, message) => {
    const transport = new RecordingTransport(result(''));
    const candidate =
      override === null ? null : cleanupInput(override as Partial<DockerContainerCleanupInput>);

    await expect(
      new DockerManagedContainerCleanup(transport, new RecordingLifecycle()).reconcile(
        candidate as DockerContainerCleanupInput
      )
    ).rejects.toThrow(message);
    expect(transport.requests).toHaveLength(0);
  });

  it.each([
    ['invalid JSON', '{'],
    ['invalid record', '[]'],
    [
      'duplicate container ID',
      [listing(['same-id', 'one']), listing(['same-id', 'two'])].join('\n'),
    ],
  ])('fails closed for unsafe discovery evidence: %s', async (_name, stdout) => {
    const operation = new DockerManagedContainerCleanup(
      new RecordingTransport(result(stdout)),
      new RecordingLifecycle()
    ).reconcile(cleanupInput());

    await expect(operation).rejects.toMatchObject({
      code: 'DOCKER_INVALID_RESPONSE',
      command: 'container ls',
    });
  });

  it('normalizes discovery command failure without exposing stderr', async () => {
    const secret = 'daemon-private-detail';
    const operation = new DockerManagedContainerCleanup(
      new RecordingTransport(result('', secret, 7)),
      new RecordingLifecycle()
    ).reconcile(cleanupInput());

    const failure = await operation.catch((error: unknown) => error);
    expect(failure).toMatchObject({
      code: 'DOCKER_COMMAND_FAILED',
      command: 'container ls',
      evidence: { outcome: 'exited', exitCode: 7 },
    });
    expect(String(failure)).not.toContain(secret);
  });
});

function cleanupInput(
  overrides: Partial<DockerContainerCleanupInput> = {}
): DockerContainerCleanupInput {
  return {
    scopeId: 'server-a',
    activeContainerReferences: [],
    stopTimeoutSeconds: 5,
    signal: new AbortController().signal,
    ...overrides,
  };
}

function listing([id, name]: [string, string]): string {
  return JSON.stringify({ ID: id, Names: name });
}

function inspection(running: boolean): DockerContainerInspection {
  return {
    id: 'container-id',
    running,
    oomKilled: false,
    status: running ? 'running' : 'exited',
    exitCode: running ? 0 : 1,
    imageDigest: digest,
  };
}

class RecordingTransport implements DockerCommandTransport {
  readonly requests: DockerCliRequest[] = [];

  constructor(private readonly transportResult: DockerCliResult) {}

  async run(request: DockerCliRequest): Promise<DockerCliResult> {
    this.requests.push(request);
    return this.transportResult;
  }
}

interface RecordingLifecycleOptions {
  inspections?: Map<string, DockerContainerInspection | null>;
  inspectFailures?: Set<string>;
  stopFailures?: Set<string>;
  removeFailures?: Set<string>;
  afterRemove?: () => void;
  preserveInspectionId?: boolean;
}

class RecordingLifecycle implements DockerCleanupLifecycle {
  readonly calls: string[] = [];

  constructor(private readonly options: RecordingLifecycleOptions = {}) {}

  async inspectContainer(reference: string): Promise<DockerContainerInspection | null> {
    this.calls.push(`inspect:${reference}`);
    if (this.options.inspectFailures?.has(reference)) throw commandFailure('inspect');
    const inspection = this.options.inspections?.get(reference) ?? null;
    if (!inspection || this.options.preserveInspectionId) return inspection;
    return { ...inspection, id: reference };
  }

  async stopContainer(reference: string, timeoutSeconds: number): Promise<void> {
    this.calls.push(`stop:${reference}:${timeoutSeconds}`);
    if (this.options.stopFailures?.has(reference)) throw commandFailure('stop');
  }

  async removeContainer(reference: string): Promise<void> {
    this.calls.push(`remove:${reference}`);
    if (this.options.removeFailures?.has(reference)) throw commandFailure('remove');
    this.options.afterRemove?.();
  }
}

function commandFailure(command: string): DockerEngineClientError {
  return new DockerEngineClientError('Docker command failed.', 'DOCKER_COMMAND_FAILED', command);
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
    completedAt: '2026-07-27T00:00:00.001Z',
    latencyMs: 1,
    terminationMechanism: 'posix_process_group',
    processTreeTerminationVerified: true,
  };
}
