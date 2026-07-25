import { describe, expect, it } from 'vitest';
import {
  DefaultContextInjectionGateway,
  DefaultMemoryContextBuilder,
  InMemoryContextArtifactStore,
  InMemoryContextEnvelopeCacheStore,
  VersionValidContextCache,
  contextArtifactContentHash,
  hashMemoryScope,
  type ContextBuildInput,
  type ContextCacheVersionSnapshot,
  type ContextEnvelopeCacheStore,
  type ContextProfileSpec,
  type InMemoryContextArtifactBacking,
  type VersionValidContextCacheRecord,
} from './index';

const now = () => '2026-07-24T00:00:00.000Z';
const scope = { userId: 'user:artifact', workspaceId: 'workspace:artifact', runId: 'run:artifact' };
const profile: ContextProfileSpec = {
  id: 'context-profile:artifact',
  version: '1.0.0',
  revision: 'context-profile:artifact:r1',
  sources: [
    {
      id: 'memory',
      type: 'long_term_memory',
      required: true,
      priority: 10,
      maxTokens: 200,
      overflowPolicy: 'spill_to_artifact',
    },
  ],
  maxTokens: 240,
  maxSerializedBytes: 3_000,
  deduplication: 'hash',
  ranking: { method: 'priority' },
  truncation: { method: 'hybrid', preserveRequiredSources: true },
  includeProvenance: true,
  instructionBoundary: 'strict',
  untrustedContentPolicy: 'tag',
};
const fullText = 'integrity-bound-memory '.repeat(180);

function buildInput(): ContextBuildInput {
  return {
    operationId: 'operation:artifact',
    principal: {
      principalId: 'user:artifact',
      type: 'user',
      userId: 'user:artifact',
      permissionScopes: ['memory:read'],
    },
    scope,
    runId: scope.runId,
    profileRef: { id: profile.id, version: profile.version, revision: profile.revision },
    modelContextWindowTokens: 240,
    reservedSystemTokens: 0,
    reservedInstructionTokens: 0,
    reservedOutputTokens: 0,
    profile,
    sourceItems: [
      {
        id: 'memory:large',
        sourceType: 'long_term_memory',
        sourceId: 'memory',
        content: fullText,
        text: fullText,
        tokenEstimate: 1,
        priority: 10,
        required: true,
      },
    ],
  };
}

async function buildArtifactEnvelope(backing: InMemoryContextArtifactBacking) {
  const artifactStore = new InMemoryContextArtifactStore(backing);
  const bundle = await new DefaultMemoryContextBuilder(
    undefined,
    now,
    undefined,
    undefined,
    artifactStore
  ).build(buildInput());
  const envelope = await new DefaultContextInjectionGateway(now, artifactStore).buildEnvelope(
    bundle,
    profile
  );
  return { artifactStore, bundle, envelope, reference: bundle.artifactRefs![0] };
}

describe('Context Artifact and cache integrity', () => {
  it('externalizes full content and injects only a bounded, verified descriptor', async () => {
    const { bundle, envelope, reference } = await buildArtifactEnvelope(new Map());

    expect(reference.contentHash).toBe(contextArtifactContentHash(fullText));
    expect(reference.scopeHash).toBe(hashMemoryScope(scope));
    expect(JSON.stringify(bundle)).not.toContain(fullText);
    expect(JSON.stringify(envelope)).not.toContain(fullText);
    expect(bundle.items[0].artifactRef).toEqual(reference);
    expect(envelope.dataSegments[0].artifactRefs).toEqual([reference]);
    expect(envelope.truncationRecords[0].method).toBe('spill_to_artifact');
  });

  it('rejects tampered, missing, cross-scope and cross-revision Artifacts', async () => {
    const backing: InMemoryContextArtifactBacking = new Map();
    const { artifactStore, bundle, reference } = await buildArtifactEnvelope(backing);

    await expect(
      artifactStore.read(reference, {
        scopeHash: 'scope:foreign',
        profileRevision: profile.revision!,
      })
    ).rejects.toThrow(/scope binding/);
    await expect(
      artifactStore.read(reference, {
        scopeHash: reference.scopeHash,
        profileRevision: 'context-profile:artifact:r2',
      })
    ).rejects.toThrow(/profile revision/);
    await expect(
      artifactStore.read(
        { ...reference, id: `context-artifact:${'0'.repeat(64)}` },
        { scopeHash: reference.scopeHash, profileRevision: profile.revision! }
      )
    ).rejects.toThrow(/id does not match/);

    const record = backing.get(reference.path)!;
    record.content = `${record.content}tampered`;
    await expect(
      new DefaultContextInjectionGateway(now, artifactStore).buildEnvelope(bundle, profile)
    ).rejects.toThrow(/integrity verification/);

    backing.delete(reference.path);
    await expect(
      new DefaultContextInjectionGateway(now, artifactStore).buildEnvelope(bundle, profile)
    ).rejects.toThrow(/missing/);

    await expect(
      new DefaultContextInjectionGateway(now, artifactStore).buildEnvelope(bundle, {
        ...profile,
        revision: 'context-profile:artifact:r2',
      })
    ).rejects.toThrow(/profile revision/);
  });

  it('revalidates Artifact content across cache instances and evicts corrupt entries', async () => {
    const backing: InMemoryContextArtifactBacking = new Map();
    const { envelope, reference } = await buildArtifactEnvelope(backing);
    const cacheStore = new InMemoryContextEnvelopeCacheStore();
    const snapshot: ContextCacheVersionSnapshot = {
      contextProfileRevision: profile.revision!,
      memoryProfileRevision: 'memory-profile:r1',
      scopeHash: reference.scopeHash,
      selectedMemoryVersionIds: [],
      sourceHashes: { memory: envelope.contextHash },
      artifactHashes: { [reference.id]: reference.contentHash },
    };
    const first = new VersionValidContextCache({
      store: cacheStore,
      artifactStore: new InMemoryContextArtifactStore(backing),
      now,
    });
    await first.set('artifact-context', envelope, snapshot);

    const restarted = new VersionValidContextCache({
      store: cacheStore,
      artifactStore: new InMemoryContextArtifactStore(backing),
      now,
    });
    await expect(restarted.get('artifact-context', snapshot)).resolves.toEqual(envelope);

    backing.get(reference.path)!.content = 'tampered after restart';
    await expect(restarted.get('artifact-context', snapshot)).resolves.toBeNull();
    await expect(restarted.get('artifact-context', snapshot)).resolves.toBeNull();
  });

  it('rejects a cache envelope whose serialized projection was modified', async () => {
    let record: VersionValidContextCacheRecord | null = null;
    const store: ContextEnvelopeCacheStore = {
      async get() {
        return record ? structuredClone(record) : null;
      },
      async set(_key, value) {
        record = structuredClone(value);
      },
      async delete() {
        record = null;
      },
    };
    const cache = new VersionValidContextCache({ store, now });
    const snapshot: ContextCacheVersionSnapshot = {
      contextProfileRevision: 'context:r1',
      memoryProfileRevision: 'memory:r1',
      scopeHash: 'scope:cache',
      selectedMemoryVersionIds: [],
      sourceHashes: {},
    };
    const envelope = {
      id: 'envelope:cache',
      runId: 'run:cache',
      contextHash: 'sha256:original',
      profileRevision: 'context:r1',
      budgetPlan: {
        totalAvailableTokens: 10,
        fixedTokens: 0,
        dynamicTokens: 10,
        sourceBudgets: [],
        tokenizerRef: { id: 'tokenizer', version: '1' },
        safetyMarginTokens: 0,
      },
      systemSegments: [],
      instructionSegments: [],
      dataSegments: [],
      includedSourceRefs: [],
      omittedSourceRefs: [],
      truncationRecords: [],
      provenanceIndex: {},
      conflicts: [],
      totalTokens: 0,
      createdAt: now(),
    };
    await cache.set('tampered-envelope', envelope, snapshot);
    record!.envelope.contextHash = 'sha256:tampered';

    await expect(cache.get('tampered-envelope', snapshot)).resolves.toBeNull();
    expect(record).toBeNull();
  });
  it('fails closed when a required spill has no Artifact store', async () => {
    await expect(
      new DefaultMemoryContextBuilder(undefined, now).build(buildInput())
    ).rejects.toThrow(/Artifact store is required/);
  });
});
