# `@codesoul-co/hypha-memory` / `contracts`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)
- Exports: **30**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `EmbeddingProviderSpec` | interface | <code>interface EmbeddingProviderSpec</code> | Field contract for Embedding Provider Spec; see all contract members below. |
| `ManagedMemoryRecord` | interface | <code>interface ManagedMemoryRecord</code> | Field contract for Managed Memory Record; see all contract members below. |
| `ManagedMemoryScope` | interface | <code>interface ManagedMemoryScope</code> | Field contract for Managed Memory Scope; see all contract members below. |
| `MemoryConflictPolicySpec` | interface | <code>interface MemoryConflictPolicySpec</code> | Field contract for Memory Conflict Policy Spec; see all contract members below. |
| `MemoryConsolidationPolicySpec` | interface | <code>interface MemoryConsolidationPolicySpec</code> | Field contract for Memory Consolidation Policy Spec; see all contract members below. |
| `MemoryContractSpecRef` | interface | <code>interface MemoryContractSpecRef extends SpecRef</code> | Field contract for Memory Contract Spec Ref; see all contract members below. |
| `MemoryEntityRef` | interface | <code>interface MemoryEntityRef</code> | Field contract for Memory Entity Ref; see all contract members below. |
| `MemoryFallbackPolicySpec` | interface | <code>interface MemoryFallbackPolicySpec</code> | Field contract for Memory Fallback Policy Spec; see all contract members below. |
| `MemoryIndexingPolicySpec` | interface | <code>interface MemoryIndexingPolicySpec</code> | Field contract for Memory Indexing Policy Spec; see all contract members below. |
| `MemoryIndexStatus` | interface | <code>interface MemoryIndexStatus</code> | Field contract for Memory Index Status; see all contract members below. |
| `MemoryManagementCapabilities` | interface | <code>interface MemoryManagementCapabilities</code> | Field contract for Memory Management Capabilities; see all contract members below. |
| `MemoryManagementProviderSpec` | interface | <code>interface MemoryManagementProviderSpec</code> | Field contract for Memory Management Provider Spec; see all contract members below. |
| `MemoryPrincipal` | interface | <code>interface MemoryPrincipal</code> | Field contract for Memory Principal; see all contract members below. |
| `MemoryPrivacyPolicySpec` | interface | <code>interface MemoryPrivacyPolicySpec</code> | Field contract for Memory Privacy Policy Spec; see all contract members below. |
| `MemoryProfileSpec` | interface | <code>interface MemoryProfileSpec</code> | Field contract for Memory Profile Spec; see all contract members below. |
| `MemoryProvenance` | interface | <code>interface MemoryProvenance</code> | Field contract for Memory Provenance; see all contract members below. |
| `MemoryRecordStoreSpec` | interface | <code>interface MemoryRecordStoreSpec</code> | Field contract for Memory Record Store Spec; see all contract members below. |
| `MemoryRelation` | interface | <code>interface MemoryRelation</code> | Field contract for Memory Relation; see all contract members below. |
| `MemoryRetentionPolicySpec` | interface | <code>interface MemoryRetentionPolicySpec</code> | Field contract for Memory Retention Policy Spec; see all contract members below. |
| `MemoryRetrievalPolicySpec` | interface | <code>interface MemoryRetrievalPolicySpec</code> | Field contract for Memory Retrieval Policy Spec; see all contract members below. |
| `MemoryScopePolicySpec` | interface | <code>interface MemoryScopePolicySpec</code> | Field contract for Memory Scope Policy Spec; see all contract members below. |
| `MemorySource` | interface | <code>interface MemorySource</code> | Field contract for Memory Source; see all contract members below. |
| `MemoryVectorRef` | interface | <code>interface MemoryVectorRef</code> | Field contract for Memory Vector Ref; see all contract members below. |
| `MemoryWritePolicySpec` | interface | <code>interface MemoryWritePolicySpec</code> | Field contract for Memory Write Policy Spec; see all contract members below. |
| `NormalizedMemoryError` | interface | <code>interface NormalizedMemoryError</code> | Field contract for Normalized Memory Error; see all contract members below. |
| `VectorStoreCapabilities` | interface | <code>interface VectorStoreCapabilities</code> | Field contract for Vector Store Capabilities; see all contract members below. |
| `VectorStoreSpec` | interface | <code>interface VectorStoreSpec</code> | Field contract for Vector Store Spec; see all contract members below. |
| `WorkingMemoryStoreSpec` | interface | <code>interface WorkingMemoryStoreSpec</code> | Field contract for Working Memory Store Spec; see all contract members below. |
| `ManagedMemoryType` | type | <code>type ManagedMemoryType = 'working' &#124; 'episodic' &#124; 'semantic' &#124; 'procedural' &#124; 'preference' &#124; 'artifact' &#124; 'governance' &#124; 'reflection' &#124; 'custom'</code> | Public type alias for Managed Memory Type. |
| `MemoryStatus` | type | <code>type MemoryStatus = 'pending' &#124; 'active' &#124; 'dormant' &#124; 'superseded' &#124; 'invalidated' &#124; 'deletion_pending' &#124; 'deleted' &#124; 'failed'</code> | Public type alias for Memory Status. |

## `EmbeddingProviderSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `connectionRef` | property | <code>connectionRef: string</code> | Public connection Ref property. |
| `dimensions` | property | <code>dimensions: number</code> | Public dimensions property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `maxBatchSize` | property | <code>maxBatchSize: number</code> | Public max Batch Size property. |
| `maxInputTokens` | property | <code>maxInputTokens: number</code> | Public max Input Tokens property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `model` | property | <code>model: string</code> | Public model property. |
| `normalized` | property | <code>normalized: boolean</code> | Public normalized property. |
| `provider` | property | <code>provider: string</code> | Public provider property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ManagedMemoryRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `accessCount` | property | <code>accessCount: number</code> | Public access Count property. |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `canonicalText` | property | <code>canonicalText: string</code> | Public canonical Text property. |
| `confidence` | property | <code>confidence: number</code> | Public confidence property. |
| `content` | property | <code>content: TContent</code> | Public content property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `decayScore` | property | <code>decayScore: number</code> | Public decay Score property. |
| `deletedAt` | property | <code>deletedAt: string</code> | Public deleted At property. |
| `entities` | property | <code>entities: MemoryEntityRef[]</code> | Public entities property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `humanVerified` | property | <code>humanVerified: boolean</code> | Public human Verified property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `immutable` | property | <code>immutable: boolean</code> | Public immutable property. |
| `importance` | property | <code>importance: number</code> | Public importance property. |
| `indexStatus` | property | <code>indexStatus: MemoryIndexStatus</code> | Public index Status property. |
| `language` | property | <code>language: string</code> | Public language property. |
| `lastAccessedAt` | property | <code>lastAccessedAt: string</code> | Public last Accessed At property. |
| `lastReinforcedAt` | property | <code>lastReinforcedAt: string</code> | Public last Reinforced At property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `provenance` | property | <code>provenance: MemoryProvenance</code> | Public provenance property. |
| `relations` | property | <code>relations: MemoryRelation[]</code> | Public relations property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `salience` | property | <code>salience: number</code> | Public salience property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `sensitive` | property | <code>sensitive: boolean</code> | Public sensitive property. |
| `source` | property | <code>source: MemorySource</code> | Public source property. |
| `status` | property | <code>status: MemoryStatus</code> | Public status property. |
| `strength` | property | <code>strength: number</code> | Public strength property. |
| `subtype` | property | <code>subtype: string</code> | Public subtype property. |
| `summary` | property | <code>summary: string</code> | Public summary property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `type` | property | <code>type: ManagedMemoryType</code> | Public type property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `vectorRefs` | property | <code>vectorRefs: MemoryVectorRef[]</code> | Public vector Refs property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |
| `visibility` | property | <code>visibility: "workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant"</code> | Public visibility property. |

## `ManagedMemoryScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `domainPackId` | property | <code>domainPackId: string</code> | Public domain Pack Id property. |
| `projectId` | property | <code>projectId: string</code> | Public project Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `MemoryConflictPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `detectOnWrite` | property | <code>detectOnWrite: boolean</code> | Public detect On Write property. |
| `markRelations` | property | <code>markRelations: boolean</code> | Public mark Relations property. |
| `matchingMode` | property | <code>matchingMode: "custom" &#124; "semantic" &#124; "same_key" &#124; "entity_relation"</code> | Public matching Mode property. |
| `resolution` | property | <code>resolution: "custom" &#124; "prefer_latest" &#124; "prefer_verified" &#124; "keep_both" &#124; "require_human"</code> | Public resolution property. |

## `MemoryConsolidationPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enabled` | property | <code>enabled: boolean</code> | Public enabled property. |
| `intervalSeconds` | property | <code>intervalSeconds: number</code> | Public interval Seconds property. |
| `minRecords` | property | <code>minRecords: number</code> | Public min Records property. |
| `preserveSourceRecords` | property | <code>preserveSourceRecords: boolean</code> | Public preserve Source Records property. |
| `requireVerification` | property | <code>requireVerification: boolean</code> | Public require Verification property. |
| `similarityThreshold` | property | <code>similarityThreshold: number</code> | Public similarity Threshold property. |
| `summaryMemoryType` | property | <code>summaryMemoryType: ManagedMemoryType</code> | Public summary Memory Type property. |
| `trigger` | property | <code>trigger: "manual" &#124; "scheduled" &#124; "count" &#124; "token_pressure"</code> | Public trigger property. |

## `MemoryContractSpecRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `MemoryEntityRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `confidence` | property | <code>confidence: number</code> | Public confidence property. |
| `entityId` | property | <code>entityId: string</code> | Public entity Id property. |
| `label` | property | <code>label: string</code> | Public label property. |
| `type` | property | <code>type: string</code> | Public type property. |

## `MemoryFallbackPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxFallbackDepth` | property | <code>maxFallbackDepth: number</code> | Public max Fallback Depth property. |
| `onProviderUnavailable` | property | <code>onProviderUnavailable: "fail" &#124; "native" &#124; "record_store_only" &#124; "skip"</code> | Public on Provider Unavailable property. |
| `onRerankerUnavailable` | property | <code>onRerankerUnavailable: "fail" &#124; "score_fusion" &#124; "no_rerank"</code> | Public on Reranker Unavailable property. |
| `onVectorUnavailable` | property | <code>onVectorUnavailable: "fail" &#124; "keyword" &#124; "structured_only"</code> | Public on Vector Unavailable property. |

## `MemoryIndexingPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `batchSize` | property | <code>batchSize: number</code> | Public batch Size property. |
| `deadLetterAfterAttempts` | property | <code>deadLetterAfterAttempts: number</code> | Public dead Letter After Attempts property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `mode` | property | <code>mode: "disabled" &#124; "sync" &#124; "async_outbox"</code> | Public mode property. |
| `rebuildable` | property | <code>rebuildable: boolean</code> | Public rebuildable property. |
| `retryDelayMs` | property | <code>retryDelayMs: number</code> | Public retry Delay Ms property. |

## `MemoryIndexStatus` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public attempts property. |
| `lastAttemptAt` | property | <code>lastAttemptAt: string</code> | Public last Attempt At property. |
| `lastError` | property | <code>lastError: NormalizedMemoryError</code> | Public last Error property. |
| `state` | property | <code>state: "none" &#124; "failed" &#124; "deleted" &#124; "pending" &#124; "indexing" &#124; "indexed" &#124; "partial"</code> | Public state property. |

## `MemoryManagementCapabilities` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | property | <code>add: boolean</code> | Public add property. |
| `asyncWrite` | property | <code>asyncWrite: boolean</code> | Public async Write property. |
| `batchOperations` | property | <code>batchOperations: boolean</code> | Public batch Operations property. |
| `conflictDetection` | property | <code>conflictDetection: boolean</code> | Public conflict Detection property. |
| `consolidate` | property | <code>consolidate: boolean</code> | Public consolidate property. |
| `decay` | property | <code>decay: boolean</code> | Public decay property. |
| `delete` | property | <code>delete: boolean</code> | Public delete property. |
| `deleteByFilter` | property | <code>deleteByFilter: boolean</code> | Public delete By Filter property. |
| `get` | property | <code>get: boolean</code> | Public get property. |
| `graphRelations` | property | <code>graphRelations: boolean</code> | Public graph Relations property. |
| `history` | property | <code>history: boolean</code> | Public history property. |
| `hybridSearch` | property | <code>hybridSearch: boolean</code> | Public hybrid Search property. |
| `list` | property | <code>list: boolean</code> | Public list property. |
| `reinforce` | property | <code>reinforce: boolean</code> | Public reinforce property. |
| `search` | property | <code>search: boolean</code> | Public search property. |
| `summarize` | property | <code>summarize: boolean</code> | Public summarize property. |
| `update` | property | <code>update: boolean</code> | Public update property. |

## `MemoryManagementProviderSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: MemoryManagementCapabilities</code> | Public capabilities property. |
| `circuitBreakerPolicy` | property | <code>circuitBreakerPolicy: { failureThreshold: number; resetAfterMs: number; }</code> | Public circuit Breaker Policy property. |
| `config` | property | <code>config: Record&lt;string, unknown&gt;</code> | Public config property. |
| `connectionRef` | property | <code>connectionRef: string</code> | Public connection Ref property. |
| `deployment` | property | <code>deployment: "local" &#124; "self_hosted" &#124; "managed" &#124; "embedded" &#124; "remote"</code> | Public deployment property. |
| `healthCheckPolicy` | property | <code>healthCheckPolicy: { intervalMs?: number; timeoutMs?: number; }</code> | Public health Check Policy property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `retryPolicy` | property | <code>retryPolicy: { maxAttempts: number; initialDelayMs?: number; maxDelayMs?: number; backoff?: "fixed" &#124; "exponential"; }</code> | Public retry Policy property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `timeoutPolicy` | property | <code>timeoutPolicy: { timeoutMs: number; operationTimeouts?: Partial&lt;Record&lt;"add" &#124; "search" &#124; "get" &#124; "list" &#124; "update" &#124; "delete", number&gt;&gt;; }</code> | Public timeout Policy property. |
| `type` | property | <code>type: "custom" &#124; "native" &#124; "mem0" &#124; "memorybank"</code> | Public type property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `MemoryPrincipal` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `permissionScopes` | property | <code>permissionScopes: string[]</code> | Public permission Scopes property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `roles` | property | <code>roles: string[]</code> | Public roles property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `type` | property | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | Public type property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `MemoryPrivacyPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowCrossUserRead` | property | <code>allowCrossUserRead: boolean</code> | Public allow Cross User Read property. |
| `allowCrossWorkspaceRead` | property | <code>allowCrossWorkspaceRead: boolean</code> | Public allow Cross Workspace Read property. |
| `complianceDelete` | property | <code>complianceDelete: boolean</code> | Public compliance Delete property. |
| `encryptionRef` | property | <code>encryptionRef: MemoryContractSpecRef</code> | Public encryption Ref property. |
| `redactFields` | property | <code>redactFields: string[]</code> | Public redact Fields property. |
| `sensitiveDataMode` | property | <code>sensitiveDataMode: "reject" &#124; "redact" &#124; "encrypt" &#124; "allow_by_policy"</code> | Public sensitive Data Mode property. |

## `MemoryProfileSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactStoreRef` | property | <code>artifactStoreRef: MemoryContractSpecRef</code> | Public artifact Store Ref property. |
| `conflictPolicy` | property | <code>conflictPolicy: MemoryConflictPolicySpec</code> | Public conflict Policy property. |
| `consolidationPolicy` | property | <code>consolidationPolicy: MemoryConsolidationPolicySpec</code> | Public consolidation Policy property. |
| `contextProfileRef` | property | <code>contextProfileRef: MemoryContractSpecRef</code> | Public context Profile Ref property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `embeddingProviderRef` | property | <code>embeddingProviderRef: MemoryContractSpecRef</code> | Public embedding Provider Ref property. |
| `enabled` | property | <code>enabled: boolean</code> | Public enabled property. |
| `fallbackPolicy` | property | <code>fallbackPolicy: MemoryFallbackPolicySpec</code> | Public fallback Policy property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `indexingPolicy` | property | <code>indexingPolicy: MemoryIndexingPolicySpec</code> | Public indexing Policy property. |
| `managementProviderRef` | property | <code>managementProviderRef: MemoryContractSpecRef</code> | Public management Provider Ref property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `privacyPolicy` | property | <code>privacyPolicy: MemoryPrivacyPolicySpec</code> | Public privacy Policy property. |
| `recordStoreRef` | property | <code>recordStoreRef: MemoryContractSpecRef</code> | Public record Store Ref property. |
| `rerankerProviderRef` | property | <code>rerankerProviderRef: MemoryContractSpecRef</code> | Public reranker Provider Ref property. |
| `retentionPolicy` | property | <code>retentionPolicy: MemoryRetentionPolicySpec</code> | Public retention Policy property. |
| `retrievalPolicy` | property | <code>retrievalPolicy: MemoryRetrievalPolicySpec</code> | Public retrieval Policy property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `scopePolicy` | property | <code>scopePolicy: MemoryScopePolicySpec</code> | Public scope Policy property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `vectorStoreRefs` | property | <code>vectorStoreRefs: MemoryContractSpecRef[]</code> | Public vector Store Refs property. |
| `version` | property | <code>version: string</code> | Public version property. |
| `workingStoreRef` | property | <code>workingStoreRef: MemoryContractSpecRef</code> | Public working Store Ref property. |
| `writePolicy` | property | <code>writePolicy: MemoryWritePolicySpec</code> | Public write Policy property. |

## `MemoryProvenance` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `createdBy` | property | <code>createdBy: string</code> | Public created By property. |
| `extractorVersion` | property | <code>extractorVersion: string</code> | Public extractor Version property. |
| `humanDecisionId` | property | <code>humanDecisionId: string</code> | Public human Decision Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `sourceEventIds` | property | <code>sourceEventIds: string[]</code> | Public source Event Ids property. |
| `sourceMemoryIds` | property | <code>sourceMemoryIds: string[]</code> | Public source Memory Ids property. |
| `transformation` | property | <code>transformation: string</code> | Public transformation property. |

## `MemoryRecordStoreSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collectionOrTable` | property | <code>collectionOrTable: string</code> | Public collection Or Table property. |
| `connectionRef` | property | <code>connectionRef: string</code> | Public connection Ref property. |
| `database` | property | <code>database: string</code> | Public database property. |
| `encryptionRef` | property | <code>encryptionRef: string</code> | Public encryption Ref property. |
| `historyMode` | property | <code>historyMode: "embedded_versions" &#124; "separate_versions" &#124; "event_projection"</code> | Public history Mode property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `transactional` | property | <code>transactional: boolean</code> | Public transactional property. |
| `type` | property | <code>type: "custom" &#124; "sqlite" &#124; "postgres" &#124; "mongodb"</code> | Public type property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `MemoryRelation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `confidence` | property | <code>confidence: number</code> | Public confidence property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `targetMemoryId` | property | <code>targetMemoryId: string</code> | Public target Memory Id property. |
| `type` | property | <code>type: "supports" &#124; "contradicts" &#124; "supersedes" &#124; "derived_from" &#124; "related_to" &#124; "same_as" &#124; "part_of"</code> | Public type property. |

## `MemoryRetentionPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archiveAfterSeconds` | property | <code>archiveAfterSeconds: number</code> | Public archive After Seconds property. |
| `defaultTtlSeconds` | property | <code>defaultTtlSeconds: number</code> | Public default Ttl Seconds property. |
| `deleteAfterSeconds` | property | <code>deleteAfterSeconds: number</code> | Public delete After Seconds property. |
| `deletionMode` | property | <code>deletionMode: "soft" &#124; "hard"</code> | Public deletion Mode property. |
| `legalHoldSupported` | property | <code>legalHoldSupported: boolean</code> | Public legal Hold Supported property. |
| `maxVersions` | property | <code>maxVersions: number</code> | Public max Versions property. |
| `retainHistory` | property | <code>retainHistory: boolean</code> | Public retain History property. |
| `ttlByType` | property | <code>ttlByType: Partial&lt;Record&lt;ManagedMemoryType, number&gt;&gt;</code> | Public ttl By Type property. |

## `MemoryRetrievalPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `confidenceWeight` | property | <code>confidenceWeight: number</code> | Public confidence Weight property. |
| `conflictHandling` | property | <code>conflictHandling: "include_marked" &#124; "prefer_latest" &#124; "prefer_verified" &#124; "exclude_conflicts"</code> | Public conflict Handling property. |
| `deduplication` | property | <code>deduplication: "none" &#124; "id" &#124; "semantic" &#124; "hash"</code> | Public deduplication property. |
| `defaultMode` | property | <code>defaultMode: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword"</code> | Public default Mode property. |
| `defaultTopK` | property | <code>defaultTopK: number</code> | Public default Top K property. |
| `importanceWeight` | property | <code>importanceWeight: number</code> | Public importance Weight property. |
| `maxCandidates` | property | <code>maxCandidates: number</code> | Public max Candidates property. |
| `memoryTypePriority` | property | <code>memoryTypePriority: Partial&lt;Record&lt;ManagedMemoryType, number&gt;&gt;</code> | Public memory Type Priority property. |
| `recencyWeight` | property | <code>recencyWeight: number</code> | Public recency Weight property. |
| `reinforcementWeight` | property | <code>reinforcementWeight: number</code> | Public reinforcement Weight property. |
| `rerank` | property | <code>rerank: "none" &#124; "provider" &#124; "custom" &#124; "score_fusion"</code> | Public rerank property. |
| `scoreThreshold` | property | <code>scoreThreshold: number</code> | Public score Threshold property. |
| `semanticDedupThreshold` | property | <code>semanticDedupThreshold: number</code> | Public semantic Dedup Threshold property. |
| `sourcePriority` | property | <code>sourcePriority: Partial&lt;Record&lt;"human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import", number&gt;&gt;</code> | Public source Priority property. |

## `MemoryScopePolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedReadScopes` | property | <code>allowedReadScopes: (keyof ManagedMemoryScope)[]</code> | Public allowed Read Scopes property. |
| `allowedWriteScopes` | property | <code>allowedWriteScopes: (keyof ManagedMemoryScope)[]</code> | Public allowed Write Scopes property. |
| `crossUserRead` | property | <code>crossUserRead: "deny" &#124; "policy"</code> | Public cross User Read property. |
| `crossWorkspaceRead` | property | <code>crossWorkspaceRead: "deny" &#124; "policy"</code> | Public cross Workspace Read property. |
| `enforceTenantBoundary` | property | <code>enforceTenantBoundary: boolean</code> | Public enforce Tenant Boundary property. |
| `inheritanceOrder` | property | <code>inheritanceOrder: (keyof ManagedMemoryScope)[]</code> | Public inheritance Order property. |
| `requiredDimensions` | property | <code>requiredDimensions: (keyof ManagedMemoryScope)[]</code> | Public required Dimensions property. |

## `MemorySource` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `sourceArtifactId` | property | <code>sourceArtifactId: string</code> | Public source Artifact Id property. |
| `sourceEventId` | property | <code>sourceEventId: string</code> | Public source Event Id property. |
| `sourceId` | property | <code>sourceId: string</code> | Public source Id property. |
| `sourceMessageId` | property | <code>sourceMessageId: string</code> | Public source Message Id property. |
| `sourceRunId` | property | <code>sourceRunId: string</code> | Public source Run Id property. |
| `type` | property | <code>type: "human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import"</code> | Public type property. |

## `MemoryVectorRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dimensions` | property | <code>dimensions: number</code> | Public dimensions property. |
| `embeddingModel` | property | <code>embeddingModel: string</code> | Public embedding Model property. |
| `embeddingProviderId` | property | <code>embeddingProviderId: string</code> | Public embedding Provider Id property. |
| `embeddingRevision` | property | <code>embeddingRevision: string</code> | Public embedding Revision property. |
| `indexedAt` | property | <code>indexedAt: string</code> | Public indexed At property. |
| `indexName` | property | <code>indexName: string</code> | Public index Name property. |
| `vectorId` | property | <code>vectorId: string</code> | Public vector Id property. |
| `vectorStoreId` | property | <code>vectorStoreId: string</code> | Public vector Store Id property. |

## `MemoryWritePolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedTypes` | property | <code>allowedTypes: ManagedMemoryType[]</code> | Public allowed Types property. |
| `autoCaptureSources` | property | <code>autoCaptureSources: ("human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import")[]</code> | Public auto Capture Sources property. |
| `conflictDetection` | property | <code>conflictDetection: boolean</code> | Public conflict Detection property. |
| `deduplicateBeforeWrite` | property | <code>deduplicateBeforeWrite: boolean</code> | Public deduplicate Before Write property. |
| `immutableTypes` | property | <code>immutableTypes: ManagedMemoryType[]</code> | Public immutable Types property. |
| `maxContentBytes` | property | <code>maxContentBytes: number</code> | Public max Content Bytes property. |
| `minConfidence` | property | <code>minConfidence: number</code> | Public min Confidence property. |
| `requireHumanVerificationFor` | property | <code>requireHumanVerificationFor: ManagedMemoryType[]</code> | Public require Human Verification For property. |
| `sensitiveDataMode` | property | <code>sensitiveDataMode: "reject" &#124; "redact" &#124; "encrypt" &#124; "allow_by_policy"</code> | Public sensitive Data Mode property. |

## `NormalizedMemoryError` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causeRef` | property | <code>causeRef: string</code> | Public cause Ref property. |
| `code` | property | <code>code: "MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; "MEMORY_PROVIDER_TI...</code> | Public code property. |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `providerCode` | property | <code>providerCode: string</code> | Public provider Code property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |

## `VectorStoreCapabilities` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `batchUpsert` | property | <code>batchUpsert: boolean</code> | Public batch Upsert property. |
| `deleteByFilter` | property | <code>deleteByFilter: boolean</code> | Public delete By Filter property. |
| `denseSearch` | property | <code>denseSearch: boolean</code> | Public dense Search property. |
| `fullTextFilter` | property | <code>fullTextFilter: boolean</code> | Public full Text Filter property. |
| `hybridSearch` | property | <code>hybridSearch: boolean</code> | Public hybrid Search property. |
| `localDeployment` | property | <code>localDeployment: boolean</code> | Public local Deployment property. |
| `metadataFilter` | property | <code>metadataFilter: boolean</code> | Public metadata Filter property. |
| `multiVector` | property | <code>multiVector: boolean</code> | Public multi Vector property. |
| `namespaces` | property | <code>namespaces: boolean</code> | Public namespaces property. |
| `payloadUpdate` | property | <code>payloadUpdate: boolean</code> | Public payload Update property. |
| `scoreThreshold` | property | <code>scoreThreshold: boolean</code> | Public score Threshold property. |
| `sparseSearch` | property | <code>sparseSearch: boolean</code> | Public sparse Search property. |

## `VectorStoreSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: VectorStoreCapabilities</code> | Public capabilities property. |
| `collection` | property | <code>collection: string</code> | Public collection property. |
| `connectionRef` | property | <code>connectionRef: string</code> | Public connection Ref property. |
| `dimensions` | property | <code>dimensions: number</code> | Public dimensions property. |
| `distance` | property | <code>distance: "cosine" &#124; "dot" &#124; "l2"</code> | Public distance property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `indexType` | property | <code>indexType: string</code> | Public index Type property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `namespaceStrategy` | property | <code>namespaceStrategy: "metadata_filter" &#124; "scope_hash" &#124; "collection_per_tenant"</code> | Public namespace Strategy property. |
| `type` | property | <code>type: "local" &#124; "custom" &#124; "pgvector" &#124; "qdrant" &#124; "milvus" &#124; "chroma" &#124; "pinecone"</code> | Public type property. |
| `version` | property | <code>version: string</code> | Public version property. |
| `writeMode` | property | <code>writeMode: "sync" &#124; "async_outbox" &#124; "dual_write"</code> | Public write Mode property. |

## `WorkingMemoryStoreSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `connectionRef` | property | <code>connectionRef: string</code> | Public connection Ref property. |
| `defaultTtlSeconds` | property | <code>defaultTtlSeconds: number</code> | Public default Ttl Seconds property. |
| `encryptionRef` | property | <code>encryptionRef: string</code> | Public encryption Ref property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `maxItemBytes` | property | <code>maxItemBytes: number</code> | Public max Item Bytes property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `namespace` | property | <code>namespace: string</code> | Public namespace property. |
| `serialization` | property | <code>serialization: "json" &#124; "msgpack"</code> | Public serialization property. |
| `type` | property | <code>type: "custom" &#124; "redis" &#124; "in_memory"</code> | Public type property. |
| `version` | property | <code>version: string</code> | Public version property. |
