# `@codesoul-co/hypha-core` / `contracts/session-queue`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/session-queue.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)
- Exports: **27**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS` | constant | <code>const DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS: 5</code> | DEFAULT SESSION COMMAND MAX ATTEMPTS constant exported by the `contracts/session-queue` module. |
| `SESSION_COMMAND_MAX_ATTEMPTS_LIMIT` | constant | <code>const SESSION_COMMAND_MAX_ATTEMPTS_LIMIT: 100</code> | SESSION COMMAND MAX ATTEMPTS LIMIT constant exported by the `contracts/session-queue` module. |
| `SESSION_COMMAND_RUN_CANCELLED_CODE` | constant | <code>const SESSION_COMMAND_RUN_CANCELLED_CODE: "RUNTIME_RUN_CANCELLED"</code> | SESSION COMMAND RUN CANCELLED CODE constant exported by the `contracts/session-queue` module. |
| `SESSION_COMMAND_STATUSES` | constant | <code>const SESSION_COMMAND_STATUSES: readonly ["queued", "claimed", "applied", "reused", "rejected", "expired", "failed", "dead_letter", "dead_letter_resolved"]</code> | SESSION COMMAND STATUSES constant exported by the `contracts/session-queue` module. |
| `SESSION_COMMAND_TYPES` | constant | <code>const SESSION_COMMAND_TYPES: readonly ["start_run", "user_input", "resume", "signal", "cancel", "transition", "continue_react", "close_session"]</code> | SESSION COMMAND TYPES constant exported by the `contracts/session-queue` module. |
| `CancelSessionCommandsRequest` | interface | <code>interface CancelSessionCommandsRequest</code> | Field contract for Cancel Session Commands Request; see all contract members below. |
| `CancelSessionCommandsResult` | interface | <code>interface CancelSessionCommandsResult</code> | Field contract for Cancel Session Commands Result; see all contract members below. |
| `ClaimSessionCommandRequest` | interface | <code>interface ClaimSessionCommandRequest</code> | Field contract for Claim Session Command Request; see all contract members below. |
| `CloseDeadLetterSessionCommandRequest` | interface | <code>interface CloseDeadLetterSessionCommandRequest</code> | Field contract for Close Dead Letter Session Command Request; see all contract members below. |
| `CompleteSessionCommandRequest` | interface | <code>interface CompleteSessionCommandRequest</code> | Field contract for Complete Session Command Request; see all contract members below. |
| `EnqueueSessionCommandRequest` | interface | <code>interface EnqueueSessionCommandRequest</code> | Field contract for Enqueue Session Command Request; see all contract members below. |
| `FailSessionCommandRequest` | interface | <code>interface FailSessionCommandRequest</code> | Field contract for Fail Session Command Request; see all contract members below. |
| `ListSessionCommandsRequest` | interface | <code>interface ListSessionCommandsRequest</code> | Field contract for List Session Commands Request; see all contract members below. |
| `ListStuckSessionCommandsRequest` | interface | <code>interface ListStuckSessionCommandsRequest</code> | Field contract for List Stuck Session Commands Request; see all contract members below. |
| `RedriveDeadLetterSessionCommandRequest` | interface | <code>interface RedriveDeadLetterSessionCommandRequest</code> | Field contract for Redrive Dead Letter Session Command Request; see all contract members below. |
| `ReleaseSessionCommandRequest` | interface | <code>interface ReleaseSessionCommandRequest</code> | Field contract for Release Session Command Request; see all contract members below. |
| `RenewSessionCommandRequest` | interface | <code>interface RenewSessionCommandRequest</code> | Field contract for Renew Session Command Request; see all contract members below. |
| `SessionCommandClaim` | interface | <code>interface SessionCommandClaim</code> | Field contract for Session Command Claim; see all contract members below. |
| `SessionCommandDeadLetterResolution` | interface | <code>interface SessionCommandDeadLetterResolution</code> | Field contract for Session Command Dead Letter Resolution; see all contract members below. |
| `SessionCommandLeaseRecovery` | interface | <code>interface SessionCommandLeaseRecovery</code> | Field contract for Session Command Lease Recovery; see all contract members below. |
| `SessionCommandRecord` | interface | <code>interface SessionCommandRecord</code> | Field contract for Session Command Record; see all contract members below. |
| `SessionCommandRedrive` | interface | <code>interface SessionCommandRedrive</code> | Field contract for Session Command Redrive; see all contract members below. |
| `SessionQueueHealthSnapshot` | interface | <code>interface SessionQueueHealthSnapshot extends Record&lt;string, unknown&gt;</code> | Field contract for Session Queue Health Snapshot; see all contract members below. |
| `SessionQueueScope` | interface | <code>interface SessionQueueScope</code> | Field contract for Session Queue Scope; see all contract members below. |
| `StuckSessionCommand` | interface | <code>interface StuckSessionCommand</code> | Field contract for Stuck Session Command; see all contract members below. |
| `SessionCommandStatus` | type | <code>type SessionCommandStatus = (typeof SESSION_COMMAND_STATUSES)[number]</code> | Public type alias for Session Command Status. |
| `SessionCommandType` | type | <code>type SessionCommandType = (typeof SESSION_COMMAND_TYPES)[number]</code> | Public type alias for Session Command Type. |

## `CancelSessionCommandsRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancellationCommandId` | property | <code>cancellationCommandId: string</code> | Public cancellation Command Id property. |
| `cancelledAt` | property | <code>cancelledAt: string</code> | Public cancelled At property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `scope` | property | <code>scope: SessionQueueScope</code> | Public scope property. |
| `targetRunId` | property | <code>targetRunId: string</code> | Public target Run Id property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |

## `CancelSessionCommandsResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `alreadyCancelledCommandIds` | property | <code>alreadyCancelledCommandIds: string[]</code> | Public already Cancelled Command Ids property. |
| `alreadyTerminalCommandIds` | property | <code>alreadyTerminalCommandIds: string[]</code> | Public already Terminal Command Ids property. |
| `cancelledCommandIds` | property | <code>cancelledCommandIds: string[]</code> | Public cancelled Command Ids property. |
| `targetRunId` | property | <code>targetRunId: string</code> | Public target Run Id property. |

## `ClaimSessionCommandRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `leaseMs` | property | <code>leaseMs: number</code> | Public lease Ms property. |
| `now` | property | <code>now: string</code> | Public now property. |
| `scope` | property | <code>scope: SessionQueueScope</code> | Public scope property. |
| `workerId` | property | <code>workerId: string</code> | Public worker Id property. |

## `CloseDeadLetterSessionCommandRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `closedAt` | property | <code>closedAt: string</code> | Public closed At property. |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `operatorId` | property | <code>operatorId: string</code> | Public operator Id property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `scope` | property | <code>scope: SessionQueueScope</code> | Public scope property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |

## `CompleteSessionCommandRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimToken` | property | <code>claimToken: string</code> | Public claim Token property. |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public lease Epoch property. |
| `resultEventIds` | property | <code>resultEventIds: string[]</code> | Public result Event Ids property. |
| `resultRunId` | property | <code>resultRunId: string</code> | Public result Run Id property. |
| `workerId` | property | <code>workerId: string</code> | Public worker Id property. |

## `EnqueueSessionCommandRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `availableAt` | property | <code>availableAt: string</code> | Public available At property. |
| `commandType` | property | <code>commandType: "user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session"</code> | Public command Type property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public payload Hash property. |
| `payloadRef` | property | <code>payloadRef: string</code> | Public payload Ref property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `targetRunId` | property | <code>targetRunId: string</code> | Public target Run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `FailSessionCommandRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimToken` | property | <code>claimToken: string</code> | Public claim Token property. |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `deadLetter` | property | <code>deadLetter: boolean</code> | Public dead Letter property. |
| `failedAt` | property | <code>failedAt: string</code> | Public failed At property. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public lease Epoch property. |
| `rejectionCode` | property | <code>rejectionCode: string</code> | Public rejection Code property. |
| `workerId` | property | <code>workerId: string</code> | Public worker Id property. |

## `ListSessionCommandsRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fromSequence` | property | <code>fromSequence: number</code> | Public from Sequence property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `scope` | property | <code>scope: SessionQueueScope</code> | Public scope property. |
| `statuses` | property | <code>statuses: ("rejected" &#124; "queued" &#124; "failed" &#124; "expired" &#124; "applied" &#124; "dead_letter" &#124; "claimed" &#124; "reused" &#124; "dead_letter_resolved")[]</code> | Public statuses property. |

## `ListStuckSessionCommandsRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `graceMs` | property | <code>graceMs: number</code> | Public grace Ms property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `scope` | property | <code>scope: SessionQueueScope</code> | Public scope property. |

## `RedriveDeadLetterSessionCommandRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `availableAt` | property | <code>availableAt: string</code> | Public available At property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `operatorId` | property | <code>operatorId: string</code> | Public operator Id property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `scope` | property | <code>scope: SessionQueueScope</code> | Public scope property. |
| `sourceCommandId` | property | <code>sourceCommandId: string</code> | Public source Command Id property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |

## `ReleaseSessionCommandRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `availableAt` | property | <code>availableAt: string</code> | Public available At property. |
| `claimToken` | property | <code>claimToken: string</code> | Public claim Token property. |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public lease Epoch property. |
| `releasedAt` | property | <code>releasedAt: string</code> | Public released At property. |
| `workerId` | property | <code>workerId: string</code> | Public worker Id property. |

## `RenewSessionCommandRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimToken` | property | <code>claimToken: string</code> | Public claim Token property. |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public lease Epoch property. |
| `leaseMs` | property | <code>leaseMs: number</code> | Public lease Ms property. |
| `renewedAt` | property | <code>renewedAt: string</code> | Public renewed At property. |
| `workerId` | property | <code>workerId: string</code> | Public worker Id property. |

## `SessionCommandClaim` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimToken` | property | <code>claimToken: string</code> | Public claim Token property. |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public lease Epoch property. |
| `leaseExpiresAt` | property | <code>leaseExpiresAt: string</code> | Public lease Expires At property. |
| `workerId` | property | <code>workerId: string</code> | Public worker Id property. |

## `SessionCommandDeadLetterResolution` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `disposition` | property | <code>disposition: "closed" &#124; "redriven"</code> | Public disposition property. |
| `operatorId` | property | <code>operatorId: string</code> | Public operator Id property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `redriveCommandId` | property | <code>redriveCommandId: string</code> | Public redrive Command Id property. |
| `resolvedAt` | property | <code>resolvedAt: string</code> | Public resolved At property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |

## `SessionCommandLeaseRecovery` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `disposition` | property | <code>disposition: "requeued" &#124; "dead_lettered"</code> | Public disposition property. |
| `leaseExpiredAt` | property | <code>leaseExpiredAt: string</code> | Public lease Expired At property. |
| `previousLeaseEpoch` | property | <code>previousLeaseEpoch: number</code> | Public previous Lease Epoch property. |
| `previousWorkerId` | property | <code>previousWorkerId: string</code> | Public previous Worker Id property. |
| `recoveredAt` | property | <code>recoveredAt: string</code> | Public recovered At property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |

## `SessionCommandRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public attempts property. |
| `availableAt` | property | <code>availableAt: string</code> | Public available At property. |
| `claimedBy` | property | <code>claimedBy: string</code> | Public claimed By property. |
| `claimToken` | property | <code>claimToken: string</code> | Public claim Token property. |
| `commandType` | property | <code>commandType: "user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session"</code> | Public command Type property. |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `deadLetterResolution` | property | <code>deadLetterResolution: SessionCommandDeadLetterResolution</code> | Public dead Letter Resolution property. |
| `enqueueSequence` | property | <code>enqueueSequence: number</code> | Public enqueue Sequence property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public lease Epoch property. |
| `leaseExpiresAt` | property | <code>leaseExpiresAt: string</code> | Public lease Expires At property. |
| `leaseRecoveries` | property | <code>leaseRecoveries: SessionCommandLeaseRecovery[]</code> | Public lease Recoveries property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public payload Hash property. |
| `payloadRef` | property | <code>payloadRef: string</code> | Public payload Ref property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `redrive` | property | <code>redrive: SessionCommandRedrive</code> | Public redrive property. |
| `rejectionCode` | property | <code>rejectionCode: string</code> | Public rejection Code property. |
| `resultEventIds` | property | <code>resultEventIds: string[]</code> | Public result Event Ids property. |
| `resultRunId` | property | <code>resultRunId: string</code> | Public result Run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `status` | property | <code>status: "rejected" &#124; "queued" &#124; "failed" &#124; "expired" &#124; "applied" &#124; "dead_letter" &#124; "claimed" &#124; "reused" &#124; "dead_letter_resolved"</code> | Public status property. |
| `targetRunId` | property | <code>targetRunId: string</code> | Public target Run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `SessionCommandRedrive` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `operatorId` | property | <code>operatorId: string</code> | Public operator Id property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `sourceCommandId` | property | <code>sourceCommandId: string</code> | Public source Command Id property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |

## `SessionQueueHealthSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimedCommands` | property | <code>claimedCommands: number</code> | Public claimed Commands property. |
| `deadLetterCommands` | property | <code>deadLetterCommands: number</code> | Public dead Letter Commands property. |
| `leaseRecoveryCount` | property | <code>leaseRecoveryCount: number</code> | Public lease Recovery Count property. |
| `oldestPendingAgeMs` | property | <code>oldestPendingAgeMs: number</code> | Public oldest Pending Age Ms property. |
| `pendingCommands` | property | <code>pendingCommands: number</code> | Public pending Commands property. |
| `queuedCommands` | property | <code>queuedCommands: number</code> | Public queued Commands property. |
| `recoveredExpiredLeases` | property | <code>recoveredExpiredLeases: number</code> | Public recovered Expired Leases property. |
| `redeliveredCommands` | property | <code>redeliveredCommands: number</code> | Public redelivered Commands property. |
| `resolvedDeadLetterCommands` | property | <code>resolvedDeadLetterCommands: number</code> | Public resolved Dead Letter Commands property. |
| `retryingCommands` | property | <code>retryingCommands: number</code> | Public retrying Commands property. |
| `totalCommands` | property | <code>totalCommands: number</code> | Public total Commands property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |

## `SessionQueueScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `StuckSessionCommand` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `command` | property | <code>command: SessionCommandRecord</code> | Public command property. |
| `detectedAt` | property | <code>detectedAt: string</code> | Public detected At property. |
| `overdueMs` | property | <code>overdueMs: number</code> | Public overdue Ms property. |
