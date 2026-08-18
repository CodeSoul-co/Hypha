# `@codesoul-co/hypha-memory` / `structured-extraction-state-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/structured-extraction-state-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-extraction-state-store.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Structured extraction state store 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  StructuredMemoryExtractionStateStore,
} from '@codesoul-co/hypha-memory';

import type {
  StructuredMemoryExtractionStateStoreOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `StructuredMemoryExtractionStateStore` | 类 | <code>new StructuredMemoryExtractionStateStore(options: StructuredMemoryExtractionStateStoreOptions): StructuredMemoryExtractionStateStore</code> | Structured Memory Extraction State Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `StructuredMemoryExtractionStateStoreOptions` | 接口 | <code>interface StructuredMemoryExtractionStateStoreOptions</code> | Structured Memory Extraction State Store Options 接口，共包含 4 个公开字段或方法。 |

## `StructuredMemoryExtractionStateStore`

Structured Memory Extraction State Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { StructuredMemoryExtractionStateStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-extraction-state-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-extraction-state-store.ts)

### 声明

```text
export declare class StructuredMemoryExtractionStateStore implements MemoryExtractionStateStore {
    constructor(options: StructuredMemoryExtractionStateStoreOptions);
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
| `constructor` | 构造函数 | <code>(options: StructuredMemoryExtractionStateStoreOptions): StructuredMemoryExtractionStateStore</code> | 创建该类的实例。 |
| `getBatch` | 方法 | <code>getBatch(id: string): Promise&lt;MemoryExtractionBatch &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getCursor` | 方法 | <code>getCursor(sourceType: MemoryExtractionSourceType, sourceId: string): Promise&lt;MemoryExtractionCursor &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getJob` | 方法 | <code>getJob(id: string): Promise&lt;MemoryExtractionJob &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `saveBatch` | 方法 | <code>saveBatch(batch: MemoryExtractionBatch): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `saveCursor` | 方法 | <code>saveCursor(cursor: MemoryExtractionCursor, expectedSequence?: number): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `saveJob` | 方法 | <code>saveJob(job: MemoryExtractionJob): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `StructuredMemoryExtractionStateStoreOptions`

Structured Memory Extraction State Store Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StructuredMemoryExtractionStateStoreOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-extraction-state-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-extraction-state-store.ts)

### 声明

```text
export interface StructuredMemoryExtractionStateStoreOptions {
    store: StructuredStoreProvider;
    jobTable?: string;
    batchTable?: string;
    cursorTable?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `batchTable` | 属性 | <code>batchTable?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cursorTable` | 属性 | <code>cursorTable?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `jobTable` | 属性 | <code>jobTable?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `store` | 属性 | <code>store: StructuredStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
