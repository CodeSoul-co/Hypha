# `@codesoul-co/hypha-core` / `modules/runtime/message-bus`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/message-bus.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)
- 导出数: **14**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMessageBus` | 类 | <code>new InMemoryMessageBus(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | In Memory Message Bus 的运行时实现；公开构造函数与成员见下表。 |
| `addMilliseconds` | 函数 | <code>addMilliseconds(timestamp: string, milliseconds: number): string</code> | add Milliseconds 的公开运行时操作。 |
| `busError` | 函数 | <code>busError(code: string, message: string, context?: Record&lt;string, unknown&gt;): FrameworkError</code> | bus Error 的公开运行时操作。 |
| `createRuntimeMessageEnvelope` | 函数 | <code>createRuntimeMessageEnvelope&lt;TPayload&gt;(input: RuntimeMessageEnvelopeInput&lt;TPayload&gt;): RuntimeMessageEnvelope&lt;TPayload&gt;</code> | 创建 Runtime Message Envelope。 |
| `isAtOrBefore` | 函数 | <code>isAtOrBefore(left: string, right: string): boolean</code> | 判断 At Or Before。 |
| `nonEmpty` | 函数 | <code>nonEmpty(value: unknown, label: string): asserts value is string</code> | non Empty 的公开运行时操作。 |
| `nonNegative` | 函数 | <code>nonNegative(value: number, label?: string): number</code> | non Negative 的公开运行时操作。 |
| `positive` | 函数 | <code>positive(value: number, label: string): number</code> | positive 的公开运行时操作。 |
| `InMemoryMessageBusOptions` | 接口 | <code>interface InMemoryMessageBusOptions</code> | In Memory Message Bus Options 的字段契约；完整字段见下表。 |
| `MessageBus` | 接口 | <code>interface MessageBus</code> | Message Bus 的字段契约；完整字段见下表。 |
| `MessageDelivery` | 接口 | <code>interface MessageDelivery</code> | Message Delivery 的字段契约；完整字段见下表。 |
| `MessagePublishRequest` | 接口 | <code>interface MessagePublishRequest</code> | Message Publish Request 的字段契约；完整字段见下表。 |
| `MessagePublishResult` | 接口 | <code>interface MessagePublishResult</code> | Message Publish Result 的字段契约；完整字段见下表。 |
| `MessageSubscriptionRequest` | 接口 | <code>interface MessageSubscriptionRequest</code> | Message Subscription Request 的字段契约；完整字段见下表。 |

## `InMemoryMessageBus` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | 创建该类的实例。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `listDeadLetters` | 方法 | <code>listDeadLetters(consumerGroup: string): RuntimeMessageEnvelope[]</code> | 列出 Dead Letters。 |
| `publish` | 方法 | <code>publish&lt;TPayload&gt;(request: MessagePublishRequest&lt;TPayload&gt;): Promise&lt;MessagePublishResult&gt;</code> | publish 的公开运行时操作。 |
| `publishBatch` | 方法 | <code>publishBatch&lt;TPayload&gt;(requests: MessagePublishRequest&lt;TPayload&gt;[]): Promise&lt;MessagePublishResult[]&gt;</code> | publish Batch 的公开运行时操作。 |
| `subscribe` | 方法 | <code>subscribe&lt;TPayload&gt;(request: MessageSubscriptionRequest): AsyncIterable&lt;MessageDelivery&lt;TPayload&gt;&gt;</code> | subscribe 的公开运行时操作。 |

## `InMemoryMessageBusOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `defaultAckDeadlineMs` | 属性 | <code>defaultAckDeadlineMs: number</code> | default Ack Deadline Ms 字段。 |
| `maxDeliveryAttempts` | 属性 | <code>maxDeliveryAttempts: number</code> | max Delivery Attempts 字段。 |
| `maxMessageBytes` | 属性 | <code>maxMessageBytes: number</code> | max Message Bytes 字段。 |
| `maxQueueDepth` | 属性 | <code>maxQueueDepth: number</code> | max Queue Depth 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `pollIntervalMs` | 属性 | <code>pollIntervalMs: number</code> | poll Interval Ms 字段。 |

## `MessageBus` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `publish` | 方法 | <code>publish&lt;TPayload&gt;(request: MessagePublishRequest&lt;TPayload&gt;): Promise&lt;MessagePublishResult&gt;</code> | publish 的公开运行时操作。 |
| `publishBatch` | 方法 | <code>publishBatch&lt;TPayload&gt;(requests: MessagePublishRequest&lt;TPayload&gt;[]): Promise&lt;MessagePublishResult[]&gt;</code> | publish Batch 的公开运行时操作。 |
| `subscribe` | 方法 | <code>subscribe&lt;TPayload&gt;(request: MessageSubscriptionRequest): AsyncIterable&lt;MessageDelivery&lt;TPayload&gt;&gt;</code> | subscribe 的公开运行时操作。 |

## `MessageDelivery` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ack` | 方法 | <code>ack(): Promise&lt;void&gt;</code> | ack 的公开运行时操作。 |
| `ackDeadlineAt` | 属性 | <code>ackDeadlineAt: string</code> | ack Deadline At 字段。 |
| `attempt` | 属性 | <code>attempt: number</code> | attempt 字段。 |
| `deadLetter` | 方法 | <code>deadLetter(reason: string): Promise&lt;void&gt;</code> | dead Letter 的公开运行时操作。 |
| `deliveryId` | 属性 | <code>deliveryId: string</code> | delivery Id 字段。 |
| `envelope` | 属性 | <code>envelope: RuntimeMessageEnvelope&lt;TPayload&gt;</code> | envelope 字段。 |
| `extendAckDeadline` | 方法 | <code>extendAckDeadline(extensionMs: number): Promise&lt;void&gt;</code> | extend Ack Deadline 的公开运行时操作。 |
| `nack` | 方法 | <code>nack(options?: { delayMs?: number; reason?: string; }): Promise&lt;void&gt;</code> | nack 的公开运行时操作。 |
| `receivedAt` | 属性 | <code>receivedAt: string</code> | received At 字段。 |

## `MessagePublishRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `envelope` | 属性 | <code>envelope: RuntimeMessageEnvelopeInput&lt;TPayload&gt;</code> | envelope 字段。 |

## `MessagePublishResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `messageId` | 属性 | <code>messageId: string</code> | message Id 字段。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | partition Key 字段。 |
| `publishedAt` | 属性 | <code>publishedAt: string</code> | published At 字段。 |
| `reused` | 属性 | <code>reused: boolean</code> | reused 字段。 |
| `sequence` | 属性 | <code>sequence: number</code> | sequence 字段。 |
| `topic` | 属性 | <code>topic: string</code> | topic 字段。 |

## `MessageSubscriptionRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ackDeadlineMs` | 属性 | <code>ackDeadlineMs: number</code> | ack Deadline Ms 字段。 |
| `consumerGroup` | 属性 | <code>consumerGroup: string</code> | consumer Group 字段。 |
| `consumerId` | 属性 | <code>consumerId: string</code> | consumer Id 字段。 |
| `idleTimeoutMs` | 属性 | <code>idleTimeoutMs: number</code> | idle Timeout Ms 字段。 |
| `maxMessages` | 属性 | <code>maxMessages: number</code> | max Messages 字段。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | partition Key 字段。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | signal 字段。 |
| `topic` | 属性 | <code>topic: string</code> | topic 字段。 |
