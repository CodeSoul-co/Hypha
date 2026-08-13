import { describe, expect, it, vi } from 'vitest';
import type { MemoryManagementCapabilities, MemoryProfileSpec } from './contracts';
import type { MemoryRuntime, MemoryRuntimeConfig } from './memory-runtime-factory';
import {
  InMemoryMemoryRuntimeControlStore,
  MemoryRuntimeCoordinator,
  type MemoryRuntimeCreator,
} from './memory-runtime-coordinator';
import { memoryError, sha256 } from './memory-utils';
import type { MemoryManagementProvider } from './operations';
import { memoryManagementProviderSpecExample, memoryProfileSpecExample } from './profile-contract';

describe('MemoryRuntimeCoordinator', () => {
  it('persists capability drift quarantine and blocks the active revision', async () => {
    const store = new InMemoryMemoryRuntimeControlStore();
    const capabilities = [
      capabilitySnapshot({ search: true }),
      capabilitySnapshot({ search: false }),
    ];
    const creator = runtimeCreator((revision) =>
      runtime(revision, async () => capabilities.shift() ?? capabilities[0]!)
    );
    const coordinator = new MemoryRuntimeCoordinator({
      id: 'memory:server-a',
      factory: creator,
      store,
      requireDurableStore: false,
    });

    await expect(coordinator.initialize(config('profile:r1'))).resolves.toMatchObject({
      profileRevision: 'profile:r1',
      generation: 1,
    });
    await expect(coordinator.probeActive()).rejects.toMatchObject({
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      details: { quarantined: true, capabilityDrift: true },
    });
    await expect(coordinator.withRuntime(async () => 'must-not-run')).rejects.toMatchObject({
      details: { quarantined: true, profileRevision: 'profile:r1' },
    });
    await expect(store.getActive('memory:server-a')).resolves.toMatchObject({
      status: 'quarantined',
      generation: 2,
      profileRevision: 'profile:r1',
      quarantineError: { details: { capabilityDrift: true } },
    });
  });

  it('refuses a quarantined revision after process restart', async () => {
    const store = new InMemoryMemoryRuntimeControlStore();
    const firstCreator = runtimeCreator(() => {
      const snapshots = [
        capabilitySnapshot({ search: true }),
        capabilitySnapshot({ search: false }),
      ];
      return runtime('profile:r1', async () => snapshots.shift() ?? snapshots[0]!);
    });
    const first = new MemoryRuntimeCoordinator({
      id: 'memory:restart',
      factory: firstCreator,
      store,
      requireDurableStore: false,
    });
    await first.initialize(config('profile:r1'));
    await expect(first.probeActive()).rejects.toMatchObject({
      details: { quarantined: true },
    });

    const restartedCreator = { create: vi.fn() };
    const restarted = new MemoryRuntimeCoordinator({
      id: 'memory:restart',
      factory: restartedCreator as unknown as MemoryRuntimeCreator,
      store,
      requireDurableStore: false,
    });
    await expect(restarted.initialize(config('profile:r1'))).rejects.toMatchObject({
      details: { quarantined: true, profileRevision: 'profile:r1' },
    });
    expect(restartedCreator.create).not.toHaveBeenCalled();
  });

  it('atomically switches new requests while draining an in-flight old revision', async () => {
    const closeR1 = vi.fn(async () => undefined);
    const closeR2 = vi.fn(async () => undefined);
    const creator = runtimeCreator((revision) =>
      runtime(
        revision,
        async () => capabilitySnapshot({ search: true }),
        revision === 'profile:r1' ? closeR1 : closeR2
      )
    );
    const coordinator = new MemoryRuntimeCoordinator({
      id: 'memory:switch',
      factory: creator,
      store: new InMemoryMemoryRuntimeControlStore(),
      requireDurableStore: false,
    });
    await coordinator.initialize(config('profile:r1'));

    let release!: () => void;
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    const oldRequest = coordinator.withRuntime(async (_runtime, generation) => {
      expect(generation.profileRevision).toBe('profile:r1');
      await held;
      return generation.profileRevision;
    });
    await vi.waitFor(() => expect(coordinator.current()?.profileRevision).toBe('profile:r1'));

    await expect(
      coordinator.switchRevision(config('profile:r2'), new Map(), 'profile:r1')
    ).resolves.toMatchObject({
      profileRevision: 'profile:r2',
      previousProfileRevision: 'profile:r1',
      generation: 2,
    });
    await expect(
      coordinator.withRuntime(async (_runtime, generation) => generation.profileRevision)
    ).resolves.toBe('profile:r2');
    expect(closeR1).not.toHaveBeenCalled();

    release();
    await expect(oldRequest).resolves.toBe('profile:r1');
    await coordinator.drain();
    expect(closeR1).toHaveBeenCalledOnce();
    expect(closeR2).not.toHaveBeenCalled();
    await coordinator.close();
    expect(closeR2).toHaveBeenCalledOnce();
  });

  it('keeps the old revision active when candidate preparation fails', async () => {
    const closeR1 = vi.fn(async () => undefined);
    const creator: MemoryRuntimeCreator = {
      create: vi.fn(async (input) => {
        const selected = selectedRevision(input);
        if (selected === 'profile:r2') {
          throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'candidate is unhealthy');
        }
        return runtime(selected, async () => capabilitySnapshot({ search: true }), closeR1);
      }),
    };
    const coordinator = new MemoryRuntimeCoordinator({
      id: 'memory:rollback',
      factory: creator,
      store: new InMemoryMemoryRuntimeControlStore(),
      requireDurableStore: false,
    });
    await coordinator.initialize(config('profile:r1'));

    await expect(
      coordinator.switchRevision(config('profile:r2'), new Map(), 'profile:r1')
    ).rejects.toMatchObject({ code: 'MEMORY_PROVIDER_UNAVAILABLE' });
    expect(coordinator.current()).toMatchObject({ profileRevision: 'profile:r1', generation: 1 });
    await expect(
      coordinator.withRuntime(async (_runtime, generation) => generation.profileRevision)
    ).resolves.toBe('profile:r1');
    expect(closeR1).not.toHaveBeenCalled();
  });

  it('persists adapter-originated quarantine errors observed by a pinned request', async () => {
    const store = new InMemoryMemoryRuntimeControlStore();
    const coordinator = new MemoryRuntimeCoordinator({
      id: 'memory:adapter-quarantine',
      factory: runtimeCreator((revision) =>
        runtime(revision, async () => capabilitySnapshot({ search: true }))
      ),
      store,
      requireDurableStore: false,
    });
    await coordinator.initialize(config('profile:r1'));

    await expect(
      coordinator.withRuntime(async () => {
        throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'adapter capability drift', false, {
          quarantined: true,
          capabilityDrift: true,
        });
      })
    ).rejects.toMatchObject({ details: { capabilityDrift: true } });
    await expect(store.getActive('memory:adapter-quarantine')).resolves.toMatchObject({
      status: 'quarantined',
      quarantineError: { message: 'adapter capability drift' },
    });
  });

  it('serializes competing switches and fences a stale expected revision', async () => {
    const coordinator = new MemoryRuntimeCoordinator({
      id: 'memory:competing-switches',
      factory: runtimeCreator((revision) =>
        runtime(revision, async () => capabilitySnapshot({ search: true }))
      ),
      store: new InMemoryMemoryRuntimeControlStore(),
      requireDurableStore: false,
    });
    await coordinator.initialize(config('profile:r1'));

    const [first, second] = await Promise.allSettled([
      coordinator.switchRevision(config('profile:r2'), new Map(), 'profile:r1'),
      coordinator.switchRevision(config('profile:r3'), new Map(), 'profile:r1'),
    ]);

    expect(first).toMatchObject({ status: 'fulfilled', value: { profileRevision: 'profile:r2' } });
    expect(second).toMatchObject({
      status: 'rejected',
      reason: { code: 'MEMORY_REVISION_CONFLICT' },
    });
    expect(coordinator.current()).toMatchObject({ profileRevision: 'profile:r2', generation: 2 });
    await coordinator.close();
  });
});

function runtimeCreator(createRuntime: (revision: string) => MemoryRuntime): MemoryRuntimeCreator {
  return {
    create: vi.fn(async (input) => createRuntime(selectedRevision(input))),
  };
}

function runtime(
  revision: string,
  capabilities: () => Promise<MemoryManagementCapabilities>,
  close = vi.fn(async () => undefined)
): MemoryRuntime {
  const configuration = config(revision);
  const selected = configuration.profiles[configuration.activeProfile]!;
  const provider = {
    id: `provider:${revision}`,
    capabilities,
    health: async () => ({ status: 'healthy' as const, checkedAt: new Date().toISOString() }),
    close,
  } as unknown as MemoryManagementProvider;
  const profileHash = sha256({
    profile: selected.profile,
    management: selected.management,
  });
  return {
    service: { close } as unknown as MemoryRuntime['service'],
    provider,
    profile: selected.profile,
    providerSpec: selected.management,
    profileHash,
    capabilities: capabilitySnapshot({ search: true }),
    compositionReceipt: {
      runtimeId: `runtime:${revision}`,
      serviceInstanceId: `service:${revision}`,
      serviceContract: '@codesoul-co/memory.MemoryApplicationService',
      activeProfileId: selected.profile.id,
      providerId: provider.id,
      providerSpecId: selected.management.id,
      configHash: sha256(configuration),
      profileHash,
      resolvedDependencyRefs: [],
      createdAt: '2026-07-24T00:00:00.000Z',
    },
    close,
  };
}

function config(revision: string): MemoryRuntimeConfig {
  const profile = structuredClone(memoryProfileSpecExample) as MemoryProfileSpec;
  profile.revision = revision;
  profile.managementProviderRef = {
    ...profile.managementProviderRef,
    revision: `provider:${revision}`,
  };
  const management = structuredClone(memoryManagementProviderSpecExample);
  management.revision = `provider:${revision}`;
  return {
    activeProfile: profile.id,
    profiles: {
      [profile.id]: { profile, management },
    },
  };
}

function selectedRevision(input: unknown): string {
  const configuration = input as MemoryRuntimeConfig;
  const selected = configuration.profiles[configuration.activeProfile]!;
  return selected.profile.revision ?? selected.profile.version;
}

function capabilitySnapshot(
  overrides: Partial<MemoryManagementCapabilities>
): MemoryManagementCapabilities {
  return {
    add: true,
    search: true,
    get: true,
    list: true,
    update: true,
    delete: true,
    deleteByFilter: false,
    history: true,
    summarize: false,
    consolidate: false,
    decay: false,
    reinforce: false,
    conflictDetection: false,
    hybridSearch: false,
    graphRelations: false,
    asyncWrite: false,
    batchOperations: false,
    ...overrides,
  };
}
