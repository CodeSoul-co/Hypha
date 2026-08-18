# `@codesoul-co/hypha-adapters-local` / `run-lease-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/run-lease-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/run-lease-store.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Run lease store 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  SQLiteRunLeaseStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteRunLeaseStoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteRunLeaseStore` | 类 | <code>new SQLiteRunLeaseStore(options: SQLiteRunLeaseStoreOptions): SQLiteRunLeaseStore</code> | SQLite Run Lease Store 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SQLiteRunLeaseStoreOptions` | 接口 | <code>interface SQLiteRunLeaseStoreOptions</code> | SQLite Run Lease Store Options 接口，共包含 2 个公开字段或方法。 |

## `SQLiteRunLeaseStore`

SQLite Run Lease Store 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SQLiteRunLeaseStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`run-lease-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/run-lease-store.ts)

### 声明

```text
export declare class SQLiteRunLeaseStore implements RunLeaseStore {
    constructor(options: SQLiteRunLeaseStoreOptions);
    acquire(request: RunLeaseAcquireRequest): Promise<FencedRunLease | null>;
    preempt(request: RunLeasePreemptRequest): Promise<FencedRunLease>;
    heartbeat(request: RunLeaseHeartbeatRequest): Promise<FencedRunLease>;
    release(request: RunLeaseReleaseRequest): Promise<void>;
    get(scope: RunLeaseScope, checkedAt?: string): Promise<FencedRunLease | null>;
    assertCurrent(request: RunLeaseAssertionRequest): Promise<FencedRunLease>;
    close(): void;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: RunLeaseAcquireRequest): Promise&lt;FencedRunLease &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: RunLeaseAssertionRequest): Promise&lt;FencedRunLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: SQLiteRunLeaseStoreOptions): SQLiteRunLeaseStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scope: RunLeaseScope, checkedAt?: string): Promise&lt;FencedRunLease &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `heartbeat` | 方法 | <code>heartbeat(request: RunLeaseHeartbeatRequest): Promise&lt;FencedRunLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `preempt` | 方法 | <code>preempt(request: RunLeasePreemptRequest): Promise&lt;FencedRunLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `release` | 方法 | <code>release(request: RunLeaseReleaseRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SQLiteRunLeaseStoreOptions`

SQLite Run Lease Store Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SQLiteRunLeaseStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`run-lease-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/run-lease-store.ts)

### 声明

```text
export interface SQLiteRunLeaseStoreOptions {
    filename: string;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
