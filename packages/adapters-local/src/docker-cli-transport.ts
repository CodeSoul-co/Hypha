import {
  LocalProcessSupervisor,
  type LocalProcessOutcome,
  type LocalProcessRunResult,
} from './local-process-supervisor';

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
  outcome: LocalProcessOutcome;
  exitCode: number | null;
  signal?: string;
  stdout: string;
  stderr: string;
  outputLimitStream?: 'stdout' | 'stderr' | 'combined';
  observedStdoutBytes: number;
  observedStderrBytes: number;
  startedAt: string;
  completedAt: string;
  latencyMs: number;
  processId?: number;
  terminationMechanism: LocalProcessRunResult['terminationMechanism'];
  processTreeTerminationVerified: boolean;
  startErrorCode?: string;
  startErrorMessage?: string;
}

export interface DockerCommandTransport {
  run(request: DockerCliRequest): Promise<DockerCliResult>;
}

export interface DockerCliTransportOptions {
  dockerPath?: string;
  workingDirectory?: string;
  gracefulTerminationMs?: number;
  supervisor?: Pick<LocalProcessSupervisor, 'run'>;
}

/**
 * Shell-free, environment-isolated Docker CLI transport.
 *
 * Container lifecycle and Docker policy remain the responsibility of higher-level adapters.
 */
export class DockerCliTransport implements DockerCommandTransport {
  private readonly dockerPath: string;
  private readonly workingDirectory: string;
  private readonly gracefulTerminationMs: number;
  private readonly supervisor: Pick<LocalProcessSupervisor, 'run'>;

  constructor(options: DockerCliTransportOptions = {}) {
    this.dockerPath = nonEmptyStringWithoutNul(options.dockerPath ?? 'docker', 'dockerPath');
    this.workingDirectory = nonEmptyStringWithoutNul(
      options.workingDirectory ?? process.cwd(),
      'workingDirectory'
    );
    this.gracefulTerminationMs = nonNegativeInteger(
      options.gracefulTerminationMs ?? 100,
      'gracefulTerminationMs'
    );
    this.supervisor = options.supervisor ?? new LocalProcessSupervisor();
  }

  async run(request: DockerCliRequest): Promise<DockerCliResult> {
    validateRequest(request);
    const { startError, ...result } = await this.supervisor.run({
      executable: this.dockerPath,
      args: [...request.args],
      cwd: this.workingDirectory,
      environment: {},
      ...(request.stdin !== undefined ? { stdin: request.stdin } : {}),
      timeoutMs: request.timeoutMs,
      ...(request.idleTimeoutMs !== undefined ? { idleTimeoutMs: request.idleTimeoutMs } : {}),
      maxStdoutBytes: request.maxStdoutBytes,
      maxStderrBytes: request.maxStderrBytes,
      maxCombinedOutputBytes: request.maxCombinedOutputBytes,
      gracefulTerminationMs: this.gracefulTerminationMs,
      signal: request.signal,
    });

    return {
      ...result,
      ...(startError
        ? {
            startErrorCode: (startError as NodeJS.ErrnoException).code,
            startErrorMessage: startError.message,
          }
        : {}),
    };
  }
}

function validateRequest(request: DockerCliRequest): void {
  if (!request || typeof request !== 'object') {
    throw new Error('Docker CLI request must be an object.');
  }
  if (!Array.isArray(request.args) || request.args.length === 0) {
    throw new Error('Docker CLI args must be a non-empty array.');
  }
  if (request.args.some((argument) => typeof argument !== 'string')) {
    throw new Error('Docker CLI args must contain only strings.');
  }
  if (request.args.some((argument) => argument.includes('\u0000'))) {
    throw new Error('Docker CLI args must contain no NUL bytes.');
  }
  if (
    request.stdin !== undefined &&
    typeof request.stdin !== 'string' &&
    !(request.stdin instanceof Uint8Array)
  ) {
    throw new Error('Docker CLI stdin must be a string or Uint8Array when provided.');
  }
  if (!isAbortSignal(request.signal)) {
    throw new Error('Docker CLI signal must be an AbortSignal.');
  }

  positiveInteger(request.timeoutMs, 'timeoutMs');
  if (request.idleTimeoutMs !== undefined) {
    positiveInteger(request.idleTimeoutMs, 'idleTimeoutMs');
  }
  positiveInteger(request.maxStdoutBytes, 'maxStdoutBytes');
  positiveInteger(request.maxStderrBytes, 'maxStderrBytes');
  positiveInteger(request.maxCombinedOutputBytes, 'maxCombinedOutputBytes');
}

function isAbortSignal(value: unknown): value is AbortSignal {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<AbortSignal>;
  return (
    typeof candidate.aborted === 'boolean' &&
    typeof candidate.addEventListener === 'function' &&
    typeof candidate.removeEventListener === 'function'
  );
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer.`);
  }
  return value;
}

function nonNegativeInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${name} must be a non-negative integer.`);
  }
  return value;
}

function nonEmptyStringWithoutNul(value: string, name: string): string {
  if (typeof value !== 'string' || value.trim().length === 0 || value.includes('\u0000')) {
    throw new Error(`${name} must be a non-empty string containing no NUL bytes.`);
  }
  return value;
}
