import {
  FrameworkError,
  type DurableRuntimeTimerWorker,
  type RuntimeTimerSweepResult,
  type RuntimeTimerSweepRunResult,
} from '@hypha/core';

export interface ServerRuntimeTimerSweepResult {
  firedAt: string;
  pages: number;
  scanned: number;
  fired: number;
  notDue: number;
  leaseUnavailable: number;
  alreadyResolved: number;
  results: RuntimeTimerSweepRunResult[];
}

export interface ServerRuntimeTimerSchedulerOptions {
  worker: Pick<DurableRuntimeTimerWorker, 'sweep'>;
  ownerId: string;
  leaseTtlMs: number;
  pageLimit: number;
  pollIntervalMs?: number;
  errorBackoffMs?: number;
  now?: () => string;
  onSweep?: (result: Readonly<ServerRuntimeTimerSweepResult>) => void;
  onError?: (error: unknown) => void;
}

/** Polls every canonical Run stream while the Timer Worker owns per-Run execution authority. */
export class ServerRuntimeTimerScheduler {
  private readonly pollIntervalMs: number;
  private readonly errorBackoffMs: number;
  private readonly now: () => string;
  private controller?: AbortController;
  private loop?: Promise<void>;
  private closed = false;

  constructor(private readonly options: ServerRuntimeTimerSchedulerOptions) {
    positiveInteger(options.leaseTtlMs, 'leaseTtlMs');
    positiveInteger(options.pageLimit, 'pageLimit');
    if (options.pageLimit > 1_000) invalid('pageLimit cannot exceed 1000');
    this.pollIntervalMs = positiveInteger(options.pollIntervalMs ?? 1_000, 'pollIntervalMs');
    this.errorBackoffMs = positiveInteger(options.errorBackoffMs ?? 5_000, 'errorBackoffMs');
    this.now = options.now ?? (() => new Date().toISOString());
  }

  start(): void {
    this.assertOpen();
    if (this.loop) conflict('Runtime Timer Scheduler is already running');
    const controller = new AbortController();
    this.controller = controller;
    const loop = this.run(controller.signal);
    this.loop = loop;
    const clearLoop = () => {
      if (this.loop === loop) {
        this.loop = undefined;
        this.controller = undefined;
      }
    };
    void loop.then(clearLoop, clearLoop);
  }

  isRunning(): boolean {
    return this.loop !== undefined;
  }

  async sweepOnce(firedAt = this.now()): Promise<ServerRuntimeTimerSweepResult> {
    this.assertOpen();
    const aggregate: ServerRuntimeTimerSweepResult = {
      firedAt,
      pages: 0,
      scanned: 0,
      fired: 0,
      notDue: 0,
      leaseUnavailable: 0,
      alreadyResolved: 0,
      results: [],
    };
    const visitedCursors = new Set<string>();
    let cursor: string | undefined;
    do {
      const page = await this.options.worker.sweep({
        ownerId: this.options.ownerId,
        leaseTtlMs: this.options.leaseTtlMs,
        limit: this.options.pageLimit,
        firedAt,
        ...(cursor === undefined ? {} : { cursor }),
      });
      mergePage(aggregate, page);
      cursor = page.nextCursor;
      if (cursor && visitedCursors.has(cursor)) {
        throw new FrameworkError({
          code: 'RUNTIME_EVENT_STREAM_CORRUPT',
          message: `Runtime Timer scan repeated cursor: ${cursor}`,
        });
      }
      if (cursor) visitedCursors.add(cursor);
    } while (cursor !== undefined);
    return aggregate;
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
        const result = await this.sweepOnce();
        this.options.onSweep?.(result);
      } catch (error) {
        delayMs = this.errorBackoffMs;
        try {
          this.options.onError?.(error);
        } catch {
          // Observer failures cannot terminate the owned scheduler loop.
        }
      }
      await abortableDelay(delayMs, signal);
    }
  }

  private assertOpen(): void {
    if (this.closed) conflict('Runtime Timer Scheduler is closed');
  }
}

function mergePage(aggregate: ServerRuntimeTimerSweepResult, page: RuntimeTimerSweepResult): void {
  aggregate.pages += 1;
  aggregate.scanned += page.scanned;
  aggregate.fired += page.fired;
  aggregate.notDue += page.notDue;
  aggregate.leaseUnavailable += page.leaseUnavailable;
  aggregate.alreadyResolved += page.alreadyResolved;
  aggregate.results.push(...page.results);
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

function positiveInteger(value: number, label: string): number {
  if (!Number.isInteger(value) || value <= 0) invalid(`${label} must be a positive integer`);
  return value;
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_RESOURCE_CONFLICT', message });
}
