import type {
  RuntimeRecoveryCandidate,
  RuntimeRecoveryCommand,
  RuntimeRecoveryResult,
  RuntimeRecoveryScanRequest,
  RuntimeRecoveryScanResult,
} from '@hypha/core';
import { ServerRuntimeRecoveryScheduler } from './ServerRuntimeRecoveryScheduler';

const checkedAt = '2026-07-22T10:00:00.000Z';

function candidate(
  id: string,
  reason: RuntimeRecoveryCandidate['reason']
): RuntimeRecoveryCandidate {
  return {
    candidateId: id,
    scope: { userId: 'user.recovery', runId: `run.${id}` },
    reason,
    safeAction: reason === 'PROJECTION_BEHIND' ? 'rebuild_projection' : 'apply_observation',
    eventHeadSequence: 3,
    detectedAt: checkedAt,
  };
}

function page(input: Partial<RuntimeRecoveryScanResult> = {}): RuntimeRecoveryScanResult {
  return { candidates: [], scannedStreams: 0, ...input };
}

function recovered(command: RuntimeRecoveryCommand): RuntimeRecoveryResult {
  return { candidateId: command.candidate.candidateId, disposition: 'recovered', eventIds: [] };
}

describe('ServerRuntimeRecoveryScheduler', () => {
  it('scans every page and recovers only explicitly enabled reasons', async () => {
    const projection = candidate('projection', 'PROJECTION_BEHIND');
    const cancellation = candidate('cancellation', 'CANCELLATION_INCOMPLETE');
    const activity = candidate('activity', 'ACTIVITY_RESULT_UNAPPLIED');
    const scan = jest
      .fn<Promise<RuntimeRecoveryScanResult>, [RuntimeRecoveryScanRequest]>()
      .mockResolvedValueOnce(
        page({ candidates: [projection, activity], scannedStreams: 2, nextCursor: 'cursor.1' })
      )
      .mockResolvedValueOnce(page({ candidates: [cancellation], scannedStreams: 1 }));
    const recover = jest.fn(async (command: RuntimeRecoveryCommand) => recovered(command));
    const scheduler = new ServerRuntimeRecoveryScheduler({
      service: { scan, recover },
      ownerId: 'recovery.server',
      leaseTtlMs: 30_000,
      pageLimit: 2,
      autoRecoverReasons: ['PROJECTION_BEHIND', 'CANCELLATION_INCOMPLETE'],
    });

    await expect(scheduler.sweepOnce(checkedAt)).resolves.toEqual({
      checkedAt,
      pages: 2,
      scannedStreams: 3,
      detected: 3,
      attempted: 2,
      deferred: 1,
      failed: 0,
      results: [
        expect.objectContaining({ candidateId: 'projection' }),
        expect.objectContaining({ candidateId: 'cancellation' }),
      ],
    });
    expect(scan).toHaveBeenNthCalledWith(1, { checkedAt, limit: 2 });
    expect(scan).toHaveBeenNthCalledWith(2, { checkedAt, limit: 2, cursor: 'cursor.1' });
    expect(recover).toHaveBeenCalledTimes(2);
    await scheduler.close();
  });

  it('isolates one candidate failure and continues the sweep', async () => {
    const first = candidate('first', 'PROJECTION_BEHIND');
    const second = candidate('second', 'CANCELLATION_INCOMPLETE');
    const onCandidateError = jest.fn();
    const recover = jest
      .fn<Promise<RuntimeRecoveryResult>, [RuntimeRecoveryCommand]>()
      .mockRejectedValueOnce(new Error('candidate failed'))
      .mockImplementation(async (command) => recovered(command));
    const scheduler = new ServerRuntimeRecoveryScheduler({
      service: {
        scan: async () => page({ candidates: [first, second], scannedStreams: 2 }),
        recover,
      },
      ownerId: 'recovery.server',
      leaseTtlMs: 30_000,
      pageLimit: 100,
      autoRecoverReasons: ['PROJECTION_BEHIND', 'CANCELLATION_INCOMPLETE'],
      onCandidateError,
    });

    await expect(scheduler.sweepOnce(checkedAt)).resolves.toMatchObject({
      attempted: 2,
      failed: 1,
      results: [{ candidateId: 'second' }],
    });
    expect(onCandidateError).toHaveBeenCalledWith(expect.any(Error), 'first');
    await scheduler.close();
  });

  it('rejects repeated cursors and drains an in-flight scan during close', async () => {
    const repeated = new ServerRuntimeRecoveryScheduler({
      service: {
        scan: async () => page({ nextCursor: 'same' }),
        recover: async (command) => recovered(command),
      },
      ownerId: 'recovery.server',
      leaseTtlMs: 30_000,
      pageLimit: 100,
      autoRecoverReasons: ['PROJECTION_BEHIND'],
    });
    await expect(repeated.sweepOnce(checkedAt)).rejects.toMatchObject({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
    });
    await repeated.close();

    let finishScan!: (result: RuntimeRecoveryScanResult) => void;
    const scan = jest.fn(
      () =>
        new Promise<RuntimeRecoveryScanResult>((resolve) => {
          finishScan = resolve;
        })
    );
    const scheduler = new ServerRuntimeRecoveryScheduler({
      service: { scan, recover: async (command) => recovered(command) },
      ownerId: 'recovery.server',
      leaseTtlMs: 30_000,
      pageLimit: 100,
      autoRecoverReasons: ['PROJECTION_BEHIND'],
      pollIntervalMs: 60_000,
    });
    scheduler.start();
    await waitFor(() => scan.mock.calls.length === 1);
    const closing = scheduler.close();
    expect(scheduler.isRunning()).toBe(true);
    finishScan(page());
    await closing;
    expect(scheduler.isRunning()).toBe(false);
    expect(() => scheduler.start()).toThrow('Runtime Recovery Scheduler is closed');
  });
});

async function waitFor(predicate: () => boolean): Promise<void> {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    if (predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
  throw new Error('Timed out waiting for scheduler work');
}
