# `@codesoul-co/hypha-memory` / `operations`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/operations.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)
- Exports: **20**

## Using this module

Use the Operations module for using the public contracts and operations for this capability boundary. It exports 20 interfaces.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 20 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ManagedMemoryDeleteRequest` | interface | <code>interface ManagedMemoryDeleteRequest</code> | Managed Memory Delete Request interface with 8 public fields or methods. |
| `ManagedMemoryDeleteResult` | interface | <code>interface ManagedMemoryDeleteResult</code> | Managed Memory Delete Result interface with 6 public fields or methods. |
| `ManagedMemorySearchRequest` | interface | <code>interface ManagedMemorySearchRequest</code> | Managed Memory Search Request interface with 20 public fields or methods. |
| `ManagedMemorySearchResult` | interface | <code>interface ManagedMemorySearchResult</code> | Managed Memory Search Result interface with 7 public fields or methods. |
| `ManagedMemoryUpdateRequest` | interface | <code>interface ManagedMemoryUpdateRequest</code> | Managed Memory Update Request interface with 8 public fields or methods. |
| `ManagedMemoryWriteResult` | interface | <code>interface ManagedMemoryWriteResult</code> | Managed Memory Write Result interface with 7 public fields or methods. |
| `MemoryAddRequest` | interface | <code>interface MemoryAddRequest</code> | Memory Add Request interface with 13 public fields or methods. |
| `MemoryGetRequest` | interface | <code>interface MemoryGetRequest</code> | Memory Get Request interface with 5 public fields or methods. |
| `MemoryHistoryRequest` | interface | <code>interface MemoryHistoryRequest</code> | Memory History Request interface with 5 public fields or methods. |
| `MemoryIndexJobRef` | interface | <code>interface MemoryIndexJobRef</code> | Memory Index Job Ref interface with 2 public fields or methods. |
| `MemoryListRequest` | interface | <code>interface MemoryListRequest</code> | Memory List Request interface with 5 public fields or methods. |
| `MemoryListResult` | interface | <code>interface MemoryListResult extends PaginationResult</code> | Memory List Result interface with 3 public fields or methods. |
| `MemoryManagementProvider` | interface | <code>interface MemoryManagementProvider</code> | Memory Management Provider interface with 11 public fields or methods. |
| `MemoryPatch` | interface | <code>interface MemoryPatch</code> | Memory Patch interface with 8 public fields or methods. |
| `MemoryRejectedItem` | interface | <code>interface MemoryRejectedItem</code> | Memory Rejected Item interface with 3 public fields or methods. |
| `MemorySearchFilter` | interface | <code>interface MemorySearchFilter</code> | Memory Search Filter interface with 18 public fields or methods. |
| `MemoryVersion` | interface | <code>interface MemoryVersion</code> | Memory Version interface with 4 public fields or methods. |
| `PaginationRequest` | interface | <code>interface PaginationRequest</code> | Pagination Request interface with 7 public fields or methods. |
| `PaginationResult` | interface | <code>interface PaginationResult</code> | Pagination Result interface with 2 public fields or methods. |
| `ProviderHealth` | interface | <code>interface ProviderHealth</code> | Provider Health interface with 5 public fields or methods. |

## `ManagedMemoryDeleteRequest`

Managed Memory Delete Request interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ManagedMemoryDeleteRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filter` | property | <code>filter?: MemorySearchFilter</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryIds` | property | <code>memoryIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "soft" &#124; "hard" &#124; "compliance"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManagedMemoryDeleteResult`

Managed Memory Delete Result interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ManagedMemoryDeleteResult } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deletedMemoryIds` | property | <code>deletedMemoryIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingProviderIds` | property | <code>pendingProviderIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "rejected" &#124; "failed" &#124; "partial"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `warnings` | property | <code>warnings?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManagedMemorySearchRequest`

Managed Memory Search Request interface with 20 public fields or methods.

- Kind: interface
- Import: `import type { ManagedMemorySearchRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filters` | property | <code>filters?: MemorySearchFilter</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeContent` | property | <code>includeContent?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeDormant` | property | <code>includeDormant?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeProvenance` | property | <code>includeProvenance?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeRelations` | property | <code>includeRelations?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeSuperseded` | property | <code>includeSuperseded?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryTypes` | property | <code>memoryTypes?: ManagedMemoryType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode?: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword" &#124; "graph"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pagination` | property | <code>pagination?: PaginationRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `query` | property | <code>query?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `queryEmbedding` | property | <code>queryEmbedding?: number[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rerank` | property | <code>rerank?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scoreThreshold` | property | <code>scoreThreshold?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `topK` | property | <code>topK?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updateAccessStats` | property | <code>updateAccessStats?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManagedMemorySearchResult`

Managed Memory Search Result interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ManagedMemorySearchResult } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `graphScore` | property | <code>graphScore?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `keywordScore` | property | <code>keywordScore?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasons` | property | <code>reasons?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `record` | property | <code>record: ManagedMemoryRecord&lt;unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rerankScore` | property | <code>rerankScore?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `score` | property | <code>score?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `semanticScore` | property | <code>semanticScore?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManagedMemoryUpdateRequest`

Managed Memory Update Request interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ManagedMemoryUpdateRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedRevision` | property | <code>expectedRevision?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryId` | property | <code>memoryId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `patch` | property | <code>patch: MemoryPatch</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManagedMemoryWriteResult`

Managed Memory Write Result interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ManagedMemoryWriteResult } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `indexJobs` | property | <code>indexJobs?: MemoryIndexJobRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `records` | property | <code>records: ManagedMemoryRecord&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rejectedItems` | property | <code>rejectedItems?: MemoryRejectedItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "rejected" &#124; "queued" &#124; "failed" &#124; "committed" &#124; "reused" &#124; "partial"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `warnings` | property | <code>warnings?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryAddRequest`

Memory Add Request interface with 13 public fields or methods.

- Kind: interface
- Import: `import type { MemoryAddRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `extractionMode` | property | <code>extractionMode?: "none" &#124; "provider" &#124; "custom" &#124; "native"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputType` | property | <code>inputType?: "structured" &#124; "text" &#124; "message" &#124; "artifact_ref" &#124; "event_ref"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryType` | property | <code>memoryType?: ManagedMemoryType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: MemorySource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `writeMode` | property | <code>writeMode?: "sync" &#124; "async"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryGetRequest`

Memory Get Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryGetRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

```text
export interface MemoryGetRequest {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    memoryId: string;
    includeHistory?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `includeHistory` | property | <code>includeHistory?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryId` | property | <code>memoryId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryHistoryRequest`

Memory History Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryHistoryRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

```text
export interface MemoryHistoryRequest {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    memoryId: string;
    pagination?: PaginationRequest;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryId` | property | <code>memoryId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pagination` | property | <code>pagination?: PaginationRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryIndexJobRef`

Memory Index Job Ref interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryIndexJobRef } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

```text
export interface MemoryIndexJobRef {
    id: string;
    state: 'pending' | 'processing' | 'completed' | 'partial' | 'failed';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: "completed" &#124; "failed" &#124; "processing" &#124; "pending" &#124; "partial"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryListRequest`

Memory List Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryListRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

```text
export interface MemoryListRequest {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    filter?: MemorySearchFilter;
    pagination?: PaginationRequest;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filter` | property | <code>filter?: MemorySearchFilter</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pagination` | property | <code>pagination?: PaginationRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryListResult`

Memory List Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryListResult } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

```text
export interface MemoryListResult extends PaginationResult {
    records: ManagedMemoryRecord[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `hasMore` | property | <code>hasMore: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextCursor` | property | <code>nextCursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `records` | property | <code>records: ManagedMemoryRecord&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryManagementProvider`

Memory Management Provider interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { MemoryManagementProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;import("./contracts").MemoryManagementCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history?(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryPatch`

Memory Patch interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MemoryPatch } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalText` | property | <code>canonicalText?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `confidence` | property | <code>confidence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `importance` | property | <code>importance?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status?: "failed" &#124; "invalidated" &#124; "deletion_pending" &#124; "active" &#124; "pending" &#124; "superseded" &#124; "dormant"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `summary` | property | <code>summary?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRejectedItem`

Memory Rejected Item interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRejectedItem } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

```text
export interface MemoryRejectedItem {
    itemId?: string;
    reason: string;
    error?: NormalizedMemoryError;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error?: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `itemId` | property | <code>itemId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemorySearchFilter`

Memory Search Filter interface with 18 public fields or methods.

- Kind: interface
- Import: `import type { MemorySearchFilter } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalKeys` | property | <code>canonicalKeys?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `confidenceGte` | property | <code>confidenceGte?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conflictFreeOnly` | property | <code>conflictFreeOnly?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAfter` | property | <code>createdAfter?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdBefore` | property | <code>createdBefore?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `entityIds` | property | <code>entityIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `excludeIds` | property | <code>excludeIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAfter` | property | <code>expiresAfter?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ids` | property | <code>ids?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `importanceGte` | property | <code>importanceGte?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceTypes` | property | <code>sourceTypes?: ("human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statuses` | property | <code>statuses?: MemoryStatus[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tagsAll` | property | <code>tagsAll?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tagsAny` | property | <code>tagsAny?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAfter` | property | <code>updatedAfter?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `verifiedOnly` | property | <code>verifiedOnly?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `visibility` | property | <code>visibility?: ("workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryVersion`

Memory Version interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryVersion } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

```text
export interface MemoryVersion {
    memoryId: string;
    versionId: string;
    revision: number;
    record: ManagedMemoryRecord;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryId` | property | <code>memoryId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `record` | property | <code>record: ManagedMemoryRecord&lt;unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PaginationRequest`

Pagination Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { PaginationRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cursor` | property | <code>cursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxBytes` | property | <code>maxBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxCalls` | property | <code>maxCalls?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxDurationMs` | property | <code>maxDurationMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxItems` | property | <code>maxItems?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxPages` | property | <code>maxPages?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PaginationResult`

Pagination Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { PaginationResult } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

```text
export interface PaginationResult {
    nextCursor?: string;
    hasMore: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `hasMore` | property | <code>hasMore: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextCursor` | property | <code>nextCursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ProviderHealth`

Provider Health interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ProviderHealth } from '@codesoul-co/hypha-memory';`
- Source module: [`operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operations.ts)

### Declaration

```text
export interface ProviderHealth {
    status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
    checkedAt: string;
    latencyMs?: number;
    message?: string;
    details?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `details` | property | <code>details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `latencyMs` | property | <code>latencyMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "healthy" &#124; "degraded" &#124; "unhealthy" &#124; "unknown"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
