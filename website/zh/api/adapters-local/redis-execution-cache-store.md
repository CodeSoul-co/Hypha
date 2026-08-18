# `@codesoul-co/hypha-adapters-local` / `redis-execution-cache-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/redis-execution-cache-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/redis-execution-cache-store.ts)
- 导出数: **3**

## 模块用法

用于持久化并读取该边界的数据。Redis execution cache store 模块公开 1 类、2 接口。

### 从包入口导入

```ts
import {
  RedisExecutionCacheStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  RedisExecutionCacheStoreOptions,
  RedisLikeExecutionCacheClient,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RedisExecutionCacheStore` | 类 | <code>new RedisExecutionCacheStore(options: RedisExecutionCacheStoreOptions): RedisExecutionCacheStore</code> | Key-bound shared Execution Cache Store. The client port can wrap local, self-hosted, or managed Redis without exposing a Redis SDK to Core. |
| `RedisExecutionCacheStoreOptions` | 接口 | <code>interface RedisExecutionCacheStoreOptions</code> | Redis Execution Cache Store Options 接口，共包含 5 个公开字段或方法。 |
| `RedisLikeExecutionCacheClient` | 接口 | <code>interface RedisLikeExecutionCacheClient</code> | Redis Like Execution Cache Client 接口，共包含 3 个公开字段或方法。 |

## `RedisExecutionCacheStore`

Key-bound shared Execution Cache Store. The client port can wrap local, self-hosted, or managed Redis without exposing a Redis SDK to Core.

- 种类: 类
- 导入: `import { RedisExecutionCacheStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`redis-execution-cache-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/redis-execution-cache-store.ts)

### 声明

```text
export declare class RedisExecutionCacheStore implements ExecutionCacheStore {
    constructor(options: RedisExecutionCacheStoreOptions);
    get(key: string): Promise<ExecutionCacheRecord | null>;
    set(key: string, input: ExecutionCacheRecord): Promise<void>;
    delete(key: string): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RedisExecutionCacheStoreOptions): RedisExecutionCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;ExecutionCacheRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, input: ExecutionCacheRecord): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisExecutionCacheStoreOptions`

Redis Execution Cache Store Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisExecutionCacheStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`redis-execution-cache-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/redis-execution-cache-store.ts)

### 声明

```text
export interface RedisExecutionCacheStoreOptions {
    client: RedisLikeExecutionCacheClient;
    namespace?: string;
    maxEntryBytes?: number;
    defaultTtlMs?: number;
    now?: () => number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `client` | 属性 | <code>client: RedisLikeExecutionCacheClient</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultTtlMs` | 属性 | <code>defaultTtlMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `namespace` | 属性 | <code>namespace?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisLikeExecutionCacheClient`

Redis Like Execution Cache Client 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisLikeExecutionCacheClient } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`redis-execution-cache-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/redis-execution-cache-store.ts)

### 声明

```text
export interface RedisLikeExecutionCacheClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, mode: 'PX', durationMilliseconds: number): Promise<unknown>;
    del(...keys: string[]): Promise<number>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `del` | 方法 | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, value: string, mode: "PX", durationMilliseconds: number): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
