# `@codesoul-co/hypha-memory` / `contracts`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)
- Exports: **30**

## Using this module

Use the Contracts module for declaring and runtime-validating contracts. It exports 28 interfaces, 2 types.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 30 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `EmbeddingProviderSpec` | interface | <code>interface EmbeddingProviderSpec</code> | Embedding Provider Spec interface with 11 public fields or methods. |
| `ManagedMemoryRecord` | interface | <code>interface ManagedMemoryRecord</code> | Managed Memory Record interface with 38 public fields or methods. |
| `ManagedMemoryScope` | interface | <code>interface ManagedMemoryScope</code> | Managed Memory Scope interface with 8 public fields or methods. |
| `MemoryConflictPolicySpec` | interface | <code>interface MemoryConflictPolicySpec</code> | Memory Conflict Policy Spec interface with 4 public fields or methods. |
| `MemoryConsolidationPolicySpec` | interface | <code>interface MemoryConsolidationPolicySpec</code> | Memory Consolidation Policy Spec interface with 8 public fields or methods. |
| `MemoryContractSpecRef` | interface | <code>interface MemoryContractSpecRef extends SpecRef</code> | Memory Contract Spec Ref interface with 3 public fields or methods. |
| `MemoryEntityRef` | interface | <code>interface MemoryEntityRef</code> | Memory Entity Ref interface with 4 public fields or methods. |
| `MemoryFallbackPolicySpec` | interface | <code>interface MemoryFallbackPolicySpec</code> | Memory Fallback Policy Spec interface with 4 public fields or methods. |
| `MemoryIndexingPolicySpec` | interface | <code>interface MemoryIndexingPolicySpec</code> | Memory Indexing Policy Spec interface with 6 public fields or methods. |
| `MemoryIndexStatus` | interface | <code>interface MemoryIndexStatus</code> | Memory Index Status interface with 4 public fields or methods. |
| `MemoryManagementCapabilities` | interface | <code>interface MemoryManagementCapabilities</code> | Memory Management Capabilities interface with 17 public fields or methods. |
| `MemoryManagementProviderSpec` | interface | <code>interface MemoryManagementProviderSpec</code> | Memory Management Provider Spec interface with 14 public fields or methods. |
| `MemoryPrincipal` | interface | <code>interface MemoryPrincipal</code> | Memory Principal interface with 8 public fields or methods. |
| `MemoryPrivacyPolicySpec` | interface | <code>interface MemoryPrivacyPolicySpec</code> | Memory Privacy Policy Spec interface with 6 public fields or methods. |
| `MemoryProfileSpec` | interface | <code>interface MemoryProfileSpec</code> | Memory Profile Spec interface with 25 public fields or methods. |
| `MemoryProvenance` | interface | <code>interface MemoryProvenance</code> | Memory Provenance interface with 9 public fields or methods. |
| `MemoryRecordStoreSpec` | interface | <code>interface MemoryRecordStoreSpec</code> | Memory Record Store Spec interface with 10 public fields or methods. |
| `MemoryRelation` | interface | <code>interface MemoryRelation</code> | Memory Relation interface with 4 public fields or methods. |
| `MemoryRetentionPolicySpec` | interface | <code>interface MemoryRetentionPolicySpec</code> | Memory Retention Policy Spec interface with 8 public fields or methods. |
| `MemoryRetrievalPolicySpec` | interface | <code>interface MemoryRetrievalPolicySpec</code> | Memory Retrieval Policy Spec interface with 14 public fields or methods. |
| `MemoryScopePolicySpec` | interface | <code>interface MemoryScopePolicySpec</code> | Memory Scope Policy Spec interface with 7 public fields or methods. |
| `MemorySource` | interface | <code>interface MemorySource</code> | Memory Source interface with 6 public fields or methods. |
| `MemoryVectorRef` | interface | <code>interface MemoryVectorRef</code> | Memory Vector Ref interface with 8 public fields or methods. |
| `MemoryWritePolicySpec` | interface | <code>interface MemoryWritePolicySpec</code> | Memory Write Policy Spec interface with 9 public fields or methods. |
| `NormalizedMemoryError` | interface | <code>interface NormalizedMemoryError</code> | Normalized Memory Error interface with 6 public fields or methods. |
| `VectorStoreCapabilities` | interface | <code>interface VectorStoreCapabilities</code> | Vector Store Capabilities interface with 12 public fields or methods. |
| `VectorStoreSpec` | interface | <code>interface VectorStoreSpec</code> | Vector Store Spec interface with 12 public fields or methods. |
| `WorkingMemoryStoreSpec` | interface | <code>interface WorkingMemoryStoreSpec</code> | Working Memory Store Spec interface with 10 public fields or methods. |
| `ManagedMemoryType` | type | <code>type ManagedMemoryType = 'working' &#124; 'episodic' &#124; 'semantic' &#124; 'procedural' &#124; 'preference' &#124; 'artifact' &#124; 'governance' &#124; 'reflection' &#124; 'custom'</code> | Public type alias for Managed Memory Type; the declaration contains its complete type expression. |
| `MemoryStatus` | type | <code>type MemoryStatus = 'pending' &#124; 'active' &#124; 'dormant' &#124; 'superseded' &#124; 'invalidated' &#124; 'deletion_pending' &#124; 'deleted' &#124; 'failed'</code> | Public type alias for Memory Status; the declaration contains its complete type expression. |

## `EmbeddingProviderSpec`

Embedding Provider Spec interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { EmbeddingProviderSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `connectionRef` | property | <code>connectionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dimensions` | property | <code>dimensions?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxBatchSize` | property | <code>maxBatchSize?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxInputTokens` | property | <code>maxInputTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `model` | property | <code>model: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `normalized` | property | <code>normalized?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManagedMemoryRecord`

Managed Memory Record interface with 38 public fields or methods.

- Kind: interface
- Import: `import type { ManagedMemoryRecord } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `accessCount` | property | <code>accessCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `canonicalText` | property | <code>canonicalText?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `confidence` | property | <code>confidence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content: TContent</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decayScore` | property | <code>decayScore?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deletedAt` | property | <code>deletedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `entities` | property | <code>entities?: MemoryEntityRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `humanVerified` | property | <code>humanVerified?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `immutable` | property | <code>immutable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `importance` | property | <code>importance?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `indexStatus` | property | <code>indexStatus: MemoryIndexStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `language` | property | <code>language?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastAccessedAt` | property | <code>lastAccessedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastReinforcedAt` | property | <code>lastReinforcedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance: MemoryProvenance</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relations` | property | <code>relations?: MemoryRelation[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `salience` | property | <code>salience?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sensitive` | property | <code>sensitive?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: MemorySource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: MemoryStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `strength` | property | <code>strength?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `subtype` | property | <code>subtype?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `summary` | property | <code>summary?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: ManagedMemoryType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vectorRefs` | property | <code>vectorRefs?: MemoryVectorRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `visibility` | property | <code>visibility: "workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManagedMemoryScope`

Managed Memory Scope interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ManagedMemoryScope } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackId` | property | <code>domainPackId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectId` | property | <code>projectId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryConflictPolicySpec`

Memory Conflict Policy Spec interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryConflictPolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

```text
export interface MemoryConflictPolicySpec {
    detectOnWrite: boolean;
    matchingMode: 'same_key' | 'semantic' | 'entity_relation' | 'custom';
    resolution: 'keep_both' | 'prefer_latest' | 'prefer_verified' | 'require_human' | 'custom';
    markRelations?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `detectOnWrite` | property | <code>detectOnWrite: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `markRelations` | property | <code>markRelations?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `matchingMode` | property | <code>matchingMode: "custom" &#124; "semantic" &#124; "same_key" &#124; "entity_relation"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolution` | property | <code>resolution: "custom" &#124; "prefer_latest" &#124; "prefer_verified" &#124; "keep_both" &#124; "require_human"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryConsolidationPolicySpec`

Memory Consolidation Policy Spec interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MemoryConsolidationPolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enabled` | property | <code>enabled: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `intervalSeconds` | property | <code>intervalSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `minRecords` | property | <code>minRecords?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preserveSourceRecords` | property | <code>preserveSourceRecords?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireVerification` | property | <code>requireVerification?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `similarityThreshold` | property | <code>similarityThreshold?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `summaryMemoryType` | property | <code>summaryMemoryType?: ManagedMemoryType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trigger` | property | <code>trigger: "manual" &#124; "scheduled" &#124; "count" &#124; "token_pressure"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryContractSpecRef`

Memory Contract Spec Ref interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryContractSpecRef } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

```text
export interface MemoryContractSpecRef extends SpecRef {
    revision?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryEntityRef`

Memory Entity Ref interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryEntityRef } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

```text
export interface MemoryEntityRef {
    entityId: string;
    label?: string;
    type?: string;
    confidence?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `confidence` | property | <code>confidence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `entityId` | property | <code>entityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `label` | property | <code>label?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryFallbackPolicySpec`

Memory Fallback Policy Spec interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryFallbackPolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

```text
export interface MemoryFallbackPolicySpec {
    onProviderUnavailable: 'fail' | 'native' | 'record_store_only' | 'skip';
    onVectorUnavailable: 'structured_only' | 'keyword' | 'fail';
    onRerankerUnavailable: 'score_fusion' | 'no_rerank' | 'fail';
    maxFallbackDepth?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxFallbackDepth` | property | <code>maxFallbackDepth?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `onProviderUnavailable` | property | <code>onProviderUnavailable: "fail" &#124; "native" &#124; "record_store_only" &#124; "skip"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `onRerankerUnavailable` | property | <code>onRerankerUnavailable: "fail" &#124; "score_fusion" &#124; "no_rerank"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `onVectorUnavailable` | property | <code>onVectorUnavailable: "fail" &#124; "keyword" &#124; "structured_only"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryIndexingPolicySpec`

Memory Indexing Policy Spec interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MemoryIndexingPolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `batchSize` | property | <code>batchSize?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadLetterAfterAttempts` | property | <code>deadLetterAfterAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "disabled" &#124; "sync" &#124; "async_outbox"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rebuildable` | property | <code>rebuildable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryDelayMs` | property | <code>retryDelayMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryIndexStatus`

Memory Index Status interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryIndexStatus } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

```text
export interface MemoryIndexStatus {
    state: 'none' | 'pending' | 'indexing' | 'indexed' | 'partial' | 'failed' | 'deleted';
    attempts: number;
    lastAttemptAt?: string;
    lastError?: NormalizedMemoryError;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastAttemptAt` | property | <code>lastAttemptAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastError` | property | <code>lastError?: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: "none" &#124; "failed" &#124; "deleted" &#124; "pending" &#124; "indexing" &#124; "indexed" &#124; "partial"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryManagementCapabilities`

Memory Management Capabilities interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { MemoryManagementCapabilities } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | property | <code>add: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `asyncWrite` | property | <code>asyncWrite: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `batchOperations` | property | <code>batchOperations: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conflictDetection` | property | <code>conflictDetection: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `consolidate` | property | <code>consolidate: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decay` | property | <code>decay: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `delete` | property | <code>delete: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deleteByFilter` | property | <code>deleteByFilter: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `get` | property | <code>get: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `graphRelations` | property | <code>graphRelations: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `history` | property | <code>history: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hybridSearch` | property | <code>hybridSearch: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `list` | property | <code>list: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reinforce` | property | <code>reinforce: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `search` | property | <code>search: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `summarize` | property | <code>summarize: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `update` | property | <code>update: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryManagementProviderSpec`

Memory Management Provider Spec interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { MemoryManagementProviderSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: MemoryManagementCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `circuitBreakerPolicy` | property | <code>circuitBreakerPolicy?: { failureThreshold: number; resetAfterMs: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `config` | property | <code>config?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `connectionRef` | property | <code>connectionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deployment` | property | <code>deployment: "local" &#124; "self_hosted" &#124; "managed" &#124; "embedded" &#124; "remote"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `healthCheckPolicy` | property | <code>healthCheckPolicy?: { intervalMs?: number; timeoutMs?: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryPolicy` | property | <code>retryPolicy?: { maxAttempts: number; initialDelayMs?: number; maxDelayMs?: number; backoff?: "fixed" &#124; "exponential"; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutPolicy` | property | <code>timeoutPolicy?: { timeoutMs: number; operationTimeouts?: Partial&lt;Record&lt;"add" &#124; "search" &#124; "get" &#124; "list" &#124; "update" &#124; "delete", number&gt;&gt;; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "custom" &#124; "native" &#124; "mem0" &#124; "memorybank"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryPrincipal`

Memory Principal interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MemoryPrincipal } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permissionScopes` | property | <code>permissionScopes: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `roles` | property | <code>roles?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryPrivacyPolicySpec`

Memory Privacy Policy Spec interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MemoryPrivacyPolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowCrossUserRead` | property | <code>allowCrossUserRead?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowCrossWorkspaceRead` | property | <code>allowCrossWorkspaceRead?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `complianceDelete` | property | <code>complianceDelete?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `encryptionRef` | property | <code>encryptionRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redactFields` | property | <code>redactFields?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sensitiveDataMode` | property | <code>sensitiveDataMode: "reject" &#124; "redact" &#124; "encrypt" &#124; "allow_by_policy"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProfileSpec`

Memory Profile Spec interface with 25 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProfileSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactStoreRef` | property | <code>artifactStoreRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conflictPolicy` | property | <code>conflictPolicy?: MemoryConflictPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `consolidationPolicy` | property | <code>consolidationPolicy?: MemoryConsolidationPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextProfileRef` | property | <code>contextProfileRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `embeddingProviderRef` | property | <code>embeddingProviderRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `enabled` | property | <code>enabled?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fallbackPolicy` | property | <code>fallbackPolicy?: MemoryFallbackPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `indexingPolicy` | property | <code>indexingPolicy?: MemoryIndexingPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `managementProviderRef` | property | <code>managementProviderRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `privacyPolicy` | property | <code>privacyPolicy?: MemoryPrivacyPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordStoreRef` | property | <code>recordStoreRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rerankerProviderRef` | property | <code>rerankerProviderRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retentionPolicy` | property | <code>retentionPolicy: MemoryRetentionPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retrievalPolicy` | property | <code>retrievalPolicy: MemoryRetrievalPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopePolicy` | property | <code>scopePolicy: MemoryScopePolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vectorStoreRefs` | property | <code>vectorStoreRefs?: MemoryContractSpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workingStoreRef` | property | <code>workingStoreRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `writePolicy` | property | <code>writePolicy: MemoryWritePolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProvenance`

Memory Provenance interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProvenance } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdBy` | property | <code>createdBy: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `extractorVersion` | property | <code>extractorVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `humanDecisionId` | property | <code>humanDecisionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceEventIds` | property | <code>sourceEventIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceMemoryIds` | property | <code>sourceMemoryIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transformation` | property | <code>transformation?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRecordStoreSpec`

Memory Record Store Spec interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRecordStoreSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collectionOrTable` | property | <code>collectionOrTable?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `connectionRef` | property | <code>connectionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `database` | property | <code>database?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `encryptionRef` | property | <code>encryptionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `historyMode` | property | <code>historyMode?: "embedded_versions" &#124; "separate_versions" &#124; "event_projection"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transactional` | property | <code>transactional?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "custom" &#124; "sqlite" &#124; "postgres" &#124; "mongodb"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRelation`

Memory Relation interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRelation } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

```text
export interface MemoryRelation {
    type: 'supports' | 'contradicts' | 'supersedes' | 'derived_from' | 'related_to' | 'same_as' | 'part_of';
    targetMemoryId: string;
    confidence?: number;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `confidence` | property | <code>confidence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetMemoryId` | property | <code>targetMemoryId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "supports" &#124; "contradicts" &#124; "supersedes" &#124; "derived_from" &#124; "related_to" &#124; "same_as" &#124; "part_of"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRetentionPolicySpec`

Memory Retention Policy Spec interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRetentionPolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archiveAfterSeconds` | property | <code>archiveAfterSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultTtlSeconds` | property | <code>defaultTtlSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deleteAfterSeconds` | property | <code>deleteAfterSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deletionMode` | property | <code>deletionMode?: "soft" &#124; "hard"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legalHoldSupported` | property | <code>legalHoldSupported?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxVersions` | property | <code>maxVersions?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retainHistory` | property | <code>retainHistory?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlByType` | property | <code>ttlByType?: Partial&lt;Record&lt;ManagedMemoryType, number&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRetrievalPolicySpec`

Memory Retrieval Policy Spec interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRetrievalPolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `confidenceWeight` | property | <code>confidenceWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conflictHandling` | property | <code>conflictHandling?: "include_marked" &#124; "prefer_latest" &#124; "prefer_verified" &#124; "exclude_conflicts"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deduplication` | property | <code>deduplication: "none" &#124; "id" &#124; "semantic" &#124; "hash"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultMode` | property | <code>defaultMode: "structured" &#124; "hybrid" &#124; "semantic" &#124; "keyword"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultTopK` | property | <code>defaultTopK: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `importanceWeight` | property | <code>importanceWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxCandidates` | property | <code>maxCandidates: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryTypePriority` | property | <code>memoryTypePriority?: Partial&lt;Record&lt;ManagedMemoryType, number&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recencyWeight` | property | <code>recencyWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reinforcementWeight` | property | <code>reinforcementWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rerank` | property | <code>rerank?: "none" &#124; "provider" &#124; "custom" &#124; "score_fusion"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scoreThreshold` | property | <code>scoreThreshold?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `semanticDedupThreshold` | property | <code>semanticDedupThreshold?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourcePriority` | property | <code>sourcePriority?: Partial&lt;Record&lt;"human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import", number&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryScopePolicySpec`

Memory Scope Policy Spec interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryScopePolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedReadScopes` | property | <code>allowedReadScopes: (keyof ManagedMemoryScope)[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedWriteScopes` | property | <code>allowedWriteScopes: (keyof ManagedMemoryScope)[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `crossUserRead` | property | <code>crossUserRead?: "deny" &#124; "policy"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `crossWorkspaceRead` | property | <code>crossWorkspaceRead?: "deny" &#124; "policy"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `enforceTenantBoundary` | property | <code>enforceTenantBoundary?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inheritanceOrder` | property | <code>inheritanceOrder?: (keyof ManagedMemoryScope)[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredDimensions` | property | <code>requiredDimensions: (keyof ManagedMemoryScope)[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemorySource`

Memory Source interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MemorySource } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `sourceArtifactId` | property | <code>sourceArtifactId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceEventId` | property | <code>sourceEventId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceId` | property | <code>sourceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceMessageId` | property | <code>sourceMessageId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceRunId` | property | <code>sourceRunId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryVectorRef`

Memory Vector Ref interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MemoryVectorRef } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dimensions` | property | <code>dimensions?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `embeddingModel` | property | <code>embeddingModel: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `embeddingProviderId` | property | <code>embeddingProviderId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `embeddingRevision` | property | <code>embeddingRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `indexedAt` | property | <code>indexedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `indexName` | property | <code>indexName: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vectorId` | property | <code>vectorId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vectorStoreId` | property | <code>vectorStoreId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryWritePolicySpec`

Memory Write Policy Spec interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { MemoryWritePolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedTypes` | property | <code>allowedTypes: ManagedMemoryType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `autoCaptureSources` | property | <code>autoCaptureSources?: ("human_review" &#124; "artifact" &#124; "system" &#124; "derived" &#124; "user_message" &#124; "assistant_message" &#124; "tool_result" &#124; "workflow_state" &#124; "import")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conflictDetection` | property | <code>conflictDetection?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deduplicateBeforeWrite` | property | <code>deduplicateBeforeWrite?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `immutableTypes` | property | <code>immutableTypes?: ManagedMemoryType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxContentBytes` | property | <code>maxContentBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `minConfidence` | property | <code>minConfidence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireHumanVerificationFor` | property | <code>requireHumanVerificationFor?: ManagedMemoryType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sensitiveDataMode` | property | <code>sensitiveDataMode?: "reject" &#124; "redact" &#124; "encrypt" &#124; "allow_by_policy"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `NormalizedMemoryError`

Normalized Memory Error interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { NormalizedMemoryError } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causeRef` | property | <code>causeRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>code: "MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; "MEMORY_PROVIDER_TI...</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `details` | property | <code>details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerCode` | property | <code>providerCode?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `VectorStoreCapabilities`

Vector Store Capabilities interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { VectorStoreCapabilities } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `batchUpsert` | property | <code>batchUpsert: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deleteByFilter` | property | <code>deleteByFilter: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `denseSearch` | property | <code>denseSearch: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fullTextFilter` | property | <code>fullTextFilter: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hybridSearch` | property | <code>hybridSearch: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `localDeployment` | property | <code>localDeployment: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadataFilter` | property | <code>metadataFilter: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `multiVector` | property | <code>multiVector: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `namespaces` | property | <code>namespaces: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payloadUpdate` | property | <code>payloadUpdate: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scoreThreshold` | property | <code>scoreThreshold: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sparseSearch` | property | <code>sparseSearch: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `VectorStoreSpec`

Vector Store Spec interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { VectorStoreSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: VectorStoreCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `collection` | property | <code>collection: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `connectionRef` | property | <code>connectionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dimensions` | property | <code>dimensions?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `distance` | property | <code>distance?: "cosine" &#124; "dot" &#124; "l2"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `indexType` | property | <code>indexType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `namespaceStrategy` | property | <code>namespaceStrategy?: "metadata_filter" &#124; "scope_hash" &#124; "collection_per_tenant"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "local" &#124; "custom" &#124; "pgvector" &#124; "qdrant" &#124; "milvus" &#124; "chroma" &#124; "pinecone"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `writeMode` | property | <code>writeMode?: "sync" &#124; "async_outbox" &#124; "dual_write"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkingMemoryStoreSpec`

Working Memory Store Spec interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { WorkingMemoryStoreSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `connectionRef` | property | <code>connectionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultTtlSeconds` | property | <code>defaultTtlSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `encryptionRef` | property | <code>encryptionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxItemBytes` | property | <code>maxItemBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `namespace` | property | <code>namespace?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serialization` | property | <code>serialization?: "json" &#124; "msgpack"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "custom" &#124; "redis" &#124; "in_memory"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManagedMemoryType`

Public type alias for Managed Memory Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ManagedMemoryType } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

```text
export type ManagedMemoryType = 'working' | 'episodic' | 'semantic' | 'procedural' | 'preference' | 'artifact' | 'governance' | 'reflection' | 'custom';
```

## `MemoryStatus`

Public type alias for Memory Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryStatus } from '@codesoul-co/hypha-memory';`
- Source module: [`contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/contracts.ts)

### Declaration

```text
export type MemoryStatus = 'pending' | 'active' | 'dormant' | 'superseded' | 'invalidated' | 'deletion_pending' | 'deleted' | 'failed';
```
