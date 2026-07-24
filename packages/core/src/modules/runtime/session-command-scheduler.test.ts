import { describe, expect, it, vi } from 'vitest';
import type { SessionCommandWorkerResult } from './session-command-worker';
import {
  DurableSessionCommandScheduler,
  type SessionCommandProcessor,
} from './session-command-scheduler';

const applied: SessionCommandWorkerResult = {
  disposition: 'applied',
  commandId: 'command.1',
  commandType: 'start_run',
  attempts: 1,
};
const idle: SessionCommandWorkerResult = { disposition: 'idle' };

describe('DurableSessionCommandScheduler', () => {
  it('processes available work and stops from an abortable idle wait', async () => {
    const controller = new AbortController();
    const processNext = vi.fn().mockResolvedValueOnce(applied).mockResolvedValueOnce(idle);
    const wait = vi.fn(async (_delayMs: number, signal: AbortSignal) => {
      expect(signal).toBe(controller.signal);
      controller.abort();
    });
    const onResult = vi.fn();
    const scheduler = new DurableSessionCommandScheduler({
      worker: { processNext },
      pollIntervalMs: 25,
      wait,
      onResult,
    });

    await expect(scheduler.run({ signal: controller.signal })).resolves.toEqual({
      processed: 1,
      idlePolls: 1,
      errors: 0,
    });
    expect(processNext).toHaveBeenCalledTimes(2);
    expect(wait).toHaveBeenCalledWith(25, controller.signal);
    expect(onResult).toHaveBeenCalledTimes(2);
  });

  it('backs off after processor failure and continues scheduling', async () => {
    const controller = new AbortController();
    const failure = new Error('SQLite busy');
    const processNext = vi.fn().mockRejectedValueOnce(failure).mockResolvedValueOnce(idle);
    const waits: number[] = [];
    const wait = vi.fn(async (delayMs: number) => {
      waits.push(delayMs);
      if (waits.length === 2) controller.abort();
    });
    const onError = vi.fn();
    const scheduler = new DurableSessionCommandScheduler({
      worker: { processNext },
      pollIntervalMs: 20,
      errorBackoffMs: 200,
      wait,
      onError,
    });

    await expect(scheduler.run({ signal: controller.signal })).resolves.toEqual({
      processed: 0,
      idlePolls: 1,
      errors: 1,
    });
    expect(waits).toEqual([200, 20]);
    expect(onError).toHaveBeenCalledWith(failure);
  });

  it('rejects concurrent loops but can restart after the active loop drains', async () => {
    const firstController = new AbortController();
    let finishClaim: ((result: SessionCommandWorkerResult) => void) | undefined;
    const processNext = vi.fn(
      () =>
        new Promise<SessionCommandWorkerResult>((resolve) => {
          finishClaim = resolve;
        })
    );
    const scheduler = new DurableSessionCommandScheduler({ worker: { processNext } });
    const firstRun = scheduler.run({ signal: firstController.signal });
    await vi.waitFor(() => expect(processNext).toHaveBeenCalledTimes(1));

    await expect(scheduler.run({ signal: new AbortController().signal })).rejects.toMatchObject({
      code: 'RUNTIME_SESSION_QUEUE_CONFLICT',
    });
    firstController.abort();
    finishClaim?.(applied);
    await expect(firstRun).resolves.toMatchObject({ processed: 1 });

    const stopped = new AbortController();
    stopped.abort();
    await expect(scheduler.run({ signal: stopped.signal })).resolves.toEqual({
      processed: 0,
      idlePolls: 0,
      errors: 0,
    });
  });

  it('wakes the default long poll immediately when aborted', async () => {
    const controller = new AbortController();
    const processor: SessionCommandProcessor = { processNext: vi.fn().mockResolvedValue(idle) };
    const scheduler = new DurableSessionCommandScheduler({
      worker: processor,
      pollIntervalMs: 60_000,
    });
    const running = scheduler.run({ signal: controller.signal });
    await vi.waitFor(() => expect(processor.processNext).toHaveBeenCalledTimes(1));
    controller.abort();

    await expect(running).resolves.toEqual({ processed: 0, idlePolls: 1, errors: 0 });
  });

  it('isolates telemetry hook failures from the scheduling loop', async () => {
    const controller = new AbortController();
    const wait = vi.fn(async () => controller.abort());
    const scheduler = new DurableSessionCommandScheduler({
      worker: { processNext: vi.fn().mockResolvedValue(idle) },
      wait,
      onResult: () => {
        throw new Error('telemetry unavailable');
      },
    });

    await expect(scheduler.run({ signal: controller.signal })).resolves.toMatchObject({
      idlePolls: 1,
      errors: 0,
    });
  });
});
