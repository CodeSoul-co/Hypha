# `@codesoul-co/hypha-core` / `modules/runtime/runtime-human-wait-service`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-human-wait-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeHumanWaitService` | 类 | <code>new RuntimeHumanWaitService(options: RuntimeHumanWaitServiceOptions): RuntimeHumanWaitService</code> | Runtime Human Wait Service 的运行时实现；公开构造函数与成员见下表。 |
| `RuntimeHumanWaitCreateCommand` | 接口 | <code>interface RuntimeHumanWaitCreateCommand</code> | Runtime Human Wait Create Command 的字段契约；完整字段见下表。 |
| `RuntimeHumanWaitResolveCommand` | 接口 | <code>interface RuntimeHumanWaitResolveCommand</code> | Runtime Human Wait Resolve Command 的字段契约；完整字段见下表。 |
| `RuntimeHumanWaitResult` | 接口 | <code>interface RuntimeHumanWaitResult</code> | Runtime Human Wait Result 的字段契约；完整字段见下表。 |
| `RuntimeHumanWaitServiceOptions` | 接口 | <code>interface RuntimeHumanWaitServiceOptions</code> | Runtime Human Wait Service Options 的字段契约；完整字段见下表。 |
| `RuntimeHumanWaitSupersedeCommand` | 接口 | <code>interface RuntimeHumanWaitSupersedeCommand</code> | Runtime Human Wait Supersede Command 的字段契约；完整字段见下表。 |

## `RuntimeHumanWaitService` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeHumanWaitServiceOptions): RuntimeHumanWaitService</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: RuntimeHumanWaitCreateCommand): Promise&lt;RuntimeHumanWaitResult&gt;</code> | 创建 create。 |
| `resolve` | 方法 | <code>resolve(input: RuntimeHumanWaitResolveCommand): Promise&lt;RuntimeHumanWaitResult&gt;</code> | 解析 resolve。 |
| `supersede` | 方法 | <code>supersede(input: RuntimeHumanWaitSupersedeCommand): Promise&lt;RuntimeHumanWaitResult&gt;</code> | supersede 的公开运行时操作。 |

## `RuntimeHumanWaitCreateCommand` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `humanTasks` | 属性 | <code>humanTasks: RuntimeHumanTaskRequest[]</code> | human Tasks 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef: string</code> | pending Action Ref 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `waitId` | 属性 | <code>waitId: string</code> | wait Id 字段。 |

## `RuntimeHumanWaitResolveCommand` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `decision` | 属性 | <code>decision: "rejected" &#124; "cancelled" &#124; "expired" &#124; "approved"</code> | decision 字段。 |
| `humanTaskDecision` | 属性 | <code>humanTaskDecision: RuntimeHumanTaskDecisionCommand</code> | human Task Decision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef: string</code> | pending Action Ref 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `resolvedAt` | 属性 | <code>resolvedAt: string</code> | resolved At 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `waitId` | 属性 | <code>waitId: string</code> | wait Id 字段。 |

## `RuntimeHumanWaitResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `disposition` | 属性 | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | disposition 字段。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | event Ids 字段。 |
| `projection` | 属性 | <code>projection: RuntimeOrchestrationProjection</code> | projection 字段。 |
| `runRevision` | 属性 | <code>runRevision: number</code> | run Revision 字段。 |

## `RuntimeHumanWaitServiceOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: EventRuntime</code> | events 字段。 |
| `nextId` | 方法 | <code>nextId(namespace: string): string</code> | next Id 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | projections 字段。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | projection Store 字段。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | run Leases 字段。 |

## `RuntimeHumanWaitSupersedeCommand` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `humanTaskDecision` | 属性 | <code>humanTaskDecision: RuntimeHumanTaskDecisionCommand</code> | human Task Decision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef: string</code> | pending Action Ref 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `replacementTask` | 属性 | <code>replacementTask: RuntimeHumanTaskRequest</code> | replacement Task 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `supersededAt` | 属性 | <code>supersededAt: string</code> | superseded At 字段。 |
| `waitId` | 属性 | <code>waitId: string</code> | wait Id 字段。 |
