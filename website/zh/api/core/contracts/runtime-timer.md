# `@codesoul-co/hypha-core` / `contracts/runtime-timer`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-timer.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)
- 导出数: **6**

## 模块用法

用于声明并运行时校验契约。Runtime timer 模块公开 1 常量、4 接口、1 类型。

### 从包入口导入

```ts
import {
  RUNTIME_TIMER_SWEEP_DISPOSITIONS,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeTimerStreamScope,
  RuntimeTimerSweepRequest,
  RuntimeTimerSweepResult,
  RuntimeTimerSweepRunResult,
  RuntimeTimerSweepDisposition,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_TIMER_SWEEP_DISPOSITIONS` | 常量 | <code>const RUNTIME_TIMER_SWEEP_DISPOSITIONS: readonly ["fired", "not_due", "lease_unavailable", "already_resolved"]</code> | 由 `contracts/runtime-timer` 模块导出的 RUNTIME TIMER SWEEP DISPOSITIONS 常量。 |
| `RuntimeTimerStreamScope` | 接口 | <code>interface RuntimeTimerStreamScope</code> | Runtime Timer Stream Scope 接口，共包含 3 个公开字段或方法。 |
| `RuntimeTimerSweepRequest` | 接口 | <code>interface RuntimeTimerSweepRequest</code> | Runtime Timer Sweep Request 接口，共包含 5 个公开字段或方法。 |
| `RuntimeTimerSweepResult` | 接口 | <code>interface RuntimeTimerSweepResult</code> | Runtime Timer Sweep Result 接口，共包含 7 个公开字段或方法。 |
| `RuntimeTimerSweepRunResult` | 接口 | <code>interface RuntimeTimerSweepRunResult</code> | Runtime Timer Sweep Run Result 接口，共包含 3 个公开字段或方法。 |
| `RuntimeTimerSweepDisposition` | 类型 | <code>type RuntimeTimerSweepDisposition = (typeof RUNTIME_TIMER_SWEEP_DISPOSITIONS)[number]</code> | Runtime Timer Sweep Disposition 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_TIMER_SWEEP_DISPOSITIONS`

由 `contracts/runtime-timer` 模块导出的 RUNTIME TIMER SWEEP DISPOSITIONS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_TIMER_SWEEP_DISPOSITIONS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)

### 声明

```text
export declare const RUNTIME_TIMER_SWEEP_DISPOSITIONS: readonly ["fired", "not_due", "lease_unavailable", "already_resolved"];
```

## `RuntimeTimerStreamScope`

Runtime Timer Stream Scope 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeTimerStreamScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)

### 声明

```text
export interface RuntimeTimerStreamScope {
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

## `RuntimeTimerSweepRequest`

Runtime Timer Sweep Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeTimerSweepRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)

### 声明

```text
export interface RuntimeTimerSweepRequest {
    ownerId: string;
    leaseTtlMs: number;
    limit: number;
    cursor?: string;
    firedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cursor` | 属性 | <code>cursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `firedAt` | 属性 | <code>firedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeTimerSweepResult`

Runtime Timer Sweep Result 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeTimerSweepResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)

### 声明

```text
export interface RuntimeTimerSweepResult {
    scanned: number;
    fired: number;
    notDue: number;
    leaseUnavailable: number;
    alreadyResolved: number;
    results: RuntimeTimerSweepRunResult[];
    nextCursor?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `alreadyResolved` | 属性 | <code>alreadyResolved: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fired` | 属性 | <code>fired: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseUnavailable` | 属性 | <code>leaseUnavailable: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextCursor` | 属性 | <code>nextCursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `notDue` | 属性 | <code>notDue: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `results` | 属性 | <code>results: RuntimeTimerSweepRunResult[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scanned` | 属性 | <code>scanned: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeTimerSweepRunResult`

Runtime Timer Sweep Run Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeTimerSweepRunResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)

### 声明

```text
export interface RuntimeTimerSweepRunResult {
    scope: RuntimeTimerStreamScope;
    disposition: RuntimeTimerSweepDisposition;
    eventIds: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `disposition` | 属性 | <code>disposition: "lease_unavailable" &#124; "fired" &#124; "not_due" &#124; "already_resolved"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeTimerStreamScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeTimerSweepDisposition`

Runtime Timer Sweep Disposition 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeTimerSweepDisposition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer.ts)

### 声明

```text
export type RuntimeTimerSweepDisposition = (typeof RUNTIME_TIMER_SWEEP_DISPOSITIONS)[number];
```
