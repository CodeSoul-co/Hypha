# `@codesoul-co/hypha-core` / `contracts/runtime-activities`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-activities.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)
- Exports: **20**

## Using this module

Use the Runtime activities module for declaring and runtime-validating contracts. It exports 3 constants, 9 interfaces, 8 types.

### Import from the package entrypoint

```ts
import {
  RUNTIME_ACTIVITY_EFFECTS,
  RUNTIME_ACTIVITY_OBSERVATION_STATUSES,
  RUNTIME_ACTIVITY_TYPES,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeActivityDispatchPort,
  RuntimeActivityHelper,
  RuntimeActivityInvocation,
  RuntimeActivityLifecycleCommitPort,
  RuntimeActivityLifecycleCommitRequest,
  RuntimeActivityObservation,
  RuntimeActivityOptions,
  RuntimeActivityRequest,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 17 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 3 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_ACTIVITY_EFFECTS` | constant | <code>const RUNTIME_ACTIVITY_EFFECTS: readonly ["pure", "idempotent", "external_effect", "irreversible"]</code> | RUNTIME ACTIVITY EFFECTS constant exported by the `contracts/runtime-activities` module. |
| `RUNTIME_ACTIVITY_OBSERVATION_STATUSES` | constant | <code>const RUNTIME_ACTIVITY_OBSERVATION_STATUSES: readonly ["completed", "failed", "waiting", "cancelled"]</code> | RUNTIME ACTIVITY OBSERVATION STATUSES constant exported by the `contracts/runtime-activities` module. |
| `RUNTIME_ACTIVITY_TYPES` | constant | <code>const RUNTIME_ACTIVITY_TYPES: readonly ["tool", "memory", "model", "execution", "custom"]</code> | RUNTIME ACTIVITY TYPES constant exported by the `contracts/runtime-activities` module. |
| `RuntimeActivityDispatchPort` | interface | <code>interface RuntimeActivityDispatchPort</code> | Runtime Activity Dispatch Port interface with 1 public fields or methods. |
| `RuntimeActivityHelper` | interface | <code>interface RuntimeActivityHelper</code> | Runtime Activity Helper interface with 5 public fields or methods. |
| `RuntimeActivityInvocation` | interface | <code>interface RuntimeActivityInvocation</code> | Runtime Activity Invocation interface with 17 public fields or methods. |
| `RuntimeActivityLifecycleCommitPort` | interface | <code>interface RuntimeActivityLifecycleCommitPort</code> | Runtime Activity Lifecycle Commit Port interface with 1 public fields or methods. |
| `RuntimeActivityLifecycleCommitRequest` | interface | <code>interface RuntimeActivityLifecycleCommitRequest</code> | Runtime Activity Lifecycle Commit Request interface with 4 public fields or methods. |
| `RuntimeActivityObservation` | interface | <code>interface RuntimeActivityObservation</code> | Runtime Activity Observation interface with 8 public fields or methods. |
| `RuntimeActivityOptions` | interface | <code>interface RuntimeActivityOptions</code> | Runtime Activity Options interface with 6 public fields or methods. |
| `RuntimeActivityRequest` | interface | <code>interface RuntimeActivityRequest</code> | Runtime Activity Request interface with 3 public fields or methods. |
| `RuntimeActivityRetryOptions` | interface | <code>interface RuntimeActivityRetryOptions</code> | Runtime Activity Retry Options interface with 3 public fields or methods. |
| `RuntimeActivityEffect` | type | <code>type RuntimeActivityEffect = (typeof RUNTIME_ACTIVITY_EFFECTS)[number]</code> | Public type alias for Runtime Activity Effect; the declaration contains its complete type expression. |
| `RuntimeActivityObservationStatus` | type | <code>type RuntimeActivityObservationStatus = (typeof RUNTIME_ACTIVITY_OBSERVATION_STATUSES)[number]</code> | Public type alias for Runtime Activity Observation Status; the declaration contains its complete type expression. |
| `RuntimeActivityType` | type | <code>type RuntimeActivityType = (typeof RUNTIME_ACTIVITY_TYPES)[number]</code> | Public type alias for Runtime Activity Type; the declaration contains its complete type expression. |
| `RuntimeCustomActivityRequest` | type | <code>type RuntimeCustomActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Public type alias for Runtime Custom Activity Request; the declaration contains its complete type expression. |
| `RuntimeExecutionActivityRequest` | type | <code>type RuntimeExecutionActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Public type alias for Runtime Execution Activity Request; the declaration contains its complete type expression. |
| `RuntimeMemoryActivityRequest` | type | <code>type RuntimeMemoryActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Public type alias for Runtime Memory Activity Request; the declaration contains its complete type expression. |
| `RuntimeModelActivityRequest` | type | <code>type RuntimeModelActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Public type alias for Runtime Model Activity Request; the declaration contains its complete type expression. |
| `RuntimeToolActivityRequest` | type | <code>type RuntimeToolActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Public type alias for Runtime Tool Activity Request; the declaration contains its complete type expression. |

## `RUNTIME_ACTIVITY_EFFECTS`

RUNTIME ACTIVITY EFFECTS constant exported by the `contracts/runtime-activities` module.

- Kind: constant
- Import: `import { RUNTIME_ACTIVITY_EFFECTS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export declare const RUNTIME_ACTIVITY_EFFECTS: readonly ["pure", "idempotent", "external_effect", "irreversible"];
```

## `RUNTIME_ACTIVITY_OBSERVATION_STATUSES`

RUNTIME ACTIVITY OBSERVATION STATUSES constant exported by the `contracts/runtime-activities` module.

- Kind: constant
- Import: `import { RUNTIME_ACTIVITY_OBSERVATION_STATUSES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export declare const RUNTIME_ACTIVITY_OBSERVATION_STATUSES: readonly ["completed", "failed", "waiting", "cancelled"];
```

## `RUNTIME_ACTIVITY_TYPES`

RUNTIME ACTIVITY TYPES constant exported by the `contracts/runtime-activities` module.

- Kind: constant
- Import: `import { RUNTIME_ACTIVITY_TYPES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export declare const RUNTIME_ACTIVITY_TYPES: readonly ["tool", "memory", "model", "execution", "custom"];
```

## `RuntimeActivityDispatchPort`

Runtime Activity Dispatch Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityDispatchPort } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export interface RuntimeActivityDispatchPort {
    dispatch(invocation: RuntimeActivityInvocation, abortSignal: AbortSignal): Promise<RuntimeActivityObservation>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dispatch` | method | <code>dispatch(invocation: RuntimeActivityInvocation, abortSignal: AbortSignal): Promise&lt;RuntimeActivityObservation&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeActivityHelper`

Runtime Activity Helper interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityHelper } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export interface RuntimeActivityHelper {
    tool(request: RuntimeToolActivityRequest): Promise<RuntimeActivityObservation>;
    memory(request: RuntimeMemoryActivityRequest): Promise<RuntimeActivityObservation>;
    model(request: RuntimeModelActivityRequest): Promise<RuntimeActivityObservation>;
    execution(request: RuntimeExecutionActivityRequest): Promise<RuntimeActivityObservation>;
    custom(request: RuntimeCustomActivityRequest): Promise<RuntimeActivityObservation>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `custom` | method | <code>custom(request: RuntimeCustomActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `execution` | method | <code>execution(request: RuntimeExecutionActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `memory` | method | <code>memory(request: RuntimeMemoryActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `model` | method | <code>model(request: RuntimeModelActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `tool` | method | <code>tool(request: RuntimeToolActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeActivityInvocation`

Runtime Activity Invocation interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityInvocation } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export interface RuntimeActivityInvocation<TInput extends RuntimeJsonValue = RuntimeJsonValue> {
    activityId: string;
    operationId: string;
    activityType: RuntimeActivityType;
    target: string;
    input: TInput;
    scope: RuntimeScope;
    stateId: string;
    stateAttempt: number;
    fencingToken: number;
    correlationId: string;
    causationId?: string;
    idempotencyKey: string;
    requestedAt: string;
    effect: RuntimeActivityEffect;
    timeoutMs?: number;
    retry?: RuntimeActivityRetryOptions;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `activityType` | property | <code>activityType: "memory" &#124; "tool" &#124; "model" &#124; "custom" &#124; "execution"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `effect` | property | <code>effect: "external_effect" &#124; "irreversible" &#124; "pure" &#124; "idempotent"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retry` | property | <code>retry?: RuntimeActivityRetryOptions</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `target` | property | <code>target: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityLifecycleCommitPort`

Runtime Activity Lifecycle Commit Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityLifecycleCommitPort } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export interface RuntimeActivityLifecycleCommitPort {
    append(request: RuntimeActivityLifecycleCommitRequest): Promise<FrameworkEvent>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: RuntimeActivityLifecycleCommitRequest): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeActivityLifecycleCommitRequest`

Runtime Activity Lifecycle Commit Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityLifecycleCommitRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export interface RuntimeActivityLifecycleCommitRequest {
    execution: RuntimeHelperExecutionScope;
    event: EventCreateInput;
    fencingToken: number;
    idempotencyKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `event` | property | <code>event: EventCreateInput&lt;unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `execution` | property | <code>execution: RuntimeHelperExecutionScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityObservation`

Runtime Activity Observation interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityObservation } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export interface RuntimeActivityObservation<TOutput extends RuntimeJsonValue = RuntimeJsonValue> {
    activityId: string;
    status: RuntimeActivityObservationStatus;
    eventIds: string[];
    output?: TOutput;
    artifactRefs?: string[];
    retryable?: boolean;
    error?: NormalizedRuntimeError;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedRuntimeError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: TOutput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "waiting"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityOptions`

Runtime Activity Options interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityOptions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export interface RuntimeActivityOptions {
    effect?: RuntimeActivityEffect;
    timeoutMs?: number;
    retry?: RuntimeActivityRetryOptions;
    idempotencyKey?: string;
    causationId?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `effect` | property | <code>effect?: "external_effect" &#124; "irreversible" &#124; "pure" &#124; "idempotent"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retry` | property | <code>retry?: RuntimeActivityRetryOptions</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityRequest`

Runtime Activity Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export interface RuntimeActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> {
    target: string;
    input: TInput;
    options?: RuntimeActivityOptions;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `input` | property | <code>input: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `options` | property | <code>options?: RuntimeActivityOptions</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `target` | property | <code>target: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityRetryOptions`

Runtime Activity Retry Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityRetryOptions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export interface RuntimeActivityRetryOptions {
    maxAttempts: number;
    initialDelayMs?: number;
    maxDelayMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `initialDelayMs` | property | <code>initialDelayMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxDelayMs` | property | <code>maxDelayMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityEffect`

Public type alias for Runtime Activity Effect; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeActivityEffect } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export type RuntimeActivityEffect = (typeof RUNTIME_ACTIVITY_EFFECTS)[number];
```

## `RuntimeActivityObservationStatus`

Public type alias for Runtime Activity Observation Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeActivityObservationStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export type RuntimeActivityObservationStatus = (typeof RUNTIME_ACTIVITY_OBSERVATION_STATUSES)[number];
```

## `RuntimeActivityType`

Public type alias for Runtime Activity Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeActivityType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export type RuntimeActivityType = (typeof RUNTIME_ACTIVITY_TYPES)[number];
```

## `RuntimeCustomActivityRequest`

Public type alias for Runtime Custom Activity Request; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeCustomActivityRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export type RuntimeCustomActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> = RuntimeActivityRequest<TInput>;
```

## `RuntimeExecutionActivityRequest`

Public type alias for Runtime Execution Activity Request; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeExecutionActivityRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export type RuntimeExecutionActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> = RuntimeActivityRequest<TInput>;
```

## `RuntimeMemoryActivityRequest`

Public type alias for Runtime Memory Activity Request; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeMemoryActivityRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export type RuntimeMemoryActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> = RuntimeActivityRequest<TInput>;
```

## `RuntimeModelActivityRequest`

Public type alias for Runtime Model Activity Request; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeModelActivityRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export type RuntimeModelActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> = RuntimeActivityRequest<TInput>;
```

## `RuntimeToolActivityRequest`

Public type alias for Runtime Tool Activity Request; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeToolActivityRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)

### Declaration

```text
export type RuntimeToolActivityRequest<TInput extends RuntimeJsonValue = RuntimeJsonValue> = RuntimeActivityRequest<TInput>;
```
