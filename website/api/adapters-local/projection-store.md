# `@codesoul-co/hypha-adapters-local` / `projection-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/projection-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/projection-store.ts)
- Exports: **2**

## Using this module

Use the Projection store module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  SQLiteProjectionStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteProjectionStoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteProjectionStore` | class | <code>new SQLiteProjectionStore&lt;TState = unknown&gt;(options: SQLiteProjectionStoreOptions): SQLiteProjectionStore&lt;TState&gt;</code> | SQLite Projection Store class with 5 public constructor or member entries; its exact declarations are listed below. |
| `SQLiteProjectionStoreOptions` | interface | <code>interface SQLiteProjectionStoreOptions</code> | SQLite Projection Store Options interface with 2 public fields or methods. |

## `SQLiteProjectionStore`

SQLite Projection Store class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SQLiteProjectionStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`projection-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/projection-store.ts)

### Declaration

```text
export declare class SQLiteProjectionStore<TState = unknown> implements ProjectionStore<TState> {
    constructor(options: SQLiteProjectionStoreOptions);
    get(projectionId: string, key: string): Promise<ProjectionRecord<TState> | null>;
    put(record: ProjectionRecord<TState>, expectedRevision?: number): Promise<void>;
    delete(projectionId: string, key: string): Promise<void>;
    close(): void;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): void</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>&lt;TState = unknown&gt;(options: SQLiteProjectionStoreOptions): SQLiteProjectionStore&lt;TState&gt;</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(projectionId: string, key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(projectionId: string, key: string): Promise&lt;ProjectionRecord&lt;TState&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(record: ProjectionRecord&lt;TState&gt;, expectedRevision?: number): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SQLiteProjectionStoreOptions`

SQLite Projection Store Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { SQLiteProjectionStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`projection-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/projection-store.ts)

### Declaration

```text
export interface SQLiteProjectionStoreOptions {
    filename: string;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
