# `@codesoul-co/hypha-memory` / `retrieval`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/retrieval.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)
- Exports: **20**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultMemoryRetrievalPipeline` | class | <code>new DefaultMemoryRetrievalPipeline(options: DefaultMemoryRetrievalPipelineOptions): DefaultMemoryRetrievalPipeline</code> | Runtime implementation for Default Memory Retrieval Pipeline; see its public constructor and members below. |
| `DenseMemoryCandidateGenerator` | class | <code>new DenseMemoryCandidateGenerator(options: DenseMemoryCandidateGeneratorOptions): DenseMemoryCandidateGenerator</code> | Generates scope-fenced dense candidates from the configured vector projection. |
| `KeywordMemoryCandidateGenerator` | class | <code>new KeywordMemoryCandidateGenerator(store: ManagedMemoryRecordStore): KeywordMemoryCandidateGenerator</code> | Runtime implementation for Keyword Memory Candidate Generator; see its public constructor and members below. |
| `StructuredMemoryCandidateGenerator` | class | <code>new StructuredMemoryCandidateGenerator(store: ManagedMemoryRecordStore): StructuredMemoryCandidateGenerator</code> | Runtime implementation for Structured Memory Candidate Generator; see its public constructor and members below. |
| `normalizeMemoryQuery` | function | <code>normalizeMemoryQuery(input: Omit&lt;NormalizedMemoryQuery, "queryHash"&gt;): NormalizedMemoryQuery</code> | Normalizes Memory Query at this module boundary. |
| `DefaultMemoryRetrievalPipelineOptions` | interface | <code>interface DefaultMemoryRetrievalPipelineOptions</code> | Field contract for Default Memory Retrieval Pipeline Options; see all contract members below. |
| `DenseMemoryCandidateGeneratorOptions` | interface | <code>interface DenseMemoryCandidateGeneratorOptions</code> | Field contract for Dense Memory Candidate Generator Options; see all contract members below. |
| `MemoryCandidate` | interface | <code>interface MemoryCandidate</code> | Field contract for Memory Candidate; see all contract members below. |
| `MemoryCandidateGenerationRequest` | interface | <code>interface MemoryCandidateGenerationRequest</code> | Field contract for Memory Candidate Generation Request; see all contract members below. |
| `MemoryCandidateGenerator` | interface | <code>interface MemoryCandidateGenerator</code> | Field contract for Memory Candidate Generator; see all contract members below. |
| `MemoryMatchedFragment` | interface | <code>interface MemoryMatchedFragment</code> | Field contract for Memory Matched Fragment; see all contract members below. |
| `MemoryRankingPolicySpecV2` | interface | <code>interface MemoryRankingPolicySpecV2 extends MemoryRetrievalPolicySpec</code> | Field contract for Memory Ranking Policy Spec V2; see all contract members below. |
| `MemoryRetrievalExplanation` | interface | <code>interface MemoryRetrievalExplanation</code> | Field contract for Memory Retrieval Explanation; see all contract members below. |
| `MemoryRetrievalPipeline` | interface | <code>interface MemoryRetrievalPipeline</code> | Field contract for Memory Retrieval Pipeline; see all contract members below. |
| `MemoryRetrievalRequest` | interface | <code>interface MemoryRetrievalRequest</code> | Field contract for Memory Retrieval Request; see all contract members below. |
| `MemoryRetrievalResult` | interface | <code>interface MemoryRetrievalResult</code> | Field contract for Memory Retrieval Result; see all contract members below. |
| `MemoryRetrievalSnapshot` | interface | <code>interface MemoryRetrievalSnapshot</code> | Field contract for Memory Retrieval Snapshot; see all contract members below. |
| `MemorySearchFilterV2` | interface | <code>interface MemorySearchFilterV2 extends MemorySearchFilter</code> | Field contract for Memory Search Filter V2; see all contract members below. |
| `NormalizedMemoryQuery` | interface | <code>interface NormalizedMemoryQuery</code> | Field contract for Normalized Memory Query; see all contract members below. |
| `MemoryCandidateGeneratorType` | type | <code>type MemoryCandidateGeneratorType = 'structured' &#124; 'keyword' &#124; 'dense' &#124; 'sparse' &#124; 'graph' &#124; 'recent' &#124; 'custom'</code> | Public type alias for Memory Candidate Generator Type. |

## `DefaultMemoryRetrievalPipeline` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DefaultMemoryRetrievalPipelineOptions): DefaultMemoryRetrievalPipeline</code> | Creates an instance of this class. |
| `explain` | method | <code>explain(snapshotId: string): Promise&lt;MemoryRetrievalResult &#124; null&gt;</code> | Public runtime operation for explain. |
| `retrieve` | method | <code>retrieve(request: MemoryRetrievalRequest): Promise&lt;MemoryRetrievalResult&gt;</code> | Public runtime operation for retrieve. |

## `DenseMemoryCandidateGenerator` public members

Generates scope-fenced dense candidates from the configured vector projection.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DenseMemoryCandidateGeneratorOptions): DenseMemoryCandidateGenerator</code> | Creates an instance of this class. |
| `generate` | method | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | Public runtime operation for generate. |
| `id` | property | <code>id: string</code> | Public id property. |
| `type` | property | <code>type: "dense"</code> | Public type property. |

## `KeywordMemoryCandidateGenerator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(store: ManagedMemoryRecordStore): KeywordMemoryCandidateGenerator</code> | Creates an instance of this class. |
| `generate` | method | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | Public runtime operation for generate. |
| `id` | property | <code>id: "memory.generator.keyword"</code> | Public id property. |
| `type` | property | <code>type: "keyword"</code> | Public type property. |

## `StructuredMemoryCandidateGenerator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(store: ManagedMemoryRecordStore): StructuredMemoryCandidateGenerator</code> | Creates an instance of this class. |
| `generate` | method | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | Public runtime operation for generate. |
| `id` | property | <code>id: "memory.generator.structured"</code> | Public id property. |
| `type` | property | <code>type: "structured"</code> | Public type property. |

## `DefaultMemoryRetrievalPipelineOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `generators` | property | <code>generators: MemoryCandidateGenerator[]</code> | Public generators property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `rankingPolicy` | property | <code>rankingPolicy: MemoryRankingPolicySpecV2</code> | Public ranking Policy property. |
| `recordStore` | property | <code>recordStore: ManagedMemoryRecordStore</code> | Public record Store property. |

## `DenseMemoryCandidateGeneratorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `embeddings` | property | <code>embeddings: EmbeddingProvider</code> | Public embeddings property. |
| `store` | property | <code>store: ManagedVectorStoreAdapter</code> | Public store property. |

## `MemoryCandidate` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `generatorId` | property | <code>generatorId: string</code> | Public generator Id property. |
| `generatorType` | property | <code>generatorType: MemoryCandidateGeneratorType</code> | Public generator Type property. |
| `matchedFields` | property | <code>matchedFields: string[]</code> | Public matched Fields property. |
| `matchedFragments` | property | <code>matchedFragments: MemoryMatchedFragment[]</code> | Public matched Fragments property. |
| `memoryId` | property | <code>memoryId: string</code> | Public memory Id property. |
| `normalizedScore` | property | <code>normalizedScore: number</code> | Public normalized Score property. |
| `rawScore` | property | <code>rawScore: number</code> | Public raw Score property. |
| `reasons` | property | <code>reasons: string[]</code> | Public reasons property. |

## `MemoryCandidateGenerationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filter` | property | <code>filter: MemorySearchFilterV2</code> | Public filter property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `query` | property | <code>query: NormalizedMemoryQuery</code> | Public query property. |

## `MemoryCandidateGenerator` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `generate` | method | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | Public runtime operation for generate. |
| `id` | property | <code>id: string</code> | Public id property. |
| `type` | property | <code>type: MemoryCandidateGeneratorType</code> | Public type property. |

## `MemoryMatchedFragment` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `end` | property | <code>end: number</code> | Public end property. |
| `field` | property | <code>field: string</code> | Public field property. |
| `fragmentHash` | property | <code>fragmentHash: string</code> | Public fragment Hash property. |
| `start` | property | <code>start: number</code> | Public start property. |
| `text` | property | <code>text: string</code> | Public text property. |

## `MemoryRankingPolicySpecV2` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `confidenceWeight` | property | <code>confidenceWeight: number</code> | Public confidence Weight property. |
| `conflictHandling` | property | <code>conflictHandling: "include_marked" &#124; "prefer_latest" &#124; "prefer_verified" &#124; "exclude_conflicts"</code> | Public conflict Handling property. |
| `deduplication` | property | <code>deduplication: "none" &#124; "id" &#124; "semantic" &#124; "hash"</code> | Public deduplication property. |
| `defaultMode` | property | <code>defaultMode: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword"</code> | Public default Mode property. |
| `defaultTopK` | property | <code>defaultTopK: number</code> | Public default Top K property. |
| `diversity` | property | <code>diversity: { method: "none" &#124; "mmr" &#124; "per_entity_cap" &#124; "per_source_cap"; lambda?: number; maxPerEntity?: number; maxPerSource?: number; }</code> | Public diversity property. |
| `freshnessHalfLifeSeconds` | property | <code>freshnessHalfLifeSeconds: number</code> | Public freshness Half Life Seconds property. |
| `importanceWeight` | property | <code>importanceWeight: number</code> | Public importance Weight property. |
| `maxCandidates` | property | <code>maxCandidates: number</code> | Public max Candidates property. |
| `memoryTypePriority` | property | <code>memoryTypePriority: Partial&lt;Record&lt;ManagedMemoryType, number&gt;&gt;</code> | Public memory Type Priority property. |
| `normalization` | property | <code>normalization: "min_max" &#124; "z_score" &#124; "rank" &#124; "provider_normalized"</code> | Public normalization property. |
| `recencyWeight` | property | <code>recencyWeight: number</code> | Public recency Weight property. |
| `reinforcementWeight` | property | <code>reinforcementWeight: number</code> | Public reinforcement Weight property. |
| `rerank` | property | <code>rerank: "none" &#124; "provider" &#124; "custom" &#124; "score_fusion"</code> | Public rerank property. |
| `scoreThreshold` | property | <code>scoreThreshold: number</code> | Public score Threshold property. |
| `semanticDedupThreshold` | property | <code>semanticDedupThreshold: number</code> | Public semantic Dedup Threshold property. |
| `sourcePriority` | property | <code>sourcePriority: Partial&lt;Record&lt;"human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import", number&gt;&gt;</code> | Public source Priority property. |
| `stableTieBreak` | property | <code>stableTieBreak: "memory_id" &#124; "updated_at_then_id" &#124; "created_at_then_id"</code> | Public stable Tie Break property. |
| `weights` | property | <code>weights: { semantic?: number; keyword?: number; exact?: number; graph?: number; recency?: number; importance?: number; confidence?: number; authority?: number; verified?: number; reinforcement?: number; }</code> | Public weights property. |

## `MemoryRetrievalExplanation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `componentScores` | property | <code>componentScores: Record&lt;string, number&gt;</code> | Public component Scores property. |
| `conflictMarkers` | property | <code>conflictMarkers: string[]</code> | Public conflict Markers property. |
| `filtersPassed` | property | <code>filtersPassed: string[]</code> | Public filters Passed property. |
| `filtersRejected` | property | <code>filtersRejected: string[]</code> | Public filters Rejected property. |
| `finalRank` | property | <code>finalRank: number</code> | Public final Rank property. |
| `finalScore` | property | <code>finalScore: number</code> | Public final Score property. |
| `memoryId` | property | <code>memoryId: string</code> | Public memory Id property. |
| `selectedBecause` | property | <code>selectedBecause: string[]</code> | Public selected Because property. |

## `MemoryRetrievalPipeline` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `explain` | method | <code>explain(snapshotId: string): Promise&lt;MemoryRetrievalResult &#124; null&gt;</code> | Public runtime operation for explain. |
| `retrieve` | method | <code>retrieve(request: MemoryRetrievalRequest): Promise&lt;MemoryRetrievalResult&gt;</code> | Public runtime operation for retrieve. |

## `MemoryRetrievalRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filter` | property | <code>filter: MemorySearchFilterV2</code> | Public filter property. |
| `includeInvalidated` | property | <code>includeInvalidated: boolean</code> | Public include Invalidated property. |
| `includeSuperseded` | property | <code>includeSuperseded: boolean</code> | Public include Superseded property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `query` | property | <code>query: NormalizedMemoryQuery</code> | Public query property. |
| `scoreThreshold` | property | <code>scoreThreshold: number</code> | Public score Threshold property. |
| `topK` | property | <code>topK: number</code> | Public top K property. |

## `MemoryRetrievalResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `explanations` | property | <code>explanations: MemoryRetrievalExplanation[]</code> | Public explanations property. |
| `results` | property | <code>results: ManagedMemorySearchResult[]</code> | Public results property. |
| `snapshot` | property | <code>snapshot: MemoryRetrievalSnapshot</code> | Public snapshot property. |

## `MemoryRetrievalSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidateCount` | property | <code>candidateCount: number</code> | Public candidate Count property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `filterHash` | property | <code>filterHash: string</code> | Public filter Hash property. |
| `generatorIds` | property | <code>generatorIds: string[]</code> | Public generator Ids property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `queryHash` | property | <code>queryHash: string</code> | Public query Hash property. |
| `rankingPolicyHash` | property | <code>rankingPolicyHash: string</code> | Public ranking Policy Hash property. |
| `rerankerRef` | property | <code>rerankerRef: MemoryContractSpecRef</code> | Public reranker Ref property. |
| `resultMemoryIds` | property | <code>resultMemoryIds: string[]</code> | Public result Memory Ids property. |

## `MemorySearchFilterV2` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorities` | property | <code>authorities: NonNullable&lt;"verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"&gt;[]</code> | Public authorities property. |
| `canonicalKeys` | property | <code>canonicalKeys: string[]</code> | Public canonical Keys property. |
| `confidenceGte` | property | <code>confidenceGte: number</code> | Public confidence Gte property. |
| `conflictFreeOnly` | property | <code>conflictFreeOnly: boolean</code> | Public conflict Free Only property. |
| `createdAfter` | property | <code>createdAfter: string</code> | Public created After property. |
| `createdBefore` | property | <code>createdBefore: string</code> | Public created Before property. |
| `entityIds` | property | <code>entityIds: string[]</code> | Public entity Ids property. |
| `excludeIds` | property | <code>excludeIds: string[]</code> | Public exclude Ids property. |
| `excludeTags` | property | <code>excludeTags: string[]</code> | Public exclude Tags property. |
| `expiresAfter` | property | <code>expiresAfter: string</code> | Public expires After property. |
| `ids` | property | <code>ids: string[]</code> | Public ids property. |
| `importanceGte` | property | <code>importanceGte: number</code> | Public importance Gte property. |
| `legalHoldOnly` | property | <code>legalHoldOnly: boolean</code> | Public legal Hold Only property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `relationTypes` | property | <code>relationTypes: ("supports" &#124; "contradicts" &#124; "supersedes" &#124; "derived_from" &#124; "related_to" &#124; "same_as" &#124; "part_of")[]</code> | Public relation Types property. |
| `sourceTypes` | property | <code>sourceTypes: ("human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import")[]</code> | Public source Types property. |
| `statuses` | property | <code>statuses: MemoryStatus[]</code> | Public statuses property. |
| `tagsAll` | property | <code>tagsAll: string[]</code> | Public tags All property. |
| `tagsAny` | property | <code>tagsAny: string[]</code> | Public tags Any property. |
| `updatedAfter` | property | <code>updatedAfter: string</code> | Public updated After property. |
| `validAt` | property | <code>validAt: string</code> | Public valid At property. |
| `validFromBefore` | property | <code>validFromBefore: string</code> | Public valid From Before property. |
| `validToAfter` | property | <code>validToAfter: string</code> | Public valid To After property. |
| `verifiedOnly` | property | <code>verifiedOnly: boolean</code> | Public verified Only property. |
| `visibility` | property | <code>visibility: ("workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant")[]</code> | Public visibility property. |

## `NormalizedMemoryQuery` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `entities` | property | <code>entities: MemoryEntityRef[]</code> | Public entities property. |
| `mode` | property | <code>mode: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword" &#124; "graph"</code> | Public mode property. |
| `normalizedQuery` | property | <code>normalizedQuery: string</code> | Public normalized Query property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `queryEmbedding` | property | <code>queryEmbedding: number[]</code> | Public query Embedding property. |
| `queryHash` | property | <code>queryHash: string</code> | Public query Hash property. |
| `rawQuery` | property | <code>rawQuery: string</code> | Public raw Query property. |
| `requestedTypes` | property | <code>requestedTypes: ManagedMemoryType[]</code> | Public requested Types property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `temporalIntent` | property | <code>temporalIntent: { at?: string; from?: string; to?: string; }</code> | Public temporal Intent property. |
