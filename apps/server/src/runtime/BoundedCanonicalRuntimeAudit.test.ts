import {
  createFrameworkEvent,
  createPersistedEventBatch,
  InMemoryTelemetryRecorder,
  RUNTIME_OPERATIONAL_METRIC_NAMES,
  RuntimeOperationalTelemetry,
  type CanonicalEventScanPort,
  type PersistedFrameworkEvent,
  type RuntimeIntegrityStore,
} from '@codesoul-co/hypha-core';
import {
  BoundedCanonicalRuntimeAudit,
  RuntimeIntegrityRepairService,
} from './BoundedCanonicalRuntimeAudit';

const timestamp = '2026-07-24T08:00:00.000Z';

describe('BoundedCanonicalRuntimeAudit', () => {
  it('paginates the complete canonical history and persists a durable watermark', async () => {
    const events = validEvents();
    const scanner = scannerFor(events);
    const integrityStore = memoryIntegrityStore();
    const progress = jest.fn();
    const audit = createAudit(scanner, integrityStore, progress);

    const result = await audit.audit();

    expect(scanner.scanCanonicalEvents).toHaveBeenCalledTimes(2);
    expect(progress).toHaveBeenCalledTimes(2);
    expect(result).toMatchObject({
      scannedEvents: 2,
      lastGlobalSequence: 2,
      report: { validatedStreams: 1, quarantinedStreams: 0 },
      watermark: { lastGlobalSequence: 2, projectionRevision: 'runtime-orchestration@1' },
    });
    await expect(integrityStore.getWatermark()).resolves.toEqual(result.watermark);
  });

  it('fails closed when canonical projection replay detects corruption', async () => {
    const corrupt = createPersistedEventBatch(
      {
        scope: { userId: 'user-1', runId: 'run-1' },
        events: [
          createFrameworkEvent({
            id: 'state-entered',
            type: 'fsm.state.entered',
            runId: 'run-1',
            userId: 'user-1',
            timestamp,
            payload: { stateId: 'state.plan' },
          }),
        ],
        expectedLastSequence: 0,
        expectedRunRevision: 0,
        idempotencyKey: 'corrupt',
      },
      1,
      1,
      timestamp
    );

    const recorder = new InMemoryTelemetryRecorder();
    await expect(
      createAudit(
        scannerFor(corrupt),
        memoryIntegrityStore(),
        undefined,
        new RuntimeOperationalTelemetry({ recorder, now: () => timestamp })
      ).audit()
    ).rejects.toMatchObject({ code: 'RUNTIME_EVENT_STREAM_CORRUPT' });
    expect(recorder.sum(RUNTIME_OPERATIONAL_METRIC_NAMES.quarantineTotal)).toBe(1);
  });

  it('enforces event bounds and cancellation without writing a watermark', async () => {
    const integrityStore = memoryIntegrityStore();
    const bounded = new BoundedCanonicalRuntimeAudit({
      scanner: scannerFor(validEvents()),
      integrityStore,
      limits: {
        pageSize: 1,
        pageMaxBytes: 64_000,
        maxEvents: 1,
        maxBytes: 64_000,
        maxDurationMs: 1_000,
      },
      projectionRevision: 'runtime-orchestration@1',
      schemaCatalogHash: 'sha256:schema',
      streamFingerprintRevision: 'stream-key@1',
      now: () => timestamp,
    });
    await expect(bounded.audit()).rejects.toMatchObject({
      code: 'RUNTIME_RESOURCE_EXHAUSTED',
    });
    await expect(integrityStore.getWatermark()).resolves.toBeNull();

    const controller = new AbortController();
    controller.abort();
    await expect(
      createAudit(scannerFor(validEvents()), integrityStore).audit({
        signal: controller.signal,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_STARTUP_CANCELLED' });
  });

  it('times out a stalled page scan before Runtime readiness', async () => {
    const scanner: CanonicalEventScanPort = {
      scanCanonicalEvents: () => new Promise(() => undefined),
    };
    const audit = new BoundedCanonicalRuntimeAudit({
      scanner,
      integrityStore: memoryIntegrityStore(),
      limits: {
        pageSize: 1,
        pageMaxBytes: 64_000,
        maxEvents: 10,
        maxBytes: 64_000,
        maxDurationMs: 5,
      },
      projectionRevision: 'runtime-orchestration@1',
      schemaCatalogHash: 'sha256:schema',
      streamFingerprintRevision: 'stream-key@1',
      now: () => timestamp,
    });

    await expect(audit.audit()).rejects.toMatchObject({ code: 'RUNTIME_STARTUP_TIMEOUT' });
  });
});

describe('RuntimeIntegrityRepairService', () => {
  it('persists repair evidence and reuses it without repeating the repair', async () => {
    const integrityStore = memoryIntegrityStore();
    const repairPort = {
      repair: jest.fn().mockResolvedValue({
        repairedRevision: 'revision-2',
        evidenceRef: 'artifact:repair-1',
        evidenceHash: 'sha256:evidence',
      }),
    };
    const service = new RuntimeIntegrityRepairService(integrityStore, repairPort);
    const command = {
      version: '1.0.0' as const,
      repairId: 'repair-1',
      findingHash: 'sha256:finding',
      requestedRevision: 'revision-2',
      requestedBy: 'operator-1',
      requestedAt: timestamp,
    };

    const first = await service.repair(command);
    const second = await service.repair(command);

    expect(second).toEqual(first);
    expect(repairPort.repair).toHaveBeenCalledTimes(1);
    await expect(integrityStore.getRepair(command.repairId)).resolves.toEqual(first);
  });
});

function createAudit(
  scanner: CanonicalEventScanPort,
  integrityStore: RuntimeIntegrityStore,
  onProgress?: jest.Mock,
  operationalTelemetry?: RuntimeOperationalTelemetry
): BoundedCanonicalRuntimeAudit {
  return new BoundedCanonicalRuntimeAudit({
    scanner,
    integrityStore,
    limits: {
      pageSize: 1,
      pageMaxBytes: 64_000,
      maxEvents: 10,
      maxBytes: 256_000,
      maxDurationMs: 1_000,
    },
    projectionRevision: 'runtime-orchestration@1',
    schemaCatalogHash: 'sha256:schema',
    streamFingerprintRevision: 'stream-key@1',
    now: () => timestamp,
    ...(onProgress ? { onProgress } : {}),
    ...(operationalTelemetry ? { operationalTelemetry } : {}),
  });
}

function validEvents(): PersistedFrameworkEvent[] {
  return createPersistedEventBatch(
    {
      scope: { userId: 'user-1', runId: 'run-1' },
      events: [
        createFrameworkEvent({
          id: 'run-created',
          type: 'run.created',
          runId: 'run-1',
          userId: 'user-1',
          timestamp,
          payload: { runId: 'run-1' },
        }),
        createFrameworkEvent({
          id: 'run-started',
          type: 'run.started',
          runId: 'run-1',
          userId: 'user-1',
          timestamp: '2026-07-24T08:00:01.000Z',
          payload: { runId: 'run-1' },
        }),
      ],
      expectedLastSequence: 0,
      expectedRunRevision: 0,
      idempotencyKey: 'valid',
    },
    1,
    1,
    timestamp
  );
}

function scannerFor(events: readonly PersistedFrameworkEvent[]): CanonicalEventScanPort & {
  scanCanonicalEvents: jest.Mock;
} {
  return {
    scanCanonicalEvents: jest.fn(async (request) => {
      const page = events
        .filter((event) => event.globalSequence > request.afterGlobalSequence)
        .slice(0, request.limit);
      return {
        events: page,
        scannedBytes: page.reduce(
          (total, event) => total + Buffer.byteLength(JSON.stringify(event)),
          0
        ),
        lastGlobalSequence: page.at(-1)?.globalSequence ?? request.afterGlobalSequence,
        hasMore:
          events.filter((event) => event.globalSequence > request.afterGlobalSequence).length >
          page.length,
      };
    }),
  };
}

function memoryIntegrityStore(): RuntimeIntegrityStore {
  let watermark: Awaited<ReturnType<RuntimeIntegrityStore['getWatermark']>> = null;
  const repairs = new Map();
  return {
    getWatermark: async () => watermark,
    putWatermark: async (value, expected) => {
      if ((watermark?.lastGlobalSequence ?? null) !== expected) throw new Error('CAS conflict');
      watermark = structuredClone(value);
    },
    getRepair: async (repairId) => repairs.get(repairId) ?? null,
    putRepair: async (evidence) => {
      repairs.set(evidence.repairId, structuredClone(evidence));
    },
  };
}
