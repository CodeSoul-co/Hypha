# `@codesoul-co/hypha-core` / `modules/runtime/resource-coordinator`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/resource-coordinator.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/resource-coordinator.ts)
- Exports: **3**

## Using this module

Use the Resource coordinator module for executing runtime behavior at this boundary. It exports 1 class, 1 function, 1 interface.

### Import from the package entrypoint

```ts
import {
  InMemoryRuntimeResourceCoordinator,
  resourceClaimGuard,
} from '@codesoul-co/hypha-core';

import type {
  InMemoryRuntimeResourceCoordinatorOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryRuntimeResourceCoordinator` | class | <code>new InMemoryRuntimeResourceCoordinator(options: InMemoryRuntimeResourceCoordinatorOptions): InMemoryRuntimeResourceCoordinator</code> | In Memory Runtime Resource Coordinator class with 6 public constructor or member entries; its exact declarations are listed below. |
| `resourceClaimGuard` | function | <code>resourceClaimGuard(claim: RuntimeResourceClaim): { claimId: string; ownerId: string; fencingToken: number; }</code> | Resource Claim Guard function with 1 public call signature; parameters and return types are listed below. |
| `InMemoryRuntimeResourceCoordinatorOptions` | interface | <code>interface InMemoryRuntimeResourceCoordinatorOptions</code> | In Memory Runtime Resource Coordinator Options interface with 1 public fields or methods. |

## `InMemoryRuntimeResourceCoordinator`

In Memory Runtime Resource Coordinator class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryRuntimeResourceCoordinator } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/resource-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/resource-coordinator.ts)

### Declaration

```text
export declare class InMemoryRuntimeResourceCoordinator implements RuntimeResourceCoordinator {
    constructor(options: InMemoryRuntimeResourceCoordinatorOptions);
    acquire(request: ResourceAcquireRequest): Promise<RuntimeResourceClaim[]>;
    renew(request: ResourceRenewRequest): Promise<RuntimeResourceClaim[]>;
    release(request: ResourceReleaseRequest): Promise<void>;
    list(request: ResourceListRequest): Promise<RuntimeResourceClaim[]>;
    assertCurrent(request: ResourceClaimAssertionRequest): Promise<RuntimeResourceClaim>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: ResourceAcquireRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertCurrent` | method | <code>assertCurrent(request: ResourceClaimAssertionRequest): Promise&lt;RuntimeResourceClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: InMemoryRuntimeResourceCoordinatorOptions): InMemoryRuntimeResourceCoordinator</code> | Creates an instance of this class. |
| `list` | method | <code>list(request: ResourceListRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `release` | method | <code>release(request: ResourceReleaseRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(request: ResourceRenewRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `resourceClaimGuard`

Resource Claim Guard function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { resourceClaimGuard } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/resource-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/resource-coordinator.ts)

### Declaration

```text
export declare function resourceClaimGuard(claim: RuntimeResourceClaim): {
    claimId: string;
    ownerId: string;
    fencingToken: number;
};
```

### Call signature

```text
resourceClaimGuard(claim: RuntimeResourceClaim): { claimId: string; ownerId: string; fencingToken: number; }
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `claim` | <code>RuntimeResourceClaim</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `{ claimId: string; ownerId: string; fencingToken: number; }`
- Description: The return contract is defined by the type shown above.

## `InMemoryRuntimeResourceCoordinatorOptions`

In Memory Runtime Resource Coordinator Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryRuntimeResourceCoordinatorOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/resource-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/resource-coordinator.ts)

### Declaration

```text
export interface InMemoryRuntimeResourceCoordinatorOptions {
    runLeaseStore: Pick<RunLeaseStore, 'assertCurrent'>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runLeaseStore` | property | <code>runLeaseStore: Pick&lt;RunLeaseStore, "assertCurrent"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
