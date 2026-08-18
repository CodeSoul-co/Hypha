# `@codesoul-co/hypha-core` / `modules/runtime/runtime-recovery-service`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-recovery-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-recovery-service.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeRecoveryService` | 类 | <code>new RuntimeRecoveryService(options: RuntimeRecoveryServiceOptions): RuntimeRecoveryService</code> | Runtime Recovery Service 的运行时实现；公开构造函数与成员见下表。 |
| `RuntimeActivityRedispatchRecoveryPort` | 接口 | <code>interface RuntimeActivityRedispatchRecoveryPort</code> | Runtime Activity Redispatch Recovery Port 的字段契约；完整字段见下表。 |
| `RuntimeRecoveryServiceOptions` | 接口 | <code>interface RuntimeRecoveryServiceOptions</code> | Runtime Recovery Service Options 的字段契约；完整字段见下表。 |

## `RuntimeRecoveryService` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeRecoveryServiceOptions): RuntimeRecoveryService</code> | 创建该类的实例。 |
| `recover` | 方法 | <code>recover(input: RuntimeRecoveryCommand): Promise&lt;RuntimeRecoveryResult&gt;</code> | recover 的公开运行时操作。 |
| `scan` | 方法 | <code>scan(input: RuntimeRecoveryScanRequest): Promise&lt;RuntimeRecoveryScanResult&gt;</code> | scan 的公开运行时操作。 |

## `RuntimeActivityRedispatchRecoveryPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `redispatch` | 方法 | <code>redispatch(command: RuntimeActivityRedispatchCommand): Promise&lt;RuntimeActivityRedispatchResult&gt;</code> | redispatch 的公开运行时操作。 |

## `RuntimeRecoveryServiceOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activities` | 属性 | <code>activities: RuntimeActivityReconciliationPort</code> | activities 字段。 |
| `cancellations` | 属性 | <code>cancellations: RuntimeCancellationRecoveryPort</code> | cancellations 字段。 |
| `events` | 属性 | <code>events: EventRuntime</code> | events 字段。 |
| `nextId` | 方法 | <code>nextId(namespace: string): string</code> | next Id 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | projections 字段。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | projection Store 字段。 |
| `redispatches` | 属性 | <code>redispatches: RuntimeActivityRedispatchRecoveryPort</code> | redispatches 字段。 |
| `requeue` | 属性 | <code>requeue: RuntimeRecoveryRequeuePort</code> | requeue 字段。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | run Leases 字段。 |
| `stateClaims` | 属性 | <code>stateClaims: StateExecutionClaimStore</code> | state Claims 字段。 |
