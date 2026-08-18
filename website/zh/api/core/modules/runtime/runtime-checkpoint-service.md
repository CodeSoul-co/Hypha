# `@codesoul-co/hypha-core` / `modules/runtime/runtime-checkpoint-service`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-checkpoint-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-service.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeCheckpointService` | 类 | <code>new RuntimeCheckpointService(options: RuntimeCheckpointServiceOptions): RuntimeCheckpointService</code> | Runtime Checkpoint Service 的运行时实现；公开构造函数与成员见下表。 |
| `RuntimeCheckpointServiceOptions` | 接口 | <code>interface RuntimeCheckpointServiceOptions</code> | Runtime Checkpoint Service Options 的字段契约；完整字段见下表。 |

## `RuntimeCheckpointService` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeCheckpointServiceOptions): RuntimeCheckpointService</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: RuntimeCheckpointCreateCommand): Promise&lt;RuntimeCheckpointCreateResult&gt;</code> | 创建 create。 |
| `load` | 方法 | <code>load(input: RuntimeCheckpointLoadRequest): Promise&lt;RuntimeCheckpointLoadResult &#124; null&gt;</code> | 加载 load。 |

## `RuntimeCheckpointServiceOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpoints` | 属性 | <code>checkpoints: RuntimeCheckpointStore</code> | checkpoints 字段。 |
| `events` | 属性 | <code>events: EventRuntime</code> | events 字段。 |
| `nextId` | 方法 | <code>nextId(namespace: string): string</code> | next Id 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | projections 字段。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | projection Store 字段。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | run Leases 字段。 |
