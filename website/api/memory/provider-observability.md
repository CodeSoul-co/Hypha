# `@codesoul-co/hypha-memory` / `provider-observability`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/provider-observability.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)
- Exports: **11**

## Using this module

Use the Provider observability module for binding external or local providers to Hypha ports. It exports 2 classes, 6 interfaces, 3 types.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 9 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryProviderTelemetry` | class | <code>new MemoryProviderTelemetry(options: MemoryProviderTelemetryOptions): MemoryProviderTelemetry</code> | Bounded, content-free Provider telemetry with quota admission and SLO evaluation. Samples retain only operation metadata; requests, responses, scopes and content are never stored. |
| `ObservedMemoryManagementProvider` | class | <code>new ObservedMemoryManagementProvider(options: ObservedMemoryManagementProviderOptions): ObservedMemoryManagementProvider</code> | Provider decorator that instruments every canonical operation without changing Provider APIs. |
| `MemoryProviderMetricSample` | interface | <code>interface MemoryProviderMetricSample</code> | Memory Provider Metric Sample interface with 8 public fields or methods. |
| `MemoryProviderOperationalReport` | interface | <code>interface MemoryProviderOperationalReport</code> | Memory Provider Operational Report interface with 9 public fields or methods. |
| `MemoryProviderOperationEstimate` | interface | <code>interface MemoryProviderOperationEstimate</code> | Memory Provider Operation Estimate interface with 2 public fields or methods. |
| `MemoryProviderTelemetryOptions` | interface | <code>interface MemoryProviderTelemetryOptions</code> | Memory Provider Telemetry Options interface with 3 public fields or methods. |
| `MemoryProviderTelemetryPolicy` | interface | <code>interface MemoryProviderTelemetryPolicy</code> | Memory Provider Telemetry Policy interface with 4 public fields or methods. |
| `ObservedMemoryManagementProviderOptions` | interface | <code>interface ObservedMemoryManagementProviderOptions</code> | Observed Memory Management Provider Options interface with 3 public fields or methods. |
| `MemoryProviderCostEstimator` | type | <code>type MemoryProviderCostEstimator = (operation: MemoryProviderOperation, request: unknown) =&gt; MemoryProviderOperationEstimate</code> | Public type alias for Memory Provider Cost Estimator; the declaration contains its complete type expression. |
| `MemoryProviderOperation` | type | <code>type MemoryProviderOperation = 'add' &#124; 'search' &#124; 'get' &#124; 'list' &#124; 'update' &#124; 'delete' &#124; 'history' &#124; 'health'</code> | Public type alias for Memory Provider Operation; the declaration contains its complete type expression. |
| `MemoryProviderOperationOutcome` | type | <code>type MemoryProviderOperationOutcome = 'succeeded' &#124; 'failed' &#124; 'quota_rejected'</code> | Public type alias for Memory Provider Operation Outcome; the declaration contains its complete type expression. |

## `MemoryProviderTelemetry`

Bounded, content-free Provider telemetry with quota admission and SLO evaluation. Samples retain only operation metadata; requests, responses, scopes and content are never stored.

- Kind: class
- Import: `import { MemoryProviderTelemetry } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### Declaration

```text
export declare class MemoryProviderTelemetry {
    constructor(options: MemoryProviderTelemetryOptions);
    begin(providerId: string, operation: MemoryProviderOperation, estimate?: MemoryProviderOperationEstimate): Reservation;
    snapshot(providerId: string): MemoryProviderOperationalReport;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `begin` | method | <code>begin(providerId: string, operation: MemoryProviderOperation, estimate?: MemoryProviderOperationEstimate): Reservation</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: MemoryProviderTelemetryOptions): MemoryProviderTelemetry</code> | Creates an instance of this class. |
| `snapshot` | method | <code>snapshot(providerId: string): MemoryProviderOperationalReport</code> | Public method; parameters and return type are shown in the signature. |

## `ObservedMemoryManagementProvider`

Provider decorator that instruments every canonical operation without changing Provider APIs.

- Kind: class
- Import: `import { ObservedMemoryManagementProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;import("./contracts").MemoryManagementCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: ObservedMemoryManagementProviderOptions): ObservedMemoryManagementProvider</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryProviderMetricSample`

Memory Provider Metric Sample interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProviderMetricSample } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `costUnits` | property | <code>costUnits?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `errorCode` | property | <code>errorCode?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `latencyMs` | property | <code>latencyMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: MemoryProviderOperation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outcome` | property | <code>outcome: MemoryProviderOperationOutcome</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `storedBytesDelta` | property | <code>storedBytesDelta?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProviderOperationalReport`

Memory Provider Operational Report interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProviderOperationalReport } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `availability` | property | <code>availability: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cost` | property | <code>cost: { measuredUnits: number; unpricedOperations: number; complete: boolean; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `latencyMs` | property | <code>latencyMs: { p50: number &#124; null; p95: number &#124; null; p99: number &#124; null; max: number &#124; null; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operations` | property | <code>operations: { total: number; succeeded: number; failed: number; quotaRejected: number; inFlight: number; byOperation: Partial&lt;Record&lt;MemoryProviderOperation, number&gt;&gt;; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quota` | property | <code>quota: { maxOperations?: number; remainingOperations?: number; maxCostUnits?: number; remainingCostUnits?: number; maxStoredBytes?: number; remainingStoredBytes?: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `slo` | property | <code>slo: { status: "met" &#124; "breached" &#124; "insufficient_data"; reasons: string[]; minimumOperations: number; availabilityTarget?: number; latencyP95Ms?: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `storage` | property | <code>storage: { measuredBytes: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `window` | property | <code>window: { startedAt: string; endedAt: string; durationMs: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProviderOperationEstimate`

Memory Provider Operation Estimate interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProviderOperationEstimate } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### Declaration

```text
export interface MemoryProviderOperationEstimate {
    costUnits?: number;
    storedBytesDelta?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `costUnits` | property | <code>costUnits?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `storedBytesDelta` | property | <code>storedBytesDelta?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProviderTelemetryOptions`

Memory Provider Telemetry Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProviderTelemetryOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### Declaration

```text
export interface MemoryProviderTelemetryOptions {
    defaultPolicy: MemoryProviderTelemetryPolicy;
    providerPolicies?: Record<string, MemoryProviderTelemetryPolicy>;
    now?: () => Date;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `defaultPolicy` | property | <code>defaultPolicy: MemoryProviderTelemetryPolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `providerPolicies` | property | <code>providerPolicies?: Record&lt;string, MemoryProviderTelemetryPolicy&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProviderTelemetryPolicy`

Memory Provider Telemetry Policy interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProviderTelemetryPolicy } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxSamples` | property | <code>maxSamples?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quota` | property | <code>quota?: { maxOperations?: number; maxCostUnits?: number; maxStoredBytes?: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `slo` | property | <code>slo?: { minimumOperations?: number; availabilityTarget?: number; latencyP95Ms?: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `windowMs` | property | <code>windowMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ObservedMemoryManagementProviderOptions`

Observed Memory Management Provider Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ObservedMemoryManagementProviderOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### Declaration

```text
export interface ObservedMemoryManagementProviderOptions {
    provider: MemoryManagementProvider;
    telemetry: MemoryProviderTelemetry;
    estimate?: MemoryProviderCostEstimator;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `estimate` | method | <code>estimate?(operation: MemoryProviderOperation, request: unknown): MemoryProviderOperationEstimate</code> | Public method; parameters and return type are shown in the signature. |
| `provider` | property | <code>provider: MemoryManagementProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `telemetry` | property | <code>telemetry: MemoryProviderTelemetry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProviderCostEstimator`

Public type alias for Memory Provider Cost Estimator; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryProviderCostEstimator } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### Declaration

```text
export type MemoryProviderCostEstimator = (operation: MemoryProviderOperation, request: unknown) => MemoryProviderOperationEstimate;
```

## `MemoryProviderOperation`

Public type alias for Memory Provider Operation; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryProviderOperation } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### Declaration

```text
export type MemoryProviderOperation = 'add' | 'search' | 'get' | 'list' | 'update' | 'delete' | 'history' | 'health';
```

## `MemoryProviderOperationOutcome`

Public type alias for Memory Provider Operation Outcome; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryProviderOperationOutcome } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-observability`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)

### Declaration

```text
export type MemoryProviderOperationOutcome = 'succeeded' | 'failed' | 'quota_rejected';
```
