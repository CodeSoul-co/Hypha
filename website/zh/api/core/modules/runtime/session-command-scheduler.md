# `@codesoul-co/hypha-core` / `modules/runtime/session-command-scheduler`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/session-command-scheduler.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-scheduler.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DurableSessionCommandScheduler` | 类 | <code>new DurableSessionCommandScheduler(options: DurableSessionCommandSchedulerOptions): DurableSessionCommandScheduler</code> | Repeatedly invokes a single-command processor until shutdown is requested. Abort stops new claims, wakes idle waits, and lets an in-flight handler drain. |
| `DurableSessionCommandSchedulerOptions` | 接口 | <code>interface DurableSessionCommandSchedulerOptions</code> | Durable Session Command Scheduler Options 的字段契约；完整字段见下表。 |
| `RunSessionCommandSchedulerRequest` | 接口 | <code>interface RunSessionCommandSchedulerRequest</code> | Run Session Command Scheduler Request 的字段契约；完整字段见下表。 |
| `SessionCommandProcessor` | 接口 | <code>interface SessionCommandProcessor</code> | Session Command Processor 的字段契约；完整字段见下表。 |
| `SessionCommandSchedulerResult` | 接口 | <code>interface SessionCommandSchedulerResult</code> | Session Command Scheduler Result 的字段契约；完整字段见下表。 |

## `DurableSessionCommandScheduler` 公开成员

Repeatedly invokes a single-command processor until shutdown is requested. Abort stops new claims, wakes idle waits, and lets an in-flight handler drain.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DurableSessionCommandSchedulerOptions): DurableSessionCommandScheduler</code> | 创建该类的实例。 |
| `run` | 方法 | <code>run(request: RunSessionCommandSchedulerRequest): Promise&lt;SessionCommandSchedulerResult&gt;</code> | run 的公开运行时操作。 |

## `DurableSessionCommandSchedulerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `errorBackoffMs` | 属性 | <code>errorBackoffMs: number</code> | error Backoff Ms 字段。 |
| `onError` | 方法 | <code>onError(error: unknown): void</code> | 处理 Error。 |
| `onResult` | 方法 | <code>onResult(result: SessionCommandWorkerResult): void</code> | 处理 Result。 |
| `pollIntervalMs` | 属性 | <code>pollIntervalMs: number</code> | poll Interval Ms 字段。 |
| `shutdownDrainMs` | 属性 | <code>shutdownDrainMs: number</code> | shutdown Drain Ms 字段。 |
| `wait` | 方法 | <code>wait(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | wait 的公开运行时操作。 |
| `worker` | 属性 | <code>worker: SessionCommandProcessor</code> | worker 字段。 |

## `RunSessionCommandSchedulerRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `scope` | 属性 | <code>scope: SessionQueueScope</code> | scope 字段。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | signal 字段。 |

## `SessionCommandProcessor` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `processNext` | 方法 | <code>processNext(scope?: SessionQueueScope, signal?: AbortSignal): Promise&lt;SessionCommandWorkerResult&gt;</code> | process Next 的公开运行时操作。 |

## `SessionCommandSchedulerResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `errors` | 属性 | <code>errors: number</code> | errors 字段。 |
| `idlePolls` | 属性 | <code>idlePolls: number</code> | idle Polls 字段。 |
| `processed` | 属性 | <code>processed: number</code> | processed 字段。 |
