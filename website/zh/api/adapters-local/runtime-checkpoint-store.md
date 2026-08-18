# `@codesoul-co/hypha-adapters-local` / `runtime-checkpoint-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/runtime-checkpoint-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-checkpoint-store.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Runtime checkpoint store 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  SQLiteRuntimeCheckpointStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteRuntimeCheckpointStoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteRuntimeCheckpointStore` | 类 | <code>new SQLiteRuntimeCheckpointStore(options: SQLiteRuntimeCheckpointStoreOptions): SQLiteRuntimeCheckpointStore</code> | SQLite Runtime Checkpoint Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SQLiteRuntimeCheckpointStoreOptions` | 接口 | <code>interface SQLiteRuntimeCheckpointStoreOptions</code> | SQLite Runtime Checkpoint Store Options 接口，共包含 2 个公开字段或方法。 |

## `SQLiteRuntimeCheckpointStore`

SQLite Runtime Checkpoint Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SQLiteRuntimeCheckpointStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`runtime-checkpoint-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-checkpoint-store.ts)

### 声明

```text
export declare class SQLiteRuntimeCheckpointStore implements RuntimeCheckpointStore {
    constructor(options: SQLiteRuntimeCheckpointStoreOptions);
    put(input: RuntimeCheckpointRecord, idempotencyKey: string): Promise<RuntimeCheckpointPutResult>;
    get(scope: RuntimeScope, checkpointId: string): Promise<RuntimeCheckpointRecord | null>;
    latest(scope: RuntimeScope): Promise<RuntimeCheckpointRecord | null>;
    list(scope: RuntimeScope, limit?: number): Promise<RuntimeCheckpointRecord[]>;
    close(): void;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: SQLiteRuntimeCheckpointStoreOptions): SQLiteRuntimeCheckpointStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scope: RuntimeScope, checkpointId: string): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `latest` | 方法 | <code>latest(scope: RuntimeScope): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(scope: RuntimeScope, limit?: number): Promise&lt;RuntimeCheckpointRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(input: RuntimeCheckpointRecord, idempotencyKey: string): Promise&lt;RuntimeCheckpointPutResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SQLiteRuntimeCheckpointStoreOptions`

SQLite Runtime Checkpoint Store Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SQLiteRuntimeCheckpointStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`runtime-checkpoint-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-checkpoint-store.ts)

### 声明

```text
export interface SQLiteRuntimeCheckpointStoreOptions {
    filename: string;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
