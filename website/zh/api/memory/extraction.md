# `@codesoul-co/hypha-memory` / `extraction`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/extraction.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)
- 导出数: **11**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `BasicMemoryExtractionSourceAdapter` | 类 | <code>new BasicMemoryExtractionSourceAdapter&lt;T = unknown&gt;(type: MemoryExtractionSourceType, loader: ExtractionSourceLoader&lt;T&gt;, normalizer: (value: T, ref: MemoryExtractionSourceRef) =&gt; NormalizedExtractionInput): BasicMemoryExtractionSourceAdapter&lt;T&gt;</code> | Basic Memory Extraction Source Adapter 的运行时实现；公开构造函数与成员见下表。 |
| `DeterministicMemoryExtractor` | 类 | <code>new DeterministicMemoryExtractor(): DeterministicMemoryExtractor</code> | Deterministic Memory Extractor 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryMemoryExtractionStateStore` | 类 | <code>new InMemoryMemoryExtractionStateStore(): InMemoryMemoryExtractionStateStore</code> | In Memory Memory Extraction State Store 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryExtractionCoordinator` | 类 | <code>new MemoryExtractionCoordinator(options: MemoryExtractionCoordinatorOptions): MemoryExtractionCoordinator</code> | Memory Extraction Coordinator 的运行时实现；公开构造函数与成员见下表。 |
| `createConversationExtractionAdapter` | 函数 | <code>createConversationExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | 创建 Conversation Extraction Adapter。 |
| `createEpisodicRecordExtractionAdapter` | 函数 | <code>createEpisodicRecordExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | 创建 Episodic Record Extraction Adapter。 |
| `createRuntimeEventExtractionAdapter` | 函数 | <code>createRuntimeEventExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | 创建 Runtime Event Extraction Adapter。 |
| `createTruthExtractionAdapter` | 函数 | <code>createTruthExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | 创建 Truth Extraction Adapter。 |
| `MemoryExtractionCoordinatorOptions` | 接口 | <code>interface MemoryExtractionCoordinatorOptions</code> | Memory Extraction Coordinator Options 的字段契约；完整字段见下表。 |
| `MemoryExtractionStateStore` | 接口 | <code>interface MemoryExtractionStateStore</code> | Memory Extraction State Store 的字段契约；完整字段见下表。 |
| `ExtractionSourceLoader` | 类型 | <code>type ExtractionSourceLoader = (ref: MemoryExtractionSourceRef) =&gt; Promise&lt;T&gt;</code> | Extraction Source Loader 的公共类型别名。 |

## `BasicMemoryExtractionSourceAdapter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>&lt;T = unknown&gt;(type: MemoryExtractionSourceType, loader: ExtractionSourceLoader&lt;T&gt;, normalizer: (value: T, ref: MemoryExtractionSourceRef) =&gt; NormalizedExtractionInput): BasicMemoryExtractionSourceAdapter&lt;T&gt;</code> | 创建该类的实例。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `load` | 方法 | <code>load(refs: MemoryExtractionSourceRef[], cursor?: MemoryExtractionCursor): Promise&lt;MemoryExtractionSourceBatch&lt;T&gt;&gt;</code> | 加载 load。 |
| `normalize` | 方法 | <code>normalize(batch: MemoryExtractionSourceBatch&lt;T&gt;): Promise&lt;NormalizedExtractionInput[]&gt;</code> | 规范化 normalize。 |
| `type` | 属性 | <code>type: MemoryExtractionSourceType</code> | type 字段。 |

## `DeterministicMemoryExtractor` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DeterministicMemoryExtractor</code> | 创建该类的实例。 |
| `extract` | 方法 | <code>extract(inputs: NormalizedExtractionInput[], profile: MemoryExtractionProfileSpec): Promise&lt;ExtractedMemoryCandidate[]&gt;</code> | extract 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: "memory.extractor.deterministic"</code> | id 字段。 |

## `InMemoryMemoryExtractionStateStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryMemoryExtractionStateStore</code> | 创建该类的实例。 |
| `getBatch` | 方法 | <code>getBatch(id: string): Promise&lt;MemoryExtractionBatch &#124; null&gt;</code> | 读取 Batch。 |
| `getCursor` | 方法 | <code>getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise&lt;MemoryExtractionCursor &#124; null&gt;</code> | 读取 Cursor。 |
| `getJob` | 方法 | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | 读取 Job。 |
| `saveBatch` | 方法 | <code>saveBatch(batch: MemoryExtractionBatch): Promise&lt;void&gt;</code> | 保存 Batch。 |
| `saveCursor` | 方法 | <code>saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise&lt;void&gt;</code> | 保存 Cursor。 |
| `saveJob` | 方法 | <code>saveJob(job: MemoryExtractionJob): Promise&lt;void&gt;</code> | 保存 Job。 |

## `MemoryExtractionCoordinator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: MemoryExtractionCoordinatorOptions): MemoryExtractionCoordinator</code> | 创建该类的实例。 |
| `getJob` | 方法 | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | 读取 Job。 |
| `run` | 方法 | <code>run(request: MemoryExtractionRequest, profile: MemoryExtractionProfileSpec): Promise&lt;{ job: MemoryExtractionJob; batch: MemoryExtractionBatch; }&gt;</code> | run 的公开运行时操作。 |
| `stateStore` | 属性 | <code>stateStore: MemoryExtractionStateStore</code> | state Store 字段。 |

## `MemoryExtractionCoordinatorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adapters` | 属性 | <code>adapters: MemoryExtractionSourceAdapter&lt;unknown&gt;[]</code> | adapters 字段。 |
| `extractor` | 属性 | <code>extractor: MemoryExtractor</code> | extractor 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `stateStore` | 属性 | <code>stateStore: MemoryExtractionStateStore</code> | state Store 字段。 |

## `MemoryExtractionStateStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `getBatch` | 方法 | <code>getBatch(id: string): Promise&lt;MemoryExtractionBatch &#124; null&gt;</code> | 读取 Batch。 |
| `getCursor` | 方法 | <code>getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise&lt;MemoryExtractionCursor &#124; null&gt;</code> | 读取 Cursor。 |
| `getJob` | 方法 | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | 读取 Job。 |
| `saveBatch` | 方法 | <code>saveBatch(batch: MemoryExtractionBatch): Promise&lt;void&gt;</code> | 保存 Batch。 |
| `saveCursor` | 方法 | <code>saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise&lt;void&gt;</code> | 保存 Cursor。 |
| `saveJob` | 方法 | <code>saveJob(job: MemoryExtractionJob): Promise&lt;void&gt;</code> | 保存 Job。 |
