# `@codesoul-co/hypha-memory` / `memory-operational-metrics`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-operational-metrics.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryOperationalMetrics` | 类 | <code>new MemoryOperationalMetrics(maxSamples?: number): MemoryOperationalMetrics</code> | Bounded operational metrics that deliberately exclude scope, Memory content, Provider payloads, credentials and host paths from metric labels. |
| `sanitizeMemoryOperationalValue` | 函数 | <code>sanitizeMemoryOperationalValue(value: unknown, policy?: MemoryOperationalRedactionPolicy): unknown</code> | Produces log/evidence-safe data without mutating the supplied value. |
| `MemoryOperationalMetricLabels` | 接口 | <code>interface MemoryOperationalMetricLabels</code> | Memory Operational Metric Labels 的字段契约；完整字段见下表。 |
| `MemoryOperationalMetricSample` | 接口 | <code>interface MemoryOperationalMetricSample</code> | Memory Operational Metric Sample 的字段契约；完整字段见下表。 |
| `MemoryOperationalMetricsSnapshot` | 接口 | <code>interface MemoryOperationalMetricsSnapshot</code> | Memory Operational Metrics Snapshot 的字段契约；完整字段见下表。 |
| `MemoryOperationalRedactionPolicy` | 接口 | <code>interface MemoryOperationalRedactionPolicy</code> | Memory Operational Redaction Policy 的字段契约；完整字段见下表。 |
| `MemoryOperationalMetricKind` | 类型 | <code>type MemoryOperationalMetricKind = 'latency_ms' &#124; 'retry' &#124; 'reconcile' &#124; 'lease_contention' &#124; 'dlq' &#124; 'cache_bypass' &#124; 'scope_rejection'</code> | Memory Operational Metric Kind 的公共类型别名。 |

## `MemoryOperationalMetrics` 公开成员

Bounded operational metrics that deliberately exclude scope, Memory content, Provider payloads, credentials and host paths from metric labels.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(maxSamples?: number): MemoryOperationalMetrics</code> | 创建该类的实例。 |
| `observeCacheEvent` | 方法 | <code>observeCacheEvent(event: MemorySearchCacheEvent): void</code> | observe Cache Event 的公开运行时操作。 |
| `observeIndexEvent` | 方法 | <code>observeIndexEvent(event: IndexOutboxWorkerEvent): void</code> | observe Index Event 的公开运行时操作。 |
| `observeLifecycleEvent` | 方法 | <code>observeLifecycleEvent(event: MemoryLifecycleWorkerEvent): void</code> | observe Lifecycle Event 的公开运行时操作。 |
| `record` | 方法 | <code>record(kind: MemoryOperationalMetricKind, value?: number, labels?: MemoryOperationalMetricLabels): void</code> | 记录 record。 |
| `snapshot` | 方法 | <code>snapshot(): MemoryOperationalMetricsSnapshot</code> | snapshot 的公开运行时操作。 |

## `MemoryOperationalMetricLabels` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `errorCode` | 属性 | <code>errorCode: string</code> | error Code 字段。 |
| `operation` | 属性 | <code>operation: string</code> | operation 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `workerType` | 属性 | <code>workerType: string</code> | worker Type 字段。 |

## `MemoryOperationalMetricSample` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kind` | 属性 | <code>kind: MemoryOperationalMetricKind</code> | kind 字段。 |
| `labels` | 属性 | <code>labels: MemoryOperationalMetricLabels</code> | labels 字段。 |
| `value` | 属性 | <code>value: number</code> | value 字段。 |

## `MemoryOperationalMetricsSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `counters` | 属性 | <code>counters: Partial&lt;Record&lt;"retry" &#124; "reconcile" &#124; "dlq" &#124; "lease_contention" &#124; "cache_bypass" &#124; "scope_rejection", number&gt;&gt;</code> | counters 字段。 |
| `latencyMs` | 属性 | <code>latencyMs: { count: number; p50: number &#124; null; p95: number &#124; null; max: number &#124; null; }</code> | latency Ms 字段。 |
| `samples` | 属性 | <code>samples: MemoryOperationalMetricSample[]</code> | samples 字段。 |

## `MemoryOperationalRedactionPolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentMode` | 属性 | <code>contentMode: "hash" &#124; "redact"</code> | content Mode 字段。 |
| `hostPathMode` | 属性 | <code>hostPathMode: "redact" &#124; "basename"</code> | host Path Mode 字段。 |
| `maxDepth` | 属性 | <code>maxDepth: number</code> | max Depth 字段。 |
