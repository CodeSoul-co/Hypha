# `@codesoul-co/hypha-core` / `contracts/runtime-projection`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-projection.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeCancellationProjection` | 接口 | <code>interface RuntimeCancellationProjection</code> | Runtime Cancellation Projection 的字段契约；完整字段见下表。 |
| `RuntimeOrchestrationProjection` | 接口 | <code>interface RuntimeOrchestrationProjection</code> | Runtime Orchestration Projection 的字段契约；完整字段见下表。 |
| `RuntimePendingTransitionProjection` | 接口 | <code>interface RuntimePendingTransitionProjection</code> | Runtime Pending Transition Projection 的字段契约；完整字段见下表。 |
| `RuntimePendingWaitProjection` | 接口 | <code>interface RuntimePendingWaitProjection</code> | Runtime Pending Wait Projection 的字段契约；完整字段见下表。 |
| `RuntimeResumeProjection` | 接口 | <code>interface RuntimeResumeProjection</code> | Runtime Resume Projection 的字段契约；完整字段见下表。 |
| `RuntimeOrchestrationRunStatus` | 类型 | <code>type RuntimeOrchestrationRunStatus = 'not_created' &#124; RuntimeRunStatus</code> | Runtime Orchestration Run Status 的公共类型别名。 |

## `RuntimeCancellationProjection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |

## `RuntimeOrchestrationProjection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancellation` | 属性 | <code>cancellation: RuntimeCancellationProjection</code> | cancellation 字段。 |
| `currentState` | 属性 | <code>currentState: string</code> | current State 字段。 |
| `lastResume` | 属性 | <code>lastResume: RuntimeResumeProjection</code> | last Resume 字段。 |
| `pendingActivityIds` | 属性 | <code>pendingActivityIds: string[]</code> | pending Activity Ids 字段。 |
| `pendingHumanActionRef` | 属性 | <code>pendingHumanActionRef: string</code> | pending Human Action Ref 字段。 |
| `pendingTransition` | 属性 | <code>pendingTransition: RuntimePendingTransitionProjection</code> | pending Transition 字段。 |
| `pendingWait` | 属性 | <code>pendingWait: RuntimePendingWaitProjection</code> | pending Wait 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `runStatus` | 属性 | <code>runStatus: RuntimeOrchestrationRunStatus</code> | run Status 字段。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | state Attempt 字段。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | state Path 字段。 |
| `stateVisitCounts` | 属性 | <code>stateVisitCounts: Record&lt;string, number&gt;</code> | state Visit Counts 字段。 |
| `terminalState` | 属性 | <code>terminalState: string</code> | terminal State 字段。 |

## `RuntimePendingTransitionProjection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventId` | 属性 | <code>eventId: string</code> | event Id 字段。 |
| `from` | 属性 | <code>from: string</code> | from 字段。 |
| `to` | 属性 | <code>to: string</code> | to 字段。 |

## `RuntimePendingWaitProjection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `expectedSchema` | 属性 | <code>expectedSchema: JsonSchema</code> | expected schema 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef: string</code> | pending Action Ref 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | state Attempt 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `type` | 属性 | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "pause"</code> | type 字段。 |
| `waitId` | 属性 | <code>waitId: string</code> | wait Id 字段。 |

## `RuntimeResumeProjection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `kind` | 属性 | <code>kind: "manual" &#124; "signal" &#124; "timer"</code> | kind 字段。 |
| `payload` | 属性 | <code>payload: RuntimeJsonValue</code> | payload 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `resumedAt` | 属性 | <code>resumedAt: string</code> | resumed At 字段。 |
| `waitId` | 属性 | <code>waitId: string</code> | wait Id 字段。 |
