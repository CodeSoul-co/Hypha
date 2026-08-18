# `@codesoul-co/hypha-harness` / `recovery-loop`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Package guide: [learning and composition guide](/packages/harness)
- Source: [`packages/harness/src/recovery-loop.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runFSMRecoveryLoop` | function | <code>runFSMRecoveryLoop&lt;TOutput&gt;(options: FSMRecoveryLoopOptions&lt;TOutput&gt;): Promise&lt;FSMRecoveryLoopResult&lt;TOutput&gt;&gt;</code> | Runs only the bounded recovery loop described by the FSM recovery policy. Delayed retries are suspended by default; a caller must inject a scheduler and explicitly opt into an inline delay budget to keep them in-process. |
| `FSMRecoveryAttemptContext` | interface | <code>interface FSMRecoveryAttemptContext</code> | Field contract for FSM Recovery Attempt Context; see all contract members below. |
| `FSMRecoveryLoopOptions` | interface | <code>interface FSMRecoveryLoopOptions</code> | Field contract for FSM Recovery Loop Options; see all contract members below. |
| `FSMRecoveryLoopResult` | interface | <code>interface FSMRecoveryLoopResult</code> | Field contract for FSM Recovery Loop Result; see all contract members below. |
| `FSMRecoveryLoopScheduler` | interface | <code>interface FSMRecoveryLoopScheduler</code> | Field contract for FSM Recovery Loop Scheduler; see all contract members below. |

## `FSMRecoveryAttemptContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt: number</code> | Public attempt property. |
| `signal` | property | <code>signal: AbortSignal</code> | Public signal property. |

## `FSMRecoveryLoopOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `classify` | method | <code>classify(error: unknown, context: FSMRecoveryAttemptContext): FSMAnomaly &#124; Promise&lt;FSMAnomaly&gt;</code> | Public runtime operation for classify. |
| `compensate` | method | <code>compensate(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;void&gt;</code> | Public runtime operation for compensate. |
| `degrade` | method | <code>degrade(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | Public runtime operation for degrade. |
| `execute` | method | <code>execute(context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | Public runtime operation for execute. |
| `fallback` | method | <code>fallback(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | Public runtime operation for fallback. |
| `fsm` | property | <code>fsm: FSMRuntime</code> | Public fsm property. |
| `maxInlineDelayMs` | property | <code>maxInlineDelayMs: number</code> | Public max Inline Delay Ms property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `reconcile` | method | <code>reconcile(decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext): Promise&lt;TOutput&gt;</code> | Public runtime operation for reconcile. |
| `scheduler` | property | <code>scheduler: FSMRecoveryLoopScheduler</code> | Public scheduler property. |
| `signal` | property | <code>signal: AbortSignal</code> | Public signal property. |
| `source` | property | <code>source: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | Public source property. |

## `FSMRecoveryLoopResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public attempts property. |
| `decision` | property | <code>decision: FSMRecoveryDecision</code> | Public decision property. |
| `error` | property | <code>error: unknown</code> | Public error property. |
| `output` | property | <code>output: TOutput</code> | Public output property. |
| `status` | property | <code>status: "degraded" &#124; "cancelled" &#124; "failed" &#124; "succeeded" &#124; "suspended" &#124; "compensated"</code> | Public status property. |

## `FSMRecoveryLoopScheduler` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `wait` | method | <code>wait(delayMs: number, decision: FSMRecoveryDecision, signal?: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for wait. |
