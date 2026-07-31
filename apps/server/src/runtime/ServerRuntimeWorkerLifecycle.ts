import {
  FrameworkError,
  type DurableRuntimeTimerWorker,
  type RuntimeRecoveryService,
} from '@hypha/core';
import {
  ServerRuntimeRecoveryScheduler,
  type ServerRuntimeRecoverySchedulerOptions,
} from './ServerRuntimeRecoveryScheduler';
import {
  ServerRuntimeTimerScheduler,
  type ServerRuntimeTimerSchedulerOptions,
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
  private closed = false;

  constructor(
    private readonly sources: ServerRuntimeWorkerSources,
    private readonly bindings: ServerRuntimeWorkerBindings
  ) {}

  start(): Promise<Readonly<ServerRuntimeWorkers>> {
    this.assertOpen();
    if (this.workers) return Promise.resolve(this.workers);
    if (this.startup) return this.startup;

    const startup = this.startInternal();
    this.startup = startup;
    void startup.catch(() => {
      if (this.startup === startup) this.startup = undefined;
    });
    return startup;
  }

  isRunning(): boolean {
    return Boolean(this.workers?.timer.isRunning() || this.workers?.recovery.isRunning());
  }

  close(): Promise<void> {
    if (!this.shutdown) {
      this.closed = true;
      this.shutdown = this.closeInternal();
    }
    return this.shutdown;
  }

  private async startInternal(): Promise<Readonly<ServerRuntimeWorkers>> {
    const workers = Object.freeze({
      timer: new ServerRuntimeTimerScheduler({
        ...this.bindings.timer,
        worker: this.sources.timerWorker,
      }),
      recovery: new ServerRuntimeRecoveryScheduler({
        ...this.bindings.recovery,
        service: this.sources.recoveryService,
      }),
    });

    try {
      workers.timer.start();
      workers.recovery.start();
      if (this.closed) {
        throw conflict('Runtime Worker lifecycle closed during startup');
      }
      this.workers = workers;
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
    await this.startup?.catch(() => undefined);
    const workers = this.workers;
    this.workers = undefined;
    if (workers) await closeWorkers(workers);
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
