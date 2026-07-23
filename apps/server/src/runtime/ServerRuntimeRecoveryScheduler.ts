import {
  FrameworkError,
  type RuntimeRecoveryCandidateReason,
  type RuntimeRecoveryResult,
  type RuntimeRecoveryScanResult,
  type RuntimeRecoveryService,
} from '@hypha/core';

export interface ServerRuntimeRecoverySweepResult {
  checkedAt: string;
  pages: number;
  scannedStreams: number;
  detected: number;
  attempted: number;
  deferred: number;
  failed: number;
  results: RuntimeRecoveryResult[];
}

export interface ServerRuntimeRecoverySchedulerOptions {
  service: Pick<RuntimeRecoveryService, 'scan' | 'recover'>;
  ownerId: string;
  leaseTtlMs: number;
  pageLimit: number;
  autoRecoverReasons: readonly RuntimeRecoveryCandidateReason[];
  pollIntervalMs?: number;
  errorBackoffMs?: number;
  now?: () => string;
  onSweep?: (result: Readonly<ServerRuntimeRecoverySweepResult>) => void;
  onCandidateError?: (error: unknown, candidateId: string) => void;
  onError?: (error: unknown) => void;
}

/** Scans durable Run streams and executes only explicitly enabled recovery actions. */
export class ServerRuntimeRecoveryScheduler {
  private readonly pollIntervalMs: number;
  private readonly errorBackoffMs: number;
  private readonly now: () => string;
  private readonly autoRecoverReasons: ReadonlySet<RuntimeRecoveryCandidateReason>;
  private controller?: AbortController;
  private loop?: Promise<void>;
  private closed = false;

  constructor(private readonly options: ServerRuntimeRecoverySchedulerOptions) {
    required(options.ownerId, 'ownerId');
    positiveInteger(options.leaseTtlMs, 'leaseTtlMs');
    positiveInteger(options.pageLimit, 'pageLimit');
    if (options.pageLimit > 1_000) invalid('pageLimit cannot exceed 1000');
    if (options.autoRecoverReasons.length === 0) {
      invalid('autoRecoverReasons must contain at least one reason');
    }
    this.pollIntervalMs = positiveInteger(options.pollIntervalMs ?? 5_000, 'pollIntervalMs');
    this.errorBackoffMs = positiveInteger(options.errorBackoffMs ?? 10_000, 'errorBackoffMs');
    this.now = options.now ?? (() => new Date().toISOString());
    this.autoRecoverReasons = new Set(options.autoRecoverReasons);
  }

  start(): void {
    this.assertOpen();
    if (this.loop) conflict('Runtime Recovery Scheduler is already running');
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

  async sweepOnce(checkedAt = this.now()): Promise<ServerRuntimeRecoverySweepResult> {
    this.assertOpen();
    validTimestamp(checkedAt, 'checkedAt');
    const aggregate: ServerRuntimeRecoverySweepResult = {
      checkedAt,
      pages: 0,
      scannedStreams: 0,
      detected: 0,
      attempted: 0,
      deferred: 0,
      failed: 0,
      results: [],
    };
    const visitedCursors = new Set<string>();
    const visitedCandidates = new Set<string>();
    let cursor: string | undefined;
    do {
      const page = await this.options.service.scan({
        checkedAt,
        limit: this.options.pageLimit,
        ...(cursor === undefined ? {} : { cursor }),
      });
      await this.recoverPage(aggregate, page, visitedCandidates);
      cursor = page.nextCursor;
      if (cursor && visitedCursors.has(cursor)) {
        throw new FrameworkError({
          code: 'RUNTIME_EVENT_STREAM_CORRUPT',
          message: `Runtime Recovery scan repeated cursor: ${cursor}`,
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

  private async recoverPage(
    aggregate: ServerRuntimeRecoverySweepResult,
    page: RuntimeRecoveryScanResult,
    visitedCandidates: Set<string>
  ): Promise<void> {
    aggregate.pages += 1;
    aggregate.scannedStreams += page.scannedStreams;
    aggregate.detected += page.candidates.length;
    for (const candidate of page.candidates) {
      if (visitedCandidates.has(candidate.candidateId)) {
        throw new FrameworkError({
          code: 'RUNTIME_EVENT_STREAM_CORRUPT',
          message: `Runtime Recovery scan repeated candidate: ${candidate.candidateId}`,
        });
      }
      visitedCandidates.add(candidate.candidateId);
      if (!this.autoRecoverReasons.has(candidate.reason)) {
        aggregate.deferred += 1;
        continue;
      }
      aggregate.attempted += 1;
      try {
        aggregate.results.push(
          await this.options.service.recover({
            candidate,
            ownerId: this.options.ownerId,
            leaseTtlMs: this.options.leaseTtlMs,
            requestedAt: aggregate.checkedAt,
          })
        );
      } catch (error) {
        aggregate.failed += 1;
        try {
          this.options.onCandidateError?.(error, candidate.candidateId);
        } catch {
          // Observer failures cannot stop recovery of independent candidates.
        }
      }
    }
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
    if (this.closed) conflict('Runtime Recovery Scheduler is closed');
  }
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

function required(value: string, label: string): void {
  if (!value.trim()) invalid(`${label} must be non-empty`);
}

function validTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid date-time`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_RESOURCE_CONFLICT', message });
}
