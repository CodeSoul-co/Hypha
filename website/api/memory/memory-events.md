# `@codesoul-co/hypha-memory` / `memory-events`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryEventIdempotencyKey` | function | <code>memoryEventIdempotencyKey(type: MemoryEventType, payload: MemoryEventPayloadBase): string</code> | Public runtime operation for memory Event Idempotency Key. |
| `sanitizeMemoryEventPayload` | function | <code>sanitizeMemoryEventPayload(payload: MemoryEventPayloadBase): MemoryEventPayloadBase</code> | Public runtime operation for sanitize Memory Event Payload. |
| `MemoryEventContext` | interface | <code>interface MemoryEventContext</code> | Field contract for Memory Event Context; see all contract members below. |
| `MemoryEventPayloadBase` | interface | <code>interface MemoryEventPayloadBase</code> | Field contract for Memory Event Payload Base; see all contract members below. |
| `MemoryEventPublisher` | interface | <code>interface MemoryEventPublisher</code> | Field contract for Memory Event Publisher; see all contract members below. |
| `MemoryEventType` | type | <code>type MemoryEventType = Extract&lt;FrameworkEventType, `memory.${string}` &#124; `context.${string}`&gt;</code> | Public type alias for Memory Event Type. |

## `MemoryEventContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `MemoryEventPayloadBase` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error: NormalizedMemoryError</code> | Public error property. |
| `itemCount` | property | <code>itemCount: number</code> | Public item Count property. |
| `latencyMs` | property | <code>latencyMs: number</code> | Public latency Ms property. |
| `memoryId` | property | <code>memoryId: string</code> | Public memory Id property. |
| `memoryVersionId` | property | <code>memoryVersionId: string</code> | Public memory Version Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `profileId` | property | <code>profileId: string</code> | Public profile Id property. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `status` | property | <code>status: string</code> | Public status property. |

## `MemoryEventPublisher` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `publish` | method | <code>publish(type: MemoryEventType, payload: MemoryEventPayloadBase, context: MemoryEventContext): Promise&lt;string&gt;</code> | Public runtime operation for publish. |
