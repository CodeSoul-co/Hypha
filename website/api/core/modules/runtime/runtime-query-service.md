# `@codesoul-co/hypha-core` / `modules/runtime/runtime-query-service`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-query-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-query-service.ts)
- Exports: **2**

## Using this module

Use the Runtime query service module for executing runtime behavior at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  RuntimeQueryService,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeQueryServiceOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeQueryService` | class | <code>new RuntimeQueryService(options: RuntimeQueryServiceOptions): RuntimeQueryService</code> | Runtime Query Service class with 6 public constructor or member entries; its exact declarations are listed below. |
| `RuntimeQueryServiceOptions` | interface | <code>interface RuntimeQueryServiceOptions</code> | Runtime Query Service Options interface with 4 public fields or methods. |

## `RuntimeQueryService`

Runtime Query Service class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RuntimeQueryService } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-query-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-query-service.ts)

### Declaration

```text
export declare class RuntimeQueryService implements RuntimeQueryServiceContract {
    constructor(options: RuntimeQueryServiceOptions);
    getRun(input: RuntimeQueryRequest): Promise<RuntimeRunView | null>;
    getFSM(input: RuntimeQueryRequest): Promise<RuntimeOrchestrationProjection | null>;
    getTimeline(input: RuntimeTimelineRequest): Promise<RuntimeTimelineResult>;
    getPendingWaits(input: RuntimeQueryRequest): Promise<RuntimePendingWaitProjection[]>;
    explainState(input: RuntimeQueryRequest): Promise<RuntimeStateExplanation | null>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeQueryServiceOptions): RuntimeQueryService</code> | Creates an instance of this class. |
| `explainState` | method | <code>explainState(input: RuntimeQueryRequest): Promise&lt;RuntimeStateExplanation &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getFSM` | method | <code>getFSM(input: RuntimeQueryRequest): Promise&lt;RuntimeOrchestrationProjection &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getPendingWaits` | method | <code>getPendingWaits(input: RuntimeQueryRequest): Promise&lt;RuntimePendingWaitProjection[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getRun` | method | <code>getRun(input: RuntimeQueryRequest): Promise&lt;RuntimeRunView &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getTimeline` | method | <code>getTimeline(input: RuntimeTimelineRequest): Promise&lt;RuntimeTimelineResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeQueryServiceOptions`

Runtime Query Service Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeQueryServiceOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-query-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-query-service.ts)

### Declaration

```text
export interface RuntimeQueryServiceOptions {
    events: Pick<EventRuntime, 'read' | 'getStreamHead'>;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: Pick&lt;EventRuntime, "read" &#124; "getStreamHead"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
