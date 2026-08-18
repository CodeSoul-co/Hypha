# `@codesoul-co/hypha-memory` / `structured-memory-persistence`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/structured-memory-persistence.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-memory-persistence.ts)
- Exports: **4**

## Using this module

Use the Structured memory persistence module for persisting and reading data at this boundary. It exports 2 classes, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  StructuredMemoryIndexOutboxStore,
  StructuredMemoryPersistenceUnitOfWork,
} from '@codesoul-co/hypha-memory';

import type {
  StructuredMemoryIndexOutboxStoreOptions,
  StructuredMemoryPersistenceUnitOfWorkOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `StructuredMemoryIndexOutboxStore` | class | <code>new StructuredMemoryIndexOutboxStore(options: StructuredMemoryIndexOutboxStoreOptions): StructuredMemoryIndexOutboxStore</code> | Structured Memory Index Outbox Store class with 8 public constructor or member entries; its exact declarations are listed below. |
| `StructuredMemoryPersistenceUnitOfWork` | class | <code>new StructuredMemoryPersistenceUnitOfWork(options: StructuredMemoryPersistenceUnitOfWorkOptions): StructuredMemoryPersistenceUnitOfWork</code> | Structured Memory Persistence Unit Of Work class with 5 public constructor or member entries; its exact declarations are listed below. |
| `StructuredMemoryIndexOutboxStoreOptions` | interface | <code>interface StructuredMemoryIndexOutboxStoreOptions</code> | Structured Memory Index Outbox Store Options interface with 3 public fields or methods. |
| `StructuredMemoryPersistenceUnitOfWorkOptions` | interface | <code>interface StructuredMemoryPersistenceUnitOfWorkOptions</code> | Structured Memory Persistence Unit Of Work Options interface with 4 public fields or methods. |

## `StructuredMemoryIndexOutboxStore`

Structured Memory Index Outbox Store class with 8 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { StructuredMemoryIndexOutboxStore } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-memory-persistence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-memory-persistence.ts)

### Declaration

```text
export declare class StructuredMemoryIndexOutboxStore implements MemoryIndexOutboxStore {
    constructor(options: StructuredMemoryIndexOutboxStoreOptions);
    enqueue(record: MemoryIndexOutboxRecord): Promise<void>;
    lease(owner: string, now: string, leaseUntil: string, limit: number): Promise<MemoryIndexOutboxRecord[]>;
    renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise<boolean>;
    complete(id: string, owner: string, leaseToken: string, now: string): Promise<boolean>;
    fail(id: string, owner: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise<boolean>;
    list(): Promise<MemoryIndexOutboxRecord[]>;
    transaction<T>(fn: (store: MemoryIndexOutboxStore) => Promise<T>): Promise<T>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(id: string, owner: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: StructuredMemoryIndexOutboxStoreOptions): StructuredMemoryIndexOutboxStore</code> | Creates an instance of this class. |
| `enqueue` | method | <code>enqueue(record: MemoryIndexOutboxRecord): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fail` | method | <code>fail(id: string, owner: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `lease` | method | <code>lease(owner: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (store: MemoryIndexOutboxStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `StructuredMemoryPersistenceUnitOfWork`

Structured Memory Persistence Unit Of Work class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { StructuredMemoryPersistenceUnitOfWork } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-memory-persistence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-memory-persistence.ts)

### Declaration

```text
export declare class StructuredMemoryPersistenceUnitOfWork implements MemoryPersistenceUnitOfWork {
    readonly capabilities: MemoryPersistenceCapabilities;
    readonly recordStore: StructuredManagedMemoryRecordStore;
    readonly outboxStore: StructuredMemoryIndexOutboxStore;
    constructor(options: StructuredMemoryPersistenceUnitOfWorkOptions);
    transaction<T>(fn: (stores: MemoryPersistenceTransaction) => Promise<T>): Promise<T>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>readonly capabilities: MemoryPersistenceCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(options: StructuredMemoryPersistenceUnitOfWorkOptions): StructuredMemoryPersistenceUnitOfWork</code> | Creates an instance of this class. |
| `outboxStore` | property | <code>readonly outboxStore: StructuredMemoryIndexOutboxStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordStore` | property | <code>readonly recordStore: StructuredManagedMemoryRecordStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (stores: MemoryPersistenceTransaction) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `StructuredMemoryIndexOutboxStoreOptions`

Structured Memory Index Outbox Store Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { StructuredMemoryIndexOutboxStoreOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-memory-persistence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-memory-persistence.ts)

### Declaration

```text
export interface StructuredMemoryIndexOutboxStoreOptions {
    provider: StructuredStoreProvider;
    table?: string;
    inTransaction?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `inTransaction` | property | <code>inTransaction?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: StructuredStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `table` | property | <code>table?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StructuredMemoryPersistenceUnitOfWorkOptions`

Structured Memory Persistence Unit Of Work Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { StructuredMemoryPersistenceUnitOfWorkOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`structured-memory-persistence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-memory-persistence.ts)

### Declaration

```text
export interface StructuredMemoryPersistenceUnitOfWorkOptions {
    provider: StructuredStoreProvider;
    currentTable?: string;
    versionsTable?: string;
    outboxTable?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `currentTable` | property | <code>currentTable?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outboxTable` | property | <code>outboxTable?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: StructuredStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionsTable` | property | <code>versionsTable?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
