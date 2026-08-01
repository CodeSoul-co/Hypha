import { describe, expect, it, vi } from 'vitest';
import {
  DefaultContextInjectionGateway,
  DefaultMemoryActivityPort,
  DefaultMemoryContextBuilder,
  InMemoryLocalVectorStoreAdapter,
  IndexOutboxWorker,
  MemoryContextInferenceBridge,
  NativeMemoryManagementProvider,
  contextProfileSpecExample,
  createContextBuildActivityHandler,
  createMemoryCacheValidityInput,
  hashMemoryScope,
  memoryCacheValidityHash,
  memoryProfileSpecExample,
  validateMemoryCacheInvalidation,
  type ContextBuildInput,
  type ManagedMemoryScope,
  type MemoryAddRequest,
  type MemoryEventPublisher,
  type MemoryEventType,
  type MemoryPrincipal,
} from './index';

const principal: MemoryPrincipal = {
  principalId: 'user:canonical',
  type: 'user',
  userId: 'user:canonical',
  permissionScopes: ['memory:read', 'memory:write'],
};

const scope: ManagedMemoryScope = {
  userId: 'user:canonical',
  workspaceId: 'workspace:canonical',
  sessionId: 'session:canonical',
  runId: 'run:canonical',
  agentId: 'agent:canonical',
};

function eventFixture() {
  const types: MemoryEventType[] = [];
  const publisher: MemoryEventPublisher = {
    async publish(type) {
      types.push(type);
      return 'event:canonical:' + types.length + ':' + type;
    },
  };
  return { types, publisher };
}

describe('memory canonical contract integration', () => {
  it('runs MemoryActivity through ContextEnvelope into inference', async () => {
    const events = eventFixture();
    const beforeExecute = vi.fn();
    const afterExecute = vi.fn();
    const input: ContextBuildInput = {
      operationId: 'operation:canonical:context',
      principal,
      scope,
      runId: scope.runId!,
      profileRef: {
        id: contextProfileSpecExample.id,
        version: contextProfileSpecExample.version,
        revision: contextProfileSpecExample.revision,
      },
      modelContextWindowTokens: 4096,
      reservedSystemTokens: 128,
      reservedInstructionTokens: 128,
      reservedOutputTokens: 512,
      profile: contextProfileSpecExample,
      sourceItems: [
        {
          id: 'system:canonical',
          sourceType: 'system',
          sourceId: 'system',
          content: 'Use governed memory context.',
          text: 'Use governed memory context.',
          tokenEstimate: 6,
          priority: 100,
          required: true,
        },
        {
          id: 'message:canonical',
          sourceType: 'messages',
          sourceId: 'messages',
          content: 'Please remember my response preference.',
          text: 'Please remember my response preference.',
          tokenEstimate: 7,
          priority: 90,
          required: true,
        },
        {
          id: 'memory:canonical',
          sourceType: 'long_term_memory',
          sourceId: 'memory',
          content: 'The user prefers concise answers.',
          text: 'The user prefers concise answers.',
          tokenEstimate: 7,
          priority: 80,
          metadata: {
            scopeHash: hashMemoryScope(scope),
            memoryId: 'memory:preference',
            memoryVersionId: 'memory:preference:v2',
          },
        },
      ],
    };
    const activities = new DefaultMemoryActivityPort({
      policy: { authorize: async () => ({ allowed: true, policyRevision: 'policy:v1' }) },
      events: events.publisher,
      harness: { beforeExecute, afterExecute },
    }).register(
      'build_context',
      createContextBuildActivityHandler(
        new DefaultMemoryContextBuilder(undefined, () => '2026-07-17T00:00:00.000Z'),
        new DefaultContextInjectionGateway(() => '2026-07-17T00:00:00.000Z')
      )
    );
    const invoke = vi.fn(async ({ envelope }) => ({
      acceptedContextId: envelope.id,
      contextHash: envelope.contextHash,
    }));
    const bridge = new MemoryContextInferenceBridge(activities, { invoke });

    const result = await bridge.execute({
      operationId: input.operationId,
      operation: 'build_context',
      principal,
      scope,
      profileRef: input.profileRef,
      eventContext: {
        runId: scope.runId!,
        sessionId: scope.sessionId,
        workspaceId: scope.workspaceId,
        agentId: scope.agentId,
      },
      payload: input,
      timeoutMs: 1_000,
    });

    expect(result.activity.status).toBe('completed');
    expect(result.activity.contextEnvelopeRef).toBeTruthy();
    expect(result.activity.eventIds).toHaveLength(2);
    expect(events.types).toEqual(['memory.activity.requested', 'memory.activity.completed']);
    expect(beforeExecute).toHaveBeenCalledOnce();
    expect(afterExecute).toHaveBeenCalledOnce();
    expect(invoke).toHaveBeenCalledWith(
      expect.objectContaining({
        contextHash: expect.any(String),
        provenanceRequired: true,
      }),
      undefined
    );
  });

  it('connects commit, event, index outbox, retrieval and cache invalidation contracts', async () => {
    const events = eventFixture();
    const provider = new NativeMemoryManagementProvider({
      profile: memoryProfileSpecExample,
      events: events.publisher,
      now: () => '2026-07-17T00:00:00.000Z',
    });
    const request: MemoryAddRequest = {
      operationId: 'operation:canonical:add',
      principal,
      scope,
      input: 'The user prefers concise answers.',
      inputType: 'text',
      memoryType: 'semantic',
      source: {
        type: 'user_message',
        sourceId: 'message:canonical',
        sourceMessageId: 'message:canonical',
      },
      extractionMode: 'none',
      writeMode: 'sync',
      idempotencyKey: 'canonical:add:1',
      profileRef: {
        id: memoryProfileSpecExample.id,
        version: memoryProfileSpecExample.version,
        revision: memoryProfileSpecExample.revision,
      },
    };

    const committed = await provider.add(request);
    const record = committed.records[0]!;
    expect(committed.status).toBe('committed');
    expect(events.types).toEqual(
      expect.arrayContaining(['memory.write.requested', 'memory.write.committed'])
    );
    expect(await provider.outboxStore.list()).toHaveLength(1);

    const vectors = new InMemoryLocalVectorStoreAdapter('memory.vector.local');
    const worker = new IndexOutboxWorker({
      ownerId: 'worker:canonical:index',
      outboxStore: provider.outboxStore,
      recordStore: provider.recordStore,
      embeddingProvider: { embed: async () => [[1, 0, 0]] },
      vectorStores: [vectors],
      now: () => new Date('2026-07-17T00:00:00.000Z'),
    });
    await expect(worker.runOnce()).resolves.toMatchObject({ completed: 1 });

    const results = await provider.search({
      operationId: 'operation:canonical:search',
      principal,
      scope,
      profileRef: request.profileRef,
      query: 'concise answers',
      topK: 5,
    });
    expect(results.map((result) => result.record.id)).toContain(record.id);

    const validity = createMemoryCacheValidityInput({
      scope,
      memoryProfileRevision: memoryProfileSpecExample.revision!,
      selectedMemoryVersionIds: results.map((result) => result.record.versionId),
      policyRevision: 'policy:v1',
    });
    const invalidation = validateMemoryCacheInvalidation({
      operationId: request.operationId,
      scopeHash: validity.scopeHash,
      reason: 'created',
      memoryIds: [record.id],
      memoryVersionIds: [record.versionId],
      validityHash: memoryCacheValidityHash(validity),
    });

    expect(invalidation).toMatchObject({
      scopeHash: hashMemoryScope(scope),
      reason: 'created',
      memoryIds: [record.id],
    });
    expect((await provider.outboxStore.list())[0]?.state).toBe('completed');
    await provider.close();
  });
});
