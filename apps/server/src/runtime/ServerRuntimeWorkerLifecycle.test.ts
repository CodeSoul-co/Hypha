import type {
  RuntimeRecoveryScanRequest,
  RuntimeRecoveryScanResult,
  RuntimeTimerSweepRequest,
  RuntimeTimerSweepResult,
} from '@hypha/core';
import { ServerRuntimeWorkerLifecycle } from './ServerRuntimeWorkerLifecycle';

describe('ServerRuntimeWorkerLifecycle', () => {
  it('starts one timer and recovery worker set for concurrent callers', async () => {
    const sweep = jest
      .fn<Promise<RuntimeTimerSweepResult>, [RuntimeTimerSweepRequest]>()
      .mockResolvedValue(timerPage());
    const scan = jest
      .fn<Promise<RuntimeRecoveryScanResult>, [RuntimeRecoveryScanRequest]>()
      .mockResolvedValue(recoveryPage());
    const lifecycle = createLifecycle(sweep, scan);

    const [first, second] = await Promise.all([lifecycle.start(), lifecycle.start()]);

    expect(first).toBe(second);
    expect(lifecycle.isRunning()).toBe(true);
    expect(sweep).toHaveBeenCalledWith(
      expect.objectContaining({ ownerId: 'runtime.timer.server', limit: 100 })
    );
    expect(scan).toHaveBeenCalledWith(expect.objectContaining({ limit: 100 }));

    const firstClose = lifecycle.close();
    const secondClose = lifecycle.close();
    expect(firstClose).toBe(secondClose);
    await firstClose;
    expect(lifecycle.isRunning()).toBe(false);
  });

  it('signals both schedulers and drains their in-flight sweeps before closing', async () => {
    let finishTimer!: (result: RuntimeTimerSweepResult) => void;
    let finishRecovery!: (result: RuntimeRecoveryScanResult) => void;
    const sweep = jest.fn(
      () =>
        new Promise<RuntimeTimerSweepResult>((resolve) => {
          finishTimer = resolve;
        })
    );
    const scan = jest.fn(
      () =>
        new Promise<RuntimeRecoveryScanResult>((resolve) => {
          finishRecovery = resolve;
        })
    );
    const lifecycle = createLifecycle(sweep, scan);
    const workers = await lifecycle.start();

    const closing = lifecycle.close();
    expect(workers.timer.isRunning()).toBe(true);
    expect(workers.recovery.isRunning()).toBe(true);

    finishTimer(timerPage());
    await Promise.resolve();
    expect(workers.recovery.isRunning()).toBe(true);
    finishRecovery(recoveryPage());
    await closing;

    expect(workers.timer.isRunning()).toBe(false);
    expect(workers.recovery.isRunning()).toBe(false);
    expect(() => lifecycle.start()).toThrow('Runtime Worker lifecycle is closed');
  });

  it('closes cleanly before startup and rejects later activation', async () => {
    const lifecycle = createLifecycle(
      jest.fn(async () => timerPage()),
      jest.fn(async () => recoveryPage())
    );

    await lifecycle.close();

    expect(lifecycle.isRunning()).toBe(false);
    expect(() => lifecycle.start()).toThrow('Runtime Worker lifecycle is closed');
  });
});

function createLifecycle(
  sweep: (request: RuntimeTimerSweepRequest) => Promise<RuntimeTimerSweepResult>,
  scan: (request: RuntimeRecoveryScanRequest) => Promise<RuntimeRecoveryScanResult>
): ServerRuntimeWorkerLifecycle {
  return new ServerRuntimeWorkerLifecycle(
    {
      timerWorker: { sweep },
      recoveryService: {
        scan,
        recover: async (command) => ({
          candidateId: command.candidate.candidateId,
          disposition: 'recovered',
          eventIds: [],
        }),
      },
    },
    {
      timer: {
        ownerId: 'runtime.timer.server',
        leaseTtlMs: 30_000,
        pageLimit: 100,
        pollIntervalMs: 60_000,
      },
      recovery: {
        ownerId: 'runtime.recovery.server',
        leaseTtlMs: 30_000,
        pageLimit: 100,
        pollIntervalMs: 60_000,
        autoRecoverReasons: ['PROJECTION_BEHIND'],
      },
    }
  );
}

function timerPage(): RuntimeTimerSweepResult {
  return {
    scanned: 0,
    fired: 0,
    notDue: 0,
    leaseUnavailable: 0,
    alreadyResolved: 0,
    results: [],
  };
}

function recoveryPage(): RuntimeRecoveryScanResult {
  return {
    candidates: [],
    scannedStreams: 0,
  };
}
