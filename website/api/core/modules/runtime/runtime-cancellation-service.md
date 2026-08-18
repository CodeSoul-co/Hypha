# `@codesoul-co/hypha-core` / `modules/runtime/runtime-cancellation-service`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-cancellation-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-cancellation-service.ts)
- Exports: **2**

## Using this module

Use the Runtime cancellation service module for executing runtime behavior at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  RuntimeCancellationService,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeCancellationServiceOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeCancellationService` | class | <code>new RuntimeCancellationService(options: RuntimeCancellationServiceOptions): RuntimeCancellationService</code> | Runtime Cancellation Service class with 2 public constructor or member entries; its exact declarations are listed below. |
| `RuntimeCancellationServiceOptions` | interface | <code>interface RuntimeCancellationServiceOptions</code> | Runtime Cancellation Service Options interface with 9 public fields or methods. |

## `RuntimeCancellationService`

Runtime Cancellation Service class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RuntimeCancellationService } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-cancellation-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-cancellation-service.ts)

### Declaration

```text
export declare class RuntimeCancellationService {
    constructor(options: RuntimeCancellationServiceOptions);
    cancel(input: RuntimeCancelCommand): Promise<RuntimeCancelResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(input: RuntimeCancelCommand): Promise&lt;RuntimeCancelResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: RuntimeCancellationServiceOptions): RuntimeCancellationService</code> | Creates an instance of this class. |

## `RuntimeCancellationServiceOptions`

Runtime Cancellation Service Options interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCancellationServiceOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-cancellation-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-cancellation-service.ts)

### Declaration

```text
export interface RuntimeCancellationServiceOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    runLeases: RunLeaseStore;
    commands: Pick<SessionQueue, 'cancelPending'>;
    activities: RuntimeActivityCancellationPort;
    children: RuntimeChildRunCancellationPort;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activities` | property | <code>activities: RuntimeActivityCancellationPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `children` | property | <code>children: RuntimeChildRunCancellationPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commands` | property | <code>commands: Pick&lt;SessionQueue, "cancelPending"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events: EventRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextId` | method | <code>nextId?(namespace: string): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
