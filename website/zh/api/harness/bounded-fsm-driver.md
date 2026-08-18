# `@codesoul-co/hypha-harness` / `bounded-fsm-driver`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 模块指南: [学习与组合说明](/zh/packages/harness)
- 源码: [`packages/harness/src/bounded-fsm-driver.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `FencedBoundedFSMDriver` | 类 | <code>new FencedBoundedFSMDriver(options: FencedBoundedFSMDriverOptions): FencedBoundedFSMDriver</code> | Fenced Bounded FSM Driver 的运行时实现；公开构造函数与成员见下表。 |
| `BoundedFSMDriverResult` | 接口 | <code>interface BoundedFSMDriverResult</code> | Bounded FSM Driver Result 的字段契约；完整字段见下表。 |
| `BoundedFSMDriverRunInput` | 接口 | <code>interface BoundedFSMDriverRunInput</code> | Bounded FSM Driver Run Input 的字段契约；完整字段见下表。 |
| `BoundedStateExecutionDecision` | 接口 | <code>interface BoundedStateExecutionDecision</code> | Bounded State Execution Decision 的字段契约；完整字段见下表。 |
| `BoundedStateExecutorInput` | 接口 | <code>interface BoundedStateExecutorInput</code> | Bounded State Executor Input 的字段契约；完整字段见下表。 |
| `FencedBoundedFSMDriverOptions` | 接口 | <code>interface FencedBoundedFSMDriverOptions</code> | Fenced Bounded FSM Driver Options 的字段契约；完整字段见下表。 |
| `BoundedFSMDriverDisposition` | 类型 | <code>type BoundedFSMDriverDisposition = 'completed' &#124; 'failed' &#124; 'cancelled' &#124; 'waiting' &#124; 'budget_exhausted' &#124; 'lease_unavailable' &#124; 'state_claim_unavailable'</code> | Bounded FSM Driver Disposition 的公共类型别名。 |

## `FencedBoundedFSMDriver` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: FencedBoundedFSMDriverOptions): FencedBoundedFSMDriver</code> | 创建该类的实例。 |
| `run` | 方法 | <code>run(input: BoundedFSMDriverRunInput): Promise&lt;BoundedFSMDriverResult&gt;</code> | run 的公开运行时操作。 |

## `BoundedFSMDriverResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `disposition` | 属性 | <code>disposition: BoundedFSMDriverDisposition</code> | disposition 字段。 |
| `projection` | 属性 | <code>projection: RuntimeOrchestrationProjection</code> | projection 字段。 |
| `steps` | 属性 | <code>steps: number</code> | steps 字段。 |
| `wait` | 属性 | <code>wait: RuntimeWaitIntent</code> | wait 字段。 |

## `BoundedFSMDriverRunInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal: AbortSignal</code> | abort Signal 字段。 |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `maxSteps` | 属性 | <code>maxSteps: number</code> | max Steps 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `process` | 属性 | <code>process: FSMProcessSpec</code> | process 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `stateClaimTtlMs` | 属性 | <code>stateClaimTtlMs: number</code> | state Claim Ttl Ms 字段。 |

## `BoundedStateExecutionDecision` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guardContext` | 属性 | <code>guardContext: FSMGuardContext</code> | guard Context 字段。 |
| `result` | 属性 | <code>result: RuntimeStateExecutionResult</code> | result 字段。 |
| `transition` | 属性 | <code>transition: RuntimeTransitionProposal</code> | transition 字段。 |

## `BoundedStateExecutorInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal: AbortSignal</code> | abort Signal 字段。 |
| `process` | 属性 | <code>process: Readonly&lt;FSMProcessSpec&gt;</code> | process 字段。 |
| `projection` | 属性 | <code>projection: Readonly&lt;RuntimeOrchestrationProjection&gt;</code> | projection 字段。 |
| `runLease` | 属性 | <code>runLease: Readonly&lt;FencedRunLease&gt;</code> | run Lease 字段。 |
| `scope` | 属性 | <code>scope: Readonly&lt;RuntimeScope&gt;</code> | scope 字段。 |
| `state` | 属性 | <code>state: Readonly&lt;FSMStateSpec&gt;</code> | state 字段。 |
| `stateClaim` | 属性 | <code>stateClaim: Readonly&lt;StateExecutionClaim&gt;</code> | state Claim 字段。 |

## `FencedBoundedFSMDriverOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluateGuard` | 方法 | <code>evaluateGuard(transition: Readonly&lt;FSMTransitionSpec&gt;, context: Readonly&lt;FSMGuardContext&gt;): Promise&lt;boolean&gt; &#124; boolean</code> | 评估 Guard。 |
| `events` | 属性 | <code>events: EventRuntime</code> | events 字段。 |
| `executeState` | 方法 | <code>executeState(input: BoundedStateExecutorInput): Promise&lt;BoundedStateExecutionDecision&gt;</code> | execute State 的公开运行时操作。 |
| `nextId` | 方法 | <code>nextId(namespace: string): string</code> | next Id 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | projections 字段。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | projection Store 字段。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | run Leases 字段。 |
| `stateClaims` | 属性 | <code>stateClaims: StateExecutionClaimStore</code> | state Claims 字段。 |
