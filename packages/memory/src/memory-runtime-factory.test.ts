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
