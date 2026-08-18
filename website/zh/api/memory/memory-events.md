# `@codesoul-co/hypha-memory` / `memory-events`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryEventIdempotencyKey` | 函数 | <code>memoryEventIdempotencyKey(type: MemoryEventType, payload: MemoryEventPayloadBase): string</code> | memory Event Idempotency Key 的公开运行时操作。 |
| `sanitizeMemoryEventPayload` | 函数 | <code>sanitizeMemoryEventPayload(payload: MemoryEventPayloadBase): MemoryEventPayloadBase</code> | sanitize Memory Event Payload 的公开运行时操作。 |
| `MemoryEventContext` | 接口 | <code>interface MemoryEventContext</code> | Memory Event Context 的字段契约；完整字段见下表。 |
| `MemoryEventPayloadBase` | 接口 | <code>interface MemoryEventPayloadBase</code> | Memory Event Payload Base 的字段契约；完整字段见下表。 |
| `MemoryEventPublisher` | 接口 | <code>interface MemoryEventPublisher</code> | Memory Event Publisher 的字段契约；完整字段见下表。 |
| `MemoryEventType` | 类型 | <code>type MemoryEventType = Extract&lt;FrameworkEventType, `memory.${string}` &#124; `context.${string}`&gt;</code> | Memory Event Type 的公共类型别名。 |

## `MemoryEventContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `MemoryEventPayloadBase` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error: NormalizedMemoryError</code> | error 字段。 |
| `itemCount` | 属性 | <code>itemCount: number</code> | item Count 字段。 |
| `latencyMs` | 属性 | <code>latencyMs: number</code> | latency Ms 字段。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | memory Id 字段。 |
| `memoryVersionId` | 属性 | <code>memoryVersionId: string</code> | memory Version Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `profileId` | 属性 | <code>profileId: string</code> | profile Id 字段。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `status` | 属性 | <code>status: string</code> | status 字段。 |

## `MemoryEventPublisher` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `publish` | 方法 | <code>publish(type: MemoryEventType, payload: MemoryEventPayloadBase, context: MemoryEventContext): Promise&lt;string&gt;</code> | publish 的公开运行时操作。 |
