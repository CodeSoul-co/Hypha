# `@codesoul-co/hypha-core` / `modules/runtime/runtime-timer-worker`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-timer-worker.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-timer-worker.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DurableRuntimeTimerWorker` | 类 | <code>new DurableRuntimeTimerWorker(options: DurableRuntimeTimerWorkerOptions): DurableRuntimeTimerWorker</code> | Durable Runtime Timer Worker 的运行时实现；公开构造函数与成员见下表。 |
| `DurableRuntimeTimerWorkerOptions` | 接口 | <code>interface DurableRuntimeTimerWorkerOptions</code> | Durable Runtime Timer Worker Options 的字段契约；完整字段见下表。 |

## `DurableRuntimeTimerWorker` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DurableRuntimeTimerWorkerOptions): DurableRuntimeTimerWorker</code> | 创建该类的实例。 |
| `sweep` | 方法 | <code>sweep(input: RuntimeTimerSweepRequest): Promise&lt;RuntimeTimerSweepResult&gt;</code> | sweep 的公开运行时操作。 |

## `DurableRuntimeTimerWorkerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: EventRuntime</code> | events 字段。 |
| `monotonicNow` | 方法 | <code>monotonicNow(): number</code> | monotonic Now 的公开运行时操作。 |
| `nextId` | 方法 | <code>nextId(namespace: string): string</code> | next Id 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `onLeaseRenewalFailure` | 方法 | <code>onLeaseRenewalFailure(error: unknown, runId: string): void</code> | 处理 Lease Renewal Failure。 |
| `operationalTelemetry` | 属性 | <code>operationalTelemetry: RuntimeOperationalTelemetry</code> | operational Telemetry 字段。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | projections 字段。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | projection Store 字段。 |
| `renewalIntervalMs` | 属性 | <code>renewalIntervalMs: number</code> | renewal Interval Ms 字段。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | run Leases 字段。 |
| `wait` | 方法 | <code>wait(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | wait 的公开运行时操作。 |
