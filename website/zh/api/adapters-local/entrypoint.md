# `@codesoul-co/hypha-adapters-local` / `index`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)
- 导出数: **26**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactStoreToolPort` | 类 | <code>new ArtifactStoreToolPort(artifacts: ArtifactStoreProvider): ArtifactStoreToolPort</code> | Artifact Store Tool Port 的运行时实现；公开构造函数与成员见下表。 |
| `FileArtifactStore` | 类 | <code>new FileArtifactStore(options: FileArtifactStoreOptions): FileArtifactStore</code> | File Artifact Store 的运行时实现；公开构造函数与成员见下表。 |
| `FileMCPCapabilityCatalogStore` | 类 | <code>new FileMCPCapabilityCatalogStore(filename: string): FileMCPCapabilityCatalogStore</code> | File MCP Capability Catalog Store 的运行时实现；公开构造函数与成员见下表。 |
| `FileToolContractSnapshotStore` | 类 | <code>new FileToolContractSnapshotStore(rootPath: string): FileToolContractSnapshotStore</code> | File Tool Contract Snapshot Store 的运行时实现；公开构造函数与成员见下表。 |
| `FileToolObservationStore` | 类 | <code>new FileToolObservationStore(rootPath: string): FileToolObservationStore</code> | File Tool Observation Store 的运行时实现；公开构造函数与成员见下表。 |
| `FileToolRuntimeStore` | 类 | <code>new FileToolRuntimeStore(options: FileToolRuntimeStoreOptions): FileToolRuntimeStore</code> | File Tool Runtime Store 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryArtifactStore` | 类 | <code>new InMemoryArtifactStore(): InMemoryArtifactStore</code> | In Memory Artifact Store 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryStructuredStore` | 类 | <code>new InMemoryStructuredStore(): InMemoryStructuredStore</code> | In Memory Structured Store 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryVectorIndexProvider` | 类 | <code>new InMemoryVectorIndexProvider(): InMemoryVectorIndexProvider</code> | In Memory Vector Index Provider 的运行时实现；公开构造函数与成员见下表。 |
| `LocalHashEmbeddingProvider` | 类 | <code>new LocalHashEmbeddingProvider(options?: LocalHashEmbeddingProviderOptions): LocalHashEmbeddingProvider</code> | Zero-dependency lexical embedding for the local backbone. This is deliberately named by its algorithm rather than presented as a neural semantic model. Token and character n-gram feature hashing gives related local text stable overlap while keeping dimensions and persistence deterministic. Deployments that require semantic recall should inject a concrete embedding Provider through `createLocalStorageBackbone`. |
| `LocalVectorIndexProvider` | 类 | <code>new LocalVectorIndexProvider(options: LocalVectorIndexProviderOptions): LocalVectorIndexProvider</code> | Local Vector Index Provider 的运行时实现；公开构造函数与成员见下表。 |
| `MockEmbeddingProvider` | 类 | <code>new MockEmbeddingProvider(): MockEmbeddingProvider</code> | Mock Embedding Provider 的运行时实现；公开构造函数与成员见下表。 |
| `SQLiteEventStore` | 类 | <code>new SQLiteEventStore(options: SQLiteEventStoreOptions): SQLiteEventStore</code> | SQ Lite Event Store 的运行时实现；公开构造函数与成员见下表。 |
| `SQLiteStructuredStore` | 类 | <code>new SQLiteStructuredStore(options: SQLiteStructuredStoreOptions): SQLiteStructuredStore</code> | SQ Lite Structured Store 的运行时实现；公开构造函数与成员见下表。 |
| `LOCAL_ADAPTER_TYPES` | 常量 | <code>const LOCAL_ADAPTER_TYPES: readonly ["sqlite", "local-vector", "file-artifact"]</code> | 由 `index` 模块导出的 LOCAL ADAPTER TYPES 常量。 |
| `createLocalStorageBackbone` | 函数 | <code>createLocalStorageBackbone(options: LocalStorageBackboneOptions): LocalStorageBackbone</code> | 创建 Local Storage Backbone。 |
| `createLocalStorageProfiles` | 函数 | <code>createLocalStorageProfiles(input: { eventDbFilename: string; structuredDbFilename: string; vectorFilename: string; artifactRootPath: string; }): StorageProviderProfile[]</code> | 创建 Local Storage Profiles。 |
| `FileArtifactStoreOptions` | 接口 | <code>interface FileArtifactStoreOptions</code> | File Artifact Store Options 的字段契约；完整字段见下表。 |
| `FileToolRuntimeStoreOptions` | 接口 | <code>interface FileToolRuntimeStoreOptions</code> | File Tool Runtime Store Options 的字段契约；完整字段见下表。 |
| `LocalAdapterProfile` | 接口 | <code>interface LocalAdapterProfile</code> | Local Adapter Profile 的字段契约；完整字段见下表。 |
| `LocalHashEmbeddingProviderOptions` | 接口 | <code>interface LocalHashEmbeddingProviderOptions</code> | Local Hash Embedding Provider Options 的字段契约；完整字段见下表。 |
| `LocalStorageBackbone` | 接口 | <code>interface LocalStorageBackbone</code> | Local Storage Backbone 的字段契约；完整字段见下表。 |
| `LocalStorageBackboneOptions` | 接口 | <code>interface LocalStorageBackboneOptions</code> | Local Storage Backbone Options 的字段契约；完整字段见下表。 |
| `LocalVectorIndexProviderOptions` | 接口 | <code>interface LocalVectorIndexProviderOptions</code> | Local Vector Index Provider Options 的字段契约；完整字段见下表。 |
| `SQLiteEventStoreOptions` | 接口 | <code>interface SQLiteEventStoreOptions</code> | SQ Lite Event Store Options 的字段契约；完整字段见下表。 |
| `SQLiteStructuredStoreOptions` | 接口 | <code>interface SQLiteStructuredStoreOptions</code> | SQ Lite Structured Store Options 的字段契约；完整字段见下表。 |

## `ArtifactStoreToolPort` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(artifacts: ArtifactStoreProvider): ArtifactStoreToolPort</code> | 创建该类的实例。 |
| `store` | 方法 | <code>store(request: { invocationId: string; toolId: string; value: unknown; mimeType?: string; metadata?: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | store 的公开运行时操作。 |

## `FileArtifactStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: FileArtifactStoreOptions): FileArtifactStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(ref: ArtifactRef): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(ref: ArtifactRef): Promise&lt;Buffer&gt;</code> | 读取 get。 |
| `put` | 方法 | <code>put(filePath: string, content: Buffer &#124; string, meta?: ArtifactMeta): Promise&lt;ArtifactRef&gt;</code> | put 的公开运行时操作。 |

## `FileMCPCapabilityCatalogStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(filename: string): FileMCPCapabilityCatalogStore</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | 列出 list。 |
| `save` | 方法 | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | 保存 save。 |

## `FileToolContractSnapshotStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(rootPath: string): FileToolContractSnapshotStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | 读取 get。 |
| `save` | 方法 | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | 保存 save。 |

## `FileToolObservationStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(rootPath: string): FileToolObservationStore</code> | 创建该类的实例。 |
| `record` | 方法 | <code>record(request: { invocationId: string; toolId: string; toolRevision: string; runId: string; stepId: string; inputHash: string; outputHash: string; value: unknown; artifactRefs?: string[]; provenance: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | 记录 record。 |

## `FileToolRuntimeStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approve` | 方法 | <code>approve(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolApprovalGrant&gt;</code> | approve 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: FileToolRuntimeStoreOptions): FileToolRuntimeStore</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(record: ToolInvocationRecord): Promise&lt;ToolInvocationRecord&gt;</code> | 创建 create。 |
| `findByIdempotency` | 方法 | <code>findByIdempotency(request: ToolIdempotencyLookup): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | find By Idempotency 的公开运行时操作。 |
| `get` | 方法 | <code>get(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | 读取 get。 |
| `getCompleted` | 方法 | <code>getCompleted(invocationId: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | 读取 Completed。 |
| `getGrant` | 方法 | <code>getGrant(invocationId: string): Promise&lt;ToolApprovalGrant &#124; null&gt;</code> | 读取 Grant。 |
| `getRequest` | 方法 | <code>getRequest(invocationId: string): Promise&lt;ToolApprovalRequest &#124; null&gt;</code> | 读取 Request。 |
| `list` | 方法 | <code>list(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | 列出 list。 |
| `reject` | 方法 | <code>reject(invocationId: string): Promise&lt;ToolApprovalRequest&gt;</code> | reject 的公开运行时操作。 |
| `requestApproval` | 方法 | <code>requestApproval(request: ToolApprovalRequest): Promise&lt;ToolApprovalRequest&gt;</code> | request Approval 的公开运行时操作。 |
| `saveCompleted` | 方法 | <code>saveCompleted(invocationId: string, result: ToolCallResult): Promise&lt;void&gt;</code> | 保存 Completed。 |
| `update` | 方法 | <code>update(invocationId: string, patch: ToolInvocationPatch, options?: { expectedStatuses?: readonly ToolInvocationStatus[]; expectedRevision?: number; }): Promise&lt;ToolInvocationRecord&gt;</code> | update 的公开运行时操作。 |

## `InMemoryArtifactStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryArtifactStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(ref: ArtifactRef): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(ref: ArtifactRef): Promise&lt;Buffer&gt;</code> | 读取 get。 |
| `put` | 方法 | <code>put(path: string, content: Buffer &#124; string, meta?: ArtifactMeta): Promise&lt;ArtifactRef&gt;</code> | put 的公开运行时操作。 |

## `InMemoryStructuredStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryStructuredStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | 读取 get。 |
| `insert` | 方法 | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | insert 的公开运行时操作。 |
| `query` | 方法 | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | query 的公开运行时操作。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | transaction 的公开运行时操作。 |
| `update` | 方法 | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | update 的公开运行时操作。 |

## `InMemoryVectorIndexProvider` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryVectorIndexProvider</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(ids: string[]): Promise&lt;void&gt;</code> | 删除 delete。 |
| `search` | 方法 | <code>search(query: VectorQuery): Promise&lt;VectorSearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `upsert` | 方法 | <code>upsert(records: VectorRecord[]): Promise&lt;void&gt;</code> | upsert 的公开运行时操作。 |

## `LocalHashEmbeddingProvider` 公开成员

Zero-dependency lexical embedding for the local backbone. This is deliberately named by its algorithm rather than presented as a neural semantic model. Token and character n-gram feature hashing gives related local text stable overlap while keeping dimensions and persistence deterministic. Deployments that require semantic recall should inject a concrete embedding Provider through `createLocalStorageBackbone`.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: LocalHashEmbeddingProviderOptions): LocalHashEmbeddingProvider</code> | 创建该类的实例。 |
| `embed` | 方法 | <code>embed(input: string[]): Promise&lt;number[][]&gt;</code> | embed 的公开运行时操作。 |

## `LocalVectorIndexProvider` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LocalVectorIndexProviderOptions): LocalVectorIndexProvider</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(ids: string[]): Promise&lt;void&gt;</code> | 删除 delete。 |
| `search` | 方法 | <code>search(query: VectorQuery): Promise&lt;VectorSearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `upsert` | 方法 | <code>upsert(records: VectorRecord[]): Promise&lt;void&gt;</code> | upsert 的公开运行时操作。 |

## `MockEmbeddingProvider` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): MockEmbeddingProvider</code> | 创建该类的实例。 |
| `embed` | 方法 | <code>embed(input: string[]): Promise&lt;number[][]&gt;</code> | embed 的公开运行时操作。 |

## `SQLiteEventStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | 追加 append。 |
| `constructor` | 构造函数 | <code>(options: SQLiteEventStoreOptions): SQLiteEventStore</code> | 创建该类的实例。 |
| `exportJsonl` | 方法 | <code>exportJsonl(filename: string, filter?: EventFilter): Promise&lt;number&gt;</code> | export Jsonl 的公开运行时操作。 |
| `importJsonl` | 方法 | <code>importJsonl(filename: string): Promise&lt;number&gt;</code> | import Jsonl 的公开运行时操作。 |
| `list` | 方法 | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | 列出 list。 |
| `record` | 方法 | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | 记录 record。 |

## `SQLiteStructuredStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: SQLiteStructuredStoreOptions): SQLiteStructuredStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | 读取 get。 |
| `insert` | 方法 | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | insert 的公开运行时操作。 |
| `query` | 方法 | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | query 的公开运行时操作。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | transaction 的公开运行时操作。 |
| `update` | 方法 | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | update 的公开运行时操作。 |

## `FileArtifactStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `rootPath` | 属性 | <code>rootPath: string</code> | root Path 字段。 |

## `FileToolRuntimeStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | filename 字段。 |

## `LocalAdapterProfile` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `options` | 属性 | <code>options: Record&lt;string, unknown&gt;</code> | options 字段。 |
| `rootPath` | 属性 | <code>rootPath: string</code> | root Path 字段。 |
| `type` | 属性 | <code>type: "sqlite" &#124; "local-vector" &#124; "file-artifact"</code> | type 字段。 |

## `LocalHashEmbeddingProviderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dimensions` | 属性 | <code>dimensions: number</code> | dimensions 字段。 |

## `LocalStorageBackbone` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: FileArtifactStore</code> | artifacts 字段。 |
| `embeddings` | 属性 | <code>embeddings: EmbeddingProvider</code> | embeddings 字段。 |
| `eventStore` | 属性 | <code>eventStore: SQLiteEventStore</code> | event Store 字段。 |
| `memory` | 属性 | <code>memory: HybridMemoryProvider</code> | memory 字段。 |
| `profiles` | 属性 | <code>profiles: StorageProviderProfile[]</code> | profiles 字段。 |
| `structured` | 属性 | <code>structured: SQLiteStructuredStore</code> | structured 字段。 |
| `vector` | 属性 | <code>vector: LocalVectorIndexProvider</code> | vector 字段。 |

## `LocalStorageBackboneOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRootPath` | 属性 | <code>artifactRootPath: string</code> | artifact Root Path 字段。 |
| `embeddings` | 属性 | <code>embeddings: EmbeddingProvider</code> | embeddings 字段。 |
| `eventDbFilename` | 属性 | <code>eventDbFilename: string</code> | event Db Filename 字段。 |
| `memoryTableName` | 属性 | <code>memoryTableName: string</code> | memory Table Name 字段。 |
| `rootPath` | 属性 | <code>rootPath: string</code> | root Path 字段。 |
| `sqliteMode` | 属性 | <code>sqliteMode: "sqlite" &#124; "json" &#124; "auto" &#124; "node-sqlite"</code> | sqlite Mode 字段。 |
| `structuredDbFilename` | 属性 | <code>structuredDbFilename: string</code> | structured Db Filename 字段。 |
| `vectorFilename` | 属性 | <code>vectorFilename: string</code> | vector Filename 字段。 |

## `LocalVectorIndexProviderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | filename 字段。 |

## `SQLiteEventStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | filename 字段。 |
| `jsonFallbackFilename` | 属性 | <code>jsonFallbackFilename: string</code> | json Fallback Filename 字段。 |
| `mode` | 属性 | <code>mode: "sqlite" &#124; "json" &#124; "auto" &#124; "node-sqlite"</code> | mode 字段。 |

## `SQLiteStructuredStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | filename 字段。 |
| `jsonFallbackFilename` | 属性 | <code>jsonFallbackFilename: string</code> | json Fallback Filename 字段。 |
| `mode` | 属性 | <code>mode: "sqlite" &#124; "json" &#124; "auto" &#124; "node-sqlite"</code> | mode 字段。 |
