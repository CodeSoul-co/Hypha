# `@codesoul-co/hypha-core` / `modules/runtime/runtime-timer-worker`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-timer-worker.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-timer-worker.ts)
- 导出数: **2**

## 模块用法

用于执行该边界的运行时行为。Runtime timer worker 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  DurableRuntimeTimerWorker,
} from '@codesoul-co/hypha-core';

import type {
  DurableRuntimeTimerWorkerOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DurableRuntimeTimerWorker` | 类 | <code>new DurableRuntimeTimerWorker(options: DurableRuntimeTimerWorkerOptions): DurableRuntimeTimerWorker</code> | Durable Runtime Timer Worker 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DurableRuntimeTimerWorkerOptions` | 接口 | <code>interface DurableRuntimeTimerWorkerOptions</code> | Durable Runtime Timer Worker Options 接口，共包含 11 个公开字段或方法。 |

## `DurableRuntimeTimerWorker`

Durable Runtime Timer Worker 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DurableRuntimeTimerWorker } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-timer-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-timer-worker.ts)

### 声明

```text
export declare class DurableRuntimeTimerWorker {
    constructor(options: DurableRuntimeTimerWorkerOptions);
    sweep(input: RuntimeTimerSweepRequest): Promise<RuntimeTimerSweepResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DurableRuntimeTimerWorkerOptions): DurableRuntimeTimerWorker</code> | 创建该类的实例。 |
| `sweep` | 方法 | <code>sweep(input: RuntimeTimerSweepRequest): Promise&lt;RuntimeTimerSweepResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DurableRuntimeTimerWorkerOptions`

Durable Runtime Timer Worker Options 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableRuntimeTimerWorkerOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-timer-worker`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-timer-worker.ts)

### 声明

```text
export interface DurableRuntimeTimerWorkerOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    runLeases: RunLeaseStore;
    renewalIntervalMs?: number;
    wait?: (delayMs: number, signal: AbortSignal) => Promise<void>;
    onLeaseRenewalFailure?: (error: unknown, runId: string) => void;
    operationalTelemetry?: RuntimeOperationalTelemetry;
    monotonicNow?: () => number;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: EventRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `monotonicNow` | 方法 | <code>monotonicNow?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `nextId` | 方法 | <code>nextId?(namespace: string): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onLeaseRenewalFailure` | 方法 | <code>onLeaseRenewalFailure?(error: unknown, runId: string): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `operationalTelemetry` | 属性 | <code>operationalTelemetry?: RuntimeOperationalTelemetry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `renewalIntervalMs` | 属性 | <code>renewalIntervalMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `wait` | 方法 | <code>wait?(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
