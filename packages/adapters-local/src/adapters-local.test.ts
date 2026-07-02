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
});
