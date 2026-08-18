# `@codesoul-co/hypha-core` / `modules/runtime/run-lease-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/run-lease-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-lease-store.ts)
- 导出数: **4**

## 模块用法

用于持久化并读取该边界的数据。Run lease store 模块公开 1 类、2 函数、1 接口。

### 从包入口导入

```ts
import {
  InMemoryRunLeaseStore,
  runLeaseGuard,
  runLeaseScopeKey,
} from '@codesoul-co/hypha-core';

import type {
  InMemoryRunLeaseStoreOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryRunLeaseStore` | 类 | <code>new InMemoryRunLeaseStore(options?: InMemoryRunLeaseStoreOptions): InMemoryRunLeaseStore</code> | In Memory Run Lease Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `runLeaseGuard` | 函数 | <code>runLeaseGuard(lease: FencedRunLease): { leaseId: string; ownerId: string; fencingToken: number; }</code> | Run Lease Guard 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `runLeaseScopeKey` | 函数 | <code>runLeaseScopeKey(scope: RunLeaseScope): string</code> | Run Lease Scope Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `InMemoryRunLeaseStoreOptions` | 接口 | <code>interface InMemoryRunLeaseStoreOptions</code> | In Memory Run Lease Store Options 接口，共包含 1 个公开字段或方法。 |

## `InMemoryRunLeaseStore`

In Memory Run Lease Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryRunLeaseStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/run-lease-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-lease-store.ts)

### 声明

```text
export declare class InMemoryRunLeaseStore implements RunLeaseStore {
    constructor(options?: InMemoryRunLeaseStoreOptions);
    acquire(request: RunLeaseAcquireRequest): Promise<FencedRunLease | null>;
    preempt(request: RunLeasePreemptRequest): Promise<FencedRunLease>;
    heartbeat(request: RunLeaseHeartbeatRequest): Promise<FencedRunLease>;
    release(request: RunLeaseReleaseRequest): Promise<void>;
    get(scope: RunLeaseScope, checkedAt?: string): Promise<FencedRunLease | null>;
    assertCurrent(request: RunLeaseAssertionRequest): Promise<FencedRunLease>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: RunLeaseAcquireRequest): Promise&lt;FencedRunLease &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: RunLeaseAssertionRequest): Promise&lt;FencedRunLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options?: InMemoryRunLeaseStoreOptions): InMemoryRunLeaseStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scope: RunLeaseScope, checkedAt?: string): Promise&lt;FencedRunLease &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `heartbeat` | 方法 | <code>heartbeat(request: RunLeaseHeartbeatRequest): Promise&lt;FencedRunLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `preempt` | 方法 | <code>preempt(request: RunLeasePreemptRequest): Promise&lt;FencedRunLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `release` | 方法 | <code>release(request: RunLeaseReleaseRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `runLeaseGuard`

Run Lease Guard 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runLeaseGuard } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/run-lease-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-lease-store.ts)

### 声明

```text
export declare function runLeaseGuard(lease: FencedRunLease): {
    leaseId: string;
    ownerId: string;
    fencingToken: number;
};
```

### 调用签名

```text
runLeaseGuard(lease: FencedRunLease): { leaseId: string; ownerId: string; fencingToken: number; }
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `lease` | <code>FencedRunLease</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `{ leaseId: string; ownerId: string; fencingToken: number; }`
- 说明: 返回值契约由上述类型定义。

## `runLeaseScopeKey`

Run Lease Scope Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runLeaseScopeKey } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/run-lease-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-lease-store.ts)

### 声明

```text
export declare function runLeaseScopeKey(scope: RunLeaseScope): string;
```

### 调用签名

```text
runLeaseScopeKey(scope: RunLeaseScope): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `scope` | <code>RunLeaseScope</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `InMemoryRunLeaseStoreOptions`

In Memory Run Lease Store Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InMemoryRunLeaseStoreOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/run-lease-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-lease-store.ts)

### 声明

```text
export interface InMemoryRunLeaseStoreOptions {
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
