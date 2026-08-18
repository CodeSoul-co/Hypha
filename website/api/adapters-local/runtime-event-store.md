# `@codesoul-co/hypha-adapters-local` / `runtime-event-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/runtime-event-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-event-store.ts)
- Exports: **3**

## Using this module

Use the Runtime event store module for creating, recording, or reading Event contracts. It exports 1 class, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  SQLiteDurableEventStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteDurableEventStoreOptions,
  SQLiteImportedEventResetResult,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteDurableEventStore` | class | <code>new SQLiteDurableEventStore(options: SQLiteDurableEventStoreOptions): SQLiteDurableEventStore</code> | SQLite Durable Event Store class with 10 public constructor or member entries; its exact declarations are listed below. |
| `SQLiteDurableEventStoreOptions` | interface | <code>interface SQLiteDurableEventStoreOptions</code> | SQLite Durable Event Store Options interface with 3 public fields or methods. |
| `SQLiteImportedEventResetResult` | interface | <code>interface SQLiteImportedEventResetResult</code> | SQLite Imported Event Reset Result interface with 3 public fields or methods. |

## `SQLiteDurableEventStore`

SQLite Durable Event Store class with 10 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SQLiteDurableEventStore } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`runtime-event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-event-store.ts)

### Declaration

```text
export declare class SQLiteDurableEventStore implements DurableEventStore, CanonicalEventScanPort {
    constructor(options: SQLiteDurableEventStoreOptions);
    append(request: EventAppendRequest): Promise<EventAppendResult>;
    readStream(scope: EventStreamScope, fromSequence?: number): Promise<PersistedFrameworkEvent[]>;
    readById(scope: EventStreamScope, eventId: string): Promise<PersistedFrameworkEvent | null>;
    getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null>;
    listStreamHeads(request?: ListEventStreamHeadsRequest): Promise<ListEventStreamHeadsResult>;
    health(): Promise<ProviderHealth>;
    resetUnauditedImportedEvents(): Promise<SQLiteImportedEventResetResult>;
    scanCanonicalEvents(request: ScanCanonicalEventsRequest): Promise<ScanCanonicalEventsResult>;
    close(): void;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): void</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: SQLiteDurableEventStoreOptions): SQLiteDurableEventStore</code> | Creates an instance of this class. |
| `getStreamHead` | method | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listStreamHeads` | method | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `readById` | method | <code>readById(scope: EventStreamScope, eventId: string): Promise&lt;PersistedFrameworkEvent &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `readStream` | method | <code>readStream(scope: EventStreamScope, fromSequence?: number): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `resetUnauditedImportedEvents` | method | <code>resetUnauditedImportedEvents(): Promise&lt;SQLiteImportedEventResetResult&gt;</code> | Clears only an incomplete compatibility import. A successful integrity watermark or any live/non-imported Event makes the operation fail closed. |
| `scanCanonicalEvents` | method | <code>scanCanonicalEvents(request: ScanCanonicalEventsRequest): Promise&lt;ScanCanonicalEventsResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SQLiteDurableEventStoreOptions`

SQLite Durable Event Store Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SQLiteDurableEventStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`runtime-event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-event-store.ts)

### Declaration

```text
export interface SQLiteDurableEventStoreOptions {
    filename: string;
    schemaRegistry: EventSchemaRegistry;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `schemaRegistry` | property | <code>schemaRegistry: EventSchemaRegistry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SQLiteImportedEventResetResult`

SQLite Imported Event Reset Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SQLiteImportedEventResetResult } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`runtime-event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-event-store.ts)

### Declaration

```text
export interface SQLiteImportedEventResetResult {
    reset: boolean;
    deletedEvents: number;
    reason: 'empty' | 'reset' | 'audited_history' | 'non_imported_events';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deletedEvents` | property | <code>deletedEvents: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: "empty" &#124; "reset" &#124; "audited_history" &#124; "non_imported_events"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reset` | property | <code>reset: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
