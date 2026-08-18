# `@codesoul-co/hypha-core` / `modules/runtime/resource-coordinator`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/resource-coordinator.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/resource-coordinator.ts)
- 导出数: **3**

## 模块用法

用于执行该边界的运行时行为。Resource coordinator 模块公开 1 类、1 函数、1 接口。

### 从包入口导入

```ts
import {
  InMemoryRuntimeResourceCoordinator,
  resourceClaimGuard,
} from '@codesoul-co/hypha-core';

import type {
  InMemoryRuntimeResourceCoordinatorOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryRuntimeResourceCoordinator` | 类 | <code>new InMemoryRuntimeResourceCoordinator(options: InMemoryRuntimeResourceCoordinatorOptions): InMemoryRuntimeResourceCoordinator</code> | In Memory Runtime Resource Coordinator 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `resourceClaimGuard` | 函数 | <code>resourceClaimGuard(claim: RuntimeResourceClaim): { claimId: string; ownerId: string; fencingToken: number; }</code> | Resource Claim Guard 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `InMemoryRuntimeResourceCoordinatorOptions` | 接口 | <code>interface InMemoryRuntimeResourceCoordinatorOptions</code> | In Memory Runtime Resource Coordinator Options 接口，共包含 1 个公开字段或方法。 |

## `InMemoryRuntimeResourceCoordinator`

In Memory Runtime Resource Coordinator 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryRuntimeResourceCoordinator } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/resource-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/resource-coordinator.ts)

### 声明

```text
export declare class InMemoryRuntimeResourceCoordinator implements RuntimeResourceCoordinator {
    constructor(options: InMemoryRuntimeResourceCoordinatorOptions);
    acquire(request: ResourceAcquireRequest): Promise<RuntimeResourceClaim[]>;
    renew(request: ResourceRenewRequest): Promise<RuntimeResourceClaim[]>;
    release(request: ResourceReleaseRequest): Promise<void>;
    list(request: ResourceListRequest): Promise<RuntimeResourceClaim[]>;
    assertCurrent(request: ResourceClaimAssertionRequest): Promise<RuntimeResourceClaim>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: ResourceAcquireRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: ResourceClaimAssertionRequest): Promise&lt;RuntimeResourceClaim&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: InMemoryRuntimeResourceCoordinatorOptions): InMemoryRuntimeResourceCoordinator</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(request: ResourceListRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `release` | 方法 | <code>release(request: ResourceReleaseRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(request: ResourceRenewRequest): Promise&lt;RuntimeResourceClaim[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `resourceClaimGuard`

Resource Claim Guard 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { resourceClaimGuard } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/resource-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/resource-coordinator.ts)

### 声明

```text
export declare function resourceClaimGuard(claim: RuntimeResourceClaim): {
    claimId: string;
    ownerId: string;
    fencingToken: number;
};
```

### 调用签名

```text
resourceClaimGuard(claim: RuntimeResourceClaim): { claimId: string; ownerId: string; fencingToken: number; }
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `claim` | <code>RuntimeResourceClaim</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `{ claimId: string; ownerId: string; fencingToken: number; }`
- 说明: 返回值契约由上述类型定义。

## `InMemoryRuntimeResourceCoordinatorOptions`

In Memory Runtime Resource Coordinator Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InMemoryRuntimeResourceCoordinatorOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/resource-coordinator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/resource-coordinator.ts)

### 声明

```text
export interface InMemoryRuntimeResourceCoordinatorOptions {
    runLeaseStore: Pick<RunLeaseStore, 'assertCurrent'>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runLeaseStore` | 属性 | <code>runLeaseStore: Pick&lt;RunLeaseStore, "assertCurrent"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
