export interface SupervisedMemoryWorker {
  start(): void;
  stopAndDrain(): Promise<void>;
  runOnce(): Promise<unknown>;
}

export interface MemoryWorkerSupervisorOptions {
  workers: readonly SupervisedMemoryWorker[];
}

/** Owns startup recovery and graceful shutdown for restart-safe Memory workers. */
export class MemoryWorkerSupervisor {
  private state: 'idle' | 'starting' | 'running' | 'stopping' | 'stopped' = 'idle';
  private stopPromise?: Promise<void>;

  constructor(private readonly options: MemoryWorkerSupervisorOptions) {}

  async start(): Promise<void> {
    if (this.state === 'running' || this.state === 'starting') return;
    if (this.state === 'stopping') throw new Error('Memory workers are stopping.');
    if (this.state === 'stopped') this.stopPromise = undefined;
    this.state = 'starting';
    try {
      for (const worker of this.options.workers) await worker.runOnce();
      for (const worker of this.options.workers) worker.start();
      this.state = 'running';
    } catch (error) {
      try {
        await this.stop();
      } catch (cleanupError) {
        throw new AggregateError(
          [
            error,
            ...(cleanupError instanceof AggregateError ? cleanupError.errors : [cleanupError]),
          ],
          'Memory worker startup and rollback both failed.'
        );
      }
      throw error;
    }
  }

  stop(): Promise<void> {
    if (this.state === 'stopped') return this.stopPromise ?? Promise.resolve();
    if (this.state === 'idle') {
      this.state = 'stopped';
      this.stopPromise = Promise.resolve();
      return this.stopPromise;
    }
    if (this.stopPromise) return this.stopPromise;
    this.state = 'stopping';
    this.stopPromise = this.drainWorkers();
    return this.stopPromise;
  }

  status(): 'idle' | 'starting' | 'running' | 'stopping' | 'stopped' {
    return this.state;
  }

  private async drainWorkers(): Promise<void> {
    const results = await Promise.allSettled(
      [...this.options.workers].reverse().map((worker) => worker.stopAndDrain())
    );
    this.state = 'stopped';
    const failures = results
      .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
      .map((result) => result.reason);
    if (failures.length > 0) {
      throw new AggregateError(failures, 'One or more Memory workers failed to drain.');
    }
  }
}
