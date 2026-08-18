# `@codesoul-co/hypha-core` / `modules/execution/recovery`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/recovery.ts)
- Exports: **5**

## Using this module

Use the Recovery module for executing runtime behavior at this boundary. It exports 2 functions, 2 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  adviseExecutionRecovery,
  classifyExecutionFailure,
} from '@codesoul-co/hypha-core';

import type {
  ExecutionFailureContext,
  ExecutionRecoveryAdvice,
  ExecutionRecoveryOperation,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adviseExecutionRecovery` | function | <code>adviseExecutionRecovery(failure: RecoveryFailure): ExecutionRecoveryAdvice</code> | Advise Execution Recovery function with 1 public call signature; parameters and return types are listed below. |
| `classifyExecutionFailure` | function | <code>classifyExecutionFailure(error: unknown, context: ExecutionFailureContext): RecoveryFailure</code> | Classify Execution Failure function with 1 public call signature; parameters and return types are listed below. |
| `ExecutionFailureContext` | interface | <code>interface ExecutionFailureContext</code> | Execution Failure Context interface with 14 public fields or methods. |
| `ExecutionRecoveryAdvice` | interface | <code>interface ExecutionRecoveryAdvice</code> | Execution Recovery Advice interface with 4 public fields or methods. |
| `ExecutionRecoveryOperation` | type | <code>type ExecutionRecoveryOperation = 'validate' &#124; 'queue' &#124; 'start' &#124; 'poll' &#124; 'cancel' &#124; 'persist' &#124; 'cleanup'</code> | Public type alias for Execution Recovery Operation; the declaration contains its complete type expression. |

## `adviseExecutionRecovery`

Advise Execution Recovery function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { adviseExecutionRecovery } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/recovery.ts)

### Declaration

```text
export declare function adviseExecutionRecovery(failure: RecoveryFailure): ExecutionRecoveryAdvice;
```

### Call signature

```text
adviseExecutionRecovery(failure: RecoveryFailure): ExecutionRecoveryAdvice
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `failure` | <code>RecoveryFailure</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionRecoveryAdvice`
- Description: The return contract is defined by the type shown above.

## `classifyExecutionFailure`

Classify Execution Failure function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { classifyExecutionFailure } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/recovery.ts)

### Declaration

```text
export declare function classifyExecutionFailure(error: unknown, context: ExecutionFailureContext): RecoveryFailure;
```

### Call signature

```text
classifyExecutionFailure(error: unknown, context: ExecutionFailureContext): RecoveryFailure
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `context` | <code>ExecutionFailureContext</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RecoveryFailure`
- Description: The return contract is defined by the type shown above.

## `ExecutionFailureContext`

Execution Failure Context interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionFailureContext } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/recovery.ts)

### Declaration

```text
export interface ExecutionFailureContext {
    id: string;
    operation: ExecutionRecoveryOperation;
    occurredAt?: string;
    request?: CommandExecutionRequest;
    record?: ExecutionRecord;
    result?: CommandExecutionResult;
    assessment?: ExecutionRecoveryAssessment;
    providerId?: string;
    providerRevision?: string;
    policyRevision?: string;
    specRevision?: string;
    sideEffectState?: RecoverySideEffectState;
    compensationAvailable?: boolean;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assessment` | property | <code>assessment?: ExecutionRecoveryAssessment</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `compensationAvailable` | property | <code>compensationAvailable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `occurredAt` | property | <code>occurredAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: ExecutionRecoveryOperation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `record` | property | <code>record?: ExecutionRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `request` | property | <code>request?: CommandExecutionRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `result` | property | <code>result?: CommandExecutionResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectState` | property | <code>sideEffectState?: RecoverySideEffectState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `specRevision` | property | <code>specRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionRecoveryAdvice`

Execution Recovery Advice interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionRecoveryAdvice } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/recovery.ts)

### Declaration

```text
export interface ExecutionRecoveryAdvice {
    strategy: RecoveryStrategy;
    reason: string;
    refreshRecordBeforeRetry: boolean;
    requireReceiptReconciliation: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `refreshRecordBeforeRetry` | property | <code>refreshRecordBeforeRetry: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireReceiptReconciliation` | property | <code>requireReceiptReconciliation: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `strategy` | property | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionRecoveryOperation`

Public type alias for Execution Recovery Operation; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionRecoveryOperation } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/recovery.ts)

### Declaration

```text
export type ExecutionRecoveryOperation = 'validate' | 'queue' | 'start' | 'poll' | 'cancel' | 'persist' | 'cleanup';
```
