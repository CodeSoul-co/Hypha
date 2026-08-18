# `@codesoul-co/hypha-core` / `modules/runtime/runtime-activity-redispatch-service`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeActivityRedispatchService` | 类 | <code>new RuntimeActivityRedispatchService(options: RuntimeActivityRedispatchServiceOptions): RuntimeActivityRedispatchService</code> | Revalidates approved HumanTask evidence, records redispatch intent, invokes an Owner-provided idempotent Activity dispatcher, and persists acceptance. An intent without a receipt is reconciled before any retry is dispatched. |
| `runtimeActivityRedispatchIdentity` | 函数 | <code>runtimeActivityRedispatchIdentity(command: Pick&lt;RuntimeActivityRedispatchCommand, "scope" &#124; "taskId" &#124; "expectedTaskRevision"&gt;): string</code> | runtime Activity Redispatch Identity 的公开运行时操作。 |
| `RuntimeActivityRedispatchAttempt` | 接口 | <code>interface RuntimeActivityRedispatchAttempt</code> | Runtime Activity Redispatch Attempt 的字段契约；完整字段见下表。 |
| `RuntimeActivityRedispatchCommand` | 接口 | <code>interface RuntimeActivityRedispatchCommand extends RuntimeActivityDescriptorReference</code> | Runtime Activity Redispatch Command 的字段契约；完整字段见下表。 |
| `RuntimeActivityRedispatchPort` | 接口 | <code>interface RuntimeActivityRedispatchPort</code> | Runtime Activity Redispatch Port 的字段契约；完整字段见下表。 |
| `RuntimeActivityRedispatchResult` | 接口 | <code>interface RuntimeActivityRedispatchResult</code> | Runtime Activity Redispatch Result 的字段契约；完整字段见下表。 |
| `RuntimeActivityRedispatchServiceOptions` | 接口 | <code>interface RuntimeActivityRedispatchServiceOptions</code> | Runtime Activity Redispatch Service Options 的字段契约；完整字段见下表。 |
| `RuntimeActivityRevisionValidator` | 接口 | <code>interface RuntimeActivityRevisionValidator</code> | Runtime Activity Revision Validator 的字段契约；完整字段见下表。 |
| `RuntimeActivityRedispatchReconciliation` | 类型 | <code>type RuntimeActivityRedispatchReconciliation = { status: 'accepted'; commandId: string; } &#124; { status: 'safe_to_dispatch'; } &#124; { status: 'unknown'; reason: string; }</code> | Runtime Activity Redispatch Reconciliation 的公共类型别名。 |

## `RuntimeActivityRedispatchService` 公开成员

Revalidates approved HumanTask evidence, records redispatch intent, invokes an Owner-provided idempotent Activity dispatcher, and persists acceptance. An intent without a receipt is reconciled before any retry is dispatched.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeActivityRedispatchServiceOptions): RuntimeActivityRedispatchService</code> | 创建该类的实例。 |
| `redispatch` | 方法 | <code>redispatch(command: RuntimeActivityRedispatchCommand): Promise&lt;RuntimeActivityRedispatchResult&gt;</code> | redispatch 的公开运行时操作。 |

## `RuntimeActivityRedispatchAttempt` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalEventId` | 属性 | <code>approvalEventId: string</code> | approval Event Id 字段。 |
| `descriptor` | 属性 | <code>descriptor: Readonly&lt;RuntimeActivityDescriptor&gt;</code> | descriptor 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `redispatchCommandId` | 属性 | <code>redispatchCommandId: string</code> | redispatch Command Id 字段。 |
| `redispatchIdempotencyKey` | 属性 | <code>redispatchIdempotencyKey: string</code> | redispatch Idempotency Key 字段。 |
| `requestEventId` | 属性 | <code>requestEventId: string</code> | request Event Id 字段。 |
| `scope` | 属性 | <code>scope: Readonly&lt;RuntimeScope&gt;</code> | scope 字段。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | signal 字段。 |
| `task` | 属性 | <code>task: Readonly&lt;RuntimeHumanTask&gt;</code> | task 字段。 |

## `RuntimeActivityRedispatchCommand` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityDescriptorHash` | 属性 | <code>activityDescriptorHash: string</code> | activity Descriptor Hash 字段。 |
| `activityDescriptorRef` | 属性 | <code>activityDescriptorRef: string</code> | activity Descriptor Ref 字段。 |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `expectedSubjectHash` | 属性 | <code>expectedSubjectHash: string</code> | expected Subject Hash 字段。 |
| `expectedTaskRevision` | 属性 | <code>expectedTaskRevision: number</code> | expected Task Revision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | signal 字段。 |
| `taskId` | 属性 | <code>taskId: string</code> | task Id 字段。 |

## `RuntimeActivityRedispatchPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dispatch` | 方法 | <code>dispatch(input: RuntimeActivityRedispatchAttempt): Promise&lt;{ commandId: string; reused: boolean; }&gt;</code> | dispatch 的公开运行时操作。 |
| `reconcile` | 方法 | <code>reconcile(input: RuntimeActivityRedispatchAttempt): Promise&lt;RuntimeActivityRedispatchReconciliation&gt;</code> | Resolves the crash window between an accepted external dispatch and its durable Runtime receipt. `safe_to_dispatch` is an authoritative absence result; uncertainty must be returned as `unknown`. |

## `RuntimeActivityRedispatchResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityCommandId` | 属性 | <code>activityCommandId: string</code> | activity Command Id 字段。 |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `commandReused` | 属性 | <code>commandReused: boolean</code> | command Reused 字段。 |
| `eventReused` | 属性 | <code>eventReused: boolean</code> | event Reused 字段。 |
| `receiptEventId` | 属性 | <code>receiptEventId: string</code> | receipt Event Id 字段。 |
| `receiptReused` | 属性 | <code>receiptReused: boolean</code> | receipt Reused 字段。 |
| `reconciled` | 属性 | <code>reconciled: boolean</code> | reconciled 字段。 |
| `requestEventId` | 属性 | <code>requestEventId: string</code> | request Event Id 字段。 |

## `RuntimeActivityRedispatchServiceOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `descriptors` | 属性 | <code>descriptors: RuntimeActivityDescriptorStore</code> | descriptors 字段。 |
| `dispatcher` | 属性 | <code>dispatcher: RuntimeActivityRedispatchPort</code> | dispatcher 字段。 |
| `events` | 属性 | <code>events: EventRuntime</code> | events 字段。 |
| `monotonicNow` | 方法 | <code>monotonicNow(): number</code> | monotonic Now 的公开运行时操作。 |
| `nextId` | 方法 | <code>nextId(namespace: string): string</code> | next Id 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `onLeaseRenewalFailure` | 方法 | <code>onLeaseRenewalFailure(error: unknown, commandId: string): void</code> | 处理 Lease Renewal Failure。 |
| `operationalTelemetry` | 属性 | <code>operationalTelemetry: RuntimeOperationalTelemetry</code> | operational Telemetry 字段。 |
| `renewalIntervalMs` | 属性 | <code>renewalIntervalMs: number</code> | renewal Interval Ms 字段。 |
| `revisions` | 属性 | <code>revisions: RuntimeActivityRevisionValidator</code> | revisions 字段。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | run Leases 字段。 |
| `wait` | 方法 | <code>wait(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | wait 的公开运行时操作。 |

## `RuntimeActivityRevisionValidator` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `validate` | 方法 | <code>validate(input: { task: Readonly&lt;RuntimeHumanTask&gt;; descriptor: Readonly&lt;RuntimeActivityDescriptor&gt;; }): Promise&lt;void&gt;</code> | 校验 validate。 |
