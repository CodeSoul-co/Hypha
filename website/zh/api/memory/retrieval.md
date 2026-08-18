# `@codesoul-co/hypha-memory` / `retrieval`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/retrieval.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)
- 导出数: **20**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultMemoryRetrievalPipeline` | 类 | <code>new DefaultMemoryRetrievalPipeline(options: DefaultMemoryRetrievalPipelineOptions): DefaultMemoryRetrievalPipeline</code> | Default Memory Retrieval Pipeline 的运行时实现；公开构造函数与成员见下表。 |
| `DenseMemoryCandidateGenerator` | 类 | <code>new DenseMemoryCandidateGenerator(options: DenseMemoryCandidateGeneratorOptions): DenseMemoryCandidateGenerator</code> | Generates scope-fenced dense candidates from the configured vector projection. |
| `KeywordMemoryCandidateGenerator` | 类 | <code>new KeywordMemoryCandidateGenerator(store: ManagedMemoryRecordStore): KeywordMemoryCandidateGenerator</code> | Keyword Memory Candidate Generator 的运行时实现；公开构造函数与成员见下表。 |
| `StructuredMemoryCandidateGenerator` | 类 | <code>new StructuredMemoryCandidateGenerator(store: ManagedMemoryRecordStore): StructuredMemoryCandidateGenerator</code> | Structured Memory Candidate Generator 的运行时实现；公开构造函数与成员见下表。 |
| `normalizeMemoryQuery` | 函数 | <code>normalizeMemoryQuery(input: Omit&lt;NormalizedMemoryQuery, "queryHash"&gt;): NormalizedMemoryQuery</code> | 规范化 Memory Query。 |
| `DefaultMemoryRetrievalPipelineOptions` | 接口 | <code>interface DefaultMemoryRetrievalPipelineOptions</code> | Default Memory Retrieval Pipeline Options 的字段契约；完整字段见下表。 |
| `DenseMemoryCandidateGeneratorOptions` | 接口 | <code>interface DenseMemoryCandidateGeneratorOptions</code> | Dense Memory Candidate Generator Options 的字段契约；完整字段见下表。 |
| `MemoryCandidate` | 接口 | <code>interface MemoryCandidate</code> | Memory Candidate 的字段契约；完整字段见下表。 |
| `MemoryCandidateGenerationRequest` | 接口 | <code>interface MemoryCandidateGenerationRequest</code> | Memory Candidate Generation Request 的字段契约；完整字段见下表。 |
| `MemoryCandidateGenerator` | 接口 | <code>interface MemoryCandidateGenerator</code> | Memory Candidate Generator 的字段契约；完整字段见下表。 |
| `MemoryMatchedFragment` | 接口 | <code>interface MemoryMatchedFragment</code> | Memory Matched Fragment 的字段契约；完整字段见下表。 |
| `MemoryRankingPolicySpecV2` | 接口 | <code>interface MemoryRankingPolicySpecV2 extends MemoryRetrievalPolicySpec</code> | Memory Ranking Policy Spec V2 的字段契约；完整字段见下表。 |
| `MemoryRetrievalExplanation` | 接口 | <code>interface MemoryRetrievalExplanation</code> | Memory Retrieval Explanation 的字段契约；完整字段见下表。 |
| `MemoryRetrievalPipeline` | 接口 | <code>interface MemoryRetrievalPipeline</code> | Memory Retrieval Pipeline 的字段契约；完整字段见下表。 |
| `MemoryRetrievalRequest` | 接口 | <code>interface MemoryRetrievalRequest</code> | Memory Retrieval Request 的字段契约；完整字段见下表。 |
| `MemoryRetrievalResult` | 接口 | <code>interface MemoryRetrievalResult</code> | Memory Retrieval Result 的字段契约；完整字段见下表。 |
| `MemoryRetrievalSnapshot` | 接口 | <code>interface MemoryRetrievalSnapshot</code> | Memory Retrieval Snapshot 的字段契约；完整字段见下表。 |
| `MemorySearchFilterV2` | 接口 | <code>interface MemorySearchFilterV2 extends MemorySearchFilter</code> | Memory Search Filter V2 的字段契约；完整字段见下表。 |
| `NormalizedMemoryQuery` | 接口 | <code>interface NormalizedMemoryQuery</code> | Normalized Memory Query 的字段契约；完整字段见下表。 |
| `MemoryCandidateGeneratorType` | 类型 | <code>type MemoryCandidateGeneratorType = 'structured' &#124; 'keyword' &#124; 'dense' &#124; 'sparse' &#124; 'graph' &#124; 'recent' &#124; 'custom'</code> | Memory Candidate Generator Type 的公共类型别名。 |

## `DefaultMemoryRetrievalPipeline` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DefaultMemoryRetrievalPipelineOptions): DefaultMemoryRetrievalPipeline</code> | 创建该类的实例。 |
| `explain` | 方法 | <code>explain(snapshotId: string): Promise&lt;MemoryRetrievalResult &#124; null&gt;</code> | explain 的公开运行时操作。 |
| `retrieve` | 方法 | <code>retrieve(request: MemoryRetrievalRequest): Promise&lt;MemoryRetrievalResult&gt;</code> | retrieve 的公开运行时操作。 |

## `DenseMemoryCandidateGenerator` 公开成员

Generates scope-fenced dense candidates from the configured vector projection.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DenseMemoryCandidateGeneratorOptions): DenseMemoryCandidateGenerator</code> | 创建该类的实例。 |
| `generate` | 方法 | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | generate 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `type` | 属性 | <code>type: "dense"</code> | type 字段。 |

## `KeywordMemoryCandidateGenerator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(store: ManagedMemoryRecordStore): KeywordMemoryCandidateGenerator</code> | 创建该类的实例。 |
| `generate` | 方法 | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | generate 的公开运行时操作。 |
| `id` | 属性 | <code>id: "memory.generator.keyword"</code> | id 字段。 |
| `type` | 属性 | <code>type: "keyword"</code> | type 字段。 |

## `StructuredMemoryCandidateGenerator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(store: ManagedMemoryRecordStore): StructuredMemoryCandidateGenerator</code> | 创建该类的实例。 |
| `generate` | 方法 | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | generate 的公开运行时操作。 |
| `id` | 属性 | <code>id: "memory.generator.structured"</code> | id 字段。 |
| `type` | 属性 | <code>type: "structured"</code> | type 字段。 |

## `DefaultMemoryRetrievalPipelineOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `generators` | 属性 | <code>generators: MemoryCandidateGenerator[]</code> | generators 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `rankingPolicy` | 属性 | <code>rankingPolicy: MemoryRankingPolicySpecV2</code> | ranking Policy 字段。 |
| `recordStore` | 属性 | <code>recordStore: ManagedMemoryRecordStore</code> | record Store 字段。 |

## `DenseMemoryCandidateGeneratorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `embeddings` | 属性 | <code>embeddings: EmbeddingProvider</code> | embeddings 字段。 |
| `store` | 属性 | <code>store: ManagedVectorStoreAdapter</code> | store 字段。 |

## `MemoryCandidate` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `generatorId` | 属性 | <code>generatorId: string</code> | generator Id 字段。 |
| `generatorType` | 属性 | <code>generatorType: MemoryCandidateGeneratorType</code> | generator Type 字段。 |
| `matchedFields` | 属性 | <code>matchedFields: string[]</code> | matched Fields 字段。 |
| `matchedFragments` | 属性 | <code>matchedFragments: MemoryMatchedFragment[]</code> | matched Fragments 字段。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | memory Id 字段。 |
| `normalizedScore` | 属性 | <code>normalizedScore: number</code> | normalized Score 字段。 |
| `rawScore` | 属性 | <code>rawScore: number</code> | raw Score 字段。 |
| `reasons` | 属性 | <code>reasons: string[]</code> | reasons 字段。 |

## `MemoryCandidateGenerationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filter` | 属性 | <code>filter: MemorySearchFilterV2</code> | filter 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `query` | 属性 | <code>query: NormalizedMemoryQuery</code> | query 字段。 |

## `MemoryCandidateGenerator` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `generate` | 方法 | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | generate 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `type` | 属性 | <code>type: MemoryCandidateGeneratorType</code> | type 字段。 |

## `MemoryMatchedFragment` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `end` | 属性 | <code>end: number</code> | end 字段。 |
| `field` | 属性 | <code>field: string</code> | field 字段。 |
| `fragmentHash` | 属性 | <code>fragmentHash: string</code> | fragment Hash 字段。 |
| `start` | 属性 | <code>start: number</code> | start 字段。 |
| `text` | 属性 | <code>text: string</code> | text 字段。 |

## `MemoryRankingPolicySpecV2` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `confidenceWeight` | 属性 | <code>confidenceWeight: number</code> | confidence Weight 字段。 |
| `conflictHandling` | 属性 | <code>conflictHandling: "include_marked" &#124; "prefer_latest" &#124; "prefer_verified" &#124; "exclude_conflicts"</code> | conflict Handling 字段。 |
| `deduplication` | 属性 | <code>deduplication: "none" &#124; "id" &#124; "semantic" &#124; "hash"</code> | deduplication 字段。 |
| `defaultMode` | 属性 | <code>defaultMode: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword"</code> | default Mode 字段。 |
| `defaultTopK` | 属性 | <code>defaultTopK: number</code> | default Top K 字段。 |
| `diversity` | 属性 | <code>diversity: { method: "none" &#124; "mmr" &#124; "per_entity_cap" &#124; "per_source_cap"; lambda?: number; maxPerEntity?: number; maxPerSource?: number; }</code> | diversity 字段。 |
| `freshnessHalfLifeSeconds` | 属性 | <code>freshnessHalfLifeSeconds: number</code> | freshness Half Life Seconds 字段。 |
| `importanceWeight` | 属性 | <code>importanceWeight: number</code> | importance Weight 字段。 |
| `maxCandidates` | 属性 | <code>maxCandidates: number</code> | max Candidates 字段。 |
| `memoryTypePriority` | 属性 | <code>memoryTypePriority: Partial&lt;Record&lt;ManagedMemoryType, number&gt;&gt;</code> | memory Type Priority 字段。 |
| `normalization` | 属性 | <code>normalization: "min_max" &#124; "z_score" &#124; "rank" &#124; "provider_normalized"</code> | normalization 字段。 |
| `recencyWeight` | 属性 | <code>recencyWeight: number</code> | recency Weight 字段。 |
| `reinforcementWeight` | 属性 | <code>reinforcementWeight: number</code> | reinforcement Weight 字段。 |
| `rerank` | 属性 | <code>rerank: "none" &#124; "provider" &#124; "custom" &#124; "score_fusion"</code> | rerank 字段。 |
| `scoreThreshold` | 属性 | <code>scoreThreshold: number</code> | score Threshold 字段。 |
| `semanticDedupThreshold` | 属性 | <code>semanticDedupThreshold: number</code> | semantic Dedup Threshold 字段。 |
| `sourcePriority` | 属性 | <code>sourcePriority: Partial&lt;Record&lt;"human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import", number&gt;&gt;</code> | source Priority 字段。 |
| `stableTieBreak` | 属性 | <code>stableTieBreak: "memory_id" &#124; "updated_at_then_id" &#124; "created_at_then_id"</code> | stable Tie Break 字段。 |
| `weights` | 属性 | <code>weights: { semantic?: number; keyword?: number; exact?: number; graph?: number; recency?: number; importance?: number; confidence?: number; authority?: number; verified?: number; reinforcement?: number; }</code> | weights 字段。 |

## `MemoryRetrievalExplanation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `componentScores` | 属性 | <code>componentScores: Record&lt;string, number&gt;</code> | component Scores 字段。 |
| `conflictMarkers` | 属性 | <code>conflictMarkers: string[]</code> | conflict Markers 字段。 |
| `filtersPassed` | 属性 | <code>filtersPassed: string[]</code> | filters Passed 字段。 |
| `filtersRejected` | 属性 | <code>filtersRejected: string[]</code> | filters Rejected 字段。 |
| `finalRank` | 属性 | <code>finalRank: number</code> | final Rank 字段。 |
| `finalScore` | 属性 | <code>finalScore: number</code> | final Score 字段。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | memory Id 字段。 |
| `selectedBecause` | 属性 | <code>selectedBecause: string[]</code> | selected Because 字段。 |

## `MemoryRetrievalPipeline` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `explain` | 方法 | <code>explain(snapshotId: string): Promise&lt;MemoryRetrievalResult &#124; null&gt;</code> | explain 的公开运行时操作。 |
| `retrieve` | 方法 | <code>retrieve(request: MemoryRetrievalRequest): Promise&lt;MemoryRetrievalResult&gt;</code> | retrieve 的公开运行时操作。 |

## `MemoryRetrievalRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filter` | 属性 | <code>filter: MemorySearchFilterV2</code> | filter 字段。 |
| `includeInvalidated` | 属性 | <code>includeInvalidated: boolean</code> | include Invalidated 字段。 |
| `includeSuperseded` | 属性 | <code>includeSuperseded: boolean</code> | include Superseded 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `query` | 属性 | <code>query: NormalizedMemoryQuery</code> | query 字段。 |
| `scoreThreshold` | 属性 | <code>scoreThreshold: number</code> | score Threshold 字段。 |
| `topK` | 属性 | <code>topK: number</code> | top K 字段。 |

## `MemoryRetrievalResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `explanations` | 属性 | <code>explanations: MemoryRetrievalExplanation[]</code> | explanations 字段。 |
| `results` | 属性 | <code>results: ManagedMemorySearchResult[]</code> | results 字段。 |
| `snapshot` | 属性 | <code>snapshot: MemoryRetrievalSnapshot</code> | snapshot 字段。 |

## `MemoryRetrievalSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidateCount` | 属性 | <code>candidateCount: number</code> | candidate Count 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `filterHash` | 属性 | <code>filterHash: string</code> | filter Hash 字段。 |
| `generatorIds` | 属性 | <code>generatorIds: string[]</code> | generator Ids 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `queryHash` | 属性 | <code>queryHash: string</code> | query Hash 字段。 |
| `rankingPolicyHash` | 属性 | <code>rankingPolicyHash: string</code> | ranking Policy Hash 字段。 |
| `rerankerRef` | 属性 | <code>rerankerRef: MemoryContractSpecRef</code> | reranker Ref 字段。 |
| `resultMemoryIds` | 属性 | <code>resultMemoryIds: string[]</code> | result Memory Ids 字段。 |

## `MemorySearchFilterV2` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorities` | 属性 | <code>authorities: NonNullable&lt;"verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"&gt;[]</code> | authorities 字段。 |
| `canonicalKeys` | 属性 | <code>canonicalKeys: string[]</code> | canonical Keys 字段。 |
| `confidenceGte` | 属性 | <code>confidenceGte: number</code> | confidence Gte 字段。 |
| `conflictFreeOnly` | 属性 | <code>conflictFreeOnly: boolean</code> | conflict Free Only 字段。 |
| `createdAfter` | 属性 | <code>createdAfter: string</code> | created After 字段。 |
| `createdBefore` | 属性 | <code>createdBefore: string</code> | created Before 字段。 |
| `entityIds` | 属性 | <code>entityIds: string[]</code> | entity Ids 字段。 |
| `excludeIds` | 属性 | <code>excludeIds: string[]</code> | exclude Ids 字段。 |
| `excludeTags` | 属性 | <code>excludeTags: string[]</code> | exclude Tags 字段。 |
| `expiresAfter` | 属性 | <code>expiresAfter: string</code> | expires After 字段。 |
| `ids` | 属性 | <code>ids: string[]</code> | ids 字段。 |
| `importanceGte` | 属性 | <code>importanceGte: number</code> | importance Gte 字段。 |
| `legalHoldOnly` | 属性 | <code>legalHoldOnly: boolean</code> | legal Hold Only 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `relationTypes` | 属性 | <code>relationTypes: ("supports" &#124; "contradicts" &#124; "supersedes" &#124; "derived_from" &#124; "related_to" &#124; "same_as" &#124; "part_of")[]</code> | relation Types 字段。 |
| `sourceTypes` | 属性 | <code>sourceTypes: ("human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import")[]</code> | source Types 字段。 |
| `statuses` | 属性 | <code>statuses: MemoryStatus[]</code> | statuses 字段。 |
| `tagsAll` | 属性 | <code>tagsAll: string[]</code> | tags All 字段。 |
| `tagsAny` | 属性 | <code>tagsAny: string[]</code> | tags Any 字段。 |
| `updatedAfter` | 属性 | <code>updatedAfter: string</code> | updated After 字段。 |
| `validAt` | 属性 | <code>validAt: string</code> | valid At 字段。 |
| `validFromBefore` | 属性 | <code>validFromBefore: string</code> | valid From Before 字段。 |
| `validToAfter` | 属性 | <code>validToAfter: string</code> | valid To After 字段。 |
| `verifiedOnly` | 属性 | <code>verifiedOnly: boolean</code> | verified Only 字段。 |
| `visibility` | 属性 | <code>visibility: ("workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant")[]</code> | visibility 字段。 |

## `NormalizedMemoryQuery` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `entities` | 属性 | <code>entities: MemoryEntityRef[]</code> | entities 字段。 |
| `mode` | 属性 | <code>mode: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword" &#124; "graph"</code> | mode 字段。 |
| `normalizedQuery` | 属性 | <code>normalizedQuery: string</code> | normalized Query 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `queryEmbedding` | 属性 | <code>queryEmbedding: number[]</code> | query Embedding 字段。 |
| `queryHash` | 属性 | <code>queryHash: string</code> | query Hash 字段。 |
| `rawQuery` | 属性 | <code>rawQuery: string</code> | raw Query 字段。 |
| `requestedTypes` | 属性 | <code>requestedTypes: ManagedMemoryType[]</code> | requested Types 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `temporalIntent` | 属性 | <code>temporalIntent: { at?: string; from?: string; to?: string; }</code> | temporal Intent 字段。 |
