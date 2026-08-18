# `@codesoul-co/hypha-memory` / `memory-operational-metrics`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-operational-metrics.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)
- Exports: **7**

## Using this module

Use the Memory operational metrics module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 function, 4 interfaces, 1 type.

### Import from the package entrypoint

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

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryOperationalMetrics` | class | <code>new MemoryOperationalMetrics(maxSamples?: number): MemoryOperationalMetrics</code> | Bounded operational metrics that deliberately exclude scope, Memory content, Provider payloads, credentials and host paths from metric labels. |
| `sanitizeMemoryOperationalValue` | function | <code>sanitizeMemoryOperationalValue(value: unknown, policy?: MemoryOperationalRedactionPolicy): unknown</code> | Produces log/evidence-safe data without mutating the supplied value. |
| `MemoryOperationalMetricLabels` | interface | <code>interface MemoryOperationalMetricLabels</code> | Memory Operational Metric Labels interface with 5 public fields or methods. |
| `MemoryOperationalMetricSample` | interface | <code>interface MemoryOperationalMetricSample</code> | Memory Operational Metric Sample interface with 3 public fields or methods. |
| `MemoryOperationalMetricsSnapshot` | interface | <code>interface MemoryOperationalMetricsSnapshot</code> | Memory Operational Metrics Snapshot interface with 3 public fields or methods. |
| `MemoryOperationalRedactionPolicy` | interface | <code>interface MemoryOperationalRedactionPolicy</code> | Memory Operational Redaction Policy interface with 3 public fields or methods. |
| `MemoryOperationalMetricKind` | type | <code>type MemoryOperationalMetricKind = 'latency_ms' &#124; 'retry' &#124; 'reconcile' &#124; 'lease_contention' &#124; 'dlq' &#124; 'cache_bypass' &#124; 'scope_rejection'</code> | Public type alias for Memory Operational Metric Kind; the declaration contains its complete type expression. |

## `MemoryOperationalMetrics`

Bounded operational metrics that deliberately exclude scope, Memory content, Provider payloads, credentials and host paths from metric labels.

- Kind: class
- Import: `import { MemoryOperationalMetrics } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-operational-metrics`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(maxSamples?: number): MemoryOperationalMetrics</code> | Creates an instance of this class. |
| `observeCacheEvent` | method | <code>observeCacheEvent(event: MemorySearchCacheEvent): void</code> | Public method; parameters and return type are shown in the signature. |
| `observeIndexEvent` | method | <code>observeIndexEvent(event: IndexOutboxWorkerEvent): void</code> | Public method; parameters and return type are shown in the signature. |
| `observeLifecycleEvent` | method | <code>observeLifecycleEvent(event: MemoryLifecycleWorkerEvent): void</code> | Public method; parameters and return type are shown in the signature. |
| `record` | method | <code>record(kind: MemoryOperationalMetricKind, value?: number, labels?: MemoryOperationalMetricLabels): void</code> | Public method; parameters and return type are shown in the signature. |
| `snapshot` | method | <code>snapshot(): MemoryOperationalMetricsSnapshot</code> | Public method; parameters and return type are shown in the signature. |

## `sanitizeMemoryOperationalValue`

Produces log/evidence-safe data without mutating the supplied value.

- Kind: function
- Import: `import { sanitizeMemoryOperationalValue } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-operational-metrics`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)

### Declaration

```text
export declare function sanitizeMemoryOperationalValue(value: unknown, policy?: MemoryOperationalRedactionPolicy): unknown;
```

### Call signature

```text
sanitizeMemoryOperationalValue(value: unknown, policy?: MemoryOperationalRedactionPolicy): unknown
```

Produces log/evidence-safe data without mutating the supplied value.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `policy` | <code>MemoryOperationalRedactionPolicy</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `unknown`
- Description: The return contract is defined by the type shown above.

## `MemoryOperationalMetricLabels`

Memory Operational Metric Labels interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryOperationalMetricLabels } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-operational-metrics`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)

### Declaration

```text
export interface MemoryOperationalMetricLabels {
    providerId?: string;
    operation?: string;
    workerType?: string;
    reason?: string;
    errorCode?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `errorCode` | property | <code>errorCode?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workerType` | property | <code>workerType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryOperationalMetricSample`

Memory Operational Metric Sample interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryOperationalMetricSample } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-operational-metrics`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)

### Declaration

```text
export interface MemoryOperationalMetricSample {
    kind: MemoryOperationalMetricKind;
    value: number;
    labels: MemoryOperationalMetricLabels;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kind` | property | <code>kind: MemoryOperationalMetricKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `labels` | property | <code>labels: MemoryOperationalMetricLabels</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `value` | property | <code>value: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryOperationalMetricsSnapshot`

Memory Operational Metrics Snapshot interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryOperationalMetricsSnapshot } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-operational-metrics`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `counters` | property | <code>counters: Partial&lt;Record&lt;"retry" &#124; "reconcile" &#124; "dlq" &#124; "lease_contention" &#124; "cache_bypass" &#124; "scope_rejection", number&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `latencyMs` | property | <code>latencyMs: { count: number; p50: number &#124; null; p95: number &#124; null; max: number &#124; null; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `samples` | property | <code>samples: MemoryOperationalMetricSample[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryOperationalRedactionPolicy`

Memory Operational Redaction Policy interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryOperationalRedactionPolicy } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-operational-metrics`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)

### Declaration

```text
export interface MemoryOperationalRedactionPolicy {
    contentMode?: 'redact' | 'hash';
    hostPathMode?: 'redact' | 'basename';
    maxDepth?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentMode` | property | <code>contentMode?: "hash" &#124; "redact"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hostPathMode` | property | <code>hostPathMode?: "redact" &#124; "basename"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxDepth` | property | <code>maxDepth?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryOperationalMetricKind`

Public type alias for Memory Operational Metric Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryOperationalMetricKind } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-operational-metrics`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-operational-metrics.ts)

### Declaration

```text
export type MemoryOperationalMetricKind = 'latency_ms' | 'retry' | 'reconcile' | 'lease_contention' | 'dlq' | 'cache_bypass' | 'scope_rejection';
```
