# `@codesoul-co/hypha-inference` / `recovery`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)
- Exports: **6**

## Using this module

Use the Recovery module for handling bounded recovery, retry, or degradation. It exports 3 functions, 2 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  adviseInferenceRecovery,
  classifyInferenceCacheFailure,
  classifyInferenceFailure,
} from '@codesoul-co/hypha-inference';

import type {
  InferenceFailureContext,
  InferenceRecoveryAdvice,
  InferenceRecoveryOperation,
} from '@codesoul-co/hypha-inference';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adviseInferenceRecovery` | function | <code>adviseInferenceRecovery(failure: RecoveryFailure): InferenceRecoveryAdvice</code> | Advise Inference Recovery function with 1 public call signature; parameters and return types are listed below. |
| `classifyInferenceCacheFailure` | function | <code>classifyInferenceCacheFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure</code> | Classify Inference Cache Failure function with 1 public call signature; parameters and return types are listed below. |
| `classifyInferenceFailure` | function | <code>classifyInferenceFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure</code> | Classify Inference Failure function with 1 public call signature; parameters and return types are listed below. |
| `InferenceFailureContext` | interface | <code>interface InferenceFailureContext</code> | Inference Failure Context interface with 9 public fields or methods. |
| `InferenceRecoveryAdvice` | interface | <code>interface InferenceRecoveryAdvice</code> | Inference Recovery Advice interface with 4 public fields or methods. |
| `InferenceRecoveryOperation` | type | <code>type InferenceRecoveryOperation = 'infer' &#124; 'stream' &#124; 'prefix_cache_read' &#124; 'kv_cache_read' &#124; 'kv_cache_write' &#124; 'cache_invalidate'</code> | Public type alias for Inference Recovery Operation; the declaration contains its complete type expression. |

## `adviseInferenceRecovery`

Advise Inference Recovery function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { adviseInferenceRecovery } from '@codesoul-co/hypha-inference';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)

### Declaration

```text
export declare function adviseInferenceRecovery(failure: RecoveryFailure): InferenceRecoveryAdvice;
```

### Call signature

```text
adviseInferenceRecovery(failure: RecoveryFailure): InferenceRecoveryAdvice
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `failure` | <code>RecoveryFailure</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `InferenceRecoveryAdvice`
- Description: The return contract is defined by the type shown above.

## `classifyInferenceCacheFailure`

Classify Inference Cache Failure function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { classifyInferenceCacheFailure } from '@codesoul-co/hypha-inference';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)

### Declaration

```text
export declare function classifyInferenceCacheFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure;
```

### Call signature

```text
classifyInferenceCacheFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `context` | <code>InferenceFailureContext</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RecoveryFailure`
- Description: The return contract is defined by the type shown above.

## `classifyInferenceFailure`

Classify Inference Failure function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { classifyInferenceFailure } from '@codesoul-co/hypha-inference';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)

### Declaration

```text
export declare function classifyInferenceFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure;
```

### Call signature

```text
classifyInferenceFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `context` | <code>InferenceFailureContext</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RecoveryFailure`
- Description: The return contract is defined by the type shown above.

## `InferenceFailureContext`

Inference Failure Context interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { InferenceFailureContext } from '@codesoul-co/hypha-inference';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)

### Declaration

```text
export interface InferenceFailureContext {
    id: string;
    operation: InferenceRecoveryOperation;
    request: InferenceRequest;
    providerId: string;
    occurredAt?: string;
    providerRevision?: string;
    policyRevision?: string;
    specRevision?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `occurredAt` | property | <code>occurredAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: InferenceRecoveryOperation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `request` | property | <code>request: InferenceRequest&lt;unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `specRevision` | property | <code>specRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceRecoveryAdvice`

Inference Recovery Advice interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { InferenceRecoveryAdvice } from '@codesoul-co/hypha-inference';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)

### Declaration

```text
export interface InferenceRecoveryAdvice {
    strategy: RecoveryStrategy;
    reason: string;
    mayUseCompatibleProviderFallback: boolean;
    mayBypassCache: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mayBypassCache` | property | <code>mayBypassCache: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mayUseCompatibleProviderFallback` | property | <code>mayUseCompatibleProviderFallback: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `strategy` | property | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceRecoveryOperation`

Public type alias for Inference Recovery Operation; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { InferenceRecoveryOperation } from '@codesoul-co/hypha-inference';`
- Source module: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)

### Declaration

```text
export type InferenceRecoveryOperation = 'infer' | 'stream' | 'prefix_cache_read' | 'kv_cache_read' | 'kv_cache_write' | 'cache_invalidate';
```
