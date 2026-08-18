# `@codesoul-co/hypha-core` / `contracts/runtime-capacity`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-capacity.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)
- Exports: **14**

## Using this module

Use the Runtime capacity module for declaring and runtime-validating contracts. It exports 1 constant, 12 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  RUNTIME_CAPACITY_KINDS,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeCapacityAcquireRequest,
  RuntimeCapacityAssertionRequest,
  RuntimeCapacityLease,
  RuntimeCapacityLeaseGuard,
  RuntimeCapacityLimit,
  RuntimeCapacityPolicy,
  RuntimeCapacityReleaseRequest,
  RuntimeCapacityRenewRequest,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 13 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_CAPACITY_KINDS` | constant | <code>const RUNTIME_CAPACITY_KINDS: readonly ["model", "tool", "execution"]</code> | RUNTIME CAPACITY KINDS constant exported by the `contracts/runtime-capacity` module. |
| `RuntimeCapacityAcquireRequest` | interface | <code>interface RuntimeCapacityAcquireRequest extends RuntimeCapacityScope</code> | Runtime Capacity Acquire Request interface with 10 public fields or methods. |
| `RuntimeCapacityAssertionRequest` | interface | <code>interface RuntimeCapacityAssertionRequest</code> | Runtime Capacity Assertion Request interface with 4 public fields or methods. |
| `RuntimeCapacityLease` | interface | <code>interface RuntimeCapacityLease extends RuntimeCapacityScope</code> | Runtime Capacity Lease interface with 12 public fields or methods. |
| `RuntimeCapacityLeaseGuard` | interface | <code>interface RuntimeCapacityLeaseGuard</code> | Runtime Capacity Lease Guard interface with 3 public fields or methods. |
| `RuntimeCapacityLimit` | interface | <code>interface RuntimeCapacityLimit</code> | Runtime Capacity Limit interface with 2 public fields or methods. |
| `RuntimeCapacityPolicy` | interface | <code>interface RuntimeCapacityPolicy</code> | Runtime Capacity Policy interface with 3 public fields or methods. |
| `RuntimeCapacityReleaseRequest` | interface | <code>interface RuntimeCapacityReleaseRequest</code> | Runtime Capacity Release Request interface with 4 public fields or methods. |
| `RuntimeCapacityRenewRequest` | interface | <code>interface RuntimeCapacityRenewRequest</code> | Runtime Capacity Renew Request interface with 5 public fields or methods. |
| `RuntimeCapacityScope` | interface | <code>interface RuntimeCapacityScope</code> | Runtime Capacity Scope interface with 3 public fields or methods. |
| `RuntimeCapacitySemaphore` | interface | <code>interface RuntimeCapacitySemaphore</code> | Runtime Capacity Semaphore interface with 5 public fields or methods. |
| `RuntimeCapacityUsage` | interface | <code>interface RuntimeCapacityUsage</code> | Runtime Capacity Usage interface with 7 public fields or methods. |
| `RuntimeCapacityUsageRequest` | interface | <code>interface RuntimeCapacityUsageRequest</code> | Runtime Capacity Usage Request interface with 4 public fields or methods. |
| `RuntimeCapacityKind` | type | <code>type RuntimeCapacityKind = (typeof RUNTIME_CAPACITY_KINDS)[number]</code> | Public type alias for Runtime Capacity Kind; the declaration contains its complete type expression. |

## `RUNTIME_CAPACITY_KINDS`

RUNTIME CAPACITY KINDS constant exported by the `contracts/runtime-capacity` module.

- Kind: constant
- Import: `import { RUNTIME_CAPACITY_KINDS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### Declaration

```text
export declare const RUNTIME_CAPACITY_KINDS: readonly ["model", "tool", "execution"];
```

## `RuntimeCapacityAcquireRequest`

Runtime Capacity Acquire Request interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCapacityAcquireRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### Declaration

```text
export interface RuntimeCapacityAcquireRequest extends RuntimeCapacityScope {
    kind: RuntimeCapacityKind;
    operationId: string;
    requestedLeaseId: string;
    ownerId: string;
    acquiredAt: string;
    ttlMs: number;
    idempotencyKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedLeaseId` | property | <code>requestedLeaseId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCapacityAssertionRequest`

Runtime Capacity Assertion Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCapacityAssertionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### Declaration

```text
export interface RuntimeCapacityAssertionRequest {
    scope: RuntimeCapacityScope;
    kind: RuntimeCapacityKind;
    guard: RuntimeCapacityLeaseGuard;
    checkedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `guard` | property | <code>guard: RuntimeCapacityLeaseGuard</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeCapacityScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCapacityLease`

Runtime Capacity Lease interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCapacityLease } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### Declaration

```text
export interface RuntimeCapacityLease extends RuntimeCapacityScope {
    id: string;
    kind: RuntimeCapacityKind;
    operationId: string;
    ownerId: string;
    fencingToken: number;
    policyRevision: string;
    acquiredAt: string;
    heartbeatAt: string;
    expiresAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `heartbeatAt` | property | <code>heartbeatAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCapacityLeaseGuard`

Runtime Capacity Lease Guard interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCapacityLeaseGuard } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### Declaration

```text
export interface RuntimeCapacityLeaseGuard {
    leaseId: string;
    ownerId: string;
    fencingToken: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseId` | property | <code>leaseId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCapacityLimit`

Runtime Capacity Limit interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCapacityLimit } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### Declaration

```text
export interface RuntimeCapacityLimit {
    global: number;
    perUser: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `global` | property | <code>global: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `perUser` | property | <code>perUser: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCapacityPolicy`

Runtime Capacity Policy interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCapacityPolicy } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### Declaration

```text
export interface RuntimeCapacityPolicy {
    version: '1.0.0';
    revision: string;
    limits: Record<RuntimeCapacityKind, RuntimeCapacityLimit>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `limits` | property | <code>limits: Record&lt;"tool" &#124; "model" &#124; "execution", RuntimeCapacityLimit&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCapacityReleaseRequest`

Runtime Capacity Release Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCapacityReleaseRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### Declaration

```text
export interface RuntimeCapacityReleaseRequest {
    scope: RuntimeCapacityScope;
    kind: RuntimeCapacityKind;
    guard: RuntimeCapacityLeaseGuard;
    releasedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guard` | property | <code>guard: RuntimeCapacityLeaseGuard</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `releasedAt` | property | <code>releasedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeCapacityScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCapacityRenewRequest`

Runtime Capacity Renew Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCapacityRenewRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### Declaration

```text
export interface RuntimeCapacityRenewRequest {
    scope: RuntimeCapacityScope;
    kind: RuntimeCapacityKind;
    guard: RuntimeCapacityLeaseGuard;
    renewedAt: string;
    ttlMs: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guard` | property | <code>guard: RuntimeCapacityLeaseGuard</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `renewedAt` | property | <code>renewedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeCapacityScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCapacityScope`

Runtime Capacity Scope interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCapacityScope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### Declaration

```text
export interface RuntimeCapacityScope {
    tenantId?: string;
    userId: string;
    runId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCapacitySemaphore`

Runtime Capacity Semaphore interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCapacitySemaphore } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### Declaration

```text
export interface RuntimeCapacitySemaphore {
    acquire(request: RuntimeCapacityAcquireRequest): Promise<RuntimeCapacityLease | null>;
    renew(request: RuntimeCapacityRenewRequest): Promise<RuntimeCapacityLease>;
    release(request: RuntimeCapacityReleaseRequest): Promise<void>;
    assertCurrent(request: RuntimeCapacityAssertionRequest): Promise<RuntimeCapacityLease>;
    usage(request: RuntimeCapacityUsageRequest): Promise<RuntimeCapacityUsage>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: RuntimeCapacityAcquireRequest): Promise&lt;RuntimeCapacityLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertCurrent` | method | <code>assertCurrent(request: RuntimeCapacityAssertionRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `release` | method | <code>release(request: RuntimeCapacityReleaseRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(request: RuntimeCapacityRenewRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `usage` | method | <code>usage(request: RuntimeCapacityUsageRequest): Promise&lt;RuntimeCapacityUsage&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeCapacityUsage`

Runtime Capacity Usage interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCapacityUsage } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### Declaration

```text
export interface RuntimeCapacityUsage {
    kind: RuntimeCapacityKind;
    policyRevision: string;
    globalActive: number;
    userActive: number;
    globalLimit: number;
    userLimit: number;
    checkedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `globalActive` | property | <code>globalActive: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `globalLimit` | property | <code>globalLimit: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userActive` | property | <code>userActive: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userLimit` | property | <code>userLimit: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCapacityUsageRequest`

Runtime Capacity Usage Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCapacityUsageRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### Declaration

```text
export interface RuntimeCapacityUsageRequest {
    tenantId?: string;
    userId: string;
    kind: RuntimeCapacityKind;
    checkedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCapacityKind`

Public type alias for Runtime Capacity Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeCapacityKind } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### Declaration

```text
export type RuntimeCapacityKind = (typeof RUNTIME_CAPACITY_KINDS)[number];
```
