# `@codesoul-co/hypha-memory` / `structured-idempotency-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/structured-idempotency-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-idempotency-store.ts)
- Exports: **2**

## Using this module

Use the Structured idempotency store module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  StructuredMemoryIdempotencyStore,
} from '@codesoul-co/hypha-memory';

import type {
  StructuredMemoryIdempotencyStoreOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `StructuredMemoryIdempotencyStore` | class | <code>new StructuredMemoryIdempotencyStore(options: StructuredMemoryIdempotencyStoreOptions): StructuredMemoryIdempotencyStore</code> | Durable idempotency results used to reconcile retries after process restart. |
| `StructuredMemoryIdempotencyStoreOptions` | interface | <code>interface StructuredMemoryIdempotencyStoreOptions</code> | Structured Memory Idempotency Store Options interface with 2 public fields or methods. |

## `StructuredMemoryIdempotencyStore`

Durable idempotency results used to reconcile retries after process restart.

- Kind: class
- Import: `import { StructuredMemoryIdempotencyStore } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-idempotency-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-idempotency-store.ts)

### Declaration

```text
export declare class StructuredMemoryIdempotencyStore implements MemoryIdempotencyStore {
    constructor(options: StructuredMemoryIdempotencyStoreOptions);
    get(scopeHash: string, key: string): Promise<unknown | null>;
    set(scopeHash: string, key: string, result: unknown): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: StructuredMemoryIdempotencyStoreOptions): StructuredMemoryIdempotencyStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scopeHash: string, key: string): Promise&lt;unknown &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(scopeHash: string, key: string, result: unknown): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `StructuredMemoryIdempotencyStoreOptions`

Structured Memory Idempotency Store Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { StructuredMemoryIdempotencyStoreOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-idempotency-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-idempotency-store.ts)

### Declaration

```text
export interface StructuredMemoryIdempotencyStoreOptions {
    store: StructuredStoreProvider;
    table?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `store` | property | <code>store: StructuredStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `table` | property | <code>table?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
