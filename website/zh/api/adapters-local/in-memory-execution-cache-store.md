# `@codesoul-co/hypha-adapters-local` / `in-memory-execution-cache-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/in-memory-execution-cache-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-cache-store.ts)
- 导出数: **4**

## 模块用法

用于持久化并读取该边界的数据。In memory execution cache store 模块公开 2 类、2 接口。

### 从包入口导入

```ts
import {
  InMemoryExecutionCacheStore,
  NodeExecutionFingerprintHasher,
} from '@codesoul-co/hypha-adapters-local';

import type {
  InMemoryExecutionCacheStoreOptions,
  InMemoryExecutionCacheStoreStats,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryExecutionCacheStore` | 类 | <code>new InMemoryExecutionCacheStore(options?: InMemoryExecutionCacheStoreOptions): InMemoryExecutionCacheStore</code> | Bounded local reference store. Durable or shared providers implement the same Core port. |
| `NodeExecutionFingerprintHasher` | 类 | <code>new NodeExecutionFingerprintHasher(): NodeExecutionFingerprintHasher</code> | Node Execution Fingerprint Hasher 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryExecutionCacheStoreOptions` | 接口 | <code>interface InMemoryExecutionCacheStoreOptions</code> | In Memory Execution Cache Store Options 接口，共包含 3 个公开字段或方法。 |
| `InMemoryExecutionCacheStoreStats` | 接口 | <code>interface InMemoryExecutionCacheStoreStats</code> | In Memory Execution Cache Store Stats 接口，共包含 3 个公开字段或方法。 |

## `InMemoryExecutionCacheStore`

Bounded local reference store. Durable or shared providers implement the same Core port.

- 种类: 类
- 导入: `import { InMemoryExecutionCacheStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`in-memory-execution-cache-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-cache-store.ts)

### 声明

```text
export declare class InMemoryExecutionCacheStore implements ExecutionCacheStore {
    constructor(options?: InMemoryExecutionCacheStoreOptions);
    get(key: string): Promise<ExecutionCacheRecord | null>;
    set(key: string, rawRecord: ExecutionCacheRecord): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
    stats(): InMemoryExecutionCacheStoreStats;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options?: InMemoryExecutionCacheStoreOptions): InMemoryExecutionCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;ExecutionCacheRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, rawRecord: ExecutionCacheRecord): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stats` | 方法 | <code>stats(): InMemoryExecutionCacheStoreStats</code> | 公开方法；参数与返回类型以签名列为准。 |

## `NodeExecutionFingerprintHasher`

Node Execution Fingerprint Hasher 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { NodeExecutionFingerprintHasher } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`in-memory-execution-cache-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-cache-store.ts)

### 声明

```text
export declare class NodeExecutionFingerprintHasher implements ExecutionFingerprintHasher {
    readonly algorithm: "sha256";
    hashUtf8(canonicalValue: string): Promise<string>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `algorithm` | 属性 | <code>readonly algorithm: "sha256"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(): NodeExecutionFingerprintHasher</code> | 创建该类的实例。 |
| `hashUtf8` | 方法 | <code>hashUtf8(canonicalValue: string): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryExecutionCacheStoreOptions`

In Memory Execution Cache Store Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InMemoryExecutionCacheStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`in-memory-execution-cache-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-cache-store.ts)

### 声明

```text
export interface InMemoryExecutionCacheStoreOptions {
    maxEntries?: number;
    maxBytes?: number;
    maxEntryBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxBytes` | 属性 | <code>maxBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEntries` | 属性 | <code>maxEntries?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InMemoryExecutionCacheStoreStats`

In Memory Execution Cache Store Stats 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InMemoryExecutionCacheStoreStats } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`in-memory-execution-cache-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-cache-store.ts)

### 声明

```text
export interface InMemoryExecutionCacheStoreStats {
    entries: number;
    sizeBytes: number;
    evictions: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `entries` | 属性 | <code>entries: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evictions` | 属性 | <code>evictions: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
