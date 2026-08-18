# `@codesoul-co/hypha-memory` / `contracts`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)
- 导出数: **30**

## 模块用法

用于声明并运行时校验契约。Contracts 模块公开 28 接口、2 类型。

### 从包入口导入

```ts
import type {
  EmbeddingProviderSpec,
  ManagedMemoryRecord,
  ManagedMemoryScope,
  MemoryConflictPolicySpec,
  MemoryConsolidationPolicySpec,
  MemoryContractSpecRef,
  MemoryEntityRef,
  MemoryFallbackPolicySpec,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 30 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `EmbeddingProviderSpec` | 接口 | <code>interface EmbeddingProviderSpec</code> | Embedding Provider Spec 接口，共包含 11 个公开字段或方法。 |
| `ManagedMemoryRecord` | 接口 | <code>interface ManagedMemoryRecord</code> | Managed Memory Record 接口，共包含 38 个公开字段或方法。 |
| `ManagedMemoryScope` | 接口 | <code>interface ManagedMemoryScope</code> | Managed Memory Scope 接口，共包含 8 个公开字段或方法。 |
| `MemoryConflictPolicySpec` | 接口 | <code>interface MemoryConflictPolicySpec</code> | Memory Conflict Policy Spec 接口，共包含 4 个公开字段或方法。 |
| `MemoryConsolidationPolicySpec` | 接口 | <code>interface MemoryConsolidationPolicySpec</code> | Memory Consolidation Policy Spec 接口，共包含 8 个公开字段或方法。 |
| `MemoryContractSpecRef` | 接口 | <code>interface MemoryContractSpecRef extends SpecRef</code> | Memory Contract Spec Ref 接口，共包含 3 个公开字段或方法。 |
| `MemoryEntityRef` | 接口 | <code>interface MemoryEntityRef</code> | Memory Entity Ref 接口，共包含 4 个公开字段或方法。 |
| `MemoryFallbackPolicySpec` | 接口 | <code>interface MemoryFallbackPolicySpec</code> | Memory Fallback Policy Spec 接口，共包含 4 个公开字段或方法。 |
| `MemoryIndexingPolicySpec` | 接口 | <code>interface MemoryIndexingPolicySpec</code> | Memory Indexing Policy Spec 接口，共包含 6 个公开字段或方法。 |
| `MemoryIndexStatus` | 接口 | <code>interface MemoryIndexStatus</code> | Memory Index Status 接口，共包含 4 个公开字段或方法。 |
| `MemoryManagementCapabilities` | 接口 | <code>interface MemoryManagementCapabilities</code> | Memory Management Capabilities 接口，共包含 17 个公开字段或方法。 |
| `MemoryManagementProviderSpec` | 接口 | <code>interface MemoryManagementProviderSpec</code> | Memory Management Provider Spec 接口，共包含 14 个公开字段或方法。 |
| `MemoryPrincipal` | 接口 | <code>interface MemoryPrincipal</code> | Memory Principal 接口，共包含 8 个公开字段或方法。 |
| `MemoryPrivacyPolicySpec` | 接口 | <code>interface MemoryPrivacyPolicySpec</code> | Memory Privacy Policy Spec 接口，共包含 6 个公开字段或方法。 |
| `MemoryProfileSpec` | 接口 | <code>interface MemoryProfileSpec</code> | Memory Profile Spec 接口，共包含 25 个公开字段或方法。 |
| `MemoryProvenance` | 接口 | <code>interface MemoryProvenance</code> | Memory Provenance 接口，共包含 9 个公开字段或方法。 |
| `MemoryRecordStoreSpec` | 接口 | <code>interface MemoryRecordStoreSpec</code> | Memory Record Store Spec 接口，共包含 10 个公开字段或方法。 |
| `MemoryRelation` | 接口 | <code>interface MemoryRelation</code> | Memory Relation 接口，共包含 4 个公开字段或方法。 |
| `MemoryRetentionPolicySpec` | 接口 | <code>interface MemoryRetentionPolicySpec</code> | Memory Retention Policy Spec 接口，共包含 8 个公开字段或方法。 |
| `MemoryRetrievalPolicySpec` | 接口 | <code>interface MemoryRetrievalPolicySpec</code> | Memory Retrieval Policy Spec 接口，共包含 14 个公开字段或方法。 |
| `MemoryScopePolicySpec` | 接口 | <code>interface MemoryScopePolicySpec</code> | Memory Scope Policy Spec 接口，共包含 7 个公开字段或方法。 |
| `MemorySource` | 接口 | <code>interface MemorySource</code> | Memory Source 接口，共包含 6 个公开字段或方法。 |
| `MemoryVectorRef` | 接口 | <code>interface MemoryVectorRef</code> | Memory Vector Ref 接口，共包含 8 个公开字段或方法。 |
| `MemoryWritePolicySpec` | 接口 | <code>interface MemoryWritePolicySpec</code> | Memory Write Policy Spec 接口，共包含 9 个公开字段或方法。 |
| `NormalizedMemoryError` | 接口 | <code>interface NormalizedMemoryError</code> | Normalized Memory Error 接口，共包含 6 个公开字段或方法。 |
| `VectorStoreCapabilities` | 接口 | <code>interface VectorStoreCapabilities</code> | Vector Store Capabilities 接口，共包含 12 个公开字段或方法。 |
| `VectorStoreSpec` | 接口 | <code>interface VectorStoreSpec</code> | Vector Store Spec 接口，共包含 12 个公开字段或方法。 |
| `WorkingMemoryStoreSpec` | 接口 | <code>interface WorkingMemoryStoreSpec</code> | Working Memory Store Spec 接口，共包含 10 个公开字段或方法。 |
| `ManagedMemoryType` | 类型 | <code>type ManagedMemoryType = 'working' &#124; 'episodic' &#124; 'semantic' &#124; 'procedural' &#124; 'preference' &#124; 'artifact' &#124; 'governance' &#124; 'reflection' &#124; 'custom'</code> | Managed Memory Type 公共类型别名；完整类型表达式见声明。 |
| `MemoryStatus` | 类型 | <code>type MemoryStatus = 'pending' &#124; 'active' &#124; 'dormant' &#124; 'superseded' &#124; 'invalidated' &#124; 'deletion_pending' &#124; 'deleted' &#124; 'failed'</code> | Memory Status 公共类型别名；完整类型表达式见声明。 |

## `EmbeddingProviderSpec`

Embedding Provider Spec 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EmbeddingProviderSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface EmbeddingProviderSpec {
    id: string;
    version: string;
    provider: string;
    model: string;
    dimensions?: number;
    normalized?: boolean;
    maxBatchSize?: number;
    maxInputTokens?: number;
    connectionRef?: string;
    timeoutMs?: number;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `connectionRef` | 属性 | <code>connectionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dimensions` | 属性 | <code>dimensions?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxBatchSize` | 属性 | <code>maxBatchSize?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxInputTokens` | 属性 | <code>maxInputTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `model` | 属性 | <code>model: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `normalized` | 属性 | <code>normalized?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManagedMemoryRecord`

Managed Memory Record 接口，共包含 38 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedMemoryRecord } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface ManagedMemoryRecord<TContent = unknown> {
    id: string;
    versionId: string;
    revision: number;
    type: ManagedMemoryType;
    subtype?: string;
    content: TContent;
    canonicalText?: string;
    summary?: string;
    language?: string;
    scope: ManagedMemoryScope;
    visibility: 'private' | 'session' | 'workspace' | 'tenant' | 'shared';
    source: MemorySource;
    provenance: MemoryProvenance;
    confidence?: number;
    importance?: number;
    strength?: number;
    salience?: number;
    accessCount: number;
    lastAccessedAt?: string;
    lastReinforcedAt?: string;
    decayScore?: number;
    status: MemoryStatus;
    immutable?: boolean;
    humanVerified?: boolean;
    sensitive?: boolean;
    tags?: string[];
    entities?: MemoryEntityRef[];
    relations?: MemoryRelation[];
    indexStatus: MemoryIndexStatus;
    vectorRefs?: MemoryVectorRef[];
    artifactRefs?: string[];
    contentHash: string;
    scopeHash: string;
    createdAt: string;
    updatedAt: string;
    expiresAt?: string;
    deletedAt?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `accessCount` | 属性 | <code>accessCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `canonicalText` | 属性 | <code>canonicalText?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `confidence` | 属性 | <code>confidence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content: TContent</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decayScore` | 属性 | <code>decayScore?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deletedAt` | 属性 | <code>deletedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `entities` | 属性 | <code>entities?: MemoryEntityRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `humanVerified` | 属性 | <code>humanVerified?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `immutable` | 属性 | <code>immutable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `importance` | 属性 | <code>importance?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `indexStatus` | 属性 | <code>indexStatus: MemoryIndexStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `language` | 属性 | <code>language?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastAccessedAt` | 属性 | <code>lastAccessedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastReinforcedAt` | 属性 | <code>lastReinforcedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance: MemoryProvenance</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relations` | 属性 | <code>relations?: MemoryRelation[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `salience` | 属性 | <code>salience?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sensitive` | 属性 | <code>sensitive?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: MemorySource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: MemoryStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `strength` | 属性 | <code>strength?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `subtype` | 属性 | <code>subtype?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `summary` | 属性 | <code>summary?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: ManagedMemoryType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vectorRefs` | 属性 | <code>vectorRefs?: MemoryVectorRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `visibility` | 属性 | <code>visibility: "workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManagedMemoryScope`

Managed Memory Scope 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedMemoryScope } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface ManagedMemoryScope {
    tenantId?: string;
    userId: string;
    workspaceId?: string;
    projectId?: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
    domainPackId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackId` | 属性 | <code>domainPackId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectId` | 属性 | <code>projectId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryConflictPolicySpec`

Memory Conflict Policy Spec 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryConflictPolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryConflictPolicySpec {
    detectOnWrite: boolean;
    matchingMode: 'same_key' | 'semantic' | 'entity_relation' | 'custom';
    resolution: 'keep_both' | 'prefer_latest' | 'prefer_verified' | 'require_human' | 'custom';
    markRelations?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `detectOnWrite` | 属性 | <code>detectOnWrite: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `markRelations` | 属性 | <code>markRelations?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `matchingMode` | 属性 | <code>matchingMode: "custom" &#124; "semantic" &#124; "same_key" &#124; "entity_relation"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolution` | 属性 | <code>resolution: "custom" &#124; "prefer_latest" &#124; "prefer_verified" &#124; "keep_both" &#124; "require_human"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryConsolidationPolicySpec`

Memory Consolidation Policy Spec 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryConsolidationPolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryConsolidationPolicySpec {
    enabled: boolean;
    trigger: 'scheduled' | 'count' | 'token_pressure' | 'manual';
    minRecords?: number;
    intervalSeconds?: number;
    similarityThreshold?: number;
    preserveSourceRecords?: boolean;
    summaryMemoryType?: ManagedMemoryType;
    requireVerification?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enabled` | 属性 | <code>enabled: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `intervalSeconds` | 属性 | <code>intervalSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `minRecords` | 属性 | <code>minRecords?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preserveSourceRecords` | 属性 | <code>preserveSourceRecords?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireVerification` | 属性 | <code>requireVerification?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `similarityThreshold` | 属性 | <code>similarityThreshold?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `summaryMemoryType` | 属性 | <code>summaryMemoryType?: ManagedMemoryType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trigger` | 属性 | <code>trigger: "manual" &#124; "scheduled" &#124; "count" &#124; "token_pressure"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryContractSpecRef`

Memory Contract Spec Ref 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryContractSpecRef } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryContractSpecRef extends SpecRef {
    revision?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryEntityRef`

Memory Entity Ref 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryEntityRef } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryEntityRef {
    entityId: string;
    label?: string;
    type?: string;
    confidence?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `confidence` | 属性 | <code>confidence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `entityId` | 属性 | <code>entityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `label` | 属性 | <code>label?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryFallbackPolicySpec`

Memory Fallback Policy Spec 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryFallbackPolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryFallbackPolicySpec {
    onProviderUnavailable: 'fail' | 'native' | 'record_store_only' | 'skip';
    onVectorUnavailable: 'structured_only' | 'keyword' | 'fail';
    onRerankerUnavailable: 'score_fusion' | 'no_rerank' | 'fail';
    maxFallbackDepth?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxFallbackDepth` | 属性 | <code>maxFallbackDepth?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `onProviderUnavailable` | 属性 | <code>onProviderUnavailable: "fail" &#124; "native" &#124; "record_store_only" &#124; "skip"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `onRerankerUnavailable` | 属性 | <code>onRerankerUnavailable: "fail" &#124; "score_fusion" &#124; "no_rerank"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `onVectorUnavailable` | 属性 | <code>onVectorUnavailable: "fail" &#124; "keyword" &#124; "structured_only"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryIndexingPolicySpec`

Memory Indexing Policy Spec 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryIndexingPolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryIndexingPolicySpec {
    mode: 'sync' | 'async_outbox' | 'disabled';
    batchSize?: number;
    maxAttempts?: number;
    retryDelayMs?: number;
    deadLetterAfterAttempts?: number;
    rebuildable: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `batchSize` | 属性 | <code>batchSize?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadLetterAfterAttempts` | 属性 | <code>deadLetterAfterAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "disabled" &#124; "sync" &#124; "async_outbox"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rebuildable` | 属性 | <code>rebuildable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryDelayMs` | 属性 | <code>retryDelayMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryIndexStatus`

Memory Index Status 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryIndexStatus } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryIndexStatus {
    state: 'none' | 'pending' | 'indexing' | 'indexed' | 'partial' | 'failed' | 'deleted';
    attempts: number;
    lastAttemptAt?: string;
    lastError?: NormalizedMemoryError;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastAttemptAt` | 属性 | <code>lastAttemptAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastError` | 属性 | <code>lastError?: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: "none" &#124; "failed" &#124; "deleted" &#124; "pending" &#124; "indexing" &#124; "indexed" &#124; "partial"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryManagementCapabilities`

Memory Management Capabilities 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryManagementCapabilities } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryManagementCapabilities {
    add: boolean;
    search: boolean;
    get: boolean;
    list: boolean;
    update: boolean;
    delete: boolean;
    deleteByFilter: boolean;
    history: boolean;
    summarize: boolean;
    consolidate: boolean;
    decay: boolean;
    reinforce: boolean;
    conflictDetection: boolean;
    hybridSearch: boolean;
    graphRelations: boolean;
    asyncWrite: boolean;
    batchOperations: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 属性 | <code>add: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `asyncWrite` | 属性 | <code>asyncWrite: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `batchOperations` | 属性 | <code>batchOperations: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `conflictDetection` | 属性 | <code>conflictDetection: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `consolidate` | 属性 | <code>consolidate: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decay` | 属性 | <code>decay: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `delete` | 属性 | <code>delete: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deleteByFilter` | 属性 | <code>deleteByFilter: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `get` | 属性 | <code>get: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `graphRelations` | 属性 | <code>graphRelations: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `history` | 属性 | <code>history: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hybridSearch` | 属性 | <code>hybridSearch: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `list` | 属性 | <code>list: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reinforce` | 属性 | <code>reinforce: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `search` | 属性 | <code>search: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `summarize` | 属性 | <code>summarize: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `update` | 属性 | <code>update: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryManagementProviderSpec`

Memory Management Provider Spec 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryManagementProviderSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryManagementProviderSpec {
    id: string;
    version: string;
    revision?: string;
    name?: string;
    type: 'native' | 'mem0' | 'memorybank' | 'custom';
    deployment: 'embedded' | 'local' | 'self_hosted' | 'managed' | 'remote';
    connectionRef?: string;
    config?: Record<string, unknown>;
    capabilities: MemoryManagementCapabilities;
    timeoutPolicy?: {
        timeoutMs: number;
        operationTimeouts?: Partial<Record<'add' | 'search' | 'get' | 'list' | 'update' | 'delete', number>>;
    };
    retryPolicy?: {
        maxAttempts: number;
        initialDelayMs?: number;
        maxDelayMs?: number;
        backoff?: 'fixed' | 'exponential';
    };
    circuitBreakerPolicy?: {
        failureThreshold: number;
        resetAfterMs: number;
    };
    healthCheckPolicy?: {
        intervalMs?: number;
        timeoutMs?: number;
    };
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: MemoryManagementCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `circuitBreakerPolicy` | 属性 | <code>circuitBreakerPolicy?: { failureThreshold: number; resetAfterMs: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `config` | 属性 | <code>config?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `connectionRef` | 属性 | <code>connectionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deployment` | 属性 | <code>deployment: "local" &#124; "self_hosted" &#124; "managed" &#124; "embedded" &#124; "remote"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `healthCheckPolicy` | 属性 | <code>healthCheckPolicy?: { intervalMs?: number; timeoutMs?: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryPolicy` | 属性 | <code>retryPolicy?: { maxAttempts: number; initialDelayMs?: number; maxDelayMs?: number; backoff?: "fixed" &#124; "exponential"; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutPolicy` | 属性 | <code>timeoutPolicy?: { timeoutMs: number; operationTimeouts?: Partial&lt;Record&lt;"add" &#124; "search" &#124; "get" &#124; "list" &#124; "update" &#124; "delete", number&gt;&gt;; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "custom" &#124; "native" &#124; "mem0" &#124; "memorybank"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryPrincipal`

Memory Principal 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryPrincipal } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryPrincipal {
    principalId: string;
    type: 'user' | 'agent' | 'service' | 'system';
    tenantId?: string;
    userId?: string;
    agentId?: string;
    roles?: string[];
    permissionScopes: string[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permissionScopes` | 属性 | <code>permissionScopes: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `roles` | 属性 | <code>roles?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryPrivacyPolicySpec`

Memory Privacy Policy Spec 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryPrivacyPolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryPrivacyPolicySpec {
    sensitiveDataMode: 'reject' | 'redact' | 'encrypt' | 'allow_by_policy';
    encryptionRef?: MemoryContractSpecRef;
    redactFields?: string[];
    allowCrossUserRead?: boolean;
    allowCrossWorkspaceRead?: boolean;
    complianceDelete?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowCrossUserRead` | 属性 | <code>allowCrossUserRead?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowCrossWorkspaceRead` | 属性 | <code>allowCrossWorkspaceRead?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `complianceDelete` | 属性 | <code>complianceDelete?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `encryptionRef` | 属性 | <code>encryptionRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redactFields` | 属性 | <code>redactFields?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sensitiveDataMode` | 属性 | <code>sensitiveDataMode: "reject" &#124; "redact" &#124; "encrypt" &#124; "allow_by_policy"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProfileSpec`

Memory Profile Spec 接口，共包含 25 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProfileSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryProfileSpec {
    id: string;
    version: string;
    revision?: string;
    name?: string;
    description?: string;
    enabled?: boolean;
    managementProviderRef: MemoryContractSpecRef;
    workingStoreRef?: MemoryContractSpecRef;
    recordStoreRef: MemoryContractSpecRef;
    vectorStoreRefs?: MemoryContractSpecRef[];
    artifactStoreRef?: MemoryContractSpecRef;
    embeddingProviderRef?: MemoryContractSpecRef;
    rerankerProviderRef?: MemoryContractSpecRef;
    scopePolicy: MemoryScopePolicySpec;
    retrievalPolicy: MemoryRetrievalPolicySpec;
    writePolicy: MemoryWritePolicySpec;
    retentionPolicy: MemoryRetentionPolicySpec;
    consolidationPolicy?: MemoryConsolidationPolicySpec;
    conflictPolicy?: MemoryConflictPolicySpec;
    fallbackPolicy?: MemoryFallbackPolicySpec;
    privacyPolicy?: MemoryPrivacyPolicySpec;
    indexingPolicy?: MemoryIndexingPolicySpec;
    contextProfileRef?: MemoryContractSpecRef;
    tags?: string[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactStoreRef` | 属性 | <code>artifactStoreRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `conflictPolicy` | 属性 | <code>conflictPolicy?: MemoryConflictPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `consolidationPolicy` | 属性 | <code>consolidationPolicy?: MemoryConsolidationPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextProfileRef` | 属性 | <code>contextProfileRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `embeddingProviderRef` | 属性 | <code>embeddingProviderRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `enabled` | 属性 | <code>enabled?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fallbackPolicy` | 属性 | <code>fallbackPolicy?: MemoryFallbackPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `indexingPolicy` | 属性 | <code>indexingPolicy?: MemoryIndexingPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `managementProviderRef` | 属性 | <code>managementProviderRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `privacyPolicy` | 属性 | <code>privacyPolicy?: MemoryPrivacyPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordStoreRef` | 属性 | <code>recordStoreRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rerankerProviderRef` | 属性 | <code>rerankerProviderRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retentionPolicy` | 属性 | <code>retentionPolicy: MemoryRetentionPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retrievalPolicy` | 属性 | <code>retrievalPolicy: MemoryRetrievalPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopePolicy` | 属性 | <code>scopePolicy: MemoryScopePolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vectorStoreRefs` | 属性 | <code>vectorStoreRefs?: MemoryContractSpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workingStoreRef` | 属性 | <code>workingStoreRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `writePolicy` | 属性 | <code>writePolicy: MemoryWritePolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProvenance`

Memory Provenance 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProvenance } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryProvenance {
    createdBy: string;
    providerId: string;
    extractorVersion?: string;
    sourceEventIds?: string[];
    sourceMemoryIds?: string[];
    transformation?: string;
    humanDecisionId?: string;
    createdAt: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdBy` | 属性 | <code>createdBy: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `extractorVersion` | 属性 | <code>extractorVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `humanDecisionId` | 属性 | <code>humanDecisionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceEventIds` | 属性 | <code>sourceEventIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceMemoryIds` | 属性 | <code>sourceMemoryIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transformation` | 属性 | <code>transformation?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRecordStoreSpec`

Memory Record Store Spec 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRecordStoreSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryRecordStoreSpec {
    id: string;
    version: string;
    type: 'mongodb' | 'sqlite' | 'postgres' | 'custom';
    connectionRef?: string;
    database?: string;
    collectionOrTable?: string;
    transactional?: boolean;
    historyMode?: 'embedded_versions' | 'separate_versions' | 'event_projection';
    encryptionRef?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collectionOrTable` | 属性 | <code>collectionOrTable?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `connectionRef` | 属性 | <code>connectionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `database` | 属性 | <code>database?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `encryptionRef` | 属性 | <code>encryptionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `historyMode` | 属性 | <code>historyMode?: "embedded_versions" &#124; "separate_versions" &#124; "event_projection"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transactional` | 属性 | <code>transactional?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "custom" &#124; "sqlite" &#124; "postgres" &#124; "mongodb"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRelation`

Memory Relation 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRelation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryRelation {
    type: 'supports' | 'contradicts' | 'supersedes' | 'derived_from' | 'related_to' | 'same_as' | 'part_of';
    targetMemoryId: string;
    confidence?: number;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `confidence` | 属性 | <code>confidence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetMemoryId` | 属性 | <code>targetMemoryId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "supports" &#124; "contradicts" &#124; "supersedes" &#124; "derived_from" &#124; "related_to" &#124; "same_as" &#124; "part_of"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRetentionPolicySpec`

Memory Retention Policy Spec 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRetentionPolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryRetentionPolicySpec {
    defaultTtlSeconds?: number;
    ttlByType?: Partial<Record<ManagedMemoryType, number>>;
    archiveAfterSeconds?: number;
    deleteAfterSeconds?: number;
    retainHistory?: boolean;
    maxVersions?: number;
    legalHoldSupported?: boolean;
    deletionMode?: 'soft' | 'hard';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `archiveAfterSeconds` | 属性 | <code>archiveAfterSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultTtlSeconds` | 属性 | <code>defaultTtlSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deleteAfterSeconds` | 属性 | <code>deleteAfterSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deletionMode` | 属性 | <code>deletionMode?: "soft" &#124; "hard"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legalHoldSupported` | 属性 | <code>legalHoldSupported?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxVersions` | 属性 | <code>maxVersions?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retainHistory` | 属性 | <code>retainHistory?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlByType` | 属性 | <code>ttlByType?: Partial&lt;Record&lt;ManagedMemoryType, number&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRetrievalPolicySpec`

Memory Retrieval Policy Spec 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRetrievalPolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryRetrievalPolicySpec {
    defaultMode: 'structured' | 'semantic' | 'keyword' | 'hybrid';
    maxCandidates: number;
    defaultTopK: number;
    scoreThreshold?: number;
    memoryTypePriority?: Partial<Record<ManagedMemoryType, number>>;
    sourcePriority?: Partial<Record<MemorySource['type'], number>>;
    recencyWeight?: number;
    importanceWeight?: number;
    confidenceWeight?: number;
    reinforcementWeight?: number;
    deduplication: 'none' | 'id' | 'hash' | 'semantic';
    semanticDedupThreshold?: number;
    conflictHandling?: 'include_marked' | 'prefer_latest' | 'prefer_verified' | 'exclude_conflicts';
    rerank?: 'none' | 'score_fusion' | 'provider' | 'custom';
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
| `importanceWeight` | 属性 | <code>importanceWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxCandidates` | 属性 | <code>maxCandidates: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryTypePriority` | 属性 | <code>memoryTypePriority?: Partial&lt;Record&lt;ManagedMemoryType, number&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recencyWeight` | 属性 | <code>recencyWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reinforcementWeight` | 属性 | <code>reinforcementWeight?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rerank` | 属性 | <code>rerank?: "none" &#124; "provider" &#124; "custom" &#124; "score_fusion"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scoreThreshold` | 属性 | <code>scoreThreshold?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `semanticDedupThreshold` | 属性 | <code>semanticDedupThreshold?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourcePriority` | 属性 | <code>sourcePriority?: Partial&lt;Record&lt;"human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import", number&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryScopePolicySpec`

Memory Scope Policy Spec 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryScopePolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryScopePolicySpec {
    requiredDimensions: Array<keyof ManagedMemoryScope>;
    allowedReadScopes: Array<keyof ManagedMemoryScope>;
    allowedWriteScopes: Array<keyof ManagedMemoryScope>;
    inheritanceOrder?: Array<keyof ManagedMemoryScope>;
    crossUserRead?: 'deny' | 'policy';
    crossWorkspaceRead?: 'deny' | 'policy';
    enforceTenantBoundary?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedReadScopes` | 属性 | <code>allowedReadScopes: (keyof ManagedMemoryScope)[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedWriteScopes` | 属性 | <code>allowedWriteScopes: (keyof ManagedMemoryScope)[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `crossUserRead` | 属性 | <code>crossUserRead?: "deny" &#124; "policy"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `crossWorkspaceRead` | 属性 | <code>crossWorkspaceRead?: "deny" &#124; "policy"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `enforceTenantBoundary` | 属性 | <code>enforceTenantBoundary?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inheritanceOrder` | 属性 | <code>inheritanceOrder?: (keyof ManagedMemoryScope)[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredDimensions` | 属性 | <code>requiredDimensions: (keyof ManagedMemoryScope)[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemorySource`

Memory Source 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemorySource } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemorySource {
    type: 'user_message' | 'assistant_message' | 'tool_result' | 'artifact' | 'workflow_state' | 'human_review' | 'import' | 'derived' | 'system';
    sourceId?: string;
    sourceEventId?: string;
    sourceRunId?: string;
    sourceMessageId?: string;
    sourceArtifactId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `sourceArtifactId` | 属性 | <code>sourceArtifactId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceEventId` | 属性 | <code>sourceEventId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceId` | 属性 | <code>sourceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceMessageId` | 属性 | <code>sourceMessageId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceRunId` | 属性 | <code>sourceRunId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryVectorRef`

Memory Vector Ref 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryVectorRef } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryVectorRef {
    vectorStoreId: string;
    indexName: string;
    vectorId: string;
    embeddingProviderId: string;
    embeddingModel: string;
    embeddingRevision?: string;
    dimensions?: number;
    indexedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dimensions` | 属性 | <code>dimensions?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `embeddingModel` | 属性 | <code>embeddingModel: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `embeddingProviderId` | 属性 | <code>embeddingProviderId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `embeddingRevision` | 属性 | <code>embeddingRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `indexedAt` | 属性 | <code>indexedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `indexName` | 属性 | <code>indexName: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vectorId` | 属性 | <code>vectorId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vectorStoreId` | 属性 | <code>vectorStoreId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryWritePolicySpec`

Memory Write Policy Spec 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryWritePolicySpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface MemoryWritePolicySpec {
    allowedTypes: ManagedMemoryType[];
    autoCaptureSources?: MemorySource['type'][];
    requireHumanVerificationFor?: ManagedMemoryType[];
    minConfidence?: number;
    deduplicateBeforeWrite?: boolean;
    conflictDetection?: boolean;
    immutableTypes?: ManagedMemoryType[];
    maxContentBytes?: number;
    sensitiveDataMode?: 'reject' | 'redact' | 'encrypt' | 'allow_by_policy';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedTypes` | 属性 | <code>allowedTypes: ManagedMemoryType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `autoCaptureSources` | 属性 | <code>autoCaptureSources?: ("human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `conflictDetection` | 属性 | <code>conflictDetection?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deduplicateBeforeWrite` | 属性 | <code>deduplicateBeforeWrite?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `immutableTypes` | 属性 | <code>immutableTypes?: ManagedMemoryType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxContentBytes` | 属性 | <code>maxContentBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `minConfidence` | 属性 | <code>minConfidence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireHumanVerificationFor` | 属性 | <code>requireHumanVerificationFor?: ManagedMemoryType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sensitiveDataMode` | 属性 | <code>sensitiveDataMode?: "reject" &#124; "redact" &#124; "encrypt" &#124; "allow_by_policy"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `NormalizedMemoryError`

Normalized Memory Error 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NormalizedMemoryError } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface NormalizedMemoryError {
    code: 'MEMORY_INVALID_INPUT' | 'MEMORY_EXTRACTION_SOURCE_UNAVAILABLE' | 'MEMORY_EXTRACTION_FAILED' | 'MEMORY_EXTRACTION_CURSOR_CONFLICT' | 'MEMORY_MAINTENANCE_CONFLICT' | 'MEMORY_RANKING_FAILED' | 'MEMORY_IDEMPOTENCY_CONFLICT' | 'MEMORY_SCOPE_DENIED' | 'MEMORY_PERMISSION_DENIED' | 'MEMORY_NOT_FOUND' | 'MEMORY_REVISION_CONFLICT' | 'MEMORY_PROVIDER_NOT_INSTALLED' | 'MEMORY_PROVIDER_UNAVAILABLE' | 'MEMORY_PROVIDER_TIMEOUT' | 'MEMORY_STORE_UNAVAILABLE' | 'MEMORY_VECTOR_UNAVAILABLE' | 'MEMORY_INDEX_FAILED' | 'MEMORY_DELETE_PARTIAL' | 'MEMORY_POLICY_REJECTED' | 'MEMORY_CONTEXT_BUDGET_EXCEEDED' | 'MEMORY_INTERNAL_ERROR';
    message: string;
    retryable: boolean;
    providerCode?: string;
    details?: Record<string, unknown>;
    causeRef?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causeRef` | 属性 | <code>causeRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>code: "MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; "MEMORY_PROVIDER_TI...</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `details` | 属性 | <code>details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerCode` | 属性 | <code>providerCode?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `VectorStoreCapabilities`

Vector Store Capabilities 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { VectorStoreCapabilities } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface VectorStoreCapabilities {
    denseSearch: boolean;
    sparseSearch: boolean;
    hybridSearch: boolean;
    metadataFilter: boolean;
    fullTextFilter: boolean;
    namespaces: boolean;
    multiVector: boolean;
    batchUpsert: boolean;
    deleteByFilter: boolean;
    payloadUpdate: boolean;
    scoreThreshold: boolean;
    localDeployment: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `batchUpsert` | 属性 | <code>batchUpsert: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deleteByFilter` | 属性 | <code>deleteByFilter: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `denseSearch` | 属性 | <code>denseSearch: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fullTextFilter` | 属性 | <code>fullTextFilter: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hybridSearch` | 属性 | <code>hybridSearch: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `localDeployment` | 属性 | <code>localDeployment: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadataFilter` | 属性 | <code>metadataFilter: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `multiVector` | 属性 | <code>multiVector: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `namespaces` | 属性 | <code>namespaces: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payloadUpdate` | 属性 | <code>payloadUpdate: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scoreThreshold` | 属性 | <code>scoreThreshold: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sparseSearch` | 属性 | <code>sparseSearch: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `VectorStoreSpec`

Vector Store Spec 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { VectorStoreSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface VectorStoreSpec {
    id: string;
    version: string;
    type: 'local' | 'qdrant' | 'milvus' | 'chroma' | 'pinecone' | 'pgvector' | 'custom';
    connectionRef?: string;
    collection: string;
    namespaceStrategy?: 'scope_hash' | 'metadata_filter' | 'collection_per_tenant';
    dimensions?: number;
    distance?: 'cosine' | 'dot' | 'l2';
    indexType?: string;
    capabilities: VectorStoreCapabilities;
    writeMode?: 'sync' | 'async_outbox' | 'dual_write';
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: VectorStoreCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `collection` | 属性 | <code>collection: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `connectionRef` | 属性 | <code>connectionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dimensions` | 属性 | <code>dimensions?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `distance` | 属性 | <code>distance?: "cosine" &#124; "dot" &#124; "l2"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `indexType` | 属性 | <code>indexType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `namespaceStrategy` | 属性 | <code>namespaceStrategy?: "metadata_filter" &#124; "scope_hash" &#124; "collection_per_tenant"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "local" &#124; "custom" &#124; "pgvector" &#124; "qdrant" &#124; "milvus" &#124; "chroma" &#124; "pinecone"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `writeMode` | 属性 | <code>writeMode?: "sync" &#124; "async_outbox" &#124; "dual_write"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkingMemoryStoreSpec`

Working Memory Store Spec 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkingMemoryStoreSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export interface WorkingMemoryStoreSpec {
    id: string;
    version: string;
    type: 'in_memory' | 'redis' | 'custom';
    connectionRef?: string;
    namespace?: string;
    defaultTtlSeconds?: number;
    maxItemBytes?: number;
    serialization?: 'json' | 'msgpack';
    encryptionRef?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `connectionRef` | 属性 | <code>connectionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultTtlSeconds` | 属性 | <code>defaultTtlSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `encryptionRef` | 属性 | <code>encryptionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxItemBytes` | 属性 | <code>maxItemBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `namespace` | 属性 | <code>namespace?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serialization` | 属性 | <code>serialization?: "json" &#124; "msgpack"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "custom" &#124; "redis" &#124; "in_memory"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManagedMemoryType`

Managed Memory Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ManagedMemoryType } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export type ManagedMemoryType = 'working' | 'episodic' | 'semantic' | 'procedural' | 'preference' | 'artifact' | 'governance' | 'reflection' | 'custom';
```

## `MemoryStatus`

Memory Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryStatus } from '@codesoul-co/hypha-memory';`
- 源码模块: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### 声明

```text
export type MemoryStatus = 'pending' | 'active' | 'dormant' | 'superseded' | 'invalidated' | 'deletion_pending' | 'deleted' | 'failed';
```
