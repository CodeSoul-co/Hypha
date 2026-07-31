import {
  FrameworkError,
  type DurableRuntimeTimerWorker,
  type RuntimeRecoveryService,
} from '@hypha/core';
import {
  ServerRuntimeRecoveryScheduler,
  type ServerRuntimeRecoverySchedulerOptions,
  type ServerRuntimeRecoverySweepResult,
} from './ServerRuntimeRecoveryScheduler';
import {
  ServerRuntimeTimerScheduler,
  type ServerRuntimeTimerSchedulerOptions,
  type ServerRuntimeTimerSweepResult,
} from './ServerRuntimeTimerScheduler';

export interface ServerRuntimeWorkerSources {
  timerWorker: Pick<DurableRuntimeTimerWorker, 'sweep'>;
  recoveryService: Pick<RuntimeRecoveryService, 'scan' | 'recover'>;
}

export interface ServerRuntimeWorkerBindings {
  timer: Omit<ServerRuntimeTimerSchedulerOptions, 'worker'>;
  recovery: Omit<ServerRuntimeRecoverySchedulerOptions, 'service'>;
}

export interface ServerRuntimeWorkers {
  timer: ServerRuntimeTimerScheduler;
  recovery: ServerRuntimeRecoveryScheduler;
  status(): Readonly<ServerRuntimeWorkerStatus>;
}

export type ServerRuntimeWorkerLifecycleState =
  | 'idle'
  | 'starting'
  | 'running'
  | 'draining'
  | 'closed'
  | 'failed';

export interface ServerRuntimeWorkerEvidence {
  running: boolean;
  successfulSweeps: number;
  failedSweeps: number;
  lastSuccessfulSweepAt?: string;
  lastFailedSweepAt?: string;
}

export interface ServerRuntimeWorkerStatus {
  lifecycle: ServerRuntimeWorkerLifecycleState;
  timer: ServerRuntimeWorkerEvidence;
  recovery: ServerRuntimeWorkerEvidence;
}

/**
 * Owns the long-running Runtime workers after the canonical execution graph is ready.
 *
 * Closing signals both schedulers before awaiting either one, so no scheduler can
 * continue polling while its peer drains an in-flight sweep.
 */
export class ServerRuntimeWorkerLifecycle {
  private workers?: Readonly<ServerRuntimeWorkers>;
  private startup?: Promise<Readonly<ServerRuntimeWorkers>>;
  private shutdown?: Promise<void>;
  private lifecycleState: ServerRuntimeWorkerLifecycleState = 'idle';
  private readonly timerEvidence = mutableEvidence();
  private readonly recoveryEvidence = mutableEvidence();
  private closed = false;

  constructor(
    private readonly sources: ServerRuntimeWorkerSources,
    private readonly bindings: ServerRuntimeWorkerBindings
  ) {}

  start(): Promise<Readonly<ServerRuntimeWorkers>> {
    this.assertOpen();
    if (this.workers) return Promise.resolve(this.workers);
    if (this.startup) return this.startup;

    this.lifecycleState = 'starting';
    const startup = this.startInternal();
    this.startup = startup;
    void startup.catch(() => {
      if (this.startup === startup) this.startup = undefined;
      if (!this.closed) this.lifecycleState = 'failed';
    });
    return startup;
  }

  isRunning(): boolean {
    return Boolean(this.workers?.timer.isRunning() || this.workers?.recovery.isRunning());
  }

  status(): Readonly<ServerRuntimeWorkerStatus> {
    return Object.freeze({
      lifecycle: this.lifecycleState,
      timer: workerEvidence(this.workers?.timer.isRunning() ?? false, this.timerEvidence),
      recovery: workerEvidence(this.workers?.recovery.isRunning() ?? false, this.recoveryEvidence),
    });
  }

  close(): Promise<void> {
    if (!this.shutdown) {
      this.closed = true;
      this.lifecycleState = 'draining';
      this.shutdown = this.closeInternal();
    }
    return this.shutdown;
  }

  private async startInternal(): Promise<Readonly<ServerRuntimeWorkers>> {
    const workers = Object.freeze({
      timer: new ServerRuntimeTimerScheduler({
        ...this.bindings.timer,
        worker: this.sources.timerWorker,
        onSweep: (result) => this.observeTimerSweep(result),
        onError: (error) => this.observeTimerFailure(error),
      }),
      recovery: new ServerRuntimeRecoveryScheduler({
        ...this.bindings.recovery,
        service: this.sources.recoveryService,
        onSweep: (result) => this.observeRecoverySweep(result),
        onError: (error) => this.observeRecoveryFailure(error),
      }),
      status: () => this.status(),
    });

    try {
      workers.timer.start();
      workers.recovery.start();
      if (this.closed) {
        throw conflict('Runtime Worker lifecycle closed during startup');
      }
      this.workers = workers;
      this.lifecycleState = 'running';
      return workers;
    } catch (startupError) {
      try {
        await closeWorkers(workers);
      } catch (cleanupError) {
        throw new AggregateError(
          [startupError, cleanupError],
          'Runtime Worker startup and cleanup failed'
        );
      }
      throw startupError;
    }
  }

  private async closeInternal(): Promise<void> {
    try {
      await this.startup?.catch(() => undefined);
      const workers = this.workers;
      if (workers) await closeWorkers(workers);
      this.lifecycleState = 'closed';
    } catch (error) {
      this.lifecycleState = 'failed';
      throw error;
    }
  }

  private observeTimerSweep(result: Readonly<ServerRuntimeTimerSweepResult>): void {
    this.timerEvidence.successfulSweeps += 1;
    this.timerEvidence.lastSuccessfulSweepAt = result.firedAt;
    this.bindings.timer.onSweep?.(result);
  }

  private observeTimerFailure(error: unknown): void {
    this.timerEvidence.failedSweeps += 1;
    this.timerEvidence.lastFailedSweepAt = observedAt(this.bindings.timer.now);
    this.bindings.timer.onError?.(error);
  }

  private observeRecoverySweep(result: Readonly<ServerRuntimeRecoverySweepResult>): void {
    this.recoveryEvidence.successfulSweeps += 1;
    this.recoveryEvidence.lastSuccessfulSweepAt = result.checkedAt;
    this.bindings.recovery.onSweep?.(result);
  }

  private observeRecoveryFailure(error: unknown): void {
    this.recoveryEvidence.failedSweeps += 1;
    this.recoveryEvidence.lastFailedSweepAt = observedAt(this.bindings.recovery.now);
    this.bindings.recovery.onError?.(error);
  }

  private assertOpen(): void {
    if (this.closed) throw conflict('Runtime Worker lifecycle is closed');
  }
}

async function closeWorkers(workers: Readonly<ServerRuntimeWorkers>): Promise<void> {
  const results = await Promise.allSettled([workers.recovery.close(), workers.timer.close()]);
  const failures = results
    .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
    .map((result) => result.reason);
  if (failures.length > 0) {
    throw new AggregateError(failures, 'One or more Runtime workers failed to close');
  }
}

function conflict(message: string): FrameworkError {
  return new FrameworkError({ code: 'RUNTIME_RESOURCE_CONFLICT', message });
}

interface MutableWorkerEvidence {
  successfulSweeps: number;
  failedSweeps: number;
  lastSuccessfulSweepAt?: string;
  lastFailedSweepAt?: string;
}

function mutableEvidence(): MutableWorkerEvidence {
  return {
    successfulSweeps: 0,
    failedSweeps: 0,
  };
}

function workerEvidence(
  running: boolean,
  evidence: MutableWorkerEvidence
): Readonly<ServerRuntimeWorkerEvidence> {
  return Object.freeze({
    running,
    successfulSweeps: evidence.successfulSweeps,
    failedSweeps: evidence.failedSweeps,
    ...(evidence.lastSuccessfulSweepAt === undefined
      ? {}
      : { lastSuccessfulSweepAt: evidence.lastSuccessfulSweepAt }),
    ...(evidence.lastFailedSweepAt === undefined
      ? {}
      : { lastFailedSweepAt: evidence.lastFailedSweepAt }),
  });
}

function observedAt(now?: () => string): string {
  try {
    return now?.() ?? new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}
