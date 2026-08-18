# `@codesoul-co/hypha-core` / `contracts/runtime-helpers`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-helpers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-helpers.ts)
- Exports: **33**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_DETERMINISTIC_OBSERVATION_KINDS` | constant | <code>const RUNTIME_DETERMINISTIC_OBSERVATION_KINDS: readonly ["clock", "id"]</code> | RUNTIME DETERMINISTIC OBSERVATION KINDS constant exported by the `contracts/runtime-helpers` module. |
| `RUNTIME_WAIT_INTENT_TYPES` | constant | <code>const RUNTIME_WAIT_INTENT_TYPES: readonly ["human", "signal", "timer", "pause"]</code> | RUNTIME WAIT INTENT TYPES constant exported by the `contracts/runtime-helpers` module. |
| `HumanWaitRequest` | interface | <code>interface HumanWaitRequest</code> | Field contract for Human Wait Request; see all contract members below. |
| `PauseRequest` | interface | <code>interface PauseRequest</code> | Field contract for Pause Request; see all contract members below. |
| `RuntimeClockHelper` | interface | <code>interface RuntimeClockHelper</code> | Field contract for Runtime Clock Helper; see all contract members below. |
| `RuntimeDeterminismResolution` | interface | <code>interface RuntimeDeterminismResolution</code> | Field contract for Runtime Determinism Resolution; see all contract members below. |
| `RuntimeDeterminismResolveRequest` | interface | <code>interface RuntimeDeterminismResolveRequest</code> | Field contract for Runtime Determinism Resolve Request; see all contract members below. |
| `RuntimeDeterminismScope` | interface | <code>interface RuntimeDeterminismScope</code> | Field contract for Runtime Determinism Scope; see all contract members below. |
| `RuntimeDeterminismStore` | interface | <code>interface RuntimeDeterminismStore</code> | Field contract for Runtime Determinism Store; see all contract members below. |
| `RuntimeDeterministicObservation` | interface | <code>interface RuntimeDeterministicObservation</code> | Field contract for Runtime Deterministic Observation; see all contract members below. |
| `RuntimeEventAppendOptions` | interface | <code>interface RuntimeEventAppendOptions</code> | Field contract for Runtime Event Append Options; see all contract members below. |
| `RuntimeEventCommitPort` | interface | <code>interface RuntimeEventCommitPort</code> | Field contract for Runtime Event Commit Port; see all contract members below. |
| `RuntimeEventCommitRequest` | interface | <code>interface RuntimeEventCommitRequest</code> | Field contract for Runtime Event Commit Request; see all contract members below. |
| `RuntimeEventHelper` | interface | <code>interface RuntimeEventHelper</code> | Field contract for Runtime Event Helper; see all contract members below. |
| `RuntimeHelperExecutionScope` | interface | <code>interface RuntimeHelperExecutionScope</code> | Field contract for Runtime Helper Execution Scope; see all contract members below. |
| `RuntimeHelperSdk` | interface | <code>interface RuntimeHelperSdk</code> | Field contract for Runtime Helper Sdk; see all contract members below. |
| `RuntimeIdHelper` | interface | <code>interface RuntimeIdHelper</code> | Field contract for Runtime Id Helper; see all contract members below. |
| `RuntimeIoHelperSdk` | interface | <code>interface RuntimeIoHelperSdk</code> | Field contract for Runtime Io Helper Sdk; see all contract members below. |
| `RuntimeObservationEventInput` | interface | <code>interface RuntimeObservationEventInput</code> | Field contract for Runtime Observation Event Input; see all contract members below. |
| `RuntimeResourceAcquireOptions` | interface | <code>interface RuntimeResourceAcquireOptions</code> | Field contract for Runtime Resource Acquire Options; see all contract members below. |
| `RuntimeResourceHelper` | interface | <code>interface RuntimeResourceHelper</code> | Field contract for Runtime Resource Helper; see all contract members below. |
| `RuntimeResourceHelperDependencies` | interface | <code>interface RuntimeResourceHelperDependencies</code> | Field contract for Runtime Resource Helper Dependencies; see all contract members below. |
| `RuntimeResourceRenewOptions` | interface | <code>interface RuntimeResourceRenewOptions</code> | Field contract for Runtime Resource Renew Options; see all contract members below. |
| `RuntimeTransitionHelper` | interface | <code>interface RuntimeTransitionHelper</code> | Field contract for Runtime Transition Helper; see all contract members below. |
| `RuntimeTransitionProposal` | interface | <code>interface RuntimeTransitionProposal</code> | Field contract for Runtime Transition Proposal; see all contract members below. |
| `RuntimeWaitHelper` | interface | <code>interface RuntimeWaitHelper</code> | Field contract for Runtime Wait Helper; see all contract members below. |
| `RuntimeWaitIntent` | interface | <code>interface RuntimeWaitIntent</code> | Field contract for Runtime Wait Intent; see all contract members below. |
| `SignalWaitRequest` | interface | <code>interface SignalWaitRequest</code> | Field contract for Signal Wait Request; see all contract members below. |
| `TimerWaitRequest` | interface | <code>interface TimerWaitRequest</code> | Field contract for Timer Wait Request; see all contract members below. |
| `RuntimeDeterministicObservationKind` | type | <code>type RuntimeDeterministicObservationKind = (typeof RUNTIME_DETERMINISTIC_OBSERVATION_KINDS)[number]</code> | Public type alias for Runtime Deterministic Observation Kind. |
| `RuntimeJsonValue` | type | <code>type RuntimeJsonValue = null &#124; boolean &#124; number &#124; string &#124; RuntimeJsonValue[] &#124; { [key: string]: RuntimeJsonValue; }</code> | Public type alias for Runtime Json Value. |
| `RuntimeStateExecutionResult` | type | <code>type RuntimeStateExecutionResult = { kind: 'completed'; output?: RuntimeJsonValue; variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;; } &#124; { kind: 'continued'; observation?: RuntimeJsonValue; } &#124; { kind: 'failed'; error: NormalizedRuntimeError; } &#124; { kind: 'waiting'; wait: RuntimeWaitIntent; }</code> | Public type alias for Runtime State Execution Result. |
| `RuntimeWaitIntentType` | type | <code>type RuntimeWaitIntentType = (typeof RUNTIME_WAIT_INTENT_TYPES)[number]</code> | Public type alias for Runtime Wait Intent Type. |

## `HumanWaitRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `metadata` | property | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | Public metadata property. |
| `pendingActionRef` | property | <code>pendingActionRef: string</code> | Public pending Action Ref property. |
| `timeoutTransitionId` | property | <code>timeoutTransitionId: string</code> | Public timeout Transition Id property. |

## `PauseRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `metadata` | property | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | Public metadata property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `resumeKey` | property | <code>resumeKey: string</code> | Public resume Key property. |

## `RuntimeClockHelper` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now(): Promise&lt;string&gt;</code> | Public runtime operation for now. |
| `sleepUntil` | method | <code>sleepUntil(isoTime: string): Promise&lt;RuntimeStateExecutionResult&gt;</code> | Public runtime operation for sleep Until. |

## `RuntimeDeterminismResolution` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `observation` | property | <code>observation: RuntimeDeterministicObservation&lt;T&gt;</code> | Public observation property. |
| `reused` | property | <code>reused: boolean</code> | Public reused property. |

## `RuntimeDeterminismResolveRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `key` | property | <code>key: string</code> | Public key property. |
| `kind` | property | <code>kind: "clock" &#124; "id"</code> | Public kind property. |
| `scope` | property | <code>scope: RuntimeDeterminismScope</code> | Public scope property. |

## `RuntimeDeterminismScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public state Attempt property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `RuntimeDeterminismStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `resolve` | method | <code>resolve&lt;T extends RuntimeJsonValue&gt;(request: RuntimeDeterminismResolveRequest, produce: () =&gt; T &#124; Promise&lt;T&gt;): Promise&lt;RuntimeDeterminismResolution&lt;T&gt;&gt;</code> | Resolves resolve at this module boundary. |

## `RuntimeDeterministicObservation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `key` | property | <code>key: string</code> | Public key property. |
| `kind` | property | <code>kind: "clock" &#124; "id"</code> | Public kind property. |
| `scope` | property | <code>scope: RuntimeDeterminismScope</code> | Public scope property. |
| `value` | property | <code>value: T</code> | Public value property. |

## `RuntimeEventAppendOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `metadata` | property | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | Public metadata property. |
| `parentEventId` | property | <code>parentEventId: string</code> | Public parent Event Id property. |

## `RuntimeEventCommitPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: RuntimeEventCommitRequest): Promise&lt;FrameworkEvent[]&gt;</code> | Appends append at this module boundary. |
| `readSince` | method | <code>readSince(scope: RuntimeScope, sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | Public runtime operation for read Since. |

## `RuntimeEventCommitRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: EventCreateInput&lt;unknown&gt;[]</code> | Public events property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `scope` | property | <code>scope: RuntimeHelperExecutionScope</code> | Public scope property. |

## `RuntimeEventHelper` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append&lt;T extends RuntimeJsonValue&gt;(type: RuntimeObservationEventType, payload: T, options?: RuntimeEventAppendOptions): Promise&lt;FrameworkEvent&lt;T&gt;&gt;</code> | Appends append at this module boundary. |
| `appendBatch` | method | <code>appendBatch(inputs: RuntimeObservationEventInput[]): Promise&lt;FrameworkEvent[]&gt;</code> | Appends Batch at this module boundary. |
| `readSince` | method | <code>readSince(sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | Public runtime operation for read Since. |

## `RuntimeHelperExecutionScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public state Attempt property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |

## `RuntimeHelperSdk` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clock` | property | <code>clock: RuntimeClockHelper</code> | Public clock property. |
| `ids` | property | <code>ids: RuntimeIdHelper</code> | Public ids property. |
| `transitions` | property | <code>transitions: RuntimeTransitionHelper</code> | Public transitions property. |
| `waits` | property | <code>waits: RuntimeWaitHelper</code> | Public waits property. |

## `RuntimeIdHelper` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `next` | method | <code>next(namespace: string): Promise&lt;string&gt;</code> | Public runtime operation for next. |

## `RuntimeIoHelperSdk` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: RuntimeEventHelper</code> | Public events property. |
| `resources` | property | <code>resources: RuntimeResourceHelper</code> | Public resources property. |

## `RuntimeObservationEventInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `options` | property | <code>options: RuntimeEventAppendOptions</code> | Public options property. |
| `payload` | property | <code>payload: T</code> | Public payload property. |
| `type` | property | <code>type: `runtime.observation.${string}`</code> | Public type property. |

## `RuntimeResourceAcquireOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |

## `RuntimeResourceHelper` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(resources: Omit&lt;RuntimeResourceRequest, "requestedClaimId"&gt;[], options: RuntimeResourceAcquireOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public runtime operation for acquire. |
| `assertCurrent` | method | <code>assertCurrent(claim: RuntimeResourceClaim): Promise&lt;RuntimeResourceClaim&gt;</code> | Asserts Current at this module boundary. |
| `release` | method | <code>release(claims: RuntimeResourceClaim[]): Promise&lt;void&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(claims: RuntimeResourceClaim[], options: RuntimeResourceRenewOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public runtime operation for renew. |

## `RuntimeResourceHelperDependencies` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clock` | property | <code>clock: RuntimeClockHelper</code> | Public clock property. |
| `coordinator` | property | <code>coordinator: RuntimeResourceCoordinator</code> | Public coordinator property. |
| `ids` | property | <code>ids: RuntimeIdHelper</code> | Public ids property. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public run Lease property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |

## `RuntimeResourceRenewOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |

## `RuntimeTransitionHelper` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(output?: RuntimeJsonValue, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeStateExecutionResult</code> | Public runtime operation for complete. |
| `continue` | method | <code>continue(observation?: RuntimeJsonValue): RuntimeStateExecutionResult</code> | Public runtime operation for continue. |
| `fail` | method | <code>fail(error: NormalizedRuntimeError): RuntimeStateExecutionResult</code> | Public runtime operation for fail. |
| `propose` | method | <code>propose(to: string, reason?: string, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeTransitionProposal</code> | Public runtime operation for propose. |

## `RuntimeTransitionProposal` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `to` | property | <code>to: string</code> | Public to property. |
| `variablesPatch` | property | <code>variablesPatch: Record&lt;string, RuntimeJsonValue&gt;</code> | Public variables Patch property. |

## `RuntimeWaitHelper` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `human` | method | <code>human(request: HumanWaitRequest): RuntimeStateExecutionResult</code> | Public runtime operation for human. |
| `pause` | method | <code>pause(request: PauseRequest): RuntimeStateExecutionResult</code> | Public runtime operation for pause. |
| `signal` | method | <code>signal(request: SignalWaitRequest): RuntimeStateExecutionResult</code> | Public runtime operation for signal. |
| `timer` | method | <code>timer(request: TimerWaitRequest): RuntimeStateExecutionResult</code> | Public runtime operation for timer. |

## `RuntimeWaitIntent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedSchema` | property | <code>expectedSchema: JsonSchema</code> | Public expected schema property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `metadata` | property | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | Public metadata property. |
| `pendingActionRef` | property | <code>pendingActionRef: string</code> | Public pending Action Ref property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `timeoutTransitionId` | property | <code>timeoutTransitionId: string</code> | Public timeout Transition Id property. |
| `type` | property | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "pause"</code> | Public type property. |

## `SignalWaitRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedSchema` | property | <code>expectedSchema: JsonSchema</code> | Public expected schema property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `metadata` | property | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | Public metadata property. |
| `timeoutTransitionId` | property | <code>timeoutTransitionId: string</code> | Public timeout Transition Id property. |

## `TimerWaitRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fireAt` | property | <code>fireAt: string</code> | Public fire At property. |
| `metadata` | property | <code>metadata: Record&lt;string, RuntimeJsonValue&gt;</code> | Public metadata property. |
| `timeoutTransitionId` | property | <code>timeoutTransitionId: string</code> | Public timeout Transition Id property. |
