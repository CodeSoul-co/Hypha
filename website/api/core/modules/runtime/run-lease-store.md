# `@codesoul-co/hypha-core` / `modules/runtime/run-lease-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/run-lease-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-lease-store.ts)
- Exports: **4**

## Using this module

Use the Run lease store module for persisting and reading data at this boundary. It exports 1 class, 2 functions, 1 interface.

### Import from the package entrypoint

```ts
import {
  InMemoryRunLeaseStore,
  runLeaseGuard,
  runLeaseScopeKey,
} from '@codesoul-co/hypha-core';

import type {
  InMemoryRunLeaseStoreOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryRunLeaseStore` | class | <code>new InMemoryRunLeaseStore(options?: InMemoryRunLeaseStoreOptions): InMemoryRunLeaseStore</code> | In Memory Run Lease Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `runLeaseGuard` | function | <code>runLeaseGuard(lease: FencedRunLease): { leaseId: string; ownerId: string; fencingToken: number; }</code> | Run Lease Guard function with 1 public call signature; parameters and return types are listed below. |
| `runLeaseScopeKey` | function | <code>runLeaseScopeKey(scope: RunLeaseScope): string</code> | Run Lease Scope Key function with 1 public call signature; parameters and return types are listed below. |
| `InMemoryRunLeaseStoreOptions` | interface | <code>interface InMemoryRunLeaseStoreOptions</code> | In Memory Run Lease Store Options interface with 1 public fields or methods. |

## `InMemoryRunLeaseStore`

In Memory Run Lease Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryRunLeaseStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/run-lease-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-lease-store.ts)

### Declaration

```text
export declare class InMemoryRunLeaseStore implements RunLeaseStore {
    constructor(options?: InMemoryRunLeaseStoreOptions);
    acquire(request: RunLeaseAcquireRequest): Promise<FencedRunLease | null>;
    preempt(request: RunLeasePreemptRequest): Promise<FencedRunLease>;
    heartbeat(request: RunLeaseHeartbeatRequest): Promise<FencedRunLease>;
    release(request: RunLeaseReleaseRequest): Promise<void>;
    get(scope: RunLeaseScope, checkedAt?: string): Promise<FencedRunLease | null>;
    assertCurrent(request: RunLeaseAssertionRequest): Promise<FencedRunLease>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: RunLeaseAcquireRequest): Promise&lt;FencedRunLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertCurrent` | method | <code>assertCurrent(request: RunLeaseAssertionRequest): Promise&lt;FencedRunLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: InMemoryRunLeaseStoreOptions): InMemoryRunLeaseStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scope: RunLeaseScope, checkedAt?: string): Promise&lt;FencedRunLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `heartbeat` | method | <code>heartbeat(request: RunLeaseHeartbeatRequest): Promise&lt;FencedRunLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `preempt` | method | <code>preempt(request: RunLeasePreemptRequest): Promise&lt;FencedRunLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `release` | method | <code>release(request: RunLeaseReleaseRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `runLeaseGuard`

Run Lease Guard function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runLeaseGuard } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/run-lease-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-lease-store.ts)

### Declaration

```text
export declare function runLeaseGuard(lease: FencedRunLease): {
    leaseId: string;
    ownerId: string;
    fencingToken: number;
};
```

### Call signature

```text
runLeaseGuard(lease: FencedRunLease): { leaseId: string; ownerId: string; fencingToken: number; }
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `lease` | <code>FencedRunLease</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `{ leaseId: string; ownerId: string; fencingToken: number; }`
- Description: The return contract is defined by the type shown above.

## `runLeaseScopeKey`

Run Lease Scope Key function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runLeaseScopeKey } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/run-lease-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-lease-store.ts)

### Declaration

```text
export declare function runLeaseScopeKey(scope: RunLeaseScope): string;
```

### Call signature

```text
runLeaseScopeKey(scope: RunLeaseScope): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `scope` | <code>RunLeaseScope</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `InMemoryRunLeaseStoreOptions`

In Memory Run Lease Store Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryRunLeaseStoreOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/run-lease-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-lease-store.ts)

### Declaration

```text
export interface InMemoryRunLeaseStoreOptions {
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
