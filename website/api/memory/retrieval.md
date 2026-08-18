# `@codesoul-co/hypha-memory` / `retrieval`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/retrieval.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)
- Exports: **20**

## Using this module

Use the Retrieval module for using the public contracts and operations for this capability boundary. It exports 4 classes, 1 function, 14 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  DefaultMemoryRetrievalPipeline,
  DenseMemoryCandidateGenerator,
  KeywordMemoryCandidateGenerator,
  StructuredMemoryCandidateGenerator,
  normalizeMemoryQuery,
} from '@codesoul-co/hypha-memory';

import type {
  DefaultMemoryRetrievalPipelineOptions,
  DenseMemoryCandidateGeneratorOptions,
  MemoryCandidate,
  MemoryCandidateGenerationRequest,
  MemoryCandidateGenerator,
  MemoryMatchedFragment,
  MemoryRankingPolicySpecV2,
  MemoryRetrievalExplanation,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- Use the 15 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 4 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultMemoryRetrievalPipeline` | class | <code>new DefaultMemoryRetrievalPipeline(options: DefaultMemoryRetrievalPipelineOptions): DefaultMemoryRetrievalPipeline</code> | Default Memory Retrieval Pipeline class with 3 public constructor or member entries; its exact declarations are listed below. |
| `DenseMemoryCandidateGenerator` | class | <code>new DenseMemoryCandidateGenerator(options: DenseMemoryCandidateGeneratorOptions): DenseMemoryCandidateGenerator</code> | Generates scope-fenced dense candidates from the configured vector projection. |
| `KeywordMemoryCandidateGenerator` | class | <code>new KeywordMemoryCandidateGenerator(store: ManagedMemoryRecordStore): KeywordMemoryCandidateGenerator</code> | Keyword Memory Candidate Generator class with 4 public constructor or member entries; its exact declarations are listed below. |
| `StructuredMemoryCandidateGenerator` | class | <code>new StructuredMemoryCandidateGenerator(store: ManagedMemoryRecordStore): StructuredMemoryCandidateGenerator</code> | Structured Memory Candidate Generator class with 4 public constructor or member entries; its exact declarations are listed below. |
| `normalizeMemoryQuery` | function | <code>normalizeMemoryQuery(input: Omit&lt;NormalizedMemoryQuery, "queryHash"&gt;): NormalizedMemoryQuery</code> | Normalize Memory Query function with 1 public call signature; parameters and return types are listed below. |
| `DefaultMemoryRetrievalPipelineOptions` | interface | <code>interface DefaultMemoryRetrievalPipelineOptions</code> | Default Memory Retrieval Pipeline Options interface with 4 public fields or methods. |
| `DenseMemoryCandidateGeneratorOptions` | interface | <code>interface DenseMemoryCandidateGeneratorOptions</code> | Dense Memory Candidate Generator Options interface with 2 public fields or methods. |
| `MemoryCandidate` | interface | <code>interface MemoryCandidate</code> | Memory Candidate interface with 8 public fields or methods. |
| `MemoryCandidateGenerationRequest` | interface | <code>interface MemoryCandidateGenerationRequest</code> | Memory Candidate Generation Request interface with 3 public fields or methods. |
| `MemoryCandidateGenerator` | interface | <code>interface MemoryCandidateGenerator</code> | Memory Candidate Generator interface with 3 public fields or methods. |
| `MemoryMatchedFragment` | interface | <code>interface MemoryMatchedFragment</code> | Memory Matched Fragment interface with 5 public fields or methods. |
| `MemoryRankingPolicySpecV2` | interface | <code>interface MemoryRankingPolicySpecV2 extends MemoryRetrievalPolicySpec</code> | Memory Ranking Policy Spec V2 interface with 19 public fields or methods. |
| `MemoryRetrievalExplanation` | interface | <code>interface MemoryRetrievalExplanation</code> | Memory Retrieval Explanation interface with 8 public fields or methods. |
| `MemoryRetrievalPipeline` | interface | <code>interface MemoryRetrievalPipeline</code> | Memory Retrieval Pipeline interface with 2 public fields or methods. |
| `MemoryRetrievalRequest` | interface | <code>interface MemoryRetrievalRequest</code> | Memory Retrieval Request interface with 7 public fields or methods. |
| `MemoryRetrievalResult` | interface | <code>interface MemoryRetrievalResult</code> | Memory Retrieval Result interface with 3 public fields or methods. |
| `MemoryRetrievalSnapshot` | interface | <code>interface MemoryRetrievalSnapshot</code> | Memory Retrieval Snapshot interface with 12 public fields or methods. |
| `MemorySearchFilterV2` | interface | <code>interface MemorySearchFilterV2 extends MemorySearchFilter</code> | Memory Search Filter V2 interface with 25 public fields or methods. |
| `NormalizedMemoryQuery` | interface | <code>interface NormalizedMemoryQuery</code> | Normalized Memory Query interface with 12 public fields or methods. |
| `MemoryCandidateGeneratorType` | type | <code>type MemoryCandidateGeneratorType = 'structured' &#124; 'keyword' &#124; 'dense' &#124; 'sparse' &#124; 'graph' &#124; 'recent' &#124; 'custom'</code> | Public type alias for Memory Candidate Generator Type; the declaration contains its complete type expression. |

## `DefaultMemoryRetrievalPipeline`

Default Memory Retrieval Pipeline class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultMemoryRetrievalPipeline } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export declare class DefaultMemoryRetrievalPipeline implements MemoryRetrievalPipeline {
    constructor(options: DefaultMemoryRetrievalPipelineOptions);
    retrieve(request: MemoryRetrievalRequest): Promise<MemoryRetrievalResult>;
    explain(snapshotId: string): Promise<MemoryRetrievalResult | null>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DefaultMemoryRetrievalPipelineOptions): DefaultMemoryRetrievalPipeline</code> | Creates an instance of this class. |
| `explain` | method | <code>explain(snapshotId: string): Promise&lt;MemoryRetrievalResult &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `retrieve` | method | <code>retrieve(request: MemoryRetrievalRequest): Promise&lt;MemoryRetrievalResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DenseMemoryCandidateGenerator`

Generates scope-fenced dense candidates from the configured vector projection.

- Kind: class
- Import: `import { DenseMemoryCandidateGenerator } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export declare class DenseMemoryCandidateGenerator implements MemoryCandidateGenerator {
    readonly id: string;
    readonly type: "dense";
    constructor(options: DenseMemoryCandidateGeneratorOptions);
    generate(request: MemoryCandidateGenerationRequest): Promise<MemoryCandidate[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DenseMemoryCandidateGeneratorOptions): DenseMemoryCandidateGenerator</code> | Creates an instance of this class. |
| `generate` | method | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>readonly type: "dense"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `KeywordMemoryCandidateGenerator`

Keyword Memory Candidate Generator class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { KeywordMemoryCandidateGenerator } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export declare class KeywordMemoryCandidateGenerator implements MemoryCandidateGenerator {
    readonly id = "memory.generator.keyword";
    readonly type: "keyword";
    constructor(store: ManagedMemoryRecordStore);
    generate(request: MemoryCandidateGenerationRequest): Promise<MemoryCandidate[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(store: ManagedMemoryRecordStore): KeywordMemoryCandidateGenerator</code> | Creates an instance of this class. |
| `generate` | method | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: "memory.generator.keyword"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>readonly type: "keyword"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StructuredMemoryCandidateGenerator`

Structured Memory Candidate Generator class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { StructuredMemoryCandidateGenerator } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export declare class StructuredMemoryCandidateGenerator implements MemoryCandidateGenerator {
    readonly id = "memory.generator.structured";
    readonly type: "structured";
    constructor(store: ManagedMemoryRecordStore);
    generate(request: MemoryCandidateGenerationRequest): Promise<MemoryCandidate[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(store: ManagedMemoryRecordStore): StructuredMemoryCandidateGenerator</code> | Creates an instance of this class. |
| `generate` | method | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: "memory.generator.structured"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>readonly type: "structured"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `normalizeMemoryQuery`

Normalize Memory Query function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizeMemoryQuery } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export declare function normalizeMemoryQuery(input: Omit<NormalizedMemoryQuery, 'queryHash'>): NormalizedMemoryQuery;
```

### Call signature

```text
normalizeMemoryQuery(input: Omit<NormalizedMemoryQuery, "queryHash">): NormalizedMemoryQuery
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;NormalizedMemoryQuery, "queryHash"&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `NormalizedMemoryQuery`
- Description: The return contract is defined by the type shown above.

## `DefaultMemoryRetrievalPipelineOptions`

Default Memory Retrieval Pipeline Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { DefaultMemoryRetrievalPipelineOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export interface DefaultMemoryRetrievalPipelineOptions {
    recordStore: ManagedMemoryRecordStore;
    generators: MemoryCandidateGenerator[];
    rankingPolicy: MemoryRankingPolicySpecV2;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `generators` | property | <code>generators: MemoryCandidateGenerator[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `rankingPolicy` | property | <code>rankingPolicy: MemoryRankingPolicySpecV2</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordStore` | property | <code>recordStore: ManagedMemoryRecordStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DenseMemoryCandidateGeneratorOptions`

Dense Memory Candidate Generator Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { DenseMemoryCandidateGeneratorOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export interface DenseMemoryCandidateGeneratorOptions {
    store: ManagedVectorStoreAdapter;
    embeddings: EmbeddingProvider;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `embeddings` | property | <code>embeddings: EmbeddingProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `store` | property | <code>store: ManagedVectorStoreAdapter</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryCandidate`

Memory Candidate interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MemoryCandidate } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export interface MemoryCandidate {
    memoryId: string;
    generatorId: string;
    generatorType?: MemoryCandidateGeneratorType;
    rawScore?: number;
    normalizedScore?: number;
    matchedFields?: string[];
    matchedFragments?: MemoryMatchedFragment[];
    reasons?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `generatorId` | property | <code>generatorId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `generatorType` | property | <code>generatorType?: MemoryCandidateGeneratorType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `matchedFields` | property | <code>matchedFields?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `matchedFragments` | property | <code>matchedFragments?: MemoryMatchedFragment[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryId` | property | <code>memoryId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `normalizedScore` | property | <code>normalizedScore?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rawScore` | property | <code>rawScore?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasons` | property | <code>reasons?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryCandidateGenerationRequest`

Memory Candidate Generation Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryCandidateGenerationRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export interface MemoryCandidateGenerationRequest {
    query: NormalizedMemoryQuery;
    filter?: MemorySearchFilterV2;
    limit: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filter` | property | <code>filter?: MemorySearchFilterV2</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `query` | property | <code>query: NormalizedMemoryQuery</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryCandidateGenerator`

Memory Candidate Generator interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryCandidateGenerator } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export interface MemoryCandidateGenerator {
    readonly id: string;
    readonly type: MemoryCandidateGeneratorType;
    generate(request: MemoryCandidateGenerationRequest): Promise<MemoryCandidate[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `generate` | method | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>readonly type: MemoryCandidateGeneratorType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryMatchedFragment`

Memory Matched Fragment interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryMatchedFragment } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export interface MemoryMatchedFragment {
    field: string;
    text?: string;
    start?: number;
    end?: number;
    fragmentHash?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `end` | property | <code>end?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `field` | property | <code>field: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fragmentHash` | property | <code>fragmentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `start` | property | <code>start?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `text` | property | <code>text?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRankingPolicySpecV2`

Memory Ranking Policy Spec V2 interface with 19 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRankingPolicySpecV2 } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export interface MemoryRankingPolicySpecV2 extends MemoryRetrievalPolicySpec {
    normalization: 'min_max' | 'z_score' | 'rank' | 'provider_normalized';
    weights: {
        semantic?: number;
        keyword?: number;
        exact?: number;
        graph?: number;
        recency?: number;
        importance?: number;
        confidence?: number;
        authority?: number;
        verified?: number;
        reinforcement?: number;
    };
    freshnessHalfLifeSeconds?: number;
    diversity?: {
        method: 'none' | 'mmr' | 'per_entity_cap' | 'per_source_cap';
        lambda?: number;
        maxPerEntity?: number;
        maxPerSource?: number;
    };
    stableTieBreak: 'memory_id' | 'updated_at_then_id' | 'created_at_then_id';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `confidenceWeight` | property | <code>confidenceWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conflictHandling` | property | <code>conflictHandling?: "include_marked" &#124; "prefer_latest" &#124; "prefer_verified" &#124; "exclude_conflicts"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deduplication` | property | <code>deduplication: "none" &#124; "id" &#124; "semantic" &#124; "hash"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultMode` | property | <code>defaultMode: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultTopK` | property | <code>defaultTopK: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `diversity` | property | <code>diversity?: { method: "none" &#124; "mmr" &#124; "per_entity_cap" &#124; "per_source_cap"; lambda?: number; maxPerEntity?: number; maxPerSource?: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `freshnessHalfLifeSeconds` | property | <code>freshnessHalfLifeSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `importanceWeight` | property | <code>importanceWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxCandidates` | property | <code>maxCandidates: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryTypePriority` | property | <code>memoryTypePriority?: Partial&lt;Record&lt;ManagedMemoryType, number&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `normalization` | property | <code>normalization: "min_max" &#124; "z_score" &#124; "rank" &#124; "provider_normalized"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recencyWeight` | property | <code>recencyWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reinforcementWeight` | property | <code>reinforcementWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rerank` | property | <code>rerank?: "none" &#124; "provider" &#124; "custom" &#124; "score_fusion"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scoreThreshold` | property | <code>scoreThreshold?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `semanticDedupThreshold` | property | <code>semanticDedupThreshold?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourcePriority` | property | <code>sourcePriority?: Partial&lt;Record&lt;"human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import", number&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stableTieBreak` | property | <code>stableTieBreak: "memory_id" &#124; "updated_at_then_id" &#124; "created_at_then_id"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `weights` | property | <code>weights: { semantic?: number; keyword?: number; exact?: number; graph?: number; recency?: number; importance?: number; confidence?: number; authority?: number; verified?: number; reinforcement?: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRetrievalExplanation`

Memory Retrieval Explanation interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRetrievalExplanation } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export interface MemoryRetrievalExplanation {
    memoryId: string;
    finalRank: number;
    finalScore: number;
    componentScores: Record<string, number>;
    filtersPassed: string[];
    filtersRejected?: string[];
    selectedBecause: string[];
    conflictMarkers?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `componentScores` | property | <code>componentScores: Record&lt;string, number&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conflictMarkers` | property | <code>conflictMarkers?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `filtersPassed` | property | <code>filtersPassed: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `filtersRejected` | property | <code>filtersRejected?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalRank` | property | <code>finalRank: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalScore` | property | <code>finalScore: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryId` | property | <code>memoryId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `selectedBecause` | property | <code>selectedBecause: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRetrievalPipeline`

Memory Retrieval Pipeline interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRetrievalPipeline } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export interface MemoryRetrievalPipeline {
    retrieve(request: MemoryRetrievalRequest): Promise<MemoryRetrievalResult>;
    explain(snapshotId: string): Promise<MemoryRetrievalResult | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `explain` | method | <code>explain(snapshotId: string): Promise&lt;MemoryRetrievalResult &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `retrieve` | method | <code>retrieve(request: MemoryRetrievalRequest): Promise&lt;MemoryRetrievalResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryRetrievalRequest`

Memory Retrieval Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRetrievalRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export interface MemoryRetrievalRequest {
    query: NormalizedMemoryQuery;
    profileRef: MemoryContractSpecRef;
    filter?: MemorySearchFilterV2;
    topK: number;
    scoreThreshold?: number;
    includeSuperseded?: boolean;
    includeInvalidated?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filter` | property | <code>filter?: MemorySearchFilterV2</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeInvalidated` | property | <code>includeInvalidated?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeSuperseded` | property | <code>includeSuperseded?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `query` | property | <code>query: NormalizedMemoryQuery</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scoreThreshold` | property | <code>scoreThreshold?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `topK` | property | <code>topK: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRetrievalResult`

Memory Retrieval Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRetrievalResult } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export interface MemoryRetrievalResult {
    results: ManagedMemorySearchResult[];
    snapshot: MemoryRetrievalSnapshot;
    explanations: MemoryRetrievalExplanation[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `explanations` | property | <code>explanations: MemoryRetrievalExplanation[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `results` | property | <code>results: ManagedMemorySearchResult[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshot` | property | <code>snapshot: MemoryRetrievalSnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRetrievalSnapshot`

Memory Retrieval Snapshot interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRetrievalSnapshot } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export interface MemoryRetrievalSnapshot {
    id: string;
    operationId: string;
    queryHash: string;
    profileRef: MemoryContractSpecRef;
    profileRevision: string;
    filterHash: string;
    generatorIds: string[];
    candidateCount: number;
    rankingPolicyHash: string;
    rerankerRef?: MemoryContractSpecRef;
    resultMemoryIds: string[];
    createdAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidateCount` | property | <code>candidateCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `filterHash` | property | <code>filterHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `generatorIds` | property | <code>generatorIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `queryHash` | property | <code>queryHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rankingPolicyHash` | property | <code>rankingPolicyHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rerankerRef` | property | <code>rerankerRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resultMemoryIds` | property | <code>resultMemoryIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemorySearchFilterV2`

Memory Search Filter V2 interface with 25 public fields or methods.

- Kind: interface
- Import: `import type { MemorySearchFilterV2 } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export interface MemorySearchFilterV2 extends MemorySearchFilter {
    excludeTags?: string[];
    authorities?: NonNullable<MemoryExtractionSourceRef['authority']>[];
    validAt?: string;
    validFromBefore?: string;
    validToAfter?: string;
    relationTypes?: MemoryRelation['type'][];
    legalHoldOnly?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorities` | property | <code>authorities?: NonNullable&lt;"verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `canonicalKeys` | property | <code>canonicalKeys?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `confidenceGte` | property | <code>confidenceGte?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conflictFreeOnly` | property | <code>conflictFreeOnly?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAfter` | property | <code>createdAfter?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdBefore` | property | <code>createdBefore?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `entityIds` | property | <code>entityIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `excludeIds` | property | <code>excludeIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `excludeTags` | property | <code>excludeTags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAfter` | property | <code>expiresAfter?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ids` | property | <code>ids?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `importanceGte` | property | <code>importanceGte?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legalHoldOnly` | property | <code>legalHoldOnly?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relationTypes` | property | <code>relationTypes?: ("supports" &#124; "contradicts" &#124; "supersedes" &#124; "derived_from" &#124; "related_to" &#124; "same_as" &#124; "part_of")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceTypes` | property | <code>sourceTypes?: ("human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statuses` | property | <code>statuses?: MemoryStatus[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tagsAll` | property | <code>tagsAll?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tagsAny` | property | <code>tagsAny?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAfter` | property | <code>updatedAfter?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validAt` | property | <code>validAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validFromBefore` | property | <code>validFromBefore?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validToAfter` | property | <code>validToAfter?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `verifiedOnly` | property | <code>verifiedOnly?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `visibility` | property | <code>visibility?: ("workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `NormalizedMemoryQuery`

Normalized Memory Query interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { NormalizedMemoryQuery } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export interface NormalizedMemoryQuery {
    operationId: string;
    scope: ManagedMemoryScope;
    principal: MemoryPrincipal;
    rawQuery?: string;
    normalizedQuery?: string;
    queryEmbedding?: number[];
    entities?: MemoryEntityRef[];
    temporalIntent?: {
        at?: string;
        from?: string;
        to?: string;
    };
    requestedTypes?: ManagedMemoryType[];
    mode?: 'structured' | 'semantic' | 'keyword' | 'hybrid' | 'graph';
    profileRevision: string;
    queryHash: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `entities` | property | <code>entities?: MemoryEntityRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode?: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword" &#124; "graph"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `normalizedQuery` | property | <code>normalizedQuery?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `queryEmbedding` | property | <code>queryEmbedding?: number[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `queryHash` | property | <code>queryHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rawQuery` | property | <code>rawQuery?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedTypes` | property | <code>requestedTypes?: ManagedMemoryType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `temporalIntent` | property | <code>temporalIntent?: { at?: string; from?: string; to?: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryCandidateGeneratorType`

Public type alias for Memory Candidate Generator Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryCandidateGeneratorType } from '@codesoul-co/hypha-memory';`
- Source module: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### Declaration

```text
export type MemoryCandidateGeneratorType = 'structured' | 'keyword' | 'dense' | 'sparse' | 'graph' | 'recent' | 'custom';
```
