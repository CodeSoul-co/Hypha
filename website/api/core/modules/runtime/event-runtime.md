# `@codesoul-co/hypha-core` / `modules/runtime/event-runtime`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/event-runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DurableEventRuntime` | class | <code>new DurableEventRuntime(options: DurableEventRuntimeOptions): DurableEventRuntime</code> | Runtime implementation for Durable Event Runtime; see its public constructor and members below. |
| `eventExportChecksum` | function | <code>eventExportChecksum(exported: Omit&lt;EventExportResult, "checksum"&gt; &#124; EventExportResult): string</code> | Public runtime operation for event Export Checksum. |
| `DurableEventRuntimeOptions` | interface | <code>interface DurableEventRuntimeOptions</code> | Field contract for Durable Event Runtime Options; see all contract members below. |
| `EventExportResult` | interface | <code>interface EventExportResult</code> | Field contract for Event Export Result; see all contract members below. |
| `EventImportRequest` | interface | <code>interface EventImportRequest</code> | Field contract for Event Import Request; see all contract members below. |
| `EventImportResult` | interface | <code>interface EventImportResult extends EventAppendResult</code> | Field contract for Event Import Result; see all contract members below. |
| `EventReadRequest` | interface | <code>interface EventReadRequest</code> | Field contract for Event Read Request; see all contract members below. |
| `EventRuntime` | interface | <code>interface EventRuntime</code> | Field contract for Event Runtime; see all contract members below. |
| `EventExportRequest` | type | <code>type EventExportRequest = EventReadRequest</code> | Public type alias for Event Export Request. |

## `DurableEventRuntime` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | Appends append at this module boundary. |
| `constructor` | constructor | <code>(options: DurableEventRuntimeOptions): DurableEventRuntime</code> | Creates an instance of this class. |
| `export` | method | <code>export(request: EventExportRequest): Promise&lt;EventExportResult&gt;</code> | Public runtime operation for export. |
| `getStreamHead` | method | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | Gets Stream Head at this module boundary. |
| `import` | method | <code>import(request: EventImportRequest): Promise&lt;EventImportResult&gt;</code> | Public runtime operation for import. |
| `latestSequence` | method | <code>latestSequence(scope: EventStreamScope): Promise&lt;number&gt;</code> | Public runtime operation for latest Sequence. |
| `listStreamHeads` | method | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | Lists Stream Heads at this module boundary. |
| `read` | method | <code>read(request: EventReadRequest): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | Public runtime operation for read. |
| `stream` | method | <code>stream(request: EventReadRequest): AsyncIterable&lt;PersistedFrameworkEvent&gt;</code> | Public runtime operation for stream. |

## `DurableEventRuntimeOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `store` | property | <code>store: DurableEventStore</code> | Public store property. |

## `EventExportResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checksum` | property | <code>checksum: string</code> | Public checksum property. |
| `eventCount` | property | <code>eventCount: number</code> | Public event Count property. |
| `events` | property | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | Public events property. |
| `exportedAt` | property | <code>exportedAt: string</code> | Public exported At property. |
| `formatVersion` | property | <code>formatVersion: "1.0.0"</code> | Public format Version property. |
| `head` | property | <code>head: EventStreamHead</code> | Public head property. |
| `scope` | property | <code>scope: EventStreamScope</code> | Public scope property. |

## `EventImportRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedLastSequence` | property | <code>expectedLastSequence: number</code> | Public expected Last Sequence property. |
| `expectedRunRevision` | property | <code>expectedRunRevision: number</code> | Public expected Run Revision property. |
| `exported` | property | <code>exported: EventExportResult</code> | Public exported property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `scope` | property | <code>scope: EventStreamScope</code> | Public scope property. |

## `EventImportResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | Public events property. |
| `firstSequence` | property | <code>firstSequence: number</code> | Public first Sequence property. |
| `importedEventCount` | property | <code>importedEventCount: number</code> | Public imported Event Count property. |
| `lastSequence` | property | <code>lastSequence: number</code> | Public last Sequence property. |
| `reused` | property | <code>reused: boolean</code> | Public reused property. |
| `runRevision` | property | <code>runRevision: number</code> | Public run Revision property. |
| `sourceChecksum` | property | <code>sourceChecksum: string</code> | Public source Checksum property. |

## `EventReadRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fromSequence` | property | <code>fromSequence: number</code> | Public from Sequence property. |
| `scope` | property | <code>scope: EventStreamScope</code> | Public scope property. |
| `toSequence` | property | <code>toSequence: number</code> | Public to Sequence property. |
| `types` | property | <code>types: FrameworkEventType[]</code> | Public types property. |

## `EventRuntime` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | Appends append at this module boundary. |
| `export` | method | <code>export(request: EventExportRequest): Promise&lt;EventExportResult&gt;</code> | Public runtime operation for export. |
| `getStreamHead` | method | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | Gets Stream Head at this module boundary. |
| `import` | method | <code>import(request: EventImportRequest): Promise&lt;EventImportResult&gt;</code> | Public runtime operation for import. |
| `latestSequence` | method | <code>latestSequence(scope: EventStreamScope): Promise&lt;number&gt;</code> | Public runtime operation for latest Sequence. |
| `listStreamHeads` | method | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | Lists Stream Heads at this module boundary. |
| `read` | method | <code>read(request: EventReadRequest): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | Public runtime operation for read. |
| `stream` | method | <code>stream(request: EventReadRequest): AsyncIterable&lt;PersistedFrameworkEvent&gt;</code> | Public runtime operation for stream. |
