# `@codesoul-co/hypha-core` / `events`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)
- 导出数: **11**

## 模块用法

用于创建、记录或读取 Event 契约。Events 模块公开 1 类、1 函数、6 接口、3 类型。

### 从包入口导入

```ts
import {
  InMemoryEventStore,
  createFrameworkEvent,
} from '@codesoul-co/hypha-core';

import type {
  EventCreateInput,
  EventFilter,
  EventStore,
  FrameworkEvent,
  PersistedFrameworkEvent,
  TraceRecorder,
  FrameworkEventType,
  RuntimeActivityEventType,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 9 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryEventStore` | 类 | <code>new InMemoryEventStore(): InMemoryEventStore</code> | In Memory Event Store 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `createFrameworkEvent` | 函数 | <code>createFrameworkEvent&lt;TPayload = unknown&gt;(input: EventCreateInput&lt;TPayload&gt;): FrameworkEvent&lt;TPayload&gt;</code> | Create Framework Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `EventCreateInput` | 接口 | <code>interface EventCreateInput</code> | Event Create Input 接口，共包含 20 个公开字段或方法。 |
| `EventFilter` | 接口 | <code>interface EventFilter</code> | Event Filter 接口，共包含 6 个公开字段或方法。 |
| `EventStore` | 接口 | <code>interface EventStore</code> | Event Store 接口，共包含 2 个公开字段或方法。 |
| `FrameworkEvent` | 接口 | <code>interface FrameworkEvent</code> | Framework Event 接口，共包含 24 个公开字段或方法。 |
| `PersistedFrameworkEvent` | 接口 | <code>interface PersistedFrameworkEvent extends FrameworkEvent&lt;TPayload&gt;</code> | Persisted Framework Event 接口，共包含 24 个公开字段或方法。 |
| `TraceRecorder` | 接口 | <code>interface TraceRecorder</code> | Trace Recorder 接口，共包含 1 个公开字段或方法。 |
| `FrameworkEventType` | 类型 | <code>type FrameworkEventType = 'session.created' &#124; 'session.updated' &#124; 'session.closed' &#124; 'run.created' &#124; 'run.started' &#124; 'run.resume.requested' &#124; 'run.resumed' &#124; 'run.cancel.requested' &#124; 'run.cancelling' &#124; 'run.waiting_human' &#124; 'run.waiting_signal' &#124; 'run.waiting_timer' &#124; 'run.paused' &#124; 'run.completed' &#124; 'run.failed' &#124; 'run.cancelled' &#124; 'runtime.wait.created' &#124; 'runtime.wait.resolved' &#124; 'runtime.signal.received' &#124; 'ru...</code> | Framework Event Type 公共类型别名；完整类型表达式见声明。 |
| `RuntimeActivityEventType` | 类型 | <code>type RuntimeActivityEventType = 'runtime.activity.requested' &#124; 'runtime.activity.completed' &#124; 'runtime.activity.failed' &#124; 'runtime.activity.waiting' &#124; 'runtime.activity.cancelled' &#124; 'runtime.activity.compensation.requested' &#124; 'runtime.activity.compensation.completed' &#124; 'runtime.activity.compensation.failed' &#124; 'activity.redispatch.requested' &#124; 'activity.redispatch.accepted' &#124; 'activity.redispatch.outcome_unknown'</code> | Runtime Activity Event Type 公共类型别名；完整类型表达式见声明。 |
| `RuntimeObservationEventType` | 类型 | <code>type RuntimeObservationEventType = `runtime.observation.${string}`</code> | Runtime Observation Event Type 公共类型别名；完整类型表达式见声明。 |

## `InMemoryEventStore`

In Memory Event Store 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryEventStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### 声明

```text
export declare class InMemoryEventStore implements EventStore, TraceRecorder {
    append(event: FrameworkEvent): Promise<void>;
    record(event: FrameworkEvent): Promise<void>;
    list(filter?: EventFilter): Promise<FrameworkEvent[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): InMemoryEventStore</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `record` | 方法 | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `createFrameworkEvent`

Create Framework Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createFrameworkEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### 声明

```text
export declare function createFrameworkEvent<TPayload = unknown>(input: EventCreateInput<TPayload>): FrameworkEvent<TPayload>;
```

### 调用签名

```text
createFrameworkEvent<TPayload = unknown>(input: EventCreateInput<TPayload>): FrameworkEvent<TPayload>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>EventCreateInput&lt;TPayload&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FrameworkEvent<TPayload>`
- 说明: 返回值契约由上述类型定义。

## `EventCreateInput`

Event Create Input 接口，共包含 20 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventCreateInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### 声明

```text
export interface EventCreateInput<TPayload = unknown> {
    id: string;
    type: FrameworkEventType;
    version?: string;
    tenantId?: string;
    userId?: string;
    runId: string;
    payload: TPayload;
    workspaceId?: string;
    sessionId?: string;
    stepId?: string;
    agentId?: string;
    fsmState?: string;
    branchId?: string;
    correlationId?: string;
    causationId?: string;
    parentEventId?: string;
    idempotencyKey?: string;
    operationId?: string;
    timestamp?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `branchId` | 属性 | <code>branchId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmState` | 属性 | <code>fsmState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parentEventId` | 属性 | <code>parentEventId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: TPayload</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timestamp` | 属性 | <code>timestamp?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: FrameworkEventType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EventFilter`

Event Filter 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventFilter } from '@codesoul-co/hypha-core';`
- 源码模块: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### 声明

```text
export interface EventFilter {
    tenantId?: string;
    userId?: string;
    workspaceId?: string;
    sessionId?: string;
    runId?: string;
    type?: FrameworkEventType;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type?: FrameworkEventType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EventStore`

Event Store 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### 声明

```text
export interface EventStore {
    append(event: FrameworkEvent): Promise<void>;
    list(filter?: EventFilter): Promise<FrameworkEvent[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `FrameworkEvent`

Framework Event 接口，共包含 24 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FrameworkEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### 声明

```text
export interface FrameworkEvent<TPayload = unknown> {
    id: string;
    type: FrameworkEventType;
    version?: string;
    tenantId?: string;
    userId?: string;
    workspaceId?: string;
    sessionId?: string;
    runId: string;
    stepId?: string;
    agentId?: string;
    fsmState?: string;
    branchId?: string;
    sequence?: number;
    globalSequence?: number;
    correlationId?: string;
    causationId?: string;
    parentEventId?: string;
    idempotencyKey?: string;
    operationId?: string;
    timestamp: string;
    recordedAt?: string;
    payload: TPayload;
    payloadHash?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `branchId` | 属性 | <code>branchId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmState` | 属性 | <code>fsmState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `globalSequence` | 属性 | <code>globalSequence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parentEventId` | 属性 | <code>parentEventId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: TPayload</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payloadHash` | 属性 | <code>payloadHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordedAt` | 属性 | <code>recordedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sequence` | 属性 | <code>sequence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timestamp` | 属性 | <code>timestamp: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: FrameworkEventType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PersistedFrameworkEvent`

Persisted Framework Event 接口，共包含 24 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PersistedFrameworkEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### 声明

```text
export interface PersistedFrameworkEvent<TPayload = unknown> extends FrameworkEvent<TPayload> {
    version: string;
    userId: string;
    sequence: number;
    globalSequence: number;
    recordedAt: string;
    payloadHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `branchId` | 属性 | <code>branchId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmState` | 属性 | <code>fsmState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `globalSequence` | 属性 | <code>globalSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parentEventId` | 属性 | <code>parentEventId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: TPayload</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordedAt` | 属性 | <code>recordedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sequence` | 属性 | <code>sequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timestamp` | 属性 | <code>timestamp: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: FrameworkEventType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `TraceRecorder`

Trace Recorder 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TraceRecorder } from '@codesoul-co/hypha-core';`
- 源码模块: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### 声明

```text
export interface TraceRecorder {
    record(event: FrameworkEvent): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `record` | 方法 | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `FrameworkEventType`

Framework Event Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { FrameworkEventType } from '@codesoul-co/hypha-core';`
- 源码模块: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### 声明

```text
export type FrameworkEventType = 'session.created' | 'session.updated' | 'session.closed' | 'run.created' | 'run.started' | 'run.resume.requested' | 'run.resumed' | 'run.cancel.requested' | 'run.cancelling' | 'run.waiting_human' | 'run.waiting_signal' | 'run.waiting_timer' | 'run.paused' | 'run.completed' | 'run.failed' | 'run.cancelled' | 'runtime.wait.created' | 'runtime.wait.resolved' | 'runtime.signal.received' | 'runtime.timer.created' | 'runtime.timer.fired' | 'runtime.checkpoint.created' | 'runtime.checkpoint.failed' | 'runtime.cancellation.propagated' | 'runtime.cancellation.failed' | 'recovery.case.opened' | 'recovery.strategy.selected' | 'recovery.attempt.started' | 'recovery.attempt.completed' | 'recovery.progress.detected' | 'recovery.case.resolved' | 'recovery.case.escalated' | 'recovery.knowledge.invalidated' | 'fsm.transition.requested' | 'fsm.transition.accepted' | 'fsm.transition.rejected' | 'fsm.state.entered' | 'fsm.state.exited' | 'thinking.started' | 'thinking.completed' | 'agent.deliberation.started' | 'agent.deliberation.completed' | 'reasoning.decision.recorded' | 'agent.reasoning.started' | 'agent.reasoning.completed' | 'agent.action.selected' | 'react.step.completed' | 'react.continuation.checkpointed' | 'react.continuation.suspended' | 'react.continuation.resumed' | 'inference.requested' | 'inference.completed' | 'inference.failed' | 'model.call.started' | 'model.call.completed' | 'model.call.failed' | 'llm.cache.lookup' | 'llm.cache.hit' | 'llm.cache.miss' | 'llm.cache.write' | 'llm.cache.bypass' | 'workcache.lookup' | 'workcache.hit' | 'workcache.miss' | 'workcache.write' | 'workcache.invalidate' | 'workcache.bypass' | 'workcache.prefix.materialized' | 'tool.call.requested' | 'tool.authorization.checked' | 'tool.invocation.state.changed' | 'tool.policy.checked' | 'tool.call.approved' | 'tool.call.rejected' | 'tool.call.started' | 'tool.call.completed' | 'tool.call.failed' | 'tool.call.timeout' | 'tool.call.retrying' | 'tool.call.cancellation.requested' | 'tool.call.cancelled' | 'tool.call.late_result' | 'tool.output.validated' | 'tool.output.invalid' | 'tool.resolved' | 'tool.contract.snapshot.created' | 'tool.contract.snapshot.resolved' | 'tool.idempotency.reused' | 'tool.idempotency.conflict' | 'tool.external_receipt.reconciled' | 'tool.cache.lookup' | 'tool.cache.hit' | 'tool.cache.miss' | 'tool.cache.write' | 'tool.cache.bypass' | 'mcp.capability.discovered' | 'mcp.capability.trust.evaluated' | 'mcp.capability.drift.detected' | 'mcp.capability.quarantined' | 'mcp.catalog.updated' | 'mcp.server.state.changed' | 'mcp.connection.starting' | 'mcp.connection.initialized' | 'mcp.connection.ready' | 'mcp.connection.degraded' | 'mcp.connection.reconnecting' | 'mcp.connection.closed' | 'mcp.connection.failed' | 'mcp.capability.discovery.started' | 'mcp.capability.normalized' | 'mcp.capability.imported' | 'mcp.capability.removed' | 'mcp.capability.approved' | 'mcp.catalog.refreshed' | 'mcp.request.started' | 'mcp.request.cancelled' | 'mcp.request.completed' | 'mcp.request.failed' | 'mcp.tool.normalized' | 'mcp.resource.normalized' | 'mcp.call.started' | 'mcp.call.completed' | 'mcp.call.failed' | 'tool.target.resolved' | 'tool.preview.generated' | 'tool.progress.reported' | 'skill.selected' | 'skill.loaded' | 'skill.executed' | 'skill.completed' | 'skill.failed' | 'workflow.stage.started' | 'workflow.stage.completed' | 'workflow.stage.failed' | 'workflow.condition.evaluated' | 'memory.extraction.requested' | 'memory.extraction.queued' | 'memory.extraction.started' | 'memory.extraction.candidate.extracted' | 'memory.extraction.candidate.rejected' | 'memory.extraction.awaiting_review' | 'memory.extraction.completed' | 'memory.extraction.failed' | 'memory.extraction.cancelled' | 'memory.extraction.cursor.advanced' | 'memory.maintenance.lookup.started' | 'memory.maintenance.lookup.completed' | 'memory.maintenance.decision.planned' | 'memory.maintenance.decision.applied' | 'memory.maintenance.decision.conflict' | 'memory.maintenance.review.requested' | 'memory.retrieval.candidates.generated' | 'memory.retrieval.ranking.completed' | 'memory.retrieval.rerank.failed' | 'memory.activity.requested' | 'memory.activity.completed' | 'memory.activity.failed' | 'memory.activity.cancelled' | 'memory.search.requested' | 'memory.search.completed' | 'memory.search.failed' | 'memory.write.reused' | 'memory.write.failed' | 'memory.update.requested' | 'memory.update.committed' | 'memory.update.conflict' | 'memory.update.failed' | 'memory.delete.requested' | 'memory.delete.partial' | 'memory.delete.completed' | 'memory.delete.failed' | 'memory.index.requested' | 'memory.index.started' | 'memory.index.completed' | 'memory.index.partial' | 'memory.index.failed' | 'memory.consolidation.started' | 'memory.consolidation.completed' | 'memory.consolidation.failed' | 'memory.decay.evaluated' | 'memory.reinforced' | 'memory.superseded' | 'memory.invalidated' | 'memory.retention.expired' | 'memory.context.build.requested' | 'memory.context.source.collected' | 'memory.context.item.filtered' | 'memory.context.item.ranked' | 'memory.context.item.truncated' | 'memory.context.item.compacted' | 'memory.context.provenance.attached' | 'memory.context.build.completed' | 'memory.context.build.failed' | 'context.source.loaded' | 'context.item.selected' | 'context.item.rejected' | 'context.build.failed' | 'memory.worker.started' | 'memory.worker.stopped' | 'memory.worker.failed' | 'memory.worker.dead_lettered' | 'memory.read.requested' | 'memory.read.completed' | 'memory.read.failed' | 'memory.write.requested' | 'memory.write.validated' | 'memory.write.committed' | 'memory.write.rejected' | 'context.build.started' | 'context.build.completed' | 'context.compacted' | 'react.continuation.quarantined' | 'human.review.requested' | 'human.review.approved' | 'human.review.rejected' | 'human.review.expired' | 'human.review.cancelled' | 'human.review.superseded' | 'human.review.resume.started' | 'human.review.resume.revalidated' | 'human.review.resume.failed' | 'human.review.resolved' | 'message.enqueued' | 'message.delivered' | 'message.acknowledged' | 'message.failed' | 'message.retrying' | 'message.dead_lettered' | 'eval.started' | 'eval.completed' | 'eval.failed' | 'replay.started' | 'replay.completed' | 'replay.failed' | 'regression.started' | 'regression.completed' | 'regression.failed' | 'workspace.create.requested' | 'workspace.created' | 'workspace.ready' | 'workspace.busy' | 'workspace.path.resolved' | 'workspace.path.denied' | 'workspace.quota.exceeded' | 'workspace.snapshot.requested' | 'workspace.snapshot.created' | 'workspace.snapshot.failed' | 'workspace.restore.requested' | 'workspace.restored' | 'workspace.restore.failed' | 'workspace.patch.checked' | 'workspace.patch.applied' | 'workspace.patch.conflict' | 'workspace.cleanup.started' | 'workspace.cleanup.completed' | 'workspace.cleanup.failed' | 'sandbox.create.requested' | 'sandbox.created' | 'sandbox.started' | 'sandbox.ready' | 'sandbox.degraded' | 'sandbox.terminate.requested' | 'sandbox.terminated' | 'sandbox.cleanup.completed' | 'sandbox.cleanup.failed' | 'command.execution.requested' | 'command.execution.validated' | 'command.execution.approval.required' | 'command.execution.queued' | 'command.execution.started' | 'command.execution.output.truncated' | 'command.execution.resource.exceeded' | 'command.execution.oom_killed' | 'command.execution.timeout' | 'command.execution.cancellation.requested' | 'command.execution.cancelled' | 'command.execution.completed' | 'command.execution.failed' | 'command.execution.result.unknown' | 'command.execution.recovered' | 'network.authorization.requested' | 'network.authorization.granted' | 'network.authorization.denied' | 'network.authorization.revoked' | 'artifact.create.requested' | 'artifact.created' | 'artifact.deduplicated' | 'artifact.create.failed' | 'artifact.read.requested' | 'artifact.read.completed' | 'artifact.version.created' | 'artifact.finalized' | 'artifact.archived' | 'artifact.invalidated' | 'artifact.delete.requested' | 'artifact.delete.blocked' | 'artifact.deleted' | 'artifact.delete.failed' | 'artifact.lineage.recorded' | 'artifact.retention.expired' | 'artifact.gc.completed' | 'artifact.gc.failed'
/** @deprecated Use the explicit Artifact lifecycle event names. */
 | 'artifact.updated'
/** @deprecated Use artifact.version.created. */
 | 'artifact.versioned' | RuntimeObservationEventType | RuntimeActivityEventType;
```

## `RuntimeActivityEventType`

Runtime Activity Event Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeActivityEventType } from '@codesoul-co/hypha-core';`
- 源码模块: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### 声明

```text
export type RuntimeActivityEventType = 'runtime.activity.requested' | 'runtime.activity.completed' | 'runtime.activity.failed' | 'runtime.activity.waiting' | 'runtime.activity.cancelled' | 'runtime.activity.compensation.requested' | 'runtime.activity.compensation.completed' | 'runtime.activity.compensation.failed' | 'activity.redispatch.requested' | 'activity.redispatch.accepted' | 'activity.redispatch.outcome_unknown';
```

## `RuntimeObservationEventType`

Runtime Observation Event Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeObservationEventType } from '@codesoul-co/hypha-core';`
- 源码模块: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### 声明

```text
export type RuntimeObservationEventType = `runtime.observation.${string}`;
```
