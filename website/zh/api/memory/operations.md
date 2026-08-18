# `@codesoul-co/hypha-memory` / `operations`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/operations.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)
- 导出数: **20**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ManagedMemoryDeleteRequest` | 接口 | <code>interface ManagedMemoryDeleteRequest</code> | Managed Memory Delete Request 的字段契约；完整字段见下表。 |
| `ManagedMemoryDeleteResult` | 接口 | <code>interface ManagedMemoryDeleteResult</code> | Managed Memory Delete Result 的字段契约；完整字段见下表。 |
| `ManagedMemorySearchRequest` | 接口 | <code>interface ManagedMemorySearchRequest</code> | Managed Memory Search Request 的字段契约；完整字段见下表。 |
| `ManagedMemorySearchResult` | 接口 | <code>interface ManagedMemorySearchResult</code> | Managed Memory Search Result 的字段契约；完整字段见下表。 |
| `ManagedMemoryUpdateRequest` | 接口 | <code>interface ManagedMemoryUpdateRequest</code> | Managed Memory Update Request 的字段契约；完整字段见下表。 |
| `ManagedMemoryWriteResult` | 接口 | <code>interface ManagedMemoryWriteResult</code> | Managed Memory Write Result 的字段契约；完整字段见下表。 |
| `MemoryAddRequest` | 接口 | <code>interface MemoryAddRequest</code> | Memory Add Request 的字段契约；完整字段见下表。 |
| `MemoryGetRequest` | 接口 | <code>interface MemoryGetRequest</code> | Memory Get Request 的字段契约；完整字段见下表。 |
| `MemoryHistoryRequest` | 接口 | <code>interface MemoryHistoryRequest</code> | Memory History Request 的字段契约；完整字段见下表。 |
| `MemoryIndexJobRef` | 接口 | <code>interface MemoryIndexJobRef</code> | Memory Index Job Ref 的字段契约；完整字段见下表。 |
| `MemoryListRequest` | 接口 | <code>interface MemoryListRequest</code> | Memory List Request 的字段契约；完整字段见下表。 |
| `MemoryListResult` | 接口 | <code>interface MemoryListResult extends PaginationResult</code> | Memory List Result 的字段契约；完整字段见下表。 |
| `MemoryManagementProvider` | 接口 | <code>interface MemoryManagementProvider</code> | Memory Management Provider 的字段契约；完整字段见下表。 |
| `MemoryPatch` | 接口 | <code>interface MemoryPatch</code> | Memory Patch 的字段契约；完整字段见下表。 |
| `MemoryRejectedItem` | 接口 | <code>interface MemoryRejectedItem</code> | Memory Rejected Item 的字段契约；完整字段见下表。 |
| `MemorySearchFilter` | 接口 | <code>interface MemorySearchFilter</code> | Memory Search Filter 的字段契约；完整字段见下表。 |
| `MemoryVersion` | 接口 | <code>interface MemoryVersion</code> | Memory Version 的字段契约；完整字段见下表。 |
| `PaginationRequest` | 接口 | <code>interface PaginationRequest</code> | Pagination Request 的字段契约；完整字段见下表。 |
| `PaginationResult` | 接口 | <code>interface PaginationResult</code> | Pagination Result 的字段契约；完整字段见下表。 |
| `ProviderHealth` | 接口 | <code>interface ProviderHealth</code> | Provider Health 的字段契约；完整字段见下表。 |

## `ManagedMemoryDeleteRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filter` | 属性 | <code>filter: MemorySearchFilter</code> | filter 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `memoryIds` | 属性 | <code>memoryIds: string[]</code> | memory Ids 字段。 |
| `mode` | 属性 | <code>mode: "soft" &#124; "hard" &#124; "compliance"</code> | mode 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |

## `ManagedMemoryDeleteResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deletedMemoryIds` | 属性 | <code>deletedMemoryIds: string[]</code> | deleted Memory Ids 字段。 |
| `events` | 属性 | <code>events: string[]</code> | events 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `pendingProviderIds` | 属性 | <code>pendingProviderIds: string[]</code> | pending Provider Ids 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "rejected" &#124; "failed" &#124; "partial"</code> | status 字段。 |
| `warnings` | 属性 | <code>warnings: string[]</code> | warnings 字段。 |

## `ManagedMemorySearchRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filters` | 属性 | <code>filters: MemorySearchFilter</code> | filters 字段。 |
| `includeContent` | 属性 | <code>includeContent: boolean</code> | include Content 字段。 |
| `includeDormant` | 属性 | <code>includeDormant: boolean</code> | include Dormant 字段。 |
| `includeProvenance` | 属性 | <code>includeProvenance: boolean</code> | include Provenance 字段。 |
| `includeRelations` | 属性 | <code>includeRelations: boolean</code> | include Relations 字段。 |
| `includeSuperseded` | 属性 | <code>includeSuperseded: boolean</code> | include Superseded 字段。 |
| `memoryTypes` | 属性 | <code>memoryTypes: ManagedMemoryType[]</code> | memory Types 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `mode` | 属性 | <code>mode: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword" &#124; "graph"</code> | mode 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `pagination` | 属性 | <code>pagination: PaginationRequest</code> | pagination 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `query` | 属性 | <code>query: string</code> | query 字段。 |
| `queryEmbedding` | 属性 | <code>queryEmbedding: number[]</code> | query Embedding 字段。 |
| `rerank` | 属性 | <code>rerank: boolean</code> | rerank 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `scoreThreshold` | 属性 | <code>scoreThreshold: number</code> | score Threshold 字段。 |
| `topK` | 属性 | <code>topK: number</code> | top K 字段。 |
| `updateAccessStats` | 属性 | <code>updateAccessStats: boolean</code> | update Access Stats 字段。 |

## `ManagedMemorySearchResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `graphScore` | 属性 | <code>graphScore: number</code> | graph Score 字段。 |
| `keywordScore` | 属性 | <code>keywordScore: number</code> | keyword Score 字段。 |
| `reasons` | 属性 | <code>reasons: string[]</code> | reasons 字段。 |
| `record` | 属性 | <code>record: ManagedMemoryRecord&lt;unknown&gt;</code> | record 字段。 |
| `rerankScore` | 属性 | <code>rerankScore: number</code> | rerank Score 字段。 |
| `score` | 属性 | <code>score: number</code> | score 字段。 |
| `semanticScore` | 属性 | <code>semanticScore: number</code> | semantic Score 字段。 |

## `ManagedMemoryUpdateRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | expected Revision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | memory Id 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `patch` | 属性 | <code>patch: MemoryPatch</code> | patch 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |

## `ManagedMemoryWriteResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: string[]</code> | events 字段。 |
| `indexJobs` | 属性 | <code>indexJobs: MemoryIndexJobRef[]</code> | index Jobs 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `records` | 属性 | <code>records: ManagedMemoryRecord&lt;unknown&gt;[]</code> | records 字段。 |
| `rejectedItems` | 属性 | <code>rejectedItems: MemoryRejectedItem[]</code> | rejected Items 字段。 |
| `status` | 属性 | <code>status: "rejected" &#124; "queued" &#124; "failed" &#124; "committed" &#124; "reused" &#124; "partial"</code> | status 字段。 |
| `warnings` | 属性 | <code>warnings: string[]</code> | warnings 字段。 |

## `MemoryAddRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `extractionMode` | 属性 | <code>extractionMode: "none" &#124; "provider" &#124; "custom" &#124; "native"</code> | extraction Mode 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `input` | 属性 | <code>input: unknown</code> | input 字段。 |
| `inputType` | 属性 | <code>inputType: "structured" &#124; "text" &#124; "message" &#124; "artifact_ref" &#124; "event_ref"</code> | input Type 字段。 |
| `memoryType` | 属性 | <code>memoryType: ManagedMemoryType</code> | memory Type 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `source` | 属性 | <code>source: MemorySource</code> | source 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `writeMode` | 属性 | <code>writeMode: "sync" &#124; "async"</code> | write Mode 字段。 |

## `MemoryGetRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `includeHistory` | 属性 | <code>includeHistory: boolean</code> | include History 字段。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | memory Id 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |

## `MemoryHistoryRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryId` | 属性 | <code>memoryId: string</code> | memory Id 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `pagination` | 属性 | <code>pagination: PaginationRequest</code> | pagination 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |

## `MemoryIndexJobRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `state` | 属性 | <code>state: "completed" &#124; "failed" &#124; "processing" &#124; "pending" &#124; "partial"</code> | state 字段。 |

## `MemoryListRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filter` | 属性 | <code>filter: MemorySearchFilter</code> | filter 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `pagination` | 属性 | <code>pagination: PaginationRequest</code> | pagination 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |

## `MemoryListResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `hasMore` | 属性 | <code>hasMore: boolean</code> | has More 字段。 |
| `nextCursor` | 属性 | <code>nextCursor: string</code> | next Cursor 字段。 |
| `records` | 属性 | <code>records: ManagedMemoryRecord&lt;unknown&gt;[]</code> | records 字段。 |

## `MemoryManagementProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;import("./contracts").MemoryManagementCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `MemoryPatch` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalText` | 属性 | <code>canonicalText: string</code> | canonical Text 字段。 |
| `confidence` | 属性 | <code>confidence: number</code> | confidence 字段。 |
| `content` | 属性 | <code>content: unknown</code> | content 字段。 |
| `importance` | 属性 | <code>importance: number</code> | importance 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `status` | 属性 | <code>status: "failed" &#124; "invalidated" &#124; "deletion_pending" &#124; "active" &#124; "pending" &#124; "superseded" &#124; "dormant"</code> | status 字段。 |
| `summary` | 属性 | <code>summary: string</code> | summary 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |

## `MemoryRejectedItem` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error: NormalizedMemoryError</code> | error 字段。 |
| `itemId` | 属性 | <code>itemId: string</code> | item Id 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |

## `MemorySearchFilter` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalKeys` | 属性 | <code>canonicalKeys: string[]</code> | canonical Keys 字段。 |
| `confidenceGte` | 属性 | <code>confidenceGte: number</code> | confidence Gte 字段。 |
| `conflictFreeOnly` | 属性 | <code>conflictFreeOnly: boolean</code> | conflict Free Only 字段。 |
| `createdAfter` | 属性 | <code>createdAfter: string</code> | created After 字段。 |
| `createdBefore` | 属性 | <code>createdBefore: string</code> | created Before 字段。 |
| `entityIds` | 属性 | <code>entityIds: string[]</code> | entity Ids 字段。 |
| `excludeIds` | 属性 | <code>excludeIds: string[]</code> | exclude Ids 字段。 |
| `expiresAfter` | 属性 | <code>expiresAfter: string</code> | expires After 字段。 |
| `ids` | 属性 | <code>ids: string[]</code> | ids 字段。 |
| `importanceGte` | 属性 | <code>importanceGte: number</code> | importance Gte 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `sourceTypes` | 属性 | <code>sourceTypes: ("human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import")[]</code> | source Types 字段。 |
| `statuses` | 属性 | <code>statuses: MemoryStatus[]</code> | statuses 字段。 |
| `tagsAll` | 属性 | <code>tagsAll: string[]</code> | tags All 字段。 |
| `tagsAny` | 属性 | <code>tagsAny: string[]</code> | tags Any 字段。 |
| `updatedAfter` | 属性 | <code>updatedAfter: string</code> | updated After 字段。 |
| `verifiedOnly` | 属性 | <code>verifiedOnly: boolean</code> | verified Only 字段。 |
| `visibility` | 属性 | <code>visibility: ("workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant")[]</code> | visibility 字段。 |

## `MemoryVersion` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryId` | 属性 | <code>memoryId: string</code> | memory Id 字段。 |
| `record` | 属性 | <code>record: ManagedMemoryRecord&lt;unknown&gt;</code> | record 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |

## `PaginationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cursor` | 属性 | <code>cursor: string</code> | cursor 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `maxBytes` | 属性 | <code>maxBytes: number</code> | max Bytes 字段。 |
| `maxCalls` | 属性 | <code>maxCalls: number</code> | max Calls 字段。 |
| `maxDurationMs` | 属性 | <code>maxDurationMs: number</code> | max Duration Ms 字段。 |
| `maxItems` | 属性 | <code>maxItems: number</code> | max Items 字段。 |
| `maxPages` | 属性 | <code>maxPages: number</code> | max Pages 字段。 |

## `PaginationResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `hasMore` | 属性 | <code>hasMore: boolean</code> | has More 字段。 |
| `nextCursor` | 属性 | <code>nextCursor: string</code> | next Cursor 字段。 |

## `ProviderHealth` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `details` | 属性 | <code>details: Record&lt;string, unknown&gt;</code> | details 字段。 |
| `latencyMs` | 属性 | <code>latencyMs: number</code> | latency Ms 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `status` | 属性 | <code>status: "healthy" &#124; "degraded" &#124; "unhealthy" &#124; "unknown"</code> | status 字段。 |
