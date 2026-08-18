# `@codesoul-co/hypha-memory` / `context-contracts`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/context-contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)
- 导出数: **29**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ContextBudgetPlan` | 接口 | <code>interface ContextBudgetPlan</code> | Context Budget Plan 的字段契约；完整字段见下表。 |
| `ContextBuildExplanation` | 接口 | <code>interface ContextBuildExplanation</code> | Context Build Explanation 的字段契约；完整字段见下表。 |
| `ContextBuildInput` | 接口 | <code>interface ContextBuildInput extends ContextBuildRequest</code> | Context Build Input 的字段契约；完整字段见下表。 |
| `ContextBuildRequest` | 接口 | <code>interface ContextBuildRequest</code> | Context Build Request 的字段契约；完整字段见下表。 |
| `ContextBundle` | 接口 | <code>interface ContextBundle</code> | Context Bundle 的字段契约；完整字段见下表。 |
| `ContextCompactionPolicySpec` | 接口 | <code>interface ContextCompactionPolicySpec</code> | Context Compaction Policy Spec 的字段契约；完整字段见下表。 |
| `ContextConflict` | 接口 | <code>interface ContextConflict</code> | Context Conflict 的字段契约；完整字段见下表。 |
| `ContextEnvelope` | 接口 | <code>interface ContextEnvelope</code> | Context Envelope 的字段契约；完整字段见下表。 |
| `ContextInjectionGateway` | 接口 | <code>interface ContextInjectionGateway</code> | Context Injection Gateway 的字段契约；完整字段见下表。 |
| `ContextItem` | 接口 | <code>interface ContextItem</code> | Context Item 的字段契约；完整字段见下表。 |
| `ContextItemPolicyDecision` | 接口 | <code>interface ContextItemPolicyDecision</code> | Context Item Policy Decision 的字段契约；完整字段见下表。 |
| `ContextItemPolicyEvaluator` | 接口 | <code>interface ContextItemPolicyEvaluator</code> | Context Item Policy Evaluator 的字段契约；完整字段见下表。 |
| `ContextItemPolicyInput` | 接口 | <code>interface ContextItemPolicyInput</code> | Context Item Policy Input 的字段契约；完整字段见下表。 |
| `ContextProfileSpec` | 接口 | <code>interface ContextProfileSpec</code> | Context Profile Spec 的字段契约；完整字段见下表。 |
| `ContextProvenanceLabel` | 接口 | <code>interface ContextProvenanceLabel</code> | Context Provenance Label 的字段契约；完整字段见下表。 |
| `ContextRankingPolicySpec` | 接口 | <code>interface ContextRankingPolicySpec</code> | Context Ranking Policy Spec 的字段契约；完整字段见下表。 |
| `ContextRejectedItem` | 接口 | <code>interface ContextRejectedItem</code> | Context Rejected Item 的字段契约；完整字段见下表。 |
| `ContextSourceBudget` | 接口 | <code>interface ContextSourceBudget</code> | Context Source Budget 的字段契约；完整字段见下表。 |
| `ContextSourceResolutionInput` | 接口 | <code>interface ContextSourceResolutionInput extends ResolvedContextBuildInput</code> | Context Source Resolution Input 的字段契约；完整字段见下表。 |
| `ContextSourceResolver` | 接口 | <code>interface ContextSourceResolver</code> | Context Source Resolver 的字段契约；完整字段见下表。 |
| `ContextSourceResolverRegistry` | 接口 | <code>interface ContextSourceResolverRegistry</code> | Context Source Resolver Registry 的字段契约；完整字段见下表。 |
| `ContextSourceSpec` | 接口 | <code>interface ContextSourceSpec</code> | Context Source Spec 的字段契约；完整字段见下表。 |
| `ContextTruncationPolicySpec` | 接口 | <code>interface ContextTruncationPolicySpec</code> | Context Truncation Policy Spec 的字段契约；完整字段见下表。 |
| `ContextTruncationRecord` | 接口 | <code>interface ContextTruncationRecord</code> | Context Truncation Record 的字段契约；完整字段见下表。 |
| `MemoryContextBuilder` | 接口 | <code>interface MemoryContextBuilder</code> | Memory Context Builder 的字段契约；完整字段见下表。 |
| `PromptSegment` | 接口 | <code>interface PromptSegment</code> | Prompt Segment 的字段契约；完整字段见下表。 |
| `ResolvedContextBuildInput` | 接口 | <code>interface ResolvedContextBuildInput extends ContextBuildRequest</code> | Resolved Context Build Input 的字段契约；完整字段见下表。 |
| `TokenEstimator` | 接口 | <code>interface TokenEstimator</code> | Token Estimator 的字段契约；完整字段见下表。 |
| `ContextSourceType` | 类型 | <code>type ContextSourceType = 'system' &#124; 'workflow_state' &#124; 'messages' &#124; 'working_memory' &#124; 'long_term_memory' &#124; 'tool_observation' &#124; 'artifact' &#124; 'human_review' &#124; 'custom'</code> | Context Source Type 的公共类型别名。 |

## `ContextBudgetPlan` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dynamicTokens` | 属性 | <code>dynamicTokens: number</code> | dynamic Tokens 字段。 |
| `fixedTokens` | 属性 | <code>fixedTokens: number</code> | fixed Tokens 字段。 |
| `safetyMarginTokens` | 属性 | <code>safetyMarginTokens: number</code> | safety Margin Tokens 字段。 |
| `sourceBudgets` | 属性 | <code>sourceBudgets: ContextSourceBudget[]</code> | source Budgets 字段。 |
| `tokenizerRef` | 属性 | <code>tokenizerRef: MemoryContractSpecRef</code> | tokenizer Ref 字段。 |
| `totalAvailableTokens` | 属性 | <code>totalAvailableTokens: number</code> | total Available Tokens 字段。 |

## `ContextBuildExplanation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `budgetPlan` | 属性 | <code>budgetPlan: ContextBudgetPlan</code> | budget Plan 字段。 |
| `contextHash` | 属性 | <code>contextHash: string</code> | context Hash 字段。 |
| `omittedItemIds` | 属性 | <code>omittedItemIds: string[]</code> | omitted Item Ids 字段。 |
| `ranking` | 属性 | <code>ranking: { itemId: string; score: number; reasons: string[]; }[]</code> | ranking 字段。 |
| `rejectedItems` | 属性 | <code>rejectedItems: ContextRejectedItem[]</code> | rejected Items 字段。 |
| `selectedItemIds` | 属性 | <code>selectedItemIds: string[]</code> | selected Item Ids 字段。 |

## `ContextBuildInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `explicitSourceRefs` | 属性 | <code>explicitSourceRefs: string[]</code> | explicit Source Refs 字段。 |
| `messageCursor` | 属性 | <code>messageCursor: string</code> | message Cursor 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelContextWindowTokens` | 属性 | <code>modelContextWindowTokens: number</code> | model Context Window Tokens 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `previousContextHash` | 属性 | <code>previousContextHash: string</code> | previous Context Hash 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `profile` | 属性 | <code>profile: ContextProfileSpec</code> | profile 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `query` | 属性 | <code>query: string</code> | query 字段。 |
| `reservedInstructionTokens` | 属性 | <code>reservedInstructionTokens: number</code> | reserved Instruction Tokens 字段。 |
| `reservedOutputTokens` | 属性 | <code>reservedOutputTokens: number</code> | reserved Output Tokens 字段。 |
| `reservedSystemTokens` | 属性 | <code>reservedSystemTokens: number</code> | reserved System Tokens 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `runtimeStateRef` | 属性 | <code>runtimeStateRef: string</code> | runtime State Ref 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `sourceItems` | 属性 | <code>sourceItems: ContextItem[]</code> | source Items 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tokenizerRef` | 属性 | <code>tokenizerRef: MemoryContractSpecRef</code> | tokenizer Ref 字段。 |

## `ContextBuildRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `explicitSourceRefs` | 属性 | <code>explicitSourceRefs: string[]</code> | explicit Source Refs 字段。 |
| `messageCursor` | 属性 | <code>messageCursor: string</code> | message Cursor 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelContextWindowTokens` | 属性 | <code>modelContextWindowTokens: number</code> | model Context Window Tokens 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `previousContextHash` | 属性 | <code>previousContextHash: string</code> | previous Context Hash 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `query` | 属性 | <code>query: string</code> | query 字段。 |
| `reservedInstructionTokens` | 属性 | <code>reservedInstructionTokens: number</code> | reserved Instruction Tokens 字段。 |
| `reservedOutputTokens` | 属性 | <code>reservedOutputTokens: number</code> | reserved Output Tokens 字段。 |
| `reservedSystemTokens` | 属性 | <code>reservedSystemTokens: number</code> | reserved System Tokens 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `runtimeStateRef` | 属性 | <code>runtimeStateRef: string</code> | runtime State Ref 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |

## `ContextBundle` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs: ContextArtifactRef[]</code> | artifact Refs 字段。 |
| `conflicts` | 属性 | <code>conflicts: ContextConflict[]</code> | conflicts 字段。 |
| `contextHash` | 属性 | <code>contextHash: string</code> | context Hash 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `items` | 属性 | <code>items: ContextItem[]</code> | items 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `omittedItemIds` | 属性 | <code>omittedItemIds: string[]</code> | omitted Item Ids 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `rejectedItems` | 属性 | <code>rejectedItems: ContextRejectedItem[]</code> | rejected Items 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sourceHashes` | 属性 | <code>sourceHashes: Record&lt;string, string&gt;</code> | source Hashes 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `totalCharacters` | 属性 | <code>totalCharacters: number</code> | total Characters 字段。 |
| `totalTokens` | 属性 | <code>totalTokens: number</code> | total Tokens 字段。 |

## `ContextCompactionPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enabled` | 属性 | <code>enabled: boolean</code> | enabled 字段。 |
| `persistSummaryAsMemory` | 属性 | <code>persistSummaryAsMemory: boolean</code> | persist Summary As Memory 字段。 |
| `preserveLastMessages` | 属性 | <code>preserveLastMessages: number</code> | preserve Last Messages 字段。 |
| `summaryMemoryType` | 属性 | <code>summaryMemoryType: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").ManagedMemoryType</code> | summary Memory Type 字段。 |
| `summaryProviderRef` | 属性 | <code>summaryProviderRef: MemoryContractSpecRef</code> | summary Provider Ref 字段。 |
| `triggerRatio` | 属性 | <code>triggerRatio: number</code> | trigger Ratio 字段。 |

## `ContextConflict` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `conflictGroupId` | 属性 | <code>conflictGroupId: string</code> | conflict Group Id 字段。 |
| `itemIds` | 属性 | <code>itemIds: string[]</code> | item Ids 字段。 |
| `resolution` | 属性 | <code>resolution: string</code> | resolution 字段。 |

## `ContextEnvelope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs: ContextArtifactRef[]</code> | artifact Refs 字段。 |
| `budgetPlan` | 属性 | <code>budgetPlan: ContextBudgetPlan</code> | budget Plan 字段。 |
| `conflicts` | 属性 | <code>conflicts: ContextConflict[]</code> | conflicts 字段。 |
| `contextHash` | 属性 | <code>contextHash: string</code> | context Hash 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `dataSegments` | 属性 | <code>dataSegments: PromptSegment[]</code> | data Segments 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `includedSourceRefs` | 属性 | <code>includedSourceRefs: string[]</code> | included Source Refs 字段。 |
| `instructionSegments` | 属性 | <code>instructionSegments: PromptSegment[]</code> | instruction Segments 字段。 |
| `omittedSourceRefs` | 属性 | <code>omittedSourceRefs: string[]</code> | omitted Source Refs 字段。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `provenanceIndex` | 属性 | <code>provenanceIndex: Record&lt;string, ContextProvenanceLabel&gt;</code> | provenance Index 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `systemSegments` | 属性 | <code>systemSegments: PromptSegment[]</code> | system Segments 字段。 |
| `totalTokens` | 属性 | <code>totalTokens: number</code> | total Tokens 字段。 |
| `truncationRecords` | 属性 | <code>truncationRecords: ContextTruncationRecord[]</code> | truncation Records 字段。 |

## `ContextInjectionGateway` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `buildEnvelope` | 方法 | <code>buildEnvelope(bundle: ContextBundle, profile: ContextProfileSpec): Promise&lt;ContextEnvelope&gt;</code> | 构建 Envelope。 |

## `ContextItem` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: ContextArtifactRef</code> | artifact Ref 字段。 |
| `conflictGroupId` | 属性 | <code>conflictGroupId: string</code> | conflict Group Id 字段。 |
| `content` | 属性 | <code>content: unknown</code> | content 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `provenance` | 属性 | <code>provenance: Record&lt;string, unknown&gt; &#124; MemoryProvenance</code> | provenance 字段。 |
| `required` | 属性 | <code>required: boolean</code> | required 字段。 |
| `score` | 属性 | <code>score: number</code> | score 字段。 |
| `sourceId` | 属性 | <code>sourceId: string</code> | source Id 字段。 |
| `sourceType` | 属性 | <code>sourceType: ContextSourceType</code> | source Type 字段。 |
| `text` | 属性 | <code>text: string</code> | text 字段。 |
| `tokenEstimate` | 属性 | <code>tokenEstimate: number</code> | token Estimate 字段。 |
| `untrusted` | 属性 | <code>untrusted: boolean</code> | untrusted 字段。 |

## `ContextItemPolicyDecision` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowed` | 属性 | <code>allowed: boolean</code> | allowed 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |

## `ContextItemPolicyEvaluator` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluate` | 方法 | <code>evaluate(input: ContextItemPolicyInput): Promise&lt;ContextItemPolicyDecision&gt;</code> | 评估 evaluate。 |

## `ContextItemPolicyInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `item` | 属性 | <code>item: ContextItem</code> | item 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |

## `ContextProfileSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compactionPolicy` | 属性 | <code>compactionPolicy: ContextCompactionPolicySpec</code> | compaction Policy 字段。 |
| `conflictPolicy` | 属性 | <code>conflictPolicy: "include_marked" &#124; "prefer_latest" &#124; "prefer_verified"</code> | conflict Policy 字段。 |
| `deduplication` | 属性 | <code>deduplication: "none" &#124; "id" &#124; "semantic" &#124; "hash"</code> | deduplication 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `includeProvenance` | 属性 | <code>includeProvenance: boolean</code> | include Provenance 字段。 |
| `includeScores` | 属性 | <code>includeScores: boolean</code> | include Scores 字段。 |
| `instructionBoundary` | 属性 | <code>instructionBoundary: "strict" &#124; "tagged" &#124; "quoted"</code> | instruction Boundary 字段。 |
| `maxCharacters` | 属性 | <code>maxCharacters: number</code> | max Characters 字段。 |
| `maxItems` | 属性 | <code>maxItems: number</code> | max Items 字段。 |
| `maxSerializedBytes` | 属性 | <code>maxSerializedBytes: number</code> | max Serialized Bytes 字段。 |
| `maxTokens` | 属性 | <code>maxTokens: number</code> | max Tokens 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `ranking` | 属性 | <code>ranking: ContextRankingPolicySpec</code> | ranking 字段。 |
| `reservedOutputTokens` | 属性 | <code>reservedOutputTokens: number</code> | reserved Output Tokens 字段。 |
| `reservedSystemTokens` | 属性 | <code>reservedSystemTokens: number</code> | reserved System Tokens 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `semanticDedupThreshold` | 属性 | <code>semanticDedupThreshold: number</code> | semantic Dedup Threshold 字段。 |
| `sources` | 属性 | <code>sources: ContextSourceSpec[]</code> | sources 字段。 |
| `truncation` | 属性 | <code>truncation: ContextTruncationPolicySpec</code> | truncation 字段。 |
| `untrustedContentPolicy` | 属性 | <code>untrustedContentPolicy: "reject" &#124; "escape" &#124; "tag"</code> | untrusted Content Policy 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ContextProvenanceLabel` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authority` | 属性 | <code>authority: "verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"</code> | authority 字段。 |
| `citationLabel` | 属性 | <code>citationLabel: string</code> | citation Label 字段。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | memory Id 字段。 |
| `memoryVersionId` | 属性 | <code>memoryVersionId: string</code> | memory Version Id 字段。 |
| `observedAt` | 属性 | <code>observedAt: string</code> | observed At 字段。 |
| `sourceId` | 属性 | <code>sourceId: string</code> | source Id 字段。 |
| `sourceType` | 属性 | <code>sourceType: ContextSourceType</code> | source Type 字段。 |

## `ContextRankingPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `confidenceWeight` | 属性 | <code>confidenceWeight: number</code> | confidence Weight 字段。 |
| `importanceWeight` | 属性 | <code>importanceWeight: number</code> | importance Weight 字段。 |
| `method` | 属性 | <code>method: "custom" &#124; "priority" &#124; "score_fusion" &#124; "reranker"</code> | method 字段。 |
| `provenanceWeight` | 属性 | <code>provenanceWeight: number</code> | provenance Weight 字段。 |
| `recencyWeight` | 属性 | <code>recencyWeight: number</code> | recency Weight 字段。 |
| `relevanceWeight` | 属性 | <code>relevanceWeight: number</code> | relevance Weight 字段。 |
| `rerankerProviderRef` | 属性 | <code>rerankerProviderRef: MemoryContractSpecRef</code> | reranker Provider Ref 字段。 |
| `sourceWeights` | 属性 | <code>sourceWeights: Record&lt;string, number&gt;</code> | source Weights 字段。 |

## `ContextRejectedItem` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `itemId` | 属性 | <code>itemId: string</code> | item Id 字段。 |
| `reason` | 属性 | <code>reason: "policy_denied" &#124; "duplicate" &#124; "scope_denied" &#124; "invalid_status" &#124; "budget_exceeded" &#124; "untrusted_rejected" &#124; "invalid_input"</code> | reason 字段。 |

## `ContextSourceBudget` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxTokens` | 属性 | <code>maxTokens: number</code> | max Tokens 字段。 |
| `minTokens` | 属性 | <code>minTokens: number</code> | min Tokens 字段。 |
| `overflowPolicy` | 属性 | <code>overflowPolicy: "fail" &#124; "summarize" &#124; "drop" &#124; "truncate" &#124; "spill_to_artifact"</code> | overflow Policy 字段。 |
| `required` | 属性 | <code>required: boolean</code> | required 字段。 |
| `sourceId` | 属性 | <code>sourceId: string</code> | source Id 字段。 |
| `targetTokens` | 属性 | <code>targetTokens: number</code> | target Tokens 字段。 |

## `ContextSourceResolutionInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `explicitSourceRefs` | 属性 | <code>explicitSourceRefs: string[]</code> | explicit Source Refs 字段。 |
| `messageCursor` | 属性 | <code>messageCursor: string</code> | message Cursor 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelContextWindowTokens` | 属性 | <code>modelContextWindowTokens: number</code> | model Context Window Tokens 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `previousContextHash` | 属性 | <code>previousContextHash: string</code> | previous Context Hash 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `profile` | 属性 | <code>profile: ContextProfileSpec</code> | profile 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `query` | 属性 | <code>query: string</code> | query 字段。 |
| `reservedInstructionTokens` | 属性 | <code>reservedInstructionTokens: number</code> | reserved Instruction Tokens 字段。 |
| `reservedOutputTokens` | 属性 | <code>reservedOutputTokens: number</code> | reserved Output Tokens 字段。 |
| `reservedSystemTokens` | 属性 | <code>reservedSystemTokens: number</code> | reserved System Tokens 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `runtimeStateRef` | 属性 | <code>runtimeStateRef: string</code> | runtime State Ref 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `source` | 属性 | <code>source: ContextSourceSpec</code> | source 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tokenizerRef` | 属性 | <code>tokenizerRef: MemoryContractSpecRef</code> | tokenizer Ref 字段。 |

## `ContextSourceResolver` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `resolve` | 方法 | <code>resolve(request: ContextSourceResolutionInput): Promise&lt;ContextItem[]&gt;</code> | 解析 resolve。 |
| `supports` | 方法 | <code>supports(source: ContextSourceSpec): boolean</code> | supports 的公开运行时操作。 |

## `ContextSourceResolverRegistry` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `resolve` | 方法 | <code>resolve(request: ResolvedContextBuildInput): Promise&lt;ContextItem[]&gt;</code> | 解析 resolve。 |

## `ContextSourceSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filters` | 属性 | <code>filters: Record&lt;string, unknown&gt;</code> | filters 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `maxItems` | 属性 | <code>maxItems: number</code> | max Items 字段。 |
| `maxTokens` | 属性 | <code>maxTokens: number</code> | max Tokens 字段。 |
| `overflowPolicy` | 属性 | <code>overflowPolicy: "fail" &#124; "summarize" &#124; "drop" &#124; "truncate" &#124; "spill_to_artifact"</code> | overflow Policy 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `ref` | 属性 | <code>ref: MemoryContractSpecRef</code> | ref 字段。 |
| `required` | 属性 | <code>required: boolean</code> | required 字段。 |
| `type` | 属性 | <code>type: ContextSourceType</code> | type 字段。 |

## `ContextTruncationPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `method` | 属性 | <code>method: "hybrid" &#124; "summarize" &#124; "drop_lowest" &#124; "truncate_items"</code> | method 字段。 |
| `minItemTokens` | 属性 | <code>minItemTokens: number</code> | min Item Tokens 字段。 |
| `preserveLatestMessages` | 属性 | <code>preserveLatestMessages: number</code> | preserve Latest Messages 字段。 |
| `preserveRequiredSources` | 属性 | <code>preserveRequiredSources: boolean</code> | preserve Required Sources 字段。 |
| `truncationMarker` | 属性 | <code>truncationMarker: string</code> | truncation Marker 字段。 |

## `ContextTruncationRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `itemId` | 属性 | <code>itemId: string</code> | item Id 字段。 |
| `method` | 属性 | <code>method: "summarize" &#124; "drop" &#124; "truncate" &#124; "spill_to_artifact"</code> | method 字段。 |
| `originalTokens` | 属性 | <code>originalTokens: number</code> | original Tokens 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `retainedTokens` | 属性 | <code>retainedTokens: number</code> | retained Tokens 字段。 |

## `MemoryContextBuilder` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(request: ContextBuildInput): Promise&lt;ContextBundle&gt;</code> | 构建 build。 |
| `explain` | 方法 | <code>explain(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | explain 的公开运行时操作。 |

## `PromptSegment` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs: ContextArtifactRef[]</code> | artifact Refs 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `required` | 属性 | <code>required: boolean</code> | required 字段。 |
| `role` | 属性 | <code>role: "system" &#124; "tool" &#124; "user" &#124; "assistant" &#124; "developer" &#124; "data"</code> | role 字段。 |
| `sourceRefs` | 属性 | <code>sourceRefs: string[]</code> | source Refs 字段。 |
| `text` | 属性 | <code>text: string</code> | text 字段。 |
| `tokenCount` | 属性 | <code>tokenCount: number</code> | token Count 字段。 |
| `trustLevel` | 属性 | <code>trustLevel: "trusted_instruction" &#124; "trusted_data" &#124; "untrusted_data"</code> | trust Level 字段。 |

## `ResolvedContextBuildInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `explicitSourceRefs` | 属性 | <code>explicitSourceRefs: string[]</code> | explicit Source Refs 字段。 |
| `messageCursor` | 属性 | <code>messageCursor: string</code> | message Cursor 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelContextWindowTokens` | 属性 | <code>modelContextWindowTokens: number</code> | model Context Window Tokens 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `previousContextHash` | 属性 | <code>previousContextHash: string</code> | previous Context Hash 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `profile` | 属性 | <code>profile: ContextProfileSpec</code> | profile 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `query` | 属性 | <code>query: string</code> | query 字段。 |
| `reservedInstructionTokens` | 属性 | <code>reservedInstructionTokens: number</code> | reserved Instruction Tokens 字段。 |
| `reservedOutputTokens` | 属性 | <code>reservedOutputTokens: number</code> | reserved Output Tokens 字段。 |
| `reservedSystemTokens` | 属性 | <code>reservedSystemTokens: number</code> | reserved System Tokens 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `runtimeStateRef` | 属性 | <code>runtimeStateRef: string</code> | runtime State Ref 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tokenizerRef` | 属性 | <code>tokenizerRef: MemoryContractSpecRef</code> | tokenizer Ref 字段。 |

## `TokenEstimator` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `estimate` | 方法 | <code>estimate(text: string): number</code> | estimate 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
