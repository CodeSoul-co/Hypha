import { ServerReActContinuationReconciliationScheduler } from './ServerReActContinuationReconciliationScheduler';

describe('ServerReActContinuationReconciliationScheduler', () => {
  it('aggregates bounded pages and preserves the cursor chain', async () => {
    const reconcile = jest
      .fn()
      .mockResolvedValueOnce({
        scannedRuns: 2,
        scheduled: 1,
        reused: 0,
        quarantined: 0,
        nextCursor: 'cursor.2',
      })
      .mockResolvedValueOnce({
        scannedRuns: 1,
        scheduled: 0,
        reused: 1,
        quarantined: 1,
      });
    const scheduler = new ServerReActContinuationReconciliationScheduler({
      reconciler: { reconcile },
      pageLimit: 25,
      now: () => '2026-08-01T12:00:00.000Z',
    });

    await expect(scheduler.sweepOnce()).resolves.toEqual({
      checkedAt: '2026-08-01T12:00:00.000Z',
      pages: 2,
      scannedRuns: 3,
      scheduled: 1,
      reused: 1,
      quarantined: 1,
    });
    expect(reconcile).toHaveBeenNthCalledWith(1, expect.objectContaining({ limit: 25 }));
    expect(reconcile).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ cursor: 'cursor.2', limit: 25 })
    );
    await scheduler.close();
  });

  it('fails closed when a provider repeats a pagination cursor', async () => {
    const reconcile = jest.fn(async () => ({
      scannedRuns: 0,
      scheduled: 0,
      reused: 0,
      quarantined: 0,
      nextCursor: 'same',
    }));
    const scheduler = new ServerReActContinuationReconciliationScheduler({
      reconciler: { reconcile },
      pageLimit: 10,
    });

    await expect(scheduler.sweepOnce()).rejects.toMatchObject({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
    });
    await scheduler.close();
  });
});
