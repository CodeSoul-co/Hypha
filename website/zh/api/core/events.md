# `@codesoul-co/hypha-core` / `events`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)
- 导出数: **11**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryEventStore` | 类 | <code>new InMemoryEventStore(): InMemoryEventStore</code> | In Memory Event Store 的运行时实现；公开构造函数与成员见下表。 |
| `createFrameworkEvent` | 函数 | <code>createFrameworkEvent&lt;TPayload = unknown&gt;(input: EventCreateInput&lt;TPayload&gt;): FrameworkEvent&lt;TPayload&gt;</code> | 创建 Framework Event。 |
| `EventCreateInput` | 接口 | <code>interface EventCreateInput</code> | Event Create Input 的字段契约；完整字段见下表。 |
| `EventFilter` | 接口 | <code>interface EventFilter</code> | Event Filter 的字段契约；完整字段见下表。 |
| `EventStore` | 接口 | <code>interface EventStore</code> | Event Store 的字段契约；完整字段见下表。 |
| `FrameworkEvent` | 接口 | <code>interface FrameworkEvent</code> | Framework Event 的字段契约；完整字段见下表。 |
| `PersistedFrameworkEvent` | 接口 | <code>interface PersistedFrameworkEvent extends FrameworkEvent&lt;TPayload&gt;</code> | Persisted Framework Event 的字段契约；完整字段见下表。 |
| `TraceRecorder` | 接口 | <code>interface TraceRecorder</code> | Trace Recorder 的字段契约；完整字段见下表。 |
| `FrameworkEventType` | 类型 | <code>type FrameworkEventType = 'session.created' &#124; 'session.updated' &#124; 'session.closed' &#124; 'run.created' &#124; 'run.started' &#124; 'run.resume.requested' &#124; 'run.resumed' &#124; 'run.cancel.requested' &#124; 'run.cancelling' &#124; 'run.waiting_human' &#124; 'run.waiting_signal' &#124; 'run.waiting_timer' &#124; 'run.paused' &#124; 'run.completed' &#124; 'run.failed' &#124; 'run.cancelled' &#124; 'runtime.wait.created' &#124; 'runtime.wait.resolved' &#124; 'runtime.signal.received' &#124; 'ru...</code> | Framework Event Type 的公共类型别名。 |
| `RuntimeActivityEventType` | 类型 | <code>type RuntimeActivityEventType = 'runtime.activity.requested' &#124; 'runtime.activity.completed' &#124; 'runtime.activity.failed' &#124; 'runtime.activity.waiting' &#124; 'runtime.activity.cancelled' &#124; 'runtime.activity.compensation.requested' &#124; 'runtime.activity.compensation.completed' &#124; 'runtime.activity.compensation.failed' &#124; 'activity.redispatch.requested' &#124; 'activity.redispatch.accepted' &#124; 'activity.redispatch.outcome_unknown'</code> | Runtime Activity Event Type 的公共类型别名。 |
| `RuntimeObservationEventType` | 类型 | <code>type RuntimeObservationEventType = `runtime.observation.${string}`</code> | Runtime Observation Event Type 的公共类型别名。 |

## `InMemoryEventStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | 追加 append。 |
| `constructor` | 构造函数 | <code>(): InMemoryEventStore</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | 列出 list。 |
| `record` | 方法 | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | 记录 record。 |

## `EventCreateInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `branchId` | 属性 | <code>branchId: string</code> | branch Id 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `fsmState` | 属性 | <code>fsmState: string</code> | fsm State 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `parentEventId` | 属性 | <code>parentEventId: string</code> | parent Event Id 字段。 |
| `payload` | 属性 | <code>payload: TPayload</code> | payload 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `timestamp` | 属性 | <code>timestamp: string</code> | timestamp 字段。 |
| `type` | 属性 | <code>type: FrameworkEventType</code> | type 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `EventFilter` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `type` | 属性 | <code>type: FrameworkEventType</code> | type 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `EventStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | 追加 append。 |
| `list` | 方法 | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | 列出 list。 |

## `FrameworkEvent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `branchId` | 属性 | <code>branchId: string</code> | branch Id 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `fsmState` | 属性 | <code>fsmState: string</code> | fsm State 字段。 |
| `globalSequence` | 属性 | <code>globalSequence: number</code> | global Sequence 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `parentEventId` | 属性 | <code>parentEventId: string</code> | parent Event Id 字段。 |
| `payload` | 属性 | <code>payload: TPayload</code> | payload 字段。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | payload Hash 字段。 |
| `recordedAt` | 属性 | <code>recordedAt: string</code> | recorded At 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sequence` | 属性 | <code>sequence: number</code> | sequence 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `timestamp` | 属性 | <code>timestamp: string</code> | timestamp 字段。 |
| `type` | 属性 | <code>type: FrameworkEventType</code> | type 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `PersistedFrameworkEvent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `branchId` | 属性 | <code>branchId: string</code> | branch Id 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `fsmState` | 属性 | <code>fsmState: string</code> | fsm State 字段。 |
| `globalSequence` | 属性 | <code>globalSequence: number</code> | global Sequence 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `parentEventId` | 属性 | <code>parentEventId: string</code> | parent Event Id 字段。 |
| `payload` | 属性 | <code>payload: TPayload</code> | payload 字段。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | payload Hash 字段。 |
| `recordedAt` | 属性 | <code>recordedAt: string</code> | recorded At 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sequence` | 属性 | <code>sequence: number</code> | sequence 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `timestamp` | 属性 | <code>timestamp: string</code> | timestamp 字段。 |
| `type` | 属性 | <code>type: FrameworkEventType</code> | type 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `TraceRecorder` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `record` | 方法 | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | 记录 record。 |
