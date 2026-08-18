# `@codesoul-co/hypha-core` / `modules/execution-store/durable-execution-worker`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/execution-store/durable-execution-worker.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/durable-execution-worker.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DurableExecutionWorker` | class | <code>new DurableExecutionWorker(options: DurableExecutionWorkerOptions): DurableExecutionWorker</code> | Provider-neutral lease/fencing coordinator for durable Execution workers. Provider execution remains behind the Execution activity boundary. This class only claims persisted work and supplies fenced renew/commit/release operations so Server composition does not reimplement Store semantics. |
| `ExecutionWorkerLeaseLostError` | class | <code>new ExecutionWorkerLeaseLostError(executionId: string, workerId: string): ExecutionWorkerLeaseLostError</code> | Runtime implementation for Execution Worker Lease Lost Error; see its public constructor and members below. |
| `ExecutionWorkerReconciliationRequiredError` | class | <code>new ExecutionWorkerReconciliationRequiredError(executionId: string, reason: string): ExecutionWorkerReconciliationRequiredError</code> | Runtime implementation for Execution Worker Reconciliation Required Error; see its public constructor and members below. |
| `DurableExecutionRecoveryReconciler` | interface | <code>interface DurableExecutionRecoveryReconciler</code> | Field contract for Durable Execution Recovery Reconciler; see all contract members below. |
| `DurableExecutionWorkerOptions` | interface | <code>interface DurableExecutionWorkerOptions</code> | Field contract for Durable Execution Worker Options; see all contract members below. |

## `DurableExecutionWorker` public members

Provider-neutral lease/fencing coordinator for durable Execution workers. Provider execution remains behind the Execution activity boundary. This class only claims persisted work and supplies fenced renew/commit/release operations so Server composition does not reimplement Store semantics.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointTerminalReceipt` | method | <code>checkpointTerminalReceipt(recordValue: ExecutionRecord, receiptValue: ExecutionReceipt): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for checkpoint Terminal Receipt. |
| `claimNext` | method | <code>claimNext(): Promise&lt;ExecutionRecord &#124; null&gt;</code> | Public runtime operation for claim Next. |
| `commit` | method | <code>commit(recordValue: ExecutionRecord, resultValue: CommandExecutionResult): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for commit. |
| `constructor` | constructor | <code>(options: DurableExecutionWorkerOptions): DurableExecutionWorker</code> | Creates an instance of this class. |
| `release` | method | <code>release(recordValue: ExecutionRecord, reason?: string): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(recordValue: ExecutionRecord): Promise&lt;ExecutionRecord&gt;</code> | Public runtime operation for renew. |
| `startClaiming` | method | <code>startClaiming(): void</code> | Starts Claiming at this module boundary. |
| `stopClaiming` | method | <code>stopClaiming(): void</code> | Public runtime operation for stop Claiming. |

## `ExecutionWorkerLeaseLostError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: "EXECUTION_WORKER_LEASE_LOST"</code> | Public code property. |
| `constructor` | constructor | <code>(executionId: string, workerId: string): ExecutionWorkerLeaseLostError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ExecutionWorkerReconciliationRequiredError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: "EXECUTION_WORKER_RECONCILIATION_REQUIRED"</code> | Public code property. |
| `constructor` | constructor | <code>(executionId: string, reason: string): ExecutionWorkerReconciliationRequiredError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `DurableExecutionRecoveryReconciler` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assess` | method | <code>assess(record: ExecutionRecord): Promise&lt;ExecutionRecoveryAssessment&gt;</code> | Public runtime operation for assess. |

## `DurableExecutionWorkerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimBatchSize` | property | <code>claimBatchSize: number</code> | Public claim Batch Size property. |
| `leaseId` | method | <code>leaseId(executionId: string, workerId: string): string</code> | Public runtime operation for lease Id. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `recoveryReconciler` | property | <code>recoveryReconciler: DurableExecutionRecoveryReconciler</code> | Public recovery Reconciler property. |
| `store` | property | <code>store: ExecutionStore</code> | Public store property. |
| `workerId` | property | <code>workerId: string</code> | Public worker Id property. |
