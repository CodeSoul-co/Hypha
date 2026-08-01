import { describe, expect, it } from 'vitest';
import type { DockerCliResult } from './docker-cli-transport';
import {
  DockerExecutionCoordinator,
  DockerExecutionCoordinatorError,
  type DockerExecutionCollectedOutputs,
  type DockerExecutionCoordinatorInput,
  type DockerExecutionOutputCollector,
  type DockerExecutionOutputSession,
} from './docker-execution-coordinator';
import {
  DockerEngineClientError,
  type DockerContainerCreateInput,
  type DockerContainerInspection,
} from './docker-engine-boundary';
import type { DockerEngineClient } from './docker-engine-client';
import type { DockerContainerExecInput, DockerContainerIo } from './docker-exec-io';
import type {
  DockerResourceAccounting,
  DockerResourceSnapshot,
} from './docker-resource-accounting';
import type { LocalProcessOutputEvent } from './local-process-supervisor';

const digest = `sha256:${'a'.repeat(64)}`;

describe('DockerExecutionCoordinator', () => {
  it('runs the composed lifecycle in order and injects coordinator-owned labels', async () => {
    const events: string[] = [];
    const engine = new FakeEngine(events);
    const coordinator = createCoordinator(events, { engine });

    const result = await coordinator.execute(coordinatorInput());

    expect(result).toMatchObject({
      status: 'completed',
      externalReceipt: {
        providerExecutionRef: 'container123',
        providerId: 'provider.docker',
      },
      metadata: {
        accountingMode: 'docker_point_in_time_stats',
        cleanup: {
          complete: true,
          containerAbsent: true,
          stopAttempted: true,
        },
      },
    });
    expect(events).toEqual([
      'prepare',
      'create',
      'start:container123',
      'execute:container123',
      'stats:container123',
      'inspect:container123',
      'stop:container123:5',
      'inspect:container123',
      'collect:container123',
      'remove:container123',
      'inspect:container123',
    ]);
    expect(engine.created?.labels).toEqual({
      custom: 'value',
      'hypha.execution.managed': 'true',
      'hypha.execution.scope': 'server-a',
      'hypha.execution.id': 'execution.docker.1',
      'hypha.execution.sandbox': 'sandbox.docker.1',
    });
  });

  it('records unavailable resource accounting without hiding the successful execution', async () => {
    const events: string[] = [];
    const coordinator = createCoordinator(events, {
      accounting: new FakeAccounting(events, undefined, commandFailure('stats')),
    });

    const result = await coordinator.execute(coordinatorInput());

    expect(result).toMatchObject({
      status: 'completed',
      metadata: {
        accountingMode: 'docker_stats_unavailable',
        resourceFailureCode: 'DOCKER_COMMAND_FAILED',
      },
    });
    expect(result.externalReceipt?.receiptHash).toMatch(/^sha256:[0-9a-f]{64}$/);
  });

  it('streams output into the prepared session before caller observation and collects only after quiescence', async () => {
    const events: string[] = [];
    const outputEvent: LocalProcessOutputEvent = {
      stream: 'stdout',
      chunk: new TextEncoder().encode('streamed'),
      truncated: false,
    };
    const input = coordinatorInput({
      execInput: {
        ...execInput(),
        onOutput: (event) => {
          events.push(`caller-output:${event.stream}`);
        },
      },
    });

    await createCoordinator(events, {
      io: new FakeIo(events, processResult(), undefined, outputEvent),
    }).execute(input);

    expect(events.indexOf('output-session:stdout')).toBeLessThan(
      events.indexOf('caller-output:stdout')
    );
    expect(events.indexOf('stop:container123:5')).toBeLessThan(
      events.indexOf('collect:container123')
    );
    expect(events.indexOf('collect:container123')).toBeLessThan(
      events.indexOf('remove:container123')
    );
  });

  it('cleans a created container when start fails and returns bounded phase evidence', async () => {
    const events: string[] = [];
    const engine = new FakeEngine(events, {
      startError: commandFailure('start'),
      inspection: inspection({ running: false, status: 'created' }),
    });

    const failure = await createCoordinator(events, { engine })
      .execute(coordinatorInput())
      .catch((error: unknown) => error);

    expect(failure).toBeInstanceOf(DockerExecutionCoordinatorError);
    expect(failure).toMatchObject({
      phase: 'start',
      code: 'DOCKER_COMMAND_FAILED',
      cleanup: {
        complete: true,
        containerAbsent: true,
        stopAttempted: false,
      },
    });
    expect(events).toEqual([
      'prepare',
      'create',
      'start:container123',
      'abort',
      'inspect:container123',
      'remove:container123',
    ]);
  });

  it('waits for resource collection and cleans the container after an unexpected exec failure', async () => {
    const events: string[] = [];
    const io = new FakeIo(events, undefined, new Error('private exec detail'));

    const failure = await createCoordinator(events, { io })
      .execute(coordinatorInput())
      .catch((error: unknown) => error);

    expect(failure).toMatchObject({
      phase: 'execute',
      code: 'UNEXPECTED',
      cleanup: {
        complete: true,
        containerAbsent: true,
        stopAttempted: true,
      },
    });
    expect(String(failure)).not.toContain('private exec detail');
    expect(events).toEqual([
      'prepare',
      'create',
      'start:container123',
      'execute:container123',
      'stats:container123',
      'abort',
      'inspect:container123',
      'stop:container123:5',
      'remove:container123',
    ]);
  });

  it('cleans after output collection failure and reports the collect phase', async () => {
    const events: string[] = [];
    const outputs = new FakeOutputs(events, undefined, new Error('private Artifact detail'));

    const failure = await createCoordinator(events, { outputs })
      .execute(coordinatorInput())
      .catch((error: unknown) => error);

    expect(failure).toMatchObject({
      phase: 'collect',
      code: 'UNEXPECTED',
      cleanup: { complete: true },
    });
    expect(String(failure)).not.toContain('private Artifact detail');
    expect(events.slice(-3)).toEqual(['collect:container123', 'abort', 'remove:container123']);
  });

  it('turns cleanup failure into a terminal cleanup result without retrying cleanup', async () => {
    const events: string[] = [];
    const engine = new FakeEngine(events, {
      removeError: commandFailure('remove'),
    });

    const result = await createCoordinator(events, { engine }).execute(coordinatorInput());

    expect(result).toMatchObject({
      status: 'failed',
      error: {
        code: 'EXECUTION_CLEANUP_FAILED',
        details: {
          cleanupFailureStage: 'remove',
          cleanupFailureCode: 'DOCKER_COMMAND_FAILED',
        },
      },
    });
    expect(events.filter((event) => event === 'remove:container123')).toHaveLength(1);
  });

  it('does not stop a container already absent during failure cleanup', async () => {
    const events: string[] = [];
    const engine = new FakeEngine(events, {
      startError: commandFailure('start'),
      inspection: null,
    });

    const failure = await createCoordinator(events, { engine })
      .execute(coordinatorInput())
      .catch((error: unknown) => error);

    expect(failure).toMatchObject({
      cleanup: {
        complete: true,
        containerAbsent: true,
        stopAttempted: false,
      },
    });
    expect(events).not.toContain('stop:container123:5');
    expect(events).not.toContain('remove:container123');
  });

  it('fails closed and aborts output when the execution container disappears before terminal inspection', async () => {
    const events: string[] = [];
    const engine = new FakeEngine(events, {
      inspectionSequence: [null, null],
    });

    const failure = await createCoordinator(events, { engine })
      .execute(coordinatorInput())
      .catch((error: unknown) => error);

    expect(failure).toMatchObject({
      phase: 'inspect',
      code: 'DOCKER_INVALID_RESPONSE',
      cleanup: {
        complete: true,
        containerAbsent: true,
        stopAttempted: false,
      },
    });
    expect(events).toEqual([
      'prepare',
      'create',
      'start:container123',
      'execute:container123',
      'stats:container123',
      'inspect:container123',
      'abort',
      'inspect:container123',
    ]);
  });

  it.each([
    [
      'reserved managed label',
      { createInput: createInput({ labels: { 'hypha.execution.managed': 'false' } }) },
      'reserved label',
    ],
    [
      'working-directory mismatch',
      { execInput: { ...execInput(), workingDirectory: '/other' } },
      'working directories must match',
    ],
    ['invalid scope', { scopeId: '--all' }, 'scopeId is invalid'],
    ['negative cleanup timeout', { cleanupStopTimeoutSeconds: -1 }, 'non-negative safe integer'],
    [
      'invalid exec timeout',
      { execInput: { ...execInput(), timeoutMs: 0 } },
      'timeoutMs must be a positive safe integer',
    ],
  ])('rejects %s before creating a container', async (_name, override, message) => {
    const events: string[] = [];
    const candidate = coordinatorInput(override as Partial<DockerExecutionCoordinatorInput>);

    await expect(createCoordinator(events).execute(candidate)).rejects.toThrow(message);
    expect(events).toEqual([]);
  });
});

interface CoordinatorOverrides {
  engine?: FakeEngine;
  io?: FakeIo;
  accounting?: FakeAccounting;
  outputs?: FakeOutputs;
}

function createCoordinator(
  events: string[],
  overrides: CoordinatorOverrides = {}
): DockerExecutionCoordinator {
  return new DockerExecutionCoordinator(
    overrides.engine ?? new FakeEngine(events),
    overrides.io ?? new FakeIo(events),
    overrides.accounting ?? new FakeAccounting(events),
    overrides.outputs ?? new FakeOutputs(events)
  );
}

function coordinatorInput(
  overrides: Partial<DockerExecutionCoordinatorInput> = {}
): DockerExecutionCoordinatorInput {
  return {
    providerId: 'provider.docker',
    executionId: 'execution.docker.1',
    revision: 3,
    sandboxId: 'sandbox.docker.1',
    scopeId: 'server-a',
    createInput: createInput(),
    execInput: execInput(),
    cleanupStopTimeoutSeconds: 5,
    ...overrides,
  };
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
    workspaceMount: {
      source: 'D:\\workspace',
      target: '/workspace',
      readOnly: false,
    },
    networkMode: 'none',
    readOnlyRoot: true,
    labels: { custom: 'value' },
    command: ['sleep', 'infinity'],
    ...overrides,
  };
}

function execInput(): Omit<DockerContainerExecInput, 'containerReference'> {
  return {
    executable: 'node',
    args: ['-e', "process.stdout.write('ok')"],
    workingDirectory: '/workspace',
    environment: {},
    timeoutMs: 10_000,
    maxStdoutBytes: 1024,
    maxStderrBytes: 1024,
    maxCombinedOutputBytes: 2048,
    signal: new AbortController().signal,
  };
}

interface FakeEngineOptions {
  startError?: Error;
  inspection?: DockerContainerInspection | null;
  stopError?: Error;
  removeError?: Error;
  inspectionSequence?: Array<DockerContainerInspection | null>;
}

class FakeEngine implements DockerEngineClient {
  created?: DockerContainerCreateInput;
  private running = false;
  private removed = false;

  constructor(
    private readonly events: string[],
    private readonly options: FakeEngineOptions = {}
  ) {}

  async createContainer(input: DockerContainerCreateInput): Promise<string> {
    this.events.push('create');
    this.created = input;
    this.removed = false;
    return 'container123';
  }

  async startContainer(reference: string): Promise<void> {
    this.events.push(`start:${reference}`);
    if (this.options.startError) throw this.options.startError;
    this.running = true;
  }

  async inspectContainer(reference: string): Promise<DockerContainerInspection | null> {
    this.events.push(`inspect:${reference}`);
    if (this.removed) return null;
    const sequence = this.options.inspectionSequence;
    if (sequence && sequence.length > 0) {
      return sequence.shift() ?? null;
    }
    const configured =
      this.options.inspection === undefined ? inspection({ running: this.running }) : this.options.inspection;
    return configured;
  }

  async stopContainer(reference: string, timeoutSeconds: number): Promise<void> {
    this.events.push(`stop:${reference}:${timeoutSeconds}`);
    if (this.options.stopError) throw this.options.stopError;
    this.running = false;
  }

  async removeContainer(reference: string): Promise<void> {
    this.events.push(`remove:${reference}`);
    if (this.options.removeError) throw this.options.removeError;
    this.removed = true;
    this.running = false;
  }
}

class FakeIo implements DockerContainerIo {
  constructor(
    private readonly events: string[],
    private readonly value: DockerCliResult = processResult(),
    private readonly error?: Error,
    private readonly outputEvent?: LocalProcessOutputEvent
  ) {}

  async execute(input: DockerContainerExecInput): Promise<DockerCliResult> {
    this.events.push(`execute:${input.containerReference}`);
    if (this.error) throw this.error;
    if (this.outputEvent) await input.onOutput?.(this.outputEvent);
    return this.value;
  }
}

class FakeAccounting implements DockerResourceAccounting {
  constructor(
    private readonly events: string[],
    private readonly value: DockerResourceSnapshot = resourceSnapshot(),
    private readonly error?: Error
  ) {}

  async snapshot(
    containerReference: string,
    _signal: AbortSignal
  ): Promise<DockerResourceSnapshot> {
    this.events.push(`stats:${containerReference}`);
    if (this.error) throw this.error;
    return this.value;
  }
}

class FakeOutputs implements DockerExecutionOutputCollector, DockerExecutionOutputSession {
  constructor(
    private readonly events: string[],
    private readonly value: DockerExecutionCollectedOutputs = {
      changedFiles: [],
      generatedArtifactRefs: [],
    },
    private readonly error?: Error
  ) {}

  async prepare(_input: {
    executionId: string;
    workspaceRoot: string;
  }): Promise<DockerExecutionOutputSession> {
    this.events.push('prepare');
    return this;
  }

  async onOutput(event: LocalProcessOutputEvent): Promise<void> {
    this.events.push(`output-session:${event.stream}`);
  }

  async collect(input: {
    executionId: string;
    containerReference: string;
    processResult: DockerCliResult;
  }): Promise<DockerExecutionCollectedOutputs> {
    this.events.push(`collect:${input.containerReference}`);
    if (this.error) throw this.error;
    return this.value;
  }

  async abort(_error: unknown): Promise<void> {
    this.events.push('abort');
  }
}

function processResult(): DockerCliResult {
  return {
    outcome: 'exited',
    exitCode: 0,
    stdout: 'ok',
    stderr: '',
    observedStdoutBytes: 2,
    observedStderrBytes: 0,
    startedAt: '2026-07-27T00:00:00.000Z',
    completedAt: '2026-07-27T00:00:01.000Z',
    latencyMs: 1_000,
    terminationMechanism: 'posix_process_group',
    processTreeTerminationVerified: true,
  };
}

function resourceSnapshot(): DockerResourceSnapshot {
  return {
    containerReference: 'container123',
    cpuPercent: 1,
    memoryUsageBytes: 1_048_576,
    memoryLimitBytes: 134_217_728,
    memoryPercent: 0.78,
    processCount: 2,
    blockReadBytes: 0,
    blockWriteBytes: 0,
  };
}

function inspection(overrides: Partial<DockerContainerInspection> = {}): DockerContainerInspection {
  return {
    id: 'container123',
    running: true,
    oomKilled: false,
    status: 'running',
    exitCode: 0,
    imageDigest: digest,
    ...overrides,
  };
}

function commandFailure(command: string): DockerEngineClientError {
  return new DockerEngineClientError('Docker command failed.', 'DOCKER_COMMAND_FAILED', command);
}
