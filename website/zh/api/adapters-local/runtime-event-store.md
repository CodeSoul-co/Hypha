# `@codesoul-co/hypha-adapters-local` / `runtime-event-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/runtime-event-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-event-store.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteDurableEventStore` | 类 | <code>new SQLiteDurableEventStore(options: SQLiteDurableEventStoreOptions): SQLiteDurableEventStore</code> | SQ Lite Durable Event Store 的运行时实现；公开构造函数与成员见下表。 |
| `SQLiteDurableEventStoreOptions` | 接口 | <code>interface SQLiteDurableEventStoreOptions</code> | SQ Lite Durable Event Store Options 的字段契约；完整字段见下表。 |
| `SQLiteImportedEventResetResult` | 接口 | <code>interface SQLiteImportedEventResetResult</code> | SQ Lite Imported Event Reset Result 的字段契约；完整字段见下表。 |

## `SQLiteDurableEventStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | 追加 append。 |
| `close` | 方法 | <code>close(): void</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: SQLiteDurableEventStoreOptions): SQLiteDurableEventStore</code> | 创建该类的实例。 |
| `getStreamHead` | 方法 | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | 读取 Stream Head。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `listStreamHeads` | 方法 | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | 列出 Stream Heads。 |
| `readById` | 方法 | <code>readById(scope: EventStreamScope, eventId: string): Promise&lt;PersistedFrameworkEvent &#124; null&gt;</code> | read By Id 的公开运行时操作。 |
| `readStream` | 方法 | <code>readStream(scope: EventStreamScope, fromSequence?: number): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | read Stream 的公开运行时操作。 |
| `resetUnauditedImportedEvents` | 方法 | <code>resetUnauditedImportedEvents(): Promise&lt;SQLiteImportedEventResetResult&gt;</code> | Clears only an incomplete compatibility import. A successful integrity watermark or any live/non-imported Event makes the operation fail closed. |
| `scanCanonicalEvents` | 方法 | <code>scanCanonicalEvents(request: ScanCanonicalEventsRequest): Promise&lt;ScanCanonicalEventsResult&gt;</code> | scan Canonical Events 的公开运行时操作。 |

## `SQLiteDurableEventStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | filename 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `schemaRegistry` | 属性 | <code>schemaRegistry: EventSchemaRegistry</code> | schema Registry 字段。 |

## `SQLiteImportedEventResetResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deletedEvents` | 属性 | <code>deletedEvents: number</code> | deleted Events 字段。 |
| `reason` | 属性 | <code>reason: "empty" &#124; "reset" &#124; "audited_history" &#124; "non_imported_events"</code> | reason 字段。 |
| `reset` | 属性 | <code>reset: boolean</code> | reset 字段。 |
