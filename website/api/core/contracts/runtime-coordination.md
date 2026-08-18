# `@codesoul-co/hypha-core` / `contracts/runtime-coordination`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-coordination.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)
- Exports: **34**

## Using this module

Use the Runtime coordination module for declaring and runtime-validating contracts. It exports 3 constants, 28 interfaces, 3 types.

### Import from the package entrypoint

```ts
import {
  RUNTIME_RESOURCE_CLAIM_MODES,
  RUNTIME_RESOURCE_TYPES,
  STATE_EXECUTION_CLAIM_STATUSES,
} from '@codesoul-co/hypha-core';

import type {
  FencedRunLease,
  ResourceAcquireRequest,
  ResourceClaimAssertionRequest,
  ResourceListRequest,
  ResourceReleaseRequest,
  ResourceRenewRequest,
  RunLease,
  RunLeaseAcquireRequest,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 31 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 3 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_RESOURCE_CLAIM_MODES` | constant | <code>const RUNTIME_RESOURCE_CLAIM_MODES: readonly ["shared", "exclusive"]</code> | RUNTIME RESOURCE CLAIM MODES constant exported by the `contracts/runtime-coordination` module. |
| `RUNTIME_RESOURCE_TYPES` | constant | <code>const RUNTIME_RESOURCE_TYPES: readonly ["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"]</code> | RUNTIME RESOURCE TYPES constant exported by the `contracts/runtime-coordination` module. |
| `STATE_EXECUTION_CLAIM_STATUSES` | constant | <code>const STATE_EXECUTION_CLAIM_STATUSES: readonly ["claimed", "completed", "released", "expired"]</code> | STATE EXECUTION CLAIM STATUSES constant exported by the `contracts/runtime-coordination` module. |
| `FencedRunLease` | interface | <code>interface FencedRunLease extends RunLease</code> | Fenced Run Lease interface with 11 public fields or methods. |
| `ResourceAcquireRequest` | interface | <code>interface ResourceAcquireRequest</code> | Resource Acquire Request interface with 6 public fields or methods. |
| `ResourceClaimAssertionRequest` | interface | <code>interface ResourceClaimAssertionRequest extends ResourceListRequest</code> | Resource Claim Assertion Request interface with 7 public fields or methods. |
| `ResourceListRequest` | interface | <code>interface ResourceListRequest</code> | Resource List Request interface with 4 public fields or methods. |
| `ResourceReleaseRequest` | interface | <code>interface ResourceReleaseRequest</code> | Resource Release Request interface with 3 public fields or methods. |
| `ResourceRenewRequest` | interface | <code>interface ResourceRenewRequest</code> | Resource Renew Request interface with 4 public fields or methods. |
| `RunLease` | interface | <code>interface RunLease</code> | Run Lease interface with 9 public fields or methods. |
| `RunLeaseAcquireRequest` | interface | <code>interface RunLeaseAcquireRequest extends RunLeaseScope</code> | Run Lease Acquire Request interface with 9 public fields or methods. |
| `RunLeaseAssertionRequest` | interface | <code>interface RunLeaseAssertionRequest</code> | Run Lease Assertion Request interface with 3 public fields or methods. |
| `RunLeaseAuthorization` | interface | <code>interface RunLeaseAuthorization</code> | Run Lease Authorization interface with 2 public fields or methods. |
| `RunLeaseGuard` | interface | <code>interface RunLeaseGuard</code> | Run Lease Guard interface with 3 public fields or methods. |
| `RunLeaseHeartbeatRequest` | interface | <code>interface RunLeaseHeartbeatRequest</code> | Run Lease Heartbeat Request interface with 4 public fields or methods. |
| `RunLeasePreemptRequest` | interface | <code>interface RunLeasePreemptRequest extends RunLeaseAcquireRequest</code> | Run Lease Preempt Request interface with 10 public fields or methods. |
| `RunLeaseReleaseRequest` | interface | <code>interface RunLeaseReleaseRequest</code> | Run Lease Release Request interface with 3 public fields or methods. |
| `RunLeaseScope` | interface | <code>interface RunLeaseScope</code> | Run Lease Scope interface with 4 public fields or methods. |
| `RunLeaseStore` | interface | <code>interface RunLeaseStore</code> | Run Lease Store interface with 6 public fields or methods. |
| `RuntimeResourceClaim` | interface | <code>interface RuntimeResourceClaim</code> | Runtime Resource Claim interface with 14 public fields or methods. |
| `RuntimeResourceCoordinator` | interface | <code>interface RuntimeResourceCoordinator</code> | Runtime Resource Coordinator interface with 5 public fields or methods. |
| `RuntimeResourceRequest` | interface | <code>interface RuntimeResourceRequest</code> | Runtime Resource Request interface with 5 public fields or methods. |
| `StateExecutionClaim` | interface | <code>interface StateExecutionClaim extends StateExecutionClaimScope</code> | State Execution Claim interface with 15 public fields or methods. |
| `StateExecutionClaimAcquireRequest` | interface | <code>interface StateExecutionClaimAcquireRequest extends StateExecutionClaimScope</code> | State Execution Claim Acquire Request interface with 12 public fields or methods. |
| `StateExecutionClaimAssertionRequest` | interface | <code>interface StateExecutionClaimAssertionRequest</code> | State Execution Claim Assertion Request interface with 3 public fields or methods. |
| `StateExecutionClaimCompleteRequest` | interface | <code>interface StateExecutionClaimCompleteRequest</code> | State Execution Claim Complete Request interface with 4 public fields or methods. |
| `StateExecutionClaimGuard` | interface | <code>interface StateExecutionClaimGuard</code> | State Execution Claim Guard interface with 3 public fields or methods. |
| `StateExecutionClaimReleaseRequest` | interface | <code>interface StateExecutionClaimReleaseRequest</code> | State Execution Claim Release Request interface with 4 public fields or methods. |
| `StateExecutionClaimRenewRequest` | interface | <code>interface StateExecutionClaimRenewRequest</code> | State Execution Claim Renew Request interface with 5 public fields or methods. |
| `StateExecutionClaimScope` | interface | <code>interface StateExecutionClaimScope</code> | State Execution Claim Scope interface with 5 public fields or methods. |
| `StateExecutionClaimStore` | interface | <code>interface StateExecutionClaimStore</code> | State Execution Claim Store interface with 6 public fields or methods. |
| `RuntimeResourceClaimMode` | type | <code>type RuntimeResourceClaimMode = (typeof RUNTIME_RESOURCE_CLAIM_MODES)[number]</code> | Public type alias for Runtime Resource Claim Mode; the declaration contains its complete type expression. |
| `RuntimeResourceType` | type | <code>type RuntimeResourceType = (typeof RUNTIME_RESOURCE_TYPES)[number]</code> | Public type alias for Runtime Resource Type; the declaration contains its complete type expression. |
| `StateExecutionClaimStatus` | type | <code>type StateExecutionClaimStatus = (typeof STATE_EXECUTION_CLAIM_STATUSES)[number]</code> | Public type alias for State Execution Claim Status; the declaration contains its complete type expression. |

## `RUNTIME_RESOURCE_CLAIM_MODES`

RUNTIME RESOURCE CLAIM MODES constant exported by the `contracts/runtime-coordination` module.

- Kind: constant
- Import: `import { RUNTIME_RESOURCE_CLAIM_MODES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export declare const RUNTIME_RESOURCE_CLAIM_MODES: readonly ["shared", "exclusive"];
```

## `RUNTIME_RESOURCE_TYPES`

RUNTIME RESOURCE TYPES constant exported by the `contracts/runtime-coordination` module.

- Kind: constant
- Import: `import { RUNTIME_RESOURCE_TYPES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export declare const RUNTIME_RESOURCE_TYPES: readonly ["workspace", "artifact", "tool_scope", "memory_scope", "external_account", "custom"];
```

## `STATE_EXECUTION_CLAIM_STATUSES`

STATE EXECUTION CLAIM STATUSES constant exported by the `contracts/runtime-coordination` module.

- Kind: constant
- Import: `import { STATE_EXECUTION_CLAIM_STATUSES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export declare const STATE_EXECUTION_CLAIM_STATUSES: readonly ["claimed", "completed", "released", "expired"];
```

## `FencedRunLease`

Fenced Run Lease interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { FencedRunLease } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface FencedRunLease extends RunLease {
    fencingToken: number;
    partitionKey: string;
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
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ResourceAcquireRequest`

Resource Acquire Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ResourceAcquireRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface ResourceAcquireRequest {
    runLease: RunLeaseAuthorization;
    stateId?: string;
    resources: RuntimeResourceRequest[];
    ttlMs: number;
    acquiredAt: string;
    idempotencyKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resources` | property | <code>resources: RuntimeResourceRequest[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ResourceClaimAssertionRequest`

Resource Claim Assertion Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ResourceClaimAssertionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface ResourceClaimAssertionRequest extends ResourceListRequest {
    claimId: string;
    ownerId: string;
    fencingToken: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `claimId` | property | <code>claimId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceKey` | property | <code>resourceKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceType` | property | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ResourceListRequest`

Resource List Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ResourceListRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface ResourceListRequest {
    tenantId?: string;
    resourceType: RuntimeResourceType;
    resourceKey: string;
    checkedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceKey` | property | <code>resourceKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceType` | property | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ResourceReleaseRequest`

Resource Release Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ResourceReleaseRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface ResourceReleaseRequest {
    runLease: RunLeaseAuthorization;
    claimIds: string[];
    releasedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimIds` | property | <code>claimIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `releasedAt` | property | <code>releasedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ResourceRenewRequest`

Resource Renew Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ResourceRenewRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface ResourceRenewRequest {
    runLease: RunLeaseAuthorization;
    claimIds: string[];
    ttlMs: number;
    renewedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimIds` | property | <code>claimIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `renewedAt` | property | <code>renewedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RunLease`

Run Lease interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { RunLease } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface RunLease {
    id: string;
    tenantId?: string;
    userId: string;
    runId: string;
    ownerId: string;
    acquiredAt: string;
    expiresAt: string;
    heartbeatAt: string;
    revision: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `heartbeatAt` | property | <code>heartbeatAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RunLeaseAcquireRequest`

Run Lease Acquire Request interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { RunLeaseAcquireRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface RunLeaseAcquireRequest extends RunLeaseScope {
    requestedLeaseId: string;
    ownerId: string;
    ttlMs: number;
    acquiredAt: string;
    idempotencyKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedLeaseId` | property | <code>requestedLeaseId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RunLeaseAssertionRequest`

Run Lease Assertion Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RunLeaseAssertionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface RunLeaseAssertionRequest {
    scope: RunLeaseScope;
    guard: RunLeaseGuard;
    checkedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `guard` | property | <code>guard: RunLeaseGuard</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RunLeaseScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RunLeaseAuthorization`

Run Lease Authorization interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RunLeaseAuthorization } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface RunLeaseAuthorization {
    scope: RunLeaseScope;
    guard: RunLeaseGuard;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guard` | property | <code>guard: RunLeaseGuard</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RunLeaseScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RunLeaseGuard`

Run Lease Guard interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RunLeaseGuard } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface RunLeaseGuard {
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

## `RunLeaseHeartbeatRequest`

Run Lease Heartbeat Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RunLeaseHeartbeatRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface RunLeaseHeartbeatRequest {
    scope: RunLeaseScope;
    guard: RunLeaseGuard;
    ttlMs: number;
    heartbeatAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guard` | property | <code>guard: RunLeaseGuard</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `heartbeatAt` | property | <code>heartbeatAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RunLeaseScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RunLeasePreemptRequest`

Run Lease Preempt Request interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { RunLeasePreemptRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface RunLeasePreemptRequest extends RunLeaseAcquireRequest {
    reason: 'cancellation';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: "cancellation"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedLeaseId` | property | <code>requestedLeaseId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RunLeaseReleaseRequest`

Run Lease Release Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RunLeaseReleaseRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface RunLeaseReleaseRequest {
    scope: RunLeaseScope;
    guard: RunLeaseGuard;
    releasedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guard` | property | <code>guard: RunLeaseGuard</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `releasedAt` | property | <code>releasedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RunLeaseScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RunLeaseScope`

Run Lease Scope interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RunLeaseScope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface RunLeaseScope {
    tenantId?: string;
    userId: string;
    runId: string;
    partitionKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `partitionKey` | property | <code>partitionKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RunLeaseStore`

Run Lease Store interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RunLeaseStore } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface RunLeaseStore {
    acquire(request: RunLeaseAcquireRequest): Promise<FencedRunLease | null>;
    preempt(request: RunLeasePreemptRequest): Promise<FencedRunLease>;
    heartbeat(request: RunLeaseHeartbeatRequest): Promise<FencedRunLease>;
    release(request: RunLeaseReleaseRequest): Promise<void>;
    get(scope: RunLeaseScope, checkedAt?: string): Promise<FencedRunLease | null>;
    assertCurrent(request: RunLeaseAssertionRequest): Promise<FencedRunLease>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: RunLeaseAcquireRequest): Promise&lt;FencedRunLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertCurrent` | method | <code>assertCurrent(request: RunLeaseAssertionRequest): Promise&lt;FencedRunLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(scope: RunLeaseScope, checkedAt?: string): Promise&lt;FencedRunLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `heartbeat` | method | <code>heartbeat(request: RunLeaseHeartbeatRequest): Promise&lt;FencedRunLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `preempt` | method | <code>preempt(request: RunLeasePreemptRequest): Promise&lt;FencedRunLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `release` | method | <code>release(request: RunLeaseReleaseRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeResourceClaim`

Runtime Resource Claim interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeResourceClaim } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface RuntimeResourceClaim {
    id: string;
    tenantId?: string;
    userId: string;
    resourceType: RuntimeResourceType;
    resourceKey: string;
    mode: RuntimeResourceClaimMode;
    runId: string;
    stateId?: string;
    ownerId: string;
    fencingToken: number;
    runFencingToken: number;
    acquiredAt: string;
    expiresAt: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "shared" &#124; "exclusive"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceKey` | property | <code>resourceKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceType` | property | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runFencingToken` | property | <code>runFencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeResourceCoordinator`

Runtime Resource Coordinator interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeResourceCoordinator } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface RuntimeResourceCoordinator {
    acquire(request: ResourceAcquireRequest): Promise<RuntimeResourceClaim[]>;
    renew(request: ResourceRenewRequest): Promise<RuntimeResourceClaim[]>;
    release(request: ResourceReleaseRequest): Promise<void>;
    list(request: ResourceListRequest): Promise<RuntimeResourceClaim[]>;
    assertCurrent(request: ResourceClaimAssertionRequest): Promise<RuntimeResourceClaim>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: ResourceAcquireRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertCurrent` | method | <code>assertCurrent(request: ResourceClaimAssertionRequest): Promise&lt;RuntimeResourceClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: ResourceListRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `release` | method | <code>release(request: ResourceReleaseRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(request: ResourceRenewRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeResourceRequest`

Runtime Resource Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeResourceRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface RuntimeResourceRequest {
    requestedClaimId: string;
    resourceType: RuntimeResourceType;
    resourceKey: string;
    mode: RuntimeResourceClaimMode;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "shared" &#124; "exclusive"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedClaimId` | property | <code>requestedClaimId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceKey` | property | <code>resourceKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceType` | property | <code>resourceType: "artifact" &#124; "workspace" &#124; "custom" &#124; "tool_scope" &#124; "memory_scope" &#124; "external_account"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StateExecutionClaim`

State Execution Claim interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { StateExecutionClaim } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface StateExecutionClaim extends StateExecutionClaimScope {
    claimId: string;
    processRevision: string;
    expectedRunRevision: number;
    fencingToken: number;
    ownerId: string;
    status: StateExecutionClaimStatus;
    acquiredAt: string;
    expiresAt: string;
    completedAt?: string;
    releasedAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `claimId` | property | <code>claimId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedAt` | property | <code>completedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRunRevision` | property | <code>expectedRunRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processRevision` | property | <code>processRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `releasedAt` | property | <code>releasedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "expired" &#124; "claimed" &#124; "released"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StateExecutionClaimAcquireRequest`

State Execution Claim Acquire Request interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { StateExecutionClaimAcquireRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface StateExecutionClaimAcquireRequest extends StateExecutionClaimScope {
    requestedClaimId: string;
    processRevision: string;
    expectedRunRevision: number;
    runLease: RunLeaseAuthorization;
    ttlMs: number;
    acquiredAt: string;
    idempotencyKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquiredAt` | property | <code>acquiredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRunRevision` | property | <code>expectedRunRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processRevision` | property | <code>processRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedClaimId` | property | <code>requestedClaimId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StateExecutionClaimAssertionRequest`

State Execution Claim Assertion Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { StateExecutionClaimAssertionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface StateExecutionClaimAssertionRequest {
    scope: StateExecutionClaimScope;
    guard: StateExecutionClaimGuard;
    checkedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `guard` | property | <code>guard: StateExecutionClaimGuard</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: StateExecutionClaimScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StateExecutionClaimCompleteRequest`

State Execution Claim Complete Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { StateExecutionClaimCompleteRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface StateExecutionClaimCompleteRequest {
    scope: StateExecutionClaimScope;
    guard: StateExecutionClaimGuard;
    runLease: RunLeaseAuthorization;
    completedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `completedAt` | property | <code>completedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `guard` | property | <code>guard: StateExecutionClaimGuard</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: StateExecutionClaimScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StateExecutionClaimGuard`

State Execution Claim Guard interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { StateExecutionClaimGuard } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface StateExecutionClaimGuard {
    claimId: string;
    ownerId: string;
    fencingToken: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimId` | property | <code>claimId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StateExecutionClaimReleaseRequest`

State Execution Claim Release Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { StateExecutionClaimReleaseRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface StateExecutionClaimReleaseRequest {
    scope: StateExecutionClaimScope;
    guard: StateExecutionClaimGuard;
    runLease: RunLeaseAuthorization;
    releasedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guard` | property | <code>guard: StateExecutionClaimGuard</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `releasedAt` | property | <code>releasedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: StateExecutionClaimScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StateExecutionClaimRenewRequest`

State Execution Claim Renew Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { StateExecutionClaimRenewRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface StateExecutionClaimRenewRequest {
    scope: StateExecutionClaimScope;
    guard: StateExecutionClaimGuard;
    runLease: RunLeaseAuthorization;
    ttlMs: number;
    renewedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guard` | property | <code>guard: StateExecutionClaimGuard</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `renewedAt` | property | <code>renewedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: StateExecutionClaimScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StateExecutionClaimScope`

State Execution Claim Scope interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { StateExecutionClaimScope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface StateExecutionClaimScope {
    tenantId?: string;
    userId: string;
    runId: string;
    stateId: string;
    stateAttempt: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StateExecutionClaimStore`

State Execution Claim Store interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { StateExecutionClaimStore } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export interface StateExecutionClaimStore {
    acquire(request: StateExecutionClaimAcquireRequest): Promise<StateExecutionClaim | null>;
    renew(request: StateExecutionClaimRenewRequest): Promise<StateExecutionClaim>;
    complete(request: StateExecutionClaimCompleteRequest): Promise<StateExecutionClaim>;
    release(request: StateExecutionClaimReleaseRequest): Promise<StateExecutionClaim>;
    get(scope: StateExecutionClaimScope, checkedAt?: string): Promise<StateExecutionClaim | null>;
    assertCurrent(request: StateExecutionClaimAssertionRequest): Promise<StateExecutionClaim>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(request: StateExecutionClaimAcquireRequest): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertCurrent` | method | <code>assertCurrent(request: StateExecutionClaimAssertionRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `complete` | method | <code>complete(request: StateExecutionClaimCompleteRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(scope: StateExecutionClaimScope, checkedAt?: string): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `release` | method | <code>release(request: StateExecutionClaimReleaseRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(request: StateExecutionClaimRenewRequest): Promise&lt;StateExecutionClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeResourceClaimMode`

Public type alias for Runtime Resource Claim Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeResourceClaimMode } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export type RuntimeResourceClaimMode = (typeof RUNTIME_RESOURCE_CLAIM_MODES)[number];
```

## `RuntimeResourceType`

Public type alias for Runtime Resource Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeResourceType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export type RuntimeResourceType = (typeof RUNTIME_RESOURCE_TYPES)[number];
```

## `StateExecutionClaimStatus`

Public type alias for State Execution Claim Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { StateExecutionClaimStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-coordination.ts)

### Declaration

```text
export type StateExecutionClaimStatus = (typeof STATE_EXECUTION_CLAIM_STATUSES)[number];
```
