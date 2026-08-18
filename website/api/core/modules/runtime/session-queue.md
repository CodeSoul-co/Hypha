# `@codesoul-co/hypha-core` / `modules/runtime/session-queue`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/session-queue.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-queue.ts)
- Exports: **4**

## Using this module

Use the Session queue module for executing runtime behavior at this boundary. It exports 1 class, 1 function, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  InMemorySessionQueue,
  createSessionQueueHealthSnapshot,
} from '@codesoul-co/hypha-core';

import type {
  InMemorySessionQueueOptions,
  SessionQueue,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemorySessionQueue` | class | <code>new InMemorySessionQueue(options?: InMemorySessionQueueOptions): InMemorySessionQueue</code> | In Memory Session Queue class with 14 public constructor or member entries; its exact declarations are listed below. |
| `createSessionQueueHealthSnapshot` | function | <code>createSessionQueueHealthSnapshot(records: readonly SessionCommandRecord[], checkedAt: string, recoveredExpiredLeases?: number): SessionQueueHealthSnapshot</code> | Create Session Queue Health Snapshot function with 1 public call signature; parameters and return types are listed below. |
| `InMemorySessionQueueOptions` | interface | <code>interface InMemorySessionQueueOptions</code> | In Memory Session Queue Options interface with 8 public fields or methods. |
| `SessionQueue` | interface | <code>interface SessionQueue</code> | Session Queue interface with 13 public fields or methods. |

## `InMemorySessionQueue`

In Memory Session Queue class with 14 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemorySessionQueue } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-queue.ts)

### Declaration

```text
export declare class InMemorySessionQueue implements SessionQueue {
    constructor(options?: InMemorySessionQueueOptions);
    enqueue(request: EnqueueSessionCommandRequest): Promise<SessionCommandRecord>;
    claim(request: ClaimSessionCommandRequest): Promise<SessionCommandRecord | null>;
    renew(request: RenewSessionCommandRequest): Promise<SessionCommandClaim>;
    complete(request: CompleteSessionCommandRequest): Promise<void>;
    fail(request: FailSessionCommandRequest): Promise<void>;
    release(request: ReleaseSessionCommandRequest): Promise<void>;
    list(request: ListSessionCommandsRequest): Promise<SessionCommandRecord[]>;
    cancelPending(request: CancelSessionCommandsRequest): Promise<CancelSessionCommandsResult>;
    redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise<SessionCommandRecord>;
    closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise<SessionCommandRecord>;
    listStuck(request: ListStuckSessionCommandsRequest): Promise<StuckSessionCommand[]>;
    drain(scope: SessionQueueScope): Promise<void>;
    health(): Promise<ProviderHealth & {
            details: SessionQueueHealthSnapshot;
        }>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelPending` | method | <code>cancelPending(request: CancelSessionCommandsRequest): Promise&lt;CancelSessionCommandsResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `claim` | method | <code>claim(request: ClaimSessionCommandRequest): Promise&lt;SessionCommandRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `closeDeadLetter` | method | <code>closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `complete` | method | <code>complete(request: CompleteSessionCommandRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: InMemorySessionQueueOptions): InMemorySessionQueue</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(scope: SessionQueueScope): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `enqueue` | method | <code>enqueue(request: EnqueueSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fail` | method | <code>fail(request: FailSessionCommandRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth &amp; { details: SessionQueueHealthSnapshot; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: ListSessionCommandsRequest): Promise&lt;SessionCommandRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listStuck` | method | <code>listStuck(request: ListStuckSessionCommandsRequest): Promise&lt;StuckSessionCommand[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `redriveDeadLetter` | method | <code>redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `release` | method | <code>release(request: ReleaseSessionCommandRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(request: RenewSessionCommandRequest): Promise&lt;SessionCommandClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `createSessionQueueHealthSnapshot`

Create Session Queue Health Snapshot function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createSessionQueueHealthSnapshot } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-queue.ts)

### Declaration

```text
export declare function createSessionQueueHealthSnapshot(records: readonly SessionCommandRecord[], checkedAt: string, recoveredExpiredLeases?: number): SessionQueueHealthSnapshot;
```

### Call signature

```text
createSessionQueueHealthSnapshot(records: readonly SessionCommandRecord[], checkedAt: string, recoveredExpiredLeases?: number): SessionQueueHealthSnapshot
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `records` | <code>readonly SessionCommandRecord[]</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `checkedAt` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `recoveredExpiredLeases` | <code>number</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SessionQueueHealthSnapshot`
- Description: The return contract is defined by the type shown above.

## `InMemorySessionQueueOptions`

In Memory Session Queue Options interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { InMemorySessionQueueOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-queue.ts)

### Declaration

```text
export interface InMemorySessionQueueOptions {
    now?: () => string;
    duplicatePolicy?: 'reuse' | 'reject';
    maxPendingPerSession?: number;
    maxPendingPerUser?: number;
    maxPendingGlobal?: number;
    maxConcurrentSessions?: number;
    maxConcurrentSessionsPerUser?: number;
    priorityAgingMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `duplicatePolicy` | property | <code>duplicatePolicy?: "reuse" &#124; "reject"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxConcurrentSessions` | property | <code>maxConcurrentSessions?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxConcurrentSessionsPerUser` | property | <code>maxConcurrentSessionsPerUser?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxPendingGlobal` | property | <code>maxPendingGlobal?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxPendingPerSession` | property | <code>maxPendingPerSession?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxPendingPerUser` | property | <code>maxPendingPerUser?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `priorityAgingMs` | property | <code>priorityAgingMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionQueue`

Session Queue interface with 13 public fields or methods.

- Kind: interface
- Import: `import type { SessionQueue } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-queue.ts)

### Declaration

```text
export interface SessionQueue {
    enqueue(request: EnqueueSessionCommandRequest): Promise<SessionCommandRecord>;
    claim(request: ClaimSessionCommandRequest): Promise<SessionCommandRecord | null>;
    renew(request: RenewSessionCommandRequest): Promise<SessionCommandClaim>;
    complete(request: CompleteSessionCommandRequest): Promise<void>;
    fail(request: FailSessionCommandRequest): Promise<void>;
    release(request: ReleaseSessionCommandRequest): Promise<void>;
    list(request: ListSessionCommandsRequest): Promise<SessionCommandRecord[]>;
    cancelPending(request: CancelSessionCommandsRequest): Promise<CancelSessionCommandsResult>;
    redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise<SessionCommandRecord>;
    closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise<SessionCommandRecord>;
    listStuck(request: ListStuckSessionCommandsRequest): Promise<StuckSessionCommand[]>;
    drain(scope: SessionQueueScope): Promise<void>;
    health(): Promise<ProviderHealth & {
        details: SessionQueueHealthSnapshot;
    }>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelPending` | method | <code>cancelPending(request: CancelSessionCommandsRequest): Promise&lt;CancelSessionCommandsResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `claim` | method | <code>claim(request: ClaimSessionCommandRequest): Promise&lt;SessionCommandRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `closeDeadLetter` | method | <code>closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `complete` | method | <code>complete(request: CompleteSessionCommandRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `drain` | method | <code>drain(scope: SessionQueueScope): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `enqueue` | method | <code>enqueue(request: EnqueueSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fail` | method | <code>fail(request: FailSessionCommandRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth &amp; { details: SessionQueueHealthSnapshot; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: ListSessionCommandsRequest): Promise&lt;SessionCommandRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listStuck` | method | <code>listStuck(request: ListStuckSessionCommandsRequest): Promise&lt;StuckSessionCommand[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `redriveDeadLetter` | method | <code>redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `release` | method | <code>release(request: ReleaseSessionCommandRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(request: RenewSessionCommandRequest): Promise&lt;SessionCommandClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |
