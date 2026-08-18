# `@codesoul-co/hypha-memory` / `provider-observability`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/provider-observability.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-observability.ts)
- 导出数: **11**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryProviderTelemetry` | 类 | <code>new MemoryProviderTelemetry(options: MemoryProviderTelemetryOptions): MemoryProviderTelemetry</code> | Bounded, content-free Provider telemetry with quota admission and SLO evaluation. Samples retain only operation metadata; requests, responses, scopes and content are never stored. |
| `ObservedMemoryManagementProvider` | 类 | <code>new ObservedMemoryManagementProvider(options: ObservedMemoryManagementProviderOptions): ObservedMemoryManagementProvider</code> | Provider decorator that instruments every canonical operation without changing Provider APIs. |
| `MemoryProviderMetricSample` | 接口 | <code>interface MemoryProviderMetricSample</code> | Memory Provider Metric Sample 的字段契约；完整字段见下表。 |
| `MemoryProviderOperationalReport` | 接口 | <code>interface MemoryProviderOperationalReport</code> | Memory Provider Operational Report 的字段契约；完整字段见下表。 |
| `MemoryProviderOperationEstimate` | 接口 | <code>interface MemoryProviderOperationEstimate</code> | Memory Provider Operation Estimate 的字段契约；完整字段见下表。 |
| `MemoryProviderTelemetryOptions` | 接口 | <code>interface MemoryProviderTelemetryOptions</code> | Memory Provider Telemetry Options 的字段契约；完整字段见下表。 |
| `MemoryProviderTelemetryPolicy` | 接口 | <code>interface MemoryProviderTelemetryPolicy</code> | Memory Provider Telemetry Policy 的字段契约；完整字段见下表。 |
| `ObservedMemoryManagementProviderOptions` | 接口 | <code>interface ObservedMemoryManagementProviderOptions</code> | Observed Memory Management Provider Options 的字段契约；完整字段见下表。 |
| `MemoryProviderCostEstimator` | 类型 | <code>type MemoryProviderCostEstimator = (operation: MemoryProviderOperation, request: unknown) =&gt; MemoryProviderOperationEstimate</code> | Memory Provider Cost Estimator 的公共类型别名。 |
| `MemoryProviderOperation` | 类型 | <code>type MemoryProviderOperation = 'add' &#124; 'search' &#124; 'get' &#124; 'list' &#124; 'update' &#124; 'delete' &#124; 'history' &#124; 'health'</code> | Memory Provider Operation 的公共类型别名。 |
| `MemoryProviderOperationOutcome` | 类型 | <code>type MemoryProviderOperationOutcome = 'succeeded' &#124; 'failed' &#124; 'quota_rejected'</code> | Memory Provider Operation Outcome 的公共类型别名。 |

## `MemoryProviderTelemetry` 公开成员

Bounded, content-free Provider telemetry with quota admission and SLO evaluation. Samples retain only operation metadata; requests, responses, scopes and content are never stored.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `begin` | 方法 | <code>begin(providerId: string, operation: MemoryProviderOperation, estimate?: MemoryProviderOperationEstimate): Reservation</code> | begin 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: MemoryProviderTelemetryOptions): MemoryProviderTelemetry</code> | 创建该类的实例。 |
| `snapshot` | 方法 | <code>snapshot(providerId: string): MemoryProviderOperationalReport</code> | snapshot 的公开运行时操作。 |

## `ObservedMemoryManagementProvider` 公开成员

Provider decorator that instruments every canonical operation without changing Provider APIs.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;import("./contracts").MemoryManagementCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: ObservedMemoryManagementProviderOptions): ObservedMemoryManagementProvider</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `MemoryProviderMetricSample` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `costUnits` | 属性 | <code>costUnits: number</code> | cost Units 字段。 |
| `errorCode` | 属性 | <code>errorCode: string</code> | error Code 字段。 |
| `latencyMs` | 属性 | <code>latencyMs: number</code> | latency Ms 字段。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | occurred At 字段。 |
| `operation` | 属性 | <code>operation: MemoryProviderOperation</code> | operation 字段。 |
| `outcome` | 属性 | <code>outcome: MemoryProviderOperationOutcome</code> | outcome 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `storedBytesDelta` | 属性 | <code>storedBytesDelta: number</code> | stored Bytes Delta 字段。 |

## `MemoryProviderOperationalReport` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `availability` | 属性 | <code>availability: number</code> | availability 字段。 |
| `cost` | 属性 | <code>cost: { measuredUnits: number; unpricedOperations: number; complete: boolean; }</code> | cost 字段。 |
| `latencyMs` | 属性 | <code>latencyMs: { p50: number &#124; null; p95: number &#124; null; p99: number &#124; null; max: number &#124; null; }</code> | latency Ms 字段。 |
| `operations` | 属性 | <code>operations: { total: number; succeeded: number; failed: number; quotaRejected: number; inFlight: number; byOperation: Partial&lt;Record&lt;MemoryProviderOperation, number&gt;&gt;; }</code> | operations 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `quota` | 属性 | <code>quota: { maxOperations?: number; remainingOperations?: number; maxCostUnits?: number; remainingCostUnits?: number; maxStoredBytes?: number; remainingStoredBytes?: number; }</code> | quota 字段。 |
| `slo` | 属性 | <code>slo: { status: "met" &#124; "breached" &#124; "insufficient_data"; reasons: string[]; minimumOperations: number; availabilityTarget?: number; latencyP95Ms?: number; }</code> | slo 字段。 |
| `storage` | 属性 | <code>storage: { measuredBytes: number; }</code> | storage 字段。 |
| `window` | 属性 | <code>window: { startedAt: string; endedAt: string; durationMs: number; }</code> | window 字段。 |

## `MemoryProviderOperationEstimate` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `costUnits` | 属性 | <code>costUnits: number</code> | cost Units 字段。 |
| `storedBytesDelta` | 属性 | <code>storedBytesDelta: number</code> | stored Bytes Delta 字段。 |

## `MemoryProviderTelemetryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `defaultPolicy` | 属性 | <code>defaultPolicy: MemoryProviderTelemetryPolicy</code> | default Policy 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `providerPolicies` | 属性 | <code>providerPolicies: Record&lt;string, MemoryProviderTelemetryPolicy&gt;</code> | provider Policies 字段。 |

## `MemoryProviderTelemetryPolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxSamples` | 属性 | <code>maxSamples: number</code> | max Samples 字段。 |
| `quota` | 属性 | <code>quota: { maxOperations?: number; maxCostUnits?: number; maxStoredBytes?: number; }</code> | quota 字段。 |
| `slo` | 属性 | <code>slo: { minimumOperations?: number; availabilityTarget?: number; latencyP95Ms?: number; }</code> | slo 字段。 |
| `windowMs` | 属性 | <code>windowMs: number</code> | window Ms 字段。 |

## `ObservedMemoryManagementProviderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `estimate` | 方法 | <code>estimate(operation: MemoryProviderOperation, request: unknown): MemoryProviderOperationEstimate</code> | estimate 的公开运行时操作。 |
| `provider` | 属性 | <code>provider: MemoryManagementProvider</code> | provider 字段。 |
| `telemetry` | 属性 | <code>telemetry: MemoryProviderTelemetry</code> | telemetry 字段。 |
