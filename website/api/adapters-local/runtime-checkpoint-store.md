# `@codesoul-co/hypha-adapters-local` / `runtime-checkpoint-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/runtime-checkpoint-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-checkpoint-store.ts)
- Exports: **2**

## Using this module

Use the Runtime checkpoint store module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  SQLiteRuntimeCheckpointStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteRuntimeCheckpointStoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteRuntimeCheckpointStore` | class | <code>new SQLiteRuntimeCheckpointStore(options: SQLiteRuntimeCheckpointStoreOptions): SQLiteRuntimeCheckpointStore</code> | SQLite Runtime Checkpoint Store class with 6 public constructor or member entries; its exact declarations are listed below. |
| `SQLiteRuntimeCheckpointStoreOptions` | interface | <code>interface SQLiteRuntimeCheckpointStoreOptions</code> | SQLite Runtime Checkpoint Store Options interface with 2 public fields or methods. |

## `SQLiteRuntimeCheckpointStore`

SQLite Runtime Checkpoint Store class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SQLiteRuntimeCheckpointStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`runtime-checkpoint-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-checkpoint-store.ts)

### Declaration

```text
export declare class SQLiteRuntimeCheckpointStore implements RuntimeCheckpointStore {
    constructor(options: SQLiteRuntimeCheckpointStoreOptions);
    put(input: RuntimeCheckpointRecord, idempotencyKey: string): Promise<RuntimeCheckpointPutResult>;
    get(scope: RuntimeScope, checkpointId: string): Promise<RuntimeCheckpointRecord | null>;
    latest(scope: RuntimeScope): Promise<RuntimeCheckpointRecord | null>;
    list(scope: RuntimeScope, limit?: number): Promise<RuntimeCheckpointRecord[]>;
    close(): void;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): void</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: SQLiteRuntimeCheckpointStoreOptions): SQLiteRuntimeCheckpointStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scope: RuntimeScope, checkpointId: string): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `latest` | method | <code>latest(scope: RuntimeScope): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(scope: RuntimeScope, limit?: number): Promise&lt;RuntimeCheckpointRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(input: RuntimeCheckpointRecord, idempotencyKey: string): Promise&lt;RuntimeCheckpointPutResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SQLiteRuntimeCheckpointStoreOptions`

SQLite Runtime Checkpoint Store Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { SQLiteRuntimeCheckpointStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`runtime-checkpoint-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-checkpoint-store.ts)

### Declaration

```text
export interface SQLiteRuntimeCheckpointStoreOptions {
    filename: string;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
