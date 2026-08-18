# `@codesoul-co/hypha-core` / `contracts/runtime-projection`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-projection.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)
- Exports: **6**

## Using this module

Use the Runtime projection module for declaring and runtime-validating contracts. It exports 5 interfaces, 1 type.

### Import from the package entrypoint

```ts
import type {
  RuntimeCancellationProjection,
  RuntimeOrchestrationProjection,
  RuntimePendingTransitionProjection,
  RuntimePendingWaitProjection,
  RuntimeResumeProjection,
  RuntimeOrchestrationRunStatus,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeCancellationProjection` | interface | <code>interface RuntimeCancellationProjection</code> | Runtime Cancellation Projection interface with 4 public fields or methods. |
| `RuntimeOrchestrationProjection` | interface | <code>interface RuntimeOrchestrationProjection</code> | Runtime Orchestration Projection interface with 13 public fields or methods. |
| `RuntimePendingTransitionProjection` | interface | <code>interface RuntimePendingTransitionProjection</code> | Runtime Pending Transition Projection interface with 3 public fields or methods. |
| `RuntimePendingWaitProjection` | interface | <code>interface RuntimePendingWaitProjection</code> | Runtime Pending Wait Projection interface with 10 public fields or methods. |
| `RuntimeResumeProjection` | interface | <code>interface RuntimeResumeProjection</code> | Runtime Resume Projection interface with 7 public fields or methods. |
| `RuntimeOrchestrationRunStatus` | type | <code>type RuntimeOrchestrationRunStatus = 'not_created' &#124; RuntimeRunStatus</code> | Public type alias for Runtime Orchestration Run Status; the declaration contains its complete type expression. |

## `RuntimeCancellationProjection`

Runtime Cancellation Projection interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCancellationProjection } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)

### Declaration

```text
export interface RuntimeCancellationProjection {
    commandId: string;
    principalId: string;
    reason: string;
    requestedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeOrchestrationProjection`

Runtime Orchestration Projection interface with 13 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeOrchestrationProjection } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)

### Declaration

```text
export interface RuntimeOrchestrationProjection {
    runId: string;
    runStatus: RuntimeOrchestrationRunStatus;
    currentState?: string;
    terminalState?: string;
    statePath: string[];
    stateVisitCounts: Record<string, number>;
    stateAttempt: number;
    pendingTransition?: RuntimePendingTransitionProjection;
    pendingHumanActionRef?: string;
    pendingWait?: RuntimePendingWaitProjection;
    lastResume?: RuntimeResumeProjection;
    cancellation?: RuntimeCancellationProjection;
    pendingActivityIds: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancellation` | property | <code>cancellation?: RuntimeCancellationProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `currentState` | property | <code>currentState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastResume` | property | <code>lastResume?: RuntimeResumeProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingActivityIds` | property | <code>pendingActivityIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingHumanActionRef` | property | <code>pendingHumanActionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingTransition` | property | <code>pendingTransition?: RuntimePendingTransitionProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingWait` | property | <code>pendingWait?: RuntimePendingWaitProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runStatus` | property | <code>runStatus: RuntimeOrchestrationRunStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statePath` | property | <code>statePath: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateVisitCounts` | property | <code>stateVisitCounts: Record&lt;string, number&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `terminalState` | property | <code>terminalState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimePendingTransitionProjection`

Runtime Pending Transition Projection interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimePendingTransitionProjection } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)

### Declaration

```text
export interface RuntimePendingTransitionProjection {
    eventId: string;
    from: string;
    to: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventId` | property | <code>eventId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `from` | property | <code>from: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `to` | property | <code>to: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimePendingWaitProjection`

Runtime Pending Wait Projection interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { RuntimePendingWaitProjection } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)

### Declaration

```text
export interface RuntimePendingWaitProjection {
    waitId: string;
    stateId: string;
    stateAttempt: number;
    type: RuntimeWaitIntentType;
    key?: string;
    pendingActionRef?: string;
    reason?: string;
    expectedSchema?: JsonSchema;
    expiresAt?: string;
    createdAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedSchema` | property | <code>expectedSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingActionRef` | property | <code>pendingActionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "pause"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `waitId` | property | <code>waitId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeResumeProjection`

Runtime Resume Projection interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeResumeProjection } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)

### Declaration

```text
export interface RuntimeResumeProjection {
    commandId: string;
    kind: 'manual' | 'signal' | 'timer';
    waitId: string;
    principalId: string;
    key?: string;
    payload?: RuntimeJsonValue;
    resumedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "manual" &#124; "signal" &#124; "timer"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload?: RuntimeJsonValue</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resumedAt` | property | <code>resumedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `waitId` | property | <code>waitId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeOrchestrationRunStatus`

Public type alias for Runtime Orchestration Run Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeOrchestrationRunStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)

### Declaration

```text
export type RuntimeOrchestrationRunStatus = 'not_created' | RuntimeRunStatus;
```
