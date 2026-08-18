# `@codesoul-co/hypha-core` / `modules/runtime/runtime-query-service`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-query-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-query-service.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeQueryService` | 类 | <code>new RuntimeQueryService(options: RuntimeQueryServiceOptions): RuntimeQueryService</code> | Runtime Query Service 的运行时实现；公开构造函数与成员见下表。 |
| `RuntimeQueryServiceOptions` | 接口 | <code>interface RuntimeQueryServiceOptions</code> | Runtime Query Service Options 的字段契约；完整字段见下表。 |

## `RuntimeQueryService` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeQueryServiceOptions): RuntimeQueryService</code> | 创建该类的实例。 |
| `explainState` | 方法 | <code>explainState(input: RuntimeQueryRequest): Promise&lt;RuntimeStateExplanation &#124; null&gt;</code> | explain State 的公开运行时操作。 |
| `getFSM` | 方法 | <code>getFSM(input: RuntimeQueryRequest): Promise&lt;RuntimeOrchestrationProjection &#124; null&gt;</code> | 读取 FSM。 |
| `getPendingWaits` | 方法 | <code>getPendingWaits(input: RuntimeQueryRequest): Promise&lt;RuntimePendingWaitProjection[]&gt;</code> | 读取 Pending Waits。 |
| `getRun` | 方法 | <code>getRun(input: RuntimeQueryRequest): Promise&lt;RuntimeRunView &#124; null&gt;</code> | 读取 Run。 |
| `getTimeline` | 方法 | <code>getTimeline(input: RuntimeTimelineRequest): Promise&lt;RuntimeTimelineResult&gt;</code> | 读取 Timeline。 |

## `RuntimeQueryServiceOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: Pick&lt;EventRuntime, "read" &#124; "getStreamHead"&gt;</code> | events 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | projections 字段。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | projection Store 字段。 |
