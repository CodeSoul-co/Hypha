# `@codesoul-co/hypha-serving-cache` / `stores/memory-store`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 源码: [`packages/serving-cache/src/stores/memory-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/memory-store.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Memory store 模块公开 2 类。

### 从包入口导入

```ts
import {
  MemoryCacheStore,
  NoopCacheStore,
} from '@codesoul-co/hypha-serving-cache';
```

### 使用要点

- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryCacheStore` | 类 | <code>new MemoryCacheStore(options?: { maxEntries?: number; maxBytes?: number; }): MemoryCacheStore</code> | Memory Cache Store 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `NoopCacheStore` | 类 | <code>new NoopCacheStore(): NoopCacheStore</code> | Noop Cache Store 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |

## `MemoryCacheStore`

Memory Cache Store 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryCacheStore } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`stores/memory-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/memory-store.ts)

### 声明

```text
export declare class MemoryCacheStore implements CacheStore {
    constructor(options?: {
            maxEntries?: number;
            maxBytes?: number;
        });
    get<T>(key: string): Promise<CacheEntry<T> | null>;
    set<T>(key: string, entry: CacheEntry<T>): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
    touch(key: string): Promise<void>;
    stats(): Promise<CacheStoreStats>;
    health(): Promise<CacheStoreHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options?: { maxEntries?: number; maxBytes?: number; }): MemoryCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;T&gt;(key: string): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;CacheStoreHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set&lt;T&gt;(key: string, entry: CacheEntry&lt;T&gt;): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stats` | 方法 | <code>stats(): Promise&lt;CacheStoreStats&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `touch` | 方法 | <code>touch(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `NoopCacheStore`

Noop Cache Store 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { NoopCacheStore } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`stores/memory-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/memory-store.ts)

### 声明

```text
export declare class NoopCacheStore implements CacheStore {
    get<T>(): Promise<CacheEntry<T> | null>;
    set<T>(): Promise<void>;
    delete(): Promise<void>;
    clear(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): NoopCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;T&gt;(): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set&lt;T&gt;(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
