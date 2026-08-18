# `@codesoul-co/hypha-memory` / `memory-projection-invalidation`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-projection-invalidation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)
- Exports: **9**

## Using this module

Use the Memory projection invalidation module for using the public contracts and operations for this capability boundary. It exports 3 classes, 5 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  InMemoryMemoryMutationGenerationStore,
  MemoryProjectionInvalidationCoordinator,
  MemorySearchCacheInvalidationTarget,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryMutationGenerationStore,
  MemoryProjectionInvalidationPort,
  MemoryProjectionInvalidationReceipt,
  MemoryProjectionInvalidationRequest,
  MemoryProjectionInvalidationTarget,
  MemoryProjectionInvalidationReason,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMemoryMutationGenerationStore` | class | <code>new InMemoryMemoryMutationGenerationStore(): InMemoryMemoryMutationGenerationStore</code> | In Memory Memory Mutation Generation Store class with 3 public constructor or member entries; its exact declarations are listed below. |
| `MemoryProjectionInvalidationCoordinator` | class | <code>new MemoryProjectionInvalidationCoordinator(generations: MemoryMutationGenerationStore, targets: readonly MemoryProjectionInvalidationTarget[]): MemoryProjectionInvalidationCoordinator</code> | Memory Projection Invalidation Coordinator class with 2 public constructor or member entries; its exact declarations are listed below. |
| `MemorySearchCacheInvalidationTarget` | class | <code>new MemorySearchCacheInvalidationTarget(store: MemorySearchCacheStore, id?: string): MemorySearchCacheInvalidationTarget</code> | Memory Search Cache Invalidation Target class with 3 public constructor or member entries; its exact declarations are listed below. |
| `MemoryMutationGenerationStore` | interface | <code>interface MemoryMutationGenerationStore</code> | Memory Mutation Generation Store interface with 2 public fields or methods. |
| `MemoryProjectionInvalidationPort` | interface | <code>interface MemoryProjectionInvalidationPort</code> | Memory Projection Invalidation Port interface with 1 public fields or methods. |
| `MemoryProjectionInvalidationReceipt` | interface | <code>interface MemoryProjectionInvalidationReceipt</code> | Memory Projection Invalidation Receipt interface with 5 public fields or methods. |
| `MemoryProjectionInvalidationRequest` | interface | <code>interface MemoryProjectionInvalidationRequest</code> | Memory Projection Invalidation Request interface with 5 public fields or methods. |
| `MemoryProjectionInvalidationTarget` | interface | <code>interface MemoryProjectionInvalidationTarget</code> | Memory Projection Invalidation Target interface with 2 public fields or methods. |
| `MemoryProjectionInvalidationReason` | type | <code>type MemoryProjectionInvalidationReason = 'updated' &#124; 'deleted'</code> | Public type alias for Memory Projection Invalidation Reason; the declaration contains its complete type expression. |

## `InMemoryMemoryMutationGenerationStore`

In Memory Memory Mutation Generation Store class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryMemoryMutationGenerationStore } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### Declaration

```text
export declare class InMemoryMemoryMutationGenerationStore implements MemoryMutationGenerationStore {
    current(scopeHash: string): Promise<string>;
    advance(scopeHash: string, operationId: string): Promise<string>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `advance` | method | <code>advance(scopeHash: string, operationId: string): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): InMemoryMemoryMutationGenerationStore</code> | Creates an instance of this class. |
| `current` | method | <code>current(scopeHash: string): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryProjectionInvalidationCoordinator`

Memory Projection Invalidation Coordinator class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryProjectionInvalidationCoordinator } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### Declaration

```text
export declare class MemoryProjectionInvalidationCoordinator implements MemoryProjectionInvalidationPort {
    constructor(generations: MemoryMutationGenerationStore, targets: readonly MemoryProjectionInvalidationTarget[]);
    invalidate(request: MemoryProjectionInvalidationRequest): Promise<MemoryProjectionInvalidationReceipt>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(generations: MemoryMutationGenerationStore, targets: readonly MemoryProjectionInvalidationTarget[]): MemoryProjectionInvalidationCoordinator</code> | Creates an instance of this class. |
| `invalidate` | method | <code>invalidate(request: MemoryProjectionInvalidationRequest): Promise&lt;MemoryProjectionInvalidationReceipt&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemorySearchCacheInvalidationTarget`

Memory Search Cache Invalidation Target class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemorySearchCacheInvalidationTarget } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### Declaration

```text
export declare class MemorySearchCacheInvalidationTarget implements MemoryProjectionInvalidationTarget {
    readonly id: string;
    constructor(store: MemorySearchCacheStore, id?: string);
    invalidateScope(scopeHash: string): Promise<number>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(store: MemorySearchCacheStore, id?: string): MemorySearchCacheInvalidationTarget</code> | Creates an instance of this class. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryMutationGenerationStore`

Memory Mutation Generation Store interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryMutationGenerationStore } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### Declaration

```text
export interface MemoryMutationGenerationStore {
    current(scopeHash: string): Promise<string>;
    advance(scopeHash: string, operationId: string): Promise<string>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `advance` | method | <code>advance(scopeHash: string, operationId: string): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `current` | method | <code>current(scopeHash: string): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryProjectionInvalidationPort`

Memory Projection Invalidation Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProjectionInvalidationPort } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### Declaration

```text
export interface MemoryProjectionInvalidationPort {
    invalidate(request: MemoryProjectionInvalidationRequest): Promise<MemoryProjectionInvalidationReceipt>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `invalidate` | method | <code>invalidate(request: MemoryProjectionInvalidationRequest): Promise&lt;MemoryProjectionInvalidationReceipt&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryProjectionInvalidationReceipt`

Memory Projection Invalidation Receipt interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProjectionInvalidationReceipt } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### Declaration

```text
export interface MemoryProjectionInvalidationReceipt {
    operationId: string;
    scopeHash: string;
    mutationGeneration: string;
    reason: MemoryProjectionInvalidationReason;
    targets: Array<{
        id: string;
        invalidatedEntries: number;
    }>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mutationGeneration` | property | <code>mutationGeneration: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: MemoryProjectionInvalidationReason</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targets` | property | <code>targets: { id: string; invalidatedEntries: number; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProjectionInvalidationRequest`

Memory Projection Invalidation Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProjectionInvalidationRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### Declaration

```text
export interface MemoryProjectionInvalidationRequest {
    operationId: string;
    scope: ManagedMemoryScope;
    reason: MemoryProjectionInvalidationReason;
    memoryIds: string[];
    memoryVersionIds?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryIds` | property | <code>memoryIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryVersionIds` | property | <code>memoryVersionIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: MemoryProjectionInvalidationReason</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProjectionInvalidationTarget`

Memory Projection Invalidation Target interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProjectionInvalidationTarget } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### Declaration

```text
export interface MemoryProjectionInvalidationTarget {
    readonly id: string;
    invalidateScope(scopeHash: string, mutationGeneration: string): Promise<number>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string, mutationGeneration: string): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryProjectionInvalidationReason`

Public type alias for Memory Projection Invalidation Reason; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryProjectionInvalidationReason } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-projection-invalidation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-projection-invalidation.ts)

### Declaration

```text
export type MemoryProjectionInvalidationReason = 'updated' | 'deleted';
```
