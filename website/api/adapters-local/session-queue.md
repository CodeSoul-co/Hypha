# `@codesoul-co/hypha-adapters-local` / `session-queue`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/session-queue.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/session-queue.ts)
- Exports: **2**

## Using this module

Use the Session queue module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  SQLiteSessionQueue,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteSessionQueueOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteSessionQueue` | class | <code>new SQLiteSessionQueue(options: SQLiteSessionQueueOptions): SQLiteSessionQueue</code> | SQLite Session Queue class with 15 public constructor or member entries; its exact declarations are listed below. |
| `SQLiteSessionQueueOptions` | interface | <code>interface SQLiteSessionQueueOptions</code> | SQLite Session Queue Options interface with 10 public fields or methods. |

## `SQLiteSessionQueue`

SQLite Session Queue class with 15 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SQLiteSessionQueue } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/session-queue.ts)

### Declaration

```text
export declare class SQLiteSessionQueue implements SessionQueue {
    constructor(options: SQLiteSessionQueueOptions);
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
    close(): void;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelPending` | method | <code>cancelPending(request: CancelSessionCommandsRequest): Promise&lt;CancelSessionCommandsResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `claim` | method | <code>claim(request: ClaimSessionCommandRequest): Promise&lt;SessionCommandRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): void</code> | Public method; parameters and return type are shown in the signature. |
| `closeDeadLetter` | method | <code>closeDeadLetter(request: CloseDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `complete` | method | <code>complete(request: CompleteSessionCommandRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: SQLiteSessionQueueOptions): SQLiteSessionQueue</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(scope: SessionQueueScope): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `enqueue` | method | <code>enqueue(request: EnqueueSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fail` | method | <code>fail(request: FailSessionCommandRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth &amp; { details: SessionQueueHealthSnapshot; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: ListSessionCommandsRequest): Promise&lt;SessionCommandRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listStuck` | method | <code>listStuck(request: ListStuckSessionCommandsRequest): Promise&lt;StuckSessionCommand[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `redriveDeadLetter` | method | <code>redriveDeadLetter(request: RedriveDeadLetterSessionCommandRequest): Promise&lt;SessionCommandRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `release` | method | <code>release(request: ReleaseSessionCommandRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(request: RenewSessionCommandRequest): Promise&lt;SessionCommandClaim&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SQLiteSessionQueueOptions`

SQLite Session Queue Options interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { SQLiteSessionQueueOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/session-queue.ts)

### Declaration

```text
export interface SQLiteSessionQueueOptions {
    filename: string;
    now?: () => string;
    duplicatePolicy?: 'reuse' | 'reject';
    maxPendingPerSession?: number;
    maxPendingPerUser?: number;
    maxPendingGlobal?: number;
    maxConcurrentSessions?: number;
    maxConcurrentSessionsPerUser?: number;
    priorityAgingMs?: number;
    drainPollMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `drainPollMs` | property | <code>drainPollMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `duplicatePolicy` | property | <code>duplicatePolicy?: "reuse" &#124; "reject"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `filename` | property | <code>filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxConcurrentSessions` | property | <code>maxConcurrentSessions?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxConcurrentSessionsPerUser` | property | <code>maxConcurrentSessionsPerUser?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxPendingGlobal` | property | <code>maxPendingGlobal?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxPendingPerSession` | property | <code>maxPendingPerSession?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxPendingPerUser` | property | <code>maxPendingPerUser?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `priorityAgingMs` | property | <code>priorityAgingMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
