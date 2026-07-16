import { describe, expect, it } from 'vitest';
import {
  FileArtifactStore,
  InMemoryArtifactStore,
  InMemoryStructuredStore,
  InMemoryVectorIndexProvider,
  LocalVectorIndexProvider,
  MockEmbeddingProvider,
  SQLiteEventStore,
  SQLiteStructuredStore,
  createLocalStorageBackbone,
} from './index';
import { createFrameworkEvent } from '@hypha/core';
import {
  StructuredManagedMemoryRecordStore,
  hashMemoryScope,
  managedMemoryRecordExample,
} from '@hypha/memory';
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

  it('persists the versioned managed-memory source of truth in SQLite', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-managed-memory-'));
    const filename = path.join(root, 'managed.sqlite');
    const scope = {
      tenantId: 'tenant-a',
      userId: 'alice',
      workspaceId: 'workspace-a',
    };
    const first = {
      ...managedMemoryRecordExample,
      id: 'memory:sqlite:1',
      versionId: 'memory:sqlite:1:v1',
      scope,
      scopeHash: hashMemoryScope(scope),
    };
    const store = new StructuredManagedMemoryRecordStore({
      provider: new SQLiteStructuredStore({ filename, mode: 'sqlite' }),
    });

    await store.create(first);
    await store.createVersion(
      {
        ...first,
        versionId: 'memory:sqlite:1:v2',
        revision: 2,
        content: { preference: 'detailed answers' },
        updatedAt: '2026-07-16T00:01:00.000Z',
      },
      1
    );

    const reopened = new StructuredManagedMemoryRecordStore({
      provider: new SQLiteStructuredStore({ filename, mode: 'sqlite' }),
    });
    await expect(reopened.get(first.id, scope)).resolves.toMatchObject({ revision: 2 });
    await expect(reopened.history(first.id, scope)).resolves.toHaveLength(2);
    await expect(reopened.get(first.id, { ...scope, userId: 'bob' })).resolves.toBeNull();

    await reopened.delete(first.id, scope);
    await expect(reopened.get(first.id, scope)).resolves.toBeNull();
    await expect(reopened.history(first.id, scope)).resolves.toHaveLength(0);
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
});

async function awaitVector(value: string): Promise<number[]> {
  const [vector] = await new MockEmbeddingProvider().embed([value]);
  return vector;
}
