# `@codesoul-co/hypha-core` / `modules/runtime/event-runtime`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/event-runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)
- Exports: **9**

## Using this module

Use the Event runtime module for creating, recording, or reading Event contracts. It exports 1 class, 1 function, 6 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  DurableEventRuntime,
  eventExportChecksum,
} from '@codesoul-co/hypha-core';

import type {
  DurableEventRuntimeOptions,
  EventExportResult,
  EventImportRequest,
  EventImportResult,
  EventReadRequest,
  EventRuntime,
  EventExportRequest,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DurableEventRuntime` | class | <code>new DurableEventRuntime(options: DurableEventRuntimeOptions): DurableEventRuntime</code> | Durable Event Runtime class with 9 public constructor or member entries; its exact declarations are listed below. |
| `eventExportChecksum` | function | <code>eventExportChecksum(exported: Omit&lt;EventExportResult, "checksum"&gt; &#124; EventExportResult): string</code> | Event Export Checksum function with 1 public call signature; parameters and return types are listed below. |
| `DurableEventRuntimeOptions` | interface | <code>interface DurableEventRuntimeOptions</code> | Durable Event Runtime Options interface with 2 public fields or methods. |
| `EventExportResult` | interface | <code>interface EventExportResult</code> | Event Export Result interface with 7 public fields or methods. |
| `EventImportRequest` | interface | <code>interface EventImportRequest</code> | Event Import Request interface with 6 public fields or methods. |
| `EventImportResult` | interface | <code>interface EventImportResult extends EventAppendResult</code> | Event Import Result interface with 7 public fields or methods. |
| `EventReadRequest` | interface | <code>interface EventReadRequest</code> | Event Read Request interface with 4 public fields or methods. |
| `EventRuntime` | interface | <code>interface EventRuntime</code> | Event Runtime interface with 8 public fields or methods. |
| `EventExportRequest` | type | <code>type EventExportRequest = EventReadRequest</code> | Public type alias for Event Export Request; the declaration contains its complete type expression. |

## `DurableEventRuntime`

Durable Event Runtime class with 9 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DurableEventRuntime } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### Declaration

```text
export declare class DurableEventRuntime implements EventRuntime {
    constructor(options: DurableEventRuntimeOptions);
    append(request: EventAppendRequest): Promise<EventAppendResult>;
    read(request: EventReadRequest): Promise<PersistedFrameworkEvent[]>;
    stream(request: EventReadRequest): AsyncIterable<PersistedFrameworkEvent>;
    latestSequence(scope: EventStreamScope): Promise<number>;
    getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null>;
    listStreamHeads(request?: ListEventStreamHeadsRequest): Promise<ListEventStreamHeadsResult>;
    export(request: EventExportRequest): Promise<EventExportResult>;
    import(request: EventImportRequest): Promise<EventImportResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: DurableEventRuntimeOptions): DurableEventRuntime</code> | Creates an instance of this class. |
| `export` | method | <code>export(request: EventExportRequest): Promise&lt;EventExportResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getStreamHead` | method | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `import` | method | <code>import(request: EventImportRequest): Promise&lt;EventImportResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `latestSequence` | method | <code>latestSequence(scope: EventStreamScope): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listStreamHeads` | method | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `read` | method | <code>read(request: EventReadRequest): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `stream` | method | <code>stream(request: EventReadRequest): AsyncIterable&lt;PersistedFrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `eventExportChecksum`

Event Export Checksum function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { eventExportChecksum } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### Declaration

```text
export declare function eventExportChecksum(exported: Omit<EventExportResult, 'checksum'> | EventExportResult): string;
```

### Call signature

```text
eventExportChecksum(exported: Omit<EventExportResult, "checksum"> | EventExportResult): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `exported` | <code>EventExportResult &#124; Omit&lt;EventExportResult, "checksum"&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `DurableEventRuntimeOptions`

Durable Event Runtime Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { DurableEventRuntimeOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### Declaration

```text
export interface DurableEventRuntimeOptions {
    store: DurableEventStore;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `store` | property | <code>store: DurableEventStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EventExportResult`

Event Export Result interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { EventExportResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### Declaration

```text
export interface EventExportResult {
    formatVersion: '1.0.0';
    scope: EventStreamScope;
    head: EventStreamHead | null;
    events: PersistedFrameworkEvent[];
    eventCount: number;
    exportedAt: string;
    checksum: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checksum` | property | <code>checksum: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventCount` | property | <code>eventCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `exportedAt` | property | <code>exportedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `formatVersion` | property | <code>formatVersion: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `head` | property | <code>head: EventStreamHead</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: EventStreamScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EventImportRequest`

Event Import Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { EventImportRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### Declaration

```text
export interface EventImportRequest {
    scope: EventStreamScope;
    exported: EventExportResult;
    expectedLastSequence: number;
    expectedRunRevision?: number;
    fencingToken?: number;
    idempotencyKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedLastSequence` | property | <code>expectedLastSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRunRevision` | property | <code>expectedRunRevision?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `exported` | property | <code>exported: EventExportResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: EventStreamScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EventImportResult`

Event Import Result interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { EventImportResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### Declaration

```text
export interface EventImportResult extends EventAppendResult {
    importedEventCount: number;
    sourceChecksum: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `firstSequence` | property | <code>firstSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `importedEventCount` | property | <code>importedEventCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastSequence` | property | <code>lastSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reused` | property | <code>reused: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runRevision` | property | <code>runRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceChecksum` | property | <code>sourceChecksum: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EventReadRequest`

Event Read Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { EventReadRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### Declaration

```text
export interface EventReadRequest {
    scope: EventStreamScope;
    fromSequence?: number;
    toSequence?: number;
    types?: FrameworkEventType[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fromSequence` | property | <code>fromSequence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: EventStreamScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toSequence` | property | <code>toSequence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `types` | property | <code>types?: FrameworkEventType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EventRuntime`

Event Runtime interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { EventRuntime } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### Declaration

```text
export interface EventRuntime {
    append(request: EventAppendRequest): Promise<EventAppendResult>;
    read(request: EventReadRequest): Promise<PersistedFrameworkEvent[]>;
    stream(request: EventReadRequest): AsyncIterable<PersistedFrameworkEvent>;
    latestSequence(scope: EventStreamScope): Promise<number>;
    getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null>;
    listStreamHeads(request?: ListEventStreamHeadsRequest): Promise<ListEventStreamHeadsResult>;
    export(request: EventExportRequest): Promise<EventExportResult>;
    import(request: EventImportRequest): Promise<EventImportResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `export` | method | <code>export(request: EventExportRequest): Promise&lt;EventExportResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getStreamHead` | method | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `import` | method | <code>import(request: EventImportRequest): Promise&lt;EventImportResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `latestSequence` | method | <code>latestSequence(scope: EventStreamScope): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listStreamHeads` | method | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `read` | method | <code>read(request: EventReadRequest): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `stream` | method | <code>stream(request: EventReadRequest): AsyncIterable&lt;PersistedFrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `EventExportRequest`

Public type alias for Event Export Request; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { EventExportRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### Declaration

```text
export type EventExportRequest = EventReadRequest;
```
