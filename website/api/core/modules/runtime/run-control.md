# `@codesoul-co/hypha-core` / `modules/runtime/run-control`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/run-control.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-control.ts)
- Exports: **2**

## Using this module

Use the Run control module for executing runtime behavior at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  RuntimeRunControlService,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeRunControlServiceOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeRunControlService` | class | <code>new RuntimeRunControlService(options: RuntimeRunControlServiceOptions): RuntimeRunControlService</code> | Runtime Run Control Service class with 2 public constructor or member entries; its exact declarations are listed below. |
| `RuntimeRunControlServiceOptions` | interface | <code>interface RuntimeRunControlServiceOptions</code> | Runtime Run Control Service Options interface with 6 public fields or methods. |

## `RuntimeRunControlService`

Runtime Run Control Service class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RuntimeRunControlService } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/run-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-control.ts)

### Declaration

```text
export declare class RuntimeRunControlService {
    constructor(options: RuntimeRunControlServiceOptions);
    execute(input: RuntimeRunControlCommand): Promise<RuntimeRunControlResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeRunControlServiceOptions): RuntimeRunControlService</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(input: RuntimeRunControlCommand): Promise&lt;RuntimeRunControlResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeRunControlServiceOptions`

Runtime Run Control Service Options interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeRunControlServiceOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/run-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-control.ts)

### Declaration

```text
export interface RuntimeRunControlServiceOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    runLeases: RunLeaseStore;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: EventRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextId` | method | <code>nextId?(namespace: string): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
