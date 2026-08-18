# `@codesoul-co/hypha-memory` / `recovery`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)
- Exports: **6**

## Using this module

Use the Recovery module for handling bounded recovery, retry, or degradation. It exports 2 functions, 3 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  adviseMemoryRecovery,
  classifyMemoryFailure,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryFailureContext,
  MemoryRecoveryAdvice,
  MemoryRecoveryScope,
  MemoryRecoveryOperation,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adviseMemoryRecovery` | function | <code>adviseMemoryRecovery(failure: RecoveryFailure): MemoryRecoveryAdvice</code> | Advise Memory Recovery function with 1 public call signature; parameters and return types are listed below. |
| `classifyMemoryFailure` | function | <code>classifyMemoryFailure(error: unknown, context: MemoryFailureContext): RecoveryFailure</code> | Classify Memory Failure function with 1 public call signature; parameters and return types are listed below. |
| `MemoryFailureContext` | interface | <code>interface MemoryFailureContext</code> | Memory Failure Context interface with 13 public fields or methods. |
| `MemoryRecoveryAdvice` | interface | <code>interface MemoryRecoveryAdvice</code> | Memory Recovery Advice interface with 3 public fields or methods. |
| `MemoryRecoveryScope` | interface | <code>interface MemoryRecoveryScope</code> | Memory Recovery Scope interface with 4 public fields or methods. |
| `MemoryRecoveryOperation` | type | <code>type MemoryRecoveryOperation = 'read' &#124; 'search' &#124; 'write' &#124; 'update' &#124; 'invalidate' &#124; 'summarize' &#124; 'audit'</code> | Public type alias for Memory Recovery Operation; the declaration contains its complete type expression. |

## `adviseMemoryRecovery`

Advise Memory Recovery function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { adviseMemoryRecovery } from '@codesoul-co/hypha-memory';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)

### Declaration

```text
export declare function adviseMemoryRecovery(failure: RecoveryFailure): MemoryRecoveryAdvice;
```

### Call signature

```text
adviseMemoryRecovery(failure: RecoveryFailure): MemoryRecoveryAdvice
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `failure` | <code>RecoveryFailure</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryRecoveryAdvice`
- Description: The return contract is defined by the type shown above.

## `classifyMemoryFailure`

Classify Memory Failure function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { classifyMemoryFailure } from '@codesoul-co/hypha-memory';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)

### Declaration

```text
export declare function classifyMemoryFailure(error: unknown, context: MemoryFailureContext): RecoveryFailure;
```

### Call signature

```text
classifyMemoryFailure(error: unknown, context: MemoryFailureContext): RecoveryFailure
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `context` | <code>MemoryFailureContext</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RecoveryFailure`
- Description: The return contract is defined by the type shown above.

## `MemoryFailureContext`

Memory Failure Context interface with 13 public fields or methods.

- Kind: interface
- Import: `import type { MemoryFailureContext } from '@codesoul-co/hypha-memory';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)

### Declaration

```text
export interface MemoryFailureContext {
    id: string;
    operation: MemoryRecoveryOperation;
    scope: MemoryRecoveryScope;
    occurredAt?: string;
    providerId?: string;
    providerRevision?: string;
    specRevision?: string;
    policyRevision?: string;
    recordId?: string;
    idempotencyKey?: string;
    sideEffectState?: RecoverySideEffectState;
    compensationAvailable?: boolean;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compensationAvailable` | property | <code>compensationAvailable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `occurredAt` | property | <code>occurredAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: MemoryRecoveryOperation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordId` | property | <code>recordId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: MemoryRecoveryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectState` | property | <code>sideEffectState?: RecoverySideEffectState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `specRevision` | property | <code>specRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRecoveryAdvice`

Memory Recovery Advice interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRecoveryAdvice } from '@codesoul-co/hypha-memory';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)

### Declaration

```text
export interface MemoryRecoveryAdvice {
    strategy: RecoveryStrategy;
    reason: string;
    allowBoundedEmptyResult: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowBoundedEmptyResult` | property | <code>allowBoundedEmptyResult: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `strategy` | property | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRecoveryScope`

Memory Recovery Scope interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRecoveryScope } from '@codesoul-co/hypha-memory';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)

### Declaration

```text
export interface MemoryRecoveryScope {
    workspaceId?: string;
    sessionId?: string;
    runId?: string;
    userId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRecoveryOperation`

Public type alias for Memory Recovery Operation; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryRecoveryOperation } from '@codesoul-co/hypha-memory';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/recovery.ts)

### Declaration

```text
export type MemoryRecoveryOperation = 'read' | 'search' | 'write' | 'update' | 'invalidate' | 'summarize' | 'audit';
```
