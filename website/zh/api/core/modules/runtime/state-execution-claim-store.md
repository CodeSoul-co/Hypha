# `@codesoul-co/hypha-core` / `modules/runtime/state-execution-claim-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/state-execution-claim-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/state-execution-claim-store.ts)
- 导出数: **4**

## 模块用法

用于持久化并读取该边界的数据。State execution claim store 模块公开 1 类、2 函数、1 接口。

### 从包入口导入

```ts
import {
  InMemoryStateExecutionClaimStore,
  stateExecutionClaimGuard,
  stateExecutionClaimScopeKey,
} from '@codesoul-co/hypha-core';

import type {
  InMemoryStateExecutionClaimStoreOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryStateExecutionClaimStore` | 类 | <code>new InMemoryStateExecutionClaimStore(options: InMemoryStateExecutionClaimStoreOptions): InMemoryStateExecutionClaimStore</code> | In Memory State Execution Claim Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `stateExecutionClaimGuard` | 函数 | <code>stateExecutionClaimGuard(claim: StateExecutionClaim): StateExecutionClaimGuard</code> | State Execution Claim Guard 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `stateExecutionClaimScopeKey` | 函数 | <code>stateExecutionClaimScopeKey(scope: StateExecutionClaimScope): string</code> | State Execution Claim Scope Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `InMemoryStateExecutionClaimStoreOptions` | 接口 | <code>interface InMemoryStateExecutionClaimStoreOptions</code> | In Memory State Execution Claim Store Options 接口，共包含 2 个公开字段或方法。 |

## `InMemoryStateExecutionClaimStore`

In Memory State Execution Claim Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryStateExecutionClaimStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/state-execution-claim-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/state-execution-claim-store.ts)

### 声明

```text
export declare class InMemoryStateExecutionClaimStore implements StateExecutionClaimStore {
    constructor(options: InMemoryStateExecutionClaimStoreOptions);
    acquire(request: StateExecutionClaimAcquireRequest): Promise<StateExecutionClaim | null>;
    renew(request: StateExecutionClaimRenewRequest): Promise<StateExecutionClaim>;
    complete(request: StateExecutionClaimCompleteRequest): Promise<StateExecutionClaim>;
    release(request: StateExecutionClaimReleaseRequest): Promise<StateExecutionClaim>;
    get(scope: StateExecutionClaimScope, checkedAt?: string): Promise<StateExecutionClaim | null>;
    assertCurrent(request: StateExecutionClaimAssertionRequest): Promise<StateExecutionClaim>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: StateExecutionClaimAcquireRequest): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: StateExecutionClaimAssertionRequest): Promise&lt;StateExecutionClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `complete` | 方法 | <code>complete(request: StateExecutionClaimCompleteRequest): Promise&lt;StateExecutionClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: InMemoryStateExecutionClaimStoreOptions): InMemoryStateExecutionClaimStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scope: StateExecutionClaimScope, checkedAt?: string): Promise&lt;StateExecutionClaim &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `release` | 方法 | <code>release(request: StateExecutionClaimReleaseRequest): Promise&lt;StateExecutionClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(request: StateExecutionClaimRenewRequest): Promise&lt;StateExecutionClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `stateExecutionClaimGuard`

State Execution Claim Guard 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { stateExecutionClaimGuard } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/state-execution-claim-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/state-execution-claim-store.ts)

### 声明

```text
export declare function stateExecutionClaimGuard(claim: StateExecutionClaim): StateExecutionClaimGuard;
```

### 调用签名

```text
stateExecutionClaimGuard(claim: StateExecutionClaim): StateExecutionClaimGuard
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `claim` | <code>StateExecutionClaim</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `StateExecutionClaimGuard`
- 说明: 返回值契约由上述类型定义。

## `stateExecutionClaimScopeKey`

State Execution Claim Scope Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { stateExecutionClaimScopeKey } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/state-execution-claim-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/state-execution-claim-store.ts)

### 声明

```text
export declare function stateExecutionClaimScopeKey(scope: StateExecutionClaimScope): string;
```

### 调用签名

```text
stateExecutionClaimScopeKey(scope: StateExecutionClaimScope): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `scope` | <code>StateExecutionClaimScope</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `InMemoryStateExecutionClaimStoreOptions`

In Memory State Execution Claim Store Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InMemoryStateExecutionClaimStoreOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/state-execution-claim-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/state-execution-claim-store.ts)

### 声明

```text
export interface InMemoryStateExecutionClaimStoreOptions {
    runLeaseStore: Pick<RunLeaseStore, 'assertCurrent'>;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runLeaseStore` | 属性 | <code>runLeaseStore: Pick&lt;RunLeaseStore, "assertCurrent"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
