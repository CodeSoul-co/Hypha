# `@codesoul-co/hypha-harness` / `message-bus`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 模块指南: [学习与组合说明](/zh/packages/harness)
- 源码: [`packages/harness/src/message-bus.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)
- 导出数: **12**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMessageBus` | 类 | <code>new InMemoryMessageBus(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | In Memory Message Bus 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryMessageBusOptions` | 接口 | <code>interface InMemoryMessageBusOptions</code> | In Memory Message Bus Options 的字段契约；完整字段见下表。 |
| `MessageAckInput` | 接口 | <code>interface MessageAckInput</code> | Message Ack Input 的字段契约；完整字段见下表。 |
| `MessageAddress` | 接口 | <code>interface MessageAddress</code> | Message Address 的字段契约；完整字段见下表。 |
| `MessageBus` | 接口 | <code>interface MessageBus</code> | Message Bus 的字段契约；完整字段见下表。 |
| `MessageFailInput` | 接口 | <code>interface MessageFailInput extends MessageAckInput</code> | Message Fail Input 的字段契约；完整字段见下表。 |
| `MessageListFilter` | 接口 | <code>interface MessageListFilter</code> | Message List Filter 的字段契约；完整字段见下表。 |
| `PublishMessageInput` | 接口 | <code>interface PublishMessageInput</code> | Publish Message Input 的字段契约；完整字段见下表。 |
| `PullMessageFilter` | 接口 | <code>interface PullMessageFilter</code> | Pull Message Filter 的字段契约；完整字段见下表。 |
| `RuntimeMessage` | 接口 | <code>interface RuntimeMessage</code> | Runtime Message 的字段契约；完整字段见下表。 |
| `MessageAddressKind` | 类型 | <code>type MessageAddressKind = 'runtime' &#124; 'session' &#124; 'workflow' &#124; 'agent' &#124; 'tool' &#124; 'human'</code> | Message Address Kind 的公共类型别名。 |
| `MessageStatus` | 类型 | <code>type MessageStatus = 'queued' &#124; 'delivered' &#124; 'acknowledged' &#124; 'failed' &#124; 'dead_lettered'</code> | Message Status 的公共类型别名。 |

## `InMemoryMessageBus` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acknowledge` | 方法 | <code>acknowledge(input: MessageAckInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | acknowledge 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | 创建该类的实例。 |
| `fail` | 方法 | <code>fail(input: MessageFailInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | fail 的公开运行时操作。 |
| `list` | 方法 | <code>list(filter?: MessageListFilter): Promise&lt;RuntimeMessage[]&gt;</code> | 列出 list。 |
| `publish` | 方法 | <code>publish&lt;TPayload = unknown&gt;(input: PublishMessageInput&lt;TPayload&gt;): Promise&lt;RuntimeMessage&lt;TPayload&gt;&gt;</code> | publish 的公开运行时操作。 |
| `pull` | 方法 | <code>pull&lt;TPayload = unknown&gt;(filter: PullMessageFilter): Promise&lt;RuntimeMessage&lt;TPayload&gt; &#124; null&gt;</code> | pull 的公开运行时操作。 |

## `InMemoryMessageBusOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `initialRetryDelayMs` | 属性 | <code>initialRetryDelayMs: number</code> | initial Retry Delay Ms 字段。 |
| `maxDeliveryAttempts` | 属性 | <code>maxDeliveryAttempts: number</code> | max Delivery Attempts 字段。 |
| `maxRetryDelayMs` | 属性 | <code>maxRetryDelayMs: number</code> | max Retry Delay Ms 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `retryMultiplier` | 属性 | <code>retryMultiplier: number</code> | retry Multiplier 字段。 |
| `trace` | 属性 | <code>trace: TraceRecorder</code> | trace 字段。 |

## `MessageAckInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `handledBy` | 属性 | <code>handledBy: MessageAddress</code> | handled By 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `timestamp` | 属性 | <code>timestamp: string</code> | timestamp 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `MessageAddress` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `kind` | 属性 | <code>kind: MessageAddressKind</code> | kind 字段。 |

## `MessageBus` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acknowledge` | 方法 | <code>acknowledge(input: MessageAckInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | acknowledge 的公开运行时操作。 |
| `fail` | 方法 | <code>fail(input: MessageFailInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | fail 的公开运行时操作。 |
| `list` | 方法 | <code>list(filter?: MessageListFilter): Promise&lt;RuntimeMessage[]&gt;</code> | 列出 list。 |
| `publish` | 方法 | <code>publish&lt;TPayload = unknown&gt;(input: PublishMessageInput&lt;TPayload&gt;): Promise&lt;RuntimeMessage&lt;TPayload&gt;&gt;</code> | publish 的公开运行时操作。 |
| `pull` | 方法 | <code>pull&lt;TPayload = unknown&gt;(filter: PullMessageFilter): Promise&lt;RuntimeMessage&lt;TPayload&gt; &#124; null&gt;</code> | pull 的公开运行时操作。 |

## `MessageFailInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deadLetter` | 属性 | <code>deadLetter: boolean</code> | dead Letter 字段。 |
| `handledBy` | 属性 | <code>handledBy: MessageAddress</code> | handled By 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `retry` | 属性 | <code>retry: boolean</code> | retry 字段。 |
| `retryAfterMs` | 属性 | <code>retryAfterMs: number</code> | retry After Ms 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `timestamp` | 属性 | <code>timestamp: string</code> | timestamp 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `MessageListFilter` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `status` | 属性 | <code>status: MessageStatus</code> | status 字段。 |
| `to` | 属性 | <code>to: MessageAddress</code> | to 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `PublishMessageInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `availableAt` | 属性 | <code>availableAt: string</code> | available At 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `from` | 属性 | <code>from: MessageAddress</code> | from 字段。 |
| `fsmState` | 属性 | <code>fsmState: string</code> | fsm State 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `payload` | 属性 | <code>payload: TPayload</code> | payload 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `to` | 属性 | <code>to: MessageAddress</code> | to 字段。 |
| `type` | 属性 | <code>type: string</code> | type 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `PullMessageFilter` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fsmState` | 属性 | <code>fsmState: string</code> | fsm State 字段。 |
| `now` | 属性 | <code>now: string</code> | now 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `to` | 属性 | <code>to: MessageAddress</code> | to 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `RuntimeMessage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `attemptCount` | 属性 | <code>attemptCount: number</code> | attempt Count 字段。 |
| `availableAt` | 属性 | <code>availableAt: string</code> | available At 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `from` | 属性 | <code>from: MessageAddress</code> | from 字段。 |
| `fsmState` | 属性 | <code>fsmState: string</code> | fsm State 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `payload` | 属性 | <code>payload: TPayload</code> | payload 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `status` | 属性 | <code>status: MessageStatus</code> | status 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `to` | 属性 | <code>to: MessageAddress</code> | to 字段。 |
| `type` | 属性 | <code>type: string</code> | type 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
