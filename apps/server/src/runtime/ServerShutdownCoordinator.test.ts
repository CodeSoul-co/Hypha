import { ServerShutdownCoordinator } from './ServerShutdownCoordinator';

describe('ServerShutdownCoordinator', () => {
  it('stops intake, drains outbox/pollers and releases leases before closing connections', async () => {
    const events: string[] = [];
    let releaseDrain!: () => void;
    const drain = new Promise<void>((resolve) => {
      releaseDrain = resolve;
    });
    const coordinator = new ServerShutdownCoordinator({
      stopIntake: async () => {
        events.push('intake:stopped');
      },
      drainWorkersAndReleaseLeases: async () => {
        events.push('outbox:draining');
        await drain;
        events.push('poller:stopped');
        events.push('leases:released');
      },
      closeServicesAndConnections: async () => {
        events.push('connections:closed');
      },
    });

    const first = coordinator.stop();
    const second = coordinator.stop();
    expect(first).toBe(second);
    await Promise.resolve();
    expect(events).toEqual(['intake:stopped', 'outbox:draining']);

    releaseDrain();
    await first;
    expect(events).toEqual([
      'intake:stopped',
      'outbox:draining',
      'poller:stopped',
      'leases:released',
      'connections:closed',
    ]);
  });

  it('attempts every cleanup phase and reports all failures', async () => {
    const events: string[] = [];
    const coordinator = new ServerShutdownCoordinator({
      stopIntake: async () => {
        events.push('intake');
        throw new Error('intake failure');
      },
      drainWorkersAndReleaseLeases: async () => {
        events.push('drain');
        throw new Error('drain failure');
      },
      closeServicesAndConnections: async () => {
        events.push('connections');
      },
    });

    await expect(coordinator.stop()).rejects.toMatchObject({
      name: 'AggregateError',
      errors: [expect.any(Error), expect.any(Error)],
    });
    expect(events).toEqual(['intake', 'drain', 'connections']);
  });
});
