# `@codesoul-co/hypha-memory` / `structured-extraction-state-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/structured-extraction-state-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-extraction-state-store.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `StructuredMemoryExtractionStateStore` | 类 | <code>new StructuredMemoryExtractionStateStore(options: StructuredMemoryExtractionStateStoreOptions): StructuredMemoryExtractionStateStore</code> | Structured Memory Extraction State Store 的运行时实现；公开构造函数与成员见下表。 |
| `StructuredMemoryExtractionStateStoreOptions` | 接口 | <code>interface StructuredMemoryExtractionStateStoreOptions</code> | Structured Memory Extraction State Store Options 的字段契约；完整字段见下表。 |

## `StructuredMemoryExtractionStateStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: StructuredMemoryExtractionStateStoreOptions): StructuredMemoryExtractionStateStore</code> | 创建该类的实例。 |
| `getBatch` | 方法 | <code>getBatch(id: string): Promise&lt;MemoryExtractionBatch &#124; null&gt;</code> | 读取 Batch。 |
| `getCursor` | 方法 | <code>getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise&lt;MemoryExtractionCursor &#124; null&gt;</code> | 读取 Cursor。 |
| `getJob` | 方法 | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | 读取 Job。 |
| `saveBatch` | 方法 | <code>saveBatch(batch: MemoryExtractionBatch): Promise&lt;void&gt;</code> | 保存 Batch。 |
| `saveCursor` | 方法 | <code>saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise&lt;void&gt;</code> | 保存 Cursor。 |
| `saveJob` | 方法 | <code>saveJob(job: MemoryExtractionJob): Promise&lt;void&gt;</code> | 保存 Job。 |

## `StructuredMemoryExtractionStateStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `batchTable` | 属性 | <code>batchTable: string</code> | batch Table 字段。 |
| `cursorTable` | 属性 | <code>cursorTable: string</code> | cursor Table 字段。 |
| `jobTable` | 属性 | <code>jobTable: string</code> | job Table 字段。 |
| `store` | 属性 | <code>store: StructuredStoreProvider</code> | store 字段。 |
