# `@codesoul-co/hypha-memory` / `index-outbox`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/index-outbox.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)
- Exports: **11**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `IndexOutboxWorker` | class | <code>new IndexOutboxWorker(options: IndexOutboxWorkerOptions): IndexOutboxWorker</code> | Runtime implementation for Index Outbox Worker; see its public constructor and members below. |
| `InMemoryLocalVectorStoreAdapter` | class | <code>new InMemoryLocalVectorStoreAdapter(id?: string): InMemoryLocalVectorStoreAdapter</code> | Runtime implementation for In Memory Local Vector Store Adapter; see its public constructor and members below. |
| `LegacyVectorIndexStoreAdapter` | class | <code>new LegacyVectorIndexStoreAdapter(id: string, provider: VectorIndexProvider): LegacyVectorIndexStoreAdapter</code> | Runtime implementation for Legacy Vector Index Store Adapter; see its public constructor and members below. |
| `IndexOutboxWorkerEvent` | interface | <code>interface IndexOutboxWorkerEvent</code> | Field contract for Index Outbox Worker Event; see all contract members below. |
| `IndexOutboxWorkerOptions` | interface | <code>interface IndexOutboxWorkerOptions</code> | Field contract for Index Outbox Worker Options; see all contract members below. |
| `IndexOutboxWorkerRunResult` | interface | <code>interface IndexOutboxWorkerRunResult</code> | Field contract for Index Outbox Worker Run Result; see all contract members below. |
| `ManagedVectorPoint` | interface | <code>interface ManagedVectorPoint</code> | Field contract for Managed Vector Point; see all contract members below. |
| `ManagedVectorSearchRequest` | interface | <code>interface ManagedVectorSearchRequest</code> | Field contract for Managed Vector Search Request; see all contract members below. |
| `ManagedVectorSearchResult` | interface | <code>interface ManagedVectorSearchResult</code> | Field contract for Managed Vector Search Result; see all contract members below. |
| `ManagedVectorStoreAdapter` | interface | <code>interface ManagedVectorStoreAdapter</code> | Field contract for Managed Vector Store Adapter; see all contract members below. |
| `ManagedVectorWriteOptions` | interface | <code>interface ManagedVectorWriteOptions</code> | Field contract for Managed Vector Write Options; see all contract members below. |

## `IndexOutboxWorker` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: IndexOutboxWorkerOptions): IndexOutboxWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public runtime operation for drain. |
| `runOnce` | method | <code>runOnce(): Promise&lt;IndexOutboxWorkerRunResult&gt;</code> | Public runtime operation for run Once. |
| `start` | method | <code>start(): void</code> | Starts start at this module boundary. |
| `stop` | method | <code>stop(): void</code> | Public runtime operation for stop. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public runtime operation for stop And Drain. |

## `InMemoryLocalVectorStoreAdapter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(id?: string): InMemoryLocalVectorStoreAdapter</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `search` | method | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | Public runtime operation for search. |
| `upsert` | method | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Public runtime operation for upsert. |

## `LegacyVectorIndexStoreAdapter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(id: string, provider: VectorIndexProvider): LegacyVectorIndexStoreAdapter</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `search` | method | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | Public runtime operation for search. |
| `upsert` | method | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Public runtime operation for upsert. |

## `IndexOutboxWorkerEvent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error: NormalizedMemoryError</code> | Public error property. |
| `memoryId` | property | <code>memoryId: string</code> | Public memory Id property. |
| `memoryVersionId` | property | <code>memoryVersionId: string</code> | Public memory Version Id property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `outboxId` | property | <code>outboxId: string</code> | Public outbox Id property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `type` | property | <code>type: "memory.index.started" &#124; "memory.index.completed" &#124; "memory.index.partial" &#124; "memory.index.failed"</code> | Public type property. |

## `IndexOutboxWorkerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `batchSize` | property | <code>batchSize: number</code> | Public batch Size property. |
| `embeddingProvider` | property | <code>embeddingProvider: EmbeddingProvider</code> | Public embedding Provider property. |
| `leaseMs` | property | <code>leaseMs: number</code> | Public lease Ms property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `onError` | method | <code>onError(error: NormalizedMemoryError): void &#124; Promise&lt;void&gt;</code> | Handles Error at this module boundary. |
| `onEvent` | method | <code>onEvent(event: IndexOutboxWorkerEvent): void &#124; Promise&lt;void&gt;</code> | Handles Event at this module boundary. |
| `outboxStore` | property | <code>outboxStore: MemoryIndexOutboxStore</code> | Public outbox Store property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `pollIntervalMs` | property | <code>pollIntervalMs: number</code> | Public poll Interval Ms property. |
| `recordStore` | property | <code>recordStore: ManagedMemoryRecordStore</code> | Public record Store property. |
| `renewalMs` | property | <code>renewalMs: number</code> | Public renewal Ms property. |
| `retryDelayMs` | property | <code>retryDelayMs: number</code> | Public retry Delay Ms property. |
| `vectorStores` | property | <code>vectorStores: ManagedVectorStoreAdapter[]</code> | Public vector Stores property. |

## `IndexOutboxWorkerRunResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `completed` | property | <code>completed: number</code> | Public completed property. |
| `deadLettered` | property | <code>deadLettered: number</code> | Public dead Lettered property. |
| `failed` | property | <code>failed: number</code> | Public failed property. |
| `leased` | property | <code>leased: number</code> | Public leased property. |

## `ManagedVectorPoint` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `vector` | property | <code>vector: number[]</code> | Public vector property. |

## `ManagedVectorSearchRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filter` | property | <code>filter: Record&lt;string, unknown&gt;</code> | Public filter property. |
| `scoreThreshold` | property | <code>scoreThreshold: number</code> | Public score Threshold property. |
| `topK` | property | <code>topK: number</code> | Public top K property. |
| `vector` | property | <code>vector: number[]</code> | Public vector property. |

## `ManagedVectorSearchResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `score` | property | <code>score: number</code> | Public score property. |

## `ManagedVectorStoreAdapter` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `search` | method | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | Public runtime operation for search. |
| `upsert` | method | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Public runtime operation for upsert. |

## `ManagedVectorWriteOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `memoryRevision` | property | <code>memoryRevision: number</code> | Public memory Revision property. |
