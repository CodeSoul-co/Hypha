# `@codesoul-co/hypha-core` / `modules/execution-store/durable-execution-worker`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-store/durable-execution-worker.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/durable-execution-worker.ts)
- 导出数: **5**

## 模块用法

用于持久化并读取该边界的数据。Durable execution worker 模块公开 3 类、2 接口。

### 从包入口导入

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

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DurableExecutionWorker` | 类 | <code>new DurableExecutionWorker(options: DurableExecutionWorkerOptions): DurableExecutionWorker</code> | Provider-neutral lease/fencing coordinator for durable Execution workers. Provider execution remains behind the Execution activity boundary. This class only claims persisted work and supplies fenced renew/commit/release operations so Server composition does not reimplement Store semantics. |
| `ExecutionWorkerLeaseLostError` | 类 | <code>new ExecutionWorkerLeaseLostError(executionId: string, workerId: string): ExecutionWorkerLeaseLostError</code> | Execution Worker Lease Lost Error 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ExecutionWorkerReconciliationRequiredError` | 类 | <code>new ExecutionWorkerReconciliationRequiredError(executionId: string, reason: string): ExecutionWorkerReconciliationRequiredError</code> | Execution Worker Reconciliation Required Error 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DurableExecutionRecoveryReconciler` | 接口 | <code>interface DurableExecutionRecoveryReconciler</code> | Durable Execution Recovery Reconciler 接口，共包含 1 个公开字段或方法。 |
| `DurableExecutionWorkerOptions` | 接口 | <code>interface DurableExecutionWorkerOptions</code> | Durable Execution Worker Options 接口，共包含 7 个公开字段或方法。 |

## `DurableExecutionWorker`

Provider-neutral lease/fencing coordinator for durable Execution workers. Provider execution remains behind the Execution activity boundary. This class only claims persisted work and supplies fenced renew/commit/release operations so Server composition does not reimplement Store semantics.

- 种类: 类
- 导入: `import { DurableExecutionWorker } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/durable-execution-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/durable-execution-worker.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointTerminalReceipt` | 方法 | <code>checkpointTerminalReceipt(recordValue: ExecutionRecord, receiptValue: ExecutionReceipt): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `claimNext` | 方法 | <code>claimNext(): Promise&lt;ExecutionRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `commit` | 方法 | <code>commit(recordValue: ExecutionRecord, resultValue: CommandExecutionResult): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: DurableExecutionWorkerOptions): DurableExecutionWorker</code> | 创建该类的实例。 |
| `release` | 方法 | <code>release(recordValue: ExecutionRecord, reason?: string): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(recordValue: ExecutionRecord): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `startClaiming` | 方法 | <code>startClaiming(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stopClaiming` | 方法 | <code>stopClaiming(): void</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExecutionWorkerLeaseLostError`

Execution Worker Lease Lost Error 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ExecutionWorkerLeaseLostError } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/durable-execution-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/durable-execution-worker.ts)

### 声明

```text
export declare class ExecutionWorkerLeaseLostError extends Error {
    readonly code = "EXECUTION_WORKER_LEASE_LOST";
    constructor(executionId: string, workerId: string);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: "EXECUTION_WORKER_LEASE_LOST"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(executionId: string, workerId: string): ExecutionWorkerLeaseLostError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ExecutionWorkerReconciliationRequiredError`

Execution Worker Reconciliation Required Error 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ExecutionWorkerReconciliationRequiredError } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/durable-execution-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/durable-execution-worker.ts)

### 声明

```text
export declare class ExecutionWorkerReconciliationRequiredError extends Error {
    readonly code = "EXECUTION_WORKER_RECONCILIATION_REQUIRED";
    readonly reason: string;
    constructor(executionId: string, reason: string);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: "EXECUTION_WORKER_RECONCILIATION_REQUIRED"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(executionId: string, reason: string): ExecutionWorkerReconciliationRequiredError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>readonly reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `DurableExecutionRecoveryReconciler`

Durable Execution Recovery Reconciler 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableExecutionRecoveryReconciler } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/durable-execution-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/durable-execution-worker.ts)

### 声明

```text
export interface DurableExecutionRecoveryReconciler {
    assess(record: ExecutionRecord): Promise<ExecutionRecoveryAssessment>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assess` | 方法 | <code>assess(record: ExecutionRecord): Promise&lt;ExecutionRecoveryAssessment&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DurableExecutionWorkerOptions`

Durable Execution Worker Options 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableExecutionWorkerOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-store/durable-execution-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-store/durable-execution-worker.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimBatchSize` | 属性 | <code>claimBatchSize?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseId` | 方法 | <code>leaseId?(executionId: string, workerId: string): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recoveryReconciler` | 属性 | <code>recoveryReconciler?: DurableExecutionRecoveryReconciler</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `store` | 属性 | <code>store: ExecutionStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workerId` | 属性 | <code>workerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
