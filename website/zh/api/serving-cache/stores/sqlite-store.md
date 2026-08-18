# `@codesoul-co/hypha-serving-cache` / `stores/sqlite-store`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 源码: [`packages/serving-cache/src/stores/sqlite-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/sqlite-store.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Sqlite store 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  SQLiteCacheStore,
} from '@codesoul-co/hypha-serving-cache';

import type {
  SQLiteCacheStoreOptions,
} from '@codesoul-co/hypha-serving-cache';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteCacheStore` | 类 | <code>new SQLiteCacheStore(options: SQLiteCacheStoreOptions): SQLiteCacheStore</code> | SQLite Cache Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SQLiteCacheStoreOptions` | 接口 | <code>interface SQLiteCacheStoreOptions</code> | SQLite Cache Store Options 接口，共包含 3 个公开字段或方法。 |

## `SQLiteCacheStore`

SQLite Cache Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SQLiteCacheStore } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`stores/sqlite-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/sqlite-store.ts)

### 声明

```text
export declare class SQLiteCacheStore implements CacheStore {
    constructor(options: SQLiteCacheStoreOptions);
    get<T>(key: string): Promise<CacheEntry<T> | null>;
    set<T>(key: string, entry: CacheEntry<T>): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
    touch(key: string, timestamp: number): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: SQLiteCacheStoreOptions): SQLiteCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;T&gt;(key: string): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set&lt;T&gt;(key: string, entry: CacheEntry&lt;T&gt;): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `touch` | 方法 | <code>touch(key: string, timestamp: number): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SQLiteCacheStoreOptions`

SQLite Cache Store Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SQLiteCacheStoreOptions } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`stores/sqlite-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/sqlite-store.ts)

### 声明

```text
export interface SQLiteCacheStoreOptions {
    filename: string;
    required?: boolean;
    maxEntries?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEntries` | 属性 | <code>maxEntries?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `required` | 属性 | <code>required?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
