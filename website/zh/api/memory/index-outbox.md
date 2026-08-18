# `@codesoul-co/hypha-memory` / `index-outbox`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/index-outbox.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)
- 导出数: **11**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `IndexOutboxWorker` | 类 | <code>new IndexOutboxWorker(options: IndexOutboxWorkerOptions): IndexOutboxWorker</code> | Index Outbox Worker 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryLocalVectorStoreAdapter` | 类 | <code>new InMemoryLocalVectorStoreAdapter(id?: string): InMemoryLocalVectorStoreAdapter</code> | In Memory Local Vector Store Adapter 的运行时实现；公开构造函数与成员见下表。 |
| `LegacyVectorIndexStoreAdapter` | 类 | <code>new LegacyVectorIndexStoreAdapter(id: string, provider: VectorIndexProvider): LegacyVectorIndexStoreAdapter</code> | Legacy Vector Index Store Adapter 的运行时实现；公开构造函数与成员见下表。 |
| `IndexOutboxWorkerEvent` | 接口 | <code>interface IndexOutboxWorkerEvent</code> | Index Outbox Worker Event 的字段契约；完整字段见下表。 |
| `IndexOutboxWorkerOptions` | 接口 | <code>interface IndexOutboxWorkerOptions</code> | Index Outbox Worker Options 的字段契约；完整字段见下表。 |
| `IndexOutboxWorkerRunResult` | 接口 | <code>interface IndexOutboxWorkerRunResult</code> | Index Outbox Worker Run Result 的字段契约；完整字段见下表。 |
| `ManagedVectorPoint` | 接口 | <code>interface ManagedVectorPoint</code> | Managed Vector Point 的字段契约；完整字段见下表。 |
| `ManagedVectorSearchRequest` | 接口 | <code>interface ManagedVectorSearchRequest</code> | Managed Vector Search Request 的字段契约；完整字段见下表。 |
| `ManagedVectorSearchResult` | 接口 | <code>interface ManagedVectorSearchResult</code> | Managed Vector Search Result 的字段契约；完整字段见下表。 |
| `ManagedVectorStoreAdapter` | 接口 | <code>interface ManagedVectorStoreAdapter</code> | Managed Vector Store Adapter 的字段契约；完整字段见下表。 |
| `ManagedVectorWriteOptions` | 接口 | <code>interface ManagedVectorWriteOptions</code> | Managed Vector Write Options 的字段契约；完整字段见下表。 |

## `IndexOutboxWorker` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: IndexOutboxWorkerOptions): IndexOutboxWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | drain 的公开运行时操作。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;IndexOutboxWorkerRunResult&gt;</code> | run Once 的公开运行时操作。 |
| `start` | 方法 | <code>start(): void</code> | 启动 start。 |
| `stop` | 方法 | <code>stop(): void</code> | stop 的公开运行时操作。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | stop And Drain 的公开运行时操作。 |

## `InMemoryLocalVectorStoreAdapter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(id?: string): InMemoryLocalVectorStoreAdapter</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | 删除 delete。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `search` | 方法 | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `upsert` | 方法 | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | upsert 的公开运行时操作。 |

## `LegacyVectorIndexStoreAdapter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(id: string, provider: VectorIndexProvider): LegacyVectorIndexStoreAdapter</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | 删除 delete。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `search` | 方法 | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `upsert` | 方法 | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | upsert 的公开运行时操作。 |

## `IndexOutboxWorkerEvent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error: NormalizedMemoryError</code> | error 字段。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | memory Id 字段。 |
| `memoryVersionId` | 属性 | <code>memoryVersionId: string</code> | memory Version Id 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `outboxId` | 属性 | <code>outboxId: string</code> | outbox Id 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `type` | 属性 | <code>type: "memory.index.started" &#124; "memory.index.completed" &#124; "memory.index.partial" &#124; "memory.index.failed"</code> | type 字段。 |

## `IndexOutboxWorkerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `batchSize` | 属性 | <code>batchSize: number</code> | batch Size 字段。 |
| `embeddingProvider` | 属性 | <code>embeddingProvider: EmbeddingProvider</code> | embedding Provider 字段。 |
| `leaseMs` | 属性 | <code>leaseMs: number</code> | lease Ms 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `onError` | 方法 | <code>onError(error: NormalizedMemoryError): void &#124; Promise&lt;void&gt;</code> | 处理 Error。 |
| `onEvent` | 方法 | <code>onEvent(event: IndexOutboxWorkerEvent): void &#124; Promise&lt;void&gt;</code> | 处理 Event。 |
| `outboxStore` | 属性 | <code>outboxStore: MemoryIndexOutboxStore</code> | outbox Store 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `pollIntervalMs` | 属性 | <code>pollIntervalMs: number</code> | poll Interval Ms 字段。 |
| `recordStore` | 属性 | <code>recordStore: ManagedMemoryRecordStore</code> | record Store 字段。 |
| `renewalMs` | 属性 | <code>renewalMs: number</code> | renewal Ms 字段。 |
| `retryDelayMs` | 属性 | <code>retryDelayMs: number</code> | retry Delay Ms 字段。 |
| `vectorStores` | 属性 | <code>vectorStores: ManagedVectorStoreAdapter[]</code> | vector Stores 字段。 |

## `IndexOutboxWorkerRunResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `completed` | 属性 | <code>completed: number</code> | completed 字段。 |
| `deadLettered` | 属性 | <code>deadLettered: number</code> | dead Lettered 字段。 |
| `failed` | 属性 | <code>failed: number</code> | failed 字段。 |
| `leased` | 属性 | <code>leased: number</code> | leased 字段。 |

## `ManagedVectorPoint` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `vector` | 属性 | <code>vector: number[]</code> | vector 字段。 |

## `ManagedVectorSearchRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filter` | 属性 | <code>filter: Record&lt;string, unknown&gt;</code> | filter 字段。 |
| `scoreThreshold` | 属性 | <code>scoreThreshold: number</code> | score Threshold 字段。 |
| `topK` | 属性 | <code>topK: number</code> | top K 字段。 |
| `vector` | 属性 | <code>vector: number[]</code> | vector 字段。 |

## `ManagedVectorSearchResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `score` | 属性 | <code>score: number</code> | score 字段。 |

## `ManagedVectorStoreAdapter` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | 删除 delete。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `search` | 方法 | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `upsert` | 方法 | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | upsert 的公开运行时操作。 |

## `ManagedVectorWriteOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `memoryRevision` | 属性 | <code>memoryRevision: number</code> | memory Revision 字段。 |
