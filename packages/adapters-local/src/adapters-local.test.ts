import { describe, expect, it } from 'vitest';
import {
  InMemoryArtifactStore,
  InMemoryStructuredStore,
  InMemoryVectorIndexProvider,
} from './index';

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
});
