# `@codesoul-co/hypha-memory` / `bounded-recovery`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/bounded-recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts)
- Exports: **5**

## Using this module

Use the Bounded recovery module for handling bounded recovery, retry, or degradation. It exports 2 functions, 2 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  createMemoryFailureFingerprint,
  resolveBoundedMemoryRecovery,
} from '@codesoul-co/hypha-memory';

import type {
  BoundedMemoryRecoveryOutcome,
  MemoryRecoveryBudget,
  MemoryRunRecoveryState,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createMemoryFailureFingerprint` | function | <code>createMemoryFailureFingerprint(failure: RecoveryFailure): string</code> | Create Memory Failure Fingerprint function with 1 public call signature; parameters and return types are listed below. |
| `resolveBoundedMemoryRecovery` | function | <code>resolveBoundedMemoryRecovery(failure: RecoveryFailure, budget: MemoryRecoveryBudget): BoundedMemoryRecoveryOutcome</code> | Resolve Bounded Memory Recovery function with 1 public call signature; parameters and return types are listed below. |
| `BoundedMemoryRecoveryOutcome` | interface | <code>interface BoundedMemoryRecoveryOutcome</code> | Bounded Memory Recovery Outcome interface with 7 public fields or methods. |
| `MemoryRecoveryBudget` | interface | <code>interface MemoryRecoveryBudget</code> | Memory Recovery Budget interface with 5 public fields or methods. |
| `MemoryRunRecoveryState` | type | <code>type MemoryRunRecoveryState = 'degraded' &#124; 'waiting' &#124; 'review' &#124; 'quarantined' &#124; 'failed'</code> | Public type alias for Memory Run Recovery State; the declaration contains its complete type expression. |

## `createMemoryFailureFingerprint`

Create Memory Failure Fingerprint function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createMemoryFailureFingerprint } from '@codesoul-co/hypha-memory';`
- Source module: [`bounded-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts)

### Declaration

```text
export declare function createMemoryFailureFingerprint(failure: RecoveryFailure): string;
```

### Call signature

```text
createMemoryFailureFingerprint(failure: RecoveryFailure): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `failure` | <code>RecoveryFailure</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `resolveBoundedMemoryRecovery`

Resolve Bounded Memory Recovery function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { resolveBoundedMemoryRecovery } from '@codesoul-co/hypha-memory';`
- Source module: [`bounded-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts)

### Declaration

```text
export declare function resolveBoundedMemoryRecovery(failure: RecoveryFailure, budget: MemoryRecoveryBudget): BoundedMemoryRecoveryOutcome;
```

### Call signature

```text
resolveBoundedMemoryRecovery(failure: RecoveryFailure, budget: MemoryRecoveryBudget): BoundedMemoryRecoveryOutcome
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `failure` | <code>RecoveryFailure</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `budget` | <code>MemoryRecoveryBudget</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `BoundedMemoryRecoveryOutcome`
- Description: The return contract is defined by the type shown above.

## `BoundedMemoryRecoveryOutcome`

Bounded Memory Recovery Outcome interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { BoundedMemoryRecoveryOutcome } from '@codesoul-co/hypha-memory';`
- Source module: [`bounded-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts)

### Declaration

```text
export interface BoundedMemoryRecoveryOutcome {
    state: MemoryRunRecoveryState;
    strategy: ReturnType<typeof adviseMemoryRecovery>['strategy'];
    retryAllowed: boolean;
    boundedEmptyResultAllowed: boolean;
    failureFingerprint: string;
    reason: string;
    nextAttempt?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `boundedEmptyResultAllowed` | property | <code>boundedEmptyResultAllowed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failureFingerprint` | property | <code>failureFingerprint: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextAttempt` | property | <code>nextAttempt?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryAllowed` | property | <code>retryAllowed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: MemoryRunRecoveryState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `strategy` | property | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRecoveryBudget`

Memory Recovery Budget interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRecoveryBudget } from '@codesoul-co/hypha-memory';`
- Source module: [`bounded-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts)

### Declaration

```text
export interface MemoryRecoveryBudget {
    maxAttempts: number;
    attemptsUsed: number;
    deadline?: string;
    now?: string;
    seenFailureFingerprints?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attemptsUsed` | property | <code>attemptsUsed: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadline` | property | <code>deadline?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | property | <code>now?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `seenFailureFingerprints` | property | <code>seenFailureFingerprints?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRunRecoveryState`

Public type alias for Memory Run Recovery State; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryRunRecoveryState } from '@codesoul-co/hypha-memory';`
- Source module: [`bounded-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts)

### Declaration

```text
export type MemoryRunRecoveryState = 'degraded' | 'waiting' | 'review' | 'quarantined' | 'failed';
```
