# `@codesoul-co/hypha-core` / `contracts/runtime-activities`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-activities.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activities.ts)
- Exports: **20**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_ACTIVITY_EFFECTS` | constant | <code>const RUNTIME_ACTIVITY_EFFECTS: readonly ["pure", "idempotent", "external_effect", "irreversible"]</code> | RUNTIME ACTIVITY EFFECTS constant exported by the `contracts/runtime-activities` module. |
| `RUNTIME_ACTIVITY_OBSERVATION_STATUSES` | constant | <code>const RUNTIME_ACTIVITY_OBSERVATION_STATUSES: readonly ["completed", "failed", "waiting", "cancelled"]</code> | RUNTIME ACTIVITY OBSERVATION STATUSES constant exported by the `contracts/runtime-activities` module. |
| `RUNTIME_ACTIVITY_TYPES` | constant | <code>const RUNTIME_ACTIVITY_TYPES: readonly ["tool", "memory", "model", "execution", "custom"]</code> | RUNTIME ACTIVITY TYPES constant exported by the `contracts/runtime-activities` module. |
| `RuntimeActivityDispatchPort` | interface | <code>interface RuntimeActivityDispatchPort</code> | Field contract for Runtime Activity Dispatch Port; see all contract members below. |
| `RuntimeActivityHelper` | interface | <code>interface RuntimeActivityHelper</code> | Field contract for Runtime Activity Helper; see all contract members below. |
| `RuntimeActivityInvocation` | interface | <code>interface RuntimeActivityInvocation</code> | Field contract for Runtime Activity Invocation; see all contract members below. |
| `RuntimeActivityLifecycleCommitPort` | interface | <code>interface RuntimeActivityLifecycleCommitPort</code> | Field contract for Runtime Activity Lifecycle Commit Port; see all contract members below. |
| `RuntimeActivityLifecycleCommitRequest` | interface | <code>interface RuntimeActivityLifecycleCommitRequest</code> | Field contract for Runtime Activity Lifecycle Commit Request; see all contract members below. |
| `RuntimeActivityObservation` | interface | <code>interface RuntimeActivityObservation</code> | Field contract for Runtime Activity Observation; see all contract members below. |
| `RuntimeActivityOptions` | interface | <code>interface RuntimeActivityOptions</code> | Field contract for Runtime Activity Options; see all contract members below. |
| `RuntimeActivityRequest` | interface | <code>interface RuntimeActivityRequest</code> | Field contract for Runtime Activity Request; see all contract members below. |
| `RuntimeActivityRetryOptions` | interface | <code>interface RuntimeActivityRetryOptions</code> | Field contract for Runtime Activity Retry Options; see all contract members below. |
| `RuntimeActivityEffect` | type | <code>type RuntimeActivityEffect = (typeof RUNTIME_ACTIVITY_EFFECTS)[number]</code> | Public type alias for Runtime Activity Effect. |
| `RuntimeActivityObservationStatus` | type | <code>type RuntimeActivityObservationStatus = (typeof RUNTIME_ACTIVITY_OBSERVATION_STATUSES)[number]</code> | Public type alias for Runtime Activity Observation Status. |
| `RuntimeActivityType` | type | <code>type RuntimeActivityType = (typeof RUNTIME_ACTIVITY_TYPES)[number]</code> | Public type alias for Runtime Activity Type. |
| `RuntimeCustomActivityRequest` | type | <code>type RuntimeCustomActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Public type alias for Runtime Custom Activity Request. |
| `RuntimeExecutionActivityRequest` | type | <code>type RuntimeExecutionActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Public type alias for Runtime Execution Activity Request. |
| `RuntimeMemoryActivityRequest` | type | <code>type RuntimeMemoryActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Public type alias for Runtime Memory Activity Request. |
| `RuntimeModelActivityRequest` | type | <code>type RuntimeModelActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Public type alias for Runtime Model Activity Request. |
| `RuntimeToolActivityRequest` | type | <code>type RuntimeToolActivityRequest = RuntimeActivityRequest&lt;TInput&gt;</code> | Public type alias for Runtime Tool Activity Request. |

## `RuntimeActivityDispatchPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dispatch` | method | <code>dispatch(invocation: RuntimeActivityInvocation, abortSignal: AbortSignal): Promise&lt;RuntimeActivityObservation&gt;</code> | Public runtime operation for dispatch. |

## `RuntimeActivityHelper` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `custom` | method | <code>custom(request: RuntimeCustomActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public runtime operation for custom. |
| `execution` | method | <code>execution(request: RuntimeExecutionActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public runtime operation for execution. |
| `memory` | method | <code>memory(request: RuntimeMemoryActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public runtime operation for memory. |
| `model` | method | <code>model(request: RuntimeModelActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public runtime operation for model. |
| `tool` | method | <code>tool(request: RuntimeToolActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public runtime operation for tool. |

## `RuntimeActivityInvocation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public activity Id property. |
| `activityType` | property | <code>activityType: "memory" &#124; "tool" &#124; "model" &#124; "custom" &#124; "execution"</code> | Public activity Type property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `effect` | property | <code>effect: "external_effect" &#124; "irreversible" &#124; "pure" &#124; "idempotent"</code> | Public effect property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `metadata` | property | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `retry` | property | <code>retry: RuntimeActivityRetryOptions</code> | Public retry property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public state Attempt property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `target` | property | <code>target: string</code> | Public target property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |

## `RuntimeActivityLifecycleCommitPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: RuntimeActivityLifecycleCommitRequest): Promise&lt;FrameworkEvent&gt;</code> | Appends append at this module boundary. |

## `RuntimeActivityLifecycleCommitRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `event` | property | <code>event: EventCreateInput&lt;unknown&gt;</code> | Public event property. |
| `execution` | property | <code>execution: RuntimeHelperExecutionScope</code> | Public execution property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |

## `RuntimeActivityObservation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public activity Id property. |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `error` | property | <code>error: NormalizedRuntimeError</code> | Public error property. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public event Ids property. |
| `metadata` | property | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | Public metadata property. |
| `output` | property | <code>output: TOutput</code> | Public output property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |
| `status` | property | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "waiting"</code> | Public status property. |

## `RuntimeActivityOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `effect` | property | <code>effect: "external_effect" &#124; "irreversible" &#124; "pure" &#124; "idempotent"</code> | Public effect property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `metadata` | property | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | Public metadata property. |
| `retry` | property | <code>retry: RuntimeActivityRetryOptions</code> | Public retry property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |

## `RuntimeActivityRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `options` | property | <code>options: RuntimeActivityOptions</code> | Public options property. |
| `target` | property | <code>target: string</code> | Public target property. |

## `RuntimeActivityRetryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `initialDelayMs` | property | <code>initialDelayMs: number</code> | Public initial Delay Ms property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `maxDelayMs` | property | <code>maxDelayMs: number</code> | Public max Delay Ms property. |
