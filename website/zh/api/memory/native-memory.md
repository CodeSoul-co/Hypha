# `@codesoul-co/hypha-memory` / `native-memory`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/native-memory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `NativeMemoryManagementProvider` | 类 | <code>new NativeMemoryManagementProvider(options: NativeMemoryProviderOptions): NativeMemoryManagementProvider</code> | Native Memory Management Provider 的运行时实现；公开构造函数与成员见下表。 |
| `NativeMemoryProviderOptions` | 接口 | <code>interface NativeMemoryProviderOptions</code> | Native Memory Provider Options 的字段契约；完整字段见下表。 |

## `NativeMemoryManagementProvider` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: NativeMemoryProviderOptions): NativeMemoryManagementProvider</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `list` | 方法 | <code>list(request: MemoryListRequest): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `outboxStore` | 属性 | <code>outboxStore: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/managed-store").MemoryIndexOutboxStore</code> | outbox Store 字段。 |
| `persistence` | 属性 | <code>persistence: MemoryPersistenceUnitOfWork</code> | persistence 字段。 |
| `recordStore` | 属性 | <code>recordStore: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/managed-store").ManagedMemoryRecordStore</code> | record Store 字段。 |
| `retrieval` | 属性 | <code>retrieval: DefaultMemoryRetrievalPipeline</code> | retrieval 字段。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `NativeMemoryProviderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `embeddingProvider` | 属性 | <code>embeddingProvider: EmbeddingProvider</code> | embedding Provider 字段。 |
| `events` | 属性 | <code>events: MemoryEventPublisher</code> | events 字段。 |
| `idempotencyStore` | 属性 | <code>idempotencyStore: MemoryIdempotencyStore</code> | idempotency Store 字段。 |
| `maintenancePolicy` | 属性 | <code>maintenancePolicy: MemoryMaintenancePolicySpec</code> | maintenance Policy 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `persistence` | 属性 | <code>persistence: MemoryPersistenceUnitOfWork</code> | persistence 字段。 |
| `profile` | 属性 | <code>profile: MemoryProfileSpec</code> | profile 字段。 |
| `vectorStores` | 属性 | <code>vectorStores: ManagedVectorStoreAdapter[]</code> | vector Stores 字段。 |
