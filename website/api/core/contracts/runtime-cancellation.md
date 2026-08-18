# `@codesoul-co/hypha-core` / `contracts/runtime-cancellation`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-cancellation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)
- Exports: **18**

## Using this module

Use the Runtime cancellation module for declaring and runtime-validating contracts. It exports 4 constants, 10 interfaces, 4 types.

### Import from the package entrypoint

```ts
import {
  RUNTIME_CANCELLATION_DISPOSITIONS,
  RUNTIME_CANCELLATION_PROPAGATIONS,
  RUNTIME_CANCELLATION_TARGET_STATUSES,
  RUNTIME_CANCELLATION_TARGET_TYPES,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeActivityCancellationPort,
  RuntimeActivityCancellationRequest,
  RuntimeCancelCommand,
  RuntimeCancellationPolicy,
  RuntimeCancellationTargetResult,
  RuntimeCancelResult,
  RuntimeChildRunCancellationPort,
  RuntimeChildRunCancellationRequest,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 14 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 4 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_CANCELLATION_DISPOSITIONS` | constant | <code>const RUNTIME_CANCELLATION_DISPOSITIONS: readonly ["applied", "reused"]</code> | RUNTIME CANCELLATION DISPOSITIONS constant exported by the `contracts/runtime-cancellation` module. |
| `RUNTIME_CANCELLATION_PROPAGATIONS` | constant | <code>const RUNTIME_CANCELLATION_PROPAGATIONS: readonly ["none", "children", "all_descendants"]</code> | RUNTIME CANCELLATION PROPAGATIONS constant exported by the `contracts/runtime-cancellation` module. |
| `RUNTIME_CANCELLATION_TARGET_STATUSES` | constant | <code>const RUNTIME_CANCELLATION_TARGET_STATUSES: readonly ["cancelled", "already_terminal", "not_found", "failed"]</code> | RUNTIME CANCELLATION TARGET STATUSES constant exported by the `contracts/runtime-cancellation` module. |
| `RUNTIME_CANCELLATION_TARGET_TYPES` | constant | <code>const RUNTIME_CANCELLATION_TARGET_TYPES: readonly ["activity", "child_run", "session_command"]</code> | RUNTIME CANCELLATION TARGET TYPES constant exported by the `contracts/runtime-cancellation` module. |
| `RuntimeActivityCancellationPort` | interface | <code>interface RuntimeActivityCancellationPort</code> | Runtime Activity Cancellation Port interface with 1 public fields or methods. |
| `RuntimeActivityCancellationRequest` | interface | <code>interface RuntimeActivityCancellationRequest</code> | Runtime Activity Cancellation Request interface with 7 public fields or methods. |
| `RuntimeCancelCommand` | interface | <code>interface RuntimeCancelCommand</code> | Runtime Cancel Command interface with 9 public fields or methods. |
| `RuntimeCancellationPolicy` | interface | <code>interface RuntimeCancellationPolicy</code> | Runtime Cancellation Policy interface with 3 public fields or methods. |
| `RuntimeCancellationTargetResult` | interface | <code>interface RuntimeCancellationTargetResult</code> | Runtime Cancellation Target Result interface with 4 public fields or methods. |
| `RuntimeCancelResult` | interface | <code>interface RuntimeCancelResult</code> | Runtime Cancel Result interface with 6 public fields or methods. |
| `RuntimeChildRunCancellationPort` | interface | <code>interface RuntimeChildRunCancellationPort</code> | Runtime Child Run Cancellation Port interface with 2 public fields or methods. |
| `RuntimeChildRunCancellationRequest` | interface | <code>interface RuntimeChildRunCancellationRequest</code> | Runtime Child Run Cancellation Request interface with 8 public fields or methods. |
| `RuntimeChildRunListRequest` | interface | <code>interface RuntimeChildRunListRequest</code> | Runtime Child Run List Request interface with 2 public fields or methods. |
| `RuntimeChildRunReference` | interface | <code>interface RuntimeChildRunReference</code> | Runtime Child Run Reference interface with 1 public fields or methods. |
| `RuntimeCancellationDisposition` | type | <code>type RuntimeCancellationDisposition = (typeof RUNTIME_CANCELLATION_DISPOSITIONS)[number]</code> | Public type alias for Runtime Cancellation Disposition; the declaration contains its complete type expression. |
| `RuntimeCancellationPropagation` | type | <code>type RuntimeCancellationPropagation = (typeof RUNTIME_CANCELLATION_PROPAGATIONS)[number]</code> | Public type alias for Runtime Cancellation Propagation; the declaration contains its complete type expression. |
| `RuntimeCancellationTargetStatus` | type | <code>type RuntimeCancellationTargetStatus = (typeof RUNTIME_CANCELLATION_TARGET_STATUSES)[number]</code> | Public type alias for Runtime Cancellation Target Status; the declaration contains its complete type expression. |
| `RuntimeCancellationTargetType` | type | <code>type RuntimeCancellationTargetType = (typeof RUNTIME_CANCELLATION_TARGET_TYPES)[number]</code> | Public type alias for Runtime Cancellation Target Type; the declaration contains its complete type expression. |

## `RUNTIME_CANCELLATION_DISPOSITIONS`

RUNTIME CANCELLATION DISPOSITIONS constant exported by the `contracts/runtime-cancellation` module.

- Kind: constant
- Import: `import { RUNTIME_CANCELLATION_DISPOSITIONS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export declare const RUNTIME_CANCELLATION_DISPOSITIONS: readonly ["applied", "reused"];
```

## `RUNTIME_CANCELLATION_PROPAGATIONS`

RUNTIME CANCELLATION PROPAGATIONS constant exported by the `contracts/runtime-cancellation` module.

- Kind: constant
- Import: `import { RUNTIME_CANCELLATION_PROPAGATIONS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export declare const RUNTIME_CANCELLATION_PROPAGATIONS: readonly ["none", "children", "all_descendants"];
```

## `RUNTIME_CANCELLATION_TARGET_STATUSES`

RUNTIME CANCELLATION TARGET STATUSES constant exported by the `contracts/runtime-cancellation` module.

- Kind: constant
- Import: `import { RUNTIME_CANCELLATION_TARGET_STATUSES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export declare const RUNTIME_CANCELLATION_TARGET_STATUSES: readonly ["cancelled", "already_terminal", "not_found", "failed"];
```

## `RUNTIME_CANCELLATION_TARGET_TYPES`

RUNTIME CANCELLATION TARGET TYPES constant exported by the `contracts/runtime-cancellation` module.

- Kind: constant
- Import: `import { RUNTIME_CANCELLATION_TARGET_TYPES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export declare const RUNTIME_CANCELLATION_TARGET_TYPES: readonly ["activity", "child_run", "session_command"];
```

## `RuntimeActivityCancellationPort`

Runtime Activity Cancellation Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityCancellationPort } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export interface RuntimeActivityCancellationPort {
    cancel(request: RuntimeActivityCancellationRequest): Promise<RuntimeCancellationTargetResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(request: RuntimeActivityCancellationRequest): Promise&lt;RuntimeCancellationTargetResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeActivityCancellationRequest`

Runtime Activity Cancellation Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityCancellationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export interface RuntimeActivityCancellationRequest {
    scope: RuntimeScope;
    activityId: string;
    reason: string;
    requestedAt: string;
    deadlineAt?: string;
    fencingToken: number;
    idempotencyKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCancelCommand`

Runtime Cancel Command interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCancelCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export interface RuntimeCancelCommand {
    commandId: string;
    scope: RuntimeScope;
    principal: RuntimePrincipal;
    ownerId: string;
    leaseTtlMs: number;
    reason: string;
    policy: RuntimeCancellationPolicy;
    requestedAt: string;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policy` | property | <code>policy: RuntimeCancellationPolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCancellationPolicy`

Runtime Cancellation Policy interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCancellationPolicy } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export interface RuntimeCancellationPolicy {
    propagation: RuntimeCancellationPropagation;
    cancelRunningActivities: boolean;
    waitGraceMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelRunningActivities` | property | <code>cancelRunningActivities: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `propagation` | property | <code>propagation: "none" &#124; "children" &#124; "all_descendants"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `waitGraceMs` | property | <code>waitGraceMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCancellationTargetResult`

Runtime Cancellation Target Result interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCancellationTargetResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export interface RuntimeCancellationTargetResult {
    targetType: RuntimeCancellationTargetType;
    targetId: string;
    status: RuntimeCancellationTargetStatus;
    error?: NormalizedRuntimeError;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error?: NormalizedRuntimeError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "cancelled" &#124; "failed" &#124; "not_found" &#124; "already_terminal"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetId` | property | <code>targetId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetType` | property | <code>targetType: "activity" &#124; "child_run" &#124; "session_command"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCancelResult`

Runtime Cancel Result interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCancelResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export interface RuntimeCancelResult {
    commandId: string;
    disposition: RuntimeCancellationDisposition;
    eventIds: string[];
    targetResults: RuntimeCancellationTargetResult[];
    unresolvedActivityIds: string[];
    projection: RuntimeOrchestrationProjection;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `disposition` | property | <code>disposition: "applied" &#124; "reused"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projection` | property | <code>projection: RuntimeOrchestrationProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetResults` | property | <code>targetResults: RuntimeCancellationTargetResult[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `unresolvedActivityIds` | property | <code>unresolvedActivityIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeChildRunCancellationPort`

Runtime Child Run Cancellation Port interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeChildRunCancellationPort } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export interface RuntimeChildRunCancellationPort {
    listChildren(request: RuntimeChildRunListRequest): Promise<RuntimeChildRunReference[]>;
    cancel(request: RuntimeChildRunCancellationRequest): Promise<RuntimeCancellationTargetResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(request: RuntimeChildRunCancellationRequest): Promise&lt;RuntimeCancellationTargetResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listChildren` | method | <code>listChildren(request: RuntimeChildRunListRequest): Promise&lt;RuntimeChildRunReference[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeChildRunCancellationRequest`

Runtime Child Run Cancellation Request interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeChildRunCancellationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export interface RuntimeChildRunCancellationRequest {
    parentScope: RuntimeScope;
    childRunId: string;
    reason: string;
    propagation: Exclude<RuntimeCancellationPropagation, 'none'>;
    requestedAt: string;
    deadlineAt?: string;
    fencingToken: number;
    idempotencyKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `childRunId` | property | <code>childRunId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parentScope` | property | <code>parentScope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `propagation` | property | <code>propagation: "children" &#124; "all_descendants"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeChildRunListRequest`

Runtime Child Run List Request interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeChildRunListRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export interface RuntimeChildRunListRequest {
    scope: RuntimeScope;
    requestedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeChildRunReference`

Runtime Child Run Reference interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeChildRunReference } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export interface RuntimeChildRunReference {
    runId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCancellationDisposition`

Public type alias for Runtime Cancellation Disposition; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeCancellationDisposition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export type RuntimeCancellationDisposition = (typeof RUNTIME_CANCELLATION_DISPOSITIONS)[number];
```

## `RuntimeCancellationPropagation`

Public type alias for Runtime Cancellation Propagation; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeCancellationPropagation } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export type RuntimeCancellationPropagation = (typeof RUNTIME_CANCELLATION_PROPAGATIONS)[number];
```

## `RuntimeCancellationTargetStatus`

Public type alias for Runtime Cancellation Target Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeCancellationTargetStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export type RuntimeCancellationTargetStatus = (typeof RUNTIME_CANCELLATION_TARGET_STATUSES)[number];
```

## `RuntimeCancellationTargetType`

Public type alias for Runtime Cancellation Target Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeCancellationTargetType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-cancellation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)

### Declaration

```text
export type RuntimeCancellationTargetType = (typeof RUNTIME_CANCELLATION_TARGET_TYPES)[number];
```
