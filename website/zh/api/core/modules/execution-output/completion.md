# `@codesoul-co/hypha-core` / `modules/execution-output/completion`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-output/completion.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)
- 导出数: **10**

## 模块用法

用于执行该边界的运行时行为。Completion 模块公开 2 类、1 函数、7 接口。

### 从包入口导入

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

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DurableExecutionCompletionCoordinator` | 类 | <code>new DurableExecutionCompletionCoordinator(options: DurableExecutionCompletionCoordinatorOptions): DurableExecutionCompletionCoordinator</code> | Orders the Execution-owned durable completion barriers. Provider execution is deliberately absent: retries begin from the persisted terminal receipt, repeat idempotent Artifact collection/finalization, and only then attempt the fenced terminal record CAS. |
| `DurableExecutionTerminalEventCoordinator` | 类 | <code>new DurableExecutionTerminalEventCoordinator(options: DurableExecutionTerminalEventCoordinatorOptions): DurableExecutionTerminalEventCoordinator</code> | Appends the Execution terminal event only after a durable terminal record exists. Provider execution and Artifact collection are deliberately absent, so recovery can retry a failed append without repeating either side effect. |
| `createDurableExecutionTerminalEvent` | 函数 | <code>createDurableExecutionTerminalEvent(recordValue: ExecutionRecord): ExecutionFrameworkEvent</code> | Create Durable Execution Terminal Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `DurableExecutionCompletionCoordinatorOptions` | 接口 | <code>interface DurableExecutionCompletionCoordinatorOptions</code> | Durable Execution Completion Coordinator Options 接口，共包含 3 个公开字段或方法。 |
| `DurableExecutionCompletionRequest` | 接口 | <code>interface DurableExecutionCompletionRequest</code> | Durable Execution Completion Request 接口，共包含 4 个公开字段或方法。 |
| `DurableExecutionCompletionResult` | 接口 | <code>interface DurableExecutionCompletionResult</code> | Durable Execution Completion Result 接口，共包含 2 个公开字段或方法。 |
| `DurableExecutionCompletionWorker` | 接口 | <code>interface DurableExecutionCompletionWorker</code> | Durable Execution Completion Worker 接口，共包含 3 个公开字段或方法。 |
| `DurableExecutionTerminalEventCommitPort` | 接口 | <code>interface DurableExecutionTerminalEventCommitPort</code> | Runtime implements this port with its durable Event Store. Repeated calls with the same idempotency key and event must resolve to the same append. |
| `DurableExecutionTerminalEventCommitRequest` | 接口 | <code>interface DurableExecutionTerminalEventCommitRequest</code> | Durable Execution Terminal Event Commit Request 接口，共包含 3 个公开字段或方法。 |
| `DurableExecutionTerminalEventCoordinatorOptions` | 接口 | <code>interface DurableExecutionTerminalEventCoordinatorOptions</code> | Durable Execution Terminal Event Coordinator Options 接口，共包含 1 个公开字段或方法。 |

## `DurableExecutionCompletionCoordinator`

Orders the Execution-owned durable completion barriers. Provider execution is deliberately absent: retries begin from the persisted terminal receipt, repeat idempotent Artifact collection/finalization, and only then attempt the fenced terminal record CAS.

- 种类: 类
- 导入: `import { DurableExecutionCompletionCoordinator } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### 声明

```text
export declare class DurableExecutionCompletionCoordinator {
    constructor(options: DurableExecutionCompletionCoordinatorOptions);
    complete(request: DurableExecutionCompletionRequest): Promise<DurableExecutionCompletionResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(request: DurableExecutionCompletionRequest): Promise&lt;DurableExecutionCompletionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: DurableExecutionCompletionCoordinatorOptions): DurableExecutionCompletionCoordinator</code> | 创建该类的实例。 |

## `DurableExecutionTerminalEventCoordinator`

Appends the Execution terminal event only after a durable terminal record exists. Provider execution and Artifact collection are deliberately absent, so recovery can retry a failed append without repeating either side effect.

- 种类: 类
- 导入: `import { DurableExecutionTerminalEventCoordinator } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### 声明

```text
export declare class DurableExecutionTerminalEventCoordinator {
    constructor(options: DurableExecutionTerminalEventCoordinatorOptions);
    append(recordValue: ExecutionRecord): Promise<ExecutionFrameworkEvent>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(recordValue: ExecutionRecord): Promise&lt;ExecutionFrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: DurableExecutionTerminalEventCoordinatorOptions): DurableExecutionTerminalEventCoordinator</code> | 创建该类的实例。 |

## `createDurableExecutionTerminalEvent`

Create Durable Execution Terminal Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createDurableExecutionTerminalEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### 声明

```text
export declare function createDurableExecutionTerminalEvent(recordValue: ExecutionRecord): ExecutionFrameworkEvent;
```

### 调用签名

```text
createDurableExecutionTerminalEvent(recordValue: ExecutionRecord): ExecutionFrameworkEvent
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `recordValue` | <code>ExecutionRecord</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionFrameworkEvent`
- 说明: 返回值契约由上述类型定义。

## `DurableExecutionCompletionCoordinatorOptions`

Durable Execution Completion Coordinator Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableExecutionCompletionCoordinatorOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### 声明

```text
export interface DurableExecutionCompletionCoordinatorOptions {
    worker: DurableExecutionCompletionWorker;
    planner: ExecutionOutputPlanner;
    collector: ExecutionOutputCollector;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collector` | 属性 | <code>collector: ExecutionOutputCollector</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `planner` | 属性 | <code>planner: ExecutionOutputPlanner</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `worker` | 属性 | <code>worker: DurableExecutionCompletionWorker</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DurableExecutionCompletionRequest`

Durable Execution Completion Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableExecutionCompletionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### 声明

```text
export interface DurableExecutionCompletionRequest {
    record: ExecutionRecord;
    result: CommandExecutionResult;
    outputPolicy: ExecutionOutputCollectionPolicy;
    outputContext: ExecutionOutputCollectionContext;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `outputContext` | 属性 | <code>outputContext: ExecutionOutputCollectionContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputPolicy` | 属性 | <code>outputPolicy: ExecutionOutputCollectionPolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `record` | 属性 | <code>record: ExecutionRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `result` | 属性 | <code>result: CommandExecutionResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DurableExecutionCompletionResult`

Durable Execution Completion Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableExecutionCompletionResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### 声明

```text
export interface DurableExecutionCompletionResult {
    record: ExecutionRecord;
    output: ExecutionOutputCollectionResult;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `output` | 属性 | <code>output: ExecutionOutputCollectionResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `record` | 属性 | <code>record: ExecutionRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DurableExecutionCompletionWorker`

Durable Execution Completion Worker 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableExecutionCompletionWorker } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### 声明

```text
export interface DurableExecutionCompletionWorker {
    renew(record: ExecutionRecord): Promise<ExecutionRecord>;
    checkpointTerminalReceipt(record: ExecutionRecord, receipt: ExecutionReceipt): Promise<ExecutionRecord>;
    commit(record: ExecutionRecord, result: CommandExecutionResult): Promise<ExecutionRecord>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointTerminalReceipt` | 方法 | <code>checkpointTerminalReceipt(record: ExecutionRecord, receipt: ExecutionReceipt): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `commit` | 方法 | <code>commit(record: ExecutionRecord, result: CommandExecutionResult): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(record: ExecutionRecord): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DurableExecutionTerminalEventCommitPort`

Runtime implements this port with its durable Event Store. Repeated calls with the same idempotency key and event must resolve to the same append.

- 种类: 接口
- 导入: `import type { DurableExecutionTerminalEventCommitPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### 声明

```text
export interface DurableExecutionTerminalEventCommitPort {
    append(request: DurableExecutionTerminalEventCommitRequest): Promise<unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: DurableExecutionTerminalEventCommitRequest): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DurableExecutionTerminalEventCommitRequest`

Durable Execution Terminal Event Commit Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableExecutionTerminalEventCommitRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### 声明

```text
export interface DurableExecutionTerminalEventCommitRequest {
    event: ExecutionFrameworkEvent;
    executionRevision: number;
    idempotencyKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `event` | 属性 | <code>event: ExecutionFrameworkEvent</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionRevision` | 属性 | <code>executionRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DurableExecutionTerminalEventCoordinatorOptions`

Durable Execution Terminal Event Coordinator Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableExecutionTerminalEventCoordinatorOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-output/completion`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/completion.ts)

### 声明

```text
export interface DurableExecutionTerminalEventCoordinatorOptions {
    events: DurableExecutionTerminalEventCommitPort;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: DurableExecutionTerminalEventCommitPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
