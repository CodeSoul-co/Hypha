import {
  LocalProcessSupervisor,
  type LocalProcessOutcome,
  type LocalProcessOutputEvent,
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
  onOutput?: (event: LocalProcessOutputEvent) => void | Promise<void>;
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
  terminationErrorName?: string;
  terminationErrorMessage?: string;
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
 * Internal shell-free transport for a future Docker Engine adapter.
 * It does not register a Provider or imply that Docker capabilities exist.
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
    this.gracefulTerminationMs = nonNegativeSafeInteger(
      options.gracefulTerminationMs ?? 100,
      'gracefulTerminationMs'
    );
    this.supervisor = options.supervisor ?? new LocalProcessSupervisor();
  }

  async run(request: DockerCliRequest): Promise<DockerCliResult> {
    validateRequest(request);
    const { startError, terminationError, ...result } = await this.supervisor.run({
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
      ...(request.onOutput ? { onOutput: request.onOutput } : {}),
    });
    const startErrorCode = startError ? errorCode(startError) : undefined;

    return {
      ...result,
      ...(startError
        ? {
            ...(startErrorCode ? { startErrorCode } : {}),
            startErrorMessage: startError.message,
          }
        : {}),
      ...(terminationError
        ? {
            terminationErrorName: terminationError.name,
            terminationErrorMessage: terminationError.message,
          }
        : {}),
    };
  }
}

function errorCode(error: Error): string | undefined {
  return 'code' in error && typeof error.code === 'string' ? error.code : undefined;
}

function validateRequest(request: DockerCliRequest): void {
  if (!request || typeof request !== 'object') {
    throw new TypeError('Docker CLI request must be an object.');
  }
  if (!Array.isArray(request.args) || request.args.length === 0) {
    throw new TypeError('Docker CLI args must be a non-empty array.');
  }
  if (request.args.some((argument) => typeof argument !== 'string')) {
    throw new TypeError('Docker CLI args must contain only strings.');
  }
  if (request.args.some((argument) => argument.includes('\u0000'))) {
    throw new TypeError('Docker CLI args must contain no NUL bytes.');
  }
  if (
    request.stdin !== undefined &&
    typeof request.stdin !== 'string' &&
    !(request.stdin instanceof Uint8Array)
  ) {
    throw new TypeError('Docker CLI stdin must be a string or Uint8Array when provided.');
  }
  if (!isAbortSignal(request.signal)) {
    throw new TypeError('Docker CLI signal must be an AbortSignal.');
  }
  if (request.onOutput !== undefined && typeof request.onOutput !== 'function') {
    throw new TypeError('Docker CLI onOutput must be a function when provided.');
  }

  positiveSafeInteger(request.timeoutMs, 'timeoutMs');
  if (request.idleTimeoutMs !== undefined) {
    positiveSafeInteger(request.idleTimeoutMs, 'idleTimeoutMs');
  }
  positiveSafeInteger(request.maxStdoutBytes, 'maxStdoutBytes');
  positiveSafeInteger(request.maxStderrBytes, 'maxStderrBytes');
  positiveSafeInteger(request.maxCombinedOutputBytes, 'maxCombinedOutputBytes');
}

function isAbortSignal(value: unknown): value is AbortSignal {
  return (
    value !== null &&
    typeof value === 'object' &&
    'aborted' in value &&
    typeof value.aborted === 'boolean' &&
    'addEventListener' in value &&
    typeof value.addEventListener === 'function' &&
    'removeEventListener' in value &&
    typeof value.removeEventListener === 'function'
  );
}

function positiveSafeInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer.`);
  }
  return value;
}

function nonNegativeSafeInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative safe integer.`);
  }
  return value;
}

function nonEmptyStringWithoutNul(value: string, name: string): string {
  if (typeof value !== 'string' || value.trim().length === 0 || value.includes('\u0000')) {
    throw new TypeError(`${name} must be a non-empty string containing no NUL bytes.`);
  }
  return value;
}
