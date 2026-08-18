# `@codesoul-co/hypha-harness` / `recovery-loop`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 模块指南: [学习与组合说明](/zh/packages/harness)
- 源码: [`packages/harness/src/recovery-loop.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runFSMRecoveryLoop` | 函数 | <code>runFSMRecoveryLoop&lt;TOutput&gt;(options: FSMRecoveryLoopOptions&lt;TOutput&gt;): Promise&lt;FSMRecoveryLoopResult&lt;TOutput&gt;&gt;</code> | Runs only the bounded recovery loop described by the FSM recovery policy. Delayed retries are suspended by default; a caller must inject a scheduler and explicitly opt into an inline delay budget to keep them in-process. |
| `FSMRecoveryAttemptContext` | 接口 | <code>interface FSMRecoveryAttemptContext</code> | FSM Recovery Attempt Context 的字段契约；完整字段见下表。 |
| `FSMRecoveryLoopOptions` | 接口 | <code>interface FSMRecoveryLoopOptions</code> | FSM Recovery Loop Options 的字段契约；完整字段见下表。 |
| `FSMRecoveryLoopResult` | 接口 | <code>interface FSMRecoveryLoopResult</code> | FSM Recovery Loop Result 的字段契约；完整字段见下表。 |
| `FSMRecoveryLoopScheduler` | 接口 | <code>interface FSMRecoveryLoopScheduler</code> | FSM Recovery Loop Scheduler 的字段契约；完整字段见下表。 |

## `FSMRecoveryAttemptContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt: number</code> | attempt 字段。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | signal 字段。 |

## `FSMRecoveryLoopOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `classify` | 方法 | <code>classify(error: unknown, context: FSMRecoveryAttemptContext): FSMAnomaly &#124; Promise&lt;FSMAnomaly&gt;</code> | classify 的公开运行时操作。 |
| `compensate` | 方法 | <code>compensate(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;void&gt;</code> | compensate 的公开运行时操作。 |
| `degrade` | 方法 | <code>degrade(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | degrade 的公开运行时操作。 |
| `execute` | 方法 | <code>execute(context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | execute 的公开运行时操作。 |
| `fallback` | 方法 | <code>fallback(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | fallback 的公开运行时操作。 |
| `fsm` | 属性 | <code>fsm: FSMRuntime</code> | fsm 字段。 |
| `maxInlineDelayMs` | 属性 | <code>maxInlineDelayMs: number</code> | max Inline Delay Ms 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `reconcile` | 方法 | <code>reconcile(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | reconcile 的公开运行时操作。 |
| `scheduler` | 属性 | <code>scheduler: FSMRecoveryLoopScheduler</code> | scheduler 字段。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | signal 字段。 |
| `source` | 属性 | <code>source: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | source 字段。 |

## `FSMRecoveryLoopResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | attempts 字段。 |
| `decision` | 属性 | <code>decision: FSMRecoveryDecision</code> | decision 字段。 |
| `error` | 属性 | <code>error: unknown</code> | error 字段。 |
| `output` | 属性 | <code>output: TOutput</code> | output 字段。 |
| `status` | 属性 | <code>status: "degraded" &#124; "cancelled" &#124; "failed" &#124; "succeeded" &#124; "suspended" &#124; "compensated"</code> | status 字段。 |

## `FSMRecoveryLoopScheduler` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `wait` | 方法 | <code>wait(delayMs: number, decision: FSMRecoveryDecision, signal?: AbortSignal): Promise&lt;void&gt;</code> | wait 的公开运行时操作。 |
