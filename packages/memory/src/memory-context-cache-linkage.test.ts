import { describe, expect, it, vi } from 'vitest';
import {
  DefaultMemoryActivityPort,
  GovernedMemoryManager,
  InMemoryContextEnvelopeCacheStore,
  InMemoryMemoryMutationGenerationStore,
  MemoryProjectionInvalidationCoordinator,
  NativeMemoryManagementProvider,
  VersionValidContextCache,
  hashMemoryScope,
  memoryProfileSpecExample,
  registerMemoryManagementProviderHandlers,
  type ContextCacheVersionSnapshot,
  type ContextEnvelope,
  type ContextEnvelopeCacheStore,
  type MemoryEventType,
  type VersionValidContextCacheRecord,
} from './index';

const principal = {
  principalId: 'user:linkage',
  type: 'user' as const,
  userId: 'user:linkage',
  permissionScopes: ['memory:read', 'memory:write'],
};
const scope = {
  tenantId: 'tenant:linkage',
  userId: 'user:linkage',
  workspaceId: 'workspace:linkage',
  sessionId: 'session:linkage',
  runId: 'run:linkage',
  agentId: 'agent:linkage',
  domainPackId: 'domain:linkage',
};

function envelope(versionId: string, contextHash: string): ContextEnvelope {
  return {
    id: 'context:' + contextHash,
    runId: scope.runId,
    contextHash,
    profileRevision: 'context:r1',
    budgetPlan: {
      totalAvailableTokens: 100,
      fixedTokens: 0,
      dynamicTokens: 100,
      sourceBudgets: [],
      tokenizerRef: { id: 'tokenizer', version: '1' },
      safetyMarginTokens: 0,
    },
    systemSegments: [],
    instructionSegments: [],
    dataSegments: [],
    includedSourceRefs: ['memory'],
    omittedSourceRefs: [],
    truncationRecords: [],
    provenanceIndex: {
      memory: {
        sourceType: 'long_term_memory',
        sourceId: 'memory',
        memoryId: 'memory:linkage',
        memoryVersionId: versionId,
        citationLabel: '[source:memory]',
      },
    },
    conflicts: [],
    totalTokens: 0,
    createdAt: '2026-07-28T00:00:00.000Z',
  };
}

function snapshot(
  versionId: string,
  mutationGeneration: string,
  sourceHash: string
): ContextCacheVersionSnapshot {
  return {
    contextProfileRevision: 'context:r1',
    memoryProfileRevision: memoryProfileSpecExample.revision!,
    scopeHash: hashMemoryScope(scope),
    providerRevision: 'memory-default-v1',
    policyRevision: 'policy:r1',
    mutationGeneration,
    selectedMemoryVersionIds: [versionId],
    sourceHashes: { memory: sourceHash },
  };
}

function governedFixture(projectionInvalidation: MemoryProjectionInvalidationCoordinator) {
  const provider = new NativeMemoryManagementProvider({ profile: memoryProfileSpecExample });
  const activities = new DefaultMemoryActivityPort({
    policy: {
      authorize: async () => ({ allowed: true, policyRevision: 'policy:r1' }),
    },
    events: {
      publish: async (type: MemoryEventType) => 'event:' + type,
    },
    harness: {
      beforeExecute: vi.fn(),
      afterExecute: vi.fn(),
    },
  });
  registerMemoryManagementProviderHandlers(activities, provider);
  const manager = new GovernedMemoryManager({
    activities,
    providerId: provider.id,
    profileRef: memoryProfileSpecExample,
    eventContext: { runId: scope.runId, workspaceId: scope.workspaceId },
    projectionInvalidation,
  });
  return { manager, provider };
}

describe('Memory Context, PromptPrefix and MemoryTree mutation linkage', () => {
  it('invalidates every projection only after verified update/delete terminals', async () => {
    const generations = new InMemoryMemoryMutationGenerationStore();
    const context = new VersionValidContextCache({
      store: new InMemoryContextEnvelopeCacheStore(),
      projectionId: 'context',
      generations,
    });
    const promptPrefix = new VersionValidContextCache({
      store: new InMemoryContextEnvelopeCacheStore(),
      projectionId: 'prompt-prefix',
      generations,
    });
    const memoryTree = new VersionValidContextCache({
      store: new InMemoryContextEnvelopeCacheStore(),
      projectionId: 'memory-tree',
      generations,
    });
    const coordinator = new MemoryProjectionInvalidationCoordinator(generations, [
      context,
      promptPrefix,
      memoryTree,
    ]);
    const { manager } = governedFixture(coordinator);
    const added = await manager.add({
      operationId: 'operation:linkage:add',
      principal,
      scope,
      profileRef: memoryProfileSpecExample,
      input: 'original linkage memory',
      memoryType: 'semantic',
      source: { type: 'user_message' },
    });
    const original = added.records[0]!;
    const originalEnvelope = envelope(original.versionId, 'context:original');
    const originalSnapshot = snapshot(original.versionId, '0', 'source:original');
    for (const cache of [context, promptPrefix, memoryTree]) {
      await cache.set(cache.id, originalEnvelope, originalSnapshot);
    }

    await expect(
      manager.update({
        operationId: 'operation:linkage:rejected-update',
        principal,
        scope,
        memoryId: original.id,
        expectedRevision: original.revision + 100,
        patch: { canonicalText: 'must fail' },
        reason: 'revision conflict',
      })
    ).rejects.toBeTruthy();
    await expect(generations.current(hashMemoryScope(scope))).resolves.toBe('0');
    for (const cache of [context, promptPrefix, memoryTree]) {
      await expect(cache.get(cache.id, originalSnapshot)).resolves.toEqual(originalEnvelope);
    }

    const updated = await manager.update({
      operationId: 'operation:linkage:update',
      principal,
      scope,
      memoryId: original.id,
      expectedRevision: original.revision,
      patch: { canonicalText: 'updated linkage memory' },
      reason: 'linkage acceptance',
    });
    const current = updated.records[0]!;
    await expect(generations.current(hashMemoryScope(scope))).resolves.toBe('1');
    for (const cache of [context, promptPrefix, memoryTree]) {
      await expect(cache.get(cache.id, originalSnapshot)).resolves.toBeNull();
    }

    const updatedEnvelope = envelope(current.versionId, 'context:updated');
    const updatedSnapshot = snapshot(current.versionId, '1', 'source:updated');
    for (const cache of [context, promptPrefix, memoryTree]) {
      await cache.set(cache.id, updatedEnvelope, updatedSnapshot);
    }
    await manager.delete({
      operationId: 'operation:linkage:delete',
      principal,
      scope,
      memoryIds: [current.id],
      mode: 'soft',
      reason: 'linkage acceptance',
    });
    await expect(generations.current(hashMemoryScope(scope))).resolves.toBe('2');
    for (const cache of [context, promptPrefix, memoryTree]) {
      await expect(cache.get(cache.id, updatedSnapshot)).resolves.toBeNull();
    }
  });

  it('fences an old projection write that overlaps a successful mutation', async () => {
    const generations = new InMemoryMemoryMutationGenerationStore();
    let record: VersionValidContextCacheRecord | null = null;
    let invalidateDuringSet: () => Promise<void> = async () => undefined;
    const store: ContextEnvelopeCacheStore = {
      get: async () => (record ? structuredClone(record) : null),
      set: async (_key, value) => {
        await invalidateDuringSet();
        record = structuredClone(value);
      },
      delete: async () => {
        record = null;
      },
      invalidateScope: async () => {
        const count = record ? 1 : 0;
        record = null;
        return count;
      },
    };
    const cache = new VersionValidContextCache({
      store,
      projectionId: 'context',
      generations,
    });
    const coordinator = new MemoryProjectionInvalidationCoordinator(generations, [cache]);
    invalidateDuringSet = async () => {
      await coordinator.invalidate({
        operationId: 'operation:overlap:update',
        scope,
        reason: 'updated',
        memoryIds: ['memory:linkage'],
        memoryVersionIds: ['memory:linkage:v2'],
      });
    };
    const staleSnapshot = snapshot('memory:linkage:v1', '0', 'source:stale');

    await expect(
      cache.set('context', envelope('memory:linkage:v1', 'context:stale'), staleSnapshot)
    ).rejects.toThrow(/mutation generation changed/);
    await expect(store.get('context')).resolves.toBeNull();
    await expect(generations.current(hashMemoryScope(scope))).resolves.toBe('1');
  });
  it('blocks stale reads even when physical cache cleanup fails', async () => {
    const generations = new InMemoryMemoryMutationGenerationStore();
    const store = new InMemoryContextEnvelopeCacheStore();
    const cache = new VersionValidContextCache({ store, generations });
    const staleSnapshot = snapshot('memory:linkage:v1', '0', 'source:stale');
    await cache.set('context', envelope('memory:linkage:v1', 'context:stale'), staleSnapshot);
    const coordinator = new MemoryProjectionInvalidationCoordinator(generations, [
      {
        id: 'unavailable-physical-cache',
        invalidateScope: async () => {
          throw new Error('cache unavailable');
        },
      },
    ]);

    await expect(
      coordinator.invalidate({
        operationId: 'operation:cleanup-failure:update',
        scope,
        reason: 'updated',
        memoryIds: ['memory:linkage'],
        memoryVersionIds: ['memory:linkage:v2'],
      })
    ).rejects.toMatchObject({ code: 'MEMORY_STORE_UNAVAILABLE' });
    await expect(generations.current(hashMemoryScope(scope))).resolves.toBe('1');
    await expect(cache.get('context', staleSnapshot)).resolves.toBeNull();
  });
});
