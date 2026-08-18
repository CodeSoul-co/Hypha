# `@codesoul-co/hypha-core` / `modules/runtime/message-bus`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/message-bus.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)
- 导出数: **14**

## 模块用法

用于执行该边界的运行时行为。Message bus 模块公开 1 类、7 函数、6 接口。

### 从包入口导入

```ts
import {
  InMemoryMessageBus,
  addMilliseconds,
  busError,
  createRuntimeMessageEnvelope,
  isAtOrBefore,
  nonEmpty,
  nonNegative,
  positive,
} from '@codesoul-co/hypha-core';

import type {
  InMemoryMessageBusOptions,
  MessageBus,
  MessageDelivery,
  MessagePublishRequest,
  MessagePublishResult,
  MessageSubscriptionRequest,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 7 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMessageBus` | 类 | <code>new InMemoryMessageBus(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | In Memory Message Bus 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `addMilliseconds` | 函数 | <code>addMilliseconds(timestamp: string, milliseconds: number): string</code> | Add Milliseconds 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `busError` | 函数 | <code>busError(code: string, message: string, context?: Record&lt;string, unknown&gt;): FrameworkError</code> | Bus Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createRuntimeMessageEnvelope` | 函数 | <code>createRuntimeMessageEnvelope&lt;TPayload&gt;(input: RuntimeMessageEnvelopeInput&lt;TPayload&gt;): RuntimeMessageEnvelope&lt;TPayload&gt;</code> | Create Runtime Message Envelope 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `isAtOrBefore` | 函数 | <code>isAtOrBefore(left: string, right: string): boolean</code> | Is At Or Before 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `nonEmpty` | 函数 | <code>nonEmpty(value: unknown, label: string): asserts value is string</code> | Non Empty 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `nonNegative` | 函数 | <code>nonNegative(value: number, label?: string): number</code> | Non Negative 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `positive` | 函数 | <code>positive(value: number, label: string): number</code> | Positive 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `InMemoryMessageBusOptions` | 接口 | <code>interface InMemoryMessageBusOptions</code> | In Memory Message Bus Options 接口，共包含 6 个公开字段或方法。 |
| `MessageBus` | 接口 | <code>interface MessageBus</code> | Message Bus 接口，共包含 5 个公开字段或方法。 |
| `MessageDelivery` | 接口 | <code>interface MessageDelivery</code> | Message Delivery 接口，共包含 9 个公开字段或方法。 |
| `MessagePublishRequest` | 接口 | <code>interface MessagePublishRequest</code> | Message Publish Request 接口，共包含 1 个公开字段或方法。 |
| `MessagePublishResult` | 接口 | <code>interface MessagePublishResult</code> | Message Publish Result 接口，共包含 6 个公开字段或方法。 |
| `MessageSubscriptionRequest` | 接口 | <code>interface MessageSubscriptionRequest</code> | Message Subscription Request 接口，共包含 8 个公开字段或方法。 |

## `InMemoryMessageBus`

In Memory Message Bus 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryMessageBus } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### 声明

```text
export declare class InMemoryMessageBus implements MessageBus {
    constructor(options?: InMemoryMessageBusOptions);
    publish<TPayload>(request: MessagePublishRequest<TPayload>): Promise<MessagePublishResult>;
    publishBatch<TPayload>(requests: MessagePublishRequest<TPayload>[]): Promise<MessagePublishResult[]>;
    subscribe<TPayload>(request: MessageSubscriptionRequest): AsyncIterable<MessageDelivery<TPayload>>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
    listDeadLetters(consumerGroup: string): RuntimeMessageEnvelope[];
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | 创建该类的实例。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listDeadLetters` | 方法 | <code>listDeadLetters(consumerGroup: string): RuntimeMessageEnvelope[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `publish` | 方法 | <code>publish&lt;TPayload&gt;(request: MessagePublishRequest&lt;TPayload&gt;): Promise&lt;MessagePublishResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `publishBatch` | 方法 | <code>publishBatch&lt;TPayload&gt;(requests: MessagePublishRequest&lt;TPayload&gt;[]): Promise&lt;MessagePublishResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `subscribe` | 方法 | <code>subscribe&lt;TPayload&gt;(request: MessageSubscriptionRequest): AsyncIterable&lt;MessageDelivery&lt;TPayload&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `addMilliseconds`

Add Milliseconds 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { addMilliseconds } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### 声明

```text
export declare function addMilliseconds(timestamp: string, milliseconds: number): string;
```

### 调用签名

```text
addMilliseconds(timestamp: string, milliseconds: number): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `timestamp` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `milliseconds` | <code>number</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `busError`

Bus Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { busError } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### 声明

```text
export declare function busError(code: string, message: string, context?: Record<string, unknown>): FrameworkError;
```

### 调用签名

```text
busError(code: string, message: string, context?: Record<string, unknown>): FrameworkError
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `code` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `message` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `context` | <code>Record&lt;string, unknown&gt;</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FrameworkError`
- 说明: 返回值契约由上述类型定义。

## `createRuntimeMessageEnvelope`

Create Runtime Message Envelope 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createRuntimeMessageEnvelope } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### 声明

```text
export declare function createRuntimeMessageEnvelope<TPayload>(input: RuntimeMessageEnvelopeInput<TPayload>): RuntimeMessageEnvelope<TPayload>;
```

### 调用签名

```text
createRuntimeMessageEnvelope<TPayload>(input: RuntimeMessageEnvelopeInput<TPayload>): RuntimeMessageEnvelope<TPayload>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>RuntimeMessageEnvelopeInput&lt;TPayload&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeMessageEnvelope<TPayload>`
- 说明: 返回值契约由上述类型定义。

## `isAtOrBefore`

Is At Or Before 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { isAtOrBefore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### 声明

```text
export declare function isAtOrBefore(left: string, right: string): boolean;
```

### 调用签名

```text
isAtOrBefore(left: string, right: string): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `left` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `right` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `nonEmpty`

Non Empty 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { nonEmpty } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### 声明

```text
export declare function nonEmpty(value: unknown, label: string): asserts value is string;
```

### 调用签名

```text
nonEmpty(value: unknown, label: string): asserts value is string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `label` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `asserts value is string`
- 说明: 返回值契约由上述类型定义。

## `nonNegative`

Non Negative 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { nonNegative } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### 声明

```text
export declare function nonNegative(value: number, label?: string): number;
```

### 调用签名

```text
nonNegative(value: number, label?: string): number
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>number</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `label` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `number`
- 说明: 返回值契约由上述类型定义。

## `positive`

Positive 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { positive } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### 声明

```text
export declare function positive(value: number, label: string): number;
```

### 调用签名

```text
positive(value: number, label: string): number
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>number</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `label` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `number`
- 说明: 返回值契约由上述类型定义。

## `InMemoryMessageBusOptions`

In Memory Message Bus Options 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InMemoryMessageBusOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### 声明

```text
export interface InMemoryMessageBusOptions {
    now?: () => string;
    maxDeliveryAttempts?: number;
    defaultAckDeadlineMs?: number;
    maxMessageBytes?: number;
    maxQueueDepth?: number;
    pollIntervalMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `defaultAckDeadlineMs` | 属性 | <code>defaultAckDeadlineMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxDeliveryAttempts` | 属性 | <code>maxDeliveryAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxMessageBytes` | 属性 | <code>maxMessageBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxQueueDepth` | 属性 | <code>maxQueueDepth?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `pollIntervalMs` | 属性 | <code>pollIntervalMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MessageBus`

Message Bus 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MessageBus } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### 声明

```text
export interface MessageBus {
    publish<TPayload>(request: MessagePublishRequest<TPayload>): Promise<MessagePublishResult>;
    publishBatch<TPayload>(requests: MessagePublishRequest<TPayload>[]): Promise<MessagePublishResult[]>;
    subscribe<TPayload>(request: MessageSubscriptionRequest): AsyncIterable<MessageDelivery<TPayload>>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `publish` | 方法 | <code>publish&lt;TPayload&gt;(request: MessagePublishRequest&lt;TPayload&gt;): Promise&lt;MessagePublishResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `publishBatch` | 方法 | <code>publishBatch&lt;TPayload&gt;(requests: MessagePublishRequest&lt;TPayload&gt;[]): Promise&lt;MessagePublishResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `subscribe` | 方法 | <code>subscribe&lt;TPayload&gt;(request: MessageSubscriptionRequest): AsyncIterable&lt;MessageDelivery&lt;TPayload&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MessageDelivery`

Message Delivery 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MessageDelivery } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### 声明

```text
export interface MessageDelivery<TPayload = unknown> {
    envelope: RuntimeMessageEnvelope<TPayload>;
    deliveryId: string;
    attempt: number;
    receivedAt: string;
    ackDeadlineAt: string;
    ack(): Promise<void>;
    nack(options?: {
        delayMs?: number;
        reason?: string;
    }): Promise<void>;
    deadLetter(reason: string): Promise<void>;
    extendAckDeadline(extensionMs: number): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ack` | 方法 | <code>ack(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `ackDeadlineAt` | 属性 | <code>ackDeadlineAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `attempt` | 属性 | <code>attempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadLetter` | 方法 | <code>deadLetter(reason: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `deliveryId` | 属性 | <code>deliveryId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `envelope` | 属性 | <code>envelope: RuntimeMessageEnvelope&lt;TPayload&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `extendAckDeadline` | 方法 | <code>extendAckDeadline(extensionMs: number): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `nack` | 方法 | <code>nack(options?: { delayMs?: number; reason?: string; }): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `receivedAt` | 属性 | <code>receivedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MessagePublishRequest`

Message Publish Request 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MessagePublishRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### 声明

```text
export interface MessagePublishRequest<TPayload = unknown> {
    envelope: RuntimeMessageEnvelopeInput<TPayload>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `envelope` | 属性 | <code>envelope: RuntimeMessageEnvelopeInput&lt;TPayload&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MessagePublishResult`

Message Publish Result 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MessagePublishResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### 声明

```text
export interface MessagePublishResult {
    messageId: string;
    topic: string;
    partitionKey: string;
    sequence: number;
    publishedAt: string;
    reused: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `messageId` | 属性 | <code>messageId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `publishedAt` | 属性 | <code>publishedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reused` | 属性 | <code>reused: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sequence` | 属性 | <code>sequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `topic` | 属性 | <code>topic: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MessageSubscriptionRequest`

Message Subscription Request 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MessageSubscriptionRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### 声明

```text
export interface MessageSubscriptionRequest {
    consumerId: string;
    consumerGroup?: string;
    topic: string;
    partitionKey?: string;
    maxMessages?: number;
    idleTimeoutMs?: number;
    ackDeadlineMs?: number;
    signal?: AbortSignal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ackDeadlineMs` | 属性 | <code>ackDeadlineMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `consumerGroup` | 属性 | <code>consumerGroup?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `consumerId` | 属性 | <code>consumerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idleTimeoutMs` | 属性 | <code>idleTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxMessages` | 属性 | <code>maxMessages?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `partitionKey` | 属性 | <code>partitionKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal?: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `topic` | 属性 | <code>topic: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
