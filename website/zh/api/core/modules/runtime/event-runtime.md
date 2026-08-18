# `@codesoul-co/hypha-core` / `modules/runtime/event-runtime`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/event-runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DurableEventRuntime` | 类 | <code>new DurableEventRuntime(options: DurableEventRuntimeOptions): DurableEventRuntime</code> | Durable Event Runtime 的运行时实现；公开构造函数与成员见下表。 |
| `eventExportChecksum` | 函数 | <code>eventExportChecksum(exported: Omit&lt;EventExportResult, "checksum"&gt; &#124; EventExportResult): string</code> | event Export Checksum 的公开运行时操作。 |
| `DurableEventRuntimeOptions` | 接口 | <code>interface DurableEventRuntimeOptions</code> | Durable Event Runtime Options 的字段契约；完整字段见下表。 |
| `EventExportResult` | 接口 | <code>interface EventExportResult</code> | Event Export Result 的字段契约；完整字段见下表。 |
| `EventImportRequest` | 接口 | <code>interface EventImportRequest</code> | Event Import Request 的字段契约；完整字段见下表。 |
| `EventImportResult` | 接口 | <code>interface EventImportResult extends EventAppendResult</code> | Event Import Result 的字段契约；完整字段见下表。 |
| `EventReadRequest` | 接口 | <code>interface EventReadRequest</code> | Event Read Request 的字段契约；完整字段见下表。 |
| `EventRuntime` | 接口 | <code>interface EventRuntime</code> | Event Runtime 的字段契约；完整字段见下表。 |
| `EventExportRequest` | 类型 | <code>type EventExportRequest = EventReadRequest</code> | Event Export Request 的公共类型别名。 |

## `DurableEventRuntime` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | 追加 append。 |
| `constructor` | 构造函数 | <code>(options: DurableEventRuntimeOptions): DurableEventRuntime</code> | 创建该类的实例。 |
| `export` | 方法 | <code>export(request: EventExportRequest): Promise&lt;EventExportResult&gt;</code> | export 的公开运行时操作。 |
| `getStreamHead` | 方法 | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | 读取 Stream Head。 |
| `import` | 方法 | <code>import(request: EventImportRequest): Promise&lt;EventImportResult&gt;</code> | import 的公开运行时操作。 |
| `latestSequence` | 方法 | <code>latestSequence(scope: EventStreamScope): Promise&lt;number&gt;</code> | latest Sequence 的公开运行时操作。 |
| `listStreamHeads` | 方法 | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | 列出 Stream Heads。 |
| `read` | 方法 | <code>read(request: EventReadRequest): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | read 的公开运行时操作。 |
| `stream` | 方法 | <code>stream(request: EventReadRequest): AsyncIterable&lt;PersistedFrameworkEvent&gt;</code> | stream 的公开运行时操作。 |

## `DurableEventRuntimeOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `store` | 属性 | <code>store: DurableEventStore</code> | store 字段。 |

## `EventExportResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checksum` | 属性 | <code>checksum: string</code> | checksum 字段。 |
| `eventCount` | 属性 | <code>eventCount: number</code> | event Count 字段。 |
| `events` | 属性 | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | events 字段。 |
| `exportedAt` | 属性 | <code>exportedAt: string</code> | exported At 字段。 |
| `formatVersion` | 属性 | <code>formatVersion: "1.0.0"</code> | format Version 字段。 |
| `head` | 属性 | <code>head: EventStreamHead</code> | head 字段。 |
| `scope` | 属性 | <code>scope: EventStreamScope</code> | scope 字段。 |

## `EventImportRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedLastSequence` | 属性 | <code>expectedLastSequence: number</code> | expected Last Sequence 字段。 |
| `expectedRunRevision` | 属性 | <code>expectedRunRevision: number</code> | expected Run Revision 字段。 |
| `exported` | 属性 | <code>exported: EventExportResult</code> | exported 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `scope` | 属性 | <code>scope: EventStreamScope</code> | scope 字段。 |

## `EventImportResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | events 字段。 |
| `firstSequence` | 属性 | <code>firstSequence: number</code> | first Sequence 字段。 |
| `importedEventCount` | 属性 | <code>importedEventCount: number</code> | imported Event Count 字段。 |
| `lastSequence` | 属性 | <code>lastSequence: number</code> | last Sequence 字段。 |
| `reused` | 属性 | <code>reused: boolean</code> | reused 字段。 |
| `runRevision` | 属性 | <code>runRevision: number</code> | run Revision 字段。 |
| `sourceChecksum` | 属性 | <code>sourceChecksum: string</code> | source Checksum 字段。 |

## `EventReadRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fromSequence` | 属性 | <code>fromSequence: number</code> | from Sequence 字段。 |
| `scope` | 属性 | <code>scope: EventStreamScope</code> | scope 字段。 |
| `toSequence` | 属性 | <code>toSequence: number</code> | to Sequence 字段。 |
| `types` | 属性 | <code>types: FrameworkEventType[]</code> | types 字段。 |

## `EventRuntime` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | 追加 append。 |
| `export` | 方法 | <code>export(request: EventExportRequest): Promise&lt;EventExportResult&gt;</code> | export 的公开运行时操作。 |
| `getStreamHead` | 方法 | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | 读取 Stream Head。 |
| `import` | 方法 | <code>import(request: EventImportRequest): Promise&lt;EventImportResult&gt;</code> | import 的公开运行时操作。 |
| `latestSequence` | 方法 | <code>latestSequence(scope: EventStreamScope): Promise&lt;number&gt;</code> | latest Sequence 的公开运行时操作。 |
| `listStreamHeads` | 方法 | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | 列出 Stream Heads。 |
| `read` | 方法 | <code>read(request: EventReadRequest): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | read 的公开运行时操作。 |
| `stream` | 方法 | <code>stream(request: EventReadRequest): AsyncIterable&lt;PersistedFrameworkEvent&gt;</code> | stream 的公开运行时操作。 |
