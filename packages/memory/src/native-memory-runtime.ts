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
import { MemoryWorkerSupervisor } from './memory-worker-supervisor';
import { NativeMemoryManagementProvider } from './native-memory';
import { StructuredMemoryPersistenceUnitOfWork } from './structured-memory-persistence';
import { StructuredMemoryIdempotencyStore } from './structured-idempotency-store';
import { StructuredMemoryLifecycleTaskStore } from './structured-lifecycle-task-store';
import {
  RedisWorkingMemoryStore,
  type RedisLikeWorkingMemoryClient,
  type WorkingMemoryStore,
} from './working-store';

export interface NativeMemoryRuntimeDependencies {
  structuredStore: StructuredStoreProvider;
  redisClient: RedisLikeWorkingMemoryClient;
  embeddingProvider: EmbeddingProvider;
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
        now: () => (dependencies.now?.() ?? new Date()).toISOString(),
      });
      const outbox = new IndexOutboxWorker({
        ownerId: `${dependencies.ownerId}:index`,
        outboxStore: provider.outboxStore,
        recordStore: provider.recordStore,
        embeddingProvider: dependencies.embeddingProvider,
        vectorStores: dependencies.vectorStores,
        now: dependencies.now,
        onEvent: dependencies.onIndexEvent,
        onError: (error) =>
          dependencies.onLifecycleEvent?.({
            type: 'memory.worker.failed',
            workerType: 'reindex',
            error,
          }),
      });
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
      const supervisor = new MemoryWorkerSupervisor({ workers: [outbox, ...lifecycleWorkers] });
      await supervisor.start();
      const workingStore = new RedisWorkingMemoryStore({
        client: dependencies.redisClient,
        namespace: dependencies.workingMemoryNamespace,
        defaultTtlSeconds: dependencies.workingMemoryTtlSeconds,
        now: dependencies.now,
      });
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
