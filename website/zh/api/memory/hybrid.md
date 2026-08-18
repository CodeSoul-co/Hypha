# `@codesoul-co/hypha-memory` / `hybrid`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/hybrid.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hybrid.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `HybridMemoryProvider` | 类 | <code>new HybridMemoryProvider(options: HybridMemoryProviderOptions): HybridMemoryProvider</code> | Hybrid Memory Provider 的运行时实现；公开构造函数与成员见下表。 |
| `HybridMemoryProviderOptions` | 接口 | <code>interface HybridMemoryProviderOptions</code> | Hybrid Memory Provider Options 的字段契约；完整字段见下表。 |

## `HybridMemoryProvider` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `audit` | 方法 | <code>audit(scope: MemoryScope, _options?: MemoryAuditOptions): Promise&lt;MemoryAuditReport&gt;</code> | audit 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: HybridMemoryProviderOptions): HybridMemoryProvider</code> | 创建该类的实例。 |
| `invalidate` | 方法 | <code>invalidate(scope: MemoryScope, recordId: string, reason: string): Promise&lt;void&gt;</code> | invalidate 的公开运行时操作。 |
| `read` | 方法 | <code>read(scope: MemoryScope, query: MemoryReadQuery): Promise&lt;MemoryRecord[]&gt;</code> | read 的公开运行时操作。 |
| `search` | 方法 | <code>search(scope: MemoryScope, query: MemorySearchQuery): Promise&lt;MemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `summarize` | 方法 | <code>summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise&lt;MemorySummary&gt;</code> | summarize 的公开运行时操作。 |
| `update` | 方法 | <code>update(scope: MemoryScope, recordId: string, patch: Partial&lt;MemoryRecord&gt;): Promise&lt;void&gt;</code> | update 的公开运行时操作。 |
| `write` | 方法 | <code>write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise&lt;MemoryWriteResult&gt;</code> | write 的公开运行时操作。 |

## `HybridMemoryProviderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: ArtifactStoreProvider</code> | artifacts 字段。 |
| `embeddings` | 属性 | <code>embeddings: EmbeddingProvider</code> | embeddings 字段。 |
| `structured` | 属性 | <code>structured: StructuredStoreProvider</code> | structured 字段。 |
| `tableName` | 属性 | <code>tableName: string</code> | table Name 字段。 |
| `vector` | 属性 | <code>vector: VectorIndexProvider</code> | vector 字段。 |
