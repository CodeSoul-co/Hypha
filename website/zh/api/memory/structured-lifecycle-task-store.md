# `@codesoul-co/hypha-memory` / `structured-lifecycle-task-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/structured-lifecycle-task-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-lifecycle-task-store.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Structured lifecycle task store 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  StructuredMemoryLifecycleTaskStore,
} from '@codesoul-co/hypha-memory';

import type {
  StructuredMemoryLifecycleTaskStoreOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `StructuredMemoryLifecycleTaskStore` | 类 | <code>new StructuredMemoryLifecycleTaskStore(options: StructuredMemoryLifecycleTaskStoreOptions): StructuredMemoryLifecycleTaskStore</code> | Structured Memory Lifecycle Task Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `StructuredMemoryLifecycleTaskStoreOptions` | 接口 | <code>interface StructuredMemoryLifecycleTaskStoreOptions</code> | Structured Memory Lifecycle Task Store Options 接口，共包含 2 个公开字段或方法。 |

## `StructuredMemoryLifecycleTaskStore`

Structured Memory Lifecycle Task Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { StructuredMemoryLifecycleTaskStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-lifecycle-task-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-lifecycle-task-store.ts)

### 声明

```text
export declare class StructuredMemoryLifecycleTaskStore implements MemoryLifecycleTaskStore {
    constructor(options: StructuredMemoryLifecycleTaskStoreOptions);
    enqueue(task: MemoryLifecycleTask): Promise<void>;
    lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise<MemoryLifecycleTask[]>;
    renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise<boolean>;
    complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise<boolean>;
    fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise<boolean>;
    list(type?: MemoryLifecycleWorkerType): Promise<MemoryLifecycleTask[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: StructuredMemoryLifecycleTaskStoreOptions): StructuredMemoryLifecycleTaskStore</code> | 创建该类的实例。 |
| `enqueue` | 方法 | <code>enqueue(task: MemoryLifecycleTask): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fail` | 方法 | <code>fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `lease` | 方法 | <code>lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryLifecycleTask[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(type?: MemoryLifecycleWorkerType): Promise&lt;MemoryLifecycleTask[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `StructuredMemoryLifecycleTaskStoreOptions`

Structured Memory Lifecycle Task Store Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StructuredMemoryLifecycleTaskStoreOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-lifecycle-task-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-lifecycle-task-store.ts)

### 声明

```text
export interface StructuredMemoryLifecycleTaskStoreOptions {
    store: StructuredStoreProvider;
    table?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `store` | 属性 | <code>store: StructuredStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `table` | 属性 | <code>table?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
