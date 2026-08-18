# `@codesoul-co/hypha-core` / `modules/execution-output/completion`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-output/completion.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)
- Exports: **10**

## Using this module

Use the Completion module for executing runtime behavior at this boundary. It exports 2 classes, 1 function, 7 interfaces.

### Import from the package entrypoint

```ts
import {
  DurableExecutionCompletionCoordinator,
  DurableExecutionTerminalEventCoordinator,
  createDurableExecutionTerminalEvent,
} from '@codesoul-co/hypha-core';

import type {
  DurableExecutionCompletionCoordinatorOptions,
  DurableExecutionCompletionRequest,
  DurableExecutionCompletionResult,
  DurableExecutionCompletionWorker,
  DurableExecutionTerminalEventCommitPort,
  DurableExecutionTerminalEventCommitRequest,
  DurableExecutionTerminalEventCoordinatorOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DurableExecutionCompletionCoordinator` | class | <code>new DurableExecutionCompletionCoordinator(options: DurableExecutionCompletionCoordinatorOptions): DurableExecutionCompletionCoordinator</code> | Orders the Execution-owned durable completion barriers. Provider execution is deliberately absent: retries begin from the persisted terminal receipt, repeat idempotent Artifact collection/finalization, and only then attempt the fenced terminal record CAS. |
| `DurableExecutionTerminalEventCoordinator` | class | <code>new DurableExecutionTerminalEventCoordinator(options: DurableExecutionTerminalEventCoordinatorOptions): DurableExecutionTerminalEventCoordinator</code> | Appends the Execution terminal event only after a durable terminal record exists. Provider execution and Artifact collection are deliberately absent, so recovery can retry a failed append without repeating either side effect. |
| `createDurableExecutionTerminalEvent` | function | <code>createDurableExecutionTerminalEvent(recordValue: ExecutionRecord): ExecutionFrameworkEvent</code> | Create Durable Execution Terminal Event function with 1 public call signature; parameters and return types are listed below. |
| `DurableExecutionCompletionCoordinatorOptions` | interface | <code>interface DurableExecutionCompletionCoordinatorOptions</code> | Durable Execution Completion Coordinator Options interface with 3 public fields or methods. |
| `DurableExecutionCompletionRequest` | interface | <code>interface DurableExecutionCompletionRequest</code> | Durable Execution Completion Request interface with 4 public fields or methods. |
| `DurableExecutionCompletionResult` | interface | <code>interface DurableExecutionCompletionResult</code> | Durable Execution Completion Result interface with 2 public fields or methods. |
| `DurableExecutionCompletionWorker` | interface | <code>interface DurableExecutionCompletionWorker</code> | Durable Execution Completion Worker interface with 3 public fields or methods. |
| `DurableExecutionTerminalEventCommitPort` | interface | <code>interface DurableExecutionTerminalEventCommitPort</code> | Runtime implements this port with its durable Event Store. Repeated calls with the same idempotency key and event must resolve to the same append. |
| `DurableExecutionTerminalEventCommitRequest` | interface | <code>interface DurableExecutionTerminalEventCommitRequest</code> | Durable Execution Terminal Event Commit Request interface with 3 public fields or methods. |
| `DurableExecutionTerminalEventCoordinatorOptions` | interface | <code>interface DurableExecutionTerminalEventCoordinatorOptions</code> | Durable Execution Terminal Event Coordinator Options interface with 1 public fields or methods. |

## `DurableExecutionCompletionCoordinator`

Orders the Execution-owned durable completion barriers. Provider execution is deliberately absent: retries begin from the persisted terminal receipt, repeat idempotent Artifact collection/finalization, and only then attempt the fenced terminal record CAS.

- Kind: class
- Import: `import { DurableExecutionCompletionCoordinator } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### Declaration

```text
export declare class DurableExecutionCompletionCoordinator {
    constructor(options: DurableExecutionCompletionCoordinatorOptions);
    complete(request: DurableExecutionCompletionRequest): Promise<DurableExecutionCompletionResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(request: DurableExecutionCompletionRequest): Promise&lt;DurableExecutionCompletionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: DurableExecutionCompletionCoordinatorOptions): DurableExecutionCompletionCoordinator</code> | Creates an instance of this class. |

## `DurableExecutionTerminalEventCoordinator`

Appends the Execution terminal event only after a durable terminal record exists. Provider execution and Artifact collection are deliberately absent, so recovery can retry a failed append without repeating either side effect.

- Kind: class
- Import: `import { DurableExecutionTerminalEventCoordinator } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### Declaration

```text
export declare class DurableExecutionTerminalEventCoordinator {
    constructor(options: DurableExecutionTerminalEventCoordinatorOptions);
    append(recordValue: ExecutionRecord): Promise<ExecutionFrameworkEvent>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(recordValue: ExecutionRecord): Promise&lt;ExecutionFrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: DurableExecutionTerminalEventCoordinatorOptions): DurableExecutionTerminalEventCoordinator</code> | Creates an instance of this class. |

## `createDurableExecutionTerminalEvent`

Create Durable Execution Terminal Event function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createDurableExecutionTerminalEvent } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### Declaration

```text
export declare function createDurableExecutionTerminalEvent(recordValue: ExecutionRecord): ExecutionFrameworkEvent;
```

### Call signature

```text
createDurableExecutionTerminalEvent(recordValue: ExecutionRecord): ExecutionFrameworkEvent
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `recordValue` | <code>ExecutionRecord</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExecutionFrameworkEvent`
- Description: The return contract is defined by the type shown above.

## `DurableExecutionCompletionCoordinatorOptions`

Durable Execution Completion Coordinator Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { DurableExecutionCompletionCoordinatorOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### Declaration

```text
export interface DurableExecutionCompletionCoordinatorOptions {
    worker: DurableExecutionCompletionWorker;
    planner: ExecutionOutputPlanner;
    collector: ExecutionOutputCollector;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collector` | property | <code>collector: ExecutionOutputCollector</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `planner` | property | <code>planner: ExecutionOutputPlanner</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `worker` | property | <code>worker: DurableExecutionCompletionWorker</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DurableExecutionCompletionRequest`

Durable Execution Completion Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { DurableExecutionCompletionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### Declaration

```text
export interface DurableExecutionCompletionRequest {
    record: ExecutionRecord;
    result: CommandExecutionResult;
    outputPolicy: ExecutionOutputCollectionPolicy;
    outputContext: ExecutionOutputCollectionContext;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `outputContext` | property | <code>outputContext: ExecutionOutputCollectionContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputPolicy` | property | <code>outputPolicy: ExecutionOutputCollectionPolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `record` | property | <code>record: ExecutionRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `result` | property | <code>result: CommandExecutionResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DurableExecutionCompletionResult`

Durable Execution Completion Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { DurableExecutionCompletionResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### Declaration

```text
export interface DurableExecutionCompletionResult {
    record: ExecutionRecord;
    output: ExecutionOutputCollectionResult;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `output` | property | <code>output: ExecutionOutputCollectionResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `record` | property | <code>record: ExecutionRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DurableExecutionCompletionWorker`

Durable Execution Completion Worker interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { DurableExecutionCompletionWorker } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### Declaration

```text
export interface DurableExecutionCompletionWorker {
    renew(record: ExecutionRecord): Promise<ExecutionRecord>;
    checkpointTerminalReceipt(record: ExecutionRecord, receipt: ExecutionReceipt): Promise<ExecutionRecord>;
    commit(record: ExecutionRecord, result: CommandExecutionResult): Promise<ExecutionRecord>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointTerminalReceipt` | method | <code>checkpointTerminalReceipt(record: ExecutionRecord, receipt: ExecutionReceipt): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `commit` | method | <code>commit(record: ExecutionRecord, result: CommandExecutionResult): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(record: ExecutionRecord): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DurableExecutionTerminalEventCommitPort`

Runtime implements this port with its durable Event Store. Repeated calls with the same idempotency key and event must resolve to the same append.

- Kind: interface
- Import: `import type { DurableExecutionTerminalEventCommitPort } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### Declaration

```text
export interface DurableExecutionTerminalEventCommitPort {
    append(request: DurableExecutionTerminalEventCommitRequest): Promise<unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: DurableExecutionTerminalEventCommitRequest): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DurableExecutionTerminalEventCommitRequest`

Durable Execution Terminal Event Commit Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { DurableExecutionTerminalEventCommitRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### Declaration

```text
export interface DurableExecutionTerminalEventCommitRequest {
    event: ExecutionFrameworkEvent;
    executionRevision: number;
    idempotencyKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `event` | property | <code>event: ExecutionFrameworkEvent</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionRevision` | property | <code>executionRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DurableExecutionTerminalEventCoordinatorOptions`

Durable Execution Terminal Event Coordinator Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { DurableExecutionTerminalEventCoordinatorOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### Declaration

```text
export interface DurableExecutionTerminalEventCoordinatorOptions {
    events: DurableExecutionTerminalEventCommitPort;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: DurableExecutionTerminalEventCommitPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
