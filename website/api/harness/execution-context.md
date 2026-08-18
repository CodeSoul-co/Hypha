# `@codesoul-co/hypha-harness` / `execution-context`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Source: [`packages/harness/src/execution-context.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/execution-context.ts)
- Exports: **3**

## Using this module

Use the Execution context module for executing runtime behavior at this boundary. It exports 1 function, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  createRuntimeExecutionContext,
} from '@codesoul-co/hypha-harness';

import type {
  CreateRuntimeExecutionContextOptions,
  RuntimeExecutionContext,
} from '@codesoul-co/hypha-harness';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createRuntimeExecutionContext` | function | <code>createRuntimeExecutionContext(options: CreateRuntimeExecutionContextOptions): RuntimeExecutionContext</code> | Create Runtime Execution Context function with 1 public call signature; parameters and return types are listed below. |
| `CreateRuntimeExecutionContextOptions` | interface | <code>interface CreateRuntimeExecutionContextOptions</code> | Create Runtime Execution Context Options interface with 15 public fields or methods. |
| `RuntimeExecutionContext` | interface | <code>interface RuntimeExecutionContext</code> | Runtime Execution Context interface with 16 public fields or methods. |

## `createRuntimeExecutionContext`

Create Runtime Execution Context function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createRuntimeExecutionContext } from '@codesoul-co/hypha-harness';`
- Source module: [`execution-context`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/execution-context.ts)

### Declaration

```text
export declare function createRuntimeExecutionContext(options: CreateRuntimeExecutionContextOptions): RuntimeExecutionContext;
```

### Call signature

```text
createRuntimeExecutionContext(options: CreateRuntimeExecutionContextOptions): RuntimeExecutionContext
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>CreateRuntimeExecutionContextOptions</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeExecutionContext`
- Description: The return contract is defined by the type shown above.

## `CreateRuntimeExecutionContextOptions`

Create Runtime Execution Context Options interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { CreateRuntimeExecutionContextOptions } from '@codesoul-co/hypha-harness';`
- Source module: [`execution-context`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/execution-context.ts)

### Declaration

```text
export interface CreateRuntimeExecutionContextOptions {
    scope: RuntimeScope;
    principal: RuntimePrincipal;
    run: RuntimeRun;
    snapshot: FSMSnapshot;
    process: FSMProcessSpec;
    attempt: number;
    runLease: RunLeaseAuthorization;
    abortSignal: AbortSignal;
    determinismStore: RuntimeDeterminismStore;
    eventCommitPort: RuntimeEventCommitPort;
    activityDispatchPort: RuntimeActivityDispatchPort;
    resourceCoordinator: RuntimeResourceCoordinator;
    causationId?: string;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `activityDispatchPort` | property | <code>activityDispatchPort: RuntimeActivityDispatchPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `attempt` | property | <code>attempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `determinismStore` | property | <code>determinismStore: RuntimeDeterminismStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventCommitPort` | property | <code>eventCommitPort: RuntimeEventCommitPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextId` | method | <code>nextId?(namespace: string): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `process` | property | <code>process: FSMProcessSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceCoordinator` | property | <code>resourceCoordinator: RuntimeResourceCoordinator</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `run` | property | <code>run: RuntimeRun</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshot` | property | <code>snapshot: FSMSnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeExecutionContext`

Runtime Execution Context interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeExecutionContext } from '@codesoul-co/hypha-harness';`
- Source module: [`execution-context`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/execution-context.ts)

### Declaration

```text
export interface RuntimeExecutionContext {
    readonly scope: Readonly<RuntimeScope>;
    readonly principal: Readonly<RuntimePrincipal>;
    readonly run: Readonly<RuntimeRun>;
    readonly snapshot: Readonly<FSMSnapshot>;
    readonly process: Readonly<FSMProcessSpec>;
    readonly state: Readonly<FSMStateSpec>;
    readonly attempt: number;
    readonly fencingToken: number;
    readonly abortSignal: AbortSignal;
    readonly events: RuntimeEventHelper;
    readonly activities: RuntimeActivityHelper;
    readonly transitions: RuntimeTransitionHelper;
    readonly waits: RuntimeWaitHelper;
    readonly resources: RuntimeResourceHelper;
    readonly clock: RuntimeClockHelper;
    readonly ids: RuntimeIdHelper;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>readonly abortSignal: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `activities` | property | <code>readonly activities: RuntimeActivityHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `attempt` | property | <code>readonly attempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `clock` | property | <code>readonly clock: RuntimeClockHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>readonly events: RuntimeEventHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>readonly fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ids` | property | <code>readonly ids: RuntimeIdHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>readonly principal: Readonly&lt;RuntimePrincipal&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `process` | property | <code>readonly process: Readonly&lt;FSMProcessSpec&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resources` | property | <code>readonly resources: RuntimeResourceHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `run` | property | <code>readonly run: Readonly&lt;RuntimeRun&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>readonly scope: Readonly&lt;RuntimeScope&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshot` | property | <code>readonly snapshot: Readonly&lt;FSMSnapshot&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>readonly state: Readonly&lt;FSMStateSpec&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transitions` | property | <code>readonly transitions: RuntimeTransitionHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `waits` | property | <code>readonly waits: RuntimeWaitHelper</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
