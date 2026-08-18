# `@codesoul-co/hypha-harness` / `index`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 源码: [`packages/harness/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)
- 导出数: **9**

## 模块用法

聚合 `@codesoul-co/hypha-harness` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。

### 从包入口导入

```ts
import {
  InMemoryTraceRecorder,
  SessionProjector,
  UserScopedSessionQueue,
  createRunStartedEvent,
} from '@codesoul-co/hypha-harness';

import type {
  QueueTask,
  RegressionCase,
  ReplayFixture,
  RunRecord,
  SessionView,
} from '@codesoul-co/hypha-harness';
```

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryTraceRecorder` | 类 | <code>new InMemoryTraceRecorder(): InMemoryTraceRecorder</code> | In Memory Trace Recorder 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SessionProjector` | 类 | <code>new SessionProjector(): SessionProjector</code> | Session Projector 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `UserScopedSessionQueue` | 类 | <code>new UserScopedSessionQueue&lt;T = unknown&gt;(): UserScopedSessionQueue&lt;T&gt;</code> | User Scoped Session Queue 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `createRunStartedEvent` | 函数 | <code>createRunStartedEvent(run: RunRecord): FrameworkEvent</code> | Create Run Started Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `QueueTask` | 接口 | <code>interface QueueTask</code> | Queue Task 接口，共包含 4 个公开字段或方法。 |
| `RegressionCase` | 接口 | <code>interface RegressionCase</code> | Regression Case 接口，共包含 6 个公开字段或方法。 |
| `ReplayFixture` | 接口 | <code>interface ReplayFixture</code> | Replay Fixture 接口，共包含 15 个公开字段或方法。 |
| `RunRecord` | 接口 | <code>interface RunRecord</code> | Run Record 接口，共包含 10 个公开字段或方法。 |
| `SessionView` | 接口 | <code>interface SessionView</code> | Session View 接口，共包含 5 个公开字段或方法。 |

## `InMemoryTraceRecorder`

In Memory Trace Recorder 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryTraceRecorder } from '@codesoul-co/hypha-harness';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### 声明

```text
export declare class InMemoryTraceRecorder implements TraceRecorder {
    record(event: FrameworkEvent): Promise<void>;
    list(filter?: EventFilter): Promise<FrameworkEvent[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryTraceRecorder</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `record` | 方法 | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SessionProjector`

Session Projector 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SessionProjector } from '@codesoul-co/hypha-harness';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### 声明

```text
export declare class SessionProjector {
    project(events: FrameworkEvent[]): SessionView[];
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): SessionProjector</code> | 创建该类的实例。 |
| `project` | 方法 | <code>project(events: FrameworkEvent[]): SessionView[]</code> | 公开方法；参数与返回类型以签名列为准。 |

## `UserScopedSessionQueue`

User Scoped Session Queue 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { UserScopedSessionQueue } from '@codesoul-co/hypha-harness';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### 声明

```text
export declare class UserScopedSessionQueue<T = unknown> {
    enqueue(task: QueueTask<T>): number;
    dequeue(userId: string, sessionId: string): QueueTask<T> | null;
    size(userId: string, sessionId: string): number;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>&lt;T = unknown&gt;(): UserScopedSessionQueue&lt;T&gt;</code> | 创建该类的实例。 |
| `dequeue` | 方法 | <code>dequeue(userId: string, sessionId: string): QueueTask&lt;T&gt; &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `enqueue` | 方法 | <code>enqueue(task: QueueTask&lt;T&gt;): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `size` | 方法 | <code>size(userId: string, sessionId: string): number</code> | 公开方法；参数与返回类型以签名列为准。 |

## `createRunStartedEvent`

Create Run Started Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createRunStartedEvent } from '@codesoul-co/hypha-harness';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### 声明

```text
export declare function createRunStartedEvent(run: RunRecord): FrameworkEvent;
```

### 调用签名

```text
createRunStartedEvent(run: RunRecord): FrameworkEvent
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `run` | <code>RunRecord&lt;unknown, unknown&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FrameworkEvent<unknown>`
- 说明: 返回值契约由上述类型定义。

## `QueueTask`

Queue Task 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { QueueTask } from '@codesoul-co/hypha-harness';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### 声明

```text
export interface QueueTask<T = unknown> {
    id: string;
    userId: string;
    sessionId: string;
    payload: T;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: T</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RegressionCase`

Regression Case 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RegressionCase } from '@codesoul-co/hypha-harness';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### 声明

```text
export interface RegressionCase {
    id: string;
    fixture: ReplayFixture;
    actualEvents?: FrameworkEvent[];
    requiredChecks?: Array<'event_types' | 'state_path' | 'tool_calls' | 'policy_decisions' | 'output_contract'>;
    outputContract?: OutputContractSpec;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actualEvents` | 属性 | <code>actualEvents?: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fixture` | 属性 | <code>fixture: ReplayFixture</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContract` | 属性 | <code>outputContract?: OutputContractSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredChecks` | 属性 | <code>requiredChecks?: ("output_contract" &#124; "state_path" &#124; "event_types" &#124; "tool_calls" &#124; "policy_decisions")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReplayFixture`

Replay Fixture 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReplayFixture } from '@codesoul-co/hypha-harness';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### 声明

```text
export interface ReplayFixture {
    id: string;
    version: string;
    runId: string;
    createdAt?: string;
    replaySpecRef?: SpecRef;
    events: FrameworkEvent[];
    eventTypes?: string[];
    statePath: string[];
    finalOutput?: unknown;
    toolCalls?: string[];
    modelCalls?: string[];
    policyDecisions?: string[];
    memoryReadSet?: string[];
    outputContract?: OutputContractSpec;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventTypes` | 属性 | <code>eventTypes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalOutput` | 属性 | <code>finalOutput?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryReadSet` | 属性 | <code>memoryReadSet?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelCalls` | 属性 | <code>modelCalls?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContract` | 属性 | <code>outputContract?: OutputContractSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecisions` | 属性 | <code>policyDecisions?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replaySpecRef` | 属性 | <code>replaySpecRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCalls` | 属性 | <code>toolCalls?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RunRecord`

Run Record 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunRecord } from '@codesoul-co/hypha-harness';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### 声明

```text
export interface RunRecord<TInput = unknown, TOutput = unknown> {
    id: string;
    sessionId?: string;
    userId?: string;
    agentSystemId: string;
    status: 'queued' | 'running' | 'waiting_human' | 'completed' | 'failed' | 'cancelled';
    input: TInput;
    output?: TOutput;
    fsmSnapshot?: FSMSnapshot;
    createdAt: string;
    completedAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentSystemId` | 属性 | <code>agentSystemId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedAt` | 属性 | <code>completedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmSnapshot` | 属性 | <code>fsmSnapshot?: FSMSnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: TOutput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "queued" &#124; "running" &#124; "cancelled" &#124; "failed" &#124; "waiting_human"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionView`

Session View 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionView } from '@codesoul-co/hypha-harness';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### 声明

```text
export interface SessionView {
    id: string;
    userId: string;
    runIds: string[];
    status: 'active' | 'closed';
    updatedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runIds` | 属性 | <code>runIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "active" &#124; "closed"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
