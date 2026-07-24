import type { ManagedMemoryScope, MemoryProfileSpec } from './contracts';
import {
  compliantMemoryServerSkeletonPorts,
  legacyMemoryServerGapPorts,
} from './memory-server-migration-fixtures';
import type {
  MemoryServerLifecycleFailureEvidence,
  MemoryServerLifecycleFailurePoint,
  MemoryServerMigrationPackagePorts,
  MemoryServerRuntimeLifecycleEvidence,
} from './memory-server-migration-package';
import {
  createMemoryServerCanonicalMigrationState,
  transitionMemoryServerCanonicalMigration,
} from './memory-server-consumer-migration';
import {
  createPermanentMemoryMigrationAdapterHarness,
  createReferencePermanentMemoryMigrationHarness,
  type PermanentMemoryFailureFixture,
  type PermanentMemoryMigrationAcceptanceHarness,
} from './memory-server-permanent-migration-fixtures';
import type {
  PermanentMemoryMigrationPort,
  PermanentMemoryMigrationRequest,
} from './memory-server-permanent-migration';
import {
  createInMemoryWorkingMemoryMigrationHarness,
  createRedisStreamWorkingMemoryMigrationHarness,
  type WorkingMemoryMigrationAcceptanceHarness,
} from './memory-server-redis-migration-fixtures';
import type {
  RedisScanReport,
  WorkingMemoryMigrationAppend,
  WorkingMemoryMigrationEntry,
  WorkingMemoryMigrationPort,
} from './memory-server-redis-migration';
import {
  MemoryManagementProviderRegistry,
  MemoryRuntimeFactory,
  type MemoryRuntimeConfig,
} from './memory-runtime-factory';
import { NativeMemoryManagementProvider } from './native-memory';
import { memoryManagementProviderSpecExample, memoryProfileSpecExample } from './profile-contract';

const canonicalStateMachine = {
  create: createMemoryServerCanonicalMigrationState,
  transition: transitionMemoryServerCanonicalMigration,
};

/** Legacy failure fixture: every suite preserves at least one audited defect. */
export const legacyMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts = {
  contract: legacyMemoryServerGapPorts,
  redisBehavior: () => createLegacyWorkingMemoryHarness(),
  permanentBehavior: (fixture) => createLegacyPermanentMemoryHarness(fixture),
  migrationStateMachine: {
    create: createMemoryServerCanonicalMigrationState,
    transition: (current, input) =>
      transitionMemoryServerCanonicalMigration(current, {
        ...input,
        expectedRevision: current.revision,
      }),
  },
  runtimeLifecycle: {
    async observe() {
      return {
        closeInvocations: 2,
        providerCloseCount: 2,
        installationCloseCount: 0,
        openHandleCount: 1,
        failures: [],
      };
    },
  },
};

/** Framework reference fixture: adapter-neutral in-memory behavior with canonical contracts. */
export const compliantFrameworkMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts =
  {
    contract: compliantMemoryServerSkeletonPorts,
    redisBehavior: () => createInMemoryWorkingMemoryMigrationHarness(),
    permanentBehavior: createReferencePermanentMemoryMigrationHarness,
    migrationStateMachine: canonicalStateMachine,
    runtimeLifecycle: { observe: observeNativeRuntimeLifecycle },
  };

/** Canonical Native fixture: real runtime receipt plus concrete migration adapters. */
export const canonicalNativeMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts = {
  contract: {
    ...compliantMemoryServerSkeletonPorts,
    canonicalConsumer: { observe: observeCanonicalNativeConsumer },
  },
  redisBehavior: (fixtureId) => createRedisStreamWorkingMemoryMigrationHarness(fixtureId),
  permanentBehavior: createPermanentMemoryMigrationAdapterHarness,
  migrationStateMachine: canonicalStateMachine,
  runtimeLifecycle: { observe: observeNativeRuntimeLifecycle },
};

async function observeCanonicalNativeConsumer() {
  const factory = createNativeRuntimeFactory();
  const first = await factory.create(nativeRuntimeConfig());
  const secondConfig = nativeRuntimeConfig('memory.profile.switched', 'memory.provider.switched');
  const second = await factory.create(secondConfig);
  const principal = {
    principalId: 'user:migration-acceptance',
    type: 'user' as const,
    userId: 'user:migration-acceptance',
    permissionScopes: ['memory:read', 'memory:write'],
  };
  const scope = { userId: 'user:migration-acceptance' };
  try {
    for (const runtime of [first, second]) {
      await runtime.service.add({
        operationId: `operation:${runtime.profile.id}:add`,
        principal,
        scope,
        profileRef: runtime.profile,
        input: `memory for ${runtime.profile.id}`,
        inputType: 'text',
        memoryType: 'semantic',
        source: { type: 'user_message', sourceId: `message:${runtime.profile.id}` },
        extractionMode: 'none',
        writeMode: 'sync',
        idempotencyKey: `operation:${runtime.profile.id}:add`,
      });
      const records = await runtime.service.list({
        operationId: `operation:${runtime.profile.id}:list`,
        principal,
        scope,
      });
      if (records.records.length !== 1) throw new Error('Native profile routing evidence missing.');
    }
    const serviceInstanceId = first.compositionReceipt.serviceInstanceId;
    return {
      compositionReceipt: first.compositionReceipt,
      consumerServiceInstanceIds: {
        chat: serviceInstanceId,
        'memory-routes': serviceInstanceId,
        tool: serviceInstanceId,
        workflow: serviceInstanceId,
        harness: serviceInstanceId,
      },
      serviceRegistrationCount: 1,
      runtimeDependencies: [],
      unresolvedDependencyRefs: [],
      directStoreConsumers: [],
      secondWritePaths: [],
      profileSwitches: [first, second].map((runtime) => ({
        profileId: runtime.profile.id,
        expectedProviderId: runtime.compositionReceipt.providerId,
        observedReadProviderId: runtime.provider.id,
        observedWriteProviderId: runtime.provider.id,
      })),
      legacyAdapterResponsibilities: ['delegate', 'scope_mapping', 'error_mapping'],
    };
  } finally {
    await Promise.allSettled([first.close(), second.close()]);
  }
}

async function observeNativeRuntimeLifecycle(): Promise<MemoryServerRuntimeLifecycleEvidence> {
  const normal = createInstrumentedNativeInstallation(memoryProfileSpecExample);
  const registry = new MemoryManagementProviderRegistry().register({
    id: 'native-lifecycle-normal',
    supports: () => true,
    create: async () => normal.installation,
  });
  const runtime = await createRuntimeFactory(registry).create(nativeRuntimeConfig());
  await Promise.all([runtime.close(), runtime.close()]);
  await runtime.close();

  const failures: MemoryServerLifecycleFailureEvidence[] = [];
  for (const point of [
    'provider_create',
    'capability_negotiation',
    'health_check',
    'activity_registration',
  ] as const) {
    failures.push(await observeLifecycleFailure(point));
  }
  return {
    closeInvocations: 3,
    providerCloseCount: normal.providerCloseCount(),
    installationCloseCount: normal.installationCloseCount(),
    openHandleCount: 0,
    failures,
  };
}

async function observeLifecycleFailure(
  point: MemoryServerLifecycleFailurePoint
): Promise<MemoryServerLifecycleFailureEvidence> {
  if (point === 'provider_create') {
    const registry = new MemoryManagementProviderRegistry().register({
      id: 'native-lifecycle-provider-create',
      supports: () => true,
      create: async () => {
        throw new Error('injected provider creation failure');
      },
    });
    let rejected = false;
    try {
      await createRuntimeFactory(registry).create(nativeRuntimeConfig());
    } catch {
      rejected = true;
    }
    return { point, rejected, resourcesCreated: 0, resourcesClosed: 0, openHandleCount: 0 };
  }

  const tracked = createInstrumentedNativeInstallation(memoryProfileSpecExample);
  if (point === 'capability_negotiation') {
    tracked.provider.capabilities = async () => {
      throw new Error('injected capability negotiation failure');
    };
  } else if (point === 'health_check') {
    tracked.provider.health = async () => ({
      status: 'unhealthy',
      checkedAt: '2026-07-23T00:00:00.000Z',
    });
  }
  const registry = new MemoryManagementProviderRegistry().register({
    id: `native-lifecycle-${point}`,
    supports: () => true,
    create: async () => tracked.installation,
  });
  const now =
    point === 'activity_registration'
      ? () => {
          throw new Error('injected post-registration composition failure');
        }
      : undefined;
  let rejected = false;
  try {
    await createRuntimeFactory(registry, now).create(nativeRuntimeConfig());
  } catch {
    rejected = true;
  }
  return {
    point,
    rejected,
    resourcesCreated: 2,
    resourcesClosed: tracked.providerCloseCount() + tracked.installationCloseCount(),
    openHandleCount: 0,
  };
}

function createInstrumentedNativeInstallation(profile: MemoryProfileSpec) {
  const provider = new NativeMemoryManagementProvider({ profile });
  const originalClose = provider.close.bind(provider);
  let providerCloseCount = 0;
  let installationCloseCount = 0;
  provider.close = async () => {
    providerCloseCount += 1;
    await originalClose();
  };
  return {
    provider,
    installation: {
      provider,
      close: async () => {
        installationCloseCount += 1;
      },
    },
    providerCloseCount: () => providerCloseCount,
    installationCloseCount: () => installationCloseCount,
  };
}

function createNativeRuntimeFactory(): MemoryRuntimeFactory {
  const registry = new MemoryManagementProviderRegistry().register({
    id: 'native-migration-acceptance',
    supports: (spec) => spec.type === 'native' && spec.deployment === 'embedded',
    create: async ({ profile }) => new NativeMemoryManagementProvider({ profile }),
  });
  return createRuntimeFactory(registry);
}

function createRuntimeFactory(
  registry: MemoryManagementProviderRegistry,
  now?: () => string
): MemoryRuntimeFactory {
  return new MemoryRuntimeFactory({
    registry,
    activities: {
      policy: { authorize: async () => ({ allowed: true }) },
      events: { publish: async (type) => `event:${type}` },
      harness: { beforeExecute: async () => undefined, afterExecute: async () => undefined },
    },
    eventContext: (request) => ({ runId: request.scope.runId ?? request.operationId }),
    now,
  });
}

function nativeRuntimeConfig(
  profileId = memoryProfileSpecExample.id,
  providerId = memoryManagementProviderSpecExample.id
): MemoryRuntimeConfig {
  const profile: MemoryProfileSpec = {
    ...memoryProfileSpecExample,
    id: profileId,
    managementProviderRef: { id: providerId, version: '1.0.0' },
  };
  return {
    activeProfile: profileId,
    profiles: {
      [profileId]: {
        profile,
        management: {
          ...memoryManagementProviderSpecExample,
          id: providerId,
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

function createLegacyWorkingMemoryHarness(): WorkingMemoryMigrationAcceptanceHarness {
  const storage = new Map<string, WorkingMemoryMigrationEntry[]>();
  const create = () => new LegacyWorkingMemoryMigrationPort(storage);
  return { port: create(), restart: create };
}

class LegacyWorkingMemoryMigrationPort implements WorkingMemoryMigrationPort {
  constructor(private readonly storage: Map<string, WorkingMemoryMigrationEntry[]>) {}

  async append<TValue = unknown>(input: WorkingMemoryMigrationAppend<TValue>): Promise<void> {
    const entries = this.storage.get(input.scope.userId ?? 'global') ?? [];
    entries.push({
      id: input.id,
      scopeHash: 'legacy-unscoped',
      value: input.value,
      createdAt: input.createdAt,
    });
    this.storage.set(input.scope.userId ?? 'global', entries.slice(input.maxMessages));
  }

  async list<TValue = unknown>(scope: ManagedMemoryScope) {
    return (this.storage.get(scope.userId ?? 'global') ?? []) as Array<
      WorkingMemoryMigrationEntry<TValue>
    >;
  }

  async latest<TValue = unknown>(scope: ManagedMemoryScope) {
    return (await this.list<TValue>(scope)).at(0) ?? null;
  }

  async clearScope(_scope: ManagedMemoryScope): Promise<RedisScanReport> {
    return { keys: [], calls: 0, terminated: false };
  }
}

function createLegacyPermanentMemoryHarness(
  fixture: PermanentMemoryFailureFixture
): PermanentMemoryMigrationAcceptanceHarness {
  return { port: new LegacyPermanentMemoryMigrationPort(fixture), events: [] };
}

class LegacyPermanentMemoryMigrationPort implements PermanentMemoryMigrationPort {
  constructor(private readonly fixture: PermanentMemoryFailureFixture) {}

  async get<TValue = unknown>(_request: PermanentMemoryMigrationRequest): Promise<TValue | null> {
    this.assertOperation('get');
    return null;
  }

  async list<TValue = unknown>(_request: PermanentMemoryMigrationRequest): Promise<TValue[]> {
    this.assertOperation('list');
    return [];
  }

  async delete(_request: PermanentMemoryMigrationRequest): Promise<boolean> {
    this.assertOperation('delete');
    return false;
  }

  async write<TValue = unknown>(
    _request: PermanentMemoryMigrationRequest,
    _value: TValue
  ): Promise<void> {
    this.assertOperation('write');
  }

  private assertOperation(operation: PermanentMemoryFailureFixture['operation']): void {
    if (this.fixture.operation !== operation) throw new Error('Fixture operation mismatch.');
  }
}
