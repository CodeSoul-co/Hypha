# `@codesoul-co/hypha-memory` / `memory-projection-invalidation`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-projection-invalidation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMemoryMutationGenerationStore` | class | <code>new InMemoryMemoryMutationGenerationStore(): InMemoryMemoryMutationGenerationStore</code> | Runtime implementation for In Memory Memory Mutation Generation Store; see its public constructor and members below. |
| `MemoryProjectionInvalidationCoordinator` | class | <code>new MemoryProjectionInvalidationCoordinator(generations: MemoryMutationGenerationStore, targets: readonly MemoryProjectionInvalidationTarget[]): MemoryProjectionInvalidationCoordinator</code> | Runtime implementation for Memory Projection Invalidation Coordinator; see its public constructor and members below. |
| `MemorySearchCacheInvalidationTarget` | class | <code>new MemorySearchCacheInvalidationTarget(store: MemorySearchCacheStore, id?: string): MemorySearchCacheInvalidationTarget</code> | Runtime implementation for Memory Search Cache Invalidation Target; see its public constructor and members below. |
| `MemoryMutationGenerationStore` | interface | <code>interface MemoryMutationGenerationStore</code> | Field contract for Memory Mutation Generation Store; see all contract members below. |
| `MemoryProjectionInvalidationPort` | interface | <code>interface MemoryProjectionInvalidationPort</code> | Field contract for Memory Projection Invalidation Port; see all contract members below. |
| `MemoryProjectionInvalidationReceipt` | interface | <code>interface MemoryProjectionInvalidationReceipt</code> | Field contract for Memory Projection Invalidation Receipt; see all contract members below. |
| `MemoryProjectionInvalidationRequest` | interface | <code>interface MemoryProjectionInvalidationRequest</code> | Field contract for Memory Projection Invalidation Request; see all contract members below. |
| `MemoryProjectionInvalidationTarget` | interface | <code>interface MemoryProjectionInvalidationTarget</code> | Field contract for Memory Projection Invalidation Target; see all contract members below. |
| `MemoryProjectionInvalidationReason` | type | <code>type MemoryProjectionInvalidationReason = 'updated' &#124; 'deleted'</code> | Public type alias for Memory Projection Invalidation Reason. |

## `InMemoryMemoryMutationGenerationStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `advance` | method | <code>advance(scopeHash: string, operationId: string): Promise&lt;string&gt;</code> | Public runtime operation for advance. |
| `constructor` | constructor | <code>(): InMemoryMemoryMutationGenerationStore</code> | Creates an instance of this class. |
| `current` | method | <code>current(scopeHash: string): Promise&lt;string&gt;</code> | Public runtime operation for current. |

## `MemoryProjectionInvalidationCoordinator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(generations: MemoryMutationGenerationStore, targets: readonly MemoryProjectionInvalidationTarget[]): MemoryProjectionInvalidationCoordinator</code> | Creates an instance of this class. |
| `invalidate` | method | <code>invalidate(request: MemoryProjectionInvalidationRequest): Promise&lt;MemoryProjectionInvalidationReceipt&gt;</code> | Public runtime operation for invalidate. |

## `MemorySearchCacheInvalidationTarget` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(store: MemorySearchCacheStore, id?: string): MemorySearchCacheInvalidationTarget</code> | Creates an instance of this class. |
| `id` | property | <code>id: string</code> | Public id property. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | Public runtime operation for invalidate Scope. |

## `MemoryMutationGenerationStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `advance` | method | <code>advance(scopeHash: string, operationId: string): Promise&lt;string&gt;</code> | Public runtime operation for advance. |
| `current` | method | <code>current(scopeHash: string): Promise&lt;string&gt;</code> | Public runtime operation for current. |

## `MemoryProjectionInvalidationPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `invalidate` | method | <code>invalidate(request: MemoryProjectionInvalidationRequest): Promise&lt;MemoryProjectionInvalidationReceipt&gt;</code> | Public runtime operation for invalidate. |

## `MemoryProjectionInvalidationReceipt` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mutationGeneration` | property | <code>mutationGeneration: string</code> | Public mutation Generation property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `reason` | property | <code>reason: MemoryProjectionInvalidationReason</code> | Public reason property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `targets` | property | <code>targets: { id: string; invalidatedEntries: number; }[]</code> | Public targets property. |

## `MemoryProjectionInvalidationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryIds` | property | <code>memoryIds: string[]</code> | Public memory Ids property. |
| `memoryVersionIds` | property | <code>memoryVersionIds: string[]</code> | Public memory Version Ids property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `reason` | property | <code>reason: MemoryProjectionInvalidationReason</code> | Public reason property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |

## `MemoryProjectionInvalidationTarget` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string, mutationGeneration: string): Promise&lt;number&gt;</code> | Public runtime operation for invalidate Scope. |
