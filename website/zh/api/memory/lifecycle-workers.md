# `@codesoul-co/hypha-memory` / `lifecycle-workers`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/lifecycle-workers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)
- 导出数: **15**

## 模块用法

用于使用该功能边界的公共契约与操作。Lifecycle workers 模块公开 8 类、5 接口、2 类型。

### 从包入口导入

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

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 8 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMemoryLifecycleTaskStore` | 类 | <code>new InMemoryMemoryLifecycleTaskStore(): InMemoryMemoryLifecycleTaskStore</code> | In Memory Memory Lifecycle Task Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LeasedMemoryLifecycleWorker` | 类 | <code>new LeasedMemoryLifecycleWorker(options: MemoryLifecycleWorkerOptions): LeasedMemoryLifecycleWorker</code> | Leased Memory Lifecycle Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryConsolidationWorker` | 类 | <code>new MemoryConsolidationWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryConsolidationWorker</code> | Memory Consolidation Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryDecayWorker` | 类 | <code>new MemoryDecayWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDecayWorker</code> | Memory Decay Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryDeletionWorker` | 类 | <code>new MemoryDeletionWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDeletionWorker</code> | Memory Deletion Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryReindexWorker` | 类 | <code>new MemoryReindexWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryReindexWorker</code> | Memory Reindex Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryRetentionWorker` | 类 | <code>new MemoryRetentionWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryRetentionWorker</code> | Memory Retention Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ProviderReconciliationWorker` | 类 | <code>new ProviderReconciliationWorker(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): ProviderReconciliationWorker</code> | Provider Reconciliation Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryLifecycleTask` | 接口 | <code>interface MemoryLifecycleTask</code> | Memory Lifecycle Task 接口，共包含 15 个公开字段或方法。 |
| `MemoryLifecycleTaskStore` | 接口 | <code>interface MemoryLifecycleTaskStore</code> | Memory Lifecycle Task Store 接口，共包含 6 个公开字段或方法。 |
| `MemoryLifecycleWorkerEvent` | 接口 | <code>interface MemoryLifecycleWorkerEvent</code> | Memory Lifecycle Worker Event 接口，共包含 5 个公开字段或方法。 |
| `MemoryLifecycleWorkerOptions` | 接口 | <code>interface MemoryLifecycleWorkerOptions</code> | Memory Lifecycle Worker Options 接口，共包含 12 个公开字段或方法。 |
| `MemoryLifecycleWorkerRunResult` | 接口 | <code>interface MemoryLifecycleWorkerRunResult</code> | Memory Lifecycle Worker Run Result 接口，共包含 4 个公开字段或方法。 |
| `MemoryLifecycleTaskHandler` | 类型 | <code>type MemoryLifecycleTaskHandler = (task: MemoryLifecycleTask, signal: AbortSignal) =&gt; Promise&lt;void&gt;</code> | Memory Lifecycle Task Handler 公共类型别名；完整类型表达式见声明。 |
| `MemoryLifecycleWorkerType` | 类型 | <code>type MemoryLifecycleWorkerType = 'retention' &#124; 'decay' &#124; 'consolidation' &#124; 'deletion' &#124; 'reindex' &#124; 'provider_reconciliation'</code> | Memory Lifecycle Worker Type 公共类型别名；完整类型表达式见声明。 |

## `InMemoryMemoryLifecycleTaskStore`

In Memory Memory Lifecycle Task Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryMemoryLifecycleTaskStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): InMemoryMemoryLifecycleTaskStore</code> | 创建该类的实例。 |
| `enqueue` | 方法 | <code>enqueue(task: MemoryLifecycleTask): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fail` | 方法 | <code>fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `lease` | 方法 | <code>lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryLifecycleTask[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(type?: MemoryLifecycleWorkerType): Promise&lt;MemoryLifecycleTask[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LeasedMemoryLifecycleWorker`

Leased Memory Lifecycle Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LeasedMemoryLifecycleWorker } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: MemoryLifecycleWorkerOptions): LeasedMemoryLifecycleWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stop` | 方法 | <code>stop(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryConsolidationWorker`

Memory Consolidation Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryConsolidationWorker } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

```text
export declare class MemoryConsolidationWorker extends LeasedMemoryLifecycleWorker {
    constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryConsolidationWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stop` | 方法 | <code>stop(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryDecayWorker`

Memory Decay Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryDecayWorker } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

```text
export declare class MemoryDecayWorker extends LeasedMemoryLifecycleWorker {
    constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDecayWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stop` | 方法 | <code>stop(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryDeletionWorker`

Memory Deletion Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryDeletionWorker } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

```text
export declare class MemoryDeletionWorker extends LeasedMemoryLifecycleWorker {
    constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryDeletionWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stop` | 方法 | <code>stop(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryReindexWorker`

Memory Reindex Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryReindexWorker } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

```text
export declare class MemoryReindexWorker extends LeasedMemoryLifecycleWorker {
    constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryReindexWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stop` | 方法 | <code>stop(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryRetentionWorker`

Memory Retention Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryRetentionWorker } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

```text
export declare class MemoryRetentionWorker extends LeasedMemoryLifecycleWorker {
    constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): MemoryRetentionWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stop` | 方法 | <code>stop(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ProviderReconciliationWorker`

Provider Reconciliation Worker 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ProviderReconciliationWorker } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

```text
export declare class ProviderReconciliationWorker extends LeasedMemoryLifecycleWorker {
    constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: Omit&lt;MemoryLifecycleWorkerOptions, "type"&gt;): ProviderReconciliationWorker</code> | 创建该类的实例。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;MemoryLifecycleWorkerRunResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stop` | 方法 | <code>stop(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryLifecycleTask`

Memory Lifecycle Task 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryLifecycleTask } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `availableAt` | 属性 | <code>availableAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastError` | 属性 | <code>lastError?: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseExpiresAt` | 属性 | <code>leaseExpiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseOwner` | 属性 | <code>leaseOwner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseToken` | 属性 | <code>leaseToken?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: TPayload</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: "completed" &#124; "failed" &#124; "processing" &#124; "pending" &#124; "dead_letter"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: MemoryLifecycleWorkerType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryLifecycleTaskStore`

Memory Lifecycle Task Store 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryLifecycleTaskStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `enqueue` | 方法 | <code>enqueue(task: MemoryLifecycleTask): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fail` | 方法 | <code>fail(taskId: string, ownerId: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter: boolean): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `lease` | 方法 | <code>lease(type: MemoryLifecycleWorkerType, ownerId: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryLifecycleTask[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(type?: MemoryLifecycleWorkerType): Promise&lt;MemoryLifecycleTask[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(taskId: string, ownerId: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryLifecycleWorkerEvent`

Memory Lifecycle Worker Event 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryLifecycleWorkerEvent } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

```text
export interface MemoryLifecycleWorkerEvent {
    type: 'memory.worker.started' | 'memory.worker.stopped' | 'memory.worker.failed' | 'memory.worker.dead_lettered';
    workerType: MemoryLifecycleWorkerType;
    taskId?: string;
    operationId?: string;
    error?: NormalizedMemoryError;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error?: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskId` | 属性 | <code>taskId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "memory.worker.started" &#124; "memory.worker.stopped" &#124; "memory.worker.failed" &#124; "memory.worker.dead_lettered"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workerType` | 属性 | <code>workerType: MemoryLifecycleWorkerType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryLifecycleWorkerOptions`

Memory Lifecycle Worker Options 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryLifecycleWorkerOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `batchSize` | 属性 | <code>batchSize?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `handler` | 方法 | <code>handler(task: MemoryLifecycleTask, signal: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `leaseMs` | 属性 | <code>leaseMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onEvent` | 方法 | <code>onEvent?(event: MemoryLifecycleWorkerEvent): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pollIntervalMs` | 属性 | <code>pollIntervalMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `renewalMs` | 属性 | <code>renewalMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryDelayMs` | 属性 | <code>retryDelayMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `store` | 属性 | <code>store: MemoryLifecycleTaskStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: MemoryLifecycleWorkerType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryLifecycleWorkerRunResult`

Memory Lifecycle Worker Run Result 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryLifecycleWorkerRunResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

```text
export interface MemoryLifecycleWorkerRunResult {
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

## `MemoryLifecycleTaskHandler`

Memory Lifecycle Task Handler 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryLifecycleTaskHandler } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

```text
export type MemoryLifecycleTaskHandler = (task: MemoryLifecycleTask, signal: AbortSignal) => Promise<void>;
```

## `MemoryLifecycleWorkerType`

Memory Lifecycle Worker Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryLifecycleWorkerType } from '@codesoul-co/hypha-memory';`
- 源码模块: [`lifecycle-workers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-workers.ts)

### 声明

```text
export type MemoryLifecycleWorkerType = 'retention' | 'decay' | 'consolidation' | 'deletion' | 'reindex' | 'provider_reconciliation';
```
