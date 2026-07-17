import { LocalProcessSupervisor } from './local-process-supervisor';

export interface DockerCliRequest {
  args: string[];
  stdin?: string | Uint8Array;
  timeoutMs: number;
  idleTimeoutMs?: number;
  maxStdoutBytes: number;
  maxStderrBytes: number;
  maxCombinedOutputBytes: number;
  signal: AbortSignal;
}

export interface DockerCliResult {
  outcome:
    | 'exited'
    | 'start_failed'
    | 'cancelled'
    | 'timed_out'
    | 'idle_timed_out'
    | 'output_limit';
  exitCode: number | null;
  stdout: string;
  stderr: string;
  observedStdoutBytes: number;
  observedStderrBytes: number;
  startedAt: string;
  completedAt: string;
  latencyMs: number;
  outputLimitStream?: 'stdout' | 'stderr' | 'combined';
}

export interface DockerCommandTransport {
  run(request: DockerCliRequest): Promise<DockerCliResult>;
}

export interface DockerCliTransportOptions {
  dockerPath?: string;
  gracefulTerminationMs?: number;
  supervisor?: LocalProcessSupervisor;
}

/** Shell-free Docker CLI transport; container lifecycle remains owned by DockerEngineClient. */
export class DockerCliTransport implements DockerCommandTransport {
  private readonly dockerPath: string;
  private readonly gracefulTerminationMs: number;
  private readonly supervisor: LocalProcessSupervisor;

  constructor(options: DockerCliTransportOptions = {}) {
    this.dockerPath = options.dockerPath ?? 'docker';
    this.gracefulTerminationMs = nonNegativeInteger(
      options.gracefulTerminationMs ?? 100,
      'gracefulTerminationMs'
    );
    this.supervisor = options.supervisor ?? new LocalProcessSupervisor();
  }

  async run(request: DockerCliRequest): Promise<DockerCliResult> {
    validateRequest(request);
    const result = await this.supervisor.run({
      executable: this.dockerPath,
      args: request.args,
      cwd: process.cwd(),
      environment: {},
      ...(request.stdin !== undefined ? { stdin: request.stdin } : {}),
      timeoutMs: request.timeoutMs,
      ...(request.idleTimeoutMs ? { idleTimeoutMs: request.idleTimeoutMs } : {}),
      maxStdoutBytes: request.maxStdoutBytes,
      maxStderrBytes: request.maxStderrBytes,
      maxCombinedOutputBytes: request.maxCombinedOutputBytes,
      gracefulTerminationMs: this.gracefulTerminationMs,
      signal: request.signal,
    });
    return {
      outcome: result.outcome,
      exitCode: result.exitCode,
      stdout: result.stdout,
      stderr: result.stderr,
      observedStdoutBytes: result.observedStdoutBytes,
      observedStderrBytes: result.observedStderrBytes,
      startedAt: result.startedAt,
      completedAt: result.completedAt,
      latencyMs: result.latencyMs,
      ...(result.outputLimitStream ? { outputLimitStream: result.outputLimitStream } : {}),
    };
  }
}

function validateRequest(request: DockerCliRequest): void {
  if (!request.args.length || request.args.some((argument) => argument.includes('\u0000'))) {
    throw new Error('Docker CLI args must be non-empty and contain no NUL bytes.');
  }
  for (const [name, value] of Object.entries({
    timeoutMs: request.timeoutMs,
    maxStdoutBytes: request.maxStdoutBytes,
    maxStderrBytes: request.maxStderrBytes,
    maxCombinedOutputBytes: request.maxCombinedOutputBytes,
  })) {
    if (!Number.isInteger(value) || value <= 0)
      throw new Error(`${name} must be a positive integer.`);
  }
}

function nonNegativeInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value < 0)
    throw new Error(`${name} must be a non-negative integer.`);
  return value;
}
