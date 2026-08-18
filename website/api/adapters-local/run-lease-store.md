# `@codesoul-co/hypha-adapters-local` / `run-lease-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/run-lease-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/run-lease-store.ts)
- Exports: **2**

## Using this module

Use the Run lease store module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  SQLiteRunLeaseStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteRunLeaseStoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteRunLeaseStore` | class | <code>new SQLiteRunLeaseStore(options: SQLiteRunLeaseStoreOptions): SQLiteRunLeaseStore</code> | SQLite Run Lease Store class with 8 public constructor or member entries; its exact declarations are listed below. |
| `SQLiteRunLeaseStoreOptions` | interface | <code>interface SQLiteRunLeaseStoreOptions</code> | SQLite Run Lease Store Options interface with 2 public fields or methods. |

## `SQLiteRunLeaseStore`

SQLite Run Lease Store class with 8 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SQLiteRunLeaseStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`run-lease-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/run-lease-store.ts)

### Declaration

```text
export declare class SQLiteRunLeaseStore implements RunLeaseStore {
    constructor(options: SQLiteRunLeaseStoreOptions);
    acquire(request: RunLeaseAcquireRequest): Promise<FencedRunLease | null>;
    preempt(request: RunLeasePreemptRequest): Promise<FencedRunLease>;
    heartbeat(request: RunLeaseHeartbeatRequest): Promise<FencedRunLease>;
    release(request: RunLeaseReleaseRequest): Promise<void>;
    get(scope: RunLeaseScope, checkedAt?: string): Promise<FencedRunLease | null>;
    assertCurrent(request: RunLeaseAssertionRequest): Promise<FencedRunLease>;
    close(): void;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: RunLeaseAcquireRequest): Promise&lt;FencedRunLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertCurrent` | method | <code>assertCurrent(request: RunLeaseAssertionRequest): Promise&lt;FencedRunLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): void</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: SQLiteRunLeaseStoreOptions): SQLiteRunLeaseStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scope: RunLeaseScope, checkedAt?: string): Promise&lt;FencedRunLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `heartbeat` | method | <code>heartbeat(request: RunLeaseHeartbeatRequest): Promise&lt;FencedRunLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `preempt` | method | <code>preempt(request: RunLeasePreemptRequest): Promise&lt;FencedRunLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `release` | method | <code>release(request: RunLeaseReleaseRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SQLiteRunLeaseStoreOptions`

SQLite Run Lease Store Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { SQLiteRunLeaseStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`run-lease-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/run-lease-store.ts)

### Declaration

```text
export interface SQLiteRunLeaseStoreOptions {
    filename: string;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
