# `@codesoul-co/hypha-memory` / `structured-vector-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/structured-vector-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-vector-store.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `StructuredManagedVectorStoreAdapter` | 类 | <code>new StructuredManagedVectorStoreAdapter(store: StructuredStoreProvider, options?: StructuredManagedVectorStoreAdapterOptions): StructuredManagedVectorStoreAdapter</code> | Durable, bounded vector projection backed by the configured Structured Store. |
| `StructuredManagedVectorStoreAdapterOptions` | 接口 | <code>interface StructuredManagedVectorStoreAdapterOptions</code> | Structured Managed Vector Store Adapter Options 的字段契约；完整字段见下表。 |

## `StructuredManagedVectorStoreAdapter` 公开成员

Durable, bounded vector projection backed by the configured Structured Store.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(store: StructuredStoreProvider, options?: StructuredManagedVectorStoreAdapterOptions): StructuredManagedVectorStoreAdapter</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | 删除 delete。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `initialize` | 方法 | <code>initialize(): Promise&lt;void&gt;</code> | initialize 的公开运行时操作。 |
| `search` | 方法 | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `upsert` | 方法 | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | upsert 的公开运行时操作。 |

## `StructuredManagedVectorStoreAdapterOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `maxScanPoints` | 属性 | <code>maxScanPoints: number</code> | max Scan Points 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `table` | 属性 | <code>table: string</code> | table 字段。 |
