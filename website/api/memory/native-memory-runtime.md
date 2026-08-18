# `@codesoul-co/hypha-memory` / `native-memory-runtime`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/native-memory-runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory-runtime.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createNativeMemoryManagementProviderFactory` | function | <code>createNativeMemoryManagementProviderFactory(dependencies: NativeMemoryRuntimeDependencies): MemoryManagementProviderFactory</code> | Creates Native Memory Management Provider Factory at this module boundary. |
| `NativeMemoryRuntimeDependencies` | interface | <code>interface NativeMemoryRuntimeDependencies</code> | Field contract for Native Memory Runtime Dependencies; see all contract members below. |
| `NativeMemoryRuntimeResources` | interface | <code>interface NativeMemoryRuntimeResources</code> | Field contract for Native Memory Runtime Resources; see all contract members below. |

## `NativeMemoryRuntimeDependencies` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `embeddingProvider` | property | <code>embeddingProvider: EmbeddingProvider</code> | Public embedding Provider property. |
| `embeddingProviderId` | property | <code>embeddingProviderId: string</code> | Public embedding Provider Id property. |
| `events` | property | <code>events: MemoryEventPublisher</code> | Public events property. |
| `lifecycleHandlers` | property | <code>lifecycleHandlers: Partial&lt;Record&lt;MemoryLifecycleWorkerType, MemoryLifecycleTaskHandler&gt;&gt;</code> | Public lifecycle Handlers property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `onIndexEvent` | method | <code>onIndexEvent(event: IndexOutboxWorkerEvent): void &#124; Promise&lt;void&gt;</code> | Handles Index Event at this module boundary. |
| `onLifecycleEvent` | method | <code>onLifecycleEvent(event: MemoryLifecycleWorkerEvent): void &#124; Promise&lt;void&gt;</code> | Handles Lifecycle Event at this module boundary. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `redisClient` | property | <code>redisClient: RedisLikeWorkingMemoryClient</code> | Public redis Client property. |
| `structuredStore` | property | <code>structuredStore: StructuredStoreProvider</code> | Public structured Store property. |
| `structuredStoreId` | property | <code>structuredStoreId: string</code> | Public structured Store Id property. |
| `vectorStores` | property | <code>vectorStores: ManagedVectorStoreAdapter[]</code> | Public vector Stores property. |
| `workingMemoryNamespace` | property | <code>workingMemoryNamespace: string</code> | Public working Memory Namespace property. |
| `workingMemoryTtlSeconds` | property | <code>workingMemoryTtlSeconds: number</code> | Public working Memory Ttl Seconds property. |

## `NativeMemoryRuntimeResources` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `lifecycleStore` | property | <code>lifecycleStore: StructuredMemoryLifecycleTaskStore</code> | Public lifecycle Store property. |
| `supervisor` | property | <code>supervisor: MemoryWorkerSupervisor</code> | Public supervisor property. |
| `workingStore` | property | <code>workingStore: WorkingMemoryStore</code> | Public working Store property. |
