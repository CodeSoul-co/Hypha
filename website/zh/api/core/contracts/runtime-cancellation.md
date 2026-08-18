# `@codesoul-co/hypha-core` / `contracts/runtime-cancellation`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-cancellation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation.ts)
- 导出数: **18**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_CANCELLATION_DISPOSITIONS` | 常量 | <code>const RUNTIME_CANCELLATION_DISPOSITIONS: readonly ["applied", "reused"]</code> | 由 `contracts/runtime-cancellation` 模块导出的 RUNTIME CANCELLATION DISPOSITIONS 常量。 |
| `RUNTIME_CANCELLATION_PROPAGATIONS` | 常量 | <code>const RUNTIME_CANCELLATION_PROPAGATIONS: readonly ["none", "children", "all_descendants"]</code> | 由 `contracts/runtime-cancellation` 模块导出的 RUNTIME CANCELLATION PROPAGATIONS 常量。 |
| `RUNTIME_CANCELLATION_TARGET_STATUSES` | 常量 | <code>const RUNTIME_CANCELLATION_TARGET_STATUSES: readonly ["cancelled", "already_terminal", "not_found", "failed"]</code> | 由 `contracts/runtime-cancellation` 模块导出的 RUNTIME CANCELLATION TARGET STATUSES 常量。 |
| `RUNTIME_CANCELLATION_TARGET_TYPES` | 常量 | <code>const RUNTIME_CANCELLATION_TARGET_TYPES: readonly ["activity", "child_run", "session_command"]</code> | 由 `contracts/runtime-cancellation` 模块导出的 RUNTIME CANCELLATION TARGET TYPES 常量。 |
| `RuntimeActivityCancellationPort` | 接口 | <code>interface RuntimeActivityCancellationPort</code> | Runtime Activity Cancellation Port 的字段契约；完整字段见下表。 |
| `RuntimeActivityCancellationRequest` | 接口 | <code>interface RuntimeActivityCancellationRequest</code> | Runtime Activity Cancellation Request 的字段契约；完整字段见下表。 |
| `RuntimeCancelCommand` | 接口 | <code>interface RuntimeCancelCommand</code> | Runtime Cancel Command 的字段契约；完整字段见下表。 |
| `RuntimeCancellationPolicy` | 接口 | <code>interface RuntimeCancellationPolicy</code> | Runtime Cancellation Policy 的字段契约；完整字段见下表。 |
| `RuntimeCancellationTargetResult` | 接口 | <code>interface RuntimeCancellationTargetResult</code> | Runtime Cancellation Target Result 的字段契约；完整字段见下表。 |
| `RuntimeCancelResult` | 接口 | <code>interface RuntimeCancelResult</code> | Runtime Cancel Result 的字段契约；完整字段见下表。 |
| `RuntimeChildRunCancellationPort` | 接口 | <code>interface RuntimeChildRunCancellationPort</code> | Runtime Child Run Cancellation Port 的字段契约；完整字段见下表。 |
| `RuntimeChildRunCancellationRequest` | 接口 | <code>interface RuntimeChildRunCancellationRequest</code> | Runtime Child Run Cancellation Request 的字段契约；完整字段见下表。 |
| `RuntimeChildRunListRequest` | 接口 | <code>interface RuntimeChildRunListRequest</code> | Runtime Child Run List Request 的字段契约；完整字段见下表。 |
| `RuntimeChildRunReference` | 接口 | <code>interface RuntimeChildRunReference</code> | Runtime Child Run Reference 的字段契约；完整字段见下表。 |
| `RuntimeCancellationDisposition` | 类型 | <code>type RuntimeCancellationDisposition = (typeof RUNTIME_CANCELLATION_DISPOSITIONS)[number]</code> | Runtime Cancellation Disposition 的公共类型别名。 |
| `RuntimeCancellationPropagation` | 类型 | <code>type RuntimeCancellationPropagation = (typeof RUNTIME_CANCELLATION_PROPAGATIONS)[number]</code> | Runtime Cancellation Propagation 的公共类型别名。 |
| `RuntimeCancellationTargetStatus` | 类型 | <code>type RuntimeCancellationTargetStatus = (typeof RUNTIME_CANCELLATION_TARGET_STATUSES)[number]</code> | Runtime Cancellation Target Status 的公共类型别名。 |
| `RuntimeCancellationTargetType` | 类型 | <code>type RuntimeCancellationTargetType = (typeof RUNTIME_CANCELLATION_TARGET_TYPES)[number]</code> | Runtime Cancellation Target Type 的公共类型别名。 |

## `RuntimeActivityCancellationPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(request: RuntimeActivityCancellationRequest): Promise&lt;RuntimeCancellationTargetResult&gt;</code> | 取消 cancel。 |

## `RuntimeActivityCancellationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | activity Id 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |

## `RuntimeCancelCommand` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `policy` | 属性 | <code>policy: RuntimeCancellationPolicy</code> | policy 字段。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | principal 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |

## `RuntimeCancellationPolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelRunningActivities` | 属性 | <code>cancelRunningActivities: boolean</code> | cancel Running Activities 字段。 |
| `propagation` | 属性 | <code>propagation: "none" &#124; "children" &#124; "all_descendants"</code> | propagation 字段。 |
| `waitGraceMs` | 属性 | <code>waitGraceMs: number</code> | wait Grace Ms 字段。 |

## `RuntimeCancellationTargetResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error: NormalizedRuntimeError</code> | error 字段。 |
| `status` | 属性 | <code>status: "cancelled" &#124; "failed" &#124; "not_found" &#124; "already_terminal"</code> | status 字段。 |
| `targetId` | 属性 | <code>targetId: string</code> | target Id 字段。 |
| `targetType` | 属性 | <code>targetType: "activity" &#124; "child_run" &#124; "session_command"</code> | target Type 字段。 |

## `RuntimeCancelResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `disposition` | 属性 | <code>disposition: "applied" &#124; "reused"</code> | disposition 字段。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | event Ids 字段。 |
| `projection` | 属性 | <code>projection: RuntimeOrchestrationProjection</code> | projection 字段。 |
| `targetResults` | 属性 | <code>targetResults: RuntimeCancellationTargetResult[]</code> | target Results 字段。 |
| `unresolvedActivityIds` | 属性 | <code>unresolvedActivityIds: string[]</code> | unresolved Activity Ids 字段。 |

## `RuntimeChildRunCancellationPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(request: RuntimeChildRunCancellationRequest): Promise&lt;RuntimeCancellationTargetResult&gt;</code> | 取消 cancel。 |
| `listChildren` | 方法 | <code>listChildren(request: RuntimeChildRunListRequest): Promise&lt;RuntimeChildRunReference[]&gt;</code> | 列出 Children。 |

## `RuntimeChildRunCancellationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `childRunId` | 属性 | <code>childRunId: string</code> | child Run Id 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `parentScope` | 属性 | <code>parentScope: RuntimeScope</code> | parent Scope 字段。 |
| `propagation` | 属性 | <code>propagation: "children" &#124; "all_descendants"</code> | propagation 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |

## `RuntimeChildRunListRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |

## `RuntimeChildRunReference` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
