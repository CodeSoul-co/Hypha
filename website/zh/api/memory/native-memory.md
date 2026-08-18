# `@codesoul-co/hypha-memory` / `native-memory`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/native-memory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory.ts)
- 导出数: **2**

## 模块用法

用于使用该功能边界的公共契约与操作。Native memory 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  NativeMemoryManagementProvider,
} from '@codesoul-co/hypha-memory';

import type {
  NativeMemoryProviderOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `NativeMemoryManagementProvider` | 类 | <code>new NativeMemoryManagementProvider(options: NativeMemoryProviderOptions): NativeMemoryManagementProvider</code> | Native Memory Management Provider 类，共公开 16 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `NativeMemoryProviderOptions` | 接口 | <code>interface NativeMemoryProviderOptions</code> | Native Memory Provider Options 接口，共包含 8 个公开字段或方法。 |

## `NativeMemoryManagementProvider`

Native Memory Management Provider 类，共公开 16 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { NativeMemoryManagementProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`native-memory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory.ts)

### 声明

```text
export declare class NativeMemoryManagementProvider implements MemoryManagementProvider {
    readonly id: string;
    readonly persistence: MemoryPersistenceUnitOfWork;
    readonly recordStore: MemoryPersistenceUnitOfWork['recordStore'];
    readonly outboxStore: MemoryPersistenceUnitOfWork['outboxStore'];
    readonly retrieval: DefaultMemoryRetrievalPipeline;
    constructor(options: NativeMemoryProviderOptions);
    capabilities(): Promise<MemoryManagementCapabilities>;
    add(request: MemoryAddRequest): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest): Promise<MemoryVersion[]>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: NativeMemoryProviderOptions): NativeMemoryManagementProvider</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `outboxStore` | 属性 | <code>readonly outboxStore: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/managed-store").MemoryIndexOutboxStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `persistence` | 属性 | <code>readonly persistence: MemoryPersistenceUnitOfWork</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordStore` | 属性 | <code>readonly recordStore: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/managed-store").ManagedMemoryRecordStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retrieval` | 属性 | <code>readonly retrieval: DefaultMemoryRetrievalPipeline</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `NativeMemoryProviderOptions`

Native Memory Provider Options 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NativeMemoryProviderOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`native-memory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory.ts)

### 声明

```text
export interface NativeMemoryProviderOptions {
    profile: MemoryProfileSpec;
    maintenancePolicy?: MemoryMaintenancePolicySpec;
    persistence?: MemoryPersistenceUnitOfWork;
    idempotencyStore?: MemoryIdempotencyStore;
    events?: MemoryEventPublisher;
    embeddingProvider?: EmbeddingProvider;
    vectorStores?: ManagedVectorStoreAdapter[];
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `embeddingProvider` | 属性 | <code>embeddingProvider?: EmbeddingProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events?: MemoryEventPublisher</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyStore` | 属性 | <code>idempotencyStore?: MemoryIdempotencyStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maintenancePolicy` | 属性 | <code>maintenancePolicy?: MemoryMaintenancePolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `persistence` | 属性 | <code>persistence?: MemoryPersistenceUnitOfWork</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profile` | 属性 | <code>profile: MemoryProfileSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vectorStores` | 属性 | <code>vectorStores?: ManagedVectorStoreAdapter[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
