# `@codesoul-co/hypha-memory` / `provider-observability`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/provider-observability.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)
- 导出数: **11**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Provider observability 模块公开 2 类、6 接口、3 类型。

### 从包入口导入

```ts
import {
  MemoryProviderTelemetry,
  ObservedMemoryManagementProvider,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryProviderMetricSample,
  MemoryProviderOperationalReport,
  MemoryProviderOperationEstimate,
  MemoryProviderTelemetryOptions,
  MemoryProviderTelemetryPolicy,
  ObservedMemoryManagementProviderOptions,
  MemoryProviderCostEstimator,
  MemoryProviderOperation,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 9 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryProviderTelemetry` | 类 | <code>new MemoryProviderTelemetry(options: MemoryProviderTelemetryOptions): MemoryProviderTelemetry</code> | Bounded, content-free Provider telemetry with quota admission and SLO evaluation. Samples retain only operation metadata; requests, responses, scopes and content are never stored. |
| `ObservedMemoryManagementProvider` | 类 | <code>new ObservedMemoryManagementProvider(options: ObservedMemoryManagementProviderOptions): ObservedMemoryManagementProvider</code> | Provider decorator that instruments every canonical operation without changing Provider APIs. |
| `MemoryProviderMetricSample` | 接口 | <code>interface MemoryProviderMetricSample</code> | Memory Provider Metric Sample 接口，共包含 8 个公开字段或方法。 |
| `MemoryProviderOperationalReport` | 接口 | <code>interface MemoryProviderOperationalReport</code> | Memory Provider Operational Report 接口，共包含 9 个公开字段或方法。 |
| `MemoryProviderOperationEstimate` | 接口 | <code>interface MemoryProviderOperationEstimate</code> | Memory Provider Operation Estimate 接口，共包含 2 个公开字段或方法。 |
| `MemoryProviderTelemetryOptions` | 接口 | <code>interface MemoryProviderTelemetryOptions</code> | Memory Provider Telemetry Options 接口，共包含 3 个公开字段或方法。 |
| `MemoryProviderTelemetryPolicy` | 接口 | <code>interface MemoryProviderTelemetryPolicy</code> | Memory Provider Telemetry Policy 接口，共包含 4 个公开字段或方法。 |
| `ObservedMemoryManagementProviderOptions` | 接口 | <code>interface ObservedMemoryManagementProviderOptions</code> | Observed Memory Management Provider Options 接口，共包含 3 个公开字段或方法。 |
| `MemoryProviderCostEstimator` | 类型 | <code>type MemoryProviderCostEstimator = (operation: MemoryProviderOperation, request: unknown) =&gt; MemoryProviderOperationEstimate</code> | Memory Provider Cost Estimator 公共类型别名；完整类型表达式见声明。 |
| `MemoryProviderOperation` | 类型 | <code>type MemoryProviderOperation = 'add' &#124; 'search' &#124; 'get' &#124; 'list' &#124; 'update' &#124; 'delete' &#124; 'history' &#124; 'health'</code> | Memory Provider Operation 公共类型别名；完整类型表达式见声明。 |
| `MemoryProviderOperationOutcome` | 类型 | <code>type MemoryProviderOperationOutcome = 'succeeded' &#124; 'failed' &#124; 'quota_rejected'</code> | Memory Provider Operation Outcome 公共类型别名；完整类型表达式见声明。 |

## `MemoryProviderTelemetry`

Bounded, content-free Provider telemetry with quota admission and SLO evaluation. Samples retain only operation metadata; requests, responses, scopes and content are never stored.

- 种类: 类
- 导入: `import { MemoryProviderTelemetry } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### 声明

```text
export declare class MemoryProviderTelemetry {
    constructor(options: MemoryProviderTelemetryOptions);
    begin(providerId: string, operation: MemoryProviderOperation, estimate?: MemoryProviderOperationEstimate): Reservation;
    snapshot(providerId: string): MemoryProviderOperationalReport;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `begin` | 方法 | <code>begin(providerId: string, operation: MemoryProviderOperation, estimate?: MemoryProviderOperationEstimate): Reservation</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: MemoryProviderTelemetryOptions): MemoryProviderTelemetry</code> | 创建该类的实例。 |
| `snapshot` | 方法 | <code>snapshot(providerId: string): MemoryProviderOperationalReport</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ObservedMemoryManagementProvider`

Provider decorator that instruments every canonical operation without changing Provider APIs.

- 种类: 类
- 导入: `import { ObservedMemoryManagementProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### 声明

```text
export declare class ObservedMemoryManagementProvider implements MemoryManagementProvider {
    readonly id: string;
    constructor(options: ObservedMemoryManagementProviderOptions);
    capabilities(): Promise<import("./contracts").MemoryManagementCapabilities>;
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<import("./contracts").ManagedMemoryRecord<unknown> | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;import("./contracts").MemoryManagementCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: ObservedMemoryManagementProviderOptions): ObservedMemoryManagementProvider</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryProviderMetricSample`

Memory Provider Metric Sample 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProviderMetricSample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### 声明

```text
export interface MemoryProviderMetricSample {
    providerId: string;
    operation: MemoryProviderOperation;
    outcome: MemoryProviderOperationOutcome;
    latencyMs: number;
    occurredAt: string;
    costUnits?: number;
    storedBytesDelta?: number;
    errorCode?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `costUnits` | 属性 | <code>costUnits?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `errorCode` | 属性 | <code>errorCode?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `latencyMs` | 属性 | <code>latencyMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: MemoryProviderOperation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outcome` | 属性 | <code>outcome: MemoryProviderOperationOutcome</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `storedBytesDelta` | 属性 | <code>storedBytesDelta?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProviderOperationalReport`

Memory Provider Operational Report 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProviderOperationalReport } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### 声明

```text
export interface MemoryProviderOperationalReport {
    providerId: string;
    window: {
        startedAt: string;
        endedAt: string;
        durationMs: number;
    };
    operations: {
        total: number;
        succeeded: number;
        failed: number;
        quotaRejected: number;
        inFlight: number;
        byOperation: Partial<Record<MemoryProviderOperation, number>>;
    };
    availability: number | null;
    latencyMs: {
        p50: number | null;
        p95: number | null;
        p99: number | null;
        max: number | null;
    };
    cost: {
        measuredUnits: number;
        unpricedOperations: number;
        complete: boolean;
    };
    storage: {
        measuredBytes: number;
    };
    quota: {
        maxOperations?: number;
        remainingOperations?: number;
        maxCostUnits?: number;
        remainingCostUnits?: number;
        maxStoredBytes?: number;
        remainingStoredBytes?: number;
    };
    slo: {
        status: 'met' | 'breached' | 'insufficient_data';
        reasons: string[];
        minimumOperations: number;
        availabilityTarget?: number;
        latencyP95Ms?: number;
    };
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `availability` | 属性 | <code>availability: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cost` | 属性 | <code>cost: { measuredUnits: number; unpricedOperations: number; complete: boolean; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `latencyMs` | 属性 | <code>latencyMs: { p50: number &#124; null; p95: number &#124; null; p99: number &#124; null; max: number &#124; null; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operations` | 属性 | <code>operations: { total: number; succeeded: number; failed: number; quotaRejected: number; inFlight: number; byOperation: Partial&lt;Record&lt;MemoryProviderOperation, number&gt;&gt;; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quota` | 属性 | <code>quota: { maxOperations?: number; remainingOperations?: number; maxCostUnits?: number; remainingCostUnits?: number; maxStoredBytes?: number; remainingStoredBytes?: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `slo` | 属性 | <code>slo: { status: "met" &#124; "breached" &#124; "insufficient_data"; reasons: string[]; minimumOperations: number; availabilityTarget?: number; latencyP95Ms?: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `storage` | 属性 | <code>storage: { measuredBytes: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `window` | 属性 | <code>window: { startedAt: string; endedAt: string; durationMs: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProviderOperationEstimate`

Memory Provider Operation Estimate 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProviderOperationEstimate } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### 声明

```text
export interface MemoryProviderOperationEstimate {
    costUnits?: number;
    storedBytesDelta?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `costUnits` | 属性 | <code>costUnits?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `storedBytesDelta` | 属性 | <code>storedBytesDelta?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProviderTelemetryOptions`

Memory Provider Telemetry Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProviderTelemetryOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### 声明

```text
export interface MemoryProviderTelemetryOptions {
    defaultPolicy: MemoryProviderTelemetryPolicy;
    providerPolicies?: Record<string, MemoryProviderTelemetryPolicy>;
    now?: () => Date;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `defaultPolicy` | 属性 | <code>defaultPolicy: MemoryProviderTelemetryPolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerPolicies` | 属性 | <code>providerPolicies?: Record&lt;string, MemoryProviderTelemetryPolicy&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProviderTelemetryPolicy`

Memory Provider Telemetry Policy 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProviderTelemetryPolicy } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### 声明

```text
export interface MemoryProviderTelemetryPolicy {
    windowMs: number;
    maxSamples?: number;
    quota?: {
        maxOperations?: number;
        maxCostUnits?: number;
        maxStoredBytes?: number;
    };
    slo?: {
        minimumOperations?: number;
        availabilityTarget?: number;
        latencyP95Ms?: number;
    };
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxSamples` | 属性 | <code>maxSamples?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quota` | 属性 | <code>quota?: { maxOperations?: number; maxCostUnits?: number; maxStoredBytes?: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `slo` | 属性 | <code>slo?: { minimumOperations?: number; availabilityTarget?: number; latencyP95Ms?: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `windowMs` | 属性 | <code>windowMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ObservedMemoryManagementProviderOptions`

Observed Memory Management Provider Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ObservedMemoryManagementProviderOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### 声明

```text
export interface ObservedMemoryManagementProviderOptions {
    provider: MemoryManagementProvider;
    telemetry: MemoryProviderTelemetry;
    estimate?: MemoryProviderCostEstimator;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `estimate` | 方法 | <code>estimate?(operation: MemoryProviderOperation, request: unknown): MemoryProviderOperationEstimate</code> | 公开方法；参数与返回类型以签名列为准。 |
| `provider` | 属性 | <code>provider: MemoryManagementProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `telemetry` | 属性 | <code>telemetry: MemoryProviderTelemetry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProviderCostEstimator`

Memory Provider Cost Estimator 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryProviderCostEstimator } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### 声明

```text
export type MemoryProviderCostEstimator = (operation: MemoryProviderOperation, request: unknown) => MemoryProviderOperationEstimate;
```

## `MemoryProviderOperation`

Memory Provider Operation 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryProviderOperation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### 声明

```text
export type MemoryProviderOperation = 'add' | 'search' | 'get' | 'list' | 'update' | 'delete' | 'history' | 'health';
```

## `MemoryProviderOperationOutcome`

Memory Provider Operation Outcome 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryProviderOperationOutcome } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### 声明

```text
export type MemoryProviderOperationOutcome = 'succeeded' | 'failed' | 'quota_rejected';
```
