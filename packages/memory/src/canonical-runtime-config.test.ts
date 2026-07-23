import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, expect, it, vi } from 'vitest';
import { parse } from 'yaml';
import {
  CanonicalMemoryRuntimeLoader,
  MemoryManagementProviderRegistry,
  MemoryRuntimeFactory,
  NativeMemoryManagementProvider,
  canonicalMemoryRuntimeConfigExample,
  canonicalMemoryRuntimeConfigJsonSchema,
  canonicalMemoryRuntimeConfigSchema,
  type MemoryEventType,
  type MemoryManagementProviderFactoryContext,
} from './index';

describe('canonical Memory runtime configuration', () => {
  it('keeps TypeScript, Zod, JSON Schema and fixture aligned', () => {
    expect(canonicalMemoryRuntimeConfigSchema.parse(canonicalMemoryRuntimeConfigExample)).toEqual(
      canonicalMemoryRuntimeConfigExample
    );
    expect(canonicalMemoryRuntimeConfigJsonSchema).toMatchObject({
      required: ['schemaVersion', 'activeProfile', 'profiles'],
      additionalProperties: false,
      properties: {
        schemaVersion: { enum: ['1.0'] },
        profiles: { additionalProperties: { additionalProperties: false } },
      },
    });
    expect(() =>
      canonicalMemoryRuntimeConfigSchema.parse({
        ...canonicalMemoryRuntimeConfigExample,
        unknown: true,
      })
    ).toThrow();
  });

  it('resolves references before creating the single application service', async () => {
    const document = structuredClone(canonicalMemoryRuntimeConfigExample);
    const selected = document.profiles[document.activeProfile];
    selected.management.connectionRef = 'memory.connection.native';
    selected.management.config = {
      credentialRef: 'secret:memory/native',
      endpointEnv: 'HYPHA_MEMORY_ENDPOINT',
      mappingStoreRef: 'memory.mapping.durable',
    };
    const resolve = vi.fn(async (reference: string) => ({ reference }));
    const loader = new CanonicalMemoryRuntimeLoader({ resolve });
    let context: MemoryManagementProviderFactoryContext | undefined;
    const registry = new MemoryManagementProviderRegistry().register({
      id: 'canonical-native',
      supports: (spec) => spec.type === 'native' && spec.deployment === 'embedded',
      create: async (input) => {
        context = input;
        return new NativeMemoryManagementProvider({ profile: input.profile });
      },
    });
    const factory = new MemoryRuntimeFactory({
      registry,
      activities: {
        policy: { authorize: async () => ({ allowed: true }) },
        events: { publish: async (type: MemoryEventType) => 'event:' + type },
        harness: { beforeExecute: vi.fn(), afterExecute: vi.fn() },
      },
      eventContext: (request) => ({ runId: request.operationId }),
    });

    const runtime = await loader.create(factory, document);
    expect(runtime.service).toBeDefined();
    expect(context?.references).toBeInstanceOf(Map);
    expect([...context!.references!.keys()].sort()).toEqual([
      'HYPHA_MEMORY_ENDPOINT',
      'memory.connection.native',
      'memory.mapping.durable',
      'memory.store.record.sqlite',
      'memory.vector.local',
      'secret:memory/native',
    ]);
    expect(runtime.compositionReceipt).toMatchObject({
      activeProfileId: document.activeProfile,
      providerId: selected.management.id,
      resolvedDependencyRefs: [
        'HYPHA_MEMORY_ENDPOINT',
        'memory.connection.native',
        'memory.mapping.durable',
        'memory.store.record.sqlite',
        'memory.vector.local',
        'secret:memory/native',
      ],
    });
    expect(runtime.compositionReceipt.configHash).toMatch(/^sha256:[a-f0-9]{64}$/);
    expect(resolve).toHaveBeenCalledTimes(6);
    await runtime.close();
  });

  it('loads the repository YAML through strict resolution, runtime creation, health and close', async () => {
    const path = resolve(process.cwd(), 'configs/memory-profiles.yaml');
    const document = parse(readFileSync(path, 'utf8'));
    expect(canonicalMemoryRuntimeConfigSchema.parse(document)).toEqual(document);

    const resolveReference = vi.fn(async (reference: string) => ({ reference }));
    const loader = new CanonicalMemoryRuntimeLoader({ resolve: resolveReference });
    const registry = new MemoryManagementProviderRegistry().register({
      id: 'repository-native-default',
      supports: (spec) => spec.type === 'native' && spec.deployment === 'local',
      create: async (input) => new NativeMemoryManagementProvider({ profile: input.profile }),
    });
    const factory = new MemoryRuntimeFactory({
      registry,
      activities: {
        policy: { authorize: async () => ({ allowed: true }) },
        events: { publish: async (type: MemoryEventType) => 'event:' + type },
        harness: { beforeExecute: vi.fn(), afterExecute: vi.fn() },
      },
      eventContext: (request) => ({ runId: request.operationId }),
    });

    const runtime = await loader.create(factory, document);
    expect(runtime.compositionReceipt).toMatchObject({
      activeProfileId: 'native-default',
      providerSpecId: 'memory.provider.native-default',
    });
    await expect(runtime.provider.health()).resolves.toMatchObject({ status: 'healthy' });
    expect(resolveReference.mock.calls.map(([reference]) => reference).sort()).toEqual([
      'memory.artifact.local',
      'memory.connection.native-default',
      'memory.embedding.local',
      'memory.store.outbox.mongodb',
      'memory.store.record.mongodb',
      'memory.store.working.redis',
      'memory.vector.local',
    ]);
    await runtime.close();
  });
  it('fails before provider creation when a reference cannot be resolved', async () => {
    const document = structuredClone(canonicalMemoryRuntimeConfigExample);
    document.profiles[document.activeProfile].management.connectionRef =
      'memory.connection.missing';
    const loader = new CanonicalMemoryRuntimeLoader({
      resolve: async () => Promise.reject(new Error('missing reference')),
    });
    const create = vi.fn();
    const registry = new MemoryManagementProviderRegistry().register({
      id: 'must-not-create',
      supports: () => true,
      create,
    });
    const factory = new MemoryRuntimeFactory({
      registry,
      activities: {
        policy: { authorize: async () => ({ allowed: true }) },
        events: { publish: async () => 'event' },
        harness: { beforeExecute: vi.fn(), afterExecute: vi.fn() },
      },
      eventContext: (request) => ({ runId: request.operationId }),
    });

    await expect(loader.create(factory, document)).rejects.toThrow('missing reference');
    expect(create).not.toHaveBeenCalled();
  });
});
