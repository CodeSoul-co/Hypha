# `@codesoul-co/hypha-core` / `modules/runtime/message-bus`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/message-bus.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)
- Exports: **14**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMessageBus` | class | <code>new InMemoryMessageBus(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | Runtime implementation for In Memory Message Bus; see its public constructor and members below. |
| `addMilliseconds` | function | <code>addMilliseconds(timestamp: string, milliseconds: number): string</code> | Public runtime operation for add Milliseconds. |
| `busError` | function | <code>busError(code: string, message: string, context?: Record&lt;string, unknown&gt;): FrameworkError</code> | Public runtime operation for bus Error. |
| `createRuntimeMessageEnvelope` | function | <code>createRuntimeMessageEnvelope&lt;TPayload&gt;(input: RuntimeMessageEnvelopeInput&lt;TPayload&gt;): RuntimeMessageEnvelope&lt;TPayload&gt;</code> | Creates Runtime Message Envelope at this module boundary. |
| `isAtOrBefore` | function | <code>isAtOrBefore(left: string, right: string): boolean</code> | Checks At Or Before at this module boundary. |
| `nonEmpty` | function | <code>nonEmpty(value: unknown, label: string): asserts value is string</code> | Public runtime operation for non Empty. |
| `nonNegative` | function | <code>nonNegative(value: number, label?: string): number</code> | Public runtime operation for non Negative. |
| `positive` | function | <code>positive(value: number, label: string): number</code> | Public runtime operation for positive. |
| `InMemoryMessageBusOptions` | interface | <code>interface InMemoryMessageBusOptions</code> | Field contract for In Memory Message Bus Options; see all contract members below. |
| `MessageBus` | interface | <code>interface MessageBus</code> | Field contract for Message Bus; see all contract members below. |
| `MessageDelivery` | interface | <code>interface MessageDelivery</code> | Field contract for Message Delivery; see all contract members below. |
| `MessagePublishRequest` | interface | <code>interface MessagePublishRequest</code> | Field contract for Message Publish Request; see all contract members below. |
| `MessagePublishResult` | interface | <code>interface MessagePublishResult</code> | Field contract for Message Publish Result; see all contract members below. |
| `MessageSubscriptionRequest` | interface | <code>interface MessageSubscriptionRequest</code> | Field contract for Message Subscription Request; see all contract members below. |

## `InMemoryMessageBus` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | Creates an instance of this class. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `listDeadLetters` | method | <code>listDeadLetters(consumerGroup: string): RuntimeMessageEnvelope[]</code> | Lists Dead Letters at this module boundary. |
| `publish` | method | <code>publish&lt;TPayload&gt;(request: MessagePublishRequest&lt;TPayload&gt;): Promise&lt;MessagePublishResult&gt;</code> | Public runtime operation for publish. |
| `publishBatch` | method | <code>publishBatch&lt;TPayload&gt;(requests: MessagePublishRequest&lt;TPayload&gt;[]): Promise&lt;MessagePublishResult[]&gt;</code> | Public runtime operation for publish Batch. |
| `subscribe` | method | <code>subscribe&lt;TPayload&gt;(request: MessageSubscriptionRequest): AsyncIterable&lt;MessageDelivery&lt;TPayload&gt;&gt;</code> | Public runtime operation for subscribe. |

## `InMemoryMessageBusOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `defaultAckDeadlineMs` | property | <code>defaultAckDeadlineMs: number</code> | Public default Ack Deadline Ms property. |
| `maxDeliveryAttempts` | property | <code>maxDeliveryAttempts: number</code> | Public max Delivery Attempts property. |
| `maxMessageBytes` | property | <code>maxMessageBytes: number</code> | Public max Message Bytes property. |
| `maxQueueDepth` | property | <code>maxQueueDepth: number</code> | Public max Queue Depth property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `pollIntervalMs` | property | <code>pollIntervalMs: number</code> | Public poll Interval Ms property. |

## `MessageBus` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `publish` | method | <code>publish&lt;TPayload&gt;(request: MessagePublishRequest&lt;TPayload&gt;): Promise&lt;MessagePublishResult&gt;</code> | Public runtime operation for publish. |
| `publishBatch` | method | <code>publishBatch&lt;TPayload&gt;(requests: MessagePublishRequest&lt;TPayload&gt;[]): Promise&lt;MessagePublishResult[]&gt;</code> | Public runtime operation for publish Batch. |
| `subscribe` | method | <code>subscribe&lt;TPayload&gt;(request: MessageSubscriptionRequest): AsyncIterable&lt;MessageDelivery&lt;TPayload&gt;&gt;</code> | Public runtime operation for subscribe. |

## `MessageDelivery` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ack` | method | <code>ack(): Promise&lt;void&gt;</code> | Public runtime operation for ack. |
| `ackDeadlineAt` | property | <code>ackDeadlineAt: string</code> | Public ack Deadline At property. |
| `attempt` | property | <code>attempt: number</code> | Public attempt property. |
| `deadLetter` | method | <code>deadLetter(reason: string): Promise&lt;void&gt;</code> | Public runtime operation for dead Letter. |
| `deliveryId` | property | <code>deliveryId: string</code> | Public delivery Id property. |
| `envelope` | property | <code>envelope: RuntimeMessageEnvelope&lt;TPayload&gt;</code> | Public envelope property. |
| `extendAckDeadline` | method | <code>extendAckDeadline(extensionMs: number): Promise&lt;void&gt;</code> | Public runtime operation for extend Ack Deadline. |
| `nack` | method | <code>nack(options?: { delayMs?: number; reason?: string; }): Promise&lt;void&gt;</code> | Public runtime operation for nack. |
| `receivedAt` | property | <code>receivedAt: string</code> | Public received At property. |

## `MessagePublishRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `envelope` | property | <code>envelope: RuntimeMessageEnvelopeInput&lt;TPayload&gt;</code> | Public envelope property. |

## `MessagePublishResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `messageId` | property | <code>messageId: string</code> | Public message Id property. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public partition Key property. |
| `publishedAt` | property | <code>publishedAt: string</code> | Public published At property. |
| `reused` | property | <code>reused: boolean</code> | Public reused property. |
| `sequence` | property | <code>sequence: number</code> | Public sequence property. |
| `topic` | property | <code>topic: string</code> | Public topic property. |

## `MessageSubscriptionRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ackDeadlineMs` | property | <code>ackDeadlineMs: number</code> | Public ack Deadline Ms property. |
| `consumerGroup` | property | <code>consumerGroup: string</code> | Public consumer Group property. |
| `consumerId` | property | <code>consumerId: string</code> | Public consumer Id property. |
| `idleTimeoutMs` | property | <code>idleTimeoutMs: number</code> | Public idle Timeout Ms property. |
| `maxMessages` | property | <code>maxMessages: number</code> | Public max Messages property. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public partition Key property. |
| `signal` | property | <code>signal: AbortSignal</code> | Public signal property. |
| `topic` | property | <code>topic: string</code> | Public topic property. |
