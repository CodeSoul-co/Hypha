# `@codesoul-co/hypha-adapters-local` / `state-execution-claim-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/state-execution-claim-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/state-execution-claim-store.ts)
- Exports: **2**

## Using this module

Use the State execution claim store module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  SQLiteStateExecutionClaimStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteStateExecutionClaimStoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteStateExecutionClaimStore` | class | <code>new SQLiteStateExecutionClaimStore(options: SQLiteStateExecutionClaimStoreOptions): SQLiteStateExecutionClaimStore</code> | SQLite State Execution Claim Store class with 8 public constructor or member entries; its exact declarations are listed below. |
| `SQLiteStateExecutionClaimStoreOptions` | interface | <code>interface SQLiteStateExecutionClaimStoreOptions</code> | SQLite State Execution Claim Store Options interface with 3 public fields or methods. |

## `SQLiteStateExecutionClaimStore`

SQLite State Execution Claim Store class with 8 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SQLiteStateExecutionClaimStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`state-execution-claim-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/state-execution-claim-store.ts)

### Declaration

```text
export declare class SQLiteStateExecutionClaimStore implements StateExecutionClaimStore {
    constructor(options: SQLiteStateExecutionClaimStoreOptions);
    acquire(request: StateExecutionClaimAcquireRequest): Promise<StateExecutionClaim | null>;
    renew(request: StateExecutionClaimRenewRequest): Promise<StateExecutionClaim>;
    complete(request: StateExecutionClaimCompleteRequest): Promise<StateExecutionClaim>;
    release(request: StateExecutionClaimReleaseRequest): Promise<StateExecutionClaim>;
    get(scope: StateExecutionClaimScope, checkedAt?: string): Promise<StateExecutionClaim | null>;
    assertCurrent(request: StateExecutionClaimAssertionRequest): Promise<StateExecutionClaim>;
    close(): void;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: StateExecutionClaimAcquireRequest): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertCurrent` | method | <code>assertCurrent(request: StateExecutionClaimAssertionRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): void</code> | Public method; parameters and return type are shown in the signature. |
| `complete` | method | <code>complete(request: StateExecutionClaimCompleteRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: SQLiteStateExecutionClaimStoreOptions): SQLiteStateExecutionClaimStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scope: StateExecutionClaimScope, checkedAt?: string): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `release` | method | <code>release(request: StateExecutionClaimReleaseRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(request: StateExecutionClaimRenewRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SQLiteStateExecutionClaimStoreOptions`

SQLite State Execution Claim Store Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SQLiteStateExecutionClaimStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`state-execution-claim-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/state-execution-claim-store.ts)

### Declaration

```text
export interface SQLiteStateExecutionClaimStoreOptions {
    filename: string;
    runLeaseStore: Pick<RunLeaseStore, 'assertCurrent'>;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `runLeaseStore` | property | <code>runLeaseStore: Pick&lt;RunLeaseStore, "assertCurrent"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
