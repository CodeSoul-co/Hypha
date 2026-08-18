# `@codesoul-co/hypha-core` / `modules/runtime/message-inbox-outbox`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/message-inbox-outbox.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)
- 导出数: **12**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryRuntimeMessageInboxStore` | 类 | <code>new InMemoryRuntimeMessageInboxStore(): InMemoryRuntimeMessageInboxStore</code> | In Memory Runtime Message Inbox Store 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryRuntimeMessageOutboxStore` | 类 | <code>new InMemoryRuntimeMessageOutboxStore(): InMemoryRuntimeMessageOutboxStore</code> | In Memory Runtime Message Outbox Store 的运行时实现；公开构造函数与成员见下表。 |
| `RuntimeInboxProcessor` | 类 | <code>new RuntimeInboxProcessor(options: RuntimeInboxProcessorOptions): RuntimeInboxProcessor</code> | Runtime Inbox Processor 的运行时实现；公开构造函数与成员见下表。 |
| `RuntimeOutboxDispatcher` | 类 | <code>new RuntimeOutboxDispatcher(options: RuntimeOutboxDispatcherOptions): RuntimeOutboxDispatcher</code> | Runtime Outbox Dispatcher 的运行时实现；公开构造函数与成员见下表。 |
| `InboxClaimRequest` | 接口 | <code>interface InboxClaimRequest</code> | Inbox Claim Request 的字段契约；完整字段见下表。 |
| `InboxClaimResult` | 接口 | <code>interface InboxClaimResult</code> | Inbox Claim Result 的字段契约；完整字段见下表。 |
| `RuntimeInboxHandleResult` | 接口 | <code>interface RuntimeInboxHandleResult</code> | Runtime Inbox Handle Result 的字段契约；完整字段见下表。 |
| `RuntimeInboxProcessorOptions` | 接口 | <code>interface RuntimeInboxProcessorOptions</code> | Runtime Inbox Processor Options 的字段契约；完整字段见下表。 |
| `RuntimeMessageInboxStore` | 接口 | <code>interface RuntimeMessageInboxStore</code> | Runtime Message Inbox Store 的字段契约；完整字段见下表。 |
| `RuntimeMessageOutboxStore` | 接口 | <code>interface RuntimeMessageOutboxStore</code> | Runtime Message Outbox Store 的字段契约；完整字段见下表。 |
| `RuntimeOutboxDispatcherOptions` | 接口 | <code>interface RuntimeOutboxDispatcherOptions</code> | Runtime Outbox Dispatcher Options 的字段契约；完整字段见下表。 |
| `RuntimeOutboxDispatchResult` | 接口 | <code>interface RuntimeOutboxDispatchResult</code> | Runtime Outbox Dispatch Result 的字段契约；完整字段见下表。 |

## `InMemoryRuntimeMessageInboxStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claim` | 方法 | <code>claim(request: InboxClaimRequest): Promise&lt;InboxClaimResult&gt;</code> | claim 的公开运行时操作。 |
| `complete` | 方法 | <code>complete(consumerId: string, messageId: string, ownerId: string, appliedEventIds: string[], completedAt: string): Promise&lt;void&gt;</code> | complete 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): InMemoryRuntimeMessageInboxStore</code> | 创建该类的实例。 |
| `fail` | 方法 | <code>fail(consumerId: string, messageId: string, ownerId: string, error: NormalizedRuntimeError, failedAt: string): Promise&lt;void&gt;</code> | fail 的公开运行时操作。 |
| `get` | 方法 | <code>get(consumerId: string, messageId: string): Promise&lt;RuntimeMessageInboxRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |

## `InMemoryRuntimeMessageOutboxStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claim` | 方法 | <code>claim(input: { ownerId: string; now: string; leaseMs: number; limit: number; }): Promise&lt;RuntimeMessageOutboxRecord[]&gt;</code> | claim 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): InMemoryRuntimeMessageOutboxStore</code> | 创建该类的实例。 |
| `enqueue` | 方法 | <code>enqueue(input: { id: string; eventId?: string; envelope: RuntimeMessageEnvelope; availableAt?: string; createdAt: string; }): Promise&lt;RuntimeMessageOutboxRecord&gt;</code> | enqueue 的公开运行时操作。 |
| `get` | 方法 | <code>get(id: string): Promise&lt;RuntimeMessageOutboxRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `markFailed` | 方法 | <code>markFailed(input: { id: string; ownerId: string; failedAt: string; error: NormalizedRuntimeError; retryAt?: string; deadLetter?: boolean; }): Promise&lt;void&gt;</code> | mark Failed 的公开运行时操作。 |
| `markPublished` | 方法 | <code>markPublished(id: string, ownerId: string, publishedAt: string): Promise&lt;void&gt;</code> | mark Published 的公开运行时操作。 |

## `RuntimeInboxProcessor` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeInboxProcessorOptions): RuntimeInboxProcessor</code> | 创建该类的实例。 |
| `handle` | 方法 | <code>handle(delivery: MessageDelivery, apply: (envelope: RuntimeMessageEnvelope) =&gt; Promise&lt;string[]&gt;): Promise&lt;RuntimeInboxHandleResult&gt;</code> | handle 的公开运行时操作。 |

## `RuntimeOutboxDispatcher` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeOutboxDispatcherOptions): RuntimeOutboxDispatcher</code> | 创建该类的实例。 |
| `dispatch` | 方法 | <code>dispatch(limit?: number): Promise&lt;RuntimeOutboxDispatchResult&gt;</code> | dispatch 的公开运行时操作。 |

## `InboxClaimRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `consumerId` | 属性 | <code>consumerId: string</code> | consumer Id 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `messageId` | 属性 | <code>messageId: string</code> | message Id 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | payload Hash 字段。 |
| `processingLeaseMs` | 属性 | <code>processingLeaseMs: number</code> | processing Lease Ms 字段。 |
| `receivedAt` | 属性 | <code>receivedAt: string</code> | received At 字段。 |

## `InboxClaimResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `disposition` | 属性 | <code>disposition: "busy" &#124; "expired" &#124; "claimed" &#124; "conflict" &#124; "duplicate"</code> | disposition 字段。 |
| `record` | 属性 | <code>record: RuntimeMessageInboxRecord</code> | record 字段。 |

## `RuntimeInboxHandleResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ackPending` | 属性 | <code>ackPending: boolean</code> | ack Pending 字段。 |
| `appliedEventIds` | 属性 | <code>appliedEventIds: string[]</code> | applied Event Ids 字段。 |
| `disposition` | 属性 | <code>disposition: "failed" &#124; "busy" &#124; "expired" &#124; "applied" &#124; "dead_lettered" &#124; "duplicate"</code> | disposition 字段。 |

## `RuntimeInboxProcessorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `consumerId` | 属性 | <code>consumerId: string</code> | consumer Id 字段。 |
| `inbox` | 属性 | <code>inbox: RuntimeMessageInboxStore</code> | inbox 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `processingLeaseMs` | 属性 | <code>processingLeaseMs: number</code> | processing Lease Ms 字段。 |

## `RuntimeMessageInboxStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claim` | 方法 | <code>claim(request: InboxClaimRequest): Promise&lt;InboxClaimResult&gt;</code> | claim 的公开运行时操作。 |
| `complete` | 方法 | <code>complete(consumerId: string, messageId: string, ownerId: string, appliedEventIds: string[], completedAt: string): Promise&lt;void&gt;</code> | complete 的公开运行时操作。 |
| `fail` | 方法 | <code>fail(consumerId: string, messageId: string, ownerId: string, error: NormalizedRuntimeError, failedAt: string): Promise&lt;void&gt;</code> | fail 的公开运行时操作。 |
| `get` | 方法 | <code>get(consumerId: string, messageId: string): Promise&lt;RuntimeMessageInboxRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |

## `RuntimeMessageOutboxStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claim` | 方法 | <code>claim(input: { ownerId: string; now: string; leaseMs: number; limit: number; }): Promise&lt;RuntimeMessageOutboxRecord[]&gt;</code> | claim 的公开运行时操作。 |
| `enqueue` | 方法 | <code>enqueue(input: { id: string; eventId?: string; envelope: RuntimeMessageEnvelope; availableAt?: string; createdAt: string; }): Promise&lt;RuntimeMessageOutboxRecord&gt;</code> | enqueue 的公开运行时操作。 |
| `get` | 方法 | <code>get(id: string): Promise&lt;RuntimeMessageOutboxRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `markFailed` | 方法 | <code>markFailed(input: { id: string; ownerId: string; failedAt: string; error: NormalizedRuntimeError; retryAt?: string; deadLetter?: boolean; }): Promise&lt;void&gt;</code> | mark Failed 的公开运行时操作。 |
| `markPublished` | 方法 | <code>markPublished(id: string, ownerId: string, publishedAt: string): Promise&lt;void&gt;</code> | mark Published 的公开运行时操作。 |

## `RuntimeOutboxDispatcherOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `bus` | 属性 | <code>bus: MessageBus</code> | bus 字段。 |
| `leaseMs` | 属性 | <code>leaseMs: number</code> | lease Ms 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `outbox` | 属性 | <code>outbox: RuntimeMessageOutboxStore</code> | outbox 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `retryDelayMs` | 方法 | <code>retryDelayMs(attempt: number): number</code> | retry Delay Ms 的公开运行时操作。 |

## `RuntimeOutboxDispatchResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimed` | 属性 | <code>claimed: number</code> | claimed 字段。 |
| `deadLettered` | 属性 | <code>deadLettered: number</code> | dead Lettered 字段。 |
| `failed` | 属性 | <code>failed: number</code> | failed 字段。 |
| `published` | 属性 | <code>published: number</code> | published 字段。 |
