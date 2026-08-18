# `@codesoul-co/hypha-memory` / `operations`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/operations.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)
- 导出数: **20**

## 模块用法

用于使用该功能边界的公共契约与操作。Operations 模块公开 20 接口。

### 从包入口导入

```ts
import type {
  ManagedMemoryDeleteRequest,
  ManagedMemoryDeleteResult,
  ManagedMemorySearchRequest,
  ManagedMemorySearchResult,
  ManagedMemoryUpdateRequest,
  ManagedMemoryWriteResult,
  MemoryAddRequest,
  MemoryGetRequest,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 20 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ManagedMemoryDeleteRequest` | 接口 | <code>interface ManagedMemoryDeleteRequest</code> | Managed Memory Delete Request 接口，共包含 8 个公开字段或方法。 |
| `ManagedMemoryDeleteResult` | 接口 | <code>interface ManagedMemoryDeleteResult</code> | Managed Memory Delete Result 接口，共包含 6 个公开字段或方法。 |
| `ManagedMemorySearchRequest` | 接口 | <code>interface ManagedMemorySearchRequest</code> | Managed Memory Search Request 接口，共包含 20 个公开字段或方法。 |
| `ManagedMemorySearchResult` | 接口 | <code>interface ManagedMemorySearchResult</code> | Managed Memory Search Result 接口，共包含 7 个公开字段或方法。 |
| `ManagedMemoryUpdateRequest` | 接口 | <code>interface ManagedMemoryUpdateRequest</code> | Managed Memory Update Request 接口，共包含 8 个公开字段或方法。 |
| `ManagedMemoryWriteResult` | 接口 | <code>interface ManagedMemoryWriteResult</code> | Managed Memory Write Result 接口，共包含 7 个公开字段或方法。 |
| `MemoryAddRequest` | 接口 | <code>interface MemoryAddRequest</code> | Memory Add Request 接口，共包含 13 个公开字段或方法。 |
| `MemoryGetRequest` | 接口 | <code>interface MemoryGetRequest</code> | Memory Get Request 接口，共包含 5 个公开字段或方法。 |
| `MemoryHistoryRequest` | 接口 | <code>interface MemoryHistoryRequest</code> | Memory History Request 接口，共包含 5 个公开字段或方法。 |
| `MemoryIndexJobRef` | 接口 | <code>interface MemoryIndexJobRef</code> | Memory Index Job Ref 接口，共包含 2 个公开字段或方法。 |
| `MemoryListRequest` | 接口 | <code>interface MemoryListRequest</code> | Memory List Request 接口，共包含 5 个公开字段或方法。 |
| `MemoryListResult` | 接口 | <code>interface MemoryListResult extends PaginationResult</code> | Memory List Result 接口，共包含 3 个公开字段或方法。 |
| `MemoryManagementProvider` | 接口 | <code>interface MemoryManagementProvider</code> | Memory Management Provider 接口，共包含 11 个公开字段或方法。 |
| `MemoryPatch` | 接口 | <code>interface MemoryPatch</code> | Memory Patch 接口，共包含 8 个公开字段或方法。 |
| `MemoryRejectedItem` | 接口 | <code>interface MemoryRejectedItem</code> | Memory Rejected Item 接口，共包含 3 个公开字段或方法。 |
| `MemorySearchFilter` | 接口 | <code>interface MemorySearchFilter</code> | Memory Search Filter 接口，共包含 18 个公开字段或方法。 |
| `MemoryVersion` | 接口 | <code>interface MemoryVersion</code> | Memory Version 接口，共包含 4 个公开字段或方法。 |
| `PaginationRequest` | 接口 | <code>interface PaginationRequest</code> | Pagination Request 接口，共包含 7 个公开字段或方法。 |
| `PaginationResult` | 接口 | <code>interface PaginationResult</code> | Pagination Result 接口，共包含 2 个公开字段或方法。 |
| `ProviderHealth` | 接口 | <code>interface ProviderHealth</code> | Provider Health 接口，共包含 5 个公开字段或方法。 |

## `ManagedMemoryDeleteRequest`

Managed Memory Delete Request 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedMemoryDeleteRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface ManagedMemoryDeleteRequest {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    memoryIds?: string[];
    filter?: MemorySearchFilter;
    mode: 'soft' | 'hard' | 'compliance';
    reason: string;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filter` | 属性 | <code>filter?: MemorySearchFilter</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryIds` | 属性 | <code>memoryIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "soft" &#124; "hard" &#124; "compliance"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManagedMemoryDeleteResult`

Managed Memory Delete Result 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedMemoryDeleteResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface ManagedMemoryDeleteResult {
    operationId: string;
    status: 'completed' | 'partial' | 'rejected' | 'failed';
    deletedMemoryIds: string[];
    pendingProviderIds?: string[];
    events?: string[];
    warnings?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deletedMemoryIds` | 属性 | <code>deletedMemoryIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingProviderIds` | 属性 | <code>pendingProviderIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "rejected" &#124; "failed" &#124; "partial"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `warnings` | 属性 | <code>warnings?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManagedMemorySearchRequest`

Managed Memory Search Request 接口，共包含 20 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedMemorySearchRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface ManagedMemorySearchRequest {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    profileRef: MemoryContractSpecRef;
    query?: string;
    queryEmbedding?: number[];
    filters?: MemorySearchFilter;
    memoryTypes?: ManagedMemoryType[];
    mode?: 'structured' | 'semantic' | 'keyword' | 'hybrid' | 'graph';
    topK?: number;
    scoreThreshold?: number;
    includeDormant?: boolean;
    includeSuperseded?: boolean;
    includeContent?: boolean;
    includeProvenance?: boolean;
    includeRelations?: boolean;
    rerank?: boolean;
    updateAccessStats?: boolean;
    pagination?: PaginationRequest;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filters` | 属性 | <code>filters?: MemorySearchFilter</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeContent` | 属性 | <code>includeContent?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeDormant` | 属性 | <code>includeDormant?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeProvenance` | 属性 | <code>includeProvenance?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeRelations` | 属性 | <code>includeRelations?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeSuperseded` | 属性 | <code>includeSuperseded?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryTypes` | 属性 | <code>memoryTypes?: ManagedMemoryType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode?: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword" &#124; "graph"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pagination` | 属性 | <code>pagination?: PaginationRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `query` | 属性 | <code>query?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `queryEmbedding` | 属性 | <code>queryEmbedding?: number[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rerank` | 属性 | <code>rerank?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scoreThreshold` | 属性 | <code>scoreThreshold?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `topK` | 属性 | <code>topK?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updateAccessStats` | 属性 | <code>updateAccessStats?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManagedMemorySearchResult`

Managed Memory Search Result 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedMemorySearchResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface ManagedMemorySearchResult {
    record: ManagedMemoryRecord;
    score?: number;
    semanticScore?: number;
    keywordScore?: number;
    graphScore?: number;
    rerankScore?: number;
    reasons?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `graphScore` | 属性 | <code>graphScore?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `keywordScore` | 属性 | <code>keywordScore?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasons` | 属性 | <code>reasons?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `record` | 属性 | <code>record: ManagedMemoryRecord&lt;unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rerankScore` | 属性 | <code>rerankScore?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `score` | 属性 | <code>score?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `semanticScore` | 属性 | <code>semanticScore?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManagedMemoryUpdateRequest`

Managed Memory Update Request 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedMemoryUpdateRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface ManagedMemoryUpdateRequest {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    memoryId: string;
    expectedRevision?: number;
    patch: MemoryPatch;
    reason: string;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedRevision` | 属性 | <code>expectedRevision?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `patch` | 属性 | <code>patch: MemoryPatch</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManagedMemoryWriteResult`

Managed Memory Write Result 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedMemoryWriteResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface ManagedMemoryWriteResult {
    operationId: string;
    status: 'committed' | 'queued' | 'reused' | 'rejected' | 'partial' | 'failed';
    records: ManagedMemoryRecord[];
    rejectedItems?: MemoryRejectedItem[];
    indexJobs?: MemoryIndexJobRef[];
    events?: string[];
    warnings?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `indexJobs` | 属性 | <code>indexJobs?: MemoryIndexJobRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `records` | 属性 | <code>records: ManagedMemoryRecord&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rejectedItems` | 属性 | <code>rejectedItems?: MemoryRejectedItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "rejected" &#124; "queued" &#124; "failed" &#124; "committed" &#124; "reused" &#124; "partial"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `warnings` | 属性 | <code>warnings?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryAddRequest`

Memory Add Request 接口，共包含 13 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryAddRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface MemoryAddRequest {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    input: unknown;
    inputType?: 'message' | 'text' | 'structured' | 'artifact_ref' | 'event_ref';
    memoryType?: ManagedMemoryType;
    source: MemorySource;
    extractionMode?: 'none' | 'native' | 'provider' | 'custom';
    writeMode?: 'sync' | 'async';
    idempotencyKey?: string;
    profileRef: MemoryContractSpecRef;
    tags?: string[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `extractionMode` | 属性 | <code>extractionMode?: "none" &#124; "provider" &#124; "custom" &#124; "native"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputType` | 属性 | <code>inputType?: "structured" &#124; "text" &#124; "message" &#124; "artifact_ref" &#124; "event_ref"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryType` | 属性 | <code>memoryType?: ManagedMemoryType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: MemorySource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `writeMode` | 属性 | <code>writeMode?: "sync" &#124; "async"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryGetRequest`

Memory Get Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryGetRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface MemoryGetRequest {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    memoryId: string;
    includeHistory?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `includeHistory` | 属性 | <code>includeHistory?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryHistoryRequest`

Memory History Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryHistoryRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface MemoryHistoryRequest {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    memoryId: string;
    pagination?: PaginationRequest;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryId` | 属性 | <code>memoryId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pagination` | 属性 | <code>pagination?: PaginationRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryIndexJobRef`

Memory Index Job Ref 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryIndexJobRef } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface MemoryIndexJobRef {
    id: string;
    state: 'pending' | 'processing' | 'completed' | 'partial' | 'failed';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: "completed" &#124; "failed" &#124; "processing" &#124; "pending" &#124; "partial"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryListRequest`

Memory List Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryListRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface MemoryListRequest {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    filter?: MemorySearchFilter;
    pagination?: PaginationRequest;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filter` | 属性 | <code>filter?: MemorySearchFilter</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pagination` | 属性 | <code>pagination?: PaginationRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryListResult`

Memory List Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryListResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface MemoryListResult extends PaginationResult {
    records: ManagedMemoryRecord[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `hasMore` | 属性 | <code>hasMore: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextCursor` | 属性 | <code>nextCursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `records` | 属性 | <code>records: ManagedMemoryRecord&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryManagementProvider`

Memory Management Provider 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryManagementProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface MemoryManagementProvider {
    readonly id: string;
    capabilities(): Promise<import('./contracts').MemoryManagementCapabilities>;
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history?(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    health(): Promise<ProviderHealth>;
    close?(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;import("./contracts").MemoryManagementCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history?(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryPatch`

Memory Patch 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryPatch } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface MemoryPatch {
    content?: unknown;
    canonicalText?: string;
    summary?: string;
    confidence?: number;
    importance?: number;
    tags?: string[];
    status?: Exclude<MemoryStatus, 'deleted'>;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalText` | 属性 | <code>canonicalText?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `confidence` | 属性 | <code>confidence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `importance` | 属性 | <code>importance?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status?: "failed" &#124; "invalidated" &#124; "deletion_pending" &#124; "active" &#124; "pending" &#124; "superseded" &#124; "dormant"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `summary` | 属性 | <code>summary?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRejectedItem`

Memory Rejected Item 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRejectedItem } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface MemoryRejectedItem {
    itemId?: string;
    reason: string;
    error?: NormalizedMemoryError;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error?: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `itemId` | 属性 | <code>itemId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemorySearchFilter`

Memory Search Filter 接口，共包含 18 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemorySearchFilter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface MemorySearchFilter {
    ids?: string[];
    excludeIds?: string[];
    statuses?: MemoryStatus[];
    tagsAny?: string[];
    tagsAll?: string[];
    createdAfter?: string;
    createdBefore?: string;
    updatedAfter?: string;
    expiresAfter?: string;
    confidenceGte?: number;
    importanceGte?: number;
    sourceTypes?: MemorySource['type'][];
    entityIds?: string[];
    visibility?: ManagedMemoryRecord['visibility'][];
    verifiedOnly?: boolean;
    conflictFreeOnly?: boolean;
    canonicalKeys?: string[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalKeys` | 属性 | <code>canonicalKeys?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `confidenceGte` | 属性 | <code>confidenceGte?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `conflictFreeOnly` | 属性 | <code>conflictFreeOnly?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAfter` | 属性 | <code>createdAfter?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdBefore` | 属性 | <code>createdBefore?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `entityIds` | 属性 | <code>entityIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `excludeIds` | 属性 | <code>excludeIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAfter` | 属性 | <code>expiresAfter?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ids` | 属性 | <code>ids?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `importanceGte` | 属性 | <code>importanceGte?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceTypes` | 属性 | <code>sourceTypes?: ("human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statuses` | 属性 | <code>statuses?: MemoryStatus[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tagsAll` | 属性 | <code>tagsAll?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tagsAny` | 属性 | <code>tagsAny?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAfter` | 属性 | <code>updatedAfter?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `verifiedOnly` | 属性 | <code>verifiedOnly?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `visibility` | 属性 | <code>visibility?: ("workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryVersion`

Memory Version 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryVersion } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface MemoryVersion {
    memoryId: string;
    versionId: string;
    revision: number;
    record: ManagedMemoryRecord;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryId` | 属性 | <code>memoryId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `record` | 属性 | <code>record: ManagedMemoryRecord&lt;unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PaginationRequest`

Pagination Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PaginationRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface PaginationRequest {
    cursor?: string;
    limit?: number;
    maxPages?: number;
    maxItems?: number;
    maxBytes?: number;
    maxDurationMs?: number;
    maxCalls?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cursor` | 属性 | <code>cursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxBytes` | 属性 | <code>maxBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxCalls` | 属性 | <code>maxCalls?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxDurationMs` | 属性 | <code>maxDurationMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxItems` | 属性 | <code>maxItems?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxPages` | 属性 | <code>maxPages?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PaginationResult`

Pagination Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PaginationResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface PaginationResult {
    nextCursor?: string;
    hasMore: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `hasMore` | 属性 | <code>hasMore: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextCursor` | 属性 | <code>nextCursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ProviderHealth`

Provider Health 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProviderHealth } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### 声明

```text
export interface ProviderHealth {
    status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
    checkedAt: string;
    latencyMs?: number;
    message?: string;
    details?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `details` | 属性 | <code>details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `latencyMs` | 属性 | <code>latencyMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "healthy" &#124; "degraded" &#124; "unhealthy" &#124; "unknown"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
