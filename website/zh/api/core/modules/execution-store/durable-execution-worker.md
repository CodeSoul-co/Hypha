# `@codesoul-co/hypha-core` / `modules/execution-store/durable-execution-worker`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/execution-store/durable-execution-worker.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/durable-execution-worker.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DurableExecutionWorker` | 类 | <code>new DurableExecutionWorker(options: DurableExecutionWorkerOptions): DurableExecutionWorker</code> | Provider-neutral lease/fencing coordinator for durable Execution workers. Provider execution remains behind the Execution activity boundary. This class only claims persisted work and supplies fenced renew/commit/release operations so Server composition does not reimplement Store semantics. |
| `ExecutionWorkerLeaseLostError` | 类 | <code>new ExecutionWorkerLeaseLostError(executionId: string, workerId: string): ExecutionWorkerLeaseLostError</code> | Execution Worker Lease Lost Error 的运行时实现；公开构造函数与成员见下表。 |
| `ExecutionWorkerReconciliationRequiredError` | 类 | <code>new ExecutionWorkerReconciliationRequiredError(executionId: string, reason: string): ExecutionWorkerReconciliationRequiredError</code> | Execution Worker Reconciliation Required Error 的运行时实现；公开构造函数与成员见下表。 |
| `DurableExecutionRecoveryReconciler` | 接口 | <code>interface DurableExecutionRecoveryReconciler</code> | Durable Execution Recovery Reconciler 的字段契约；完整字段见下表。 |
| `DurableExecutionWorkerOptions` | 接口 | <code>interface DurableExecutionWorkerOptions</code> | Durable Execution Worker Options 的字段契约；完整字段见下表。 |

## `DurableExecutionWorker` 公开成员

Provider-neutral lease/fencing coordinator for durable Execution workers. Provider execution remains behind the Execution activity boundary. This class only claims persisted work and supplies fenced renew/commit/release operations so Server composition does not reimplement Store semantics.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointTerminalReceipt` | 方法 | <code>checkpointTerminalReceipt(recordValue: ExecutionRecord, receiptValue: ExecutionReceipt): Promise&lt;ExecutionRecord&gt;</code> | checkpoint Terminal Receipt 的公开运行时操作。 |
| `claimNext` | 方法 | <code>claimNext(): Promise&lt;ExecutionRecord &#124; null&gt;</code> | claim Next 的公开运行时操作。 |
| `commit` | 方法 | <code>commit(recordValue: ExecutionRecord, resultValue: CommandExecutionResult): Promise&lt;ExecutionRecord&gt;</code> | commit 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: DurableExecutionWorkerOptions): DurableExecutionWorker</code> | 创建该类的实例。 |
| `release` | 方法 | <code>release(recordValue: ExecutionRecord, reason?: string): Promise&lt;ExecutionRecord&gt;</code> | release 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(recordValue: ExecutionRecord): Promise&lt;ExecutionRecord&gt;</code> | renew 的公开运行时操作。 |
| `startClaiming` | 方法 | <code>startClaiming(): void</code> | 启动 Claiming。 |
| `stopClaiming` | 方法 | <code>stopClaiming(): void</code> | stop Claiming 的公开运行时操作。 |

## `ExecutionWorkerLeaseLostError` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause: unknown</code> | cause 字段。 |
| `code` | 属性 | <code>code: "EXECUTION_WORKER_LEASE_LOST"</code> | code 字段。 |
| `constructor` | 构造函数 | <code>(executionId: string, workerId: string): ExecutionWorkerLeaseLostError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `stack` | 属性 | <code>stack: string</code> | stack 字段。 |
| `static captureStackTrace` | 方法 | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | prepare Stack Trace 的公开运行时操作。 |
| `static stackTraceLimit` | 属性 | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ExecutionWorkerReconciliationRequiredError` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause: unknown</code> | cause 字段。 |
| `code` | 属性 | <code>code: "EXECUTION_WORKER_RECONCILIATION_REQUIRED"</code> | code 字段。 |
| `constructor` | 构造函数 | <code>(executionId: string, reason: string): ExecutionWorkerReconciliationRequiredError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `stack` | 属性 | <code>stack: string</code> | stack 字段。 |
| `static captureStackTrace` | 方法 | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | prepare Stack Trace 的公开运行时操作。 |
| `static stackTraceLimit` | 属性 | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `DurableExecutionRecoveryReconciler` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assess` | 方法 | <code>assess(record: ExecutionRecord): Promise&lt;ExecutionRecoveryAssessment&gt;</code> | assess 的公开运行时操作。 |

## `DurableExecutionWorkerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimBatchSize` | 属性 | <code>claimBatchSize: number</code> | claim Batch Size 字段。 |
| `leaseId` | 方法 | <code>leaseId(executionId: string, workerId: string): string</code> | lease Id 的公开运行时操作。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `recoveryReconciler` | 属性 | <code>recoveryReconciler: DurableExecutionRecoveryReconciler</code> | recovery Reconciler 字段。 |
| `store` | 属性 | <code>store: ExecutionStore</code> | store 字段。 |
| `workerId` | 属性 | <code>workerId: string</code> | worker Id 字段。 |
