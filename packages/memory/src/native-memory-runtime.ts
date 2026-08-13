import type { EmbeddingProvider, StructuredStoreProvider } from './index';
import type { MemoryEventPublisher } from './memory-events';
import {
  IndexOutboxWorker,
  type IndexOutboxWorkerEvent,
  type ManagedVectorStoreAdapter,
} from './index-outbox';
import {
  LeasedMemoryLifecycleWorker,
  type MemoryLifecycleTaskHandler,
  type MemoryLifecycleWorkerEvent,
  type MemoryLifecycleWorkerType,
} from './lifecycle-workers';
import type {
  MemoryManagementProviderFactory,
  MemoryManagementProviderInstallation,
} from './memory-runtime-factory';
import { memoryError } from './memory-utils';
import { MemoryWorkerSupervisor } from './memory-worker-supervisor';
import { NativeMemoryManagementProvider } from './native-memory';
import { StructuredMemoryPersistenceUnitOfWork } from './structured-memory-persistence';
import { StructuredMemoryIdempotencyStore } from './structured-idempotency-store';
import { StructuredMemoryLifecycleTaskStore } from './structured-lifecycle-task-store';
import {
  InMemoryWorkingMemoryStore,
  RedisWorkingMemoryStore,
  type RedisLikeWorkingMemoryClient,
  type WorkingMemoryStore,
} from './working-store';

export interface NativeMemoryRuntimeDependencies {
  structuredStore: StructuredStoreProvider;
  structuredStoreId: string;
  redisClient?: RedisLikeWorkingMemoryClient;
  embeddingProvider?: EmbeddingProvider;
  embeddingProviderId?: string;
  vectorStores: ManagedVectorStoreAdapter[];
  lifecycleHandlers?: Partial<Record<MemoryLifecycleWorkerType, MemoryLifecycleTaskHandler>>;
  ownerId: string;
  workingMemoryNamespace?: string;
  workingMemoryTtlSeconds?: number;
  events?: MemoryEventPublisher;
  onIndexEvent?: (event: IndexOutboxWorkerEvent) => void | Promise<void>;
  onLifecycleEvent?: (event: MemoryLifecycleWorkerEvent) => void | Promise<void>;
  now?: () => Date;
  close?: () => Promise<void>;
}

export interface NativeMemoryRuntimeResources {
  workingStore: WorkingMemoryStore;
  lifecycleStore: StructuredMemoryLifecycleTaskStore;
  supervisor: MemoryWorkerSupervisor;
}

export function createNativeMemoryManagementProviderFactory(
  dependencies: NativeMemoryRuntimeDependencies
): MemoryManagementProviderFactory {
  return {
    id: 'hypha-native',
    supports: (spec) => spec.type === 'native',
    create: async ({ profile }): Promise<MemoryManagementProviderInstallation> => {
      if (profile.recordStoreRef.id !== dependencies.structuredStoreId) {
        throw memoryError(
          'MEMORY_PROVIDER_NOT_INSTALLED',
          `Native Memory record store ${profile.recordStoreRef.id} is not composed; ` +
            `the installed structured store is ${dependencies.structuredStoreId}.`,
          false,
          { requested: profile.recordStoreRef.id, installed: dependencies.structuredStoreId }
        );
      }
      if (profile.artifactStoreRef) {
        throw memoryError(
          'MEMORY_PROVIDER_NOT_INSTALLED',
          `Native Memory artifact store ${profile.artifactStoreRef.id} is declared but no ` +
            'artifact store is composed into the Native provider.'
        );
      }
      const workingStore = resolveWorkingStore(profile.workingStoreRef?.id, dependencies);
      const selectedVectorStores = resolveVectorStores(
        profile.vectorStoreRefs?.map((reference) => reference.id) ?? [],
        dependencies.vectorStores
      );
      const embeddingProvider = resolveEmbeddingProvider(
        profile.embeddingProviderRef?.id,
        dependencies
      );
      if (selectedVectorStores.length > 0 && !embeddingProvider) {
        throw memoryError(
          'MEMORY_INVALID_INPUT',
          'Native Memory vector stores require a composed embedding provider reference.'
        );
      }
      if (embeddingProvider && selectedVectorStores.length === 0) {
        throw memoryError(
          'MEMORY_INVALID_INPUT',
          'Native Memory embedding provider requires at least one composed vector store reference.'
        );
      }
      const initializable = dependencies.structuredStore as StructuredStoreProvider & {
        initialize?(collections: readonly string[]): Promise<void>;
      };
      await initializable.initialize?.([
        'managed_memory_current',
        'managed_memory_versions',
        'managed_memory_index_outbox',
        'memory_idempotency_results',
        'memory_lifecycle_tasks',
        'memory_extraction_jobs',
        'memory_extraction_batches',
        'memory_extraction_cursors',
        'memory_external_mappings',
      ]);
      const persistence = new StructuredMemoryPersistenceUnitOfWork({
        provider: dependencies.structuredStore,
      });
      const lifecycleStore = new StructuredMemoryLifecycleTaskStore({
        store: dependencies.structuredStore,
      });
      const provider = new NativeMemoryManagementProvider({
        profile,
        persistence,
        idempotencyStore: new StructuredMemoryIdempotencyStore({
          store: dependencies.structuredStore,
        }),
        events: dependencies.events,
        embeddingProvider,
        vectorStores: selectedVectorStores,
        now: () => (dependencies.now?.() ?? new Date()).toISOString(),
      });
      const indexWorkers = embeddingProvider
        ? [
            new IndexOutboxWorker({
              ownerId: `${dependencies.ownerId}:index`,
              outboxStore: provider.outboxStore,
              recordStore: provider.recordStore,
              embeddingProvider,
              vectorStores: selectedVectorStores,
              now: dependencies.now,
              onEvent: dependencies.onIndexEvent,
              onError: (error) =>
                dependencies.onLifecycleEvent?.({
                  type: 'memory.worker.failed',
                  workerType: 'reindex',
                  error,
                }),
            }),
          ]
        : [];
      const lifecycleWorkers = Object.entries(dependencies.lifecycleHandlers ?? {}).map(
        ([type, handler]) =>
          new LeasedMemoryLifecycleWorker({
            type: type as MemoryLifecycleWorkerType,
            ownerId: `${dependencies.ownerId}:${type}`,
            store: lifecycleStore,
            handler,
            now: dependencies.now,
            onEvent: dependencies.onLifecycleEvent,
          })
      );
      const supervisor = new MemoryWorkerSupervisor({
        workers: [...indexWorkers, ...lifecycleWorkers],
      });
      await supervisor.start();
      return {
        provider,
        reconciliationStore: lifecycleStore,
        resources: {
          workingStore,
          lifecycleStore,
          supervisor,
        } satisfies NativeMemoryRuntimeResources,
        close: async () => {
          await supervisor.stop();
          await dependencies.close?.();
        },
      };
    },
  };
}

function resolveWorkingStore(
  referenceId: string | undefined,
  dependencies: NativeMemoryRuntimeDependencies
): WorkingMemoryStore {
  if (!referenceId || referenceId === 'memory.store.working.in-memory') {
    return new InMemoryWorkingMemoryStore(() => dependencies.now?.() ?? new Date());
  }
  if (referenceId !== 'memory.store.working.redis') {
    throw memoryError(
      'MEMORY_PROVIDER_NOT_INSTALLED',
      `Native Memory working store ${referenceId} is not composed.`
    );
  }
  if (!dependencies.redisClient) {
    throw memoryError(
      'MEMORY_STORE_UNAVAILABLE',
      'Native Memory Redis working store is configured but Redis is not composed.',
      true
    );
  }
  return new RedisWorkingMemoryStore({
    client: dependencies.redisClient,
    namespace: dependencies.workingMemoryNamespace,
    defaultTtlSeconds: dependencies.workingMemoryTtlSeconds,
    now: dependencies.now,
  });
}

function resolveVectorStores(
  referenceIds: readonly string[],
  installed: readonly ManagedVectorStoreAdapter[]
): ManagedVectorStoreAdapter[] {
  const byId = new Map(installed.map((store) => [store.id, store]));
  return referenceIds.map((id) => {
    const store = byId.get(id);
    if (!store) {
      throw memoryError(
        'MEMORY_PROVIDER_NOT_INSTALLED',
        `Native Memory vector store ${id} is not composed.`
      );
    }
    return store;
  });
}

function resolveEmbeddingProvider(
  referenceId: string | undefined,
  dependencies: NativeMemoryRuntimeDependencies
): EmbeddingProvider | undefined {
  if (!referenceId) return undefined;
  if (!dependencies.embeddingProvider || dependencies.embeddingProviderId !== referenceId) {
    throw memoryError(
      'MEMORY_PROVIDER_NOT_INSTALLED',
      `Native Memory embedding provider ${referenceId} is not composed.`
    );
  }
  return dependencies.embeddingProvider;
}
