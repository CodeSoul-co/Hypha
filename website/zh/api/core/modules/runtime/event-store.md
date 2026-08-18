# `@codesoul-co/hypha-core` / `modules/runtime/event-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/event-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)
- 导出数: **17**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryDurableEventStore` | 类 | <code>new InMemoryDurableEventStore(options: InMemoryDurableEventStoreOptions): InMemoryDurableEventStore</code> | In Memory Durable Event Store 的运行时实现；公开构造函数与成员见下表。 |
| `createPersistedEventBatch` | 函数 | <code>createPersistedEventBatch(request: EventAppendRequest, firstSequence: number, firstGlobalSequence: number, recordedAt: string): PersistedFrameworkEvent[]</code> | 创建 Persisted Event Batch。 |
| `decodeEventStreamHeadCursor` | 函数 | <code>decodeEventStreamHeadCursor(cursor: string): string</code> | decode Event Stream Head Cursor 的公开运行时操作。 |
| `encodeEventStreamHeadCursor` | 函数 | <code>encodeEventStreamHeadCursor(streamKey: string): string</code> | encode Event Stream Head Cursor 的公开运行时操作。 |
| `eventStreamKey` | 函数 | <code>eventStreamKey(scope: EventStreamScope): string</code> | event Stream Key 的公开运行时操作。 |
| `hashEventAppendRequest` | 函数 | <code>hashEventAppendRequest(request: EventAppendRequest): string</code> | 判断是否存在 h Event Append Request。 |
| `streamHeadListLimit` | 函数 | <code>streamHeadListLimit(limit?: number): number</code> | stream Head List Limit 的公开运行时操作。 |
| `validateEventAppendRequest` | 函数 | <code>validateEventAppendRequest(request: EventAppendRequest): void</code> | 校验 Event Append Request。 |
| `validateEventAppendSchemas` | 函数 | <code>validateEventAppendSchemas(registry: EventSchemaRegistry, request: EventAppendRequest): Promise&lt;void&gt;</code> | 校验 Event Append Schemas。 |
| `DurableEventStore` | 接口 | <code>interface DurableEventStore</code> | Durable Event Store 的字段契约；完整字段见下表。 |
| `EventAppendRequest` | 接口 | <code>interface EventAppendRequest</code> | Event Append Request 的字段契约；完整字段见下表。 |
| `EventAppendResult` | 接口 | <code>interface EventAppendResult</code> | Event Append Result 的字段契约；完整字段见下表。 |
| `EventStreamHead` | 接口 | <code>interface EventStreamHead</code> | Event Stream Head 的字段契约；完整字段见下表。 |
| `EventStreamScope` | 接口 | <code>interface EventStreamScope</code> | Event Stream Scope 的字段契约；完整字段见下表。 |
| `InMemoryDurableEventStoreOptions` | 接口 | <code>interface InMemoryDurableEventStoreOptions</code> | In Memory Durable Event Store Options 的字段契约；完整字段见下表。 |
| `ListEventStreamHeadsRequest` | 接口 | <code>interface ListEventStreamHeadsRequest</code> | List Event Stream Heads Request 的字段契约；完整字段见下表。 |
| `ListEventStreamHeadsResult` | 接口 | <code>interface ListEventStreamHeadsResult</code> | List Event Stream Heads Result 的字段契约；完整字段见下表。 |

## `InMemoryDurableEventStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | 追加 append。 |
| `constructor` | 构造函数 | <code>(options: InMemoryDurableEventStoreOptions): InMemoryDurableEventStore</code> | 创建该类的实例。 |
| `getStreamHead` | 方法 | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | 读取 Stream Head。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `listStreamHeads` | 方法 | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | 列出 Stream Heads。 |
| `readById` | 方法 | <code>readById(scope: EventStreamScope, eventId: string): Promise&lt;PersistedFrameworkEvent &#124; null&gt;</code> | read By Id 的公开运行时操作。 |
| `readStream` | 方法 | <code>readStream(scope: EventStreamScope, fromSequence?: number): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | read Stream 的公开运行时操作。 |

## `DurableEventStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | 追加 append。 |
| `getStreamHead` | 方法 | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | 读取 Stream Head。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `listStreamHeads` | 方法 | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | 列出 Stream Heads。 |
| `readById` | 方法 | <code>readById(scope: EventStreamScope, eventId: string): Promise&lt;PersistedFrameworkEvent &#124; null&gt;</code> | read By Id 的公开运行时操作。 |
| `readStream` | 方法 | <code>readStream(scope: EventStreamScope, fromSequence?: number): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | read Stream 的公开运行时操作。 |

## `EventAppendRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: EventCreateInput&lt;unknown&gt;[]</code> | events 字段。 |
| `expectedLastSequence` | 属性 | <code>expectedLastSequence: number</code> | expected Last Sequence 字段。 |
| `expectedRunRevision` | 属性 | <code>expectedRunRevision: number</code> | expected Run Revision 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `scope` | 属性 | <code>scope: EventStreamScope</code> | scope 字段。 |
| `transactionGroupId` | 属性 | <code>transactionGroupId: string</code> | transaction Group Id 字段。 |

## `EventAppendResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | events 字段。 |
| `firstSequence` | 属性 | <code>firstSequence: number</code> | first Sequence 字段。 |
| `lastSequence` | 属性 | <code>lastSequence: number</code> | last Sequence 字段。 |
| `reused` | 属性 | <code>reused: boolean</code> | reused 字段。 |
| `runRevision` | 属性 | <code>runRevision: number</code> | run Revision 字段。 |

## `EventStreamHead` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `lastSequence` | 属性 | <code>lastSequence: number</code> | last Sequence 字段。 |
| `runRevision` | 属性 | <code>runRevision: number</code> | run Revision 字段。 |
| `scope` | 属性 | <code>scope: EventStreamScope</code> | scope 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `EventStreamScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `InMemoryDurableEventStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `schemaRegistry` | 属性 | <code>schemaRegistry: EventSchemaRegistry</code> | schema Registry 字段。 |

## `ListEventStreamHeadsRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cursor` | 属性 | <code>cursor: string</code> | cursor 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |

## `ListEventStreamHeadsResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `heads` | 属性 | <code>heads: EventStreamHead[]</code> | heads 字段。 |
| `nextCursor` | 属性 | <code>nextCursor: string</code> | next Cursor 字段。 |
