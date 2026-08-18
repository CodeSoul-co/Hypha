# `@codesoul-co/hypha-memory` / `lifecycle-contracts`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/lifecycle-contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)
- 导出数: **22**

## 模块用法

用于声明并运行时校验契约。Lifecycle contracts 模块公开 20 接口、2 类型。

### 从包入口导入

```ts
import type {
  EpisodicRecordInput,
  ExtractedMemoryCandidate,
  ExtractedMemoryEvidence,
  MemoryExtractionBatch,
  MemoryExtractionCursor,
  MemoryExtractionJob,
  MemoryExtractionProfileSpec,
  MemoryExtractionRequest,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 22 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `EpisodicRecordInput` | 接口 | <code>interface EpisodicRecordInput</code> | Episodic Record Input 接口，共包含 14 个公开字段或方法。 |
| `ExtractedMemoryCandidate` | 接口 | <code>interface ExtractedMemoryCandidate</code> | Extracted Memory Candidate 接口，共包含 20 个公开字段或方法。 |
| `ExtractedMemoryEvidence` | 接口 | <code>interface ExtractedMemoryEvidence</code> | Extracted Memory Evidence 接口，共包含 4 个公开字段或方法。 |
| `MemoryExtractionBatch` | 接口 | <code>interface MemoryExtractionBatch</code> | Memory Extraction Batch 接口，共包含 9 个公开字段或方法。 |
| `MemoryExtractionCursor` | 接口 | <code>interface MemoryExtractionCursor</code> | Memory Extraction Cursor 接口，共包含 6 个公开字段或方法。 |
| `MemoryExtractionJob` | 接口 | <code>interface MemoryExtractionJob</code> | Memory Extraction Job 接口，共包含 16 个公开字段或方法。 |
| `MemoryExtractionProfileSpec` | 接口 | <code>interface MemoryExtractionProfileSpec</code> | Memory Extraction Profile Spec 接口，共包含 14 个公开字段或方法。 |
| `MemoryExtractionRequest` | 接口 | <code>interface MemoryExtractionRequest</code> | Memory Extraction Request 接口，共包含 9 个公开字段或方法。 |
| `MemoryExtractionSourceAdapter` | 接口 | <code>interface MemoryExtractionSourceAdapter</code> | Memory Extraction Source Adapter 接口，共包含 4 个公开字段或方法。 |
| `MemoryExtractionSourceBatch` | 接口 | <code>interface MemoryExtractionSourceBatch</code> | Memory Extraction Source Batch 接口，共包含 3 个公开字段或方法。 |
| `MemoryExtractionSourceRef` | 接口 | <code>interface MemoryExtractionSourceRef</code> | Memory Extraction Source Ref 接口，共包含 15 个公开字段或方法。 |
| `MemoryExtractionStageSpec` | 接口 | <code>interface MemoryExtractionStageSpec</code> | Memory Extraction Stage Spec 接口，共包含 6 个公开字段或方法。 |
| `MemoryExtractor` | 接口 | <code>interface MemoryExtractor</code> | Memory Extractor 接口，共包含 3 个公开字段或方法。 |
| `MemoryMaintenanceApplyRequest` | 接口 | <code>interface MemoryMaintenanceApplyRequest</code> | Memory Maintenance Apply Request 接口，共包含 3 个公开字段或方法。 |
| `MemoryMaintenanceDecision` | 接口 | <code>interface MemoryMaintenanceDecision</code> | Memory Maintenance Decision 接口，共包含 18 个公开字段或方法。 |
| `MemoryMaintenancePlanner` | 接口 | <code>interface MemoryMaintenancePlanner</code> | Memory Maintenance Planner 接口，共包含 3 个公开字段或方法。 |
| `MemoryMaintenancePlanRequest` | 接口 | <code>interface MemoryMaintenancePlanRequest</code> | Memory Maintenance Plan Request 接口，共包含 5 个公开字段或方法。 |
| `MemoryMaintenancePolicySpec` | 接口 | <code>interface MemoryMaintenancePolicySpec</code> | Memory Maintenance Policy Spec 接口，共包含 8 个公开字段或方法。 |
| `NormalizedExtractionInput` | 接口 | <code>interface NormalizedExtractionInput</code> | Normalized Extraction Input 接口，共包含 3 个公开字段或方法。 |
| `TruthAssertion` | 接口 | <code>interface TruthAssertion</code> | Truth Assertion 接口，共包含 11 个公开字段或方法。 |
| `MemoryExtractionSourceType` | 类型 | <code>type MemoryExtractionSourceType = 'conversation' &#124; 'truth' &#124; 'episodic_record' &#124; 'runtime_event' &#124; 'tool_observation' &#124; 'artifact' &#124; 'structured_record' &#124; 'custom'</code> | Memory Extraction Source Type 公共类型别名；完整类型表达式见声明。 |
| `MemoryMaintenanceAction` | 类型 | <code>type MemoryMaintenanceAction = 'create' &#124; 'noop' &#124; 'reuse' &#124; 'update' &#124; 'merge' &#124; 'supersede' &#124; 'invalidate' &#124; 'reject' &#124; 'require_review'</code> | Memory Maintenance Action 公共类型别名；完整类型表达式见声明。 |

## `EpisodicRecordInput`

Episodic Record Input 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EpisodicRecordInput } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface EpisodicRecordInput {
    episodeId: string;
    title?: string;
    startAt: string;
    endAt?: string;
    actors?: string[];
    goal?: string;
    actions?: string[];
    observations?: string[];
    outcome?: unknown;
    success?: boolean;
    failureCode?: string;
    causalEventIds?: string[];
    artifactRefs?: string[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actions` | 属性 | <code>actions?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `actors` | 属性 | <code>actors?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causalEventIds` | 属性 | <code>causalEventIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `endAt` | 属性 | <code>endAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `episodeId` | 属性 | <code>episodeId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failureCode` | 属性 | <code>failureCode?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `goal` | 属性 | <code>goal?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observations` | 属性 | <code>observations?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outcome` | 属性 | <code>outcome?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startAt` | 属性 | <code>startAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `success` | 属性 | <code>success?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `title` | 属性 | <code>title?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExtractedMemoryCandidate`

Extracted Memory Candidate 接口，共包含 20 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExtractedMemoryCandidate } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface ExtractedMemoryCandidate {
    candidateId: string;
    type: ManagedMemoryType;
    content: unknown;
    canonicalText: string;
    summary?: string;
    confidence: number;
    importance?: number;
    canonicalKey?: string;
    subject?: string;
    predicate?: string;
    object?: unknown;
    temporal?: {
        observedAt?: string;
        validFrom?: string;
        validTo?: string;
        temporalConfidence?: number;
    };
    entities?: MemoryEntityRef[];
    relations?: MemoryRelation[];
    sensitive?: boolean;
    authority?: MemoryExtractionSourceRef['authority'];
    evidence: ExtractedMemoryEvidence[];
    extractionRationale?: string;
    extractionProfileRevision: string;
    sourceHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authority` | 属性 | <code>authority?: "verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `candidateId` | 属性 | <code>candidateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `canonicalKey` | 属性 | <code>canonicalKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `canonicalText` | 属性 | <code>canonicalText: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `confidence` | 属性 | <code>confidence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `entities` | 属性 | <code>entities?: MemoryEntityRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evidence` | 属性 | <code>evidence: ExtractedMemoryEvidence[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `extractionProfileRevision` | 属性 | <code>extractionProfileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `extractionRationale` | 属性 | <code>extractionRationale?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `importance` | 属性 | <code>importance?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `object` | 属性 | <code>object?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `predicate` | 属性 | <code>predicate?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relations` | 属性 | <code>relations?: MemoryRelation[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sensitive` | 属性 | <code>sensitive?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceHash` | 属性 | <code>sourceHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `subject` | 属性 | <code>subject?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `summary` | 属性 | <code>summary?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `temporal` | 属性 | <code>temporal?: { observedAt?: string; validFrom?: string; validTo?: string; temporalConfidence?: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: ManagedMemoryType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExtractedMemoryEvidence`

Extracted Memory Evidence 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExtractedMemoryEvidence } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface ExtractedMemoryEvidence {
    sourceRef: MemoryExtractionSourceRef;
    sourceSpan?: {
        messageId?: string;
        eventId?: string;
        artifactRef?: string;
        start?: number;
        end?: number;
        quoteHash?: string;
    };
    supportType: 'direct' | 'derived' | 'contradicting';
    confidence?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `confidence` | 属性 | <code>confidence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceRef` | 属性 | <code>sourceRef: MemoryExtractionSourceRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceSpan` | 属性 | <code>sourceSpan?: { messageId?: string; eventId?: string; artifactRef?: string; start?: number; end?: number; quoteHash?: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `supportType` | 属性 | <code>supportType: "derived" &#124; "direct" &#124; "contradicting"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryExtractionBatch`

Memory Extraction Batch 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryExtractionBatch } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryExtractionBatch {
    id: string;
    jobId: string;
    sourceRefs: MemoryExtractionSourceRef[];
    candidates: ExtractedMemoryCandidate[];
    rejectedCandidates: MemoryRejectedItem[];
    sourceHash: string;
    extractorVersion: string;
    modelObservationRef?: string;
    createdAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidates` | 属性 | <code>candidates: ExtractedMemoryCandidate[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `extractorVersion` | 属性 | <code>extractorVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `jobId` | 属性 | <code>jobId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelObservationRef` | 属性 | <code>modelObservationRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rejectedCandidates` | 属性 | <code>rejectedCandidates: MemoryRejectedItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceHash` | 属性 | <code>sourceHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceRefs` | 属性 | <code>sourceRefs: MemoryExtractionSourceRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryExtractionCursor`

Memory Extraction Cursor 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryExtractionCursor } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryExtractionCursor {
    sourceType: MemoryExtractionSourceType;
    sourceId: string;
    sequence?: number;
    timestamp?: string;
    sourceHash?: string;
    opaqueCursor?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `opaqueCursor` | 属性 | <code>opaqueCursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sequence` | 属性 | <code>sequence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceHash` | 属性 | <code>sourceHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceId` | 属性 | <code>sourceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceType` | 属性 | <code>sourceType: MemoryExtractionSourceType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timestamp` | 属性 | <code>timestamp?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryExtractionJob`

Memory Extraction Job 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryExtractionJob } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryExtractionJob {
    id: string;
    operationId: string;
    scopeHash: string;
    profileRef: MemoryContractSpecRef;
    profileRevision: string;
    sourceRefs: MemoryExtractionSourceRef[];
    status: 'queued' | 'running' | 'awaiting_review' | 'completed' | 'partial' | 'failed' | 'cancelled';
    cursorBefore?: MemoryExtractionCursor;
    cursorAfter?: MemoryExtractionCursor;
    attempts: number;
    leaseOwner?: string;
    leaseExpiresAt?: string;
    lastError?: NormalizedMemoryError;
    createdAt: string;
    startedAt?: string;
    completedAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedAt` | 属性 | <code>completedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cursorAfter` | 属性 | <code>cursorAfter?: MemoryExtractionCursor</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cursorBefore` | 属性 | <code>cursorBefore?: MemoryExtractionCursor</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastError` | 属性 | <code>lastError?: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseExpiresAt` | 属性 | <code>leaseExpiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseOwner` | 属性 | <code>leaseOwner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceRefs` | 属性 | <code>sourceRefs: MemoryExtractionSourceRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "queued" &#124; "running" &#124; "cancelled" &#124; "failed" &#124; "partial" &#124; "awaiting_review"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryExtractionProfileSpec`

Memory Extraction Profile Spec 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryExtractionProfileSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryExtractionProfileSpec {
    id: string;
    version: string;
    revision?: string;
    acceptedSourceTypes: MemoryExtractionSourceType[];
    outputMemoryTypes: ManagedMemoryType[];
    extractor: {
        type: 'deterministic';
        extractorRef: MemoryContractSpecRef;
    } | {
        type: 'model';
        modelProfileRef: MemoryContractSpecRef;
        promptTemplateRef: MemoryContractSpecRef;
    } | {
        type: 'provider';
        providerRef: MemoryContractSpecRef;
    } | {
        type: 'hybrid';
        stages: MemoryExtractionStageSpec[];
    };
    conversation?: {
        maxMessagesPerWindow: number;
        overlapMessages?: number;
        includeSystemMessages?: boolean;
        includeToolMessages?: boolean;
        extractionTrigger: 'each_turn' | 'window' | 'run_end' | 'session_idle' | 'manual';
    };
    episodic?: {
        boundary: 'run' | 'workflow_state' | 'task' | 'time_window' | 'custom';
        includeFailedEpisodes?: boolean;
        includeIntermediateObservations?: boolean;
    };
    truth?: {
        minimumAuthority: TruthAssertion['authority'];
        requireEvidence?: boolean;
        preserveValidityInterval?: boolean;
    };
    sensitiveDataPolicyRef?: MemoryContractSpecRef;
    candidateValidation: {
        minConfidence: number;
        requireCanonicalText: boolean;
        requireEvidence: boolean;
        maxCandidatesPerJob?: number;
        rejectInstructionLikeContent?: boolean;
    };
    writePolicyRef: MemoryContractSpecRef;
    maintenancePolicyRef: MemoryContractSpecRef;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acceptedSourceTypes` | 属性 | <code>acceptedSourceTypes: MemoryExtractionSourceType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `candidateValidation` | 属性 | <code>candidateValidation: { minConfidence: number; requireCanonicalText: boolean; requireEvidence: boolean; maxCandidatesPerJob?: number; rejectInstructionLikeContent?: boolean; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `conversation` | 属性 | <code>conversation?: { maxMessagesPerWindow: number; overlapMessages?: number; includeSystemMessages?: boolean; includeToolMessages?: boolean; extractionTrigger: "each_turn" &#124; "window" &#124; "run_end" &#124; "session_idle" &#124; "manual"; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `episodic` | 属性 | <code>episodic?: { boundary: "run" &#124; "workflow_state" &#124; "task" &#124; "time_window" &#124; "custom"; includeFailedEpisodes?: boolean; includeIntermediateObservations?: boolean; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `extractor` | 属性 | <code>extractor: { type: "deterministic"; extractorRef: MemoryContractSpecRef; } &#124; { type: "model"; modelProfileRef: MemoryContractSpecRef; promptTemplateRef: MemoryContractSpecRef; } &#124; { type: "provider"; providerRef: MemoryContractSpecRef; } &#124; { type: "hybrid"; stages: MemoryExtractionStageSpec[]; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maintenancePolicyRef` | 属性 | <code>maintenancePolicyRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputMemoryTypes` | 属性 | <code>outputMemoryTypes: ManagedMemoryType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sensitiveDataPolicyRef` | 属性 | <code>sensitiveDataPolicyRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `truth` | 属性 | <code>truth?: { minimumAuthority: TruthAssertion["authority"]; requireEvidence?: boolean; preserveValidityInterval?: boolean; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `writePolicyRef` | 属性 | <code>writePolicyRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryExtractionRequest`

Memory Extraction Request 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryExtractionRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryExtractionRequest {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    profileRef: MemoryContractSpecRef;
    sources: MemoryExtractionSourceRef[];
    mode: 'sync' | 'async';
    force?: boolean;
    idempotencyKey?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `force` | 属性 | <code>force?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "sync" &#124; "async"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sources` | 属性 | <code>sources: MemoryExtractionSourceRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryExtractionSourceAdapter`

Memory Extraction Source Adapter 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryExtractionSourceAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryExtractionSourceAdapter<T = unknown> {
    readonly type: MemoryExtractionSourceType;
    load(refs: MemoryExtractionSourceRef[], cursor?: MemoryExtractionCursor): Promise<MemoryExtractionSourceBatch<T>>;
    normalize(batch: MemoryExtractionSourceBatch<T>): Promise<NormalizedExtractionInput[]>;
    health(): Promise<ProviderHealth>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `load` | 方法 | <code>load(refs: MemoryExtractionSourceRef[], cursor?: MemoryExtractionCursor): Promise&lt;MemoryExtractionSourceBatch&lt;T&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `normalize` | 方法 | <code>normalize(batch: MemoryExtractionSourceBatch&lt;T&gt;): Promise&lt;NormalizedExtractionInput[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `type` | 属性 | <code>readonly type: MemoryExtractionSourceType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryExtractionSourceBatch`

Memory Extraction Source Batch 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryExtractionSourceBatch } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryExtractionSourceBatch<T = unknown> {
    sourceRefs: MemoryExtractionSourceRef[];
    items: Array<{
        sourceRef: MemoryExtractionSourceRef;
        value: T;
    }>;
    nextCursor?: MemoryExtractionCursor;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `items` | 属性 | <code>items: { sourceRef: MemoryExtractionSourceRef; value: T; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextCursor` | 属性 | <code>nextCursor?: MemoryExtractionCursor</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceRefs` | 属性 | <code>sourceRefs: MemoryExtractionSourceRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryExtractionSourceRef`

Memory Extraction Source Ref 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryExtractionSourceRef } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryExtractionSourceRef {
    type: MemoryExtractionSourceType;
    sourceId: string;
    sourceVersion?: string;
    sourceHash?: string;
    sessionId?: string;
    runId?: string;
    messageIds?: string[];
    eventIds?: string[];
    artifactRefs?: string[];
    observedAt?: string;
    validFrom?: string;
    validTo?: string;
    authority?: 'unverified' | 'user_asserted' | 'system_observed' | 'verified' | 'authoritative';
    trustScore?: number;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `authority` | 属性 | <code>authority?: "verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventIds` | 属性 | <code>eventIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messageIds` | 属性 | <code>messageIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observedAt` | 属性 | <code>observedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceHash` | 属性 | <code>sourceHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceId` | 属性 | <code>sourceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceVersion` | 属性 | <code>sourceVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustScore` | 属性 | <code>trustScore?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: MemoryExtractionSourceType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validFrom` | 属性 | <code>validFrom?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validTo` | 属性 | <code>validTo?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryExtractionStageSpec`

Memory Extraction Stage Spec 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryExtractionStageSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryExtractionStageSpec {
    id: string;
    type: 'normalize' | 'classify' | 'extract' | 'validate' | 'enrich' | 'custom';
    handlerRef: MemoryContractSpecRef;
    optional?: boolean;
    timeoutMs?: number;
    retryPolicy?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `handlerRef` | 属性 | <code>handlerRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `optional` | 属性 | <code>optional?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryPolicy` | 属性 | <code>retryPolicy?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "custom" &#124; "validate" &#124; "normalize" &#124; "classify" &#124; "extract" &#124; "enrich"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryExtractor`

Memory Extractor 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryExtractor } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryExtractor {
    readonly id: string;
    extract(inputs: NormalizedExtractionInput[], profile: MemoryExtractionProfileSpec): Promise<ExtractedMemoryCandidate[]>;
    health(): Promise<ProviderHealth>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `extract` | 方法 | <code>extract(inputs: NormalizedExtractionInput[], profile: MemoryExtractionProfileSpec): Promise&lt;ExtractedMemoryCandidate[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryMaintenanceApplyRequest`

Memory Maintenance Apply Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryMaintenanceApplyRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryMaintenanceApplyRequest {
    decision: MemoryMaintenanceDecision;
    candidate: ExtractedMemoryCandidate;
    scope: ManagedMemoryScope;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidate` | 属性 | <code>candidate: ExtractedMemoryCandidate</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decision` | 属性 | <code>decision: MemoryMaintenanceDecision</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryMaintenanceDecision`

Memory Maintenance Decision 接口，共包含 18 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryMaintenanceDecision } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryMaintenanceDecision {
    id: string;
    operationId: string;
    candidateId: string;
    scopeHash: string;
    action: MemoryMaintenanceAction;
    targetMemoryIds: string[];
    expectedRevisions: Record<string, number>;
    duplicateScore?: number;
    conflictScore?: number;
    authorityComparison?: 'candidate_higher' | 'existing_higher' | 'equal' | 'unknown';
    mergedContent?: unknown;
    patch?: MemoryPatch;
    relationsToCreate?: MemoryRelation[];
    recordsToInvalidate?: string[];
    reasonCode: 'NEW_FACT' | 'EXACT_DUPLICATE' | 'SEMANTIC_DUPLICATE' | 'ADDITIONAL_EVIDENCE' | 'FACT_CORRECTION' | 'TEMPORAL_UPDATE' | 'AUTHORITY_OVERRIDE' | 'CONFLICT_REQUIRES_REVIEW' | 'LOW_CONFIDENCE' | 'POLICY_REJECTED' | 'CUSTOM';
    explanation?: string;
    policyRevision: string;
    createdAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `action` | 属性 | <code>action: MemoryMaintenanceAction</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `authorityComparison` | 属性 | <code>authorityComparison?: "unknown" &#124; "candidate_higher" &#124; "existing_higher" &#124; "equal"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `candidateId` | 属性 | <code>candidateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `conflictScore` | 属性 | <code>conflictScore?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `duplicateScore` | 属性 | <code>duplicateScore?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRevisions` | 属性 | <code>expectedRevisions: Record&lt;string, number&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `explanation` | 属性 | <code>explanation?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mergedContent` | 属性 | <code>mergedContent?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `patch` | 属性 | <code>patch?: MemoryPatch</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasonCode` | 属性 | <code>reasonCode: "CUSTOM" &#124; "NEW_FACT" &#124; "EXACT_DUPLICATE" &#124; "SEMANTIC_DUPLICATE" &#124; "ADDITIONAL_EVIDENCE" &#124; "FACT_CORRECTION" &#124; "TEMPORAL_UPDATE" &#124; "AUTHORITY_OVERRIDE" &#124; "CONFLICT_REQUIRES_REVIEW" &#124; "LOW_CONFIDENCE" &#124; "POLICY_REJECTED"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordsToInvalidate` | 属性 | <code>recordsToInvalidate?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relationsToCreate` | 属性 | <code>relationsToCreate?: MemoryRelation[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetMemoryIds` | 属性 | <code>targetMemoryIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryMaintenancePlanner`

Memory Maintenance Planner 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryMaintenancePlanner } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryMaintenancePlanner {
    plan(request: MemoryMaintenancePlanRequest): Promise<MemoryMaintenanceDecision>;
    apply(request: MemoryMaintenanceApplyRequest): Promise<ManagedMemoryWriteResult>;
    explain(decisionId: string): Promise<MemoryMaintenanceDecision | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apply` | 方法 | <code>apply(request: MemoryMaintenanceApplyRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `explain` | 方法 | <code>explain(decisionId: string): Promise&lt;MemoryMaintenanceDecision &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `plan` | 方法 | <code>plan(request: MemoryMaintenancePlanRequest): Promise&lt;MemoryMaintenanceDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryMaintenancePlanRequest`

Memory Maintenance Plan Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryMaintenancePlanRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryMaintenancePlanRequest {
    operationId: string;
    scope: ManagedMemoryScope;
    candidate: ExtractedMemoryCandidate;
    existingRecords: ManagedMemoryRecord[];
    policy: MemoryMaintenancePolicySpec;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidate` | 属性 | <code>candidate: ExtractedMemoryCandidate</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `existingRecords` | 属性 | <code>existingRecords: ManagedMemoryRecord&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policy` | 属性 | <code>policy: MemoryMaintenancePolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryMaintenancePolicySpec`

Memory Maintenance Policy Spec 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryMaintenancePolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface MemoryMaintenancePolicySpec {
    id: string;
    version: string;
    revision?: string;
    preWriteRetrieval: {
        enabled: boolean;
        exactKeyLookup: boolean;
        semanticLookup?: boolean;
        maxCandidates: number;
        semanticThreshold?: number;
        includeSuperseded?: boolean;
        includeInvalidated?: boolean;
    };
    duplicateResolution: 'reuse_existing' | 'increase_support' | 'create_version' | 'require_review';
    updateResolution: 'patch_current' | 'create_version' | 'supersede' | 'require_review';
    conflictResolution: 'keep_both_marked' | 'prefer_authoritative' | 'prefer_verified' | 'prefer_latest' | 'invalidate_old' | 'require_review';
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `conflictResolution` | 属性 | <code>conflictResolution: "prefer_latest" &#124; "prefer_verified" &#124; "require_review" &#124; "keep_both_marked" &#124; "prefer_authoritative" &#124; "invalidate_old"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `duplicateResolution` | 属性 | <code>duplicateResolution: "reuse_existing" &#124; "increase_support" &#124; "create_version" &#124; "require_review"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preWriteRetrieval` | 属性 | <code>preWriteRetrieval: { enabled: boolean; exactKeyLookup: boolean; semanticLookup?: boolean; maxCandidates: number; semanticThreshold?: number; includeSuperseded?: boolean; includeInvalidated?: boolean; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updateResolution` | 属性 | <code>updateResolution: "create_version" &#124; "require_review" &#124; "patch_current" &#124; "supersede"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `NormalizedExtractionInput`

Normalized Extraction Input 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NormalizedExtractionInput } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface NormalizedExtractionInput {
    sourceRef: MemoryExtractionSourceRef;
    value: unknown;
    canonicalText?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalText` | 属性 | <code>canonicalText?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceRef` | 属性 | <code>sourceRef: MemoryExtractionSourceRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `value` | 属性 | <code>value: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `TruthAssertion`

Truth Assertion 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TruthAssertion } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export interface TruthAssertion {
    assertionId: string;
    subject: string;
    predicate: string;
    object: unknown;
    authority: 'user_confirmed' | 'human_reviewed' | 'system_of_record' | 'policy_defined';
    confidence: number;
    validFrom?: string;
    validTo?: string;
    supersedesAssertionId?: string;
    evidenceRefs: string[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertionId` | 属性 | <code>assertionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `authority` | 属性 | <code>authority: "user_confirmed" &#124; "human_reviewed" &#124; "system_of_record" &#124; "policy_defined"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `confidence` | 属性 | <code>confidence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evidenceRefs` | 属性 | <code>evidenceRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `object` | 属性 | <code>object: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `predicate` | 属性 | <code>predicate: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `subject` | 属性 | <code>subject: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `supersedesAssertionId` | 属性 | <code>supersedesAssertionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validFrom` | 属性 | <code>validFrom?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validTo` | 属性 | <code>validTo?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryExtractionSourceType`

Memory Extraction Source Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryExtractionSourceType } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export type MemoryExtractionSourceType = 'conversation' | 'truth' | 'episodic_record' | 'runtime_event' | 'tool_observation' | 'artifact' | 'structured_record' | 'custom';
```

## `MemoryMaintenanceAction`

Memory Maintenance Action 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryMaintenanceAction } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### 声明

```text
export type MemoryMaintenanceAction = 'create' | 'noop' | 'reuse' | 'update' | 'merge' | 'supersede' | 'invalidate' | 'reject' | 'require_review';
```
