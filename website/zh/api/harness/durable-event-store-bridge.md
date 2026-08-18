# `@codesoul-co/hypha-harness` / `durable-event-store-bridge`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 源码: [`packages/harness/src/durable-event-store-bridge.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/durable-event-store-bridge.ts)
- 导出数: **3**

## 模块用法

用于创建、记录或读取 Event 契约。Durable event store bridge 模块公开 1 类、2 接口。

### 从包入口导入

```ts
import {
  DurableEventStoreBridge,
} from '@codesoul-co/hypha-harness';

import type {
  DurableEventStoreBridgeCoordination,
  DurableEventStoreBridgeOptions,
} from '@codesoul-co/hypha-harness';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DurableEventStoreBridge` | 类 | <code>new DurableEventStoreBridge(options: DurableEventStoreBridgeOptions): DurableEventStoreBridge</code> | Adapts the legacy append/list EventStore surface to canonical durable streams. It carries no Run state; every read is rebuilt from the durable Event Runtime. |
| `DurableEventStoreBridgeCoordination` | 接口 | <code>interface DurableEventStoreBridgeCoordination</code> | Durable Event Store Bridge Coordination 接口，共包含 5 个公开字段或方法。 |
| `DurableEventStoreBridgeOptions` | 接口 | <code>interface DurableEventStoreBridgeOptions</code> | Durable Event Store Bridge Options 接口，共包含 4 个公开字段或方法。 |

## `DurableEventStoreBridge`

Adapts the legacy append/list EventStore surface to canonical durable streams. It carries no Run state; every read is rebuilt from the durable Event Runtime.

- 种类: 类
- 导入: `import { DurableEventStoreBridge } from '@codesoul-co/hypha-harness';`
- 源码模块: [`durable-event-store-bridge`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/durable-event-store-bridge.ts)

### 声明

```text
export declare class DurableEventStoreBridge implements EventStore, TraceRecorder {
    constructor(options: DurableEventStoreBridgeOptions);
    append(event: FrameworkEvent): Promise<void>;
    record(event: FrameworkEvent): Promise<void>;
    list(filter?: EventFilter): Promise<FrameworkEvent[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: DurableEventStoreBridgeOptions): DurableEventStoreBridge</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `record` | 方法 | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DurableEventStoreBridgeCoordination`

Durable Event Store Bridge Coordination 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableEventStoreBridgeCoordination } from '@codesoul-co/hypha-harness';`
- 源码模块: [`durable-event-store-bridge`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/durable-event-store-bridge.ts)

### 声明

```text
export interface DurableEventStoreBridgeCoordination {
    runLeases: RunLeaseStore;
    ownerId: string;
    leaseTtlMs: number;
    nextId(namespace: string): string;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextId` | 方法 | <code>nextId(namespace: string): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DurableEventStoreBridgeOptions`

Durable Event Store Bridge Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DurableEventStoreBridgeOptions } from '@codesoul-co/hypha-harness';`
- 源码模块: [`durable-event-store-bridge`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/durable-event-store-bridge.ts)

### 声明

```text
export interface DurableEventStoreBridgeOptions {
    events: EventRuntime;
    coordination?: DurableEventStoreBridgeCoordination;
    maxAppendAttempts?: number;
    streamHeadPageSize?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `coordination` | 属性 | <code>coordination?: DurableEventStoreBridgeCoordination</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events: EventRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAppendAttempts` | 属性 | <code>maxAppendAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `streamHeadPageSize` | 属性 | <code>streamHeadPageSize?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
