import { describe, expect, it, vi } from 'vitest';
import {
  DefaultContextInjectionGateway,
  DefaultMemoryContextBuilder,
  MemoryManagementProviderRegistry,
  MemoryRuntimeFactory,
  NativeMemoryManagementProvider,
  memoryManagementProviderSpecExample,
  memoryProfileSpecExample,
  type ContextProfileSpec,
  type MemoryAddRequest,
  type MemoryEventType,
  type MemoryRuntimeConfig,
} from './index';

function runtimeConfig(): MemoryRuntimeConfig {
  return {
    activeProfile: memoryProfileSpecExample.id,
    profiles: {
      [memoryProfileSpecExample.id]: {
        profile: memoryProfileSpecExample,
        management: {
          ...memoryManagementProviderSpecExample,
          capabilities: {
            ...memoryManagementProviderSpecExample.capabilities,
            summarize: false,
            consolidate: false,
            decay: false,
            reinforce: false,
            graphRelations: false,
          },
        },
      },
    },
  };
}

const principal = {
  principalId: 'consumer-user',
  type: 'user' as const,
  userId: 'consumer-user',
  permissionScopes: ['memory:read', 'memory:write'],
};
const scope = { userId: 'consumer-user', runId: 'consumer-run' };

describe('public Memory consumer composition', () => {
  it('assembles service, context, health, resources, and close using only public exports', async () => {
    const installationClose = vi.fn(async () => undefined);
    const registry = new MemoryManagementProviderRegistry().register({
      id: 'consumer-native',
      supports: (spec) => spec.type === 'native' && spec.deployment === 'embedded',
      create: async ({ profile }) => ({
        provider: new NativeMemoryManagementProvider({ profile }),
        resources: { supervisor: 'installed' },
        close: installationClose,
      }),
    });
    const contextBuilder = new DefaultMemoryContextBuilder();
    const runtime = await new MemoryRuntimeFactory({
      registry,
      activities: {
        policy: { authorize: async () => ({ allowed: true }) },
        events: { publish: async (type: MemoryEventType) => 'event:' + type },
        harness: { beforeExecute: vi.fn(), afterExecute: vi.fn() },
      },
      eventContext: (request) => ({ runId: request.scope.runId ?? request.operationId }),
      contextBuilder,
      contextGateway: new DefaultContextInjectionGateway(),
    }).create(runtimeConfig());

    const addRequest: MemoryAddRequest = {
      operationId: 'consumer:add',
      principal,
      scope,
      profileRef: memoryProfileSpecExample,
      input: 'consumer memory',
      memoryType: 'semantic',
      source: { type: 'user_message', sourceId: 'consumer-message' },
    };
    await expect(runtime.service.add(addRequest)).resolves.toMatchObject({
      status: 'committed',
    });
    await expect(runtime.service.providerHealth()).resolves.toMatchObject({
      status: 'healthy',
    });
    expect(runtime.resources).toEqual({ supervisor: 'installed' });

    const contextProfile: ContextProfileSpec = {
      id: 'context.consumer',
      version: '1.0.0',
      revision: 'context-consumer-v1',
      sources: [{ id: 'memory', type: 'long_term_memory', required: true, priority: 10 }],
      maxTokens: 100,
      deduplication: 'hash',
      ranking: { method: 'priority' },
      truncation: { method: 'drop_lowest', preserveRequiredSources: true },
      includeProvenance: true,
      instructionBoundary: 'strict',
      untrustedContentPolicy: 'tag',
    };
    const envelope = await runtime.service.buildContext({
      operationId: 'consumer:context',
      principal,
      scope,
      runId: 'consumer-run',
      profileRef: {
        id: contextProfile.id,
        version: contextProfile.version,
        revision: contextProfile.revision,
      },
      profile: contextProfile,
      modelContextWindowTokens: 200,
      reservedSystemTokens: 10,
      reservedInstructionTokens: 10,
      reservedOutputTokens: 20,
      sourceItems: [
        {
          id: 'consumer-context-item',
          sourceType: 'long_term_memory',
          sourceId: 'memory',
          content: 'consumer memory',
          text: 'consumer memory',
          tokenEstimate: 2,
          priority: 10,
          required: true,
        },
      ],
    });
    expect(envelope.dataSegments).toHaveLength(1);
    await expect(runtime.service.explainContext(envelope.contextHash)).resolves.toMatchObject({
      contextHash: envelope.contextHash,
    });

    await runtime.close();
    expect(installationClose).toHaveBeenCalledOnce();
  });

  it('rejects partial context installation before any provider is created', () => {
    expect(
      () =>
        new MemoryRuntimeFactory({
          registry: new MemoryManagementProviderRegistry(),
          activities: {
            policy: { authorize: async () => ({ allowed: true }) },
            events: { publish: async () => 'event' },
            harness: { beforeExecute: vi.fn(), afterExecute: vi.fn() },
          },
          eventContext: () => ({ runId: 'consumer-run' }),
          contextBuilder: new DefaultMemoryContextBuilder(),
        })
    ).toThrow('contextBuilder and contextGateway must be installed together');
  });
});
