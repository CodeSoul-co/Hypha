# `@codesoul-co/hypha-serving-cache` / `stores/redis-store`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 源码: [`packages/serving-cache/src/stores/redis-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/redis-store.ts)
- 导出数: **3**

## 模块用法

用于持久化并读取该边界的数据。Redis store 模块公开 1 类、2 接口。

### 从包入口导入

```ts
import {
  RedisCacheStore,
} from '@codesoul-co/hypha-serving-cache';

import type {
  RedisCacheClient,
  RedisCacheStoreOptions,
} from '@codesoul-co/hypha-serving-cache';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RedisCacheStore` | 类 | <code>new RedisCacheStore(options: RedisCacheStoreOptions): RedisCacheStore</code> | Redis Cache Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RedisCacheClient` | 接口 | <code>interface RedisCacheClient</code> | Redis Cache Client 接口，共包含 6 个公开字段或方法。 |
| `RedisCacheStoreOptions` | 接口 | <code>interface RedisCacheStoreOptions</code> | Redis Cache Store Options 接口，共包含 4 个公开字段或方法。 |

## `RedisCacheStore`

Redis Cache Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RedisCacheStore } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`stores/redis-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/redis-store.ts)

### 声明

```text
export declare class RedisCacheStore implements CacheStore {
    constructor(options: RedisCacheStoreOptions);
    get<T>(key: string): Promise<CacheEntry<T> | null>;
    set<T>(key: string, entry: CacheEntry<T>): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
    health(): Promise<CacheStoreHealth>;
    close(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: RedisCacheStoreOptions): RedisCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;T&gt;(key: string): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;CacheStoreHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set&lt;T&gt;(key: string, entry: CacheEntry&lt;T&gt;): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisCacheClient`

Redis Cache Client 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisCacheClient } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`stores/redis-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/redis-store.ts)

### 声明

```text
export interface RedisCacheClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ...args: Array<string | number>): Promise<unknown>;
    del(...keys: string[]): Promise<number>;
    scan(cursor: string, ...args: Array<string | number>): Promise<[string, string[]]>;
    ping?(): Promise<string>;
    quit?(): Promise<unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `del` | 方法 | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `ping` | 方法 | <code>ping?(): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `quit` | 方法 | <code>quit?(): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `scan` | 方法 | <code>scan(cursor: string, ...args: Array&lt;string &#124; number&gt;): Promise&lt;[string, string[]]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, value: string, ...args: Array&lt;string &#124; number&gt;): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisCacheStoreOptions`

Redis Cache Store Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisCacheStoreOptions } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`stores/redis-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/redis-store.ts)

### 声明

```text
export interface RedisCacheStoreOptions {
    client: RedisCacheClient;
    prefix?: string;
    closeClient?: boolean;
    now?: () => number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `client` | 属性 | <code>client: RedisCacheClient</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `closeClient` | 属性 | <code>closeClient?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `prefix` | 属性 | <code>prefix?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
