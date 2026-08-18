# `@codesoul-co/hypha-core` / `modules/runtime/runtime-io-helpers`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-io-helpers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-io-helpers.ts)
- Exports: **5**

## Using this module

Use the Runtime io helpers module for executing runtime behavior at this boundary. It exports 3 classes, 1 function, 1 interface.

### Import from the package entrypoint

```ts
import {
  DefaultRuntimeEventHelper,
  DefaultRuntimeResourceHelper,
  DurableRuntimeEventCommitPort,
  createRuntimeIoHelperSdk,
} from '@codesoul-co/hypha-core';

import type {
  DefaultRuntimeEventHelperOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultRuntimeEventHelper` | class | <code>new DefaultRuntimeEventHelper(options: DefaultRuntimeEventHelperOptions): DefaultRuntimeEventHelper</code> | Default Runtime Event Helper class with 4 public constructor or member entries; its exact declarations are listed below. |
| `DefaultRuntimeResourceHelper` | class | <code>new DefaultRuntimeResourceHelper(dependencies: RuntimeResourceHelperDependencies): DefaultRuntimeResourceHelper</code> | Default Runtime Resource Helper class with 5 public constructor or member entries; its exact declarations are listed below. |
| `DurableRuntimeEventCommitPort` | class | <code>new DurableRuntimeEventCommitPort(store: DurableEventStore): DurableRuntimeEventCommitPort</code> | Durable Runtime Event Commit Port class with 3 public constructor or member entries; its exact declarations are listed below. |
| `createRuntimeIoHelperSdk` | function | <code>createRuntimeIoHelperSdk(options: { event: DefaultRuntimeEventHelperOptions; resource: RuntimeResourceHelperDependencies; }): RuntimeIoHelperSdk</code> | Create Runtime Io Helper Sdk function with 1 public call signature; parameters and return types are listed below. |
| `DefaultRuntimeEventHelperOptions` | interface | <code>interface DefaultRuntimeEventHelperOptions</code> | Default Runtime Event Helper Options interface with 4 public fields or methods. |

## `DefaultRuntimeEventHelper`

Default Runtime Event Helper class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultRuntimeEventHelper } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-io-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-io-helpers.ts)

### Declaration

```text
export declare class DefaultRuntimeEventHelper implements RuntimeEventHelper {
    constructor(options: DefaultRuntimeEventHelperOptions);
    append<T extends RuntimeJsonValue>(type: `runtime.observation.${string}`, payload: T, options?: RuntimeEventAppendOptions): Promise<FrameworkEvent<T>>;
    appendBatch(inputs: RuntimeObservationEventInput[]): Promise<FrameworkEvent[]>;
    readSince(sequence: number): Promise<FrameworkEvent[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append&lt;T extends RuntimeJsonValue&gt;(type: `runtime.observation.${string}`, payload: T, options?: RuntimeEventAppendOptions): Promise&lt;FrameworkEvent&lt;T&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `appendBatch` | method | <code>appendBatch(inputs: RuntimeObservationEventInput[]): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: DefaultRuntimeEventHelperOptions): DefaultRuntimeEventHelper</code> | Creates an instance of this class. |
| `readSince` | method | <code>readSince(sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DefaultRuntimeResourceHelper`

Default Runtime Resource Helper class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultRuntimeResourceHelper } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-io-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-io-helpers.ts)

### Declaration

```text
export declare class DefaultRuntimeResourceHelper implements RuntimeResourceHelper {
    constructor(dependencies: RuntimeResourceHelperDependencies);
    acquire(resources: Omit<RuntimeResourceRequest, 'requestedClaimId'>[], options: RuntimeResourceAcquireOptions): Promise<RuntimeResourceClaim[]>;
    renew(claims: RuntimeResourceClaim[], options: RuntimeResourceRenewOptions): Promise<RuntimeResourceClaim[]>;
    release(claims: RuntimeResourceClaim[]): Promise<void>;
    assertCurrent(claim: RuntimeResourceClaim): Promise<RuntimeResourceClaim>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(resources: Omit&lt;RuntimeResourceRequest, "requestedClaimId"&gt;[], options: RuntimeResourceAcquireOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `assertCurrent` | method | <code>assertCurrent(claim: RuntimeResourceClaim): Promise&lt;RuntimeResourceClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(dependencies: RuntimeResourceHelperDependencies): DefaultRuntimeResourceHelper</code> | Creates an instance of this class. |
| `release` | method | <code>release(claims: RuntimeResourceClaim[]): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(claims: RuntimeResourceClaim[], options: RuntimeResourceRenewOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DurableRuntimeEventCommitPort`

Durable Runtime Event Commit Port class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DurableRuntimeEventCommitPort } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-io-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-io-helpers.ts)

### Declaration

```text
export declare class DurableRuntimeEventCommitPort implements RuntimeEventCommitPort {
    constructor(store: DurableEventStore);
    append(request: RuntimeEventCommitRequest): Promise<FrameworkEvent[]>;
    readSince(scope: RuntimeScope, sequence: number): Promise<FrameworkEvent[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: RuntimeEventCommitRequest): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(store: DurableEventStore): DurableRuntimeEventCommitPort</code> | Creates an instance of this class. |
| `readSince` | method | <code>readSince(scope: RuntimeScope, sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `createRuntimeIoHelperSdk`

Create Runtime Io Helper Sdk function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createRuntimeIoHelperSdk } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-io-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-io-helpers.ts)

### Declaration

```text
export declare function createRuntimeIoHelperSdk(options: {
    event: DefaultRuntimeEventHelperOptions;
    resource: RuntimeResourceHelperDependencies;
}): RuntimeIoHelperSdk;
```

### Call signature

```text
createRuntimeIoHelperSdk(options: { event: DefaultRuntimeEventHelperOptions; resource: RuntimeResourceHelperDependencies; }): RuntimeIoHelperSdk
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>{ event: DefaultRuntimeEventHelperOptions; resource: RuntimeResourceHelperDependencies; }</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeIoHelperSdk`
- Description: The return contract is defined by the type shown above.

## `DefaultRuntimeEventHelperOptions`

Default Runtime Event Helper Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { DefaultRuntimeEventHelperOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-io-helpers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-io-helpers.ts)

### Declaration

```text
export interface DefaultRuntimeEventHelperOptions {
    execution: RuntimeHelperExecutionScope;
    ids: RuntimeIdHelper;
    clock: {
        now(): Promise<string>;
    };
    port: RuntimeEventCommitPort;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clock` | property | <code>clock: { now(): Promise&lt;string&gt;; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `execution` | property | <code>execution: RuntimeHelperExecutionScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ids` | property | <code>ids: RuntimeIdHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `port` | property | <code>port: RuntimeEventCommitPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
