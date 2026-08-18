# `@codesoul-co/hypha-harness` / `long-horizon-react-supervisor`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 源码: [`packages/harness/src/long-horizon-react-supervisor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)
- 导出数: **15**

## 模块用法

用于使用该功能边界的公共契约与操作。Long horizon react supervisor 模块公开 2 类、1 函数、11 接口、1 类型。

### 从包入口导入

```ts
import {
  LongHorizonReActSupervisor,
  ServerIngressReActContinuationScheduler,
  reActContinuationIdempotencyKey,
} from '@codesoul-co/hypha-harness';

import type {
  CoordinateReActQuantumResultInput,
  EnqueueReActContinuationCommandRequest,
  LongHorizonReActQuantumInput,
  LongHorizonReActQuantumResult,
  LongHorizonReActSupervisorOptions,
  ReActContinuationCommandIngress,
  ReActContinuationIntent,
  ReActContinuationScheduler,
} from '@codesoul-co/hypha-harness';

// 完整导出列表见下方。
```

### 使用要点

- 12 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LongHorizonReActSupervisor` | 类 | <code>new LongHorizonReActSupervisor(options: LongHorizonReActSupervisorOptions): LongHorizonReActSupervisor</code> | Executes exactly one bounded ReAct quantum. It never hides an unbounded loop. A retryable quantum boundary is handed to a durable scheduler; global budget, deadline, and non-progress boundaries require an explicit operator/workflow decision. |
| `ServerIngressReActContinuationScheduler` | 类 | <code>new ServerIngressReActContinuationScheduler(options: ServerIngressReActContinuationSchedulerOptions): ServerIngressReActContinuationScheduler</code> | Sends a complete continuation envelope through the Server command ingress. The ingress owns payload persistence and Queue reference/hash generation. |
| `reActContinuationIdempotencyKey` | 函数 | <code>reActContinuationIdempotencyKey(input: ContinueReActCommandPayloadV1): string</code> | Re Act Continuation Idempotency Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `CoordinateReActQuantumResultInput` | 接口 | <code>interface CoordinateReActQuantumResultInput</code> | Coordinate ReAct Quantum Result Input 接口，共包含 2 个公开字段或方法。 |
| `EnqueueReActContinuationCommandRequest` | 接口 | <code>interface EnqueueReActContinuationCommandRequest</code> | Enqueue ReAct Continuation Command Request 接口，共包含 13 个公开字段或方法。 |
| `LongHorizonReActQuantumInput` | 接口 | <code>interface LongHorizonReActQuantumInput</code> | Long Horizon ReAct Quantum Input 接口，共包含 3 个公开字段或方法。 |
| `LongHorizonReActQuantumResult` | 接口 | <code>interface LongHorizonReActQuantumResult</code> | Long Horizon ReAct Quantum Result 接口，共包含 4 个公开字段或方法。 |
| `LongHorizonReActSupervisorOptions` | 接口 | <code>interface LongHorizonReActSupervisorOptions</code> | Long Horizon ReAct Supervisor Options 接口，共包含 3 个公开字段或方法。 |
| `ReActContinuationCommandIngress` | 接口 | <code>interface ReActContinuationCommandIngress</code> | ReAct Continuation Command Ingress 接口，共包含 1 个公开字段或方法。 |
| `ReActContinuationIntent` | 接口 | <code>interface ReActContinuationIntent</code> | ReAct Continuation Intent 接口，共包含 6 个公开字段或方法。 |
| `ReActContinuationScheduler` | 接口 | <code>interface ReActContinuationScheduler</code> | ReAct Continuation Scheduler 接口，共包含 1 个公开字段或方法。 |
| `ReActContinuationScheduleRequest` | 接口 | <code>interface ReActContinuationScheduleRequest</code> | ReAct Continuation Schedule Request 接口，共包含 7 个公开字段或方法。 |
| `ReActContinuationScheduleResult` | 接口 | <code>interface ReActContinuationScheduleResult</code> | ReAct Continuation Schedule Result 接口，共包含 2 个公开字段或方法。 |
| `ServerIngressReActContinuationSchedulerOptions` | 接口 | <code>interface ServerIngressReActContinuationSchedulerOptions</code> | Server Ingress ReAct Continuation Scheduler Options 接口，共包含 2 个公开字段或方法。 |
| `LongHorizonReActDisposition` | 类型 | <code>type LongHorizonReActDisposition = 'completed' &#124; 'continuation_scheduled' &#124; 'continuation_required' &#124; 'waiting_human' &#124; 'cancelled' &#124; 'failed'</code> | Long Horizon ReAct Disposition 公共类型别名；完整类型表达式见声明。 |

## `LongHorizonReActSupervisor`

Executes exactly one bounded ReAct quantum. It never hides an unbounded loop. A retryable quantum boundary is handed to a durable scheduler; global budget, deadline, and non-progress boundaries require an explicit operator/workflow decision.

- 种类: 类
- 导入: `import { LongHorizonReActSupervisor } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export declare class LongHorizonReActSupervisor {
    constructor(options: LongHorizonReActSupervisorOptions);
    runQuantum(input: LongHorizonReActQuantumInput): Promise<LongHorizonReActQuantumResult>;
    coordinateResult(input: CoordinateReActQuantumResultInput): Promise<LongHorizonReActQuantumResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LongHorizonReActSupervisorOptions): LongHorizonReActSupervisor</code> | 创建该类的实例。 |
| `coordinateResult` | 方法 | <code>coordinateResult(input: CoordinateReActQuantumResultInput): Promise&lt;LongHorizonReActQuantumResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runQuantum` | 方法 | <code>runQuantum(input: LongHorizonReActQuantumInput): Promise&lt;LongHorizonReActQuantumResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ServerIngressReActContinuationScheduler`

Sends a complete continuation envelope through the Server command ingress. The ingress owns payload persistence and Queue reference/hash generation.

- 种类: 类
- 导入: `import { ServerIngressReActContinuationScheduler } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export declare class ServerIngressReActContinuationScheduler implements ReActContinuationScheduler {
    constructor(options: ServerIngressReActContinuationSchedulerOptions);
    schedule(input: ReActContinuationScheduleRequest): Promise<ReActContinuationScheduleResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ServerIngressReActContinuationSchedulerOptions): ServerIngressReActContinuationScheduler</code> | 创建该类的实例。 |
| `schedule` | 方法 | <code>schedule(input: ReActContinuationScheduleRequest): Promise&lt;ReActContinuationScheduleResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `reActContinuationIdempotencyKey`

Re Act Continuation Idempotency Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { reActContinuationIdempotencyKey } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export declare function reActContinuationIdempotencyKey(input: ContinueReActCommandPayloadV1): string;
```

### 调用签名

```text
reActContinuationIdempotencyKey(input: ContinueReActCommandPayloadV1): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>ContinueReActCommandPayloadV1</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `CoordinateReActQuantumResultInput`

Coordinate ReAct Quantum Result Input 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CoordinateReActQuantumResultInput } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export interface CoordinateReActQuantumResultInput {
    react: ReActRunResult;
    continuation?: ReActContinuationIntent;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `continuation` | 属性 | <code>continuation?: ReActContinuationIntent</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `react` | 属性 | <code>react: ReActRunResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EnqueueReActContinuationCommandRequest`

Enqueue ReAct Continuation Command Request 接口，共包含 13 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EnqueueReActContinuationCommandRequest } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export interface EnqueueReActContinuationCommandRequest {
    id: string;
    commandType: 'continue_react';
    idempotencyKey: string;
    tenantId?: string;
    userId: string;
    workspaceId?: string;
    sessionId: string;
    targetRunId: string;
    priority?: number;
    maxAttempts?: number;
    payload: ContinueReActCommandPayloadV1;
    createdAt: string;
    availableAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `availableAt` | 属性 | <code>availableAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandType` | 属性 | <code>commandType: "continue_react"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: ContinueReActCommandPayloadV1</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `priority` | 属性 | <code>priority?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetRunId` | 属性 | <code>targetRunId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LongHorizonReActQuantumInput`

Long Horizon ReAct Quantum Input 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LongHorizonReActQuantumInput } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export interface LongHorizonReActQuantumInput {
    context: ReActRunContext;
    control?: ReActRunControl;
    continuation?: ReActContinuationIntent;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: ReActRunContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `continuation` | 属性 | <code>continuation?: ReActContinuationIntent</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `control` | 属性 | <code>control?: ReActRunControl</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LongHorizonReActQuantumResult`

Long Horizon ReAct Quantum Result 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LongHorizonReActQuantumResult } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export interface LongHorizonReActQuantumResult {
    disposition: LongHorizonReActDisposition;
    react: ReActRunResult;
    scheduledTaskId?: string;
    scheduleReused?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `disposition` | 属性 | <code>disposition: LongHorizonReActDisposition</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `react` | 属性 | <code>react: ReActRunResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scheduledTaskId` | 属性 | <code>scheduledTaskId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scheduleReused` | 属性 | <code>scheduleReused?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LongHorizonReActSupervisorOptions`

Long Horizon ReAct Supervisor Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LongHorizonReActSupervisorOptions } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export interface LongHorizonReActSupervisorOptions {
    runner: Pick<ReActRunner, 'run'>;
    scheduler?: ReActContinuationScheduler;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runner` | 属性 | <code>runner: Pick&lt;ReActRunner, "run"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scheduler` | 属性 | <code>scheduler?: ReActContinuationScheduler</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActContinuationCommandIngress`

ReAct Continuation Command Ingress 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActContinuationCommandIngress } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export interface ReActContinuationCommandIngress {
    enqueue(request: EnqueueReActContinuationCommandRequest): Promise<Pick<SessionCommandRecord, 'id' | 'status'>>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enqueue` | 方法 | <code>enqueue(request: EnqueueReActContinuationCommandRequest): Promise&lt;Pick&lt;SessionCommandRecord, "id" &#124; "status"&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReActContinuationIntent`

ReAct Continuation Intent 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActContinuationIntent } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export interface ReActContinuationIntent {
    tenantId?: string;
    workspaceId?: string;
    availableAt?: string;
    priority?: number;
    maxAttempts?: number;
    buildPayload(checkpoint: Readonly<ReActContinuationCheckpoint>): ContinueReActCommandPayloadV1 | Promise<ContinueReActCommandPayloadV1>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `availableAt` | 属性 | <code>availableAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `buildPayload` | 方法 | <code>buildPayload(checkpoint: Readonly&lt;ReActContinuationCheckpoint&gt;): ContinueReActCommandPayloadV1 &#124; Promise&lt;ContinueReActCommandPayloadV1&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `priority` | 属性 | <code>priority?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActContinuationScheduler`

ReAct Continuation Scheduler 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActContinuationScheduler } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export interface ReActContinuationScheduler {
    schedule(request: ReActContinuationScheduleRequest): Promise<ReActContinuationScheduleResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `schedule` | 方法 | <code>schedule(request: ReActContinuationScheduleRequest): Promise&lt;ReActContinuationScheduleResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReActContinuationScheduleRequest`

ReAct Continuation Schedule Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActContinuationScheduleRequest } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export interface ReActContinuationScheduleRequest {
    version: '1.0.0';
    tenantId?: string;
    workspaceId?: string;
    payload: ContinueReActCommandPayloadV1;
    availableAt: string;
    priority?: number;
    maxAttempts?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `availableAt` | 属性 | <code>availableAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: ContinueReActCommandPayloadV1</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `priority` | 属性 | <code>priority?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActContinuationScheduleResult`

ReAct Continuation Schedule Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActContinuationScheduleResult } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export interface ReActContinuationScheduleResult {
    taskId: string;
    reused: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reused` | 属性 | <code>reused: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskId` | 属性 | <code>taskId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ServerIngressReActContinuationSchedulerOptions`

Server Ingress ReAct Continuation Scheduler Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ServerIngressReActContinuationSchedulerOptions } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export interface ServerIngressReActContinuationSchedulerOptions {
    ingress: ReActContinuationCommandIngress;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ingress` | 属性 | <code>ingress: ReActContinuationCommandIngress</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LongHorizonReActDisposition`

Long Horizon ReAct Disposition 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LongHorizonReActDisposition } from '@codesoul-co/hypha-harness';`
- 源码模块: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### 声明

```text
export type LongHorizonReActDisposition = 'completed' | 'continuation_scheduled' | 'continuation_required' | 'waiting_human' | 'cancelled' | 'failed';
```
