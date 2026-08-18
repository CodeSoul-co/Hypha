# `@codesoul-co/hypha-memory` / `native-memory-runtime`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/native-memory-runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory-runtime.ts)
- 导出数: **3**

## 模块用法

用于执行该边界的运行时行为。Native memory runtime 模块公开 1 函数、2 接口。

### 从包入口导入

```ts
import {
  createNativeMemoryManagementProviderFactory,
} from '@codesoul-co/hypha-memory';

import type {
  NativeMemoryRuntimeDependencies,
  NativeMemoryRuntimeResources,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createNativeMemoryManagementProviderFactory` | 函数 | <code>createNativeMemoryManagementProviderFactory(dependencies: NativeMemoryRuntimeDependencies): MemoryManagementProviderFactory</code> | Create Native Memory Management Provider Factory 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `NativeMemoryRuntimeDependencies` | 接口 | <code>interface NativeMemoryRuntimeDependencies</code> | Native Memory Runtime Dependencies 接口，共包含 15 个公开字段或方法。 |
| `NativeMemoryRuntimeResources` | 接口 | <code>interface NativeMemoryRuntimeResources</code> | Native Memory Runtime Resources 接口，共包含 3 个公开字段或方法。 |

## `createNativeMemoryManagementProviderFactory`

Create Native Memory Management Provider Factory 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createNativeMemoryManagementProviderFactory } from '@codesoul-co/hypha-memory';`
- 源码模块: [`native-memory-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory-runtime.ts)

### 声明

```text
export declare function createNativeMemoryManagementProviderFactory(dependencies: NativeMemoryRuntimeDependencies): MemoryManagementProviderFactory;
```

### 调用签名

```text
createNativeMemoryManagementProviderFactory(dependencies: NativeMemoryRuntimeDependencies): MemoryManagementProviderFactory
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `dependencies` | <code>NativeMemoryRuntimeDependencies</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryManagementProviderFactory`
- 说明: 返回值契约由上述类型定义。

## `NativeMemoryRuntimeDependencies`

Native Memory Runtime Dependencies 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NativeMemoryRuntimeDependencies } from '@codesoul-co/hypha-memory';`
- 源码模块: [`native-memory-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory-runtime.ts)

### 声明

```text
export interface NativeMemoryRuntimeDependencies {
    structuredStore: StructuredStoreProvider;
    structuredStoreId: string;
    redisClient?: RedisLikeWorkingMemoryClient;
    embeddingProvider?: EmbeddingProvider;
    embeddingProviderId?: string;
    vectorStores: ManagedVectorStoreAdapter[];
    lifecycleHandlers?: Partial<Record<MemoryLifecycleWorkerType, MemoryLifecycleTaskHandler>>;
    ownerId: string;
    workingMemoryNamespace?: string;
    workingMemoryTtlSeconds?: number;
    events?: MemoryEventPublisher;
    onIndexEvent?: (event: IndexOutboxWorkerEvent) => void | Promise<void>;
    onLifecycleEvent?: (event: MemoryLifecycleWorkerEvent) => void | Promise<void>;
    now?: () => Date;
    close?: () => Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `embeddingProvider` | 属性 | <code>embeddingProvider?: EmbeddingProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `embeddingProviderId` | 属性 | <code>embeddingProviderId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events?: MemoryEventPublisher</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lifecycleHandlers` | 属性 | <code>lifecycleHandlers?: Partial&lt;Record&lt;MemoryLifecycleWorkerType, MemoryLifecycleTaskHandler&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onIndexEvent` | 方法 | <code>onIndexEvent?(event: IndexOutboxWorkerEvent): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onLifecycleEvent` | 方法 | <code>onLifecycleEvent?(event: MemoryLifecycleWorkerEvent): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redisClient` | 属性 | <code>redisClient?: RedisLikeWorkingMemoryClient</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `structuredStore` | 属性 | <code>structuredStore: StructuredStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `structuredStoreId` | 属性 | <code>structuredStoreId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vectorStores` | 属性 | <code>vectorStores: ManagedVectorStoreAdapter[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workingMemoryNamespace` | 属性 | <code>workingMemoryNamespace?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workingMemoryTtlSeconds` | 属性 | <code>workingMemoryTtlSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `NativeMemoryRuntimeResources`

Native Memory Runtime Resources 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NativeMemoryRuntimeResources } from '@codesoul-co/hypha-memory';`
- 源码模块: [`native-memory-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory-runtime.ts)

### 声明

```text
export interface NativeMemoryRuntimeResources {
    workingStore: WorkingMemoryStore;
    lifecycleStore: StructuredMemoryLifecycleTaskStore;
    supervisor: MemoryWorkerSupervisor;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `lifecycleStore` | 属性 | <code>lifecycleStore: StructuredMemoryLifecycleTaskStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `supervisor` | 属性 | <code>supervisor: MemoryWorkerSupervisor</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workingStore` | 属性 | <code>workingStore: WorkingMemoryStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
