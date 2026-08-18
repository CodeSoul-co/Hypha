# `@codesoul-co/hypha-memory` / `operations`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/operations.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)
- Exports: **20**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ManagedMemoryDeleteRequest` | interface | <code>interface ManagedMemoryDeleteRequest</code> | Field contract for Managed Memory Delete Request; see all contract members below. |
| `ManagedMemoryDeleteResult` | interface | <code>interface ManagedMemoryDeleteResult</code> | Field contract for Managed Memory Delete Result; see all contract members below. |
| `ManagedMemorySearchRequest` | interface | <code>interface ManagedMemorySearchRequest</code> | Field contract for Managed Memory Search Request; see all contract members below. |
| `ManagedMemorySearchResult` | interface | <code>interface ManagedMemorySearchResult</code> | Field contract for Managed Memory Search Result; see all contract members below. |
| `ManagedMemoryUpdateRequest` | interface | <code>interface ManagedMemoryUpdateRequest</code> | Field contract for Managed Memory Update Request; see all contract members below. |
| `ManagedMemoryWriteResult` | interface | <code>interface ManagedMemoryWriteResult</code> | Field contract for Managed Memory Write Result; see all contract members below. |
| `MemoryAddRequest` | interface | <code>interface MemoryAddRequest</code> | Field contract for Memory Add Request; see all contract members below. |
| `MemoryGetRequest` | interface | <code>interface MemoryGetRequest</code> | Field contract for Memory Get Request; see all contract members below. |
| `MemoryHistoryRequest` | interface | <code>interface MemoryHistoryRequest</code> | Field contract for Memory History Request; see all contract members below. |
| `MemoryIndexJobRef` | interface | <code>interface MemoryIndexJobRef</code> | Field contract for Memory Index Job Ref; see all contract members below. |
| `MemoryListRequest` | interface | <code>interface MemoryListRequest</code> | Field contract for Memory List Request; see all contract members below. |
| `MemoryListResult` | interface | <code>interface MemoryListResult extends PaginationResult</code> | Field contract for Memory List Result; see all contract members below. |
| `MemoryManagementProvider` | interface | <code>interface MemoryManagementProvider</code> | Field contract for Memory Management Provider; see all contract members below. |
| `MemoryPatch` | interface | <code>interface MemoryPatch</code> | Field contract for Memory Patch; see all contract members below. |
| `MemoryRejectedItem` | interface | <code>interface MemoryRejectedItem</code> | Field contract for Memory Rejected Item; see all contract members below. |
| `MemorySearchFilter` | interface | <code>interface MemorySearchFilter</code> | Field contract for Memory Search Filter; see all contract members below. |
| `MemoryVersion` | interface | <code>interface MemoryVersion</code> | Field contract for Memory Version; see all contract members below. |
| `PaginationRequest` | interface | <code>interface PaginationRequest</code> | Field contract for Pagination Request; see all contract members below. |
| `PaginationResult` | interface | <code>interface PaginationResult</code> | Field contract for Pagination Result; see all contract members below. |
| `ProviderHealth` | interface | <code>interface ProviderHealth</code> | Field contract for Provider Health; see all contract members below. |

## `ManagedMemoryDeleteRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filter` | property | <code>filter: MemorySearchFilter</code> | Public filter property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `memoryIds` | property | <code>memoryIds: string[]</code> | Public memory Ids property. |
| `mode` | property | <code>mode: "soft" &#124; "hard" &#124; "compliance"</code> | Public mode property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |

## `ManagedMemoryDeleteResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deletedMemoryIds` | property | <code>deletedMemoryIds: string[]</code> | Public deleted Memory Ids property. |
| `events` | property | <code>events: string[]</code> | Public events property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `pendingProviderIds` | property | <code>pendingProviderIds: string[]</code> | Public pending Provider Ids property. |
| `status` | property | <code>status: "completed" &#124; "rejected" &#124; "failed" &#124; "partial"</code> | Public status property. |
| `warnings` | property | <code>warnings: string[]</code> | Public warnings property. |

## `ManagedMemorySearchRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filters` | property | <code>filters: MemorySearchFilter</code> | Public filters property. |
| `includeContent` | property | <code>includeContent: boolean</code> | Public include Content property. |
| `includeDormant` | property | <code>includeDormant: boolean</code> | Public include Dormant property. |
| `includeProvenance` | property | <code>includeProvenance: boolean</code> | Public include Provenance property. |
| `includeRelations` | property | <code>includeRelations: boolean</code> | Public include Relations property. |
| `includeSuperseded` | property | <code>includeSuperseded: boolean</code> | Public include Superseded property. |
| `memoryTypes` | property | <code>memoryTypes: ManagedMemoryType[]</code> | Public memory Types property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `mode` | property | <code>mode: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword" &#124; "graph"</code> | Public mode property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `pagination` | property | <code>pagination: PaginationRequest</code> | Public pagination property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `query` | property | <code>query: string</code> | Public query property. |
| `queryEmbedding` | property | <code>queryEmbedding: number[]</code> | Public query Embedding property. |
| `rerank` | property | <code>rerank: boolean</code> | Public rerank property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `scoreThreshold` | property | <code>scoreThreshold: number</code> | Public score Threshold property. |
| `topK` | property | <code>topK: number</code> | Public top K property. |
| `updateAccessStats` | property | <code>updateAccessStats: boolean</code> | Public update Access Stats property. |

## `ManagedMemorySearchResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `graphScore` | property | <code>graphScore: number</code> | Public graph Score property. |
| `keywordScore` | property | <code>keywordScore: number</code> | Public keyword Score property. |
| `reasons` | property | <code>reasons: string[]</code> | Public reasons property. |
| `record` | property | <code>record: ManagedMemoryRecord&lt;unknown&gt;</code> | Public record property. |
| `rerankScore` | property | <code>rerankScore: number</code> | Public rerank Score property. |
| `score` | property | <code>score: number</code> | Public score property. |
| `semanticScore` | property | <code>semanticScore: number</code> | Public semantic Score property. |

## `ManagedMemoryUpdateRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public expected Revision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `memoryId` | property | <code>memoryId: string</code> | Public memory Id property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `patch` | property | <code>patch: MemoryPatch</code> | Public patch property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |

## `ManagedMemoryWriteResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: string[]</code> | Public events property. |
| `indexJobs` | property | <code>indexJobs: MemoryIndexJobRef[]</code> | Public index Jobs property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `records` | property | <code>records: ManagedMemoryRecord&lt;unknown&gt;[]</code> | Public records property. |
| `rejectedItems` | property | <code>rejectedItems: MemoryRejectedItem[]</code> | Public rejected Items property. |
| `status` | property | <code>status: "rejected" &#124; "queued" &#124; "failed" &#124; "committed" &#124; "reused" &#124; "partial"</code> | Public status property. |
| `warnings` | property | <code>warnings: string[]</code> | Public warnings property. |

## `MemoryAddRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `extractionMode` | property | <code>extractionMode: "none" &#124; "provider" &#124; "custom" &#124; "native"</code> | Public extraction Mode property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `input` | property | <code>input: unknown</code> | Public input property. |
| `inputType` | property | <code>inputType: "structured" &#124; "text" &#124; "message" &#124; "artifact_ref" &#124; "event_ref"</code> | Public input Type property. |
| `memoryType` | property | <code>memoryType: ManagedMemoryType</code> | Public memory Type property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `source` | property | <code>source: MemorySource</code> | Public source property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `writeMode` | property | <code>writeMode: "sync" &#124; "async"</code> | Public write Mode property. |

## `MemoryGetRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `includeHistory` | property | <code>includeHistory: boolean</code> | Public include History property. |
| `memoryId` | property | <code>memoryId: string</code> | Public memory Id property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |

## `MemoryHistoryRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryId` | property | <code>memoryId: string</code> | Public memory Id property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `pagination` | property | <code>pagination: PaginationRequest</code> | Public pagination property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |

## `MemoryIndexJobRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `state` | property | <code>state: "completed" &#124; "failed" &#124; "processing" &#124; "pending" &#124; "partial"</code> | Public state property. |

## `MemoryListRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filter` | property | <code>filter: MemorySearchFilter</code> | Public filter property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `pagination` | property | <code>pagination: PaginationRequest</code> | Public pagination property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |

## `MemoryListResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `hasMore` | property | <code>hasMore: boolean</code> | Public has More property. |
| `nextCursor` | property | <code>nextCursor: string</code> | Public next Cursor property. |
| `records` | property | <code>records: ManagedMemoryRecord&lt;unknown&gt;[]</code> | Public records property. |

## `MemoryManagementProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `capabilities` | method | <code>capabilities(): Promise&lt;import("./contracts").MemoryManagementCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `id` | property | <code>id: string</code> | Public id property. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `MemoryPatch` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalText` | property | <code>canonicalText: string</code> | Public canonical Text property. |
| `confidence` | property | <code>confidence: number</code> | Public confidence property. |
| `content` | property | <code>content: unknown</code> | Public content property. |
| `importance` | property | <code>importance: number</code> | Public importance property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `status` | property | <code>status: "failed" &#124; "invalidated" &#124; "deletion_pending" &#124; "active" &#124; "pending" &#124; "superseded" &#124; "dormant"</code> | Public status property. |
| `summary` | property | <code>summary: string</code> | Public summary property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |

## `MemoryRejectedItem` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error: NormalizedMemoryError</code> | Public error property. |
| `itemId` | property | <code>itemId: string</code> | Public item Id property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |

## `MemorySearchFilter` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalKeys` | property | <code>canonicalKeys: string[]</code> | Public canonical Keys property. |
| `confidenceGte` | property | <code>confidenceGte: number</code> | Public confidence Gte property. |
| `conflictFreeOnly` | property | <code>conflictFreeOnly: boolean</code> | Public conflict Free Only property. |
| `createdAfter` | property | <code>createdAfter: string</code> | Public created After property. |
| `createdBefore` | property | <code>createdBefore: string</code> | Public created Before property. |
| `entityIds` | property | <code>entityIds: string[]</code> | Public entity Ids property. |
| `excludeIds` | property | <code>excludeIds: string[]</code> | Public exclude Ids property. |
| `expiresAfter` | property | <code>expiresAfter: string</code> | Public expires After property. |
| `ids` | property | <code>ids: string[]</code> | Public ids property. |
| `importanceGte` | property | <code>importanceGte: number</code> | Public importance Gte property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `sourceTypes` | property | <code>sourceTypes: ("human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import")[]</code> | Public source Types property. |
| `statuses` | property | <code>statuses: MemoryStatus[]</code> | Public statuses property. |
| `tagsAll` | property | <code>tagsAll: string[]</code> | Public tags All property. |
| `tagsAny` | property | <code>tagsAny: string[]</code> | Public tags Any property. |
| `updatedAfter` | property | <code>updatedAfter: string</code> | Public updated After property. |
| `verifiedOnly` | property | <code>verifiedOnly: boolean</code> | Public verified Only property. |
| `visibility` | property | <code>visibility: ("workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant")[]</code> | Public visibility property. |

## `MemoryVersion` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryId` | property | <code>memoryId: string</code> | Public memory Id property. |
| `record` | property | <code>record: ManagedMemoryRecord&lt;unknown&gt;</code> | Public record property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |

## `PaginationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cursor` | property | <code>cursor: string</code> | Public cursor property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `maxBytes` | property | <code>maxBytes: number</code> | Public max Bytes property. |
| `maxCalls` | property | <code>maxCalls: number</code> | Public max Calls property. |
| `maxDurationMs` | property | <code>maxDurationMs: number</code> | Public max Duration Ms property. |
| `maxItems` | property | <code>maxItems: number</code> | Public max Items property. |
| `maxPages` | property | <code>maxPages: number</code> | Public max Pages property. |

## `PaginationResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `hasMore` | property | <code>hasMore: boolean</code> | Public has More property. |
| `nextCursor` | property | <code>nextCursor: string</code> | Public next Cursor property. |

## `ProviderHealth` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `latencyMs` | property | <code>latencyMs: number</code> | Public latency Ms property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `status` | property | <code>status: "healthy" &#124; "degraded" &#124; "unhealthy" &#124; "unknown"</code> | Public status property. |
