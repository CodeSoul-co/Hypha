# `@codesoul-co/hypha-core` / `modules/runtime/runtime-cancellation-service`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-cancellation-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-cancellation-service.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeCancellationService` | 类 | <code>new RuntimeCancellationService(options: RuntimeCancellationServiceOptions): RuntimeCancellationService</code> | Runtime Cancellation Service 的运行时实现；公开构造函数与成员见下表。 |
| `RuntimeCancellationServiceOptions` | 接口 | <code>interface RuntimeCancellationServiceOptions</code> | Runtime Cancellation Service Options 的字段契约；完整字段见下表。 |

## `RuntimeCancellationService` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(input: RuntimeCancelCommand): Promise&lt;RuntimeCancelResult&gt;</code> | 取消 cancel。 |
| `constructor` | 构造函数 | <code>(options: RuntimeCancellationServiceOptions): RuntimeCancellationService</code> | 创建该类的实例。 |

## `RuntimeCancellationServiceOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activities` | 属性 | <code>activities: RuntimeActivityCancellationPort</code> | activities 字段。 |
| `children` | 属性 | <code>children: RuntimeChildRunCancellationPort</code> | children 字段。 |
| `commands` | 属性 | <code>commands: Pick&lt;SessionQueue, "cancelPending"&gt;</code> | commands 字段。 |
| `events` | 属性 | <code>events: EventRuntime</code> | events 字段。 |
| `nextId` | 方法 | <code>nextId(namespace: string): string</code> | next Id 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | projections 字段。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | projection Store 字段。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | run Leases 字段。 |
