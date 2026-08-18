# `@codesoul-co/hypha-core` / `modules/runtime/runtime-capacity-semaphore`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-capacity-semaphore.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-capacity-semaphore.ts)
- 导出数: **2**

## 模块用法

用于执行该边界的运行时行为。Runtime capacity semaphore 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  InMemoryRuntimeCapacitySemaphore,
} from '@codesoul-co/hypha-core';

import type {
  InMemoryRuntimeCapacitySemaphoreOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryRuntimeCapacitySemaphore` | 类 | <code>new InMemoryRuntimeCapacitySemaphore(options: InMemoryRuntimeCapacitySemaphoreOptions): InMemoryRuntimeCapacitySemaphore</code> | In Memory Runtime Capacity Semaphore 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryRuntimeCapacitySemaphoreOptions` | 接口 | <code>interface InMemoryRuntimeCapacitySemaphoreOptions</code> | In Memory Runtime Capacity Semaphore Options 接口，共包含 1 个公开字段或方法。 |

## `InMemoryRuntimeCapacitySemaphore`

In Memory Runtime Capacity Semaphore 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryRuntimeCapacitySemaphore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-capacity-semaphore`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-capacity-semaphore.ts)

### 声明

```text
export declare class InMemoryRuntimeCapacitySemaphore implements RuntimeCapacitySemaphore {
    constructor(options: InMemoryRuntimeCapacitySemaphoreOptions);
    acquire(request: RuntimeCapacityAcquireRequest): Promise<RuntimeCapacityLease | null>;
    renew(request: RuntimeCapacityRenewRequest): Promise<RuntimeCapacityLease>;
    release(request: RuntimeCapacityReleaseRequest): Promise<void>;
    assertCurrent(request: RuntimeCapacityAssertionRequest): Promise<RuntimeCapacityLease>;
    usage(request: RuntimeCapacityUsageRequest): Promise<RuntimeCapacityUsage>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: RuntimeCapacityAcquireRequest): Promise&lt;RuntimeCapacityLease &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: RuntimeCapacityAssertionRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: InMemoryRuntimeCapacitySemaphoreOptions): InMemoryRuntimeCapacitySemaphore</code> | 创建该类的实例。 |
| `release` | 方法 | <code>release(request: RuntimeCapacityReleaseRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(request: RuntimeCapacityRenewRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `usage` | 方法 | <code>usage(request: RuntimeCapacityUsageRequest): Promise&lt;RuntimeCapacityUsage&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryRuntimeCapacitySemaphoreOptions`

In Memory Runtime Capacity Semaphore Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InMemoryRuntimeCapacitySemaphoreOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-capacity-semaphore`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-capacity-semaphore.ts)

### 声明

```text
export interface InMemoryRuntimeCapacitySemaphoreOptions {
    policy: RuntimeCapacityPolicy;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `policy` | 属性 | <code>policy: RuntimeCapacityPolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
