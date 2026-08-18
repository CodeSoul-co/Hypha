# `@codesoul-co/hypha-adapters-local` / `state-execution-claim-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/state-execution-claim-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/state-execution-claim-store.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。State execution claim store 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  SQLiteStateExecutionClaimStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteStateExecutionClaimStoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteStateExecutionClaimStore` | 类 | <code>new SQLiteStateExecutionClaimStore(options: SQLiteStateExecutionClaimStoreOptions): SQLiteStateExecutionClaimStore</code> | SQLite State Execution Claim Store 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SQLiteStateExecutionClaimStoreOptions` | 接口 | <code>interface SQLiteStateExecutionClaimStoreOptions</code> | SQLite State Execution Claim Store Options 接口，共包含 3 个公开字段或方法。 |

## `SQLiteStateExecutionClaimStore`

SQLite State Execution Claim Store 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SQLiteStateExecutionClaimStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`state-execution-claim-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/state-execution-claim-store.ts)

### 声明

```text
export declare class SQLiteStateExecutionClaimStore implements StateExecutionClaimStore {
    constructor(options: SQLiteStateExecutionClaimStoreOptions);
    acquire(request: StateExecutionClaimAcquireRequest): Promise<StateExecutionClaim | null>;
    renew(request: StateExecutionClaimRenewRequest): Promise<StateExecutionClaim>;
    complete(request: StateExecutionClaimCompleteRequest): Promise<StateExecutionClaim>;
    release(request: StateExecutionClaimReleaseRequest): Promise<StateExecutionClaim>;
    get(scope: StateExecutionClaimScope, checkedAt?: string): Promise<StateExecutionClaim | null>;
    assertCurrent(request: StateExecutionClaimAssertionRequest): Promise<StateExecutionClaim>;
    close(): void;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: StateExecutionClaimAcquireRequest): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: StateExecutionClaimAssertionRequest): Promise&lt;StateExecutionClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `complete` | 方法 | <code>complete(request: StateExecutionClaimCompleteRequest): Promise&lt;StateExecutionClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: SQLiteStateExecutionClaimStoreOptions): SQLiteStateExecutionClaimStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scope: StateExecutionClaimScope, checkedAt?: string): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `release` | 方法 | <code>release(request: StateExecutionClaimReleaseRequest): Promise&lt;StateExecutionClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(request: StateExecutionClaimRenewRequest): Promise&lt;StateExecutionClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SQLiteStateExecutionClaimStoreOptions`

SQLite State Execution Claim Store Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SQLiteStateExecutionClaimStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`state-execution-claim-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/state-execution-claim-store.ts)

### 声明

```text
export interface SQLiteStateExecutionClaimStoreOptions {
    filename: string;
    runLeaseStore: Pick<RunLeaseStore, 'assertCurrent'>;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runLeaseStore` | 属性 | <code>runLeaseStore: Pick&lt;RunLeaseStore, "assertCurrent"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
