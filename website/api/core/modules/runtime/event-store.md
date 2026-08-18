# `@codesoul-co/hypha-core` / `modules/runtime/event-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/event-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)
- Exports: **17**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryDurableEventStore` | class | <code>new InMemoryDurableEventStore(options: InMemoryDurableEventStoreOptions): InMemoryDurableEventStore</code> | Runtime implementation for In Memory Durable Event Store; see its public constructor and members below. |
| `createPersistedEventBatch` | function | <code>createPersistedEventBatch(request: EventAppendRequest, firstSequence: number, firstGlobalSequence: number, recordedAt: string): PersistedFrameworkEvent[]</code> | Creates Persisted Event Batch at this module boundary. |
| `decodeEventStreamHeadCursor` | function | <code>decodeEventStreamHeadCursor(cursor: string): string</code> | Public runtime operation for decode Event Stream Head Cursor. |
| `encodeEventStreamHeadCursor` | function | <code>encodeEventStreamHeadCursor(streamKey: string): string</code> | Public runtime operation for encode Event Stream Head Cursor. |
| `eventStreamKey` | function | <code>eventStreamKey(scope: EventStreamScope): string</code> | Public runtime operation for event Stream Key. |
| `hashEventAppendRequest` | function | <code>hashEventAppendRequest(request: EventAppendRequest): string</code> | Checks whether h Event Append Request at this module boundary. |
| `streamHeadListLimit` | function | <code>streamHeadListLimit(limit?: number): number</code> | Public runtime operation for stream Head List Limit. |
| `validateEventAppendRequest` | function | <code>validateEventAppendRequest(request: EventAppendRequest): void</code> | Validates Event Append Request at this module boundary. |
| `validateEventAppendSchemas` | function | <code>validateEventAppendSchemas(registry: EventSchemaRegistry, request: EventAppendRequest): Promise&lt;void&gt;</code> | Validates Event Append Schemas at this module boundary. |
| `DurableEventStore` | interface | <code>interface DurableEventStore</code> | Field contract for Durable Event Store; see all contract members below. |
| `EventAppendRequest` | interface | <code>interface EventAppendRequest</code> | Field contract for Event Append Request; see all contract members below. |
| `EventAppendResult` | interface | <code>interface EventAppendResult</code> | Field contract for Event Append Result; see all contract members below. |
| `EventStreamHead` | interface | <code>interface EventStreamHead</code> | Field contract for Event Stream Head; see all contract members below. |
| `EventStreamScope` | interface | <code>interface EventStreamScope</code> | Field contract for Event Stream Scope; see all contract members below. |
| `InMemoryDurableEventStoreOptions` | interface | <code>interface InMemoryDurableEventStoreOptions</code> | Field contract for In Memory Durable Event Store Options; see all contract members below. |
| `ListEventStreamHeadsRequest` | interface | <code>interface ListEventStreamHeadsRequest</code> | Field contract for List Event Stream Heads Request; see all contract members below. |
| `ListEventStreamHeadsResult` | interface | <code>interface ListEventStreamHeadsResult</code> | Field contract for List Event Stream Heads Result; see all contract members below. |

## `InMemoryDurableEventStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | Appends append at this module boundary. |
| `constructor` | constructor | <code>(options: InMemoryDurableEventStoreOptions): InMemoryDurableEventStore</code> | Creates an instance of this class. |
| `getStreamHead` | method | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | Gets Stream Head at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `listStreamHeads` | method | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | Lists Stream Heads at this module boundary. |
| `readById` | method | <code>readById(scope: EventStreamScope, eventId: string): Promise&lt;PersistedFrameworkEvent &#124; null&gt;</code> | Public runtime operation for read By Id. |
| `readStream` | method | <code>readStream(scope: EventStreamScope, fromSequence?: number): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | Public runtime operation for read Stream. |

## `DurableEventStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | Appends append at this module boundary. |
| `getStreamHead` | method | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | Gets Stream Head at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `listStreamHeads` | method | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | Lists Stream Heads at this module boundary. |
| `readById` | method | <code>readById(scope: EventStreamScope, eventId: string): Promise&lt;PersistedFrameworkEvent &#124; null&gt;</code> | Public runtime operation for read By Id. |
| `readStream` | method | <code>readStream(scope: EventStreamScope, fromSequence?: number): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | Public runtime operation for read Stream. |

## `EventAppendRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: EventCreateInput&lt;unknown&gt;[]</code> | Public events property. |
| `expectedLastSequence` | property | <code>expectedLastSequence: number</code> | Public expected Last Sequence property. |
| `expectedRunRevision` | property | <code>expectedRunRevision: number</code> | Public expected Run Revision property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `scope` | property | <code>scope: EventStreamScope</code> | Public scope property. |
| `transactionGroupId` | property | <code>transactionGroupId: string</code> | Public transaction Group Id property. |

## `EventAppendResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | Public events property. |
| `firstSequence` | property | <code>firstSequence: number</code> | Public first Sequence property. |
| `lastSequence` | property | <code>lastSequence: number</code> | Public last Sequence property. |
| `reused` | property | <code>reused: boolean</code> | Public reused property. |
| `runRevision` | property | <code>runRevision: number</code> | Public run Revision property. |

## `EventStreamHead` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `lastSequence` | property | <code>lastSequence: number</code> | Public last Sequence property. |
| `runRevision` | property | <code>runRevision: number</code> | Public run Revision property. |
| `scope` | property | <code>scope: EventStreamScope</code> | Public scope property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `EventStreamScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `InMemoryDurableEventStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `schemaRegistry` | property | <code>schemaRegistry: EventSchemaRegistry</code> | Public schema Registry property. |

## `ListEventStreamHeadsRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cursor` | property | <code>cursor: string</code> | Public cursor property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |

## `ListEventStreamHeadsResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `heads` | property | <code>heads: EventStreamHead[]</code> | Public heads property. |
| `nextCursor` | property | <code>nextCursor: string</code> | Public next Cursor property. |
