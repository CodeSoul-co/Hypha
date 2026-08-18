# `@codesoul-co/hypha-storage` / `recovery`

- Package index: [`@codesoul-co/hypha-storage`](/api/storage)
- Source: [`packages/storage/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts)
- Exports: **5**

## Using this module

Use the Recovery module for handling bounded recovery, retry, or degradation. It exports 2 functions, 2 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  adviseStorageRecovery,
  classifyStorageFailure,
} from '@codesoul-co/hypha-storage';

import type {
  StorageFailureContext,
  StorageRecoveryAdvice,
  StorageRecoveryOperation,
} from '@codesoul-co/hypha-storage';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adviseStorageRecovery` | function | <code>adviseStorageRecovery(failure: RecoveryFailure): StorageRecoveryAdvice</code> | Advise Storage Recovery function with 1 public call signature; parameters and return types are listed below. |
| `classifyStorageFailure` | function | <code>classifyStorageFailure(error: unknown, context: StorageFailureContext): RecoveryFailure</code> | Converts provider-specific storage errors into the shared recovery contract. Mutations default to an unknown commit state unless a receipt or the caller proves otherwise; this prevents blind replay after an ambiguous disconnect. |
| `StorageFailureContext` | interface | <code>interface StorageFailureContext</code> | Storage Failure Context interface with 17 public fields or methods. |
| `StorageRecoveryAdvice` | interface | <code>interface StorageRecoveryAdvice</code> | Storage Recovery Advice interface with 6 public fields or methods. |
| `StorageRecoveryOperation` | type | <code>type StorageRecoveryOperation = 'read' &#124; 'query' &#124; 'list' &#124; 'write' &#124; 'update' &#124; 'delete' &#124; 'transaction_begin' &#124; 'transaction_commit' &#124; 'transaction_rollback' &#124; 'event_append' &#124; 'artifact_write' &#124; 'artifact_delete' &#124; 'lease_acquire' &#124; 'lease_renew' &#124; 'lease_release' &#124; 'snapshot' &#124; 'restore'</code> | Public type alias for Storage Recovery Operation; the declaration contains its complete type expression. |

## `adviseStorageRecovery`

Advise Storage Recovery function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { adviseStorageRecovery } from '@codesoul-co/hypha-storage';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts)

### Declaration

```text
export declare function adviseStorageRecovery(failure: RecoveryFailure): StorageRecoveryAdvice;
```

### Call signature

```text
adviseStorageRecovery(failure: RecoveryFailure): StorageRecoveryAdvice
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `failure` | <code>RecoveryFailure</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `StorageRecoveryAdvice`
- Description: The return contract is defined by the type shown above.

## `classifyStorageFailure`

Converts provider-specific storage errors into the shared recovery contract. Mutations default to an unknown commit state unless a receipt or the caller proves otherwise; this prevents blind replay after an ambiguous disconnect.

- Kind: function
- Import: `import { classifyStorageFailure } from '@codesoul-co/hypha-storage';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts)

### Declaration

```text
export declare function classifyStorageFailure(error: unknown, context: StorageFailureContext): RecoveryFailure;
```

### Call signature

```text
classifyStorageFailure(error: unknown, context: StorageFailureContext): RecoveryFailure
```

Converts provider-specific storage errors into the shared recovery contract. Mutations default to an unknown commit state unless a receipt or the caller proves otherwise; this prevents blind replay after an ambiguous disconnect.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `context` | <code>StorageFailureContext</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RecoveryFailure`
- Description: The return contract is defined by the type shown above.

## `StorageFailureContext`

Storage Failure Context interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { StorageFailureContext } from '@codesoul-co/hypha-storage';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts)

### Declaration

```text
export interface StorageFailureContext {
    id: string;
    operation: StorageRecoveryOperation;
    providerId: string;
    role: StorageRole;
    engine?: StorageEngine;
    resourceKey?: string;
    occurredAt?: string;
    providerRevision?: string;
    specRevision?: string;
    policyRevision?: string;
    expectedRevision?: string | number;
    observedRevision?: string | number;
    idempotencyKey?: string;
    input?: unknown;
    sideEffectState?: RecoverySideEffectState;
    compensationAvailable?: boolean;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compensationAvailable` | property | <code>compensationAvailable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `engine` | property | <code>engine?: StorageEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRevision` | property | <code>expectedRevision?: string &#124; number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observedRevision` | property | <code>observedRevision?: string &#124; number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `occurredAt` | property | <code>occurredAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: StorageRecoveryOperation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceKey` | property | <code>resourceKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `role` | property | <code>role: StorageRole</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectState` | property | <code>sideEffectState?: RecoverySideEffectState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `specRevision` | property | <code>specRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StorageRecoveryAdvice`

Storage Recovery Advice interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { StorageRecoveryAdvice } from '@codesoul-co/hypha-storage';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts)

### Declaration

```text
export interface StorageRecoveryAdvice {
    strategy: RecoveryStrategy;
    reason: string;
    requireReconciliation: boolean;
    refreshRevisionBeforeRetry: boolean;
    mayUseCompatibleReplica: boolean;
    invalidateDerivedCaches: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `invalidateDerivedCaches` | property | <code>invalidateDerivedCaches: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mayUseCompatibleReplica` | property | <code>mayUseCompatibleReplica: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `refreshRevisionBeforeRetry` | property | <code>refreshRevisionBeforeRetry: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireReconciliation` | property | <code>requireReconciliation: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `strategy` | property | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StorageRecoveryOperation`

Public type alias for Storage Recovery Operation; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { StorageRecoveryOperation } from '@codesoul-co/hypha-storage';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts)

### Declaration

```text
export type StorageRecoveryOperation = 'read' | 'query' | 'list' | 'write' | 'update' | 'delete' | 'transaction_begin' | 'transaction_commit' | 'transaction_rollback' | 'event_append' | 'artifact_write' | 'artifact_delete' | 'lease_acquire' | 'lease_renew' | 'lease_release' | 'snapshot' | 'restore';
```
