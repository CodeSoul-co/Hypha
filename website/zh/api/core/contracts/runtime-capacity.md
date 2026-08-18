# `@codesoul-co/hypha-core` / `contracts/runtime-capacity`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-capacity.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)
- 导出数: **14**

## 模块用法

用于声明并运行时校验契约。Runtime capacity 模块公开 1 常量、12 接口、1 类型。

### 从包入口导入

```ts
import {
  RUNTIME_CAPACITY_KINDS,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeCapacityAcquireRequest,
  RuntimeCapacityAssertionRequest,
  RuntimeCapacityLease,
  RuntimeCapacityLeaseGuard,
  RuntimeCapacityLimit,
  RuntimeCapacityPolicy,
  RuntimeCapacityReleaseRequest,
  RuntimeCapacityRenewRequest,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 13 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_CAPACITY_KINDS` | 常量 | <code>const RUNTIME_CAPACITY_KINDS: readonly ["model", "tool", "execution"]</code> | 由 `contracts/runtime-capacity` 模块导出的 RUNTIME CAPACITY KINDS 常量。 |
| `RuntimeCapacityAcquireRequest` | 接口 | <code>interface RuntimeCapacityAcquireRequest extends RuntimeCapacityScope</code> | Runtime Capacity Acquire Request 接口，共包含 10 个公开字段或方法。 |
| `RuntimeCapacityAssertionRequest` | 接口 | <code>interface RuntimeCapacityAssertionRequest</code> | Runtime Capacity Assertion Request 接口，共包含 4 个公开字段或方法。 |
| `RuntimeCapacityLease` | 接口 | <code>interface RuntimeCapacityLease extends RuntimeCapacityScope</code> | Runtime Capacity Lease 接口，共包含 12 个公开字段或方法。 |
| `RuntimeCapacityLeaseGuard` | 接口 | <code>interface RuntimeCapacityLeaseGuard</code> | Runtime Capacity Lease Guard 接口，共包含 3 个公开字段或方法。 |
| `RuntimeCapacityLimit` | 接口 | <code>interface RuntimeCapacityLimit</code> | Runtime Capacity Limit 接口，共包含 2 个公开字段或方法。 |
| `RuntimeCapacityPolicy` | 接口 | <code>interface RuntimeCapacityPolicy</code> | Runtime Capacity Policy 接口，共包含 3 个公开字段或方法。 |
| `RuntimeCapacityReleaseRequest` | 接口 | <code>interface RuntimeCapacityReleaseRequest</code> | Runtime Capacity Release Request 接口，共包含 4 个公开字段或方法。 |
| `RuntimeCapacityRenewRequest` | 接口 | <code>interface RuntimeCapacityRenewRequest</code> | Runtime Capacity Renew Request 接口，共包含 5 个公开字段或方法。 |
| `RuntimeCapacityScope` | 接口 | <code>interface RuntimeCapacityScope</code> | Runtime Capacity Scope 接口，共包含 3 个公开字段或方法。 |
| `RuntimeCapacitySemaphore` | 接口 | <code>interface RuntimeCapacitySemaphore</code> | Runtime Capacity Semaphore 接口，共包含 5 个公开字段或方法。 |
| `RuntimeCapacityUsage` | 接口 | <code>interface RuntimeCapacityUsage</code> | Runtime Capacity Usage 接口，共包含 7 个公开字段或方法。 |
| `RuntimeCapacityUsageRequest` | 接口 | <code>interface RuntimeCapacityUsageRequest</code> | Runtime Capacity Usage Request 接口，共包含 4 个公开字段或方法。 |
| `RuntimeCapacityKind` | 类型 | <code>type RuntimeCapacityKind = (typeof RUNTIME_CAPACITY_KINDS)[number]</code> | Runtime Capacity Kind 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_CAPACITY_KINDS`

由 `contracts/runtime-capacity` 模块导出的 RUNTIME CAPACITY KINDS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_CAPACITY_KINDS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### 声明

```text
export declare const RUNTIME_CAPACITY_KINDS: readonly ["model", "tool", "execution"];
```

## `RuntimeCapacityAcquireRequest`

Runtime Capacity Acquire Request 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCapacityAcquireRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### 声明

```text
export interface RuntimeCapacityAcquireRequest extends RuntimeCapacityScope {
    kind: RuntimeCapacityKind;
    operationId: string;
    requestedLeaseId: string;
    ownerId: string;
    acquiredAt: string;
    ttlMs: number;
    idempotencyKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedLeaseId` | 属性 | <code>requestedLeaseId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCapacityAssertionRequest`

Runtime Capacity Assertion Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCapacityAssertionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### 声明

```text
export interface RuntimeCapacityAssertionRequest {
    scope: RuntimeCapacityScope;
    kind: RuntimeCapacityKind;
    guard: RuntimeCapacityLeaseGuard;
    checkedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `guard` | 属性 | <code>guard: RuntimeCapacityLeaseGuard</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeCapacityScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCapacityLease`

Runtime Capacity Lease 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCapacityLease } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### 声明

```text
export interface RuntimeCapacityLease extends RuntimeCapacityScope {
    id: string;
    kind: RuntimeCapacityKind;
    operationId: string;
    ownerId: string;
    fencingToken: number;
    policyRevision: string;
    acquiredAt: string;
    heartbeatAt: string;
    expiresAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquiredAt` | 属性 | <code>acquiredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `heartbeatAt` | 属性 | <code>heartbeatAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCapacityLeaseGuard`

Runtime Capacity Lease Guard 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCapacityLeaseGuard } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### 声明

```text
export interface RuntimeCapacityLeaseGuard {
    leaseId: string;
    ownerId: string;
    fencingToken: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseId` | 属性 | <code>leaseId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCapacityLimit`

Runtime Capacity Limit 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCapacityLimit } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### 声明

```text
export interface RuntimeCapacityLimit {
    global: number;
    perUser: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `global` | 属性 | <code>global: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `perUser` | 属性 | <code>perUser: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCapacityPolicy`

Runtime Capacity Policy 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCapacityPolicy } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### 声明

```text
export interface RuntimeCapacityPolicy {
    version: '1.0.0';
    revision: string;
    limits: Record<RuntimeCapacityKind, RuntimeCapacityLimit>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `limits` | 属性 | <code>limits: Record&lt;"tool" &#124; "model" &#124; "execution", RuntimeCapacityLimit&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCapacityReleaseRequest`

Runtime Capacity Release Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCapacityReleaseRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### 声明

```text
export interface RuntimeCapacityReleaseRequest {
    scope: RuntimeCapacityScope;
    kind: RuntimeCapacityKind;
    guard: RuntimeCapacityLeaseGuard;
    releasedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guard` | 属性 | <code>guard: RuntimeCapacityLeaseGuard</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `releasedAt` | 属性 | <code>releasedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeCapacityScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCapacityRenewRequest`

Runtime Capacity Renew Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCapacityRenewRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### 声明

```text
export interface RuntimeCapacityRenewRequest {
    scope: RuntimeCapacityScope;
    kind: RuntimeCapacityKind;
    guard: RuntimeCapacityLeaseGuard;
    renewedAt: string;
    ttlMs: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guard` | 属性 | <code>guard: RuntimeCapacityLeaseGuard</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `renewedAt` | 属性 | <code>renewedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeCapacityScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCapacityScope`

Runtime Capacity Scope 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCapacityScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### 声明

```text
export interface RuntimeCapacityScope {
    tenantId?: string;
    userId: string;
    runId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCapacitySemaphore`

Runtime Capacity Semaphore 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCapacitySemaphore } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### 声明

```text
export interface RuntimeCapacitySemaphore {
    acquire(request: RuntimeCapacityAcquireRequest): Promise<RuntimeCapacityLease | null>;
    renew(request: RuntimeCapacityRenewRequest): Promise<RuntimeCapacityLease>;
    release(request: RuntimeCapacityReleaseRequest): Promise<void>;
    assertCurrent(request: RuntimeCapacityAssertionRequest): Promise<RuntimeCapacityLease>;
    usage(request: RuntimeCapacityUsageRequest): Promise<RuntimeCapacityUsage>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(request: RuntimeCapacityAcquireRequest): Promise&lt;RuntimeCapacityLease &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `assertCurrent` | 方法 | <code>assertCurrent(request: RuntimeCapacityAssertionRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `release` | 方法 | <code>release(request: RuntimeCapacityReleaseRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `renew` | 方法 | <code>renew(request: RuntimeCapacityRenewRequest): Promise&lt;RuntimeCapacityLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `usage` | 方法 | <code>usage(request: RuntimeCapacityUsageRequest): Promise&lt;RuntimeCapacityUsage&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeCapacityUsage`

Runtime Capacity Usage 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCapacityUsage } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### 声明

```text
export interface RuntimeCapacityUsage {
    kind: RuntimeCapacityKind;
    policyRevision: string;
    globalActive: number;
    userActive: number;
    globalLimit: number;
    userLimit: number;
    checkedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `globalActive` | 属性 | <code>globalActive: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `globalLimit` | 属性 | <code>globalLimit: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userActive` | 属性 | <code>userActive: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userLimit` | 属性 | <code>userLimit: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCapacityUsageRequest`

Runtime Capacity Usage Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCapacityUsageRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### 声明

```text
export interface RuntimeCapacityUsageRequest {
    tenantId?: string;
    userId: string;
    kind: RuntimeCapacityKind;
    checkedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "tool" &#124; "model" &#124; "execution"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCapacityKind`

Runtime Capacity Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeCapacityKind } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-capacity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-capacity.ts)

### 声明

```text
export type RuntimeCapacityKind = (typeof RUNTIME_CAPACITY_KINDS)[number];
```
