# `@codesoul-co/hypha-core` / `modules/runtime/runtime-helper-sdk`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-helper-sdk.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)
- Exports: **8**

## Using this module

Use the Runtime helper sdk module for executing runtime behavior at this boundary. It exports 5 classes, 2 functions, 1 interface.

### Import from the package entrypoint

```ts
import {
  DefaultRuntimeTransitionHelper,
  DefaultRuntimeWaitHelper,
  DeterministicRuntimeClockHelper,
  DeterministicRuntimeIdHelper,
  InMemoryRuntimeDeterminismStore,
  createRuntimeHelperSdk,
  deterministicObservationKey,
} from '@codesoul-co/hypha-core';

import type {
  CreateRuntimeHelperSdkOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 5 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultRuntimeTransitionHelper` | class | <code>new DefaultRuntimeTransitionHelper(): DefaultRuntimeTransitionHelper</code> | Default Runtime Transition Helper class with 5 public constructor or member entries; its exact declarations are listed below. |
| `DefaultRuntimeWaitHelper` | class | <code>new DefaultRuntimeWaitHelper(): DefaultRuntimeWaitHelper</code> | Default Runtime Wait Helper class with 5 public constructor or member entries; its exact declarations are listed below. |
| `DeterministicRuntimeClockHelper` | class | <code>new DeterministicRuntimeClockHelper(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, waits: RuntimeWaitHelper, source?: () =&gt; string): DeterministicRuntimeClockHelper</code> | Deterministic Runtime Clock Helper class with 3 public constructor or member entries; its exact declarations are listed below. |
| `DeterministicRuntimeIdHelper` | class | <code>new DeterministicRuntimeIdHelper(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, source?: (namespace: string) =&gt; string): DeterministicRuntimeIdHelper</code> | Deterministic Runtime ID Helper class with 2 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryRuntimeDeterminismStore` | class | <code>new InMemoryRuntimeDeterminismStore(): InMemoryRuntimeDeterminismStore</code> | In Memory Runtime Determinism Store class with 2 public constructor or member entries; its exact declarations are listed below. |
| `createRuntimeHelperSdk` | function | <code>createRuntimeHelperSdk(options: CreateRuntimeHelperSdkOptions): RuntimeHelperSdk</code> | Create Runtime Helper Sdk function with 1 public call signature; parameters and return types are listed below. |
| `deterministicObservationKey` | function | <code>deterministicObservationKey(scope: RuntimeDeterminismScope, key: string): string</code> | Deterministic Observation Key function with 1 public call signature; parameters and return types are listed below. |
| `CreateRuntimeHelperSdkOptions` | interface | <code>interface CreateRuntimeHelperSdkOptions</code> | Create Runtime Helper Sdk Options interface with 4 public fields or methods. |

## `DefaultRuntimeTransitionHelper`

Default Runtime Transition Helper class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultRuntimeTransitionHelper } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### Declaration

```text
export declare class DefaultRuntimeTransitionHelper implements RuntimeTransitionHelper {
    propose(to: string, reason?: string, variablesPatch?: Record<string, RuntimeJsonValue>): RuntimeTransitionProposal;
    complete(output?: RuntimeJsonValue, variablesPatch?: Record<string, RuntimeJsonValue>): RuntimeStateExecutionResult;
    continue(observation?: RuntimeJsonValue): RuntimeStateExecutionResult;
    fail(error: NormalizedRuntimeError): RuntimeStateExecutionResult;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(output?: RuntimeJsonValue, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeStateExecutionResult</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): DefaultRuntimeTransitionHelper</code> | Creates an instance of this class. |
| `continue` | method | <code>continue(observation?: RuntimeJsonValue): RuntimeStateExecutionResult</code> | Public method; parameters and return type are shown in the signature. |
| `fail` | method | <code>fail(error: NormalizedRuntimeError): RuntimeStateExecutionResult</code> | Public method; parameters and return type are shown in the signature. |
| `propose` | method | <code>propose(to: string, reason?: string, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeTransitionProposal</code> | Public method; parameters and return type are shown in the signature. |

## `DefaultRuntimeWaitHelper`

Default Runtime Wait Helper class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultRuntimeWaitHelper } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### Declaration

```text
export declare class DefaultRuntimeWaitHelper implements RuntimeWaitHelper {
    human(request: HumanWaitRequest): RuntimeStateExecutionResult;
    signal(request: SignalWaitRequest): RuntimeStateExecutionResult;
    timer(request: TimerWaitRequest): RuntimeStateExecutionResult;
    pause(request: PauseRequest): RuntimeStateExecutionResult;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DefaultRuntimeWaitHelper</code> | Creates an instance of this class. |
| `human` | method | <code>human(request: HumanWaitRequest): RuntimeStateExecutionResult</code> | Public method; parameters and return type are shown in the signature. |
| `pause` | method | <code>pause(request: PauseRequest): RuntimeStateExecutionResult</code> | Public method; parameters and return type are shown in the signature. |
| `signal` | method | <code>signal(request: SignalWaitRequest): RuntimeStateExecutionResult</code> | Public method; parameters and return type are shown in the signature. |
| `timer` | method | <code>timer(request: TimerWaitRequest): RuntimeStateExecutionResult</code> | Public method; parameters and return type are shown in the signature. |

## `DeterministicRuntimeClockHelper`

Deterministic Runtime Clock Helper class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DeterministicRuntimeClockHelper } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### Declaration

```text
export declare class DeterministicRuntimeClockHelper implements RuntimeClockHelper {
    constructor(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, waits: RuntimeWaitHelper, source?: () => string);
    now(): Promise<string>;
    sleepUntil(isoTime: string): Promise<RuntimeStateExecutionResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, waits: RuntimeWaitHelper, source?: () =&gt; string): DeterministicRuntimeClockHelper</code> | Creates an instance of this class. |
| `now` | method | <code>now(): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `sleepUntil` | method | <code>sleepUntil(isoTime: string): Promise&lt;RuntimeStateExecutionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DeterministicRuntimeIdHelper`

Deterministic Runtime ID Helper class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DeterministicRuntimeIdHelper } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### Declaration

```text
export declare class DeterministicRuntimeIdHelper implements RuntimeIdHelper {
    constructor(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, source?: (namespace: string) => string);
    next(namespace: string): Promise<string>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, source?: (namespace: string) =&gt; string): DeterministicRuntimeIdHelper</code> | Creates an instance of this class. |
| `next` | method | <code>next(namespace: string): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryRuntimeDeterminismStore`

In Memory Runtime Determinism Store class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryRuntimeDeterminismStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### Declaration

```text
export declare class InMemoryRuntimeDeterminismStore implements RuntimeDeterminismStore {
    resolve<T extends RuntimeJsonValue>(request: RuntimeDeterminismResolveRequest, produce: () => T | Promise<T>): Promise<RuntimeDeterminismResolution<T>>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryRuntimeDeterminismStore</code> | Creates an instance of this class. |
| `resolve` | method | <code>resolve&lt;T extends RuntimeJsonValue&gt;(request: RuntimeDeterminismResolveRequest, produce: () =&gt; T &#124; Promise&lt;T&gt;): Promise&lt;RuntimeDeterminismResolution&lt;T&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `createRuntimeHelperSdk`

Create Runtime Helper Sdk function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createRuntimeHelperSdk } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### Declaration

```text
export declare function createRuntimeHelperSdk(options: CreateRuntimeHelperSdkOptions): RuntimeHelperSdk;
```

### Call signature

```text
createRuntimeHelperSdk(options: CreateRuntimeHelperSdkOptions): RuntimeHelperSdk
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>CreateRuntimeHelperSdkOptions</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeHelperSdk`
- Description: The return contract is defined by the type shown above.

## `deterministicObservationKey`

Deterministic Observation Key function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { deterministicObservationKey } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### Declaration

```text
export declare function deterministicObservationKey(scope: RuntimeDeterminismScope, key: string): string;
```

### Call signature

```text
deterministicObservationKey(scope: RuntimeDeterminismScope, key: string): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `scope` | <code>RuntimeDeterminismScope</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `key` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `CreateRuntimeHelperSdkOptions`

Create Runtime Helper Sdk Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { CreateRuntimeHelperSdkOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-helper-sdk`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)

### Declaration

```text
export interface CreateRuntimeHelperSdkOptions {
    scope: RuntimeDeterminismScope;
    determinismStore: RuntimeDeterminismStore;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `determinismStore` | property | <code>determinismStore: RuntimeDeterminismStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextId` | method | <code>nextId?(namespace: string): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `scope` | property | <code>scope: RuntimeDeterminismScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
