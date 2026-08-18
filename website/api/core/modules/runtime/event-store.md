# `@codesoul-co/hypha-core` / `modules/runtime/event-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/event-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)
- Exports: **17**

## Using this module

Use the Event store module for creating, recording, or reading Event contracts. It exports 1 class, 8 functions, 8 interfaces.

### Import from the package entrypoint

```ts
import {
  InMemoryDurableEventStore,
  createPersistedEventBatch,
  decodeEventStreamHeadCursor,
  encodeEventStreamHeadCursor,
  eventStreamKey,
  hashEventAppendRequest,
  streamHeadListLimit,
  validateEventAppendRequest,
} from '@codesoul-co/hypha-core';

import type {
  DurableEventStore,
  EventAppendRequest,
  EventAppendResult,
  EventStreamHead,
  EventStreamScope,
  InMemoryDurableEventStoreOptions,
  ListEventStreamHeadsRequest,
  ListEventStreamHeadsResult,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 8 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 8 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryDurableEventStore` | class | <code>new InMemoryDurableEventStore(options: InMemoryDurableEventStoreOptions): InMemoryDurableEventStore</code> | In Memory Durable Event Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `createPersistedEventBatch` | function | <code>createPersistedEventBatch(request: EventAppendRequest, firstSequence: number, firstGlobalSequence: number, recordedAt: string): PersistedFrameworkEvent[]</code> | Create Persisted Event Batch function with 1 public call signature; parameters and return types are listed below. |
| `decodeEventStreamHeadCursor` | function | <code>decodeEventStreamHeadCursor(cursor: string): string</code> | Decode Event Stream Head Cursor function with 1 public call signature; parameters and return types are listed below. |
| `encodeEventStreamHeadCursor` | function | <code>encodeEventStreamHeadCursor(streamKey: string): string</code> | Encode Event Stream Head Cursor function with 1 public call signature; parameters and return types are listed below. |
| `eventStreamKey` | function | <code>eventStreamKey(scope: EventStreamScope): string</code> | Event Stream Key function with 1 public call signature; parameters and return types are listed below. |
| `hashEventAppendRequest` | function | <code>hashEventAppendRequest(request: EventAppendRequest): string</code> | Hash Event Append Request function with 1 public call signature; parameters and return types are listed below. |
| `streamHeadListLimit` | function | <code>streamHeadListLimit(limit?: number): number</code> | Stream Head List Limit function with 1 public call signature; parameters and return types are listed below. |
| `validateEventAppendRequest` | function | <code>validateEventAppendRequest(request: EventAppendRequest): void</code> | Validate Event Append Request function with 1 public call signature; parameters and return types are listed below. |
| `validateEventAppendSchemas` | function | <code>validateEventAppendSchemas(registry: EventSchemaRegistry, request: EventAppendRequest): Promise&lt;void&gt;</code> | Validate Event Append Schemas function with 1 public call signature; parameters and return types are listed below. |
| `DurableEventStore` | interface | <code>interface DurableEventStore</code> | Durable Event Store interface with 6 public fields or methods. |
| `EventAppendRequest` | interface | <code>interface EventAppendRequest</code> | Event Append Request interface with 7 public fields or methods. |
| `EventAppendResult` | interface | <code>interface EventAppendResult</code> | Event Append Result interface with 5 public fields or methods. |
| `EventStreamHead` | interface | <code>interface EventStreamHead</code> | Event Stream Head interface with 5 public fields or methods. |
| `EventStreamScope` | interface | <code>interface EventStreamScope</code> | Event Stream Scope interface with 3 public fields or methods. |
| `InMemoryDurableEventStoreOptions` | interface | <code>interface InMemoryDurableEventStoreOptions</code> | In Memory Durable Event Store Options interface with 2 public fields or methods. |
| `ListEventStreamHeadsRequest` | interface | <code>interface ListEventStreamHeadsRequest</code> | List Event Stream Heads Request interface with 2 public fields or methods. |
| `ListEventStreamHeadsResult` | interface | <code>interface ListEventStreamHeadsResult</code> | List Event Stream Heads Result interface with 2 public fields or methods. |

## `InMemoryDurableEventStore`

In Memory Durable Event Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryDurableEventStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export declare class InMemoryDurableEventStore implements DurableEventStore {
    constructor(options: InMemoryDurableEventStoreOptions);
    append(request: EventAppendRequest): Promise<EventAppendResult>;
    readStream(scope: EventStreamScope, fromSequence?: number): Promise<PersistedFrameworkEvent[]>;
    readById(scope: EventStreamScope, eventId: string): Promise<PersistedFrameworkEvent | null>;
    getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null>;
    listStreamHeads(request?: ListEventStreamHeadsRequest): Promise<ListEventStreamHeadsResult>;
    health(): Promise<ProviderHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: InMemoryDurableEventStoreOptions): InMemoryDurableEventStore</code> | Creates an instance of this class. |
| `getStreamHead` | method | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listStreamHeads` | method | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `readById` | method | <code>readById(scope: EventStreamScope, eventId: string): Promise&lt;PersistedFrameworkEvent &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `readStream` | method | <code>readStream(scope: EventStreamScope, fromSequence?: number): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `createPersistedEventBatch`

Create Persisted Event Batch function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createPersistedEventBatch } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export declare function createPersistedEventBatch(request: EventAppendRequest, firstSequence: number, firstGlobalSequence: number, recordedAt: string): PersistedFrameworkEvent[];
```

### Call signature

```text
createPersistedEventBatch(request: EventAppendRequest, firstSequence: number, firstGlobalSequence: number, recordedAt: string): PersistedFrameworkEvent[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `request` | <code>EventAppendRequest</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `firstSequence` | <code>number</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `firstGlobalSequence` | <code>number</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `recordedAt` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `PersistedFrameworkEvent<unknown>[]`
- Description: The return contract is defined by the type shown above.

## `decodeEventStreamHeadCursor`

Decode Event Stream Head Cursor function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { decodeEventStreamHeadCursor } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export declare function decodeEventStreamHeadCursor(cursor: string): string;
```

### Call signature

```text
decodeEventStreamHeadCursor(cursor: string): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `cursor` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `encodeEventStreamHeadCursor`

Encode Event Stream Head Cursor function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { encodeEventStreamHeadCursor } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export declare function encodeEventStreamHeadCursor(streamKey: string): string;
```

### Call signature

```text
encodeEventStreamHeadCursor(streamKey: string): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `streamKey` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `eventStreamKey`

Event Stream Key function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { eventStreamKey } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export declare function eventStreamKey(scope: EventStreamScope): string;
```

### Call signature

```text
eventStreamKey(scope: EventStreamScope): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `scope` | <code>EventStreamScope</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `hashEventAppendRequest`

Hash Event Append Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { hashEventAppendRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export declare function hashEventAppendRequest(request: EventAppendRequest): string;
```

### Call signature

```text
hashEventAppendRequest(request: EventAppendRequest): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `request` | <code>EventAppendRequest</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `streamHeadListLimit`

Stream Head List Limit function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { streamHeadListLimit } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export declare function streamHeadListLimit(limit?: number): number;
```

### Call signature

```text
streamHeadListLimit(limit?: number): number
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `limit` | <code>number</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `number`
- Description: The return contract is defined by the type shown above.

## `validateEventAppendRequest`

Validate Event Append Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateEventAppendRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export declare function validateEventAppendRequest(request: EventAppendRequest): void;
```

### Call signature

```text
validateEventAppendRequest(request: EventAppendRequest): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `request` | <code>EventAppendRequest</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `validateEventAppendSchemas`

Validate Event Append Schemas function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateEventAppendSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export declare function validateEventAppendSchemas(registry: EventSchemaRegistry, request: EventAppendRequest): Promise<void>;
```

### Call signature

```text
validateEventAppendSchemas(registry: EventSchemaRegistry, request: EventAppendRequest): Promise<void>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `registry` | <code>EventSchemaRegistry</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `request` | <code>EventAppendRequest</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<void>`
- Description: The return contract is defined by the type shown above.

## `DurableEventStore`

Durable Event Store interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { DurableEventStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export interface DurableEventStore {
    append(request: EventAppendRequest): Promise<EventAppendResult>;
    readStream(scope: EventStreamScope, fromSequence?: number): Promise<PersistedFrameworkEvent[]>;
    readById(scope: EventStreamScope, eventId: string): Promise<PersistedFrameworkEvent | null>;
    getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null>;
    listStreamHeads(request?: ListEventStreamHeadsRequest): Promise<ListEventStreamHeadsResult>;
    health(): Promise<ProviderHealth>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getStreamHead` | method | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listStreamHeads` | method | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `readById` | method | <code>readById(scope: EventStreamScope, eventId: string): Promise&lt;PersistedFrameworkEvent &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `readStream` | method | <code>readStream(scope: EventStreamScope, fromSequence?: number): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `EventAppendRequest`

Event Append Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { EventAppendRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export interface EventAppendRequest {
    scope: EventStreamScope;
    events: EventCreateInput[];
    expectedLastSequence: number;
    expectedRunRevision?: number;
    fencingToken?: number;
    idempotencyKey: string;
    transactionGroupId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: EventCreateInput&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedLastSequence` | property | <code>expectedLastSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRunRevision` | property | <code>expectedRunRevision?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: EventStreamScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transactionGroupId` | property | <code>transactionGroupId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EventAppendResult`

Event Append Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { EventAppendResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export interface EventAppendResult {
    events: PersistedFrameworkEvent[];
    firstSequence: number;
    lastSequence: number;
    runRevision: number;
    reused: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `firstSequence` | property | <code>firstSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastSequence` | property | <code>lastSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reused` | property | <code>reused: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runRevision` | property | <code>runRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EventStreamHead`

Event Stream Head interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { EventStreamHead } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export interface EventStreamHead {
    scope: EventStreamScope;
    lastSequence: number;
    runRevision: number;
    fencingToken?: number;
    updatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fencingToken` | property | <code>fencingToken?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastSequence` | property | <code>lastSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runRevision` | property | <code>runRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: EventStreamScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EventStreamScope`

Event Stream Scope interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { EventStreamScope } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export interface EventStreamScope {
    tenantId?: string;
    userId: string;
    runId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InMemoryDurableEventStoreOptions`

In Memory Durable Event Store Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryDurableEventStoreOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export interface InMemoryDurableEventStoreOptions {
    schemaRegistry: EventSchemaRegistry;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `schemaRegistry` | property | <code>schemaRegistry: EventSchemaRegistry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ListEventStreamHeadsRequest`

List Event Stream Heads Request interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ListEventStreamHeadsRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export interface ListEventStreamHeadsRequest {
    cursor?: string;
    limit?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cursor` | property | <code>cursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ListEventStreamHeadsResult`

List Event Stream Heads Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ListEventStreamHeadsResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### Declaration

```text
export interface ListEventStreamHeadsResult {
    heads: EventStreamHead[];
    nextCursor?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `heads` | property | <code>heads: EventStreamHead[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextCursor` | property | <code>nextCursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
