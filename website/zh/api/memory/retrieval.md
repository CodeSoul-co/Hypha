# `@codesoul-co/hypha-memory` / `retrieval`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/retrieval.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)
- 导出数: **20**

## 模块用法

用于使用该功能边界的公共契约与操作。Retrieval 模块公开 4 类、1 函数、14 接口、1 类型。

### 从包入口导入

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

// 完整导出列表见下方。
```

### 使用要点

- 15 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 4 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultMemoryRetrievalPipeline` | 类 | <code>new DefaultMemoryRetrievalPipeline(options: DefaultMemoryRetrievalPipelineOptions): DefaultMemoryRetrievalPipeline</code> | Default Memory Retrieval Pipeline 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DenseMemoryCandidateGenerator` | 类 | <code>new DenseMemoryCandidateGenerator(options: DenseMemoryCandidateGeneratorOptions): DenseMemoryCandidateGenerator</code> | Generates scope-fenced dense candidates from the configured vector projection. |
| `KeywordMemoryCandidateGenerator` | 类 | <code>new KeywordMemoryCandidateGenerator(store: ManagedMemoryRecordStore): KeywordMemoryCandidateGenerator</code> | Keyword Memory Candidate Generator 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `StructuredMemoryCandidateGenerator` | 类 | <code>new StructuredMemoryCandidateGenerator(store: ManagedMemoryRecordStore): StructuredMemoryCandidateGenerator</code> | Structured Memory Candidate Generator 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `normalizeMemoryQuery` | 函数 | <code>normalizeMemoryQuery(input: Omit&lt;NormalizedMemoryQuery, "queryHash"&gt;): NormalizedMemoryQuery</code> | Normalize Memory Query 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `DefaultMemoryRetrievalPipelineOptions` | 接口 | <code>interface DefaultMemoryRetrievalPipelineOptions</code> | Default Memory Retrieval Pipeline Options 接口，共包含 4 个公开字段或方法。 |
| `DenseMemoryCandidateGeneratorOptions` | 接口 | <code>interface DenseMemoryCandidateGeneratorOptions</code> | Dense Memory Candidate Generator Options 接口，共包含 2 个公开字段或方法。 |
| `MemoryCandidate` | 接口 | <code>interface MemoryCandidate</code> | Memory Candidate 接口，共包含 8 个公开字段或方法。 |
| `MemoryCandidateGenerationRequest` | 接口 | <code>interface MemoryCandidateGenerationRequest</code> | Memory Candidate Generation Request 接口，共包含 3 个公开字段或方法。 |
| `MemoryCandidateGenerator` | 接口 | <code>interface MemoryCandidateGenerator</code> | Memory Candidate Generator 接口，共包含 3 个公开字段或方法。 |
| `MemoryMatchedFragment` | 接口 | <code>interface MemoryMatchedFragment</code> | Memory Matched Fragment 接口，共包含 5 个公开字段或方法。 |
| `MemoryRankingPolicySpecV2` | 接口 | <code>interface MemoryRankingPolicySpecV2 extends MemoryRetrievalPolicySpec</code> | Memory Ranking Policy Spec V2 接口，共包含 19 个公开字段或方法。 |
| `MemoryRetrievalExplanation` | 接口 | <code>interface MemoryRetrievalExplanation</code> | Memory Retrieval Explanation 接口，共包含 8 个公开字段或方法。 |
| `MemoryRetrievalPipeline` | 接口 | <code>interface MemoryRetrievalPipeline</code> | Memory Retrieval Pipeline 接口，共包含 2 个公开字段或方法。 |
| `MemoryRetrievalRequest` | 接口 | <code>interface MemoryRetrievalRequest</code> | Memory Retrieval Request 接口，共包含 7 个公开字段或方法。 |
| `MemoryRetrievalResult` | 接口 | <code>interface MemoryRetrievalResult</code> | Memory Retrieval Result 接口，共包含 3 个公开字段或方法。 |
| `MemoryRetrievalSnapshot` | 接口 | <code>interface MemoryRetrievalSnapshot</code> | Memory Retrieval Snapshot 接口，共包含 12 个公开字段或方法。 |
| `MemorySearchFilterV2` | 接口 | <code>interface MemorySearchFilterV2 extends MemorySearchFilter</code> | Memory Search Filter V2 接口，共包含 25 个公开字段或方法。 |
| `NormalizedMemoryQuery` | 接口 | <code>interface NormalizedMemoryQuery</code> | Normalized Memory Query 接口，共包含 12 个公开字段或方法。 |
| `MemoryCandidateGeneratorType` | 类型 | <code>type MemoryCandidateGeneratorType = 'structured' &#124; 'keyword' &#124; 'dense' &#124; 'sparse' &#124; 'graph' &#124; 'recent' &#124; 'custom'</code> | Memory Candidate Generator Type 公共类型别名；完整类型表达式见声明。 |

## `DefaultMemoryRetrievalPipeline`

Default Memory Retrieval Pipeline 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultMemoryRetrievalPipeline } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

```text
export declare class DefaultMemoryRetrievalPipeline implements MemoryRetrievalPipeline {
    constructor(options: DefaultMemoryRetrievalPipelineOptions);
    retrieve(request: MemoryRetrievalRequest): Promise<MemoryRetrievalResult>;
    explain(snapshotId: string): Promise<MemoryRetrievalResult | null>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DefaultMemoryRetrievalPipelineOptions): DefaultMemoryRetrievalPipeline</code> | 创建该类的实例。 |
| `explain` | 方法 | <code>explain(snapshotId: string): Promise&lt;MemoryRetrievalResult &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `retrieve` | 方法 | <code>retrieve(request: MemoryRetrievalRequest): Promise&lt;MemoryRetrievalResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DenseMemoryCandidateGenerator`

Generates scope-fenced dense candidates from the configured vector projection.

- 种类: 类
- 导入: `import { DenseMemoryCandidateGenerator } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

```text
export declare class DenseMemoryCandidateGenerator implements MemoryCandidateGenerator {
    readonly id: string;
    readonly type: "dense";
    constructor(options: DenseMemoryCandidateGeneratorOptions);
    generate(request: MemoryCandidateGenerationRequest): Promise<MemoryCandidate[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DenseMemoryCandidateGeneratorOptions): DenseMemoryCandidateGenerator</code> | 创建该类的实例。 |
| `generate` | 方法 | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>readonly type: "dense"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `KeywordMemoryCandidateGenerator`

Keyword Memory Candidate Generator 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { KeywordMemoryCandidateGenerator } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

```text
export declare class KeywordMemoryCandidateGenerator implements MemoryCandidateGenerator {
    readonly id = "memory.generator.keyword";
    readonly type: "keyword";
    constructor(store: ManagedMemoryRecordStore);
    generate(request: MemoryCandidateGenerationRequest): Promise<MemoryCandidate[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(store: ManagedMemoryRecordStore): KeywordMemoryCandidateGenerator</code> | 创建该类的实例。 |
| `generate` | 方法 | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: "memory.generator.keyword"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>readonly type: "keyword"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StructuredMemoryCandidateGenerator`

Structured Memory Candidate Generator 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { StructuredMemoryCandidateGenerator } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

```text
export declare class StructuredMemoryCandidateGenerator implements MemoryCandidateGenerator {
    readonly id = "memory.generator.structured";
    readonly type: "structured";
    constructor(store: ManagedMemoryRecordStore);
    generate(request: MemoryCandidateGenerationRequest): Promise<MemoryCandidate[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(store: ManagedMemoryRecordStore): StructuredMemoryCandidateGenerator</code> | 创建该类的实例。 |
| `generate` | 方法 | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: "memory.generator.structured"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>readonly type: "structured"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `normalizeMemoryQuery`

Normalize Memory Query 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizeMemoryQuery } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

```text
export declare function normalizeMemoryQuery(input: Omit<NormalizedMemoryQuery, 'queryHash'>): NormalizedMemoryQuery;
```

### 调用签名

```text
normalizeMemoryQuery(input: Omit<NormalizedMemoryQuery, "queryHash">): NormalizedMemoryQuery
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;NormalizedMemoryQuery, "queryHash"&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `NormalizedMemoryQuery`
- 说明: 返回值契约由上述类型定义。

## `DefaultMemoryRetrievalPipelineOptions`

Default Memory Retrieval Pipeline Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DefaultMemoryRetrievalPipelineOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

```text
export interface DefaultMemoryRetrievalPipelineOptions {
    recordStore: ManagedMemoryRecordStore;
    generators: MemoryCandidateGenerator[];
    rankingPolicy: MemoryRankingPolicySpecV2;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `generators` | 属性 | <code>generators: MemoryCandidateGenerator[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `rankingPolicy` | 属性 | <code>rankingPolicy: MemoryRankingPolicySpecV2</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordStore` | 属性 | <code>recordStore: ManagedMemoryRecordStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DenseMemoryCandidateGeneratorOptions`

Dense Memory Candidate Generator Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DenseMemoryCandidateGeneratorOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

```text
export interface DenseMemoryCandidateGeneratorOptions {
    store: ManagedVectorStoreAdapter;
    embeddings: EmbeddingProvider;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `embeddings` | 属性 | <code>embeddings: EmbeddingProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `store` | 属性 | <code>store: ManagedVectorStoreAdapter</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryCandidate`

Memory Candidate 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryCandidate } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `generatorId` | 属性 | <code>generatorId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `generatorType` | 属性 | <code>generatorType?: MemoryCandidateGeneratorType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `matchedFields` | 属性 | <code>matchedFields?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `matchedFragments` | 属性 | <code>matchedFragments?: MemoryMatchedFragment[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `normalizedScore` | 属性 | <code>normalizedScore?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rawScore` | 属性 | <code>rawScore?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasons` | 属性 | <code>reasons?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryCandidateGenerationRequest`

Memory Candidate Generation Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryCandidateGenerationRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

```text
export interface MemoryCandidateGenerationRequest {
    query: NormalizedMemoryQuery;
    filter?: MemorySearchFilterV2;
    limit: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filter` | 属性 | <code>filter?: MemorySearchFilterV2</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `query` | 属性 | <code>query: NormalizedMemoryQuery</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryCandidateGenerator`

Memory Candidate Generator 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryCandidateGenerator } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

```text
export interface MemoryCandidateGenerator {
    readonly id: string;
    readonly type: MemoryCandidateGeneratorType;
    generate(request: MemoryCandidateGenerationRequest): Promise<MemoryCandidate[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `generate` | 方法 | <code>generate(request: MemoryCandidateGenerationRequest): Promise&lt;MemoryCandidate[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>readonly type: MemoryCandidateGeneratorType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryMatchedFragment`

Memory Matched Fragment 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryMatchedFragment } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

```text
export interface MemoryMatchedFragment {
    field: string;
    text?: string;
    start?: number;
    end?: number;
    fragmentHash?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `end` | 属性 | <code>end?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `field` | 属性 | <code>field: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fragmentHash` | 属性 | <code>fragmentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `start` | 属性 | <code>start?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `text` | 属性 | <code>text?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRankingPolicySpecV2`

Memory Ranking Policy Spec V2 接口，共包含 19 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRankingPolicySpecV2 } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `confidenceWeight` | 属性 | <code>confidenceWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `conflictHandling` | 属性 | <code>conflictHandling?: "include_marked" &#124; "prefer_latest" &#124; "prefer_verified" &#124; "exclude_conflicts"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deduplication` | 属性 | <code>deduplication: "none" &#124; "id" &#124; "semantic" &#124; "hash"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultMode` | 属性 | <code>defaultMode: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultTopK` | 属性 | <code>defaultTopK: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `diversity` | 属性 | <code>diversity?: { method: "none" &#124; "mmr" &#124; "per_entity_cap" &#124; "per_source_cap"; lambda?: number; maxPerEntity?: number; maxPerSource?: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `freshnessHalfLifeSeconds` | 属性 | <code>freshnessHalfLifeSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `importanceWeight` | 属性 | <code>importanceWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxCandidates` | 属性 | <code>maxCandidates: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryTypePriority` | 属性 | <code>memoryTypePriority?: Partial&lt;Record&lt;ManagedMemoryType, number&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `normalization` | 属性 | <code>normalization: "min_max" &#124; "z_score" &#124; "rank" &#124; "provider_normalized"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recencyWeight` | 属性 | <code>recencyWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reinforcementWeight` | 属性 | <code>reinforcementWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rerank` | 属性 | <code>rerank?: "none" &#124; "provider" &#124; "custom" &#124; "score_fusion"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scoreThreshold` | 属性 | <code>scoreThreshold?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `semanticDedupThreshold` | 属性 | <code>semanticDedupThreshold?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourcePriority` | 属性 | <code>sourcePriority?: Partial&lt;Record&lt;"human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import", number&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stableTieBreak` | 属性 | <code>stableTieBreak: "memory_id" &#124; "updated_at_then_id" &#124; "created_at_then_id"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `weights` | 属性 | <code>weights: { semantic?: number; keyword?: number; exact?: number; graph?: number; recency?: number; importance?: number; confidence?: number; authority?: number; verified?: number; reinforcement?: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRetrievalExplanation`

Memory Retrieval Explanation 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRetrievalExplanation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `componentScores` | 属性 | <code>componentScores: Record&lt;string, number&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `conflictMarkers` | 属性 | <code>conflictMarkers?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `filtersPassed` | 属性 | <code>filtersPassed: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `filtersRejected` | 属性 | <code>filtersRejected?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalRank` | 属性 | <code>finalRank: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalScore` | 属性 | <code>finalScore: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `selectedBecause` | 属性 | <code>selectedBecause: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRetrievalPipeline`

Memory Retrieval Pipeline 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRetrievalPipeline } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

```text
export interface MemoryRetrievalPipeline {
    retrieve(request: MemoryRetrievalRequest): Promise<MemoryRetrievalResult>;
    explain(snapshotId: string): Promise<MemoryRetrievalResult | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `explain` | 方法 | <code>explain(snapshotId: string): Promise&lt;MemoryRetrievalResult &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `retrieve` | 方法 | <code>retrieve(request: MemoryRetrievalRequest): Promise&lt;MemoryRetrievalResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryRetrievalRequest`

Memory Retrieval Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRetrievalRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filter` | 属性 | <code>filter?: MemorySearchFilterV2</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeInvalidated` | 属性 | <code>includeInvalidated?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeSuperseded` | 属性 | <code>includeSuperseded?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `query` | 属性 | <code>query: NormalizedMemoryQuery</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scoreThreshold` | 属性 | <code>scoreThreshold?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `topK` | 属性 | <code>topK: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRetrievalResult`

Memory Retrieval Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRetrievalResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

```text
export interface MemoryRetrievalResult {
    results: ManagedMemorySearchResult[];
    snapshot: MemoryRetrievalSnapshot;
    explanations: MemoryRetrievalExplanation[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `explanations` | 属性 | <code>explanations: MemoryRetrievalExplanation[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `results` | 属性 | <code>results: ManagedMemorySearchResult[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshot` | 属性 | <code>snapshot: MemoryRetrievalSnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRetrievalSnapshot`

Memory Retrieval Snapshot 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRetrievalSnapshot } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidateCount` | 属性 | <code>candidateCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `filterHash` | 属性 | <code>filterHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `generatorIds` | 属性 | <code>generatorIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `queryHash` | 属性 | <code>queryHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rankingPolicyHash` | 属性 | <code>rankingPolicyHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rerankerRef` | 属性 | <code>rerankerRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resultMemoryIds` | 属性 | <code>resultMemoryIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemorySearchFilterV2`

Memory Search Filter V2 接口，共包含 25 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemorySearchFilterV2 } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorities` | 属性 | <code>authorities?: NonNullable&lt;"verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `canonicalKeys` | 属性 | <code>canonicalKeys?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `confidenceGte` | 属性 | <code>confidenceGte?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `conflictFreeOnly` | 属性 | <code>conflictFreeOnly?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAfter` | 属性 | <code>createdAfter?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdBefore` | 属性 | <code>createdBefore?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `entityIds` | 属性 | <code>entityIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `excludeIds` | 属性 | <code>excludeIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `excludeTags` | 属性 | <code>excludeTags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAfter` | 属性 | <code>expiresAfter?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ids` | 属性 | <code>ids?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `importanceGte` | 属性 | <code>importanceGte?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legalHoldOnly` | 属性 | <code>legalHoldOnly?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relationTypes` | 属性 | <code>relationTypes?: ("supports" &#124; "contradicts" &#124; "supersedes" &#124; "derived_from" &#124; "related_to" &#124; "same_as" &#124; "part_of")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceTypes` | 属性 | <code>sourceTypes?: ("human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statuses` | 属性 | <code>statuses?: MemoryStatus[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tagsAll` | 属性 | <code>tagsAll?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tagsAny` | 属性 | <code>tagsAny?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAfter` | 属性 | <code>updatedAfter?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validAt` | 属性 | <code>validAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validFromBefore` | 属性 | <code>validFromBefore?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validToAfter` | 属性 | <code>validToAfter?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `verifiedOnly` | 属性 | <code>verifiedOnly?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `visibility` | 属性 | <code>visibility?: ("workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `NormalizedMemoryQuery`

Normalized Memory Query 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NormalizedMemoryQuery } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `entities` | 属性 | <code>entities?: MemoryEntityRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode?: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword" &#124; "graph"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `normalizedQuery` | 属性 | <code>normalizedQuery?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `queryEmbedding` | 属性 | <code>queryEmbedding?: number[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `queryHash` | 属性 | <code>queryHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rawQuery` | 属性 | <code>rawQuery?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedTypes` | 属性 | <code>requestedTypes?: ManagedMemoryType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `temporalIntent` | 属性 | <code>temporalIntent?: { at?: string; from?: string; to?: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryCandidateGeneratorType`

Memory Candidate Generator Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryCandidateGeneratorType } from '@codesoul-co/hypha-memory';`
- 源码模块: [`retrieval`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/retrieval.ts)

### 声明

```text
export type MemoryCandidateGeneratorType = 'structured' | 'keyword' | 'dense' | 'sparse' | 'graph' | 'recent' | 'custom';
```
