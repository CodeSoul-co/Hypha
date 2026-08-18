# `@codesoul-co/hypha-core` / `modules/runtime/runtime-activity-helper`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-activity-helper.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-helper.ts)
- Exports: **3**

## Using this module

Use the Runtime activity helper module for executing runtime behavior at this boundary. It exports 2 classes, 1 interface.

### Import from the package entrypoint

```ts
import {
  DefaultRuntimeActivityHelper,
  RuntimeEventActivityLifecycleCommitPort,
} from '@codesoul-co/hypha-core';

import type {
  DefaultRuntimeActivityHelperOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultRuntimeActivityHelper` | class | <code>new DefaultRuntimeActivityHelper(options: DefaultRuntimeActivityHelperOptions): DefaultRuntimeActivityHelper</code> | Default Runtime Activity Helper class with 6 public constructor or member entries; its exact declarations are listed below. |
| `RuntimeEventActivityLifecycleCommitPort` | class | <code>new RuntimeEventActivityLifecycleCommitPort(events: RuntimeEventCommitPort): RuntimeEventActivityLifecycleCommitPort</code> | Runtime Event Activity Lifecycle Commit Port class with 2 public constructor or member entries; its exact declarations are listed below. |
| `DefaultRuntimeActivityHelperOptions` | interface | <code>interface DefaultRuntimeActivityHelperOptions</code> | Default Runtime Activity Helper Options interface with 6 public fields or methods. |

## `DefaultRuntimeActivityHelper`

Default Runtime Activity Helper class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultRuntimeActivityHelper } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-helper`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-helper.ts)

### Declaration

```text
export declare class DefaultRuntimeActivityHelper implements RuntimeActivityHelper {
    constructor(options: DefaultRuntimeActivityHelperOptions);
    tool(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation>;
    memory(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation>;
    model(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation>;
    execution(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation>;
    custom(request: RuntimeActivityRequest): Promise<RuntimeActivityObservation>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DefaultRuntimeActivityHelperOptions): DefaultRuntimeActivityHelper</code> | Creates an instance of this class. |
| `custom` | method | <code>custom(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `execution` | method | <code>execution(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `memory` | method | <code>memory(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `model` | method | <code>model(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `tool` | method | <code>tool(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeEventActivityLifecycleCommitPort`

Runtime Event Activity Lifecycle Commit Port class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RuntimeEventActivityLifecycleCommitPort } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-helper`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-helper.ts)

### Declaration

```text
export declare class RuntimeEventActivityLifecycleCommitPort implements RuntimeActivityLifecycleCommitPort {
    constructor(events: RuntimeEventCommitPort);
    append(request: RuntimeActivityLifecycleCommitRequest): Promise<FrameworkEvent>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: RuntimeActivityLifecycleCommitRequest): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(events: RuntimeEventCommitPort): RuntimeEventActivityLifecycleCommitPort</code> | Creates an instance of this class. |

## `DefaultRuntimeActivityHelperOptions`

Default Runtime Activity Helper Options interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { DefaultRuntimeActivityHelperOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-helper`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-helper.ts)

### Declaration

```text
export interface DefaultRuntimeActivityHelperOptions {
    execution: RuntimeHelperExecutionScope;
    ids: RuntimeIdHelper;
    clock: {
        now(): Promise<string>;
    };
    dispatch: RuntimeActivityDispatchPort;
    lifecycle: RuntimeActivityLifecycleCommitPort;
    abortSignal: AbortSignal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `clock` | property | <code>clock: { now(): Promise&lt;string&gt;; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dispatch` | property | <code>dispatch: RuntimeActivityDispatchPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `execution` | property | <code>execution: RuntimeHelperExecutionScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ids` | property | <code>ids: RuntimeIdHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lifecycle` | property | <code>lifecycle: RuntimeActivityLifecycleCommitPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
