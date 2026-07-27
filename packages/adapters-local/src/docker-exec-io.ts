import {
  validateDockerCliRequest,
  type DockerCliResult,
  type DockerCommandTransport,
} from './docker-cli-transport';
import { validateContainerPath, validateLiteralArgv, validContainerReference } from './docker-engine-boundary';
import type { LocalProcessOutputEvent } from './local-process-supervisor';

export interface DockerContainerExecInput {
  containerReference: string;
  executable: string;
  args: string[];
  workingDirectory: string;
  /**
   * Values are emitted as Docker CLI argv and must already be policy-approved,
   * non-secret values. Secrets require a separate controlled injection mechanism.
   */
  environment: Record<string, string>;
  stdin?: string | Uint8Array;
  timeoutMs: number;
  idleTimeoutMs?: number;
  maxStdoutBytes: number;
  maxStderrBytes: number;
  maxCombinedOutputBytes: number;
  signal: AbortSignal;
  onOutput?: (event: LocalProcessOutputEvent) => void | Promise<void>;
}

export interface DockerContainerIo {
  execute(input: DockerContainerExecInput): Promise<DockerCliResult>;
}

/**
 * Internal container I/O component. It does not own lifecycle, policy,
 * Workspace mounts, Provider receipts, or capability registration.
 */
export class DockerExecIo implements DockerContainerIo {
  constructor(private readonly transport: DockerCommandTransport) {}

  async execute(input: DockerContainerExecInput): Promise<DockerCliResult> {
    validateExecInput(input);
    const args = ['exec', '--workdir', input.workingDirectory];
    for (const [name, value] of Object.entries(input.environment).sort(([left], [right]) =>
      left.localeCompare(right)
    )) {
      args.push('--env', `${name}=${value}`);
    }
    if (input.stdin !== undefined) args.push('--interactive');
    args.push(input.containerReference, input.executable, ...input.args);

    const request = {
      args,
      ...(input.stdin !== undefined ? { stdin: input.stdin } : {}),
      timeoutMs: input.timeoutMs,
      ...(input.idleTimeoutMs !== undefined ? { idleTimeoutMs: input.idleTimeoutMs } : {}),
      maxStdoutBytes: input.maxStdoutBytes,
      maxStderrBytes: input.maxStderrBytes,
      maxCombinedOutputBytes: input.maxCombinedOutputBytes,
      signal: input.signal,
      ...(input.onOutput ? { onOutput: input.onOutput } : {}),
    };
    validateDockerCliRequest(request);
    return this.transport.run(request);
  }
}

function validateExecInput(input: DockerContainerExecInput): void {
  if (!isPlainRecord(input)) throw new TypeError('Docker exec input must be an object.');
  validContainerReference(input.containerReference);
  nonEmptyNoNul(input.executable, 'Docker executable');
  validateLiteralArgv(input.args, 'Docker executable args', true);
  validateContainerPath(input.workingDirectory, 'working directory');
  validateEnvironment(input.environment);
}

function validateEnvironment(value: unknown): asserts value is Record<string, string> {
  if (!isPlainRecord(value)) {
    throw new TypeError('Docker environment must be a plain record.');
  }
  for (const [name, entry] of Object.entries(value)) {
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
      throw new TypeError('Docker environment name is invalid.');
    }
    if (typeof entry !== 'string' || entry.includes('\u0000')) {
      throw new TypeError('Docker environment values must be strings containing no NUL bytes.');
    }
  }
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function nonEmptyNoNul(value: unknown, name: string): string {
  if (typeof value !== 'string' || value.trim().length === 0 || value.includes('\u0000')) {
    throw new TypeError(`${name} must be a non-empty string containing no NUL bytes.`);
  }
  return value;
}
