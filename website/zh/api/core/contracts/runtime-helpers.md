# `@codesoul-co/hypha-core` / `contracts/runtime-helpers`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-helpers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)
- 导出数: **33**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_DETERMINISTIC_OBSERVATION_KINDS` | 常量 | <code>const RUNTIME_DETERMINISTIC_OBSERVATION_KINDS: readonly ["clock", "id"]</code> | 由 `contracts/runtime-helpers` 模块导出的 RUNTIME DETERMINISTIC OBSERVATION KINDS 常量。 |
| `RUNTIME_WAIT_INTENT_TYPES` | 常量 | <code>const RUNTIME_WAIT_INTENT_TYPES: readonly ["human", "signal", "timer", "pause"]</code> | 由 `contracts/runtime-helpers` 模块导出的 RUNTIME WAIT INTENT TYPES 常量。 |
| `HumanWaitRequest` | 接口 | <code>interface HumanWaitRequest</code> | Human Wait Request 的字段契约；完整字段见下表。 |
| `PauseRequest` | 接口 | <code>interface PauseRequest</code> | Pause Request 的字段契约；完整字段见下表。 |
| `RuntimeClockHelper` | 接口 | <code>interface RuntimeClockHelper</code> | Runtime Clock Helper 的字段契约；完整字段见下表。 |
| `RuntimeDeterminismResolution` | 接口 | <code>interface RuntimeDeterminismResolution</code> | Runtime Determinism Resolution 的字段契约；完整字段见下表。 |
| `RuntimeDeterminismResolveRequest` | 接口 | <code>interface RuntimeDeterminismResolveRequest</code> | Runtime Determinism Resolve Request 的字段契约；完整字段见下表。 |
| `RuntimeDeterminismScope` | 接口 | <code>interface RuntimeDeterminismScope</code> | Runtime Determinism Scope 的字段契约；完整字段见下表。 |
| `RuntimeDeterminismStore` | 接口 | <code>interface RuntimeDeterminismStore</code> | Runtime Determinism Store 的字段契约；完整字段见下表。 |
| `RuntimeDeterministicObservation` | 接口 | <code>interface RuntimeDeterministicObservation</code> | Runtime Deterministic Observation 的字段契约；完整字段见下表。 |
| `RuntimeEventAppendOptions` | 接口 | <code>interface RuntimeEventAppendOptions</code> | Runtime Event Append Options 的字段契约；完整字段见下表。 |
| `RuntimeEventCommitPort` | 接口 | <code>interface RuntimeEventCommitPort</code> | Runtime Event Commit Port 的字段契约；完整字段见下表。 |
| `RuntimeEventCommitRequest` | 接口 | <code>interface RuntimeEventCommitRequest</code> | Runtime Event Commit Request 的字段契约；完整字段见下表。 |
| `RuntimeEventHelper` | 接口 | <code>interface RuntimeEventHelper</code> | Runtime Event Helper 的字段契约；完整字段见下表。 |
| `RuntimeHelperExecutionScope` | 接口 | <code>interface RuntimeHelperExecutionScope</code> | Runtime Helper Execution Scope 的字段契约；完整字段见下表。 |
| `RuntimeHelperSdk` | 接口 | <code>interface RuntimeHelperSdk</code> | Runtime Helper Sdk 的字段契约；完整字段见下表。 |
| `RuntimeIdHelper` | 接口 | <code>interface RuntimeIdHelper</code> | Runtime Id Helper 的字段契约；完整字段见下表。 |
| `RuntimeIoHelperSdk` | 接口 | <code>interface RuntimeIoHelperSdk</code> | Runtime Io Helper Sdk 的字段契约；完整字段见下表。 |
| `RuntimeObservationEventInput` | 接口 | <code>interface RuntimeObservationEventInput</code> | Runtime Observation Event Input 的字段契约；完整字段见下表。 |
| `RuntimeResourceAcquireOptions` | 接口 | <code>interface RuntimeResourceAcquireOptions</code> | Runtime Resource Acquire Options 的字段契约；完整字段见下表。 |
| `RuntimeResourceHelper` | 接口 | <code>interface RuntimeResourceHelper</code> | Runtime Resource Helper 的字段契约；完整字段见下表。 |
| `RuntimeResourceHelperDependencies` | 接口 | <code>interface RuntimeResourceHelperDependencies</code> | Runtime Resource Helper Dependencies 的字段契约；完整字段见下表。 |
| `RuntimeResourceRenewOptions` | 接口 | <code>interface RuntimeResourceRenewOptions</code> | Runtime Resource Renew Options 的字段契约；完整字段见下表。 |
| `RuntimeTransitionHelper` | 接口 | <code>interface RuntimeTransitionHelper</code> | Runtime Transition Helper 的字段契约；完整字段见下表。 |
| `RuntimeTransitionProposal` | 接口 | <code>interface RuntimeTransitionProposal</code> | Runtime Transition Proposal 的字段契约；完整字段见下表。 |
| `RuntimeWaitHelper` | 接口 | <code>interface RuntimeWaitHelper</code> | Runtime Wait Helper 的字段契约；完整字段见下表。 |
| `RuntimeWaitIntent` | 接口 | <code>interface RuntimeWaitIntent</code> | Runtime Wait Intent 的字段契约；完整字段见下表。 |
| `SignalWaitRequest` | 接口 | <code>interface SignalWaitRequest</code> | Signal Wait Request 的字段契约；完整字段见下表。 |
| `TimerWaitRequest` | 接口 | <code>interface TimerWaitRequest</code> | Timer Wait Request 的字段契约；完整字段见下表。 |
| `RuntimeDeterministicObservationKind` | 类型 | <code>type RuntimeDeterministicObservationKind = (typeof RUNTIME_DETERMINISTIC_OBSERVATION_KINDS)[number]</code> | Runtime Deterministic Observation Kind 的公共类型别名。 |
| `RuntimeJsonValue` | 类型 | <code>type RuntimeJsonValue = null &#124; boolean &#124; number &#124; string &#124; RuntimeJsonValue[] &#124; { [key: string]: RuntimeJsonValue; }</code> | Runtime Json Value 的公共类型别名。 |
| `RuntimeStateExecutionResult` | 类型 | <code>type RuntimeStateExecutionResult = { kind: 'completed'; output?: RuntimeJsonValue; variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;; } &#124; { kind: 'continued'; observation?: RuntimeJsonValue; } &#124; { kind: 'failed'; error: NormalizedRuntimeError; } &#124; { kind: 'waiting'; wait: RuntimeWaitIntent; }</code> | Runtime State Execution Result 的公共类型别名。 |
| `RuntimeWaitIntentType` | 类型 | <code>type RuntimeWaitIntentType = (typeof RUNTIME_WAIT_INTENT_TYPES)[number]</code> | Runtime Wait Intent Type 的公共类型别名。 |

## `HumanWaitRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | metadata 字段。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef: string</code> | pending Action Ref 字段。 |
| `timeoutTransitionId` | 属性 | <code>timeoutTransitionId: string</code> | timeout Transition Id 字段。 |

## `PauseRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `metadata` | 属性 | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | metadata 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `resumeKey` | 属性 | <code>resumeKey: string</code> | resume Key 字段。 |

## `RuntimeClockHelper` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now(): Promise&lt;string&gt;</code> | now 的公开运行时操作。 |
| `sleepUntil` | 方法 | <code>sleepUntil(isoTime: string): Promise&lt;RuntimeStateExecutionResult&gt;</code> | sleep Until 的公开运行时操作。 |

## `RuntimeDeterminismResolution` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `observation` | 属性 | <code>observation: RuntimeDeterministicObservation&lt;T&gt;</code> | observation 字段。 |
| `reused` | 属性 | <code>reused: boolean</code> | reused 字段。 |

## `RuntimeDeterminismResolveRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `kind` | 属性 | <code>kind: "clock" &#124; "id"</code> | kind 字段。 |
| `scope` | 属性 | <code>scope: RuntimeDeterminismScope</code> | scope 字段。 |

## `RuntimeDeterminismScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | state Attempt 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `RuntimeDeterminismStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `resolve` | 方法 | <code>resolve&lt;T extends RuntimeJsonValue&gt;(request: RuntimeDeterminismResolveRequest, produce: () =&gt; T &#124; Promise&lt;T&gt;): Promise&lt;RuntimeDeterminismResolution&lt;T&gt;&gt;</code> | 解析 resolve。 |

## `RuntimeDeterministicObservation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `kind` | 属性 | <code>kind: "clock" &#124; "id"</code> | kind 字段。 |
| `scope` | 属性 | <code>scope: RuntimeDeterminismScope</code> | scope 字段。 |
| `value` | 属性 | <code>value: T</code> | value 字段。 |

## `RuntimeEventAppendOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | metadata 字段。 |
| `parentEventId` | 属性 | <code>parentEventId: string</code> | parent Event Id 字段。 |

## `RuntimeEventCommitPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: RuntimeEventCommitRequest): Promise&lt;FrameworkEvent[]&gt;</code> | 追加 append。 |
| `readSince` | 方法 | <code>readSince(scope: RuntimeScope, sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | read Since 的公开运行时操作。 |

## `RuntimeEventCommitRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: EventCreateInput&lt;unknown&gt;[]</code> | events 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `scope` | 属性 | <code>scope: RuntimeHelperExecutionScope</code> | scope 字段。 |

## `RuntimeEventHelper` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append&lt;T extends RuntimeJsonValue&gt;(type: RuntimeObservationEventType, payload: T, options?: RuntimeEventAppendOptions): Promise&lt;FrameworkEvent&lt;T&gt;&gt;</code> | 追加 append。 |
| `appendBatch` | 方法 | <code>appendBatch(inputs: RuntimeObservationEventInput[]): Promise&lt;FrameworkEvent[]&gt;</code> | 追加 Batch。 |
| `readSince` | 方法 | <code>readSince(sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | read Since 的公开运行时操作。 |

## `RuntimeHelperExecutionScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | state Attempt 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |

## `RuntimeHelperSdk` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clock` | 属性 | <code>clock: RuntimeClockHelper</code> | clock 字段。 |
| `ids` | 属性 | <code>ids: RuntimeIdHelper</code> | ids 字段。 |
| `transitions` | 属性 | <code>transitions: RuntimeTransitionHelper</code> | transitions 字段。 |
| `waits` | 属性 | <code>waits: RuntimeWaitHelper</code> | waits 字段。 |

## `RuntimeIdHelper` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `next` | 方法 | <code>next(namespace: string): Promise&lt;string&gt;</code> | next 的公开运行时操作。 |

## `RuntimeIoHelperSdk` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: RuntimeEventHelper</code> | events 字段。 |
| `resources` | 属性 | <code>resources: RuntimeResourceHelper</code> | resources 字段。 |

## `RuntimeObservationEventInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `options` | 属性 | <code>options: RuntimeEventAppendOptions</code> | options 字段。 |
| `payload` | 属性 | <code>payload: T</code> | payload 字段。 |
| `type` | 属性 | <code>type: `runtime.observation.${string}`</code> | type 字段。 |

## `RuntimeResourceAcquireOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |

## `RuntimeResourceHelper` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(resources: Omit&lt;RuntimeResourceRequest, "requestedClaimId"&gt;[], options: RuntimeResourceAcquireOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | acquire 的公开运行时操作。 |
| `assertCurrent` | 方法 | <code>assertCurrent(claim: RuntimeResourceClaim): Promise&lt;RuntimeResourceClaim&gt;</code> | 断言 Current。 |
| `release` | 方法 | <code>release(claims: RuntimeResourceClaim[]): Promise&lt;void&gt;</code> | release 的公开运行时操作。 |
| `renew` | 方法 | <code>renew(claims: RuntimeResourceClaim[], options: RuntimeResourceRenewOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | renew 的公开运行时操作。 |

## `RuntimeResourceHelperDependencies` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clock` | 属性 | <code>clock: RuntimeClockHelper</code> | clock 字段。 |
| `coordinator` | 属性 | <code>coordinator: RuntimeResourceCoordinator</code> | coordinator 字段。 |
| `ids` | 属性 | <code>ids: RuntimeIdHelper</code> | ids 字段。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | run Lease 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |

## `RuntimeResourceRenewOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |

## `RuntimeTransitionHelper` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(output?: RuntimeJsonValue, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeStateExecutionResult</code> | complete 的公开运行时操作。 |
| `continue` | 方法 | <code>continue(observation?: RuntimeJsonValue): RuntimeStateExecutionResult</code> | continue 的公开运行时操作。 |
| `fail` | 方法 | <code>fail(error: NormalizedRuntimeError): RuntimeStateExecutionResult</code> | fail 的公开运行时操作。 |
| `propose` | 方法 | <code>propose(to: string, reason?: string, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeTransitionProposal</code> | propose 的公开运行时操作。 |

## `RuntimeTransitionProposal` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `to` | 属性 | <code>to: string</code> | to 字段。 |
| `variablesPatch` | 属性 | <code>variablesPatch: Record&lt;string, RuntimeJsonValue&gt;</code> | variables Patch 字段。 |

## `RuntimeWaitHelper` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `human` | 方法 | <code>human(request: HumanWaitRequest): RuntimeStateExecutionResult</code> | human 的公开运行时操作。 |
| `pause` | 方法 | <code>pause(request: PauseRequest): RuntimeStateExecutionResult</code> | pause 的公开运行时操作。 |
| `signal` | 方法 | <code>signal(request: SignalWaitRequest): RuntimeStateExecutionResult</code> | signal 的公开运行时操作。 |
| `timer` | 方法 | <code>timer(request: TimerWaitRequest): RuntimeStateExecutionResult</code> | timer 的公开运行时操作。 |

## `RuntimeWaitIntent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedSchema` | 属性 | <code>expectedSchema: JsonSchema</code> | expected schema 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | metadata 字段。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef: string</code> | pending Action Ref 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `timeoutTransitionId` | 属性 | <code>timeoutTransitionId: string</code> | timeout Transition Id 字段。 |
| `type` | 属性 | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "pause"</code> | type 字段。 |

## `SignalWaitRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedSchema` | 属性 | <code>expectedSchema: JsonSchema</code> | expected schema 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | metadata 字段。 |
| `timeoutTransitionId` | 属性 | <code>timeoutTransitionId: string</code> | timeout Transition Id 字段。 |

## `TimerWaitRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fireAt` | 属性 | <code>fireAt: string</code> | fire At 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | metadata 字段。 |
| `timeoutTransitionId` | 属性 | <code>timeoutTransitionId: string</code> | timeout Transition Id 字段。 |
