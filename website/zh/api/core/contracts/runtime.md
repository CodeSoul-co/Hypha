# `@codesoul-co/hypha-core` / `contracts/runtime`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)
- 导出数: **20**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_ERROR_CODES` | 常量 | <code>const RUNTIME_ERROR_CODES: readonly ["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW", "RUNTIME_RUN_NOT_FOUND", "RU...</code> | 由 `contracts/runtime` 模块导出的 RUNTIME ERROR CODES 常量。 |
| `RUNTIME_PRINCIPAL_TYPES` | 常量 | <code>const RUNTIME_PRINCIPAL_TYPES: readonly ["user", "agent", "service", "system"]</code> | 由 `contracts/runtime` 模块导出的 RUNTIME PRINCIPAL TYPES 常量。 |
| `RUNTIME_RUN_STATUSES` | 常量 | <code>const RUNTIME_RUN_STATUSES: readonly ["created", "queued", "starting", "acquiring", "running", "waiting", "waiting_human", "waiting_signal", "waiting_timer", "pausing", "paused", "retry_scheduled", "recovering", "cancelling", "completed", "failed", "cancelled", "timed_out"]</code> | 由 `contracts/runtime` 模块导出的 RUNTIME RUN STATUSES 常量。 |
| `RUNTIME_SESSION_STATUSES` | 常量 | <code>const RUNTIME_SESSION_STATUSES: readonly ["active", "closed", "archived"]</code> | 由 `contracts/runtime` 模块导出的 RUNTIME SESSION STATUSES 常量。 |
| `RUNTIME_WAIT_STATUSES` | 常量 | <code>const RUNTIME_WAIT_STATUSES: readonly ["waiting", "received", "expired", "cancelled"]</code> | 由 `contracts/runtime` 模块导出的 RUNTIME WAIT STATUSES 常量。 |
| `RUNTIME_WAIT_TYPES` | 常量 | <code>const RUNTIME_WAIT_TYPES: readonly ["human", "signal", "timer", "external_operation"]</code> | 由 `contracts/runtime` 模块导出的 RUNTIME WAIT TYPES 常量。 |
| `NormalizedRuntimeError` | 接口 | <code>interface NormalizedRuntimeError</code> | Normalized Runtime Error 的字段契约；完整字段见下表。 |
| `RunSignalRequest` | 接口 | <code>interface RunSignalRequest</code> | Run Signal Request 的字段契约；完整字段见下表。 |
| `RuntimePrincipal` | 接口 | <code>interface RuntimePrincipal</code> | Runtime Principal 的字段契约；完整字段见下表。 |
| `RuntimeRun` | 接口 | <code>interface RuntimeRun</code> | Runtime Run 的字段契约；完整字段见下表。 |
| `RuntimeScope` | 接口 | <code>interface RuntimeScope</code> | Runtime Scope 的字段契约；完整字段见下表。 |
| `RuntimeSession` | 接口 | <code>interface RuntimeSession</code> | Runtime Session 的字段契约；完整字段见下表。 |
| `RuntimeWaitRecord` | 接口 | <code>interface RuntimeWaitRecord</code> | Runtime Wait Record 的字段契约；完整字段见下表。 |
| `RuntimeWaitRequest` | 接口 | <code>interface RuntimeWaitRequest</code> | Runtime Wait Request 的字段契约；完整字段见下表。 |
| `RuntimeErrorCode` | 类型 | <code>type RuntimeErrorCode = (typeof RUNTIME_ERROR_CODES)[number]</code> | Runtime Error Code 的公共类型别名。 |
| `RuntimePrincipalType` | 类型 | <code>type RuntimePrincipalType = (typeof RUNTIME_PRINCIPAL_TYPES)[number]</code> | Runtime Principal Type 的公共类型别名。 |
| `RuntimeRunStatus` | 类型 | <code>type RuntimeRunStatus = (typeof RUNTIME_RUN_STATUSES)[number]</code> | Runtime Run Status 的公共类型别名。 |
| `RuntimeSessionStatus` | 类型 | <code>type RuntimeSessionStatus = (typeof RUNTIME_SESSION_STATUSES)[number]</code> | Runtime Session Status 的公共类型别名。 |
| `RuntimeWaitStatus` | 类型 | <code>type RuntimeWaitStatus = (typeof RUNTIME_WAIT_STATUSES)[number]</code> | Runtime Wait Status 的公共类型别名。 |
| `RuntimeWaitType` | 类型 | <code>type RuntimeWaitType = (typeof RUNTIME_WAIT_TYPES)[number]</code> | Runtime Wait Type 的公共类型别名。 |

## `NormalizedRuntimeError` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causeRef` | 属性 | <code>causeRef: string</code> | cause Ref 字段。 |
| `code` | 属性 | <code>code: "RUNTIME_INVALID_INPUT" &#124; "RUNTIME_MESSAGE_BUS_UNAVAILABLE" &#124; "RUNTIME_MESSAGE_SCHEMA_INVALID" &#124; "RUNTIME_MESSAGE_DEAD_LETTERED" &#124; "RUNTIME_SESSION_QUEUE_CONFLICT" &#124; "RUNTIME_SESSION_QUEUE_OVERFLOW" &#124; "RUNTIME_FENCING_REJECTED" &#124; "RUNTIME_RESOURCE_CONFLICT" &#124; "RUNTIME_IDEMPOTENCY_CONFLICT" &#124; "RUNTIME_EVENT_STREAM_CORRUPT" &#124; "RUNTIME_RECOVERY_REQUIRES_REVIEW" &#124; "RUNTIME_RUN_NOT_FOUND" &#124; "RUNTIME_RUN_CONFLICT"...</code> | code 字段。 |
| `details` | 属性 | <code>details: Record&lt;string, unknown&gt;</code> | details 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `transitionId` | 属性 | <code>transitionId: string</code> | transition Id 字段。 |

## `RunSignalRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `payload` | 属性 | <code>payload: unknown</code> | payload 字段。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | principal 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sentAt` | 属性 | <code>sentAt: string</code> | sent At 字段。 |
| `signalId` | 属性 | <code>signalId: string</code> | signal Id 字段。 |

## `RuntimePrincipal` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `permissionScopes` | 属性 | <code>permissionScopes: string[]</code> | permission Scopes 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `roles` | 属性 | <code>roles: string[]</code> | roles 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `type` | 属性 | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | type 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `RuntimeRun` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelReason` | 属性 | <code>cancelReason: string</code> | cancel Reason 字段。 |
| `cancelRequestedAt` | 属性 | <code>cancelRequestedAt: string</code> | cancel Requested At 字段。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `currentState` | 属性 | <code>currentState: string</code> | current State 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `error` | 属性 | <code>error: NormalizedRuntimeError</code> | error 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `input` | 属性 | <code>input: unknown</code> | input 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `output` | 属性 | <code>output: unknown</code> | output 字段。 |
| `outputHash` | 属性 | <code>outputHash: string</code> | output Hash 字段。 |
| `processHash` | 属性 | <code>processHash: string</code> | process Hash 字段。 |
| `processSpecRef` | 属性 | <code>processSpecRef: string</code> | process Spec Ref 字段。 |
| `queuedAt` | 属性 | <code>queuedAt: string</code> | queued At 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `rootAgentRef` | 属性 | <code>rootAgentRef: SpecRef</code> | root Agent Ref 字段。 |
| `runtimeProfileRef` | 属性 | <code>runtimeProfileRef: SpecRef</code> | runtime Profile Ref 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "queued" &#124; "starting" &#124; "running" &#124; "cancelling" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "created" &#124; "acquiring" &#124; "waiting" &#124; "waiting_human" &#124; "waiting_signal" &#124; "waiting_timer" &#124; "pausing" &#124; "paused" &#124; "retry_scheduled" &#124; "recovering"</code> | status 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `terminalState` | 属性 | <code>terminalState: string</code> | terminal State 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workflowRef` | 属性 | <code>workflowRef: SpecRef</code> | workflow Ref 字段。 |
| `workflowRevision` | 属性 | <code>workflowRevision: string</code> | workflow Revision 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `RuntimeScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `RuntimeSession` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `closedAt` | 属性 | <code>closedAt: string</code> | closed At 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `sessionProfileRef` | 属性 | <code>sessionProfileRef: SpecRef</code> | session Profile Ref 字段。 |
| `status` | 属性 | <code>status: "archived" &#124; "active" &#124; "closed"</code> | status 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `title` | 属性 | <code>title: string</code> | title 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `RuntimeWaitRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `expectedSchemaHash` | 属性 | <code>expectedSchemaHash: string</code> | expected Schema Hash 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `resolvedAt` | 属性 | <code>resolvedAt: string</code> | resolved At 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `signalRef` | 属性 | <code>signalRef: string</code> | signal Ref 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `status` | 属性 | <code>status: "cancelled" &#124; "expired" &#124; "waiting" &#124; "received"</code> | status 字段。 |
| `type` | 属性 | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "external_operation"</code> | type 字段。 |

## `RuntimeWaitRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedSchema` | 属性 | <code>expectedSchema: JsonSchema</code> | expected schema 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef: string</code> | pending Action Ref 字段。 |
| `timeoutTransitionId` | 属性 | <code>timeoutTransitionId: string</code> | timeout Transition Id 字段。 |
| `type` | 属性 | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "external_operation"</code> | type 字段。 |
