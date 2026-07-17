import { execFile } from 'node:child_process';
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export type LocalProcessOutcome =
  | 'exited'
  | 'start_failed'
  | 'cancelled'
  | 'timed_out'
  | 'idle_timed_out'
  | 'output_limit';

export interface LocalProcessRunRequest {
  executable: string;
  args: string[];
  cwd: string;
  environment: NodeJS.ProcessEnv;
  stdin?: string | Uint8Array;
  timeoutMs: number;
  idleTimeoutMs?: number;
  maxStdoutBytes: number;
  maxStderrBytes: number;
  maxCombinedOutputBytes: number;
  gracefulTerminationMs: number;
  signal: AbortSignal;
}

export interface LocalProcessRunResult {
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
  terminationMechanism: 'posix_process_group' | 'windows_taskkill';
  processTreeTerminationVerified: boolean;
  startError?: Error;
}

export interface LocalProcessSupervisorOptions {
  now?: () => string;
  monotonicNow?: () => number;
  taskkillPath?: string;
}

export class LocalProcessSupervisor {
  readonly terminationMechanism =
    process.platform === 'win32' ? 'windows_taskkill' : 'posix_process_group';
  readonly processTreeKillVerified = process.platform !== 'win32';

  private readonly now: () => string;
  private readonly monotonicNow: () => number;
  private readonly taskkillPath: string;

  constructor(options: LocalProcessSupervisorOptions = {}) {
    this.now = options.now ?? (() => new Date().toISOString());
    this.monotonicNow = options.monotonicNow ?? (() => performance.now());
    this.taskkillPath = options.taskkillPath ?? 'taskkill.exe';
  }

  run(request: LocalProcessRunRequest): Promise<LocalProcessRunResult> {
    validateRunRequest(request);
    const startedAt = this.now();
    const startedTick = this.monotonicNow();
    return new Promise<LocalProcessRunResult>((resolve) => {
      let child: ChildProcessWithoutNullStreams;
      let settled = false;
      let terminationOutcome: Exclude<LocalProcessOutcome, 'exited' | 'start_failed'> | undefined;
      let outputLimitStream: LocalProcessRunResult['outputLimitStream'];
      let terminationPromise: Promise<boolean> | undefined;
      let timeout: NodeJS.Timeout | undefined;
      let idleTimeout: NodeJS.Timeout | undefined;
      let observedStdoutBytes = 0;
      let observedStderrBytes = 0;
      const stdout: Buffer[] = [];
      const stderr: Buffer[] = [];
      let capturedStdoutBytes = 0;
      let capturedStderrBytes = 0;

      const requestTermination = (
        outcome: Exclude<LocalProcessOutcome, 'exited' | 'start_failed'>
      ): void => {
        if (terminationOutcome) return;
        terminationOutcome = outcome;
        if (child.pid) {
          terminationPromise = this.terminateScope(child.pid, request.gracefulTerminationMs);
        }
      };

      const resetIdleTimeout = (): void => {
        if (!request.idleTimeoutMs) return;
        if (idleTimeout) clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => requestTermination('idle_timed_out'), request.idleTimeoutMs);
      };

      const appendOutput = (stream: 'stdout' | 'stderr', chunk: Buffer): void => {
        if (stream === 'stdout') observedStdoutBytes += chunk.byteLength;
        else observedStderrBytes += chunk.byteLength;
        const observedCombined = observedStdoutBytes + observedStderrBytes;
        const currentBytes = stream === 'stdout' ? capturedStdoutBytes : capturedStderrBytes;
        const streamLimit = stream === 'stdout' ? request.maxStdoutBytes : request.maxStderrBytes;
        const capturedCombined = capturedStdoutBytes + capturedStderrBytes;
        const remaining = Math.max(
          0,
          Math.min(streamLimit - currentBytes, request.maxCombinedOutputBytes - capturedCombined)
        );
        if (remaining > 0) {
          const captured = chunk.subarray(0, remaining);
          if (stream === 'stdout') {
            stdout.push(captured);
            capturedStdoutBytes += captured.byteLength;
          } else {
            stderr.push(captured);
            capturedStderrBytes += captured.byteLength;
          }
        }
        if (observedCombined > request.maxCombinedOutputBytes) {
          outputLimitStream = 'combined';
          requestTermination('output_limit');
        } else if (
          (stream === 'stdout' ? observedStdoutBytes : observedStderrBytes) > streamLimit
        ) {
          outputLimitStream = stream;
          requestTermination('output_limit');
        }
        resetIdleTimeout();
      };

      const clearTimers = (): void => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = undefined;
        }
        if (idleTimeout) {
          clearTimeout(idleTimeout);
          idleTimeout = undefined;
        }
      };

      const finish = async (
        exitCode: number | null,
        signal: NodeJS.Signals | null,
        startError?: Error
      ): Promise<void> => {
        if (settled) return;
        settled = true;
        clearTimers();
        request.signal.removeEventListener('abort', onAbort);
        let terminationVerified = false;
        if (terminationPromise) {
          terminationVerified = await terminationPromise;
        } else if (child.pid && this.processTreeKillVerified) {
          terminationVerified = await this.reconcileCompletedScope(
            child.pid,
            request.gracefulTerminationMs
          );
        }
        const completedAt = this.now();
        resolve({
          outcome: startError ? 'start_failed' : (terminationOutcome ?? 'exited'),
          exitCode,
          ...(signal ? { signal } : {}),
          stdout: Buffer.concat(stdout).toString('utf8'),
          stderr: Buffer.concat(stderr).toString('utf8'),
          ...(outputLimitStream ? { outputLimitStream } : {}),
          observedStdoutBytes,
          observedStderrBytes,
          startedAt,
          completedAt,
          latencyMs: Math.max(0, this.monotonicNow() - startedTick),
          ...(child.pid ? { processId: child.pid } : {}),
          terminationMechanism: this.terminationMechanism,
          processTreeTerminationVerified: terminationVerified,
          ...(startError ? { startError } : {}),
        });
      };

      const onAbort = (): void => requestTermination('cancelled');

      try {
        child = spawn(request.executable, request.args, {
          cwd: request.cwd,
          env: request.environment,
          shell: false,
          windowsHide: true,
          detached: process.platform !== 'win32',
          stdio: ['pipe', 'pipe', 'pipe'],
        });
      } catch (error) {
        child = emptyChildProcess();
        void finish(null, null, asError(error));
        return;
      }

      request.signal.addEventListener('abort', onAbort, { once: true });
      child.stdout.on('data', (chunk: Buffer) => appendOutput('stdout', chunk));
      child.stderr.on('data', (chunk: Buffer) => appendOutput('stderr', chunk));
      child.once('error', (error) => void finish(null, null, asError(error)));
      child.once('close', (exitCode, signal) => void finish(exitCode, signal));

      timeout = setTimeout(() => requestTermination('timed_out'), request.timeoutMs);
      resetIdleTimeout();
      if (request.signal.aborted) onAbort();
      if (request.stdin !== undefined) child.stdin.end(request.stdin);
      else child.stdin.end();
    });
  }

  private async reconcileCompletedScope(
    pid: number,
    gracefulTerminationMs: number
  ): Promise<boolean> {
    if (!this.isPosixScopeAlive(pid)) return true;
    return this.terminatePosixScope(pid, gracefulTerminationMs);
  }

  private async terminateScope(pid: number, gracefulTerminationMs: number): Promise<boolean> {
    return process.platform === 'win32'
      ? this.terminateWindowsTree(pid, gracefulTerminationMs)
      : this.terminatePosixScope(pid, gracefulTerminationMs);
  }

  private async terminatePosixScope(pid: number, gracefulTerminationMs: number): Promise<boolean> {
    signalPosixScope(pid, 'SIGTERM');
    await delay(gracefulTerminationMs);
    if (this.isPosixScopeAlive(pid)) {
      signalPosixScope(pid, 'SIGKILL');
      await delay(Math.min(100, Math.max(10, gracefulTerminationMs)));
    }
    return !this.isPosixScopeAlive(pid);
  }

  private isPosixScopeAlive(pid: number): boolean {
    if (process.platform === 'win32') return false;
    try {
      process.kill(-pid, 0);
      return true;
    } catch (error) {
      return (error as NodeJS.ErrnoException).code === 'EPERM';
    }
  }

  private async terminateWindowsTree(pid: number, gracefulTerminationMs: number): Promise<boolean> {
    await delay(gracefulTerminationMs);
    await this.runTaskkill(pid, true);
    try {
      process.kill(pid, 'SIGKILL');
    } catch {
      // taskkill may already have removed the direct child.
    }
    return false;
  }

  private async runTaskkill(pid: number, force: boolean): Promise<void> {
    try {
      await execFileAsync(
        this.taskkillPath,
        ['/PID', String(pid), '/T', ...(force ? ['/F'] : [])],
        { timeout: 1_000, windowsHide: true }
      );
    } catch {
      // A missing process is already terminated; Windows Job Object verification remains false.
    }
  }
}

function validateRunRequest(request: LocalProcessRunRequest): void {
  for (const [name, value] of Object.entries({
    timeoutMs: request.timeoutMs,
    maxStdoutBytes: request.maxStdoutBytes,
    maxStderrBytes: request.maxStderrBytes,
    maxCombinedOutputBytes: request.maxCombinedOutputBytes,
  })) {
    if (!Number.isInteger(value) || value <= 0)
      throw new Error(`${name} must be a positive integer.`);
  }
  if (!Number.isInteger(request.gracefulTerminationMs) || request.gracefulTerminationMs < 0) {
    throw new Error('gracefulTerminationMs must be a non-negative integer.');
  }
  if (
    request.idleTimeoutMs !== undefined &&
    (!Number.isInteger(request.idleTimeoutMs) || request.idleTimeoutMs <= 0)
  ) {
    throw new Error('idleTimeoutMs must be a positive integer when provided.');
  }
}

function signalPosixScope(pid: number, signal: NodeJS.Signals): void {
  try {
    process.kill(-pid, signal);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ESRCH') throw error;
  }
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function asError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}

function emptyChildProcess(): ChildProcessWithoutNullStreams {
  return { pid: undefined } as unknown as ChildProcessWithoutNullStreams;
}
