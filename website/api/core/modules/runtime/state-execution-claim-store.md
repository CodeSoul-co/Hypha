# `@codesoul-co/hypha-core` / `modules/runtime/state-execution-claim-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/state-execution-claim-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/state-execution-claim-store.ts)
- Exports: **4**

## Using this module

Use the State execution claim store module for persisting and reading data at this boundary. It exports 1 class, 2 functions, 1 interface.

### Import from the package entrypoint

```ts
import {
  InMemoryStateExecutionClaimStore,
  stateExecutionClaimGuard,
  stateExecutionClaimScopeKey,
} from '@codesoul-co/hypha-core';

import type {
  InMemoryStateExecutionClaimStoreOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryStateExecutionClaimStore` | class | <code>new InMemoryStateExecutionClaimStore(options: InMemoryStateExecutionClaimStoreOptions): InMemoryStateExecutionClaimStore</code> | In Memory State Execution Claim Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `stateExecutionClaimGuard` | function | <code>stateExecutionClaimGuard(claim: StateExecutionClaim): StateExecutionClaimGuard</code> | State Execution Claim Guard function with 1 public call signature; parameters and return types are listed below. |
| `stateExecutionClaimScopeKey` | function | <code>stateExecutionClaimScopeKey(scope: StateExecutionClaimScope): string</code> | State Execution Claim Scope Key function with 1 public call signature; parameters and return types are listed below. |
| `InMemoryStateExecutionClaimStoreOptions` | interface | <code>interface InMemoryStateExecutionClaimStoreOptions</code> | In Memory State Execution Claim Store Options interface with 2 public fields or methods. |

## `InMemoryStateExecutionClaimStore`

In Memory State Execution Claim Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryStateExecutionClaimStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/state-execution-claim-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/state-execution-claim-store.ts)

### Declaration

```text
export declare class InMemoryStateExecutionClaimStore implements StateExecutionClaimStore {
    constructor(options: InMemoryStateExecutionClaimStoreOptions);
    acquire(request: StateExecutionClaimAcquireRequest): Promise<StateExecutionClaim | null>;
    renew(request: StateExecutionClaimRenewRequest): Promise<StateExecutionClaim>;
    complete(request: StateExecutionClaimCompleteRequest): Promise<StateExecutionClaim>;
    release(request: StateExecutionClaimReleaseRequest): Promise<StateExecutionClaim>;
    get(scope: StateExecutionClaimScope, checkedAt?: string): Promise<StateExecutionClaim | null>;
    assertCurrent(request: StateExecutionClaimAssertionRequest): Promise<StateExecutionClaim>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: StateExecutionClaimAcquireRequest): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertCurrent` | method | <code>assertCurrent(request: StateExecutionClaimAssertionRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `complete` | method | <code>complete(request: StateExecutionClaimCompleteRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: InMemoryStateExecutionClaimStoreOptions): InMemoryStateExecutionClaimStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scope: StateExecutionClaimScope, checkedAt?: string): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `release` | method | <code>release(request: StateExecutionClaimReleaseRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(request: StateExecutionClaimRenewRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `stateExecutionClaimGuard`

State Execution Claim Guard function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { stateExecutionClaimGuard } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/state-execution-claim-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/state-execution-claim-store.ts)

### Declaration

```text
export declare function stateExecutionClaimGuard(claim: StateExecutionClaim): StateExecutionClaimGuard;
```

### Call signature

```text
stateExecutionClaimGuard(claim: StateExecutionClaim): StateExecutionClaimGuard
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `claim` | <code>StateExecutionClaim</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StateExecutionClaimGuard`
- Description: The return contract is defined by the type shown above.

## `stateExecutionClaimScopeKey`

State Execution Claim Scope Key function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { stateExecutionClaimScopeKey } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/state-execution-claim-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/state-execution-claim-store.ts)

### Declaration

```text
export declare function stateExecutionClaimScopeKey(scope: StateExecutionClaimScope): string;
```

### Call signature

```text
stateExecutionClaimScopeKey(scope: StateExecutionClaimScope): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `scope` | <code>StateExecutionClaimScope</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `InMemoryStateExecutionClaimStoreOptions`

In Memory State Execution Claim Store Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryStateExecutionClaimStoreOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/state-execution-claim-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/state-execution-claim-store.ts)

### Declaration

```text
export interface InMemoryStateExecutionClaimStoreOptions {
    runLeaseStore: Pick<RunLeaseStore, 'assertCurrent'>;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `runLeaseStore` | property | <code>runLeaseStore: Pick&lt;RunLeaseStore, "assertCurrent"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
