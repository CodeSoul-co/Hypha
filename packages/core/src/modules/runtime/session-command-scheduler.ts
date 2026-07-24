import type { SessionQueueScope } from '../../contracts/session-queue';
import { FrameworkError } from '../../errors';
import type { SessionCommandWorkerResult } from './session-command-worker';

export interface SessionCommandProcessor {
  processNext(scope?: SessionQueueScope, signal?: AbortSignal): Promise<SessionCommandWorkerResult>;
}

export interface DurableSessionCommandSchedulerOptions {
  worker: SessionCommandProcessor;
  pollIntervalMs?: number;
  errorBackoffMs?: number;
  shutdownDrainMs?: number;
  wait?: (delayMs: number, signal: AbortSignal) => Promise<void>;
  onResult?: (result: SessionCommandWorkerResult) => void;
  onError?: (error: unknown) => void;
}

export interface RunSessionCommandSchedulerRequest {
  signal: AbortSignal;
  scope?: SessionQueueScope;
}

export interface SessionCommandSchedulerResult {
  processed: number;
  idlePolls: number;
  errors: number;
}

/**
 * Repeatedly invokes a single-command processor until shutdown is requested.
 * Abort stops new claims, wakes idle waits, and lets an in-flight handler drain.
 */
export class DurableSessionCommandScheduler {
  private readonly pollIntervalMs: number;
  private readonly errorBackoffMs: number;
  private readonly shutdownDrainMs: number;
  private readonly wait: (delayMs: number, signal: AbortSignal) => Promise<void>;
  private running = false;

  constructor(private readonly options: DurableSessionCommandSchedulerOptions) {
    this.pollIntervalMs = positiveInteger(options.pollIntervalMs ?? 100, 'pollIntervalMs');
    this.errorBackoffMs = positiveInteger(options.errorBackoffMs ?? 1_000, 'errorBackoffMs');
    this.shutdownDrainMs = nonNegativeInteger(options.shutdownDrainMs ?? 30_000, 'shutdownDrainMs');
    this.wait = options.wait ?? abortableDelay;
  }

  async run(request: RunSessionCommandSchedulerRequest): Promise<SessionCommandSchedulerResult> {
    if (!(request.signal instanceof AbortSignal)) invalid('signal must be an AbortSignal');
    if (this.running) {
      throw new FrameworkError({
        code: 'RUNTIME_SESSION_QUEUE_CONFLICT',
        message: 'Session Command Scheduler is already running',
      });
    }

    this.running = true;
    const summary: SessionCommandSchedulerResult = { processed: 0, idlePolls: 0, errors: 0 };
    try {
      while (!request.signal.aborted) {
        try {
          const result = await this.processNextWithDrainDeadline(request);
          notify(() => this.options.onResult?.(result));
          if (result.disposition === 'idle') {
            summary.idlePolls += 1;
            if (!request.signal.aborted) {
              await this.wait(this.pollIntervalMs, request.signal);
            }
          } else if (result.disposition !== 'aborted') {
            summary.processed += 1;
          }
        } catch (error) {
          summary.errors += 1;
          notify(() => this.options.onError?.(error));
          if (!request.signal.aborted) {
            await this.wait(this.errorBackoffMs, request.signal);
          }
        }
      }
      return summary;
    } finally {
      this.running = false;
    }
  }

  private async processNextWithDrainDeadline(
    request: RunSessionCommandSchedulerRequest
  ): Promise<SessionCommandWorkerResult> {
    const workerController = new AbortController();
    let drainTimer: ReturnType<typeof setTimeout> | undefined;
    const beginDrain = () => {
      drainTimer = setTimeout(
        () => workerController.abort('session_command_shutdown_drain_expired'),
        this.shutdownDrainMs
      );
    };
    request.signal.addEventListener('abort', beginDrain, { once: true });
    if (request.signal.aborted) beginDrain();
    try {
      return await this.options.worker.processNext(request.scope, workerController.signal);
    } finally {
      request.signal.removeEventListener('abort', beginDrain);
      if (drainTimer !== undefined) clearTimeout(drainTimer);
    }
  }
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isInteger(value) || value < 1) invalid(`${label} must be a positive integer`);
  return value;
}

function nonNegativeInteger(value: number, label: string): number {
  if (!Number.isInteger(value) || value < 0) invalid(`${label} must be a non-negative integer`);
  return value;
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function notify(callback: () => void): void {
  try {
    callback();
  } catch {
    // Telemetry hooks cannot take ownership of command scheduling.
  }
}

function abortableDelay(delayMs: number, signal: AbortSignal): Promise<void> {
  if (signal.aborted) return Promise.resolve();
  return new Promise((resolve) => {
    const finish = () => {
      clearTimeout(timer);
      signal.removeEventListener('abort', finish);
      resolve();
    };
    const timer = setTimeout(finish, delayMs);
    signal.addEventListener('abort', finish, { once: true });
    if (signal.aborted) finish();
  });
}
