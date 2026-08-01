import type {
  RuntimeRecoveryScanRequest,
  RuntimeRecoveryScanResult,
  RuntimeTimerSweepRequest,
  RuntimeTimerSweepResult,
} from '@hypha/core';
import type { ServerRuntimeRecoverySchedulerOptions } from './ServerRuntimeRecoveryScheduler';
import type { ServerRuntimeTimerSchedulerOptions } from './ServerRuntimeTimerScheduler';
import { ServerRuntimeWorkerLifecycle } from './ServerRuntimeWorkerLifecycle';

describe('ServerRuntimeWorkerLifecycle', () => {
  it('fails closed when the initial durable sweep cannot complete', async () => {
    const lifecycle = createLifecycle(
      jest.fn(async () => {
        throw new Error('timer storage unavailable');
      }),
      jest.fn(async () => recoveryPage())
    );

    await expect(lifecycle.start()).rejects.toThrow('timer storage unavailable');
    expect(lifecycle.isRunning()).toBe(false);
    expect(lifecycle.status().lifecycle).toBe('failed');
    await lifecycle.close();
  });
  it('starts one maintenance worker set without claiming execution readiness', async () => {
    const sweep = jest
      .fn<Promise<RuntimeTimerSweepResult>, [RuntimeTimerSweepRequest]>()
      .mockResolvedValue(timerPage());
    const scan = jest
      .fn<Promise<RuntimeRecoveryScanResult>, [RuntimeRecoveryScanRequest]>()
      .mockResolvedValue(recoveryPage());
    const lifecycle = createLifecycle(sweep, scan);

    const [first, second] = await Promise.all([lifecycle.start(), lifecycle.start()]);
    await waitFor(
      () =>
        first.status().timer.successfulSweeps >= 1 && first.status().recovery.successfulSweeps >= 1
    );

    expect(first).toBe(second);
    expect(lifecycle.isRunning()).toBe(false);
    expect(first.status()).toMatchObject({
      lifecycle: 'running',
      timer: {
        running: true,
        successfulSweeps: expect.any(Number),
        failedSweeps: 0,
        lastSuccessfulSweepAt: expect.any(String),
      },
      recovery: {
        running: true,
        successfulSweeps: expect.any(Number),
        failedSweeps: 0,
        lastSuccessfulSweepAt: expect.any(String),
      },
    });
    expect(first.status().commands).toBeUndefined();
    expect(sweep).toHaveBeenCalledWith(
      expect.objectContaining({ ownerId: 'runtime.timer.server', limit: 100 })
    );
    expect(scan).toHaveBeenCalledWith(expect.objectContaining({ limit: 100 }));

    const firstClose = lifecycle.close();
    const secondClose = lifecycle.close();
    expect(firstClose).toBe(secondClose);
    await firstClose;
    expect(lifecycle.isRunning()).toBe(false);
    expect(first.status()).toMatchObject({
      lifecycle: 'closed',
      timer: { running: false },
      recovery: { running: false },
    });
  });

  it('signals both schedulers and drains their in-flight sweeps before closing', async () => {
    let finishTimer!: (result: RuntimeTimerSweepResult) => void;
    let finishRecovery!: (result: RuntimeRecoveryScanResult) => void;
    const sweep = jest
      .fn<Promise<RuntimeTimerSweepResult>, [RuntimeTimerSweepRequest]>()
      .mockResolvedValueOnce(timerPage())
      .mockImplementation(
        () =>
          new Promise<RuntimeTimerSweepResult>((resolve) => {
            finishTimer = resolve;
          })
      );
    const scan = jest
      .fn<Promise<RuntimeRecoveryScanResult>, [RuntimeRecoveryScanRequest]>()
      .mockResolvedValueOnce(recoveryPage())
      .mockImplementation(
        () =>
          new Promise<RuntimeRecoveryScanResult>((resolve) => {
            finishRecovery = resolve;
          })
      );
    const lifecycle = createLifecycle(sweep, scan);
    const workers = await lifecycle.start();

    const closing = lifecycle.close();
    expect(workers.status().lifecycle).toBe('draining');
    expect(workers.timer.isRunning()).toBe(true);
    expect(workers.recovery.isRunning()).toBe(true);

    finishTimer(timerPage());
    await Promise.resolve();
    expect(workers.recovery.isRunning()).toBe(true);
    finishRecovery(recoveryPage());
    await closing;

    expect(workers.timer.isRunning()).toBe(false);
    expect(workers.recovery.isRunning()).toBe(false);
    expect(workers.status().lifecycle).toBe('closed');
    expect(() => lifecycle.start()).toThrow('Runtime Worker lifecycle is closed');
  });

  it('records bounded sweep failures while preserving configured observers', async () => {
    const now = '2026-07-31T12:00:00.000Z';
    const timerError = new Error('timer dependency unavailable');
    const timerOnError = jest.fn();
    const recoveryOnSweep = jest.fn();
    const timerSweep = jest
      .fn<Promise<RuntimeTimerSweepResult>, [RuntimeTimerSweepRequest]>()
      .mockResolvedValueOnce(timerPage())
      .mockRejectedValue(timerError);
    const lifecycle = createLifecycle(
      timerSweep,
      jest.fn(async () => recoveryPage()),
      {
        timer: { now: () => now, onError: timerOnError },
        recovery: { now: () => now, onSweep: recoveryOnSweep },
      }
    );

    const workers = await lifecycle.start();
    await waitFor(
      () =>
        workers.status().timer.failedSweeps === 1 && workers.status().recovery.successfulSweeps >= 1
    );

    expect(workers.status()).toMatchObject({
      lifecycle: 'running',
      timer: {
        running: true,
        successfulSweeps: 1,
        failedSweeps: 1,
        lastFailedSweepAt: now,
      },
      recovery: {
        running: true,
        successfulSweeps: expect.any(Number),
        failedSweeps: 0,
        lastSuccessfulSweepAt: now,
      },
    });
    expect(timerOnError).toHaveBeenCalledWith(timerError);
    expect(recoveryOnSweep).toHaveBeenCalledWith(expect.objectContaining({ checkedAt: now }));
    expect(JSON.stringify(workers.status())).not.toContain(timerError.message);
    await lifecycle.close();
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

  it('owns the continuous Session Command loop with timer and recovery workers', async () => {
    const commands = {
      start: jest.fn(),
      isRunning: jest.fn().mockReturnValue(true),
      close: jest.fn(async () => {
        commands.isRunning.mockReturnValue(false);
      }),
    };
    const lifecycle = createLifecycle(
      jest.fn(async () => timerPage()),
      jest.fn(async () => recoveryPage()),
      {
        commands: {
          runtime: commands,
          scope: { userId: 'user.1', sessionId: 'session.1' },
        },
      }
    );

    const workers = await lifecycle.start();
    expect(commands.start).toHaveBeenCalledTimes(1);
    expect(commands.start).toHaveBeenCalledWith({ userId: 'user.1', sessionId: 'session.1' });
    expect(workers.status().commands).toEqual({ running: true });
    commands.isRunning.mockReturnValue(false);
    expect(lifecycle.isRunning()).toBe(false);

    await lifecycle.close();
    expect(commands.close).toHaveBeenCalledTimes(1);
    expect(workers.status().commands).toEqual({ running: false });
  });
});

function createLifecycle(
  sweep: (request: RuntimeTimerSweepRequest) => Promise<RuntimeTimerSweepResult>,
  scan: (request: RuntimeRecoveryScanRequest) => Promise<RuntimeRecoveryScanResult>,
  overrides: {
    timer?: Partial<Omit<ServerRuntimeTimerSchedulerOptions, 'worker'>>;
    recovery?: Partial<Omit<ServerRuntimeRecoverySchedulerOptions, 'service'>>;
    commands?: ConstructorParameters<typeof ServerRuntimeWorkerLifecycle>[1]['commands'];
  } = {}
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
        ...overrides.timer,
      },
      recovery: {
        ownerId: 'runtime.recovery.server',
        leaseTtlMs: 30_000,
        pageLimit: 100,
        pollIntervalMs: 60_000,
        autoRecoverReasons: ['PROJECTION_BEHIND'],
        ...overrides.recovery,
      },
      ...(overrides.commands === undefined ? {} : { commands: overrides.commands }),
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

async function waitFor(predicate: () => boolean): Promise<void> {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
  throw new Error('Timed out waiting for Runtime worker evidence');
}
