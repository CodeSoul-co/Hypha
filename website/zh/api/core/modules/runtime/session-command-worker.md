# `@codesoul-co/hypha-core` / `modules/runtime/session-command-worker`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/session-command-worker.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-worker.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DurableSessionCommandWorker` | 类 | <code>new DurableSessionCommandWorker(options: DurableSessionCommandWorkerOptions): DurableSessionCommandWorker</code> | Claims and resolves one durable Session command without owning a polling loop. Command handlers must explicitly classify expected retry and failure outcomes. |
| `DurableSessionCommandWorkerOptions` | 接口 | <code>interface DurableSessionCommandWorkerOptions</code> | Durable Session Command Worker Options 的字段契约；完整字段见下表。 |
| `SessionCommandHandlerContext` | 接口 | <code>interface SessionCommandHandlerContext</code> | Session Command Handler Context 的字段契约；完整字段见下表。 |
| `SessionCommandWorkerResult` | 接口 | <code>interface SessionCommandWorkerResult</code> | Session Command Worker Result 的字段契约；完整字段见下表。 |
| `SessionCommandHandler` | 类型 | <code>type SessionCommandHandler = (context: Readonly&lt;SessionCommandHandlerContext&gt;) =&gt; Promise&lt;SessionCommandHandlerResult&gt;</code> | Session Command Handler 的公共类型别名。 |
| `SessionCommandHandlerResult` | 类型 | <code>type SessionCommandHandlerResult = { disposition: 'applied'; resultRunId?: string; resultEventIds?: string[]; } &#124; { disposition: 'retry'; availableAt?: string; } &#124; { disposition: 'failed'; rejectionCode: string; deadLetter?: boolean; }</code> | Session Command Handler Result 的公共类型别名。 |
| `SessionCommandWorkerDisposition` | 类型 | <code>type SessionCommandWorkerDisposition = 'idle' &#124; 'applied' &#124; 'retry_scheduled' &#124; 'failed' &#124; 'dead_lettered' &#124; 'lease_lost' &#124; 'aborted'</code> | Session Command Worker Disposition 的公共类型别名。 |

## `DurableSessionCommandWorker` 公开成员

Claims and resolves one durable Session command without owning a polling loop. Command handlers must explicitly classify expected retry and failure outcomes.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DurableSessionCommandWorkerOptions): DurableSessionCommandWorker</code> | 创建该类的实例。 |
| `processNext` | 方法 | <code>processNext(scope?: SessionQueueScope, signal?: AbortSignal): Promise&lt;SessionCommandWorkerResult&gt;</code> | process Next 的公开运行时操作。 |

## `DurableSessionCommandWorkerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `handlers` | 属性 | <code>handlers: Partial&lt;Record&lt;"user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session", SessionCommandHandler&gt;&gt;</code> | handlers 字段。 |
| `leaseMs` | 属性 | <code>leaseMs: number</code> | lease Ms 字段。 |
| `maxHandlerDurationMs` | 属性 | <code>maxHandlerDurationMs: number</code> | max Handler Duration Ms 字段。 |
| `monotonicNow` | 方法 | <code>monotonicNow(): number</code> | monotonic Now 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `onLeaseRenewalFailure` | 方法 | <code>onLeaseRenewalFailure(error: unknown, claim: Readonly&lt;SessionCommandClaim&gt;): void</code> | 处理 Lease Renewal Failure。 |
| `operationalTelemetry` | 属性 | <code>operationalTelemetry: RuntimeOperationalTelemetry</code> | operational Telemetry 字段。 |
| `queue` | 属性 | <code>queue: SessionQueue</code> | queue 字段。 |
| `renewalIntervalMs` | 属性 | <code>renewalIntervalMs: number</code> | renewal Interval Ms 字段。 |
| `wait` | 方法 | <code>wait(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | wait 的公开运行时操作。 |
| `workerId` | 属性 | <code>workerId: string</code> | worker Id 字段。 |

## `SessionCommandHandlerContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimToken` | 属性 | <code>claimToken: string</code> | claim Token 字段。 |
| `command` | 属性 | <code>command: Readonly&lt;SessionCommandRecord&gt;</code> | command 字段。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | lease Epoch 字段。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | signal 字段。 |

## `SessionCommandWorkerResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | attempts 字段。 |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `commandType` | 属性 | <code>commandType: "user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session"</code> | command Type 字段。 |
| `disposition` | 属性 | <code>disposition: SessionCommandWorkerDisposition</code> | disposition 字段。 |
| `rejectionCode` | 属性 | <code>rejectionCode: string</code> | rejection Code 字段。 |
