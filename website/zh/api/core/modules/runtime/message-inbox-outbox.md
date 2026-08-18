# `@codesoul-co/hypha-core` / `modules/runtime/message-inbox-outbox`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/message-inbox-outbox.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)
- 导出数: **12**

## 模块用法

用于执行该边界的运行时行为。Message inbox outbox 模块公开 4 类、8 接口。

### 从包入口导入

```ts
import {
  InMemoryRuntimeMessageInboxStore,
  InMemoryRuntimeMessageOutboxStore,
  RuntimeInboxProcessor,
  RuntimeOutboxDispatcher,
} from '@codesoul-co/hypha-core';

import type {
  InboxClaimRequest,
  InboxClaimResult,
  RuntimeInboxHandleResult,
  RuntimeInboxProcessorOptions,
  RuntimeMessageInboxStore,
  RuntimeMessageOutboxStore,
  RuntimeOutboxDispatcherOptions,
  RuntimeOutboxDispatchResult,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 8 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 4 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryRuntimeMessageInboxStore` | 类 | <code>new InMemoryRuntimeMessageInboxStore(): InMemoryRuntimeMessageInboxStore</code> | In Memory Runtime Message Inbox Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryRuntimeMessageOutboxStore` | 类 | <code>new InMemoryRuntimeMessageOutboxStore(): InMemoryRuntimeMessageOutboxStore</code> | In Memory Runtime Message Outbox Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RuntimeInboxProcessor` | 类 | <code>new RuntimeInboxProcessor(options: RuntimeInboxProcessorOptions): RuntimeInboxProcessor</code> | Runtime Inbox Processor 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RuntimeOutboxDispatcher` | 类 | <code>new RuntimeOutboxDispatcher(options: RuntimeOutboxDispatcherOptions): RuntimeOutboxDispatcher</code> | Runtime Outbox Dispatcher 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InboxClaimRequest` | 接口 | <code>interface InboxClaimRequest</code> | Inbox Claim Request 接口，共包含 7 个公开字段或方法。 |
| `InboxClaimResult` | 接口 | <code>interface InboxClaimResult</code> | Inbox Claim Result 接口，共包含 2 个公开字段或方法。 |
| `RuntimeInboxHandleResult` | 接口 | <code>interface RuntimeInboxHandleResult</code> | Runtime Inbox Handle Result 接口，共包含 3 个公开字段或方法。 |
| `RuntimeInboxProcessorOptions` | 接口 | <code>interface RuntimeInboxProcessorOptions</code> | Runtime Inbox Processor Options 接口，共包含 5 个公开字段或方法。 |
| `RuntimeMessageInboxStore` | 接口 | <code>interface RuntimeMessageInboxStore</code> | Runtime Message Inbox Store 接口，共包含 5 个公开字段或方法。 |
| `RuntimeMessageOutboxStore` | 接口 | <code>interface RuntimeMessageOutboxStore</code> | Runtime Message Outbox Store 接口，共包含 6 个公开字段或方法。 |
| `RuntimeOutboxDispatcherOptions` | 接口 | <code>interface RuntimeOutboxDispatcherOptions</code> | Runtime Outbox Dispatcher Options 接口，共包含 7 个公开字段或方法。 |
| `RuntimeOutboxDispatchResult` | 接口 | <code>interface RuntimeOutboxDispatchResult</code> | Runtime Outbox Dispatch Result 接口，共包含 4 个公开字段或方法。 |

## `InMemoryRuntimeMessageInboxStore`

In Memory Runtime Message Inbox Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryRuntimeMessageInboxStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### 声明

```text
export declare class InMemoryRuntimeMessageInboxStore implements RuntimeMessageInboxStore {
    claim(request: InboxClaimRequest): Promise<InboxClaimResult>;
    complete(consumerId: string, messageId: string, ownerId: string, appliedEventIds: string[], completedAt: string): Promise<void>;
    fail(consumerId: string, messageId: string, ownerId: string, error: NormalizedRuntimeError, failedAt: string): Promise<void>;
    get(consumerId: string, messageId: string): Promise<RuntimeMessageInboxRecord | null>;
    health(): Promise<ProviderHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claim` | 方法 | <code>claim(request: InboxClaimRequest): Promise&lt;InboxClaimResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `complete` | 方法 | <code>complete(consumerId: string, messageId: string, ownerId: string, appliedEventIds: string[], completedAt: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): InMemoryRuntimeMessageInboxStore</code> | 创建该类的实例。 |
| `fail` | 方法 | <code>fail(consumerId: string, messageId: string, ownerId: string, error: NormalizedRuntimeError, failedAt: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(consumerId: string, messageId: string): Promise&lt;RuntimeMessageInboxRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryRuntimeMessageOutboxStore`

In Memory Runtime Message Outbox Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryRuntimeMessageOutboxStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### 声明

```text
export declare class InMemoryRuntimeMessageOutboxStore implements RuntimeMessageOutboxStore {
    enqueue(input: {
            id: string;
            eventId?: string;
            envelope: RuntimeMessageEnvelope;
            availableAt?: string;
            createdAt: string;
        }): Promise<RuntimeMessageOutboxRecord>;
    claim(input: {
            ownerId: string;
            now: string;
            leaseMs: number;
            limit: number;
        }): Promise<RuntimeMessageOutboxRecord[]>;
    markPublished(id: string, ownerId: string, publishedAt: string): Promise<void>;
    markFailed(input: {
            id: string;
            ownerId: string;
            failedAt: string;
            error: NormalizedRuntimeError;
            retryAt?: string;
            deadLetter?: boolean;
        }): Promise<void>;
    get(id: string): Promise<RuntimeMessageOutboxRecord | null>;
    health(): Promise<ProviderHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claim` | 方法 | <code>claim(input: { ownerId: string; now: string; leaseMs: number; limit: number; }): Promise&lt;RuntimeMessageOutboxRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): InMemoryRuntimeMessageOutboxStore</code> | 创建该类的实例。 |
| `enqueue` | 方法 | <code>enqueue(input: { id: string; eventId?: string; envelope: RuntimeMessageEnvelope; availableAt?: string; createdAt: string; }): Promise&lt;RuntimeMessageOutboxRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(id: string): Promise&lt;RuntimeMessageOutboxRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `markFailed` | 方法 | <code>markFailed(input: { id: string; ownerId: string; failedAt: string; error: NormalizedRuntimeError; retryAt?: string; deadLetter?: boolean; }): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `markPublished` | 方法 | <code>markPublished(id: string, ownerId: string, publishedAt: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeInboxProcessor`

Runtime Inbox Processor 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RuntimeInboxProcessor } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### 声明

```text
export declare class RuntimeInboxProcessor {
    constructor(options: RuntimeInboxProcessorOptions);
    handle(delivery: MessageDelivery, apply: (envelope: RuntimeMessageEnvelope) => Promise<string[]>): Promise<RuntimeInboxHandleResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeInboxProcessorOptions): RuntimeInboxProcessor</code> | 创建该类的实例。 |
| `handle` | 方法 | <code>handle(delivery: MessageDelivery, apply: (envelope: RuntimeMessageEnvelope) =&gt; Promise&lt;string[]&gt;): Promise&lt;RuntimeInboxHandleResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeOutboxDispatcher`

Runtime Outbox Dispatcher 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RuntimeOutboxDispatcher } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### 声明

```text
export declare class RuntimeOutboxDispatcher {
    constructor(options: RuntimeOutboxDispatcherOptions);
    dispatch(limit?: number): Promise<RuntimeOutboxDispatchResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeOutboxDispatcherOptions): RuntimeOutboxDispatcher</code> | 创建该类的实例。 |
| `dispatch` | 方法 | <code>dispatch(limit?: number): Promise&lt;RuntimeOutboxDispatchResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InboxClaimRequest`

Inbox Claim Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InboxClaimRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### 声明

```text
export interface InboxClaimRequest {
    consumerId: string;
    ownerId: string;
    messageId: string;
    payloadHash: string;
    receivedAt: string;
    processingLeaseMs: number;
    expiresAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `consumerId` | 属性 | <code>consumerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messageId` | 属性 | <code>messageId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processingLeaseMs` | 属性 | <code>processingLeaseMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receivedAt` | 属性 | <code>receivedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InboxClaimResult`

Inbox Claim Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InboxClaimResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### 声明

```text
export interface InboxClaimResult {
    disposition: 'claimed' | 'duplicate' | 'busy' | 'conflict' | 'expired';
    record: RuntimeMessageInboxRecord;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `disposition` | 属性 | <code>disposition: "busy" &#124; "expired" &#124; "claimed" &#124; "conflict" &#124; "duplicate"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `record` | 属性 | <code>record: RuntimeMessageInboxRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeInboxHandleResult`

Runtime Inbox Handle Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeInboxHandleResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### 声明

```text
export interface RuntimeInboxHandleResult {
    disposition: 'applied' | 'duplicate' | 'busy' | 'failed' | 'dead_lettered' | 'expired';
    appliedEventIds: string[];
    ackPending?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ackPending` | 属性 | <code>ackPending?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `appliedEventIds` | 属性 | <code>appliedEventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `disposition` | 属性 | <code>disposition: "failed" &#124; "busy" &#124; "expired" &#124; "applied" &#124; "dead_lettered" &#124; "duplicate"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeInboxProcessorOptions`

Runtime Inbox Processor Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeInboxProcessorOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### 声明

```text
export interface RuntimeInboxProcessorOptions {
    consumerId: string;
    ownerId: string;
    inbox: RuntimeMessageInboxStore;
    now?: () => string;
    processingLeaseMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `consumerId` | 属性 | <code>consumerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inbox` | 属性 | <code>inbox: RuntimeMessageInboxStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processingLeaseMs` | 属性 | <code>processingLeaseMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeMessageInboxStore`

Runtime Message Inbox Store 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeMessageInboxStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### 声明

```text
export interface RuntimeMessageInboxStore {
    claim(request: InboxClaimRequest): Promise<InboxClaimResult>;
    complete(consumerId: string, messageId: string, ownerId: string, appliedEventIds: string[], completedAt: string): Promise<void>;
    fail(consumerId: string, messageId: string, ownerId: string, error: NormalizedRuntimeError, failedAt: string): Promise<void>;
    get(consumerId: string, messageId: string): Promise<RuntimeMessageInboxRecord | null>;
    health(): Promise<ProviderHealth>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claim` | 方法 | <code>claim(request: InboxClaimRequest): Promise&lt;InboxClaimResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `complete` | 方法 | <code>complete(consumerId: string, messageId: string, ownerId: string, appliedEventIds: string[], completedAt: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fail` | 方法 | <code>fail(consumerId: string, messageId: string, ownerId: string, error: NormalizedRuntimeError, failedAt: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(consumerId: string, messageId: string): Promise&lt;RuntimeMessageInboxRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeMessageOutboxStore`

Runtime Message Outbox Store 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeMessageOutboxStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### 声明

```text
export interface RuntimeMessageOutboxStore {
    enqueue(input: {
        id: string;
        eventId?: string;
        envelope: RuntimeMessageEnvelope;
        availableAt?: string;
        createdAt: string;
    }): Promise<RuntimeMessageOutboxRecord>;
    claim(input: {
        ownerId: string;
        now: string;
        leaseMs: number;
        limit: number;
    }): Promise<RuntimeMessageOutboxRecord[]>;
    markPublished(id: string, ownerId: string, publishedAt: string): Promise<void>;
    markFailed(input: {
        id: string;
        ownerId: string;
        failedAt: string;
        error: NormalizedRuntimeError;
        retryAt?: string;
        deadLetter?: boolean;
    }): Promise<void>;
    get(id: string): Promise<RuntimeMessageOutboxRecord | null>;
    health(): Promise<ProviderHealth>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claim` | 方法 | <code>claim(input: { ownerId: string; now: string; leaseMs: number; limit: number; }): Promise&lt;RuntimeMessageOutboxRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `enqueue` | 方法 | <code>enqueue(input: { id: string; eventId?: string; envelope: RuntimeMessageEnvelope; availableAt?: string; createdAt: string; }): Promise&lt;RuntimeMessageOutboxRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(id: string): Promise&lt;RuntimeMessageOutboxRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `markFailed` | 方法 | <code>markFailed(input: { id: string; ownerId: string; failedAt: string; error: NormalizedRuntimeError; retryAt?: string; deadLetter?: boolean; }): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `markPublished` | 方法 | <code>markPublished(id: string, ownerId: string, publishedAt: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeOutboxDispatcherOptions`

Runtime Outbox Dispatcher Options 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeOutboxDispatcherOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### 声明

```text
export interface RuntimeOutboxDispatcherOptions {
    ownerId: string;
    outbox: RuntimeMessageOutboxStore;
    bus: MessageBus;
    now?: () => string;
    leaseMs?: number;
    maxAttempts?: number;
    retryDelayMs?: (attempt: number) => number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `bus` | 属性 | <code>bus: MessageBus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseMs` | 属性 | <code>leaseMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `outbox` | 属性 | <code>outbox: RuntimeMessageOutboxStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryDelayMs` | 方法 | <code>retryDelayMs?(attempt: number): number</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeOutboxDispatchResult`

Runtime Outbox Dispatch Result 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeOutboxDispatchResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### 声明

```text
export interface RuntimeOutboxDispatchResult {
    claimed: number;
    published: number;
    failed: number;
    deadLettered: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimed` | 属性 | <code>claimed: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadLettered` | 属性 | <code>deadLettered: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failed` | 属性 | <code>failed: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `published` | 属性 | <code>published: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
