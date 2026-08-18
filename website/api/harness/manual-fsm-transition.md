# `@codesoul-co/hypha-harness` / `manual-fsm-transition`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Source: [`packages/harness/src/manual-fsm-transition.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)
- Exports: **6**

## Using this module

Use the Manual FSM transition module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 constant, 4 interfaces.

### Import from the package entrypoint

```ts
import {
  GovernedFSMTransitionService,
  MANUAL_FSM_TRANSITION_PERMISSION,
} from '@codesoul-co/hypha-harness';

import type {
  GovernedFSMTransitionServiceOptions,
  ManualFSMRunView,
  ManualFSMTransitionCommand,
  ManualFSMTransitionResult,
} from '@codesoul-co/hypha-harness';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `GovernedFSMTransitionService` | class | <code>new GovernedFSMTransitionService(options: GovernedFSMTransitionServiceOptions): GovernedFSMTransitionService</code> | Applies an explicitly requested FSM edge under owner scope, permission, optimistic revision, Run Lease, fencing, Policy, guard, trace, and replay. It never mutates a snapshot or projection directly. |
| `MANUAL_FSM_TRANSITION_PERMISSION` | constant | <code>const MANUAL_FSM_TRANSITION_PERMISSION: "runtime.fsm.transition"</code> | MANUAL FSM TRANSITION PERMISSION constant exported by the `manual-fsm-transition` module. |
| `GovernedFSMTransitionServiceOptions` | interface | <code>interface GovernedFSMTransitionServiceOptions</code> | Governed FSM Transition Service Options interface with 7 public fields or methods. |
| `ManualFSMRunView` | interface | <code>interface ManualFSMRunView</code> | Manual FSM Run View interface with 10 public fields or methods. |
| `ManualFSMTransitionCommand` | interface | <code>interface ManualFSMTransitionCommand</code> | Manual FSM Transition Command interface with 15 public fields or methods. |
| `ManualFSMTransitionResult` | interface | <code>interface ManualFSMTransitionResult</code> | Manual FSM Transition Result interface with 5 public fields or methods. |

## `GovernedFSMTransitionService`

Applies an explicitly requested FSM edge under owner scope, permission, optimistic revision, Run Lease, fencing, Policy, guard, trace, and replay. It never mutates a snapshot or projection directly.

- Kind: class
- Import: `import { GovernedFSMTransitionService } from '@codesoul-co/hypha-harness';`
- Source module: [`manual-fsm-transition`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)

### Declaration

```text
export declare class GovernedFSMTransitionService {
    constructor(options: GovernedFSMTransitionServiceOptions);
    inspect(scope: RuntimeScope, process: FSMProcessSpec): Promise<ManualFSMRunView>;
    transition(process: FSMProcessSpec, input: ManualFSMTransitionCommand): Promise<ManualFSMTransitionResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: GovernedFSMTransitionServiceOptions): GovernedFSMTransitionService</code> | Creates an instance of this class. |
| `inspect` | method | <code>inspect(scope: RuntimeScope, process: FSMProcessSpec): Promise&lt;ManualFSMRunView&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `transition` | method | <code>transition(process: FSMProcessSpec, input: ManualFSMTransitionCommand): Promise&lt;ManualFSMTransitionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MANUAL_FSM_TRANSITION_PERMISSION`

MANUAL FSM TRANSITION PERMISSION constant exported by the `manual-fsm-transition` module.

- Kind: constant
- Import: `import { MANUAL_FSM_TRANSITION_PERMISSION } from '@codesoul-co/hypha-harness';`
- Source module: [`manual-fsm-transition`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)

### Declaration

```text
export declare const MANUAL_FSM_TRANSITION_PERMISSION: "runtime.fsm.transition";
```

## `GovernedFSMTransitionServiceOptions`

Governed FSM Transition Service Options interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { GovernedFSMTransitionServiceOptions } from '@codesoul-co/hypha-harness';`
- Source module: [`manual-fsm-transition`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)

### Declaration

```text
export interface GovernedFSMTransitionServiceOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    runLeases: RunLeaseStore;
    policy?: PolicyEngine;
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
| `policy` | property | <code>policy?: PolicyEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManualFSMRunView`

Manual FSM Run View interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { ManualFSMRunView } from '@codesoul-co/hypha-harness';`
- Source module: [`manual-fsm-transition`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)

### Declaration

```text
export interface ManualFSMRunView {
    runId: string;
    processId: string;
    processVersion: string;
    runRevision: number;
    runStatus: RuntimeOrchestrationProjection['runStatus'];
    currentState?: string;
    statePath: string[];
    stateAttempt: number;
    terminalStates: string[];
    allowedTransitions: Array<{
        to: string;
        guard?: string;
        description?: string;
    }>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedTransitions` | property | <code>allowedTransitions: { to: string; guard?: string; description?: string; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `currentState` | property | <code>currentState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processId` | property | <code>processId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processVersion` | property | <code>processVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runRevision` | property | <code>runRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runStatus` | property | <code>runStatus: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeOrchestrationRunStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statePath` | property | <code>statePath: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `terminalStates` | property | <code>terminalStates: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManualFSMTransitionCommand`

Manual FSM Transition Command interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { ManualFSMTransitionCommand } from '@codesoul-co/hypha-harness';`
- Source module: [`manual-fsm-transition`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)

### Declaration

```text
export interface ManualFSMTransitionCommand {
    commandId: string;
    scope: RuntimeScope;
    principal: RuntimePrincipal;
    ownerId: string;
    leaseTtlMs: number;
    processId: string;
    processVersion: string;
    expectedState: string;
    expectedRunRevision: number;
    targetState: string;
    reason: string;
    requestedAt: string;
    guardContext?: FSMGuardContext;
    variablesPatch?: Record<string, RuntimeJsonValue>;
    idempotencyKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRunRevision` | property | <code>expectedRunRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedState` | property | <code>expectedState: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `guardContext` | property | <code>guardContext?: FSMGuardContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processId` | property | <code>processId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processVersion` | property | <code>processVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetState` | property | <code>targetState: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `variablesPatch` | property | <code>variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManualFSMTransitionResult`

Manual FSM Transition Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ManualFSMTransitionResult } from '@codesoul-co/hypha-harness';`
- Source module: [`manual-fsm-transition`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)

### Declaration

```text
export interface ManualFSMTransitionResult {
    commandId: string;
    disposition: 'applied' | 'reused' | 'lease_unavailable';
    eventIds: string[];
    runRevision: number;
    view: ManualFSMRunView;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `disposition` | property | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runRevision` | property | <code>runRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `view` | property | <code>view: ManualFSMRunView</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
