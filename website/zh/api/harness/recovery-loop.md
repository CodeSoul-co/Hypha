# `@codesoul-co/hypha-harness` / `recovery-loop`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 源码: [`packages/harness/src/recovery-loop.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts)
- 导出数: **5**

## 模块用法

用于处理有界恢复、重试或降级。Recovery loop 模块公开 1 函数、4 接口。

### 从包入口导入

```ts
import {
  runFSMRecoveryLoop,
} from '@codesoul-co/hypha-harness';

import type {
  FSMRecoveryAttemptContext,
  FSMRecoveryLoopOptions,
  FSMRecoveryLoopResult,
  FSMRecoveryLoopScheduler,
} from '@codesoul-co/hypha-harness';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runFSMRecoveryLoop` | 函数 | <code>runFSMRecoveryLoop&lt;TOutput&gt;(options: FSMRecoveryLoopOptions&lt;TOutput&gt;): Promise&lt;FSMRecoveryLoopResult&lt;TOutput&gt;&gt;</code> | Runs only the bounded recovery loop described by the FSM recovery policy. Delayed retries are suspended by default; a caller must inject a scheduler and explicitly opt into an inline delay budget to keep them in-process. |
| `FSMRecoveryAttemptContext` | 接口 | <code>interface FSMRecoveryAttemptContext</code> | FSM Recovery Attempt Context 接口，共包含 2 个公开字段或方法。 |
| `FSMRecoveryLoopOptions` | 接口 | <code>interface FSMRecoveryLoopOptions</code> | FSM Recovery Loop Options 接口，共包含 12 个公开字段或方法。 |
| `FSMRecoveryLoopResult` | 接口 | <code>interface FSMRecoveryLoopResult</code> | FSM Recovery Loop Result 接口，共包含 5 个公开字段或方法。 |
| `FSMRecoveryLoopScheduler` | 接口 | <code>interface FSMRecoveryLoopScheduler</code> | FSM Recovery Loop Scheduler 接口，共包含 1 个公开字段或方法。 |

## `runFSMRecoveryLoop`

Runs only the bounded recovery loop described by the FSM recovery policy. Delayed retries are suspended by default; a caller must inject a scheduler and explicitly opt into an inline delay budget to keep them in-process.

- 种类: 函数
- 导入: `import { runFSMRecoveryLoop } from '@codesoul-co/hypha-harness';`
- 源码模块: [`recovery-loop`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts)

### 声明

```text
export declare function runFSMRecoveryLoop<TOutput>(options: FSMRecoveryLoopOptions<TOutput>): Promise<FSMRecoveryLoopResult<TOutput>>;
```

### 调用签名

```text
runFSMRecoveryLoop<TOutput>(options: FSMRecoveryLoopOptions<TOutput>): Promise<FSMRecoveryLoopResult<TOutput>>
```

Runs only the bounded recovery loop described by the FSM recovery policy. Delayed retries are suspended by default; a caller must inject a scheduler and explicitly opt into an inline delay budget to keep them in-process.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>FSMRecoveryLoopOptions&lt;TOutput&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<FSMRecoveryLoopResult<TOutput>>`
- 说明: 返回值契约由上述类型定义。

## `FSMRecoveryAttemptContext`

FSM Recovery Attempt Context 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMRecoveryAttemptContext } from '@codesoul-co/hypha-harness';`
- 源码模块: [`recovery-loop`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts)

### 声明

```text
export interface FSMRecoveryAttemptContext {
    attempt: number;
    signal?: AbortSignal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal?: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMRecoveryLoopOptions`

FSM Recovery Loop Options 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMRecoveryLoopOptions } from '@codesoul-co/hypha-harness';`
- 源码模块: [`recovery-loop`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts)

### 声明

```text
export interface FSMRecoveryLoopOptions<TOutput> {
    fsm: FSMRuntime;
    source: FSMAnomalySource;
    execute(context: FSMRecoveryAttemptContext): Promise<TOutput>;
    classify?: (error: unknown, context: FSMRecoveryAttemptContext) => FSMAnomaly | Promise<FSMAnomaly>;
    compensate?: (decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext) => Promise<void>;
    reconcile?: (decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext) => Promise<TOutput>;
    fallback?: (decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext) => Promise<TOutput>;
    degrade?: (decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext) => Promise<TOutput>;
    scheduler?: FSMRecoveryLoopScheduler;
    maxInlineDelayMs?: number;
    signal?: AbortSignal;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `classify` | 方法 | <code>classify?(error: unknown, context: FSMRecoveryAttemptContext): FSMAnomaly &#124; Promise&lt;FSMAnomaly&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `compensate` | 方法 | <code>compensate?(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `degrade` | 方法 | <code>degrade?(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `execute` | 方法 | <code>execute(context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fallback` | 方法 | <code>fallback?(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fsm` | 属性 | <code>fsm: FSMRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxInlineDelayMs` | 属性 | <code>maxInlineDelayMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reconcile` | 方法 | <code>reconcile?(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `scheduler` | 属性 | <code>scheduler?: FSMRecoveryLoopScheduler</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal?: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMRecoveryLoopResult`

FSM Recovery Loop Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMRecoveryLoopResult } from '@codesoul-co/hypha-harness';`
- 源码模块: [`recovery-loop`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts)

### 声明

```text
export interface FSMRecoveryLoopResult<TOutput> {
    status: 'succeeded' | 'degraded' | 'suspended' | 'compensated' | 'failed' | 'cancelled';
    output?: TOutput;
    error?: unknown;
    decision?: FSMRecoveryDecision;
    attempts: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decision` | 属性 | <code>decision?: FSMRecoveryDecision</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: TOutput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "degraded" &#124; "cancelled" &#124; "failed" &#124; "succeeded" &#124; "suspended" &#124; "compensated"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMRecoveryLoopScheduler`

FSM Recovery Loop Scheduler 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMRecoveryLoopScheduler } from '@codesoul-co/hypha-harness';`
- 源码模块: [`recovery-loop`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts)

### 声明

```text
export interface FSMRecoveryLoopScheduler {
    wait(delayMs: number, decision: FSMRecoveryDecision, signal?: AbortSignal): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `wait` | 方法 | <code>wait(delayMs: number, decision: FSMRecoveryDecision, signal?: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
