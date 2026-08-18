# `@codesoul-co/hypha-core` / `modules/runtime/runtime-capacity-semaphore`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-capacity-semaphore.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-capacity-semaphore.ts)
- Exports: **2**

## Using this module

Use the Runtime capacity semaphore module for executing runtime behavior at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  InMemoryRuntimeCapacitySemaphore,
} from '@codesoul-co/hypha-core';

import type {
  InMemoryRuntimeCapacitySemaphoreOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryRuntimeCapacitySemaphore` | class | <code>new InMemoryRuntimeCapacitySemaphore(options: InMemoryRuntimeCapacitySemaphoreOptions): InMemoryRuntimeCapacitySemaphore</code> | In Memory Runtime Capacity Semaphore class with 6 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryRuntimeCapacitySemaphoreOptions` | interface | <code>interface InMemoryRuntimeCapacitySemaphoreOptions</code> | In Memory Runtime Capacity Semaphore Options interface with 1 public fields or methods. |

## `InMemoryRuntimeCapacitySemaphore`

In Memory Runtime Capacity Semaphore class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryRuntimeCapacitySemaphore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-capacity-semaphore`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-capacity-semaphore.ts)

### Declaration

```text
export declare class InMemoryRuntimeCapacitySemaphore implements RuntimeCapacitySemaphore {
    constructor(options: InMemoryRuntimeCapacitySemaphoreOptions);
    acquire(request: RuntimeCapacityAcquireRequest): Promise<RuntimeCapacityLease | null>;
    renew(request: RuntimeCapacityRenewRequest): Promise<RuntimeCapacityLease>;
    release(request: RuntimeCapacityReleaseRequest): Promise<void>;
    assertCurrent(request: RuntimeCapacityAssertionRequest): Promise<RuntimeCapacityLease>;
    usage(request: RuntimeCapacityUsageRequest): Promise<RuntimeCapacityUsage>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: RuntimeCapacityAcquireRequest): Promise&lt;RuntimeCapacityLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertCurrent` | method | <code>assertCurrent(request: RuntimeCapacityAssertionRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: InMemoryRuntimeCapacitySemaphoreOptions): InMemoryRuntimeCapacitySemaphore</code> | Creates an instance of this class. |
| `release` | method | <code>release(request: RuntimeCapacityReleaseRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(request: RuntimeCapacityRenewRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `usage` | method | <code>usage(request: RuntimeCapacityUsageRequest): Promise&lt;RuntimeCapacityUsage&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryRuntimeCapacitySemaphoreOptions`

In Memory Runtime Capacity Semaphore Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryRuntimeCapacitySemaphoreOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-capacity-semaphore`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-capacity-semaphore.ts)

### Declaration

```text
export interface InMemoryRuntimeCapacitySemaphoreOptions {
    policy: RuntimeCapacityPolicy;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `policy` | property | <code>policy: RuntimeCapacityPolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
