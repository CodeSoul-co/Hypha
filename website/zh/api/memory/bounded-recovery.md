# `@codesoul-co/hypha-memory` / `bounded-recovery`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/bounded-recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/bounded-recovery.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createMemoryFailureFingerprint` | 函数 | <code>createMemoryFailureFingerprint(failure: RecoveryFailure): string</code> | 创建 Memory Failure Fingerprint。 |
| `resolveBoundedMemoryRecovery` | 函数 | <code>resolveBoundedMemoryRecovery(failure: RecoveryFailure, budget: MemoryRecoveryBudget): BoundedMemoryRecoveryOutcome</code> | 解析 Bounded Memory Recovery。 |
| `BoundedMemoryRecoveryOutcome` | 接口 | <code>interface BoundedMemoryRecoveryOutcome</code> | Bounded Memory Recovery Outcome 的字段契约；完整字段见下表。 |
| `MemoryRecoveryBudget` | 接口 | <code>interface MemoryRecoveryBudget</code> | Memory Recovery Budget 的字段契约；完整字段见下表。 |
| `MemoryRunRecoveryState` | 类型 | <code>type MemoryRunRecoveryState = 'degraded' &#124; 'waiting' &#124; 'review' &#124; 'quarantined' &#124; 'failed'</code> | Memory Run Recovery State 的公共类型别名。 |

## `BoundedMemoryRecoveryOutcome` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `boundedEmptyResultAllowed` | 属性 | <code>boundedEmptyResultAllowed: boolean</code> | bounded Empty Result Allowed 字段。 |
| `failureFingerprint` | 属性 | <code>failureFingerprint: string</code> | failure Fingerprint 字段。 |
| `nextAttempt` | 属性 | <code>nextAttempt: number</code> | next Attempt 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `retryAllowed` | 属性 | <code>retryAllowed: boolean</code> | retry Allowed 字段。 |
| `state` | 属性 | <code>state: MemoryRunRecoveryState</code> | state 字段。 |
| `strategy` | 属性 | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | strategy 字段。 |

## `MemoryRecoveryBudget` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attemptsUsed` | 属性 | <code>attemptsUsed: number</code> | attempts Used 字段。 |
| `deadline` | 属性 | <code>deadline: string</code> | deadline 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `now` | 属性 | <code>now: string</code> | now 字段。 |
| `seenFailureFingerprints` | 属性 | <code>seenFailureFingerprints: string[]</code> | seen Failure Fingerprints 字段。 |
