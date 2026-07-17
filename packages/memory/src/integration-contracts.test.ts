import { describe, expect, it, vi } from 'vitest';
import {
  DefaultMemoryActivityPort,
  MemoryContextInferenceBridge,
  createDomainMemoryDependencySnapshot,
  createMemoryCacheValidityInput,
  memoryCacheValidityHash,
  memoryManagementProviderSpecExample,
  validateMemoryBindingCapabilities,
  type MemoryActivityRequest,
  type MemoryActivityResult,
  type MemoryManagementCapabilities,
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
  scope: { userId: 'user:integration', workspaceId: 'workspace:integration' },
  profileRef: { id: 'memory.default', version: '1.0.0' },
  payload: { query: 'governed memory' },
};

describe('memory integration contracts', () => {
  it('rejects an activity before invoking its handler when policy denies it', async () => {
    const handler = vi.fn(async () => ({
      status: 'completed' as const,
      eventIds: [],
    }));
    const failed = vi.fn();
    const activities = new DefaultMemoryActivityPort({
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
    const activities = new DefaultMemoryActivityPort({
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
      eventIds: ['event:search:completed'],
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
        domainPackRef: { id: 'domain.legal', version: '1.0.0' },
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
        domainPackRef: { id: 'domain.legal', version: '1.0.0' },
        providerRefs: [...snapshotA.providerRefs].reverse(),
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
});
