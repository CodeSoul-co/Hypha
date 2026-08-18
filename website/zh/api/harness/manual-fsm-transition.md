# `@codesoul-co/hypha-harness` / `manual-fsm-transition`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 模块指南: [学习与组合说明](/zh/packages/harness)
- 源码: [`packages/harness/src/manual-fsm-transition.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `GovernedFSMTransitionService` | 类 | <code>new GovernedFSMTransitionService(options: GovernedFSMTransitionServiceOptions): GovernedFSMTransitionService</code> | Applies an explicitly requested FSM edge under owner scope, permission, optimistic revision, Run Lease, fencing, Policy, guard, trace, and replay. It never mutates a snapshot or projection directly. |
| `MANUAL_FSM_TRANSITION_PERMISSION` | 常量 | <code>const MANUAL_FSM_TRANSITION_PERMISSION: "runtime.fsm.transition"</code> | 由 `manual-fsm-transition` 模块导出的 MANUAL FSM TRANSITION PERMISSION 常量。 |
| `GovernedFSMTransitionServiceOptions` | 接口 | <code>interface GovernedFSMTransitionServiceOptions</code> | Governed FSM Transition Service Options 的字段契约；完整字段见下表。 |
| `ManualFSMRunView` | 接口 | <code>interface ManualFSMRunView</code> | Manual FSM Run View 的字段契约；完整字段见下表。 |
| `ManualFSMTransitionCommand` | 接口 | <code>interface ManualFSMTransitionCommand</code> | Manual FSM Transition Command 的字段契约；完整字段见下表。 |
| `ManualFSMTransitionResult` | 接口 | <code>interface ManualFSMTransitionResult</code> | Manual FSM Transition Result 的字段契约；完整字段见下表。 |

## `GovernedFSMTransitionService` 公开成员

Applies an explicitly requested FSM edge under owner scope, permission, optimistic revision, Run Lease, fencing, Policy, guard, trace, and replay. It never mutates a snapshot or projection directly.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: GovernedFSMTransitionServiceOptions): GovernedFSMTransitionService</code> | 创建该类的实例。 |
| `inspect` | 方法 | <code>inspect(scope: RuntimeScope, process: FSMProcessSpec): Promise&lt;ManualFSMRunView&gt;</code> | inspect 的公开运行时操作。 |
| `transition` | 方法 | <code>transition(process: FSMProcessSpec, input: ManualFSMTransitionCommand): Promise&lt;ManualFSMTransitionResult&gt;</code> | 迁移 transition。 |

## `GovernedFSMTransitionServiceOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: EventRuntime</code> | events 字段。 |
| `nextId` | 方法 | <code>nextId(namespace: string): string</code> | next Id 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `policy` | 属性 | <code>policy: PolicyEngine</code> | policy 字段。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | projections 字段。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | projection Store 字段。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | run Leases 字段。 |

## `ManualFSMRunView` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedTransitions` | 属性 | <code>allowedTransitions: { to: string; guard?: string; description?: string; }[]</code> | allowed Transitions 字段。 |
| `currentState` | 属性 | <code>currentState: string</code> | current State 字段。 |
| `processId` | 属性 | <code>processId: string</code> | process Id 字段。 |
| `processVersion` | 属性 | <code>processVersion: string</code> | process Version 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `runRevision` | 属性 | <code>runRevision: number</code> | run Revision 字段。 |
| `runStatus` | 属性 | <code>runStatus: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeOrchestrationRunStatus</code> | run Status 字段。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | state Attempt 字段。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | state Path 字段。 |
| `terminalStates` | 属性 | <code>terminalStates: string[]</code> | terminal States 字段。 |

## `ManualFSMTransitionCommand` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `expectedRunRevision` | 属性 | <code>expectedRunRevision: number</code> | expected Run Revision 字段。 |
| `expectedState` | 属性 | <code>expectedState: string</code> | expected State 字段。 |
| `guardContext` | 属性 | <code>guardContext: FSMGuardContext</code> | guard Context 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | principal 字段。 |
| `processId` | 属性 | <code>processId: string</code> | process Id 字段。 |
| `processVersion` | 属性 | <code>processVersion: string</code> | process Version 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `targetState` | 属性 | <code>targetState: string</code> | target State 字段。 |
| `variablesPatch` | 属性 | <code>variablesPatch: Record&lt;string, RuntimeJsonValue&gt;</code> | variables Patch 字段。 |

## `ManualFSMTransitionResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `disposition` | 属性 | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | disposition 字段。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | event Ids 字段。 |
| `runRevision` | 属性 | <code>runRevision: number</code> | run Revision 字段。 |
| `view` | 属性 | <code>view: ManualFSMRunView</code> | view 字段。 |
