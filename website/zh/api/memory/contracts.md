# `@codesoul-co/hypha-memory` / `contracts`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)
- 导出数: **30**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `EmbeddingProviderSpec` | 接口 | <code>interface EmbeddingProviderSpec</code> | Embedding Provider Spec 的字段契约；完整字段见下表。 |
| `ManagedMemoryRecord` | 接口 | <code>interface ManagedMemoryRecord</code> | Managed Memory Record 的字段契约；完整字段见下表。 |
| `ManagedMemoryScope` | 接口 | <code>interface ManagedMemoryScope</code> | Managed Memory Scope 的字段契约；完整字段见下表。 |
| `MemoryConflictPolicySpec` | 接口 | <code>interface MemoryConflictPolicySpec</code> | Memory Conflict Policy Spec 的字段契约；完整字段见下表。 |
| `MemoryConsolidationPolicySpec` | 接口 | <code>interface MemoryConsolidationPolicySpec</code> | Memory Consolidation Policy Spec 的字段契约；完整字段见下表。 |
| `MemoryContractSpecRef` | 接口 | <code>interface MemoryContractSpecRef extends SpecRef</code> | Memory Contract Spec Ref 的字段契约；完整字段见下表。 |
| `MemoryEntityRef` | 接口 | <code>interface MemoryEntityRef</code> | Memory Entity Ref 的字段契约；完整字段见下表。 |
| `MemoryFallbackPolicySpec` | 接口 | <code>interface MemoryFallbackPolicySpec</code> | Memory Fallback Policy Spec 的字段契约；完整字段见下表。 |
| `MemoryIndexingPolicySpec` | 接口 | <code>interface MemoryIndexingPolicySpec</code> | Memory Indexing Policy Spec 的字段契约；完整字段见下表。 |
| `MemoryIndexStatus` | 接口 | <code>interface MemoryIndexStatus</code> | Memory Index Status 的字段契约；完整字段见下表。 |
| `MemoryManagementCapabilities` | 接口 | <code>interface MemoryManagementCapabilities</code> | Memory Management Capabilities 的字段契约；完整字段见下表。 |
| `MemoryManagementProviderSpec` | 接口 | <code>interface MemoryManagementProviderSpec</code> | Memory Management Provider Spec 的字段契约；完整字段见下表。 |
| `MemoryPrincipal` | 接口 | <code>interface MemoryPrincipal</code> | Memory Principal 的字段契约；完整字段见下表。 |
| `MemoryPrivacyPolicySpec` | 接口 | <code>interface MemoryPrivacyPolicySpec</code> | Memory Privacy Policy Spec 的字段契约；完整字段见下表。 |
| `MemoryProfileSpec` | 接口 | <code>interface MemoryProfileSpec</code> | Memory Profile Spec 的字段契约；完整字段见下表。 |
| `MemoryProvenance` | 接口 | <code>interface MemoryProvenance</code> | Memory Provenance 的字段契约；完整字段见下表。 |
| `MemoryRecordStoreSpec` | 接口 | <code>interface MemoryRecordStoreSpec</code> | Memory Record Store Spec 的字段契约；完整字段见下表。 |
| `MemoryRelation` | 接口 | <code>interface MemoryRelation</code> | Memory Relation 的字段契约；完整字段见下表。 |
| `MemoryRetentionPolicySpec` | 接口 | <code>interface MemoryRetentionPolicySpec</code> | Memory Retention Policy Spec 的字段契约；完整字段见下表。 |
| `MemoryRetrievalPolicySpec` | 接口 | <code>interface MemoryRetrievalPolicySpec</code> | Memory Retrieval Policy Spec 的字段契约；完整字段见下表。 |
| `MemoryScopePolicySpec` | 接口 | <code>interface MemoryScopePolicySpec</code> | Memory Scope Policy Spec 的字段契约；完整字段见下表。 |
| `MemorySource` | 接口 | <code>interface MemorySource</code> | Memory Source 的字段契约；完整字段见下表。 |
| `MemoryVectorRef` | 接口 | <code>interface MemoryVectorRef</code> | Memory Vector Ref 的字段契约；完整字段见下表。 |
| `MemoryWritePolicySpec` | 接口 | <code>interface MemoryWritePolicySpec</code> | Memory Write Policy Spec 的字段契约；完整字段见下表。 |
| `NormalizedMemoryError` | 接口 | <code>interface NormalizedMemoryError</code> | Normalized Memory Error 的字段契约；完整字段见下表。 |
| `VectorStoreCapabilities` | 接口 | <code>interface VectorStoreCapabilities</code> | Vector Store Capabilities 的字段契约；完整字段见下表。 |
| `VectorStoreSpec` | 接口 | <code>interface VectorStoreSpec</code> | Vector Store Spec 的字段契约；完整字段见下表。 |
| `WorkingMemoryStoreSpec` | 接口 | <code>interface WorkingMemoryStoreSpec</code> | Working Memory Store Spec 的字段契约；完整字段见下表。 |
| `ManagedMemoryType` | 类型 | <code>type ManagedMemoryType = 'working' &#124; 'episodic' &#124; 'semantic' &#124; 'procedural' &#124; 'preference' &#124; 'artifact' &#124; 'governance' &#124; 'reflection' &#124; 'custom'</code> | Managed Memory Type 的公共类型别名。 |
| `MemoryStatus` | 类型 | <code>type MemoryStatus = 'pending' &#124; 'active' &#124; 'dormant' &#124; 'superseded' &#124; 'invalidated' &#124; 'deletion_pending' &#124; 'deleted' &#124; 'failed'</code> | Memory Status 的公共类型别名。 |

## `EmbeddingProviderSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `connectionRef` | 属性 | <code>connectionRef: string</code> | connection Ref 字段。 |
| `dimensions` | 属性 | <code>dimensions: number</code> | dimensions 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `maxBatchSize` | 属性 | <code>maxBatchSize: number</code> | max Batch Size 字段。 |
| `maxInputTokens` | 属性 | <code>maxInputTokens: number</code> | max Input Tokens 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `model` | 属性 | <code>model: string</code> | model 字段。 |
| `normalized` | 属性 | <code>normalized: boolean</code> | normalized 字段。 |
| `provider` | 属性 | <code>provider: string</code> | provider 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ManagedMemoryRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `accessCount` | 属性 | <code>accessCount: number</code> | access Count 字段。 |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `canonicalText` | 属性 | <code>canonicalText: string</code> | canonical Text 字段。 |
| `confidence` | 属性 | <code>confidence: number</code> | confidence 字段。 |
| `content` | 属性 | <code>content: TContent</code> | content 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `decayScore` | 属性 | <code>decayScore: number</code> | decay Score 字段。 |
| `deletedAt` | 属性 | <code>deletedAt: string</code> | deleted At 字段。 |
| `entities` | 属性 | <code>entities: MemoryEntityRef[]</code> | entities 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `humanVerified` | 属性 | <code>humanVerified: boolean</code> | human Verified 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `immutable` | 属性 | <code>immutable: boolean</code> | immutable 字段。 |
| `importance` | 属性 | <code>importance: number</code> | importance 字段。 |
| `indexStatus` | 属性 | <code>indexStatus: MemoryIndexStatus</code> | index Status 字段。 |
| `language` | 属性 | <code>language: string</code> | language 字段。 |
| `lastAccessedAt` | 属性 | <code>lastAccessedAt: string</code> | last Accessed At 字段。 |
| `lastReinforcedAt` | 属性 | <code>lastReinforcedAt: string</code> | last Reinforced At 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `provenance` | 属性 | <code>provenance: MemoryProvenance</code> | provenance 字段。 |
| `relations` | 属性 | <code>relations: MemoryRelation[]</code> | relations 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `salience` | 属性 | <code>salience: number</code> | salience 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `sensitive` | 属性 | <code>sensitive: boolean</code> | sensitive 字段。 |
| `source` | 属性 | <code>source: MemorySource</code> | source 字段。 |
| `status` | 属性 | <code>status: MemoryStatus</code> | status 字段。 |
| `strength` | 属性 | <code>strength: number</code> | strength 字段。 |
| `subtype` | 属性 | <code>subtype: string</code> | subtype 字段。 |
| `summary` | 属性 | <code>summary: string</code> | summary 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `type` | 属性 | <code>type: ManagedMemoryType</code> | type 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `vectorRefs` | 属性 | <code>vectorRefs: MemoryVectorRef[]</code> | vector Refs 字段。 |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |
| `visibility` | 属性 | <code>visibility: "workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant"</code> | visibility 字段。 |

## `ManagedMemoryScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `domainPackId` | 属性 | <code>domainPackId: string</code> | domain Pack Id 字段。 |
| `projectId` | 属性 | <code>projectId: string</code> | project Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `MemoryConflictPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `detectOnWrite` | 属性 | <code>detectOnWrite: boolean</code> | detect On Write 字段。 |
| `markRelations` | 属性 | <code>markRelations: boolean</code> | mark Relations 字段。 |
| `matchingMode` | 属性 | <code>matchingMode: "custom" &#124; "semantic" &#124; "same_key" &#124; "entity_relation"</code> | matching Mode 字段。 |
| `resolution` | 属性 | <code>resolution: "custom" &#124; "prefer_latest" &#124; "prefer_verified" &#124; "keep_both" &#124; "require_human"</code> | resolution 字段。 |

## `MemoryConsolidationPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enabled` | 属性 | <code>enabled: boolean</code> | enabled 字段。 |
| `intervalSeconds` | 属性 | <code>intervalSeconds: number</code> | interval Seconds 字段。 |
| `minRecords` | 属性 | <code>minRecords: number</code> | min Records 字段。 |
| `preserveSourceRecords` | 属性 | <code>preserveSourceRecords: boolean</code> | preserve Source Records 字段。 |
| `requireVerification` | 属性 | <code>requireVerification: boolean</code> | require Verification 字段。 |
| `similarityThreshold` | 属性 | <code>similarityThreshold: number</code> | similarity Threshold 字段。 |
| `summaryMemoryType` | 属性 | <code>summaryMemoryType: ManagedMemoryType</code> | summary Memory Type 字段。 |
| `trigger` | 属性 | <code>trigger: "manual" &#124; "scheduled" &#124; "count" &#124; "token_pressure"</code> | trigger 字段。 |

## `MemoryContractSpecRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `MemoryEntityRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `confidence` | 属性 | <code>confidence: number</code> | confidence 字段。 |
| `entityId` | 属性 | <code>entityId: string</code> | entity Id 字段。 |
| `label` | 属性 | <code>label: string</code> | label 字段。 |
| `type` | 属性 | <code>type: string</code> | type 字段。 |

## `MemoryFallbackPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxFallbackDepth` | 属性 | <code>maxFallbackDepth: number</code> | max Fallback Depth 字段。 |
| `onProviderUnavailable` | 属性 | <code>onProviderUnavailable: "fail" &#124; "native" &#124; "record_store_only" &#124; "skip"</code> | on Provider Unavailable 字段。 |
| `onRerankerUnavailable` | 属性 | <code>onRerankerUnavailable: "fail" &#124; "score_fusion" &#124; "no_rerank"</code> | on Reranker Unavailable 字段。 |
| `onVectorUnavailable` | 属性 | <code>onVectorUnavailable: "fail" &#124; "keyword" &#124; "structured_only"</code> | on Vector Unavailable 字段。 |

## `MemoryIndexingPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `batchSize` | 属性 | <code>batchSize: number</code> | batch Size 字段。 |
| `deadLetterAfterAttempts` | 属性 | <code>deadLetterAfterAttempts: number</code> | dead Letter After Attempts 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `mode` | 属性 | <code>mode: "disabled" &#124; "sync" &#124; "async_outbox"</code> | mode 字段。 |
| `rebuildable` | 属性 | <code>rebuildable: boolean</code> | rebuildable 字段。 |
| `retryDelayMs` | 属性 | <code>retryDelayMs: number</code> | retry Delay Ms 字段。 |

## `MemoryIndexStatus` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | attempts 字段。 |
| `lastAttemptAt` | 属性 | <code>lastAttemptAt: string</code> | last Attempt At 字段。 |
| `lastError` | 属性 | <code>lastError: NormalizedMemoryError</code> | last Error 字段。 |
| `state` | 属性 | <code>state: "none" &#124; "failed" &#124; "deleted" &#124; "pending" &#124; "indexing" &#124; "indexed" &#124; "partial"</code> | state 字段。 |

## `MemoryManagementCapabilities` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 属性 | <code>add: boolean</code> | add 字段。 |
| `asyncWrite` | 属性 | <code>asyncWrite: boolean</code> | async Write 字段。 |
| `batchOperations` | 属性 | <code>batchOperations: boolean</code> | batch Operations 字段。 |
| `conflictDetection` | 属性 | <code>conflictDetection: boolean</code> | conflict Detection 字段。 |
| `consolidate` | 属性 | <code>consolidate: boolean</code> | consolidate 字段。 |
| `decay` | 属性 | <code>decay: boolean</code> | decay 字段。 |
| `delete` | 属性 | <code>delete: boolean</code> | delete 字段。 |
| `deleteByFilter` | 属性 | <code>deleteByFilter: boolean</code> | delete By Filter 字段。 |
| `get` | 属性 | <code>get: boolean</code> | get 字段。 |
| `graphRelations` | 属性 | <code>graphRelations: boolean</code> | graph Relations 字段。 |
| `history` | 属性 | <code>history: boolean</code> | history 字段。 |
| `hybridSearch` | 属性 | <code>hybridSearch: boolean</code> | hybrid Search 字段。 |
| `list` | 属性 | <code>list: boolean</code> | list 字段。 |
| `reinforce` | 属性 | <code>reinforce: boolean</code> | reinforce 字段。 |
| `search` | 属性 | <code>search: boolean</code> | search 字段。 |
| `summarize` | 属性 | <code>summarize: boolean</code> | summarize 字段。 |
| `update` | 属性 | <code>update: boolean</code> | update 字段。 |

## `MemoryManagementProviderSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: MemoryManagementCapabilities</code> | capabilities 字段。 |
| `circuitBreakerPolicy` | 属性 | <code>circuitBreakerPolicy: { failureThreshold: number; resetAfterMs: number; }</code> | circuit Breaker Policy 字段。 |
| `config` | 属性 | <code>config: Record&lt;string, unknown&gt;</code> | config 字段。 |
| `connectionRef` | 属性 | <code>connectionRef: string</code> | connection Ref 字段。 |
| `deployment` | 属性 | <code>deployment: "local" &#124; "self_hosted" &#124; "managed" &#124; "embedded" &#124; "remote"</code> | deployment 字段。 |
| `healthCheckPolicy` | 属性 | <code>healthCheckPolicy: { intervalMs?: number; timeoutMs?: number; }</code> | health Check Policy 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `retryPolicy` | 属性 | <code>retryPolicy: { maxAttempts: number; initialDelayMs?: number; maxDelayMs?: number; backoff?: "fixed" &#124; "exponential"; }</code> | retry Policy 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `timeoutPolicy` | 属性 | <code>timeoutPolicy: { timeoutMs: number; operationTimeouts?: Partial&lt;Record&lt;"add" &#124; "search" &#124; "get" &#124; "list" &#124; "update" &#124; "delete", number&gt;&gt;; }</code> | timeout Policy 字段。 |
| `type` | 属性 | <code>type: "custom" &#124; "native" &#124; "mem0" &#124; "memorybank"</code> | type 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `MemoryPrincipal` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `permissionScopes` | 属性 | <code>permissionScopes: string[]</code> | permission Scopes 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `roles` | 属性 | <code>roles: string[]</code> | roles 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `type` | 属性 | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | type 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `MemoryPrivacyPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowCrossUserRead` | 属性 | <code>allowCrossUserRead: boolean</code> | allow Cross User Read 字段。 |
| `allowCrossWorkspaceRead` | 属性 | <code>allowCrossWorkspaceRead: boolean</code> | allow Cross Workspace Read 字段。 |
| `complianceDelete` | 属性 | <code>complianceDelete: boolean</code> | compliance Delete 字段。 |
| `encryptionRef` | 属性 | <code>encryptionRef: MemoryContractSpecRef</code> | encryption Ref 字段。 |
| `redactFields` | 属性 | <code>redactFields: string[]</code> | redact Fields 字段。 |
| `sensitiveDataMode` | 属性 | <code>sensitiveDataMode: "reject" &#124; "redact" &#124; "encrypt" &#124; "allow_by_policy"</code> | sensitive Data Mode 字段。 |

## `MemoryProfileSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactStoreRef` | 属性 | <code>artifactStoreRef: MemoryContractSpecRef</code> | artifact Store Ref 字段。 |
| `conflictPolicy` | 属性 | <code>conflictPolicy: MemoryConflictPolicySpec</code> | conflict Policy 字段。 |
| `consolidationPolicy` | 属性 | <code>consolidationPolicy: MemoryConsolidationPolicySpec</code> | consolidation Policy 字段。 |
| `contextProfileRef` | 属性 | <code>contextProfileRef: MemoryContractSpecRef</code> | context Profile Ref 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `embeddingProviderRef` | 属性 | <code>embeddingProviderRef: MemoryContractSpecRef</code> | embedding Provider Ref 字段。 |
| `enabled` | 属性 | <code>enabled: boolean</code> | enabled 字段。 |
| `fallbackPolicy` | 属性 | <code>fallbackPolicy: MemoryFallbackPolicySpec</code> | fallback Policy 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `indexingPolicy` | 属性 | <code>indexingPolicy: MemoryIndexingPolicySpec</code> | indexing Policy 字段。 |
| `managementProviderRef` | 属性 | <code>managementProviderRef: MemoryContractSpecRef</code> | management Provider Ref 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `privacyPolicy` | 属性 | <code>privacyPolicy: MemoryPrivacyPolicySpec</code> | privacy Policy 字段。 |
| `recordStoreRef` | 属性 | <code>recordStoreRef: MemoryContractSpecRef</code> | record Store Ref 字段。 |
| `rerankerProviderRef` | 属性 | <code>rerankerProviderRef: MemoryContractSpecRef</code> | reranker Provider Ref 字段。 |
| `retentionPolicy` | 属性 | <code>retentionPolicy: MemoryRetentionPolicySpec</code> | retention Policy 字段。 |
| `retrievalPolicy` | 属性 | <code>retrievalPolicy: MemoryRetrievalPolicySpec</code> | retrieval Policy 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `scopePolicy` | 属性 | <code>scopePolicy: MemoryScopePolicySpec</code> | scope Policy 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `vectorStoreRefs` | 属性 | <code>vectorStoreRefs: MemoryContractSpecRef[]</code> | vector Store Refs 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
| `workingStoreRef` | 属性 | <code>workingStoreRef: MemoryContractSpecRef</code> | working Store Ref 字段。 |
| `writePolicy` | 属性 | <code>writePolicy: MemoryWritePolicySpec</code> | write Policy 字段。 |

## `MemoryProvenance` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `createdBy` | 属性 | <code>createdBy: string</code> | created By 字段。 |
| `extractorVersion` | 属性 | <code>extractorVersion: string</code> | extractor Version 字段。 |
| `humanDecisionId` | 属性 | <code>humanDecisionId: string</code> | human Decision Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `sourceEventIds` | 属性 | <code>sourceEventIds: string[]</code> | source Event Ids 字段。 |
| `sourceMemoryIds` | 属性 | <code>sourceMemoryIds: string[]</code> | source Memory Ids 字段。 |
| `transformation` | 属性 | <code>transformation: string</code> | transformation 字段。 |

## `MemoryRecordStoreSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collectionOrTable` | 属性 | <code>collectionOrTable: string</code> | collection Or Table 字段。 |
| `connectionRef` | 属性 | <code>connectionRef: string</code> | connection Ref 字段。 |
| `database` | 属性 | <code>database: string</code> | database 字段。 |
| `encryptionRef` | 属性 | <code>encryptionRef: string</code> | encryption Ref 字段。 |
| `historyMode` | 属性 | <code>historyMode: "embedded_versions" &#124; "separate_versions" &#124; "event_projection"</code> | history Mode 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `transactional` | 属性 | <code>transactional: boolean</code> | transactional 字段。 |
| `type` | 属性 | <code>type: "custom" &#124; "sqlite" &#124; "postgres" &#124; "mongodb"</code> | type 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `MemoryRelation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `confidence` | 属性 | <code>confidence: number</code> | confidence 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `targetMemoryId` | 属性 | <code>targetMemoryId: string</code> | target Memory Id 字段。 |
| `type` | 属性 | <code>type: "supports" &#124; "contradicts" &#124; "supersedes" &#124; "derived_from" &#124; "related_to" &#124; "same_as" &#124; "part_of"</code> | type 字段。 |

## `MemoryRetentionPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archiveAfterSeconds` | 属性 | <code>archiveAfterSeconds: number</code> | archive After Seconds 字段。 |
| `defaultTtlSeconds` | 属性 | <code>defaultTtlSeconds: number</code> | default Ttl Seconds 字段。 |
| `deleteAfterSeconds` | 属性 | <code>deleteAfterSeconds: number</code> | delete After Seconds 字段。 |
| `deletionMode` | 属性 | <code>deletionMode: "soft" &#124; "hard"</code> | deletion Mode 字段。 |
| `legalHoldSupported` | 属性 | <code>legalHoldSupported: boolean</code> | legal Hold Supported 字段。 |
| `maxVersions` | 属性 | <code>maxVersions: number</code> | max Versions 字段。 |
| `retainHistory` | 属性 | <code>retainHistory: boolean</code> | retain History 字段。 |
| `ttlByType` | 属性 | <code>ttlByType: Partial&lt;Record&lt;ManagedMemoryType, number&gt;&gt;</code> | ttl By Type 字段。 |

## `MemoryRetrievalPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `confidenceWeight` | 属性 | <code>confidenceWeight: number</code> | confidence Weight 字段。 |
| `conflictHandling` | 属性 | <code>conflictHandling: "include_marked" &#124; "prefer_latest" &#124; "prefer_verified" &#124; "exclude_conflicts"</code> | conflict Handling 字段。 |
| `deduplication` | 属性 | <code>deduplication: "none" &#124; "id" &#124; "semantic" &#124; "hash"</code> | deduplication 字段。 |
| `defaultMode` | 属性 | <code>defaultMode: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword"</code> | default Mode 字段。 |
| `defaultTopK` | 属性 | <code>defaultTopK: number</code> | default Top K 字段。 |
| `importanceWeight` | 属性 | <code>importanceWeight: number</code> | importance Weight 字段。 |
| `maxCandidates` | 属性 | <code>maxCandidates: number</code> | max Candidates 字段。 |
| `memoryTypePriority` | 属性 | <code>memoryTypePriority: Partial&lt;Record&lt;ManagedMemoryType, number&gt;&gt;</code> | memory Type Priority 字段。 |
| `recencyWeight` | 属性 | <code>recencyWeight: number</code> | recency Weight 字段。 |
| `reinforcementWeight` | 属性 | <code>reinforcementWeight: number</code> | reinforcement Weight 字段。 |
| `rerank` | 属性 | <code>rerank: "none" &#124; "provider" &#124; "custom" &#124; "score_fusion"</code> | rerank 字段。 |
| `scoreThreshold` | 属性 | <code>scoreThreshold: number</code> | score Threshold 字段。 |
| `semanticDedupThreshold` | 属性 | <code>semanticDedupThreshold: number</code> | semantic Dedup Threshold 字段。 |
| `sourcePriority` | 属性 | <code>sourcePriority: Partial&lt;Record&lt;"human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import", number&gt;&gt;</code> | source Priority 字段。 |

## `MemoryScopePolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedReadScopes` | 属性 | <code>allowedReadScopes: (keyof ManagedMemoryScope)[]</code> | allowed Read Scopes 字段。 |
| `allowedWriteScopes` | 属性 | <code>allowedWriteScopes: (keyof ManagedMemoryScope)[]</code> | allowed Write Scopes 字段。 |
| `crossUserRead` | 属性 | <code>crossUserRead: "deny" &#124; "policy"</code> | cross User Read 字段。 |
| `crossWorkspaceRead` | 属性 | <code>crossWorkspaceRead: "deny" &#124; "policy"</code> | cross Workspace Read 字段。 |
| `enforceTenantBoundary` | 属性 | <code>enforceTenantBoundary: boolean</code> | enforce Tenant Boundary 字段。 |
| `inheritanceOrder` | 属性 | <code>inheritanceOrder: (keyof ManagedMemoryScope)[]</code> | inheritance Order 字段。 |
| `requiredDimensions` | 属性 | <code>requiredDimensions: (keyof ManagedMemoryScope)[]</code> | required Dimensions 字段。 |

## `MemorySource` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `sourceArtifactId` | 属性 | <code>sourceArtifactId: string</code> | source Artifact Id 字段。 |
| `sourceEventId` | 属性 | <code>sourceEventId: string</code> | source Event Id 字段。 |
| `sourceId` | 属性 | <code>sourceId: string</code> | source Id 字段。 |
| `sourceMessageId` | 属性 | <code>sourceMessageId: string</code> | source Message Id 字段。 |
| `sourceRunId` | 属性 | <code>sourceRunId: string</code> | source Run Id 字段。 |
| `type` | 属性 | <code>type: "human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import"</code> | type 字段。 |

## `MemoryVectorRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dimensions` | 属性 | <code>dimensions: number</code> | dimensions 字段。 |
| `embeddingModel` | 属性 | <code>embeddingModel: string</code> | embedding Model 字段。 |
| `embeddingProviderId` | 属性 | <code>embeddingProviderId: string</code> | embedding Provider Id 字段。 |
| `embeddingRevision` | 属性 | <code>embeddingRevision: string</code> | embedding Revision 字段。 |
| `indexedAt` | 属性 | <code>indexedAt: string</code> | indexed At 字段。 |
| `indexName` | 属性 | <code>indexName: string</code> | index Name 字段。 |
| `vectorId` | 属性 | <code>vectorId: string</code> | vector Id 字段。 |
| `vectorStoreId` | 属性 | <code>vectorStoreId: string</code> | vector Store Id 字段。 |

## `MemoryWritePolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedTypes` | 属性 | <code>allowedTypes: ManagedMemoryType[]</code> | allowed Types 字段。 |
| `autoCaptureSources` | 属性 | <code>autoCaptureSources: ("human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import")[]</code> | auto Capture Sources 字段。 |
| `conflictDetection` | 属性 | <code>conflictDetection: boolean</code> | conflict Detection 字段。 |
| `deduplicateBeforeWrite` | 属性 | <code>deduplicateBeforeWrite: boolean</code> | deduplicate Before Write 字段。 |
| `immutableTypes` | 属性 | <code>immutableTypes: ManagedMemoryType[]</code> | immutable Types 字段。 |
| `maxContentBytes` | 属性 | <code>maxContentBytes: number</code> | max Content Bytes 字段。 |
| `minConfidence` | 属性 | <code>minConfidence: number</code> | min Confidence 字段。 |
| `requireHumanVerificationFor` | 属性 | <code>requireHumanVerificationFor: ManagedMemoryType[]</code> | require Human Verification For 字段。 |
| `sensitiveDataMode` | 属性 | <code>sensitiveDataMode: "reject" &#124; "redact" &#124; "encrypt" &#124; "allow_by_policy"</code> | sensitive Data Mode 字段。 |

## `NormalizedMemoryError` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causeRef` | 属性 | <code>causeRef: string</code> | cause Ref 字段。 |
| `code` | 属性 | <code>code: "MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; "MEMORY_PROVIDER_TI...</code> | code 字段。 |
| `details` | 属性 | <code>details: Record&lt;string, unknown&gt;</code> | details 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `providerCode` | 属性 | <code>providerCode: string</code> | provider Code 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |

## `VectorStoreCapabilities` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `batchUpsert` | 属性 | <code>batchUpsert: boolean</code> | batch Upsert 字段。 |
| `deleteByFilter` | 属性 | <code>deleteByFilter: boolean</code> | delete By Filter 字段。 |
| `denseSearch` | 属性 | <code>denseSearch: boolean</code> | dense Search 字段。 |
| `fullTextFilter` | 属性 | <code>fullTextFilter: boolean</code> | full Text Filter 字段。 |
| `hybridSearch` | 属性 | <code>hybridSearch: boolean</code> | hybrid Search 字段。 |
| `localDeployment` | 属性 | <code>localDeployment: boolean</code> | local Deployment 字段。 |
| `metadataFilter` | 属性 | <code>metadataFilter: boolean</code> | metadata Filter 字段。 |
| `multiVector` | 属性 | <code>multiVector: boolean</code> | multi Vector 字段。 |
| `namespaces` | 属性 | <code>namespaces: boolean</code> | namespaces 字段。 |
| `payloadUpdate` | 属性 | <code>payloadUpdate: boolean</code> | payload Update 字段。 |
| `scoreThreshold` | 属性 | <code>scoreThreshold: boolean</code> | score Threshold 字段。 |
| `sparseSearch` | 属性 | <code>sparseSearch: boolean</code> | sparse Search 字段。 |

## `VectorStoreSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: VectorStoreCapabilities</code> | capabilities 字段。 |
| `collection` | 属性 | <code>collection: string</code> | collection 字段。 |
| `connectionRef` | 属性 | <code>connectionRef: string</code> | connection Ref 字段。 |
| `dimensions` | 属性 | <code>dimensions: number</code> | dimensions 字段。 |
| `distance` | 属性 | <code>distance: "cosine" &#124; "dot" &#124; "l2"</code> | distance 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `indexType` | 属性 | <code>indexType: string</code> | index Type 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `namespaceStrategy` | 属性 | <code>namespaceStrategy: "metadata_filter" &#124; "scope_hash" &#124; "collection_per_tenant"</code> | namespace Strategy 字段。 |
| `type` | 属性 | <code>type: "local" &#124; "custom" &#124; "pgvector" &#124; "qdrant" &#124; "milvus" &#124; "chroma" &#124; "pinecone"</code> | type 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
| `writeMode` | 属性 | <code>writeMode: "sync" &#124; "async_outbox" &#124; "dual_write"</code> | write Mode 字段。 |

## `WorkingMemoryStoreSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `connectionRef` | 属性 | <code>connectionRef: string</code> | connection Ref 字段。 |
| `defaultTtlSeconds` | 属性 | <code>defaultTtlSeconds: number</code> | default Ttl Seconds 字段。 |
| `encryptionRef` | 属性 | <code>encryptionRef: string</code> | encryption Ref 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `maxItemBytes` | 属性 | <code>maxItemBytes: number</code> | max Item Bytes 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `namespace` | 属性 | <code>namespace: string</code> | namespace 字段。 |
| `serialization` | 属性 | <code>serialization: "json" &#124; "msgpack"</code> | serialization 字段。 |
| `type` | 属性 | <code>type: "custom" &#124; "redis" &#124; "in_memory"</code> | type 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
