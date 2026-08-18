# `@codesoul-co/hypha-core` / `contracts/runtime`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)
- Exports: **20**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_ERROR_CODES` | constant | <code>const RUNTIME_ERROR_CODES: readonly ["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW", "RUNTIME_RUN_NOT_FOUND", "RU...</code> | RUNTIME ERROR CODES constant exported by the `contracts/runtime` module. |
| `RUNTIME_PRINCIPAL_TYPES` | constant | <code>const RUNTIME_PRINCIPAL_TYPES: readonly ["user", "agent", "service", "system"]</code> | RUNTIME PRINCIPAL TYPES constant exported by the `contracts/runtime` module. |
| `RUNTIME_RUN_STATUSES` | constant | <code>const RUNTIME_RUN_STATUSES: readonly ["created", "queued", "starting", "acquiring", "running", "waiting", "waiting_human", "waiting_signal", "waiting_timer", "pausing", "paused", "retry_scheduled", "recovering", "cancelling", "completed", "failed", "cancelled", "timed_out"]</code> | RUNTIME RUN STATUSES constant exported by the `contracts/runtime` module. |
| `RUNTIME_SESSION_STATUSES` | constant | <code>const RUNTIME_SESSION_STATUSES: readonly ["active", "closed", "archived"]</code> | RUNTIME SESSION STATUSES constant exported by the `contracts/runtime` module. |
| `RUNTIME_WAIT_STATUSES` | constant | <code>const RUNTIME_WAIT_STATUSES: readonly ["waiting", "received", "expired", "cancelled"]</code> | RUNTIME WAIT STATUSES constant exported by the `contracts/runtime` module. |
| `RUNTIME_WAIT_TYPES` | constant | <code>const RUNTIME_WAIT_TYPES: readonly ["human", "signal", "timer", "external_operation"]</code> | RUNTIME WAIT TYPES constant exported by the `contracts/runtime` module. |
| `NormalizedRuntimeError` | interface | <code>interface NormalizedRuntimeError</code> | Field contract for Normalized Runtime Error; see all contract members below. |
| `RunSignalRequest` | interface | <code>interface RunSignalRequest</code> | Field contract for Run Signal Request; see all contract members below. |
| `RuntimePrincipal` | interface | <code>interface RuntimePrincipal</code> | Field contract for Runtime Principal; see all contract members below. |
| `RuntimeRun` | interface | <code>interface RuntimeRun</code> | Field contract for Runtime Run; see all contract members below. |
| `RuntimeScope` | interface | <code>interface RuntimeScope</code> | Field contract for Runtime Scope; see all contract members below. |
| `RuntimeSession` | interface | <code>interface RuntimeSession</code> | Field contract for Runtime Session; see all contract members below. |
| `RuntimeWaitRecord` | interface | <code>interface RuntimeWaitRecord</code> | Field contract for Runtime Wait Record; see all contract members below. |
| `RuntimeWaitRequest` | interface | <code>interface RuntimeWaitRequest</code> | Field contract for Runtime Wait Request; see all contract members below. |
| `RuntimeErrorCode` | type | <code>type RuntimeErrorCode = (typeof RUNTIME_ERROR_CODES)[number]</code> | Public type alias for Runtime Error Code. |
| `RuntimePrincipalType` | type | <code>type RuntimePrincipalType = (typeof RUNTIME_PRINCIPAL_TYPES)[number]</code> | Public type alias for Runtime Principal Type. |
| `RuntimeRunStatus` | type | <code>type RuntimeRunStatus = (typeof RUNTIME_RUN_STATUSES)[number]</code> | Public type alias for Runtime Run Status. |
| `RuntimeSessionStatus` | type | <code>type RuntimeSessionStatus = (typeof RUNTIME_SESSION_STATUSES)[number]</code> | Public type alias for Runtime Session Status. |
| `RuntimeWaitStatus` | type | <code>type RuntimeWaitStatus = (typeof RUNTIME_WAIT_STATUSES)[number]</code> | Public type alias for Runtime Wait Status. |
| `RuntimeWaitType` | type | <code>type RuntimeWaitType = (typeof RUNTIME_WAIT_TYPES)[number]</code> | Public type alias for Runtime Wait Type. |

## `NormalizedRuntimeError` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causeRef` | property | <code>causeRef: string</code> | Public cause Ref property. |
| `code` | property | <code>code: "RUNTIME_INVALID_INPUT" &#124; "RUNTIME_MESSAGE_BUS_UNAVAILABLE" &#124; "RUNTIME_MESSAGE_SCHEMA_INVALID" &#124; "RUNTIME_MESSAGE_DEAD_LETTERED" &#124; "RUNTIME_SESSION_QUEUE_CONFLICT" &#124; "RUNTIME_SESSION_QUEUE_OVERFLOW" &#124; "RUNTIME_FENCING_REJECTED" &#124; "RUNTIME_RESOURCE_CONFLICT" &#124; "RUNTIME_IDEMPOTENCY_CONFLICT" &#124; "RUNTIME_EVENT_STREAM_CORRUPT" &#124; "RUNTIME_RECOVERY_REQUIRES_REVIEW" &#124; "RUNTIME_RUN_NOT_FOUND" &#124; "RUNTIME_RUN_CONFLICT"...</code> | Public code property. |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `transitionId` | property | <code>transitionId: string</code> | Public transition Id property. |

## `RunSignalRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `payload` | property | <code>payload: unknown</code> | Public payload property. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public principal property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sentAt` | property | <code>sentAt: string</code> | Public sent At property. |
| `signalId` | property | <code>signalId: string</code> | Public signal Id property. |

## `RuntimePrincipal` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `permissionScopes` | property | <code>permissionScopes: string[]</code> | Public permission Scopes property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `roles` | property | <code>roles: string[]</code> | Public roles property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `type` | property | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | Public type property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `RuntimeRun` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelReason` | property | <code>cancelReason: string</code> | Public cancel Reason property. |
| `cancelRequestedAt` | property | <code>cancelRequestedAt: string</code> | Public cancel Requested At property. |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `currentState` | property | <code>currentState: string</code> | Public current State property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `error` | property | <code>error: NormalizedRuntimeError</code> | Public error property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `input` | property | <code>input: unknown</code> | Public input property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `output` | property | <code>output: unknown</code> | Public output property. |
| `outputHash` | property | <code>outputHash: string</code> | Public output Hash property. |
| `processHash` | property | <code>processHash: string</code> | Public process Hash property. |
| `processSpecRef` | property | <code>processSpecRef: string</code> | Public process Spec Ref property. |
| `queuedAt` | property | <code>queuedAt: string</code> | Public queued At property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `rootAgentRef` | property | <code>rootAgentRef: SpecRef</code> | Public root Agent Ref property. |
| `runtimeProfileRef` | property | <code>runtimeProfileRef: SpecRef</code> | Public runtime Profile Ref property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |
| `status` | property | <code>status: "completed" &#124; "queued" &#124; "starting" &#124; "running" &#124; "cancelling" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "created" &#124; "acquiring" &#124; "waiting" &#124; "waiting_human" &#124; "waiting_signal" &#124; "waiting_timer" &#124; "pausing" &#124; "paused" &#124; "retry_scheduled" &#124; "recovering"</code> | Public status property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `terminalState` | property | <code>terminalState: string</code> | Public terminal State property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workflowRef` | property | <code>workflowRef: SpecRef</code> | Public workflow Ref property. |
| `workflowRevision` | property | <code>workflowRevision: string</code> | Public workflow Revision property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `RuntimeScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `RuntimeSession` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `closedAt` | property | <code>closedAt: string</code> | Public closed At property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `sessionProfileRef` | property | <code>sessionProfileRef: SpecRef</code> | Public session Profile Ref property. |
| `status` | property | <code>status: "archived" &#124; "active" &#124; "closed"</code> | Public status property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `title` | property | <code>title: string</code> | Public title property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `RuntimeWaitRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `expectedSchemaHash` | property | <code>expectedSchemaHash: string</code> | Public expected Schema Hash property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `resolvedAt` | property | <code>resolvedAt: string</code> | Public resolved At property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `signalRef` | property | <code>signalRef: string</code> | Public signal Ref property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `status` | property | <code>status: "cancelled" &#124; "expired" &#124; "waiting" &#124; "received"</code> | Public status property. |
| `type` | property | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "external_operation"</code> | Public type property. |

## `RuntimeWaitRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedSchema` | property | <code>expectedSchema: JsonSchema</code> | Public expected schema property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `pendingActionRef` | property | <code>pendingActionRef: string</code> | Public pending Action Ref property. |
| `timeoutTransitionId` | property | <code>timeoutTransitionId: string</code> | Public timeout Transition Id property. |
| `type` | property | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "external_operation"</code> | Public type property. |
