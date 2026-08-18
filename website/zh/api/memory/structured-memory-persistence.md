# `@codesoul-co/hypha-memory` / `structured-memory-persistence`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/structured-memory-persistence.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-memory-persistence.ts)
- 导出数: **4**

## 模块用法

用于持久化并读取该边界的数据。Structured memory persistence 模块公开 2 类、2 接口。

### 从包入口导入

```ts
import {
  StructuredMemoryIndexOutboxStore,
  StructuredMemoryPersistenceUnitOfWork,
} from '@codesoul-co/hypha-memory';

import type {
  StructuredMemoryIndexOutboxStoreOptions,
  StructuredMemoryPersistenceUnitOfWorkOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `StructuredMemoryIndexOutboxStore` | 类 | <code>new StructuredMemoryIndexOutboxStore(options: StructuredMemoryIndexOutboxStoreOptions): StructuredMemoryIndexOutboxStore</code> | Structured Memory Index Outbox Store 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `StructuredMemoryPersistenceUnitOfWork` | 类 | <code>new StructuredMemoryPersistenceUnitOfWork(options: StructuredMemoryPersistenceUnitOfWorkOptions): StructuredMemoryPersistenceUnitOfWork</code> | Structured Memory Persistence Unit Of Work 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `StructuredMemoryIndexOutboxStoreOptions` | 接口 | <code>interface StructuredMemoryIndexOutboxStoreOptions</code> | Structured Memory Index Outbox Store Options 接口，共包含 3 个公开字段或方法。 |
| `StructuredMemoryPersistenceUnitOfWorkOptions` | 接口 | <code>interface StructuredMemoryPersistenceUnitOfWorkOptions</code> | Structured Memory Persistence Unit Of Work Options 接口，共包含 4 个公开字段或方法。 |

## `StructuredMemoryIndexOutboxStore`

Structured Memory Index Outbox Store 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { StructuredMemoryIndexOutboxStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-memory-persistence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-memory-persistence.ts)

### 声明

```text
export declare class StructuredMemoryIndexOutboxStore implements MemoryIndexOutboxStore {
    constructor(options: StructuredMemoryIndexOutboxStoreOptions);
    enqueue(record: MemoryIndexOutboxRecord): Promise<void>;
    lease(owner: string, now: string, leaseUntil: string, limit: number): Promise<MemoryIndexOutboxRecord[]>;
    renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise<boolean>;
    complete(id: string, owner: string, leaseToken: string, now: string): Promise<boolean>;
    fail(id: string, owner: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise<boolean>;
    list(): Promise<MemoryIndexOutboxRecord[]>;
    transaction<T>(fn: (store: MemoryIndexOutboxStore) => Promise<T>): Promise<T>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(id: string, owner: string, leaseToken: string, now: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: StructuredMemoryIndexOutboxStoreOptions): StructuredMemoryIndexOutboxStore</code> | 创建该类的实例。 |
| `enqueue` | 方法 | <code>enqueue(record: MemoryIndexOutboxRecord): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fail` | 方法 | <code>fail(id: string, owner: string, leaseToken: string, now: string, error: NormalizedMemoryError, retryAt: string, deadLetter?: boolean): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `lease` | 方法 | <code>lease(owner: string, now: string, leaseUntil: string, limit: number): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): Promise&lt;MemoryIndexOutboxRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(id: string, owner: string, leaseToken: string, now: string, leaseUntil: string): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (store: MemoryIndexOutboxStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `StructuredMemoryPersistenceUnitOfWork`

Structured Memory Persistence Unit Of Work 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { StructuredMemoryPersistenceUnitOfWork } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-memory-persistence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-memory-persistence.ts)

### 声明

```text
export declare class StructuredMemoryPersistenceUnitOfWork implements MemoryPersistenceUnitOfWork {
    readonly capabilities: MemoryPersistenceCapabilities;
    readonly recordStore: StructuredManagedMemoryRecordStore;
    readonly outboxStore: StructuredMemoryIndexOutboxStore;
    constructor(options: StructuredMemoryPersistenceUnitOfWorkOptions);
    transaction<T>(fn: (stores: MemoryPersistenceTransaction) => Promise<T>): Promise<T>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>readonly capabilities: MemoryPersistenceCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: StructuredMemoryPersistenceUnitOfWorkOptions): StructuredMemoryPersistenceUnitOfWork</code> | 创建该类的实例。 |
| `outboxStore` | 属性 | <code>readonly outboxStore: StructuredMemoryIndexOutboxStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordStore` | 属性 | <code>readonly recordStore: StructuredManagedMemoryRecordStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(fn: (stores: MemoryPersistenceTransaction) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `StructuredMemoryIndexOutboxStoreOptions`

Structured Memory Index Outbox Store Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StructuredMemoryIndexOutboxStoreOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-memory-persistence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-memory-persistence.ts)

### 声明

```text
export interface StructuredMemoryIndexOutboxStoreOptions {
    provider: StructuredStoreProvider;
    table?: string;
    inTransaction?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `inTransaction` | 属性 | <code>inTransaction?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: StructuredStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `table` | 属性 | <code>table?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StructuredMemoryPersistenceUnitOfWorkOptions`

Structured Memory Persistence Unit Of Work Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StructuredMemoryPersistenceUnitOfWorkOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-memory-persistence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-memory-persistence.ts)

### 声明

```text
export interface StructuredMemoryPersistenceUnitOfWorkOptions {
    provider: StructuredStoreProvider;
    currentTable?: string;
    versionsTable?: string;
    outboxTable?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `currentTable` | 属性 | <code>currentTable?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outboxTable` | 属性 | <code>outboxTable?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: StructuredStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionsTable` | 属性 | <code>versionsTable?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
