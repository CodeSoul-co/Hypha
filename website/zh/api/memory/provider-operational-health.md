# `@codesoul-co/hypha-memory` / `provider-operational-health`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/provider-operational-health.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-operational-health.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryOperationalHealthService` | 类 | <code>new MemoryOperationalHealthService(probes: ProviderOperationalProbe[], now?: () =&gt; string): MemoryOperationalHealthService</code> | Memory Operational Health Service 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryOperationalHealth` | 接口 | <code>interface MemoryOperationalHealth</code> | Memory Operational Health 的字段契约；完整字段见下表。 |
| `ProviderOperationalProbe` | 接口 | <code>interface ProviderOperationalProbe</code> | Provider Operational Probe 的字段契约；完整字段见下表。 |
| `ProviderOperationalSnapshot` | 接口 | <code>interface ProviderOperationalSnapshot</code> | Provider Operational Snapshot 的字段契约；完整字段见下表。 |
| `ProviderRuntimeMetrics` | 接口 | <code>interface ProviderRuntimeMetrics</code> | Provider Runtime Metrics 的字段契约；完整字段见下表。 |
| `LivenessStatus` | 类型 | <code>type LivenessStatus = 'alive' &#124; 'stalled'</code> | Liveness Status 的公共类型别名。 |
| `OperationalStatus` | 类型 | <code>type OperationalStatus = 'ready' &#124; 'degraded' &#124; 'not_ready'</code> | Operational Status 的公共类型别名。 |

## `MemoryOperationalHealthService` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(probes: ProviderOperationalProbe[], now?: () =&gt; string): MemoryOperationalHealthService</code> | 创建该类的实例。 |
| `snapshot` | 方法 | <code>snapshot(signal?: AbortSignal): Promise&lt;MemoryOperationalHealth&gt;</code> | snapshot 的公开运行时操作。 |

## `MemoryOperationalHealth` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | checked At 字段。 |
| `liveness` | 属性 | <code>liveness: { status: LivenessStatus; reasons: string[]; }</code> | liveness 字段。 |
| `providers` | 属性 | <code>providers: ProviderOperationalSnapshot[]</code> | providers 字段。 |
| `readiness` | 属性 | <code>readiness: { status: OperationalStatus; reasons: string[]; }</code> | readiness 字段。 |

## `ProviderOperationalProbe` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `metrics` | 方法 | <code>metrics(): Promise&lt;ProviderRuntimeMetrics&gt;</code> | metrics 的公开运行时操作。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `required` | 属性 | <code>required: boolean</code> | required 字段。 |

## `ProviderOperationalSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `health` | 属性 | <code>health: ProviderHealth</code> | health 字段。 |
| `metrics` | 属性 | <code>metrics: ProviderRuntimeMetrics</code> | metrics 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `required` | 属性 | <code>required: boolean</code> | required 字段。 |

## `ProviderRuntimeMetrics` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `circuitState` | 属性 | <code>circuitState: "closed" &#124; "open" &#124; "half_open"</code> | circuit State 字段。 |
| `deadLetterCount` | 属性 | <code>deadLetterCount: number</code> | dead Letter Count 字段。 |
| `poolActive` | 属性 | <code>poolActive: number</code> | pool Active 字段。 |
| `poolIdle` | 属性 | <code>poolIdle: number</code> | pool Idle 字段。 |
| `poolLimit` | 属性 | <code>poolLimit: number</code> | pool Limit 字段。 |
| `quarantinedOperations` | 属性 | <code>quarantinedOperations: number</code> | quarantined Operations 字段。 |
| `queueDepth` | 属性 | <code>queueDepth: number</code> | queue Depth 字段。 |
| `queueOldestAgeMs` | 属性 | <code>queueOldestAgeMs: number</code> | queue Oldest Age Ms 字段。 |
| `rateLimitRemaining` | 属性 | <code>rateLimitRemaining: number</code> | rate Limit Remaining 字段。 |
| `retryAttempts` | 属性 | <code>retryAttempts: number</code> | retry Attempts 字段。 |
| `retryBudgetRemaining` | 属性 | <code>retryBudgetRemaining: number</code> | retry Budget Remaining 字段。 |
