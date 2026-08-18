# `@codesoul-co/hypha-core` / `contracts/runtime-messages`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-messages.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)
- 导出数: **10**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_INBOX_STATUSES` | 常量 | <code>const RUNTIME_INBOX_STATUSES: readonly ["processing", "applied", "ignored", "failed"]</code> | 由 `contracts/runtime-messages` 模块导出的 RUNTIME INBOX STATUSES 常量。 |
| `RUNTIME_MESSAGE_TYPES` | 常量 | <code>const RUNTIME_MESSAGE_TYPES: readonly ["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtime.recovery.requested", "runtime.custom"]</code> | 由 `contracts/runtime-messages` 模块导出的 RUNTIME MESSAGE TYPES 常量。 |
| `RUNTIME_OUTBOX_STATES` | 常量 | <code>const RUNTIME_OUTBOX_STATES: readonly ["pending", "publishing", "published", "failed", "dead_letter"]</code> | 由 `contracts/runtime-messages` 模块导出的 RUNTIME OUTBOX STATES 常量。 |
| `RuntimeMessageEnvelope` | 接口 | <code>interface RuntimeMessageEnvelope</code> | Runtime Message Envelope 的字段契约；完整字段见下表。 |
| `RuntimeMessageEnvelopeInput` | 接口 | <code>interface RuntimeMessageEnvelopeInput extends Omit&lt;RuntimeMessageEnvelope&lt;TPayload&gt;, 'payloadHash' &#124; 'sequence'&gt;</code> | Runtime Message Envelope Input 的字段契约；完整字段见下表。 |
| `RuntimeMessageInboxRecord` | 接口 | <code>interface RuntimeMessageInboxRecord</code> | Runtime Message Inbox Record 的字段契约；完整字段见下表。 |
| `RuntimeMessageOutboxRecord` | 接口 | <code>interface RuntimeMessageOutboxRecord</code> | Runtime Message Outbox Record 的字段契约；完整字段见下表。 |
| `RuntimeMessageInboxStatus` | 类型 | <code>type RuntimeMessageInboxStatus = (typeof RUNTIME_INBOX_STATUSES)[number]</code> | Runtime Message Inbox Status 的公共类型别名。 |
| `RuntimeMessageOutboxState` | 类型 | <code>type RuntimeMessageOutboxState = (typeof RUNTIME_OUTBOX_STATES)[number]</code> | Runtime Message Outbox State 的公共类型别名。 |
| `RuntimeMessageType` | 类型 | <code>type RuntimeMessageType = (typeof RUNTIME_MESSAGE_TYPES)[number]</code> | Runtime Message Type 的公共类型别名。 |

## `RuntimeMessageEnvelope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | activity Id 字段。 |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `availableAt` | 属性 | <code>availableAt: string</code> | available At 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `messageId` | 属性 | <code>messageId: string</code> | message Id 字段。 |
| `messageType` | 属性 | <code>messageType: "runtime.activity.requested" &#124; "runtime.activity.completed" &#124; "runtime.activity.failed" &#124; "runtime.command.start" &#124; "runtime.command.resume" &#124; "runtime.command.cancel" &#124; "runtime.signal" &#124; "runtime.timer.fire" &#124; "runtime.agent.message" &#124; "runtime.child.completed" &#124; "runtime.projection.rebuild" &#124; "runtime.recovery.requested" &#124; "runtime.custom"</code> | message Type 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `orderingKey` | 属性 | <code>orderingKey: string</code> | ordering Key 字段。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | partition Key 字段。 |
| `payload` | 属性 | <code>payload: TPayload</code> | payload 字段。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | payload Hash 字段。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | principal 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `producerId` | 属性 | <code>producerId: string</code> | producer Id 字段。 |
| `producerRevision` | 属性 | <code>producerRevision: string</code> | producer Revision 字段。 |
| `publishedAt` | 属性 | <code>publishedAt: string</code> | published At 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `schemaVersion` | 属性 | <code>schemaVersion: string</code> | schema Version 字段。 |
| `sequence` | 属性 | <code>sequence: number</code> | sequence 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `topic` | 属性 | <code>topic: string</code> | topic 字段。 |
| `traceId` | 属性 | <code>traceId: string</code> | trace Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `RuntimeMessageEnvelopeInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | activity Id 字段。 |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `availableAt` | 属性 | <code>availableAt: string</code> | available At 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `messageId` | 属性 | <code>messageId: string</code> | message Id 字段。 |
| `messageType` | 属性 | <code>messageType: "runtime.activity.requested" &#124; "runtime.activity.completed" &#124; "runtime.activity.failed" &#124; "runtime.command.start" &#124; "runtime.command.resume" &#124; "runtime.command.cancel" &#124; "runtime.signal" &#124; "runtime.timer.fire" &#124; "runtime.agent.message" &#124; "runtime.child.completed" &#124; "runtime.projection.rebuild" &#124; "runtime.recovery.requested" &#124; "runtime.custom"</code> | message Type 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `orderingKey` | 属性 | <code>orderingKey: string</code> | ordering Key 字段。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | partition Key 字段。 |
| `payload` | 属性 | <code>payload: TPayload</code> | payload 字段。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | payload Hash 字段。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | principal 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `producerId` | 属性 | <code>producerId: string</code> | producer Id 字段。 |
| `producerRevision` | 属性 | <code>producerRevision: string</code> | producer Revision 字段。 |
| `publishedAt` | 属性 | <code>publishedAt: string</code> | published At 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `schemaVersion` | 属性 | <code>schemaVersion: string</code> | schema Version 字段。 |
| `sequence` | 属性 | <code>sequence: number</code> | sequence 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `topic` | 属性 | <code>topic: string</code> | topic 字段。 |
| `traceId` | 属性 | <code>traceId: string</code> | trace Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `RuntimeMessageInboxRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `appliedEventIds` | 属性 | <code>appliedEventIds: string[]</code> | applied Event Ids 字段。 |
| `attempts` | 属性 | <code>attempts: number</code> | attempts 字段。 |
| `consumerId` | 属性 | <code>consumerId: string</code> | consumer Id 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `firstReceivedAt` | 属性 | <code>firstReceivedAt: string</code> | first Received At 字段。 |
| `lastError` | 属性 | <code>lastError: NormalizedRuntimeError</code> | last Error 字段。 |
| `lastReceivedAt` | 属性 | <code>lastReceivedAt: string</code> | last Received At 字段。 |
| `messageId` | 属性 | <code>messageId: string</code> | message Id 字段。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | payload Hash 字段。 |
| `processingExpiresAt` | 属性 | <code>processingExpiresAt: string</code> | processing Expires At 字段。 |
| `processingOwner` | 属性 | <code>processingOwner: string</code> | processing Owner 字段。 |
| `status` | 属性 | <code>status: "failed" &#124; "processing" &#124; "applied" &#124; "ignored"</code> | status 字段。 |

## `RuntimeMessageOutboxRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | attempts 字段。 |
| `availableAt` | 属性 | <code>availableAt: string</code> | available At 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `envelope` | 属性 | <code>envelope: RuntimeMessageEnvelope&lt;unknown&gt;</code> | envelope 字段。 |
| `eventId` | 属性 | <code>eventId: string</code> | event Id 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `lastError` | 属性 | <code>lastError: NormalizedRuntimeError</code> | last Error 字段。 |
| `leaseExpiresAt` | 属性 | <code>leaseExpiresAt: string</code> | lease Expires At 字段。 |
| `leaseOwner` | 属性 | <code>leaseOwner: string</code> | lease Owner 字段。 |
| `messageId` | 属性 | <code>messageId: string</code> | message Id 字段。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | partition Key 字段。 |
| `state` | 属性 | <code>state: "failed" &#124; "pending" &#124; "publishing" &#124; "published" &#124; "dead_letter"</code> | state 字段。 |
| `topic` | 属性 | <code>topic: string</code> | topic 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
