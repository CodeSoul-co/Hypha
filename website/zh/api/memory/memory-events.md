# `@codesoul-co/hypha-memory` / `memory-events`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)
- 导出数: **6**

## 模块用法

用于创建、记录或读取 Event 契约。Memory events 模块公开 2 函数、3 接口、1 类型。

### 从包入口导入

```ts
import {
  memoryEventIdempotencyKey,
  sanitizeMemoryEventPayload,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryEventContext,
  MemoryEventPayloadBase,
  MemoryEventPublisher,
  MemoryEventType,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryEventIdempotencyKey` | 函数 | <code>memoryEventIdempotencyKey(type: MemoryEventType, payload: MemoryEventPayloadBase): string</code> | Memory Event Idempotency Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `sanitizeMemoryEventPayload` | 函数 | <code>sanitizeMemoryEventPayload(payload: MemoryEventPayloadBase): MemoryEventPayloadBase</code> | Sanitize Memory Event Payload 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `MemoryEventContext` | 接口 | <code>interface MemoryEventContext</code> | Memory Event Context 接口，共包含 7 个公开字段或方法。 |
| `MemoryEventPayloadBase` | 接口 | <code>interface MemoryEventPayloadBase</code> | Memory Event Payload Base 接口，共包含 12 个公开字段或方法。 |
| `MemoryEventPublisher` | 接口 | <code>interface MemoryEventPublisher</code> | Memory Event Publisher 接口，共包含 1 个公开字段或方法。 |
| `MemoryEventType` | 类型 | <code>type MemoryEventType = Extract&lt;FrameworkEventType, `memory.${string}` &#124; `context.${string}`&gt;</code> | Memory Event Type 公共类型别名；完整类型表达式见声明。 |

## `memoryEventIdempotencyKey`

Memory Event Idempotency Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { memoryEventIdempotencyKey } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)

### 声明

```text
export declare function memoryEventIdempotencyKey(type: MemoryEventType, payload: MemoryEventPayloadBase): string;
```

### 调用签名

```text
memoryEventIdempotencyKey(type: MemoryEventType, payload: MemoryEventPayloadBase): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `type` | <code>MemoryEventType</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `payload` | <code>MemoryEventPayloadBase</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `sanitizeMemoryEventPayload`

Sanitize Memory Event Payload 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { sanitizeMemoryEventPayload } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)

### 声明

```text
export declare function sanitizeMemoryEventPayload(payload: MemoryEventPayloadBase): MemoryEventPayloadBase;
```

### 调用签名

```text
sanitizeMemoryEventPayload(payload: MemoryEventPayloadBase): MemoryEventPayloadBase
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `payload` | <code>MemoryEventPayloadBase</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryEventPayloadBase`
- 说明: 返回值契约由上述类型定义。

## `MemoryEventContext`

Memory Event Context 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryEventContext } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)

### 声明

```text
export interface MemoryEventContext {
    userId: string;
    tenantId?: string;
    runId: string;
    sessionId?: string;
    workspaceId?: string;
    stepId?: string;
    agentId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryEventPayloadBase`

Memory Event Payload Base 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryEventPayloadBase } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)

### 声明

```text
export interface MemoryEventPayloadBase {
    operationId: string;
    profileId?: string;
    profileRevision?: string;
    providerId?: string;
    scopeHash: string;
    memoryId?: string;
    memoryVersionId?: string;
    itemCount?: number;
    latencyMs?: number;
    status?: string;
    error?: NormalizedMemoryError;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error?: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `itemCount` | 属性 | <code>itemCount?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `latencyMs` | 属性 | <code>latencyMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryId` | 属性 | <code>memoryId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryVersionId` | 属性 | <code>memoryVersionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileId` | 属性 | <code>profileId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRevision` | 属性 | <code>profileRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryEventPublisher`

Memory Event Publisher 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryEventPublisher } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)

### 声明

```text
export interface MemoryEventPublisher {
    publish(type: MemoryEventType, payload: MemoryEventPayloadBase, context: MemoryEventContext): Promise<string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `publish` | 方法 | <code>publish(type: MemoryEventType, payload: MemoryEventPayloadBase, context: MemoryEventContext): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryEventType`

Memory Event Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryEventType } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)

### 声明

```text
export type MemoryEventType = Extract<FrameworkEventType, `memory.${string}` | `context.${string}`>;
```
