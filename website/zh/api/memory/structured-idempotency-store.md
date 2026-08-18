# `@codesoul-co/hypha-memory` / `structured-idempotency-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/structured-idempotency-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-idempotency-store.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Structured idempotency store 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  StructuredMemoryIdempotencyStore,
} from '@codesoul-co/hypha-memory';

import type {
  StructuredMemoryIdempotencyStoreOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `StructuredMemoryIdempotencyStore` | 类 | <code>new StructuredMemoryIdempotencyStore(options: StructuredMemoryIdempotencyStoreOptions): StructuredMemoryIdempotencyStore</code> | Durable idempotency results used to reconcile retries after process restart. |
| `StructuredMemoryIdempotencyStoreOptions` | 接口 | <code>interface StructuredMemoryIdempotencyStoreOptions</code> | Structured Memory Idempotency Store Options 接口，共包含 2 个公开字段或方法。 |

## `StructuredMemoryIdempotencyStore`

Durable idempotency results used to reconcile retries after process restart.

- 种类: 类
- 导入: `import { StructuredMemoryIdempotencyStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-idempotency-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-idempotency-store.ts)

### 声明

```text
export declare class StructuredMemoryIdempotencyStore implements MemoryIdempotencyStore {
    constructor(options: StructuredMemoryIdempotencyStoreOptions);
    get(scopeHash: string, key: string): Promise<unknown | null>;
    set(scopeHash: string, key: string, result: unknown): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: StructuredMemoryIdempotencyStoreOptions): StructuredMemoryIdempotencyStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scopeHash: string, key: string): Promise&lt;unknown &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(scopeHash: string, key: string, result: unknown): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `StructuredMemoryIdempotencyStoreOptions`

Structured Memory Idempotency Store Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StructuredMemoryIdempotencyStoreOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`structured-idempotency-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-idempotency-store.ts)

### 声明

```text
export interface StructuredMemoryIdempotencyStoreOptions {
    store: StructuredStoreProvider;
    table?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `store` | 属性 | <code>store: StructuredStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `table` | 属性 | <code>table?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
