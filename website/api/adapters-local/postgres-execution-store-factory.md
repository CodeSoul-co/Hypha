# `@codesoul-co/hypha-adapters-local` / `postgres-execution-store-factory`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/postgres-execution-store-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/postgres-execution-store-factory.ts)
- Exports: **3**

## Using this module

Use the Postgres execution store factory module for persisting and reading data at this boundary. It exports 1 class, 1 constant, 1 type.

### Import from the package entrypoint

```ts
import {
  PostgresExecutionStoreFactory,
  POSTGRES_EXECUTION_STORE_ID,
} from '@codesoul-co/hypha-adapters-local';

import type {
  PostgresExecutionStoreFactoryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `PostgresExecutionStoreFactory` | class | <code>new PostgresExecutionStoreFactory(options: PostgresExecutionStoreFactoryOptions): PostgresExecutionStoreFactory</code> | Composition adapter for the accepted Postgres Execution Store. Registration remains explicit: callers add this factory to the Core ExecutionStoreRegistry. |
| `POSTGRES_EXECUTION_STORE_ID` | constant | <code>const POSTGRES_EXECUTION_STORE_ID: "execution-store.postgres"</code> | POSTGRES EXECUTION STORE ID constant exported by the `postgres-execution-store-factory` module. |
| `PostgresExecutionStoreFactoryOptions` | type | <code>type PostgresExecutionStoreFactoryOptions = PostgresExecutionStoreConnectionOptions</code> | Public type alias for Postgres Execution Store Factory Options; the declaration contains its complete type expression. |

## `PostgresExecutionStoreFactory`

Composition adapter for the accepted Postgres Execution Store. Registration remains explicit: callers add this factory to the Core ExecutionStoreRegistry.

- Kind: class
- Import: `import { PostgresExecutionStoreFactory } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`postgres-execution-store-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/postgres-execution-store-factory.ts)

### Declaration

```text
export declare class PostgresExecutionStoreFactory implements ExecutionStoreFactory {
    readonly storeId = "execution-store.postgres";
    constructor(options: PostgresExecutionStoreFactoryOptions);
    create(): Promise<ExecutionStore>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: PostgresExecutionStoreFactoryOptions): PostgresExecutionStoreFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(): Promise&lt;ExecutionStore&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `storeId` | property | <code>readonly storeId: "execution-store.postgres"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `POSTGRES_EXECUTION_STORE_ID`

POSTGRES EXECUTION STORE ID constant exported by the `postgres-execution-store-factory` module.

- Kind: constant
- Import: `import { POSTGRES_EXECUTION_STORE_ID } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`postgres-execution-store-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/postgres-execution-store-factory.ts)

### Declaration

```text
export declare const POSTGRES_EXECUTION_STORE_ID: "execution-store.postgres";
```

## `PostgresExecutionStoreFactoryOptions`

Public type alias for Postgres Execution Store Factory Options; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { PostgresExecutionStoreFactoryOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`postgres-execution-store-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/postgres-execution-store-factory.ts)

### Declaration

```text
export type PostgresExecutionStoreFactoryOptions = PostgresExecutionStoreConnectionOptions;
```
