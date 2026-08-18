# `@codesoul-co/hypha-memory` / `index`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index.ts)
- 导出数: **40**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryManager` | 类 | <code>new MemoryManager(provider: MemoryProvider &#124; MemoryManagementProvider, options?: MemoryManagerOptions): MemoryManager</code> | Memory Manager 的运行时实现；公开构造函数与成员见下表。 |
| `memoryProviderProfileSchema` | 常量 | <code>const memoryProviderProfileSchema: z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["structured", "vector", "artifact", "hybrid"]&gt;; providerRef: z.ZodString; configSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;; }, "strip", z.ZodTypeAny, { id: string; type: "artifact" &#124; "structured" &#124; "vector" &#124; "hybrid"; providerRef: string; configSchema?: JsonSchema &#124; undefined; }, { id: string; type: "art...</code> | memory Provider Profile 的运行时 Schema。 |
| `memoryRetrievalPolicySchema` | 常量 | <code>const memoryRetrievalPolicySchema: z.ZodObject&lt;{ defaultTopK: z.ZodOptional&lt;z.ZodNumber&gt;; vectorWeight: z.ZodOptional&lt;z.ZodNumber&gt;; textWeight: z.ZodOptional&lt;z.ZodNumber&gt;; requireScope: z.ZodOptional&lt;z.ZodBoolean&gt;; allowedTypes: z.ZodOptional&lt;z.ZodArray&lt;z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "artifact", "governance"]&gt;, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { defaultTopK?: number &#124; undefined; vec...</code> | memory Retrieval Policy 的运行时 Schema。 |
| `memorySpecDefinition` | 常量 | <code>const memorySpecDefinition: SpecSchemaDefinition&lt;MemorySpec&gt;</code> | memory Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memorySpecDefinitions` | 常量 | <code>const memorySpecDefinitions: readonly [SpecSchemaDefinition&lt;MemorySpec&gt;]</code> | 由 `index` 模块导出的 memory Spec Definitions 常量。 |
| `memorySpecExample` | 常量 | <code>const memorySpecExample: MemorySpec</code> | memory Spec 的有效示例值。 |
| `memorySpecJsonSchema` | 常量 | <code>const memorySpecJsonSchema: JsonSchema</code> | memory Spec 的 JSON Schema。 |
| `memorySpecJsonSchemas` | 常量 | <code>const memorySpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 memory Spec Json Schemas 常量。 |
| `memorySpecSchema` | 常量 | <code>const memorySpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { providers: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["structured", "v...</code> | memory Spec 的运行时 Schema。 |
| `memoryTypeSchema` | 常量 | <code>const memoryTypeSchema: z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "artifact", "governance"]&gt;</code> | memory Type 的运行时 Schema。 |
| `validateMemorySpec` | 函数 | <code>validateMemorySpec(input: unknown): MemorySpec</code> | 校验 Memory Spec。 |
| `ArtifactMeta` | 接口 | <code>interface ArtifactMeta</code> | Artifact Meta 的字段契约；完整字段见下表。 |
| `ArtifactRef` | 接口 | <code>interface ArtifactRef</code> | Artifact Ref 的字段契约；完整字段见下表。 |
| `ArtifactStoreProvider` | 接口 | <code>interface ArtifactStoreProvider</code> | Artifact Store Provider 的字段契约；完整字段见下表。 |
| `EmbeddingProvider` | 接口 | <code>interface EmbeddingProvider</code> | Embedding Provider 的字段契约；完整字段见下表。 |
| `MemoryAuditOptions` | 接口 | <code>interface MemoryAuditOptions</code> | Memory Audit Options 的字段契约；完整字段见下表。 |
| `MemoryAuditReport` | 接口 | <code>interface MemoryAuditReport</code> | Memory Audit Report 的字段契约；完整字段见下表。 |
| `MemoryManagerOptions` | 接口 | <code>interface MemoryManagerOptions</code> | Memory Manager Options 的字段契约；完整字段见下表。 |
| `MemoryManagerRecoveryOptions` | 接口 | <code>interface MemoryManagerRecoveryOptions</code> | Memory Manager Recovery Options 的字段契约；完整字段见下表。 |
| `MemoryProvider` | 接口 | <code>interface MemoryProvider</code> | Memory Provider 的字段契约；完整字段见下表。 |
| `MemoryProviderProfile` | 接口 | <code>interface MemoryProviderProfile</code> | Memory Provider Profile 的字段契约；完整字段见下表。 |
| `MemoryReadQuery` | 接口 | <code>interface MemoryReadQuery</code> | Memory Read Query 的字段契约；完整字段见下表。 |
| `MemoryRecord` | 接口 | <code>interface MemoryRecord</code> | Memory Record 的字段契约；完整字段见下表。 |
| `MemoryRetrievalPolicy` | 接口 | <code>interface MemoryRetrievalPolicy</code> | Memory Retrieval Policy 的字段契约；完整字段见下表。 |
| `MemoryScope` | 接口 | <code>interface MemoryScope</code> | Memory Scope 的字段契约；完整字段见下表。 |
| `MemorySearchQuery` | 接口 | <code>interface MemorySearchQuery</code> | Memory Search Query 的字段契约；完整字段见下表。 |
| `MemorySearchResult` | 接口 | <code>interface MemorySearchResult</code> | Memory Search Result 的字段契约；完整字段见下表。 |
| `MemorySpec` | 接口 | <code>interface MemorySpec extends VersionedSpec, SpecMetadata</code> | Memory Spec 的字段契约；完整字段见下表。 |
| `MemorySummary` | 接口 | <code>interface MemorySummary</code> | Memory Summary 的字段契约；完整字段见下表。 |
| `MemorySummaryOptions` | 接口 | <code>interface MemorySummaryOptions</code> | Memory Summary Options 的字段契约；完整字段见下表。 |
| `MemoryTraceContext` | 接口 | <code>interface MemoryTraceContext</code> | Memory Trace Context 的字段契约；完整字段见下表。 |
| `MemoryWritePolicy` | 接口 | <code>interface MemoryWritePolicy</code> | Memory Write Policy 的字段契约；完整字段见下表。 |
| `MemoryWriteResult` | 接口 | <code>interface MemoryWriteResult</code> | Memory Write Result 的字段契约；完整字段见下表。 |
| `StructuredQuery` | 接口 | <code>interface StructuredQuery</code> | Structured Query 的字段契约；完整字段见下表。 |
| `StructuredStoreProvider` | 接口 | <code>interface StructuredStoreProvider</code> | Structured Store Provider 的字段契约；完整字段见下表。 |
| `VectorIndexProvider` | 接口 | <code>interface VectorIndexProvider</code> | Vector Index Provider 的字段契约；完整字段见下表。 |
| `VectorQuery` | 接口 | <code>interface VectorQuery</code> | Vector Query 的字段契约；完整字段见下表。 |
| `VectorRecord` | 接口 | <code>interface VectorRecord</code> | Vector Record 的字段契约；完整字段见下表。 |
| `VectorSearchResult` | 接口 | <code>interface VectorSearchResult</code> | Vector Search Result 的字段契约；完整字段见下表。 |
| `MemoryType` | 类型 | <code>type MemoryType = 'working' &#124; 'episodic' &#124; 'semantic' &#124; 'procedural' &#124; 'artifact' &#124; 'governance'</code> | Memory Type 的公共类型别名。 |

## `MemoryManager` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `audit` | 方法 | <code>audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise&lt;MemoryAuditReport&gt;</code> | audit 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(provider: MemoryProvider &#124; MemoryManagementProvider, options?: MemoryManagerOptions): MemoryManager</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `invalidate` | 方法 | <code>invalidate(scope: MemoryScope, recordId: string, reason: string): Promise&lt;void&gt;</code> | invalidate 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: MemoryListRequest): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `read` | 方法 | <code>read(scope: MemoryScope, query: MemoryReadQuery): Promise&lt;MemoryRecord[]&gt;</code> | read 的公开运行时操作。 |
| `search` | 方法 | <code>search(scope: MemoryScope, query: MemorySearchQuery): Promise&lt;MemorySearchResult[]&gt; &#124; search(request: ManagedMemorySearchRequest): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `summarize` | 方法 | <code>summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise&lt;MemorySummary&gt;</code> | summarize 的公开运行时操作。 |
| `update` | 方法 | <code>update(scope: MemoryScope, recordId: string, patch: Partial&lt;MemoryRecord&gt;): Promise&lt;void&gt; &#124; update(request: ManagedMemoryUpdateRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |
| `write` | 方法 | <code>write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise&lt;MemoryWriteResult&gt;</code> | write 的公开运行时操作。 |

## `ArtifactMeta` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentType` | 属性 | <code>contentType: string</code> | content Type 字段。 |
| `hash` | 属性 | <code>hash: string</code> | hash 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |

## `ArtifactRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `meta` | 属性 | <code>meta: ArtifactMeta</code> | meta 字段。 |
| `path` | 属性 | <code>path: string</code> | path 字段。 |

## `ArtifactStoreProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(ref: ArtifactRef): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(ref: ArtifactRef): Promise&lt;Buffer&gt;</code> | 读取 get。 |
| `put` | 方法 | <code>put(path: string, content: Buffer &#124; string, meta?: ArtifactMeta): Promise&lt;ArtifactRef&gt;</code> | put 的公开运行时操作。 |

## `EmbeddingProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `embed` | 方法 | <code>embed(input: string[]): Promise&lt;number[][]&gt;</code> | embed 的公开运行时操作。 |

## `MemoryAuditOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `since` | 属性 | <code>since: string</code> | since 字段。 |
| `until` | 属性 | <code>until: string</code> | until 字段。 |

## `MemoryAuditReport` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `missingProvenance` | 属性 | <code>missingProvenance: string[]</code> | missing Provenance 字段。 |
| `recordsChecked` | 属性 | <code>recordsChecked: number</code> | records Checked 字段。 |
| `scope` | 属性 | <code>scope: MemoryScope</code> | scope 字段。 |

## `MemoryManagerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `recovery` | 属性 | <code>recovery: MemoryManagerRecoveryOptions</code> | recovery 字段。 |
| `trace` | 属性 | <code>trace: TraceRecorder</code> | trace 字段。 |
| `traceContext` | 属性 | <code>traceContext: MemoryTraceContext</code> | trace Context 字段。 |

## `MemoryManagerRecoveryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `onFailure` | 方法 | <code>onFailure(failure: RecoveryFailure): void &#124; Promise&lt;void&gt;</code> | 处理 Failure。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `specRevision` | 属性 | <code>specRevision: string</code> | spec Revision 字段。 |

## `MemoryProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `audit` | 方法 | <code>audit(scope: MemoryScope, options?: MemoryAuditOptions): Promise&lt;MemoryAuditReport&gt;</code> | audit 的公开运行时操作。 |
| `invalidate` | 方法 | <code>invalidate(scope: MemoryScope, recordId: string, reason: string): Promise&lt;void&gt;</code> | invalidate 的公开运行时操作。 |
| `read` | 方法 | <code>read(scope: MemoryScope, query: MemoryReadQuery): Promise&lt;MemoryRecord[]&gt;</code> | read 的公开运行时操作。 |
| `search` | 方法 | <code>search(scope: MemoryScope, query: MemorySearchQuery): Promise&lt;MemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `summarize` | 方法 | <code>summarize(scope: MemoryScope, options?: MemorySummaryOptions): Promise&lt;MemorySummary&gt;</code> | summarize 的公开运行时操作。 |
| `update` | 方法 | <code>update(scope: MemoryScope, recordId: string, patch: Partial&lt;MemoryRecord&gt;): Promise&lt;void&gt;</code> | update 的公开运行时操作。 |
| `write` | 方法 | <code>write(scope: MemoryScope, record: MemoryRecord, policy: MemoryWritePolicy): Promise&lt;MemoryWriteResult&gt;</code> | write 的公开运行时操作。 |

## `MemoryProviderProfile` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `configSchema` | 属性 | <code>configSchema: JsonSchema</code> | config schema 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `providerRef` | 属性 | <code>providerRef: string</code> | provider Ref 字段。 |
| `type` | 属性 | <code>type: "artifact" &#124; "structured" &#124; "vector" &#124; "hybrid"</code> | type 字段。 |

## `MemoryReadQuery` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ids` | 属性 | <code>ids: string[]</code> | ids 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `type` | 属性 | <code>type: MemoryType</code> | type 字段。 |

## `MemoryRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `confidence` | 属性 | <code>confidence: number</code> | confidence 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `provenance` | 属性 | <code>provenance: Record&lt;string, unknown&gt;</code> | provenance 字段。 |
| `source` | 属性 | <code>source: string</code> | source 字段。 |
| `type` | 属性 | <code>type: MemoryType</code> | type 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `value` | 属性 | <code>value: TValue</code> | value 字段。 |
| `visibility` | 属性 | <code>visibility: "workspace" &#124; "private" &#124; "public"</code> | visibility 字段。 |

## `MemoryRetrievalPolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedTypes` | 属性 | <code>allowedTypes: MemoryType[]</code> | allowed Types 字段。 |
| `defaultTopK` | 属性 | <code>defaultTopK: number</code> | default Top K 字段。 |
| `requireScope` | 属性 | <code>requireScope: boolean</code> | require Scope 字段。 |
| `textWeight` | 属性 | <code>textWeight: number</code> | text Weight 字段。 |
| `vectorWeight` | 属性 | <code>vectorWeight: number</code> | vector Weight 字段。 |

## `MemoryScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `MemorySearchQuery` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `text` | 属性 | <code>text: string</code> | text 字段。 |
| `topK` | 属性 | <code>topK: number</code> | top K 字段。 |
| `type` | 属性 | <code>type: MemoryType</code> | type 字段。 |
| `vector` | 属性 | <code>vector: number[]</code> | vector 字段。 |

## `MemorySearchResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `provenance` | 属性 | <code>provenance: Record&lt;string, unknown&gt;</code> | provenance 字段。 |
| `record` | 属性 | <code>record: MemoryRecord&lt;unknown&gt;</code> | record 字段。 |
| `score` | 属性 | <code>score: number</code> | score 字段。 |

## `MemorySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactStoreRef` | 属性 | <code>artifactStoreRef: string</code> | artifact Store Ref 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `embeddingProviderRef` | 属性 | <code>embeddingProviderRef: string</code> | embedding Provider Ref 字段。 |
| `freshnessPolicy` | 属性 | <code>freshnessPolicy: string</code> | freshness Policy 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `memoryTypes` | 属性 | <code>memoryTypes: MemoryType[]</code> | memory Types 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `privacyPolicy` | 属性 | <code>privacyPolicy: string</code> | privacy Policy 字段。 |
| `provenancePolicy` | 属性 | <code>provenancePolicy: "required" &#124; "best_effort"</code> | provenance Policy 字段。 |
| `providers` | 属性 | <code>providers: MemoryProviderProfile[]</code> | providers 字段。 |
| `readPolicy` | 属性 | <code>readPolicy: string</code> | read Policy 字段。 |
| `retentionPolicy` | 属性 | <code>retentionPolicy: string</code> | retention Policy 字段。 |
| `retrievalPolicy` | 属性 | <code>retrievalPolicy: MemoryRetrievalPolicy</code> | retrieval Policy 字段。 |
| `retrievalStrategy` | 属性 | <code>retrievalStrategy: string</code> | retrieval Strategy 字段。 |
| `structuredStoreRef` | 属性 | <code>structuredStoreRef: string</code> | structured Store Ref 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `vectorIndexRef` | 属性 | <code>vectorIndexRef: string</code> | vector Index Ref 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
| `writePolicy` | 属性 | <code>writePolicy: string</code> | write Policy 字段。 |
| `writePolicyConfig` | 属性 | <code>writePolicyConfig: MemoryWritePolicy</code> | write Policy Config 字段。 |

## `MemorySummary` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `recordCount` | 属性 | <code>recordCount: number</code> | record Count 字段。 |
| `scope` | 属性 | <code>scope: MemoryScope</code> | scope 字段。 |
| `types` | 属性 | <code>types: Partial&lt;Record&lt;MemoryType, number&gt;&gt;</code> | types 字段。 |

## `MemorySummaryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `type` | 属性 | <code>type: MemoryType</code> | type 字段。 |

## `MemoryTraceContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `MemoryWritePolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowLongTerm` | 属性 | <code>allowLongTerm: boolean</code> | allow Long Term 字段。 |
| `decision` | 属性 | <code>decision: PolicyDecision</code> | decision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `requireProvenance` | 属性 | <code>requireProvenance: boolean</code> | require Provenance 字段。 |

## `MemoryWriteResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: ArtifactRef</code> | artifact Ref 字段。 |
| `recordId` | 属性 | <code>recordId: string</code> | record Id 字段。 |
| `vectorIndexed` | 属性 | <code>vectorIndexed: boolean</code> | vector Indexed 字段。 |

## `StructuredQuery` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `orderBy` | 属性 | <code>orderBy: string</code> | order By 字段。 |
| `where` | 属性 | <code>where: Record&lt;string, unknown&gt;</code> | where 字段。 |

## `StructuredStoreProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compareAndSet` | 方法 | <code>compareAndSet&lt;T&gt;(table: string, id: string, expected: Partial&lt;T&gt;, patch: Partial&lt;T&gt;): Promise&lt;boolean&gt;</code> | compare And Set 的公开运行时操作。 |
| `delete` | 方法 | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | 读取 get。 |
| `insert` | 方法 | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | insert 的公开运行时操作。 |
| `query` | 方法 | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | query 的公开运行时操作。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | transaction 的公开运行时操作。 |
| `update` | 方法 | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | update 的公开运行时操作。 |

## `VectorIndexProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(ids: string[]): Promise&lt;void&gt;</code> | 删除 delete。 |
| `search` | 方法 | <code>search(query: VectorQuery): Promise&lt;VectorSearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `upsert` | 方法 | <code>upsert(records: VectorRecord[]): Promise&lt;void&gt;</code> | upsert 的公开运行时操作。 |

## `VectorQuery` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filter` | 属性 | <code>filter: Record&lt;string, unknown&gt;</code> | filter 字段。 |
| `topK` | 属性 | <code>topK: number</code> | top K 字段。 |
| `vector` | 属性 | <code>vector: number[]</code> | vector 字段。 |

## `VectorRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `vector` | 属性 | <code>vector: number[]</code> | vector 字段。 |

## `VectorSearchResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `score` | 属性 | <code>score: number</code> | score 字段。 |
