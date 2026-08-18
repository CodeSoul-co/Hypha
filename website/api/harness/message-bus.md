# `@codesoul-co/hypha-harness` / `message-bus`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Package guide: [learning and composition guide](/packages/harness)
- Source: [`packages/harness/src/message-bus.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)
- Exports: **12**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMessageBus` | class | <code>new InMemoryMessageBus(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | Runtime implementation for In Memory Message Bus; see its public constructor and members below. |
| `InMemoryMessageBusOptions` | interface | <code>interface InMemoryMessageBusOptions</code> | Field contract for In Memory Message Bus Options; see all contract members below. |
| `MessageAckInput` | interface | <code>interface MessageAckInput</code> | Field contract for Message Ack Input; see all contract members below. |
| `MessageAddress` | interface | <code>interface MessageAddress</code> | Field contract for Message Address; see all contract members below. |
| `MessageBus` | interface | <code>interface MessageBus</code> | Field contract for Message Bus; see all contract members below. |
| `MessageFailInput` | interface | <code>interface MessageFailInput extends MessageAckInput</code> | Field contract for Message Fail Input; see all contract members below. |
| `MessageListFilter` | interface | <code>interface MessageListFilter</code> | Field contract for Message List Filter; see all contract members below. |
| `PublishMessageInput` | interface | <code>interface PublishMessageInput</code> | Field contract for Publish Message Input; see all contract members below. |
| `PullMessageFilter` | interface | <code>interface PullMessageFilter</code> | Field contract for Pull Message Filter; see all contract members below. |
| `RuntimeMessage` | interface | <code>interface RuntimeMessage</code> | Field contract for Runtime Message; see all contract members below. |
| `MessageAddressKind` | type | <code>type MessageAddressKind = 'runtime' &#124; 'session' &#124; 'workflow' &#124; 'agent' &#124; 'tool' &#124; 'human'</code> | Public type alias for Message Address Kind. |
| `MessageStatus` | type | <code>type MessageStatus = 'queued' &#124; 'delivered' &#124; 'acknowledged' &#124; 'failed' &#124; 'dead_lettered'</code> | Public type alias for Message Status. |

## `InMemoryMessageBus` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acknowledge` | method | <code>acknowledge(input: MessageAckInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | Public runtime operation for acknowledge. |
| `constructor` | constructor | <code>(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | Creates an instance of this class. |
| `fail` | method | <code>fail(input: MessageFailInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | Public runtime operation for fail. |
| `list` | method | <code>list(filter?: MessageListFilter): Promise&lt;RuntimeMessage[]&gt;</code> | Lists list at this module boundary. |
| `publish` | method | <code>publish&lt;TPayload = unknown&gt;(input: PublishMessageInput&lt;TPayload&gt;): Promise&lt;RuntimeMessage&lt;TPayload&gt;&gt;</code> | Public runtime operation for publish. |
| `pull` | method | <code>pull&lt;TPayload = unknown&gt;(filter: PullMessageFilter): Promise&lt;RuntimeMessage&lt;TPayload&gt; &#124; null&gt;</code> | Public runtime operation for pull. |

## `InMemoryMessageBusOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `initialRetryDelayMs` | property | <code>initialRetryDelayMs: number</code> | Public initial Retry Delay Ms property. |
| `maxDeliveryAttempts` | property | <code>maxDeliveryAttempts: number</code> | Public max Delivery Attempts property. |
| `maxRetryDelayMs` | property | <code>maxRetryDelayMs: number</code> | Public max Retry Delay Ms property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `retryMultiplier` | property | <code>retryMultiplier: number</code> | Public retry Multiplier property. |
| `trace` | property | <code>trace: TraceRecorder</code> | Public trace property. |

## `MessageAckInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `handledBy` | property | <code>handledBy: MessageAddress</code> | Public handled By property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `timestamp` | property | <code>timestamp: string</code> | Public timestamp property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `MessageAddress` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `kind` | property | <code>kind: MessageAddressKind</code> | Public kind property. |

## `MessageBus` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acknowledge` | method | <code>acknowledge(input: MessageAckInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | Public runtime operation for acknowledge. |
| `fail` | method | <code>fail(input: MessageFailInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | Public runtime operation for fail. |
| `list` | method | <code>list(filter?: MessageListFilter): Promise&lt;RuntimeMessage[]&gt;</code> | Lists list at this module boundary. |
| `publish` | method | <code>publish&lt;TPayload = unknown&gt;(input: PublishMessageInput&lt;TPayload&gt;): Promise&lt;RuntimeMessage&lt;TPayload&gt;&gt;</code> | Public runtime operation for publish. |
| `pull` | method | <code>pull&lt;TPayload = unknown&gt;(filter: PullMessageFilter): Promise&lt;RuntimeMessage&lt;TPayload&gt; &#124; null&gt;</code> | Public runtime operation for pull. |

## `MessageFailInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deadLetter` | property | <code>deadLetter: boolean</code> | Public dead Letter property. |
| `handledBy` | property | <code>handledBy: MessageAddress</code> | Public handled By property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `retry` | property | <code>retry: boolean</code> | Public retry property. |
| `retryAfterMs` | property | <code>retryAfterMs: number</code> | Public retry After Ms property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `timestamp` | property | <code>timestamp: string</code> | Public timestamp property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `MessageListFilter` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `status` | property | <code>status: MessageStatus</code> | Public status property. |
| `to` | property | <code>to: MessageAddress</code> | Public to property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `PublishMessageInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `availableAt` | property | <code>availableAt: string</code> | Public available At property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `from` | property | <code>from: MessageAddress</code> | Public from property. |
| `fsmState` | property | <code>fsmState: string</code> | Public fsm State property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `payload` | property | <code>payload: TPayload</code> | Public payload property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `to` | property | <code>to: MessageAddress</code> | Public to property. |
| `type` | property | <code>type: string</code> | Public type property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `PullMessageFilter` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fsmState` | property | <code>fsmState: string</code> | Public fsm State property. |
| `now` | property | <code>now: string</code> | Public now property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `to` | property | <code>to: MessageAddress</code> | Public to property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `RuntimeMessage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `attemptCount` | property | <code>attemptCount: number</code> | Public attempt Count property. |
| `availableAt` | property | <code>availableAt: string</code> | Public available At property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `from` | property | <code>from: MessageAddress</code> | Public from property. |
| `fsmState` | property | <code>fsmState: string</code> | Public fsm State property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `payload` | property | <code>payload: TPayload</code> | Public payload property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `status` | property | <code>status: MessageStatus</code> | Public status property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `to` | property | <code>to: MessageAddress</code> | Public to property. |
| `type` | property | <code>type: string</code> | Public type property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
