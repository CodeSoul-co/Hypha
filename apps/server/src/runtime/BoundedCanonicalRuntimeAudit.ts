import {
  FrameworkError,
  hashCanonicalJson,
  type CanonicalEventScanPort,
  type RuntimeIntegrityRepairCommand,
  type RuntimeIntegrityRepairEvidence,
  type RuntimeIntegrityRepairPort,
  type RuntimeIntegrityStore,
  type RuntimeIntegrityWatermark,
  type RuntimeOperationalTelemetry,
} from '@hypha/core';
import {
  auditCanonicalRuntimeStreams,
  type CanonicalRuntimeStreamIntegrityReport,
} from './OrchestrationEventStore';

export interface CanonicalRuntimeAuditLimits {
  pageSize: number;
  pageMaxBytes: number;
  maxEvents: number;
  maxBytes: number;
  maxDurationMs: number;
}

export interface CanonicalRuntimeAuditProgress {
  scannedEvents: number;
  scannedBytes: number;
  lastGlobalSequence: number;
  elapsedMs: number;
}

export interface CanonicalRuntimeAuditResult extends CanonicalRuntimeAuditProgress {
  report: CanonicalRuntimeStreamIntegrityReport;
  watermark: RuntimeIntegrityWatermark;
}

export interface BoundedCanonicalRuntimeAuditOptions {
  scanner: CanonicalEventScanPort;
  integrityStore: RuntimeIntegrityStore;
  limits: CanonicalRuntimeAuditLimits;
  projectionRevision: string;
  schemaCatalogHash: string;
  streamFingerprintRevision: string;
  now?: () => string;
  monotonicNow?: () => number;
  onProgress?: (progress: CanonicalRuntimeAuditProgress) => void | Promise<void>;
  operationalTelemetry?: RuntimeOperationalTelemetry;
}

/**
 * Performs a bounded, fail-closed replay before Runtime readiness.
 *
 * The watermark is durable evidence of the last complete audit. It is not a
 * projection snapshot, so startup deliberately revalidates the full bounded
 * history instead of trusting an incremental suffix.
 */
export class BoundedCanonicalRuntimeAudit {
  private readonly now: () => string;
  private readonly monotonicNow: () => number;

  constructor(private readonly options: BoundedCanonicalRuntimeAuditOptions) {
    validateLimits(options.limits);
    required(options.projectionRevision, 'projectionRevision');
    required(options.schemaCatalogHash, 'schemaCatalogHash');
    required(options.streamFingerprintRevision, 'streamFingerprintRevision');
    this.now = options.now ?? (() => new Date().toISOString());
    this.monotonicNow = options.monotonicNow ?? (() => performance.now());
  }

  async audit(input: { signal?: AbortSignal } = {}): Promise<CanonicalRuntimeAuditResult> {
    const startedAt = this.monotonicNow();
    const events = [];
    let scannedBytes = 0;
    let lastGlobalSequence = 0;
    let hasMore = true;

    while (hasMore) {
      this.assertWithinLimits(input.signal, startedAt, events.length, scannedBytes);
      const remainingEvents = this.options.limits.maxEvents - events.length;
      const remainingBytes = this.options.limits.maxBytes - scannedBytes;
      const page = await this.scanWithinDeadline(
        {
          afterGlobalSequence: lastGlobalSequence,
          limit: Math.min(this.options.limits.pageSize, remainingEvents),
          maxBytes: Math.min(this.options.limits.pageMaxBytes, remainingBytes),
        },
        input.signal,
        startedAt
      );
      if (page.events.length === 0 && page.hasMore) {
        throw failure(
          'RUNTIME_INTEGRITY_SCAN_STALLED',
          'Canonical Event scan made no progress while more Events remain'
        );
      }
      if (
        page.lastGlobalSequence < lastGlobalSequence ||
        (page.events.length > 0 && page.lastGlobalSequence === lastGlobalSequence)
      ) {
        throw failure(
          'RUNTIME_INTEGRITY_SCAN_STALLED',
          'Canonical Event scan returned a non-advancing global sequence'
        );
      }
      events.push(...page.events);
      scannedBytes += page.scannedBytes;
      lastGlobalSequence = page.lastGlobalSequence;
      hasMore = page.hasMore;
      const progress = this.progress(startedAt, events.length, scannedBytes, lastGlobalSequence);
      await this.options.onProgress?.(progress);
      this.assertWithinLimits(input.signal, startedAt, events.length, scannedBytes, hasMore);
    }

    const report = auditCanonicalRuntimeStreams(events);
    if (report.quarantinedStreams > 0) {
      await this.options.operationalTelemetry
        ?.recordQuarantine({
          source: 'startup_integrity_audit',
          reason: 'canonical_stream_corrupt',
        })
        .catch(() => undefined);
      throw failure(
        'RUNTIME_EVENT_STREAM_CORRUPT',
        'Canonical Runtime integrity audit rejected one or more streams',
        { report }
      );
    }

    const prior = await this.options.integrityStore.getWatermark();
    const watermark: RuntimeIntegrityWatermark = {
      version: '1.0.0',
      lastGlobalSequence,
      projectionRevision: this.options.projectionRevision,
      schemaCatalogHash: this.options.schemaCatalogHash,
      streamFingerprintRevision: this.options.streamFingerprintRevision,
      reportHash: hashCanonicalJson(report),
      auditedAt: validTimestamp(this.now()),
    };
    await this.options.integrityStore.putWatermark(watermark, prior?.lastGlobalSequence ?? null);
    return {
      ...this.progress(startedAt, events.length, scannedBytes, lastGlobalSequence),
      report,
      watermark,
    };
  }

  private assertWithinLimits(
    signal: AbortSignal | undefined,
    startedAt: number,
    scannedEvents: number,
    scannedBytes: number,
    hasMore = true
  ): void {
    if (signal?.aborted) {
      throw failure('RUNTIME_STARTUP_CANCELLED', 'Canonical Runtime integrity audit was cancelled');
    }
    if (this.monotonicNow() - startedAt > this.options.limits.maxDurationMs) {
      throw failure(
        'RUNTIME_STARTUP_TIMEOUT',
        'Canonical Runtime integrity audit exceeded its startup duration limit'
      );
    }
    if (hasMore && scannedEvents >= this.options.limits.maxEvents) {
      throw exhausted('Canonical Runtime integrity audit exceeded its Event limit');
    }
    if (hasMore && scannedBytes >= this.options.limits.maxBytes) {
      throw exhausted('Canonical Runtime integrity audit exceeded its byte limit');
    }
  }

  private async scanWithinDeadline(
    request: {
      afterGlobalSequence: number;
      limit: number;
      maxBytes: number;
    },
    signal: AbortSignal | undefined,
    startedAt: number
  ) {
    const remainingMs = this.options.limits.maxDurationMs - (this.monotonicNow() - startedAt);
    if (remainingMs <= 0) {
      throw failure(
        'RUNTIME_STARTUP_TIMEOUT',
        'Canonical Runtime integrity audit exceeded its startup duration limit'
      );
    }
    return await guardedAwait(
      this.options.scanner.scanCanonicalEvents(request),
      remainingMs,
      signal
    );
  }

  private progress(
    startedAt: number,
    scannedEvents: number,
    scannedBytes: number,
    lastGlobalSequence: number
  ): CanonicalRuntimeAuditProgress {
    return {
      scannedEvents,
      scannedBytes,
      lastGlobalSequence,
      elapsedMs: Math.max(0, this.monotonicNow() - startedAt),
    };
  }
}

export class RuntimeIntegrityRepairService {
  constructor(
    private readonly integrityStore: RuntimeIntegrityStore,
    private readonly repairPort: RuntimeIntegrityRepairPort
  ) {}

  async repair(command: RuntimeIntegrityRepairCommand): Promise<RuntimeIntegrityRepairEvidence> {
    validateRepairCommand(command);
    const prior = await this.integrityStore.getRepair(command.repairId);
    if (prior) {
      if (prior.findingHash !== command.findingHash || prior.repairedBy !== command.requestedBy) {
        throw failure(
          'RUNTIME_INTEGRITY_CONFLICT',
          'Runtime integrity repairId was reused for a different request'
        );
      }
      return prior;
    }

    const result = await this.repairPort.repair(command);
    if (result.repairedRevision !== command.requestedRevision) {
      throw failure(
        'RUNTIME_INTEGRITY_CONFLICT',
        'Runtime integrity repair produced an unexpected revision'
      );
    }
    const evidence: RuntimeIntegrityRepairEvidence = {
      version: '1.0.0',
      repairId: command.repairId,
      findingHash: command.findingHash,
      repairedRevision: required(result.repairedRevision, 'repairedRevision'),
      evidenceRef: required(result.evidenceRef, 'evidenceRef'),
      evidenceHash: required(result.evidenceHash, 'evidenceHash'),
      repairedBy: command.requestedBy,
      repairedAt: command.requestedAt,
    };
    await this.integrityStore.putRepair(evidence);
    return evidence;
  }
}

function validateLimits(limits: CanonicalRuntimeAuditLimits): void {
  positiveInteger(limits.pageSize, 'pageSize');
  positiveInteger(limits.pageMaxBytes, 'pageMaxBytes');
  positiveInteger(limits.maxEvents, 'maxEvents');
  positiveInteger(limits.maxBytes, 'maxBytes');
  positiveInteger(limits.maxDurationMs, 'maxDurationMs');
  if (limits.pageSize > limits.maxEvents) {
    invalid('pageSize must not exceed maxEvents');
  }
  if (limits.pageMaxBytes > limits.maxBytes) {
    invalid('pageMaxBytes must not exceed maxBytes');
  }
}

function validateRepairCommand(command: RuntimeIntegrityRepairCommand): void {
  if (command.version !== '1.0.0') invalid('Unsupported Runtime integrity repair version');
  required(command.repairId, 'repairId');
  required(command.findingHash, 'findingHash');
  required(command.requestedRevision, 'requestedRevision');
  required(command.requestedBy, 'requestedBy');
  validTimestamp(command.requestedAt);
}

function positiveInteger(value: number, field: string): void {
  if (!Number.isSafeInteger(value) || value < 1) invalid(`${field} must be a positive integer`);
}

function required(value: string, field: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) invalid(`${field} is required`);
  return value;
}

function validTimestamp(value: string): string {
  if (!Number.isFinite(Date.parse(value))) invalid('Timestamp must be a valid ISO timestamp');
  return value;
}

function invalid(message: string): never {
  throw failure('RUNTIME_INVALID_REQUEST', message);
}

function exhausted(message: string): FrameworkError {
  return failure('RUNTIME_RESOURCE_EXHAUSTED', message);
}

function failure(code: string, message: string, context?: Record<string, unknown>): FrameworkError {
  return new FrameworkError({ code, message, ...(context ? { context } : {}) });
}

function guardedAwait<T>(
  operation: Promise<T>,
  timeoutMs: number,
  signal?: AbortSignal
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let settled = false;
    const finish = (callback: () => void): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
      callback();
    };
    const onAbort = (): void =>
      finish(() =>
        reject(
          failure('RUNTIME_STARTUP_CANCELLED', 'Canonical Runtime integrity audit was cancelled')
        )
      );
    const timer = setTimeout(
      () =>
        finish(() =>
          reject(
            failure(
              'RUNTIME_STARTUP_TIMEOUT',
              'Canonical Runtime integrity audit exceeded its startup duration limit'
            )
          )
        ),
      timeoutMs
    );
    signal?.addEventListener('abort', onAbort, { once: true });
    if (signal?.aborted) {
      onAbort();
      return;
    }
    operation.then(
      (value) => finish(() => resolve(value)),
      (error) => finish(() => reject(error))
    );
  });
}
