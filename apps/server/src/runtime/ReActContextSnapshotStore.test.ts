import { hashCanonicalJson } from '@codesoul-co/core';
import { InMemoryExecutionArtifactStore } from '@codesoul-co/adapters-local';
import { ArtifactReActContextSnapshotStore, type ReActContextSnapshot } from '@codesoul-co/harness';

const scopeHash = `sha256:${'a'.repeat(64)}`;

function snapshot(): ReActContextSnapshot {
  return {
    version: '1.0.0',
    runId: 'run.snapshot',
    stepId: 'react',
    scopeHash,
    agentRef: { id: 'agent.snapshot', version: '1.0.0' },
    context: {
      runId: 'run.snapshot',
      stepId: 'react',
      agent: {
        id: 'agent.snapshot',
        version: '1.0.0',
        name: 'Snapshot Agent',
        modelAlias: 'default',
      },
      messages: [{ role: 'user', content: 'continue' }],
    },
    createdAt: '2026-07-24T04:00:00.000Z',
  };
}

describe('ArtifactReActContextSnapshotStore', () => {
  it('rebuilds an immutable Context snapshot by its verified scope identity', async () => {
    const artifacts = new InMemoryExecutionArtifactStore();
    const store = new ArtifactReActContextSnapshotStore({ artifacts });
    const value = snapshot();

    await expect(store.put(value)).resolves.toEqual({
      snapshot: value,
      snapshotHash: hashCanonicalJson(value),
      reused: false,
    });
    await expect(store.put(value)).resolves.toMatchObject({ reused: true });
    await expect(store.get(scopeHash)).resolves.toEqual(value);

    const conflicting = {
      ...value,
      createdAt: '2026-07-24T04:00:01.000Z',
    };
    await expect(store.put(conflicting)).rejects.toMatchObject({
      code: 'RUNTIME_RUN_CONFLICT',
    });
  });
});
