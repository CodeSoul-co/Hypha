# `@codesoul-co/hypha-harness` / `message-bus`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 源码: [`packages/harness/src/message-bus.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)
- 导出数: **12**

## 模块用法

用于使用该功能边界的公共契约与操作。Message bus 模块公开 1 类、9 接口、2 类型。

### 从包入口导入

```ts
import {
  InMemoryMessageBus,
} from '@codesoul-co/hypha-harness';

import type {
  InMemoryMessageBusOptions,
  MessageAckInput,
  MessageAddress,
  MessageBus,
  MessageFailInput,
  MessageListFilter,
  PublishMessageInput,
  PullMessageFilter,
} from '@codesoul-co/hypha-harness';

// 完整导出列表见下方。
```

### 使用要点

- 11 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMessageBus` | 类 | <code>new InMemoryMessageBus(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | In Memory Message Bus 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryMessageBusOptions` | 接口 | <code>interface InMemoryMessageBusOptions</code> | In Memory Message Bus Options 接口，共包含 6 个公开字段或方法。 |
| `MessageAckInput` | 接口 | <code>interface MessageAckInput</code> | Message Ack Input 接口，共包含 7 个公开字段或方法。 |
| `MessageAddress` | 接口 | <code>interface MessageAddress</code> | Message Address 接口，共包含 2 个公开字段或方法。 |
| `MessageBus` | 接口 | <code>interface MessageBus</code> | Message Bus 接口，共包含 5 个公开字段或方法。 |
| `MessageFailInput` | 接口 | <code>interface MessageFailInput extends MessageAckInput</code> | Message Fail Input 接口，共包含 11 个公开字段或方法。 |
| `MessageListFilter` | 接口 | <code>interface MessageListFilter</code> | Message List Filter 接口，共包含 5 个公开字段或方法。 |
| `PublishMessageInput` | 接口 | <code>interface PublishMessageInput</code> | Publish Message Input 接口，共包含 16 个公开字段或方法。 |
| `PullMessageFilter` | 接口 | <code>interface PullMessageFilter</code> | Pull Message Filter 接口，共包含 6 个公开字段或方法。 |
| `RuntimeMessage` | 接口 | <code>interface RuntimeMessage</code> | Runtime Message 接口，共包含 20 个公开字段或方法。 |
| `MessageAddressKind` | 类型 | <code>type MessageAddressKind = 'runtime' &#124; 'session' &#124; 'workflow' &#124; 'agent' &#124; 'tool' &#124; 'human'</code> | Message Address Kind 公共类型别名；完整类型表达式见声明。 |
| `MessageStatus` | 类型 | <code>type MessageStatus = 'queued' &#124; 'delivered' &#124; 'acknowledged' &#124; 'failed' &#124; 'dead_lettered'</code> | Message Status 公共类型别名；完整类型表达式见声明。 |

## `InMemoryMessageBus`

In Memory Message Bus 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryMessageBus } from '@codesoul-co/hypha-harness';`
- 源码模块: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### 声明

```text
export declare class InMemoryMessageBus implements MessageBus {
    constructor(options?: InMemoryMessageBusOptions);
    publish<TPayload = unknown>(input: PublishMessageInput<TPayload>): Promise<RuntimeMessage<TPayload>>;
    pull<TPayload = unknown>(filter: PullMessageFilter): Promise<RuntimeMessage<TPayload> | null>;
    acknowledge(input: MessageAckInput): Promise<RuntimeMessage | null>;
    fail(input: MessageFailInput): Promise<RuntimeMessage | null>;
    list(filter?: MessageListFilter): Promise<RuntimeMessage[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acknowledge` | 方法 | <code>acknowledge(input: MessageAckInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | 创建该类的实例。 |
| `fail` | 方法 | <code>fail(input: MessageFailInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(filter?: MessageListFilter): Promise&lt;RuntimeMessage[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `publish` | 方法 | <code>publish&lt;TPayload = unknown&gt;(input: PublishMessageInput&lt;TPayload&gt;): Promise&lt;RuntimeMessage&lt;TPayload&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `pull` | 方法 | <code>pull&lt;TPayload = unknown&gt;(filter: PullMessageFilter): Promise&lt;RuntimeMessage&lt;TPayload&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryMessageBusOptions`

In Memory Message Bus Options 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InMemoryMessageBusOptions } from '@codesoul-co/hypha-harness';`
- 源码模块: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### 声明

```text
export interface InMemoryMessageBusOptions {
    trace?: TraceRecorder;
    now?: () => string;
    maxDeliveryAttempts?: number;
    initialRetryDelayMs?: number;
    maxRetryDelayMs?: number;
    retryMultiplier?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `initialRetryDelayMs` | 属性 | <code>initialRetryDelayMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxDeliveryAttempts` | 属性 | <code>maxDeliveryAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxRetryDelayMs` | 属性 | <code>maxRetryDelayMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `retryMultiplier` | 属性 | <code>retryMultiplier?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trace` | 属性 | <code>trace?: TraceRecorder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MessageAckInput`

Message Ack Input 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MessageAckInput } from '@codesoul-co/hypha-harness';`
- 源码模块: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### 声明

```text
export interface MessageAckInput {
    id: string;
    userId: string;
    sessionId: string;
    runId?: string;
    handledBy?: MessageAddress;
    timestamp?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `handledBy` | 属性 | <code>handledBy?: MessageAddress</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timestamp` | 属性 | <code>timestamp?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MessageAddress`

Message Address 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MessageAddress } from '@codesoul-co/hypha-harness';`
- 源码模块: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### 声明

```text
export interface MessageAddress {
    kind: MessageAddressKind;
    id: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: MessageAddressKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MessageBus`

Message Bus 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MessageBus } from '@codesoul-co/hypha-harness';`
- 源码模块: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### 声明

```text
export interface MessageBus {
    publish<TPayload = unknown>(input: PublishMessageInput<TPayload>): Promise<RuntimeMessage<TPayload>>;
    pull<TPayload = unknown>(filter: PullMessageFilter): Promise<RuntimeMessage<TPayload> | null>;
    acknowledge(input: MessageAckInput): Promise<RuntimeMessage | null>;
    fail(input: MessageFailInput): Promise<RuntimeMessage | null>;
    list(filter?: MessageListFilter): Promise<RuntimeMessage[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acknowledge` | 方法 | <code>acknowledge(input: MessageAckInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fail` | 方法 | <code>fail(input: MessageFailInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(filter?: MessageListFilter): Promise&lt;RuntimeMessage[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `publish` | 方法 | <code>publish&lt;TPayload = unknown&gt;(input: PublishMessageInput&lt;TPayload&gt;): Promise&lt;RuntimeMessage&lt;TPayload&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `pull` | 方法 | <code>pull&lt;TPayload = unknown&gt;(filter: PullMessageFilter): Promise&lt;RuntimeMessage&lt;TPayload&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MessageFailInput`

Message Fail Input 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MessageFailInput } from '@codesoul-co/hypha-harness';`
- 源码模块: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### 声明

```text
export interface MessageFailInput extends MessageAckInput {
    reason?: string;
    deadLetter?: boolean;
    retry?: boolean;
    retryAfterMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deadLetter` | 属性 | <code>deadLetter?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `handledBy` | 属性 | <code>handledBy?: MessageAddress</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retry` | 属性 | <code>retry?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryAfterMs` | 属性 | <code>retryAfterMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timestamp` | 属性 | <code>timestamp?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MessageListFilter`

Message List Filter 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MessageListFilter } from '@codesoul-co/hypha-harness';`
- 源码模块: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### 声明

```text
export interface MessageListFilter {
    userId?: string;
    sessionId?: string;
    runId?: string;
    to?: MessageAddress;
    status?: MessageStatus;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status?: MessageStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `to` | 属性 | <code>to?: MessageAddress</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PublishMessageInput`

Publish Message Input 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PublishMessageInput } from '@codesoul-co/hypha-harness';`
- 源码模块: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### 声明

```text
export interface PublishMessageInput<TPayload = unknown> {
    id: string;
    type: string;
    userId: string;
    sessionId: string;
    runId: string;
    from: MessageAddress;
    to: MessageAddress;
    payload: TPayload;
    stepId?: string;
    agentId?: string;
    fsmState?: string;
    correlationId?: string;
    causationId?: string;
    availableAt?: string;
    expiresAt?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `availableAt` | 属性 | <code>availableAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `from` | 属性 | <code>from: MessageAddress</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmState` | 属性 | <code>fsmState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: TPayload</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `to` | 属性 | <code>to: MessageAddress</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PullMessageFilter`

Pull Message Filter 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PullMessageFilter } from '@codesoul-co/hypha-harness';`
- 源码模块: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### 声明

```text
export interface PullMessageFilter {
    userId: string;
    sessionId: string;
    to: MessageAddress;
    runId?: string;
    fsmState?: string;
    now?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fsmState` | 属性 | <code>fsmState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 属性 | <code>now?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `to` | 属性 | <code>to: MessageAddress</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeMessage`

Runtime Message 接口，共包含 20 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeMessage } from '@codesoul-co/hypha-harness';`
- 源码模块: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### 声明

```text
export interface RuntimeMessage<TPayload = unknown> {
    id: string;
    type: string;
    userId: string;
    sessionId: string;
    runId: string;
    from: MessageAddress;
    to: MessageAddress;
    payload: TPayload;
    status: MessageStatus;
    createdAt: string;
    updatedAt: string;
    stepId?: string;
    agentId?: string;
    fsmState?: string;
    correlationId?: string;
    causationId?: string;
    availableAt?: string;
    expiresAt?: string;
    attemptCount: number;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `attemptCount` | 属性 | <code>attemptCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `availableAt` | 属性 | <code>availableAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `from` | 属性 | <code>from: MessageAddress</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmState` | 属性 | <code>fsmState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: TPayload</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: MessageStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `to` | 属性 | <code>to: MessageAddress</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MessageAddressKind`

Message Address Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MessageAddressKind } from '@codesoul-co/hypha-harness';`
- 源码模块: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### 声明

```text
export type MessageAddressKind = 'runtime' | 'session' | 'workflow' | 'agent' | 'tool' | 'human';
```

## `MessageStatus`

Message Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MessageStatus } from '@codesoul-co/hypha-harness';`
- 源码模块: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### 声明

```text
export type MessageStatus = 'queued' | 'delivered' | 'acknowledged' | 'failed' | 'dead_lettered';
```
