# `@codesoul-co/hypha-memory` / `working-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/working-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)
- 导出数: **6**

## 模块用法

用于持久化并读取该边界的数据。Working store 模块公开 2 类、4 接口。

### 从包入口导入

```ts
import {
  InMemoryWorkingMemoryStore,
  RedisWorkingMemoryStore,
} from '@codesoul-co/hypha-memory';

import type {
  RedisLikeWorkingMemoryClient,
  RedisWorkingMemoryStoreOptions,
  WorkingMemoryEntry,
  WorkingMemoryStore,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryWorkingMemoryStore` | 类 | <code>new InMemoryWorkingMemoryStore(now?: () =&gt; Date): InMemoryWorkingMemoryStore</code> | In Memory Working Memory Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RedisWorkingMemoryStore` | 类 | <code>new RedisWorkingMemoryStore(options: RedisWorkingMemoryStoreOptions): RedisWorkingMemoryStore</code> | Redis Working Memory Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RedisLikeWorkingMemoryClient` | 接口 | <code>interface RedisLikeWorkingMemoryClient</code> | Redis Like Working Memory Client 接口，共包含 5 个公开字段或方法。 |
| `RedisWorkingMemoryStoreOptions` | 接口 | <code>interface RedisWorkingMemoryStoreOptions</code> | Redis Working Memory Store Options 接口，共包含 7 个公开字段或方法。 |
| `WorkingMemoryEntry` | 接口 | <code>interface WorkingMemoryEntry</code> | Working Memory Entry 接口，共包含 8 个公开字段或方法。 |
| `WorkingMemoryStore` | 接口 | <code>interface WorkingMemoryStore</code> | Working Memory Store 接口，共包含 6 个公开字段或方法。 |

## `InMemoryWorkingMemoryStore`

In Memory Working Memory Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryWorkingMemoryStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`working-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)

### 声明

```text
export declare class InMemoryWorkingMemoryStore implements WorkingMemoryStore {
    constructor(now?: () => Date);
    get<TValue = unknown>(scope: ManagedMemoryScope, id: string): Promise<WorkingMemoryEntry<TValue> | null>;
    set<TValue = unknown>(entry: Omit<WorkingMemoryEntry<TValue>, 'scopeHash'>, ttlSeconds?: number): Promise<WorkingMemoryEntry<TValue>>;
    delete(scope: ManagedMemoryScope, id: string): Promise<void>;
    list<TValue = unknown>(scope: ManagedMemoryScope): Promise<Array<WorkingMemoryEntry<TValue>>>;
    clearScope(scope: ManagedMemoryScope): Promise<void>;
    health(): Promise<ProviderHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clearScope` | 方法 | <code>clearScope(scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(now?: () =&gt; Date): InMemoryWorkingMemoryStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(scope: ManagedMemoryScope, id: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, id: string): Promise&lt;WorkingMemoryEntry&lt;TValue&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set&lt;TValue = unknown&gt;(entry: Omit&lt;WorkingMemoryEntry&lt;TValue&gt;, "scopeHash"&gt;, ttlSeconds?: number): Promise&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisWorkingMemoryStore`

Redis Working Memory Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RedisWorkingMemoryStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`working-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)

### 声明

```text
export declare class RedisWorkingMemoryStore implements WorkingMemoryStore {
    constructor(options: RedisWorkingMemoryStoreOptions);
    get<TValue = unknown>(scope: ManagedMemoryScope, id: string): Promise<WorkingMemoryEntry<TValue> | null>;
    set<TValue = unknown>(entry: Omit<WorkingMemoryEntry<TValue>, 'scopeHash'>, ttlSeconds?: number | undefined): Promise<WorkingMemoryEntry<TValue>>;
    delete(scope: ManagedMemoryScope, id: string): Promise<void>;
    list<TValue = unknown>(scope: ManagedMemoryScope): Promise<Array<WorkingMemoryEntry<TValue>>>;
    clearScope(scope: ManagedMemoryScope): Promise<void>;
    health(): Promise<ProviderHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clearScope` | 方法 | <code>clearScope(scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: RedisWorkingMemoryStoreOptions): RedisWorkingMemoryStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(scope: ManagedMemoryScope, id: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, id: string): Promise&lt;WorkingMemoryEntry&lt;TValue&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set&lt;TValue = unknown&gt;(entry: Omit&lt;WorkingMemoryEntry&lt;TValue&gt;, "scopeHash"&gt;, ttlSeconds?: number &#124; undefined): Promise&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisLikeWorkingMemoryClient`

Redis Like Working Memory Client 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisLikeWorkingMemoryClient } from '@codesoul-co/hypha-memory';`
- 源码模块: [`working-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)

### 声明

```text
export interface RedisLikeWorkingMemoryClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, mode?: 'EX', durationSeconds?: number): Promise<unknown>;
    del(...keys: string[]): Promise<number>;
    scan(cursor: string, matchToken: 'MATCH', pattern: string, countToken: 'COUNT', count: number): Promise<[string, string[]]>;
    ping?(): Promise<string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `del` | 方法 | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `ping` | 方法 | <code>ping?(): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `scan` | 方法 | <code>scan(cursor: string, matchToken: "MATCH", pattern: string, countToken: "COUNT", count: number): Promise&lt;[string, string[]]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, value: string, mode?: "EX", durationSeconds?: number): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisWorkingMemoryStoreOptions`

Redis Working Memory Store Options 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisWorkingMemoryStoreOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`working-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)

### 声明

```text
export interface RedisWorkingMemoryStoreOptions {
    client: RedisLikeWorkingMemoryClient;
    namespace?: string;
    defaultTtlSeconds?: number;
    scanCount?: number;
    scanBudget?: Partial<Omit<RedisScanBudget, 'count'>>;
    now?: () => Date;
    nowMs?: () => number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `client` | 属性 | <code>client: RedisLikeWorkingMemoryClient</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultTtlSeconds` | 属性 | <code>defaultTtlSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `namespace` | 属性 | <code>namespace?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `nowMs` | 方法 | <code>nowMs?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `scanBudget` | 属性 | <code>scanBudget?: Partial&lt;Omit&lt;RedisScanBudget, "count"&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scanCount` | 属性 | <code>scanCount?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkingMemoryEntry`

Working Memory Entry 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkingMemoryEntry } from '@codesoul-co/hypha-memory';`
- 源码模块: [`working-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)

### 声明

```text
export interface WorkingMemoryEntry<TValue = unknown> {
    id: string;
    scope: ManagedMemoryScope;
    scopeHash: string;
    value: TValue;
    createdAt: string;
    updatedAt: string;
    expiresAt?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `value` | 属性 | <code>value: TValue</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkingMemoryStore`

Working Memory Store 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkingMemoryStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`working-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)

### 声明

```text
export interface WorkingMemoryStore {
    get<TValue = unknown>(scope: ManagedMemoryScope, id: string): Promise<WorkingMemoryEntry<TValue> | null>;
    set<TValue = unknown>(entry: Omit<WorkingMemoryEntry<TValue>, 'scopeHash'>, ttlSeconds?: number): Promise<WorkingMemoryEntry<TValue>>;
    delete(scope: ManagedMemoryScope, id: string): Promise<void>;
    list<TValue = unknown>(scope: ManagedMemoryScope): Promise<Array<WorkingMemoryEntry<TValue>>>;
    clearScope(scope: ManagedMemoryScope): Promise<void>;
    health(): Promise<ProviderHealth>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clearScope` | 方法 | <code>clearScope(scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(scope: ManagedMemoryScope, id: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, id: string): Promise&lt;WorkingMemoryEntry&lt;TValue&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set&lt;TValue = unknown&gt;(entry: Omit&lt;WorkingMemoryEntry&lt;TValue&gt;, "scopeHash"&gt;, ttlSeconds?: number): Promise&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
