import { describe, expect, it, vi } from 'vitest';
import {
  DefaultMemoryActivityPort,
  MemoryContextInferenceBridge,
  createDomainMemoryDependencySnapshot,
  createMemoryCacheValidityInput,
  memoryCacheValidityHash,
  memoryManagementProviderSpecExample,
  memoryProfileSpecExample,
  validateMemoryProfileCapabilities,
  validateMemoryBindingCapabilities,
  type MemoryActivityRequest,
  type MemoryActivityResult,
  type MemoryManagementCapabilities,
  type MemoryEventType,
} from './index';

const request: MemoryActivityRequest = {
  operationId: 'operation:integration',
  operation: 'search',
  principal: {
    principalId: 'user:integration',
    type: 'user',
    userId: 'user:integration',
    permissionScopes: ['memory:read'],
  },
  scope: {
    userId: 'user:integration',
    workspaceId: 'workspace:integration',
    runId: 'run:integration',
  },
  profileRef: { id: 'memory.default', version: '1.0.0' },
  eventContext: {
    runId: 'run:integration',
    sessionId: 'session:integration',
    workspaceId: 'workspace:integration',
  },
  payload: { query: 'governed memory' },
};

function governance() {
  let sequence = 0;
  const publish = vi.fn(async (type: MemoryEventType) => {
    const id = 'event:activity:' + sequence + ':' + type;
    sequence += 1;
    return id;
  });
  const beforeExecute = vi.fn();
  const afterExecute = vi.fn();
  return {
    publish,
    beforeExecute,
    afterExecute,
    options: {
      events: { publish },
      harness: { beforeExecute, afterExecute },
    },
  };
}
describe('memory integration contracts', () => {
  it('rejects an activity before invoking its handler when policy denies it', async () => {
    const handler = vi.fn(async () => ({
      status: 'completed' as const,
      eventIds: [],
    }));
    const failed = vi.fn();
    const hooks = governance();
    const activities = new DefaultMemoryActivityPort({
      ...hooks.options,
      policy: {
        authorize: async () => ({
          allowed: false,
          reason: 'scope policy denied the activity',
          policyRevision: 'policy:v2',
        }),
      },
      observers: [{ onFailed: failed }],
    }).register('search', handler);

    const result = await activities.execute(request);

    expect(handler).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      status: 'failed',
      error: {
        code: 'MEMORY_POLICY_REJECTED',
        details: { policyRevision: 'policy:v2' },
      },
    });
    expect(failed).toHaveBeenCalledWith(request, result);
  });

  it('reports a completed activity without allowing observer failures to alter it', async () => {
    const completed = vi.fn(() => {
      throw new Error('trace backend unavailable');
    });
    const hooks = governance();
    const activities = new DefaultMemoryActivityPort({
      ...hooks.options,
      policy: { authorize: async () => ({ allowed: true }) },
      observers: [{ onCompleted: completed }],
    }).register('search', async () => ({
      status: 'completed',
      memoryRefs: ['memory:1:v3'],
      eventIds: ['event:search:completed'],
    }));

    const result = await activities.execute(request);

    expect(result).toEqual({
      operationId: request.operationId,
      status: 'completed',
      memoryRefs: ['memory:1:v3'],
      eventIds: [
        'event:activity:0:memory.activity.requested',
        'event:search:completed',
        'event:activity:1:memory.activity.completed',
      ],
    });
    expect(completed).toHaveBeenCalledOnce();
  });

  it('creates deterministic cache and dependency validity hashes', () => {
    const first = createMemoryCacheValidityInput({
      scope: request.scope,
      memoryProfileRevision: 'memory-profile:v3',
      selectedMemoryVersionIds: ['memory:b:v2', 'memory:a:v1'],
      policyRevision: 'policy:v2',
    });
    const second = createMemoryCacheValidityInput({
      scope: request.scope,
      memoryProfileRevision: 'memory-profile:v3',
      selectedMemoryVersionIds: ['memory:a:v1', 'memory:b:v2'],
      policyRevision: 'policy:v2',
    });

    expect(memoryCacheValidityHash(first)).toBe(memoryCacheValidityHash(second));

    const snapshotA = createDomainMemoryDependencySnapshot(
      {
        domainPackRef: { id: 'domain.example', version: '1.0.0' },
        providerRefs: [
          { id: 'provider.vector', version: '2.0.0' },
          { id: 'provider.record', version: '1.0.0' },
        ],
        policyRefs: [
          { id: 'policy.write', version: '1.0.0' },
          { id: 'policy.read', version: '1.0.0' },
        ],
        capabilitySnapshot: { search: true, add: true },
      },
      '2026-07-17T00:00:00.000Z'
    );
    const snapshotB = createDomainMemoryDependencySnapshot(
      {
        domainPackRef: { id: 'domain.example', version: '1.0.0' },
        providerRefs: [...snapshotA.providerRefs, snapshotA.providerRefs[0]].reverse(),
        policyRefs: [...snapshotA.policyRefs].reverse(),
        capabilitySnapshot: { search: true, add: true },
      },
      '2026-07-18T00:00:00.000Z'
    );

    expect(snapshotA.dependencyHash).toBe(snapshotB.dependencyHash);
    expect(snapshotA.createdAt).not.toBe(snapshotB.createdAt);
  });

  it('validates workflow bindings against negotiated provider capabilities', () => {
    const capabilities =
      memoryManagementProviderSpecExample.capabilities as MemoryManagementCapabilities;

    expect(
      validateMemoryBindingCapabilities(
        {
          memoryAccessMode: 'read_write',
          autoCapture: true,
          memoryProfileRef: { id: 'memory.default', version: '1.0.0' },
        },
        capabilities
      )
    ).toEqual([]);

    expect(
      validateMemoryBindingCapabilities(
        { memoryAccessMode: 'read_write', autoCapture: true },
        { ...capabilities, search: false, add: false }
      )
    ).toEqual([
      'Memory provider does not support search required by the workflow state.',
      'Memory provider does not support add required by the workflow state.',
      'A memory profile reference is required when memory access is enabled.',
    ]);
  });

  it('validates managed profile policies against negotiated provider capabilities', () => {
    const capabilities = memoryManagementProviderSpecExample.capabilities;

    expect(validateMemoryProfileCapabilities(memoryProfileSpecExample, capabilities)).toEqual([]);
    expect(
      validateMemoryProfileCapabilities(
        {
          ...memoryProfileSpecExample,
          consolidationPolicy: { enabled: true, trigger: 'scheduled' },
          indexingPolicy: { mode: 'async_outbox', rebuildable: true },
        },
        {
          ...capabilities,
          hybridSearch: false,
          history: false,
          conflictDetection: false,
          consolidate: false,
          asyncWrite: false,
        }
      )
    ).toEqual([
      'Memory provider does not support hybrid search required by the retrieval policy.',
      'Memory provider does not support conflict detection required by the write policy.',
      'Memory provider does not support history required by the retention policy.',
      'Memory provider does not support consolidation required by the consolidation policy.',
      'Memory provider does not support asynchronous writes required by the indexing policy.',
    ]);
  });

  it('passes a governed context envelope to inference through ports only', async () => {
    const envelope = {
      id: 'context:1',
      contextHash: 'context-hash',
      dataSegments: [],
    };
    const activity: MemoryActivityResult = {
      operationId: 'operation:context',
      status: 'completed',
      contextEnvelopeRef: envelope.id,
      eventIds: ['event:context:built'],
      output: envelope,
    };
    const invoke = vi.fn(async () => ({ answer: 'ok' }));
    const bridge = new MemoryContextInferenceBridge({ execute: async () => activity }, { invoke });

    const result = await bridge.execute({ ...request, operation: 'build_context' });

    expect(result.inferenceOutput).toEqual({ answer: 'ok' });
    expect(invoke).toHaveBeenCalledWith(
      {
        envelope,
        contextHash: envelope.contextHash,
        provenanceRequired: true,
      },
      undefined
    );
  });
  it('propagates timeout cancellation and records a failed runtime event', async () => {
    const hooks = governance();
    let handlerSignal: AbortSignal | undefined;
    const handler = vi.fn(
      async (_activity: MemoryActivityRequest, signal?: AbortSignal) =>
        new Promise<Omit<MemoryActivityResult, 'operationId'>>((resolve) => {
          handlerSignal = signal;
          signal?.addEventListener('abort', () => resolve({ status: 'cancelled', eventIds: [] }), {
            once: true,
          });
        })
    );
    const activities = new DefaultMemoryActivityPort({
      ...hooks.options,
      policy: { authorize: async () => ({ allowed: true }) },
    }).register('search', handler);

    const result = await activities.execute({ ...request, timeoutMs: 5 });

    expect(handler).toHaveBeenCalledOnce();
    expect(handlerSignal?.aborted).toBe(true);
    expect(result).toMatchObject({
      status: 'failed',
      error: { code: 'MEMORY_PROVIDER_TIMEOUT', retryable: true },
    });
    expect(result.eventIds).toEqual([
      'event:activity:0:memory.activity.requested',
      'event:activity:1:memory.activity.failed',
    ]);
    expect(hooks.beforeExecute).toHaveBeenCalledOnce();
    expect(hooks.afterExecute).toHaveBeenCalledOnce();
  });

  it('does not authorize or run a handler after external cancellation', async () => {
    const hooks = governance();
    const authorize = vi.fn(async () => ({ allowed: true }));
    const handler = vi.fn(async () => ({ status: 'completed' as const, eventIds: [] }));
    const activities = new DefaultMemoryActivityPort({
      ...hooks.options,
      policy: { authorize },
    }).register('search', handler);
    const controller = new AbortController();
    controller.abort(new Error('runtime cancelled the activity'));

    const result = await activities.execute(request, controller.signal);

    expect(result.status).toBe('cancelled');
    expect(authorize).not.toHaveBeenCalled();
    expect(handler).not.toHaveBeenCalled();
    expect(hooks.beforeExecute).not.toHaveBeenCalled();
    expect(result.eventIds).toEqual([
      'event:activity:0:memory.activity.requested',
      'event:activity:1:memory.activity.cancelled',
    ]);
  });
});
