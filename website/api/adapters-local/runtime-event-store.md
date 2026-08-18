# `@codesoul-co/hypha-adapters-local` / `runtime-event-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/runtime-event-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-event-store.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteDurableEventStore` | class | <code>new SQLiteDurableEventStore(options: SQLiteDurableEventStoreOptions): SQLiteDurableEventStore</code> | Runtime implementation for SQ Lite Durable Event Store; see its public constructor and members below. |
| `SQLiteDurableEventStoreOptions` | interface | <code>interface SQLiteDurableEventStoreOptions</code> | Field contract for SQ Lite Durable Event Store Options; see all contract members below. |
| `SQLiteImportedEventResetResult` | interface | <code>interface SQLiteImportedEventResetResult</code> | Field contract for SQ Lite Imported Event Reset Result; see all contract members below. |

## `SQLiteDurableEventStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | Appends append at this module boundary. |
| `close` | method | <code>close(): void</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: SQLiteDurableEventStoreOptions): SQLiteDurableEventStore</code> | Creates an instance of this class. |
| `getStreamHead` | method | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | Gets Stream Head at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `listStreamHeads` | method | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | Lists Stream Heads at this module boundary. |
| `readById` | method | <code>readById(scope: EventStreamScope, eventId: string): Promise&lt;PersistedFrameworkEvent &#124; null&gt;</code> | Public runtime operation for read By Id. |
| `readStream` | method | <code>readStream(scope: EventStreamScope, fromSequence?: number): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | Public runtime operation for read Stream. |
| `resetUnauditedImportedEvents` | method | <code>resetUnauditedImportedEvents(): Promise&lt;SQLiteImportedEventResetResult&gt;</code> | Clears only an incomplete compatibility import. A successful integrity watermark or any live/non-imported Event makes the operation fail closed. |
| `scanCanonicalEvents` | method | <code>scanCanonicalEvents(request: ScanCanonicalEventsRequest): Promise&lt;ScanCanonicalEventsResult&gt;</code> | Public runtime operation for scan Canonical Events. |

## `SQLiteDurableEventStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public filename property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `schemaRegistry` | property | <code>schemaRegistry: EventSchemaRegistry</code> | Public schema Registry property. |

## `SQLiteImportedEventResetResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deletedEvents` | property | <code>deletedEvents: number</code> | Public deleted Events property. |
| `reason` | property | <code>reason: "empty" &#124; "reset" &#124; "audited_history" &#124; "non_imported_events"</code> | Public reason property. |
| `reset` | property | <code>reset: boolean</code> | Public reset property. |
