# `@codesoul-co/hypha-core` / `contracts/runtime-query`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-query.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeQueryRequest` | 接口 | <code>interface RuntimeQueryRequest</code> | Runtime Query Request 的字段契约；完整字段见下表。 |
| `RuntimeQueryServiceContract` | 接口 | <code>interface RuntimeQueryServiceContract</code> | Runtime Query Service Contract 的字段契约；完整字段见下表。 |
| `RuntimeRunView` | 接口 | <code>interface RuntimeRunView</code> | Runtime Run View 的字段契约；完整字段见下表。 |
| `RuntimeStateExplanation` | 接口 | <code>interface RuntimeStateExplanation</code> | Runtime State Explanation 的字段契约；完整字段见下表。 |
| `RuntimeTimelineRequest` | 接口 | <code>interface RuntimeTimelineRequest extends RuntimeQueryRequest</code> | Runtime Timeline Request 的字段契约；完整字段见下表。 |
| `RuntimeTimelineResult` | 接口 | <code>interface RuntimeTimelineResult</code> | Runtime Timeline Result 的字段契约；完整字段见下表。 |

## `RuntimeQueryRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |

## `RuntimeQueryServiceContract` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `explainState` | 方法 | <code>explainState(request: RuntimeQueryRequest): Promise&lt;RuntimeStateExplanation &#124; null&gt;</code> | explain State 的公开运行时操作。 |
| `getFSM` | 方法 | <code>getFSM(request: RuntimeQueryRequest): Promise&lt;RuntimeOrchestrationProjection &#124; null&gt;</code> | 读取 FSM。 |
| `getPendingWaits` | 方法 | <code>getPendingWaits(request: RuntimeQueryRequest): Promise&lt;RuntimePendingWaitProjection[]&gt;</code> | 读取 Pending Waits。 |
| `getRun` | 方法 | <code>getRun(request: RuntimeQueryRequest): Promise&lt;RuntimeRunView &#124; null&gt;</code> | 读取 Run。 |
| `getTimeline` | 方法 | <code>getTimeline(request: RuntimeTimelineRequest): Promise&lt;RuntimeTimelineResult&gt;</code> | 读取 Timeline。 |

## `RuntimeRunView` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventHeadSequence` | 属性 | <code>eventHeadSequence: number</code> | event Head Sequence 字段。 |
| `projection` | 属性 | <code>projection: RuntimeOrchestrationProjection</code> | projection 字段。 |
| `projectionLag` | 属性 | <code>projectionLag: number</code> | projection Lag 字段。 |
| `projectionLastSequence` | 属性 | <code>projectionLastSequence: number</code> | projection Last Sequence 字段。 |
| `projectionVersion` | 属性 | <code>projectionVersion: string</code> | projection Version 字段。 |
| `refreshedAt` | 属性 | <code>refreshedAt: string</code> | refreshed At 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |

## `RuntimeStateExplanation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `currentState` | 属性 | <code>currentState: string</code> | current State 字段。 |
| `lastEventSequence` | 属性 | <code>lastEventSequence: number</code> | last Event Sequence 字段。 |
| `pendingActivityIds` | 属性 | <code>pendingActivityIds: string[]</code> | pending Activity Ids 字段。 |
| `pendingTransitionEventId` | 属性 | <code>pendingTransitionEventId: string</code> | pending Transition Event Id 字段。 |
| `pendingWaitId` | 属性 | <code>pendingWaitId: string</code> | pending Wait Id 字段。 |
| `runStatus` | 属性 | <code>runStatus: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/contracts/runtime-projection").RuntimeOrchestrationRunStatus</code> | run Status 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `source` | 属性 | <code>source: "runtime.orchestration.projection"</code> | source 字段。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | state Attempt 字段。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | state Path 字段。 |

## `RuntimeTimelineRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fromSequence` | 属性 | <code>fromSequence: number</code> | from Sequence 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `toSequence` | 属性 | <code>toSequence: number</code> | to Sequence 字段。 |
| `types` | 属性 | <code>types: FrameworkEventType[]</code> | types 字段。 |

## `RuntimeTimelineResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventCount` | 属性 | <code>eventCount: number</code> | event Count 字段。 |
| `eventHeadSequence` | 属性 | <code>eventHeadSequence: number</code> | event Head Sequence 字段。 |
| `events` | 属性 | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | events 字段。 |
| `refreshedAt` | 属性 | <code>refreshedAt: string</code> | refreshed At 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
