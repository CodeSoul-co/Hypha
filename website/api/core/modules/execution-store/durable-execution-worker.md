# `@codesoul-co/hypha-core` / `modules/execution-store/durable-execution-worker`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-store/durable-execution-worker.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/durable-execution-worker.ts)
- Exports: **5**

## Using this module

Use the Durable execution worker module for persisting and reading data at this boundary. It exports 3 classes, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  DurableExecutionWorker,
  ExecutionWorkerLeaseLostError,
  ExecutionWorkerReconciliationRequiredError,
} from '@codesoul-co/hypha-core';

import type {
  DurableExecutionRecoveryReconciler,
  DurableExecutionWorkerOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DurableExecutionWorker` | class | <code>new DurableExecutionWorker(options: DurableExecutionWorkerOptions): DurableExecutionWorker</code> | Provider-neutral lease/fencing coordinator for durable Execution workers. Provider execution remains behind the Execution activity boundary. This class only claims persisted work and supplies fenced renew/commit/release operations so Server composition does not reimplement Store semantics. |
| `ExecutionWorkerLeaseLostError` | class | <code>new ExecutionWorkerLeaseLostError(executionId: string, workerId: string): ExecutionWorkerLeaseLostError</code> | Execution Worker Lease Lost Error class with 9 public constructor or member entries; its exact declarations are listed below. |
| `ExecutionWorkerReconciliationRequiredError` | class | <code>new ExecutionWorkerReconciliationRequiredError(executionId: string, reason: string): ExecutionWorkerReconciliationRequiredError</code> | Execution Worker Reconciliation Required Error class with 10 public constructor or member entries; its exact declarations are listed below. |
| `DurableExecutionRecoveryReconciler` | interface | <code>interface DurableExecutionRecoveryReconciler</code> | Durable Execution Recovery Reconciler interface with 1 public fields or methods. |
| `DurableExecutionWorkerOptions` | interface | <code>interface DurableExecutionWorkerOptions</code> | Durable Execution Worker Options interface with 7 public fields or methods. |

## `DurableExecutionWorker`

Provider-neutral lease/fencing coordinator for durable Execution workers. Provider execution remains behind the Execution activity boundary. This class only claims persisted work and supplies fenced renew/commit/release operations so Server composition does not reimplement Store semantics.

- Kind: class
- Import: `import { DurableExecutionWorker } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/durable-execution-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/durable-execution-worker.ts)

### Declaration

```text
export declare class DurableExecutionWorker {
    constructor(options: DurableExecutionWorkerOptions);
    startClaiming(): void;
    stopClaiming(): void;
    claimNext(): Promise<ExecutionRecord | null>;
    renew(recordValue: ExecutionRecord): Promise<ExecutionRecord>;
    commit(recordValue: ExecutionRecord, resultValue: CommandExecutionResult): Promise<ExecutionRecord>;
    checkpointTerminalReceipt(recordValue: ExecutionRecord, receiptValue: ExecutionReceipt): Promise<ExecutionRecord>;
    release(recordValue: ExecutionRecord, reason?: string): Promise<ExecutionRecord>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointTerminalReceipt` | method | <code>checkpointTerminalReceipt(recordValue: ExecutionRecord, receiptValue: ExecutionReceipt): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `claimNext` | method | <code>claimNext(): Promise&lt;ExecutionRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `commit` | method | <code>commit(recordValue: ExecutionRecord, resultValue: CommandExecutionResult): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: DurableExecutionWorkerOptions): DurableExecutionWorker</code> | Creates an instance of this class. |
| `release` | method | <code>release(recordValue: ExecutionRecord, reason?: string): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(recordValue: ExecutionRecord): Promise&lt;ExecutionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `startClaiming` | method | <code>startClaiming(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stopClaiming` | method | <code>stopClaiming(): void</code> | Public method; parameters and return type are shown in the signature. |

## `ExecutionWorkerLeaseLostError`

Execution Worker Lease Lost Error class with 9 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ExecutionWorkerLeaseLostError } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/durable-execution-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/durable-execution-worker.ts)

### Declaration

```text
export declare class ExecutionWorkerLeaseLostError extends Error {
    readonly code = "EXECUTION_WORKER_LEASE_LOST";
    constructor(executionId: string, workerId: string);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: "EXECUTION_WORKER_LEASE_LOST"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(executionId: string, workerId: string): ExecutionWorkerLeaseLostError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ExecutionWorkerReconciliationRequiredError`

Execution Worker Reconciliation Required Error class with 10 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ExecutionWorkerReconciliationRequiredError } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/durable-execution-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/durable-execution-worker.ts)

### Declaration

```text
export declare class ExecutionWorkerReconciliationRequiredError extends Error {
    readonly code = "EXECUTION_WORKER_RECONCILIATION_REQUIRED";
    readonly reason: string;
    constructor(executionId: string, reason: string);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: "EXECUTION_WORKER_RECONCILIATION_REQUIRED"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(executionId: string, reason: string): ExecutionWorkerReconciliationRequiredError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>readonly reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `DurableExecutionRecoveryReconciler`

Durable Execution Recovery Reconciler interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { DurableExecutionRecoveryReconciler } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/durable-execution-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/durable-execution-worker.ts)

### Declaration

```text
export interface DurableExecutionRecoveryReconciler {
    assess(record: ExecutionRecord): Promise<ExecutionRecoveryAssessment>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assess` | method | <code>assess(record: ExecutionRecord): Promise&lt;ExecutionRecoveryAssessment&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DurableExecutionWorkerOptions`

Durable Execution Worker Options interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { DurableExecutionWorkerOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-store/durable-execution-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/durable-execution-worker.ts)

### Declaration

```text
export interface DurableExecutionWorkerOptions {
    store: ExecutionStore;
    workerId: string;
    recoveryReconciler?: DurableExecutionRecoveryReconciler;
    leaseTtlMs?: number;
    claimBatchSize?: number;
    now?: () => string;
    leaseId?: (executionId: string, workerId: string) => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimBatchSize` | property | <code>claimBatchSize?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseId` | method | <code>leaseId?(executionId: string, workerId: string): string</code> | Public method; parameters and return type are shown in the signature. |
| `leaseTtlMs` | property | <code>leaseTtlMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `recoveryReconciler` | property | <code>recoveryReconciler?: DurableExecutionRecoveryReconciler</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `store` | property | <code>store: ExecutionStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workerId` | property | <code>workerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
