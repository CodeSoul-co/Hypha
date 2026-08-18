# `@codesoul-co/hypha-memory` / `lifecycle-contracts`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/lifecycle-contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)
- Exports: **22**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `EpisodicRecordInput` | interface | <code>interface EpisodicRecordInput</code> | Field contract for Episodic Record Input; see all contract members below. |
| `ExtractedMemoryCandidate` | interface | <code>interface ExtractedMemoryCandidate</code> | Field contract for Extracted Memory Candidate; see all contract members below. |
| `ExtractedMemoryEvidence` | interface | <code>interface ExtractedMemoryEvidence</code> | Field contract for Extracted Memory Evidence; see all contract members below. |
| `MemoryExtractionBatch` | interface | <code>interface MemoryExtractionBatch</code> | Field contract for Memory Extraction Batch; see all contract members below. |
| `MemoryExtractionCursor` | interface | <code>interface MemoryExtractionCursor</code> | Field contract for Memory Extraction Cursor; see all contract members below. |
| `MemoryExtractionJob` | interface | <code>interface MemoryExtractionJob</code> | Field contract for Memory Extraction Job; see all contract members below. |
| `MemoryExtractionProfileSpec` | interface | <code>interface MemoryExtractionProfileSpec</code> | Field contract for Memory Extraction Profile Spec; see all contract members below. |
| `MemoryExtractionRequest` | interface | <code>interface MemoryExtractionRequest</code> | Field contract for Memory Extraction Request; see all contract members below. |
| `MemoryExtractionSourceAdapter` | interface | <code>interface MemoryExtractionSourceAdapter</code> | Field contract for Memory Extraction Source Adapter; see all contract members below. |
| `MemoryExtractionSourceBatch` | interface | <code>interface MemoryExtractionSourceBatch</code> | Field contract for Memory Extraction Source Batch; see all contract members below. |
| `MemoryExtractionSourceRef` | interface | <code>interface MemoryExtractionSourceRef</code> | Field contract for Memory Extraction Source Ref; see all contract members below. |
| `MemoryExtractionStageSpec` | interface | <code>interface MemoryExtractionStageSpec</code> | Field contract for Memory Extraction Stage Spec; see all contract members below. |
| `MemoryExtractor` | interface | <code>interface MemoryExtractor</code> | Field contract for Memory Extractor; see all contract members below. |
| `MemoryMaintenanceApplyRequest` | interface | <code>interface MemoryMaintenanceApplyRequest</code> | Field contract for Memory Maintenance Apply Request; see all contract members below. |
| `MemoryMaintenanceDecision` | interface | <code>interface MemoryMaintenanceDecision</code> | Field contract for Memory Maintenance Decision; see all contract members below. |
| `MemoryMaintenancePlanner` | interface | <code>interface MemoryMaintenancePlanner</code> | Field contract for Memory Maintenance Planner; see all contract members below. |
| `MemoryMaintenancePlanRequest` | interface | <code>interface MemoryMaintenancePlanRequest</code> | Field contract for Memory Maintenance Plan Request; see all contract members below. |
| `MemoryMaintenancePolicySpec` | interface | <code>interface MemoryMaintenancePolicySpec</code> | Field contract for Memory Maintenance Policy Spec; see all contract members below. |
| `NormalizedExtractionInput` | interface | <code>interface NormalizedExtractionInput</code> | Field contract for Normalized Extraction Input; see all contract members below. |
| `TruthAssertion` | interface | <code>interface TruthAssertion</code> | Field contract for Truth Assertion; see all contract members below. |
| `MemoryExtractionSourceType` | type | <code>type MemoryExtractionSourceType = 'conversation' &#124; 'truth' &#124; 'episodic_record' &#124; 'runtime_event' &#124; 'tool_observation' &#124; 'artifact' &#124; 'structured_record' &#124; 'custom'</code> | Public type alias for Memory Extraction Source Type. |
| `MemoryMaintenanceAction` | type | <code>type MemoryMaintenanceAction = 'create' &#124; 'noop' &#124; 'reuse' &#124; 'update' &#124; 'merge' &#124; 'supersede' &#124; 'invalidate' &#124; 'reject' &#124; 'require_review'</code> | Public type alias for Memory Maintenance Action. |

## `EpisodicRecordInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actions` | property | <code>actions: string[]</code> | Public actions property. |
| `actors` | property | <code>actors: string[]</code> | Public actors property. |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `causalEventIds` | property | <code>causalEventIds: string[]</code> | Public causal Event Ids property. |
| `endAt` | property | <code>endAt: string</code> | Public end At property. |
| `episodeId` | property | <code>episodeId: string</code> | Public episode Id property. |
| `failureCode` | property | <code>failureCode: string</code> | Public failure Code property. |
| `goal` | property | <code>goal: string</code> | Public goal property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `observations` | property | <code>observations: string[]</code> | Public observations property. |
| `outcome` | property | <code>outcome: unknown</code> | Public outcome property. |
| `startAt` | property | <code>startAt: string</code> | Public start At property. |
| `success` | property | <code>success: boolean</code> | Public success property. |
| `title` | property | <code>title: string</code> | Public title property. |

## `ExtractedMemoryCandidate` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authority` | property | <code>authority: "verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"</code> | Public authority property. |
| `candidateId` | property | <code>candidateId: string</code> | Public candidate Id property. |
| `canonicalKey` | property | <code>canonicalKey: string</code> | Public canonical Key property. |
| `canonicalText` | property | <code>canonicalText: string</code> | Public canonical Text property. |
| `confidence` | property | <code>confidence: number</code> | Public confidence property. |
| `content` | property | <code>content: unknown</code> | Public content property. |
| `entities` | property | <code>entities: MemoryEntityRef[]</code> | Public entities property. |
| `evidence` | property | <code>evidence: ExtractedMemoryEvidence[]</code> | Public evidence property. |
| `extractionProfileRevision` | property | <code>extractionProfileRevision: string</code> | Public extraction Profile Revision property. |
| `extractionRationale` | property | <code>extractionRationale: string</code> | Public extraction Rationale property. |
| `importance` | property | <code>importance: number</code> | Public importance property. |
| `object` | property | <code>object: unknown</code> | Public object property. |
| `predicate` | property | <code>predicate: string</code> | Public predicate property. |
| `relations` | property | <code>relations: MemoryRelation[]</code> | Public relations property. |
| `sensitive` | property | <code>sensitive: boolean</code> | Public sensitive property. |
| `sourceHash` | property | <code>sourceHash: string</code> | Public source Hash property. |
| `subject` | property | <code>subject: string</code> | Public subject property. |
| `summary` | property | <code>summary: string</code> | Public summary property. |
| `temporal` | property | <code>temporal: { observedAt?: string; validFrom?: string; validTo?: string; temporalConfidence?: number; }</code> | Public temporal property. |
| `type` | property | <code>type: ManagedMemoryType</code> | Public type property. |

## `ExtractedMemoryEvidence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `confidence` | property | <code>confidence: number</code> | Public confidence property. |
| `sourceRef` | property | <code>sourceRef: MemoryExtractionSourceRef</code> | Public source Ref property. |
| `sourceSpan` | property | <code>sourceSpan: { messageId?: string; eventId?: string; artifactRef?: string; start?: number; end?: number; quoteHash?: string; }</code> | Public source Span property. |
| `supportType` | property | <code>supportType: "derived" &#124; "direct" &#124; "contradicting"</code> | Public support Type property. |

## `MemoryExtractionBatch` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidates` | property | <code>candidates: ExtractedMemoryCandidate[]</code> | Public candidates property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `extractorVersion` | property | <code>extractorVersion: string</code> | Public extractor Version property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `jobId` | property | <code>jobId: string</code> | Public job Id property. |
| `modelObservationRef` | property | <code>modelObservationRef: string</code> | Public model Observation Ref property. |
| `rejectedCandidates` | property | <code>rejectedCandidates: MemoryRejectedItem[]</code> | Public rejected Candidates property. |
| `sourceHash` | property | <code>sourceHash: string</code> | Public source Hash property. |
| `sourceRefs` | property | <code>sourceRefs: MemoryExtractionSourceRef[]</code> | Public source Refs property. |

## `MemoryExtractionCursor` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `opaqueCursor` | property | <code>opaqueCursor: string</code> | Public opaque Cursor property. |
| `sequence` | property | <code>sequence: number</code> | Public sequence property. |
| `sourceHash` | property | <code>sourceHash: string</code> | Public source Hash property. |
| `sourceId` | property | <code>sourceId: string</code> | Public source Id property. |
| `sourceType` | property | <code>sourceType: MemoryExtractionSourceType</code> | Public source Type property. |
| `timestamp` | property | <code>timestamp: string</code> | Public timestamp property. |

## `MemoryExtractionJob` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public attempts property. |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `cursorAfter` | property | <code>cursorAfter: MemoryExtractionCursor</code> | Public cursor After property. |
| `cursorBefore` | property | <code>cursorBefore: MemoryExtractionCursor</code> | Public cursor Before property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `lastError` | property | <code>lastError: NormalizedMemoryError</code> | Public last Error property. |
| `leaseExpiresAt` | property | <code>leaseExpiresAt: string</code> | Public lease Expires At property. |
| `leaseOwner` | property | <code>leaseOwner: string</code> | Public lease Owner property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `sourceRefs` | property | <code>sourceRefs: MemoryExtractionSourceRef[]</code> | Public source Refs property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |
| `status` | property | <code>status: "completed" &#124; "queued" &#124; "running" &#124; "cancelled" &#124; "failed" &#124; "partial" &#124; "awaiting_review"</code> | Public status property. |

## `MemoryExtractionProfileSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acceptedSourceTypes` | property | <code>acceptedSourceTypes: MemoryExtractionSourceType[]</code> | Public accepted Source Types property. |
| `candidateValidation` | property | <code>candidateValidation: { minConfidence: number; requireCanonicalText: boolean; requireEvidence: boolean; maxCandidatesPerJob?: number; rejectInstructionLikeContent?: boolean; }</code> | Public candidate Validation property. |
| `conversation` | property | <code>conversation: { maxMessagesPerWindow: number; overlapMessages?: number; includeSystemMessages?: boolean; includeToolMessages?: boolean; extractionTrigger: "each_turn" &#124; "window" &#124; "run_end" &#124; "session_idle" &#124; "manual"; }</code> | Public conversation property. |
| `episodic` | property | <code>episodic: { boundary: "run" &#124; "workflow_state" &#124; "task" &#124; "time_window" &#124; "custom"; includeFailedEpisodes?: boolean; includeIntermediateObservations?: boolean; }</code> | Public episodic property. |
| `extractor` | property | <code>extractor: { type: "deterministic"; extractorRef: MemoryContractSpecRef; } &#124; { type: "model"; modelProfileRef: MemoryContractSpecRef; promptTemplateRef: MemoryContractSpecRef; } &#124; { type: "provider"; providerRef: MemoryContractSpecRef; } &#124; { type: "hybrid"; stages: MemoryExtractionStageSpec[]; }</code> | Public extractor property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `maintenancePolicyRef` | property | <code>maintenancePolicyRef: MemoryContractSpecRef</code> | Public maintenance Policy Ref property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `outputMemoryTypes` | property | <code>outputMemoryTypes: ManagedMemoryType[]</code> | Public output Memory Types property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `sensitiveDataPolicyRef` | property | <code>sensitiveDataPolicyRef: MemoryContractSpecRef</code> | Public sensitive Data Policy Ref property. |
| `truth` | property | <code>truth: { minimumAuthority: TruthAssertion["authority"]; requireEvidence?: boolean; preserveValidityInterval?: boolean; }</code> | Public truth property. |
| `version` | property | <code>version: string</code> | Public version property. |
| `writePolicyRef` | property | <code>writePolicyRef: MemoryContractSpecRef</code> | Public write Policy Ref property. |

## `MemoryExtractionRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `force` | property | <code>force: boolean</code> | Public force property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `mode` | property | <code>mode: "sync" &#124; "async"</code> | Public mode property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `sources` | property | <code>sources: MemoryExtractionSourceRef[]</code> | Public sources property. |

## `MemoryExtractionSourceAdapter` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `load` | method | <code>load(refs: MemoryExtractionSourceRef[], cursor?: MemoryExtractionCursor): Promise&lt;MemoryExtractionSourceBatch&lt;T&gt;&gt;</code> | Loads load at this module boundary. |
| `normalize` | method | <code>normalize(batch: MemoryExtractionSourceBatch&lt;T&gt;): Promise&lt;NormalizedExtractionInput[]&gt;</code> | Normalizes normalize at this module boundary. |
| `type` | property | <code>type: MemoryExtractionSourceType</code> | Public type property. |

## `MemoryExtractionSourceBatch` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `items` | property | <code>items: { sourceRef: MemoryExtractionSourceRef; value: T; }[]</code> | Public items property. |
| `nextCursor` | property | <code>nextCursor: MemoryExtractionCursor</code> | Public next Cursor property. |
| `sourceRefs` | property | <code>sourceRefs: MemoryExtractionSourceRef[]</code> | Public source Refs property. |

## `MemoryExtractionSourceRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `authority` | property | <code>authority: "verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"</code> | Public authority property. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public event Ids property. |
| `messageIds` | property | <code>messageIds: string[]</code> | Public message Ids property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `observedAt` | property | <code>observedAt: string</code> | Public observed At property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `sourceHash` | property | <code>sourceHash: string</code> | Public source Hash property. |
| `sourceId` | property | <code>sourceId: string</code> | Public source Id property. |
| `sourceVersion` | property | <code>sourceVersion: string</code> | Public source Version property. |
| `trustScore` | property | <code>trustScore: number</code> | Public trust Score property. |
| `type` | property | <code>type: MemoryExtractionSourceType</code> | Public type property. |
| `validFrom` | property | <code>validFrom: string</code> | Public valid From property. |
| `validTo` | property | <code>validTo: string</code> | Public valid To property. |

## `MemoryExtractionStageSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `handlerRef` | property | <code>handlerRef: MemoryContractSpecRef</code> | Public handler Ref property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `optional` | property | <code>optional: boolean</code> | Public optional property. |
| `retryPolicy` | property | <code>retryPolicy: Record&lt;string, unknown&gt;</code> | Public retry Policy property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |
| `type` | property | <code>type: "custom" &#124; "validate" &#124; "normalize" &#124; "classify" &#124; "extract" &#124; "enrich"</code> | Public type property. |

## `MemoryExtractor` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `extract` | method | <code>extract(inputs: NormalizedExtractionInput[], profile: MemoryExtractionProfileSpec): Promise&lt;ExtractedMemoryCandidate[]&gt;</code> | Public runtime operation for extract. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |

## `MemoryMaintenanceApplyRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidate` | property | <code>candidate: ExtractedMemoryCandidate</code> | Public candidate property. |
| `decision` | property | <code>decision: MemoryMaintenanceDecision</code> | Public decision property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |

## `MemoryMaintenanceDecision` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `action` | property | <code>action: MemoryMaintenanceAction</code> | Public action property. |
| `authorityComparison` | property | <code>authorityComparison: "unknown" &#124; "candidate_higher" &#124; "existing_higher" &#124; "equal"</code> | Public authority Comparison property. |
| `candidateId` | property | <code>candidateId: string</code> | Public candidate Id property. |
| `conflictScore` | property | <code>conflictScore: number</code> | Public conflict Score property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `duplicateScore` | property | <code>duplicateScore: number</code> | Public duplicate Score property. |
| `expectedRevisions` | property | <code>expectedRevisions: Record&lt;string, number&gt;</code> | Public expected Revisions property. |
| `explanation` | property | <code>explanation: string</code> | Public explanation property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `mergedContent` | property | <code>mergedContent: unknown</code> | Public merged Content property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `patch` | property | <code>patch: MemoryPatch</code> | Public patch property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `reasonCode` | property | <code>reasonCode: "CUSTOM" &#124; "NEW_FACT" &#124; "EXACT_DUPLICATE" &#124; "SEMANTIC_DUPLICATE" &#124; "ADDITIONAL_EVIDENCE" &#124; "FACT_CORRECTION" &#124; "TEMPORAL_UPDATE" &#124; "AUTHORITY_OVERRIDE" &#124; "CONFLICT_REQUIRES_REVIEW" &#124; "LOW_CONFIDENCE" &#124; "POLICY_REJECTED"</code> | Public reason Code property. |
| `recordsToInvalidate` | property | <code>recordsToInvalidate: string[]</code> | Public records To Invalidate property. |
| `relationsToCreate` | property | <code>relationsToCreate: MemoryRelation[]</code> | Public relations To Create property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `targetMemoryIds` | property | <code>targetMemoryIds: string[]</code> | Public target Memory Ids property. |

## `MemoryMaintenancePlanner` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apply` | method | <code>apply(request: MemoryMaintenanceApplyRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Applies apply at this module boundary. |
| `explain` | method | <code>explain(decisionId: string): Promise&lt;MemoryMaintenanceDecision &#124; null&gt;</code> | Public runtime operation for explain. |
| `plan` | method | <code>plan(request: MemoryMaintenancePlanRequest): Promise&lt;MemoryMaintenanceDecision&gt;</code> | Plans plan at this module boundary. |

## `MemoryMaintenancePlanRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidate` | property | <code>candidate: ExtractedMemoryCandidate</code> | Public candidate property. |
| `existingRecords` | property | <code>existingRecords: ManagedMemoryRecord&lt;unknown&gt;[]</code> | Public existing Records property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `policy` | property | <code>policy: MemoryMaintenancePolicySpec</code> | Public policy property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |

## `MemoryMaintenancePolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `conflictResolution` | property | <code>conflictResolution: "prefer_latest" &#124; "prefer_verified" &#124; "require_review" &#124; "keep_both_marked" &#124; "prefer_authoritative" &#124; "invalidate_old"</code> | Public conflict Resolution property. |
| `duplicateResolution` | property | <code>duplicateResolution: "reuse_existing" &#124; "increase_support" &#124; "create_version" &#124; "require_review"</code> | Public duplicate Resolution property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `preWriteRetrieval` | property | <code>preWriteRetrieval: { enabled: boolean; exactKeyLookup: boolean; semanticLookup?: boolean; maxCandidates: number; semanticThreshold?: number; includeSuperseded?: boolean; includeInvalidated?: boolean; }</code> | Public pre Write Retrieval property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `updateResolution` | property | <code>updateResolution: "create_version" &#124; "require_review" &#124; "patch_current" &#124; "supersede"</code> | Public update Resolution property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `NormalizedExtractionInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalText` | property | <code>canonicalText: string</code> | Public canonical Text property. |
| `sourceRef` | property | <code>sourceRef: MemoryExtractionSourceRef</code> | Public source Ref property. |
| `value` | property | <code>value: unknown</code> | Public value property. |

## `TruthAssertion` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertionId` | property | <code>assertionId: string</code> | Public assertion Id property. |
| `authority` | property | <code>authority: "user_confirmed" &#124; "human_reviewed" &#124; "system_of_record" &#124; "policy_defined"</code> | Public authority property. |
| `confidence` | property | <code>confidence: number</code> | Public confidence property. |
| `evidenceRefs` | property | <code>evidenceRefs: string[]</code> | Public evidence Refs property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `object` | property | <code>object: unknown</code> | Public object property. |
| `predicate` | property | <code>predicate: string</code> | Public predicate property. |
| `subject` | property | <code>subject: string</code> | Public subject property. |
| `supersedesAssertionId` | property | <code>supersedesAssertionId: string</code> | Public supersedes Assertion Id property. |
| `validFrom` | property | <code>validFrom: string</code> | Public valid From property. |
| `validTo` | property | <code>validTo: string</code> | Public valid To property. |
