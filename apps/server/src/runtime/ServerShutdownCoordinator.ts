export interface ServerShutdownSteps {
  stopIntake(): Promise<void>;
  drainWorkersAndReleaseLeases(): Promise<void>;
  closeServicesAndConnections(): Promise<void>;
}

/**
 * Idempotent shutdown boundary. Intake always closes before durable workers
 * drain, and database/network connections remain available until the drain is complete.
 */
export class ServerShutdownCoordinator {
  private stopPromise?: Promise<void>;

  constructor(private readonly steps: ServerShutdownSteps) {}

  stop(): Promise<void> {
    if (!this.stopPromise) this.stopPromise = this.stopInternal();
    return this.stopPromise;
  }

  private async stopInternal(): Promise<void> {
    const failures: unknown[] = [];
    try {
      await this.steps.stopIntake();
    } catch (error) {
      failures.push(error);
    }
    try {
      await this.steps.drainWorkersAndReleaseLeases();
    } catch (error) {
      failures.push(error);
    }
    try {
      await this.steps.closeServicesAndConnections();
    } catch (error) {
      failures.push(error);
    }
    if (failures.length) {
      throw new AggregateError(failures, 'One or more Server shutdown phases failed.');
    }
  }
}
