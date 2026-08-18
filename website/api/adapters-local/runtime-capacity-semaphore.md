# `@codesoul-co/hypha-adapters-local` / `runtime-capacity-semaphore`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/runtime-capacity-semaphore.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-capacity-semaphore.ts)
- Exports: **2**

## Using this module

Use the Runtime capacity semaphore module for executing runtime behavior at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  SQLiteRuntimeCapacitySemaphore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteRuntimeCapacitySemaphoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteRuntimeCapacitySemaphore` | class | <code>new SQLiteRuntimeCapacitySemaphore(options: SQLiteRuntimeCapacitySemaphoreOptions): SQLiteRuntimeCapacitySemaphore</code> | SQLite Runtime Capacity Semaphore class with 7 public constructor or member entries; its exact declarations are listed below. |
| `SQLiteRuntimeCapacitySemaphoreOptions` | interface | <code>interface SQLiteRuntimeCapacitySemaphoreOptions</code> | SQLite Runtime Capacity Semaphore Options interface with 2 public fields or methods. |

## `SQLiteRuntimeCapacitySemaphore`

SQLite Runtime Capacity Semaphore class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SQLiteRuntimeCapacitySemaphore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`runtime-capacity-semaphore`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-capacity-semaphore.ts)

### Declaration

```text
export declare class SQLiteRuntimeCapacitySemaphore implements RuntimeCapacitySemaphore {
    constructor(options: SQLiteRuntimeCapacitySemaphoreOptions);
    acquire(request: RuntimeCapacityAcquireRequest): Promise<RuntimeCapacityLease | null>;
    renew(request: RuntimeCapacityRenewRequest): Promise<RuntimeCapacityLease>;
    release(request: RuntimeCapacityReleaseRequest): Promise<void>;
    assertCurrent(request: RuntimeCapacityAssertionRequest): Promise<RuntimeCapacityLease>;
    usage(request: RuntimeCapacityUsageRequest): Promise<RuntimeCapacityUsage>;
    close(): void;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: RuntimeCapacityAcquireRequest): Promise&lt;RuntimeCapacityLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertCurrent` | method | <code>assertCurrent(request: RuntimeCapacityAssertionRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): void</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: SQLiteRuntimeCapacitySemaphoreOptions): SQLiteRuntimeCapacitySemaphore</code> | Creates an instance of this class. |
| `release` | method | <code>release(request: RuntimeCapacityReleaseRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(request: RuntimeCapacityRenewRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `usage` | method | <code>usage(request: RuntimeCapacityUsageRequest): Promise&lt;RuntimeCapacityUsage&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SQLiteRuntimeCapacitySemaphoreOptions`

SQLite Runtime Capacity Semaphore Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { SQLiteRuntimeCapacitySemaphoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`runtime-capacity-semaphore`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-capacity-semaphore.ts)

### Declaration

```text
export interface SQLiteRuntimeCapacitySemaphoreOptions {
    filename: string;
    policy: RuntimeCapacityPolicy;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policy` | property | <code>policy: RuntimeCapacityPolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
