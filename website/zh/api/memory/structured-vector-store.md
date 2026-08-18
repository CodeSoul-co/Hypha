# `@codesoul-co/hypha-memory` / `structured-vector-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/structured-vector-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-vector-store.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Structured vector store 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  StructuredManagedVectorStoreAdapter,
} from '@codesoul-co/hypha-memory';

import type {
  StructuredManagedVectorStoreAdapterOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `StructuredManagedVectorStoreAdapter` | 类 | <code>new StructuredManagedVectorStoreAdapter(store: StructuredStoreProvider, options?: StructuredManagedVectorStoreAdapterOptions): StructuredManagedVectorStoreAdapter</code> | Durable, bounded vector projection backed by the configured Structured Store. |
| `StructuredManagedVectorStoreAdapterOptions` | 接口 | <code>interface StructuredManagedVectorStoreAdapterOptions</code> | Structured Managed Vector Store Adapter Options 接口，共包含 4 个公开字段或方法。 |

## `StructuredManagedVectorStoreAdapter`

Durable, bounded vector projection backed by the configured Structured Store.

- 种类: 类
- 导入: `import { StructuredManagedVectorStoreAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-vector-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-vector-store.ts)

### 声明

```text
export declare class StructuredManagedVectorStoreAdapter implements ManagedVectorStoreAdapter {
    readonly id: string;
    constructor(store: StructuredStoreProvider, options?: StructuredManagedVectorStoreAdapterOptions);
    initialize(): Promise<void>;
    upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise<void>;
    delete(ids: string[], options?: ManagedVectorWriteOptions): Promise<void>;
    search(request: ManagedVectorSearchRequest): Promise<ManagedVectorSearchResult[]>;
    health(): Promise<ProviderHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(store: StructuredStoreProvider, options?: StructuredManagedVectorStoreAdapterOptions): StructuredManagedVectorStoreAdapter</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(ids: string[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `initialize` | 方法 | <code>initialize(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedVectorSearchRequest): Promise&lt;ManagedVectorSearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `upsert` | 方法 | <code>upsert(points: ManagedVectorPoint[], options?: ManagedVectorWriteOptions): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `StructuredManagedVectorStoreAdapterOptions`

Structured Managed Vector Store Adapter Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StructuredManagedVectorStoreAdapterOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-vector-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-vector-store.ts)

### 声明

```text
export interface StructuredManagedVectorStoreAdapterOptions {
    id?: string;
    table?: string;
    maxScanPoints?: number;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxScanPoints` | 属性 | <code>maxScanPoints?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `table` | 属性 | <code>table?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
