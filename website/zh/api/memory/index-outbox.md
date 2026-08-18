# `@codesoul-co/hypha-memory` / `index-outbox`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/index-outbox.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)
- 导出数: **11**

## 模块用法

用于使用该功能边界的公共契约与操作。Index outbox 模块公开 3 类、8 接口。

### 从包入口导入

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

### 使用要点

- 8 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `IndexOutboxWorker` | 类 | <code>new IndexOutboxWorker(options: IndexOutboxWorkerOptions): IndexOutboxWorker</code> | Index Outbox Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryLocalVectorStoreAdapter` | 类 | <code>new InMemoryLocalVectorStoreAdapter(id?: string): InMemoryLocalVectorStoreAdapter</code> | In Memory Local Vector Store Adapter 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LegacyVectorIndexStoreAdapter` | 类 | <code>new LegacyVectorIndexStoreAdapter(id: string, provider: VectorIndexProvider): LegacyVectorIndexStoreAdapter</code> | Legacy Vector Index Store Adapter 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `IndexOutboxWorkerEvent` | 接口 | <code>interface IndexOutboxWorkerEvent</code> | Index Outbox Worker Event 接口，共包含 7 个公开字段或方法。 |
| `IndexOutboxWorkerOptions` | 接口 | <code>interface IndexOutboxWorkerOptions</code> | Index Outbox Worker Options 接口，共包含 14 个公开字段或方法。 |
| `IndexOutboxWorkerRunResult` | 接口 | <code>interface IndexOutboxWorkerRunResult</code> | Index Outbox Worker Run Result 接口，共包含 4 个公开字段或方法。 |
| `ManagedVectorPoint` | 接口 | <code>interface ManagedVectorPoint</code> | Managed Vector Point 接口，共包含 3 个公开字段或方法。 |
| `ManagedVectorSearchRequest` | 接口 | <code>interface ManagedVectorSearchRequest</code> | Managed Vector Search Request 接口，共包含 4 个公开字段或方法。 |
| `ManagedVectorSearchResult` | 接口 | <code>interface ManagedVectorSearchResult</code> | Managed Vector Search Result 接口，共包含 3 个公开字段或方法。 |
| `ManagedVectorStoreAdapter` | 接口 | <code>interface ManagedVectorStoreAdapter</code> | Managed Vector Store Adapter 接口，共包含 5 个公开字段或方法。 |
| `ManagedVectorWriteOptions` | 接口 | <code>interface ManagedVectorWriteOptions</code> | Managed Vector Write Options 接口，共包含 2 个公开字段或方法。 |

## `IndexOutboxWorker`

Index Outbox Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { IndexOutboxWorker } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: IndexOutboxWorkerOptions): IndexOutboxWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;IndexOutboxWorkerRunResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stop` | 方法 | <code>stop(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryLocalVectorStoreAdapter`

In Memory Local Vector Store Adapter 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryLocalVectorStoreAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(id?: string): InMemoryLocalVectorStoreAdapter</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `upsert` | 方法 | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LegacyVectorIndexStoreAdapter`

Legacy Vector Index Store Adapter 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LegacyVectorIndexStoreAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(id: string, provider: VectorIndexProvider): LegacyVectorIndexStoreAdapter</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `upsert` | 方法 | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `IndexOutboxWorkerEvent`

Index Outbox Worker Event 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { IndexOutboxWorkerEvent } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error?: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryVersionId` | 属性 | <code>memoryVersionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outboxId` | 属性 | <code>outboxId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "memory.index.started" &#124; "memory.index.completed" &#124; "memory.index.partial" &#124; "memory.index.failed"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `IndexOutboxWorkerOptions`

Index Outbox Worker Options 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { IndexOutboxWorkerOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `batchSize` | 属性 | <code>batchSize?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `embeddingProvider` | 属性 | <code>embeddingProvider: EmbeddingProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseMs` | 属性 | <code>leaseMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onError` | 方法 | <code>onError?(error: NormalizedMemoryError): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onEvent` | 方法 | <code>onEvent?(event: IndexOutboxWorkerEvent): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `outboxStore` | 属性 | <code>outboxStore: MemoryIndexOutboxStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pollIntervalMs` | 属性 | <code>pollIntervalMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordStore` | 属性 | <code>recordStore: ManagedMemoryRecordStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `renewalMs` | 属性 | <code>renewalMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryDelayMs` | 属性 | <code>retryDelayMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vectorStores` | 属性 | <code>vectorStores: ManagedVectorStoreAdapter[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `IndexOutboxWorkerRunResult`

Index Outbox Worker Run Result 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { IndexOutboxWorkerRunResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### 声明

```text
export interface IndexOutboxWorkerRunResult {
    leased: number;
    completed: number;
    failed: number;
    deadLettered: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `completed` | 属性 | <code>completed: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadLettered` | 属性 | <code>deadLettered: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failed` | 属性 | <code>failed: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leased` | 属性 | <code>leased: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManagedVectorPoint`

Managed Vector Point 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedVectorPoint } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### 声明

```text
export interface ManagedVectorPoint {
    id: string;
    vector: number[];
    metadata: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vector` | 属性 | <code>vector: number[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManagedVectorSearchRequest`

Managed Vector Search Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedVectorSearchRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### 声明

```text
export interface ManagedVectorSearchRequest {
    vector: number[];
    topK: number;
    filter?: Record<string, unknown>;
    scoreThreshold?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filter` | 属性 | <code>filter?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scoreThreshold` | 属性 | <code>scoreThreshold?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `topK` | 属性 | <code>topK: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vector` | 属性 | <code>vector: number[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManagedVectorSearchResult`

Managed Vector Search Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedVectorSearchResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### 声明

```text
export interface ManagedVectorSearchResult {
    id: string;
    score: number;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `score` | 属性 | <code>score: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ManagedVectorStoreAdapter`

Managed Vector Store Adapter 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedVectorStoreAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### 声明

```text
export interface ManagedVectorStoreAdapter {
    readonly id: string;
    upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise<void>;
    delete(ids: string[], options?: ManagedVectorWriteOptions): Promise<void>;
    search(request: ManagedVectorSearchRequest): Promise<ManagedVectorSearchResult[]>;
    health(): Promise<ProviderHealth>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `upsert` | 方法 | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ManagedVectorWriteOptions`

Managed Vector Write Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedVectorWriteOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`index-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/index-outbox.ts)

### 声明

```text
export interface ManagedVectorWriteOptions {
    fencingToken?: number;
    memoryRevision?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fencingToken` | 属性 | <code>fencingToken?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryRevision` | 属性 | <code>memoryRevision?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
