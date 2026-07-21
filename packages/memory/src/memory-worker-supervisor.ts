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

  constructor(private readonly options: MemoryWorkerSupervisorOptions) {}

  async start(): Promise<void> {
    if (this.state === 'running' || this.state === 'starting') return;
    if (this.state === 'stopping') throw new Error('Memory workers are stopping.');
    this.state = 'starting';
    try {
      for (const worker of this.options.workers) await worker.runOnce();
      for (const worker of this.options.workers) worker.start();
      this.state = 'running';
    } catch (error) {
      await this.stop();
      throw error;
    }
  }

  async stop(): Promise<void> {
    if (this.state === 'stopped' || this.state === 'idle') {
      this.state = 'stopped';
      return;
    }
    this.state = 'stopping';
    await Promise.all([...this.options.workers].reverse().map((worker) => worker.stopAndDrain()));
    this.state = 'stopped';
  }

  status(): 'idle' | 'starting' | 'running' | 'stopping' | 'stopped' {
    return this.state;
  }
}
