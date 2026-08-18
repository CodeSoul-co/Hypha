# `@codesoul-co/hypha-memory` / `index-outbox`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/index-outbox.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)
- Exports: **11**

## Using this module

Use the Index outbox module for using the public contracts and operations for this capability boundary. It exports 3 classes, 8 interfaces.

### Import from the package entrypoint

```ts
import {
  IndexOutboxWorker,
  InMemoryLocalVectorStoreAdapter,
  LegacyVectorIndexStoreAdapter,
} from '@codesoul-co/hypha-memory';

import type {
  IndexOutboxWorkerEvent,
  IndexOutboxWorkerOptions,
  IndexOutboxWorkerRunResult,
  ManagedVectorPoint,
  ManagedVectorSearchRequest,
  ManagedVectorSearchResult,
  ManagedVectorStoreAdapter,
  ManagedVectorWriteOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 8 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `IndexOutboxWorker` | class | <code>new IndexOutboxWorker(options: IndexOutboxWorkerOptions): IndexOutboxWorker</code> | Index Outbox Worker class with 6 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryLocalVectorStoreAdapter` | class | <code>new InMemoryLocalVectorStoreAdapter(id?: string): InMemoryLocalVectorStoreAdapter</code> | In Memory Local Vector Store Adapter class with 6 public constructor or member entries; its exact declarations are listed below. |
| `LegacyVectorIndexStoreAdapter` | class | <code>new LegacyVectorIndexStoreAdapter(id: string, provider: VectorIndexProvider): LegacyVectorIndexStoreAdapter</code> | Legacy Vector Index Store Adapter class with 6 public constructor or member entries; its exact declarations are listed below. |
| `IndexOutboxWorkerEvent` | interface | <code>interface IndexOutboxWorkerEvent</code> | Index Outbox Worker Event interface with 7 public fields or methods. |
| `IndexOutboxWorkerOptions` | interface | <code>interface IndexOutboxWorkerOptions</code> | Index Outbox Worker Options interface with 14 public fields or methods. |
| `IndexOutboxWorkerRunResult` | interface | <code>interface IndexOutboxWorkerRunResult</code> | Index Outbox Worker Run Result interface with 4 public fields or methods. |
| `ManagedVectorPoint` | interface | <code>interface ManagedVectorPoint</code> | Managed Vector Point interface with 3 public fields or methods. |
| `ManagedVectorSearchRequest` | interface | <code>interface ManagedVectorSearchRequest</code> | Managed Vector Search Request interface with 4 public fields or methods. |
| `ManagedVectorSearchResult` | interface | <code>interface ManagedVectorSearchResult</code> | Managed Vector Search Result interface with 3 public fields or methods. |
| `ManagedVectorStoreAdapter` | interface | <code>interface ManagedVectorStoreAdapter</code> | Managed Vector Store Adapter interface with 5 public fields or methods. |
| `ManagedVectorWriteOptions` | interface | <code>interface ManagedVectorWriteOptions</code> | Managed Vector Write Options interface with 2 public fields or methods. |

## `IndexOutboxWorker`

Index Outbox Worker class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { IndexOutboxWorker } from '@codesoul-co/hypha-memory';`
- Source module: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### Declaration

```text
export declare class IndexOutboxWorker {
    constructor(options: IndexOutboxWorkerOptions);
    runOnce(): Promise<IndexOutboxWorkerRunResult>;
    start(): void;
    stop(): void;
    drain(): Promise<void>;
    stopAndDrain(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: IndexOutboxWorkerOptions): IndexOutboxWorker</code> | Creates an instance of this class. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `runOnce` | method | <code>runOnce(): Promise&lt;IndexOutboxWorkerRunResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stop` | method | <code>stop(): void</code> | Public method; parameters and return type are shown in the signature. |
| `stopAndDrain` | method | <code>stopAndDrain(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryLocalVectorStoreAdapter`

In Memory Local Vector Store Adapter class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryLocalVectorStoreAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### Declaration

```text
export declare class InMemoryLocalVectorStoreAdapter implements ManagedVectorStoreAdapter {
    readonly id: string;
    constructor(id?: string);
    upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise<void>;
    delete(ids: string[], options?: ManagedVectorWriteOptions): Promise<void>;
    search(request: ManagedVectorSearchRequest): Promise<ManagedVectorSearchResult[]>;
    health(): Promise<ProviderHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(id?: string): InMemoryLocalVectorStoreAdapter</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `search` | method | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `upsert` | method | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LegacyVectorIndexStoreAdapter`

Legacy Vector Index Store Adapter class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LegacyVectorIndexStoreAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### Declaration

```text
export declare class LegacyVectorIndexStoreAdapter implements ManagedVectorStoreAdapter {
    readonly id: string;
    constructor(id: string, provider: VectorIndexProvider);
    upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise<void>;
    delete(ids: string[], options?: ManagedVectorWriteOptions): Promise<void>;
    search(request: ManagedVectorSearchRequest): Promise<ManagedVectorSearchResult[]>;
    health(): Promise<ProviderHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(id: string, provider: VectorIndexProvider): LegacyVectorIndexStoreAdapter</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `search` | method | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `upsert` | method | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `IndexOutboxWorkerEvent`

Index Outbox Worker Event interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { IndexOutboxWorkerEvent } from '@codesoul-co/hypha-memory';`
- Source module: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### Declaration

```text
export interface IndexOutboxWorkerEvent {
    type: 'memory.index.started' | 'memory.index.completed' | 'memory.index.partial' | 'memory.index.failed';
    operationId: string;
    outboxId: string;
    memoryId: string;
    memoryVersionId: string;
    scopeHash: string;
    error?: NormalizedMemoryError;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error?: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryId` | property | <code>memoryId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryVersionId` | property | <code>memoryVersionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outboxId` | property | <code>outboxId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "memory.index.started" &#124; "memory.index.completed" &#124; "memory.index.partial" &#124; "memory.index.failed"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `IndexOutboxWorkerOptions`

Index Outbox Worker Options interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { IndexOutboxWorkerOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### Declaration

```text
export interface IndexOutboxWorkerOptions {
    ownerId: string;
    outboxStore: MemoryIndexOutboxStore;
    recordStore: ManagedMemoryRecordStore;
    embeddingProvider: EmbeddingProvider;
    vectorStores: ManagedVectorStoreAdapter[];
    batchSize?: number;
    leaseMs?: number;
    renewalMs?: number;
    maxAttempts?: number;
    retryDelayMs?: number;
    pollIntervalMs?: number;
    now?: () => Date;
    onEvent?: (event: IndexOutboxWorkerEvent) => void | Promise<void>;
    onError?: (error: NormalizedMemoryError) => void | Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `batchSize` | property | <code>batchSize?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `embeddingProvider` | property | <code>embeddingProvider: EmbeddingProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseMs` | property | <code>leaseMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `onError` | method | <code>onError?(error: NormalizedMemoryError): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `onEvent` | method | <code>onEvent?(event: IndexOutboxWorkerEvent): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `outboxStore` | property | <code>outboxStore: MemoryIndexOutboxStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pollIntervalMs` | property | <code>pollIntervalMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordStore` | property | <code>recordStore: ManagedMemoryRecordStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `renewalMs` | property | <code>renewalMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryDelayMs` | property | <code>retryDelayMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vectorStores` | property | <code>vectorStores: ManagedVectorStoreAdapter[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `IndexOutboxWorkerRunResult`

Index Outbox Worker Run Result interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { IndexOutboxWorkerRunResult } from '@codesoul-co/hypha-memory';`
- Source module: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### Declaration

```text
export interface IndexOutboxWorkerRunResult {
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

## `ManagedVectorPoint`

Managed Vector Point interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ManagedVectorPoint } from '@codesoul-co/hypha-memory';`
- Source module: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### Declaration

```text
export interface ManagedVectorPoint {
    id: string;
    vector: number[];
    metadata: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vector` | property | <code>vector: number[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManagedVectorSearchRequest`

Managed Vector Search Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ManagedVectorSearchRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### Declaration

```text
export interface ManagedVectorSearchRequest {
    vector: number[];
    topK: number;
    filter?: Record<string, unknown>;
    scoreThreshold?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filter` | property | <code>filter?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scoreThreshold` | property | <code>scoreThreshold?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `topK` | property | <code>topK: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vector` | property | <code>vector: number[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManagedVectorSearchResult`

Managed Vector Search Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ManagedVectorSearchResult } from '@codesoul-co/hypha-memory';`
- Source module: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### Declaration

```text
export interface ManagedVectorSearchResult {
    id: string;
    score: number;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `score` | property | <code>score: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ManagedVectorStoreAdapter`

Managed Vector Store Adapter interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ManagedVectorStoreAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### Declaration

```text
export interface ManagedVectorStoreAdapter {
    readonly id: string;
    upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise<void>;
    delete(ids: string[], options?: ManagedVectorWriteOptions): Promise<void>;
    search(request: ManagedVectorSearchRequest): Promise<ManagedVectorSearchResult[]>;
    health(): Promise<ProviderHealth>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `search` | method | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `upsert` | method | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ManagedVectorWriteOptions`

Managed Vector Write Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ManagedVectorWriteOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### Declaration

```text
export interface ManagedVectorWriteOptions {
    fencingToken?: number;
    memoryRevision?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fencingToken` | property | <code>fencingToken?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryRevision` | property | <code>memoryRevision?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
