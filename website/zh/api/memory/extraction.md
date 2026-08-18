# `@codesoul-co/hypha-memory` / `extraction`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/extraction.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)
- 导出数: **11**

## 模块用法

用于使用该功能边界的公共契约与操作。Extraction 模块公开 4 类、4 函数、2 接口、1 类型。

### 从包入口导入

```ts
import {
  BasicMemoryExtractionSourceAdapter,
  DeterministicMemoryExtractor,
  InMemoryMemoryExtractionStateStore,
  MemoryExtractionCoordinator,
  createConversationExtractionAdapter,
  createEpisodicRecordExtractionAdapter,
  createRuntimeEventExtractionAdapter,
  createTruthExtractionAdapter,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryExtractionCoordinatorOptions,
  MemoryExtractionStateStore,
  ExtractionSourceLoader,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 4 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `BasicMemoryExtractionSourceAdapter` | 类 | <code>new BasicMemoryExtractionSourceAdapter&lt;T = unknown&gt;(type: MemoryExtractionSourceType, loader: ExtractionSourceLoader&lt;T&gt;, normalizer: (value: T, ref: MemoryExtractionSourceRef) =&gt; NormalizedExtractionInput): BasicMemoryExtractionSourceAdapter&lt;T&gt;</code> | Basic Memory Extraction Source Adapter 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DeterministicMemoryExtractor` | 类 | <code>new DeterministicMemoryExtractor(): DeterministicMemoryExtractor</code> | Deterministic Memory Extractor 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryMemoryExtractionStateStore` | 类 | <code>new InMemoryMemoryExtractionStateStore(): InMemoryMemoryExtractionStateStore</code> | In Memory Memory Extraction State Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryExtractionCoordinator` | 类 | <code>new MemoryExtractionCoordinator(options: MemoryExtractionCoordinatorOptions): MemoryExtractionCoordinator</code> | Memory Extraction Coordinator 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `createConversationExtractionAdapter` | 函数 | <code>createConversationExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | Create Conversation Extraction Adapter 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createEpisodicRecordExtractionAdapter` | 函数 | <code>createEpisodicRecordExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | Create Episodic Record Extraction Adapter 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createRuntimeEventExtractionAdapter` | 函数 | <code>createRuntimeEventExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | Create Runtime Event Extraction Adapter 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createTruthExtractionAdapter` | 函数 | <code>createTruthExtractionAdapter(loader: ExtractionSourceLoader&lt;unknown&gt;): BasicMemoryExtractionSourceAdapter</code> | Create Truth Extraction Adapter 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `MemoryExtractionCoordinatorOptions` | 接口 | <code>interface MemoryExtractionCoordinatorOptions</code> | Memory Extraction Coordinator Options 接口，共包含 4 个公开字段或方法。 |
| `MemoryExtractionStateStore` | 接口 | <code>interface MemoryExtractionStateStore</code> | Memory Extraction State Store 接口，共包含 6 个公开字段或方法。 |
| `ExtractionSourceLoader` | 类型 | <code>type ExtractionSourceLoader = (ref: MemoryExtractionSourceRef) =&gt; Promise&lt;T&gt;</code> | Extraction Source Loader 公共类型别名；完整类型表达式见声明。 |

## `BasicMemoryExtractionSourceAdapter`

Basic Memory Extraction Source Adapter 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { BasicMemoryExtractionSourceAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### 声明

```text
export declare class BasicMemoryExtractionSourceAdapter<T = unknown> implements MemoryExtractionSourceAdapter<T> {
    readonly type: MemoryExtractionSourceType;
    constructor(type: MemoryExtractionSourceType, loader: ExtractionSourceLoader<T>, normalizer: (value: T, ref: MemoryExtractionSourceRef) => NormalizedExtractionInput);
    load(refs: MemoryExtractionSourceRef[], cursor?: MemoryExtractionCursor): Promise<MemoryExtractionSourceBatch<T>>;
    normalize(batch: MemoryExtractionSourceBatch<T>): Promise<NormalizedExtractionInput[]>;
    health(): Promise<ProviderHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>&lt;T = unknown&gt;(type: MemoryExtractionSourceType, loader: ExtractionSourceLoader&lt;T&gt;, normalizer: (value: T, ref: MemoryExtractionSourceRef) =&gt; NormalizedExtractionInput): BasicMemoryExtractionSourceAdapter&lt;T&gt;</code> | 创建该类的实例。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `load` | 方法 | <code>load(refs: MemoryExtractionSourceRef[], cursor?: MemoryExtractionCursor): Promise&lt;MemoryExtractionSourceBatch&lt;T&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `normalize` | 方法 | <code>normalize(batch: MemoryExtractionSourceBatch&lt;T&gt;): Promise&lt;NormalizedExtractionInput[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `type` | 属性 | <code>readonly type: MemoryExtractionSourceType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DeterministicMemoryExtractor`

Deterministic Memory Extractor 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DeterministicMemoryExtractor } from '@codesoul-co/hypha-memory';`
- 源码模块: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### 声明

```text
export declare class DeterministicMemoryExtractor implements MemoryExtractor {
    readonly id = "memory.extractor.deterministic";
    extract(inputs: NormalizedExtractionInput[], profile: MemoryExtractionProfileSpec): Promise<ExtractedMemoryCandidate[]>;
    health(): Promise<ProviderHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DeterministicMemoryExtractor</code> | 创建该类的实例。 |
| `extract` | 方法 | <code>extract(inputs: NormalizedExtractionInput[], profile: MemoryExtractionProfileSpec): Promise&lt;ExtractedMemoryCandidate[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: "memory.extractor.deterministic"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InMemoryMemoryExtractionStateStore`

In Memory Memory Extraction State Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryMemoryExtractionStateStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### 声明

```text
export declare class InMemoryMemoryExtractionStateStore implements MemoryExtractionStateStore {
    getJob(id: string): Promise<MemoryExtractionJob | null>;
    saveJob(job: MemoryExtractionJob): Promise<void>;
    getBatch(id: string): Promise<MemoryExtractionBatch | null>;
    saveBatch(batch: MemoryExtractionBatch): Promise<void>;
    getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise<MemoryExtractionCursor | null>;
    saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryMemoryExtractionStateStore</code> | 创建该类的实例。 |
| `getBatch` | 方法 | <code>getBatch(id: string): Promise&lt;MemoryExtractionBatch &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getCursor` | 方法 | <code>getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise&lt;MemoryExtractionCursor &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getJob` | 方法 | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `saveBatch` | 方法 | <code>saveBatch(batch: MemoryExtractionBatch): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `saveCursor` | 方法 | <code>saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `saveJob` | 方法 | <code>saveJob(job: MemoryExtractionJob): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryExtractionCoordinator`

Memory Extraction Coordinator 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryExtractionCoordinator } from '@codesoul-co/hypha-memory';`
- 源码模块: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### 声明

```text
export declare class MemoryExtractionCoordinator {
    readonly stateStore: MemoryExtractionStateStore;
    constructor(options: MemoryExtractionCoordinatorOptions);
    run(request: MemoryExtractionRequest, profile: MemoryExtractionProfileSpec): Promise<{
            job: MemoryExtractionJob;
            batch: MemoryExtractionBatch;
        }>;
    getJob(id: string): Promise<MemoryExtractionJob | null>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: MemoryExtractionCoordinatorOptions): MemoryExtractionCoordinator</code> | 创建该类的实例。 |
| `getJob` | 方法 | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `run` | 方法 | <code>run(request: MemoryExtractionRequest, profile: MemoryExtractionProfileSpec): Promise&lt;{ job: MemoryExtractionJob; batch: MemoryExtractionBatch; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stateStore` | 属性 | <code>readonly stateStore: MemoryExtractionStateStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `createConversationExtractionAdapter`

Create Conversation Extraction Adapter 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createConversationExtractionAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### 声明

```text
export declare function createConversationExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter;
```

### 调用签名

```text
createConversationExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `loader` | <code>ExtractionSourceLoader&lt;unknown&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `BasicMemoryExtractionSourceAdapter<unknown>`
- 说明: 返回值契约由上述类型定义。

## `createEpisodicRecordExtractionAdapter`

Create Episodic Record Extraction Adapter 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createEpisodicRecordExtractionAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### 声明

```text
export declare function createEpisodicRecordExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter;
```

### 调用签名

```text
createEpisodicRecordExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `loader` | <code>ExtractionSourceLoader&lt;unknown&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `BasicMemoryExtractionSourceAdapter<unknown>`
- 说明: 返回值契约由上述类型定义。

## `createRuntimeEventExtractionAdapter`

Create Runtime Event Extraction Adapter 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createRuntimeEventExtractionAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### 声明

```text
export declare function createRuntimeEventExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter;
```

### 调用签名

```text
createRuntimeEventExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `loader` | <code>ExtractionSourceLoader&lt;unknown&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `BasicMemoryExtractionSourceAdapter<unknown>`
- 说明: 返回值契约由上述类型定义。

## `createTruthExtractionAdapter`

Create Truth Extraction Adapter 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createTruthExtractionAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### 声明

```text
export declare function createTruthExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter;
```

### 调用签名

```text
createTruthExtractionAdapter(loader: ExtractionSourceLoader<unknown>): BasicMemoryExtractionSourceAdapter
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `loader` | <code>ExtractionSourceLoader&lt;unknown&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `BasicMemoryExtractionSourceAdapter<unknown>`
- 说明: 返回值契约由上述类型定义。

## `MemoryExtractionCoordinatorOptions`

Memory Extraction Coordinator Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryExtractionCoordinatorOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### 声明

```text
export interface MemoryExtractionCoordinatorOptions {
    adapters: MemoryExtractionSourceAdapter[];
    extractor: MemoryExtractor;
    stateStore?: MemoryExtractionStateStore;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adapters` | 属性 | <code>adapters: MemoryExtractionSourceAdapter&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `extractor` | 属性 | <code>extractor: MemoryExtractor</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stateStore` | 属性 | <code>stateStore?: MemoryExtractionStateStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryExtractionStateStore`

Memory Extraction State Store 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryExtractionStateStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### 声明

```text
export interface MemoryExtractionStateStore {
    getJob(id: string): Promise<MemoryExtractionJob | null>;
    saveJob(job: MemoryExtractionJob): Promise<void>;
    getBatch(id: string): Promise<MemoryExtractionBatch | null>;
    saveBatch(batch: MemoryExtractionBatch): Promise<void>;
    getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise<MemoryExtractionCursor | null>;
    saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `getBatch` | 方法 | <code>getBatch(id: string): Promise&lt;MemoryExtractionBatch &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getCursor` | 方法 | <code>getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise&lt;MemoryExtractionCursor &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getJob` | 方法 | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `saveBatch` | 方法 | <code>saveBatch(batch: MemoryExtractionBatch): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `saveCursor` | 方法 | <code>saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `saveJob` | 方法 | <code>saveJob(job: MemoryExtractionJob): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExtractionSourceLoader`

Extraction Source Loader 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExtractionSourceLoader } from '@codesoul-co/hypha-memory';`
- 源码模块: [`extraction`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/extraction.ts)

### 声明

```text
export type ExtractionSourceLoader<T> = (ref: MemoryExtractionSourceRef) => Promise<T>;
```
