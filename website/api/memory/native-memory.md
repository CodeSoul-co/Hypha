# `@codesoul-co/hypha-memory` / `native-memory`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/native-memory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `NativeMemoryManagementProvider` | class | <code>new NativeMemoryManagementProvider(options: NativeMemoryProviderOptions): NativeMemoryManagementProvider</code> | Runtime implementation for Native Memory Management Provider; see its public constructor and members below. |
| `NativeMemoryProviderOptions` | interface | <code>interface NativeMemoryProviderOptions</code> | Field contract for Native Memory Provider Options; see all contract members below. |

## `NativeMemoryManagementProvider` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `capabilities` | method | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: NativeMemoryProviderOptions): NativeMemoryManagementProvider</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `id` | property | <code>id: string</code> | Public id property. |
| `list` | method | <code>list(request: MemoryListRequest): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `outboxStore` | property | <code>outboxStore: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/managed-store").MemoryIndexOutboxStore</code> | Public outbox Store property. |
| `persistence` | property | <code>persistence: MemoryPersistenceUnitOfWork</code> | Public persistence property. |
| `recordStore` | property | <code>recordStore: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/managed-store").ManagedMemoryRecordStore</code> | Public record Store property. |
| `retrieval` | property | <code>retrieval: DefaultMemoryRetrievalPipeline</code> | Public retrieval property. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `NativeMemoryProviderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `embeddingProvider` | property | <code>embeddingProvider: EmbeddingProvider</code> | Public embedding Provider property. |
| `events` | property | <code>events: MemoryEventPublisher</code> | Public events property. |
| `idempotencyStore` | property | <code>idempotencyStore: MemoryIdempotencyStore</code> | Public idempotency Store property. |
| `maintenancePolicy` | property | <code>maintenancePolicy: MemoryMaintenancePolicySpec</code> | Public maintenance Policy property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `persistence` | property | <code>persistence: MemoryPersistenceUnitOfWork</code> | Public persistence property. |
| `profile` | property | <code>profile: MemoryProfileSpec</code> | Public profile property. |
| `vectorStores` | property | <code>vectorStores: ManagedVectorStoreAdapter[]</code> | Public vector Stores property. |
