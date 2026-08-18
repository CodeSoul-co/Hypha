# `@codesoul-co/hypha-memory` / `context-contracts`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/context-contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)
- 导出数: **29**

## 模块用法

用于声明并运行时校验契约。Context contracts 模块公开 28 接口、1 类型。

### 从包入口导入

```ts
import type {
  ContextBudgetPlan,
  ContextBuildExplanation,
  ContextBuildInput,
  ContextBuildRequest,
  ContextBundle,
  ContextCompactionPolicySpec,
  ContextConflict,
  ContextEnvelope,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 29 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ContextBudgetPlan` | 接口 | <code>interface ContextBudgetPlan</code> | Context Budget Plan 接口，共包含 6 个公开字段或方法。 |
| `ContextBuildExplanation` | 接口 | <code>interface ContextBuildExplanation</code> | Context Build Explanation 接口，共包含 6 个公开字段或方法。 |
| `ContextBuildInput` | 接口 | <code>interface ContextBuildInput extends ContextBuildRequest</code> | Context Build Input 接口，共包含 20 个公开字段或方法。 |
| `ContextBuildRequest` | 接口 | <code>interface ContextBuildRequest</code> | Context Build Request 接口，共包含 17 个公开字段或方法。 |
| `ContextBundle` | 接口 | <code>interface ContextBundle</code> | Context Bundle 接口，共包含 16 个公开字段或方法。 |
| `ContextCompactionPolicySpec` | 接口 | <code>interface ContextCompactionPolicySpec</code> | Context Compaction Policy Spec 接口，共包含 6 个公开字段或方法。 |
| `ContextConflict` | 接口 | <code>interface ContextConflict</code> | Context Conflict 接口，共包含 3 个公开字段或方法。 |
| `ContextEnvelope` | 接口 | <code>interface ContextEnvelope</code> | Context Envelope 接口，共包含 17 个公开字段或方法。 |
| `ContextInjectionGateway` | 接口 | <code>interface ContextInjectionGateway</code> | Context Injection Gateway 接口，共包含 1 个公开字段或方法。 |
| `ContextItem` | 接口 | <code>interface ContextItem</code> | Context Item 接口，共包含 14 个公开字段或方法。 |
| `ContextItemPolicyDecision` | 接口 | <code>interface ContextItemPolicyDecision</code> | Context Item Policy Decision 接口，共包含 2 个公开字段或方法。 |
| `ContextItemPolicyEvaluator` | 接口 | <code>interface ContextItemPolicyEvaluator</code> | Context Item Policy Evaluator 接口，共包含 1 个公开字段或方法。 |
| `ContextItemPolicyInput` | 接口 | <code>interface ContextItemPolicyInput</code> | Context Item Policy Input 接口，共包含 5 个公开字段或方法。 |
| `ContextProfileSpec` | 接口 | <code>interface ContextProfileSpec</code> | Context Profile Spec 接口，共包含 23 个公开字段或方法。 |
| `ContextProvenanceLabel` | 接口 | <code>interface ContextProvenanceLabel</code> | Context Provenance Label 接口，共包含 7 个公开字段或方法。 |
| `ContextRankingPolicySpec` | 接口 | <code>interface ContextRankingPolicySpec</code> | Context Ranking Policy Spec 接口，共包含 8 个公开字段或方法。 |
| `ContextRejectedItem` | 接口 | <code>interface ContextRejectedItem</code> | Context Rejected Item 接口，共包含 2 个公开字段或方法。 |
| `ContextSourceBudget` | 接口 | <code>interface ContextSourceBudget</code> | Context Source Budget 接口，共包含 6 个公开字段或方法。 |
| `ContextSourceResolutionInput` | 接口 | <code>interface ContextSourceResolutionInput extends ResolvedContextBuildInput</code> | Context Source Resolution Input 接口，共包含 20 个公开字段或方法。 |
| `ContextSourceResolver` | 接口 | <code>interface ContextSourceResolver</code> | Context Source Resolver 接口，共包含 3 个公开字段或方法。 |
| `ContextSourceResolverRegistry` | 接口 | <code>interface ContextSourceResolverRegistry</code> | Context Source Resolver Registry 接口，共包含 1 个公开字段或方法。 |
| `ContextSourceSpec` | 接口 | <code>interface ContextSourceSpec</code> | Context Source Spec 接口，共包含 9 个公开字段或方法。 |
| `ContextTruncationPolicySpec` | 接口 | <code>interface ContextTruncationPolicySpec</code> | Context Truncation Policy Spec 接口，共包含 5 个公开字段或方法。 |
| `ContextTruncationRecord` | 接口 | <code>interface ContextTruncationRecord</code> | Context Truncation Record 接口，共包含 5 个公开字段或方法。 |
| `MemoryContextBuilder` | 接口 | <code>interface MemoryContextBuilder</code> | Memory Context Builder 接口，共包含 2 个公开字段或方法。 |
| `PromptSegment` | 接口 | <code>interface PromptSegment</code> | Prompt Segment 接口，共包含 8 个公开字段或方法。 |
| `ResolvedContextBuildInput` | 接口 | <code>interface ResolvedContextBuildInput extends ContextBuildRequest</code> | Resolved Context Build Input 接口，共包含 19 个公开字段或方法。 |
| `TokenEstimator` | 接口 | <code>interface TokenEstimator</code> | Token Estimator 接口，共包含 2 个公开字段或方法。 |
| `ContextSourceType` | 类型 | <code>type ContextSourceType = 'system' &#124; 'workflow_state' &#124; 'messages' &#124; 'working_memory' &#124; 'long_term_memory' &#124; 'tool_observation' &#124; 'artifact' &#124; 'human_review' &#124; 'custom'</code> | Context Source Type 公共类型别名；完整类型表达式见声明。 |

## `ContextBudgetPlan`

Context Budget Plan 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextBudgetPlan } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextBudgetPlan {
    totalAvailableTokens: number;
    fixedTokens: number;
    dynamicTokens: number;
    sourceBudgets: ContextSourceBudget[];
    tokenizerRef: MemoryContractSpecRef;
    safetyMarginTokens: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dynamicTokens` | 属性 | <code>dynamicTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fixedTokens` | 属性 | <code>fixedTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `safetyMarginTokens` | 属性 | <code>safetyMarginTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceBudgets` | 属性 | <code>sourceBudgets: ContextSourceBudget[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenizerRef` | 属性 | <code>tokenizerRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalAvailableTokens` | 属性 | <code>totalAvailableTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextBuildExplanation`

Context Build Explanation 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextBuildExplanation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextBuildExplanation {
    contextHash: string;
    selectedItemIds: string[];
    omittedItemIds: string[];
    rejectedItems: ContextRejectedItem[];
    ranking: Array<{
        itemId: string;
        score: number;
        reasons: string[];
    }>;
    budgetPlan: ContextBudgetPlan;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `budgetPlan` | 属性 | <code>budgetPlan: ContextBudgetPlan</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextHash` | 属性 | <code>contextHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `omittedItemIds` | 属性 | <code>omittedItemIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ranking` | 属性 | <code>ranking: { itemId: string; score: number; reasons: string[]; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rejectedItems` | 属性 | <code>rejectedItems: ContextRejectedItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `selectedItemIds` | 属性 | <code>selectedItemIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextBuildInput`

Context Build Input 接口，共包含 20 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextBuildInput } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextBuildInput extends ContextBuildRequest {
    profile: ContextProfileSpec;
    sourceItems: ContextItem[];
    tokenizerRef?: MemoryContractSpecRef;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `explicitSourceRefs` | 属性 | <code>explicitSourceRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messageCursor` | 属性 | <code>messageCursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelContextWindowTokens` | 属性 | <code>modelContextWindowTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `previousContextHash` | 属性 | <code>previousContextHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profile` | 属性 | <code>profile: ContextProfileSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `query` | 属性 | <code>query?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedInstructionTokens` | 属性 | <code>reservedInstructionTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedOutputTokens` | 属性 | <code>reservedOutputTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedSystemTokens` | 属性 | <code>reservedSystemTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtimeStateRef` | 属性 | <code>runtimeStateRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceItems` | 属性 | <code>sourceItems: ContextItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenizerRef` | 属性 | <code>tokenizerRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextBuildRequest`

Context Build Request 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextBuildRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextBuildRequest {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    runId: string;
    stepId?: string;
    stateId?: string;
    profileRef: MemoryContractSpecRef;
    modelContextWindowTokens: number;
    reservedSystemTokens: number;
    reservedInstructionTokens: number;
    reservedOutputTokens: number;
    runtimeStateRef?: string;
    messageCursor?: string;
    explicitSourceRefs?: string[];
    query?: string;
    previousContextHash?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `explicitSourceRefs` | 属性 | <code>explicitSourceRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messageCursor` | 属性 | <code>messageCursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelContextWindowTokens` | 属性 | <code>modelContextWindowTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `previousContextHash` | 属性 | <code>previousContextHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `query` | 属性 | <code>query?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedInstructionTokens` | 属性 | <code>reservedInstructionTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedOutputTokens` | 属性 | <code>reservedOutputTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedSystemTokens` | 属性 | <code>reservedSystemTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtimeStateRef` | 属性 | <code>runtimeStateRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextBundle`

Context Bundle 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextBundle } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextBundle {
    id: string;
    runId: string;
    stepId?: string;
    profileRef: MemoryContractSpecRef;
    profileRevision: string;
    items: ContextItem[];
    totalTokens: number;
    totalCharacters: number;
    omittedItemIds: string[];
    rejectedItems: ContextRejectedItem[];
    conflicts: ContextConflict[];
    sourceHashes: Record<string, string>;
    contextHash: string;
    createdAt: string;
    metadata?: Record<string, unknown>;
    artifactRefs?: ContextArtifactRef[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs?: ContextArtifactRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `conflicts` | 属性 | <code>conflicts: ContextConflict[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextHash` | 属性 | <code>contextHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `items` | 属性 | <code>items: ContextItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `omittedItemIds` | 属性 | <code>omittedItemIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rejectedItems` | 属性 | <code>rejectedItems: ContextRejectedItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceHashes` | 属性 | <code>sourceHashes: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalCharacters` | 属性 | <code>totalCharacters: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalTokens` | 属性 | <code>totalTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextCompactionPolicySpec`

Context Compaction Policy Spec 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextCompactionPolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextCompactionPolicySpec {
    enabled: boolean;
    triggerRatio: number;
    summaryProviderRef?: MemoryContractSpecRef;
    preserveLastMessages?: number;
    persistSummaryAsMemory?: boolean;
    summaryMemoryType?: import('./contracts').ManagedMemoryType;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enabled` | 属性 | <code>enabled: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `persistSummaryAsMemory` | 属性 | <code>persistSummaryAsMemory?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preserveLastMessages` | 属性 | <code>preserveLastMessages?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `summaryMemoryType` | 属性 | <code>summaryMemoryType?: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").ManagedMemoryType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `summaryProviderRef` | 属性 | <code>summaryProviderRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `triggerRatio` | 属性 | <code>triggerRatio: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextConflict`

Context Conflict 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextConflict } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextConflict {
    conflictGroupId: string;
    itemIds: string[];
    resolution?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `conflictGroupId` | 属性 | <code>conflictGroupId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `itemIds` | 属性 | <code>itemIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolution` | 属性 | <code>resolution?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextEnvelope`

Context Envelope 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextEnvelope } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextEnvelope {
    id: string;
    runId: string;
    stepId?: string;
    contextHash: string;
    profileRevision: string;
    budgetPlan: ContextBudgetPlan;
    systemSegments: PromptSegment[];
    instructionSegments: PromptSegment[];
    dataSegments: PromptSegment[];
    includedSourceRefs: string[];
    omittedSourceRefs: string[];
    truncationRecords: ContextTruncationRecord[];
    provenanceIndex: Record<string, ContextProvenanceLabel>;
    conflicts: ContextConflict[];
    totalTokens: number;
    createdAt: string;
    artifactRefs?: ContextArtifactRef[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs?: ContextArtifactRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `budgetPlan` | 属性 | <code>budgetPlan: ContextBudgetPlan</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `conflicts` | 属性 | <code>conflicts: ContextConflict[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextHash` | 属性 | <code>contextHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dataSegments` | 属性 | <code>dataSegments: PromptSegment[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includedSourceRefs` | 属性 | <code>includedSourceRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `instructionSegments` | 属性 | <code>instructionSegments: PromptSegment[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `omittedSourceRefs` | 属性 | <code>omittedSourceRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenanceIndex` | 属性 | <code>provenanceIndex: Record&lt;string, ContextProvenanceLabel&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `systemSegments` | 属性 | <code>systemSegments: PromptSegment[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalTokens` | 属性 | <code>totalTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `truncationRecords` | 属性 | <code>truncationRecords: ContextTruncationRecord[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextInjectionGateway`

Context Injection Gateway 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextInjectionGateway } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextInjectionGateway {
    buildEnvelope(bundle: ContextBundle, profile: ContextProfileSpec): Promise<ContextEnvelope>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `buildEnvelope` | 方法 | <code>buildEnvelope(bundle: ContextBundle, profile: ContextProfileSpec): Promise&lt;ContextEnvelope&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ContextItem`

Context Item 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextItem } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextItem {
    id: string;
    sourceType: ContextSourceType;
    sourceId?: string;
    content: unknown;
    text: string;
    tokenEstimate: number;
    priority: number;
    score?: number;
    required?: boolean;
    untrusted?: boolean;
    provenance?: MemoryProvenance | Record<string, unknown>;
    conflictGroupId?: string;
    metadata?: Record<string, unknown>;
    artifactRef?: ContextArtifactRef;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef?: ContextArtifactRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `conflictGroupId` | 属性 | <code>conflictGroupId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `priority` | 属性 | <code>priority: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance?: Record&lt;string, unknown&gt; &#124; MemoryProvenance</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `required` | 属性 | <code>required?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `score` | 属性 | <code>score?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceId` | 属性 | <code>sourceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceType` | 属性 | <code>sourceType: ContextSourceType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `text` | 属性 | <code>text: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenEstimate` | 属性 | <code>tokenEstimate: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `untrusted` | 属性 | <code>untrusted?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextItemPolicyDecision`

Context Item Policy Decision 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextItemPolicyDecision } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextItemPolicyDecision {
    allowed: boolean;
    reason?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowed` | 属性 | <code>allowed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextItemPolicyEvaluator`

Context Item Policy Evaluator 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextItemPolicyEvaluator } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextItemPolicyEvaluator {
    evaluate(input: ContextItemPolicyInput): Promise<ContextItemPolicyDecision>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluate` | 方法 | <code>evaluate(input: ContextItemPolicyInput): Promise&lt;ContextItemPolicyDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ContextItemPolicyInput`

Context Item Policy Input 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextItemPolicyInput } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextItemPolicyInput {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    profileRef: MemoryContractSpecRef;
    item: ContextItem;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `item` | 属性 | <code>item: ContextItem</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextProfileSpec`

Context Profile Spec 接口，共包含 23 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextProfileSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextProfileSpec {
    id: string;
    version: string;
    revision?: string;
    name?: string;
    description?: string;
    sources: ContextSourceSpec[];
    maxItems?: number;
    maxCharacters?: number;
    maxSerializedBytes?: number;
    maxTokens: number;
    reservedOutputTokens?: number;
    reservedSystemTokens?: number;
    deduplication: 'none' | 'id' | 'hash' | 'semantic';
    semanticDedupThreshold?: number;
    ranking: ContextRankingPolicySpec;
    truncation: ContextTruncationPolicySpec;
    conflictPolicy?: 'include_marked' | 'prefer_latest' | 'prefer_verified';
    includeProvenance: boolean;
    includeScores?: boolean;
    instructionBoundary: 'strict' | 'tagged' | 'quoted';
    untrustedContentPolicy: 'escape' | 'tag' | 'reject';
    compactionPolicy?: ContextCompactionPolicySpec;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compactionPolicy` | 属性 | <code>compactionPolicy?: ContextCompactionPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `conflictPolicy` | 属性 | <code>conflictPolicy?: "include_marked" &#124; "prefer_latest" &#124; "prefer_verified"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deduplication` | 属性 | <code>deduplication: "none" &#124; "id" &#124; "semantic" &#124; "hash"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeProvenance` | 属性 | <code>includeProvenance: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeScores` | 属性 | <code>includeScores?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `instructionBoundary` | 属性 | <code>instructionBoundary: "strict" &#124; "tagged" &#124; "quoted"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxCharacters` | 属性 | <code>maxCharacters?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxItems` | 属性 | <code>maxItems?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxSerializedBytes` | 属性 | <code>maxSerializedBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTokens` | 属性 | <code>maxTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ranking` | 属性 | <code>ranking: ContextRankingPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedOutputTokens` | 属性 | <code>reservedOutputTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedSystemTokens` | 属性 | <code>reservedSystemTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `semanticDedupThreshold` | 属性 | <code>semanticDedupThreshold?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sources` | 属性 | <code>sources: ContextSourceSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `truncation` | 属性 | <code>truncation: ContextTruncationPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `untrustedContentPolicy` | 属性 | <code>untrustedContentPolicy: "reject" &#124; "escape" &#124; "tag"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextProvenanceLabel`

Context Provenance Label 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextProvenanceLabel } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextProvenanceLabel {
    sourceType: ContextSourceType;
    sourceId: string;
    memoryId?: string;
    memoryVersionId?: string;
    authority?: 'unverified' | 'user_asserted' | 'system_observed' | 'verified' | 'authoritative';
    observedAt?: string;
    citationLabel: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authority` | 属性 | <code>authority?: "verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `citationLabel` | 属性 | <code>citationLabel: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryId` | 属性 | <code>memoryId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryVersionId` | 属性 | <code>memoryVersionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observedAt` | 属性 | <code>observedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceId` | 属性 | <code>sourceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceType` | 属性 | <code>sourceType: ContextSourceType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextRankingPolicySpec`

Context Ranking Policy Spec 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextRankingPolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextRankingPolicySpec {
    method: 'priority' | 'score_fusion' | 'reranker' | 'custom';
    recencyWeight?: number;
    relevanceWeight?: number;
    importanceWeight?: number;
    confidenceWeight?: number;
    provenanceWeight?: number;
    sourceWeights?: Record<string, number>;
    rerankerProviderRef?: MemoryContractSpecRef;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `confidenceWeight` | 属性 | <code>confidenceWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `importanceWeight` | 属性 | <code>importanceWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `method` | 属性 | <code>method: "custom" &#124; "priority" &#124; "score_fusion" &#124; "reranker"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenanceWeight` | 属性 | <code>provenanceWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recencyWeight` | 属性 | <code>recencyWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relevanceWeight` | 属性 | <code>relevanceWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rerankerProviderRef` | 属性 | <code>rerankerProviderRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceWeights` | 属性 | <code>sourceWeights?: Record&lt;string, number&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextRejectedItem`

Context Rejected Item 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextRejectedItem } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextRejectedItem {
    itemId: string;
    reason: 'scope_denied' | 'policy_denied' | 'invalid_status' | 'duplicate' | 'budget_exceeded' | 'untrusted_rejected' | 'invalid_input';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `itemId` | 属性 | <code>itemId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: "policy_denied" &#124; "duplicate" &#124; "scope_denied" &#124; "invalid_status" &#124; "budget_exceeded" &#124; "untrusted_rejected" &#124; "invalid_input"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextSourceBudget`

Context Source Budget 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextSourceBudget } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextSourceBudget {
    sourceId: string;
    minTokens?: number;
    targetTokens?: number;
    maxTokens: number;
    required: boolean;
    overflowPolicy: 'drop' | 'truncate' | 'summarize' | 'spill_to_artifact' | 'fail';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxTokens` | 属性 | <code>maxTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `minTokens` | 属性 | <code>minTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `overflowPolicy` | 属性 | <code>overflowPolicy: "fail" &#124; "summarize" &#124; "drop" &#124; "truncate" &#124; "spill_to_artifact"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `required` | 属性 | <code>required: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceId` | 属性 | <code>sourceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetTokens` | 属性 | <code>targetTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextSourceResolutionInput`

Context Source Resolution Input 接口，共包含 20 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextSourceResolutionInput } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextSourceResolutionInput extends ResolvedContextBuildInput {
    source: ContextSourceSpec;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `explicitSourceRefs` | 属性 | <code>explicitSourceRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messageCursor` | 属性 | <code>messageCursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelContextWindowTokens` | 属性 | <code>modelContextWindowTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `previousContextHash` | 属性 | <code>previousContextHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profile` | 属性 | <code>profile: ContextProfileSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `query` | 属性 | <code>query?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedInstructionTokens` | 属性 | <code>reservedInstructionTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedOutputTokens` | 属性 | <code>reservedOutputTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedSystemTokens` | 属性 | <code>reservedSystemTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtimeStateRef` | 属性 | <code>runtimeStateRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: ContextSourceSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenizerRef` | 属性 | <code>tokenizerRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextSourceResolver`

Context Source Resolver 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextSourceResolver } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextSourceResolver {
    readonly id: string;
    supports(source: ContextSourceSpec): boolean;
    resolve(request: ContextSourceResolutionInput): Promise<ContextItem[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolve` | 方法 | <code>resolve(request: ContextSourceResolutionInput): Promise&lt;ContextItem[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `supports` | 方法 | <code>supports(source: ContextSourceSpec): boolean</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ContextSourceResolverRegistry`

Context Source Resolver Registry 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextSourceResolverRegistry } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextSourceResolverRegistry {
    resolve(request: ResolvedContextBuildInput): Promise<ContextItem[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `resolve` | 方法 | <code>resolve(request: ResolvedContextBuildInput): Promise&lt;ContextItem[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ContextSourceSpec`

Context Source Spec 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextSourceSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextSourceSpec {
    id: string;
    type: ContextSourceType;
    ref?: MemoryContractSpecRef;
    required?: boolean;
    priority: number;
    maxItems?: number;
    maxTokens?: number;
    overflowPolicy?: ContextSourceBudget['overflowPolicy'];
    filters?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filters` | 属性 | <code>filters?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxItems` | 属性 | <code>maxItems?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTokens` | 属性 | <code>maxTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `overflowPolicy` | 属性 | <code>overflowPolicy?: "fail" &#124; "summarize" &#124; "drop" &#124; "truncate" &#124; "spill_to_artifact"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `priority` | 属性 | <code>priority: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ref` | 属性 | <code>ref?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `required` | 属性 | <code>required?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: ContextSourceType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextTruncationPolicySpec`

Context Truncation Policy Spec 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextTruncationPolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextTruncationPolicySpec {
    method: 'drop_lowest' | 'truncate_items' | 'summarize' | 'hybrid';
    preserveRequiredSources: boolean;
    preserveLatestMessages?: number;
    minItemTokens?: number;
    truncationMarker?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `method` | 属性 | <code>method: "hybrid" &#124; "summarize" &#124; "drop_lowest" &#124; "truncate_items"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `minItemTokens` | 属性 | <code>minItemTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preserveLatestMessages` | 属性 | <code>preserveLatestMessages?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preserveRequiredSources` | 属性 | <code>preserveRequiredSources: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `truncationMarker` | 属性 | <code>truncationMarker?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextTruncationRecord`

Context Truncation Record 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextTruncationRecord } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ContextTruncationRecord {
    itemId: string;
    originalTokens: number;
    retainedTokens: number;
    method: 'drop' | 'truncate' | 'summarize' | 'spill_to_artifact';
    reason: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `itemId` | 属性 | <code>itemId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `method` | 属性 | <code>method: "summarize" &#124; "drop" &#124; "truncate" &#124; "spill_to_artifact"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `originalTokens` | 属性 | <code>originalTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retainedTokens` | 属性 | <code>retainedTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryContextBuilder`

Memory Context Builder 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryContextBuilder } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface MemoryContextBuilder {
    build(request: ContextBuildInput): Promise<ContextBundle>;
    explain(contextHash: string): Promise<ContextBuildExplanation | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(request: ContextBuildInput): Promise&lt;ContextBundle&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `explain` | 方法 | <code>explain(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `PromptSegment`

Prompt Segment 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptSegment } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface PromptSegment {
    id: string;
    role: 'system' | 'developer' | 'user' | 'assistant' | 'tool' | 'data';
    text: string;
    tokenCount: number;
    trustLevel: 'trusted_instruction' | 'trusted_data' | 'untrusted_data';
    sourceRefs: string[];
    required?: boolean;
    artifactRefs?: ContextArtifactRef[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs?: ContextArtifactRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `required` | 属性 | <code>required?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `role` | 属性 | <code>role: "system" &#124; "tool" &#124; "user" &#124; "assistant" &#124; "developer" &#124; "data"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceRefs` | 属性 | <code>sourceRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `text` | 属性 | <code>text: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenCount` | 属性 | <code>tokenCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustLevel` | 属性 | <code>trustLevel: "trusted_instruction" &#124; "trusted_data" &#124; "untrusted_data"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ResolvedContextBuildInput`

Resolved Context Build Input 接口，共包含 19 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ResolvedContextBuildInput } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface ResolvedContextBuildInput extends ContextBuildRequest {
    profile: ContextProfileSpec;
    tokenizerRef?: MemoryContractSpecRef;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `explicitSourceRefs` | 属性 | <code>explicitSourceRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messageCursor` | 属性 | <code>messageCursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelContextWindowTokens` | 属性 | <code>modelContextWindowTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `previousContextHash` | 属性 | <code>previousContextHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profile` | 属性 | <code>profile: ContextProfileSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `query` | 属性 | <code>query?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedInstructionTokens` | 属性 | <code>reservedInstructionTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedOutputTokens` | 属性 | <code>reservedOutputTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reservedSystemTokens` | 属性 | <code>reservedSystemTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtimeStateRef` | 属性 | <code>runtimeStateRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenizerRef` | 属性 | <code>tokenizerRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `TokenEstimator`

Token Estimator 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TokenEstimator } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export interface TokenEstimator {
    readonly id: string;
    estimate(text: string): number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `estimate` | 方法 | <code>estimate(text: string): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextSourceType`

Context Source Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ContextSourceType } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### 声明

```text
export type ContextSourceType = 'system' | 'workflow_state' | 'messages' | 'working_memory' | 'long_term_memory' | 'tool_observation' | 'artifact' | 'human_review' | 'custom';
```
