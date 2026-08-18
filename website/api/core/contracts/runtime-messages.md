# `@codesoul-co/hypha-core` / `contracts/runtime-messages`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-messages.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)
- Exports: **10**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_INBOX_STATUSES` | constant | <code>const RUNTIME_INBOX_STATUSES: readonly ["processing", "applied", "ignored", "failed"]</code> | RUNTIME INBOX STATUSES constant exported by the `contracts/runtime-messages` module. |
| `RUNTIME_MESSAGE_TYPES` | constant | <code>const RUNTIME_MESSAGE_TYPES: readonly ["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtime.recovery.requested", "runtime.custom"]</code> | RUNTIME MESSAGE TYPES constant exported by the `contracts/runtime-messages` module. |
| `RUNTIME_OUTBOX_STATES` | constant | <code>const RUNTIME_OUTBOX_STATES: readonly ["pending", "publishing", "published", "failed", "dead_letter"]</code> | RUNTIME OUTBOX STATES constant exported by the `contracts/runtime-messages` module. |
| `RuntimeMessageEnvelope` | interface | <code>interface RuntimeMessageEnvelope</code> | Field contract for Runtime Message Envelope; see all contract members below. |
| `RuntimeMessageEnvelopeInput` | interface | <code>interface RuntimeMessageEnvelopeInput extends Omit&lt;RuntimeMessageEnvelope&lt;TPayload&gt;, 'payloadHash' &#124; 'sequence'&gt;</code> | Field contract for Runtime Message Envelope Input; see all contract members below. |
| `RuntimeMessageInboxRecord` | interface | <code>interface RuntimeMessageInboxRecord</code> | Field contract for Runtime Message Inbox Record; see all contract members below. |
| `RuntimeMessageOutboxRecord` | interface | <code>interface RuntimeMessageOutboxRecord</code> | Field contract for Runtime Message Outbox Record; see all contract members below. |
| `RuntimeMessageInboxStatus` | type | <code>type RuntimeMessageInboxStatus = (typeof RUNTIME_INBOX_STATUSES)[number]</code> | Public type alias for Runtime Message Inbox Status. |
| `RuntimeMessageOutboxState` | type | <code>type RuntimeMessageOutboxState = (typeof RUNTIME_OUTBOX_STATES)[number]</code> | Public type alias for Runtime Message Outbox State. |
| `RuntimeMessageType` | type | <code>type RuntimeMessageType = (typeof RUNTIME_MESSAGE_TYPES)[number]</code> | Public type alias for Runtime Message Type. |

## `RuntimeMessageEnvelope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public activity Id property. |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `availableAt` | property | <code>availableAt: string</code> | Public available At property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `messageId` | property | <code>messageId: string</code> | Public message Id property. |
| `messageType` | property | <code>messageType: "runtime.activity.requested" &#124; "runtime.activity.completed" &#124; "runtime.activity.failed" &#124; "runtime.command.start" &#124; "runtime.command.resume" &#124; "runtime.command.cancel" &#124; "runtime.signal" &#124; "runtime.timer.fire" &#124; "runtime.agent.message" &#124; "runtime.child.completed" &#124; "runtime.projection.rebuild" &#124; "runtime.recovery.requested" &#124; "runtime.custom"</code> | Public message Type property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `orderingKey` | property | <code>orderingKey: string</code> | Public ordering Key property. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public partition Key property. |
| `payload` | property | <code>payload: TPayload</code> | Public payload property. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public payload Hash property. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public principal property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `producerId` | property | <code>producerId: string</code> | Public producer Id property. |
| `producerRevision` | property | <code>producerRevision: string</code> | Public producer Revision property. |
| `publishedAt` | property | <code>publishedAt: string</code> | Public published At property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `schemaVersion` | property | <code>schemaVersion: string</code> | Public schema Version property. |
| `sequence` | property | <code>sequence: number</code> | Public sequence property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `topic` | property | <code>topic: string</code> | Public topic property. |
| `traceId` | property | <code>traceId: string</code> | Public trace Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `RuntimeMessageEnvelopeInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public activity Id property. |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `availableAt` | property | <code>availableAt: string</code> | Public available At property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `messageId` | property | <code>messageId: string</code> | Public message Id property. |
| `messageType` | property | <code>messageType: "runtime.activity.requested" &#124; "runtime.activity.completed" &#124; "runtime.activity.failed" &#124; "runtime.command.start" &#124; "runtime.command.resume" &#124; "runtime.command.cancel" &#124; "runtime.signal" &#124; "runtime.timer.fire" &#124; "runtime.agent.message" &#124; "runtime.child.completed" &#124; "runtime.projection.rebuild" &#124; "runtime.recovery.requested" &#124; "runtime.custom"</code> | Public message Type property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `orderingKey` | property | <code>orderingKey: string</code> | Public ordering Key property. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public partition Key property. |
| `payload` | property | <code>payload: TPayload</code> | Public payload property. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public payload Hash property. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public principal property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `producerId` | property | <code>producerId: string</code> | Public producer Id property. |
| `producerRevision` | property | <code>producerRevision: string</code> | Public producer Revision property. |
| `publishedAt` | property | <code>publishedAt: string</code> | Public published At property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `schemaVersion` | property | <code>schemaVersion: string</code> | Public schema Version property. |
| `sequence` | property | <code>sequence: number</code> | Public sequence property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `topic` | property | <code>topic: string</code> | Public topic property. |
| `traceId` | property | <code>traceId: string</code> | Public trace Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `RuntimeMessageInboxRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `appliedEventIds` | property | <code>appliedEventIds: string[]</code> | Public applied Event Ids property. |
| `attempts` | property | <code>attempts: number</code> | Public attempts property. |
| `consumerId` | property | <code>consumerId: string</code> | Public consumer Id property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `firstReceivedAt` | property | <code>firstReceivedAt: string</code> | Public first Received At property. |
| `lastError` | property | <code>lastError: NormalizedRuntimeError</code> | Public last Error property. |
| `lastReceivedAt` | property | <code>lastReceivedAt: string</code> | Public last Received At property. |
| `messageId` | property | <code>messageId: string</code> | Public message Id property. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public payload Hash property. |
| `processingExpiresAt` | property | <code>processingExpiresAt: string</code> | Public processing Expires At property. |
| `processingOwner` | property | <code>processingOwner: string</code> | Public processing Owner property. |
| `status` | property | <code>status: "failed" &#124; "processing" &#124; "applied" &#124; "ignored"</code> | Public status property. |

## `RuntimeMessageOutboxRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public attempts property. |
| `availableAt` | property | <code>availableAt: string</code> | Public available At property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `envelope` | property | <code>envelope: RuntimeMessageEnvelope&lt;unknown&gt;</code> | Public envelope property. |
| `eventId` | property | <code>eventId: string</code> | Public event Id property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `lastError` | property | <code>lastError: NormalizedRuntimeError</code> | Public last Error property. |
| `leaseExpiresAt` | property | <code>leaseExpiresAt: string</code> | Public lease Expires At property. |
| `leaseOwner` | property | <code>leaseOwner: string</code> | Public lease Owner property. |
| `messageId` | property | <code>messageId: string</code> | Public message Id property. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public partition Key property. |
| `state` | property | <code>state: "failed" &#124; "pending" &#124; "publishing" &#124; "published" &#124; "dead_letter"</code> | Public state property. |
| `topic` | property | <code>topic: string</code> | Public topic property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
