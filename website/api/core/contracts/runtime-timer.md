# `@codesoul-co/hypha-core` / `contracts/runtime-timer`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-timer.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)
- Exports: **6**

## Using this module

Use the Runtime timer module for declaring and runtime-validating contracts. It exports 1 constant, 4 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  RUNTIME_TIMER_SWEEP_DISPOSITIONS,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeTimerStreamScope,
  RuntimeTimerSweepRequest,
  RuntimeTimerSweepResult,
  RuntimeTimerSweepRunResult,
  RuntimeTimerSweepDisposition,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_TIMER_SWEEP_DISPOSITIONS` | constant | <code>const RUNTIME_TIMER_SWEEP_DISPOSITIONS: readonly ["fired", "not_due", "lease_unavailable", "already_resolved"]</code> | RUNTIME TIMER SWEEP DISPOSITIONS constant exported by the `contracts/runtime-timer` module. |
| `RuntimeTimerStreamScope` | interface | <code>interface RuntimeTimerStreamScope</code> | Runtime Timer Stream Scope interface with 3 public fields or methods. |
| `RuntimeTimerSweepRequest` | interface | <code>interface RuntimeTimerSweepRequest</code> | Runtime Timer Sweep Request interface with 5 public fields or methods. |
| `RuntimeTimerSweepResult` | interface | <code>interface RuntimeTimerSweepResult</code> | Runtime Timer Sweep Result interface with 7 public fields or methods. |
| `RuntimeTimerSweepRunResult` | interface | <code>interface RuntimeTimerSweepRunResult</code> | Runtime Timer Sweep Run Result interface with 3 public fields or methods. |
| `RuntimeTimerSweepDisposition` | type | <code>type RuntimeTimerSweepDisposition = (typeof RUNTIME_TIMER_SWEEP_DISPOSITIONS)[number]</code> | Public type alias for Runtime Timer Sweep Disposition; the declaration contains its complete type expression. |

## `RUNTIME_TIMER_SWEEP_DISPOSITIONS`

RUNTIME TIMER SWEEP DISPOSITIONS constant exported by the `contracts/runtime-timer` module.

- Kind: constant
- Import: `import { RUNTIME_TIMER_SWEEP_DISPOSITIONS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)

### Declaration

```text
export declare const RUNTIME_TIMER_SWEEP_DISPOSITIONS: readonly ["fired", "not_due", "lease_unavailable", "already_resolved"];
```

## `RuntimeTimerStreamScope`

Runtime Timer Stream Scope interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeTimerStreamScope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)

### Declaration

```text
export interface RuntimeTimerStreamScope {
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

## `RuntimeTimerSweepRequest`

Runtime Timer Sweep Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeTimerSweepRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)

### Declaration

```text
export interface RuntimeTimerSweepRequest {
    ownerId: string;
    leaseTtlMs: number;
    limit: number;
    cursor?: string;
    firedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cursor` | property | <code>cursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `firedAt` | property | <code>firedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeTimerSweepResult`

Runtime Timer Sweep Result interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeTimerSweepResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)

### Declaration

```text
export interface RuntimeTimerSweepResult {
    scanned: number;
    fired: number;
    notDue: number;
    leaseUnavailable: number;
    alreadyResolved: number;
    results: RuntimeTimerSweepRunResult[];
    nextCursor?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `alreadyResolved` | property | <code>alreadyResolved: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fired` | property | <code>fired: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseUnavailable` | property | <code>leaseUnavailable: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextCursor` | property | <code>nextCursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `notDue` | property | <code>notDue: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `results` | property | <code>results: RuntimeTimerSweepRunResult[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scanned` | property | <code>scanned: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeTimerSweepRunResult`

Runtime Timer Sweep Run Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeTimerSweepRunResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)

### Declaration

```text
export interface RuntimeTimerSweepRunResult {
    scope: RuntimeTimerStreamScope;
    disposition: RuntimeTimerSweepDisposition;
    eventIds: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `disposition` | property | <code>disposition: "lease_unavailable" &#124; "fired" &#124; "not_due" &#124; "already_resolved"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeTimerStreamScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeTimerSweepDisposition`

Public type alias for Runtime Timer Sweep Disposition; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeTimerSweepDisposition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-timer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)

### Declaration

```text
export type RuntimeTimerSweepDisposition = (typeof RUNTIME_TIMER_SWEEP_DISPOSITIONS)[number];
```
