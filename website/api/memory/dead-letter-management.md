# `@codesoul-co/hypha-memory` / `dead-letter-management`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/dead-letter-management.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)
- Exports: **10**

## Using this module

Use the Dead letter management module for using the public contracts and operations for this capability boundary. It exports 2 classes, 2 functions, 5 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  InMemoryMemoryDeadLetterRepository,
  MemoryDeadLetterManager,
  deadLetterFromTask,
  inspectMemoryLifecycleDeadLetters,
} from '@codesoul-co/hypha-memory';

import type {
  DeadLetterDispositionRequest,
  MemoryDeadLetterInspection,
  MemoryDeadLetterQuery,
  MemoryDeadLetterRecord,
  MemoryDeadLetterRepository,
  MemoryDeadLetterState,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMemoryDeadLetterRepository` | class | <code>new InMemoryMemoryDeadLetterRepository(): InMemoryMemoryDeadLetterRepository</code> | In Memory Memory Dead Letter Repository class with 4 public constructor or member entries; its exact declarations are listed below. |
| `MemoryDeadLetterManager` | class | <code>new MemoryDeadLetterManager(repository: MemoryDeadLetterRepository): MemoryDeadLetterManager</code> | Memory Dead Letter Manager class with 4 public constructor or member entries; its exact declarations are listed below. |
| `deadLetterFromTask` | function | <code>deadLetterFromTask(task: MemoryLifecycleTask, occurredAt?: string): MemoryDeadLetterRecord</code> | Dead Letter From Task function with 1 public call signature; parameters and return types are listed below. |
| `inspectMemoryLifecycleDeadLetters` | function | <code>inspectMemoryLifecycleDeadLetters(store: MemoryLifecycleTaskStore, query?: { workerType?: MemoryLifecycleWorkerType; scopeHash?: string; }): Promise&lt;MemoryDeadLetterInspection[]&gt;</code> | Returns operator-safe DLQ metadata without exposing task payloads or Provider messages. |
| `DeadLetterDispositionRequest` | interface | <code>interface DeadLetterDispositionRequest</code> | Dead Letter Disposition Request interface with 7 public fields or methods. |
| `MemoryDeadLetterInspection` | interface | <code>interface MemoryDeadLetterInspection</code> | Memory Dead Letter Inspection interface with 9 public fields or methods. |
| `MemoryDeadLetterQuery` | interface | <code>interface MemoryDeadLetterQuery</code> | Memory Dead Letter Query interface with 4 public fields or methods. |
| `MemoryDeadLetterRecord` | interface | <code>interface MemoryDeadLetterRecord</code> | Memory Dead Letter Record interface with 14 public fields or methods. |
| `MemoryDeadLetterRepository` | interface | <code>interface MemoryDeadLetterRepository</code> | Memory Dead Letter Repository interface with 3 public fields or methods. |
| `MemoryDeadLetterState` | type | <code>type MemoryDeadLetterState = 'dead_letter' &#124; 'replay_queued' &#124; 'discarded'</code> | Public type alias for Memory Dead Letter State; the declaration contains its complete type expression. |

## `InMemoryMemoryDeadLetterRepository`

In Memory Memory Dead Letter Repository class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryMemoryDeadLetterRepository } from '@codesoul-co/hypha-memory';`
- Source module: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### Declaration

```text
export declare class InMemoryMemoryDeadLetterRepository implements MemoryDeadLetterRepository {
    get(id: string): Promise<MemoryDeadLetterRecord | null>;
    list(query?: MemoryDeadLetterQuery): Promise<MemoryDeadLetterRecord[]>;
    set(record: MemoryDeadLetterRecord): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryMemoryDeadLetterRepository</code> | Creates an instance of this class. |
| `get` | method | <code>get(id: string): Promise&lt;MemoryDeadLetterRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(query?: MemoryDeadLetterQuery): Promise&lt;MemoryDeadLetterRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(record: MemoryDeadLetterRecord): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryDeadLetterManager`

Memory Dead Letter Manager class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryDeadLetterManager } from '@codesoul-co/hypha-memory';`
- Source module: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### Declaration

```text
export declare class MemoryDeadLetterManager {
    constructor(repository: MemoryDeadLetterRepository);
    query(input?: MemoryDeadLetterQuery): Promise<MemoryDeadLetterRecord[]>;
    replay(request: DeadLetterDispositionRequest): Promise<MemoryDeadLetterRecord>;
    discard(request: DeadLetterDispositionRequest): Promise<MemoryDeadLetterRecord>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(repository: MemoryDeadLetterRepository): MemoryDeadLetterManager</code> | Creates an instance of this class. |
| `discard` | method | <code>discard(request: DeadLetterDispositionRequest): Promise&lt;MemoryDeadLetterRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `query` | method | <code>query(input?: MemoryDeadLetterQuery): Promise&lt;MemoryDeadLetterRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `replay` | method | <code>replay(request: DeadLetterDispositionRequest): Promise&lt;MemoryDeadLetterRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `deadLetterFromTask`

Dead Letter From Task function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { deadLetterFromTask } from '@codesoul-co/hypha-memory';`
- Source module: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### Declaration

```text
export declare function deadLetterFromTask(task: MemoryLifecycleTask, occurredAt?: string): MemoryDeadLetterRecord;
```

### Call signature

```text
deadLetterFromTask(task: MemoryLifecycleTask, occurredAt?: string): MemoryDeadLetterRecord
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `task` | <code>MemoryLifecycleTask&lt;unknown&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `occurredAt` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryDeadLetterRecord`
- Description: The return contract is defined by the type shown above.

## `inspectMemoryLifecycleDeadLetters`

Returns operator-safe DLQ metadata without exposing task payloads or Provider messages.

- Kind: function
- Import: `import { inspectMemoryLifecycleDeadLetters } from '@codesoul-co/hypha-memory';`
- Source module: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### Declaration

```text
export declare function inspectMemoryLifecycleDeadLetters(store: MemoryLifecycleTaskStore, query?: {
    workerType?: MemoryLifecycleWorkerType;
    scopeHash?: string;
}): Promise<MemoryDeadLetterInspection[]>;
```

### Call signature

```text
inspectMemoryLifecycleDeadLetters(store: MemoryLifecycleTaskStore, query?: { workerType?: MemoryLifecycleWorkerType; scopeHash?: string; }): Promise<MemoryDeadLetterInspection[]>
```

Returns operator-safe DLQ metadata without exposing task payloads or Provider messages.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `store` | <code>MemoryLifecycleTaskStore</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `query` | <code>{ workerType?: MemoryLifecycleWorkerType; scopeHash?: string; }</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<MemoryDeadLetterInspection[]>`
- Description: The return contract is defined by the type shown above.

## `DeadLetterDispositionRequest`

Dead Letter Disposition Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { DeadLetterDispositionRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### Declaration

```text
export interface DeadLetterDispositionRequest {
    deadLetterId: string;
    actorId: string;
    reason: string;
    expectedFailureFingerprint: string;
    confirmation: 'replay' | 'discard';
    idempotencyKey?: string;
    occurredAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actorId` | property | <code>actorId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `confirmation` | property | <code>confirmation: "replay" &#124; "discard"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadLetterId` | property | <code>deadLetterId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedFailureFingerprint` | property | <code>expectedFailureFingerprint: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `occurredAt` | property | <code>occurredAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryDeadLetterInspection`

Memory Dead Letter Inspection interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { MemoryDeadLetterInspection } from '@codesoul-co/hypha-memory';`
- Source module: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### Declaration

```text
export interface MemoryDeadLetterInspection {
    taskId: string;
    operationId: string;
    workerType: MemoryLifecycleWorkerType;
    scopeHash: string;
    attempts: number;
    error: Pick<NormalizedMemoryError, 'code' | 'retryable' | 'providerCode'>;
    payloadHash: string;
    createdAt: string;
    updatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error: Pick&lt;NormalizedMemoryError, "code" &#124; "retryable" &#124; "providerCode"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskId` | property | <code>taskId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workerType` | property | <code>workerType: MemoryLifecycleWorkerType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryDeadLetterQuery`

Memory Dead Letter Query interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryDeadLetterQuery } from '@codesoul-co/hypha-memory';`
- Source module: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### Declaration

```text
export interface MemoryDeadLetterQuery {
    workerType?: MemoryLifecycleWorkerType;
    scopeHash?: string;
    state?: MemoryDeadLetterState;
    failureFingerprint?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `failureFingerprint` | property | <code>failureFingerprint?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state?: MemoryDeadLetterState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workerType` | property | <code>workerType?: MemoryLifecycleWorkerType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryDeadLetterRecord`

Memory Dead Letter Record interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { MemoryDeadLetterRecord } from '@codesoul-co/hypha-memory';`
- Source module: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### Declaration

```text
export interface MemoryDeadLetterRecord {
    id: string;
    taskId: string;
    operationId: string;
    workerType: MemoryLifecycleWorkerType;
    scopeHash: string;
    state: MemoryDeadLetterState;
    attempts: number;
    failure: NormalizedMemoryError;
    failureFingerprint: string;
    payload: unknown;
    idempotencyKey?: string;
    createdAt: string;
    updatedAt: string;
    disposition?: {
        actorId: string;
        reason: string;
        occurredAt: string;
    };
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `disposition` | property | <code>disposition?: { actorId: string; reason: string; occurredAt: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failure` | property | <code>failure: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failureFingerprint` | property | <code>failureFingerprint: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: MemoryDeadLetterState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskId` | property | <code>taskId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workerType` | property | <code>workerType: MemoryLifecycleWorkerType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryDeadLetterRepository`

Memory Dead Letter Repository interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryDeadLetterRepository } from '@codesoul-co/hypha-memory';`
- Source module: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### Declaration

```text
export interface MemoryDeadLetterRepository {
    get(id: string): Promise<MemoryDeadLetterRecord | null>;
    list(query?: MemoryDeadLetterQuery): Promise<MemoryDeadLetterRecord[]>;
    set(record: MemoryDeadLetterRecord): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(id: string): Promise&lt;MemoryDeadLetterRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(query?: MemoryDeadLetterQuery): Promise&lt;MemoryDeadLetterRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(record: MemoryDeadLetterRecord): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryDeadLetterState`

Public type alias for Memory Dead Letter State; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryDeadLetterState } from '@codesoul-co/hypha-memory';`
- Source module: [`dead-letter-management`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/dead-letter-management.ts)

### Declaration

```text
export type MemoryDeadLetterState = 'dead_letter' | 'replay_queued' | 'discarded';
```
