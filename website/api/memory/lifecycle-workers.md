# `@codesoul-co/hypha-memory` / `lifecycle-workers`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/lifecycle-workers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)
- Exports: **15**

## Using this module

Use the Lifecycle workers module for using the public contracts and operations for this capability boundary. It exports 8 classes, 5 interfaces, 2 types.

### Import from the package entrypoint

```ts
import {
  InMemoryMemoryLifecycleTaskStore,
  LeasedMemoryLifecycleWorker,
  MemoryConsolidationWorker,
  MemoryDecayWorker,
  MemoryDeletionWorker,
  MemoryReindexWorker,
  MemoryRetentionWorker,
  ProviderReconciliationWorker,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryLifecycleTask,
  MemoryLifecycleTaskStore,
  MemoryLifecycleWorkerEvent,
  MemoryLifecycleWorkerOptions,
  MemoryLifecycleWorkerRunResult,
  MemoryLifecycleTaskHandler,
  MemoryLifecycleWorkerType,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 8 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMemoryLifecycleTaskStore` | class | <code>new InMemoryMemoryLifecycleTaskStore(): InMemoryMemoryLifecycleTaskStore</code> | In Memory Memory Lifecycle Task Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `LeasedMemoryLifecycleWorker` | class | <code>new LeasedMemoryLifecycleWorker(options: MemoryLifecycleWorkerOptions): LeasedMemoryLifecycleWorker</code> | Leased Memory Lifecycle Worker class with 6 public constructor or member entries; its exact declarations are listed below. |
| `MemoryConsolidationWorker` | class | <code>new MemoryConsolidationWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryConsolidationWorker</code> | Memory Consolidation Worker class with 6 public constructor or member entries; its exact declarations are listed below. |
| `MemoryDecayWorker` | class | <code>new MemoryDecayWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDecayWorker</code> | Memory Decay Worker class with 6 public constructor or member entries; its exact declarations are listed below. |
| `MemoryDeletionWorker` | class | <code>new MemoryDeletionWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDeletionWorker</code> | Memory Deletion Worker class with 6 public constructor or member entries; its exact declarations are listed below. |
| `MemoryReindexWorker` | class | <code>new MemoryReindexWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryReindexWorker</code> | Memory Reindex Worker class with 6 public constructor or member entries; its exact declarations are listed below. |
| `MemoryRetentionWorker` | class | <code>new MemoryRetentionWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryRetentionWorker</code> | Memory Retention Worker class with 6 public constructor or member entries; its exact declarations are listed below. |
| `ProviderReconciliationWorker` | class | <code>new ProviderReconciliationWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): ProviderReconciliationWorker</code> | Provider Reconciliation Worker class with 6 public constructor or member entries; its exact declarations are listed below. |
| `MemoryLifecycleTask` | interface | <code>interface MemoryLifecycleTask</code> | Memory Lifecycle Task interface with 15 public fields or methods. |
| `MemoryLifecycleTaskStore` | interface | <code>interface MemoryLifecycleTaskStore</code> | Memory Lifecycle Task Store interface with 6 public fields or methods. |
| `MemoryLifecycleWorkerEvent` | interface | <code>interface MemoryLifecycleWorkerEvent</code> | Memory Lifecycle Worker Event interface with 5 public fields or methods. |
| `MemoryLifecycleWorkerOptions` | interface | <code>interface MemoryLifecycleWorkerOptions</code> | Memory Lifecycle Worker Options interface with 12 public fields or methods. |
| `MemoryLifecycleWorkerRunResult` | interface | <code>interface MemoryLifecycleWorkerRunResult</code> | Memory Lifecycle Worker Run Result interface with 4 public fields or methods. |
| `MemoryLifecycleTaskHandler` | type | <code>type MemoryLifecycleTaskHandler = (task: MemoryLifecycleTask, signal: AbortSignal) =&gt; Promise&lt;void&gt;</code> | Public type alias for Memory Lifecycle Task Handler; the declaration contains its complete type expression. |
| `MemoryLifecycleWorkerType` | type | <code>type MemoryLifecycleWorkerType = 'retention' &#124; 'decay' &#124; 'consolidation' &#124; 'deletion' &#124; 'reindex' &#124; 'provider_reconciliation'</code> | Public type alias for Memory Lifecycle Worker Type; the declaration contains its complete type expression. |

## `InMemoryMemoryLifecycleTaskStore`

In Memory Memory Lifecycle Task Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryMemoryLifecycleTaskStore } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export declare class InMemoryMemoryLifecycleTaskStore implements MemoryLifecycleTaskStore {
    enqueue(task: MemoryLifecycleTask): Promise<void>;
    lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise<MemoryLifecycleTask[]>;
    renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise<boolean>;
    complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise<boolean>;
    fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise<boolean>;
    list(type?: MemoryLifecycleWorkerType): Promise<MemoryLifecycleTask[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): InMemoryMemoryLifecycleTaskStore</code> | Creates an instance of this class. |
| `enqueue` | method | <code>enqueue(task: MemoryLifecycleTask): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fail` | method | <code>fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `lease` | method | <code>lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryLifecycleTask[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(type?: MemoryLifecycleWorkerType): Promise&lt;MemoryLifecycleTask[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LeasedMemoryLifecycleWorker`

Leased Memory Lifecycle Worker class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LeasedMemoryLifecycleWorker } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export declare class LeasedMemoryLifecycleWorker {
    constructor(options: MemoryLifecycleWorkerOptions);
    runOnce(): Promise<MemoryLifecycleWorkerRunResult>;
    start(): void;
    stop(): void;
    drain(): Promise<void>;
    stopAndDrain(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: MemoryLifecycleWorkerOptions): LeasedMemoryLifecycleWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `runOnce` | method | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stop` | method | <code>stop(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryConsolidationWorker`

Memory Consolidation Worker class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryConsolidationWorker } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export declare class MemoryConsolidationWorker extends LeasedMemoryLifecycleWorker {
    constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryConsolidationWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `runOnce` | method | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stop` | method | <code>stop(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryDecayWorker`

Memory Decay Worker class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryDecayWorker } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export declare class MemoryDecayWorker extends LeasedMemoryLifecycleWorker {
    constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDecayWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `runOnce` | method | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stop` | method | <code>stop(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryDeletionWorker`

Memory Deletion Worker class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryDeletionWorker } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export declare class MemoryDeletionWorker extends LeasedMemoryLifecycleWorker {
    constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDeletionWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `runOnce` | method | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stop` | method | <code>stop(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryReindexWorker`

Memory Reindex Worker class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryReindexWorker } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export declare class MemoryReindexWorker extends LeasedMemoryLifecycleWorker {
    constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryReindexWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `runOnce` | method | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stop` | method | <code>stop(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryRetentionWorker`

Memory Retention Worker class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryRetentionWorker } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export declare class MemoryRetentionWorker extends LeasedMemoryLifecycleWorker {
    constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryRetentionWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `runOnce` | method | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stop` | method | <code>stop(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ProviderReconciliationWorker`

Provider Reconciliation Worker class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ProviderReconciliationWorker } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export declare class ProviderReconciliationWorker extends LeasedMemoryLifecycleWorker {
    constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): ProviderReconciliationWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `runOnce` | method | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stop` | method | <code>stop(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryLifecycleTask`

Memory Lifecycle Task interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { MemoryLifecycleTask } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export interface MemoryLifecycleTask<TPayload = unknown> {
    id: string;
    operationId: string;
    type: MemoryLifecycleWorkerType;
    scopeHash: string;
    payload: TPayload;
    state: 'pending' | 'processing' | 'completed' | 'failed' | 'dead_letter';
    attempts: number;
    availableAt: string;
    leaseOwner?: string;
    leaseToken?: string;
    leaseExpiresAt?: string;
    fencingToken?: number;
    lastError?: NormalizedMemoryError;
    createdAt: string;
    updatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `availableAt` | property | <code>availableAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastError` | property | <code>lastError?: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseExpiresAt` | property | <code>leaseExpiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseOwner` | property | <code>leaseOwner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseToken` | property | <code>leaseToken?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: TPayload</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: "completed" &#124; "failed" &#124; "processing" &#124; "pending" &#124; "dead_letter"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: MemoryLifecycleWorkerType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryLifecycleTaskStore`

Memory Lifecycle Task Store interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MemoryLifecycleTaskStore } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export interface MemoryLifecycleTaskStore {
    enqueue(task: MemoryLifecycleTask): Promise<void>;
    lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise<MemoryLifecycleTask[]>;
    renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise<boolean>;
    complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise<boolean>;
    fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise<boolean>;
    list(type?: MemoryLifecycleWorkerType): Promise<MemoryLifecycleTask[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `enqueue` | method | <code>enqueue(task: MemoryLifecycleTask): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fail` | method | <code>fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `lease` | method | <code>lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryLifecycleTask[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(type?: MemoryLifecycleWorkerType): Promise&lt;MemoryLifecycleTask[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryLifecycleWorkerEvent`

Memory Lifecycle Worker Event interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryLifecycleWorkerEvent } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export interface MemoryLifecycleWorkerEvent {
    type: 'memory.worker.started' | 'memory.worker.stopped' | 'memory.worker.failed' | 'memory.worker.dead_lettered';
    workerType: MemoryLifecycleWorkerType;
    taskId?: string;
    operationId?: string;
    error?: NormalizedMemoryError;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error?: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskId` | property | <code>taskId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "memory.worker.started" &#124; "memory.worker.stopped" &#124; "memory.worker.failed" &#124; "memory.worker.dead_lettered"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workerType` | property | <code>workerType: MemoryLifecycleWorkerType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryLifecycleWorkerOptions`

Memory Lifecycle Worker Options interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { MemoryLifecycleWorkerOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export interface MemoryLifecycleWorkerOptions {
    type: MemoryLifecycleWorkerType;
    ownerId: string;
    store: MemoryLifecycleTaskStore;
    handler: MemoryLifecycleTaskHandler;
    batchSize?: number;
    leaseMs?: number;
    renewalMs?: number;
    retryDelayMs?: number;
    maxAttempts?: number;
    pollIntervalMs?: number;
    now?: () => Date;
    onEvent?: (event: MemoryLifecycleWorkerEvent) => void | Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `batchSize` | property | <code>batchSize?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `handler` | method | <code>handler(task: MemoryLifecycleTask, signal: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `leaseMs` | property | <code>leaseMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `onEvent` | method | <code>onEvent?(event: MemoryLifecycleWorkerEvent): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pollIntervalMs` | property | <code>pollIntervalMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `renewalMs` | property | <code>renewalMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryDelayMs` | property | <code>retryDelayMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `store` | property | <code>store: MemoryLifecycleTaskStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: MemoryLifecycleWorkerType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryLifecycleWorkerRunResult`

Memory Lifecycle Worker Run Result interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryLifecycleWorkerRunResult } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export interface MemoryLifecycleWorkerRunResult {
    leased: number;
    completed: number;
    failed: number;
    deadLettered: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `completed` | property | <code>completed: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadLettered` | property | <code>deadLettered: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failed` | property | <code>failed: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leased` | property | <code>leased: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryLifecycleTaskHandler`

Public type alias for Memory Lifecycle Task Handler; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryLifecycleTaskHandler } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export type MemoryLifecycleTaskHandler = (task: MemoryLifecycleTask, signal: AbortSignal) => Promise<void>;
```

## `MemoryLifecycleWorkerType`

Public type alias for Memory Lifecycle Worker Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryLifecycleWorkerType } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### Declaration

```text
export type MemoryLifecycleWorkerType = 'retention' | 'decay' | 'consolidation' | 'deletion' | 'reindex' | 'provider_reconciliation';
```
