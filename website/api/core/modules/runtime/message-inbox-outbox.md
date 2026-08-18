# `@codesoul-co/hypha-core` / `modules/runtime/message-inbox-outbox`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/message-inbox-outbox.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)
- Exports: **12**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryRuntimeMessageInboxStore` | class | <code>new InMemoryRuntimeMessageInboxStore(): InMemoryRuntimeMessageInboxStore</code> | Runtime implementation for In Memory Runtime Message Inbox Store; see its public constructor and members below. |
| `InMemoryRuntimeMessageOutboxStore` | class | <code>new InMemoryRuntimeMessageOutboxStore(): InMemoryRuntimeMessageOutboxStore</code> | Runtime implementation for In Memory Runtime Message Outbox Store; see its public constructor and members below. |
| `RuntimeInboxProcessor` | class | <code>new RuntimeInboxProcessor(options: RuntimeInboxProcessorOptions): RuntimeInboxProcessor</code> | Runtime implementation for Runtime Inbox Processor; see its public constructor and members below. |
| `RuntimeOutboxDispatcher` | class | <code>new RuntimeOutboxDispatcher(options: RuntimeOutboxDispatcherOptions): RuntimeOutboxDispatcher</code> | Runtime implementation for Runtime Outbox Dispatcher; see its public constructor and members below. |
| `InboxClaimRequest` | interface | <code>interface InboxClaimRequest</code> | Field contract for Inbox Claim Request; see all contract members below. |
| `InboxClaimResult` | interface | <code>interface InboxClaimResult</code> | Field contract for Inbox Claim Result; see all contract members below. |
| `RuntimeInboxHandleResult` | interface | <code>interface RuntimeInboxHandleResult</code> | Field contract for Runtime Inbox Handle Result; see all contract members below. |
| `RuntimeInboxProcessorOptions` | interface | <code>interface RuntimeInboxProcessorOptions</code> | Field contract for Runtime Inbox Processor Options; see all contract members below. |
| `RuntimeMessageInboxStore` | interface | <code>interface RuntimeMessageInboxStore</code> | Field contract for Runtime Message Inbox Store; see all contract members below. |
| `RuntimeMessageOutboxStore` | interface | <code>interface RuntimeMessageOutboxStore</code> | Field contract for Runtime Message Outbox Store; see all contract members below. |
| `RuntimeOutboxDispatcherOptions` | interface | <code>interface RuntimeOutboxDispatcherOptions</code> | Field contract for Runtime Outbox Dispatcher Options; see all contract members below. |
| `RuntimeOutboxDispatchResult` | interface | <code>interface RuntimeOutboxDispatchResult</code> | Field contract for Runtime Outbox Dispatch Result; see all contract members below. |

## `InMemoryRuntimeMessageInboxStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claim` | method | <code>claim(request: InboxClaimRequest): Promise&lt;InboxClaimResult&gt;</code> | Public runtime operation for claim. |
| `complete` | method | <code>complete(consumerId: string, messageId: string, ownerId: string, appliedEventIds: string[], completedAt: string): Promise&lt;void&gt;</code> | Public runtime operation for complete. |
| `constructor` | constructor | <code>(): InMemoryRuntimeMessageInboxStore</code> | Creates an instance of this class. |
| `fail` | method | <code>fail(consumerId: string, messageId: string, ownerId: string, error: NormalizedRuntimeError, failedAt: string): Promise&lt;void&gt;</code> | Public runtime operation for fail. |
| `get` | method | <code>get(consumerId: string, messageId: string): Promise&lt;RuntimeMessageInboxRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |

## `InMemoryRuntimeMessageOutboxStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claim` | method | <code>claim(input: { ownerId: string; now: string; leaseMs: number; limit: number; }): Promise&lt;RuntimeMessageOutboxRecord[]&gt;</code> | Public runtime operation for claim. |
| `constructor` | constructor | <code>(): InMemoryRuntimeMessageOutboxStore</code> | Creates an instance of this class. |
| `enqueue` | method | <code>enqueue(input: { id: string; eventId?: string; envelope: RuntimeMessageEnvelope; availableAt?: string; createdAt: string; }): Promise&lt;RuntimeMessageOutboxRecord&gt;</code> | Public runtime operation for enqueue. |
| `get` | method | <code>get(id: string): Promise&lt;RuntimeMessageOutboxRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `markFailed` | method | <code>markFailed(input: { id: string; ownerId: string; failedAt: string; error: NormalizedRuntimeError; retryAt?: string; deadLetter?: boolean; }): Promise&lt;void&gt;</code> | Public runtime operation for mark Failed. |
| `markPublished` | method | <code>markPublished(id: string, ownerId: string, publishedAt: string): Promise&lt;void&gt;</code> | Public runtime operation for mark Published. |

## `RuntimeInboxProcessor` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeInboxProcessorOptions): RuntimeInboxProcessor</code> | Creates an instance of this class. |
| `handle` | method | <code>handle(delivery: MessageDelivery, apply: (envelope: RuntimeMessageEnvelope) =&gt; Promise&lt;string[]&gt;): Promise&lt;RuntimeInboxHandleResult&gt;</code> | Public runtime operation for handle. |

## `RuntimeOutboxDispatcher` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeOutboxDispatcherOptions): RuntimeOutboxDispatcher</code> | Creates an instance of this class. |
| `dispatch` | method | <code>dispatch(limit?: number): Promise&lt;RuntimeOutboxDispatchResult&gt;</code> | Public runtime operation for dispatch. |

## `InboxClaimRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `consumerId` | property | <code>consumerId: string</code> | Public consumer Id property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `messageId` | property | <code>messageId: string</code> | Public message Id property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public payload Hash property. |
| `processingLeaseMs` | property | <code>processingLeaseMs: number</code> | Public processing Lease Ms property. |
| `receivedAt` | property | <code>receivedAt: string</code> | Public received At property. |

## `InboxClaimResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `disposition` | property | <code>disposition: "busy" &#124; "expired" &#124; "claimed" &#124; "conflict" &#124; "duplicate"</code> | Public disposition property. |
| `record` | property | <code>record: RuntimeMessageInboxRecord</code> | Public record property. |

## `RuntimeInboxHandleResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ackPending` | property | <code>ackPending: boolean</code> | Public ack Pending property. |
| `appliedEventIds` | property | <code>appliedEventIds: string[]</code> | Public applied Event Ids property. |
| `disposition` | property | <code>disposition: "failed" &#124; "busy" &#124; "expired" &#124; "applied" &#124; "dead_lettered" &#124; "duplicate"</code> | Public disposition property. |

## `RuntimeInboxProcessorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `consumerId` | property | <code>consumerId: string</code> | Public consumer Id property. |
| `inbox` | property | <code>inbox: RuntimeMessageInboxStore</code> | Public inbox property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `processingLeaseMs` | property | <code>processingLeaseMs: number</code> | Public processing Lease Ms property. |

## `RuntimeMessageInboxStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claim` | method | <code>claim(request: InboxClaimRequest): Promise&lt;InboxClaimResult&gt;</code> | Public runtime operation for claim. |
| `complete` | method | <code>complete(consumerId: string, messageId: string, ownerId: string, appliedEventIds: string[], completedAt: string): Promise&lt;void&gt;</code> | Public runtime operation for complete. |
| `fail` | method | <code>fail(consumerId: string, messageId: string, ownerId: string, error: NormalizedRuntimeError, failedAt: string): Promise&lt;void&gt;</code> | Public runtime operation for fail. |
| `get` | method | <code>get(consumerId: string, messageId: string): Promise&lt;RuntimeMessageInboxRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |

## `RuntimeMessageOutboxStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claim` | method | <code>claim(input: { ownerId: string; now: string; leaseMs: number; limit: number; }): Promise&lt;RuntimeMessageOutboxRecord[]&gt;</code> | Public runtime operation for claim. |
| `enqueue` | method | <code>enqueue(input: { id: string; eventId?: string; envelope: RuntimeMessageEnvelope; availableAt?: string; createdAt: string; }): Promise&lt;RuntimeMessageOutboxRecord&gt;</code> | Public runtime operation for enqueue. |
| `get` | method | <code>get(id: string): Promise&lt;RuntimeMessageOutboxRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `markFailed` | method | <code>markFailed(input: { id: string; ownerId: string; failedAt: string; error: NormalizedRuntimeError; retryAt?: string; deadLetter?: boolean; }): Promise&lt;void&gt;</code> | Public runtime operation for mark Failed. |
| `markPublished` | method | <code>markPublished(id: string, ownerId: string, publishedAt: string): Promise&lt;void&gt;</code> | Public runtime operation for mark Published. |

## `RuntimeOutboxDispatcherOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bus` | property | <code>bus: MessageBus</code> | Public bus property. |
| `leaseMs` | property | <code>leaseMs: number</code> | Public lease Ms property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `outbox` | property | <code>outbox: RuntimeMessageOutboxStore</code> | Public outbox property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `retryDelayMs` | method | <code>retryDelayMs(attempt: number): number</code> | Public runtime operation for retry Delay Ms. |

## `RuntimeOutboxDispatchResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimed` | property | <code>claimed: number</code> | Public claimed property. |
| `deadLettered` | property | <code>deadLettered: number</code> | Public dead Lettered property. |
| `failed` | property | <code>failed: number</code> | Public failed property. |
| `published` | property | <code>published: number</code> | Public published property. |
