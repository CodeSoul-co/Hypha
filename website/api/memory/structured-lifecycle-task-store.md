# `@codesoul-co/hypha-memory` / `structured-lifecycle-task-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/structured-lifecycle-task-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-lifecycle-task-store.ts)
- Exports: **2**

## Using this module

Use the Structured lifecycle task store module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  StructuredMemoryLifecycleTaskStore,
} from '@codesoul-co/hypha-memory';

import type {
  StructuredMemoryLifecycleTaskStoreOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `StructuredMemoryLifecycleTaskStore` | class | <code>new StructuredMemoryLifecycleTaskStore(options: StructuredMemoryLifecycleTaskStoreOptions): StructuredMemoryLifecycleTaskStore</code> | Structured Memory Lifecycle Task Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `StructuredMemoryLifecycleTaskStoreOptions` | interface | <code>interface StructuredMemoryLifecycleTaskStoreOptions</code> | Structured Memory Lifecycle Task Store Options interface with 2 public fields or methods. |

## `StructuredMemoryLifecycleTaskStore`

Structured Memory Lifecycle Task Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { StructuredMemoryLifecycleTaskStore } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-lifecycle-task-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-lifecycle-task-store.ts)

### Declaration

```text
export declare class StructuredMemoryLifecycleTaskStore implements MemoryLifecycleTaskStore {
    constructor(options: StructuredMemoryLifecycleTaskStoreOptions);
    enqueue(task: MemoryLifecycleTask): Promise<void>;
    lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise<MemoryLifecycleTask[]>;
    renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise<boolean>;
    complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise<boolean>;
    fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise<boolean>;
    list(type?: MemoryLifecycleWorkerType): Promise<MemoryLifecycleTask[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: StructuredMemoryLifecycleTaskStoreOptions): StructuredMemoryLifecycleTaskStore</code> | Creates an instance of this class. |
| `enqueue` | method | <code>enqueue(task: MemoryLifecycleTask): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fail` | method | <code>fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `lease` | method | <code>lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryLifecycleTask[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(type?: MemoryLifecycleWorkerType): Promise&lt;MemoryLifecycleTask[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `StructuredMemoryLifecycleTaskStoreOptions`

Structured Memory Lifecycle Task Store Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { StructuredMemoryLifecycleTaskStoreOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-lifecycle-task-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-lifecycle-task-store.ts)

### Declaration

```text
export interface StructuredMemoryLifecycleTaskStoreOptions {
    store: StructuredStoreProvider;
    table?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `store` | property | <code>store: StructuredStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `table` | property | <code>table?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
