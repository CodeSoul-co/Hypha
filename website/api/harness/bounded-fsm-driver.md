# `@codesoul-co/hypha-harness` / `bounded-fsm-driver`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Source: [`packages/harness/src/bounded-fsm-driver.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)
- Exports: **7**

## Using this module

Use the Bounded FSM driver module for using the public contracts and operations for this capability boundary. It exports 1 class, 5 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  FencedBoundedFSMDriver,
} from '@codesoul-co/hypha-harness';

import type {
  BoundedFSMDriverResult,
  BoundedFSMDriverRunInput,
  BoundedStateExecutionDecision,
  BoundedStateExecutorInput,
  FencedBoundedFSMDriverOptions,
  BoundedFSMDriverDisposition,
} from '@codesoul-co/hypha-harness';
```

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `FencedBoundedFSMDriver` | class | <code>new FencedBoundedFSMDriver(options: FencedBoundedFSMDriverOptions): FencedBoundedFSMDriver</code> | Fenced Bounded FSM Driver class with 2 public constructor or member entries; its exact declarations are listed below. |
| `BoundedFSMDriverResult` | interface | <code>interface BoundedFSMDriverResult</code> | Bounded FSM Driver Result interface with 4 public fields or methods. |
| `BoundedFSMDriverRunInput` | interface | <code>interface BoundedFSMDriverRunInput</code> | Bounded FSM Driver Run Input interface with 9 public fields or methods. |
| `BoundedStateExecutionDecision` | interface | <code>interface BoundedStateExecutionDecision</code> | Bounded State Execution Decision interface with 3 public fields or methods. |
| `BoundedStateExecutorInput` | interface | <code>interface BoundedStateExecutorInput</code> | Bounded State Executor Input interface with 7 public fields or methods. |
| `FencedBoundedFSMDriverOptions` | interface | <code>interface FencedBoundedFSMDriverOptions</code> | Fenced Bounded FSM Driver Options interface with 9 public fields or methods. |
| `BoundedFSMDriverDisposition` | type | <code>type BoundedFSMDriverDisposition = 'completed' &#124; 'failed' &#124; 'cancelled' &#124; 'waiting' &#124; 'budget_exhausted' &#124; 'lease_unavailable' &#124; 'state_claim_unavailable'</code> | Public type alias for Bounded FSM Driver Disposition; the declaration contains its complete type expression. |

## `FencedBoundedFSMDriver`

Fenced Bounded FSM Driver class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { FencedBoundedFSMDriver } from '@codesoul-co/hypha-harness';`
- Source module: [`bounded-fsm-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)

### Declaration

```text
export declare class FencedBoundedFSMDriver {
    constructor(options: FencedBoundedFSMDriverOptions);
    run(input: BoundedFSMDriverRunInput): Promise<BoundedFSMDriverResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: FencedBoundedFSMDriverOptions): FencedBoundedFSMDriver</code> | Creates an instance of this class. |
| `run` | method | <code>run(input: BoundedFSMDriverRunInput): Promise&lt;BoundedFSMDriverResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `BoundedFSMDriverResult`

Bounded FSM Driver Result interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { BoundedFSMDriverResult } from '@codesoul-co/hypha-harness';`
- Source module: [`bounded-fsm-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)

### Declaration

```text
export interface BoundedFSMDriverResult {
    disposition: BoundedFSMDriverDisposition;
    steps: number;
    projection: RuntimeOrchestrationProjection;
    wait?: RuntimeWaitIntent;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `disposition` | property | <code>disposition: BoundedFSMDriverDisposition</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projection` | property | <code>projection: RuntimeOrchestrationProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `steps` | property | <code>steps: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `wait` | property | <code>wait?: RuntimeWaitIntent</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `BoundedFSMDriverRunInput`

Bounded FSM Driver Run Input interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { BoundedFSMDriverRunInput } from '@codesoul-co/hypha-harness';`
- Source module: [`bounded-fsm-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)

### Declaration

```text
export interface BoundedFSMDriverRunInput {
    scope: RuntimeScope;
    process: FSMProcessSpec;
    ownerId: string;
    commandId?: string;
    maxSteps: number;
    leaseTtlMs: number;
    stateClaimTtlMs: number;
    deadlineAt?: string;
    abortSignal?: AbortSignal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal?: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandId` | property | <code>commandId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxSteps` | property | <code>maxSteps: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `process` | property | <code>process: FSMProcessSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateClaimTtlMs` | property | <code>stateClaimTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `BoundedStateExecutionDecision`

Bounded State Execution Decision interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { BoundedStateExecutionDecision } from '@codesoul-co/hypha-harness';`
- Source module: [`bounded-fsm-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)

### Declaration

```text
export interface BoundedStateExecutionDecision {
    result: RuntimeStateExecutionResult;
    transition?: RuntimeTransitionProposal;
    guardContext?: FSMGuardContext;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guardContext` | property | <code>guardContext?: FSMGuardContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `result` | property | <code>result: RuntimeStateExecutionResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transition` | property | <code>transition?: RuntimeTransitionProposal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `BoundedStateExecutorInput`

Bounded State Executor Input interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { BoundedStateExecutorInput } from '@codesoul-co/hypha-harness';`
- Source module: [`bounded-fsm-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)

### Declaration

```text
export interface BoundedStateExecutorInput {
    scope: Readonly<RuntimeScope>;
    process: Readonly<FSMProcessSpec>;
    state: Readonly<FSMStateSpec>;
    projection: Readonly<RuntimeOrchestrationProjection>;
    runLease: Readonly<FencedRunLease>;
    stateClaim: Readonly<StateExecutionClaim>;
    abortSignal: AbortSignal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `process` | property | <code>process: Readonly&lt;FSMProcessSpec&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projection` | property | <code>projection: Readonly&lt;RuntimeOrchestrationProjection&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLease` | property | <code>runLease: Readonly&lt;FencedRunLease&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: Readonly&lt;RuntimeScope&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: Readonly&lt;FSMStateSpec&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateClaim` | property | <code>stateClaim: Readonly&lt;StateExecutionClaim&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FencedBoundedFSMDriverOptions`

Fenced Bounded FSM Driver Options interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { FencedBoundedFSMDriverOptions } from '@codesoul-co/hypha-harness';`
- Source module: [`bounded-fsm-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)

### Declaration

```text
export interface FencedBoundedFSMDriverOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    runLeases: RunLeaseStore;
    stateClaims: StateExecutionClaimStore;
    executeState(input: BoundedStateExecutorInput): Promise<BoundedStateExecutionDecision>;
    evaluateGuard?: (transition: Readonly<FSMTransitionSpec>, context: Readonly<FSMGuardContext>) => Promise<boolean> | boolean;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluateGuard` | method | <code>evaluateGuard?(transition: Readonly&lt;FSMTransitionSpec&gt;, context: Readonly&lt;FSMGuardContext&gt;): Promise&lt;boolean&gt; &#124; boolean</code> | Public method; parameters and return type are shown in the signature. |
| `events` | property | <code>events: EventRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executeState` | method | <code>executeState(input: BoundedStateExecutorInput): Promise&lt;BoundedStateExecutionDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `nextId` | method | <code>nextId?(namespace: string): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateClaims` | property | <code>stateClaims: StateExecutionClaimStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `BoundedFSMDriverDisposition`

Public type alias for Bounded FSM Driver Disposition; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { BoundedFSMDriverDisposition } from '@codesoul-co/hypha-harness';`
- Source module: [`bounded-fsm-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)

### Declaration

```text
export type BoundedFSMDriverDisposition = 'completed' | 'failed' | 'cancelled' | 'waiting' | 'budget_exhausted' | 'lease_unavailable' | 'state_claim_unavailable';
```
