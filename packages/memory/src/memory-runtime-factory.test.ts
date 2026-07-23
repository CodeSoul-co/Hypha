import { describe, expect, it, vi } from 'vitest';
import {
  MemoryManagementProviderRegistry,
  MemoryRuntimeFactory,
  NativeMemoryManagementProvider,
  memoryManagementProviderSpecExample,
  memoryProfileSpecExample,
  validateMemoryRuntimeConfig,
  type MemoryAddRequest,
  type MemoryEventType,
  type MemoryRuntimeConfig,
} from './index';

function config(): MemoryRuntimeConfig {
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

function runtimeFactory(registry: MemoryManagementProviderRegistry) {
  return new MemoryRuntimeFactory({
    registry,
    activities: {
      policy: { authorize: async () => ({ allowed: true }) },
      events: { publish: vi.fn(async (type: MemoryEventType) => `event:${type}`) },
      harness: { beforeExecute: vi.fn(), afterExecute: vi.fn() },
    },
    eventContext: (request) => ({ runId: request.scope.runId ?? request.operationId }),
  });
}

describe('MemoryRuntimeFactory', () => {
  it('creates the only application service through an installed provider factory', async () => {
    const registry = new MemoryManagementProviderRegistry().register({
      id: 'native-embedded',
      supports: (spec) => spec.type === 'native' && spec.deployment === 'embedded',
      create: async ({ profile }) => new NativeMemoryManagementProvider({ profile }),
    });
    const runtime = await runtimeFactory(registry).create(config());
    const request: MemoryAddRequest = {
      operationId: 'operation:runtime:add',
      principal: {
        principalId: 'user:runtime',
        type: 'user',
        userId: 'user:runtime',
        permissionScopes: ['memory:write'],
      },
      scope: { userId: 'user:runtime', runId: 'run:runtime' },
      profileRef: memoryProfileSpecExample,
      input: 'runtime-composed memory',
      inputType: 'text',
      memoryType: 'semantic',
      source: { type: 'user_message', sourceId: 'message:runtime' },
      extractionMode: 'none',
      writeMode: 'sync',
      idempotencyKey: 'operation:runtime:add',
    };

    await expect(runtime.service.add(request)).resolves.toMatchObject({ status: 'committed' });
    expect(runtime.profileHash).toMatch(/^sha256:[a-f0-9]{64}$/);
    expect(runtime.compositionReceipt).toMatchObject({
      serviceContract: '@hypha/memory.MemoryApplicationService',
      activeProfileId: memoryProfileSpecExample.id,
      providerId: memoryManagementProviderSpecExample.id,
      providerSpecId: memoryManagementProviderSpecExample.id,
      profileHash: runtime.profileHash,
      resolvedDependencyRefs: [],
    });
    expect(runtime.compositionReceipt.runtimeId).toMatch(/^memory-runtime:[a-f0-9]{32}$/);
    expect(runtime.compositionReceipt.serviceInstanceId).toMatch(/^memory-service:[a-f0-9]{32}$/);
  });

  it('changes the real service provider when the active profile changes', async () => {
    const registry = new MemoryManagementProviderRegistry().register({
      id: 'switchable-native',
      supports: (spec) => spec.type === 'native' && spec.deployment === 'embedded',
      create: async ({ profile }) => new NativeMemoryManagementProvider({ profile }),
    });
    const factory = runtimeFactory(registry);
    const firstConfig = config();
    const secondProfileId = 'memory.profile.switched';
    const secondProviderId = 'memory.provider.switched';
    const secondConfig = config();
    const selected = secondConfig.profiles[memoryProfileSpecExample.id];
    secondConfig.activeProfile = secondProfileId;
    secondConfig.profiles = {
      [secondProfileId]: {
        profile: {
          ...selected.profile,
          id: secondProfileId,
          managementProviderRef: { id: secondProviderId, version: '1.0.0' },
        },
        management: {
          ...selected.management,
          id: secondProviderId,
          version: '1.0.0',
        },
      },
    };

    const first = await factory.create(firstConfig);
    const second = await factory.create(secondConfig);
    const principal = {
      principalId: 'user:profile-switch',
      type: 'user' as const,
      userId: 'user:profile-switch',
      permissionScopes: ['memory:read', 'memory:write'],
    };
    const scope = { userId: 'user:profile-switch' };
    const write = async (
      runtime: typeof first,
      profile: typeof memoryProfileSpecExample,
      input: string
    ) =>
      runtime.service.add({
        operationId: `operation:${profile.id}:add`,
        principal,
        scope,
        profileRef: profile,
        input,
        inputType: 'text',
        memoryType: 'semantic',
        source: { type: 'user_message', sourceId: `message:${profile.id}` },
        extractionMode: 'none',
        writeMode: 'sync',
        idempotencyKey: `operation:${profile.id}:add`,
      });

    await expect(write(first, first.profile, 'first provider memory')).resolves.toMatchObject({
      status: 'committed',
    });
    await expect(write(second, second.profile, 'second provider memory')).resolves.toMatchObject({
      status: 'committed',
    });
    await expect(
      first.service.list({ operationId: 'operation:first:list', principal, scope })
    ).resolves.toMatchObject({ records: [{ content: 'first provider memory' }] });
    await expect(
      second.service.list({ operationId: 'operation:second:list', principal, scope })
    ).resolves.toMatchObject({ records: [{ content: 'second provider memory' }] });
    expect(first.compositionReceipt.providerId).toBe(memoryManagementProviderSpecExample.id);
    expect(second.compositionReceipt.providerId).toBe(secondProviderId);
    expect(first.compositionReceipt.serviceInstanceId).not.toBe(
      second.compositionReceipt.serviceInstanceId
    );
  });
  it('fails fast when an enabled provider implementation is not installed', async () => {
    const missing = config();
    missing.profiles[memoryProfileSpecExample.id] = {
      profile: {
        ...memoryProfileSpecExample,
        managementProviderRef: { id: 'memory.provider.memorybank', version: '1.0.0' },
      },
      management: {
        ...memoryManagementProviderSpecExample,
        id: 'memory.provider.memorybank',
        type: 'memorybank',
        deployment: 'remote',
        connectionRef: 'memory.connection.memorybank',
      },
    };

    await expect(
      runtimeFactory(new MemoryManagementProviderRegistry()).create(missing)
    ).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_NOT_INSTALLED',
    });
  });

  it('rejects unknown configuration and inline credentials', () => {
    expect(() => validateMemoryRuntimeConfig({ ...config(), unexpected: true })).toThrow();
    const inlineSecret = config();
    inlineSecret.profiles[memoryProfileSpecExample.id].management = {
      ...memoryManagementProviderSpecExample,
      config: { apiKey: 'must-not-live-here' },
    };
    expect(() => validateMemoryRuntimeConfig(inlineSecret)).toThrow(
      'Provider credentials must be resolved by connectionRef'
    );
  });
});
