# `@codesoul-co/hypha-adapters-local` / `sqlite-execution-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/sqlite-execution-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store.ts)
- 导出数: **3**

## 模块用法

用于持久化并读取该边界的数据。Sqlite execution store 模块公开 1 类、2 类型。

### 从包入口导入

```ts
import {
  SQLiteExecutionStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteExecutionStoreErrorCode,
  SQLiteExecutionStoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteExecutionStore` | 类 | <code>new SQLiteExecutionStore(options: SQLiteExecutionStoreFoundationOptions): SQLiteExecutionStore</code> | Public durable local ExecutionStore adapter. Every persisted read is validated by the foundation before it crosses the provider boundary. CAS, idempotency, lease, fencing, migration, and close semantics are therefore exposed through the stable Core ExecutionStore port. |
| `SQLiteExecutionStoreErrorCode` | 类型 | <code>type SQLiteExecutionStoreErrorCode = SQLiteExecutionStoreFoundationErrorCode</code> | SQLite Execution Store Error Code 公共类型别名；完整类型表达式见声明。 |
| `SQLiteExecutionStoreOptions` | 类型 | <code>type SQLiteExecutionStoreOptions = SQLiteExecutionStoreFoundationOptions</code> | SQLite Execution Store Options 公共类型别名；完整类型表达式见声明。 |

## `SQLiteExecutionStore`

Public durable local ExecutionStore adapter. Every persisted read is validated by the foundation before it crosses the provider boundary. CAS, idempotency, lease, fencing, migration, and close semantics are therefore exposed through the stable Core ExecutionStore port.

- 种类: 类
- 导入: `import { SQLiteExecutionStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`sqlite-execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store.ts)

### 声明

```text
export declare class SQLiteExecutionStore extends SQLiteExecutionStoreFoundation implements ExecutionStore {
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquireLease` | 方法 | <code>acquireLease(input: ExecutionLeaseAcquireRequest): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `compareAndSet` | 方法 | <code>compareAndSet(input: ExecutionRecordCompareAndSetRequest): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: SQLiteExecutionStoreFoundationOptions): SQLiteExecutionStore</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: ExecutionRecordCreateRequest): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `filename` | 属性 | <code>readonly filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `get` | 方法 | <code>get(executionId: string): Promise&lt;ExecutionRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(input?: ExecutionRecordQuery): Promise&lt;ExecutionRecordPage&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `releaseLease` | 方法 | <code>releaseLease(input: ExecutionLeaseReleaseRequest): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renewLease` | 方法 | <code>renewLease(input: ExecutionLeaseRenewRequest): Promise&lt;ExecutionRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolveIdempotency` | 方法 | <code>resolveIdempotency(input: ExecutionIdempotencyQuery): Promise&lt;ExecutionIdempotencyResolution&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static schemaVersion` | 属性 | <code>static readonly schemaVersion: 7</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SQLiteExecutionStoreErrorCode`

SQLite Execution Store Error Code 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { SQLiteExecutionStoreErrorCode } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`sqlite-execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store.ts)

### 声明

```text
export type SQLiteExecutionStoreErrorCode = SQLiteExecutionStoreFoundationErrorCode;
```

## `SQLiteExecutionStoreOptions`

SQLite Execution Store Options 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { SQLiteExecutionStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`sqlite-execution-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store.ts)

### 声明

```text
export type SQLiteExecutionStoreOptions = SQLiteExecutionStoreFoundationOptions;
```
