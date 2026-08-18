# `@codesoul-co/hypha-memory` / `provider-operational-health`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/provider-operational-health.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)
- 导出数: **7**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Provider operational health 模块公开 1 类、4 接口、2 类型。

### 从包入口导入

```ts
import {
  MemoryOperationalHealthService,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryOperationalHealth,
  ProviderOperationalProbe,
  ProviderOperationalSnapshot,
  ProviderRuntimeMetrics,
  LivenessStatus,
  OperationalStatus,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryOperationalHealthService` | 类 | <code>new MemoryOperationalHealthService(probes: ProviderOperationalProbe[], now?: () =&gt; string): MemoryOperationalHealthService</code> | Memory Operational Health Service 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryOperationalHealth` | 接口 | <code>interface MemoryOperationalHealth</code> | Memory Operational Health 接口，共包含 4 个公开字段或方法。 |
| `ProviderOperationalProbe` | 接口 | <code>interface ProviderOperationalProbe</code> | Provider Operational Probe 接口，共包含 4 个公开字段或方法。 |
| `ProviderOperationalSnapshot` | 接口 | <code>interface ProviderOperationalSnapshot</code> | Provider Operational Snapshot 接口，共包含 4 个公开字段或方法。 |
| `ProviderRuntimeMetrics` | 接口 | <code>interface ProviderRuntimeMetrics</code> | Provider Runtime Metrics 接口，共包含 11 个公开字段或方法。 |
| `LivenessStatus` | 类型 | <code>type LivenessStatus = 'alive' &#124; 'stalled'</code> | Liveness Status 公共类型别名；完整类型表达式见声明。 |
| `OperationalStatus` | 类型 | <code>type OperationalStatus = 'ready' &#124; 'degraded' &#124; 'not_ready'</code> | Operational Status 公共类型别名；完整类型表达式见声明。 |

## `MemoryOperationalHealthService`

Memory Operational Health Service 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryOperationalHealthService } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-operational-health`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)

### 声明

```text
export declare class MemoryOperationalHealthService {
    constructor(probes: ProviderOperationalProbe[], now?: () => string);
    snapshot(signal?: AbortSignal): Promise<MemoryOperationalHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(probes: ProviderOperationalProbe[], now?: () =&gt; string): MemoryOperationalHealthService</code> | 创建该类的实例。 |
| `snapshot` | 方法 | <code>snapshot(signal?: AbortSignal): Promise&lt;MemoryOperationalHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryOperationalHealth`

Memory Operational Health 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryOperationalHealth } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-operational-health`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)

### 声明

```text
export interface MemoryOperationalHealth {
    readiness: {
        status: OperationalStatus;
        reasons: string[];
    };
    liveness: {
        status: LivenessStatus;
        reasons: string[];
    };
    providers: ProviderOperationalSnapshot[];
    checkedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `liveness` | 属性 | <code>liveness: { status: LivenessStatus; reasons: string[]; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providers` | 属性 | <code>providers: ProviderOperationalSnapshot[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `readiness` | 属性 | <code>readiness: { status: OperationalStatus; reasons: string[]; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ProviderOperationalProbe`

Provider Operational Probe 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProviderOperationalProbe } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-operational-health`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)

### 声明

```text
export interface ProviderOperationalProbe {
    readonly providerId: string;
    readonly required: boolean;
    health(signal?: AbortSignal): Promise<ProviderHealth>;
    metrics(): Promise<ProviderRuntimeMetrics>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `metrics` | 方法 | <code>metrics(): Promise&lt;ProviderRuntimeMetrics&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerId` | 属性 | <code>readonly providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `required` | 属性 | <code>readonly required: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ProviderOperationalSnapshot`

Provider Operational Snapshot 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProviderOperationalSnapshot } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-operational-health`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)

### 声明

```text
export interface ProviderOperationalSnapshot {
    providerId: string;
    health: ProviderHealth;
    metrics: ProviderRuntimeMetrics;
    required: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `health` | 属性 | <code>health: ProviderHealth</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metrics` | 属性 | <code>metrics: ProviderRuntimeMetrics</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `required` | 属性 | <code>required: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ProviderRuntimeMetrics`

Provider Runtime Metrics 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProviderRuntimeMetrics } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-operational-health`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)

### 声明

```text
export interface ProviderRuntimeMetrics {
    poolActive?: number;
    poolIdle?: number;
    poolLimit?: number;
    queueDepth?: number;
    queueOldestAgeMs?: number;
    retryAttempts?: number;
    retryBudgetRemaining?: number;
    circuitState?: 'closed' | 'open' | 'half_open';
    rateLimitRemaining?: number;
    quarantinedOperations?: number;
    deadLetterCount?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `circuitState` | 属性 | <code>circuitState?: "closed" &#124; "open" &#124; "half_open"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadLetterCount` | 属性 | <code>deadLetterCount?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `poolActive` | 属性 | <code>poolActive?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `poolIdle` | 属性 | <code>poolIdle?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `poolLimit` | 属性 | <code>poolLimit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quarantinedOperations` | 属性 | <code>quarantinedOperations?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `queueDepth` | 属性 | <code>queueDepth?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `queueOldestAgeMs` | 属性 | <code>queueOldestAgeMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rateLimitRemaining` | 属性 | <code>rateLimitRemaining?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryAttempts` | 属性 | <code>retryAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryBudgetRemaining` | 属性 | <code>retryBudgetRemaining?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LivenessStatus`

Liveness Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LivenessStatus } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-operational-health`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)

### 声明

```text
export type LivenessStatus = 'alive' | 'stalled';
```

## `OperationalStatus`

Operational Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { OperationalStatus } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-operational-health`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)

### 声明

```text
export type OperationalStatus = 'ready' | 'degraded' | 'not_ready';
```
