# `@codesoul-co/hypha-memory` / `mongo-structured-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/mongo-structured-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)
- 导出数: **10**

## 模块用法

用于持久化并读取该边界的数据。Mongo structured store 模块公开 1 类、1 函数、7 接口、1 类型。

### 从包入口导入

```ts
import {
  MongoStructuredStoreProvider,
  normalizeMongoStructuredStoreError,
} from '@codesoul-co/hypha-memory';

import type {
  MongoCollectionLike,
  MongoCursorLike,
  MongoDatabaseLike,
  MongoOperationOptionsLike,
  MongoSessionLike,
  MongoStructuredStoreHealth,
  MongoStructuredStoreProviderOptions,
  MongoTransactionMode,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 8 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MongoStructuredStoreProvider` | 类 | <code>new MongoStructuredStoreProvider(options: MongoStructuredStoreProviderOptions, session?: MongoSessionLike &#124; undefined): MongoStructuredStoreProvider</code> | Mongo-backed StructuredStoreProvider without leaking a Mongo SDK into Memory contracts. |
| `normalizeMongoStructuredStoreError` | 函数 | <code>normalizeMongoStructuredStoreError(error: unknown, operation: string): import("./contracts").NormalizedMemoryError</code> | Normalize Mongo Structured Store Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `MongoCollectionLike` | 接口 | <code>interface MongoCollectionLike</code> | Mongo Collection Like 接口，共包含 6 个公开字段或方法。 |
| `MongoCursorLike` | 接口 | <code>interface MongoCursorLike</code> | Mongo Cursor Like 接口，共包含 3 个公开字段或方法。 |
| `MongoDatabaseLike` | 接口 | <code>interface MongoDatabaseLike</code> | Mongo Database Like 接口，共包含 3 个公开字段或方法。 |
| `MongoOperationOptionsLike` | 接口 | <code>interface MongoOperationOptionsLike</code> | Mongo Operation Options Like 接口，共包含 1 个公开字段或方法。 |
| `MongoSessionLike` | 接口 | <code>interface MongoSessionLike</code> | Mongo Session Like 接口，共包含 2 个公开字段或方法。 |
| `MongoStructuredStoreHealth` | 接口 | <code>interface MongoStructuredStoreHealth</code> | Mongo Structured Store Health 接口，共包含 3 个公开字段或方法。 |
| `MongoStructuredStoreProviderOptions` | 接口 | <code>interface MongoStructuredStoreProviderOptions</code> | Mongo Structured Store Provider Options 接口，共包含 3 个公开字段或方法。 |
| `MongoTransactionMode` | 类型 | <code>type MongoTransactionMode = 'required' &#124; 'preferred' &#124; 'disabled'</code> | Mongo Transaction Mode 公共类型别名；完整类型表达式见声明。 |

## `MongoStructuredStoreProvider`

Mongo-backed StructuredStoreProvider without leaking a Mongo SDK into Memory contracts.

- 种类: 类
- 导入: `import { MongoStructuredStoreProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### 声明

```text
export declare class MongoStructuredStoreProvider implements StructuredStoreProvider {
    constructor(options: MongoStructuredStoreProviderOptions, session?: MongoSessionLike | undefined);
    get<T>(table: string, id: string): Promise<T | null>;
    insert<T extends {
            id: string;
        }>(table: string, record: T): Promise<void>;
    update<T>(table: string, id: string, patch: Partial<T>): Promise<void>;
    compareAndSet<T>(table: string, id: string, expected: Partial<T>, patch: Partial<T>): Promise<boolean>;
    delete(table: string, id: string): Promise<void>;
    query<T>(table: string, query: StructuredQuery): Promise<T[]>;
    transaction<T>(operation: (tx: StructuredStoreProvider) => Promise<T>): Promise<T>;
    supportsTransactions(): boolean;
    initialize(collections: readonly string[]): Promise<void>;
    health(): Promise<MongoStructuredStoreHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compareAndSet` | 方法 | <code>compareAndSet&lt;T&gt;(table: string, id: string, expected: Partial&lt;T&gt;, patch: Partial&lt;T&gt;): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: MongoStructuredStoreProviderOptions, session?: MongoSessionLike &#124; undefined): MongoStructuredStoreProvider</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(table: string, id: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;T&gt;(table: string, id: string): Promise&lt;T &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;MongoStructuredStoreHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `initialize` | 方法 | <code>initialize(collections: readonly string[]): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `insert` | 方法 | <code>insert&lt;T extends { id: string; }&gt;(table: string, record: T): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `query` | 方法 | <code>query&lt;T&gt;(table: string, query: StructuredQuery): Promise&lt;T[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `supportsTransactions` | 方法 | <code>supportsTransactions(): boolean</code> | 公开方法；参数与返回类型以签名列为准。 |
| `transaction` | 方法 | <code>transaction&lt;T&gt;(operation: (tx: StructuredStoreProvider) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update&lt;T&gt;(table: string, id: string, patch: Partial&lt;T&gt;): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `normalizeMongoStructuredStoreError`

Normalize Mongo Structured Store Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizeMongoStructuredStoreError } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### 声明

```text
export declare function normalizeMongoStructuredStoreError(error: unknown, operation: string): import("./contracts").NormalizedMemoryError;
```

### 调用签名

```text
normalizeMongoStructuredStoreError(error: unknown, operation: string): import("./contracts").NormalizedMemoryError
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `operation` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `NormalizedMemoryError`
- 说明: 返回值契约由上述类型定义。

## `MongoCollectionLike`

Mongo Collection Like 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MongoCollectionLike } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### 声明

```text
export interface MongoCollectionLike {
    findOne<T>(filter: Record<string, unknown>, options?: MongoOperationOptionsLike): Promise<T | null>;
    insertOne<T extends object>(document: T, options?: MongoOperationOptionsLike): Promise<unknown>;
    updateOne(filter: Record<string, unknown>, update: {
        $set: Record<string, unknown>;
    }, options?: MongoOperationOptionsLike): Promise<{
        matchedCount?: number;
    }>;
    deleteOne(filter: Record<string, unknown>, options?: MongoOperationOptionsLike): Promise<{
        deletedCount?: number;
    }>;
    find<T>(filter: Record<string, unknown>, options?: MongoOperationOptionsLike): MongoCursorLike<T>;
    createIndex?(keys: Record<string, 1 | -1>, options?: {
        unique?: boolean;
        name?: string;
    }): Promise<unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createIndex` | 方法 | <code>createIndex?(keys: Record&lt;string, 1 &#124; -1&gt;, options?: { unique?: boolean; name?: string; }): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `deleteOne` | 方法 | <code>deleteOne(filter: Record&lt;string, unknown&gt;, options?: MongoOperationOptionsLike): Promise&lt;{ deletedCount?: number; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `find` | 方法 | <code>find&lt;T&gt;(filter: Record&lt;string, unknown&gt;, options?: MongoOperationOptionsLike): MongoCursorLike&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `findOne` | 方法 | <code>findOne&lt;T&gt;(filter: Record&lt;string, unknown&gt;, options?: MongoOperationOptionsLike): Promise&lt;T &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `insertOne` | 方法 | <code>insertOne&lt;T extends object&gt;(document: T, options?: MongoOperationOptionsLike): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `updateOne` | 方法 | <code>updateOne(filter: Record&lt;string, unknown&gt;, update: { $set: Record&lt;string, unknown&gt;; }, options?: MongoOperationOptionsLike): Promise&lt;{ matchedCount?: number; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MongoCursorLike`

Mongo Cursor Like 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MongoCursorLike } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### 声明

```text
export interface MongoCursorLike<T> {
    sort?(order: Record<string, 1 | -1>): MongoCursorLike<T>;
    limit?(limit: number): MongoCursorLike<T>;
    toArray(): Promise<T[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `limit` | 方法 | <code>limit?(limit: number): MongoCursorLike&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `sort` | 方法 | <code>sort?(order: Record&lt;string, 1 &#124; -1&gt;): MongoCursorLike&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `toArray` | 方法 | <code>toArray(): Promise&lt;T[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MongoDatabaseLike`

Mongo Database Like 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MongoDatabaseLike } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### 声明

```text
export interface MongoDatabaseLike {
    collection(name: string): MongoCollectionLike;
    startSession?(): MongoSessionLike;
    command?(command: Record<string, unknown>): Promise<unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collection` | 方法 | <code>collection(name: string): MongoCollectionLike</code> | 公开方法；参数与返回类型以签名列为准。 |
| `command` | 方法 | <code>command?(command: Record&lt;string, unknown&gt;): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `startSession` | 方法 | <code>startSession?(): MongoSessionLike</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MongoOperationOptionsLike`

Mongo Operation Options Like 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MongoOperationOptionsLike } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### 声明

```text
export interface MongoOperationOptionsLike {
    session?: MongoSessionLike;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `session` | 属性 | <code>session?: MongoSessionLike</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MongoSessionLike`

Mongo Session Like 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MongoSessionLike } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### 声明

```text
export interface MongoSessionLike {
    withTransaction<T>(operation: () => Promise<T>): Promise<T>;
    endSession(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `endSession` | 方法 | <code>endSession(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `withTransaction` | 方法 | <code>withTransaction&lt;T&gt;(operation: () =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MongoStructuredStoreHealth`

Mongo Structured Store Health 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MongoStructuredStoreHealth } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### 声明

```text
export interface MongoStructuredStoreHealth {
    status: 'healthy' | 'degraded' | 'unhealthy';
    transactions: boolean;
    message?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `message` | 属性 | <code>message?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "healthy" &#124; "degraded" &#124; "unhealthy"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transactions` | 属性 | <code>transactions: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MongoStructuredStoreProviderOptions`

Mongo Structured Store Provider Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MongoStructuredStoreProviderOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### 声明

```text
export interface MongoStructuredStoreProviderOptions {
    database: MongoDatabaseLike;
    transactionMode?: MongoTransactionMode;
    collectionPrefix?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collectionPrefix` | 属性 | <code>collectionPrefix?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `database` | 属性 | <code>database: MongoDatabaseLike</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transactionMode` | 属性 | <code>transactionMode?: MongoTransactionMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MongoTransactionMode`

Mongo Transaction Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MongoTransactionMode } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mongo-structured-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mongo-structured-store.ts)

### 声明

```text
export type MongoTransactionMode = 'required' | 'preferred' | 'disabled';
```
