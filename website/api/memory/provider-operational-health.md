# `@codesoul-co/hypha-memory` / `provider-operational-health`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/provider-operational-health.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)
- Exports: **7**

## Using this module

Use the Provider operational health module for binding external or local providers to Hypha ports. It exports 1 class, 4 interfaces, 2 types.

### Import from the package entrypoint

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

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryOperationalHealthService` | class | <code>new MemoryOperationalHealthService(probes: ProviderOperationalProbe[], now?: () =&gt; string): MemoryOperationalHealthService</code> | Memory Operational Health Service class with 2 public constructor or member entries; its exact declarations are listed below. |
| `MemoryOperationalHealth` | interface | <code>interface MemoryOperationalHealth</code> | Memory Operational Health interface with 4 public fields or methods. |
| `ProviderOperationalProbe` | interface | <code>interface ProviderOperationalProbe</code> | Provider Operational Probe interface with 4 public fields or methods. |
| `ProviderOperationalSnapshot` | interface | <code>interface ProviderOperationalSnapshot</code> | Provider Operational Snapshot interface with 4 public fields or methods. |
| `ProviderRuntimeMetrics` | interface | <code>interface ProviderRuntimeMetrics</code> | Provider Runtime Metrics interface with 11 public fields or methods. |
| `LivenessStatus` | type | <code>type LivenessStatus = 'alive' &#124; 'stalled'</code> | Public type alias for Liveness Status; the declaration contains its complete type expression. |
| `OperationalStatus` | type | <code>type OperationalStatus = 'ready' &#124; 'degraded' &#124; 'not_ready'</code> | Public type alias for Operational Status; the declaration contains its complete type expression. |

## `MemoryOperationalHealthService`

Memory Operational Health Service class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryOperationalHealthService } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-operational-health`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)

### Declaration

```text
export declare class MemoryOperationalHealthService {
    constructor(probes: ProviderOperationalProbe[], now?: () => string);
    snapshot(signal?: AbortSignal): Promise<MemoryOperationalHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(probes: ProviderOperationalProbe[], now?: () =&gt; string): MemoryOperationalHealthService</code> | Creates an instance of this class. |
| `snapshot` | method | <code>snapshot(signal?: AbortSignal): Promise&lt;MemoryOperationalHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryOperationalHealth`

Memory Operational Health interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryOperationalHealth } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-operational-health`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `liveness` | property | <code>liveness: { status: LivenessStatus; reasons: string[]; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providers` | property | <code>providers: ProviderOperationalSnapshot[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `readiness` | property | <code>readiness: { status: OperationalStatus; reasons: string[]; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ProviderOperationalProbe`

Provider Operational Probe interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ProviderOperationalProbe } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-operational-health`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)

### Declaration

```text
export interface ProviderOperationalProbe {
    readonly providerId: string;
    readonly required: boolean;
    health(signal?: AbortSignal): Promise<ProviderHealth>;
    metrics(): Promise<ProviderRuntimeMetrics>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `metrics` | method | <code>metrics(): Promise&lt;ProviderRuntimeMetrics&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `providerId` | property | <code>readonly providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `required` | property | <code>readonly required: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ProviderOperationalSnapshot`

Provider Operational Snapshot interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ProviderOperationalSnapshot } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-operational-health`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)

### Declaration

```text
export interface ProviderOperationalSnapshot {
    providerId: string;
    health: ProviderHealth;
    metrics: ProviderRuntimeMetrics;
    required: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `health` | property | <code>health: ProviderHealth</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metrics` | property | <code>metrics: ProviderRuntimeMetrics</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `required` | property | <code>required: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ProviderRuntimeMetrics`

Provider Runtime Metrics interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { ProviderRuntimeMetrics } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-operational-health`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `circuitState` | property | <code>circuitState?: "closed" &#124; "open" &#124; "half_open"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadLetterCount` | property | <code>deadLetterCount?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `poolActive` | property | <code>poolActive?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `poolIdle` | property | <code>poolIdle?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `poolLimit` | property | <code>poolLimit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quarantinedOperations` | property | <code>quarantinedOperations?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `queueDepth` | property | <code>queueDepth?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `queueOldestAgeMs` | property | <code>queueOldestAgeMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rateLimitRemaining` | property | <code>rateLimitRemaining?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryAttempts` | property | <code>retryAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryBudgetRemaining` | property | <code>retryBudgetRemaining?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LivenessStatus`

Public type alias for Liveness Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LivenessStatus } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-operational-health`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)

### Declaration

```text
export type LivenessStatus = 'alive' | 'stalled';
```

## `OperationalStatus`

Public type alias for Operational Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { OperationalStatus } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-operational-health`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)

### Declaration

```text
export type OperationalStatus = 'ready' | 'degraded' | 'not_ready';
```
