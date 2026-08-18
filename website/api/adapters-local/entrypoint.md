# `@codesoul-co/hypha-adapters-local` / `index`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/index.ts)
- Exports: **26**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactStoreToolPort` | class | <code>new ArtifactStoreToolPort(artifacts: ArtifactStoreProvider): ArtifactStoreToolPort</code> | Runtime implementation for Artifact Store Tool Port; see its public constructor and members below. |
| `FileArtifactStore` | class | <code>new FileArtifactStore(options: FileArtifactStoreOptions): FileArtifactStore</code> | Runtime implementation for File Artifact Store; see its public constructor and members below. |
| `FileMCPCapabilityCatalogStore` | class | <code>new FileMCPCapabilityCatalogStore(filename: string): FileMCPCapabilityCatalogStore</code> | Runtime implementation for File MCP Capability Catalog Store; see its public constructor and members below. |
| `FileToolContractSnapshotStore` | class | <code>new FileToolContractSnapshotStore(rootPath: string): FileToolContractSnapshotStore</code> | Runtime implementation for File Tool Contract Snapshot Store; see its public constructor and members below. |
| `FileToolObservationStore` | class | <code>new FileToolObservationStore(rootPath: string): FileToolObservationStore</code> | Runtime implementation for File Tool Observation Store; see its public constructor and members below. |
| `FileToolRuntimeStore` | class | <code>new FileToolRuntimeStore(options: FileToolRuntimeStoreOptions): FileToolRuntimeStore</code> | Runtime implementation for File Tool Runtime Store; see its public constructor and members below. |
| `InMemoryArtifactStore` | class | <code>new InMemoryArtifactStore(): InMemoryArtifactStore</code> | Runtime implementation for In Memory Artifact Store; see its public constructor and members below. |
| `InMemoryStructuredStore` | class | <code>new InMemoryStructuredStore(): InMemoryStructuredStore</code> | Runtime implementation for In Memory Structured Store; see its public constructor and members below. |
| `InMemoryVectorIndexProvider` | class | <code>new InMemoryVectorIndexProvider(): InMemoryVectorIndexProvider</code> | Runtime implementation for In Memory Vector Index Provider; see its public constructor and members below. |
| `LocalHashEmbeddingProvider` | class | <code>new LocalHashEmbeddingProvider(options?: LocalHashEmbeddingProviderOptions): LocalHashEmbeddingProvider</code> | Zero-dependency lexical embedding for the local backbone. This is deliberately named by its algorithm rather than presented as a neural semantic model. Token and character n-gram feature hashing gives related local text stable overlap while keeping dimensions and persistence deterministic. Deployments that require semantic recall should inject a concrete embedding Provider through `createLocalStorageBackbone`. |
| `LocalVectorIndexProvider` | class | <code>new LocalVectorIndexProvider(options: LocalVectorIndexProviderOptions): LocalVectorIndexProvider</code> | Runtime implementation for Local Vector Index Provider; see its public constructor and members below. |
| `MockEmbeddingProvider` | class | <code>new MockEmbeddingProvider(): MockEmbeddingProvider</code> | Runtime implementation for Mock Embedding Provider; see its public constructor and members below. |
| `SQLiteEventStore` | class | <code>new SQLiteEventStore(options: SQLiteEventStoreOptions): SQLiteEventStore</code> | Runtime implementation for SQ Lite Event Store; see its public constructor and members below. |
| `SQLiteStructuredStore` | class | <code>new SQLiteStructuredStore(options: SQLiteStructuredStoreOptions): SQLiteStructuredStore</code> | Runtime implementation for SQ Lite Structured Store; see its public constructor and members below. |
| `LOCAL_ADAPTER_TYPES` | constant | <code>const LOCAL_ADAPTER_TYPES: readonly ["sqlite", "local-vector", "file-artifact"]</code> | LOCAL ADAPTER TYPES constant exported by the `index` module. |
| `createLocalStorageBackbone` | function | <code>createLocalStorageBackbone(options: LocalStorageBackboneOptions): LocalStorageBackbone</code> | Creates Local Storage Backbone at this module boundary. |
| `createLocalStorageProfiles` | function | <code>createLocalStorageProfiles(input: { eventDbFilename: string; structuredDbFilename: string; vectorFilename: string; artifactRootPath: string; }): StorageProviderProfile[]</code> | Creates Local Storage Profiles at this module boundary. |
| `FileArtifactStoreOptions` | interface | <code>interface FileArtifactStoreOptions</code> | Field contract for File Artifact Store Options; see all contract members below. |
| `FileToolRuntimeStoreOptions` | interface | <code>interface FileToolRuntimeStoreOptions</code> | Field contract for File Tool Runtime Store Options; see all contract members below. |
| `LocalAdapterProfile` | interface | <code>interface LocalAdapterProfile</code> | Field contract for Local Adapter Profile; see all contract members below. |
| `LocalHashEmbeddingProviderOptions` | interface | <code>interface LocalHashEmbeddingProviderOptions</code> | Field contract for Local Hash Embedding Provider Options; see all contract members below. |
| `LocalStorageBackbone` | interface | <code>interface LocalStorageBackbone</code> | Field contract for Local Storage Backbone; see all contract members below. |
| `LocalStorageBackboneOptions` | interface | <code>interface LocalStorageBackboneOptions</code> | Field contract for Local Storage Backbone Options; see all contract members below. |
| `LocalVectorIndexProviderOptions` | interface | <code>interface LocalVectorIndexProviderOptions</code> | Field contract for Local Vector Index Provider Options; see all contract members below. |
| `SQLiteEventStoreOptions` | interface | <code>interface SQLiteEventStoreOptions</code> | Field contract for SQ Lite Event Store Options; see all contract members below. |
| `SQLiteStructuredStoreOptions` | interface | <code>interface SQLiteStructuredStoreOptions</code> | Field contract for SQ Lite Structured Store Options; see all contract members below. |

## `ArtifactStoreToolPort` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(artifacts: ArtifactStoreProvider): ArtifactStoreToolPort</code> | Creates an instance of this class. |
| `store` | method | <code>store(request: { invocationId: string; toolId: string; value: unknown; mimeType?: string; metadata?: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | Public runtime operation for store. |

## `FileArtifactStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: FileArtifactStoreOptions): FileArtifactStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(ref: ArtifactRef): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(ref: ArtifactRef): Promise&lt;Buffer&gt;</code> | Gets get at this module boundary. |
| `put` | method | <code>put(filePath: string, content: Buffer &#124; string, meta?: ArtifactMeta): Promise&lt;ArtifactRef&gt;</code> | Public runtime operation for put. |

## `FileMCPCapabilityCatalogStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(filename: string): FileMCPCapabilityCatalogStore</code> | Creates an instance of this class. |
| `list` | method | <code>list(serverId?: string): Promise&lt;MCPCapabilityRecord[]&gt;</code> | Lists list at this module boundary. |
| `save` | method | <code>save(record: MCPCapabilityRecord, options?: { expected?: MCPCapabilityRecord &#124; null; }): Promise&lt;boolean&gt;</code> | Saves save at this module boundary. |

## `FileToolContractSnapshotStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(rootPath: string): FileToolContractSnapshotStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(snapshotId: string): Promise&lt;ToolContractSnapshot &#124; null&gt;</code> | Gets get at this module boundary. |
| `save` | method | <code>save(snapshot: ToolContractSnapshot): Promise&lt;void&gt;</code> | Saves save at this module boundary. |

## `FileToolObservationStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(rootPath: string): FileToolObservationStore</code> | Creates an instance of this class. |
| `record` | method | <code>record(request: { invocationId: string; toolId: string; toolRevision: string; runId: string; stepId: string; inputHash: string; outputHash: string; value: unknown; artifactRefs?: string[]; provenance: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | Records record at this module boundary. |

## `FileToolRuntimeStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approve` | method | <code>approve(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolApprovalGrant&gt;</code> | Public runtime operation for approve. |
| `constructor` | constructor | <code>(options: FileToolRuntimeStoreOptions): FileToolRuntimeStore</code> | Creates an instance of this class. |
| `create` | method | <code>create(record: ToolInvocationRecord): Promise&lt;ToolInvocationRecord&gt;</code> | Creates create at this module boundary. |
| `findByIdempotency` | method | <code>findByIdempotency(request: ToolIdempotencyLookup): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | Public runtime operation for find By Idempotency. |
| `get` | method | <code>get(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `getCompleted` | method | <code>getCompleted(invocationId: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | Gets Completed at this module boundary. |
| `getGrant` | method | <code>getGrant(invocationId: string): Promise&lt;ToolApprovalGrant &#124; null&gt;</code> | Gets Grant at this module boundary. |
| `getRequest` | method | <code>getRequest(invocationId: string): Promise&lt;ToolApprovalRequest &#124; null&gt;</code> | Gets Request at this module boundary. |
| `list` | method | <code>list(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | Lists list at this module boundary. |
| `reject` | method | <code>reject(invocationId: string): Promise&lt;ToolApprovalRequest&gt;</code> | Public runtime operation for reject. |
| `requestApproval` | method | <code>requestApproval(request: ToolApprovalRequest): Promise&lt;ToolApprovalRequest&gt;</code> | Public runtime operation for request Approval. |
| `saveCompleted` | method | <code>saveCompleted(invocationId: string, result: ToolCallResult): Promise&lt;void&gt;</code> | Saves Completed at this module boundary. |
| `update` | method | <code>update(invocationId: string, patch: ToolInvocationPatch, options?: { expectedStatuses?: readonly ToolInvocationStatus[]; expectedRevision?: number; }): Promise&lt;ToolInvocationRecord&gt;</code> | Public runtime operation for update. |

## `InMemoryArtifactStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryArtifactStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(ref: ArtifactRef): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(ref: ArtifactRef): Promise&lt;Buffer&gt;</code> | Gets get at this module boundary. |
| `put` | method | <code>put(path: string, content: Buffer &#124; string, meta?: ArtifactMeta): Promise&lt;ArtifactRef&gt;</code> | Public runtime operation for put. |

## `InMemoryStructuredStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryStructuredStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | Gets get at this module boundary. |
| `insert` | method | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | Public runtime operation for insert. |
| `query` | method | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | Public runtime operation for query. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for transaction. |
| `update` | method | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | Public runtime operation for update. |

## `InMemoryVectorIndexProvider` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryVectorIndexProvider</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(ids: string[]): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `search` | method | <code>search(query: VectorQuery): Promise&lt;VectorSearchResult[]&gt;</code> | Public runtime operation for search. |
| `upsert` | method | <code>upsert(records: VectorRecord[]): Promise&lt;void&gt;</code> | Public runtime operation for upsert. |

## `LocalHashEmbeddingProvider` public members

Zero-dependency lexical embedding for the local backbone. This is deliberately named by its algorithm rather than presented as a neural semantic model. Token and character n-gram feature hashing gives related local text stable overlap while keeping dimensions and persistence deterministic. Deployments that require semantic recall should inject a concrete embedding Provider through `createLocalStorageBackbone`.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: LocalHashEmbeddingProviderOptions): LocalHashEmbeddingProvider</code> | Creates an instance of this class. |
| `embed` | method | <code>embed(input: string[]): Promise&lt;number[][]&gt;</code> | Public runtime operation for embed. |

## `LocalVectorIndexProvider` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LocalVectorIndexProviderOptions): LocalVectorIndexProvider</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(ids: string[]): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `search` | method | <code>search(query: VectorQuery): Promise&lt;VectorSearchResult[]&gt;</code> | Public runtime operation for search. |
| `upsert` | method | <code>upsert(records: VectorRecord[]): Promise&lt;void&gt;</code> | Public runtime operation for upsert. |

## `MockEmbeddingProvider` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): MockEmbeddingProvider</code> | Creates an instance of this class. |
| `embed` | method | <code>embed(input: string[]): Promise&lt;number[][]&gt;</code> | Public runtime operation for embed. |

## `SQLiteEventStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | Appends append at this module boundary. |
| `constructor` | constructor | <code>(options: SQLiteEventStoreOptions): SQLiteEventStore</code> | Creates an instance of this class. |
| `exportJsonl` | method | <code>exportJsonl(filename: string, filter?: EventFilter): Promise&lt;number&gt;</code> | Public runtime operation for export Jsonl. |
| `importJsonl` | method | <code>importJsonl(filename: string): Promise&lt;number&gt;</code> | Public runtime operation for import Jsonl. |
| `list` | method | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | Lists list at this module boundary. |
| `record` | method | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | Records record at this module boundary. |

## `SQLiteStructuredStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: SQLiteStructuredStoreOptions): SQLiteStructuredStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | Gets get at this module boundary. |
| `insert` | method | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | Public runtime operation for insert. |
| `query` | method | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | Public runtime operation for query. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for transaction. |
| `update` | method | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | Public runtime operation for update. |

## `FileArtifactStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `rootPath` | property | <code>rootPath: string</code> | Public root Path property. |

## `FileToolRuntimeStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public filename property. |

## `LocalAdapterProfile` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `options` | property | <code>options: Record&lt;string, unknown&gt;</code> | Public options property. |
| `rootPath` | property | <code>rootPath: string</code> | Public root Path property. |
| `type` | property | <code>type: "sqlite" &#124; "local-vector" &#124; "file-artifact"</code> | Public type property. |

## `LocalHashEmbeddingProviderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dimensions` | property | <code>dimensions: number</code> | Public dimensions property. |

## `LocalStorageBackbone` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: FileArtifactStore</code> | Public artifacts property. |
| `embeddings` | property | <code>embeddings: EmbeddingProvider</code> | Public embeddings property. |
| `eventStore` | property | <code>eventStore: SQLiteEventStore</code> | Public event Store property. |
| `memory` | property | <code>memory: HybridMemoryProvider</code> | Public memory property. |
| `profiles` | property | <code>profiles: StorageProviderProfile[]</code> | Public profiles property. |
| `structured` | property | <code>structured: SQLiteStructuredStore</code> | Public structured property. |
| `vector` | property | <code>vector: LocalVectorIndexProvider</code> | Public vector property. |

## `LocalStorageBackboneOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRootPath` | property | <code>artifactRootPath: string</code> | Public artifact Root Path property. |
| `embeddings` | property | <code>embeddings: EmbeddingProvider</code> | Public embeddings property. |
| `eventDbFilename` | property | <code>eventDbFilename: string</code> | Public event Db Filename property. |
| `memoryTableName` | property | <code>memoryTableName: string</code> | Public memory Table Name property. |
| `rootPath` | property | <code>rootPath: string</code> | Public root Path property. |
| `sqliteMode` | property | <code>sqliteMode: "sqlite" &#124; "json" &#124; "auto" &#124; "node-sqlite"</code> | Public sqlite Mode property. |
| `structuredDbFilename` | property | <code>structuredDbFilename: string</code> | Public structured Db Filename property. |
| `vectorFilename` | property | <code>vectorFilename: string</code> | Public vector Filename property. |

## `LocalVectorIndexProviderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public filename property. |

## `SQLiteEventStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public filename property. |
| `jsonFallbackFilename` | property | <code>jsonFallbackFilename: string</code> | Public json Fallback Filename property. |
| `mode` | property | <code>mode: "sqlite" &#124; "json" &#124; "auto" &#124; "node-sqlite"</code> | Public mode property. |

## `SQLiteStructuredStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public filename property. |
| `jsonFallbackFilename` | property | <code>jsonFallbackFilename: string</code> | Public json Fallback Filename property. |
| `mode` | property | <code>mode: "sqlite" &#124; "json" &#124; "auto" &#124; "node-sqlite"</code> | Public mode property. |
