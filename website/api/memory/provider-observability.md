# `@codesoul-co/hypha-memory` / `provider-observability`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/provider-observability.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)
- Exports: **11**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryProviderTelemetry` | class | <code>new MemoryProviderTelemetry(options: MemoryProviderTelemetryOptions): MemoryProviderTelemetry</code> | Bounded, content-free Provider telemetry with quota admission and SLO evaluation. Samples retain only operation metadata; requests, responses, scopes and content are never stored. |
| `ObservedMemoryManagementProvider` | class | <code>new ObservedMemoryManagementProvider(options: ObservedMemoryManagementProviderOptions): ObservedMemoryManagementProvider</code> | Provider decorator that instruments every canonical operation without changing Provider APIs. |
| `MemoryProviderMetricSample` | interface | <code>interface MemoryProviderMetricSample</code> | Field contract for Memory Provider Metric Sample; see all contract members below. |
| `MemoryProviderOperationalReport` | interface | <code>interface MemoryProviderOperationalReport</code> | Field contract for Memory Provider Operational Report; see all contract members below. |
| `MemoryProviderOperationEstimate` | interface | <code>interface MemoryProviderOperationEstimate</code> | Field contract for Memory Provider Operation Estimate; see all contract members below. |
| `MemoryProviderTelemetryOptions` | interface | <code>interface MemoryProviderTelemetryOptions</code> | Field contract for Memory Provider Telemetry Options; see all contract members below. |
| `MemoryProviderTelemetryPolicy` | interface | <code>interface MemoryProviderTelemetryPolicy</code> | Field contract for Memory Provider Telemetry Policy; see all contract members below. |
| `ObservedMemoryManagementProviderOptions` | interface | <code>interface ObservedMemoryManagementProviderOptions</code> | Field contract for Observed Memory Management Provider Options; see all contract members below. |
| `MemoryProviderCostEstimator` | type | <code>type MemoryProviderCostEstimator = (operation: MemoryProviderOperation, request: unknown) =&gt; MemoryProviderOperationEstimate</code> | Public type alias for Memory Provider Cost Estimator. |
| `MemoryProviderOperation` | type | <code>type MemoryProviderOperation = 'add' &#124; 'search' &#124; 'get' &#124; 'list' &#124; 'update' &#124; 'delete' &#124; 'history' &#124; 'health'</code> | Public type alias for Memory Provider Operation. |
| `MemoryProviderOperationOutcome` | type | <code>type MemoryProviderOperationOutcome = 'succeeded' &#124; 'failed' &#124; 'quota_rejected'</code> | Public type alias for Memory Provider Operation Outcome. |

## `MemoryProviderTelemetry` public members

Bounded, content-free Provider telemetry with quota admission and SLO evaluation. Samples retain only operation metadata; requests, responses, scopes and content are never stored.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `begin` | method | <code>begin(providerId: string, operation: MemoryProviderOperation, estimate?: MemoryProviderOperationEstimate): Reservation</code> | Public runtime operation for begin. |
| `constructor` | constructor | <code>(options: MemoryProviderTelemetryOptions): MemoryProviderTelemetry</code> | Creates an instance of this class. |
| `snapshot` | method | <code>snapshot(providerId: string): MemoryProviderOperationalReport</code> | Public runtime operation for snapshot. |

## `ObservedMemoryManagementProvider` public members

Provider decorator that instruments every canonical operation without changing Provider APIs.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `capabilities` | method | <code>capabilities(): Promise&lt;import("./contracts").MemoryManagementCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: ObservedMemoryManagementProviderOptions): ObservedMemoryManagementProvider</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `id` | property | <code>id: string</code> | Public id property. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `MemoryProviderMetricSample` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `costUnits` | property | <code>costUnits: number</code> | Public cost Units property. |
| `errorCode` | property | <code>errorCode: string</code> | Public error Code property. |
| `latencyMs` | property | <code>latencyMs: number</code> | Public latency Ms property. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public occurred At property. |
| `operation` | property | <code>operation: MemoryProviderOperation</code> | Public operation property. |
| `outcome` | property | <code>outcome: MemoryProviderOperationOutcome</code> | Public outcome property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `storedBytesDelta` | property | <code>storedBytesDelta: number</code> | Public stored Bytes Delta property. |

## `MemoryProviderOperationalReport` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `availability` | property | <code>availability: number</code> | Public availability property. |
| `cost` | property | <code>cost: { measuredUnits: number; unpricedOperations: number; complete: boolean; }</code> | Public cost property. |
| `latencyMs` | property | <code>latencyMs: { p50: number &#124; null; p95: number &#124; null; p99: number &#124; null; max: number &#124; null; }</code> | Public latency Ms property. |
| `operations` | property | <code>operations: { total: number; succeeded: number; failed: number; quotaRejected: number; inFlight: number; byOperation: Partial&lt;Record&lt;MemoryProviderOperation, number&gt;&gt;; }</code> | Public operations property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `quota` | property | <code>quota: { maxOperations?: number; remainingOperations?: number; maxCostUnits?: number; remainingCostUnits?: number; maxStoredBytes?: number; remainingStoredBytes?: number; }</code> | Public quota property. |
| `slo` | property | <code>slo: { status: "met" &#124; "breached" &#124; "insufficient_data"; reasons: string[]; minimumOperations: number; availabilityTarget?: number; latencyP95Ms?: number; }</code> | Public slo property. |
| `storage` | property | <code>storage: { measuredBytes: number; }</code> | Public storage property. |
| `window` | property | <code>window: { startedAt: string; endedAt: string; durationMs: number; }</code> | Public window property. |

## `MemoryProviderOperationEstimate` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `costUnits` | property | <code>costUnits: number</code> | Public cost Units property. |
| `storedBytesDelta` | property | <code>storedBytesDelta: number</code> | Public stored Bytes Delta property. |

## `MemoryProviderTelemetryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `defaultPolicy` | property | <code>defaultPolicy: MemoryProviderTelemetryPolicy</code> | Public default Policy property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `providerPolicies` | property | <code>providerPolicies: Record&lt;string, MemoryProviderTelemetryPolicy&gt;</code> | Public provider Policies property. |

## `MemoryProviderTelemetryPolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxSamples` | property | <code>maxSamples: number</code> | Public max Samples property. |
| `quota` | property | <code>quota: { maxOperations?: number; maxCostUnits?: number; maxStoredBytes?: number; }</code> | Public quota property. |
| `slo` | property | <code>slo: { minimumOperations?: number; availabilityTarget?: number; latencyP95Ms?: number; }</code> | Public slo property. |
| `windowMs` | property | <code>windowMs: number</code> | Public window Ms property. |

## `ObservedMemoryManagementProviderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `estimate` | method | <code>estimate(operation: MemoryProviderOperation, request: unknown): MemoryProviderOperationEstimate</code> | Public runtime operation for estimate. |
| `provider` | property | <code>provider: MemoryManagementProvider</code> | Public provider property. |
| `telemetry` | property | <code>telemetry: MemoryProviderTelemetry</code> | Public telemetry property. |
