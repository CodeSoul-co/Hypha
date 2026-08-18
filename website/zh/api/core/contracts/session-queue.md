# `@codesoul-co/hypha-core` / `contracts/session-queue`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/session-queue.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)
- 导出数: **27**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS` | 常量 | <code>const DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS: 5</code> | 由 `contracts/session-queue` 模块导出的 DEFAULT SESSION COMMAND MAX ATTEMPTS 常量。 |
| `SESSION_COMMAND_MAX_ATTEMPTS_LIMIT` | 常量 | <code>const SESSION_COMMAND_MAX_ATTEMPTS_LIMIT: 100</code> | 由 `contracts/session-queue` 模块导出的 SESSION COMMAND MAX ATTEMPTS LIMIT 常量。 |
| `SESSION_COMMAND_RUN_CANCELLED_CODE` | 常量 | <code>const SESSION_COMMAND_RUN_CANCELLED_CODE: "RUNTIME_RUN_CANCELLED"</code> | 由 `contracts/session-queue` 模块导出的 SESSION COMMAND RUN CANCELLED CODE 常量。 |
| `SESSION_COMMAND_STATUSES` | 常量 | <code>const SESSION_COMMAND_STATUSES: readonly ["queued", "claimed", "applied", "reused", "rejected", "expired", "failed", "dead_letter", "dead_letter_resolved"]</code> | 由 `contracts/session-queue` 模块导出的 SESSION COMMAND STATUSES 常量。 |
| `SESSION_COMMAND_TYPES` | 常量 | <code>const SESSION_COMMAND_TYPES: readonly ["start_run", "user_input", "resume", "signal", "cancel", "transition", "continue_react", "close_session"]</code> | 由 `contracts/session-queue` 模块导出的 SESSION COMMAND TYPES 常量。 |
| `CancelSessionCommandsRequest` | 接口 | <code>interface CancelSessionCommandsRequest</code> | Cancel Session Commands Request 的字段契约；完整字段见下表。 |
| `CancelSessionCommandsResult` | 接口 | <code>interface CancelSessionCommandsResult</code> | Cancel Session Commands Result 的字段契约；完整字段见下表。 |
| `ClaimSessionCommandRequest` | 接口 | <code>interface ClaimSessionCommandRequest</code> | Claim Session Command Request 的字段契约；完整字段见下表。 |
| `CloseDeadLetterSessionCommandRequest` | 接口 | <code>interface CloseDeadLetterSessionCommandRequest</code> | Close Dead Letter Session Command Request 的字段契约；完整字段见下表。 |
| `CompleteSessionCommandRequest` | 接口 | <code>interface CompleteSessionCommandRequest</code> | Complete Session Command Request 的字段契约；完整字段见下表。 |
| `EnqueueSessionCommandRequest` | 接口 | <code>interface EnqueueSessionCommandRequest</code> | Enqueue Session Command Request 的字段契约；完整字段见下表。 |
| `FailSessionCommandRequest` | 接口 | <code>interface FailSessionCommandRequest</code> | Fail Session Command Request 的字段契约；完整字段见下表。 |
| `ListSessionCommandsRequest` | 接口 | <code>interface ListSessionCommandsRequest</code> | List Session Commands Request 的字段契约；完整字段见下表。 |
| `ListStuckSessionCommandsRequest` | 接口 | <code>interface ListStuckSessionCommandsRequest</code> | List Stuck Session Commands Request 的字段契约；完整字段见下表。 |
| `RedriveDeadLetterSessionCommandRequest` | 接口 | <code>interface RedriveDeadLetterSessionCommandRequest</code> | Redrive Dead Letter Session Command Request 的字段契约；完整字段见下表。 |
| `ReleaseSessionCommandRequest` | 接口 | <code>interface ReleaseSessionCommandRequest</code> | Release Session Command Request 的字段契约；完整字段见下表。 |
| `RenewSessionCommandRequest` | 接口 | <code>interface RenewSessionCommandRequest</code> | Renew Session Command Request 的字段契约；完整字段见下表。 |
| `SessionCommandClaim` | 接口 | <code>interface SessionCommandClaim</code> | Session Command Claim 的字段契约；完整字段见下表。 |
| `SessionCommandDeadLetterResolution` | 接口 | <code>interface SessionCommandDeadLetterResolution</code> | Session Command Dead Letter Resolution 的字段契约；完整字段见下表。 |
| `SessionCommandLeaseRecovery` | 接口 | <code>interface SessionCommandLeaseRecovery</code> | Session Command Lease Recovery 的字段契约；完整字段见下表。 |
| `SessionCommandRecord` | 接口 | <code>interface SessionCommandRecord</code> | Session Command Record 的字段契约；完整字段见下表。 |
| `SessionCommandRedrive` | 接口 | <code>interface SessionCommandRedrive</code> | Session Command Redrive 的字段契约；完整字段见下表。 |
| `SessionQueueHealthSnapshot` | 接口 | <code>interface SessionQueueHealthSnapshot extends Record&lt;string, unknown&gt;</code> | Session Queue Health Snapshot 的字段契约；完整字段见下表。 |
| `SessionQueueScope` | 接口 | <code>interface SessionQueueScope</code> | Session Queue Scope 的字段契约；完整字段见下表。 |
| `StuckSessionCommand` | 接口 | <code>interface StuckSessionCommand</code> | Stuck Session Command 的字段契约；完整字段见下表。 |
| `SessionCommandStatus` | 类型 | <code>type SessionCommandStatus = (typeof SESSION_COMMAND_STATUSES)[number]</code> | Session Command Status 的公共类型别名。 |
| `SessionCommandType` | 类型 | <code>type SessionCommandType = (typeof SESSION_COMMAND_TYPES)[number]</code> | Session Command Type 的公共类型别名。 |

## `CancelSessionCommandsRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancellationCommandId` | 属性 | <code>cancellationCommandId: string</code> | cancellation Command Id 字段。 |
| `cancelledAt` | 属性 | <code>cancelledAt: string</code> | cancelled At 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `scope` | 属性 | <code>scope: SessionQueueScope</code> | scope 字段。 |
| `targetRunId` | 属性 | <code>targetRunId: string</code> | target Run Id 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |

## `CancelSessionCommandsResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `alreadyCancelledCommandIds` | 属性 | <code>alreadyCancelledCommandIds: string[]</code> | already Cancelled Command Ids 字段。 |
| `alreadyTerminalCommandIds` | 属性 | <code>alreadyTerminalCommandIds: string[]</code> | already Terminal Command Ids 字段。 |
| `cancelledCommandIds` | 属性 | <code>cancelledCommandIds: string[]</code> | cancelled Command Ids 字段。 |
| `targetRunId` | 属性 | <code>targetRunId: string</code> | target Run Id 字段。 |

## `ClaimSessionCommandRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `leaseMs` | 属性 | <code>leaseMs: number</code> | lease Ms 字段。 |
| `now` | 属性 | <code>now: string</code> | now 字段。 |
| `scope` | 属性 | <code>scope: SessionQueueScope</code> | scope 字段。 |
| `workerId` | 属性 | <code>workerId: string</code> | worker Id 字段。 |

## `CloseDeadLetterSessionCommandRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `closedAt` | 属性 | <code>closedAt: string</code> | closed At 字段。 |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `operatorId` | 属性 | <code>operatorId: string</code> | operator Id 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `scope` | 属性 | <code>scope: SessionQueueScope</code> | scope 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |

## `CompleteSessionCommandRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimToken` | 属性 | <code>claimToken: string</code> | claim Token 字段。 |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | lease Epoch 字段。 |
| `resultEventIds` | 属性 | <code>resultEventIds: string[]</code> | result Event Ids 字段。 |
| `resultRunId` | 属性 | <code>resultRunId: string</code> | result Run Id 字段。 |
| `workerId` | 属性 | <code>workerId: string</code> | worker Id 字段。 |

## `EnqueueSessionCommandRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `availableAt` | 属性 | <code>availableAt: string</code> | available At 字段。 |
| `commandType` | 属性 | <code>commandType: "user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session"</code> | command Type 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | payload Hash 字段。 |
| `payloadRef` | 属性 | <code>payloadRef: string</code> | payload Ref 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `targetRunId` | 属性 | <code>targetRunId: string</code> | target Run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `FailSessionCommandRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimToken` | 属性 | <code>claimToken: string</code> | claim Token 字段。 |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `deadLetter` | 属性 | <code>deadLetter: boolean</code> | dead Letter 字段。 |
| `failedAt` | 属性 | <code>failedAt: string</code> | failed At 字段。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | lease Epoch 字段。 |
| `rejectionCode` | 属性 | <code>rejectionCode: string</code> | rejection Code 字段。 |
| `workerId` | 属性 | <code>workerId: string</code> | worker Id 字段。 |

## `ListSessionCommandsRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fromSequence` | 属性 | <code>fromSequence: number</code> | from Sequence 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `scope` | 属性 | <code>scope: SessionQueueScope</code> | scope 字段。 |
| `statuses` | 属性 | <code>statuses: ("rejected" &#124; "queued" &#124; "failed" &#124; "expired" &#124; "applied" &#124; "dead_letter" &#124; "claimed" &#124; "reused" &#124; "dead_letter_resolved")[]</code> | statuses 字段。 |

## `ListStuckSessionCommandsRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `graceMs` | 属性 | <code>graceMs: number</code> | grace Ms 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `scope` | 属性 | <code>scope: SessionQueueScope</code> | scope 字段。 |

## `RedriveDeadLetterSessionCommandRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `availableAt` | 属性 | <code>availableAt: string</code> | available At 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `operatorId` | 属性 | <code>operatorId: string</code> | operator Id 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `scope` | 属性 | <code>scope: SessionQueueScope</code> | scope 字段。 |
| `sourceCommandId` | 属性 | <code>sourceCommandId: string</code> | source Command Id 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |

## `ReleaseSessionCommandRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `availableAt` | 属性 | <code>availableAt: string</code> | available At 字段。 |
| `claimToken` | 属性 | <code>claimToken: string</code> | claim Token 字段。 |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | lease Epoch 字段。 |
| `releasedAt` | 属性 | <code>releasedAt: string</code> | released At 字段。 |
| `workerId` | 属性 | <code>workerId: string</code> | worker Id 字段。 |

## `RenewSessionCommandRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimToken` | 属性 | <code>claimToken: string</code> | claim Token 字段。 |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | lease Epoch 字段。 |
| `leaseMs` | 属性 | <code>leaseMs: number</code> | lease Ms 字段。 |
| `renewedAt` | 属性 | <code>renewedAt: string</code> | renewed At 字段。 |
| `workerId` | 属性 | <code>workerId: string</code> | worker Id 字段。 |

## `SessionCommandClaim` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimToken` | 属性 | <code>claimToken: string</code> | claim Token 字段。 |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | lease Epoch 字段。 |
| `leaseExpiresAt` | 属性 | <code>leaseExpiresAt: string</code> | lease Expires At 字段。 |
| `workerId` | 属性 | <code>workerId: string</code> | worker Id 字段。 |

## `SessionCommandDeadLetterResolution` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `disposition` | 属性 | <code>disposition: "closed" &#124; "redriven"</code> | disposition 字段。 |
| `operatorId` | 属性 | <code>operatorId: string</code> | operator Id 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `redriveCommandId` | 属性 | <code>redriveCommandId: string</code> | redrive Command Id 字段。 |
| `resolvedAt` | 属性 | <code>resolvedAt: string</code> | resolved At 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |

## `SessionCommandLeaseRecovery` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `disposition` | 属性 | <code>disposition: "requeued" &#124; "dead_lettered"</code> | disposition 字段。 |
| `leaseExpiredAt` | 属性 | <code>leaseExpiredAt: string</code> | lease Expired At 字段。 |
| `previousLeaseEpoch` | 属性 | <code>previousLeaseEpoch: number</code> | previous Lease Epoch 字段。 |
| `previousWorkerId` | 属性 | <code>previousWorkerId: string</code> | previous Worker Id 字段。 |
| `recoveredAt` | 属性 | <code>recoveredAt: string</code> | recovered At 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |

## `SessionCommandRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | attempts 字段。 |
| `availableAt` | 属性 | <code>availableAt: string</code> | available At 字段。 |
| `claimedBy` | 属性 | <code>claimedBy: string</code> | claimed By 字段。 |
| `claimToken` | 属性 | <code>claimToken: string</code> | claim Token 字段。 |
| `commandType` | 属性 | <code>commandType: "user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session"</code> | command Type 字段。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `deadLetterResolution` | 属性 | <code>deadLetterResolution: SessionCommandDeadLetterResolution</code> | dead Letter Resolution 字段。 |
| `enqueueSequence` | 属性 | <code>enqueueSequence: number</code> | enqueue Sequence 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | lease Epoch 字段。 |
| `leaseExpiresAt` | 属性 | <code>leaseExpiresAt: string</code> | lease Expires At 字段。 |
| `leaseRecoveries` | 属性 | <code>leaseRecoveries: SessionCommandLeaseRecovery[]</code> | lease Recoveries 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | payload Hash 字段。 |
| `payloadRef` | 属性 | <code>payloadRef: string</code> | payload Ref 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `redrive` | 属性 | <code>redrive: SessionCommandRedrive</code> | redrive 字段。 |
| `rejectionCode` | 属性 | <code>rejectionCode: string</code> | rejection Code 字段。 |
| `resultEventIds` | 属性 | <code>resultEventIds: string[]</code> | result Event Ids 字段。 |
| `resultRunId` | 属性 | <code>resultRunId: string</code> | result Run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `status` | 属性 | <code>status: "rejected" &#124; "queued" &#124; "failed" &#124; "expired" &#124; "applied" &#124; "dead_letter" &#124; "claimed" &#124; "reused" &#124; "dead_letter_resolved"</code> | status 字段。 |
| `targetRunId` | 属性 | <code>targetRunId: string</code> | target Run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `SessionCommandRedrive` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `operatorId` | 属性 | <code>operatorId: string</code> | operator Id 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `sourceCommandId` | 属性 | <code>sourceCommandId: string</code> | source Command Id 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |

## `SessionQueueHealthSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimedCommands` | 属性 | <code>claimedCommands: number</code> | claimed Commands 字段。 |
| `deadLetterCommands` | 属性 | <code>deadLetterCommands: number</code> | dead Letter Commands 字段。 |
| `leaseRecoveryCount` | 属性 | <code>leaseRecoveryCount: number</code> | lease Recovery Count 字段。 |
| `oldestPendingAgeMs` | 属性 | <code>oldestPendingAgeMs: number</code> | oldest Pending Age Ms 字段。 |
| `pendingCommands` | 属性 | <code>pendingCommands: number</code> | pending Commands 字段。 |
| `queuedCommands` | 属性 | <code>queuedCommands: number</code> | queued Commands 字段。 |
| `recoveredExpiredLeases` | 属性 | <code>recoveredExpiredLeases: number</code> | recovered Expired Leases 字段。 |
| `redeliveredCommands` | 属性 | <code>redeliveredCommands: number</code> | redelivered Commands 字段。 |
| `resolvedDeadLetterCommands` | 属性 | <code>resolvedDeadLetterCommands: number</code> | resolved Dead Letter Commands 字段。 |
| `retryingCommands` | 属性 | <code>retryingCommands: number</code> | retrying Commands 字段。 |
| `totalCommands` | 属性 | <code>totalCommands: number</code> | total Commands 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |

## `SessionQueueScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `StuckSessionCommand` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `command` | 属性 | <code>command: SessionCommandRecord</code> | command 字段。 |
| `detectedAt` | 属性 | <code>detectedAt: string</code> | detected At 字段。 |
| `overdueMs` | 属性 | <code>overdueMs: number</code> | overdue Ms 字段。 |
