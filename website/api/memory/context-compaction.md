# `@codesoul-co/hypha-memory` / `context-compaction`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/context-compaction.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-compaction.ts)
- Exports: **3**

## Using this module

Use the Context compaction module for using the public contracts and operations for this capability boundary. It exports 1 class, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  DeterministicExtractiveContextCompactor,
} from '@codesoul-co/hypha-memory';

import type {
  ContextCompactionRequest,
  ContextCompactor,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DeterministicExtractiveContextCompactor` | class | <code>new DeterministicExtractiveContextCompactor(): DeterministicExtractiveContextCompactor</code> | Deterministic Extractive Context Compactor class with 3 public constructor or member entries; its exact declarations are listed below. |
| `ContextCompactionRequest` | interface | <code>interface ContextCompactionRequest</code> | Context Compaction Request interface with 4 public fields or methods. |
| `ContextCompactor` | interface | <code>interface ContextCompactor</code> | Context Compactor interface with 2 public fields or methods. |

## `DeterministicExtractiveContextCompactor`

Deterministic Extractive Context Compactor class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DeterministicExtractiveContextCompactor } from '@codesoul-co/hypha-memory';`
- Source module: [`context-compaction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-compaction.ts)

### Declaration

```text
export declare class DeterministicExtractiveContextCompactor implements ContextCompactor {
    readonly id = "context.compactor.extractive-v1";
    compact(request: ContextCompactionRequest): Promise<ContextItem | null>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compact` | method | <code>compact(request: ContextCompactionRequest): Promise&lt;ContextItem &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): DeterministicExtractiveContextCompactor</code> | Creates an instance of this class. |
| `id` | property | <code>readonly id: "context.compactor.extractive-v1"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextCompactionRequest`

Context Compaction Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ContextCompactionRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`context-compaction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-compaction.ts)

### Declaration

```text
export interface ContextCompactionRequest {
    items: ContextItem[];
    maxTokens: number;
    tokenizer: TokenEstimator;
    sourceId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `items` | property | <code>items: ContextItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTokens` | property | <code>maxTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceId` | property | <code>sourceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenizer` | property | <code>tokenizer: TokenEstimator</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextCompactor`

Context Compactor interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ContextCompactor } from '@codesoul-co/hypha-memory';`
- Source module: [`context-compaction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-compaction.ts)

### Declaration

```text
export interface ContextCompactor {
    readonly id: string;
    compact(request: ContextCompactionRequest): Promise<ContextItem | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compact` | method | <code>compact(request: ContextCompactionRequest): Promise&lt;ContextItem &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
