# `@codesoul-co/hypha-core` / `modules/runtime/event-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/event-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)
- 导出数: **17**

## 模块用法

用于创建、记录或读取 Event 契约。Event store 模块公开 1 类、8 函数、8 接口。

### 从包入口导入

```ts
import {
  InMemoryDurableEventStore,
  createPersistedEventBatch,
  decodeEventStreamHeadCursor,
  encodeEventStreamHeadCursor,
  eventStreamKey,
  hashEventAppendRequest,
  streamHeadListLimit,
  validateEventAppendRequest,
} from '@codesoul-co/hypha-core';

import type {
  DurableEventStore,
  EventAppendRequest,
  EventAppendResult,
  EventStreamHead,
  EventStreamScope,
  InMemoryDurableEventStoreOptions,
  ListEventStreamHeadsRequest,
  ListEventStreamHeadsResult,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 8 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 8 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryDurableEventStore` | 类 | <code>new InMemoryDurableEventStore(options: InMemoryDurableEventStoreOptions): InMemoryDurableEventStore</code> | In Memory Durable Event Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `createPersistedEventBatch` | 函数 | <code>createPersistedEventBatch(request: EventAppendRequest, firstSequence: number, firstGlobalSequence: number, recordedAt: string): PersistedFrameworkEvent[]</code> | Create Persisted Event Batch 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `decodeEventStreamHeadCursor` | 函数 | <code>decodeEventStreamHeadCursor(cursor: string): string</code> | Decode Event Stream Head Cursor 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `encodeEventStreamHeadCursor` | 函数 | <code>encodeEventStreamHeadCursor(streamKey: string): string</code> | Encode Event Stream Head Cursor 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `eventStreamKey` | 函数 | <code>eventStreamKey(scope: EventStreamScope): string</code> | Event Stream Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `hashEventAppendRequest` | 函数 | <code>hashEventAppendRequest(request: EventAppendRequest): string</code> | Hash Event Append Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `streamHeadListLimit` | 函数 | <code>streamHeadListLimit(limit?: number): number</code> | Stream Head List Limit 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateEventAppendRequest` | 函数 | <code>validateEventAppendRequest(request: EventAppendRequest): void</code> | Validate Event Append Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateEventAppendSchemas` | 函数 | <code>validateEventAppendSchemas(registry: EventSchemaRegistry, request: EventAppendRequest): Promise&lt;void&gt;</code> | Validate Event Append Schemas 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `DurableEventStore` | 接口 | <code>interface DurableEventStore</code> | Durable Event Store 接口，共包含 6 个公开字段或方法。 |
| `EventAppendRequest` | 接口 | <code>interface EventAppendRequest</code> | Event Append Request 接口，共包含 7 个公开字段或方法。 |
| `EventAppendResult` | 接口 | <code>interface EventAppendResult</code> | Event Append Result 接口，共包含 5 个公开字段或方法。 |
| `EventStreamHead` | 接口 | <code>interface EventStreamHead</code> | Event Stream Head 接口，共包含 5 个公开字段或方法。 |
| `EventStreamScope` | 接口 | <code>interface EventStreamScope</code> | Event Stream Scope 接口，共包含 3 个公开字段或方法。 |
| `InMemoryDurableEventStoreOptions` | 接口 | <code>interface InMemoryDurableEventStoreOptions</code> | In Memory Durable Event Store Options 接口，共包含 2 个公开字段或方法。 |
| `ListEventStreamHeadsRequest` | 接口 | <code>interface ListEventStreamHeadsRequest</code> | List Event Stream Heads Request 接口，共包含 2 个公开字段或方法。 |
| `ListEventStreamHeadsResult` | 接口 | <code>interface ListEventStreamHeadsResult</code> | List Event Stream Heads Result 接口，共包含 2 个公开字段或方法。 |

## `InMemoryDurableEventStore`

In Memory Durable Event Store 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryDurableEventStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export declare class InMemoryDurableEventStore implements DurableEventStore {
    constructor(options: InMemoryDurableEventStoreOptions);
    append(request: EventAppendRequest): Promise<EventAppendResult>;
    readStream(scope: EventStreamScope, fromSequence?: number): Promise<PersistedFrameworkEvent[]>;
    readById(scope: EventStreamScope, eventId: string): Promise<PersistedFrameworkEvent | null>;
    getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null>;
    listStreamHeads(request?: ListEventStreamHeadsRequest): Promise<ListEventStreamHeadsResult>;
    health(): Promise<ProviderHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: InMemoryDurableEventStoreOptions): InMemoryDurableEventStore</code> | 创建该类的实例。 |
| `getStreamHead` | 方法 | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listStreamHeads` | 方法 | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `readById` | 方法 | <code>readById(scope: EventStreamScope, eventId: string): Promise&lt;PersistedFrameworkEvent &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `readStream` | 方法 | <code>readStream(scope: EventStreamScope, fromSequence?: number): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `createPersistedEventBatch`

Create Persisted Event Batch 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createPersistedEventBatch } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export declare function createPersistedEventBatch(request: EventAppendRequest, firstSequence: number, firstGlobalSequence: number, recordedAt: string): PersistedFrameworkEvent[];
```

### 调用签名

```text
createPersistedEventBatch(request: EventAppendRequest, firstSequence: number, firstGlobalSequence: number, recordedAt: string): PersistedFrameworkEvent[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `request` | <code>EventAppendRequest</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `firstSequence` | <code>number</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `firstGlobalSequence` | <code>number</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `recordedAt` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `PersistedFrameworkEvent<unknown>[]`
- 说明: 返回值契约由上述类型定义。

## `decodeEventStreamHeadCursor`

Decode Event Stream Head Cursor 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { decodeEventStreamHeadCursor } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export declare function decodeEventStreamHeadCursor(cursor: string): string;
```

### 调用签名

```text
decodeEventStreamHeadCursor(cursor: string): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `cursor` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `encodeEventStreamHeadCursor`

Encode Event Stream Head Cursor 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { encodeEventStreamHeadCursor } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export declare function encodeEventStreamHeadCursor(streamKey: string): string;
```

### 调用签名

```text
encodeEventStreamHeadCursor(streamKey: string): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `streamKey` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `eventStreamKey`

Event Stream Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { eventStreamKey } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export declare function eventStreamKey(scope: EventStreamScope): string;
```

### 调用签名

```text
eventStreamKey(scope: EventStreamScope): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `scope` | <code>EventStreamScope</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `hashEventAppendRequest`

Hash Event Append Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { hashEventAppendRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export declare function hashEventAppendRequest(request: EventAppendRequest): string;
```

### 调用签名

```text
hashEventAppendRequest(request: EventAppendRequest): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `request` | <code>EventAppendRequest</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `streamHeadListLimit`

Stream Head List Limit 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { streamHeadListLimit } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export declare function streamHeadListLimit(limit?: number): number;
```

### 调用签名

```text
streamHeadListLimit(limit?: number): number
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `limit` | <code>number</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `number`
- 说明: 返回值契约由上述类型定义。

## `validateEventAppendRequest`

Validate Event Append Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateEventAppendRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export declare function validateEventAppendRequest(request: EventAppendRequest): void;
```

### 调用签名

```text
validateEventAppendRequest(request: EventAppendRequest): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `request` | <code>EventAppendRequest</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `validateEventAppendSchemas`

Validate Event Append Schemas 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateEventAppendSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export declare function validateEventAppendSchemas(registry: EventSchemaRegistry, request: EventAppendRequest): Promise<void>;
```

### 调用签名

```text
validateEventAppendSchemas(registry: EventSchemaRegistry, request: EventAppendRequest): Promise<void>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `registry` | <code>EventSchemaRegistry</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `request` | <code>EventAppendRequest</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<void>`
- 说明: 返回值契约由上述类型定义。

## `DurableEventStore`

Durable Event Store 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableEventStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export interface DurableEventStore {
    append(request: EventAppendRequest): Promise<EventAppendResult>;
    readStream(scope: EventStreamScope, fromSequence?: number): Promise<PersistedFrameworkEvent[]>;
    readById(scope: EventStreamScope, eventId: string): Promise<PersistedFrameworkEvent | null>;
    getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null>;
    listStreamHeads(request?: ListEventStreamHeadsRequest): Promise<ListEventStreamHeadsResult>;
    health(): Promise<ProviderHealth>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getStreamHead` | 方法 | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listStreamHeads` | 方法 | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `readById` | 方法 | <code>readById(scope: EventStreamScope, eventId: string): Promise&lt;PersistedFrameworkEvent &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `readStream` | 方法 | <code>readStream(scope: EventStreamScope, fromSequence?: number): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `EventAppendRequest`

Event Append Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventAppendRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export interface EventAppendRequest {
    scope: EventStreamScope;
    events: EventCreateInput[];
    expectedLastSequence: number;
    expectedRunRevision?: number;
    fencingToken?: number;
    idempotencyKey: string;
    transactionGroupId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: EventCreateInput&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedLastSequence` | 属性 | <code>expectedLastSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRunRevision` | 属性 | <code>expectedRunRevision?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: EventStreamScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transactionGroupId` | 属性 | <code>transactionGroupId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EventAppendResult`

Event Append Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventAppendResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export interface EventAppendResult {
    events: PersistedFrameworkEvent[];
    firstSequence: number;
    lastSequence: number;
    runRevision: number;
    reused: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `firstSequence` | 属性 | <code>firstSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastSequence` | 属性 | <code>lastSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reused` | 属性 | <code>reused: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runRevision` | 属性 | <code>runRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EventStreamHead`

Event Stream Head 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventStreamHead } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export interface EventStreamHead {
    scope: EventStreamScope;
    lastSequence: number;
    runRevision: number;
    fencingToken?: number;
    updatedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fencingToken` | 属性 | <code>fencingToken?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastSequence` | 属性 | <code>lastSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runRevision` | 属性 | <code>runRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: EventStreamScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EventStreamScope`

Event Stream Scope 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventStreamScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export interface EventStreamScope {
    tenantId?: string;
    userId: string;
    runId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InMemoryDurableEventStoreOptions`

In Memory Durable Event Store Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InMemoryDurableEventStoreOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export interface InMemoryDurableEventStoreOptions {
    schemaRegistry: EventSchemaRegistry;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `schemaRegistry` | 属性 | <code>schemaRegistry: EventSchemaRegistry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ListEventStreamHeadsRequest`

List Event Stream Heads Request 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ListEventStreamHeadsRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export interface ListEventStreamHeadsRequest {
    cursor?: string;
    limit?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cursor` | 属性 | <code>cursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ListEventStreamHeadsResult`

List Event Stream Heads Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ListEventStreamHeadsResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-store.ts)

### 声明

```text
export interface ListEventStreamHeadsResult {
    heads: EventStreamHead[];
    nextCursor?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `heads` | 属性 | <code>heads: EventStreamHead[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextCursor` | 属性 | <code>nextCursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
