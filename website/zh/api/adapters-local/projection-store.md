# `@codesoul-co/hypha-adapters-local` / `projection-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/projection-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/projection-store.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Projection store 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  SQLiteProjectionStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteProjectionStoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteProjectionStore` | 类 | <code>new SQLiteProjectionStore&lt;TState = unknown&gt;(options: SQLiteProjectionStoreOptions): SQLiteProjectionStore&lt;TState&gt;</code> | SQLite Projection Store 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SQLiteProjectionStoreOptions` | 接口 | <code>interface SQLiteProjectionStoreOptions</code> | SQLite Projection Store Options 接口，共包含 2 个公开字段或方法。 |

## `SQLiteProjectionStore`

SQLite Projection Store 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SQLiteProjectionStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`projection-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/projection-store.ts)

### 声明

```text
export declare class SQLiteProjectionStore<TState = unknown> implements ProjectionStore<TState> {
    constructor(options: SQLiteProjectionStoreOptions);
    get(projectionId: string, key: string): Promise<ProjectionRecord<TState> | null>;
    put(record: ProjectionRecord<TState>, expectedRevision?: number): Promise<void>;
    delete(projectionId: string, key: string): Promise<void>;
    close(): void;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>&lt;TState = unknown&gt;(options: SQLiteProjectionStoreOptions): SQLiteProjectionStore&lt;TState&gt;</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(projectionId: string, key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(projectionId: string, key: string): Promise&lt;ProjectionRecord&lt;TState&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(record: ProjectionRecord&lt;TState&gt;, expectedRevision?: number): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SQLiteProjectionStoreOptions`

SQLite Projection Store Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SQLiteProjectionStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`projection-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/projection-store.ts)

### 声明

```text
export interface SQLiteProjectionStoreOptions {
    filename: string;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
