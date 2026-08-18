# `@codesoul-co/hypha-core` / `contracts/runtime-query`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-query.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)
- Exports: **6**

## Using this module

Use the Runtime query module for declaring and runtime-validating contracts. It exports 6 interfaces.

### Import from the package entrypoint

```ts
import type {
  RuntimeQueryRequest,
  RuntimeQueryServiceContract,
  RuntimeRunView,
  RuntimeStateExplanation,
  RuntimeTimelineRequest,
  RuntimeTimelineResult,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeQueryRequest` | interface | <code>interface RuntimeQueryRequest</code> | Runtime Query Request interface with 1 public fields or methods. |
| `RuntimeQueryServiceContract` | interface | <code>interface RuntimeQueryServiceContract</code> | Runtime Query Service Contract interface with 5 public fields or methods. |
| `RuntimeRunView` | interface | <code>interface RuntimeRunView</code> | Runtime Run View interface with 7 public fields or methods. |
| `RuntimeStateExplanation` | interface | <code>interface RuntimeStateExplanation</code> | Runtime State Explanation interface with 10 public fields or methods. |
| `RuntimeTimelineRequest` | interface | <code>interface RuntimeTimelineRequest extends RuntimeQueryRequest</code> | Runtime Timeline Request interface with 5 public fields or methods. |
| `RuntimeTimelineResult` | interface | <code>interface RuntimeTimelineResult</code> | Runtime Timeline Result interface with 5 public fields or methods. |

## `RuntimeQueryRequest`

Runtime Query Request interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeQueryRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)

### Declaration

```text
export interface RuntimeQueryRequest {
    scope: RuntimeScope;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeQueryServiceContract`

Runtime Query Service Contract interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeQueryServiceContract } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)

### Declaration

```text
export interface RuntimeQueryServiceContract {
    getRun(request: RuntimeQueryRequest): Promise<RuntimeRunView | null>;
    getFSM(request: RuntimeQueryRequest): Promise<RuntimeOrchestrationProjection | null>;
    getTimeline(request: RuntimeTimelineRequest): Promise<RuntimeTimelineResult>;
    getPendingWaits(request: RuntimeQueryRequest): Promise<RuntimePendingWaitProjection[]>;
    explainState(request: RuntimeQueryRequest): Promise<RuntimeStateExplanation | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `explainState` | method | <code>explainState(request: RuntimeQueryRequest): Promise&lt;RuntimeStateExplanation &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getFSM` | method | <code>getFSM(request: RuntimeQueryRequest): Promise&lt;RuntimeOrchestrationProjection &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getPendingWaits` | method | <code>getPendingWaits(request: RuntimeQueryRequest): Promise&lt;RuntimePendingWaitProjection[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getRun` | method | <code>getRun(request: RuntimeQueryRequest): Promise&lt;RuntimeRunView &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getTimeline` | method | <code>getTimeline(request: RuntimeTimelineRequest): Promise&lt;RuntimeTimelineResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeRunView`

Runtime Run View interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeRunView } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)

### Declaration

```text
export interface RuntimeRunView {
    scope: RuntimeScope;
    projectionVersion: string;
    projection: RuntimeOrchestrationProjection;
    projectionLastSequence: number;
    eventHeadSequence: number;
    projectionLag: number;
    refreshedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventHeadSequence` | property | <code>eventHeadSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projection` | property | <code>projection: RuntimeOrchestrationProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionLag` | property | <code>projectionLag: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionLastSequence` | property | <code>projectionLastSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionVersion` | property | <code>projectionVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `refreshedAt` | property | <code>refreshedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeStateExplanation`

Runtime State Explanation interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeStateExplanation } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)

### Declaration

```text
export interface RuntimeStateExplanation {
    scope: RuntimeScope;
    runStatus: RuntimeOrchestrationProjection['runStatus'];
    currentState?: string;
    stateAttempt: number;
    statePath: string[];
    pendingWaitId?: string;
    pendingTransitionEventId?: string;
    pendingActivityIds: string[];
    lastEventSequence: number;
    source: 'runtime.orchestration.projection';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `currentState` | property | <code>currentState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastEventSequence` | property | <code>lastEventSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingActivityIds` | property | <code>pendingActivityIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingTransitionEventId` | property | <code>pendingTransitionEventId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingWaitId` | property | <code>pendingWaitId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runStatus` | property | <code>runStatus: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/contracts/runtime-projection").RuntimeOrchestrationRunStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: "runtime.orchestration.projection"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statePath` | property | <code>statePath: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeTimelineRequest`

Runtime Timeline Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeTimelineRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)

### Declaration

```text
export interface RuntimeTimelineRequest extends RuntimeQueryRequest {
    fromSequence?: number;
    toSequence?: number;
    types?: FrameworkEventType[];
    limit?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fromSequence` | property | <code>fromSequence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toSequence` | property | <code>toSequence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `types` | property | <code>types?: FrameworkEventType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeTimelineResult`

Runtime Timeline Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeTimelineResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-query`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)

### Declaration

```text
export interface RuntimeTimelineResult {
    scope: RuntimeScope;
    events: PersistedFrameworkEvent[];
    eventCount: number;
    eventHeadSequence: number;
    refreshedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventCount` | property | <code>eventCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventHeadSequence` | property | <code>eventHeadSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `refreshedAt` | property | <code>refreshedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
