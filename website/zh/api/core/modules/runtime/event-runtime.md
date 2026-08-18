# `@codesoul-co/hypha-core` / `modules/runtime/event-runtime`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/event-runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)
- 导出数: **9**

## 模块用法

用于创建、记录或读取 Event 契约。Event runtime 模块公开 1 类、1 函数、6 接口、1 类型。

### 从包入口导入

```ts
import {
  DurableEventRuntime,
  eventExportChecksum,
} from '@codesoul-co/hypha-core';

import type {
  DurableEventRuntimeOptions,
  EventExportResult,
  EventImportRequest,
  EventImportResult,
  EventReadRequest,
  EventRuntime,
  EventExportRequest,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DurableEventRuntime` | 类 | <code>new DurableEventRuntime(options: DurableEventRuntimeOptions): DurableEventRuntime</code> | Durable Event Runtime 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `eventExportChecksum` | 函数 | <code>eventExportChecksum(exported: Omit&lt;EventExportResult, "checksum"&gt; &#124; EventExportResult): string</code> | Event Export Checksum 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `DurableEventRuntimeOptions` | 接口 | <code>interface DurableEventRuntimeOptions</code> | Durable Event Runtime Options 接口，共包含 2 个公开字段或方法。 |
| `EventExportResult` | 接口 | <code>interface EventExportResult</code> | Event Export Result 接口，共包含 7 个公开字段或方法。 |
| `EventImportRequest` | 接口 | <code>interface EventImportRequest</code> | Event Import Request 接口，共包含 6 个公开字段或方法。 |
| `EventImportResult` | 接口 | <code>interface EventImportResult extends EventAppendResult</code> | Event Import Result 接口，共包含 7 个公开字段或方法。 |
| `EventReadRequest` | 接口 | <code>interface EventReadRequest</code> | Event Read Request 接口，共包含 4 个公开字段或方法。 |
| `EventRuntime` | 接口 | <code>interface EventRuntime</code> | Event Runtime 接口，共包含 8 个公开字段或方法。 |
| `EventExportRequest` | 类型 | <code>type EventExportRequest = EventReadRequest</code> | Event Export Request 公共类型别名；完整类型表达式见声明。 |

## `DurableEventRuntime`

Durable Event Runtime 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DurableEventRuntime } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### 声明

```text
export declare class DurableEventRuntime implements EventRuntime {
    constructor(options: DurableEventRuntimeOptions);
    append(request: EventAppendRequest): Promise<EventAppendResult>;
    read(request: EventReadRequest): Promise<PersistedFrameworkEvent[]>;
    stream(request: EventReadRequest): AsyncIterable<PersistedFrameworkEvent>;
    latestSequence(scope: EventStreamScope): Promise<number>;
    getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null>;
    listStreamHeads(request?: ListEventStreamHeadsRequest): Promise<ListEventStreamHeadsResult>;
    export(request: EventExportRequest): Promise<EventExportResult>;
    import(request: EventImportRequest): Promise<EventImportResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: DurableEventRuntimeOptions): DurableEventRuntime</code> | 创建该类的实例。 |
| `export` | 方法 | <code>export(request: EventExportRequest): Promise&lt;EventExportResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getStreamHead` | 方法 | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `import` | 方法 | <code>import(request: EventImportRequest): Promise&lt;EventImportResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `latestSequence` | 方法 | <code>latestSequence(scope: EventStreamScope): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listStreamHeads` | 方法 | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `read` | 方法 | <code>read(request: EventReadRequest): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stream` | 方法 | <code>stream(request: EventReadRequest): AsyncIterable&lt;PersistedFrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `eventExportChecksum`

Event Export Checksum 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { eventExportChecksum } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### 声明

```text
export declare function eventExportChecksum(exported: Omit<EventExportResult, 'checksum'> | EventExportResult): string;
```

### 调用签名

```text
eventExportChecksum(exported: Omit<EventExportResult, "checksum"> | EventExportResult): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `exported` | <code>EventExportResult &#124; Omit&lt;EventExportResult, "checksum"&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `DurableEventRuntimeOptions`

Durable Event Runtime Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableEventRuntimeOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### 声明

```text
export interface DurableEventRuntimeOptions {
    store: DurableEventStore;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `store` | 属性 | <code>store: DurableEventStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EventExportResult`

Event Export Result 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventExportResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### 声明

```text
export interface EventExportResult {
    formatVersion: '1.0.0';
    scope: EventStreamScope;
    head: EventStreamHead | null;
    events: PersistedFrameworkEvent[];
    eventCount: number;
    exportedAt: string;
    checksum: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checksum` | 属性 | <code>checksum: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventCount` | 属性 | <code>eventCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `exportedAt` | 属性 | <code>exportedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `formatVersion` | 属性 | <code>formatVersion: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `head` | 属性 | <code>head: EventStreamHead</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: EventStreamScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EventImportRequest`

Event Import Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventImportRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### 声明

```text
export interface EventImportRequest {
    scope: EventStreamScope;
    exported: EventExportResult;
    expectedLastSequence: number;
    expectedRunRevision?: number;
    fencingToken?: number;
    idempotencyKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedLastSequence` | 属性 | <code>expectedLastSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRunRevision` | 属性 | <code>expectedRunRevision?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `exported` | 属性 | <code>exported: EventExportResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: EventStreamScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EventImportResult`

Event Import Result 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventImportResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### 声明

```text
export interface EventImportResult extends EventAppendResult {
    importedEventCount: number;
    sourceChecksum: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `firstSequence` | 属性 | <code>firstSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `importedEventCount` | 属性 | <code>importedEventCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastSequence` | 属性 | <code>lastSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reused` | 属性 | <code>reused: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runRevision` | 属性 | <code>runRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceChecksum` | 属性 | <code>sourceChecksum: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EventReadRequest`

Event Read Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventReadRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### 声明

```text
export interface EventReadRequest {
    scope: EventStreamScope;
    fromSequence?: number;
    toSequence?: number;
    types?: FrameworkEventType[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fromSequence` | 属性 | <code>fromSequence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: EventStreamScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toSequence` | 属性 | <code>toSequence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `types` | 属性 | <code>types?: FrameworkEventType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EventRuntime`

Event Runtime 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EventRuntime } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### 声明

```text
export interface EventRuntime {
    append(request: EventAppendRequest): Promise<EventAppendResult>;
    read(request: EventReadRequest): Promise<PersistedFrameworkEvent[]>;
    stream(request: EventReadRequest): AsyncIterable<PersistedFrameworkEvent>;
    latestSequence(scope: EventStreamScope): Promise<number>;
    getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null>;
    listStreamHeads(request?: ListEventStreamHeadsRequest): Promise<ListEventStreamHeadsResult>;
    export(request: EventExportRequest): Promise<EventExportResult>;
    import(request: EventImportRequest): Promise<EventImportResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(request: EventAppendRequest): Promise&lt;EventAppendResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `export` | 方法 | <code>export(request: EventExportRequest): Promise&lt;EventExportResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getStreamHead` | 方法 | <code>getStreamHead(scope: EventStreamScope): Promise&lt;EventStreamHead &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `import` | 方法 | <code>import(request: EventImportRequest): Promise&lt;EventImportResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `latestSequence` | 方法 | <code>latestSequence(scope: EventStreamScope): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listStreamHeads` | 方法 | <code>listStreamHeads(request?: ListEventStreamHeadsRequest): Promise&lt;ListEventStreamHeadsResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `read` | 方法 | <code>read(request: EventReadRequest): Promise&lt;PersistedFrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stream` | 方法 | <code>stream(request: EventReadRequest): AsyncIterable&lt;PersistedFrameworkEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `EventExportRequest`

Event Export Request 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { EventExportRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/event-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-runtime.ts)

### 声明

```text
export type EventExportRequest = EventReadRequest;
```
