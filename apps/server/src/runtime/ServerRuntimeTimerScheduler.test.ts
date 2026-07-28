import type { RuntimeTimerSweepRequest, RuntimeTimerSweepResult } from '@hypha/core';
import { ServerRuntimeTimerScheduler } from './ServerRuntimeTimerScheduler';

function page(input: Partial<RuntimeTimerSweepResult> = {}): RuntimeTimerSweepResult {
  return {
    scanned: 0,
    fired: 0,
    notDue: 0,
    leaseUnavailable: 0,
    alreadyResolved: 0,
    results: [],
    ...input,
  };
}

describe('ServerRuntimeTimerScheduler', () => {
  it('sweeps every page with one stable due-time boundary', async () => {
    const sweep = jest
      .fn<Promise<RuntimeTimerSweepResult>, [RuntimeTimerSweepRequest]>()
      .mockResolvedValueOnce(
        page({
          scanned: 1,
          fired: 1,
          results: [
            {
              scope: { userId: 'user.timer', runId: 'run.timer.1' },
              disposition: 'fired',
              eventIds: ['event.timer.1'],
            },
          ],
          nextCursor: 'cursor.1',
        })
      )
      .mockResolvedValueOnce(
        page({
          scanned: 1,
          notDue: 1,
          results: [
            {
              scope: { userId: 'user.timer', runId: 'run.timer.2' },
              disposition: 'not_due',
              eventIds: [],
            },
          ],
        })
      );
    const scheduler = new ServerRuntimeTimerScheduler({
      worker: { sweep },
      ownerId: 'timer.server',
      leaseTtlMs: 30_000,
      pageLimit: 1,
    });

    await expect(scheduler.sweepOnce('2026-07-22T09:00:00.000Z')).resolves.toEqual({
      firedAt: '2026-07-22T09:00:00.000Z',
      pages: 2,
      scanned: 2,
      fired: 1,
      notDue: 1,
      leaseUnavailable: 0,
      alreadyResolved: 0,
      results: [
        expect.objectContaining({ disposition: 'fired' }),
        expect.objectContaining({ disposition: 'not_due' }),
      ],
    });
    expect(sweep).toHaveBeenNthCalledWith(1, {
      ownerId: 'timer.server',
      leaseTtlMs: 30_000,
      limit: 1,
      firedAt: '2026-07-22T09:00:00.000Z',
    });
    expect(sweep).toHaveBeenNthCalledWith(2, {
      ownerId: 'timer.server',
      leaseTtlMs: 30_000,
      limit: 1,
      cursor: 'cursor.1',
      firedAt: '2026-07-22T09:00:00.000Z',
    });
    await scheduler.close();
  });

  it('aborts its polling delay and drains an in-flight sweep during close', async () => {
    let finishSweep!: (result: RuntimeTimerSweepResult) => void;
    const sweep = jest.fn(
      () =>
        new Promise<RuntimeTimerSweepResult>((resolve) => {
          finishSweep = resolve;
        })
    );
    const scheduler = new ServerRuntimeTimerScheduler({
      worker: { sweep },
      ownerId: 'timer.server',
      leaseTtlMs: 30_000,
      pageLimit: 100,
      pollIntervalMs: 60_000,
    });

    scheduler.start();
    await waitFor(() => sweep.mock.calls.length === 1);
    const closing = scheduler.close();
    expect(scheduler.isRunning()).toBe(true);
    finishSweep(page());
    await closing;

    expect(scheduler.isRunning()).toBe(false);
    expect(sweep).toHaveBeenCalledTimes(1);
    expect(() => scheduler.start()).toThrow('Runtime Timer Scheduler is closed');
  });

  it('rejects a repeated pagination cursor instead of looping forever', async () => {
    const sweep = jest
      .fn<Promise<RuntimeTimerSweepResult>, [RuntimeTimerSweepRequest]>()
      .mockResolvedValue(page({ nextCursor: 'cursor.same' }));
    const scheduler = new ServerRuntimeTimerScheduler({
      worker: { sweep },
      ownerId: 'timer.server',
      leaseTtlMs: 30_000,
      pageLimit: 100,
    });

    await expect(scheduler.sweepOnce('2026-07-22T09:00:00.000Z')).rejects.toMatchObject({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
    });
    expect(sweep).toHaveBeenCalledTimes(2);
    await scheduler.close();
  });
});

async function waitFor(predicate: () => boolean): Promise<void> {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    if (predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
  throw new Error('Timed out waiting for scheduler work');
}
