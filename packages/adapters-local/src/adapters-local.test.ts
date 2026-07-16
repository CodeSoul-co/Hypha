import { describe, expect, it } from 'vitest';
import {
  FileArtifactStore,
  InMemoryArtifactStore,
  InMemoryStructuredStore,
  InMemoryVectorIndexProvider,
  LocalRuntimeCommandQueue,
  LocalVectorIndexProvider,
  LocalRuntimeDeliveryStore,
  LocalRuntimeLeaseCoordinator,
  LocalRuntimeMessageBus,
  MockEmbeddingProvider,
  SQLiteEventStore,
  SQLiteStructuredStore,
  createLocalRuntimeEngine,
  createLocalRuntimePersistence,
  createLocalStorageBackbone,
} from './index';
import { createFrameworkEvent } from '@hypha/core';
import type { RuntimeActivityPort } from '@hypha/harness';
import fs from 'fs';
import os from 'os';
import path from 'path';

describe('@hypha/adapters-local reference providers', () => {
  it('stores structured records, vectors, and artifacts locally', async () => {
    const structured = new InMemoryStructuredStore();
    await structured.insert('runs', { id: 'run_1', status: 'completed' });
    await expect(structured.get('runs', 'run_1')).resolves.toMatchObject({ status: 'completed' });

    const vector = new InMemoryVectorIndexProvider();
    await vector.upsert([{ id: 'memory_1', vector: [1, 0], metadata: { type: 'semantic' } }]);
    await expect(vector.search({ vector: [1, 0], topK: 1 })).resolves.toMatchObject([
      { id: 'memory_1' },
    ]);

    const artifacts = new InMemoryArtifactStore();
    const ref = await artifacts.put('trace/run_1.json', '{"ok":true}');
    await expect(artifacts.get(ref)).resolves.toEqual(Buffer.from('{"ok":true}'));
  });

  it('provides SQLite, local vector, and file artifact adapters', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-local-adapters-'));
    const structured = new SQLiteStructuredStore({ filename: path.join(root, 'hypha.sqlite') });
    await structured.insert('memory_records', {
      id: 'memory_1',
      userId: 'owner',
      type: 'semantic',
      value: 'hypha',
    });
    await expect(
      structured.query('memory_records', { where: { userId: 'owner' } })
    ).resolves.toMatchObject([{ id: 'memory_1', value: 'hypha' }]);

    const vector = new LocalVectorIndexProvider({ filename: path.join(root, 'vectors.json') });
    await vector.upsert([{ id: 'memory_1', vector: [1, 0], metadata: { userId: 'owner' } }]);
    await expect(
      vector.search({ vector: [1, 0], topK: 1, filter: { userId: 'owner' } })
    ).resolves.toMatchObject([{ id: 'memory_1', score: 1 }]);

    const artifacts = new FileArtifactStore({ rootPath: path.join(root, 'artifacts') });
    const ref = await artifacts.put('runs/run_1.json', '{"ok":true}');
    await expect(artifacts.get(ref)).resolves.toEqual(Buffer.from('{"ok":true}'));

    await expect(new MockEmbeddingProvider().embed(['hypha'])).resolves.toHaveLength(1);
  });

  it('stores framework events in SQLite for replayable local runtime traces', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-event-store-'));
    const events = new SQLiteEventStore({ filename: path.join(root, 'events.sqlite') });
    await events.append(
      createFrameworkEvent({
        id: 'run_1:created',
        type: 'run.created',
        runId: 'run_1',
        sessionId: 'session_1',
        payload: { id: 'run_1' },
      })
    );

    await expect(events.list({ runId: 'run_1' })).resolves.toMatchObject([
      { id: 'run_1:created', type: 'run.created', sessionId: 'session_1' },
    ]);
  });

  it('exports and imports framework event traces as JSONL', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-event-jsonl-'));
    const jsonlFile = path.join(root, 'traces', 'run_jsonl.events.jsonl');
    const events = new SQLiteEventStore({
      filename: path.join(root, 'events.sqlite'),
      mode: 'json',
    });
    await events.append(
      createFrameworkEvent({
        id: 'run_jsonl:started',
        type: 'run.started',
        runId: 'run_jsonl',
        sessionId: 'session_jsonl',
        timestamp: '2026-07-03T00:00:00.000Z',
        payload: { input: 'hello' },
      })
    );
    await events.append(
      createFrameworkEvent({
        id: 'run_jsonl:review:approved',
        type: 'human.review.approved',
        runId: 'run_jsonl',
        sessionId: 'session_jsonl',
        timestamp: '2026-07-03T00:00:01.000Z',
        payload: { reviewerId: 'owner' },
      })
    );

    await expect(events.exportJsonl(jsonlFile, { runId: 'run_jsonl' })).resolves.toBe(2);
    expect(fs.readFileSync(jsonlFile, 'utf-8').trim().split('\n')).toHaveLength(2);

    const imported = new SQLiteEventStore({
      filename: path.join(root, 'imported.sqlite'),
      mode: 'json',
    });
    await expect(imported.importJsonl(jsonlFile)).resolves.toBe(2);
    await expect(imported.list({ runId: 'run_jsonl' })).resolves.toMatchObject([
      { id: 'run_jsonl:started', type: 'run.started' },
      { id: 'run_jsonl:review:approved', type: 'human.review.approved' },
    ]);
  });

  it('uses JSON fallback storage when node:sqlite is unavailable or disabled', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-json-adapters-'));
    const structured = new SQLiteStructuredStore({
      filename: path.join(root, 'hypha.sqlite'),
      mode: 'json',
    });
    await structured.insert('runs', { id: 'run_json', status: 'completed' });
    await expect(structured.get('runs', 'run_json')).resolves.toMatchObject({
      status: 'completed',
    });

    const events = new SQLiteEventStore({
      filename: path.join(root, 'events.sqlite'),
      mode: 'json',
    });
    await events.append(
      createFrameworkEvent({
        id: 'run_json:created',
        type: 'run.created',
        runId: 'run_json',
        payload: { id: 'run_json' },
      })
    );

    await expect(events.list({ runId: 'run_json' })).resolves.toHaveLength(1);
    expect(fs.existsSync(path.join(root, 'events.sqlite.json'))).toBe(true);
  });

  it('uses a real SQLite file when SQLite mode is required', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-sqlite-adapters-'));
    const structuredFilename = path.join(root, 'structured.sqlite');
    const eventsFilename = path.join(root, 'events.sqlite');

    const structured = new SQLiteStructuredStore({
      filename: structuredFilename,
      mode: 'sqlite',
    });
    await structured.insert('runs', { id: 'run_sqlite', status: 'completed' });
    await expect(structured.get('runs', 'run_sqlite')).resolves.toMatchObject({
      status: 'completed',
    });

    const events = new SQLiteEventStore({
      filename: eventsFilename,
      mode: 'sqlite',
    });
    await events.append(
      createFrameworkEvent({
        id: 'run_sqlite:created',
        type: 'run.created',
        runId: 'run_sqlite',
        payload: { id: 'run_sqlite' },
      })
    );

    await expect(events.list({ runId: 'run_sqlite' })).resolves.toHaveLength(1);
    expect(fs.existsSync(structuredFilename)).toBe(true);
    expect(fs.existsSync(eventsFilename)).toBe(true);
    expect(fs.existsSync(`${structuredFilename}.json`)).toBe(false);
    expect(fs.existsSync(`${eventsFilename}.json`)).toBe(false);

    const reopenedStructured = new SQLiteStructuredStore({
      filename: structuredFilename,
      mode: 'sqlite',
    });
    const reopenedEvents = new SQLiteEventStore({
      filename: eventsFilename,
      mode: 'sqlite',
    });
    await expect(reopenedStructured.get('runs', 'run_sqlite')).resolves.toMatchObject({
      status: 'completed',
    });
    await expect(reopenedEvents.list({ runId: 'run_sqlite' })).resolves.toHaveLength(1);
  });

  it('creates a durable local storage backbone for events and hybrid memory', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-storage-backbone-'));
    const storage = createLocalStorageBackbone({ rootPath: root, sqliteMode: 'sqlite' });
    expect(storage.profiles.map((profile) => profile.id)).toEqual([
      'storage.sqlite.events',
      'storage.sqlite.structured',
      'storage.local-vector.semantic',
      'storage.file-artifact.local',
    ]);

    await storage.eventStore.append(
      createFrameworkEvent({
        id: 'run_1:started',
        type: 'run.started',
        runId: 'run_1',
        sessionId: 'session_1',
        payload: { input: 'hello' },
      })
    );
    await storage.memory.write(
      { userId: 'owner', runId: 'run_1' },
      {
        id: 'memory_1',
        type: 'semantic',
        value: 'hypha durable storage',
        provenance: { eventId: 'run_1:started' },
        createdAt: '2026-07-03T00:00:00.000Z',
      },
      { requireProvenance: true }
    );

    const reopened = createLocalStorageBackbone({ rootPath: root, sqliteMode: 'sqlite' });
    await expect(reopened.eventStore.list({ runId: 'run_1' })).resolves.toMatchObject([
      { id: 'run_1:started', type: 'run.started' },
    ]);
    await expect(
      reopened.memory.read({ userId: 'owner', runId: 'run_1' }, {})
    ).resolves.toMatchObject([{ id: 'memory_1', value: 'hypha durable storage' }]);
    await expect(
      reopened.memory.search(
        { userId: 'owner', runId: 'run_1' },
        {
          vector: await awaitVector('hypha durable storage'),
          topK: 1,
        }
      )
    ).resolves.toMatchObject([{ record: { id: 'memory_1' } }]);
  });

  it('stores append-only event streams with idempotency and revisions locally', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-event-streams-'));
    const events = new SQLiteEventStore({ filename: path.join(root, 'events.sqlite') });
    const first = await events.appendToStream(
      createFrameworkEvent({
        id: 'run_stream:created',
        type: 'run.created',
        runId: 'run_stream',
        streamId: 'run_stream',
        idempotencyKey: 'create-run',
        payload: { id: 'run_stream' },
      }),
      { expectedStreamSequence: 0 }
    );
    const duplicate = await events.appendToStream(
      createFrameworkEvent({
        id: 'run_stream:created:retry',
        type: 'run.created',
        runId: 'run_stream',
        streamId: 'run_stream',
        idempotencyKey: 'create-run',
        payload: { id: 'run_stream' },
      })
    );

    expect(first).toMatchObject({
      status: 'appended',
      streamId: 'run_stream',
      streamSequence: 1,
      globalSequence: 1,
    });
    expect(duplicate).toMatchObject({
      status: 'duplicate',
      event: { id: 'run_stream:created', streamSequence: 1 },
    });
    await expect(events.getStreamRevision('run_stream')).resolves.toBe(1);
    await expect(
      events.appendToStream(
        createFrameworkEvent({
          id: 'run_stream:started',
          type: 'run.started',
          runId: 'run_stream',
          streamId: 'run_stream',
          payload: {},
        }),
        { expectedStreamSequence: 0 }
      )
    ).rejects.toMatchObject({ code: 'EVENT_STREAM_REVISION_CONFLICT' });
  });

  it('persists runtime delivery records across local adapter instances', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-delivery-'));
    const filename = path.join(root, 'runtime.sqlite');
    const now = sequenceClock([
      '2026-07-03T00:00:00.000Z',
      '2026-07-03T00:00:01.000Z',
      '2026-07-03T00:00:02.000Z',
      '2026-07-03T00:00:03.000Z',
      '2026-07-03T00:00:04.000Z',
    ]);
    const first = new LocalRuntimeDeliveryStore({
      structured: new SQLiteStructuredStore({ filename, mode: 'sqlite' }),
      now,
    });

    const enqueued = await first.enqueue(
      'outbox',
      {
        id: 'message_1',
        topic: 'runtime.events',
        payload: { eventId: 'event_1' },
        idempotencyKey: 'event_1:message',
        publishedAt: '2026-07-03T00:00:00.000Z',
      },
      { maxAttempts: 2 }
    );
    expect(enqueued.status).toBe('enqueued');
    await expect(
      first.enqueue('outbox', enqueued.record.message, { idempotencyKey: 'event_1:message' })
    ).resolves.toMatchObject({ status: 'duplicate', record: { id: enqueued.record.id } });

    const second = new LocalRuntimeDeliveryStore({
      structured: new SQLiteStructuredStore({ filename, mode: 'sqlite' }),
      now,
    });
    const leased = await second.leaseNext({
      box: 'outbox',
      topic: 'runtime.events',
      ownerId: 'worker_1',
      ttlMs: 30000,
    });
    expect(leased).toMatchObject({
      id: enqueued.record.id,
      status: 'leased',
      attempts: 1,
      leaseOwnerId: 'worker_1',
    });
    await expect(second.acknowledge(leased!.id, leased!.leaseToken!)).resolves.toMatchObject({
      status: 'acknowledged',
    });

    const reopened = new LocalRuntimeDeliveryStore({
      structured: new SQLiteStructuredStore({ filename, mode: 'sqlite' }),
      now,
    });
    await expect(reopened.list({ status: 'acknowledged' })).resolves.toMatchObject([
      { id: enqueued.record.id, topic: 'runtime.events' },
    ]);
  });

  it('persists runtime command queue ordering and idempotency', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-command-'));
    const filename = path.join(root, 'runtime.sqlite');
    const scope = {
      userId: 'owner',
      sessionId: 'session_1',
      runId: 'run_1',
    };
    const first = new LocalRuntimeCommandQueue({
      structured: new SQLiteStructuredStore({ filename, mode: 'sqlite' }),
      now: sequenceClock([
        '2026-07-03T00:00:00.000Z',
        '2026-07-03T00:00:01.000Z',
        '2026-07-03T00:00:02.000Z',
      ]),
    });
    const command = {
      id: 'command_1',
      type: 'run.start' as const,
      scope,
      payload: { runId: 'run_1' },
      idempotencyKey: 'run_1:start',
      createdAt: '2026-07-03T00:00:00.000Z',
    };

    await expect(first.enqueue(command)).resolves.toMatchObject({
      status: 'enqueued',
      item: { command: { id: 'command_1' }, sequence: 1 },
    });
    await expect(first.enqueue(command)).resolves.toMatchObject({
      status: 'duplicate',
      item: { command: { id: 'command_1' }, sequence: 1 },
    });

    const second = new LocalRuntimeCommandQueue({
      structured: new SQLiteStructuredStore({ filename, mode: 'sqlite' }),
    });
    await expect(second.size(scope)).resolves.toBe(1);
    await expect(second.dequeue(scope)).resolves.toMatchObject({
      command: { id: 'command_1', type: 'run.start' },
      queueKey: 'owner:session_1',
      sequence: 1,
    });
    await expect(second.dequeue(scope)).resolves.toBeNull();
  });

  it('dead-letters runtime delivery records after persisted retry exhaustion', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-delivery-dlq-'));
    const runtime = createLocalRuntimePersistence({
      filename: path.join(root, 'runtime.sqlite'),
      mode: 'sqlite',
      defaultMaxAttempts: 1,
      now: sequenceClock([
        '2026-07-03T00:00:00.000Z',
        '2026-07-03T00:00:01.000Z',
        '2026-07-03T00:00:02.000Z',
        '2026-07-03T00:00:03.000Z',
      ]),
    });
    await runtime.delivery.enqueue('inbox', {
      id: 'message_2',
      topic: 'runtime.commands',
      payload: { commandId: 'command_1' },
      publishedAt: '2026-07-03T00:00:00.000Z',
    });
    const leased = await runtime.delivery.leaseNext({
      box: 'inbox',
      ownerId: 'worker_1',
      ttlMs: 30000,
    });
    await expect(
      runtime.delivery.negativeAcknowledge(leased!.id, leased!.leaseToken!, {
        reason: 'handler_failed',
      })
    ).resolves.toMatchObject({
      status: 'dead_lettered',
      deadLetterReason: 'handler_failed',
    });
  });

  it('persists runtime bus messages through the local delivery outbox', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-bus-'));
    const filename = path.join(root, 'runtime.sqlite');
    const delivery = new LocalRuntimeDeliveryStore({
      structured: new SQLiteStructuredStore({ filename, mode: 'sqlite' }),
      now: () => '2026-07-03T00:00:00.000Z',
    });
    const bus = new LocalRuntimeMessageBus({
      delivery,
      now: () => '2026-07-03T00:00:00.000Z',
    });
    const received: string[] = [];
    await bus.subscribe('runtime.events', (message) => {
      received.push(message.id);
    });

    const first = await bus.publish(
      {
        topic: 'runtime.events',
        payload: { eventId: 'event_1' },
        idempotencyKey: 'event_1:message',
      },
      { correlationId: 'run_1' }
    );
    const duplicate = await bus.publish({
      topic: 'runtime.events',
      payload: { eventId: 'event_1' },
      idempotencyKey: 'event_1:message',
    });

    expect(first.duplicate).toBe(false);
    expect(duplicate).toMatchObject({ duplicate: true, messageId: first.messageId });
    expect(received).toEqual([first.messageId]);

    const reopened = new LocalRuntimeMessageBus({
      delivery: new LocalRuntimeDeliveryStore({
        structured: new SQLiteStructuredStore({ filename, mode: 'sqlite' }),
      }),
    });
    await expect(reopened.list('runtime.events')).resolves.toMatchObject([
      { id: first.messageId, topic: 'runtime.events' },
    ]);
  });

  it('creates a restart-safe local runtime engine for command processing and projections', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-engine-'));
    const scope = {
      userId: 'owner',
      sessionId: 'session_1',
      runId: 'run_1',
      agentId: 'agent_1',
    };
    const first = createLocalRuntimeEngine({
      rootPath: root,
      sqliteMode: 'sqlite',
      now: () => '2026-07-03T00:00:00.000Z',
      workerId: 'worker_1',
    });
    await first.commandProcessor.submit({
      id: 'command_create_run',
      type: 'run.create',
      scope,
      payload: { input: 'hello' },
      idempotencyKey: 'run_1:create',
      correlationId: 'run_1',
      createdAt: '2026-07-03T00:00:00.000Z',
    });

    const reopened = createLocalRuntimeEngine({
      rootPath: root,
      sqliteMode: 'sqlite',
      now: () => '2026-07-03T00:00:01.000Z',
      workerId: 'worker_2',
    });
    await expect(reopened.runtime.commandQueue.size(scope)).resolves.toBe(1);
    await expect(reopened.commandProcessor.processNext(scope)).resolves.toMatchObject({
      commandId: 'command_create_run',
      commandType: 'run.create',
    });
    await expect(reopened.runtime.commandQueue.size(scope)).resolves.toBe(0);
    await expect(reopened.events.getStream('run_1')).resolves.toMatchObject([
      { type: 'runtime.command.enqueued', streamSequence: 1 },
      { type: 'run.created', streamSequence: 2 },
      { type: 'runtime.command.applied', streamSequence: 3 },
    ]);
    await expect(reopened.runtime.bus.list('runtime.commands')).resolves.toHaveLength(1);
    await expect(reopened.runtime.bus.list('runtime.events')).resolves.toHaveLength(2);
    await expect(reopened.serverRuntime.projectLoop('run_1')).resolves.toMatchObject({
      runId: 'run_1',
      view: { isRunning: false },
    });
  });

  it('wires a local recovery worker for restart-safe waiting attempt reconciliation', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-recovery-worker-'));
    const scope = {
      userId: 'owner',
      sessionId: 'session_1',
      runId: 'run_recovery',
      agentId: 'agent_1',
    };
    const waitingPort: RuntimeActivityPort = {
      execute: async (request) => ({
        activityId: request.activityId,
        status: 'waiting',
        eventIds: [],
      }),
      cancel: async () => undefined,
      reconcile: async (activityId) => ({
        activityId,
        status: 'completed',
        eventIds: ['human.review.approved:1'],
      }),
    };
    const first = createLocalRuntimeEngine({
      rootPath: root,
      sqliteMode: 'sqlite',
      now: () => '2026-07-03T00:00:00.000Z',
      workerId: 'worker_1',
    });
    await first.stateAttemptExecutor.execute(
      {
        scope,
        fsmProcessId: 'fsm.runtime.loop.default',
        stateId: 'HumanReview',
        attempt: 1,
        activityType: 'human',
        operationId: 'review',
        input: { reason: 'approval_required' },
      },
      waitingPort
    );

    const reopened = createLocalRuntimeEngine({
      rootPath: root,
      sqliteMode: 'sqlite',
      now: () => '2026-07-03T00:00:10.000Z',
      workerId: 'worker_2',
      recoveryResolver: {
        resolve: async () => waitingPort,
      },
    });
    await expect(reopened.recoveryWorker?.runOnce({ scanId: 'scan_1' })).resolves.toMatchObject({
      status: 'completed',
      scan: {
        scanned: 1,
        selected: 1,
        recovered: [{ status: 'completed' }],
      },
    });
    await expect(reopened.serverRuntime.projectStateAttempts('run_recovery')).resolves.toMatchObject({
      waiting: [],
      attempts: [
        expect.objectContaining({
          stateId: 'HumanReview',
          status: 'completed',
        }),
      ],
    });
  });

  it('persists runtime leases with fencing tokens', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-lease-'));
    const filename = path.join(root, 'runtime.sqlite');
    const first = new LocalRuntimeLeaseCoordinator({
      structured: new SQLiteStructuredStore({ filename, mode: 'sqlite' }),
      now: () => '2026-07-03T00:00:00.000Z',
    });
    const acquired = await first.acquire('runtime.session:user:session', 'worker_1', 30000);
    expect(acquired).toMatchObject({
      status: 'acquired',
      lease: { ownerId: 'worker_1', fencingToken: 1 },
    });

    const second = new LocalRuntimeLeaseCoordinator({
      structured: new SQLiteStructuredStore({ filename, mode: 'sqlite' }),
      now: () => '2026-07-03T00:00:01.000Z',
    });
    await expect(
      second.acquire('runtime.session:user:session', 'worker_2', 30000)
    ).resolves.toMatchObject({
      status: 'busy',
      current: { ownerId: 'worker_1', fencingToken: 1 },
    });
    await expect(second.assert('runtime.session:user:session', 1)).resolves.toBeUndefined();
    await expect(
      second.renew('runtime.session:user:session', 'worker_1', 1, 30000)
    ).resolves.toMatchObject({ fencingToken: 1 });
  });
});

async function awaitVector(value: string): Promise<number[]> {
  const [vector] = await new MockEmbeddingProvider().embed([value]);
  return vector;
}

function sequenceClock(values: string[]): () => string {
  let index = 0;
  return () => {
    const value = values[Math.min(index, values.length - 1)];
    index += 1;
    return value;
  };
}
