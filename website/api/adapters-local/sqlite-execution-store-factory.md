# `@codesoul-co/hypha-adapters-local` / `sqlite-execution-store-factory`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/sqlite-execution-store-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store-factory.ts)
- Exports: **2**

## Using this module

Use the Sqlite execution store factory module for persisting and reading data at this boundary. It exports 1 class, 1 constant.

### Import from the package entrypoint

```ts
import {
  SQLiteExecutionStoreFactory,
  SQLITE_EXECUTION_STORE_ID,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteExecutionStoreFactory` | class | <code>new SQLiteExecutionStoreFactory(options: SQLiteExecutionStoreOptions): SQLiteExecutionStoreFactory</code> | SQLite Execution Store Factory class with 3 public constructor or member entries; its exact declarations are listed below. |
| `SQLITE_EXECUTION_STORE_ID` | constant | <code>const SQLITE_EXECUTION_STORE_ID: "execution-store.sqlite"</code> | SQLITE EXECUTION STORE ID constant exported by the `sqlite-execution-store-factory` module. |

## `SQLiteExecutionStoreFactory`

SQLite Execution Store Factory class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SQLiteExecutionStoreFactory } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`sqlite-execution-store-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store-factory.ts)

### Declaration

```text
export declare class SQLiteExecutionStoreFactory implements ExecutionStoreFactory {
    readonly storeId = "execution-store.sqlite";
    constructor(options: SQLiteExecutionStoreOptions);
    create(): Promise<ExecutionStore>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: SQLiteExecutionStoreOptions): SQLiteExecutionStoreFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(): Promise&lt;ExecutionStore&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `storeId` | property | <code>readonly storeId: "execution-store.sqlite"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SQLITE_EXECUTION_STORE_ID`

SQLITE EXECUTION STORE ID constant exported by the `sqlite-execution-store-factory` module.

- Kind: constant
- Import: `import { SQLITE_EXECUTION_STORE_ID } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`sqlite-execution-store-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store-factory.ts)

### Declaration

```text
export declare const SQLITE_EXECUTION_STORE_ID: "execution-store.sqlite";
```
