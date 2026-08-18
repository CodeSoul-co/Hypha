# `@codesoul-co/hypha-memory` / `provider-operational-health`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/provider-operational-health.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryOperationalHealthService` | class | <code>new MemoryOperationalHealthService(probes: ProviderOperationalProbe[], now?: () =&gt; string): MemoryOperationalHealthService</code> | Runtime implementation for Memory Operational Health Service; see its public constructor and members below. |
| `MemoryOperationalHealth` | interface | <code>interface MemoryOperationalHealth</code> | Field contract for Memory Operational Health; see all contract members below. |
| `ProviderOperationalProbe` | interface | <code>interface ProviderOperationalProbe</code> | Field contract for Provider Operational Probe; see all contract members below. |
| `ProviderOperationalSnapshot` | interface | <code>interface ProviderOperationalSnapshot</code> | Field contract for Provider Operational Snapshot; see all contract members below. |
| `ProviderRuntimeMetrics` | interface | <code>interface ProviderRuntimeMetrics</code> | Field contract for Provider Runtime Metrics; see all contract members below. |
| `LivenessStatus` | type | <code>type LivenessStatus = 'alive' &#124; 'stalled'</code> | Public type alias for Liveness Status. |
| `OperationalStatus` | type | <code>type OperationalStatus = 'ready' &#124; 'degraded' &#124; 'not_ready'</code> | Public type alias for Operational Status. |

## `MemoryOperationalHealthService` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(probes: ProviderOperationalProbe[], now?: () =&gt; string): MemoryOperationalHealthService</code> | Creates an instance of this class. |
| `snapshot` | method | <code>snapshot(signal?: AbortSignal): Promise&lt;MemoryOperationalHealth&gt;</code> | Public runtime operation for snapshot. |

## `MemoryOperationalHealth` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public checked At property. |
| `liveness` | property | <code>liveness: { status: LivenessStatus; reasons: string[]; }</code> | Public liveness property. |
| `providers` | property | <code>providers: ProviderOperationalSnapshot[]</code> | Public providers property. |
| `readiness` | property | <code>readiness: { status: OperationalStatus; reasons: string[]; }</code> | Public readiness property. |

## `ProviderOperationalProbe` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `metrics` | method | <code>metrics(): Promise&lt;ProviderRuntimeMetrics&gt;</code> | Public runtime operation for metrics. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `required` | property | <code>required: boolean</code> | Public required property. |

## `ProviderOperationalSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `health` | property | <code>health: ProviderHealth</code> | Public health property. |
| `metrics` | property | <code>metrics: ProviderRuntimeMetrics</code> | Public metrics property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `required` | property | <code>required: boolean</code> | Public required property. |

## `ProviderRuntimeMetrics` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `circuitState` | property | <code>circuitState: "closed" &#124; "open" &#124; "half_open"</code> | Public circuit State property. |
| `deadLetterCount` | property | <code>deadLetterCount: number</code> | Public dead Letter Count property. |
| `poolActive` | property | <code>poolActive: number</code> | Public pool Active property. |
| `poolIdle` | property | <code>poolIdle: number</code> | Public pool Idle property. |
| `poolLimit` | property | <code>poolLimit: number</code> | Public pool Limit property. |
| `quarantinedOperations` | property | <code>quarantinedOperations: number</code> | Public quarantined Operations property. |
| `queueDepth` | property | <code>queueDepth: number</code> | Public queue Depth property. |
| `queueOldestAgeMs` | property | <code>queueOldestAgeMs: number</code> | Public queue Oldest Age Ms property. |
| `rateLimitRemaining` | property | <code>rateLimitRemaining: number</code> | Public rate Limit Remaining property. |
| `retryAttempts` | property | <code>retryAttempts: number</code> | Public retry Attempts property. |
| `retryBudgetRemaining` | property | <code>retryBudgetRemaining: number</code> | Public retry Budget Remaining property. |
