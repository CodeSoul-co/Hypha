# `@codesoul-co/hypha-core` / `contracts/runtime-helpers`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-helpers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)
- Exports: **33**

## Using this module

Use the Runtime helpers module for declaring and runtime-validating contracts. It exports 2 constants, 27 interfaces, 4 types.

### Import from the package entrypoint

```ts
import {
  RUNTIME_DETERMINISTIC_OBSERVATION_KINDS,
  RUNTIME_WAIT_INTENT_TYPES,
} from '@codesoul-co/hypha-core';

import type {
  HumanWaitRequest,
  PauseRequest,
  RuntimeClockHelper,
  RuntimeDeterminismResolution,
  RuntimeDeterminismResolveRequest,
  RuntimeDeterminismScope,
  RuntimeDeterminismStore,
  RuntimeDeterministicObservation,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 31 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_DETERMINISTIC_OBSERVATION_KINDS` | constant | <code>const RUNTIME_DETERMINISTIC_OBSERVATION_KINDS: readonly ["clock", "id"]</code> | RUNTIME DETERMINISTIC OBSERVATION KINDS constant exported by the `contracts/runtime-helpers` module. |
| `RUNTIME_WAIT_INTENT_TYPES` | constant | <code>const RUNTIME_WAIT_INTENT_TYPES: readonly ["human", "signal", "timer", "pause"]</code> | RUNTIME WAIT INTENT TYPES constant exported by the `contracts/runtime-helpers` module. |
| `HumanWaitRequest` | interface | <code>interface HumanWaitRequest</code> | Human Wait Request interface with 5 public fields or methods. |
| `PauseRequest` | interface | <code>interface PauseRequest</code> | Pause Request interface with 3 public fields or methods. |
| `RuntimeClockHelper` | interface | <code>interface RuntimeClockHelper</code> | Runtime Clock Helper interface with 2 public fields or methods. |
| `RuntimeDeterminismResolution` | interface | <code>interface RuntimeDeterminismResolution</code> | Runtime Determinism Resolution interface with 2 public fields or methods. |
| `RuntimeDeterminismResolveRequest` | interface | <code>interface RuntimeDeterminismResolveRequest</code> | Runtime Determinism Resolve Request interface with 3 public fields or methods. |
| `RuntimeDeterminismScope` | interface | <code>interface RuntimeDeterminismScope</code> | Runtime Determinism Scope interface with 5 public fields or methods. |
| `RuntimeDeterminismStore` | interface | <code>interface RuntimeDeterminismStore</code> | Runtime Determinism Store interface with 1 public fields or methods. |
| `RuntimeDeterministicObservation` | interface | <code>interface RuntimeDeterministicObservation</code> | Runtime Deterministic Observation interface with 4 public fields or methods. |
| `RuntimeEventAppendOptions` | interface | <code>interface RuntimeEventAppendOptions</code> | Runtime Event Append Options interface with 4 public fields or methods. |
| `RuntimeEventCommitPort` | interface | <code>interface RuntimeEventCommitPort</code> | Runtime Event Commit Port interface with 2 public fields or methods. |
| `RuntimeEventCommitRequest` | interface | <code>interface RuntimeEventCommitRequest</code> | Runtime Event Commit Request interface with 4 public fields or methods. |
| `RuntimeEventHelper` | interface | <code>interface RuntimeEventHelper</code> | Runtime Event Helper interface with 3 public fields or methods. |
| `RuntimeHelperExecutionScope` | interface | <code>interface RuntimeHelperExecutionScope</code> | Runtime Helper Execution Scope interface with 6 public fields or methods. |
| `RuntimeHelperSdk` | interface | <code>interface RuntimeHelperSdk</code> | Runtime Helper Sdk interface with 4 public fields or methods. |
| `RuntimeIdHelper` | interface | <code>interface RuntimeIdHelper</code> | Runtime ID Helper interface with 1 public fields or methods. |
| `RuntimeIoHelperSdk` | interface | <code>interface RuntimeIoHelperSdk</code> | Runtime Io Helper Sdk interface with 2 public fields or methods. |
| `RuntimeObservationEventInput` | interface | <code>interface RuntimeObservationEventInput</code> | Runtime Observation Event Input interface with 3 public fields or methods. |
| `RuntimeResourceAcquireOptions` | interface | <code>interface RuntimeResourceAcquireOptions</code> | Runtime Resource Acquire Options interface with 2 public fields or methods. |
| `RuntimeResourceHelper` | interface | <code>interface RuntimeResourceHelper</code> | Runtime Resource Helper interface with 4 public fields or methods. |
| `RuntimeResourceHelperDependencies` | interface | <code>interface RuntimeResourceHelperDependencies</code> | Runtime Resource Helper Dependencies interface with 5 public fields or methods. |
| `RuntimeResourceRenewOptions` | interface | <code>interface RuntimeResourceRenewOptions</code> | Runtime Resource Renew Options interface with 1 public fields or methods. |
| `RuntimeTransitionHelper` | interface | <code>interface RuntimeTransitionHelper</code> | Runtime Transition Helper interface with 4 public fields or methods. |
| `RuntimeTransitionProposal` | interface | <code>interface RuntimeTransitionProposal</code> | Runtime Transition Proposal interface with 3 public fields or methods. |
| `RuntimeWaitHelper` | interface | <code>interface RuntimeWaitHelper</code> | Runtime Wait Helper interface with 4 public fields or methods. |
| `RuntimeWaitIntent` | interface | <code>interface RuntimeWaitIntent</code> | Runtime Wait Intent interface with 8 public fields or methods. |
| `SignalWaitRequest` | interface | <code>interface SignalWaitRequest</code> | Signal Wait Request interface with 5 public fields or methods. |
| `TimerWaitRequest` | interface | <code>interface TimerWaitRequest</code> | Timer Wait Request interface with 3 public fields or methods. |
| `RuntimeDeterministicObservationKind` | type | <code>type RuntimeDeterministicObservationKind = (typeof RUNTIME_DETERMINISTIC_OBSERVATION_KINDS)[number]</code> | Public type alias for Runtime Deterministic Observation Kind; the declaration contains its complete type expression. |
| `RuntimeJsonValue` | type | <code>type RuntimeJsonValue = null &#124; boolean &#124; number &#124; string &#124; RuntimeJsonValue[] &#124; { [key: string]: RuntimeJsonValue; }</code> | Public type alias for Runtime JSON Value; the declaration contains its complete type expression. |
| `RuntimeStateExecutionResult` | type | <code>type RuntimeStateExecutionResult = { kind: 'completed'; output?: RuntimeJsonValue; variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;; } &#124; { kind: 'continued'; observation?: RuntimeJsonValue; } &#124; { kind: 'failed'; error: NormalizedRuntimeError; } &#124; { kind: 'waiting'; wait: RuntimeWaitIntent; }</code> | Public type alias for Runtime State Execution Result; the declaration contains its complete type expression. |
| `RuntimeWaitIntentType` | type | <code>type RuntimeWaitIntentType = (typeof RUNTIME_WAIT_INTENT_TYPES)[number]</code> | Public type alias for Runtime Wait Intent Type; the declaration contains its complete type expression. |

## `RUNTIME_DETERMINISTIC_OBSERVATION_KINDS`

RUNTIME DETERMINISTIC OBSERVATION KINDS constant exported by the `contracts/runtime-helpers` module.

- Kind: constant
- Import: `import { RUNTIME_DETERMINISTIC_OBSERVATION_KINDS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export declare const RUNTIME_DETERMINISTIC_OBSERVATION_KINDS: readonly ["clock", "id"];
```

## `RUNTIME_WAIT_INTENT_TYPES`

RUNTIME WAIT INTENT TYPES constant exported by the `contracts/runtime-helpers` module.

- Kind: constant
- Import: `import { RUNTIME_WAIT_INTENT_TYPES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export declare const RUNTIME_WAIT_INTENT_TYPES: readonly ["human", "signal", "timer", "pause"];
```

## `HumanWaitRequest`

Human Wait Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { HumanWaitRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface HumanWaitRequest {
    key?: string;
    expiresAt?: string;
    timeoutTransitionId?: string;
    pendingActionRef?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingActionRef` | property | <code>pendingActionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutTransitionId` | property | <code>timeoutTransitionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PauseRequest`

Pause Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { PauseRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface PauseRequest {
    reason: string;
    resumeKey?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `metadata` | property | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resumeKey` | property | <code>resumeKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeClockHelper`

Runtime Clock Helper interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeClockHelper } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeClockHelper {
    now(): Promise<string>;
    sleepUntil(isoTime: string): Promise<RuntimeStateExecutionResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now(): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `sleepUntil` | method | <code>sleepUntil(isoTime: string): Promise&lt;RuntimeStateExecutionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeDeterminismResolution`

Runtime Determinism Resolution interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeDeterminismResolution } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeDeterminismResolution<T extends RuntimeJsonValue = RuntimeJsonValue> {
    observation: RuntimeDeterministicObservation<T>;
    reused: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `observation` | property | <code>observation: RuntimeDeterministicObservation&lt;T&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reused` | property | <code>reused: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeDeterminismResolveRequest`

Runtime Determinism Resolve Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeDeterminismResolveRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeDeterminismResolveRequest {
    scope: RuntimeDeterminismScope;
    key: string;
    kind: RuntimeDeterministicObservationKind;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `key` | property | <code>key: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "clock" &#124; "id"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeDeterminismScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeDeterminismScope`

Runtime Determinism Scope interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeDeterminismScope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeDeterminismScope {
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

## `RuntimeDeterminismStore`

Runtime Determinism Store interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeDeterminismStore } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeDeterminismStore {
    resolve<T extends RuntimeJsonValue>(request: RuntimeDeterminismResolveRequest, produce: () => T | Promise<T>): Promise<RuntimeDeterminismResolution<T>>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `resolve` | method | <code>resolve&lt;T extends RuntimeJsonValue&gt;(request: RuntimeDeterminismResolveRequest, produce: () =&gt; T &#124; Promise&lt;T&gt;): Promise&lt;RuntimeDeterminismResolution&lt;T&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeDeterministicObservation`

Runtime Deterministic Observation interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeDeterministicObservation } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeDeterministicObservation<T extends RuntimeJsonValue = RuntimeJsonValue> {
    scope: RuntimeDeterminismScope;
    key: string;
    kind: RuntimeDeterministicObservationKind;
    value: T;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `key` | property | <code>key: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "clock" &#124; "id"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeDeterminismScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `value` | property | <code>value: T</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeEventAppendOptions`

Runtime Event Append Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeEventAppendOptions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeEventAppendOptions {
    idempotencyKey?: string;
    causationId?: string;
    parentEventId?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parentEventId` | property | <code>parentEventId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeEventCommitPort`

Runtime Event Commit Port interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeEventCommitPort } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeEventCommitPort {
    append(request: RuntimeEventCommitRequest): Promise<FrameworkEvent[]>;
    readSince(scope: RuntimeScope, sequence: number): Promise<FrameworkEvent[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: RuntimeEventCommitRequest): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `readSince` | method | <code>readSince(scope: RuntimeScope, sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeEventCommitRequest`

Runtime Event Commit Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeEventCommitRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeEventCommitRequest {
    scope: RuntimeHelperExecutionScope;
    events: EventCreateInput[];
    fencingToken: number;
    idempotencyKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: EventCreateInput&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeHelperExecutionScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeEventHelper`

Runtime Event Helper interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeEventHelper } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeEventHelper {
    append<T extends RuntimeJsonValue>(type: RuntimeObservationEventType, payload: T, options?: RuntimeEventAppendOptions): Promise<FrameworkEvent<T>>;
    appendBatch(inputs: RuntimeObservationEventInput[]): Promise<FrameworkEvent[]>;
    readSince(sequence: number): Promise<FrameworkEvent[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append&lt;T extends RuntimeJsonValue&gt;(type: RuntimeObservationEventType, payload: T, options?: RuntimeEventAppendOptions): Promise&lt;FrameworkEvent&lt;T&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `appendBatch` | method | <code>appendBatch(inputs: RuntimeObservationEventInput[]): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `readSince` | method | <code>readSince(sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeHelperExecutionScope`

Runtime Helper Execution Scope interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeHelperExecutionScope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeHelperExecutionScope {
    scope: RuntimeScope;
    stateId: string;
    stateAttempt: number;
    fencingToken: number;
    correlationId: string;
    causationId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeHelperSdk`

Runtime Helper Sdk interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeHelperSdk } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeHelperSdk {
    readonly transitions: RuntimeTransitionHelper;
    readonly waits: RuntimeWaitHelper;
    readonly clock: RuntimeClockHelper;
    readonly ids: RuntimeIdHelper;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clock` | property | <code>readonly clock: RuntimeClockHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ids` | property | <code>readonly ids: RuntimeIdHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transitions` | property | <code>readonly transitions: RuntimeTransitionHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `waits` | property | <code>readonly waits: RuntimeWaitHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeIdHelper`

Runtime ID Helper interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeIdHelper } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeIdHelper {
    next(namespace: string): Promise<string>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `next` | method | <code>next(namespace: string): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeIoHelperSdk`

Runtime Io Helper Sdk interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeIoHelperSdk } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeIoHelperSdk {
    readonly events: RuntimeEventHelper;
    readonly resources: RuntimeResourceHelper;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>readonly events: RuntimeEventHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resources` | property | <code>readonly resources: RuntimeResourceHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeObservationEventInput`

Runtime Observation Event Input interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeObservationEventInput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeObservationEventInput<T extends RuntimeJsonValue = RuntimeJsonValue> {
    type: RuntimeObservationEventType;
    payload: T;
    options?: RuntimeEventAppendOptions;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `options` | property | <code>options?: RuntimeEventAppendOptions</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: T</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: `runtime.observation.${string}`</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeResourceAcquireOptions`

Runtime Resource Acquire Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeResourceAcquireOptions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeResourceAcquireOptions {
    ttlMs: number;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeResourceHelper`

Runtime Resource Helper interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeResourceHelper } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeResourceHelper {
    acquire(resources: Omit<RuntimeResourceRequest, 'requestedClaimId'>[], options: RuntimeResourceAcquireOptions): Promise<RuntimeResourceClaim[]>;
    renew(claims: RuntimeResourceClaim[], options: RuntimeResourceRenewOptions): Promise<RuntimeResourceClaim[]>;
    release(claims: RuntimeResourceClaim[]): Promise<void>;
    assertCurrent(claim: RuntimeResourceClaim): Promise<RuntimeResourceClaim>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(resources: Omit&lt;RuntimeResourceRequest, "requestedClaimId"&gt;[], options: RuntimeResourceAcquireOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertCurrent` | method | <code>assertCurrent(claim: RuntimeResourceClaim): Promise&lt;RuntimeResourceClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `release` | method | <code>release(claims: RuntimeResourceClaim[]): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(claims: RuntimeResourceClaim[], options: RuntimeResourceRenewOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeResourceHelperDependencies`

Runtime Resource Helper Dependencies interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeResourceHelperDependencies } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeResourceHelperDependencies {
    runLease: RunLeaseAuthorization;
    coordinator: RuntimeResourceCoordinator;
    ids: RuntimeIdHelper;
    clock: RuntimeClockHelper;
    stateId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clock` | property | <code>clock: RuntimeClockHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `coordinator` | property | <code>coordinator: RuntimeResourceCoordinator</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ids` | property | <code>ids: RuntimeIdHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeResourceRenewOptions`

Runtime Resource Renew Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeResourceRenewOptions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeResourceRenewOptions {
    ttlMs: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ttlMs` | property | <code>ttlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeTransitionHelper`

Runtime Transition Helper interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeTransitionHelper } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeTransitionHelper {
    propose(to: string, reason?: string, variablesPatch?: Record<string, RuntimeJsonValue>): RuntimeTransitionProposal;
    complete(output?: RuntimeJsonValue, variablesPatch?: Record<string, RuntimeJsonValue>): RuntimeStateExecutionResult;
    continue(observation?: RuntimeJsonValue): RuntimeStateExecutionResult;
    fail(error: NormalizedRuntimeError): RuntimeStateExecutionResult;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(output?: RuntimeJsonValue, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeStateExecutionResult</code> | Public method; parameters and return type are shown in the signature. |
| `continue` | method | <code>continue(observation?: RuntimeJsonValue): RuntimeStateExecutionResult</code> | Public method; parameters and return type are shown in the signature. |
| `fail` | method | <code>fail(error: NormalizedRuntimeError): RuntimeStateExecutionResult</code> | Public method; parameters and return type are shown in the signature. |
| `propose` | method | <code>propose(to: string, reason?: string, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeTransitionProposal</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeTransitionProposal`

Runtime Transition Proposal interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeTransitionProposal } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeTransitionProposal {
    to: string;
    reason?: string;
    variablesPatch?: Record<string, RuntimeJsonValue>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `to` | property | <code>to: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `variablesPatch` | property | <code>variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeWaitHelper`

Runtime Wait Helper interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeWaitHelper } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeWaitHelper {
    human(request: HumanWaitRequest): RuntimeStateExecutionResult;
    signal(request: SignalWaitRequest): RuntimeStateExecutionResult;
    timer(request: TimerWaitRequest): RuntimeStateExecutionResult;
    pause(request: PauseRequest): RuntimeStateExecutionResult;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `human` | method | <code>human(request: HumanWaitRequest): RuntimeStateExecutionResult</code> | Public method; parameters and return type are shown in the signature. |
| `pause` | method | <code>pause(request: PauseRequest): RuntimeStateExecutionResult</code> | Public method; parameters and return type are shown in the signature. |
| `signal` | method | <code>signal(request: SignalWaitRequest): RuntimeStateExecutionResult</code> | Public method; parameters and return type are shown in the signature. |
| `timer` | method | <code>timer(request: TimerWaitRequest): RuntimeStateExecutionResult</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeWaitIntent`

Runtime Wait Intent interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeWaitIntent } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface RuntimeWaitIntent {
    type: RuntimeWaitIntentType;
    key?: string;
    expectedSchema?: JsonSchema;
    expiresAt?: string;
    timeoutTransitionId?: string;
    pendingActionRef?: string;
    reason?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedSchema` | property | <code>expectedSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingActionRef` | property | <code>pendingActionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutTransitionId` | property | <code>timeoutTransitionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "pause"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SignalWaitRequest`

Signal Wait Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { SignalWaitRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface SignalWaitRequest {
    key: string;
    expectedSchema?: JsonSchema;
    expiresAt?: string;
    timeoutTransitionId?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedSchema` | property | <code>expectedSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutTransitionId` | property | <code>timeoutTransitionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `TimerWaitRequest`

Timer Wait Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { TimerWaitRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export interface TimerWaitRequest {
    fireAt: string;
    timeoutTransitionId?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fireAt` | property | <code>fireAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutTransitionId` | property | <code>timeoutTransitionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeDeterministicObservationKind`

Public type alias for Runtime Deterministic Observation Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeDeterministicObservationKind } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export type RuntimeDeterministicObservationKind = (typeof RUNTIME_DETERMINISTIC_OBSERVATION_KINDS)[number];
```

## `RuntimeJsonValue`

Public type alias for Runtime JSON Value; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeJsonValue } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export type RuntimeJsonValue = null | boolean | number | string | RuntimeJsonValue[] | {
    [key: string]: RuntimeJsonValue;
};
```

## `RuntimeStateExecutionResult`

Public type alias for Runtime State Execution Result; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeStateExecutionResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export type RuntimeStateExecutionResult = {
    kind: 'completed';
    output?: RuntimeJsonValue;
    variablesPatch?: Record<string, RuntimeJsonValue>;
} | {
    kind: 'continued';
    observation?: RuntimeJsonValue;
} | {
    kind: 'failed';
    error: NormalizedRuntimeError;
} | {
    kind: 'waiting';
    wait: RuntimeWaitIntent;
};
```

## `RuntimeWaitIntentType`

Public type alias for Runtime Wait Intent Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeWaitIntentType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)

### Declaration

```text
export type RuntimeWaitIntentType = (typeof RUNTIME_WAIT_INTENT_TYPES)[number];
```
