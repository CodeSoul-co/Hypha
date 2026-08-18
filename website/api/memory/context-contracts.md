# `@codesoul-co/hypha-memory` / `context-contracts`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/context-contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)
- Exports: **29**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ContextBudgetPlan` | interface | <code>interface ContextBudgetPlan</code> | Field contract for Context Budget Plan; see all contract members below. |
| `ContextBuildExplanation` | interface | <code>interface ContextBuildExplanation</code> | Field contract for Context Build Explanation; see all contract members below. |
| `ContextBuildInput` | interface | <code>interface ContextBuildInput extends ContextBuildRequest</code> | Field contract for Context Build Input; see all contract members below. |
| `ContextBuildRequest` | interface | <code>interface ContextBuildRequest</code> | Field contract for Context Build Request; see all contract members below. |
| `ContextBundle` | interface | <code>interface ContextBundle</code> | Field contract for Context Bundle; see all contract members below. |
| `ContextCompactionPolicySpec` | interface | <code>interface ContextCompactionPolicySpec</code> | Field contract for Context Compaction Policy Spec; see all contract members below. |
| `ContextConflict` | interface | <code>interface ContextConflict</code> | Field contract for Context Conflict; see all contract members below. |
| `ContextEnvelope` | interface | <code>interface ContextEnvelope</code> | Field contract for Context Envelope; see all contract members below. |
| `ContextInjectionGateway` | interface | <code>interface ContextInjectionGateway</code> | Field contract for Context Injection Gateway; see all contract members below. |
| `ContextItem` | interface | <code>interface ContextItem</code> | Field contract for Context Item; see all contract members below. |
| `ContextItemPolicyDecision` | interface | <code>interface ContextItemPolicyDecision</code> | Field contract for Context Item Policy Decision; see all contract members below. |
| `ContextItemPolicyEvaluator` | interface | <code>interface ContextItemPolicyEvaluator</code> | Field contract for Context Item Policy Evaluator; see all contract members below. |
| `ContextItemPolicyInput` | interface | <code>interface ContextItemPolicyInput</code> | Field contract for Context Item Policy Input; see all contract members below. |
| `ContextProfileSpec` | interface | <code>interface ContextProfileSpec</code> | Field contract for Context Profile Spec; see all contract members below. |
| `ContextProvenanceLabel` | interface | <code>interface ContextProvenanceLabel</code> | Field contract for Context Provenance Label; see all contract members below. |
| `ContextRankingPolicySpec` | interface | <code>interface ContextRankingPolicySpec</code> | Field contract for Context Ranking Policy Spec; see all contract members below. |
| `ContextRejectedItem` | interface | <code>interface ContextRejectedItem</code> | Field contract for Context Rejected Item; see all contract members below. |
| `ContextSourceBudget` | interface | <code>interface ContextSourceBudget</code> | Field contract for Context Source Budget; see all contract members below. |
| `ContextSourceResolutionInput` | interface | <code>interface ContextSourceResolutionInput extends ResolvedContextBuildInput</code> | Field contract for Context Source Resolution Input; see all contract members below. |
| `ContextSourceResolver` | interface | <code>interface ContextSourceResolver</code> | Field contract for Context Source Resolver; see all contract members below. |
| `ContextSourceResolverRegistry` | interface | <code>interface ContextSourceResolverRegistry</code> | Field contract for Context Source Resolver Registry; see all contract members below. |
| `ContextSourceSpec` | interface | <code>interface ContextSourceSpec</code> | Field contract for Context Source Spec; see all contract members below. |
| `ContextTruncationPolicySpec` | interface | <code>interface ContextTruncationPolicySpec</code> | Field contract for Context Truncation Policy Spec; see all contract members below. |
| `ContextTruncationRecord` | interface | <code>interface ContextTruncationRecord</code> | Field contract for Context Truncation Record; see all contract members below. |
| `MemoryContextBuilder` | interface | <code>interface MemoryContextBuilder</code> | Field contract for Memory Context Builder; see all contract members below. |
| `PromptSegment` | interface | <code>interface PromptSegment</code> | Field contract for Prompt Segment; see all contract members below. |
| `ResolvedContextBuildInput` | interface | <code>interface ResolvedContextBuildInput extends ContextBuildRequest</code> | Field contract for Resolved Context Build Input; see all contract members below. |
| `TokenEstimator` | interface | <code>interface TokenEstimator</code> | Field contract for Token Estimator; see all contract members below. |
| `ContextSourceType` | type | <code>type ContextSourceType = 'system' &#124; 'workflow_state' &#124; 'messages' &#124; 'working_memory' &#124; 'long_term_memory' &#124; 'tool_observation' &#124; 'artifact' &#124; 'human_review' &#124; 'custom'</code> | Public type alias for Context Source Type. |

## `ContextBudgetPlan` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dynamicTokens` | property | <code>dynamicTokens: number</code> | Public dynamic Tokens property. |
| `fixedTokens` | property | <code>fixedTokens: number</code> | Public fixed Tokens property. |
| `safetyMarginTokens` | property | <code>safetyMarginTokens: number</code> | Public safety Margin Tokens property. |
| `sourceBudgets` | property | <code>sourceBudgets: ContextSourceBudget[]</code> | Public source Budgets property. |
| `tokenizerRef` | property | <code>tokenizerRef: MemoryContractSpecRef</code> | Public tokenizer Ref property. |
| `totalAvailableTokens` | property | <code>totalAvailableTokens: number</code> | Public total Available Tokens property. |

## `ContextBuildExplanation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `budgetPlan` | property | <code>budgetPlan: ContextBudgetPlan</code> | Public budget Plan property. |
| `contextHash` | property | <code>contextHash: string</code> | Public context Hash property. |
| `omittedItemIds` | property | <code>omittedItemIds: string[]</code> | Public omitted Item Ids property. |
| `ranking` | property | <code>ranking: { itemId: string; score: number; reasons: string[]; }[]</code> | Public ranking property. |
| `rejectedItems` | property | <code>rejectedItems: ContextRejectedItem[]</code> | Public rejected Items property. |
| `selectedItemIds` | property | <code>selectedItemIds: string[]</code> | Public selected Item Ids property. |

## `ContextBuildInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `explicitSourceRefs` | property | <code>explicitSourceRefs: string[]</code> | Public explicit Source Refs property. |
| `messageCursor` | property | <code>messageCursor: string</code> | Public message Cursor property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelContextWindowTokens` | property | <code>modelContextWindowTokens: number</code> | Public model Context Window Tokens property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `previousContextHash` | property | <code>previousContextHash: string</code> | Public previous Context Hash property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `profile` | property | <code>profile: ContextProfileSpec</code> | Public profile property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `query` | property | <code>query: string</code> | Public query property. |
| `reservedInstructionTokens` | property | <code>reservedInstructionTokens: number</code> | Public reserved Instruction Tokens property. |
| `reservedOutputTokens` | property | <code>reservedOutputTokens: number</code> | Public reserved Output Tokens property. |
| `reservedSystemTokens` | property | <code>reservedSystemTokens: number</code> | Public reserved System Tokens property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `runtimeStateRef` | property | <code>runtimeStateRef: string</code> | Public runtime State Ref property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `sourceItems` | property | <code>sourceItems: ContextItem[]</code> | Public source Items property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tokenizerRef` | property | <code>tokenizerRef: MemoryContractSpecRef</code> | Public tokenizer Ref property. |

## `ContextBuildRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `explicitSourceRefs` | property | <code>explicitSourceRefs: string[]</code> | Public explicit Source Refs property. |
| `messageCursor` | property | <code>messageCursor: string</code> | Public message Cursor property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelContextWindowTokens` | property | <code>modelContextWindowTokens: number</code> | Public model Context Window Tokens property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `previousContextHash` | property | <code>previousContextHash: string</code> | Public previous Context Hash property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `query` | property | <code>query: string</code> | Public query property. |
| `reservedInstructionTokens` | property | <code>reservedInstructionTokens: number</code> | Public reserved Instruction Tokens property. |
| `reservedOutputTokens` | property | <code>reservedOutputTokens: number</code> | Public reserved Output Tokens property. |
| `reservedSystemTokens` | property | <code>reservedSystemTokens: number</code> | Public reserved System Tokens property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `runtimeStateRef` | property | <code>runtimeStateRef: string</code> | Public runtime State Ref property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |

## `ContextBundle` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs: ContextArtifactRef[]</code> | Public artifact Refs property. |
| `conflicts` | property | <code>conflicts: ContextConflict[]</code> | Public conflicts property. |
| `contextHash` | property | <code>contextHash: string</code> | Public context Hash property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `items` | property | <code>items: ContextItem[]</code> | Public items property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `omittedItemIds` | property | <code>omittedItemIds: string[]</code> | Public omitted Item Ids property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `rejectedItems` | property | <code>rejectedItems: ContextRejectedItem[]</code> | Public rejected Items property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sourceHashes` | property | <code>sourceHashes: Record&lt;string, string&gt;</code> | Public source Hashes property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `totalCharacters` | property | <code>totalCharacters: number</code> | Public total Characters property. |
| `totalTokens` | property | <code>totalTokens: number</code> | Public total Tokens property. |

## `ContextCompactionPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enabled` | property | <code>enabled: boolean</code> | Public enabled property. |
| `persistSummaryAsMemory` | property | <code>persistSummaryAsMemory: boolean</code> | Public persist Summary As Memory property. |
| `preserveLastMessages` | property | <code>preserveLastMessages: number</code> | Public preserve Last Messages property. |
| `summaryMemoryType` | property | <code>summaryMemoryType: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").ManagedMemoryType</code> | Public summary Memory Type property. |
| `summaryProviderRef` | property | <code>summaryProviderRef: MemoryContractSpecRef</code> | Public summary Provider Ref property. |
| `triggerRatio` | property | <code>triggerRatio: number</code> | Public trigger Ratio property. |

## `ContextConflict` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `conflictGroupId` | property | <code>conflictGroupId: string</code> | Public conflict Group Id property. |
| `itemIds` | property | <code>itemIds: string[]</code> | Public item Ids property. |
| `resolution` | property | <code>resolution: string</code> | Public resolution property. |

## `ContextEnvelope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs: ContextArtifactRef[]</code> | Public artifact Refs property. |
| `budgetPlan` | property | <code>budgetPlan: ContextBudgetPlan</code> | Public budget Plan property. |
| `conflicts` | property | <code>conflicts: ContextConflict[]</code> | Public conflicts property. |
| `contextHash` | property | <code>contextHash: string</code> | Public context Hash property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `dataSegments` | property | <code>dataSegments: PromptSegment[]</code> | Public data Segments property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `includedSourceRefs` | property | <code>includedSourceRefs: string[]</code> | Public included Source Refs property. |
| `instructionSegments` | property | <code>instructionSegments: PromptSegment[]</code> | Public instruction Segments property. |
| `omittedSourceRefs` | property | <code>omittedSourceRefs: string[]</code> | Public omitted Source Refs property. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `provenanceIndex` | property | <code>provenanceIndex: Record&lt;string, ContextProvenanceLabel&gt;</code> | Public provenance Index property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `systemSegments` | property | <code>systemSegments: PromptSegment[]</code> | Public system Segments property. |
| `totalTokens` | property | <code>totalTokens: number</code> | Public total Tokens property. |
| `truncationRecords` | property | <code>truncationRecords: ContextTruncationRecord[]</code> | Public truncation Records property. |

## `ContextInjectionGateway` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `buildEnvelope` | method | <code>buildEnvelope(bundle: ContextBundle, profile: ContextProfileSpec): Promise&lt;ContextEnvelope&gt;</code> | Builds Envelope at this module boundary. |

## `ContextItem` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: ContextArtifactRef</code> | Public artifact Ref property. |
| `conflictGroupId` | property | <code>conflictGroupId: string</code> | Public conflict Group Id property. |
| `content` | property | <code>content: unknown</code> | Public content property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `provenance` | property | <code>provenance: Record&lt;string, unknown&gt; &#124; MemoryProvenance</code> | Public provenance property. |
| `required` | property | <code>required: boolean</code> | Public required property. |
| `score` | property | <code>score: number</code> | Public score property. |
| `sourceId` | property | <code>sourceId: string</code> | Public source Id property. |
| `sourceType` | property | <code>sourceType: ContextSourceType</code> | Public source Type property. |
| `text` | property | <code>text: string</code> | Public text property. |
| `tokenEstimate` | property | <code>tokenEstimate: number</code> | Public token Estimate property. |
| `untrusted` | property | <code>untrusted: boolean</code> | Public untrusted property. |

## `ContextItemPolicyDecision` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowed` | property | <code>allowed: boolean</code> | Public allowed property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |

## `ContextItemPolicyEvaluator` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluate` | method | <code>evaluate(input: ContextItemPolicyInput): Promise&lt;ContextItemPolicyDecision&gt;</code> | Evaluates evaluate at this module boundary. |

## `ContextItemPolicyInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `item` | property | <code>item: ContextItem</code> | Public item property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |

## `ContextProfileSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compactionPolicy` | property | <code>compactionPolicy: ContextCompactionPolicySpec</code> | Public compaction Policy property. |
| `conflictPolicy` | property | <code>conflictPolicy: "include_marked" &#124; "prefer_latest" &#124; "prefer_verified"</code> | Public conflict Policy property. |
| `deduplication` | property | <code>deduplication: "none" &#124; "id" &#124; "semantic" &#124; "hash"</code> | Public deduplication property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `includeProvenance` | property | <code>includeProvenance: boolean</code> | Public include Provenance property. |
| `includeScores` | property | <code>includeScores: boolean</code> | Public include Scores property. |
| `instructionBoundary` | property | <code>instructionBoundary: "strict" &#124; "tagged" &#124; "quoted"</code> | Public instruction Boundary property. |
| `maxCharacters` | property | <code>maxCharacters: number</code> | Public max Characters property. |
| `maxItems` | property | <code>maxItems: number</code> | Public max Items property. |
| `maxSerializedBytes` | property | <code>maxSerializedBytes: number</code> | Public max Serialized Bytes property. |
| `maxTokens` | property | <code>maxTokens: number</code> | Public max Tokens property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `ranking` | property | <code>ranking: ContextRankingPolicySpec</code> | Public ranking property. |
| `reservedOutputTokens` | property | <code>reservedOutputTokens: number</code> | Public reserved Output Tokens property. |
| `reservedSystemTokens` | property | <code>reservedSystemTokens: number</code> | Public reserved System Tokens property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `semanticDedupThreshold` | property | <code>semanticDedupThreshold: number</code> | Public semantic Dedup Threshold property. |
| `sources` | property | <code>sources: ContextSourceSpec[]</code> | Public sources property. |
| `truncation` | property | <code>truncation: ContextTruncationPolicySpec</code> | Public truncation property. |
| `untrustedContentPolicy` | property | <code>untrustedContentPolicy: "reject" &#124; "escape" &#124; "tag"</code> | Public untrusted Content Policy property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ContextProvenanceLabel` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authority` | property | <code>authority: "verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"</code> | Public authority property. |
| `citationLabel` | property | <code>citationLabel: string</code> | Public citation Label property. |
| `memoryId` | property | <code>memoryId: string</code> | Public memory Id property. |
| `memoryVersionId` | property | <code>memoryVersionId: string</code> | Public memory Version Id property. |
| `observedAt` | property | <code>observedAt: string</code> | Public observed At property. |
| `sourceId` | property | <code>sourceId: string</code> | Public source Id property. |
| `sourceType` | property | <code>sourceType: ContextSourceType</code> | Public source Type property. |

## `ContextRankingPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `confidenceWeight` | property | <code>confidenceWeight: number</code> | Public confidence Weight property. |
| `importanceWeight` | property | <code>importanceWeight: number</code> | Public importance Weight property. |
| `method` | property | <code>method: "custom" &#124; "priority" &#124; "score_fusion" &#124; "reranker"</code> | Public method property. |
| `provenanceWeight` | property | <code>provenanceWeight: number</code> | Public provenance Weight property. |
| `recencyWeight` | property | <code>recencyWeight: number</code> | Public recency Weight property. |
| `relevanceWeight` | property | <code>relevanceWeight: number</code> | Public relevance Weight property. |
| `rerankerProviderRef` | property | <code>rerankerProviderRef: MemoryContractSpecRef</code> | Public reranker Provider Ref property. |
| `sourceWeights` | property | <code>sourceWeights: Record&lt;string, number&gt;</code> | Public source Weights property. |

## `ContextRejectedItem` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `itemId` | property | <code>itemId: string</code> | Public item Id property. |
| `reason` | property | <code>reason: "policy_denied" &#124; "duplicate" &#124; "scope_denied" &#124; "invalid_status" &#124; "budget_exceeded" &#124; "untrusted_rejected" &#124; "invalid_input"</code> | Public reason property. |

## `ContextSourceBudget` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxTokens` | property | <code>maxTokens: number</code> | Public max Tokens property. |
| `minTokens` | property | <code>minTokens: number</code> | Public min Tokens property. |
| `overflowPolicy` | property | <code>overflowPolicy: "fail" &#124; "summarize" &#124; "drop" &#124; "truncate" &#124; "spill_to_artifact"</code> | Public overflow Policy property. |
| `required` | property | <code>required: boolean</code> | Public required property. |
| `sourceId` | property | <code>sourceId: string</code> | Public source Id property. |
| `targetTokens` | property | <code>targetTokens: number</code> | Public target Tokens property. |

## `ContextSourceResolutionInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `explicitSourceRefs` | property | <code>explicitSourceRefs: string[]</code> | Public explicit Source Refs property. |
| `messageCursor` | property | <code>messageCursor: string</code> | Public message Cursor property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelContextWindowTokens` | property | <code>modelContextWindowTokens: number</code> | Public model Context Window Tokens property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `previousContextHash` | property | <code>previousContextHash: string</code> | Public previous Context Hash property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `profile` | property | <code>profile: ContextProfileSpec</code> | Public profile property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `query` | property | <code>query: string</code> | Public query property. |
| `reservedInstructionTokens` | property | <code>reservedInstructionTokens: number</code> | Public reserved Instruction Tokens property. |
| `reservedOutputTokens` | property | <code>reservedOutputTokens: number</code> | Public reserved Output Tokens property. |
| `reservedSystemTokens` | property | <code>reservedSystemTokens: number</code> | Public reserved System Tokens property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `runtimeStateRef` | property | <code>runtimeStateRef: string</code> | Public runtime State Ref property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `source` | property | <code>source: ContextSourceSpec</code> | Public source property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tokenizerRef` | property | <code>tokenizerRef: MemoryContractSpecRef</code> | Public tokenizer Ref property. |

## `ContextSourceResolver` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `resolve` | method | <code>resolve(request: ContextSourceResolutionInput): Promise&lt;ContextItem[]&gt;</code> | Resolves resolve at this module boundary. |
| `supports` | method | <code>supports(source: ContextSourceSpec): boolean</code> | Public runtime operation for supports. |

## `ContextSourceResolverRegistry` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `resolve` | method | <code>resolve(request: ResolvedContextBuildInput): Promise&lt;ContextItem[]&gt;</code> | Resolves resolve at this module boundary. |

## `ContextSourceSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filters` | property | <code>filters: Record&lt;string, unknown&gt;</code> | Public filters property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `maxItems` | property | <code>maxItems: number</code> | Public max Items property. |
| `maxTokens` | property | <code>maxTokens: number</code> | Public max Tokens property. |
| `overflowPolicy` | property | <code>overflowPolicy: "fail" &#124; "summarize" &#124; "drop" &#124; "truncate" &#124; "spill_to_artifact"</code> | Public overflow Policy property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `ref` | property | <code>ref: MemoryContractSpecRef</code> | Public ref property. |
| `required` | property | <code>required: boolean</code> | Public required property. |
| `type` | property | <code>type: ContextSourceType</code> | Public type property. |

## `ContextTruncationPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `method` | property | <code>method: "hybrid" &#124; "summarize" &#124; "drop_lowest" &#124; "truncate_items"</code> | Public method property. |
| `minItemTokens` | property | <code>minItemTokens: number</code> | Public min Item Tokens property. |
| `preserveLatestMessages` | property | <code>preserveLatestMessages: number</code> | Public preserve Latest Messages property. |
| `preserveRequiredSources` | property | <code>preserveRequiredSources: boolean</code> | Public preserve Required Sources property. |
| `truncationMarker` | property | <code>truncationMarker: string</code> | Public truncation Marker property. |

## `ContextTruncationRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `itemId` | property | <code>itemId: string</code> | Public item Id property. |
| `method` | property | <code>method: "summarize" &#124; "drop" &#124; "truncate" &#124; "spill_to_artifact"</code> | Public method property. |
| `originalTokens` | property | <code>originalTokens: number</code> | Public original Tokens property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `retainedTokens` | property | <code>retainedTokens: number</code> | Public retained Tokens property. |

## `MemoryContextBuilder` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(request: ContextBuildInput): Promise&lt;ContextBundle&gt;</code> | Builds build at this module boundary. |
| `explain` | method | <code>explain(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | Public runtime operation for explain. |

## `PromptSegment` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs: ContextArtifactRef[]</code> | Public artifact Refs property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `required` | property | <code>required: boolean</code> | Public required property. |
| `role` | property | <code>role: "system" &#124; "tool" &#124; "user" &#124; "assistant" &#124; "developer" &#124; "data"</code> | Public role property. |
| `sourceRefs` | property | <code>sourceRefs: string[]</code> | Public source Refs property. |
| `text` | property | <code>text: string</code> | Public text property. |
| `tokenCount` | property | <code>tokenCount: number</code> | Public token Count property. |
| `trustLevel` | property | <code>trustLevel: "trusted_instruction" &#124; "trusted_data" &#124; "untrusted_data"</code> | Public trust Level property. |

## `ResolvedContextBuildInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `explicitSourceRefs` | property | <code>explicitSourceRefs: string[]</code> | Public explicit Source Refs property. |
| `messageCursor` | property | <code>messageCursor: string</code> | Public message Cursor property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelContextWindowTokens` | property | <code>modelContextWindowTokens: number</code> | Public model Context Window Tokens property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `previousContextHash` | property | <code>previousContextHash: string</code> | Public previous Context Hash property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `profile` | property | <code>profile: ContextProfileSpec</code> | Public profile property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `query` | property | <code>query: string</code> | Public query property. |
| `reservedInstructionTokens` | property | <code>reservedInstructionTokens: number</code> | Public reserved Instruction Tokens property. |
| `reservedOutputTokens` | property | <code>reservedOutputTokens: number</code> | Public reserved Output Tokens property. |
| `reservedSystemTokens` | property | <code>reservedSystemTokens: number</code> | Public reserved System Tokens property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `runtimeStateRef` | property | <code>runtimeStateRef: string</code> | Public runtime State Ref property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tokenizerRef` | property | <code>tokenizerRef: MemoryContractSpecRef</code> | Public tokenizer Ref property. |

## `TokenEstimator` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `estimate` | method | <code>estimate(text: string): number</code> | Public runtime operation for estimate. |
| `id` | property | <code>id: string</code> | Public id property. |
