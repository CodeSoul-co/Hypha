# `@codesoul-co/hypha-memory` / `memory-operational-metrics`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-operational-metrics.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryOperationalMetrics` | class | <code>new MemoryOperationalMetrics(maxSamples?: number): MemoryOperationalMetrics</code> | Bounded operational metrics that deliberately exclude scope, Memory content, Provider payloads, credentials and host paths from metric labels. |
| `sanitizeMemoryOperationalValue` | function | <code>sanitizeMemoryOperationalValue(value: unknown, policy?: MemoryOperationalRedactionPolicy): unknown</code> | Produces log/evidence-safe data without mutating the supplied value. |
| `MemoryOperationalMetricLabels` | interface | <code>interface MemoryOperationalMetricLabels</code> | Field contract for Memory Operational Metric Labels; see all contract members below. |
| `MemoryOperationalMetricSample` | interface | <code>interface MemoryOperationalMetricSample</code> | Field contract for Memory Operational Metric Sample; see all contract members below. |
| `MemoryOperationalMetricsSnapshot` | interface | <code>interface MemoryOperationalMetricsSnapshot</code> | Field contract for Memory Operational Metrics Snapshot; see all contract members below. |
| `MemoryOperationalRedactionPolicy` | interface | <code>interface MemoryOperationalRedactionPolicy</code> | Field contract for Memory Operational Redaction Policy; see all contract members below. |
| `MemoryOperationalMetricKind` | type | <code>type MemoryOperationalMetricKind = 'latency_ms' &#124; 'retry' &#124; 'reconcile' &#124; 'lease_contention' &#124; 'dlq' &#124; 'cache_bypass' &#124; 'scope_rejection'</code> | Public type alias for Memory Operational Metric Kind. |

## `MemoryOperationalMetrics` public members

Bounded operational metrics that deliberately exclude scope, Memory content, Provider payloads, credentials and host paths from metric labels.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(maxSamples?: number): MemoryOperationalMetrics</code> | Creates an instance of this class. |
| `observeCacheEvent` | method | <code>observeCacheEvent(event: MemorySearchCacheEvent): void</code> | Public runtime operation for observe Cache Event. |
| `observeIndexEvent` | method | <code>observeIndexEvent(event: IndexOutboxWorkerEvent): void</code> | Public runtime operation for observe Index Event. |
| `observeLifecycleEvent` | method | <code>observeLifecycleEvent(event: MemoryLifecycleWorkerEvent): void</code> | Public runtime operation for observe Lifecycle Event. |
| `record` | method | <code>record(kind: MemoryOperationalMetricKind, value?: number, labels?: MemoryOperationalMetricLabels): void</code> | Records record at this module boundary. |
| `snapshot` | method | <code>snapshot(): MemoryOperationalMetricsSnapshot</code> | Public runtime operation for snapshot. |

## `MemoryOperationalMetricLabels` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `errorCode` | property | <code>errorCode: string</code> | Public error Code property. |
| `operation` | property | <code>operation: string</code> | Public operation property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `workerType` | property | <code>workerType: string</code> | Public worker Type property. |

## `MemoryOperationalMetricSample` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kind` | property | <code>kind: MemoryOperationalMetricKind</code> | Public kind property. |
| `labels` | property | <code>labels: MemoryOperationalMetricLabels</code> | Public labels property. |
| `value` | property | <code>value: number</code> | Public value property. |

## `MemoryOperationalMetricsSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `counters` | property | <code>counters: Partial&lt;Record&lt;"retry" &#124; "reconcile" &#124; "dlq" &#124; "lease_contention" &#124; "cache_bypass" &#124; "scope_rejection", number&gt;&gt;</code> | Public counters property. |
| `latencyMs` | property | <code>latencyMs: { count: number; p50: number &#124; null; p95: number &#124; null; max: number &#124; null; }</code> | Public latency Ms property. |
| `samples` | property | <code>samples: MemoryOperationalMetricSample[]</code> | Public samples property. |

## `MemoryOperationalRedactionPolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentMode` | property | <code>contentMode: "hash" &#124; "redact"</code> | Public content Mode property. |
| `hostPathMode` | property | <code>hostPathMode: "redact" &#124; "basename"</code> | Public host Path Mode property. |
| `maxDepth` | property | <code>maxDepth: number</code> | Public max Depth property. |
