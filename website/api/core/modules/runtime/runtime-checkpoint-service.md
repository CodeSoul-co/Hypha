# `@codesoul-co/hypha-core` / `modules/runtime/runtime-checkpoint-service`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-checkpoint-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-service.ts)
- Exports: **2**

## Using this module

Use the Runtime checkpoint service module for executing runtime behavior at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  RuntimeCheckpointService,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeCheckpointServiceOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeCheckpointService` | class | <code>new RuntimeCheckpointService(options: RuntimeCheckpointServiceOptions): RuntimeCheckpointService</code> | Runtime Checkpoint Service class with 3 public constructor or member entries; its exact declarations are listed below. |
| `RuntimeCheckpointServiceOptions` | interface | <code>interface RuntimeCheckpointServiceOptions</code> | Runtime Checkpoint Service Options interface with 7 public fields or methods. |

## `RuntimeCheckpointService`

Runtime Checkpoint Service class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RuntimeCheckpointService } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-checkpoint-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-service.ts)

### Declaration

```text
export declare class RuntimeCheckpointService {
    constructor(options: RuntimeCheckpointServiceOptions);
    create(input: RuntimeCheckpointCreateCommand): Promise<RuntimeCheckpointCreateResult>;
    load(input: RuntimeCheckpointLoadRequest): Promise<RuntimeCheckpointLoadResult | null>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeCheckpointServiceOptions): RuntimeCheckpointService</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: RuntimeCheckpointCreateCommand): Promise&lt;RuntimeCheckpointCreateResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `load` | method | <code>load(input: RuntimeCheckpointLoadRequest): Promise&lt;RuntimeCheckpointLoadResult &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeCheckpointServiceOptions`

Runtime Checkpoint Service Options interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCheckpointServiceOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-checkpoint-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-service.ts)

### Declaration

```text
export interface RuntimeCheckpointServiceOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    checkpoints: RuntimeCheckpointStore;
    runLeases: RunLeaseStore;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpoints` | property | <code>checkpoints: RuntimeCheckpointStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events: EventRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextId` | method | <code>nextId?(namespace: string): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
