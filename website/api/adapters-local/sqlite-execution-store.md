# `@codesoul-co/hypha-adapters-local` / `sqlite-execution-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/sqlite-execution-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store.ts)
- Exports: **3**

## Using this module

Use the Sqlite execution store module for persisting and reading data at this boundary. It exports 1 class, 2 types.

### Import from the package entrypoint

```ts
import {
  SQLiteExecutionStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteExecutionStoreErrorCode,
  SQLiteExecutionStoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteExecutionStore` | class | <code>new SQLiteExecutionStore(options: SQLiteExecutionStoreFoundationOptions): SQLiteExecutionStore</code> | Public durable local ExecutionStore adapter. Every persisted read is validated by the foundation before it crosses the provider boundary. CAS, idempotency, lease, fencing, migration, and close semantics are therefore exposed through the stable Core ExecutionStore port. |
| `SQLiteExecutionStoreErrorCode` | type | <code>type SQLiteExecutionStoreErrorCode = SQLiteExecutionStoreFoundationErrorCode</code> | Public type alias for SQLite Execution Store Error Code; the declaration contains its complete type expression. |
| `SQLiteExecutionStoreOptions` | type | <code>type SQLiteExecutionStoreOptions = SQLiteExecutionStoreFoundationOptions</code> | Public type alias for SQLite Execution Store Options; the declaration contains its complete type expression. |

## `SQLiteExecutionStore`

Public durable local ExecutionStore adapter. Every persisted read is validated by the foundation before it crosses the provider boundary. CAS, idempotency, lease, fencing, migration, and close semantics are therefore exposed through the stable Core ExecutionStore port.

- Kind: class
- Import: `import { SQLiteExecutionStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`sqlite-execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store.ts)

### Declaration

```text
export declare class SQLiteExecutionStore extends SQLiteExecutionStoreFoundation implements ExecutionStore {
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquireLease` | method | <code>acquireLease(input: ExecutionLeaseAcquireRequest): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `compareAndSet` | method | <code>compareAndSet(input: ExecutionRecordCompareAndSetRequest): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: SQLiteExecutionStoreFoundationOptions): SQLiteExecutionStore</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: ExecutionRecordCreateRequest): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `filename` | property | <code>readonly filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `get` | method | <code>get(executionId: string): Promise&lt;ExecutionRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(input?: ExecutionRecordQuery): Promise&lt;ExecutionRecordPage&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `releaseLease` | method | <code>releaseLease(input: ExecutionLeaseReleaseRequest): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renewLease` | method | <code>renewLease(input: ExecutionLeaseRenewRequest): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `resolveIdempotency` | method | <code>resolveIdempotency(input: ExecutionIdempotencyQuery): Promise&lt;ExecutionIdempotencyResolution&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `static schemaVersion` | property | <code>static readonly schemaVersion: 7</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SQLiteExecutionStoreErrorCode`

Public type alias for SQLite Execution Store Error Code; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { SQLiteExecutionStoreErrorCode } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`sqlite-execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store.ts)

### Declaration

```text
export type SQLiteExecutionStoreErrorCode = SQLiteExecutionStoreFoundationErrorCode;
```

## `SQLiteExecutionStoreOptions`

Public type alias for SQLite Execution Store Options; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { SQLiteExecutionStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`sqlite-execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store.ts)

### Declaration

```text
export type SQLiteExecutionStoreOptions = SQLiteExecutionStoreFoundationOptions;
```
