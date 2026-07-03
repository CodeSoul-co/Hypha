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

  it('creates a durable local storage backbone for events and hybrid memory', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-storage-backbone-'));
    const storage = createLocalStorageBackbone({ rootPath: root, sqliteMode: 'json' });
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

    const reopened = createLocalStorageBackbone({ rootPath: root, sqliteMode: 'json' });
    await expect(reopened.eventStore.list({ runId: 'run_1' })).resolves.toMatchObject([
      { id: 'run_1:started', type: 'run.started' },
    ]);
    await expect(reopened.memory.read({ userId: 'owner', runId: 'run_1' }, {}))
      .resolves.toMatchObject([{ id: 'memory_1', value: 'hypha durable storage' }]);
    await expect(
      reopened.memory.search({ userId: 'owner', runId: 'run_1' }, {
        vector: await awaitVector('hypha durable storage'),
        topK: 1,
      })
    ).resolves.toMatchObject([{ record: { id: 'memory_1' } }]);
  });
});

async function awaitVector(value: string): Promise<number[]> {
  const [vector] = await new MockEmbeddingProvider().embed([value]);
  return vector;
}
