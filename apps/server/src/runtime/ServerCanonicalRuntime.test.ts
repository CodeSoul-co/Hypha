import fs from 'fs';
import os from 'os';
import path from 'path';
import { createFrameworkEvent, InMemoryEventStore, type RuntimeCancelResult } from '@hypha/core';
import { defaultReActFSMProcessSpec } from '@hypha/fsm';
import type { InferenceProvider } from '@hypha/inference';
import type { ToolRunner } from '@hypha/tools';
import { ServerCanonicalRuntime } from './ServerCanonicalRuntime';
import type { ServerRuntimeCompositionBindings } from './ServerRuntimeComposition';
import type { ServerRuntimeWorkerBindings } from './ServerRuntimeWorkerLifecycle';

describe('ServerCanonicalRuntime', () => {
  const services: ServerCanonicalRuntime[] = [];

  afterEach(async () => {
    while (services.length > 0) await services.pop()?.close();
  });

  it('migrates canonical legacy Events and exposes one authoritative merged store', async () => {
    const legacy = new InMemoryEventStore();
    await legacy.append(event('legacy-created', 'run.created'));
    await legacy.append(event('legacy-model', 'model.call.completed'));
    const service = createService(legacy);

    const composition = await service.initialize();

    expect(composition.migration).toMatchObject({
      scannedEvents: 2,
      eligibleEvents: 1,
      migratedEvents: 1,
      quarantinedEvents: 0,
    });
    await expect(composition.events.list({ runId: 'run-1' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'legacy-created', type: 'run.created' }),
        expect.objectContaining({ id: 'legacy-model', type: 'model.call.completed' }),
      ])
    );

    await composition.events.append(event('canonical-started', 'run.started'));
    await composition.events.append(event('legacy-tool', 'tool.call.completed'));

    await expect(legacy.list({ runId: 'run-1', type: 'run.started' })).resolves.toEqual([]);
    await expect(legacy.list({ runId: 'run-1', type: 'tool.call.completed' })).resolves.toEqual([
      expect.objectContaining({ id: 'legacy-tool' }),
    ]);
    await expect(composition.events.list({ runId: 'run-1', type: 'run.started' })).resolves.toEqual(
      [expect.objectContaining({ id: 'canonical-started' })]
    );
    expect(await service.initialize()).toBe(composition);
  });

  it('fails closed when a canonical legacy Event cannot establish its owner scope', async () => {
    const legacy = new InMemoryEventStore();
    const ownerless = event('ownerless-created', 'run.created');
    delete ownerless.userId;
    ownerless.metadata = {};
    await legacy.append(ownerless);
    const service = createService(legacy);

    await expect(service.initialize()).rejects.toMatchObject({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
      context: {
        migration: expect.objectContaining({ quarantinedEvents: 1 }),
      },
    });
    expect(service.isInitialized()).toBe(false);
  });

  it('fails before readiness when the compatibility migration exceeds its bound', async () => {
    const legacy = new InMemoryEventStore();
    await legacy.append(event('legacy-created', 'run.created'));
    const service = createService(legacy, 1);
    await legacy.append(event('legacy-model', 'model.call.completed'));

    await expect(service.initialize()).rejects.toMatchObject({
      code: 'RUNTIME_INTEGRITY_LIMIT_EXCEEDED',
    });
  });

  it('replaces an incomplete imported history before retrying canonical cutover', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-canonical-runtime-retry-'));
    const filename = path.join(root, 'runtime.sqlite');
    const incomplete = new InMemoryEventStore();
    await incomplete.append(event('legacy-started', 'run.started'));
    const first = createService(incomplete, 100, filename);

    await expect(first.initialize()).rejects.toMatchObject({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
    });

    const corrected = new InMemoryEventStore();
    await corrected.append(event('legacy-created', 'run.created'));
    await corrected.append(event('legacy-started', 'run.started'));
    const retried = createService(corrected, 100, filename);
    const composition = await retried.initialize();

    expect(composition.migration).toMatchObject({
      resetImportedEvents: 1,
      migratedEvents: 2,
      quarantinedEvents: 0,
    });
    await expect(composition.events.list({ runId: 'run-1' })).resolves.toHaveLength(2);
  });

  it('hands the audited canonical authorities to one cached execution composition', async () => {
    const service = createService(new InMemoryEventStore());
    const bindings = executionBindings();

    expect(service.executionReadiness()).toMatchObject({
      ready: false,
      state: 'not_initialized',
    });
    expect(() => service.composeRuntime(bindings)).toThrow('Canonical Runtime is not initialized');

    const canonical = await service.initialize();
    expect(service.executionReadiness()).toMatchObject({
      ready: false,
      state: 'event_authority_ready',
    });
    const runtime = service.composeRuntime(bindings);

    expect(service.executionReadiness()).toMatchObject({
      ready: false,
      state: 'execution_graph_ready',
    });

    expect(runtime.events).toBe(canonical.backbone.events);
    expect(runtime.projections).toBe(canonical.backbone.projections);
    expect(runtime.projectionStore).toBe(canonical.backbone.projectionStore);
    expect(runtime.runLeases).toBe(canonical.backbone.runLeases);
    expect(runtime.stateClaims).toBe(canonical.backbone.stateClaims);
    expect(runtime.sessionQueue).toBe(canonical.backbone.sessionQueue);
    expect(service.composeRuntime(executionBindings())).toBe(runtime);
  });

  it('owns one worker lifecycle and drains it before canonical shutdown', async () => {
    const service = createService(new InMemoryEventStore());
    await service.initialize();

    expect(() => service.startWorkers(workerBindings())).toThrow(
      'Canonical Runtime execution graph is not composed'
    );

    service.composeRuntime(executionBindings());
    const [first, second] = await Promise.all([
      service.startWorkers(workerBindings()),
      service.startWorkers(workerBindings()),
    ]);

    expect(first).toBe(second);
    expect(service.areWorkersRunning()).toBe(true);
    expect(service.executionReadiness()).toEqual({
      ready: true,
      state: 'workers_running',
      message: 'Canonical Runtime execution graph and durable workers are running',
    });

    const firstClose = service.close();
    const secondClose = service.close();
    expect(firstClose).toBe(secondClose);
    await firstClose;

    expect(first.timer.isRunning()).toBe(false);
    expect(first.recovery.isRunning()).toBe(false);
    expect(service.areWorkersRunning()).toBe(false);
    expect(service.executionReadiness()).toMatchObject({ ready: false, state: 'closed' });
    expect(() => service.composeRuntime(executionBindings())).toThrow(
      'Canonical Runtime is closed'
    );
  });

  function createService(
    legacyEvents: InMemoryEventStore,
    maxLegacyEvents = 100,
    filename = path.join(
      fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-canonical-runtime-')),
      'runtime.sqlite'
    )
  ) {
    const service = new ServerCanonicalRuntime({
      filename,
      legacyEvents,
      maxLegacyEvents,
      auditLimits: {
        pageSize: 25,
        pageMaxBytes: 1024 * 1024,
        maxEvents: 100,
        maxBytes: 4 * 1024 * 1024,
        maxDurationMs: 5_000,
      },
      now: () => '2026-07-26T00:00:00.000Z',
    });
    services.push(service);
    return service;
  }
});

function executionBindings(): ServerRuntimeCompositionBindings {
  return {
    inference: {
      id: 'inference.test',
      infer: jest.fn(),
    } as InferenceProvider,
    toolRunner: {} as ToolRunner,
    fsmSpec: defaultReActFSMProcessSpec,
    executeState: async () => ({ result: { kind: 'continued' } }),
    recoveryActivities: {
      reconcile: async (request) => ({
        activityId: request.invocation.activityId,
        status: 'unknown',
      }),
      retry: async () => {
        throw new Error('not configured');
      },
    },
    recoveryRedispatches: {
      redispatch: async () => {
        throw new Error('not configured');
      },
    },
    recoveryCancellations: {
      cancel: async () => ({}) as RuntimeCancelResult,
    },
    recoveryRequeue: { requeue: async () => undefined },
  };
}

function workerBindings(): ServerRuntimeWorkerBindings {
  return {
    timer: {
      ownerId: 'runtime.timer.server',
      leaseTtlMs: 30_000,
      pageLimit: 100,
      pollIntervalMs: 60_000,
    },
    recovery: {
      ownerId: 'runtime.recovery.server',
      leaseTtlMs: 30_000,
      pageLimit: 100,
      pollIntervalMs: 60_000,
      autoRecoverReasons: ['PROJECTION_BEHIND'],
    },
  };
}

function event(id: string, type: Parameters<typeof createFrameworkEvent>[0]['type']) {
  return createFrameworkEvent({
    id,
    type,
    runId: 'run-1',
    sessionId: 'session-1',
    userId: 'user-1',
    timestamp: '2026-07-26T00:00:00.000Z',
    payload: { id, runId: 'run-1' },
  });
}
