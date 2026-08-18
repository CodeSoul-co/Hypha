# `@codesoul-co/hypha-core` / `contracts/runtime-activities`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-activities.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)
- 导出数: **20**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_ACTIVITY_EFFECTS` | 常量 | <code>const RUNTIME_ACTIVITY_EFFECTS: readonly ["pure", "idempotent", "external_effect", "irreversible"]</code> | 由 `contracts/runtime-activities` 模块导出的 RUNTIME ACTIVITY EFFECTS 常量。 |
| `RUNTIME_ACTIVITY_OBSERVATION_STATUSES` | 常量 | <code>const RUNTIME_ACTIVITY_OBSERVATION_STATUSES: readonly ["completed", "failed", "waiting", "cancelled"]</code> | 由 `contracts/runtime-activities` 模块导出的 RUNTIME ACTIVITY OBSERVATION STATUSES 常量。 |
| `RUNTIME_ACTIVITY_TYPES` | 常量 | <code>const RUNTIME_ACTIVITY_TYPES: readonly ["tool", "memory", "model", "execution", "custom"]</code> | 由 `contracts/runtime-activities` 模块导出的 RUNTIME ACTIVITY TYPES 常量。 |
| `RuntimeActivityDispatchPort` | 接口 | <code>interface RuntimeActivityDispatchPort</code> | Runtime Activity Dispatch Port 的字段契约；完整字段见下表。 |
| `RuntimeActivityHelper` | 接口 | <code>interface RuntimeActivityHelper</code> | Runtime Activity Helper 的字段契约；完整字段见下表。 |
| `RuntimeActivityInvocation` | 接口 | <code>interface RuntimeActivityInvocation</code> | Runtime Activity Invocation 的字段契约；完整字段见下表。 |
| `RuntimeActivityLifecycleCommitPort` | 接口 | <code>interface RuntimeActivityLifecycleCommitPort</code> | Runtime Activity Lifecycle Commit Port 的字段契约；完整字段见下表。 |
| `RuntimeActivityLifecycleCommitRequest` | 接口 | <code>interface RuntimeActivityLifecycleCommitRequest</code> | Runtime Activity Lifecycle Commit Request 的字段契约；完整字段见下表。 |
| `RuntimeActivityObservation` | 接口 | <code>interface RuntimeActivityObservation</code> | Runtime Activity Observation 的字段契约；完整字段见下表。 |
| `RuntimeActivityOptions` | 接口 | <code>interface RuntimeActivityOptions</code> | Runtime Activity Options 的字段契约；完整字段见下表。 |
| `RuntimeActivityRequest` | 接口 | <code>interface RuntimeActivityRequest</code> | Runtime Activity Request 的字段契约；完整字段见下表。 |
| `RuntimeActivityRetryOptions` | 接口 | <code>interface RuntimeActivityRetryOptions</code> | Runtime Activity Retry Options 的字段契约；完整字段见下表。 |
| `RuntimeActivityEffect` | 类型 | <code>type RuntimeActivityEffect = (typeof RUNTIME_ACTIVITY_EFFECTS)[number]</code> | Runtime Activity Effect 的公共类型别名。 |
| `RuntimeActivityObservationStatus` | 类型 | <code>type RuntimeActivityObservationStatus = (typeof RUNTIME_ACTIVITY_OBSERVATION_STATUSES)[number]</code> | Runtime Activity Observation Status 的公共类型别名。 |
| `RuntimeActivityType` | 类型 | <code>type RuntimeActivityType = (typeof RUNTIME_ACTIVITY_TYPES)[number]</code> | Runtime Activity Type 的公共类型别名。 |
| `RuntimeCustomActivityRequest` | 类型 | <code>type RuntimeCustomActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Runtime Custom Activity Request 的公共类型别名。 |
| `RuntimeExecutionActivityRequest` | 类型 | <code>type RuntimeExecutionActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Runtime Execution Activity Request 的公共类型别名。 |
| `RuntimeMemoryActivityRequest` | 类型 | <code>type RuntimeMemoryActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Runtime Memory Activity Request 的公共类型别名。 |
| `RuntimeModelActivityRequest` | 类型 | <code>type RuntimeModelActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Runtime Model Activity Request 的公共类型别名。 |
| `RuntimeToolActivityRequest` | 类型 | <code>type RuntimeToolActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Runtime Tool Activity Request 的公共类型别名。 |

## `RuntimeActivityDispatchPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dispatch` | 方法 | <code>dispatch(invocation: RuntimeActivityInvocation, abortSignal: AbortSignal): Promise&lt;RuntimeActivityObservation&gt;</code> | dispatch 的公开运行时操作。 |

## `RuntimeActivityHelper` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `custom` | 方法 | <code>custom(request: RuntimeCustomActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | custom 的公开运行时操作。 |
| `execution` | 方法 | <code>execution(request: RuntimeExecutionActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | execution 的公开运行时操作。 |
| `memory` | 方法 | <code>memory(request: RuntimeMemoryActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | memory 的公开运行时操作。 |
| `model` | 方法 | <code>model(request: RuntimeModelActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | model 的公开运行时操作。 |
| `tool` | 方法 | <code>tool(request: RuntimeToolActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | tool 的公开运行时操作。 |

## `RuntimeActivityInvocation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | activity Id 字段。 |
| `activityType` | 属性 | <code>activityType: "memory" &#124; "tool" &#124; "model" &#124; "custom" &#124; "execution"</code> | activity Type 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `effect` | 属性 | <code>effect: "external_effect" &#124; "irreversible" &#124; "pure" &#124; "idempotent"</code> | effect 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `retry` | 属性 | <code>retry: RuntimeActivityRetryOptions</code> | retry 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | state Attempt 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `target` | 属性 | <code>target: string</code> | target 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |

## `RuntimeActivityLifecycleCommitPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: RuntimeActivityLifecycleCommitRequest): Promise&lt;FrameworkEvent&gt;</code> | 追加 append。 |

## `RuntimeActivityLifecycleCommitRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `event` | 属性 | <code>event: EventCreateInput&lt;unknown&gt;</code> | event 字段。 |
| `execution` | 属性 | <code>execution: RuntimeHelperExecutionScope</code> | execution 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |

## `RuntimeActivityObservation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | activity Id 字段。 |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `error` | 属性 | <code>error: NormalizedRuntimeError</code> | error 字段。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | event Ids 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | metadata 字段。 |
| `output` | 属性 | <code>output: TOutput</code> | output 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "waiting"</code> | status 字段。 |

## `RuntimeActivityOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `effect` | 属性 | <code>effect: "external_effect" &#124; "irreversible" &#124; "pure" &#124; "idempotent"</code> | effect 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | metadata 字段。 |
| `retry` | 属性 | <code>retry: RuntimeActivityRetryOptions</code> | retry 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |

## `RuntimeActivityRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `options` | 属性 | <code>options: RuntimeActivityOptions</code> | options 字段。 |
| `target` | 属性 | <code>target: string</code> | target 字段。 |

## `RuntimeActivityRetryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `initialDelayMs` | 属性 | <code>initialDelayMs: number</code> | initial Delay Ms 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `maxDelayMs` | 属性 | <code>maxDelayMs: number</code> | max Delay Ms 字段。 |
