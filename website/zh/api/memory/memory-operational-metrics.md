# `@codesoul-co/hypha-memory` / `memory-operational-metrics`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-operational-metrics.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)
- 导出数: **7**

## 模块用法

用于使用该功能边界的公共契约与操作。Memory operational metrics 模块公开 1 类、1 函数、4 接口、1 类型。

### 从包入口导入

```ts
import {
  MemoryOperationalMetrics,
  sanitizeMemoryOperationalValue,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryOperationalMetricLabels,
  MemoryOperationalMetricSample,
  MemoryOperationalMetricsSnapshot,
  MemoryOperationalRedactionPolicy,
  MemoryOperationalMetricKind,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryOperationalMetrics` | 类 | <code>new MemoryOperationalMetrics(maxSamples?: number): MemoryOperationalMetrics</code> | Bounded operational metrics that deliberately exclude scope, Memory content, Provider payloads, credentials and host paths from metric labels. |
| `sanitizeMemoryOperationalValue` | 函数 | <code>sanitizeMemoryOperationalValue(value: unknown, policy?: MemoryOperationalRedactionPolicy): unknown</code> | Produces log/evidence-safe data without mutating the supplied value. |
| `MemoryOperationalMetricLabels` | 接口 | <code>interface MemoryOperationalMetricLabels</code> | Memory Operational Metric Labels 接口，共包含 5 个公开字段或方法。 |
| `MemoryOperationalMetricSample` | 接口 | <code>interface MemoryOperationalMetricSample</code> | Memory Operational Metric Sample 接口，共包含 3 个公开字段或方法。 |
| `MemoryOperationalMetricsSnapshot` | 接口 | <code>interface MemoryOperationalMetricsSnapshot</code> | Memory Operational Metrics Snapshot 接口，共包含 3 个公开字段或方法。 |
| `MemoryOperationalRedactionPolicy` | 接口 | <code>interface MemoryOperationalRedactionPolicy</code> | Memory Operational Redaction Policy 接口，共包含 3 个公开字段或方法。 |
| `MemoryOperationalMetricKind` | 类型 | <code>type MemoryOperationalMetricKind = 'latency_ms' &#124; 'retry' &#124; 'reconcile' &#124; 'lease_contention' &#124; 'dlq' &#124; 'cache_bypass' &#124; 'scope_rejection'</code> | Memory Operational Metric Kind 公共类型别名；完整类型表达式见声明。 |

## `MemoryOperationalMetrics`

Bounded operational metrics that deliberately exclude scope, Memory content, Provider payloads, credentials and host paths from metric labels.

- 种类: 类
- 导入: `import { MemoryOperationalMetrics } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-operational-metrics`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)

### 声明

```text
export declare class MemoryOperationalMetrics {
    constructor(maxSamples?: number);
    record(kind: MemoryOperationalMetricKind, value?: number, labels?: MemoryOperationalMetricLabels): void;
    observeCacheEvent(event: MemorySearchCacheEvent): void;
    observeIndexEvent(event: IndexOutboxWorkerEvent): void;
    observeLifecycleEvent(event: MemoryLifecycleWorkerEvent): void;
    snapshot(): MemoryOperationalMetricsSnapshot;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(maxSamples?: number): MemoryOperationalMetrics</code> | 创建该类的实例。 |
| `observeCacheEvent` | 方法 | <code>observeCacheEvent(event: MemorySearchCacheEvent): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `observeIndexEvent` | 方法 | <code>observeIndexEvent(event: IndexOutboxWorkerEvent): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `observeLifecycleEvent` | 方法 | <code>observeLifecycleEvent(event: MemoryLifecycleWorkerEvent): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `record` | 方法 | <code>record(kind: MemoryOperationalMetricKind, value?: number, labels?: MemoryOperationalMetricLabels): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `snapshot` | 方法 | <code>snapshot(): MemoryOperationalMetricsSnapshot</code> | 公开方法；参数与返回类型以签名列为准。 |

## `sanitizeMemoryOperationalValue`

Produces log/evidence-safe data without mutating the supplied value.

- 种类: 函数
- 导入: `import { sanitizeMemoryOperationalValue } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-operational-metrics`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)

### 声明

```text
export declare function sanitizeMemoryOperationalValue(value: unknown, policy?: MemoryOperationalRedactionPolicy): unknown;
```

### 调用签名

```text
sanitizeMemoryOperationalValue(value: unknown, policy?: MemoryOperationalRedactionPolicy): unknown
```

Produces log/evidence-safe data without mutating the supplied value.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `policy` | <code>MemoryOperationalRedactionPolicy</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `unknown`
- 说明: 返回值契约由上述类型定义。

## `MemoryOperationalMetricLabels`

Memory Operational Metric Labels 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryOperationalMetricLabels } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-operational-metrics`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)

### 声明

```text
export interface MemoryOperationalMetricLabels {
    providerId?: string;
    operation?: string;
    workerType?: string;
    reason?: string;
    errorCode?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `errorCode` | 属性 | <code>errorCode?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workerType` | 属性 | <code>workerType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryOperationalMetricSample`

Memory Operational Metric Sample 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryOperationalMetricSample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-operational-metrics`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)

### 声明

```text
export interface MemoryOperationalMetricSample {
    kind: MemoryOperationalMetricKind;
    value: number;
    labels: MemoryOperationalMetricLabels;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kind` | 属性 | <code>kind: MemoryOperationalMetricKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `labels` | 属性 | <code>labels: MemoryOperationalMetricLabels</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `value` | 属性 | <code>value: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryOperationalMetricsSnapshot`

Memory Operational Metrics Snapshot 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryOperationalMetricsSnapshot } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-operational-metrics`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)

### 声明

```text
export interface MemoryOperationalMetricsSnapshot {
    counters: Partial<Record<Exclude<MemoryOperationalMetricKind, 'latency_ms'>, number>>;
    latencyMs: {
        count: number;
        p50: number | null;
        p95: number | null;
        max: number | null;
    };
    samples: MemoryOperationalMetricSample[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `counters` | 属性 | <code>counters: Partial&lt;Record&lt;"retry" &#124; "reconcile" &#124; "dlq" &#124; "lease_contention" &#124; "cache_bypass" &#124; "scope_rejection", number&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `latencyMs` | 属性 | <code>latencyMs: { count: number; p50: number &#124; null; p95: number &#124; null; max: number &#124; null; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `samples` | 属性 | <code>samples: MemoryOperationalMetricSample[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryOperationalRedactionPolicy`

Memory Operational Redaction Policy 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryOperationalRedactionPolicy } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-operational-metrics`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)

### 声明

```text
export interface MemoryOperationalRedactionPolicy {
    contentMode?: 'redact' | 'hash';
    hostPathMode?: 'redact' | 'basename';
    maxDepth?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentMode` | 属性 | <code>contentMode?: "hash" &#124; "redact"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hostPathMode` | 属性 | <code>hostPathMode?: "redact" &#124; "basename"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxDepth` | 属性 | <code>maxDepth?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryOperationalMetricKind`

Memory Operational Metric Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryOperationalMetricKind } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-operational-metrics`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)

### 声明

```text
export type MemoryOperationalMetricKind = 'latency_ms' | 'retry' | 'reconcile' | 'lease_contention' | 'dlq' | 'cache_bypass' | 'scope_rejection';
```
