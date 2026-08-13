import { FrameworkError } from '@codesoul-co/hypha-core';
import {
  type ReActContinuationReconcileResult,
  type ServerReActContinuationReconciler,
} from './ServerReActContinuationReconciler';

export interface ServerReActContinuationReconciliationSweepResult {
  checkedAt: string;
  pages: number;
  scannedRuns: number;
  scheduled: number;
  reused: number;
  quarantined: number;
}

export interface ServerReActContinuationReconciliationSchedulerOptions {
  reconciler: Pick<ServerReActContinuationReconciler, 'reconcile'>;
  pageLimit: number;
  pollIntervalMs?: number;
  errorBackoffMs?: number;
  now?: () => string;
  onSweep?: (result: Readonly<ServerReActContinuationReconciliationSweepResult>) => void;
  onError?: (error: unknown) => void;
}

/** Repairs durable ReAct checkpoint/command gaps without executing an Agent quantum. */
export class ServerReActContinuationReconciliationScheduler {
  private readonly pollIntervalMs: number;
  private readonly errorBackoffMs: number;
  private readonly now: () => string;
  private controller?: AbortController;
  private loop?: Promise<void>;
  private closed = false;

  constructor(private readonly options: ServerReActContinuationReconciliationSchedulerOptions) {
    this.pollIntervalMs = positiveInteger(options.pollIntervalMs ?? 5_000, 'pollIntervalMs');
    this.errorBackoffMs = positiveInteger(options.errorBackoffMs ?? 10_000, 'errorBackoffMs');
    this.now = options.now ?? (() => new Date().toISOString());
    const limit = positiveInteger(options.pageLimit, 'pageLimit');
    if (limit > 1_000) invalid('pageLimit cannot exceed 1000');
  }

  async sweepOnce(signal?: AbortSignal): Promise<ServerReActContinuationReconciliationSweepResult> {
    assertActive(signal);
    const checkedAt = this.now();
    if (!Number.isFinite(Date.parse(checkedAt))) invalid('now must return an ISO date-time');
    const aggregate: ServerReActContinuationReconciliationSweepResult = {
      checkedAt,
      pages: 0,
      scannedRuns: 0,
      scheduled: 0,
      reused: 0,
      quarantined: 0,
    };
    const cursors = new Set<string>();
    let cursor: string | undefined;
    do {
      const page = await this.options.reconciler.reconcile({
        ...(cursor === undefined ? {} : { cursor }),
        limit: this.options.pageLimit,
        ...(signal === undefined ? {} : { signal }),
      });
      accumulate(aggregate, page);
      cursor = page.nextCursor;
      if (cursor && cursors.has(cursor)) {
        throw new FrameworkError({
          code: 'RUNTIME_EVENT_STREAM_CORRUPT',
          message: `ReAct continuation reconciliation repeated cursor: ${cursor}`,
        });
      }
      if (cursor) cursors.add(cursor);
    } while (cursor !== undefined);
    return aggregate;
  }

  start(): void {
    this.assertOpen();
    if (this.loop) conflict('ReAct continuation reconciliation scheduler is already running');
    const controller = new AbortController();
    this.controller = controller;
    const loop = this.run(controller.signal);
    this.loop = loop;
    const clear = () => {
      if (this.loop === loop) {
        this.loop = undefined;
        this.controller = undefined;
      }
    };
    void loop.then(clear, clear);
  }

  isRunning(): boolean {
    return this.loop !== undefined;
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    const loop = this.loop;
    this.controller?.abort();
    await loop;
  }

  private async run(signal: AbortSignal): Promise<void> {
    while (!signal.aborted) {
      let delayMs = this.pollIntervalMs;
      try {
        const result = await this.sweepOnce(signal);
        this.options.onSweep?.(result);
      } catch (error) {
        if (signal.aborted) return;
        delayMs = this.errorBackoffMs;
        try {
          this.options.onError?.(error);
        } catch {
          // Observer errors cannot terminate the owned repair loop.
        }
      }
      await abortableDelay(delayMs, signal);
    }
  }

  private assertOpen(): void {
    if (this.closed) conflict('ReAct continuation reconciliation scheduler is closed');
  }
}

function accumulate(
  target: ServerReActContinuationReconciliationSweepResult,
  page: ReActContinuationReconcileResult
): void {
  target.pages += 1;
  target.scannedRuns += page.scannedRuns;
  target.scheduled += page.scheduled;
  target.reused += page.reused;
  target.quarantined += page.quarantined;
}

function abortableDelay(delayMs: number, signal: AbortSignal): Promise<void> {
  if (signal.aborted) return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => {
      clearTimeout(timer);
      signal.removeEventListener('abort', done);
      resolve();
    };
    const timer = setTimeout(done, delayMs);
    signal.addEventListener('abort', done, { once: true });
  });
}

function assertActive(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new FrameworkError({ code: 'RUNTIME_CANCELLED', message: 'Reconciliation was aborted' });
  }
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 1) invalid(`${label} must be a positive integer`);
  return value;
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_RESOURCE_CONFLICT', message });
}
