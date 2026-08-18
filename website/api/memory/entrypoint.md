# `@codesoul-co/hypha-memory` / `index`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)
- Exports: **40**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryManager` | class | <code>new MemoryManager(provider: MemoryProvider &#124; MemoryManagementProvider, options?: MemoryManagerOptions): MemoryManager</code> | Runtime implementation for Memory Manager; see its public constructor and members below. |
| `memoryProviderProfileSchema` | constant | <code>const memoryProviderProfileSchema: z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["structured", "vector", "artifact", "hybrid"]&gt;; providerRef: z.ZodString; configSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;; }, "strip", z.ZodTypeAny, { id: string; type: "artifact" &#124; "structured" &#124; "vector" &#124; "hybrid"; providerRef: string; configSchema?: JsonSchema &#124; undefined; }, { id: string; type: "art...</code> | Runtime schema for memory Provider Profile. |
| `memoryRetrievalPolicySchema` | constant | <code>const memoryRetrievalPolicySchema: z.ZodObject&lt;{ defaultTopK: z.ZodOptional&lt;z.ZodNumber&gt;; vectorWeight: z.ZodOptional&lt;z.ZodNumber&gt;; textWeight: z.ZodOptional&lt;z.ZodNumber&gt;; requireScope: z.ZodOptional&lt;z.ZodBoolean&gt;; allowedTypes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "artifact", "governance"]&gt;, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { defaultTopK?: number &#124; undefined; vec...</code> | Runtime schema for memory Retrieval Policy. |
| `memorySpecDefinition` | constant | <code>const memorySpecDefinition: SpecSchemaDefinition&lt;MemorySpec&gt;</code> | Runtime validation entrypoint for the memory spec, combining its parser, example and JSON Schema. |
| `memorySpecDefinitions` | constant | <code>const memorySpecDefinitions: readonly [SpecSchemaDefinition&lt;MemorySpec&gt;]</code> | memory Spec Definitions constant exported by the `index` module. |
| `memorySpecExample` | constant | <code>const memorySpecExample: MemorySpec</code> | Valid example value for memory Spec. |
| `memorySpecJsonSchema` | constant | <code>const memorySpecJsonSchema: JsonSchema</code> | JSON Schema for memory Spec. |
| `memorySpecJsonSchemas` | constant | <code>const memorySpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | memory Spec Json Schemas constant exported by the `index` module. |
| `memorySpecSchema` | constant | <code>const memorySpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { providers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["structured", "v...</code> | Runtime schema for memory Spec. |
| `memoryTypeSchema` | constant | <code>const memoryTypeSchema: z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "artifact", "governance"]&gt;</code> | Runtime schema for memory Type. |
| `validateMemorySpec` | function | <code>validateMemorySpec(input: unknown): MemorySpec</code> | Validates Memory Spec at this module boundary. |
| `ArtifactMeta` | interface | <code>interface ArtifactMeta</code> | Field contract for Artifact Meta; see all contract members below. |
| `ArtifactRef` | interface | <code>interface ArtifactRef</code> | Field contract for Artifact Ref; see all contract members below. |
| `ArtifactStoreProvider` | interface | <code>interface ArtifactStoreProvider</code> | Field contract for Artifact Store Provider; see all contract members below. |
| `EmbeddingProvider` | interface | <code>interface EmbeddingProvider</code> | Field contract for Embedding Provider; see all contract members below. |
| `MemoryAuditOptions` | interface | <code>interface MemoryAuditOptions</code> | Field contract for Memory Audit Options; see all contract members below. |
| `MemoryAuditReport` | interface | <code>interface MemoryAuditReport</code> | Field contract for Memory Audit Report; see all contract members below. |
| `MemoryManagerOptions` | interface | <code>interface MemoryManagerOptions</code> | Field contract for Memory Manager Options; see all contract members below. |
| `MemoryManagerRecoveryOptions` | interface | <code>interface MemoryManagerRecoveryOptions</code> | Field contract for Memory Manager Recovery Options; see all contract members below. |
| `MemoryProvider` | interface | <code>interface MemoryProvider</code> | Field contract for Memory Provider; see all contract members below. |
| `MemoryProviderProfile` | interface | <code>interface MemoryProviderProfile</code> | Field contract for Memory Provider Profile; see all contract members below. |
| `MemoryReadQuery` | interface | <code>interface MemoryReadQuery</code> | Field contract for Memory Read Query; see all contract members below. |
| `MemoryRecord` | interface | <code>interface MemoryRecord</code> | Field contract for Memory Record; see all contract members below. |
| `MemoryRetrievalPolicy` | interface | <code>interface MemoryRetrievalPolicy</code> | Field contract for Memory Retrieval Policy; see all contract members below. |
| `MemoryScope` | interface | <code>interface MemoryScope</code> | Field contract for Memory Scope; see all contract members below. |
| `MemorySearchQuery` | interface | <code>interface MemorySearchQuery</code> | Field contract for Memory Search Query; see all contract members below. |
| `MemorySearchResult` | interface | <code>interface MemorySearchResult</code> | Field contract for Memory Search Result; see all contract members below. |
| `MemorySpec` | interface | <code>interface MemorySpec extends VersionedSpec, SpecMetadata</code> | Field contract for Memory Spec; see all contract members below. |
| `MemorySummary` | interface | <code>interface MemorySummary</code> | Field contract for Memory Summary; see all contract members below. |
| `MemorySummaryOptions` | interface | <code>interface MemorySummaryOptions</code> | Field contract for Memory Summary Options; see all contract members below. |
| `MemoryTraceContext` | interface | <code>interface MemoryTraceContext</code> | Field contract for Memory Trace Context; see all contract members below. |
| `MemoryWritePolicy` | interface | <code>interface MemoryWritePolicy</code> | Field contract for Memory Write Policy; see all contract members below. |
| `MemoryWriteResult` | interface | <code>interface MemoryWriteResult</code> | Field contract for Memory Write Result; see all contract members below. |
| `StructuredQuery` | interface | <code>interface StructuredQuery</code> | Field contract for Structured Query; see all contract members below. |
| `StructuredStoreProvider` | interface | <code>interface StructuredStoreProvider</code> | Field contract for Structured Store Provider; see all contract members below. |
| `VectorIndexProvider` | interface | <code>interface VectorIndexProvider</code> | Field contract for Vector Index Provider; see all contract members below. |
| `VectorQuery` | interface | <code>interface VectorQuery</code> | Field contract for Vector Query; see all contract members below. |
| `VectorRecord` | interface | <code>interface VectorRecord</code> | Field contract for Vector Record; see all contract members below. |
| `VectorSearchResult` | interface | <code>interface VectorSearchResult</code> | Field contract for Vector Search Result; see all contract members below. |
| `MemoryType` | type | <code>type MemoryType = 'working' &#124; 'episodic' &#124; 'semantic' &#124; 'procedural' &#124; 'artifact' &#124; 'governance'</code> | Public type alias for Memory Type. |

## `MemoryManager` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `audit` | method | <code>audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise&lt;MemoryAuditReport&gt;</code> | Public runtime operation for audit. |
| `capabilities` | method | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(provider: MemoryProvider &#124; MemoryManagementProvider, options?: MemoryManagerOptions): MemoryManager</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `invalidate` | method | <code>invalidate(scope: MemoryScope, recordId: string, reason: string): Promise&lt;void&gt;</code> | Public runtime operation for invalidate. |
| `list` | method | <code>list(request: MemoryListRequest): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `read` | method | <code>read(scope: MemoryScope, query: MemoryReadQuery): Promise&lt;MemoryRecord[]&gt;</code> | Public runtime operation for read. |
| `search` | method | <code>search(scope: MemoryScope, query: MemorySearchQuery): Promise&lt;MemorySearchResult[]&gt; &#124; search(request: ManagedMemorySearchRequest): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `summarize` | method | <code>summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise&lt;MemorySummary&gt;</code> | Public runtime operation for summarize. |
| `update` | method | <code>update(scope: MemoryScope, recordId: string, patch: Partial&lt;MemoryRecord&gt;): Promise&lt;void&gt; &#124; update(request: ManagedMemoryUpdateRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |
| `write` | method | <code>write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise&lt;MemoryWriteResult&gt;</code> | Public runtime operation for write. |

## `ArtifactMeta` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentType` | property | <code>contentType: string</code> | Public content Type property. |
| `hash` | property | <code>hash: string</code> | Public hash property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |

## `ArtifactRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `meta` | property | <code>meta: ArtifactMeta</code> | Public meta property. |
| `path` | property | <code>path: string</code> | Public path property. |

## `ArtifactStoreProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(ref: ArtifactRef): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(ref: ArtifactRef): Promise&lt;Buffer&gt;</code> | Gets get at this module boundary. |
| `put` | method | <code>put(path: string, content: Buffer &#124; string, meta?: ArtifactMeta): Promise&lt;ArtifactRef&gt;</code> | Public runtime operation for put. |

## `EmbeddingProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `embed` | method | <code>embed(input: string[]): Promise&lt;number[][]&gt;</code> | Public runtime operation for embed. |

## `MemoryAuditOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `since` | property | <code>since: string</code> | Public since property. |
| `until` | property | <code>until: string</code> | Public until property. |

## `MemoryAuditReport` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `missingProvenance` | property | <code>missingProvenance: string[]</code> | Public missing Provenance property. |
| `recordsChecked` | property | <code>recordsChecked: number</code> | Public records Checked property. |
| `scope` | property | <code>scope: MemoryScope</code> | Public scope property. |

## `MemoryManagerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `recovery` | property | <code>recovery: MemoryManagerRecoveryOptions</code> | Public recovery property. |
| `trace` | property | <code>trace: TraceRecorder</code> | Public trace property. |
| `traceContext` | property | <code>traceContext: MemoryTraceContext</code> | Public trace Context property. |

## `MemoryManagerRecoveryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `onFailure` | method | <code>onFailure(failure: RecoveryFailure): void &#124; Promise&lt;void&gt;</code> | Handles Failure at this module boundary. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `specRevision` | property | <code>specRevision: string</code> | Public spec Revision property. |

## `MemoryProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `audit` | method | <code>audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise&lt;MemoryAuditReport&gt;</code> | Public runtime operation for audit. |
| `invalidate` | method | <code>invalidate(scope: MemoryScope, recordId: string, reason: string): Promise&lt;void&gt;</code> | Public runtime operation for invalidate. |
| `read` | method | <code>read(scope: MemoryScope, query: MemoryReadQuery): Promise&lt;MemoryRecord[]&gt;</code> | Public runtime operation for read. |
| `search` | method | <code>search(scope: MemoryScope, query: MemorySearchQuery): Promise&lt;MemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `summarize` | method | <code>summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise&lt;MemorySummary&gt;</code> | Public runtime operation for summarize. |
| `update` | method | <code>update(scope: MemoryScope, recordId: string, patch: Partial&lt;MemoryRecord&gt;): Promise&lt;void&gt;</code> | Public runtime operation for update. |
| `write` | method | <code>write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise&lt;MemoryWriteResult&gt;</code> | Public runtime operation for write. |

## `MemoryProviderProfile` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `configSchema` | property | <code>configSchema: JsonSchema</code> | Public config schema property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `providerRef` | property | <code>providerRef: string</code> | Public provider Ref property. |
| `type` | property | <code>type: "artifact" &#124; "structured" &#124; "vector" &#124; "hybrid"</code> | Public type property. |

## `MemoryReadQuery` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ids` | property | <code>ids: string[]</code> | Public ids property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `type` | property | <code>type: MemoryType</code> | Public type property. |

## `MemoryRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `confidence` | property | <code>confidence: number</code> | Public confidence property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `provenance` | property | <code>provenance: Record&lt;string, unknown&gt;</code> | Public provenance property. |
| `source` | property | <code>source: string</code> | Public source property. |
| `type` | property | <code>type: MemoryType</code> | Public type property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `value` | property | <code>value: TValue</code> | Public value property. |
| `visibility` | property | <code>visibility: "workspace" &#124; "private" &#124; "public"</code> | Public visibility property. |

## `MemoryRetrievalPolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedTypes` | property | <code>allowedTypes: MemoryType[]</code> | Public allowed Types property. |
| `defaultTopK` | property | <code>defaultTopK: number</code> | Public default Top K property. |
| `requireScope` | property | <code>requireScope: boolean</code> | Public require Scope property. |
| `textWeight` | property | <code>textWeight: number</code> | Public text Weight property. |
| `vectorWeight` | property | <code>vectorWeight: number</code> | Public vector Weight property. |

## `MemoryScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `MemorySearchQuery` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `text` | property | <code>text: string</code> | Public text property. |
| `topK` | property | <code>topK: number</code> | Public top K property. |
| `type` | property | <code>type: MemoryType</code> | Public type property. |
| `vector` | property | <code>vector: number[]</code> | Public vector property. |

## `MemorySearchResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `provenance` | property | <code>provenance: Record&lt;string, unknown&gt;</code> | Public provenance property. |
| `record` | property | <code>record: MemoryRecord&lt;unknown&gt;</code> | Public record property. |
| `score` | property | <code>score: number</code> | Public score property. |

## `MemorySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactStoreRef` | property | <code>artifactStoreRef: string</code> | Public artifact Store Ref property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `embeddingProviderRef` | property | <code>embeddingProviderRef: string</code> | Public embedding Provider Ref property. |
| `freshnessPolicy` | property | <code>freshnessPolicy: string</code> | Public freshness Policy property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `memoryTypes` | property | <code>memoryTypes: MemoryType[]</code> | Public memory Types property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `privacyPolicy` | property | <code>privacyPolicy: string</code> | Public privacy Policy property. |
| `provenancePolicy` | property | <code>provenancePolicy: "required" &#124; "best_effort"</code> | Public provenance Policy property. |
| `providers` | property | <code>providers: MemoryProviderProfile[]</code> | Public providers property. |
| `readPolicy` | property | <code>readPolicy: string</code> | Public read Policy property. |
| `retentionPolicy` | property | <code>retentionPolicy: string</code> | Public retention Policy property. |
| `retrievalPolicy` | property | <code>retrievalPolicy: MemoryRetrievalPolicy</code> | Public retrieval Policy property. |
| `retrievalStrategy` | property | <code>retrievalStrategy: string</code> | Public retrieval Strategy property. |
| `structuredStoreRef` | property | <code>structuredStoreRef: string</code> | Public structured Store Ref property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `vectorIndexRef` | property | <code>vectorIndexRef: string</code> | Public vector Index Ref property. |
| `version` | property | <code>version: string</code> | Public version property. |
| `writePolicy` | property | <code>writePolicy: string</code> | Public write Policy property. |
| `writePolicyConfig` | property | <code>writePolicyConfig: MemoryWritePolicy</code> | Public write Policy Config property. |

## `MemorySummary` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `recordCount` | property | <code>recordCount: number</code> | Public record Count property. |
| `scope` | property | <code>scope: MemoryScope</code> | Public scope property. |
| `types` | property | <code>types: Partial&lt;Record&lt;MemoryType, number&gt;&gt;</code> | Public types property. |

## `MemorySummaryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `type` | property | <code>type: MemoryType</code> | Public type property. |

## `MemoryTraceContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `MemoryWritePolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowLongTerm` | property | <code>allowLongTerm: boolean</code> | Public allow Long Term property. |
| `decision` | property | <code>decision: PolicyDecision</code> | Public decision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `requireProvenance` | property | <code>requireProvenance: boolean</code> | Public require Provenance property. |

## `MemoryWriteResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: ArtifactRef</code> | Public artifact Ref property. |
| `recordId` | property | <code>recordId: string</code> | Public record Id property. |
| `vectorIndexed` | property | <code>vectorIndexed: boolean</code> | Public vector Indexed property. |

## `StructuredQuery` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `orderBy` | property | <code>orderBy: string</code> | Public order By property. |
| `where` | property | <code>where: Record&lt;string, unknown&gt;</code> | Public where property. |

## `StructuredStoreProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compareAndSet` | method | <code>compareAndSet&lt;T&gt;(table: string, id: string, expected: Partial&lt;T&gt;, patch: Partial&lt;T&gt;): Promise&lt;boolean&gt;</code> | Public runtime operation for compare And Set. |
| `delete` | method | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | Gets get at this module boundary. |
| `insert` | method | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | Public runtime operation for insert. |
| `query` | method | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | Public runtime operation for query. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for transaction. |
| `update` | method | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | Public runtime operation for update. |

## `VectorIndexProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(ids: string[]): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `search` | method | <code>search(query: VectorQuery): Promise&lt;VectorSearchResult[]&gt;</code> | Public runtime operation for search. |
| `upsert` | method | <code>upsert(records: VectorRecord[]): Promise&lt;void&gt;</code> | Public runtime operation for upsert. |

## `VectorQuery` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filter` | property | <code>filter: Record&lt;string, unknown&gt;</code> | Public filter property. |
| `topK` | property | <code>topK: number</code> | Public top K property. |
| `vector` | property | <code>vector: number[]</code> | Public vector property. |

## `VectorRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `vector` | property | <code>vector: number[]</code> | Public vector property. |

## `VectorSearchResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `score` | property | <code>score: number</code> | Public score property. |
