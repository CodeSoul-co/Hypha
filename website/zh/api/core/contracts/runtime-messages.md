# `@codesoul-co/hypha-core` / `contracts/runtime-messages`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-messages.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)
- 导出数: **10**

## 模块用法

用于声明并运行时校验契约。Runtime messages 模块公开 3 常量、4 接口、3 类型。

### 从包入口导入

```ts
import {
  RUNTIME_INBOX_STATUSES,
  RUNTIME_MESSAGE_TYPES,
  RUNTIME_OUTBOX_STATES,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeMessageEnvelope,
  RuntimeMessageEnvelopeInput,
  RuntimeMessageInboxRecord,
  RuntimeMessageOutboxRecord,
  RuntimeMessageInboxStatus,
  RuntimeMessageOutboxState,
  RuntimeMessageType,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_INBOX_STATUSES` | 常量 | <code>const RUNTIME_INBOX_STATUSES: readonly ["processing", "applied", "ignored", "failed"]</code> | 由 `contracts/runtime-messages` 模块导出的 RUNTIME INBOX STATUSES 常量。 |
| `RUNTIME_MESSAGE_TYPES` | 常量 | <code>const RUNTIME_MESSAGE_TYPES: readonly ["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtime.recovery.requested", "runtime.custom"]</code> | 由 `contracts/runtime-messages` 模块导出的 RUNTIME MESSAGE TYPES 常量。 |
| `RUNTIME_OUTBOX_STATES` | 常量 | <code>const RUNTIME_OUTBOX_STATES: readonly ["pending", "publishing", "published", "failed", "dead_letter"]</code> | 由 `contracts/runtime-messages` 模块导出的 RUNTIME OUTBOX STATES 常量。 |
| `RuntimeMessageEnvelope` | 接口 | <code>interface RuntimeMessageEnvelope</code> | Runtime Message Envelope 接口，共包含 28 个公开字段或方法。 |
| `RuntimeMessageEnvelopeInput` | 接口 | <code>interface RuntimeMessageEnvelopeInput extends Omit&lt;RuntimeMessageEnvelope&lt;TPayload&gt;, 'payloadHash' &#124; 'sequence'&gt;</code> | Runtime Message Envelope Input 接口，共包含 28 个公开字段或方法。 |
| `RuntimeMessageInboxRecord` | 接口 | <code>interface RuntimeMessageInboxRecord</code> | Runtime Message Inbox Record 接口，共包含 12 个公开字段或方法。 |
| `RuntimeMessageOutboxRecord` | 接口 | <code>interface RuntimeMessageOutboxRecord</code> | Runtime Message Outbox Record 接口，共包含 14 个公开字段或方法。 |
| `RuntimeMessageInboxStatus` | 类型 | <code>type RuntimeMessageInboxStatus = (typeof RUNTIME_INBOX_STATUSES)[number]</code> | Runtime Message Inbox Status 公共类型别名；完整类型表达式见声明。 |
| `RuntimeMessageOutboxState` | 类型 | <code>type RuntimeMessageOutboxState = (typeof RUNTIME_OUTBOX_STATES)[number]</code> | Runtime Message Outbox State 公共类型别名；完整类型表达式见声明。 |
| `RuntimeMessageType` | 类型 | <code>type RuntimeMessageType = (typeof RUNTIME_MESSAGE_TYPES)[number]</code> | Runtime Message Type 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_INBOX_STATUSES`

由 `contracts/runtime-messages` 模块导出的 RUNTIME INBOX STATUSES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_INBOX_STATUSES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### 声明

```text
export declare const RUNTIME_INBOX_STATUSES: readonly ["processing", "applied", "ignored", "failed"];
```

## `RUNTIME_MESSAGE_TYPES`

由 `contracts/runtime-messages` 模块导出的 RUNTIME MESSAGE TYPES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_MESSAGE_TYPES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### 声明

```text
export declare const RUNTIME_MESSAGE_TYPES: readonly ["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtime.recovery.requested", "runtime.custom"];
```

## `RUNTIME_OUTBOX_STATES`

由 `contracts/runtime-messages` 模块导出的 RUNTIME OUTBOX STATES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_OUTBOX_STATES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### 声明

```text
export declare const RUNTIME_OUTBOX_STATES: readonly ["pending", "publishing", "published", "failed", "dead_letter"];
```

## `RuntimeMessageEnvelope`

Runtime Message Envelope 接口，共包含 28 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeMessageEnvelope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### 声明

```text
export interface RuntimeMessageEnvelope<TPayload = unknown> {
    messageId: string;
    messageType: RuntimeMessageType;
    schemaVersion: string;
    topic: string;
    partitionKey: string;
    orderingKey?: string;
    sequence?: number;
    tenantId?: string;
    workspaceId?: string;
    userId?: string;
    sessionId?: string;
    runId?: string;
    stepId?: string;
    activityId?: string;
    agentId?: string;
    correlationId?: string;
    causationId?: string;
    traceId?: string;
    principal?: RuntimePrincipal;
    payload: TPayload;
    payloadHash: string;
    priority?: number;
    availableAt?: string;
    expiresAt?: string;
    publishedAt: string;
    producerId: string;
    producerRevision?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `availableAt` | 属性 | <code>availableAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messageId` | 属性 | <code>messageId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messageType` | 属性 | <code>messageType: "runtime.activity.requested" &#124; "runtime.activity.completed" &#124; "runtime.activity.failed" &#124; "runtime.command.start" &#124; "runtime.command.resume" &#124; "runtime.command.cancel" &#124; "runtime.signal" &#124; "runtime.timer.fire" &#124; "runtime.agent.message" &#124; "runtime.child.completed" &#124; "runtime.projection.rebuild" &#124; "runtime.recovery.requested" &#124; "runtime.custom"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `orderingKey` | 属性 | <code>orderingKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: TPayload</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal?: RuntimePrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `priority` | 属性 | <code>priority?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `producerId` | 属性 | <code>producerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `producerRevision` | 属性 | <code>producerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `publishedAt` | 属性 | <code>publishedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaVersion` | 属性 | <code>schemaVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sequence` | 属性 | <code>sequence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `topic` | 属性 | <code>topic: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceId` | 属性 | <code>traceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeMessageEnvelopeInput`

Runtime Message Envelope Input 接口，共包含 28 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeMessageEnvelopeInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### 声明

```text
export interface RuntimeMessageEnvelopeInput<TPayload = unknown> extends Omit<RuntimeMessageEnvelope<TPayload>, 'payloadHash' | 'sequence'> {
    payloadHash?: string;
    sequence?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `availableAt` | 属性 | <code>availableAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messageId` | 属性 | <code>messageId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messageType` | 属性 | <code>messageType: "runtime.activity.requested" &#124; "runtime.activity.completed" &#124; "runtime.activity.failed" &#124; "runtime.command.start" &#124; "runtime.command.resume" &#124; "runtime.command.cancel" &#124; "runtime.signal" &#124; "runtime.timer.fire" &#124; "runtime.agent.message" &#124; "runtime.child.completed" &#124; "runtime.projection.rebuild" &#124; "runtime.recovery.requested" &#124; "runtime.custom"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `orderingKey` | 属性 | <code>orderingKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: TPayload</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payloadHash` | 属性 | <code>payloadHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal?: RuntimePrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `priority` | 属性 | <code>priority?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `producerId` | 属性 | <code>producerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `producerRevision` | 属性 | <code>producerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `publishedAt` | 属性 | <code>publishedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaVersion` | 属性 | <code>schemaVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sequence` | 属性 | <code>sequence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `topic` | 属性 | <code>topic: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceId` | 属性 | <code>traceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeMessageInboxRecord`

Runtime Message Inbox Record 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeMessageInboxRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### 声明

```text
export interface RuntimeMessageInboxRecord {
    consumerId: string;
    messageId: string;
    payloadHash: string;
    status: RuntimeMessageInboxStatus;
    appliedEventIds?: string[];
    firstReceivedAt: string;
    lastReceivedAt: string;
    attempts: number;
    expiresAt?: string;
    processingOwner?: string;
    processingExpiresAt?: string;
    lastError?: NormalizedRuntimeError;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `appliedEventIds` | 属性 | <code>appliedEventIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `attempts` | 属性 | <code>attempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `consumerId` | 属性 | <code>consumerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `firstReceivedAt` | 属性 | <code>firstReceivedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastError` | 属性 | <code>lastError?: NormalizedRuntimeError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastReceivedAt` | 属性 | <code>lastReceivedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messageId` | 属性 | <code>messageId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processingExpiresAt` | 属性 | <code>processingExpiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processingOwner` | 属性 | <code>processingOwner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "failed" &#124; "processing" &#124; "applied" &#124; "ignored"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeMessageOutboxRecord`

Runtime Message Outbox Record 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeMessageOutboxRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### 声明

```text
export interface RuntimeMessageOutboxRecord {
    id: string;
    eventId?: string;
    messageId: string;
    topic: string;
    partitionKey: string;
    envelope: RuntimeMessageEnvelope;
    state: RuntimeMessageOutboxState;
    attempts: number;
    availableAt: string;
    leaseOwner?: string;
    leaseExpiresAt?: string;
    lastError?: NormalizedRuntimeError;
    createdAt: string;
    updatedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `availableAt` | 属性 | <code>availableAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `envelope` | 属性 | <code>envelope: RuntimeMessageEnvelope&lt;unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventId` | 属性 | <code>eventId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastError` | 属性 | <code>lastError?: NormalizedRuntimeError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseExpiresAt` | 属性 | <code>leaseExpiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseOwner` | 属性 | <code>leaseOwner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messageId` | 属性 | <code>messageId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `partitionKey` | 属性 | <code>partitionKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: "failed" &#124; "pending" &#124; "publishing" &#124; "published" &#124; "dead_letter"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `topic` | 属性 | <code>topic: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeMessageInboxStatus`

Runtime Message Inbox Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeMessageInboxStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### 声明

```text
export type RuntimeMessageInboxStatus = (typeof RUNTIME_INBOX_STATUSES)[number];
```

## `RuntimeMessageOutboxState`

Runtime Message Outbox State 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeMessageOutboxState } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### 声明

```text
export type RuntimeMessageOutboxState = (typeof RUNTIME_OUTBOX_STATES)[number];
```

## `RuntimeMessageType`

Runtime Message Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeMessageType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### 声明

```text
export type RuntimeMessageType = (typeof RUNTIME_MESSAGE_TYPES)[number];
```
