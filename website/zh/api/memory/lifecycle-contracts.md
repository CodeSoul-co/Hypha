# `@codesoul-co/hypha-memory` / `lifecycle-contracts`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/lifecycle-contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)
- 导出数: **22**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `EpisodicRecordInput` | 接口 | <code>interface EpisodicRecordInput</code> | Episodic Record Input 的字段契约；完整字段见下表。 |
| `ExtractedMemoryCandidate` | 接口 | <code>interface ExtractedMemoryCandidate</code> | Extracted Memory Candidate 的字段契约；完整字段见下表。 |
| `ExtractedMemoryEvidence` | 接口 | <code>interface ExtractedMemoryEvidence</code> | Extracted Memory Evidence 的字段契约；完整字段见下表。 |
| `MemoryExtractionBatch` | 接口 | <code>interface MemoryExtractionBatch</code> | Memory Extraction Batch 的字段契约；完整字段见下表。 |
| `MemoryExtractionCursor` | 接口 | <code>interface MemoryExtractionCursor</code> | Memory Extraction Cursor 的字段契约；完整字段见下表。 |
| `MemoryExtractionJob` | 接口 | <code>interface MemoryExtractionJob</code> | Memory Extraction Job 的字段契约；完整字段见下表。 |
| `MemoryExtractionProfileSpec` | 接口 | <code>interface MemoryExtractionProfileSpec</code> | Memory Extraction Profile Spec 的字段契约；完整字段见下表。 |
| `MemoryExtractionRequest` | 接口 | <code>interface MemoryExtractionRequest</code> | Memory Extraction Request 的字段契约；完整字段见下表。 |
| `MemoryExtractionSourceAdapter` | 接口 | <code>interface MemoryExtractionSourceAdapter</code> | Memory Extraction Source Adapter 的字段契约；完整字段见下表。 |
| `MemoryExtractionSourceBatch` | 接口 | <code>interface MemoryExtractionSourceBatch</code> | Memory Extraction Source Batch 的字段契约；完整字段见下表。 |
| `MemoryExtractionSourceRef` | 接口 | <code>interface MemoryExtractionSourceRef</code> | Memory Extraction Source Ref 的字段契约；完整字段见下表。 |
| `MemoryExtractionStageSpec` | 接口 | <code>interface MemoryExtractionStageSpec</code> | Memory Extraction Stage Spec 的字段契约；完整字段见下表。 |
| `MemoryExtractor` | 接口 | <code>interface MemoryExtractor</code> | Memory Extractor 的字段契约；完整字段见下表。 |
| `MemoryMaintenanceApplyRequest` | 接口 | <code>interface MemoryMaintenanceApplyRequest</code> | Memory Maintenance Apply Request 的字段契约；完整字段见下表。 |
| `MemoryMaintenanceDecision` | 接口 | <code>interface MemoryMaintenanceDecision</code> | Memory Maintenance Decision 的字段契约；完整字段见下表。 |
| `MemoryMaintenancePlanner` | 接口 | <code>interface MemoryMaintenancePlanner</code> | Memory Maintenance Planner 的字段契约；完整字段见下表。 |
| `MemoryMaintenancePlanRequest` | 接口 | <code>interface MemoryMaintenancePlanRequest</code> | Memory Maintenance Plan Request 的字段契约；完整字段见下表。 |
| `MemoryMaintenancePolicySpec` | 接口 | <code>interface MemoryMaintenancePolicySpec</code> | Memory Maintenance Policy Spec 的字段契约；完整字段见下表。 |
| `NormalizedExtractionInput` | 接口 | <code>interface NormalizedExtractionInput</code> | Normalized Extraction Input 的字段契约；完整字段见下表。 |
| `TruthAssertion` | 接口 | <code>interface TruthAssertion</code> | Truth Assertion 的字段契约；完整字段见下表。 |
| `MemoryExtractionSourceType` | 类型 | <code>type MemoryExtractionSourceType = 'conversation' &#124; 'truth' &#124; 'episodic_record' &#124; 'runtime_event' &#124; 'tool_observation' &#124; 'artifact' &#124; 'structured_record' &#124; 'custom'</code> | Memory Extraction Source Type 的公共类型别名。 |
| `MemoryMaintenanceAction` | 类型 | <code>type MemoryMaintenanceAction = 'create' &#124; 'noop' &#124; 'reuse' &#124; 'update' &#124; 'merge' &#124; 'supersede' &#124; 'invalidate' &#124; 'reject' &#124; 'require_review'</code> | Memory Maintenance Action 的公共类型别名。 |

## `EpisodicRecordInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actions` | 属性 | <code>actions: string[]</code> | actions 字段。 |
| `actors` | 属性 | <code>actors: string[]</code> | actors 字段。 |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `causalEventIds` | 属性 | <code>causalEventIds: string[]</code> | causal Event Ids 字段。 |
| `endAt` | 属性 | <code>endAt: string</code> | end At 字段。 |
| `episodeId` | 属性 | <code>episodeId: string</code> | episode Id 字段。 |
| `failureCode` | 属性 | <code>failureCode: string</code> | failure Code 字段。 |
| `goal` | 属性 | <code>goal: string</code> | goal 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `observations` | 属性 | <code>observations: string[]</code> | observations 字段。 |
| `outcome` | 属性 | <code>outcome: unknown</code> | outcome 字段。 |
| `startAt` | 属性 | <code>startAt: string</code> | start At 字段。 |
| `success` | 属性 | <code>success: boolean</code> | success 字段。 |
| `title` | 属性 | <code>title: string</code> | title 字段。 |

## `ExtractedMemoryCandidate` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authority` | 属性 | <code>authority: "verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"</code> | authority 字段。 |
| `candidateId` | 属性 | <code>candidateId: string</code> | candidate Id 字段。 |
| `canonicalKey` | 属性 | <code>canonicalKey: string</code> | canonical Key 字段。 |
| `canonicalText` | 属性 | <code>canonicalText: string</code> | canonical Text 字段。 |
| `confidence` | 属性 | <code>confidence: number</code> | confidence 字段。 |
| `content` | 属性 | <code>content: unknown</code> | content 字段。 |
| `entities` | 属性 | <code>entities: MemoryEntityRef[]</code> | entities 字段。 |
| `evidence` | 属性 | <code>evidence: ExtractedMemoryEvidence[]</code> | evidence 字段。 |
| `extractionProfileRevision` | 属性 | <code>extractionProfileRevision: string</code> | extraction Profile Revision 字段。 |
| `extractionRationale` | 属性 | <code>extractionRationale: string</code> | extraction Rationale 字段。 |
| `importance` | 属性 | <code>importance: number</code> | importance 字段。 |
| `object` | 属性 | <code>object: unknown</code> | object 字段。 |
| `predicate` | 属性 | <code>predicate: string</code> | predicate 字段。 |
| `relations` | 属性 | <code>relations: MemoryRelation[]</code> | relations 字段。 |
| `sensitive` | 属性 | <code>sensitive: boolean</code> | sensitive 字段。 |
| `sourceHash` | 属性 | <code>sourceHash: string</code> | source Hash 字段。 |
| `subject` | 属性 | <code>subject: string</code> | subject 字段。 |
| `summary` | 属性 | <code>summary: string</code> | summary 字段。 |
| `temporal` | 属性 | <code>temporal: { observedAt?: string; validFrom?: string; validTo?: string; temporalConfidence?: number; }</code> | temporal 字段。 |
| `type` | 属性 | <code>type: ManagedMemoryType</code> | type 字段。 |

## `ExtractedMemoryEvidence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `confidence` | 属性 | <code>confidence: number</code> | confidence 字段。 |
| `sourceRef` | 属性 | <code>sourceRef: MemoryExtractionSourceRef</code> | source Ref 字段。 |
| `sourceSpan` | 属性 | <code>sourceSpan: { messageId?: string; eventId?: string; artifactRef?: string; start?: number; end?: number; quoteHash?: string; }</code> | source Span 字段。 |
| `supportType` | 属性 | <code>supportType: "derived" &#124; "direct" &#124; "contradicting"</code> | support Type 字段。 |

## `MemoryExtractionBatch` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidates` | 属性 | <code>candidates: ExtractedMemoryCandidate[]</code> | candidates 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `extractorVersion` | 属性 | <code>extractorVersion: string</code> | extractor Version 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `jobId` | 属性 | <code>jobId: string</code> | job Id 字段。 |
| `modelObservationRef` | 属性 | <code>modelObservationRef: string</code> | model Observation Ref 字段。 |
| `rejectedCandidates` | 属性 | <code>rejectedCandidates: MemoryRejectedItem[]</code> | rejected Candidates 字段。 |
| `sourceHash` | 属性 | <code>sourceHash: string</code> | source Hash 字段。 |
| `sourceRefs` | 属性 | <code>sourceRefs: MemoryExtractionSourceRef[]</code> | source Refs 字段。 |

## `MemoryExtractionCursor` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `opaqueCursor` | 属性 | <code>opaqueCursor: string</code> | opaque Cursor 字段。 |
| `sequence` | 属性 | <code>sequence: number</code> | sequence 字段。 |
| `sourceHash` | 属性 | <code>sourceHash: string</code> | source Hash 字段。 |
| `sourceId` | 属性 | <code>sourceId: string</code> | source Id 字段。 |
| `sourceType` | 属性 | <code>sourceType: MemoryExtractionSourceType</code> | source Type 字段。 |
| `timestamp` | 属性 | <code>timestamp: string</code> | timestamp 字段。 |

## `MemoryExtractionJob` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | attempts 字段。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `cursorAfter` | 属性 | <code>cursorAfter: MemoryExtractionCursor</code> | cursor After 字段。 |
| `cursorBefore` | 属性 | <code>cursorBefore: MemoryExtractionCursor</code> | cursor Before 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `lastError` | 属性 | <code>lastError: NormalizedMemoryError</code> | last Error 字段。 |
| `leaseExpiresAt` | 属性 | <code>leaseExpiresAt: string</code> | lease Expires At 字段。 |
| `leaseOwner` | 属性 | <code>leaseOwner: string</code> | lease Owner 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `sourceRefs` | 属性 | <code>sourceRefs: MemoryExtractionSourceRef[]</code> | source Refs 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "queued" &#124; "running" &#124; "cancelled" &#124; "failed" &#124; "partial" &#124; "awaiting_review"</code> | status 字段。 |

## `MemoryExtractionProfileSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acceptedSourceTypes` | 属性 | <code>acceptedSourceTypes: MemoryExtractionSourceType[]</code> | accepted Source Types 字段。 |
| `candidateValidation` | 属性 | <code>candidateValidation: { minConfidence: number; requireCanonicalText: boolean; requireEvidence: boolean; maxCandidatesPerJob?: number; rejectInstructionLikeContent?: boolean; }</code> | candidate Validation 字段。 |
| `conversation` | 属性 | <code>conversation: { maxMessagesPerWindow: number; overlapMessages?: number; includeSystemMessages?: boolean; includeToolMessages?: boolean; extractionTrigger: "each_turn" &#124; "window" &#124; "run_end" &#124; "session_idle" &#124; "manual"; }</code> | conversation 字段。 |
| `episodic` | 属性 | <code>episodic: { boundary: "run" &#124; "workflow_state" &#124; "task" &#124; "time_window" &#124; "custom"; includeFailedEpisodes?: boolean; includeIntermediateObservations?: boolean; }</code> | episodic 字段。 |
| `extractor` | 属性 | <code>extractor: { type: "deterministic"; extractorRef: MemoryContractSpecRef; } &#124; { type: "model"; modelProfileRef: MemoryContractSpecRef; promptTemplateRef: MemoryContractSpecRef; } &#124; { type: "provider"; providerRef: MemoryContractSpecRef; } &#124; { type: "hybrid"; stages: MemoryExtractionStageSpec[]; }</code> | extractor 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `maintenancePolicyRef` | 属性 | <code>maintenancePolicyRef: MemoryContractSpecRef</code> | maintenance Policy Ref 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `outputMemoryTypes` | 属性 | <code>outputMemoryTypes: ManagedMemoryType[]</code> | output Memory Types 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `sensitiveDataPolicyRef` | 属性 | <code>sensitiveDataPolicyRef: MemoryContractSpecRef</code> | sensitive Data Policy Ref 字段。 |
| `truth` | 属性 | <code>truth: { minimumAuthority: TruthAssertion["authority"]; requireEvidence?: boolean; preserveValidityInterval?: boolean; }</code> | truth 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
| `writePolicyRef` | 属性 | <code>writePolicyRef: MemoryContractSpecRef</code> | write Policy Ref 字段。 |

## `MemoryExtractionRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `force` | 属性 | <code>force: boolean</code> | force 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `mode` | 属性 | <code>mode: "sync" &#124; "async"</code> | mode 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `sources` | 属性 | <code>sources: MemoryExtractionSourceRef[]</code> | sources 字段。 |

## `MemoryExtractionSourceAdapter` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `load` | 方法 | <code>load(refs: MemoryExtractionSourceRef[], cursor?: MemoryExtractionCursor): Promise&lt;MemoryExtractionSourceBatch&lt;T&gt;&gt;</code> | 加载 load。 |
| `normalize` | 方法 | <code>normalize(batch: MemoryExtractionSourceBatch&lt;T&gt;): Promise&lt;NormalizedExtractionInput[]&gt;</code> | 规范化 normalize。 |
| `type` | 属性 | <code>type: MemoryExtractionSourceType</code> | type 字段。 |

## `MemoryExtractionSourceBatch` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `items` | 属性 | <code>items: { sourceRef: MemoryExtractionSourceRef; value: T; }[]</code> | items 字段。 |
| `nextCursor` | 属性 | <code>nextCursor: MemoryExtractionCursor</code> | next Cursor 字段。 |
| `sourceRefs` | 属性 | <code>sourceRefs: MemoryExtractionSourceRef[]</code> | source Refs 字段。 |

## `MemoryExtractionSourceRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `authority` | 属性 | <code>authority: "verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"</code> | authority 字段。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | event Ids 字段。 |
| `messageIds` | 属性 | <code>messageIds: string[]</code> | message Ids 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `observedAt` | 属性 | <code>observedAt: string</code> | observed At 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `sourceHash` | 属性 | <code>sourceHash: string</code> | source Hash 字段。 |
| `sourceId` | 属性 | <code>sourceId: string</code> | source Id 字段。 |
| `sourceVersion` | 属性 | <code>sourceVersion: string</code> | source Version 字段。 |
| `trustScore` | 属性 | <code>trustScore: number</code> | trust Score 字段。 |
| `type` | 属性 | <code>type: MemoryExtractionSourceType</code> | type 字段。 |
| `validFrom` | 属性 | <code>validFrom: string</code> | valid From 字段。 |
| `validTo` | 属性 | <code>validTo: string</code> | valid To 字段。 |

## `MemoryExtractionStageSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `handlerRef` | 属性 | <code>handlerRef: MemoryContractSpecRef</code> | handler Ref 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `optional` | 属性 | <code>optional: boolean</code> | optional 字段。 |
| `retryPolicy` | 属性 | <code>retryPolicy: Record&lt;string, unknown&gt;</code> | retry Policy 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |
| `type` | 属性 | <code>type: "custom" &#124; "validate" &#124; "normalize" &#124; "classify" &#124; "extract" &#124; "enrich"</code> | type 字段。 |

## `MemoryExtractor` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `extract` | 方法 | <code>extract(inputs: NormalizedExtractionInput[], profile: MemoryExtractionProfileSpec): Promise&lt;ExtractedMemoryCandidate[]&gt;</code> | extract 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |

## `MemoryMaintenanceApplyRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidate` | 属性 | <code>candidate: ExtractedMemoryCandidate</code> | candidate 字段。 |
| `decision` | 属性 | <code>decision: MemoryMaintenanceDecision</code> | decision 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |

## `MemoryMaintenanceDecision` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `action` | 属性 | <code>action: MemoryMaintenanceAction</code> | action 字段。 |
| `authorityComparison` | 属性 | <code>authorityComparison: "unknown" &#124; "candidate_higher" &#124; "existing_higher" &#124; "equal"</code> | authority Comparison 字段。 |
| `candidateId` | 属性 | <code>candidateId: string</code> | candidate Id 字段。 |
| `conflictScore` | 属性 | <code>conflictScore: number</code> | conflict Score 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `duplicateScore` | 属性 | <code>duplicateScore: number</code> | duplicate Score 字段。 |
| `expectedRevisions` | 属性 | <code>expectedRevisions: Record&lt;string, number&gt;</code> | expected Revisions 字段。 |
| `explanation` | 属性 | <code>explanation: string</code> | explanation 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `mergedContent` | 属性 | <code>mergedContent: unknown</code> | merged Content 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `patch` | 属性 | <code>patch: MemoryPatch</code> | patch 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `reasonCode` | 属性 | <code>reasonCode: "CUSTOM" &#124; "NEW_FACT" &#124; "EXACT_DUPLICATE" &#124; "SEMANTIC_DUPLICATE" &#124; "ADDITIONAL_EVIDENCE" &#124; "FACT_CORRECTION" &#124; "TEMPORAL_UPDATE" &#124; "AUTHORITY_OVERRIDE" &#124; "CONFLICT_REQUIRES_REVIEW" &#124; "LOW_CONFIDENCE" &#124; "POLICY_REJECTED"</code> | reason Code 字段。 |
| `recordsToInvalidate` | 属性 | <code>recordsToInvalidate: string[]</code> | records To Invalidate 字段。 |
| `relationsToCreate` | 属性 | <code>relationsToCreate: MemoryRelation[]</code> | relations To Create 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `targetMemoryIds` | 属性 | <code>targetMemoryIds: string[]</code> | target Memory Ids 字段。 |

## `MemoryMaintenancePlanner` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apply` | 方法 | <code>apply(request: MemoryMaintenanceApplyRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 应用 apply。 |
| `explain` | 方法 | <code>explain(decisionId: string): Promise&lt;MemoryMaintenanceDecision &#124; null&gt;</code> | explain 的公开运行时操作。 |
| `plan` | 方法 | <code>plan(request: MemoryMaintenancePlanRequest): Promise&lt;MemoryMaintenanceDecision&gt;</code> | 规划 plan。 |

## `MemoryMaintenancePlanRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidate` | 属性 | <code>candidate: ExtractedMemoryCandidate</code> | candidate 字段。 |
| `existingRecords` | 属性 | <code>existingRecords: ManagedMemoryRecord&lt;unknown&gt;[]</code> | existing Records 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `policy` | 属性 | <code>policy: MemoryMaintenancePolicySpec</code> | policy 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |

## `MemoryMaintenancePolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `conflictResolution` | 属性 | <code>conflictResolution: "prefer_latest" &#124; "prefer_verified" &#124; "require_review" &#124; "keep_both_marked" &#124; "prefer_authoritative" &#124; "invalidate_old"</code> | conflict Resolution 字段。 |
| `duplicateResolution` | 属性 | <code>duplicateResolution: "reuse_existing" &#124; "increase_support" &#124; "create_version" &#124; "require_review"</code> | duplicate Resolution 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `preWriteRetrieval` | 属性 | <code>preWriteRetrieval: { enabled: boolean; exactKeyLookup: boolean; semanticLookup?: boolean; maxCandidates: number; semanticThreshold?: number; includeSuperseded?: boolean; includeInvalidated?: boolean; }</code> | pre Write Retrieval 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `updateResolution` | 属性 | <code>updateResolution: "create_version" &#124; "require_review" &#124; "patch_current" &#124; "supersede"</code> | update Resolution 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `NormalizedExtractionInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalText` | 属性 | <code>canonicalText: string</code> | canonical Text 字段。 |
| `sourceRef` | 属性 | <code>sourceRef: MemoryExtractionSourceRef</code> | source Ref 字段。 |
| `value` | 属性 | <code>value: unknown</code> | value 字段。 |

## `TruthAssertion` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertionId` | 属性 | <code>assertionId: string</code> | assertion Id 字段。 |
| `authority` | 属性 | <code>authority: "user_confirmed" &#124; "human_reviewed" &#124; "system_of_record" &#124; "policy_defined"</code> | authority 字段。 |
| `confidence` | 属性 | <code>confidence: number</code> | confidence 字段。 |
| `evidenceRefs` | 属性 | <code>evidenceRefs: string[]</code> | evidence Refs 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `object` | 属性 | <code>object: unknown</code> | object 字段。 |
| `predicate` | 属性 | <code>predicate: string</code> | predicate 字段。 |
| `subject` | 属性 | <code>subject: string</code> | subject 字段。 |
| `supersedesAssertionId` | 属性 | <code>supersedesAssertionId: string</code> | supersedes Assertion Id 字段。 |
| `validFrom` | 属性 | <code>validFrom: string</code> | valid From 字段。 |
| `validTo` | 属性 | <code>validTo: string</code> | valid To 字段。 |
