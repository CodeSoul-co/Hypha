# `@codesoul-co/hypha-core` / `modules/runtime/session-command-scheduler`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/session-command-scheduler.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-scheduler.ts)
- 导出数: **5**

## 模块用法

用于执行该边界的运行时行为。Session command scheduler 模块公开 1 类、4 接口。

### 从包入口导入

```ts
import {
  DurableSessionCommandScheduler,
} from '@codesoul-co/hypha-core';

import type {
  DurableSessionCommandSchedulerOptions,
  RunSessionCommandSchedulerRequest,
  SessionCommandProcessor,
  SessionCommandSchedulerResult,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DurableSessionCommandScheduler` | 类 | <code>new DurableSessionCommandScheduler(options: DurableSessionCommandSchedulerOptions): DurableSessionCommandScheduler</code> | Repeatedly invokes a single-command processor until shutdown is requested. Abort stops new claims, wakes idle waits, and lets an in-flight handler drain. |
| `DurableSessionCommandSchedulerOptions` | 接口 | <code>interface DurableSessionCommandSchedulerOptions</code> | Durable Session Command Scheduler Options 接口，共包含 7 个公开字段或方法。 |
| `RunSessionCommandSchedulerRequest` | 接口 | <code>interface RunSessionCommandSchedulerRequest</code> | Run Session Command Scheduler Request 接口，共包含 2 个公开字段或方法。 |
| `SessionCommandProcessor` | 接口 | <code>interface SessionCommandProcessor</code> | Session Command Processor 接口，共包含 1 个公开字段或方法。 |
| `SessionCommandSchedulerResult` | 接口 | <code>interface SessionCommandSchedulerResult</code> | Session Command Scheduler Result 接口，共包含 3 个公开字段或方法。 |

## `DurableSessionCommandScheduler`

Repeatedly invokes a single-command processor until shutdown is requested. Abort stops new claims, wakes idle waits, and lets an in-flight handler drain.

- 种类: 类
- 导入: `import { DurableSessionCommandScheduler } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-scheduler`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-scheduler.ts)

### 声明

```text
export declare class DurableSessionCommandScheduler {
    constructor(options: DurableSessionCommandSchedulerOptions);
    run(request: RunSessionCommandSchedulerRequest): Promise<SessionCommandSchedulerResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DurableSessionCommandSchedulerOptions): DurableSessionCommandScheduler</code> | 创建该类的实例。 |
| `run` | 方法 | <code>run(request: RunSessionCommandSchedulerRequest): Promise&lt;SessionCommandSchedulerResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DurableSessionCommandSchedulerOptions`

Durable Session Command Scheduler Options 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableSessionCommandSchedulerOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-scheduler`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-scheduler.ts)

### 声明

```text
export interface DurableSessionCommandSchedulerOptions {
    worker: SessionCommandProcessor;
    pollIntervalMs?: number;
    errorBackoffMs?: number;
    shutdownDrainMs?: number;
    wait?: (delayMs: number, signal: AbortSignal) => Promise<void>;
    onResult?: (result: SessionCommandWorkerResult) => void;
    onError?: (error: unknown) => void;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `errorBackoffMs` | 属性 | <code>errorBackoffMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `onError` | 方法 | <code>onError?(error: unknown): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onResult` | 方法 | <code>onResult?(result: SessionCommandWorkerResult): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `pollIntervalMs` | 属性 | <code>pollIntervalMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `shutdownDrainMs` | 属性 | <code>shutdownDrainMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `wait` | 方法 | <code>wait?(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `worker` | 属性 | <code>worker: SessionCommandProcessor</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RunSessionCommandSchedulerRequest`

Run Session Command Scheduler Request 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunSessionCommandSchedulerRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-scheduler`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-scheduler.ts)

### 声明

```text
export interface RunSessionCommandSchedulerRequest {
    signal: AbortSignal;
    scope?: SessionQueueScope;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `scope` | 属性 | <code>scope?: SessionQueueScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionCommandProcessor`

Session Command Processor 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionCommandProcessor } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-scheduler`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-scheduler.ts)

### 声明

```text
export interface SessionCommandProcessor {
    processNext(scope?: SessionQueueScope, signal?: AbortSignal): Promise<SessionCommandWorkerResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `processNext` | 方法 | <code>processNext(scope?: SessionQueueScope, signal?: AbortSignal): Promise&lt;SessionCommandWorkerResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SessionCommandSchedulerResult`

Session Command Scheduler Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionCommandSchedulerResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-scheduler`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-scheduler.ts)

### 声明

```text
export interface SessionCommandSchedulerResult {
    processed: number;
    idlePolls: number;
    errors: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `errors` | 属性 | <code>errors: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idlePolls` | 属性 | <code>idlePolls: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processed` | 属性 | <code>processed: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
